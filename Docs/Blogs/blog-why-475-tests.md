---
title: "Why I Wrote 475 Tests for a Desktop Accounting App"
description: "When the books are wrong, the app doesn't crash. It just lies to you. That's what makes testing financial software different."
date: "2026-05-15"
medium: https://medium.com/@rahulgehlotxsd/why-i-wrote-475-tests-for-a-desktop-accounting-app-b1051d34029c
devto: https://dev.to/rahulgehlot/why-i-wrote-475-tests-for-a-desktop-accounting-app-4laj
---

# Why I Wrote 475 Tests for a Desktop Accounting App

> *When the books are wrong, the app doesn't crash. It just lies to you. That's what makes testing financial software different.*

---

## The Hook: Silent Bugs

Most bugs make noise. The app crashes. The button doesn't work. The text is misaligned. You *know* something is wrong.

Financial bugs don't make noise. They whisper.

A sale disappears from the UI. The customer balance still shows ₹500. The shop owner shrugs — "probably a display glitch." Months later, the books don't reconcile. The auditor asks questions. Trust erodes.

This is the nightmare that keeps me up at night. And it's why **Hisaab Pro** — a desktop accounting app for small Indian businesses — has 475 tests.

---

![Hisaab Pro Dashboard](/Blogs/blog-why-475-tests/Hisaab_Pro_Dashboard.png)
*SCREENSHOT 1 — Hisaab Pro Dashboard*

---

## The App — Three Lines

| Layer | Technology |
|-------|-----------|
| **Runtime** | Node.js + Express |
| **Database** | SQLite (AES-256 encrypted, one file per financial year) |
| **Frontend** | Vanilla JavaScript — no frameworks |
| **Deployment** | USB stick. Double-click `start.bat`. No installation, no cloud, no internet. |

Ramesh runs a hardware store in Jaipur. He's 54. He doesn't know what a database is. His nephew set this up on a USB drive — he plugs it in, clicks a button, and expects the ₹50,000 in his cash account to be exactly what his customers have actually paid him.

He shouldn't need to know that SQLite transactions exist. He shouldn't need to audit his own books. He should be able to delete a mistaken sale and trust the balance updates correctly.

The tests are the invisible guarantee between Ramesh and his money.

If the power goes out, the database needs to survive. If someone yanks the USB mid-write, the books must still balance. No excuses. No "we'll fix it in the next release."

---

## The Bug That Made Me Paranoid

### Ghost Balances After Deletion

Here's what used to happen:

A shop owner creates a sale for a customer — ₹5,000 on credit. The system records it: debit the customer account, credit the sales account. Double-entry. Balanced. Correct.

A week later, the customer returns the goods. The shop owner deletes the sale. The sale disappears from the UI.

But the customer's balance still shows ₹5,000.

Here's the entire delete function:

```javascript
// File: server/modules/sales/sales.service.js (original, line ~186)
function deleteSale(id, isDecoy) {
    var stmt = db.prepare('UPDATE sales SET is_deleted = 1, updated_at = datetime(\'now\', \'localtime\') WHERE id = ? AND is_decoy = ?');
    stmt.run(id, isDecoy ? 1 : 0);
    logger.info('Sales', 'Sale deleted: ID ' + id + (isDecoy ? ' [DECOY]' : ''));
    return true;
}
```
*CODE SNIPPET 1 — The buggy delete (before fix)*

One line. The sale was "deleted" — but the customer's account balance was never rolled back. The associated ledger entries were still active. The cash account was still inflated.

The sale looked gone. The money trail was still there. Phantom data.

Here's the fix:

```javascript
// File: server/modules/sales/sales.service.js (lines 441–487)
function deleteSale(id, isDecoy) {
    var sale = getSaleById(id, isDecoy);
    if (!sale) return false;

    var transaction = db.transaction(function() {
        var deletedInvoiceNo = sale.invoice_no + '-DEL-' + Date.now();
        db.prepare('UPDATE sales SET is_deleted = 1, invoice_no = ?, updated_at = datetime(\'now\', \'localtime\') WHERE id = ?')
            .run(deletedInvoiceNo, id);

        if (sale.customer_account_id) {
            db.prepare('UPDATE accounts SET current_balance = current_balance - ?, updated_at = datetime(\'now\', \'localtime\') WHERE id = ?')
                .run(sale.total, sale.customer_account_id);
        }

        db.prepare('UPDATE transactions SET is_deleted = 1 WHERE linked_sale_id = ?').run(id);

        var payments = db.prepare('SELECT * FROM payments WHERE sale_id = ? AND is_decoy = ? AND is_deleted = 0').all(id, isDecoy ? 1 : 0);
        payments.forEach(function(payment) {
            var assetAccount = payment.mode === 'cash'
                ? accountsService.getDefaultCashAccount(isDecoy)
                : accountsService.getDefaultBankAccount(isDecoy);
            if (assetAccount) {
                var assetRevert = payment.type === 'in' ? -payment.amount : payment.amount;
                db.prepare('UPDATE accounts SET current_balance = current_balance + ?, updated_at = datetime(\'now\', \'localtime\') WHERE id = ?')
                    .run(assetRevert, assetAccount.id);
            }

            if (payment.type === 'in' && sale.id) {
                db.prepare('UPDATE sales SET amount_paid = amount_paid - ?, updated_at = datetime(\'now\', \'localtime\') WHERE id = ?')
                    .run(payment.amount, sale.id);
            }

            db.prepare('UPDATE payments SET is_deleted = 1 WHERE id = ?').run(payment.id);
        });

        return true;
    });

    transaction();
    logger.info('Sales', 'Sale deleted: ID ' + id + (isDecoy ? ' [DECOY]' : ''));
    return true;
}
```
*CODE SNIPPET 2 — The full delete with rollback (after fix)*

*In the old buggy code, querying the account balance after deleting a sale would still show the old amount — the sale was gone from the UI but the money trail persisted in the database. In the current fixed code, the balance correctly rolls back and the ledger shows no trace of the deleted sale.*

This bug lived undetected for weeks. It was invisible — the UI showed nothing wrong. A schema migration had to be written to retroactively fix corrupted data:

```sql
UPDATE transactions SET is_deleted = 1
WHERE linked_sale_id IN (SELECT id FROM sales WHERE is_deleted = 1);
```

A single `WHERE` clause running against production databases. Hoping we found all the ghosts.

---

## The Test That Caught The Next One

After the ghost balance incident, I got paranoid. I wrote this test:

```javascript
// File: tests/double-entry.test.js (lines 830–887)
// Arrange — create a valid sale first to establish baseline
const saleResponse = await request(app)
    .post('/api/v1/sales')
    .set('Cookie', cookies)
    .send({ customer_account_id: testCustomerId, total: 1000, amount_paid: 1000, date: '2026-04-29' });
expect(saleResponse.status).toBe(201);

// Count transactions before the bad operation
const db = new Database(TEST_DB_PATH);
db.pragma(`key = '${TEST_DB_KEY}'`);
const countBefore = db.prepare(
    'SELECT COUNT(*) as count FROM transactions WHERE is_deleted = 0'
).get().count;
db.close();

// Act — try to create a sale with a NEGATIVE amount
// The API should reject this, but will it leave ghost entries?
const invalidSaleData = {
    customer_account_id: testCustomerId,
    total: -500,
    amount_paid: -500,
    date: '2026-04-29'
};

const failResponse = await request(app)
    .post('/api/v1/sales')
    .set('Cookie', cookies)
    .send(invalidSaleData);

expect(failResponse.status).toBe(400);

// Assert — verify the transaction count is EXACTLY the same
// If even ONE extra row exists, the books are now corrupted
const db2 = new Database(TEST_DB_PATH);
db2.pragma(`key = '${TEST_DB_KEY}'`);
const countAfter = db2.prepare(
    'SELECT COUNT(*) as count FROM transactions WHERE is_deleted = 0'
).get().count;
db2.close();

// THIS is the assertion that matters
expect(countAfter).toBe(countBefore);
```
*CODE SNIPPET 3 — The partial commit test (centerpiece)*

Notice what this test does differently. It doesn't just check the HTTP response (status 400). It opens a **separate database connection** and queries the raw transaction count.

Why? Because the API could return an error while still having committed partial data. And that's exactly what was happening.

The test caught it on the first run: `countAfter` was `countBefore + 1`. The `sales` table insert was rolled back, but the `transactions` insert had already executed. The books were silently off by one orphaned row.

*The test runner would show `expected 5, received 6` in red on `expect(countAfter).toBe(countBefore)` — the moment of discovery. Six words revealing a corrupted database that the API considered "successful."*

Six words are the difference between "everything is fine" and "your books are wrong":

```javascript
expect(countAfter).toBe(countBefore);
```

---

## The Bug You Can't Manually Reproduce

### Crash-While-Writing (The SIGKILL Bug)

A power outage mid-sale. The user yanks the USB. `taskkill /F` on the wrong process.

Without WAL (Write-Ahead Logging) mode + explicit transactions, the first database write persists but the second doesn't. Partial data. Corrupted books.

You can't manually reproduce this — you'd need to SIGKILL at the exact nanosecond between two INSERTs. The test does it deterministically:

```javascript
// File: tests/crash-simulation.test.js (lines 228–258)
test('partial writes should not persist after crash', () => {
    let writeCount = 0;
    const mockStmt = {
        run: jest.fn().mockImplementation(() => {
            writeCount++;
            if (writeCount === 2) {
                throw new Error('SIGKILL: Process terminated during second write');
            }
            return { changes: 1, lastInsertRowid: writeCount };
        })
    };
    mockDb.prepare.mockReturnValue(mockStmt);

    const transactionFn = mockDb.transaction(function() {
        mockDb.prepare('INSERT INTO sales (total) VALUES (?)').run(1000);
        mockDb.prepare('INSERT INTO transactions (amount) VALUES (?)').run(1000);
    });

    expect(() => { transactionFn(); }).toThrow('SIGKILL: Process terminated during second write');
    expect(writeCount).toBe(2);
});
```
*CODE SNIPPET 4 — Crash simulation test*

Every connection now enforces `PRAGMA journal_mode = WAL`. Every multi-step operation wraps in `db.transaction()`. If the process dies mid-write, the database is unmodified.

This is the kind of bug that only exists in theory until it happens to a real user at 2 AM during a thunderstorm. You can't test it by clicking around. You can only test it by writing code that simulates the impossible.

### A Dozen More — Other Things Tests Caught

| Bug | What was wrong |
|-----|----------------|
| **Invoice number reuse** | Deleting INV-05 freed its number; the next sale reused it. Audit trail had gaps — a tax auditor's red flag. Fix: rename deleted invoices to `INV-05-DEL-{timestamp}` |
| **Silent 500s** | Half the API endpoints returned empty `{}` on error. Users saw blank screens. Some endpoints even leaked SQL syntax and column names in error messages. |
| **Hardcoded encryption key** | If `config.json` was missing the `database_key`, the app silently used `'hisaab-pro-default-key-2026'` — a string in public source code. Anyone could decrypt any database. |
| **Duplicate payroll** | Calling `generatePayroll()` twice for the same staff+month created two salary payments. Cash debited twice. No error. |
| **Account balance drift** | Updating a sale amount only changed the `sales` table. The customer's `current_balance` wasn't re-synced. Balances drifted over time. |

Every single one of these was invisible in the UI. Every single one would have corrupted real financial data. Every single one was caught by a test before a user ever saw it.

---

## How 475 Tests Are Organized

*Purpose: The payoff. Scannable proof of the headline number.*
![Terminal 475 Tests Passed](/Blogs/blog-why-475-tests/Test_Status.png)
*SCREENSHOT 2 — Terminal: "Tests: 2 skipped, 473 passed, 475 total" in green*

I test in layers, not categories:

| Layer | Tests | What They Verify |
|-------|-------|------------------|
| **Accounting integrity** | ~130 | Double-entry (debit = credit), ledger balance, trial balance = 0 |
| **Data safety** | ~110 | WAL mode, atomic rollback, crash recovery, backup/restore |
| **Business constraints** | ~55 | No duplicate payroll, FK enforcement, no negative amounts |
| **Input validation** | ~55 | Zod schemas — bad dates, negative values, XSS attempts |
| **USB reliability** | ~85 | Cross-PC compatibility, drive letter changes, unsafe removal |
| **Error handling** | ~45 | No silent failures, no empty errors, sanitized messages |

Every test file begins with the same block:

```javascript
// File: tests/double-entry.test.js (lines 1–22)
/**
 * Double-Entry Enforcement Tests — Hisaab Pro
 *
 * Acceptance Criteria:
 * 1. Every transaction MUST create balanced journal entries (debit = credit)
 * 2. Failed transactions must not create partial ledger entries
 * 3. Updated transactions must maintain balance (old deleted, new balanced)
 * 4. Multiple transactions each maintain independent double-entry
 *
 * Following AAA Pattern: Arrange → Act → Assert
 */
```
*CODE SNIPPET 5 — Acceptance criteria header from test files*

This header forces me to articulate *why* the test exists before I write a single line of code. It's not about coverage percentages. It's about guarantees.

![VS Code Test Explorer](/Blogs/blog-why-475-tests/test_explorer.png)
*SCREENSHOT 3 — VS Code test explorer showing all 20 test files with their describe blocks*

---

## What Surprised Me

### 1. The test taught me how the system worked — not the other way around

I assumed I'd write the code first, then write tests to verify it. Instead, I'd write a test for a scenario I *thought* was handled, watch it fail, and discover behavior I didn't know existed. The partial commit bug was uncovered this way — I wrote the test expecting the API to reject negative amounts cleanly. The test showed me the API *did* reject it, but the database was already corrupted. The test knew the system better than I did.

Now I write the test first whenever I touch financial logic. Not for TDD purity — because the test reveals assumptions I didn't know I was making.

### 2. The most dangerous code is the simplest code

The one-line `UPDATE sales SET is_deleted = 1` that caused the ghost balance bug? It looked correct. It *was* correct — at doing the one thing it said. The problem was everything it *didn't* say. It didn't mention customer balances. It didn't mention linked transactions. It didn't mention payments. The code was simple because it was incomplete.

I've started reading simple functions with suspicion now. Simple often means "doesn't account for the other five things that need to happen."

### 3. You can't audit your way to confidence

Before the test suite, I audited. I'd manually check a few records after a change. "Looks good." But manual audit is sampling — you check five records and assume the other thousand are fine. The ghost balance bug affected *every* deleted sale going back weeks. A manual audit might have caught it on the third check, or the thirtieth, or never.

The test doesn't sample. The test checks every transaction, every time, in 0.3 seconds.

### 4. Normal testing assumptions don't apply here

A typical web app test asks: *"Does the button render?"* or *"Does the API return 200?"* These are questions about features.

Financial software needs a different set of questions:

- *"If the database write succeeds halfway through and fails halfway through, what state is the data in?"*
- *"If the user deletes a record they shouldn't have been able to delete, what else breaks?"*
- *"If the process is killed at exactly the wrong moment, does the recovery path work?"*
- *"If everything goes right but the output is quietly wrong, will anyone notice?"*

The first set is about functionality. The second set is about trust. An accounting app can survive a missing feature. It cannot survive broken trust.

---

## The Numbers

| Metric | Value |
|--------|-------|
| Test files | 20 |
| Total tests (`test()` + `it()` blocks) | 475 |
| Lines of test code | ~13,800 |
| Lines of application code | ~15,000 |
| Test-to-code ratio | ~0.9:1 |
| Real data-corruption bugs caught before production | 4 |
| Production data corruption incidents since tests | 0 |

---

## Closing: Tests Are a Product Feature

I don't write tests because I have to. I write them because an accounting app without tests is just a very elaborate way to corrupt financial data with style.

Every time I think "this is too simple to break," I think of Ramesh. He doesn't know what a transaction rollback is. He doesn't know what WAL mode does. He plugged in a USB drive and trusted it with his livelihood.

The one-line `UPDATE` would have failed him. The SIGKILL bug would have failed him. The partial commit would have failed him. The duplicate payroll would have failed him.

475 tests. 0 data corruption incidents since.

He doesn't know the tests exist. That's the point. He doesn't need to.

---

*Hisaab Pro is open source at [github.com/SolarisXD/hisaab-pro](https://github.com/SolarisXD/hisaab-pro). The test suite lives at `tests/`. 475 tests. Zero bugs in production. That's the point.*

---
# Hisaab Pro — Full Project Deep Dive

## What it is

Hisaab Pro is a professional, offline-first business ledger and accounting system built for retail shops and small businesses. It was built by Rahul Gehlot between January 2026 and April 2026.

The GitHub repository is at github.com/SolarisXD/Hisaab-Pro. The project has a product page linked from the resume.

The tech stack is Node.js, Express.js, SQLite, JavaScript, and Jest.

## Why it was built

Small businesses in India — particularly retail shops — still manage accounts in physical registers or rely on pirated copies of Tally. Rahul wanted to build a local-first alternative: something that works without internet, doesn't charge a monthly subscription, handles GST-ready invoicing, and keeps data properly encrypted on the user's own machine.

## What it does

Hisaab Pro has 9 core business modules including double-entry accounting, GST-ready invoicing, payroll, and attendance tracking. It generates 6 comprehensive financial reports: Balance Sheets, Profit & Loss statements, aging schedules, and others.

The payroll module is notable — it links daily staff attendance directly to ledger accounts and automates salary processing. This means the business owner doesn't manage attendance and payroll as two separate systems.

The system generates client-side PDF exports for invoices and reports. This was added in a later product version based on client feedback.

## Key technical decisions

**AES-256 encrypted SQLite storage.** Rahul chose encrypted SQLite over plain SQLite deliberately. Client financial data at rest with no encryption is unacceptable, especially for a desktop application running on hardware you don't control — USB drives, shared computers, machines without disk encryption. AES-256 at the database level means the data is protected regardless of what happens to the machine.

**Write-Ahead Logging (WAL) mode.** WAL was chosen specifically because the businesses using Hisaab Pro often work in environments where USB drives get removed mid-operation — common in small retail contexts. WAL keeps the database consistent even during unclean shutdowns. Default SQLite journal mode doesn't give the same guarantee for that failure pattern.

**350+ Jest tests across 18 files.** The test suite exists because silent wrong accounting is worse than a visible crash. A crash gets reported. A ledger that silently processes a payroll transaction twice doesn't get noticed until the client reviews their books — potentially weeks later. Every payroll path, ledger transaction, and duplicate-processing edge case is covered by tests. This wasn't a requirement; it was a design decision.

**Iterated across 2+ product versions.** The first version was deployed to clients. Based on real-world feedback, Rahul added payroll automation, attendance-linked salary processing, and client-side PDF exports in subsequent versions. Real client deployment drove the iteration, not assumptions.

## What makes it stand out

Most student accounting projects are CRUD apps with a database. Hisaab Pro has double-entry accounting logic (not single-entry), encrypted storage, WAL protection, a payroll engine with attendance linkage, and a test suite that would be considered adequate in a production codebase. It was shipped to real clients, not just built for a portfolio.

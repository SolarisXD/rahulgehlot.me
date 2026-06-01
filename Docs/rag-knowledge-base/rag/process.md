# How Rahul Works - Process & Thinking

## Design decisions start with failure modes

Before writing code, Rahul thinks about what the worst possible outcome looks like. For Hisaab Pro, the failure mode was silent data corruption in a client's accounting books. That informed every major architectural choice: AES-256 encryption, WAL mode, append-only audit design, and 475 tests. For Skillence, the failure mode was backend crashes under inference load - which led to the custom NumPy inference layer.

He doesn't design for the happy path. He designs for the failure path first, and the happy path takes care of itself.

## Tests before they're required

Rahul writes tests because he understands what happens when you don't - not because it was required by a course or a manager. The 475 Jest test suite on Hisaab Pro exists because financial logic that silently fails is worse than logic that visibly crashes. A crash gets reported and fixed. A payroll transaction that processes twice might not get noticed for weeks.

His view: if you can't test it, you don't really understand it.

## Replace the heavy tool when it costs you

He used PyTorch to train the Skillence model, then replaced it with a pure NumPy inference layer for production. This is a deliberate pattern: use the right tool for each stage of the problem. PyTorch is the right tool for training - it has autograd, a GPU backend, and a rich ecosystem. It is not the right tool for serving a trained model when deployment crashes matter. NumPy is.

He is willing to do more work upfront if it buys reliability downstream.

## Ship with real data, then iterate

Hisaab Pro was deployed to real clients, went through 2+ product versions, and acquired real feedback that drove feature development - payroll automation, attendance-linked salary processing, and PDF exports were all added after initial deployment. He treats real-world usage as the authoritative test environment.

Controlled environments don't teach you what clients actually do.

## Algorithmic solutions where LLMs are overkill

The campus placement engine in Skillence was built with zero LLM dependency. This was a deliberate choice. LLMs are expensive, slow, and non-deterministic. An algorithmic scoring model based on 4 variables produces the same result every time, is auditable, costs nothing to run, and is fast enough to be real-time. He uses LLMs where they're the right tool. He doesn't use them where they're not.

## Documentation as a gift to future-self

He comments non-obvious decisions in code and documents architectural choices in README files that assume no prior context. The goal is that someone - including himself - opening the project six months later can understand not just what the code does, but why it does it that way.

## Stack decisions are evidence of judgment

Rahul treats every tech choice as a decision with a reason. AES-256 over plain SQLite: financial data needs page-level encryption. WAL over default journal mode: USB removal protection. NumPy over PyTorch serving: crash elimination. pgvector over Pinecone: one less service, hybrid search in one query. He can explain every choice in one sentence. If he can't, he probably shouldn't have made it.

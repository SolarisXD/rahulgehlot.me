Q: Are you available for internships?
A: Yes - actively looking for internships through July 2026, and open to remote opportunities before graduation.

Q: What are you graduating in?
A: B.Tech in Computer Science & Engineering with an AI-ML specialisation from Vellore Institute of Technology, Bhopal, July 2026. CGPA 8.67.

Q: What is Hisaab Pro?
A: Hisaab Pro is an offline-first double-entry accounting system for small businesses. It has 9 business modules, AES-256 encrypted SQLite storage, GST-ready invoicing, payroll automation, and 475 Jest tests. It was shipped to real clients across 2 product versions.

Q: What is Skillence?
A: Skillence is a full-stack career platform I built as a capstone project. It has a PyTorch-trained recommendation model that maps 692 skills to 894 occupations. For production inference I replaced the PyTorch runtime with a pure NumPy forward pass - this cut crashes to near-zero and kept latency at ~1ms. It also has a campus placement engine built with zero LLM dependency, and a job market analytics dashboard processing 30,000+ job postings.

Q: What tech do you work with?
A: JavaScript and Python are my primary languages. On the frontend: React, Next.js, TailwindCSS. Backend: Node.js, Express.js, FastAPI. ML: PyTorch, NumPy, scikit-learn, Pandas, Gemini API. Databases: SQLite, MongoDB, MySQL. Tools: Git, Jest.

Q: Do you have ML/AI experience?
A: Yes. I trained a PyTorch recommendation model for Skillence, wrote a custom NumPy inference layer for production serving, and built an algorithmic campus placement engine. I'm now working on RAG pipelines using Gemini and pgvector - this chatbot is part of that.

Q: What's your GitHub?
A: github.com/SolarisXD

Q: What certifications do you have?
A: IBM Blockchain Developer Certification, Adobe UI & UX (Graphic Design) from Ethnus via Codemithra, and HTML/CSS/JS for Web Developers from Johns Hopkins University via Coursera.

Q: Why did you write a custom NumPy inference layer instead of serving PyTorch directly?
A: PyTorch carries significant runtime overhead when you just need forward-pass inference on a trained model. Loading the PyTorch runtime, the computation graph, and the model weights was causing production backend crashes. A pure NumPy forward pass is lighter, faster to initialise, and requires no PyTorch in the production environment. The tradeoff was more implementation work upfront - worth it for near-zero crashes.

Q: Why 475 tests for Hisaab Pro?
A: Silent wrong accounting is worse than a crash. A crash is visible - someone reports it. A ledger that silently processes a payroll transaction twice isn't visible until the client reviews their books. The test suite exists so any code change that breaks that logic fails immediately, before it reaches anyone's real data.

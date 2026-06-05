# Skillence - Full Project Deep Dive

## What it is

Skillence is an AI-powered career platform built as a capstone project at Vellore Institute of Technology, Bhopal. It was built between July 2025 and March 2026.

The GitHub repository is at github.com/SolarisXD/Skillence. It has a live site linked from the resume.

The tech stack is React 19, FastAPI, PyTorch, NumPy, Gemini API, and Azure AI.

## Why it was built

Campus placement processes at Indian engineering colleges are slow, disconnected from real job market data, and rely on manual shortlisting. Rahul wanted to build a platform that could match students to occupations based on actual skill gaps - not just keyword matching between resume bullets and job titles - and give them real market data about salaries and demand across countries.

## What it does

Skillence is a 3-stage recommendation pipeline. At its core it evaluates a vocabulary of 692 skills and maps user profiles against 894 occupations. The inference latency is approximately 1 millisecond.

**The skill-to-occupation recommendation engine** takes a user's skill profile and runs it through a trained PyTorch model to identify the best-matched occupations, the skills that are strong, and the gaps that need filling.

**The campus placement engine** parses student academic grade histories and applies a 4-variable algorithmic scoring model to automate shortlisting. This was built with zero LLM dependency - the decision to avoid LLMs here was deliberate. LLMs are expensive, slow, and non-deterministic. An algorithmic scoring model is faster, cheaper, auditable, and gives the same result every time on the same input.

**The job market analytics dashboard** processes 30,000+ real job postings. It gives users ML-based salary predictors and an interactive offer evaluator that benchmarks salary data across 25+ countries. This means a student evaluating an offer can compare it against real market data, not just intuition.

## The key technical decision - custom NumPy inference layer

This is the most technically interesting decision in the project.

After training the recommendation model in PyTorch, Rahul replaced the PyTorch runtime in production with a custom pure NumPy forward pass for serving inference.

**Why:** PyTorch carries significant runtime overhead when all you need is to run a trained model's forward pass. Loading the PyTorch runtime, the computation graph, and model weights into memory on each request was causing backend crashes under load. The inference itself - once the model is trained - is just matrix multiplications and activation functions. NumPy can do this without any of PyTorch's overhead.

**The result:** Backend deployment crashes reduced to near-zero. Inference latency approximately 1ms. No PyTorch dependency in the production environment. The tradeoff was more implementation work upfront - writing the forward pass in NumPy manually rather than calling model.predict(). Rahul judged this worth it.

This is an unusual decision for a student project. Most developers would serve the PyTorch model directly, accept the occasional crash, and move on. Replacing the runtime because deployment reliability mattered more than convenience signals a different set of priorities.

## What makes it stand out

Skillence is a full-stack AI system with a custom-trained ML model, a production-ready inference layer, an algorithmic decision engine that deliberately avoids LLMs for the right reasons, and a data analytics component processing tens of thousands of real postings. It was built at capstone scale with the architecture decisions you'd expect from a production system, not a student project.

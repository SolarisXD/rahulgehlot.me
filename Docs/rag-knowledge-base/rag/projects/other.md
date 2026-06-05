# SwapHub & Other Projects

## SwapHub

SwapHub is a campus-focused marketplace built between February 2024 and May 2024. It allows students to list, browse, and exchange items across categories: Buy, Sell, Donate, and Rent.

The GitHub repository is at github.com/SolarisXD/SwapHub. It has a live site.

The tech stack is React, Node.js, Express.js, MongoDB, TailwindCSS, and Passport.js.

### What it does

SwapHub is a full-stack marketplace. The backend uses Express.js REST APIs for product management and user operations. Data is stored in MongoDB with Mongoose ODM, including relational modeling between users and their product listings.

Authentication uses Passport.js with the passport-local-mongoose strategy - covering registration, login, secure password hashing, and cookie-based session persistence with express-session middleware for protected routes.

The frontend uses modular React components: product grids, forms with client-side validation, image upload functionality, and category carousels. Axios handles HTTP communication with the backend.

### Why it matters

SwapHub was Rahul's first complete full-stack project - frontend, backend, database, authentication, and deployment all integrated. It demonstrates that he can build a complete working product independently, not just individual components in isolation.

---

## This Portfolio

The portfolio site itself is a project. It is built with Next.js 14, TypeScript, and Tailwind CSS, and features an embedded RAG chatbot powered by Gemini 1.5 Flash, Supabase pgvector for vector search, and Langfuse for observability tracing. The entire system runs on free-tier infrastructure.

The chatbot answers questions about Rahul's work, technical decisions, skills, and availability. It uses hybrid search - combining pgvector cosine similarity with Supabase full-text search - and reranking before generating an answer. The portfolio itself is part of the case study for building production RAG pipelines.

---

## GitHub Profile

Rahul's GitHub username is SolarisXD. He has 16 public repositories. The profile bio notes he is a senior at Vellore Institute of Technology, Bhopal.

His primary public repositories are Hisaab-Pro and Skillence. SwapHub is also public. The profile can be found at github.com/SolarisXD.

---

## Image Captioning Project

Rahul also built an Image Captioning project using a CNN + Transformer architecture that generates natural language descriptions of images. This was a machine learning academic project built with Python and PyTorch. It demonstrates his ability to work with neural network architectures beyond just using pre-trained APIs.

# 🇩🇪 German AI Internship Matcher


**Built by:** A Master's student in Artificial Intelligence at BTU Cottbus-Senftenberg.

🔗 **Live demo:** Deploy free on [Vercel](https://vercel.com), [Netlify](https://netlify.com), or [GitHub Pages](https://pages.github.com) (instructions below).

---

## ✨ What it does

1. **Takes your profile** — skills, university, projects, experience.
2. **Embeds your profile** using a real transformer model (`all-MiniLM-L6-v2`) running **in your browser** via Transformers.js.
3. **Semantically matches** you against curated internship descriptions using cosine similarity (the same math used in RAG systems).
4. **Ranks and scores** matches (e.g., "87% match") with skill-gap analysis.
5. **Generates a personalized cover letter** per company you can copy, download, and tailor.

## 🧠 Tech stack & why each choice was made

| Tech | Why |
|---|---|
| **Transformers.js** | Runs Hugging Face models in the browser via ONNX Runtime WebAssembly. **Why:** Zero API costs, no backend needed, 100% private (data never leaves the user's device). Directly demonstrates the in-browser ML skills German companies list in JDs. |
| **all-MiniLM-L6-v2** | 384-dim sentence embeddings, ~90 MB. **Why:** State-of-the-art semantic similarity, same architecture used in production RAG systems at SAP, Siemens, DeepL, etc. |
| **React + Vite + TypeScript** | **Why:** Industry-standard modern stack. TypeScript shows engineering rigor beyond just ML scripting. |
| **Tailwind CSS v4** | **Why:** Rapid, consistent UI without a design system overhead. |
| **Cosine similarity on normalized embeddings** | **Why:** Core technique in RAG and vector search — directly maps to skills German job descriptions ask for. |
| **Static deployment** (Vercel/Netlify/GitHub Pages) | **Why:** Free forever, CDN-fast, recruiters can test the live link instantly. |

## 🎯 Real-world problem solved

**Problem:** As an international Master's student in Germany, finding the right AI internship is overwhelming — hundreds of postings across dozens of companies, each with different skill requirements.

**Solution:** A tool that uses the same GenAI/RAG techniques companies want you to know, applied to the job search itself.

**Bonus:** The app is itself a portfolio piece. When applying, you can say: *"I built an app that runs a transformer model entirely in the browser, uses semantic embeddings for ranking (same principle as RAG), and solves my own real problem. Here's the live link."*

## 🚀 How to run locally

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

The first time you click "Find My Matches", the browser downloads the ~90 MB MiniLM model from Hugging Face Hub and caches it. Subsequent loads are instant.

## 🌍 Deploy for free (pick one)

### Option 1: Vercel (recommended, 30 seconds)

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new).
3. Import the repo → click "Deploy".
4. Done. You get a free `*.vercel.app` URL.

### Option 2: Netlify

1. Run `npm run build` locally.
2. Drag-and-drop the `dist/` folder onto [app.netlify.com/drop](https://app.netlify.com/drop).
3. Done. Free `*.netlify.app` URL.

### Option 3: GitHub Pages

1. Run `npm run build`.
2. Push the `dist/` folder to a `gh-pages` branch.
3. Enable Pages in repo settings.

All three are **100% free forever** for personal projects.

## 📂 Project structure

```
src/
├── App.tsx                    # Main UI (React component)
├── main.tsx                   # React entry point
├── data/
│   └── internships.ts         # Curated dataset of 20 real German AI internships
├── services/
│   ├── embeddings.ts          # Transformers.js wrapper + cosine similarity
│   └── coverLetter.ts         # Personalized cover letter generator
└── vite-env.d.ts              # Type declarations
```



**This project demonstrates:** LLM/embedding concepts (semantic search via transformers.js), frontend engineering (React/TS), deployment (static hosting), real-world problem solving, and the ability to ship a complete product — exactly what hiring managers want to see.

## 📝 License

MIT — use this as a template for your own portfolio.

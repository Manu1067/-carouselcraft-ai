# CarouselCraft AI 🎠✨

> A modern, AI-powered social media carousel creation platform built with React, TypeScript, Tailwind CSS, Express, and Google Gemini API (`@google/genai`).

CarouselCraft AI transforms raw, unstructured content ideas into professionally structured, visually appealing, and editable Instagram and LinkedIn carousels.

---

## 🌟 Key Features

1. **AI Narrative Architecture (Gemini 3.8 Flash)**
   - Powered by official Google GenAI SDK (`@google/genai`) on an Express server backend.
   - Structured JSON schema enforcement with cognitive hooks, 5–10 slide progression arcs, visual direction archetypes, and closing calls-to-action.
   - Resilient Offline Demo Mode Fallback engine with clear labeling when API keys lack billing or are offline.

2. **The 7-Stage Creation Pipeline**
   - **01. Idea Input**: Topic, target audience, platform (LinkedIn/Instagram), content tone, and slide count.
   - **02. Research & Structure**: Hook formulation and narrative progression logic.
   - **03. Copy Synthesis**: High-signal headlines, body copy (<35 words), and bullet points.
   - **04. Visual Direction**: Slide archetypes (Hook, Insight, Framework, Comparison, Quote, CTA) and focal points.
   - **05. Slide Styling**: Three distinct design presets (*Minimal Editorial*, *Bold Gradient*, *Professional Business*).
   - **06. Founder Review**: Human-in-the-loop quality check, mobile text density audit, and approval gating.
   - **07. Multi-Format Export**: Production-ready slide rendering at 1080px resolution.

3. **Interactive 3-Panel Studio Editor**
   - **Sequence Filmstrip**: Drag-and-drop reordering, move up/down buttons, duplicate slide, add slide, and deletion with confirmation dialog.
   - **Live Canvas Preview**: Real-time rendering with 1:1 Square and 4:5 Portrait aspect ratio toggling, along with optional social feed framing.
   - **Styling & Copy Inspector**: Direct editing of headline, body, bullets, CTA, custom background/text color pickers, and author branding.

4. **Multi-Format Export Engine**
   - **ZIP Archive (All PNGs)**: Captures every slide in high resolution (1080px wide, 2x pixel density) bundled via `JSZip`.
   - **Multi-Page PDF**: Vector-ready multi-page document tailored for LinkedIn document carousels via `jsPDF`.
   - **Single Slide PNG**: Individual slide capture for teaser posts and hero covers.
   - **Structured JSON**: Complete machine-readable narrative schema, metadata, and visual directions.

5. **Local Persistence & Repository**
   - Fully editable preloaded project: *"Why Every College Student Should Learn AI"*.
   - Browser `localStorage` persistence with real-time saving, duplication, search, platform filtering, and one-click sample restoration.

---

## 🛠️ Tech Stack & Dependencies

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide React icons
- **Backend / API**: Node.js, Express, Vite middleware (`vite.middlewares`), `tsx`
- **AI SDK**: `@google/genai` (Google GenAI JavaScript SDK)
- **Document & Image Processing**:
  - `html-to-image`: DOM node to high-res PNG canvas rasterization
  - `jszip`: In-browser client-side ZIP archive compilation
  - `jspdf`: Vector-ready multi-page PDF generation

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (version 18 or higher recommended)
- npm or bun

### 2. Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Configure your environment variables:
```ini
# GEMINI_API_KEY: Required for real-time Gemini AI API calls.
# Obtain your key from https://aistudio.google.com/
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"

# PORT: The port to run the full-stack dev server (default: 3000)
PORT=3000
```

> **Note on API Keys**: If `GEMINI_API_KEY` is not provided or set to a placeholder, CarouselCraft AI cleanly activates the **Demo Mode Engine**, generating structured, high-quality carousels locally without crashing or failing.

### 3. Installation
Install project dependencies:
```bash
npm install
```

### 4. Running the Development Server
Start the Express server with Vite middleware:
```bash
npm run dev
```
Open your browser at `http://localhost:3000`.

### 5. Health Check
Verify server status and Gemini SDK readiness:
```bash
curl http://localhost:3000/api/health
```

Expected response:
```json
{
  "status": "ok",
  "hasApiKey": true,
  "model": "gemini-3.8-flash",
  "timestamp": "2026-11-09T..."
}
```

### 6. Production Build
Build client assets:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

---

## 🔒 Security & Best Practices
- **No Client Secrets**: API keys are strictly evaluated server-side in `server.ts`. No API secrets or tokens are bundled into client-side code.
- **Strict Response Validation**: Output from Gemini is constrained by typed JSON schemas to guarantee slide structure and prevent runtime rendering errors.
- **Safe Persistence**: LocalStorage operations include try/catch safety shields to prevent quota exhaustion crashes.

---

## 📄 License
Apache-2.0

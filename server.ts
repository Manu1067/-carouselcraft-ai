import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

app.use(express.json({ limit: '10mb' }));

// Initialize GoogleGenAI client on server only
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
  try {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
    console.log('[Server] GoogleGenAI client initialized successfully with server-side API key');
  } catch (err) {
    console.error('[Server] Failed to initialize GoogleGenAI client:', err);
  }
} else {
  console.warn('[Server] GEMINI_API_KEY not configured or set to placeholder. Real API calls will prompt fallback or key configuration.');
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasApiKey: !!(apiKey && apiKey !== 'MY_GEMINI_API_KEY'),
    model: 'gemini-3.8-flash',
    timestamp: new Date().toISOString()
  });
});

// Carousel generation endpoint
app.post('/api/generate-carousel', async (req, res) => {
  const { topic, targetAudience, platform, tone, slideCount, objective } = req.body;

  if (!topic || typeof topic !== 'string') {
    return res.status(400).json({ error: 'Missing topic or topic is invalid.' });
  }

  const requestedSlides = Math.min(Math.max(parseInt(String(slideCount) || '7', 10), 3), 10);
  const targetPlatform = platform || 'instagram';
  const targetTone = tone || 'Educational';
  const targetObjective = objective || 'Educate';
  const audience = targetAudience || 'Professionals and creators';

  // If no AI client is available, inform client so it can activate demo generation mode
  if (!aiClient) {
    return res.status(503).json({
      error: 'GEMINI_API_KEY is not set or invalid in server environment.',
      code: 'API_KEY_MISSING',
      message: 'Running in demo mode with pre-engineered high-converting carousel synthesis.'
    });
  }

  try {
    const prompt = `You are an elite social media ghostwriter and visual designer specialized in viral, high-converting carousels for ${targetPlatform === 'instagram' ? 'Instagram (1:1 / 4:5)' : 'LinkedIn (PDF slide document)'}.

Topic: "${topic}"
Target Audience: ${audience}
Tone: ${targetTone}
Objective: ${targetObjective}
Total Slides Required: Exactly ${requestedSlides} slides.

NARRATIVE ARCHITECTURE RULES:
- Slide 1 (The Hook): A magnetic, pattern-interrupting headline. High contrast, visceral curiosity or bold claim. Subheadline with instant clarity on the payoff.
- Middle Slides (Value & Narrative Arc): Logical progression (e.g., The Common Trap ➔ The Paradigm Shift ➔ Step-by-Step System / Breakdown ➔ Real-world Case/Example ➔ Concrete Action Steps). Keep body copy punchy (under 35 words per slide) and use 2-4 bite-sized bullets.
- Final Slide (The Payoff & Call-To-Action): Summarize the big takeaway. Deliver a clear, high-intent call to action (save, share, comment, follow).

VISUAL DIRECTION:
For each slide provide an archetype ('hook' | 'insight' | 'comparison' | 'framework' | 'quote' | 'cta'), a suggested Lucide icon name, concise layout guidance, and the primary focal point.

Generate a structured carousel with exactly ${requestedSlides} slides.`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: 'You produce clean, structured JSON carousels for social platforms. Never write markdown conversational fluff. Return strictly valid JSON adhering to the specified schema.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: {
              type: Type.STRING,
              description: 'Compelling title of the carousel deck',
            },
            summary: {
              type: Type.STRING,
              description: 'One sentence summary of the core thesis',
            },
            verificationNotes: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Fact-checking notes and citations to verify before publishing',
            },
            slides: {
              type: Type.ARRAY,
              description: 'The sequenced slides of the carousel',
              items: {
                type: Type.OBJECT,
                properties: {
                  slideNumber: { type: Type.INTEGER },
                  badge: { type: Type.STRING, description: 'Micro-tag or section badge e.g. 01 / HOOK or STEP 1' },
                  headline: { type: Type.STRING, description: 'Punchy slide headline' },
                  subheadline: { type: Type.STRING, description: 'Supportive sub-header or context' },
                  body: { type: Type.STRING, description: 'Main narrative body paragraph (concise, under 40 words)' },
                  bullets: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: 'Bullet points with high-signal tips or examples',
                  },
                  callToAction: { type: Type.STRING, description: 'Swipe cue or closing CTA' },
                  visualDirection: {
                    type: Type.OBJECT,
                    properties: {
                      archetype: { type: Type.STRING, description: 'hook, insight, comparison, framework, quote, or cta' },
                      suggestedIcon: { type: Type.STRING, description: 'Lucide icon name like Sparkles, ArrowRight, Zap, Target' },
                      layoutNotes: { type: Type.STRING, description: 'Guidance on visual emphasis and card layout' },
                      focalPoint: { type: Type.STRING, description: 'The primary thing the viewer should notice first' }
                    },
                    required: ['archetype', 'layoutNotes', 'focalPoint']
                  }
                },
                required: ['slideNumber', 'headline', 'body', 'visualDirection']
              }
            }
          },
          required: ['title', 'summary', 'slides']
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error('Empty response received from Gemini model.');
    }

    let parsedData;
    try {
      parsedData = JSON.parse(text);
    } catch (parseErr) {
      // Clean up markdown code blocks if present
      const clean = text.replace(/```json\n?|\n?```/g, '').trim();
      parsedData = JSON.parse(clean);
    }

    return res.json({
      success: true,
      data: parsedData,
      source: 'gemini-3.8-flash'
    });
  } catch (err: any) {
    console.error('[Server] Gemini Generation Error:', err);
    let errMsg = err?.message || 'Error executing AI generation with Gemini.';
    let isQuotaOrBilling = false;

    // Check if error message contains stringified JSON from API
    try {
      const parsedErr = JSON.parse(errMsg);
      if (parsedErr?.error?.message) {
        errMsg = parsedErr.error.message;
      }
    } catch (e) {
      // Not JSON stringified
    }

    if (errMsg.includes('billing') || errMsg.includes('free tier') || errMsg.includes('PERMISSION_DENIED') || errMsg.includes('quota') || errMsg.includes('RESOURCE_EXHAUSTED')) {
      isQuotaOrBilling = true;
    }

    return res.status(500).json({
      error: errMsg,
      code: err?.status || (isQuotaOrBilling ? 403 : 'AI_GENERATION_FAILED'),
      isQuotaOrBilling,
      details: err?.toString()
    });
  }
});

// Setup Vite middleware for local development or serve dist in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[CarouselCraft AI] Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('[Server] Fatal startup error:', err);
  process.exit(1);
});

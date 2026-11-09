import { CarouselProject, TemplateDefinition, WorkflowStage } from '../types/carousel';

export const SAMPLE_CAROUSEL: CarouselProject = {
  id: 'sample-project-college-ai',
  title: 'Why Every College Student Should Learn AI',
  topic: 'Why Every College Student Should Learn AI in 2026: Career Advantage, Modern Tools, and Practical Advice',
  targetAudience: 'College Students, Gen Z Creators, and Early-Career Explorers',
  platform: 'linkedin',
  aspectRatio: '4:5',
  tone: 'Educational',
  objective: 'Inspire',
  slideCount: 7,
  template: 'bold-gradient',
  authorName: 'Alex Rivera',
  authorHandle: '@alexcreates',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  isApproved: false,
  isSample: true,
  aiGenerated: true,
  verificationNotes: [
    'AI-generated draft for educational review.',
    'Statistics on job market trends should be verified against recent 2025/2026 economic survey reports.',
    'Tool recommendations are non-promotional and based on widespread adoption.'
  ],
  slides: [
    {
      id: 'slide-1',
      slideNumber: 1,
      badge: 'CAREER BLUEPRINT 2026',
      headline: 'AI won\'t take your degree.\nSomeone using AI will.',
      subheadline: 'The unfair advantage every college student needs right now.',
      body: '78% of hiring managers now prioritize AI-fluent candidates regardless of major. Here is the 5-minute playbook to get ahead before graduation.',
      callToAction: 'Swipe to see the roadmap ➔',
      visualDirection: {
        archetype: 'hook',
        suggestedIcon: 'Sparkles',
        layoutNotes: 'High-contrast hero hook with oversized headline typography and electric violet gradient aura.',
        focalPoint: 'Primary contrast between traditional degree vs. AI leverage'
      }
    },
    {
      id: 'slide-2',
      slideNumber: 2,
      badge: '01 / THE SHIFT',
      headline: 'The New Definition of "Computer Literacy"',
      subheadline: 'From Microsoft Excel in 2005 to Prompt Engineering today',
      body: 'In 2005, putting "Proficient in MS Office" got you interviews. Today, knowing how to augment your research, code, and writing with AI models is the baseline table stakes.',
      bullets: [
        'Research synthesis in 10 minutes instead of 8 hours',
        'Custom Python scripts without a CS degree',
        'Drafting executive memos with strict logical constraints'
      ],
      visualDirection: {
        archetype: 'insight',
        suggestedIcon: 'TrendingUp',
        layoutNotes: 'Split card layout comparing 2005 baseline skills vs 2026 intelligence amplification.',
        focalPoint: 'Comparative list highlights'
      }
    },
    {
      id: 'slide-3',
      slideNumber: 3,
      badge: '02 / REAL APPLICATIONS',
      headline: '3 Real AI Workflows for College Success',
      subheadline: 'Work smarter across academics, internships, and side projects',
      body: 'Stop using AI just to summarize PDFs. Here is how top students actually deploy intelligence engines:',
      bullets: [
        'Socratic Exam Prep: Ask AI to interrogate you on course materials until your reasoning holds',
        'Literature Cross-Referencing: Trace contradictory academic claims across 20 papers in seconds',
        'Portfolio Velocity: Build functional full-stack web prototypes over a single weekend'
      ],
      visualDirection: {
        archetype: 'framework',
        suggestedIcon: 'Cpu',
        layoutNotes: 'Numbered stacked cards with electric violet indicator pips.',
        focalPoint: '3 actionable workflows'
      }
    },
    {
      id: 'slide-4',
      slideNumber: 4,
      badge: '03 / THE TRAP',
      headline: 'The 90% Student Mistake to Avoid',
      subheadline: 'Passive consumption vs. Active augmentation',
      body: 'If you use AI to do your thinking for you, you atrophy your own critical reasoning and produce generic slop. The highest performers use AI as an intellectual sparring partner, not a lazy ghostwriter.',
      bullets: [
        'Bad: "Write my essay on behavioral economics"',
        'Good: "Challenge my hypothesis with 3 counter-arguments from Nobel laureates"'
      ],
      visualDirection: {
        archetype: 'comparison',
        suggestedIcon: 'AlertTriangle',
        layoutNotes: 'Visual contrast blocks: Red-tinted Bad prompt vs Violet-tinted Master prompt.',
        focalPoint: 'Contrast between passive cheating and high-leverage intellectual augmentation'
      }
    },
    {
      id: 'slide-5',
      slideNumber: 5,
      badge: '04 / PRACTICAL TOOLKIT',
      headline: 'Your Starter Stack (100% Free Tiers)',
      subheadline: 'Zero subscription fees needed to start building mastery',
      body: 'You do not need $200/month in SaaS subscriptions. Master these three foundational toolsets first:',
      bullets: [
        'Reasoning & Research: Gemini 3.8 / Flash for deep multimodal analysis & structured data',
        'Code & Building: Claude Code / Cursor free tier for rapid software scaffolding',
        'Visual Design: AI Studio canvas & vector tools to turn data into compelling decks'
      ],
      visualDirection: {
        archetype: 'framework',
        suggestedIcon: 'Layers',
        layoutNotes: 'Three distinct column badges with clean border separation and tech tags.',
        focalPoint: 'Starter stack breakdown'
      }
    },
    {
      id: 'slide-6',
      slideNumber: 6,
      badge: '05 / THE 30-DAY CHALLENGE',
      headline: 'Your 30-Day AI Competency Sprint',
      subheadline: 'One tangible outcome you can show recruiters',
      body: 'Don\'t just read threads. Build one real project this month that proves you know how to operate alongside AI models:',
      bullets: [
        'Week 1: Automate one boring daily academic workflow with scripts',
        'Week 2: Build a niche knowledge assistant using course notes',
        'Week 3: Ship a public mini-app or interactive case study',
        'Week 4: Document the case study on LinkedIn or GitHub'
      ],
      visualDirection: {
        archetype: 'framework',
        suggestedIcon: 'CheckCircle2',
        layoutNotes: 'Four-stage timeline progression with soft violet progress trail.',
        focalPoint: 'Timeline stages'
      }
    },
    {
      id: 'slide-7',
      slideNumber: 7,
      badge: 'THE NEXT STEP',
      headline: 'Ready to build your AI advantage?',
      subheadline: 'Save this post. Start sprint week 1 today.',
      body: 'The window to be an early adopter is closing as AI becomes standard curriculum. Those who master the tools today become the team leaders of tomorrow.',
      bullets: [
        'Bookmark this carousel for your weekend sprint',
        'Tag a study buddy who needs to see this',
        'Drop your target industry in comments for custom prompts'
      ],
      callToAction: 'Follow @alexcreates for weekly AI frameworks ➔',
      visualDirection: {
        archetype: 'cta',
        suggestedIcon: 'Bookmark',
        layoutNotes: 'Outro slide with high-emphasis bookmark icon, author avatar placeholder, and strong engagement buttons.',
        focalPoint: 'Action items & author connection'
      }
    }
  ]
};

export const TEMPLATES_CONFIG: Record<string, TemplateDefinition> = {
  'minimal-editorial': {
    id: 'minimal-editorial',
    name: 'Minimal Editorial',
    description: 'Clean typography, generous whitespace, understated borders, and elegant neutral tones.',
    previewGradient: 'from-zinc-900 to-zinc-950',
    bgDefault: '#090a0f',
    textDefault: '#f8fafc',
    accentDefault: '#a78bfa',
    fontHeading: 'font-serif',
    fontBody: 'font-sans',
    borderStyle: 'border border-zinc-800/80',
    tagline: 'Ideal for thought leaders, writers, and editorial storytellers'
  },
  'bold-gradient': {
    id: 'bold-gradient',
    name: 'Bold Gradient',
    description: 'Vibrant neon gradient auras, punchy headlines, high-energy contrast, and modern badges.',
    previewGradient: 'from-violet-950 via-slate-900 to-indigo-950',
    bgDefault: '#0d0f1d',
    textDefault: '#ffffff',
    accentDefault: '#8b5cf6',
    fontHeading: 'font-heading font-extrabold',
    fontBody: 'font-sans',
    borderStyle: 'border border-violet-500/20 shadow-xl shadow-violet-950/40',
    tagline: 'High-converting for Instagram feeds, tech founders, and growth creators'
  },
  'professional-business': {
    id: 'professional-business',
    name: 'Professional Business',
    description: 'Structured grid alignments, corporate navy & slate tones, metric callouts, and clean polish.',
    previewGradient: 'from-slate-900 to-blue-950',
    bgDefault: '#0a1128',
    textDefault: '#f1f5f9',
    accentDefault: '#38bdf8',
    fontHeading: 'font-heading font-bold',
    fontBody: 'font-sans',
    borderStyle: 'border border-cyan-500/20 shadow-lg shadow-blue-950/30',
    tagline: 'Tailored for LinkedIn B2B thought leaders, executive insights, and SaaS guides'
  }
};

export const INITIAL_WORKFLOW_STAGES: WorkflowStage[] = [
  {
    id: 'idea-input',
    name: 'Idea & Angle Input',
    description: 'Define core topic, target audience, platform format, and content tone.',
    status: 'completed',
    stepNumber: 1,
    details: 'Topic & parameters specified'
  },
  {
    id: 'research-structure',
    name: 'Research & Narrative Arc',
    description: 'Analyze cognitive flow: Hook ➔ Problem ➔ Solution ➔ Proof ➔ CTA.',
    status: 'completed',
    stepNumber: 2,
    details: '7-slide logical arc structured'
  },
  {
    id: 'copy-generation',
    name: 'Headline & Copy Generation',
    description: 'Synthesize punchy headlines, digestible bullet points, and high-impact micro-copy.',
    status: 'completed',
    stepNumber: 3,
    details: 'Gemini 3.8 Flash generation completed'
  },
  {
    id: 'visual-direction',
    name: 'Visual Layout Direction',
    description: 'Map visual archetypes, layout weights, and focal highlights per slide.',
    status: 'completed',
    stepNumber: 4,
    details: 'Visual archetypes and icons mapped'
  },
  {
    id: 'carousel-design',
    name: 'Design & Canvas Styling',
    description: 'Apply theme presets, typography sizing, gradient backdrops, and branding tags.',
    status: 'completed',
    stepNumber: 5,
    details: 'Bold Gradient styling active'
  },
  {
    id: 'founder-review',
    name: 'Founder Quality Review',
    description: 'Human-in-the-loop review for text density, claim verification, and rhythm.',
    status: 'in-progress',
    stepNumber: 6,
    details: 'Ready for founder sign-off'
  },
  {
    id: 'export',
    name: 'Multi-Format Export',
    description: 'Render high-resolution PNGs, zipped bundle, multi-page PDF, or JSON schema.',
    status: 'pending',
    stepNumber: 7,
    details: 'Awaiting review approval'
  }
];

export const QUICK_TEMPLATES = [
  {
    id: 'qt-framework',
    title: 'The 3-Step Framework',
    topic: 'How to scale customer retention using a simple 3-part framework',
    audience: 'Early-stage founders & marketing leads',
    platform: 'linkedin' as const,
    tone: 'Educational' as const,
    objective: 'Educate' as const,
    slides: 5,
    description: 'Clear methodology breakdown with step-by-step implementation.'
  },
  {
    id: 'qt-mythbuster',
    title: 'The Myth Buster',
    topic: '5 Toxic Myths about AI and Remote Work you need to stop believing',
    audience: 'Tech professionals and knowledge workers',
    platform: 'instagram' as const,
    tone: 'Bold' as const,
    objective: 'Inspire' as const,
    slides: 7,
    description: 'High engagement counter-intuitive insights that spark comments.'
  },
  {
    id: 'qt-teardown',
    title: 'SaaS Teardown & Case Study',
    topic: 'How Notion scaled from $0 to $10B with product-led growth',
    audience: 'Product managers and venture builders',
    platform: 'linkedin' as const,
    tone: 'Professional' as const,
    objective: 'Educate' as const,
    slides: 7,
    description: 'Data-driven breakdown with actionable lessons for any business.'
  },
  {
    id: 'qt-storytelling',
    title: 'The Vulnerable Founder Story',
    topic: 'I spent 6 months building the wrong product. Here are 4 hard truths.',
    audience: 'Indie hackers, entrepreneurs, and creators',
    platform: 'instagram' as const,
    tone: 'Storytelling' as const,
    objective: 'Inspire' as const,
    slides: 5,
    description: 'Personal, authentic storytelling that creates deep emotional connection.'
  }
];

export const TOPIC_SUGGESTIONS = [
  'Why Every College Student Should Learn AI in 2026',
  '5 Pricing Psychology Secrets Every Bootstrapped Founder Needs to Know',
  'How to Build a High-Converting Personal Brand on LinkedIn in 30 Mins a Day',
  'The Zero-to-One Product Launch Checklist: 7 Steps to Validate Fast',
  'Stop Doing 100 Meetings: The Asynchronous Operating System for High-Growth Teams'
];

import { CarouselProject, ContentTone, ContentObjective, Platform, SlideContent } from '../types/carousel';

export interface GenerateParams {
  topic: string;
  targetAudience: string;
  platform: Platform;
  tone: ContentTone;
  slideCount: number;
  objective: ContentObjective;
}

export interface GenerationResult {
  carousel: CarouselProject;
  isDemo: boolean;
  message?: string;
  source: string;
}

// Client-side synthesis fallback when Gemini API key is missing or offline
export function generateDemoFallback(params: GenerateParams): CarouselProject {
  const { topic, targetAudience, platform, tone, slideCount, objective } = params;
  const count = slideCount || 7;
  
  const slides: SlideContent[] = [];

  // Slide 1: The Hook
  slides.push({
    id: `slide-gen-1-${Date.now()}`,
    slideNumber: 1,
    badge: `01 / THE HOOK • ${tone.toUpperCase()}`,
    headline: `The Truth About ${topic.length > 40 ? topic.slice(0, 37) + '...' : topic}`,
    subheadline: `What 95% of ${targetAudience} misunderstand (and the 5% who win)`,
    body: `Most people approach this completely backwards. Here is the distilled, battle-tested playbook to transform your results.`,
    callToAction: 'Swipe to unlock the framework ➔',
    visualDirection: {
      archetype: 'hook',
      suggestedIcon: 'Sparkles',
      layoutNotes: 'Oversized typographic headline with high-contrast accent glow',
      focalPoint: 'Core thesis hook headline'
    }
  });

  // Middle slides
  const middleCount = count - 2;
  const coreSteps = [
    {
      badge: '02 / THE BOTTLENECK',
      headline: 'The Hidden Bottleneck Holding You Back',
      sub: 'Why working harder doesn\'t solve structural flaws',
      body: 'When results stall, people instinctively double down on old tactics. But doing the wrong thing with 2x effort only produces exhaustion.',
      bullets: [
        'Outdated assumptions created for past environments',
        'Optimizing vanity metrics over foundational leverage',
        'Lack of an automated, repeatable operating system'
      ],
      archetype: 'insight' as const,
      icon: 'AlertCircle'
    },
    {
      badge: '03 / THE PARADIGM SHIFT',
      headline: 'The 80/20 Shift Top Performers Use',
      sub: 'Inverting the traditional workflow for maximum leverage',
      body: 'High performers eliminate 80% of manual friction by building modular assets and leveraging AI assistance at every critical milestone.',
      bullets: [
        'Decouple raw time spent from ultimate output quality',
        'Standardize decision heuristics into reusable templates',
        'Focus cognitive bandwidth strictly on high-judgment problems'
      ],
      archetype: 'framework' as const,
      icon: 'Cpu'
    },
    {
      badge: '04 / THE BLUEPRINT',
      headline: 'Step-by-Step Implementation Matrix',
      sub: 'How to apply this directly in your daily routine',
      body: 'Follow this exact sequence to avoid overwhelm and establish momentum in under 14 days.',
      bullets: [
        'Phase 1: Audit existing bottlenecks and log time-sinks',
        'Phase 2: Introduce structured prompt chaining & AI automation',
        'Phase 3: Measure baseline retention and conversion increases'
      ],
      archetype: 'framework' as const,
      icon: 'Layers'
    },
    {
      badge: '05 / COMMON TRAPS',
      headline: '3 Costly Mistakes to Avoid Immediately',
      sub: 'Where even experienced practitioners stumble',
      body: 'Avoid these critical pitfalls to maintain quality and avoid audience fatigue.',
      bullets: [
        'Relying on generic AI templates without human nuance',
        'Skipping the validation phase before scaled distribution',
        'Neglecting clear visual rhythm and readable typography'
      ],
      archetype: 'comparison' as const,
      icon: 'ShieldAlert'
    },
    {
      badge: '06 / CASE STUDY',
      headline: 'Real-World Proof: The 3.4x Multiplier',
      sub: 'What happens when you execute with precision',
      body: 'Teams adopting structured visual carousels report up to 3.4x higher bookmark rates and 2.1x more profile clicks than standard text posts.',
      bullets: [
        'Higher dwell time signals algorithmic favorability',
        'Save-worthy carousels compound long after publishing',
        'Position yourself as an authoritative category leader'
      ],
      archetype: 'insight' as const,
      icon: 'TrendingUp'
    },
    {
      badge: '07 / KEY TAKEAWAY',
      headline: 'The Principle that Changes Everything',
      sub: 'Clarity always compounds over complexity',
      body: 'Do not wait for the "perfect" time to start. The competitive gap between those who leverage visual intelligence and those who hesitate widens every week.',
      bullets: [
        'Start with 1 polished carousel per week',
        'Double down on formats that your audience bookmarks',
        'Refine your visual brand consistency'
      ],
      archetype: 'quote' as const,
      icon: 'Zap'
    },
    {
      badge: '08 / ACCELERATOR',
      headline: 'Quick Win Checklist for Tomorrow',
      sub: 'Immediate action steps to execute right away',
      body: 'Here is your 15-minute action list to kickstart this framework today.',
      bullets: [
        'Pick your highest-performing text note or idea',
        'Structure into Hook, Core Value, and Action CTA',
        'Design with clean contrast and readable hierarchy'
      ],
      archetype: 'framework' as const,
      icon: 'CheckSquare'
    }
  ];

  for (let i = 0; i < middleCount; i++) {
    const step = coreSteps[i % coreSteps.length];
    slides.push({
      id: `slide-gen-${i + 2}-${Date.now()}`,
      slideNumber: i + 2,
      badge: step.badge,
      headline: step.headline,
      subheadline: step.sub,
      body: step.body,
      bullets: step.bullets,
      visualDirection: {
        archetype: step.archetype,
        suggestedIcon: step.icon,
        layoutNotes: `Structured card layout emphasizing ${step.sub}`,
        focalPoint: step.headline
      }
    });
  }

  // Final Slide: Call to Action
  slides.push({
    id: `slide-gen-final-${Date.now()}`,
    slideNumber: count,
    badge: 'TAKE ACTION',
    headline: `Ready to master ${topic.length > 30 ? topic.slice(0, 27) + '...' : topic}?`,
    subheadline: 'Save this post. Share it with your team.',
    body: `Execution separates the top 1% from everyone else. Save this carousel now so you can reference the blueprint whenever you need it.`,
    bullets: [
      'Bookmark this carousel for quick reference',
      'Share with a colleague who needs this system',
      'Follow for weekly high-leverage frameworks'
    ],
    callToAction: 'Follow for more tactical insights ➔',
    visualDirection: {
      archetype: 'cta',
      suggestedIcon: 'BookmarkCheck',
      layoutNotes: 'High-contrast closing slide with prominent save/share cues and author profile badge',
      focalPoint: 'Engagement action buttons'
    }
  });

  return {
    id: `carousel-${Date.now()}`,
    title: topic.slice(0, 50),
    topic,
    targetAudience,
    platform,
    aspectRatio: platform === 'instagram' ? '1:1' : '4:5',
    tone,
    objective,
    slideCount: count,
    template: 'bold-gradient',
    authorName: 'Alex Rivera',
    authorHandle: '@alexcreates',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isApproved: false,
    isSample: false,
    aiGenerated: false,
    verificationNotes: [
      'Demo Mode Generation: Content synthesized via structured offline heuristics.',
      'Check factual metrics, citations, and specific domain claims before sharing.'
    ],
    slides
  };
}

export async function generateCarousel(
  params: GenerateParams,
  onProgress?: (stageIndex: number, stageName: string) => void
): Promise<GenerationResult> {
  // Simulate progressive stages for high-fidelity workflow feedback
  const stages = [
    { index: 1, name: 'Analyzing topic and audience context...' },
    { index: 2, name: 'Formulating narrative hook and slide progression...' },
    { index: 3, name: 'Synthesizing headlines and digestible micro-copy...' },
    { index: 4, name: 'Designing visual archetypes and focal points...' }
  ];

  for (const st of stages) {
    if (onProgress) onProgress(st.index, st.name);
    await new Promise((res) => setTimeout(res, 350));
  }

  try {
    const res = await fetch('/api/generate-carousel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.warn('[CarouselCraft API] Server returned non-200:', res.status, errorData);
      
      // Fallback to clearly-labelled demo mode if server is unavailable or API key not present
      const demoCarousel = generateDemoFallback(params);
      let userMsg = 'Demo Mode Engine: Generated via structured offline synthesis.';
      if (res.status === 403 || errorData.code === 403 || String(errorData.error).includes('billing')) {
        userMsg = 'Demo Mode Engine: Gemini API requires billing setup in Settings > Secrets. Structured synthesis loaded with demo flag.';
      } else if (errorData.message) {
        userMsg = `Demo Mode Engine: ${errorData.message}`;
      }
      return {
        carousel: demoCarousel,
        isDemo: true,
        source: 'Demo Mode (Offline Synthesis Engine)',
        message: userMsg
      };
    }

    const data = await res.json();
    const generated = data.data;

    // Transform into standard CarouselProject
    const slides: SlideContent[] = (generated.slides || []).map((s: any, idx: number) => ({
      id: `slide-${idx + 1}-${Date.now()}`,
      slideNumber: s.slideNumber || idx + 1,
      badge: s.badge || `0${idx + 1} / SLIDE`,
      headline: s.headline || 'Key Insight',
      subheadline: s.subheadline || '',
      body: s.body || '',
      bullets: Array.isArray(s.bullets) ? s.bullets : undefined,
      callToAction: s.callToAction || (idx === (generated.slides.length - 1) ? 'Save & Share ➔' : undefined),
      visualDirection: {
        archetype: s.visualDirection?.archetype || 'insight',
        suggestedIcon: s.visualDirection?.suggestedIcon || 'Sparkles',
        layoutNotes: s.visualDirection?.layoutNotes || 'Clean card layout',
        focalPoint: s.visualDirection?.focalPoint || 'Primary headline'
      }
    }));

    const project: CarouselProject = {
      id: `proj-${Date.now()}`,
      title: generated.title || params.topic.slice(0, 50),
      topic: params.topic,
      targetAudience: params.targetAudience,
      platform: params.platform,
      aspectRatio: params.platform === 'instagram' ? '1:1' : '4:5',
      tone: params.tone,
      objective: params.objective,
      slideCount: slides.length,
      template: 'bold-gradient',
      authorName: 'Alex Rivera',
      authorHandle: '@alexcreates',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isApproved: false,
      isSample: false,
      aiGenerated: true,
      verificationNotes: generated.verificationNotes || [
        'AI-generated draft powered by Gemini 3.8 Flash.',
        'Review specific facts and claims before public distribution.'
      ],
      slides
    };

    return {
      carousel: project,
      isDemo: false,
      source: 'gemini-3.8-flash'
    };
  } catch (err: any) {
    console.error('[CarouselCraft API] Network or fetch error:', err);
    const demo = generateDemoFallback(params);
    return {
      carousel: demo,
      isDemo: true,
      source: 'Demo Mode (Offline Synthesis Engine)',
      message: 'Could not reach server endpoint. Fallback demo generation activated.'
    };
  }
}

import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Instagram, 
  Linkedin, 
  Lightbulb, 
  Layers, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw,
  Cpu,
  Zap,
  RotateCcw,
  BookOpen,
  MessageSquare,
  Flame,
  Award,
  Check
} from 'lucide-react';
import { Platform, ContentTone, ContentObjective, CarouselProject } from '../types/carousel';
import { generateCarousel, GenerateParams } from '../services/api';
import { TOPIC_SUGGESTIONS } from '../data/sampleCarousel';

interface CreateWorkspaceProps {
  onCarouselGenerated: (project: CarouselProject, isDemo: boolean, bannerMessage?: string) => void;
  prefillParams?: Partial<GenerateParams>;
}

export const CreateWorkspace: React.FC<CreateWorkspaceProps> = ({
  onCarouselGenerated,
  prefillParams
}) => {
  const [topic, setTopic] = useState(prefillParams?.topic || '');
  const [targetAudience, setTargetAudience] = useState(prefillParams?.targetAudience || 'Founders, Creators, and Tech Professionals');
  const [platform, setPlatform] = useState<Platform>(prefillParams?.platform || 'linkedin');
  const [tone, setTone] = useState<ContentTone>(prefillParams?.tone || 'Educational');
  const [slideCount, setSlideCount] = useState<number>(prefillParams?.slideCount || 7);
  const [objective, setObjective] = useState<ContentObjective>(prefillParams?.objective || 'Educate');

  const [isLoading, setIsLoading] = useState(false);
  const [currentProgressStage, setCurrentProgressStage] = useState<string>('');
  const [progressStageIndex, setProgressStageIndex] = useState<number>(1);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const toneOptions: { label: ContentTone; desc: string; icon: any }[] = [
    { label: 'Educational', desc: 'Frameworks, step-by-step tactics, clear logic', icon: BookOpen },
    { label: 'Bold', desc: 'Pattern interrupts, strong opinions, counter-intuitive', icon: Flame },
    { label: 'Professional', desc: 'Data-driven, executive summaries, structured', icon: Award },
    { label: 'Conversational', desc: 'Friendly, relatable, candid first-person lessons', icon: MessageSquare },
    { label: 'Storytelling', desc: 'Emotional arc, failure-to-triumph, personal journey', icon: Sparkles }
  ];

  const objectiveOptions: { label: ContentObjective; desc: string }[] = [
    { label: 'Educate', desc: 'Deliver actionable, bookmarkable frameworks' },
    { label: 'Inspire', desc: 'Spark mindset shifts and motivate action' },
    { label: 'Promote', desc: 'Position product/service as high-ROI solution' },
    { label: 'Engage', desc: 'Drive comments, debates, and community shares' }
  ];

  const audienceSuggestions = [
    'Founders & Solopreneurs',
    'College Students & Gen Z Explorers',
    'Software Engineers & Builders',
    'B2B Growth & Marketing Teams',
    'Product Managers & Designers'
  ];

  const generationStages = [
    { num: 1, title: 'Context & Topic Analysis', desc: 'Parsing target audience and platform format' },
    { num: 2, title: 'Narrative Arc & Cognitive Hook', desc: 'Engineering pattern-interrupt hook and logical progression' },
    { num: 3, title: 'Headline & Micro-Copy Synthesis', desc: 'Drafting high-signal takeaways with Gemini 3.8 Flash' },
    { num: 4, title: 'Visual Direction & Archetypes', desc: 'Mapping slide visual focus and icon directives' },
    { num: 5, title: 'Theme Layout & Design', desc: 'Applying responsive styling and typography hierarchy' }
  ];

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setErrorMessage('Please enter a core idea or topic for your carousel.');
      return;
    }

    setErrorMessage(null);
    setIsLoading(true);
    setProgressStageIndex(1);
    setCurrentProgressStage('Analyzing topic and audience context...');

    try {
      const result = await generateCarousel(
        {
          topic: topic.trim(),
          targetAudience: targetAudience.trim(),
          platform,
          tone,
          slideCount,
          objective
        },
        (stageIndex, stageName) => {
          setProgressStageIndex(stageIndex);
          setCurrentProgressStage(stageName);
        }
      );

      onCarouselGenerated(
        result.carousel, 
        result.isDemo, 
        result.message || (result.isDemo ? 'Generated using Offline Fallback Engine (Gemini key not set)' : undefined)
      );
    } catch (err: any) {
      console.error('Generation error:', err);
      setErrorMessage(err?.message || 'Failed to generate carousel. You can retry or check network connectivity.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 sm:p-8 lg:p-10 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <div className="text-xs text-violet-400 font-mono font-medium mb-1.5 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>STAGE 1: STRATEGIC BRIEF & CONCEPT</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
          Carousel Creation Workspace
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Specify your raw idea, audience, and narrative tone. Gemini 3.8 Flash will structure a viral, slide-by-slide carousel sequence.
        </p>
      </div>

      {/* Main Creation Form Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#11131e] border border-slate-800/90 shadow-2xl space-y-7">
        
        {/* Section 1: Raw Topic & Idea */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
              Raw Topic or Core Insight <span className="text-violet-400">*</span>
            </label>
            <span className="text-[11px] text-slate-400">
              {topic.length} characters
            </span>
          </div>

          <textarea
            rows={4}
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. 5 counter-intuitive pricing rules for bootstrapped SaaS founders, or why deep work beats 8 hours of chaotic multitasking..."
            className="w-full bg-[#0b0c13] border border-slate-700/80 rounded-2xl p-4 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all resize-y"
          />

          {/* Inspiration Prompts */}
          <div className="pt-1">
            <span className="text-[11px] font-mono text-slate-400 uppercase font-semibold flex items-center gap-1.5 mb-2">
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              <span>Prompt Inspiration: Click to pre-fill</span>
            </span>
            <div className="flex flex-wrap gap-1.5">
              {TOPIC_SUGGESTIONS.map((sug, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setTopic(sug)}
                  className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-violet-500/50 hover:bg-slate-800 text-[11px] text-slate-300 hover:text-white transition-all text-left cursor-pointer"
                >
                  {sug}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Section 2: Target Audience */}
        <div className="space-y-2.5">
          <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
            Target Audience
          </label>
          <input
            type="text"
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
            placeholder="e.g. Founders, early-career creators, junior engineers..."
            className="w-full bg-[#0b0c13] border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
          />
          <div className="flex flex-wrap gap-1.5 pt-1">
            {audienceSuggestions.map((aud, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setTargetAudience(aud)}
                className={`px-2.5 py-1 rounded-lg text-[11px] transition-all cursor-pointer ${
                  targetAudience === aud
                    ? 'bg-violet-600/30 text-violet-300 border border-violet-500/50 font-semibold'
                    : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {aud}
              </button>
            ))}
          </div>
        </div>

        {/* Section 3: Platform Selection */}
        <div className="space-y-2.5">
          <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
            Target Social Platform
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setPlatform('linkedin')}
              className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                platform === 'linkedin'
                  ? 'bg-sky-950/40 border-sky-500 text-white shadow-lg shadow-sky-950/30'
                  : 'bg-[#0b0c13] border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className={`p-2.5 rounded-xl ${platform === 'linkedin' ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                <Linkedin className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-sm font-bold text-white">LinkedIn Carousel</p>
                  {platform === 'linkedin' && <Check className="w-4 h-4 text-sky-400" />}
                </div>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                  PDF slide document format. Optimal for professional insights and industry guides.
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setPlatform('instagram')}
              className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                platform === 'instagram'
                  ? 'bg-pink-950/30 border-pink-500 text-white shadow-lg shadow-pink-950/30'
                  : 'bg-[#0b0c13] border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className={`p-2.5 rounded-xl ${platform === 'instagram' ? 'bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
                <Instagram className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-sm font-bold text-white">Instagram Carousel</p>
                  {platform === 'instagram' && <Check className="w-4 h-4 text-pink-400" />}
                </div>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                  High-engagement multi-image post (1:1 or 4:5). Ideal for viral visual hooks.
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Section 4: Tone & Objective */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tone */}
          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
              Content Tone
            </label>
            <div className="space-y-1.5">
              {toneOptions.map((t) => {
                const Icon = t.icon;
                return (
                  <div
                    key={t.label}
                    onClick={() => setTone(t.label)}
                    className={`p-2.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      tone === t.label
                        ? 'bg-violet-600/20 border-violet-500 text-white shadow-sm'
                        : 'bg-[#0b0c13] border-slate-800/80 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`p-1.5 rounded-lg ${tone === t.label ? 'bg-violet-500/20 text-violet-300' : 'bg-slate-900 text-slate-500'}`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-200">{t.label}</span>
                        <p className="text-[10px] text-slate-400">{t.desc}</p>
                      </div>
                    </div>
                    {tone === t.label && <Check className="w-4 h-4 text-violet-400 flex-shrink-0" />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Objective */}
          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
              Content Objective
            </label>
            <div className="space-y-1.5">
              {objectiveOptions.map((obj) => (
                <div
                  key={obj.label}
                  onClick={() => setObjective(obj.label)}
                  className={`p-2.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    objective === obj.label
                      ? 'bg-violet-600/20 border-violet-500 text-white shadow-sm'
                      : 'bg-[#0b0c13] border-slate-800/80 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <span className="text-xs font-bold text-slate-200">{obj.label}</span>
                    <p className="text-[10px] text-slate-400">{obj.desc}</p>
                  </div>
                  {objective === obj.label && <Check className="w-4 h-4 text-violet-400 flex-shrink-0" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 5: Slide Count */}
        <div className="space-y-2.5">
          <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
            Number of Slides
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[5, 7, 10].map((count) => (
              <button
                key={count}
                type="button"
                onClick={() => setSlideCount(count)}
                className={`py-3 px-4 rounded-xl border text-center font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                  slideCount === count
                    ? 'bg-violet-600 border-violet-400 text-white shadow-lg shadow-violet-950/60'
                    : 'bg-[#0b0c13] border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                }`}
              >
                <span>{count} Slides</span>
                <span className="block text-[10px] font-normal text-slate-400 mt-0.5">
                  {count === 5 ? 'Snackable / 1 min' : count === 7 ? 'Optimal Depth' : 'Masterclass Guide'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Error State if any */}
        {errorMessage && (
          <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-rose-200">
                <span className="font-bold">Notice: </span>
                {errorMessage}
              </div>
            </div>
            <button
              onClick={handleGenerate}
              className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry</span>
            </button>
          </div>
        )}

        {/* Loading / Multi-stage Progress Stepper */}
        {isLoading && (
          <div className="p-6 rounded-2xl bg-violet-950/30 border border-violet-500/40 space-y-5 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-violet-300 font-bold text-sm">
                <RefreshCw className="w-4 h-4 animate-spin text-violet-400" />
                <span>Synthesizing Carousel with Gemini 3.8 Flash...</span>
              </div>
              <span className="text-xs font-mono text-violet-400 font-semibold">Active AI Engine</span>
            </div>

            {/* Stepper visualization */}
            <div className="grid grid-cols-5 gap-2">
              {generationStages.map((st) => {
                const isPassed = progressStageIndex > st.num;
                const isCurrent = progressStageIndex === st.num;
                return (
                  <div key={st.num} className="flex flex-col gap-1.5">
                    <div className={`h-1.5 rounded-full transition-all ${
                      isPassed ? 'bg-emerald-400' : isCurrent ? 'bg-violet-400 animate-pulse' : 'bg-slate-800'
                    }`} />
                    <span className="text-[10px] font-mono text-slate-300 font-medium truncate">
                      {st.title}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="p-3 rounded-xl bg-black/40 border border-violet-500/20 text-xs text-slate-300">
              <span className="text-violet-400 font-mono font-semibold">Current Activity: </span>
              {currentProgressStage}
            </div>
          </div>
        )}

        {/* Submit CTA */}
        <div className="pt-2">
          <button
            type="button"
            disabled={isLoading}
            onClick={handleGenerate}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 hover:from-violet-500 hover:via-indigo-500 hover:to-purple-500 text-white font-heading font-extrabold text-base shadow-xl shadow-violet-950/70 hover:shadow-violet-900/90 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Synthesizing Carousel with AI...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-amber-300" />
                <span>Generate Carousel with AI</span>
                <ArrowRight className="w-5 h-5 ml-1" />
              </>
            )}
          </button>
          
          <p className="text-center text-[11px] text-slate-400 mt-2.5">
            Structured JSON synthesis adheres strictly to social conversion heuristics and slide constraints.
          </p>
        </div>

      </div>
    </div>
  );
};

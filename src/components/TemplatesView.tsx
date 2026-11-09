import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Check, 
  Layers, 
  Layout, 
  Palette, 
  Instagram, 
  Linkedin,
  SlidersHorizontal
} from 'lucide-react';
import { TemplateStyle, CarouselProject } from '../types/carousel';
import { TEMPLATES_CONFIG, QUICK_TEMPLATES, SAMPLE_CAROUSEL } from '../data/sampleCarousel';
import { SlideCanvas } from './SlideCanvas';

interface TemplatesViewProps {
  onSelectDesignTemplate: (templateId: TemplateStyle) => void;
  onSelectQuickFramework: (framework: typeof QUICK_TEMPLATES[0]) => void;
}

export const TemplatesView: React.FC<TemplatesViewProps> = ({
  onSelectDesignTemplate,
  onSelectQuickFramework
}) => {
  const sampleSlide = SAMPLE_CAROUSEL.slides[0];

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-300 text-xs font-mono font-semibold tracking-wide mb-2">
          <Palette className="w-3.5 h-3.5" />
          <span>DESIGN SYSTEM & TEMPLATES</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
          Visual Design Templates
        </h1>
        <p className="text-sm text-slate-400 mt-1 max-w-2xl">
          Three carefully tuned visual aesthetic archetypes designed specifically for mobile social feeds. Switch seamlessly between styles without losing slide copy.
        </p>
      </div>

      {/* 3 Core Design Templates Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {Object.values(TEMPLATES_CONFIG).map((tmpl) => (
          <div
            key={tmpl.id}
            className="rounded-3xl bg-[#11131e] border border-slate-800 hover:border-violet-500/50 transition-all p-6 flex flex-col justify-between shadow-xl"
          >
            <div>
              {/* Live Canvas Preview of Slide 1 */}
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 mb-5 bg-[#090a0f]">
                <SlideCanvas
                  slide={sampleSlide}
                  template={tmpl.id}
                  aspectRatio="1:1"
                  totalSlides={7}
                  authorName="Alex Rivera"
                  authorHandle="@alexcreates"
                  platform="linkedin"
                  className="text-xs"
                />
              </div>

              {/* Template Meta */}
              <h3 className="text-lg font-heading font-bold text-white">
                {tmpl.name}
              </h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                {tmpl.description}
              </p>

              <div className="mt-3 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-violet-300">
                {tmpl.tagline}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800">
              <button
                onClick={() => onSelectDesignTemplate(tmpl.id)}
                className="w-full py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs shadow-md shadow-violet-950/60 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Apply & Create with {tmpl.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Narrative Framework Templates */}
      <div className="pt-6 border-t border-slate-800/80">
        <div className="mb-6">
          <h2 className="text-xl font-heading font-bold text-white">
            Proven Social Storytelling Frameworks
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Structural frameworks optimized for high bookmarking and engagement rates
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {QUICK_TEMPLATES.map((q) => (
            <div
              key={q.id}
              onClick={() => onSelectQuickFramework(q)}
              className="group p-5 rounded-2xl bg-[#12141e] border border-slate-800 hover:border-violet-500/50 hover:bg-slate-900/60 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-violet-500/15 text-violet-300 border border-violet-500/30">
                    {q.slides} SLIDES
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 capitalize">
                    {q.tone}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white group-hover:text-violet-300 transition-colors">
                  {q.title}
                </h4>
                <p className="text-xs text-slate-400 mt-1.5 line-clamp-2">
                  {q.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 group-hover:text-violet-300">
                <span className="font-semibold">Launch Framework</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

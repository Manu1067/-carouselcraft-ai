import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  SlidersHorizontal, 
  Download, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Info, 
  Eye, 
  Check, 
  ChevronRight, 
  LayoutGrid, 
  Columns, 
  Clock, 
  FileCheck2
} from 'lucide-react';
import { CarouselProject, SlideContent } from '../types/carousel';
import { SlideCanvas } from './SlideCanvas';

interface ReviewViewProps {
  project: CarouselProject;
  onApprove: () => void;
  onEditSlide: (slideIndex: number) => void;
  onOpenExport: () => void;
}

export const ReviewView: React.FC<ReviewViewProps> = ({
  project,
  onApprove,
  onEditSlide,
  onOpenExport
}) => {
  const [activeVerificationChecks, setActiveVerificationChecks] = useState<Record<number, boolean>>({});
  const [viewMode, setViewMode] = useState<'grid' | 'filmstrip'>('grid');

  // Slide density analysis
  const analyzeSlideDensity = (slide: SlideContent) => {
    const text = `${slide.headline} ${slide.subheadline || ''} ${slide.body} ${(slide.bullets || []).join(' ')}`;
    const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
    // Over 50 words on a carousel slide tends to reduce swipe completion on mobile
    const isTooDense = wordCount > 48;
    const isLight = wordCount < 15;
    return { wordCount, isTooDense, isLight };
  };

  const totalWords = project.slides.reduce((acc, s) => acc + analyzeSlideDensity(s).wordCount, 0);
  const denseSlides = project.slides.filter(s => analyzeSlideDensity(s).isTooDense);
  const estimatedReadTimeSecs = Math.max(20, Math.round((totalWords / 150) * 60));

  const toggleCheck = (idx: number) => {
    setActiveVerificationChecks(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  return (
    <div className="p-6 sm:p-8 lg:p-10 max-w-7xl mx-auto space-y-8">
      {/* Top Header & Approval Status Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-[#11131e] border border-slate-800 shadow-xl">
        <div className="space-y-2">
          <div className="text-xs text-violet-400 font-mono font-medium flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>STAGE 6: FOUNDER QUALITY & DENSITY REVIEW</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
            Human-in-the-Loop Quality Assurance
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Inspect the complete {project.slides.length}-slide sequence, audit text density for mobile readability, verify critical facts, and stamp founder approval before multi-format export.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {project.isApproved ? (
            <div className="px-5 py-3 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 flex items-center justify-center gap-2 text-xs sm:text-sm font-bold shadow-lg">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Approved by Founder</span>
            </div>
          ) : (
            <button
              onClick={onApprove}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-emerald-950/60 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Approve Carousel</span>
            </button>
          )}

          <button
            onClick={onOpenExport}
            className="px-5 py-3.5 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-violet-950/60 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export Slides</span>
          </button>
        </div>
      </div>

      {/* Quality & Fact-Checking Notice Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Verification Checklist */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#11131e] border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-heading font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span>AI Content Verification & Founder Responsibility</span>
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30 font-bold uppercase">
              {project.aiGenerated ? 'AI Assisted' : 'Draft'}
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            CarouselCraft AI structures high-performing narrative arcs. While the synthesis logic incorporates social best practices, <strong>AI-generated claims and statistics are not automatically fact-checked</strong>. Founders must independently verify facts, quotes, and metrics before publishing.
          </p>

          {/* Verification checklist items */}
          <div className="space-y-2 pt-1">
            {(project.verificationNotes || [
              'Verify any statistics or percentage claims against authoritative source documents.',
              'Ensure all tool and software recommendations fit your audience context.',
              'Confirm author handle (@alexcreates) and personal branding before export.'
            ]).map((note, idx) => (
              <div 
                key={idx}
                onClick={() => toggleCheck(idx)}
                className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                  activeVerificationChecks[idx]
                    ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                  activeVerificationChecks[idx]
                    ? 'bg-emerald-500 border-emerald-400 text-white'
                    : 'border-slate-600 bg-slate-800'
                }`}>
                  {activeVerificationChecks[idx] && <Check className="w-3 h-3" />}
                </div>
                <span className="text-xs leading-snug">{note}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Text Density & Readability Metric Card */}
        <div className="p-6 rounded-2xl bg-[#11131e] border border-slate-800 space-y-4 flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-heading font-bold text-white flex items-center gap-2">
              <Eye className="w-4 h-4 text-sky-400" />
              <span>Mobile Readability Audit</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Social feeds are consumed on 6-inch mobile screens. Keep slide density low.
            </p>

            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
                <span className="text-slate-400">Total Words</span>
                <span className="font-bold text-white font-mono tabular-nums">{totalWords} words</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
                <span className="text-slate-400">Avg. Words / Slide</span>
                <span className="font-bold text-sky-300 font-mono tabular-nums">
                  {Math.round(totalWords / project.slides.length)} w/slide
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
                <span className="text-slate-400">Est. Swipe Duration</span>
                <span className="font-bold text-violet-300 font-mono tabular-nums">
                  ~{estimatedReadTimeSecs} seconds
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
                <span className="text-slate-400">Over-Dense Slides (&gt;48w)</span>
                <span className={`font-bold font-mono ${denseSlides.length > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {denseSlides.length} {denseSlides.length > 0 ? 'needs trim' : 'optimal'}
                </span>
              </div>
            </div>
          </div>

          {denseSlides.length > 0 && (
            <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 text-[11px] text-amber-200 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>
                Slide {denseSlides.map(s => s.slideNumber).join(', ')} may feel crowded on mobile screens. Consider tightening sentences in the editor.
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Complete Carousel Multi-Slide Gallery */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-lg font-heading font-bold text-white">
              Slide-by-Slide Narrative Sequence
            </h2>
            <p className="text-xs text-slate-400">
              Click "Edit Slide" on any card to jump directly into the interactive editor.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${viewMode === 'grid' ? 'bg-violet-600 text-white shadow-sm' : 'text-slate-400'}`}
                title="Grid View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('filmstrip')}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${viewMode === 'filmstrip' ? 'bg-violet-600 text-white shadow-sm' : 'text-slate-400'}`}
                title="Filmstrip View"
              >
                <Columns className="w-3.5 h-3.5" />
              </button>
            </div>

            <span className="text-xs font-mono text-slate-400 font-semibold">
              {project.slides.length} SLIDES • {project.aspectRatio} RATIO
            </span>
          </div>
        </div>

        {/* Grid or Filmstrip Render */}
        <div className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "flex gap-6 overflow-x-auto pb-4"}>
          {project.slides.map((slide, idx) => {
            const { wordCount, isTooDense } = analyzeSlideDensity(slide);
            return (
              <div
                key={slide.id}
                className={`group rounded-2xl bg-[#11131e] border border-slate-800 hover:border-violet-500/50 transition-all overflow-hidden flex flex-col justify-between shadow-lg ${
                  viewMode === 'filmstrip' ? 'w-80 flex-shrink-0' : ''
                }`}
              >
                {/* Visual Canvas Render */}
                <div className="p-3 bg-[#090a0f] border-b border-slate-800 flex items-center justify-center">
                  <div className="w-full max-w-[280px] rounded-xl overflow-hidden shadow-md">
                    <SlideCanvas
                      slide={slide}
                      template={project.template}
                      aspectRatio={project.aspectRatio}
                      totalSlides={project.slides.length}
                      authorName={project.authorName}
                      authorHandle={project.authorHandle}
                      platform={project.platform}
                      className="text-[0.7rem]"
                    />
                  </div>
                </div>

                {/* Audit & Quick Jump bar */}
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-violet-400">
                      SLIDE {slide.slideNumber}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                      isTooDense 
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                        : 'bg-slate-800 text-slate-300'
                    }`}>
                      {wordCount} words {isTooDense && '• Too Dense'}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-slate-200 line-clamp-2">
                    {slide.headline}
                  </p>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase text-slate-400">
                      {slide.visualDirection?.archetype || 'insight'}
                    </span>
                    <button
                      onClick={() => onEditSlide(idx)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-violet-400 hover:text-violet-300 group-hover:translate-x-0.5 transition-all cursor-pointer"
                    >
                      <span>Edit Slide</span>
                      <SlidersHorizontal className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="p-6 rounded-2xl bg-[#11131e] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-white">Ready to publish?</h3>
          <p className="text-xs text-slate-400">
            Approved decks can be exported into individual PNGs, a ZIP bundle, a multi-page PDF, or JSON.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => onEditSlide(0)}
            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
          >
            Return to Editor
          </button>
          <button
            onClick={onOpenExport}
            className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-violet-950/60 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Proceed to Export</span>
          </button>
        </div>
      </div>
    </div>
  );
};

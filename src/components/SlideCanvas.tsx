import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  Cpu, 
  AlertTriangle, 
  AlertCircle,
  Layers, 
  CheckCircle2, 
  Bookmark, 
  BookmarkCheck,
  Zap, 
  ShieldAlert, 
  CheckSquare, 
  Lightbulb, 
  Target,
  BarChart3,
  Quote,
  Share2,
  ChevronRight
} from 'lucide-react';
import { SlideContent, TemplateStyle, AspectRatio, Platform } from '../types/carousel';

// Icon resolver helper
export function getSlideIcon(iconName?: string) {
  switch (iconName?.toLowerCase()) {
    case 'sparkles': return Sparkles;
    case 'trendingup': return TrendingUp;
    case 'cpu': return Cpu;
    case 'alerttriangle': return AlertTriangle;
    case 'alertcircle': return AlertCircle;
    case 'layers': return Layers;
    case 'checkcircle2': return CheckCircle2;
    case 'bookmark': return Bookmark;
    case 'bookmarkcheck': return BookmarkCheck;
    case 'zap': return Zap;
    case 'shieldalert': return ShieldAlert;
    case 'checksquare': return CheckSquare;
    case 'lightbulb': return Lightbulb;
    case 'target': return Target;
    case 'barchart3': return BarChart3;
    case 'quote': return Quote;
    case 'share2': return Share2;
    default: return Sparkles;
  }
}

interface SlideCanvasProps {
  slide: SlideContent;
  template: TemplateStyle;
  aspectRatio: AspectRatio;
  totalSlides: number;
  authorName?: string;
  authorHandle?: string;
  platform?: Platform;
  className?: string;
  isExportMode?: boolean;
}

export const SlideCanvas: React.FC<SlideCanvasProps> = ({
  slide,
  template,
  aspectRatio,
  totalSlides,
  authorName = 'Alex Rivera',
  authorHandle = '@alexcreates',
  platform = 'linkedin',
  className = '',
  isExportMode = false
}) => {
  const IconComponent = getSlideIcon(slide.visualDirection?.suggestedIcon);

  // Custom style overrides if specified on slide
  const bgOverride = slide.styleOverrides?.backgroundColor;
  const textOverride = slide.styleOverrides?.textColor;
  const accentOverride = slide.styleOverrides?.accentColor;

  const headlineStyle = textOverride ? { color: textOverride } : undefined;
  const subheadlineStyle = textOverride ? { color: textOverride, opacity: 0.85 } : undefined;
  const bodyStyle = textOverride ? { color: textOverride, opacity: 0.9 } : undefined;
  const bulletStyle = textOverride ? { color: textOverride } : undefined;

  // Template 1: Minimal Editorial
  if (template === 'minimal-editorial') {
    return (
      <div
        className={`relative w-full h-full flex flex-col justify-between p-7 sm:p-11 overflow-hidden select-none transition-colors duration-300 ${
          aspectRatio === '4:5' ? 'aspect-[4/5]' : 'aspect-square'
        } ${className}`}
        style={{
          backgroundColor: bgOverride || '#090a0f',
          color: textOverride || '#f8fafc',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }}
      >
        {/* Subtle architectural hairline accents */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.025] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
        
        {/* Top Header */}
        <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3.5">
          <div className="flex items-center gap-2">
            <span 
              className="text-[11px] font-mono tracking-widest uppercase font-semibold"
              style={{ color: accentOverride || '#c084fc' }}
            >
              {slide.badge || `INDEX // 0${slide.slideNumber}`}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 tabular-nums">
            <span>{String(slide.slideNumber).padStart(2, '0')}</span>
            <span className="text-zinc-600">/</span>
            <span>{String(totalSlides).padStart(2, '0')}</span>
          </div>
        </div>

        {/* Center Content */}
        <div className="relative z-10 my-auto py-3 flex flex-col justify-center max-w-full">
          {/* Visual Archetype indicator */}
          <div className="mb-3.5 inline-flex items-center gap-2 text-xs text-zinc-400 font-mono uppercase tracking-wider">
            <span 
              className="p-1 rounded-md bg-white/5 border border-white/10"
              style={{ color: accentOverride || '#c084fc' }}
            >
              <IconComponent className="w-3.5 h-3.5" />
            </span>
            <span>{slide.visualDirection?.archetype || 'insight'}</span>
          </div>

          {/* Headline */}
          <h2 
            className="text-2xl sm:text-3xl lg:text-[2.1rem] font-serif font-medium tracking-tight leading-[1.2] text-zinc-100"
            style={{ ...headlineStyle, textWrap: 'balance' }}
          >
            {slide.headline}
          </h2>

          {/* Subheadline */}
          {slide.subheadline && (
            <p 
              className="mt-2.5 text-xs sm:text-sm font-sans text-zinc-400 font-light leading-relaxed"
              style={subheadlineStyle}
            >
              {slide.subheadline}
            </p>
          )}

          {/* Body */}
          {slide.body && (
            <p 
              className="mt-3.5 text-xs sm:text-sm font-sans text-zinc-300 leading-relaxed font-normal"
              style={bodyStyle}
            >
              {slide.body}
            </p>
          )}

          {/* Bullets */}
          {slide.bullets && slide.bullets.length > 0 && (
            <div className="mt-4 space-y-2">
              {slide.bullets.map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <span 
                    className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: accentOverride || '#c084fc' }}
                  />
                  <p className="text-xs sm:text-sm text-zinc-300 leading-snug" style={bulletStyle}>{bullet}</p>
                </div>
              ))}
            </div>
          )}

          {/* CTA Box if present */}
          {slide.callToAction && (
            <div 
              className="mt-5 p-3 rounded-lg border border-white/10 bg-white/[0.02] flex items-center justify-between"
              style={{ borderLeftColor: accentOverride || '#c084fc', borderLeftWidth: '3px' }}
            >
              <span className="text-xs sm:text-sm font-medium text-zinc-200" style={textOverride ? { color: textOverride } : undefined}>
                {slide.callToAction}
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
            </div>
          )}
        </div>

        {/* Bottom Footer */}
        <div className="relative z-10 pt-3.5 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center font-bold text-[10px] text-zinc-200">
              {authorName.charAt(0)}
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-zinc-300 text-xs leading-none">{authorName}</span>
              <span className="text-[10px] text-zinc-500">{authorHandle}</span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-mono text-zinc-400">
            <span>Swipe</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    );
  }

  // Template 2: Professional Business
  if (template === 'professional-business') {
    return (
      <div
        className={`relative w-full h-full flex flex-col justify-between p-7 sm:p-11 overflow-hidden select-none transition-colors duration-300 ${
          aspectRatio === '4:5' ? 'aspect-[4/5]' : 'aspect-square'
        } ${className}`}
        style={{
          backgroundColor: bgOverride || '#0a1224',
          color: textOverride || '#f1f5f9',
          border: '1px solid rgba(56, 189, 248, 0.2)'
        }}
      >
        {/* Subtle grid background */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04] bg-[linear-gradient(to_right,#38bdf8_1px,transparent_1px),linear-gradient(to_bottom,#38bdf8_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        {/* Top Header */}
        <div className="relative z-10 flex items-center justify-between pb-3.5 border-b border-sky-500/20">
          <div className="flex items-center gap-2">
            <span 
              className="text-[10px] font-mono tracking-wider font-bold uppercase text-sky-400"
            >
              {slide.badge || `PART 0${slide.slideNumber}`}
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest hidden sm:inline">
              {platform === 'linkedin' ? 'Executive Brief' : 'Framework'}
            </span>
          </div>

          <div className="flex items-center gap-1 text-xs font-mono text-sky-400 tabular-nums">
            <span>{slide.slideNumber}</span>
            <span className="text-slate-600">/</span>
            <span>{totalSlides}</span>
          </div>
        </div>

        {/* Center Content */}
        <div className="relative z-10 my-auto py-2 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-2.5">
            <div className="w-6 h-6 rounded-md bg-sky-500/10 border border-sky-400/30 flex items-center justify-center text-sky-400">
              <IconComponent className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-semibold text-sky-300 tracking-wide uppercase">
              {slide.visualDirection?.archetype || 'insight'} Focus
            </span>
          </div>

          <h2 
            className="text-2xl sm:text-3xl lg:text-[2rem] font-heading font-bold text-white tracking-tight leading-[1.2]"
            style={{ ...headlineStyle, textWrap: 'balance' }}
          >
            {slide.headline}
          </h2>

          {slide.subheadline && (
            <p 
              className="mt-2 text-xs sm:text-sm text-sky-200/80 font-medium"
              style={subheadlineStyle}
            >
              {slide.subheadline}
            </p>
          )}

          {slide.body && (
            <p 
              className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal"
              style={bodyStyle}
            >
              {slide.body}
            </p>
          )}

          {slide.bullets && slide.bullets.length > 0 && (
            <div className="mt-3.5 space-y-2">
              {slide.bullets.map((bullet, idx) => (
                <div 
                  key={idx} 
                  className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 flex items-start gap-2.5"
                >
                  <div className="mt-0.5 w-4 h-4 rounded bg-sky-500/20 text-sky-300 flex items-center justify-center text-[10px] font-mono font-bold flex-shrink-0">
                    {idx + 1}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-snug" style={bulletStyle}>{bullet}</p>
                </div>
              ))}
            </div>
          )}

          {slide.callToAction && (
            <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-sky-950/80 to-blue-900/40 border border-sky-500/40 flex items-center justify-between">
              <span className="text-xs sm:text-sm font-semibold text-white" style={headlineStyle}>{slide.callToAction}</span>
              <div className="p-1 rounded bg-sky-500/20 text-sky-300">
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          )}
        </div>

        {/* Bottom Footer */}
        <div className="relative z-10 pt-3.5 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-sky-900/60 border border-sky-700/50 flex items-center justify-center font-bold text-[10px] text-sky-200">
              {authorName.charAt(0)}
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-slate-200 text-xs leading-none">{authorName}</span>
              <span className="text-[10px] text-slate-400">{authorHandle}</span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-sky-400 font-mono">
            <span>Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    );
  }

  // Template 3: Bold Gradient
  return (
    <div
      className={`relative w-full h-full flex flex-col justify-between p-7 sm:p-11 overflow-hidden select-none transition-colors duration-300 ${
        aspectRatio === '4:5' ? 'aspect-[4/5]' : 'aspect-square'
      } ${className}`}
      style={{
        backgroundColor: bgOverride || '#0d0f1d',
        color: textOverride || '#ffffff',
        border: '1px solid rgba(139, 92, 246, 0.25)',
        boxShadow: '0 20px 40px -15px rgba(124, 58, 237, 0.2)'
      }}
    >
      {/* Dynamic Gradient Auras */}
      <div 
        className="absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-40 blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.7) 0%, rgba(99, 102, 241, 0.1) 70%)'
        }}
      />
      <div 
        className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.6) 0%, rgba(139, 92, 246, 0.05) 70%)'
        }}
      />

      {/* Subtle overlay grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <span 
            className="text-[11px] font-mono tracking-wider font-extrabold uppercase text-violet-300"
          >
            {slide.badge || `SLIDE 0${slide.slideNumber}`}
          </span>
        </div>

        {/* Slide Counter Indicator */}
        <div className="flex items-center gap-1 text-xs font-mono font-bold text-violet-300 tabular-nums">
          <span>{String(slide.slideNumber).padStart(2, '0')}</span>
          <span className="text-violet-500">/</span>
          <span>{String(totalSlides).padStart(2, '0')}</span>
        </div>
      </div>

      {/* Center Narrative Content */}
      <div className="relative z-10 my-auto py-2 flex flex-col justify-center">
        {/* Visual Archetype & Icon Badge */}
        <div className="mb-3 inline-flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-500 p-0.5 shadow-md shadow-violet-950/40">
            <div className="w-full h-full bg-[#0d0f1d] rounded-[6px] flex items-center justify-center text-violet-300">
              <IconComponent className="w-3.5 h-3.5" />
            </div>
          </div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-violet-400">
            {slide.visualDirection?.archetype || 'insight'}
          </span>
        </div>

        {/* Headline */}
        <h2 
          className="text-2xl sm:text-3xl lg:text-[2.15rem] font-heading font-extrabold text-white tracking-tight leading-[1.18] drop-shadow-sm"
          style={{ ...headlineStyle, textWrap: 'balance' }}
        >
          {slide.headline}
        </h2>

        {/* Subheadline */}
        {slide.subheadline && (
          <p 
            className="mt-2.5 text-xs sm:text-sm lg:text-base font-sans text-violet-200/90 font-medium leading-relaxed"
            style={subheadlineStyle}
          >
            {slide.subheadline}
          </p>
        )}

        {/* Body Text */}
        {slide.body && (
          <p 
            className="mt-3.5 text-xs sm:text-sm lg:text-[0.95rem] font-sans text-slate-300 leading-relaxed font-normal"
            style={bodyStyle}
          >
            {slide.body}
          </p>
        )}

        {/* Bullets */}
        {slide.bullets && slide.bullets.length > 0 && (
          <div className="mt-4 space-y-2">
            {slide.bullets.map((bullet, idx) => (
              <div 
                key={idx} 
                className="p-2.5 sm:p-3 rounded-xl bg-white/[0.04] border border-violet-500/20 backdrop-blur-sm flex items-start gap-3 hover:border-violet-500/40 transition-colors"
              >
                <div className="mt-0.5 w-4 h-4 rounded-md bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 shadow-sm">
                  {idx + 1}
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-snug font-medium" style={bulletStyle}>{bullet}</p>
              </div>
            ))}
          </div>
        )}

        {/* Call to action card */}
        {slide.callToAction && (
          <div className="mt-4 p-3.5 rounded-xl bg-gradient-to-r from-violet-600/30 via-indigo-600/20 to-purple-600/30 border border-violet-400/40 backdrop-blur-md flex items-center justify-between shadow-lg shadow-violet-950/40">
            <span className="text-xs sm:text-sm font-bold text-white tracking-wide" style={headlineStyle}>{slide.callToAction}</span>
            <div className="w-6 h-6 rounded-md bg-violet-500 text-white flex items-center justify-center shadow-md">
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        )}
      </div>

      {/* Bottom Footer */}
      <div className="relative z-10 pt-3.5 border-t border-violet-500/20 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-violet-600 to-sky-400 p-0.5">
            <div className="w-full h-full bg-[#0d0f1d] rounded-full flex items-center justify-center font-bold text-[10px] text-white">
              {authorName.charAt(0)}
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-white text-xs leading-none">{authorName}</span>
            <span className="text-[10px] text-violet-300/80">{authorHandle}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] font-mono text-violet-300">
          <span>Swipe</span>
          <ArrowRight className="w-3 h-3 text-violet-400" />
        </div>
      </div>
    </div>
  );
};

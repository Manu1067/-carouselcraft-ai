import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  ChevronUp, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  Eye, 
  Palette, 
  Sliders, 
  Type, 
  Layout, 
  Copy, 
  Check, 
  Sparkles, 
  ArrowRight, 
  Maximize2, 
  RefreshCw, 
  Square, 
  RectangleVertical, 
  GripVertical, 
  RotateCcw, 
  AlertTriangle,
  ZoomIn,
  ZoomOut,
  SlidersHorizontal,
  Share2,
  Heart,
  MessageCircle,
  Bookmark
} from 'lucide-react';
import { CarouselProject, SlideContent, TemplateStyle, AspectRatio } from '../types/carousel';
import { SlideCanvas } from './SlideCanvas';
import { TEMPLATES_CONFIG } from '../data/sampleCarousel';

interface EditorViewProps {
  project: CarouselProject;
  onUpdateProject: (updated: CarouselProject) => void;
  onProceedToReview: () => void;
  initialSlideIndex?: number;
}

export const EditorView: React.FC<EditorViewProps> = ({
  project,
  onUpdateProject,
  onProceedToReview,
  initialSlideIndex = 0
}) => {
  const [selectedSlideIndex, setSelectedSlideIndex] = useState(initialSlideIndex);
  const [activeTab, setActiveTab] = useState<'content' | 'design' | 'visual'>('content');
  const [mobilePanel, setMobilePanel] = useState<'slides' | 'canvas' | 'controls'>('canvas');
  const [draggedSlideIdx, setDraggedSlideIdx] = useState<number | null>(null);
  const [slideToDelete, setSlideToDelete] = useState<number | null>(null);
  const [showSocialChrome, setShowSocialChrome] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  React.useEffect(() => {
    if (typeof initialSlideIndex === 'number' && initialSlideIndex >= 0 && initialSlideIndex < project.slides.length) {
      setSelectedSlideIndex(initialSlideIndex);
    }
  }, [initialSlideIndex]);

  // Background presets
  const bgPresets = [
    { label: 'Obsidian', color: '#090a0f' },
    { label: 'Deep Violet', color: '#0d0f1d' },
    { label: 'Navy Slate', color: '#0a1224' },
    { label: 'Pure Noir', color: '#020408' },
    { label: 'Midnight Teal', color: '#05181b' },
    { label: 'Warm Dark', color: '#131118' }
  ];

  // Text presets
  const textPresets = [
    { label: 'White', color: '#ffffff' },
    { label: 'Ice Slate', color: '#f1f5f9' },
    { label: 'Soft Violet', color: '#c084fc' },
    { label: 'Sky Blue', color: '#38bdf8' },
    { label: 'Solar Amber', color: '#fde047' },
    { label: 'Emerald Glow', color: '#34d399' }
  ];

  const currentSlide = project.slides[selectedSlideIndex] || project.slides[0];

  // Helper to update current slide
  const updateCurrentSlide = (fields: Partial<SlideContent>) => {
    const updatedSlides = [...project.slides];
    updatedSlides[selectedSlideIndex] = {
      ...updatedSlides[selectedSlideIndex],
      ...fields
    };
    onUpdateProject({
      ...project,
      slides: updatedSlides,
      updatedAt: new Date().toISOString()
    });
  };

  // Drag and drop reordering
  const handleDragStart = (idx: number) => {
    setDraggedSlideIdx(idx);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetIdx: number) => {
    if (draggedSlideIdx === null || draggedSlideIdx === targetIdx) return;
    const slides = [...project.slides];
    const [moved] = slides.splice(draggedSlideIdx, 1);
    slides.splice(targetIdx, 0, moved);
    slides.forEach((s, i) => { s.slideNumber = i + 1; });
    onUpdateProject({ ...project, slides, updatedAt: new Date().toISOString() });
    setSelectedSlideIndex(targetIdx);
    setDraggedSlideIdx(null);
  };

  // Reorder slide up
  const moveSlideUp = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (idx <= 0) return;
    const slides = [...project.slides];
    const temp = slides[idx];
    slides[idx] = slides[idx - 1];
    slides[idx - 1] = temp;
    slides.forEach((s, i) => { s.slideNumber = i + 1; });
    onUpdateProject({ ...project, slides, updatedAt: new Date().toISOString() });
    setSelectedSlideIndex(idx - 1);
  };

  // Reorder slide down
  const moveSlideDown = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (idx >= project.slides.length - 1) return;
    const slides = [...project.slides];
    const temp = slides[idx];
    slides[idx] = slides[idx + 1];
    slides[idx + 1] = temp;
    slides.forEach((s, i) => { s.slideNumber = i + 1; });
    onUpdateProject({ ...project, slides, updatedAt: new Date().toISOString() });
    setSelectedSlideIndex(idx + 1);
  };

  // Add new slide
  const handleAddSlide = () => {
    const newSlideNumber = project.slides.length + 1;
    const newSlide: SlideContent = {
      id: `slide-custom-${Date.now()}`,
      slideNumber: newSlideNumber,
      badge: `INDEX // 0${newSlideNumber}`,
      headline: 'New Key Takeaway',
      subheadline: 'Supportive point that deepens reader understanding',
      body: 'Add your tactical insight here. Keep sentences short and punchy for maximum swipe completion.',
      bullets: [
        'First actionable guideline',
        'Second tangible example or metric'
      ],
      callToAction: newSlideNumber === 7 ? 'Save this post for later ➔' : undefined,
      visualDirection: {
        archetype: 'insight',
        suggestedIcon: 'Sparkles',
        layoutNotes: 'Clean, focused card layout',
        focalPoint: 'Primary insight text'
      }
    };

    const newSlides = [...project.slides, newSlide];
    onUpdateProject({
      ...project,
      slideCount: newSlides.length,
      slides: newSlides,
      updatedAt: new Date().toISOString()
    });
    setSelectedSlideIndex(newSlides.length - 1);
    setMobilePanel('canvas');
  };

  // Duplicate slide
  const handleDuplicateSlide = (idx: number) => {
    const target = project.slides[idx];
    const duplicated: SlideContent = {
      ...target,
      id: `slide-dup-${Date.now()}`,
      slideNumber: target.slideNumber + 1,
      headline: `${target.headline} (Copy)`
    };

    const newSlides = [...project.slides];
    newSlides.splice(idx + 1, 0, duplicated);
    newSlides.forEach((s, i) => { s.slideNumber = i + 1; });

    onUpdateProject({
      ...project,
      slideCount: newSlides.length,
      slides: newSlides,
      updatedAt: new Date().toISOString()
    });
    setSelectedSlideIndex(idx + 1);
  };

  // Delete slide with confirmation
  const confirmDeleteSlide = () => {
    if (slideToDelete === null) return;
    if (project.slides.length <= 3) {
      alert('A carousel must contain at least 3 slides.');
      setSlideToDelete(null);
      return;
    }

    const newSlides = project.slides.filter((_, i) => i !== slideToDelete);
    newSlides.forEach((s, i) => { s.slideNumber = i + 1; });

    const newIndex = Math.min(selectedSlideIndex, newSlides.length - 1);
    setSelectedSlideIndex(newIndex);
    onUpdateProject({
      ...project,
      slideCount: newSlides.length,
      slides: newSlides,
      updatedAt: new Date().toISOString()
    });
    setSlideToDelete(null);
  };

  // Bullet edit helpers
  const handleBulletChange = (bIndex: number, text: string) => {
    const bullets = [...(currentSlide.bullets || [])];
    bullets[bIndex] = text;
    updateCurrentSlide({ bullets });
  };

  const handleAddBullet = () => {
    const bullets = [...(currentSlide.bullets || []), 'New actionable bullet point'];
    updateCurrentSlide({ bullets });
  };

  const handleDeleteBullet = (bIndex: number) => {
    const bullets = (currentSlide.bullets || []).filter((_, i) => i !== bIndex);
    updateCurrentSlide({ bullets });
  };

  // Template switch
  const handleTemplateChange = (templateId: TemplateStyle) => {
    onUpdateProject({
      ...project,
      template: templateId,
      updatedAt: new Date().toISOString()
    });
  };

  // Aspect ratio switch
  const handleAspectRatioChange = (ratio: AspectRatio) => {
    onUpdateProject({
      ...project,
      aspectRatio: ratio,
      updatedAt: new Date().toISOString()
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] overflow-hidden bg-[#090a0f]">
      {/* Top Toolbar */}
      <div className="h-14 px-4 sm:px-6 border-b border-slate-800/80 bg-[#0e1017] flex items-center justify-between flex-shrink-0 z-20">
        <div className="flex items-center gap-3">
          {/* Ratio switcher */}
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => handleAspectRatioChange('4:5')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                project.aspectRatio === '4:5'
                  ? 'bg-violet-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="4:5 Portrait Ratio (Optimal for LinkedIn & Instagram feed)"
            >
              <RectangleVertical className="w-3.5 h-3.5" />
              <span>4:5 Portrait</span>
            </button>
            <button
              onClick={() => handleAspectRatioChange('1:1')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                project.aspectRatio === '1:1'
                  ? 'bg-violet-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="1:1 Square Ratio (Classic Instagram post)"
            >
              <Square className="w-3.5 h-3.5" />
              <span>1:1 Square</span>
            </button>
          </div>

          <div className="h-4 w-[1px] bg-slate-800 hidden md:block" />

          {/* Social Chrome Preview Toggle */}
          <button
            onClick={() => setShowSocialChrome(!showSocialChrome)}
            className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
              showSocialChrome
                ? 'bg-violet-500/15 border-violet-500/40 text-violet-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <span>Feed Frame</span>
          </button>

          {/* Slide Navigator indicator */}
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-300 font-mono">
            <span className="font-bold text-violet-400">
              Slide {selectedSlideIndex + 1}
            </span>
            <span className="text-slate-500">/</span>
            <span className="text-slate-400">{project.slides.length}</span>
          </div>
        </div>

        {/* Mobile View Switcher Tabs */}
        <div className="flex lg:hidden bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setMobilePanel('slides')}
            className={`px-2.5 py-1 rounded-lg transition-all ${mobilePanel === 'slides' ? 'bg-violet-600 text-white font-semibold' : 'text-slate-400'}`}
          >
            Slides
          </button>
          <button
            onClick={() => setMobilePanel('canvas')}
            className={`px-2.5 py-1 rounded-lg transition-all ${mobilePanel === 'canvas' ? 'bg-violet-600 text-white font-semibold' : 'text-slate-400'}`}
          >
            Canvas
          </button>
          <button
            onClick={() => setMobilePanel('controls')}
            className={`px-2.5 py-1 rounded-lg transition-all ${mobilePanel === 'controls' ? 'bg-violet-600 text-white font-semibold' : 'text-slate-400'}`}
          >
            Design
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleAddSlide}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-violet-400" />
            <span>Add Slide</span>
          </button>

          <button
            onClick={onProceedToReview}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold shadow-md shadow-violet-950/60 transition-all cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Founder Review</span>
          </button>
        </div>
      </div>

      {/* Main 3-Column Studio Workspace */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Left Column: Slide Thumbnails Strip */}
        <div className={`w-56 sm:w-64 flex-shrink-0 bg-[#0c0e15] border-r border-slate-800/80 flex flex-col justify-between overflow-hidden ${
          mobilePanel === 'slides' ? 'flex fixed inset-y-14 left-0 z-30 w-full sm:w-72 bg-[#0c0e15]' : 'hidden lg:flex'
        }`}>
          <div className="p-3 border-b border-slate-800/80 flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold">
              Sequence Strip ({project.slides.length})
            </span>
            <button
              onClick={handleAddSlide}
              className="p-1 rounded-lg bg-slate-800 text-violet-400 hover:bg-violet-600 hover:text-white transition-all cursor-pointer"
              title="Add Slide"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Slide List with Drag and Drop */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
            {project.slides.map((slide, idx) => {
              const isSelected = idx === selectedSlideIndex;
              return (
                <div
                  key={slide.id}
                  draggable
                  onDragStart={() => handleDragStart(idx)}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(idx)}
                  onClick={() => {
                    setSelectedSlideIndex(idx);
                    if (window.innerWidth < 1024) setMobilePanel('canvas');
                  }}
                  className={`group relative rounded-xl border p-2.5 cursor-pointer transition-all ${
                    isSelected
                      ? 'border-violet-500 bg-violet-950/30 shadow-md shadow-violet-950/40 ring-1 ring-violet-500/50'
                      : 'border-slate-800/80 bg-slate-900/50 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <GripVertical className="w-3 h-3 text-slate-600 cursor-grab opacity-60 group-hover:opacity-100" />
                      <span className="text-[10px] font-mono font-bold text-violet-400 tabular-nums">
                        {String(slide.slideNumber).padStart(2, '0')}
                      </span>
                    </div>
                    
                    {/* Action buttons on thumbnail */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => moveSlideUp(idx, e)}
                        disabled={idx === 0}
                        className="p-0.5 rounded text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-20 cursor-pointer"
                        title="Move Up"
                      >
                        <ChevronUp className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => moveSlideDown(idx, e)}
                        disabled={idx === project.slides.length - 1}
                        className="p-0.5 rounded text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-20 cursor-pointer"
                        title="Move Down"
                      >
                        <ChevronDown className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSlideToDelete(idx);
                        }}
                        className="p-0.5 rounded text-slate-400 hover:text-rose-400 hover:bg-slate-800 cursor-pointer"
                        title="Delete Slide"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Micro Preview of headline */}
                  <p className="text-[11px] font-medium text-slate-200 line-clamp-2 leading-snug">
                    {slide.headline || 'Untitled Slide'}
                  </p>
                  
                  <div className="mt-1.5 flex items-center justify-between text-[9px] font-mono text-slate-400">
                    <span className="uppercase">{slide.visualDirection?.archetype || 'insight'}</span>
                    <span>{slide.body ? `${slide.body.split(/\s+/).length}w` : '0w'}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3 border-t border-slate-800/80">
            <button
              onClick={handleAddSlide}
              className="w-full py-2 rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-violet-400" />
              <span>Add Slide</span>
            </button>
          </div>
        </div>

        {/* Center Column: Live Preview Canvas */}
        <div className={`flex-1 bg-[#090a0f] p-4 sm:p-8 flex flex-col items-center justify-center relative overflow-y-auto ${
          mobilePanel === 'canvas' ? 'flex' : 'hidden lg:flex'
        }`}>
          {/* Slide Navigation arrows overlay */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20">
            <button
              onClick={() => setSelectedSlideIndex(Math.max(0, selectedSlideIndex - 1))}
              disabled={selectedSlideIndex === 0}
              className="p-2.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-20 disabled:cursor-not-allowed shadow-xl transition-all cursor-pointer"
              title="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20">
            <button
              onClick={() => setSelectedSlideIndex(Math.min(project.slides.length - 1, selectedSlideIndex + 1))}
              disabled={selectedSlideIndex === project.slides.length - 1}
              className="p-2.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-20 disabled:cursor-not-allowed shadow-xl transition-all cursor-pointer"
              title="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Social Frame Container if enabled */}
          <div className={`w-full max-w-[440px] sm:max-w-[480px] lg:max-w-[500px] transition-all duration-300 ${
            showSocialChrome ? 'p-3 rounded-3xl bg-[#11131e] border border-slate-800 shadow-2xl space-y-3' : ''
          }`}>
            {showSocialChrome && (
              <div className="flex items-center justify-between pb-1 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-violet-600 text-white font-bold flex items-center justify-center text-[10px]">
                    {project.authorName.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-white text-xs leading-none">{project.authorName}</span>
                    <span className="text-[10px] text-slate-400">{project.authorHandle}</span>
                  </div>
                </div>
                <div className="text-[10px] font-mono text-slate-400">
                  {project.platform === 'instagram' ? 'Instagram Feed' : 'LinkedIn Document'}
                </div>
              </div>
            )}

            {/* The Slide Canvas Wrapper */}
            <div className="w-full shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 ring-1 ring-white/10">
              <SlideCanvas
                slide={currentSlide}
                template={project.template}
                aspectRatio={project.aspectRatio}
                totalSlides={project.slides.length}
                authorName={project.authorName}
                authorHandle={project.authorHandle}
                platform={project.platform}
              />
            </div>

            {showSocialChrome && (
              <div className="flex items-center justify-between pt-1 text-slate-400 text-xs">
                <div className="flex items-center gap-3">
                  <Heart className="w-4 h-4 text-slate-400" />
                  <MessageCircle className="w-4 h-4 text-slate-400" />
                  <Share2 className="w-4 h-4 text-slate-400" />
                </div>
                <div className="flex items-center gap-1">
                  {project.slides.map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-1.5 rounded-full transition-all ${i === selectedSlideIndex ? 'w-4 bg-violet-400' : 'w-1.5 bg-slate-700'}`} 
                    />
                  ))}
                </div>
                <Bookmark className="w-4 h-4 text-slate-400" />
              </div>
            )}
          </div>

          {/* Slide Quick Info below canvas */}
          <div className="mt-4 flex items-center gap-3 text-xs text-slate-400">
            <span className="font-mono">
              Focal Point: <strong className="text-slate-300 font-normal">{currentSlide.visualDirection?.focalPoint || 'Headline'}</strong>
            </span>
            <span>•</span>
            <span className="font-mono">
              Theme: <strong className="text-violet-400 font-semibold">{TEMPLATES_CONFIG[project.template]?.name}</strong>
            </span>
          </div>
        </div>

        {/* Right Column: Slide Editor & Styling Inspector */}
        <div className={`w-80 sm:w-96 flex-shrink-0 bg-[#0c0e15] border-l border-slate-800/80 flex flex-col justify-between overflow-hidden ${
          mobilePanel === 'controls' ? 'flex fixed inset-y-14 right-0 z-30 w-full sm:w-96 bg-[#0c0e15]' : 'hidden lg:flex'
        }`}>
          {/* Inspector Tabs */}
          <div className="flex border-b border-slate-800/80 bg-[#090b10]">
            <button
              onClick={() => setActiveTab('content')}
              className={`flex-1 py-3 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 border-b-2 cursor-pointer ${
                activeTab === 'content'
                  ? 'border-violet-500 text-white bg-slate-900/60'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Type className="w-3.5 h-3.5" />
              <span>Slide Copy</span>
            </button>
            <button
              onClick={() => setActiveTab('design')}
              className={`flex-1 py-3 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 border-b-2 cursor-pointer ${
                activeTab === 'design'
                  ? 'border-violet-500 text-white bg-slate-900/60'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Theme & Style</span>
            </button>
            <button
              onClick={() => setActiveTab('visual')}
              className={`flex-1 py-3 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 border-b-2 cursor-pointer ${
                activeTab === 'visual'
                  ? 'border-violet-500 text-white bg-slate-900/60'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Archetype</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {activeTab === 'content' && (
              <div className="space-y-4">
                {/* Badge / Index */}
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 font-bold mb-1.5">
                    Micro-Badge / Tag
                  </label>
                  <input
                    type="text"
                    value={currentSlide.badge || ''}
                    onChange={(e) => updateCurrentSlide({ badge: e.target.value })}
                    placeholder="e.g. 01 / THE SHIFT"
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
                  />
                </div>

                {/* Headline */}
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 font-bold mb-1.5">
                    Slide Headline <span className="text-violet-400">*</span>
                  </label>
                  <textarea
                    rows={2}
                    value={currentSlide.headline}
                    onChange={(e) => updateCurrentSlide({ headline: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-xl p-3 text-xs font-semibold text-white focus:outline-none focus:border-violet-500"
                  />
                </div>

                {/* Subheadline */}
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 font-bold mb-1.5">
                    Subheadline (Optional)
                  </label>
                  <input
                    type="text"
                    value={currentSlide.subheadline || ''}
                    onChange={(e) => updateCurrentSlide({ subheadline: e.target.value })}
                    placeholder="Supportive subtext"
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
                  />
                </div>

                {/* Body paragraph */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-mono uppercase text-slate-400 font-bold">
                      Body Narrative
                    </label>
                    <span className="text-[10px] text-slate-400">
                      {currentSlide.body ? currentSlide.body.split(/\s+/).length : 0} words
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    value={currentSlide.body || ''}
                    onChange={(e) => updateCurrentSlide({ body: e.target.value })}
                    placeholder="Concise explanation (keep under 40 words)"
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-violet-500"
                  />
                </div>

                {/* Bullets List */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-mono uppercase text-slate-400 font-bold">
                      Bullet Points
                    </label>
                    <button
                      type="button"
                      onClick={handleAddBullet}
                      className="text-[11px] font-semibold text-violet-400 hover:text-violet-300 flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add Bullet</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    {(currentSlide.bullets || []).map((bullet, bIdx) => (
                      <div key={bIdx} className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono text-slate-400">{bIdx + 1}.</span>
                        <input
                          type="text"
                          value={bullet}
                          onChange={(e) => handleBulletChange(bIdx, e.target.value)}
                          className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-violet-500"
                        />
                        <button
                          type="button"
                          onClick={() => handleDeleteBullet(bIdx)}
                          className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-slate-800 cursor-pointer"
                          title="Remove bullet"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Call To Action Box */}
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 font-bold mb-1.5">
                    Slide Call-To-Action (Optional)
                  </label>
                  <input
                    type="text"
                    value={currentSlide.callToAction || ''}
                    onChange={(e) => updateCurrentSlide({ callToAction: e.target.value })}
                    placeholder="e.g. Save this post ➔ or Follow for more"
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
                  />
                </div>
              </div>
            )}

            {activeTab === 'design' && (
              <div className="space-y-5">
                {/* Design Template Switcher */}
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 font-bold mb-2">
                    Carousel Design Template
                  </label>
                  <div className="space-y-2.5">
                    {Object.values(TEMPLATES_CONFIG).map((tmpl) => (
                      <div
                        key={tmpl.id}
                        onClick={() => handleTemplateChange(tmpl.id)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all ${
                          project.template === tmpl.id
                            ? 'border-violet-500 bg-violet-950/20 shadow-md ring-1 ring-violet-500/40'
                            : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-white">{tmpl.name}</span>
                          {project.template === tmpl.id && (
                            <Check className="w-4 h-4 text-violet-400" />
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 leading-snug">{tmpl.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Slide Colors Override & Presets */}
                <div className="space-y-4 pt-3 border-t border-slate-800">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-mono uppercase text-slate-400 font-bold">
                      Background Color
                    </label>
                    {currentSlide.styleOverrides?.backgroundColor && (
                      <button
                        onClick={() => updateCurrentSlide({
                          styleOverrides: {
                            ...currentSlide.styleOverrides,
                            backgroundColor: undefined
                          }
                        })}
                        className="text-[11px] text-violet-400 hover:text-white flex items-center gap-1 cursor-pointer"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Reset</span>
                      </button>
                    )}
                  </div>

                  {/* Background Presets */}
                  <div className="flex flex-wrap gap-1.5">
                    {bgPresets.map((preset) => (
                      <button
                        key={preset.color}
                        type="button"
                        onClick={() => updateCurrentSlide({
                          styleOverrides: {
                            ...currentSlide.styleOverrides,
                            backgroundColor: preset.color
                          }
                        })}
                        className="px-2 py-1 rounded-lg border border-slate-800 bg-slate-900 text-[11px] text-slate-300 hover:border-violet-500 flex items-center gap-1.5 cursor-pointer"
                      >
                        <span className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: preset.color }} />
                        <span>{preset.label}</span>
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={currentSlide.styleOverrides?.backgroundColor || TEMPLATES_CONFIG[project.template].bgDefault}
                      onChange={(e) => updateCurrentSlide({
                        styleOverrides: {
                          ...currentSlide.styleOverrides,
                          backgroundColor: e.target.value
                        }
                      })}
                      className="w-9 h-9 rounded-lg cursor-pointer bg-transparent border-0"
                    />
                    <input
                      type="text"
                      value={currentSlide.styleOverrides?.backgroundColor || TEMPLATES_CONFIG[project.template].bgDefault}
                      onChange={(e) => updateCurrentSlide({
                        styleOverrides: {
                          ...currentSlide.styleOverrides,
                          backgroundColor: e.target.value
                        }
                      })}
                      className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white font-mono flex-1"
                    />
                  </div>

                  <div className="pt-2">
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-mono uppercase text-slate-400 font-bold">
                        Text Color
                      </label>
                      {currentSlide.styleOverrides?.textColor && (
                        <button
                          onClick={() => updateCurrentSlide({
                            styleOverrides: {
                              ...currentSlide.styleOverrides,
                              textColor: undefined
                            }
                          })}
                          className="text-[11px] text-violet-400 hover:text-white flex items-center gap-1 cursor-pointer"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Reset</span>
                        </button>
                      )}
                    </div>

                    {/* Text Presets */}
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {textPresets.map((preset) => (
                        <button
                          key={preset.color}
                          type="button"
                          onClick={() => updateCurrentSlide({
                            styleOverrides: {
                              ...currentSlide.styleOverrides,
                              textColor: preset.color
                            }
                          })}
                          className="px-2 py-1 rounded-lg border border-slate-800 bg-slate-900 text-[11px] text-slate-300 hover:border-violet-500 flex items-center gap-1.5 cursor-pointer"
                        >
                          <span className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: preset.color }} />
                          <span>{preset.label}</span>
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={currentSlide.styleOverrides?.textColor || TEMPLATES_CONFIG[project.template].textDefault}
                        onChange={(e) => updateCurrentSlide({
                          styleOverrides: {
                            ...currentSlide.styleOverrides,
                            textColor: e.target.value
                          }
                        })}
                        className="w-9 h-9 rounded-lg cursor-pointer bg-transparent border-0"
                      />
                      <input
                        type="text"
                        value={currentSlide.styleOverrides?.textColor || TEMPLATES_CONFIG[project.template].textDefault}
                        onChange={(e) => updateCurrentSlide({
                          styleOverrides: {
                            ...currentSlide.styleOverrides,
                            textColor: e.target.value
                          }
                        })}
                        className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white font-mono flex-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Author Info */}
                <div className="space-y-2 pt-3 border-t border-slate-800">
                  <label className="block text-xs font-mono uppercase text-slate-400 font-bold">
                    Author Branding (Footer)
                  </label>
                  <input
                    type="text"
                    value={project.authorName}
                    onChange={(e) => onUpdateProject({ ...project, authorName: e.target.value })}
                    placeholder="Author Name"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white"
                  />
                  <input
                    type="text"
                    value={project.authorHandle}
                    onChange={(e) => onUpdateProject({ ...project, authorHandle: e.target.value })}
                    placeholder="@handle"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300"
                  />
                </div>
              </div>
            )}

            {activeTab === 'visual' && (
              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-violet-950/20 border border-violet-500/30">
                  <span className="text-xs font-mono uppercase text-violet-300 font-bold block mb-1">
                    AI Visual Archetype
                  </span>
                  <p className="text-xs text-slate-300">
                    The visual archetype defines the cognitive posture of this slide.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 font-bold mb-1.5">
                    Archetype Type
                  </label>
                  <select
                    value={currentSlide.visualDirection?.archetype || 'insight'}
                    onChange={(e) => updateCurrentSlide({
                      visualDirection: {
                        ...currentSlide.visualDirection,
                        archetype: e.target.value as any
                      }
                    })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white capitalize focus:outline-none focus:border-violet-500 cursor-pointer"
                  >
                    <option value="hook">Hook (Pattern Interrupt)</option>
                    <option value="insight">Insight (Mindset Shift)</option>
                    <option value="framework">Framework (Step-by-Step)</option>
                    <option value="comparison">Comparison (Do vs Don't)</option>
                    <option value="quote">Quote / Principle</option>
                    <option value="cta">CTA (Closing Engagement)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 font-bold mb-1.5">
                    Focal Point Highlight
                  </label>
                  <input
                    type="text"
                    value={currentSlide.visualDirection?.focalPoint || ''}
                    onChange={(e) => updateCurrentSlide({
                      visualDirection: {
                        ...currentSlide.visualDirection,
                        focalPoint: e.target.value
                      }
                    })}
                    placeholder="e.g. Primary headline contrast"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 font-bold mb-1.5">
                    Layout Director Notes
                  </label>
                  <textarea
                    rows={3}
                    value={currentSlide.visualDirection?.layoutNotes || ''}
                    onChange={(e) => updateCurrentSlide({
                      visualDirection: {
                        ...currentSlide.visualDirection,
                        layoutNotes: e.target.value
                      }
                    })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-slate-300"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-slate-800/80 bg-slate-900/40 flex items-center justify-between">
            <button
              onClick={() => handleDuplicateSlide(selectedSlideIndex)}
              className="text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Duplicate Slide</span>
            </button>

            <button
              onClick={() => setSlideToDelete(selectedSlideIndex)}
              className="text-xs font-semibold text-rose-400 hover:text-rose-300 flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Slide</span>
            </button>
          </div>
        </div>

      </div>

      {/* Delete Confirmation Modal */}
      {slideToDelete !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm rounded-2xl bg-[#11131e] border border-slate-800 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-rose-400">
              <AlertTriangle className="w-5 h-5 flex-shrink-0" />
              <h3 className="text-base font-bold text-white">Delete Slide {slideToDelete + 1}?</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Are you sure you want to remove this slide? The remaining slides will be automatically renumbered.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSlideToDelete(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteSlide}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-bold text-white shadow-lg shadow-rose-950/60 cursor-pointer"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

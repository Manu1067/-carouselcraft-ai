import React, { useState, useRef } from 'react';
import { 
  X, 
  Download, 
  Archive, 
  FileText, 
  Image as ImageIcon, 
  FileCode, 
  CheckCircle2, 
  RefreshCw, 
  AlertCircle,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { CarouselProject, SlideContent } from '../types/carousel';
import { SlideCanvas } from './SlideCanvas';
import { 
  exportSingleSlidePng, 
  exportAllSlidesZip, 
  exportCarouselPdf, 
  exportCarouselJson,
  ExportProgress 
} from '../services/exportService';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: CarouselProject;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  project
}) => {
  const [selectedSlideForPng, setSelectedSlideForPng] = useState<number>(1);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportType, setExportType] = useState<string | null>(null);
  const [progress, setProgress] = useState<ExportProgress | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Hidden container holding all slides for high-res rendering
  const exportContainerRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  // Collect the rendered slide DOM elements
  const getRenderedSlideElements = (): HTMLElement[] => {
    if (!exportContainerRef.current) return [];
    const elements = exportContainerRef.current.querySelectorAll<HTMLElement>('.export-slide-target');
    return Array.from(elements);
  };

  // 1. Export All Slides as ZIP
  const handleExportZip = async () => {
    setIsExporting(true);
    setExportType('zip');
    setErrorMessage(null);
    setSuccessMessage(null);
    setProgress({ current: 0, total: project.slides.length, status: 'Preparing slides for capture...' });

    try {
      // Allow DOM to settle
      await new Promise(r => setTimeout(r, 100));
      const slideElements = getRenderedSlideElements();
      if (!slideElements.length) throw new Error('Render elements not ready');

      await exportAllSlidesZip(slideElements, project.title, (p) => {
        setProgress(p);
      });

      setSuccessMessage('Successfully exported all slides as a ZIP archive!');
    } catch (err: any) {
      console.error('ZIP export error:', err);
      setErrorMessage(err?.message || 'Failed to generate ZIP archive.');
    } finally {
      setIsExporting(false);
      setExportType(null);
    }
  };

  // 2. Export as PDF
  const handleExportPdf = async () => {
    setIsExporting(true);
    setExportType('pdf');
    setErrorMessage(null);
    setSuccessMessage(null);
    setProgress({ current: 0, total: project.slides.length, status: 'Initializing multi-page PDF...' });

    try {
      await new Promise(r => setTimeout(r, 100));
      const slideElements = getRenderedSlideElements();
      if (!slideElements.length) throw new Error('Render elements not ready');

      await exportCarouselPdf(slideElements, project.title, project.aspectRatio, (p) => {
        setProgress(p);
      });

      setSuccessMessage('Successfully created and downloaded multi-page PDF!');
    } catch (err: any) {
      console.error('PDF export error:', err);
      setErrorMessage(err?.message || 'Failed to generate PDF document.');
    } finally {
      setIsExporting(false);
      setExportType(null);
    }
  };

  // 3. Export Single Slide as PNG
  const handleExportSinglePng = async () => {
    setIsExporting(true);
    setExportType('png');
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      await new Promise(r => setTimeout(r, 100));
      const slideElements = getRenderedSlideElements();
      const targetIndex = selectedSlideForPng - 1;
      const targetElement = slideElements[targetIndex];
      if (!targetElement) throw new Error(`Slide ${selectedSlideForPng} not found in render queue.`);

      await exportSingleSlidePng(targetElement, selectedSlideForPng, project.title);
      setSuccessMessage(`Slide ${selectedSlideForPng} exported as high-res PNG!`);
    } catch (err: any) {
      console.error('PNG export error:', err);
      setErrorMessage(err?.message || 'Failed to export slide PNG.');
    } finally {
      setIsExporting(false);
      setExportType(null);
    }
  };

  // 4. Export JSON
  const handleExportJson = () => {
    try {
      exportCarouselJson(project);
      setSuccessMessage('Carousel metadata & slide schema exported as JSON!');
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to export JSON schema.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#0f111a] border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-violet-600/20 border border-violet-500/30 text-violet-400">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-heading font-bold text-white">
                Export Carousel Deck
              </h2>
              <p className="text-xs text-slate-400">
                {project.slides.length} slides • {project.platform === 'instagram' ? 'Instagram' : 'LinkedIn'} • {project.aspectRatio} format
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isExporting}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Export Options */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Success Banner */}
          {successMessage && (
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Error Banner */}
          {errorMessage && (
            <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Active Progress Bar */}
          {isExporting && progress && (
            <div className="p-4 rounded-2xl bg-violet-950/30 border border-violet-500/40 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-violet-300 flex items-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  {progress.status}
                </span>
                <span className="font-mono text-violet-400 font-bold">
                  {Math.round((progress.current / (progress.total || 1)) * 100)}%
                </span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-violet-500 to-sky-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.round((progress.current / (progress.total || 1)) * 100)}%` }}
                />
              </div>
            </div>
          )}

          {/* Export Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* 1. ZIP All Slides */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-violet-500/40 transition-all flex flex-col justify-between">
              <div>
                <div className="p-2.5 rounded-xl bg-violet-500/10 text-violet-400 w-fit mb-3">
                  <Archive className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white">ZIP Bundle (All PNGs)</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Downloads all {project.slides.length} slides as individual high-resolution PNG images (`slide-01.png`...).
                </p>
              </div>
              <button
                disabled={isExporting}
                onClick={handleExportZip}
                className="mt-4 w-full py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isExporting && exportType === 'zip' ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                <span>Download All (ZIP)</span>
              </button>
            </div>

            {/* 2. PDF Document */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-sky-500/40 transition-all flex flex-col justify-between">
              <div>
                <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 w-fit mb-3">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white">Multi-Page PDF</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Best for LinkedIn document carousels. Generates a pristine multi-page vector-ready PDF document.
                </p>
              </div>
              <button
                disabled={isExporting}
                onClick={handleExportPdf}
                className="mt-4 w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isExporting && exportType === 'pdf' ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                <span>Export as PDF</span>
              </button>
            </div>

            {/* 3. Single Slide PNG */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between">
              <div>
                <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 w-fit mb-3">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white">Single Slide PNG</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Download a specific individual slide (e.g. for hero covers or teaser posts).
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <label className="text-xs text-slate-400">Select slide:</label>
                  <select
                    value={selectedSlideForPng}
                    onChange={(e) => setSelectedSlideForPng(parseInt(e.target.value, 10))}
                    className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white"
                  >
                    {project.slides.map((s, idx) => (
                      <option key={s.id} value={idx + 1}>
                        Slide {idx + 1}: {s.headline.slice(0, 20)}...
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                disabled={isExporting}
                onClick={handleExportSinglePng}
                className="mt-4 w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isExporting && exportType === 'png' ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                <span>Download Slide {selectedSlideForPng} PNG</span>
              </button>
            </div>

            {/* 4. Structured JSON */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between">
              <div>
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 w-fit mb-3">
                  <FileCode className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white">Structured JSON</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Export complete narrative copy, visual directions, and metadata for CMS or API integration.
                </p>
              </div>
              <button
                disabled={isExporting}
                onClick={handleExportJson}
                className="mt-4 w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download JSON Data</span>
              </button>
            </div>

          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/40 flex items-center justify-between text-xs text-slate-400">
          <span>High-DPI 2x pixel ratio enabled for crisp social typography</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-slate-300 hover:text-white"
          >
            Close
          </button>
        </div>
      </div>

      {/* Offscreen High-Res Render Container (1080px wide) */}
      <div 
        ref={exportContainerRef}
        aria-hidden="true"
        className="fixed top-0 left-[-9999px] pointer-events-none opacity-100 z-[-100] overflow-hidden"
        style={{ width: '1080px' }}
      >
        {project.slides.map((slide) => (
          <div
            key={`export-${slide.id}`}
            className="export-slide-target"
            style={{
              width: '1080px',
              height: project.aspectRatio === '4:5' ? '1350px' : '1080px',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <SlideCanvas
              slide={slide}
              template={project.template}
              aspectRatio={project.aspectRatio}
              totalSlides={project.slides.length}
              authorName={project.authorName}
              authorHandle={project.authorHandle}
              platform={project.platform}
              className="text-base"
              isExportMode={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

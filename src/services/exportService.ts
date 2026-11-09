import * as htmlToImage from 'html-to-image';
import JSZip from 'jszip';
import { jsPDF } from 'jspdf';
import { CarouselProject, SlideContent } from '../types/carousel';

export interface ExportProgress {
  current: number;
  total: number;
  status: string;
}

// Download a Blob in browser
export function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

// Download data URL
export function triggerDataUrlDownload(dataUrl: string, filename: string) {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Render DOM node to high-res PNG data URL
export async function renderNodeToPng(element: HTMLElement, pixelRatio = 2): Promise<string> {
  // Ensure custom web fonts are fully loaded before capturing
  if (typeof document !== 'undefined' && document.fonts && document.fonts.ready) {
    try {
      await document.fonts.ready;
    } catch (e) {
      // Font ready check failed or not supported, continue
    }
  }

  // Small pause to allow layout to settle
  await new Promise(r => setTimeout(r, 60));

  return await htmlToImage.toPng(element, {
    pixelRatio,
    quality: 0.98,
    skipAutoScale: true,
    cacheBust: true,
    backgroundColor: '#0c0d12'
  });
}

// Export single slide as PNG
export async function exportSingleSlidePng(
  element: HTMLElement,
  slideNumber: number,
  title: string
): Promise<void> {
  const dataUrl = await renderNodeToPng(element, 2);
  const cleanTitle = title.replace(/[^a-zA-Z0-9-_]/g, '_').toLowerCase();
  triggerDataUrlDownload(dataUrl, `${cleanTitle}-slide-${String(slideNumber).padStart(2, '0')}.png`);
}

// Export all slides as a ZIP file containing numbered PNG images
export async function exportAllSlidesZip(
  slideElements: HTMLElement[],
  carouselTitle: string,
  onProgress?: (progress: ExportProgress) => void
): Promise<void> {
  const zip = new JSZip();
  const folder = zip.folder(carouselTitle.replace(/[^a-zA-Z0-9-_]/g, '_').toLowerCase() || 'carousel');
  const total = slideElements.length;

  for (let i = 0; i < total; i++) {
    if (onProgress) {
      onProgress({
        current: i + 1,
        total,
        status: `Rendering slide ${i + 1} of ${total} to PNG...`
      });
    }

    const el = slideElements[i];
    const dataUrl = await renderNodeToPng(el, 2);
    // Remove base64 header
    const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
    folder?.file(`slide-${String(i + 1).padStart(2, '0')}.png`, base64Data, { base64: true });
    
    // Yield to browser event loop
    await new Promise(r => setTimeout(r, 50));
  }

  if (onProgress) {
    onProgress({
      current: total,
      total,
      status: 'Compressing slides into ZIP archive...'
    });
  }

  const content = await zip.generateAsync({ type: 'blob' });
  const cleanTitle = carouselTitle.replace(/[^a-zA-Z0-9-_]/g, '_').toLowerCase();
  triggerDownload(content, `${cleanTitle}-slides.zip`);
}

// Export complete carousel as PDF document
export async function exportCarouselPdf(
  slideElements: HTMLElement[],
  carouselTitle: string,
  aspectRatio: '1:1' | '4:5',
  onProgress?: (progress: ExportProgress) => void
): Promise<void> {
  const total = slideElements.length;
  // Dimensions for PDF in points/pixels
  const width = 1080;
  const height = aspectRatio === '4:5' ? 1350 : 1080;

  const pdf = new jsPDF({
    orientation: aspectRatio === '4:5' ? 'portrait' : 'portrait',
    unit: 'px',
    format: [width, height],
    compress: true
  });

  for (let i = 0; i < total; i++) {
    if (onProgress) {
      onProgress({
        current: i + 1,
        total,
        status: `Processing slide ${i + 1} of ${total} into PDF document...`
      });
    }

    const el = slideElements[i];
    const dataUrl = await renderNodeToPng(el, 2);

    if (i > 0) {
      pdf.addPage([width, height]);
    }

    pdf.addImage(dataUrl, 'PNG', 0, 0, width, height, undefined, 'FAST');
    await new Promise(r => setTimeout(r, 50));
  }

  if (onProgress) {
    onProgress({
      current: total,
      total,
      status: 'Finalizing PDF generation...'
    });
  }

  const cleanTitle = carouselTitle.replace(/[^a-zA-Z0-9-_]/g, '_').toLowerCase();
  pdf.save(`${cleanTitle}-carousel.pdf`);
}

// Export structured slide content as JSON
export function exportCarouselJson(carousel: CarouselProject): void {
  const exportPayload = {
    metadata: {
      generator: 'CarouselCraft AI',
      exportedAt: new Date().toISOString(),
      platform: carousel.platform,
      aspectRatio: carousel.aspectRatio,
      tone: carousel.tone,
      objective: carousel.objective,
      template: carousel.template
    },
    carousel: {
      title: carousel.title,
      topic: carousel.topic,
      targetAudience: carousel.targetAudience,
      author: {
        name: carousel.authorName,
        handle: carousel.authorHandle
      },
      slideCount: carousel.slides.length,
      slides: carousel.slides.map(s => ({
        slideNumber: s.slideNumber,
        badge: s.badge,
        headline: s.headline,
        subheadline: s.subheadline,
        body: s.body,
        bullets: s.bullets,
        callToAction: s.callToAction,
        visualDirection: s.visualDirection
      }))
    }
  };

  const jsonString = JSON.stringify(exportPayload, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const cleanTitle = carousel.title.replace(/[^a-zA-Z0-9-_]/g, '_').toLowerCase();
  triggerDownload(blob, `${cleanTitle}-content.json`);
}

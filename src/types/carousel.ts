export type Platform = 'instagram' | 'linkedin';

export type ContentTone = 
  | 'Professional' 
  | 'Educational' 
  | 'Conversational' 
  | 'Bold' 
  | 'Storytelling';

export type ContentObjective = 
  | 'Educate' 
  | 'Inspire' 
  | 'Promote' 
  | 'Engage';

export type NavTab = 
  | 'dashboard' 
  | 'create' 
  | 'editor' 
  | 'review' 
  | 'projects' 
  | 'templates' 
  | 'workflow' 
  | 'settings';

export type TemplateStyle = 
  | 'minimal-editorial' 
  | 'bold-gradient' 
  | 'professional-business';

export type AspectRatio = '1:1' | '4:5';

export interface SlideContent {
  id: string;
  slideNumber: number;
  badge?: string;
  headline: string;
  subheadline?: string;
  body: string;
  bullets?: string[];
  callToAction?: string;
  visualDirection: {
    archetype: 'hook' | 'insight' | 'comparison' | 'framework' | 'quote' | 'cta';
    suggestedIcon?: string;
    layoutNotes: string;
    focalPoint: string;
  };
  styleOverrides?: {
    backgroundColor?: string;
    textColor?: string;
    accentColor?: string;
  };
}

export interface CarouselProject {
  id: string;
  title: string;
  topic: string;
  targetAudience: string;
  platform: Platform;
  aspectRatio: AspectRatio;
  tone: ContentTone;
  objective: ContentObjective;
  slideCount: number;
  template: TemplateStyle;
  slides: SlideContent[];
  authorName: string;
  authorHandle: string;
  createdAt: string;
  updatedAt: string;
  isApproved?: boolean;
  isSample?: boolean;
  aiGenerated?: boolean;
  verificationNotes?: string[];
}

export type WorkflowStageId = 
  | 'idea-input'
  | 'research-structure'
  | 'copy-generation'
  | 'visual-direction'
  | 'carousel-design'
  | 'founder-review'
  | 'export';

export interface WorkflowStage {
  id: WorkflowStageId;
  name: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  stepNumber: number;
  details?: string;
}

export interface TemplateDefinition {
  id: TemplateStyle;
  name: string;
  description: string;
  previewGradient: string;
  bgDefault: string;
  textDefault: string;
  accentDefault: string;
  fontHeading: string;
  fontBody: string;
  borderStyle: string;
  tagline: string;
}

import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  CircleDot, 
  Sparkles, 
  ArrowRight, 
  Layers, 
  FileText, 
  Eye, 
  Download, 
  ShieldCheck, 
  Cpu, 
  Palette,
  ExternalLink
} from 'lucide-react';
import { CarouselProject, WorkflowStage, WorkflowStageId } from '../types/carousel';

interface WorkflowViewProps {
  stages: WorkflowStage[];
  project: CarouselProject | null;
  onNavigateStage: (stageId: WorkflowStageId) => void;
}

export const WorkflowView: React.FC<WorkflowViewProps> = ({
  stages,
  project,
  onNavigateStage
}) => {
  const getStageIcon = (id: WorkflowStageId) => {
    switch (id) {
      case 'idea-input': return FileText;
      case 'research-structure': return Layers;
      case 'copy-generation': return Sparkles;
      case 'visual-direction': return Cpu;
      case 'carousel-design': return Palette;
      case 'founder-review': return ShieldCheck;
      case 'export': return Download;
      default: return CircleDot;
    }
  };

  const getStatusBadge = (status: WorkflowStage['status']) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Completed</span>
          </span>
        );
      case 'in-progress':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-violet-500/20 border border-violet-500/40 text-violet-300 animate-pulse">
            <CircleDot className="w-3.5 h-3.5" />
            <span>In Progress</span>
          </span>
        );
      case 'pending':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-slate-800 border border-slate-700 text-slate-400">
            <Clock className="w-3.5 h-3.5" />
            <span>Pending</span>
          </span>
        );
    }
  };

  return (
    <div className="p-6 lg:p-10 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-300 text-xs font-mono font-semibold tracking-wide mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>7-STAGE AI CONTENT PIPELINE</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
          Workflow Architecture
        </h1>
        <p className="text-sm text-slate-400 mt-1 max-w-2xl">
          Visual representation of how raw concepts are processed into viral social carousels through strategic cognitive stages and human review.
        </p>
      </div>

      {/* Active Project Reference */}
      {project && (
        <div className="p-5 rounded-2xl bg-[#12141e] border border-violet-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono uppercase text-violet-400 font-bold tracking-wider">
              Target Project in Pipeline
            </span>
            <h3 className="text-sm font-bold text-white mt-0.5">{project.title}</h3>
            <p className="text-xs text-slate-400">
              {project.slides.length} slides • {project.platform} • {project.tone} Tone • {project.template}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigateStage('founder-review')}
              className="px-3.5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <span>Jump to Review</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Workflow Stages Stack */}
      <div className="relative space-y-4 before:absolute before:left-7 before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-800 before:hidden md:before:block">
        {stages.map((stage) => {
          const Icon = getStageIcon(stage.id);
          const isDone = stage.status === 'completed';
          const isInProgress = stage.status === 'in-progress';

          return (
            <div
              key={stage.id}
              className={`relative z-10 p-6 rounded-2xl border transition-all ${
                isInProgress
                  ? 'bg-gradient-to-r from-violet-950/40 via-slate-900 to-slate-900/90 border-violet-500/50 shadow-xl shadow-violet-950/30'
                  : isDone
                  ? 'bg-[#12141e] border-slate-800/80 hover:border-slate-700'
                  : 'bg-[#0f1018]/60 border-slate-900/80 opacity-70'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  {/* Step Icon */}
                  <div className={`p-3 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                    isInProgress
                      ? 'bg-violet-600 text-white shadow-lg shadow-violet-900/60 ring-4 ring-violet-500/20'
                      : isDone
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Stage Text */}
                  <div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-mono font-bold text-violet-400">
                        STAGE 0{stage.stepNumber}
                      </span>
                      <h3 className="text-base font-bold text-white">
                        {stage.name}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-300 mt-1">
                      {stage.description}
                    </p>
                    {stage.details && (
                      <div className="mt-2 text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                        <span>Artifact: {stage.details}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Status & Navigation Button */}
                <div className="flex items-center gap-3 sm:self-center">
                  {getStatusBadge(stage.status)}

                  <button
                    onClick={() => onNavigateStage(stage.id)}
                    className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                    title={`Go to ${stage.name}`}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

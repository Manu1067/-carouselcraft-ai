import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  Clock, 
  Layers, 
  CheckCircle2, 
  Eye, 
  Share2, 
  Plus, 
  ChevronRight, 
  FileText,
  Calendar,
  Zap,
  BookmarkCheck,
  Instagram,
  Linkedin,
  Copy
} from 'lucide-react';
import { CarouselProject } from '../types/carousel';
import { QUICK_TEMPLATES } from '../data/sampleCarousel';

interface DashboardViewProps {
  recentProjects: CarouselProject[];
  onOpenProject: (project: CarouselProject) => void;
  onCreateNew: () => void;
  onSelectQuickTemplate: (template: typeof QUICK_TEMPLATES[0]) => void;
  onNavigateWorkflow: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  recentProjects,
  onOpenProject,
  onCreateNew,
  onSelectQuickTemplate,
  onNavigateWorkflow,
}) => {
  // SaaS project statistics using tabular figures
  const stats = [
    {
      label: 'Carousels Created',
      value: '28',
      change: '+22% this month',
      icon: Layers,
      accent: 'from-violet-500/20 to-indigo-500/10',
      textAccent: 'text-violet-400',
    },
    {
      label: 'Avg. Bookmark Rate',
      value: '6.8%',
      change: '3.1x higher than single posts',
      icon: BookmarkCheck,
      accent: 'from-sky-500/20 to-blue-500/10',
      textAccent: 'text-sky-400',
    },
    {
      label: 'Swipe Completion Rate',
      value: '86.4%',
      change: 'High dwell time & reader retention',
      icon: TrendingUp,
      accent: 'from-emerald-500/20 to-teal-500/10',
      textAccent: 'text-emerald-400',
    },
    {
      label: 'Time Saved per Post',
      value: '3.8 hrs',
      change: '15 mins with AI synthesis',
      icon: Clock,
      accent: 'from-amber-500/20 to-orange-500/10',
      textAccent: 'text-amber-400',
    },
  ];

  return (
    <div className="p-6 sm:p-8 lg:p-10 max-w-7xl mx-auto space-y-10">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#16142a] via-[#101322] to-[#0c0d16] border border-violet-500/20 p-8 sm:p-10 shadow-2xl">
        {/* Ambient background glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 text-xs text-violet-300 font-mono font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
            <span>AI-POWERED SOCIAL CAROUSEL STUDIO</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-400">INSTAGRAM & LINKEDIN</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight leading-[1.12]">
            Turn raw ideas into <span className="bg-gradient-to-r from-violet-400 via-purple-300 to-sky-400 bg-clip-text text-transparent">high-converting carousels</span>.
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal max-w-xl">
            Designed for founders, creators, and marketing teams. Generate structured social slide decks with magnetic hooks, clean visual archetypes, and multi-format exports.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={onCreateNew}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 hover:from-violet-500 hover:via-indigo-500 hover:to-purple-500 text-white font-heading font-bold text-sm shadow-xl shadow-violet-950/70 hover:shadow-violet-900/90 transition-all cursor-pointer group"
            >
              <Sparkles className="w-4 h-4 text-amber-300 transition-transform group-hover:rotate-12" />
              <span>Create New Carousel</span>
              <ArrowRight className="w-4 h-4 ml-0.5 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={onNavigateWorkflow}
              className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white font-semibold text-xs transition-all cursor-pointer"
            >
              <span>Explore 7-Stage Pipeline</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Illustrative Statistics Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
            Performance Benchmarks & Studio Impact
          </h2>
          <span className="text-xs text-slate-400">Industry averages for visual carousels</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#11131e] border border-slate-800/80 hover:border-slate-700/90 transition-all flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">{stat.label}</span>
                  <div className={`p-2 rounded-xl bg-gradient-to-br ${stat.accent}`}>
                    <Icon className={`w-4 h-4 ${stat.textAccent}`} />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-2xl sm:text-3xl font-heading font-extrabold text-white tabular-nums">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs text-emerald-400 font-medium">
                    {stat.change}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Visual Workflow Overview Card */}
      <div className="p-6 sm:p-7 rounded-2xl bg-[#11131e] border border-slate-800/90">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h3 className="text-base font-heading font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-violet-400" />
              <span>The CarouselCraft 7-Stage Pipeline</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              From raw concept to published social deck with human-in-the-loop review
            </p>
          </div>
          <button
            onClick={onNavigateWorkflow}
            className="text-xs font-semibold text-violet-400 hover:text-violet-300 flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>View Full Pipeline</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Pipeline Steps Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {[
            { step: '01', title: 'Idea Input', desc: 'Audience & Tone' },
            { step: '02', title: 'Research Arc', desc: 'Cognitive Flow' },
            { step: '03', title: 'Copy Synthesis', desc: 'Gemini 3.8 Flash' },
            { step: '04', title: 'Visual Direction', desc: 'Archetypes & Focal' },
            { step: '05', title: 'Slide Styling', desc: 'Theme Presets' },
            { step: '06', title: 'Founder Review', desc: 'Density & QA' },
            { step: '07', title: 'Multi Export', desc: 'PNG, ZIP, PDF, JSON' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-violet-500/40 transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold text-violet-400">{item.step}</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-slate-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-200">{item.title}</p>
                <p className="text-[10px] text-slate-400 truncate">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick-Start Framework Templates */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-heading font-bold text-white">
              Quick-Start Carousel Frameworks
            </h2>
            <p className="text-xs text-slate-400">
              Jumpstart proven viral storytelling structures in one click
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {QUICK_TEMPLATES.map((tmpl) => (
            <div
              key={tmpl.id}
              onClick={() => onSelectQuickTemplate(tmpl)}
              className="group p-5 rounded-2xl bg-[#11131e] border border-slate-800/90 hover:border-violet-500/50 hover:bg-[#141726] cursor-pointer transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3 text-xs text-slate-400">
                  <span className="font-mono text-violet-400 font-semibold">{tmpl.slides} Slides</span>
                  <div className="flex items-center gap-1.5">
                    {tmpl.platform === 'instagram' ? (
                      <Instagram className="w-3.5 h-3.5 text-pink-400" />
                    ) : (
                      <Linkedin className="w-3.5 h-3.5 text-sky-400" />
                    )}
                    <span className="capitalize">{tmpl.platform}</span>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-white group-hover:text-violet-300 transition-colors">
                  {tmpl.title}
                </h3>
                <p className="mt-1.5 text-xs text-slate-400 leading-relaxed line-clamp-2">
                  {tmpl.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 group-hover:text-violet-300">
                <span className="font-medium">Use Framework</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Projects Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-heading font-bold text-white">
              Recent Projects
            </h2>
            <p className="text-xs text-slate-400">
              Pick up where you left off or clone an existing carousel
            </p>
          </div>
          <button
            onClick={onCreateNew}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-400 hover:text-violet-300 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Project</span>
          </button>
        </div>

        {recentProjects.length === 0 ? (
          <div className="p-8 rounded-2xl bg-[#11131e] border border-dashed border-slate-800 text-center space-y-3">
            <FileText className="w-8 h-8 text-slate-600 mx-auto" />
            <p className="text-sm font-medium text-slate-300">No carousels created yet</p>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Click the create button above or pick a quick-start framework to launch your first carousel.
            </p>
            <button
              onClick={onCreateNew}
              className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 text-white text-xs font-semibold hover:bg-violet-500 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Create First Carousel</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => onOpenProject(project)}
                className="group p-5 rounded-2xl bg-[#11131e] border border-slate-800/90 hover:border-violet-500/50 hover:bg-[#141726] cursor-pointer transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5 text-xs text-slate-400">
                    <div className="flex items-center gap-1.5">
                      {project.platform === 'instagram' ? (
                        <Instagram className="w-3.5 h-3.5 text-pink-400" />
                      ) : (
                        <Linkedin className="w-3.5 h-3.5 text-sky-400" />
                      )}
                      <span className="font-mono text-[11px] uppercase font-semibold">
                        {project.slides.length} SLIDES
                      </span>
                    </div>

                    {project.isSample ? (
                      <span className="text-[10px] font-mono text-amber-400 font-semibold">
                        Sample Project
                      </span>
                    ) : project.isApproved ? (
                      <span className="text-[10px] font-mono text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Approved
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-slate-400">
                        Draft
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-bold text-white group-hover:text-violet-300 transition-colors line-clamp-2">
                    {project.title}
                  </h3>

                  <p className="mt-2 text-xs text-slate-400 line-clamp-2 font-normal">
                    {project.topic}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1 text-[11px]">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    {new Date(project.updatedAt).toLocaleDateString()}
                  </span>
                  <div className="flex items-center gap-1 text-violet-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                    <span>Open Studio</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

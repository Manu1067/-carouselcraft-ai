import React, { useState } from 'react';
import { 
  FolderKanban, 
  Search, 
  Plus, 
  Trash2, 
  Copy, 
  Calendar, 
  Instagram, 
  Linkedin, 
  CheckCircle2, 
  Eye, 
  ArrowRight,
  Sparkles,
  FileText,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import { CarouselProject, Platform } from '../types/carousel';

interface ProjectsViewProps {
  projects: CarouselProject[];
  onOpenProject: (project: CarouselProject) => void;
  onCreateNew: () => void;
  onDuplicateProject: (project: CarouselProject) => void;
  onDeleteProject: (projectId: string) => void;
  onRestoreSample?: () => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  projects,
  onOpenProject,
  onCreateNew,
  onDuplicateProject,
  onDeleteProject,
  onRestoreSample
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [platformFilter, setPlatformFilter] = useState<'all' | Platform>('all');
  const [projectToDelete, setProjectToDelete] = useState<CarouselProject | null>(null);

  const filteredProjects = projects.filter((p) => {
    const matchesSearch = 
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.topic.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlatform = platformFilter === 'all' || p.platform === platformFilter;
    return matchesSearch && matchesPlatform;
  });

  const confirmDelete = () => {
    if (projectToDelete) {
      onDeleteProject(projectToDelete.id);
      setProjectToDelete(null);
    }
  };

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-300 text-xs font-mono font-semibold tracking-wide mb-2">
            <FolderKanban className="w-3.5 h-3.5" />
            <span>LOCAL STORAGE REPOSITORY</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
            My Carousel Projects
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage your library of carousel drafts, sample guides, and approved social decks.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {onRestoreSample && (
            <button
              onClick={onRestoreSample}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
              title="Restore the pre-built 'Why Every College Student Should Learn AI' sample"
            >
              <RotateCcw className="w-3.5 h-3.5 text-violet-400" />
              <span>Restore Sample</span>
            </button>
          )}

          <button
            onClick={onCreateNew}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs shadow-xl shadow-violet-950/60 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Create New Carousel</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-[#11131e] border border-slate-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search projects or topics..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-violet-500"
          />
        </div>

        <div className="flex items-center gap-1.5 self-start sm:self-auto bg-slate-900 p-1 rounded-xl border border-slate-800">
          {(['all', 'linkedin', 'instagram'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setPlatformFilter(filter)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                platformFilter === filter
                  ? 'bg-violet-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {filter === 'all' ? 'All Platforms' : filter}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="p-12 rounded-3xl bg-[#12141e] border border-dashed border-slate-800 text-center space-y-3">
          <FileText className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No projects found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {searchTerm ? 'Try tweaking your search keywords or clear filters.' : 'Start creating your first AI carousel now.'}
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            {onRestoreSample && (
              <button
                onClick={onRestoreSample}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restore Sample Project</span>
              </button>
            )}
            <button
              onClick={onCreateNew}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Create New Carousel</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group rounded-3xl bg-[#12141e] border border-slate-800 hover:border-violet-500/50 hover:bg-[#141726] transition-all p-6 flex flex-col justify-between shadow-xl"
            >
              <div>
                {/* Badges bar */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {project.platform === 'instagram' ? (
                      <span className="p-1.5 rounded-lg bg-pink-500/10 text-pink-400 border border-pink-500/20">
                        <Instagram className="w-4 h-4" />
                      </span>
                    ) : (
                      <span className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
                        <Linkedin className="w-4 h-4" />
                      </span>
                    )}
                    <span className="text-[11px] font-mono text-slate-400 font-bold uppercase">
                      {project.slides.length} SLIDES
                    </span>
                  </div>

                  {project.isSample ? (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-amber-500/15 border border-amber-500/30 text-amber-300">
                      Sample Project
                    </span>
                  ) : project.isApproved ? (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Approved
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-400">
                      Draft
                    </span>
                  )}
                </div>

                {/* Title & Topic */}
                <h3 
                  onClick={() => onOpenProject(project)}
                  className="text-base font-heading font-bold text-white group-hover:text-violet-300 transition-colors cursor-pointer line-clamp-2"
                >
                  {project.title}
                </h3>
                
                <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {project.topic}
                </p>

                {/* Metadata */}
                <div className="mt-4 flex flex-wrap gap-2 text-[10px] font-mono text-slate-400">
                  <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                    Tone: {project.tone}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                    Ratio: {project.aspectRatio}
                  </span>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onDuplicateProject(project)}
                    className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                    title="Duplicate project"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setProjectToDelete(project)}
                    className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors cursor-pointer"
                    title="Delete project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={() => onOpenProject(project)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-600/20 hover:bg-violet-600/30 border border-violet-500/40 text-violet-300 text-xs font-bold transition-all cursor-pointer"
                >
                  <span>Open Studio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {projectToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm rounded-2xl bg-[#11131e] border border-slate-800 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-rose-400">
              <AlertTriangle className="w-5 h-5 flex-shrink-0" />
              <h3 className="text-base font-bold text-white">Delete Project?</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Are you sure you want to delete <strong className="text-white font-semibold">"{projectToDelete.title}"</strong>? This will remove it from your browser storage.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setProjectToDelete(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
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

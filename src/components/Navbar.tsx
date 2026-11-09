import React, { useState } from 'react';
import { 
  Sparkles, 
  Download, 
  CheckCircle, 
  Eye, 
  Edit3, 
  Share2, 
  Menu, 
  X,
  Instagram,
  Linkedin,
  Save,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import { CarouselProject, NavTab } from '../types/carousel';

interface NavbarProps {
  currentTab: string;
  project: CarouselProject | null;
  onUpdateTitle: (newTitle: string) => void;
  onOpenExport: () => void;
  onSelectTab: (tab: any) => void;
  onSaveProject: () => void;
  onToggleMobileMenu: () => void;
  isMobileMenuOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  project,
  onUpdateTitle,
  onOpenExport,
  onSelectTab,
  onSaveProject,
  onToggleMobileMenu,
  isMobileMenuOpen
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleInput, setTitleInput] = useState(project?.title || '');

  React.useEffect(() => {
    if (project?.title) {
      setTitleInput(project.title);
    }
  }, [project?.title]);

  const handleTitleSubmit = () => {
    setIsEditingTitle(false);
    if (titleInput.trim()) {
      onUpdateTitle(titleInput.trim());
    }
  };

  return (
    <header className="h-16 border-b border-slate-800/80 bg-[#0c0d12]/90 backdrop-blur-md sticky top-0 z-20 px-4 sm:px-6 flex items-center justify-between">
      {/* Left: Mobile hamburger & Context breadcrumb */}
      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 rounded-lg bg-slate-800/60 border border-slate-700 text-slate-300 hover:text-white"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Inline Title or Section Name */}
        {project && (currentTab === 'editor' || currentTab === 'review') ? (
          <div className="flex items-center gap-2 min-w-0">
            {isEditingTitle ? (
              <input
                type="text"
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                onBlur={handleTitleSubmit}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleTitleSubmit();
                  if (e.key === 'Escape') setIsEditingTitle(false);
                }}
                autoFocus
                className="bg-slate-900 border border-violet-500 rounded-lg px-2.5 py-1 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-violet-500/40 w-48 sm:w-72"
              />
            ) : (
              <div 
                onClick={() => setIsEditingTitle(true)}
                className="group flex items-center gap-1.5 cursor-pointer hover:bg-slate-800/50 px-2 py-1 rounded-lg transition-colors min-w-0"
                title="Click to rename project"
              >
                <h1 className="text-sm sm:text-base font-bold text-white truncate max-w-[200px] sm:max-w-xs md:max-w-sm">
                  {project.title}
                </h1>
                <Edit3 className="w-3.5 h-3.5 text-slate-400 opacity-60 group-hover:opacity-100 group-hover:text-violet-400 transition-all flex-shrink-0" />
              </div>
            )}

            {/* Platform indicator badge */}
            <div className="hidden sm:flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-mono text-slate-300">
              {project.platform === 'instagram' ? (
                <>
                  <Instagram className="w-3.5 h-3.5 text-pink-400" />
                  <span>Instagram</span>
                </>
              ) : (
                <>
                  <Linkedin className="w-3.5 h-3.5 text-sky-400" />
                  <span>LinkedIn</span>
                </>
              )}
            </div>

            {project.isSample && (
              <span className="hidden md:inline-flex px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 border border-amber-500/30 text-amber-300">
                Sample Project
              </span>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="font-heading font-bold text-base sm:text-lg text-white capitalize">
              {currentTab === 'create' ? 'Create Carousel' : currentTab === 'projects' ? 'My Projects' : currentTab}
            </span>
          </div>
        )}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {project && (
          <>
            <button
              onClick={onSaveProject}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 transition-all"
              title="Save project to browser storage"
            >
              <Save className="w-3.5 h-3.5 text-slate-400" />
              <span>Save</span>
            </button>

            {currentTab === 'editor' && (
              <button
                onClick={() => onSelectTab('review')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-600/20 hover:bg-violet-600/30 border border-violet-500/40 text-xs font-semibold text-violet-300 transition-all"
              >
                <Eye className="w-3.5 h-3.5 text-violet-400" />
                <span className="hidden sm:inline">Founder</span>
                <span>Review</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}

            {currentTab === 'review' && (
              <button
                onClick={() => onSelectTab('editor')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition-all"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                <span>Back to Editor</span>
              </button>
            )}

            <button
              onClick={onOpenExport}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-violet-950/50 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>
          </>
        )}

        {currentTab !== 'create' && (
          <button
            onClick={() => onSelectTab('create')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 hover:text-white transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span className="hidden md:inline">New Carousel</span>
          </button>
        )}
      </div>
    </header>
  );
};

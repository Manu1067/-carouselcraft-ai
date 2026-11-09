import React from 'react';
import { 
  LayoutDashboard, 
  Sparkles, 
  FolderKanban, 
  Layers, 
  GitBranch, 
  Settings, 
  SlidersHorizontal,
  ChevronRight,
  Zap,
  Eye,
  Plus
} from 'lucide-react';
import { NavTab } from '../types/carousel';

interface SidebarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  activeProjectTitle?: string;
  hasActiveProject?: boolean;
  onCreateNew?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  activeProjectTitle,
  hasActiveProject = false,
  onCreateNew
}) => {
  const mainNavItems = [
    { id: 'dashboard' as NavTab, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'create' as NavTab, label: 'Create Carousel', icon: Sparkles, badge: 'AI' },
    { id: 'projects' as NavTab, label: 'My Projects', icon: FolderKanban },
    { id: 'templates' as NavTab, label: 'Templates', icon: Layers },
    { id: 'workflow' as NavTab, label: 'Workflow', icon: GitBranch },
  ];

  return (
    <aside className="w-64 flex-shrink-0 bg-[#0b0c13] border-r border-slate-800/80 flex flex-col justify-between h-screen sticky top-0 z-30 select-none">
      <div>
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800/60">
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => onSelectTab('dashboard')}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-sky-400 p-[1.5px] shadow-lg shadow-violet-950/60 flex items-center justify-center transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-[#0c0d12] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-violet-400" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-sm tracking-tight text-white flex items-center gap-1">
                Carousel<span className="text-violet-400">Craft</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400 font-medium tracking-wider uppercase">
                Studio AI
              </span>
            </div>
          </div>

          {/* Quick Create Button in Sidebar */}
          {onCreateNew && (
            <button
              onClick={onCreateNew}
              className="mt-4 w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-md shadow-violet-950/50 flex items-center justify-center gap-2 transition-all cursor-pointer group"
            >
              <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
              <span>New Carousel</span>
            </button>
          )}
        </div>

        {/* Current Active Project Quick Jump */}
        {hasActiveProject && (
          <div className="mx-3 mt-4 p-3 rounded-xl bg-gradient-to-br from-violet-950/30 to-slate-900/60 border border-violet-500/20">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-mono uppercase text-violet-300 font-bold tracking-wider">
                Active Deck
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            </div>
            <p className="text-xs font-semibold text-slate-200 truncate mb-2.5" title={activeProjectTitle}>
              {activeProjectTitle || 'Untitled Carousel'}
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => onSelectTab('editor')}
                className={`px-2 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer ${
                  currentTab === 'editor'
                    ? 'bg-violet-600 text-white font-semibold shadow-sm'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Editor</span>
              </button>
              <button
                onClick={() => onSelectTab('review')}
                className={`px-2 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer ${
                  currentTab === 'review'
                    ? 'bg-violet-600 text-white font-semibold shadow-sm'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Review</span>
              </button>
            </div>
          </div>
        )}

        {/* Navigation Links */}
        <div className="px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
            Studio Navigation
          </div>
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group cursor-pointer ${
                  isActive
                    ? 'bg-violet-600/15 text-violet-200 border border-violet-500/30 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-violet-400' : 'text-slate-400 group-hover:text-slate-200'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-violet-500/20 text-violet-300 border border-violet-500/30">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Profile / Engine Status */}
      <div className="p-4 border-t border-slate-800/80 space-y-2.5">
        <button
          onClick={() => onSelectTab('settings')}
          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition-all cursor-pointer ${
            currentTab === 'settings'
              ? 'bg-slate-800 text-slate-100 font-semibold'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
        >
          <Settings className="w-4 h-4 text-slate-400" />
          <span>Studio Settings</span>
        </button>

        <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 text-[11px] text-slate-400 flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-violet-500/10 text-violet-400 flex-shrink-0">
            <Zap className="w-3.5 h-3.5" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-semibold text-slate-200 truncate">Gemini 3.8 Flash</span>
            <span className="text-[10px] text-slate-400 truncate">Structured AI Synthesis</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { CreateWorkspace } from './components/CreateWorkspace';
import { EditorView } from './components/EditorView';
import { ReviewView } from './components/ReviewView';
import { WorkflowView } from './components/WorkflowView';
import { TemplatesView } from './components/TemplatesView';
import { ProjectsView } from './components/ProjectsView';
import { SettingsView } from './components/SettingsView';
import { ExportModal } from './components/ExportModal';

import { CarouselProject, TemplateStyle, Platform, WorkflowStage, WorkflowStageId, NavTab } from './types/carousel';
import { SAMPLE_CAROUSEL, INITIAL_WORKFLOW_STAGES, QUICK_TEMPLATES } from './data/sampleCarousel';
import { GenerateParams } from './services/api';
import { Info, X, CheckCircle, AlertTriangle } from 'lucide-react';

const STORAGE_KEY = 'carouselcraft_projects_v1';
const SETTINGS_KEY = 'carouselcraft_settings_v1';

export default function App() {
  // Saved projects
  const [projects, setProjects] = useState<CarouselProject[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Could not read projects from localStorage', e);
    }
    return [SAMPLE_CAROUSEL];
  });

  // Current active project in editor/review
  const [currentProject, setCurrentProject] = useState<CarouselProject>(SAMPLE_CAROUSEL);

  // Active navigation tab
  const [currentTab, setCurrentTab] = useState<NavTab>('dashboard');

  // Currently focused slide in editor
  const [editorSlideIndex, setEditorSlideIndex] = useState<number>(0);

  // Workflow stages tracking
  const [workflowStages, setWorkflowStages] = useState<WorkflowStage[]>(INITIAL_WORKFLOW_STAGES);

  // Export modal state
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Mobile drawer toggle
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Prefill params for CreateWorkspace
  const [prefillParams, setPrefillParams] = useState<Partial<GenerateParams>>({});

  // Banner notification (e.g. Demo mode notice, save confirmation)
  const [bannerNotice, setBannerNotice] = useState<{ message: string; type: 'info' | 'success' | 'warning' } | null>(null);

  // Settings
  const [settings, setSettings] = useState({
    authorName: 'Alex Rivera',
    authorHandle: '@alexcreates',
    platform: 'linkedin' as Platform,
    template: 'bold-gradient' as TemplateStyle
  });

  // Load settings from storage
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem(SETTINGS_KEY);
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    } catch (e) {
      console.warn('Could not read settings from localStorage', e);
    }
  }, []);

  // Save projects to localStorage whenever projects state changes
  const saveProjects = (updatedProjects: CarouselProject[]) => {
    setProjects(updatedProjects);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProjects));
    } catch (e) {
      console.warn('Failed to save projects to localStorage', e);
    }
  };

  // Restore sample project
  const handleRestoreSample = () => {
    const freshSample: CarouselProject = {
      ...SAMPLE_CAROUSEL,
      id: `sample-project-college-ai-${Date.now()}`,
      updatedAt: new Date().toISOString()
    };
    const updated = [freshSample, ...projects.filter(p => p.id !== SAMPLE_CAROUSEL.id)];
    saveProjects(updated);
    setCurrentProject(freshSample);
    setEditorSlideIndex(0);
    setBannerNotice({
      message: 'Restored "Why Every College Student Should Learn AI" sample project.',
      type: 'info'
    });
  };

  // Update active project
  const handleUpdateProject = (updated: CarouselProject) => {
    setCurrentProject(updated);
    const updatedList = projects.map((p) => (p.id === updated.id ? updated : p));
    if (!updatedList.some((p) => p.id === updated.id)) {
      updatedList.unshift(updated);
    }
    saveProjects(updatedList);
  };

  // Rename title inline
  const handleUpdateTitle = (newTitle: string) => {
    if (!currentProject) return;
    const updated = { ...currentProject, title: newTitle, updatedAt: new Date().toISOString() };
    handleUpdateProject(updated);
    setBannerNotice({ message: `Project renamed to "${newTitle}"`, type: 'info' });
  };

  // When AI generates a carousel
  const handleCarouselGenerated = (newProj: CarouselProject, isDemo: boolean, bannerMsg?: string) => {
    // Apply default author branding from settings
    newProj.authorName = settings.authorName;
    newProj.authorHandle = settings.authorHandle;

    handleUpdateProject(newProj);
    setCurrentProject(newProj);

    // Update workflow stages
    const updatedStages: WorkflowStage[] = workflowStages.map((st) => {
      if (st.id === 'idea-input' || st.id === 'research-structure' || st.id === 'copy-generation' || st.id === 'visual-direction' || st.id === 'carousel-design') {
        return { ...st, status: 'completed' };
      }
      if (st.id === 'founder-review') {
        return { ...st, status: 'in-progress' };
      }
      return st;
    });
    setWorkflowStages(updatedStages);

    // Navigate straight to review or editor
    setCurrentTab('editor');

    if (bannerMsg) {
      setBannerNotice({
        message: bannerMsg,
        type: isDemo ? 'warning' : 'info'
      });
    } else {
      setBannerNotice({
        message: 'Carousel successfully generated with Gemini 3.8 Flash!',
        type: 'success'
      });
    }
  };

  // Approval handler in Founder Review
  const handleApproveProject = () => {
    if (!currentProject) return;
    const approved = { ...currentProject, isApproved: true, updatedAt: new Date().toISOString() };
    handleUpdateProject(approved);

    // Update workflow stage
    const updatedStages: WorkflowStage[] = workflowStages.map((st) => {
      if (st.id === 'founder-review') return { ...st, status: 'completed' };
      if (st.id === 'export') return { ...st, status: 'in-progress' };
      return st;
    });
    setWorkflowStages(updatedStages);

    setBannerNotice({
      message: 'Carousel approved by founder! Ready for high-resolution export.',
      type: 'success'
    });
  };

  // Quick template selected on dashboard or templates tab
  const handleSelectQuickFramework = (tmpl: typeof QUICK_TEMPLATES[0]) => {
    setPrefillParams({
      topic: tmpl.topic,
      targetAudience: tmpl.audience,
      platform: tmpl.platform,
      tone: tmpl.tone,
      slideCount: tmpl.slides,
      objective: tmpl.objective
    });
    setCurrentTab('create');
  };

  // Design template selected
  const handleSelectDesignTemplate = (templateId: TemplateStyle) => {
    if (currentProject) {
      handleUpdateProject({ ...currentProject, template: templateId });
      setCurrentTab('editor');
    } else {
      setPrefillParams({
        ...prefillParams,
        tone: templateId === 'bold-gradient' ? 'Bold' : templateId === 'minimal-editorial' ? 'Storytelling' : 'Professional'
      });
      setCurrentTab('create');
    }
  };

  // Duplicate a project
  const handleDuplicateProject = (target: CarouselProject) => {
    const duplicated: CarouselProject = {
      ...target,
      id: `proj-copy-${Date.now()}`,
      title: `${target.title} (Copy)`,
      isSample: false,
      isApproved: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const updated = [duplicated, ...projects];
    saveProjects(updated);
    setCurrentProject(duplicated);
    setCurrentTab('editor');
    setBannerNotice({ message: `Duplicated "${target.title}"`, type: 'info' });
  };

  // Delete a project
  const handleDeleteProject = (projectId: string) => {
    const updated = projects.filter((p) => p.id !== projectId);
    saveProjects(updated);
    if (currentProject?.id === projectId) {
      const fallback = updated[0] || SAMPLE_CAROUSEL;
      setCurrentProject(fallback);
    }
    setBannerNotice({ message: 'Project removed', type: 'info' });
  };

  // Open existing project
  const handleOpenProject = (project: CarouselProject) => {
    setCurrentProject(project);
    setCurrentTab('editor');
  };

  // Save settings
  const handleSaveSettings = (newSettings: typeof settings) => {
    setSettings(newSettings);
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
    } catch (e) {
      console.warn('Could not save settings', e);
    }
    setBannerNotice({ message: 'Branding and studio settings saved', type: 'success' });
  };

  // Workflow jump to stage
  const handleNavigateWorkflowStage = (stageId: WorkflowStageId) => {
    if (stageId === 'idea-input') setCurrentTab('create');
    else if (stageId === 'founder-review') setCurrentTab('review');
    else if (stageId === 'export') setIsExportModalOpen(true);
    else setCurrentTab('editor');
  };

  return (
    <div className="flex h-screen w-full bg-[#0c0d12] text-slate-100 overflow-hidden font-sans">
      {/* Sidebar for Desktop */}
      <div className="hidden lg:block">
        <Sidebar
          currentTab={currentTab}
          onSelectTab={(tab) => {
            setCurrentTab(tab);
            setIsMobileMenuOpen(false);
          }}
          activeProjectTitle={currentProject?.title}
          hasActiveProject={!!currentProject}
          onCreateNew={() => {
            setPrefillParams({});
            setCurrentTab('create');
          }}
        />
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden flex">
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative z-50 w-72 h-full bg-[#0e1017]">
            <Sidebar
              currentTab={currentTab}
              onSelectTab={(tab) => {
                setCurrentTab(tab);
                setIsMobileMenuOpen(false);
              }}
              activeProjectTitle={currentProject?.title}
              hasActiveProject={!!currentProject}
              onCreateNew={() => {
                setPrefillParams({});
                setCurrentTab('create');
                setIsMobileMenuOpen(false);
              }}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Navbar */}
        <Navbar
          currentTab={currentTab}
          project={currentProject}
          onUpdateTitle={handleUpdateTitle}
          onOpenExport={() => setIsExportModalOpen(true)}
          onSelectTab={(tab) => setCurrentTab(tab)}
          onSaveProject={() => {
            if (currentProject) {
              handleUpdateProject(currentProject);
              setBannerNotice({ message: 'Saved successfully to local browser repository', type: 'success' });
            }
          }}
          onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          isMobileMenuOpen={isMobileMenuOpen}
        />

        {/* Global Banner Notice if any */}
        {bannerNotice && (
          <div className={`px-4 py-2.5 text-xs flex items-center justify-between transition-all ${
            bannerNotice.type === 'warning'
              ? 'bg-amber-950/80 border-b border-amber-500/40 text-amber-200'
              : bannerNotice.type === 'success'
              ? 'bg-emerald-950/80 border-b border-emerald-500/40 text-emerald-200'
              : 'bg-violet-950/80 border-b border-violet-500/40 text-violet-200'
          }`}>
            <div className="flex items-center gap-2">
              {bannerNotice.type === 'warning' ? (
                <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
              ) : bannerNotice.type === 'success' ? (
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              ) : (
                <Info className="w-4 h-4 text-violet-400 flex-shrink-0" />
              )}
              <span className="font-medium">{bannerNotice.message}</span>
            </div>
            <button
              onClick={() => setBannerNotice(null)}
              className="p-1 rounded text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* View Switcher Container */}
        <main className="flex-1 overflow-y-auto">
          {currentTab === 'dashboard' && (
            <DashboardView
              recentProjects={projects}
              onOpenProject={handleOpenProject}
              onCreateNew={() => {
                setPrefillParams({});
                setCurrentTab('create');
              }}
              onSelectQuickTemplate={handleSelectQuickFramework}
              onNavigateWorkflow={() => setCurrentTab('workflow')}
            />
          )}

          {currentTab === 'create' && (
            <CreateWorkspace
              onCarouselGenerated={handleCarouselGenerated}
              prefillParams={prefillParams}
            />
          )}

          {currentTab === 'editor' && currentProject && (
            <EditorView
              project={currentProject}
              onUpdateProject={handleUpdateProject}
              onProceedToReview={() => setCurrentTab('review')}
              initialSlideIndex={editorSlideIndex}
            />
          )}

          {currentTab === 'review' && currentProject && (
            <ReviewView
              project={currentProject}
              onApprove={handleApproveProject}
              onEditSlide={(slideIdx) => {
                setEditorSlideIndex(slideIdx);
                setCurrentTab('editor');
              }}
              onOpenExport={() => setIsExportModalOpen(true)}
            />
          )}

          {currentTab === 'projects' && (
            <ProjectsView
              projects={projects}
              onOpenProject={handleOpenProject}
              onCreateNew={() => {
                setPrefillParams({});
                setCurrentTab('create');
              }}
              onDuplicateProject={handleDuplicateProject}
              onDeleteProject={handleDeleteProject}
              onRestoreSample={handleRestoreSample}
            />
          )}

          {currentTab === 'templates' && (
            <TemplatesView
              onSelectDesignTemplate={handleSelectDesignTemplate}
              onSelectQuickFramework={handleSelectQuickFramework}
            />
          )}

          {currentTab === 'workflow' && (
            <WorkflowView
              stages={workflowStages}
              project={currentProject}
              onNavigateStage={handleNavigateWorkflowStage}
            />
          )}

          {currentTab === 'settings' && (
            <SettingsView
              defaultAuthorName={settings.authorName}
              defaultAuthorHandle={settings.authorHandle}
              defaultPlatform={settings.platform}
              defaultTemplate={settings.template}
              onSaveSettings={handleSaveSettings}
            />
          )}
        </main>
      </div>

      {/* Multi-Format Export Modal */}
      {currentProject && (
        <ExportModal
          isOpen={isExportModalOpen}
          onClose={() => setIsExportModalOpen(false)}
          project={currentProject}
        />
      )}
    </div>
  );
}

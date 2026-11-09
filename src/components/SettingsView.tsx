import React, { useState } from 'react';
import { 
  Settings, 
  Check, 
  Sparkles, 
  User, 
  Sliders, 
  Instagram, 
  Linkedin, 
  ShieldCheck, 
  Info,
  Cpu
} from 'lucide-react';
import { Platform, TemplateStyle } from '../types/carousel';

interface SettingsViewProps {
  defaultAuthorName: string;
  defaultAuthorHandle: string;
  defaultPlatform: Platform;
  defaultTemplate: TemplateStyle;
  onSaveSettings: (settings: {
    authorName: string;
    authorHandle: string;
    platform: Platform;
    template: TemplateStyle;
  }) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  defaultAuthorName,
  defaultAuthorHandle,
  defaultPlatform,
  defaultTemplate,
  onSaveSettings
}) => {
  const [authorName, setAuthorName] = useState(defaultAuthorName);
  const [authorHandle, setAuthorHandle] = useState(defaultAuthorHandle);
  const [platform, setPlatform] = useState<Platform>(defaultPlatform);
  const [template, setTemplate] = useState<TemplateStyle>(defaultTemplate);
  const [savedNotification, setSavedNotification] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings({
      authorName,
      authorHandle,
      platform,
      template
    });
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 2500);
  };

  return (
    <div className="p-6 lg:p-10 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-300 text-xs font-mono font-semibold tracking-wide mb-2">
          <Settings className="w-3.5 h-3.5" />
          <span>STUDIO PREFERENCES</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
          Studio & Branding Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Configure default author branding, template presets, and review AI engine telemetry.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Branding Defaults Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#11131e] border border-slate-800 space-y-6">
          <h2 className="text-base font-heading font-bold text-white flex items-center gap-2">
            <User className="w-4 h-4 text-violet-400" />
            <span>Default Author & Footer Branding</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 font-bold mb-1.5">
                Author Display Name
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="e.g. Alex Rivera"
                className="w-full bg-[#0b0c13] border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-violet-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 font-bold mb-1.5">
                Social Handle / Profile Link
              </label>
              <input
                type="text"
                value={authorHandle}
                onChange={(e) => setAuthorHandle(e.target.value)}
                placeholder="e.g. @alexcreates"
                className="w-full bg-[#0b0c13] border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-violet-500"
              />
            </div>
          </div>
        </div>

        {/* Default Platform & Template Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#11131e] border border-slate-800 space-y-6">
          <h2 className="text-base font-heading font-bold text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-sky-400" />
            <span>Creation Defaults</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 font-bold mb-2">
                Default Social Platform
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPlatform('linkedin')}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    platform === 'linkedin'
                      ? 'bg-sky-950/50 border-sky-500 text-sky-300'
                      : 'bg-[#0b0c13] border-slate-800 text-slate-400'
                  }`}
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPlatform('instagram')}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    platform === 'instagram'
                      ? 'bg-pink-950/50 border-pink-500 text-pink-300'
                      : 'bg-[#0b0c13] border-slate-800 text-slate-400'
                  }`}
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>Instagram</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 font-bold mb-2">
                Default Design Preset
              </label>
              <select
                value={template}
                onChange={(e) => setTemplate(e.target.value as TemplateStyle)}
                className="w-full bg-[#0b0c13] border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-violet-500 capitalize"
              >
                <option value="bold-gradient">Bold Gradient (Modern Neon)</option>
                <option value="minimal-editorial">Minimal Editorial (Editorial Noir)</option>
                <option value="professional-business">Professional Business (Corporate Slate)</option>
              </select>
            </div>
          </div>
        </div>

        {/* AI Engine Status Card */}
        <div className="p-6 rounded-3xl bg-[#12141e] border border-violet-500/20 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-violet-400" />
              <span>AI Engine Architecture</span>
            </h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-violet-500/20 text-violet-300 border border-violet-500/30">
              gemini-3.8-flash
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Content generation is powered by Google's Gemini 3.8 Flash model running on the secure server backend. Responses are formatted via strictly typed JSON schemas with multi-stage reasoning prompts.
          </p>
        </div>

        {/* Save CTA */}
        <div className="flex items-center justify-between pt-2">
          {savedNotification ? (
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 animate-in fade-in">
              <Check className="w-4 h-4" />
              <span>Studio settings updated successfully</span>
            </span>
          ) : <div />}

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs shadow-lg shadow-violet-950/60 transition-all cursor-pointer"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};

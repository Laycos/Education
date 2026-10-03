import React from 'react';
import { Smartphone, Monitor, Sun, Moon, Palette, ShieldAlert, Sparkles } from 'lucide-react';

import { ThemeConfig, THEME_PRESETS } from '../types/theme';

interface NavbarProps {
  currentSubjectId: string;
  onSelectSubject: (id: string) => void;
  themeConfig: ThemeConfig;
  onOpenThemeCustomizer: () => void;
  isMobileSimulator: boolean;
  onToggleMobileSimulator: () => void;
  onOpenAITutor: () => void;
  onOpenErrorCenter: () => void;
  hasErrors?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentSubjectId,
  onSelectSubject,
  themeConfig,
  onOpenThemeCustomizer,
  isMobileSimulator,
  onToggleMobileSimulator,
  onOpenAITutor,
  onOpenErrorCenter,
  hasErrors = false,
}) => {
  const subjects = [
    { id: 'maths', label: 'Maths' },
    { id: 'physique', label: 'Physique' },
    { id: 'chimie', label: 'Chimie' },
    { id: 'svt', label: 'SVT' },
    { id: 'techno', label: 'Technologie' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element Brand wordmark */}
        <button
          onClick={() => onSelectSubject('maths')}
          className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 hover:opacity-85 transition-opacity whitespace-nowrap shrink-0"
        >
          <span className="text-sky-600 dark:text-sky-400">Cap</span>Révision 5ème
        </button>

        {/* Zone 2: 4-5 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {subjects.map((sub) => {
            const isActive = currentSubjectId === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => onSelectSubject(sub.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-800 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                }`}
              >
                {sub.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions and quick controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Mobile frame preview switcher */}
          <button
            onClick={onToggleMobileSimulator}
            title={isMobileSimulator ? 'Passer en plein écran Web' : 'Simuler l’application mobile Expo'}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              isMobileSimulator
                ? 'bg-sky-500 text-white border-sky-600 shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
            }`}
          >
            {isMobileSimulator ? <Monitor className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
            <span className="hidden lg:inline">{isMobileSimulator ? 'Mode Web' : 'Mode Mobile'}</span>
          </button>

          {/* Theme customizer trigger */}
          <button
            onClick={onOpenThemeCustomizer}
            title="Modifier le thème, les couleurs et les effets 3D"
            className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center gap-1.5 text-xs font-semibold shadow-2xs"
          >
            <div
              className="w-3.5 h-3.5 rounded-full shrink-0 shadow-2xs"
              style={{
                backgroundColor:
                  THEME_PRESETS[themeConfig.preset]?.primaryColor || '#0284c7',
              }}
            />
            <Palette className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            <span className="hidden sm:inline">Thème</span>
          </button>

          {/* Error log trigger */}
          <button
            onClick={onOpenErrorCenter}
            title="Ouvrir le centre de diagnostic et d’aide"
            className={`p-2 rounded-xl border transition-colors relative ${
              hasErrors
                ? 'bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-950/60 dark:text-rose-400 dark:border-rose-900'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:text-slate-800'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            {hasErrors && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            )}
          </button>

          {/* AI Tutor CTA */}
          <button
            onClick={onOpenAITutor}
            className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm btn-3d-primary flex items-center gap-1.5 shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-200" />
            <span>Tuteur IA</span>
          </button>
        </div>
      </div>
    </header>
  );
};

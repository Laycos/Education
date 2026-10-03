import React from 'react';
import { BookOpen, Sparkles, HelpCircle, FileText, CheckCircle2, Wifi, Battery, Signal } from 'lucide-react';

interface DeviceFrameProps {
  isMobileSimulator: boolean;
  activeTab: 'lessons' | 'quiz' | 'exams';
  onChangeTab: (tab: 'lessons' | 'quiz' | 'exams') => void;
  onOpenAITutor: () => void;
  children: React.ReactNode;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  isMobileSimulator,
  activeTab,
  onChangeTab,
  onOpenAITutor,
  children,
}) => {
  if (!isMobileSimulator) {
    // Standard wide desktop/tablet layout
    return <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-24">{children}</main>;
  }

  // Simulated Expo Smartphone frame
  return (
    <div className="py-6 sm:py-10 px-2 flex justify-center">
      <div className="relative w-full max-w-[420px] bg-slate-900 rounded-[48px] p-3 shadow-2xl border-4 border-slate-700/80 ring-1 ring-slate-600/30">
        {/* Hardware details: Side buttons */}
        <div className="absolute -left-4.5 top-24 w-1.5 h-12 bg-slate-700 rounded-l-md" />
        <div className="absolute -left-4.5 top-40 w-1.5 h-12 bg-slate-700 rounded-l-md" />
        <div className="absolute -right-4.5 top-28 w-1.5 h-16 bg-slate-700 rounded-r-md" />

        {/* Screen Bezel */}
        <div className="relative bg-white dark:bg-slate-950 rounded-[40px] overflow-hidden flex flex-col h-[780px] max-h-[90vh]">
          {/* Mobile Top Status Bar & Notch */}
          <div className="h-10 bg-slate-100 dark:bg-slate-900 px-6 flex items-center justify-between text-[11px] font-semibold text-slate-800 dark:text-slate-200 select-none shrink-0 z-20 border-b border-slate-200 dark:border-slate-800">
            <span>09:41</span>
            {/* Dynamic Island / Camera Notch */}
            <div className="w-20 h-4 bg-slate-900 dark:bg-black rounded-full mx-auto" />
            <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
              <Signal className="w-3 h-3" />
              <Wifi className="w-3 h-3" />
              <Battery className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Scrollable Mobile Content */}
          <div className="flex-1 overflow-y-auto p-4 pb-20">
            {children}
          </div>

          {/* Ergonomic Thumb Bottom Tab Bar (Expo Mobile Pattern) */}
          <div className="sticky bottom-0 left-0 right-0 z-30 h-16 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 grid grid-cols-4 items-center px-2">
            <button
              onClick={() => onChangeTab('lessons')}
              className={`flex flex-col items-center justify-center py-1 rounded-xl transition-colors ${
                activeTab === 'lessons'
                  ? 'text-sky-600 dark:text-sky-400 font-bold'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <BookOpen className="w-5 h-5" />
              <span className="text-[10px] mt-1">Leçon</span>
            </button>

            <button
              onClick={() => onChangeTab('quiz')}
              className={`flex flex-col items-center justify-center py-1 rounded-xl transition-colors ${
                activeTab === 'quiz'
                  ? 'text-sky-600 dark:text-sky-400 font-bold'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-[10px] mt-1">Quiz</span>
            </button>

            <button
              onClick={() => onChangeTab('exams')}
              className={`flex flex-col items-center justify-center py-1 rounded-xl transition-colors ${
                activeTab === 'exams'
                  ? 'text-sky-600 dark:text-sky-400 font-bold'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <FileText className="w-5 h-5" />
              <span className="text-[10px] mt-1">Annales</span>
            </button>

            <button
              onClick={onOpenAITutor}
              className="flex flex-col items-center justify-center py-1 rounded-xl text-purple-600 dark:text-purple-400 hover:text-purple-700 transition-colors"
            >
              <Sparkles className="w-5 h-5" />
              <span className="text-[10px] mt-1">Tuteur</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

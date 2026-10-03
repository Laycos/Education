import React, { useState, useEffect } from 'react';
import { CURRICULUM_DATA, SubjectData, Lesson } from './data/curriculum';
import { Navbar } from './components/Navbar';
import { DeviceFrame } from './components/DeviceFrame';
import { LessonView } from './components/LessonView';
import { QuizView } from './components/QuizView';
import { ExamArchivesView } from './components/ExamArchivesView';
import { AITutorModal } from './components/AITutorModal';
import { ErrorCenterModal } from './components/ErrorCenterModal';
import { ErrorToast } from './components/ErrorToast';
import { ThemeCustomizerModal } from './components/ThemeCustomizerModal';
import { ThemeConfig, THEME_PRESETS } from './types/theme';
import { logger } from './utils/logger';
import {
  Calculator,
  Zap,
  FlaskConical,
  Trees,
  Cpu,
  BookOpen,
  CheckCircle2,
  FileText,
  Sparkles,
  ChevronRight,
  GraduationCap,
  Layers,
  ArrowRight,
  RotateCcw
} from 'lucide-react';

export default function App() {
  const [themeConfig, setThemeConfig] = useState<ThemeConfig>(() => {
    try {
      const saved = localStorage.getItem('cap5eme_theme_config');
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore storage error
    }
    return { preset: 'ocean', intensity: 'medium', mode: 'light' };
  });

  const [isThemeCustomizerOpen, setIsThemeCustomizerOpen] = useState(false);
  const [isMobileSimulator, setIsMobileSimulator] = useState(false);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('maths');
  const [activeTab, setActiveTab] = useState<'lessons' | 'quiz' | 'exams'>('lessons');
  const [selectedLessonIndex, setSelectedLessonIndex] = useState(0);

  // Modals state
  const [isAITutorOpen, setIsAITutorOpen] = useState(false);
  const [aiTutorPrompt, setAiTutorPrompt] = useState<string>('');
  const [isErrorCenterOpen, setIsErrorCenterOpen] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);

  // Save theme config to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('cap5eme_theme_config', JSON.stringify(themeConfig));
    } catch {
      // Ignore quota error
    }
  }, [themeConfig]);

  // Listen to logger for indicator
  useEffect(() => {
    const unsub = logger.subscribe((entry) => {
      if (entry.level === 'error') {
        setHasErrors(true);
      }
    });
    return unsub;
  }, []);

  const currentSubject: SubjectData = CURRICULUM_DATA[selectedSubjectId] || CURRICULUM_DATA['maths'];
  const currentLesson: Lesson = currentSubject.lessons[selectedLessonIndex] || currentSubject.lessons[0];

  const currentThemeMeta = THEME_PRESETS[themeConfig.preset] || THEME_PRESETS.ocean;

  const handleOpenAITutor = (promptText?: string, context?: string) => {
    setAiTutorPrompt(promptText || '');
    setIsAITutorOpen(true);
  };

  const handleResetTheme = () => {
    setThemeConfig({ preset: 'ocean', intensity: 'medium', mode: 'light' });
  };

  // Helper icons for subjects
  const getSubjectIcon = (id: string) => {
    switch (id) {
      case 'maths':
        return <Calculator className="w-5 h-5 text-blue-500" />;
      case 'physique':
        return <Zap className="w-5 h-5 text-amber-500" />;
      case 'chimie':
        return <FlaskConical className="w-5 h-5 text-emerald-500" />;
      case 'svt':
        return <Trees className="w-5 h-5 text-green-500" />;
      case 'techno':
        return <Cpu className="w-5 h-5 text-purple-500" />;
      default:
        return <GraduationCap className="w-5 h-5 text-sky-500" />;
    }
  };

  // Dynamic theme styling
  const depthValue =
    themeConfig.intensity === 'subtle' ? '2px' : themeConfig.intensity === 'medium' ? '4px' : '6px';

  const dynamicThemeStyles = {
    '--btn-primary-color': currentThemeMeta.primaryColor,
    '--btn-primary-shadow': currentThemeMeta.primaryShadow,
    '--btn-shadow-depth': depthValue,
  } as React.CSSProperties;

  const themeClasses =
    themeConfig.mode === 'dark'
      ? `dark ${currentThemeMeta.darkBg} text-slate-100 min-h-screen transition-colors duration-200`
      : `bg-gradient-to-br ${currentThemeMeta.gradientBg} text-slate-900 min-h-screen transition-colors duration-200`;

  return (
    <div className={themeClasses} style={dynamicThemeStyles}>
      {/* 1. Global Navigation Bar */}
      <Navbar
        currentSubjectId={selectedSubjectId}
        onSelectSubject={(id) => {
          setSelectedSubjectId(id);
          setSelectedLessonIndex(0);
        }}
        themeConfig={themeConfig}
        onOpenThemeCustomizer={() => setIsThemeCustomizerOpen(true)}
        isMobileSimulator={isMobileSimulator}
        onToggleMobileSimulator={() => setIsMobileSimulator(!isMobileSimulator)}
        onOpenAITutor={() => handleOpenAITutor()}
        onOpenErrorCenter={() => setIsErrorCenterOpen(true)}
        hasErrors={hasErrors}
      />

      {/* 2. Main Content inside DeviceFrame (responsive web or Expo mobile frame) */}
      <DeviceFrame
        isMobileSimulator={isMobileSimulator}
        activeTab={activeTab}
        onChangeTab={setActiveTab}
        onOpenAITutor={() => handleOpenAITutor()}
      >
        {/* Subject Header & Subject Quick Selector */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-md shrink-0">
                {getSubjectIcon(currentSubject.id)}
              </div>
              <div>
                <span className="text-[11px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                  Collège 5ème · Cycle 4
                </span>
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                  {currentSubject.name}
                </h1>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md hidden sm:block">
              {currentSubject.tagline}
            </p>
          </div>

          {/* Quick Subject Switcher Carousel/Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-6">
            {Object.values(CURRICULUM_DATA).map((sub) => {
              const isSelected = sub.id === currentSubject.id;
              return (
                <button
                  key={sub.id}
                  onClick={() => {
                    setSelectedSubjectId(sub.id);
                    setSelectedLessonIndex(0);
                  }}
                  className={`p-3 rounded-2xl border text-left transition-all card-3d flex items-center gap-2.5 active:translate-y-0.5 ${
                    isSelected
                      ? 'bg-white dark:bg-slate-800 border-sky-400 dark:border-sky-600 shadow-md border-b-4 border-b-sky-500'
                      : 'bg-white/80 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="w-7 h-7 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                    {getSubjectIcon(sub.id)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold truncate text-slate-900 dark:text-slate-100">
                      {sub.shortName}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {sub.lessons.length} leçons
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Activity Modes Navigation (Desktop/Tablet Segmented Control) */}
          <div className="flex items-center gap-2 p-1.5 bg-slate-200/80 dark:bg-slate-800/80 rounded-2xl mb-6 shadow-inner">
            <button
              onClick={() => setActiveTab('lessons')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'lessons'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm border border-slate-300/50 dark:border-slate-700'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4 text-sky-500" />
              <span>Leçons & Schémas</span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'quiz'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm border border-slate-300/50 dark:border-slate-700'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Quiz d'application</span>
            </button>

            <button
              onClick={() => setActiveTab('exams')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'exams'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm border border-slate-300/50 dark:border-slate-700'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4 text-amber-500" />
              <span>Annales 6 ans</span>
            </button>
          </div>
        </div>

        {/* 3. Tab: Lessons & Interactive Schematics */}
        {activeTab === 'lessons' && (
          <div className="space-y-6">
            {/* Lesson sub-selector if multiple lessons */}
            {currentSubject.lessons.length > 1 && (
              <div className="flex flex-wrap gap-2 pb-2">
                {currentSubject.lessons.map((lesson, idx) => (
                  <button
                    key={lesson.id}
                    onClick={() => setSelectedLessonIndex(idx)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      selectedLessonIndex === idx
                        ? 'bg-sky-600 text-white shadow-xs'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    Chapitre {idx + 1} : {lesson.title.split(':')[0]}
                  </button>
                ))}
              </div>
            )}

            <LessonView
              lesson={currentLesson}
              subjectColor={currentSubject.accentBg}
              onStartQuiz={() => setActiveTab('quiz')}
              onOpenAITutor={(topic) =>
                handleOpenAITutor(
                  `Peux-tu m'expliquer plus simplement la leçon "${topic}" de 5ème ?`,
                  currentSubject.name
                )
              }
            />
          </div>
        )}

        {/* 4. Tab: Interactive Quiz */}
        {activeTab === 'quiz' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500">Quiz de vérification :</span>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  {currentLesson.title}
                </h3>
              </div>

              {currentSubject.lessons.length > 1 && (
                <div className="flex items-center gap-1.5">
                  {currentSubject.lessons.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedLessonIndex(idx)}
                      className={`w-7 h-7 rounded-lg text-xs font-mono font-bold transition-all ${
                        selectedLessonIndex === idx
                          ? 'bg-sky-600 text-white shadow-xs'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <QuizView
              questions={currentLesson.quiz}
              topicTitle={currentLesson.title}
              onOpenAITutor={(qText, uAnswer) =>
                handleOpenAITutor(
                  `Je ne comprends pas pourquoi ma réponse "${uAnswer}" est fausse à la question : "${qText}". Peux-tu m'expliquer ?`,
                  currentSubject.name
                )
              }
            />
          </div>
        )}

        {/* 5. Tab: 6-Year Exam Compilation (2020-2026) */}
        {activeTab === 'exams' && (
          <ExamArchivesView
            exams={currentSubject.exams}
            subjectName={currentSubject.name}
            onOpenAITutor={(qText, ctx) => handleOpenAITutor(qText, ctx)}
          />
        )}
      </DeviceFrame>

      {/* Floating Error Notification Toast */}
      <ErrorToast onOpenCenter={() => setIsErrorCenterOpen(true)} />

      {/* AI Tutor Assistant Modal */}
      <AITutorModal
        isOpen={isAITutorOpen}
        onClose={() => setIsAITutorOpen(false)}
        initialPrompt={aiTutorPrompt}
        contextSubject={currentSubject.name}
      />

      {/* Diagnostic & Error Center Modal */}
      <ErrorCenterModal
        isOpen={isErrorCenterOpen}
        onClose={() => setIsErrorCenterOpen(false)}
      />

      {/* Theme & 3D Customizer Modal */}
      <ThemeCustomizerModal
        isOpen={isThemeCustomizerOpen}
        onClose={() => setIsThemeCustomizerOpen(false)}
        config={themeConfig}
        onChangeConfig={(newCfg) => setThemeConfig(newCfg)}
        onReset={handleResetTheme}
      />
    </div>
  );
}

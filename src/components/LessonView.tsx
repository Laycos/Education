import React from 'react';
import { Lesson } from '../data/curriculum';
import { InteractiveDiagram } from './InteractiveDiagram';
import { BookOpen, CheckCircle, Lightbulb, Compass, ArrowRight, Clock } from 'lucide-react';

interface LessonViewProps {
  lesson: Lesson;
  subjectColor: string;
  onStartQuiz: () => void;
  onOpenAITutor: (topic: string) => void;
}

export const LessonView: React.FC<LessonViewProps> = ({
  lesson,
  subjectColor,
  onStartQuiz,
  onOpenAITutor,
}) => {
  return (
    <div className="space-y-6">
      {/* Lesson Hero Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 card-3d shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs mb-3 text-slate-500">
          <span className="font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            {lesson.category}
          </span>
          <span className="flex items-center gap-1 font-mono">
            <Clock className="w-3.5 h-3.5" />
            Lecture : {lesson.readTime}
          </span>
        </div>

        <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          {lesson.title}
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
          {lesson.subtitle}
        </p>

        {/* 1. Résumé des points importants à retenir */}
        <div className="bg-sky-50/60 dark:bg-sky-950/20 border border-sky-200/80 dark:border-sky-800/60 rounded-2xl p-5 mb-6">
          <div className="flex items-center gap-2 mb-3 text-sky-800 dark:text-sky-300 font-bold text-sm">
            <BookOpen className="w-4 h-4 text-sky-600" />
            <span>Résumé des points indispensables à retenir (Niveau 5ème) :</span>
          </div>

          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            {lesson.summaryPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 2. Schématiser pour bien mémoriser (Interactive Visual Diagram) */}
        <div>
          <InteractiveDiagram config={lesson.diagram} subjectColor={subjectColor} />
        </div>

        {/* 3. L'astuce mnémotechnique & Ancrage dans le réel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {lesson.mnemonic && (
            <div className="bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 rounded-2xl p-4">
              <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold text-xs mb-1.5">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                <span>Astuce mnémotechnique du professeur :</span>
              </div>
              <p className="text-xs sm:text-sm text-amber-950 dark:text-amber-200 italic leading-relaxed">
                {lesson.mnemonic}
              </p>
            </div>
          )}

          {lesson.realWorldExample && (
            <div className="bg-indigo-50/80 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/60 rounded-2xl p-4">
              <div className="flex items-center gap-2 text-indigo-800 dark:text-indigo-300 font-bold text-xs mb-1.5">
                <Compass className="w-4 h-4 text-indigo-600" />
                <span>Dans la vie courante :</span>
              </div>
              <p className="text-xs sm:text-sm text-indigo-950 dark:text-indigo-200 leading-relaxed">
                {lesson.realWorldExample}
              </p>
            </div>
          )}
        </div>

        {/* Bottom Call to Action: Start Quiz or Ask AI */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => onOpenAITutor(lesson.title)}
            className="text-xs font-semibold text-purple-700 dark:text-purple-300 hover:text-purple-800 flex items-center gap-1.5"
          >
            <span>Une question sur cette leçon ? Demande au tuteur IA</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onStartQuiz}
            className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm btn-3d-primary flex items-center gap-2"
          >
            <span>Passer au quiz d'application</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

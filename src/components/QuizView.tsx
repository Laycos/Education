import React, { useState } from 'react';
import { QuizQuestion } from '../data/curriculum';
import { CheckCircle2, XCircle, Award, RotateCcw, ArrowRight, HelpCircle, Sparkles } from 'lucide-react';

interface QuizViewProps {
  questions: QuizQuestion[];
  topicTitle: string;
  onOpenAITutor?: (questionText: string, userAnswer: string) => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ questions, topicTitle, onOpenAITutor }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<{ [qIndex: number]: number }>({});

  const currentQ = questions[currentIndex];

  const handleSelectOption = (optionIndex: number) => {
    if (showExplanation) return; // Already validated
    setSelectedOption(optionIndex);
    setShowExplanation(true);

    const isCorrect = optionIndex === currentQ.correctIndex;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setUserAnswers((prev) => ({
      ...prev,
      [currentIndex]: optionIndex,
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setScore(0);
    setIsCompleted(false);
    setUserAnswers({});
  };

  if (isCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 p-6 md:p-8 text-center card-3d shadow-xl">
        <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-950/60 border-2 border-amber-300 dark:border-amber-700 flex items-center justify-center mx-auto mb-4 text-amber-500 shadow-md">
          <Award className="w-8 h-8" />
        </div>

        <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">
          Quiz terminé avec succès !
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
          Thème : {topicTitle}
        </p>

        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 mb-6">
          <span className="text-3xl font-extrabold font-mono text-sky-600 dark:text-sky-400">
            {score}/{questions.length}
          </span>
          <span className="text-xs text-slate-500 text-left">
            Taux de réussite<br />
            <strong className="text-slate-800 dark:text-slate-200 text-sm">{percentage}%</strong>
          </span>
        </div>

        <p className="text-sm max-w-md mx-auto text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
          {percentage >= 80
            ? '🎉 Excellent travail ! Tu maîtrises parfaitement les points clés de cette leçon de 5ème.'
            : percentage >= 50
            ? '👍 Bon travail ! Quelques révisions des fiches mémo et tu seras au top pour les évaluations.'
            : '💪 Pas de découragement ! Relis bien le résumé et les schémas interactifs avant de retenter ta chance.'}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={handleRestart}
            className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm btn-3d-primary flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Recommencer ce quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 p-5 md:p-7 shadow-lg">
      {/* Quiz Header & Progress Bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-lg bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 text-xs font-mono font-bold">
            Question {currentIndex + 1}/{questions.length}
          </span>
          <span className="text-xs text-slate-500 hidden sm:inline">
            Score : <strong className="font-mono text-slate-900 dark:text-slate-100">{score}</strong>
          </span>
        </div>

        <div className="w-28 sm:w-40 h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700">
          <div
            className="h-full bg-sky-500 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Text */}
      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 mb-5 leading-snug">
        {currentQ.question}
      </h3>

      {/* Options List */}
      <div className="space-y-3 mb-6">
        {currentQ.options.map((option, index) => {
          let btnStyle =
            'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border-b-4 border-b-slate-300 dark:border-b-slate-950';

          if (showExplanation) {
            if (index === currentQ.correctIndex) {
              btnStyle =
                'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200 border-b-4 border-b-emerald-600 shadow-md';
            } else if (index === selectedOption) {
              btnStyle =
                'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200 border-b-4 border-b-rose-600';
            } else {
              btnStyle =
                'opacity-40 bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-500';
            }
          }

          return (
            <button
              key={index}
              disabled={showExplanation}
              onClick={() => handleSelectOption(index)}
              className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border transition-all text-sm font-medium flex items-center justify-between gap-3 active:translate-y-0.5 ${btnStyle}`}
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-xs font-mono font-bold shrink-0">
                  {String.fromCharCode(65 + index)}
                </span>
                <span>{option}</span>
              </div>

              {showExplanation && (
                <div>
                  {index === currentQ.correctIndex ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  ) : index === selectedOption ? (
                    <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                  ) : null}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation Box */}
      {showExplanation && (
        <div className="bg-sky-50/80 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800 rounded-2xl p-4 mb-6 transition-all">
          <div className="flex items-center gap-2 mb-1 text-sky-800 dark:text-sky-300 font-bold text-xs">
            <HelpCircle className="w-4 h-4 shrink-0" />
            Explication détaillée du professeur :
          </div>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
            {currentQ.explanation}
          </p>

          {onOpenAITutor && (
            <button
              onClick={() =>
                onOpenAITutor(
                  currentQ.question,
                  selectedOption !== null ? currentQ.options[selectedOption] : 'Non répondue'
                )
              }
              className="text-xs font-semibold text-sky-700 dark:text-sky-300 hover:underline flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-500" />
              Demander au Tuteur IA de réexpliquer avec un autre exemple
            </button>
          )}
        </div>
      )}

      {/* Action Footer */}
      {showExplanation && (
        <div className="flex justify-end">
          <button
            onClick={handleNext}
            className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm btn-3d-primary flex items-center gap-2"
          >
            <span>{currentIndex < questions.length - 1 ? 'Question suivante' : 'Voir mon résultat'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

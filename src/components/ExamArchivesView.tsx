import React, { useState } from 'react';
import { ExamQuestion } from '../data/curriculum';
import { FileText, CheckCircle, AlertTriangle, Sparkles, ChevronDown, ChevronUp, Calendar, Award } from 'lucide-react';

interface ExamArchivesViewProps {
  exams: ExamQuestion[];
  subjectName: string;
  onOpenAITutor: (questionText: string, context?: string) => void;
}

export const ExamArchivesView: React.FC<ExamArchivesViewProps> = ({ exams, subjectName, onOpenAITutor }) => {
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');
  const [expandedSolutions, setExpandedSolutions] = useState<{ [examId: string]: boolean }>({});

  const years = [2026, 2025, 2024, 2023, 2022, 2021, 2020];

  const filteredExams = selectedYear === 'all'
    ? exams
    : exams.filter((e) => e.year === selectedYear);

  const toggleSolution = (id: string) => {
    setExpandedSolutions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="space-y-6">
      {/* Intro header with year filter */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 md:p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-sky-500" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Annales des 6 dernières années (2020 - 2026)
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Compilation sélective des questions clés issues des évaluations nationales et devoirs communs de 5ème en {subjectName}.
            </p>
          </div>

          {/* Year selector buttons */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setSelectedYear('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                selectedYear === 'all'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Tous ({exams.length})
            </button>
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-2.5 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                  selectedYear === year
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* List of Exam Questions */}
      <div className="space-y-5">
        {filteredExams.map((exam) => {
          const isExpanded = !!expandedSolutions[exam.id];
          return (
            <div
              key={exam.id}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 md:p-6 card-3d shadow-sm hover:shadow-md transition-all border-b-4 border-b-slate-300 dark:border-b-slate-950"
            >
              {/* Question Meta tags */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-3 border-b border-slate-100 dark:border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold px-2.5 py-1 rounded-lg bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 font-mono">
                    Session {exam.year}
                  </span>
                  <span className="text-slate-500 font-medium">
                    {exam.session}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-slate-400 font-mono flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    Barème : <strong className="text-slate-700 dark:text-slate-200">{exam.points} pts</strong>
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                    exam.difficulty === 'Facile'
                      ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
                      : exam.difficulty === 'Moyen'
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300'
                      : 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300'
                  }`}>
                    Niveau : {exam.difficulty}
                  </span>
                </div>
              </div>

              {/* Theme title */}
              <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Thématique : <span className="text-sky-600 dark:text-sky-400 font-bold">{exam.topic}</span>
              </h4>

              {/* Problem statement */}
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 text-xs sm:text-sm text-slate-700 dark:text-slate-200 mb-3 border border-slate-200/80 dark:border-slate-800 leading-relaxed font-serif">
                <p className="font-sans font-medium text-slate-900 dark:text-slate-100 mb-1">
                  Énoncé officiel :
                </p>
                {exam.statement}
              </div>

              {/* Actual Question */}
              <div className="font-semibold text-sm sm:text-base text-slate-900 dark:text-slate-100 mb-4 pl-3 border-l-3 border-sky-500">
                {exam.question}
              </div>

              {/* Action Buttons: Toggle Answer & AI Tutor */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  onClick={() => toggleSolution(exam.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    isExpanded
                      ? 'bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200'
                      : 'bg-sky-600 hover:bg-sky-700 text-white btn-3d-primary'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{isExpanded ? 'Masquer le corrigé' : 'Afficher le corrigé officiel pas-à-pas'}</span>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                <button
                  onClick={() =>
                    onOpenAITutor(
                      `${exam.question} (Énoncé: ${exam.statement})`,
                      `Matière: ${subjectName}, Annale: ${exam.year}, Thème: ${exam.topic}`
                    )
                  }
                  className="px-3.5 py-2 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 text-xs font-semibold hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                  <span>Explique-moi autrement avec l’IA</span>
                </button>
              </div>

              {/* Step-by-Step Solution Drawer */}
              {isExpanded && (
                <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-4">
                  <div className="bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl p-4 sm:p-5">
                    <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-xs sm:text-sm mb-3">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span>Corrigé rédigé étape par étape (Attendu par le correcteur) :</span>
                    </div>

                    <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      {exam.detailedSolution.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-emerald-200 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 text-[10px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span className="leading-relaxed">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Common Trap Alert */}
                  {exam.commonTrap && (
                    <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-2xl p-4 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-bold">L’erreur classique à éviter : </strong>
                        <span>{exam.commonTrap}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

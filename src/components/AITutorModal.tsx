import React, { useState } from 'react';
import { Sparkles, X, Send, Bot, RefreshCw, AlertCircle, HelpCircle } from 'lucide-react';
import { logger } from '../utils/logger';

interface AITutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
  contextSubject?: string;
}

export const AITutorModal: React.FC<AITutorModalProps> = ({
  isOpen,
  onClose,
  initialPrompt = '',
  contextSubject = 'Mathématiques',
}) => {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState<
    Array<{ role: 'user' | 'assistant'; text: string }>
  >([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Synchronize initial prompt when modal opens
  React.useEffect(() => {
    if (initialPrompt) {
      setPrompt(initialPrompt);
    }
  }, [initialPrompt]);

  if (!isOpen) return null;

  const handleAskTutor = async (queryToAsk?: string) => {
    const textQuery = queryToAsk || prompt;
    if (!textQuery.trim()) return;

    setErrorMsg(null);
    setLoading(true);

    const userEntry = { role: 'user' as const, text: textQuery };
    setConversation((prev) => [...prev, userEntry]);
    setPrompt('');

    try {
      const response = await fetch('/api/tutor/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: textQuery,
          subject: contextSubject,
        }),
      });

      if (!response.ok) {
        throw new Error(`Erreur serveur (${response.status}): Impossible de contacter le tuteur`);
      }

      const data = await response.json();
      if (data.explanation) {
        setConversation((prev) => [
          ...prev,
          { role: 'assistant' as const, text: data.explanation },
        ]);
      } else {
        throw new Error('Format de réponse invalide');
      }
    } catch (err: unknown) {
      const entry = logger.logError(
        'Tuteur IA Gemini',
        err,
        "Pas d'inquiétude ! Le service d'assistance IA est temporairement indisponible, mais tes fiches mémo et quiz officiels restent consultables normalement."
      );
      setErrorMsg(entry.userMessage);
      setConversation((prev) => [
        ...prev,
        {
          role: 'assistant' as const,
          text: "💡 Conseil du professeur : Si le tuteur en ligne ne répond pas, rappelle-toi de toujours décomposer les étapes : 1) Identifier les données de l'énoncé, 2) Choisir la formule du cours, 3) Vérifier les unités !",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    'Explique-moi avec une analogie de la vie de tous les jours',
    'Donne-moi une astuce pour ne plus jamais me tromper',
    'Génère un mini-exercice similaire pour m’entraîner',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-850">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-300 flex items-center justify-center shadow-xs">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <span>Tuteur IA 5ème</span>
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300">
                  Gemini 3.8
                </span>
              </h3>
              <p className="text-xs text-slate-500">
                Spécialiste du programme officiel de collège · Matière : {contextSubject}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 flex items-center justify-center text-slate-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Conversation Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {conversation.length === 0 ? (
            <div className="text-center py-8 px-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/50 text-purple-500 flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
                Comment puis-je t’aider à comprendre ?
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6">
                Pose n'importe quelle question sur tes leçons de 5ème, demande une explication simplifiée ou des exemples.
              </p>

              {/* Quick suggestion buttons */}
              <div className="flex flex-col gap-2 max-w-md mx-auto">
                {quickPrompts.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setPrompt(q);
                      handleAskTutor(q);
                    }}
                    className="text-left p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors flex items-center justify-between"
                  >
                    <span>{q}</span>
                    <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            conversation.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-3 text-xs sm:text-sm ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center shrink-0 text-xs font-bold mt-1">
                    IA
                  </div>
                )}
                <div
                  className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-sky-600 text-white rounded-tr-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-xs whitespace-pre-wrap font-sans'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))
          )}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-purple-600 dark:text-purple-400 font-medium animate-pulse p-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Le tuteur prépare une explication adaptée au niveau 5ème...</span>
            </div>
          )}

          {errorMsg && (
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAskTutor()}
            placeholder="Pose ta question (ex : Pourquoi les fractions doivent avoir le même dénominateur ?)..."
            className="flex-1 text-xs sm:text-sm px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-purple-500"
          />
          <button
            disabled={loading || !prompt.trim()}
            onClick={() => handleAskTutor()}
            className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm btn-3d-primary flex items-center gap-1.5 shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Envoyer</span>
          </button>
        </div>
      </div>
    </div>
  );
};

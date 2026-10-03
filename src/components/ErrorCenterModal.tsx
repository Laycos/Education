import React, { useState, useEffect } from 'react';
import { logger, LogEntry } from '../utils/logger';
import { AlertCircle, CheckCircle2, ShieldCheck, Terminal, Trash2, X, Play, Copy, Check } from 'lucide-react';

interface ErrorCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ErrorCenterModal: React.FC<ErrorCenterModalProps> = ({ isOpen, onClose }) => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setLogs(logger.getLogs());
    const unsubscribe = logger.subscribe(() => {
      setLogs(logger.getLogs());
    });
    return unsubscribe;
  }, []);

  if (!isOpen) return null;

  const handleSimulate = () => {
    logger.simulateTestError();
    setLogs(logger.getLogs());
  };

  const handleClear = () => {
    logger.clear();
    setLogs([]);
  };

  const handleCopyLogs = () => {
    navigator.clipboard.writeText(JSON.stringify(logs, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
                Centre de Diagnostic & Gestion des Erreurs
              </h3>
              <p className="text-xs text-slate-500">
                Journalisation en direct et assistance bienveillante pour l’élève
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

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4">
          {/* Friendly reassurance block for 5th graders */}
          <div className="bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 rounded-2xl p-4 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-sky-950 dark:text-sky-200 leading-relaxed">
              <strong className="font-bold block mb-1">Message d'information à l'élève :</strong>
              Toutes les erreurs techniques (coupure réseau, indisponibilité API, etc.) sont interceptées automatiquement sans jamais bloquer la navigation ni effacer tes réponses aux quiz.
            </div>
          </div>

          {/* Test simulation button */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">
              Vérifier le bon fonctionnement du système d'erreur :
            </span>
            <button
              onClick={handleSimulate}
              className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Simuler un incident
            </button>
          </div>

          {/* Log List */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                <Terminal className="w-3.5 h-3.5 text-slate-500" />
                <span>Événements journalisés ({logs.length}) :</span>
              </div>

              {logs.length > 0 && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyLogs}
                    className="text-[11px] text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Copié !' : 'Copier'}</span>
                  </button>
                  <button
                    onClick={handleClear}
                    className="text-[11px] text-rose-500 hover:text-rose-700 flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Effacer</span>
                  </button>
                </div>
              )}
            </div>

            {logs.length === 0 ? (
              <div className="p-6 text-center rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-dashed border-slate-200 dark:border-slate-800 text-xs text-slate-400">
                Aucune erreur enregistrée. Tous les services fonctionnent de manière optimale !
              </div>
            ) : (
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {logs.map((entry) => (
                  <div
                    key={entry.id}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            entry.level === 'error' ? 'bg-rose-500' : 'bg-blue-500'
                          }`}
                        />
                        <strong className="font-semibold text-slate-900 dark:text-slate-100">
                          {entry.context}
                        </strong>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">
                        {entry.timestamp}
                      </span>
                    </div>

                    <p className="text-slate-700 dark:text-slate-300 font-medium">
                      {entry.userMessage}
                    </p>

                    {entry.technicalDetails && (
                      <div className="bg-slate-900 text-slate-300 p-2 rounded text-[11px] font-mono overflow-x-auto whitespace-pre-wrap">
                        {entry.technicalDetails}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 text-white dark:bg-slate-700 font-medium text-xs hover:bg-slate-700 transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

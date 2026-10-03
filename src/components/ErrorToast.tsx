import React, { useState, useEffect } from 'react';
import { logger, LogEntry } from '../utils/logger';
import { AlertCircle, X, ArrowRight } from 'lucide-react';

interface ErrorToastProps {
  onOpenCenter: () => void;
}

export const ErrorToast: React.FC<ErrorToastProps> = ({ onOpenCenter }) => {
  const [currentError, setCurrentError] = useState<LogEntry | null>(null);

  useEffect(() => {
    const unsubscribe = logger.subscribe((entry) => {
      if (entry.level === 'error') {
        setCurrentError(entry);
        // Auto-dismiss toast after 8 seconds
        const timer = setTimeout(() => {
          setCurrentError((prev) => (prev?.id === entry.id ? null : prev));
        }, 8000);
        return () => clearTimeout(timer);
      }
    });
    return unsubscribe;
  }, []);

  if (!currentError) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-md w-[calc(100vw-2.5rem)] animate-in slide-in-from-bottom-5 duration-300">
      <div className="bg-white dark:bg-slate-900 border-2 border-amber-300 dark:border-amber-700/80 rounded-2xl p-4 shadow-xl flex items-start gap-3">
        <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
          <AlertCircle className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1 mb-1">
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
              {currentError.context}
            </h4>
            <button
              onClick={() => setCurrentError(null)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
            {currentError.userMessage}
          </p>

          <button
            onClick={() => {
              setCurrentError(null);
              onOpenCenter();
            }}
            className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1"
          >
            <span>Détails & journal de diagnostic</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

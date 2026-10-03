/**
 * Error logging & friendly messaging utility
 * Intercepts, records, and dispatches user-friendly notifications for seamless debugging.
 */

export interface LogEntry {
  id: string;
  timestamp: string;
  level: 'error' | 'warn' | 'info';
  context: string;
  userMessage: string;
  technicalDetails?: string;
  stack?: string;
}

type LogListener = (entry: LogEntry) => void;

class LoggerService {
  private logs: LogEntry[] = [];
  private listeners: Set<LogListener> = new Set();
  private maxLogs = 50;

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    try {
      const stored = localStorage.getItem('cap5eme_logs');
      if (stored) {
        this.logs = JSON.parse(stored);
      }
    } catch {
      // Ignore storage errors on startup
    }
  }

  private saveToStorage() {
    try {
      localStorage.setItem('cap5eme_logs', JSON.stringify(this.logs.slice(0, this.maxLogs)));
    } catch {
      // Ignore quota exceeded
    }
  }

  public subscribe(listener: LogListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  public logError(
    context: string,
    error: unknown,
    friendlyUserMessage?: string
  ): LogEntry {
    const technicalDetails =
      error instanceof Error ? error.message : typeof error === 'string' ? error : JSON.stringify(error);
    const stack = error instanceof Error ? error.stack : undefined;

    // Friendly messages tailored for French 5ème middle schoolers
    const defaultFriendly =
      "Pas d'inquiétude ! Une petite difficulté technique est survenue, mais toutes tes fiches de révision et quiz restent accessibles hors-ligne.";

    const entry: LogEntry = {
      id: `err_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
      level: 'error',
      context,
      userMessage: friendlyUserMessage || defaultFriendly,
      technicalDetails,
      stack,
    };

    console.error(`[CapRévision 5ème Error - ${context}]:`, error);

    this.logs.unshift(entry);
    if (this.logs.length > this.maxLogs) {
      this.logs.pop();
    }
    this.saveToStorage();

    // Notify UI subscribers immediately
    this.listeners.forEach((listener) => {
      try {
        listener(entry);
      } catch (err) {
        console.error('Error in log listener:', err);
      }
    });

    return entry;
  }

  public logInfo(context: string, message: string) {
    const entry: LogEntry = {
      id: `info_${Date.now()}`,
      timestamp: new Date().toLocaleTimeString('fr-FR'),
      level: 'info',
      context,
      userMessage: message,
    };
    this.logs.unshift(entry);
    this.saveToStorage();
  }

  public getLogs(): LogEntry[] {
    return [...this.logs];
  }

  public clear(): void {
    this.logs = [];
    localStorage.removeItem('cap5eme_logs');
  }

  public simulateTestError(): LogEntry {
    return this.logError(
      'Simulation de test réseau',
      new Error('ERR_CONNECTION_TIMED_OUT: Simulation de coupure réseau pour vérifier la robustesse'),
      'Test réussi ! Voici le message rassurant affiché à l\'élève en cas de pépin technique.'
    );
  }
}

export const logger = new LoggerService();

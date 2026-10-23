import React from 'react';
import { AlertCircle, CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

interface AlertProps {
  type: 'error' | 'success' | 'info' | 'warning';
  message: string;
  onClose?: () => void;
}

export const Alert: React.FC<AlertProps> = ({ type, message, onClose }) => {
  if (!message) return null;

  const styles = {
    error: {
      container: 'bg-rose-50 border-rose-200 text-rose-800',
      icon: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" aria-hidden="true" />,
    },
    success: {
      container: 'bg-emerald-50 border-emerald-200 text-emerald-800',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" aria-hidden="true" />,
    },
    info: {
      container: 'bg-indigo-50 border-indigo-200 text-indigo-800',
      icon: <Info className="w-5 h-5 text-indigo-500 shrink-0" aria-hidden="true" />,
    },
    warning: {
      container: 'bg-amber-50 border-amber-200 text-amber-800',
      icon: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" aria-hidden="true" />,
    },
  }[type];

  return (
    <div
      role="alert"
      className={`flex items-start gap-3 p-4 border rounded-xl text-sm transition-all animate-fadeIn ${styles.container}`}
    >
      {styles.icon}
      <div className="flex-1 leading-relaxed font-medium">{message}</div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-400 rounded p-0.5"
          aria-label="Dismiss alert"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

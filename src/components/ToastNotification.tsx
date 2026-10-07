import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, Info, AlertTriangle, XCircle, X } from 'lucide-react';

export const ToastNotification: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-6 right-6 z-[99999] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const getStyles = () => {
          switch (toast.type) {
            case 'success':
              return {
                bg: 'bg-slate-900 border-emerald-500/50 text-white shadow-emerald-500/10',
                icon: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              };
            case 'warning':
              return {
                bg: 'bg-slate-900 border-amber-500/50 text-white shadow-amber-500/10',
                icon: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
              };
            case 'error':
              return {
                bg: 'bg-slate-900 border-red-500/50 text-white shadow-red-500/10',
                icon: <XCircle className="w-5 h-5 text-red-400 shrink-0" />
              };
            default:
              return {
                bg: 'bg-slate-900 border-blue-500/50 text-white shadow-blue-500/10',
                icon: <Info className="w-5 h-5 text-blue-400 shrink-0" />
              };
          }
        };

        const { bg, icon } = getStyles();

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-2xl border shadow-xl backdrop-blur-xl ${bg} flex items-start gap-3 transition-all animate-modal-in`}
          >
            {icon}
            <div className="flex-1 pr-2">
              <h5 className="text-sm font-bold text-white">{toast.title}</h5>
              <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

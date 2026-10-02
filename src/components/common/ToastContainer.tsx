import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, CheckCircle2, Info } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border backdrop-blur-md transition-all duration-300 animate-in slide-in-from-bottom-3 ${
            toast.type === 'xp'
              ? 'bg-amber-500/95 text-white border-amber-400 font-medium'
              : toast.type === 'success'
              ? 'bg-emerald-600/95 text-white border-emerald-500'
              : 'bg-stone-900/95 text-stone-100 border-stone-800 dark:bg-stone-800/95'
          }`}
        >
          {toast.type === 'xp' ? (
            <Sparkles className="w-5 h-5 text-amber-200 shrink-0 animate-bounce" />
          ) : toast.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-200 shrink-0" />
          ) : (
            <Info className="w-5 h-5 text-sky-300 shrink-0" />
          )}
          <span className="text-sm leading-snug">{toast.message}</span>
        </div>
      ))}
    </div>
  );
};

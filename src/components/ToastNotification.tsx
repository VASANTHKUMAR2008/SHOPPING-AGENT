import React from 'react';
import { CheckCircle2, Info, AlertCircle, ShoppingBag, X } from 'lucide-react';
import { ToastMessage } from '../types';

export type { ToastMessage };

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success' || toast.type === 'cart';
        const isError = toast.type === 'error';
        const isInfo = toast.type === 'info';

        return (
          <div
            key={toast.id}
            className="pointer-events-auto bg-[#141414] text-white p-3.5 rounded-2xl border border-white/15 shadow-2xl flex items-start space-x-3 transition-all duration-300 animate-in slide-in-from-bottom-2 backdrop-blur-md"
          >
            <div className="shrink-0 mt-0.5">
              {toast.type === 'cart' ? (
                <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                  <ShoppingBag className="w-4 h-4" />
                </div>
              ) : isSuccess ? (
                <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              ) : isError ? (
                <div className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400">
                  <AlertCircle className="w-4 h-4" />
                </div>
              ) : (
                <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400">
                  <Info className="w-4 h-4" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-white tracking-tight">{toast.title}</h4>
              {toast.description && (
                <p className="text-[11px] text-zinc-400 mt-0.5 leading-normal">{toast.description}</p>
              )}
            </div>

            <button
              onClick={() => onDismiss(toast.id)}
              className="text-zinc-500 hover:text-white transition-colors p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

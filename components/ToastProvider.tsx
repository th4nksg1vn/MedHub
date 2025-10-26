'use client';
import React, { createContext, useContext, useMemo, useState } from 'react';

type Toast = { id: string; title?: string; description?: string; variant?: 'default' | 'success' | 'error' };

const ToastContext = createContext<{ toasts: Toast[]; push: (t: Omit<Toast, 'id'>) => void; remove: (id: string) => void } | null>(null);

export function useToasts() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToasts must be used within ToastProvider');
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const api = useMemo(() => ({
    toasts,
    push: (t: Omit<Toast, 'id'>) => {
      const id = Math.random().toString(36).slice(2, 9);
      setToasts((s) => [...s, { id, ...t }]);
      // auto remove
      setTimeout(() => setToasts((s) => s.filter((x) => x.id !== id)), 6000);
    },
    remove: (id: string) => setToasts((s) => s.filter((x) => x.id !== id)),
  }), [toasts]);

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div aria-live="polite" className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((t) => (
          <div key={t.id} className={`max-w-sm w-full p-3 rounded shadow ${t.variant === 'success' ? 'bg-green-50 border border-green-200' : t.variant === 'error' ? 'bg-red-50 border border-red-200' : 'bg-white border'}`}>
            {t.title && <div className="font-semibold">{t.title}</div>}
            {t.description && <div className="text-sm text-gray-700">{t.description}</div>}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export default ToastProvider;

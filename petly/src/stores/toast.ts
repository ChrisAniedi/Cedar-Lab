import { create } from 'zustand';

export type ToastTone = 'success' | 'info' | 'danger';
export interface Toast {
  id: number;
  message: string;
  tone: ToastTone;
  action?: { label: string; onPress: () => void };
}

interface ToastState {
  toasts: Toast[];
  show: (message: string, tone?: ToastTone, action?: Toast['action']) => void;
  dismiss: (id: number) => void;
}

let seq = 0;

/** Ephemeral UI state — intentionally not persisted. */
export const useToast = create<ToastState>()((set) => ({
  toasts: [],
  show: (message, tone = 'success', action) => {
    const id = ++seq;
    set((s) => ({ toasts: [...s.toasts.slice(-2), { id, message, tone, action }] }));
    setTimeout(() => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })), 3500);
  },
  dismiss: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));

export const toast = (message: string, tone?: ToastTone, action?: Toast['action']) => useToast.getState().show(message, tone, action);

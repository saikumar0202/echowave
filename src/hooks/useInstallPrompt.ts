import { useSyncExternalStore } from 'react';

// Chromium-only event; not in the standard DOM typings.
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>,
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>,
}

// The event can fire before any component mounts, so capture it at startup.
let deferred: BeforeInstallPromptEvent | null = null;
const listeners = new Set<() => void>();
const notify = () => listeners.forEach((listener) => listener());

if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferred = event as BeforeInstallPromptEvent;
    notify();
  });
  window.addEventListener('appinstalled', () => {
    deferred = null;
    notify();
  });
}

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

// Returns an install function when the browser offers installation, else null.
export const useInstallPrompt = (): (() => Promise<void>) | null => {
  const event = useSyncExternalStore(subscribe, () => deferred, () => null);
  if (!event) return null;
  return async () => {
    await event.prompt();
    await event.userChoice;
    deferred = null;
    notify();
  };
};

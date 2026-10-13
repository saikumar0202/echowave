import { useCallback, useRef } from 'react';

// Places on screen where the YouTube video can be shown. The single video
// dock positions itself over the highest-priority slot that's visible.
// YouTube requires the player to stay visible while it plays, so when no
// slot is visible the dock floats as a small picture-in-picture instead.
export interface VideoSlot {
  element: HTMLElement,
  priority: number,
  zIndex: number,
}

const slots = new Set<VideoSlot>();

export const isOnScreen = (element: HTMLElement) => {
  if (!element.isConnected) return false;
  const rect = element.getBoundingClientRect();
  if (rect.width < 2 || rect.height < 2) return false;
  if (rect.bottom <= 0 || rect.right <= 0 || rect.top >= window.innerHeight || rect.left >= window.innerWidth) return false;
  return getComputedStyle(element).visibility !== 'hidden';
};

export const pickVisibleSlot = (): VideoSlot | null => {
  let best: VideoSlot | null = null;
  slots.forEach((slot) => {
    if ((!best || slot.priority > best.priority) && isOnScreen(slot.element)) best = slot;
  });
  return best;
};

// Ref callback that registers the element as a video slot while mounted.
export const useVideoSlot = (priority: number, zIndex: number) => {
  const slotRef = useRef<VideoSlot | null>(null);
  return useCallback((element: HTMLElement | null) => {
    if (slotRef.current) slots.delete(slotRef.current);
    slotRef.current = element ? { element, priority, zIndex } : null;
    if (slotRef.current) slots.add(slotRef.current);
  }, [priority, zIndex]);
};

import React, { useRef } from 'react';
import './styles.scss';

interface ResizeHandleProps {
  label: string,
  // CSS variable on .app that sizes the panel (e.g. --player-w).
  cssVar: string,
  width: number,
  min: number,
  max: number,
  defaultWidth: number,
  // Room the rest of the layout needs, so the page never gets too narrow.
  reservedWidth: () => number,
  onCommit: (width: number) => void,
}

const KEY_STEP = 16;
const KEY_STEP_LARGE = 64;

// Vertical splitter on a panel's left edge. Dragging left makes the panel wider.
export const ResizeHandle = ({ label, cssVar, width, min, max, defaultWidth, reservedWidth, onCommit }: ResizeHandleProps) => {
  const drag = useRef<{ startX: number, startWidth: number, latest: number } | null>(null);

  const effectiveMax = () => Math.max(min, Math.min(max, window.innerWidth - reservedWidth()));
  const clamp = (value: number) => Math.min(Math.max(Math.round(value), min), effectiveMax());
  const preview = (value: number) => {
    // Update the CSS variable directly while dragging; commit to state on release.
    document.querySelector<HTMLElement>('.app')?.style.setProperty(cssVar, `${value}px`);
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    event.currentTarget.releasePointerCapture?.(event.pointerId);
    document.body.classList.remove('is-resizing');
    onCommit(drag.current.latest);
    drag.current = null;
  };

  return (
    <div className='resize-handle' role='separator' aria-orientation='vertical' aria-label={label}
         aria-valuenow={width} aria-valuemin={min} aria-valuemax={max} tabIndex={0}
         title='Drag to resize · double-click to reset'
         onPointerDown={(event) => {
           if (event.button !== 0) return;
           event.preventDefault();
           event.currentTarget.setPointerCapture(event.pointerId);
           drag.current = { startX: event.clientX, startWidth: width, latest: width };
           document.body.classList.add('is-resizing');
         }}
         onPointerMove={(event) => {
           if (!drag.current) return;
           const next = clamp(drag.current.startWidth + (drag.current.startX - event.clientX));
           drag.current.latest = next;
           preview(next);
         }}
         onPointerUp={endDrag}
         onPointerCancel={endDrag}
         onDoubleClick={() => onCommit(clamp(defaultWidth))}
         onKeyDown={(event) => {
           const step = event.shiftKey ? KEY_STEP_LARGE : KEY_STEP;
           const next = {
             ArrowLeft: width + step,
             ArrowRight: width - step,
             Home: min,
             End: effectiveMax(),
           }[event.key];
           if (next === undefined) return;
           event.preventDefault();
           onCommit(clamp(next));
         }} />
  );
};

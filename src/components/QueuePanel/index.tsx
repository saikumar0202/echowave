import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { clearUpcoming, jumpTo, moveInQueue, removeFromQueue } from "../../redux/reducers/PlayerReducer";
import { setQueueOpen } from "../../redux/reducers/UIReducer";
import { LAYOUT_LIMITS, setQueueHidden, setQueueWidth } from "../../redux/reducers/LayoutReducer";
import { useAppStore } from "../../redux/store";
import { ResizeHandle } from "../ResizeHandle";
import { SongList } from "../SongList";
import { StatusMessage } from "../Status";
import './styles.scss';

export const QueuePanel = () => {
  const dispatch = useAppDispatch();
  const { queue, index } = useAppSelector((state) => state.player);
  const isOpen = useAppSelector((state) => state.ui.queueOpen);
  const queueWidth = useAppSelector((state) => state.layout.queueWidth);
  const store = useAppStore();
  const current = queue.slice(index, index + 1);
  const upcoming = queue.slice(index + 1);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => event.key === 'Escape' && dispatch(setQueueOpen(false));
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, dispatch]);

  return (
    <>
      <div className={`queue-scrim ${isOpen ? 'queue-scrim--open' : ''}`} onClick={() => dispatch(setQueueOpen(false))}
           aria-hidden='true' />
      <aside className={`queue ${isOpen ? 'queue--open' : ''}`} aria-label='Queue'>
        {/* Only shown when the queue is a column (wide screens). */}
        <ResizeHandle label='Resize queue panel' cssVar='--queue-w' width={queueWidth}
                      min={LAYOUT_LIMITS.queue.min} max={LAYOUT_LIMITS.queue.max} defaultWidth={LAYOUT_LIMITS.queue.default}
                      reservedWidth={() => {
                        const { layout } = store.getState();
                        const sidebar = layout.sidebarExpanded ? LAYOUT_LIMITS.sidebarExpanded : LAYOUT_LIMITS.sidebarCollapsed;
                        return sidebar + layout.playerWidth + LAYOUT_LIMITS.mainMin;
                      }}
                      onCommit={(value) => dispatch(setQueueWidth(value))} />
        <header className='queue__header'>
          <h2 className='queue__title'>Queue</h2>
          <button className='queue__hide' onClick={() => dispatch(setQueueHidden(true))}
                  aria-label='Hide queue' title='Hide queue'>
            <i className='fa-solid fa-right-from-bracket' />
          </button>
          <button className='queue__close' onClick={() => dispatch(setQueueOpen(false))} aria-label='Close queue'>
            <i className='fa-solid fa-xmark' />
          </button>
        </header>
        {queue.length === 0 ? (
          <StatusMessage icon='fa-solid fa-list-ul' title='Your queue is empty'>
            Play a song, or add one from any song's <i className='fa-solid fa-ellipsis' aria-label='more options' /> menu.
          </StatusMessage>
        ) : (
          <>
            <h3 className='queue__label'>Now playing</h3>
            <SongList songs={current} activeIndex={0} />
            <div className='queue__label-row'>
              <h3 className='queue__label'>Up next · {upcoming.length}</h3>
              {upcoming.length > 0 && (
                <button className='queue__clear' onClick={() => dispatch(clearUpcoming())}>Clear</button>
              )}
            </div>
            {upcoming.length > 0 ? (
              <SongList songs={upcoming}
                        onPlay={(i) => dispatch(jumpTo(index + 1 + i))}
                        onRemove={(i) => dispatch(removeFromQueue(index + 1 + i))} removeLabel='Remove from queue'
                        onReorder={(from, to) => dispatch(moveInQueue({ from: index + 1 + from, to: index + 1 + to }))} />
            ) : (
              <p className='queue__hint'>When the queue ends, EchoWave keeps playing similar songs.</p>
            )}
          </>
        )}
      </aside>
    </>
  );
};

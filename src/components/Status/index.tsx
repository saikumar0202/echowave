import * as React from 'react';
import './styles.scss';

interface MessageProps {
  icon: string,
  title: string,
  children?: React.ReactNode,
  action?: React.ReactNode,
}

export const StatusMessage = ({ icon, title, children, action }: MessageProps) => (
  <div className='status-message' role='status'>
    <i className={`status-message__icon ${icon}`} aria-hidden='true' />
    <p className='status-message__title'>{title}</p>
    {children && <p className='status-message__body'>{children}</p>}
    {action}
  </div>
);

export const ApiError = ({ onRetry }: { onRetry: () => void }) => (
  <StatusMessage icon='fa-solid fa-plug-circle-xmark' title="Couldn't reach the music service"
                 action={<button className='status-message__retry' onClick={onRetry}>Try again</button>}>
    Check your internet connection, or try again in a moment.
  </StatusMessage>
);

export const SongListSkeleton = ({ rows = 6 }: { rows?: number }) => (
  <div className='skeleton-list' aria-hidden='true'>
    {Array.from({ length: rows }, (_, i) => (
      <div className='skeleton-row' key={i}>
        <span className='skeleton skeleton--art' />
        <span className='skeleton-row__text'>
          <span className='skeleton skeleton--line' />
          <span className='skeleton skeleton--line skeleton--short' />
        </span>
      </div>
    ))}
  </div>
);

export const AlbumGridSkeleton = ({ count = 6 }: { count?: number }) => (
  <div className='skeleton-grid' aria-hidden='true'>
    {Array.from({ length: count }, (_, i) => (
      <div key={i}>
        <span className='skeleton skeleton--square' />
        <span className='skeleton skeleton--line' />
        <span className='skeleton skeleton--line skeleton--short' />
      </div>
    ))}
  </div>
);

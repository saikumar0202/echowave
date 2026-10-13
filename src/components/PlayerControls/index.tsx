import React from 'react';
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { cycleRepeat, toggleShuffle } from "../../redux/reducers/PlayerReducer";
import { usePlayback } from "../../player/playback";
import { formatTime } from "../../utils/format";
import './styles.scss';

const REPEAT_LABELS = { off: 'Repeat off', all: 'Repeat all', one: 'Repeat one' };

export const ProgressBar = ({ compact = false }: { compact?: boolean }) => {
  const { currentTime, duration, seek } = usePlayback();
  const progress = duration ? Math.min((currentTime / duration) * 100, 100) : 0;
  if (compact) {
    return (
      <div className='progress-compact' aria-hidden='true'>
        <div className='progress-compact__fill' style={{ width: `${progress}%` }} />
      </div>
    );
  }
  return (
    <div className='progress'>
      <input className='range' type='range' min={0} max={duration || 0} step={0.1} value={Math.min(currentTime, duration || 0)}
             style={{ '--progress': `${progress}%` } as React.CSSProperties}
             onChange={(event) => seek(parseFloat(event.target.value))}
             aria-label='Seek' aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`} />
      <div className='progress__times'>
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

// Shuffle, previous, play/pause, next, repeat.
export const TransportControls = ({ size = 'regular' }: { size?: 'regular' | 'large' }) => {
  const dispatch = useAppDispatch();
  const { isPlaying, shuffle, repeat } = useAppSelector((state) => state.player);
  const { toggle, next, prev } = usePlayback();
  return (
    <div className={`transport transport--${size}`}>
      <button className={`transport__button ${shuffle ? 'is-active' : ''}`} onClick={() => dispatch(toggleShuffle())}
              aria-pressed={shuffle} aria-label='Shuffle' title={shuffle ? 'Shuffle on' : 'Shuffle off'}>
        <i className='fa-solid fa-shuffle' />
      </button>
      <button className='transport__button transport__skip' onClick={prev} aria-label='Previous' title='Previous (Shift+←)'>
        <i className='fa-solid fa-backward-step' />
      </button>
      <button className='transport__play' onClick={toggle} aria-label={isPlaying ? 'Pause' : 'Play'} title='Play/Pause (Space)'>
        <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'}`} />
      </button>
      <button className='transport__button transport__skip' onClick={next} aria-label='Next' title='Next (Shift+→)'>
        <i className='fa-solid fa-forward-step' />
      </button>
      <button className={`transport__button ${repeat !== 'off' ? 'is-active' : ''}`}
              onClick={() => dispatch(cycleRepeat())} aria-label={REPEAT_LABELS[repeat]} title={REPEAT_LABELS[repeat]}>
        <i className='fa-solid fa-repeat' />
        {repeat === 'one' && <span className='transport__repeat-one'>1</span>}
      </button>
    </div>
  );
};

export const VolumeControl = ({ className = '' }: { className?: string }) => {
  const { volume, muted, setVolume, toggleMute } = usePlayback();
  const level = muted ? 0 : volume;
  const icon = level === 0 ? 'fa-volume-xmark' : level < 0.5 ? 'fa-volume-low' : 'fa-volume-high';
  return (
    <div className={`volume ${className}`}>
      <button className='transport__button' onClick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'} title='Mute (M)'>
        <i className={`fa-solid ${icon}`} />
      </button>
      <input className='range' type='range' min={0} max={1} step={0.01} value={level}
             style={{ '--progress': `${level * 100}%` } as React.CSSProperties}
             onChange={(event) => setVolume(parseFloat(event.target.value))} aria-label='Volume' />
    </div>
  );
};

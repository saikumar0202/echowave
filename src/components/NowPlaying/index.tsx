import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { cycleRepeat, selectCurrentSong, toggleShuffle } from "../../redux/reducers/PlayerReducer";
import { setNowPlayingOpen, setQueueOpen, toggleLyrics } from "../../redux/reducers/UIReducer";
import { usePlayback } from "../../player/PlayerProvider";
import { artistNames, decodeEntities, formatTime, pickImage } from "../../utils/format";
import { LikeButton } from "../LikeButton";
import { ArtistLinks } from "../ArtistCard";
import { LyricsPanel } from "../Lyrics";
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

export const NowPlaying = () => {
  const dispatch = useAppDispatch();
  const song = useAppSelector(selectCurrentSong);
  const { isPlaying, shuffle, repeat } = useAppSelector((state) => state.player);
  const isOpen = useAppSelector((state) => state.ui.nowPlayingOpen);
  const lyricsOpen = useAppSelector((state) => state.ui.lyricsOpen);
  const { toggle, next, prev, volume, muted, setVolume, toggleMute } = usePlayback();

  // Close the phone sheet with Escape / the hardware back gesture feel.
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => event.key === 'Escape' && dispatch(setNowPlayingOpen(false));
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, dispatch]);

  if (!song) {
    return (
      <aside className='now-playing now-playing--empty' aria-label='Now playing'>
        <i className='fa-solid fa-music' aria-hidden='true' />
        <p>Pick a song to start listening</p>
      </aside>
    );
  }

  const name = decodeEntities(song.name);
  const artists = artistNames(song.artists);
  const art = pickImage(song.image, 'large');
  const volumeIcon = muted || volume === 0 ? 'fa-volume-xmark' : volume < 0.5 ? 'fa-volume-low' : 'fa-volume-high';

  return (
    <aside className={`now-playing ${isOpen ? 'now-playing--open' : ''}`} aria-label='Now playing'>
      <div className='now-playing__backdrop' style={{ backgroundImage: `url(${art})` }} aria-hidden='true' />
      <header className='now-playing__header'>
        <button className='now-playing__icon-button now-playing__close' onClick={() => dispatch(setNowPlayingOpen(false))}
                aria-label='Close now playing'>
          <i className='fa-solid fa-chevron-down' />
        </button>
        <div className='now-playing__heading'>
          <span className='now-playing__eyebrow'>Now playing</span>
          <span className='now-playing__album' title={decodeEntities(song.album?.name)}>{decodeEntities(song.album?.name)}</span>
        </div>
        <button className={`now-playing__icon-button ${lyricsOpen ? 'is-active' : ''}`} onClick={() => dispatch(toggleLyrics())}
                aria-pressed={lyricsOpen} aria-label='Lyrics' title='Lyrics'>
          <i className='fa-solid fa-microphone-lines' />
        </button>
        <button className='now-playing__icon-button now-playing__queue-toggle' onClick={() => dispatch(setQueueOpen(true))}
                aria-label='Show queue' title='Queue'>
          <i className='fa-solid fa-list-ul' />
        </button>
      </header>

      {lyricsOpen ? <LyricsPanel song={song} /> : (
        <div className='now-playing__art'>
          <img src={art} alt={`${name} cover art`} />
        </div>
      )}

      <div className='now-playing__info'>
        <div className='now-playing__titles'>
          <h2 className='now-playing__title' title={name}>{name}</h2>
          <p className='now-playing__artists' title={artists}><ArtistLinks artists={song.artists} /></p>
        </div>
        <LikeButton song={song} className='now-playing__like' />
      </div>

      <ProgressBar />

      <div className='now-playing__controls'>
        <button className={`now-playing__icon-button ${shuffle ? 'is-active' : ''}`} onClick={() => dispatch(toggleShuffle())}
                aria-pressed={shuffle} aria-label='Shuffle' title={shuffle ? 'Shuffle on' : 'Shuffle off'}>
          <i className='fa-solid fa-shuffle' />
        </button>
        <button className='now-playing__icon-button now-playing__skip' onClick={prev} aria-label='Previous' title='Previous (Shift+←)'>
          <i className='fa-solid fa-backward-step' />
        </button>
        <button className='now-playing__play' onClick={toggle} aria-label={isPlaying ? 'Pause' : 'Play'} title='Play/Pause (Space)'>
          <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'}`} />
        </button>
        <button className='now-playing__icon-button now-playing__skip' onClick={next} aria-label='Next' title='Next (Shift+→)'>
          <i className='fa-solid fa-forward-step' />
        </button>
        <button className={`now-playing__icon-button now-playing__repeat ${repeat !== 'off' ? 'is-active' : ''}`}
                onClick={() => dispatch(cycleRepeat())} aria-label={REPEAT_LABELS[repeat]} title={REPEAT_LABELS[repeat]}>
          <i className='fa-solid fa-repeat' />
          {repeat === 'one' && <span className='now-playing__repeat-one'>1</span>}
        </button>
      </div>

      <div className='now-playing__volume'>
        <button className='now-playing__icon-button' onClick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'} title='Mute (M)'>
          <i className={`fa-solid ${volumeIcon}`} />
        </button>
        <input className='range' type='range' min={0} max={1} step={0.01} value={muted ? 0 : volume}
               style={{ '--progress': `${(muted ? 0 : volume) * 100}%` } as React.CSSProperties}
               onChange={(event) => setVolume(parseFloat(event.target.value))} aria-label='Volume' />
      </div>
    </aside>
  );
};

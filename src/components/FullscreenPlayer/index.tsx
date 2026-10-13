import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { jumpTo, selectCurrentSong } from "../../redux/reducers/PlayerReducer";
import { loadLyrics } from "../../redux/reducers/LyricsReducer";
import { exitFullscreen } from "../../player/fullscreen";
import { decodeEntities } from "../../utils/format";
import { ArtistLinks } from "../ArtistCard";
import { LikeButton } from "../LikeButton";
import { LyricsPanel } from "../Lyrics";
import { SongList } from "../SongList";
import { ProgressBar, TransportControls, VolumeControl } from "../PlayerControls";
import './styles.scss';
import { Artwork } from "../Artwork";
import { useArtworkUrl } from "../../hooks/useArtworkUrl";

// Hide secondary chrome and the cursor after this long without input.
const IDLE_MS = 3000;
const UP_NEXT_LIMIT = 25;

type Panel = 'lyrics' | 'queue';

export const FullscreenPlayer = () => {
  const dispatch = useAppDispatch();
  const song = useAppSelector(selectCurrentSong);
  const { queue, index, isPlaying } = useAppSelector((state) => state.player);
  const lyrics = useAppSelector((state) => state.lyrics);
  // null = automatic: lyrics when the song has them, otherwise up next.
  const [chosenPanel, setPanel] = useState<Panel | null>(null);
  const [idle, setIdle] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const upcoming = queue.slice(index + 1, index + 1 + UP_NEXT_LIMIT);
  const backdrop = useArtworkUrl(song?.image, 'large');
  const hasLyrics = lyrics.songId === song?.id && Boolean(lyrics.lyrics?.synced?.length || lyrics.lyrics?.plain);
  const panel: Panel = chosenPanel ?? (hasLyrics ? 'lyrics' : 'queue');

  useEffect(() => {
    if (song) dispatch(loadLyrics(song));
  }, [song, dispatch]);

  // Leaving browser full screen (Esc, F11, system gesture) closes the view too.
  useEffect(() => {
    const onChange = () => {
      if (!document.fullscreenElement) exitFullscreen(dispatch);
    };
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, [dispatch]);

  // Escape also works when the browser refused real full screen.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => event.key === 'Escape' && exitFullscreen(dispatch);
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [dispatch]);

  useEffect(() => {
    let timer = window.setTimeout(() => setIdle(true), IDLE_MS);
    const wake = () => {
      setIdle(false);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setIdle(true), IDLE_MS);
    };
    const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'wheel'] as const;
    events.forEach((name) => window.addEventListener(name, wake, { passive: true }));
    return () => {
      window.clearTimeout(timer);
      events.forEach((name) => window.removeEventListener(name, wake));
    };
  }, []);

  // Focus the stage on open; on close (including navigating away via an
  // artist link) make sure the browser leaves full screen as well.
  useEffect(() => {
    rootRef.current?.focus();
    return () => {
      if (document.fullscreenElement) document.exitFullscreen?.().catch(() => undefined);
    };
  }, []);

  if (!song) return null;
  const name = decodeEntities(song.name);
  const nextSong = queue[index + 1];

  return (
    <div className={`stage ${idle ? 'is-idle' : ''} ${isPlaying ? 'is-playing' : ''}`} ref={rootRef} tabIndex={-1}
         role='dialog' aria-modal='true' aria-label={`Full screen player: ${name}`}>
      <div className='stage__backdrop' style={{ backgroundImage: `url(${backdrop})` }} aria-hidden='true' />

      <header className='stage__header'>
        <span className='stage__brand'><i className='fa-solid fa-wave-square' aria-hidden='true' /> EchoWave</span>
        <div className='stage__tabs' role='tablist' aria-label='Side panel'>
          <button role='tab' aria-selected={panel === 'lyrics'} className={panel === 'lyrics' ? 'is-active' : ''}
                  onClick={() => setPanel('lyrics')}>
            <i className='fa-solid fa-microphone-lines' /> Lyrics
          </button>
          <button role='tab' aria-selected={panel === 'queue'} className={panel === 'queue' ? 'is-active' : ''}
                  onClick={() => setPanel('queue')}>
            <i className='fa-solid fa-list-ul' /> Up next
          </button>
        </div>
        <button className='stage__icon' onClick={() => exitFullscreen(dispatch)} aria-label='Exit full screen' title='Exit full screen (Esc)'>
          <i className='fa-solid fa-compress' />
        </button>
      </header>

      <main className='stage__body'>
        <section className='stage__now'>
          <div className='stage__record-wrap'>
            <div className='stage__record' aria-hidden='true'>
              <Artwork className='stage__label' images={song.image} size='small' />
            </div>
            <Artwork className='stage__cover' images={song.image} size='large' alt={`${name} cover art`} />
          </div>
          <div className='stage__meta'>
            <div className='stage__titles'>
              <h2 className='stage__title' title={name}>{name}</h2>
              <p className='stage__artists'><ArtistLinks artists={song.artists} /></p>
            </div>
            <LikeButton song={song} className='stage__like' />
          </div>
        </section>

        <aside className='stage__panel' role='tabpanel'>
          {panel === 'lyrics' ? <LyricsPanel song={song} /> : upcoming.length > 0 ? (
            <SongList songs={upcoming} onPlay={(i) => dispatch(jumpTo(index + 1 + i))} />
          ) : (
            <p className='stage__empty'>Nothing queued. EchoWave will keep playing similar songs.</p>
          )}
        </aside>
      </main>

      <footer className='stage__footer'>
        <ProgressBar />
        <div className='stage__controls'>
          <div className='stage__next'>
            {nextSong && (
              <>
                <span className='stage__next-label'>Next</span>
                <span className='stage__next-name'>{decodeEntities(nextSong.name)}</span>
              </>
            )}
          </div>
          <TransportControls size='large' />
          <VolumeControl className='stage__volume' />
        </div>
      </footer>
    </div>
  );
};

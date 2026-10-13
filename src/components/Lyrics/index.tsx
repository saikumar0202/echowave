import React, { useEffect, useRef } from 'react';
import { Song } from "../../Services/interfaces";
import { activeLineIndex, LyricLine } from "../../Services/lyrics";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { loadLyrics } from "../../redux/reducers/LyricsReducer";
import { usePlayback } from "../../player/playback";
import './styles.scss';

// After the user scrolls, stop following the song for a moment.
const MANUAL_SCROLL_PAUSE_MS = 3000;

const SyncedLyrics = ({ lines }: { lines: LyricLine[] }) => {
  const { currentTime, seek } = usePlayback();
  const containerRef = useRef<HTMLOListElement>(null);
  const manualUntilRef = useRef(0);
  const active = activeLineIndex(lines, currentTime);

  useEffect(() => {
    const container = containerRef.current;
    const line = container?.children[active] as HTMLElement | undefined;
    if (!container || !line || Date.now() < manualUntilRef.current) return;
    // Scroll only this box (scrollIntoView would also scroll the page).
    container.scrollTo({
      top: line.offsetTop - container.clientHeight / 2 + line.offsetHeight / 2,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
  }, [active]);

  const pauseFollowing = () => {
    manualUntilRef.current = Date.now() + MANUAL_SCROLL_PAUSE_MS;
  };

  return (
    <ol className='lyrics__lines' ref={containerRef} onWheel={pauseFollowing} onTouchMove={pauseFollowing}>
      {lines.map((line, index) => (
        <li key={`${line.time}-${index}`}>
          <button className={`lyrics__line ${index === active ? 'is-active' : ''} ${index < active ? 'is-past' : ''}`}
                  aria-current={index === active ? 'true' : undefined}
                  onClick={() => {
                    manualUntilRef.current = 0;
                    seek(line.time);
                  }}>
            {line.text || '♪'}
          </button>
        </li>
      ))}
    </ol>
  );
};

export const LyricsPanel = ({ song }: { song: Song }) => {
  const dispatch = useAppDispatch();
  const { songId, lyrics, status } = useAppSelector((state) => state.lyrics);
  const isCurrent = songId === song.id;

  useEffect(() => {
    dispatch(loadLyrics(song));
  }, [song, dispatch]);

  let body: React.ReactNode;
  if (!isCurrent || status === 'loading') {
    body = <p className='lyrics__message'>Loading lyrics…</p>;
  } else if (status === 'error') {
    body = (
      <p className='lyrics__message'>
        Couldn't load lyrics.{' '}
        <button className='text-button' onClick={() => dispatch(loadLyrics(song))}>Try again</button>
      </p>
    );
  } else if (lyrics?.synced?.length) {
    body = <SyncedLyrics lines={lyrics.synced} />;
  } else if (lyrics?.plain) {
    body = <p className='lyrics__plain'>{lyrics.plain}</p>;
  } else if (lyrics?.instrumental) {
    body = <p className='lyrics__message'>♪ Instrumental ♪</p>;
  } else {
    body = <p className='lyrics__message'>No lyrics found for this song.</p>;
  }

  return (
    <section className='lyrics' aria-label='Lyrics'>
      {body}
      <p className='lyrics__credit'>Lyrics from <a href='https://lrclib.net' target='_blank' rel='noreferrer'>LRCLIB</a></p>
    </section>
  );
};

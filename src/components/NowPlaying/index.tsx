import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { selectCurrentSong } from "../../redux/reducers/PlayerReducer";
import { setNowPlayingOpen, setQueueOpen, toggleLyrics } from "../../redux/reducers/UIReducer";
import { enterFullscreen } from "../../player/fullscreen";
import { artistNames, decodeEntities } from "../../utils/format";
import { LikeButton } from "../LikeButton";
import { ArtistLinks } from "../ArtistCard";
import { LyricsPanel } from "../Lyrics";
import { ProgressBar, TransportControls, VolumeControl } from "../PlayerControls";
import './styles.scss';
import { Artwork } from "../Artwork";
import { useArtworkUrl } from "../../hooks/useArtworkUrl";
import { Song } from "../../Services/interfaces";
import { useVideoSlot } from "../../player/videoSlots";
import { ResizeHandle } from "../ResizeHandle";
import { LAYOUT_LIMITS, setPlayerWidth } from "../../redux/reducers/LayoutReducer";
import { useAppStore } from "../../redux/store";

const NowPlayingBackdrop = ({ song }: { song: Song }) => {
  const art = useArtworkUrl(song.image, 'large');
  return <div className='now-playing__backdrop' style={{ backgroundImage: `url(${art})` }} aria-hidden='true' />;
};

// Where the YouTube video shows in this panel (the dock sits on top of it).
// Above the bottom nav and mini player; below drawers and menus.
const VideoSlot = ({ compact = false }: { compact?: boolean }) => {
  const slotRef = useVideoSlot(2, 41);
  return <div className={`now-playing__video ${compact ? 'now-playing__video--compact' : ''}`} ref={slotRef} />;
};

// Drag handle on the panel's left edge (desktop).
const PlayerResizeHandle = () => {
  const dispatch = useAppDispatch();
  const store = useAppStore();
  const width = useAppSelector((state) => state.layout.playerWidth);
  return (
    <ResizeHandle label='Resize player panel' cssVar='--player-w' width={width}
                  min={LAYOUT_LIMITS.player.min} max={LAYOUT_LIMITS.player.max} defaultWidth={LAYOUT_LIMITS.player.default}
                  reservedWidth={() => {
                    const { layout } = store.getState();
                    const queueColumn = window.innerWidth >= 1280 && !layout.queueHidden ? layout.queueWidth : 0;
                    const sidebar = layout.sidebarExpanded ? LAYOUT_LIMITS.sidebarExpanded : LAYOUT_LIMITS.sidebarCollapsed;
                    return sidebar + queueColumn + LAYOUT_LIMITS.mainMin;
                  }}
                  onCommit={(value) => dispatch(setPlayerWidth(value))} />
  );
};

export const NowPlaying = () => {
  const dispatch = useAppDispatch();
  const song = useAppSelector(selectCurrentSong);
  const isOpen = useAppSelector((state) => state.ui.nowPlayingOpen);
  const lyricsOpen = useAppSelector((state) => state.ui.lyricsOpen);

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
        <PlayerResizeHandle />
        <i className='fa-solid fa-music' aria-hidden='true' />
        <p>Pick a song to start listening</p>
      </aside>
    );
  }

  const name = decodeEntities(song.name);
  const artists = artistNames(song.artists);

  return (
    <aside className={`now-playing ${isOpen ? 'now-playing--open' : ''}`} aria-label='Now playing'>
      <NowPlayingBackdrop song={song} />
      <PlayerResizeHandle />
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
        <button className='now-playing__icon-button now-playing__expand' onClick={() => enterFullscreen(dispatch)}
                aria-label='Full screen' title='Full screen (F)'>
          <i className='fa-solid fa-expand' />
        </button>
      </header>

      {song.source === 'youtube' && <VideoSlot compact={lyricsOpen} />}
      {lyricsOpen ? <LyricsPanel song={song} /> : song.source !== 'youtube' && (
        <div className='now-playing__art'>
          <Artwork images={song.image} size='large' alt={`${name} cover art`} />
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

      <TransportControls />
      <VolumeControl className='now-playing__volume' />
    </aside>
  );
};

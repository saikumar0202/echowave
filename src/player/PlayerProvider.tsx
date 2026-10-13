import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useStore } from "react-redux";
import { AppStore, useAppDispatch, useAppSelector } from "../redux/store";
import { playNext, previous, selectCurrentSong, setPlaying, togglePlaying } from "../redux/reducers/PlayerReducer";
import { loadSuggestions } from "../redux/reducers/CatalogReducer";
import { showToast } from "../redux/reducers/UIReducer";
import { enterFullscreen, exitFullscreen } from "./fullscreen";
import { artistNames, decodeEntities, pickAudio } from "../utils/format";
import { PlaybackContext, PlaybackContextValue } from "./playback";
import { getYouTubePlayer, preloadYouTubePlayer, setYouTubeEvents, YT_STATE } from "./youtubePlayer";

const VOLUME_STORAGE_KEY = 'echowave:volume';
// Pressing "previous" this far into a song restarts it instead.
const RESTART_THRESHOLD_SECONDS = 3;
// How often to read the position from the YouTube player (it has no timeupdate event).
const YOUTUBE_POLL_MS = 250;
// Mobile browsers may block autoplay inside the YouTube frame; if the video
// hasn't started by then, show it as paused so one tap starts it.
const YOUTUBE_AUTOPLAY_GRACE_MS = 2500;

type YouTubePlayer = Awaited<ReturnType<typeof getYouTubePlayer>>;

const readStoredVolume = (): number => {
  try {
    const stored = parseFloat(localStorage.getItem(VOLUME_STORAGE_KEY) ?? '');
    return Number.isFinite(stored) ? Math.min(Math.max(stored, 0), 1) : 1;
  } catch {
    return 1;
  }
};

const isTypingTarget = (target: EventTarget | null) =>
  target instanceof HTMLElement && (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName));

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const song = useAppSelector(selectCurrentSong);
  const { isPlaying, repeat } = useAppSelector((state) => state.player);
  const isYouTube = song?.source === 'youtube';
  const queueHasYouTube = useAppSelector((state) => state.player.queue.some((item) => item.source === 'youtube'));

  const store = useStore() as AppStore;
  const audioRef = useRef<HTMLAudioElement>(null);
  // True between assigning a new src and it becoming playable; the browser
  // may fire a "pause" event in that window which isn't a user pause.
  const switchingSrcRef = useRef(false);
  const youtubeRef = useRef<YouTubePlayer | null>(null);
  // Same idea for YouTube: ignore pause events while a new video loads.
  const switchingVideoRef = useRef(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(readStoredVolume);
  const [muted, setMuted] = useState(false);

  // Load a new source only when the song itself changes, so pausing and
  // resuming continues from the same position.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !song) return;
    setCurrentTime(0);
    setDuration(song.duration || 0);
    dispatch(loadSuggestions(song));

    if (song.source === 'youtube' && song.videoId) {
      if (audio.getAttribute('src')) {
        audio.pause();
        audio.removeAttribute('src');
        audio.load();
      }
      switchingVideoRef.current = true;
      let graceTimer = 0;
      getYouTubePlayer().then((player) => {
        youtubeRef.current = player;
        // The song may have changed while the player was loading.
        if (selectCurrentSong(store.getState())?.id !== song.id) return;
        player.setVolume(Math.round(volumeRef.current * 100));
        if (mutedRef.current) player.mute(); else player.unMute();
        if (store.getState().player.isPlaying) {
          player.loadVideoById(song.videoId!);
          graceTimer = window.setTimeout(() => {
            const state = player.getPlayerState();
            if (state !== YT_STATE.PLAYING && state !== YT_STATE.BUFFERING) {
              switchingVideoRef.current = false;
              dispatch(setPlaying(false));
            }
          }, YOUTUBE_AUTOPLAY_GRACE_MS);
        } else {
          player.cueVideoById(song.videoId!);
        }
      }).catch(() => {
        dispatch(showToast("Couldn't load the YouTube player"));
        dispatch(setPlaying(false));
      });
      return () => window.clearTimeout(graceTimer);
    }

    youtubeRef.current?.stopVideo();
    const src = pickAudio(song.downloadUrl);
    if (!src) return;
    switchingSrcRef.current = true;
    audio.src = src;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [song?.id, dispatch]);

  useEffect(() => {
    if (isYouTube) {
      const player = youtubeRef.current;
      if (!player) return;
      if (isPlaying) player.playVideo(); else player.pauseVideo();
      return;
    }
    const audio = audioRef.current;
    if (!audio || !audio.src) return;
    if (isPlaying) {
      audio.play().catch((error: DOMException) => {
        // Autoplay was blocked (no user gesture yet). Other failures, like a
        // broken stream, are handled by the audio element's error event.
        if (error.name === 'NotAllowedError') dispatch(setPlaying(false));
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, isYouTube, song?.id, dispatch]);

  // The YouTube player has no time events, so poll it while a video is current.
  useEffect(() => {
    if (!isYouTube) return;
    const timer = window.setInterval(() => {
      const player = youtubeRef.current;
      if (!player) return;
      const time = player.getCurrentTime?.();
      if (Number.isFinite(time)) setCurrentTime(time);
      const length = player.getDuration?.();
      if (length > 0) setDuration(length);
    }, YOUTUBE_POLL_MS);
    return () => window.clearInterval(timer);
  }, [isYouTube, song?.id]);

  useEffect(() => {
    if (queueHasYouTube) preloadYouTubePlayer();
  }, [queueHasYouTube]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.loop = repeat === 'one';
  }, [repeat]);

  const volumeRef = useRef(volume);
  const mutedRef = useRef(muted);
  useEffect(() => {
    volumeRef.current = volume;
    mutedRef.current = muted;
    const player = youtubeRef.current;
    if (player) {
      player.setVolume(Math.round(volume * 100));
      if (muted) player.mute(); else player.unMute();
    }
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    audio.muted = muted;
    try {
      localStorage.setItem(VOLUME_STORAGE_KEY, String(volume));
    } catch {
      // Ignore unavailable storage.
    }
  }, [volume, muted]);

  const toggle = useCallback(() => dispatch(togglePlaying()), [dispatch]);
  const next = useCallback(() => dispatch(playNext()), [dispatch]);
  const currentIsYouTube = useCallback(() => selectCurrentSong(store.getState())?.source === 'youtube', [store]);
  const seek = useCallback((time: number) => {
    if (!Number.isFinite(time)) return;
    if (currentIsYouTube()) {
      youtubeRef.current?.seekTo(time, true);
    } else {
      const audio = audioRef.current;
      if (!audio) return;
      audio.currentTime = time;
    }
    setCurrentTime(time);
  }, [currentIsYouTube]);
  const prev = useCallback(() => {
    const position = currentIsYouTube() ? youtubeRef.current?.getCurrentTime() ?? 0 : audioRef.current?.currentTime ?? 0;
    if (position > RESTART_THRESHOLD_SECONDS) {
      seek(0);
    } else {
      dispatch(previous());
    }
  }, [dispatch, seek, currentIsYouTube]);
  const setVolume = useCallback((value: number) => {
    setVolumeState(value);
    if (value > 0) setMuted(false);
  }, []);
  const toggleMute = useCallback(() => setMuted((value) => !value), []);

  const handleEnded = useCallback(() => {
    const endedId = selectCurrentSong(store.getState())?.id;
    dispatch(playNext());
    const state = store.getState();
    // Same song again (e.g. repeat-all with a single song): the source won't
    // change, so restart it by hand.
    if (!state.player.isPlaying || selectCurrentSong(state)?.id !== endedId) return;
    if (currentIsYouTube()) {
      youtubeRef.current?.seekTo(0, true);
      youtubeRef.current?.playVideo();
      return;
    }
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => dispatch(setPlaying(false)));
    }
  }, [dispatch, store, currentIsYouTube]);

  // YouTube player events. They're ignored unless a YouTube song is current,
  // since stopping a video (when switching to Audius) fires them too.
  useEffect(() => {
    setYouTubeEvents({
      onStateChange: (playerState) => {
        const state = store.getState();
        if (selectCurrentSong(state)?.source !== 'youtube') return;
        if (playerState === YT_STATE.PLAYING) {
          switchingVideoRef.current = false;
          if (!state.player.isPlaying) dispatch(setPlaying(true));
        } else if (playerState === YT_STATE.CUED) {
          switchingVideoRef.current = false;
        } else if (playerState === YT_STATE.PAUSED) {
          if (state.player.isPlaying && !switchingVideoRef.current) dispatch(setPlaying(false));
        } else if (playerState === YT_STATE.ENDED) {
          if (state.player.repeat === 'one') {
            youtubeRef.current?.seekTo(0, true);
            youtubeRef.current?.playVideo();
          } else {
            handleEnded();
          }
        }
      },
      onError: () => {
        const failed = selectCurrentSong(store.getState());
        if (failed?.source !== 'youtube') return;
        switchingVideoRef.current = false;
        dispatch(showToast(`“${decodeEntities(failed.name)}” can't be played here, skipping`));
        if (store.getState().player.isPlaying) dispatch(playNext());
      },
    });
  }, [dispatch, store, handleEnded]);

  const handleError = useCallback(() => {
    switchingSrcRef.current = false;
    const failed = selectCurrentSong(store.getState());
    if (!failed || !audioRef.current?.src) return;
    dispatch(showToast(`Couldn't play “${decodeEntities(failed.name)}”, skipping`));
    if (store.getState().player.isPlaying) dispatch(playNext());
  }, [dispatch, store]);

  // Lock screen / headphone / notification controls on phones and desktops.
  useEffect(() => {
    if (!('mediaSession' in navigator) || !song) return;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: decodeEntities(song.name),
      artist: artistNames(song.artists),
      album: decodeEntities(song.album?.name),
      artwork: song.image.map((image) => ({ src: image.url, sizes: image.quality, type: 'image/jpeg' })),
    });
  }, [song]);

  useEffect(() => {
    if (!('mediaSession' in navigator)) return;
    const handlers: [MediaSessionAction, MediaSessionActionHandler][] = [
      ['play', () => dispatch(setPlaying(true))],
      ['pause', () => dispatch(setPlaying(false))],
      ['nexttrack', next],
      ['previoustrack', prev],
      ['seekto', (details) => details.seekTime != null && seek(details.seekTime)],
    ];
    handlers.forEach(([action, handler]) => {
      try {
        navigator.mediaSession.setActionHandler(action, handler);
      } catch {
        // Some browsers don't support every action.
      }
    });
    return () => handlers.forEach(([action]) => {
      try {
        navigator.mediaSession.setActionHandler(action, null);
      } catch {
        // Ignore.
      }
    });
  }, [dispatch, next, prev, seek]);

  useEffect(() => {
    document.title = song && isPlaying
      ? `${decodeEntities(song.name)} · ${artistNames(song.artists)} — EchoWave`
      : 'EchoWave';
  }, [song, isPlaying]);

  // Space: play/pause, Shift+←/→: previous/next, M: mute, F: full screen.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (isTypingTarget(event.target) || event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.code === 'Space' && !(event.target instanceof HTMLButtonElement)) {
        event.preventDefault();
        toggle();
      } else if (event.shiftKey && event.key === 'ArrowRight') {
        next();
      } else if (event.shiftKey && event.key === 'ArrowLeft') {
        prev();
      } else if (event.key === 'm' || event.key === 'M') {
        toggleMute();
      } else if ((event.key === 'f' || event.key === 'F') && window.matchMedia('(min-width: 900px)').matches) {
        // Full screen is a desktop feature; phones already get a full-screen sheet.
        if (store.getState().ui.fullscreenOpen) exitFullscreen(dispatch);
        else if (selectCurrentSong(store.getState())) enterFullscreen(dispatch);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [toggle, next, prev, toggleMute, dispatch, store]);

  const value = useMemo<PlaybackContextValue>(() => ({
    currentTime, duration, volume, muted, toggle, seek, setVolume, toggleMute, next, prev,
  }), [currentTime, duration, volume, muted, toggle, seek, setVolume, toggleMute, next, prev]);

  return (
    <PlaybackContext.Provider value={value}>
      <audio
        ref={audioRef}
        preload="auto"
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onDurationChange={(event) => {
          const { duration: audioDuration } = event.currentTarget;
          if (Number.isFinite(audioDuration)) setDuration(audioDuration);
        }}
        onPlay={() => !isPlaying && !currentIsYouTube() && dispatch(setPlaying(true))}
        onCanPlay={() => { switchingSrcRef.current = false; }}
        onError={handleError}
        onPause={(event) => {
          // Pausing the audio element to hand over to YouTube isn't a user pause.
          if (isPlaying && !switchingSrcRef.current && !event.currentTarget.ended && !currentIsYouTube()) {
            dispatch(setPlaying(false));
          }
        }}
        onEnded={handleEnded}
      />
      {children}
    </PlaybackContext.Provider>
  );
};

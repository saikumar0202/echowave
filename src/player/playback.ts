import { createContext, useContext } from 'react';

export interface PlaybackContextValue {
  currentTime: number,
  duration: number,
  volume: number,
  muted: boolean,
  toggle: () => void,
  seek: (time: number) => void,
  setVolume: (volume: number) => void,
  toggleMute: () => void,
  next: () => void,
  prev: () => void,
}

export const PlaybackContext = createContext<PlaybackContextValue | null>(null);

export const usePlayback = (): PlaybackContextValue => {
  const value = useContext(PlaybackContext);
  if (!value) throw new Error('usePlayback must be used inside <PlayerProvider>');
  return value;
};

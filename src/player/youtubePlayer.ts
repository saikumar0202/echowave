// Thin wrapper around the official YouTube IFrame Player API. One player is
// created and reused, so moving it between slots (panel, stage, phone
// mini view) never reloads the video.

// Minimal typings for the parts of the IFrame API we use.
interface YTPlayer {
  loadVideoById(videoId: string, startSeconds?: number): void,
  cueVideoById(videoId: string, startSeconds?: number): void,
  playVideo(): void,
  pauseVideo(): void,
  stopVideo(): void,
  seekTo(seconds: number, allowSeekAhead: boolean): void,
  getCurrentTime(): number,
  getDuration(): number,
  setVolume(volume: number): void,
  mute(): void,
  unMute(): void,
  getPlayerState(): number,
}

interface YTNamespace {
  Player: new (element: HTMLElement | string, options: Record<string, unknown>) => YTPlayer,
}

declare global {
  interface Window {
    YT?: YTNamespace,
    onYouTubeIframeAPIReady?: () => void,
  }
}

export const YT_STATE = { ENDED: 0, PLAYING: 1, PAUSED: 2, BUFFERING: 3, CUED: 5 } as const;

export const PLAYER_HOST_ID = 'echowave-youtube-player';

export interface YouTubeEvents {
  onStateChange: (state: number) => void,
  onError: (code: number) => void,
}

let apiPromise: Promise<YTNamespace> | null = null;

const loadApi = (): Promise<YTNamespace> => {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (!apiPromise) {
    apiPromise = new Promise((resolve, reject) => {
      const previous = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        previous?.();
        if (window.YT) resolve(window.YT);
      };
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      script.onerror = () => {
        apiPromise = null;
        reject(new Error('The YouTube player could not be loaded'));
      };
      document.head.appendChild(script);
    });
  }
  return apiPromise;
};

let playerPromise: Promise<YTPlayer> | null = null;
let events: YouTubeEvents | null = null;

// Event handlers can change between renders; the player always calls the latest.
export const setYouTubeEvents = (handlers: YouTubeEvents) => {
  events = handlers;
};

export const getYouTubePlayer = (): Promise<YTPlayer> => {
  if (!playerPromise) {
    playerPromise = loadApi().then((YT) => new Promise<YTPlayer>((resolve, reject) => {
      const host = document.getElementById(PLAYER_HOST_ID);
      if (!host) {
        reject(new Error('Video dock is missing'));
        return;
      }
      const player = new YT.Player(host, {
        width: '100%',
        height: '100%',
        playerVars: {
          playsinline: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          rel: 0,
          iv_load_policy: 3,
          origin: window.location.origin,
        },
        events: {
          onReady: () => resolve(player),
          onStateChange: (event: { data: number }) => events?.onStateChange(event.data),
          onError: (event: { data: number }) => events?.onError(event.data),
        },
      });
    })).catch((error) => {
      playerPromise = null;
      throw error;
    });
  }
  return playerPromise;
};

// Starts loading the player API ahead of time (e.g. when YouTube songs show up),
// so the first play happens closer to the user's click.
export const preloadYouTubePlayer = () => {
  getYouTubePlayer().catch(() => undefined);
};

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Song } from "../../Services/interfaces";
import type { AppThunk, RootState } from "../store";

export type RepeatMode = 'off' | 'all' | 'one';

export interface PlayerState {
  queue: Song[],
  // The queue's order before shuffling, so turning shuffle off restores it.
  originalQueue: Song[] | null,
  index: number,
  isPlaying: boolean,
  shuffle: boolean,
  repeat: RepeatMode,
}

const initialState: PlayerState = {
  queue: [],
  originalQueue: null,
  index: 0,
  isPlaying: false,
  shuffle: false,
  repeat: 'off',
};

const REPEAT_ORDER: RepeatMode[] = ['off', 'all', 'one'];

export const shuffleArray = <T>(items: T[]): T[] => {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setQueue: (state, action: PayloadAction<{ queue: Song[], index: number, originalQueue?: Song[] | null, play?: boolean }>) => {
      const { queue, index, originalQueue = null, play = true } = action.payload;
      state.queue = queue;
      state.index = Math.min(Math.max(index, 0), Math.max(queue.length - 1, 0));
      state.originalQueue = originalQueue;
      state.isPlaying = play && queue.length > 0;
    },
    appendToQueue: (state, action: PayloadAction<Song[]>) => {
      state.queue.push(...action.payload);
      state.originalQueue?.push(...action.payload);
    },
    addToQueue: (state, action: PayloadAction<Song>) => {
      if (state.queue.length === 0) {
        state.queue = [action.payload];
        state.index = 0;
        return;
      }
      state.queue.push(action.payload);
      state.originalQueue?.push(action.payload);
    },
    removeFromQueue: (state, action: PayloadAction<number>) => {
      const removeAt = action.payload;
      if (removeAt === state.index || removeAt < 0 || removeAt >= state.queue.length) return;
      const [removed] = state.queue.splice(removeAt, 1);
      if (removeAt < state.index) state.index -= 1;
      if (state.originalQueue) {
        const originalIndex = state.originalQueue.findIndex((song) => song.id === removed.id);
        if (originalIndex >= 0) state.originalQueue.splice(originalIndex, 1);
      }
    },
    clearUpcoming: (state) => {
      state.queue = state.queue.slice(0, state.index + 1);
      state.originalQueue = state.shuffle ? [...state.queue] : null;
    },
    jumpTo: (state, action: PayloadAction<number>) => {
      if (action.payload < 0 || action.payload >= state.queue.length) return;
      state.index = action.payload;
      state.isPlaying = true;
    },
    next: (state) => {
      if (state.index < state.queue.length - 1) {
        state.index += 1;
      } else if (state.repeat === 'all' && state.queue.length > 0) {
        state.index = 0;
      } else {
        state.isPlaying = false;
      }
    },
    previous: (state) => {
      if (state.index > 0) {
        state.index -= 1;
      } else if (state.repeat === 'all' && state.queue.length > 0) {
        state.index = state.queue.length - 1;
      }
    },
    setPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload && state.queue.length > 0;
    },
    togglePlaying: (state) => {
      state.isPlaying = !state.isPlaying && state.queue.length > 0;
    },
    cycleRepeat: (state) => {
      state.repeat = REPEAT_ORDER[(REPEAT_ORDER.indexOf(state.repeat) + 1) % REPEAT_ORDER.length];
    },
    setShuffleState: (state, action: PayloadAction<Pick<PlayerState, 'shuffle' | 'queue' | 'originalQueue' | 'index'>>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const {
  setQueue, appendToQueue, addToQueue, removeFromQueue, clearUpcoming, jumpTo,
  next, previous, setPlaying, togglePlaying, cycleRepeat,
} = playerSlice.actions;

export const selectCurrentSong = (state: RootState): Song | undefined => state.player.queue[state.player.index];

// Plays `songs` starting at `startIndex`, respecting shuffle.
export const playSongs = (songs: Song[], startIndex = 0): AppThunk => (dispatch, getState) => {
  if (!songs.length) return;
  if (getState().player.shuffle) {
    const first = songs[startIndex];
    const rest = shuffleArray(songs.filter((_, i) => i !== startIndex));
    dispatch(setQueue({ queue: [first, ...rest], index: 0, originalQueue: songs }));
  } else {
    dispatch(setQueue({ queue: songs, index: startIndex }));
  }
};

export const toggleShuffle = (): AppThunk => (dispatch, getState) => {
  const { queue, index, shuffle, originalQueue } = getState().player;
  const current = queue[index];
  if (!shuffle) {
    const upcoming = shuffleArray(queue.slice(index + 1));
    dispatch(playerSlice.actions.setShuffleState({
      shuffle: true,
      queue: [...queue.slice(0, index + 1), ...upcoming],
      originalQueue: queue,
      index,
    }));
    return;
  }
  const restored = originalQueue ?? queue;
  const restoredIndex = current ? restored.findIndex((song) => song.id === current.id) : 0;
  dispatch(playerSlice.actions.setShuffleState({
    shuffle: false,
    queue: restored,
    originalQueue: null,
    index: Math.max(restoredIndex, 0),
  }));
};

// Advances the queue. When it runs out (and repeat is off), keep the music
// going with suggestions for the current song instead of stopping.
export const playNext = (): AppThunk => (dispatch, getState) => {
  const { player, catalog } = getState();
  const atEnd = player.index >= player.queue.length - 1;
  if (atEnd && player.repeat === 'off') {
    const queued = new Set(player.queue.map((song) => song.id));
    const fresh = catalog.suggestions.filter((song) => !queued.has(song.id));
    if (fresh.length) {
      dispatch(appendToQueue(fresh));
      dispatch(setPlaying(true));
    }
  }
  dispatch(next());
};

export default playerSlice.reducer;

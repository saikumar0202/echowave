import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  // Full-screen now playing sheet (phone layout only).
  nowPlayingOpen: boolean,
  // Queue drawer (everything narrower than the wide layout).
  queueOpen: boolean,
  // Lyrics replace the cover art in the player.
  lyricsOpen: boolean,
  toast: { id: number, message: string } | null,
}

const initialState: UIState = {
  nowPlayingOpen: false,
  queueOpen: false,
  lyricsOpen: false,
  toast: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    closeOverlays: (state) => {
      state.nowPlayingOpen = false;
      state.queueOpen = false;
    },
    setNowPlayingOpen: (state, action: PayloadAction<boolean>) => {
      state.nowPlayingOpen = action.payload;
    },
    setQueueOpen: (state, action: PayloadAction<boolean>) => {
      state.queueOpen = action.payload;
    },
    toggleLyrics: (state) => {
      state.lyricsOpen = !state.lyricsOpen;
    },
    showToast: {
      reducer: (state, action: PayloadAction<{ id: number, message: string }>) => {
        state.toast = action.payload;
      },
      prepare: (message: string) => ({ payload: { id: Date.now(), message } }),
    },
    hideToast: (state, action: PayloadAction<number>) => {
      if (state.toast?.id === action.payload) state.toast = null;
    },
  },
});

export const { closeOverlays, setNowPlayingOpen, setQueueOpen, toggleLyrics, showToast, hideToast } = uiSlice.actions;
export default uiSlice.reducer;

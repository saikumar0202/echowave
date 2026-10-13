import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type View =
  | { name: 'discover' }
  | { name: 'search' }
  | { name: 'liked' }
  | { name: 'album', id: string };

interface UIState {
  view: View,
  // Previous view, so the album page can go "back".
  previousView: View | null,
  // Full-screen now playing sheet (phone layout only).
  nowPlayingOpen: boolean,
  // Queue drawer (everything narrower than the wide layout).
  queueOpen: boolean,
  toast: { id: number, message: string } | null,
}

const initialState: UIState = {
  view: { name: 'discover' },
  previousView: null,
  nowPlayingOpen: false,
  queueOpen: false,
  toast: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    navigate: (state, action: PayloadAction<View>) => {
      state.previousView = state.view;
      state.view = action.payload;
      state.nowPlayingOpen = false;
      state.queueOpen = false;
    },
    goBack: (state) => {
      state.view = state.previousView ?? { name: 'discover' };
      state.previousView = null;
    },
    setNowPlayingOpen: (state, action: PayloadAction<boolean>) => {
      state.nowPlayingOpen = action.payload;
    },
    setQueueOpen: (state, action: PayloadAction<boolean>) => {
      state.queueOpen = action.payload;
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

export const { navigate, goBack, setNowPlayingOpen, setQueueOpen, showToast, hideToast } = uiSlice.actions;
export default uiSlice.reducer;

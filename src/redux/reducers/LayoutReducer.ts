import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const LAYOUT_STORAGE_KEY = 'echowave:layout';

// Desktop panel sizes, in px. The phone layout ignores these.
export const LAYOUT_LIMITS = {
  sidebarCollapsed: 72,
  sidebarExpanded: 232,
  player: { min: 300, max: 640, default: 360 },
  queue: { min: 260, max: 480, default: 320 },
  // The page in the middle never gets narrower than this.
  mainMin: 440,
};

export interface LayoutState {
  sidebarExpanded: boolean,
  playerWidth: number,
  queueWidth: number,
  // Wide screens show the queue as a column; this hides it.
  queueHidden: boolean,
}

const defaults: LayoutState = {
  sidebarExpanded: false,
  playerWidth: LAYOUT_LIMITS.player.default,
  queueWidth: LAYOUT_LIMITS.queue.default,
  queueHidden: false,
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(Math.round(value), min), max);

const loadLayout = (): LayoutState => {
  try {
    const saved = JSON.parse(localStorage.getItem(LAYOUT_STORAGE_KEY) ?? '{}');
    return {
      sidebarExpanded: Boolean(saved.sidebarExpanded),
      playerWidth: clamp(Number(saved.playerWidth) || defaults.playerWidth, LAYOUT_LIMITS.player.min, LAYOUT_LIMITS.player.max),
      queueWidth: clamp(Number(saved.queueWidth) || defaults.queueWidth, LAYOUT_LIMITS.queue.min, LAYOUT_LIMITS.queue.max),
      queueHidden: Boolean(saved.queueHidden),
    };
  } catch {
    return defaults;
  }
};

const layoutSlice = createSlice({
  name: "layout",
  initialState: loadLayout,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarExpanded = !state.sidebarExpanded;
    },
    setPlayerWidth: (state, action: PayloadAction<number>) => {
      state.playerWidth = clamp(action.payload, LAYOUT_LIMITS.player.min, LAYOUT_LIMITS.player.max);
    },
    setQueueWidth: (state, action: PayloadAction<number>) => {
      state.queueWidth = clamp(action.payload, LAYOUT_LIMITS.queue.min, LAYOUT_LIMITS.queue.max);
    },
    setQueueHidden: (state, action: PayloadAction<boolean>) => {
      state.queueHidden = action.payload;
    },
    resetLayout: () => defaults,
  },
});

export const { toggleSidebar, setPlayerWidth, setQueueWidth, setQueueHidden, resetLayout } = layoutSlice.actions;
export default layoutSlice.reducer;

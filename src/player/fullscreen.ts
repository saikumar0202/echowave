import type { AppDispatch } from "../redux/store";
import { setFullscreenOpen } from "../redux/reducers/UIReducer";

// Opens the immersive player and, where allowed, real browser full screen.
// Must be called from a user gesture (click / key press).
export const enterFullscreen = (dispatch: AppDispatch) => {
  dispatch(setFullscreenOpen(true));
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen?.().catch(() => {
      // Not allowed (e.g. inside an iframe): the in-app overlay still covers the window.
    });
  }
};

export const exitFullscreen = (dispatch: AppDispatch) => {
  dispatch(setFullscreenOpen(false));
  if (document.fullscreenElement) {
    document.exitFullscreen?.().catch(() => undefined);
  }
};

import { configureStore, ThunkAction, UnknownAction } from "@reduxjs/toolkit";
import { rootReducer, RootState } from "./reducers/rootReducer";
import { useDispatch, useSelector } from "react-redux";
import { LIKED_STORAGE_KEY } from "./reducers/LibraryReducer";

export const createStore = (preloadedState?: Partial<RootState>) => configureStore({
  reducer: rootReducer,
  preloadedState,
});

const store = createStore();

// Persist liked songs whenever they change.
let lastLiked = store.getState().library.liked;
store.subscribe(() => {
  const { liked } = store.getState().library;
  if (liked === lastLiked) return;
  lastLiked = liked;
  try {
    localStorage.setItem(LIKED_STORAGE_KEY, JSON.stringify(liked));
  } catch {
    // Storage can be full or disabled (private mode); liking still works for the session.
  }
});

export type { RootState };
export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<R = void> = ThunkAction<R, RootState, unknown, UnknownAction>;
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export default store;

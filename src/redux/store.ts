import { configureStore, ThunkAction, UnknownAction } from "@reduxjs/toolkit";
import { rootReducer, RootState } from "./reducers/rootReducer";
import { useDispatch, useSelector, useStore } from "react-redux";
import { LIKED_STORAGE_KEY, PLAYLISTS_STORAGE_KEY } from "./reducers/LibraryReducer";
import { LAYOUT_STORAGE_KEY } from "./reducers/LayoutReducer";

export const createStore = (preloadedState?: Partial<RootState>) => configureStore({
  reducer: rootReducer,
  preloadedState,
});

const store = createStore();

// Persist the library (liked songs and playlists) and layout whenever they change.
const persist = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage can be full or disabled (private mode); changes still work for the session.
  }
};

let lastLibrary = store.getState().library;
let lastLayout = store.getState().layout;
store.subscribe(() => {
  const { library, layout } = store.getState();
  if (layout !== lastLayout) {
    lastLayout = layout;
    persist(LAYOUT_STORAGE_KEY, layout);
  }
  if (library === lastLibrary) return;
  if (library.liked !== lastLibrary.liked) persist(LIKED_STORAGE_KEY, library.liked);
  if (library.playlists !== lastLibrary.playlists) persist(PLAYLISTS_STORAGE_KEY, library.playlists);
  lastLibrary = library;
});

export type { RootState };
export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<R = void> = ThunkAction<R, RootState, unknown, UnknownAction>;
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<AppStore>();
export default store;

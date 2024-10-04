import { combineReducers } from '@reduxjs/toolkit'
import SongReducer from "./SongReducer";
import LoadingReducer from "./LoadingReducer";
import AlbumReducer from "./AlbumReducer";
export const rootReducer = combineReducers({
  songs: SongReducer,
  loader: LoadingReducer,
  album: AlbumReducer
  // login: LoginReducer,
  // loader: loadingSlice,
})
export type RootState = ReturnType<typeof rootReducer>
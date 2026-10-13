import { combineReducers } from '@reduxjs/toolkit'
import PlayerReducer from "./PlayerReducer";
import CatalogReducer from "./CatalogReducer";
import SearchReducer from "./SearchReducer";
import AlbumReducer from "./AlbumReducer";
import ArtistReducer from "./ArtistReducer";
import LibraryReducer from "./LibraryReducer";
import LyricsReducer from "./LyricsReducer";
import UIReducer from "./UIReducer";
import LayoutReducer from "./LayoutReducer";

export const rootReducer = combineReducers({
  player: PlayerReducer,
  catalog: CatalogReducer,
  search: SearchReducer,
  album: AlbumReducer,
  artist: ArtistReducer,
  library: LibraryReducer,
  lyrics: LyricsReducer,
  ui: UIReducer,
  layout: LayoutReducer,
})
export type RootState = ReturnType<typeof rootReducer>

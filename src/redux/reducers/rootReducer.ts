import { combineReducers } from '@reduxjs/toolkit'
import PlayerReducer from "./PlayerReducer";
import CatalogReducer from "./CatalogReducer";
import SearchReducer from "./SearchReducer";
import AlbumReducer from "./AlbumReducer";
import LibraryReducer from "./LibraryReducer";
import UIReducer from "./UIReducer";

export const rootReducer = combineReducers({
  player: PlayerReducer,
  catalog: CatalogReducer,
  search: SearchReducer,
  album: AlbumReducer,
  library: LibraryReducer,
  ui: UIReducer,
})
export type RootState = ReturnType<typeof rootReducer>

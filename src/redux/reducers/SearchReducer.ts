import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Album, Song } from "../../Services/interfaces";
import { searchSongs } from "../../Services/songs";
import { searchAlbums } from "../../Services/album";
import type { Status } from "./CatalogReducer";

interface SearchState {
  query: string,
  songs: Song[],
  albums: Album[],
  status: Status,
  requestId: string | null,
}

const initialState: SearchState = {
  query: '',
  songs: [],
  albums: [],
  status: 'idle',
  requestId: null,
};

export const runSearch = createAsyncThunk(
  'search/run',
  async (query: string) => {
    const [songs, albums] = await Promise.all([
      searchSongs(query, 20),
      searchAlbums(query, 8),
    ]);
    return { songs, albums };
  },
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
      if (!action.payload.trim()) {
        state.songs = [];
        state.albums = [];
        state.status = 'idle';
        state.requestId = null;
      }
    },
  },
  extraReducers: (builder) => {
    // Only the latest request wins, so slow responses can't overwrite newer ones.
    builder
      .addCase(runSearch.pending, (state, action) => {
        state.status = 'loading';
        state.requestId = action.meta.requestId;
      })
      .addCase(runSearch.fulfilled, (state, action) => {
        if (state.requestId !== action.meta.requestId) return;
        state.status = 'ready';
        state.songs = action.payload.songs;
        state.albums = action.payload.albums;
      })
      .addCase(runSearch.rejected, (state, action) => {
        if (state.requestId !== action.meta.requestId) return;
        state.status = 'error';
      });
  },
});

export const { setQuery } = searchSlice.actions;
export default searchSlice.reducer;

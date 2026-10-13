import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Album, Song } from "../../Services/interfaces";
import { searchSongs, getSongSuggestions } from "../../Services/songs";
import { searchAlbums } from "../../Services/album";
import { setQueue } from "./PlayerReducer";
import type { RootState } from "../store";

export type Status = 'idle' | 'loading' | 'ready' | 'error';

interface CatalogState {
  trending: Song[],
  topAlbums: Album[],
  status: Status,
  suggestions: Song[],
  suggestionsFor: string | null,
  suggestionsStatus: Status,
}

const initialState: CatalogState = {
  trending: [],
  topAlbums: [],
  status: 'idle',
  suggestions: [],
  suggestionsFor: null,
  suggestionsStatus: 'idle',
};

// The API has no "charts" endpoint; an empty-ish query returns popular items.
export const loadDiscover = createAsyncThunk<{ trending: Song[], topAlbums: Album[] }, void, { state: RootState }>(
  'catalog/loadDiscover',
  async (_, { dispatch, getState }) => {
    const [trending, topAlbums] = await Promise.all([
      searchSongs(' ', 30),
      searchAlbums(' ', 12),
    ]);
    // Give the player something to show before the user picks a song.
    if (getState().player.queue.length === 0 && trending.length) {
      dispatch(setQueue({ queue: trending, index: 0, play: false }));
    }
    return { trending, topAlbums };
  },
  { condition: (_, { getState }) => !['loading', 'ready'].includes(getState().catalog.status) },
);

export const loadSuggestions = createAsyncThunk<Song[], string, { state: RootState }>(
  'catalog/loadSuggestions',
  (songId) => getSongSuggestions(songId, 10),
  { condition: (songId, { getState }) => getState().catalog.suggestionsFor !== songId },
);

const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadDiscover.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadDiscover.fulfilled, (state, action) => {
        state.status = 'ready';
        state.trending = action.payload.trending;
        state.topAlbums = action.payload.topAlbums;
      })
      .addCase(loadDiscover.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(loadSuggestions.pending, (state, action) => {
        state.suggestionsFor = action.meta.arg;
        state.suggestionsStatus = 'loading';
      })
      .addCase(loadSuggestions.fulfilled, (state, action) => {
        if (state.suggestionsFor !== action.meta.arg) return;
        state.suggestions = action.payload;
        state.suggestionsStatus = 'ready';
      })
      .addCase(loadSuggestions.rejected, (state, action) => {
        if (state.suggestionsFor !== action.meta.arg) return;
        state.suggestionsStatus = 'error';
        // Allow a retry the next time this song comes up.
        state.suggestionsFor = null;
      });
  },
});

export default catalogSlice.reducer;

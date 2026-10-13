import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Album, ArtistBase, Song } from "../../Services/interfaces";
import { searchSongs } from "../../Services/songs";
import { searchAlbums } from "../../Services/album";
import { searchArtists } from "../../Services/artist";
import type { Status } from "./CatalogReducer";

interface SearchState {
  // The query these results belong to; the URL (?q=) is the source of truth.
  query: string,
  songs: Song[],
  albums: Album[],
  artists: ArtistBase[],
  status: Status,
  requestId: string | null,
}

const initialState: SearchState = {
  query: '',
  songs: [],
  albums: [],
  artists: [],
  status: 'idle',
  requestId: null,
};

export const runSearch = createAsyncThunk(
  'search/run',
  async (query: string) => {
    const [songs, albums, artists] = await Promise.all([
      searchSongs(query, 20),
      searchAlbums(query, 8),
      // Artists are a nice-to-have; don't fail the whole search without them.
      searchArtists(query, 8).catch(() => []),
    ]);
    return { songs, albums, artists };
  },
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    clearSearch: () => initialState,
  },
  extraReducers: (builder) => {
    // Only the latest request wins, so slow responses can't overwrite newer ones.
    builder
      .addCase(runSearch.pending, (state, action) => {
        state.query = action.meta.arg;
        state.status = 'loading';
        state.requestId = action.meta.requestId;
      })
      .addCase(runSearch.fulfilled, (state, action) => {
        if (state.requestId !== action.meta.requestId) return;
        state.status = 'ready';
        state.songs = action.payload.songs;
        state.albums = action.payload.albums;
        state.artists = action.payload.artists;
      })
      .addCase(runSearch.rejected, (state, action) => {
        if (state.requestId !== action.meta.requestId) return;
        state.status = 'error';
      });
  },
});

export const { clearSearch } = searchSlice.actions;
export default searchSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Album, ArtistBase, Song } from "../../Services/interfaces";
import { searchSongs } from "../../Services/songs";
import { searchAlbums } from "../../Services/album";
import { searchArtists } from "../../Services/artist";
import { searchYouTubeSongs, YouTubeQuotaError } from "../../Services/youtube";
import type { Status } from "./CatalogReducer";

interface SearchState {
  // The query these results belong to; the URL (?q=) is the source of truth.
  query: string,
  songs: Song[],
  albums: Album[],
  artists: ArtistBase[],
  status: Status,
  requestId: string | null,
  youtube: {
    query: string,
    songs: Song[],
    status: Status,
    error: string | null,
    requestId: string | null,
  },
}

const initialState: SearchState = {
  query: '',
  songs: [],
  albums: [],
  artists: [],
  status: 'idle',
  requestId: null,
  youtube: { query: '', songs: [], status: 'idle', error: null, requestId: null },
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

// Separate from runSearch: YouTube searches cost quota, so they only run
// when the YouTube tab is open.
export const runYouTubeSearch = createAsyncThunk('search/youtube', (query: string) => searchYouTubeSongs(query, 20));

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
      })
      .addCase(runYouTubeSearch.pending, (state, action) => {
        state.youtube.query = action.meta.arg;
        state.youtube.status = 'loading';
        state.youtube.error = null;
        state.youtube.requestId = action.meta.requestId;
      })
      .addCase(runYouTubeSearch.fulfilled, (state, action) => {
        if (state.youtube.requestId !== action.meta.requestId) return;
        state.youtube.status = 'ready';
        state.youtube.songs = action.payload;
      })
      .addCase(runYouTubeSearch.rejected, (state, action) => {
        if (state.youtube.requestId !== action.meta.requestId) return;
        state.youtube.status = 'error';
        state.youtube.error = action.error.name === new YouTubeQuotaError().name ? action.error.message ?? null : null;
      });
  },
});

export const { clearSearch } = searchSlice.actions;
export default searchSlice.reducer;

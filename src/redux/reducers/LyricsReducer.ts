import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Song } from "../../Services/interfaces";
import { getLyrics, Lyrics } from "../../Services/lyrics";
import type { Status } from "./CatalogReducer";
import type { RootState } from "../store";

interface LyricsState {
  songId: string | null,
  lyrics: Lyrics | null,
  status: Status,
}

const initialState: LyricsState = {
  songId: null,
  lyrics: null,
  status: 'idle',
};

export const loadLyrics = createAsyncThunk<Lyrics | null, Song, { state: RootState }>(
  'lyrics/load',
  (song) => getLyrics(song),
  { condition: (song, { getState }) => getState().lyrics.songId !== song.id },
);

const lyricsSlice = createSlice({
  name: "lyrics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadLyrics.pending, (state, action) => {
        state.songId = action.meta.arg.id;
        state.lyrics = null;
        state.status = 'loading';
      })
      .addCase(loadLyrics.fulfilled, (state, action) => {
        if (state.songId !== action.meta.arg.id) return;
        state.lyrics = action.payload;
        state.status = 'ready';
      })
      .addCase(loadLyrics.rejected, (state, action) => {
        if (state.songId !== action.meta.arg.id) return;
        state.status = 'error';
        // Allow a retry.
        state.songId = null;
      });
  },
});

export default lyricsSlice.reducer;

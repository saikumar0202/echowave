import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Artist } from "../../Services/interfaces";
import { getArtist } from "../../Services/artist";
import type { Status } from "./CatalogReducer";

interface ArtistState {
  artist: Artist | null,
  status: Status,
}

const initialState: ArtistState = {
  artist: null,
  status: 'idle',
};

export const loadArtist = createAsyncThunk('artist/load', (id: string) => getArtist(id));

const artistSlice = createSlice({
  name: "artist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadArtist.pending, (state) => {
        state.status = 'loading';
        state.artist = null;
      })
      .addCase(loadArtist.fulfilled, (state, action) => {
        state.status = 'ready';
        state.artist = action.payload;
      })
      .addCase(loadArtist.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export default artistSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Album } from "../../Services/interfaces";
import { getAlbum } from "../../Services/album";
import type { Status } from "./CatalogReducer";

interface AlbumState {
  album: Album | null,
  status: Status,
}

const initialState: AlbumState = {
  album: null,
  status: 'idle',
};

export const loadAlbum = createAsyncThunk('album/load', (id: string) => getAlbum(id));

const albumSlice = createSlice({
  name: "album",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadAlbum.pending, (state) => {
        state.status = 'loading';
        state.album = null;
      })
      .addCase(loadAlbum.fulfilled, (state, action) => {
        state.status = 'ready';
        state.album = action.payload;
      })
      .addCase(loadAlbum.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export default albumSlice.reducer;

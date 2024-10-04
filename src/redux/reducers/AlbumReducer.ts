import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Album } from "../../Services/interfaces";

const initialState: {
  searchedAlbums: Album[],
  topCharts: Album[]
} = {
  searchedAlbums: [],
  topCharts: []
}
const albumSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setSearchedAlbums: (state, action:PayloadAction<Album[]>) => {
      state.searchedAlbums = action.payload;
    },
    setTopCharts: (state, action:PayloadAction<Album[]>) => {
      state.topCharts = action.payload;
    },
  },
});

export const { setSearchedAlbums, setTopCharts} = albumSlice.actions;
export default albumSlice.reducer;
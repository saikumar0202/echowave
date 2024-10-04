import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    loading: true,
  },
  reducers: {
    loading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { loading } = loadingSlice.actions;
export default loadingSlice.reducer;
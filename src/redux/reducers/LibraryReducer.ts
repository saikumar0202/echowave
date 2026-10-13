import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Song } from "../../Services/interfaces";

export const LIKED_STORAGE_KEY = 'echowave:liked';

const loadLiked = (): Song[] => {
  try {
    const raw = localStorage.getItem(LIKED_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const librarySlice = createSlice({
  name: "library",
  initialState: () => ({ liked: loadLiked() }),
  reducers: {
    toggleLike: (state, action: PayloadAction<Song>) => {
      const index = state.liked.findIndex((song) => song.id === action.payload.id);
      if (index >= 0) {
        state.liked.splice(index, 1);
      } else {
        state.liked.unshift(action.payload);
      }
    },
  },
});

export const { toggleLike } = librarySlice.actions;
export default librarySlice.reducer;

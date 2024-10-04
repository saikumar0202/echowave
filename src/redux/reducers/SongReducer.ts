import { Action, ActionCreatorWithPayload, createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { Song } from "../../Services/interfaces";

const initialState: {
  searchedSongs: Song[],
  nowPlayingSong: Song | undefined,
  songTrackList: Song[],
  songSuggestions: Song[],
  songBackTrackList: Song[],
} = {
  nowPlayingSong: undefined,
  songSuggestions: [],
  songTrackList: [],
  searchedSongs: [],
  songBackTrackList: []
}
const songSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setSearchedSongs: (state, action:PayloadAction<Song[]>) => {
      state.searchedSongs = action.payload;
    },
    setNowPlayingSong: (state, action:PayloadAction<Song>) => {
      state.nowPlayingSong = action.payload;

    },
    setSongTrackList: (state, action:PayloadAction<Song[]>) => {
      state.songTrackList = action.payload;
      state.songBackTrackList = [...action.payload.reverse()];
    },
    setSongSuggestions: (state, action:PayloadAction<Song[]>) => {
      state.songSuggestions = action.payload;
    },
    setSongBackTrackList: (state, action:PayloadAction<Song[]>) => {
      state.songBackTrackList = action.payload;
    },
    setNextTrack: (state) => {
      state.nowPlayingSong = state.songTrackList[0] || state.songSuggestions[0];
      state.songTrackList = [...state.songTrackList.slice(1)]
    }
  },
});

export const { setSearchedSongs, setSongSuggestions, setSongTrackList, setNowPlayingSong, setNextTrack } = songSlice.actions;
export default songSlice.reducer;
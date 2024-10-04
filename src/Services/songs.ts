import { GET } from "./api";
import { loading } from "../redux/reducers/LoadingReducer";
import { setSearchedSongs, setSongSuggestions, setSongTrackList } from "../redux/reducers/SongReducer";
import { Dispatch } from "@reduxjs/toolkit";

export const searchSongsByQuery = (query: string, dispatch: Dispatch, limit = 10, page = 0) => {
  dispatch(loading(true));
  GET("search/songs",
    (res) => {
      dispatch(loading(false));
      dispatch(setSongTrackList(res?.data?.data?.results ?? []));
      dispatch(setSearchedSongs(res?.data?.data?.results ?? []));
    },
    (err) => {
      dispatch(loading(false));
    },
    {
      query,
      limit,
      page
    })
}
export const getSongSuggestionById = (id: string, dispatch: Dispatch, limit = 10, page = 0) => {
  dispatch(loading(true));
  GET("songs/"+id+"/suggestions",
    (res) => {
      dispatch(loading(false));
      dispatch(setSongSuggestions(res?.data.data ?? []));
    },
    (err) => {
      dispatch(loading(false));
    },
    {
      limit,
      page
    })
}
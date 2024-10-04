import { Dispatch } from "@reduxjs/toolkit";
import { loading } from "../redux/reducers/LoadingReducer";
import { GET } from "./api";
import { setSearchedAlbums } from "../redux/reducers/AlbumReducer";

export const searchAlbumsByQuery = (query: string, dispatch: Dispatch, limit = 10, page = 0) => {
  dispatch(loading(true));
  GET("search/albums",
    (res) => {
      dispatch(loading(false));
      dispatch(setSearchedAlbums(res?.data?.data?.results ?? []));
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
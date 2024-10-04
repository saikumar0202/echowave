import React, { useEffect } from "react";
import './styles.scss';
import { TopChart } from "./TopChart";
import { Suggestions } from "./Suggestions";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getSongSuggestionById, searchSongsByQuery } from "../../Services/songs";
import { searchAlbumsByQuery } from "../../Services/album";
import { setNowPlayingSong } from "../../redux/reducers/SongReducer";

export const Discover = () => {
  const {songs, album} = useAppSelector(state => state);
  const dispatch = useAppDispatch();
  useEffect(() => {
    searchSongsByQuery(' ', dispatch, 50);
    searchAlbumsByQuery(' ', dispatch, 4);
  }, []);
  useEffect(() => {
    if(songs.searchedSongs.length > 0 || songs.nowPlayingSong) {
      const song = songs.nowPlayingSong ||songs.searchedSongs[0];
      getSongSuggestionById(song.id, dispatch, 10);
      dispatch(setNowPlayingSong(song));
    }
  }, [songs.searchedSongs, songs.nowPlayingSong]);
  return (
    <article className='discover-section'>
      <h1 className='discover-section__header'>Discover <br/> New music</h1>
      {album?.searchedAlbums && <TopChart albums={album?.searchedAlbums}/>}
      {songs?.songSuggestions && <Suggestions songs={songs?.songSuggestions}/>}
    </article>
  );
};
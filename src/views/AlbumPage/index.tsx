import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { loadAlbum } from "../../redux/reducers/AlbumReducer";
import { playSongs, toggleShuffle } from "../../redux/reducers/PlayerReducer";
import { BackButton } from "../../components/BackButton";
import { SongList } from "../../components/SongList";
import { PlayAllButton } from "../../components/Section";
import { ApiError, SongListSkeleton } from "../../components/Status";
import { ArtistLinks } from "../../components/ArtistCard";
import { decodeEntities, formatTime } from "../../utils/format";
import "../views.scss";
import { Artwork } from "../../components/Artwork";

export const AlbumPage = () => {
  const { id = '' } = useParams();
  const dispatch = useAppDispatch();
  const { album, status } = useAppSelector((state) => state.album);
  const shuffle = useAppSelector((state) => state.player.shuffle);

  useEffect(() => {
    dispatch(loadAlbum(id));
  }, [id, dispatch]);

  const songs = album?.songs ?? [];
  const totalSeconds = songs.reduce((sum, song) => sum + (song.duration || 0), 0);

  return (
    <div className='view'>
      <BackButton />

      {status === 'error' && <ApiError onRetry={() => dispatch(loadAlbum(id))} />}
      {status === 'loading' && (
        <>
          <div className='collection-hero'>
            <div className='collection-hero__art skeleton' />
            <div className='collection-hero__text'>
              <span className='skeleton skeleton--line' />
              <span className='skeleton skeleton--line skeleton--short' />
            </div>
          </div>
          <SongListSkeleton />
        </>
      )}
      {status === 'ready' && album && (
        <>
          <header className='collection-hero'>
            <Artwork className='collection-hero__art' images={album.image} size='large' />
            <div className='collection-hero__text'>
              <p className='view__eyebrow'>{album.type === 'album' ? 'Album' : 'Playlist'}</p>
              <h1 className='view__title'>{decodeEntities(album.name)}</h1>
              <p className='collection-hero__meta'>
                <ArtistLinks artists={album.artists} />
                {album.year ? ` · ${album.year}` : ''}
                {` · ${songs.length} ${songs.length === 1 ? 'song' : 'songs'}`}
                {totalSeconds > 0 ? ` · ${formatTime(totalSeconds)}` : ''}
              </p>
              {songs.length > 0 && (
                <div className='collection-hero__actions'>
                  <PlayAllButton onClick={() => dispatch(playSongs(songs))} label='Play' />
                  <button className={`collection-hero__shuffle ${shuffle ? 'is-active' : ''}`}
                          onClick={() => dispatch(toggleShuffle())} aria-pressed={shuffle} aria-label='Shuffle'
                          title={shuffle ? 'Shuffle on' : 'Shuffle off'}>
                    <i className='fa-solid fa-shuffle' />
                  </button>
                </div>
              )}
            </div>
          </header>
          <SongList songs={songs} variant='index' />
        </>
      )}
    </div>
  );
};

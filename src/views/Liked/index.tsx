import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { playSongs } from "../../redux/reducers/PlayerReducer";
import { SongList } from "../../components/SongList";
import { PlayAllButton } from "../../components/Section";
import { StatusMessage } from "../../components/Status";
import "../views.scss";

export const Liked = () => {
  const dispatch = useAppDispatch();
  const liked = useAppSelector((state) => state.library.liked);

  return (
    <div className='view'>
      <header className='collection-hero'>
        <div className='collection-hero__art collection-hero__art--liked' aria-hidden='true'>
          <i className='fa-solid fa-heart' />
        </div>
        <div className='collection-hero__text'>
          <p className='view__eyebrow'>Playlist</p>
          <h1 className='view__title'>Liked songs</h1>
          <p className='collection-hero__meta'>{liked.length} {liked.length === 1 ? 'song' : 'songs'} · saved on this device</p>
          {liked.length > 0 && (
            <div className='collection-hero__actions'>
              <PlayAllButton onClick={() => dispatch(playSongs(liked))} />
            </div>
          )}
        </div>
      </header>
      {liked.length === 0 ? (
        <StatusMessage icon='fa-regular fa-heart' title='Songs you like will appear here'>
          Tap the heart on any song to save it.
        </StatusMessage>
      ) : (
        <SongList songs={liked} />
      )}
    </div>
  );
};

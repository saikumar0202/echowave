import * as React from 'react';
import { Song } from "../../Services/interfaces";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { toggleLike } from "../../redux/reducers/LibraryReducer";
import { decodeEntities } from "../../utils/format";
import './styles.scss';

interface LikeButtonProps {
  song: Song,
  className?: string,
}

export const LikeButton = ({ song, className = '' }: LikeButtonProps) => {
  const dispatch = useAppDispatch();
  const isLiked = useAppSelector((state) => state.library.liked.some((liked) => liked.id === song.id));
  const name = decodeEntities(song.name);
  return (
    <button className={`like-button ${isLiked ? 'is-liked' : ''} ${className}`}
            onClick={(event) => {
              event.stopPropagation();
              dispatch(toggleLike(song));
            }}
            aria-pressed={isLiked}
            aria-label={isLiked ? `Remove ${name} from liked songs` : `Add ${name} to liked songs`}
            title={isLiked ? 'Remove from Liked' : 'Save to Liked'}>
      <i className={isLiked ? 'fa-solid fa-heart' : 'fa-regular fa-heart'} />
    </button>
  );
};

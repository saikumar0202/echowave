import * as React from 'react';
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { selectCurrentSong } from "../../redux/reducers/PlayerReducer";
import { setNowPlayingOpen } from "../../redux/reducers/UIReducer";
import { usePlayback } from "../../player/playback";
import { artistNames, decodeEntities, pickImage } from "../../utils/format";
import { LikeButton } from "../LikeButton";
import { ProgressBar } from "../NowPlaying";
import './styles.scss';

// Phone-only bar above the bottom navigation; tapping it opens the
// full-screen player.
export const MiniPlayer = () => {
  const dispatch = useAppDispatch();
  const song = useAppSelector(selectCurrentSong);
  const isPlaying = useAppSelector((state) => state.player.isPlaying);
  const { toggle } = usePlayback();

  if (!song) return null;
  const name = decodeEntities(song.name);
  const artists = artistNames(song.artists);

  return (
    <div className='mini-player'>
      <div className='mini-player__body'>
        <button className='mini-player__open' onClick={() => dispatch(setNowPlayingOpen(true))}
                aria-label={`Open player: ${name} by ${artists}`}>
          <img src={pickImage(song.image, 'small')} alt='' width={40} height={40} />
          <span className='mini-player__text'>
            <span className='mini-player__name'>{name}</span>
            <span className='mini-player__artists'>{artists}</span>
          </span>
        </button>
        <LikeButton song={song} />
        <button className='mini-player__play' onClick={toggle} aria-label={isPlaying ? 'Pause' : 'Play'}>
          <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'}`} />
        </button>
      </div>
      <ProgressBar compact />
    </div>
  );
};

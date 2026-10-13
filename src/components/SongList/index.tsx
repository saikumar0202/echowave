import * as React from 'react';
import { Song } from "../../Services/interfaces";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { addToQueue, playSongs, selectCurrentSong, togglePlaying } from "../../redux/reducers/PlayerReducer";
import { showToast } from "../../redux/reducers/UIReducer";
import { artistNames, decodeEntities, formatTime, pickImage } from "../../utils/format";
import { LikeButton } from "../LikeButton";
import './styles.scss';

interface SongListProps {
  songs: Song[],
  // "index" shows track numbers instead of artwork (album pages).
  variant?: 'art' | 'index',
  // Overrides the default "play this list from here" behaviour.
  onPlay?: (index: number) => void,
  // Shows a remove button instead of "add to queue" (queue panel).
  onRemove?: (index: number) => void,
  // Index into `songs` that is currently playing, when the list *is* the queue.
  activeIndex?: number,
}

export const SongList = ({ songs, variant = 'art', onPlay, onRemove, activeIndex }: SongListProps) => {
  const dispatch = useAppDispatch();
  const current = useAppSelector(selectCurrentSong);
  const isPlaying = useAppSelector((state) => state.player.isPlaying);

  const handlePlay = (index: number) => {
    const isActive = activeIndex !== undefined ? activeIndex === index : current?.id === songs[index].id;
    if (isActive) {
      dispatch(togglePlaying());
    } else if (onPlay) {
      onPlay(index);
    } else {
      dispatch(playSongs(songs, index));
    }
  };

  const handleQueue = (song: Song) => {
    dispatch(addToQueue(song));
    dispatch(showToast(`Added “${decodeEntities(song.name)}” to queue`));
  };

  return (
    <ol className='song-list'>
      {songs.map((song, index) => {
        const name = decodeEntities(song.name);
        const artists = artistNames(song.artists);
        const isActive = activeIndex !== undefined ? activeIndex === index : current?.id === song.id;
        return (
          <li key={`${song.id}-${index}`}
              className={`song-row ${isActive ? 'song-row--active' : ''} ${isActive && isPlaying ? 'song-row--playing' : ''}`}>
            <button className='song-row__main' onClick={() => handlePlay(index)}
                    aria-label={`${isActive && isPlaying ? 'Pause' : 'Play'} ${name} by ${artists}`}>
              <span className={`song-row__lead song-row__lead--${variant}`}>
                {variant === 'art'
                  ? <img src={pickImage(song.image, 'small')} alt='' loading='lazy' width={44} height={44} />
                  : <span className='song-row__number'>{index + 1}</span>}
                <span className='song-row__overlay' aria-hidden='true'>
                  {isActive && isPlaying
                    ? <span className='equalizer'><span /><span /><span /></span>
                    : <i className='fa-solid fa-play' />}
                </span>
              </span>
              <span className='song-row__text'>
                <span className='song-row__name' title={name}>
                  {song.explicitContent && <span className='song-row__explicit' title='Explicit'>E</span>}
                  {name}
                </span>
                <span className='song-row__artists' title={artists}>{artists}</span>
              </span>
            </button>
            <div className='song-row__actions'>
              <LikeButton song={song} className='song-row__action song-row__action--like' />
              {onRemove ? (
                <button className='song-row__action' onClick={() => onRemove(index)} aria-label={`Remove ${name} from queue`}
                        title='Remove from queue'>
                  <i className='fa-solid fa-xmark' />
                </button>
              ) : (
                <button className='song-row__action song-row__action--queue' onClick={() => handleQueue(song)}
                        aria-label={`Add ${name} to queue`} title='Add to queue'>
                  <i className='fa-solid fa-list' />
                </button>
              )}
              <span className='song-row__duration'>{formatTime(song.duration)}</span>
            </div>
          </li>
        );
      })}
    </ol>
  );
};

import * as React from 'react';
import { Song } from "../../Services/interfaces";
import './styles.scss';
import { useAppDispatch } from "../../redux/store";
import { setNowPlayingSong } from "../../redux/reducers/SongReducer";

interface BaseProps {
  song: Song
  type?: 'PLAIN' | 'INDEX' | 'DRAG',
}

interface IndexProps extends BaseProps {
  type: 'INDEX',
  index: number
}

interface DragProps extends BaseProps {
  type: "DRAG"
}

type SongListItemProps = BaseProps | IndexProps | DragProps;

export const SongListItem = (props: SongListItemProps) => {
  const {song, type} = props;
  const dispatch = useAppDispatch();
  const {name, image, artists, duration, year} = song;
  const imageUrl = image[0] || image[1] || image[2];
  const artistList = artists?.primary || artists?.all || 'Artist';
  const durationFormatted = `${Math.floor(duration / 60)}:${(duration % 60).toString().padStart(2,'0')}`;

  const handlePlaySong = () => {
    dispatch(setNowPlayingSong(song));
  }

  const Artists = artistList?.map((artist, index) => {
    return (
      <>
        <a href={"#"}>{artist?.name}</a>
        {index !== artistList.length - 1 && ', '}
      </>
    )
  })
  return (
    <div className='song-list-item'>
      {type === "DRAG" && (
        <div className='song-list-item__drag'>
          <i className="fa-solid fa-bars"></i>
        </div>
      )}
      {type === "INDEX" && (
        <div className='song-list-item__index'>{(props as IndexProps).index}</div>
      )}
      <div className='song-list-item__image'>
        <img src={imageUrl.url} alt={name}/>
        <div className='song-list-item__play' onClick={handlePlaySong}>
          <i className="fa-solid fa-play"></i>
        </div>
      </div>
      <div className={`song-list-item__details ${type === "DRAG" || type === "INDEX" ? 'song-list-item__details-drag' : ''}`}>
        <div className='song-list-item__name-and-duration'>
          <div className='song-list-item__name' title={name} dangerouslySetInnerHTML={{__html: name}}></div>
          <div className='song-list-item__duration'>{durationFormatted}</div>
        </div>
        <div className="song-list-item__singers">
          <div className='song-list-item__artists' title={artistList?.map((artist) => artist.name).join(', ')}>
            {Artists}
          </div>
          <div className='song-list-item__year'>{year}</div>
        </div>
      </div>
    </div>
  );
};
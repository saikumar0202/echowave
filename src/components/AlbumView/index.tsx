import * as React from 'react';
import { Album } from "../../Services/interfaces";
import './styles.scss';
interface SongLargeViewProps {
  album: Album,
}

export const SongLargeView = (props: SongLargeViewProps) => {
  const { image, name, artists, year } = props.album;
  const imageUrl = image[1] || image[2] || image[0];
  return (
    <li className='album-view'>
        <img className='album-view__image' src={imageUrl.url} alt={name} />
        <div className='album-view__details'>
          <div className='album-view__name'>{name}</div>
          <div className='album-view__making'>
            <span className='album-view__making--artist'>{artists?.primary?.[0]?.name}</span>,
            <span className='album-view__making--year'>{year}</span>
          </div>
        </div>
        <div className='album-view__play'>
          <i className="fa-solid fa-play"></i>
        </div>
    </li>
  );
};
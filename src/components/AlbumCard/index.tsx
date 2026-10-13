import * as React from 'react';
import { Album } from "../../Services/interfaces";
import { useAppDispatch } from "../../redux/store";
import { navigate } from "../../redux/reducers/UIReducer";
import { artistNames, decodeEntities, pickImage } from "../../utils/format";
import './styles.scss';

interface AlbumCardProps {
  album: Album,
}

export const AlbumCard = ({ album }: AlbumCardProps) => {
  const dispatch = useAppDispatch();
  const name = decodeEntities(album.name);
  const artists = artistNames(album.artists);
  return (
    <li className='album-card'>
      <button className='album-card__button' onClick={() => dispatch(navigate({ name: 'album', id: album.id }))}
              aria-label={`Open album ${name} by ${artists}`}>
        <span className='album-card__art'>
          <img src={pickImage(album.image, 'medium')} alt='' loading='lazy' />
          <span className='album-card__play' aria-hidden='true'><i className='fa-solid fa-play' /></span>
        </span>
        <span className='album-card__name' title={name}>{name}</span>
        <span className='album-card__meta' title={artists}>
          {artists}{album.year ? ` · ${album.year}` : ''}
        </span>
      </button>
    </li>
  );
};

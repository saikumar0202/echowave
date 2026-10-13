import * as React from 'react';
import { Album } from "../../Services/interfaces";
import { Link } from "react-router-dom";
import { routes } from "../../routes";
import { artistNames, decodeEntities } from "../../utils/format";
import './styles.scss';
import { Artwork } from "../Artwork";

interface AlbumCardProps {
  album: Album,
}

export const AlbumCard = ({ album }: AlbumCardProps) => {
  const name = decodeEntities(album.name);
  const artists = artistNames(album.artists);
  return (
    <li className='album-card'>
      <Link className='album-card__button' to={routes.album(album.id)} aria-label={`Album ${name} by ${artists}`}>
        <span className='album-card__art'>
          <Artwork images={album.image} size='medium' loading='lazy' />
          <span className='album-card__play' aria-hidden='true'><i className='fa-solid fa-play' /></span>
        </span>
        <span className='album-card__name' title={name}>{name}</span>
        <span className='album-card__meta' title={artists}>
          {artists}{album.year ? ` · ${album.year}` : ''}
        </span>
      </Link>
    </li>
  );
};

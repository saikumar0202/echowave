import * as React from 'react';
import { Link } from "react-router-dom";
import { ArtistBase, Artists } from "../../Services/interfaces";
import { routes } from "../../routes";
import { decodeEntities, pickImage } from "../../utils/format";
import './styles.scss';

export const ArtistCard = ({ artist }: { artist: ArtistBase }) => {
  const name = decodeEntities(artist.name);
  const image = pickImage(artist.image, 'medium');
  return (
    <li className='artist-card'>
      <Link className='artist-card__link' to={routes.artist(artist.id)} aria-label={`Artist ${name}`}>
        <span className='artist-card__image'>
          {image ? <img src={image} alt='' loading='lazy' /> : <i className='fa-solid fa-user' aria-hidden='true' />}
        </span>
        <span className='artist-card__name' title={name}>{name}</span>
        <span className='artist-card__type'>Artist</span>
      </Link>
    </li>
  );
};

// Comma-separated artist names, each linking to its artist page.
export const ArtistLinks = ({ artists, className = '' }: { artists: Artists | undefined, className?: string }) => {
  const list = artists?.primary?.length ? artists.primary : artists?.all ?? [];
  if (!list.length) return <span className={className}>Unknown artist</span>;
  return (
    <span className={`artist-links ${className}`}>
      {list.map((artist, index) => (
        <React.Fragment key={artist.id}>
          {index > 0 && ', '}
          <Link to={routes.artist(artist.id)}>{decodeEntities(artist.name)}</Link>
        </React.Fragment>
      ))}
    </span>
  );
};

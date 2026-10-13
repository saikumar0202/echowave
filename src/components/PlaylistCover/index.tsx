import * as React from 'react';
import { Song } from "../../Services/interfaces";
import { pickImage } from "../../utils/format";
import './styles.scss';

// A 2x2 mosaic of the first album covers, or a single cover / placeholder.
export const PlaylistCover = ({ songs, className = '' }: { songs: Song[], className?: string }) => {
  const covers = Array.from(new Set(songs.map((song) => pickImage(song.image, 'medium')).filter(Boolean)));
  if (covers.length === 0) {
    return (
      <div className={`playlist-cover playlist-cover--empty ${className}`} aria-hidden='true'>
        <i className='fa-solid fa-music' />
      </div>
    );
  }
  const shown = covers.length >= 4 ? covers.slice(0, 4) : covers.slice(0, 1);
  return (
    <div className={`playlist-cover ${shown.length === 4 ? 'playlist-cover--grid' : ''} ${className}`} aria-hidden='true'>
      {shown.map((src) => <img key={src} src={src} alt='' loading='lazy' />)}
    </div>
  );
};

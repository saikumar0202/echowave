import * as React from 'react';
import { Song } from "../../Services/interfaces";
import { pickImage } from "../../utils/format";
import { Artwork } from "../Artwork";
import './styles.scss';

// A 2x2 mosaic of the first album covers, or a single cover / placeholder.
export const PlaylistCover = ({ songs, className = '' }: { songs: Song[], className?: string }) => {
  // One entry per distinct cover.
  const seen = new Set<string>();
  const covers = songs.filter((song) => {
    const key = pickImage(song.image, 'medium');
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
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
      {shown.map((song) => <Artwork key={song.id} images={song.image} size='medium' loading='lazy' />)}
    </div>
  );
};

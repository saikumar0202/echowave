import * as React from 'react';
import { Song } from "../../Services/interfaces";
import { SongListItem } from "../SongListItem";
import './styles.scss';

interface SongListProps {
  songs: Song[],
  type: "PLAIN" | "DRAG" | "INDEX"
}

export const SongList = (props: SongListProps) => {
  return (
    <ul className='song-list'>
      {props.songs?.map((song, index) => (
        <SongListItem key={song.id} song={song}
                      type={props.type}
                      {...(props.type === 'INDEX' ? { index: index + 1 } : {})}
        />)
        )}
    </ul>
  );
};
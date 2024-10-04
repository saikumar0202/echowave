import * as React from 'react';
import { Song } from "../../../Services/interfaces";
import { SongList } from "../../SongList";
import './styles.scss';

interface SuggestionsProps {
  songs: Song[]
}

export const Suggestions = (props: SuggestionsProps) => {
  return (
    <div className='suggestions'>
      <h2 className='suggestions__header'> You may like</h2>
    <SongList songs={props.songs} type="PLAIN"/>
    </div>
  );
};
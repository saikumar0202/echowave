import * as React from 'react';
import { Album } from "../../../Services/interfaces";
import { SongLargeView } from "../../AlbumView";
import './styles.scss';
interface TopChartProps {
  albums: Album[]
}

export const TopChart = (props: TopChartProps) => {
  return (
    <div className='top-chart'>
      <h3 className='top-chart__header'>
        <span className='top-chart__header-text'>Top-chart</span>
        <span className='top-chart__header-dropdown'>Week <i className="fa-solid fa-chevron-down"></i></span>
      </h3>
      <ul className='top-chart__album-list'>
        {props.albums?.map((album) => <SongLargeView key={album.id} album={album} />)}
      </ul>
    </div>
  );
};
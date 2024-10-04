import React from "react";
import { SongList } from "../SongList";
import "./styles.scss"
import { useAppSelector } from "../../redux/store";
export const Track = () => {
  const {songTrackList, nowPlayingSong} = useAppSelector(state => state.songs);
  console.log(songTrackList)
    return (
        <article className='track-section'>
            <h2 className="track-section__title">Track List</h2>
            <div className="track-section__actions">
                <button className="control-button control-button--shuffle"><i className="fa-solid fa-shuffle"></i></button>
                <button className="control-button control-button--repeat"><i className="fa-solid fa-repeat"></i></button>
            </div>
            <div>
              {songTrackList && <SongList songs={nowPlayingSong ? songTrackList : [...songTrackList.slice(1)]} type="DRAG"/>}
            </div>
        </article>
    );
};
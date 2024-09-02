import React from "react";
import { SongList } from "../SongList";
import {songs} from "../Discover/index";
import "./styles.scss"
export const Track = () => {
    return (
        <article className='track-section'>
            <h2 className="track-section__title">Track List</h2>
            <div className="track-section__actions">
                <button className="control-button control-button--shuffle"><i className="fa-solid fa-shuffle"></i></button>
                <button className="control-button control-button--repeat"><i className="fa-solid fa-repeat"></i></button>
            </div>
            <div>
                <SongList songs={songs} type="PLAIN"/>
            </div>
        </article>
    );
};
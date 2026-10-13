import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { createPlaylist } from "../../redux/reducers/LibraryReducer";
import { PlaylistCover } from "../../components/PlaylistCover";
import { routes } from "../../routes";
import { useInstallPrompt } from "../../hooks/useInstallPrompt";
import "../views.scss";
import "./styles.scss";

const songCount = (count: number) => `${count} ${count === 1 ? 'song' : 'songs'}`;

export const Library = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { liked, playlists } = useAppSelector((state) => state.library);
  const install = useInstallPrompt();
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState('');

  const create = (event: React.FormEvent) => {
    event.preventDefault();
    const action = createPlaylist(name);
    dispatch(action);
    setName('');
    setCreating(false);
    navigate(routes.playlist(action.payload.id));
  };

  return (
    <div className='view'>
      <header className='view__hero view__hero--compact library__header'>
        <h1 className='view__title'>Your library</h1>
        <div className='library__actions'>
          {install && (
            <button className='text-button' onClick={install}>
              <i className='fa-solid fa-download' /> Install app
            </button>
          )}
          {!creating && (
            <button className='play-all' onClick={() => setCreating(true)}>
              <i className='fa-solid fa-plus' /> New playlist
            </button>
          )}
        </div>
      </header>

      {creating && (
        <form className='library__create' onSubmit={create}>
          <input autoFocus value={name} onChange={(event) => setName(event.target.value)} placeholder='Playlist name'
                 aria-label='Playlist name' maxLength={60} />
          <button type='submit' className='play-all'>Create</button>
          <button type='button' className='text-button' onClick={() => { setCreating(false); setName(''); }}>Cancel</button>
        </form>
      )}

      <ul className='library__grid'>
        <li>
          <Link className='library-tile' to={routes.liked()}>
            <span className='library-tile__cover library-tile__cover--liked'><i className='fa-solid fa-heart' /></span>
            <span className='library-tile__name'>Liked songs</span>
            <span className='library-tile__meta'>{songCount(liked.length)}</span>
          </Link>
        </li>
        {playlists.map((playlist) => (
          <li key={playlist.id}>
            <Link className='library-tile' to={routes.playlist(playlist.id)}>
              <PlaylistCover songs={playlist.songs} className='library-tile__cover' />
              <span className='library-tile__name' title={playlist.name}>{playlist.name}</span>
              <span className='library-tile__meta'>Playlist · {songCount(playlist.songs.length)}</span>
            </Link>
          </li>
        ))}
      </ul>

      {playlists.length === 0 && (
        <p className='library__hint'>
          Create a playlist here, or add songs to one from any song's <i className='fa-solid fa-ellipsis' aria-label='more options' /> menu.
        </p>
      )}
    </div>
  );
};

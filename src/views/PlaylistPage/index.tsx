import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { deletePlaylist, movePlaylistSong, removeFromPlaylist, renamePlaylist } from "../../redux/reducers/LibraryReducer";
import { playSongs, toggleShuffle } from "../../redux/reducers/PlayerReducer";
import { showToast } from "../../redux/reducers/UIReducer";
import { BackButton } from "../../components/BackButton";
import { SongList } from "../../components/SongList";
import { PlayAllButton } from "../../components/Section";
import { StatusMessage } from "../../components/Status";
import { PlaylistCover } from "../../components/PlaylistCover";
import { routes } from "../../routes";
import { formatTime } from "../../utils/format";
import "../views.scss";
import "./styles.scss";

export const PlaylistPage = () => {
  const { id = '' } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const playlist = useAppSelector((state) => state.library.playlists.find((item) => item.id === id));
  const shuffle = useAppSelector((state) => state.player.shuffle);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(playlist?.name ?? '');
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  useEffect(() => {
    setEditing(false);
    setConfirmingDelete(false);
  }, [id]);

  if (!playlist) {
    return (
      <div className='view'>
        <BackButton />
        <StatusMessage icon='fa-solid fa-circle-question' title='Playlist not found'
                       action={<Link className='status-message__retry' to={routes.library()}>Go to your library</Link>}>
          It may have been deleted, or it was created on another device.
        </StatusMessage>
      </div>
    );
  }

  const { songs } = playlist;
  const totalSeconds = songs.reduce((sum, song) => sum + (song.duration || 0), 0);

  const saveName = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(renamePlaylist({ id, name }));
    setEditing(false);
  };

  const remove = () => {
    dispatch(deletePlaylist(id));
    dispatch(showToast(`Deleted “${playlist.name}”`));
    navigate(routes.library(), { replace: true });
  };

  return (
    <div className='view'>
      <BackButton />
      <header className='collection-hero'>
        <PlaylistCover songs={songs} className='collection-hero__art' />
        <div className='collection-hero__text'>
          <p className='view__eyebrow'>Playlist</p>
          {editing ? (
            <form className='playlist-rename' onSubmit={saveName}>
              <input autoFocus value={name} onChange={(event) => setName(event.target.value)} maxLength={60}
                     aria-label='Playlist name' onKeyDown={(event) => event.key === 'Escape' && setEditing(false)} />
              <button type='submit' className='play-all'>Save</button>
            </form>
          ) : (
            <h1 className='view__title'>
              <button className='playlist-title' onClick={() => { setName(playlist.name); setEditing(true); }}
                      title='Rename playlist'>
                {playlist.name} <i className='fa-solid fa-pen' aria-hidden='true' />
              </button>
            </h1>
          )}
          <p className='collection-hero__meta'>
            {songs.length} {songs.length === 1 ? 'song' : 'songs'}
            {totalSeconds > 0 ? ` · ${formatTime(totalSeconds)}` : ''}
          </p>
          <div className='collection-hero__actions'>
            {songs.length > 0 && <PlayAllButton onClick={() => dispatch(playSongs(songs))} label='Play' />}
            {songs.length > 1 && (
              <button className={`collection-hero__shuffle ${shuffle ? 'is-active' : ''}`}
                      onClick={() => dispatch(toggleShuffle())} aria-pressed={shuffle} aria-label='Shuffle'>
                <i className='fa-solid fa-shuffle' />
              </button>
            )}
            {confirmingDelete ? (
              <span className='playlist-confirm' role='alert'>
                Delete this playlist?
                <button className='playlist-confirm__yes' onClick={remove}>Delete</button>
                <button className='text-button' onClick={() => setConfirmingDelete(false)}>Cancel</button>
              </span>
            ) : (
              <button className='collection-hero__shuffle' onClick={() => setConfirmingDelete(true)}
                      aria-label='Delete playlist' title='Delete playlist'>
                <i className='fa-solid fa-trash-can' />
              </button>
            )}
          </div>
        </div>
      </header>

      {songs.length === 0 ? (
        <StatusMessage icon='fa-solid fa-music' title='This playlist is empty'
                       action={<Link className='status-message__retry' to={routes.search()}>Find songs</Link>}>
          Add songs from any song's <i className='fa-solid fa-ellipsis' aria-label='more options' /> menu.
        </StatusMessage>
      ) : (
        <SongList songs={songs}
                  onRemove={(index) => dispatch(removeFromPlaylist({ id, index }))} removeLabel='Remove from playlist'
                  onReorder={(from, to) => dispatch(movePlaylistSong({ id, from, to }))} />
      )}
    </div>
  );
};

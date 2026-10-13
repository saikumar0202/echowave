import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { Song } from "../../Services/interfaces";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { addToQueue, insertNext } from "../../redux/reducers/PlayerReducer";
import { addToPlaylist, createPlaylist } from "../../redux/reducers/LibraryReducer";
import { showToast } from "../../redux/reducers/UIReducer";
import { routes } from "../../routes";
import { artistNames, decodeEntities } from "../../utils/format";
import { MenuExtra, OpenMenu, SongMenuContext, useSongMenu } from "./context";
import './styles.scss';
import { Artwork } from "../Artwork";

interface MenuState extends MenuExtra {
  song: Song,
  anchor: HTMLElement,
}

export const SongMenuButton = ({ song, extra, className = '' }: { song: Song, extra?: MenuExtra, className?: string }) => {
  const open = useSongMenu();
  return (
    <button className={`song-menu-button ${className}`} aria-haspopup='menu' title='More options'
            aria-label={`More options for ${decodeEntities(song.name)}`}
            onClick={(event) => {
              event.stopPropagation();
              open(song, event.currentTarget, extra);
            }}>
      <i className='fa-solid fa-ellipsis' />
    </button>
  );
};

const MENU_WIDTH = 260;
const GAP = 6;

const SongMenu = ({ state, onClose }: { state: MenuState, onClose: () => void }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const playlists = useAppSelector((s) => s.library.playlists);
  const menuRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<'main' | 'playlists'>('main');
  const [newName, setNewName] = useState('');
  const [position, setPosition] = useState<React.CSSProperties>({ opacity: 0 });
  const { song, anchor, remove } = state;
  const name = decodeEntities(song.name);
  const primaryArtist = (song.artists?.primary?.length ? song.artists.primary : song.artists?.all ?? [])[0];

  // Desktop: anchor to the button, flipping up when there's no room below.
  useLayoutEffect(() => {
    const menu = menuRef.current;
    if (!menu || window.matchMedia('(max-width: 899px)').matches) {
      setPosition({});
      return;
    }
    const rect = anchor.getBoundingClientRect();
    const height = menu.offsetHeight;
    const left = Math.min(Math.max(rect.right - MENU_WIDTH, 8), window.innerWidth - MENU_WIDTH - 8);
    const below = rect.bottom + GAP;
    const top = below + height > window.innerHeight - 8 ? Math.max(rect.top - GAP - height, 8) : below;
    setPosition({ top, left, width: MENU_WIDTH });
  }, [anchor, view, playlists.length]);

  useEffect(() => {
    const target = view === 'playlists' ? 'input' : '[role="menuitem"]';
    menuRef.current?.querySelector<HTMLElement>(target)?.focus();
  }, [view]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        if (view === 'playlists') setView('main');
        else onClose();
        return;
      }
      if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
      const items = Array.from(menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? []);
      if (!items.length) return;
      event.preventDefault();
      const current = items.indexOf(document.activeElement as HTMLElement);
      const nextIndex = event.key === 'ArrowDown' ? (current + 1) % items.length : (current - 1 + items.length) % items.length;
      items[nextIndex].focus();
    };
    window.addEventListener('keydown', onKeyDown, true);
    return () => window.removeEventListener('keydown', onKeyDown, true);
  }, [view, onClose]);

  const run = (action: () => void) => () => {
    action();
    onClose();
  };

  const addTo = (playlistId: string, playlistName: string) => run(() => {
    dispatch(addToPlaylist({ id: playlistId, song }));
    dispatch(showToast(`Added to ${playlistName}`));
  });

  const createWithSong = (event: React.FormEvent) => {
    event.preventDefault();
    const action = createPlaylist(newName, [song]);
    dispatch(action);
    dispatch(showToast(`Created “${action.payload.name}”`));
    onClose();
  };

  return createPortal(
    <div className='song-menu-layer'>
      <div className='song-menu-scrim' onClick={onClose} aria-hidden='true' />
      <div className='song-menu' role='menu' aria-label={`Options for ${name}`} ref={menuRef} style={position}>
        <div className='song-menu__song'>
          <Artwork images={song.image} size='small' width={40} height={40} />
          <span className='song-menu__song-text'>
            <span className='song-menu__song-name'>{name}</span>
            <span className='song-menu__song-artists'>{artistNames(song.artists)}</span>
          </span>
        </div>

        {view === 'main' ? (
          <>
            <button role='menuitem' className='song-menu__item' onClick={run(() => {
              dispatch(insertNext(song));
              dispatch(showToast('Playing next'));
            })}>
              <i className='fa-solid fa-arrow-turn-down fa-flip-horizontal' /> Play next
            </button>
            <button role='menuitem' className='song-menu__item' onClick={run(() => {
              dispatch(addToQueue(song));
              dispatch(showToast('Added to queue'));
            })}>
              <i className='fa-solid fa-list' /> Add to queue
            </button>
            <button role='menuitem' className='song-menu__item' onClick={() => setView('playlists')}>
              <i className='fa-solid fa-plus' /> Add to playlist
              <i className='fa-solid fa-chevron-right song-menu__chevron' />
            </button>
            {song.album?.id && (
              <button role='menuitem' className='song-menu__item' onClick={run(() => navigate(routes.album(song.album.id)))}>
                <i className='fa-solid fa-compact-disc' /> Go to album
              </button>
            )}
            {song.source === 'youtube' && (
              <a role='menuitem' className='song-menu__item' href={song.url} target='_blank' rel='noreferrer' onClick={onClose}>
                <i className='fa-brands fa-youtube' /> Open on YouTube
              </a>
            )}
            {primaryArtist && song.source !== 'youtube' && (
              <button role='menuitem' className='song-menu__item' onClick={run(() => navigate(routes.artist(primaryArtist.id)))}>
                <i className='fa-solid fa-user' /> Go to artist
              </button>
            )}
            {remove && (
              <button role='menuitem' className='song-menu__item song-menu__item--danger' onClick={run(remove.onSelect)}>
                <i className='fa-solid fa-trash-can' /> {remove.label}
              </button>
            )}
          </>
        ) : (
          <>
            <button role='menuitem' className='song-menu__item song-menu__back' onClick={() => setView('main')}>
              <i className='fa-solid fa-chevron-left' /> Add to playlist
            </button>
            <form className='song-menu__new' onSubmit={createWithSong}>
              <input value={newName} onChange={(event) => setNewName(event.target.value)} placeholder='New playlist name'
                     aria-label='New playlist name' maxLength={60} />
              <button type='submit' aria-label='Create playlist'><i className='fa-solid fa-plus' /></button>
            </form>
            <div className='song-menu__scroll'>
              {playlists.map((playlist) => {
                const contains = playlist.songs.some((item) => item.id === song.id);
                return (
                  <button key={playlist.id} role='menuitem' className='song-menu__item' disabled={contains}
                          onClick={addTo(playlist.id, playlist.name)}>
                    <i className={contains ? 'fa-solid fa-check' : 'fa-solid fa-music'} />
                    <span className='song-menu__label'>{playlist.name}</span>
                  </button>
                );
              })}
              {playlists.length === 0 && <p className='song-menu__empty'>No playlists yet. Name one above.</p>}
            </div>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
};

export const SongMenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<MenuState | null>(null);
  const open = useCallback<OpenMenu>((song, anchor, extra) => setState({ song, anchor, ...extra }), []);
  const close = useCallback(() => {
    setState((current) => {
      // Return focus to the button that opened the menu.
      if (current?.anchor.isConnected) window.setTimeout(() => current.anchor.focus(), 0);
      return null;
    });
  }, []);

  return (
    <SongMenuContext.Provider value={open}>
      {children}
      {state && <SongMenu key={state.song.id} state={state} onClose={close} />}
    </SongMenuContext.Provider>
  );
};

import * as React from 'react';
import { NavLink, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setQueueOpen } from "../../redux/reducers/UIReducer";
import { setQueueHidden, toggleSidebar } from "../../redux/reducers/LayoutReducer";
import { PlaylistCover } from "../PlaylistCover";
import { routes } from "../../routes";
import './styles.scss';

// `also` lists other paths that belong to the same tab.
const NAV_ITEMS: { to: string, label: string, icon: string, end?: boolean, also?: string[] }[] = [
  { to: routes.discover(), label: 'Discover', icon: 'fa-solid fa-compass', end: true },
  { to: routes.search(), label: 'Search', icon: 'fa-solid fa-magnifying-glass' },
  { to: routes.library(), label: 'Library', icon: 'fa-solid fa-book-bookmark', also: ['/liked', '/playlist/'] },
];

const useNav = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const queueOpen = useAppSelector((state) => state.ui.queueOpen);
  return {
    queueOpen,
    // Wide screens bring the hidden queue column back; narrower ones use the drawer.
    toggleQueue: () => {
      if (window.matchMedia('(min-width: 1280px)').matches) dispatch(setQueueHidden(false));
      else dispatch(setQueueOpen(!queueOpen));
    },
    isActive: (item: typeof NAV_ITEMS[number], routerActive: boolean) =>
      routerActive || Boolean(item.also?.some((path) => pathname.startsWith(path))),
  };
};

export const Sidebar = () => {
  const dispatch = useAppDispatch();
  const { queueOpen, toggleQueue, isActive: matches } = useNav();
  const expanded = useAppSelector((state) => state.layout.sidebarExpanded);
  const playlists = useAppSelector((state) => state.library.playlists);
  const likedCount = useAppSelector((state) => state.library.liked.length);
  return (
    <nav className={`sidebar ${expanded ? 'sidebar--expanded' : ''}`} aria-label='Main'>
      <NavLink to={routes.discover()} className='sidebar__brand' aria-label='EchoWave home'>
        <span className='sidebar__logo'><i className='fa-solid fa-wave-square' aria-hidden='true' /></span>
        <span className='sidebar__brand-name'>EchoWave</span>
      </NavLink>
      <ul className='sidebar__items'>
        {NAV_ITEMS.map((item) => (
          <li key={item.to}>
            <NavLink to={item.to} end={item.end} aria-label={item.label} title={expanded ? undefined : item.label}
                     className={({ isActive }) => `sidebar__item ${matches(item, isActive) ? 'is-active' : ''}`}>
              <i className={item.icon} aria-hidden='true' />
              <span className='sidebar__label'>{item.label}</span>
            </NavLink>
          </li>
        ))}
        <li className='sidebar__queue'>
          <button className={`sidebar__item ${queueOpen ? 'is-active' : ''}`} onClick={toggleQueue}
                  aria-label='Queue' aria-expanded={queueOpen} title={expanded ? undefined : 'Queue'}>
            <i className='fa-solid fa-list-ul' aria-hidden='true' />
            <span className='sidebar__label'>Queue</span>
          </button>
        </li>
      </ul>

      {expanded && (
        <section className='sidebar__library' aria-label='Your playlists'>
          <h2 className='sidebar__heading'>Your playlists</h2>
          <ul>
            <li>
              <NavLink to={routes.liked()} className={({ isActive }) => `sidebar__playlist ${isActive ? 'is-active' : ''}`}>
                <span className='sidebar__playlist-cover sidebar__playlist-cover--liked'><i className='fa-solid fa-heart' /></span>
                <span className='sidebar__playlist-text'>
                  <span className='sidebar__playlist-name'>Liked songs</span>
                  <span className='sidebar__playlist-meta'>{likedCount} {likedCount === 1 ? 'song' : 'songs'}</span>
                </span>
              </NavLink>
            </li>
            {playlists.map((playlist) => (
              <li key={playlist.id}>
                <NavLink to={routes.playlist(playlist.id)}
                         className={({ isActive }) => `sidebar__playlist ${isActive ? 'is-active' : ''}`}>
                  <PlaylistCover songs={playlist.songs} className='sidebar__playlist-cover' />
                  <span className='sidebar__playlist-text'>
                    <span className='sidebar__playlist-name' title={playlist.name}>{playlist.name}</span>
                    <span className='sidebar__playlist-meta'>{playlist.songs.length} {playlist.songs.length === 1 ? 'song' : 'songs'}</span>
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </section>
      )}

      <button className='sidebar__toggle' onClick={() => dispatch(toggleSidebar())}
              aria-label={expanded ? 'Collapse sidebar' : 'Expand sidebar'} aria-expanded={expanded}
              title={expanded ? 'Collapse sidebar ([)' : 'Expand sidebar ([)'}>
        <i className={`fa-solid ${expanded ? 'fa-angles-left' : 'fa-angles-right'}`} aria-hidden='true' />
      </button>
    </nav>
  );
};

export const BottomNav = () => {
  const { queueOpen, toggleQueue, isActive: matches } = useNav();
  return (
    <nav className='bottom-nav' aria-label='Main'>
      {NAV_ITEMS.map((item) => (
        <NavLink key={item.to} to={item.to} end={item.end}
                 className={({ isActive }) => `bottom-nav__item ${matches(item, isActive) && !queueOpen ? 'is-active' : ''}`}>
          <span className='bottom-nav__icon'>
            <i className={item.icon} aria-hidden='true' />
          </span>
          <span>{item.label}</span>
        </NavLink>
      ))}
      <button className={`bottom-nav__item ${queueOpen ? 'is-active' : ''}`} onClick={toggleQueue} aria-expanded={queueOpen}>
        <span className='bottom-nav__icon'><i className='fa-solid fa-list-ul' aria-hidden='true' /></span>
        <span>Queue</span>
      </button>
    </nav>
  );
};

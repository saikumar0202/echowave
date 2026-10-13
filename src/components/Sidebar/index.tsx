import * as React from 'react';
import { NavLink, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setQueueOpen } from "../../redux/reducers/UIReducer";
import { routes } from "../../routes";
import './styles.scss';

// `also` lists other paths that belong to the same tab.
export const NAV_ITEMS: { to: string, label: string, icon: string, end?: boolean, also?: string[] }[] = [
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
    toggleQueue: () => dispatch(setQueueOpen(!queueOpen)),
    isActive: (item: typeof NAV_ITEMS[number], routerActive: boolean) =>
      routerActive || Boolean(item.also?.some((path) => pathname.startsWith(path))),
  };
};

export const Sidebar = () => {
  const { queueOpen, toggleQueue, isActive: matches } = useNav();
  return (
    <nav className='sidebar' aria-label='Main'>
      <NavLink to={routes.discover()} className='sidebar__logo' aria-label='EchoWave home'>
        <i className='fa-solid fa-wave-square' aria-hidden='true' />
      </NavLink>
      <ul className='sidebar__items'>
        {NAV_ITEMS.map((item) => (
          <li key={item.to}>
            <NavLink to={item.to} end={item.end} aria-label={item.label}
                     className={({ isActive }) => `sidebar__item ${matches(item, isActive) ? 'is-active' : ''}`}>
              <i className={item.icon} aria-hidden='true' />
              <span className='sidebar__label'>{item.label}</span>
            </NavLink>
          </li>
        ))}
        <li className='sidebar__queue'>
          <button className={`sidebar__item ${queueOpen ? 'is-active' : ''}`} onClick={toggleQueue}
                  aria-label='Queue' aria-expanded={queueOpen}>
            <i className='fa-solid fa-list-ul' aria-hidden='true' />
            <span className='sidebar__label'>Queue</span>
          </button>
        </li>
      </ul>
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

import * as React from 'react';
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { navigate, setQueueOpen, View } from "../../redux/reducers/UIReducer";
import './styles.scss';

export const NAV_ITEMS: { view: View, label: string, icon: string }[] = [
  { view: { name: 'discover' }, label: 'Discover', icon: 'fa-solid fa-compass' },
  { view: { name: 'search' }, label: 'Search', icon: 'fa-solid fa-magnifying-glass' },
  { view: { name: 'liked' }, label: 'Liked', icon: 'fa-solid fa-heart' },
];

const useNav = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.ui.view.name);
  const queueOpen = useAppSelector((state) => state.ui.queueOpen);
  const likedCount = useAppSelector((state) => state.library.liked.length);
  return {
    current,
    queueOpen,
    likedCount,
    go: (view: View) => dispatch(navigate(view)),
    toggleQueue: () => dispatch(setQueueOpen(!queueOpen)),
  };
};

export const Sidebar = () => {
  const { current, go, toggleQueue, queueOpen } = useNav();
  return (
    <nav className='sidebar' aria-label='Main'>
      <div className='sidebar__logo' aria-label='EchoWave'>
        <i className='fa-solid fa-wave-square' aria-hidden='true' />
      </div>
      <ul className='sidebar__items'>
        {NAV_ITEMS.map((item) => (
          <li key={item.view.name}>
            <button className={`sidebar__item ${current === item.view.name ? 'is-active' : ''}`}
                    onClick={() => go(item.view)} aria-current={current === item.view.name ? 'page' : undefined}
                    aria-label={item.label}>
              <i className={item.icon} aria-hidden='true' />
              <span className='sidebar__label'>{item.label}</span>
            </button>
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
  const { current, go, toggleQueue, queueOpen, likedCount } = useNav();
  return (
    <nav className='bottom-nav' aria-label='Main'>
      {NAV_ITEMS.map((item) => (
        <button key={item.view.name} className={`bottom-nav__item ${current === item.view.name && !queueOpen ? 'is-active' : ''}`}
                onClick={() => go(item.view)} aria-current={current === item.view.name ? 'page' : undefined}>
          <span className='bottom-nav__icon'>
            <i className={item.icon} aria-hidden='true' />
            {item.view.name === 'liked' && likedCount > 0 && <span className='bottom-nav__badge'>{likedCount}</span>}
          </span>
          <span>{item.label}</span>
        </button>
      ))}
      <button className={`bottom-nav__item ${queueOpen ? 'is-active' : ''}`} onClick={toggleQueue} aria-expanded={queueOpen}>
        <span className='bottom-nav__icon'><i className='fa-solid fa-list-ul' aria-hidden='true' /></span>
        <span>Queue</span>
      </button>
    </nav>
  );
};

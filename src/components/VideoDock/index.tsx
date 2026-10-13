import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { selectCurrentSong } from "../../redux/reducers/PlayerReducer";
import { setNowPlayingOpen } from "../../redux/reducers/UIReducer";
import { PLAYER_HOST_ID } from "../../player/youtubePlayer";
import { pickVisibleSlot } from "../../player/videoSlots";
import { decodeEntities } from "../../utils/format";
import './styles.scss';

type Layout =
  | { mode: 'hidden' }
  | { mode: 'slot', top: number, left: number, width: number, height: number, zIndex: number }
  | { mode: 'floating' };

const sameLayout = (a: Layout, b: Layout) => JSON.stringify(a) === JSON.stringify(b);

// Hosts the one YouTube player and keeps it over the visible video slot.
export const VideoDock = () => {
  const dispatch = useAppDispatch();
  const song = useAppSelector(selectCurrentSong);
  const isYouTube = song?.source === 'youtube';
  const frameRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState<Layout>({ mode: 'hidden' });

  // The IFrame API replaces its host element with an <iframe>, so the host
  // is created outside React's tree to keep React from losing track of it.
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || document.getElementById(PLAYER_HOST_ID)) return;
    const host = document.createElement('div');
    host.id = PLAYER_HOST_ID;
    frame.appendChild(host);
  }, []);

  useEffect(() => {
    if (!isYouTube) {
      setLayout({ mode: 'hidden' });
      return;
    }
    let raf = 0;
    const track = () => {
      const slot = pickVisibleSlot();
      let next: Layout = { mode: 'floating' };
      if (slot) {
        const rect = slot.element.getBoundingClientRect();
        next = {
          mode: 'slot',
          top: Math.round(rect.top),
          left: Math.round(rect.left),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          zIndex: slot.zIndex,
        };
      }
      setLayout((current) => (sameLayout(current, next) ? current : next));
      raf = requestAnimationFrame(track);
    };
    track();
    return () => cancelAnimationFrame(raf);
  }, [isYouTube]);

  const style: React.CSSProperties = layout.mode === 'slot'
    ? { top: layout.top, left: layout.left, width: layout.width, height: layout.height, zIndex: layout.zIndex }
    : {};

  return (
    <div className={`video-dock video-dock--${layout.mode}`} style={style} aria-hidden={layout.mode === 'hidden'}>
      {layout.mode === 'floating' && song && (
        <div className='video-dock__bar'>
          <span className='video-dock__title'>{decodeEntities(song.name)}</span>
          <button className='video-dock__expand' onClick={() => dispatch(setNowPlayingOpen(true))} aria-label='Open player'>
            <i className='fa-solid fa-up-right-and-down-left-from-center' />
          </button>
        </div>
      )}
      <div className='video-dock__frame' ref={frameRef} />
    </div>
  );
};

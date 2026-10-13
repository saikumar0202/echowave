import React, { useEffect, useRef } from 'react';
import './App.scss';
import { useAppSelector } from "./redux/store";
import { Sidebar, BottomNav } from "./components/Sidebar";
import { NowPlaying } from "./components/NowPlaying";
import { MiniPlayer } from "./components/MiniPlayer";
import { QueuePanel } from "./components/QueuePanel";
import { Toast } from "./components/Toast";
import { Discover } from "./views/Discover";
import { Search } from "./views/Search";
import { Liked } from "./views/Liked";
import { AlbumPage } from "./views/AlbumPage";

const CurrentView = () => {
  const view = useAppSelector((state) => state.ui.view);
  switch (view.name) {
    case 'search':
      return <Search />;
    case 'liked':
      return <Liked />;
    case 'album':
      return <AlbumPage id={view.id} />;
    default:
      return <Discover />;
  }
};

function App() {
  const view = useAppSelector((state) => state.ui.view);
  const mainRef = useRef<HTMLElement>(null);

  // Each page starts at the top.
  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0 });
  }, [view]);

  return (
    <div className="app">
      <Sidebar />
      <main className='app__main' ref={mainRef}>
        <CurrentView />
      </main>
      <NowPlaying />
      <QueuePanel />
      <MiniPlayer />
      <BottomNav />
      <Toast />
    </div>
  );
}

export default App;

import React, { useEffect, useRef } from 'react';
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import './App.scss';
import { useAppDispatch, useAppSelector } from "./redux/store";
import { closeOverlays } from "./redux/reducers/UIReducer";
import { loadDiscover } from "./redux/reducers/CatalogReducer";
import { Sidebar, BottomNav } from "./components/Sidebar";
import { NowPlaying } from "./components/NowPlaying";
import { MiniPlayer } from "./components/MiniPlayer";
import { QueuePanel } from "./components/QueuePanel";
import { Toast } from "./components/Toast";
import { FullscreenPlayer } from "./components/FullscreenPlayer";
import { useOnlineStatus } from "./hooks/useOnlineStatus";
import { Discover } from "./views/Discover";
import { Search } from "./views/Search";
import { Liked } from "./views/Liked";
import { AlbumPage } from "./views/AlbumPage";
import { ArtistPage } from "./views/ArtistPage";
import { Library } from "./views/Library";
import { PlaylistPage } from "./views/PlaylistPage";

function App() {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const online = useOnlineStatus();
  const fullscreenOpen = useAppSelector((state) => state.ui.fullscreenOpen);

  // Load starter content on any entry page, so the player isn't empty
  // when the app is opened straight onto e.g. a playlist link.
  useEffect(() => {
    dispatch(loadDiscover());
  }, [dispatch]);

  // Each page starts at the top, and navigating closes the player sheet/queue.
  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0 });
    window.scrollTo({ top: 0 });
    dispatch(closeOverlays());
  }, [pathname, dispatch]);

  return (
    <div className="app">
      <Sidebar />
      <main className='app__main' ref={mainRef}>
        {!online && (
          <div className='offline-banner' role='status'>
            <i className='fa-solid fa-wifi' aria-hidden='true' /> You're offline. Showing saved pages; playing music needs a connection.
          </div>
        )}
        <Routes>
          <Route path='/' element={<Discover />} />
          <Route path='/search' element={<Search />} />
          <Route path='/library' element={<Library />} />
          <Route path='/liked' element={<Liked />} />
          <Route path='/playlist/:id' element={<PlaylistPage />} />
          <Route path='/album/:id' element={<AlbumPage />} />
          <Route path='/artist/:id' element={<ArtistPage />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </main>
      <NowPlaying />
      <QueuePanel />
      <MiniPlayer />
      <BottomNav />
      {fullscreenOpen && <FullscreenPlayer />}
      <Toast />
    </div>
  );
}

export default App;

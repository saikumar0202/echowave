import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { Sidebar } from "./components/Sidebar";
import { Discover } from "./components/Discover";
import { Player } from "./components/Player";
import { Track } from "./components/Track";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <main className='main-container'>
        <Discover />
        <Player />
        <Track />
      </main>
    </div>
  );
}

export default App;

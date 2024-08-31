import React from 'react';
import logo from './logo.svg';
import './App.scss';
import store from './redux/store';
import { Sidebar } from "./components/Sidebar";
import { Discover } from "./components/Discover";
import { Player } from "./components/Player";
import { Track } from "./components/Track";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Sidebar />
        <main className='main-container'>
          <Discover />
          <Player />
          <Track />
        </main>
      </div>
    </Provider>
  );
}

export default App;

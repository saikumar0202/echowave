import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import './styles/theme.scss';
import App from './App';
import store from './redux/store';
import { PlayerProvider } from "./player/PlayerProvider";
import { SongMenuProvider } from "./components/SongMenu";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* Hash URLs work on static hosting (GitHub Pages) without a server rewrite. */}
      <HashRouter>
        <PlayerProvider>
          <SongMenuProvider>
            <App />
          </SongMenuProvider>
        </PlayerProvider>
      </HashRouter>
    </Provider>
  </React.StrictMode>
);

import { createContext, useContext } from 'react';
import { Song } from "../../Services/interfaces";

export interface MenuExtra {
  // Context-specific action, e.g. "Remove from playlist".
  remove?: { label: string, onSelect: () => void },
}

export type OpenMenu = (song: Song, anchor: HTMLElement, extra?: MenuExtra) => void;

export const SongMenuContext = createContext<OpenMenu>(() => undefined);

export const useSongMenu = () => useContext(SongMenuContext);

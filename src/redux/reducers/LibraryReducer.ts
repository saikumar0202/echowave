import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { Song } from "../../Services/interfaces";

export const LIKED_STORAGE_KEY = 'echowave:liked';
export const PLAYLISTS_STORAGE_KEY = 'echowave:playlists';

export interface Playlist {
  id: string,
  name: string,
  songs: Song[],
  createdAt: number,
}

export interface LibraryState {
  liked: Song[],
  playlists: Playlist[],
}

const loadArray = <T>(key: string): T[] => {
  try {
    const raw = localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const moveItem = <T>(items: T[], from: number, to: number) => {
  if (from === to || from < 0 || to < 0 || from >= items.length || to >= items.length) return;
  const [item] = items.splice(from, 1);
  items.splice(to, 0, item);
};

const findPlaylist = (state: LibraryState, id: string) => state.playlists.find((playlist) => playlist.id === id);

const librarySlice = createSlice({
  name: "library",
  initialState: (): LibraryState => ({
    liked: loadArray<Song>(LIKED_STORAGE_KEY),
    playlists: loadArray<Playlist>(PLAYLISTS_STORAGE_KEY),
  }),
  reducers: {
    toggleLike: (state, action: PayloadAction<Song>) => {
      const index = state.liked.findIndex((song) => song.id === action.payload.id);
      if (index >= 0) {
        state.liked.splice(index, 1);
      } else {
        state.liked.unshift(action.payload);
      }
    },
    createPlaylist: {
      reducer: (state, action: PayloadAction<{ id: string, name: string, createdAt: number, songs: Song[] }>) => {
        state.playlists.unshift(action.payload);
      },
      prepare: (name: string, songs: Song[] = []) => ({
        payload: { id: nanoid(10), name: name.trim() || 'My playlist', createdAt: Date.now(), songs },
      }),
    },
    renamePlaylist: (state, action: PayloadAction<{ id: string, name: string }>) => {
      const playlist = findPlaylist(state, action.payload.id);
      const name = action.payload.name.trim();
      if (playlist && name) playlist.name = name;
    },
    deletePlaylist: (state, action: PayloadAction<string>) => {
      state.playlists = state.playlists.filter((playlist) => playlist.id !== action.payload);
    },
    addToPlaylist: (state, action: PayloadAction<{ id: string, song: Song }>) => {
      const playlist = findPlaylist(state, action.payload.id);
      if (playlist && !playlist.songs.some((song) => song.id === action.payload.song.id)) {
        playlist.songs.push(action.payload.song);
      }
    },
    removeFromPlaylist: (state, action: PayloadAction<{ id: string, index: number }>) => {
      findPlaylist(state, action.payload.id)?.songs.splice(action.payload.index, 1);
    },
    movePlaylistSong: (state, action: PayloadAction<{ id: string, from: number, to: number }>) => {
      const playlist = findPlaylist(state, action.payload.id);
      if (playlist) moveItem(playlist.songs, action.payload.from, action.payload.to);
    },
  },
});

export const {
  toggleLike, createPlaylist, renamePlaylist, deletePlaylist, addToPlaylist, removeFromPlaylist, movePlaylistSong,
} = librarySlice.actions;
export default librarySlice.reducer;

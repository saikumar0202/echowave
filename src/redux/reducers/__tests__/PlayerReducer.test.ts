import { createStore } from "../../store";
import {
  addToQueue, clearUpcoming, cycleRepeat, jumpTo, next, playNext, playSongs, previous,
  removeFromQueue, selectCurrentSong, toggleShuffle,
} from "../PlayerReducer";
import { Song } from "../../../Services/interfaces";

jest.mock('../../../Services/songs', () => ({ searchSongs: jest.fn(), getSongSuggestions: jest.fn() }));
jest.mock('../../../Services/album', () => ({ searchAlbums: jest.fn(), getAlbum: jest.fn() }));
jest.mock('../../../Services/artist', () => ({ searchArtists: jest.fn(), getArtist: jest.fn() }));

const song = (id: string): Song => ({ id, name: `Song ${id}` } as Song);
const songs = (...ids: string[]) => ids.map(song);
const ids = (list: Song[]) => list.map((s) => s.id);

const setup = () => {
  const store = createStore();
  return { store, player: () => store.getState().player };
};

describe('player queue', () => {
  it('plays a list from the chosen index', () => {
    const { store, player } = setup();
    store.dispatch(playSongs(songs('a', 'b', 'c'), 1));
    expect(selectCurrentSong(store.getState())?.id).toBe('b');
    expect(player().isPlaying).toBe(true);
  });

  it('moves forward and back, stopping at the end when repeat is off', () => {
    const { store, player } = setup();
    store.dispatch(playSongs(songs('a', 'b')));
    store.dispatch(next());
    expect(player().index).toBe(1);
    store.dispatch(next());
    expect(player().index).toBe(1);
    expect(player().isPlaying).toBe(false);
    store.dispatch(previous());
    expect(player().index).toBe(0);
    store.dispatch(previous());
    expect(player().index).toBe(0);
  });

  it('wraps around with repeat all', () => {
    const { store, player } = setup();
    store.dispatch(playSongs(songs('a', 'b')));
    store.dispatch(cycleRepeat());
    expect(player().repeat).toBe('all');
    store.dispatch(next());
    store.dispatch(next());
    expect(player().index).toBe(0);
    store.dispatch(previous());
    expect(player().index).toBe(1);
    store.dispatch(cycleRepeat());
    expect(player().repeat).toBe('one');
    store.dispatch(cycleRepeat());
    expect(player().repeat).toBe('off');
  });

  it('keeps the current song when removing others', () => {
    const { store, player } = setup();
    store.dispatch(playSongs(songs('a', 'b', 'c', 'd'), 2));
    store.dispatch(removeFromQueue(0));
    expect(ids(player().queue)).toEqual(['b', 'c', 'd']);
    expect(selectCurrentSong(store.getState())?.id).toBe('c');
    store.dispatch(removeFromQueue(1));
    expect(ids(player().queue)).toEqual(['b', 'c', 'd']);
    store.dispatch(clearUpcoming());
    expect(ids(player().queue)).toEqual(['b', 'c']);
  });

  it('adds to the end of the queue, or starts one', () => {
    const { store, player } = setup();
    store.dispatch(addToQueue(song('x')));
    expect(ids(player().queue)).toEqual(['x']);
    expect(player().isPlaying).toBe(false);
    store.dispatch(playSongs(songs('a', 'b')));
    store.dispatch(addToQueue(song('z')));
    expect(ids(player().queue)).toEqual(['a', 'b', 'z']);
  });

  it('jumps to a queued song', () => {
    const { store } = setup();
    store.dispatch(playSongs(songs('a', 'b', 'c')));
    store.dispatch(jumpTo(2));
    expect(selectCurrentSong(store.getState())?.id).toBe('c');
  });
});

describe('shuffle', () => {
  it('keeps the current song and played history, and restores order when turned off', () => {
    const { store, player } = setup();
    const list = songs('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h');
    store.dispatch(playSongs(list, 2));
    store.dispatch(toggleShuffle());
    expect(player().shuffle).toBe(true);
    expect(ids(player().queue.slice(0, 3))).toEqual(['a', 'b', 'c']);
    expect(ids(player().queue).sort()).toEqual(ids(list));
    expect(selectCurrentSong(store.getState())?.id).toBe('c');

    store.dispatch(next());
    const nowPlaying = selectCurrentSong(store.getState())?.id;
    store.dispatch(toggleShuffle());
    expect(ids(player().queue)).toEqual(ids(list));
    expect(selectCurrentSong(store.getState())?.id).toBe(nowPlaying);
  });

  it('starts a shuffled list with the song that was picked', () => {
    const { store, player } = setup();
    store.dispatch(toggleShuffle());
    store.dispatch(playSongs(songs('a', 'b', 'c', 'd'), 3));
    expect(selectCurrentSong(store.getState())?.id).toBe('d');
    expect(player().queue).toHaveLength(4);
  });
});

describe('playNext', () => {
  it('continues with suggestions not already queued when the queue runs out', () => {
    const store = createStore({
      catalog: {
        trending: [], topAlbums: [], status: 'ready',
        suggestions: songs('b', 's1', 's2'), suggestionsFor: 'b', suggestionsStatus: 'ready',
      },
    });
    store.dispatch(playSongs(songs('a', 'b'), 1));
    store.dispatch(playNext());
    const { player } = store.getState();
    expect(ids(player.queue)).toEqual(['a', 'b', 's1', 's2']);
    expect(selectCurrentSong(store.getState())?.id).toBe('s1');
    expect(player.isPlaying).toBe(true);
  });
});

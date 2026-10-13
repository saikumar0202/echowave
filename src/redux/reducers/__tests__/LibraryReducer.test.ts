import reducer, {
  addToPlaylist, createPlaylist, deletePlaylist, LibraryState, movePlaylistSong, removeFromPlaylist, renamePlaylist, toggleLike,
} from "../LibraryReducer";
import { Song } from "../../../Services/interfaces";

const song = (id: string): Song => ({ id, name: `Song ${id}` } as Song);
const empty: LibraryState = { liked: [], playlists: [] };

describe('library', () => {
  it('toggles liked songs, newest first', () => {
    let state = reducer(empty, toggleLike(song('a')));
    state = reducer(state, toggleLike(song('b')));
    expect(state.liked.map((s) => s.id)).toEqual(['b', 'a']);
    state = reducer(state, toggleLike(song('a')));
    expect(state.liked.map((s) => s.id)).toEqual(['b']);
  });

  it('creates, renames and deletes playlists', () => {
    const create = createPlaylist('  Road trip ', [song('a')]);
    let state = reducer(empty, create);
    expect(state.playlists[0]).toMatchObject({ id: create.payload.id, name: 'Road trip' });
    expect(state.playlists[0].songs).toHaveLength(1);

    state = reducer(state, renamePlaylist({ id: create.payload.id, name: 'Drive' }));
    expect(state.playlists[0].name).toBe('Drive');
    state = reducer(state, renamePlaylist({ id: create.payload.id, name: '   ' }));
    expect(state.playlists[0].name).toBe('Drive');

    state = reducer(state, deletePlaylist(create.payload.id));
    expect(state.playlists).toHaveLength(0);
  });

  it('names untitled playlists', () => {
    expect(reducer(empty, createPlaylist('')).playlists[0].name).toBe('My playlist');
  });

  it('adds songs once, removes and reorders them', () => {
    const create = createPlaylist('Mix');
    const { id } = create.payload;
    let state = reducer(empty, create);
    for (const songId of ['a', 'b', 'c', 'a']) state = reducer(state, addToPlaylist({ id, song: song(songId) }));
    expect(state.playlists[0].songs.map((s) => s.id)).toEqual(['a', 'b', 'c']);

    state = reducer(state, movePlaylistSong({ id, from: 0, to: 2 }));
    expect(state.playlists[0].songs.map((s) => s.id)).toEqual(['b', 'c', 'a']);

    state = reducer(state, removeFromPlaylist({ id, index: 1 }));
    expect(state.playlists[0].songs.map((s) => s.id)).toEqual(['b', 'a']);
  });
});

import { AudiusPlaylist, AudiusTrack, isPlayable, toAlbum, toImages, toSong, toSongs } from "../audius";
import { pickAudio, pickImage } from "../../utils/format";

const user = { id: 'u1', name: 'Some Artist', handle: 'someartist', profile_picture: { '150x150': 'p150', '480x480': 'p480' } };
const track = (overrides: Partial<AudiusTrack> = {}): AudiusTrack => ({
  id: 't1',
  title: 'Night Drive',
  duration: 201,
  genre: 'Electronic',
  release_date: '2025-03-01T00:00:00Z',
  play_count: 42,
  permalink: '/someartist/night-drive',
  artwork: { '150x150': 'a150', '480x480': 'a480', '1000x1000': 'a1000' },
  user,
  ...overrides,
});

describe('Audius adapter', () => {
  it('maps a track to a playable song', () => {
    const song = toSong(track());
    expect(song).toMatchObject({ id: 't1', name: 'Night Drive', duration: 201, year: '2025', genre: 'Electronic', url: 'https://audius.co/someartist/night-drive' });
    expect(song.artists.primary[0]).toMatchObject({ id: 'u1', name: 'Some Artist', url: 'https://audius.co/someartist' });
    expect(pickImage(song.image, 'small')).toBe('a150');
    expect(pickImage(song.image, 'large')).toBe('a1000');
    expect(pickAudio(song.downloadUrl)).toMatch(/\/tracks\/t1\/stream\?app_name=echowave$/);
  });

  it('fills missing image sizes and uses a placeholder without artwork', () => {
    expect(toImages({ '150x150': 'only' }).map((image) => image.url)).toEqual(['only', 'only', 'only']);
    expect(toImages(null)[0].url).toMatch(/^data:image\/svg\+xml/);
    expect(toImages(null, false)).toEqual([]);
  });

  it('drops gated and deleted tracks', () => {
    expect(isPlayable(track())).toBe(true);
    expect(isPlayable(track({ access: { stream: false } }))).toBe(false);
    expect(isPlayable(track({ is_delete: true }))).toBe(false);
    expect(isPlayable(track({ is_streamable: false }))).toBe(false);
    expect(toSongs([track(), track({ id: 't2', access: { stream: false } })]).map((song) => song.id)).toEqual(['t1']);
  });

  it('maps albums and playlists with their playable songs', () => {
    const playlist: AudiusPlaylist = { id: 'p1', playlist_name: 'Late Nights', is_album: true, release_date: '2024-06-01', track_count: 3, user };
    const album = toAlbum(playlist, [track(), track({ id: 't3', is_delete: true })]);
    expect(album).toMatchObject({ id: 'p1', name: 'Late Nights', type: 'album', year: 2024, songCount: 1 });
    expect(toAlbum({ ...playlist, is_album: false }).type).toBe('playlist');
    expect(toAlbum({ ...playlist, is_album: false }).songCount).toBe(3);
  });
});

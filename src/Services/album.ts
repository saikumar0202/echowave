import { GET } from "./api";
import { Album } from "./interfaces";
import { AudiusPlaylist, AudiusTrack, toAlbum } from "./audius";

const playable = (playlist: AudiusPlaylist) => playlist.access?.stream !== false;

// Albums and playlists both come back; the page labels them by type.
export const searchAlbums = async (query: string, limit = 10): Promise<Album[]> =>
  (await GET<AudiusPlaylist[]>("playlists/search", { query, limit })).filter(playable).map((playlist) => toAlbum(playlist));

export const getTopAlbums = async (limit = 12): Promise<Album[]> =>
  (await GET<AudiusPlaylist[]>("playlists/trending", { type: 'album', limit })).filter(playable).map((playlist) => toAlbum(playlist));

export const getAlbum = async (id: string): Promise<Album> => {
  const encoded = encodeURIComponent(id);
  const [playlists, tracks] = await Promise.all([
    GET<AudiusPlaylist[]>(`playlists/${encoded}`),
    GET<AudiusTrack[]>(`playlists/${encoded}/tracks`),
  ]);
  if (!playlists[0]) throw new Error('Album not found');
  return toAlbum(playlists[0], tracks);
};

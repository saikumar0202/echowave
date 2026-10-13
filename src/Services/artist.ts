import { GET } from "./api";
import { Artist, ArtistBase } from "./interfaces";
import { AudiusPlaylist, AudiusTrack, AudiusUser, toAlbum, toArtist, toArtistBase, toSongs } from "./audius";

export const searchArtists = async (query: string, limit = 10): Promise<ArtistBase[]> =>
  (await GET<AudiusUser[]>("users/search", { query, limit })).map(toArtistBase);

export const getArtist = async (id: string): Promise<Artist> => {
  const encoded = encodeURIComponent(id);
  // Albums and related artists are extras; the page still works without them.
  const [user, tracks, albums, related] = await Promise.all([
    GET<AudiusUser>(`users/${encoded}`),
    GET<AudiusTrack[]>(`users/${encoded}/tracks`, { sort: 'plays', limit: 20 }),
    GET<AudiusPlaylist[]>(`users/${encoded}/albums`, { limit: 12 }).catch(() => []),
    GET<AudiusUser[]>(`users/${encoded}/related`, { limit: 10 }).catch(() => []),
  ]);
  return toArtist(user, {
    topSongs: toSongs(tracks),
    topAlbums: albums.map((album) => toAlbum(album)),
    similarArtists: related.map(toArtistBase),
  });
};

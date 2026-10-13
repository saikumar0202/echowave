import { GET } from "./api";
import { Song } from "./interfaces";
import { AudiusTrack, toSongs } from "./audius";

export const searchSongs = async (query: string, limit = 10): Promise<Song[]> =>
  toSongs(await GET<AudiusTrack[]>("tracks/search", { query, limit }));

export const getTrendingSongs = async (limit = 30, genre?: string): Promise<Song[]> =>
  toSongs(await GET<AudiusTrack[]>("tracks/trending", { limit, ...(genre ? { genre } : {}) }));

// Recommendations in the same genre, excluding the song itself; falls back to
// overall trending when a genre is unknown or has nothing to offer.
export const getSongSuggestions = async (song: Song, limit = 10): Promise<Song[]> => {
  const params = { limit, exclusion_list: song.id, ...(song.genre ? { genre: song.genre } : {}) };
  const songs = toSongs(await GET<AudiusTrack[]>("tracks/recommended", params)).filter((item) => item.id !== song.id);
  if (songs.length) return songs;
  return (await getTrendingSongs(limit + 1)).filter((item) => item.id !== song.id).slice(0, limit);
};

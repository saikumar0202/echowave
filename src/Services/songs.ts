import { GET } from "./api";
import { Song } from "./interfaces";
import { AudiusTrack, toSongs } from "./audius";
import { getYouTubePlaylist, youtubeEnabled } from "./youtube";

export const searchSongs = async (query: string, limit = 10): Promise<Song[]> =>
  toSongs(await GET<AudiusTrack[]>("tracks/search", { query, limit }));

export const getTrendingSongs = async (limit = 30, genre?: string): Promise<Song[]> =>
  toSongs(await GET<AudiusTrack[]>("tracks/trending", { limit, ...(genre ? { genre } : {}) }));

// Recommendations in the same genre, excluding the song itself; falls back to
// overall trending when a genre is unknown or has nothing to offer.
export const getSongSuggestions = async (song: Song, limit = 10): Promise<Song[]> => {
  // YouTube has no "related videos" API any more; keep going with Telugu hits.
  if (song.source === 'youtube') {
    if (!youtubeEnabled()) return [];
    return (await getYouTubePlaylist()).filter((item) => item.id !== song.id).slice(0, limit);
  }
  const params = { limit, exclusion_list: song.id, ...(song.genre ? { genre: song.genre } : {}) };
  const songs = toSongs(await GET<AudiusTrack[]>("tracks/recommended", params)).filter((item) => item.id !== song.id);
  if (songs.length) return songs;
  return (await getTrendingSongs(limit + 1)).filter((item) => item.id !== song.id).slice(0, limit);
};

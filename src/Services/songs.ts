import { GET } from "./api";
import { SearchResults, Song } from "./interfaces";

export const searchSongs = async (query: string, limit = 10, page = 0): Promise<Song[]> => {
  const data = await GET<SearchResults<Song>>("search/songs", { query, limit, page });
  return data?.results ?? [];
};

export const getSongSuggestions = async (id: string, limit = 10): Promise<Song[]> => {
  const data = await GET<Song[]>(`songs/${id}/suggestions`, { limit });
  return data ?? [];
};

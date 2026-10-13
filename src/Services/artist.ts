import { GET } from "./api";
import { Artist, ArtistBase, SearchResults } from "./interfaces";

export const searchArtists = async (query: string, limit = 10, page = 0): Promise<ArtistBase[]> => {
  const data = await GET<SearchResults<ArtistBase>>("search/artists", { query, limit, page });
  return data?.results ?? [];
};

export const getArtist = (id: string): Promise<Artist> =>
  GET<Artist>(`artists/${encodeURIComponent(id)}`, { songCount: 20, albumCount: 12 });

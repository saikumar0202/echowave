import { GET } from "./api";
import { Album, SearchResults } from "./interfaces";

export const searchAlbums = async (query: string, limit = 10, page = 0): Promise<Album[]> => {
  const data = await GET<SearchResults<Album>>("search/albums", { query, limit, page });
  return data?.results ?? [];
};

export const getAlbum = (id: string): Promise<Album> => GET<Album>("albums", { id });

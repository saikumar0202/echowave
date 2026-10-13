// Central place for building in-app URLs.
export const routes = {
  discover: () => '/',
  search: (query?: string) => (query ? `/search?q=${encodeURIComponent(query)}` : '/search'),
  library: () => '/library',
  liked: () => '/liked',
  album: (id: string) => `/album/${encodeURIComponent(id)}`,
  artist: (id: string) => `/artist/${encodeURIComponent(id)}`,
  playlist: (id: string) => `/playlist/${encodeURIComponent(id)}`,
};

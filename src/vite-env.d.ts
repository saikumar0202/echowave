/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Audius API base URL, ending in "/v1/" (defaults to https://api.audius.co/v1/).
  readonly VITE_API_HOST?: string;
  // YouTube Data API v3 key (restrict it to your site's URLs in Google Cloud).
  readonly VITE_YOUTUBE_API_KEY?: string;
  // Playlist shown as "Telugu hits"; defaults to an official Aditya Music playlist.
  readonly VITE_YOUTUBE_TELUGU_PLAYLIST?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

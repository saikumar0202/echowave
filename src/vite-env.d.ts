/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Audius API base URL, ending in "/v1/" (defaults to https://api.audius.co/v1/).
  readonly VITE_API_HOST?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

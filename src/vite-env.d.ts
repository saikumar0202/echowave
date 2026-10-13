/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Base URL of the jiosaavn-api, ending in "/api/".
  readonly VITE_API_HOST?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

# EchoWave

A responsive music streaming web app built with React, TypeScript, Redux Toolkit, React Router and SCSS, bundled with Vite. Music data comes from the open-source [JioSaavn API](https://github.com/sumitkolhe/jiosaavn-api).

## Features

- **Discover**: top albums, trending songs, and "You may like" suggestions based on the current song
- **Search** songs, albums and artists as you type; searches have shareable URLs
- **Album and artist pages**, with links from every song
- **Library**: liked songs and playlists (create, rename, reorder, delete), saved in the browser
- **Song menu**: play next, add to queue, add to playlist, go to album or artist
- **Queue**: drag to reorder (mouse, touch or keyboard), remove, clear, jump to a song
- **Player**: shuffle, repeat (off / all / one), seek, volume, and auto-play of similar songs when the queue ends
- **Synced lyrics** from [LRCLIB](https://lrclib.net), with tap-to-seek
- **Installable app (PWA)** that opens offline and caches artwork and recent pages
- **Full-screen "Stage" player** on desktop: cover art on a spinning record, synced lyrics or up next in a side panel, controls that fade when idle
- **Mobile layout**: bottom tabs, mini player, full-screen now-playing sheet, safe-area aware
- **Lock-screen and headphone controls** through the Media Session API
- **Light and dark themes** that follow the system setting
- **Keyboard shortcuts**: `Space` play/pause, `Shift+←/→` previous/next, `M` mute, `F` full screen

## Getting started

EchoWave needs the JioSaavn API running locally (the old public `saavn.dev` host no longer exists).

```bash
# 1. Run the API on port 3001 (needs Bun: https://bun.sh)
git clone https://github.com/sumitkolhe/jiosaavn-api.git
cd jiosaavn-api
bun install
PORT=3001 bun run dev

# 2. In another terminal, run the app
cd echowave
npm install
npm start
```

Open http://localhost:3000.

To use a different API host, set `VITE_API_HOST`:

```bash
VITE_API_HOST=https://your-api.example.com/api/ npm start
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm start` | Dev server on port 3000 |
| `npm test` | Unit tests (Vitest) |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript type check |
| `npm run build` | Type check + production build in `build/` |
| `npm run preview` | Serve the production build locally |

## Project structure

```
src/
  Services/      API client and endpoint wrappers
  redux/         Store and slices: player (queue), catalog, search, album, artist,
                 library (liked + playlists), lyrics, ui
  player/        PlayerProvider: owns the <audio> element, media session, shortcuts
  components/    UI building blocks (SongList, NowPlaying, MiniPlayer, QueuePanel, ...)
  views/         Pages: Discover, Search, Library, Liked, Album, Artist, Playlist
  hooks/         Install prompt and online status
  styles/        Design tokens and the light/dark theme
```

## Deployment

- `.github/workflows/ci.yml` runs lint, tests and a production build on every pull request.
- `.github/workflows/deploy.yml` runs the same checks, then builds and publishes to GitHub Pages on every push to `main`.

The deployed site can't reach `localhost`, so host the API somewhere public (it deploys to Vercel or Cloudflare Workers), then add its URL as a repository variable named `VITE_API_HOST` (Settings → Secrets and variables → Actions → Variables), for example `https://your-api.example.com/api/`.

# EchoWave

A responsive music streaming web app built with React, TypeScript, Redux Toolkit, React Router and SCSS, bundled with Vite. Music comes from [Audius](https://audius.org), an open music platform whose public API streams full tracks uploaded by the artists themselves. No API key or backend is needed.

## Features

- **Discover**: top albums, trending songs, and "You may like" suggestions based on the current song
- **Search** songs, albums and artists as you type; searches have shareable URLs
- **Album and artist pages**, with links from every song
- **Library**: liked songs and playlists (create, rename, reorder, delete), saved in the browser
- **Resilient artwork**: Audius serves images from many content nodes; slow or failing ones fall back to mirrors
- **Song menu**: play next, add to queue, add to playlist, go to album or artist
- **Queue**: drag to reorder (mouse, touch or keyboard), remove, clear, jump to a song
- **Player**: shuffle, repeat (off / all / one), seek, volume, and auto-play of similar songs when the queue ends
- **Synced lyrics** from [LRCLIB](https://lrclib.net), with tap-to-seek (coverage is limited for independent Audius releases)
- **Installable app (PWA)** that opens offline and caches artwork and recent pages
- **Full-screen "Stage" player** on desktop: cover art on a spinning record, synced lyrics or up next in a side panel, controls that fade when idle
- **Mobile layout**: bottom tabs, mini player, full-screen now-playing sheet, safe-area aware
- **Lock-screen and headphone controls** through the Media Session API
- **Light and dark themes** that follow the system setting
- **Keyboard shortcuts**: `Space` play/pause, `Shift+←/→` previous/next, `M` mute, `F` full screen

## Getting started

```bash
npm install
npm start
```

Open http://localhost:3000. The app talks to `https://api.audius.co/v1/` directly from the browser; set `VITE_API_HOST` to use a different Audius discovery node.

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
  Services/      Audius client, adapters into the app's models (audius.ts), lyrics
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
- `.github/workflows/deploy.yml` runs the same checks, then builds and publishes to GitHub Pages on every push to `main`. No backend or secrets are required.

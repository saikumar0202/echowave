# EchoWave

**Live:** https://echowave-theta.vercel.app

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
- **Telugu & Indian film songs from YouTube**: a "Telugu & Indian" search tab and a "Telugu hits" section, played through YouTube's official embedded player (shown in the player, the stage, or a floating mini view on phones)
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

Open http://localhost:3000. Audius works out of the box; the app talks to `https://api.audius.co/v1/` directly from the browser.

### YouTube (Telugu and Indian film songs)

Searching YouTube needs a free YouTube Data API key:

1. In [Google Cloud Console](https://console.cloud.google.com/), create a project and enable **YouTube Data API v3**.
2. Under **APIs & Services → Credentials**, create an **API key**. Restrict it to **HTTP referrers** (`http://localhost:3000/*` and your site, e.g. `https://echowave-theta.vercel.app/*`) and to the **YouTube Data API v3**.
3. Copy `.env.example` to `.env.local` and set `VITE_YOUTUBE_API_KEY`. On Vercel, add the same variable under Project → Settings → Environment Variables and redeploy.

The free quota is about 100 searches per day for the whole site, so results are cached in the browser for a day, YouTube is only searched when you press Enter on the "Telugu & Indian" tab, and "Telugu hits" comes from a playlist (which costs almost nothing). YouTube's terms require the video to stay visible while it plays, so there is no background playback for YouTube songs.

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
- Vercel deploys the app from this repository (`vercel.json` holds the build settings) to https://echowave-theta.vercel.app.

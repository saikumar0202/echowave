# EchoWave

A responsive music streaming web app built with React, TypeScript, Redux Toolkit, React Router and SCSS, bundled with Vite. Music data comes from the open-source [JioSaavn API](https://github.com/sumitkolhe/jiosaavn-api).

## Features

- **Discover**: top albums, trending songs, and "You may like" suggestions based on the current song
- **Search** songs and albums as you type
- **Album pages** with Play and shuffle
- **Liked songs**, saved in the browser (localStorage)
- **Queue**: play from any list, add to queue, remove, clear, jump to a song
- **Player**: shuffle, repeat (off / all / one), seek, volume, and auto-play of similar songs when the queue ends
- **Mobile layout**: bottom tabs, mini player, full-screen now-playing sheet, safe-area aware
- **Lock-screen and headphone controls** through the Media Session API
- **Light and dark themes** that follow the system setting
- **Keyboard shortcuts**: `Space` play/pause, `Shift+←/→` previous/next, `M` mute

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
  redux/         Store and slices: player (queue), catalog, search, album, library, ui
  player/        PlayerProvider: owns the <audio> element, media session, shortcuts
  components/    UI building blocks (SongList, NowPlaying, MiniPlayer, QueuePanel, ...)
  views/         Pages: Discover, Search, Liked, AlbumPage
  styles/        Design tokens and the light/dark theme
```

## Deployment

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every push to `main`. The deployed site can't reach `localhost`, so host the API somewhere public (it deploys to Vercel or Cloudflare Workers) and pass its URL at build time:

```yaml
- name: Build the React app
  run: npm run build
  env:
    VITE_API_HOST: https://your-api.example.com/api/
```

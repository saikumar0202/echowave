// YouTube Data API v3: search and playlists for Telugu / Indian film songs,
// which aren't on Audius. Playback goes through the official embedded player
// (see player/youtubePlayer.ts); audio is never extracted.
import axios from "axios";
import { Song, URLFormat } from "./interfaces";

export const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY || '';
// Official Aditya Music playlist: "Most Viewed Songs | Telugu Hit Songs".
export const TELUGU_PLAYLIST_ID = import.meta.env.VITE_YOUTUBE_TELUGU_PLAYLIST || 'PL0ZpYcTg19EEvB0BcWgOz6X6VHfE_Kr7W';
export const youtubeEnabled = () => Boolean(YOUTUBE_API_KEY);

const client = axios.create({ baseURL: 'https://www.googleapis.com/youtube/v3/', timeout: 15000 });

// The free quota is ~100 searches a day for the whole site, so results are
// cached in the browser.
const SEARCH_TTL_MS = 24 * 60 * 60 * 1000;
// Bump when the shape or cleanup of cached songs changes.
const CACHE_VERSION = 'v4';
const PLAYLIST_TTL_MS = 6 * 60 * 60 * 1000;
// Skip shorts, teasers and hour-long "jukebox" compilations.
const MIN_SECONDS = 60;
const MAX_SECONDS = 15 * 60;

export class YouTubeQuotaError extends Error {
  constructor() {
    super('The daily YouTube search limit has been reached. Try again tomorrow.');
    this.name = 'YouTubeQuotaError';
  }
}

interface Thumbnails {
  default?: { url: string },
  medium?: { url: string },
  high?: { url: string },
}

interface SearchItem {
  id: { videoId?: string },
  snippet: { title: string, channelId: string, channelTitle: string, publishedAt: string, thumbnails: Thumbnails },
}

interface PlaylistItem {
  snippet: {
    title: string,
    publishedAt: string,
    thumbnails: Thumbnails,
    resourceId: { videoId: string },
    videoOwnerChannelId?: string,
    videoOwnerChannelTitle?: string,
  },
}

interface VideoItem {
  id: string,
  contentDetails: { duration: string },
  status?: { embeddable?: boolean },
}

export interface VideoSummary {
  videoId: string,
  title: string,
  channelId: string,
  channelTitle: string,
  publishedAt: string,
  thumbnails: Thumbnails,
}

// "PT4M16S" -> 256
export const parseIsoDuration = (iso: string): number => {
  const match = /^P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(iso);
  if (!match) return 0;
  const [, days, hours, minutes, seconds] = match.map((part) => Number(part ?? 0));
  return days * 86400 + hours * 3600 + minutes * 60 + seconds;
};

const decodeHtml = (value: string) =>
  value.replace(/&(amp|quot|#39|apos|lt|gt);/g, (_, entity: string) =>
    ({ amp: '&', quot: '"', '#39': "'", apos: "'", lt: '<', gt: '>' })[entity] ?? _);

const titleCase = (value: string) =>
  value.toLowerCase().replace(/(^|[\s(-])(\p{L})/gu, (_, lead: string, letter: string) => lead + letter.toUpperCase());

// Words labels add around the song name: "8K VIDEO", "Lyrical", "(Song)", "Full Video Song"...
const NOISE = /\b(full\s+)?(video|lyric(al)?|audio)(\s+(song|video))?s?\b|\b(4k|8k|hd|full\s+song|video\s+song)\b/gi;
const BRACKETED_NOISE = /[([]\s*(official|lyrical|full|video|audio|telugu|hd|4k|8k|song)[^)\]]*[)\]]/gi;

const stripNoise = (value: string) => value
  .replace(BRACKETED_NOISE, '')
  // Trailing hashtags are tags ("... #Irumudi #RaviTeja"); a leading one is
  // usually the song itself ("#Vachinde Full Video Song").
  .replace(/(\s+#\S+)+$/, '')
  .replace(/#/g, '')
  .replace(NOISE, '')
  .replace(/\s{2,}/g, ' ')
  .replace(/^[\s:\-–]+|[\s:\-–|]+$/g, '')
  .trim();

// "MALLEPOOLA PALLAKI (Film Version)" -> "Mallepoola Pallaki (Film Version)"
const fixShouting = (value: string) => {
  const outsideBrackets = value.replace(/[([][^)\]]*[)\]]/g, '');
  if (!/\p{Lu}/u.test(outsideBrackets) || outsideBrackets !== outsideBrackets.toUpperCase()) return value;
  return value.replace(/^[^([]+/, (caps) => titleCase(caps));
};

// Trailers, teasers and the like aren't songs.
export const isNonSong = (title: string) =>
  /\b(trailer|teaser|glimpse|promo|making|interview|review|reaction|ringtone|full\s+album|jukebox)\b/i.test(title);

// Turns label uploads into a plain song name, e.g.
//   "YAALALO YAALALO Lyrical | Irumudi | Ravi Teja"        -> "Yaalalo Yaalalo"
//   "Full Video: Karthika Maasam | Ravi Teja | ..."           -> "Karthika Maasam"
//   "IRUMUDI KATTU (Song): Ravi Teja | GV Prakash | ..."      -> "Irumudi Kattu"
//   "Irumudi: Irumudi Bandho (Full Video) | Ravi Teja | ..."  -> "Irumudi Bandho"
// The film can't be told apart from actor/composer credits reliably, so it
// isn't guessed; the uploading label is shown instead.
export const cleanVideoTitle = (raw: string): string => {
  const first = decodeHtml(raw).split(/\s+[|｜]\s*|\s*[|｜]\s+/)[0]?.trim() ?? raw;
  let name = first;
  // Resolve "left: right" pairs. The song is on the right when the left is only
  // a label ("Full Video:", "8K Video:") or when the right is marked as the
  // song ("Film: Song (Full Video)"); otherwise it's on the left
  // ("SONG Video: Film", "SONG (Song): Actor", "SONG : Film").
  for (let guard = 0; guard < 3 && /\s*:\s*/.test(name); guard++) {
    const [left, ...rest] = name.split(/\s*:\s*/);
    const right = rest.join(': ');
    const markedRight = /[([]\s*(full\s+)?(video|lyrical|audio|song)/i.test(right);
    name = !stripNoise(left) || markedRight ? right : left;
  }
  const cleaned = stripNoise(name) || stripNoise(first) || decodeHtml(raw);
  return fixShouting(cleaned);
};
const toImages = (thumbs: Thumbnails, videoId: string): URLFormat[] => {
  // medium is 16:9 with no letterbox bars, so it crops cleanly to a square.
  const medium = thumbs.medium?.url ?? `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`;
  return [
    { quality: '150x150', url: medium },
    { quality: '480x480', url: medium },
    { quality: '1000x1000', url: thumbs.high?.url ?? medium },
  ];
};

export const toYouTubeSong = (video: VideoSummary, durationSeconds: number): Song => {
  const name = cleanVideoTitle(video.title);
  const artist = {
    id: `yt-channel:${video.channelId}`,
    name: decodeHtml(video.channelTitle),
    role: 'primary_artists',
    type: 'artist',
    image: [],
    url: `https://www.youtube.com/channel/${video.channelId}`,
  };
  const year = new Date(video.publishedAt).getFullYear();
  return {
    id: `yt:${video.videoId}`,
    source: 'youtube',
    videoId: video.videoId,
    name,
    type: 'song',
    year: Number.isNaN(year) ? '' : String(year),
    releaseDate: video.publishedAt,
    duration: durationSeconds,
    label: decodeHtml(video.channelTitle),
    explicitContent: false,
    playCount: 0,
    language: 'telugu',
    hasLyrics: false,
    lyricsId: null,
    url: `https://www.youtube.com/watch?v=${video.videoId}`,
    copyright: '',
    album: { id: '', name: decodeHtml(video.channelTitle), url: '' },
    artists: { primary: [artist], featured: [], all: [artist] },
    image: toImages(video.thumbnails, video.videoId),
    downloadUrl: [],
  };
};

const readCache = <T>(key: string, ttl: number): T | null => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const { savedAt, value } = JSON.parse(raw) as { savedAt: number, value: T };
    return Date.now() - savedAt < ttl ? value : null;
  } catch {
    return null;
  }
};

const writeCache = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify({ savedAt: Date.now(), value }));
  } catch {
    // Storage full or disabled: just skip caching.
  }
};

const call = async <T>(path: string, params: Record<string, unknown>): Promise<T> => {
  if (!YOUTUBE_API_KEY) throw new Error('YouTube is not configured');
  try {
    const { data } = await client.get<T>(path, { params: { ...params, key: YOUTUBE_API_KEY } });
    return data;
  } catch (error) {
    const reason = axios.isAxiosError(error) && error.response?.data?.error?.errors?.[0]?.reason;
    if (reason === 'quotaExceeded' || reason === 'dailyLimitExceeded') throw new YouTubeQuotaError();
    throw error;
  }
};

// Durations (and embeddability) come from a cheap follow-up call (1 unit per 50 videos).
const withDurations = async (videos: VideoSummary[]): Promise<Song[]> => {
  if (!videos.length) return [];
  const { items } = await call<{ items: VideoItem[] }>('videos', {
    part: 'contentDetails,status',
    id: videos.map((video) => video.videoId).join(','),
    maxResults: 50,
  });
  const details = new Map(items.map((item) => [item.id, item]));
  return videos.flatMap((video) => {
    const detail = details.get(video.videoId);
    const seconds = detail ? parseIsoDuration(detail.contentDetails.duration) : 0;
    if (!detail || detail.status?.embeddable === false || seconds < MIN_SECONDS || seconds > MAX_SECONDS) return [];
    if (isNonSong(video.title)) return [];
    return [toYouTubeSong(video, seconds)];
  });
};

// Labels upload the same song several times (lyrical, video, 8K...). Keep the
// first (most relevant) per channel; other channels' versions, e.g. a dub, stay.
export const dedupeVersions = (songs: Song[]): Song[] => {
  const seen = new Set<string>();
  return songs.filter((song) => {
    const key = `${song.name.toLowerCase()}|${song.artists.primary[0]?.id}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

export const searchYouTubeSongs = async (query: string, limit = 20): Promise<Song[]> => {
  const cacheKey = `echowave:yt:${CACHE_VERSION}:search:${query.trim().toLowerCase()}`;
  const cached = readCache<Song[]>(cacheKey, SEARCH_TTL_MS);
  if (cached) return cached;
  const { items } = await call<{ items: SearchItem[] }>('search', {
    part: 'snippet',
    type: 'video',
    q: query,
    maxResults: Math.min(limit + 5, 50),
    videoCategoryId: '10', // Music
    videoEmbeddable: 'true',
    regionCode: 'IN',
    relevanceLanguage: 'te',
    safeSearch: 'moderate',
  });
  const videos = items.filter((item) => item.id.videoId).map((item) => ({
    videoId: item.id.videoId!,
    title: item.snippet.title,
    channelId: item.snippet.channelId,
    channelTitle: item.snippet.channelTitle,
    publishedAt: item.snippet.publishedAt,
    thumbnails: item.snippet.thumbnails,
  }));
  const songs = dedupeVersions(await withDurations(videos)).slice(0, limit);
  writeCache(cacheKey, songs);
  return songs;
};

export const getYouTubePlaylist = async (playlistId = TELUGU_PLAYLIST_ID, limit = 40): Promise<Song[]> => {
  const cacheKey = `echowave:yt:${CACHE_VERSION}:playlist:${playlistId}`;
  const cached = readCache<Song[]>(cacheKey, PLAYLIST_TTL_MS);
  if (cached) return cached.slice(0, limit);
  const { items } = await call<{ items: PlaylistItem[] }>('playlistItems', {
    part: 'snippet',
    playlistId,
    maxResults: 50,
  });
  const videos = items
    // Deleted / private entries have no owner channel.
    .filter((item) => item.snippet.videoOwnerChannelId)
    .map((item) => ({
      videoId: item.snippet.resourceId.videoId,
      title: item.snippet.title,
      channelId: item.snippet.videoOwnerChannelId!,
      channelTitle: item.snippet.videoOwnerChannelTitle ?? '',
      publishedAt: item.snippet.publishedAt,
      thumbnails: item.snippet.thumbnails,
    }));
  const songs = await withDurations(videos);
  writeCache(cacheKey, songs);
  return songs.slice(0, limit);
};

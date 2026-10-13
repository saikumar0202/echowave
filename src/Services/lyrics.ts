import axios from "axios";
import { Song } from "./interfaces";
import { decodeEntities } from "../utils/format";

// LRCLIB is a free, open lyrics database with time-synced lyrics.
// https://lrclib.net/docs
const LRCLIB_HOST = 'https://lrclib.net/api/';
// Matches within this many seconds of the song's length count as the same recording.
const DURATION_TOLERANCE_SECONDS = 4;

export interface LyricLine {
  time: number,
  text: string,
}

export interface Lyrics {
  synced: LyricLine[] | null,
  plain: string | null,
  instrumental: boolean,
}

interface LrclibRecord {
  trackName: string,
  artistName: string,
  duration: number | null,
  instrumental: boolean,
  plainLyrics: string | null,
  syncedLyrics: string | null,
}

const client = axios.create({ baseURL: LRCLIB_HOST, timeout: 10000 });

// "Peelings (From "Pushpa 2 The Rule")" -> "Peelings"
export const cleanTitle = (name: string): string =>
  decodeEntities(name)
    .replace(/\s*[([][^)\]]*[)\]]/g, '')
    .replace(/\s+-\s+.*$/, '')
    .trim();

const LRC_LINE = /^\[(\d+):(\d+(?:\.\d+)?)\](.*)$/;

export const parseLrc = (lrc: string): LyricLine[] =>
  lrc.split('\n').flatMap((line) => {
    const match = LRC_LINE.exec(line.trim());
    if (!match) return [];
    const [, minutes, seconds, text] = match;
    return [{ time: Number(minutes) * 60 + Number(seconds), text: text.trim() }];
  });

const toLyrics = (record: LrclibRecord): Lyrics => ({
  synced: record.syncedLyrics ? parseLrc(record.syncedLyrics) : null,
  plain: record.plainLyrics,
  instrumental: record.instrumental,
});

// Synced beats plain beats "instrumental": an instrumental entry often
// belongs to a karaoke/BGM upload of the same title.
const quality = (record: LrclibRecord) => (record.syncedLyrics ? 3 : record.plainLyrics ? 2 : record.instrumental ? 1 : 0);

const songArtists = (song: Song) =>
  (song.artists?.primary?.length ? song.artists.primary : song.artists?.all ?? [])
    .map((artist) => decodeEntities(artist.name))
    .filter(Boolean);

const durationMatches = (record: LrclibRecord, song: Song) =>
  !song.duration || record.duration == null || Math.abs(record.duration - song.duration) <= DURATION_TOLERANCE_SECONDS;

const getExact = async (title: string, artist: string, duration: number): Promise<LrclibRecord | null> => {
  try {
    const { data } = await client.get<LrclibRecord>('get', {
      params: { track_name: title, artist_name: artist, duration: Math.round(duration) },
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) return null;
    throw error;
  }
};

export const getLyrics = async (song: Song): Promise<Lyrics | null> => {
  const title = cleanTitle(song.name);
  const artists = songArtists(song);

  // Exact lookups first (cheap and accurate); songs are often filed under
  // the second credited artist, so try a couple.
  for (const artist of artists.slice(0, 2)) {
    const record = await getExact(title, artist, song.duration);
    if (record && quality(record) >= 2) return toLyrics(record);
  }

  // Fuzzy search by title, ranked by lyric quality and artist overlap.
  const { data: results } = await client.get<LrclibRecord[]>('search', { params: { track_name: title } });
  const lowerArtists = artists.map((artist) => artist.toLowerCase());
  const score = (record: LrclibRecord) => {
    const credited = record.artistName.toLowerCase();
    const artistBonus = lowerArtists.some((artist) => credited.includes(artist)) ? 10 : 0;
    return artistBonus + quality(record);
  };
  const best = results
    .filter((record) => quality(record) > 0 && durationMatches(record, song))
    .sort((a, b) => score(b) - score(a))[0];
  return best && score(best) >= 10 ? toLyrics(best) : null;
};

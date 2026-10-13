// Audius response shapes and adapters into the app's Song/Album/Artist models,
// so the UI doesn't depend on any one music provider.
import { Album, Artist, ArtistBase, Artists, Song, URLFormat } from "./interfaces";
import { streamUrl } from "./api";

type ImageSizes = (Partial<Record<'150x150' | '480x480' | '1000x1000', string>> & { mirrors?: string[] }) | null | undefined;

export interface AudiusUser {
  id: string,
  name: string,
  handle: string,
  bio?: string | null,
  is_verified?: boolean,
  follower_count?: number,
  track_count?: number,
  album_count?: number,
  profile_picture?: ImageSizes,
}

export interface AudiusTrack {
  id: string,
  title: string,
  duration: number,
  genre?: string | null,
  mood?: string | null,
  release_date?: string | null,
  play_count?: number,
  permalink?: string,
  artwork?: ImageSizes,
  user: AudiusUser,
  is_streamable?: boolean,
  is_delete?: boolean,
  access?: { stream?: boolean },
}

export interface AudiusPlaylist {
  id: string,
  playlist_name: string,
  description?: string | null,
  is_album?: boolean,
  release_date?: string | null,
  created_at?: string | null,
  track_count?: number,
  total_play_count?: number,
  permalink?: string,
  artwork?: ImageSizes,
  user: AudiusUser,
  access?: { stream?: boolean },
}

const SITE = 'https://audius.co';

// Neutral cover for items without artwork.
const PLACEHOLDER_ART = `data:image/svg+xml;utf8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">'
  + '<stop offset="0" stop-color="#2b2f36"/><stop offset="1" stop-color="#14161a"/></linearGradient></defs>'
  + '<rect width="100" height="100" fill="url(#g)"/><path d="M42 30v30.5a9 9 0 1 0 6 8.5V42h16v-12z" fill="#5d6570"/></svg>',
)}`;

// [small, medium, large], matching what pickImage() expects.
export const toImages = (sizes: ImageSizes, placeholder = true): URLFormat[] => {
  const small = sizes?.['150x150'];
  const medium = sizes?.['480x480'] ?? small;
  const large = sizes?.['1000x1000'] ?? medium;
  if (!small && !medium && !large) {
    return placeholder ? ['150x150', '480x480', '1000x1000'].map((quality) => ({ quality, url: PLACEHOLDER_ART })) : [];
  }
  const mirrors = sizes?.mirrors?.length ? sizes.mirrors : undefined;
  return [
    { quality: '150x150', url: (small ?? medium ?? large)!, mirrors },
    { quality: '480x480', url: (medium ?? large)!, mirrors },
    { quality: '1000x1000', url: large!, mirrors },
  ];
};

const yearOf = (date?: string | null) => (date ? new Date(date).getFullYear() : NaN);

export const toArtistBase = (user: AudiusUser): ArtistBase => ({
  id: user.id,
  name: user.name,
  role: 'primary_artists',
  type: 'artist',
  image: toImages(user.profile_picture, false),
  url: `${SITE}/${user.handle}`,
});

const toArtists = (user: AudiusUser): Artists => {
  const artist = toArtistBase(user);
  return { primary: [artist], featured: [], all: [artist] };
};

// Gated (paid / follower-only) or removed tracks can't be streamed here.
export const isPlayable = (track: AudiusTrack) =>
  !track.is_delete && track.is_streamable !== false && track.access?.stream !== false;

export const toSong = (track: AudiusTrack): Song => {
  const year = yearOf(track.release_date);
  return {
    id: track.id,
    name: track.title,
    type: 'song',
    year: Number.isNaN(year) ? '' : String(year),
    releaseDate: track.release_date ?? null,
    duration: track.duration,
    label: '',
    explicitContent: false,
    playCount: track.play_count ?? 0,
    language: '',
    hasLyrics: false,
    lyricsId: null,
    url: track.permalink ? `${SITE}${track.permalink}` : SITE,
    copyright: '',
    genre: track.genre ?? undefined,
    // Audius tracks don't belong to an album; the genre is shown instead.
    album: { id: '', name: track.genre ?? '', url: '' },
    artists: toArtists(track.user),
    image: toImages(track.artwork),
    downloadUrl: [{ quality: 'stream', url: streamUrl(track.id) }],
  };
};

export const toSongs = (tracks: AudiusTrack[]): Song[] => tracks.filter(isPlayable).map(toSong);

export const toAlbum = (playlist: AudiusPlaylist, tracks?: AudiusTrack[]): Album => {
  const songs = tracks ? toSongs(tracks) : undefined;
  return {
    id: playlist.id,
    name: playlist.playlist_name,
    description: playlist.description ?? '',
    url: playlist.permalink ? `${SITE}${playlist.permalink}` : SITE,
    year: yearOf(playlist.release_date ?? playlist.created_at),
    type: playlist.is_album ? 'album' : 'playlist',
    playCount: playlist.total_play_count != null ? String(playlist.total_play_count) : null,
    language: '',
    explicitContent: false,
    artists: toArtists(playlist.user),
    image: toImages(playlist.artwork),
    songCount: songs?.length ?? playlist.track_count,
    songs,
  };
};

export const toArtist = (
  user: AudiusUser,
  extra: { topSongs: Song[], topAlbums: Album[], similarArtists: ArtistBase[] },
): Artist => ({
  ...toArtistBase(user),
  followerCount: user.follower_count ?? null,
  fanCount: null,
  isVerified: user.is_verified ?? false,
  dominantLanguage: null,
  dominantType: 'artist',
  bio: user.bio ? [{ text: user.bio, title: null, sequence: 0 }] : null,
  dob: null,
  fb: null,
  twitter: null,
  wiki: null,
  availableLanguages: [],
  isRadioPresent: null,
  topSongs: extra.topSongs,
  topAlbums: extra.topAlbums,
  singles: null,
  // The UI lists these as cards; only the base fields are used.
  similarArtists: extra.similarArtists as Artist[],
});

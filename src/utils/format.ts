import { Artists, URLFormat } from "../Services/interfaces";

const entityParser = typeof DOMParser !== 'undefined' ? new DOMParser() : null;

// The API returns names with HTML entities (e.g. `&quot;`). Decode them as
// plain text instead of injecting the raw HTML into the page.
export const decodeEntities = (value: string | null | undefined): string => {
  if (!value) return '';
  if (!value.includes('&') || !entityParser) return value;
  return entityParser.parseFromString(value, 'text/html').documentElement.textContent ?? value;
};

export const formatTime = (timeInSeconds: number | null | undefined): string => {
  if (!timeInSeconds || !Number.isFinite(timeInSeconds) || timeInSeconds < 0) return '0:00';
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export const artistNames = (artists: Artists | undefined, fallback = 'Unknown artist'): string => {
  const list = artists?.primary?.length ? artists.primary : artists?.all ?? [];
  const names = list.map((artist) => decodeEntities(artist.name)).filter(Boolean);
  return names.length ? names.join(', ') : fallback;
};

type ImageSize = 'small' | 'medium' | 'large';
const IMAGE_INDEX: Record<ImageSize, number> = { small: 0, medium: 1, large: 2 };

// Images come as [50x50, 150x150, 500x500]; fall back to whatever exists.
export const pickImage = (images: URLFormat[] | undefined, size: ImageSize = 'medium'): string => {
  if (!images?.length) return '';
  return (images[IMAGE_INDEX[size]] ?? images[images.length - 1]).url;
};

// Audio comes as [12, 48, 96, 160, 320] kbps. 160kbps is a good balance
// between quality and mobile data use.
export const pickAudio = (urls: URLFormat[] | undefined, preferred = '160kbps'): string => {
  if (!urls?.length) return '';
  return (urls.find((u) => u.quality === preferred) ?? urls[urls.length - 1]).url;
};

export const greeting = (date = new Date()): string => {
  const hour = date.getHours();
  if (hour < 5) return 'Good night';
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

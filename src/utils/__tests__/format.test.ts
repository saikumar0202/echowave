import { artistNames, decodeEntities, formatTime, pickAudio, pickImage } from "../format";
import { Artists } from "../../Services/interfaces";

describe('decodeEntities', () => {
  it('decodes HTML entities as plain text', () => {
    expect(decodeEntities('Love Me (From &quot;Fifty Shades&quot;)')).toBe('Love Me (From "Fifty Shades")');
    expect(decodeEntities('Tom &amp; Jerry')).toBe('Tom & Jerry');
  });

  it('never turns markup into elements', () => {
    expect(decodeEntities('&lt;img src=x onerror=alert(1)&gt;')).toBe('<img src=x onerror=alert(1)>');
  });

  it('handles empty values', () => {
    expect(decodeEntities(undefined)).toBe('');
    expect(decodeEntities(null)).toBe('');
  });
});

describe('formatTime', () => {
  it.each([
    [0, '0:00'],
    [5, '0:05'],
    [65, '1:05'],
    [329.7, '5:29'],
    [NaN, '0:00'],
    [Infinity, '0:00'],
  ])('formats %p as %p', (input, expected) => {
    expect(formatTime(input)).toBe(expected);
  });
});

describe('artistNames', () => {
  const artist = (name: string) => ({ id: name, name, role: '', image: [], type: 'artist', url: '' });

  it('joins primary artists', () => {
    const artists: Artists = { primary: [artist('A'), artist('B')], featured: [], all: [] };
    expect(artistNames(artists)).toBe('A, B');
  });

  it('falls back to all artists, then a placeholder', () => {
    expect(artistNames({ primary: [], featured: [], all: [artist('C')] })).toBe('C');
    expect(artistNames(undefined)).toBe('Unknown artist');
  });
});

describe('media pickers', () => {
  const images = [
    { quality: '50x50', url: 'small' },
    { quality: '150x150', url: 'medium' },
    { quality: '500x500', url: 'large' },
  ];

  it('picks image sizes with fallback', () => {
    expect(pickImage(images, 'large')).toBe('large');
    expect(pickImage(images.slice(0, 1), 'large')).toBe('small');
    expect(pickImage([], 'large')).toBe('');
  });

  it('prefers 160kbps audio and falls back to the best available', () => {
    expect(pickAudio([{ quality: '96kbps', url: 'a' }, { quality: '160kbps', url: 'b' }])).toBe('b');
    expect(pickAudio([{ quality: '48kbps', url: 'a' }, { quality: '96kbps', url: 'c' }])).toBe('c');
    expect(pickAudio(undefined)).toBe('');
  });
});

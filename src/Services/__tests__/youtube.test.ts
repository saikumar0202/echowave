import { cleanVideoTitle, dedupeVersions, isNonSong, parseIsoDuration, toYouTubeSong } from "../youtube";
import { pickImage } from "../../utils/format";

describe('YouTube helpers', () => {
  it('parses ISO 8601 durations', () => {
    expect(parseIsoDuration('PT4M16S')).toBe(256);
    expect(parseIsoDuration('PT1H2M3S')).toBe(3723);
    expect(parseIsoDuration('PT45S')).toBe(45);
    expect(parseIsoDuration('P0D')).toBe(0);
    expect(parseIsoDuration('nonsense')).toBe(0);
  });

  // Real titles from T-Series Telugu / Aditya Music uploads.
  it.each([
    ['YAALALO YAALALO Lyrical | Irumudi | Ravi Teja | GV Prakash | Hesham', 'Yaalalo Yaalalo'],
    ['Full Video: Yaalalo Yaalalo | Irumudi | Ravi Teja | GV Prakash | Hesham', 'Yaalalo Yaalalo'],
    ['IRUMUDI KATTU 8K VIDEO | RAVI TEJA | GV PRAKASH | ANANTHU | SHIVA NIRVANA', 'Irumudi Kattu'],
    ['IRUMUDI KATTU VIDEO SONG | RAVI TEJA | GV PRAKASH | ANANTHU', 'Irumudi Kattu'],
    ['IRUMUDI KATTU Video: Irumudi | Ravi Teja | GV Prakash', 'Irumudi Kattu'],
    ['IRUMUDI KATTU (Song): Ravi Teja | GV Prakash | Ananthu | Shiva Nirvana', 'Irumudi Kattu'],
    ['IRUMUDI KATTU: Ravi Teja | GV Prakash Kumar | Ananthu', 'Irumudi Kattu'],
    ['MALLEPOOLA PALLAKI (Song) | Ravi Teja | GV Prakash | Dappu Srinu', 'Mallepoola Pallaki'],
    ['8K Video: YAALALO YAALALO | Irumudi | Ravi Teja | GV Prakash', 'Yaalalo Yaalalo'],
    ['Full Video: IRUMUDI KATTU : Irumudi | Ravi Teja | GV Prakash', 'Irumudi Kattu'],
    ['Irumudi: Irumudi Bandho (Full Video) | Ravi Teja | G.V. Prakash Kumar', 'Irumudi Bandho'],
    ['MANASU THANNALA (Song): Irumudi Kattu | Ravi Teja | GV Prakash', 'Manasu Thannala'],
    ['MALLEPOOLA PALLAKI (Film Version) | Irumudi', 'Mallepoola Pallaki (Film Version)'],
    ['Samajavaragamana Full Video Song (4K) | Ala Vaikunthapurramuloo | Allu Arjun', 'Samajavaragamana'],
    ['Butta Bomma &amp; Friends (Telugu Lyrical)', 'Butta Bomma & Friends'],
    ['#Vachinde Full Video Song || Fidaa Full Video Songs || Varun Tej, Sai Pallavi', 'Vachinde'],
    ['ఇరుముడి సినిమాలోనే కాదు #Irumudi #RaviTeja', 'ఇరుముడి సినిమాలోనే కాదు'],
  ])('cleans %p', (raw, name) => {
    expect(cleanVideoTitle(raw)).toBe(name);
  });

  it('spots uploads that are not songs', () => {
    expect(isNonSong('Irumudi Kattu Official Trailer | Ravi Teja')).toBe(true);
    expect(isNonSong('Irumudi Full Album | Ravi Teja')).toBe(true);
    expect(isNonSong('YAALALO YAALALO Lyrical | Irumudi')).toBe(false);
  });

  it('maps a video into a playable YouTube song', () => {
    const song = toYouTubeSong({
      videoId: 'WT-wrwlN144',
      title: 'YAALALO YAALALO Lyrical | Irumudi | Ravi Teja',
      channelId: 'UCabc',
      channelTitle: 'T-Series Telugu',
      publishedAt: '2026-09-01T10:00:00Z',
      thumbnails: { medium: { url: 'mq.jpg' }, high: { url: 'hq.jpg' } },
    }, 256);
    expect(song).toMatchObject({
      id: 'yt:WT-wrwlN144', source: 'youtube', videoId: 'WT-wrwlN144', name: 'Yaalalo Yaalalo',
      duration: 256, year: '2026', url: 'https://www.youtube.com/watch?v=WT-wrwlN144',
      album: { name: 'T-Series Telugu' },
    });
    expect(song.artists.primary[0]).toMatchObject({ id: 'yt-channel:UCabc', name: 'T-Series Telugu' });
    expect(pickImage(song.image, 'small')).toBe('mq.jpg');
  });

  it('keeps one version of a song per channel', () => {
    const video = (videoId: string, title: string, channelId: string) =>
      toYouTubeSong({ videoId, title, channelId, channelTitle: channelId, publishedAt: '2026-01-01', thumbnails: {} }, 200);
    const songs = dedupeVersions([
      video('a', 'IRUMUDI KATTU Lyrical | Irumudi', 'telugu'),
      video('b', 'IRUMUDI KATTU 8K VIDEO | RAVI TEJA', 'telugu'),
      video('c', 'IRUMUDI KATTU Video: Irumudi', 'tamil'),
    ]);
    expect(songs.map((song) => song.videoId)).toEqual(['a', 'c']);
  });
});

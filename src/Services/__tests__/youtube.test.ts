import { cleanVideoTitle, parseIsoDuration, toYouTubeSong } from "../youtube";
import { pickImage } from "../../utils/format";

describe('YouTube helpers', () => {
  it('parses ISO 8601 durations', () => {
    expect(parseIsoDuration('PT4M16S')).toBe(256);
    expect(parseIsoDuration('PT1H2M3S')).toBe(3723);
    expect(parseIsoDuration('PT45S')).toBe(45);
    expect(parseIsoDuration('P0D')).toBe(0);
    expect(parseIsoDuration('nonsense')).toBe(0);
  });

  it.each([
    ['YAALALO YAALALO Lyrical | Irumudi | Ravi Teja | GV Prakash | Hesham', 'Yaalalo Yaalalo', 'Irumudi'],
    ['Full Video: Yaalalo Yaalalo | Irumudi | Ravi Teja | GV Prakash | Hesham', 'Yaalalo Yaalalo', 'Irumudi'],
    ['IRUMUDI KATTU 8K VIDEO | RAVI TEJA | GV PRAKASH | ANANTHU | SHIVA NIRVANA', 'Irumudi Kattu', 'RAVI TEJA'],
    ['IRUMUDI KATTU Video: Irumudi | Ravi Teja | GV Prakash', 'Irumudi Kattu', 'Irumudi'],
    ['Samajavaragamana Full Video Song (4K) | Ala Vaikunthapurramuloo | Allu Arjun', 'Samajavaragamana', 'Ala Vaikunthapurramuloo'],
    ['Butta Bomma &amp; Friends (Telugu Lyrical)', 'Butta Bomma & Friends', null],
  ])('cleans %p', (raw, name, movie) => {
    expect(cleanVideoTitle(raw)).toEqual({ name, movie });
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
      album: { name: 'Irumudi' },
    });
    expect(song.artists.primary[0]).toMatchObject({ id: 'yt-channel:UCabc', name: 'T-Series Telugu' });
    expect(pickImage(song.image, 'small')).toBe('mq.jpg');
  });
});

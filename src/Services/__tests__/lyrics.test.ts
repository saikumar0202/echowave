import { cleanTitle, parseLrc } from "../lyrics";
import { activeLineIndex } from "../../components/Lyrics";

jest.mock('axios', () => ({ create: () => ({ get: jest.fn() }), isAxiosError: () => false }));

describe('lyrics helpers', () => {
  it('strips soundtrack and version suffixes from titles', () => {
    expect(cleanTitle('Peelings (From &quot;Pushpa 2 The Rule&quot;)')).toBe('Peelings');
    expect(cleanTitle('Mann Mera (Original Version)')).toBe('Mann Mera');
    expect(cleanTitle('Pehle Bhi Main - Lofi Mix')).toBe('Pehle Bhi Main');
    expect(cleanTitle('Tum Hi Ho')).toBe('Tum Hi Ho');
  });

  it('parses LRC lines and skips metadata', () => {
    const lines = parseLrc('[ar: Someone]\n[00:11.20] Hum tere bin\n[01:02.5]Second\n[02:00.00]\nnot a line');
    expect(lines).toEqual([
      { time: 11.2, text: 'Hum tere bin' },
      { time: 62.5, text: 'Second' },
      { time: 120, text: '' },
    ]);
  });

  it('finds the line being sung', () => {
    const lines = [{ time: 10, text: 'a' }, { time: 20, text: 'b' }, { time: 30, text: 'c' }];
    expect(activeLineIndex(lines, 5)).toBe(-1);
    expect(activeLineIndex(lines, 9.8)).toBe(0);
    expect(activeLineIndex(lines, 25)).toBe(1);
    expect(activeLineIndex(lines, 100)).toBe(2);
  });
});

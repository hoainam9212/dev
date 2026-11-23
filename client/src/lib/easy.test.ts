import { describe, expect, it } from 'vitest';
import { nextLessonId, visibleLessons } from '@office-neko/shared';
import { LESSONS, TRACKS } from '../content';
import { EASY_TRACK_ORDER, tracksFor } from './easy';

describe('tracksFor', () => {
  it('tắt chế độ dễ dùng thì giữ nguyên TRACKS', () => {
    expect(tracksFor(false)).toBe(TRACKS);
  });

  it('bật thì Máy tính → Gõ phím → PowerPoint → Word → Excel, order 0..4, không đổi TRACKS gốc', () => {
    const before = TRACKS.map((t) => [t.id, t.order]);
    const easy = tracksFor(true);
    expect(easy.map((t) => t.id)).toEqual(['basics', 'typing', 'ppt', 'word', 'excel']);
    expect(easy.map((t) => t.id)).toEqual([...EASY_TRACK_ORDER]);
    expect(easy.map((t) => t.order)).toEqual([0, 1, 2, 3, 4]);
    expect(TRACKS.map((t) => [t.id, t.order])).toEqual(before);
  });

  it('học xong Làm quen máy tính (Windows) thì sang Gõ phím, xong Gõ phím thì sang PowerPoint', () => {
    const easy = tracksFor(true);
    const last = (i: number) => visibleLessons(easy[i]!, LESSONS, 'win').at(-1)!.id;
    const first = (i: number) => visibleLessons(easy[i]!, LESSONS, 'win')[0]!.id;
    expect(nextLessonId(easy, LESSONS, 'win', last(0))).toBe(first(1));
    expect(first(1)).toMatch(/^typing\./);
    expect(nextLessonId(easy, LESSONS, 'win', last(1))).toBe(first(2));
    expect(first(2)).toMatch(/^ppt\./);
  });
});

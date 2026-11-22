import { describe, expect, it } from 'vitest';
import { nextLessonId, visibleLessons } from '@office-neko/shared';
import { LESSONS, TRACKS } from '../content';
import { EASY_TRACK_ORDER, tracksFor } from './easy';

describe('tracksFor', () => {
  it('tắt chế độ dễ dùng thì giữ nguyên TRACKS', () => {
    expect(tracksFor(false)).toBe(TRACKS);
  });

  it('bật thì chỉ còn Máy tính → PowerPoint → Word → Excel, order 0..3, không đổi TRACKS gốc', () => {
    const before = TRACKS.map((t) => [t.id, t.order]);
    const easy = tracksFor(true);
    expect(easy.map((t) => t.id)).toEqual(['basics', 'ppt', 'word', 'excel']);
    expect(easy.map((t) => t.id)).toEqual([...EASY_TRACK_ORDER]);
    expect(easy.map((t) => t.order)).toEqual([0, 1, 2, 3]);
    expect(TRACKS.map((t) => [t.id, t.order])).toEqual(before);
  });

  it('bài tiếp theo sau bài cuối của Làm quen máy tính (Windows) là bài đầu của PowerPoint', () => {
    const easy = tracksFor(true);
    const basics = visibleLessons(easy[0]!, LESSONS, 'win');
    const lastBasics = basics[basics.length - 1]!.id;
    const firstPpt = visibleLessons(easy[1]!, LESSONS, 'win')[0]!.id;
    expect(nextLessonId(easy, LESSONS, 'win', lastBasics)).toBe(firstPpt);
  });
});

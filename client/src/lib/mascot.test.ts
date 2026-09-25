import { levelName, pickMascotLine } from './mascot';
import { en } from '../i18n/en';
import { vi as viDict } from '../i18n/vi';

it('names levels and clamps', () => {
  expect(levelName(1)).toMatch(/Tân binh/);
  expect(levelName(99)).toMatch(/Sensei/);
});

it('prioritises due cards, then streak, then time of day', () => {
  expect(pickMascotLine({ hour: 9, streak: 10, due: 5 }).vi).toMatch(/5 thẻ/);
  expect(pickMascotLine({ hour: 9, streak: 10, due: 0 }).vi).toMatch(/10 ngày/);
  expect(pickMascotLine({ hour: 9, streak: 1, due: 0 }).vi).toMatch(/buổi sáng/);
  expect(pickMascotLine({ hour: 20, streak: 1, due: 0 }).vi).toMatch(/buổi tối/);
});

it('names levels in English from the dictionary and has 7 names per language', () => {
  expect(levelName(0, en)).toBe(en.progress.levelNames[0]);
  expect(levelName(0, en)).toMatch(/Rookie/);
  expect(viDict.progress.levelNames).toHaveLength(7);
  expect(en.progress.levelNames).toHaveLength(7);
});

it('returns lines with both vi and en text', () => {
  const line = pickMascotLine({ hour: 9, streak: 10, due: 1 });
  expect(line.vi).toMatch(/1 thẻ/);
  expect(line.en).toBe("Don't forget today's 1 review card!");
});

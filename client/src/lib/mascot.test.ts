import { levelName, pickMascotLine } from './mascot';

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

import { useProgress } from './progress';

beforeEach(() => {
  localStorage.clear();
  useProgress.setState({ xp: 0, streak: 0, lastStudyDay: null });
});

it('addXp increases xp and updates streak once per day', () => {
  useProgress.getState().addXp(10, '2026-09-19');
  useProgress.getState().addXp(5, '2026-09-19');
  expect(useProgress.getState().xp).toBe(15);
  expect(useProgress.getState().streak).toBe(1);
  useProgress.getState().addXp(1, '2026-09-20');
  expect(useProgress.getState().streak).toBe(2);
  expect(useProgress.getState().lastStudyDay).toBe('2026-09-20');
});

import { render, screen, act } from '@testing-library/react';
import { Celebration } from './Celebration';
import { useProgress } from '../store/progress';

beforeEach(() => useProgress.setState({ xp: 90, streak: 2, lastStudyDay: null }));

it('shows a toast when the level increases', () => {
  render(<Celebration />);
  expect(screen.queryByTestId('celebration-toast')).not.toBeInTheDocument();
  act(() => useProgress.getState().addXp(20, '2026-09-19'));
  expect(screen.getByTestId('celebration-toast')).toHaveTextContent('Lên cấp 2');
});

it('shows a toast on a streak milestone', () => {
  useProgress.setState({ xp: 0, streak: 6, lastStudyDay: '2026-09-18' });
  render(<Celebration />);
  act(() => useProgress.getState().addXp(1, '2026-09-19'));
  expect(screen.getByTestId('celebration-toast')).toHaveTextContent('Chuỗi 7 ngày');
});

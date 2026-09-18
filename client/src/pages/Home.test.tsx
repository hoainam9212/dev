import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Home } from './Home';
import { useProgress } from '../store/progress';

it('shows greeting, streak and xp', () => {
  useProgress.setState({ xp: 150, streak: 4, lastStudyDay: '2026-09-19' });
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  );
  expect(screen.getByRole('img', { name: /Sakura/ })).toBeInTheDocument();
  expect(screen.getByText(/4 ngày/)).toBeInTheDocument();
  expect(screen.getByText(/Cấp 2/)).toBeInTheDocument();
});

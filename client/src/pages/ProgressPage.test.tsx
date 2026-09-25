import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ProgressPage } from './ProgressPage';
import { useProgress } from '../store/progress';
import { withLang } from '../test/lang';

it('shows the stat tiles in English', async () => {
  useProgress.setState({ xp: 0, streak: 3, lastStudyDay: null });
  withLang('en');
  render(
    <MemoryRouter>
      <ProgressPage />
    </MemoryRouter>,
  );
  expect(await screen.findByText('Day streak')).toBeInTheDocument();
  expect(screen.getByText('Level 1')).toBeInTheDocument();
  expect(screen.getByText('Recent sessions')).toBeInTheDocument();
});

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AccountCard } from './AccountCard';
import { withLang } from '../test/lang';

it('shows the signed-out call to action in English', () => {
  withLang('en');
  render(
    <MemoryRouter>
      <AccountCard />
    </MemoryRouter>,
  );
  expect(screen.getByText(/Sign in to sync your progress/)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Sign in' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Sign up' })).toBeInTheDocument();
});

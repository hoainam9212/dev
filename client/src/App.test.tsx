import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

it('renders the app title on the home route', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );
  expect(screen.getByRole('heading', { level: 1, name: 'Nihongo Sensei' })).toBeInTheDocument();
});

it('renders a placeholder page for a module route', () => {
  render(
    <MemoryRouter initialEntries={['/kanji']}>
      <App />
    </MemoryRouter>,
  );
  expect(screen.getByRole('heading', { level: 1, name: 'Kanji' })).toBeInTheDocument();
});

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

it('renders the home page with the mascot on the home route', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );
  expect(screen.getByRole('img', { name: /Sakura/ })).toBeInTheDocument();
  expect(screen.getAllByRole('link', { name: /Tất cả bài học/ }).length).toBeGreaterThan(0);
});

it('"Continue" with nothing to go back to opens the lessons', () => {
  localStorage.removeItem('ns.resume');
  render(
    <MemoryRouter initialEntries={['/continue']}>
      <App />
    </MemoryRouter>,
  );
  expect(screen.getByRole('heading', { level: 1, name: 'Học' })).toBeInTheDocument();
});

it('renders a placeholder page for a module route', () => {
  render(
    <MemoryRouter initialEntries={['/kanji']}>
      <App />
    </MemoryRouter>,
  );
  expect(screen.getByRole('heading', { level: 1, name: 'Kanji' })).toBeInTheDocument();
});

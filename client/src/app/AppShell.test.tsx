import { render, screen, within } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AppShell } from './AppShell';
import { NAV } from './nav';
import { vi } from '../i18n/vi';

const shell = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="*" element={<p>PAGE</p>} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );

it('renders navigation links and the outlet; every page stays one link away on a large screen', () => {
  shell('/vocab');
  expect(screen.getByText('PAGE')).toBeInTheDocument();
  const side = screen.getByRole('navigation', { name: vi.nav.mainAria });
  for (const item of NAV) {
    expect(within(side).getAllByRole('link', { name: new RegExp(vi.nav[item.key].label) }).length).toBeGreaterThan(0);
  }
});

it('the phone bar has five groups and no "more" menu', () => {
  shell('/');
  const bar = screen.getByRole('navigation', { name: vi.nav.mobileAria });
  expect(within(bar).getAllByRole('link').map((a) => a.textContent)).toEqual(['🏠Trang chủ', '📚Học', '🏅BJT', '🔁Ôn tập', '👤Tôi']);
  expect(within(bar).queryByRole('button')).toBeNull();
});

it.each([
  ['/kanji', 'Học'],
  ['/business', 'BJT'],
  ['/bjt/sach', 'BJT'],
  ['/settings', 'Tôi'],
  ['/progress', 'Tôi'],
])('on %s the phone bar marks %s', (path, group) => {
  shell(path);
  const bar = screen.getByRole('navigation', { name: vi.nav.mobileAria });
  expect(within(bar).getByRole('link', { current: 'page' })).toHaveTextContent(group);
});

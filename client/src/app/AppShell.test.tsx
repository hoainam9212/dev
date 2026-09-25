import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AppShell } from './AppShell';
import { NAV } from './nav';
import { vi } from '../i18n/vi';

it('renders navigation links and the outlet', () => {
  render(
    <MemoryRouter initialEntries={['/vocab']}>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/vocab" element={<p>VOCAB PAGE</p>} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
  expect(screen.getByText('VOCAB PAGE')).toBeInTheDocument();
  for (const item of NAV) {
    expect(screen.getAllByRole('link', { name: new RegExp(vi.nav[item.key].label) }).length).toBeGreaterThan(0);
  }
});

// A home-screen shortcut opens its page: when it starts the app, and when it is tapped while the app is open.
import { act, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { expect, it, vi } from 'vitest';

const { native, listeners } = vi.hoisted(() => {
  const listeners: Record<string, (e: { route?: string }) => void> = {};
  return {
    listeners,
    native: {
      take: vi.fn(async () => ({ route: '/bjt/sach' })),
      addListener: vi.fn(async (ev: string, fn: (e: { route?: string }) => void) => {
        listeners[ev] = fn;
        return { remove: async () => {} };
      }),
    },
  };
});
vi.mock('@capacitor/core', () => ({ Capacitor: { isNativePlatform: () => true }, registerPlugin: () => native }));

import { useLaunchRoutes } from './launch';

function Probe() {
  useLaunchRoutes();
  return null;
}

it('goes to the route of the shortcut that started the app, then follows later taps; ignores anything else', async () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <Probe />
      <Routes>
        <Route path="/bjt/sach" element={<p>BOOKS</p>} />
        <Route path="/review" element={<p>REVIEW</p>} />
        <Route path="*" element={<p>OTHER</p>} />
      </Routes>
    </MemoryRouter>,
  );
  expect(await screen.findByText('BOOKS')).toBeInTheDocument();
  await act(async () => listeners.route!({ route: '/review' }));
  expect(screen.getByText('REVIEW')).toBeInTheDocument();
  await act(async () => listeners.route!({ route: 'https://evil.example/x' }));
  expect(screen.getByText('REVIEW')).toBeInTheDocument();
});

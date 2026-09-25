import { act, render, renderHook, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { afterEach, expect, it } from 'vitest';
import { useSettings } from '../store/settings';
import { AppShell } from '../app/AppShell';
import { useT, useSyncHtmlLang } from './index';
import { vi as viDict } from './vi';
import { en } from './en';

afterEach(() => {
  act(() => useSettings.getState().setLang('vi'));
});

function renderShell() {
  return render(
    <MemoryRouter initialEntries={['/vocab']}>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/vocab" element={<p>VOCAB PAGE</p>} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
}

it('defaults to Vietnamese', () => {
  const { result } = renderHook(() => useT());
  expect(result.current.nav.home.label).toBe('Trang chủ');
});

it('rehydrates old stored settings without lang to vi and keeps other fields', async () => {
  localStorage.setItem('ns.settings', JSON.stringify({ state: { ttsRate: 1 }, version: 0 }));
  await useSettings.persist.rehydrate();
  expect(useSettings.getState().lang).toBe('vi');
  expect(useSettings.getState().ttsRate).toBe(1);
  localStorage.removeItem('ns.settings');
});

it('setLang(en) switches the dictionary and <html lang>', () => {
  const { result } = renderHook(() => {
    useSyncHtmlLang();
    return useT();
  });
  act(() => useSettings.getState().setLang('en'));
  expect(result.current.nav.home.label).toBe('Home');
  expect(document.documentElement.lang).toBe('en');
});

it('clicking EN in the shell switch turns the sidebar English', () => {
  renderShell();
  expect(screen.getAllByRole('link', { name: /Từ vựng/ }).length).toBeGreaterThan(0);
  fireEvent.click(screen.getAllByRole('tab', { name: 'EN' })[0]!);
  expect(screen.getAllByRole('link', { name: /Vocabulary/ }).length).toBeGreaterThan(0);
  expect(screen.queryByRole('link', { name: /Từ vựng/ })).toBeNull();
});

it('takes the more button and nav aria labels from the dictionary', () => {
  act(() => useSettings.getState().setLang('en'));
  renderShell();
  expect(screen.getByRole('navigation', { name: en.nav.mainAria })).toBeInTheDocument();
  expect(screen.getByRole('navigation', { name: en.nav.mobileAria })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: new RegExp(en.nav.more) })).toBeInTheDocument();
});

it('counts cards with English plurals', () => {
  expect(en.common.cards(0)).toBe('0 cards');
  expect(en.common.cards(1)).toBe('1 card');
  expect(en.common.cards(2)).toBe('2 cards');
  expect(viDict.common.cards(2)).toBe('2 thẻ');
});

it('pluralizes the listening and scenario counts in English', () => {
  expect(en.listening.lessonStats(1, 1, 1)).toBe('1 line · 1 question · 1 dictation sentence');
  expect(en.listening.lessonStats(5, 2, 2)).toBe('5 lines · 2 questions · 2 dictation sentences');
  expect(en.business.scenarioStats(1, 1)).toBe('1 line · 1 is yours');
  expect(en.business.scenarioStats(6, 3)).toBe('6 lines · 3 are yours');
});

import { renderHook, act } from '@testing-library/react';
import { useTheme } from './useTheme';

beforeEach(() => {
  localStorage.clear();
  document.documentElement.removeAttribute('data-theme');
});

it('defaults to system and writes data-theme when set', () => {
  const { result } = renderHook(() => useTheme());
  expect(result.current.theme).toBe('system');
  act(() => result.current.setTheme('dark'));
  expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  expect(localStorage.getItem('ns.theme')).toBe('dark');
  act(() => result.current.setTheme('system'));
  expect(document.documentElement.hasAttribute('data-theme')).toBe(false);
});

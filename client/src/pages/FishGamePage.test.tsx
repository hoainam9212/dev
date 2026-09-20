import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { FISH_WORDS } from '../content/fish-words';
import { FishGamePage } from './FishGamePage';

const renderPage = () =>
  render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <FishGamePage />
    </MemoryRouter>,
  );

describe('fish words', () => {
  it('are short lowercase ascii words', () => {
    expect(FISH_WORDS.length).toBeGreaterThanOrEqual(30);
    for (const w of FISH_WORDS) expect(w).toMatch(/^[a-z]{2,7}$/);
  });
});

describe('FishGamePage', () => {
  it('starts paused with instructions, then accepts typing', () => {
    renderPage();
    expect(screen.getByText(/Gõ đúng chữ trên con cá/)).toBeInTheDocument();
    expect(screen.getByLabelText('3 mạng')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Bắt đầu' }));
    fireEvent.keyDown(window, { key: 'm' });
    fireEvent.keyDown(window, { key: 'e' });
    expect(screen.getByLabelText('Chữ đang gõ')).toHaveTextContent('me');
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.getByLabelText('Chữ đang gõ').textContent).toBe('');
  });

  it('pauses and resumes with the button and ignores keys while paused', () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: 'Bắt đầu' }));
    fireEvent.click(screen.getByRole('button', { name: /Tạm dừng/ }));
    fireEvent.keyDown(window, { key: 'm' });
    expect(screen.getByLabelText('Chữ đang gõ').textContent).toBe('');
    fireEvent.click(screen.getByRole('button', { name: /Chơi tiếp/ }));
    fireEvent.keyDown(window, { key: 'm' });
    expect(screen.getByLabelText('Chữ đang gõ')).toHaveTextContent('m');
  });
});

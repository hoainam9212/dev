import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SettingsPage } from './SettingsPage';
import { withLang } from '../test/lang';

it('shows the card titles and the language row in English', () => {
  withLang('en');
  render(
    <MemoryRouter>
      <SettingsPage />
    </MemoryRouter>,
  );
  for (const title of ['Appearance', 'Voice', 'Backup', 'Data sources'])
    expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
  expect(screen.getByText('Display language')).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 1, name: 'Settings' })).toBeInTheDocument();
});

it('credits the Hán Việt sources, Tatoeba Vietnamese and the Vietnamese translations', () => {
  withLang('vi');
  render(<MemoryRouter><SettingsPage /></MemoryRouter>);
  expect(screen.getByRole('link', { name: 'KANJIDIC2 (vietnam readings)' })).toHaveAttribute('href', 'https://www.edrdg.org/wiki/index.php/KANJIDIC_Project');
  expect(screen.getByRole('link', { name: 'hanviet-pinyin-wordlist' })).toHaveAttribute('href', 'https://github.com/ph0ngp/hanviet-pinyin-wordlist');
  expect(screen.getByRole('link', { name: 'Unihan (variants)' })).toHaveAttribute('href', 'https://www.unicode.org/charts/unihan.html');
  expect(screen.getByRole('link', { name: 'Tatoeba (vie)' })).toHaveAttribute('href', 'https://tatoeba.org/vie');
  expect(screen.getByText(/Bản dịch tiếng Việt/)).toBeInTheDocument();
});

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

import { render, screen } from '@testing-library/react';
import { TtsNotice } from './TtsNotice';
import { withLang } from '../test/lang';

vi.mock('../lib/tts', async (orig) => ({
  ...(await orig<typeof import('../lib/tts')>()),
  onTtsError: (l: (e: 'error') => void) => {
    l('error');
    return () => {};
  },
}));

it('renders the speech error in English', () => {
  withLang('en');
  render(<TtsNotice />);
  expect(screen.getByTestId('tts-notice')).toHaveTextContent(/Couldn't play audio/);
  expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
});

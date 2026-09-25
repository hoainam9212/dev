import { render, screen } from '@testing-library/react';
import { KanaPage } from './KanaPage';
import { clearContentCache } from '../../content/loader';
import { withLang } from '../../test/lang';

vi.mock('../../lib/tts', () => ({ speak: vi.fn(), useStopSpeechOnUnmount: vi.fn() }));

const ch = (kana: string, romaji: string) => ({ kana, romaji, row: 'a', group: 'basic', strokePaths: [] });

beforeEach(() => {
  clearContentCache();
  vi.spyOn(globalThis, 'fetch').mockImplementation(async (input) =>
    String(input).endsWith('/content/kana.json')
      ? new Response(JSON.stringify({ hiragana: [ch('あ', 'a')], katakana: [ch('ア', 'a')] }))
      : new Response('nope', { status: 404 }),
  );
});

it('shows the mode and group tabs in English', async () => {
  withLang('en');
  render(<KanaPage />);
  for (const name of ['Chart', 'Recognize', 'Write', 'Basic', 'Dakuten', 'Yōon', 'All']) {
    expect(await screen.findByRole('tab', { name })).toBeInTheDocument();
  }
});

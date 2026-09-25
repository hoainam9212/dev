import { render, screen, fireEvent } from '@testing-library/react';
import type { ListeningLesson } from '@nihongo/shared';
import { Roleplay } from './Roleplay';
import { clearContentCache } from '../../content/loader';
import { withLang } from '../../test/lang';

vi.mock('../../lib/tts', () => ({ speak: vi.fn(), useStopSpeechOnUnmount: vi.fn() }));

const lessons: ListeningLesson[] = [
  {
    id: 'l-n5-01',
    level: 'N5',
    title: '駅で',
    script: [
      { speaker: 'B', ja: 'いらっしゃいませ。', vi: 'Xin mời vào.', en: 'Welcome.' },
      { speaker: 'A', ja: 'すみません。', vi: 'Xin lỗi.' },
    ],
    questions: [],
    dictation: [],
  },
];

beforeEach(() => {
  clearContentCache();
  vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(JSON.stringify(lessons)));
});
afterEach(() => vi.restoreAllMocks());

it('runs a roleplay with English prompts and results', async () => {
  withLang('en');
  render(<Roleplay level="N5" />);
  expect(await screen.findByText('2 lines')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /駅で/ }));
  expect(screen.getByText('Who do you want to play?')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'A' }));
  expect(screen.getByText(/Turn 1 \/ 2 · You are/)).toBeInTheDocument();
  expect(screen.getByText('Welcome.')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Next →' }));
  expect(screen.getByText('Xin lỗi.')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /Got it/ }));
  expect(screen.getByText('100 points')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Next →' }));
  expect(screen.getByTestId('roleplay-result')).toHaveTextContent('Average score: 100');
  expect(screen.getByRole('button', { name: 'Play again' })).toBeInTheDocument();
});

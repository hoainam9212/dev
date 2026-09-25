import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import type { Grammar } from '@nihongo/shared';
import { SentenceBuilder } from './SentenceBuilder';
import { WritingLog } from './WritingLog';
import { WritingPage } from './WritingPage';
import { db } from '../../db';
import { listWritings, saveWriting } from '../../db/writings';
import { clearContentCache } from '../../content/loader';
import { withLang } from '../../test/lang';

vi.mock('../../lib/tts', () => ({ speak: vi.fn(), useStopSpeechOnUnmount: vi.fn() }));

const g = (vi_?: string): Grammar[] => [
  {
    id: 'g-n5-0001', level: 'N5', title: '〜たい', meaning: 'want to', formation: 'V-stem + たい',
    examples: [{ ja: '日本へ行きたいです。', romaji: '', en: 'I want to go to Japan.', ...(vi_ ? { vi: vi_ } : {}) }],
  },
];

beforeEach(async () => {
  await db.writings.clear();
});

it('shows the writing tabs in English', () => {
  withLang('en');
  clearContentCache();
  vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('{}'));
  render(<WritingPage />);
  for (const tab of ['Kana', 'Kanji', 'Sentences', 'My log']) expect(screen.getByRole('tab', { name: tab })).toBeInTheDocument();
  vi.restoreAllMocks();
});

it('prompts with the Vietnamese example translation when there is one, else English', () => {
  const { unmount } = render(<SentenceBuilder grammar={g('Tôi muốn đi Nhật.')} total={1} />);
  expect(screen.getByText('Tôi muốn đi Nhật.')).toBeInTheDocument();
  unmount();
  render(<SentenceBuilder grammar={g()} total={1} />);
  expect(screen.getByText('I want to go to Japan.')).toBeInTheDocument();
});

it('keeps both prompt languages on the saved sentence and shows the one for the display language', async () => {
  render(<SentenceBuilder grammar={g('Tôi muốn đi Nhật.')} total={1} />);
  fireEvent.change(screen.getByLabelText('Câu tiếng Nhật'), { target: { value: '日本へ行きたい' } });
  fireEvent.click(screen.getByRole('button', { name: 'Kiểm tra' }));
  await waitFor(async () => expect(await listWritings()).toHaveLength(1));
  expect((await listWritings())[0]).toMatchObject({ prompt: 'I want to go to Japan.', promptVi: 'Tôi muốn đi Nhật.' });
});

it('shows English chrome and an en-US date in the writing log', async () => {
  withLang('en');
  const { unmount } = render(<WritingLog />);
  expect(await screen.findByText('No sentences saved yet.')).toBeInTheDocument();
  unmount();
  await saveWriting(
    { grammarId: 'g-n5-0001', grammarTitle: '〜たい', level: 'N5', prompt: 'I want to go to Japan.', promptVi: 'Tôi muốn đi Nhật.', expected: '日本へ行きたいです。', typed: '日本へ行きたい', score: 1, ok: true },
    new Date('2026-09-20T01:00:00.000Z'),
  );
  render(<WritingLog />);
  expect(await screen.findByText('日本へ行きたい')).toBeInTheDocument();
  expect(screen.getByText(/September 20, 2026|09\/20\/2026/)).toBeInTheDocument();
  expect(screen.getByText('I want to go to Japan.')).toBeInTheDocument();
  expect(screen.getByText('1 sentence')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Delete this sentence' })).toBeInTheDocument();
});

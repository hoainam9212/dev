import { act, fireEvent, render, screen } from '@testing-library/react';
import type { BjtItem } from '@nihongo/shared';

const { sequences } = vi.hoisted(() => ({ sequences: [] as string[][] }));
vi.mock('../../lib/tts', () => ({
  canSpeak: () => true,
  useStopSpeechOnUnmount: () => {},
  speakSequence: (lines: string[]) => {
    sequences.push(lines);
    return { cancel: () => {}, done: Promise.resolve() };
  },
}));

import { BjtRunner } from './BjtRunner';
import { useBjt } from '../../store/bjt';
import { vi as dict } from '../../i18n/vi';

const q = (id: string, answer: number) => ({ id, prompt: `問 ${id}`, choices: ['あ', 'い', 'う', 'え'], answer, explain: `giải thích ${id}` });
const ITEMS: BjtItem[] = [
  {
    id: 'h1',
    section: 'hatsugen',
    set: 'demo',
    spokenChoices: true,
    script: [{ speaker: '状況', ja: '何と言いますか。', vi: 'Bạn nói gì?' }],
    questions: [q('h1-q1', 1)],
    points: [{ ja: '席を外す', reading: 'せきをはずす', vi: 'rời chỗ' }],
  },
  { id: 'g1', section: 'goi', set: 'demo', questions: [q('g1-q1', 0)] },
];

beforeEach(() => {
  sequences.length = 0;
  useBjt.setState({ answers: {}, runs: {}, startDate: null });
});

it('practice: plays the recording with the spoken choices, hides them until answered, then explains', () => {
  render(<BjtRunner title="T" items={ITEMS} onExit={() => {}} />);
  expect(sequences.at(-1)).toEqual(['何と言いますか。', '1番。あ', '2番。い', '3番。う', '4番。え']);
  // choices are numbers only
  expect(screen.queryByText(/い/)).toBeNull();
  expect(screen.queryByTestId('bjt-feedback')).toBeNull();

  fireEvent.click(screen.getByRole('button', { name: '3' }));
  expect(screen.getByTestId('bjt-feedback')).toHaveTextContent('giải thích h1-q1');
  expect(screen.getByTestId('bjt-feedback')).toHaveTextContent('Bạn nói gì?');
  expect(screen.getByTestId('bjt-feedback')).toHaveTextContent('席を外す');
  expect(screen.getByRole('button', { name: '2. い' })).toHaveAttribute('data-state', 'correct');
  expect(screen.getByRole('button', { name: '3. う' })).toHaveAttribute('data-state', 'wrong');
  expect(useBjt.getState().answers).toEqual({ 'h1-q1': false });

  fireEvent.click(screen.getByRole('button', { name: dict.bjt.next }));
  expect(screen.getByTestId('bjt-prompt')).toHaveTextContent('問 g1-q1');
  fireEvent.click(screen.getByRole('button', { name: '1. あ' }));
  fireEvent.click(screen.getByRole('button', { name: dict.bjt.finish }));

  const result = screen.getByTestId('bjt-result');
  expect(result).toHaveTextContent(dict.bjt.resultScore(1, 2));
  expect(result).toHaveTextContent('giải thích h1-q1');
  expect(result).not.toHaveTextContent('giải thích g1-q1');
  expect(useBjt.getState().answers).toEqual({ 'h1-q1': false, 'g1-q1': true });
});

it('exam: no feedback on the way, the recording cannot be replayed, the run is saved with an estimate', () => {
  render(<BjtRunner title="T" items={ITEMS} exam setId="demo" onExit={() => {}} />);
  expect(screen.getByTestId('bjt-clock')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: dict.bjt.playing })).toBeDisabled();

  fireEvent.click(screen.getByRole('button', { name: '2' }));
  expect(screen.queryByTestId('bjt-feedback')).toBeNull();
  expect(useBjt.getState().answers).toEqual({});
  fireEvent.click(screen.getByRole('button', { name: dict.bjt.next }));
  // second question left unanswered
  fireEvent.click(screen.getByRole('button', { name: dict.bjt.finish }));

  const result = screen.getByTestId('bjt-result');
  expect(result).toHaveTextContent(dict.bjt.resultScore(1, 2));
  expect(result).toHaveTextContent(dict.bjt.estimate(400, 'J3'));
  expect(result).toHaveTextContent(dict.bjt.noAnswer);
  expect(useBjt.getState().answers).toEqual({ 'h1-q1': true, 'g1-q1': false });
  expect(useBjt.getState().runs.demo).toHaveLength(1);
  expect(useBjt.getState().runs.demo![0]).toMatchObject({ correct: 1, total: 2 });
});

it('exam: time running out ends the run', () => {
  vi.useFakeTimers();
  try {
    render(<BjtRunner title="T" items={ITEMS} exam onExit={() => {}} />);
    // 1 of 25 聴解 questions + 1 of 30 読解 questions → 168 s, rounded to 3 minutes
    expect(screen.getByTestId('bjt-clock')).toHaveTextContent('3:00');
    act(() => {
      vi.advanceTimersByTime(181_000);
    });
    expect(screen.getByTestId('bjt-result')).toHaveTextContent(dict.bjt.resultScore(0, 2));
  } finally {
    vi.useRealTimers();
  }
});

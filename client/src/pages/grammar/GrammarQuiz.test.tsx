import { render, screen, fireEvent, act } from '@testing-library/react';
import { withLang } from '../../test/lang';
import type { Grammar } from '@nihongo/shared';
import { buildGrammarQuestions } from './GrammarQuiz';
import { buildScrambleItems, SentenceScramble } from './SentenceScramble';
import { mulberry32 } from '../../lib/quiz';
import { useProgress } from '../../store/progress';

const G = (n: number, title: string, meaning: string, ja: string, en: string): Grammar => ({
  id: `g-n5-000${n}`, level: 'N5', title, meaning, formation: 'X + Y', examples: [{ ja, romaji: '', en }],
});
const grammar = [
  G(1, '〜たい', 'want to', '日本へ行きたいです。', 'I want to go to Japan.'),
  G(2, '〜ながら', 'while', '音楽を聞きながら勉強します。', 'I study while listening to music.'),
  G(3, '〜てください', 'please do', 'ここに名前を書いてください。', 'Please write your name here.'),
  G(4, '〜ことができる', 'can', '私は日本語を話すことができます。', 'I can speak Japanese.'),
  G(5, '〜たことがある', 'have done', '富士山に登ったことがあります。', 'I have climbed Mt. Fuji.'),
];

it('buildGrammarQuestions gives 4 unique titles per question', () => {
  for (const dir of ['meaning→title', 'example→title'] as const) {
    const qs = buildGrammarQuestions(grammar, dir, 3, mulberry32(2));
    expect(qs).toHaveLength(3);
    for (const q of qs) expect(new Set(q.choices).size).toBe(4);
  }
});

const viGrammar = grammar.map((g, i) => ({
  ...g,
  meaningVi: `nghĩa ${i}`,
  examples: g.examples.map((e) => ({ ...e, vi: `câu ${i}` })),
}));

it('buildGrammarQuestions prompts with the meaning and example in the display language', () => {
  const [m] = buildGrammarQuestions(viGrammar, 'meaning→title', 1, mulberry32(2), 'vi');
  render(<>{m!.prompt}</>);
  expect(screen.getByText(/^nghĩa \d$/)).toBeInTheDocument();
  const [e] = buildGrammarQuestions(viGrammar, 'example→title', 1, mulberry32(2), 'en');
  render(<>{e!.prompt}</>);
  expect(screen.queryByText(/^câu \d$/)).not.toBeInTheDocument();
});

it('SentenceScramble prompts with the Vietnamese example translation in Vietnamese', () => {
  render(<SentenceScramble grammar={viGrammar.slice(0, 1)} total={1} />);
  expect(screen.getByText('câu 0')).toBeInTheDocument();
  act(() => withLang('en'));
  expect(screen.getByText('I want to go to Japan.')).toBeInTheDocument();
});

it('buildScrambleItems shuffles chunks that rebuild the sentence', () => {
  const items = buildScrambleItems(grammar, 3, mulberry32(9));
  expect(items).toHaveLength(3);
  for (const it of items) {
    expect(it.chunks.join('')).toBe(it.ja);
    expect([...it.shuffled].sort().join('')).toBe([...it.chunks].sort().join(''));
  }
});

it('SentenceScramble accepts the correct order and awards XP', () => {
  useProgress.setState({ xp: 0, streak: 0, lastStudyDay: null });
  render(<SentenceScramble grammar={grammar.slice(0, 1)} total={1} />);
  const item = buildScrambleItems(grammar.slice(0, 1), 1)[0]!;
  const bank = screen.getAllByRole('button').filter((b) => item.chunks.includes(b.textContent ?? '') && !b.hasAttribute('disabled'));
  // tap chunks in the original order
  for (const c of item.chunks) {
    const btn = bank.find((b) => b.textContent === c && !b.hasAttribute('disabled'))!;
    fireEvent.click(btn);
  }
  fireEvent.click(screen.getByRole('button', { name: 'Kiểm tra' }));
  expect(screen.getByText(/Chính xác/)).toBeInTheDocument();
  expect(useProgress.getState().xp).toBe(2);
  fireEvent.click(screen.getByRole('button', { name: /Tiếp/ }));
  expect(screen.getByTestId('scramble-result')).toBeInTheDocument();
});

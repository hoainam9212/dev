import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import type { Vocab } from '@nihongo/shared';
import { buildVocabQuestions, VocabQuiz } from './VocabQuiz';
import { withLang } from '../../test/lang';
import { buildListeningQuestions } from './VocabListening';
import { QuizRunner } from '../../components/QuizRunner';
import { mulberry32 } from '../../lib/quiz';
import { useProgress } from '../../store/progress';
import { db } from '../../db';

const V = (id: string, word: string, reading: string, meaning: string): Vocab => ({
  id, level: 'N5', word, reading, meanings: [meaning], tags: [], kanji: [], sentenceIds: [],
});
const vocab = [V('v-1', '猫', 'ねこ', 'cat'), V('v-2', '犬', 'いぬ', 'dog'), V('v-3', '鳥', 'とり', 'bird'), V('v-4', '魚', 'さかな', 'fish'), V('v-5', '牛', 'うし', 'cow')];

it('buildVocabQuestions makes unique 4-choice questions in both directions', () => {
  const q1 = buildVocabQuestions(vocab, 'word→meaning', 3, mulberry32(7));
  expect(q1).toHaveLength(3);
  for (const q of q1) {
    expect(q.choices).toHaveLength(4);
    expect(new Set(q.choices).size).toBe(4);
    expect(q.answer).toBeGreaterThanOrEqual(0);
  }
  const q2 = buildVocabQuestions(vocab, 'meaning→word', 2, mulberry32(7));
  expect(q2[0]!.choices.every((c) => vocab.some((v) => v.word === c))).toBe(true);
});

it('buildListeningQuestions uses the word as speakText', () => {
  const q = buildListeningQuestions(vocab, 2, mulberry32(3));
  expect(q).toHaveLength(2);
  expect(vocab.some((v) => v.word === q[0]!.speakText)).toBe(true);
});

const viVocab = vocab.map((v, k) => ({ ...v, meaningsVi: [`nghĩa ${k}`] }));

it('buildVocabQuestions takes options and distractors from the display language', () => {
  const qv = buildVocabQuestions(viVocab, 'word→meaning', 3, mulberry32(7), 'vi');
  for (const q of qv) expect(q.choices.every((c) => c.startsWith('nghĩa'))).toBe(true);
  const qe = buildVocabQuestions(viVocab, 'word→meaning', 3, mulberry32(7), 'en');
  for (const q of qe) expect(q.choices.some((c) => c.startsWith('nghĩa'))).toBe(false);
});

it('buildListeningQuestions explains with the meaning in the display language', () => {
  const q = buildListeningQuestions(viVocab, 1, mulberry32(3), 'vi');
  expect(q[0]!.explain).toMatch(/^nghĩa/);
});

it('VocabQuiz shows Vietnamese options and re-translates the same question when the language flips', () => {
  render(<VocabQuiz vocab={viVocab} total={2} />);
  expect(screen.getAllByText(/^nghĩa \d$/)).toHaveLength(4);
  const prompt = screen.getByTestId('quiz-prompt').textContent;
  act(() => withLang('en'));
  expect(screen.queryAllByText(/^nghĩa \d$/)).toHaveLength(0);
  expect(screen.getAllByText(/^(cat|dog|bird|fish|cow)$/)).toHaveLength(4);
  expect(screen.getByTestId('quiz-prompt').textContent).toBe(prompt);
  expect(screen.getByText('Question 1 / 2 · Correct: 0')).toBeInTheDocument();
});

it('QuizRunner awards XP, logs a session and reports the result', async () => {
  await db.sessions.clear();
  useProgress.setState({ xp: 0, streak: 0, lastStudyDay: null });
  const onFinish = vi.fn();
  const questions = buildVocabQuestions(vocab, 'word→meaning', 2, mulberry32(1));
  render(<QuizRunner questions={questions} kind="quiz" type="vocab" onFinish={onFinish} />);
  for (const q of questions) {
    fireEvent.click(screen.getByRole('button', { name: q.choices[q.answer]! }));
    fireEvent.click(screen.getByRole('button', { name: /Tiếp/ }));
  }
  expect(onFinish).toHaveBeenCalledWith({ correct: 2, total: 2 });
  expect(useProgress.getState().xp).toBe(4);
  expect(screen.getByTestId('quiz-result')).toBeInTheDocument();
  await waitFor(async () => expect(await db.sessions.count()).toBe(1));
});

import { render, screen } from '@testing-library/react';
import type { Vocab } from '@nihongo/shared';
import { VocabTyping } from './VocabTyping';
import { withLang } from '../../test/lang';

vi.mock('../../lib/tts', () => ({ speak: vi.fn(), useStopSpeechOnUnmount: vi.fn() }));

const vocab: Vocab[] = [
  { id: 'v-1', level: 'N5', word: '猫', reading: 'ねこ', meanings: ['cat'], meaningsVi: ['con mèo'], tags: [], kanji: [], sentenceIds: [] },
];

it('shows the meaning hint in Vietnamese', () => {
  render(<VocabTyping vocab={vocab} />);
  expect(screen.getByText('con mèo')).toBeInTheDocument();
});

it('shows the meaning hint and the position in English', () => {
  withLang('en');
  render(<VocabTyping vocab={vocab} />);
  expect(screen.getByText('cat')).toBeInTheDocument();
  expect(screen.getByText('Question 1 / 1 · Correct: 0')).toBeInTheDocument();
});

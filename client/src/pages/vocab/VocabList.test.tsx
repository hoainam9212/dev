import { render, screen, fireEvent } from '@testing-library/react';
import type { Vocab } from '@nihongo/shared';
import { VocabList } from './VocabList';
import { withLang } from '../../test/lang';

vi.mock('../../content/useSentenceMap', () => ({ useSentenceMap: () => new Map() }));

const vocab: Vocab[] = [
  { id: 'v-1', level: 'N5', word: '猫', reading: 'ねこ', meanings: ['cat'], meaningsVi: ['con mèo'], tags: [], kanji: [], sentenceIds: [] },
  { id: 'v-2', level: 'N5', word: '犬', reading: 'いぬ', meanings: ['dog'], tags: [], kanji: [], sentenceIds: [] },
];

it('shows the Vietnamese meaning in Vietnamese and falls back to English when there is none', () => {
  render(<VocabList vocab={vocab} level="N5" />);
  expect(screen.getByText('con mèo')).toBeInTheDocument();
  expect(screen.queryByText('cat')).not.toBeInTheDocument();
  expect(screen.getByText('dog')).toBeInTheDocument();
});

it('shows English meanings and an English count in English', () => {
  withLang('en');
  render(<VocabList vocab={vocab} level="N5" />);
  expect(screen.getByText('cat')).toBeInTheDocument();
  expect(screen.queryByText('con mèo')).not.toBeInTheDocument();
  expect(screen.getByText('dog')).toBeInTheDocument();
  expect(screen.getByText('2 words')).toBeInTheDocument();
});

it('search matches a meaning in either language', () => {
  render(<VocabList vocab={vocab} level="N5" />);
  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'cat' } });
  expect(screen.getByText('con mèo')).toBeInTheDocument();
  expect(screen.queryByText('dog')).not.toBeInTheDocument();
});

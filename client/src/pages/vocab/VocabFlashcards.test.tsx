import { render, screen, fireEvent, act } from '@testing-library/react';
import type { Vocab } from '@nihongo/shared';
import { VocabFlashcards } from './VocabFlashcards';
import { withLang } from '../../test/lang';

vi.mock('../../lib/tts', () => ({ speak: vi.fn(), useStopSpeechOnUnmount: vi.fn() }));
const noSentences = new Map(); // stable, like the real memoized hook — a new Map would rebuild the queue
vi.mock('../../content/useSentenceMap', () => ({ useSentenceMap: () => noSentences }));

const vocab: Vocab[] = [
  { id: 'v-1', level: 'N5', word: '猫', reading: 'ねこ', meanings: ['cat'], meaningsVi: ['con mèo'], tags: [], kanji: [], sentenceIds: [] },
];

it('shows the meaning on the back in the display language and re-translates it in place', () => {
  render(<VocabFlashcards vocab={vocab} level="N5" progress={new Map()} />);
  fireEvent.click(screen.getByRole('button', { name: 'Lật thẻ' }));
  expect(screen.getByText('con mèo')).toBeInTheDocument();
  act(() => withLang('en'));
  expect(screen.getByText('cat')).toBeInTheDocument();
});

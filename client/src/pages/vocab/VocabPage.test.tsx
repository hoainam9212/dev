import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { VocabPage } from './VocabPage';
import { clearContentCache } from '../../content/loader';

const vocab = [
  { id: 'v-n5-0001', level: 'N5', word: '猫', reading: 'ねこ', meanings: ['cat'], tags: [], kanji: ['猫'], sentenceIds: ['s-1'] },
  { id: 'v-n5-0002', level: 'N5', word: '犬', reading: 'いぬ', meanings: ['dog'], tags: [], kanji: ['犬'], sentenceIds: [] },
];
const sentences = [{ id: 's-1', level: 'N5', ja: '猫が好き。', en: 'I like cats.' }];

beforeEach(() => {
  clearContentCache();
  vi.spyOn(globalThis, 'fetch').mockImplementation(async (input) => {
    const url = String(input);
    if (url.endsWith('/content/vocab/n5.json')) return new Response(JSON.stringify(vocab));
    if (url.endsWith('/content/sentences/n5.json')) return new Response(JSON.stringify(sentences));
    return new Response('nope', { status: 404 });
  });
});

it('lists vocabulary for the selected level and expands example sentences', async () => {
  render(
    <MemoryRouter>
      <VocabPage />
    </MemoryRouter>,
  );
  expect(await screen.findByText('猫')).toBeInTheDocument();
  expect(screen.getAllByText(/2 từ/).length).toBeGreaterThan(0);
  fireEvent.click(screen.getAllByRole('button', { name: /猫/ })[0]!);
  expect(await screen.findByText('猫が好き。')).toBeInTheDocument();
});

it('switches to the quiz mode', async () => {
  render(
    <MemoryRouter>
      <VocabPage />
    </MemoryRouter>,
  );
  await screen.findByText('猫');
  fireEvent.click(screen.getByRole('tab', { name: 'Trắc nghiệm' }));
  expect(await screen.findByText(/Câu 1 \/ 2/)).toBeInTheDocument();
});

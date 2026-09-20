import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import type { Grammar } from '@nihongo/shared';
import { SentenceBuilder } from './SentenceBuilder';
import { WritingLog } from './WritingLog';
import { db } from '../../db';
import { listWritings, saveWriting } from '../../db/writings';

const grammar: Grammar[] = [
  { id: 'g-n5-0001', level: 'N5', title: '〜たい', meaning: 'want to', formation: 'V-stem + たい', examples: [{ ja: '日本へ行きたいです。', romaji: '', en: 'I want to go to Japan.' }] },
];

beforeEach(async () => {
  await db.writings.clear();
});

it('saves the sentence when it is checked', async () => {
  render(<SentenceBuilder grammar={grammar} total={1} />);
  fireEvent.change(screen.getByLabelText('Câu tiếng Nhật'), { target: { value: '日本に行きたい' } });
  fireEvent.click(screen.getByRole('button', { name: 'Kiểm tra' }));
  await waitFor(async () => expect(await listWritings()).toHaveLength(1));
  const [w] = await listWritings();
  expect(w).toMatchObject({ grammarId: 'g-n5-0001', grammarTitle: '〜たい', typed: '日本に行きたい', expected: '日本へ行きたいです。', level: 'N5' });
});

it('shows what was written last time for the same grammar point', async () => {
  await saveWriting(
    { grammarId: 'g-n5-0001', grammarTitle: '〜たい', level: 'N5', prompt: 'I want to go to Japan.', expected: '日本へ行きたいです。', typed: 'にほんへいきたい', score: 0.4, ok: false },
    new Date('2026-09-19T10:00:00.000Z'),
  );
  render(<SentenceBuilder grammar={grammar} total={1} />);
  const previous = await screen.findByTestId('previous-writing');
  expect(previous).toHaveTextContent('にほんへいきたい');
});

it('lists saved sentences, filters by search and deletes one', async () => {
  await saveWriting({ grammarId: 'g-n5-0001', grammarTitle: '〜たい', level: 'N5', prompt: 'I want to go to Japan.', expected: '日本へ行きたいです。', typed: '日本へ行きたいです', score: 1, ok: true }, new Date('2026-09-20T01:00:00.000Z'));
  await saveWriting({ grammarId: 'g-n4-0002', grammarTitle: '〜ながら', level: 'N4', prompt: 'I study while listening to music.', expected: '音楽を聞きながら勉強します。', typed: '音楽を聞きながら勉強する', score: 0.8, ok: true }, new Date('2026-09-20T02:00:00.000Z'));
  render(<WritingLog />);
  expect(await screen.findByText('日本へ行きたいです')).toBeInTheDocument();
  expect(screen.getByText('音楽を聞きながら勉強する')).toBeInTheDocument();

  fireEvent.change(screen.getByLabelText('Tìm câu đã đặt'), { target: { value: 'ながら' } });
  expect(screen.queryByText('日本へ行きたいです')).not.toBeInTheDocument();

  fireEvent.change(screen.getByLabelText('Tìm câu đã đặt'), { target: { value: '' } });
  fireEvent.click(screen.getAllByRole('button', { name: 'Xóa câu này' })[0]!);
  await waitFor(() => expect(screen.queryByText('音楽を聞きながら勉強する')).not.toBeInTheDocument());
  expect(await listWritings()).toHaveLength(1);
});

it('tells the learner when nothing has been saved yet', async () => {
  render(<WritingLog />);
  expect(await screen.findByText(/Chưa có câu nào/)).toBeInTheDocument();
});

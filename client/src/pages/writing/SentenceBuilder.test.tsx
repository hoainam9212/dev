import { render, screen, fireEvent } from '@testing-library/react';
import type { Grammar } from '@nihongo/shared';
import { SentenceBuilder, checkSentence, stripForCompare } from './SentenceBuilder';
import { useProgress } from '../../store/progress';

const grammar: Grammar[] = [
  { id: 'g-n5-0001', level: 'N5', title: '〜たい', meaning: 'want to', formation: 'V-stem + たい', examples: [{ ja: '日本へ行きたいです。', romaji: '', en: 'I want to go to Japan.' }] },
];

it('compares sentences ignoring punctuation and spaces', () => {
  expect(stripForCompare('日本へ 行きたいです。')).toBe('日本へ行きたいです');
  expect(checkSentence('日本へ行きたいです', '日本へ行きたいです。').ok).toBe(true);
  expect(checkSentence('日本に行きたいです。', '日本へ行きたいです。').ok).toBe(true); // one char off
  expect(checkSentence('猫が好きです。', '日本へ行きたいです。').ok).toBe(false);
});

it('awards XP for a matching sentence and shows the summary', () => {
  useProgress.setState({ xp: 0, streak: 0, lastStudyDay: null });
  render(<SentenceBuilder grammar={grammar} total={1} />);
  fireEvent.change(screen.getByLabelText('Câu tiếng Nhật'), { target: { value: '日本へ行きたいです' } });
  fireEvent.click(screen.getByRole('button', { name: 'Kiểm tra' }));
  expect(screen.getByTestId('sentence-check')).toHaveTextContent('Chính xác');
  expect(useProgress.getState().xp).toBe(2);
  fireEvent.click(screen.getByRole('button', { name: /Tiếp/ }));
  expect(screen.getByTestId('sentence-result')).toHaveTextContent('1 / 1');
});

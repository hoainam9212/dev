import { render, screen, fireEvent } from '@testing-library/react';
import type { ReadingLesson } from '@nihongo/shared';
import { ReadingLessonView } from './ReadingLessonView';
import { withLang } from '../../test/lang';

vi.mock('../../lib/tts', () => ({ speak: vi.fn(), stopSpeaking: vi.fn(), useStopSpeechOnUnmount: vi.fn() }));

const lesson: ReadingLesson = {
  id: 'r-n5-01',
  level: 'N5',
  title: '私の家族',
  body: '[猫|ねこ]がいます。',
  vocab: [
    { word: '猫', reading: 'ねこ', vi: 'con mèo', en: 'cat' },
    { word: '家族', reading: 'かぞく', vi: 'gia đình' },
  ],
  questions: [{ id: 'q1', prompt: '何がいますか。', choices: ['猫', '犬'], answer: 0, explain: 'Có con mèo.', explainEn: 'There is a cat.' }],
};

it('shows controls, headings and buttons in English', () => {
  withLang('en');
  render(<ReadingLessonView lesson={lesson} onBack={vi.fn()} />);
  expect(screen.getByRole('button', { name: '← Lessons' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Hide furigana' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Read aloud/ })).toBeInTheDocument();
  expect(screen.getByText('Words in this text (2)')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Answer the questions (1)' })).toBeInTheDocument();
});

it('glosses vocab in English when present and falls back to Vietnamese', () => {
  withLang('en');
  render(<ReadingLessonView lesson={lesson} onBack={vi.fn()} />);
  expect(screen.getByText('cat')).toBeInTheDocument();
  expect(screen.queryByText('con mèo')).not.toBeInTheDocument();
  expect(screen.getByText('gia đình')).toBeInTheDocument();
});

it('explains answers in the display language', () => {
  withLang('en');
  render(<ReadingLessonView lesson={lesson} onBack={vi.fn()} />);
  fireEvent.click(screen.getByRole('button', { name: 'Answer the questions (1)' }));
  fireEvent.click(screen.getByRole('button', { name: /犬/ }));
  expect(screen.getByText(/There is a cat\./)).toBeInTheDocument();
});

it('keeps Vietnamese glosses in Vietnamese', () => {
  render(<ReadingLessonView lesson={lesson} onBack={vi.fn()} />);
  expect(screen.getByText('con mèo')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: '← Danh sách' })).toBeInTheDocument();
});

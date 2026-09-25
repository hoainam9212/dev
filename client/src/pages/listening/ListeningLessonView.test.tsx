import { render, screen, fireEvent } from '@testing-library/react';
import type { ListeningLesson } from '@nihongo/shared';
import { ListeningLessonView } from './ListeningLessonView';
import { withLang } from '../../test/lang';

vi.mock('../../lib/tts', () => ({
  speak: vi.fn(),
  stopSpeaking: vi.fn(),
  canSpeak: () => true,
  speakSequence: vi.fn(() => ({ cancel: vi.fn(), done: Promise.resolve() })),
  useStopSpeechOnUnmount: vi.fn(),
}));

const lesson: ListeningLesson = {
  id: 'l-n5-01',
  level: 'N5',
  title: '駅で',
  script: [
    { speaker: 'A', ja: 'すみません。', vi: 'Xin lỗi.', en: 'Excuse me.' },
    { speaker: 'B', ja: 'はい。', vi: 'Vâng.' },
  ],
  questions: [{ id: 'q1', prompt: '誰ですか。', choices: ['A', 'B'], answer: 0 }],
  dictation: ['はい'],
};

it('shows play, stop, script and mode controls in English', () => {
  withLang('en');
  render(<ListeningLessonView lesson={lesson} onBack={vi.fn()} />);
  expect(screen.getByRole('button', { name: /Play all/ })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Stop/ })).toBeInTheDocument();
  for (const tab of ['Listen', 'Questions', 'Dictation']) expect(screen.getByRole('tab', { name: tab })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Show script' }));
  expect(screen.getByRole('button', { name: 'Hide script' })).toBeInTheDocument();
  expect(screen.getByText('Excuse me.')).toBeInTheDocument();
  expect(screen.getByText('Vâng.')).toBeInTheDocument();
});

it('shows the Vietnamese script line in Vietnamese', () => {
  render(<ListeningLessonView lesson={lesson} onBack={vi.fn()} />);
  fireEvent.click(screen.getByRole('button', { name: 'Hiện lời thoại' }));
  expect(screen.getByText('Xin lỗi.')).toBeInTheDocument();
  expect(screen.queryByText('Excuse me.')).not.toBeInTheDocument();
});

it('shows dictation text in English', () => {
  withLang('en');
  render(<ListeningLessonView lesson={lesson} onBack={vi.fn()} />);
  fireEvent.click(screen.getByRole('tab', { name: 'Dictation' }));
  expect(screen.getByText('Sentence 1 / 1')).toBeInTheDocument();
});

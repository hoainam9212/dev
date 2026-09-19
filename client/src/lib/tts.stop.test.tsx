// Stopping speech must really stop it: no "next line" after stop, and leaving a view/route stops it.
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { speak, speakSequence, stopSpeaking } from './tts';
import { AppShell } from '../app/AppShell';
import { ReadingLessonView } from '../pages/reading/ReadingLessonView';

// Browser-like fake: cancel() fires `onerror` on the current utterance (as Chrome does), speak() queues.
class FakeUtterance {
  text: string;
  lang = '';
  rate = 1;
  voice: unknown = null;
  onend: (() => void) | null = null;
  onerror: (() => void) | null = null;
  constructor(text: string) {
    this.text = text;
  }
}
const spoken: string[] = [];
let current: FakeUtterance | null = null;
let timer: ReturnType<typeof setTimeout> | null = null;
const synth = {
  getVoices: () => [],
  speaking: false,
  speak(u: FakeUtterance) {
    spoken.push(u.text);
    current = u;
    synth.speaking = true;
    timer = setTimeout(() => {
      synth.speaking = false;
      current = null;
      u.onend?.();
    }, 30);
  },
  cancel: vi.fn(() => {
    if (timer) clearTimeout(timer);
    const u = current;
    current = null;
    synth.speaking = false;
    u?.onerror?.();
  }),
};

beforeEach(() => {
  spoken.length = 0;
  synth.cancel.mockClear();
  Object.defineProperty(window, 'speechSynthesis', { value: synth, configurable: true });
  Object.defineProperty(window, 'SpeechSynthesisUtterance', { value: FakeUtterance, configurable: true });
});

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

it('stopSpeaking() halts a running sequence instead of moving to the next line', async () => {
  const seq = speakSequence(['one', 'two', 'three'], { gapMs: 0 });
  await wait(5);
  stopSpeaking();
  await seq.done;
  await wait(100);
  expect(spoken).toEqual(['one']);
});

it('a new speak() interrupts a running sequence for good', async () => {
  speakSequence(['one', 'two', 'three'], { gapMs: 0 });
  await wait(5);
  speak('word');
  await wait(150);
  expect(spoken).toEqual(['one', 'word']);
});

it('leaving a reading lesson stops "Đọc cả bài"', async () => {
  const lesson = {
    id: 'r-n1-01', level: 'N1' as const, title: 'T', body: '[本文|ほんぶん]です。', vocab: [],
    questions: [{ id: 'q', prompt: 'Q', choices: ['a', 'b'], answer: 0 }],
  };
  const { getByRole, unmount } = render(<ReadingLessonView lesson={lesson} onBack={() => {}} />);
  fireEvent.click(getByRole('button', { name: /Đọc cả bài/ }));
  expect(spoken).toEqual(['本文です。']);
  synth.cancel.mockClear();
  unmount();
  expect(synth.cancel).toHaveBeenCalled();
});

it('navigating to another route stops speech', async () => {
  function Speaker() {
    const nav = useNavigate();
    return (
      <>
        <button type="button" onClick={() => speak('長い文章')}>play</button>
        <button type="button" onClick={() => nav('/other')}>go</button>
      </>
    );
  }
  const { getByRole } = render(
    <MemoryRouter initialEntries={['/a']}>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/a" element={<Speaker />} />
          <Route path="/other" element={<p>other</p>} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
  fireEvent.click(getByRole('button', { name: 'play' }));
  synth.cancel.mockClear();
  fireEvent.click(getByRole('button', { name: 'go' }));
  expect(synth.cancel).toHaveBeenCalled();
});

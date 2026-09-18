import { speakSequence, canSpeak } from './tts';

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
const synth = {
  cancel: vi.fn(),
  getVoices: () => [],
  speak: (u: FakeUtterance) => {
    spoken.push(u.text);
    setTimeout(() => u.onend?.(), 1);
  },
};

beforeEach(() => {
  spoken.length = 0;
  Object.defineProperty(window, 'speechSynthesis', { value: synth, configurable: true });
  Object.defineProperty(window, 'SpeechSynthesisUtterance', { value: FakeUtterance, configurable: true });
});

it('speaks lines in order and resolves done', async () => {
  expect(canSpeak()).toBe(true);
  const onLine = vi.fn();
  const seq = speakSequence(['a', 'b', 'c'], { gapMs: 0, onLine });
  await seq.done;
  expect(spoken).toEqual(['a', 'b', 'c']);
  expect(onLine.mock.calls.map((c) => c[0])).toEqual([0, 1, 2]);
});

it('cancel stops the sequence', async () => {
  const seq = speakSequence(['a', 'b', 'c'], { gapMs: 50 });
  await new Promise((r) => setTimeout(r, 5));
  seq.cancel();
  await seq.done;
  expect(spoken).toEqual(['a']);
  expect(synth.cancel).toHaveBeenCalled();
});

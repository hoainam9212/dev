import { canRecognize, recognizeOnce } from './stt';

class FakeRecognition {
  static next: { transcript?: string; error?: string } = {};
  lang = '';
  interimResults = false;
  maxAlternatives = 1;
  continuous = false;
  onresult: ((e: { results: { transcript: string }[][] }) => void) | null = null;
  onerror: ((e: { error: string }) => void) | null = null;
  onend: (() => void) | null = null;
  start() {
    setTimeout(() => {
      const n = FakeRecognition.next;
      if (n.error) this.onerror?.({ error: n.error });
      else if (n.transcript !== undefined) this.onresult?.({ results: [[{ transcript: n.transcript }]] });
      else this.onend?.();
    }, 1);
  }
  stop() {}
  abort() {}
}

afterEach(() => {
  delete (window as unknown as { webkitSpeechRecognition?: unknown }).webkitSpeechRecognition;
});

it('rejects with unsupported when no recognizer exists', async () => {
  expect(canRecognize()).toBe(false);
  await expect(recognizeOnce()).rejects.toThrow('unsupported');
});

it('resolves the transcript and maps errors', async () => {
  (window as unknown as { webkitSpeechRecognition: unknown }).webkitSpeechRecognition = FakeRecognition;
  expect(canRecognize()).toBe(true);
  FakeRecognition.next = { transcript: ' こんにちは ' };
  await expect(recognizeOnce()).resolves.toBe('こんにちは');
  FakeRecognition.next = { error: 'not-allowed' };
  await expect(recognizeOnce()).rejects.toThrow('not-allowed');
  FakeRecognition.next = {};
  await expect(recognizeOnce()).rejects.toThrow('no-speech');
});

// Android WebView has no window.speechSynthesis; on native platforms speech must go through the TTS plugin.
const { spoken, plugin } = vi.hoisted(() => {
  const spoken: { text: string; lang?: string; rate?: number }[] = [];
  const plugin = {
    speak: vi.fn(async (o: { text: string; lang?: string; rate?: number }) => {
      spoken.push(o);
      await new Promise((r) => setTimeout(r, 1));
    }),
    stop: vi.fn(async () => {}),
    isLanguageSupported: vi.fn(async () => ({ supported: true })),
    openInstall: vi.fn(async () => {}),
  };
  return { spoken, plugin };
});

vi.mock('@capacitor/core', () => ({ Capacitor: { isNativePlatform: () => true } }));
vi.mock('@capacitor-community/text-to-speech', () => ({ TextToSpeech: plugin, QueueStrategy: { Flush: 0, Add: 1 } }));

import { canSpeak, speak, speakSequence, stopSpeaking } from './tts';

beforeEach(() => {
  spoken.length = 0;
  vi.clearAllMocks();
  // make sure the web API is absent, like in Android WebView
  delete (window as unknown as { speechSynthesis?: unknown }).speechSynthesis;
});

it('can speak on native even without window.speechSynthesis', () => {
  expect('speechSynthesis' in window).toBe(false);
  expect(canSpeak()).toBe(true);
});

it('speak() uses the native plugin with Japanese and the rate', async () => {
  expect(speak('ねこ', { rate: 0.8 })).toBe(true);
  await vi.waitFor(() => expect(spoken).toHaveLength(1));
  expect(spoken[0]).toMatchObject({ text: 'ねこ', lang: 'ja-JP', rate: 0.8 });
});

it('speakSequence plays lines in order through the plugin', async () => {
  const onLine = vi.fn();
  await speakSequence(['a', 'b'], { gapMs: 0, onLine }).done;
  expect(spoken.map((s) => s.text)).toEqual(['a', 'b']);
  expect(onLine.mock.calls.map((c) => c[0])).toEqual([0, 1]);
});

it('stopSpeaking() stops the native engine', () => {
  stopSpeaking();
  expect(plugin.stop).toHaveBeenCalled();
});

it('reports a missing Japanese voice instead of failing silently', async () => {
  vi.resetModules(); // fresh module: no cached language check
  const fresh = await import('./tts');
  plugin.isLanguageSupported.mockResolvedValueOnce({ supported: false });
  const onErr = vi.fn();
  const off = fresh.onTtsError(onErr);
  fresh.speak('ねこ');
  await vi.waitFor(() => expect(onErr).toHaveBeenCalledWith('no-japanese-voice'));
  expect(spoken).toHaveLength(0);
  off();
});

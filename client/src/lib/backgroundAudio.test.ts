// Recordings (<audio>) must pause other apps' music like speech does, and the app must stop its own sound when
// another app takes the audio (a call, the user starting music) or the notification's Stop button is pressed.
const { focusLog, focus, listeners, ttsStop } = vi.hoisted(() => {
  const focusLog: string[] = [];
  const listeners: Record<string, () => void> = {};
  const focus = {
    // `focus: false` = only the playback service (screen off), no system audio focus
    request: vi.fn(async (o?: { focus?: boolean }) => {
      focusLog.push(o?.focus === false ? 'service' : 'request');
    }),
    abandon: vi.fn(async () => {
      focusLog.push('abandon');
    }),
    addListener: vi.fn(async (event: string, fn: () => void) => {
      listeners[event] = fn;
      return { remove: async () => {} };
    }),
  };
  return { focusLog, focus, listeners, ttsStop: vi.fn() };
});

vi.mock('@capacitor/core', () => ({
  Capacitor: { isNativePlatform: () => true },
  registerPlugin: () => focus,
}));
vi.mock('./tts', () => ({ stopSpeaking: ttsStop }));

import { RELEASE_DELAY_MS } from './audioFocus';

let uninstall: () => void = () => {};
beforeEach(async () => {
  focusLog.length = 0;
  vi.clearAllMocks();
  // fresh module state: whether the focus is held lives in audioFocus.ts
  vi.resetModules();
  const { installBackgroundAudio } = await import('./backgroundAudio');
  uninstall = installBackgroundAudio();
});
afterEach(() => {
  uninstall();
  document.body.innerHTML = '';
});

function audioEl() {
  const a = document.createElement('audio');
  document.body.appendChild(a);
  Object.defineProperty(a, 'paused', { value: false, configurable: true });
  a.pause = vi.fn(() => Object.defineProperty(a, 'paused', { value: true, configurable: true }));
  return a;
}

it('a recording that starts playing keeps the playback service on, but never takes the audio focus', async () => {
  // The WebView's player takes the system focus itself. Taking it as well paused the player (focus lost), the
  // pause gave the focus back, the player resumed, and so on: the Play button flickered and nothing was heard.
  const a = audioEl();
  a.dispatchEvent(new Event('play'));
  await vi.waitFor(() => expect(focusLog).toEqual(['service']));
});

it('speech starting while a recording plays still takes the audio focus', async () => {
  const a = audioEl();
  a.dispatchEvent(new Event('play'));
  await vi.waitFor(() => expect(focusLog).toEqual(['service']));
  const { acquireAudioFocus } = await import('./audioFocus');
  await acquireAudioFocus('tts');
  expect(focusLog).toEqual(['service', 'request']);
});

it('pausing or ending the recording gives the focus back shortly after', async () => {
  vi.useFakeTimers();
  try {
    const a = audioEl();
    a.dispatchEvent(new Event('play'));
    Object.defineProperty(a, 'paused', { value: true, configurable: true });
    a.dispatchEvent(new Event('ended'));
    await vi.advanceTimersByTimeAsync(RELEASE_DELAY_MS + 10);
    expect(focusLog).toEqual(['service', 'abandon']);
  } finally {
    vi.useRealTimers();
  }
});

it('a playing recording removed from the page (next question) still gives the focus back', async () => {
  vi.useFakeTimers();
  try {
    const a = audioEl();
    a.dispatchEvent(new Event('play'));
    a.remove(); // React drops the element; the browser pauses it, but the event no longer reaches document
    Object.defineProperty(a, 'paused', { value: true, configurable: true });
    a.dispatchEvent(new Event('pause'));
    await vi.advanceTimersByTimeAsync(RELEASE_DELAY_MS + 10);
    expect(focusLog).toEqual(['service', 'abandon']);
  } finally {
    vi.useRealTimers();
  }
});

it('a recording that stops does not take the focus away from speech still playing', async () => {
  vi.useFakeTimers();
  try {
    const { acquireAudioFocus } = await import('./audioFocus');
    await acquireAudioFocus('tts');
    const a = audioEl();
    a.dispatchEvent(new Event('play'));
    Object.defineProperty(a, 'paused', { value: true, configurable: true });
    a.dispatchEvent(new Event('ended'));
    await vi.advanceTimersByTimeAsync(RELEASE_DELAY_MS + 10);
    expect(focusLog).toEqual(['request']);
  } finally {
    vi.useRealTimers();
  }
});

it('after Stop in the notification the next sound asks for the focus (and the service) again', async () => {
  const a = audioEl();
  a.dispatchEvent(new Event('play'));
  await vi.waitFor(() => expect(listeners.stopRequested).toBeTypeOf('function'));
  listeners.stopRequested!();
  Object.defineProperty(a, 'paused', { value: false, configurable: true });
  a.dispatchEvent(new Event('play'));
  await vi.waitFor(() => expect(focusLog.filter((x) => x === 'service')).toHaveLength(2));
});

it.each(['interrupted', 'stopRequested'])('the native "%s" event stops speech and pauses recordings', async (event) => {
  const a = audioEl();
  await vi.waitFor(() => expect(listeners[event]).toBeTypeOf('function'));
  listeners[event]!();
  expect(ttsStop).toHaveBeenCalled();
  expect(a.pause).toHaveBeenCalled();
});

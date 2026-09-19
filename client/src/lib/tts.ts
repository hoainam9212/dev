import { Capacitor } from '@capacitor/core';
import { TextToSpeech, QueueStrategy } from '@capacitor-community/text-to-speech';

// Android WebView does not implement window.speechSynthesis (crbug.com/40417848),
// so inside the native app speech goes through the system TTS engine via a Capacitor plugin.

let defaultRate = 0.9;

/** Default speaking rate (set from the settings store). */
export function setDefaultRate(r: number): void {
  defaultRate = r;
}

export type TtsError = 'no-japanese-voice' | 'error';
type ErrorListener = (e: TtsError) => void;
const errorListeners = new Set<ErrorListener>();

/** Subscribe to speech failures (e.g. no Japanese voice installed). Returns an unsubscribe function. */
export function onTtsError(l: ErrorListener): () => void {
  errorListeners.add(l);
  return () => errorListeners.delete(l);
}
function emitError(e: TtsError) {
  errorListeners.forEach((l) => l(e));
}

const isNative = () => Capacitor.isNativePlatform();
const hasWebSpeech = () => typeof window !== 'undefined' && 'speechSynthesis' in window;

export function canSpeak(): boolean {
  return isNative() || hasWebSpeech();
}

// ---------------- native (Android/iOS) ----------------

let jaSupported: Promise<boolean> | null = null;
function checkJapanese(lang: string): Promise<boolean> {
  if (!jaSupported) {
    const p = TextToSpeech.isLanguageSupported({ lang })
      .then((r) => r.supported)
      .catch(() => true); // unknown → try anyway
    jaSupported = p;
    void p.then((ok) => {
      if (!ok && jaSupported === p) jaSupported = null; // re-check later (user may install the voice)
    });
  }
  return jaSupported;
}

/** Speak one line natively; resolves when finished (or on failure). */
async function speakNative(text: string, lang: string, rate: number): Promise<void> {
  if (!(await checkJapanese(lang))) {
    emitError('no-japanese-voice');
    return;
  }
  try {
    await TextToSpeech.speak({ text, lang, rate, pitch: 1, volume: 1, queueStrategy: QueueStrategy.Flush });
  } catch {
    emitError('error');
  }
}

/** Opens Android's "install voice data" screen (native only). */
export async function openVoiceInstall(): Promise<void> {
  if (isNative()) await TextToSpeech.openInstall().catch(() => {});
}

// ---------------- web ----------------

function makeUtterance(text: string, opts: { rate: number; lang: string }): SpeechSynthesisUtterance {
  const u = new SpeechSynthesisUtterance(text);
  u.lang = opts.lang;
  u.rate = opts.rate;
  const voice = window.speechSynthesis
    .getVoices()
    .find((v) => v.lang.replace('_', '-').toLowerCase().startsWith('ja'));
  if (voice) u.voice = voice;
  return u;
}

// ---------------- public API ----------------

export function stopSpeaking(): void {
  if (isNative()) void TextToSpeech.stop().catch(() => {});
  else if (hasWebSpeech()) window.speechSynthesis.cancel();
}

/** Speak Japanese text. Returns false when no speech engine is available. */
export function speak(text: string, opts: { rate?: number; lang?: string } = {}): boolean {
  const lang = opts.lang ?? 'ja-JP';
  const rate = opts.rate ?? defaultRate;
  if (isNative()) {
    void speakNative(text, lang, rate);
    return true;
  }
  if (!hasWebSpeech()) return false;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(makeUtterance(text, { rate, lang }));
  return true;
}

export interface Sequence {
  cancel: () => void;
  done: Promise<void>;
}

/**
 * Speak several lines one after another. `onLine(i)` fires when line i starts.
 * `done` resolves after the last line ends or after cancel().
 */
export function speakSequence(
  lines: string[],
  opts: { rate?: number; lang?: string; gapMs?: number; onLine?: (i: number) => void } = {},
): Sequence {
  let cancelled = false;
  let resolveDone: () => void = () => {};
  const done = new Promise<void>((r) => (resolveDone = r));
  if (!canSpeak() || lines.length === 0) {
    resolveDone();
    return { cancel: () => {}, done };
  }
  const gap = opts.gapMs ?? 350;
  const lang = opts.lang ?? 'ja-JP';
  const rate = opts.rate ?? defaultRate;

  if (isNative()) {
    void (async () => {
      for (let i = 0; i < lines.length && !cancelled; i++) {
        opts.onLine?.(i);
        await speakNative(lines[i]!, lang, rate);
        if (!cancelled && gap > 0 && i < lines.length - 1) await new Promise((r) => setTimeout(r, gap));
      }
      resolveDone();
    })();
    return {
      cancel: () => {
        cancelled = true;
        void TextToSpeech.stop().catch(() => {});
        resolveDone();
      },
      done,
    };
  }

  window.speechSynthesis.cancel();
  const playFrom = (i: number) => {
    if (cancelled || i >= lines.length) {
      resolveDone();
      return;
    }
    opts.onLine?.(i);
    const u = makeUtterance(lines[i]!, { rate, lang });
    const next = () => {
      if (cancelled) return resolveDone();
      setTimeout(() => playFrom(i + 1), gap);
    };
    u.onend = next;
    u.onerror = next;
    window.speechSynthesis.speak(u);
  };
  playFrom(0);
  return {
    cancel: () => {
      cancelled = true;
      window.speechSynthesis.cancel();
      resolveDone();
    },
    done,
  };
}

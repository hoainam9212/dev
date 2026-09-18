let defaultRate = 0.9;

/** Default speaking rate (set from the settings store). */
export function setDefaultRate(r: number): void {
  defaultRate = r;
}

export function canSpeak(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function stopSpeaking(): void {
  if (canSpeak()) window.speechSynthesis.cancel();
}

function makeUtterance(text: string, opts: { rate?: number; lang?: string } = {}): SpeechSynthesisUtterance {
  const u = new SpeechSynthesisUtterance(text);
  u.lang = opts.lang ?? 'ja-JP';
  u.rate = opts.rate ?? defaultRate;
  const voice = window.speechSynthesis
    .getVoices()
    .find((v) => v.lang.replace('_', '-').toLowerCase().startsWith('ja'));
  if (voice) u.voice = voice;
  return u;
}

/** Speak Japanese text with the browser TTS. Returns false when unsupported. */
export function speak(text: string, opts: { rate?: number; lang?: string } = {}): boolean {
  if (!canSpeak()) return false;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(makeUtterance(text, opts));
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
  window.speechSynthesis.cancel();
  const gap = opts.gapMs ?? 350;
  const playFrom = (i: number) => {
    if (cancelled || i >= lines.length) {
      resolveDone();
      return;
    }
    opts.onLine?.(i);
    const u = makeUtterance(lines[i]!, opts);
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

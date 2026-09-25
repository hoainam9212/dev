import { Capacitor } from '@capacitor/core';
import { SpeechRecognition as NativeSR } from '@capacitor-community/speech-recognition';
import { getT } from '../i18n';

interface RecognitionResultLike {
  results: ArrayLike<ArrayLike<{ transcript: string }>>;
}
interface RecognitionLike {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  continuous: boolean;
  onresult: ((e: RecognitionResultLike) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}
type RecognitionCtor = new () => RecognitionLike;

function getCtor(): RecognitionCtor | null {
  if (typeof window === 'undefined') return null;
  const w = window as unknown as { SpeechRecognition?: RecognitionCtor; webkitSpeechRecognition?: RecognitionCtor };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

const isNative = () => Capacitor.isNativePlatform();

export function canRecognize(): boolean {
  return isNative() || getCtor() !== null;
}

export type SttError = 'unsupported' | 'no-speech' | 'aborted' | 'not-allowed' | 'network' | 'error';

async function recognizeNative(lang: string): Promise<string> {
  const { available } = await NativeSR.available();
  if (!available) throw new Error('unsupported');
  const perm = await NativeSR.requestPermissions();
  if (perm.speechRecognition !== 'granted') throw new Error('not-allowed');
  try {
    const r = await NativeSR.start({ language: lang, maxResults: 1, partialResults: false, popup: false });
    const t = r.matches?.[0]?.trim() ?? '';
    if (!t) throw new Error('no-speech');
    return t;
  } catch (e) {
    const msg = (e as Error).message ?? '';
    if (msg === 'no-speech' || msg === 'not-allowed' || msg === 'unsupported') throw e;
    throw new Error(/no match|no speech|timeout/i.test(msg) ? 'no-speech' : 'error');
  }
}

/** Listen once and resolve with the best transcript. Rejects with an Error whose message is an SttError. */
export function recognizeOnce(opts: { lang?: string; timeoutMs?: number } = {}): Promise<string> {
  const lang = opts.lang ?? 'ja-JP';
  if (isNative()) return recognizeNative(lang);
  const Ctor = getCtor();
  if (!Ctor) return Promise.reject(new Error('unsupported'));
  return new Promise((resolve, reject) => {
    const rec = new Ctor();
    rec.lang = lang;
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    rec.continuous = false;
    let settled = false;
    const timer = setTimeout(() => {
      if (settled) return;
      settled = true;
      rec.abort();
      reject(new Error('no-speech'));
    }, opts.timeoutMs ?? 8000);
    rec.onresult = (e) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      const t = e.results[0]?.[0]?.transcript ?? '';
      resolve(t.trim());
    };
    rec.onerror = (e) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      const code = (['no-speech', 'aborted', 'not-allowed', 'network'] as const).includes(e.error as never) ? e.error : 'error';
      reject(new Error(code));
    };
    rec.onend = () => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      reject(new Error('no-speech'));
    };
    try {
      rec.start();
    } catch {
      settled = true;
      clearTimeout(timer);
      reject(new Error('error'));
    }
  });
}

/** User-facing text for an SttError, in the language active at call time. */
export function sttMessage(code: SttError): string {
  return getT().errors.stt[code];
}

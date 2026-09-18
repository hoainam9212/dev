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

export function canRecognize(): boolean {
  return getCtor() !== null;
}

export type SttError = 'unsupported' | 'no-speech' | 'aborted' | 'not-allowed' | 'network' | 'error';

/** Listen once and resolve with the best transcript. Rejects with an Error whose message is an SttError. */
export function recognizeOnce(opts: { lang?: string; timeoutMs?: number } = {}): Promise<string> {
  const Ctor = getCtor();
  if (!Ctor) return Promise.reject(new Error('unsupported'));
  return new Promise((resolve, reject) => {
    const rec = new Ctor();
    rec.lang = opts.lang ?? 'ja-JP';
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

export const STT_MESSAGES: Record<SttError, string> = {
  unsupported: 'Trình duyệt này không hỗ trợ nhận dạng giọng nói. Hãy dùng Chrome hoặc Edge.',
  'no-speech': 'Không nghe thấy gì. Hãy thử nói lại gần micro hơn.',
  aborted: 'Đã hủy ghi âm.',
  'not-allowed': 'Bạn chưa cho phép dùng micro. Hãy bật quyền micro cho trang này.',
  network: 'Lỗi mạng khi nhận dạng giọng nói.',
  error: 'Có lỗi khi nhận dạng giọng nói. Hãy thử lại.',
};

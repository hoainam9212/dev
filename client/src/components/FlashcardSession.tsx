import { useEffect, useRef, useState, type ReactNode } from 'react';
import type { Grade, ItemType } from '@nihongo/shared';
import { recordReview, logSession } from '../db/srs';
import { useProgress } from '../store/progress';
import { speak, useStopSpeechOnUnmount } from '../lib/tts';
import { Mascot } from './Mascot';

export interface CardItem {
  id: string;
  type: ItemType;
  front: ReactNode;
  back: ReactNode;
  speakText?: string;
}

interface Props {
  items: CardItem[];
  onFinish: (r: { reviewed: number; correct: number }) => void;
}

const GRADES: { g: Grade; label: string; cls: string; hint: string }[] = [
  { g: 0, label: 'Quên', cls: 'bg-rose text-white', hint: '10 phút' },
  { g: 1, label: 'Khó', cls: 'bg-lavender text-text', hint: 'ngắn' },
  { g: 2, label: 'Tốt', cls: 'bg-sky text-text', hint: 'bình thường' },
  { g: 3, label: 'Dễ', cls: 'bg-emerald-300 text-emerald-900', hint: 'dài' },
];

/** Generic SRS flashcard runner. Grade 0 re-queues the card once at the end. */
export function FlashcardSession({ items, onFinish }: Props) {
  useStopSpeechOnUnmount();
  const [queue, setQueue] = useState<CardItem[]>(items);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [reviewed, setReviewed] = useState(0);
  const [correct, setCorrect] = useState(0);
  const requeued = useRef(new Set<string>());
  const addXp = useProgress((s) => s.addXp);
  const finished = useRef(false);
  const startedAt = useRef(new Date().toISOString());

  useEffect(() => {
    setQueue(items);
    setIdx(0);
    setFlipped(false);
    setReviewed(0);
    setCorrect(0);
    requeued.current.clear();
    finished.current = false;
  }, [items]);

  const card = queue[idx];

  useEffect(() => {
    if (!card && queue.length > 0 && !finished.current) {
      finished.current = true;
      const type = queue[0]!.type;
      void logSession({ startedAt: startedAt.current, kind: 'flashcard', type, correct, total: reviewed, xp: 0 });
      onFinish({ reviewed, correct });
    }
  }, [card, queue, reviewed, correct, onFinish]);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-8">
        <Mascot mood="happy" size={110} />
        <p className="font-bold text-muted">Không có thẻ nào để học. Tuyệt vời!</p>
      </div>
    );
  }

  if (!card) {
    const pct = reviewed ? Math.round((correct / reviewed) * 100) : 0;
    return (
      <div className="flex flex-col items-center gap-2 py-6" data-testid="session-summary">
        <Mascot mood={pct >= 80 ? 'happy' : 'neutral'} size={120} />
        <p className="text-xl font-black text-rose">Xong phiên học!</p>
        <p className="font-bold text-muted">
          Đã ôn {reviewed} thẻ · Nhớ {correct}
        </p>
      </div>
    );
  }

  const grade = async (g: Grade) => {
    await recordReview(card.id, card.type, g);
    const xp = g >= 2 ? 3 : g === 1 ? 1 : 0;
    if (xp) addXp(xp);
    setReviewed((r) => r + 1);
    if (g >= 1) setCorrect((c) => c + 1);
    if (g === 0 && !requeued.current.has(card.id)) {
      requeued.current.add(card.id);
      setQueue((q) => [...q, card]);
    }
    setFlipped(false);
    setIdx((i) => i + 1);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm font-bold text-muted">
        Thẻ {idx + 1} / {queue.length}
      </p>
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        className="card flex min-h-56 w-full max-w-md flex-col items-center justify-center gap-2 p-6 text-center transition hover:-translate-y-0.5"
        aria-label={flipped ? 'Mặt sau' : 'Mặt trước, chạm để lật'}
        data-testid="flashcard"
      >
        {flipped ? card.back : card.front}
        {!flipped && <span className="mt-2 text-xs text-muted">Chạm để lật</span>}
      </button>
      {card.speakText && (
        <button type="button" className="btn-sky text-sm" onClick={() => speak(card.speakText!)}>
          🔊 Nghe
        </button>
      )}
      {flipped ? (
        <div className="grid w-full max-w-md grid-cols-4 gap-2">
          {GRADES.map((x) => (
            <button
              key={x.g}
              type="button"
              onClick={() => void grade(x.g)}
              className={`flex flex-col items-center rounded-2xl px-2 py-2 font-bold transition active:scale-95 ${x.cls}`}
            >
              <span>{x.label}</span>
              <span className="text-[10px] opacity-80">{x.hint}</span>
            </button>
          ))}
        </div>
      ) : (
        <button type="button" className="btn-primary" onClick={() => setFlipped(true)}>
          Lật thẻ
        </button>
      )}
    </div>
  );
}

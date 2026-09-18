import { useEffect, useState } from 'react';
import type { Grammar } from '@nihongo/shared';
import { speak } from '../../lib/tts';
import { recordReview } from '../../db/srs';
import { useProgress } from '../../store/progress';

interface Props {
  grammar: Grammar;
  onClose: () => void;
}

export function GrammarLesson({ grammar, onClose }: Props) {
  const [marked, setMarked] = useState(false);
  const addXp = useProgress((s) => s.addXp);

  useEffect(() => setMarked(false), [grammar.id]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 md:items-center md:p-6" onClick={onClose}>
      <div
        role="dialog"
        aria-label={`Ngữ pháp ${grammar.title}`}
        className="card max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-b-none p-5 md:rounded-b-3xl md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="text-xs font-bold text-muted">{grammar.level}</span>
            <h2 className="text-2xl font-black">{grammar.title}</h2>
          </div>
          <button type="button" className="btn-soft" onClick={onClose} aria-label="Đóng">
            ✕
          </button>
        </div>
        <div className="mt-4 space-y-4">
          <section>
            <p className="text-xs font-bold text-muted">Ý nghĩa</p>
            <p className="font-bold">{grammar.meaning}</p>
          </section>
          <section>
            <p className="text-xs font-bold text-muted">Cấu trúc</p>
            <p className="rounded-2xl bg-lavender/30 px-4 py-2 font-mono text-sm">{grammar.formation}</p>
          </section>
          <section>
            <p className="text-xs font-bold text-muted">Ví dụ</p>
            <ul className="mt-1 space-y-2">
              {grammar.examples.map((ex, i) => (
                <li key={i} className="rounded-2xl bg-cream p-3 dark:bg-bg">
                  <div className="flex items-start gap-2">
                    <button type="button" className="text-rose" onClick={() => speak(ex.ja)} aria-label="Nghe ví dụ">
                      🔊
                    </button>
                    <div>
                      <p className="text-lg font-bold">{ex.ja}</p>
                      <p className="text-xs text-muted">{ex.romaji}</p>
                      <p className="text-sm">{ex.en}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
          <button
            type="button"
            className="btn-primary"
            disabled={marked}
            onClick={async () => {
              await recordReview(grammar.id, 'grammar', 2);
              addXp(3);
              setMarked(true);
            }}
          >
            {marked ? '✓ Đã thêm vào ôn tập' : '＋ Đánh dấu đã học'}
          </button>
        </div>
      </div>
    </div>
  );
}

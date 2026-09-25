import { useEffect, useRef, useState } from 'react';
import type { Kanji } from '@nihongo/shared';
import { StrokeAnimation } from '../../components/StrokeAnimation';
import { WritingPractice } from '../../components/WritingPractice';
import { useVocabByIds } from '../../content/useVocabByIds';
import { speak, useStopSpeechOnUnmount } from '../../lib/tts';
import { recordReview } from '../../db/srs';
import { useProgress } from '../../store/progress';
import { useSwipe } from '../../lib/useSwipe';

interface Props {
  kanji: Kanji;
  onClose: () => void;
  /** Neighbours in the list the kanji was opened from; enable swipe, arrow keys and ‹ › buttons. */
  onNext?: () => void;
  onPrev?: () => void;
  /** e.g. "3 / 79" */
  position?: string;
}

export function KanjiDetail({ kanji, onClose, onNext, onPrev, position }: Props) {
  useStopSpeechOnUnmount();
  const [play, setPlay] = useState(0);
  const [writing, setWriting] = useState(false);
  const [marked, setMarked] = useState(false);
  const [dir, setDir] = useState<'next' | 'prev' | null>(null);
  const { data: vocab } = useVocabByIds(kanji.vocabIds);
  const addXp = useProgress((s) => s.addXp);
  const next = onNext && (() => (setDir('next'), onNext()));
  const prev = onPrev && (() => (setDir('prev'), onPrev()));
  const swipe = useSwipe({ onNext: () => next?.(), onPrev: () => prev?.() });

  const dialog = useRef<HTMLDivElement>(null);
  // Writing mode stays on while moving between kanji, so a learner can practise several in a row.
  useEffect(() => {
    setMarked(false);
    setPlay((p) => p + 1);
    dialog.current?.scrollTo?.({ top: 0 }); // a swipe from lower down would otherwise hide the new kanji
  }, [kanji.id]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') next?.();
      else if (e.key === 'ArrowLeft') prev?.();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, next, prev]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 md:items-center md:p-6" onClick={onClose}>
      <div
        ref={dialog}
        role="dialog"
        aria-label={`Kanji ${kanji.char}`}
        className="card max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-b-none p-5 md:rounded-b-3xl md:p-8"
        onClick={(e) => e.stopPropagation()}
        {...swipe}
      >
        <div
          key={kanji.id}
          className={dir === 'next' ? 'slide-from-right' : dir === 'prev' ? 'slide-from-left' : undefined}
        >
        <div className="flex items-start justify-between">
          <div>
            <span className="text-xs font-bold text-muted">{kanji.level} · {kanji.strokes} nét{kanji.grade ? ` · lớp ${kanji.grade}` : ''}</span>
            <h2 className="text-6xl font-black">{kanji.char}</h2>
          </div>
          <div className="flex items-center gap-1">
            {prev && next && (
              <>
                <button type="button" className="btn-soft px-3!" onClick={prev} aria-label="Kanji trước">
                  ‹
                </button>
                {position && <span className="px-1 text-xs font-bold text-muted">{position}</span>}
                <button type="button" className="btn-soft px-3!" onClick={next} aria-label="Kanji sau">
                  ›
                </button>
              </>
            )}
            <button type="button" className="btn-soft px-3!" onClick={onClose} aria-label="Đóng">
              ✕
            </button>
          </div>
        </div>

        {writing ? (
          <div className="mt-4">
            <WritingPractice paths={kanji.strokePaths} label={kanji.char} onComplete={({ score }) => addXp(score >= 80 ? 3 : 1)} />
            <div className="mt-3 flex justify-center">
              <button type="button" className="btn-soft" onClick={() => setWriting(false)}>
                ← Quay lại
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-4 grid gap-5 md:grid-cols-[170px_1fr]">
            <div className="flex flex-col items-center gap-2">
              {kanji.strokePaths.length ? <StrokeAnimation paths={kanji.strokePaths} numbers={kanji.strokeNumbers} playKey={play} size={170} /> : null}
              <div className="flex gap-2">
                <button type="button" className="btn-soft text-sm" onClick={() => setPlay((p) => p + 1)}>
                  ▶ Phát lại
                </button>
                <button type="button" className="btn-sky text-sm" onClick={() => setWriting(true)} disabled={!kanji.strokePaths.length}>
                  ✍️ Luyện viết
                </button>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-lg font-bold">{kanji.meanings.join(', ')}</p>
              <Readings label="音 On" items={kanji.on} />
              <Readings label="訓 Kun" items={kanji.kun} />
              <div>
                <p className="text-xs font-bold text-muted">Từ vựng chứa {kanji.char}</p>
                <ul className="mt-1 space-y-1">
                  {vocab.map((v) => (
                    <li key={v.id} className="flex items-baseline gap-2 text-sm">
                      <button type="button" className="text-rose" onClick={() => speak(v.word)} aria-label={`Nghe ${v.word}`}>
                        🔊
                      </button>
                      <span className="font-bold">{v.word}</span>
                      <span className="text-muted">{v.reading}</span>
                      <span>{v.meanings.slice(0, 2).join(', ')}</span>
                      <span className="ml-auto text-xs text-muted">{v.level}</span>
                    </li>
                  ))}
                  {vocab.length === 0 && <li className="text-sm text-muted">Chưa có từ ví dụ.</li>}
                </ul>
              </div>
              <button
                type="button"
                className="btn-primary"
                disabled={marked}
                onClick={async () => {
                  await recordReview(kanji.id, 'kanji', 2);
                  addXp(3);
                  setMarked(true);
                }}
              >
                {marked ? '✓ Đã thêm vào ôn tập' : '＋ Đánh dấu đã học'}
              </button>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}

function Readings({ label, items }: { label: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <div>
      <p className="text-xs font-bold text-muted">{label}</p>
      <div className="mt-1 flex flex-wrap gap-1">
        {items.map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => speak(r.replace(/[-.]/g, ''))}
            className="rounded-full bg-sakura/30 px-3 py-0.5 text-sm font-bold hover:bg-sakura/60"
          >
            {r}
          </button>
        ))}
      </div>
    </div>
  );
}

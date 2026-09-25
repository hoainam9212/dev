import { useEffect, useState } from 'react';
import type { KanaChar } from '@nihongo/shared';
import { StrokeAnimation, strokeTimings } from '../../components/StrokeAnimation';
import { speak, useStopSpeechOnUnmount } from '../../lib/tts';

interface Props {
  chars: KanaChar[];
}

function groupRows(chars: KanaChar[]): { row: string; items: KanaChar[] }[] {
  const out: { row: string; items: KanaChar[] }[] = [];
  for (const c of chars) {
    const last = out[out.length - 1];
    if (last && last.row === c.row) last.items.push(c);
    else out.push({ row: c.row, items: [c] });
  }
  return out;
}

/** One cell per character: yōon like きゃ show き and ゃ side by side instead of stacked in one box. */
function splitStrokes(c: KanaChar) {
  const counts = c.strokeSplit ?? [c.strokePaths.length];
  let start = 0;
  let startDelay = 0; // the next cell starts once the previous one has finished drawing
  return counts.map((n) => {
    const paths = c.strokePaths.slice(start, start + n);
    const cell = { paths, numbers: c.strokeNumbers?.slice(start, start + n), start, startDelay };
    start += n;
    startDelay += strokeTimings(paths).total;
    return cell;
  });
}

export function KanaChart({ chars }: Props) {
  useStopSpeechOnUnmount();
  const [sel, setSel] = useState<KanaChar | null>(null);
  const [play, setPlay] = useState(0);
  const rows = groupRows(chars);

  useEffect(() => {
    if (!sel) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSel(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [sel]);

  return (
    <div className="grid gap-4 md:grid-cols-[1fr_280px]">
      {/* on phones the open sheet covers the bottom of the page; leave room to reach the last rows */}
      <div className={`space-y-2 ${sel ? 'pb-80 md:pb-0' : ''}`}>
        {rows.map((r) => (
          <div key={r.row} className={`grid gap-2 ${r.items[0]!.kana.length > 1 ? 'grid-cols-3' : 'grid-cols-5'}`}>
            {r.items.map((c) => (
              <button
                key={c.kana}
                type="button"
                onClick={() => {
                  setSel(c);
                  setPlay((p) => p + 1);
                  speak(c.kana);
                }}
                className={`card flex flex-col items-center py-2 transition hover:-translate-y-0.5 ${
                  sel?.kana === c.kana ? 'ring-2 ring-rose' : ''
                }`}
              >
                <span className="whitespace-nowrap text-2xl font-black md:text-3xl">{c.kana}</span>
                <span className="text-xs text-muted">{c.romaji}</span>
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Phones: a bottom sheet over the page, so the stroke animation plays where the learner is looking
          (a panel after the grid would animate off-screen). Desktop: sticky side column. */}
      <aside
        aria-label="Chi tiết chữ"
        className={`card h-fit p-4 md:sticky md:top-4 ${
          sel
            ? // `!` because the unlayered .card rule would otherwise win over these utilities
              'fixed inset-x-0 bottom-0 z-50 max-h-[75vh] overflow-y-auto max-md:rounded-b-none! max-md:shadow-2xl! md:inset-auto md:z-auto md:max-h-none'
            : 'hidden md:block'
        }`}
      >
        {sel ? (
          <div className="relative flex flex-col items-center gap-3">
            <button
              type="button"
              className="btn-soft absolute right-0 top-0 md:hidden!"
              onClick={() => setSel(null)}
              aria-label="Đóng"
            >
              ✕
            </button>
            <span className="text-6xl font-black">{sel.kana}</span>
            <span className="text-xl font-bold text-rose">{sel.romaji}</span>
            {sel.strokePaths.length > 0 ? (
              <div className="flex gap-2">
                {splitStrokes(sel).map(({ paths, numbers, start, startDelay }) => (
                  <StrokeAnimation
                    key={start}
                    paths={paths}
                    numbers={numbers}
                    startDelay={startDelay}
                    playKey={play}
                    size={sel.strokeSplit ? 110 : 150}
                  />
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted">Chưa có dữ liệu nét.</p>
            )}
            {sel.mnemonic && <p className="text-center text-sm text-muted">💡 {sel.mnemonic}</p>}
            <div className="flex gap-2">
              <button type="button" className="btn-sky text-sm" onClick={() => speak(sel.kana)}>
                🔊 Nghe
              </button>
              <button type="button" className="btn-soft text-sm" onClick={() => setPlay((p) => p + 1)}>
                ▶ Phát lại
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-sm text-muted">Chạm một chữ để xem thứ tự nét và mẹo nhớ.</p>
        )}
      </aside>
    </div>
  );
}

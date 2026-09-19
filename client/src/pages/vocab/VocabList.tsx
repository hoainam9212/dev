import { useMemo, useState } from 'react';
import type { Level, ProgressItem, Sentence, Vocab } from '@nihongo/shared';
import { SrsBadge } from '../../components/SrsBadge';
import { speak, useStopSpeechOnUnmount } from '../../lib/tts';
import { useSentenceMap } from '../../content/useSentenceMap';

interface Props {
  vocab: Vocab[];
  level: Level;
  progress?: Map<string, ProgressItem>;
}

const PAGE = 50;

export function VocabList({ vocab, level, progress }: Props) {
  useStopSpeechOnUnmount();
  const [q, setQ] = useState('');
  const [limit, setLimit] = useState(PAGE);
  const [open, setOpen] = useState<string | null>(null);
  const sentences = useSentenceMap(level);

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return vocab;
    return vocab.filter(
      (v) => v.word.includes(t) || v.reading.includes(t) || v.meanings.some((m) => m.toLowerCase().includes(t)),
    );
  }, [vocab, q]);

  return (
    <div className="space-y-3">
      <input
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
          setLimit(PAGE);
        }}
        placeholder="Tìm từ, cách đọc hoặc nghĩa…"
        aria-label="Tìm kiếm"
        className="w-full rounded-full bg-cream px-5 py-2.5 ring-2 ring-sakura/50 focus:outline-none focus:ring-rose dark:bg-bg"
      />
      <p className="text-sm text-muted">{filtered.length} từ</p>
      <ul className="divide-y divide-sakura/30">
        {filtered.slice(0, limit).map((v) => {
          const isOpen = open === v.id;
          const ex = v.sentenceIds.map((id) => sentences.get(id)).filter((s): s is Sentence => !!s);
          return (
            <li key={v.id} className="py-2">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="flex flex-1 items-baseline gap-3 text-left"
                  onClick={() => setOpen(isOpen ? null : v.id)}
                  aria-expanded={isOpen}
                >
                  <span className="text-xl font-black">{v.word}</span>
                  {v.reading !== v.word && <span className="text-sm text-muted">{v.reading}</span>}
                  <span className="flex-1 text-sm">{v.meanings.join(', ')}</span>
                </button>
                <SrsBadge p={progress?.get(v.id)} />
                <button type="button" className="btn-sky px-3 py-1 text-sm" onClick={() => speak(v.word)} aria-label={`Nghe ${v.word}`}>
                  🔊
                </button>
              </div>
              {isOpen && (
                <div className="mt-2 rounded-2xl bg-cream p-3 text-sm dark:bg-bg">
                  {ex.length === 0 && <p className="text-muted">Chưa có câu ví dụ.</p>}
                  {ex.map((s) => (
                    <div key={s.id} className="flex items-start gap-2 py-1">
                      <button type="button" className="text-rose" onClick={() => speak(s.ja)} aria-label="Nghe câu">
                        🔊
                      </button>
                      <div>
                        <p className="font-bold">{s.ja}</p>
                        <p className="text-muted">{s.en}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </li>
          );
        })}
      </ul>
      {limit < filtered.length && (
        <div className="flex justify-center">
          <button type="button" className="btn-soft" onClick={() => setLimit((l) => l + PAGE)}>
            Xem thêm
          </button>
        </div>
      )}
    </div>
  );
}

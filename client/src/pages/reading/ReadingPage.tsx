import { useEffect, useMemo, useState } from 'react';
import type { ReadingLesson } from '@nihongo/shared';
import { useJson } from '../../content/loader';
import { useLevel } from '../../store/level';
import { LevelPicker } from '../../components/LevelPicker';
import { LoadingCat, ErrorCat } from '../../components/LoadingCat';
import { ReadingLessonView } from './ReadingLessonView';

const ALL = 'Tất cả';

export function ReadingPage() {
  const level = useLevel((s) => s.level);
  const { data, error, loading } = useJson<ReadingLesson[]>(`reading/${level.toLowerCase()}.json`);
  const [sel, setSel] = useState<ReadingLesson | null>(null);
  const [topic, setTopic] = useState(ALL);

  useEffect(() => {
    setSel(null);
    setTopic(ALL);
  }, [level]);

  const topics = useMemo(() => {
    const counts = new Map<string, number>();
    for (const l of data ?? []) if (l.topic) counts.set(l.topic, (counts.get(l.topic) ?? 0) + 1);
    return [...counts.entries()];
  }, [data]);
  const shown = (data ?? []).filter((l) => topic === ALL || l.topic === topic);

  return (
    <div className="space-y-4">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-black text-rose">Đọc hiểu</h1>
        <LevelPicker />
      </header>
      <section className="card p-4 md:p-6">
        {loading && <LoadingCat />}
        {error && <ErrorCat text={error} />}
        {data && !sel && (
          <div className="space-y-4">
            {topics.length > 1 && (
              <div className="flex flex-wrap gap-2" role="group" aria-label="Lọc theo chủ đề">
                {[[ALL, data.length] as const, ...topics].map(([t, n]) => (
                  <button
                    key={t}
                    type="button"
                    aria-pressed={topic === t}
                    onClick={() => setTopic(t)}
                    className={`rounded-full px-3 py-1 text-xs font-bold transition ${topic === t ? 'bg-rose text-white shadow' : 'bg-sakura/25 hover:bg-sakura/50'}`}
                  >
                    {t} · {n}
                  </button>
                ))}
              </div>
            )}
            <div className="grid gap-3 sm:grid-cols-2">
              {shown.map((l) => (
                <button key={l.id} type="button" onClick={() => setSel(l)} className="card p-4 text-left transition hover:-translate-y-0.5">
                  {l.topic && <span className="rounded-full bg-lavender/40 px-2 py-0.5 text-[11px] font-bold">{l.topic}</span>}
                  <p className="mt-1 text-lg font-black" lang="ja">
                    {l.title}
                  </p>
                  <p className="text-sm text-muted">
                    {l.vocab.length} từ mới · {l.questions.length} câu hỏi
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}
        {data && sel && <ReadingLessonView key={sel.id} lesson={sel} onBack={() => setSel(null)} />}
      </section>
    </div>
  );
}

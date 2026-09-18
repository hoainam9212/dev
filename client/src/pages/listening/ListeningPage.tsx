import { useEffect, useState } from 'react';
import type { ListeningLesson } from '@nihongo/shared';
import { useJson } from '../../content/loader';
import { useLevel } from '../../store/level';
import { LevelPicker } from '../../components/LevelPicker';
import { LoadingCat, ErrorCat } from '../../components/LoadingCat';
import { ListeningLessonView } from './ListeningLessonView';

export function ListeningPage() {
  const level = useLevel((s) => s.level);
  const { data, error, loading } = useJson<ListeningLesson[]>(`listening/${level.toLowerCase()}.json`);
  const [sel, setSel] = useState<ListeningLesson | null>(null);
  useEffect(() => setSel(null), [level]);

  return (
    <div className="space-y-4">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-black text-rose">Nghe</h1>
        <LevelPicker />
      </header>
      <section className="card p-4 md:p-6">
        {loading && <LoadingCat />}
        {error && <ErrorCat text={error} />}
        {data && !sel && (
          <div className="grid gap-3 sm:grid-cols-2">
            {data.map((l) => (
              <button key={l.id} type="button" onClick={() => setSel(l)} className="card p-4 text-left transition hover:-translate-y-0.5">
                <p className="text-lg font-black">🎧 {l.title}</p>
                <p className="text-sm text-muted">
                  {l.script.length} câu thoại · {l.questions.length} câu hỏi · {l.dictation.length} câu chính tả
                </p>
              </button>
            ))}
          </div>
        )}
        {data && sel && <ListeningLessonView key={sel.id} lesson={sel} onBack={() => setSel(null)} />}
      </section>
    </div>
  );
}

import { useEffect, useState } from 'react';
import type { ReadingLesson } from '@nihongo/shared';
import { useJson } from '../../content/loader';
import { useLevel } from '../../store/level';
import { LevelPicker } from '../../components/LevelPicker';
import { LoadingCat, ErrorCat } from '../../components/LoadingCat';
import { ReadingLessonView } from './ReadingLessonView';

export function ReadingPage() {
  const level = useLevel((s) => s.level);
  const { data, error, loading } = useJson<ReadingLesson[]>(`reading/${level.toLowerCase()}.json`);
  const [sel, setSel] = useState<ReadingLesson | null>(null);
  useEffect(() => setSel(null), [level]);

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
          <div className="grid gap-3 sm:grid-cols-2">
            {data.map((l) => (
              <button key={l.id} type="button" onClick={() => setSel(l)} className="card p-4 text-left transition hover:-translate-y-0.5">
                <p className="text-lg font-black">{l.title}</p>
                <p className="text-sm text-muted">
                  {l.vocab.length} từ mới · {l.questions.length} câu hỏi
                </p>
              </button>
            ))}
          </div>
        )}
        {data && sel && <ReadingLessonView key={sel.id} lesson={sel} onBack={() => setSel(null)} />}
      </section>
    </div>
  );
}

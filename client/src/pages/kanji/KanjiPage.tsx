import { useState } from 'react';
import type { Kanji } from '@nihongo/shared';
import { useKanji } from '../../content/loader';
import { useLevel } from '../../store/level';
import { useSettings } from '../../store/settings';
import { useProgressMap } from '../../db/srs';
import { LevelPicker } from '../../components/LevelPicker';
import { Segmented } from '../../components/Segmented';
import { LoadingCat, ErrorCat } from '../../components/LoadingCat';
import { KanjiGrid } from './KanjiGrid';
import { KanjiDetail } from './KanjiDetail';
import { KanjiFlashcards } from './KanjiFlashcards';
import { KanjiQuiz } from './KanjiQuiz';
import { KanjiWrite } from './KanjiWrite';

type Mode = 'grid' | 'cards' | 'quiz' | 'write';

export function KanjiPage() {
  const level = useLevel((s) => s.level);
  const { data, error, loading } = useKanji(level);
  const progress = useProgressMap('kanji');
  const newLimit = useSettings((s) => s.newLimit);
  const [mode, setMode] = useState<Mode>('grid');
  // the open kanji, as an index into the list it was picked from (the grid after search)
  const [sel, setSel] = useState<{ list: Kanji[]; i: number } | null>(null);
  const step = (d: number) => setSel((s) => s && { ...s, i: (s.i + d + s.list.length) % s.list.length });

  const learned = data && progress ? data.filter((k) => progress.has(k.id)).length : 0;

  return (
    <div className="space-y-4">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-black text-rose">Kanji</h1>
        <LevelPicker />
      </header>
      <div className="flex flex-wrap items-center gap-3">
        <Segmented<Mode>
          ariaLabel="Chế độ"
          value={mode}
          onChange={setMode}
          options={[
            { value: 'grid', label: 'Lưới' },
            { value: 'cards', label: 'Thẻ ghi nhớ' },
            { value: 'quiz', label: 'Trắc nghiệm' },
            { value: 'write', label: 'Luyện viết' },
          ]}
        />
        {data && (
          <span className="text-sm text-muted">
            {data.length} kanji · đã học {learned}
          </span>
        )}
      </div>

      <section className="card p-4 md:p-6">
        {loading && <LoadingCat />}
        {error && <ErrorCat text={error} />}
        {data && progress && (
          <>
            {mode === 'grid' && <KanjiGrid kanji={data} progress={progress} onPick={(k, list) => setSel({ list, i: list.indexOf(k) })} />}
            {mode === 'cards' && <KanjiFlashcards key={level} kanji={data} progress={progress} newLimit={newLimit} />}
            {mode === 'quiz' && <KanjiQuiz key={level} kanji={data} />}
            {mode === 'write' && <KanjiWrite key={level} kanji={data} />}
          </>
        )}
      </section>
      {sel && (
        <KanjiDetail
          kanji={sel.list[sel.i]!}
          onClose={() => setSel(null)}
          {...(sel.list.length > 1 && {
            onNext: () => step(1),
            onPrev: () => step(-1),
            position: `${sel.i + 1} / ${sel.list.length}`,
          })}
        />
      )}
    </div>
  );
}

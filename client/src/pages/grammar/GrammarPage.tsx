import { useState } from 'react';
import type { Grammar } from '@nihongo/shared';
import { useGrammar } from '../../content/loader';
import { useLevel } from '../../store/level';
import { useSettings } from '../../store/settings';
import { useProgressMap } from '../../db/srs';
import { LevelPicker } from '../../components/LevelPicker';
import { Segmented } from '../../components/Segmented';
import { LoadingCat, ErrorCat } from '../../components/LoadingCat';
import { GrammarList } from './GrammarList';
import { GrammarLesson } from './GrammarLesson';
import { GrammarFlashcards } from './GrammarFlashcards';
import { GrammarQuiz } from './GrammarQuiz';
import { SentenceScramble } from './SentenceScramble';

type Mode = 'list' | 'cards' | 'quiz' | 'scramble';

export function GrammarPage() {
  const level = useLevel((s) => s.level);
  const { data, error, loading } = useGrammar(level);
  const progress = useProgressMap('grammar');
  const newLimit = useSettings((s) => s.newLimit);
  const [mode, setMode] = useState<Mode>('list');
  const [sel, setSel] = useState<Grammar | null>(null);
  const learned = data && progress ? data.filter((g) => progress.has(g.id)).length : 0;

  return (
    <div className="space-y-4">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-black text-rose">Ngữ pháp</h1>
        <LevelPicker />
      </header>
      <div className="flex flex-wrap items-center gap-3">
        <Segmented<Mode>
          ariaLabel="Chế độ"
          value={mode}
          onChange={setMode}
          options={[
            { value: 'list', label: 'Bài học' },
            { value: 'cards', label: 'Thẻ ghi nhớ' },
            { value: 'quiz', label: 'Trắc nghiệm' },
            { value: 'scramble', label: 'Sắp xếp câu' },
          ]}
        />
        {data && (
          <span className="text-sm text-muted">
            {data.length} mẫu · đã học {learned}
          </span>
        )}
      </div>
      <section className="card p-4 md:p-6">
        {loading && <LoadingCat />}
        {error && <ErrorCat text={error} />}
        {data && progress && (
          <>
            {mode === 'list' && <GrammarList grammar={data} progress={progress} onPick={setSel} />}
            {mode === 'cards' && <GrammarFlashcards key={level} grammar={data} progress={progress} newLimit={Math.min(newLimit, 10)} />}
            {mode === 'quiz' && <GrammarQuiz key={level} grammar={data} />}
            {mode === 'scramble' && <SentenceScramble key={level} grammar={data} />}
          </>
        )}
      </section>
      {sel && <GrammarLesson grammar={sel} onClose={() => setSel(null)} />}
    </div>
  );
}

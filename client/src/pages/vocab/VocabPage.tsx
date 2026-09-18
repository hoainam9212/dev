import { useState } from 'react';
import { useVocab } from '../../content/loader';
import { useLevel } from '../../store/level';
import { useSettings } from '../../store/settings';
import { useProgressMap } from '../../db/srs';
import { LevelPicker } from '../../components/LevelPicker';
import { Segmented } from '../../components/Segmented';
import { LoadingCat, ErrorCat } from '../../components/LoadingCat';
import { VocabList } from './VocabList';
import { VocabFlashcards } from './VocabFlashcards';
import { VocabQuiz } from './VocabQuiz';
import { VocabTyping } from './VocabTyping';
import { VocabListening } from './VocabListening';

type Mode = 'list' | 'cards' | 'quiz' | 'typing' | 'listening';

export function VocabPage() {
  const level = useLevel((s) => s.level);
  const { data, error, loading } = useVocab(level);
  const progress = useProgressMap('vocab');
  const newLimit = useSettings((s) => s.newLimit);
  const [mode, setMode] = useState<Mode>('list');

  const dueCount = data && progress ? data.filter((v) => progress.get(v.id) && progress.get(v.id)!.due <= new Date().toISOString()).length : 0;
  const learned = data && progress ? data.filter((v) => progress.has(v.id)).length : 0;

  return (
    <div className="space-y-4">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-black text-rose">Từ vựng</h1>
        <LevelPicker />
      </header>
      <div className="flex flex-wrap items-center gap-3">
        <Segmented<Mode>
          ariaLabel="Chế độ"
          value={mode}
          onChange={setMode}
          options={[
            { value: 'list', label: 'Danh sách' },
            { value: 'cards', label: 'Thẻ ghi nhớ' },
            { value: 'quiz', label: 'Trắc nghiệm' },
            { value: 'typing', label: 'Gõ đáp án' },
            { value: 'listening', label: 'Nghe' },
          ]}
        />
        {data && (
          <span className="text-sm text-muted">
            {data.length} từ · đã học {learned} · đến hạn {dueCount}
          </span>
        )}
      </div>

      <section className="card p-4 md:p-6">
        {loading && <LoadingCat />}
        {error && <ErrorCat text={error} />}
        {data && progress && (
          <>
            {mode === 'list' && <VocabList vocab={data} level={level} progress={progress} />}
            {mode === 'cards' && <VocabFlashcards key={level} vocab={data} level={level} progress={progress} newLimit={newLimit} />}
            {mode === 'quiz' && <VocabQuiz key={level} vocab={data} />}
            {mode === 'typing' && <VocabTyping key={level} vocab={data} />}
            {mode === 'listening' && <VocabListening key={level} vocab={data} />}
          </>
        )}
      </section>
    </div>
  );
}

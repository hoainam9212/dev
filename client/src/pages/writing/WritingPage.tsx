import { useState } from 'react';
import { useGrammar, useKana, useKanji } from '../../content/loader';
import { useLevel } from '../../store/level';
import { LevelPicker } from '../../components/LevelPicker';
import { Segmented } from '../../components/Segmented';
import { LoadingCat, ErrorCat } from '../../components/LoadingCat';
import { KanaWrite } from '../kana/KanaWrite';
import { KanjiWrite } from '../kanji/KanjiWrite';
import { SentenceBuilder } from './SentenceBuilder';

type Mode = 'kana' | 'kanji' | 'sentence';
type Script = 'hiragana' | 'katakana';

export function WritingPage() {
  const level = useLevel((s) => s.level);
  const [mode, setMode] = useState<Mode>('kana');
  const [script, setScript] = useState<Script>('hiragana');
  const kana = useKana();
  const kanji = useKanji(level);
  const grammar = useGrammar(level);

  return (
    <div className="space-y-4">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-black text-rose">Viết</h1>
        {mode !== 'kana' && <LevelPicker />}
      </header>
      <div className="flex flex-wrap items-center gap-3">
        <Segmented<Mode>
          ariaLabel="Chế độ"
          value={mode}
          onChange={setMode}
          options={[
            { value: 'kana', label: 'Kana' },
            { value: 'kanji', label: 'Kanji' },
            { value: 'sentence', label: 'Đặt câu' },
          ]}
        />
        {mode === 'kana' && (
          <Segmented<Script>
            ariaLabel="Bảng chữ"
            value={script}
            onChange={setScript}
            options={[
              { value: 'hiragana', label: 'Hiragana' },
              { value: 'katakana', label: 'Katakana' },
            ]}
          />
        )}
      </div>
      <section className="card p-4 md:p-6">
        {mode === 'kana' &&
          (kana.loading ? <LoadingCat /> : kana.error || !kana.data ? <ErrorCat text={kana.error ?? 'Không có dữ liệu'} /> : <KanaWrite key={script} chars={kana.data[script]} />)}
        {mode === 'kanji' &&
          (kanji.loading ? <LoadingCat /> : kanji.error || !kanji.data ? <ErrorCat text={kanji.error ?? 'Không có dữ liệu'} /> : <KanjiWrite key={level} kanji={kanji.data} />)}
        {mode === 'sentence' &&
          (grammar.loading ? (
            <LoadingCat />
          ) : grammar.error || !grammar.data ? (
            <ErrorCat text={grammar.error ?? 'Không có dữ liệu'} />
          ) : (
            <SentenceBuilder key={level} grammar={grammar.data} />
          ))}
      </section>
    </div>
  );
}

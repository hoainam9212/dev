import { useState } from 'react';
import { useGrammar, useKana, useKanji } from '../../content/loader';
import { useLevel } from '../../store/level';
import { LevelPicker } from '../../components/LevelPicker';
import { Segmented } from '../../components/Segmented';
import { LoadingCat, ErrorCat } from '../../components/LoadingCat';
import { KanaWrite } from '../kana/KanaWrite';
import { KanjiWrite } from '../kanji/KanjiWrite';
import { SentenceBuilder } from './SentenceBuilder';
import { WritingLog } from './WritingLog';
import { useWritingCount } from '../../db/writings';
import { useT } from '../../i18n';

type Mode = 'kana' | 'kanji' | 'sentence' | 'log';
type Script = 'hiragana' | 'katakana';

export function WritingPage() {
  const t = useT();
  const level = useLevel((s) => s.level);
  const [mode, setMode] = useState<Mode>('kana');
  const [script, setScript] = useState<Script>('hiragana');
  const kana = useKana();
  const kanji = useKanji(level);
  const grammar = useGrammar(level);
  const savedCount = useWritingCount() ?? 0;

  return (
    <div className="space-y-4">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-black text-rose">{t.writing.title}</h1>
        {mode !== 'kana' && mode !== 'log' && <LevelPicker />}
      </header>
      <div className="flex flex-wrap items-center gap-3">
        <Segmented<Mode>
          ariaLabel={t.common.mode}
          value={mode}
          onChange={setMode}
          options={[
            { value: 'kana', label: t.writing.modes.kana },
            { value: 'kanji', label: t.writing.modes.kanji },
            { value: 'sentence', label: t.writing.modes.sentence },
            { value: 'log', label: savedCount ? `${t.writing.modes.log} · ${savedCount}` : t.writing.modes.log },
          ]}
        />
        {mode === 'kana' && (
          <Segmented<Script>
            ariaLabel={t.writing.script}
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
          (kana.loading ? <LoadingCat /> : kana.error || !kana.data ? <ErrorCat text={kana.error ?? t.writing.noData} /> : <KanaWrite key={script} chars={kana.data[script]} />)}
        {mode === 'kanji' &&
          (kanji.loading ? <LoadingCat /> : kanji.error || !kanji.data ? <ErrorCat text={kanji.error ?? t.writing.noData} /> : <KanjiWrite key={level} kanji={kanji.data} />)}
        {mode === 'log' && <WritingLog />}
        {mode === 'sentence' &&
          (grammar.loading ? (
            <LoadingCat />
          ) : grammar.error || !grammar.data ? (
            <ErrorCat text={grammar.error ?? t.writing.noData} />
          ) : (
            <SentenceBuilder key={level} grammar={grammar.data} />
          ))}
      </section>
    </div>
  );
}

import { useMemo, useState } from 'react';
import { kanjiMeanings, type Kanji, type Lang } from '@nihongo/shared';
import { QuizRunner, type QuizQuestion } from '../../components/QuizRunner';
import { Segmented } from '../../components/Segmented';
import { makeChoices, mulberry32, shuffle } from '../../lib/quiz';
import { useSessionSeed } from '../../lib/useSessionSeed';
import { useLang, useT } from '../../i18n';

export type KanjiDir = 'kanji→meaning' | 'meaning→kanji' | 'kanji→reading';

const reading = (k: Kanji) => k.on[0] ?? k.kun[0] ?? '';

export function buildKanjiQuestions(
  kanji: Kanji[],
  dir: KanjiDir,
  total: number,
  rng: () => number = Math.random,
  lang: Lang = 'vi',
): QuizQuestion[] {
  const meanings = (k: Kanji) => kanjiMeanings(k, lang);
  const pool = kanji.filter((k) => meanings(k).length > 0 && (dir !== 'kanji→reading' || reading(k)));
  const picked = shuffle(pool, rng).slice(0, Math.min(total, pool.length));
  return picked.map((target) => {
    const key = (k: Kanji) => (dir === 'meaning→kanji' ? k.char : dir === 'kanji→reading' ? reading(k) : meanings(k)[0]!);
    const options = makeChoices(target, pool, 4, key, rng);
    const choices = options.map((o) =>
      dir === 'meaning→kanji' ? o.char : dir === 'kanji→reading' ? reading(o) : meanings(o).slice(0, 2).join(', '),
    );
    return {
      prompt: dir === 'meaning→kanji' ? <span className="text-2xl">{meanings(target).slice(0, 2).join(', ')}</span> : target.char,
      promptClassName: dir === 'meaning→kanji' ? 'text-2xl' : 'text-7xl',
      choices,
      answer: options.indexOf(target),
      explain: `${target.char} · ${meanings(target)[0]}${reading(target) ? ` · ${reading(target)}` : ''}`,
    };
  });
}

export function KanjiQuiz({ kanji, total = 10 }: { kanji: Kanji[]; total?: number }) {
  const t = useT();
  const lang = useLang();
  const [dir, setDir] = useState<KanjiDir>('kanji→meaning');
  const [seed, setSeed] = useState(0);
  const [done, setDone] = useState(false);
  const rngSeed = useSessionSeed(seed);
  const questions = useMemo(
    () => buildKanjiQuestions(kanji, dir, total, mulberry32(rngSeed), lang),
    [kanji, dir, total, rngSeed, lang],
  );
  const restart = () => {
    setDone(false);
    setSeed((s) => s + 1);
  };
  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <Segmented<KanjiDir>
          ariaLabel={t.common.direction}
          value={dir}
          onChange={(d) => {
            setDir(d);
            restart();
          }}
          options={[
            { value: 'kanji→meaning', label: t.kanji.dirs.kanjiToMeaning },
            { value: 'meaning→kanji', label: t.kanji.dirs.meaningToKanji },
            { value: 'kanji→reading', label: t.kanji.dirs.kanjiToReading },
          ]}
        />
      </div>
      <QuizRunner key={seed} questions={questions} kind="quiz" type="kanji" onFinish={() => setDone(true)} />
      {done && (
        <div className="flex justify-center">
          <button type="button" className="btn-primary" onClick={restart}>
            {t.common.retry}
          </button>
        </div>
      )}
    </div>
  );
}

import { useMemo, useState } from 'react';
import { exampleTranslation, grammarMeaning, type Grammar, type Lang } from '@nihongo/shared';
import { QuizRunner, type QuizQuestion } from '../../components/QuizRunner';
import { Segmented } from '../../components/Segmented';
import { makeChoices, mulberry32, shuffle } from '../../lib/quiz';
import { useSessionSeed } from '../../lib/useSessionSeed';
import { useLang, useT } from '../../i18n';

export type GrammarDir = 'meaning→title' | 'example→title';

export function buildGrammarQuestions(
  grammar: Grammar[],
  dir: GrammarDir,
  total: number,
  rng: () => number = Math.random,
  lang: Lang = 'vi',
): QuizQuestion[] {
  const meaning = (g: Grammar) => grammarMeaning(g, lang);
  const pool = grammar.filter((g) => meaning(g) && (dir === 'meaning→title' || g.examples.length > 0));
  const picked = shuffle(pool, rng).slice(0, Math.min(total, pool.length));
  return picked.map((target) => {
    const options = makeChoices(target, pool, 4, (g) => g.title, rng);
    const ex = target.examples[0];
    return {
      prompt:
        dir === 'meaning→title' ? (
          <span className="text-2xl">{meaning(target)}</span>
        ) : (
          <span className="text-2xl">
            {ex?.ja}
            <span className="block text-base text-muted">{ex && exampleTranslation(ex, lang)}</span>
          </span>
        ),
      promptClassName: 'text-2xl',
      choices: options.map((o) => o.title),
      answer: options.indexOf(target),
      explain: dir === 'meaning→title' ? ex?.ja : meaning(target),
      speakText: ex?.ja,
    };
  });
}

export function GrammarQuiz({ grammar, total = 10 }: { grammar: Grammar[]; total?: number }) {
  const t = useT();
  const lang = useLang();
  const [dir, setDir] = useState<GrammarDir>('meaning→title');
  const [seed, setSeed] = useState(0);
  const [done, setDone] = useState(false);
  const rngSeed = useSessionSeed(seed);
  const questions = useMemo(
    () => buildGrammarQuestions(grammar, dir, total, mulberry32(rngSeed), lang),
    [grammar, dir, total, rngSeed, lang],
  );
  const restart = () => {
    setDone(false);
    setSeed((s) => s + 1);
  };
  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <Segmented<GrammarDir>
          ariaLabel={t.common.questionType}
          value={dir}
          onChange={(d) => {
            setDir(d);
            restart();
          }}
          options={[
            { value: 'meaning→title', label: t.grammar.dirs.meaningToTitle },
            { value: 'example→title', label: t.grammar.dirs.exampleToTitle },
          ]}
        />
      </div>
      <QuizRunner key={seed} questions={questions} kind="quiz" type="grammar" onFinish={() => setDone(true)} />
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

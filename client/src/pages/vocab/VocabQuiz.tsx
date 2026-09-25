import { useMemo, useState } from 'react';
import { vocabMeanings, type Lang, type Vocab } from '@nihongo/shared';
import { QuizRunner, type QuizQuestion } from '../../components/QuizRunner';
import { Segmented } from '../../components/Segmented';
import { makeChoices, mulberry32, shuffle } from '../../lib/quiz';
import { useSessionSeed } from '../../lib/useSessionSeed';
import { useLang, useT } from '../../i18n';

type Dir = 'word→meaning' | 'meaning→word';

export function buildVocabQuestions(
  vocab: Vocab[],
  dir: Dir,
  total: number,
  rng: () => number = Math.random,
  lang: Lang = 'vi',
): QuizQuestion[] {
  const meanings = (v: Vocab) => vocabMeanings(v, lang);
  const pool = vocab.filter((v) => meanings(v).length > 0);
  const picked = shuffle(pool, rng).slice(0, Math.min(total, pool.length));
  return picked.map((target) => {
    const key = (v: Vocab) => (dir === 'word→meaning' ? meanings(v)[0]! : v.word);
    const options = makeChoices(target, pool, 4, key, rng);
    return {
      prompt:
        dir === 'word→meaning' ? (
          <span>
            {target.word}
            {target.reading !== target.word && <span className="block text-lg text-muted">{target.reading}</span>}
          </span>
        ) : (
          <span className="text-2xl">{meanings(target).slice(0, 2).join(', ')}</span>
        ),
      promptClassName: dir === 'word→meaning' ? 'text-5xl' : 'text-2xl',
      choices: options.map((o) => (dir === 'word→meaning' ? meanings(o).slice(0, 2).join(', ') : o.word)),
      answer: options.indexOf(target),
      speakText: target.word,
      explain: dir === 'word→meaning' ? undefined : `${target.word} (${target.reading})`,
    };
  });
}

export function VocabQuiz({ vocab, total = 10 }: { vocab: Vocab[]; total?: number }) {
  const t = useT();
  const lang = useLang();
  const [dir, setDir] = useState<Dir>('word→meaning');
  const [seed, setSeed] = useState(0);
  const [done, setDone] = useState(false);
  const rngSeed = useSessionSeed(seed);
  const questions = useMemo(
    () => buildVocabQuestions(vocab, dir, total, mulberry32(rngSeed), lang),
    [vocab, dir, total, rngSeed, lang],
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <Segmented<Dir>
          ariaLabel={t.vocab.direction}
          value={dir}
          onChange={(d) => {
            setDir(d);
            setDone(false);
            setSeed((s) => s + 1);
          }}
          options={[
            { value: 'word→meaning', label: t.vocab.dirs.wordToMeaning },
            { value: 'meaning→word', label: t.vocab.dirs.meaningToWord },
          ]}
        />
      </div>
      <QuizRunner key={seed} questions={questions} kind="quiz" type="vocab" onFinish={() => setDone(true)} />
      {done && (
        <div className="flex justify-center">
          <button
            type="button"
            className="btn-primary"
            onClick={() => {
              setDone(false);
              setSeed((s) => s + 1);
            }}
          >
            {t.common.retry}
          </button>
        </div>
      )}
    </div>
  );
}

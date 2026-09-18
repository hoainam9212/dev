import { useMemo, useState } from 'react';
import type { Kanji } from '@nihongo/shared';
import { QuizRunner, type QuizQuestion } from '../../components/QuizRunner';
import { Segmented } from '../../components/Segmented';
import { makeChoices, shuffle } from '../../lib/quiz';

export type KanjiDir = 'kanji→meaning' | 'meaning→kanji' | 'kanji→reading';

const reading = (k: Kanji) => k.on[0] ?? k.kun[0] ?? '';

export function buildKanjiQuestions(kanji: Kanji[], dir: KanjiDir, total: number, rng: () => number = Math.random): QuizQuestion[] {
  const pool = kanji.filter((k) => k.meanings.length > 0 && (dir !== 'kanji→reading' || reading(k)));
  const picked = shuffle(pool, rng).slice(0, Math.min(total, pool.length));
  return picked.map((target) => {
    const key = (k: Kanji) => (dir === 'meaning→kanji' ? k.char : dir === 'kanji→reading' ? reading(k) : k.meanings[0]!);
    const options = makeChoices(target, pool, 4, key, rng);
    const choices = options.map((o) =>
      dir === 'meaning→kanji' ? o.char : dir === 'kanji→reading' ? reading(o) : o.meanings.slice(0, 2).join(', '),
    );
    return {
      prompt: dir === 'meaning→kanji' ? <span className="text-2xl">{target.meanings.slice(0, 2).join(', ')}</span> : target.char,
      promptClassName: dir === 'meaning→kanji' ? 'text-2xl' : 'text-7xl',
      choices,
      answer: options.indexOf(target),
      explain: `${target.char} · ${target.meanings[0]}${reading(target) ? ` · ${reading(target)}` : ''}`,
    };
  });
}

export function KanjiQuiz({ kanji, total = 10 }: { kanji: Kanji[]; total?: number }) {
  const [dir, setDir] = useState<KanjiDir>('kanji→meaning');
  const [seed, setSeed] = useState(0);
  const [done, setDone] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const questions = useMemo(() => buildKanjiQuestions(kanji, dir, total), [kanji, dir, total, seed]);
  const restart = () => {
    setDone(false);
    setSeed((s) => s + 1);
  };
  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <Segmented<KanjiDir>
          ariaLabel="Chiều hỏi"
          value={dir}
          onChange={(d) => {
            setDir(d);
            restart();
          }}
          options={[
            { value: 'kanji→meaning', label: 'Kanji → Nghĩa' },
            { value: 'meaning→kanji', label: 'Nghĩa → Kanji' },
            { value: 'kanji→reading', label: 'Kanji → Âm đọc' },
          ]}
        />
      </div>
      <QuizRunner key={seed} questions={questions} kind="quiz" type="kanji" onFinish={() => setDone(true)} />
      {done && (
        <div className="flex justify-center">
          <button type="button" className="btn-primary" onClick={restart}>
            Làm lại
          </button>
        </div>
      )}
    </div>
  );
}

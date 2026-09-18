import { useMemo, useState } from 'react';
import type { Grammar } from '@nihongo/shared';
import { QuizRunner, type QuizQuestion } from '../../components/QuizRunner';
import { Segmented } from '../../components/Segmented';
import { makeChoices, shuffle } from '../../lib/quiz';

export type GrammarDir = 'meaning→title' | 'example→title';

export function buildGrammarQuestions(grammar: Grammar[], dir: GrammarDir, total: number, rng: () => number = Math.random): QuizQuestion[] {
  const pool = grammar.filter((g) => g.meaning && (dir === 'meaning→title' || g.examples.length > 0));
  const picked = shuffle(pool, rng).slice(0, Math.min(total, pool.length));
  return picked.map((target) => {
    const options = makeChoices(target, pool, 4, (g) => g.title, rng);
    const ex = target.examples[0];
    return {
      prompt:
        dir === 'meaning→title' ? (
          <span className="text-2xl">{target.meaning}</span>
        ) : (
          <span className="text-2xl">
            {ex?.ja}
            <span className="block text-base text-muted">{ex?.en}</span>
          </span>
        ),
      promptClassName: 'text-2xl',
      choices: options.map((o) => o.title),
      answer: options.indexOf(target),
      explain: dir === 'meaning→title' ? ex?.ja : target.meaning,
      speakText: ex?.ja,
    };
  });
}

export function GrammarQuiz({ grammar, total = 10 }: { grammar: Grammar[]; total?: number }) {
  const [dir, setDir] = useState<GrammarDir>('meaning→title');
  const [seed, setSeed] = useState(0);
  const [done, setDone] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const questions = useMemo(() => buildGrammarQuestions(grammar, dir, total), [grammar, dir, total, seed]);
  const restart = () => {
    setDone(false);
    setSeed((s) => s + 1);
  };
  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <Segmented<GrammarDir>
          ariaLabel="Kiểu câu hỏi"
          value={dir}
          onChange={(d) => {
            setDir(d);
            restart();
          }}
          options={[
            { value: 'meaning→title', label: 'Nghĩa → Mẫu' },
            { value: 'example→title', label: 'Ví dụ → Mẫu' },
          ]}
        />
      </div>
      <QuizRunner key={seed} questions={questions} kind="quiz" type="grammar" onFinish={() => setDone(true)} />
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

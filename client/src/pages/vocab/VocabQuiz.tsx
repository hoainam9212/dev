import { useMemo, useState } from 'react';
import type { Vocab } from '@nihongo/shared';
import { QuizRunner, type QuizQuestion } from '../../components/QuizRunner';
import { Segmented } from '../../components/Segmented';
import { makeChoices, shuffle } from '../../lib/quiz';

type Dir = 'word→meaning' | 'meaning→word';

export function buildVocabQuestions(vocab: Vocab[], dir: Dir, total: number, rng: () => number = Math.random): QuizQuestion[] {
  const pool = vocab.filter((v) => v.meanings.length > 0);
  const picked = shuffle(pool, rng).slice(0, Math.min(total, pool.length));
  return picked.map((target) => {
    const key = (v: Vocab) => (dir === 'word→meaning' ? v.meanings[0]! : v.word);
    const options = makeChoices(target, pool, 4, key, rng);
    return {
      prompt:
        dir === 'word→meaning' ? (
          <span>
            {target.word}
            {target.reading !== target.word && <span className="block text-lg text-muted">{target.reading}</span>}
          </span>
        ) : (
          <span className="text-2xl">{target.meanings.slice(0, 2).join(', ')}</span>
        ),
      promptClassName: dir === 'word→meaning' ? 'text-5xl' : 'text-2xl',
      choices: options.map((o) => (dir === 'word→meaning' ? o.meanings.slice(0, 2).join(', ') : o.word)),
      answer: options.indexOf(target),
      speakText: target.word,
      explain: dir === 'word→meaning' ? undefined : `${target.word} (${target.reading})`,
    };
  });
}

export function VocabQuiz({ vocab, total = 10 }: { vocab: Vocab[]; total?: number }) {
  const [dir, setDir] = useState<Dir>('word→meaning');
  const [seed, setSeed] = useState(0);
  const [done, setDone] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const questions = useMemo(() => buildVocabQuestions(vocab, dir, total), [vocab, dir, total, seed]);

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <Segmented<Dir>
          ariaLabel="Chiều hỏi"
          value={dir}
          onChange={(d) => {
            setDir(d);
            setDone(false);
            setSeed((s) => s + 1);
          }}
          options={[
            { value: 'word→meaning', label: 'Từ → Nghĩa' },
            { value: 'meaning→word', label: 'Nghĩa → Từ' },
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
            Làm lại
          </button>
        </div>
      )}
    </div>
  );
}

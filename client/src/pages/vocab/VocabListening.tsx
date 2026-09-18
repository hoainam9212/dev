import { useMemo, useState } from 'react';
import type { Vocab } from '@nihongo/shared';
import { QuizRunner, type QuizQuestion } from '../../components/QuizRunner';
import { makeChoices, shuffle } from '../../lib/quiz';
import { canSpeak } from '../../lib/tts';

export function buildListeningQuestions(vocab: Vocab[], total: number, rng: () => number = Math.random): QuizQuestion[] {
  const picked = shuffle(vocab, rng).slice(0, Math.min(total, vocab.length));
  return picked.map((target) => {
    const options = makeChoices(target, vocab, 4, (v) => v.reading, rng);
    return {
      prompt: <span className="text-3xl">🎧</span>,
      promptClassName: 'text-3xl',
      choices: options.map((o) => `${o.word}${o.reading !== o.word ? ` (${o.reading})` : ''}`),
      answer: options.indexOf(target),
      speakText: target.word,
      explain: target.meanings.slice(0, 2).join(', '),
    };
  });
}

export function VocabListening({ vocab, total = 10 }: { vocab: Vocab[]; total?: number }) {
  const [seed, setSeed] = useState(0);
  const [done, setDone] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const questions = useMemo(() => buildListeningQuestions(vocab, total), [vocab, total, seed]);

  if (!canSpeak()) {
    return <p className="text-center text-muted">Trình duyệt này không hỗ trợ đọc văn bản (Web Speech). Hãy dùng Chrome hoặc Edge.</p>;
  }

  return (
    <div className="space-y-4">
      <p className="text-center text-sm text-muted">Nghe từ được đọc và chọn đáp án đúng.</p>
      <QuizRunner key={seed} questions={questions} kind="listening" type="vocab" listenFirst onFinish={() => setDone(true)} />
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

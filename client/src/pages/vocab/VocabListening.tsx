import { useMemo, useState } from 'react';
import { vocabMeanings, type Lang, type Vocab } from '@nihongo/shared';
import { QuizRunner, type QuizQuestion } from '../../components/QuizRunner';
import { makeChoices, mulberry32, shuffle } from '../../lib/quiz';
import { canSpeak } from '../../lib/tts';
import { useSessionSeed } from '../../lib/useSessionSeed';
import { useLang, useT } from '../../i18n';

export function buildListeningQuestions(
  vocab: Vocab[],
  total: number,
  rng: () => number = Math.random,
  lang: Lang = 'vi',
): QuizQuestion[] {
  const picked = shuffle(vocab, rng).slice(0, Math.min(total, vocab.length));
  return picked.map((target) => {
    const options = makeChoices(target, vocab, 4, (v) => v.reading, rng);
    return {
      prompt: <span className="text-3xl">🎧</span>,
      promptClassName: 'text-3xl',
      choices: options.map((o) => `${o.word}${o.reading !== o.word ? ` (${o.reading})` : ''}`),
      answer: options.indexOf(target),
      speakText: target.word,
      explain: vocabMeanings(target, lang).slice(0, 2).join(', '),
    };
  });
}

export function VocabListening({ vocab, total = 10 }: { vocab: Vocab[]; total?: number }) {
  const t = useT();
  const lang = useLang();
  const [seed, setSeed] = useState(0);
  const [done, setDone] = useState(false);
  const rngSeed = useSessionSeed(seed);
  const questions = useMemo(
    () => buildListeningQuestions(vocab, total, mulberry32(rngSeed), lang),
    [vocab, total, rngSeed, lang],
  );

  if (!canSpeak()) {
    return <p className="text-center text-muted">{t.vocab.noTts}</p>;
  }

  return (
    <div className="space-y-4">
      <p className="text-center text-sm text-muted">{t.vocab.listeningHint}</p>
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
            {t.common.retry}
          </button>
        </div>
      )}
    </div>
  );
}

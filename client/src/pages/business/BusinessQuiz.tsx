import { useMemo, useState } from 'react';
import type { BusinessItem, BusinessTopic } from '@nihongo/shared';
import { QuizRunner, type QuizQuestion } from '../../components/QuizRunner';
import { Segmented } from '../../components/Segmented';
import { makeChoices, shuffle } from '../../lib/quiz';
import { firstForm } from './KeigoTable';

export type KeigoForm = 'sonkei' | 'kenjou';

const FORM_LABEL: Record<KeigoForm, string> = { sonkei: '尊敬語 (tôn kính)', kenjou: '謙譲語 (khiêm nhường)' };

export function buildKeigoQuestions(items: BusinessItem[], form: KeigoForm, total: number, rng: () => number = Math.random): QuizQuestion[] {
  const pool = items.filter((i) => i.keigo?.[form] && i.keigo[form] !== '—');
  const picked = shuffle(pool, rng).slice(0, Math.min(total, pool.length));
  return picked.map((target) => {
    const key = (i: BusinessItem) => firstForm(i.keigo![form]);
    const options = makeChoices(target, pool, 4, key, rng);
    return {
      prompt: (
        <span>
          <span className="block text-sm font-bold text-muted">{FORM_LABEL[form]} của</span>
          {target.ja} <span className="text-lg text-muted">({target.vi})</span>
        </span>
      ),
      promptClassName: 'text-4xl',
      choices: options.map(key),
      answer: options.indexOf(target),
      speakText: key(target),
      explain: `${target.ja} → ${target.keigo![form]}`,
    };
  });
}

export function buildPhraseQuestions(items: BusinessItem[], total: number, rng: () => number = Math.random): QuizQuestion[] {
  const pool = items.filter((i) => i.category !== 'keigo' && i.category !== 'email');
  const picked = shuffle(pool, rng).slice(0, Math.min(total, pool.length));
  return picked.map((target) => {
    const options = makeChoices(target, pool, 4, (i) => i.ja, rng);
    return {
      prompt: <span className="text-xl">{target.vi}</span>,
      promptClassName: 'text-xl',
      choices: options.map((o) => o.ja),
      answer: options.indexOf(target),
      speakText: target.ja,
      explain: target.reading,
    };
  });
}

type Kind = 'sonkei' | 'kenjou' | 'phrase';

export function BusinessQuiz({ topics, total = 10 }: { topics: BusinessTopic[]; total?: number }) {
  const [kind, setKind] = useState<Kind>('sonkei');
  const [seed, setSeed] = useState(0);
  const [done, setDone] = useState(false);
  const all = useMemo(() => topics.flatMap((t) => t.items), [topics]);
  const questions = useMemo(
    () => (kind === 'phrase' ? buildPhraseQuestions(all, total) : buildKeigoQuestions(all, kind, total)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [all, kind, total, seed],
  );
  const restart = () => {
    setDone(false);
    setSeed((s) => s + 1);
  };
  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <Segmented<Kind>
          ariaLabel="Kiểu câu hỏi"
          value={kind}
          onChange={(k) => {
            setKind(k);
            restart();
          }}
          options={[
            { value: 'sonkei', label: '尊敬語' },
            { value: 'kenjou', label: '謙譲語' },
            { value: 'phrase', label: 'Tình huống' },
          ]}
        />
      </div>
      <QuizRunner key={`${kind}-${seed}`} questions={questions} kind="quiz" type="business" onFinish={() => setDone(true)} />
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

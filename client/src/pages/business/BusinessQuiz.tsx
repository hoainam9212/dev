import { useMemo, useState } from 'react';
import { topicKind, type BusinessItem, type BusinessKind, type BusinessTopic } from '@nihongo/shared';
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
  const pool = items.filter((i) => i.category !== 'keigo' && i.category !== 'email' && !i.keigo && !i.ng && !i.example);
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

/** Glossary: term → Vietnamese meaning, or meaning → term (alternating). */
export function buildTermQuestions(items: BusinessItem[], total: number, rng: () => number = Math.random): QuizQuestion[] {
  const pool = items.filter((i) => i.example);
  const picked = shuffle(pool, rng).slice(0, Math.min(total, pool.length));
  return picked.map((target, n) => {
    const toMeaning = n % 2 === 0;
    const options = makeChoices(target, pool, 4, (i) => (toMeaning ? i.vi : i.ja), rng);
    return {
      prompt: toMeaning ? (
        <span>
          {target.ja}
          <span className="block text-base text-muted">{target.reading}</span>
        </span>
      ) : (
        <span className="text-2xl">{target.vi}</span>
      ),
      promptClassName: toMeaning ? 'text-4xl' : 'text-2xl',
      choices: options.map((o) => (toMeaning ? o.vi : o.ja)),
      answer: options.indexOf(target),
      speakText: target.ja,
      explain: target.example ? `${target.example.ja} — ${target.example.vi}` : undefined,
    };
  });
}

/** Rephrase: given the blunt (NG) wording, pick the appropriate business wording. */
export function buildRephraseQuestions(items: BusinessItem[], total: number, rng: () => number = Math.random): QuizQuestion[] {
  const pool = items.filter((i) => i.ng);
  const picked = shuffle(pool, rng).slice(0, Math.min(total, pool.length));
  return picked.map((target) => {
    const options = makeChoices(target, pool, 4, (i) => i.ja, rng);
    return {
      prompt: (
        <span>
          <span className="block text-sm font-bold text-muted">Thay vì nói thẳng:</span>
          <span className="text-rose line-through decoration-rose/50">{target.ng}</span>
          <span className="block text-sm font-bold text-muted">nên nói thế nào? ({target.vi})</span>
        </span>
      ),
      promptClassName: 'text-2xl',
      choices: options.map((o) => o.ja),
      answer: options.indexOf(target),
      speakText: target.ja,
      explain: target.note,
    };
  });
}

type Kind = 'sonkei' | 'kenjou' | 'phrase' | 'term' | 'rephrase';

const itemsOfKind = (topics: BusinessTopic[], kinds: BusinessKind[]) =>
  topics.filter((t) => kinds.includes(topicKind(t))).flatMap((t) => t.items);

export function BusinessQuiz({ topics, total = 10 }: { topics: BusinessTopic[]; total?: number }) {
  const [kind, setKind] = useState<Kind>('sonkei');
  const [seed, setSeed] = useState(0);
  const [done, setDone] = useState(false);
  const hasIt = topics.some((t) => t.group === 'it');
  const questions = useMemo(() => {
    switch (kind) {
      case 'phrase':
        return buildPhraseQuestions(itemsOfKind(topics, ['phrases']), total);
      case 'term':
        return buildTermQuestions(itemsOfKind(topics, ['glossary']), total);
      case 'rephrase':
        return buildRephraseQuestions(itemsOfKind(topics, ['rephrase']), total);
      default:
        return buildKeigoQuestions(itemsOfKind(topics, ['keigo']), kind, total);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topics, kind, total, seed]);
  const restart = () => {
    setDone(false);
    setSeed((s) => s + 1);
  };
  return (
    <div className="space-y-4">
      <div className="flex justify-center overflow-x-auto">
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
            ...(hasIt
              ? [
                  { value: 'term' as const, label: 'Thuật ngữ IT' },
                  { value: 'rephrase' as const, label: 'Nói mềm mỏng' },
                ]
              : []),
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

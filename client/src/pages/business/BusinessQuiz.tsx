import { useMemo, useState } from 'react';
import { pickText, topicKind, type BusinessItem, type BusinessKind, type BusinessTopic, type Lang } from '@nihongo/shared';
import { QuizRunner, type QuizQuestion } from '../../components/QuizRunner';
import { Segmented } from '../../components/Segmented';
import { makeChoices, mulberry32, shuffle } from '../../lib/quiz';
import { useSessionSeed } from '../../lib/useSessionSeed';
import { useLang, useT } from '../../i18n';
import { firstForm } from './KeigoTable';

export type KeigoForm = 'sonkei' | 'kenjou';

const meaning = (i: BusinessItem, lang: Lang) => pickText(i.vi, i.en, lang);

// Labels inside prompts are components, so they follow the display language at render.
function KeigoOf({ form }: { form: KeigoForm }) {
  return <span className="block text-sm font-bold text-muted">{useT().business.keigoOf[form]}</span>;
}
function InsteadOf() {
  return <span className="block text-sm font-bold text-muted">{useT().business.insteadOf}</span>;
}
function HowToSay({ situation }: { situation: string }) {
  return <span className="block text-sm font-bold text-muted">{useT().business.howToSay(situation)}</span>;
}

export function buildKeigoQuestions(items: BusinessItem[], form: KeigoForm, total: number, rng: () => number = Math.random, lang: Lang = 'vi'): QuizQuestion[] {
  const pool = items.filter((i) => i.keigo?.[form] && i.keigo[form] !== '—');
  const picked = shuffle(pool, rng).slice(0, Math.min(total, pool.length));
  return picked.map((target) => {
    const key = (i: BusinessItem) => firstForm(i.keigo![form]);
    const options = makeChoices(target, pool, 4, key, rng);
    return {
      prompt: (
        <span>
          <KeigoOf form={form} />
          {target.ja} <span className="text-lg text-muted">({meaning(target, lang)})</span>
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

export function buildPhraseQuestions(items: BusinessItem[], total: number, rng: () => number = Math.random, lang: Lang = 'vi'): QuizQuestion[] {
  const pool = items.filter((i) => i.category !== 'keigo' && i.category !== 'email' && !i.keigo && !i.ng && !i.example);
  const picked = shuffle(pool, rng).slice(0, Math.min(total, pool.length));
  return picked.map((target) => {
    const options = makeChoices(target, pool, 4, (i) => i.ja, rng);
    return {
      prompt: <span className="text-xl">{meaning(target, lang)}</span>,
      promptClassName: 'text-xl',
      choices: options.map((o) => o.ja),
      answer: options.indexOf(target),
      speakText: target.ja,
      explain: target.reading,
    };
  });
}

/** Glossary: term → meaning, or meaning → term (alternating). */
export function buildTermQuestions(items: BusinessItem[], total: number, rng: () => number = Math.random, lang: Lang = 'vi'): QuizQuestion[] {
  const pool = items.filter((i) => i.example);
  const picked = shuffle(pool, rng).slice(0, Math.min(total, pool.length));
  return picked.map((target, n) => {
    const toMeaning = n % 2 === 0;
    const options = makeChoices(target, pool, 4, (i) => (toMeaning ? meaning(i, lang) : i.ja), rng);
    return {
      prompt: toMeaning ? (
        <span>
          {target.ja}
          <span className="block text-base text-muted">{target.reading}</span>
        </span>
      ) : (
        <span className="text-2xl">{meaning(target, lang)}</span>
      ),
      promptClassName: toMeaning ? 'text-4xl' : 'text-2xl',
      choices: options.map((o) => (toMeaning ? meaning(o, lang) : o.ja)),
      answer: options.indexOf(target),
      speakText: target.ja,
      explain: target.example ? `${target.example.ja} — ${pickText(target.example.vi, target.example.en, lang)}` : undefined,
    };
  });
}

/** Rephrase: given the blunt (NG) wording, pick the appropriate business wording. */
export function buildRephraseQuestions(items: BusinessItem[], total: number, rng: () => number = Math.random, lang: Lang = 'vi'): QuizQuestion[] {
  const pool = items.filter((i) => i.ng);
  const picked = shuffle(pool, rng).slice(0, Math.min(total, pool.length));
  return picked.map((target) => {
    const options = makeChoices(target, pool, 4, (i) => i.ja, rng);
    return {
      prompt: (
        <span>
          <InsteadOf />
          <span className="text-rose line-through decoration-rose/50">{target.ng}</span>
          <HowToSay situation={meaning(target, lang)} />
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
  const t = useT();
  const lang = useLang();
  const [kind, setKind] = useState<Kind>('sonkei');
  const [seed, setSeed] = useState(0);
  const [done, setDone] = useState(false);
  const rngSeed = useSessionSeed(seed);
  const hasIt = topics.some((tp) => tp.group === 'it');
  const questions = useMemo(() => {
    const rng = mulberry32(rngSeed);
    switch (kind) {
      case 'phrase':
        return buildPhraseQuestions(itemsOfKind(topics, ['phrases']), total, rng, lang);
      case 'term':
        return buildTermQuestions(itemsOfKind(topics, ['glossary']), total, rng, lang);
      case 'rephrase':
        return buildRephraseQuestions(itemsOfKind(topics, ['rephrase']), total, rng, lang);
      default:
        return buildKeigoQuestions(itemsOfKind(topics, ['keigo']), kind, total, rng, lang);
    }
  }, [topics, kind, total, rngSeed, lang]);
  const restart = () => {
    setDone(false);
    setSeed((s) => s + 1);
  };
  return (
    <div className="space-y-4">
      <div className="flex justify-center overflow-x-auto">
        <Segmented<Kind>
          ariaLabel={t.common.questionType}
          value={kind}
          onChange={(k) => {
            setKind(k);
            restart();
          }}
          options={[
            { value: 'sonkei', label: '尊敬語' },
            { value: 'kenjou', label: '謙譲語' },
            { value: 'phrase', label: t.business.quizKinds.phrase },
            ...(hasIt
              ? [
                  { value: 'term' as const, label: t.business.quizKinds.term },
                  { value: 'rephrase' as const, label: t.business.quizKinds.rephrase },
                ]
              : []),
          ]}
        />
      </div>
      <QuizRunner key={`${kind}-${seed}`} questions={questions} kind="quiz" type="business" onFinish={() => setDone(true)} />
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

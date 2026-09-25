import { useMemo, useState } from 'react';
import { pickText, topicKind, type BusinessItem, type BusinessTopic } from '@nihongo/shared';
import { Mascot } from '../../components/Mascot';
import { Segmented } from '../../components/Segmented';
import { SpeechBubble } from '../../components/SpeechBubble';
import { SpeakButton, type SpeakResult } from '../../components/SpeakButton';
import { shuffle } from '../../lib/quiz';
import { speak, useStopSpeechOnUnmount } from '../../lib/tts';
import { moodForScore } from '../speaking/Shadowing';
import { useLang, useT } from '../../i18n';

export function BusinessRoleplay({ topics, total = 8 }: { topics: BusinessTopic[]; total?: number }) {
  useStopSpeechOnUnmount();
  const t = useT();
  const lang = useLang();
  const [seed, setSeed] = useState(0);
  const [scope, setScope] = useState<'all' | 'it' | 'basic'>('all');
  const items = useMemo<BusinessItem[]>(
    () => shuffle(topics.filter((tp) => topicKind(tp) === 'phrases' && (scope === 'all' || (tp.group ?? 'basic') === scope)).flatMap((tp) => tp.items)).slice(0, total),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [topics, total, seed, scope],
  );
  const [i, setI] = useState(0);
  const [reveal, setReveal] = useState(false);
  const [result, setResult] = useState<SpeakResult | null>(null);
  const [scores, setScores] = useState<number[]>([]);
  const cur = items[i];

  if (!cur) {
    const avg = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
    return (
      <div className="flex flex-col items-center gap-3 py-6" data-testid="business-roleplay-result">
        <Mascot mood={moodForScore(avg)} size={120} />
        <p className="text-xl font-black text-rose">{t.common.average(avg)}</p>
        <button
          type="button"
          className="btn-primary"
          onClick={() => {
            setSeed((s) => s + 1);
            setI(0);
            setScores([]);
            setResult(null);
            setReveal(false);
          }}
        >
          {t.common.retry}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {topics.some((tp) => tp.group === 'it') && (
        <Segmented<'all' | 'it' | 'basic'>
          ariaLabel={t.business.scope}
          value={scope}
          onChange={(v) => {
            setScope(v);
            setI(0);
            setScores([]);
            setResult(null);
            setReveal(false);
          }}
          options={[
            { value: 'all', label: t.business.scopes.all },
            { value: 'it', label: t.business.scopes.it },
            { value: 'basic', label: t.business.scopes.basic },
          ]}
        />
      )}
      <p className="text-sm font-bold text-muted">{t.business.situationOf(i + 1, items.length)}</p>
      <div className="flex w-full max-w-lg items-start gap-3">
        <Mascot mood="neutral" size={70} />
        <div className="flex-1">
          <SpeechBubble>
            <p className="text-xs font-bold text-muted">{t.business.sayPrompt}</p>
            <p className="text-lg font-bold">{pickText(cur.vi, cur.en, lang)}</p>
            {reveal && (
              <p className="mt-2 text-base font-bold text-rose" lang="ja">
                {cur.ja}
                <span className="block text-xs font-normal text-muted">{cur.reading}</span>
              </p>
            )}
          </SpeechBubble>
        </div>
      </div>
      <div className="flex gap-2">
        <button type="button" className="btn-soft text-sm" onClick={() => setReveal((r) => !r)}>
          {reveal ? t.common.hideHint : t.common.hint}
        </button>
        <button type="button" className="btn-sky text-sm" onClick={() => speak(cur.ja)}>
          {t.common.listenModel}
        </button>
      </div>
      {!result ? (
        <SpeakButton expected={cur.ja} onResult={setResult} />
      ) : (
        <div className="flex flex-col items-center gap-2" data-testid="speak-result">
          <p className="text-3xl font-black text-rose">{t.common.points(result.score)}</p>
          {result.heard && (
            <p className="text-sm text-muted">
              {t.common.heard} {result.heard}
            </p>
          )}
          <p className="font-bold" lang="ja">
            {cur.ja}
          </p>
          <div className="flex gap-2">
            <button type="button" className="btn-soft" onClick={() => setResult(null)}>
              {t.common.sayAgain}
            </button>
            <button
              type="button"
              className="btn-primary"
              onClick={() => {
                setScores((s) => [...s, result.score]);
                setResult(null);
                setReveal(false);
                setI((k) => k + 1);
              }}
            >
              {t.common.next}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

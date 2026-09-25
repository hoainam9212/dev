import { useEffect, useMemo, useRef, useState } from 'react';
import type { Level, Sentence } from '@nihongo/shared';
import { useSentences } from '../../content/loader';
import { LoadingCat, ErrorCat } from '../../components/LoadingCat';
import { Mascot, type Mood } from '../../components/Mascot';
import { SpeakButton, type SpeakResult } from '../../components/SpeakButton';
import { shuffle } from '../../lib/quiz';
import { speak, useStopSpeechOnUnmount } from '../../lib/tts';
import { logSession } from '../../db';
import { sentenceTranslation } from '@nihongo/shared';
import { useLang, useT } from '../../i18n';

export function pickShadowing(sentences: Sentence[], total: number, rng: () => number = Math.random): Sentence[] {
  const short = sentences.filter((s) => [...s.ja].length <= 25 && [...s.ja].length >= 4);
  return shuffle(short, rng).slice(0, Math.min(total, short.length));
}

export function moodForScore(score: number): Mood {
  return score >= 70 ? 'happy' : score >= 40 ? 'neutral' : 'sad';
}

export function Shadowing({ level, total = 10 }: { level: Level; total?: number }) {
  useStopSpeechOnUnmount();
  const t = useT();
  const lang = useLang();
  const { data, error, loading } = useSentences(level);
  const [seed, setSeed] = useState(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const items = useMemo(() => (data ? pickShadowing(data, total) : []), [data, total, seed]);
  const [i, setI] = useState(0);
  const [result, setResult] = useState<SpeakResult | null>(null);
  const [scores, setScores] = useState<number[]>([]);
  const startedAt = useRef(new Date().toISOString());
  const cur = items[i];

  useEffect(() => {
    if (cur) speak(cur.ja);
  }, [cur]);

  if (loading) return <LoadingCat />;
  if (error) return <ErrorCat text={error} />;
  if (items.length === 0) return <p className="text-center text-muted">{t.speaking.noSentences}</p>;

  if (!cur) {
    const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    return (
      <div className="flex flex-col items-center gap-3 py-6" data-testid="shadowing-result">
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
          }}
        >
          {t.common.retry}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm font-bold text-muted">
        {t.common.sentenceOf(i + 1, items.length)}
      </p>
      <div className="card w-full max-w-lg p-5 text-center">
        <p className="text-2xl font-black" lang="ja">
          {cur.ja}
        </p>
        <p className="mt-1 text-sm text-muted">{sentenceTranslation(cur, lang)}</p>
        <button type="button" className="btn-sky mt-3 text-sm" onClick={() => speak(cur.ja)}>
          {t.common.listenModel}
        </button>
      </div>
      {!result ? (
        <SpeakButton expected={cur.ja} onResult={setResult} />
      ) : (
        <div className="flex flex-col items-center gap-2" data-testid="speak-result">
          <Mascot mood={moodForScore(result.score)} size={80} />
          <p className="text-3xl font-black text-rose">{t.common.points(result.score)}</p>
          {result.heard && (
            <p className="text-sm text-muted">
              {t.common.heard} <span className="font-bold text-text">{result.heard}</span>
            </p>
          )}
          <div className="flex gap-2">
            <button type="button" className="btn-soft" onClick={() => setResult(null)}>
              {t.common.sayAgain}
            </button>
            <button
              type="button"
              className="btn-primary"
              onClick={() => {
                const ns = [...scores, result.score];
                setScores(ns);
                setResult(null);
                const n = i + 1;
                setI(n);
                if (n >= items.length) {
                  void logSession({
                    startedAt: startedAt.current,
                    kind: 'speaking',
                    type: 'speaking',
                    correct: ns.filter((s) => s >= 70).length,
                    total: ns.length,
                    xp: 0,
                  });
                }
              }}
            >
              {t.speaking.nextSentence}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

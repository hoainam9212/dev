import { useEffect, useRef, useState } from 'react';
import { pickText, type BusinessScenario } from '@nihongo/shared';
import { speak, speakSequence, stopSpeaking, type Sequence, useStopSpeechOnUnmount } from '../../lib/tts';
import { Mascot } from '../../components/Mascot';
import { SpeakButton, type SpeakResult } from '../../components/SpeakButton';
import { moodForScore } from '../speaking/Shadowing';
import { useLang, useT } from '../../i18n';

export function ScenarioList({ scenarios, onPick }: { scenarios: BusinessScenario[]; onPick: (s: BusinessScenario) => void }) {
  const t = useT();
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {scenarios.map((s, i) => (
        <button key={s.id} type="button" onClick={() => onPick(s)} className="card p-4 text-left transition hover:-translate-y-0.5">
          <p className="text-xs font-bold text-muted">{t.business.scenarioN(i + 1)}</p>
          <p className="text-lg font-black">{s.title}</p>
          <p className="mt-1 line-clamp-2 text-sm text-muted">{s.situation}</p>
          <p className="mt-2 text-xs text-muted">
            {t.business.scenarioStats(s.lines.length, s.lines.filter((l) => l.me).length)}
          </p>
        </button>
      ))}
    </div>
  );
}

export function ScenarioView({ scenario, onBack }: { scenario: BusinessScenario; onBack: () => void }) {
  useStopSpeechOnUnmount();
  const t = useT();
  const lang = useLang();
  const [mode, setMode] = useState<'read' | 'roleplay'>('read');
  const [showVi, setShowVi] = useState(true);
  const [playing, setPlaying] = useState<number | null>(null);
  const seq = useRef<Sequence | null>(null);

  useEffect(() => () => seq.current?.cancel(), []);

  const playAll = () => {
    seq.current?.cancel();
    const s = speakSequence(
      scenario.lines.map((l) => l.ja),
      { onLine: setPlaying },
    );
    seq.current = s;
    void s.done.then(() => setPlaying(null));
  };
  const stop = () => {
    seq.current?.cancel();
    stopSpeaking();
    setPlaying(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <button type="button" className="btn-soft text-sm" onClick={onBack}>
          {t.business.backToScenarios}
        </button>
        <div className="flex gap-2">
          <button type="button" className={mode === 'read' ? 'btn-primary text-sm' : 'btn-soft text-sm'} onClick={() => setMode('read')}>
            {t.business.readDialogue}
          </button>
          <button
            type="button"
            className={mode === 'roleplay' ? 'btn-primary text-sm' : 'btn-soft text-sm'}
            onClick={() => {
              stop();
              setMode('roleplay');
            }}
          >
            {t.business.practiceRoleplay}
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-black">{scenario.title}</h3>
        <p className="mt-1 rounded-2xl bg-sky/30 p-3 text-sm">{scenario.situation}</p>
        <p className="mt-2 text-xs text-muted">
          <span className="font-bold text-rose">{scenario.roles.me}</span> · {scenario.roles.other}
        </p>
      </div>

      {mode === 'read' ? (
        <>
          <div className="flex flex-wrap gap-2">
            <button type="button" className="btn-sky text-sm" onClick={playAll}>
              {t.business.playDialogue}
            </button>
            <button type="button" className="btn-soft text-sm" onClick={stop}>
              {t.common.stop}
            </button>
            <button type="button" className="btn-soft text-sm" onClick={() => setShowVi((v) => !v)}>
              {showVi ? t.business.hideTranslation : t.business.showTranslation}
            </button>
          </div>
          <ol className="space-y-2" data-testid="scenario-lines">
            {scenario.lines.map((l, i) => (
              <li key={i} className={`flex ${l.me ? 'justify-end' : 'justify-start'}`}>
                <button
                  type="button"
                  onClick={() => speak(l.ja)}
                  className={`max-w-[85%] rounded-3xl px-4 py-2 text-left transition ${
                    l.me ? 'rounded-br-md bg-rose/15 ring-1 ring-rose/40' : 'rounded-bl-md bg-cream ring-1 ring-sakura/50 dark:bg-bg'
                  } ${playing === i ? 'ring-2 ring-rose' : ''}`}
                >
                  <span className="block text-[11px] font-bold text-muted">{l.me ? scenario.roles.me : scenario.roles.other}</span>
                  <span className="block font-bold" lang="ja">
                    {l.ja}
                  </span>
                  {showVi && <span className="block text-xs text-muted">{pickText(l.vi, l.en, lang)}</span>}
                </button>
              </li>
            ))}
          </ol>
          <Points points={scenario.points} />
        </>
      ) : (
        <ScenarioRoleplay key={scenario.id} scenario={scenario} />
      )}
    </div>
  );
}

function Points({ points }: { points: string[] }) {
  const t = useT();
  return (
    <div className="rounded-2xl bg-lavender/25 p-4">
      <p className="mb-1 font-black">{t.business.notes}</p>
      <ul className="list-disc space-y-1 pl-5 text-sm">
        {points.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>
    </div>
  );
}

function ScenarioRoleplay({ scenario }: { scenario: BusinessScenario }) {
  useStopSpeechOnUnmount();
  const t = useT();
  const lang = useLang();
  const [i, setI] = useState(0);
  const [hint, setHint] = useState(false);
  const [result, setResult] = useState<SpeakResult | null>(null);
  const [scores, setScores] = useState<number[]>([]);
  const line = scenario.lines[i];

  useEffect(() => {
    if (line && !line.me) speak(line.ja);
  }, [line]);

  const next = () => {
    setResult(null);
    setHint(false);
    setI((k) => k + 1);
  };

  if (!line) {
    const avg = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
    return (
      <div className="flex flex-col items-center gap-3 py-4" data-testid="scenario-roleplay-result">
        <Mascot mood={moodForScore(avg)} size={110} />
        <p className="text-xl font-black text-rose">{t.common.average(avg)}</p>
        <button
          type="button"
          className="btn-primary"
          onClick={() => {
            setI(0);
            setScores([]);
          }}
        >
          {t.common.playAgain}
        </button>
        <div className="w-full">
          <Points points={scenario.points} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm font-bold text-muted">
        {t.common.turn(i + 1, scenario.lines.length)}
      </p>
      {!line.me ? (
        <>
          <div className="flex w-full max-w-lg items-start gap-3">
            <Mascot mood="neutral" size={64} />
            <div className="flex-1 rounded-3xl rounded-tl-md bg-cream p-3 ring-1 ring-sakura/50 dark:bg-bg">
              <p className="text-[11px] font-bold text-muted">{scenario.roles.other}</p>
              <p className="font-bold" lang="ja">
                {line.ja}
              </p>
              <p className="text-xs text-muted">{pickText(line.vi, line.en, lang)}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button type="button" className="btn-sky" onClick={() => speak(line.ja)}>
              {t.common.listenAgain}
            </button>
            <button type="button" className="btn-primary" onClick={next}>
              {t.common.next}
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="w-full max-w-lg rounded-3xl rounded-br-md bg-rose/15 p-3 ring-1 ring-rose/40">
            <p className="text-[11px] font-bold text-rose">{t.business.yourTurn}</p>
            <p className="font-bold">{pickText(line.vi, line.en, lang)}</p>
            {(hint || result) && (
              <p className="mt-1 font-bold text-rose" lang="ja">
                {line.ja}
              </p>
            )}
          </div>
          {!result ? (
            <div className="flex flex-col items-center gap-2">
              <div className="flex gap-2">
                <button type="button" className="btn-soft text-sm" onClick={() => setHint((h) => !h)}>
                  {hint ? t.common.hideHint : t.common.hint}
                </button>
                <button type="button" className="btn-sky text-sm" onClick={() => speak(line.ja)}>
                  {t.common.listenModel}
                </button>
              </div>
              <SpeakButton expected={line.ja} onResult={setResult} />
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2" data-testid="speak-result">
              <p className="text-3xl font-black text-rose">{t.common.points(result.score)}</p>
              {result.heard && (
                <p className="text-sm text-muted">
                  {t.common.heard} {result.heard}
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
                    setScores((s) => [...s, result.score]);
                    next();
                  }}
                >
                  {t.common.next}
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

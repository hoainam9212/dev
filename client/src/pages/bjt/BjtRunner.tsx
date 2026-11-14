import { useEffect, useMemo, useRef, useState } from 'react';
import { BJT_SECTIONS, bjtEstimate, type BjtItem } from '@nihongo/shared';
import { canSpeak, speakSequence, useStopSpeechOnUnmount, type Sequence } from '../../lib/tts';
import { Mascot } from '../../components/Mascot';
import { useProgress } from '../../store/progress';
import { useBjt } from '../../store/bjt';
import { useT } from '../../i18n';
import { BjtMaterialView } from './BjtMaterialView';
import { Marked } from './PositionMark';
import { audioLines, clock, examSeconds, sectionStats, toSteps, type Step } from './bjt';

const XP_PER_CORRECT = 2;

interface Props {
  title: string;
  items: BjtItem[];
  /** Timed, recording plays once, no feedback until the end. */
  exam?: boolean;
  /** Timed runs are saved under this set id. */
  setId?: string;
  onExit: () => void;
}

const CHOICE: Record<string, string> = {
  idle: 'bg-surface ring-2 ring-sakura/50 hover:bg-sakura/30',
  chosen: 'bg-sky-200 text-sky-950 ring-2 ring-sky-400',
  correct: 'bg-emerald-200 text-emerald-900 ring-2 ring-emerald-400',
  wrong: 'bg-rose/30 text-text ring-2 ring-rose',
};

export function BjtRunner({ title, items, exam = false, setId, onExit }: Props) {
  useStopSpeechOnUnmount();
  const t = useT();
  const steps = useMemo(() => toSteps(items), [items]);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<Record<string, number>>({});
  const [finished, setFinished] = useState(false);
  const [left, setLeft] = useState(() => examSeconds(items));
  const [playing, setPlaying] = useState(false);
  const [played, setPlayed] = useState<Record<string, true>>({});
  const seq = useRef<Sequence | null>(null);
  const startedAt = useRef(Date.now());
  const record = useBjt((s) => s.record);
  const saveRun = useBjt((s) => s.saveRun);
  const addXp = useProgress((s) => s.addXp);
  const step = steps[i];

  const play = (item: BjtItem) => {
    const lines = audioLines(item);
    if (!lines.length || !canSpeak()) return;
    seq.current?.cancel();
    setPlaying(true);
    setPlayed((p) => ({ ...p, [item.id]: true }));
    const s = speakSequence(lines, exam ? { rate: 1 } : {});
    seq.current = s;
    void s.done.then(() => {
      if (seq.current === s) setPlaying(false);
    });
  };

  // the recording starts by itself on the first question of an item, like in the test room
  useEffect(() => {
    if (!finished && step?.first) play(step.item);
    return () => seq.current?.cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i, finished]);

  const finish = () => {
    seq.current?.cancel();
    if (exam) {
      const results = Object.fromEntries(steps.map((s) => [s.q.id, picked[s.q.id] === s.q.answer]));
      const correct = Object.values(results).filter(Boolean).length;
      record(results);
      if (correct) addXp(correct * XP_PER_CORRECT);
      if (setId) {
        saveRun(setId, { at: new Date().toISOString(), correct, total: steps.length, seconds: Math.round((Date.now() - startedAt.current) / 1000) });
      }
    }
    setFinished(true);
  };

  useEffect(() => {
    if (!exam || finished) return;
    const id = setInterval(() => setLeft((l) => l - 1), 1000);
    return () => clearInterval(id);
  }, [exam, finished]);
  useEffect(() => {
    if (exam && !finished && left <= 0) finish();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [left]);

  if (finished || !step) return <BjtResult title={title} steps={steps} picked={picked} exam={exam} onExit={onExit} />;

  const { item, q } = step;
  const mine = picked[q.id];
  const answered = mine !== undefined;
  const revealed = !exam && answered;
  const hasAudio = audioLines(item).length > 0;
  const hideChoices = !!item.spokenChoices && !revealed;
  const last = i === steps.length - 1;
  const section = BJT_SECTIONS.find((s) => s.id === item.section)!;

  const pick = (c: number) => {
    if (revealed) return;
    setPicked((p) => ({ ...p, [q.id]: c }));
    if (!exam) {
      const ok = c === q.answer;
      record({ [q.id]: ok });
      if (ok) addXp(XP_PER_CORRECT);
    }
  };
  const next = () => (last ? finish() : setI(i + 1));
  const state = (c: number) => {
    if (!revealed) return mine === c ? 'chosen' : 'idle';
    if (c === q.answer) return 'correct';
    return c === mine ? 'wrong' : 'idle';
  };

  return (
    <div className="space-y-4" data-testid="bjt-runner">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <button type="button" className="btn-soft text-sm" onClick={onExit}>
          {t.bjt.quit}
        </button>
        <p className="text-sm font-bold text-muted">
          {t.bjt.questionOf(i + 1, steps.length)}
          {exam && (
            <span className={`ml-3 tabular-nums ${left <= 60 ? 'text-rose' : ''}`} data-testid="bjt-clock">
              ⏱ {clock(left)}
            </span>
          )}
        </p>
      </div>
      <p className="text-sm font-bold text-rose">
        {section.ja} {title !== section.ja && <span className="font-normal text-muted">· {title}</span>}
      </p>

      {hasAudio && (
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" className="btn-sky" disabled={playing || (exam && !!played[item.id])} onClick={() => play(item)}>
            {playing ? t.bjt.playing : exam && played[item.id] ? t.bjt.playedOnce : t.bjt.playAudio}
          </button>
          {!canSpeak() && <p className="text-sm text-rose">{t.bjt.noTts}</p>}
        </div>
      )}

      {item.material && <BjtMaterialView material={item.material} />}

      <p className="text-lg font-bold leading-relaxed" data-testid="bjt-prompt">
        <Marked text={q.prompt} />
      </p>
      {hideChoices && <p className="text-xs text-muted">{t.bjt.choicesSpoken}</p>}
      <div className={hideChoices ? 'grid grid-cols-4 gap-2' : 'flex flex-col gap-2'}>
        {q.choices.map((c, ci) => (
          <button
            key={ci}
            type="button"
            data-state={state(ci)}
            aria-pressed={mine === ci}
            disabled={revealed}
            onClick={() => pick(ci)}
            className={`rounded-2xl px-4 py-3 text-left font-bold transition active:scale-[0.98] disabled:cursor-default ${
              hideChoices ? 'text-center text-xl' : ''
            } ${CHOICE[state(ci)]}`}
          >
            {hideChoices ? (
              ci + 1
            ) : (
              <>
                {ci + 1}. <Marked text={c} />
              </>
            )}
          </button>
        ))}
      </div>

      {revealed && (
        <div className="space-y-3 rounded-2xl bg-cream p-4 dark:bg-bg" data-testid="bjt-feedback">
          <p className={`font-black ${mine === q.answer ? 'text-emerald-500' : 'text-rose'}`}>
            {mine === q.answer ? t.bjt.correct : t.bjt.wrong(`${q.answer + 1}`)}
          </p>
          <div>
            <p className="text-xs font-bold text-muted">{t.bjt.explain}</p>
            <p>{q.explain}</p>
          </div>
          {item.script && (
            <div>
              <p className="text-xs font-bold text-muted">{t.bjt.script}</p>
              <ul className="mt-1 space-y-2">
                {item.script.map((l, li) => (
                  <li key={li}>
                    <p className="font-bold">
                      <span className="mr-2 text-xs text-muted">{l.speaker}</span>
                      {l.ja}
                    </p>
                    <p className="text-sm text-muted">{l.vi}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {!!item.points?.length && (
            <div>
              <p className="text-xs font-bold text-muted">{t.bjt.points}</p>
              <ul className="mt-1 space-y-1 text-sm">
                {item.points.map((p) => (
                  <li key={p.ja}>
                    <span className="font-bold">{p.ja}</span>
                    <span className="mx-1 text-muted">（{p.reading}）</span>
                    {p.vi}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {(exam || revealed) && (
        <div className="flex justify-end">
          <button type="button" className="btn-primary" onClick={next}>
            {last ? t.bjt.finish : t.bjt.next}
          </button>
        </div>
      )}
    </div>
  );
}

function BjtResult({ title, steps, picked, exam, onExit }: { title: string; steps: Step[]; picked: Record<string, number>; exam: boolean; onExit: () => void }) {
  const t = useT();
  const results = Object.fromEntries(steps.map((s) => [s.q.id, picked[s.q.id] === s.q.answer]));
  const correct = Object.values(results).filter(Boolean).length;
  const est = bjtEstimate(correct, steps.length);
  const wrong = steps.filter((s) => !results[s.q.id]);
  return (
    <div className="space-y-4" data-testid="bjt-result">
      <div className="flex flex-col items-center gap-2 py-2">
        <Mascot mood={correct / Math.max(1, steps.length) >= 0.7 ? 'happy' : 'neutral'} size={110} />
        <p className="text-sm font-bold text-muted">
          {t.bjt.resultTitle} · {title}
        </p>
        <p className="text-2xl font-black text-rose">{t.bjt.resultScore(correct, steps.length)}</p>
        {exam && (
          <>
            <p className="font-bold">{t.bjt.estimate(est.score, est.level)}</p>
            <p className="text-center text-xs text-muted">{t.bjt.estimateNote}</p>
          </>
        )}
      </div>

      <div>
        <p className="mb-1 text-sm font-bold text-muted">{t.bjt.bySection}</p>
        <ul className="space-y-1">
          {sectionStats(steps, results).map((s) => (
            <li key={s.section} className="flex items-center gap-2 text-sm">
              <span className="w-24 shrink-0 font-bold">{s.ja}</span>
              <span className="h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-sakura/30">
                <span className="block h-full bg-emerald-400" style={{ width: `${(s.correct / s.total) * 100}%` }} />
              </span>
              <span className="w-10 text-right tabular-nums">
                {s.correct}/{s.total}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="mb-1 text-sm font-bold text-muted">{t.bjt.wrongList}</p>
        {wrong.length === 0 && <p className="font-bold text-emerald-500">{t.bjt.allRight}</p>}
        <ul className="space-y-3">
          {wrong.map(({ item, q }) => {
            const mine = picked[q.id];
            return (
              <li key={q.id} className="space-y-1 rounded-2xl bg-cream p-3 dark:bg-bg">
                <p className="text-xs font-bold text-rose">{BJT_SECTIONS.find((s) => s.id === item.section)!.ja}</p>
                <p className="font-bold">
                  <Marked text={q.prompt} />
                </p>
                <p className="text-sm text-muted">
                  <Marked text={mine === undefined ? t.bjt.noAnswer : t.bjt.yourAnswer(`${mine + 1}. ${q.choices[mine]}`)} />
                </p>
                <p className="text-sm font-bold text-emerald-600">
                  ✓ {q.answer + 1}. <Marked text={q.choices[q.answer]!} />
                </p>
                <p className="text-sm">{q.explain}</p>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex justify-center">
        <button type="button" className="btn-primary" onClick={onExit}>
          {t.bjt.backToBjt}
        </button>
      </div>
    </div>
  );
}

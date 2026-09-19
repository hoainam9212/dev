import { useCallback, useEffect, useRef, useState, type Dispatch } from 'react';
import { grade, type GradeReport, type PracticeStep } from '@office-neko/shared';
import { SIMS } from '../sims/registry';
import { useOs } from '../db/profile';
import { Mochi } from '../components/Mochi';
import { RichText } from '../help/RichText';
import { SpotlightOverlay } from '../help/SpotlightOverlay';
import { useSound } from '../lib/sound';
import { ErrorBoundary } from '../app/ErrorBoundary';
import { HintPanel } from './HintPanel';
import type { PlayerAction, PlayerState } from './playerReducer';

export function PracticeView({ step, state, dispatch }: { step: PracticeStep; state: PlayerState; dispatch: Dispatch<PlayerAction> }) {
  const def = SIMS[step.sim];
  const os = useOs();
  const sound = useSound();
  const latest = useRef<unknown>(step.initial);
  const timer = useRef<number | undefined>(undefined);
  const [report, setReport] = useState<GradeReport | null>(null);
  const [root, setRoot] = useState<HTMLDivElement | null>(null);

  const runGrade = useCallback(
    (manual: boolean) => {
      const r = grade(step.sim, latest.current, step.checks);
      if (manual || r.pass) setReport(r);
      dispatch({ type: 'checkResult', pass: r.pass, manual });
      if (r.pass) sound('correct');
      else if (manual) sound('wrong');
    },
    [step, dispatch, sound],
  );

  const onState = useCallback(
    (s: unknown) => {
      latest.current = s;
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => runGrade(false), 300);
    },
    [runGrade],
  );

  useEffect(() => () => window.clearTimeout(timer.current), []);

  if (!def) return <div className="card p-6">😿 Trình mô phỏng “{step.sim}” chưa sẵn sàng.</div>;
  const Sim = def.Component;
  const spotlight = state.stepHint >= 2 && !state.stepDone ? step.hints[1] : null;

  return (
    <div className="space-y-4">
      <div className="card flex items-start gap-3 p-4">
        <Mochi mood="neutral" size={56} animated={false} />
        <RichText text={step.task} className="text-lg font-semibold" />
      </div>
      <div ref={setRoot} className="relative">
        <ErrorBoundary message="Trình mô phỏng gặp lỗi… Hãy thử tải lại trang." key={step.sim}>
          <Sim initial={step.initial} onState={onState} os={os} spotlight={spotlight} />
        </ErrorBoundary>
      </div>
      <SpotlightOverlay target={spotlight} root={root} />
      {state.stepHint > 0 && !state.stepDone && <HintPanel step={step} level={state.stepHint} />}
      {report && (
        <ul aria-label="Kết quả chấm" className="space-y-1">
          {report.results.map((r, i) => (
            <li key={i} className={r.ok ? 'text-excel-ink' : 'text-rose-ink'}>{r.ok ? '✅' : '❌'} {r.messageVi}</li>
          ))}
        </ul>
      )}
      <div className="flex flex-wrap items-center gap-3">
        {state.stepDone ? (
          <>
            <span className="flex items-center gap-2 font-bold text-excel-ink">
              <Mochi mood="happy" size={48} animated={false} /> Giỏi quá! Bạn làm đúng rồi 🎉
            </span>
            <button type="button" className="btn-primary" onClick={() => dispatch({ type: 'next' })} autoFocus>Tiếp tục →</button>
          </>
        ) : (
          <>
            <button type="button" className="btn-primary" data-help-id="player.check" onClick={() => { window.clearTimeout(timer.current); runGrade(true); }}>
              Kiểm tra
            </button>
            <button type="button" className="btn-soft" data-help-id="player.hint" disabled={state.stepHint >= 3} onClick={() => dispatch({ type: 'hint' })}>
              💡 Gợi ý ({state.stepHint}/3)
            </button>
          </>
        )}
      </div>
    </div>
  );
}

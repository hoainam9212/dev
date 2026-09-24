import { useCallback, useEffect, useRef, useState, type Dispatch } from 'react';
import { grade, GRADERS, typingSim, type GradeReport, type PracticeStep } from '@office-neko/shared';
import { SIMS } from '../sims/registry';
import { useOs, useProfileId } from '../db/profile';
import { Mochi } from '../components/Mochi';
import { RichText } from '../help/RichText';
import { SpotlightOverlay } from '../help/SpotlightOverlay';
import { useSound } from '../lib/sound';
import { ErrorBoundary } from '../app/ErrorBoundary';
import { recordTypingRun } from '../progress/typing';
import { HintPanel } from './HintPanel';
import { BackButton } from './BackButton';
import type { PlayerAction, PlayerState } from './playerReducer';

export function PracticeView({ step, state, dispatch }: { step: PracticeStep; state: PlayerState; dispatch: Dispatch<PlayerAction> }) {
  const def = SIMS[step.sim];
  const os = useOs();
  const profileId = useProfileId();
  const sound = useSound();
  const snap = state.saved[state.index];
  // Quay lại một bước: nạp đúng trạng thái lúc rời đi, không phải đề bài gốc.
  const [startFrom] = useState<unknown>(() => snap?.sim ?? step.initial);
  const latest = useRef<unknown>(startFrom);
  const timer = useRef<number | undefined>(undefined);
  const doneRef = useRef(state.stepDone);
  doneRef.current = state.stepDone;
  const reviewingRef = useRef(state.reviewing);
  reviewingRef.current = state.reviewing;
  /** Ghi đúng một lần WPM/keyStats của bài gõ phím khi trình mô phỏng báo đã gõ xong,
   * kể cả khi việc chấm điểm chạy lại nhiều lần trên cùng một bước. */
  const typingRecordedRef = useRef(false);
  const [report, setReport] = useState<GradeReport | null>(() => (snap?.report as GradeReport | undefined) ?? null);
  const leave = (type: 'next' | 'back') => dispatch({ type, snapshot: { sim: latest.current, report } });
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
      // Xem lại bài gõ đã xong thì không ghi thêm một lượt WPM nữa.
      if (step.sim === 'keyboard' && !typingRecordedRef.current && !reviewingRef.current) {
        const ts = s as typingSim.TypingState;
        if (ts.finished && profileId) {
          typingRecordedRef.current = true;
          const m = typingSim.typingMetrics(ts);
          void recordTypingRun({ profileId, mode: 'lesson', wpm: m.wpm, accuracy: m.accuracy, elapsedMs: m.elapsedMs, keyStats: ts.keyStats }).catch(() => undefined);
        }
      }
      if (doneRef.current) return;
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => runGrade(false), 300);
    },
    [runGrade, step.sim, profileId],
  );

  useEffect(() => () => window.clearTimeout(timer.current), []);

  if (!def || !GRADERS[step.sim]) return <div className="card p-6">😿 Trình mô phỏng “{step.sim}” chưa sẵn sàng.</div>;
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
          <Sim initial={startFrom} onState={onState} os={os} spotlight={spotlight} />
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
      {state.reviewing && (
        <p className="rounded-2xl bg-sky/30 p-3 text-sm">👀 Bạn đang xem lại bài đã làm xong: cứ bấm thử thoải mái, không ảnh hưởng điểm và sao.</p>
      )}
      <div className="flex flex-wrap items-center gap-3">
        {state.index > 0 && <BackButton onClick={() => leave('back')} />}
        {state.stepDone ? (
          <>
            <span className="flex items-center gap-2 font-bold text-excel-ink">
              <Mochi mood="happy" size={48} animated={false} /> Giỏi quá! Bạn làm đúng rồi 🎉
            </span>
            <button type="button" className="btn-primary" onClick={() => leave('next')} autoFocus>Tiếp tục →</button>
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

import { useEffect, useMemo, useReducer, useRef } from 'react';
import { computeStars, type Lesson } from '@office-neko/shared';
import { useOs } from '../db/profile';
import { initPlayer, playerReducer, type HintLevel } from './playerReducer';
import { ExplainView } from './ExplainView';
import { QuizView } from './QuizView';
import { PracticeView } from './PracticeView';

export interface LessonResult {
  stars: 1 | 2 | 3;
  maxHint: HintLevel;
  failures: number;
  timeMs: number;
}

export function LessonPlayer({ lesson, onFinish, onExit }: { lesson: Lesson; onFinish: (r: LessonResult) => void; onExit: () => void }) {
  const reducer = useMemo(() => playerReducer(lesson.steps), [lesson]);
  const [state, dispatch] = useReducer(reducer, lesson.steps, initPlayer);
  const startedAt = useRef(Date.now());
  const reported = useRef(false);
  const os = useOs();

  useEffect(() => {
    if (!state.finished || reported.current) return;
    reported.current = true;
    onFinish({
      stars: computeStars({ maxHintLevel: state.maxHint, failures: state.failures }),
      maxHint: state.maxHint,
      failures: state.failures,
      timeMs: Date.now() - startedAt.current,
    });
  }, [state.finished, state.maxHint, state.failures, onFinish]);

  const total = lesson.steps.length;
  const step = lesson.steps[state.index];
  const note = lesson.osNote?.[os];

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-4 p-4">
      <header className="flex items-center gap-3">
        <button type="button" data-help-id="player.close" aria-label="Thoát bài" onClick={onExit} className="rounded-full px-3 py-1 text-xl hover:bg-white">
          ✕
        </button>
        <div role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={state.index} className="h-3 flex-1 rounded-full bg-peach/30">
          <div className="h-full rounded-full bg-rose transition-all" style={{ width: `${(Math.min(state.index, total) / Math.max(total, 1)) * 100}%` }} />
        </div>
        <span className="text-sm font-bold text-muted">{Math.min(state.index + 1, total)}/{total}</span>
      </header>
      {note && <p className="rounded-2xl bg-sky/30 p-3 text-sm">💡 {note}</p>}
      {step && !state.finished && (
        step.kind === 'explain' ? (
          <ExplainView key={state.index} step={step} onNext={() => dispatch({ type: 'next' })} />
        ) : step.kind === 'quiz' ? (
          <QuizView key={state.index} step={step} done={state.stepDone} onPick={(correct) => dispatch({ type: 'quizPick', correct })} onNext={() => dispatch({ type: 'next' })} />
        ) : (
          <PracticeView key={state.index} step={step} state={state} dispatch={dispatch} />
        )
      )}
    </div>
  );
}

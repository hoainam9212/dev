import { useEffect, useRef, useState, type ReactNode } from 'react';
import { QuizChoice } from './QuizChoice';
import { Mascot } from './Mascot';
import { logSession, type SessionLog } from '../db';
import { useProgress } from '../store/progress';
import { speak, useStopSpeechOnUnmount } from '../lib/tts';
import { useT } from '../i18n';

export interface QuizQuestion {
  prompt: ReactNode;
  promptClassName?: string;
  choices: string[];
  answer: number;
  explain?: string;
  speakText?: string; // spoken after answering (and on "listen again" when `listenFirst`)
}

interface Props {
  questions: QuizQuestion[];
  kind: SessionLog['kind'];
  type: SessionLog['type'];
  xpPerCorrect?: number;
  listenFirst?: boolean; // speak the prompt when the question appears
  onFinish: (r: { correct: number; total: number }) => void;
}

/** Runs a list of multiple-choice questions, awards XP, logs the session and shows a result screen. */
export function QuizRunner({ questions, kind, type, xpPerCorrect = 2, listenFirst = false, onFinish }: Props) {
  useStopSpeechOnUnmount();
  const t = useT();
  const [i, setI] = useState(0);
  const [correct, setCorrect] = useState(0);
  const addXp = useProgress((s) => s.addXp);
  const startedAt = useRef(new Date().toISOString());
  const q = questions[i];

  useEffect(() => {
    if (listenFirst && q?.speakText) speak(q.speakText);
  }, [i, listenFirst, q]);

  if (questions.length === 0) return <p className="text-center text-muted">{t.quiz.notEnough}</p>;

  if (!q) {
    const pct = Math.round((correct / questions.length) * 100);
    return (
      <div className="flex flex-col items-center gap-3 py-6" data-testid="quiz-result">
        <Mascot mood={pct >= 80 ? 'happy' : pct >= 50 ? 'neutral' : 'sad'} size={120} />
        <p className="text-xl font-black text-rose">
          {t.quiz.result(correct, questions.length)}
        </p>
        <p className="text-sm text-muted">+{correct * xpPerCorrect} XP</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-sm font-bold text-muted">
        {t.quiz.position(i + 1, questions.length, correct)}
      </p>
      {listenFirst && q.speakText && (
        <button type="button" className="btn-sky" onClick={() => speak(q.speakText!)}>
          {t.common.listenAgain}
        </button>
      )}
      <QuizChoice
        key={i}
        prompt={q.prompt}
        promptClassName={q.promptClassName}
        choices={q.choices}
        answer={q.answer}
        explain={q.explain}
        onAnswer={(ok) => {
          const c = ok ? correct + 1 : correct;
          if (ok) addXp(xpPerCorrect);
          if (q.speakText && !listenFirst) speak(q.speakText);
          setCorrect(c);
          const next = i + 1;
          setI(next);
          if (next >= questions.length) {
            void logSession({
              startedAt: startedAt.current,
              kind,
              type,
              correct: c,
              total: questions.length,
              xp: c * xpPerCorrect,
            });
            onFinish({ correct: c, total: questions.length });
          }
        }}
      />
    </div>
  );
}

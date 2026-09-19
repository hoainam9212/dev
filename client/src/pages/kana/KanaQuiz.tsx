import { useMemo, useState } from 'react';
import type { KanaChar } from '@nihongo/shared';
import { QuizChoice } from '../../components/QuizChoice';
import { Mascot } from '../../components/Mascot';
import { makeChoices, shuffle } from '../../lib/quiz';
import { speak, useStopSpeechOnUnmount } from '../../lib/tts';
import { useProgress } from '../../store/progress';

export type KanaQuizMode = 'kana→romaji' | 'romaji→kana';

interface Props {
  chars: KanaChar[];
  mode: KanaQuizMode;
  total?: number;
  onFinish: (r: { correct: number; total: number }) => void;
}

interface Q {
  target: KanaChar;
  choices: string[];
  answer: number;
}

const XP_PER_CORRECT = 2;

function buildQuestions(chars: KanaChar[], mode: KanaQuizMode, total: number): Q[] {
  const picked = shuffle(chars).slice(0, Math.min(total, chars.length));
  return picked.map((target) => {
    const options = makeChoices(target, chars, 4, (c) => (mode === 'kana→romaji' ? c.romaji : c.kana));
    const choices = options.map((c) => (mode === 'kana→romaji' ? c.romaji : c.kana));
    return { target, choices, answer: options.indexOf(target) };
  });
}

export function KanaQuiz({ chars, mode, total = 10, onFinish }: Props) {
  useStopSpeechOnUnmount();
  const questions = useMemo(() => buildQuestions(chars, mode, total), [chars, mode, total]);
  const [i, setI] = useState(0);
  const [correct, setCorrect] = useState(0);
  const addXp = useProgress((s) => s.addXp);
  const q = questions[i];

  if (!q) {
    return (
      <div className="flex flex-col items-center gap-3 py-6">
        <Mascot mood={correct / questions.length >= 0.8 ? 'happy' : 'neutral'} size={120} />
        <p className="text-xl font-black text-rose">
          Kết quả: {correct} / {questions.length}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-sm font-bold text-muted">
        Câu {i + 1} / {questions.length} · Đúng: {correct}
      </p>
      <QuizChoice
        key={i}
        prompt={mode === 'kana→romaji' ? q.target.kana : q.target.romaji}
        choices={q.choices}
        answer={q.answer}
        onAnswer={(ok) => {
          const c = ok ? correct + 1 : correct;
          if (ok) addXp(XP_PER_CORRECT);
          speak(q.target.kana);
          setCorrect(c);
          const next = i + 1;
          setI(next);
          if (next >= questions.length) onFinish({ correct: c, total: questions.length });
        }}
      />
    </div>
  );
}

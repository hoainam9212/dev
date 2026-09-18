import { useState, type ReactNode } from 'react';

interface Props {
  prompt: ReactNode;
  choices: string[];
  answer: number;
  onAnswer: (correct: boolean) => void;
  explain?: string;
  promptClassName?: string;
}

/** Four-choice question. After a pick, highlights correct/wrong and shows a "Tiếp" button. */
export function QuizChoice({ prompt, choices, answer, onAnswer, explain, promptClassName = '' }: Props) {
  const [picked, setPicked] = useState<number | null>(null);
  const state = (i: number) => {
    if (picked === null) return 'idle';
    if (i === answer) return 'correct';
    if (i === picked) return 'wrong';
    return 'idle';
  };
  const cls: Record<string, string> = {
    idle: 'bg-surface ring-2 ring-sakura/50 hover:bg-sakura/30',
    correct: 'bg-emerald-200 text-emerald-900 ring-2 ring-emerald-400',
    wrong: 'bg-rose/30 text-text ring-2 ring-rose',
  };
  return (
    <div className="flex flex-col items-center gap-4">
      <div data-testid="quiz-prompt" className={`text-center font-black ${promptClassName || 'text-6xl'}`}>
        {prompt}
      </div>
      <div className="grid w-full max-w-md grid-cols-2 gap-3">
        {choices.map((c, i) => (
          <button
            key={i}
            type="button"
            data-state={state(i)}
            disabled={picked !== null}
            onClick={() => setPicked(i)}
            className={`rounded-2xl px-4 py-3 text-lg font-bold transition active:scale-95 disabled:cursor-default ${cls[state(i)]}`}
          >
            {c}
          </button>
        ))}
      </div>
      {picked !== null && (
        <div className="flex flex-col items-center gap-2">
          <p className={`font-bold ${picked === answer ? 'text-emerald-500' : 'text-rose'}`}>
            {picked === answer ? '正解！ Chính xác!' : `残念… Đáp án: ${choices[answer]}`}
          </p>
          {explain && <p className="text-sm text-muted">{explain}</p>}
          <button type="button" className="btn-primary" onClick={() => onAnswer(picked === answer)} autoFocus>
            Tiếp →
          </button>
        </div>
      )}
    </div>
  );
}

import { useState } from 'react';
import type { QuizStep } from '@office-neko/shared';
import { Mochi } from '../components/Mochi';
import { InlineText, RichText } from '../help/RichText';
import { useSound } from '../lib/sound';
import { BackButton } from './BackButton';

export function QuizView({
  step,
  done,
  savedWrong,
  onPick,
  onNext,
  onBack,
}: {
  step: QuizStep;
  done: boolean;
  /** Đáp án sai đã chọn lần trước, để quay lại thấy y như cũ. */
  savedWrong?: number[];
  onPick: (correct: boolean) => void;
  onNext: (wrong: number[]) => void;
  onBack?: (wrong: number[]) => void;
}) {
  const [wrong, setWrong] = useState<number[]>(savedWrong ?? []);
  const sound = useSound();
  const pick = (i: number) => {
    if (done || wrong.includes(i)) return;
    const correct = i === step.answer;
    if (!correct) setWrong((w) => [...w, i]);
    sound(correct ? 'correct' : 'wrong');
    onPick(correct);
  };
  return (
    <div className="card space-y-4 p-6">
      <RichText text={step.question} className="text-xl font-bold" />
      <div className="grid gap-3">
        {step.choices.map((c, i) => {
          const isWrong = wrong.includes(i);
          const isRight = done && i === step.answer;
          const cls = isRight
            ? 'border-excel bg-excel/15'
            : isWrong
              ? 'animate-shake border-rose bg-rose/10 opacity-70'
              : 'border-peach/50 hover:border-peach hover:bg-peach/10';
          return (
            <button key={i} type="button" onClick={() => pick(i)} className={`rounded-2xl border-2 px-4 py-3 text-left font-semibold transition ${cls}`}>
              {isRight ? '✅ ' : isWrong ? '❌ ' : ''}<InlineText text={c} />
            </button>
          );
        })}
      </div>
      {wrong.length > 0 && !done && <p className="font-semibold text-rose-ink">Chưa đúng rồi, thử lại nhé! 💪</p>}
      {done && (
        <div className="flex items-start gap-3 rounded-2xl bg-mint/30 p-3">
          <Mochi mood="happy" size={56} animated={false} />
          <RichText text={step.why} />
        </div>
      )}
      <div className="flex flex-wrap gap-3">
        {onBack && <BackButton onClick={() => onBack(wrong)} />}
        {done && <button type="button" className="btn-primary" onClick={() => onNext(wrong)} autoFocus>Tiếp tục →</button>}
      </div>
    </div>
  );
}

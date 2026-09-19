import type { PracticeStep } from '@office-neko/shared';
import { RichText } from '../help/RichText';
import type { HintLevel } from './playerReducer';

export function HintPanel({ step, level }: { step: PracticeStep; level: HintLevel }) {
  return (
    <div className="space-y-2 rounded-2xl bg-butter/40 p-4" aria-live="polite">
      <div>
        <strong>Gợi ý 1:</strong>
        <RichText text={step.hints[0]} />
      </div>
      {level >= 2 && (
        <div><strong>Gợi ý 2:</strong> Mochi đã đánh dấu chỗ cần bấm cho bạn 🐾</div>
      )}
      {level >= 3 && (
        <div>
          <strong>Lời giải từng bước:</strong>
          <ol className="mt-1 list-decimal space-y-1 pl-6">
            {step.hints[2].map((s, i) => (
              <li key={i}><RichText text={s} /></li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

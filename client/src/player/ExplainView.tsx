import type { ExplainStep } from '@office-neko/shared';
import { Mochi } from '../components/Mochi';
import { SpeechBubble } from '../components/SpeechBubble';
import { RichText } from '../help/RichText';

export function ExplainView({ step, onNext }: { step: ExplainStep; onNext: () => void }) {
  return (
    <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
      <Mochi mood={step.mood ?? 'neutral'} size={150} />
      <div className="flex-1 space-y-4">
        <SpeechBubble>
          <RichText text={step.body} className="text-lg" />
          {step.image && <img src={step.image} alt="" className="mt-3 max-h-64 rounded-2xl" />}
        </SpeechBubble>
        <button type="button" className="btn-primary" onClick={onNext} autoFocus>Tiếp tục →</button>
      </div>
    </div>
  );
}

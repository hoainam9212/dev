import { useState } from 'react';
import type { BusinessItem } from '@nihongo/shared';
import { speak, useStopSpeechOnUnmount } from '../../lib/tts';

export function RephraseList({ items }: { items: BusinessItem[] }) {
  useStopSpeechOnUnmount();
  const [hideOk, setHideOk] = useState(false);
  const [revealed, setRevealed] = useState<Set<string>>(new Set());

  return (
    <div className="space-y-3">
      <label className="flex items-center justify-end gap-2 text-sm">
        <input
          type="checkbox"
          checked={hideOk}
          onChange={(e) => {
            setHideOk(e.target.checked);
            setRevealed(new Set());
          }}
        />
        Tự luyện: che câu nên nói
      </label>
      <ul className="space-y-2">
        {items.map((i) => {
          const show = !hideOk || revealed.has(i.id);
          return (
            <li key={i.id} className="rounded-2xl bg-cream p-3 dark:bg-bg">
              <p className="text-xs font-bold text-muted">{i.vi}</p>
              <p className="mt-1 text-base" lang="ja">
                <span className="mr-2 rounded bg-rose/20 px-1.5 text-xs font-black text-rose">NG</span>
                <span className="text-muted line-through decoration-rose/60">{i.ng}</span>
              </p>
              {show ? (
                <div className="mt-1 flex items-start gap-2">
                  <span className="rounded bg-emerald-100 px-1.5 text-xs font-black text-emerald-700">OK</span>
                  <button type="button" className="text-left" onClick={() => speak(i.ja)} aria-label={`Nghe ${i.ja}`}>
                    <span className="text-lg font-bold" lang="ja">
                      {i.ja}
                    </span>
                    <span className="block text-xs text-muted">{i.reading}</span>
                  </button>
                </div>
              ) : (
                <button type="button" className="btn-soft mt-2 px-3 py-1 text-sm" onClick={() => setRevealed((r) => new Set(r).add(i.id))}>
                  Xem câu nên nói
                </button>
              )}
              {show && i.note && <p className="mt-1 text-xs text-muted">💡 {i.note}</p>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

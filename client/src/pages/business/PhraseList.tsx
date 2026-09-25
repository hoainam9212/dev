import { useState } from 'react';
import { pickText, type BusinessItem } from '@nihongo/shared';
import { speak, useStopSpeechOnUnmount } from '../../lib/tts';
import { useLang, useT } from '../../i18n';

export function PhraseList({ items }: { items: BusinessItem[] }) {
  useStopSpeechOnUnmount();
  const t = useT();
  const lang = useLang();
  const [showReading, setShowReading] = useState(true);
  return (
    <div className="space-y-3">
      <div className="flex justify-end">
        <button type="button" className="btn-soft text-sm" onClick={() => setShowReading((s) => !s)}>
          {showReading ? t.business.hideReading : t.business.showReading}
        </button>
      </div>
      <ul className="space-y-2">
        {items.map((i) => (
          <li key={i.id} className="flex items-start gap-3 rounded-2xl bg-cream p-3 dark:bg-bg">
            <button type="button" className="mt-1 text-rose" onClick={() => speak(i.ja)} aria-label={t.common.listenTo(i.ja)}>
              🔊
            </button>
            <div className="flex-1">
              <p className="text-lg font-bold" lang="ja">
                {i.ja}
              </p>
              {showReading && <p className="text-xs text-muted">{i.reading}</p>}
              <p className="text-sm">{pickText(i.vi, i.en, lang)}</p>
              {i.note && <p className="mt-1 text-xs text-muted">💡 {i.note}</p>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

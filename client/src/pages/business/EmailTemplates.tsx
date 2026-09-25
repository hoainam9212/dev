import { useState } from 'react';
import { pickText, type BusinessItem } from '@nihongo/shared';
import { speak, useStopSpeechOnUnmount } from '../../lib/tts';
import { useLang, useT } from '../../i18n';

export function EmailTemplates({ items }: { items: BusinessItem[] }) {
  useStopSpeechOnUnmount();
  const t = useT();
  const lang = useLang();
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (i: BusinessItem) => {
    try {
      await navigator.clipboard.writeText(`件名：${i.ja}\n\n${i.note ?? ''}`);
      setCopied(i.id);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <ul className="space-y-2">
      {items.map((i) => {
        const isOpen = open === i.id;
        return (
          <li key={i.id} className="rounded-2xl bg-cream dark:bg-bg">
            <button type="button" className="flex w-full items-center justify-between p-3 text-left" onClick={() => setOpen(isOpen ? null : i.id)} aria-expanded={isOpen}>
              <span>
                <span className="text-xs font-bold text-muted">件名 · </span>
                <span className="font-bold" lang="ja">
                  {i.ja}
                </span>
                <span className="block text-xs text-muted">{i.reading}</span>
              </span>
              <span>{isOpen ? '▲' : '▼'}</span>
            </button>
            {isOpen && (
              <div className="space-y-3 px-3 pb-3">
                <pre className="whitespace-pre-wrap rounded-2xl bg-surface p-3 font-sans text-sm leading-relaxed" lang="ja">
                  {i.note}
                </pre>
                <p className="text-sm text-muted">📝 {pickText(i.vi, i.en, lang)}</p>
                <div className="flex gap-2">
                  <button type="button" className="btn-sky text-sm" onClick={() => speak(i.note ?? i.ja)}>
                    {t.common.listen}
                  </button>
                  <button type="button" className="btn-soft text-sm" onClick={() => void copy(i)}>
                    {copied === i.id ? t.business.copied : t.business.copy}
                  </button>
                </div>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

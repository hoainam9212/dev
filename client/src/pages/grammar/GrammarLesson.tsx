import { useEffect, useState } from 'react';
import { exampleTranslation, grammarMeaning, type Grammar } from '@nihongo/shared';
import { speak, useStopSpeechOnUnmount } from '../../lib/tts';
import { recordReview } from '../../db/srs';
import { useProgress } from '../../store/progress';
import { useLang, useT } from '../../i18n';

interface Props {
  grammar: Grammar;
  onClose: () => void;
}

export function GrammarLesson({ grammar, onClose }: Props) {
  useStopSpeechOnUnmount();
  const t = useT();
  const lang = useLang();
  const [marked, setMarked] = useState(false);
  const addXp = useProgress((s) => s.addXp);

  useEffect(() => setMarked(false), [grammar.id]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 md:items-center md:p-6" onClick={onClose}>
      <div
        role="dialog"
        aria-label={t.grammar.dialog(grammar.title)}
        className="card max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-b-none p-5 md:rounded-b-3xl md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="text-xs font-bold text-muted">{grammar.level}</span>
            <h2 className="text-2xl font-black">{grammar.title}</h2>
          </div>
          <button type="button" className="btn-soft" onClick={onClose} aria-label={t.common.close}>
            ✕
          </button>
        </div>
        <div className="mt-4 space-y-4">
          <section>
            <p className="text-xs font-bold text-muted">{t.grammar.meaning}</p>
            <p className="font-bold">{grammarMeaning(grammar, lang)}</p>
          </section>
          <section>
            <p className="text-xs font-bold text-muted">{t.grammar.formation}</p>
            <p className="rounded-2xl bg-lavender/30 px-4 py-2 font-mono text-sm">{grammar.formation}</p>
          </section>
          <section>
            <p className="text-xs font-bold text-muted">{t.grammar.examples}</p>
            <ul className="mt-1 space-y-2">
              {grammar.examples.map((ex, i) => (
                <li key={i} className="rounded-2xl bg-cream p-3 dark:bg-bg">
                  <div className="flex items-start gap-2">
                    <button type="button" className="text-rose" onClick={() => speak(ex.ja)} aria-label={t.grammar.listenExample}>
                      🔊
                    </button>
                    <div>
                      <p className="text-lg font-bold">{ex.ja}</p>
                      <p className="text-xs text-muted">{ex.romaji}</p>
                      <p className="text-sm">{exampleTranslation(ex, lang)}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
          <button
            type="button"
            className="btn-primary"
            disabled={marked}
            onClick={async () => {
              await recordReview(grammar.id, 'grammar', 2);
              addXp(3);
              setMarked(true);
            }}
          >
            {marked ? t.common.addedToReview : t.common.markLearned}
          </button>
        </div>
      </div>
    </div>
  );
}

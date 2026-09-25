import { useMemo, useState } from 'react';
import { buildQueue, kanjiMeanings, type Kanji, type ProgressItem } from '@nihongo/shared';
import { FlashcardSession, type CardItem } from '../../components/FlashcardSession';
import { toState } from '../../db/srs';
import { useLang, useT } from '../../i18n';

interface Props {
  kanji: Kanji[];
  progress: Map<string, ProgressItem>;
  newLimit?: number;
}

export function kanjiCard(k: Kanji): CardItem {
  return {
    id: k.id,
    type: 'kanji',
    speakText: k.kun[0]?.replace(/[-.]/g, '') ?? k.on[0],
    front: <span className="text-7xl font-black">{k.char}</span>,
    back: <KanjiBack k={k} />,
  };
}

/** A component (not JSX baked into the card) so the meaning follows a language switch mid-session. */
function KanjiBack({ k }: { k: Kanji }) {
  const lang = useLang();
  return (
    <div className="space-y-1">
      <p className="text-3xl font-black">{k.char}</p>
      <p className="text-lg font-bold text-rose">{kanjiMeanings(k, lang).slice(0, 3).join(', ')}</p>
      {k.on.length > 0 && <p className="text-sm">音 {k.on.join('、')}</p>}
      {k.kun.length > 0 && <p className="text-sm">訓 {k.kun.join('、')}</p>}
    </div>
  );
}

export function KanjiFlashcards({ kanji, progress, newLimit = 20 }: Props) {
  const t = useT();
  const [seed, setSeed] = useState(0);
  const [done, setDone] = useState(false);
  const items = useMemo<CardItem[]>(() => {
    const byId = new Map(kanji.map((k) => [k.id, k]));
    const ids = buildQueue(
      kanji.map((k) => {
        const p = progress.get(k.id);
        return p ? { id: k.id, state: toState(p) } : { id: k.id };
      }),
      new Date(),
      { newLimit },
    );
    return ids.map((id) => kanjiCard(byId.get(id)!));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kanji, newLimit, seed]);

  return (
    <div className="space-y-4">
      <FlashcardSession key={seed} items={items} onFinish={() => setDone(true)} />
      {done && (
        <div className="flex justify-center">
          <button
            type="button"
            className="btn-primary"
            onClick={() => {
              setDone(false);
              setSeed((s) => s + 1);
            }}
          >
            {t.common.newSession}
          </button>
        </div>
      )}
    </div>
  );
}

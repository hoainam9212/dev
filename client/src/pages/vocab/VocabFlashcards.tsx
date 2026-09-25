import { useMemo, useState } from 'react';
import {
  buildQueue,
  sentenceTranslation,
  vocabMeanings,
  type Level,
  type ProgressItem,
  type Sentence,
  type Vocab,
} from '@nihongo/shared';
import { FlashcardSession, type CardItem } from '../../components/FlashcardSession';
import { toState } from '../../db/srs';
import { useSentenceMap } from '../../content/useSentenceMap';
import { useLang, useT } from '../../i18n';

interface Props {
  vocab: Vocab[];
  level: Level;
  progress: Map<string, ProgressItem>;
  newLimit?: number;
}

/** A component, not JSX built in the queue memo: it reads the language at render, so a switch re-translates it. */
function VocabBack({ v, ex }: { v: Vocab; ex?: Sentence }) {
  const lang = useLang();
  return (
    <div className="space-y-1">
      <p className="text-2xl font-black text-rose">{v.reading}</p>
      <p className="text-lg">{vocabMeanings(v, lang).join(', ')}</p>
      {ex && (
        <p className="pt-2 text-sm text-muted">
          {ex.ja}
          <br />
          {sentenceTranslation(ex, lang)}
        </p>
      )}
    </div>
  );
}

export function VocabFlashcards({ vocab, level, progress, newLimit = 20 }: Props) {
  const t = useT();
  const sentences = useSentenceMap(level);
  const [seed, setSeed] = useState(0);
  const [done, setDone] = useState(false);

  const items = useMemo<CardItem[]>(() => {
    const byId = new Map(vocab.map((v) => [v.id, v]));
    const ids = buildQueue(
      vocab.map((v) => {
        const p = progress.get(v.id);
        return p ? { id: v.id, state: toState(p) } : { id: v.id };
      }),
      new Date(),
      { newLimit },
    );
    return ids.map((id) => {
      const v = byId.get(id)!;
      const ex = v.sentenceIds.map((s) => sentences.get(s)).find(Boolean);
      return {
        id: v.id,
        type: 'vocab' as const,
        speakText: v.word,
        front: <span className="text-4xl font-black">{v.word}</span>,
        back: <VocabBack v={v} ex={ex} />,
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vocab, seed, newLimit, sentences]);

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

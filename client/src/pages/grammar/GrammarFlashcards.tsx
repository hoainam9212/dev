import { useMemo, useState } from 'react';
import { buildQueue, type Grammar, type ProgressItem } from '@nihongo/shared';
import { FlashcardSession, type CardItem } from '../../components/FlashcardSession';
import { toState } from '../../db/srs';

export function grammarCard(g: Grammar): CardItem {
  const ex = g.examples[0];
  return {
    id: g.id,
    type: 'grammar',
    speakText: ex?.ja,
    front: <span className="text-3xl font-black">{g.title}</span>,
    back: (
      <div className="space-y-1 text-left">
        <p className="text-lg font-bold text-rose">{g.meaning}</p>
        <p className="font-mono text-xs text-muted">{g.formation}</p>
        {ex && (
          <p className="pt-1 text-sm">
            {ex.ja}
            <br />
            <span className="text-muted">{ex.en}</span>
          </p>
        )}
      </div>
    ),
  };
}

export function GrammarFlashcards({ grammar, progress, newLimit = 10 }: { grammar: Grammar[]; progress: Map<string, ProgressItem>; newLimit?: number }) {
  const [seed, setSeed] = useState(0);
  const [done, setDone] = useState(false);
  const items = useMemo<CardItem[]>(() => {
    const byId = new Map(grammar.map((g) => [g.id, g]));
    const ids = buildQueue(
      grammar.map((g) => {
        const p = progress.get(g.id);
        return p ? { id: g.id, state: toState(p) } : { id: g.id };
      }),
      new Date(),
      { newLimit },
    );
    return ids.map((id) => grammarCard(byId.get(id)!));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grammar, newLimit, seed]);

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
            Phiên mới
          </button>
        </div>
      )}
    </div>
  );
}

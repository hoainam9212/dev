import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LEVELS, type Kanji, type ProgressItem } from '@nihongo/shared';
import { dueItems } from '../db/srs';
import { loadJson } from '../content/loader';
import { loadVocabByIds } from '../content/useVocabByIds';
import { FlashcardSession, type CardItem } from '../components/FlashcardSession';
import { LoadingCat } from '../components/LoadingCat';
import { Mascot } from '../components/Mascot';
import { kanjiCard } from './kanji/KanjiFlashcards';
import { VocabBack } from './vocab/VocabFlashcards';
import { useT } from '../i18n';

/** Resolve due progress rows to flashcards (vocab + kanji), keeping due order. */
export async function buildReviewCards(due: ProgressItem[]): Promise<CardItem[]> {
  const vocabIds = due.filter((d) => d.type === 'vocab').map((d) => d.itemId);
  const kanjiIds = new Set(due.filter((d) => d.type === 'kanji').map((d) => d.itemId));
  const [vocab, kanjiBundles] = await Promise.all([
    loadVocabByIds(vocabIds),
    kanjiIds.size ? Promise.all(LEVELS.map((l) => loadJson<Kanji[]>(`kanji/${l.toLowerCase()}.json`))) : Promise.resolve([]),
  ]);
  const cards = new Map<string, CardItem>();
  for (const v of vocab) {
    cards.set(v.id, {
      id: v.id,
      type: 'vocab',
      speakText: v.word,
      front: <span className="text-4xl font-black">{v.word}</span>,
      back: <VocabBack v={v} />,
    });
  }
  for (const bundle of kanjiBundles) for (const k of bundle) if (kanjiIds.has(k.id)) cards.set(k.id, kanjiCard(k));
  return due.map((d) => cards.get(d.itemId)).filter((c): c is CardItem => !!c);
}

export function ReviewPage() {
  const t = useT();
  const [cards, setCards] = useState<CardItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [round, setRound] = useState(0);
  const [done, setDone] = useState<{ reviewed: number; correct: number } | null>(null);

  useEffect(() => {
    let alive = true;
    setCards(null);
    setDone(null);
    dueItems()
      .then(buildReviewCards)
      .then((c) => alive && setCards(c), (e: Error) => alive && setError(e.message));
    return () => {
      alive = false;
    };
  }, [round]);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-black text-rose">{t.review.title}</h1>
      <section className="card p-4 md:p-6">
        {error && <p className="text-center text-rose">{error}</p>}
        {!error && cards === null && <LoadingCat text={t.review.loading} />}
        {cards && cards.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-6" data-testid="review-empty">
            <Mascot mood="happy" size={120} />
            <p className="font-bold">{t.review.empty}</p>
            <div className="flex gap-2">
              <Link to="/vocab" className="btn-primary">
                {t.nav.vocab.label}
              </Link>
              <Link to="/kanji" className="btn-sky">
                {t.nav.kanji.label}
              </Link>
            </div>
          </div>
        )}
        {cards && cards.length > 0 && (
          <>
            <p className="mb-3 text-center text-sm text-muted">{t.review.due(cards.length)}</p>
            <FlashcardSession items={cards} onFinish={setDone} />
            {done && (
              <div className="mt-4 flex justify-center">
                <button type="button" className="btn-primary" onClick={() => setRound((r) => r + 1)}>
                  {t.review.again}
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}

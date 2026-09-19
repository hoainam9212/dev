import type { Level, Question, ReadingLesson } from '@nihongo/shared';

export type V = [word: string, reading: string, vi: string];
export type Q = [prompt: string, choices: string[], answer: number, explain?: string];

/** Build a reading lesson with stable ids (`r-n2-04`, `r-n2-04-q1`). */
export function lesson(level: Level, n: number, title: string, body: string, vocab: V[], qs: Q[], topic?: string): ReadingLesson {
  const id = `r-${level.toLowerCase()}-${String(n).padStart(2, '0')}`;
  const out: ReadingLesson = {
    id,
    level,
    title,
    body: body.trim(),
    vocab: vocab.map(([word, reading, vi]) => ({ word, reading, vi })),
    questions: qs.map(([prompt, choices, answer, explain], i): Question => {
      const q: Question = { id: `${id}-q${i + 1}`, prompt, choices, answer };
      if (explain) q.explain = explain;
      return q;
    }),
  };
  if (topic) out.topic = topic;
  return out;
}

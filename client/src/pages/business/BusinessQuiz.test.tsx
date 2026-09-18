import { render, screen, fireEvent } from '@testing-library/react';
import type { BusinessItem, BusinessTopic } from '@nihongo/shared';
import { buildKeigoQuestions, buildPhraseQuestions } from './BusinessQuiz';
import { BusinessPage } from './BusinessPage';
import { mulberry32 } from '../../lib/quiz';
import { clearContentCache } from '../../content/loader';

const K = (n: number, ja: string, sonkei: string, kenjou: string): BusinessItem => ({
  id: `b-keigo-0${n}`, ja, reading: ja, vi: 'x', category: 'keigo', keigo: { sonkei, kenjou, teinei: `${ja}ます` },
});
const P = (n: number, ja: string, vi: string): BusinessItem => ({ id: `b-phone-0${n}`, ja, reading: ja, vi, category: 'phone' });
const topics: BusinessTopic[] = [
  { id: 'keigo', title: 'Keigo', intro: '', items: [K(1, 'する', 'なさる', 'いたす'), K(2, '言う', 'おっしゃる', '申す・申し上げる'), K(3, '行く', 'いらっしゃる', '参る'), K(4, '見る', 'ご覧になる', '拝見する'), K(5, 'くれる', 'くださる', '—')] },
  { id: 'phone', title: 'Phone', intro: '', items: [P(1, 'A', 'a'), P(2, 'B', 'b'), P(3, 'C', 'c'), P(4, 'D', 'd')] },
];

it('builds keigo questions using the first alternative and skips missing forms', () => {
  const items = topics[0]!.items;
  const qs = buildKeigoQuestions(items, 'kenjou', 10, mulberry32(1));
  expect(qs).toHaveLength(4); // くれる has no kenjou
  for (const q of qs) {
    expect(new Set(q.choices).size).toBe(4);
    expect(q.choices.every((c) => !c.includes('・'))).toBe(true);
  }
  expect(buildPhraseQuestions(topics.flatMap((t) => t.items), 3, mulberry32(2))).toHaveLength(3);
});

it('BusinessPage renders the keigo table and switches topics', async () => {
  clearContentCache();
  vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(JSON.stringify(topics)));
  render(<BusinessPage />);
  expect(await screen.findByText('尊敬語 Tôn kính')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Phone' }));
  expect(screen.getByText('Ẩn cách đọc')).toBeInTheDocument();
  vi.restoreAllMocks();
});

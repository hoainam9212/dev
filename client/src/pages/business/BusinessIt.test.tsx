import { render, screen, fireEvent } from '@testing-library/react';
import type { BusinessItem, BusinessScenario, BusinessTopic } from '@nihongo/shared';
import { buildTermQuestions, buildRephraseQuestions, buildPhraseQuestions } from './BusinessQuiz';
import { BusinessPage } from './BusinessPage';
import { ScenarioView } from './ScenarioView';
import { mulberry32 } from '../../lib/quiz';
import { clearContentCache } from '../../content/loader';

const T = (n: number, ja: string, vi: string): BusinessItem => ({
  id: `b-it-pm-0${n}`, ja, reading: ja, vi, category: 'pm', example: { ja: `${ja}の例文です。`, vi: `ví dụ ${vi}` },
});
const R = (n: number, ok: string, ng: string): BusinessItem => ({ id: `b-it-rephrase-0${n}`, ja: ok, reading: ok, ng, vi: `tình huống ${n}`, category: 'rephrase' });
const P = (n: number, ja: string): BusinessItem => ({ id: `b-it-bug-0${n}`, ja, reading: ja, vi: `vi ${n}`, category: 'bug' });

const terms = [T(1, '進捗', 'Tiến độ'), T(2, '工数', 'Công số'), T(3, '納期', 'Hạn bàn giao'), T(4, '課題', 'Vấn đề'), T(5, '遅延', 'Chậm trễ')];
const rephrase = [R(1, '対応いたします。', 'やります。'), R(2, '承知いたしました。', '了解です。'), R(3, 'ご確認いただけますでしょうか。', '確認してください。'), R(4, '問題ございません。', '大丈夫です。')];
const scenario: BusinessScenario = {
  id: 'sc-01',
  title: 'Xác nhận spec',
  situation: 'Bạn hỏi khách hàng.',
  roles: { me: 'Bạn (BrSE)', other: 'Khách hàng' },
  lines: [
    { me: false, ja: 'はい、どうぞ。', vi: 'Vâng, mời.' },
    { me: true, ja: '一点確認させてください。', vi: 'Cho tôi xác nhận một điểm.' },
    { me: false, ja: 'わかりました。', vi: 'Được.' },
  ],
  points: ['Chỉ rõ vị trí.', 'Nhắc lại cách hiểu.'],
};
const topics: BusinessTopic[] = [
  { id: 'phone', group: 'basic', kind: 'phrases', title: 'Điện thoại', intro: '', items: [] },
  { id: 'it-glossary', group: 'it', kind: 'glossary', title: 'Thuật ngữ IT', intro: 'intro glossary', items: terms },
  { id: 'it-scenarios', group: 'it', kind: 'scenarios', title: 'Tình huống thực tế BrSE', intro: '', items: [], scenarios: [scenario] },
  { id: 'it-rephrase', group: 'it', kind: 'rephrase', title: 'Nói mềm mỏng', intro: '', items: rephrase },
];

it('term questions alternate direction and keep 4 unique choices', () => {
  const qs = buildTermQuestions(terms, 4, mulberry32(3));
  expect(qs).toHaveLength(4);
  for (const q of qs) expect(new Set(q.choices).size).toBe(4);
  expect(terms.some((t) => qs[0]!.choices.includes(t.vi))).toBe(true); // term → meaning
  expect(terms.some((t) => qs[1]!.choices.includes(t.ja))).toBe(true); // meaning → term
});

it('rephrase questions offer business wordings and skip items without NG', () => {
  const qs = buildRephraseQuestions([...rephrase, terms[0]!], 10, mulberry32(4));
  expect(qs).toHaveLength(4);
  for (const q of qs) expect(q.choices.every((c) => rephrase.some((r) => r.ja === c))).toBe(true);
});

it('phrase questions ignore glossary and rephrase items', () => {
  const qs = buildPhraseQuestions([...terms, ...rephrase, P(1, 'A'), P(2, 'B'), P(3, 'C'), P(4, 'D')], 10, mulberry32(5));
  expect(qs).toHaveLength(4);
});

it('BusinessPage opens the IT group with glossary, NG/OK and scenarios', async () => {
  clearContentCache();
  vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(JSON.stringify(topics)));
  render(<BusinessPage />);
  expect(await screen.findByText('intro glossary')).toBeInTheDocument();
  expect(screen.getByText('5 thuật ngữ')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Nói mềm mỏng' }));
  expect(screen.getByText('やります。')).toBeInTheDocument();
  expect(screen.getAllByText('NG').length).toBe(4);
  fireEvent.click(screen.getByRole('button', { name: 'Tình huống thực tế BrSE' }));
  fireEvent.click(screen.getByRole('button', { name: /Xác nhận spec/ }));
  expect(screen.getByText('一点確認させてください。')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('tab', { name: /Cơ bản/ }));
  expect(screen.getByRole('button', { name: 'Điện thoại' })).toBeInTheDocument();
  vi.restoreAllMocks();
});

it('scenario roleplay walks through the lines and scores the learner turns', () => {
  render(<ScenarioView scenario={scenario} onBack={() => {}} />);
  expect(screen.getByTestId('scenario-lines').children).toHaveLength(3);
  fireEvent.click(screen.getByRole('button', { name: /Luyện đóng vai/ }));
  fireEvent.click(screen.getByRole('button', { name: /Tiếp/ })); // other's line
  expect(screen.getByText('Cho tôi xác nhận một điểm.')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /Nói được/ })); // self-assess (no STT in jsdom)
  expect(screen.getByText('100 điểm')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /Tiếp/ }));
  fireEvent.click(screen.getByRole('button', { name: /Tiếp/ })); // last other line
  expect(screen.getByTestId('scenario-roleplay-result')).toHaveTextContent('100');
});

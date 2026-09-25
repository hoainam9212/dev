import { render, screen, fireEvent } from '@testing-library/react';
import type { BusinessItem, BusinessScenario, BusinessTopic } from '@nihongo/shared';
import { BusinessPage } from './BusinessPage';
import { GlossaryList } from './GlossaryList';
import { KeigoTable } from './KeigoTable';
import { buildKeigoQuestions, buildPhraseQuestions, buildTermQuestions } from './BusinessQuiz';
import { ScenarioView } from './ScenarioView';
import { BusinessRoleplay } from './BusinessRoleplay';
import { mulberry32 } from '../../lib/quiz';
import { clearContentCache } from '../../content/loader';
import { withLang } from '../../test/lang';

vi.mock('../../lib/tts', () => ({
  speak: vi.fn(),
  stopSpeaking: vi.fn(),
  speakSequence: vi.fn(() => ({ cancel: vi.fn(), done: Promise.resolve() })),
  useStopSpeechOnUnmount: vi.fn(),
}));

const T = (n: number, ja: string, vi_: string, en?: string): BusinessItem => ({
  id: `b-it-pm-0${n}`, ja, reading: ja, vi: vi_, ...(en ? { en } : {}), category: 'pm',
  example: { ja: `${ja}の例文です。`, vi: `ví dụ ${vi_}`, ...(en ? { en: `example ${en}` } : {}) },
});
const terms = [T(1, '進捗', 'Tiến độ', 'Progress'), T(2, '工数', 'Công số', 'Effort'), T(3, '納期', 'Hạn bàn giao', 'Deadline'), T(4, '課題', 'Vấn đề')];
const K = (n: number, ja: string, sonkei: string, kenjou: string): BusinessItem => ({
  id: `b-keigo-0${n}`, ja, reading: ja, vi: 'x', category: 'keigo', keigo: { sonkei, kenjou, teinei: `${ja}ます` },
});
const keigo = [K(1, 'する', 'なさる', 'いたす'), K(2, '言う', 'おっしゃる', '申す'), K(3, '行く', 'いらっしゃる', '参る'), K(4, '見る', 'ご覧になる', '拝見する')];
const P = (n: number, ja: string, vi_: string, en: string): BusinessItem => ({ id: `b-phone-0${n}`, ja, reading: ja, vi: vi_, en, category: 'phone' });
const phrases = [P(1, 'A', 'câu a', 'phrase a'), P(2, 'B', 'câu b', 'phrase b'), P(3, 'C', 'câu c', 'phrase c'), P(4, 'D', 'câu d', 'phrase d')];
const scenario: BusinessScenario = {
  id: 'sc-01',
  title: 'Xác nhận spec',
  situation: 'Bạn hỏi khách hàng.',
  roles: { me: 'Bạn (BrSE)', other: 'Khách hàng' },
  lines: [
    { me: false, ja: 'はい、どうぞ。', vi: 'Vâng, mời.', en: 'Yes, go ahead.' },
    { me: true, ja: '一点確認させてください。', vi: 'Cho tôi xác nhận một điểm.' },
  ],
  points: ['Chỉ rõ vị trí.'],
};
const topics: BusinessTopic[] = [
  { id: 'phone', group: 'basic', kind: 'phrases', title: 'Điện thoại', intro: '', items: phrases },
  { id: 'it-glossary', group: 'it', kind: 'glossary', title: 'Thuật ngữ IT', intro: '', items: terms },
];

it('shows the business mode and group tabs in English', async () => {
  withLang('en');
  clearContentCache();
  vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(JSON.stringify(topics)));
  render(<BusinessPage />);
  expect(await screen.findByRole('tab', { name: '🏢 Basics' })).toBeInTheDocument();
  for (const tab of ['Learn', 'Quiz', 'Roleplay']) expect(screen.getByRole('tab', { name: tab })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Business Japanese' })).toBeInTheDocument();
  vi.restoreAllMocks();
});

it('glossary shows English when present, Vietnamese otherwise, and search matches both', () => {
  withLang('en');
  render(<GlossaryList items={terms} />);
  expect(screen.getByText('Progress')).toBeInTheDocument();
  expect(screen.getByText('example Progress')).toBeInTheDocument();
  expect(screen.getByText('Vấn đề')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Project management' })).toBeInTheDocument();
  expect(screen.getByText('4 terms')).toBeInTheDocument();
  fireEvent.change(screen.getByLabelText('Search terms'), { target: { value: 'deadline' } });
  expect(screen.getByText('1 term')).toBeInTheDocument();
  fireEvent.change(screen.getByLabelText('Search terms'), { target: { value: 'tiến độ' } });
  expect(screen.getByText('Progress')).toBeInTheDocument();
});

it('keigo table shows English column headers', () => {
  withLang('en');
  render(<KeigoTable items={keigo} />);
  for (const h of ['Plain', '尊敬語 Respectful', '謙譲語 Humble', '丁寧語 Polite']) expect(screen.getByRole('columnheader', { name: h })).toBeInTheDocument();
});

it('quiz builders use English content and labels in English', () => {
  withLang('en');
  const [q] = buildPhraseQuestions(phrases, 1, mulberry32(1), 'en');
  render(<>{q!.prompt}</>);
  expect(screen.getByText(/^phrase [abcd]$/)).toBeInTheDocument();
  const tq = buildTermQuestions(terms.slice(0, 3).concat(T(5, '遅延', 'Chậm trễ', 'Delay')), 1, mulberry32(2), 'en')[0]!;
  expect(tq.choices.every((c) => /^[A-Z][a-z]+$/.test(c))).toBe(true);
  const [kq] = buildKeigoQuestions(keigo, 'sonkei', 1, mulberry32(3), 'en');
  render(<>{kq!.prompt}</>);
  expect(screen.getByText('尊敬語 (respectful) of')).toBeInTheDocument();
});

it('scenario view controls and lines follow the display language', () => {
  withLang('en');
  render(<ScenarioView scenario={scenario} onBack={vi.fn()} />);
  expect(screen.getByRole('button', { name: '← Scenarios' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Play dialogue/ })).toBeInTheDocument();
  expect(screen.getByText('Yes, go ahead.')).toBeInTheDocument();
  expect(screen.getByText('💡 Notes')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Hide translation' }));
  expect(screen.queryByText('Yes, go ahead.')).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /Practice roleplay/ }));
  expect(screen.getByText('Turn 1 / 2')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Next →' }));
  expect(screen.getByText('Your turn to speak:')).toBeInTheDocument();
});

it('business roleplay runs in English', () => {
  withLang('en');
  render(<BusinessRoleplay topics={topics} total={1} />);
  expect(screen.getByText('Situation 1 / 1')).toBeInTheDocument();
  expect(screen.getByText('Say it in Japanese for this situation:')).toBeInTheDocument();
  expect(screen.getByText(/^phrase [abcd]$/)).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /Got it/ }));
  expect(screen.getByText('100 points')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Next →' }));
  expect(screen.getByTestId('business-roleplay-result')).toHaveTextContent('Average score: 100');
});

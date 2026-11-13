import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import type { BjtBundle, BjtItem, BjtSection } from '@nihongo/shared';

const mk = (id: string, section: BjtSection, set: string): BjtItem => ({
  id,
  section,
  set,
  ...(section === 'goi' ? {} : { material: { kind: 'text' as const, body: '本文です。' } }),
  questions: [{ id: `${id}-q1`, prompt: `問 ${id}`, choices: ['あ', 'い', 'う', 'え'], answer: 0, explain: 'vì thế' }],
});

const BUNDLE: BjtBundle = {
  weeks: [
    { week: 1, title: 'Tuần một', goal: 'Mục tiêu một', focus: ['goi'], tasks: ['việc a', 'việc b'] },
    { week: 2, title: 'Tuần hai', goal: 'Mục tiêu hai', focus: [], tasks: ['việc c', 'việc d'], mock: 'mock1' },
  ],
  guides: [{ section: 'goi', what: 'hỏi từ', how: ['đọc cả câu'], traps: ['từ gần nghĩa'] }],
  items: [mk('d1', 'goi', 'demo'), mk('a1', 'goi', 'w01'), mk('a2', 'hyogen', 'w01'), mk('m1', 'goi', 'mock1')],
  vocab: [{ id: 'v1', week: 1, tag: 'Email', ja: '査収', reading: 'さしゅう', vi: 'kiểm tra và nhận', example: { ja: 'ご査収ください。', vi: 'Xin kiểm tra và nhận cho.' } }],
};

vi.mock('../../content/loader', () => ({ useJson: () => ({ data: BUNDLE, loading: false }) }));
vi.mock('../../lib/tts', () => ({
  canSpeak: () => true,
  speak: vi.fn(),
  useStopSpeechOnUnmount: () => {},
  speakSequence: () => ({ cancel: () => {}, done: Promise.resolve() }),
}));

import { BjtPage } from './BjtPage';
import { useBjt } from '../../store/bjt';
import { vi as dict } from '../../i18n/vi';

beforeEach(() => useBjt.setState({ answers: {}, runs: {}, startDate: null }));
const tab = (name: string) => fireEvent.click(screen.getByRole('tab', { name }));

it('plan: shows each week with its own questions, and a week without content says so', () => {
  render(<BjtPage />, { wrapper: MemoryRouter });
  const w1 = within(screen.getByTestId('bjt-week-1'));
  expect(w1.getByText('Tuần một')).toBeInTheDocument();
  expect(w1.getByRole('button', { name: dict.bjt.practiceWeek(2) })).toBeInTheDocument();
  expect(w1.getByRole('button', { name: dict.bjt.weekVocab(1) })).toBeInTheDocument();
  const w2 = within(screen.getByTestId('bjt-week-2'));
  expect(w2.getByRole('button', { name: dict.bjt.takeMock })).toBeInTheDocument();
  expect(w2.queryByText(dict.bjt.noContent)).toBeNull(); // a mock week has no weekly questions by design

  fireEvent.click(w1.getByRole('button', { name: dict.bjt.practiceWeek(2) }));
  expect(screen.getByTestId('bjt-prompt')).toHaveTextContent('問 a1');
});

it('plan: marks the current week once the plan is started', () => {
  render(<BjtPage />, { wrapper: MemoryRouter });
  expect(screen.queryByText(dict.bjt.thisWeek)).toBeNull();
  fireEvent.click(screen.getByRole('button', { name: dict.bjt.startPlan }));
  expect(within(screen.getByTestId('bjt-week-1')).getByText(dict.bjt.thisWeek)).toBeInTheDocument();
});

it('plan: offers the questions last answered wrong, and only those', () => {
  useBjt.setState({ answers: { 'a1-q1': false, 'a2-q1': true } });
  render(<BjtPage />, { wrapper: MemoryRouter });
  expect(screen.getByTestId('bjt-wrong')).toHaveTextContent(dict.bjt.wrongPool(1));
  fireEvent.click(screen.getByRole('button', { name: dict.bjt.redoWrong }));
  expect(screen.getByTestId('bjt-prompt')).toHaveTextContent('問 a1');
  expect(screen.getByText(dict.bjt.questionOf(1, 1))).toBeInTheDocument();
});

it('sections: counts practice questions without the mock tests and opens the guide', () => {
  render(<BjtPage />, { wrapper: MemoryRouter });
  tab(dict.bjt.tabs.sections);
  const goi = within(screen.getByTestId('bjt-section-goi'));
  expect(screen.getByTestId('bjt-section-goi')).toHaveTextContent(`· ${dict.bjt.pool(2)} ·`); // d1 + a1, not m1
  fireEvent.click(goi.getByRole('button', { name: dict.bjt.showGuide }));
  expect(goi.getByText('từ gần nghĩa')).toBeInTheDocument();
  expect(within(screen.getByTestId('bjt-section-bamen')).getByRole('button', { name: dict.bjt.practiceN(0) })).toBeDisabled();
});

it('vocab: lists the words of the chosen week', () => {
  render(<BjtPage />, { wrapper: MemoryRouter });
  tab(dict.bjt.tabs.vocab);
  expect(screen.getByText('査収')).toBeInTheDocument();
  expect(screen.getByText('kiểm tra và nhận')).toBeInTheDocument();
  fireEvent.change(screen.getByRole('combobox'), { target: { value: '2' } });
  expect(screen.queryByText('査収')).toBeNull();
  expect(screen.getByText(dict.bjt.vocabEmpty)).toBeInTheDocument();
});

it('mock: a written test can be started, an unwritten one cannot, and the last score is shown', () => {
  useBjt.setState({ runs: { mock1: [{ at: '2026-11-13T00:00:00Z', correct: 60, total: 80, seconds: 100 }] } });
  render(<BjtPage />, { wrapper: MemoryRouter });
  tab(dict.bjt.tabs.mock);
  expect(within(screen.getByTestId('bjt-mock-mock2')).getByRole('button', { name: dict.bjt.startMock })).toBeDisabled();
  const m1 = within(screen.getByTestId('bjt-mock-mock1'));
  expect(m1.getByText(dict.bjt.lastScore(600, 'J1+'))).toBeInTheDocument();
  fireEvent.click(m1.getByRole('button', { name: dict.bjt.startMock }));
  expect(screen.getByTestId('bjt-clock')).toBeInTheDocument();
  expect(screen.getByTestId('bjt-prompt')).toHaveTextContent('問 m1');
});

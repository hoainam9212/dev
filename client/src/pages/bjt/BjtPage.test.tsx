import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
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
import { db } from '../../db/db';
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

describe('results from the learner\'s own books', () => {
  const book = {
    id: 'tb',
    title: 'Test book',
    pages: 2,
    audio: [],
    tests: [
      {
        id: 't1',
        title: 'Test 1',
        questions: [
          { no: 1, section: 'goi', n: 1, page: 1, answer: 1 },
          { no: 2, section: 'goi', n: 2, page: 1, answer: 2 },
          { no: 3, section: 'hyogen', n: 1, page: 2, answer: 3 },
        ],
      },
    ],
  };
  beforeEach(async () => {
    await db.books.put({ id: 'tb', title: 'Test book', book, bytes: 1, importedAt: '2026-11-13T00:00:00Z' });
  });
  afterEach(async () => {
    await db.books.clear();
  });

  it('sections: shows the book line apart from the app accuracy, only where books were answered', async () => {
    useBjt.setState({ answers: { 'a1-q1': true, 'book:tb:t1:1': true, 'book:tb:t1:2': false } });
    render(<BjtPage />, { wrapper: MemoryRouter });
    tab(dict.bjt.tabs.sections);
    const goi = screen.getByTestId('bjt-section-goi');
    expect(await within(goi).findByText(dict.bjt.bookAccuracy(1, 2))).toBeInTheDocument();
    expect(goi).toHaveTextContent(dict.bjt.accuracy(100)); // the app's own a1, not mixed with the book
    expect(screen.getByTestId('bjt-section-hyogen')).not.toHaveTextContent(dict.bjt.bookAccuracy(0, 0).split(':')[0]!);
  });

  it('plan: the books card counts wrong book answers and shows the latest timed book run', async () => {
    useBjt.setState({
      answers: { 'book:tb:t1:1': false, 'book:tb:t1:3': false },
      runs: {
        'book:tb:t1': [
          { at: '2026-11-01T00:00:00Z', correct: 1, total: 3, seconds: 60 },
          { at: '2026-11-12T00:00:00Z', correct: 3, total: 3, seconds: 60 },
        ],
      },
    });
    render(<BjtPage />, { wrapper: MemoryRouter });
    const card = within(screen.getByTestId('bjt-books'));
    expect(await card.findByText(dict.bjt.bookWrong(2))).toBeInTheDocument();
    expect(card.getByText(dict.bjt.bookLastMock(800, 'J1+'))).toBeInTheDocument();
    expect(card.getByRole('link', { name: dict.bjt.openBooks })).toHaveAttribute('href', '/bjt/sach');
    // no wrong answers from the app's own questions: the app's redo card stays hidden
    expect(screen.queryByTestId('bjt-wrong')).toBeNull();
  });

  it('plan: nothing extra on the books card before any book answer', async () => {
    render(<BjtPage />, { wrapper: MemoryRouter });
    await waitFor(() => expect(screen.getByTestId('bjt-books')).toBeInTheDocument());
    expect(screen.queryByText(dict.bjt.bookWrong(0))).toBeNull();
    expect(screen.getByTestId('bjt-books')).not.toHaveTextContent(dict.bjt.bookLastMock(0, 'J5').split(':')[0]!);
  });

  it('mock: lists timed book runs under the app mocks', async () => {
    useBjt.setState({ runs: { 'book:tb:t1': [{ at: '2026-11-12T10:00:00Z', correct: 3, total: 3, seconds: 60 }] } });
    render(<BjtPage />, { wrapper: MemoryRouter });
    tab(dict.bjt.tabs.mock);
    const list = await screen.findByTestId('bjt-book-runs');
    expect(within(list).getByText(dict.bjt.bookMocks)).toBeInTheDocument();
    const row = within(list).getByTestId('bjt-book-run-book:tb:t1');
    expect(row).toHaveTextContent('Test book');
    expect(row).toHaveTextContent('Test 1');
    expect(row).toHaveTextContent(dict.bjt.bookRunLine(800, 'J1+', dict.common.shortDate(new Date('2026-11-12T10:00:00Z'))));
    // after the app's own mocks
    expect(screen.getByTestId('bjt-mock-mock3').compareDocumentPosition(list) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('mock: no book section without timed book runs', async () => {
    render(<BjtPage />, { wrapper: MemoryRouter });
    tab(dict.bjt.tabs.mock);
    await waitFor(() => expect(screen.getByTestId('bjt-mock-mock1')).toBeInTheDocument());
    expect(screen.queryByTestId('bjt-book-runs')).toBeNull();
  });
});

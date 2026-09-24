import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { GRADERS, typingSim, type Lesson } from '@office-neko/shared';
import { SIMS } from '../sims/registry';
import type { SimProps } from '../sims/types';
import { db } from '../db/db';
import { LessonPlayer } from './LessonPlayer';
import { renderWithProfile, resetDb } from '../test/utils';

type FakeState = { clicked: boolean };
function FakeSim({ onState }: SimProps<FakeState>) {
  return <button data-help-id="player.check" onClick={() => onState({ clicked: true })}>Bấm tôi</button>;
}

const quizLesson: Lesson = {
  id: 't.quiz', trackId: 't', chapterId: 't.c', title: 'Thử', minutes: 1,
  steps: [
    { kind: 'explain', body: 'Xin chào **bạn**' },
    { kind: 'quiz', question: 'Chọn B', choices: ['A', 'B'], answer: 1, why: 'Vì B đúng' },
  ],
};

const practiceLesson: Lesson = {
  id: 't.practice', trackId: 't', chapterId: 't.c', title: 'Thực hành', minutes: 1,
  steps: [
    {
      kind: 'practice', sim: 'mouse', task: 'Hãy bấm nút', initial: { clicked: false },
      checks: [{ need: 'click' }], hints: ['Nút màu hồng đó', { helpId: 'player.check' }, ['Bấm nút “Bấm tôi”']], solution: [],
    },
  ],
};

function setupFakeSim() {
  SIMS.mouse = { kind: 'mouse', Component: FakeSim, reduce: (s: FakeState) => s };
  GRADERS.mouse = (s: FakeState) => ({ ok: s.clicked, messageVi: s.clicked ? 'Đã bấm nút' : 'Bạn chưa bấm nút' });
}

describe('LessonPlayer', () => {
  const saved = { sim: SIMS.mouse, grader: GRADERS.mouse };
  afterEach(() => {
    if (saved.sim) SIMS.mouse = saved.sim; else delete SIMS.mouse;
    if (saved.grader) GRADERS.mouse = saved.grader; else delete GRADERS.mouse;
  });

  it('runs explain + quiz and reports 3 stars', async () => {
    const onFinish = vi.fn();
    renderWithProfile(<LessonPlayer lesson={quizLesson} onFinish={onFinish} onExit={() => {}} />);
    expect(screen.getByText('bạn').tagName).toBe('STRONG');
    fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục →' }));
    fireEvent.click(screen.getByRole('button', { name: 'B' }));
    expect(screen.getByText('Vì B đúng')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục →' }));
    await waitFor(() => expect(onFinish).toHaveBeenCalledTimes(1));
    expect(onFinish.mock.calls[0]![0]).toMatchObject({ stars: 3, failures: 0, maxHint: 0 });
  });

  it('lowers stars after several wrong answers', async () => {
    const onFinish = vi.fn();
    renderWithProfile(<LessonPlayer lesson={quizLesson} onFinish={onFinish} onExit={() => {}} />);
    fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục →' }));
    fireEvent.click(screen.getByRole('button', { name: 'A' }));
    expect(screen.getByText(/Chưa đúng rồi/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /A/ }));
    fireEvent.click(screen.getByRole('button', { name: 'B' }));
    fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục →' }));
    await waitFor(() => expect(onFinish).toHaveBeenCalled());
    expect(onFinish.mock.calls[0]![0]).toMatchObject({ stars: 3, failures: 1 });
  });

  it('grades practice steps: manual check fails, auto-grade passes', async () => {
    setupFakeSim();
    const onFinish = vi.fn();
    renderWithProfile(<LessonPlayer lesson={practiceLesson} onFinish={onFinish} onExit={() => {}} />);
    fireEvent.click(screen.getByRole('button', { name: 'Kiểm tra' }));
    expect(screen.getByText(/Bạn chưa bấm nút/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Bấm tôi' }));
    expect(await screen.findByText(/Giỏi quá/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục →' }));
    await waitFor(() => expect(onFinish).toHaveBeenCalled());
    expect(onFinish.mock.calls[0]![0]).toMatchObject({ stars: 3, failures: 1 });
  });

  it('shows hints level by level and costs stars', async () => {
    setupFakeSim();
    const onFinish = vi.fn();
    renderWithProfile(<LessonPlayer lesson={practiceLesson} onFinish={onFinish} onExit={() => {}} />);
    fireEvent.click(screen.getByRole('button', { name: /Gợi ý \(0\/3\)/ }));
    expect(screen.getByText('Nút màu hồng đó')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Gợi ý \(1\/3\)/ }));
    expect(screen.getByText(/Mochi đã đánh dấu/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Gợi ý \(2\/3\)/ }));
    expect(screen.getByText('Bấm nút “Bấm tôi”')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Gợi ý \(3\/3\)/ })).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: 'Bấm tôi' }));
    fireEvent.click(await screen.findByRole('button', { name: 'Tiếp tục →' }));
    await waitFor(() => expect(onFinish).toHaveBeenCalled());
    expect(onFinish.mock.calls[0]![0]).toMatchObject({ stars: 1, maxHint: 3 });
  });

  it('stops auto-grading once the step is done', async () => {
    setupFakeSim();
    const spy = vi.fn((s: FakeState) => ({ ok: s.clicked, messageVi: 'x' }));
    GRADERS.mouse = spy;
    renderWithProfile(<LessonPlayer lesson={practiceLesson} onFinish={() => {}} onExit={() => {}} />);
    fireEvent.click(screen.getByRole('button', { name: 'Bấm tôi' }));
    await screen.findByText(/Giỏi quá/);
    const calls = spy.mock.calls.length;
    fireEvent.click(screen.getByRole('button', { name: 'Bấm tôi' }));
    await new Promise((r) => setTimeout(r, 400));
    expect(spy.mock.calls.length).toBe(calls);
  });

  it('goes back to a solved practice step exactly as it was, and edits there cost nothing', async () => {
    setupFakeSim();
    // Sim nhớ trạng thái được nạp vào: hiện chữ khác khi `initial.clicked` đã bật.
    SIMS.mouse = {
      kind: 'mouse',
      Component: ({ initial, onState }: SimProps<FakeState>) => (
        <button onClick={() => onState({ clicked: !initial.clicked })}>{initial.clicked ? 'Đã bấm sẵn' : 'Bấm tôi'}</button>
      ),
      reduce: (s: FakeState) => s,
    };
    const lesson: Lesson = { ...practiceLesson, steps: [...practiceLesson.steps, { kind: 'explain', body: 'Bước cuối' }] };
    const onFinish = vi.fn();
    renderWithProfile(<LessonPlayer lesson={lesson} onFinish={onFinish} onExit={() => {}} />);
    fireEvent.click(screen.getByRole('button', { name: 'Bấm tôi' }));
    fireEvent.click(await screen.findByRole('button', { name: 'Tiếp tục →' }));
    fireEvent.click(screen.getByRole('button', { name: '← Quay lại' }));
    expect(screen.getByRole('button', { name: 'Đã bấm sẵn' })).toBeInTheDocument();
    expect(screen.getByText(/Giỏi quá/)).toBeInTheDocument();
    expect(screen.getByText(/Đã bấm nút/)).toBeInTheDocument();
    expect(screen.getByText(/đang xem lại/)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Kiểm tra' })).toBeNull();
    // Làm hỏng bài khi xem lại: vẫn qua được, không tính lỗi.
    fireEvent.click(screen.getByRole('button', { name: 'Đã bấm sẵn' }));
    await new Promise((r) => setTimeout(r, 400));
    fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục →' }));
    fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục →' }));
    await waitFor(() => expect(onFinish).toHaveBeenCalled());
    expect(onFinish.mock.calls[0]![0]).toMatchObject({ stars: 3, failures: 0 });
  });

  it('keeps the quiz answer when coming back to it', () => {
    renderWithProfile(<LessonPlayer lesson={{ ...quizLesson, steps: [...quizLesson.steps, { kind: 'explain', body: 'Hết' }] }} onFinish={() => {}} onExit={() => {}} />);
    expect(screen.queryByRole('button', { name: '← Quay lại' })).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục →' }));
    fireEvent.click(screen.getByRole('button', { name: 'A' }));
    fireEvent.click(screen.getByRole('button', { name: /A/ }));
    fireEvent.click(screen.getByRole('button', { name: 'B' }));
    fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục →' }));
    fireEvent.click(screen.getByRole('button', { name: '← Quay lại' }));
    expect(screen.getByText('Vì B đúng')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /❌ A/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /✅ B/ })).toBeInTheDocument();
  });

  it('shows a not-ready card when the grader is missing', () => {
    setupFakeSim();
    delete GRADERS.mouse;
    renderWithProfile(<LessonPlayer lesson={practiceLesson} onFinish={() => {}} onExit={() => {}} />);
    expect(screen.getByText(/chưa sẵn sàng/)).toBeInTheDocument();
  });

  it('calls onExit from the close button', () => {
    const onExit = vi.fn();
    renderWithProfile(<LessonPlayer lesson={quizLesson} onFinish={() => {}} onExit={onExit} />);
    fireEvent.click(screen.getByRole('button', { name: 'Thoát bài' }));
    expect(onExit).toHaveBeenCalled();
  });
});

describe('LessonPlayer keyboard practice', () => {
  beforeEach(resetDb);

  const keyboardLesson: Lesson = {
    id: 't.keyboard', trackId: 't', chapterId: 't.c', title: 'Gõ phím', minutes: 1,
    steps: [
      {
        kind: 'practice', sim: 'keyboard', task: 'Gõ chữ "ok"',
        initial: typingSim.typingInitial({ target: 'ok' }),
        checks: [{ kind: 'typing', completeText: true }],
        hints: ['Gõ đúng chữ', { helpId: 'keyboard.area' }, ['Gõ o rồi k']],
        solution: [],
      },
    ],
  };

  it('records exactly one lesson typing run when a keyboard practice step finishes', async () => {
    renderWithProfile(<LessonPlayer lesson={keyboardLesson} onFinish={() => {}} onExit={() => {}} />);
    const box = screen.getByRole('textbox', { name: 'Vùng gõ phím' });
    fireEvent.keyDown(box, { key: 'o' });
    fireEvent.keyDown(box, { key: 'k' });
    await waitFor(async () => expect(await db.typingRuns.count()).toBe(1));
    const rows = await db.typingRuns.toArray();
    expect(rows[0]!.mode).toBe('lesson');
  });

  it('does not record a second typing run when reviewing a finished typing step', async () => {
    const lesson: Lesson = { ...keyboardLesson, steps: [...keyboardLesson.steps, { kind: 'explain', body: 'Hết' }] };
    renderWithProfile(<LessonPlayer lesson={lesson} onFinish={() => {}} onExit={() => {}} />);
    const box = screen.getByRole('textbox', { name: 'Vùng gõ phím' });
    fireEvent.keyDown(box, { key: 'o' });
    fireEvent.keyDown(box, { key: 'k' });
    await waitFor(async () => expect(await db.typingRuns.count()).toBe(1));
    fireEvent.click(await screen.findByRole('button', { name: 'Tiếp tục →' }));
    fireEvent.click(screen.getByRole('button', { name: '← Quay lại' }));
    await new Promise((r) => setTimeout(r, 400));
    expect(await db.typingRuns.count()).toBe(1);
  });
});

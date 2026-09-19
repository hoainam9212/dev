import { describe, it, expect, vi, afterEach } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { GRADERS, type Lesson } from '@office-neko/shared';
import { SIMS } from '../sims/registry';
import type { SimProps } from '../sims/types';
import { LessonPlayer } from './LessonPlayer';
import { renderWithProfile } from '../test/utils';

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
  afterEach(() => {
    delete SIMS.mouse;
    delete GRADERS.mouse;
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

  it('calls onExit from the close button', () => {
    const onExit = vi.fn();
    renderWithProfile(<LessonPlayer lesson={quizLesson} onFinish={() => {}} onExit={onExit} />);
    fireEvent.click(screen.getByRole('button', { name: 'Thoát bài' }));
    expect(onExit).toHaveBeenCalled();
  });
});

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { screen, fireEvent, waitFor, act } from '@testing-library/react';
import { db } from '../db/db';
import { createProfile } from '../db/profile';
import { LessonPage } from './LessonPage';
import { makeProfile, renderWithProfile, resetDb } from '../test/utils';

vi.mock('../progress/record', async (importOriginal) => {
  const mod = await importOriginal<typeof import('../progress/record')>();
  return { ...mod, recordLessonResult: vi.fn(mod.recordLessonResult) };
});

const finishWelcomeLesson = async () => {
  fireEvent.click(await screen.findByRole('button', { name: 'Tiếp tục →' }));
  for (let i = 0; i < 2; i++) fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục →' }));
  fireEvent.click(screen.getByRole('button', { name: 'Bấm vào từ có gạch chân chấm hoặc mở Từ điển' }));
  fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục →' }));
  fireEvent.click(screen.getByRole('button', { name: 'Vẫn học tiếp được, chỉ bớt một chút sao' }));
  fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục →' }));
  fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục →' }));
};

describe('LessonPage', () => {
  beforeEach(async () => {
    await resetDb();
    await createProfile({ name: 'An', os: 'win', dailyGoalMin: 10, avatar: 'cam' });
  });

  it('plays the welcome lesson, saves 3 stars and shows +30 XP', async () => {
    renderWithProfile(<LessonPage id="basics.welcome" />, { route: '/lesson/basics.welcome' });
    await finishWelcomeLesson();
    expect(await screen.findByText('+30 XP')).toBeInTheDocument();
    expect(screen.getByLabelText('3 trên 3 sao')).toBeInTheDocument();
    expect((await db.lessonProgress.get(['p1', 'basics.welcome']))?.stars).toBe(3);
    expect((await db.profiles.get('p1'))?.xp).toBe(30);
  });

  it('shows a friendly message for unknown lessons', () => {
    renderWithProfile(<LessonPage id="khong-co" />);
    expect(screen.getByText(/Không tìm thấy bài học/)).toBeInTheDocument();
  });

  it('shows a saving placeholder then a save-error note instead of crashing when recording fails', async () => {
    const record = await import('../progress/record');
    // Hold recordLessonResult pending (instead of an immediately-rejected promise) so the
    // "saving" state is observed deterministically, then reject it ourselves inside act()
    // so the resulting setDone() update is provably wrapped — no race, no act() warning.
    let rejectSave!: (err: unknown) => void;
    const pending = new Promise<{ xpGained: number; prevStars: number }>((_, reject) => {
      rejectSave = reject;
    });
    vi.mocked(record.recordLessonResult).mockReturnValueOnce(pending);
    renderWithProfile(<LessonPage id="basics.welcome" />, { route: '/lesson/basics.welcome' });
    await finishWelcomeLesson();
    expect(screen.getByText('Đang lưu kết quả…')).toBeInTheDocument();
    await act(async () => {
      rejectSave(new Error('boom'));
      await pending.catch(() => {});
    });
    expect(await screen.findByRole('alert')).toHaveTextContent('Chưa lưu được kết quả');
    expect(screen.getByText('Bạn đã có số sao này rồi, ôn lại như vậy rất tốt!')).toBeInTheDocument();
    await waitFor(async () => expect((await db.lessonProgress.get(['p1', 'basics.welcome']))?.stars).toBeUndefined());
  });

  it('refuses a lesson for the other operating system', async () => {
    const { LESSONS } = await import('../content');
    LESSONS['t.macOnly'] = { id: 't.macOnly', trackId: 'basics', chapterId: 'basics.start', title: 'Chỉ Mac', minutes: 1, os: 'mac', steps: [{ kind: 'explain', body: 'x' }] };
    renderWithProfile(<LessonPage id="t.macOnly" />);
    expect(await screen.findByText(/dành cho máy Mac/)).toBeInTheDocument();
    delete LESSONS['t.macOnly'];
  });

  it('refuses a locked lesson', async () => {
    const { LESSONS, TRACKS } = await import('../content');
    LESSONS['t.second'] = { id: 't.second', trackId: 'basics', chapterId: 'basics.start', title: 'Bài hai', minutes: 1, steps: [{ kind: 'explain', body: 'x' }] };
    TRACKS[0]!.chapters[0]!.lessonIds.push('t.second');
    renderWithProfile(<LessonPage id="t.second" />);
    expect(await screen.findByText(/chưa mở khoá/)).toBeInTheDocument();
    TRACKS[0]!.chapters[0]!.lessonIds.pop();
    delete LESSONS['t.second'];
  });

  it('opens a locked lesson when the unlock-all mode is on', async () => {
    const { LESSONS, TRACKS } = await import('../content');
    LESSONS['t.second'] = { id: 't.second', trackId: 'basics', chapterId: 'basics.start', title: 'Bài hai', minutes: 1, steps: [{ kind: 'explain', body: 'Nội dung bài hai' }] };
    TRACKS[0]!.chapters[0]!.lessonIds.push('t.second');
    renderWithProfile(<LessonPage id="t.second" />, { profile: makeProfile({ unlockAll: true }) });
    expect(await screen.findByText('Nội dung bài hai')).toBeInTheDocument();
    TRACKS[0]!.chapters[0]!.lessonIds.pop();
    delete LESSONS['t.second'];
  });
});

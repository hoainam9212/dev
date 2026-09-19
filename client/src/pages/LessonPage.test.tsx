import { describe, it, expect, beforeEach, vi } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { db } from '../db/db';
import { createProfile } from '../db/profile';
import { LessonPage } from './LessonPage';
import { renderWithProfile, resetDb } from '../test/utils';

vi.mock('../progress/record', async (importOriginal) => {
  const mod = await importOriginal<typeof import('../progress/record')>();
  return { ...mod, recordLessonResult: vi.fn(mod.recordLessonResult) };
});

const finishWelcomeLesson = () => {
  for (let i = 0; i < 3; i++) fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục →' }));
  fireEvent.click(screen.getByRole('button', { name: 'Bấm vào từ có gạch chân chấm hoặc mở Từ điển' }));
  fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục →' }));
  fireEvent.click(screen.getByRole('button', { name: 'Vẫn học tiếp được, chỉ bớt một chút sao' }));
  fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục →' }));
  fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục →' }));
};

describe('LessonPage', () => {
  beforeEach(async () => {
    await resetDb();
    await createProfile({ name: 'An', os: 'win', dailyGoalMin: 10 });
  });

  it('plays the welcome lesson, saves 3 stars and shows +30 XP', async () => {
    renderWithProfile(<LessonPage id="basics.welcome" />, { route: '/lesson/basics.welcome' });
    finishWelcomeLesson();
    expect(await screen.findByText('+30 XP')).toBeInTheDocument();
    expect(screen.getByLabelText('3 trên 3 sao')).toBeInTheDocument();
    expect((await db.progress.get('basics.welcome'))?.stars).toBe(3);
    expect((await db.profile.get('me'))?.xp).toBe(30);
  });

  it('shows a friendly message for unknown lessons', () => {
    renderWithProfile(<LessonPage id="khong-co" />);
    expect(screen.getByText(/Không tìm thấy bài học/)).toBeInTheDocument();
  });

  it('shows a saving placeholder then a save-error note instead of crashing when recording fails', async () => {
    const record = await import('../progress/record');
    vi.mocked(record.recordLessonResult).mockRejectedValueOnce(new Error('boom'));
    renderWithProfile(<LessonPage id="basics.welcome" />, { route: '/lesson/basics.welcome' });
    finishWelcomeLesson();
    expect(screen.getByText('Đang lưu kết quả…')).toBeInTheDocument();
    expect(await screen.findByRole('alert')).toHaveTextContent('Chưa lưu được kết quả');
    expect(screen.getByText('Bạn đã có số sao này rồi, ôn lại như vậy rất tốt!')).toBeInTheDocument();
    await waitFor(async () => expect((await db.progress.get('basics.welcome'))?.stars).toBeUndefined());
  });
});

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import type { AccessoryId, Lesson } from '@office-neko/shared';
import { FinishView } from './FinishView';
import { ProfileContext } from '../db/profile';
import { makeProfile } from '../test/utils';
import type { LessonResult } from './LessonPlayer';

const lesson: Lesson = { id: 'x', trackId: 'a', chapterId: 'a.c', title: 'Bài thử', minutes: 2, steps: [] };
const result: LessonResult = { stars: 3, maxHint: 0, failures: 0, timeMs: 60_000 };

function renderFinish(newBadges?: string[], newAccessories?: AccessoryId[]) {
  return render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <FinishView lesson={lesson} result={result} xpGained={30} nextId={null} newBadges={newBadges} newAccessories={newAccessories} />
    </MemoryRouter>,
  );
}

describe('FinishView accessories', () => {
  it('tells about an accessory unlocked by this level-up', () => {
    renderFinish([], ['glasses']);
    expect(screen.getByText('Mochi có phụ kiện mới: Kính tròn! Vào Cài đặt để đeo thử.')).toBeInTheDocument();
  });
  it('says nothing without a level-up', () => {
    renderFinish([], []);
    expect(screen.queryByText(/phụ kiện mới/)).toBeNull();
  });
});

describe('FinishView badges', () => {
  it('announces a new badge', () => {
    renderFinish(['storyteller']);
    expect(screen.getByText('Huy hiệu mới!')).toBeInTheDocument();
    expect(screen.getByText('Người kể chuyện')).toBeInTheDocument();
  });

  it('shows nothing when no badge is new', () => {
    renderFinish([]);
    expect(screen.queryByText('Huy hiệu mới!')).toBeNull();
  });
});

describe('FinishView – chế độ dễ dùng', () => {
  const renderEasy = (stars: 1 | 2 | 3, newBadges?: string[], newAccessories?: AccessoryId[]) =>
    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ProfileContext.Provider value={makeProfile({ easyMode: true })}>
          <FinishView lesson={lesson} result={{ ...result, stars, maxHint: 2, failures: 1 }} xpGained={30} nextId={null}
            newBadges={newBadges} newAccessories={newAccessories} />
        </ProfileContext.Provider>
      </MemoryRouter>,
    );

  it('3 sao: lời khen, không có XP và không có dòng gợi ý đã dùng', () => {
    renderEasy(3);
    expect(screen.getByText('Tuyệt vời! Bạn làm rất giỏi.')).toBeInTheDocument();
    expect(screen.queryByText(/XP/)).toBeNull();
    expect(screen.queryByText(/Gợi ý đã dùng/)).toBeNull();
    expect(screen.getByLabelText('3 trên 3 sao')).toBeInTheDocument();
  });

  it('2 sao và 1 sao có lời khen riêng', () => {
    const { unmount } = renderEasy(2);
    expect(screen.getByText('Giỏi lắm! Lần sau thử ít gợi ý hơn nhé.')).toBeInTheDocument();
    unmount();
    renderEasy(1);
    expect(screen.getByText('Bạn đã làm xong rồi! Học lại lúc nào cũng được.')).toBeInTheDocument();
  });

  it('không báo huy hiệu mới hay phụ kiện mới', () => {
    renderEasy(3, ['storyteller'], ['glasses']);
    expect(screen.queryByText('Huy hiệu mới!')).toBeNull();
    expect(screen.queryByText(/phụ kiện/)).toBeNull();
  });

  it('hồ sơ thường vẫn hiện +XP và dòng gợi ý', () => {
    renderFinish();
    expect(screen.getByText('+30 XP')).toBeInTheDocument();
    expect(screen.getByText(/Gợi ý đã dùng/)).toBeInTheDocument();
  });
});

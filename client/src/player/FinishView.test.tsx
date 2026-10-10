import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import type { Lesson } from '@office-neko/shared';
import { FinishView } from './FinishView';
import type { LessonResult } from './LessonPlayer';

const lesson: Lesson = { id: 'x', trackId: 'a', chapterId: 'a.c', title: 'Bài thử', minutes: 2, steps: [] };
const result: LessonResult = { stars: 3, maxHint: 0, failures: 0, timeMs: 60_000 };

function renderFinish(newBadges?: string[]) {
  return render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <FinishView lesson={lesson} result={result} xpGained={30} nextId={null} newBadges={newBadges} />
    </MemoryRouter>,
  );
}

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

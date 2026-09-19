import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { unlockState, type Lesson, type Track } from '@office-neko/shared';
import { TrackMap } from './TrackMap';

const L = (id: string, title: string): Lesson => ({ id, trackId: 'a', chapterId: 'a.c', title, minutes: 2, steps: [] });
const lessons = { a1: L('a1', 'Bài một'), a2: L('a2', 'Bài hai') };
const tracks: Track[] = [
  { id: 'a', order: 0, title: 'Lộ trình A', emoji: '🅰️', blurb: 'Mô tả A', color: '#FFB38A', chapters: [{ id: 'a.c', title: 'C', lessonIds: ['a1', 'a2'] }] },
  { id: 'b', order: 1, title: 'Lộ trình B', emoji: '🅱️', blurb: 'Mô tả B', color: '#A0D8FF', chapters: [] },
];

function renderMap(completed: string[], stars: Record<string, number>) {
  const unlock = unlockState(tracks, lessons, 'win', new Set(completed));
  return render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <TrackMap tracks={tracks} lessons={lessons} os="win" unlock={unlock} stars={stars} currentId="a2" />
    </MemoryRouter>,
  );
}

describe('TrackMap', () => {
  it('locks lessons until the previous one is done', () => {
    renderMap([], {});
    expect(screen.getByRole('link', { name: 'Bài một' })).toHaveAttribute('href', '/lesson/a1');
    expect(screen.getByLabelText('Bài hai (đang khoá)')).toBeInTheDocument();
  });

  it('shows stars and unlocks the next lesson', () => {
    renderMap(['a1'], { a1: 2 });
    expect(screen.getByRole('link', { name: 'Bài một, 2 sao' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Bài hai' })).toBeInTheDocument();
  });

  it('marks tracks without lessons as in preparation', () => {
    renderMap([], {});
    const b = screen.getByRole('region', { name: 'Lộ trình B' });
    expect(b).toHaveTextContent('Mochi đang soạn bài');
  });
});

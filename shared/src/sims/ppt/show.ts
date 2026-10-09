import type { PptState } from './state';

export type ShowAction =
  | { type: 'startShow'; from: 'start' | 'current' }
  | { type: 'showNext' }
  | { type: 'showPrev' }
  | { type: 'endShow' };

/** Chiếu tới slide `at`: nếu bắt đầu từ slide 1 và đã tới slide cuối thì ghi là đã trình chiếu trọn bài. */
function at(s: PptState, at: number, from: number): PptState {
  const presented = s.presented || (from === 0 && at >= s.slides.length - 1);
  return { ...s, show: { at, from }, presented };
}

/**
 * Trình chiếu. `show.at === slides.length` là màn đen "Hết bài trình chiếu" như PowerPoint
 * thật; bấm tiếp ở đó thì thoát. Thoát thì mở slide đang chiếu để người học soạn tiếp đúng chỗ.
 */
export function reduceShow(s: PptState, a: ShowAction): PptState {
  if (a.type === 'startShow') {
    if (s.show) return s;
    const from = a.from === 'start' ? 0 : s.active;
    return at({ ...s, sel: null, editing: null, editBackup: null, dialog: null }, from, from);
  }
  if (!s.show) return s;
  switch (a.type) {
    case 'showNext':
      return s.show.at >= s.slides.length ? end(s) : at(s, s.show.at + 1, s.show.from);
    case 'showPrev':
      return at(s, Math.max(0, s.show.at - 1), s.show.from);
    case 'endShow':
      return end(s);
  }
}

function end(s: PptState): PptState {
  const show = s.show;
  if (!show) return s;
  return { ...s, show: null, active: Math.min(show.at, s.slides.length - 1) };
}

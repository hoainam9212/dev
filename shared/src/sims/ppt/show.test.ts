import { describe, expect, it } from 'vitest';
import { pptInitial, reducePpt, slideOf, type PptAction, type PptState } from './state';

const run = (s: PptState, ...a: PptAction[]): PptState => a.reduce(reducePpt, s);
/** Bài 3 slide, đang mở slide 3. */
const three = (): PptState => run(pptInitial(), { type: 'addSlide' }, { type: 'addSlide' });

describe('trình chiếu', () => {
  it('startShow start chiếu từ slide 1, bỏ chọn và thoát sửa chữ', () => {
    const s0 = three();
    const id = slideOf(s0).els[0]!.id;
    const s = run(s0, { type: 'startEditEl', id }, { type: 'startShow', from: 'start' });
    expect(s.show).toEqual({ at: 0, from: 0 });
    expect(s.sel).toBeNull();
    expect(s.editing).toBeNull();
  });

  it('startShow current chiếu từ slide đang mở', () => {
    expect(run(three(), { type: 'startShow', from: 'current' }).show).toEqual({ at: 2, from: 2 });
  });

  it('chiếu từ đầu tới slide cuối thì presented = true', () => {
    const s = run(three(), { type: 'startShow', from: 'start' }, { type: 'showNext' });
    expect(s.presented).toBe(false);
    expect(run(s, { type: 'showNext' }).presented).toBe(true);
  });

  it('chiếu từ slide 2 tới cuối thì presented vẫn false', () => {
    const s = run(three(), { type: 'gotoSlide', index: 1 }, { type: 'startShow', from: 'current' }, { type: 'showNext' });
    expect(s.show?.at).toBe(2);
    expect(s.presented).toBe(false);
  });

  it('bài 1 slide: bắt đầu chiếu là đã xem hết', () => {
    expect(run(pptInitial(), { type: 'startShow', from: 'start' }).presented).toBe(true);
  });

  it('showNext ở slide cuối sang màn Hết bài, thêm lần nữa thì kết thúc', () => {
    const s = run(three(), { type: 'startShow', from: 'current' }, { type: 'showNext' });
    expect(s.show?.at).toBe(3);
    const end = run(s, { type: 'showNext' });
    expect(end.show).toBeNull();
    expect(end.active).toBe(2);
  });

  it('showPrev ở slide đầu đứng yên', () => {
    expect(run(three(), { type: 'startShow', from: 'start' }, { type: 'showPrev' }).show?.at).toBe(0);
  });

  it('endShow giữa chừng mở đúng slide đang chiếu', () => {
    const s = run(three(), { type: 'startShow', from: 'start' }, { type: 'showNext' }, { type: 'endShow' });
    expect(s.show).toBeNull();
    expect(s.active).toBe(1);
  });

  it('endShow từ màn Hết bài mở slide cuối', () => {
    const s = run(three(), { type: 'startShow', from: 'current' }, { type: 'showNext' }, { type: 'endShow' });
    expect(s.active).toBe(2);
  });

  it('showNext/showPrev/endShow khi không chiếu là no-op', () => {
    const s = three();
    expect(run(s, { type: 'showNext' })).toBe(s);
    expect(run(s, { type: 'showPrev' })).toBe(s);
    expect(run(s, { type: 'endShow' })).toBe(s);
  });

  it.each<PptAction>([
    { type: 'addSlide' },
    { type: 'setText', text: 'x' },
    { type: 'moveEl', dx: 8, dy: 8 },
    { type: 'setTheme', theme: 'bien' },
    { type: 'startShow', from: 'start' },
  ])('đang chiếu thì bỏ qua thao tác soạn thảo: %o', (a) => {
    const s = run(three(), { type: 'startShow', from: 'start' });
    expect(reducePpt(s, a)).toBe(s);
  });
});

import { describe, expect, it } from 'vitest';
import { pptInitial, reducePpt, slideOf, type PptAction, type PptState } from './state';

/** id của chỗ dành sẵn tiêu đề trên slide đầu — không hardcode, vì `nextId` chừa chỗ cho id slide. */
const titleId = (s: PptState) => slideOf(s).els.find((e) => e.role === 'title')!.id;
const title = (s: PptState) => slideOf(s).els.find((e) => e.role === 'title');

/** Chuỗi action dựng từ state ban đầu; `make` nhận id tiêu đề để khỏi đoán. */
function run(make: (id: string) => PptAction[]): PptState {
  const s0 = pptInitial();
  return make(titleId(s0)).reduce(reducePpt, s0);
}

describe('reducePpt – chữ', () => {
  it('startEditEl chọn luôn đối tượng đó và bật chế độ sửa', () => {
    const s = run((id) => [{ type: 'startEditEl', id }]);
    expect(s.editing).toBe(titleId(s));
    expect(s.sel).toBe(titleId(s));
  });

  it('setText ghi thẳng vào đối tượng đang sửa', () => {
    const s = run((id) => [{ type: 'startEditEl', id }, { type: 'setText', text: 'Xin chào, tôi là Mochi' }]);
    expect(title(s)?.text).toBe('Xin chào, tôi là Mochi');
  });

  it('setText khi không sửa gì là phép không', () => {
    const s0 = pptInitial();
    expect(reducePpt(s0, { type: 'setText', text: 'rơi vào hư không' })).toBe(s0);
  });

  it('commitEdit tắt chế độ sửa nhưng giữ chữ và giữ đối tượng đang chọn', () => {
    const s = run((id) => [{ type: 'startEditEl', id }, { type: 'setText', text: 'Mochi' }, { type: 'commitEdit' }]);
    expect(s.editing).toBeNull();
    expect(s.sel).toBe(titleId(s));
    expect(title(s)?.text).toBe('Mochi');
  });

  it('cancelEdit trả chữ về như trước khi bắt đầu sửa', () => {
    const s = run((id) => [
      { type: 'startEditEl', id },
      { type: 'setText', text: 'Bản tốt' },
      { type: 'commitEdit' },
      { type: 'startEditEl', id },
      { type: 'setText', text: 'Gõ nhầm' },
      { type: 'cancelEdit' },
    ]);
    expect(title(s)?.text).toBe('Bản tốt');
    expect(s.editing).toBeNull();
  });

  it('gõ từng chữ không làm đầy lịch sử hoàn tác', () => {
    const s = run((id) => [
      { type: 'startEditEl', id },
      { type: 'setText', text: 'M' },
      { type: 'setText', text: 'Mo' },
      { type: 'setText', text: 'Moc' },
    ]);
    expect(s.past.length).toBeLessThanOrEqual(1);
  });

  it('hoàn tác sau khi sửa chữ trả về nguyên văn trước lúc sửa, không lùi từng ký tự', () => {
    const s = run((id) => [
      { type: 'startEditEl', id },
      { type: 'setText', text: 'Một' },
      { type: 'setText', text: 'Một hai' },
      { type: 'commitEdit' },
      { type: 'undo' },
    ]);
    expect(title(s)?.text).toBe('');
  });
});

describe('reducePpt – định dạng', () => {
  it('setFmt gộp vào định dạng cũ, không xoá trường khác', () => {
    const s = run((id) => [{ type: 'selectEl', id }, { type: 'setFmt', fmt: { color: '#D2691E' } }]);
    expect(title(s)?.fmt).toMatchObject({ size: 40, bold: true, color: '#D2691E' });
  });

  it('setFmt khi không chọn gì là phép không', () => {
    const s0 = pptInitial();
    expect(reducePpt(s0, { type: 'setFmt', fmt: { bold: true } })).toBe(s0);
  });
});

describe('reducePpt – hoàn tác, Lưu, In', () => {
  it('undo trả lại slide trước một bước', () => {
    const s = run(() => [{ type: 'addSlide' }, { type: 'undo' }]);
    expect(s.slides).toHaveLength(1);
  });

  it('undo khi chưa làm gì là phép không', () => {
    const s0 = pptInitial();
    expect(reducePpt(s0, { type: 'undo' })).toBe(s0);
  });

  it('undo bỏ chọn, vì đối tượng đang chọn có thể vừa bị hoàn tác mất', () => {
    const s = run(() => [{ type: 'addText', x: 100, y: 300, w: 320, h: 80 }, { type: 'undo' }]);
    expect(s.sel).toBeNull();
  });

  it('undo lùi cả slide đang mở về trong khoảng hợp lệ', () => {
    const s = run(() => [{ type: 'addSlide' }, { type: 'undo' }]);
    expect(s.active).toBe(0);
  });

  it('save ghi lại tên và thời điểm do action đưa vào, đóng hộp thoại', () => {
    const s = run(() => [
      { type: 'openDialog', dialog: 'save' },
      { type: 'save', name: 'Gioi thieu.pptx', at: 1700000000000 },
    ]);
    expect(s.saved).toEqual({ name: 'Gioi thieu.pptx', at: 1700000000000 });
    expect(s.dialog).toBeNull();
  });

  it('print chỉ ghi lại là đã bấm', () => {
    expect(run(() => [{ type: 'print' }]).printed).toBe(true);
  });
});

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, within, cleanup } from '@testing-library/react';
import { desktopSim, vfs } from '@office-neko/shared';
import { DesktopSim } from './DesktopSim';

const tree = [
  { name: 'Tài liệu', children: [{ name: 'hoa-don.pdf' }] },
  { name: 'Ảnh', children: [{ name: 'bien.jpg' }] },
  { name: 'ghi-chu.txt' },
];

function setup(os: 'win' | 'mac' = 'win') {
  const onState = vi.fn();
  render(<DesktopSim initial={desktopSim.desktopInitial(tree, os)} onState={onState} os={os} spotlight={null} />);
  const last = () => onState.mock.calls.at(-1)![0] as desktopSim.DesktopState;
  const item = (name: string) => within(screen.getByTestId('file-area')).getByRole('option', { name: new RegExp(name) });
  const area = () => screen.getByTestId('desktop-sim');
  return { last, item, area };
}

describe('DesktopSim', () => {
  it('opens a folder by double-click and shows it in the address bar', () => {
    const { last, item } = setup();
    fireEvent.doubleClick(item('Ảnh'));
    expect(vfs.pathOf(last().fs, last().cwd)).toBe('/Ảnh');
    expect(screen.getByLabelText('Thanh địa chỉ')).toHaveTextContent('Máy tính này › Ảnh');
  });

  it('creates and names a new folder from the toolbar', () => {
    const { last } = setup();
    fireEvent.click(screen.getByRole('button', { name: /Thư mục mới/ }));
    const input = screen.getByLabelText('Tên mới') as HTMLInputElement;
    expect(input.value).toBe('Thư mục mới');
    fireEvent.change(input, { target: { value: 'Học tập' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(vfs.findByPath(last().fs, '/Học tập')?.type).toBe('folder');
  });

  it('deletes with the Delete key on Windows and restores from the trash', () => {
    const { last, item, area } = setup('win');
    fireEvent.click(item('ghi-chu.txt'));
    fireEvent.keyDown(area(), { key: 'Delete' });
    expect(vfs.findByPath(last().fs, '/ghi-chu.txt')).toBeUndefined();
    fireEvent.click(screen.getAllByRole('button', { name: /Thùng rác/ })[0]!);
    fireEvent.click(item('ghi-chu.txt'));
    fireEvent.click(screen.getByRole('button', { name: /Khôi phục/ }));
    expect(vfs.findByPath(last().fs, '/ghi-chu.txt')).toBeDefined();
  });

  it('uses Mac shortcuts: ⌘⌫ deletes, Enter renames', () => {
    const { last, item, area } = setup('mac');
    expect(screen.getByText('Finder')).toBeInTheDocument();
    fireEvent.click(item('ghi-chu.txt'));
    fireEvent.keyDown(area(), { key: 'Enter' });
    expect(screen.getByLabelText('Tên mới')).toBeInTheDocument();
    fireEvent.keyDown(screen.getByLabelText('Tên mới'), { key: 'Escape' });
    fireEvent.keyDown(area(), { key: 'Backspace', metaKey: true });
    expect(vfs.findByPath(last().fs, '/ghi-chu.txt')).toBeUndefined();
  });

  it('cuts and pastes with keyboard shortcuts', () => {
    const { last, item, area } = setup('win');
    fireEvent.click(item('ghi-chu.txt'));
    fireEvent.keyDown(area(), { key: 'x', ctrlKey: true });
    fireEvent.doubleClick(item('Tài liệu'));
    fireEvent.keyDown(area(), { key: 'v', ctrlKey: true });
    expect(vfs.findByPath(last().fs, '/Tài liệu/ghi-chu.txt')).toBeDefined();
    fireEvent.keyDown(area(), { key: 'z', ctrlKey: true });
    expect(vfs.findByPath(last().fs, '/ghi-chu.txt')).toBeDefined();
  });

  it('renames from the context menu and reports duplicate names', () => {
    const { item } = setup('win');
    fireEvent.contextMenu(item('ghi-chu.txt'));
    fireEvent.click(screen.getByRole('menuitem', { name: 'Đổi tên' }));
    const input = screen.getByLabelText('Tên mới');
    fireEvent.change(input, { target: { value: 'Ảnh' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(screen.getByRole('alert')).toHaveTextContent(/cùng tên/);
    fireEvent.click(screen.getByRole('button', { name: 'Đã hiểu' }));
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('moves a file by dragging it onto a folder', () => {
    const { last, item } = setup('win');
    fireEvent.dragStart(item('ghi-chu.txt'));
    fireEvent.drop(item('Ảnh'));
    expect(vfs.findByPath(last().fs, '/Ảnh/ghi-chu.txt')).toBeDefined();
  });

  it('exposes data-path for the spotlight', () => {
    const { item } = setup('win');
    expect(item('Ảnh')).toHaveAttribute('data-path', '/Ảnh');
  });

  it('focuses itself on mount so keyboard shortcuts work without clicking first', () => {
    setup('win');
    expect(document.activeElement).toBe(screen.getByTestId('desktop-sim'));
  });

  it('gives the taskbar/Dock trash its own help id, separate from the sidebar entry', () => {
    setup('win');
    expect(document.querySelectorAll('[data-help-id="desktop.trash"]')).toHaveLength(1);
    expect(screen.getByRole('button', { name: 'Thùng rác' })).toHaveAttribute('data-help-id', 'desktop.trash');
    expect(screen.getByRole('button', { name: /🗑️ Thùng rác/ })).toHaveAttribute('data-help-id', 'desktop.trashSidebar');
  });

  it('opens the context menu at the click position and closes it on Escape', () => {
    const { item } = setup('win');
    fireEvent.contextMenu(item('ghi-chu.txt'), { clientX: 123, clientY: 45 });
    const menu = screen.getByRole('menu');
    expect(menu.style.left).toBe('123px');
    expect(menu.style.top).toBe('45px');
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
});

describe('DesktopSim vùng file: chọn nhiều và bàn phím', () => {
  const six = [{ name: 'Tải về', children: ['a.jpg', 'b.jpg', 'c.jpg', 'd.jpg', 'e.jpg', 'f.jpg'].map((name) => ({ name })) }];

  function setupSix(os: 'win' | 'mac' = 'win') {
    const onState = vi.fn();
    render(<DesktopSim initial={desktopSim.desktopInitial(six, os, '/Tải về')} onState={onState} os={os} spotlight={null} />);
    const last = () => onState.mock.calls.at(-1)![0] as desktopSim.DesktopState;
    const names = () => last().selected.map((id) => last().fs.nodes[id]!.name);
    const opt = (n: string) => screen.getByRole('option', { name: new RegExp(n) });
    return { names, opt };
  }

  it('is a labelled multi-select listbox whose options report aria-selected', () => {
    const { opt } = setupSix();
    const list = screen.getByRole('listbox', { name: 'Các file và thư mục' });
    expect(list).toHaveAttribute('aria-multiselectable', 'true');
    fireEvent.click(opt('b.jpg'));
    expect(opt('b.jpg')).toHaveAttribute('aria-selected', 'true');
    expect(opt('a.jpg')).toHaveAttribute('aria-selected', 'false');
  });

  it('Shift+click selects the whole run from the last plain click, in display order', () => {
    const { names, opt } = setupSix();
    fireEvent.click(opt('b.jpg'));
    fireEvent.click(opt('e.jpg'), { shiftKey: true });
    expect(names()).toEqual(['b.jpg', 'c.jpg', 'd.jpg', 'e.jpg']);
    // Shift+click lần nữa vẫn tính từ mốc cũ (b), kể cả ngược chiều.
    fireEvent.click(opt('a.jpg'), { shiftKey: true });
    expect(names()).toEqual(['a.jpg', 'b.jpg']);
  });

  it('Ctrl+click (⌘ on Mac) adds or removes one item and moves the anchor', () => {
    for (const os of ['win', 'mac'] as const) {
      const { names, opt } = setupSix(os);
      const mod = os === 'win' ? { ctrlKey: true } : { metaKey: true };
      fireEvent.click(opt('b.jpg'));
      fireEvent.click(opt('d.jpg'), { shiftKey: true });
      fireEvent.click(opt('c.jpg'), mod);
      expect(names(), os).toEqual(['b.jpg', 'd.jpg']);
      fireEvent.click(opt('f.jpg'), mod);
      expect(names(), os).toEqual(['b.jpg', 'd.jpg', 'f.jpg']);
      fireEvent.click(opt('e.jpg'), { shiftKey: true });
      expect(names(), os).toEqual(['e.jpg', 'f.jpg']);
      cleanup();
    }
  });

  it('is one Tab stop; arrows move the selection, Shift+arrows extend it, Home/End jump', () => {
    const { names, opt } = setupSix();
    const tabbable = screen.getAllByRole('option').filter((o) => o.tabIndex === 0);
    expect(tabbable).toEqual([opt('a.jpg')]);
    opt('a.jpg').focus();
    fireEvent.keyDown(opt('a.jpg'), { key: 'ArrowRight' });
    expect(names()).toEqual(['b.jpg']);
    expect(opt('b.jpg')).toHaveFocus();
    expect(opt('b.jpg').tabIndex).toBe(0);
    expect(opt('a.jpg').tabIndex).toBe(-1);
    fireEvent.keyDown(opt('b.jpg'), { key: 'ArrowDown', shiftKey: true });
    fireEvent.keyDown(opt('c.jpg'), { key: 'ArrowRight', shiftKey: true });
    expect(names()).toEqual(['b.jpg', 'c.jpg', 'd.jpg']);
    fireEvent.keyDown(opt('d.jpg'), { key: 'End' });
    expect(names()).toEqual(['f.jpg']);
    expect(opt('f.jpg')).toHaveFocus();
    fireEvent.keyDown(opt('f.jpg'), { key: 'Home', shiftKey: true });
    expect(names()).toEqual(['a.jpg', 'b.jpg', 'c.jpg', 'd.jpg', 'e.jpg', 'f.jpg']);
  });

  it('Shift+F10 opens the item menu from the keyboard; arrows move, Escape closes and returns focus', () => {
    const { names, opt } = setupSix();
    opt('c.jpg').focus();
    fireEvent.keyDown(opt('c.jpg'), { key: 'F10', shiftKey: true });
    expect(names()).toEqual(['c.jpg']);
    const items = within(screen.getByRole('menu')).getAllByRole('menuitem');
    expect(items[0]).toHaveFocus();
    fireEvent.keyDown(items[0]!, { key: 'ArrowDown' });
    expect(items[1]).toHaveFocus();
    fireEvent.keyDown(items[1]!, { key: 'Escape' });
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    expect(opt('c.jpg')).toHaveFocus();
  });

  it('Enter on a menu item runs it (and does not reach the file shortcuts); Tab closes the menu', () => {
    const { names, opt } = setupSix();
    opt('c.jpg').focus();
    fireEvent.keyDown(opt('c.jpg'), { key: 'ContextMenu' });
    fireEvent.keyDown(within(screen.getByRole('menu')).getAllByRole('menuitem')[0]!, { key: 'Tab' });
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    fireEvent.keyDown(opt('c.jpg'), { key: 'ContextMenu' });
    const del = screen.getByRole('menuitem', { name: 'Xoá' });
    const ev = fireEvent.keyDown(del, { key: 'Enter' });
    expect(ev).toBe(true); // không bị preventDefault → trình duyệt bấm nút như thường
    fireEvent.click(del);
    expect(screen.queryByRole('option', { name: /c\.jpg/ })).not.toBeInTheDocument();
    expect(names()).toEqual([]);
  });
});

describe('DesktopSim shell', () => {
  const menuApps = (label: string) =>
    within(screen.getByRole('dialog', { name: label }))
      .getAllByRole('button')
      .map((b) => b.getAttribute('aria-label'));

  it('Windows: the Start button opens a Start menu with a focused search box', () => {
    setup('win');
    const start = screen.getByRole('button', { name: 'Start' });
    expect(start).toHaveAttribute('data-help-id', 'shell.start');
    expect(screen.queryByRole('searchbox')).not.toBeInTheDocument();
    fireEvent.click(start);
    const box = screen.getByRole('searchbox', { name: 'Tìm ứng dụng' });
    expect(box).toHaveAttribute('data-help-id', 'shell.search');
    expect(document.activeElement).toBe(box);
    expect(menuApps('Start menu')).toEqual(['Word', 'Excel', 'PowerPoint', 'File Explorer', 'Edge']);
  });

  it('Windows: typing "exc" (any case) leaves only Excel', () => {
    setup('win');
    fireEvent.click(screen.getByRole('button', { name: 'Start' }));
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'EXC' } });
    expect(menuApps('Start menu')).toEqual(['Excel']);
  });

  it('Windows: clicking Excel opens a pretend Excel window that can be closed', () => {
    const { last } = setup('win');
    fireEvent.click(screen.getByRole('button', { name: 'Start' }));
    fireEvent.click(within(screen.getByRole('dialog', { name: 'Start menu' })).getByRole('button', { name: 'Excel' }));
    expect(last().shell.launched).toBe('excel');
    expect(screen.queryByRole('dialog', { name: 'Start menu' })).not.toBeInTheDocument();
    expect(screen.getByRole('dialog', { name: 'Excel' })).toHaveTextContent('Đang mở Excel');
    fireEvent.click(screen.getByRole('button', { name: 'Đóng Excel' }));
    expect(last().shell.launched).toBeNull();
    expect(screen.queryByRole('dialog', { name: 'Excel' })).not.toBeInTheDocument();
  });

  it('Windows: pinned taskbar icons launch too', () => {
    const { last } = setup('win');
    const pinned = screen.getByRole('group', { name: 'Ứng dụng đã ghim' });
    expect(pinned).toHaveAttribute('data-help-id', 'shell.taskbar');
    fireEvent.click(within(pinned).getByRole('button', { name: 'Edge' }));
    expect(last().shell.launched).toBe('browser');
  });

  it('Mac: has a Dock and a Spotlight magnifier, no Start button', () => {
    const { last } = setup('mac');
    expect(screen.queryByRole('button', { name: 'Start' })).not.toBeInTheDocument();
    const dock = screen.getByRole('group', { name: 'Dock' });
    expect(dock).toHaveAttribute('data-help-id', 'shell.dock');
    fireEvent.click(within(dock).getByRole('button', { name: 'Word' }));
    expect(last().shell.launched).toBe('word');
    expect(screen.getByRole('button', { name: 'Spotlight' })).toHaveAttribute('data-help-id', 'shell.spotlight');
  });

  it('Mac: Spotlight opens the first result on Enter', () => {
    const { last } = setup('mac');
    fireEvent.click(screen.getByRole('button', { name: 'Spotlight' }));
    const box = screen.getByRole('searchbox', { name: 'Tìm kiếm Spotlight' });
    fireEvent.change(box, { target: { value: 'ex' } });
    expect(menuApps('Spotlight')).toEqual(['Excel']);
    fireEvent.keyDown(box, { key: 'Enter' });
    expect(last().shell.launched).toBe('excel');
    expect(screen.queryByRole('dialog', { name: 'Spotlight' })).not.toBeInTheDocument();
  });

  it('Escape closes the menu, and keys typed in the search box do not reach the file shortcuts', () => {
    const onState = vi.fn();
    render(<DesktopSim initial={desktopSim.desktopInitial(tree, 'win', '/Ảnh')} onState={onState} os="win" spotlight={null} />);
    const last = () => onState.mock.calls.at(-1)![0] as desktopSim.DesktopState;
    fireEvent.click(screen.getByRole('button', { name: 'Start' }));
    fireEvent.keyDown(screen.getByRole('searchbox'), { key: 'Backspace' });
    expect(vfs.pathOf(last().fs, last().cwd)).toBe('/Ảnh');
    fireEvent.keyDown(screen.getByRole('searchbox'), { key: 'Escape' });
    expect(screen.queryByRole('dialog', { name: 'Start menu' })).not.toBeInTheDocument();
    expect(last().shell.menuOpen).toBe(false);
  });
});

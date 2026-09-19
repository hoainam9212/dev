import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
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
  const item = (name: string) => within(screen.getByTestId('file-area')).getByRole('button', { name: new RegExp(name) });
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
});

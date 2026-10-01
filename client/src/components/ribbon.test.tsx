import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { activeTab, RibbonPanel, RibbonTabs, SplitButton } from './ribbon';

describe('SplitButton', () => {
  const show = (onClick = vi.fn(), onPick = vi.fn(), disabled = false) => {
    render(<SplitButton helpId="ppt.newSlide" label="Slide mới" menuLabel="Chọn bố cục" icon={<span />} text="New Slide"
      disabled={disabled} onClick={onClick} items={[{ value: 'a', label: 'Mục A', content: 'A' }]} onPick={onPick} />);
    return { onClick, onPick };
  };

  it('nửa trên làm việc chính, nửa dưới mở menu', () => {
    const { onClick, onPick } = show();
    fireEvent.click(screen.getByRole('button', { name: 'Slide mới' }));
    expect(onClick).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByRole('button', { name: 'Chọn bố cục' }));
    fireEvent.click(screen.getByRole('button', { name: 'Mục A' }));
    expect(onPick).toHaveBeenCalledWith('a');
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('button', { name: 'Mục A' })).toBeNull();
  });

  it('menu đóng khi bấm ra ngoài hoặc Esc, như MenuButton', () => {
    show();
    fireEvent.click(screen.getByRole('button', { name: 'Chọn bố cục' }));
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('menu')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Chọn bố cục' }));
    fireEvent.pointerDown(document.body);
    expect(screen.queryByRole('menu')).toBeNull();
  });

  it('khoá cả hai nửa khi disabled', () => {
    show(vi.fn(), vi.fn(), true);
    expect(screen.getByRole('button', { name: 'Slide mới' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Chọn bố cục' })).toBeDisabled();
  });
});

describe('RibbonTabs', () => {
  it('lists normal then contextual tabs and marks the open one', () => {
    const onPick = vi.fn();
    render(<RibbonTabs app="excel" tabs={['File', 'Home', 'Data'] as const} contextTabs={['Chart Design'] as const} active="Home" onPick={onPick} />);
    expect(screen.getAllByRole('tab').map((t) => t.textContent)).toEqual(['File', 'Home', 'Data', 'Chart Design']);
    expect(screen.getByRole('tab', { name: 'Home' })).toHaveAttribute('aria-selected', 'true');
    fireEvent.click(screen.getByRole('tab', { name: 'Data' }));
    expect(onPick).toHaveBeenCalledWith('Data');
  });

  it('paints the open tab and contextual tabs in the app accent', () => {
    render(<RibbonTabs app="excel" tabs={['Home', 'Data'] as const} contextTabs={['Chart Design'] as const} active="Home" onPick={vi.fn()} />);
    expect(screen.getByRole('tab', { name: 'Home' })).toHaveStyle({ color: 'rgb(16, 124, 65)', borderColor: 'rgb(16, 124, 65)' });
    expect(screen.getByRole('tab', { name: 'Chart Design' })).toHaveStyle({ color: 'rgb(16, 124, 65)' });
    expect(screen.getByRole('tab', { name: 'Data' })).not.toHaveStyle({ color: 'rgb(16, 124, 65)' });
  });

  it('keeps the tab strip from stealing the editor selection', () => {
    render(<RibbonTabs app="word" tabs={['Home'] as const} active="Home" onPick={vi.fn()} />);
    expect(fireEvent.mouseDown(screen.getByRole('tab', { name: 'Home' }))).toBe(false);
  });
});

describe('activeTab', () => {
  it('falls back when the picked contextual tab is gone', () => {
    expect(activeTab('Picture Format', ['Picture Format', 'Table Layout'], [], 'Home')).toBe('Home');
    expect(activeTab('Picture Format', ['Picture Format'], ['Picture Format'], 'Home')).toBe('Picture Format');
    expect(activeTab('Insert', ['Picture Format'], [], 'Home')).toBe('Insert');
  });
});

describe('RibbonPanel', () => {
  it('keeps a fixed minimum height, tall enough for two-line big buttons', () => {
    // 108px: nút lớn có nhãn hai dòng (Lookup & Reference ▾) cao hơn 96px; mọi thẻ phải bằng nhau.
    render(<RibbonPanel><span>nội dung</span></RibbonPanel>);
    expect(screen.getByText('nội dung').parentElement).toHaveClass('min-h-[6.75rem]');
  });
});

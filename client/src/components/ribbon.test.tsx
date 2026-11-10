import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { activeTab, MenuButton, RibbonPanel, RibbonTabs, SplitButton } from './ribbon';

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
    // Tìm mục theo nhãn trong bảng thả xuống: đúng cả khi mục mang vai trò `button` lẫn `menuitem`.
    fireEvent.click(within(screen.getByRole('menu')).getByLabelText('Mục A'));
    expect(onPick).toHaveBeenCalledWith('a');
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('menu')).toBeNull();
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

describe('Menu thả xuống – bàn phím', () => {
  const item = (name: string) => within(screen.getByRole('menu')).getByLabelText(name);
  const items = [
    { value: 'a', label: 'Mục A', content: 'A' },
    { value: 'b', label: 'Mục B', content: 'B' },
    { value: 'c', label: 'Mục C', content: 'C' },
  ];
  const show = (onPick = vi.fn()) => {
    render(
      <>
        <MenuButton helpId="x.menu" label="Màu chữ" button="A" items={items} onPick={onPick} />
        <button type="button">Sau</button>
      </>,
    );
    return { onPick, trigger: screen.getByRole('button', { name: 'Màu chữ' }) };
  };

  it('nút có aria-haspopup và aria-expanded; bảng là menu, mục có data-menu-item', async () => {
    const { trigger } = show();
    expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('menu', { name: 'Màu chữ' })).toBeInTheDocument();
    expect(screen.getByRole('menu').querySelectorAll('[data-menu-item]')).toHaveLength(3);
  });

  it.each(['{Enter}', ' ', '{ArrowDown}'])('mở bằng %s thì focus mục đầu', async (key) => {
    const { trigger } = show();
    trigger.focus();
    await userEvent.keyboard(key);
    expect(item('Mục A')).toHaveFocus();
  });

  it('↑/↓ đi vòng, Enter chọn', async () => {
    const { trigger, onPick } = show();
    trigger.focus();
    await userEvent.keyboard('{ArrowDown}{ArrowUp}');
    expect(item('Mục C')).toHaveFocus();
    await userEvent.keyboard('{ArrowDown}');
    expect(item('Mục A')).toHaveFocus();
    await userEvent.keyboard('{ArrowDown}{Enter}');
    expect(onPick).toHaveBeenCalledWith('b');
    expect(screen.queryByRole('menu')).toBeNull();
  });

  it('Esc đóng và trả focus về nút', async () => {
    const { trigger } = show();
    trigger.focus();
    await userEvent.keyboard('{ArrowDown}{ArrowDown}{Escape}');
    expect(screen.queryByRole('menu')).toBeNull();
    expect(trigger).toHaveFocus();
  });

  it('Tab ra ngoài thì đóng menu', async () => {
    const { trigger } = show();
    trigger.focus();
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.tab();
    expect(screen.queryByRole('menu')).toBeNull();
    expect(screen.getByRole('button', { name: 'Sau' })).toHaveFocus();
  });

  it('SplitButton: nửa mở menu cũng có aria-haspopup và mở bằng phím', async () => {
    render(<SplitButton helpId="ppt.newSlide" label="Slide mới" menuLabel="Chọn bố cục" icon={<span />} text="New Slide"
      onClick={vi.fn()} items={items} onPick={vi.fn()} />);
    const half = screen.getByRole('button', { name: 'Chọn bố cục' });
    expect(half).toHaveAttribute('aria-haspopup', 'menu');
    expect(screen.getByRole('button', { name: 'Slide mới' })).not.toHaveAttribute('aria-haspopup');
    half.focus();
    await userEvent.keyboard('{ArrowDown}');
    expect(item('Mục A')).toHaveFocus();
  });

  it('nút ribbon mang lớp ribbon-btn để có vòng focus rõ', () => {
    show();
    expect(screen.getByRole('button', { name: 'Màu chữ' })).toHaveClass('ribbon-btn');
  });
});

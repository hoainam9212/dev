import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { HelpTooltipLayer } from './HelpTooltipLayer';

describe('HelpTooltipLayer', () => {
  afterEach(() => vi.useRealTimers());

  it('shows the Vietnamese explanation after hovering', () => {
    vi.useFakeTimers();
    render(<><HelpTooltipLayer /><button data-help-id="player.hint">💡</button></>);
    fireEvent.pointerOver(screen.getByRole('button'));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    act(() => vi.advanceTimersByTime(450));
    expect(screen.getByRole('tooltip')).toHaveTextContent('Gợi ý');
    fireEvent.pointerDown(screen.getByRole('button'));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('chạm (điện thoại) không mở chú thích: không có lúc rời chuột nên nó sẽ kẹt lại', () => {
    vi.useFakeTimers();
    render(<><HelpTooltipLayer /><button data-help-id="player.hint">💡</button></>);
    const btn = screen.getByRole('button');
    fireEvent.pointerOver(btn, { pointerType: 'touch' });
    fireEvent.pointerDown(btn, { pointerType: 'touch' });
    fireEvent.focusIn(btn);
    fireEvent.pointerUp(btn, { pointerType: 'touch' });
    act(() => vi.advanceTimersByTime(1000));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('Tab bằng bàn phím tới nút thì vẫn hiện chú thích, kể cả sau khi từng chạm', () => {
    vi.useFakeTimers();
    render(<><HelpTooltipLayer /><button data-help-id="player.hint">💡</button><button data-help-id="player.check">K</button></>);
    const [a, b] = screen.getAllByRole('button');
    fireEvent.pointerDown(a!, { pointerType: 'touch' });
    fireEvent.focusIn(a!);
    fireEvent.keyDown(document.body, { key: 'Tab' });
    fireEvent.focusIn(b!);
    act(() => vi.advanceTimersByTime(450));
    expect(screen.getByRole('tooltip')).toHaveTextContent('Kiểm tra');
  });

  it('ignores unknown help ids', () => {
    vi.useFakeTimers();
    render(<><HelpTooltipLayer /><button data-help-id="nope">x</button></>);
    fireEvent.pointerOver(screen.getByRole('button'));
    act(() => vi.advanceTimersByTime(450));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });
});

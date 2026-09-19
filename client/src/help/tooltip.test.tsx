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

  it('ignores unknown help ids', () => {
    vi.useFakeTimers();
    render(<><HelpTooltipLayer /><button data-help-id="nope">x</button></>);
    fireEvent.pointerOver(screen.getByRole('button'));
    act(() => vi.advanceTimersByTime(450));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });
});

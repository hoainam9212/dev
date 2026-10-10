import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Mochi } from './Mochi';
import { SpeechBubble } from './SpeechBubble';
import { Kbd } from './Kbd';
import { Segmented } from './Segmented';
import { Toggle } from './Toggle';

describe('components', () => {
  it('renders Mochi with its mood', () => {
    render(<Mochi mood="happy" />);
    expect(screen.getByRole('img', { name: 'Mochi happy' })).toBeInTheDocument();
  });

  it('draws an accessory only when given one', () => {
    const { container, rerender } = render(<Mochi accessory="hat" />);
    expect(container.querySelector('[data-accessory="hat"]')).not.toBeNull();
    rerender(<Mochi />);
    expect(container.querySelector('[data-accessory]')).toBeNull();
  });

  it('renders speech bubble content', () => {
    render(<SpeechBubble>Xin chào!</SpeechBubble>);
    expect(screen.getByText('Xin chào!')).toBeInTheDocument();
  });

  it('renders shortcuts per OS', () => {
    const { rerender } = render(<Kbd combo="mod+c" os="win" />);
    expect(screen.getByLabelText('Ctrl + C')).toBeInTheDocument();
    rerender(<Kbd combo="mod+c" os="mac" />);
    expect(screen.getByLabelText('⌘ + C')).toBeInTheDocument();
  });

  it('Segmented selects an option', () => {
    const onChange = vi.fn();
    render(
      <Segmented label="Hệ điều hành" value="win" onChange={onChange}
        options={[{ value: 'win', label: 'Windows' }, { value: 'mac', label: 'Mac' }]} />,
    );
    expect(screen.getByRole('radio', { name: 'Windows' })).toHaveAttribute('aria-checked', 'true');
    fireEvent.click(screen.getByRole('radio', { name: 'Mac' }));
    expect(onChange).toHaveBeenCalledWith('mac');
  });

  it('Toggle flips', () => {
    const onChange = vi.fn();
    render(<Toggle label="Âm thanh" checked={false} onChange={onChange} />);
    fireEvent.click(screen.getByRole('switch', { name: 'Âm thanh' }));
    expect(onChange).toHaveBeenCalledWith(true);
  });
});

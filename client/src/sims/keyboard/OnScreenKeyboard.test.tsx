import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { OnScreenKeyboard } from './OnScreenKeyboard';

const board = () => screen.getByLabelText('Bàn phím ảo');

describe('OnScreenKeyboard', () => {
  it('Mac hiện ⌘ command, ⌥ option, không có Win', () => {
    render(<OnScreenKeyboard os="mac" next="a" />);
    expect(board()).toHaveTextContent('⌘');
    expect(board()).toHaveTextContent('⌥');
    expect(document.querySelector('[data-key="meta-left"]')).toHaveAttribute('title', 'command');
    expect(board()).not.toHaveTextContent('Win');
  });

  it('Windows hiện Ctrl, Win, Alt, không có ⌘', () => {
    render(<OnScreenKeyboard os="win" next="a" />);
    expect(document.querySelector('[data-key="meta-left"]')).toHaveAttribute('title', 'Win');
    expect(board()).toHaveTextContent('Ctrl');
    expect(board()).toHaveTextContent('Alt');
    expect(board()).not.toHaveTextContent('⌘');
  });

  it('phím chữ giữ nguyên ở cả hai HĐH và phím kế tiếp được đánh dấu', () => {
    const { unmount } = render(<OnScreenKeyboard os="win" next="j" />);
    expect(document.querySelector('[data-key="j"]')).toHaveAttribute('data-next', 'true');
    unmount();
    render(<OnScreenKeyboard os="mac" next="j" />);
    expect(document.querySelector('[data-key="j"]')).toHaveAttribute('data-next', 'true');
  });

  it('phím co theo bề rộng (flex theo đơn vị phím), không đặt bề rộng cố định', () => {
    render(<OnScreenKeyboard os="win" next={null} />);
    const a = document.querySelector<HTMLElement>('[data-key="a"]')!;
    const enter = document.querySelector<HTMLElement>('[data-key="enter"]')!;
    expect(a.style.flexGrow).toBe('1');
    expect(Number(enter.style.flexGrow)).toBeGreaterThan(2);
    expect(a.className).not.toMatch(/\bw-11\b/);
  });
});

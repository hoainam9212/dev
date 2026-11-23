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

  it('chữ hoa: số 1 trên phím Shift, số 2 trên phím chữ, chú thích theo thứ tự', () => {
    render(<OnScreenKeyboard os="win" next="X" />);
    expect(document.querySelector('[data-key="shift-right"] [data-step]')).toHaveTextContent('1');
    expect(document.querySelector('[data-key="x"] [data-step]')).toHaveTextContent('2');
    expect(document.querySelectorAll('[data-key] [data-step]')).toHaveLength(2);
    const cap = screen.getByTestId('finger-caption');
    expect(cap).toHaveTextContent('1 Giữ Shift bên phải bằng ngón út phải → 2 bấm X bằng ngón áp út trái');
  });

  it('chữ thường: không có số, chú thích như cũ', () => {
    render(<OnScreenKeyboard os="win" next="x" />);
    expect(document.querySelectorAll('[data-step]')).toHaveLength(0);
    expect(screen.getByTestId('finger-caption')).toHaveTextContent('Dùng: Ngón áp út trái');
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

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { mouseSim } from '@office-neko/shared';
import { MouseSim } from './MouseSim';

function setup(game: mouseSim.MouseGame, total = 2, os: 'win' | 'mac' = 'win') {
  const onState = vi.fn();
  render(<MouseSim initial={mouseSim.mouseInitial(game, total)} onState={onState} os={os} spotlight={null} />);
  const last = () => onState.mock.calls.at(-1)![0] as mouseSim.MouseState;
  return { onState, last };
}

describe('MouseSim', () => {
  it('click: hits bubbles and counts background misses', () => {
    const { last } = setup('click');
    fireEvent.click(screen.getAllByRole('button', { name: /Bong bóng/ })[0]!);
    expect(last().hitIds).toEqual(['t1']);
    fireEvent.click(screen.getByTestId('mouse-area'));
    expect(last().misses).toBe(1);
    expect(screen.getByText('Đã trúng 1/2')).toBeInTheDocument();
  });

  it('double: needs a double click', () => {
    const { last } = setup('double', 1);
    const gift = screen.getByRole('button', { name: /Hộp quà/ });
    fireEvent.click(gift);
    expect(screen.getByText(/Nhấp nhanh 2 lần/)).toBeInTheDocument();
    fireEvent.doubleClick(gift);
    expect(last().hitIds).toEqual(['t1']);
    expect(screen.getByText(/Tuyệt vời/)).toBeInTheDocument();
  });

  it('right: opens a context menu and picks the gift item', () => {
    const { last } = setup('right', 1, 'mac');
    const box = screen.getByRole('button', { name: /Thùng/ });
    fireEvent.click(box);
    expect(screen.getByText(/giữ phím control/)).toBeInTheDocument();
    fireEvent.contextMenu(box);
    fireEvent.click(screen.getByRole('menuitem', { name: 'Đổi tên' }));
    expect(last().misses).toBe(1);
    fireEvent.contextMenu(box);
    fireEvent.click(screen.getByRole('menuitem', { name: '🎁 Mở quà' }));
    expect(last().hitIds).toEqual(['t1']);
  });

  it('right: opens the context menu at the click position, not the centre', () => {
    setup('right', 1, 'win');
    const box = screen.getByRole('button', { name: /Thùng/ });
    fireEvent.contextMenu(box, { clientX: 77, clientY: 88 });
    const menu = screen.getByRole('menu');
    expect(menu.style.left).toBe('77px');
    expect(menu.style.top).toBe('88px');
  });

  it('drag: dropping a fish in the basket is a hit', () => {
    const { last } = setup('drag', 1);
    const fish = screen.getByRole('img', { name: /Cá số 1/ });
    fireEvent.dragStart(fish);
    fireEvent.drop(screen.getByTestId('mouse-area'));
    expect(last().misses).toBe(1);
    fireEvent.dragStart(fish);
    fireEvent.drop(screen.getByLabelText('Giỏ cá'));
    expect(last().hitIds).toEqual(['t1']);
  });

  it('drag: a cancelled drag (dragend with no drop) does not leave stale state for a later drop', () => {
    const { onState } = setup('drag', 1);
    const callsAfterMount = onState.mock.calls.length;
    const fish = screen.getByRole('img', { name: /Cá số 1/ });
    fireEvent.dragStart(fish);
    fireEvent.dragEnd(fish);
    fireEvent.drop(screen.getByTestId('mouse-area'));
    expect(onState.mock.calls.length).toBe(callsAfterMount);
  });

  it('scroll: finds and clicks the hidden cats', () => {
    const { last } = setup('scroll', 2);
    fireEvent.click(screen.getByRole('button', { name: /Mèo số 2/ }));
    expect(last().hitIds).toEqual(['t2']);
    fireEvent.click(screen.getByTestId('mouse-area'));
    expect(last().misses).toBe(0);
  });

  it('scroll: shows the completion overlay once every cat is found', () => {
    setup('scroll', 1);
    fireEvent.click(screen.getByRole('button', { name: /Mèo số 1/ }));
    expect(screen.getByText(/Tuyệt vời/)).toBeInTheDocument();
  });

  it('marks the first remaining target for the spotlight', () => {
    setup('click', 2);
    const first = screen.getAllByRole('button', { name: /Bong bóng/ })[0]!;
    expect(first).toHaveAttribute('data-help-id', 'mouse.target');
    fireEvent.click(first);
    expect(screen.getAllByRole('button', { name: /Bong bóng/ })[0]).toHaveAttribute('data-help-id', 'mouse.target');
  });
});

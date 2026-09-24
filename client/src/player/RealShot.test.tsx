import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import type { RealShotStep } from '@office-neko/shared';
import { RealShot } from './RealShot';

const step: RealShotStep = {
  kind: 'realShot',
  image: '/images/real/word-home.png',
  caption: 'Trên Word thật: tab Home › nhóm Font',
  marks: [
    { x: 20, y: 68, w: 2, h: 12, label: 'Bold (B)' },
    { x: 23, y: 68, w: 2, h: 12, label: 'Italic (I)' },
  ],
};

describe('RealShot', () => {
  it('draws one box per mark, placed in percent', () => {
    render(<RealShot step={step} onNext={vi.fn()} />);
    const boxes = screen.getAllByTestId('realshot-mark');
    expect(boxes).toHaveLength(2);
    expect(boxes[0]).toHaveStyle({ left: '20%', top: '68%', width: '2%', height: '12%' });
    expect(boxes[1]).toHaveTextContent('2');
  });

  it('shows the image, caption and a credit line', () => {
    render(<RealShot step={step} onNext={vi.fn()} />);
    expect(screen.getByRole('img', { name: step.caption })).toHaveAttribute('src', step.image);
    expect(screen.getByText('Ảnh chụp Microsoft Word')).toBeInTheDocument();
  });

  it('lights the box whose legend line is clicked', () => {
    render(<RealShot step={step} onNext={vi.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: /Italic \(I\)/ }));
    const boxes = screen.getAllByTestId('realshot-mark');
    expect(boxes[1]).toHaveAttribute('data-active', 'true');
    expect(boxes[0]).toHaveAttribute('data-active', 'false');
  });

  it('opens a zoomed view and moves on', () => {
    const onNext = vi.fn();
    render(<RealShot step={step} onNext={onNext} />);
    fireEvent.click(screen.getByRole('button', { name: 'Phóng to ảnh' }));
    expect(screen.getByRole('dialog', { name: step.caption })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Đóng ảnh' }));
    fireEvent.click(screen.getByRole('button', { name: /Tiếp tục/ }));
    expect(onNext).toHaveBeenCalled();
  });
});

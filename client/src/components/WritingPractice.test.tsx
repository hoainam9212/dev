import { render, screen, fireEvent } from '@testing-library/react';
import { WritingPractice } from './WritingPractice';

function drawStroke(canvas: Element, pts: [number, number][]) {
  const [first, ...rest] = pts;
  fireEvent.pointerDown(canvas, { clientX: first![0], clientY: first![1], pointerId: 1 });
  for (const [x, y] of rest) fireEvent.pointerMove(canvas, { clientX: x, clientY: y, pointerId: 1 });
  const last = pts[pts.length - 1]!;
  fireEvent.pointerUp(canvas, { clientX: last[0], clientY: last[1], pointerId: 1 });
}

function setup(paths: string[]) {
  const onComplete = vi.fn();
  render(<WritingPractice paths={paths} label="一" onComplete={onComplete} />);
  const canvas = screen.getByTestId('draw-canvas');
  Object.defineProperty(canvas, 'getBoundingClientRect', {
    value: () => ({ left: 0, top: 0, width: 218, height: 218 }),
  });
  return { canvas, onComplete };
}

it('shows progress and accepts a matching stroke drawn on the canvas', () => {
  const { canvas, onComplete } = setup(['M10,50 L100,50']);
  expect(screen.getByText(/Nét 1 \/ 1/)).toBeInTheDocument();
  // canvas is 218px for 109 units → multiply by 2
  drawStroke(canvas, [[20, 100], [120, 100], [200, 100]]);
  expect(onComplete).toHaveBeenCalledWith(expect.objectContaining({ score: expect.any(Number) }));
  expect(screen.getByText(/Hoàn thành/)).toBeInTheDocument();
});

it('rejects a wrong stroke and shows the hint after one failure', () => {
  const { canvas, onComplete } = setup(['M10,50 L100,50']);
  drawStroke(canvas, [[100, 20], [100, 200]]); // vertical instead of horizontal
  expect(onComplete).not.toHaveBeenCalled();
  expect(screen.getByText(/Nét 1 \/ 1/)).toBeInTheDocument();
  expect(screen.getByTestId('stroke-hint')).toBeInTheDocument();
});

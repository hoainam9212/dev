import { render, screen } from '@testing-library/react';
import { useSwipe } from './useSwipe';
import { pointer, swipe } from '../test/swipe';

function Box({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) {
  const swipe = useSwipe({ onNext, onPrev });
  return (
    <div data-testid="box" {...swipe}>
      <svg data-testid="canvas" data-no-swipe />
    </div>
  );
}

function setup() {
  const onNext = vi.fn();
  const onPrev = vi.fn();
  render(<Box onNext={onNext} onPrev={onPrev} />);
  return { onNext, onPrev, box: screen.getByTestId('box'), canvas: screen.getByTestId('canvas') };
}


beforeEach(() => {
  Object.defineProperty(window, 'innerWidth', { value: 390, configurable: true });
});

it('swiping left goes to the next item and swiping right to the previous one', () => {
  const { onNext, onPrev, box } = setup();
  swipe(box, [300, 400], [150, 410]);
  expect(onNext).toHaveBeenCalledTimes(1);
  swipe(box, [100, 400], [260, 390]);
  expect(onPrev).toHaveBeenCalledTimes(1);
});

it('lets the page scroll and ignores short or mostly vertical drags', () => {
  const { onNext, onPrev, box } = setup();
  expect(box.style.touchAction).toBe('pan-y');
  swipe(box, [200, 400], [160, 400]); // 40px: too short
  swipe(box, [300, 300], [200, 500]); // more vertical than horizontal
  expect(onNext).not.toHaveBeenCalled();
  expect(onPrev).not.toHaveBeenCalled();
});

it('never treats a stroke drawn on the canvas as a swipe', () => {
  const { onNext, canvas } = setup();
  swipe(canvas, [300, 400], [100, 400]);
  expect(onNext).not.toHaveBeenCalled();
});

it('leaves drags from the screen edges to the system back gesture, and ignores the mouse', () => {
  const { onNext, onPrev, box } = setup();
  swipe(box, [385, 400], [200, 400]);
  swipe(box, [5, 400], [200, 400]);
  swipe(box, [300, 400], [100, 400], 'mouse');
  expect(onNext).not.toHaveBeenCalled();
  expect(onPrev).not.toHaveBeenCalled();
});

it('forgets a gesture the browser cancelled (e.g. it became a scroll)', () => {
  const { onNext, box } = setup();
  pointer('pointerDown', box, 300, 400);
  pointer('pointerCancel', box, 300, 400);
  pointer('pointerUp', box, 100, 400);
  expect(onNext).not.toHaveBeenCalled();
});

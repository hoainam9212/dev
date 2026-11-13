import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { MAX_SCALE, MIN_SCALE, clampScale, clampView, zoomAt, ZoomImage } from './ZoomImage';
import { withLang } from '../test/lang';

const box = { frameW: 300, frameH: 400, contentW: 300, contentH: 400 };

describe('clampScale', () => {
  it('keeps the scale between 1x and 4x', () => {
    expect(MIN_SCALE).toBe(1);
    expect(MAX_SCALE).toBe(4);
    expect(clampScale(0.3)).toBe(1);
    expect(clampScale(2.2)).toBe(2.2);
    expect(clampScale(9)).toBe(4);
  });
});

describe('clampView', () => {
  it('pins the content to the top-left at 1x', () => {
    expect(clampView({ x: 40, y: -30, scale: 1 }, box)).toEqual({ x: 0, y: 0, scale: 1 });
  });

  it('never leaves an empty gap inside the frame while zoomed', () => {
    // At 2x the content is 600x800 inside a 300x400 frame: x in [-300, 0], y in [-400, 0].
    expect(clampView({ x: 50, y: 20, scale: 2 }, box)).toEqual({ x: 0, y: 0, scale: 2 });
    expect(clampView({ x: -999, y: -999, scale: 2 }, box)).toEqual({ x: -300, y: -400, scale: 2 });
    expect(clampView({ x: -120, y: -200, scale: 2 }, box)).toEqual({ x: -120, y: -200, scale: 2 });
  });

  it('clamps the scale too', () => {
    expect(clampView({ x: -2000, y: 0, scale: 10 }, box)).toEqual({ x: -900, y: 0, scale: 4 });
  });

  it('pins an axis to 0 when the scaled content is not larger than the frame on it', () => {
    const wide = { frameW: 300, frameH: 400, contentW: 300, contentH: 100 };
    // 2x makes the content 200 high in a 400 high frame: nothing to pan vertically.
    expect(clampView({ x: -100, y: -50, scale: 2 }, wide)).toEqual({ x: -100, y: 0, scale: 2 });
  });
});

describe('zoomAt', () => {
  it('keeps the content point under the given frame point fixed', () => {
    const v = zoomAt({ x: 0, y: 0, scale: 1 }, 2, 100, 200, box);
    expect(v).toEqual({ x: -100, y: -200, scale: 2 });
    // the content point under (100, 200) was (100, 200) and still is: (100 - x) / scale
    expect((100 - v.x) / v.scale).toBe(100);
    expect((200 - v.y) / v.scale).toBe(200);
  });

  it('works from an already zoomed and panned view', () => {
    const v = zoomAt({ x: -100, y: -100, scale: 2 }, 4, 150, 150, box);
    // content point (125, 125) stays under (150, 150): x = 150 - 125 * 4
    expect(v).toEqual({ x: -350, y: -350, scale: 4 });
  });

  it('clamps the result', () => {
    expect(zoomAt({ x: 0, y: 0, scale: 1 }, 8, 0, 0, box)).toEqual({ x: 0, y: 0, scale: 4 });
    expect(zoomAt({ x: -300, y: -400, scale: 2 }, 1, 150, 200, box)).toEqual({ x: 0, y: 0, scale: 1 });
  });
});

// --- component ---

function frame() {
  return screen.getByTestId('zoom-frame');
}
function layer() {
  return screen.getByTestId('zoom-layer');
}
function scaleOf(el: HTMLElement): number {
  const m = /scale\(([\d.]+)\)/.exec(el.style.transform);
  return m ? Number(m[1]) : 1;
}
function translateOf(el: HTMLElement): [number, number] {
  const m = /translate\((-?[\d.]+)px, (-?[\d.]+)px\)/.exec(el.style.transform);
  return m ? [Number(m[1]), Number(m[2])] : [0, 0];
}
async function nextFrame() {
  await act(() => new Promise<void>((r) => requestAnimationFrame(() => r())));
}
function pointer(type: string, id: number, x: number, y: number, pointerType = 'touch', target: HTMLElement = frame()) {
  const e = new PointerEvent(type, { bubbles: true, cancelable: true, clientX: x, clientY: y, pointerId: id } as PointerEventInit);
  Object.defineProperty(e, 'pointerType', { value: pointerType });
  fireEvent(target, e);
}

const sizes: [keyof HTMLElement, number][] = [
  ['clientWidth', 300],
  ['clientHeight', 400],
  ['offsetWidth', 300],
  ['offsetHeight', 400],
];
const saved = sizes.map(([k]) => [k, Object.getOwnPropertyDescriptor(HTMLElement.prototype, k)] as const);

beforeEach(() => {
  withLang('en');
  for (const [k, v] of sizes) Object.defineProperty(HTMLElement.prototype, k, { configurable: true, get: () => v });
});
afterEach(() => {
  for (const [k, d] of saved) if (d) Object.defineProperty(HTMLElement.prototype, k, d);
});

describe('ZoomImage', () => {
  it('renders the image fitting the width, with labelled zoom buttons', () => {
    render(<ZoomImage src="page.png" alt="p.3" />);
    const img = screen.getByAltText('p.3');
    expect(img).toHaveAttribute('src', 'page.png');
    expect(img).toHaveClass('w-full');
    expect(screen.getByRole('button', { name: 'Zoom in' })).toHaveTextContent('+');
    expect(screen.getByRole('button', { name: 'Zoom out' })).toHaveTextContent('−');
    expect(screen.getByRole('button', { name: 'Fit width (1:1)' })).toHaveTextContent('1:1');
  });

  it('renders children inside the transformed layer when no src is given', () => {
    render(
      <ZoomImage>
        <div data-testid="crop">cropped page</div>
      </ZoomImage>,
    );
    expect(layer()).toContainElement(screen.getByTestId('crop'));
    expect(screen.queryByRole('img')).toBeNull();
  });

  it('lets the page scroll at 1x and takes over touch while zoomed', async () => {
    render(<ZoomImage src="page.png" alt="p" />);
    expect(frame().style.touchAction).toBe('pan-y');
    fireEvent.click(screen.getByRole('button', { name: 'Zoom in' }));
    await nextFrame();
    expect(scaleOf(layer())).toBeGreaterThan(1);
    expect(frame().style.touchAction).toBe('none');
    fireEvent.click(screen.getByRole('button', { name: 'Fit width (1:1)' }));
    await nextFrame();
    expect(scaleOf(layer())).toBe(1);
    expect(frame().style.touchAction).toBe('pan-y');
  });

  it('zoom buttons step within 1x..4x', async () => {
    render(<ZoomImage src="page.png" alt="p" />);
    const zoomIn = screen.getByRole('button', { name: 'Zoom in' });
    const zoomOut = screen.getByRole('button', { name: 'Zoom out' });
    expect(zoomOut).toBeDisabled();
    for (let i = 0; i < 10; i++) fireEvent.click(zoomIn);
    await nextFrame();
    expect(scaleOf(layer())).toBe(4);
    expect(zoomIn).toBeDisabled();
    for (let i = 0; i < 10; i++) fireEvent.click(zoomOut);
    await nextFrame();
    expect(scaleOf(layer())).toBe(1);
  });

  it('pinches around the centre of the two fingers', async () => {
    render(<ZoomImage src="page.png" alt="p" />);
    pointer('pointerdown', 1, 100, 200);
    pointer('pointerdown', 2, 200, 200);
    pointer('pointermove', 2, 300, 200); // distance 100 -> 200: 2x, centre moves 150 -> 200
    await nextFrame();
    expect(scaleOf(layer())).toBeCloseTo(2);
    // content point under the first centre (150, 200) now sits under the new centre (200, 200)
    const [x, y] = translateOf(layer());
    expect((200 - x) / 2).toBeCloseTo(150);
    expect((200 - y) / 2).toBeCloseTo(200);
    pointer('pointerup', 2, 300, 200);
    pointer('pointerup', 1, 100, 200);
  });

  it('does not pan with one finger at 1x', async () => {
    render(<ZoomImage src="page.png" alt="p" />);
    pointer('pointerdown', 1, 100, 100);
    pointer('pointermove', 1, 40, 20);
    pointer('pointerup', 1, 40, 20);
    await nextFrame();
    expect(translateOf(layer())).toEqual([0, 0]);
  });

  it('pans with one finger while zoomed, clamped to the content edges', async () => {
    render(<ZoomImage src="page.png" alt="p" />);
    fireEvent.click(screen.getByRole('button', { name: 'Zoom in' })); // 1.5x around the centre
    await nextFrame();
    pointer('pointerdown', 1, 150, 200);
    pointer('pointermove', 1, 100, 150);
    await nextFrame();
    const [x1, y1] = translateOf(layer());
    // centre zoom to 1.5x gives (-75, -100); dragging (-50, -50) gives (-125, -150) = the far edge
    expect(x1).toBeCloseTo(-125);
    expect(y1).toBeCloseTo(-150);
    pointer('pointermove', 1, -500, -500);
    await nextFrame();
    expect(translateOf(layer())).toEqual([-150, -200]); // 300 * 1.5 - 300, 400 * 1.5 - 400
    pointer('pointerup', 1, -500, -500);
  });

  it('double-tap toggles between 1x and 2.5x at the tapped point', async () => {
    render(<ZoomImage src="page.png" alt="p" />);
    pointer('pointerdown', 1, 60, 80);
    pointer('pointerup', 1, 60, 80);
    pointer('pointerdown', 1, 62, 81);
    pointer('pointerup', 1, 62, 81);
    await nextFrame();
    expect(scaleOf(layer())).toBe(2.5);
    const [x, y] = translateOf(layer());
    expect((62 - x) / 2.5).toBeCloseTo(62);
    expect((81 - y) / 2.5).toBeCloseTo(81);
    pointer('pointerdown', 1, 62, 81);
    pointer('pointerup', 1, 62, 81);
    pointer('pointerdown', 1, 62, 81);
    pointer('pointerup', 1, 62, 81);
    await nextFrame();
    expect(scaleOf(layer())).toBe(1);
  });

  it('taps on the corner buttons are not gestures', async () => {
    render(<ZoomImage src="page.png" alt="p" />);
    const reset = screen.getByRole('button', { name: 'Fit width (1:1)' });
    for (let i = 0; i < 2; i++) {
      pointer('pointerdown', 1, 280, 380, 'touch', reset);
      pointer('pointerup', 1, 280, 380, 'touch', reset);
    }
    await nextFrame();
    expect(scaleOf(layer())).toBe(1); // no double-tap zoom
  });

  it('ctrl+wheel zooms and a plain wheel does not', async () => {
    render(<ZoomImage src="page.png" alt="p" />);
    fireEvent.wheel(frame(), { deltaY: -100, clientX: 150, clientY: 200 });
    await nextFrame();
    expect(scaleOf(layer())).toBe(1);
    const e = new WheelEvent('wheel', { deltaY: -100, ctrlKey: true, clientX: 150, clientY: 200, bubbles: true, cancelable: true });
    fireEvent(frame(), e);
    await nextFrame();
    expect(scaleOf(layer())).toBeGreaterThan(1);
    expect(e.defaultPrevented).toBe(true);
  });

  it('drags with the mouse only while zoomed', async () => {
    render(<ZoomImage src="page.png" alt="p" />);
    pointer('pointerdown', 1, 100, 100, 'mouse');
    pointer('pointermove', 1, 50, 50, 'mouse');
    pointer('pointerup', 1, 50, 50, 'mouse');
    await nextFrame();
    expect(translateOf(layer())).toEqual([0, 0]);
    fireEvent.click(screen.getByRole('button', { name: 'Zoom in' }));
    await nextFrame();
    pointer('pointerdown', 1, 100, 100, 'mouse');
    pointer('pointermove', 1, 90, 80, 'mouse');
    await nextFrame();
    expect(translateOf(layer())).toEqual([-85, -120]);
    pointer('pointerup', 1, 90, 80, 'mouse');
  });

  it('uses Vietnamese button labels in Vietnamese', () => {
    withLang('vi');
    render(<ZoomImage src="page.png" alt="p" />);
    expect(screen.getAllByRole('button')).toHaveLength(3);
    for (const b of screen.getAllByRole('button')) expect(b.getAttribute('aria-label')).toBeTruthy();
  });
});

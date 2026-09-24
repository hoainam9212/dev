import { render } from '@testing-library/react';
import { STROKE_GAP, StrokeAnimation, strokeTimings } from './StrokeAnimation';

const labels = (c: HTMLElement) => [...c.querySelectorAll('text')].map((t) => [t.textContent, t.getAttribute('x'), t.getAttribute('y')]);

it('draws stroke numbers at the laid-out positions when given', () => {
  const { container } = render(
    <StrokeAnimation
      paths={['M10,20 L90,20', 'M10,22 L90,22']}
      numbers={[
        [5, 18],
        [5, 30],
      ]}
    />,
  );
  expect(labels(container)).toEqual([
    ['1', '5', '18'],
    ['2', '5', '30'],
  ]);
});

it('draws at an even pen speed: longer strokes take longer, with only a short pause in between', () => {
  const t = strokeTimings(['M10,50 L100,50', 'M50,40 L50,60']); // 90 and 20 units long
  expect(t.durations[0]!).toBeGreaterThan(t.durations[1]!);
  expect(t.durations[1]!).toBeGreaterThanOrEqual(0.25); // short strokes are never a flash
  expect(t.delays[0]).toBe(0);
  expect(t.delays[1]! - t.durations[0]!).toBeCloseTo(STROKE_GAP);
  expect(t.total).toBeCloseTo(t.delays[1]! + t.durations[1]! + STROKE_GAP);
});

it('normalises each path length so the visible stroke starts drawing immediately', () => {
  const { container } = render(<StrokeAnimation paths={['M10,50 L100,50', 'M50,40 L50,60']} startDelay={2} />);
  const [a, b] = [...container.querySelectorAll('path.stroke-anim')] as SVGPathElement[];
  expect(a!.getAttribute('pathLength')).toBe('1');
  expect(a!.style.animationDelay).toBe('2s');
  expect(parseFloat(b!.style.animationDelay)).toBeGreaterThan(2);
});

it('falls back to the stroke start, including lower-case movetos', () => {
  const { container } = render(<StrokeAnimation paths={['M10,20 L90,20', 'm60,70 l5,5']} />);
  expect(labels(container)).toEqual([
    ['1', '5', '18'],
    ['2', '55', '68'],
  ]);
});

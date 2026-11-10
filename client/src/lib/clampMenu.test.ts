import { describe, it, expect } from 'vitest';
import { clampMenu } from './clampMenu';

describe('clampMenu', () => {
  it('keeps the click position when the menu fits', () => {
    expect(clampMenu(20, 30, 176, 120, 400, 288)).toEqual({ left: 20, top: 30 });
  });

  it('pulls the menu left and flips it above the pointer in the bottom-right corner', () => {
    const p = clampMenu(390, 280, 176, 120, 400, 288);
    expect(p).toEqual({ left: 400 - 176 - 4, top: 280 - 120 });
    expect(p.left + 176).toBeLessThanOrEqual(400);
    expect(p.top + 120).toBeLessThanOrEqual(288);
  });

  it('pins to the bottom edge when there is no room above or below', () => {
    expect(clampMenu(10, 100, 176, 150, 400, 200)).toEqual({ left: 10, top: 200 - 150 - 4 });
  });

  it('never goes past the top-left margin, even when the menu is bigger than the box', () => {
    expect(clampMenu(-30, -10, 500, 400, 400, 288)).toEqual({ left: 4, top: 4 });
  });
});

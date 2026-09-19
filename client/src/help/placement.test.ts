import { describe, it, expect } from 'vitest';
import { placePopover, type AnchorRect } from './placement';

function rect(partial: Partial<AnchorRect>): AnchorRect {
  const left = partial.left ?? 0;
  const top = partial.top ?? 0;
  const width = partial.width ?? 0;
  const height = partial.height ?? 0;
  return { left, top, width, height, right: left + width, bottom: top + height };
}

describe('placePopover', () => {
  it('places the popover below-left-aligned in the normal case', () => {
    const anchor = rect({ left: 100, top: 100, width: 40, height: 20 });
    const pos = placePopover(anchor, { width: 288, height: 150 }, { width: 1280, height: 800 });
    expect(pos).toEqual({ left: 100, top: 128, above: false });
  });

  it('clamps to the right edge when the popover would overflow', () => {
    const anchor = rect({ left: 1220, top: 100, width: 40, height: 20 });
    const pos = placePopover(anchor, { width: 288, height: 150 }, { width: 1280, height: 800 });
    // 1280 - 288 - 8 = 984
    expect(pos.left).toBe(984);
    expect(pos.above).toBe(false);
  });

  it('clamps to the left edge when the anchor is near it', () => {
    const anchor = rect({ left: -50, top: 100, width: 40, height: 20 });
    const pos = placePopover(anchor, { width: 288, height: 150 }, { width: 1280, height: 800 });
    expect(pos.left).toBe(8);
  });

  it('flips above the anchor when there is not enough room below', () => {
    // Anchor near the bottom of a 800px-tall viewport; the fixed "?" button case.
    const anchor = rect({ left: 1180, top: 740, width: 56, height: 56 });
    const pos = placePopover(anchor, { width: 288, height: 150 }, { width: 1280, height: 800 });
    expect(pos.above).toBe(true);
    expect(pos.top).toBe(740 - 8 - 150);
  });

  it('stays below when there is not enough room above or below (best effort)', () => {
    const anchor = rect({ left: 100, top: 40, width: 40, height: 20 });
    const pos = placePopover(anchor, { width: 288, height: 500 }, { width: 1280, height: 400 });
    expect(pos.above).toBe(false);
    expect(pos.top).toBe(anchor.bottom + 8);
  });

  it('centers horizontally on the anchor when align is "center"', () => {
    const anchor = rect({ left: 600, top: 100, width: 24, height: 24 });
    const pos = placePopover(anchor, { width: 200, height: 80 }, { width: 1280, height: 800 }, { align: 'center' });
    // anchor center = 612, popup half-width = 100 => left = 512
    expect(pos.left).toBe(512);
  });
});

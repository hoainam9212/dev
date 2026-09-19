/** Minimal rect shape — a subset of DOMRect that is easy to construct in tests. */
export interface AnchorRect {
  left: number;
  top: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface PopoverPosition {
  /** Distance from the left edge of the viewport, in px, already clamped inside it. */
  left: number;
  /** Distance from the top edge of the viewport, in px. */
  top: number;
  /** True when the popover was flipped above the anchor for lack of room below. */
  above: boolean;
}

export interface PlacementOptions {
  /** Gap between the anchor and the popover, in px. Default 8. */
  gap?: number;
  /** Minimum distance kept from the viewport edges, in px. Default 8. */
  margin?: number;
  /** Horizontal alignment of the popover relative to the anchor. Default 'start'. */
  align?: 'start' | 'center';
}

const DEFAULT_GAP = 8;
const DEFAULT_MARGIN = 8;

/**
 * Computes a clamped position for a popover/tooltip anchored to `anchor`.
 *
 * - Horizontally, the popover starts aligned with the anchor's left edge (or
 *   centred on it when `align: 'center'`), then gets clamped so it never
 *   overflows the viewport: `left` stays within `[margin, viewport.width -
 *   popup.width - margin]`.
 * - Vertically, the popover renders below the anchor by default; it flips
 *   above the anchor when there isn't enough room below but there is enough
 *   room above.
 *
 * Pure function — no DOM access — so it is easy to unit test and reuse from
 * multiple components (TermLink, HelpTooltipLayer, ...).
 */
export function placePopover(
  anchor: AnchorRect,
  popup: Size,
  viewport: Size,
  opts: PlacementOptions = {},
): PopoverPosition {
  const gap = opts.gap ?? DEFAULT_GAP;
  const margin = opts.margin ?? DEFAULT_MARGIN;
  const align = opts.align ?? 'start';

  const idealLeft = align === 'center' ? anchor.left + anchor.width / 2 - popup.width / 2 : anchor.left;
  const maxLeft = Math.max(margin, viewport.width - popup.width - margin);
  const left = Math.min(Math.max(idealLeft, margin), maxLeft);

  const spaceBelow = viewport.height - anchor.bottom - gap;
  const spaceAbove = anchor.top - gap;
  const above = spaceBelow < popup.height && spaceAbove >= popup.height;
  const top = above ? anchor.top - gap - popup.height : anchor.bottom + gap;

  return { left, top, above };
}

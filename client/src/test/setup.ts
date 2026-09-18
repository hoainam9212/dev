import '@testing-library/jest-dom/vitest';

// jsdom has no canvas; components must handle a null context gracefully.
if (typeof HTMLCanvasElement !== 'undefined') {
  HTMLCanvasElement.prototype.getContext = (() => null) as unknown as HTMLCanvasElement['getContext'];
}

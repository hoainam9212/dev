import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import type { KeyStats } from '@office-neko/shared';
import { KeyHeatmap } from './KeyHeatmap';

describe('KeyHeatmap', () => {
  it('folds a shifted symbol into its base key', () => {
    const stats: KeyStats = { '!': { hit: 2, miss: 1 } };
    render(<KeyHeatmap stats={stats} />);
    const el = document.querySelector('[data-key="1"]');
    expect(el).toHaveAttribute('title', '1: 2 đúng, 1 sai');
  });

  it('combines the base key and its shifted symbol', () => {
    const stats: KeyStats = { '1': { hit: 1, miss: 0 }, '!': { hit: 0, miss: 1 } };
    render(<KeyHeatmap stats={stats} />);
    const el = document.querySelector('[data-key="1"]');
    expect(el).toHaveAttribute('title', '1: 1 đúng, 1 sai');
  });

  it('shows Space bar stats from the literal " " character', () => {
    const stats: KeyStats = { ' ': { hit: 5, miss: 2 } };
    render(<KeyHeatmap stats={stats} />);
    const el = document.querySelector('[data-key="space"]');
    expect(el).not.toBeNull();
    expect(el).toHaveAttribute('title', 'Space: 5 đúng, 2 sai');
  });
});

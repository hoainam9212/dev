import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SpotlightOverlay, spotlightSelector } from './SpotlightOverlay';

describe('spotlightSelector', () => {
  it('maps each spotlight kind', () => {
    expect(spotlightSelector({ helpId: 'home.bold' })).toBe('[data-help-id="home.bold"]');
    expect(spotlightSelector({ cell: 'B11' })).toBe('[data-cell="B11"], [data-testid="cell-B11"]');
    expect(spotlightSelector({ path: '/Tài liệu' })).toBe('[data-path="/Tài liệu"]');
    expect(spotlightSelector({ key: '"' })).toBe('[data-key="\\""]');
  });
});

describe('SpotlightOverlay', () => {
  it('draws a ring around the target element', () => {
    const root = document.createElement('div');
    root.innerHTML = '<button data-help-id="x">B</button>';
    document.body.appendChild(root);
    const btn = root.querySelector('button')!;
    btn.getBoundingClientRect = () => ({ left: 10, top: 20, width: 30, height: 40, right: 40, bottom: 60, x: 10, y: 20, toJSON() {} }) as DOMRect;
    render(<SpotlightOverlay target={{ helpId: 'x' }} root={root} />);
    const label = screen.getByText('🐾 Ở đây nè!');
    const box = label.parentElement!;
    expect(box.style.left).toBe('4px');
    expect(box.style.top).toBe('14px');
    expect(box.style.width).toBe('42px');
    expect(box.style.height).toBe('52px');
    root.remove();
  });

  it('renders nothing without a target', () => {
    render(<SpotlightOverlay target={null} root={document.body} />);
    expect(screen.queryByText('🐾 Ở đây nè!')).not.toBeInTheDocument();
  });
});

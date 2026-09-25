import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { activeTab, RibbonPanel, RibbonTabs } from './ribbon';

describe('RibbonTabs', () => {
  it('lists normal then contextual tabs and marks the open one', () => {
    const onPick = vi.fn();
    render(<RibbonTabs app="excel" tabs={['File', 'Home', 'Data'] as const} contextTabs={['Chart Design'] as const} active="Home" onPick={onPick} />);
    expect(screen.getAllByRole('tab').map((t) => t.textContent)).toEqual(['File', 'Home', 'Data', 'Chart Design']);
    expect(screen.getByRole('tab', { name: 'Home' })).toHaveAttribute('aria-selected', 'true');
    fireEvent.click(screen.getByRole('tab', { name: 'Data' }));
    expect(onPick).toHaveBeenCalledWith('Data');
  });

  it('paints the open tab and contextual tabs in the app accent', () => {
    render(<RibbonTabs app="excel" tabs={['Home', 'Data'] as const} contextTabs={['Chart Design'] as const} active="Home" onPick={vi.fn()} />);
    expect(screen.getByRole('tab', { name: 'Home' })).toHaveStyle({ color: 'rgb(16, 124, 65)', borderColor: 'rgb(16, 124, 65)' });
    expect(screen.getByRole('tab', { name: 'Chart Design' })).toHaveStyle({ color: 'rgb(16, 124, 65)' });
    expect(screen.getByRole('tab', { name: 'Data' })).not.toHaveStyle({ color: 'rgb(16, 124, 65)' });
  });

  it('keeps the tab strip from stealing the editor selection', () => {
    render(<RibbonTabs app="word" tabs={['Home'] as const} active="Home" onPick={vi.fn()} />);
    expect(fireEvent.mouseDown(screen.getByRole('tab', { name: 'Home' }))).toBe(false);
  });
});

describe('activeTab', () => {
  it('falls back when the picked contextual tab is gone', () => {
    expect(activeTab('Picture Format', ['Picture Format', 'Table Layout'], [], 'Home')).toBe('Home');
    expect(activeTab('Picture Format', ['Picture Format'], ['Picture Format'], 'Home')).toBe('Picture Format');
    expect(activeTab('Insert', ['Picture Format'], [], 'Home')).toBe('Insert');
  });
});

describe('RibbonPanel', () => {
  it('keeps a fixed minimum height', () => {
    render(<RibbonPanel><span>nội dung</span></RibbonPanel>);
    expect(screen.getByText('nội dung').parentElement).toHaveClass('min-h-24');
  });
});

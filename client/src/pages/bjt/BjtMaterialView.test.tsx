import { render, screen, within } from '@testing-library/react';
import { BjtMaterialView } from './BjtMaterialView';
import { Marked } from './PositionMark';
import { useSettings } from '../../store/settings';

beforeEach(() => useSettings.setState({ lang: 'vi' }));

describe('position marks 【1】–【4】', () => {
  it('renders marks in a text body as badges with an accessible name', () => {
    render(<BjtMaterialView material={{ kind: 'text', title: '案内【1】', body: '会議室は【2】です。\n受付は【3】。' }} />);
    const m = screen.getByTestId('bjt-material');
    expect(within(m).getAllByTestId('bjt-mark').map((b) => b.textContent)).toEqual(['1', '2', '3']);
    expect(within(m).getByLabelText('vị trí 2')).toBeInTheDocument();
    expect(m).not.toHaveTextContent('【');
    expect(m).toHaveTextContent('会議室は2です。');
  });

  it('renders marks in table cells and the note', () => {
    render(<BjtMaterialView material={{ kind: 'table', head: ['時間', '内容'], rows: [['10:00', '【4】']], note: '【1】は変更' }} />);
    expect(screen.getAllByTestId('bjt-mark').map((b) => b.textContent)).toEqual(['4', '1']);
  });

  it('leaves other brackets and numbers alone', () => {
    render(<Marked text="【5】と【重要】、1と2" />);
    expect(screen.queryByTestId('bjt-mark')).toBeNull();
    expect(screen.getByText('【5】と【重要】、1と2')).toBeInTheDocument();
  });

  it('uses the English label in English', () => {
    useSettings.setState({ lang: 'en' });
    render(<Marked text="【3】" />);
    expect(screen.getByLabelText('position 3')).toBeInTheDocument();
  });
});

describe('table with head: [] (floor plan, map)', () => {
  const grid = { kind: 'table' as const, title: '3階', head: [], rows: [['【1】', '', '会議室A'], ['', '', ''], ['受付', '【2】', 'エレベーター']] };

  it('is a plain grid: no header row, fixed equal columns, empty cells as blocks', () => {
    render(<BjtMaterialView material={grid} />);
    const table = screen.getByRole('table');
    expect(table.querySelector('thead')).toBeNull();
    expect(table).toHaveAttribute('data-grid');
    expect(table.className).toContain('table-fixed');
    expect(table.querySelectorAll('col')).toHaveLength(3);
    expect(table.querySelectorAll('td[data-empty]')).toHaveLength(4);
    expect(screen.getAllByTestId('bjt-mark')).toHaveLength(2);
  });

  it('keeps the header row for a normal table', () => {
    render(<BjtMaterialView material={{ kind: 'table', head: ['a', 'b'], rows: [['1', '2']] }} />);
    expect(screen.getByRole('table').querySelector('thead')).not.toBeNull();
    expect(screen.getByRole('table')).not.toHaveAttribute('data-grid');
  });
});

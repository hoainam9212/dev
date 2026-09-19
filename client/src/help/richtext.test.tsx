import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { RichText } from './RichText';
import { useHelp } from './helpStore';

describe('RichText', () => {
  beforeEach(() => useHelp.setState({ open: false, tab: 'glossary', entryId: null, query: '' }));

  it('renders bold text, lists and shortcuts', () => {
    render(<RichText text={'Bấm **Lưu** hoặc {{mod+s}}.\n\n- Một\n- Hai'} />);
    expect(screen.getByText('Lưu').tagName).toBe('STRONG');
    expect(screen.getByLabelText('Ctrl + S')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('opens a term popup and jumps to the glossary', () => {
    render(<RichText text="Cầm [[mouse|chuột]] nhé." />);
    fireEvent.click(screen.getByRole('button', { name: 'chuột' }));
    const dialog = screen.getByRole('dialog', { name: 'Mouse' });
    expect(dialog).toHaveTextContent('Chuột');
    fireEvent.click(screen.getByRole('button', { name: 'Xem thêm' }));
    expect(useHelp.getState()).toMatchObject({ open: true, tab: 'glossary', entryId: 'mouse' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes the popup when clicking outside', () => {
    render(<div><p>ngoài</p><RichText text="[[mouse|chuột]]" /></div>);
    fireEvent.click(screen.getByRole('button', { name: 'chuột' }));
    fireEvent.pointerDown(screen.getByText('ngoài'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('shows plain text for unknown terms', () => {
    render(<RichText text="[[khong-co|từ lạ]]" />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.getByText('từ lạ')).toBeInTheDocument();
  });
});

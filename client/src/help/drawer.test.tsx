import { describe, it, expect, beforeEach } from 'vitest';
import { screen, fireEvent, act } from '@testing-library/react';
import { HelpDrawer } from './HelpDrawer';
import { HelpButton } from './HelpButton';
import { useHelp } from './helpStore';
import { makeProfile, renderWithProfile } from '../test/utils';

const ui = (
  <>
    <HelpButton />
    <HelpDrawer />
  </>
);

describe('help drawer', () => {
  beforeEach(() => useHelp.setState({ open: false, tab: 'glossary', entryId: null, query: '' }));

  it('opens with F1 and searches without diacritics', () => {
    renderWithProfile(ui);
    fireEvent.keyDown(window, { key: 'F1' });
    expect(screen.getByRole('dialog', { name: 'Trợ giúp' })).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Tìm thuật ngữ'), { target: { value: 'thu muc' } });
    fireEvent.click(screen.getByRole('button', { name: /Folder/ }));
    expect(screen.getByRole('heading', { name: 'Folder' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: '← Quay lại' }));
    expect(screen.getByLabelText('Tìm thuật ngữ')).toBeInTheDocument();
  });

  it('filters glossary by OS', () => {
    renderWithProfile(ui, { profile: makeProfile({ os: 'mac' }) });
    fireEvent.click(screen.getByRole('button', { name: 'Trợ giúp' }));
    expect(screen.queryByRole('button', { name: /Recycle Bin/ })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Trash/ })).toBeInTheDocument();
  });

  it('shows lessons that use a term', () => {
    renderWithProfile(ui);
    act(() => useHelp.getState().openGlossary('mouse'));
    expect(screen.getByRole('link', { name: 'Làm quen với Mochi' })).toHaveAttribute('href', '/lesson/basics.welcome');
  });

  it('answers questions in Hỏi Mèo', () => {
    renderWithProfile(ui);
    act(() => useHelp.getState().openAsk());
    expect(screen.getByText('Câu hỏi hay gặp')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Câu hỏi của bạn'), { target: { value: 'cách copy như thế nào' } });
    expect(screen.getByText('Làm sao sao chép (copy) và dán (paste)?')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Copy — Sao chép/ })).toBeInTheDocument();
  });

  it('admits when it does not know', () => {
    renderWithProfile(ui);
    act(() => useHelp.getState().openAsk('zzzz qqqq'));
    expect(screen.getByText(/Mochi chưa biết câu này/)).toBeInTheDocument();
  });

  it('closes with Escape', () => {
    renderWithProfile(ui);
    act(() => useHelp.getState().openGlossary());
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('dialog', { name: 'Trợ giúp' })).not.toBeInTheDocument();
  });
});

import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { wordSim } from '@office-neko/shared';
import { describe, expect, it } from 'vitest';
import { WordDialogs } from './dialogs';

/** Nút ribbon giả mở hộp thoại Lưu, để thử trả focus khi đóng. */
function Harness() {
  const [state, setState] = useState(wordSim.wordInitial());
  return (
    <>
      <button type="button" onClick={() => setState((s) => wordSim.reduceWord(s, { type: 'openDialog', dialog: 'save' }))}>Save</button>
      <WordDialogs state={state} dispatch={(a) => setState((s) => wordSim.reduceWord(s, a))} now={0} />
    </>
  );
}

describe('WordDialogs – trợ năng', () => {
  it('hộp thoại có nhãn, focus ô Tên file; Esc đóng và trả focus về nút đã mở', async () => {
    render(<Harness />);
    screen.getByRole('button', { name: 'Save' }).focus();
    await userEvent.keyboard('{Enter}');
    const dlg = screen.getByRole('dialog', { name: 'Lưu văn bản' });
    expect(dlg).toHaveAttribute('aria-labelledby');
    expect(screen.getByRole('textbox')).toHaveFocus();
    await userEvent.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(screen.getByRole('button', { name: 'Save' })).toHaveFocus();
  });
});

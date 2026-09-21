import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { wordSim } from '@office-neko/shared';
import { WordSim } from './WordSim';

/**
 * TipTap cần một DOM thật để dựng ProseMirror view; trong jsdom nó chạy được
 * nhưng chậm và giòn. Test ở đây lo phần khung: trang A4, nút, và việc state đi
 * ra ngoài qua `onState`. Logic tài liệu đã được `shared` phủ kín.
 */
vi.mock('./Editor', () => ({
  Editor: ({ state }: { state: wordSim.WordState }) => (
    <div data-help-id="word.editor">{wordSim.plainText(state.doc)}</div>
  ),
}));

const props = (onState = vi.fn()) => ({
  initial: wordSim.wordInitial({ text: 'Kính gửi Quý công ty' }),
  onState,
  os: 'win' as const,
  spotlight: null,
});

describe('WordSim', () => {
  it('shows the document text on an A4 page', () => {
    render(<WordSim {...props()} />);
    expect(screen.getByText(/Kính gửi Quý công ty/)).toBeInTheDocument();
    expect(document.querySelector('[data-help-id="word.page"]')).not.toBeNull();
  });

  it('reports the state out as soon as it mounts', () => {
    const onState = vi.fn();
    render(<WordSim {...props(onState)} />);
    expect(onState.mock.calls.at(-1)?.[0]).toMatchObject({ doc: expect.any(Object) });
  });

  it('undoes the last change through the reducer', () => {
    const onState = vi.fn();
    const initial = wordSim.reduceWord(wordSim.wordInitial({ text: 'Cũ' }), { type: 'insertText', text: 'Mới ' });
    render(<WordSim initial={initial} onState={onState} os="win" spotlight={null} />);
    fireEvent.click(screen.getByRole('button', { name: /Hoàn tác/ }));
    const last = onState.mock.calls.at(-1)?.[0] as wordSim.WordState;
    expect(wordSim.plainText(last.doc)).toBe('Cũ');
    expect(screen.getByText('Cũ')).toBeInTheDocument();
  });
});

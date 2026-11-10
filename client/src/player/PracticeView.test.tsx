import { afterEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { GRADERS, type PracticeStep } from '@office-neko/shared';
import { SIMS } from '../sims/registry';
import type { SimProps } from '../sims/types';
import { renderWithProfile } from '../test/utils';
import { PracticeView } from './PracticeView';
import { initPlayer } from './playerReducer';

type FakeState = { clicked: boolean };
function FakeSim({ onState }: SimProps<FakeState>) {
  return <button type="button" onClick={() => onState({ clicked: true })}>Bấm tôi</button>;
}

const step: PracticeStep = {
  kind: 'practice', sim: 'mouse', task: 'Hãy bấm nút', initial: { clicked: false },
  checks: [{ need: 'click' }], hints: ['a', { helpId: 'player.check' }, ['c']], solution: [],
};

describe('PracticeView – trợ năng', () => {
  const saved = { sim: SIMS.mouse, grader: GRADERS.mouse };
  afterEach(() => {
    SIMS.mouse = saved.sim;
    GRADERS.mouse = saved.grader;
  });

  it('kết quả Kiểm tra nằm trong vùng aria-live có sẵn từ đầu, nên trình đọc màn hình đọc được', () => {
    SIMS.mouse = { kind: 'mouse', Component: FakeSim, reduce: (s: FakeState) => s };
    GRADERS.mouse = (s: FakeState) => ({ ok: s.clicked, messageVi: s.clicked ? 'Đã bấm nút' : 'Bạn chưa bấm nút' });
    renderWithProfile(<PracticeView step={step} state={initPlayer([step])} dispatch={vi.fn()} />);
    const live = screen.getByRole('status');
    expect(live).toHaveAttribute('aria-live', 'polite');
    expect(live).toBeEmptyDOMElement();
    fireEvent.click(screen.getByRole('button', { name: 'Kiểm tra' }));
    expect(live).toHaveTextContent('Bạn chưa bấm nút');
  });
});

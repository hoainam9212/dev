import { afterEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { GRADERS, pptSim, type PracticeStep } from '@office-neko/shared';
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

describe('PracticeView – bố cục bài PowerPoint', () => {
  const floats = (el: Element | null, stop: Element) => {
    const out: string[] = [];
    for (let e = el; e && e !== stop; e = e.parentElement) {
      const cls = e.getAttribute('class') ?? '';
      const pos = (e as HTMLElement).style?.position;
      if (/(^|\s)(absolute|fixed|sticky)(\s|$)/.test(cls) || /absolute|fixed|sticky/.test(pos ?? '')) out.push(cls || pos!);
    }
    return out;
  };

  it('nút Kiểm tra nằm dưới khung slide trong dòng chảy thường, không phủ lên khung', () => {
    const pptStep: PracticeStep = {
      kind: 'practice', sim: 'ppt', task: 'Chèn ngôi sao', initial: pptSim.pptInitial(),
      checks: [{ kind: 'hasElement', slide: 1, el: 'shape', shape: 'star' }], hints: ['a', { helpId: 'ppt.shapes' }, ['c']], solution: [],
    };
    const { container } = renderWithProfile(<PracticeView step={pptStep} state={initPlayer([pptStep])} dispatch={vi.fn()} />);
    const stage = container.querySelector('.ppt-stage')!;
    const check = screen.getByRole('button', { name: 'Kiểm tra' });
    expect(stage).not.toBeNull();
    // Nút không nằm trong sim (nơi khung slide có thể co giãn), và đứng sau khung slide.
    expect(stage.contains(check)).toBe(false);
    expect(check.closest('.ppt-stage, .ppt-canvas')).toBeNull();
    expect(stage.compareDocumentPosition(check) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    // Không lớp nào giữa nút và gốc PracticeView được định vị tuyệt đối/cố định để phủ lên khung.
    expect(floats(check, container)).toEqual([]);
    // Khung slide cũng không bị định vị tuyệt đối (sẽ tràn xuống hàng nút): giữ chỗ bằng aspect-ratio trong dòng chảy.
    expect(floats(stage, container)).toEqual([]);
  });
});

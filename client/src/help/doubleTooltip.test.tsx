import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import type { PracticeStep } from '@office-neko/shared';
import { HELP_IDS, LESSONS } from '../content';
import { SIMS } from '../sims/registry';

/**
 * Nút đã có gợi ý màu tối của app (HELP_IDS) thì không được mang thêm `title`: trình duyệt sẽ
 * hiện một ô trắng thứ hai gần như cùng chữ, người học thấy hai chú thích chồng nhau.
 */
function firstPractice(sim: string): PracticeStep {
  for (const l of Object.values(LESSONS)) {
    for (const s of l.steps) if (s.kind === 'practice' && s.sim === sim) return s;
  }
  throw new Error(`no ${sim} lesson`);
}

describe('one tooltip per control', () => {
  for (const sim of ['word', 'excel', 'ppt'] as const) {
    it(`${sim}: controls with an app tooltip carry no native title`, () => {
      const def = SIMS[sim]!;
      const { container } = render(<def.Component initial={firstPractice(sim).initial} onState={vi.fn()} os="win" spotlight={null} />);
      const doubled = [...container.querySelectorAll('[data-help-id]')]
        .filter((el) => HELP_IDS[el.getAttribute('data-help-id')!])
        .filter((el) => el.hasAttribute('title') || el.closest('[title]'))
        .map((el) => el.getAttribute('data-help-id'));
      expect(doubled).toEqual([]);
    });
  }
});

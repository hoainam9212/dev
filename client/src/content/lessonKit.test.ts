import { describe, it, expect } from 'vitest';
import { aichatSim, grade, typingSim } from '@office-neko/shared';
import { SIMS } from '../sims/registry';
import { aiPractice, keyActions, mousePractice, pptPractice, typingPractice } from './lessonKit';

describe('lessonKit', () => {
  it('turns raw keys into timed actions', () => {
    expect(keyActions('ab', 100, 0)).toEqual([
      { type: 'key', key: 'a', at: 0 },
      { type: 'key', key: 'b', at: 100 },
    ]);
  });

  it('builds a mouse practice whose solution passes', () => {
    const step = mousePractice({ game: 'drag', total: 3, task: 't', hint: 'h', steps: ['s'] });
    expect(step.hints[1]).toEqual({ helpId: 'mouse.basket' });
    let s = step.initial;
    for (const a of step.solution) s = SIMS.mouse!.reduce(s, a);
    expect(grade('mouse', s, step.checks).pass).toBe(true);
  });

  it('builds a Telex practice from raw keys', () => {
    const step = typingPractice({ task: 't', target: 'Việt Nam', raw: 'Vieejt Nam', ime: 'telex', hint: 'h', steps: ['s'] });
    let s = step.initial;
    for (const a of step.solution) s = typingSim.reduceTyping(s, a);
    expect(typingSim.typedText(s)).toBe('Việt Nam');
    expect(grade('keyboard', s, step.checks).pass).toBe(true);
  });

  it('builds a ppt practice whose setup leaves no undo history', () => {
    const step = pptPractice({
      slides: ['titleContent'],
      task: 't', hint: 'h', steps: ['s'], spotlight: { helpId: 'ppt.canvas' },
      checks: [{ kind: 'slideTitle', slide: 1, text: 'Đề' }],
      setup: (s0) => [{ type: 'startEditEl', id: s0.slides[0]!.els[0]!.id }, { type: 'setText', text: 'Đề' }, { type: 'commitEdit' }],
      solve: () => [],
    });
    expect(step.initial.past).toEqual([]);
    expect(step.initial.sel).toBeNull();
    expect(grade('ppt', step.initial, step.checks).pass).toBe(true);
  });

  it('pptPractice báo lỗi khi một bước dựng sẵn không làm gì (gõ vào slide không đang mở)', () => {
    expect(() =>
      pptPractice({
        slides: ['title', 'titleContent'],
        task: 't', hint: 'h', steps: ['s'], spotlight: { helpId: 'ppt.canvas' },
        checks: [{ kind: 'slideCount', count: 3 }],
        // Slide đang mở là slide 1, nên sửa tiêu đề slide 2 bị reducer bỏ qua.
        setup: (s0) => [{ type: 'startEditEl', id: s0.slides[1]!.els[0]!.id }],
        solve: () => [],
      }),
    ).toThrow(/setup.*startEditEl/);
  });

  it('aiPractice dựng bước aichat từ aiChatInitial, solution là solve(initial) và qua được', () => {
    const step = aiPractice({
      greeting: 'Chào bạn',
      replies: { good: 'G' },
      task: 't', hint: 'h', steps: ['s'], spotlight: { helpId: 'ai.composer' },
      checks: [{ kind: 'sent' }],
      solve: () => [{ type: 'setDraft', text: 'Viết cho tôi một email xin nghỉ phép' }, { type: 'send' }],
    });
    expect(step.sim).toBe('aichat');
    expect(step.initial).toEqual(aichatSim.aiChatInitial({ greeting: 'Chào bạn', replies: { good: 'G' } }));
    expect(step.solution).toHaveLength(2);
    expect(grade('aichat', step.initial, step.checks).pass).toBe(false);
    const end = step.solution.reduce((s, a) => SIMS.aichat!.reduce(s, a), step.initial);
    expect(grade('aichat', end, step.checks).pass).toBe(true);
  });
});

import { describe, it, expect } from 'vitest';
import { grade, typingSim } from '@office-neko/shared';
import { SIMS } from '../sims/registry';
import { keyActions, mousePractice, typingPractice } from './lessonKit';

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
});

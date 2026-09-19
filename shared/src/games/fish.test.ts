import { describe, it, expect } from 'vitest';
import { fallSpeed, fishInitial, reduceFish, spawnInterval, targetFish, type FishState } from './fish';

const words = ['meo', 'ca', 'chuot'];
const typeWord = (s: FishState, w: string) => [...w].reduce((acc, key) => reduceFish(acc, { type: 'key', key }), s);

describe('fish game', () => {
  it('spawns a fish on the first tick, deterministically', () => {
    const a = reduceFish(fishInitial(words, 7), { type: 'tick', dt: 16 });
    const b = reduceFish(fishInitial(words, 7), { type: 'tick', dt: 16 });
    expect(a.fish).toHaveLength(1);
    expect(a.fish).toEqual(b.fish);
    expect(words).toContain(a.fish[0]!.word);
    expect(a.spawnIn).toBe(spawnInterval(1));
  });

  it('catches a fish when the word is typed', () => {
    let s = reduceFish(fishInitial(words, 3), { type: 'tick', dt: 16 });
    const w = s.fish[0]!.word;
    s = typeWord(s, w.slice(0, 1));
    expect(targetFish(s)?.word).toBe(w);
    s = typeWord(s, w.slice(1));
    expect(s.fish).toHaveLength(0);
    expect(s.caught).toBe(1);
    expect(s.score).toBe(w.length * 10);
    expect(s.input).toBe('');
  });

  it('loses a life when a fish reaches the bottom and ends at zero lives', () => {
    let s = reduceFish(fishInitial(words, 1), { type: 'tick', dt: 16 });
    s = reduceFish(s, { type: 'tick', dt: Math.ceil(1 / fallSpeed(1)) + 5 });
    expect(s.lives).toBe(2);
    s = { ...s, lives: 1, fish: [{ id: 99, word: 'x', x: 0.5, y: 0.99 }], spawnIn: 1e9 };
    s = reduceFish(s, { type: 'tick', dt: 1000 });
    expect(s.over).toBe(true);
    expect(reduceFish(s, { type: 'key', key: 'x' })).toBe(s);
  });

  it('levels up every 8 catches', () => {
    let s: FishState = { ...fishInitial(words), caught: 7, fish: [{ id: 1, word: 'ca', x: 0.2, y: 0.1 }] };
    s = typeWord(s, 'ca');
    expect(s.level).toBe(2);
  });

  it('edits input with Backspace and Escape', () => {
    let s = typeWord(fishInitial(words), 'abc');
    s = reduceFish(s, { type: 'key', key: 'Backspace' });
    expect(s.input).toBe('ab');
    s = reduceFish(s, { type: 'key', key: 'Escape' });
    expect(s.input).toBe('');
  });
});

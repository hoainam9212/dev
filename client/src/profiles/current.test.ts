import { describe, it, expect, beforeEach, vi } from 'vitest';
import { clearCurrentProfileId, getCurrentProfileId, setCurrentProfileId, subscribeCurrentProfileId } from './current';

describe('current learner pointer', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('remembers the chosen learner', () => {
    expect(getCurrentProfileId()).toBeNull();
    setCurrentProfileId('p2');
    expect(getCurrentProfileId()).toBe('p2');
    clearCurrentProfileId();
    expect(getCurrentProfileId()).toBeNull();
  });

  it('tells subscribers about a change in this tab', () => {
    const seen: (string | null)[] = [];
    const off = subscribeCurrentProfileId(() => seen.push(getCurrentProfileId()));
    setCurrentProfileId('p1');
    clearCurrentProfileId();
    off();
    setCurrentProfileId('p3');
    expect(seen).toEqual(['p1', null]);
  });

  it('tells subscribers when another tab changes it', () => {
    const seen: string[] = [];
    const off = subscribeCurrentProfileId(() => seen.push('changed'));
    window.dispatchEvent(new StorageEvent('storage', { key: 'office-neko.currentProfileId' }));
    off();
    expect(seen).toEqual(['changed']);
  });

  it('survives a localStorage that throws', () => {
    const read = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('denied');
    });
    const write = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('denied');
    });
    expect(getCurrentProfileId()).toBeNull();
    expect(() => setCurrentProfileId('p1')).not.toThrow();
    read.mockRestore();
    write.mockRestore();
  });
});

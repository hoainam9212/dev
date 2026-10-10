import { describe, it, expect } from 'vitest';
import { ACCESSORIES, accessoriesUnlocked, newlyUnlocked } from './accessories';

describe('accessories', () => {
  it('has 5 accessories sorted by level', () => {
    expect(ACCESSORIES.map((a) => a.id)).toEqual(['bow', 'glasses', 'scarf', 'hat', 'crown']);
    expect(ACCESSORIES.map((a) => a.level)).toEqual([2, 3, 4, 6, 10]);
  });
  it('unlocks nothing at level 1', () => {
    expect(accessoriesUnlocked(1)).toEqual([]);
  });
  it('unlocks bow and glasses at level 3', () => {
    expect(accessoriesUnlocked(3)).toEqual(['bow', 'glasses']);
  });
  it('unlocks all at level 10', () => {
    expect(accessoriesUnlocked(10)).toHaveLength(5);
  });
  it('lists what a level-up just unlocked', () => {
    expect(newlyUnlocked(2, 4)).toEqual(['glasses', 'scarf']);
    expect(newlyUnlocked(4, 4)).toEqual([]);
    expect(newlyUnlocked(5, 6)).toEqual(['hat']);
  });
});

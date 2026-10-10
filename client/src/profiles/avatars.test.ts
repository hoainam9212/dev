import { describe, it, expect } from 'vitest';
import { wearable } from './avatars';

describe('wearable', () => {
  it('returns the accessory when the level allows it', () => {
    expect(wearable({ accessory: 'glasses', xp: 200 })).toBe('glasses'); // cấp 3
  });
  it('returns null when the level is too low', () => {
    expect(wearable({ accessory: 'crown', xp: 200 })).toBeNull();
  });
  it('returns null when nothing is worn or the id is unknown', () => {
    expect(wearable({ xp: 5000 })).toBeNull();
    expect(wearable({ accessory: 'wings' as never, xp: 5000 })).toBeNull();
  });
});

import { describe, it, expect } from 'vitest';
import { APP_NAME } from './index';

describe('shared', () => {
  it('exposes the app name', () => {
    expect(APP_NAME).toBe('Tin Học Cùng Mochi');
  });
});

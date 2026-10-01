import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, it, expect } from 'vitest';
import { SHOTS, parseArgs } from '../../scripts/real-shots.mjs';
import { LESSONS } from './index';

const ROOT = join(__dirname, '../../..');
const rows = (app: string) =>
  readFileSync(join(ROOT, `docs/real-shots-${app}.md`), 'utf8').split('\n').filter((l) => /^\| \d+ \|/.test(l));

describe('real-shots', () => {
  it('danh sách gửi người dùng và tên file của công cụ khớp nhau từng dòng', () => {
    for (const app of ['excel', 'ppt'] as const) {
      expect(rows(app).map((r) => r.split('|')[2]!.trim())).toEqual(SHOTS[app]);
    }
    expect(SHOTS.word).toHaveLength(9);
  });

  it('cột "Dùng cho bài" chỉ ghi bài có thật', () => {
    for (const app of ['excel', 'ppt'] as const) {
      for (const r of rows(app)) {
        for (const id of r.split('|')[5]!.split(',').map((s) => s.trim())) expect(LESSONS, `${app}: ${id}`).toHaveProperty([id]);
      }
    }
  });

  it('đọc tham số: có app hoặc không', () => {
    expect(parseArgs(['excel', 'C:/a.xlsx'])).toEqual({ app: 'excel', file: 'C:/a.xlsx' });
    expect(parseArgs(['C:/a.xlsx'])).toEqual({ app: 'word', file: 'C:/a.xlsx' });
    expect(() => parseArgs(['visio', 'C:/a.xlsx'])).toThrow(/word, excel hoặc ppt/);
    expect(() => parseArgs([])).toThrow();
  });
});

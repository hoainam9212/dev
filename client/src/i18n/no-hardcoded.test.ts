import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { expect, it } from 'vitest';
import { PENDING } from './pending-files';

const SRC = join(__dirname, '..');
const VIETNAMESE = /[ăâđêôơưàáảãạằắẳẵặầấẩẫậèéẻẽẹềếểễệìíỉĩịòóỏõọồốổỗộờớởỡợùúủũụừứửữựỳýỷỹỵ]/i;
const COMMENT = ['//', '*', '/*', '{/*'];

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (/\.tsx?$/.test(name)) out.push(relative(SRC, full).split(sep).join('/'));
  }
  return out;
}

function checked(file: string): boolean {
  return !file.startsWith('i18n/') && !file.startsWith('test/') && !/\.test\./.test(file) && !PENDING.includes(file);
}

it('has no Vietnamese literals outside i18n/ (except files still pending migration)', () => {
  const problems: string[] = [];
  for (const file of walk(SRC).filter(checked)) {
    readFileSync(join(SRC, file), 'utf8')
      .split('\n')
      .forEach((line, i) => {
        const text = line.trim();
        if (COMMENT.some((c) => text.startsWith(c))) return;
        if (VIETNAMESE.test(text)) problems.push(`${file}:${i + 1}: ${text}`);
      });
  }
  expect(problems, problems.join('\n')).toEqual([]);
});

it('lists only files that exist', () => {
  const files = walk(SRC);
  expect(PENDING.filter((p) => !files.includes(p))).toEqual([]);
});

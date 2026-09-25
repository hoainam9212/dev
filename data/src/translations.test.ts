import fs from 'node:fs';
import path from 'node:path';
import { OUT_DIR, TRANSLATIONS_DIR } from '../scripts/sources';
import { loadBuiltSources, readTrFiles } from './translate';
import { checkTranslations } from './translate-check';

const built = fs.existsSync(path.join(OUT_DIR, 'vocab/n5.json'));

it.skipIf(!built)('every committed translation passes the check', () => {
  const { errors } = checkTranslations(readTrFiles(TRANSLATIONS_DIR), loadBuiltSources(OUT_DIR));
  expect(errors.map((e) => `${e.file} ${e.key}: ${e.msg}`)).toEqual([]);
});

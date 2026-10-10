import { describe, it, expect, beforeEach } from 'vitest';
import { excelSim, pptSim, wordSim } from '@office-neko/shared';
import { db } from '../db/db';
import { createProfile } from '../profiles/manage';
import { resetDb } from '../test/utils';
import { blankState, createDoc, deleteDoc, getDoc, listDocs, putDocState, renameDoc, saveDocState, SANDBOX_SIMS } from './docs';

const learner = (name = 'An') => createProfile({ name, os: 'win', dailyGoalMin: 10, avatar: 'cam' });
const t = (min: number) => new Date(2026, 9, 10, 10, min);

describe('sandbox docs', () => {
  beforeEach(resetDb);

  it('names new docs per kind, counting only this learner', async () => {
    const a = await learner('A');
    const b = await learner('B');
    expect((await createDoc(a.id, 'word', t(0))).name).toBe('Văn bản 1');
    expect((await createDoc(a.id, 'word', t(1))).name).toBe('Văn bản 2');
    expect((await createDoc(a.id, 'excel', t(2))).name).toBe('Bảng tính 1');
    expect((await createDoc(b.id, 'word', t(3))).name).toBe('Văn bản 1');
    expect((await createDoc(b.id, 'ppt', t(4))).name).toBe('Bài trình chiếu 1');
  });

  it('lists the most recently edited first', async () => {
    const a = await learner();
    const d1 = await createDoc(a.id, 'word', t(0));
    const d2 = await createDoc(a.id, 'excel', t(1));
    expect((await listDocs(a.id)).map((d) => d.id)).toEqual([d2.id, d1.id]);
    await saveDocState(a.id, d1.id, blankState('word'), t(5));
    expect((await listDocs(a.id)).map((d) => d.id)).toEqual([d1.id, d2.id]);
  });

  it('keeps learners apart', async () => {
    const a = await learner('A');
    const b = await learner('B');
    const d = await createDoc(a.id, 'word', t(0));
    expect(await listDocs(b.id)).toEqual([]);
    expect(await getDoc(b.id, d.id)).toBeUndefined();
    await saveDocState(b.id, d.id, { hacked: true }, t(1));
    await renameDoc(b.id, d.id, 'Của B');
    await deleteDoc(b.id, d.id);
    expect(await getDoc(a.id, d.id)).toMatchObject({ name: 'Văn bản 1', state: null });
  });

  it('drops undo history and transient UI when saving', async () => {
    const a = await learner();
    const d = await createDoc(a.id, 'ppt', t(0));
    const s = { ...pptSim.pptInitial(), past: [{ fake: 1 }], show: { at: 0, from: 0 }, dialog: 'save' };
    await saveDocState(a.id, d.id, s, t(1));
    const saved = (await getDoc(a.id, d.id))!.state as pptSim.PptState;
    expect(saved.past).toEqual([]);
    expect(saved.show).toBeNull();
    expect(saved.dialog).toBeNull();
    expect(saved.slides).toEqual(s.slides);
  });

  it('putDocState writes the state in one put, trimmed like saveDocState', async () => {
    const a = await learner();
    const d = await createDoc(a.id, 'word', t(0));
    await putDocState(d, { ...wordSim.wordInitial(), past: [{ x: 1 }] }, t(9));
    const saved = await getDoc(a.id, d.id);
    expect((saved?.state as wordSim.WordState).past).toEqual([]);
    expect(saved).toMatchObject({ name: 'Văn bản 1', profileId: a.id, updatedAt: t(9).toISOString() });
  });

  it('keeps the old name when renaming to blanks', async () => {
    const a = await learner();
    const d = await createDoc(a.id, 'word', t(0));
    await renameDoc(a.id, d.id, '   ');
    expect((await getDoc(a.id, d.id))?.name).toBe('Văn bản 1');
    await renameDoc(a.id, d.id, '  Thư mời  ');
    expect((await getDoc(a.id, d.id))?.name).toBe('Thư mời');
  });

  it('deletes only the chosen doc', async () => {
    const a = await learner();
    const d1 = await createDoc(a.id, 'word', t(0));
    const d2 = await createDoc(a.id, 'word', t(1));
    await deleteDoc(a.id, d1.id);
    expect((await listDocs(a.id)).map((d) => d.id)).toEqual([d2.id]);
    expect(await db.sandboxDocs.count()).toBe(1);
  });

  it('blank states survive their own reducer', () => {
    expect(SANDBOX_SIMS.map((s) => s.sim)).toEqual(['word', 'excel', 'ppt']);
    const w = wordSim.reduceWord(blankState('word') as wordSim.WordState, { type: 'insertText', text: 'Xin chào' });
    expect(w.past).toHaveLength(1);
    const e = excelSim.reduceExcel(blankState('excel') as excelSim.WorkbookState, { type: 'setCell', cell: 'A1', raw: '5' });
    expect(e.sheets[0]!.cells['0,0'] ?? Object.values(e.sheets[0]!.cells)[0]).toMatchObject({ raw: '5' });
    const p = pptSim.reducePpt(blankState('ppt') as pptSim.PptState, { type: 'addSlide' });
    expect(p.slides).toHaveLength(2);
  });
});

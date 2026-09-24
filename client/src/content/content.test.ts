import { describe, it, expect } from 'vitest';
import { extractTermKeys, grade, GRADERS, typingSim, type Lesson, type PracticeStep } from '@office-neko/shared';
import { FAQ, GLOSSARY, HELP_IDS, LESSONS, TRACKS, findTerm } from './index';
import { SIMS } from '../sims/registry';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

const PUBLIC = join(__dirname, '../../public');

const lessons = Object.values(LESSONS);

function textsOf(l: Lesson): string[] {
  return l.steps.flatMap((s) =>
    s.kind === 'explain'
      ? [s.body]
      : s.kind === 'quiz'
        ? [s.question, ...s.choices, s.why]
        : s.kind === 'realShot'
          ? [s.caption, ...s.marks.map((m) => m.label)]
          : [s.task, s.hints[0], ...s.hints[2]],
  ).concat(l.osNote ? [l.osNote.win ?? '', l.osNote.mac ?? ''] : []);
}

describe('content', () => {
  it('uses lesson ids as keys', () => {
    for (const [k, l] of Object.entries(LESSONS)) expect(l.id).toBe(k);
  });

  it('places every lesson in exactly one chapter of its own track', () => {
    const seen = new Map<string, number>();
    for (const t of TRACKS) {
      for (const c of t.chapters) {
        for (const id of c.lessonIds) {
          const l = LESSONS[id];
          expect(l, `missing lesson ${id}`).toBeDefined();
          expect(l?.trackId).toBe(t.id);
          expect(l?.chapterId).toBe(c.id);
          seen.set(id, (seen.get(id) ?? 0) + 1);
        }
      }
    }
    for (const l of lessons) expect(seen.get(l.id), `${l.id} not in exactly one chapter`).toBe(1);
  });

  it('has unique track orders and glossary/faq ids', () => {
    expect(new Set(TRACKS.map((t) => t.order)).size).toBe(TRACKS.length);
    expect(new Set(GLOSSARY.map((g) => g.id)).size).toBe(GLOSSARY.length);
    expect(new Set(FAQ.map((f) => f.id)).size).toBe(FAQ.length);
  });

  it('glossary lessonIds point to real lessons', () => {
    for (const g of GLOSSARY) for (const id of g.lessonIds) expect(LESSONS[id], `${g.id} → ${id}`).toBeDefined();
  });

  it('resolves every [[term]] reference', () => {
    const texts = [...lessons.flatMap(textsOf), ...FAQ.map((f) => f.a), ...GLOSSARY.map((g) => g.explain)];
    const missing = texts.flatMap(extractTermKeys).filter((k) => !findTerm(k));
    expect(missing).toEqual([]);
  });

  it('has valid quiz answers', () => {
    for (const l of lessons) {
      for (const s of l.steps) {
        if (s.kind === 'quiz') expect(s.answer >= 0 && s.answer < s.choices.length, `${l.id}: ${s.question}`).toBe(true);
      }
    }
  });

  it('practice steps are wired up and their solutions pass', () => {
    for (const l of lessons) {
      for (const s of l.steps) {
        if (s.kind !== 'practice') continue;
        const step = s as PracticeStep;
        const def = SIMS[step.sim];
        expect(step.checks.length, `${l.id}: no checks`).toBeGreaterThan(0);
        expect(def, `${l.id}: sim ${step.sim} not registered`).toBeDefined();
        expect(GRADERS[step.sim], `${l.id}: grader ${step.sim} missing`).toBeDefined();
        const spot = step.hints[1];
        if ('helpId' in spot) expect(HELP_IDS[spot.helpId], `${l.id}: helpId ${spot.helpId}`).toBeDefined();
        else if ('path' in spot) expect(spot.path.length, `${l.id}: empty path spotlight`).toBeGreaterThan(0);
        else if ('key' in spot) expect(spot.key.length, `${l.id}: empty key spotlight`).toBeGreaterThan(0);
        expect(step.hints[2].length, `${l.id}: empty step-by-step hint (hints[2])`).toBeGreaterThan(0);
        if (step.sim === 'keyboard') {
          for (const a of step.solution as typingSim.TypingAction[]) {
            if (a.type !== 'key') continue;
            expect(a.key === 'Backspace' || /^[\x20-\x7e]$/.test(a.key), `${l.id}: untypable key "${a.key}" in solution`).toBe(true);
          }
        }
        // PracticeView chấm liên tục: đề đạt sẵn thì người học chưa làm gì đã "Giỏi quá!".
        expect(grade(step.sim, step.initial, step.checks).pass, `${l.id}: passes before the learner does anything`).toBe(false);
        let state = step.initial;
        for (const a of step.solution) state = def!.reduce(state, a);
        expect(grade(step.sim, state, step.checks).pass, `${l.id}: solution does not pass`).toBe(true);
      }
    }
  });

  it('real screenshots exist and their marks stay inside the picture', () => {
    for (const l of lessons) {
      for (const s of l.steps) {
        if (s.kind !== 'realShot') continue;
        expect(existsSync(join(PUBLIC, s.image)), `${l.id}: missing ${s.image}`).toBe(true);
        expect(s.marks.length, `${l.id}: no marks`).toBeGreaterThan(0);
        for (const m of s.marks) {
          expect(Math.min(m.x, m.y, m.w, m.h), `${l.id}: ${m.label}`).toBeGreaterThanOrEqual(0);
          expect(m.x + m.w, `${l.id}: ${m.label}`).toBeLessThanOrEqual(100);
          expect(m.y + m.h, `${l.id}: ${m.label}`).toBeLessThanOrEqual(100);
        }
      }
    }
    expect(LESSONS['word.bold']?.steps.some((s) => s.kind === 'realShot')).toBe(true);
  });
});

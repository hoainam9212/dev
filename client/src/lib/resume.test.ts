// "Continue" on the home page (and the phone's "Continue" shortcut) goes back to where the learner left off.
import { beforeEach, expect, it } from 'vitest';
import { lastPlace, noteVisit, resumePath, saveBookPlace } from './resume';

beforeEach(() => localStorage.clear());

const book = { bookId: 'q8', testId: 's2', i: 11, title: 'Quyển 8', testTitle: 'セクション2' };

it('remembers the last lesson page, not the hubs', () => {
  expect(resumePath()).toBe('/learn');
  noteVisit('/kanji');
  for (const hub of ['/', '/learn', '/review', '/me', '/progress', '/settings', '/login']) noteVisit(hub);
  expect(lastPlace()).toMatchObject({ kind: 'page', path: '/kanji' });
  expect(resumePath()).toBe('/kanji');
});

it('remembers the question of a book being practised; opening the books page keeps it', () => {
  saveBookPlace(book);
  noteVisit('/bjt/sach');
  noteVisit('/bjt');
  expect(lastPlace()).toMatchObject({ kind: 'book', bookId: 'q8', i: 11 });
  expect(resumePath()).toBe('/bjt/sach?resume=1');
  noteVisit('/vocab'); // studying something else afterwards wins
  expect(resumePath()).toBe('/vocab');
});

it('survives a broken store', () => {
  localStorage.setItem('ns.resume', '{oops');
  expect(lastPlace()).toBeNull();
  expect(resumePath()).toBe('/learn');
});

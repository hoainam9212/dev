import { act, renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, expect, it } from 'vitest';
import { db } from '../../db/db';
import { useBjt } from '../../store/bjt';
import { useBookStats } from './useBookStats';

const book = {
  id: 'tb',
  title: 'Test book',
  pages: 1,
  audio: [],
  tests: [{ id: 't1', title: 'Test 1', questions: [{ no: 1, section: 'goi', n: 1, page: 1, answer: 2 }, { no: 2, section: 'goi', n: 2, page: 1, answer: 3 }] }],
};

beforeEach(() => useBjt.setState({ answers: {}, runs: {}, startDate: null }));
afterEach(async () => {
  await db.books.clear();
});

it('is empty without books, then follows the stored books and the book answers', async () => {
  const { result } = renderHook(() => useBookStats());
  expect(result.current.bySection.goi).toEqual({ answered: 0, correct: 0 });
  expect(result.current.wrong).toBe(0);
  expect(result.current.runs).toEqual([]);

  await act(async () => {
    await db.books.put({ id: 'tb', title: 'Test book', book, bytes: 1, importedAt: '2026-11-13T00:00:00Z' });
    useBjt.setState({
      answers: { 'book:tb:t1:1': true, 'book:tb:t1:2': false },
      runs: { 'book:tb:t1': [{ at: '2026-11-13T00:00:00Z', correct: 1, total: 2, seconds: 60 }] },
    });
  });
  await waitFor(() => expect(result.current.bySection.goi).toEqual({ answered: 2, correct: 1 }));
  expect(result.current.wrong).toBe(1);
  expect(result.current.runs.map((r) => [r.book, r.test, r.last.correct])).toEqual([['Test book', 'Test 1', 1]]);
});

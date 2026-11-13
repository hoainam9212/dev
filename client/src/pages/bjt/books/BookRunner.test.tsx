import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { db } from '../../../db/db';
import { useBjt } from '../../../store/bjt';
import { parseBook } from './book';
import { importBook } from './library';
import { BookRunner } from './BookRunner';
import { BooksPage } from './BooksPage';
import { makeZip } from './zip.testutil';

const enc = new TextEncoder();
const index = {
  id: 'q4',
  title: 'Quyển 4',
  pages: 12,
  audio: [{ file: 'audio/a003.mp3', seconds: 30 }],
  tests: [
    {
      id: 'mogi',
      title: '模擬テスト',
      questions: [
        { no: 1, section: 'bamen', n: 1, page: 9, answer: 1, audio: 'audio/a003.mp3', explain: 'Ảnh là buổi phỏng vấn cá nhân.', keys: [{ ja: '面接', reading: 'めんせつ', vi: 'phỏng vấn' }], level: 1, explainPage: 12 },
        { no: 2, section: 'goi', n: 1, page: 10, answer: 4, explain: 'Cụm cố định 難色を示す.', level: 3, j1plus: true },
      ],
    },
  ],
};
const book = parseBook(JSON.stringify(index));
const test0 = book.tests[0]!;
const zip = () =>
  makeZip([
    ['book.json', enc.encode(JSON.stringify(index))],
    ['pages/p0009.jpg', new Uint8Array([1])],
    ['pages/p0010.jpg', new Uint8Array([2])],
    ['pages/p0012.jpg', new Uint8Array([3])],
    ['audio/a003.mp3', new Uint8Array([4])],
  ]);

beforeAll(() => {
  URL.createObjectURL = vi.fn(() => 'blob:x');
  URL.revokeObjectURL = vi.fn();
  HTMLMediaElement.prototype.play = vi.fn(() => Promise.resolve());
});
beforeEach(async () => {
  useBjt.setState({ answers: {}, runs: {} });
  await importBook(zip());
});
afterEach(async () => {
  await db.books.clear();
  await db.bookFiles.clear();
});

describe('BookRunner, practice', () => {
  it('shows the page and recording, then the explanation after an answer', async () => {
    render(<BookRunner book={book} test={test0} onExit={() => {}} />);
    expect(await screen.findByTestId('book-page')).toBeInTheDocument();
    expect(screen.getByTestId('book-audio')).toHaveAttribute('controls');
    fireEvent.click(screen.getByRole('button', { name: '2' }));
    const fb = screen.getByTestId('book-feedback');
    expect(fb).toHaveTextContent('Chưa đúng. Đáp án: 1');
    expect(fb).toHaveTextContent('phỏng vấn cá nhân');
    expect(fb).toHaveTextContent('面接');
    expect(useBjt.getState().answers['book:q4:mogi:1']).toBe(false);
    fireEvent.click(within(fb).getByRole('button', { name: /trang 12/ }));
    await waitFor(() => expect(within(fb).getByTestId('book-page')).toBeInTheDocument());
  });

  it('can practise one section only', () => {
    render(<BookRunner book={book} test={test0} sections={['goi']} onExit={() => {}} />);
    expect(screen.getByText('Câu 1/1')).toBeInTheDocument();
    expect(screen.queryByTestId('book-audio')).toBeNull();
  });
});

describe('BookRunner, timed test', () => {
  it('plays the recording by itself, hides answers, scores and saves the run', async () => {
    render(<BookRunner book={book} test={test0} exam onExit={() => {}} />);
    expect(screen.getByTestId('book-clock')).toHaveTextContent('75:00'); // listening + reading present: 45 + 30 minutes
    expect(screen.getByTestId('book-audio')).not.toHaveAttribute('controls');
    await waitFor(() => expect(HTMLMediaElement.prototype.play).toHaveBeenCalled());
    fireEvent.click(screen.getByRole('button', { name: '1' }));
    expect(screen.queryByTestId('book-feedback')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: /Câu tiếp/ }));
    fireEvent.click(screen.getByRole('button', { name: '3' }));
    fireEvent.click(screen.getByRole('button', { name: 'Nộp bài' }));
    const result = screen.getByTestId('book-result');
    expect(result).toHaveTextContent('Đúng 1/2');
    expect(result).toHaveTextContent('Cụm cố định 難色を示す.');
    expect(useBjt.getState().runs['book:q4:mogi']).toHaveLength(1);
    expect(useBjt.getState().answers).toMatchObject({ 'book:q4:mogi:1': true, 'book:q4:mogi:2': false });
  });
});

describe('BooksPage', () => {
  it('lists imported books with a timed test, practice and per-section buttons', async () => {
    render(<BooksPage />, { wrapper: MemoryRouter });
    const card = await screen.findByTestId('book-card');
    expect(card).toHaveTextContent('Quyển 4');
    expect(within(card).getByRole('button', { name: /Thi thử 75 phút/ })).toBeInTheDocument();
    fireEvent.click(within(card).getByRole('button', { name: /語彙・文法/ }));
    expect(screen.getByTestId('book-runner')).toHaveTextContent('語彙・文法 · 1番');
  });

  it('imports a picked .zip and says so, or explains why not', async () => {
    await db.books.clear();
    render(<BooksPage />, { wrapper: MemoryRouter });
    expect(await screen.findByText('Chưa có sách nào trên máy này.')).toBeInTheDocument();
    const input = screen.getByTestId('book-file');
    await act(async () => {
      fireEvent.change(input, { target: { files: [new File([zip()], 'q4.zip')] } });
    });
    expect(await screen.findByRole('status')).toHaveTextContent('Đã nhập: Quyển 4');
    await act(async () => {
      fireEvent.change(input, { target: { files: [new File(['hello there, not a zip, definitely not'], 'x.zip')] } });
    });
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('File này không phải .zip.'));
  });
});

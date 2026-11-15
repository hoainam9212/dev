// On the phone the app remembers where each book's .zip is, so a book can be opened again with one tap.
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { db } from '../../../db/db';
import { makeZip } from './zip.testutil';

const { native } = vi.hoisted(() => ({
  native: {
    pick: vi.fn(),
    copy: vi.fn(),
    clean: vi.fn(async () => {}),
    release: vi.fn(async () => {}),
  },
}));
vi.mock('@capacitor/core', () => ({
  Capacitor: { isNativePlatform: () => true, convertFileSrc: (p: string) => `https://localhost/_capacitor_file_${p}` },
  registerPlugin: () => native,
}));

import { forgetFile, recentFiles, rememberFile } from './bookFiles';
import { BooksPage } from './BooksPage';

const enc = new TextEncoder();
const zipOf = (id: string, title: string) =>
  makeZip([
    ['book.json', enc.encode(JSON.stringify({ id, title, pages: 1, tests: [{ id: 't', title: 'Đề', questions: [{ no: 1, section: 'goi', n: 1, page: 1, answer: 1 }] }] }))],
    ['pages/p0001.jpg', new Uint8Array([1])],
  ]);
const entry = (uri: string, bookId: string, title = bookId) => ({ uri, name: `${bookId}.zip`, size: 1048576 * 3, bookId, title, openedAt: '2026-11-15T00:00:00Z' });

let served: Blob;
beforeEach(() => {
  localStorage.clear();
  vi.clearAllMocks();
  native.copy.mockResolvedValue({ path: '/cache/book-import.zip', size: 10 });
  vi.stubGlobal('fetch', vi.fn(async () => ({ ok: true, blob: async () => served })));
});
afterEach(async () => {
  vi.unstubAllGlobals();
  await db.books.clear();
  await db.bookFiles.clear();
});

describe('remembered files', () => {
  it('keeps the newest first, one entry per book and per file', () => {
    rememberFile(entry('content://a', 'q4'));
    rememberFile(entry('content://b', 't1'));
    rememberFile(entry('content://c', 'q4')); // a newer zip of the same book replaces the old place
    expect(recentFiles().map((f) => f.uri)).toEqual(['content://c', 'content://b']);
    expect(native.release).toHaveBeenCalledWith({ uri: 'content://a' }); // the replaced place gives its permission back
    forgetFile('content://b');
    expect(recentFiles().map((f) => f.uri)).toEqual(['content://c']);
    expect(native.release).toHaveBeenCalledWith({ uri: 'content://b' });
  });

  it('survives a broken store', () => {
    localStorage.setItem('ns.bookRecent', '{oops');
    expect(recentFiles()).toEqual([]);
  });
});

describe('BooksPage on the phone', () => {
  const page = () =>
    render(
      <MemoryRouter>
        <BooksPage />
      </MemoryRouter>,
    );

  it('picking a file imports it and remembers where it is', async () => {
    served = zipOf('q4', 'Quyển 4');
    native.pick.mockResolvedValue({ uri: 'content://docs/q4', name: 'q4.zip', size: 2097152 });
    page();
    fireEvent.click(screen.getByRole('button', { name: 'Chọn file .zip' }));
    expect(await screen.findByText('Đã nhập: Quyển 4')).toBeInTheDocument();
    expect(native.copy).toHaveBeenCalledWith({ uri: 'content://docs/q4' });
    expect(fetch).toHaveBeenCalledWith('https://localhost/_capacitor_file_/cache/book-import.zip');
    expect(native.clean).toHaveBeenCalled();
    expect(recentFiles()).toMatchObject([{ uri: 'content://docs/q4', name: 'q4.zip', bookId: 'q4', title: 'Quyển 4' }]);
  });

  it('a cancelled picker says nothing', async () => {
    native.pick.mockRejectedValue(Object.assign(new Error('cancelled'), { code: 'cancelled' }));
    page();
    fireEvent.click(screen.getByRole('button', { name: 'Chọn file .zip' }));
    await waitFor(() => expect(native.pick).toHaveBeenCalled());
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(native.copy).not.toHaveBeenCalled();
  });

  it('one tap on a remembered file opens that book again', async () => {
    rememberFile(entry('content://docs/t1', 't1', 'T1 体験テスト'));
    served = zipOf('t1', 'T1 体験テスト');
    page();
    fireEvent.click(await screen.findByRole('button', { name: /Mở lại T1 体験テスト/ }));
    expect(await screen.findByText('Đã nhập: T1 体験テスト')).toBeInTheDocument();
    expect(native.pick).not.toHaveBeenCalled();
    expect(native.copy).toHaveBeenCalledWith({ uri: 'content://docs/t1' });
    expect((await db.books.get('t1'))?.title).toBe('T1 体験テスト');
  });

  it('a file that was moved or deleted says so and can be forgotten', async () => {
    rememberFile(entry('content://docs/gone', 'old', 'Sách cũ'));
    native.copy.mockRejectedValue(Object.assign(new Error('gone'), { code: 'gone' }));
    page();
    fireEvent.click(await screen.findByRole('button', { name: /Mở lại Sách cũ/ }));
    expect(await screen.findByRole('status')).toHaveTextContent('Không mở được file này nữa');
    fireEvent.click(screen.getByRole('button', { name: 'Bỏ Sách cũ khỏi danh sách' }));
    expect(screen.queryByRole('button', { name: /Mở lại Sách cũ/ })).not.toBeInTheDocument();
    expect(recentFiles()).toEqual([]);
  });

  it('a copy that cannot be written (phone full) is not blamed on the file', async () => {
    rememberFile(entry('content://docs/q4', 'q4', 'Quyển 4'));
    native.copy.mockRejectedValue(Object.assign(new Error('failed'), { code: 'failed' }));
    page();
    fireEvent.click(await screen.findByRole('button', { name: /Mở lại Quyển 4/ }));
    expect(await screen.findByRole('status')).toHaveTextContent('Không nhập được sách này.');
  });
});

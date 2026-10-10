import { describe, it, expect, beforeEach } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { db } from '../db/db';
import { createProfile } from '../profiles/manage';
import { createDoc } from '../sandbox/docs';
import { makeProfile, renderWithProfile, resetDb } from '../test/utils';
import { SandboxPage } from './SandboxPage';

function Where() {
  return <p data-testid="where">{useLocation().pathname}</p>;
}

const renderPage = () =>
  renderWithProfile(
    <Routes>
      <Route path="/sandbox" element={<SandboxPage />} />
      <Route path="/sandbox/:id" element={<Where />} />
    </Routes>,
    { route: '/sandbox' },
  );

describe('SandboxPage', () => {
  beforeEach(async () => {
    await resetDb();
    await createProfile({ name: 'An', os: 'win', dailyGoalMin: 10, avatar: 'cam' });
  });

  it('offers three kinds of new file and lists existing ones', async () => {
    await createDoc('p1', 'excel');
    renderPage();
    expect(screen.getByRole('button', { name: /Word – Văn bản/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Excel – Bảng tính/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /PowerPoint – Trình chiếu/ })).toBeInTheDocument();
    expect(await screen.findByText('Bảng tính 1')).toBeInTheDocument();
  });

  it('creates a Word file and opens it', async () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: /Word – Văn bản/ }));
    await waitFor(() => expect(screen.getByTestId('where').textContent).toMatch(/^\/sandbox\/.+/));
    const [doc] = await db.sandboxDocs.toArray();
    expect(screen.getByTestId('where')).toHaveTextContent(`/sandbox/${doc!.id}`);
    expect(doc).toMatchObject({ profileId: 'p1', sim: 'word', name: 'Văn bản 1' });
  });

  it('asks before deleting', async () => {
    await createDoc('p1', 'word');
    renderPage();
    fireEvent.click(await screen.findByRole('button', { name: 'Xoá Văn bản 1' }));
    const dialog = screen.getByRole('alertdialog');
    expect(dialog).toHaveTextContent('Xoá «Văn bản 1»? Không lấy lại được.');
    fireEvent.click(screen.getByRole('button', { name: 'Huỷ' }));
    expect(await db.sandboxDocs.count()).toBe(1);
    fireEvent.click(screen.getByRole('button', { name: 'Xoá Văn bản 1' }));
    fireEvent.click(screen.getByRole('button', { name: 'Xoá hẳn' }));
    await waitFor(async () => expect(await db.sandboxDocs.count()).toBe(0));
    await waitFor(() => expect(screen.queryByText('Văn bản 1')).toBeNull());
  });

  it('renames a file', async () => {
    await createDoc('p1', 'word');
    renderPage();
    fireEvent.click(await screen.findByRole('button', { name: 'Đổi tên Văn bản 1' }));
    const input = screen.getByRole('textbox', { name: 'Tên mới cho Văn bản 1' });
    fireEvent.change(input, { target: { value: 'Thư mời' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(await screen.findByText('Thư mời')).toBeInTheDocument();
  });

  it('does not show another learner’s files', async () => {
    await createProfile({ name: 'Bình', os: 'win', dailyGoalMin: 10, avatar: 'hong' });
    await createDoc('p2', 'word');
    renderWithProfile(<SandboxPage />, { profile: makeProfile(), route: '/sandbox' });
    expect(await screen.findByText(/Chưa có tệp nào/)).toBeInTheDocument();
  });
});

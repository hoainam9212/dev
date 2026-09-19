import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { db } from '../db/db';
import { ProfileProvider, createProfile } from '../db/profile';
import { exportBackup } from '../progress/backup';
import { SettingsPage } from './SettingsPage';
import { resetDb } from '../test/utils';

vi.mock('../progress/backup', async (importOriginal) => {
  const mod = await importOriginal<typeof import('../progress/backup')>();
  return { ...mod, downloadJson: vi.fn() };
});

const renderPage = () =>
  render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ProfileProvider><SettingsPage /></ProfileProvider>
    </MemoryRouter>,
  );

describe('SettingsPage', () => {
  beforeEach(async () => {
    await resetDb();
    await createProfile({ name: 'An', os: 'win', dailyGoalMin: 10 });
  });

  it('changes OS, font size and sound', async () => {
    renderPage();
    fireEvent.click(await screen.findByRole('radio', { name: 'Mac' }));
    fireEvent.click(screen.getByRole('radio', { name: 'Rất lớn' }));
    fireEvent.click(screen.getByRole('switch', { name: 'Âm thanh' }));
    await waitFor(async () => expect(await db.profile.get('me')).toMatchObject({ os: 'mac', fontScale: 'xl', sound: false }));
    await waitFor(() => expect(document.documentElement.dataset.font).toBe('xl'));
  });

  it('renames on blur', async () => {
    renderPage();
    const input = await screen.findByLabelText('Tên của bạn');
    fireEvent.change(input, { target: { value: 'Chi' } });
    fireEvent.blur(input);
    await waitFor(async () => expect((await db.profile.get('me'))?.name).toBe('Chi'));
  });

  it('resets the name field to the stored name when cleared and blurred', async () => {
    renderPage();
    const input = await screen.findByLabelText('Tên của bạn');
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.blur(input);
    await waitFor(() => expect(input).toHaveValue('An'));
    expect((await db.profile.get('me'))?.name).toBe('An');
  });

  it('downloads a backup file', async () => {
    const backup = await import('../progress/backup');
    renderPage();
    fireEvent.click(await screen.findByRole('button', { name: 'Tải file sao lưu' }));
    await waitFor(() => expect(backup.downloadJson).toHaveBeenCalled());
    const [name, data] = vi.mocked(backup.downloadJson).mock.calls[0]!;
    expect(name).toMatch(/^tinhoc-mochi-backup-\d{8}\.json$/);
    expect((data as { app: string }).app).toBe('office-neko');
  });

  it('shows an error for an invalid backup file', async () => {
    renderPage();
    const input = await screen.findByLabelText('Khôi phục từ file');
    fireEvent.change(input, { target: { files: [new File(['không phải json'], 'x.json', { type: 'application/json' })] } });
    expect(await screen.findByRole('alert')).toHaveTextContent('không đọc được');
  });

  it('shows an error alert instead of crashing when a restored row lacks its primary key', async () => {
    const b = await exportBackup();
    const text = JSON.stringify({ ...b, tables: { ...b.tables, progress: [{ stars: 3 }] } });
    renderPage();
    const input = await screen.findByLabelText('Khôi phục từ file');
    fireEvent.change(input, { target: { files: [new File([text], 'b.json', { type: 'application/json' })] } });
    fireEvent.click(await screen.findByRole('button', { name: 'Khôi phục' }));
    expect(await screen.findByRole('alert')).toBeInTheDocument();
    expect(screen.getByRole('alertdialog', { name: 'Xác nhận khôi phục' })).toBeInTheDocument();
  });

  it('restores a valid backup after confirmation', async () => {
    await db.profile.update('me', { name: 'Dũng' });
    const text = JSON.stringify(await exportBackup());
    await db.profile.update('me', { name: 'An' });
    renderPage();
    const input = await screen.findByLabelText('Khôi phục từ file');
    fireEvent.change(input, { target: { files: [new File([text], 'b.json', { type: 'application/json' })] } });
    fireEvent.click(await screen.findByRole('button', { name: 'Khôi phục' }));
    expect(await screen.findByText(/Đã khôi phục/)).toBeInTheDocument();
    expect((await db.profile.get('me'))?.name).toBe('Dũng');
  });
});

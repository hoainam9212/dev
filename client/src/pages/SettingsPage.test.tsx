import { describe, it, expect, beforeEach, vi } from 'vitest';
import { act, render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { db } from '../db/db';
import { ProfileProvider, createProfile } from '../db/profile';
import { exportBackup } from '../progress/backup';
import { SettingsPage } from './SettingsPage';
import { resetDb } from '../test/utils';
import { getCurrentProfileId, setCurrentProfileId } from '../profiles/current';

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
    const p = await createProfile({ name: 'An', os: 'win', dailyGoalMin: 10, avatar: 'cam' });
    setCurrentProfileId(p.id);
  });

  it('mục Giới thiệu ghi rõ nhãn hiệu Microsoft, không liên kết với Microsoft, và đủ thư viện đang dùng', async () => {
    renderPage();
    const about = (await screen.findByRole('heading', { name: 'Giới thiệu & nguồn' })).closest('section')!;
    expect(about).toHaveTextContent(/Microsoft, Windows, Word, Excel, PowerPoint.*nhãn hiệu của Microsoft Corporation/);
    expect(about).toHaveTextContent(/không liên kết với Microsoft/);
    expect(about).toHaveTextContent(/Ảnh chụp màn hình Office/);
    for (const lib of ['Tiptap', 'Fluent UI']) expect(about).toHaveTextContent(lib);
  });

  it('changes OS, font size and sound', async () => {
    renderPage();
    fireEvent.click(await screen.findByRole('radio', { name: 'Mac' }));
    fireEvent.click(screen.getByRole('radio', { name: 'Rất lớn' }));
    fireEvent.click(screen.getByRole('switch', { name: 'Âm thanh' }));
    await waitFor(async () => expect(await db.profiles.get('p1')).toMatchObject({ os: 'mac', fontScale: 'xl', sound: false }));
    await waitFor(() => expect(document.documentElement.dataset.font).toBe('xl'));
  });

  it('locks accessories above the current level', async () => {
    await db.profiles.update('p1', { xp: 200 }); // cấp 3
    renderPage();
    const hat = await screen.findByRole('button', { name: /Mũ len/ });
    expect(hat).toBeDisabled();
    expect(hat).toHaveTextContent('Cấp 6');
    expect(screen.getByRole('button', { name: /Kính tròn/ })).toBeEnabled();
  });

  it('wears and removes an accessory', async () => {
    await db.profiles.update('p1', { xp: 200 });
    renderPage();
    const glasses = await screen.findByRole('button', { name: /Kính tròn/ });
    await waitFor(() => expect(glasses).toBeEnabled());
    fireEvent.click(glasses);
    await waitFor(async () => expect((await db.profiles.get('p1'))?.accessory).toBe('glasses'));
    await waitFor(() => expect(glasses).toHaveAttribute('aria-pressed', 'true'));
    fireEvent.click(screen.getByRole('button', { name: 'Không đeo' }));
    await waitFor(async () => expect((await db.profiles.get('p1'))?.accessory).toBeNull());
  });

  it('turns the unlock-all mode on and off', async () => {
    renderPage();
    const toggle = await screen.findByRole('switch', { name: 'Mở khoá toàn bộ bài học' });
    expect(toggle).toHaveAttribute('aria-checked', 'false');
    fireEvent.click(toggle);
    await waitFor(async () => expect((await db.profiles.get('p1'))?.unlockAll).toBe(true));
    // Chờ giao diện đọc lại hồ sơ: bấm lần hai trước khi công tắc kịp bật sẽ lại ghi `true` (chập chờn khi máy bận).
    await waitFor(() => expect(toggle).toHaveAttribute('aria-checked', 'true'));
    fireEvent.click(toggle);
    await waitFor(async () => expect((await db.profiles.get('p1'))?.unlockAll).toBe(false));
  });

  it('changes the avatar', async () => {
    renderPage();
    fireEvent.click(await screen.findByRole('radio', { name: 'Mèo tím' }));
    await waitFor(async () => expect((await db.profiles.get('p1'))?.avatar).toBe('tim'));
  });

  it('lists the learners on this computer', async () => {
    renderPage();
    expect(await screen.findByText(/An \(bạn\)/)).toBeInTheDocument();
  });

  it('renames on blur', async () => {
    renderPage();
    const input = await screen.findByLabelText('Tên của bạn');
    fireEvent.change(input, { target: { value: 'Chi' } });
    fireEvent.blur(input);
    await waitFor(async () => expect((await db.profiles.get('p1'))?.name).toBe('Chi'));
  });

  it('resets the name field to the stored name when cleared and blurred', async () => {
    renderPage();
    const input = await screen.findByLabelText('Tên của bạn');
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.blur(input);
    await waitFor(() => expect(input).toHaveValue('An'));
    expect((await db.profiles.get('p1'))?.name).toBe('An');
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
    const text = JSON.stringify({ ...b, tables: { ...b.tables, lessonProgress: [{ stars: 3 }] } });
    renderPage();
    const input = await screen.findByLabelText('Khôi phục từ file');
    fireEvent.change(input, { target: { files: [new File([text], 'b.json', { type: 'application/json' })] } });
    fireEvent.click(await screen.findByRole('button', { name: 'Khôi phục' }));
    expect(await screen.findByRole('alert')).toBeInTheDocument();
    expect(screen.getByRole('alertdialog', { name: 'Xác nhận khôi phục' })).toBeInTheDocument();
  });

  it('says how many learners the file holds before replacing anything', async () => {
    const { createProfile } = await import('../profiles/manage');
    await createProfile({ name: 'Bình', os: 'mac', dailyGoalMin: 5, avatar: 'tim' });
    const text = JSON.stringify(await exportBackup());
    renderPage();
    const input = await screen.findByLabelText('Khôi phục từ file');
    fireEvent.change(input, { target: { files: [new File([text], 'b.json', { type: 'application/json' })] } });
    expect(await screen.findByText(/2 người học/)).toBeInTheDocument();
  });

  it('restores a valid backup after confirmation and asks who is learning again', async () => {
    await db.profiles.update('p1', { name: 'Dũng' });
    const text = JSON.stringify(await exportBackup());
    await db.profiles.update('p1', { name: 'An' });
    renderPage();
    const input = await screen.findByLabelText('Khôi phục từ file');
    fireEvent.change(input, { target: { files: [new File([text], 'b.json', { type: 'application/json' })] } });
    fireEvent.click(await screen.findByRole('button', { name: 'Khôi phục' }));
    await waitFor(async () => expect((await db.profiles.get('p1'))?.name).toBe('Dũng'));
    // Khôi phục xong thì không còn ai "đang học": app quay về màn chọn người.
    await waitFor(() => expect(getCurrentProfileId()).toBeNull());
  });

  describe('Ứng dụng', () => {
    const offerInstall = () => {
      const prompt = vi.fn().mockResolvedValue(undefined);
      const e = Object.assign(new Event('beforeinstallprompt', { cancelable: true }), {
        prompt,
        userChoice: Promise.resolve({ outcome: 'accepted' }),
      });
      act(() => void window.dispatchEvent(e));
      return { e, prompt };
    };
    beforeEach(() => void window.dispatchEvent(new Event('appinstalled')));

    it('hides "Cài vào máy" until the browser offers installation', async () => {
      renderPage();
      await screen.findByRole('heading', { name: 'Ứng dụng' });
      expect(screen.queryByRole('button', { name: 'Cài vào máy' })).toBeNull();
      expect(screen.getByText(/Thêm vào màn hình chính/)).toBeInTheDocument();
    });

    it('shows "Cài vào máy" after beforeinstallprompt and calls prompt() on click', async () => {
      renderPage();
      await screen.findByRole('heading', { name: 'Ứng dụng' });
      const { e, prompt } = offerInstall();
      expect(e.defaultPrevented).toBe(true);
      fireEvent.click(await screen.findByRole('button', { name: 'Cài vào máy' }));
      expect(prompt).toHaveBeenCalledOnce();
      await waitFor(() => expect(screen.queryByRole('button', { name: 'Cài vào máy' })).toBeNull());
    });

    it('remembers an offer that arrived before the page opened', async () => {
      offerInstall();
      renderPage();
      expect(await screen.findByRole('button', { name: 'Cài vào máy' })).toBeInTheDocument();
    });
  });
});

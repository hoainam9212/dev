import { beforeEach, describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { HomePage } from './HomePage';
import { makeProfile, renderWithProfile, resetDb } from '../test/utils';

/** Tiêu đề lộ trình trên bản đồ có dạng "🖱️ 0. Làm quen máy tính" (bỏ qua "Huy hiệu"…). */
const trackHeadings = async () =>
  (await screen.findAllByRole('heading', { level: 2 }))
    .map((h) => h.textContent ?? '')
    .filter((t) => /\d+\. /.test(t));

describe('HomePage – lộ trình', () => {
  beforeEach(async () => {
    await resetDb();
  });

  it('hồ sơ dễ dùng: 4 lộ trình Máy tính → PowerPoint → Word → Excel, không có Gõ phím và AI', async () => {
    renderWithProfile(<HomePage />, { profile: makeProfile({ easyMode: true, unlockAll: true }) });
    const titles = await trackHeadings();
    expect(titles).toHaveLength(4);
    expect(titles[0]).toMatch(/Làm quen máy tính/);
    expect(titles[1]).toMatch(/PowerPoint/);
    expect(titles[2]).toMatch(/Word/);
    expect(titles[3]).toMatch(/Excel/);
    expect(screen.queryByText(/Gõ phím 10 ngón/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Dùng AI/)).not.toBeInTheDocument();
  });

  it('hồ sơ thường: vẫn đủ 6 lộ trình', async () => {
    renderWithProfile(<HomePage />);
    expect(await trackHeadings()).toHaveLength(6);
    expect(screen.getByText(/Gõ phím 10 ngón/)).toBeInTheDocument();
  });

  it('hồ sơ dễ dùng: không có kệ huy hiệu; hồ sơ thường thì có', async () => {
    const { unmount } = renderWithProfile(<HomePage />);
    await trackHeadings();
    expect(screen.getByRole('heading', { name: 'Huy hiệu' })).toBeInTheDocument();
    unmount();
    renderWithProfile(<HomePage />, { profile: makeProfile({ easyMode: true }) });
    await trackHeadings();
    expect(screen.queryByRole('heading', { name: 'Huy hiệu' })).toBeNull();
  });

  it('hồ sơ dễ dùng: không có nút làm bài kiểm tra đầu vào', async () => {
    renderWithProfile(<HomePage />, { profile: makeProfile({ easyMode: true }) });
    await trackHeadings();
    expect(screen.queryByText(/Làm bài kiểm tra/)).not.toBeInTheDocument();
  });
});

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { screen, fireEvent, act } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { createProfile } from '../profiles/manage';
import { createDoc, putDocState, saveDocState } from '../sandbox/docs';
import { renderWithProfile, resetDb } from '../test/utils';
import type { SimProps } from '../sims/types';
import { SandboxDocPage } from './SandboxDocPage';

// Sim giả: một nút đổi state, để test được nhịp lưu mà không phải điều khiển ribbon thật.
vi.mock('../sims/registry', () => {
  function FakeWord({ initial, onState }: SimProps<{ n: number }>) {
    useEffect(() => onState(initial), [initial, onState]);
    return (
      <div>
        <p>Sim Word, n = {initial.n ?? 'trắng'}</p>
        <button type="button" onClick={() => onState({ n: 1 })}>Sửa</button>
      </div>
    );
  }
  return { SIMS: { word: { kind: 'word', Component: FakeWord, reduce: (s: unknown) => s } } };
});

vi.mock('../sandbox/docs', async (importOriginal) => {
  const mod = await importOriginal<typeof import('../sandbox/docs')>();
  return { ...mod, putDocState: vi.fn(mod.putDocState) };
});

const renderDoc = (id: string) =>
  renderWithProfile(
    <Routes>
      <Route path="/sandbox" element={<p>Danh sách tệp</p>} />
      <Route path="/sandbox/:id" element={<SandboxDocPage />} />
    </Routes>,
    { route: `/sandbox/${id}` },
  );

describe('SandboxDocPage', () => {
  beforeEach(async () => {
    await resetDb();
    await createProfile({ name: 'An', os: 'win', dailyGoalMin: 10, avatar: 'cam' });
    vi.mocked(putDocState).mockClear();
  });
  afterEach(() => vi.useRealTimers());

  it('draws the sim with the saved state and the file name', async () => {
    const d = await createDoc('p1', 'word');
    await saveDocState('p1', d.id, { n: 7 });
    vi.mocked(putDocState).mockClear();
    renderDoc(d.id);
    expect(await screen.findByText('Sim Word, n = 7')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Đổi tên tệp' })).toHaveValue('Văn bản 1');
    expect(screen.getByText('Đã lưu')).toBeInTheDocument();
    expect(putDocState).not.toHaveBeenCalled();
  });

  it('saves once, 800 ms after the last change', async () => {
    const d = await createDoc('p1', 'word');
    renderDoc(d.id);
    await screen.findByText(/Sim Word/);
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
    fireEvent.click(screen.getByRole('button', { name: 'Sửa' }));
    fireEvent.click(screen.getByRole('button', { name: 'Sửa' }));
    expect(screen.getByText('Đang lưu…')).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(799));
    expect(putDocState).not.toHaveBeenCalled();
    act(() => vi.advanceTimersByTime(1));
    expect(putDocState).toHaveBeenCalledTimes(1);
    expect(putDocState).toHaveBeenCalledWith(expect.objectContaining({ id: d.id, profileId: 'p1' }), { n: 1 });
  });

  it('saves at once when the tab is hidden', async () => {
    const d = await createDoc('p1', 'word');
    renderDoc(d.id);
    await screen.findByText(/Sim Word/);
    fireEvent.click(screen.getByRole('button', { name: 'Sửa' }));
    const vis = vi.spyOn(document, 'visibilityState', 'get').mockReturnValue('hidden');
    act(() => {
      document.dispatchEvent(new Event('visibilitychange'));
    });
    vis.mockRestore();
    expect(putDocState).toHaveBeenCalledTimes(1);
  });

  it('goes back to the list for an unknown file', async () => {
    renderDoc('khong-co');
    expect(await screen.findByText('Danh sách tệp')).toBeInTheDocument();
  });
});

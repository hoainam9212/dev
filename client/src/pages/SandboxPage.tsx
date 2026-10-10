import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { useProfileId } from '../db/profile';
import type { SandboxDoc } from '../db/db';
import { createDoc, deleteDoc, listDocs, renameDoc, SANDBOX_SIMS, type SandboxSim } from '../sandbox/docs';

const NO_DOCS: SandboxDoc[] = [];

function when(iso: string): string {
  return new Date(iso).toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' });
}

export function SandboxPage() {
  const profileId = useProfileId();
  const navigate = useNavigate();
  const notice = (useLocation().state as { notice?: string } | null)?.notice;
  const docs = useLiveQuery(async () => (profileId ? listDocs(profileId) : NO_DOCS), [profileId]);
  const [renaming, setRenaming] = useState<{ id: string; name: string } | null>(null);
  const [deleting, setDeleting] = useState<SandboxDoc | null>(null);

  if (!profileId) return null;

  const create = async (sim: SandboxSim) => {
    const d = await createDoc(profileId, sim);
    navigate(`/sandbox/${d.id}`);
  };
  const finishRename = async () => {
    if (!renaming) return;
    await renameDoc(profileId, renaming.id, renaming.name);
    setRenaming(null);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-5 p-4 pb-24">
      <div className="flex items-center gap-3">
        <Link to="/" className="btn">← Về bản đồ</Link>
        <h1 className="text-2xl font-extrabold">Phòng tự do 🧪</h1>
      </div>
      <p className="text-muted">Luyện thoải mái với Word, Excel, PowerPoint: không có đề bài, không chấm điểm, mọi thay đổi tự lưu.</p>
      {notice && <p role="status" className="rounded-2xl bg-butter/50 p-3 font-semibold">{notice}</p>}

      <section className="card space-y-3 p-5">
        <h2 className="text-lg font-extrabold">Tạo tệp mới</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {SANDBOX_SIMS.map((s) => (
            <button key={s.sim} type="button" onClick={() => void create(s.sim)}
              className="flex items-center gap-3 rounded-2xl bg-white p-4 text-left font-bold shadow transition hover:ring-4 hover:ring-peach">
              <span aria-hidden className="text-3xl">{s.emoji}</span>
              <span>{s.label}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="card space-y-3 p-5">
        <h2 className="text-lg font-extrabold">Tệp của bạn</h2>
        {docs && docs.length === 0 && <p className="text-muted">Chưa có tệp nào. Bấm một nút ở trên để tạo tệp đầu tiên nhé!</p>}
        <ul className="space-y-2">
          {(docs ?? NO_DOCS).map((d) => {
            const kind = SANDBOX_SIMS.find((s) => s.sim === d.sim);
            return (
              <li key={d.id} className="flex flex-wrap items-center gap-3 rounded-2xl bg-white/70 p-3">
                <span aria-hidden className="text-2xl">{kind?.emoji ?? '📄'}</span>
                <div className="min-w-[10rem] flex-1">
                  {renaming?.id === d.id ? (
                    <input
                      autoFocus
                      aria-label={`Tên mới cho ${d.name}`}
                      value={renaming.name}
                      maxLength={60}
                      onChange={(e) => setRenaming({ id: d.id, name: e.target.value })}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') void finishRename();
                        if (e.key === 'Escape') setRenaming(null);
                      }}
                      onBlur={() => void finishRename()}
                      className="w-full rounded-full border-2 border-peach/60 bg-white px-3 py-1 outline-none focus:border-rose"
                    />
                  ) : (
                    <p className="truncate font-bold">{d.name}</p>
                  )}
                  <p className="text-sm text-muted">Sửa lúc {when(d.updatedAt)}</p>
                </div>
                <div className="flex gap-2">
                  <Link to={`/sandbox/${d.id}`} aria-label={`Mở ${d.name}`} className="btn-primary !px-4 !py-1.5">Mở</Link>
                  <button type="button" aria-label={`Đổi tên ${d.name}`} className="btn !px-3 !py-1.5"
                    onClick={() => setRenaming({ id: d.id, name: d.name })}>Đổi tên</button>
                  <button type="button" aria-label={`Xoá ${d.name}`} className="btn !px-3 !py-1.5"
                    onClick={() => setDeleting(d)}>Xoá</button>
                </div>
              </li>
            );
          })}
        </ul>
        {deleting && (
          <div role="alertdialog" aria-label="Xác nhận xoá tệp" className="space-y-3 rounded-2xl bg-butter/40 p-4">
            <p className="font-semibold">Xoá «{deleting.name}»? Không lấy lại được.</p>
            <div className="flex gap-3">
              <button type="button" className="btn-primary" onClick={async () => {
                await deleteDoc(profileId, deleting.id);
                setDeleting(null);
              }}>Xoá hẳn</button>
              <button type="button" className="btn" onClick={() => setDeleting(null)}>Huỷ</button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

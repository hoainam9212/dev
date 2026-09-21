import { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { dayKey } from '@office-neko/shared';
import { Mochi } from '../components/Mochi';
import { avatarSkin } from './avatars';
import { deleteProfile, listProfiles } from './manage';

/** "Hôm nay" / "hôm qua" / ngày tháng — người mới dùng máy đọc kiểu này dễ hơn ISO. */
function whenText(iso: string, now = new Date()): string {
  const day = iso.slice(0, 10);
  if (day === dayKey(now)) return 'hôm nay';
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (day === dayKey(yesterday)) return 'hôm qua';
  const [y, m, d] = day.split('-');
  return `${d}/${m}/${y}`;
}

export function ProfileList({ currentId }: { currentId: string }) {
  const profiles = useLiveQuery(() => listProfiles(), []);
  const [confirming, setConfirming] = useState<string | null>(null);
  const [typed, setTyped] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  if (!profiles) return null;
  const canDelete = profiles.length > 1;

  const startDelete = (id: string) => {
    setConfirming(id);
    setTyped('');
    setMessage(null);
  };

  const remove = async (id: string, name: string) => {
    await deleteProfile(id);
    setConfirming(null);
    setTyped('');
    setMessage(`Đã xoá ${name}.`);
  };

  return (
    <div className="space-y-3">
      <ul className="space-y-2">
        {profiles.map((p) => {
          const isMe = p.id === currentId;
          const matches = typed.trim().toLowerCase() === p.name.toLowerCase();
          return (
            <li key={p.id} className="rounded-2xl bg-white/70 p-3">
              <div className="flex items-center gap-3">
                <Mochi skin={avatarSkin(p.avatar)} size={40} mood="happy" animated={false} label={`Ảnh của ${p.name}`} />
                <div className="flex-1">
                  <p className="font-bold">{p.name}{isMe ? ' (bạn)' : ''}</p>
                  <p className="text-muted text-sm">Học gần nhất: {whenText(p.lastActiveAt)}</p>
                </div>
                {!isMe && canDelete && (
                  <button type="button" className="btn !px-3 !py-1 text-sm" aria-label={`Xoá ${p.name}`} onClick={() => startDelete(p.id)}>
                    Xoá
                  </button>
                )}
              </div>
              {confirming === p.id && (
                <div className="mt-3 space-y-2 rounded-2xl bg-butter/40 p-3">
                  <p>
                    Toàn bộ tiến độ của <strong>{p.name}</strong> sẽ mất và không lấy lại được. Gõ lại tên “{p.name}” để xác nhận.
                  </p>
                  <label className="block space-y-1">
                    <span className="text-sm font-semibold">Gõ lại tên để xác nhận</span>
                    <input
                      value={typed}
                      onChange={(e) => setTyped(e.target.value)}
                      className="w-full rounded-full border-2 border-peach/60 bg-white px-4 py-2 outline-none focus:border-rose"
                    />
                  </label>
                  <div className="flex gap-3">
                    <button type="button" className="btn-primary" disabled={!matches} onClick={() => void remove(p.id, p.name)}>
                      Xoá hẳn
                    </button>
                    <button type="button" className="btn" onClick={() => setConfirming(null)}>Huỷ</button>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
      {message && <p className="font-semibold text-excel-ink">{message}</p>}
    </div>
  );
}

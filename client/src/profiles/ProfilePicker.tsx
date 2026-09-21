import { useLiveQuery } from 'dexie-react-hooks';
import { Navigate, useNavigate } from 'react-router-dom';
import { levelFromXp } from '@office-neko/shared';
import { db } from '../db/db';
import { Mochi } from '../components/Mochi';
import { avatarSkin } from './avatars';
import { setCurrentProfileId } from './current';
import { listProfiles, touchProfile } from './manage';

/**
 * Màn "Ai đang học?" — cửa vào của app khi máy có nhiều người. Số bài đã xong
 * lấy bằng MỘT truy vấn cho cả màn rồi đếm theo hồ sơ, không phải mỗi thẻ một
 * truy vấn.
 */
export function ProfilePicker() {
  const navigate = useNavigate();
  const data = useLiveQuery(async () => {
    const profiles = await listProfiles();
    const rows = await db.lessonProgress.toArray();
    const done = new Map<string, number>();
    for (const r of rows) {
      if (r.stars > 0) done.set(r.profileId, (done.get(r.profileId) ?? 0) + 1);
    }
    return { profiles, done };
  }, []);

  if (!data) return null;
  if (data.profiles.length === 0) return <Navigate to="/welcome" replace />;

  const choose = async (id: string) => {
    await touchProfile(id);
    setCurrentProfileId(id);
    navigate('/', { replace: true });
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6">
      <div className="space-y-1 text-center">
        <h1 className="text-3xl font-extrabold">Ai đang học?</h1>
        <p className="text-muted">Chọn tên của bạn để học tiếp nhé.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {data.profiles.map((p) => {
          const lvl = levelFromXp(p.xp);
          return (
            <button
              key={p.id}
              type="button"
              aria-label={`Học tiếp: ${p.name}`}
              onClick={() => void choose(p.id)}
              className="card flex flex-col items-center gap-2 p-5 transition hover:ring-4 hover:ring-peach"
            >
              <Mochi skin={avatarSkin(p.avatar)} size={96} mood="happy" animated={false} label={`Ảnh của ${p.name}`} />
              <span className="text-xl font-extrabold">{p.name}</span>
              <span className="text-muted text-sm">
                Cấp {lvl.level} · {data.done.get(p.id) ?? 0} bài đã xong
              </span>
            </button>
          );
        })}
        <button
          type="button"
          aria-label="Thêm người mới"
          onClick={() => navigate('/welcome')}
          className="card flex flex-col items-center justify-center gap-2 border-2 border-dashed border-peach/70 p-5 transition hover:ring-4 hover:ring-peach"
        >
          <span aria-hidden className="text-4xl">➕</span>
          <span className="text-lg font-bold">Thêm người mới</span>
          <span className="text-muted text-sm">Cho bạn bè hoặc người nhà cùng học</span>
        </button>
      </div>
    </div>
  );
}

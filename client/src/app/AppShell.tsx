import { Link, Outlet } from 'react-router-dom';
import { levelFromXp } from '@office-neko/shared';
import { useProfile } from '../db/profile';
import { avatarSkin } from '../profiles/avatars';
import { useStreak } from '../progress/useStats';
import { Mochi } from '../components/Mochi';

export function AppShell() {
  const profile = useProfile()!;
  const streak = useStreak(profile.id);
  const lvl = levelFromXp(profile.xp);
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-peach/30 bg-cream/90 px-4 py-2 backdrop-blur">
        <Link to="/" className="flex items-center gap-2 font-extrabold">
          <Mochi size={34} mood="happy" animated={false} />
          <span className="hidden sm:inline">Tin Học Cùng Mochi</span>
        </Link>
        <Link
          to="/who"
          aria-label="Đổi người học"
          title="Đổi người học"
          className="ml-auto flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm font-bold shadow"
        >
          <Mochi skin={avatarSkin(profile.avatar)} size={26} mood="happy" animated={false} label={`Ảnh của ${profile.name}`} />
          <span className="hidden sm:inline">{profile.name}</span>
        </Link>
        <div className="flex items-center gap-2 text-sm font-bold">
          <span title="Chuỗi ngày học" className="rounded-full bg-butter/60 px-3 py-1">🔥 {streak}</span>
          <span title={`Còn ${lvl.need - lvl.into} XP nữa lên cấp`} className="rounded-full bg-lavender/40 px-3 py-1">
            Cấp {lvl.level} · {profile.xp} XP
          </span>
          <Link to="/typing" data-help-id="app.typing" className="rounded-full bg-sky/50 px-3 py-1">⌨️ Luyện gõ</Link>
          <Link to="/settings" data-help-id="app.settings" aria-label="Cài đặt" className="rounded-full bg-white px-3 py-1 shadow">⚙️</Link>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

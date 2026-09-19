import { Link, Outlet } from 'react-router-dom';
import { levelFromXp } from '@office-neko/shared';
import { useProfile } from '../db/profile';
import { useStreak } from '../progress/useStats';
import { Mochi } from '../components/Mochi';

export function AppShell() {
  const profile = useProfile()!;
  const streak = useStreak();
  const lvl = levelFromXp(profile.xp);
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-peach/30 bg-cream/90 px-4 py-2 backdrop-blur">
        <Link to="/" className="flex items-center gap-2 font-extrabold">
          <Mochi size={34} mood="happy" animated={false} /> Tin Học Cùng Mochi
        </Link>
        <div className="ml-auto flex items-center gap-2 text-sm font-bold">
          <span title="Chuỗi ngày học" className="rounded-full bg-butter/60 px-3 py-1">🔥 {streak}</span>
          <span title={`Còn ${lvl.need - lvl.into} XP nữa lên cấp`} className="rounded-full bg-lavender/40 px-3 py-1">
            Cấp {lvl.level} · {profile.xp} XP
          </span>
          <Link to="/settings" data-help-id="app.settings" aria-label="Cài đặt" className="rounded-full bg-white px-3 py-1 shadow">⚙️</Link>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

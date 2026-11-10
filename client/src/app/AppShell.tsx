import { Link, Outlet } from 'react-router-dom';
import { levelFromXp } from '@office-neko/shared';
import { useProfile } from '../db/profile';
import { avatarSkin, wearable } from '../profiles/avatars';
import { useStreak } from '../progress/useStats';
import { Mochi } from '../components/Mochi';

export function AppShell() {
  const profile = useProfile()!;
  const streak = useStreak(profile.id);
  const lvl = levelFromXp(profile.xp);
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 flex items-center gap-2 border-b border-peach/30 bg-cream/90 px-3 py-2 backdrop-blur sm:gap-3 sm:px-4">
        <Link to="/" className="flex items-center gap-2 font-extrabold">
          <Mochi size={34} mood="happy" animated={false} />
          <span className="hidden sm:inline">Tin Học Cùng Mochi</span>
        </Link>
        <Link
          to="/who"
          aria-label="Đổi người học"
          title="Đổi người học"
          className="ml-auto flex items-center gap-2 rounded-full bg-white px-2 py-1 text-sm font-bold shadow sm:px-3"
        >
          <Mochi skin={avatarSkin(profile.avatar)} accessory={wearable(profile)} size={26} mood="happy" animated={false} label={`Ảnh của ${profile.name}`} />
          <span className="hidden sm:inline">{profile.name}</span>
        </Link>
        {/* Màn hẹp: bỏ số XP và chữ "Luyện gõ" để mỗi chip nằm trên một dòng (whitespace-nowrap). */}
        <div className="flex items-center gap-1 whitespace-nowrap text-sm font-bold sm:gap-2">
          <span title="Chuỗi ngày học" className="rounded-full bg-butter/60 px-2.5 py-1 sm:px-3">🔥 {streak}</span>
          <span title={`Còn ${lvl.need - lvl.into} XP nữa lên cấp`} className="rounded-full bg-lavender/40 px-2.5 py-1 sm:px-3">
            Cấp {lvl.level}<span className="hidden sm:inline"> · {profile.xp} XP</span>
          </span>
          <Link to="/typing" data-help-id="app.typing" aria-label="Luyện gõ" className="rounded-full bg-sky/50 px-2.5 py-1 sm:px-3">
            ⌨️<span className="hidden sm:inline"> Luyện gõ</span>
          </Link>
          <Link to="/settings" data-help-id="app.settings" aria-label="Cài đặt" className="rounded-full bg-white px-2.5 py-1 shadow sm:px-3">⚙️</Link>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

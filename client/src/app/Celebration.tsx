import { useEffect, useRef, useState } from 'react';
import { useProgress } from '../store/progress';
import { levelFromXp } from '../store/streak';
import { levelName, STREAK_MILESTONES } from '../lib/mascot';
import { Confetti } from '../components/Confetti';
import { Mascot } from '../components/Mascot';

interface Toast {
  title: string;
  body: string;
}

/** Watches XP/streak and shows a toast + confetti on level-up or streak milestones. */
export function Celebration() {
  const xp = useProgress((s) => s.xp);
  const streak = useProgress((s) => s.streak);
  const prevLevel = useRef(levelFromXp(xp).level);
  const prevStreak = useRef(streak);
  const [toast, setToast] = useState<Toast | null>(null);
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    const level = levelFromXp(xp).level;
    if (level > prevLevel.current) {
      setToast({ title: `Lên cấp ${level}! 🎉`, body: `Bạn là ${levelName(level)}` });
      setConfetti(true);
    }
    prevLevel.current = level;
  }, [xp]);

  useEffect(() => {
    if (streak > prevStreak.current && STREAK_MILESTONES.includes(streak)) {
      setToast({ title: `Chuỗi ${streak} ngày! 🔥`, body: 'Sakura tự hào về bạn lắm!' });
      setConfetti(true);
    }
    prevStreak.current = streak;
  }, [streak]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  return (
    <>
      {confetti && <Confetti onDone={() => setConfetti(false)} />}
      {toast && (
        <div className="fixed inset-x-0 top-4 z-[70] flex justify-center px-4" role="status" data-testid="celebration-toast">
          <div className="card flex items-center gap-3 px-5 py-3 ring-2 ring-rose">
            <Mascot mood="happy" size={48} />
            <div>
              <p className="font-black text-rose">{toast.title}</p>
              <p className="text-sm text-muted">{toast.body}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

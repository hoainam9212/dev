import { useProgress } from '../store/progress';
import { levelFromXp } from '../store/streak';
import { useT } from '../i18n';

export function XpBar() {
  const t = useT();
  const xp = useProgress((s) => s.xp);
  const { level, into, need } = levelFromXp(xp);
  const pct = Math.round((into / need) * 100);
  return (
    <div>
      <div className="flex items-baseline justify-between text-sm font-bold">
        <span className="text-rose">{t.common.level(level)}</span>
        <span className="text-muted">
          {into} / {need} XP
        </span>
      </div>
      <div
        className="mt-1 h-3 w-full overflow-hidden rounded-full bg-sakura/30"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-rose to-lavender transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

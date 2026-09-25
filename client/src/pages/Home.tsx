import { Link } from 'react-router-dom';
import { Mascot } from '../components/Mascot';
import { SpeechBubble } from '../components/SpeechBubble';
import { XpBar } from '../components/XpBar';
import { Petals } from '../components/Petals';
import { useProgress } from '../store/progress';
import { NAV } from '../app/nav';
import { useDueCounts } from '../db/srs';
import { useSettings } from '../store/settings';
import { pickMascotLine, levelName } from '../lib/mascot';
import { levelFromXp } from '../store/streak';
import { useLang, useT } from '../i18n';
import { pickText } from '@nihongo/shared';

export function Home() {
  const t = useT();
  const lang = useLang();
  const streak = useProgress((s) => s.streak);
  const due = useDueCounts();
  const petals = useSettings((s) => s.petals);
  const dueTotal = due ? due.vocab + due.kanji + due.grammar : 0;
  const xp = useProgress((s) => s.xp);
  const g = pickMascotLine({ hour: new Date().getHours(), streak, due: dueTotal });
  const quick = NAV.filter((n) => !['/', '/settings', '/progress'].includes(n.to));

  return (
    <div className="space-y-6">
      <section className="card relative overflow-hidden p-6 md:p-8">
        {petals && <Petals />}
        <div className="relative flex flex-col items-center gap-4 md:flex-row md:items-end">
          <Mascot mood="happy" size={180} />
          <div className="flex-1 space-y-3">
            <SpeechBubble>
              <p className="text-lg font-bold">{g.ja}</p>
              <p className="text-sm text-muted">{pickText(g.vi, g.en, lang)}</p>
            </SpeechBubble>
            <div className="flex flex-wrap gap-3">
              <div className="rounded-2xl bg-sakura/30 px-4 py-2 font-bold">{t.home.streak(streak)}</div>
              <div className="rounded-2xl bg-lavender/40 px-4 py-2 font-bold">🏅 {levelName(levelFromXp(xp).level, t)}</div>
              <div className="rounded-2xl bg-sky/40 px-4 py-2 font-bold" data-testid="due-chip">
                {t.home.due(dueTotal)}
              </div>
              {dueTotal > 0 && (
                <Link to="/review" className="btn-primary">
                  {t.home.reviewNow}
                </Link>
              )}
            </div>
            <XpBar />
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-black text-rose">{t.home.startLearning}</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {quick.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="card flex items-center gap-3 p-4 transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <span className="text-2xl">{n.icon}</span>
              <span className="font-bold">{t.nav[n.key].label}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

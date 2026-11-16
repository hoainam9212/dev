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
import { lastPlace } from '../lib/resume';
import { tabLabel } from './bjt/books/book';
import { levelFromXp } from '../store/streak';
import { useLang, useT } from '../i18n';
import { pickText } from '@nihongo/shared';

/** Home: what to do now (continue, today's review, the BJT books) first; every lesson is in "Learn". */
export function Home() {
  const t = useT();
  const lang = useLang();
  const streak = useProgress((s) => s.streak);
  const due = useDueCounts();
  const petals = useSettings((s) => s.petals);
  const dueTotal = due ? due.vocab + due.kanji + due.grammar : 0;
  const xp = useProgress((s) => s.xp);
  const g = pickMascotLine({ hour: new Date().getHours(), streak, due: dueTotal });

  const place = lastPlace();
  const page = place?.kind === 'page' ? NAV.find((n) => place.path === n.to || place.path.startsWith(`${n.to}/`)) : undefined;
  const where =
    place?.kind === 'book' ? t.home.continueBook(tabLabel(place.title), place.testTitle, place.i + 1) : page ? `${page.icon} ${t.nav[page.key].label}` : undefined;

  const action = 'card flex items-center gap-3 p-4 transition hover:-translate-y-0.5 hover:shadow-lg';

  return (
    <div className="space-y-4">
      <section className="card relative overflow-hidden p-4 md:p-6">
        {petals && <Petals />}
        <div className="relative flex items-center gap-3">
          <Mascot mood="happy" size={88} />
          <div className="min-w-0 flex-1 space-y-2">
            <SpeechBubble>
              <p className="font-bold">{g.ja}</p>
              <p className="text-sm text-muted">{pickText(g.vi, g.en, lang)}</p>
            </SpeechBubble>
          </div>
        </div>
        <div className="relative mt-3 flex flex-wrap gap-2 text-sm">
          <div className="rounded-2xl bg-sakura/30 px-3 py-1.5 font-bold">{t.home.streak(streak)}</div>
          <div className="rounded-2xl bg-lavender/40 px-3 py-1.5 font-bold">🏅 {levelName(levelFromXp(xp).level, t)}</div>
          <div className="rounded-2xl bg-sky/40 px-3 py-1.5 font-bold" data-testid="due-chip">
            {t.home.due(dueTotal)}
          </div>
        </div>
        <div className="relative mt-3">
          <XpBar />
        </div>
      </section>

      <div className="grid gap-3 md:grid-cols-3">
        {where && (
          <Link to="/continue" className={`${action} bg-rose-700! text-white md:col-span-3`}>
            <span className="text-2xl">▶</span>
            <span className="min-w-0">
              <span className="block font-black">{t.home.continue}</span>
              <span className="block text-sm break-words opacity-90">{where}</span>
            </span>
          </Link>
        )}
        <Link to="/review" className={action}>
          <span className="text-2xl">🔁</span>
          <span className="font-bold">{t.home.reviewToday(dueTotal)}</span>
        </Link>
        <Link to="/bjt/sach" className={action}>
          <span className="text-2xl">📖</span>
          <span className="font-bold">{t.home.bjtBooks}</span>
        </Link>
        <Link to="/learn" className={action}>
          <span className="text-2xl">📚</span>
          <span className="font-bold">{t.home.allLessons}</span>
        </Link>
      </div>
    </div>
  );
}

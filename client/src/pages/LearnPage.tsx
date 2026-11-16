import { Link } from 'react-router-dom';
import { navItem, type NavKey } from '../app/nav';
import { useT } from '../i18n';

const LETTERS: NavKey[] = ['kana', 'vocab', 'kanji', 'grammar'];
const SKILLS: NavKey[] = ['reading', 'listening', 'speaking', 'writing'];

/** /learn: the N5–N1 lessons in two groups (the phone bar's "Learn"). */
export function LearnPage() {
  const t = useT();
  const tiles = (keys: NavKey[]) => (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {keys.map((k) => {
        const n = navItem(k);
        return (
          <Link key={k} to={n.to} className="card flex items-center gap-3 p-4 transition hover:-translate-y-0.5 hover:shadow-lg">
            <span className="text-2xl">{n.icon}</span>
            <span className="font-bold">{t.nav[k].label}</span>
          </Link>
        );
      })}
    </div>
  );
  return (
    <div className="space-y-5">
      <header className="space-y-1">
        <h1 className="text-2xl font-black text-rose">{t.learn.title}</h1>
        <p className="text-sm text-muted">{t.learn.subtitle}</p>
      </header>
      <section className="space-y-2">
        <h2 className="font-black">{t.learn.letters}</h2>
        {tiles(LETTERS)}
      </section>
      <section className="space-y-2">
        <h2 className="font-black">{t.learn.skills}</h2>
        {tiles(SKILLS)}
      </section>
    </div>
  );
}

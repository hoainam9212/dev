import { Link } from 'react-router-dom';
import { navItem, type NavKey } from '../app/nav';
import { ThemeToggle } from '../app/ThemeToggle';
import { LangSwitch } from '../components/LangSwitch';
import { useT } from '../i18n';

const ITEMS: NavKey[] = ['progress', 'settings'];

/** /me: progress, settings, look and language (the phone bar's "Me"). */
export function MePage() {
  const t = useT();
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-black text-rose">{t.me.title}</h1>
      <div className="grid grid-cols-2 gap-3">
        {ITEMS.map((k) => {
          const n = navItem(k);
          return (
            <Link key={k} to={n.to} className="card flex items-center gap-3 p-4 transition hover:-translate-y-0.5 hover:shadow-lg">
              <span className="text-2xl">{n.icon}</span>
              <span className="font-bold">{t.nav[k].label}</span>
            </Link>
          );
        })}
      </div>
      <section className="card space-y-3 p-4">
        <h2 className="font-black">{t.me.look}</h2>
        <div className="flex flex-wrap items-center gap-3">
          <ThemeToggle />
          <LangSwitch />
        </div>
      </section>
    </div>
  );
}

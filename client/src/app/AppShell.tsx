import { useEffect } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { stopSpeaking } from '../lib/tts';
import { installBackgroundAudio } from '../lib/backgroundAudio';
import { noteVisit } from '../lib/resume';
import { GROUPS, groupOf, navItem } from './nav';
import { ThemeToggle } from './ThemeToggle';
import { Celebration } from './Celebration';
import { SyncDot } from './SyncDot';
import { TtsNotice } from './TtsNotice';
import { LangSwitch } from '../components/LangSwitch';
import { useT } from '../i18n';

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 rounded-full px-4 py-2 font-bold transition ${
    isActive ? 'bg-rose text-white shadow-md' : 'text-text hover:bg-sakura/40'
  }`;

export function AppShell() {
  const t = useT();
  const { pathname } = useLocation();

  // Speech never outlives the screen that started it: stop on every route change…
  useEffect(() => {
    stopSpeaking();
    noteVisit(pathname); // "Continue" on the home page goes back to the last lesson page
  }, [pathname]);
  // …and when the page is closed. A hidden page (screen off, app in the background) keeps playing, like a
  // music app; the Android notification has a Stop button (lib/backgroundAudio).
  useEffect(() => {
    const stop = () => stopSpeaking();
    window.addEventListener('pagehide', stop);
    const uninstall = installBackgroundAudio();
    return () => {
      window.removeEventListener('pagehide', stop);
      uninstall();
    };
  }, []);
  const group = groupOf(pathname);

  return (
    <div className="min-h-screen md:flex">
      <Celebration />
      <TtsNotice />
      <aside className="hidden md:sticky md:top-0 md:flex md:h-screen md:w-64 md:flex-col md:gap-1 md:overflow-y-auto md:border-r md:border-sakura/40 md:bg-surface md:p-4">
        <div className="mb-4 flex items-center gap-2 px-2">
          <span className="text-2xl">🌸</span>
          <span className="text-xl font-black text-rose">Nihongo Sensei</span>
        </div>
        <nav className="flex flex-col gap-1" aria-label={t.nav.mainAria}>
          {GROUPS.map((g) => {
            const items = g.items.map(navItem);
            const link = (n: (typeof items)[number]) => (
              <NavLink key={n.to} to={n.to} end={n.to === '/' || n.to === '/bjt'} className={linkClass}>
                <span className="w-6 text-center">{n.icon}</span>
                <span>{t.nav[n.key].label}</span>
              </NavLink>
            );
            if (items.length === 1) return link(items[0]!);
            return (
              <div key={g.key} className="flex flex-col gap-1">
                <p className="px-4 pt-3 text-xs font-black tracking-wide text-muted uppercase">
                  {g.icon} {t.nav.groups[g.key]}
                </p>
                {items.map(link)}
              </div>
            );
          })}
        </nav>
        <div className="mt-auto flex items-center justify-between pt-4">
          <ThemeToggle />
          <SyncDot />
        </div>
        <div className="pt-2">
          <LangSwitch />
        </div>
      </aside>

      <main className="flex-1 px-4 pb-24 pt-4 md:px-8 md:pb-8">
        <div className="mx-auto max-w-5xl">
          <Outlet />
        </div>
      </main>

      <nav
        className="fixed inset-x-0 bottom-0 z-40 flex justify-around border-t border-sakura/50 bg-surface/95 px-1 py-1 backdrop-blur md:hidden"
        aria-label={t.nav.mobileAria}
        style={{ paddingBottom: 'max(4px, env(safe-area-inset-bottom))' }}
      >
        {GROUPS.map((g) => (
          <Link
            key={g.key}
            to={g.to}
            aria-current={group === g.key ? 'page' : undefined}
            className={`flex min-w-0 flex-1 flex-col items-center rounded-2xl px-1 py-1 text-xs font-bold ${group === g.key ? 'text-rose' : 'text-muted'}`}
          >
            <span className="text-lg">{g.icon}</span>
            <span className="truncate">{t.nav.groups[g.key]}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { stopSpeaking } from '../lib/tts';
import { NAV, MOBILE_PRIMARY } from './nav';
import { ThemeToggle } from './ThemeToggle';
import { Celebration } from './Celebration';
import { SyncDot } from './SyncDot';
import { TtsNotice } from './TtsNotice';

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 rounded-full px-4 py-2 font-bold transition ${
    isActive ? 'bg-rose text-white shadow-md' : 'text-text hover:bg-sakura/40'
  }`;

export function AppShell() {
  const [more, setMore] = useState(false);
  const { pathname } = useLocation();

  // Speech never outlives the screen that started it: stop on every route change…
  useEffect(() => {
    stopSpeaking();
  }, [pathname]);
  // …and when the page is left or hidden (tab closed, app sent to background).
  useEffect(() => {
    const stop = () => stopSpeaking();
    const onVisibility = () => document.visibilityState === 'hidden' && stopSpeaking();
    window.addEventListener('pagehide', stop);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      window.removeEventListener('pagehide', stop);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);
  const primary = NAV.filter((n) => MOBILE_PRIMARY.includes(n.to));
  const secondary = NAV.filter((n) => !MOBILE_PRIMARY.includes(n.to));

  return (
    <div className="min-h-screen md:flex">
      <Celebration />
      <TtsNotice />
      <aside className="hidden md:sticky md:top-0 md:flex md:h-screen md:w-64 md:flex-col md:gap-1 md:overflow-y-auto md:border-r md:border-sakura/40 md:bg-surface md:p-4">
        <div className="mb-4 flex items-center gap-2 px-2">
          <span className="text-2xl">🌸</span>
          <span className="text-xl font-black text-rose">Nihongo Sensei</span>
        </div>
        <nav className="flex flex-col gap-1" aria-label="Điều hướng chính">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.to === '/'} className={linkClass}>
              <span className="w-6 text-center">{n.icon}</span>
              <span>{n.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto flex items-center justify-between pt-4">
          <ThemeToggle />
          <SyncDot />
        </div>
      </aside>

      <main className="flex-1 px-4 pb-24 pt-4 md:px-8 md:pb-8">
        <div className="mx-auto max-w-5xl">
          <Outlet />
        </div>
      </main>

      <nav
        className="fixed inset-x-0 bottom-0 z-40 flex justify-around border-t border-sakura/50 bg-surface/95 px-1 py-1 backdrop-blur md:hidden"
        aria-label="Điều hướng di động"
        style={{ paddingBottom: 'max(4px, env(safe-area-inset-bottom))' }}
      >
        {primary.map((n) => (
          <NavLink
            key={n.to}
            to={n.to}
            end={n.to === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center rounded-2xl px-2 py-1 text-xs font-bold ${isActive ? 'text-rose' : 'text-muted'}`
            }
          >
            <span className="text-lg">{n.icon}</span>
            <span>{n.label}</span>
          </NavLink>
        ))}
        <button
          type="button"
          className="flex flex-col items-center rounded-2xl px-2 py-1 text-xs font-bold text-muted"
          onClick={() => setMore((m) => !m)}
          aria-expanded={more}
        >
          <span className="text-lg">✨</span>
          <span>Thêm</span>
        </button>
      </nav>

      {more && (
        <div className="fixed inset-0 z-50 md:hidden" onClick={() => setMore(false)}>
          <div className="absolute inset-0 bg-black/30" />
          <div
            className="card absolute inset-x-3 bottom-20 grid grid-cols-3 gap-2 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {secondary.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                onClick={() => setMore(false)}
                className="flex flex-col items-center rounded-2xl bg-bg px-2 py-3 text-sm font-bold text-text"
              >
                <span className="text-2xl">{n.icon}</span>
                <span>{n.label}</span>
              </NavLink>
            ))}
            <div className="col-span-3 flex justify-center pt-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import type { KeyboardEvent, ReactNode } from 'react';
import { desktopSim, type OS } from '@office-neko/shared';

type AppId = desktopSim.AppId;
type ShellAction = Extract<desktopSim.DesktopAction, { type: 'toggleMenu' | 'setQuery' | 'launch' | 'closeApp' }>;

interface Props {
  os: OS;
  shell: desktopSim.ShellState;
  onShell: (a: ShellAction) => void;
  onTrash: () => void;
  onDropToTrash: () => void;
  children: ReactNode;
}

const TILE: Record<AppId, { cls: string; text: string; win?: string; mac?: string }> = {
  word: { cls: 'bg-[#185ABD] text-white', text: 'W' },
  excel: { cls: 'bg-[#107C41] text-white', text: 'X' },
  ppt: { cls: 'bg-[#C43E1C] text-white', text: 'P' },
  explorer: { cls: 'bg-transparent', text: '', win: '📁', mac: '🗂️' },
  browser: { cls: 'bg-transparent', text: '', win: '🌐', mac: '🧭' },
};

function AppIcon({ app, os, size = 'h-7 w-7 text-base' }: { app: AppId; os: OS; size?: string }) {
  const t = TILE[app];
  return (
    <span aria-hidden className={`inline-flex shrink-0 items-center justify-center rounded-md font-bold leading-none ${size} ${t.cls}`}>
      {t.text || (os === 'win' ? t.win : t.mac)}
    </span>
  );
}

const name = (app: AppId, os: OS) => desktopSim.appName(app, os);

function matches(os: OS, query: string): AppId[] {
  const q = query.trim().toLowerCase();
  return desktopSim.SHELL_APPS.filter((a) => name(a.id, os).toLowerCase().includes(q)).map((a) => a.id);
}

const trashButton = (onTrash: () => void, onDropToTrash: () => void, cls: string) => (
  <button
    type="button"
    aria-label="Thùng rác"
    data-help-id="desktop.trash"
    className={cls}
    onClick={onTrash}
    onDragOver={(e) => e.preventDefault()}
    onDrop={onDropToTrash}
  >
    🗑️
  </button>
);

/** Ô tìm của Start menu / Spotlight: Enter mở kết quả đầu, Esc đóng; phím gõ ở đây không lọt xuống phím tắt của File Explorer. */
function searchKeys(os: OS, shell: desktopSim.ShellState, onShell: Props['onShell']) {
  return (e: KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.key === 'Escape') {
      e.preventDefault();
      onShell({ type: 'toggleMenu' });
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const first = shell.query.trim() ? matches(os, shell.query)[0] : undefined;
      if (first) onShell({ type: 'launch', app: first });
    }
  };
}

function AppWindow({ os, app, onClose }: { os: OS; app: AppId; onClose: () => void }) {
  const n = name(app, os);
  return (
    <div role="dialog" aria-label={n} className="absolute inset-x-4 top-8 z-10 overflow-hidden rounded-xl bg-white shadow-2xl sm:inset-x-10">
      <div className="flex items-center gap-2 border-b border-muted/20 bg-cream px-3 py-1 text-sm">
        {os === 'mac' && (
          <button type="button" aria-label={`Đóng ${n}`} className="h-3 w-3 rounded-full bg-[#FF5F57]" onClick={onClose} />
        )}
        <AppIcon app={app} os={os} size="h-5 w-5 text-xs" />
        <span className="flex-1 font-bold">{n}</span>
        {os === 'win' && (
          <button type="button" aria-label={`Đóng ${n}`} className="rounded px-2 hover:bg-rose/30" onClick={onClose}>
            ✕
          </button>
        )}
      </div>
      <div className="flex flex-col items-center gap-3 px-4 py-10 text-center">
        <AppIcon app={app} os={os} size="h-14 w-14 text-3xl" />
        <p className="text-lg font-bold">Đang mở {n}…</p>
        <p className="text-sm text-muted">Đây là cửa sổ để tập thôi. Bấm {os === 'win' ? '✕' : 'nút đỏ'} để đóng.</p>
      </div>
    </div>
  );
}

function Backdrop({ onClose }: { onClose: () => void }) {
  return <div aria-hidden className="absolute inset-0 z-20" onClick={onClose} />;
}

export function Chrome({ os, shell, onShell, onTrash, onDropToTrash, children }: Props) {
  const launch = (app: AppId) => onShell({ type: 'launch', app });
  const appButton = (app: AppId, cls: string, withLabel: boolean) => (
    <button key={app} type="button" aria-label={name(app, os)} title={name(app, os)} className={cls} onClick={() => launch(app)}>
      <AppIcon app={app} os={os} />
      {withLabel && <span className="max-w-full truncate text-xs">{name(app, os)}</span>}
    </button>
  );
  const appWindow = shell.launched && <AppWindow os={os} app={shell.launched} onClose={() => onShell({ type: 'closeApp' })} />;
  const search = {
    type: 'search',
    autoFocus: true,
    value: shell.query,
    onChange: (e: { target: { value: string } }) => onShell({ type: 'setQuery', text: e.target.value }),
    onKeyDown: searchKeys(os, shell, onShell),
  } as const;

  if (os === 'mac') {
    const results = shell.query.trim() ? matches(os, shell.query) : [];
    return (
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-lavender/60 to-sky/60">
        <div className="flex items-center gap-4 bg-white/70 px-3 py-1 text-sm">
          <span aria-hidden>🐾</span>
          <span className="font-bold">Finder</span>
          <span>Tệp</span>
          <span>Sửa</span>
          <span>Xem</span>
          <button
            type="button"
            aria-label="Spotlight"
            aria-expanded={shell.menuOpen}
            data-help-id="shell.spotlight"
            className="ml-auto rounded px-1 hover:bg-white"
            onClick={() => onShell({ type: 'toggleMenu' })}
          >
            🔍
          </button>
        </div>
        <div className="p-4">
          <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
            <div className="flex items-center gap-2 border-b border-muted/20 bg-cream px-3 py-2">
              <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
              <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
              <span className="h-3 w-3 rounded-full bg-[#28C840]" />
            </div>
            {children}
          </div>
        </div>
        {appWindow}
        {shell.menuOpen && (
          <>
            <Backdrop onClose={() => onShell({ type: 'toggleMenu' })} />
            <div
              role="dialog"
              aria-label="Spotlight"
              className="absolute left-1/2 top-12 z-30 w-80 max-w-[calc(100%-2rem)] -translate-x-1/2 overflow-hidden rounded-2xl bg-white/95 shadow-2xl"
            >
              <div className="flex items-center gap-2 px-3 py-2 text-lg">
                <span aria-hidden>🔍</span>
                <input {...search} aria-label="Tìm kiếm Spotlight" placeholder="Tìm kiếm Spotlight" className="min-w-0 flex-1 bg-transparent outline-none" />
              </div>
              {shell.query.trim() && (
                <div className="border-t border-muted/20 p-1">
                  {results.map((app, i) =>
                    appButton(app, `flex w-full items-center gap-2 rounded-lg px-2 py-1 text-left text-sm ${i === 0 ? 'bg-sky/40' : 'hover:bg-sky/20'}`, true),
                  )}
                  {!results.length && <p className="px-2 py-1 text-sm text-muted">Không thấy ứng dụng nào.</p>}
                </div>
              )}
            </div>
          </>
        )}
        <div
          role="group"
          aria-label="Dock"
          data-help-id="shell.dock"
          className="mx-auto mb-2 flex w-fit max-w-[calc(100%-1rem)] items-center gap-2 rounded-2xl bg-white/70 px-3 py-1 text-2xl"
        >
          {(['explorer', 'browser', 'word', 'excel', 'ppt'] as const).map((app) => appButton(app, 'rounded-xl p-1 hover:bg-white', false))}
          <span aria-hidden className="h-7 w-px bg-muted/30" />
          {trashButton(onTrash, onDropToTrash, 'rounded-xl px-1 hover:bg-white')}
        </div>
      </div>
    );
  }

  const listed = matches(os, shell.query);
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky/70 to-mint/60">
      <div className="p-4">
        <div className="overflow-hidden rounded-xl bg-white shadow-xl">
          <div className="flex items-center justify-between border-b border-muted/20 bg-cream px-3 py-1 text-sm">
            <span className="font-bold">📁 File Explorer</span>
            <span aria-hidden className="tracking-widest text-muted">─ ▢ ✕</span>
          </div>
          {children}
        </div>
      </div>
      {appWindow}
      {shell.menuOpen && (
        <>
          <Backdrop onClose={() => onShell({ type: 'toggleMenu' })} />
          <div
            role="dialog"
            aria-label="Start menu"
            className="absolute bottom-12 left-2 z-30 w-72 max-w-[calc(100%-1rem)] rounded-xl bg-white/95 p-3 shadow-2xl"
          >
            <input
              {...search}
              aria-label="Tìm ứng dụng"
              data-help-id="shell.search"
              placeholder="🔍 Gõ tên ứng dụng để tìm"
              className="mb-3 w-full rounded-full border border-muted/30 px-3 py-1 text-sm outline-none focus:border-sky"
            />
            <p className="mb-1 text-xs font-bold text-muted">{shell.query.trim() ? 'Kết quả' : 'Đã ghim'}</p>
            <div className="grid grid-cols-3 gap-1">
              {listed.map((app) => appButton(app, 'flex min-w-0 flex-col items-center gap-1 rounded-lg p-2 hover:bg-sky/30', true))}
            </div>
            {!listed.length && <p className="text-sm text-muted">Không thấy ứng dụng nào.</p>}
          </div>
        </>
      )}
      <div className="flex items-center gap-3 bg-white/80 px-3 py-1 text-2xl">
        <button
          type="button"
          aria-label="Start"
          aria-expanded={shell.menuOpen}
          data-help-id="shell.start"
          className={`rounded-md px-2 text-base font-bold ${shell.menuOpen ? 'bg-sky' : 'bg-sky/60 hover:bg-sky'}`}
          onClick={() => onShell({ type: 'toggleMenu' })}
        >
          ▦ Start
        </button>
        <div role="group" aria-label="Ứng dụng đã ghim" data-help-id="shell.taskbar" className="flex items-center gap-1">
          {(['explorer', 'browser'] as const).map((app) => appButton(app, 'rounded-md p-1 hover:bg-sky/30', false))}
        </div>
        {trashButton(onTrash, onDropToTrash, 'rounded-md px-1 hover:bg-sky/30')}
      </div>
    </div>
  );
}

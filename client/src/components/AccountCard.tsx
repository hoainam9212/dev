import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { fullSync, getLastSync, getSyncStatus, onSyncStatus, type SyncStatus } from '../sync/sync';
import { getApiBase, setApiBase } from '../api/client';
import { useT } from '../i18n';


export function useSyncStatus(): { status: SyncStatus; detail?: string } {
  const [s, setS] = useState<{ status: SyncStatus; detail?: string }>({ status: getSyncStatus() });
  useEffect(() => onSyncStatus((status, detail) => setS({ status, detail })), []);
  return s;
}

export function AccountCard() {
  const t = useT();
  const user = useAuth((s) => s.user);
  const logout = useAuth((s) => s.logout);
  const { status, detail } = useSyncStatus();
  const [synced, setSynced] = useState<{ pulled: number; pushed: number; sessions: number } | null>(null);
  const [apiBase, setApiBaseState] = useState(getApiBase());

  const serverField = (
    <label className="block text-sm">
      <span className="font-bold">{t.account.serverLabel}</span>
      <span className="block text-xs text-muted">{t.account.serverHint}</span>
      <input
        value={apiBase}
        onChange={(e) => setApiBaseState(e.target.value)}
        onBlur={() => setApiBase(apiBase)}
        placeholder="https://…"
        aria-label={t.account.serverAria}
        className="mt-1 w-full rounded-full bg-cream px-4 py-2 ring-2 ring-sakura/50 focus:outline-none focus:ring-rose dark:bg-bg"
      />
    </label>
  );

  if (!user) {
    return (
      <section className="card space-y-3 p-4 md:p-6">
        <h2 className="font-black">{t.account.title}</h2>
        <p className="text-sm text-muted">{t.account.signedOutCta}</p>
        {serverField}
        <div className="flex gap-2">
          <Link to="/login" className="btn-primary">
            {t.account.login}
          </Link>
          <Link to="/register" className="btn-soft">
            {t.account.register}
          </Link>
        </div>
      </section>
    );
  }

  const last = getLastSync();
  return (
    <section className="card space-y-3 p-4 md:p-6">
      <h2 className="font-black">{t.account.title}</h2>
      <p className="text-sm">
        <span className="font-bold">{user.displayName}</span> <span className="text-muted">· {user.email}</span>
      </p>
      <p className="text-sm text-muted" data-testid="sync-status">
        {t.account.status[status]}
        {detail ? ` · ${detail}` : ''}
        {last !== '1970-01-01T00:00:00.000Z' && t.account.lastSync(new Date(last).toLocaleString(t.common.locale))}
      </p>
      {synced && (
        <p className="text-sm font-bold text-emerald-600">{t.account.synced(synced.pulled, synced.pushed, synced.sessions)}</p>
      )}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="btn-primary"
          disabled={status === 'syncing'}
          onClick={async () => {
            setSynced(null);
            try {
              const r = await fullSync();
              if (r) setSynced(r);
            } catch {
              /* status shows the error */
            }
          }}
        >
          {t.account.syncNow}
        </button>
        <button type="button" className="btn-soft" onClick={logout}>
          {t.account.logout}
        </button>
      </div>
    </section>
  );
}

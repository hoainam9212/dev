import { Link } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { useSyncStatus } from '../components/AccountCard';

const COLOR: Record<string, string> = { idle: 'bg-muted', syncing: 'bg-sky animate-pulse', ok: 'bg-emerald-400', error: 'bg-rose', offline: 'bg-lavender' };

/** Small sync indicator in the sidebar (hidden when not logged in). */
export function SyncDot() {
  const user = useAuth((s) => s.user);
  const { status } = useSyncStatus();
  if (!user) return null;
  return (
    <Link to="/settings" className="flex items-center gap-1 text-xs text-muted" title="Trạng thái đồng bộ" aria-label={`Đồng bộ: ${status}`}>
      <span className={`inline-block h-2.5 w-2.5 rounded-full ${COLOR[status] ?? 'bg-muted'}`} />
      {user.displayName}
    </Link>
  );
}

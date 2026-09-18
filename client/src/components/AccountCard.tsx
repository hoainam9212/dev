import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { fullSync, getLastSync, getSyncStatus, onSyncStatus, type SyncStatus } from '../sync/sync';

const STATUS_LABEL: Record<SyncStatus, string> = {
  idle: 'Chưa đồng bộ',
  syncing: 'Đang đồng bộ…',
  ok: 'Đã đồng bộ',
  error: 'Lỗi đồng bộ',
  offline: 'Ngoại tuyến',
};

export function useSyncStatus(): { status: SyncStatus; detail?: string } {
  const [s, setS] = useState<{ status: SyncStatus; detail?: string }>({ status: getSyncStatus() });
  useEffect(() => onSyncStatus((status, detail) => setS({ status, detail })), []);
  return s;
}

export function AccountCard() {
  const user = useAuth((s) => s.user);
  const logout = useAuth((s) => s.logout);
  const { status, detail } = useSyncStatus();
  const [msg, setMsg] = useState<string | null>(null);

  if (!user) {
    return (
      <section className="card space-y-3 p-4 md:p-6">
        <h2 className="font-black">Tài khoản</h2>
        <p className="text-sm text-muted">Đăng nhập để đồng bộ tiến độ giữa các thiết bị. Không bắt buộc.</p>
        <div className="flex gap-2">
          <Link to="/login" className="btn-primary">
            Đăng nhập
          </Link>
          <Link to="/register" className="btn-soft">
            Đăng ký
          </Link>
        </div>
      </section>
    );
  }

  const last = getLastSync();
  return (
    <section className="card space-y-3 p-4 md:p-6">
      <h2 className="font-black">Tài khoản</h2>
      <p className="text-sm">
        <span className="font-bold">{user.displayName}</span> <span className="text-muted">· {user.email}</span>
      </p>
      <p className="text-sm text-muted" data-testid="sync-status">
        {STATUS_LABEL[status]}
        {detail ? ` · ${detail}` : ''}
        {last !== '1970-01-01T00:00:00.000Z' && ` · lần cuối ${new Date(last).toLocaleString('vi-VN')}`}
      </p>
      {msg && <p className="text-sm font-bold text-emerald-600">{msg}</p>}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="btn-primary"
          disabled={status === 'syncing'}
          onClick={async () => {
            setMsg(null);
            try {
              const r = await fullSync();
              if (r) setMsg(`Đã nhận ${r.pulled} · gửi ${r.pushed} thẻ · ${r.sessions} phiên học.`);
            } catch {
              /* status shows the error */
            }
          }}
        >
          🔄 Đồng bộ ngay
        </button>
        <button type="button" className="btn-soft" onClick={logout}>
          Đăng xuất
        </button>
      </div>
    </section>
  );
}

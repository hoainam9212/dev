import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useOs, useProfileId } from '../db/profile';
import type { SandboxDoc } from '../db/db';
import { SIMS } from '../sims/registry';
import { ErrorBoundary } from '../app/ErrorBoundary';
import { blankState, getDoc, putDocState, renameDoc, type SandboxSim } from '../sandbox/docs';

const SAVE_DELAY_MS = 800;

export function SandboxDocPage() {
  const { id = '' } = useParams();
  const profileId = useProfileId();
  const os = useOs();
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState<{ doc: SandboxDoc; initial: unknown } | null>(null);
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'saved' | 'saving' | 'error'>('saved');
  const pending = useRef<{ state: unknown } | null>(null);
  const timer = useRef<number | undefined>(undefined);
  /** Bản ghi tệp đã soát chủ, tên luôn là tên mới nhất — để ghi bằng một lệnh `put` duy nhất. */
  const docRef = useRef<SandboxDoc | null>(null);

  useEffect(() => {
    if (!profileId) return;
    let alive = true;
    void getDoc(profileId, id).then((doc) => {
      if (!alive) return;
      if (!doc) {
        navigate('/sandbox', { replace: true, state: { notice: 'Không tìm thấy tệp này. Có thể nó đã bị xoá.' } });
        return;
      }
      docRef.current = doc;
      setLoaded({ doc, initial: doc.state ?? blankState(doc.sim as SandboxSim) });
      setName(doc.name);
    });
    return () => {
      alive = false;
    };
  }, [profileId, id, navigate]);

  const flush = useCallback(() => {
    window.clearTimeout(timer.current);
    const p = pending.current;
    const doc = docRef.current;
    if (!p || !doc) return;
    pending.current = null;
    putDocState(doc, p.state).then(
      () => {
        if (!pending.current) setStatus('saved');
      },
      () => setStatus('error'),
    );
  }, []);

  const initial = loaded?.initial;
  const onState = useCallback(
    (s: unknown) => {
      // Sim báo state ngay lúc mở (chính là `initial`): chưa sửa gì thì không lưu.
      if (s === initial) return;
      pending.current = { state: s };
      setStatus('saving');
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(flush, SAVE_DELAY_MS);
    },
    [initial, flush],
  );

  // Đóng tab, chuyển tab hay rời trang thì ghi ngay phần đang chờ.
  useEffect(() => {
    const onHide = () => {
      if (document.visibilityState === 'hidden') flush();
    };
    document.addEventListener('visibilitychange', onHide);
    window.addEventListener('pagehide', flush);
    return () => {
      document.removeEventListener('visibilitychange', onHide);
      window.removeEventListener('pagehide', flush);
      flush();
    };
  }, [flush]);

  if (!loaded || !profileId) return null;
  const def = SIMS[loaded.doc.sim];
  const Sim = def?.Component;

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-4 p-4 pb-24">
      <header className="flex flex-wrap items-center gap-3">
        <Link to="/sandbox" className="btn" onClick={flush}>← Phòng tự do</Link>
        <input
          aria-label="Đổi tên tệp"
          value={name}
          maxLength={60}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') e.currentTarget.blur();
          }}
          onBlur={() => {
            if (!name.trim()) setName(loaded.doc.name);
            else {
              if (docRef.current) docRef.current = { ...docRef.current, name: name.trim().slice(0, 60) };
              void renameDoc(profileId, id, name);
            }
          }}
          className="min-w-0 flex-1 rounded-full border-2 border-transparent bg-transparent px-3 py-1 text-xl font-extrabold outline-none hover:border-peach/60 focus:border-rose focus:bg-white"
        />
        <span role="status" className={`text-sm font-semibold ${status === 'error' ? 'text-rose-ink' : 'text-muted'}`}>
          {status === 'saving' ? 'Đang lưu…' : status === 'error' ? 'Chưa lưu được, sửa tiếp để thử lại' : 'Đã lưu'}
        </span>
      </header>
      {Sim ? (
        <ErrorBoundary message="Trình mô phỏng gặp lỗi… Hãy thử tải lại trang.">
          <Sim initial={loaded.initial} onState={onState} os={os} spotlight={null} />
        </ErrorBoundary>
      ) : (
        <div className="card p-6">😿 Không mở được loại tệp này.</div>
      )}
    </div>
  );
}

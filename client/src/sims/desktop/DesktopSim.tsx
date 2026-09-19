import { useCallback, useEffect, useReducer, useRef, useState, type KeyboardEvent } from 'react';
import { desktopSim, isModPressed, vfs } from '@office-neko/shared';
import type { SimProps } from '../types';
import { Chrome } from './Chrome';
import { FileArea, type MenuAction } from './FileArea';

type S = desktopSim.DesktopState;

function crumbs(s: S): string {
  const root = s.os === 'win' ? 'Máy tính này' : 'Thư mục nhà';
  if (s.cwd === s.fs.trashId) return 'Thùng rác';
  const parts = vfs.pathOf(s.fs, s.cwd).split('/').filter(Boolean);
  return [root, ...parts].join(' › ');
}

export function DesktopSim({ initial, onState }: SimProps<S>) {
  const [state, dispatch] = useReducer(desktopSim.reduceDesktop, initial);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [tip, setTip] = useState<string | null>(null);
  const pendingRename = useRef(false);
  const dragIds = useRef<string[]>([]);

  useEffect(() => {
    onState(state);
    if (pendingRename.current && state.selected.length === 1) {
      pendingRename.current = false;
      setRenamingId(state.selected[0]!);
    }
  }, [state, onState]);

  const os = state.os;
  const inTrash = state.cwd === state.fs.trashId;
  const sel = state.selected;
  const one = sel.length === 1 ? sel[0]! : null;

  const newFolder = useCallback(() => {
    pendingRename.current = true;
    dispatch({ type: 'mkdir', name: desktopSim.uniqueName(state.fs, state.cwd, os === 'win' ? 'Thư mục mới' : 'thư mục không tên') });
  }, [state.fs, state.cwd, os]);

  const open = (id: string) => {
    const n = state.fs.nodes[id];
    if (!n) return;
    if (n.type === 'file') setTip('Đây là file để luyện tập nên chưa mở được 😺');
    else {
      setTip(null);
      dispatch({ type: 'open', id });
    }
  };

  const onMenu = (action: MenuAction, id: string | null) => {
    const ids = id ? [id] : sel;
    switch (action) {
      case 'open': if (id) open(id); break;
      case 'rename': if (id) setRenamingId(id); break;
      case 'copy': dispatch({ type: 'copy', ids }); break;
      case 'cut': dispatch({ type: 'cut', ids }); break;
      case 'remove': dispatch({ type: 'remove', ids }); break;
      case 'restore': if (id) dispatch({ type: 'restore', id }); break;
      case 'newFolder': newFolder(); break;
      case 'paste': dispatch({ type: 'paste' }); break;
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (renamingId) return;
    const mod = isModPressed(e, os);
    const k = e.key.toLowerCase();
    const handled = () => e.preventDefault();
    if (mod && e.shiftKey && k === 'n') return handled(), newFolder();
    if (mod && k === 'c' && sel.length) return handled(), dispatch({ type: 'copy', ids: sel });
    if (mod && k === 'x' && sel.length) return handled(), dispatch({ type: 'cut', ids: sel });
    if (mod && k === 'v') return handled(), dispatch({ type: 'paste' });
    if (mod && k === 'z') return handled(), dispatch({ type: 'undo' });
    if (os === 'win') {
      if (e.key === 'F2' && one) return handled(), setRenamingId(one);
      if (e.key === 'Delete' && sel.length) return handled(), dispatch({ type: 'remove', ids: sel });
      if (e.key === 'Backspace' || (e.altKey && e.key === 'ArrowUp')) return handled(), dispatch({ type: 'up' });
      if (e.key === 'Enter' && one) return handled(), open(one);
    } else {
      if (e.key === 'Enter' && one) return handled(), setRenamingId(one);
      if (mod && e.key === 'Backspace' && sel.length) return handled(), dispatch({ type: 'remove', ids: sel });
      if (mod && e.key === 'ArrowUp') return handled(), dispatch({ type: 'up' });
      if (mod && (e.key === 'ArrowDown' || k === 'o') && one) return handled(), open(one);
    }
  };

  const btn = 'rounded-lg px-2 py-1 text-sm hover:bg-sky/30 disabled:opacity-40';
  const topFolders = vfs.childrenOf(state.fs, state.fs.rootId).filter((n) => n.type === 'folder');

  return (
    <div data-testid="desktop-sim" tabIndex={0} onKeyDown={onKeyDown} className="outline-none focus-visible:ring-4 focus-visible:ring-sky rounded-3xl">
      <Chrome
        os={os}
        onTrash={() => dispatch({ type: 'open', id: state.fs.trashId })}
        onDropToTrash={() => {
          if (dragIds.current.length) dispatch({ type: 'remove', ids: dragIds.current });
          dragIds.current = [];
        }}
      >
        <div className="flex flex-wrap items-center gap-1 border-b border-muted/20 px-2 py-1">
          {inTrash ? (
            <>
              <button type="button" className={btn} data-help-id="desktop.restore" disabled={!one} onClick={() => one && dispatch({ type: 'restore', id: one })}>♻️ Khôi phục</button>
              <button type="button" className={btn} data-help-id="desktop.emptyTrash" onClick={() => dispatch({ type: 'emptyTrash' })}>🧹 Dọn sạch thùng rác</button>
            </>
          ) : (
            <>
              <button type="button" className={btn} data-help-id="desktop.newFolder" onClick={newFolder}>📁 Thư mục mới</button>
              <button type="button" className={btn} data-help-id="desktop.rename" disabled={!one} onClick={() => one && setRenamingId(one)}>✏️ Đổi tên</button>
              <button type="button" className={btn} data-help-id="desktop.delete" disabled={!sel.length} onClick={() => dispatch({ type: 'remove', ids: sel })}>🗑️ Xoá</button>
              <button type="button" className={btn} data-help-id="desktop.copy" disabled={!sel.length} onClick={() => dispatch({ type: 'copy', ids: sel })}>📋 Sao chép</button>
              <button type="button" className={btn} data-help-id="desktop.cut" disabled={!sel.length} onClick={() => dispatch({ type: 'cut', ids: sel })}>✂️ Cắt</button>
              <button type="button" className={btn} data-help-id="desktop.paste" disabled={!state.clipboard} onClick={() => dispatch({ type: 'paste' })}>📥 Dán</button>
              <button type="button" className={btn} data-help-id="desktop.undo" disabled={!state.past.length} onClick={() => dispatch({ type: 'undo' })}>↩️ Hoàn tác</button>
            </>
          )}
          <button type="button" className={btn} data-help-id="desktop.up" onClick={() => dispatch({ type: 'up' })}>⬆️ Lên</button>
        </div>
        <div aria-label="Thanh địa chỉ" data-help-id="desktop.address" className="border-b border-muted/20 bg-cream px-3 py-1 text-sm">
          {crumbs(state)}
        </div>
        <div className="flex min-h-64">
          <nav aria-label="Thanh bên" className="w-40 shrink-0 space-y-1 border-r border-muted/20 p-2 text-sm">
            <button type="button" className={`${btn} w-full text-left`} onClick={() => dispatch({ type: 'open', id: state.fs.rootId })}>
              🏠 {os === 'win' ? 'Máy tính này' : 'Thư mục nhà'}
            </button>
            {topFolders.map((f) => (
              <button key={f.id} type="button" className={`${btn} w-full text-left`} onClick={() => dispatch({ type: 'open', id: f.id })}>
                📁 {f.name}
              </button>
            ))}
            <button
              type="button"
              className={`${btn} w-full text-left`}
              onClick={() => dispatch({ type: 'open', id: state.fs.trashId })}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => {
                if (dragIds.current.length) dispatch({ type: 'remove', ids: dragIds.current });
                dragIds.current = [];
              }}
            >
              🗑️ Thùng rác
            </button>
          </nav>
          <FileArea
            os={os}
            fs={state.fs}
            cwd={state.cwd}
            selected={sel}
            canPaste={!!state.clipboard}
            renamingId={renamingId}
            onSelect={(ids) => dispatch({ type: 'select', ids })}
            onOpen={open}
            onMenu={onMenu}
            onRenameDone={(id, name) => {
              setRenamingId(null);
              const cur = state.fs.nodes[id]?.name;
              if (name !== null && name.trim() && name.trim() !== cur) dispatch({ type: 'rename', id, name });
            }}
            onDragStartItem={(id) => {
              dragIds.current = sel.includes(id) ? sel : [id];
            }}
            onDropOn={(folderId) => {
              const ids = dragIds.current.filter((x) => x !== folderId);
              if (ids.length) dispatch({ type: 'move', ids, destId: folderId });
              dragIds.current = [];
            }}
          />
        </div>
        {state.error && (
          <div role="alert" className="flex items-center gap-3 border-t border-rose/40 bg-rose/10 px-3 py-2 text-sm text-rose-ink">
            <span className="flex-1">{vfs.VFS_ERROR_VI[state.error]}</span>
            <button type="button" className="btn !px-3 !py-1" onClick={() => dispatch({ type: 'clearError' })}>Đã hiểu</button>
          </div>
        )}
        {tip && <p className="border-t border-muted/20 px-3 py-2 text-sm text-muted">{tip}</p>}
      </Chrome>
    </div>
  );
}

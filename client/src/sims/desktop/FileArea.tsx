import { useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent as RKE, type MouseEvent as RME } from 'react';
import { vfs, type OS } from '@office-neko/shared';
import { menuKeyDown } from '../../components/ribbon';
import { clampMenuIn, isMenuKey } from '../../lib/clampMenu';

export type MenuAction = 'open' | 'rename' | 'copy' | 'cut' | 'remove' | 'restore' | 'newFolder' | 'paste';

interface Props {
  os: OS;
  fs: vfs.Vfs;
  cwd: string;
  selected: string[];
  canPaste: boolean;
  renamingId: string | null;
  onSelect: (ids: string[]) => void;
  onOpen: (id: string) => void;
  onMenu: (action: MenuAction, id: string | null) => void;
  onRenameDone: (id: string, name: string | null) => void;
  onDragStartItem: (id: string) => void;
  onDropOn: (folderId: string) => void;
}

function iconFor(n: vfs.VNode): string {
  if (n.type === 'folder') return '📁';
  const ext = n.name.toLowerCase().split('.').pop();
  if (ext === 'jpg' || ext === 'png') return '🖼️';
  if (ext === 'pdf') return '📕';
  if (ext === 'docx') return '📘';
  if (ext === 'xlsx') return '📗';
  if (ext === 'pptx') return '📙';
  return '📄';
}

export function FileArea(p: Props) {
  const [menu, setMenu] = useState<{ id: string | null; x: number; y: number; byKeys: boolean } | null>(null);
  const [menuPos, setMenuPos] = useState<{ left: number; top: number } | null>(null);
  /** Mục giữ điểm dừng Tab của danh sách (roving tabindex). */
  const [activeId, setActiveId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  /** Mốc của Shift+click / Shift+mũi tên: mục bấm thường hoặc Ctrl/⌘+click gần nhất. */
  const anchor = useRef<string | null>(null);
  const itemEls = useRef(new Map<string, HTMLButtonElement>());
  const inTrash = p.cwd === p.fs.trashId;
  const items = vfs.childrenOf(p.fs, p.cwd);
  const order = items.map((n) => n.id);
  const tabStop = activeId && order.includes(activeId) ? activeId : (order.find((id) => p.selected.includes(id)) ?? order[0]);

  const placeMenu = (id: string | null, x: number, y: number, byKeys: boolean, from: HTMLElement) => {
    if (id && !p.selected.includes(id)) p.onSelect([id]);
    opener.current = from;
    setMenu({ id, x, y, byKeys });
  };
  const openMenu = (e: RME, id: string | null) => {
    e.preventDefault();
    e.stopPropagation();
    const rect = containerRef.current?.getBoundingClientRect();
    placeMenu(id, rect ? e.clientX - rect.left : e.clientX, rect ? e.clientY - rect.top : e.clientY, false, e.currentTarget as HTMLElement);
  };
  /** Đóng menu; `refocus` thì trả focus về chỗ đã mở (Esc, Tab, chọn một mục). */
  const closeMenu = (refocus = false) => {
    setMenu(null);
    if (refocus && opener.current?.isConnected) opener.current.focus();
  };
  const choose = (action: MenuAction) => {
    const id = menu?.id ?? null;
    closeMenu(true);
    p.onMenu(action, id);
  };

  /** Chọn mọi mục từ `from` tới `to` theo thứ tự đang hiện. */
  const selectRange = (from: string, to: string) => {
    const [a, b] = [order.indexOf(from), order.indexOf(to)].sort((x, y) => x - y);
    p.onSelect(a! < 0 ? [to] : order.slice(a, b! + 1));
  };
  const toggle = (id: string) => p.onSelect(p.selected.includes(id) ? p.selected.filter((x) => x !== id) : [...p.selected, id]);
  const focusItem = (id: string) => {
    setActiveId(id);
    itemEls.current.get(id)?.focus();
  };

  const onItemKeyDown = (e: RKE<HTMLButtonElement>, id: string) => {
    if (isMenuKey(e)) {
      e.preventDefault();
      e.stopPropagation();
      const el = e.currentTarget;
      placeMenu(id, el.offsetLeft + 8, el.offsetTop + el.offsetHeight, true, el);
      return;
    }
    const mod = p.os === 'mac' ? e.metaKey : e.ctrlKey;
    if (e.key === ' ') {
      e.preventDefault();
      if (mod) toggle(id);
      else p.onSelect([id]);
      anchor.current = id;
      return;
    }
    // Alt+↑ (Windows) và ⌘+mũi tên (Mac) là phím tắt của cả khung (lên thư mục cha, mở mục), để chúng đi tiếp.
    if (e.altKey || e.metaKey) return;
    const i = order.indexOf(id);
    const to =
      e.key === 'ArrowRight' || e.key === 'ArrowDown' ? i + 1
      : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? i - 1
      : e.key === 'Home' ? 0
      : e.key === 'End' ? order.length - 1
      : null;
    if (to === null) return;
    e.preventDefault();
    const target = order[Math.max(0, Math.min(order.length - 1, to))]!;
    if (e.shiftKey) selectRange(anchor.current ?? id, target);
    else if (!e.ctrlKey) {
      p.onSelect([target]);
      anchor.current = target;
    }
    focusItem(target);
  };

  const menuItems: [MenuAction, string][] = menu?.id
    ? inTrash
      ? [['restore', 'Khôi phục']]
      : [['open', 'Mở'], ['rename', 'Đổi tên'], ['copy', 'Sao chép'], ['cut', 'Cắt'], ['remove', 'Xoá']]
    : inTrash
      ? []
      : [['newFolder', 'Thư mục mới'], ['paste', 'Dán']];

  // Đóng menu bằng Escape hoặc khi bấm ra ngoài vùng file (kể cả ngoài trình mô phỏng).
  useEffect(() => {
    if (!menu) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };
    const onPointerDown = (e: PointerEvent) => {
      if (containerRef.current?.contains(e.target as Node)) return;
      closeMenu();
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [menu]);

  // Giữ menu trọn trong vùng file (jsdom chưa đo được thì dùng thẳng toạ độ chuột).
  useLayoutEffect(() => {
    setMenuPos(menu ? clampMenuIn(containerRef.current, menuRef.current, menu.x, menu.y) : null);
  }, [menu, menuItems.length]);
  // Mở bằng phím thì focus mục bấm được đầu tiên.
  useEffect(() => {
    if (menu?.byKeys) menuRef.current?.querySelector<HTMLElement>('[data-menu-item]:not([disabled])')?.focus();
  }, [menu]);

  return (
    <div
      ref={containerRef}
      data-testid="file-area"
      className="relative min-h-56 flex-1 p-3"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          p.onSelect([]);
          closeMenu();
        }
      }}
      onContextMenu={(e) => openMenu(e, null)}
    >
      {items.length === 0 && <p className="p-4 text-muted">{inTrash ? 'Thùng rác đang trống.' : 'Thư mục này đang trống.'}</p>}
      <ul
        role="listbox"
        aria-label="Các file và thư mục"
        aria-multiselectable="true"
        className="grid grid-cols-[repeat(auto-fill,minmax(7rem,1fr))] gap-2"
      >
        {items.map((n) => {
          const selected = p.selected.includes(n.id);
          return (
            <li key={n.id} role="none">
              {p.renamingId === n.id ? (
                <div className="flex flex-col items-center gap-1 rounded-xl p-2">
                  <span className="text-4xl" aria-hidden>{iconFor(n)}</span>
                  <input
                    aria-label="Tên mới"
                    defaultValue={n.name}
                    autoFocus
                    onFocus={(e) => {
                      const dot = n.type === 'file' ? n.name.lastIndexOf('.') : -1;
                      e.currentTarget.setSelectionRange(0, dot > 0 ? dot : n.name.length);
                    }}
                    onKeyDown={(e) => {
                      e.stopPropagation();
                      if (e.key === 'Enter') p.onRenameDone(n.id, e.currentTarget.value);
                      if (e.key === 'Escape') p.onRenameDone(n.id, null);
                    }}
                    onBlur={(e) => p.onRenameDone(n.id, e.currentTarget.value)}
                    className="w-full rounded-md border-2 border-rose px-1 text-center text-sm"
                  />
                </div>
              ) : (
                <button
                  ref={(el) => {
                    if (el) itemEls.current.set(n.id, el);
                    else itemEls.current.delete(n.id);
                  }}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  tabIndex={n.id === tabStop ? 0 : -1}
                  data-path={vfs.pathOf(p.fs, n.id)}
                  draggable
                  className={`flex w-full select-none flex-col items-center gap-1 rounded-xl p-2 text-sm ${selected ? 'bg-sky/40 ring-2 ring-sky' : 'hover:bg-sky/15'}`}
                  onMouseDown={(e) => e.shiftKey && e.preventDefault()}
                  onFocus={() => setActiveId(n.id)}
                  onKeyDown={(e) => onItemKeyDown(e, n.id)}
                  onClick={(e) => {
                    e.stopPropagation();
                    closeMenu();
                    setActiveId(n.id);
                    const add = p.os === 'mac' ? e.metaKey : e.ctrlKey;
                    if (e.shiftKey) return selectRange(anchor.current ?? n.id, n.id);
                    anchor.current = n.id;
                    if (add) toggle(n.id);
                    else p.onSelect([n.id]);
                  }}
                  onDoubleClick={() => p.onOpen(n.id)}
                  onContextMenu={(e) => openMenu(e, n.id)}
                  onDragStart={(e) => {
                    p.onDragStartItem(n.id);
                    e.dataTransfer?.setData('text/plain', n.id);
                  }}
                  onDragOver={(e) => n.type === 'folder' && e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (n.type === 'folder') p.onDropOn(n.id);
                  }}
                >
                  <span className="text-4xl" aria-hidden>{iconFor(n)}</span>
                  <span className="break-all">{n.name}</span>
                </button>
              )}
            </li>
          );
        })}
      </ul>
      {menu && menuItems.length > 0 && (
        <ul
          ref={menuRef}
          role="menu"
          aria-label="Menu chuột phải"
          className="card absolute z-20 w-48 p-2"
          style={{ left: menuPos?.left ?? menu.x, top: menuPos?.top ?? menu.y }}
          onKeyDown={(e) => {
            // Phím trong menu không lọt ra phím tắt của khung (Enter mở file, Delete xoá…).
            e.stopPropagation();
            if (e.key === 'Escape') {
              e.preventDefault();
              closeMenu(true);
            } else menuKeyDown(e, () => closeMenu(true));
          }}
        >
          {menuItems.map(([action, label]) => (
            <li key={action} role="none">
              <button
                type="button"
                role="menuitem"
                data-menu-item
                disabled={action === 'paste' && !p.canPaste}
                onClick={() => choose(action)}
                className="w-full rounded-xl px-3 py-1.5 text-left hover:bg-peach/30 disabled:opacity-40"
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

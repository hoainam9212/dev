import { useEffect, useLayoutEffect, useRef, useState, type MouseEvent as RME } from 'react';
import { vfs, type OS } from '@office-neko/shared';
import { placePopover, type PopoverPosition } from '../../help/placement';

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
  const [menu, setMenu] = useState<{ id: string | null; x: number; y: number } | null>(null);
  const [menuPos, setMenuPos] = useState<PopoverPosition | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const inTrash = p.cwd === p.fs.trashId;
  const items = vfs.childrenOf(p.fs, p.cwd);

  const openMenu = (e: RME, id: string | null) => {
    e.preventDefault();
    e.stopPropagation();
    if (id && !p.selected.includes(id)) p.onSelect([id]);
    const rect = containerRef.current?.getBoundingClientRect();
    setMenu({ id, x: rect ? e.clientX - rect.left : e.clientX, y: rect ? e.clientY - rect.top : e.clientY });
  };
  const closeMenu = () => setMenu(null);
  const choose = (action: MenuAction) => {
    const id = menu?.id ?? null;
    closeMenu();
    p.onMenu(action, id);
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

  // Giữ menu trong vùng nhìn thấy được — chỉ kẹp toạ độ khi đã đo được kích thước
  // thật của vùng chứa/menu (trong test jsdom không có layout nên bỏ qua, dùng
  // thẳng toạ độ chuột đã lưu).
  useLayoutEffect(() => {
    if (!menu) {
      setMenuPos(null);
      return;
    }
    const container = containerRef.current;
    const menuEl = menuRef.current;
    const cw = container?.clientWidth ?? 0;
    const ch = container?.clientHeight ?? 0;
    if (!container || !menuEl || cw === 0 || ch === 0) {
      setMenuPos({ left: menu.x, top: menu.y, above: false });
      return;
    }
    const anchor = { left: menu.x, top: menu.y, right: menu.x, bottom: menu.y, width: 0, height: 0 };
    setMenuPos(placePopover(anchor, { width: menuEl.offsetWidth, height: menuEl.offsetHeight }, { width: cw, height: ch }, { gap: 0, margin: 4 }));
  }, [menu, menuItems.length]);

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
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(7rem,1fr))] gap-2">
        {items.map((n) => {
          const selected = p.selected.includes(n.id);
          return (
            <li key={n.id}>
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
                  type="button"
                  data-path={vfs.pathOf(p.fs, n.id)}
                  aria-pressed={selected}
                  draggable
                  className={`flex w-full flex-col items-center gap-1 rounded-xl p-2 text-sm ${selected ? 'bg-sky/40 ring-2 ring-sky' : 'hover:bg-sky/15'}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    closeMenu();
                    const add = p.os === 'mac' ? e.metaKey : e.ctrlKey;
                    if (add) p.onSelect(selected ? p.selected.filter((x) => x !== n.id) : [...p.selected, n.id]);
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
          className="card absolute z-20 w-48 p-2"
          style={{ left: menuPos?.left ?? menu.x, top: menuPos?.top ?? menu.y }}
        >
          {menuItems.map(([action, label]) => (
            <li key={action}>
              <button
                type="button"
                role="menuitem"
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

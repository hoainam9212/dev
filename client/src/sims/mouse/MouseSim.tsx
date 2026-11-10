import { useEffect, useLayoutEffect, useReducer, useRef, useState, type MouseEvent as ReactMouseEvent } from 'react';
import { mouseSim } from '@office-neko/shared';
import type { SimProps } from '../types';
import { Mochi } from '../../components/Mochi';
import { menuKeyDown } from '../../components/ribbon';
import { clampMenuIn, isMenuKey } from '../../lib/clampMenu';

type S = mouseSim.MouseState;

const pos = (i: number) => ({ left: `${8 + ((i * 37) % 76)}%`, top: `${10 + ((i * 53) % 66)}%` });

const LABEL: Record<mouseSim.MouseGame, string> = {
  click: 'Bong bóng',
  double: 'Hộp quà',
  right: 'Thùng',
  drag: 'Cá',
  scroll: 'Mèo',
};
const ICON: Record<mouseSim.MouseGame, string> = { click: '🫧', double: '🎁', right: '📦', drag: '🐟', scroll: '🐱' };

export function MouseSim({ initial, onState, os }: SimProps<S>) {
  const [state, dispatch] = useReducer(mouseSim.reduceMouse, initial);
  const [tip, setTip] = useState<string | null>(null);
  const [menuFor, setMenuFor] = useState<{ id: string; x: number; y: number; byKeys: boolean } | null>(null);
  const [menuPos, setMenuPos] = useState<{ left: number; top: number } | null>(null);
  const dragging = useRef<string | null>(null);
  const areaRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  // Kẹp menu trong khung trò chơi (khung `overflow-hidden` nên menu tràn là bị cắt mất).
  useLayoutEffect(() => {
    setMenuPos(menuFor ? clampMenuIn(areaRef.current, menuRef.current, menuFor.x, menuFor.y) : null);
  }, [menuFor]);
  // Mở bằng phím thì focus mục đầu.
  useEffect(() => {
    if (menuFor?.byKeys) menuRef.current?.querySelector<HTMLElement>('[data-menu-item]')?.focus();
  }, [menuFor]);
  /** Đóng menu và trả focus về chỗ đã mở (Esc, Tab). */
  const closeMenu = () => {
    setMenuFor(null);
    if (opener.current?.isConnected) opener.current.focus();
  };

  useEffect(() => {
    onState(state);
  }, [state, onState]);

  const targets = mouseSim.mouseTargets(state);
  const remaining = targets.filter((id) => !state.hitIds.includes(id));
  const firstId = remaining[0];
  const done = remaining.length === 0;
  const game = state.game;

  const hit = (id: string) => {
    setTip(null);
    dispatch({ type: 'hit', id });
  };
  const miss = () => dispatch({ type: 'miss' });
  const onBackground = (e: ReactMouseEvent) => {
    if (e.target !== e.currentTarget) return;
    setMenuFor(null);
    if (game === 'click' || game === 'double') miss();
  };

  const itemClass = 'absolute grid h-14 w-14 place-items-center rounded-full text-4xl transition hover:scale-110';

  return (
    <div className="card space-y-3 p-4">
      <p aria-live="polite" className="font-bold">
        Đã trúng {state.hitIds.length}/{state.total}
      </p>
      {game === 'scroll' ? (
        <div data-testid="mouse-area" className="relative h-72 overflow-y-auto rounded-3xl bg-sky/20" onClick={onBackground}>
          <div className="relative" style={{ height: 1600 }}>
            {done && (
              <div className="sticky top-0 z-20 grid h-72 place-items-center">
                <div className="flex items-center gap-3 rounded-3xl bg-white/90 p-4 font-bold">
                  <Mochi mood="happy" size={64} animated={false} /> Tuyệt vời! 🎉
                </div>
              </div>
            )}
            <p className="p-4 text-muted">Lăn bánh xe chuột (hoặc vuốt hai ngón) để tìm các chú mèo đang trốn 👇</p>
            {remaining.map((id) => {
              const i = targets.indexOf(id);
              return (
                <button
                  key={id}
                  type="button"
                  aria-label={`Mèo số ${i + 1}`}
                  data-help-id={id === firstId ? 'mouse.target' : undefined}
                  className={itemClass}
                  style={{ left: `${15 + ((i * 41) % 60)}%`, top: 360 + i * 380 }}
                  onClick={() => hit(id)}
                >
                  🐱
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div
          ref={areaRef}
          data-testid="mouse-area"
          className="relative h-72 overflow-hidden rounded-3xl bg-sky/20"
          onClick={onBackground}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            if (e.target !== e.currentTarget) return;
            if (dragging.current) miss();
            dragging.current = null;
          }}
        >
          {remaining.map((id) => {
            const i = targets.indexOf(id);
            const common = {
              'data-help-id': id === firstId ? 'mouse.target' : undefined,
              style: pos(i),
            };
            if (game === 'drag') {
              return (
                <span
                  key={id}
                  role="img"
                  aria-label={`Cá số ${i + 1}`}
                  draggable
                  {...common}
                  className={`${itemClass} cursor-grab`}
                  onDragStart={(e) => {
                    dragging.current = id;
                    e.dataTransfer?.setData('text/plain', id);
                  }}
                  onDragEnd={() => {
                    dragging.current = null;
                  }}
                >
                  🐟
                </span>
              );
            }
            return (
              <button
                key={id}
                type="button"
                aria-label={`${LABEL[game]} số ${i + 1}`}
                {...common}
                className={itemClass}
                onClick={() => {
                  if (game === 'click') hit(id);
                  else if (game === 'double') setTip('Nhấp nhanh 2 lần liên tiếp nhé!');
                  else if (game === 'right')
                    setTip(os === 'mac' ? 'Nhấp chuột phải nhé: giữ phím control rồi bấm, hoặc chạm hai ngón lên trackpad.' : 'Hãy bấm nút bên PHẢI của chuột nhé.');
                }}
                onDoubleClick={() => game === 'double' && hit(id)}
                onContextMenu={(e) => {
                  if (game !== 'right') return;
                  e.preventDefault();
                  opener.current = e.currentTarget;
                  const rect = areaRef.current?.getBoundingClientRect();
                  setMenuFor({ id, x: rect ? e.clientX - rect.left : e.clientX, y: rect ? e.clientY - rect.top : e.clientY, byKeys: false });
                }}
                onKeyDown={(e) => {
                  if (game !== 'right' || !isMenuKey(e)) return;
                  e.preventDefault();
                  const el = e.currentTarget;
                  opener.current = el;
                  setMenuFor({ id, x: el.offsetLeft, y: el.offsetTop + el.offsetHeight, byKeys: true });
                }}
              >
                {ICON[game]}
              </button>
            );
          })}
          {game === 'drag' && (
            <div
              aria-label="Giỏ cá"
              data-help-id="mouse.basket"
              className="absolute bottom-3 right-3 grid h-24 w-28 place-items-center rounded-3xl bg-butter/70 text-5xl"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.stopPropagation();
                if (dragging.current) hit(dragging.current);
                dragging.current = null;
              }}
            >
              🧺
            </div>
          )}
          {menuFor && (
            <ul
              ref={menuRef}
              role="menu"
              aria-label="Menu chuột phải"
              className="card absolute z-10 w-44 p-2"
              style={{ left: menuPos?.left ?? menuFor.x, top: menuPos?.top ?? menuFor.y }}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  e.preventDefault();
                  closeMenu();
                } else menuKeyDown(e, closeMenu);
              }}
            >
              {['Mở', '🎁 Mở quà', 'Đổi tên'].map((label) => (
                <li key={label} role="none">
                  <button
                    type="button"
                    role="menuitem"
                    data-menu-item
                    className="w-full rounded-xl px-3 py-2 text-left hover:bg-peach/30"
                    onClick={(e) => {
                      e.stopPropagation();
                      const id = menuFor.id;
                      setMenuFor(null);
                      if (label === '🎁 Mở quà') hit(id);
                      else miss();
                    }}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          )}
          {done && (
            <div className="absolute inset-0 grid place-items-center">
              <div className="flex items-center gap-3 rounded-3xl bg-white/90 p-4 font-bold">
                <Mochi mood="happy" size={64} animated={false} /> Tuyệt vời! 🎉
              </div>
            </div>
          )}
        </div>
      )}
      {tip && <p className="font-semibold text-rose-ink">{tip}</p>}
    </div>
  );
}

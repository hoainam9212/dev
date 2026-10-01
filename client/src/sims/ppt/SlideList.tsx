import { useEffect, useRef, useState, type Dispatch } from 'react';
import { createPortal } from 'react-dom';
import { pptSim } from '@office-neko/shared';
import { Copy20Regular, Delete20Regular } from '@fluentui/react-icons';
import { ElementView } from './ElementView';
import { nativeTitle } from '../../help/nativeTitle';

type Props = { state: pptSim.PptState; dispatch: Dispatch<pptSim.PptAction> };

/** Cỡ menu chuột phải, để kẹp nó trong khung nhìn trước khi kịp đo. */
const MENU_W = 184;
const MENU_H = 84;

/** Cột thumbnail bên trái: mỗi slide một nút, cuối cột là nút thêm slide. */
export function SlideList({ state, dispatch }: Props) {
  const [menu, setMenu] = useState<{ index: number; x: number; y: number } | null>(null);
  const canDelete = state.slides.length > 1;

  /** Như PowerPoint: lệnh trên một hình thu nhỏ áp vào đúng slide đó, nên mở slide ấy trước. */
  const act = (index: number, type: 'duplicateSlide' | 'deleteSlide') => {
    dispatch({ type: 'gotoSlide', index });
    dispatch({ type });
  };

  return (
    // Màn hẹp: cột thumbnail nằm ngang phía trên, nhường cả bề ngang cho khung slide.
    <div
      className="flex w-full flex-row items-center gap-2 overflow-x-auto p-0.5 pb-1 sm:w-[140px] sm:shrink-0 sm:flex-col sm:items-stretch sm:overflow-x-visible sm:overflow-y-auto sm:pb-0 sm:pr-1"
      data-help-id="ppt.slideList"
    >
      {state.slides.map((slide, i) => (
        <button
          key={slide.id}
          type="button"
          aria-label={`Slide ${i + 1}`}
          aria-current={i === state.active ? 'true' : undefined}
          aria-haspopup="menu"
          className={`ppt-thumb w-[112px] shrink-0 sm:w-full${i === state.active ? ' is-active' : ''}`}
          onClick={() => dispatch({ type: 'gotoSlide', index: i })}
          onContextMenu={(e) => {
            e.preventDefault();
            // Phím Menu / Shift+F10 không có toạ độ chuột: mở ngay dưới hình thu nhỏ.
            const r = e.currentTarget.getBoundingClientRect();
            const byKey = e.clientX === 0 && e.clientY === 0;
            setMenu({ index: i, x: byKey ? r.left : e.clientX, y: byKey ? r.bottom : e.clientY });
          }}
          onKeyDown={(e) => {
            if ((e.key === 'Delete' || e.key === 'Backspace') && canDelete) {
              e.preventDefault();
              act(i, 'deleteSlide');
            }
          }}
        >
          <span className="ppt-thumb-no">{i + 1}</span>
          <span className="ppt-thumb-stage" aria-hidden="true">
            <span className="ppt-thumb-canvas" style={{ width: pptSim.SLIDE_W, height: pptSim.SLIDE_H }}>
              {slide.els.map((el) => (
                <ElementView key={el.id} el={el} selected={false} hint={false} />
              ))}
            </span>
          </span>
        </button>
      ))}
      <button
        type="button"
        className="btn btn-soft shrink-0 whitespace-nowrap text-sm sm:w-full"
        data-help-id="ppt.newSlide"
        title={nativeTitle('ppt.newSlide', 'New Slide — thêm slide mới')}
        onClick={() => dispatch({ type: 'addSlide' })}
      >
        + Slide mới
      </button>
      {menu ? (
        <ThumbMenu
          x={menu.x}
          y={menu.y}
          slide={menu.index + 1}
          canDelete={canDelete}
          onPick={(type) => act(menu.index, type)}
          onClose={() => setMenu(null)}
        />
      ) : null}
    </div>
  );
}

/**
 * Menu chuột phải của một hình thu nhỏ. Portal ra `body`, `position: fixed` tại con trỏ và kẹp
 * trong khung nhìn: cột slide là khung cuộn, vẽ tại chỗ thì menu bị cắt ở mép cột.
 */
function ThumbMenu({
  x,
  y,
  slide,
  canDelete,
  onPick,
  onClose,
}: {
  x: number;
  y: number;
  slide: number;
  canDelete: boolean;
  onPick: (type: 'duplicateSlide' | 'deleteSlide') => void;
  onClose: () => void;
}) {
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const away = (e: PointerEvent) => {
      if (!box.current?.contains(e.target as Node)) onClose();
    };
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    // Đóng khi người dùng tự cuộn, không theo sự kiện `scroll`: bấm chuột phải vào hình thu nhỏ bị
    // khuất một nửa (màn hẹp, cột nằm ngang) thì trình duyệt tự cuộn cột ngay sau khi menu mở.
    const userScroll = () => onClose();
    document.addEventListener('pointerdown', away);
    document.addEventListener('keydown', esc);
    window.addEventListener('wheel', userScroll, true);
    window.addEventListener('touchmove', userScroll, true);
    return () => {
      document.removeEventListener('pointerdown', away);
      document.removeEventListener('keydown', esc);
      window.removeEventListener('wheel', userScroll, true);
      window.removeEventListener('touchmove', userScroll, true);
    };
  }, [onClose]);

  const left = Math.max(8, Math.min(x, window.innerWidth - MENU_W - 8));
  const top = Math.max(8, Math.min(y, window.innerHeight - MENU_H - 8));
  const items = [
    { type: 'duplicateSlide' as const, helpId: 'ppt.duplicate', label: 'Nhân đôi slide', text: 'Duplicate Slide', icon: <Copy20Regular />, disabled: false },
    { type: 'deleteSlide' as const, helpId: 'ppt.deleteSlide', label: 'Xoá slide', text: 'Delete Slide', icon: <Delete20Regular />, disabled: !canDelete },
  ];

  return createPortal(
    <div
      ref={box}
      role="menu"
      aria-label={`Lệnh cho slide ${slide}`}
      className="ribbon-menu"
      style={{ position: 'fixed', left, top, width: MENU_W, minWidth: 0 }}
    >
      {items.map((it) => (
        <button
          key={it.type}
          type="button"
          aria-label={it.label}
          data-help-id={it.helpId}
          disabled={it.disabled}
          className="ribbon-menu-item gap-2 disabled:cursor-not-allowed disabled:opacity-40"
          onClick={() => {
            onClose();
            onPick(it.type);
          }}
        >
          {it.icon}
          {it.text}
        </button>
      ))}
    </div>,
    document.body,
  );
}

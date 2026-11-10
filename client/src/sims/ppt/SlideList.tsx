import { useCallback, useEffect, useRef, useState, type Dispatch, type KeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import { pptSim } from '@office-neko/shared';
import { Copy20Regular, Delete20Regular } from '@fluentui/react-icons';
import { ElementView } from './ElementView';
import { menuKeyDown, useFocusFirstItem } from '../../components/ribbon';
import { nativeTitle } from '../../help/nativeTitle';

type Props = { state: pptSim.PptState; dispatch: Dispatch<pptSim.PptAction> };

/** Cỡ menu chuột phải, để kẹp nó trong khung nhìn trước khi kịp đo. */
const MENU_W = 184;
const MENU_H = 84;

/** Cột thumbnail bên trái: mỗi slide một nút, cuối cột là nút thêm slide. */
export function SlideList({ state, dispatch }: Props) {
  const [menu, setMenu] = useState<{ index: number; x: number; y: number; byKey: boolean } | null>(null);
  const canDelete = state.slides.length > 1;
  const thumbs = useRef<(HTMLButtonElement | null)[]>([]);
  /** Sau lần vẽ tới, focus hình thu nhỏ này (`'active'`: slide đang mở). Dời/đổi slide bằng phím thì focus đi theo. */
  const pendingFocus = useRef<number | 'active' | null>(null);

  useEffect(() => {
    const want = pendingFocus.current;
    if (want === null) return;
    pendingFocus.current = null;
    thumbs.current[want === 'active' ? state.active : want]?.focus();
  });

  /** Như PowerPoint: lệnh trên một hình thu nhỏ áp vào đúng slide đó, nên mở slide ấy trước. */
  const act = (index: number, type: 'duplicateSlide' | 'deleteSlide') => {
    dispatch({ type: 'gotoSlide', index });
    dispatch({ type });
  };

  const onThumbKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = state.slides.length - 1;
    if ((e.key === 'Delete' || e.key === 'Backspace') && canDelete) {
      e.preventDefault();
      act(i, 'deleteSlide');
      return;
    }
    const up = e.key === 'ArrowUp' || (!e.altKey && e.key === 'ArrowLeft');
    const down = e.key === 'ArrowDown' || (!e.altKey && e.key === 'ArrowRight');
    if (!up && !down) return;
    e.preventDefault();
    const to = up ? i - 1 : i + 1;
    if (to < 0 || to > last) return;
    pendingFocus.current = to;
    // Alt+↑/↓: dời slide lên/xuống — cách làm bằng phím thay cho kéo–thả hình thu nhỏ.
    dispatch(e.altKey ? { type: 'moveSlide', from: i, to } : { type: 'gotoSlide', index: to });
  };

  const theme = pptSim.themeOf(state.theme);
  return (
    // Màn hẹp: cột thumbnail nằm ngang phía trên, nhường cả bề ngang cho khung slide.
    <div
      className="flex w-full flex-row items-center gap-2 overflow-x-auto p-0.5 pb-1 sm:w-[140px] sm:shrink-0 sm:flex-col sm:items-stretch sm:overflow-x-visible sm:overflow-y-auto sm:pb-0 sm:pr-1"
      data-help-id="ppt.slideList"
    >
      {/* `contents`: listbox không tạo hộp riêng, các hình thu nhỏ vẫn xếp trong flex của cột. */}
      <div role="listbox" aria-label="Danh sách slide" className="contents">
      {state.slides.map((slide, i) => (
        <button
          key={slide.id}
          ref={(el) => {
            thumbs.current[i] = el;
          }}
          type="button"
          role="option"
          aria-label={`Slide ${i + 1}`}
          aria-selected={i === state.active}
          className={`ppt-thumb w-[112px] shrink-0 sm:w-full${i === state.active ? ' is-active' : ''}`}
          onClick={() => dispatch({ type: 'gotoSlide', index: i })}
          onContextMenu={(e) => {
            e.preventDefault();
            // Phím Menu / Shift+F10 không có toạ độ chuột: mở ngay dưới hình thu nhỏ.
            const r = e.currentTarget.getBoundingClientRect();
            const byKey = e.clientX === 0 && e.clientY === 0;
            setMenu({ index: i, x: byKey ? r.left : e.clientX, y: byKey ? r.bottom : e.clientY, byKey });
          }}
          onKeyDown={(e) => onThumbKey(e, i)}
        >
          <span className="ppt-thumb-no flex flex-col items-center">
            {i + 1}
            {/* Như PowerPoint: ngôi sao nhỏ dưới số thứ tự báo slide có chuyển cảnh. */}
            {slide.transition ? (
              <span role="img" aria-label="Có hiệu ứng chuyển cảnh" className="text-[0.7rem] leading-none">
                ★
              </span>
            ) : null}
          </span>
          <span className="ppt-thumb-stage" aria-hidden="true">
            <span
              className="ppt-thumb-canvas"
              data-theme={theme.id}
              style={{ width: pptSim.SLIDE_W, height: pptSim.SLIDE_H, background: theme.bg }}
            >
              {slide.els.map((el) => (
                <ElementView key={el.id} el={el} theme={theme} selected={false} hint={false} />
              ))}
            </span>
          </span>
        </button>
      ))}
      </div>
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
          autoFocus={menu.byKey}
          onPick={(type) => {
            // Chọn bằng phím: slide có thể vừa bị xoá, nên focus slide đang mở sau lệnh.
            if (pendingFocus.current !== null) pendingFocus.current = 'active';
            act(menu.index, type);
          }}
          onClose={(refocus) => {
            setMenu(null);
            // Đóng khi focus đang trong menu (Esc, Tab, chọn bằng phím): trả focus về hình thu nhỏ.
            if (refocus) pendingFocus.current = menu.index;
          }}
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
  autoFocus,
  onPick,
  onClose,
}: {
  x: number;
  y: number;
  slide: number;
  canDelete: boolean;
  /** Mở bằng phím Menu / Shift+F10: focus mục đầu. */
  autoFocus: boolean;
  onPick: (type: 'duplicateSlide' | 'deleteSlide') => void;
  /** `refocus`: focus đang ở trong menu lúc đóng, cần trả về hình thu nhỏ. */
  onClose: (refocus: boolean) => void;
}) {
  const box = useRef<HTMLDivElement>(null);
  useFocusFirstItem(box, autoFocus);
  const close = useCallback(() => onClose(box.current?.contains(document.activeElement) ?? false), [onClose]);

  useEffect(() => {
    const away = (e: PointerEvent) => {
      if (!box.current?.contains(e.target as Node)) close();
    };
    const esc = (e: globalThis.KeyboardEvent) => e.key === 'Escape' && close();
    // Đóng khi người dùng tự cuộn, không theo sự kiện `scroll`: bấm chuột phải vào hình thu nhỏ bị
    // khuất một nửa (màn hẹp, cột nằm ngang) thì trình duyệt tự cuộn cột ngay sau khi menu mở.
    const userScroll = () => close();
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
  }, [close]);

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
      onKeyDown={(e) => menuKeyDown(e, close)}
    >
      {items.map((it) => (
        <button
          key={it.type}
          type="button"
          role="menuitem"
          data-menu-item
          tabIndex={-1}
          aria-label={it.label}
          data-help-id={it.helpId}
          disabled={it.disabled}
          className="ribbon-menu-item gap-2 disabled:cursor-not-allowed disabled:opacity-40"
          onClick={() => {
            close();
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

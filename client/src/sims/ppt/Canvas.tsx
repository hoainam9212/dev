import { useRef, type Dispatch, type PointerEvent as ReactPointerEvent } from 'react';
import { pptSim } from '@office-neko/shared';
import { ElementView } from './ElementView';
import { useDrag } from './useDrag';
import { transitionClass } from './transitions';

/**
 * Khung 16:9. State luôn nói bằng px của khổ 960x540; khung này co giãn bằng
 * `container-type` + `transform: scale(100cqw/960px)` nên không component nào phải
 * biết kích thước thật của màn hình — trừ lúc kéo chuột, xem `getScale` bên dưới.
 */
export function Canvas({
  state,
  dispatch,
  preview,
}: {
  state: pptSim.PptState;
  dispatch: Dispatch<pptSim.PptAction>;
  /**
   * Lần bấm Preview gần nhất và slide được xem thử. Chỉ slide đó chạy hiệu ứng — nếu không, chuyển
   * sang một slide khác có chuyển cảnh cũng làm nó nhảy lên như đang trình chiếu.
   */
  preview?: { n: number; slideId: string };
}) {
  const canvas = useRef<HTMLDivElement>(null);
  const mode = useRef<pptSim.Handle | 'move' | null>(null);

  /** px màn hình → px khung gốc. Đọc lại mỗi lần bắt đầu kéo vì cửa sổ đổi cỡ được. */
  const getScale = () => (canvas.current?.getBoundingClientRect().width ?? 0) / pptSim.SLIDE_W;

  const drag = useDrag((dx, dy) => {
    const m = mode.current;
    if (!m) return;
    if (m === 'move') dispatch({ type: 'moveEl', dx, dy });
    else dispatch({ type: 'resizeEl', handle: m, dx, dy });
  }, getScale);

  const startDrag = (id: string) => (handle: pptSim.Handle | 'move', e: ReactPointerEvent) => {
    if (handle === 'move') dispatch({ type: 'selectEl', id });
    mode.current = handle;
    drag.onPointerDown(e);
  };

  const slide = state.slides[state.active];
  if (!slide) return null;
  const theme = pptSim.themeOf(state.theme);
  const previewing = preview !== undefined && preview.slideId === slide.id;
  return (
    <div className="ppt-stage" data-help-id="ppt.canvas">
      <div
        ref={canvas}
        data-testid="ppt-canvas"
        data-w={pptSim.SLIDE_W}
        data-h={pptSim.SLIDE_H}
        data-theme={theme.id}
        className="ppt-canvas"
        tabIndex={0}
        style={{ width: pptSim.SLIDE_W, height: pptSim.SLIDE_H, background: theme.bg }}
        onPointerDown={(e) => {
          // Bấm vào chỗ trống: khung, hoặc lớp vẽ phủ kín khung (CSS cho lớp này không nhận chuột,
          // nhưng đừng dựa hẳn vào CSS — thiếu nó là không bỏ chọn được nữa).
          const t = e.target as HTMLElement;
          if (t === e.currentTarget || t.classList.contains('ppt-slide-layer')) dispatch({ type: 'selectEl', id: null });
        }}
        onPointerMove={drag.onPointerMove}
        onPointerUp={(e) => {
          drag.onPointerUp(e);
          mode.current = null;
        }}
        onKeyDown={(e) => {
          // Đang gõ chữ thì bàn phím thuộc về ô nhập, không phải về đối tượng.
          if (state.editing !== null) return;
          if (e.key === 'Escape') {
            e.preventDefault();
            dispatch({ type: 'selectEl', id: null });
            return;
          }
          if (!state.sel) return;
          const step = pptSim.GRID;
          if (e.key === 'ArrowRight') dispatch({ type: 'moveEl', dx: step, dy: 0 });
          else if (e.key === 'ArrowLeft') dispatch({ type: 'moveEl', dx: -step, dy: 0 });
          else if (e.key === 'ArrowDown') dispatch({ type: 'moveEl', dx: 0, dy: step });
          else if (e.key === 'ArrowUp') dispatch({ type: 'moveEl', dx: 0, dy: -step });
          else if (e.key === 'Delete' || e.key === 'Backspace') dispatch({ type: 'deleteEl' });
          else return;
          e.preventDefault();
        }}
      >
        <div key={previewing ? preview.n : 0} className={`ppt-slide-layer ${previewing ? transitionClass(slide.transition) : ''}`}>
        {slide.els.map((el) => (
          <ElementView
            key={el.id}
            el={el}
            theme={theme}
            selected={el.id === state.sel}
            editing={el.id === state.editing}
            onStartDrag={startDrag(el.id)}
            onDoubleClick={() => dispatch({ type: 'startEditEl', id: el.id })}
            onText={(text) => dispatch({ type: 'setText', text })}
            onCommit={() => dispatch({ type: 'commitEdit' })}
            onCancel={() => dispatch({ type: 'cancelEdit' })}
          />
        ))}
        </div>
      </div>
    </div>
  );
}

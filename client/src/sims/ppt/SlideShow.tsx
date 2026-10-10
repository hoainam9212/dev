import { useEffect, type Dispatch } from 'react';
import { createPortal } from 'react-dom';
import { pptSim } from '@office-neko/shared';
import { ElementView } from './ElementView';
import { transitionClass } from './transitions';

const NEXT = new Set(['ArrowRight', 'ArrowDown', ' ', 'Enter', 'PageDown', 'n', 'N']);
const PREV = new Set(['ArrowLeft', 'ArrowUp', 'Backspace', 'PageUp', 'p', 'P']);

/**
 * Trình chiếu: phủ kín màn hình, nền đen, slide 16:9 căn giữa. Phím bắt ở pha capture của `window`
 * và chặn lan truyền, để Esc không đóng nhầm hộp thoại khác (ảnh phóng to, gợi ý) phía sau.
 */
export function SlideShow({ state, dispatch }: { state: pptSim.PptState; dispatch: Dispatch<pptSim.PptAction> }) {
  const show = state.show;
  const active = show !== null;

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      const atEnd = (show?.at ?? 0) >= state.slides.length;
      let type: 'showNext' | 'showPrev' | 'endShow' | null = null;
      if (e.key === 'Escape') type = 'endShow';
      else if (NEXT.has(e.key)) type = 'showNext';
      else if (PREV.has(e.key)) type = 'showPrev';
      else if (atEnd && e.key.length === 1) type = 'showNext';
      if (!type) return;
      e.preventDefault();
      e.stopPropagation();
      dispatch({ type });
    };
    // Esc khi đang toàn màn hình bị trình duyệt nuốt để thoát fullscreen: coi đó là thoát trình chiếu.
    const onFullscreen = () => {
      if (!document.fullscreenElement) dispatch({ type: 'endShow' });
    };
    window.addEventListener('keydown', onKey, true);
    document.addEventListener('fullscreenchange', onFullscreen);
    return () => {
      window.removeEventListener('keydown', onKey, true);
      document.removeEventListener('fullscreenchange', onFullscreen);
    };
  }, [active, show?.at, state.slides.length, dispatch]);

  // Vào/ra toàn màn hình thật của trình duyệt. Bị từ chối thì lớp phủ vẫn chạy như thường.
  useEffect(() => {
    if (!active) return;
    document.documentElement.requestFullscreen?.().catch(() => {});
    return () => {
      if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
    };
  }, [active]);

  if (!show) return null;
  const total = state.slides.length;
  const slide = state.slides[show.at];
  const theme = pptSim.themeOf(state.theme);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={slide ? `Đang trình chiếu, slide ${show.at + 1} trên ${total}` : 'Đang trình chiếu, hết bài'}
      className="ppt-show"
      onClick={() => dispatch({ type: 'showNext' })}
      onContextMenu={(e) => e.preventDefault()}
    >
      {slide ? (
        <div className="ppt-show-frame">
          <div className="ppt-show-canvas" style={{ width: pptSim.SLIDE_W, height: pptSim.SLIDE_H, background: theme.bg }}>
            <div key={show.at} className={`ppt-slide-layer ${transitionClass(slide.transition)}`}>
              {slide.els.map((el) => (
                <ElementView key={el.id} el={el} theme={theme} selected={false} hint={false} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-base text-white/80">
          Hết bài trình chiếu. Bấm chuột hoặc nhấn phím bất kỳ để thoát.
        </p>
      )}
    </div>,
    document.body,
  );
}

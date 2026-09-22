import type { Dispatch } from 'react';
import { pptSim } from '@office-neko/shared';
import { ElementView } from './ElementView';

/**
 * Khung 16:9. State luôn nói bằng px của khổ 960x540; khung này co giãn bằng
 * `container-type` + `transform: scale(100cqw/960)` nên không component nào phải
 * biết kích thước thật của màn hình.
 */
export function Canvas({
  state,
  dispatch,
}: {
  state: pptSim.PptState;
  dispatch: Dispatch<pptSim.PptAction>;
}) {
  const slide = state.slides[state.active];
  if (!slide) return null;
  return (
    <div className="ppt-stage" data-help-id="ppt.canvas">
      <div
        data-testid="ppt-canvas"
        data-w={pptSim.SLIDE_W}
        data-h={pptSim.SLIDE_H}
        className="ppt-canvas"
        style={{ width: pptSim.SLIDE_W, height: pptSim.SLIDE_H }}
        onPointerDown={(e) => {
          if (e.target === e.currentTarget) dispatch({ type: 'selectEl', id: null });
        }}
      >
        {slide.els.map((el) => (
          <ElementView key={el.id} el={el} selected={el.id === state.sel} />
        ))}
      </div>
    </div>
  );
}

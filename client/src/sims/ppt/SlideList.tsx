import type { Dispatch } from 'react';
import { pptSim } from '@office-neko/shared';
import { ElementView } from './ElementView';

/** Cột thumbnail bên trái: mỗi slide một nút, cuối cột là nút thêm slide. */
export function SlideList({
  state,
  dispatch,
}: {
  state: pptSim.PptState;
  dispatch: Dispatch<pptSim.PptAction>;
}) {
  return (
    <div className="flex w-[140px] shrink-0 flex-col gap-2 overflow-y-auto pr-1" data-help-id="ppt.slideList">
      {state.slides.map((slide, i) => (
        <button
          key={slide.id}
          type="button"
          aria-label={`Slide ${i + 1}`}
          aria-current={i === state.active ? 'true' : undefined}
          className={`ppt-thumb${i === state.active ? ' is-active' : ''}`}
          onClick={() => dispatch({ type: 'gotoSlide', index: i })}
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
        className="btn btn-soft w-full text-sm"
        data-help-id="ppt.newSlide"
        title="New Slide — thêm slide mới"
        onClick={() => dispatch({ type: 'addSlide' })}
      >
        + Slide mới
      </button>
    </div>
  );
}

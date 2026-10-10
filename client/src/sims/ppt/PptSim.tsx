import { useEffect, useReducer, useState } from 'react';
import { pptSim } from '@office-neko/shared';
import type { SimProps } from '../types';
import { SlideList } from './SlideList';
import { Canvas } from './Canvas';
import { PptDialogs, Ribbon } from './Ribbon';
import { SlideShow } from './SlideShow';

/**
 * Trình chiếu mô phỏng. Trạng thái do `useReducer(reducePpt, initial)` giữ; cột
 * thumbnail và khung slide chỉ vẽ và phát action.
 */
export function PptSim({ initial, onState }: SimProps<pptSim.PptState>) {
  const [state, dispatch] = useReducer(pptSim.reducePpt, initial);
  // Xem thử chuyển cảnh là trạng thái giao diện thuần, không thuộc bài trình chiếu nên nằm ngoài reducer.
  const [preview, setPreview] = useState<{ n: number; slideId: string }>();
  const onPreview = () => setPreview((p) => ({ n: (p?.n ?? 0) + 1, slideId: pptSim.slideOf(state).id }));

  useEffect(() => onState(state), [state, onState]);

  // Người quen PowerPoint sẽ bấm F5: chặn trình duyệt tải lại trang (mất bài đang làm) và trình chiếu.
  const showing = state.show !== null;
  useEffect(() => {
    if (showing) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'F5') return;
      e.preventDefault();
      dispatch({ type: 'startShow', from: e.shiftKey ? 'current' : 'start' });
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showing]);

  return (
    <div className="space-y-3">
      <div className="card p-2">
        <Ribbon state={state} dispatch={dispatch} onPreview={onPreview} />
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <SlideList state={state} dispatch={dispatch} />
        <div className="min-w-0 flex-1">
          <Canvas state={state} dispatch={dispatch} preview={preview} />
        </div>
      </div>
      <PptDialogs state={state} dispatch={dispatch} now={Date.now()} />
      <SlideShow state={state} dispatch={dispatch} />
    </div>
  );
}

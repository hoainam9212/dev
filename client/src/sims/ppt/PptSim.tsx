import { useEffect, useReducer } from 'react';
import { pptSim } from '@office-neko/shared';
import type { SimProps } from '../types';
import { SlideList } from './SlideList';
import { Canvas } from './Canvas';

/**
 * Trình chiếu mô phỏng. Trạng thái do `useReducer(reducePpt, initial)` giữ; cột
 * thumbnail và khung slide chỉ vẽ và phát action.
 */
export function PptSim({ initial, onState }: SimProps<pptSim.PptState>) {
  const [state, dispatch] = useReducer(pptSim.reducePpt, initial);

  useEffect(() => onState(state), [state, onState]);

  return (
    <div className="flex gap-3">
      <SlideList state={state} dispatch={dispatch} />
      <div className="min-w-0 flex-1">
        <Canvas state={state} dispatch={dispatch} />
      </div>
    </div>
  );
}

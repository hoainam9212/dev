import { useEffect, useReducer } from 'react';
import { wordSim } from '@office-neko/shared';
import type { SimProps } from '../types';
import { Editor } from './Editor';
import { Page } from './Page';

/**
 * Trình soạn thảo Word mô phỏng. Trạng thái do `useReducer(reduceWord, initial)`
 * giữ; TipTap chỉ là phần gõ chữ và con trỏ (xem `Editor.tsx`).
 * Ribbon đầy đủ được gắn ở Task 9–10.
 */
export function WordSim({ initial, onState }: SimProps<wordSim.WordState>) {
  const [state, dispatch] = useReducer(wordSim.reduceWord, initial);

  useEffect(() => onState(state), [state, onState]);

  return (
    <div className="space-y-3">
      <div className="card flex flex-wrap items-center gap-2 p-2">
        <button
          type="button"
          className="btn !px-3 !py-1 text-sm"
          data-help-id="word.undo"
          onClick={() => dispatch({ type: 'undo' })}
          disabled={state.past.length === 0}
        >
          ↶ Hoàn tác
        </button>
      </div>
      <Page>
        <Editor state={state} dispatch={dispatch} />
      </Page>
    </div>
  );
}

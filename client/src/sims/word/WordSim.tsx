import { useEffect, useReducer } from 'react';
import { wordSim } from '@office-neko/shared';
import type { SimProps } from '../types';
import { Editor } from './Editor';
import { RibbonHome } from './RibbonHome';
import { Page } from './Page';

/**
 * Trình soạn thảo Word mô phỏng. Trạng thái do `useReducer(reduceWord, initial)`
 * giữ; TipTap chỉ là phần gõ chữ và con trỏ (xem `Editor.tsx`).
 * Các tab ribbon còn lại được gắn ở Task 10.
 */
export function WordSim({ initial, onState }: SimProps<wordSim.WordState>) {
  const [state, dispatch] = useReducer(wordSim.reduceWord, initial);

  useEffect(() => onState(state), [state, onState]);

  return (
    <div className="space-y-3">
      <div className="card p-2">
        <RibbonHome state={state} dispatch={dispatch} />
      </div>
      <Page>
        <Editor state={state} dispatch={dispatch} />
      </Page>
    </div>
  );
}

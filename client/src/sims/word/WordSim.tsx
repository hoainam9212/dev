import { useEffect, useReducer } from 'react';
import { wordSim } from '@office-neko/shared';
import type { SimProps } from '../types';
import { Editor } from './Editor';
import { Ribbon, WordDialogs } from './Ribbon';
import { Page } from './Page';

/**
 * Trình soạn thảo Word mô phỏng. Trạng thái do `useReducer(reduceWord, initial)`
 * giữ; TipTap chỉ là phần gõ chữ và con trỏ (xem `Editor.tsx`).

 */
export function WordSim({ initial, onState }: SimProps<wordSim.WordState>) {
  const [state, dispatch] = useReducer(wordSim.reduceWord, initial);

  useEffect(() => onState(state), [state, onState]);

  return (
    <div className="space-y-3">
      <div className="card p-2">
        <Ribbon state={state} dispatch={dispatch} />
      </div>
      <Page>
        <Editor state={state} dispatch={dispatch} />
      </Page>
      <WordDialogs state={state} dispatch={dispatch} now={Date.now()} />
    </div>
  );
}

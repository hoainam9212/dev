import { useEffect, useReducer, useRef } from 'react';
import { excelSim } from '@office-neko/shared';
import type { SimProps } from '../types';
import { Grid } from './Grid';
import { CellHint, FormulaBar } from './FormulaBar';

/**
 * Bảng tính mô phỏng. Trạng thái do `useReducer(reduceExcel, initial)` giữ; lưới
 * và thanh công thức chỉ vẽ và phát action.
 */
export function ExcelSim({ initial, onState }: SimProps<excelSim.WorkbookState>) {
  const [state, dispatch] = useReducer(excelSim.reduceExcel, initial);
  const bar = useRef<HTMLInputElement>(null);
  const grid = useRef<HTMLDivElement>(null);
  const editing = state.editing !== null;

  useEffect(() => onState(state), [state, onState]);

  /**
   * Gõ một ký tự vào lưới là bắt đầu sửa ô — nhưng con trỏ vẫn ở lưới, nên các
   * ký tự sau rơi vào hư không. Đưa con trỏ sang thanh công thức, và trả về lưới
   * khi sửa xong, để bàn phím không bao giờ "mất chỗ".
   */
  useEffect(() => {
    if (editing) {
      bar.current?.focus();
      const end = bar.current?.value.length ?? 0;
      bar.current?.setSelectionRange(end, end);
    } else {
      grid.current?.focus();
    }
  }, [editing]);

  return (
    <div className="space-y-2">
      <FormulaBar state={state} dispatch={dispatch} inputRef={bar} />
      <Grid state={state} dispatch={dispatch} gridRef={grid} />
      <CellHint state={state} />
    </div>
  );
}

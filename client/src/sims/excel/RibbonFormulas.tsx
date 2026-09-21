import type { excelSim } from '@office-neko/shared';
import { FN_HELP } from '../../content/fnHelp';
import { Group, ToolButton } from './RibbonHome';

interface Props {
  state: excelSim.WorkbookState;
  dispatch: (a: excelSim.ExcelAction) => void;
}

/** Nhóm hàm đúng như Excel thật chia trên tab Formulas. */
const CATEGORIES: { title: string; helpId: string; fns: string[] }[] = [
  { title: 'Tự động tính', helpId: 'excel.fnAuto', fns: ['SUM', 'AVERAGE', 'MIN', 'MAX', 'COUNT'] },
  { title: 'Logic', helpId: 'excel.fnLogic', fns: ['IF', 'AND', 'OR'] },
  { title: 'Có điều kiện', helpId: 'excel.fnCond', fns: ['SUMIF', 'COUNTIF', 'AVERAGEIF'] },
  { title: 'Tra cứu', helpId: 'excel.fnLookup', fns: ['VLOOKUP'] },
  { title: 'Chữ', helpId: 'excel.fnText', fns: ['LEFT', 'RIGHT', 'MID', 'LEN', 'UPPER', 'TRIM', 'CONCAT'] },
  { title: 'Khác', helpId: 'excel.fnMisc', fns: ['ROUND', 'ABS', 'TODAY'] },
];

/**
 * Bấm một hàm là điền sẵn `=TÊN(` vào ô rồi mở chế độ sửa — thẻ cú pháp hiện ra
 * ngay, nên người học thấy hàm cần những gì mà không phải nhớ.
 */
export function RibbonFormulas({ dispatch }: Props) {
  const insert = (name: string) => {
    dispatch({ type: 'startEdit', text: `=${name}(` });
  };

  return (
    <div className="flex flex-wrap items-start gap-y-2 overflow-x-auto py-1">
      {CATEGORIES.map((c) => (
        <Group key={c.title} title={c.title}>
          {c.fns.map((fn) => (
            <ToolButton key={fn} helpId={c.helpId} label={`${fn} — ${FN_HELP[fn]?.desc ?? ''}`} onClick={() => insert(fn)}>
              <span className="font-mono text-xs">{fn}</span>
            </ToolButton>
          ))}
        </Group>
      ))}
    </div>
  );
}

/** Ghi chú cho tab chưa có nội dung, để người học không tưởng là app hỏng. */
export function SoonTab({ what }: { what: string }) {
  return (
    <p className="px-3 py-2 text-sm text-muted">
      {what} sẽ có ở phần sau của lộ trình Excel. Bạn cứ học tiếp các bài hiện có nhé!
    </p>
  );
}

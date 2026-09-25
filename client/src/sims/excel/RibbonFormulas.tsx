import type { ReactNode } from 'react';
import type { excelSim } from '@office-neko/shared';
import {
  BookSearch20Regular,
  Calculator20Regular,
  Calendar20Regular,
  Lightbulb20Regular,
  MathFormula20Regular,
  TextT20Regular,
} from '@fluentui/react-icons';
import { FN_HELP } from '../../content/fnHelp';
import { Group, MenuButton } from '../../components/ribbon';

interface Props {
  state: excelSim.WorkbookState;
  dispatch: (a: excelSim.ExcelAction) => void;
}

/**
 * Nhóm Function Library đúng như Excel 365: mỗi menu, mỗi hàm nằm đúng chỗ Excel đặt nó
 * (SUMIF ở Math & Trig, COUNTIF/AVERAGEIF ở More Functions › Statistical), theo đúng thứ tự Excel liệt kê.
 */
const LIBRARY: { name: string; helpId: string; icon: ReactNode; fns: string[]; prefix?: string }[] = [
  { name: 'AutoSum', helpId: 'excel.fnAuto', icon: <span className="text-2xl leading-none">Σ</span>, fns: ['SUM', 'AVERAGE', 'COUNT', 'MAX', 'MIN'] },
  { name: 'Logical', helpId: 'excel.fnLogic', icon: <Lightbulb20Regular />, fns: ['AND', 'IF', 'OR'] },
  { name: 'Text', helpId: 'excel.fnText', icon: <TextT20Regular />, fns: ['CONCAT', 'LEFT', 'LEN', 'MID', 'RIGHT', 'TRIM', 'UPPER'] },
  { name: 'Date & Time', helpId: 'excel.fnDate', icon: <Calendar20Regular />, fns: ['TODAY'] },
  { name: 'Lookup & Reference', helpId: 'excel.fnLookup', icon: <BookSearch20Regular />, fns: ['VLOOKUP'] },
  { name: 'Math & Trig', helpId: 'excel.fnMath', icon: <Calculator20Regular />, fns: ['ABS', 'ROUND', 'SUMIF'] },
  { name: 'More Functions', helpId: 'excel.fnMore', icon: <MathFormula20Regular />, fns: ['AVERAGEIF', 'COUNTIF'], prefix: 'Statistical › ' },
];

/**
 * Bấm một hàm là điền sẵn `=TÊN(` vào ô rồi mở chế độ sửa — thẻ cú pháp hiện ra
 * ngay, nên người học thấy hàm cần những gì mà không phải nhớ.
 */
export function RibbonFormulas({ dispatch }: Props) {
  return (
    <div className="flex flex-wrap items-stretch gap-y-2 py-1">
      <Group title="Function Library" variant="office">
        <div className="flex flex-wrap items-start gap-0.5">
          {LIBRARY.map((m) => (
            <MenuButton
              key={m.name}
              variant="office"
              large
              helpId={m.helpId}
              label={m.name}
              button={
                <>
                  {m.icon}
                  <span className="max-w-16 text-center">{m.name} ▾</span>
                </>
              }
              items={m.fns.map((fn) => ({
                value: fn,
                label: `${fn} — ${FN_HELP[fn]?.desc ?? ''}`,
                content: <span className="font-mono text-xs">{m.prefix ?? ''}{fn}</span>,
              }))}
              onPick={(fn) => dispatch({ type: 'startEdit', text: `=${fn}(` })}
            />
          ))}
        </div>
      </Group>
    </div>
  );
}

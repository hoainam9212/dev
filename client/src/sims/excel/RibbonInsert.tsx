import { useState } from 'react';
import { excelSim } from '@office-neko/shared';
import { Group, Picker, ToolButton } from '../../components/ribbon';

interface Props {
  state: excelSim.WorkbookState;
  dispatch: (a: excelSim.ExcelAction) => void;
}

const TYPES: { value: excelSim.Chart['type']; label: string }[] = [
  { value: 'column', label: 'Cột' },
  { value: 'bar', label: 'Thanh ngang' },
  { value: 'line', label: 'Đường' },
  { value: 'pie', label: 'Tròn' },
];

function selectedRange(s: excelSim.WorkbookState): string {
  const lo = { row: Math.min(s.sel.from.row, s.sel.to.row), col: Math.min(s.sel.from.col, s.sel.to.col) };
  const hi = { row: Math.max(s.sel.from.row, s.sel.to.row), col: Math.max(s.sel.from.col, s.sel.to.col) };
  return `${excelSim.refName(lo)}:${excelSim.refName(hi)}`;
}

export function RibbonInsert({ state, dispatch }: Props) {
  const [type, setType] = useState<excelSim.Chart['type']>('column');
  const [title, setTitle] = useState('Biểu đồ của tôi');
  const range = selectedRange(state);

  const insert = () => {
    // id đánh theo SỐ BIỂU ĐỒ ĐÃ CÓ, không dùng Date.now()/random: lời giải mẫu
    // của bài học phải phát lại được y hệt qua reducer.
    const id = `chart-${excelSim.chartsOf(state).length}`;
    dispatch({ type: 'insertChart', chart: { id, type, range, title } });
  };

  return (
    <div className="flex flex-wrap items-start gap-y-2 overflow-x-auto py-1">
      <Group title="Biểu đồ">
        <Picker
          helpId="excel.chartType"
          label="Loại biểu đồ"
          value={type}
          options={TYPES}
          onChange={(v) => setType(v as excelSim.Chart['type'])}
        />
        <input
          aria-label="Tiêu đề biểu đồ"
          data-help-id="excel.chartTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="h-8 w-40 rounded-lg border-2 border-peach/50 bg-white px-2 text-sm"
        />
        <ToolButton helpId="excel.insertChart" label="Chèn biểu đồ từ vùng đang chọn" onClick={insert}>
          📊 Chèn biểu đồ
        </ToolButton>
      </Group>
      <div className="self-center px-3 text-xs text-muted">Vẽ từ vùng đang chọn: <b>{range}</b></div>
    </div>
  );
}

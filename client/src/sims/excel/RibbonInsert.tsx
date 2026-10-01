import type { ReactNode } from 'react';
import { excelSim } from '@office-neko/shared';
import {
  DataBarHorizontal20Regular,
  DataBarVertical20Regular,
  DataLine20Regular,
  DataPie20Regular,
} from '@fluentui/react-icons';
import { Group, Labeled, MenuButton, Row } from '../../components/ribbon';

interface Props {
  state: excelSim.WorkbookState;
  dispatch: (a: excelSim.ExcelAction) => void;
}

/** Ba nút thả xuống của nhóm Charts, đúng tên mục như Excel 365 tiếng Anh. */
const MENUS: {
  label: string;
  helpId: string;
  icon: ReactNode;
  items: { type: excelSim.Chart['type']; name: string; icon: ReactNode }[];
}[] = [
  {
    label: 'Biểu đồ cột hoặc thanh',
    helpId: 'excel.chartColumn',
    icon: <DataBarVertical20Regular />,
    items: [
      { type: 'column', name: 'Clustered Column', icon: <DataBarVertical20Regular /> },
      { type: 'bar', name: 'Clustered Bar', icon: <DataBarHorizontal20Regular /> },
    ],
  },
  {
    label: 'Biểu đồ đường',
    helpId: 'excel.chartLine',
    icon: <DataLine20Regular />,
    items: [{ type: 'line', name: 'Line', icon: <DataLine20Regular /> }],
  },
  {
    label: 'Biểu đồ tròn',
    helpId: 'excel.chartPie',
    icon: <DataPie20Regular />,
    items: [{ type: 'pie', name: 'Pie', icon: <DataPie20Regular /> }],
  },
];

function selectedRange(s: excelSim.WorkbookState): string {
  const lo = { row: Math.min(s.sel.from.row, s.sel.to.row), col: Math.min(s.sel.from.col, s.sel.to.col) };
  const hi = { row: Math.max(s.sel.from.row, s.sel.to.row), col: Math.max(s.sel.from.col, s.sel.to.col) };
  return `${excelSim.refName(lo)}:${excelSim.refName(hi)}`;
}

/**
 * Như Excel: chọn một kiểu trong menu là biểu đồ hiện ra ngay với tiêu đề "Chart Title";
 * muốn đổi tên thì bấm thẳng vào tiêu đề trên biểu đồ.
 */
export function RibbonInsert({ state, dispatch }: Props) {
  const range = selectedRange(state);

  const insert = (type: excelSim.Chart['type']) => {
    // id đánh theo SỐ BIỂU ĐỒ ĐÃ CÓ, không dùng Date.now()/random: lời giải mẫu
    // của bài học phải phát lại được y hệt qua reducer.
    const id = `chart-${excelSim.chartsOf(state).length}`;
    dispatch({ type: 'insertChart', chart: { id, type, range, title: excelSim.DEFAULT_CHART_TITLE } });
  };

  return (
    <div className="flex flex-wrap items-stretch gap-y-2 py-1">
      <Group title="Charts" variant="office">
        <Row>
          {MENUS.map((m) => (
            <MenuButton
              key={m.helpId}
              variant="office"
              helpId={m.helpId}
              label={m.label}
              button={m.icon}
              items={m.items.map((it) => ({
                value: it.type,
                label: it.name,
                content: <Labeled icon={it.icon} text={it.name} />,
              }))}
              onPick={(type) => insert(type as excelSim.Chart['type'])}
            />
          ))}
        </Row>
      </Group>
      <div className="self-center px-3 text-xs text-muted">Vẽ từ vùng đang chọn: <b>{range}</b></div>
    </div>
  );
}

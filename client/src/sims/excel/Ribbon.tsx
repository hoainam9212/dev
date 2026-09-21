import { useState } from 'react';
import type { excelSim } from '@office-neko/shared';
import { Group, RibbonHome, ToolButton } from './RibbonHome';
import { RibbonFormulas, SoonTab } from './RibbonFormulas';

export { ExcelDialogs } from './dialogs';

interface Props {
  state: excelSim.WorkbookState;
  dispatch: (a: excelSim.ExcelAction) => void;
}

const TABS = ['File', 'Home', 'Insert', 'Formulas', 'Data', 'View'] as const;
type Tab = (typeof TABS)[number];

/**
 * Tab đang mở là trạng thái giao diện thuần tuý nên được phép nằm ngoài reducer;
 * mọi thứ làm ĐỔI SỔ TÍNH vẫn phải đi qua `dispatch`. Giống hệt ribbon Word.
 */
export function Ribbon({ state, dispatch }: Props) {
  const [tab, setTab] = useState<Tab>('Home');

  return (
    <div className="space-y-2">
      <div role="tablist" aria-label="Thanh công cụ" className="flex flex-wrap gap-1 border-b border-peach/40 pb-1">
        {TABS.map((name) => (
          <button
            key={name}
            type="button"
            role="tab"
            aria-selected={tab === name}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => setTab(name)}
            className={`rounded-t-lg px-3 py-1 text-sm font-bold transition ${tab === name ? 'bg-white text-excel-ink shadow-sm' : 'text-muted hover:bg-white/60'}`}
          >
            {name}
          </button>
        ))}
      </div>

      {tab === 'Home' && <RibbonHome state={state} dispatch={dispatch} />}
      {tab === 'Formulas' && <RibbonFormulas state={state} dispatch={dispatch} />}

      {tab === 'File' && (
        <div className="flex flex-wrap items-start gap-y-2 py-1">
          <Group title="Tệp">
            <ToolButton helpId="excel.save" label="Save — Lưu tệp" onClick={() => dispatch({ type: 'openDialog', dialog: 'save' })}>💾 Lưu</ToolButton>
            <ToolButton helpId="excel.print" label="Print — In" onClick={() => dispatch({ type: 'openDialog', dialog: 'print' })}>🖨 In</ToolButton>
          </Group>
          {state.saved ? (
            <p className="self-center px-3 text-sm text-muted">Đã lưu thành <b>{state.saved.name}</b></p>
          ) : null}
        </div>
      )}

      {tab === 'Insert' && <SoonTab what="Chèn biểu đồ" />}
      {tab === 'Data' && <SoonTab what="Sắp xếp và lọc dữ liệu" />}
      {tab === 'View' && (
        <p className="px-3 py-2 text-sm text-muted">
          Bảng tính mô phỏng luôn hiện lưới và đầu hàng/cột, nên tab này chưa có gì để đổi.
        </p>
      )}
    </div>
  );
}

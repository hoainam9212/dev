import { useState } from 'react';
import type { wordSim } from '@office-neko/shared';
import { RibbonHome } from './RibbonHome';
import { nativeTitle } from '../../help/nativeTitle';

export { WordDialogs } from './dialogs';

interface Props {
  state: wordSim.WordState;
  dispatch: (a: wordSim.WordAction) => void;
}

const TABS = ['File', 'Home', 'Insert', 'Layout', 'References', 'View'] as const;
type Tab = (typeof TABS)[number];

function Btn({ helpId, label, onClick, children }: { helpId: string; label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={nativeTitle(helpId, label)}
      data-help-id={helpId}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className="rounded-lg bg-white px-3 py-1.5 text-sm font-bold transition hover:bg-cream"
    >
      {children}
    </button>
  );
}

/**
 * Tab đang mở là trạng thái giao diện thuần tuý nên được phép nằm ngoài reducer;
 * mọi thứ làm ĐỔI TÀI LIỆU vẫn phải đi qua `dispatch`.
 */
export function Ribbon({ state, dispatch }: Props) {
  const [tab, setTab] = useState<Tab>('Home');
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(2);

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
            className={`rounded-t-lg px-3 py-1 text-sm font-bold transition ${tab === name ? 'bg-white text-rose-ink shadow-sm' : 'text-muted hover:bg-white/60'}`}
          >
            {name}
          </button>
        ))}
      </div>

      {tab === 'Home' && <RibbonHome state={state} dispatch={dispatch} />}

      {tab === 'File' && (
        <div className="flex flex-wrap items-center gap-2 py-1">
          <Btn helpId="word.save" label="Lưu văn bản" onClick={() => dispatch({ type: 'openDialog', dialog: 'save' })}>💾 Lưu</Btn>
          <Btn helpId="word.print" label="In thử" onClick={() => dispatch({ type: 'openDialog', dialog: 'print' })}>🖨️ In</Btn>
        </div>
      )}

      {tab === 'Insert' && (
        <div className="flex flex-wrap items-center gap-2 py-1">
          <label className="flex items-center gap-1 text-sm font-semibold">
            Hàng
            <input aria-label="Số hàng" type="number" min={1} max={8} value={rows} onChange={(e) => setRows(Number(e.target.value))} className="w-14 rounded-lg border-2 border-peach/50 px-2 py-1" />
          </label>
          <label className="flex items-center gap-1 text-sm font-semibold">
            Cột
            <input aria-label="Số cột" type="number" min={1} max={6} value={cols} onChange={(e) => setCols(Number(e.target.value))} className="w-14 rounded-lg border-2 border-peach/50 px-2 py-1" />
          </label>
          <Btn helpId="word.table" label="Chèn bảng" onClick={() => dispatch({ type: 'insertTable', rows, cols })}>▦ Chèn bảng</Btn>
          <Btn helpId="word.rowAdd" label="Thêm hàng" onClick={() => dispatch({ type: 'tableRow', op: 'add' })}>＋ Hàng</Btn>
          <Btn helpId="word.rowRemove" label="Xoá hàng" onClick={() => dispatch({ type: 'tableRow', op: 'remove' })}>－ Hàng</Btn>
          <Btn helpId="word.colAdd" label="Thêm cột" onClick={() => dispatch({ type: 'tableCol', op: 'add' })}>＋ Cột</Btn>
          <Btn helpId="word.colRemove" label="Xoá cột" onClick={() => dispatch({ type: 'tableCol', op: 'remove' })}>－ Cột</Btn>
          <Btn helpId="word.image" label="Chèn ảnh" onClick={() => dispatch({ type: 'openDialog', dialog: 'image' })}>🖼️ Ảnh</Btn>
        </div>
      )}

      {tab === 'Layout' && (
        <div className="flex flex-wrap items-center gap-2 py-1">
          <span className="text-sm font-semibold">Độ rộng ảnh:</span>
          {(['25%', '40%', '60%', '100%'] as const).map((width) => (
            <Btn key={width} helpId="word.imageWidth" label={`Độ rộng ảnh ${width}`} onClick={() => dispatch({ type: 'setImageWidth', width })}>
              {width}
            </Btn>
          ))}
        </div>
      )}

      {tab === 'References' && (
        <div className="flex flex-wrap items-center gap-2 py-1">
          <Btn helpId="word.toc" label="Chèn mục lục" onClick={() => dispatch({ type: 'insertToc' })}>📑 Chèn mục lục</Btn>
          <Btn helpId="word.tocRefresh" label="Cập nhật mục lục" onClick={() => dispatch({ type: 'refreshToc' })}>🔄 Cập nhật mục lục</Btn>
        </div>
      )}

      {tab === 'View' && (
        <div className="flex flex-wrap items-center gap-2 py-1">
          <Btn helpId="word.find" label="Tìm và thay thế" onClick={() => dispatch({ type: 'openDialog', dialog: 'find' })}>🔍 Tìm &amp; Thay thế</Btn>
        </div>
      )}
    </div>
  );
}

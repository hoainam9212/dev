import { excelSim, type formula } from '@office-neko/shared';

interface Props {
  state: excelSim.WorkbookState;
  dispatch: (a: excelSim.ExcelAction) => void;
}

interface BtnProps {
  helpId: string;
  label: string;
  onClick: () => void;
  pressed?: boolean;
  wide?: boolean;
}

function Btn({ helpId, label, onClick, pressed, wide }: BtnProps) {
  return (
    <button
      type="button"
      data-help-id={helpId}
      aria-label={label}
      aria-pressed={pressed}
      onClick={onClick}
      className={[
        'rounded-lg border border-black/10 px-2 py-1 text-xs',
        wide ? 'min-w-[86px]' : 'min-w-[34px]',
        pressed ? 'bg-excel-ink/15 font-bold' : 'bg-white',
      ].join(' ')}
    >
      {label}
    </button>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 border-r border-black/5 px-2 last:border-r-0">
      <div className="flex flex-wrap items-center gap-1">{children}</div>
      <span className="text-center text-[10px] text-muted">{title}</span>
    </div>
  );
}

const NUM_FORMATS: { id: formula.CellFormat['numFmt']; label: string; help: string }[] = [
  { id: 'general', label: 'General', help: 'excel.fmtGeneral' },
  { id: 'number', label: 'Number', help: 'excel.fmtNumber' },
  { id: 'currencyVnd', label: 'Tiền VNĐ', help: 'excel.fmtCurrency' },
  { id: 'percent', label: 'Phần trăm', help: 'excel.fmtPercent' },
  { id: 'date', label: 'Ngày', help: 'excel.fmtDate' },
];

export function RibbonHome({ state, dispatch }: Props) {
  // Nút bật/tắt phải soi ô ĐANG CHỌN, để người học thấy trạng thái hiện tại.
  const here = excelSim.formatOf(state, excelSim.refName(state.sel.from));
  const set = (fmt: Partial<formula.CellFormat>) => dispatch({ type: 'setFormat', fmt });

  return (
    <div className="flex flex-wrap items-start gap-1 overflow-x-auto">
      <Group title="Hoàn tác">
        <Btn helpId="excel.undo" label="Hoàn tác" onClick={() => dispatch({ type: 'undo' })} wide />
      </Group>

      <Group title="Clipboard">
        <Btn helpId="excel.copy" label="Copy" onClick={() => dispatch({ type: 'copy' })} />
        <Btn helpId="excel.paste" label="Dán" onClick={() => dispatch({ type: 'paste' })} />
      </Group>

      <Group title="Chữ">
        <Btn helpId="excel.bold" label="In đậm (B)" onClick={() => set({ bold: !here.bold })} pressed={!!here.bold} wide />
        <Btn helpId="excel.italic" label="In nghiêng (I)" onClick={() => set({ italic: !here.italic })} pressed={!!here.italic} wide />
        <Btn helpId="excel.color" label="Màu chữ" onClick={() => set({ color: here.color ? undefined : '#C2185B' })} wide />
        <Btn helpId="excel.fill" label="Màu nền" onClick={() => set({ fill: here.fill ? undefined : '#FFF3B0' })} wide />
      </Group>

      <Group title="Căn lề">
        <Btn helpId="excel.alignLeft" label="Căn trái" onClick={() => set({ align: 'left' })} pressed={here.align === 'left'} wide />
        <Btn helpId="excel.alignCenter" label="Căn giữa" onClick={() => set({ align: 'center' })} pressed={here.align === 'center'} wide />
        <Btn helpId="excel.alignRight" label="Căn phải" onClick={() => set({ align: 'right' })} pressed={here.align === 'right'} wide />
      </Group>

      <Group title="Ô">
        <Btn helpId="excel.merge" label="Gộp ô (Merge)" onClick={() => dispatch({ type: 'merge' })} wide />
        <Btn helpId="excel.border" label="Viền" onClick={() => set({ border: here.border === 'all' ? 'none' : 'all' })} pressed={here.border === 'all'} wide />
      </Group>

      <Group title="Định dạng số">
        {NUM_FORMATS.map((f) => (
          <Btn
            key={f.label}
            helpId={f.help}
            label={f.label}
            onClick={() => set({ numFmt: f.id })}
            pressed={(here.numFmt ?? 'general') === f.id}
            wide
          />
        ))}
        <Btn helpId="excel.decimals" label="Thêm số lẻ" onClick={() => set({ decimals: (here.decimals ?? 0) + 1 })} wide />
        <Btn helpId="excel.decimalsLess" label="Bớt số lẻ" onClick={() => set({ decimals: Math.max(0, (here.decimals ?? 0) - 1) })} wide />
      </Group>

      <Group title="Sửa">
        <Btn helpId="excel.fillDown" label="Fill xuống" onClick={() => dispatch({ type: 'fillDown' })} wide />
        <Btn helpId="excel.fillRight" label="Fill phải" onClick={() => dispatch({ type: 'fillRight' })} wide />
        <Btn helpId="excel.clear" label="Xoá nội dung" onClick={() => dispatch({ type: 'clear' })} wide />
      </Group>
    </div>
  );
}

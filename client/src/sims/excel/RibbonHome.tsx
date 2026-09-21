import type { ReactNode } from 'react';
import { excelSim, type formula } from '@office-neko/shared';

interface Props {
  state: excelSim.WorkbookState;
  dispatch: (a: excelSim.ExcelAction) => void;
}

const NUM_FORMATS: { value: string; label: string }[] = [
  { value: 'general', label: 'General' },
  { value: 'number', label: 'Number' },
  { value: 'currencyVnd', label: 'Tiền ₫' },
  { value: 'percent', label: 'Phần trăm' },
  { value: 'date', label: 'Ngày' },
];

const COLORS: [label: string, value: string | null][] = [
  ['Tự động', null],
  ['Đen', '#3B2E4A'],
  ['Đỏ', '#C2185B'],
  ['Cam', '#E07A26'],
  ['Xanh lá', '#1E7B45'],
  ['Xanh dương', '#2C6BB3'],
];
const FILLS: [label: string, value: string | null][] = [
  ['Không tô', null],
  ['Vàng', '#FFF3B0'],
  ['Xanh lá', '#C8F2DC'],
  ['Xanh dương', '#C6E7FF'],
  ['Hồng', '#FFD6E5'],
];

/** Nhóm nút có nhãn ở dưới, đúng như ribbon Word trong app. */
export function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1 border-r border-peach/40 px-3 last:border-r-0">
      <div className="flex flex-wrap items-center gap-1">{children}</div>
      <span className="text-center text-[0.65rem] font-bold text-muted">{title}</span>
    </div>
  );
}

/** Nút vuông nhỏ mang một ký hiệu, không phải cả câu tiếng Việt. Câu chữ nằm ở tooltip. */
export function ToolButton({
  helpId,
  label,
  pressed,
  onClick,
  children,
}: {
  helpId: string;
  label: string;
  pressed?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      data-help-id={helpId}
      aria-pressed={pressed ?? false}
      // Giữ vùng chọn trong lưới khi bấm nút, nếu không định dạng không biết áp vào đâu.
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`grid h-8 min-w-8 place-items-center rounded-lg px-2 text-sm font-bold transition ${
        pressed ? 'bg-rose/25 ring-2 ring-rose' : 'bg-white hover:bg-cream'
      }`}
    >
      {children}
    </button>
  );
}

export function Picker({
  helpId,
  label,
  value,
  options,
  onChange,
}: {
  helpId: string;
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <select
      aria-label={label}
      title={label}
      data-help-id={helpId}
      value={value}
      onMouseDown={(e) => e.preventDefault()}
      onChange={(e) => onChange(e.target.value)}
      className="h-8 rounded-lg border-2 border-peach/50 bg-white px-2 text-sm font-semibold"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}

export function RibbonHome({ state, dispatch }: Props) {
  // Nút bật/tắt soi ô ĐANG CHỌN để người học thấy trạng thái hiện tại.
  const here = excelSim.formatOf(state, excelSim.refName(state.sel.from));
  const set = (fmt: Partial<formula.CellFormat>) => dispatch({ type: 'setFormat', fmt });

  return (
    <div className="flex flex-wrap items-start gap-y-2 overflow-x-auto py-1">
      <Group title="Clipboard">
        <ToolButton helpId="excel.copy" label="Copy — Sao chép" onClick={() => dispatch({ type: 'copy' })}>⧉</ToolButton>
        <ToolButton helpId="excel.paste" label="Paste — Dán" onClick={() => dispatch({ type: 'paste' })}>📋</ToolButton>
        <ToolButton helpId="excel.undo" label="Hoàn tác" onClick={() => dispatch({ type: 'undo' })}>↶</ToolButton>
      </Group>

      <Group title="Phông chữ">
        <ToolButton helpId="excel.bold" label="Bold — In đậm" pressed={!!here.bold} onClick={() => set({ bold: !here.bold })}>
          <span className="font-black">B</span>
        </ToolButton>
        <ToolButton helpId="excel.italic" label="Italic — In nghiêng" pressed={!!here.italic} onClick={() => set({ italic: !here.italic })}>
          <span className="italic">I</span>
        </ToolButton>
        <Picker
          helpId="excel.color"
          label="Màu chữ"
          value={here.color ?? ''}
          options={COLORS.map(([label, value]) => ({ value: value ?? '', label }))}
          onChange={(value) => set({ color: value || undefined })}
        />
        <Picker
          helpId="excel.fill"
          label="Màu nền"
          value={here.fill ?? ''}
          options={FILLS.map(([label, value]) => ({ value: value ?? '', label }))}
          onChange={(value) => set({ fill: value || undefined })}
        />
        <ToolButton helpId="excel.border" label="Viền ô" pressed={here.border === 'all'} onClick={() => set({ border: here.border === 'all' ? 'none' : 'all' })}>▦</ToolButton>
      </Group>

      <Group title="Căn lề">
        <ToolButton helpId="excel.alignLeft" label="Căn trái" pressed={here.align === 'left'} onClick={() => set({ align: 'left' })}>⬅</ToolButton>
        <ToolButton helpId="excel.alignCenter" label="Căn giữa" pressed={here.align === 'center'} onClick={() => set({ align: 'center' })}>↔</ToolButton>
        <ToolButton helpId="excel.alignRight" label="Căn phải" pressed={here.align === 'right'} onClick={() => set({ align: 'right' })}>➡</ToolButton>
        <ToolButton helpId="excel.merge" label="Merge — Gộp ô" onClick={() => dispatch({ type: 'merge' })}>⬓</ToolButton>
      </Group>

      <Group title="Định dạng số">
        <Picker
          helpId="excel.numFmt"
          label="Kiểu số"
          value={here.numFmt ?? 'general'}
          options={NUM_FORMATS}
          onChange={(value) => set({ numFmt: value as formula.CellFormat['numFmt'] })}
        />
        <ToolButton helpId="excel.decimals" label="Thêm một số lẻ" onClick={() => set({ decimals: (here.decimals ?? 0) + 1 })}>.0→.00</ToolButton>
        <ToolButton helpId="excel.decimalsLess" label="Bớt một số lẻ" onClick={() => set({ decimals: Math.max(0, (here.decimals ?? 0) - 1) })}>.00→.0</ToolButton>
      </Group>

      <Group title="Sửa">
        <ToolButton helpId="excel.fillDown" label="Fill xuống" onClick={() => dispatch({ type: 'fillDown' })}>⤓</ToolButton>
        <ToolButton helpId="excel.fillRight" label="Fill sang phải" onClick={() => dispatch({ type: 'fillRight' })}>⇥</ToolButton>
        <ToolButton helpId="excel.clear" label="Xoá nội dung" onClick={() => dispatch({ type: 'clear' })}>🧽</ToolButton>
      </Group>
    </div>
  );
}

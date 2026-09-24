import { Group, Picker, ToolButton } from '../../components/ribbon';
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

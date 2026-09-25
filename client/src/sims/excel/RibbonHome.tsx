import {
  ArrowDown20Regular,
  ArrowRight20Regular,
  ArrowUndo20Regular,
  BorderAll20Regular,
  BorderNone20Regular,
  ClipboardPaste20Regular,
  Copy20Regular,
  DecimalArrowLeft20Regular,
  DecimalArrowRight20Regular,
  Eraser20Regular,
  PaintBucket20Regular,
  TableCellsMerge20Regular,
  TextAlignCenter20Regular,
  TextAlignLeft20Regular,
  TextAlignRight20Regular,
  TextBold20Regular,
  TextColor20Regular,
  TextItalic20Regular,
} from '@fluentui/react-icons';
import { excelSim, type formula } from '@office-neko/shared';
import { Group, Labeled, MenuButton, Picker, Row, Swatched, ToolButton } from '../../components/ribbon';

interface Props {
  state: excelSim.WorkbookState;
  dispatch: (a: excelSim.ExcelAction) => void;
}

/** Tên như ô Number Format của Excel 365; GIÁ TRỊ giữ nguyên vì `solution`/`checks` bài học dùng chúng. */
const NUM_FORMATS: { value: string; label: string }[] = [
  { value: 'general', label: 'General' },
  { value: 'number', label: 'Number' },
  { value: 'currencyVnd', label: 'Currency (₫)' },
  { value: 'percent', label: 'Percentage' },
  { value: 'date', label: 'Short Date' },
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

const SWATCH_SELECT = { width: '1.1rem', border: 'none', background: 'transparent' } as const;

/**
 * Thẻ Home dựng theo Excel 365 tiếng Anh: Undo | Clipboard | Font | Alignment | Number | Editing —
 * chỉ các nút bài học dùng, nhưng đúng nhóm, đúng thứ tự, đúng icon. Không bọc `overflow-x-auto`:
 * menu Borders/Fill/Clear sẽ bị cắt (lỗi 4B).
 */
export function RibbonHome({ state, dispatch }: Props) {
  // Nút bật/tắt soi ô ĐANG CHỌN để người học thấy trạng thái hiện tại.
  const here = excelSim.formatOf(state, excelSim.refName(state.sel.from));
  const set = (fmt: Partial<formula.CellFormat>) => dispatch({ type: 'setFormat', fmt });

  return (
    <div className="flex flex-wrap items-stretch gap-y-2 py-1">
      <Group title="Undo" variant="office">
        <ToolButton variant="office" large helpId="excel.undo" label="Hoàn tác" onClick={() => dispatch({ type: 'undo' })}>
          <ArrowUndo20Regular />
        </ToolButton>
      </Group>

      <Group title="Clipboard" variant="office">
        <Row>
          <ToolButton variant="office" large helpId="excel.paste" label="Dán" onClick={() => dispatch({ type: 'paste' })}>
            <ClipboardPaste20Regular />
            <span>Paste</span>
          </ToolButton>
          <ToolButton variant="office" helpId="excel.copy" label="Sao chép" onClick={() => dispatch({ type: 'copy' })}>
            <Labeled icon={<Copy20Regular />} text="Copy" />
          </ToolButton>
        </Row>
      </Group>

      <Group title="Font" variant="office">
        <Row>
          <ToolButton variant="office" helpId="excel.bold" label="In đậm" pressed={!!here.bold} onClick={() => set({ bold: !here.bold })}>
            <TextBold20Regular />
          </ToolButton>
          <ToolButton variant="office" helpId="excel.italic" label="In nghiêng" pressed={!!here.italic} onClick={() => set({ italic: !here.italic })}>
            <TextItalic20Regular />
          </ToolButton>
          <span className="mx-1 h-5 w-px bg-neutral-300" aria-hidden />
          <MenuButton
            variant="office"
            helpId="excel.border"
            label="Viền ô"
            button={<BorderAll20Regular />}
            items={[
              { value: 'all', label: 'Kẻ mọi viền', content: <Labeled icon={<BorderAll20Regular />} text="All Borders" /> },
              { value: 'none', label: 'Bỏ viền', content: <Labeled icon={<BorderNone20Regular />} text="No Border" /> },
            ]}
            onPick={(border) => set({ border: border as formula.CellFormat['border'] })}
          />
          <label className="flex items-center">
            <Swatched icon={<PaintBucket20Regular />} color={here.fill ?? '#FFE600'} />
            <Picker
              variant="office"
              helpId="excel.fill"
              label="Màu nền"
              value={here.fill ?? ''}
              style={SWATCH_SELECT}
              options={FILLS.map(([label, value]) => ({ value: value ?? '', label }))}
              onChange={(value) => set({ fill: value || undefined })}
            />
          </label>
          <label className="flex items-center">
            <Swatched icon={<TextColor20Regular />} color={here.color ?? '#E00000'} />
            <Picker
              variant="office"
              helpId="excel.color"
              label="Màu chữ"
              value={here.color ?? ''}
              style={SWATCH_SELECT}
              options={COLORS.map(([label, value]) => ({ value: value ?? '', label }))}
              onChange={(value) => set({ color: value || undefined })}
            />
          </label>
        </Row>
      </Group>

      <Group title="Alignment" variant="office">
        <Row>
          <ToolButton variant="office" helpId="excel.alignLeft" label="Căn trái" pressed={here.align === 'left'} onClick={() => set({ align: 'left' })}>
            <TextAlignLeft20Regular />
          </ToolButton>
          <ToolButton variant="office" helpId="excel.alignCenter" label="Căn giữa" pressed={here.align === 'center'} onClick={() => set({ align: 'center' })}>
            <TextAlignCenter20Regular />
          </ToolButton>
          <ToolButton variant="office" helpId="excel.alignRight" label="Căn phải" pressed={here.align === 'right'} onClick={() => set({ align: 'right' })}>
            <TextAlignRight20Regular />
          </ToolButton>
        </Row>
        <Row>
          <ToolButton variant="office" helpId="excel.merge" label="Gộp ô" onClick={() => dispatch({ type: 'merge' })}>
            <Labeled icon={<TableCellsMerge20Regular />} text="Merge & Center" />
          </ToolButton>
        </Row>
      </Group>

      <Group title="Number" variant="office">
        <Row>
          <Picker
            variant="office"
            helpId="excel.numFmt"
            label="Kiểu số"
            value={here.numFmt ?? 'general'}
            style={{ width: '7.5rem' }}
            options={NUM_FORMATS}
            onChange={(value) => set({ numFmt: value as formula.CellFormat['numFmt'] })}
          />
        </Row>
        <Row>
          <ToolButton variant="office" helpId="excel.decimals" label="Thêm một số lẻ" onClick={() => set({ decimals: (here.decimals ?? 0) + 1 })}>
            <DecimalArrowLeft20Regular />
          </ToolButton>
          <ToolButton variant="office" helpId="excel.decimalsLess" label="Bớt một số lẻ" onClick={() => set({ decimals: Math.max(0, (here.decimals ?? 0) - 1) })}>
            <DecimalArrowRight20Regular />
          </ToolButton>
        </Row>
      </Group>

      <Group title="Editing" variant="office">
        <MenuButton
          variant="office"
          helpId="excel.fillDown"
          label="Fill"
          button={<Labeled icon={<ArrowDown20Regular />} text="Fill" />}
          items={[
            { value: 'down', label: 'Fill xuống', content: <Labeled icon={<ArrowDown20Regular />} text="Down" /> },
            { value: 'right', label: 'Fill sang phải', content: <Labeled icon={<ArrowRight20Regular />} text="Right" /> },
          ]}
          onPick={(dir) => dispatch({ type: dir === 'down' ? 'fillDown' : 'fillRight' })}
        />
        <MenuButton
          variant="office"
          helpId="excel.clear"
          label="Xoá"
          button={<Labeled icon={<Eraser20Regular />} text="Clear" />}
          items={[{ value: 'contents', label: 'Xoá nội dung', content: <span>Clear Contents</span> }]}
          onPick={() => dispatch({ type: 'clear' })}
        />
      </Group>
    </div>
  );
}

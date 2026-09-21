import type { ReactNode } from 'react';
import { wordSim } from '@office-neko/shared';

interface Props {
  state: wordSim.WordState;
  dispatch: (a: wordSim.WordAction) => void;
}

const FONTS = ['Times New Roman', 'Arial', 'Calibri', 'Tahoma', 'Courier New'];
const SIZES = ['10pt', '11pt', '12pt', '14pt', '16pt', '20pt'];
const COLORS: [label: string, value: string | null][] = [
  ['Tự động', null],
  ['Đen', '#3B2E4A'],
  ['Đỏ', '#C2185B'],
  ['Cam', '#E07A26'],
  ['Xanh lá', '#1E7B45'],
  ['Xanh dương', '#2C6BB3'],
  ['Tím', '#6B4FA8'],
];
const HIGHLIGHTS: [label: string, value: string | null][] = [
  ['Không tô', null],
  ['Vàng', '#FFF3B0'],
  ['Xanh lá', '#C8F2DC'],
  ['Xanh dương', '#C6E7FF'],
  ['Hồng', '#FFD6E5'],
];
const ALIGNS: [label: string, value: wordSim.Align, helpId: string, icon: string][] = [
  ['Căn trái', 'left', 'word.alignLeft', '⬅'],
  ['Căn giữa', 'center', 'word.alignCenter', '↔'],
  ['Căn phải', 'right', 'word.alignRight', '➡'],
  ['Căn đều', 'justify', 'word.alignJustify', '☰'],
];

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1 border-r border-peach/40 px-3 last:border-r-0">
      <div className="flex flex-wrap items-center gap-1">{children}</div>
      <span className="text-center text-[0.65rem] font-bold text-muted">{title}</span>
    </div>
  );
}

function ToolButton({
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
      // Giữ vùng chọn trong trang khi bấm nút, nếu không định dạng sẽ không biết áp vào đâu.
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

function Picker({
  helpId,
  label,
  value,
  options,
  onChange,
  style,
}: {
  helpId: string;
  label: string;
  value: string;
  options: { value: string; label: string; style?: React.CSSProperties }[];
  onChange: (value: string) => void;
  style?: React.CSSProperties;
}) {
  return (
    <select
      aria-label={label}
      title={label}
      data-help-id={helpId}
      value={value}
      style={style}
      onMouseDown={(e) => e.preventDefault()}
      onChange={(e) => onChange(e.target.value)}
      className="h-8 rounded-lg border-2 border-peach/50 bg-white px-2 text-sm font-semibold"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value} style={o.style}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

export function RibbonHome({ state, dispatch }: Props) {
  const marks = wordSim.activeMarks(state);
  const block = wordSim.activeBlock(state);

  return (
    <div className="flex flex-wrap items-start gap-y-2 overflow-x-auto py-1">
      <Group title="Phông chữ">
        <Picker
          helpId="word.font"
          label="Phông chữ"
          value={marks?.fontFamily ?? ''}
          style={{ fontFamily: marks?.fontFamily ?? undefined }}
          options={[{ value: '', label: 'Phông chữ' }, ...FONTS.map((f) => ({ value: f, label: f, style: { fontFamily: f } }))]}
          onChange={(value) => dispatch({ type: 'setStyle', attr: 'fontFamily', value: value || null })}
        />
        <Picker
          helpId="word.size"
          label="Cỡ chữ"
          value={marks?.fontSize ?? ''}
          options={[{ value: '', label: 'Cỡ' }, ...SIZES.map((s) => ({ value: s, label: s.replace('pt', '') }))]}
          onChange={(value) => dispatch({ type: 'setStyle', attr: 'fontSize', value: value || null })}
        />
        <ToolButton helpId="word.bold" label="In đậm" pressed={marks?.bold} onClick={() => dispatch({ type: 'toggleMark', mark: 'bold' })}>
          <span className="font-black">B</span>
        </ToolButton>
        <ToolButton helpId="word.italic" label="In nghiêng" pressed={marks?.italic} onClick={() => dispatch({ type: 'toggleMark', mark: 'italic' })}>
          <span className="italic">I</span>
        </ToolButton>
        <ToolButton helpId="word.underline" label="Gạch chân" pressed={marks?.underline} onClick={() => dispatch({ type: 'toggleMark', mark: 'underline' })}>
          <span className="underline">U</span>
        </ToolButton>
        <Picker
          helpId="word.color"
          label="Màu chữ"
          value={marks?.color ?? ''}
          options={COLORS.map(([label, value]) => ({ value: value ?? '', label }))}
          onChange={(value) => dispatch({ type: 'setStyle', attr: 'color', value: value || null })}
        />
        <Picker
          helpId="word.highlight"
          label="Tô nền"
          value={marks?.highlight ?? ''}
          options={HIGHLIGHTS.map(([label, value]) => ({ value: value ?? '', label }))}
          onChange={(value) => dispatch({ type: 'setHighlight', color: value || null })}
        />
      </Group>

      <Group title="Đoạn văn">
        {ALIGNS.map(([label, value, helpId, icon]) => (
          <ToolButton key={value} helpId={helpId} label={label} pressed={block?.align === value} onClick={() => dispatch({ type: 'setAlign', align: value })}>
            {icon}
          </ToolButton>
        ))}
        <Picker
          helpId="word.lineHeight"
          label="Giãn dòng"
          value={block?.lineHeight ?? '1'}
          options={[
            { value: '1', label: '1,0' },
            { value: '1.5', label: '1,5' },
            { value: '2', label: '2,0' },
          ]}
          onChange={(value) => dispatch({ type: 'setLineHeight', value: value as wordSim.LineHeight })}
        />
        <ToolButton helpId="word.bullet" label="Danh sách chấm" pressed={block?.list === 'bullet'} onClick={() => dispatch({ type: 'toggleList', list: 'bullet' })}>
          •≡
        </ToolButton>
        <ToolButton helpId="word.ordered" label="Danh sách số" pressed={block?.list === 'ordered'} onClick={() => dispatch({ type: 'toggleList', list: 'ordered' })}>
          1≡
        </ToolButton>
      </Group>

      <Group title="Kiểu">
        <Picker
          helpId="word.heading"
          label="Kiểu đoạn"
          value={String(block?.level ?? 0)}
          options={[
            { value: '0', label: 'Đoạn thường' },
            { value: '1', label: 'Heading 1' },
            { value: '2', label: 'Heading 2' },
            { value: '3', label: 'Heading 3' },
          ]}
          onChange={(value) => dispatch({ type: 'setHeading', level: Number(value) as 0 | 1 | 2 | 3 })}
        />
      </Group>

      <Group title="Sửa">
        <ToolButton helpId="word.undo" label="Hoàn tác" onClick={() => dispatch({ type: 'undo' })}>
          ↶
        </ToolButton>
      </Group>
    </div>
  );
}

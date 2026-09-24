import type { ReactNode } from 'react';
import { wordSim } from '@office-neko/shared';
import { Highlight20Regular, TextBold20Regular, TextColor20Regular, TextItalic20Regular, TextUnderline20Regular } from '@fluentui/react-icons';
import { Group, Picker, Row, ToolButton } from '../../components/ribbon';

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

/** Icon có vạch màu bên dưới, như chữ A đỏ của Font Color và bút vàng của Highlight trên Word thật. */
function Swatched({ icon, color }: { icon: ReactNode; color: string }) {
  return (
    <span className="flex flex-col items-center leading-none">
      {icon}
      <span className="-mt-0.5 h-1 w-4" style={{ background: color }} />
    </span>
  );
}

export function RibbonHome({ state, dispatch }: Props) {
  const marks = wordSim.activeMarks(state);
  const block = wordSim.activeBlock(state);

  return (
    <div className="flex flex-wrap items-start gap-y-2 overflow-x-auto py-1">
      {/* Nhóm Font đã làm giống Word 365 tiếng Anh, khớp ảnh chụp ở cuối bài word.bold. */}
      <Group title="Font" variant="office">
        <Row>
          <Picker
            variant="office"
            helpId="word.font"
            label="Phông chữ"
            tooltip="Font — Phông chữ"
            value={marks?.fontFamily ?? ''}
            style={{ fontFamily: marks?.fontFamily ?? undefined, width: '8.5rem' }}
            options={[{ value: '', label: 'Phông chữ' }, ...FONTS.map((f) => ({ value: f, label: f, style: { fontFamily: f } }))]}
            onChange={(value) => dispatch({ type: 'setStyle', attr: 'fontFamily', value: value || null })}
          />
          <Picker
            variant="office"
            helpId="word.size"
            label="Cỡ chữ"
            tooltip="Font Size — Cỡ chữ"
            value={marks?.fontSize ?? ''}
            style={{ width: '3.5rem' }}
            options={[{ value: '', label: 'Cỡ' }, ...SIZES.map((s) => ({ value: s, label: s.replace('pt', '') }))]}
            onChange={(value) => dispatch({ type: 'setStyle', attr: 'fontSize', value: value || null })}
          />
        </Row>
        <Row>
          <ToolButton variant="office" helpId="word.bold" label="In đậm" tooltip="Bold (Ctrl+B) — In đậm" pressed={marks?.bold} onClick={() => dispatch({ type: 'toggleMark', mark: 'bold' })}>
            <TextBold20Regular />
          </ToolButton>
          <ToolButton variant="office" helpId="word.italic" label="In nghiêng" tooltip="Italic (Ctrl+I) — In nghiêng" pressed={marks?.italic} onClick={() => dispatch({ type: 'toggleMark', mark: 'italic' })}>
            <TextItalic20Regular />
          </ToolButton>
          <ToolButton variant="office" helpId="word.underline" label="Gạch chân" tooltip="Underline (Ctrl+U) — Gạch chân" pressed={marks?.underline} onClick={() => dispatch({ type: 'toggleMark', mark: 'underline' })}>
            <TextUnderline20Regular />
          </ToolButton>
          <span className="mx-1 h-5 w-px bg-neutral-300" aria-hidden />
          <label className="flex items-center">
            <Swatched icon={<Highlight20Regular />} color={marks?.highlight ?? '#FFE600'} />
            <Picker
              variant="office"
              helpId="word.highlight"
              label="Tô nền"
              tooltip="Text Highlight Color — Tô nền"
              value={marks?.highlight ?? ''}
              style={{ width: '1.1rem', border: 'none', background: 'transparent' }}
              options={HIGHLIGHTS.map(([label, value]) => ({ value: value ?? '', label }))}
              onChange={(value) => dispatch({ type: 'setHighlight', color: value || null })}
            />
          </label>
          <label className="flex items-center">
            <Swatched icon={<TextColor20Regular />} color={marks?.color ?? '#E00000'} />
            <Picker
              variant="office"
              helpId="word.color"
              label="Màu chữ"
              tooltip="Font Color — Màu chữ"
              value={marks?.color ?? ''}
              style={{ width: '1.1rem', border: 'none', background: 'transparent' }}
              options={COLORS.map(([label, value]) => ({ value: value ?? '', label }))}
              onChange={(value) => dispatch({ type: 'setStyle', attr: 'color', value: value || null })}
            />
          </label>
        </Row>
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

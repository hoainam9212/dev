import type { ReactNode } from 'react';
import { wordSim } from '@office-neko/shared';
import {
  ArrowSwap20Regular,
  ArrowUndo20Regular,
  Highlight20Regular,
  TextAlignCenter20Regular,
  TextAlignJustify20Regular,
  TextAlignLeft20Regular,
  TextAlignRight20Regular,
  TextBold20Regular,
  TextBulletListLtr20Regular,
  TextColor20Regular,
  TextItalic20Regular,
  TextLineSpacing20Regular,
  TextNumberListLtr20Regular,
  TextUnderline20Regular,
} from '@fluentui/react-icons';
import { Group, MenuButton, Picker, Row, ToolButton } from '../../components/ribbon';

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
const ALIGNS: [label: string, value: wordSim.Align, helpId: string, icon: ReactNode][] = [
  ['Căn trái', 'left', 'word.alignLeft', <TextAlignLeft20Regular key="l" />],
  ['Căn giữa', 'center', 'word.alignCenter', <TextAlignCenter20Regular key="c" />],
  ['Căn phải', 'right', 'word.alignRight', <TextAlignRight20Regular key="r" />],
  ['Căn đều', 'justify', 'word.alignJustify', <TextAlignJustify20Regular key="j" />],
];
const SPACINGS: [value: wordSim.LineHeight, label: string][] = [
  ['1', '1,0'],
  ['1.5', '1,5'],
  ['2', '2,0'],
];
/** Dải ô mẫu của nhóm Styles; mỗi ô vẽ chữ "AaBbCc" đúng kiểu của nó như Word. */
const STYLES: [level: 0 | 1 | 2 | 3, name: string, look: string][] = [
  [0, 'Normal', 'text-[0.8rem]'],
  [1, 'Heading 1', 'text-[1rem] text-[#2F5496]'],
  [2, 'Heading 2', 'text-[0.9rem] text-[#2F5496]'],
  [3, 'Heading 3', 'text-[0.8rem] text-[#1F3763]'],
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

const SWATCH_SELECT = { width: '1.1rem', border: 'none', background: 'transparent' } as const;

/**
 * Tab Home dựng theo Word 365 tiếng Anh: Undo | Font | Paragraph | Styles | Editing — chỉ các nút
 * bài học dùng, nhưng đúng nhóm, đúng thứ tự, đúng icon để người học mở Word thật vẫn nhận ra.
 * Không bọc trong khung `overflow-x-auto`: menu thả xuống (Line Spacing) sẽ bị cắt (lỗi 4B).
 */
export function RibbonHome({ state, dispatch }: Props) {
  const marks = wordSim.activeMarks(state);
  const block = wordSim.activeBlock(state);
  const level = block?.level ?? 0;

  return (
    <div className="flex flex-wrap items-stretch gap-y-2 py-1">
      <Group title="Undo" variant="office">
        <ToolButton variant="office" large helpId="word.undo" label="Hoàn tác" onClick={() => dispatch({ type: 'undo' })}>
          <ArrowUndo20Regular />
        </ToolButton>
      </Group>

      <Group title="Font" variant="office">
        <Row>
          <Picker
            variant="office"
            helpId="word.font"
            label="Phông chữ"
            value={marks?.fontFamily ?? ''}
            style={{ fontFamily: marks?.fontFamily ?? undefined, width: '8.5rem' }}
            options={[{ value: '', label: 'Phông chữ' }, ...FONTS.map((f) => ({ value: f, label: f, style: { fontFamily: f } }))]}
            onChange={(value) => dispatch({ type: 'setStyle', attr: 'fontFamily', value: value || null })}
          />
          <Picker
            variant="office"
            helpId="word.size"
            label="Cỡ chữ"
            value={marks?.fontSize ?? ''}
            style={{ width: '3.5rem' }}
            options={[{ value: '', label: 'Cỡ' }, ...SIZES.map((s) => ({ value: s, label: s.replace('pt', '') }))]}
            onChange={(value) => dispatch({ type: 'setStyle', attr: 'fontSize', value: value || null })}
          />
        </Row>
        <Row>
          <ToolButton variant="office" helpId="word.bold" label="In đậm" pressed={marks?.bold} onClick={() => dispatch({ type: 'toggleMark', mark: 'bold' })}>
            <TextBold20Regular />
          </ToolButton>
          <ToolButton variant="office" helpId="word.italic" label="In nghiêng" pressed={marks?.italic} onClick={() => dispatch({ type: 'toggleMark', mark: 'italic' })}>
            <TextItalic20Regular />
          </ToolButton>
          <ToolButton variant="office" helpId="word.underline" label="Gạch chân" pressed={marks?.underline} onClick={() => dispatch({ type: 'toggleMark', mark: 'underline' })}>
            <TextUnderline20Regular />
          </ToolButton>
          <span className="mx-1 h-5 w-px bg-neutral-300" aria-hidden />
          <label className="flex items-center">
            <Swatched icon={<Highlight20Regular />} color={marks?.highlight ?? '#FFE600'} />
            <Picker
              variant="office"
              helpId="word.highlight"
              label="Tô nền"
              value={marks?.highlight ?? ''}
              style={SWATCH_SELECT}
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
              value={marks?.color ?? ''}
              style={SWATCH_SELECT}
              options={COLORS.map(([label, value]) => ({ value: value ?? '', label }))}
              onChange={(value) => dispatch({ type: 'setStyle', attr: 'color', value: value || null })}
            />
          </label>
        </Row>
      </Group>

      {/* Word xếp: hàng trên Bullets, Numbering; hàng dưới bốn nút căn lề rồi Line Spacing. */}
      <Group title="Paragraph" variant="office">
        <Row>
          <ToolButton variant="office" helpId="word.bullet" label="Danh sách chấm" pressed={block?.list === 'bullet'} onClick={() => dispatch({ type: 'toggleList', list: 'bullet' })}>
            <TextBulletListLtr20Regular />
          </ToolButton>
          <ToolButton variant="office" helpId="word.ordered" label="Danh sách số" pressed={block?.list === 'ordered'} onClick={() => dispatch({ type: 'toggleList', list: 'ordered' })}>
            <TextNumberListLtr20Regular />
          </ToolButton>
        </Row>
        <Row>
          {ALIGNS.map(([label, value, helpId, icon]) => (
            <ToolButton key={value} variant="office" helpId={helpId} label={label} pressed={block?.align === value} onClick={() => dispatch({ type: 'setAlign', align: value })}>
              {icon}
            </ToolButton>
          ))}
          <MenuButton
            variant="office"
            helpId="word.lineHeight"
            label="Giãn dòng"
            button={<TextLineSpacing20Regular />}
            items={SPACINGS.map(([value, text]) => ({
              value,
              label: `Giãn dòng ${text}`,
              content: <span className={block?.lineHeight === value ? 'font-black' : ''}>{text}</span>,
            }))}
            onPick={(value) => dispatch({ type: 'setLineHeight', value: value as wordSim.LineHeight })}
          />
        </Row>
      </Group>

      <Group title="Styles" variant="office">
        <div className="flex gap-1" data-help-id="word.heading">
          {STYLES.map(([lv, name, look]) => (
            <button
              key={lv}
              type="button"
              aria-label={`Kiểu ${name}`}
              aria-pressed={level === lv}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => dispatch({ type: 'setHeading', level: lv })}
              className={`flex h-14 w-16 flex-col items-center justify-center gap-0.5 rounded-sm border bg-white ${
                level === lv ? 'border-neutral-500 bg-neutral-100' : 'border-neutral-300 hover:bg-neutral-100'
              }`}
            >
              <span className={`leading-none ${look}`}>AaBbCc</span>
              <span className="text-[0.65rem] text-neutral-700">{name}</span>
            </button>
          ))}
        </div>
      </Group>

      <Group title="Editing" variant="office">
        <ToolButton variant="office" helpId="word.find" label="Tìm và thay thế" onClick={() => dispatch({ type: 'openDialog', dialog: 'find' })}>
          <span className="flex items-center gap-1 text-[0.75rem]">
            <ArrowSwap20Regular /> Replace
          </span>
        </ToolButton>
      </Group>
    </div>
  );
}

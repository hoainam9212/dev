import type { Dispatch } from 'react';
import { pptSim } from '@office-neko/shared';
import {
  ArrowUndo20Regular,
  LayerDiagonal20Regular,
  PaintBucket20Regular,
  PositionToBack20Regular,
  PositionToFront20Regular,
  SlideAdd20Regular,
  SlideLayout20Regular,
  TextAlignCenter20Regular,
  TextAlignLeft20Regular,
  TextAlignRight20Regular,
  TextBold20Regular,
  TextColor20Regular,
  TextItalic20Regular,
} from '@fluentui/react-icons';
import { Group, Labeled, MenuButton, Row, SplitButton, Swatched, ToolButton } from '../../components/ribbon';

interface Props {
  state: pptSim.PptState;
  dispatch: Dispatch<pptSim.PptAction>;
}

/** Hình thu nhỏ của bố cục: các chỗ dành sẵn vẽ thành khối xám trên khung 16:9. */
function LayoutPreview({ layout }: { layout: pptSim.Layout }) {
  return (
    <svg viewBox="0 0 960 540" className="h-9 w-16 rounded border border-peach/60 bg-white" aria-hidden="true">
      {pptSim.PLACEHOLDERS[layout].map((p) => (
        <rect key={p.role} x={p.x} y={p.y} width={p.w} height={p.h} rx={16} fill={p.role === 'title' ? '#FFA878' : '#E5E1DC'} />
      ))}
    </svg>
  );
}

/** Bốn bố cục, mỗi mục có hình xem trước — dùng cho cả New Slide ▾ và Layout ▾. */
const LAYOUT_ITEMS = pptSim.PPT_LAYOUTS.map((l) => ({
  value: l.id,
  label: `${l.label} — ${l.vi}`,
  content: (
    <span className="flex items-center gap-2">
      <LayoutPreview layout={l.id} />
      <span className="text-left leading-tight">
        <b className="block">{l.label}</b>
        <span className="text-xs text-muted">{l.vi}</span>
      </span>
    </span>
  ),
}));

const DUPLICATE = 'duplicate';

const swatchItems = (prefix: string) =>
  pptSim.PPT_COLORS.map((c) => ({
    value: c.id,
    label: `${prefix}${c.vi}`,
    content: (
      <span className="flex items-center gap-2">
        <span className="inline-block h-4 w-4 rounded border border-black/20" style={{ background: c.id }} />
        {c.vi}
      </span>
    ),
  }));

/** New Slide tách đôi — PowerPoint đặt cùng một nút ở thẻ Home và thẻ Insert. */
export function NewSlideButton({ dispatch }: Props) {
  return (
    <SplitButton
      helpId="ppt.newSlide"
      label="Slide mới"
      menuLabel="Chọn bố cục cho slide mới"
      icon={<SlideAdd20Regular />}
      text="New Slide"
      onClick={() => dispatch({ type: 'addSlide' })}
      items={[
        ...LAYOUT_ITEMS,
        { value: DUPLICATE, label: 'Nhân đôi slide đang chọn', content: <span className="px-1">Duplicate Selected Slides</span> },
      ]}
      onPick={(v) => {
        if (v === DUPLICATE) return dispatch({ type: 'duplicateSlide' });
        // Như PowerPoint: chọn bố cục ở New Slide ▾ là thêm slide mới mang luôn bố cục đó.
        dispatch({ type: 'addSlide' });
        dispatch({ type: 'setLayout', layout: v as pptSim.Layout });
      }}
    />
  );
}

/** Thẻ Home theo PowerPoint 365: Undo | Slides | Font | Paragraph | Drawing. */
export function RibbonHome({ state, dispatch }: Props) {
  const el = pptSim.elOf(state);
  const fmt = el?.fmt ?? {};
  const none = el === null;
  const set = (f: Partial<pptSim.ElFormat>) => dispatch({ type: 'setFmt', fmt: f });

  return (
    <div className="flex flex-wrap items-stretch gap-y-2 py-1">
      <Group title="Undo" variant="office">
        <ToolButton
          variant="office"
          large
          helpId="ppt.undo"
          label="Hoàn tác"
          disabled={state.past.length === 0}
          onClick={() => dispatch({ type: 'undo' })}
        >
          <ArrowUndo20Regular />
        </ToolButton>
      </Group>

      <Group title="Slides" variant="office">
        <Row>
          <NewSlideButton state={state} dispatch={dispatch} />
          <MenuButton
            variant="office"
            helpId="ppt.layout"
            label="Bố cục"
            button={<Labeled icon={<SlideLayout20Regular />} text="Layout" />}
            items={LAYOUT_ITEMS}
            onPick={(layout) => dispatch({ type: 'setLayout', layout: layout as pptSim.Layout })}
          />
        </Row>
      </Group>

      <Group title="Font" variant="office">
        <Row>
          <MenuButton
            variant="office"
            helpId="ppt.size"
            label="Cỡ chữ"
            disabled={none}
            button={<span className="inline-block w-6 text-right text-[0.8rem]">{fmt.size ?? 24}</span>}
            items={pptSim.PPT_SIZES.map((n) => ({ value: String(n), label: String(n), content: <span className="px-2">{n}</span> }))}
            onPick={(v) => set({ size: Number(v) })}
          />
        </Row>
        <Row>
          <ToolButton variant="office" helpId="ppt.bold" label="In đậm" disabled={none} pressed={!!fmt.bold} onClick={() => set({ bold: !(fmt.bold ?? false) })}>
            <TextBold20Regular />
          </ToolButton>
          <ToolButton variant="office" helpId="ppt.italic" label="In nghiêng" disabled={none} pressed={!!fmt.italic} onClick={() => set({ italic: !(fmt.italic ?? false) })}>
            <TextItalic20Regular />
          </ToolButton>
          <MenuButton
            variant="office"
            helpId="ppt.color"
            label="Màu chữ"
            disabled={none}
            button={<Swatched icon={<TextColor20Regular />} color={fmt.color ?? '#2F2A26'} />}
            items={swatchItems('')}
            onPick={(color) => set({ color })}
          />
        </Row>
      </Group>

      <Group title="Paragraph" variant="office">
        <Row>
          <ToolButton variant="office" helpId="ppt.align" label="Căn trái" disabled={none} pressed={fmt.align === 'left'} onClick={() => set({ align: 'left' })}>
            <TextAlignLeft20Regular />
          </ToolButton>
          <ToolButton variant="office" helpId="ppt.align" label="Căn giữa" disabled={none} pressed={fmt.align === 'center'} onClick={() => set({ align: 'center' })}>
            <TextAlignCenter20Regular />
          </ToolButton>
          <ToolButton variant="office" helpId="ppt.align" label="Căn phải" disabled={none} pressed={fmt.align === 'right'} onClick={() => set({ align: 'right' })}>
            <TextAlignRight20Regular />
          </ToolButton>
        </Row>
      </Group>

      <Group title="Drawing" variant="office">
        <Row>
          <MenuButton
            variant="office"
            large
            helpId="ppt.arrange"
            label="Sắp xếp lớp"
            disabled={none}
            button={
              <>
                <LayerDiagonal20Regular />
                <span>Arrange ▾</span>
              </>
            }
            items={[
              { value: 'front', label: 'Đưa lên trên cùng', content: <Labeled icon={<PositionToFront20Regular />} text="Bring to Front" /> },
              { value: 'back', label: 'Đưa xuống dưới cùng', content: <Labeled icon={<PositionToBack20Regular />} text="Send to Back" /> },
            ]}
            onPick={(v) => dispatch({ type: v === 'front' ? 'bringToFront' : 'sendToBack' })}
          />
          <MenuButton
            variant="office"
            helpId="ppt.fill"
            label="Màu nền hình"
            disabled={el?.kind !== 'shape'}
            button={<Swatched icon={<PaintBucket20Regular />} color={fmt.fill ?? pptSim.SHAPE_FILL} />}
            items={swatchItems('Nền ')}
            onPick={(fill) => set({ fill })}
          />
        </Row>
      </Group>
    </div>
  );
}

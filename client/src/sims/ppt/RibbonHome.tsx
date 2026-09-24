import type { Dispatch } from 'react';
import { pptSim } from '@office-neko/shared';
import { Group, MenuButton, ToolButton } from '../../components/ribbon';

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

export function RibbonHome({ state, dispatch }: Props) {
  const el = pptSim.elOf(state);
  const fmt = el?.fmt ?? {};
  const none = el === null;
  const set = (f: Partial<pptSim.ElFormat>) => dispatch({ type: 'setFmt', fmt: f });

  return (
    <div className="flex flex-wrap items-start gap-y-2 py-1">
      <Group title="Slides">
        <ToolButton helpId="ppt.newSlide" label="New Slide — Slide mới" onClick={() => dispatch({ type: 'addSlide' })}>
          ＋ New Slide
        </ToolButton>
        <MenuButton
          helpId="ppt.layout"
          label="Layout — Bố cục"
          button="▤"
          items={pptSim.PPT_LAYOUTS.map((l) => ({
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
          }))}
          onPick={(layout) => dispatch({ type: 'setLayout', layout: layout as pptSim.Layout })}
        />
        <ToolButton helpId="ppt.duplicate" label="Duplicate — Nhân đôi slide" onClick={() => dispatch({ type: 'duplicateSlide' })}>⧉</ToolButton>
        <ToolButton
          helpId="ppt.deleteSlide"
          label="Delete Slide — Xoá slide"
          disabled={state.slides.length <= 1}
          onClick={() => dispatch({ type: 'deleteSlide' })}
        >
          🗑
        </ToolButton>
      </Group>

      <Group title="Font">
        <MenuButton
          helpId="ppt.size"
          label="Font size — Cỡ chữ"
          disabled={none}
          button={<span>{fmt.size ?? 24}</span>}
          items={pptSim.PPT_SIZES.map((n) => ({ value: String(n), label: String(n), content: <span className="px-2">{n}</span> }))}
          onPick={(v) => set({ size: Number(v) })}
        />
        <ToolButton helpId="ppt.bold" label="Bold — In đậm" disabled={none} pressed={!!fmt.bold} onClick={() => set({ bold: !(fmt.bold ?? false) })}>
          <span className="font-black">B</span>
        </ToolButton>
        <ToolButton helpId="ppt.italic" label="Italic — In nghiêng" disabled={none} pressed={!!fmt.italic} onClick={() => set({ italic: !(fmt.italic ?? false) })}>
          <span className="italic">I</span>
        </ToolButton>
        <MenuButton
          helpId="ppt.color"
          label="Font color — Màu chữ"
          disabled={none}
          button={<span className="border-b-4 leading-none" style={{ borderColor: fmt.color ?? '#2F2A26' }}>A</span>}
          items={pptSim.PPT_COLORS.map((c) => ({
            value: c.id,
            label: c.vi,
            content: (
              <span className="flex items-center gap-2">
                <span className="inline-block h-4 w-4 rounded border border-black/20" style={{ background: c.id }} />
                {c.vi}
              </span>
            ),
          }))}
          onPick={(color) => set({ color })}
        />
      </Group>

      <Group title="Paragraph & Arrange">
        <ToolButton helpId="ppt.align" label="Align left — Căn trái" disabled={none} pressed={fmt.align === 'left'} onClick={() => set({ align: 'left' })}>⬅</ToolButton>
        <ToolButton helpId="ppt.align" label="Center — Căn giữa" disabled={none} pressed={fmt.align === 'center'} onClick={() => set({ align: 'center' })}>↔</ToolButton>
        <ToolButton helpId="ppt.align" label="Align right — Căn phải" disabled={none} pressed={fmt.align === 'right'} onClick={() => set({ align: 'right' })}>➡</ToolButton>
        <ToolButton helpId="ppt.front" label="Bring to Front — Đưa lên trên" disabled={none} onClick={() => dispatch({ type: 'bringToFront' })}>⬒</ToolButton>
        <ToolButton helpId="ppt.back" label="Send to Back — Đưa xuống dưới" disabled={none} onClick={() => dispatch({ type: 'sendToBack' })}>⬓</ToolButton>
        <ToolButton helpId="ppt.undo" label="Undo — Hoàn tác" disabled={state.past.length === 0} onClick={() => dispatch({ type: 'undo' })}>↶</ToolButton>
      </Group>
    </div>
  );
}

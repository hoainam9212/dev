import type { Dispatch } from 'react';
import type { pptSim } from '@office-neko/shared';
import { Group, MenuButton, ToolButton } from '../../components/ribbon';

interface Props {
  state: pptSim.PptState;
  dispatch: Dispatch<pptSim.PptAction>;
}

/** Tên hình phải khớp `SHAPE_VI` của grader, nếu không lời chấm bài chỉ tới một nút không có. */
const SHAPES: { id: pptSim.ShapeKind; vi: string }[] = [
  { id: 'rect', vi: 'Hình chữ nhật' },
  { id: 'ellipse', vi: 'Hình tròn' },
  { id: 'arrow', vi: 'Mũi tên' },
  { id: 'star', vi: 'Ngôi sao' },
];

/** Chỗ đặt đối tượng mới: trong khung, không đè chỗ dành sẵn của bố cục Tiêu đề và nội dung. */
const NEW_TEXT = { x: 80, y: 400, w: 480, h: 80 };
const NEW_SHAPE = { x: 400, y: 216, w: 160, h: 160 };

export function RibbonInsert({ dispatch }: Props) {
  return (
    <div className="flex flex-wrap items-start gap-y-2 py-1">
      <Group title="Text">
        <ToolButton helpId="ppt.textBox" label="Text Box — Hộp chữ" onClick={() => dispatch({ type: 'addText', ...NEW_TEXT })}>
          🅰 Text Box
        </ToolButton>
      </Group>
      <Group title="Illustrations">
        <MenuButton
          helpId="ppt.shapes"
          label="Shapes — Hình khối"
          button="⬟ Shapes"
          items={SHAPES.map((s) => ({
            value: s.id,
            label: s.vi,
            content: (
              <span className="flex items-center gap-2">
                <span className="relative inline-block h-6 w-6">
                  <span className="ppt-shape" data-shape={s.id} style={{ background: '#FFA878' }} />
                </span>
                {s.vi}
              </span>
            ),
          }))}
          onPick={(shape) => dispatch({ type: 'addShape', shape: shape as pptSim.ShapeKind, ...NEW_SHAPE })}
        />
        <ToolButton helpId="ppt.pictures" label="Pictures — Ảnh" onClick={() => dispatch({ type: 'openDialog', dialog: 'image' })}>
          🖼 Pictures
        </ToolButton>
      </Group>
    </div>
  );
}

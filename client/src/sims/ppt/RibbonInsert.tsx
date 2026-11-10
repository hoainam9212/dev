import type { Dispatch } from 'react';
import type { pptSim } from '@office-neko/shared';
import { Image20Regular, Shapes20Regular, Textbox20Regular } from '@fluentui/react-icons';
import { Group, MenuButton, ToolButton } from '../../components/ribbon';
import { NewSlideButton } from './RibbonHome';

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
/** PowerPoint thật vẽ hình theo kéo chuột; ở đây mỗi loại có cỡ mặc định (bội số 8), cùng tâm (480, 296). */
const SHAPE_SIZE: Record<pptSim.ShapeKind, { w: number; h: number }> = {
  rect: { w: 240, h: 128 },
  ellipse: { w: 160, h: 160 },
  arrow: { w: 200, h: 96 },
  star: { w: 160, h: 160 },
};
const newShape = (shape: pptSim.ShapeKind) => {
  const { w, h } = SHAPE_SIZE[shape];
  return { x: 480 - w / 2, y: 296 - h / 2, w, h };
};

/** Thẻ Insert theo PowerPoint 365: Slides | Images | Illustrations | Text. */
export function RibbonInsert({ state, dispatch }: Props) {
  return (
    <div className="flex flex-wrap items-stretch gap-y-2 py-1">
      <Group title="Slides" variant="office">
        <NewSlideButton state={state} dispatch={dispatch} />
      </Group>

      <Group title="Images" variant="office">
        <ToolButton variant="office" large helpId="ppt.pictures" label="Chèn ảnh" onClick={() => dispatch({ type: 'openDialog', dialog: 'image' })}>
          <Image20Regular />
          <span>Pictures</span>
        </ToolButton>
      </Group>

      <Group title="Illustrations" variant="office">
        <MenuButton
          variant="office"
          large
          helpId="ppt.shapes"
          label="Hình khối"
          button={
            <>
              <Shapes20Regular />
              <span>Shapes ▾</span>
            </>
          }
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
          onPick={(shape) => dispatch({ type: 'addShape', shape: shape as pptSim.ShapeKind, ...newShape(shape as pptSim.ShapeKind) })}
        />
      </Group>

      <Group title="Text" variant="office">
        <ToolButton variant="office" large helpId="ppt.textBox" label="Hộp chữ" onClick={() => dispatch({ type: 'addText', ...NEW_TEXT })}>
          <Textbox20Regular />
          <span>Text Box</span>
        </ToolButton>
      </Group>
    </div>
  );
}

import type { CSSProperties } from 'react';
import type { pptSim } from '@office-neko/shared';

/** Chữ mờ của chỗ dành sẵn khi chưa nhập gì. */
const PLACEHOLDER_VI: Record<string, string> = {
  title: 'Bấm để nhập tiêu đề',
  body: 'Bấm để nhập nội dung',
  body2: 'Bấm để nhập nội dung',
};

/** Vẽ một đối tượng theo px của khung gốc 960x540; khung cha lo việc co giãn. */
export function ElementView({
  el,
  selected,
  onPointerDown,
  hint = true,
}: {
  el: pptSim.El;
  selected: boolean;
  onPointerDown?: (e: React.PointerEvent) => void;
  /** Thumbnail đặt `false`: chữ mờ "Bấm để nhập…" chỉ có nghĩa trên khung lớn. */
  hint?: boolean;
}) {
  const fmt = el.fmt ?? {};
  const style: CSSProperties = {
    position: 'absolute',
    left: el.x,
    top: el.y,
    width: el.w,
    height: el.h,
    fontSize: fmt.size,
    fontWeight: fmt.bold ? 700 : 400,
    fontStyle: fmt.italic ? 'italic' : 'normal',
    color: fmt.color,
    textAlign: fmt.align,
  };
  const empty = !(el.text ?? '').trim();
  const showHint = hint && empty && el.role !== undefined;
  return (
    <div
      data-testid="ppt-el"
      data-x={el.x}
      data-y={el.y}
      data-w={el.w}
      data-h={el.h}
      data-el-id={el.id}
      data-role={el.role}
      className={`ppt-el${selected ? ' is-selected' : ''}`}
      style={style}
      onPointerDown={onPointerDown}
    >
      {el.kind === 'shape' ? (
        <div className="ppt-shape" data-shape={el.shape} style={{ background: fmt.fill }} />
      ) : null}
      {el.kind === 'image' ? <img src={el.src} alt={el.alt ?? ''} className="ppt-img" /> : null}
      {el.kind !== 'image' ? (
        <span className={showHint ? 'ppt-placeholder' : 'ppt-text'}>
          {showHint ? (PLACEHOLDER_VI[el.role as string] ?? 'Bấm để nhập nội dung') : el.text}
        </span>
      ) : null}
    </div>
  );
}

import { useEffect, useRef, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react';
import type { pptSim } from '@office-neko/shared';

/** Chữ mờ của chỗ dành sẵn khi chưa nhập gì. */
const PLACEHOLDER_VI: Record<string, string> = {
  title: 'Bấm để nhập tiêu đề',
  body: 'Bấm để nhập nội dung',
  body2: 'Bấm để nhập nội dung',
};

/** Tám tay nắm: bốn góc và bốn cạnh, kèm con trỏ đúng hướng. */
const HANDLES: { h: pptSim.Handle; style: CSSProperties; cursor: string }[] = [
  { h: 'nw', style: { left: 0, top: 0 }, cursor: 'nwse-resize' },
  { h: 'n', style: { left: '50%', top: 0 }, cursor: 'ns-resize' },
  { h: 'ne', style: { left: '100%', top: 0 }, cursor: 'nesw-resize' },
  { h: 'e', style: { left: '100%', top: '50%' }, cursor: 'ew-resize' },
  { h: 'se', style: { left: '100%', top: '100%' }, cursor: 'nwse-resize' },
  { h: 's', style: { left: '50%', top: '100%' }, cursor: 'ns-resize' },
  { h: 'sw', style: { left: 0, top: '100%' }, cursor: 'nesw-resize' },
  { h: 'w', style: { left: 0, top: '50%' }, cursor: 'ew-resize' },
];

/** Vẽ một đối tượng theo px của khung gốc 960x540; khung cha lo việc co giãn. */
export function ElementView({
  el,
  theme,
  selected,
  hint = true,
  editing = false,
  onStartDrag,
  onDoubleClick,
  onText,
  onCommit,
  onCancel,
}: {
  el: pptSim.El;
  /** Màu chữ mặc định và kiểu chữ lấy từ theme; chỉ `fmt.color` đặt tay mới ghi đè. */
  theme: pptSim.PptTheme;
  selected: boolean;
  /** Thumbnail đặt `false`: chữ mờ "Bấm để nhập…" chỉ có nghĩa trên khung lớn. */
  hint?: boolean;
  editing?: boolean;
  onStartDrag?: (handle: pptSim.Handle | 'move', e: ReactPointerEvent) => void;
  onDoubleClick?: () => void;
  onText?: (text: string) => void;
  onCommit?: () => void;
  onCancel?: () => void;
}) {
  const fmt = el.fmt ?? {};
  const box = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (editing) box.current?.focus();
  }, [editing]);

  const style: CSSProperties = {
    position: 'absolute',
    left: el.x,
    top: el.y,
    width: el.w,
    height: el.h,
    fontSize: fmt.size,
    fontWeight: fmt.bold ? 700 : 400,
    fontStyle: fmt.italic ? 'italic' : 'normal',
    color: fmt.color ?? (el.role === 'title' ? theme.accent : theme.fg),
    fontFamily: theme.font,
    textAlign: fmt.align,
  };
  const empty = !(el.text ?? '').trim();
  const showHint = hint && empty && el.role !== undefined && !editing;
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
      onPointerDown={(e) => onStartDrag?.('move', e)}
      onDoubleClick={onDoubleClick}
    >
      {el.kind === 'shape' ? (
        <div className="ppt-shape" data-shape={el.shape} style={{ background: fmt.fill }} />
      ) : null}
      {el.kind === 'image' ? <img src={el.src} alt={el.alt ?? ''} draggable={false} className="ppt-img" /> : null}
      {editing && el.kind !== 'image' ? (
        <textarea
          ref={box}
          aria-label="Nội dung đối tượng"
          className="ppt-edit"
          value={el.text ?? ''}
          style={{ fontSize: fmt.size, textAlign: fmt.align, fontWeight: fmt.bold ? 700 : 400, color: 'inherit', fontFamily: 'inherit' }}
          onPointerDown={(e) => e.stopPropagation()}
          onChange={(e) => onText?.(e.target.value)}
          onBlur={() => onCommit?.()}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              onCommit?.();
            } else if (e.key === 'Escape') {
              e.preventDefault();
              onCancel?.();
            }
          }}
        />
      ) : null}
      {!editing && el.kind !== 'image' ? (
        <span className={showHint ? 'ppt-placeholder' : 'ppt-text'}>
          {showHint ? (PLACEHOLDER_VI[el.role as string] ?? 'Bấm để nhập nội dung') : el.text}
        </span>
      ) : null}
      {selected
        ? HANDLES.map(({ h, style: pos, cursor }) => (
            <span
              key={h}
              data-testid="ppt-handle"
              data-handle={h}
              aria-hidden="true"
              className="ppt-handle"
              style={{ ...pos, cursor }}
              onPointerDown={(e) => onStartDrag?.(h, e)}
            />
          ))
        : null}
    </div>
  );
}

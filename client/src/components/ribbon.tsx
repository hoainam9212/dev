import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { nativeTitle } from '../help/nativeTitle';

/**
 * `office`: nhóm đã được làm giống Office thật (nút phẳng, vuông, tên nhóm tiếng Anh như ảnh chụp),
 * để người học mở phần mềm thật vẫn nhận ra. Mặc định là kiểu cũ của app.
 */
export type RibbonVariant = 'app' | 'office';

/** Nhóm nút có nhãn ở dưới, đúng như ribbon Word trong app. Excel và PowerPoint dùng chung. */
export function Group({ title, variant = 'app', children }: { title: string; variant?: RibbonVariant; children: ReactNode }) {
  if (variant === 'office') {
    return (
      <div data-variant="office" className="flex flex-col gap-0.5 border-r border-neutral-300 px-2 last:border-r-0">
        <div className="flex flex-col gap-1">{children}</div>
        <span className="text-center text-[0.7rem] text-neutral-600">{title}</span>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-1 border-r border-peach/40 px-3 last:border-r-0">
      <div className="flex flex-wrap items-center gap-1">{children}</div>
      <span className="text-center text-[0.65rem] font-bold text-muted">{title}</span>
    </div>
  );
}

/** Một hàng nút trong nhóm `office` (Word xếp nhóm Font thành hai hàng). */
export function Row({ children }: { children: ReactNode }) {
  return <div className="flex items-center gap-0.5">{children}</div>;
}

/** Nút vuông nhỏ mang một ký hiệu, không phải cả câu tiếng Việt. Câu chữ nằm ở tooltip. */
export function ToolButton({
  helpId,
  label,
  tooltip,
  variant = 'app',
  pressed,
  disabled,
  onClick,
  children,
}: {
  helpId: string;
  label: string;
  /** Chữ hiện khi rê chuột; mặc định bằng `label`. */
  tooltip?: string;
  variant?: RibbonVariant;
  pressed?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  const look =
    variant === 'office'
      ? `h-7 min-w-7 rounded-sm px-1 text-neutral-800 ${pressed ? 'border border-neutral-400 bg-neutral-300' : 'border border-transparent hover:bg-neutral-200'}`
      : `h-8 min-w-8 rounded-lg px-2 font-bold ${pressed ? 'bg-rose/25 ring-2 ring-rose' : 'bg-white hover:bg-cream'}`;
  return (
    <button
      type="button"
      aria-label={label}
      title={nativeTitle(helpId, tooltip ?? label)}
      data-help-id={helpId}
      aria-pressed={pressed ?? false}
      disabled={disabled}
      // Giữ vùng chọn khi bấm nút, nếu không định dạng không biết áp vào đâu.
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`grid place-items-center text-sm transition disabled:cursor-not-allowed disabled:opacity-40 ${look}`}
    >
      {children}
    </button>
  );
}

export function Picker({
  helpId,
  label,
  tooltip,
  variant = 'app',
  value,
  options,
  onChange,
  style,
}: {
  helpId: string;
  label: string;
  tooltip?: string;
  variant?: RibbonVariant;
  value: string;
  options: { value: string; label: string; style?: CSSProperties }[];
  onChange: (value: string) => void;
  style?: CSSProperties;
}) {
  return (
    <select
      aria-label={label}
      title={nativeTitle(helpId, tooltip ?? label)}
      data-help-id={helpId}
      value={value}
      style={style}
      // KHÔNG chặn mousedown ở đây như ToolButton: với <select>, chặn là Chrome không mở danh sách.
      // Vùng chọn nằm trong state của trình mô phỏng nên mất focus cũng không sao.
      onChange={(e) => onChange(e.target.value)}
      className={
        variant === 'office'
          ? 'h-6 rounded-none border border-neutral-400 bg-white px-1 text-[0.8rem] text-neutral-800'
          : 'h-8 rounded-lg border-2 border-peach/50 bg-white px-2 text-sm font-semibold'
      }
    >
      {options.map((o) => (
        <option key={o.value} value={o.value} style={o.style}>{o.label}</option>
      ))}
    </select>
  );
}

/**
 * Nút mở một bảng chọn thả xuống (Layout, Shapes, màu chữ…), dùng khi mỗi mục cần
 * hình xem trước nên `<select>` không đủ. Bảng thả xuống định vị tuyệt đối dưới nút:
 * **đừng đặt nó trong khung `overflow-x: auto`** — khung đó cắt cả chiều dọc (lỗi 4B).
 */
export function MenuButton({
  helpId,
  label,
  disabled,
  button,
  items,
  onPick,
}: {
  helpId: string;
  label: string;
  disabled?: boolean;
  button: ReactNode;
  items: { value: string; label: string; content: ReactNode }[];
  onPick: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const away = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('pointerdown', away);
    document.addEventListener('keydown', esc);
    return () => {
      document.removeEventListener('pointerdown', away);
      document.removeEventListener('keydown', esc);
    };
  }, [open]);

  return (
    <div ref={root} className="relative">
      <ToolButton helpId={helpId} label={label} pressed={open} disabled={disabled} onClick={() => setOpen((o) => !o)}>
        <span className="flex items-center gap-1">
          {button}
          <span className="text-[0.6rem]">▾</span>
        </span>
      </ToolButton>
      {open ? (
        <div role="menu" aria-label={label} className="ribbon-menu">
          {items.map((it) => (
            <button
              key={it.value}
              type="button"
              aria-label={it.label}
              title={it.label}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                setOpen(false);
                onPick(it.value);
              }}
              className="ribbon-menu-item"
            >
              {it.content}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

/** Tab chưa làm tới: nói thẳng là phần sau mới có, thay vì một ribbon trống. */
export function SoonTab({ what }: { what: string }) {
  return <p className="ribbon-soon">{what} sẽ có ở phần sau của khoá học nhé!</p>;
}

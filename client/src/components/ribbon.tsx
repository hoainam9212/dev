import { useEffect, useRef, useState, type ReactNode } from 'react';

/** Nhóm nút có nhãn ở dưới, đúng như ribbon Word trong app. Excel và PowerPoint dùng chung. */
export function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1 border-r border-peach/40 px-3 last:border-r-0">
      <div className="flex flex-wrap items-center gap-1">{children}</div>
      <span className="text-center text-[0.65rem] font-bold text-muted">{title}</span>
    </div>
  );
}

/** Nút vuông nhỏ mang một ký hiệu, không phải cả câu tiếng Việt. Câu chữ nằm ở tooltip. */
export function ToolButton({
  helpId,
  label,
  pressed,
  disabled,
  onClick,
  children,
}: {
  helpId: string;
  label: string;
  pressed?: boolean;
  disabled?: boolean;
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
      disabled={disabled}
      // Giữ vùng chọn khi bấm nút, nếu không định dạng không biết áp vào đâu.
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`grid h-8 min-w-8 place-items-center rounded-lg px-2 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-40 ${
        pressed ? 'bg-rose/25 ring-2 ring-rose' : 'bg-white hover:bg-cream'
      }`}
    >
      {children}
    </button>
  );
}

export function Picker({
  helpId,
  label,
  value,
  options,
  onChange,
}: {
  helpId: string;
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <select
      aria-label={label}
      title={label}
      data-help-id={helpId}
      value={value}
      onMouseDown={(e) => e.preventDefault()}
      onChange={(e) => onChange(e.target.value)}
      className="h-8 rounded-lg border-2 border-peach/50 bg-white px-2 text-sm font-semibold"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
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
        {button} <span className="ml-0.5 text-[0.6rem]">▾</span>
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

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
      <div data-variant="office" className="flex flex-col justify-between gap-0.5 border-r border-neutral-300 px-2 last:border-r-0">
        <div className="flex flex-1 flex-col justify-center gap-1">{children}</div>
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
  large,
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
  /** Nút lớn của `office`: icon to ở trên, tên ở dưới (Table, Pictures, Table of Contents…). */
  large?: boolean;
  pressed?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  const officeState = pressed ? 'border border-neutral-400 bg-neutral-300' : 'border border-transparent hover:bg-neutral-200';
  const look =
    variant === 'office'
      ? `${large ? 'min-h-16 flex-col gap-0.5 px-2 py-1 text-[0.72rem] leading-tight [&>svg]:h-8 [&>svg]:w-8' : 'h-7 min-w-7 px-1'} rounded-sm text-neutral-800 ${officeState}`
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
  variant,
  large,
  disabled,
  button,
  items,
  onPick,
}: {
  helpId: string;
  label: string;
  variant?: RibbonVariant;
  /** Nút lớn kiểu Office: `button` là icon + dòng chữ (tự ghi "▾"), xếp dọc như AutoSum, Arrange. */
  large?: boolean;
  disabled?: boolean;
  button: ReactNode;
  items: MenuItem[];
  onPick: (value: string) => void;
}) {
  const { open, setOpen, root } = useDropdown();

  return (
    <div ref={root} className="relative">
      <ToolButton helpId={helpId} label={label} variant={variant} large={large} pressed={open} disabled={disabled} onClick={() => setOpen((o) => !o)}>
        {large ? (
          button
        ) : (
          <span className="flex items-center gap-1">
            {button}
            <span className="text-[0.6rem]">▾</span>
          </span>
        )}
      </ToolButton>
      {open ? <DropdownMenu label={label} items={items} onPick={onPick} close={() => setOpen(false)} /> : null}
    </div>
  );
}

type MenuItem = { value: string; label: string; content: ReactNode };

/** Mở/đóng một bảng thả xuống: đóng khi bấm ra ngoài `root` hoặc nhấn Esc. */
function useDropdown() {
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

  return { open, setOpen, root };
}

/** Bảng thả xuống dùng chung của `MenuButton` và `SplitButton`. */
function DropdownMenu({ label, items, onPick, close }: { label: string; items: MenuItem[]; onPick: (value: string) => void; close: () => void }) {
  return (
    <div role="menu" aria-label={label} className="ribbon-menu">
      {items.map((it) => (
        <button
          key={it.value}
          type="button"
          aria-label={it.label}
          title={it.label}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            close();
            onPick(it.value);
          }}
          className="ribbon-menu-item"
        >
          {it.content}
        </button>
      ))}
    </div>
  );
}

/**
 * Nút lớn tách đôi như New Slide của Office: nửa trên (icon to) làm việc chính,
 * nửa dưới ("New Slide ▾") mở menu.
 */
export function SplitButton({
  helpId,
  label,
  menuLabel,
  icon,
  text,
  disabled,
  onClick,
  items,
  onPick,
}: {
  helpId: string;
  label: string;
  menuLabel: string;
  icon: ReactNode;
  text: string;
  disabled?: boolean;
  onClick: () => void;
  items: MenuItem[];
  onPick: (value: string) => void;
}) {
  const { open, setOpen, root } = useDropdown();

  return (
    // Nửa trên chỉ có icon nên thấp hơn nút lớn thường (min-h-16): hai nửa cộng lại vẫn vừa
    // chiều cao ribbon, thẻ Home không cao hơn các thẻ khác.
    <div ref={root} className="relative flex flex-col items-stretch [&>button:first-child]:min-h-10">
      <ToolButton helpId={helpId} label={label} variant="office" large disabled={disabled} onClick={onClick}>
        {icon}
      </ToolButton>
      <ToolButton helpId={helpId} label={menuLabel} variant="office" pressed={open} disabled={disabled} onClick={() => setOpen((o) => !o)}>
        <span className="whitespace-nowrap text-[0.72rem]">{text} ▾</span>
      </ToolButton>
      {open ? <DropdownMenu label={menuLabel} items={items} onPick={onPick} close={() => setOpen(false)} /> : null}
    </div>
  );
}

export type RibbonApp = 'word' | 'excel' | 'ppt';

/** Màu nhấn của từng app như Office thật: gạch chân thẻ đang mở và chữ thẻ ngữ cảnh. */
export const RIBBON_ACCENT: Record<RibbonApp, string> = { word: '#185ABD', excel: '#107C41', ppt: '#C43E1C' };

/**
 * Thanh thẻ kiểu Office, ba app dùng chung. Màu gắn bằng `style` vì Tailwind không sinh lớp
 * từ chuỗi ghép lúc chạy. Chặn mousedown để bấm thẻ không cướp vùng chọn trong trang/ô.
 */
export function RibbonTabs<T extends string>({
  app,
  tabs,
  contextTabs = [],
  active,
  onPick,
}: {
  app: RibbonApp;
  tabs: readonly T[];
  contextTabs?: readonly T[];
  active: T;
  onPick: (t: T) => void;
}) {
  const accent = RIBBON_ACCENT[app];
  return (
    <div role="tablist" aria-label="Thanh công cụ" className="flex flex-wrap gap-0.5 border-b border-neutral-300">
      {[...tabs, ...contextTabs].map((name) => {
        const open = active === name;
        const ctx = contextTabs.includes(name);
        return (
          <button
            key={name}
            type="button"
            role="tab"
            aria-selected={open}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => onPick(name)}
            style={open ? { color: accent, borderColor: accent } : ctx ? { color: accent } : undefined}
            className={`-mb-px border-b-[3px] px-3 py-1 text-sm transition ${
              open ? 'font-semibold' : `border-transparent hover:bg-neutral-100 ${ctx ? '' : 'text-neutral-700'}`
            }`}
          >
            {name}
          </button>
        );
      })}
    </div>
  );
}

/**
 * Khung nội dung thẻ, cao tối thiểu 108px: đổi thẻ thì phần bên dưới không nhảy lên nhảy xuống.
 * 108 chứ không 96 vì nút lớn nhãn hai dòng (Lookup & Reference ▾ của Excel) cao hơn 96px.
 */
export function RibbonPanel({ children }: { children: ReactNode }) {
  return <div className="flex min-h-[6.75rem] flex-col [&>*]:flex-1">{children}</div>;
}

/** Thẻ ngữ cảnh vừa biến mất (xoá ảnh/bảng) thì quay về `fallback`, như Office. */
export function activeTab<T extends string>(picked: T, context: readonly T[], visible: readonly T[], fallback: T): T {
  return context.includes(picked) && !visible.includes(picked) ? fallback : picked;
}

/** Icon có vạch màu bên dưới, như chữ A đỏ của Font Color và bút vàng của Highlight trên Office thật. */
export function Swatched({ icon, color }: { icon: ReactNode; color: string }) {
  return (
    <span className="flex flex-col items-center leading-none">
      {icon}
      <span className="-mt-0.5 h-1 w-4" style={{ background: color }} />
    </span>
  );
}

/** Icon nhỏ kèm chữ bên phải, như Replace, Update Table, Insert Below. */
export function Labeled({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <span className="flex items-center gap-1 text-[0.75rem]">
      {icon} {text}
    </span>
  );
}

/** Tab chưa làm tới: nói thẳng là phần sau mới có, thay vì một ribbon trống. */
export function SoonTab({ what }: { what: string }) {
  return <p className="ribbon-soon">{what} sẽ có ở phần sau của khoá học nhé!</p>;
}

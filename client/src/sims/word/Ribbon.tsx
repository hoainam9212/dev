import { useEffect, useRef, useState, type ReactNode } from 'react';
import type { wordSim } from '@office-neko/shared';
import {
  ArrowSync20Regular,
  DocumentBulletList20Regular,
  Image20Regular,
  Print20Regular,
  Resize20Regular,
  Save20Regular,
  Table20Regular,
  TableDeleteColumn20Regular,
  TableDeleteRow20Regular,
  TableInsertColumn20Regular,
  TableInsertRow20Regular,
} from '@fluentui/react-icons';
import { activeTab, Group, Labeled, RibbonPanel, RibbonTabs, Row, SoonTab, ToolButton } from '../../components/ribbon';
import { RibbonHome } from './RibbonHome';

export { WordDialogs } from './dialogs';

interface Props {
  state: wordSim.WordState;
  dispatch: (a: wordSim.WordAction) => void;
}

const TABS = ['File', 'Home', 'Insert', 'Layout', 'References', 'View'] as const;
/** Thẻ ngữ cảnh: Word chỉ hiện khi tài liệu có ảnh / có bảng. */
const CONTEXT_TABS = ['Picture Format', 'Table Layout'] as const;
type Tab = (typeof TABS)[number] | (typeof CONTEXT_TABS)[number];

const GRID_ROWS = 6;
const GRID_COLS = 8;

/** Tài liệu có nút loại `type` (ảnh, bảng) không — để bật thẻ ngữ cảnh như Word. */
function hasNode(node: unknown, type: string): boolean {
  if (!node || typeof node !== 'object') return false;
  const n = node as { type?: string; content?: unknown[] };
  return n.type === type || (n.content ?? []).some((c) => hasNode(c, type));
}

/**
 * Insert › Table như Word: bấm nút mở lưới ô vuông, rê chuột tô vùng, bấm ô thứ (hàng, cột) là
 * chèn bảng đúng cỡ đó. Menu đặt ngoài mọi khung `overflow` (lỗi 4B).
 */
function TableGrid({ onPick }: { onPick: (rows: number, cols: number) => void }) {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState<[number, number]>([0, 0]);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const away = (e: PointerEvent) => !root.current?.contains(e.target as Node) && setOpen(false);
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
      <ToolButton variant="office" large helpId="word.table" label="Chèn bảng" pressed={open} onClick={() => setOpen((o) => !o)}>
        <Table20Regular />
        <span>Table ▾</span>
      </ToolButton>
      {open ? (
        <div role="menu" aria-label="Chọn cỡ bảng" className="absolute left-0 top-full z-30 mt-1 rounded-sm border border-neutral-300 bg-white p-2 shadow-lg">
          <p className="mb-1 text-xs font-semibold text-neutral-700">
            {/* Word ghi "3x2 Table" (cột trước), còn đề bài nói "3 hàng × 2 cột": ghi rõ chữ để khỏi ngược. */}
            {hover[0] ? `${hover[0]} hàng × ${hover[1]} cột` : 'Insert Table'}
          </p>
          <div className="grid gap-0.5" style={{ gridTemplateColumns: `repeat(${GRID_COLS}, 1rem)` }} onMouseLeave={() => setHover([0, 0])}>
            {Array.from({ length: GRID_ROWS * GRID_COLS }, (_, i) => {
              const r = Math.floor(i / GRID_COLS) + 1;
              const c = (i % GRID_COLS) + 1;
              const lit = r <= hover[0] && c <= hover[1];
              return (
                <button
                  key={i}
                  type="button"
                  aria-label={`Bảng ${r} hàng × ${c} cột`}
                  onMouseDown={(e) => e.preventDefault()}
                  onMouseEnter={() => setHover([r, c])}
                  onFocus={() => setHover([r, c])}
                  onClick={() => {
                    setOpen(false);
                    onPick(r, c);
                  }}
                  className={`h-4 w-4 border ${lit ? 'border-orange-500 bg-orange-100' : 'border-neutral-400 bg-white'}`}
                />
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

/**
 * Tab đang mở là trạng thái giao diện thuần tuý nên được phép nằm ngoài reducer;
 * mọi thứ làm ĐỔI TÀI LIỆU vẫn phải đi qua `dispatch`.
 */
export function Ribbon({ state, dispatch }: Props) {
  const [picked, setTab] = useState<Tab>('Home');
  const context = CONTEXT_TABS.filter((t) => hasNode(state.doc, t === 'Picture Format' ? 'image' : 'table'));
  const tab = activeTab<Tab>(picked, CONTEXT_TABS, context, 'Home');

  return (
    <div className="space-y-1">
      <RibbonTabs app="word" tabs={TABS} contextTabs={context} active={tab} onPick={setTab} />

      <RibbonPanel>
      {tab === 'Home' && <RibbonHome state={state} dispatch={dispatch} />}

      {tab === 'File' && (
        <div className="flex flex-wrap items-stretch py-1">
          <Group title="File" variant="office">
            <Row>
              <ToolButton variant="office" large helpId="word.save" label="Lưu văn bản" onClick={() => dispatch({ type: 'openDialog', dialog: 'save' })}>
                <Save20Regular />
                <span>Save As</span>
              </ToolButton>
              <ToolButton variant="office" large helpId="word.print" label="In thử" onClick={() => dispatch({ type: 'openDialog', dialog: 'print' })}>
                <Print20Regular />
                <span>Print</span>
              </ToolButton>
            </Row>
          </Group>
        </div>
      )}

      {tab === 'Insert' && (
        <div className="flex flex-wrap items-stretch py-1">
          <Group title="Tables" variant="office">
            <TableGrid onPick={(rows, cols) => dispatch({ type: 'insertTable', rows, cols })} />
          </Group>
          <Group title="Illustrations" variant="office">
            <ToolButton variant="office" large helpId="word.image" label="Chèn ảnh" onClick={() => dispatch({ type: 'openDialog', dialog: 'image' })}>
              <Image20Regular />
              <span>Pictures</span>
            </ToolButton>
          </Group>
        </div>
      )}

      {tab === 'References' && (
        <div className="flex flex-wrap items-stretch py-1">
          <Group title="Table of Contents" variant="office">
            <Row>
              <ToolButton variant="office" large helpId="word.toc" label="Chèn mục lục" onClick={() => dispatch({ type: 'insertToc' })}>
                <DocumentBulletList20Regular />
                <span>Table of Contents</span>
              </ToolButton>
              <ToolButton variant="office" helpId="word.tocRefresh" label="Cập nhật mục lục" onClick={() => dispatch({ type: 'refreshToc' })}>
                <Labeled icon={<ArrowSync20Regular />} text="Update Table" />
              </ToolButton>
            </Row>
          </Group>
        </div>
      )}

      {tab === 'Picture Format' && (
        <div className="flex flex-wrap items-stretch py-1">
          <Group title="Size" variant="office">
            <Row>
              <Resize20Regular aria-hidden />
              {(['25%', '40%', '60%', '100%'] as const).map((width) => (
                <ToolButton key={width} variant="office" helpId="word.imageWidth" label={`Độ rộng ảnh ${width}`} onClick={() => dispatch({ type: 'setImageWidth', width })}>
                  <span className="text-[0.75rem]">{width}</span>
                </ToolButton>
              ))}
            </Row>
          </Group>
        </div>
      )}

      {tab === 'Table Layout' && (
        <div className="flex flex-wrap items-stretch py-1">
          <Group title="Rows & Columns" variant="office">
            <Row>
              <ToolButton variant="office" helpId="word.rowAdd" label="Thêm hàng" onClick={() => dispatch({ type: 'tableRow', op: 'add' })}>
                <Labeled icon={<TableInsertRow20Regular />} text="Insert Below" />
              </ToolButton>
              <ToolButton variant="office" helpId="word.colAdd" label="Thêm cột" onClick={() => dispatch({ type: 'tableCol', op: 'add' })}>
                <Labeled icon={<TableInsertColumn20Regular />} text="Insert Right" />
              </ToolButton>
            </Row>
            <Row>
              <ToolButton variant="office" helpId="word.rowRemove" label="Xoá hàng" onClick={() => dispatch({ type: 'tableRow', op: 'remove' })}>
                <Labeled icon={<TableDeleteRow20Regular />} text="Delete Rows" />
              </ToolButton>
              <ToolButton variant="office" helpId="word.colRemove" label="Xoá cột" onClick={() => dispatch({ type: 'tableCol', op: 'remove' })}>
                <Labeled icon={<TableDeleteColumn20Regular />} text="Delete Columns" />
              </ToolButton>
            </Row>
          </Group>
        </div>
      )}

      {tab === 'Layout' && <SoonTab what="Thẻ Layout (lề trang, khổ giấy)" />}
      {tab === 'View' && <SoonTab what="Thẻ View (chế độ xem)" />}
      </RibbonPanel>
    </div>
  );
}

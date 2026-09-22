import {
  MAX_COLS,
  MAX_ROWS,
  colToName,
  displayValue,
  evaluateCell,
  newContext,
  parseRange,
  parseRef,
  type CellFormat,
  type CellSource,
  type CellValue,
  type Range,
} from '../../formula';
import { reduceEdit } from './edit';
import { reduceFormat } from './format';
import { reduceTable } from './table';

export interface Cell {
  /** Đúng chữ người dùng gõ: "120000", "=SUM(B2:B5)", "Nguyễn Văn A". */
  raw: string;
  fmt?: CellFormat;
}

export interface Chart {
  id: string;
  type: 'bar' | 'column' | 'line' | 'pie';
  range: string;
  title: string;
}

export interface Sheet {
  name: string;
  /** Thưa: chỉ ô có nội dung. Khoá "r,c", đếm từ 0. */
  cells: Record<string, Cell>;
  colWidths?: Record<number, number>;
  merges?: Range[];
  filter?: { range: Range; conditions: Record<number, string[]> } | null;
  charts?: Chart[];
}

export interface WorkbookState {
  sheets: Sheet[];
  active: number;
  /** Vùng chọn; ô neo là `sel.from`. */
  sel: Range;
  /** Chữ đang gõ, `null` khi không sửa. */
  editing: string | null;
  /** Mốc thời gian cho TODAY(); reducer không bao giờ gọi Date.now(). */
  now: number;
  /** Clipboard nằm TRONG state (không dùng clipboard hệ điều hành) để reducer vẫn thuần. */
  clipboard: { origin: { row: number; col: number }; cells: { dRow: number; dCol: number; cell: Cell }[] } | null;
  /** Lưu và In là MÔ PHỎNG: chỉ ghi lại là đã bấm, không tạo tệp thật. */
  saved: { name: string; at: number } | null;
  printed: boolean;
  dialog: ExcelDialog;
  past: Sheet[][];
}

export type ExcelDialog = 'save' | 'print' | null;

export type ExcelAction =
  | { type: 'select'; cell: string }
  | { type: 'selectRange'; range: string }
  | { type: 'moveSel'; dRow: number; dCol: number; extend?: boolean }
  | { type: 'startEdit'; text?: string }
  | { type: 'setRaw'; text: string }
  | { type: 'commitEdit'; move?: 'down' | 'right' | 'none' }
  | { type: 'cancelEdit' }
  | { type: 'setCell'; cell: string; raw: string }
  | { type: 'clear' }
  | { type: 'copy' }
  | { type: 'paste' }
  | { type: 'fillDown' }
  | { type: 'fillRight' }
  | { type: 'setFormat'; fmt: Partial<CellFormat> }
  | { type: 'clearFormat' }
  | { type: 'merge' }
  | { type: 'setColWidth'; col: string; px: number }
  | { type: 'addSheet'; name?: string }
  | { type: 'renameSheet'; index: number; name: string }
  | { type: 'switchSheet'; index: number }
  | { type: 'save'; name: string; at: number }
  | { type: 'print' }
  | { type: 'sortRange'; range: string; by: string; dir: 'asc' | 'desc'; header?: boolean }
  | { type: 'openDialog'; dialog: ExcelDialog }
  | { type: 'undo' };

const MAX_UNDO = 30;

export const cellKey = (row: number, col: number): string => `${row},${col}`;

const point = (row: number, col: number): Range => ({ from: { row, col }, to: { row, col } });

export function excelInitial(o?: { cells?: Record<string, string>; sheets?: string[]; now?: number }): WorkbookState {
  const names = o?.sheets ?? ['Sheet1'];
  const cells: Record<string, Cell> = {};
  for (const [name, raw] of Object.entries(o?.cells ?? {})) {
    const ref = parseRef(name);
    if (ref) cells[cellKey(ref.row, ref.col)] = { raw };
  }
  const sheets: Sheet[] = names.map((name, i) => ({ name, cells: i === 0 ? cells : {}, charts: [] }));
  return {
    sheets,
    active: 0,
    sel: point(0, 0),
    editing: null,
    now: o?.now ?? 0,
    clipboard: null,
    saved: null,
    printed: false,
    dialog: null,
    past: [],
  };
}

export function activeSheet(s: WorkbookState): Sheet {
  return s.sheets[s.active]!;
}

/** Nguồn ô cho trình tính; tra sheet theo TÊN, không theo chỉ số. */
export function sourceOf(s: WorkbookState): CellSource {
  return {
    raw(sheetName, row, col) {
      const sheet = s.sheets.find((x) => x.name === sheetName);
      return sheet?.cells[cellKey(row, col)]?.raw ?? null;
    },
  };
}

/**
 * Ngữ cảnh MỚI mỗi lần hỏi: memo không được sống qua các lần sửa, kẻo ô hiện số
 * cũ. Lưới chỉ 1.300 ô nên tính lại là chuyện nhỏ (xem spec mục 2.2).
 */
function contextOf(s: WorkbookState) {
  return newContext(sourceOf(s), activeSheet(s).name, s.now);
}

function refOf(s: WorkbookState, cell: string): { sheet: string; row: number; col: number } | null {
  const ref = parseRef(cell);
  if (!ref) return null;
  return { sheet: ref.sheet ?? activeSheet(s).name, row: ref.row, col: ref.col };
}

export function cellRaw(s: WorkbookState, cell: string): string {
  const at = refOf(s, cell);
  if (!at) return '';
  const sheet = s.sheets.find((x) => x.name === at.sheet);
  return sheet?.cells[cellKey(at.row, at.col)]?.raw ?? '';
}

export function cellValue(s: WorkbookState, cell: string): CellValue {
  const at = refOf(s, cell);
  if (!at) return '';
  return evaluateCell(contextOf(s), at.sheet, at.row, at.col);
}

export function formatOf(s: WorkbookState, cell: string): CellFormat {
  const at = refOf(s, cell);
  if (!at) return {};
  const sheet = s.sheets.find((x) => x.name === at.sheet);
  return sheet?.cells[cellKey(at.row, at.col)]?.fmt ?? {};
}

export function cellText(s: WorkbookState, cell: string): string {
  return displayValue(cellValue(s, cell), formatOf(s, cell));
}

/** Cổng DUY NHẤT đẩy lịch sử hoàn tác. Task 7–8 dùng lại, đừng viết lại. */
export function withEdit(s: WorkbookState, edit: (sheet: Sheet) => Sheet): WorkbookState {
  const sheets = s.sheets.map((sheet, i) => (i === s.active ? edit(sheet) : sheet));
  return { ...s, sheets, past: [...s.past, s.sheets].slice(-MAX_UNDO) };
}

/** Sửa nhiều sheet cùng lúc (thêm sheet, đổi tên), vẫn hoàn tác được. */
export function withSheets(s: WorkbookState, edit: (sheets: Sheet[]) => Sheet[]): WorkbookState {
  return { ...s, sheets: edit(s.sheets), past: [...s.past, s.sheets].slice(-MAX_UNDO) };
}

export function setRawAt(sheet: Sheet, row: number, col: number, raw: string): Sheet {
  const k = cellKey(row, col);
  const old = sheet.cells[k];
  const cells = { ...sheet.cells, [k]: { ...old, raw } };
  return { ...sheet, cells };
}

const clampRow = (n: number) => Math.max(0, Math.min(MAX_ROWS - 1, n));
const clampCol = (n: number) => Math.max(0, Math.min(MAX_COLS - 1, n));

export function reduceExcel(s: WorkbookState, a: ExcelAction): WorkbookState {
  switch (a.type) {
    case 'select': {
      const ref = parseRef(a.cell);
      if (!ref) return s;
      return { ...s, sel: point(ref.row, ref.col), editing: null };
    }
    case 'selectRange': {
      const range = parseRange(a.range);
      if (!range) return s;
      return { ...s, sel: { from: range.from, to: range.to }, editing: null };
    }
    case 'moveSel': {
      const anchor = s.sel.from;
      const row = clampRow((a.extend ? s.sel.to.row : anchor.row) + a.dRow);
      const col = clampCol((a.extend ? s.sel.to.col : anchor.col) + a.dCol);
      if (a.extend) return { ...s, sel: { from: anchor, to: { row, col } }, editing: null };
      return { ...s, sel: point(row, col), editing: null };
    }
    case 'startEdit':
      return { ...s, editing: a.text ?? cellRaw(s, refName(s.sel.from)) };
    case 'setRaw':
      return { ...s, editing: a.text };
    case 'cancelEdit':
      return { ...s, editing: null };
    case 'commitEdit': {
      if (s.editing === null) return s;
      const { row, col } = s.sel.from;
      const text = s.editing;
      const next = withEdit({ ...s, editing: null }, (sheet) => setRawAt(sheet, row, col, text));
      if (a.move === 'right') return { ...next, sel: point(row, clampCol(col + 1)) };
      if (a.move === 'none') return { ...next, sel: point(row, col) };
      return { ...next, sel: point(clampRow(row + 1), col) };
    }
    case 'setCell': {
      const ref = parseRef(a.cell);
      if (!ref) return s;
      return withEdit(s, (sheet) => setRawAt(sheet, ref.row, ref.col, a.raw));
    }
    case 'clear':
      return withEdit(s, (sheet) => {
        let next = sheet;
        for (const c of cellsIn(s.sel)) next = setRawAt(next, c.row, c.col, '');
        return next;
      });
    case 'save':
      // Không đi qua withEdit: lưu không sửa tài liệu nên không vào lịch sử hoàn tác.
      return { ...s, saved: { name: a.name, at: a.at }, dialog: null };
    case 'print':
      return { ...s, printed: true, dialog: null };
    case 'openDialog':
      return { ...s, dialog: a.dialog };
    case 'undo': {
      const prev = s.past[s.past.length - 1];
      if (!prev) return s;
      return { ...s, sheets: prev, past: s.past.slice(0, -1), editing: null };
    }
    default:
      // Import vòng với `edit.ts`/`format.ts` là CỐ Ý và an toàn: cả hai phía đều
      // là khai báo hàm, nên lúc gọi thì hai module đã nạp xong.
      return reduceEdit(s, a) ?? reduceFormat(s, a) ?? reduceTable(s, a) ?? s;
  }
}

export function cellsIn(sel: Range): { row: number; col: number }[] {
  const out: { row: number; col: number }[] = [];
  for (let row = Math.min(sel.from.row, sel.to.row); row <= Math.max(sel.from.row, sel.to.row); row++) {
    for (let col = Math.min(sel.from.col, sel.to.col); col <= Math.max(sel.from.col, sel.to.col); col++) {
      out.push({ row, col });
    }
  }
  return out;
}

export function refName(at: { row: number; col: number }): string {
  return `${colToName(at.col)}${at.row + 1}`;
}

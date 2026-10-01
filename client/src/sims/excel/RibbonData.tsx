import { excelSim, formula } from '@office-neko/shared';
import {
  ArrowSort20Regular,
  Filter20Regular,
  TextSortAscending20Regular,
  TextSortDescending20Regular,
} from '@fluentui/react-icons';
import { Group, Row, ToolButton } from '../../components/ribbon';

interface Props {
  state: excelSim.WorkbookState;
  dispatch: (a: excelSim.ExcelAction) => void;
}

function isSingle(s: excelSim.WorkbookState): boolean {
  return s.sel.from.row === s.sel.to.row && s.sel.from.col === s.sel.to.col;
}

/** Vùng đang chọn, viết dạng A1:C4, trên-trái trước dù người dùng kéo từ dưới lên. */
function selectedRange(s: excelSim.WorkbookState): string {
  const lo = { row: Math.min(s.sel.from.row, s.sel.to.row), col: Math.min(s.sel.from.col, s.sel.to.col) };
  const hi = { row: Math.max(s.sel.from.row, s.sel.to.row), col: Math.max(s.sel.from.col, s.sel.to.col) };
  return `${excelSim.refName(lo)}:${excelSim.refName(hi)}`;
}

/**
 * Vùng mà A→Z / Z→A / hộp thoại Sort sắp, và cột mặc định để sắp — như Excel thật:
 * chọn nhiều ô thì sắp đúng vùng đó theo cột của **ô neo** (ô bắt đầu kéo, kéo từ
 * C5 lên A2 vẫn là cột C); chỉ đứng một ô thì Excel tự lấy cả bảng quanh ô đó và
 * chừa hàng tiêu đề.
 */
export function sortTarget(s: excelSim.WorkbookState): { range: string; by: string } {
  const by = formula.colToName(s.sel.from.col);
  if (!isSingle(s)) return { range: selectedRange(s), by };
  return { range: excelSim.currentRegion(s, s.sel.from).range, by };
}

/** Vùng bật AutoFilter: vùng chọn, hoặc cả bảng quanh ô đang đứng (gồm hàng tiêu đề). */
function filterTarget(s: excelSim.WorkbookState): string {
  if (!isSingle(s)) return selectedRange(s);
  const region = excelSim.currentRegion(s, s.sel.from);
  const r = formula.parseRange(region.range)!;
  const top = region.header ? r.from.row - 1 : r.from.row;
  return `${excelSim.refName({ row: top, col: r.from.col })}:${excelSim.refName(r.to)}`;
}

export function RibbonData({ state, dispatch }: Props) {
  const filter = state.sheets[state.active]!.filter ?? null;
  const sort = (dir: 'asc' | 'desc') => dispatch({ type: 'sortRange', ...sortTarget(state), dir });

  return (
    <div className="flex flex-wrap items-stretch gap-y-2 py-1">
      <Group title="Sort & Filter" variant="office">
        <Row>
          <div className="flex flex-col justify-center gap-0.5">
            <ToolButton variant="office" helpId="excel.sortAsc" label="Sắp tăng dần" onClick={() => sort('asc')}>
              <TextSortAscending20Regular />
            </ToolButton>
            <ToolButton variant="office" helpId="excel.sortDesc" label="Sắp giảm dần" onClick={() => sort('desc')}>
              <TextSortDescending20Regular />
            </ToolButton>
          </div>
          <ToolButton
            variant="office"
            large
            helpId="excel.sort"
            label="Sắp xếp tuỳ chọn"
            onClick={() => dispatch({ type: 'openDialog', dialog: 'sort' })}
          >
            <ArrowSort20Regular />
            <span>Sort</span>
          </ToolButton>
          <ToolButton
            variant="office"
            large
            helpId="excel.filter"
            label="Bật tắt lọc"
            pressed={!!filter}
            onClick={() => dispatch(filter ? { type: 'disableFilter' } : { type: 'enableFilter', range: filterTarget(state) })}
          >
            <Filter20Regular />
            <span>Filter</span>
          </ToolButton>
        </Row>
      </Group>
    </div>
  );
}

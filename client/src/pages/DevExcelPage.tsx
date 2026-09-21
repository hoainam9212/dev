import { excelSim } from '@office-neko/shared';
import { ExcelSim } from '../sims/excel/ExcelSim';

/**
 * Trang thử tay bảng tính, KHÔNG có trong lộ trình. Task 12 phải xoá trang này
 * và route của nó khi bài học Excel đầu tiên ra đời.
 */
export function DevExcelPage() {
  const initial = excelSim.excelInitial({
    cells: { A1: 'Họ tên', B1: 'Lương', A2: 'Nguyễn Văn Nam', B2: '7500000', A3: 'Trần Thị Lan', B3: '6200000' },
    now: Date.now(),
  });
  return (
    <div className="space-y-3">
      <h1 className="text-lg font-bold">Thử bảng tính (trang tạm)</h1>
      <ExcelSim initial={initial} onState={() => {}} os="win" spotlight={null} />
    </div>
  );
}

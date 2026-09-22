import { excelSim } from '@office-neko/shared';
import { ExcelSim } from '../sims/excel/ExcelSim';

/**
 * Trang thử tay bảng tính, KHÔNG có trong lộ trình. Task 7 của giai đoạn 4B phải
 * xoá trang này và route của nó khi bài học về sắp xếp/lọc/biểu đồ ra đời.
 */
export function DevExcelPage() {
  const initial = excelSim.excelInitial({
    cells: {
      A1: 'Nhân viên', B1: 'Lương', C1: 'Phòng',
      A2: 'Nguyễn Văn Nam', B2: '7500000', C2: 'Kế toán',
      A3: 'Trần Thị Lan', B3: '6200000', C3: 'Kinh doanh',
      A4: 'Lê Minh Tú', B4: '8100000', C4: 'Kế toán',
      A5: 'Phạm Thu Hà', B5: '5500000', C5: 'Kinh doanh',
    },
    now: Date.now(),
  });
  return (
    <div className="space-y-3">
      <h1 className="text-lg font-bold">Thử bảng tính (trang tạm)</h1>
      <ExcelSim initial={initial} onState={() => {}} os="win" spotlight={null} />
    </div>
  );
}

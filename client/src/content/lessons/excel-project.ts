import type { Lesson } from '@office-neko/shared';
import { excelPractice } from '../lessonKit';

/**
 * Bảng lương 10 nhân viên. Hàng 1 là tiêu đề lớn, hàng 2 là tiêu đề cột,
 * hàng 3–12 là dữ liệu, hàng 13–14 là dòng tổng kết.
 * I1 là tỉ lệ phụ cấp dùng chung; J1:K3 là bảng tra xếp loại.
 */
const BANG = {
  A1: 'BẢNG LƯƠNG THÁNG 9',
  A2: 'Họ tên', B2: 'Phòng', C2: 'Lương cơ bản', D2: 'Mã loại', E2: 'Phụ cấp', F2: 'Xếp loại', G2: 'Thực lĩnh',
  A3: 'Nguyễn Văn Nam', B3: 'Kế toán', C3: '7500000', D3: 'A',
  A4: 'Trần Thị Lan', B4: 'Kinh doanh', C4: '6200000', D4: 'B',
  A5: 'Lê Minh Tú', B5: 'Kế toán', C5: '8100000', D5: 'A',
  A6: 'Phạm Thu Hà', B6: 'Kinh doanh', C6: '5500000', D6: 'C',
  A7: 'Hoàng Văn Đức', B7: 'Kế toán', C7: '6800000', D7: 'B',
  A8: 'Vũ Thị Mai', B8: 'Nhân sự', C8: '7200000', D8: 'A',
  A9: 'Đỗ Quang Huy', B9: 'Kinh doanh', C9: '5900000', D9: 'C',
  A10: 'Bùi Thị Ngọc', B10: 'Nhân sự', C10: '6500000', D10: 'B',
  A11: 'Ngô Văn Sơn', B11: 'Kế toán', C11: '9000000', D11: 'A',
  A12: 'Lý Thu Trang', B12: 'Kinh doanh', C12: '6000000', D12: 'B',
  A13: 'Tổng thực lĩnh',
  A14: 'Lương cơ bản trung bình',
  I1: '0.1',
  J1: 'A', K1: 'Giỏi',
  J2: 'B', K2: 'Khá',
  J3: 'C', K3: 'Trung bình',
};

/** Công thức của chặng 2, dùng lại làm dữ liệu đầu vào cho chặng 3. */
const CONG_THUC = {
  E3: '=C3*$I$1', E4: '=C4*$I$1', E5: '=C5*$I$1', E6: '=C6*$I$1', E7: '=C7*$I$1',
  E8: '=C8*$I$1', E9: '=C9*$I$1', E10: '=C10*$I$1', E11: '=C11*$I$1', E12: '=C12*$I$1',
  F3: '=VLOOKUP(D3,$J$1:$K$3,2,FALSE)', F4: '=VLOOKUP(D4,$J$1:$K$3,2,FALSE)',
  F5: '=VLOOKUP(D5,$J$1:$K$3,2,FALSE)', F6: '=VLOOKUP(D6,$J$1:$K$3,2,FALSE)',
  F7: '=VLOOKUP(D7,$J$1:$K$3,2,FALSE)', F8: '=VLOOKUP(D8,$J$1:$K$3,2,FALSE)',
  F9: '=VLOOKUP(D9,$J$1:$K$3,2,FALSE)', F10: '=VLOOKUP(D10,$J$1:$K$3,2,FALSE)',
  F11: '=VLOOKUP(D11,$J$1:$K$3,2,FALSE)', F12: '=VLOOKUP(D12,$J$1:$K$3,2,FALSE)',
  G3: '=C3+E3', G4: '=C4+E4', G5: '=C5+E5', G6: '=C6+E6', G7: '=C7+E7',
  G8: '=C8+E8', G9: '=C9+E9', G10: '=C10+E10', G11: '=C11+E11', G12: '=C12+E12',
  G13: '=SUM(G3:G12)',
  C14: '=AVERAGE(C3:C12)',
};

/** Bảng tổng hợp theo phòng, chặng 3 vẽ biểu đồ tròn từ đây. */
const TONG_HOP = {
  I4: 'Phòng', J4: 'Tổng thực lĩnh',
  I5: 'Kế toán', J5: '34540000',
  I6: 'Kinh doanh', J6: '25960000',
  I7: 'Nhân sự', J7: '15070000',
};

/** Định dạng đã làm ở chặng 1, dựng lại cho chặng sau khỏi phải làm lại. */
const dinhDangChang1 = (): { type: 'selectRange'; range: string }[] | never[] => [];

export const EXCEL_PROJECT: Lesson[] = [
  {
    id: 'excel.project',
    trackId: 'excel',
    chapterId: 'excel.final',
    title: 'Dự án: Bảng lương 10 nhân viên',
    minutes: 30,
    steps: [
      {
        kind: 'explain',
        mood: 'happy',
        body: 'Đây là bài cuối của lộ trình Excel, và là **việc thật** mà dân văn phòng làm hằng tháng. Bạn sẽ dựng một bảng lương cho 10 nhân viên, từ con số trần trụi tới bản báo cáo có biểu đồ.',
      },
      {
        kind: 'explain',
        body: 'Ba chặng: **trình bày cho dễ đọc** → **tính toán bằng công thức** → **sắp xếp, lọc và vẽ biểu đồ**. Làm xong chặng nào Mochi chấm chặng đó, không phải làm lại từ đầu.',
      },
      excelPractice({
        cells: BANG,
        task: 'Chặng 1 — trình bày. Gộp ô **A1:G1** cho tiêu đề nằm giữa bảng, làm hàng tiêu đề **A2:G2** in đậm và có màu nền, rồi định dạng cột lương **C3:C12** thành **Currency (₫)**.',
        checks: [
          { kind: 'merged', range: 'A1:G1' },
          { kind: 'cellFormat', cell: 'A2', fmt: { bold: true } },
          { kind: 'cellFormat', cell: 'G2', fmt: { bold: true } },
          { kind: 'cellFormat', cell: 'C3', fmt: { numFmt: 'currencyVnd' } },
          { kind: 'cellFormat', cell: 'C12', fmt: { numFmt: 'currencyVnd' } },
        ],
        spotlight: { helpId: 'excel.merge' },
        hint: 'Mọi nút đều ở thẻ Home. Chọn A1:G1 rồi bấm Merge & Center. Chọn A2:G2 bấm B và chọn Fill Color. Chọn C3:C12 rồi mở ô Number Format chọn Currency (₫).',
        steps: [
          'Bấm ô A1, giữ Shift bấm ô G1, rồi ở thẻ Home › nhóm Alignment bấm Merge & Center.',
          'Bấm ô A2, giữ Shift bấm ô G2; ở nhóm Font bấm B rồi mở Fill Color chọn một màu.',
          'Bấm ô C3, giữ Shift bấm ô C12; ở nhóm Number mở ô Number Format, chọn Currency (₫).',
        ],
        solve: () => [
          { type: 'selectRange', range: 'A1:G1' },
          { type: 'merge' },
          { type: 'selectRange', range: 'A2:G2' },
          { type: 'setFormat', fmt: { bold: true } },
          { type: 'setFormat', fmt: { fill: '#FFF3B0' } },
          { type: 'selectRange', range: 'C3:C12' },
          { type: 'setFormat', fmt: { numFmt: 'currencyVnd' } },
        ],
      }),
      {
        kind: 'explain',
        body: 'Chặng 2 là phần lõi. Ô **I1** ghi tỉ lệ phụ cấp **0,1** dùng chung cho cả bảng — nhớ khoá nó bằng **$**. Bảng tra xếp loại nằm ở **J1:K3**, cũng phải khoá.',
      },
      excelPractice({
        cells: BANG,
        setup: () => [
          { type: 'selectRange', range: 'A1:G1' },
          { type: 'merge' },
          { type: 'selectRange', range: 'A2:G2' },
          { type: 'setFormat', fmt: { bold: true, fill: '#FFF3B0' } },
          { type: 'selectRange', range: 'C3:C12' },
          { type: 'setFormat', fmt: { numFmt: 'currencyVnd' } },
          { type: 'select', cell: 'A1' },
        ],
        task: 'Chặng 2 — tính toán. Ở hàng 3 hãy viết: **E3** phụ cấp (lương × ô tỉ lệ đã khoá), **F3** xếp loại bằng **VLOOKUP** (bảng tra đã khoá), **G3** thực lĩnh (lương + phụ cấp). Rồi Fill cả ba cột xuống hết hàng 12. Cuối cùng **G13** là tổng thực lĩnh bằng **SUM**, và **C14** là lương cơ bản trung bình bằng **AVERAGE**.',
        checks: [
          { kind: 'cellFormula', cell: 'E3', absolute: true },
          { kind: 'cellValue', cell: 'E3', value: 750000 },
          { kind: 'cellFormula', cell: 'F3', fn: 'VLOOKUP', absolute: true },
          { kind: 'cellValue', cell: 'F3', value: 'Giỏi' },
          { kind: 'cellValue', cell: 'G3', value: 8250000 },
          { kind: 'cellValue', cell: 'G12', value: 6600000 },
          { kind: 'cellFormula', cell: 'G13', fn: 'SUM', range: 'G3:G12' },
          { kind: 'cellValue', cell: 'G13', value: 75570000 },
          { kind: 'cellValue', cell: 'C14', value: 6870000 },
        ],
        spotlight: { cell: 'E3' },
        hint: 'E3 là =C3*$I$1. F3 là =VLOOKUP(D3,$J$1:$K$3,2,FALSE). G3 là =C3+E3. Rồi chọn E3:G12 và bấm Fill ▾ › Down (thẻ Home › nhóm Editing).',
        steps: [
          'Ô E3 gõ =C3*$I$1 rồi Enter.',
          'Ô F3 gõ =VLOOKUP(D3,$J$1:$K$3,2,FALSE) rồi Enter.',
          'Ô G3 gõ =C3+E3 rồi Enter.',
          'Chọn vùng E3:G12, rồi ở thẻ Home › nhóm Editing bấm Fill ▾ › Down.',
          'Ô G13 gõ =SUM(G3:G12), ô C14 gõ =AVERAGE(C3:C12).',
        ],
        solve: () => [
          { type: 'setCell', cell: 'E3', raw: '=C3*$I$1' },
          { type: 'setCell', cell: 'F3', raw: '=VLOOKUP(D3,$J$1:$K$3,2,FALSE)' },
          { type: 'setCell', cell: 'G3', raw: '=C3+E3' },
          { type: 'selectRange', range: 'E3:G12' },
          { type: 'fillDown' },
          { type: 'setCell', cell: 'G13', raw: '=SUM(G3:G12)' },
          { type: 'setCell', cell: 'C14', raw: '=AVERAGE(C3:C12)' },
        ],
      }),
      {
        kind: 'explain',
        body: 'Chặng 3 — biến bảng số thành **báo cáo**. Bảng tổng hợp theo phòng ở **I4:J7** đã được cộng sẵn bằng SUMIF như bạn học ở chương trước, giờ ta chỉ việc vẽ nó thành biểu đồ.',
      },
      excelPractice({
        cells: { ...BANG, ...CONG_THUC, ...TONG_HOP },
        setup: () => [
          { type: 'selectRange', range: 'A1:G1' },
          { type: 'merge' },
          { type: 'selectRange', range: 'A2:G2' },
          { type: 'setFormat', fmt: { bold: true, fill: '#FFF3B0' } },
          { type: 'selectRange', range: 'C3:C12' },
          { type: 'setFormat', fmt: { numFmt: 'currencyVnd' } },
          { type: 'select', cell: 'A1' },
        ],
        task: 'Chặng 3 — báo cáo. Sắp xếp vùng **A3:G12** theo **Thực lĩnh (G)** từ cao xuống thấp; bật **Filter** cho **A2:G12** rồi lọc cột **Phòng (B)** chỉ hiện **Kế toán**; cuối cùng chèn **biểu đồ tròn** từ vùng **I5:J7** với tiêu đề **Cơ cấu quỹ lương**.',
        checks: [
          { kind: 'rangeSorted', range: 'A3:G12', by: 'G', dir: 'desc' },
          { kind: 'filterActive', col: 'B', values: ['Kế toán'] },
          { kind: 'chart', chartType: 'pie', range: 'I5:J7' },
        ],
        spotlight: { helpId: 'excel.sortDesc' },
        hint: 'Thẻ Data để sắp xếp và lọc, thẻ Insert để chèn biểu đồ tròn từ I5:J7.',
        steps: [
          'Chọn A3:G12, sang thẻ Data, chọn Cột G rồi bấm Z→A.',
          'Chọn A2:G12, bấm Filter, mở menu cột B và chỉ để lại Kế toán.',
          'Chọn I5:J7, sang thẻ Insert, chọn loại Tròn, gõ tiêu đề Cơ cấu quỹ lương rồi bấm Chèn biểu đồ.',
        ],
        solve: () => [
          { type: 'selectRange', range: 'A3:G12' },
          { type: 'sortRange', range: 'A3:G12', by: 'G', dir: 'desc' },
          { type: 'selectRange', range: 'A2:G12' },
          { type: 'enableFilter', range: 'A2:G12' },
          { type: 'setFilterValues', col: 'B', values: ['Kế toán'] },
          { type: 'selectRange', range: 'I5:J7' },
          { type: 'insertChart', chart: { id: 'chart-0', type: 'pie', range: 'I5:J7', title: 'Cơ cấu quỹ lương' } },
          { type: 'save', name: 'bang-luong-thang-9.xlsx', at: 0 },
        ],
      }),
      {
        kind: 'explain',
        mood: 'happy',
        body: 'Xong rồi! Bạn vừa làm trọn một bảng lương: trình bày, tính bằng công thức có khoá ô, tra bảng bằng VLOOKUP, tổng kết bằng SUM, rồi sắp xếp, lọc và vẽ biểu đồ. Đây đúng là việc mà người ta trả lương để làm đấy. 🎉',
      },
    ],
  },
];

import type { Lesson } from '@office-neko/shared';
import { excelPractice } from '../lessonKit';

/** Bảng dùng chung cả chương. */
const STAFF = {
  A1: 'Nhân viên', B1: 'Phòng', C1: 'Lương',
  A2: 'Nguyễn Văn Nam', B2: 'Kế toán', C2: '7500000',
  A3: 'Trần Thị Lan', B3: 'Kinh doanh', C3: '6200000',
  A4: 'Lê Minh Tú', B4: 'Kế toán', C4: '8100000',
  A5: 'Phạm Thu Hà', B5: 'Kinh doanh', C5: '5500000',
};

/** Chương 6 — Sắp xếp, lọc và biểu đồ. */
export const EXCEL_DATA: Lesson[] = [
  {
    id: 'excel.sort',
    trackId: 'excel',
    chapterId: 'excel.data',
    title: 'Sắp xếp bảng',
    minutes: 10,
    steps: [
      {
        kind: 'explain',
        mood: 'happy',
        body: '[[sap-xep|Sắp xếp]] là xếp lại thứ tự các hàng theo một cột: ai lương cao lên trên, hàng nào mới nhất xuống dưới. Ở thẻ **Data** › nhóm **Sort & Filter** có hai nút nhỏ **A→Z** (tăng dần), **Z→A** (giảm dần), và nút lớn **Sort** mở hộp thoại để tự chọn cột và thứ tự.',
      },
      {
        kind: 'explain',
        mood: 'surprised',
        body: 'Đây là chỗ sai kinh điển, bạn nhớ kỹ giúp Mochi: **phải chọn CẢ vùng dữ liệu**, không chỉ một cột. Nếu chỉ bôi đen cột Lương rồi sắp, Excel hiện hộp **Sort Warning** hỏi lại; lỡ chọn **Continue with the current selection** thì cột lương đổi chỗ mà cột tên đứng yên — lương của người này nhảy sang tên người khác, cả bảng thành vô nghĩa.',
      },
      {
        kind: 'explain',
        body: 'Sắp xếp **không làm mất dữ liệu**, chỉ đổi chỗ. Lỡ tay thì bấm {{Ctrl}}+{{Z}} là về như cũ.',
      },
      {
        kind: 'quiz',
        question: 'Bạn chỉ bôi đen cột Lương, bấm A→Z, Excel hỏi Sort Warning và bạn chọn **Continue with the current selection**. Chuyện gì xảy ra?',
        choices: [
          'Cột Lương đổi chỗ còn cột Tên đứng yên, bảng lệch hết',
          'Cả bảng được sắp đúng',
          'Bảng tính báo lỗi và không làm gì',
          'Dữ liệu bị xoá',
        ],
        answer: 0,
        why: 'Bảng tính làm đúng điều bạn bảo: chỉ sắp phần bạn chọn. Muốn cả hàng đi theo thì phải chọn cả vùng.',
      },
      excelPractice({
        cells: STAFF,
        task: 'Chọn cả vùng dữ liệu **A2:C5** rồi sắp xếp theo cột **Lương (C)** từ **cao xuống thấp**.',
        checks: [
          { kind: 'rangeSorted', range: 'A2:C5', by: 'C', dir: 'desc' },
          { kind: 'cellValue', cell: 'A2', value: 'Lê Minh Tú' },
        ],
        spotlight: { helpId: 'excel.sort' },
        hint: 'Bấm ô A2, giữ {{Shift}} bấm ô C5. Thẻ **Data** › nhóm **Sort & Filter** › nút **Sort**, chọn Column C và Largest to Smallest.',
        steps: [
          'Bấm ô A2, giữ Shift và bấm ô C5 — cả ba cột cùng sáng.',
          'Thẻ Data › nhóm Sort & Filter › nút Sort.',
          'Trong hộp thoại Sort: Sort by chọn Column C, Order chọn Largest to Smallest, rồi bấm OK.',
        ],
        solve: () => [
          { type: 'selectRange', range: 'A2:C5' },
          { type: 'sortRange', range: 'A2:C5', by: 'C', dir: 'desc' },
        ],
      }),
    ],
  },
  {
    id: 'excel.filter',
    trackId: 'excel',
    chapterId: 'excel.data',
    title: 'Lọc để xem một nhóm',
    minutes: 10,
    steps: [
      {
        kind: 'explain',
        body: 'Bảng có trăm dòng mà bạn chỉ muốn xem phòng Kế toán? Đó là lúc dùng [[loc|lọc]]. Chọn vùng gồm cả hàng tiêu đề, vào thẻ **Data** › nhóm **Sort & Filter** › nút **Filter**: mỗi ô tiêu đề hiện một mũi tên ▾. Bấm mũi tên đó rồi tích chọn giá trị muốn xem.',
      },
      {
        kind: 'explain',
        mood: 'happy',
        body: 'Điều quan trọng nhất: **lọc KHÔNG xoá gì cả**, nó chỉ tạm giấu những hàng kia đi. Bấm Filter lần nữa là mọi hàng hiện lại nguyên vẹn.',
      },
      {
        kind: 'explain',
        body: 'Dấu hiệu nhận biết đang lọc: **số hàng nhảy cách quãng** — 1, 4, 5 chẳng hạn. Thấy số hàng không liên tục thì đừng hoảng, dữ liệu vẫn còn đủ.',
      },
      {
        kind: 'quiz',
        question: 'Đang lọc chỉ hiện phòng Kế toán. Công thức =SUM(C2:C5) cộng những hàng nào?',
        choices: [
          'Cộng CẢ những hàng đang bị ẩn',
          'Chỉ cộng hàng đang hiện',
          'Báo lỗi vì đang lọc',
          'Trả về 0',
        ],
        answer: 0,
        why: 'SUM cộng mọi ô trong vùng, kể cả hàng bị lọc ẩn — vì dữ liệu vẫn còn nguyên đó. Đây là chỗ rất nhiều người nhầm.',
      },
      excelPractice({
        cells: STAFF,
        task: 'Chọn vùng **A1:C5** (gồm cả hàng tiêu đề), bật **Filter**, rồi lọc cột **Phòng (B)** để chỉ hiện phòng **Kế toán**.',
        checks: [{ kind: 'filterActive', col: 'B', values: ['Kế toán'] }],
        spotlight: { helpId: 'excel.filter' },
        hint: 'Chọn A1:C5, thẻ **Data** › nhóm **Sort & Filter** › nút **Filter**, rồi bấm mũi tên ▾ ở ô **B1** (tiêu đề Phòng) và bỏ tích Kinh doanh.',
        steps: [
          'Bấm ô A1, giữ Shift và bấm ô C5.',
          'Thẻ Data › nhóm Sort & Filter › nút Filter.',
          'Bấm mũi tên ▾ ở ô B1 (tiêu đề Phòng), bỏ tích Kinh doanh.',
        ],
        solve: () => [
          { type: 'selectRange', range: 'A1:C5' },
          { type: 'enableFilter', range: 'A1:C5' },
          { type: 'setFilterValues', col: 'B', values: ['Kế toán'] },
        ],
      }),
    ],
  },
  {
    id: 'excel.chart',
    trackId: 'excel',
    chapterId: 'excel.data',
    title: 'Biểu đồ cột và biểu đồ tròn',
    minutes: 12,
    steps: [
      {
        kind: 'explain',
        mood: 'happy',
        body: 'Một dãy số phải đọc từng dòng mới hiểu. Một [[bieu-do|biểu đồ]] thì nhìn một cái là thấy ngay ai cao ai thấp. Sếp bạn sẽ rất thích điều này.',
      },
      {
        kind: 'explain',
        body: 'Chọn vùng gồm **cột nhãn và cột số** (ví dụ tên và lương), sang thẻ **Insert**, chọn loại biểu đồ, đặt tiêu đề rồi bấm **Chèn biểu đồ**. Cột đầu của vùng làm nhãn, cột sau làm số liệu.',
      },
      {
        kind: 'explain',
        body: 'Chọn loại theo **câu hỏi bạn muốn trả lời**: [[bieu-do-cot|biểu đồ cột]] để **so sánh** các mục với nhau; [[bieu-do-tron|biểu đồ tròn]] để xem mỗi phần **chiếm bao nhiêu phần trăm** của một tổng; biểu đồ đường để xem **xu hướng** tăng giảm theo thời gian.',
      },
      {
        kind: 'quiz',
        question: 'Bạn muốn cho thấy mỗi phòng chiếm bao nhiêu phần trăm tổng quỹ lương. Nên dùng biểu đồ nào?',
        choices: ['Biểu đồ tròn', 'Biểu đồ cột', 'Biểu đồ đường', 'Không vẽ được'],
        answer: 0,
        why: 'Tròn là để nhìn tỉ lệ của các phần trong MỘT tổng. Cột hợp hơn khi so sánh các mục rời nhau.',
      },
      {
        kind: 'explain',
        body: 'Một lưu ý nhỏ mà quan trọng: hai cột phải **nằm cạnh nhau**. Bảng dưới đây đã xếp sẵn cột Nhân viên ngay bên trái cột Lương, nên bạn chỉ việc quét từ ô đầu tới ô cuối.',
      },
      excelPractice({
        // Biểu đồ lấy cột ĐẦU của vùng làm nhãn, cột SAU làm số liệu — nên bảng
        // của bài này xếp Lương ngay cạnh Nhân viên, không chen cột Phòng vào giữa.
        cells: {
          A1: 'Nhân viên', B1: 'Lương',
          A2: 'Nguyễn Văn Nam', B2: '7500000',
          A3: 'Trần Thị Lan', B3: '6200000',
          A4: 'Lê Minh Tú', B4: '8100000',
          A5: 'Phạm Thu Hà', B5: '5500000',
        },
        task: 'Chọn vùng **A2:B5** (tên và lương), rồi chèn một **biểu đồ cột** với tiêu đề **Lương nhân viên**.',
        checks: [{ kind: 'chart', chartType: 'column', range: 'A2:B5' }],
        spotlight: { helpId: 'excel.insertChart' },
        hint: 'Chọn A2:B5, sang thẻ Insert, chọn loại Cột, gõ tiêu đề rồi bấm Chèn biểu đồ.',
        steps: [
          'Bấm ô A2, giữ Shift và bấm ô B5.',
          'Bấm thẻ Insert trên thanh Ribbon.',
          'Chọn Loại biểu đồ là Cột, gõ tiêu đề Lương nhân viên.',
          'Bấm nút Chèn biểu đồ.',
        ],
        solve: () => [
          { type: 'selectRange', range: 'A2:B5' },
          { type: 'insertChart', chart: { id: 'chart-0', type: 'column', range: 'A2:B5', title: 'Lương nhân viên' } },
        ],
      }),
    ],
  },
];

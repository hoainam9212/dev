export interface FnArgHelp {
  name: string;
  desc: string;
}

export interface FnHelp {
  name: string;
  args: FnArgHelp[];
  desc: string;
  example: string;
}

const a = (name: string, desc: string): FnArgHelp => ({ name, desc });

/** Giải nghĩa 25 hàm bằng tiếng Việt, cho thẻ cú pháp hiện khi đang gõ. */
export const FN_HELP: Record<string, FnHelp> = {
  SUM: { name: 'SUM', desc: 'Cộng tất cả số trong vùng.', example: '=SUM(B2:B6)', args: [a('vùng', 'Vùng ô cần cộng, ví dụ B2:B6')] },
  AVERAGE: { name: 'AVERAGE', desc: 'Tính trung bình cộng các số trong vùng.', example: '=AVERAGE(B2:B6)', args: [a('vùng', 'Vùng ô cần tính trung bình')] },
  MIN: { name: 'MIN', desc: 'Số nhỏ nhất trong vùng.', example: '=MIN(B2:B6)', args: [a('vùng', 'Vùng ô cần tìm số nhỏ nhất')] },
  MAX: { name: 'MAX', desc: 'Số lớn nhất trong vùng.', example: '=MAX(B2:B6)', args: [a('vùng', 'Vùng ô cần tìm số lớn nhất')] },
  COUNT: { name: 'COUNT', desc: 'Đếm xem có bao nhiêu ô chứa SỐ.', example: '=COUNT(B2:B6)', args: [a('vùng', 'Vùng ô cần đếm')] },
  COUNTA: { name: 'COUNTA', desc: 'Đếm mọi ô không trống, kể cả ô chữ.', example: '=COUNTA(A2:A6)', args: [a('vùng', 'Vùng ô cần đếm')] },
  ROUND: { name: 'ROUND', desc: 'Làm tròn một số.', example: '=ROUND(B2,0)', args: [a('số', 'Số cần làm tròn'), a('số chữ số', 'Giữ lại mấy chữ số sau dấu phẩy; 0 là làm tròn thành số nguyên')] },
  ABS: { name: 'ABS', desc: 'Giá trị tuyệt đối: bỏ dấu trừ đi.', example: '=ABS(B2)', args: [a('số', 'Số cần bỏ dấu')] },
  IF: { name: 'IF', desc: 'Nếu điều kiện đúng thì lấy giá trị này, sai thì lấy giá trị kia.', example: '=IF(B2>=5,"Đạt","Chưa đạt")', args: [a('điều kiện', 'Phép so sánh, ví dụ B2>=5'), a('nếu đúng', 'Giá trị khi điều kiện đúng'), a('nếu sai', 'Giá trị khi điều kiện sai')] },
  AND: { name: 'AND', desc: 'Đúng khi TẤT CẢ điều kiện đều đúng.', example: '=AND(B2>5,B2<10)', args: [a('điều kiện 1', 'Phép so sánh thứ nhất'), a('điều kiện 2', 'Phép so sánh thứ hai')] },
  OR: { name: 'OR', desc: 'Đúng khi CÓ ÍT NHẤT MỘT điều kiện đúng.', example: '=OR(B2>5,B2=0)', args: [a('điều kiện 1', 'Phép so sánh thứ nhất'), a('điều kiện 2', 'Phép so sánh thứ hai')] },
  SUMIF: { name: 'SUMIF', desc: 'Chỉ cộng những dòng thoả điều kiện.', example: '=SUMIF(A2:A6,"Nam",B2:B6)', args: [a('vùng xét', 'Vùng đem ra so với điều kiện'), a('điều kiện', 'Chữ cần khớp, hoặc phép so sánh trong nháy kép như ">5"'), a('vùng cộng', 'Vùng số sẽ được cộng; bỏ trống thì cộng chính vùng xét')] },
  COUNTIF: { name: 'COUNTIF', desc: 'Đếm số dòng thoả điều kiện.', example: '=COUNTIF(A2:A6,"Nam")', args: [a('vùng xét', 'Vùng đem ra so với điều kiện'), a('điều kiện', 'Chữ cần khớp, hoặc phép so sánh như ">5"')] },
  AVERAGEIF: { name: 'AVERAGEIF', desc: 'Trung bình của những dòng thoả điều kiện.', example: '=AVERAGEIF(A2:A6,"Nam",B2:B6)', args: [a('vùng xét', 'Vùng đem ra so với điều kiện'), a('điều kiện', 'Chữ cần khớp hoặc phép so sánh'), a('vùng tính', 'Vùng số sẽ lấy trung bình')] },
  VLOOKUP: { name: 'VLOOKUP', desc: 'Tra một giá trị trong bảng tra rồi lấy về cột bên phải.', example: '=VLOOKUP(A2,$E$1:$F$4,2,FALSE)', args: [a('giá trị tra', 'Thứ cần tìm, thường là một ô'), a('bảng tra', 'Vùng bảng tra; cột ĐẦU TIÊN phải chứa giá trị cần tìm'), a('cột lấy về', 'Lấy cột thứ mấy của bảng tra, đếm từ 1'), a('kiểu tra', 'Gõ FALSE để tìm chính xác — bài học luôn dùng FALSE')] },
  LEFT: { name: 'LEFT', desc: 'Lấy mấy ký tự đầu của một chuỗi chữ.', example: '=LEFT(A2,6)', args: [a('chữ', 'Ô chứa chữ'), a('số ký tự', 'Lấy bao nhiêu ký tự tính từ bên trái')] },
  RIGHT: { name: 'RIGHT', desc: 'Lấy mấy ký tự cuối của một chuỗi chữ.', example: '=RIGHT(A2,3)', args: [a('chữ', 'Ô chứa chữ'), a('số ký tự', 'Lấy bao nhiêu ký tự tính từ bên phải')] },
  MID: { name: 'MID', desc: 'Lấy một đoạn ở giữa chuỗi chữ.', example: '=MID(A2,8,3)', args: [a('chữ', 'Ô chứa chữ'), a('bắt đầu từ', 'Ký tự thứ mấy thì bắt đầu lấy, đếm từ 1'), a('số ký tự', 'Lấy bao nhiêu ký tự')] },
  LEN: { name: 'LEN', desc: 'Đếm xem chuỗi chữ dài bao nhiêu ký tự.', example: '=LEN(A2)', args: [a('chữ', 'Ô chứa chữ')] },
  UPPER: { name: 'UPPER', desc: 'Đổi hết thành CHỮ HOA.', example: '=UPPER(A2)', args: [a('chữ', 'Ô chứa chữ')] },
  LOWER: { name: 'LOWER', desc: 'Đổi hết thành chữ thường.', example: '=LOWER(A2)', args: [a('chữ', 'Ô chứa chữ')] },
  PROPER: { name: 'PROPER', desc: 'Viết hoa chữ cái đầu mỗi từ.', example: '=PROPER(A2)', args: [a('chữ', 'Ô chứa chữ')] },
  TRIM: { name: 'TRIM', desc: 'Bỏ khoảng trắng thừa ở hai đầu và ở giữa.', example: '=TRIM(A2)', args: [a('chữ', 'Ô chứa chữ')] },
  CONCAT: { name: 'CONCAT', desc: 'Nối nhiều đoạn chữ lại thành một.', example: '=CONCAT(A2," ",B2)', args: [a('phần 1', 'Đoạn chữ thứ nhất'), a('phần 2', 'Đoạn chữ thứ hai')] },
  TODAY: { name: 'TODAY', desc: 'Ngày hôm nay.', example: '=TODAY()', args: [] },
};

/**
 * Chữ đang gõ → đang ở trong lời gọi hàm nào, và đối số thứ mấy.
 *
 * Quét NGƯỢC từ cuối: đếm ngoặc để biết lời gọi nào còn đang mở, và bỏ qua phần
 * nằm trong nháy kép (dấu phẩy trong `"a,b"` không phải dấu ngăn đối số).
 */
export function activeFn(text: string): { help: FnHelp; argIndex: number } | null {
  let depth = 0;
  let commas = 0;
  let inString = false;

  for (let i = text.length - 1; i >= 0; i--) {
    const ch = text[i]!;
    if (ch === '"') {
      // Đếm số nháy kép phía trước để biết đang ở trong hay ngoài chuỗi.
      inString = !inString;
      continue;
    }
    if (inString) continue;
    if (ch === ')') { depth++; continue; }
    if (ch === ',' && depth === 0) { commas++; continue; }
    if (ch === '(') {
      // Đóng xong một lời gọi lồng bên trong — KHÔNG xoá số dấu phẩy đã đếm,
      // vì chúng thuộc về lời gọi ngoài mà ta đang đi tìm.
      if (depth > 0) { depth--; continue; }
      // Ngoặc mở chưa đóng: tên hàm đứng ngay trước nó.
      const m = /([A-Za-z]+)\s*$/.exec(text.slice(0, i));
      const help = m ? FN_HELP[m[1]!.toUpperCase()] : undefined;
      return help ? { help, argIndex: commas } : null;
    }
  }
  return null;
}

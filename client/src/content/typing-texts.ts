/** Đoạn văn không dấu cho bài kiểm tra tốc độ (gõ ở chế độ không bộ gõ). */
export const TYPING_TEXTS: string[] = [
  'Moi buoi sang Mochi thuc day, vuon vai roi ngoi canh ban phim. Meo thich nghe tieng go deu deu nhu tieng mua roi tren mai nha. Khi ban go dung, man hinh hien chu mau xanh va Mochi vui ve vay duoi.',
  'Tin hoc van phong giup chung ta lam viec nhanh va gon gang hon. Biet go phim bang muoi ngon, ban co the soan thu, lam bao cao va nhap so lieu ma khong can nhin xuong ban phim.',
  'Thu vien thanh pho mo cua tu tam gio sang. Nguoi ta den doc bao, muon sach va hoc them ky nang moi. Co thu thu tre luon mim cuoi va chi cho moi nguoi cach tim sach tren may tinh.',
  'Cuoi tuan ca nha cung nau com. Me lam canh chua, bo nuong ca, con thi bay bat dua. Sau bua an ai cung ngoi xem phim va cuoi vang ca nha. Mot ngay cuoi tuan that binh yen.',
];

export function speedTestText(minutes: number, start = 0): string {
  const parts: string[] = [];
  let i = start;
  while (parts.join(' ').length < minutes * 600) {
    parts.push(TYPING_TEXTS[i % TYPING_TEXTS.length]!);
    i++;
  }
  return parts.join(' ');
}

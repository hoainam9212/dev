# Luyện thi BJT (J1, J1+) — thiết kế và chia việc

Ngày: 2026-11-13. Người dùng có khoảng 4 tháng ôn, mục tiêu J1 (530–599) và J1+ (600–800). Người dùng đã nói
"cứ làm luôn", nên các lựa chọn dưới đây là quyết định của Claude, chưa được người dùng duyệt từng mục.

## Mục tiêu

Thêm khu **BJT** vào Nihongo Sensei: lộ trình 16 tuần, luyện theo 9 dạng câu hỏi của đề thật, từ vựng công việc
theo tuần, và 3 đề thi thử 80 câu tính giờ (tuần 8, 12, 15).

Không làm trong đợt này: file âm thanh ghi sẵn nhiều giọng (hiện dùng giọng đọc của máy), đồng bộ kết quả BJT
lên server, bản tiếng Anh của lời giải thích.

Điều phải tránh: chép câu hỏi từ đề BJT thật hoặc sách luyện thi. Mọi câu hỏi tự soạn theo dạng đề.

## Đề thật (để soạn cho sát)

| Phần | Dạng (mã) | Số câu |
|---|---|---|
| 聴解 `chokai` (~45 phút) | 場面把握 `bamen` | 5 |
| | 発言聴解 `hatsugen` | 10 |
| | 総合聴解 `sogo-chokai` | 10 |
| 聴読解 `chodokkai` (~30 phút) | 状況把握 `jokyo` | 5 |
| | 資料聴読解 `shiryo` | 10 |
| | 総合聴読解 `sogo-chodokkai` | 10 |
| 読解 `dokkai` (30 phút) | 語彙・文法 `goi` | 10 |
| | 表現読解 `hyogen` | 10 |
| | 総合読解 `sogo-dokkai` | 10 |

80 câu, thang 0–800. Điểm thật tính theo IRT; app chỉ ước lượng bằng tỉ lệ đúng × 800 (`bjtEstimate`).

## Các hướng đã cân nhắc

1. **Thêm nhóm vào trang Business sẵn có.** Ít code nhất, nhưng Business là danh sách để học, không có lộ trình,
   không có tài liệu kèm âm thanh, không có thi tính giờ. Loại.
2. **Khu BJT riêng, dữ liệu riêng (chọn).** Một kiểu dữ liệu `BjtItem` phủ cả 9 dạng; nội dung nằm trong các file
   tách theo phần thi, nên nhiều phiên soạn song song mà không đụng nhau.
3. **Dùng lại `ListeningLesson`/`ReadingLesson`.** Không chứa được bảng, biểu đồ, lựa chọn đọc thành tiếng. Loại.

## Dữ liệu

Kiểu ở `shared/src/types.ts` (mục BJT). Nội dung ở `data/authored/bjt/`, dựng ra `client/public/content/bjt/index.json`.

- `BjtItem`: một mục đề = (băng nghe `script`) + (tài liệu `material`) + 1–3 câu hỏi + `points` (từ đáng nhớ).
- `set`: `demo` · `w01`…`w16` (luyện theo tuần) · `mock1`…`mock3` (đề thi thử).
- `material`: `scene` (mô tả ảnh bằng tiếng Việt, thay cho ảnh thật) · `text` (email, thông báo, bài đọc) ·
  `table` · `bars` (biểu đồ cột).
- `spokenChoices`: lựa chọn chỉ được đọc, không in (場面把握, 発言聴解).
- `BjtVocab`: từ vựng theo tuần và chủ đề.

`data/src/bjt.test.ts` kiểm mọi mục: id, 4 lựa chọn khác nhau, lời giải thích tiếng Việt, phần nghe phải có băng,
phần nghe đọc phải có tài liệu, đề thi thử đủ số câu từng dạng, đáp án không dồn vào một vị trí.

Mẫu chuẩn cho cả 9 dạng: `data/authored/bjt/demo.ts`. Soạn bằng `item()` và `vocab()` trong `helpers.ts`.

## Chia việc — ai giữ file nào

Nguyên tắc: mỗi bên chỉ sửa file của mình. `index.ts` đã import sẵn mọi file nên không ai cần sửa nó.

| Bên | Nhánh | File được sửa |
|---|---|---|
| **Máy gốc** | `nihongo-sensei/feat/bjt-ui` | `client/**`, `shared/**`, `data/scripts/**`, `data/src/**`, `data/authored/bjt/{index,helpers,plan,guides,demo}.ts`, `docs/**`; build APK |
| **Cloud A — nghe** | `nihongo-sensei/feat/bjt-content-listening` | chỉ `data/authored/bjt/chokai.ts`, `chodokkai.ts` và file mới trong `data/authored/bjt/chokai/`, `data/authored/bjt/chodokkai/` |
| **Cloud B — đọc + từ vựng** | `nihongo-sensei/feat/bjt-content-reading` | chỉ `data/authored/bjt/dokkai.ts`, `goi.ts` và file mới trong `data/authored/bjt/dokkai/`, `data/authored/bjt/goi/` |

Cloud cần đổi kiểu dữ liệu, helper hoặc test thì **không tự sửa**: ghi vào cuối thông điệp commit hoặc báo lại,
máy gốc sửa trên master rồi cloud rebase.

Khi file lớn dần: tách theo tuần vào thư mục con (ví dụ `chokai/w01.ts` xuất `W01: BjtItem[]`), còn `chokai.ts`
chỉ gom lại (`export const BJT_CHOKAI = [...W01, ...W02]`).

## Khối lượng nội dung

Mỗi tuần luyện (13 tuần: 1–7, 9–11, 13, 14, 16), bám chủ đề tuần trong `plan.ts`:

| Phần | Mỗi tuần | Cả đợt |
|---|---|---|
| 聴解 | 2 `bamen` + 4 `hatsugen` + 2 mục `sogo-chokai` (4 câu) = 10 câu | 130 |
| 聴読解 | 2 `jokyo` + 3 `shiryo` + 2 mục `sogo-chodokkai` (4 câu) = 9 câu | 117 |
| 読解 | 6 `goi` + 3 `hyogen` + 2 mục `sogo-dokkai` (4 câu) = 13 câu | 169 |
| Từ vựng | 40 từ/cụm, 2–3 chủ đề | 520 |

Ba đề thi thử: mỗi đề đúng 80 câu theo bảng đề thật, nội dung trộn mọi chủ đề.

Thứ tự giao: đợt 1 = tuần 1–4; đợt 2 = tuần 5–7 + `mock1`; đợt 3 = tuần 9–11 + `mock2`; đợt 4 = tuần 13, 14, 16 +
`mock3`. Mỗi đợt một lần push; máy gốc gộp và ra APK sau mỗi đợt.

## Quy tắc soạn câu hỏi

- Mức độ: tuần 1–4 quanh J2 lên J1; tuần 5–11 là J1; tuần 13–16 và các đề thi thử có khoảng 30% câu J1+
  (hàm ý, nói vòng, bài đọc dài kiểu báo kinh tế, số liệu phải tính).
- Bối cảnh: công ty Nhật nói chung (kinh doanh, sản xuất, nhân sự, kế toán, IT). Không dồn hết vào IT.
- Câu sai phải "sai có lý": đúng một nửa, đúng từ nhưng sai chủ thể, đúng tài liệu nhưng trái lời nói.
- `explain` viết tiếng Việt: vì sao đúng, và vì sao lựa chọn dễ nhầm nhất lại sai. Tối thiểu 30 ký tự.
- Băng nghe viết như người thật nói (あのう, ～んですが, nói vòng), không phải văn viết. Mỗi dòng có bản dịch Việt,
  dịch từ tiếng Nhật.
- Tên người, công ty đều hư cấu. Số liệu trong bảng và biểu đồ phải tự khớp (tính lại trước khi viết lời giải).
- `points`: 2–4 từ hoặc cụm đáng nhớ mỗi mục, `reading` chỉ dùng kana.
- Đáp án rải đều bốn vị trí.
- 場面把握: `material.kind = 'scene'`, mô tả ảnh bằng tiếng Việt, đủ chi tiết để có lựa chọn "đúng đồ vật, sai hành động".
- 語彙・文法: chỗ trống ghi `＿＿＿` (ba dấu gạch toàn chiều rộng), mỗi mục một câu hỏi.

## Hiệu chỉnh theo đề chính thức (2026-11-14) — áp dụng cho mọi đợt soạn lại

So nội dung đã soạn với một đề thi thử chính thức (sách riêng của người dùng, không đưa vào repo) thấy ba dạng
sai khung và nhiều dạng quá ngắn, quá dễ. Các quy tắc dưới đây THAY các dòng tương ứng ở mục trên. Hướng dẫn
từng dạng cho người học nằm ở `data/authored/bjt/guides.ts` và đã sửa theo.

1. **Khung từng dạng.**
   - `jokyo` = `material.kind = 'scene'` (mô tả ảnh cảnh làm việc) + băng ngắn + 4 lựa chọn IN SẴN, chung phần
     đầu, chỉ khác một danh từ là chủ đề cuộc trao đổi (vd 「〜の件」). Không phải bảng, không phải tính toán.
   - `hyogen` = MỘT câu hoặc hội thoại A/B ngắn có chỗ trống `＿＿＿`, chọn kính ngữ / câu đệm / cách nhờ, từ
     chối. Không phải bài đọc email.
   - `sogo-dokkai` = văn bản công việc (email, thư, thông báo, biên bản). Không bài báo, không văn nghị luận.
   - `sogo-chodokkai` = tài liệu có các vị trí đánh số 1–4 NGAY TRÊN tài liệu, và chính các vị trí đó là lựa
     chọn (đường đi trên sơ đồ, ô trong lịch, mục trong danh mục, chỗ chèn câu trong bản thảo). Cần kiểu tài liệu
     mới (Brief F); trước khi có, đừng soạn lại dạng này.
2. **Một câu hỏi mỗi mục** cho `sogo-chokai`, `sogo-chodokkai`, `sogo-dokkai`; đề thi thử 10 mục mỗi dạng, tuần
   luyện 4 mục × 1 câu (thay 2 mục × 2 câu) để giữ nguyên số câu mỗi tuần.
3. **Độ dài** (số ký tự tiếng Nhật, tính cả dấu): `sogo-chokai` băng 450–750 (70–110 giây), 2–3 người, có đổi ý
   hoặc đề án bị bác; `sogo-chodokkai` băng 400–750, khoảng 3/10 là độc thoại (thông báo, hướng dẫn); `jokyo` băng
   150–250; `hatsugen` tình huống 40–70, mỗi lựa chọn 12–25; `hyogen` câu 25–50 (hội thoại A/B tới 80), mỗi
   lựa chọn 4–14 (test chấp nhận 3–16); `sogo-dokkai` văn bản 150–300.
4. **`hatsugen`:** bốn lựa chọn cùng khung câu, độ dài chênh không quá ±20%, chỉ khác một điểm kính ngữ hay cách
   nói. Có ít nhất một câu "đúng ý nhưng sai chủ thể kính ngữ". Không có câu sai thô lỗ, lộ liễu.
5. **Dạng có lựa chọn là câu** (`bamen`, `hatsugen`, `sogo-chokai`, `sogo-dokkai`; nên theo ở mọi dạng): đáp án
   đúng là câu dài nhất không quá 30% số câu của dạng đó trong một bộ (test kiểm khi dạng có từ 8 câu trong bộ);
   không lựa chọn nào dài từ 1,5 lần trung bình ba câu kia trở lên.
6. **`sogo-chokai` — câu sai:** là điều CÓ nói trong băng nhưng của người khác, của lần trước, đã bị bác, hoặc là
   bước làm sau. Đáp án diễn đạt lại, không lặp nguyên chữ của băng.
7. **`sogo-chokai` — loại câu hỏi** trong 10 câu: khoảng 3 "làm gì trước / sẽ làm gì", 2 "X coi trọng gì",
   2 "cuối cùng chốt thế nào", 1 "lợi ích lớn nhất", 1 "mục tiêu từ nay", 1 "sửa, đổi cái gì".
8. **`jokyo`:** đáp án là từ KHÔNG có nguyên chữ trong băng, phải suy ra; bẫy là lựa chọn có chữ trùng với lời
   thoại.
9. **`shiryo`:** tối đa 4/10 câu cần tính (có bẫy đơn vị, ghi chú ※); ít nhất 4/10 câu suy ra loại tài liệu hoặc
   mục đích; thông tin quyết định nằm trên tài liệu.
10. **`sogo-chodokkai`:** mỗi đề ít nhất một sơ đồ chỉ đường, một lịch bị xếp lại, một câu tổ hợp (②③…), một câu
    "mục nào CHƯA xong"; khoảng 4/10 là mức J1+.
11. **`hyogen` — bẫy:** kính ngữ kép, sai thì hoặc thể, câu đệm gần nghĩa nhưng sai hoàn cảnh, 様 thừa, câu của
    chủ nhà đem dùng cho khách.
12. **`sogo-dokkai`:** không hỏi "nội dung nào khớp" (内容と合う); hỏi mục đích văn bản, việc người nhận phải
    làm, hạn chót, con số ở phần 記. Mỗi đề ít nhất một thư trang trọng (拝啓 hoặc 前略) và một thư từ chối khéo.

Chủ đề nên rộng hơn: sản xuất, bán lẻ, tổng vụ (đại hội cổ đông, FAX, ghi lời nhắn), tuyển dụng, đào tạo, triển
lãm; bớt chính sách công ty kiểu mới và bài báo.

**Cách kiểm:** mỗi file gom (`chokai.ts`, `chodokkai.ts`, `dokkai.ts`) xuất một danh sách `…_CALIBRATED` gồm các
`set` đã soạn lại theo mục này. `data/src/bjt.test.ts` áp quy tắc chặt (khung, một câu mỗi mục, độ dài, câu dài
nhất) chỉ cho các bộ trong danh sách đó; bộ chưa soạn lại vẫn theo quy tắc cũ. Soạn lại xong bộ nào thì thêm
`set` đó vào danh sách của phần mình, rồi cho test chạy xanh.

## Màn hình (máy gốc làm)

Trang `/bjt`, thêm vào thanh điều hướng:

- **Lộ trình**: 16 tuần, mỗi tuần có mục tiêu, việc cần làm, số câu đã làm / đúng.
- **Luyện theo dạng**: 9 dạng, mỗi dạng có hướng dẫn (cách làm, bẫy) và nút luyện.
- **Từ vựng**: danh sách theo tuần, nghe đọc từng từ.
- **Thi thử**: 80 câu, đếm giờ theo từng phần, không xem lời giải giữa chừng; cuối bài có điểm ước lượng, tỉ lệ
  đúng theo 9 dạng và danh sách câu sai kèm lời giải.

Khi luyện: băng nghe chạy bằng `speakSequence`, lời thoại ẩn cho tới khi trả lời; trả lời xong hiện lời giải,
lời thoại kèm bản dịch và `points`. Kết quả lưu trên máy (localStorage), chưa đồng bộ.

## Việc để sau

- Băng nghe hai giọng nam nữ ghi sẵn (edge-tts, như đã chọn cho Shadowing) thay giọng máy.
- Đưa câu sai vào ôn tập lặp lại (SRS).
- Đồng bộ kết quả BJT lên server.

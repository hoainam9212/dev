# book-import — đưa sách luyện thi của bạn thành "gói sách" dùng riêng

Công cụ này **không gõ lại chữ trong sách**. Nó giữ nguyên trang sách dưới dạng ảnh, giữ nguyên file nghe, và
lập mục lục: câu nào nằm ở trang nào, băng nào, phút nào, đáp án số mấy.

Sách và gói sách có bản quyền: **để ngoài mọi repo git** (repo này đang public). Lệnh `build` từ chối ghi vào
thư mục nằm trong một repo.

## Sắp xếp thư mục sách

```
Dev/bjt-sach/
  Tên sách A/            ← mỗi thư mục con là một cuốn
    sach.pdf             ← PDF (có chữ hoặc bản quét) hoặc ảnh từng trang .jpg/.png
    CD1/track01.mp3      ← file nghe, thư mục con tuỳ ý
  Tên sách B.pdf         ← một file PDF nằm ngay ngoài cũng tính là một cuốn
```

Tải dần cũng được: chạy lại lệnh, phần đã xử lý sẽ được bỏ qua. File mới của một cuốn đã có mục lục phải có
tên xếp **sau** các file cũ (nếu không số trang và số băng sẽ lệch; công cụ sẽ dừng và báo).

## Lệnh (chạy trong `tools/book-import`, cần `npm install` một lần)

```bash
node cli.mjs scan  "../../../bjt-sach"          # kiểm kê: số trang, PDF có chữ hay bản quét, độ dài từng băng
node cli.mjs build "../../../bjt-sach"          # tạo gói ở bjt-sach/_pack/<mã sách>/
node cli.mjs check "../../../bjt-sach/_pack"    # soát mục lục
node cli.mjs zip   "../../../bjt-sach/_pack"    # mỗi cuốn đã có đề → bjt-sach/_zip/<mã sách>.zip (đo lề trang luôn)
npm test
```

## Đưa sách vào app

1. `node cli.mjs zip …` tạo một file `.zip` cho mỗi cuốn đã đánh mục lục (không nén, đo sẵn vùng chữ để app bỏ lề trắng).
2. Chép file `.zip` sang điện thoại (cáp USB, Google Drive của bạn…).
3. Trong app: **Luyện thi BJT → 📚 Sách của tôi → Chọn file .zip**. Sách nằm trong bộ nhớ app trên máy đó,
   không tải lên đâu; xoá được bằng nút "Xoá sách".

## Gói sách

```
_pack/<mã sách>/
  pages/p0001.jpg …      trang sách, rộng 1400 px
  audio/a001.mp3 …       file nghe, theo thứ tự tên
  book.json              mục lục
```

`book.json` — phần `pages`, `sources`, `audio` do `build` ghi; phần `tests` do người (hoặc Claude) điền sau khi
đọc trang sách, và `build` không bao giờ ghi đè:

```json
{
  "id": "…", "title": "…", "pages": 180,
  "audio": [{ "file": "audio/a001.mp3", "source": "CD1/track01.mp3", "seconds": 1260, "title": "track01" }],
  "tests": [{
    "id": "t1", "title": "模擬テスト 第1回",
    "answerPages": [150, 152], "scriptPages": [153, 170],
    "questions": [
      { "no": 1, "section": "bamen", "page": 12, "audio": "audio/a001.mp3", "at": "0:35", "answer": 2 },
      { "no": 51, "section": "goi", "page": 40, "answer": 4 }
    ]
  }]
}
```

Đề mẫu cũ (100 câu, 120 phút) thêm các trường không bắt buộc: ở đề `minutes` (tổng phút), `legacy: true`
(không quy đổi điểm sang J1), `extras: [{ title, audio }]` (băng hướng dẫn và bài mẫu 練習); ở câu `label` (tên
mục in trong sách, ví dụ `第1部 セクション1 描写問題`). Mỗi mục cũ được gán vào mã gần nhất trong 9 mã dưới đây.

`section` dùng 9 mã của app (`bamen`, `hatsugen`, `sogo-chokai`, `jokyo`, `shiryo`, `sogo-chodokkai`, `goi`,
`hyogen`, `sogo-dokkai`). Câu nghe phải có `audio`, `at` là giây hoặc `m:ss`; `answer` là 1–4.

## Chưa làm

- Âm thanh `.wma`/`.flac` chỉ được báo, chưa tự đổi sang mp3 (máy chưa có ffmpeg).
- Một băng chứa nhiều câu (cần mốc giây `at`): app hiện phát cả track; sách đầu tiên mỗi câu một track nên chưa cần.

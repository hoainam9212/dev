# Task 11: Hỏi Mèo, README, kiểm tra tổng thể và gộp nhánh

**Files:**
- Modify: `client/src/content/faq.json`, `client/src/content/glossary.json`
- Modify: `README.md`, `docs/superpowers/plans/2026-09-22-phase5a-ppt/STATUS.md`
- Delete: `client/src/pages/DevPptPage.tsx` và route `/dev/ppt` (Task 5 tạo tạm)

**Interfaces:**
- Consumes: toàn bộ Task 1–10.
- Produces: nhánh `feat/phase5a-ppt` sạch, đã gộp vào `master`; `STATUS.md` đóng lại và nói rõ 5B bắt đầu từ đâu.

- [ ] **Bước 1: Xoá route tạm**

Xoá `client/src/pages/DevPptPage.tsx` và dòng route `/dev/ppt`.
Run: `grep -rn "dev/ppt\|DevPptPage" client/src` → **không còn kết quả nào**.

- [ ] **Bước 2: Hỏi Mèo — 8 câu cho PowerPoint**

Thêm vào `faq.json`, mỗi mục **bắt buộc có `keywords`** (file bị ép kiểu, typecheck
không bắt thiếu trường — đây là cái bẫy đã ghi trong STATUS của 4B). Viết keywords cả
có dấu lẫn **không dấu**, vì người học hay gõ không dấu:

1. "Slide là gì?" — keywords: `slide`, `trang chieu`, `trang chiếu`
2. "Làm sao thêm một slide mới?" — `new slide`, `them slide`, `thêm slide`
3. "Bố cục (Layout) để làm gì?" — `bo cuc`, `bố cục`, `layout`
4. "Khung mờ «Bấm để nhập tiêu đề» là gì?" — `cho danh san`, `khung mo`, `placeholder`
5. "Tôi muốn viết chữ ở chỗ khác trên slide thì làm sao?" — `hop chu`, `hộp chữ`, `text box`
6. "Chèn ảnh vào slide bằng cách nào?" — `chen anh`, `chèn ảnh`, `pictures`, `hinh anh`
7. "Kéo ảnh thế nào cho không bị méo?" — `keo anh`, `meo anh`, `tay nam`, `tay nắm`
8. "Lỡ tay xoá mất thì làm sao?" — `undo`, `hoan tac`, `hoàn tác`, `xoa nham`

Mỗi câu trả lời 2–4 câu, giọng Mochi, nhắc đúng tên nút tiếng Anh kèm nghĩa tiếng Việt.

- [ ] **Bước 3: Rà lại từ điển**

Run: mở app, bấm từng mục từ điển mới (`slide`, `bo-cuc`, `cho-danh-san`, `hop-chu`,
`hinh-khoi`, `tay-nam`, `ty-le-16-9`) — mỗi mục phải có `lessonIds` trỏ tới bài **có
thật** và bấm vào mở được bài đó.

- [ ] **Bước 4: README**

Cập nhật phần trạng thái: PowerPoint đã có trình mô phỏng (slide, bố cục, hộp chữ,
hình khối, ảnh, định dạng chữ) và **6 bài / 2 chương**; theme, chuyển cảnh, trình
chiếu và 6 bài còn lại thuộc 5B. Không hứa thứ chưa làm.

- [ ] **Bước 5: Kiểm tra tổng thể**

```bash
npm test && npm run typecheck && npm run build
```
Expected: PASS hết. Ghi lại **số test shared và client** để điền vào STATUS.

Chạy `npm run preview`, rồi:
- Học lại **một** bài PowerPoint bất kỳ từ đầu tới lúc đạt, trong bản build thật.
- Đổi hồ sơ (multi-profile) rồi quay lại: tiến độ PowerPoint có còn đúng không?
- Ngắt mạng và tải lại trang: PWA ngoại tuyến còn chạy không? (Việc này đang treo từ
  4A — nếu hỏng, **đừng sửa ở đây**, ghi vào mục "Việc còn treo" của STATUS.)
- Xem trên khung hẹp (~390px): cột thumbnail và khung slide có vỡ không? Nếu vỡ, sửa
  bằng cách cho cột thumbnail nằm **ngang phía trên** khi màn hình hẹp.

- [ ] **Bước 6: Đóng STATUS.md**

Đánh dấu cả 11 task ☑, ghi:
- dòng mở đầu: "**XONG toàn bộ 11/11 task, <ngày>.** PowerPoint có 6 bài / 2 chương.
  Giai đoạn kế tiếp là 5B — chưa có plan."
- mục "Lỗi bắt được khi nhìn ảnh chụp": gom mọi thứ mắt thấy mà test không thấy trong
  suốt 5A (nhất là Task 5–8). Đây là phần có giá trị nhất của file.
- mục "Việc còn treo": chuyển tiếp các việc treo cũ, cộng những gì 5A phát hiện.
- mục "Cố ý KHÔNG làm ở 5A": giữ nguyên danh sách đã có trong STATUS.

- [ ] **Bước 7: Commit và gộp**

```bash
git add -A
git commit -m "docs(ppt): Hỏi Mèo, README và tổng kết giai đoạn 5A" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
git checkout master
git merge --no-ff feat/phase5a-ppt -m "feat: giai đoạn 5A — PowerPoint, lõi và soạn slide" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
npm test && npm run typecheck
```

Chỉ báo xong khi **hai lệnh cuối cùng đã chạy thật và xanh** — dán số test vào báo cáo,
đừng nói "đã pass" mà không có con số (skill `superpowers:verification-before-completion`).

- [ ] **Bước 8: Đề xuất 5B**

Viết một đoạn ngắn cho phiên sau: 5B gồm theme (6 bộ pastel), chuyển cảnh Fade/Push/Zoom,
chế độ trình chiếu toàn màn hình, hai loại check `theme` và `transition`, chương 3–4
(5 bài) và dự án "Slide giới thiệu bản thân" 3 chặng. Không viết plan 5B ở đây — tách
plan riêng như đã làm cho 5A.

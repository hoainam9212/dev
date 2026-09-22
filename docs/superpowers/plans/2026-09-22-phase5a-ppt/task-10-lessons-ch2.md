# Task 10: Chương 2 "Chữ, hình, ảnh" — 3 bài

**Files:**
- Create: `client/src/content/lessons/ppt-objects.ts`
- Modify: `client/src/content/lessons/index.ts`, `tracks.ts`, `glossary.json`

**Interfaces:**
- Consumes (Task 9): `pptPractice`; chương `ppt.start` đã có trong `TRACKS`.
- Produces: ba bài `ppt.textbox`, `ppt.shape`, `ppt.image`; chương `ppt.objects`. Sau task này lộ trình PowerPoint có **6 bài / 2 chương** — hết phần bài học của 5A.

Đọc spec mục 7 (chương 2). Mọi bài ở đây đều dựng sẵn slide có tiêu đề bằng `setup`,
để người học tập trung vào đúng một việc mới.

- [ ] **Bước 1: Viết ba bài (FAIL ở `content.test.ts`)**

`client/src/content/lessons/ppt-objects.ts`.

**Bài `ppt.textbox` — "Chèn hộp chữ"** (`minutes: 8`)
- explain: [[cho-danh-san]] của bố cục là khung có sẵn; muốn thêm chữ ở chỗ khác thì
  chèn [[hop-chu|hộp chữ]] mới bằng Insert → Text Box. Hộp chữ mới **đang được chọn**,
  kéo là dời được ngay.
- quiz: "Muốn viết thêm một dòng chữ ở góc dưới slide thì làm gì?" → đáp án "Chèn một
  [[hop-chu|hộp chữ]] mới".
- practice: đề "Slide đã có tiêu đề «Sở thích của tôi». Hãy chèn một hộp chữ và gõ vào
  đó «Đọc sách»."
  - `slides: ['titleContent']`
  - `setup: (s0) => [{ type: 'startEditEl', id: s0.slides[0]!.els[0]!.id }, { type: 'setText', text: 'Sở thích của tôi' }, { type: 'commitEdit' }]`
  - checks: `[{ kind: 'hasElement', slide: 1, el: 'text', textContains: 'Đọc sách' }]`
  - `spotlight: { helpId: 'ppt.textBox' }`
  - `solve:` chèn hộp chữ ở `(80, 400, 480, 80)` rồi `startEditEl` vào **id của đối
    tượng vừa chèn**. Lời giải không được viết id cứng: tính bằng
    ```ts
    solve: (s0) => {
      const after = pptSim.reducePpt(s0, { type: 'addText', x: 80, y: 400, w: 480, h: 80 });
      const id = after.sel!;
      return [
        { type: 'addText', x: 80, y: 400, w: 480, h: 80 },
        { type: 'startEditEl', id }, { type: 'setText', text: 'Đọc sách' }, { type: 'commitEdit' },
      ];
    }
    ```
    (Bài học của giai đoạn 3: lời giải viết bằng **thứ tìm được từ state**, không bao
    giờ bằng số thứ tự đoán trước.)

**Bài `ppt.shape` — "Hình khối"** (`minutes: 9`)
- explain: [[hinh-khoi]] để nhấn mạnh ý; đổi màu nền bằng Font color khi hình đang
  được chọn; tám [[tay-nam]] quanh hình để đổi kích thước.
- practice 1: đề "Chèn một ngôi sao vào slide."
  - checks: `[{ kind: 'hasElement', slide: 1, el: 'shape', shape: 'star' }]`
  - `solve: () => [{ type: 'addShape', shape: 'star', x: 400, y: 216, w: 160, h: 160 }]`
- practice 2: đề "Chèn hai hình chữ nhật, rồi kéo cho chúng không đè lên nhau."
  - checks: `[{ kind: 'hasElement', slide: 1, el: 'shape', shape: 'rect', min: 2 }]`
  - **Không** chấm chuyện "không đè lên nhau": grader 5A không có loại check ấy, và
    thêm một loại check chỉ để dùng một lần là không đáng. Lời đề bài nói rõ đây là
    phần luyện tay, phần chấm chỉ đếm hình — viết thẳng điều đó vào `steps` để người
    học không thấy mình bị chấm oan.
  - `solve: () => [{ type: 'addShape', shape: 'rect', x: 80, y: 300, w: 160, h: 80 }, { type: 'addShape', shape: 'rect', x: 480, y: 300, w: 160, h: 80 }]`

**Bài `ppt.image` — "Chèn ảnh"** (`minutes: 9`)
- explain: Insert → Pictures, chọn một ảnh mẫu; kéo [[tay-nam]] ở **góc** để ảnh không
  bị méo (kéo cạnh thì bẹp).
- quiz: "Kéo tay nắm nào để ảnh không bị méo?" → đáp án "Tay nắm ở góc".
- practice: đề "Chèn một ảnh vào slide rồi thu nhỏ lại còn khoảng nửa khung."
  - checks: `[{ kind: 'hasElement', slide: 1, el: 'image' }]`
  - `solve: (s0) => [{ type: 'addImage', src: IMG.src, alt: IMG.alt }, { type: 'resizeEl', handle: 'se', dx: -80, dy: -60 }]`
    với `IMG` lấy từ đúng bộ ảnh mẫu mà hộp thoại Task 8 dùng (nhập từ chỗ khai báo
    chung, đừng chép chuỗi base64 vào file bài học).

- [ ] **Bước 2: Nối vào danh mục**

- `lessons/index.ts`: thêm `...pptObjects`.
- `tracks.ts`: thêm chương thứ hai vào track `ppt`:
  `{ id: 'ppt.objects', title: 'Chữ, hình và ảnh', lessonIds: ['ppt.textbox', 'ppt.shape', 'ppt.image'] }`.
- `glossary.json`: thêm `hop-chu`, `hinh-khoi`, `tay-nam`, mỗi mục `lessonIds` trỏ
  đúng ba bài vừa tạo. Nếu Task 9 có để mục nào `lessonIds: []`, **điền nốt ở đây**.

- [ ] **Bước 3: Chạy, xác nhận PASS**

Run: `npm test -w client -- content` → PASS.
Run: `npm test && npm run typecheck` → PASS.

- [ ] **Bước 4: Học thật trên trình duyệt — bắt buộc**

Học hết ba bài bằng chuột tới lúc chấm đạt. Kiểm thêm:
- Bài `ppt.shape` practice 2: người học kéo hai hình ra hai chỗ rồi bấm Kiểm tra —
  có đạt không? Nếu lời đề bắt "không đè nhau" mà check không đo điều đó, thì lời đề
  phải nói rõ, chứ không được để người học đoán.
- Bài `ppt.image`: kéo tay nắm góc, ảnh có giữ được nét không méo không?
- Mọi `[[id|chữ]]` bấm vào có mở đúng mục từ điển không.

- [ ] **Bước 5: Commit**

```bash
git add client/src docs/superpowers
git commit -m "feat(ppt): chương 2 — hộp chữ, hình khối và ảnh" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

Cập nhật dòng Task 10 của `STATUS.md`: PowerPoint nay **6 bài / 2 chương**.

# Tin Học Cùng Mochi (office-neko)

PWA dạy tin học văn phòng cho người mới hoàn toàn: chuột, gõ 10 ngón, Word, Excel, PowerPoint, dùng AI.
Giao diện tiếng Việt, mascot là mèo Mochi. Spec: `docs/superpowers/specs/2026-09-19-office-neko-design.md`.

## Repo và nhánh

- Repo GitHub `hoainam9212/dev`, dùng chung với nihongo-sensei. Mọi nhánh của dự án này mang tiền tố `office-neko/`:
  `office-neko/master`, `office-neko/feat/...`. Nhánh `main` chỉ có README, đừng làm việc trên đó.
- **Không có nhánh làm dở; mọi plan trong ROADMAP đã xong** (2026-11-10, dự án hoàn tất theo spec). Việc lẻ còn
  treo: `docs/superpowers/plans/2026-10-10-backlog/STATUS.md` › Việc còn treo. Việc mới thì tạo nhánh
  `feat/<tên>` từ `master`, gộp `--ff-only`. Việc lẻ sau hoàn tất (2026-11-11, đã gộp + deploy):
  `docs/superpowers/plans/2026-11-11-sau-hoan-tat/STATUS.md`.
- Bản online: https://mochi-office.pages.dev (Cloudflare Pages, lệnh đưa bản mới ở README; deploy là việc ra ngoài,
  hỏi trước). Người dùng báo "vẫn thấy bản cũ" thì thường do PWA (`registerType: 'prompt'`): phải bấm **Tải lại** ở
  thông báo "Có bản mới…" hoặc Ctrl+Shift+R.
- **Phiên cloud (claude.ai/code):** chỉ push được nhánh `claude/...`, không push `office-neko/*`, `push -f` bị chặn;
  không có `wrangler` nên không deploy. Tách nhánh từ `origin/office-neko/master`, push, rồi người dùng/phiên desktop
  gộp vào master và deploy. Phiên cloud không có thư mục memory: điều cần nhớ lâu ghi vào file này.
- **Commit bằng email `lehoainam.htd@gmail.com`**, không bao giờ dùng email công ty. Soát `git config user.email` trước commit đầu tiên.
- Dòng cuối commit message: `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

## Chạy và kiểm tra

```bash
npm install
npm test          # shared + client, vitest
npm run typecheck
npm run dev       # Vite, cổng 5174 trong .claude/launch.json của máy gốc
```

Chạy test và typecheck chung một lệnh. Thêm thứ mới vào `shared` mà giao diện báo `undefined` thì xoá
`client/node_modules/.vite` rồi khởi động lại dev server.

## Cách làm việc (người dùng đã chốt)

- **Bắt đầu phiên / sau compact:** đọc `docs/superpowers/plans/ROADMAP.md`, rồi `00-overview.md` + `STATUS.md` của
  plan đang chạy, rồi đúng một file `task-NN-*.md`. Không đọc cả thư mục plan.
- **Không dùng subagent.** Tự làm từng task theo TDD: test đỏ → code → xanh → kiểm trình duyệt → commit.
  **Một task một lượt** (chốt 2026-10-10): xong task thì dừng, nhắn "Task N xong — gõ `/compact` rồi gõ `tiếp`".
  Claude không tự compact được; người dùng chạy. Phiên dài là thứ tốn token nhất.
- Cập nhật **một dòng** trong `STATUS.md` ngay trong commit của task đó.
- **Không tự chạy review toàn nhánh.** Xong giai đoạn: đủ test, kiểm trình duyệt, gộp `--ff-only` vào master,
  báo người dùng một dòng rằng có thể review nếu họ muốn.
- Sửa file bằng tool Edit/Write, không bằng `sed`/python qua shell.
- Plan mới: tách `00-overview.md` + `STATUS.md` + một file mỗi task (≤ ~160 dòng, ≤ 8 bước), ghi giao diện chính
  xác và danh sách test một dòng mỗi test, **không** chép mã test nguyên văn. Bỏ dòng "REQUIRED SUB-SKILL:
  subagent-driven-development" mà skill writing-plans gợi ý.

## Kiến trúc phải theo

- Logic sim là reducer + grader thuần trong `shared/src/sims/<sim>/`, đăng ký trong `GRADERS`. Component React ở
  `client/src/sims/<sim>/` dùng `useReducer(def.reduce, initial)`, báo qua `onState`, đăng ký trong `SIMS`.
- `client/src/content/content.test.ts` chạy lại `solution` của mọi bài qua reducer, và đòi không bước thực hành nào đạt sẵn.
- Ribbon dùng chung ở `client/src/components/ribbon.tsx` (`RibbonTabs`, `RibbonPanel`, `Group`, `ToolButton`,
  `Picker`, `MenuButton`, `SoonTab`). Thẻ › nhóm › thứ tự › nhãn theo Office 365 **tiếng Anh**, giải nghĩa
  tiếng Việt ở tooltip. Lời bài viết theo mẫu "thẻ **X** › nhóm **Y** › nút **Z**". Icon: `@fluentui/react-icons`.
- Excel: ô chỉ lưu `raw`, không lưu giá trị đã tính. Sắp xếp phải dịch địa chỉ tương đối theo độ lệch hàng.
- Dexie v3; không hàm nào trong `db/`, `profiles/`, `progress/` tự đọc ai đang học, tất cả nhận `profileId`.
- **Lưu trữ:** mọi dữ liệu học nằm trong IndexedDB của từng trình duyệt (7 bảng theo `profileId`), không máy chủ,
  không đồng bộ; chuyển máy bằng Cài đặt › Sao lưu/Khôi phục. Bản offline = Workbox precache ~51 file (~2,8 MB:
  JS/CSS, phông Nunito, ảnh `images/real` + `images/word`, icon).
- **Chốt 2026-11-11 — không gọi LLM/API thật** (spec): chat AI là kịch bản. Mỗi bài chat khai
  `topic: { keywords (không dấu), vi }` (`content/aiTopics.test.ts` bắt buộc); lạc đề thì AI nói thật là bản mô
  phỏng và grader `sent`/`promptCriteria` không tính. Không có bí mật nào trong bundle (ai cũng xem được code web) —
  giữ vậy, đừng đưa khoá API vào client.
- **Điện thoại:** bài thực hành tính cho máy tính, nhưng giữ dùng được bằng chạm: chú thích nút bỏ qua chạm
  (`HelpTooltipLayer`, `pointerType`), ô Excel chạm lại để gõ (focus thanh công thức ngay trong cú chạm), dòng nhắc
  `pointer-coarse:`. Nhãn hiệu Microsoft ghi ở Cài đặt › Giới thiệu & nguồn.

## Bẫy đã gặp — test xanh mà giao diện vẫn sai

- Mở màn hình và **nhìn ảnh chụp**, kiểm CSS bằng `getComputedStyle`, thao tác bằng chuột thật (không set giá trị bằng JS).
- Học thật từng bài mới viết: đề mở thì check phải mở; lời bài không được tả nút/phím không tồn tại.
- `overflow-x: auto` cắt cả chiều dọc → menu thả xuống phải đặt ngoài hàng nút. Nhãn tiếng Việt hay tràn `viewBox` SVG.
- `scale(calc(100cqw / 960))` không chạy, phải là `960px`; khung co giãn cần `overflow: hidden`; dx/dy khi kéo chia cho scale.
- CSS mới phải nằm đúng cấp trong layer, đừng chèn bằng cách dò dấu `}` cuối file.
- Simulator chưa bắt Ctrl+D, nên lời bài đừng dạy phím này cho Fill Down.
- Polyfill `PointerEvent` của test (`client/src/test/setup.ts`) mặc định `pointerType: 'mouse'`; test chạm phải truyền
  `{ pointerType: 'touch' }`. Kiểm điện thoại bằng Playwright `devices['Pixel 7']` + `.tap()`.
- Playwright trên slide: `[data-testid="ppt-el"]` đầu tiên là chỗ dành sẵn tiêu đề, hình mới chèn là phần tử cuối.

## Không có trong repo

`.superpowers/` (sổ ghi SDD) bị git bỏ qua. Mã commit cũ ghi trong các plan/STATUS trước 2026-10-01 là mã trước khi
viết lại lịch sử (đổi email), không còn tồn tại.

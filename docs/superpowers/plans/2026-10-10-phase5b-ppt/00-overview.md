# Giai đoạn 5B – PowerPoint: trang trí, chuyển cảnh, trình chiếu (tổng quan)

> **Cách thực thi:** xem `../ROADMAP.md` mục "Nhịp chạy". Tóm tắt: chạy thẳng, không subagent, **một task một lượt**.
> Xong task thì dừng, người dùng `/compact` rồi gõ `tiếp`. Đọc đúng file này + `STATUS.md` + một file task.

**Goal:** PowerPoint đủ 12 bài / 5 chương: sáu theme, ba kiểu chuyển cảnh, chế độ trình chiếu toàn màn hình, 6 bài
mới (chương 3–4) và dự án "Slide giới thiệu bản thân", mỗi bài có nút ribbon kết bằng ảnh PowerPoint thật.

**Architecture:** Giữ nguyên khuôn 5A: reducer thuần `shared/src/sims/ppt/`, React chỉ vẽ. Thêm `theme.ts` (bảng 6 theme),
mở rộng `PptAction` và `PptCheck`. Ba thẻ ribbon mới thay `SoonTab` trong `client/src/sims/ppt/Ribbon.tsx`, dựng bằng
`Group`/`ToolButton`/`variant="office"`. Trình chiếu là một lớp phủ `position: fixed` vẽ lại slide bằng chính
`ElementView`, kèm thử `requestFullscreen`.

**Tech Stack:** TypeScript 5.6, React 18.3, Tailwind 4, Vitest 2, Testing Library. **Không thêm thư viện.**

**Spec:** `docs/superpowers/specs/2026-09-22-ppt-design.md` mục 4–7 (phần ghi "5B").

---

## Global Constraints

- Nhánh `feat/phase5b-ppt` tạo từ `master` tại chỗ. Remote đẩy lên là `office-neko/feat/phase5b-ppt` (chỉ khi được bảo).
- Chữ giao diện tiếng Việt NFC; nhãn nút giữ tên tiếng Anh thật của PowerPoint (Themes, Transition to This Slide,
  Apply To All, Preview, From Beginning, From Current Slide), giải nghĩa ở `label`/`helpId`.
- Lời bài viết theo mẫu "thẻ **X** › nhóm **Y** › nút **Z**", gọi là "thẻ", không bao giờ "tab" (`content.test` chặn).
- Reducer thuần: không `Date.now()`, không random. Chuyển cảnh chỉ là CSS 300 ms; `prefers-reduced-motion` hoặc
  `data-motion="reduce"` thì không có hiệu ứng.
- Mọi bài có nút ribbon kết bằng `realShot` credit `'Ảnh chụp Microsoft PowerPoint'` (`content.test` đã đòi).
- Ảnh thật rộng ~1000 px, cửa sổ PowerPoint 1000×650, không phóng to cả màn hình (người dùng chốt 2026-10-10).

## Quy ước chung cho mọi task

**Lệnh:** `npm test -w shared -- <tên>`, `npm test -w client -- <tên>`, cả gói `npm test && npm run typecheck`.
Preview `office-neko` cổng 5174; hồ sơ thử bật Cài đặt › "Mở khoá toàn bộ bài học".

**Ba điều tự soi trước khi nói xong task giao diện:** (1) nhìn ảnh chụp thật, so với PowerPoint thật và ribbon Word/Excel
trong app; (2) CSS mới nằm ở cấp đầu `@layer components` của `theme.css` và thêm tên lớp vào `theme.test.ts`;
(3) đọc lại đề: làm đúng ý đề mà vẫn trượt được không, và bài có đạt sẵn lúc mở không.

## Những gì đã có, đừng làm lại

| Có sẵn | Ở đâu |
|---|---|
| `ThemeId`, `Transition`, `PptState.theme`, `PptState.show`, `Slide.transition` (đã khai báo, chưa dùng) | `shared/src/sims/ppt/state.ts` |
| `withSlides`/`withEls` (chụp bậc hoàn tác), `slideOf`, `pptInitial`, `PPT_LAYOUTS` | `state.ts` |
| `gradePpt` + 5 check: `slideCount`, `slideLayout`, `slideTitle`, `hasElement`, `activeSlide` | `shared/src/sims/ppt/grade.ts` |
| Ribbon có sẵn 6 thẻ; Design/Transitions/Slide Show đang là `SoonTab` | `client/src/sims/ppt/Ribbon.tsx` |
| `RibbonTabs`, `RibbonPanel`, `Group`, `ToolButton`, `MenuButton`, `Row`, `Labeled` | `client/src/components/ribbon.tsx` |
| Vẽ một đối tượng (dùng cho thumbnail, canvas, trình chiếu) | `client/src/sims/ppt/ElementView.tsx` |
| `pptPractice({slides, task, checks, spotlight, hint, steps, setup, solve})` | `client/src/content/lessonKit.ts` |
| Bộ chụp ảnh Office: `lib.ps1`, `crop.ps1`, `mark.mjs`, `draw.ps1`; làm mờ `blur-names.ps1` | `client/scripts/office-shots/`, `client/scripts/` |

## Danh sách task

| # | File | Nội dung |
|---|---|---|
| 1 | `task-01-shared-theme-show.md` | Theme, chuyển cảnh, trình chiếu, 6 check mới (shared) |
| 2 | `task-02-design-tab.md` | Vẽ theo theme + thẻ Design + Font Color "Automatic" |
| 3 | `task-03-transitions-tab.md` | Thẻ Transitions, Preview, dấu ★ trên thumbnail |
| 4 | `task-04-slideshow.md` | Thẻ Slide Show + lớp trình chiếu toàn màn hình, F5/Esc |
| 5 | `task-05-real-shots.md` | Chụp 3 ảnh PowerPoint thật: Design, Transitions, Slide Show |
| 6 | `task-06-lessons-ch3.md` | Chương 3 "Cho đẹp mắt": `ppt.layout`, `ppt.format`, `ppt.theme` |
| 7 | `task-07-lessons-ch4.md` | Chương 4 "Trình bày": `ppt.transition`, `ppt.present` |
| 8 | `task-08-project.md` | Chương 5 dự án `ppt.project` ba chặng |
| 9 | `task-09-wrapup.md` | Hỏi Mèo, README, kiểm tra bản build, gộp master |

## Cấu trúc file

```
shared/src/sims/ppt/theme.ts            # PPT_THEMES, themeOf                (Task 1)
shared/src/sims/ppt/show.ts             # reducer con cho trình chiếu        (Task 1)
client/src/sims/ppt/RibbonDesign.tsx    # thẻ Design                         (Task 2)
client/src/sims/ppt/RibbonTransitions.tsx                                    (Task 3)
client/src/sims/ppt/RibbonSlideShow.tsx                                      (Task 4)
client/src/sims/ppt/SlideShow.tsx       # lớp trình chiếu                    (Task 4)
client/src/content/lessons/ppt-design.ts   # chương 3                         (Task 6)
client/src/content/lessons/ppt-show.ts     # chương 4                         (Task 7)
client/src/content/lessons/ppt-project.ts  # chương 5                         (Task 8)
client/public/images/real/ppt-06-design.png, ppt-07-transitions.png, ppt-08-slideshow.png (Task 5)
```

## Bất biến

1. `content.test.ts`: mọi `solution` đạt; không bước thực hành nào đạt sẵn; mọi `[[id]]` có trong glossary; mọi
   `helpId` có trong `HELP_IDS`. Đừng sửa test này để cho qua.
2. Luôn còn ít nhất một slide; đối tượng trong khung 960×540, toạ độ bội số 8 (bất biến 5A giữ nguyên).
3. Đang trình chiếu (`show !== null`) thì mọi action soạn thảo bị bỏ qua (reducer trả về state cũ), trừ
   `showNext`/`showPrev`/`endShow`.
4. Chữ trên mọi theme phải đọc được: màu mặc định lấy từ theme, chỉ `fmt.color` đặt tay mới ghi đè.

## Review Focus

1. **Nhấn F5 trong bài học** — người quen PowerPoint sẽ bấm F5; trình duyệt tải lại trang và mất bài. Mong đợi: F5
   bắt đầu trình chiếu, Shift+F5 từ slide hiện tại. Test ở Task 4.
2. **Esc khi đang ở chế độ toàn màn hình của trình duyệt** — trình duyệt nuốt phím Esc để thoát fullscreen, app không
   nhận được keydown. Mong đợi: `fullscreenchange` ra khỏi fullscreen thì cũng `endShow`. Test ở Task 4.
3. **Theme tối `dem` với chữ đã tô màu đen từ trước** — chữ biến mất trên nền tối. Mong đợi: có mục "Automatic" trong
   Font Color để trả chữ về màu theme; lời bài `ppt.theme` nhắc điều này. Test ở Task 2.
4. **Bấm Undo sau khi đổi theme / chuyển cảnh** — mong đợi quay về theme / chuyển cảnh cũ như PowerPoint thật. Test ở Task 1.
5. **Trình chiếu bài 1 slide, hoặc bấm ← ở slide đầu, → ở màn "Hết bài"** — không văng, không kẹt. Test ở Task 1.

# Giai đoạn 6A – Lộ trình "Dùng AI (Claude) trong công việc" (tổng quan)

> **Cách thực thi:** xem `../ROADMAP.md` mục "Nhịp chạy". Chạy thẳng, không subagent, **một task một lượt**, xong thì
> dừng để người dùng `/compact` rồi gõ `tiếp`. Đọc đúng file này + `STATUS.md` + một file task.

**Goal:** Lộ trình thứ 6 gồm 10 bài / 4 chương dạy dùng AI an toàn và hiệu quả, trên một trình mô phỏng chat
**ngoại tuyến** (câu trả lời soạn sẵn theo chất lượng prompt), kết bằng dự án "Prompt tạo báo cáo tuần".

**Architecture:** Sim thứ 8 `aichat` theo đúng khuôn: `shared/src/sims/aichat/` (bộ chấm prompt thuần, reducer,
grader) + `client/src/sims/aichat/` (giao diện chat). Không gọi mạng, không API thật: mọi câu trả lời của "AI" nằm sẵn
trong `initial` của bước thực hành, reducer chỉ **chọn** câu theo điểm prompt. Bài "chép công thức AI sang Excel" và
"dàn ý slide" ghép một bước `aichat` với một bước `excel`/`ppt` có sẵn trong cùng bài.

**Tech Stack:** như cũ, không thêm thư viện. Icon `@fluentui/react-icons`.

**Spec:** `docs/superpowers/specs/2026-09-19-office-neko-design.md` §4 (dòng lộ trình 5) và §7.7; phần thiết kế chi tiết
dưới đây là bản chốt cho plan này (chưa có spec riêng).

---

## Thiết kế đã chốt

**Năm tiêu chí prompt** (`Criterion`): `role` Vai trò · `context` Bối cảnh · `task` Nhiệm vụ · `format` Định dạng ·
`limits` Giới hạn. Chấm bằng mẫu từ khoá trên chữ đã **bỏ dấu + chữ thường** (người học gõ không dấu vẫn được chấm).
Đây là **góp ý, không chấm khắt khe**: giao diện hiện từng tiêu chí đạt/chưa ngay khi gõ.

**Ba mức** (`Tier`): điểm 0–2 `weak`, 3–4 `ok`, 5 `good`. Mỗi kịch bản có sẵn ba câu trả lời; prompt càng tốt câu trả
lời càng sát ý — người học **thấy** prompt tốt cho kết quả tốt.

**Ba chế độ** của sim (`mode`): `chat` (gõ prompt, gửi, nhận trả lời), `pickSentence` (câu trả lời AI tách thành câu,
bấm chọn câu sai — bài "Bắt lỗi AI"), `pickItems` (danh sách thông tin, bấm chọn những thứ KHÔNG nên đưa cho AI).

**Nhãn rõ ràng:** khung chat ghi "Trợ lý AI (mô phỏng)" và một dòng nhỏ "Câu trả lời soạn sẵn để luyện tập — không gửi
đi đâu cả." Không logo, không màu thương hiệu Anthropic. Lời bài được nhắc tên Claude như một ví dụ trợ lý AI.

**10 bài / 4 chương:**

| Chương | Bài |
|---|---|
| `ai.start` Làm quen AI | `ai.intro` AI là gì · `ai.safety` Thông tin không nên đưa · `ai.verify` Bắt lỗi AI |
| `ai.prompt` Viết prompt tốt | `ai.structure` Năm phần của prompt · `ai.context` Thêm bối cảnh và giới hạn |
| `ai.work` AI trong công việc | `ai.email` Viết email · `ai.summary` Tóm tắt · `ai.formula` Công thức Excel · `ai.outline` Dàn ý slide |
| `ai.final` Dự án | `ai.project` Prompt tạo báo cáo tuần |

## Global Constraints

- Nhánh `feat/phase6a-ai` từ `master` (sau khi 5B đã gộp). Tiếng Việt NFC. Không gọi mạng.
- `SimKind` đã có `'aichat'`; track `ai` đã có trong `tracks.ts` với `chapters: []`.
- `grading.test.ts` đang dùng `'aichat'` làm ví dụ "sim chưa có grader" — Task 2 phải đổi sang một kind khác chưa có
  grader hoặc bỏ case đó nếu mọi kind đã có grader (ghi lý do vào STATUS).
- Bài AI không có `realShot` (không có giao diện Office thật để chụp).

## Quy ước chung

Lệnh, nhịp TDD, "ba điều tự soi" như `../2026-10-10-phase5b-ppt/00-overview.md` mục "Quy ước chung" — không chép lại;
khác duy nhất: thay "so với PowerPoint thật" bằng "so với một ứng dụng chat quen thuộc: tin của mình bên phải, của
AI bên trái, ô gõ dưới cùng".

## Những gì đã có

`gradeWith`, `GRADERS` (`shared/src/grading/`); `SIMS`, `SimProps` (`client/src/sims/`); `lessonKit.ts`; `HELP_IDS`;
`glossary.json`/`faq.json`; `excelPractice`, `pptPractice` cho bài ghép.

## Danh sách task

| # | File | Nội dung |
|---|---|---|
| 1 | `task-01-criteria.md` | Bộ chấm prompt `scorePrompt` (shared) |
| 2 | `task-02-state-grader.md` | `AiChatState`, reducer, 4 check, đăng ký (shared) |
| 3 | `task-03-chat-ui.md` | `AiChatSim` chế độ chat + `aiPractice` + trang thử `/dev/aichat` |
| 4 | `task-04-pick-modes.md` | Chế độ `pickSentence` và `pickItems` |
| 5 | `task-05-lessons-ch1.md` | Chương 1: `ai.intro`, `ai.safety`, `ai.verify` |
| 6 | `task-06-lessons-ch2.md` | Chương 2: `ai.structure`, `ai.context` |
| 7 | `task-07-lessons-ch3a.md` | Chương 3 phần 1: `ai.email`, `ai.summary` |
| 8 | `task-08-lessons-ch3b.md` | Chương 3 phần 2: `ai.formula` (ghép Excel), `ai.outline` (ghép PowerPoint) |
| 9 | `task-09-project-wrapup.md` | Dự án `ai.project`, Hỏi Mèo, README, build, gộp |

## Bất biến

1. `content.test.ts` như mọi giai đoạn (solution đạt, không đạt sẵn, glossary, helpId).
2. `reduceAiChat` thuần; mọi câu trả lời lấy từ state, không sinh chữ mới.
3. `send` với nháp rỗng/chỉ khoảng trắng là no-op.
4. Không có chữ nào trong sim gợi ý rằng đây là AI thật hay dữ liệu được gửi đi.

## Review Focus

1. **Gõ không dấu** ("ban la tro ly, viet email...") — mong đợi chấm như có dấu. Test ở Task 1.
2. **Prompt rất dài nhồi đủ từ khoá vô nghĩa** — chấp nhận đạt (đây là góp ý, không phải thi); nhưng prompt < 25 ký tự
   luôn 0 điểm kèm lời "Prompt hơi ngắn". Test ở Task 1.
3. **Gửi nhiều prompt trong một bước** — check `promptCriteria` đạt nếu **bất kỳ** prompt đã gửi đạt; prompt sau kém hơn
   không làm mất điểm. Test ở Task 2.
4. **Bấm Enter khi đang gõ tiếng Việt bằng bộ gõ (IME composing)** — không được gửi giữa chừng. Mong đợi: bỏ qua
   Enter khi `e.nativeEvent.isComposing`. Test ở Task 3.
5. **Chọn rồi bỏ chọn trong `pickItems`** — chấm theo tập đang chọn cuối cùng, thừa một mục cũng trượt kèm lời nói rõ
   mục nào chưa nên chọn. Test ở Task 2.

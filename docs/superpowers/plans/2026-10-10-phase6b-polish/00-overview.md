# Giai đoạn 6B – Hoàn thiện: huy hiệu, phụ kiện, Phòng tự do, kiểm tra đầu vào, đóng gói (tổng quan)

> **Cách thực thi:** xem `../ROADMAP.md` mục "Nhịp chạy". Chạy thẳng, không subagent, **một task một lượt**, xong thì
> dừng để người dùng `/compact` rồi gõ `tiếp`. Đọc đúng file này + `STATUS.md` + một file task.

**Goal:** Làm nốt phần "hoàn thiện" của spec §10 mục 6: huy hiệu, phụ kiện cho Mochi mở theo cấp, Phòng tự do (Word /
Excel / PowerPoint không đề bài, tự lưu), kiểm tra đầu vào để mở khoá sớm, `Start Tin Hoc.bat`, và PWA báo bản mới /
cài vào máy.

**Architecture:** Luật thuần ở `shared/` (huy hiệu nào đạt, phụ kiện nào mở, đạt kiểm tra hay không, mở khoá theo
`testedOut`), còn đọc/ghi Dexie ở `client/src/progress/`, `client/src/sandbox/` — **mọi hàm nhận `profileId`**, chỉ
`profiles/current.ts` đọc ai đang học. Bảng `earnedBadges`, `sandboxDocs` đã có từ Dexie v3; trường mới của `Profile`
là tuỳ chọn và không đánh chỉ mục ⇒ **không nâng phiên bản Dexie**.

**Tech Stack:** như cũ, không thêm thư viện. `vite-plugin-pwa` có sẵn (`virtual:pwa-register`).

**Spec:** `specs/2026-09-19-office-neko-design.md` §8 (trò chơi hoá, Phòng tự do, cài đặt) và §10 mục 6.

---

## Global Constraints

- Nhánh `feat/phase6b-polish` từ `master` (sau 6A). Tiếng Việt NFC. Không gọi mạng.
- Không đăng nhập, không PIN (đã chốt từ multi-profile 2026-09-21).
- Sao lưu (`progress/backup.ts`, `schemaVersion: 2`) phải mang theo mọi dữ liệu mới: trường mới trong `profiles`,
  `earnedBadges`, `sandboxDocs`. File sao lưu cũ vẫn nhập được.
- Mọi trang mới kiểm ở 390px và 1280px; không tràn ngang.

## Quy ước chung

Lệnh, nhịp TDD, "ba điều tự soi" như `../2026-10-10-phase5b-ppt/00-overview.md` mục "Quy ước chung" — không chép lại.

## Những gì đã có

| Có sẵn | Ở đâu |
|---|---|
| `levelFromXp`, `computeStreak`, `unlockState`, `visibleLessons` | `shared/src/progress.ts` |
| `recordLessonResult`, `recordTypingRun` | `client/src/progress/record.ts`, `typing.ts` |
| `useCompleted`, `useStreak`, `useTodayMinutes` | `client/src/progress/useStats.ts` |
| Bảng `earnedBadges` (`BadgeRow {profileId,id,earnedAt}`), `sandboxDocs` (`SandboxDoc`) | `client/src/db/db.ts` |
| `Mochi` có prop `skin`; dùng ở AppShell, Settings, Welcome, ProfileList, ProfilePicker | `client/src/components/Mochi.tsx` |
| `FinishView` (sao, XP, Confetti) | `client/src/player/FinishView.tsx` |
| `SIMS` (word, excel, ppt, …) | `client/src/sims/registry.ts` |
| `setupPwa()` gọi `registerSW({immediate:true})` | `client/src/pwa.ts` |

## Danh sách task

| # | File | Nội dung |
|---|---|---|
| 1 | `task-01-badges.md` | Huy hiệu: luật (shared), trao huy hiệu, FinishView, kệ huy hiệu trang chủ |
| 2 | `task-02-accessories.md` | Phụ kiện cho Mochi mở theo cấp, chọn trong Cài đặt |
| 3 | `task-03-sandbox.md` | Phòng tự do: danh sách tệp, mở Word/Excel/PowerPoint, tự lưu |
| 4 | `task-04-placement.md` | Kiểm tra đầu vào: câu hỏi theo lộ trình, `testedOut`, màn chào |
| 5 | `task-05-launcher-pwa.md` | `Start Tin Hoc.bat`, PWA báo bản mới + nút cài app |
| 6 | `task-06-smoke-merge.md` | Đi một vòng toàn app, sao lưu khứ hồi, README, gộp |

## Bất biến

1. Không hàm nào trong `db/`, `profiles/`, `progress/`, `sandbox/` tự đọc ai đang học.
2. Trao huy hiệu là **idempotent**: gọi lại không tạo bản ghi trùng, không hiện "Huy hiệu mới" lần hai.
3. `testedOut` chỉ **mở khoá**, không cho sao/XP, không đánh dấu bài đã học.
4. `content.test.ts` và mọi test cũ vẫn xanh.

## Review Focus

1. **Nhập file sao lưu cũ** (chưa có `accessory`, `testedOut`, huy hiệu) — mong đợi nhập được, giá trị mặc định hợp lý.
   Test ở Task 6.
2. **Hai hồ sơ trên một máy** — huy hiệu, phụ kiện, tệp Phòng tự do, `testedOut` của người này không lộ sang người
   kia. Test ở Task 1, 3, 4.
3. **Đóng tab ngay sau khi gõ trong Phòng tự do** — mong đợi mất tối đa ~1 giây chỉnh sửa; lưu khi `visibilitychange`
   sang ẩn. Test ở Task 3.
4. **Hạ cấp không xảy ra nhưng XP đọc lỗi** — phụ kiện đang đeo mà cấp chưa đủ (sửa tay IndexedDB) thì không vẽ, không
   văng. Test ở Task 2.
5. **Làm kiểm tra đầu vào rồi trượt** — mong đợi không mất gì, làm lại được, lời động viên; đạt rồi làm lại trượt
   không thu hồi `testedOut`. Test ở Task 4.

# Nhiều người học trên một máy — Implementation Plan (tổng quan)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans.
> **Cách đọc plan này:** đọc **đúng file này + đúng một file `task-NN-*.md`**. Không đọc các task khác. Đọc `STATUS.md` (15 dòng) để biết đã làm tới đâu.

**Goal:** Một máy có nhiều người học, mỗi người chọn tên mình rồi học tiếp đúng tiến độ riêng — tiến độ, sao, XP, chuỗi ngày, thống kê gõ phím và cài đặt đều tách biệt.

**Architecture:** Một database Dexie duy nhất, nâng lên `version(2)`: thêm bảng `profiles`, và mọi bảng dữ liệu mang thêm `profileId` trong khoá. Người đang học là một con trỏ trong `localStorage`, không phải dữ liệu CSDL. Nguyên tắc xuyên suốt: **không hàm tầng dữ liệu nào tự đoán "người hiện tại"** — mọi hàm đọc/ghi nhận `profileId` làm tham số, chỉ tầng React biết ai đang học.

**Tech Stack:** giữ nguyên — TypeScript 5.6, React 18.3, react-router-dom 6, Dexie 4, Tailwind 4, Vitest 2, Testing Library, fake-indexeddb. Không thêm thư viện.

**Spec:** `docs/superpowers/specs/2026-09-21-multi-profile-design.md` (đọc mục 4, 5, 6 trước khi làm task 1–3).

---

## Global Constraints

- Thư mục dự án: `C:\Users\vnext\Desktop\Project Manager\97. Tools\Dev\office-neko` (git repo riêng). Nhánh làm việc: `feat/multi-profile`, tạo tại chỗ, gộp `--ff-only` vào `master` khi xong.
- Toàn bộ chữ giao diện là tiếng Việt, file UTF-8 dạng NFC. Giọng văn xưng "bạn", câu ngắn, dành cho người mới dùng máy tính.
- Không server, không gọi mạng. `tsconfig` bật `strict` và `noUncheckedIndexedAccess`. Test import rõ từ `vitest`.
- Màu chữ dùng token có sẵn (`text-rose-ink`, `text-excel-ink`, `text-muted`), nút chính `.btn-primary`.
- **Đây không phải tính năng bảo mật.** Không thêm mật khẩu, PIN hay bất cứ thứ gì trông giống đăng nhập. Chữ trên giao diện không được hứa hẹn riêng tư.
- Mỗi task kết thúc bằng **một commit**: `git commit -m "<subject>" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"`, kèm cập nhật `STATUS.md` trong cùng commit.

## Quy ước chung

**Lệnh:** `npm test -w shared -- <tên>` / `npm test -w client -- <tên>` / toàn bộ `npm test && npm run typecheck`. Chạy thử: preview tên `office-neko`, cổng 5174.

**Nhịp TDD:** viết test FAIL → chạy xác nhận FAIL → viết code tối thiểu → chạy xác nhận PASS → (task giao diện: kiểm tra trên trình duyệt **ngay trong task này**) → commit.

**Kiểm tra trình duyệt là việc của từng task.** Task cuối chỉ đi một lượt xác nhận, không phải nơi săn lỗi.

**Test cũ hỏng thì sửa test theo API mới** — task 2 đổi chữ ký nhiều hàm nên chuyện này là bình thường. Không được nới lỏng phần khẳng định của test cũ để cho qua.

## Bảng thuật ngữ

| Tên | Nghĩa |
|---|---|
| hồ sơ (profile) | Một người học trên máy này; id dạng `p1`, `p2`… |
| `profileId` | Khoá gắn mọi dòng dữ liệu với chủ của nó |
| người đang học | Hồ sơ đang được chọn, trỏ bởi `localStorage['office-neko.currentProfileId']` |
| màn "Ai đang học?" | Route `/who`, lưới thẻ chọn người |

## Danh sách task

Thứ tự bắt buộc: Task N chỉ bắt đầu khi Task N−1 đã commit.

| # | File | Nội dung | Giao diện? |
|---|---|---|---|
| 1 | `task-01-schema-migration.md` | Dexie v2, bảng `profiles`, di trú v1→v2, `profiles/manage.ts` | không |
| 2 | `task-02-current-profile.md` | Con trỏ người đang học, `ProfileProvider` mới, các hàm tiến độ nhận `profileId` | không |
| 3 | `task-03-who-screen.md` | Route `/who`, ảnh đại diện mèo, bước chọn ảnh ở màn hình chào, nút đổi người | **có** |
| 4 | `task-04-settings-manage.md` | Cài đặt: đổi ảnh, danh sách người học, xoá hồ sơ | **có** |
| 5 | `task-05-backup-v2.md` | Sao lưu v2 gồm `profiles`, vẫn nhập được file v1 | **có** |
| 6 | `task-06-wrapup.md` | Ba hồ sơ thật trên trình duyệt, README, gộp nhánh | **có** |

## Cấu trúc file

```
client/src/
  db/db.ts                      # (sửa) version(2), bảng profiles, khoá kép      T1
  profiles/manage.ts            # tạo / đổi / xoá hồ sơ, sinh id                  T1
  profiles/current.ts           # con trỏ localStorage + subscribe cho React      T2
  profiles/avatars.ts           # 6 màu mèo + nhãn tiếng Việt                     T3
  profiles/ProfilePicker.tsx    # màn "Ai đang học?"                              T3
  profiles/ProfileList.tsx      # danh sách + xoá, dùng trong Cài đặt             T4
  db/profile.tsx                # (sửa) provider theo hồ sơ đang chọn             T2
  progress/{record,typing,useStats,backup}.ts   # (sửa) nhận profileId            T2, T5
  components/Mochi.tsx          # (sửa) nhận màu lông để làm ảnh đại diện         T3
  pages/{WelcomePage,SettingsPage}.tsx, app/AppShell.tsx, App.tsx  # (sửa)        T3, T4
```

## Bất biến phải luôn đúng

1. **Không mất dữ liệu.** Người đang dùng app mở lên sau khi nâng cấp phải thấy nguyên tiến độ cũ dưới tên cũ. Task 1 có test riêng cho việc này; đừng bao giờ sửa test đó cho dễ qua.
2. Không hàm nào trong `db/`, `profiles/`, `progress/` được tự đọc `localStorage` để biết ai đang học — trừ đúng `profiles/current.ts`.
3. Mọi dòng ghi vào 6 bảng dữ liệu đều phải có `profileId`. Không có đường ghi nào thiếu nó.
4. Không cho phép máy rơi vào trạng thái "không còn hồ sơ nào nhưng vẫn ở trong app": hết hồ sơ thì về `/welcome`.

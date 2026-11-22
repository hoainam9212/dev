# Task 7: Kiểm toàn luồng và gộp

**Ra được:** nhánh gộp `office-neko/master`; người dùng quyết định deploy.

## Bước làm

1. `npm test && npm run typecheck` xanh.
2. Trình duyệt, khung 1280 và 390:
   - IndexedDB trống, mở `/de-dung` ⇒ tạo hồ sơ ⇒ trang chủ 4 lộ trình, chữ Cực lớn, không XP.
   - Học một bài, xong bài thấy sao + câu khen + Mochi.
   - `/who` đổi sang hồ sơ thường ⇒ đủ 6 lộ trình, có XP, chữ gốc.
3. `npm run build -w client` xanh.
4. Cập nhật `ROADMAP.md` (thêm plan này, ☑), `CLAUDE.md` (dòng "Không có nhánh làm dở"), STATUS.
5. `git switch office-neko/master && git merge --ff-only office-neko/feat/che-do-de-dung`.
6. **Hỏi người dùng** trước khi push và trước khi deploy. Gợi ý deploy thử trước:
   `npx wrangler@4 pages deploy client/dist --project-name mochi-office --branch de-dung`
   ⇒ link thử `de-dung.mochi-office.pages.dev/de-dung`; người dùng đồng ý mới deploy `--branch main`.

## Plan sau (chưa viết)

Lời dễ cho PowerPoint, rồi Word, rồi Excel: mỗi lộ trình một plan giống task 6.

## Commit

`docs(de-dung): xong plan chế độ dễ dùng` + dòng STATUS.

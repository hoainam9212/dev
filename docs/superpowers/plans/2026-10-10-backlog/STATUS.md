# Dọn tồn đọng – tình trạng

**Xong 2026-11-10.** Chạy song song hai làn (`2026-11-10-song-song/`): desktop làm D1–D5, cloud làm C1–C5 + C1b; chi
tiết từng task ở `STATUS-desktop.md` và `STATUS-cloud.md`. Kết thúc: shared 559 / client 556 test xanh, typecheck +
build sạch.

| Task | Xong | Commit | Ghi chú / việc còn treo |
|---|---|---|---|
| 1 Start/Taskbar, Dock/Spotlight + bài | ☑ | e23852d, 1a1a8db | desktop D3. Chương "Mở ứng dụng", 2 bài **tự chọn**; sửa sau: bài ngay sau bài tự chọn không mở sẵn cho người mới |
| 2 bài copy + hoàn tác, Shift+click, menu không tràn | ☑ | f5e671a | desktop D4. Bài `basics.files.copy.*` tự chọn; `lib/clampMenu.ts` dùng chung FileArea + MouseSim |
| 3 trợ năng | ☑ | ed840b0, 33ed155, baaf407, 1375d4e, ce080c5, 495e0b0, f5e671a | cloud C1 + C1b (menu ribbon/slide, `useDialogFocus`, listbox slide, aria-live); desktop: lưới Excel `grid` + Tab, vùng chọn bằng phím trong Word, bật `menuitem`, FileArea/MouseSim (D4) |
| 4 bàn phím ảo theo HĐH + bàn tay | ☑ | 4b28da9 | cloud C2. `KeyHeatmap` vẫn dùng `KEY_ROWS` cũ |
| 5 Telex/VNI, bài tốc độ bỏ dở, spotlight | ☑ | 68fdf3d, 495e0b0, 03e8116, 353e691 | cloud C3 + C5, desktop nối `composedAccuracy` và thêm `data-cell` cho ô Excel |
| 6 lỗi nhỏ PowerPoint, kết thúc | ☑ | 70e046e, cd5b032 + (commit này) | cloud C4 (mục 1 không tái hiện được, giữ bằng test bố cục; mục 2 cỡ hình theo loại). Kết thúc = desktop D5: gộp C5, đi một vòng bản build 4174 (7 bài của 6 lộ trình tới bước thực hành, có mạng + ngắt mạng, 390 px không tràn, console sạch) |

## Việc còn treo

- **Vòng hồng của spotlight không hiện** (`styles/theme.css`): keyframes `spotlight-pulse` đặt `box-shadow`, đè
  `ring-4 ring-rose` (cũng là `box-shadow`), nên chỉ còn quầng mờ + nhãn "Ở đây nè!". Có từ trước làn song song; sửa:
  vòng đặc bằng `outline`, quầng để keyframes. Chi tiết: STATUS-desktop "Nhờ làn cloud" 8.

## Cố ý KHÔNG làm

Đồng bộ nhóm Undo của app (Office 365) với ảnh thật Office 2019 — để nguyên, đã ghi ở STATUS 5B.

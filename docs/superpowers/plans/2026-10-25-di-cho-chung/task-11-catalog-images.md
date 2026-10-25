### Task 11: Kho ~130 món và bộ ảnh Gemini

> Chạy song song được sau Task 02. Có **hai cửa duyệt của user**; không làm hàng loạt trước khi user duyệt.

**Files:**
- Create: `catalog/items.csv` (nguồn sự thật: `id,name,aliases,nameJa,category,unit,defaultQty,step`, aliases nối bằng `|`)
- Create: `catalog/build-catalog.mjs` (CSV → `android/app/src/main/assets/catalog/items.json`; ảnh `catalog/raw/<id>.png` → `android/app/src/main/assets/catalog/img/<id>.webp` 256×256 bằng `sharp`), `catalog/package.json` (sharp)
- Create: `catalog/raw/*.png` (ảnh gốc từ Gemini), `catalog/PROMPT.md` (prompt chuẩn dùng lại)
- Modify: `android/app/src/main/assets/catalog/items.json`; `ui/common/ItemImage.kt` nếu cần đổi đường dẫn asset (`catalog/img/<id>.webp`)
- Test: `BundledCatalogTest` (Task 02) đổi kỳ vọng: ≥ 120 món, mọi món có ảnh asset tồn tại

**Interfaces:**
- Consumes: `Item` + schema `items.json` (Task 02), `ItemImage` (Task 05).
- Produces: `items.json` cùng schema, thêm `imageAsset = "catalog/img/<id>.webp"`.

**Nội dung danh sách** (spec mục 5): lẫn đồ Việt + đồ Nhật thường mua ở siêu thị quanh 西葛西 (イオン, オーケー, まいばすけっと…). Mỗi nhóm khoảng: Rau củ 30, Thịt cá 22, Trứng sữa 14, Gia vị 18, Đồ khô 20, Đồ uống 12, Khác 14. Tên Việt là tên chuẩn; `nameJa` kanji/kana thường thấy trên nhãn; aliases gồm tên miền Bắc/Nam, tên Nhật kana, tên tiếng Anh phổ biến.

**Phong cách ảnh** (spec mục 5): ảnh chụp thật, một món, tách nền trong suốt hoặc nền trắng tinh, ánh sáng mềm từ trên trái, góc nhìn 3/4, món chiếm ~75 % khung vuông, không chữ, không tay người, không đĩa trừ khi món cần (đậu phụ trong hộp…). Prompt mẫu ghi trong `catalog/PROMPT.md`, mỗi lượt vẽ 1 món (Gemini vẽ nhiều món một ảnh thì khó cắt).

- [ ] **Step 1:** Viết `items.csv` đủ ~130 món (giữ nguyên 20 id của Task 02). **Cửa duyệt 1:** gửi user file CSV (SendUserFile) + tóm tắt số món mỗi nhóm; sửa theo góp ý.
- [ ] **Step 2:** Nhờ user mở Chrome profile có Gemini Pro. Qua Claude in Chrome, vẽ **12 món thử** (2 mỗi nhóm đầu, đủ loại: rau, thịt, hộp sữa, chai nước mắm, gói mì, trứng); lưu PNG vào `catalog/raw/` (dùng nút tải của Gemini — **hỏi user trước khi tải file**, theo luật tải tệp). **Cửa duyệt 2:** ghép 12 ảnh thành một tấm xem nhanh, gửi user duyệt phong cách.
- [ ] **Step 3:** Viết `build-catalog.mjs`; test bằng `node build-catalog.mjs --check` (in số món, số ảnh thiếu) → hiện "thiếu N ảnh".
- [ ] **Step 4:** Vẽ nốt các món còn lại theo lô 10, soát mỗi lô (đúng món, nền sạch, không chữ); món Gemini vẽ sai thì vẽ lại tối đa 2 lần rồi để emoji nhóm và ghi vào STATUS.
- [ ] **Step 5:** `node build-catalog.mjs` → items.json + webp; `--check` báo "thiếu 0 ảnh" (hoặc đúng danh sách đã ghi).
- [ ] **Step 6:** Cập nhật `BundledCatalogTest`, chạy `:app:testDebugUnitTest` → PASS; record lại `pick.png`, **mở ảnh soi** lưới với ảnh thật.
- [ ] **Step 7:** Cập nhật `STATUS.md`; commit `feat: ship full item catalog with generated photos` (ảnh raw PNG có thể nặng: chỉ commit webp + CSV + script, thêm `catalog/raw/` vào `.gitignore` nếu tổng > 30 MB).

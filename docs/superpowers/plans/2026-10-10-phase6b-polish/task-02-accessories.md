# Task 2: Phụ kiện cho Mochi mở theo cấp

**Files:**
- Create: `shared/src/accessories.ts`, `accessories.test.ts`
- Modify: `shared/src/index.ts`, `client/src/db/db.ts` (thêm trường tuỳ chọn vào `Profile`, không đổi `stores`),
  `client/src/components/Mochi.tsx`, `components.test.tsx`, `client/src/pages/SettingsPage.tsx` (+ test),
  `client/src/player/FinishView.tsx`, 5 chỗ vẽ `Mochi skin=` của hồ sơ (AppShell, ProfileList, ProfilePicker, …)

## Interfaces

```ts
// shared/src/accessories.ts
export type AccessoryId = 'bow' | 'glasses' | 'scarf' | 'hat' | 'crown';
export const ACCESSORIES: readonly { id: AccessoryId; name: string; level: number }[];
//  bow 'Nơ hồng' 2 · glasses 'Kính tròn' 3 · scarf 'Khăn quàng' 4 · hat 'Mũ len' 6 · crown 'Vương miện' 10
export function accessoriesUnlocked(level: number): AccessoryId[];
export function newlyUnlocked(prevLevel: number, level: number): AccessoryId[];   // cho thông báo khi lên cấp
// db.ts — Profile thêm:  accessory?: AccessoryId | null
// Mochi.tsx — Props thêm: accessory?: AccessoryId | null   (vẽ một <g> SVG trên đầu/cổ, theo hệ toạ độ sẵn có của Mochi)
```

Chỗ vẽ Mochi **của một hồ sơ** truyền `accessory={wearable(profile)}` với
`wearable(p) = p.accessory && accessoriesUnlocked(levelFromXp(p.xp).level).includes(p.accessory) ? p.accessory : null`
(đặt trong `client/src/profiles/avatars.ts` cạnh `avatarSkin`). Mochi kể chuyện trong bài học (không phải hồ sơ) không đeo.

Cài đặt: mục "Phụ kiện cho Mochi" — hàng nút: "Không đeo" + 5 phụ kiện; chưa mở thì `disabled` kèm chữ "Cấp N";
đang đeo `aria-pressed="true"`; xem trước Mochi 64px đeo phụ kiện đang chọn. `FinishView`: khi bài vừa học làm lên
cấp và `newlyUnlocked` khác rỗng → dòng "Mochi có phụ kiện mới: Kính tròn! Vào Cài đặt để đeo thử."
(FinishView cần XP trước/sau: lấy từ giá trị `xpGained` + profile, hoặc để `recordLessonResult` trả thêm `prevXp`.)

## Bước

- [ ] **1. Test shared (FAIL)**: cấp 1 không có gì; cấp 3 có bow + glasses; cấp 10 đủ 5; `newlyUnlocked(2,4)` =
  `['glasses','scarf']`; `newlyUnlocked(4,4)` = `[]`.
- [ ] **2. Viết shared**, chạy xanh.
- [ ] **3. Test client (FAIL)**: `Mochi accessory="hat"` có phần tử `data-accessory="hat"`; không truyền thì không có;
  Settings: phụ kiện chưa mở bị khoá và ghi "Cấp 6"; chọn "Kính tròn" ghi `accessory: 'glasses'` vào hồ sơ;
  `wearable` trả `null` khi cấp không đủ dù hồ sơ ghi `crown`; FinishView hiện dòng phụ kiện mới khi lên cấp.
- [ ] **4. Vẽ 5 phụ kiện** bằng SVG đơn giản, màu pastel hợp Mochi (nơ hồng trên tai, kính tròn mắt, khăn quàng
  cổ, mũ len có quả bông, vương miện vàng); mỗi cái một `<g data-accessory>`; phải nhìn rõ ở cỡ 26px (AppShell).
- [ ] **5. Nối Settings, FinishView, 5 chỗ vẽ avatar.** `npm test && npm run typecheck` xanh.
- [ ] **6. Kiểm trên trình duyệt**: hồ sơ thử đặt `xp` đủ cấp 10 (qua Settings › sao lưu/nhập, hoặc IndexedDB ở
  DevTools — chỉ để thử), đeo lần lượt 5 món: chụp ảnh ở 26, 48, 96, 160px — phụ kiện đúng chỗ, không lệch khi Mochi
  `animated`; đổi `skin` (5 màu lông) phụ kiện vẫn hợp.
- [ ] **7. Commit** `feat: phụ kiện cho Mochi mở theo cấp` + dòng STATUS.

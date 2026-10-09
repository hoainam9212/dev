# Task 4: Bàn phím ảo theo HĐH + hình bàn tay chỉ ngón

**Files:**
- Modify: `shared/src/typing/keyboard.ts` (+ `keyboard.test.ts`), `client/src/sims/keyboard/OnScreenKeyboard.tsx`,
  `KeyboardSim.tsx` (+ test)
- Create: `client/src/sims/keyboard/Hands.tsx`, `Hands.test.tsx`

## Interfaces

```ts
// keyboard.ts — đọc file trước: bố cục phím và bảng ngón hiện có
export function keyboardRows(os: OS): KeyCap[][];   // Win: Ctrl Win Alt [Space] Alt Ctrl; Mac: Control Option Command [Space] Command Option
//   KeyCap: { code: string; label: string; width: number; finger: Finger | null } — dùng lại kiểu có sẵn nếu đã có
export type Finger = 'L5' | 'L4' | 'L3' | 'L2' | 'L1' | 'R1' | 'R2' | 'R3' | 'R4' | 'R5';  // giữ tên cũ nếu đã có
```
- Hàng dưới cùng và nhãn phím bổ trợ đổi theo `os` (prop `os` đã có trong `SimProps`). Phím chữ/số giữ nguyên.
- `Hands` (SVG hai bàn tay, nét tròn đơn giản hợp phong cách Mochi): prop `finger: Finger | null` tô sáng ngón cần dùng
  cho phím kế tiếp; `aria-label="Dùng ngón trỏ tay trái"`… Đặt dưới bàn phím ảo trong `KeyboardSim`; ẩn ở chế độ
  "Mèo bắt cá".

## Bước

- [ ] **1. Test (FAIL)**: `keyboardRows('mac')` có Command/Option, không có Win; `'win'` ngược lại; mọi phím chữ có
  `finger`; OnScreenKeyboard với `os="mac"` hiện "⌘"; Hands với `finger="L2"` có nhãn "ngón trỏ tay trái" và đúng
  một ngón được tô (`data-active`).
- [ ] **2. Viết** shared + hai component; `npm test && npm run typecheck` xanh.
- [ ] **3. Kiểm trên trình duyệt**: bài `typing.home1` ở cả hai HĐH; ngón sáng đổi theo từng phím; 390px bàn phím co
  lại không tràn, hình tay vẫn nhìn rõ (ảnh chụp).
- [ ] **4. Commit** `feat(typing): bàn phím ảo theo Win/Mac và hình bàn tay chỉ ngón` + dòng STATUS.

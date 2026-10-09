# Task 5: `Start Tin Hoc.bat` + PWA báo bản mới và cài vào máy

**Files:**
- Create: `Start Tin Hoc.bat` (gốc repo), `client/src/app/UpdateToast.tsx`, `UpdateToast.test.tsx`,
  `client/src/app/useInstallPrompt.ts`
- Modify: `client/src/pwa.ts`, `client/src/main.tsx` hoặc `AppShell.tsx` (gắn toast), `client/src/pages/SettingsPage.tsx`
  (+ test), `README.md`

## Interfaces

```ts
// pwa.ts
export type PwaEvent = 'offlineReady' | 'needRefresh';
export function setupPwa(onEvent: (e: PwaEvent, update: () => void) => void): Promise<void>;
//   registerSW({ immediate: true, onOfflineReady, onNeedRefresh }); `update` gọi updateSW(true)
// UpdateToast: hiện "Có bản mới của Tin Học Cùng Mochi." + nút "Tải lại" (gọi update) + nút "Để sau";
//              offlineReady: "Đã sẵn sàng dùng khi không có mạng." tự ẩn sau 5 s. role="status".
// useInstallPrompt(): { canInstall: boolean; install: () => Promise<void> }  — bắt 'beforeinstallprompt'
```
Cài đặt › mục "Ứng dụng": nút **Cài vào máy** (chỉ hiện khi `canInstall`), kèm chữ giải thích "để mở như một phần mềm,
không cần trình duyệt".

`Start Tin Hoc.bat` (UTF-8 **không BOM**, dòng đầu `@echo off`, rồi `chcp 65001 >nul`):
1. `cd /d "%~dp0"`.
2. Không có `node` (`where node`) → in hướng dẫn cài Node.js LTS tiếng Việt rồi `pause` và thoát.
3. Không có `node_modules` → `call npm install`. Không có `client\dist\index.html` → `call npm run build`.
4. `start "" http://localhost:4174/` rồi `call npm run preview -- --port 4174 --strictPort`.
5. Dòng nhắc: "Đóng cửa sổ này để tắt app."

## Bước

- [ ] **1. Test (FAIL)**: UpdateToast với `needRefresh` hiện nút "Tải lại", bấm gọi `update`; "Để sau" ẩn toast;
  `offlineReady` tự ẩn sau 5 s (fake timers); Settings hiện "Cài vào máy" khi giả lập sự kiện `beforeinstallprompt`,
  không hiện khi chưa có; bấm gọi `prompt()` của sự kiện.
- [ ] **2. Viết** `pwa.ts`, `UpdateToast`, `useInstallPrompt`, nối vào app và Settings. `npm test && npm run typecheck` xanh.
- [ ] **3. Viết `Start Tin Hoc.bat`.** Thử thật: chạy nền bằng PowerShell `Start-Process` (cửa sổ riêng), chờ cổng
  4174 trả 200 (`Invoke-WebRequest`), rồi tắt tiến trình con. Ghi kết quả vào STATUS.
- [ ] **4. Kiểm PWA trên bản build** (Chrome headless + puppeteer-core): lần đầu tải → toast "sẵn sàng dùng khi không có
  mạng"; build lại với một thay đổi nhỏ (ví dụ đổi chữ tạm) rồi tải lại → toast "Có bản mới", bấm Tải lại → trang mới;
  hoàn nguyên thay đổi tạm.
- [ ] **5. README**: mục "Chạy trên máy không cần lập trình" (bấm đúp `Start Tin Hoc.bat`; Mac: `npm run build && npm run preview`).
- [ ] **6. Commit** `feat: Start Tin Hoc.bat, PWA báo bản mới và cài vào máy` + dòng STATUS.

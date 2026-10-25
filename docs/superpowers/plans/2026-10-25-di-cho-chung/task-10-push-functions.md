### Task 10: Thông báo giữa hai máy (FCM + Cloud Function), cảnh báo ngân sách

> **Chặn bởi user:** cần gói Blaze. Đầu task, nếu `firebase deploy --only functions` báo cần nâng cấp → dừng, nhắc user mục "Việc user cần làm" trong STATUS, làm phần Android trước.

**Files:**
- Create: `functions/package.json` (engines node 20, firebase-functions ^6, firebase-admin ^12, typescript, vitest), `functions/tsconfig.json`, `functions/src/index.ts`, `functions/src/message.ts`, `functions/test/message.test.ts`
- Create: `app/.../notify/PushService.kt` (`FirebaseMessagingService`), `notify/TokenSync.kt`
- Modify: `AndroidManifest.xml` (service MESSAGING_EVENT), `App.kt` (đồng bộ token khi có nhà)

**Interfaces:**
- Consumes: event docs `homes/{homeId}/events/{id}` do Task 05 (`sent`) và Task 07 (`finished`) ghi; `members[uid].fcmToken` (Task 04 layout); `Channels.PARTNER` (Task 09).
- Produces:
  ```ts
  export type HomeEvent = { type: "sent" | "finished"; by: string; itemNames?: string[]; wasEmpty?: boolean; picked?: number; total?: number };
  export function messageFor(e: HomeEvent, senderRoleVi: "Vợ" | "Chồng"): { title: string; body: string };
  export const onHomeEvent = onDocumentCreated({ document: "homes/{homeId}/events/{eventId}", region: "asia-northeast1" }, handler);
  ```
  ```kotlin
  object TokenSync { suspend fun push(homeId: String, uid: String) }  // FirebaseMessaging.getInstance().token → members.{uid}.fcmToken
  ```
- `messageFor` — chữ chính xác:
  - `sent`, `wasEmpty` → title `"🧺 <Vai> vừa gửi <n> món cần mua"`, body = tối đa 3 tên nối ", " + (n>3 ? ` +<n-3> món` : "").
  - `sent`, không `wasEmpty` → title `"<Vai> vừa thêm: <3 tên đầu>"` + (n>3 ? ` +<n-3> món` : ""), body `"Mở Cần mua để xem"`.
  - `finished` → title `"<Vai> đã đi chợ xong"`, body `"Nhặt <picked>/<total> món"`.
- Handler: đọc `homes/{homeId}`, gửi tới mọi thành viên **khác** `by` có `fcmToken`; data payload `open_tab=list`; Android `notification.channelId = "partner"`; token hỏng (`messaging/registration-token-not-registered`) → xoá `fcmToken` của thành viên đó. Xoá event doc sau khi gửi.
- `PushService.onMessageReceived` khi app đang mở: hiện thông báo kênh PARTNER như bình thường; `onNewToken` → `TokenSync.push`.

- [ ] **Step 1: Viết test `message.test.ts`:** `sent_wasEmpty_listsUpToThreeNames`; `sent_moreThanThree_addsCount`; `sent_notEmpty_usesAddedWording`; `finished_showsPickedOverTotal`; `roleLabel_isVietnamese` (không ra "vo"/"chong").
- [ ] **Step 2:** `cd functions && npm i && npx vitest run` → FAIL.
- [ ] **Step 3:** Viết `message.ts` → PASS; viết `index.ts`; `npm run build` (tsc) → không lỗi.
- [ ] **Step 4:** Viết `PushService`, `TokenSync`; `assembleDebug` → OK.
- [ ] **Step 5:** Deploy: `firebase deploy --only functions,storage --project <id>`. Lỗi đòi Blaze → dừng và báo user.
- [ ] **Step 6:** Cảnh báo ngân sách ¥100: `gcloud billing projects describe <id>` lấy billing account → `gcloud billing budgets create --billing-account=<acct> --display-name="di-cho-chung ¥100" --budget-amount=100JPY --filter-projects=projects/<id> --threshold-rule=percent=0.5 --threshold-rule=percent=1.0`. Không đủ quyền → hướng dẫn user tạo trong Console (Billing → Budgets & alerts).
- [ ] **Step 7:** Thử function đã deploy: script `functions/scripts/send-test-event.mjs <homeId>` (firebase-admin + ADC) tạo một nhà thử với `fcmToken` giả rồi ghi event `sent`; đạt khi `firebase functions:log --only onHomeEvent` có dòng gửi và dòng xoá token hỏng. Xoá nhà thử. Nhận thông báo trên máy thật kiểm ở Task 13 Step 4.
- [ ] **Step 8:** Cập nhật `STATUS.md`; commit `feat: push partner notifications through a Cloud Function`.

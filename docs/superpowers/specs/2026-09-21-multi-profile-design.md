# Nhiều người học trên một máy – Thiết kế

Bổ sung cho `2026-09-19-office-neko-design.md` (mục 6.3 Lưu trữ, mục 8 Trò chơi hoá). Mọi thứ không nhắc tới ở đây giữ nguyên như thiết kế gốc.

## 1. Mục tiêu

Một máy tính có nhiều người học — hai anh em, hai vợ chồng, mấy người trong một nhà, hoặc một phòng máy. Mỗi người chọn tên mình rồi học tiếp đúng tiến độ của mình: bài đã xong, sao, XP, chuỗi ngày, thống kê gõ phím, cài đặt riêng.

Không phải mục tiêu: bảo mật. App chạy hoàn toàn trong máy, không server; ai mở DevTools cũng sửa được dữ liệu. Hồ sơ ở đây là để **không lẫn tiến độ của nhau**, không phải để giấu nhau.

## 2. Ngoài phạm vi (YAGNI)

- Mã PIN hay bất kỳ hình thức đăng nhập nào.
- Ảnh đại diện tự tải lên (chỉ chọn trong bộ mèo Mochi có sẵn).
- Đồng bộ giữa các máy, tài khoản đám mây.
- Màn hình cho giáo viên xem tiến độ của học viên khác.
- Giới hạn số người trên một máy.

## 3. Quyết định đã chốt

| Câu hỏi | Chốt |
|---|---|
| Mở app hiện gì trước | Luôn hiện màn "Ai đang học?" |
| Bảo vệ hồ sơ | Không khoá gì cả — chọn tên là vào |
| File sao lưu | Một file chứa **tất cả** mọi người, khôi phục là thay toàn bộ máy |
| Mô hình dữ liệu | Một database, mọi bảng thêm `profileId` vào khoá |

Hai mô hình dữ liệu đã cân nhắc rồi bỏ: *mỗi hồ sơ một database riêng* (phải đổi `db` singleton thành factory, sao lưu phải duyệt nhiều DB, `liveQuery` bám instance nên đổi người là remount cả app) và *khoá tổ hợp dạng chuỗi* `p1:basics.welcome` (muốn lấy dữ liệu một người phải quét cả bảng, khoá mất kiểu, dữ liệu cũ vẫn phải đổi khoá).

## 4. Dữ liệu

### 4.1 Bảng `profiles` (thay bảng `profile`)

```ts
interface Profile {
  id: string;              // 'p1', 'p2', … xem quy tắc sinh id ngay dưới bảng
  name: string;            // tên hiển thị, tối đa 40 ký tự
  avatar: AvatarId;        // 'cam' | 'hong' | 'xanh' | 'tim' | 'vang' | 'mint'
  os: OS;
  dailyGoalMin: 5 | 10 | 20;
  fontScale: 'md' | 'lg' | 'xl';
  sound: boolean;
  reducedMotion: boolean;
  unlockAll?: boolean;
  xp: number;
  createdAt: string;       // ISO
  lastActiveAt: string;    // ISO, cập nhật khi chọn hồ sơ
}
```

**Sinh id:** `p<n>` với `n` = số lớn nhất đang có trong bảng, cộng một (bảng rỗng → `p1`). Id của hồ sơ đã xoá **không** dùng lại, để dữ liệu sót lại — nếu có — không bao giờ dính vào người mới.

Tên **không** bắt buộc duy nhất — hai người trùng tên vẫn là hai hồ sơ khác nhau, phân biệt bằng ảnh đại diện. Màn chọn người nhắc nhẹ "Đã có người tên này rồi, chọn ảnh khác cho dễ phân biệt nhé" khi tạo trùng tên, nhưng không chặn.

### 4.2 Khoá của các bảng dữ liệu

Dexie `version(2)`:

| Bảng | Khoá v1 | Khoá v2 |
|---|---|---|
| `profiles` | (mới) | `id` |
| `progress` | `lessonId` | `[profileId+lessonId]` |
| `activity` | `day` | `[profileId+day]` |
| `keyStats` | `key` | `[profileId+key]` |
| `badges` | `id` | `[profileId+id]` |
| `typingRuns` | `++id, at` | `++id, [profileId+at]` |
| `sandboxDocs` | `id, sim, updatedAt` | `id, [profileId+updatedAt]` |
| `profile` | `id` | (xoá) |

Mỗi dòng của các bảng trên mang thêm trường `profileId: string`.

### 4.3 Di trú v1 → v2

Trong `upgrade` của `version(2)`:

1. Đọc hàng `profile` cũ (`id: 'me'`). Không có → không có gì để di trú, dừng.
2. Tạo `profiles` với `id: 'p1'`, giữ nguyên `name`, `os`, `dailyGoalMin`, `fontScale`, `sound`, `reducedMotion`, `unlockAll`, `xp`, `createdAt`; `avatar: 'cam'`; `lastActiveAt` = thời điểm di trú.
3. Gán `profileId: 'p1'` cho **mọi** dòng của 6 bảng dữ liệu.
4. Xoá bảng `profile`.

Người đang dùng app mở lên phải thấy **nguyên vẹn** tiến độ cũ dưới tên cũ của mình. Đây là ràng buộc cứng, có test riêng.

### 4.4 Người học đang chọn

`localStorage['office-neko.currentProfileId']`. Chỉ là con trỏ: mất hoặc trỏ vào hồ sơ đã xoá thì app quay về màn "Ai đang học?", không mất dữ liệu gì. Không lưu trong IndexedDB để việc chọn người không phải là một thao tác ghi CSDL.

## 5. Luồng màn hình

```
mở app → /who  "Ai đang học?"
            ├── bấm một thẻ người  → lưu currentProfileId → /  (bản đồ của người đó)
            └── bấm "+ Thêm người mới" → /welcome (màn hình chào đã có) → tạo hồ sơ → /
thanh trên cùng: [ảnh + tên]  → bấm → /who
```

- `/who` là màn hình duy nhất được vào khi chưa chọn ai. Mọi đường khác (`/`, `/lesson/...`, `/typing`) đều chuyển về `/who` nếu `currentProfileId` rỗng hoặc trỏ vào hồ sơ không còn.
- Không còn hồ sơ nào trên máy → `/who` tự chuyển sang `/welcome`.
- Thẻ người hiển thị: mèo Mochi theo `avatar`, tên, và một dòng phụ "Cấp 3 · 12 bài đã xong". Sắp xếp theo `lastActiveAt` giảm dần, người học gần nhất đứng đầu.
- `/welcome` giữ nguyên các bước hiện có, thêm một bước chọn ảnh đại diện (6 con mèo màu khác nhau).

## 6. Tầng dữ liệu trong mã nguồn

Nguyên tắc: **không hàm nào tự đoán "người hiện tại"**. Mọi hàm đọc/ghi nhận `profileId` làm tham số; chỉ tầng React biết ai đang học.

| Chỗ | Đổi thành |
|---|---|
| `db/profile.tsx` | `ProfileProvider` đọc hồ sơ theo `currentProfileId`; thêm `useProfileId()`; `createProfile` sinh id mới; `updateProfile(id, patch)` |
| `progress/record.ts` | `recordLessonResult({ profileId, … })` |
| `progress/typing.ts` | `recordTypingRun({ profileId, … })`, `useTypingHub(profileId, limit)` |
| `progress/useStats.ts` | `useCompleted(profileId)`, `useStreak(profileId)`, `useTodayMinutes(profileId)` |
| `progress/backup.ts` | Xuất/nhập gồm cả bảng `profiles`, `BACKUP_SCHEMA = 2` |
| Thêm mới | `profiles/ProfilePicker.tsx` (màn `/who`), `profiles/avatars.ts`, `profiles/manage.ts` (tạo/đổi/xoá hồ sơ) |

`useTypingHub` hiện gom subscription theo `limit` (xem chú thích dài trong `typing.ts`); khoá của map chuyển thành `` `${profileId}:${limit}` `` để hai người không dùng chung snapshot.

## 7. Quản lý hồ sơ trong Cài đặt

Mục **Hồ sơ** hiện có thêm phần chọn ảnh đại diện.

Mục mới **Người học trên máy này**: danh sách mọi hồ sơ (ảnh, tên, "học gần nhất: hôm qua"), mỗi dòng có nút **Xoá**. Xoá phải gõ lại đúng tên người đó rồi mới bật được nút xác nhận — chặn tai nạn mất tiến độ. Xoá hồ sơ thì xoá luôn mọi dòng của người đó ở 6 bảng dữ liệu, trong một transaction. Không cho xoá hồ sơ cuối cùng còn lại; không cho xoá chính hồ sơ đang học (đổi người trước đã).

## 8. Sao lưu

- `BACKUP_SCHEMA = 2`. File gồm 7 bảng: `profiles` + 6 bảng dữ liệu.
- Khôi phục **thay toàn bộ** dữ liệu trên máy, đúng như hiện nay. Câu xác nhận nói rõ số người trong file: "File này có 3 người học. Toàn bộ dữ liệu hiện tại trên máy sẽ được thay thế."
- Nhập file **v1**: vẫn chấp nhận. Chuyển đổi ngay lúc nhập theo đúng quy tắc di trú ở mục 4.3 — file v1 thành một hồ sơ `p1`.
- Sau khi khôi phục, `currentProfileId` bị xoá và app quay về `/who`.

## 9. Kiểm thử

Bắt buộc có test cho:

1. **Di trú v1 → v2**: dựng DB v1 có hồ sơ + tiến độ + hoạt động + thống kê phím, mở ở v2, kiểm tra hồ sơ `p1` giữ đúng tên/XP và **mọi** dòng cũ đều có `profileId: 'p1'`, không mất dòng nào.
2. **Tách biệt**: hai hồ sơ học hai bài khác nhau — tiến độ, XP, chuỗi ngày, `keyStats` của người này không ảnh hưởng người kia.
3. **Màn chọn người**: hiện đủ thẻ, sắp đúng thứ tự, bấm vào là vào bản đồ của đúng người; máy trống thì về `/welcome`.
4. **Đổi người**: đang ở bản đồ, đổi sang người khác thì bản đồ, sao và khu Luyện gõ đổi theo.
5. **Chuyển hướng**: `currentProfileId` trỏ vào hồ sơ đã xoá → về `/who`, không văng lỗi.
6. **Xoá hồ sơ**: dọn hết dữ liệu của riêng người đó, người khác nguyên vẹn; không xoá được người cuối cùng; không xoá được chính mình khi đang học.
7. **Sao lưu**: xuất rồi nhập lại ra đúng dữ liệu cũ; nhập file v1 thành một hồ sơ.

Mọi test hiện có của `client/` phải vẫn xanh sau khi đổi — nếu một test cũ hỏng vì thiếu `profileId`, sửa test theo API mới chứ không nới lỏng phần khẳng định.

## 10. Thứ tự triển khai

Kế hoạch chi tiết tách theo khuôn của giai đoạn 3 (`00-overview.md` + `STATUS.md` + một file mỗi task). Trình tự:

1. Schema v2 + di trú + `manage.ts` (tạo/xoá hồ sơ) — chỉ tầng dữ liệu, có test di trú.
2. `ProfileProvider` theo `currentProfileId` + các hàm tiến độ nhận `profileId`.
3. Màn `/who` + nút đổi người trên thanh trên cùng + chọn ảnh ở màn hình chào.
4. Cài đặt: ảnh đại diện + danh sách người học + xoá hồ sơ.
5. Sao lưu v2 + nhập file v1.
6. Kiểm tra tổng thể trên trình duyệt với ba hồ sơ thật.

Mỗi task có bước kiểm tra trình duyệt của riêng nó; task cuối chỉ là đi một lượt, không phải nơi săn lỗi.

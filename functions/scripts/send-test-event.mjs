// Thử function đã deploy (Task 10 Step 7), chạy trên máy gốc với gcloud ADC:
//   cd functions && node scripts/send-test-event.mjs test-home-1
// Tạo nhà thử có một token giả → ghi event "sent" → chờ function xử lý → in kết quả → xoá nhà thử.
// Đạt khi event bị xoá và `npm run logs` có dòng "sent" (failed: 1). Token giả sai định dạng FCM có thể trả
// "invalid-argument" thay vì "not-registered" → function giữ token (không xoá nhầm khi lỗi do nội dung tin);
// token hết hạn thật (gỡ app) mới bị gỡ — kiểm ở Task 13.
import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const homeId = process.argv[2];
if (!homeId) {
  console.error("Dùng: node scripts/send-test-event.mjs <homeId>");
  process.exit(1);
}

initializeApp({ credential: applicationDefault(), projectId: "di-cho-chung" });
const db = getFirestore();
const home = db.collection("homes").doc(homeId);

await home.set({
  members: {
    test_sender: { role: "vo", name: "Thử gửi" },
    test_receiver: { role: "chong", name: "Thử nhận", fcmToken: "fake-token-for-task-10" },
  },
});
const event = await home.collection("events").add({
  type: "sent",
  by: "test_sender",
  itemNames: ["Thịt ba chỉ", "Rau muống", "Trứng gà", "Sữa tươi"],
  wasEmpty: true,
  createdAt: new Date(),
});
console.log("Đã ghi event", event.path);

let gone = false;
for (let i = 0; i < 30 && !gone; i++) {
  await new Promise((r) => setTimeout(r, 2000));
  gone = !(await event.get()).exists;
}
const token = (await home.get()).get("members.test_receiver.fcmToken");
console.log(gone ? "✔ event đã bị function xoá" : "✘ event vẫn còn sau 60 s");
console.log(token === undefined ? "token giả đã bị gỡ" : "token giả còn (FCM coi là sai định dạng, không phải hết hạn)");

await home.delete();
console.log("Đã xoá nhà thử", homeId);
process.exit(gone ? 0 : 1);

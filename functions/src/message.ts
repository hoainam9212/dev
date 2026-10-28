/** Nội dung thông báo giữa người nhà — hàm thuần, không đụng Firebase để test được. */
import type { Message } from "firebase-admin/messaging";

export type HomeEvent = {
  type: "sent" | "finished";
  by: string;
  itemNames?: string[];
  wasEmpty?: boolean;
  picked?: number;
  total?: number;
};

export type Member = { role?: string; name?: string; fcmToken?: string };
export type Members = Record<string, Member>;

const ROLE_NAMES: Record<string, string> = { vo: "Vợ", chong: "Chồng", con: "Con", ong: "Ông", ba: "Bà" };
const FALLBACK_NAME = "Người nhà";
const SHOWN = 3;

/** Tên hiển thị members[uid].name; trống thì tên mặc định theo vai (như Role.defaultName trên app). */
export function displayName(members: Members, uid: string): string {
  const m = members[uid];
  const name = m?.name?.trim();
  if (name) return name;
  return (m?.role && ROLE_NAMES[m.role]) || FALLBACK_NAME;
}

/** "A, B, C +2 món" — tối đa 3 tên. */
function names(list: string[]): string {
  const head = list.slice(0, SHOWN).join(", ");
  return list.length > SHOWN ? `${head} +${list.length - SHOWN} món` : head;
}

export function messageFor(e: HomeEvent, senderName: string): { title: string; body: string } {
  if (e.type === "finished") {
    return { title: `${senderName} đã đi chợ xong`, body: `Nhặt ${e.picked ?? 0}/${e.total ?? 0} món` };
  }
  const list = e.itemNames ?? [];
  if (e.wasEmpty) {
    return { title: `🧺 ${senderName} vừa gửi ${list.length} món cần mua`, body: names(list) };
  }
  return { title: `${senderName} vừa thêm: ${names(list)}`, body: "Mở Cần mua để xem" };
}

/** Mọi thành viên khác người làm, có fcmToken. */
export function recipients(members: Members, by: string): { uid: string; token: string }[] {
  return Object.entries(members)
    .filter(([uid, m]) => uid !== by && typeof m?.fcmToken === "string" && m.fcmToken.length > 0)
    .map(([uid, m]) => ({ uid, token: m.fcmToken as string }));
}

/** Đọc event doc; thiếu trường hay loại lạ → null (bỏ qua, vẫn xoá doc). */
export function parseEvent(data: Record<string, unknown> | undefined): HomeEvent | null {
  if (!data || typeof data.by !== "string" || !data.by) return null;
  if (data.type === "sent") {
    const itemNames = Array.isArray(data.itemNames) ? data.itemNames.filter((n): n is string => typeof n === "string") : [];
    if (itemNames.length === 0) return null;
    return { type: "sent", by: data.by, itemNames, wasEmpty: data.wasEmpty === true };
  }
  if (data.type === "finished") {
    const num = (v: unknown) => (typeof v === "number" ? v : 0);
    return { type: "finished", by: data.by, picked: num(data.picked), total: num(data.total) };
  }
  return null;
}

/**
 * Tin FCM chỉ có data (không có notification): app luôn nhận onMessageReceived, kể cả lúc ở nền, để tự vẽ thông
 * báo và bật ("sent") / tắt ("finished") theo dõi siêu thị.
 */
export function fcmMessage(token: string, type: HomeEvent["type"], m: { title: string; body: string }): Message {
  return { token, data: { type, title: m.title, body: m.body, open_tab: "list" }, android: { priority: "high" } };
}

/** Token không còn dùng được (gỡ app, đổi máy) → xoá members.<uid>.fcmToken. */
export function isDeadToken(code: string | undefined): boolean {
  return code === "messaging/registration-token-not-registered" || code === "messaging/invalid-registration-token";
}

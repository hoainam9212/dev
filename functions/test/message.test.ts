import { describe, expect, it } from "vitest";
import { displayName, fcmMessage, isDeadToken, messageFor, parseEvent, recipients, type Members } from "../src/message";

const members: Members = {
  u_vo: { role: "vo", name: "Lan", fcmToken: "tok_vo" },
  u_chong: { role: "chong", name: "Nam", fcmToken: "tok_chong" },
  u_con: { role: "con", name: "Bin" },
  u_ba: { role: "ba", name: "  ", fcmToken: "tok_ba" },
};

describe("messageFor", () => {
  it("sent_wasEmpty_listsUpToThreeNames", () => {
    const m = messageFor({ type: "sent", by: "u_vo", itemNames: ["Thịt ba chỉ", "Rau muống", "Trứng gà"], wasEmpty: true }, "Lan");
    expect(m).toEqual({ title: "🧺 Lan vừa gửi 3 món cần mua", body: "Thịt ba chỉ, Rau muống, Trứng gà" });
  });

  it("sent_moreThanThree_addsCount", () => {
    const m = messageFor(
      { type: "sent", by: "u_vo", itemNames: ["Thịt ba chỉ", "Rau muống", "Trứng gà", "Sữa tươi", "Đậu phụ"], wasEmpty: true },
      "Lan",
    );
    expect(m).toEqual({ title: "🧺 Lan vừa gửi 5 món cần mua", body: "Thịt ba chỉ, Rau muống, Trứng gà +2 món" });
  });

  it("sent_notEmpty_usesAddedWording", () => {
    expect(messageFor({ type: "sent", by: "u_chong", itemNames: ["Bia", "Đá"], wasEmpty: false }, "Nam")).toEqual({
      title: "Nam vừa thêm: Bia, Đá",
      body: "Mở Cần mua để xem",
    });
    expect(messageFor({ type: "sent", by: "u_chong", itemNames: ["Bia", "Đá", "Mực", "Tôm"] }, "Nam")).toEqual({
      title: "Nam vừa thêm: Bia, Đá, Mực +1 món",
      body: "Mở Cần mua để xem",
    });
  });

  it("finished_showsPickedOverTotal", () => {
    expect(messageFor({ type: "finished", by: "u_chong", picked: 7, total: 9 }, "Nam")).toEqual({
      title: "Nam đã đi chợ xong",
      body: "Nhặt 7/9 món",
    });
  });

  it("senderName_isDisplayName", () => {
    expect(displayName(members, "u_vo")).toBe("Lan");
    // Tên trống → tên mặc định theo vai, không bao giờ ra "ba" / uid.
    expect(displayName(members, "u_ba")).toBe("Bà");
    expect(displayName({ x: { role: "khac", name: "" } }, "x")).toBe("Người nhà");
    expect(displayName(members, "u_gone")).toBe("Người nhà");
    const m = messageFor({ type: "finished", by: "u_vo", picked: 1, total: 1 }, displayName(members, "u_vo"));
    expect(m.title).toBe("Lan đã đi chợ xong");
  });
});

describe("recipients", () => {
  it("everyoneElseWithToken", () => {
    expect(recipients(members, "u_vo")).toEqual([
      { uid: "u_chong", token: "tok_chong" },
      { uid: "u_ba", token: "tok_ba" },
    ]);
  });

  it("skipsBlankTokens", () => {
    expect(recipients({ a: { role: "vo", name: "A" }, b: { role: "chong", name: "B", fcmToken: "" } }, "a")).toEqual([]);
  });
});

describe("parseEvent", () => {
  it("readsSentAndFinished", () => {
    expect(parseEvent({ type: "sent", by: "u", itemNames: ["A", 3, "B"], wasEmpty: true, createdAt: 1 })).toEqual({
      type: "sent",
      by: "u",
      itemNames: ["A", "B"],
      wasEmpty: true,
    });
    expect(parseEvent({ type: "finished", by: "u", picked: 2, total: 5 })).toEqual({ type: "finished", by: "u", picked: 2, total: 5 });
  });

  it("rejectsUnknownOrIncomplete", () => {
    expect(parseEvent(undefined)).toBeNull();
    expect(parseEvent({ type: "going", by: "u" })).toBeNull();
    expect(parseEvent({ type: "sent" })).toBeNull();
    expect(parseEvent({ type: "sent", by: "u", itemNames: [] })).toBeNull();
  });
});

describe("isDeadToken", () => {
  it("onlyUnregisteredOrInvalidTokens", () => {
    expect(isDeadToken("messaging/registration-token-not-registered")).toBe(true);
    expect(isDeadToken("messaging/invalid-registration-token")).toBe(true);
    expect(isDeadToken("messaging/internal-error")).toBe(false);
    expect(isDeadToken(undefined)).toBe(false);
  });
});

describe("fcmMessage", () => {
  it("dataOnly_soAppSeesItInBackground", () => {
    // Không có trường notification: app luôn nhận onMessageReceived (cả lúc ở nền) để tự vẽ thông báo và bật / tắt
    // theo dõi siêu thị theo type.
    expect(fcmMessage("tok", "sent", { title: "T", body: "B" })).toEqual({
      token: "tok",
      data: { type: "sent", title: "T", body: "B", open_tab: "list" },
      android: { priority: "high" },
    });
    expect(fcmMessage("tok", "finished", { title: "T", body: "B" }).data?.type).toBe("finished");
  });
});

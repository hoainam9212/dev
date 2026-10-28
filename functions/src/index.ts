import { initializeApp } from "firebase-admin/app";
import { FieldValue, getFirestore } from "firebase-admin/firestore";
import { getMessaging, type Message } from "firebase-admin/messaging";
import { logger } from "firebase-functions";
import { onDocumentCreated } from "firebase-functions/v2/firestore";
import { displayName, isDeadToken, messageFor, parseEvent, recipients, type Members } from "./message";

initializeApp();

/**
 * App ghi `homes/{homeId}/events/{id}` khi gửi món ("sent", Task 05) hoặc đi chợ xong ("finished", Task 07);
 * function gửi FCM tới mọi thành viên khác người làm rồi xoá event.
 */
export const onHomeEvent = onDocumentCreated(
  { document: "homes/{homeId}/events/{eventId}", region: "asia-northeast1" },
  async (event) => {
    const snap = event.data;
    if (!snap) return;
    const { homeId } = event.params;
    const homeEvent = parseEvent(snap.data());
    if (!homeEvent) {
      logger.warn("bad event", { homeId, eventId: event.params.eventId });
      await snap.ref.delete();
      return;
    }

    const homeRef = getFirestore().collection("homes").doc(homeId);
    const home = await homeRef.get();
    const members = (home.get("members") ?? {}) as Members;
    const to = recipients(members, homeEvent.by);
    if (to.length > 0) {
      const { title, body } = messageFor(homeEvent, displayName(members, homeEvent.by));
      const messages: Message[] = to.map(({ token }) => ({
        token,
        notification: { title, body },
        data: { open_tab: "list" },
        android: { priority: "high", notification: { channelId: "partner" } },
      }));
      const result = await getMessaging().sendEach(messages);
      logger.info("sent", { homeId, type: homeEvent.type, ok: result.successCount, failed: result.failureCount });

      const dead: Record<string, FieldValue> = {};
      result.responses.forEach((r, i) => {
        if (!r.success && isDeadToken(r.error?.code)) dead[`members.${to[i].uid}.fcmToken`] = FieldValue.delete();
        else if (!r.success) logger.warn("send failed", { homeId, uid: to[i].uid, code: r.error?.code });
      });
      if (Object.keys(dead).length > 0) {
        await homeRef.update(dead);
        logger.info("removed dead tokens", { homeId, count: Object.keys(dead).length });
      }
    }
    await snap.ref.delete();
  },
);

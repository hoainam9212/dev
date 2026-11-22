import { createContext, useContext, useEffect, useMemo, useSyncExternalStore, type ReactNode } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { detectOs, type OS } from '@office-neko/shared';
import { db, type Profile } from './db';
import { clearCurrentProfileId, useCurrentProfileId } from '../profiles/current';

export { createProfile, deleteProfile, listProfiles, touchProfile, updateProfile, type NewProfile } from '../profiles/manage';

export const ProfileContext = createContext<Profile | null | undefined>(undefined);

/** "Dáng" tạm của một trang, thắng cỡ chữ/chế độ của hồ sơ đang chọn cho tới khi trang trả lại (null). */
export interface PreviewLook {
  fontScale: Profile['fontScale'];
  easy: boolean;
}
let previewLook: PreviewLook | null = null;
const lookListeners = new Set<() => void>();
function subscribeLook(cb: () => void): () => void {
  lookListeners.add(cb);
  return () => lookListeners.delete(cb);
}
function getPreviewLook(): PreviewLook | null {
  return previewLook;
}
export function setPreviewLook(look: PreviewLook | null): void {
  previewLook = look;
  lookListeners.forEach((cb) => cb());
}

export function ProfileProvider({ children }: { children: ReactNode }) {
  const id = useCurrentProfileId();
  // Kết quả mang theo id đã dùng để truy vấn: ngay sau khi đổi người,
  // `useLiveQuery` còn trả kết quả của id cũ trong một lần render — coi kết quả
  // lệch id là "đang tải" thay vì tin nhầm là "hồ sơ không tồn tại".
  const found = useLiveQuery(
    async () => ({ forId: id, profile: id ? ((await db.profiles.get(id)) ?? null) : null }),
    [id],
  );
  const fresh = found && found.forId === id ? found : undefined;
  const profile = fresh ? fresh.profile : undefined;

  // Con trỏ trỏ vào hồ sơ không còn (bị xoá, hoặc khôi phục từ file sao lưu):
  // dọn con trỏ để app quay về màn chọn người thay vì kẹt ở màn hình trắng.
  useEffect(() => {
    if (id && fresh && fresh.profile === null) clearCurrentProfileId();
  }, [id, fresh]);

  // Trang đang mở có thể đặt "dáng" trước khi có hồ sơ (vd. /de-dung chưa tạo hồ sơ mà đã cần chữ to).
  const preview = useSyncExternalStore(subscribeLook, getPreviewLook, getPreviewLook);
  const font = preview?.fontScale ?? profile?.fontScale ?? 'md';
  const easy = preview?.easy ?? profile?.easyMode ?? false;

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.font = font;
    if (profile?.reducedMotion) root.dataset.motion = 'reduce';
    else delete root.dataset.motion;
    if (easy) root.dataset.easy = '1';
    else delete root.dataset.easy;
  }, [font, profile?.reducedMotion, easy]);

  // id rỗng ⇒ null: chưa chọn ai (khác với undefined = đang tải).
  return <ProfileContext.Provider value={id ? profile : null}>{children}</ProfileContext.Provider>;
}

export function useProfile(): Profile | null | undefined {
  return useContext(ProfileContext);
}

/** Id của người đang học, hoặc null khi chưa chọn ai / hồ sơ không còn. */
export function useProfileId(): string | null {
  return useProfile()?.id ?? null;
}

export function guessOs(): OS {
  if (typeof navigator === 'undefined') return 'win';
  const uaData = (navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData;
  return detectOs(uaData?.platform || navigator.platform || navigator.userAgent || '');
}

export function useOs(): OS {
  return useProfile()?.os ?? guessOs();
}

/** Người hướng dẫn đã bật "Mở khoá toàn bộ bài học" trong Cài đặt chưa. */
export function useUnlockAll(): boolean {
  return useProfile()?.unlockAll ?? false;
}

const NO_TESTED_OUT: string[] = [];

/** Lộ trình người đang học đã mở khoá bằng kiểm tra đầu vào. */
export function useTestedOut(): ReadonlySet<string> {
  const list = useProfile()?.testedOut ?? NO_TESTED_OUT;
  const key = list.join('|');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => new Set(list), [key]);
}

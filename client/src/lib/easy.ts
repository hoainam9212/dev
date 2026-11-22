import type { Track } from '@office-neko/shared';
import { TRACKS } from '../content';
import { useProfile } from '../db/profile';

/** Người đang học có bật chế độ dễ dùng (người lớn tuổi) không. */
export function useEasyMode(): boolean {
  return useProfile()?.easyMode ?? false;
}

/** Thứ tự lộ trình cho người lớn tuổi; Gõ phím 10 ngón và Dùng AI bị ẩn. */
export const EASY_TRACK_ORDER = ['basics', 'ppt', 'word', 'excel'] as const;

const EASY_TRACKS: Track[] = EASY_TRACK_ORDER.map((id, order) => ({ ...TRACKS.find((t) => t.id === id)!, order }));

/** Lộ trình người học thấy: tắt ⇒ `TRACKS` nguyên vẹn; bật ⇒ bản sao 4 lộ trình, `order` 0..3. */
export function tracksFor(easy: boolean): Track[] {
  return easy ? EASY_TRACKS : TRACKS;
}

export function useTracks(): Track[] {
  return tracksFor(useEasyMode());
}

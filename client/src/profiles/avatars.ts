import type { AvatarId } from '../db/db';

export interface AvatarSkin {
  id: AvatarId;
  label: string;
  /** Màu lông chính (thân, đầu). */
  fur: string;
  /** Màu mảng vá (tai, đuôi, vệt lưng). */
  patch: string;
}

/**
 * Sáu bộ màu mèo. Chỉ đổi lông và mảng vá — mắt, mũi, miệng giữ nguyên để Mochi
 * lúc nào cũng là Mochi. Màu lông luôn sáng để nét mực đậm nổi rõ trên đó.
 */
export const AVATARS: AvatarSkin[] = [
  { id: 'cam', label: 'Mèo cam', fur: '#FFF1E2', patch: '#F0954E' },
  { id: 'hong', label: 'Mèo hồng', fur: '#FFEAF1', patch: '#E4699A' },
  { id: 'xanh', label: 'Mèo xanh', fur: '#E6F2FD', patch: '#4C92D8' },
  { id: 'tim', label: 'Mèo tím', fur: '#F0EAFB', patch: '#8B72D0' },
  { id: 'vang', label: 'Mèo vàng', fur: '#FFF6D9', patch: '#D9A020' },
  { id: 'mint', label: 'Mèo bạc hà', fur: '#E3F7EF', patch: '#31A97F' },
];

const BY_ID = new Map(AVATARS.map((a) => [a.id, a]));

/** Bộ màu theo id; id lạ (dữ liệu cũ, file sao lưu hỏng) rơi về con mèo đầu tiên. */
export function avatarSkin(id: AvatarId | string | undefined): AvatarSkin {
  return BY_ID.get(id as AvatarId) ?? AVATARS[0]!;
}

import { useProfile } from '../db/profile';

/** Người đang học có bật chế độ dễ dùng (người lớn tuổi) không. */
export function useEasyMode(): boolean {
  return useProfile()?.easyMode ?? false;
}

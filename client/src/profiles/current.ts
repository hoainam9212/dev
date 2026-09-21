import { useSyncExternalStore } from 'react';

export const CURRENT_KEY = 'office-neko.currentProfileId';

/**
 * Người đang học chỉ là một con trỏ trong `localStorage` — mất hay trỏ sai thì
 * cùng lắm phải chọn lại tên, không mất dữ liệu học tập. Đây là chỗ DUY NHẤT
 * trong mã được phép đọc con trỏ này; mọi hàm dữ liệu khác nhận `profileId`
 * làm tham số.
 */
const listeners = new Set<() => void>();

function notify(): void {
  listeners.forEach((l) => l());
}

export function getCurrentProfileId(): string | null {
  try {
    return localStorage.getItem(CURRENT_KEY);
  } catch {
    // Chế độ riêng tư hoặc trình duyệt chặn: coi như chưa chọn ai.
    return null;
  }
}

export function setCurrentProfileId(id: string): void {
  try {
    localStorage.setItem(CURRENT_KEY, id);
  } catch {
    // Không lưu được thì thôi; app vẫn chạy tiếp trong phiên này.
  }
  notify();
}

export function clearCurrentProfileId(): void {
  try {
    localStorage.removeItem(CURRENT_KEY);
  } catch {
    // như trên
  }
  notify();
}

/** Đăng ký nhận thay đổi (cả tab này lẫn tab khác). Trả về hàm huỷ đăng ký. */
export function subscribeCurrentProfileId(fn: () => void): () => void {
  listeners.add(fn);
  const onStorage = (e: StorageEvent) => {
    if (e.key === null || e.key === CURRENT_KEY) fn();
  };
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(fn);
    window.removeEventListener('storage', onStorage);
  };
}

export function useCurrentProfileId(): string | null {
  return useSyncExternalStore(subscribeCurrentProfileId, getCurrentProfileId, () => null);
}

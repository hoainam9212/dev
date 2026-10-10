import type { pptSim } from '@office-neko/shared';

type Effect = Exclude<pptSim.Transition, 'none'>;

/** Lớp CSS chạy hiệu ứng 300 ms; dùng chung cho Preview ở khung soạn và cho chế độ trình chiếu. */
export const TRANSITION_CLASS: Record<Effect, string> = {
  fade: 'ppt-tr-fade',
  push: 'ppt-tr-push',
  zoom: 'ppt-tr-zoom',
};

/** Bộ sưu tập Transition to This Slide: tên tiếng Anh như PowerPoint, nghĩa tiếng Việt ở nhãn. */
export const TRANSITIONS: { id: pptSim.Transition; label: string; vi: string }[] = [
  { id: 'none', label: 'None', vi: 'Không có' },
  { id: 'fade', label: 'Fade', vi: 'Mờ dần' },
  { id: 'push', label: 'Push', vi: 'Đẩy sang' },
  { id: 'zoom', label: 'Zoom', vi: 'Phóng to' },
];

/** Lớp hiệu ứng của một slide, hoặc chuỗi rỗng khi slide không có chuyển cảnh. */
export function transitionClass(t: pptSim.Transition | undefined): string {
  return t && t !== 'none' ? TRANSITION_CLASS[t] : '';
}

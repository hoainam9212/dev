/**
 * Lời dễ hiểu cho người lớn tuổi, ghi đè chữ của một bước. `kind` phải trùng loại bước gốc
 * (test `easy.test.ts` kiểm). Chỉ có chữ: không đụng đề bài máy chấm, lời giải, ảnh, khung đánh dấu.
 */
export type EasyStep =
  | { kind: 'explain'; body?: string }
  | { kind: 'quiz'; question?: string; /** Đủ số lượng, cùng thứ tự với bản gốc để `answer` vẫn đúng. */ choices?: string[]; why?: string }
  | { kind: 'practice'; task?: string; /** Gợi ý bậc 1. */ hint?: string; /** Gợi ý bậc 3: lời giải từng bước. */ steps?: string[] }
  | { kind: 'realShot'; caption?: string };

export interface EasyLesson {
  title?: string;
  osNote?: { win?: string; mac?: string };
  /** Khoá là vị trí bước trong `lesson.steps`, đếm từ 0. */
  steps?: Record<number, EasyStep>;
}

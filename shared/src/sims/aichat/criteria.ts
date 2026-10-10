/** Năm phần của một prompt tốt. Đây là góp ý cho người học, không phải bài thi: chấm bằng từ khoá, dễ dãi. */
export type Criterion = 'role' | 'context' | 'task' | 'format' | 'limits';

export const CRITERIA: readonly { id: Criterion; vi: string; tip: string }[] = [
  { id: 'role', vi: 'Vai trò', tip: 'Bảo AI đóng vai ai, ví dụ: "Bạn là nhân viên hành chính giỏi viết thư."' },
  { id: 'context', vi: 'Bối cảnh', tip: 'Bạn là ai, viết cho ai, chuyện gì đang xảy ra.' },
  { id: 'task', vi: 'Nhiệm vụ', tip: 'Việc cần làm, bắt đầu bằng một động từ: viết, tóm tắt, liệt kê…' },
  { id: 'format', vi: 'Định dạng', tip: 'Kết quả trông ra sao: gạch đầu dòng, bảng, 3 đoạn…' },
  { id: 'limits', vi: 'Giới hạn', tip: 'Độ dài, giọng văn, điều không được làm.' },
];

export type Tier = 'weak' | 'ok' | 'good';

export interface PromptScore {
  hits: Record<Criterion, boolean>;
  score: number;
  tier: Tier;
  tooShort: boolean;
}

/** Prompt ngắn hơn chừng này (sau khi bỏ khoảng trắng hai đầu) luôn 0 điểm. */
export const MIN_PROMPT_LEN = 25;

/** Bỏ dấu tiếng Việt, đ→d, chữ thường, gộp khoảng trắng — để người gõ không dấu vẫn được chấm như có dấu. */
export function foldVi(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[đĐ]/g, 'd')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

/** Mẫu viết không dấu, so trên chữ đã qua `foldVi`. */
const PATTERNS: Record<Criterion, RegExp> = {
  role: /\b(ban la|dong vai|vai tro|voi tu cach|hay la mot|nhu mot (chuyen gia|nhan vien|giao vien|tro ly))\b/,
  context:
    /\b(toi la|toi dang|minh la|minh dang|chung toi|cong ty|phong\s|boi canh|khach hang|nguoi nhan|nguoi doc|gui cho|danh cho|sep|dong nghiep|hoc sinh|phu huynh)/,
  task: /\b(viet|soan|tom tat|liet ke|tao|lap|giai thich|dich|de xuat|goi y|kiem tra|sua|len dan y)\b/,
  format: /\b(gach dau dong|dang bang|bang gom|doan van|tieu de|danh so|\d+ (y|cau|dong|muc|doan|slide|buoc)|theo mau|dinh dang)\b/,
  limits:
    /\b(khong qua|toi da|it hon|duoi \d+|ngan gon|khoang \d+|giong( van)?|lich su|trang trong|than thien|khong dung|tranh|chi dung|bang tieng viet)\b/,
};

export function tierOf(score: number): Tier {
  return score >= 5 ? 'good' : score >= 3 ? 'ok' : 'weak';
}

export function scorePrompt(text: string): PromptScore {
  const tooShort = text.trim().length < MIN_PROMPT_LEN;
  const folded = foldVi(text);
  const hits = Object.fromEntries(
    CRITERIA.map(({ id }) => [id, !tooShort && PATTERNS[id].test(folded)]),
  ) as Record<Criterion, boolean>;
  const score = Object.values(hits).filter(Boolean).length;
  return { hits, score, tier: tierOf(score), tooShort };
}

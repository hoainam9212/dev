export type OS = 'win' | 'mac';
export type SimKind = 'mouse' | 'desktop' | 'keyboard' | 'fish' | 'word' | 'excel' | 'ppt' | 'aichat';
export type MochiMood = 'happy' | 'sad' | 'surprised' | 'sleepy' | 'neutral';

/** Vùng Mochi chỉ vào ở gợi ý bậc 2. */
export type Spotlight = { helpId: string } | { cell: string } | { path: string } | { key: string };

export interface ExplainStep {
  kind: 'explain';
  body: string;
  image?: string;
  mood?: MochiMood;
}

export interface QuizStep {
  kind: 'quiz';
  question: string;
  choices: string[];
  answer: number;
  why: string;
}

export interface PracticeStep<S = unknown, C = unknown, A = unknown> {
  kind: 'practice';
  sim: SimKind;
  task: string;
  initial: S;
  checks: C[];
  /** [bậc 1: lời gợi ý, bậc 2: chỗ cần bấm, bậc 3: lời giải từng bước] */
  hints: [string, Spotlight, string[]];
  /** Chuỗi action mẫu của reducer trình mô phỏng; test nội dung dùng để chứng minh bài qua được. */
  solution: A[];
}

/** Một khung đánh dấu trên ảnh chụp thật, mọi số tính theo % kích thước ảnh. */
export interface RealShotMark {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
}

/** Ảnh chụp phần mềm thật có khoanh nút vừa học, để người học đối chiếu khi mở Office. */
export interface RealShotStep {
  kind: 'realShot';
  /** Đường dẫn trong client/public. */
  image: string;
  caption: string;
  /** Mặc định "Ảnh chụp Microsoft Word". */
  credit?: string;
  marks: RealShotMark[];
}

export type Step = ExplainStep | QuizStep | PracticeStep | RealShotStep;

export interface Lesson {
  id: string;
  trackId: string;
  chapterId: string;
  title: string;
  minutes: number;
  /** Chỉ hiện với HĐH này (lộ trình 0). */
  os?: OS;
  /**
   * Bài tự chọn: vẫn học được, vẫn tính sao và XP, nhưng KHÔNG chặn bài sau và
   * không chặn mở lộ trình kế tiếp. Dùng cho nội dung hay nhưng không bắt buộc
   * với mọi người, ví dụ kiểu gõ VNI khi phần lớn người học dùng Telex.
   */
  optional?: boolean;
  osNote?: { win?: string; mac?: string };
  steps: Step[];
}

export interface Chapter {
  id: string;
  title: string;
  lessonIds: string[];
}

export interface Track {
  id: string;
  order: number;
  title: string;
  emoji: string;
  blurb: string;
  color: string;
  chapters: Chapter[];
}

export interface GlossaryEntry {
  id: string;
  term: string;
  say: string;
  vi: string;
  explain: string;
  image?: string;
  os?: OS;
  lessonIds: string[];
}

export interface FaqEntry {
  id: string;
  q: string;
  a: string;
  keywords: string[];
  os?: OS;
}

export interface HelpIdEntry {
  label: string;
  vi: string;
}

export interface LessonProgress {
  lessonId: string;
  stars: 0 | 1 | 2 | 3;
  hintsUsed: number;
  bestTimeMs: number;
  completedAt: string;
}

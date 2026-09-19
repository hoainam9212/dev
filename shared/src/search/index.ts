export function normalize(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

export function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      cur[j] = Math.min(prev[j]! + 1, cur[j - 1]! + 1, prev[j - 1]! + cost);
    }
    prev = cur;
  }
  return prev[b.length]!;
}

export interface SearchHit<T> {
  item: T;
  score: number;
}

export interface SearchOptions {
  limit?: number;
  /** Tỉ lệ token tối thiểu phải khớp (0..1). Mặc định 1 = tất cả. */
  minMatch?: number;
  /** Bỏ các từ hỏi thông dụng ("làm sao", "cách", "là gì"...). */
  stopwords?: boolean;
}

const STOPWORDS = new Set([
  'lam', 'sao', 'the', 'nao', 'cach', 'toi', 'minh', 'co', 'khong', 'la', 'gi', 'de', 'o', 'dau',
  'nhu', 'bi', 'duoc', 'cua', 'va', 'voi', 'thi', 'mot', 'nhung', 'cho', 'ban', 'can', 'muon',
  'hay', 'nay', 'do', 'vay', 'a', 'oi', 'nhe', 'giup', 'em', 'anh', 'chi',
]);

export function searchItems<T>(
  items: readonly T[],
  query: string,
  fields: (item: T) => string[],
  opts: SearchOptions = {},
): SearchHit<T>[] {
  const { limit = 20, minMatch = 1, stopwords = false } = opts;
  const q = normalize(query);
  if (!q) return [];
  let tokens = q.split(' ');
  if (stopwords) {
    const kept = tokens.filter((t) => !STOPWORDS.has(t));
    if (kept.length) tokens = kept;
  }
  const hits: (SearchHit<T> & { i: number })[] = [];
  items.forEach((item, i) => {
    const fs = fields(item).map(normalize);
    const words = fs.flatMap((f) => f.split(/[^a-z0-9]+/)).filter(Boolean);
    let score = 0;
    let matched = 0;
    if (fs.some((f) => f === q)) score += 100;
    else if (fs.some((f) => f.startsWith(q))) score += 50;
    for (const t of tokens) {
      let s = 0;
      if (words.includes(t)) s = 20;
      else if (words.some((w) => w.startsWith(t))) s = 12;
      else if (fs.some((f) => f.includes(t))) s = 8;
      else if (t.length >= 4 && words.some((w) => Math.abs(w.length - t.length) <= 1 && levenshtein(w, t) <= 1)) s = 4;
      if (s > 0) matched++;
      score += s;
    }
    if (score > 0 && matched / tokens.length >= minMatch) hits.push({ item, score, i });
  });
  return hits
    .sort((a, b) => b.score - a.score || a.i - b.i)
    .slice(0, limit)
    .map(({ item, score }) => ({ item, score }));
}

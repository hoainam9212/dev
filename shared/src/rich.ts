export type Inline =
  | { t: 'text'; v: string }
  | { t: 'b'; v: string }
  | { t: 'term'; key: string; label: string }
  | { t: 'kbd'; combo: string };
export type Block = { type: 'p'; inlines: Inline[] } | { type: 'ul'; items: Inline[][] };

const INLINE_RE = /\*\*(.+?)\*\*|\[\[([^\]|]+)(?:\|([^\]]+))?\]\]|\{\{([^}]+)\}\}/g;

export function parseInline(s: string): Inline[] {
  const out: Inline[] = [];
  let last = 0;
  for (const m of s.matchAll(INLINE_RE)) {
    const at = m.index ?? 0;
    if (at > last) out.push({ t: 'text', v: s.slice(last, at) });
    if (m[1] !== undefined) out.push({ t: 'b', v: m[1] });
    else if (m[2] !== undefined) out.push({ t: 'term', key: m[2].trim(), label: (m[3] ?? m[2]).trim() });
    else out.push({ t: 'kbd', combo: (m[4] ?? '').trim() });
    last = at + m[0].length;
  }
  if (last < s.length) out.push({ t: 'text', v: s.slice(last) });
  return out;
}

export function parseRich(text: string): Block[] {
  const blocks: Block[] = [];
  for (const chunk of text.trim().split(/\n\s*\n/)) {
    const lines = chunk.split('\n').map((l) => l.trim()).filter(Boolean);
    if (!lines.length) continue;
    if (lines.every((l) => l.startsWith('- '))) {
      blocks.push({ type: 'ul', items: lines.map((l) => parseInline(l.slice(2))) });
    } else {
      blocks.push({ type: 'p', inlines: parseInline(lines.join(' ')) });
    }
  }
  return blocks;
}

export function extractTermKeys(text: string): string[] {
  return [...text.matchAll(INLINE_RE)].filter((m) => m[2] !== undefined).map((m) => m[2]!.trim());
}

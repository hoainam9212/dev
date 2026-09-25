const fromCode = (u: string) => String.fromCodePoint(parseInt(u.replace(/^U\+/, ''), 16));

function unihanRows(txt: string): [string, string, string][] {
  const rows: [string, string, string][] = [];
  for (const line of txt.split('\n')) {
    if (!line.startsWith('U+')) continue;
    const [code, field, value] = line.split('\t');
    if (code && field && value) rows.push([fromCode(code), field, value.trim()]);
  }
  return rows;
}

/** One Unihan field (e.g. kVietnamese) as character → raw value. */
export function parseUnihanField(txt: string, field: string): Map<string, string> {
  const map = new Map<string, string>();
  for (const [ch, f, value] of unihanRows(txt)) if (f === field) map.set(ch, value);
  return map;
}

// Traditional first: Japanese shinjitai usually map to the traditional form Vietnamese readings are listed under.
// Unihan links many shinjitai (気, 円) to that form only through kJapaneseOldVariant.
const VARIANT_FIELDS = ['kTraditionalVariant', 'kJapaneseOldVariant', 'kZVariant', 'kSemanticVariant'];

/** Character → its variant characters (traditional, Japanese old, z-, then semantic variants), self excluded. */
export function parseUnihanVariants(txt: string): Map<string, string[]> {
  const slots = new Map<string, string[][]>();
  for (const [ch, f, value] of unihanRows(txt)) {
    const rank = VARIANT_FIELDS.indexOf(f);
    if (rank < 0) continue;
    const found = [...value.matchAll(/U\+([0-9A-F]{4,6})/g)].map((m) => fromCode(m[1]!));
    const s = slots.get(ch) ?? VARIANT_FIELDS.map(() => [] as string[]);
    s[rank]!.push(...found);
    slots.set(ch, s);
  }
  const out = new Map<string, string[]>();
  for (const [ch, s] of slots) out.set(ch, [...new Set(s.flat())].filter((c) => c !== ch));
  return out;
}

/** Uppercase Hán Việt: the character's own kVietnamese, else the first variant that has one. Max 3 readings. */
export function hanVietFor(ch: string, readings: Map<string, string>, variants: Map<string, string[]>): string | undefined {
  const raw = readings.get(ch) ?? (variants.get(ch) ?? []).map((v) => readings.get(v)).find(Boolean);
  if (!raw) return undefined;
  const list = [...new Set(raw.split(/\s+/).filter(Boolean))].slice(0, 3);
  return list.map((r) => r.toLocaleUpperCase('vi')).join(', ');
}

/** Japanese Tatoeba id → shortest linked Vietnamese sentence. */
export function tatoebaVietnamese(links: Map<number, number[]>, vie: Map<number, string>): Map<number, string> {
  const out = new Map<number, string>();
  for (const [jpn, targets] of links) {
    const best = targets
      .map((t) => vie.get(t))
      .filter((x): x is string => !!x)
      .sort((a, b) => a.length - b.length)[0];
    if (best) out.set(jpn, best);
  }
  return out;
}

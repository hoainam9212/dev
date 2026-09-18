import { tokenize, chunkSentence } from './chunk';

it('tokenizes by script runs', () => {
  expect(tokenize('私はコーヒーを飲みます。')).toEqual(['私', 'は', 'コーヒー', 'を', '飲', 'みます', '。']);
});

it('chunks reproduce the sentence and respect the part count', () => {
  const sentences = ['この中で、寿司が一番好きです。', '今日は晴れている。けれども、寒いです。', '歩きながら話す。', '猫。'];
  for (const s of sentences) {
    for (const parts of [3, 4, 5]) {
      const chunks = chunkSentence(s, parts);
      expect(chunks.join('')).toBe(s);
      expect(chunks.length).toBeLessThanOrEqual(parts);
      expect(chunks.length).toBeGreaterThanOrEqual(1);
      for (const c of chunks) expect(c).not.toMatch(/^[。、]/);
    }
  }
  expect(chunkSentence('この中で、寿司が一番好きです。', 4).length).toBeGreaterThanOrEqual(3);
  expect(chunkSentence('音楽を聞きながら勉強します。', 4).length).toBeGreaterThanOrEqual(3);
});

it('is deterministic', () => {
  expect(chunkSentence('明日は雨が降るそうです。')).toEqual(chunkSentence('明日は雨が降るそうです。'));
});

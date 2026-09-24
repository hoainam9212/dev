import { describe, it, expect } from 'vitest';
import {
  parseCsv,
  splitMeanings,
  parseVocabCsv,
  parseKanjiJson,
  parseGrammarCsv,
  extractStrokes,
  extractStrokeNumbers,
  kanjivgFilename,
  parseTsvSentences,
  parseLinks,
  assignSentences,
  attachVocabToKanji,
  dedupeVocab,
} from './parse';

describe('parseCsv', () => {
  it('handles quotes, embedded commas and escaped quotes', () => {
    expect(parseCsv('a,b\n"x, y","he said ""hi"""\n')).toEqual([
      ['a', 'b'],
      ['x, y', 'he said "hi"'],
    ]);
  });
  it('handles CRLF and a trailing line without newline', () => {
    expect(parseCsv('a,b\r\nc,d')).toEqual([
      ['a', 'b'],
      ['c', 'd'],
    ]);
  });
});

describe('splitMeanings', () => {
  it('splits on commas outside parentheses', () => {
    expect(splitMeanings('to meet, to see (e.g. a friend, a doctor)')).toEqual([
      'to meet',
      'to see (e.g. a friend, a doctor)',
    ]);
  });
});

describe('parseVocabCsv', () => {
  const csv = 'expression,reading,meaning,tags\n会う,あう,"to meet, to see",JLPT JLPT_5\n青い,あおい,blue,JLPT JLPT_5\n';
  it('builds Vocab with ids, kanji list and split meanings', () => {
    const v = parseVocabCsv(csv, 'N5');
    expect(v[0]).toEqual({
      id: 'v-n5-0001',
      level: 'N5',
      word: '会う',
      reading: 'あう',
      meanings: ['to meet', 'to see'],
      tags: ['JLPT', 'JLPT_5'],
      kanji: ['会'],
      sentenceIds: [],
    });
    expect(v[1]!.id).toBe('v-n5-0002');
  });
});

describe('dedupeVocab', () => {
  it('keeps the lowest level entry for the same word+reading', () => {
    const a = parseVocabCsv('expression,reading,meaning,tags\n青い,あおい,blue,x\n', 'N3');
    const b = parseVocabCsv('expression,reading,meaning,tags\n青い,あおい,blue,x\n', 'N5');
    const out = dedupeVocab([...a, ...b]);
    expect(out).toHaveLength(1);
    expect(out[0]!.level).toBe('N5');
  });
});

describe('parseKanjiJson', () => {
  it('keeps only kanji with a JLPT level, sorted by level then frequency', () => {
    const raw = {
      一: { strokes: 1, grade: 1, freq: 2, jlpt_new: 5, meanings: ['One'], readings_on: ['いち'], readings_kun: ['ひと-'] },
      二: { strokes: 2, grade: 1, freq: 9, jlpt_new: 5, meanings: ['Two'], readings_on: ['に'], readings_kun: ['ふた'] },
      龍: { strokes: 16, grade: null, freq: null, jlpt_new: null, meanings: ['dragon'], readings_on: [], readings_kun: [] },
      愛: { strokes: 13, grade: 4, freq: 640, jlpt_new: 3, meanings: ['Love'], readings_on: ['あい'], readings_kun: [] },
    };
    const k = parseKanjiJson(raw);
    expect(k.map((x) => x.char)).toEqual(['一', '二', '愛']);
    expect(k[0]).toEqual({
      id: 'k-一',
      char: '一',
      level: 'N5',
      strokes: 1,
      meanings: ['One'],
      on: ['いち'],
      kun: ['ひと-'],
      grade: 1,
      freq: 2,
      strokePaths: [],
      vocabIds: [],
    });
  });
});

describe('parseGrammarCsv', () => {
  it('groups example rows by title and level with sequential ids per level', () => {
    const csv =
      '"Grammar Point","Meaning","Formation","Example (Japanese)","Example (Romaji)","Example (English)","JLPT Level"\n' +
      '"A が いちばん","superlative","N + が + いちばん","寿司が一番好き。","Sushi ga ichiban suki.","I like sushi most.","JLPT N5"\n' +
      '"A が いちばん","superlative","N + が + いちばん","猫が一番。","Neko ga ichiban.","Cats are best.","JLPT N5"\n' +
      '"〜ながら","while","V-stem + ながら","歩きながら話す。","Arukinagara hanasu.","Talk while walking.","JLPT N4"\n';
    const g = parseGrammarCsv(csv);
    expect(g).toHaveLength(2);
    expect(g[0]).toMatchObject({ id: 'g-n5-0001', level: 'N5', title: 'A が いちばん', meaning: 'superlative' });
    expect(g[0]!.examples).toHaveLength(2);
    expect(g[1]!.id).toBe('g-n4-0001');
  });
});

describe('KanjiVG helpers', () => {
  it('maps a char to its file name', () => {
    expect(kanjivgFilename('一')).toBe('04e00.svg');
    expect(kanjivgFilename('あ')).toBe('03042.svg');
  });
  it('extracts stroke paths in order, ignoring non-stroke paths', () => {
    const svg =
      '<svg><g id="kvg:StrokePaths_04e8c"><path id="kvg:04e8c-s1" kvg:type="㇐" d="M1,2 L3,4"/><path id="kvg:04e8c-s2" d="M5,6"/></g><g id="kvg:StrokeNumbers_04e8c"><text>1</text></g></svg>';
    expect(extractStrokes(svg)).toEqual(['M1,2 L3,4', 'M5,6']);
  });
  it('takes stroke number positions from KanjiVG and nudges any that would cover each other', () => {
    const svg =
      '<path id="kvg:04e8c-s1" d="M10,20 L90,20"/><path id="kvg:04e8c-s2" d="M10,80 L90,80"/><path id="kvg:04e8c-s3" d="m40,40 L50,50"/>' +
      '<g id="kvg:StrokeNumbers_04e8c" style="font-size:8;fill:#808080">' +
      '<text transform="matrix(1 0 0 1 5.25 18.50)">1</text><text transform="matrix(1 0 0 1 5.50 78.13)">2</text>' +
      '<text transform="matrix(1 0 0 1 5.50 78.13)">3</text></g>';
    const nums = extractStrokeNumbers(svg);
    expect(nums).toHaveLength(3);
    expect(nums[0]).toEqual([5.25, 18.5]);
    expect(nums[1]).toEqual([5.5, 78.13]);
    expect(nums[2]).not.toEqual([5.5, 78.13]);
  });
  it('falls back to the start of each stroke when the SVG has no numbers', () => {
    expect(extractStrokeNumbers('<path id="kvg:04e8c-s1" d="M10,20 L90,20"/><path id="kvg:04e8c-s2" d="m60,70"/>')).toEqual([
      [5, 18],
      [55, 68],
    ]);
  });
});

describe('Tatoeba', () => {
  it('parses sentence and link TSVs', () => {
    expect(parseTsvSentences('1\tjpn\t猫が好き。\n2\tjpn\t犬。\n')).toEqual(
      new Map([
        [1, '猫が好き。'],
        [2, '犬。'],
      ]),
    );
    expect(parseLinks('1\t100\n1\t101\n2\t200\n')).toEqual(
      new Map([
        [1, [100, 101]],
        [2, [200]],
      ]),
    );
  });
});

describe('assignSentences', () => {
  it('assigns up to max short sentences containing the word and returns used ids', () => {
    const vocab = parseVocabCsv('expression,reading,meaning,tags\n猫,ねこ,cat,x\nあう,あう,meet,x\n', 'N5');
    const sentences = [
      { id: 's-1', ja: '猫が好きです。' },
      { id: 's-2', ja: '黒い猫と白い猫がいます。' },
      { id: 's-3', ja: '犬がいます。' },
      { id: 's-4', ja: '猫。' },
    ];
    const used = assignSentences(vocab, sentences, 2);
    expect(vocab[0]!.sentenceIds).toEqual(['s-4', 's-1']);
    expect(vocab[1]!.sentenceIds).toEqual([]);
    expect([...used]).toEqual(['s-4', 's-1']);
  });
  it('matches multi-char words at any position', () => {
    const vocab = parseVocabCsv('expression,reading,meaning,tags\n学校,がっこう,school,x\n', 'N5');
    const used = assignSentences(vocab, [{ id: 's-9', ja: '私の学校は大きい。' }]);
    expect(vocab[0]!.sentenceIds).toEqual(['s-9']);
    expect(used.size).toBe(1);
  });
});

describe('attachVocabToKanji', () => {
  it('lists vocab containing the kanji, lowest level first, capped', () => {
    const kanji = parseKanjiJson({
      猫: { strokes: 11, grade: null, freq: 1000, jlpt_new: 3, meanings: ['cat'], readings_on: [], readings_kun: [] },
    });
    const v1 = parseVocabCsv('expression,reading,meaning,tags\n猫,ねこ,cat,x\n', 'N5');
    const v2 = parseVocabCsv('expression,reading,meaning,tags\n子猫,こねこ,kitten,x\n', 'N3');
    attachVocabToKanji(kanji, [...v2, ...v1], 1);
    expect(kanji[0]!.vocabIds).toEqual(['v-n5-0001']);
  });
});

import { describe, it, expect } from 'vitest';
import { docFromJSON, docToJSON, emptyDoc, plainText, wordSchema } from './schema';

describe('word schema', () => {
  it('creates an empty document with one paragraph', () => {
    expect(emptyDoc()).toEqual({ type: 'doc', content: [{ type: 'paragraph' }] });
    expect(plainText(emptyDoc('Xin chào'))).toBe('Xin chào');
  });

  it('builds one paragraph per line so lessons can set up a document in one go', () => {
    expect(emptyDoc('Dòng một\nDòng hai')).toEqual({
      type: 'doc',
      content: [
        { type: 'paragraph', content: [{ type: 'text', text: 'Dòng một' }] },
        { type: 'paragraph', content: [{ type: 'text', text: 'Dòng hai' }] },
      ],
    });
    expect(plainText(emptyDoc('Một\nHai\nBa'))).toBe('Một\nHai\nBa');
  });

  it('round-trips a document through ProseMirror', () => {
    const json = emptyDoc('Kính gửi');
    expect(docToJSON(docFromJSON(json))).toEqual(json);
  });

  it('knows every node and mark the Word sim needs', () => {
    for (const n of ['doc', 'paragraph', 'heading', 'text', 'bulletList', 'orderedList', 'listItem', 'table', 'tableRow', 'tableCell', 'image']) {
      expect(wordSchema.nodes[n], n).toBeDefined();
    }
    for (const m of ['bold', 'italic', 'underline', 'textStyle', 'highlight']) {
      expect(wordSchema.marks[m], m).toBeDefined();
    }
  });

  it('keeps paragraph attributes and text styles', () => {
    const json = {
      type: 'doc',
      content: [
        { type: 'heading', attrs: { level: 2, textAlign: 'center', lineHeight: '1.5' }, content: [{ type: 'text', text: 'ĐƠN XIN VIỆC' }] },
        { type: 'paragraph', attrs: { textAlign: 'right', lineHeight: '1' }, content: [{ type: 'text', marks: [{ type: 'bold' }, { type: 'textStyle', attrs: { color: '#C2185B', fontFamily: 'Times New Roman', fontSize: '14pt' } }], text: 'Nam' }] },
      ],
    };
    expect(docToJSON(docFromJSON(json))).toEqual(json);
  });

  it('joins block text with newlines', () => {
    const json = { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'A' }] }, { type: 'paragraph', content: [{ type: 'text', text: 'B' }] }] };
    expect(plainText(json)).toBe('A\nB');
  });

  it('keeps a table and a picture through the round trip', () => {
    const json = {
      type: 'doc',
      content: [
        {
          type: 'table',
          content: [
            { type: 'tableRow', content: [{ type: 'tableHeader', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Môn' }] }] }] },
            { type: 'tableRow', content: [{ type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Toán' }] }] }] },
          ],
        },
        { type: 'image', attrs: { src: '/images/word/meo.svg', alt: 'Mèo Mochi', width: '60%' } },
      ],
    };
    expect(docToJSON(docFromJSON(json))).toEqual(json);
  });

  it('leaves out attributes that are still at their default', () => {
    const json = { type: 'doc', content: [{ type: 'image', attrs: { src: '/images/word/hoa.svg', alt: 'Hoa', width: '40%' } }] };
    // width 40% và alt là mặc định của ảnh; chỉ `src` là bắt buộc nên được giữ.
    expect(docToJSON(docFromJSON(json))).toEqual({ type: 'doc', content: [{ type: 'image', attrs: { src: '/images/word/hoa.svg', alt: 'Hoa' } }] });
  });
});

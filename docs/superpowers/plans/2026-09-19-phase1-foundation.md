# Giai đoạn 1 – Nền tảng (Foundation) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Dựng khung ứng dụng "Tin Học Cùng Mochi": monorepo, thư viện dùng chung (tìm kiếm, mô hình file, WPM, bộ gõ Telex/VNI, chấm bài, tiến độ), app React có mascot Mochi, màn hình chào + chọn HĐH, bản đồ lộ trình, trình chạy bài học, hệ thống Trợ giúp, lưu tiến độ + sao lưu, PWA offline.

**Architecture:** npm workspaces gồm `shared/` (TypeScript thuần, test Vitest) và `client/` (React 18 + Vite + Tailwind 4 + Dexie). Nội dung bài học là module TS/JSON trong `client/src/content`. Trình mô phỏng đăng ký qua `SIMS` (client) và `GRADERS` (shared); giai đoạn 1 chưa có trình mô phỏng thật, chỉ có khung và test bằng sim giả.

**Tech Stack:** Node 20, npm 10, TypeScript 5.6, React 18.3, react-router-dom 6, zustand 4, Dexie 4 + dexie-react-hooks, Tailwind CSS 4 (`@tailwindcss/vite`), vite-plugin-pwa 0.20, Vitest 2, Testing Library, fake-indexeddb, `@fontsource-variable/nunito`.

**Spec:** `docs/superpowers/specs/2026-09-19-office-neko-design.md`

## Global Constraints

- Thư mục dự án: `C:\Users\vnext\Desktop\Project Manager\97. Tools\Dev\office-neko` (git repo riêng, nhánh `master`). Mọi lệnh chạy bằng Git Bash từ thư mục này: `cd "/c/Users/vnext/Desktop/Project Manager/97. Tools/Dev/office-neko"`.
- Tên package: `@office-neko/shared`, `@office-neko/client`. Tên hiển thị: **Tin Học Cùng Mochi**. Mascot: mèo **Mochi** (không dùng nhân vật người).
- Toàn bộ chữ giao diện tiếng Việt. File nguồn UTF-8, chữ tiếng Việt dạng dựng sẵn (NFC).
- Không server, không gọi mạng lúc chạy; không dùng logo/thương hiệu Anthropic.
- Cổng dev: `5174` (5173 đã dùng cho nihongo-sensei); preview: `4174`.
- `tsconfig` bật `strict` và `noUncheckedIndexedAccess` — truy cập mảng/record phải xử lý `undefined`.
- Test trong `shared/` import rõ `describe/it/expect` từ `vitest`. Test trong `client/` cũng import rõ; config client bật `globals: true` để Testing Library tự cleanup.
- Hệ điều hành: `OS = 'win' | 'mac'`; phím tắt hiển thị qua `formatCombo`/`<Kbd>` (`mod` = Ctrl/⌘).
- Mỗi task kết thúc bằng commit; message kết thúc bằng dòng `Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>`.

---

## File Structure

```
office-neko/
  package.json, tsconfig.base.json, .gitignore, README.md
  shared/
    package.json, tsconfig.json
    src/index.ts                  # re-export toàn bộ
    src/types.ts                  # OS, SimKind, Lesson, Step, Track, GlossaryEntry, FaqEntry...
    src/os.ts                     # detectOs, formatCombo, isModPressed
    src/search/index.ts           # normalize, levenshtein, searchItems
    src/vfs/index.ts              # mô hình file/thư mục (export dạng namespace `vfs`)
    src/typing/index.ts           # compareText, wpm, accuracy, KeyStats
    src/ime/index.ts              # Telex/VNI
    src/grading/core.ts           # gradeWith, kiểu Grader/GradeReport
    src/grading/index.ts          # GRADERS, grade()
    src/progress.ts               # sao, XP, cấp, streak, mở khoá bài
    src/rich.ts                   # parse cú pháp nội dung (**đậm**, [[thuật ngữ]], {{phím}}, danh sách)
  client/
    package.json, tsconfig.json, vite.config.ts, index.html, scripts/icons.mjs
    src/main.tsx, src/App.tsx, src/pwa.ts, src/vite-env.d.ts
    src/styles/theme.css
    src/test/setup.ts, src/test/utils.tsx
    src/db/db.ts, src/db/profile.tsx
    src/progress/record.ts, src/progress/backup.ts, src/progress/useStats.ts
    src/components/Mochi.tsx, mochi.css, SpeechBubble.tsx, Confetti.tsx, Kbd.tsx, Segmented.tsx, Toggle.tsx
    src/lib/sound.ts
    src/content/index.ts, tracks.ts, glossary.json, faq.json, help-ids.ts, lessons/index.ts, lessons/basics-welcome.ts
    src/sims/types.ts, src/sims/registry.ts
    src/help/helpStore.ts, RichText.tsx, TermLink.tsx, HelpTooltipLayer.tsx, HelpDrawer.tsx,
             GlossaryPanel.tsx, AskMochiPanel.tsx, HelpButton.tsx, SpotlightOverlay.tsx
    src/player/playerReducer.ts, LessonPlayer.tsx, ExplainView.tsx, QuizView.tsx, PracticeView.tsx,
               HintPanel.tsx, FinishView.tsx
    src/app/AppShell.tsx
    src/pages/WelcomePage.tsx, HomePage.tsx, LessonPage.tsx, SettingsPage.tsx
    src/home/TrackMap.tsx, GoalRing.tsx
```

---

### Task 1: Monorepo scaffold

**Files:**
- Create: `package.json`, `tsconfig.base.json`, `.gitignore`
- Create: `shared/package.json`, `shared/tsconfig.json`, `shared/src/index.ts`, `shared/src/index.test.ts`
- Create: `client/package.json`, `client/tsconfig.json`, `client/vite.config.ts`, `client/index.html`, `client/src/main.tsx`, `client/src/App.tsx`, `client/src/App.test.tsx`, `client/src/test/setup.ts`, `client/src/styles/theme.css`, `client/src/vite-env.d.ts`
- Modify: `../.claude/launch.json` (thêm cấu hình `office-neko`)

**Interfaces:**
- Produces: `APP_NAME` từ `@office-neko/shared`; lệnh `npm test`, `npm run typecheck`, `npm run dev` ở gốc.

- [ ] **Step 1: Tạo file gốc**

`package.json`:
```json
{
  "name": "office-neko",
  "private": true,
  "workspaces": ["shared", "client"],
  "scripts": {
    "dev": "npm run dev -w client",
    "test": "npm run test --workspaces --if-present",
    "typecheck": "npm run typecheck --workspaces --if-present",
    "build": "npm run build -w client",
    "preview": "npm run preview -w client",
    "icons": "node client/scripts/icons.mjs"
  }
}
```

`tsconfig.base.json`:
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "noUncheckedIndexedAccess": true,
    "resolveJsonModule": true
  }
}
```

`.gitignore`:
```
node_modules/
dist/
dev-dist/
*.log
.DS_Store
```

- [ ] **Step 2: Tạo package `shared`**

`shared/package.json`:
```json
{
  "name": "@office-neko/shared",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "main": "src/index.ts",
  "types": "src/index.ts",
  "exports": { ".": "./src/index.ts" },
  "scripts": { "test": "vitest run", "typecheck": "tsc --noEmit" },
  "devDependencies": { "typescript": "^5.6.0", "vitest": "^2.1.0" }
}
```

`shared/tsconfig.json`:
```json
{ "extends": "../tsconfig.base.json", "compilerOptions": { "lib": ["ES2022"], "noEmit": true }, "include": ["src"] }
```

`shared/src/index.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { APP_NAME } from './index';

describe('shared', () => {
  it('exposes the app name', () => {
    expect(APP_NAME).toBe('Tin Học Cùng Mochi');
  });
});
```

`shared/src/index.ts`:
```ts
export const APP_NAME = 'Tin Học Cùng Mochi';
```

- [ ] **Step 3: Tạo package `client`**

`client/package.json`:
```json
{
  "name": "@office-neko/client",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite --port 5174 --strictPort",
    "build": "tsc --noEmit && vite build",
    "preview": "vite preview --port 4174 --strictPort",
    "test": "vitest run",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@fontsource-variable/nunito": "^5.1.0",
    "@office-neko/shared": "*",
    "dexie": "^4.0.8",
    "dexie-react-hooks": "^1.1.7",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.26.0",
    "zustand": "^4.5.5"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.0.0",
    "@testing-library/jest-dom": "^6.5.0",
    "@testing-library/react": "^16.0.1",
    "@testing-library/user-event": "^14.5.2",
    "@types/react": "^18.3.5",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "fake-indexeddb": "^6.0.0",
    "jsdom": "^25.0.0",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.6.0",
    "vite": "^5.4.0",
    "vite-plugin-pwa": "^0.20.5",
    "vitest": "^2.1.0"
  }
}
```

`client/tsconfig.json`:
```json
{
  "extends": "../tsconfig.base.json",
  "compilerOptions": {
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "types": ["vitest/globals", "@testing-library/jest-dom"],
    "noEmit": true,
    "allowImportingTsExtensions": true
  },
  "include": ["src", "vite.config.ts"]
}
```

`client/vite.config.ts`:
```ts
/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { port: 5174 },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
});
```

`client/index.html`:
```html
<!doctype html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#8FE3CF" />
    <title>Tin Học Cùng Mochi</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

`client/src/vite-env.d.ts`:
```ts
/// <reference types="vite/client" />
```

`client/src/styles/theme.css` (bản tạm, Task 9 thay toàn bộ):
```css
@import "tailwindcss";
```

`client/src/test/setup.ts`:
```ts
import '@testing-library/jest-dom/vitest';
import 'fake-indexeddb/auto';

// jsdom has no canvas; components must handle a null context gracefully.
if (typeof HTMLCanvasElement !== 'undefined') {
  HTMLCanvasElement.prototype.getContext = (() => null) as unknown as HTMLCanvasElement['getContext'];
}

// jsdom has no PointerEvent; emulate it on top of MouseEvent so clientX/clientY survive.
if (typeof window !== 'undefined' && !('PointerEvent' in window)) {
  class PointerEventPolyfill extends MouseEvent {
    pointerId: number;
    constructor(type: string, init: MouseEventInit & { pointerId?: number } = {}) {
      super(type, init);
      this.pointerId = init.pointerId ?? 0;
    }
  }
  (window as unknown as { PointerEvent: unknown }).PointerEvent = PointerEventPolyfill;
}
```

`client/src/App.tsx` (bản tạm, Task 15 thay):
```tsx
import { APP_NAME } from '@office-neko/shared';

export default function App() {
  return <h1 className="p-8 text-3xl font-extrabold">{APP_NAME}</h1>;
}
```

`client/src/main.tsx`:
```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/theme.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
```

`client/src/App.test.tsx` (bản tạm, Task 15 thay):
```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('shows the app name', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'Tin Học Cùng Mochi' })).toBeInTheDocument();
  });
});
```

- [ ] **Step 4: Cài đặt và chạy test**

Run: `npm install && npm test && npm run typecheck`
Expected: cài xong; 2 test PASS (shared + client); typecheck không lỗi.

- [ ] **Step 5: Thêm cấu hình preview**

Trong `C:\Users\vnext\Desktop\Project Manager\97. Tools\Dev\.claude\launch.json`, thêm phần tử vào mảng `configurations` (giữ nguyên các mục cũ):
```json
{
  "name": "office-neko",
  "runtimeExecutable": "npm",
  "runtimeArgs": ["--prefix", "office-neko", "run", "dev"],
  "port": 5174
}
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: scaffold office-neko monorepo (shared + client)" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 2: Kiểu dữ liệu chung + tiện ích hệ điều hành

**Files:**
- Create: `shared/src/types.ts`, `shared/src/os.ts`, `shared/src/os.test.ts`
- Modify: `shared/src/index.ts`

**Interfaces:**
- Produces (types): `OS`, `SimKind`, `MochiMood`, `Spotlight`, `ExplainStep`, `QuizStep`, `PracticeStep<S,C,A>`, `Step`, `Lesson`, `Chapter`, `Track`, `GlossaryEntry`, `FaqEntry`, `HelpIdEntry`, `LessonProgress`.
- Produces (functions): `detectOs(platform: string): OS`, `formatCombo(combo: string, os: OS): string[]`, `isModPressed(e: { ctrlKey: boolean; metaKey: boolean }, os: OS): boolean`.

- [ ] **Step 1: Viết types**

`shared/src/types.ts`:
```ts
export type OS = 'win' | 'mac';
export type SimKind = 'mouse' | 'desktop' | 'keyboard' | 'word' | 'excel' | 'ppt' | 'aichat';
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

export type Step = ExplainStep | QuizStep | PracticeStep;

export interface Lesson {
  id: string;
  trackId: string;
  chapterId: string;
  title: string;
  minutes: number;
  /** Chỉ hiện với HĐH này (lộ trình 0). */
  os?: OS;
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
```

- [ ] **Step 2: Viết test cho os.ts**

`shared/src/os.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { detectOs, formatCombo, isModPressed } from './os';

describe('detectOs', () => {
  it('recognises Apple platforms', () => {
    expect(detectOs('MacIntel')).toBe('mac');
    expect(detectOs('macOS')).toBe('mac');
    expect(detectOs('iPad')).toBe('mac');
  });
  it('defaults to Windows', () => {
    expect(detectOs('Win32')).toBe('win');
    expect(detectOs('Linux x86_64')).toBe('win');
    expect(detectOs('')).toBe('win');
  });
});

describe('formatCombo', () => {
  it('maps mod to Ctrl on Windows', () => {
    expect(formatCombo('mod+c', 'win')).toEqual(['Ctrl', 'C']);
  });
  it('maps modifiers to Mac symbols', () => {
    expect(formatCombo('mod+shift+s', 'mac')).toEqual(['⌘', '⇧', 'S']);
    expect(formatCombo('alt+tab', 'mac')).toEqual(['⌥', 'Tab']);
  });
  it('names Backspace as Delete on Mac', () => {
    expect(formatCombo('backspace', 'mac')).toEqual(['Delete']);
    expect(formatCombo('backspace', 'win')).toEqual(['Backspace']);
  });
  it('capitalises function keys and arrows', () => {
    expect(formatCombo('f1', 'win')).toEqual(['F1']);
    expect(formatCombo('up', 'win')).toEqual(['↑']);
  });
});

describe('isModPressed', () => {
  it('uses ctrl on Windows and meta on Mac', () => {
    expect(isModPressed({ ctrlKey: true, metaKey: false }, 'win')).toBe(true);
    expect(isModPressed({ ctrlKey: true, metaKey: false }, 'mac')).toBe(false);
    expect(isModPressed({ ctrlKey: false, metaKey: true }, 'mac')).toBe(true);
  });
});
```

- [ ] **Step 3: Chạy test, xác nhận FAIL**

Run: `npm test -w shared`
Expected: FAIL – `Failed to resolve import "./os"`.

- [ ] **Step 4: Viết os.ts**

`shared/src/os.ts`:
```ts
import type { OS } from './types';

export function detectOs(platform: string): OS {
  return /mac|iphone|ipad|ipod/i.test(platform) ? 'mac' : 'win';
}

const KEY_LABELS: Record<string, { win: string; mac: string }> = {
  mod: { win: 'Ctrl', mac: '⌘' },
  ctrl: { win: 'Ctrl', mac: '⌃' },
  alt: { win: 'Alt', mac: '⌥' },
  shift: { win: 'Shift', mac: '⇧' },
  enter: { win: 'Enter', mac: 'Return' },
  backspace: { win: 'Backspace', mac: 'Delete' },
  delete: { win: 'Delete', mac: 'Fn+Delete' },
  esc: { win: 'Esc', mac: 'Esc' },
  tab: { win: 'Tab', mac: 'Tab' },
  space: { win: 'Space', mac: 'Space' },
  up: { win: '↑', mac: '↑' },
  down: { win: '↓', mac: '↓' },
  left: { win: '←', mac: '←' },
  right: { win: '→', mac: '→' },
};

/** 'mod+shift+s' → ['Ctrl','Shift','S'] (win) hoặc ['⌘','⇧','S'] (mac). */
export function formatCombo(combo: string, os: OS): string[] {
  return combo
    .split('+')
    .map((t) => t.trim())
    .filter(Boolean)
    .map((t) => {
      const label = KEY_LABELS[t.toLowerCase()];
      if (label) return label[os];
      return t.length === 1 ? t.toUpperCase() : t.charAt(0).toUpperCase() + t.slice(1);
    });
}

export function isModPressed(e: { ctrlKey: boolean; metaKey: boolean }, os: OS): boolean {
  return os === 'mac' ? e.metaKey : e.ctrlKey;
}
```

`shared/src/index.ts`:
```ts
export * from './types';
export * from './os';

export const APP_NAME = 'Tin Học Cùng Mochi';
```

- [ ] **Step 5: Chạy test, xác nhận PASS**

Run: `npm test -w shared && npm run typecheck -w shared`
Expected: PASS toàn bộ.

- [ ] **Step 6: Commit**

```bash
git add shared
git commit -m "feat(shared): add core types and OS helpers" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---
### Task 3: Tìm kiếm không dấu, gần đúng

**Files:**
- Create: `shared/src/search/index.ts`, `shared/src/search/search.test.ts`
- Modify: `shared/src/index.ts`

**Interfaces:**
- Produces: `normalize(s: string): string`, `levenshtein(a: string, b: string): number`, `interface SearchHit<T> { item: T; score: number }`, `interface SearchOptions { limit?: number; minMatch?: number; stopwords?: boolean }`, `searchItems<T>(items: readonly T[], query: string, fields: (item: T) => string[], opts?: SearchOptions): SearchHit<T>[]`.
- Cách tính điểm:
  - Cả câu tìm kiếm trùng nguyên một field: +100. Field bắt đầu bằng câu tìm kiếm: +50.
  - Với mỗi token: trùng nguyên một từ +20; là phần đầu của một từ +12; nằm bên trong field +8; sai 1 ký tự (chỉ xét token ≥ 4 ký tự) +4.
  - `minMatch` (mặc định 1) là tỉ lệ token tối thiểu phải khớp.
  - `stopwords: true` bỏ các từ hỏi thông dụng tiếng Việt; nếu bỏ hết thì giữ nguyên token.

- [ ] **Step 1: Viết test**

`shared/src/search/search.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { levenshtein, normalize, searchItems } from './index';

const items = [
  { term: 'Cell', vi: 'Ô tính' },
  { term: 'Formula', vi: 'Công thức' },
  { term: 'Formula Bar', vi: 'Thanh công thức' },
  { term: 'Folder', vi: 'Thư mục' },
];
const fields = (i: { term: string; vi: string }) => [i.term, i.vi];

describe('normalize', () => {
  it('strips Vietnamese diacritics, đ and extra spaces', () => {
    expect(normalize('  Đường   Dẫn ')).toBe('duong dan');
    expect(normalize('Ô tính')).toBe('o tinh');
  });
});

describe('levenshtein', () => {
  it('counts edits', () => {
    expect(levenshtein('formla', 'formula')).toBe(1);
    expect(levenshtein('abc', 'abc')).toBe(0);
    expect(levenshtein('', 'ab')).toBe(2);
  });
});

describe('searchItems', () => {
  it('matches without diacritics', () => {
    expect(searchItems(items, 'o tinh', fields)[0]?.item.term).toBe('Cell');
  });
  it('ranks exact field matches first', () => {
    const r = searchItems(items, 'cong thuc', fields).map((h) => h.item.term);
    expect(r).toEqual(['Formula', 'Formula Bar']);
  });
  it('tolerates one typo in longer words', () => {
    const r = searchItems(items, 'formla', fields).map((h) => h.item.term);
    expect(r).toEqual(['Formula', 'Formula Bar']);
  });
  it('returns nothing for empty or unknown queries', () => {
    expect(searchItems(items, '   ', fields)).toEqual([]);
    expect(searchItems(items, 'xyz', fields)).toEqual([]);
  });
  it('respects limit', () => {
    expect(searchItems(items, 'f', fields, { limit: 1 })).toHaveLength(1);
  });
  it('supports loose question matching with stopwords', () => {
    const faq = [{ q: 'Làm sao mở Từ điển?' }, { q: 'Lưu file thế nào?' }];
    const r = searchItems(faq, 'cách mở từ điển vậy', (f) => [f.q], { stopwords: true, minMatch: 0.5 });
    expect(r[0]?.item.q).toBe('Làm sao mở Từ điển?');
    expect(r).toHaveLength(1);
  });
});
```

- [ ] **Step 2: Chạy test, xác nhận FAIL**

Run: `npm test -w shared -- search`
Expected: FAIL – không resolve được `./index`.

- [ ] **Step 3: Viết code**

`shared/src/search/index.ts`:
```ts
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
```

Thêm vào `shared/src/index.ts` (trước dòng `APP_NAME`):
```ts
export * from './search';
```

- [ ] **Step 4: Chạy test, xác nhận PASS**

Run: `npm test -w shared && npm run typecheck -w shared`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add shared
git commit -m "feat(shared): accent-insensitive fuzzy search" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 4: Mô hình file/thư mục (vfs)

**Files:**
- Create: `shared/src/vfs/index.ts`, `shared/src/vfs/vfs.test.ts`
- Modify: `shared/src/index.ts`

**Interfaces:**
- Consumes: `OS` (Task 2).
- Produces (export dạng namespace: `import { vfs } from '@office-neko/shared'`):
  - types `NodeType`, `VNode { id; name; type; parentId: string | null; trashedFrom?: string }`, `Vfs { nodes: Record<string, VNode>; rootId: string; trashId: string; seq: number }`, `VfsError`, `VfsResult = { ok: true; fs: Vfs; id: string } | { ok: false; error: VfsError }`, `TreeSpec { name: string; children?: TreeSpec[] }` (có `children` ⇒ thư mục).
  - `VFS_ERROR_VI`, `fromTree`, `validName`, `childrenOf`, `isInside`, `pathOf`, `findByPath`, `mkdir`, `createFile`, `rename`, `move`, `copy(fs, id, destId, os)`, `remove`, `restore`, `emptyTrash`.
- Quy ước:
  - Id gốc là `'root'`, id thùng rác là `'trash'`; id mới là `n1`, `n2`… theo `seq`.
  - Mọi hàm đều thuần, không sửa đối tượng `fs` cũ.
  - Kiểm tra trùng tên không phân biệt hoa thường.
  - `pathOf` trả `/Tài liệu/2026`; thư mục gốc là `/`; mục trong thùng rác có dạng `/Thùng rác/...`.

- [ ] **Step 1: Viết test**

`shared/src/vfs/vfs.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import * as vfs from './index';

const sample = () =>
  vfs.fromTree([
    { name: 'Tài liệu', children: [{ name: '2026', children: [] }, { name: 'ghi-chu.txt' }] },
    { name: 'Ảnh', children: [{ name: 'meo.jpg' }] },
    { name: 'bien-lai.pdf' },
  ]);

const ok = (r: vfs.VfsResult) => {
  if (!r.ok) throw new Error(r.error);
  return r;
};

describe('vfs', () => {
  it('builds a tree and resolves paths', () => {
    const fs = sample();
    const y = vfs.findByPath(fs, '/Tài liệu/2026');
    expect(y?.type).toBe('folder');
    expect(vfs.pathOf(fs, y!.id)).toBe('/Tài liệu/2026');
    expect(vfs.pathOf(fs, fs.rootId)).toBe('/');
    expect(vfs.findByPath(fs, '/tài liệu/GHI-CHU.txt')?.name).toBe('ghi-chu.txt');
    expect(vfs.findByPath(fs, '/Không có')).toBeUndefined();
  });

  it('lists folders first, then files by name', () => {
    const fs = sample();
    expect(vfs.childrenOf(fs, fs.rootId).map((n) => n.name)).toEqual(['Ảnh', 'Tài liệu', 'bien-lai.pdf']);
  });

  it('creates folders and rejects duplicates and bad names', () => {
    const fs = sample();
    const r = ok(vfs.mkdir(fs, fs.rootId, 'Nhạc'));
    expect(vfs.pathOf(r.fs, r.id)).toBe('/Nhạc');
    expect(fs.nodes[r.id]).toBeUndefined();
    expect(vfs.mkdir(r.fs, fs.rootId, 'nhạc')).toEqual({ ok: false, error: 'duplicate' });
    expect(vfs.mkdir(fs, fs.rootId, '  ')).toEqual({ ok: false, error: 'invalidName' });
    expect(vfs.mkdir(fs, fs.rootId, 'a/b')).toEqual({ ok: false, error: 'invalidName' });
    const file = vfs.findByPath(fs, '/bien-lai.pdf')!;
    expect(vfs.mkdir(fs, file.id, 'x')).toEqual({ ok: false, error: 'notFolder' });
  });

  it('renames', () => {
    const fs = sample();
    const f = vfs.findByPath(fs, '/bien-lai.pdf')!;
    const r = ok(vfs.rename(fs, f.id, 'hoa-don.pdf'));
    expect(vfs.pathOf(r.fs, f.id)).toBe('/hoa-don.pdf');
    expect(vfs.rename(fs, f.id, 'Ảnh')).toEqual({ ok: false, error: 'duplicate' });
  });

  it('moves and blocks moving a folder into itself', () => {
    const fs = sample();
    const f = vfs.findByPath(fs, '/bien-lai.pdf')!;
    const y = vfs.findByPath(fs, '/Tài liệu/2026')!;
    const r = ok(vfs.move(fs, f.id, y.id));
    expect(vfs.pathOf(r.fs, f.id)).toBe('/Tài liệu/2026/bien-lai.pdf');
    const docs = vfs.findByPath(fs, '/Tài liệu')!;
    expect(vfs.move(fs, docs.id, y.id)).toEqual({ ok: false, error: 'intoSelf' });
  });

  it('copies deeply with Windows and Mac naming', () => {
    const fs = sample();
    const pics = vfs.findByPath(fs, '/Ảnh')!;
    const w1 = ok(vfs.copy(fs, pics.id, fs.rootId, 'win'));
    expect(vfs.pathOf(w1.fs, w1.id)).toBe('/Ảnh - Copy');
    expect(vfs.findByPath(w1.fs, '/Ảnh - Copy/meo.jpg')).toBeDefined();
    const w2 = ok(vfs.copy(w1.fs, pics.id, fs.rootId, 'win'));
    expect(vfs.pathOf(w2.fs, w2.id)).toBe('/Ảnh - Copy (2)');
    const cat = vfs.findByPath(fs, '/Ảnh/meo.jpg')!;
    const m1 = ok(vfs.copy(fs, cat.id, pics.id, 'mac'));
    expect(vfs.pathOf(m1.fs, m1.id)).toBe('/Ảnh/meo copy.jpg');
    const m2 = ok(vfs.copy(m1.fs, cat.id, pics.id, 'mac'));
    expect(vfs.pathOf(m2.fs, m2.id)).toBe('/Ảnh/meo copy 2.jpg');
  });

  it('removes to trash and restores', () => {
    const fs = sample();
    const f = vfs.findByPath(fs, '/Tài liệu/ghi-chu.txt')!;
    const del = ok(vfs.remove(fs, f.id));
    expect(vfs.pathOf(del.fs, f.id)).toBe('/Thùng rác/ghi-chu.txt');
    const back = ok(vfs.restore(del.fs, f.id));
    expect(vfs.pathOf(back.fs, f.id)).toBe('/Tài liệu/ghi-chu.txt');
    expect(vfs.restore(fs, f.id)).toEqual({ ok: false, error: 'notInTrash' });
  });

  it('restores to root when the original folder is gone', () => {
    const fs = sample();
    const f = vfs.findByPath(fs, '/Tài liệu/ghi-chu.txt')!;
    const docs = vfs.findByPath(fs, '/Tài liệu')!;
    const a = ok(vfs.remove(fs, f.id));
    const b = ok(vfs.remove(a.fs, docs.id));
    const c = ok(vfs.restore(b.fs, f.id));
    expect(vfs.pathOf(c.fs, f.id)).toBe('/ghi-chu.txt');
  });

  it('empties the trash permanently', () => {
    const fs = sample();
    const docs = vfs.findByPath(fs, '/Tài liệu')!;
    const a = ok(vfs.remove(fs, docs.id));
    const b = vfs.emptyTrash(a.fs);
    expect(b.nodes[docs.id]).toBeUndefined();
    expect(Object.values(b.nodes).some((n) => n.name === '2026')).toBe(false);
    expect(vfs.childrenOf(b, b.trashId)).toEqual([]);
  });
});
```

- [ ] **Step 2: Chạy test, xác nhận FAIL**

Run: `npm test -w shared -- vfs`
Expected: FAIL – không resolve được `./index`.

- [ ] **Step 3: Viết code**

`shared/src/vfs/index.ts`:
```ts
import type { OS } from '../types';

export type NodeType = 'folder' | 'file';
export interface VNode {
  id: string;
  name: string;
  type: NodeType;
  parentId: string | null;
  trashedFrom?: string;
}
export interface Vfs {
  nodes: Record<string, VNode>;
  rootId: string;
  trashId: string;
  seq: number;
}
export type VfsError = 'invalidName' | 'duplicate' | 'notFound' | 'notFolder' | 'intoSelf' | 'notInTrash';
export type VfsResult = { ok: true; fs: Vfs; id: string } | { ok: false; error: VfsError };
export interface TreeSpec {
  name: string;
  children?: TreeSpec[];
}

export const VFS_ERROR_VI: Record<VfsError, string> = {
  invalidName: 'Tên không hợp lệ. Tên không được để trống và không chứa các ký tự / \\ : * ? " < > |',
  duplicate: 'Ở đây đã có một mục cùng tên. Hãy chọn tên khác nhé!',
  notFound: 'Không tìm thấy mục này.',
  notFolder: 'Chỉ có thể đặt đồ vào trong thư mục.',
  intoSelf: 'Không thể chuyển một thư mục vào bên trong chính nó.',
  notInTrash: 'Mục này không nằm trong thùng rác.',
};

const ROOT = 'root';
const TRASH = 'trash';
const TRASH_NAME = 'Thùng rác';
const fail = (error: VfsError): VfsResult => ({ ok: false, error });

export function fromTree(children: TreeSpec[]): Vfs {
  let fs: Vfs = {
    nodes: {
      [ROOT]: { id: ROOT, name: '', type: 'folder', parentId: null },
      [TRASH]: { id: TRASH, name: TRASH_NAME, type: 'folder', parentId: null },
    },
    rootId: ROOT,
    trashId: TRASH,
    seq: 0,
  };
  const addSpec = (parentId: string, spec: TreeSpec) => {
    const r = spec.children ? mkdir(fs, parentId, spec.name) : createFile(fs, parentId, spec.name);
    if (!r.ok) throw new Error(`fromTree: ${r.error} (${spec.name})`);
    fs = r.fs;
    spec.children?.forEach((c) => addSpec(r.id, c));
  };
  children.forEach((c) => addSpec(ROOT, c));
  return fs;
}

const BAD_CHARS = /[\\/:*?"<>|]/;
export function validName(name: string): boolean {
  const t = name.trim();
  return t.length > 0 && t.length <= 100 && !BAD_CHARS.test(t) && t !== '.' && t !== '..';
}

export function childrenOf(fs: Vfs, parentId: string): VNode[] {
  return Object.values(fs.nodes)
    .filter((n) => n.parentId === parentId)
    .sort((a, b) => (a.type === b.type ? a.name.localeCompare(b.name, 'vi') : a.type === 'folder' ? -1 : 1));
}

export function isInside(fs: Vfs, id: string, ancestorId: string): boolean {
  let cur = fs.nodes[id];
  while (cur) {
    if (cur.id === ancestorId) return true;
    cur = cur.parentId ? fs.nodes[cur.parentId] : undefined;
  }
  return false;
}

export function pathOf(fs: Vfs, id: string): string {
  const parts: string[] = [];
  let cur = fs.nodes[id];
  while (cur && cur.parentId !== null) {
    parts.unshift(cur.name);
    cur = fs.nodes[cur.parentId];
  }
  if (cur?.id === TRASH) parts.unshift(TRASH_NAME);
  return '/' + parts.join('/');
}

export function findByPath(fs: Vfs, path: string): VNode | undefined {
  const parts = path.split('/').filter(Boolean);
  let cur = fs.nodes[ROOT];
  if (parts[0] === TRASH_NAME) {
    cur = fs.nodes[TRASH];
    parts.shift();
  }
  for (const p of parts) {
    if (!cur) return undefined;
    const key = p.toLowerCase();
    cur = childrenOf(fs, cur.id).find((n) => n.name.toLowerCase() === key);
  }
  return cur;
}

function nameTaken(fs: Vfs, parentId: string, name: string, exceptId?: string): boolean {
  const key = name.trim().toLowerCase();
  return Object.values(fs.nodes).some((n) => n.parentId === parentId && n.id !== exceptId && n.name.toLowerCase() === key);
}

function withNode(fs: Vfs, node: VNode): Vfs {
  return { ...fs, nodes: { ...fs.nodes, [node.id]: node } };
}

function withoutTrashMark(n: VNode): VNode {
  const copyNode = { ...n };
  delete copyNode.trashedFrom;
  return copyNode;
}

function addNode(fs: Vfs, parentId: string, name: string, type: NodeType): VfsResult {
  const parent = fs.nodes[parentId];
  if (!parent) return fail('notFound');
  if (parent.type !== 'folder') return fail('notFolder');
  if (!validName(name)) return fail('invalidName');
  if (nameTaken(fs, parentId, name)) return fail('duplicate');
  const id = `n${fs.seq + 1}`;
  return { ok: true, id, fs: { ...withNode(fs, { id, name: name.trim(), type, parentId }), seq: fs.seq + 1 } };
}

export const mkdir = (fs: Vfs, parentId: string, name: string): VfsResult => addNode(fs, parentId, name, 'folder');
export const createFile = (fs: Vfs, parentId: string, name: string): VfsResult => addNode(fs, parentId, name, 'file');

export function rename(fs: Vfs, id: string, name: string): VfsResult {
  const n = fs.nodes[id];
  if (!n || n.parentId === null) return fail('notFound');
  if (!validName(name)) return fail('invalidName');
  if (nameTaken(fs, n.parentId, name, id)) return fail('duplicate');
  return { ok: true, id, fs: withNode(fs, { ...n, name: name.trim() }) };
}

export function move(fs: Vfs, id: string, destId: string): VfsResult {
  const n = fs.nodes[id];
  const d = fs.nodes[destId];
  if (!n || !d || n.parentId === null) return fail('notFound');
  if (d.type !== 'folder') return fail('notFolder');
  if (isInside(fs, destId, id)) return fail('intoSelf');
  if (n.parentId === destId) return { ok: true, fs, id };
  if (nameTaken(fs, destId, n.name)) return fail('duplicate');
  return { ok: true, id, fs: withNode(fs, { ...withoutTrashMark(n), parentId: destId }) };
}

function splitExt(name: string, type: NodeType): [string, string] {
  if (type === 'folder') return [name, ''];
  const i = name.lastIndexOf('.');
  return i > 0 ? [name.slice(0, i), name.slice(i)] : [name, ''];
}

function copyName(fs: Vfs, destId: string, name: string, type: NodeType, os: OS): string {
  if (!nameTaken(fs, destId, name)) return name;
  const [base, ext] = splitExt(name, type);
  for (let n = 1; ; n++) {
    let candidate: string;
    if (os === 'win') candidate = n === 1 ? `${base} - Copy${ext}` : `${base} - Copy (${n})${ext}`;
    else candidate = n === 1 ? `${base} copy${ext}` : `${base} copy ${n}${ext}`;
    if (!nameTaken(fs, destId, candidate)) return candidate;
  }
}

export function copy(fs: Vfs, id: string, destId: string, os: OS): VfsResult {
  const n = fs.nodes[id];
  const d = fs.nodes[destId];
  if (!n || !d || n.parentId === null) return fail('notFound');
  if (d.type !== 'folder') return fail('notFolder');
  if (n.type === 'folder' && isInside(fs, destId, id)) return fail('intoSelf');
  let cur = fs;
  const dup = (srcId: string, parentId: string, name: string): string => {
    const src = fs.nodes[srcId]!;
    const r = addNode(cur, parentId, name, src.type);
    if (!r.ok) throw new Error(r.error);
    cur = r.fs;
    for (const c of childrenOf(fs, srcId)) dup(c.id, r.id, c.name);
    return r.id;
  };
  const newId = dup(id, destId, copyName(fs, destId, n.name, n.type, os));
  return { ok: true, id: newId, fs: cur };
}

export function remove(fs: Vfs, id: string): VfsResult {
  const n = fs.nodes[id];
  if (!n || n.parentId === null || n.parentId === TRASH) return fail('notFound');
  return { ok: true, id, fs: withNode(fs, { ...n, parentId: TRASH, trashedFrom: n.parentId }) };
}

export function restore(fs: Vfs, id: string): VfsResult {
  const n = fs.nodes[id];
  if (!n) return fail('notFound');
  if (n.parentId !== TRASH) return fail('notInTrash');
  const from = n.trashedFrom ? fs.nodes[n.trashedFrom] : undefined;
  const dest = from && !isInside(fs, from.id, TRASH) ? from.id : ROOT;
  if (nameTaken(fs, dest, n.name)) return fail('duplicate');
  return { ok: true, id, fs: withNode(fs, { ...withoutTrashMark(n), parentId: dest }) };
}

export function emptyTrash(fs: Vfs): Vfs {
  const nodes: Record<string, VNode> = {};
  for (const n of Object.values(fs.nodes)) {
    if (n.id === TRASH || !isInside(fs, n.id, TRASH)) nodes[n.id] = n;
  }
  return { ...fs, nodes };
}
```

Thêm vào `shared/src/index.ts`:
```ts
export * as vfs from './vfs';
```

- [ ] **Step 4: Chạy test, xác nhận PASS**

Run: `npm test -w shared && npm run typecheck -w shared`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add shared
git commit -m "feat(shared): virtual file system for Explorer/Finder sims" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 5: Chỉ số gõ phím (WPM, độ chính xác, thống kê phím)

**Files:**
- Create: `shared/src/typing/index.ts`, `shared/src/typing/typing.test.ts`
- Modify: `shared/src/index.ts`

**Interfaces:**
- Produces: `type CharState = 'pending' | 'correct' | 'wrong'`, `compareText(target: string, typed: string): CharState[]`, `countCorrect(target: string, typed: string): number`, `wpm(correctChars: number, elapsedMs: number): number`, `accuracy(correctKeys: number, totalKeys: number): number`, `type KeyStats = Record<string, { hit: number; miss: number }>`, `recordKey(stats: KeyStats, key: string, ok: boolean): KeyStats`, `weakestKeys(stats: KeyStats, n?: number, minAttempts?: number): string[]`.
- Công thức:
  - WPM = (số ký tự đúng / 5) / số phút, làm tròn.
  - Độ chính xác = số phím đúng / tổng số phím × 100, làm tròn; nếu chưa gõ phím nào thì trả 100.
  - So sánh theo code point, nên chữ có dấu tính là 1 ký tự.

- [ ] **Step 1: Viết test**

`shared/src/typing/typing.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { accuracy, compareText, countCorrect, recordKey, weakestKeys, wpm } from './index';

describe('compareText', () => {
  it('marks each target char', () => {
    expect(compareText('mèo', 'mé')).toEqual(['correct', 'wrong', 'pending']);
    expect(compareText('ab', '')).toEqual(['pending', 'pending']);
  });
  it('counts correct chars', () => {
    expect(countCorrect('xin chào', 'xin chao')).toBe(7);
  });
});

describe('wpm / accuracy', () => {
  it('computes words per minute from correct chars', () => {
    expect(wpm(250, 60_000)).toBe(50);
    expect(wpm(125, 30_000)).toBe(50);
    expect(wpm(10, 0)).toBe(0);
  });
  it('computes accuracy percent', () => {
    expect(accuracy(95, 100)).toBe(95);
    expect(accuracy(2, 3)).toBe(67);
    expect(accuracy(0, 0)).toBe(100);
  });
});

describe('key stats', () => {
  it('records hits and misses case-insensitively without mutating', () => {
    const a = recordKey({}, 'A', true);
    const b = recordKey(a, 'a', false);
    expect(a).toEqual({ a: { hit: 1, miss: 0 } });
    expect(b).toEqual({ a: { hit: 1, miss: 1 } });
  });
  it('finds weakest keys by miss rate with a minimum number of attempts', () => {
    let s = {};
    for (let i = 0; i < 4; i++) s = recordKey(s, 'j', i < 2);
    for (let i = 0; i < 4; i++) s = recordKey(s, 'k', i < 3);
    s = recordKey(s, 'q', false);
    expect(weakestKeys(s, 5, 3)).toEqual(['j', 'k']);
  });
});
```

- [ ] **Step 2: Chạy test, xác nhận FAIL**

Run: `npm test -w shared -- typing`
Expected: FAIL – không resolve được `./index`.

- [ ] **Step 3: Viết code**

`shared/src/typing/index.ts`:
```ts
export type CharState = 'pending' | 'correct' | 'wrong';

export function compareText(target: string, typed: string): CharState[] {
  const t = [...target];
  const y = [...typed];
  return t.map((ch, i) => (i >= y.length ? 'pending' : y[i] === ch ? 'correct' : 'wrong'));
}

export function countCorrect(target: string, typed: string): number {
  return compareText(target, typed).filter((s) => s === 'correct').length;
}

export function wpm(correctChars: number, elapsedMs: number): number {
  if (elapsedMs <= 0) return 0;
  return Math.round(correctChars / 5 / (elapsedMs / 60_000));
}

export function accuracy(correctKeys: number, totalKeys: number): number {
  if (totalKeys === 0) return 100;
  return Math.round((correctKeys / totalKeys) * 100);
}

export type KeyStats = Record<string, { hit: number; miss: number }>;

export function recordKey(stats: KeyStats, key: string, ok: boolean): KeyStats {
  const k = key.toLowerCase();
  const prev = stats[k] ?? { hit: 0, miss: 0 };
  return { ...stats, [k]: ok ? { ...prev, hit: prev.hit + 1 } : { ...prev, miss: prev.miss + 1 } };
}

export function weakestKeys(stats: KeyStats, n = 5, minAttempts = 3): string[] {
  return Object.entries(stats)
    .map(([key, s]) => ({ key, total: s.hit + s.miss, miss: s.miss }))
    .filter((e) => e.total >= minAttempts && e.miss > 0)
    .sort((a, b) => b.miss / b.total - a.miss / a.total || b.miss - a.miss)
    .slice(0, n)
    .map((e) => e.key);
}
```

Thêm vào `shared/src/index.ts`:
```ts
export * from './typing';
```

- [ ] **Step 4: Chạy test, xác nhận PASS**

Run: `npm test -w shared && npm run typecheck -w shared`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add shared
git commit -m "feat(shared): typing metrics (WPM, accuracy, key stats)" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 6: Bộ gõ tiếng Việt Telex + VNI

**Files:**
- Create: `shared/src/ime/index.ts`, `shared/src/ime/ime.test.ts`
- Modify: `shared/src/index.ts`

**Interfaces:**
- Produces: `type ImeMethod = 'telex' | 'vni'`, `interface Letter { ch: string; up: boolean; fromW?: boolean }`, `interface ImeWord { letters: Letter[]; tone: number }`, `interface ImeState { done: string; word: ImeWord }`, `emptyWord()`, `emptyIme()`, `tonePosition(letters: Letter[]): number`, `renderWord(w: ImeWord): string`, `pressKey(w: ImeWord, key: string, method: ImeMethod): ImeWord`, `imeInput(s: ImeState, key: string, method: ImeMethod): ImeState` (nhận `'\b'` hoặc `'Backspace'` là xoá lùi), `imeBackspace(s: ImeState): ImeState`, `imeText(s: ImeState): string`, `typeKeys(keys: string, method: ImeMethod): string`.
- **Quy tắc Telex:**
  - Dấu thanh: `s` sắc, `f` huyền, `r` hỏi, `x` ngã, `j` nặng; `z` xoá dấu.
  - Chữ biến thể: `aa` → â, `ee` → ê, `oo` → ô, `dd` → đ.
  - Phím `w`: `uo` + `w` → ươ; `a`/`o`/`u` + `w` → ă/ơ/ư; `w` đứng một mình → ư, gõ `ww` → w.
  - Gõ lặp phím để huỷ: `ass` → as, `aaa` → aa.
- **Quy tắc VNI:**
  - Dấu thanh: `1` sắc, `2` huyền, `3` hỏi, `4` ngã, `5` nặng; `0` xoá dấu.
  - Chữ biến thể: `6` mũ (â ê ô), `7` móc (ơ ư; `uo` + `7` → ươ), `8` trăng (ă), `9` đ.
  - Chữ số chỉ là phím bổ trợ khi từ đang gõ đã có chữ cái; nếu không, số được giữ nguyên.
- **Đặt dấu thanh theo kiểu mới:**
  - Nếu cụm nguyên âm có chữ đã biến thể (ă â ê ô ơ ư), dấu đặt lên chữ biến thể cuối cùng.
  - Cụm chỉ có 1 nguyên âm: đặt lên nguyên âm đó.
  - Có phụ âm cuối: đặt lên nguyên âm cuối của cụm.
  - Cụm 2 nguyên âm không có phụ âm cuối: `oa`, `oe`, `uy` đặt lên chữ thứ 2 (hoà, khoẻ, thuỷ); các cụm khác đặt lên chữ thứ nhất (mái, mùa).
  - Cụm 3 nguyên âm: đặt lên chữ giữa.
  - `u` sau `q` và `i` sau `g` được coi là phụ âm khi còn nguyên âm khác theo sau (quá, già; nhưng gì).
- **Xoá lùi:** xoá chữ cái cuối của từ đang gõ; nếu từ không còn nguyên âm thì bỏ dấu thanh; nếu từ đang gõ đã trống thì xoá ký tự cuối của phần văn bản đã xong.

- [ ] **Step 1: Viết test**

`shared/src/ime/ime.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { typeKeys } from './index';

const telex: [string, string][] = [
  ['tieengs', 'tiếng'],
  ['Vieejt Nam', 'Việt Nam'],
  ['VIEEJT', 'VIỆT'],
  ['dduowcj', 'được'],
  ['nguowif', 'người'],
  ['hoaf', 'hoà'],
  ['khoer', 'khoẻ'],
  ['thuyr', 'thuỷ'],
  ['mais', 'mái'],
  ['muaf', 'mùa'],
  ['chaof', 'chào'],
  ['toans', 'toán'],
  ['gif', 'gì'],
  ['giaf', 'già'],
  ['giuwx', 'giữ'],
  ['quas', 'quá'],
  ['cuwar', 'cửa'],
  ['khuyeen', 'khuyên'],
  ['DDaf Nawngx', 'Đà Nẵng'],
  ['xin chaof', 'xin chào'],
  ['ddi hocj', 'đi học'],
  ['mwa', 'mưa'],
  ['w', 'ư'],
  ['ww', 'w'],
  ['ass', 'as'],
  ['aaa', 'aa'],
  ['hoaz', 'hoaz'],
  ['hoafz', 'hoa'],
  ['tieengs\b', 'tiến'],
  ['mas\b', 'm'],
  ['ab \b\bc', 'ac'],
  ['Xin chaof, banj!', 'Xin chào, bạn!'],
];

const vni: [string, string][] = [
  ['tie6ng1', 'tiếng'],
  ['Vie6t5 Nam', 'Việt Nam'],
  ['d9u7o7c5', 'được'],
  ['hoa2', 'hoà'],
  ['so61 123', 'số 123'],
  ['a11', 'a1'],
  ['a8n9', 'ăn9'],
  ['hoa20', 'hoa'],
];

describe('telex', () => {
  it.each(telex)('%s → %s', (keys, out) => {
    expect(typeKeys(keys, 'telex')).toBe(out);
  });
});

describe('vni', () => {
  it.each(vni)('%s → %s', (keys, out) => {
    expect(typeKeys(keys, 'vni')).toBe(out);
  });
});
```

- [ ] **Step 2: Chạy test, xác nhận FAIL**

Run: `npm test -w shared -- ime`
Expected: FAIL – không resolve được `./index`.

- [ ] **Step 3: Viết code**

`shared/src/ime/index.ts`:
```ts
export type ImeMethod = 'telex' | 'vni';
export interface Letter {
  ch: string;
  up: boolean;
  /** ư sinh ra từ phím w đứng một mình (gõ w lần nữa → w). */
  fromW?: boolean;
}
export interface ImeWord {
  letters: Letter[];
  tone: number;
}
export interface ImeState {
  done: string;
  word: ImeWord;
}

/** Nguyên âm → 6 dạng: không dấu, sắc, huyền, hỏi, ngã, nặng. */
const TONE_TABLE: Record<string, string> = {
  a: 'aáàảãạ', ă: 'ăắằẳẵặ', â: 'âấầẩẫậ', e: 'eéèẻẽẹ', ê: 'êếềểễệ', i: 'iíìỉĩị',
  o: 'oóòỏõọ', ô: 'ôốồổỗộ', ơ: 'ơớờởỡợ', u: 'uúùủũụ', ư: 'ưứừửữự', y: 'yýỳỷỹỵ',
};
const MODIFIED = 'ăâêôơư';

export const emptyWord = (): ImeWord => ({ letters: [], tone: 0 });
export const emptyIme = (): ImeState => ({ done: '', word: emptyWord() });

const isVowel = (ch: string) => ch in TONE_TABLE;
const hasVowel = (w: ImeWord) => w.letters.some((l) => isVowel(l.ch));

function nucleus(ls: Letter[]): number[] {
  let start = ls.findIndex((l) => isVowel(l.ch));
  if (start < 0) return [];
  let end = start;
  while (end + 1 < ls.length && isVowel(ls[end + 1]!.ch)) end++;
  if (start > 0 && end > start) {
    const prev = ls[start - 1]!.ch;
    const first = ls[start]!.ch;
    if ((prev === 'q' && first === 'u') || (prev === 'g' && first === 'i')) start++;
  }
  const idx: number[] = [];
  for (let i = start; i <= end; i++) idx.push(i);
  return idx;
}

export function tonePosition(ls: Letter[]): number {
  const idx = nucleus(ls);
  if (!idx.length) return -1;
  const modified = idx.filter((i) => MODIFIED.includes(ls[i]!.ch));
  if (modified.length) return modified[modified.length - 1]!;
  if (idx.length === 1) return idx[0]!;
  const last = idx[idx.length - 1]!;
  if (last < ls.length - 1) return last;
  if (idx.length === 2) {
    const pair = ls[idx[0]!]!.ch + ls[idx[1]!]!.ch;
    return ['oa', 'oe', 'uy'].includes(pair) ? idx[1]! : idx[0]!;
  }
  return idx[1]!;
}

export function renderWord(w: ImeWord): string {
  const pos = w.tone ? tonePosition(w.letters) : -1;
  return w.letters
    .map((l, i) => {
      let ch = l.ch;
      if (i === pos) {
        const row = TONE_TABLE[ch];
        if (row) ch = [...row][w.tone] ?? ch;
      }
      return l.up ? ch.toUpperCase() : ch;
    })
    .join('');
}

function append(w: ImeWord, l: Letter): ImeWord {
  return { ...w, letters: [...w.letters, l] };
}

function setCh(w: ImeWord, i: number, ch: string): ImeWord {
  return { ...w, letters: w.letters.map((l, j) => (j === i ? { ch, up: l.up } : l)) };
}

function setTone(w: ImeWord, tone: number, lit: Letter): ImeWord {
  if (w.tone === tone) return append({ ...w, tone: 0 }, lit);
  return { ...w, tone };
}

/** Sửa chữ cuối cùng khớp `map`; nếu gặp chữ đã sửa (`revert`) trước thì trả lại chữ gốc và thêm phím gõ. */
function modifyLast(w: ImeWord, map: Record<string, string>, revert: Record<string, string>, lit: Letter): ImeWord | null {
  for (let i = w.letters.length - 1; i >= 0; i--) {
    const ch = w.letters[i]!.ch;
    const back = revert[ch];
    if (back !== undefined) return append(setCh(w, i, back), lit);
    const to = map[ch];
    if (to !== undefined) return setCh(w, i, to);
  }
  return null;
}

function hornPair(w: ImeWord, lit: Letter): ImeWord | null {
  for (let i = w.letters.length - 2; i >= 0; i--) {
    const a = w.letters[i]!.ch;
    const b = w.letters[i + 1]!.ch;
    if ((a === 'u' || a === 'ư') && (b === 'o' || b === 'ô' || b === 'ơ')) {
      if (a === 'ư' && b === 'ơ') return append(setCh(setCh(w, i, 'u'), i + 1, 'o'), lit);
      return setCh(setCh(w, i, 'ư'), i + 1, 'ơ');
    }
  }
  return null;
}

const HORN: Record<string, string> = { a: 'ă', â: 'ă', o: 'ơ', ô: 'ơ', u: 'ư' };
const UNHORN: Record<string, string> = { ă: 'a', ơ: 'o', ư: 'u' };

function telexW(w: ImeWord, lit: Letter): ImeWord {
  const pair = hornPair(w, lit);
  if (pair) return pair;
  for (let i = w.letters.length - 1; i >= 0; i--) {
    const l = w.letters[i]!;
    const back = UNHORN[l.ch];
    if (back !== undefined) {
      if (l.fromW) return { ...w, letters: w.letters.map((x, j) => (j === i ? { ch: 'w', up: x.up } : x)) };
      return append(setCh(w, i, back), lit);
    }
    const to = HORN[l.ch];
    if (to !== undefined) return setCh(w, i, to);
  }
  return append(w, { ch: 'ư', up: lit.up, fromW: true });
}

const TELEX_TONES: Record<string, number> = { s: 1, f: 2, r: 3, x: 4, j: 5 };

function telexKey(w: ImeWord, k: string, lit: Letter): ImeWord | null {
  const tone = TELEX_TONES[k];
  if (tone !== undefined && hasVowel(w)) return setTone(w, tone, lit);
  if (k === 'z' && w.tone) return { ...w, tone: 0 };
  switch (k) {
    case 'a':
      return modifyLast(w, { a: 'â', ă: 'â' }, { â: 'a' }, lit);
    case 'e':
      return modifyLast(w, { e: 'ê' }, { ê: 'e' }, lit);
    case 'o':
      return modifyLast(w, { o: 'ô', ơ: 'ô' }, { ô: 'o' }, lit);
    case 'd':
      return modifyLast(w, { d: 'đ' }, { đ: 'd' }, lit);
    case 'w':
      return telexW(w, lit);
    default:
      return null;
  }
}

function vniKey(w: ImeWord, k: string, lit: Letter): ImeWord | null {
  if ('12345'.includes(k) && hasVowel(w)) return setTone(w, Number(k), lit);
  if (k === '0' && w.tone) return { ...w, tone: 0 };
  switch (k) {
    case '6':
      return modifyLast(w, { a: 'â', ă: 'â', e: 'ê', o: 'ô', ơ: 'ô' }, { â: 'a', ê: 'e', ô: 'o' }, lit);
    case '7':
      return hornPair(w, lit) ?? modifyLast(w, { o: 'ơ', ô: 'ơ', u: 'ư' }, { ơ: 'o', ư: 'u' }, lit);
    case '8':
      return modifyLast(w, { a: 'ă', â: 'ă' }, { ă: 'a' }, lit);
    case '9':
      return modifyLast(w, { d: 'đ' }, { đ: 'd' }, lit);
    default:
      return null;
  }
}

export function pressKey(w: ImeWord, key: string, method: ImeMethod): ImeWord {
  const k = key.toLowerCase();
  const lit: Letter = { ch: k, up: key !== k };
  const r = method === 'telex' ? telexKey(w, k, lit) : vniKey(w, k, lit);
  return r ?? append(w, lit);
}

function isWordKey(key: string, method: ImeMethod, w: ImeWord): boolean {
  if (/^[a-z]$/i.test(key)) return true;
  return method === 'vni' && /^[0-9]$/.test(key) && w.letters.some((l) => /[a-zăâêôơưđ]/.test(l.ch));
}

export function imeBackspace(s: ImeState): ImeState {
  if (s.word.letters.length) {
    const letters = s.word.letters.slice(0, -1);
    const tone = tonePosition(letters) >= 0 ? s.word.tone : 0;
    return { ...s, word: { letters, tone } };
  }
  return { ...s, done: [...s.done].slice(0, -1).join('') };
}

export function imeInput(s: ImeState, key: string, method: ImeMethod): ImeState {
  if (key === '\b' || key === 'Backspace') return imeBackspace(s);
  if ([...key].length !== 1) return s;
  if (isWordKey(key, method, s.word)) return { ...s, word: pressKey(s.word, key, method) };
  return { done: s.done + renderWord(s.word) + key, word: emptyWord() };
}

export function imeText(s: ImeState): string {
  return s.done + renderWord(s.word);
}

export function typeKeys(keys: string, method: ImeMethod): string {
  return imeText([...keys].reduce((s, k) => imeInput(s, k, method), emptyIme()));
}
```

Thêm vào `shared/src/index.ts`:
```ts
export * from './ime';
```

- [ ] **Step 4: Chạy test, xác nhận PASS**

Run: `npm test -w shared && npm run typecheck -w shared`
Expected: PASS toàn bộ 40 case Telex/VNI. Nếu một case sai, sửa quy tắc trong `ime/index.ts` (không sửa kỳ vọng của test) và giải thích trong commit.

- [ ] **Step 5: Commit**

```bash
git add shared
git commit -m "feat(shared): Telex and VNI Vietnamese input engine" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 7: Khung chấm bài + logic tiến độ (sao, XP, cấp, streak, mở khoá)

**Files:**
- Create: `shared/src/grading/core.ts`, `shared/src/grading/index.ts`, `shared/src/grading/grading.test.ts`
- Create: `shared/src/progress.ts`, `shared/src/progress.test.ts`
- Modify: `shared/src/index.ts`

**Interfaces:**
- Consumes: `SimKind`, `Track`, `Lesson`, `OS` (Task 2).
- Produces (grading):
  - `interface CheckResult { ok: boolean; messageVi: string }`
  - `type Grader<S = unknown, C = unknown> = (state: S, check: C) => CheckResult`
  - `interface GradeReport { pass: boolean; results: CheckResult[] }`
  - `gradeWith<S, C>(grader: Grader<S, C>, state: S, checks: C[]): GradeReport`: `pass` chỉ đúng khi có ít nhất 1 check và mọi check đều đạt; nếu grader ném lỗi thì check đó tính là chưa đạt.
  - `GRADERS: Partial<Record<SimKind, Grader<any, any>>>`: object mà các giai đoạn sau thêm grader vào.
  - `grade(sim: SimKind, state: unknown, checks: unknown[]): GradeReport`: ném lỗi nếu sim chưa có grader.
- Produces (progress):
  - `interface LessonOutcome { maxHintLevel: 0 | 1 | 2 | 3; failures: number }`
  - `computeStars(o: LessonOutcome): 1 | 2 | 3`
    - 1 sao nếu đã dùng gợi ý bậc ≥ 2 hoặc sai ≥ 4 lần.
    - 2 sao nếu dùng gợi ý bậc 1 hoặc sai 2–3 lần.
    - Còn lại 3 sao.
  - `XP_PER_STAR = 10`, `xpGain(prevStars: number, newStars: number): number` (chỉ cộng phần sao tăng thêm).
  - `levelFromXp(xp: number): { level: number; into: number; need: number }` (lên cấp n cần tổng 50·(n−1)² XP).
  - `dayKey(d: Date): string` (ngày theo giờ máy, dạng `YYYY-MM-DD`), `computeStreak(days: Iterable<string>, today: string): number`.
  - `visibleLessons(track: Track, lessons: Record<string, Lesson>, os: OS): Lesson[]`
  - `unlockState(tracks: Track[], lessons: Record<string, Lesson>, os: OS, completed: ReadonlySet<string>): { trackUnlocked: Set<string>; lessonUnlocked: Set<string> }`
  - `nextLessonId(tracks: Track[], lessons: Record<string, Lesson>, os: OS, currentId: string): string | null`

- [ ] **Step 1: Viết test grading**

`shared/src/grading/grading.test.ts`:
```ts
import { describe, it, expect, afterEach } from 'vitest';
import { gradeWith, grade, GRADERS, type Grader } from './index';

type S = { n: number };
type C = { min: number };
const atLeast: Grader<S, C> = (s, c) => ({ ok: s.n >= c.min, messageVi: `Cần ít nhất ${c.min}` });

describe('gradeWith', () => {
  it('passes only when every check passes', () => {
    expect(gradeWith(atLeast, { n: 5 }, [{ min: 1 }, { min: 5 }]).pass).toBe(true);
    const r = gradeWith(atLeast, { n: 3 }, [{ min: 1 }, { min: 5 }]);
    expect(r.pass).toBe(false);
    expect(r.results.map((x) => x.ok)).toEqual([true, false]);
  });
  it('fails with no checks', () => {
    expect(gradeWith(atLeast, { n: 1 }, []).pass).toBe(false);
  });
  it('treats a throwing grader as a failed check', () => {
    const boom: Grader<S, C> = () => {
      throw new Error('x');
    };
    const r = gradeWith(boom, { n: 1 }, [{ min: 0 }]);
    expect(r.pass).toBe(false);
    expect(r.results[0]?.messageVi).toMatch(/thử lại/);
  });
});

describe('grade registry', () => {
  afterEach(() => {
    delete GRADERS.mouse;
  });
  it('looks up the grader by sim kind', () => {
    GRADERS.mouse = atLeast;
    expect(grade('mouse', { n: 2 }, [{ min: 2 }]).pass).toBe(true);
  });
  it('throws for sims without a grader', () => {
    expect(() => grade('excel', {}, [{}])).toThrow(/excel/);
  });
});
```

- [ ] **Step 2: Viết test progress**

`shared/src/progress.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import type { Lesson, Track } from './types';
import { computeStars, computeStreak, dayKey, levelFromXp, nextLessonId, unlockState, visibleLessons, xpGain } from './progress';

const L = (id: string, trackId: string, os?: 'win' | 'mac'): Lesson => ({
  id, trackId, chapterId: `${trackId}.c`, title: id, minutes: 3, os, steps: [],
});
const lessons: Record<string, Lesson> = {
  a1: L('a1', 'a'), a2w: L('a2w', 'a', 'win'), a2m: L('a2m', 'a', 'mac'), a3: L('a3', 'a'),
  b1: L('b1', 'b'),
};
const tracks: Track[] = [
  { id: 'b', order: 1, title: 'B', emoji: '', blurb: '', color: '', chapters: [{ id: 'b.c', title: '', lessonIds: ['b1'] }] },
  { id: 'a', order: 0, title: 'A', emoji: '', blurb: '', color: '', chapters: [{ id: 'a.c', title: '', lessonIds: ['a1', 'a2w', 'a2m', 'a3'] }] },
  { id: 'c', order: 2, title: 'C', emoji: '', blurb: '', color: '', chapters: [] },
];

describe('stars and xp', () => {
  it('computes stars from hints and failures', () => {
    expect(computeStars({ maxHintLevel: 0, failures: 0 })).toBe(3);
    expect(computeStars({ maxHintLevel: 0, failures: 1 })).toBe(3);
    expect(computeStars({ maxHintLevel: 1, failures: 0 })).toBe(2);
    expect(computeStars({ maxHintLevel: 0, failures: 3 })).toBe(2);
    expect(computeStars({ maxHintLevel: 2, failures: 0 })).toBe(1);
    expect(computeStars({ maxHintLevel: 0, failures: 4 })).toBe(1);
  });
  it('awards xp only for improvement', () => {
    expect(xpGain(0, 3)).toBe(30);
    expect(xpGain(2, 3)).toBe(10);
    expect(xpGain(3, 1)).toBe(0);
  });
  it('derives level from xp', () => {
    expect(levelFromXp(0)).toEqual({ level: 1, into: 0, need: 50 });
    expect(levelFromXp(50)).toEqual({ level: 2, into: 0, need: 150 });
    expect(levelFromXp(199)).toEqual({ level: 2, into: 149, need: 150 });
  });
});

describe('streak', () => {
  it('formats local day keys', () => {
    expect(dayKey(new Date(2026, 0, 5))).toBe('2026-01-05');
  });
  it('counts consecutive days ending today or yesterday', () => {
    expect(computeStreak(['2026-09-17', '2026-09-18', '2026-09-19'], '2026-09-19')).toBe(3);
    expect(computeStreak(['2026-09-17', '2026-09-18'], '2026-09-19')).toBe(2);
    expect(computeStreak(['2026-09-16'], '2026-09-19')).toBe(0);
    expect(computeStreak(['2026-02-28', '2026-03-01'], '2026-03-01')).toBe(2);
  });
});

describe('unlocking', () => {
  it('filters lessons by OS in chapter order', () => {
    expect(visibleLessons(tracks[1]!, lessons, 'mac').map((l) => l.id)).toEqual(['a1', 'a2m', 'a3']);
  });
  it('unlocks the first lesson and each lesson after a completed one', () => {
    const s = unlockState(tracks, lessons, 'win', new Set(['a1']));
    expect([...s.trackUnlocked]).toEqual(['a']);
    expect([...s.lessonUnlocked]).toEqual(['a1', 'a2w']);
  });
  it('unlocks the next track when the previous one is complete', () => {
    const s = unlockState(tracks, lessons, 'win', new Set(['a1', 'a2w', 'a3']));
    expect(s.trackUnlocked.has('b')).toBe(true);
    expect(s.lessonUnlocked.has('b1')).toBe(true);
    expect(s.trackUnlocked.has('c')).toBe(false);
  });
  it('finds the next lesson across tracks', () => {
    expect(nextLessonId(tracks, lessons, 'mac', 'a2m')).toBe('a3');
    expect(nextLessonId(tracks, lessons, 'mac', 'a3')).toBe('b1');
    expect(nextLessonId(tracks, lessons, 'mac', 'b1')).toBeNull();
  });
});
```

- [ ] **Step 3: Chạy test, xác nhận FAIL**

Run: `npm test -w shared -- grading progress`
Expected: FAIL – không resolve được `./index` / `./progress`.

- [ ] **Step 4: Viết code**

`shared/src/grading/core.ts`:
```ts
export interface CheckResult {
  ok: boolean;
  messageVi: string;
}
export type Grader<S = unknown, C = unknown> = (state: S, check: C) => CheckResult;
export interface GradeReport {
  pass: boolean;
  results: CheckResult[];
}

export function gradeWith<S, C>(grader: Grader<S, C>, state: S, checks: C[]): GradeReport {
  const results = checks.map((c) => {
    try {
      return grader(state, c);
    } catch {
      return { ok: false, messageVi: 'Mochi chưa kiểm tra được bước này, bạn thử lại nhé.' };
    }
  });
  return { pass: results.length > 0 && results.every((r) => r.ok), results };
}
```

`shared/src/grading/index.ts`:
```ts
import type { SimKind } from '../types';
import { gradeWith, type GradeReport, type Grader } from './core';

export * from './core';

/** Mỗi giai đoạn thêm grader của trình mô phỏng mình vào đây. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const GRADERS: Partial<Record<SimKind, Grader<any, any>>> = {};

export function grade(sim: SimKind, state: unknown, checks: unknown[]): GradeReport {
  const g = GRADERS[sim];
  if (!g) throw new Error(`No grader for sim "${sim}"`);
  return gradeWith(g, state, checks);
}
```

`shared/src/progress.ts`:
```ts
import type { Lesson, OS, Track } from './types';

export interface LessonOutcome {
  maxHintLevel: 0 | 1 | 2 | 3;
  failures: number;
}

export function computeStars(o: LessonOutcome): 1 | 2 | 3 {
  if (o.maxHintLevel >= 2 || o.failures >= 4) return 1;
  if (o.maxHintLevel === 1 || o.failures >= 2) return 2;
  return 3;
}

export const XP_PER_STAR = 10;
export function xpGain(prevStars: number, newStars: number): number {
  return Math.max(0, newStars - prevStars) * XP_PER_STAR;
}

export function levelFromXp(xp: number): { level: number; into: number; need: number } {
  const level = Math.floor(Math.sqrt(Math.max(0, xp) / 50)) + 1;
  const base = 50 * (level - 1) ** 2;
  const next = 50 * level ** 2;
  return { level, into: xp - base, need: next - base };
}

export function dayKey(d: Date): string {
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

function shiftDay(key: string, delta: number): string {
  const [y, m, d] = key.split('-').map(Number);
  return dayKey(new Date(y!, m! - 1, d! + delta));
}

export function computeStreak(days: Iterable<string>, today: string): number {
  const set = new Set(days);
  let cur = set.has(today) ? today : shiftDay(today, -1);
  let n = 0;
  while (set.has(cur)) {
    n++;
    cur = shiftDay(cur, -1);
  }
  return n;
}

export function visibleLessons(track: Track, lessons: Record<string, Lesson>, os: OS): Lesson[] {
  return track.chapters
    .flatMap((c) => c.lessonIds)
    .map((id) => lessons[id])
    .filter((l): l is Lesson => !!l && (!l.os || l.os === os));
}

const byOrder = (tracks: Track[]) => [...tracks].sort((a, b) => a.order - b.order);

export function unlockState(
  tracks: Track[],
  lessons: Record<string, Lesson>,
  os: OS,
  completed: ReadonlySet<string>,
): { trackUnlocked: Set<string>; lessonUnlocked: Set<string> } {
  const trackUnlocked = new Set<string>();
  const lessonUnlocked = new Set<string>();
  let prevDone = true;
  for (const t of byOrder(tracks)) {
    const ls = visibleLessons(t, lessons, os);
    if (prevDone) {
      trackUnlocked.add(t.id);
      ls.forEach((l, i) => {
        if (i === 0 || completed.has(ls[i - 1]!.id)) lessonUnlocked.add(l.id);
      });
    }
    prevDone = prevDone && ls.every((l) => completed.has(l.id));
  }
  return { trackUnlocked, lessonUnlocked };
}

export function nextLessonId(tracks: Track[], lessons: Record<string, Lesson>, os: OS, currentId: string): string | null {
  const order = byOrder(tracks).flatMap((t) => visibleLessons(t, lessons, os).map((l) => l.id));
  const i = order.indexOf(currentId);
  return i >= 0 && i + 1 < order.length ? order[i + 1]! : null;
}
```

Lưu ý: trong test "unlocks the next track", track `b` mở vì `a` xong; track `c` rỗng nhưng vẫn khoá vì `b1` chưa xong. Còn trường hợp track rỗng đứng sau một track đã xong thì được mở; bản đồ sẽ hiển thị track đó là "đang soạn".

Cập nhật `shared/src/index.ts` thành:
```ts
export * from './types';
export * from './os';
export * from './search';
export * as vfs from './vfs';
export * from './typing';
export * from './ime';
export * from './grading';
export * from './progress';

export const APP_NAME = 'Tin Học Cùng Mochi';
```

- [ ] **Step 5: Chạy test, xác nhận PASS**

Run: `npm test -w shared && npm run typecheck -w shared`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add shared
git commit -m "feat(shared): grading core and progress rules (stars, xp, streak, unlocks)" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 8: Cơ sở dữ liệu (Dexie), hồ sơ, ghi kết quả bài học, sao lưu

**Files:**
- Create: `client/src/db/db.ts`, `client/src/db/profile.tsx`
- Create: `client/src/progress/record.ts`, `client/src/progress/backup.ts`, `client/src/progress/useStats.ts`
- Create: `client/src/test/utils.tsx`
- Test: `client/src/db/profile.test.tsx`, `client/src/progress/record.test.ts`, `client/src/progress/backup.test.ts`

**Interfaces:**
- Consumes: `OS`, `SimKind`, `LessonProgress`, `detectOs`, `dayKey`, `xpGain`, `computeStreak` (shared).
- Produces:
  - `db.ts`:
    - `interface Profile { id: 'me'; name: string; os: OS; dailyGoalMin: 5 | 10 | 20; fontScale: 'md' | 'lg' | 'xl'; sound: boolean; reducedMotion: boolean; xp: number; createdAt: string }`
    - Các kiểu bản ghi `ProgressRow`, `TypingRun`, `KeyStatRow`, `ActivityRow { day; minutes; xp }`, `BadgeRow`, `SandboxDoc`.
    - `class NekoDB`, đối tượng dùng chung `db`, `TABLES` (tuple tên bảng), `type TableName`.
  - `profile.tsx`:
    - `ProfileContext`, `ProfileProvider` (đọc hồ sơ bằng liveQuery và áp `data-font`/`data-motion` lên `<html>`).
    - `useProfile(): Profile | null | undefined`, trong đó `undefined` = đang tải hoặc không có provider, `null` = chưa có hồ sơ.
    - `useOs(): OS`, `guessOs(): OS`.
    - `createProfile(p: NewProfile, now?: Date): Promise<Profile>` với `type NewProfile = Pick<Profile, 'name' | 'os' | 'dailyGoalMin'>`.
    - `updateProfile(patch: Partial<Omit<Profile, 'id'>>): Promise<void>`.
  - `record.ts`: `recordLessonResult(r: { lessonId: string; stars: 1 | 2 | 3; hintsUsed: number; timeMs: number; now?: Date }): Promise<{ xpGained: number; prevStars: number }>`.
  - `backup.ts`:
    - `BACKUP_SCHEMA = 1`, `interface BackupFile { app: 'office-neko'; schemaVersion: number; exportedAt: string; tables: Record<TableName, unknown[]> }`.
    - `exportBackup(now?): Promise<BackupFile>`, `backupFileName(now?): string`, `parseBackup(text: string): BackupFile` (ném `Error` với thông báo tiếng Việt), `importBackup(b: BackupFile): Promise<void>`.
    - `downloadJson(fileName: string, data: unknown): void`, `readFileText(file: File): Promise<string>`.
  - `useStats.ts`:
    - `useCompleted(): { completed: Set<string>; stars: Record<string, number> }`
    - `useStreak(): number`, `useTodayMinutes(): number`.
  - `test/utils.tsx`:
    - `resetDb(): Promise<void>`, `makeProfile(overrides?: Partial<Profile>): Profile`.
    - `renderWithProfile(ui, { profile?, route? })`: bọc `MemoryRouter` và `ProfileContext.Provider`.

- [ ] **Step 1: Viết db.ts**

`client/src/db/db.ts`:
```ts
import Dexie, { type Table } from 'dexie';
import type { LessonProgress, OS, SimKind } from '@office-neko/shared';

export interface Profile {
  id: 'me';
  name: string;
  os: OS;
  dailyGoalMin: 5 | 10 | 20;
  fontScale: 'md' | 'lg' | 'xl';
  sound: boolean;
  reducedMotion: boolean;
  xp: number;
  createdAt: string;
}
export type ProgressRow = LessonProgress;
export interface TypingRun {
  id?: number;
  at: string;
  mode: string;
  wpm: number;
  accuracy: number;
}
export interface KeyStatRow {
  key: string;
  hit: number;
  miss: number;
}
export interface ActivityRow {
  day: string;
  minutes: number;
  xp: number;
}
export interface BadgeRow {
  id: string;
  earnedAt: string;
}
export interface SandboxDoc {
  id: string;
  sim: SimKind;
  name: string;
  state: unknown;
  updatedAt: string;
}

export const TABLES = ['profile', 'progress', 'typingRuns', 'keyStats', 'activity', 'badges', 'sandboxDocs'] as const;
export type TableName = (typeof TABLES)[number];

export class NekoDB extends Dexie {
  profile!: Table<Profile, string>;
  progress!: Table<ProgressRow, string>;
  typingRuns!: Table<TypingRun, number>;
  keyStats!: Table<KeyStatRow, string>;
  activity!: Table<ActivityRow, string>;
  badges!: Table<BadgeRow, string>;
  sandboxDocs!: Table<SandboxDoc, string>;

  constructor(name = 'office-neko') {
    super(name);
    this.version(1).stores({
      profile: 'id',
      progress: 'lessonId',
      typingRuns: '++id, at',
      keyStats: 'key',
      activity: 'day',
      badges: 'id',
      sandboxDocs: 'id, sim, updatedAt',
    });
  }
}

export const db = new NekoDB();
```

- [ ] **Step 2: Viết profile.tsx**

`client/src/db/profile.tsx`:
```tsx
import { createContext, useContext, useEffect, type ReactNode } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { detectOs, type OS } from '@office-neko/shared';
import { db, type Profile } from './db';

export type NewProfile = Pick<Profile, 'name' | 'os' | 'dailyGoalMin'>;

export const ProfileContext = createContext<Profile | null | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const profile = useLiveQuery(async () => (await db.profile.get('me')) ?? null, []);
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.font = profile?.fontScale ?? 'md';
    if (profile?.reducedMotion) root.dataset.motion = 'reduce';
    else delete root.dataset.motion;
  }, [profile?.fontScale, profile?.reducedMotion]);
  return <ProfileContext.Provider value={profile}>{children}</ProfileContext.Provider>;
}

export function useProfile(): Profile | null | undefined {
  return useContext(ProfileContext);
}

export function guessOs(): OS {
  if (typeof navigator === 'undefined') return 'win';
  const uaData = (navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData;
  return detectOs(uaData?.platform || navigator.platform || navigator.userAgent || '');
}

export function useOs(): OS {
  return useProfile()?.os ?? guessOs();
}

export async function createProfile(p: NewProfile, now = new Date()): Promise<Profile> {
  const profile: Profile = {
    id: 'me',
    name: p.name.trim(),
    os: p.os,
    dailyGoalMin: p.dailyGoalMin,
    fontScale: 'md',
    sound: true,
    reducedMotion: false,
    xp: 0,
    createdAt: now.toISOString(),
  };
  await db.profile.put(profile);
  return profile;
}

export async function updateProfile(patch: Partial<Omit<Profile, 'id'>>): Promise<void> {
  await db.profile.update('me', patch);
}
```

- [ ] **Step 3: Viết test utils**

`client/src/test/utils.tsx`:
```tsx
import type { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { db, type Profile } from '../db/db';
import { ProfileContext } from '../db/profile';

export async function resetDb(): Promise<void> {
  await Promise.all(db.tables.map((t) => t.clear()));
}

export function makeProfile(overrides: Partial<Profile> = {}): Profile {
  return {
    id: 'me',
    name: 'An',
    os: 'win',
    dailyGoalMin: 10,
    fontScale: 'md',
    sound: false,
    reducedMotion: false,
    xp: 0,
    createdAt: '2026-09-19T00:00:00.000Z',
    ...overrides,
  };
}

export function renderWithProfile(
  ui: ReactElement,
  { profile = makeProfile(), route = '/' }: { profile?: Profile | null; route?: string } = {},
) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <ProfileContext.Provider value={profile}>{ui}</ProfileContext.Provider>
    </MemoryRouter>,
  );
}
```

- [ ] **Step 4: Viết test profile + record + backup**

`client/src/db/profile.test.tsx`:
```tsx
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { ProfileProvider, createProfile, updateProfile, useOs, useProfile } from './profile';
import { resetDb } from '../test/utils';

function Show() {
  const p = useProfile();
  const os = useOs();
  return <p>{p === undefined ? 'loading' : p === null ? 'none' : `${p.name}|${os}`}</p>;
}

describe('profile', () => {
  beforeEach(resetDb);

  it('reports no profile, then the created one', async () => {
    render(<ProfileProvider><Show /></ProfileProvider>);
    expect(await screen.findByText('none')).toBeInTheDocument();
    await createProfile({ name: '  Bình ', os: 'mac', dailyGoalMin: 5 });
    expect(await screen.findByText('Bình|mac')).toBeInTheDocument();
  });

  it('applies font scale and reduced motion to <html>', async () => {
    await createProfile({ name: 'An', os: 'win', dailyGoalMin: 10 });
    await updateProfile({ fontScale: 'xl', reducedMotion: true });
    render(<ProfileProvider><Show /></ProfileProvider>);
    await waitFor(() => expect(document.documentElement.dataset.font).toBe('xl'));
    expect(document.documentElement.dataset.motion).toBe('reduce');
  });

  it('falls back to a guessed OS without a provider', () => {
    render(<Show />);
    expect(screen.getByText('loading')).toBeInTheDocument();
  });
});
```

`client/src/progress/record.test.ts`:
```ts
import { describe, it, expect, beforeEach } from 'vitest';
import { db } from '../db/db';
import { createProfile } from '../db/profile';
import { recordLessonResult } from './record';
import { resetDb } from '../test/utils';

const now = new Date(2026, 8, 19, 10, 0, 0);

describe('recordLessonResult', () => {
  beforeEach(async () => {
    await resetDb();
    await createProfile({ name: 'An', os: 'win', dailyGoalMin: 10 });
  });

  it('stores progress, xp and activity for a first completion', async () => {
    const r = await recordLessonResult({ lessonId: 'x', stars: 2, hintsUsed: 1, timeMs: 150_000, now });
    expect(r).toEqual({ xpGained: 20, prevStars: 0 });
    expect(await db.progress.get('x')).toMatchObject({ stars: 2, hintsUsed: 1, bestTimeMs: 150_000 });
    expect((await db.profile.get('me'))?.xp).toBe(20);
    expect(await db.activity.get('2026-09-19')).toEqual({ day: '2026-09-19', minutes: 3, xp: 20 });
  });

  it('keeps the best result and only adds xp for improvement', async () => {
    await recordLessonResult({ lessonId: 'x', stars: 3, hintsUsed: 0, timeMs: 60_000, now });
    const r = await recordLessonResult({ lessonId: 'x', stars: 1, hintsUsed: 3, timeMs: 20_000, now });
    expect(r).toEqual({ xpGained: 0, prevStars: 3 });
    expect(await db.progress.get('x')).toMatchObject({ stars: 3, hintsUsed: 0, bestTimeMs: 20_000 });
    expect((await db.profile.get('me'))?.xp).toBe(30);
    expect((await db.activity.get('2026-09-19'))?.minutes).toBe(2);
  });
});
```

`client/src/progress/backup.test.ts`:
```ts
import { describe, it, expect, beforeEach } from 'vitest';
import { db } from '../db/db';
import { createProfile } from '../db/profile';
import { backupFileName, exportBackup, importBackup, parseBackup } from './backup';
import { resetDb } from '../test/utils';

describe('backup', () => {
  beforeEach(resetDb);

  it('names the file by date', () => {
    expect(backupFileName(new Date(2026, 8, 9))).toBe('tinhoc-mochi-backup-20260909.json');
  });

  it('round-trips all tables', async () => {
    await createProfile({ name: 'An', os: 'win', dailyGoalMin: 10 });
    await db.progress.put({ lessonId: 'x', stars: 3, hintsUsed: 0, bestTimeMs: 1, completedAt: 't' });
    const text = JSON.stringify(await exportBackup(new Date(2026, 8, 19)));
    await resetDb();
    await importBackup(parseBackup(text));
    expect((await db.profile.get('me'))?.name).toBe('An');
    expect((await db.progress.get('x'))?.stars).toBe(3);
  });

  it('replaces existing data on import', async () => {
    await createProfile({ name: 'Cũ', os: 'win', dailyGoalMin: 10 });
    const b = await exportBackup();
    await db.progress.put({ lessonId: 'y', stars: 1, hintsUsed: 0, bestTimeMs: 1, completedAt: 't' });
    await importBackup(b);
    expect(await db.progress.get('y')).toBeUndefined();
  });

  it('rejects invalid files with Vietnamese messages', () => {
    expect(() => parseBackup('not json')).toThrow(/không đọc được/);
    expect(() => parseBackup('{"app":"other"}')).toThrow(/không phải file sao lưu/);
    expect(() => parseBackup('{"app":"office-neko","schemaVersion":9,"tables":{}}')).toThrow(/không được hỗ trợ/);
    expect(() => parseBackup('{"app":"office-neko","schemaVersion":1,"tables":{}}')).toThrow(/thiếu dữ liệu/);
  });
});
```

- [ ] **Step 5: Chạy test, xác nhận FAIL**

Run: `npm test -w client`
Expected: FAIL – thiếu `./record`, `./backup`.

- [ ] **Step 6: Viết record.ts, backup.ts, useStats.ts**

`client/src/progress/record.ts`:
```ts
import { dayKey, xpGain } from '@office-neko/shared';
import { db } from '../db/db';

export async function recordLessonResult(r: {
  lessonId: string;
  stars: 1 | 2 | 3;
  hintsUsed: number;
  timeMs: number;
  now?: Date;
}): Promise<{ xpGained: number; prevStars: number }> {
  const now = r.now ?? new Date();
  return db.transaction('rw', db.progress, db.profile, db.activity, async () => {
    const prev = await db.progress.get(r.lessonId);
    const prevStars = prev?.stars ?? 0;
    const gained = xpGain(prevStars, r.stars);
    await db.progress.put({
      lessonId: r.lessonId,
      stars: Math.max(prevStars, r.stars) as 1 | 2 | 3,
      hintsUsed: prev ? Math.min(prev.hintsUsed, r.hintsUsed) : r.hintsUsed,
      bestTimeMs: prev ? Math.min(prev.bestTimeMs, r.timeMs) : r.timeMs,
      completedAt: now.toISOString(),
    });
    const profile = await db.profile.get('me');
    if (profile && gained) await db.profile.update('me', { xp: profile.xp + gained });
    const day = dayKey(now);
    const act = (await db.activity.get(day)) ?? { day, minutes: 0, xp: 0 };
    await db.activity.put({
      day,
      minutes: act.minutes + Math.max(1, Math.round(r.timeMs / 60_000)),
      xp: act.xp + gained,
    });
    return { xpGained: gained, prevStars };
  });
}
```

`client/src/progress/backup.ts`:
```ts
import { dayKey } from '@office-neko/shared';
import { db, TABLES, type TableName } from '../db/db';

export const BACKUP_SCHEMA = 1;

export interface BackupFile {
  app: 'office-neko';
  schemaVersion: number;
  exportedAt: string;
  tables: Record<TableName, unknown[]>;
}

export async function exportBackup(now = new Date()): Promise<BackupFile> {
  const tables = {} as Record<TableName, unknown[]>;
  for (const name of TABLES) tables[name] = await db.table(name).toArray();
  return { app: 'office-neko', schemaVersion: BACKUP_SCHEMA, exportedAt: now.toISOString(), tables };
}

export function backupFileName(now = new Date()): string {
  return `tinhoc-mochi-backup-${dayKey(now).replace(/-/g, '')}.json`;
}

export function parseBackup(text: string): BackupFile {
  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error('File này không đọc được (không phải JSON hợp lệ).');
  }
  const b = data as Partial<BackupFile> | null;
  if (!b || b.app !== 'office-neko' || typeof b.tables !== 'object' || b.tables === null) {
    throw new Error('File này không phải file sao lưu của Tin Học Cùng Mochi.');
  }
  if (b.schemaVersion !== BACKUP_SCHEMA) {
    throw new Error(`Phiên bản file sao lưu (${String(b.schemaVersion)}) không được hỗ trợ.`);
  }
  for (const name of TABLES) {
    if (!Array.isArray((b.tables as Record<string, unknown>)[name])) {
      throw new Error(`File sao lưu thiếu dữ liệu "${name}".`);
    }
  }
  return b as BackupFile;
}

export async function importBackup(b: BackupFile): Promise<void> {
  await db.transaction('rw', db.tables, async () => {
    for (const name of TABLES) {
      const t = db.table(name);
      await t.clear();
      await t.bulkPut(b.tables[name]);
    }
  });
}

export function downloadJson(fileName: string, data: unknown): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function readFileText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ''));
    reader.onerror = () => reject(new Error('Không đọc được file.'));
    reader.readAsText(file);
  });
}
```

Chú thích test "keeps the best result": lần 1 ghi 1 phút (60 000 ms), lần 2 ghi `max(1, round(20 000/60 000)) = 1` phút, nên tổng là 2 phút.

`client/src/progress/useStats.ts`:
```ts
import { useLiveQuery } from 'dexie-react-hooks';
import { computeStreak, dayKey } from '@office-neko/shared';
import { db, type ActivityRow, type ProgressRow } from '../db/db';

const NO_PROGRESS: ProgressRow[] = [];
const NO_ACTIVITY: ActivityRow[] = [];

export function useCompleted(): { completed: Set<string>; stars: Record<string, number> } {
  const rows = useLiveQuery(() => db.progress.toArray(), [], NO_PROGRESS);
  const completed = new Set(rows.filter((r) => r.stars > 0).map((r) => r.lessonId));
  const stars = Object.fromEntries(rows.map((r) => [r.lessonId, r.stars]));
  return { completed, stars };
}

function useActivity(): ActivityRow[] {
  return useLiveQuery(() => db.activity.toArray(), [], NO_ACTIVITY);
}

export function useStreak(): number {
  return computeStreak(useActivity().map((r) => r.day), dayKey(new Date()));
}

export function useTodayMinutes(): number {
  const today = dayKey(new Date());
  return useActivity().find((r) => r.day === today)?.minutes ?? 0;
}
```

- [ ] **Step 7: Chạy test, xác nhận PASS**

Run: `npm test -w client && npm run typecheck -w client`
Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add client
git commit -m "feat(client): Dexie storage, profile context, lesson results and backup" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 9: Giao diện pastel, mascot Mochi và các thành phần cơ bản

**Files:**
- Modify: `client/src/styles/theme.css` (thay toàn bộ)
- Create: `client/src/components/Mochi.tsx`, `client/src/components/mochi.css`, `client/src/components/SpeechBubble.tsx`, `client/src/components/Confetti.tsx`, `client/src/components/Kbd.tsx`, `client/src/components/Segmented.tsx`, `client/src/components/Toggle.tsx`
- Create: `client/src/lib/sound.ts`
- Test: `client/src/components/components.test.tsx`

**Interfaces:**
- Consumes: `formatCombo`, `MochiMood`, `OS` (shared); `useOs`, `useProfile` (Task 8).
- Produces:
  - `<Mochi mood?: MochiMood size?: number animated?: boolean className?: string />`: SVG `role="img"` có `aria-label="Mochi <mood>"`.
  - `<SpeechBubble tail?: 'left' | 'bottom'>`, `<Confetti onDone? />`.
  - `<Kbd combo: string os?: OS />`: hiển thị từng phím trong `<kbd class="kbd">`, có `aria-label` nối bằng " + ".
  - `<Segmented<T extends string> label options value onChange />`: `role="radiogroup"`, mỗi nút `role="radio"`.
  - `<Toggle label checked onChange />`: `role="switch"`.
  - `playSound(name: SoundName)`, `useSound(): (name: SoundName) => void` (tắt khi `profile.sound === false`), `type SoundName = 'correct' | 'wrong' | 'finish'`.
  - Lớp CSS: `.card`, `.btn`, `.btn-primary`, `.btn-soft`, `.btn-mint`, `.kbd`, `.term`, `.animate-shake`, `.spotlight-ring`, `.spotlight-paw`.
  - Token màu Tailwind: `peach rose mint sky lavender butter cream word excel ppt bg surface text muted`.

- [ ] **Step 1: Viết test**

`client/src/components/components.test.tsx`:
```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Mochi } from './Mochi';
import { SpeechBubble } from './SpeechBubble';
import { Kbd } from './Kbd';
import { Segmented } from './Segmented';
import { Toggle } from './Toggle';

describe('components', () => {
  it('renders Mochi with its mood', () => {
    render(<Mochi mood="happy" />);
    expect(screen.getByRole('img', { name: 'Mochi happy' })).toBeInTheDocument();
  });

  it('renders speech bubble content', () => {
    render(<SpeechBubble>Xin chào!</SpeechBubble>);
    expect(screen.getByText('Xin chào!')).toBeInTheDocument();
  });

  it('renders shortcuts per OS', () => {
    const { rerender } = render(<Kbd combo="mod+c" os="win" />);
    expect(screen.getByLabelText('Ctrl + C')).toBeInTheDocument();
    rerender(<Kbd combo="mod+c" os="mac" />);
    expect(screen.getByLabelText('⌘ + C')).toBeInTheDocument();
  });

  it('Segmented selects an option', () => {
    const onChange = vi.fn();
    render(
      <Segmented label="Hệ điều hành" value="win" onChange={onChange}
        options={[{ value: 'win', label: 'Windows' }, { value: 'mac', label: 'Mac' }]} />,
    );
    expect(screen.getByRole('radio', { name: 'Windows' })).toHaveAttribute('aria-checked', 'true');
    fireEvent.click(screen.getByRole('radio', { name: 'Mac' }));
    expect(onChange).toHaveBeenCalledWith('mac');
  });

  it('Toggle flips', () => {
    const onChange = vi.fn();
    render(<Toggle label="Âm thanh" checked={false} onChange={onChange} />);
    fireEvent.click(screen.getByRole('switch', { name: 'Âm thanh' }));
    expect(onChange).toHaveBeenCalledWith(true);
  });
});
```

- [ ] **Step 2: Chạy test, xác nhận FAIL**

Run: `npm test -w client -- components`
Expected: FAIL – thiếu `./Mochi`.

- [ ] **Step 3: Viết theme.css**

`client/src/styles/theme.css`:
```css
@import "tailwindcss";
@import "@fontsource-variable/nunito";

@theme {
  --font-sans: "Nunito Variable", "Segoe UI", system-ui, sans-serif;
  --color-peach: #FFB38A;
  --color-rose: #FF7A9A;
  --color-mint: #8FE3CF;
  --color-sky: #A0D8FF;
  --color-lavender: #C8B6FF;
  --color-butter: #FFE08A;
  --color-cream: #FFF9F2;
  --color-word: #7FB2FF;
  --color-excel: #3FB871;
  --color-ppt: #FFA878;
  --color-bg: var(--app-bg);
  --color-surface: var(--app-surface);
  --color-text: var(--app-text);
  --color-muted: var(--app-muted);
  --radius-card: 24px;
  --shadow-soft: 0 8px 24px rgba(255, 122, 154, 0.14);
}

:root {
  --app-bg: #FFF9F2;
  --app-surface: #FFFFFF;
  --app-text: #3B2E4A;
  --app-muted: #7D7090;
  color-scheme: light;
  font-size: 17px;
}
:root[data-font="lg"] { font-size: 19px; }
:root[data-font="xl"] { font-size: 21px; }

html, body, #root { min-height: 100%; }
body {
  background: var(--app-bg);
  color: var(--app-text);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
}

.card {
  background: var(--app-surface);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-soft);
}

.btn, .btn-primary, .btn-soft, .btn-mint {
  @apply inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 font-bold transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-50;
}
.btn { @apply bg-white text-text shadow-sm hover:bg-cream; }
.btn-primary { @apply bg-rose text-white hover:brightness-110; }
.btn-soft { @apply bg-peach/30 text-text hover:bg-peach/50; }
.btn-mint { @apply bg-mint text-text hover:brightness-105; }

.kbd {
  @apply inline-flex min-w-[1.8em] items-center justify-center rounded-md border border-b-4 border-muted/40 bg-surface px-1.5 py-0.5 text-[0.85em] font-bold;
}

.term {
  @apply cursor-help font-semibold underline decoration-rose decoration-dotted decoration-2 underline-offset-4;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-6px); }
  75% { transform: translateX(6px); }
}
.animate-shake { animation: shake 0.3s ease-in-out 2; }

@keyframes spotlight-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(255, 122, 154, 0.55); }
  50% { box-shadow: 0 0 0 10px rgba(255, 122, 154, 0); }
}
.spotlight-ring { animation: spotlight-pulse 1.4s ease-in-out infinite; }
@keyframes paw-bounce {
  0%, 100% { transform: translate(-50%, 0); }
  50% { transform: translate(-50%, -6px); }
}
.spotlight-paw { animation: paw-bounce 0.9s ease-in-out infinite; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; }
}
:root[data-motion="reduce"] *, :root[data-motion="reduce"] *::before, :root[data-motion="reduce"] *::after {
  animation-duration: 0.001ms !important;
  transition-duration: 0.001ms !important;
}
```

- [ ] **Step 4: Viết Mochi**

`client/src/components/mochi.css`:
```css
.mochi-blink { animation: mochi-blink 4s infinite; transform-origin: center; transform-box: fill-box; }
@keyframes mochi-blink {
  0%, 92%, 100% { transform: scaleY(1); }
  95% { transform: scaleY(0.1); }
}
.mochi-bob { animation: mochi-bob 3s ease-in-out infinite; }
@keyframes mochi-bob {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}
```

`client/src/components/Mochi.tsx`:
```tsx
import type { MochiMood } from '@office-neko/shared';
import './mochi.css';

interface Props {
  mood?: MochiMood;
  size?: number;
  animated?: boolean;
  className?: string;
}

const FUR = '#FFFDF8';
const PATCH = '#F7B98B';
const INK = '#3B2E4A';
const PINK = '#FFB7C5';
const BLUSH = '#FF9EB5';

function Eyes({ mood }: { mood: MochiMood }) {
  if (mood === 'happy') {
    return (
      <g stroke={INK} strokeWidth="3.5" fill="none" strokeLinecap="round">
        <path d="M38 70 q8 -9 16 0" />
        <path d="M66 70 q8 -9 16 0" />
      </g>
    );
  }
  if (mood === 'sleepy') {
    return (
      <g stroke={INK} strokeWidth="3.5" fill="none" strokeLinecap="round">
        <path d="M38 72 q8 3 16 0" />
        <path d="M66 72 q8 3 16 0" />
        <text x="92" y="48" fontSize="12" fontWeight="700" fill={INK} stroke="none">z</text>
      </g>
    );
  }
  const ry = mood === 'surprised' ? 10 : 8;
  return (
    <g>
      <g className="mochi-blink">
        <ellipse cx="46" cy="70" rx="7" ry={ry} fill={INK} />
        <ellipse cx="74" cy="70" rx="7" ry={ry} fill={INK} />
        <circle cx="48.5" cy="66.5" r="2.5" fill="#fff" />
        <circle cx="76.5" cy="66.5" r="2.5" fill="#fff" />
      </g>
      {mood === 'sad' && (
        <g>
          <g stroke={INK} strokeWidth="2.5" strokeLinecap="round">
            <path d="M37 58 l14 4" />
            <path d="M83 58 l-14 4" />
          </g>
          <path d="M82 80 q4 6 0 9 q-4 -3 0 -9 z" fill="#A0D8FF" />
        </g>
      )}
    </g>
  );
}

function Mouth({ mood }: { mood: MochiMood }) {
  switch (mood) {
    case 'happy':
      return <path d="M50 84 q10 12 20 0" stroke={INK} strokeWidth="2.5" fill={BLUSH} strokeLinecap="round" />;
    case 'sad':
      return <path d="M52 90 q8 -7 16 0" stroke={INK} strokeWidth="2.5" fill="none" strokeLinecap="round" />;
    case 'surprised':
      return <ellipse cx="60" cy="88" rx="4.5" ry="6" fill={BLUSH} stroke={INK} strokeWidth="2" />;
    case 'sleepy':
      return <path d="M56 87 h8" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />;
    default:
      return <path d="M52 84 q4 6 8 0 q4 6 8 0" stroke={INK} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />;
  }
}

/** Mèo Mochi: lông trắng kem, tai và má vá cam, kẹp tóc dango 3 màu. */
export function Mochi({ mood = 'neutral', size = 160, animated = true, className = '' }: Props) {
  return (
    <svg
      role="img"
      aria-label={`Mochi ${mood}`}
      viewBox="0 0 120 150"
      width={size}
      height={(size * 150) / 120}
      className={`${animated ? 'mochi-bob' : ''} ${className}`}
    >
      <path d="M86 128 q32 -6 22 -36" stroke={PATCH} strokeWidth="11" fill="none" strokeLinecap="round" />
      <path d="M86 128 q32 -6 22 -36" stroke={FUR} strokeWidth="6" fill="none" strokeLinecap="round" />
      <ellipse cx="60" cy="120" rx="30" ry="24" fill={FUR} stroke="#F1E4D6" strokeWidth="1.5" />
      <ellipse cx="46" cy="140" rx="10" ry="6" fill={FUR} stroke="#F1E4D6" strokeWidth="1.5" />
      <ellipse cx="74" cy="140" rx="10" ry="6" fill={FUR} stroke="#F1E4D6" strokeWidth="1.5" />
      <path d="M26 54 L32 14 L58 40 Z" fill={PATCH} />
      <path d="M94 54 L88 14 L62 40 Z" fill={FUR} stroke="#F1E4D6" strokeWidth="1.5" />
      <path d="M32 48 L35 24 L50 40 Z" fill={PINK} />
      <path d="M88 48 L85 24 L70 40 Z" fill={PINK} />
      <circle cx="60" cy="70" r="37" fill={FUR} stroke="#F1E4D6" strokeWidth="1.5" />
      <path d="M26 62 q6 -26 30 -30 q-10 14 -8 34 q-12 4 -22 -4 z" fill={PATCH} opacity="0.9" />
      <ellipse cx="34" cy="82" rx="6.5" ry="4" fill={PINK} opacity="0.9" />
      <ellipse cx="86" cy="82" rx="6.5" ry="4" fill={PINK} opacity="0.9" />
      <g stroke={INK} strokeWidth="1.5" strokeLinecap="round" opacity="0.6">
        <path d="M20 76 h12" />
        <path d="M21 84 l11 -3" />
        <path d="M100 76 h-12" />
        <path d="M99 84 l-11 -3" />
      </g>
      <path d="M56 79 h8 l-4 4 z" fill={BLUSH} />
      <Eyes mood={mood} />
      <Mouth mood={mood} />
      <path d="M30 100 q30 16 60 0" stroke="#8FE3CF" strokeWidth="6" fill="none" strokeLinecap="round" />
      <circle cx="60" cy="109" r="5.5" fill="#FFE08A" stroke="#E0B84A" strokeWidth="1.5" />
      <g transform="translate(84 22) rotate(35)">
        <path d="M0 -14 v28" stroke="#C69C6D" strokeWidth="2" strokeLinecap="round" />
        <circle cy="-9" r="4.5" fill="#FFB7C5" />
        <circle cy="0" r="4.5" fill="#FFFFFF" stroke="#EDE3D8" strokeWidth="1" />
        <circle cy="9" r="4.5" fill="#8FE3CF" />
      </g>
    </svg>
  );
}
```

- [ ] **Step 5: Viết SpeechBubble, Confetti, Kbd, Segmented, Toggle, sound**

`client/src/components/SpeechBubble.tsx`:
```tsx
import type { ReactNode } from 'react';

export function SpeechBubble({ children, tail = 'left' }: { children: ReactNode; tail?: 'left' | 'bottom' }) {
  return (
    <div className="relative rounded-3xl bg-surface px-5 py-4 shadow-md ring-2 ring-peach/60">
      {children}
      {tail === 'left' ? (
        <span aria-hidden className="absolute -left-2 top-6 h-4 w-4 rotate-45 bg-surface ring-2 ring-peach/60 [clip-path:polygon(0_0,0_100%,100%_100%)]" />
      ) : (
        <span aria-hidden className="absolute -bottom-2 left-8 h-4 w-4 rotate-45 bg-surface ring-2 ring-peach/60 [clip-path:polygon(0_100%,100%_100%,100%_0)]" />
      )}
    </div>
  );
}
```

`client/src/components/Confetti.tsx`:
```tsx
import { useEffect, useRef } from 'react';

const COLORS = ['#FFB38A', '#FF7A9A', '#8FE3CF', '#A0D8FF', '#C8B6FF', '#FFE08A'];

/** Pháo giấy ~2,5 giây. Tự bỏ qua khi người dùng bật giảm chuyển động. */
export function Confetti({ onDone }: { onDone?: () => void }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    const reduced =
      document.documentElement.dataset.motion === 'reduce' ||
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (!canvas || !ctx || reduced) {
      onDone?.();
      return;
    }
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const parts = Array.from({ length: 140 }, () => ({
      x: canvas.width / 2 + (Math.random() - 0.5) * 200,
      y: canvas.height / 3,
      vx: (Math.random() - 0.5) * 14,
      vy: -Math.random() * 14 - 4,
      r: 4 + Math.random() * 5,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
      c: COLORS[Math.floor(Math.random() * COLORS.length)]!,
    }));
    let raf = 0;
    const start = performance.now();
    const draw = (t: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of parts) {
        p.vy += 0.35;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.c;
        ctx.fillRect(-p.r / 2, -p.r / 4, p.r, p.r / 2);
        ctx.restore();
      }
      if (t - start < 2500) raf = requestAnimationFrame(draw);
      else onDone?.();
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);
  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-[60]" />;
}
```

`client/src/components/Kbd.tsx`:
```tsx
import { Fragment } from 'react';
import { formatCombo, type OS } from '@office-neko/shared';
import { useOs } from '../db/profile';

export function Kbd({ combo, os }: { combo: string; os?: OS }) {
  const current = useOs();
  const labels = formatCombo(combo, os ?? current);
  return (
    <span className="inline-flex items-center gap-1 align-middle" aria-label={labels.join(' + ')}>
      {labels.map((l, i) => (
        <Fragment key={i}>
          {i > 0 && <span aria-hidden className="text-muted">+</span>}
          <kbd aria-hidden className="kbd">{l}</kbd>
        </Fragment>
      ))}
    </span>
  );
}
```

`client/src/components/Segmented.tsx`:
```tsx
export interface SegmentedOption<T extends string> {
  value: T;
  label: string;
}

export function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: SegmentedOption<T>[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div role="radiogroup" aria-label={label} className="inline-flex flex-wrap gap-1 rounded-full bg-peach/20 p-1">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={o.value === value}
          onClick={() => onChange(o.value)}
          className={`rounded-full px-4 py-1.5 font-bold transition ${o.value === value ? 'bg-white shadow' : 'text-muted hover:text-text'}`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
```

`client/src/components/Toggle.tsx`:
```tsx
export function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-8 w-14 rounded-full transition ${checked ? 'bg-mint' : 'bg-muted/30'}`}
    >
      <span className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition-all ${checked ? 'left-7' : 'left-1'}`} />
    </button>
  );
}
```

`client/src/lib/sound.ts`:
```ts
import { useCallback } from 'react';
import { useProfile } from '../db/profile';

const TONES = { correct: [660, 880], wrong: [300, 220], finish: [523, 659, 784] } as const;
export type SoundName = keyof typeof TONES;

let ctx: AudioContext | null = null;

export function playSound(name: SoundName): void {
  try {
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    ctx ??= new AC();
    const audio = ctx;
    const now = audio.currentTime;
    TONES[name].forEach((freq, i) => {
      const osc = audio.createOscillator();
      const gain = audio.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      const t = now + i * 0.12;
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(0.2, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);
      osc.connect(gain).connect(audio.destination);
      osc.start(t);
      osc.stop(t + 0.3);
    });
  } catch {
    /* âm thanh là tuỳ chọn */
  }
}

export function useSound(): (name: SoundName) => void {
  const enabled = useProfile()?.sound !== false;
  return useCallback((name: SoundName) => {
    if (enabled) playSound(name);
  }, [enabled]);
}
```

- [ ] **Step 6: Chạy test, xác nhận PASS**

Run: `npm test -w client && npm run typecheck -w client`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add client
git commit -m "feat(client): pastel theme, Mochi mascot and UI primitives" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 10: Cú pháp nội dung, dữ liệu bài học/từ điển/FAQ, sổ đăng ký trình mô phỏng

**Files:**
- Create: `shared/src/rich.ts`, `shared/src/rich.test.ts`; Modify: `shared/src/index.ts`
- Create: `client/src/sims/types.ts`, `client/src/sims/registry.ts`
- Create: `client/src/content/tracks.ts`, `client/src/content/lessons/basics-welcome.ts`, `client/src/content/lessons/index.ts`, `client/src/content/glossary.json`, `client/src/content/faq.json`, `client/src/content/help-ids.ts`, `client/src/content/index.ts`
- Test: `client/src/content/content.test.ts`

**Interfaces:**
- Consumes: kiểu từ Task 2, `normalize` (Task 3), `grade`/`GRADERS` (Task 7).
- Produces:
  - `rich.ts`:
    - `type Inline = { t: 'text'; v: string } | { t: 'b'; v: string } | { t: 'term'; key: string; label: string } | { t: 'kbd'; combo: string }`
    - `type Block = { type: 'p'; inlines: Inline[] } | { type: 'ul'; items: Inline[][] }`
    - `parseInline(s): Inline[]`, `parseRich(text): Block[]`, `extractTermKeys(text): string[]`.
    - Cú pháp:
      - `**đậm**`
      - `[[key]]` hoặc `[[key|nhãn]]` để gắn thuật ngữ; `key` là `id` hoặc `term` trong từ điển.
      - `{{mod+c}}` để hiển thị phím tắt.
      - Các đoạn cách nhau bằng một dòng trống.
      - Một đoạn mà mọi dòng đều bắt đầu bằng `- ` sẽ thành danh sách gạch đầu dòng.
  - `sims/types.ts`: `interface SimProps<S> { initial: S; onState: (s: S) => void; os: OS; spotlight: Spotlight | null }`, `interface SimDefinition<S = any, A = any> { kind: SimKind; Component: ComponentType<SimProps<S>>; reduce: (s: S, a: A) => S }`.
  - `sims/registry.ts`: `SIMS: Partial<Record<SimKind, SimDefinition>>` (rỗng ở giai đoạn 1).
  - `content/index.ts`: `TRACKS: Track[]`, `LESSONS: Record<string, Lesson>`, `GLOSSARY: GlossaryEntry[]`, `FAQ: FaqEntry[]`, `HELP_IDS: Record<string, HelpIdEntry>`, `findTerm(key: string): GlossaryEntry | undefined`.

- [ ] **Step 1: Viết test rich**

`shared/src/rich.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { extractTermKeys, parseInline, parseRich } from './rich';

describe('parseInline', () => {
  it('parses bold, terms with labels and shortcuts', () => {
    expect(parseInline('Bấm **Lưu** hoặc {{mod+s}} để [[save|lưu]] [[Cell]].')).toEqual([
      { t: 'text', v: 'Bấm ' },
      { t: 'b', v: 'Lưu' },
      { t: 'text', v: ' hoặc ' },
      { t: 'kbd', combo: 'mod+s' },
      { t: 'text', v: ' để ' },
      { t: 'term', key: 'save', label: 'lưu' },
      { t: 'text', v: ' ' },
      { t: 'term', key: 'Cell', label: 'Cell' },
      { t: 'text', v: '.' },
    ]);
  });
});

describe('parseRich', () => {
  it('splits paragraphs and bullet lists', () => {
    const blocks = parseRich('Dòng một\ncòn tiếp.\n\n- A\n- **B**\n\n');
    expect(blocks).toEqual([
      { type: 'p', inlines: [{ t: 'text', v: 'Dòng một còn tiếp.' }] },
      { type: 'ul', items: [[{ t: 'text', v: 'A' }], [{ t: 'b', v: 'B' }]] },
    ]);
  });
  it('returns nothing for blank text', () => {
    expect(parseRich('   ')).toEqual([]);
  });
});

describe('extractTermKeys', () => {
  it('lists term keys', () => {
    expect(extractTermKeys('[[mouse|chuột]] và [[keyboard]] {{mod+c}}')).toEqual(['mouse', 'keyboard']);
  });
});
```

- [ ] **Step 2: Chạy test, xác nhận FAIL rồi viết rich.ts**

Run: `npm test -w shared -- rich` → FAIL (thiếu `./rich`).

`shared/src/rich.ts`:
```ts
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
```

Thêm vào `shared/src/index.ts`:
```ts
export * from './rich';
```

Run: `npm test -w shared` → PASS.

- [ ] **Step 3: Viết sổ đăng ký trình mô phỏng**

`client/src/sims/types.ts`:
```ts
import type { ComponentType } from 'react';
import type { OS, SimKind, Spotlight } from '@office-neko/shared';

export interface SimProps<S> {
  initial: S;
  onState: (state: S) => void;
  os: OS;
  /** Gợi ý bậc 2 đang bật: sim có thể cuộn phần tử đích vào tầm nhìn. */
  spotlight: Spotlight | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface SimDefinition<S = any, A = any> {
  kind: SimKind;
  Component: ComponentType<SimProps<S>>;
  /** Reducer thuần; test nội dung dùng để phát lại `solution` của bài. */
  reduce: (state: S, action: A) => S;
}
```

`client/src/sims/registry.ts`:
```ts
import type { SimKind } from '@office-neko/shared';
import type { SimDefinition } from './types';

/** Các giai đoạn sau đăng ký trình mô phỏng tại đây (song song với GRADERS trong shared). */
export const SIMS: Partial<Record<SimKind, SimDefinition>> = {};
```

- [ ] **Step 4: Viết nội dung**

`client/src/content/tracks.ts`:
```ts
import type { Track } from '@office-neko/shared';

export const TRACKS: Track[] = [
  {
    id: 'basics', order: 0, title: 'Làm quen máy tính', emoji: '🖱️', color: '#FFB38A',
    blurb: 'Cầm chuột, bấm phím, sắp xếp thư mục và file.',
    chapters: [{ id: 'basics.start', title: 'Bắt đầu cùng Mochi', lessonIds: ['basics.welcome'] }],
  },
  { id: 'typing', order: 1, title: 'Gõ phím 10 ngón', emoji: '⌨️', color: '#A0D8FF', blurb: 'Gõ nhanh, gõ đúng, gõ tiếng Việt có dấu.', chapters: [] },
  { id: 'word', order: 2, title: 'Word – Soạn thảo văn bản', emoji: '📝', color: '#7FB2FF', blurb: 'Viết đơn, định dạng chữ, chèn bảng và ảnh.', chapters: [] },
  { id: 'excel', order: 3, title: 'Excel – Bảng tính', emoji: '📊', color: '#3FB871', blurb: 'Nhập số liệu, tính toán bằng công thức, vẽ biểu đồ.', chapters: [] },
  { id: 'ppt', order: 4, title: 'PowerPoint – Trình chiếu', emoji: '🎞️', color: '#FFA878', blurb: 'Làm slide đẹp và trình bày tự tin.', chapters: [] },
  { id: 'ai', order: 5, title: 'Dùng AI (Claude) trong công việc', emoji: '🤖', color: '#C8B6FF', blurb: 'Viết prompt tốt, dùng AI an toàn và kiểm chứng kết quả.', chapters: [] },
];
```

`client/src/content/lessons/basics-welcome.ts`:
```ts
import type { Lesson } from '@office-neko/shared';

export const basicsWelcome: Lesson = {
  id: 'basics.welcome',
  trackId: 'basics',
  chapterId: 'basics.start',
  title: 'Làm quen với Mochi',
  minutes: 3,
  steps: [
    {
      kind: 'explain',
      mood: 'happy',
      body: 'Chào bạn! Mình là **Mochi** 🐱. Mình sẽ cùng bạn học máy tính từ những bước đầu tiên: cầm [[mouse|chuột]], gõ [[keyboard|bàn phím]], rồi đến Word, Excel, PowerPoint và cách nhờ [[ai|AI]] giúp việc.',
    },
    {
      kind: 'explain',
      mood: 'neutral',
      body: 'Mỗi bài học có 3 kiểu bước:\n\n- **Giải thích**: Mochi kể cho bạn nghe.\n- **Thực hành**: bạn tự làm, Mochi chấm ngay.\n- **Câu hỏi nhanh**: chọn đáp án đúng.',
    },
    {
      kind: 'explain',
      mood: 'surprised',
      body: 'Gặp từ lạ? Chữ nào có **gạch chân chấm** như [[shortcut|phím tắt]] hay [[ribbon|Ribbon]] thì bấm vào để xem nghĩa. Bạn cũng mở được Từ điển bất cứ lúc nào bằng nút **?** tròn ở góc dưới bên phải, hoặc phím {{f1}}.',
    },
    {
      kind: 'quiz',
      question: 'Khi gặp một từ không hiểu, bạn nên làm gì?',
      choices: ['Bấm vào từ có gạch chân chấm hoặc mở Từ điển', 'Bỏ qua và đoán nghĩa', 'Tắt app đi'],
      answer: 0,
      why: 'Đúng rồi! Từ điển luôn sẵn sàng giúp bạn, cứ tra thoải mái nhé.',
    },
    {
      kind: 'quiz',
      question: 'Nếu dùng **Gợi ý** khi làm bài thì sao?',
      choices: ['Không được học tiếp nữa', 'Vẫn học tiếp được, chỉ bớt một chút sao', 'Mất hết tiến độ'],
      answer: 1,
      why: 'Chính xác! Gợi ý không bao giờ chặn bạn. Dùng ít gợi ý thì được nhiều sao hơn thôi.',
    },
    {
      kind: 'explain',
      mood: 'happy',
      body: 'Tuyệt vời! Bạn đã sẵn sàng rồi. Mình cùng bắt đầu hành trình nhé! 🎉',
    },
  ],
};
```

`client/src/content/lessons/index.ts`:
```ts
import type { Lesson } from '@office-neko/shared';
import { basicsWelcome } from './basics-welcome';

const ALL: Lesson[] = [basicsWelcome];

export const LESSONS: Record<string, Lesson> = Object.fromEntries(ALL.map((l) => [l.id, l]));
```

`client/src/content/help-ids.ts`:
```ts
import type { HelpIdEntry } from '@office-neko/shared';

/** Chú thích khi rê chuột vào phần tử có `data-help-id`. Các trình mô phỏng thêm mục của mình ở đây. */
export const HELP_IDS: Record<string, HelpIdEntry> = {
  'app.help': { label: 'Trợ giúp (F1)', vi: 'Mở Từ điển thuật ngữ và Hỏi Mèo.' },
  'app.settings': { label: 'Cài đặt', vi: 'Đổi hệ điều hành, cỡ chữ, sao lưu tiến độ.' },
  'player.hint': { label: 'Gợi ý', vi: 'Xem gợi ý từng bậc. Dùng gợi ý sẽ bớt một chút sao.' },
  'player.check': { label: 'Kiểm tra', vi: 'Nhờ Mochi chấm bài bạn vừa làm.' },
  'player.close': { label: 'Thoát bài', vi: 'Quay về bản đồ. Bài đang học dở sẽ không được lưu.' },
};
```

`client/src/content/glossary.json`:
```json
[
  { "id": "computer", "term": "Computer", "say": "com-piu-tơ", "vi": "Máy tính", "explain": "Cỗ máy giúp bạn viết văn bản, tính toán, xem phim, lên mạng… Gồm màn hình, bàn phím, chuột và thân máy (laptop thì gộp chung tất cả).", "lessonIds": [] },
  { "id": "mouse", "term": "Mouse", "say": "mau-x", "vi": "Chuột", "explain": "Thiết bị cầm tay để di chuyển mũi tên trên màn hình và bấm chọn. Trên laptop, tấm cảm ứng (touchpad/trackpad) làm việc của chuột.", "lessonIds": ["basics.welcome"] },
  { "id": "click", "term": "Click", "say": "cờ-lích", "vi": "Nhấp chuột", "explain": "Nhấn nút trái của chuột một lần rồi thả ra. Dùng để chọn một thứ gì đó.", "lessonIds": [] },
  { "id": "double-click", "term": "Double-click", "say": "đấp-bồ cờ-lích", "vi": "Nhấp đúp", "explain": "Bấm nút trái hai lần thật nhanh. Thường dùng để mở file hoặc thư mục.", "lessonIds": [] },
  { "id": "right-click", "term": "Right-click", "say": "rai cờ-lích", "vi": "Nhấp chuột phải", "explain": "Bấm nút bên phải của chuột để mở menu các lệnh dành cho thứ bạn đang trỏ vào.", "lessonIds": [] },
  { "id": "control-click", "term": "Control-click", "say": "con-trôn cờ-lích", "vi": "Nhấp chuột phải trên Mac", "explain": "Giữ phím control (⌃) rồi bấm chuột, hoặc chạm hai ngón lên trackpad. Kết quả giống nhấp chuột phải.", "os": "mac", "lessonIds": [] },
  { "id": "drag-and-drop", "term": "Drag and drop", "say": "đrắc en đrốp", "vi": "Kéo và thả", "explain": "Giữ nút trái chuột trên một thứ, di chuyển chuột tới chỗ mới rồi thả tay ra.", "lessonIds": [] },
  { "id": "scroll", "term": "Scroll", "say": "x-cơ-rôn", "vi": "Cuộn", "explain": "Lăn bánh xe trên chuột (hoặc vuốt hai ngón trên touchpad) để kéo trang lên xuống.", "lessonIds": [] },
  { "id": "cursor", "term": "Cursor", "say": "cơ-xơ", "vi": "Con trỏ", "explain": "Mũi tên chuột trên màn hình, hoặc vạch nhấp nháy cho biết chữ bạn gõ sẽ hiện ở đâu.", "lessonIds": [] },
  { "id": "keyboard", "term": "Keyboard", "say": "ki-bo", "vi": "Bàn phím", "explain": "Bảng các phím để gõ chữ, số và ra lệnh cho máy tính.", "lessonIds": ["basics.welcome"] },
  { "id": "shortcut", "term": "Keyboard shortcut", "say": "ki-bo sót-cắt", "vi": "Phím tắt", "explain": "Nhấn nhiều phím cùng lúc để làm nhanh một việc, ví dụ {{mod+c}} để sao chép.", "lessonIds": ["basics.welcome"] },
  { "id": "desktop", "term": "Desktop", "say": "đét-tóp", "vi": "Màn hình nền", "explain": "Màn hình chính khi mới mở máy, nơi đặt các biểu tượng và cửa sổ.", "lessonIds": [] },
  { "id": "icon", "term": "Icon", "say": "ai-cơn", "vi": "Biểu tượng", "explain": "Hình vẽ nhỏ đại diện cho một ứng dụng, file hoặc thư mục.", "lessonIds": [] },
  { "id": "window", "term": "Window", "say": "uyn-đâu", "vi": "Cửa sổ", "explain": "Khung chữ nhật chứa một ứng dụng đang mở, có nút thu nhỏ, phóng to và đóng.", "lessonIds": [] },
  { "id": "app", "term": "App (Application)", "say": "áp", "vi": "Ứng dụng, phần mềm", "explain": "Chương trình để làm một việc cụ thể, ví dụ Word để soạn văn bản, Excel để tính toán.", "lessonIds": [] },
  { "id": "folder", "term": "Folder", "say": "phâu-đơ", "vi": "Thư mục", "explain": "Nơi chứa và sắp xếp các file, giống một ngăn kéo tài liệu. Thư mục có thể chứa thư mục con.", "lessonIds": [] },
  { "id": "file", "term": "File", "say": "phai", "vi": "Tệp tin", "explain": "Một tài liệu được lưu trong máy: bức ảnh, văn bản, bảng tính, bài hát…", "lessonIds": [] },
  { "id": "file-extension", "term": "File extension", "say": "phai ích-xten-sân", "vi": "Phần mở rộng (đuôi file)", "explain": "Mấy chữ sau dấu chấm cuối tên file cho biết loại file: .docx là Word, .xlsx là Excel, .pptx là PowerPoint, .jpg là ảnh.", "lessonIds": [] },
  { "id": "path", "term": "Path", "say": "pát", "vi": "Đường dẫn", "explain": "Địa chỉ chỉ ra file nằm ở đâu, ví dụ Tài liệu/2026/bao-cao.docx: vào thư mục Tài liệu, rồi 2026, rồi tới file.", "lessonIds": [] },
  { "id": "recycle-bin", "term": "Recycle Bin", "say": "ri-sai-cồn bin", "vi": "Thùng rác", "explain": "Nơi chứa file vừa xoá trên Windows. Bạn còn lấy lại được cho tới khi dọn sạch thùng rác.", "os": "win", "lessonIds": [] },
  { "id": "trash", "term": "Trash", "say": "tờ-rát", "vi": "Thùng rác", "explain": "Nơi chứa file vừa xoá trên Mac, nằm ở cuối thanh Dock. Còn lấy lại được cho tới khi dọn sạch.", "os": "mac", "lessonIds": [] },
  { "id": "file-explorer", "term": "File Explorer", "say": "phai ích-xplo-rơ", "vi": "Trình quản lý file", "explain": "Ứng dụng của Windows để xem, mở và sắp xếp thư mục, file. Biểu tượng hình tập hồ sơ màu vàng.", "os": "win", "lessonIds": [] },
  { "id": "finder", "term": "Finder", "say": "phai-đơ", "vi": "Trình quản lý file của Mac", "explain": "Ứng dụng có biểu tượng khuôn mặt cười màu xanh trên Dock, dùng để xem và sắp xếp thư mục, file.", "os": "mac", "lessonIds": [] },
  { "id": "taskbar", "term": "Taskbar", "say": "tát-ba", "vi": "Thanh tác vụ", "explain": "Thanh dài ở cạnh dưới màn hình Windows, chứa nút Start và các ứng dụng đang mở.", "os": "win", "lessonIds": [] },
  { "id": "start-menu", "term": "Start menu", "say": "x-tát me-niu", "vi": "Menu Start", "explain": "Bấm nút Start (hình ô cửa sổ) trên thanh tác vụ để tìm và mở ứng dụng.", "os": "win", "lessonIds": [] },
  { "id": "dock", "term": "Dock", "say": "đóc", "vi": "Thanh Dock", "explain": "Thanh chứa biểu tượng ứng dụng ở cạnh dưới màn hình Mac. Bấm một biểu tượng để mở ứng dụng.", "os": "mac", "lessonIds": [] },
  { "id": "ctrl", "term": "Ctrl (Control)", "say": "con-trôn", "vi": "Phím Ctrl", "explain": "Phím ở góc dưới bên trái bàn phím Windows. Nhấn cùng phím khác để dùng phím tắt, ví dụ Ctrl + C để sao chép.", "os": "win", "lessonIds": [] },
  { "id": "command", "term": "Command (⌘)", "say": "cơ-man", "vi": "Phím Command", "explain": "Phím có hình ⌘ nằm hai bên phím cách trên bàn phím Mac. Dùng cho phím tắt, ví dụ ⌘ + C để sao chép.", "os": "mac", "lessonIds": [] },
  { "id": "copy", "term": "Copy", "say": "cóp-pi", "vi": "Sao chép", "explain": "Tạo một bản giống hệt để dán sang chỗ khác. Phím tắt {{mod+c}}.", "lessonIds": [] },
  { "id": "paste", "term": "Paste", "say": "pết", "vi": "Dán", "explain": "Đặt thứ vừa sao chép vào vị trí mới. Phím tắt {{mod+v}}.", "lessonIds": [] },
  { "id": "undo", "term": "Undo", "say": "ăn-đu", "vi": "Hoàn tác", "explain": "Quay lại thao tác vừa làm, kiểu \"lỡ tay thì bấm lại\". Phím tắt {{mod+z}}.", "lessonIds": [] },
  { "id": "save", "term": "Save", "say": "sêu", "vi": "Lưu", "explain": "Cất công việc vào máy để lần sau mở lại vẫn còn. Phím tắt {{mod+s}}.", "lessonIds": [] },
  { "id": "ribbon", "term": "Ribbon", "say": "ríp-bân", "vi": "Thanh công cụ Ribbon", "explain": "Dải nút lệnh phía trên cửa sổ Word, Excel, PowerPoint, chia thành các thẻ như Home, Insert…", "lessonIds": ["basics.welcome"] },
  { "id": "cell", "term": "Cell", "say": "xeo", "vi": "Ô (trong Excel)", "explain": "Mỗi ô nhỏ trong bảng tính, gọi tên bằng cột + hàng, ví dụ B3 là ô ở cột B, hàng 3.", "lessonIds": [] },
  { "id": "formula", "term": "Formula", "say": "pho-miu-la", "vi": "Công thức", "explain": "Phép tính trong Excel, luôn bắt đầu bằng dấu =, ví dụ =A1+A2.", "lessonIds": [] },
  { "id": "slide", "term": "Slide", "say": "x-lai", "vi": "Trang chiếu", "explain": "Mỗi trang trong bài trình chiếu PowerPoint.", "lessonIds": [] },
  { "id": "ai", "term": "AI (Artificial Intelligence)", "say": "ây-ai", "vi": "Trí tuệ nhân tạo", "explain": "Chương trình máy tính có thể trò chuyện, viết, tóm tắt, trả lời câu hỏi. Claude là một trợ lý AI.", "lessonIds": ["basics.welcome"] },
  { "id": "prompt", "term": "Prompt", "say": "p-rom", "vi": "Câu lệnh gửi cho AI", "explain": "Đoạn chữ bạn viết để nhờ AI làm việc. Prompt càng rõ ràng, câu trả lời càng tốt.", "lessonIds": [] },
  { "id": "wpm", "term": "WPM (Words Per Minute)", "say": "đắp-bồ-liu pi em", "vi": "Số từ mỗi phút", "explain": "Đơn vị đo tốc độ gõ phím. Cứ 5 ký tự tính là 1 từ.", "lessonIds": [] },
  { "id": "telex", "term": "Telex", "say": "tê-lếch", "vi": "Kiểu gõ Telex", "explain": "Cách gõ tiếng Việt bằng chữ cái: aa → â, dd → đ, s → dấu sắc, f → huyền, r → hỏi, x → ngã, j → nặng.", "lessonIds": [] },
  { "id": "vni", "term": "VNI", "say": "vê-en-i", "vi": "Kiểu gõ VNI", "explain": "Cách gõ tiếng Việt bằng số: 1 sắc, 2 huyền, 3 hỏi, 4 ngã, 5 nặng, 6 mũ (â ê ô), 7 móc (ơ ư), 8 trăng (ă), 9 đ.", "lessonIds": [] }
]
```

`client/src/content/faq.json`:
```json
[
  { "id": "open-glossary", "q": "Làm sao mở Từ điển?", "a": "Bấm nút **?** tròn ở góc dưới bên phải, hoặc nhấn phím {{f1}}. Gõ từ cần tra, có dấu hay không dấu đều được.", "keywords": ["tu dien", "tra nghia", "tra tu", "help", "tro giup", "f1"] },
  { "id": "hint-cost", "q": "Dùng gợi ý có bị mất điểm không?", "a": "Gợi ý không bao giờ chặn bạn học tiếp. Chỉ là dùng ít gợi ý thì được nhiều sao hơn: gợi ý bậc 1 còn tối đa 2 sao, bậc 2 trở lên còn 1 sao.", "keywords": ["goi y", "mat diem", "sao", "hint"] },
  { "id": "stars", "q": "Làm sao để được 3 sao?", "a": "Làm xong bài mà không dùng gợi ý và bấm **Kiểm tra** sai tối đa 1 lần. Bạn có thể học lại bài cũ để nâng số sao.", "keywords": ["3 sao", "ba sao", "diem", "sao"] },
  { "id": "where-saved", "q": "Tiến độ học được lưu ở đâu?", "a": "Tiến độ được lưu ngay trong trình duyệt trên máy này. Nếu xoá dữ liệu trình duyệt thì tiến độ cũng mất, vì vậy hãy tạo file sao lưu trong **Cài đặt** nhé.", "keywords": ["luu", "tien do", "mat du lieu", "du lieu"] },
  { "id": "move-device", "q": "Làm sao chuyển tiến độ sang máy khác?", "a": "Vào **Cài đặt** → **Tải file sao lưu**. Mang file đó sang máy mới, mở app, vào **Cài đặt** → **Khôi phục từ file**.", "keywords": ["chuyen may", "may khac", "sao luu", "backup", "khoi phuc"] },
  { "id": "change-os", "q": "Làm sao đổi giữa Windows và Mac?", "a": "Vào **Cài đặt** (nút ⚙️ góc trên bên phải) và chọn lại hệ điều hành. Phím tắt và bài Làm quen máy tính sẽ đổi theo.", "keywords": ["doi", "windows", "mac", "macos", "he dieu hanh"] },
  { "id": "font-size", "q": "Chữ nhỏ quá, làm sao phóng to?", "a": "Vào **Cài đặt** → **Cỡ chữ** và chọn **Lớn** hoặc **Rất lớn**.", "keywords": ["chu nho", "phong to", "co chu", "kho doc"] },
  { "id": "ctrl-where", "q": "Phím Ctrl nằm ở đâu?", "a": "Phím [[ctrl|Ctrl]] nằm ở góc dưới bên trái bàn phím (thường có thêm một phím Ctrl ở bên phải). Phím tắt dạng {{mod+c}} nghĩa là giữ Ctrl rồi bấm C.", "keywords": ["ctrl", "control", "phim ctrl"], "os": "win" },
  { "id": "cmd-where", "q": "Phím Command (⌘) nằm ở đâu?", "a": "Phím [[command|Command ⌘]] nằm ngay hai bên phím cách. Phím tắt dạng {{mod+c}} nghĩa là giữ ⌘ rồi bấm C.", "keywords": ["command", "cmd", "phim command"], "os": "mac" },
  { "id": "copy-paste", "q": "Làm sao sao chép (copy) và dán (paste)?", "a": "Chọn thứ cần chép rồi nhấn {{mod+c}} để [[copy|sao chép]]. Đưa con trỏ tới chỗ mới rồi nhấn {{mod+v}} để [[paste|dán]].", "keywords": ["copy", "paste", "sao chep", "dan", "chep"] },
  { "id": "undo", "q": "Lỡ tay xoá mất, làm sao lấy lại?", "a": "Nhấn ngay {{mod+z}} để [[undo|hoàn tác]] thao tác vừa làm. Nếu là file đã xoá thì mở thùng rác để khôi phục.", "keywords": ["lo tay", "xoa nham", "lay lai", "undo", "hoan tac"] },
  { "id": "daily", "q": "Mỗi ngày nên học bao lâu?", "a": "Chỉ cần 10 phút mỗi ngày là tiến bộ rõ. Học đều đặn tốt hơn học dồn một lần thật lâu.", "keywords": ["bao lau", "moi ngay", "thoi gian", "muc tieu"] },
  { "id": "streak", "q": "Chuỗi ngày học 🔥 là gì?", "a": "Là số ngày liên tiếp bạn có học. Chỉ cần xong 1 bài mỗi ngày là chuỗi được giữ.", "keywords": ["chuoi", "streak", "lua", "ngay lien tiep"] },
  { "id": "offline", "q": "App có cần mạng Internet không?", "a": "Không. Sau lần mở đầu tiên, app chạy được cả khi mất mạng.", "keywords": ["mang", "internet", "wifi", "offline"] },
  { "id": "mac-right-click", "q": "Nhấp chuột phải trên Mac làm thế nào?", "a": "Giữ phím control rồi bấm chuột, hoặc chạm hai ngón lên trackpad. Xem thêm [[control-click|Control-click]].", "keywords": ["chuot phai", "right click", "control click", "hai ngon"], "os": "mac" }
]
```

`client/src/content/index.ts`:
```ts
import { normalize, type FaqEntry, type GlossaryEntry } from '@office-neko/shared';
import glossaryRaw from './glossary.json';
import faqRaw from './faq.json';

export { TRACKS } from './tracks';
export { LESSONS } from './lessons';
export { HELP_IDS } from './help-ids';

export const GLOSSARY = glossaryRaw as unknown as GlossaryEntry[];
export const FAQ = faqRaw as unknown as FaqEntry[];

const byKey = new Map<string, GlossaryEntry>();
for (const e of GLOSSARY) {
  byKey.set(e.id, e);
  byKey.set(normalize(e.term), e);
}

/** Tìm thuật ngữ theo id hoặc theo tên tiếng Anh (không phân biệt hoa thường/dấu). */
export function findTerm(key: string): GlossaryEntry | undefined {
  return byKey.get(key) ?? byKey.get(normalize(key));
}
```

- [ ] **Step 5: Viết test nội dung**

`client/src/content/content.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { extractTermKeys, grade, GRADERS, type Lesson, type PracticeStep } from '@office-neko/shared';
import { FAQ, GLOSSARY, HELP_IDS, LESSONS, TRACKS, findTerm } from './index';
import { SIMS } from '../sims/registry';

const lessons = Object.values(LESSONS);

function textsOf(l: Lesson): string[] {
  return l.steps.flatMap((s) =>
    s.kind === 'explain' ? [s.body] : s.kind === 'quiz' ? [s.question, ...s.choices, s.why] : [s.task, s.hints[0], ...s.hints[2]],
  );
}

describe('content', () => {
  it('uses lesson ids as keys', () => {
    for (const [k, l] of Object.entries(LESSONS)) expect(l.id).toBe(k);
  });

  it('places every lesson in exactly one chapter of its own track', () => {
    const seen = new Map<string, number>();
    for (const t of TRACKS) {
      for (const c of t.chapters) {
        for (const id of c.lessonIds) {
          const l = LESSONS[id];
          expect(l, `missing lesson ${id}`).toBeDefined();
          expect(l?.trackId).toBe(t.id);
          expect(l?.chapterId).toBe(c.id);
          seen.set(id, (seen.get(id) ?? 0) + 1);
        }
      }
    }
    for (const l of lessons) expect(seen.get(l.id), `${l.id} not in exactly one chapter`).toBe(1);
  });

  it('has unique track orders and glossary/faq ids', () => {
    expect(new Set(TRACKS.map((t) => t.order)).size).toBe(TRACKS.length);
    expect(new Set(GLOSSARY.map((g) => g.id)).size).toBe(GLOSSARY.length);
    expect(new Set(FAQ.map((f) => f.id)).size).toBe(FAQ.length);
  });

  it('glossary lessonIds point to real lessons', () => {
    for (const g of GLOSSARY) for (const id of g.lessonIds) expect(LESSONS[id], `${g.id} → ${id}`).toBeDefined();
  });

  it('resolves every [[term]] reference', () => {
    const texts = [...lessons.flatMap(textsOf), ...FAQ.map((f) => f.a), ...GLOSSARY.map((g) => g.explain)];
    const missing = texts.flatMap(extractTermKeys).filter((k) => !findTerm(k));
    expect(missing).toEqual([]);
  });

  it('has valid quiz answers', () => {
    for (const l of lessons) {
      for (const s of l.steps) {
        if (s.kind === 'quiz') expect(s.answer >= 0 && s.answer < s.choices.length, `${l.id}: ${s.question}`).toBe(true);
      }
    }
  });

  it('practice steps are wired up and their solutions pass', () => {
    for (const l of lessons) {
      for (const s of l.steps) {
        if (s.kind !== 'practice') continue;
        const step = s as PracticeStep;
        const def = SIMS[step.sim];
        expect(step.checks.length, `${l.id}: no checks`).toBeGreaterThan(0);
        expect(def, `${l.id}: sim ${step.sim} not registered`).toBeDefined();
        expect(GRADERS[step.sim], `${l.id}: grader ${step.sim} missing`).toBeDefined();
        const spot = step.hints[1];
        if ('helpId' in spot) expect(HELP_IDS[spot.helpId], `${l.id}: helpId ${spot.helpId}`).toBeDefined();
        let state = step.initial;
        for (const a of step.solution) state = def!.reduce(state, a);
        expect(grade(step.sim, state, step.checks).pass, `${l.id}: solution does not pass`).toBe(true);
      }
    }
  });
});
```

- [ ] **Step 6: Chạy test, xác nhận PASS**

Run: `npm test && npm run typecheck`
Expected: PASS. (Test "practice steps" chưa có bài thực hành nào nên không chạy tới phần phát lại lời giải; từ giai đoạn 2 trở đi test này sẽ kiểm tra mọi bài thực hành.)

- [ ] **Step 7: Commit**

```bash
git add shared client
git commit -m "feat: content markup, seed lesson/glossary/FAQ, sim registry and content checks" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 11: Hiển thị nội dung có thuật ngữ, popup nghĩa và chú thích khi rê chuột

**Files:**
- Create: `client/src/help/helpStore.ts`, `client/src/help/RichText.tsx`, `client/src/help/TermLink.tsx`, `client/src/help/HelpTooltipLayer.tsx`
- Test: `client/src/help/richtext.test.tsx`, `client/src/help/tooltip.test.tsx`

**Interfaces:**
- Consumes: `parseRich`, `parseInline`, `Inline` (shared); `findTerm`, `HELP_IDS` (Task 10); `Kbd` (Task 9).
- Produces:
  - `helpStore.ts`: `type HelpTab = 'glossary' | 'ask'`; hook zustand `useHelp`.
    - Trạng thái: `open: boolean`, `tab: HelpTab`, `entryId: string | null`, `query: string`.
    - Hành động: `openGlossary(entryId?: string | null)`, `openAsk(query?: string)`, `close()`, `setTab(tab)`, `setEntry(id | null)`, `setQuery(q)`.
  - `<RichText text className? />`: hiển thị các khối (đoạn, danh sách). `<InlineText text />`: hiển thị một dòng, dùng trong popup.
  - `<TermLink termKey label />`:
    - Nút gạch chân chấm; bấm vào mở popup `role="dialog"` có tên thuật ngữ, cách đọc, nghĩa, giải thích, nút "Xem thêm" (gọi `openGlossary(entry.id)`) và nút "Đóng".
    - Bấm ra ngoài popup cũng đóng popup.
    - Nếu không tìm thấy thuật ngữ thì chỉ hiện chữ thường.
  - `<HelpTooltipLayer />`: lắng nghe `pointerover`/`focusin` trên `document`. Sau 400 ms trên phần tử có `data-help-id` thuộc `HELP_IDS`, hiện `role="tooltip"` gồm nhãn + mô tả. Ẩn khi cuộn trang, khi bấm chuột, hoặc khi rời phần tử.

- [ ] **Step 1: Viết test**

`client/src/help/richtext.test.tsx`:
```tsx
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { RichText } from './RichText';
import { useHelp } from './helpStore';

describe('RichText', () => {
  beforeEach(() => useHelp.setState({ open: false, tab: 'glossary', entryId: null, query: '' }));

  it('renders bold text, lists and shortcuts', () => {
    render(<RichText text={'Bấm **Lưu** hoặc {{mod+s}}.\n\n- Một\n- Hai'} />);
    expect(screen.getByText('Lưu').tagName).toBe('STRONG');
    expect(screen.getByLabelText('Ctrl + S')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('opens a term popup and jumps to the glossary', () => {
    render(<RichText text="Cầm [[mouse|chuột]] nhé." />);
    fireEvent.click(screen.getByRole('button', { name: 'chuột' }));
    const dialog = screen.getByRole('dialog', { name: 'Mouse' });
    expect(dialog).toHaveTextContent('Chuột');
    fireEvent.click(screen.getByRole('button', { name: 'Xem thêm' }));
    expect(useHelp.getState()).toMatchObject({ open: true, tab: 'glossary', entryId: 'mouse' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes the popup when clicking outside', () => {
    render(<div><p>ngoài</p><RichText text="[[mouse|chuột]]" /></div>);
    fireEvent.click(screen.getByRole('button', { name: 'chuột' }));
    fireEvent.pointerDown(screen.getByText('ngoài'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('shows plain text for unknown terms', () => {
    render(<RichText text="[[khong-co|từ lạ]]" />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.getByText('từ lạ')).toBeInTheDocument();
  });
});
```

`client/src/help/tooltip.test.tsx`:
```tsx
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { HelpTooltipLayer } from './HelpTooltipLayer';

describe('HelpTooltipLayer', () => {
  afterEach(() => vi.useRealTimers());

  it('shows the Vietnamese explanation after hovering', () => {
    vi.useFakeTimers();
    render(<><HelpTooltipLayer /><button data-help-id="player.hint">💡</button></>);
    fireEvent.pointerOver(screen.getByRole('button'));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    act(() => vi.advanceTimersByTime(450));
    expect(screen.getByRole('tooltip')).toHaveTextContent('Gợi ý');
    fireEvent.pointerDown(screen.getByRole('button'));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('ignores unknown help ids', () => {
    vi.useFakeTimers();
    render(<><HelpTooltipLayer /><button data-help-id="nope">x</button></>);
    fireEvent.pointerOver(screen.getByRole('button'));
    act(() => vi.advanceTimersByTime(450));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Chạy test, xác nhận FAIL**

Run: `npm test -w client -- help`
Expected: FAIL – thiếu module.

- [ ] **Step 3: Viết code**

`client/src/help/helpStore.ts`:
```ts
import { create } from 'zustand';

export type HelpTab = 'glossary' | 'ask';

interface HelpState {
  open: boolean;
  tab: HelpTab;
  entryId: string | null;
  query: string;
  openGlossary: (entryId?: string | null) => void;
  openAsk: (query?: string) => void;
  close: () => void;
  setTab: (tab: HelpTab) => void;
  setEntry: (entryId: string | null) => void;
  setQuery: (query: string) => void;
}

export const useHelp = create<HelpState>((set) => ({
  open: false,
  tab: 'glossary',
  entryId: null,
  query: '',
  openGlossary: (entryId = null) => set({ open: true, tab: 'glossary', entryId }),
  openAsk: (query = '') => set({ open: true, tab: 'ask', query, entryId: null }),
  close: () => set({ open: false }),
  setTab: (tab) => set({ tab }),
  setEntry: (entryId) => set({ entryId }),
  setQuery: (query) => set({ query }),
}));
```

`client/src/help/RichText.tsx`:
```tsx
import { Fragment, useMemo } from 'react';
import { parseInline, parseRich, type Inline } from '@office-neko/shared';
import { Kbd } from '../components/Kbd';
import { TermLink } from './TermLink';

function Inlines({ items }: { items: Inline[] }) {
  return (
    <>
      {items.map((n, i) => {
        switch (n.t) {
          case 'text':
            return <Fragment key={i}>{n.v}</Fragment>;
          case 'b':
            return <strong key={i}>{n.v}</strong>;
          case 'kbd':
            return <Kbd key={i} combo={n.combo} />;
          case 'term':
            return <TermLink key={i} termKey={n.key} label={n.label} />;
        }
      })}
    </>
  );
}

export function RichText({ text, className = '' }: { text: string; className?: string }) {
  const blocks = useMemo(() => parseRich(text), [text]);
  return (
    <div className={`space-y-3 leading-relaxed ${className}`}>
      {blocks.map((b, i) =>
        b.type === 'p' ? (
          <p key={i}><Inlines items={b.inlines} /></p>
        ) : (
          <ul key={i} className="list-disc space-y-1 pl-6">
            {b.items.map((it, j) => <li key={j}><Inlines items={it} /></li>)}
          </ul>
        ),
      )}
    </div>
  );
}

/** Một dòng nội dung (không tách đoạn), dùng trong popup và danh sách. */
export function InlineText({ text }: { text: string }) {
  const items = useMemo(() => parseInline(text), [text]);
  return <Inlines items={items} />;
}
```

`client/src/help/TermLink.tsx`:
```tsx
import { useEffect, useRef, useState } from 'react';
import { findTerm } from '../content';
import { useHelp } from './helpStore';
import { InlineText } from './RichText';

export function TermLink({ termKey, label }: { termKey: string; label: string }) {
  const entry = findTerm(termKey);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const openGlossary = useHelp((s) => s.openGlossary);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: Event) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, [open]);

  if (!entry) return <span>{label}</span>;
  return (
    <span ref={ref} className="relative inline-block">
      <button type="button" className="term" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        {label}
      </button>
      {open && (
        <span role="dialog" aria-label={entry.term} className="card absolute left-0 top-full z-40 mt-2 block w-72 p-4 text-left text-base font-normal">
          <span className="block text-lg font-extrabold">
            {entry.term} <span className="text-sm font-semibold text-muted">/{entry.say}/</span>
          </span>
          <span className="block font-bold text-rose">{entry.vi}</span>
          <span className="mt-1 block text-sm"><InlineText text={entry.explain} /></span>
          <span className="mt-3 flex gap-2">
            <button type="button" className="btn-soft !px-3 !py-1 text-sm" onClick={() => { setOpen(false); openGlossary(entry.id); }}>
              Xem thêm
            </button>
            <button type="button" className="btn !px-3 !py-1 text-sm" onClick={() => setOpen(false)}>
              Đóng
            </button>
          </span>
        </span>
      )}
    </span>
  );
}
```

Lưu ý: `RichText.tsx` và `TermLink.tsx` import lẫn nhau, nhưng đây là vòng phụ thuộc giữa các component (chỉ dùng khi render) nên ES module xử lý được.

`client/src/help/HelpTooltipLayer.tsx`:
```tsx
import { useEffect, useState } from 'react';
import type { HelpIdEntry } from '@office-neko/shared';
import { HELP_IDS } from '../content';

interface Tip {
  entry: HelpIdEntry;
  x: number;
  y: number;
}

export function HelpTooltipLayer() {
  const [tip, setTip] = useState<Tip | null>(null);
  useEffect(() => {
    let timer: number | undefined;
    let current: Element | null = null;
    const show = (el: Element) => {
      const id = el.getAttribute('data-help-id');
      const entry = id ? HELP_IDS[id] : undefined;
      if (!entry) return;
      const r = el.getBoundingClientRect();
      setTip({ entry, x: r.left + r.width / 2, y: r.bottom + 8 });
    };
    const over = (e: Event) => {
      const target = e.target instanceof Element ? e.target : null;
      const el = target?.closest('[data-help-id]') ?? null;
      if (el === current) return;
      current = el;
      window.clearTimeout(timer);
      setTip(null);
      if (el) timer = window.setTimeout(() => show(el), 400);
    };
    const hide = () => {
      window.clearTimeout(timer);
      current = null;
      setTip(null);
    };
    document.addEventListener('pointerover', over);
    document.addEventListener('focusin', over);
    document.addEventListener('pointerdown', hide);
    document.addEventListener('scroll', hide, true);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('pointerover', over);
      document.removeEventListener('focusin', over);
      document.removeEventListener('pointerdown', hide);
      document.removeEventListener('scroll', hide, true);
    };
  }, []);
  if (!tip) return null;
  return (
    <div
      role="tooltip"
      className="pointer-events-none fixed z-[70] max-w-xs -translate-x-1/2 rounded-2xl bg-text px-3 py-2 text-sm text-white shadow-lg"
      style={{ left: tip.x, top: tip.y }}
    >
      <div className="font-extrabold">{tip.entry.label}</div>
      <div>{tip.entry.vi}</div>
    </div>
  );
}
```

- [ ] **Step 4: Chạy test, xác nhận PASS**

Run: `npm test -w client && npm run typecheck -w client`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add client
git commit -m "feat(help): rich content rendering, term popovers and hover tooltips" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 12: Ngăn Trợ giúp – Từ điển, Hỏi Mèo, nút "?" và phím F1

**Files:**
- Create: `client/src/help/HelpDrawer.tsx`, `client/src/help/GlossaryPanel.tsx`, `client/src/help/AskMochiPanel.tsx`, `client/src/help/HelpButton.tsx`
- Test: `client/src/help/drawer.test.tsx`

**Interfaces:**
- Consumes: `useHelp` (Task 11), `RichText` (Task 11), `GLOSSARY`, `FAQ`, `LESSONS` (Task 10), `searchItems` (Task 3), `useOs` (Task 8), `Mochi` (Task 9).
- Produces:
  - `<HelpDrawer />`: khi `open`, hiện `role="dialog"` tên "Trợ giúp" với 2 tab `role="tab"`: "📖 Từ điển" và "🐱 Hỏi Mèo". Đóng bằng Esc, nút ✕, hoặc bấm ra nền mờ.
  - `<GlossaryPanel />`:
    - Ô tìm kiếm (`aria-label="Tìm thuật ngữ"`); danh sách lọc theo `os` và xếp theo `term`.
    - Bấm một mục để xem chi tiết: tên, cách đọc, nghĩa, giải thích, danh sách bài học có dùng (link tới `/lesson/:id`), nút "← Quay lại".
  - `<AskMochiPanel />`:
    - Ô hỏi (`aria-label="Câu hỏi của bạn"`).
    - Khi chưa gõ gì: gợi ý 5 câu hỏi hay gặp.
    - Khi có kết quả: tối đa 5 câu FAQ (tìm với `stopwords` và `minMatch: 0.5`), tối đa 3 thuật ngữ liên quan.
    - Khi không có kết quả: Mochi buồn kèm lời gợi ý thử từ khác.
  - `<HelpButton />`: nút tròn "?" cố định góc dưới phải (`data-help-id="app.help"`, `aria-label="Trợ giúp"`); phím F1 mở Từ điển.

- [ ] **Step 1: Viết test**

`client/src/help/drawer.test.tsx`:
```tsx
import { describe, it, expect, beforeEach } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { HelpDrawer } from './HelpDrawer';
import { HelpButton } from './HelpButton';
import { useHelp } from './helpStore';
import { makeProfile, renderWithProfile } from '../test/utils';

const ui = (
  <>
    <HelpButton />
    <HelpDrawer />
  </>
);

describe('help drawer', () => {
  beforeEach(() => useHelp.setState({ open: false, tab: 'glossary', entryId: null, query: '' }));

  it('opens with F1 and searches without diacritics', () => {
    renderWithProfile(ui);
    fireEvent.keyDown(window, { key: 'F1' });
    expect(screen.getByRole('dialog', { name: 'Trợ giúp' })).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Tìm thuật ngữ'), { target: { value: 'thu muc' } });
    fireEvent.click(screen.getByRole('button', { name: /Folder/ }));
    expect(screen.getByRole('heading', { name: 'Folder' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: '← Quay lại' }));
    expect(screen.getByLabelText('Tìm thuật ngữ')).toBeInTheDocument();
  });

  it('filters glossary by OS', () => {
    renderWithProfile(ui, { profile: makeProfile({ os: 'mac' }) });
    fireEvent.click(screen.getByRole('button', { name: 'Trợ giúp' }));
    expect(screen.queryByRole('button', { name: /Recycle Bin/ })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Trash/ })).toBeInTheDocument();
  });

  it('shows lessons that use a term', () => {
    renderWithProfile(ui);
    useHelp.getState().openGlossary('mouse');
    expect(screen.getByRole('link', { name: 'Làm quen với Mochi' })).toHaveAttribute('href', '/lesson/basics.welcome');
  });

  it('answers questions in Hỏi Mèo', () => {
    renderWithProfile(ui);
    useHelp.getState().openAsk();
    expect(screen.getByText('Câu hỏi hay gặp')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Câu hỏi của bạn'), { target: { value: 'cách copy như thế nào' } });
    expect(screen.getByText('Làm sao sao chép (copy) và dán (paste)?')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Copy — Sao chép/ })).toBeInTheDocument();
  });

  it('admits when it does not know', () => {
    renderWithProfile(ui);
    useHelp.getState().openAsk('zzzz qqqq');
    expect(screen.getByText(/Mochi chưa biết câu này/)).toBeInTheDocument();
  });

  it('closes with Escape', () => {
    renderWithProfile(ui);
    useHelp.getState().openGlossary();
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('dialog', { name: 'Trợ giúp' })).not.toBeInTheDocument();
  });
});
```

Lưu ý: các test gọi `useHelp.getState().openGlossary(...)` ngoài `act`, nên nếu React cảnh báo thì bọc lời gọi trong `act(() => ...)` (import `act` từ `@testing-library/react`).

- [ ] **Step 2: Chạy test, xác nhận FAIL**

Run: `npm test -w client -- drawer`
Expected: FAIL – thiếu module.

- [ ] **Step 3: Viết code**

`client/src/help/HelpButton.tsx`:
```tsx
import { useEffect } from 'react';
import { useHelp } from './helpStore';

export function HelpButton() {
  const openGlossary = useHelp((s) => s.openGlossary);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'F1') {
        e.preventDefault();
        openGlossary();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openGlossary]);
  return (
    <button
      type="button"
      data-help-id="app.help"
      aria-label="Trợ giúp"
      onClick={() => openGlossary()}
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-rose text-2xl font-extrabold text-white shadow-lg transition hover:brightness-110 active:scale-95"
    >
      ?
    </button>
  );
}
```

`client/src/help/HelpDrawer.tsx`:
```tsx
import { useEffect } from 'react';
import { useHelp, type HelpTab } from './helpStore';
import { GlossaryPanel } from './GlossaryPanel';
import { AskMochiPanel } from './AskMochiPanel';

const TABS: { id: HelpTab; label: string }[] = [
  { id: 'glossary', label: '📖 Từ điển' },
  { id: 'ask', label: '🐱 Hỏi Mèo' },
];

export function HelpDrawer() {
  const { open, tab, close, setTab } = useHelp();
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/20" onClick={close}>
      <aside
        role="dialog"
        aria-label="Trợ giúp"
        className="flex h-full w-[440px] max-w-full flex-col bg-cream shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center gap-2 border-b border-peach/40 p-3">
          <div role="tablist" className="flex gap-1">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => setTab(t.id)}
                className={`rounded-full px-4 py-1.5 font-bold ${tab === t.id ? 'bg-white shadow' : 'text-muted hover:text-text'}`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <button type="button" aria-label="Đóng trợ giúp" onClick={close} className="ml-auto rounded-full px-3 py-1 text-xl hover:bg-white">
            ✕
          </button>
        </header>
        <div className="flex-1 overflow-y-auto p-4">{tab === 'glossary' ? <GlossaryPanel /> : <AskMochiPanel />}</div>
      </aside>
    </div>
  );
}
```

`client/src/help/GlossaryPanel.tsx`:
```tsx
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { searchItems, type GlossaryEntry } from '@office-neko/shared';
import { GLOSSARY, LESSONS } from '../content';
import { useOs } from '../db/profile';
import { useHelp } from './helpStore';
import { RichText } from './RichText';

function GlossaryDetail({ entry, onBack }: { entry: GlossaryEntry; onBack: () => void }) {
  const close = useHelp((s) => s.close);
  const lessons = entry.lessonIds.map((id) => LESSONS[id]).filter((l) => !!l);
  return (
    <article className="space-y-3">
      <button type="button" className="btn !px-3 !py-1 text-sm" onClick={onBack}>← Quay lại</button>
      <h2 className="text-2xl font-extrabold">{entry.term}</h2>
      <p className="text-muted">Cách đọc: /{entry.say}/</p>
      <p className="text-lg font-bold text-rose">{entry.vi}</p>
      <RichText text={entry.explain} />
      {entry.image && <img src={`/img/glossary/${entry.image}`} alt={entry.term} className="max-h-48 rounded-2xl" />}
      {lessons.length > 0 && (
        <div>
          <h3 className="font-bold">Có trong bài:</h3>
          <ul className="list-disc pl-6">
            {lessons.map((l) => (
              <li key={l!.id}>
                <Link to={`/lesson/${l!.id}`} onClick={close} className="text-rose underline">{l!.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}

export function GlossaryPanel() {
  const os = useOs();
  const { entryId, setEntry, openAsk } = useHelp();
  const [q, setQ] = useState('');
  const entries = useMemo(() => GLOSSARY.filter((e) => !e.os || e.os === os), [os]);
  const detail = entryId ? GLOSSARY.find((e) => e.id === entryId) : undefined;
  if (detail) return <GlossaryDetail entry={detail} onBack={() => setEntry(null)} />;
  const list = q.trim()
    ? searchItems(entries, q, (e) => [e.term, e.vi, e.explain]).map((h) => h.item)
    : [...entries].sort((a, b) => a.term.localeCompare(b.term));
  return (
    <div className="space-y-3">
      <input
        type="search"
        aria-label="Tìm thuật ngữ"
        placeholder="Gõ từ cần tra, có dấu hay không đều được…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        autoFocus
        className="w-full rounded-full border-2 border-peach/60 bg-white px-4 py-2 outline-none focus:border-rose"
      />
      {list.length === 0 ? (
        <p className="text-muted">
          Chưa có từ này trong Từ điển. Thử{' '}
          <button type="button" className="font-bold text-rose underline" onClick={() => openAsk(q)}>Hỏi Mèo</button> nhé!
        </p>
      ) : (
        <ul className="space-y-2">
          {list.map((e) => (
            <li key={e.id}>
              <button type="button" onClick={() => setEntry(e.id)} className="card w-full p-3 text-left hover:ring-2 hover:ring-peach">
                <span className="font-extrabold">{e.term}</span> <span className="text-muted">— {e.vi}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

`client/src/help/AskMochiPanel.tsx`:
```tsx
import { useMemo } from 'react';
import { searchItems } from '@office-neko/shared';
import { FAQ, GLOSSARY } from '../content';
import { useOs } from '../db/profile';
import { Mochi } from '../components/Mochi';
import { SpeechBubble } from '../components/SpeechBubble';
import { useHelp } from './helpStore';
import { RichText } from './RichText';

export function AskMochiPanel() {
  const os = useOs();
  const { query, setQuery, openGlossary } = useHelp();
  const faqs = useMemo(() => FAQ.filter((f) => !f.os || f.os === os), [os]);
  const terms = useMemo(() => GLOSSARY.filter((e) => !e.os || e.os === os), [os]);
  const q = query.trim();
  const opts = { stopwords: true, minMatch: 0.5 };
  const faqHits = q ? searchItems(faqs, q, (f) => [f.q, f.keywords.join(' ')], { ...opts, limit: 5 }).map((h) => h.item) : [];
  const termHits = q ? searchItems(terms, q, (e) => [e.term, e.vi], { ...opts, limit: 3 }).map((h) => h.item) : [];
  const nothing = q && faqHits.length === 0 && termHits.length === 0;

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <Mochi mood={nothing ? 'sad' : 'happy'} size={64} animated={false} />
        <SpeechBubble>
          {nothing
            ? 'Mochi chưa biết câu này 😿. Bạn thử hỏi bằng từ khác, ví dụ “copy”, “lưu file”, “phím tắt” nhé.'
            : 'Bạn muốn hỏi gì nào? Gõ câu hỏi bằng lời của bạn, có dấu hay không đều được.'}
        </SpeechBubble>
      </div>
      <input
        type="search"
        aria-label="Câu hỏi của bạn"
        placeholder="Ví dụ: làm sao lấy lại chữ vừa xoá?"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoFocus
        className="w-full rounded-full border-2 border-peach/60 bg-white px-4 py-2 outline-none focus:border-rose"
      />
      {!q && (
        <div>
          <h3 className="mb-2 font-bold">Câu hỏi hay gặp</h3>
          <ul className="space-y-2">
            {faqs.slice(0, 5).map((f) => (
              <li key={f.id}>
                <button type="button" onClick={() => setQuery(f.q)} className="w-full rounded-2xl bg-white px-3 py-2 text-left hover:ring-2 hover:ring-peach">
                  {f.q}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {faqHits.map((f) => (
        <section key={f.id} className="card space-y-2 p-4">
          <h3 className="font-extrabold">{f.q}</h3>
          <RichText text={f.a} />
        </section>
      ))}
      {termHits.length > 0 && (
        <div>
          <h3 className="mb-2 font-bold">Từ liên quan</h3>
          <div className="flex flex-wrap gap-2">
            {termHits.map((e) => (
              <button key={e.id} type="button" onClick={() => openGlossary(e.id)} className="rounded-full bg-lavender/40 px-3 py-1 font-semibold">
                {e.term} — {e.vi}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 4: Chạy test, xác nhận PASS**

Run: `npm test -w client && npm run typecheck -w client`
Expected: PASS. (Câu "cách copy như thế nào" sau khi bỏ từ dừng `cach`, `nhu`, `the`, `nao` chỉ còn token `copy`, nên khớp FAQ copy/paste và thuật ngữ Copy.)

- [ ] **Step 5: Commit**

```bash
git add client
git commit -m "feat(help): help drawer with glossary, Ask Mochi FAQ and F1 shortcut" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 13: Spotlight – Mochi chỉ vào đúng chỗ (gợi ý bậc 2)

**Files:**
- Create: `client/src/help/SpotlightOverlay.tsx`
- Test: `client/src/help/spotlight.test.tsx`

**Interfaces:**
- Consumes: `Spotlight` (shared).
- Produces:
  - `spotlightSelector(s: Spotlight): string`: ánh xạ `{helpId}` → `[data-help-id="…"]`, `{cell}` → `[data-cell="…"]`, `{path}` → `[data-path="…"]`, `{key}` → `[data-key="…"]`.
  - `<SpotlightOverlay target: Spotlight | null root: HTMLElement | null />`:
    - Tìm phần tử đích bên trong `root`, vẽ vòng sáng `fixed` bao quanh (lề 6px) kèm nhãn "🐾 Ở đây nè!".
    - Cập nhật vị trí mỗi 250 ms và khi đổi kích thước cửa sổ; chỉ render lại khi vị trí thay đổi.
    - Không render gì nếu không có `target` hoặc không tìm thấy phần tử.
  - **Quy ước cho các trình mô phỏng ở giai đoạn sau:** phần tử có thể được chỉ tới phải mang một trong các thuộc tính `data-help-id` / `data-cell` / `data-path` / `data-key`.

- [ ] **Step 1: Viết test**

`client/src/help/spotlight.test.tsx`:
```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SpotlightOverlay, spotlightSelector } from './SpotlightOverlay';

describe('spotlightSelector', () => {
  it('maps each spotlight kind', () => {
    expect(spotlightSelector({ helpId: 'home.bold' })).toBe('[data-help-id="home.bold"]');
    expect(spotlightSelector({ cell: 'B11' })).toBe('[data-cell="B11"]');
    expect(spotlightSelector({ path: '/Tài liệu' })).toBe('[data-path="/Tài liệu"]');
    expect(spotlightSelector({ key: '"' })).toBe('[data-key="\\""]');
  });
});

describe('SpotlightOverlay', () => {
  it('draws a ring around the target element', () => {
    const root = document.createElement('div');
    root.innerHTML = '<button data-help-id="x">B</button>';
    document.body.appendChild(root);
    const btn = root.querySelector('button')!;
    btn.getBoundingClientRect = () => ({ left: 10, top: 20, width: 30, height: 40, right: 40, bottom: 60, x: 10, y: 20, toJSON() {} }) as DOMRect;
    render(<SpotlightOverlay target={{ helpId: 'x' }} root={root} />);
    const label = screen.getByText('🐾 Ở đây nè!');
    const box = label.parentElement!;
    expect(box.style.left).toBe('4px');
    expect(box.style.top).toBe('14px');
    expect(box.style.width).toBe('42px');
    expect(box.style.height).toBe('52px');
    root.remove();
  });

  it('renders nothing without a target', () => {
    render(<SpotlightOverlay target={null} root={document.body} />);
    expect(screen.queryByText('🐾 Ở đây nè!')).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Chạy test, xác nhận FAIL**

Run: `npm test -w client -- spotlight`
Expected: FAIL – thiếu module.

- [ ] **Step 3: Viết code**

`client/src/help/SpotlightOverlay.tsx`:
```tsx
import { useEffect, useState } from 'react';
import type { Spotlight } from '@office-neko/shared';

const esc = (v: string) => v.replace(/["\\]/g, '\\$&');

export function spotlightSelector(s: Spotlight): string {
  if ('helpId' in s) return `[data-help-id="${esc(s.helpId)}"]`;
  if ('cell' in s) return `[data-cell="${esc(s.cell)}"]`;
  if ('path' in s) return `[data-path="${esc(s.path)}"]`;
  return `[data-key="${esc(s.key)}"]`;
}

interface Box {
  left: number;
  top: number;
  width: number;
  height: number;
}

const PAD = 6;

export function SpotlightOverlay({ target, root }: { target: Spotlight | null; root: HTMLElement | null }) {
  const [box, setBox] = useState<Box | null>(null);
  useEffect(() => {
    if (!target || !root) {
      setBox(null);
      return;
    }
    const sel = spotlightSelector(target);
    const update = () => {
      const el = root.querySelector(sel);
      if (!el) {
        setBox(null);
        return;
      }
      const r = el.getBoundingClientRect();
      const next = { left: r.left - PAD, top: r.top - PAD, width: r.width + PAD * 2, height: r.height + PAD * 2 };
      setBox((prev) =>
        prev && prev.left === next.left && prev.top === next.top && prev.width === next.width && prev.height === next.height ? prev : next,
      );
    };
    update();
    const id = window.setInterval(update, 250);
    window.addEventListener('resize', update);
    return () => {
      window.clearInterval(id);
      window.removeEventListener('resize', update);
    };
  }, [target, root]);
  if (!target || !box) return null;
  return (
    <div aria-hidden className="pointer-events-none fixed z-40" style={{ left: box.left, top: box.top, width: box.width, height: box.height }}>
      <div className="spotlight-ring absolute inset-0 rounded-xl ring-4 ring-rose" />
      <div className="spotlight-paw absolute -top-9 left-1/2 whitespace-nowrap rounded-full bg-rose px-2 py-0.5 text-sm font-bold text-white">
        🐾 Ở đây nè!
      </div>
    </div>
  );
}
```

Lưu ý:
- Lớp `.spotlight-paw` (Task 9) đã có `translate(-50%, …)` trong animation, vì vậy không thêm `-translate-x-1/2` ở đây.
- Test lấy `label.parentElement`, tức div ngoài cùng có `style`.

- [ ] **Step 4: Chạy test, xác nhận PASS**

Run: `npm test -w client && npm run typecheck -w client`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add client
git commit -m "feat(help): spotlight overlay for level-2 hints" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 14: Trình chạy bài học (Giải thích → Câu hỏi → Thực hành → Hoàn thành)

**Files:**
- Create: `client/src/player/playerReducer.ts`, `client/src/player/LessonPlayer.tsx`, `client/src/player/ExplainView.tsx`, `client/src/player/QuizView.tsx`, `client/src/player/PracticeView.tsx`, `client/src/player/HintPanel.tsx`, `client/src/player/FinishView.tsx`
- Create: `client/src/pages/LessonPage.tsx`
- Test: `client/src/player/playerReducer.test.ts`, `client/src/player/LessonPlayer.test.tsx`, `client/src/pages/LessonPage.test.tsx`

**Interfaces:**
- Consumes: `Step`, `Lesson`, `PracticeStep`, `computeStars`, `grade`, `GradeReport`, `nextLessonId` (shared); `SIMS` (Task 10); `RichText` (Task 11); `SpotlightOverlay` (Task 13); `Mochi`, `SpeechBubble`, `Confetti`, `useSound`/`playSound` (Task 9); `useOs` (Task 8); `recordLessonResult` (Task 8); `LESSONS`, `TRACKS` (Task 10).
- Produces:
  - `type HintLevel = 0 | 1 | 2 | 3`
  - `interface PlayerState { index: number; stepDone: boolean; stepHint: HintLevel; maxHint: HintLevel; failures: number; finished: boolean }`
  - `type PlayerAction = { type: 'next' } | { type: 'quizPick'; correct: boolean } | { type: 'checkResult'; pass: boolean; manual: boolean } | { type: 'hint' }`
  - `initPlayer(steps): PlayerState`, `playerReducer(steps): (s, a) => PlayerState`
  - `interface LessonResult { stars: 1 | 2 | 3; maxHint: HintLevel; failures: number; timeMs: number }`
  - `<LessonPlayer lesson onFinish(r: LessonResult) onExit() />`
  - `<LessonPage id: string />`: dùng trong route `/lesson/:id` qua `LessonRoute` (Task 15).
- **Quy tắc của trình chạy:**
  - Bước giải thích được coi là xong ngay khi hiện ra.
  - Câu hỏi: chọn sai thì `failures + 1` và được chọn lại; chọn đúng thì bước xong.
  - Thực hành:
    - App tự chấm (debounce 300 ms) mỗi khi trạng thái sim đổi. Nếu đạt thì bước xong; nếu chưa đạt thì không trừ gì và không hiện lỗi.
    - Bấm **Kiểm tra**: chấm ngay và hiện kết quả từng điều kiện; nếu chưa đạt thì `failures + 1`.
    - Nút **Gợi ý** tăng bậc gợi ý tối đa lên 3. Từ bậc 2, `SpotlightOverlay` chỉ vào `hints[1]`.
  - Khi hết bước: sao được tính bằng `computeStars({ maxHintLevel: maxHint, failures })`.

- [ ] **Step 1: Viết test reducer**

`client/src/player/playerReducer.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import type { Step } from '@office-neko/shared';
import { initPlayer, playerReducer } from './playerReducer';

const steps: Step[] = [
  { kind: 'explain', body: 'a' },
  { kind: 'quiz', question: 'q', choices: ['x', 'y'], answer: 1, why: 'w' },
  { kind: 'practice', sim: 'mouse', task: 't', initial: {}, checks: [{}], hints: ['h', { helpId: 'x' }, ['s']], solution: [] },
];

describe('playerReducer', () => {
  const r = playerReducer(steps);

  it('starts on a done explain step', () => {
    expect(initPlayer(steps)).toMatchObject({ index: 0, stepDone: true, failures: 0, finished: false });
  });

  it('counts wrong quiz picks and blocks next until correct', () => {
    let s = r(initPlayer(steps), { type: 'next' });
    expect(s).toMatchObject({ index: 1, stepDone: false });
    s = r(s, { type: 'next' });
    expect(s.index).toBe(1);
    s = r(s, { type: 'quizPick', correct: false });
    s = r(s, { type: 'quizPick', correct: true });
    s = r(s, { type: 'quizPick', correct: false });
    expect(s).toMatchObject({ stepDone: true, failures: 1 });
  });

  it('only counts manual failed checks and tracks hints', () => {
    let s = { ...initPlayer(steps), index: 2, stepDone: false };
    s = r(s, { type: 'checkResult', pass: false, manual: false });
    expect(s.failures).toBe(0);
    s = r(s, { type: 'checkResult', pass: false, manual: true });
    expect(s.failures).toBe(1);
    s = r(s, { type: 'hint' });
    s = r(s, { type: 'hint' });
    s = r(s, { type: 'hint' });
    s = r(s, { type: 'hint' });
    expect(s).toMatchObject({ stepHint: 3, maxHint: 3 });
    s = r(s, { type: 'checkResult', pass: true, manual: false });
    expect(s.stepDone).toBe(true);
    s = r(s, { type: 'next' });
    expect(s).toMatchObject({ finished: true, maxHint: 3 });
  });
});
```

- [ ] **Step 2: Viết playerReducer.ts, chạy test PASS**

`client/src/player/playerReducer.ts`:
```ts
import type { Step } from '@office-neko/shared';

export type HintLevel = 0 | 1 | 2 | 3;

export interface PlayerState {
  index: number;
  stepDone: boolean;
  stepHint: HintLevel;
  maxHint: HintLevel;
  failures: number;
  finished: boolean;
}

export type PlayerAction =
  | { type: 'next' }
  | { type: 'quizPick'; correct: boolean }
  | { type: 'checkResult'; pass: boolean; manual: boolean }
  | { type: 'hint' };

const doneOnEnter = (step: Step | undefined) => step?.kind === 'explain';

export function initPlayer(steps: readonly Step[]): PlayerState {
  return { index: 0, stepDone: doneOnEnter(steps[0]), stepHint: 0, maxHint: 0, failures: 0, finished: steps.length === 0 };
}

export function playerReducer(steps: readonly Step[]) {
  return (s: PlayerState, a: PlayerAction): PlayerState => {
    if (s.finished) return s;
    switch (a.type) {
      case 'quizPick':
        if (s.stepDone) return s;
        return a.correct ? { ...s, stepDone: true } : { ...s, failures: s.failures + 1 };
      case 'checkResult':
        if (s.stepDone) return s;
        if (a.pass) return { ...s, stepDone: true };
        return a.manual ? { ...s, failures: s.failures + 1 } : s;
      case 'hint': {
        if (s.stepDone) return s;
        const h = Math.min(3, s.stepHint + 1) as HintLevel;
        return { ...s, stepHint: h, maxHint: Math.max(s.maxHint, h) as HintLevel };
      }
      case 'next': {
        if (!s.stepDone) return s;
        const index = s.index + 1;
        if (index >= steps.length) return { ...s, index, finished: true };
        return { ...s, index, stepDone: doneOnEnter(steps[index]), stepHint: 0 };
      }
    }
  };
}
```

Run: `npm test -w client -- playerReducer` → PASS.

- [ ] **Step 3: Viết test LessonPlayer (dùng sim giả)**

`client/src/player/LessonPlayer.test.tsx`:
```tsx
import { describe, it, expect, vi, afterEach } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { GRADERS, type Lesson } from '@office-neko/shared';
import { SIMS } from '../sims/registry';
import type { SimProps } from '../sims/types';
import { LessonPlayer } from './LessonPlayer';
import { renderWithProfile } from '../test/utils';

type FakeState = { clicked: boolean };
function FakeSim({ onState }: SimProps<FakeState>) {
  return <button data-help-id="player.check" onClick={() => onState({ clicked: true })}>Bấm tôi</button>;
}

const quizLesson: Lesson = {
  id: 't.quiz', trackId: 't', chapterId: 't.c', title: 'Thử', minutes: 1,
  steps: [
    { kind: 'explain', body: 'Xin chào **bạn**' },
    { kind: 'quiz', question: 'Chọn B', choices: ['A', 'B'], answer: 1, why: 'Vì B đúng' },
  ],
};

const practiceLesson: Lesson = {
  id: 't.practice', trackId: 't', chapterId: 't.c', title: 'Thực hành', minutes: 1,
  steps: [
    {
      kind: 'practice', sim: 'mouse', task: 'Hãy bấm nút', initial: { clicked: false },
      checks: [{ need: 'click' }], hints: ['Nút màu hồng đó', { helpId: 'player.check' }, ['Bấm nút “Bấm tôi”']], solution: [],
    },
  ],
};

function setupFakeSim() {
  SIMS.mouse = { kind: 'mouse', Component: FakeSim, reduce: (s: FakeState) => s };
  GRADERS.mouse = (s: FakeState) => ({ ok: s.clicked, messageVi: s.clicked ? 'Đã bấm nút' : 'Bạn chưa bấm nút' });
}

describe('LessonPlayer', () => {
  afterEach(() => {
    delete SIMS.mouse;
    delete GRADERS.mouse;
  });

  it('runs explain + quiz and reports 3 stars', async () => {
    const onFinish = vi.fn();
    renderWithProfile(<LessonPlayer lesson={quizLesson} onFinish={onFinish} onExit={() => {}} />);
    expect(screen.getByText('bạn').tagName).toBe('STRONG');
    fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục →' }));
    fireEvent.click(screen.getByRole('button', { name: 'B' }));
    expect(screen.getByText('Vì B đúng')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục →' }));
    await waitFor(() => expect(onFinish).toHaveBeenCalledTimes(1));
    expect(onFinish.mock.calls[0]![0]).toMatchObject({ stars: 3, failures: 0, maxHint: 0 });
  });

  it('lowers stars after several wrong answers', async () => {
    const onFinish = vi.fn();
    renderWithProfile(<LessonPlayer lesson={quizLesson} onFinish={onFinish} onExit={() => {}} />);
    fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục →' }));
    fireEvent.click(screen.getByRole('button', { name: 'A' }));
    expect(screen.getByText(/Chưa đúng rồi/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /A/ }));
    fireEvent.click(screen.getByRole('button', { name: 'B' }));
    fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục →' }));
    await waitFor(() => expect(onFinish).toHaveBeenCalled());
    expect(onFinish.mock.calls[0]![0]).toMatchObject({ stars: 3, failures: 1 });
  });

  it('grades practice steps: manual check fails, auto-grade passes', async () => {
    setupFakeSim();
    const onFinish = vi.fn();
    renderWithProfile(<LessonPlayer lesson={practiceLesson} onFinish={onFinish} onExit={() => {}} />);
    fireEvent.click(screen.getByRole('button', { name: 'Kiểm tra' }));
    expect(screen.getByText(/Bạn chưa bấm nút/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Bấm tôi' }));
    expect(await screen.findByText(/Giỏi quá/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục →' }));
    await waitFor(() => expect(onFinish).toHaveBeenCalled());
    expect(onFinish.mock.calls[0]![0]).toMatchObject({ stars: 3, failures: 1 });
  });

  it('shows hints level by level and costs stars', async () => {
    setupFakeSim();
    const onFinish = vi.fn();
    renderWithProfile(<LessonPlayer lesson={practiceLesson} onFinish={onFinish} onExit={() => {}} />);
    fireEvent.click(screen.getByRole('button', { name: /Gợi ý \(0\/3\)/ }));
    expect(screen.getByText('Nút màu hồng đó')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Gợi ý \(1\/3\)/ }));
    expect(screen.getByText(/Mochi đã đánh dấu/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Gợi ý \(2\/3\)/ }));
    expect(screen.getByText('Bấm nút “Bấm tôi”')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Gợi ý \(3\/3\)/ })).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: 'Bấm tôi' }));
    fireEvent.click(await screen.findByRole('button', { name: 'Tiếp tục →' }));
    await waitFor(() => expect(onFinish).toHaveBeenCalled());
    expect(onFinish.mock.calls[0]![0]).toMatchObject({ stars: 1, maxHint: 3 });
  });

  it('calls onExit from the close button', () => {
    const onExit = vi.fn();
    renderWithProfile(<LessonPlayer lesson={quizLesson} onFinish={() => {}} onExit={onExit} />);
    fireEvent.click(screen.getByRole('button', { name: 'Thoát bài' }));
    expect(onExit).toHaveBeenCalled();
  });
});
```

Ghi chú test "lowers stars": sau khi chọn sai A, nút A hiển thị "❌ A" nên selector là `/A/`. Bấm lại A không được tính là sai thêm, vì component bỏ qua lựa chọn đã sai trước đó. Kết quả là failures = 1 → vẫn 3 sao (quy tắc sai tối đa 1 lần vẫn được 3 sao).

- [ ] **Step 4: Viết các view**

`client/src/player/ExplainView.tsx`:
```tsx
import type { ExplainStep } from '@office-neko/shared';
import { Mochi } from '../components/Mochi';
import { SpeechBubble } from '../components/SpeechBubble';
import { RichText } from '../help/RichText';

export function ExplainView({ step, onNext }: { step: ExplainStep; onNext: () => void }) {
  return (
    <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
      <Mochi mood={step.mood ?? 'neutral'} size={150} />
      <div className="flex-1 space-y-4">
        <SpeechBubble>
          <RichText text={step.body} className="text-lg" />
          {step.image && <img src={step.image} alt="" className="mt-3 max-h-64 rounded-2xl" />}
        </SpeechBubble>
        <button type="button" className="btn-primary" onClick={onNext} autoFocus>Tiếp tục →</button>
      </div>
    </div>
  );
}
```

`client/src/player/QuizView.tsx`:
```tsx
import { useState } from 'react';
import type { QuizStep } from '@office-neko/shared';
import { Mochi } from '../components/Mochi';
import { RichText } from '../help/RichText';
import { useSound } from '../lib/sound';

export function QuizView({ step, done, onPick, onNext }: { step: QuizStep; done: boolean; onPick: (correct: boolean) => void; onNext: () => void }) {
  const [wrong, setWrong] = useState<number[]>([]);
  const sound = useSound();
  const pick = (i: number) => {
    if (done || wrong.includes(i)) return;
    const correct = i === step.answer;
    if (!correct) setWrong((w) => [...w, i]);
    sound(correct ? 'correct' : 'wrong');
    onPick(correct);
  };
  return (
    <div className="card space-y-4 p-6">
      <RichText text={step.question} className="text-xl font-bold" />
      <div className="grid gap-3">
        {step.choices.map((c, i) => {
          const isWrong = wrong.includes(i);
          const isRight = done && i === step.answer;
          const cls = isRight
            ? 'border-excel bg-excel/15'
            : isWrong
              ? 'animate-shake border-rose bg-rose/10 opacity-70'
              : 'border-peach/50 hover:border-peach hover:bg-peach/10';
          return (
            <button key={i} type="button" onClick={() => pick(i)} className={`rounded-2xl border-2 px-4 py-3 text-left font-semibold transition ${cls}`}>
              {isRight ? '✅ ' : isWrong ? '❌ ' : ''}{c}
            </button>
          );
        })}
      </div>
      {wrong.length > 0 && !done && <p className="font-semibold text-rose">Chưa đúng rồi, thử lại nhé! 💪</p>}
      {done && (
        <div className="space-y-3">
          <div className="flex items-start gap-3 rounded-2xl bg-mint/30 p-3">
            <Mochi mood="happy" size={56} animated={false} />
            <RichText text={step.why} />
          </div>
          <button type="button" className="btn-primary" onClick={onNext} autoFocus>Tiếp tục →</button>
        </div>
      )}
    </div>
  );
}
```

`client/src/player/HintPanel.tsx`:
```tsx
import type { PracticeStep } from '@office-neko/shared';
import { RichText } from '../help/RichText';
import type { HintLevel } from './playerReducer';

export function HintPanel({ step, level }: { step: PracticeStep; level: HintLevel }) {
  return (
    <div className="space-y-2 rounded-2xl bg-butter/40 p-4" aria-live="polite">
      <div>
        <strong>Gợi ý 1:</strong>
        <RichText text={step.hints[0]} />
      </div>
      {level >= 2 && (
        <div><strong>Gợi ý 2:</strong> Mochi đã đánh dấu chỗ cần bấm cho bạn 🐾</div>
      )}
      {level >= 3 && (
        <div>
          <strong>Lời giải từng bước:</strong>
          <ol className="mt-1 list-decimal space-y-1 pl-6">
            {step.hints[2].map((s, i) => (
              <li key={i}><RichText text={s} /></li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
```

`client/src/player/PracticeView.tsx`:
```tsx
import { useCallback, useEffect, useRef, useState, type Dispatch } from 'react';
import { grade, type GradeReport, type PracticeStep } from '@office-neko/shared';
import { SIMS } from '../sims/registry';
import { useOs } from '../db/profile';
import { Mochi } from '../components/Mochi';
import { RichText } from '../help/RichText';
import { SpotlightOverlay } from '../help/SpotlightOverlay';
import { useSound } from '../lib/sound';
import { HintPanel } from './HintPanel';
import type { PlayerAction, PlayerState } from './playerReducer';

export function PracticeView({ step, state, dispatch }: { step: PracticeStep; state: PlayerState; dispatch: Dispatch<PlayerAction> }) {
  const def = SIMS[step.sim];
  const os = useOs();
  const sound = useSound();
  const latest = useRef<unknown>(step.initial);
  const timer = useRef<number | undefined>(undefined);
  const [report, setReport] = useState<GradeReport | null>(null);
  const [root, setRoot] = useState<HTMLDivElement | null>(null);

  const runGrade = useCallback(
    (manual: boolean) => {
      const r = grade(step.sim, latest.current, step.checks);
      if (manual || r.pass) setReport(r);
      dispatch({ type: 'checkResult', pass: r.pass, manual });
      if (r.pass) sound('correct');
      else if (manual) sound('wrong');
    },
    [step, dispatch, sound],
  );

  const onState = useCallback(
    (s: unknown) => {
      latest.current = s;
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => runGrade(false), 300);
    },
    [runGrade],
  );

  useEffect(() => () => window.clearTimeout(timer.current), []);

  if (!def) return <div className="card p-6">😿 Trình mô phỏng “{step.sim}” chưa sẵn sàng.</div>;
  const Sim = def.Component;
  const spotlight = state.stepHint >= 2 && !state.stepDone ? step.hints[1] : null;

  return (
    <div className="space-y-4">
      <div className="card flex items-start gap-3 p-4">
        <Mochi mood="neutral" size={56} animated={false} />
        <RichText text={step.task} className="text-lg font-semibold" />
      </div>
      <div ref={setRoot} className="relative">
        <Sim initial={step.initial} onState={onState} os={os} spotlight={spotlight} />
      </div>
      <SpotlightOverlay target={spotlight} root={root} />
      {state.stepHint > 0 && !state.stepDone && <HintPanel step={step} level={state.stepHint} />}
      {report && (
        <ul aria-label="Kết quả chấm" className="space-y-1">
          {report.results.map((r, i) => (
            <li key={i} className={r.ok ? 'text-excel' : 'text-rose'}>{r.ok ? '✅' : '❌'} {r.messageVi}</li>
          ))}
        </ul>
      )}
      <div className="flex flex-wrap items-center gap-3">
        {state.stepDone ? (
          <>
            <span className="flex items-center gap-2 font-bold text-excel">
              <Mochi mood="happy" size={48} animated={false} /> Giỏi quá! Bạn làm đúng rồi 🎉
            </span>
            <button type="button" className="btn-primary" onClick={() => dispatch({ type: 'next' })} autoFocus>Tiếp tục →</button>
          </>
        ) : (
          <>
            <button type="button" className="btn-primary" data-help-id="player.check" onClick={() => { window.clearTimeout(timer.current); runGrade(true); }}>
              Kiểm tra
            </button>
            <button type="button" className="btn-soft" data-help-id="player.hint" disabled={state.stepHint >= 3} onClick={() => dispatch({ type: 'hint' })}>
              💡 Gợi ý ({state.stepHint}/3)
            </button>
          </>
        )}
      </div>
    </div>
  );
}
```

`client/src/player/LessonPlayer.tsx`:
```tsx
import { useEffect, useMemo, useReducer, useRef } from 'react';
import { computeStars, type Lesson } from '@office-neko/shared';
import { useOs } from '../db/profile';
import { initPlayer, playerReducer, type HintLevel } from './playerReducer';
import { ExplainView } from './ExplainView';
import { QuizView } from './QuizView';
import { PracticeView } from './PracticeView';

export interface LessonResult {
  stars: 1 | 2 | 3;
  maxHint: HintLevel;
  failures: number;
  timeMs: number;
}

export function LessonPlayer({ lesson, onFinish, onExit }: { lesson: Lesson; onFinish: (r: LessonResult) => void; onExit: () => void }) {
  const reducer = useMemo(() => playerReducer(lesson.steps), [lesson]);
  const [state, dispatch] = useReducer(reducer, lesson.steps, initPlayer);
  const startedAt = useRef(Date.now());
  const reported = useRef(false);
  const os = useOs();

  useEffect(() => {
    if (!state.finished || reported.current) return;
    reported.current = true;
    onFinish({
      stars: computeStars({ maxHintLevel: state.maxHint, failures: state.failures }),
      maxHint: state.maxHint,
      failures: state.failures,
      timeMs: Date.now() - startedAt.current,
    });
  }, [state.finished, state.maxHint, state.failures, onFinish]);

  const total = lesson.steps.length;
  const step = lesson.steps[state.index];
  const note = lesson.osNote?.[os];

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-4 p-4">
      <header className="flex items-center gap-3">
        <button type="button" data-help-id="player.close" aria-label="Thoát bài" onClick={onExit} className="rounded-full px-3 py-1 text-xl hover:bg-white">
          ✕
        </button>
        <div role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={state.index} className="h-3 flex-1 rounded-full bg-peach/30">
          <div className="h-full rounded-full bg-rose transition-all" style={{ width: `${(Math.min(state.index, total) / Math.max(total, 1)) * 100}%` }} />
        </div>
        <span className="text-sm font-bold text-muted">{Math.min(state.index + 1, total)}/{total}</span>
      </header>
      {note && <p className="rounded-2xl bg-sky/30 p-3 text-sm">💡 {note}</p>}
      {step && !state.finished && (
        step.kind === 'explain' ? (
          <ExplainView key={state.index} step={step} onNext={() => dispatch({ type: 'next' })} />
        ) : step.kind === 'quiz' ? (
          <QuizView key={state.index} step={step} done={state.stepDone} onPick={(correct) => dispatch({ type: 'quizPick', correct })} onNext={() => dispatch({ type: 'next' })} />
        ) : (
          <PracticeView key={state.index} step={step} state={state} dispatch={dispatch} />
        )
      )}
    </div>
  );
}
```

`client/src/player/FinishView.tsx`:
```tsx
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Lesson } from '@office-neko/shared';
import { Confetti } from '../components/Confetti';
import { Mochi } from '../components/Mochi';
import { useSound } from '../lib/sound';
import type { LessonResult } from './LessonPlayer';

export function FinishView({ lesson, result, xpGained, nextId }: { lesson: Lesson; result: LessonResult; xpGained: number; nextId: string | null }) {
  const sound = useSound();
  useEffect(() => sound('finish'), [sound]);
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-4 p-6 text-center">
      <Confetti />
      <Mochi mood="happy" size={170} />
      <h1 className="text-2xl font-extrabold">Hoàn thành: {lesson.title}</h1>
      <p aria-label={`${result.stars} trên 3 sao`} className="text-5xl tracking-widest">
        {'⭐'.repeat(result.stars)}<span className="opacity-25">{'⭐'.repeat(3 - result.stars)}</span>
      </p>
      <p className="text-lg font-bold">
        {xpGained > 0 ? `+${xpGained} XP` : 'Bạn đã có số sao này rồi, ôn lại như vậy rất tốt!'}
      </p>
      <p className="text-muted">Gợi ý đã dùng: {result.maxHint}/3 · Lần kiểm tra chưa đúng: {result.failures}</p>
      <div className="flex flex-wrap justify-center gap-3">
        {nextId && <Link to={`/lesson/${nextId}`} className="btn-primary">Bài tiếp theo →</Link>}
        <Link to="/" className="btn-soft">Về bản đồ</Link>
      </div>
    </div>
  );
}
```

Lưu ý: `useEffect(() => sound('finish'), [sound])` — hàm `sound` trả về `void` nên không bị coi là hàm dọn dẹp.

`client/src/pages/LessonPage.tsx`:
```tsx
import { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { nextLessonId } from '@office-neko/shared';
import { LESSONS, TRACKS } from '../content';
import { useOs } from '../db/profile';
import { recordLessonResult } from '../progress/record';
import { LessonPlayer, type LessonResult } from '../player/LessonPlayer';
import { FinishView } from '../player/FinishView';

export function LessonPage({ id }: { id: string }) {
  const lesson = LESSONS[id];
  const navigate = useNavigate();
  const os = useOs();
  const [done, setDone] = useState<{ result: LessonResult; xpGained: number } | null>(null);

  const onFinish = useCallback(
    async (result: LessonResult) => {
      const { xpGained } = await recordLessonResult({ lessonId: id, stars: result.stars, hintsUsed: result.maxHint, timeMs: result.timeMs });
      setDone({ result, xpGained });
    },
    [id],
  );
  const onExit = useCallback(() => navigate('/'), [navigate]);

  if (!lesson) {
    return (
      <div className="card mx-auto mt-10 max-w-md space-y-3 p-6 text-center">
        <p className="text-lg font-bold">Không tìm thấy bài học này 😿</p>
        <Link to="/" className="btn-primary">Về bản đồ</Link>
      </div>
    );
  }
  if (done) return <FinishView lesson={lesson} result={done.result} xpGained={done.xpGained} nextId={nextLessonId(TRACKS, LESSONS, os, id)} />;
  return <LessonPlayer lesson={lesson} onFinish={onFinish} onExit={onExit} />;
}
```

- [ ] **Step 5: Viết test LessonPage**

`client/src/pages/LessonPage.test.tsx`:
```tsx
import { describe, it, expect, beforeEach } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { db } from '../db/db';
import { createProfile } from '../db/profile';
import { LessonPage } from './LessonPage';
import { renderWithProfile, resetDb } from '../test/utils';

describe('LessonPage', () => {
  beforeEach(async () => {
    await resetDb();
    await createProfile({ name: 'An', os: 'win', dailyGoalMin: 10 });
  });

  it('plays the welcome lesson, saves 3 stars and shows +30 XP', async () => {
    renderWithProfile(<LessonPage id="basics.welcome" />, { route: '/lesson/basics.welcome' });
    for (let i = 0; i < 3; i++) fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục →' }));
    fireEvent.click(screen.getByRole('button', { name: 'Bấm vào từ có gạch chân chấm hoặc mở Từ điển' }));
    fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục →' }));
    fireEvent.click(screen.getByRole('button', { name: 'Vẫn học tiếp được, chỉ bớt một chút sao' }));
    fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục →' }));
    fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục →' }));
    expect(await screen.findByText('+30 XP')).toBeInTheDocument();
    expect(screen.getByLabelText('3 trên 3 sao')).toBeInTheDocument();
    expect((await db.progress.get('basics.welcome'))?.stars).toBe(3);
    expect((await db.profile.get('me'))?.xp).toBe(30);
  });

  it('shows a friendly message for unknown lessons', () => {
    renderWithProfile(<LessonPage id="khong-co" />);
    expect(screen.getByText(/Không tìm thấy bài học/)).toBeInTheDocument();
  });
});
```

- [ ] **Step 6: Chạy test, xác nhận PASS**

Run: `npm test -w client && npm run typecheck -w client`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add client
git commit -m "feat(player): lesson player with quiz, practice grading, 3-level hints and finish screen" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 15: Khung app, màn hình chào (chọn HĐH) và bản đồ lộ trình

**Files:**
- Create: `client/src/app/AppShell.tsx`, `client/src/pages/WelcomePage.tsx`, `client/src/pages/HomePage.tsx`, `client/src/home/TrackMap.tsx`, `client/src/home/GoalRing.tsx`
- Modify: `client/src/App.tsx` (thay toàn bộ), `client/src/App.test.tsx` (thay toàn bộ)
- Test: `client/src/home/TrackMap.test.tsx`

**Interfaces:**
- Consumes: `ProfileProvider`, `useProfile`, `createProfile`, `guessOs` (Task 8); `useCompleted`, `useStreak`, `useTodayMinutes` (Task 8); `levelFromXp`, `unlockState`, `visibleLessons` (Task 7); `TRACKS`, `LESSONS` (Task 10); `HelpButton`, `HelpDrawer`, `HelpTooltipLayer` (Task 11–12); `LessonPage` (Task 14); `Mochi`, `SpeechBubble`, `Segmented` (Task 9).
- Produces:
  - Các route:
    - `/welcome`: chào mừng; nếu đã có hồ sơ thì chuyển về `/`.
    - `/`: trang chủ.
    - `/lesson/:id`: bài học.
    - `*`: chuyển về `/`.
    - Task 16 thêm `/settings`.
  - `RequireProfile`: khi hồ sơ còn `undefined` hiện màn hình chờ; khi `null` chuyển tới `/welcome`.
  - `<TrackMap tracks lessons os unlock stars currentId? />`:
    - Mỗi lộ trình là một `<section aria-label={title}>`.
    - Bài đã mở là link có nhãn `"<title>"` hoặc `"<title>, N sao"`; bài bị khoá là `<span aria-label="<title> (đang khoá)">`.
    - Lộ trình chưa có bài hiện "Mochi đang soạn bài…".
  - `<GoalRing minutes goal />`: vòng tiến độ SVG có `aria-label="Hôm nay: M/G phút"`.

- [ ] **Step 1: Viết test**

`client/src/home/TrackMap.test.tsx`:
```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { unlockState, type Lesson, type Track } from '@office-neko/shared';
import { TrackMap } from './TrackMap';

const L = (id: string, title: string): Lesson => ({ id, trackId: 'a', chapterId: 'a.c', title, minutes: 2, steps: [] });
const lessons = { a1: L('a1', 'Bài một'), a2: L('a2', 'Bài hai') };
const tracks: Track[] = [
  { id: 'a', order: 0, title: 'Lộ trình A', emoji: '🅰️', blurb: 'Mô tả A', color: '#FFB38A', chapters: [{ id: 'a.c', title: 'C', lessonIds: ['a1', 'a2'] }] },
  { id: 'b', order: 1, title: 'Lộ trình B', emoji: '🅱️', blurb: 'Mô tả B', color: '#A0D8FF', chapters: [] },
];

function renderMap(completed: string[], stars: Record<string, number>) {
  const unlock = unlockState(tracks, lessons, 'win', new Set(completed));
  return render(
    <MemoryRouter>
      <TrackMap tracks={tracks} lessons={lessons} os="win" unlock={unlock} stars={stars} currentId="a2" />
    </MemoryRouter>,
  );
}

describe('TrackMap', () => {
  it('locks lessons until the previous one is done', () => {
    renderMap([], {});
    expect(screen.getByRole('link', { name: 'Bài một' })).toHaveAttribute('href', '/lesson/a1');
    expect(screen.getByLabelText('Bài hai (đang khoá)')).toBeInTheDocument();
  });

  it('shows stars and unlocks the next lesson', () => {
    renderMap(['a1'], { a1: 2 });
    expect(screen.getByRole('link', { name: 'Bài một, 2 sao' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Bài hai' })).toBeInTheDocument();
  });

  it('marks tracks without lessons as in preparation', () => {
    renderMap([], {});
    const b = screen.getByRole('region', { name: 'Lộ trình B' });
    expect(b).toHaveTextContent('Mochi đang soạn bài');
  });
});
```

`client/src/App.test.tsx` (thay toàn bộ):
```tsx
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { db } from './db/db';
import { createProfile } from './db/profile';
import { resetDb } from './test/utils';

const renderApp = (route = '/') => render(<MemoryRouter initialEntries={[route]}><App /></MemoryRouter>);

describe('App', () => {
  beforeEach(resetDb);

  it('onboards a new learner and lands on the map', async () => {
    renderApp();
    fireEvent.click(await screen.findByRole('button', { name: 'Bắt đầu nào!' }));
    fireEvent.change(screen.getByLabelText('Tên của bạn'), { target: { value: 'An' } });
    fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục' }));
    fireEvent.click(screen.getByRole('radio', { name: /Mac/ }));
    fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục' }));
    fireEvent.click(screen.getByRole('radio', { name: /10 phút/ }));
    fireEvent.click(screen.getByRole('button', { name: 'Vào học thôi! 🎉' }));
    expect(await screen.findByRole('heading', { name: /Chào An/ })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Làm quen máy tính' })).toBeInTheDocument();
    expect(await db.profile.get('me')).toMatchObject({ name: 'An', os: 'mac', dailyGoalMin: 10 });
  });

  it('skips onboarding when a profile exists', async () => {
    await createProfile({ name: 'Bình', os: 'win', dailyGoalMin: 5 });
    renderApp('/welcome');
    expect(await screen.findByRole('heading', { name: /Chào Bình/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Học tiếp ▶' })).toHaveAttribute('href', '/lesson/basics.welcome');
    expect(screen.getByRole('button', { name: 'Trợ giúp' })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Chạy test, xác nhận FAIL**

Run: `npm test -w client -- TrackMap App`
Expected: FAIL – thiếu module.

- [ ] **Step 3: Viết TrackMap và GoalRing**

`client/src/home/TrackMap.tsx`:
```tsx
import { Link } from 'react-router-dom';
import { visibleLessons, type Lesson, type OS, type Track } from '@office-neko/shared';
import { Mochi } from '../components/Mochi';

interface Props {
  tracks: Track[];
  lessons: Record<string, Lesson>;
  os: OS;
  unlock: { trackUnlocked: Set<string>; lessonUnlocked: Set<string> };
  stars: Record<string, number>;
  currentId?: string;
}

export function TrackMap({ tracks, lessons, os, unlock, stars, currentId }: Props) {
  return (
    <div className="space-y-6">
      {[...tracks].sort((a, b) => a.order - b.order).map((t) => {
        const ls = visibleLessons(t, lessons, os);
        const open = unlock.trackUnlocked.has(t.id);
        return (
          <section key={t.id} aria-label={t.title} className="card p-5" style={{ borderTop: `6px solid ${t.color}` }}>
            <h2 className="text-xl font-extrabold">{t.emoji} {t.order}. {t.title}</h2>
            <p className="text-muted">{t.blurb}</p>
            {ls.length === 0 ? (
              <p className="mt-3 rounded-2xl bg-cream p-3 text-muted">📝 Mochi đang soạn bài cho phần này, bạn chờ chút nhé!</p>
            ) : !open ? (
              <p className="mt-3 text-muted">🔒 Hoàn thành phần trước để mở khoá.</p>
            ) : null}
            {ls.length > 0 && (
              <ol className="mt-6 flex flex-wrap gap-x-6 gap-y-10">
                {ls.map((l, i) => {
                  const unlocked = unlock.lessonUnlocked.has(l.id);
                  const s = stars[l.id] ?? 0;
                  return (
                    <li key={l.id} className={`flex w-24 flex-col items-center text-center ${i % 2 ? 'translate-y-4' : ''}`}>
                      {unlocked ? (
                        <Link
                          to={`/lesson/${l.id}`}
                          aria-label={s ? `${l.title}, ${s} sao` : l.title}
                          className="relative grid h-16 w-16 place-items-center rounded-full text-2xl font-extrabold text-white shadow-md transition hover:scale-105"
                          style={{ background: t.color }}
                        >
                          {i + 1}
                          {l.id === currentId && (
                            <span className="absolute -top-10"><Mochi size={34} mood="happy" /></span>
                          )}
                        </Link>
                      ) : (
                        <span aria-label={`${l.title} (đang khoá)`} className="grid h-16 w-16 place-items-center rounded-full bg-muted/20 text-2xl">🔒</span>
                      )}
                      <span aria-hidden className="mt-1 text-xs text-butter">{'★'.repeat(s)}<span className="text-muted/40">{'★'.repeat(3 - s)}</span></span>
                      <span className="text-sm font-semibold leading-tight">{l.title}</span>
                    </li>
                  );
                })}
              </ol>
            )}
          </section>
        );
      })}
    </div>
  );
}
```

`client/src/home/GoalRing.tsx`:
```tsx
export function GoalRing({ minutes, goal }: { minutes: number; goal: number }) {
  const r = 30;
  const c = 2 * Math.PI * r;
  const ratio = Math.min(1, goal > 0 ? minutes / goal : 0);
  return (
    <svg role="img" aria-label={`Hôm nay: ${minutes}/${goal} phút`} viewBox="0 0 80 80" width={88} height={88}>
      <circle cx="40" cy="40" r={r} fill="none" stroke="#FFE3D3" strokeWidth="8" />
      <circle
        cx="40" cy="40" r={r} fill="none" stroke="#FF7A9A" strokeWidth="8" strokeLinecap="round"
        strokeDasharray={c} strokeDashoffset={c * (1 - ratio)} transform="rotate(-90 40 40)"
      />
      <text x="40" y="38" textAnchor="middle" fontSize="14" fontWeight="800" fill="#3B2E4A">{minutes}/{goal}</text>
      <text x="40" y="54" textAnchor="middle" fontSize="10" fill="#7D7090">phút</text>
    </svg>
  );
}
```

- [ ] **Step 4: Viết WelcomePage**

`client/src/pages/WelcomePage.tsx`:
```tsx
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import type { OS } from '@office-neko/shared';
import { createProfile, guessOs, useProfile } from '../db/profile';
import { Mochi } from '../components/Mochi';
import { SpeechBubble } from '../components/SpeechBubble';

type Goal = 5 | 10 | 20;

const OS_CHOICES: { value: OS; title: string; desc: string }[] = [
  { value: 'win', title: '🪟 Windows', desc: 'Có nút Start hình ô cửa sổ ở góc dưới màn hình.' },
  { value: 'mac', title: '🍎 Mac (macOS)', desc: 'Máy của Apple, có thanh Dock chứa biểu tượng ở cạnh dưới.' },
];
const GOALS: { value: Goal; title: string; desc: string }[] = [
  { value: 5, title: '5 phút', desc: 'Nhẹ nhàng' },
  { value: 10, title: '10 phút', desc: 'Vừa phải' },
  { value: 20, title: '20 phút', desc: 'Chăm chỉ' },
];

export function WelcomePage() {
  const profile = useProfile();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [guessed] = useState<OS>(guessOs);
  const [os, setOs] = useState<OS>(guessed);
  const [goal, setGoal] = useState<Goal>(10);

  if (profile) return <Navigate to="/" replace />;

  const finish = async () => {
    await createProfile({ name, os, dailyGoalMin: goal });
    navigate('/', { replace: true });
  };

  const card = (selected: boolean) =>
    `card w-full p-4 text-left transition ${selected ? 'ring-4 ring-rose' : 'hover:ring-2 hover:ring-peach'}`;

  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center gap-6 p-6">
      <Mochi mood={step === 0 ? 'happy' : 'neutral'} size={step === 0 ? 180 : 120} />
      {step === 0 && (
        <>
          <SpeechBubble tail="bottom">
            <p className="text-lg">
              Xin chào! Mình là <strong>Mochi</strong> 🐱. Mình sẽ giúp bạn làm quen với máy tính, từ cầm chuột, gõ phím đến dùng
              Word, Excel, PowerPoint và nhờ AI giúp việc.
            </p>
          </SpeechBubble>
          <button type="button" className="btn-primary text-lg" onClick={() => setStep(1)}>Bắt đầu nào!</button>
        </>
      )}
      {step === 1 && (
        <div className="w-full space-y-4">
          <h1 className="text-2xl font-extrabold">Bạn tên là gì?</h1>
          <input
            aria-label="Tên của bạn"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            maxLength={40}
            className="w-full rounded-full border-2 border-peach/60 bg-white px-5 py-3 text-lg outline-none focus:border-rose"
          />
          <div className="flex gap-3">
            <button type="button" className="btn" onClick={() => setStep(0)}>← Quay lại</button>
            <button type="button" className="btn-primary" disabled={!name.trim()} onClick={() => setStep(2)}>Tiếp tục</button>
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="w-full space-y-4">
          <h1 className="text-2xl font-extrabold">Máy tính của bạn là loại nào?</h1>
          <div role="radiogroup" aria-label="Hệ điều hành" className="grid gap-3 sm:grid-cols-2">
            {OS_CHOICES.map((o) => (
              <button key={o.value} type="button" role="radio" aria-checked={os === o.value} onClick={() => setOs(o.value)} className={card(os === o.value)}>
                <span className="block text-xl font-extrabold">{o.title}</span>
                <span className="block text-muted">{o.desc}</span>
                {guessed === o.value && <span className="mt-1 block text-sm text-rose">Mochi đoán máy bạn là loại này</span>}
              </button>
            ))}
          </div>
          <p className="text-sm text-muted">Không chắc? Cứ chọn theo Mochi đoán, sau này đổi lại được trong Cài đặt.</p>
          <div className="flex gap-3">
            <button type="button" className="btn" onClick={() => setStep(1)}>← Quay lại</button>
            <button type="button" className="btn-primary" onClick={() => setStep(3)}>Tiếp tục</button>
          </div>
        </div>
      )}
      {step === 3 && (
        <div className="w-full space-y-4">
          <h1 className="text-2xl font-extrabold">Mỗi ngày bạn muốn học bao lâu?</h1>
          <div role="radiogroup" aria-label="Mục tiêu mỗi ngày" className="grid gap-3 sm:grid-cols-3">
            {GOALS.map((g) => (
              <button key={g.value} type="button" role="radio" aria-checked={goal === g.value} onClick={() => setGoal(g.value)} className={card(goal === g.value)}>
                <span className="block text-xl font-extrabold">{g.title}</span>
                <span className="block text-muted">{g.desc}</span>
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <button type="button" className="btn" onClick={() => setStep(2)}>← Quay lại</button>
            <button type="button" className="btn-primary" onClick={finish}>Vào học thôi! 🎉</button>
          </div>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 5: Viết HomePage, AppShell, App**

`client/src/pages/HomePage.tsx`:
```tsx
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { unlockState, visibleLessons } from '@office-neko/shared';
import { LESSONS, TRACKS } from '../content';
import { useProfile } from '../db/profile';
import { useCompleted, useStreak, useTodayMinutes } from '../progress/useStats';
import { Mochi } from '../components/Mochi';
import { TrackMap } from '../home/TrackMap';
import { GoalRing } from '../home/GoalRing';

export function HomePage() {
  const profile = useProfile()!;
  const { completed, stars } = useCompleted();
  const today = useTodayMinutes();
  const streak = useStreak();
  const doneKey = [...completed].sort().join('|');
  const unlock = useMemo(
    () => unlockState(TRACKS, LESSONS, profile.os, completed),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [profile.os, doneKey],
  );
  const next = [...TRACKS]
    .sort((a, b) => a.order - b.order)
    .flatMap((t) => visibleLessons(t, LESSONS, profile.os))
    .find((l) => unlock.lessonUnlocked.has(l.id) && !completed.has(l.id));

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-4 pb-24">
      <section className="card flex flex-wrap items-center gap-4 p-5">
        <Mochi mood="happy" size={110} />
        <div className="min-w-48 flex-1">
          <h1 className="text-2xl font-extrabold">Chào {profile.name}! 👋</h1>
          <p className="text-muted">
            {next ? `Bài tiếp theo: ${next.title}` : 'Bạn đã học hết các bài hiện có. Mochi đang soạn thêm bài mới!'}
          </p>
          {next && <Link to={`/lesson/${next.id}`} className="btn-primary mt-3">Học tiếp ▶</Link>}
        </div>
        <GoalRing minutes={today} goal={profile.dailyGoalMin} />
        <div className="text-center">
          <div className="text-3xl">🔥</div>
          <div className="font-extrabold">{streak} ngày</div>
        </div>
      </section>
      <TrackMap tracks={TRACKS} lessons={LESSONS} os={profile.os} unlock={unlock} stars={stars} currentId={next?.id} />
    </div>
  );
}
```

`client/src/app/AppShell.tsx`:
```tsx
import { Link, Outlet } from 'react-router-dom';
import { levelFromXp } from '@office-neko/shared';
import { useProfile } from '../db/profile';
import { useStreak } from '../progress/useStats';
import { Mochi } from '../components/Mochi';
import { HelpButton } from '../help/HelpButton';
import { HelpDrawer } from '../help/HelpDrawer';
import { HelpTooltipLayer } from '../help/HelpTooltipLayer';

export function AppShell() {
  const profile = useProfile()!;
  const streak = useStreak();
  const lvl = levelFromXp(profile.xp);
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-peach/30 bg-cream/90 px-4 py-2 backdrop-blur">
        <Link to="/" className="flex items-center gap-2 font-extrabold">
          <Mochi size={34} mood="happy" animated={false} /> Tin Học Cùng Mochi
        </Link>
        <div className="ml-auto flex items-center gap-2 text-sm font-bold">
          <span title="Chuỗi ngày học" className="rounded-full bg-butter/60 px-3 py-1">🔥 {streak}</span>
          <span title={`Còn ${lvl.need - lvl.into} XP nữa lên cấp`} className="rounded-full bg-lavender/40 px-3 py-1">
            Cấp {lvl.level} · {profile.xp} XP
          </span>
          <Link to="/settings" data-help-id="app.settings" aria-label="Cài đặt" className="rounded-full bg-white px-3 py-1 shadow">⚙️</Link>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <HelpButton />
      <HelpDrawer />
      <HelpTooltipLayer />
    </div>
  );
}
```

`client/src/App.tsx` (thay toàn bộ):
```tsx
import type { ReactNode } from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import { ProfileProvider, useProfile } from './db/profile';
import { AppShell } from './app/AppShell';
import { WelcomePage } from './pages/WelcomePage';
import { HomePage } from './pages/HomePage';
import { LessonPage } from './pages/LessonPage';
import { Mochi } from './components/Mochi';

function RequireProfile({ children }: { children: ReactNode }) {
  const profile = useProfile();
  if (profile === undefined) {
    return (
      <div className="grid min-h-screen place-items-center">
        <Mochi mood="sleepy" size={120} />
      </div>
    );
  }
  if (profile === null) return <Navigate to="/welcome" replace />;
  return <>{children}</>;
}

function LessonRoute() {
  const { id = '' } = useParams();
  return <LessonPage key={id} id={id} />;
}

export default function App() {
  return (
    <ProfileProvider>
      <Routes>
        <Route path="/welcome" element={<WelcomePage />} />
        <Route element={<RequireProfile><AppShell /></RequireProfile>}>
          <Route index element={<HomePage />} />
          <Route path="/lesson/:id" element={<LessonRoute />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ProfileProvider>
  );
}
```

Lưu ý:
- Trong test onboarding, `/welcome` có thể render trước khi hồ sơ tải xong (khi đó `profile` là `undefined`). Lúc này `WelcomePage` vẫn hiển thị bước 0, đúng như mong muốn.
- Khi hồ sơ đã có, `<Navigate to="/" />` sẽ chuyển trang.

- [ ] **Step 6: Chạy test, xác nhận PASS**

Run: `npm test -w client && npm run typecheck -w client`
Expected: PASS.

- [ ] **Step 7: Kiểm tra bằng trình duyệt**

Dùng preview với cấu hình `office-neko` (cổng 5174):
1. Làm hết màn hình chào, chọn Mac.
2. Trên bản đồ thấy lộ trình 0 có bài "Làm quen với Mochi"; các lộ trình khác hiện "đang soạn".
3. Học xong bài, thấy màn hình hoàn thành và XP trên thanh đầu trang tăng lên.
4. Rê chuột vào nút "?" thấy tooltip; nhấn F1 thì mở Từ điển.

- [ ] **Step 8: Commit**

```bash
git add client
git commit -m "feat(app): app shell, onboarding with OS choice and learning map" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 16: Trang Cài đặt (HĐH, cỡ chữ, âm thanh, sao lưu, nguồn)

**Files:**
- Create: `client/src/pages/SettingsPage.tsx`
- Modify: `client/src/App.tsx` (thêm route `/settings`)
- Test: `client/src/pages/SettingsPage.test.tsx`

**Interfaces:**
- Consumes: `useProfile`, `updateProfile` (Task 8); `exportBackup`, `backupFileName`, `downloadJson`, `parseBackup`, `importBackup`, `readFileText` (Task 8); `Segmented`, `Toggle` (Task 9).
- Produces: `<SettingsPage />` tại `/settings`, gồm các nhóm:
  - **Hồ sơ:** tên, lưu khi rời ô nhập.
  - **Hệ điều hành:** chọn Windows/Mac.
  - **Mục tiêu mỗi ngày:** 5/10/20 phút.
  - **Hiển thị:** cỡ chữ Vừa/Lớn/Rất lớn; bật/tắt âm thanh; bật/tắt giảm chuyển động.
  - **Sao lưu:**
    - Nút "Tải file sao lưu".
    - Ô chọn file có nhãn "Khôi phục từ file". Sau khi chọn file, hiện hộp xác nhận `role="alertdialog"` có nút "Khôi phục" và "Huỷ". File lỗi thì hiện thông báo `role="alert"`.
  - **Giới thiệu & nguồn:** danh sách thư viện kèm giấy phép.

- [ ] **Step 1: Viết test**

`client/src/pages/SettingsPage.test.tsx`:
```tsx
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { db } from '../db/db';
import { ProfileProvider, createProfile } from '../db/profile';
import { exportBackup } from '../progress/backup';
import { SettingsPage } from './SettingsPage';
import { resetDb } from '../test/utils';

vi.mock('../progress/backup', async (importOriginal) => {
  const mod = await importOriginal<typeof import('../progress/backup')>();
  return { ...mod, downloadJson: vi.fn() };
});

const renderPage = () =>
  render(
    <MemoryRouter>
      <ProfileProvider><SettingsPage /></ProfileProvider>
    </MemoryRouter>,
  );

describe('SettingsPage', () => {
  beforeEach(async () => {
    await resetDb();
    await createProfile({ name: 'An', os: 'win', dailyGoalMin: 10 });
  });

  it('changes OS, font size and sound', async () => {
    renderPage();
    fireEvent.click(await screen.findByRole('radio', { name: 'Mac' }));
    fireEvent.click(screen.getByRole('radio', { name: 'Rất lớn' }));
    fireEvent.click(screen.getByRole('switch', { name: 'Âm thanh' }));
    await waitFor(async () => expect(await db.profile.get('me')).toMatchObject({ os: 'mac', fontScale: 'xl', sound: false }));
    await waitFor(() => expect(document.documentElement.dataset.font).toBe('xl'));
  });

  it('renames on blur', async () => {
    renderPage();
    const input = await screen.findByLabelText('Tên của bạn');
    fireEvent.change(input, { target: { value: 'Chi' } });
    fireEvent.blur(input);
    await waitFor(async () => expect((await db.profile.get('me'))?.name).toBe('Chi'));
  });

  it('downloads a backup file', async () => {
    const backup = await import('../progress/backup');
    renderPage();
    fireEvent.click(await screen.findByRole('button', { name: 'Tải file sao lưu' }));
    await waitFor(() => expect(backup.downloadJson).toHaveBeenCalled());
    const [name, data] = vi.mocked(backup.downloadJson).mock.calls[0]!;
    expect(name).toMatch(/^tinhoc-mochi-backup-\d{8}\.json$/);
    expect((data as { app: string }).app).toBe('office-neko');
  });

  it('shows an error for an invalid backup file', async () => {
    renderPage();
    const input = await screen.findByLabelText('Khôi phục từ file');
    fireEvent.change(input, { target: { files: [new File(['không phải json'], 'x.json', { type: 'application/json' })] } });
    expect(await screen.findByRole('alert')).toHaveTextContent('không đọc được');
  });

  it('restores a valid backup after confirmation', async () => {
    await db.profile.update('me', { name: 'Dũng' });
    const text = JSON.stringify(await exportBackup());
    await db.profile.update('me', { name: 'An' });
    renderPage();
    const input = await screen.findByLabelText('Khôi phục từ file');
    fireEvent.change(input, { target: { files: [new File([text], 'b.json', { type: 'application/json' })] } });
    fireEvent.click(await screen.findByRole('button', { name: 'Khôi phục' }));
    expect(await screen.findByText(/Đã khôi phục/)).toBeInTheDocument();
    expect((await db.profile.get('me'))?.name).toBe('Dũng');
  });
});
```

- [ ] **Step 2: Chạy test, xác nhận FAIL**

Run: `npm test -w client -- SettingsPage`
Expected: FAIL – thiếu `./SettingsPage`.

- [ ] **Step 3: Viết SettingsPage**

`client/src/pages/SettingsPage.tsx`:
```tsx
import { useEffect, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { OS } from '@office-neko/shared';
import { updateProfile, useProfile } from '../db/profile';
import type { Profile } from '../db/db';
import {
  backupFileName, downloadJson, exportBackup, importBackup, parseBackup, readFileText, type BackupFile,
} from '../progress/backup';
import { Segmented } from '../components/Segmented';
import { Toggle } from '../components/Toggle';

const LICENSES: [string, string][] = [
  ['React, React Router, Zustand', 'MIT'],
  ['Dexie.js', 'Apache-2.0'],
  ['Tailwind CSS', 'MIT'],
  ['vite-plugin-pwa / Workbox', 'MIT'],
  ['Phông chữ Nunito', 'SIL Open Font License 1.1'],
];

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="card space-y-3 p-5">
      <h2 className="text-lg font-extrabold">{title}</h2>
      {children}
    </section>
  );
}

export function SettingsPage() {
  const profile = useProfile();
  const [name, setName] = useState('');
  const [pending, setPending] = useState<BackupFile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (profile) setName(profile.name);
  }, [profile?.name]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!profile) return null;

  const onFile = async (file: File | undefined) => {
    setError(null);
    setMessage(null);
    if (!file) return;
    try {
      setPending(parseBackup(await readFileText(file)));
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  };

  const confirmImport = async () => {
    if (!pending) return;
    await importBackup(pending);
    setPending(null);
    setMessage('Đã khôi phục dữ liệu từ file sao lưu. 🎉');
  };

  return (
    <div className="mx-auto max-w-2xl space-y-5 p-4 pb-24">
      <div className="flex items-center gap-3">
        <Link to="/" className="btn">← Về bản đồ</Link>
        <h1 className="text-2xl font-extrabold">Cài đặt</h1>
      </div>

      <Section title="Hồ sơ">
        <label className="block space-y-1">
          <span className="font-semibold">Tên của bạn</span>
          <input
            value={name}
            maxLength={40}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => name.trim() && name.trim() !== profile.name && updateProfile({ name: name.trim() })}
            className="w-full rounded-full border-2 border-peach/60 bg-white px-4 py-2 outline-none focus:border-rose"
          />
        </label>
      </Section>

      <Section title="Hệ điều hành">
        <p className="text-muted">Phím tắt và bài "Làm quen máy tính" sẽ hiển thị theo máy bạn dùng.</p>
        <Segmented<OS> label="Hệ điều hành" value={profile.os} onChange={(os) => updateProfile({ os })}
          options={[{ value: 'win', label: 'Windows' }, { value: 'mac', label: 'Mac' }]} />
      </Section>

      <Section title="Mục tiêu mỗi ngày">
        <Segmented<'5' | '10' | '20'> label="Mục tiêu mỗi ngày" value={String(profile.dailyGoalMin) as '5' | '10' | '20'}
          onChange={(v) => updateProfile({ dailyGoalMin: Number(v) as Profile['dailyGoalMin'] })}
          options={[{ value: '5', label: '5 phút' }, { value: '10', label: '10 phút' }, { value: '20', label: '20 phút' }]} />
      </Section>

      <Section title="Hiển thị">
        <div className="space-y-1">
          <span className="font-semibold">Cỡ chữ</span>
          <div>
            <Segmented<Profile['fontScale']> label="Cỡ chữ" value={profile.fontScale} onChange={(fontScale) => updateProfile({ fontScale })}
              options={[{ value: 'md', label: 'Vừa' }, { value: 'lg', label: 'Lớn' }, { value: 'xl', label: 'Rất lớn' }]} />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-semibold">Âm thanh</span>
          <Toggle label="Âm thanh" checked={profile.sound} onChange={(sound) => updateProfile({ sound })} />
        </div>
        <div className="flex items-center justify-between">
          <span className="font-semibold">Giảm chuyển động</span>
          <Toggle label="Giảm chuyển động" checked={profile.reducedMotion} onChange={(reducedMotion) => updateProfile({ reducedMotion })} />
        </div>
      </Section>

      <Section title="Sao lưu tiến độ">
        <p className="text-muted">Tiến độ nằm trong trình duyệt của máy này. Hãy tải file sao lưu để giữ an toàn hoặc chuyển sang máy khác.</p>
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" className="btn-mint" onClick={async () => downloadJson(backupFileName(), await exportBackup())}>
            Tải file sao lưu
          </button>
          <label className="btn-soft cursor-pointer">
            Khôi phục từ file
            <input
              type="file"
              accept="application/json,.json"
              aria-label="Khôi phục từ file"
              className="sr-only"
              onChange={(e) => {
                void onFile(e.target.files?.[0]);
                e.target.value = '';
              }}
            />
          </label>
        </div>
        {error && <p role="alert" className="font-semibold text-rose">{error}</p>}
        {message && <p className="font-semibold text-excel">{message}</p>}
        {pending && (
          <div role="alertdialog" aria-label="Xác nhận khôi phục" className="space-y-3 rounded-2xl bg-butter/40 p-4">
            <p>Dữ liệu hiện tại sẽ được <strong>thay thế</strong> bằng dữ liệu trong file (lưu ngày {pending.exportedAt.slice(0, 10)}). Tiếp tục?</p>
            <div className="flex gap-3">
              <button type="button" className="btn-primary" onClick={confirmImport}>Khôi phục</button>
              <button type="button" className="btn" onClick={() => setPending(null)}>Huỷ</button>
            </div>
          </div>
        )}
      </Section>

      <Section title="Giới thiệu & nguồn">
        <p>Nội dung bài học do dự án tự biên soạn. Ứng dụng dùng các thư viện mã nguồn mở:</p>
        <ul className="list-disc pl-6">
          {LICENSES.map(([lib, lic]) => (
            <li key={lib}>{lib} — {lic}</li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
```

Lưu ý:
- Trong test, `downloadJson` được mock bằng `vi.mock`; vì `SettingsPage` import từ `'../progress/backup'` nên nhận bản mock.
- `e.target.value = ''` đặt sau khi đã lấy file, để lần sau chọn lại cùng một file vẫn kích hoạt sự kiện `change`.

- [ ] **Step 4: Thêm route**

Trong `client/src/App.tsx`, thêm import `import { SettingsPage } from './pages/SettingsPage';` và thêm vào trong route `AppShell`:
```tsx
<Route path="/settings" element={<SettingsPage />} />
```

- [ ] **Step 5: Chạy test, xác nhận PASS**

Run: `npm test -w client && npm run typecheck -w client`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add client
git commit -m "feat(settings): OS, goal, display options, backup export/import and licenses" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 17: PWA offline, biểu tượng app, README và kiểm tra tổng thể

**Files:**
- Create: `client/scripts/icons.mjs`, `client/src/pwa.ts`, `README.md`
- Modify: `client/vite.config.ts`, `client/tsconfig.json`, `client/src/main.tsx`, `client/index.html`
- Generated: `client/public/icons/icon-192.png`, `icon-512.png`, `icon-maskable-512.png`

**Interfaces:**
- Consumes: toàn bộ app.
- Produces:
  - `npm run icons` tạo biểu tượng dấu chân mèo màu trắng trên nền mint→sky.
  - `npm run build` tạo `client/dist` kèm service worker precache (chạy offline).
  - `setupPwa(): Promise<void>`.

- [ ] **Step 1: Viết trình tạo icon**

`client/scripts/icons.mjs`:
```js
// Tạo icon PWA (PNG) không cần thư viện native: dấu chân mèo trắng trên nền mint → sky.
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'public', 'icons');
fs.mkdirSync(out, { recursive: true });

const crcTable = new Int32Array(256).map((_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c;
});
const crc32 = (buf) => {
  let c = -1;
  for (const b of buf) c = crcTable[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
};
const chunk = (type, data) => {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(td));
  return Buffer.concat([len, td, crc]);
};

function png(size, draw) {
  const raw = Buffer.alloc((size * 4 + 1) * size);
  for (let y = 0; y < size; y++) {
    raw[y * (size * 4 + 1)] = 0;
    for (let x = 0; x < size; x++) {
      const [r, g, b, a] = draw(x, y);
      const i = y * (size * 4 + 1) + 1 + x * 4;
      raw[i] = r; raw[i + 1] = g; raw[i + 2] = b; raw[i + 3] = a;
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; ihdr[9] = 6; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw)),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

const TOP = [143, 227, 207];
const BOTTOM = [160, 216, 255];
const WHITE = [255, 255, 255];
// [dx, dy, r] tương đối với kích thước; phần tử đầu là đệm chân lớn (hình elip).
const PADS = [[0, 0.12, 0.2], [-0.24, -0.1, 0.085], [-0.085, -0.22, 0.085], [0.085, -0.22, 0.085], [0.24, -0.1, 0.085]];

function draw(size, { shape = 'rounded', scale = 1 } = {}) {
  const c = size / 2;
  const radius = size * 0.22;
  const s = size * scale;
  return (x, y) => {
    if (shape === 'rounded') {
      const dx = Math.max(Math.abs(x - c) - (c - radius), 0);
      const dy = Math.max(Math.abs(y - c) - (c - radius), 0);
      if (Math.hypot(dx, dy) > radius) return [0, 0, 0, 0];
    }
    for (const [i, [px, py, r]] of PADS.entries()) {
      const cx = c + px * s;
      const cy = c + py * s;
      const rr = r * s;
      const inside = i === 0 ? ((x - cx) / (rr * 1.2)) ** 2 + ((y - cy) / rr) ** 2 <= 1 : Math.hypot(x - cx, y - cy) <= rr;
      if (inside) return [...WHITE, 255];
    }
    const t = y / size;
    return [0, 1, 2].map((k) => Math.round(TOP[k] * (1 - t) + BOTTOM[k] * t)).concat(255);
  };
}

for (const size of [192, 512]) {
  fs.writeFileSync(path.join(out, `icon-${size}.png`), png(size, draw(size)));
  console.log('wrote', `icon-${size}.png`);
}
fs.writeFileSync(path.join(out, 'icon-maskable-512.png'), png(512, draw(512, { shape: 'square', scale: 0.8 })));
console.log('wrote icon-maskable-512.png');
```

Run: `npm run icons`
Expected: in ra 3 dòng `wrote ...`; có 3 file PNG trong `client/public/icons/`.

- [ ] **Step 2: Cấu hình PWA**

`client/vite.config.ts` (thay toàn bộ):
```ts
/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: null,
      includeAssets: ['icons/*.png'],
      manifest: {
        name: 'Tin Học Cùng Mochi',
        short_name: 'Tin Học Mochi',
        description: 'Học tin học văn phòng từ con số 0 cùng mèo Mochi: chuột, bàn phím, Word, Excel, PowerPoint và AI.',
        lang: 'vi',
        theme_color: '#8FE3CF',
        background_color: '#FFF9F2',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,woff2,json}'],
      },
    }),
  ],
  server: { port: 5174 },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
});
```

Trong `client/tsconfig.json`, đổi `types` thành:
```json
"types": ["vitest/globals", "@testing-library/jest-dom", "vite-plugin-pwa/client"]
```

`client/src/pwa.ts`:
```ts
/** Đăng ký service worker để app chạy offline và tự cập nhật. */
export async function setupPwa(): Promise<void> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator) || import.meta.env.DEV) return;
  try {
    const { registerSW } = await import('virtual:pwa-register');
    registerSW({ immediate: true });
  } catch {
    /* offline là tuỳ chọn */
  }
}
```

Trong `client/src/main.tsx`, thêm sau các import:
```tsx
import { setupPwa } from './pwa';

void setupPwa();
```

Trong `client/index.html`, thêm vào `<head>`:
```html
<link rel="icon" type="image/png" href="/icons/icon-192.png" />
<link rel="apple-touch-icon" href="/icons/icon-192.png" />
```

- [ ] **Step 3: README**

`README.md`:
````markdown
# Tin Học Cùng Mochi (office-neko)

Ứng dụng web (PWA, chạy offline) dạy tin học văn phòng cho người mới: làm quen máy tính (Windows/Mac),
gõ 10 ngón + Telex/VNI, Word, Excel, PowerPoint và dùng AI. Mascot: mèo Mochi.

## Chạy

```bash
npm install
npm run dev        # http://localhost:5174
npm test           # test shared + client
npm run typecheck
npm run build      # client/dist, cài được như app
npm run preview    # http://localhost:4174
```

Thiết kế: `docs/superpowers/specs/2026-09-19-office-neko-design.md`
Kế hoạch: `docs/superpowers/plans/`
````

- [ ] **Step 4: Kiểm tra toàn bộ**

Run: `npm test && npm run typecheck && npm run build`
Expected:
- Mọi test PASS; typecheck không lỗi.
- Build tạo `client/dist/sw.js` và `client/dist/manifest.webmanifest`.

- [ ] **Step 5: Kiểm tra trên trình duyệt**

Mở preview `office-neko` (cổng 5174) và làm lần lượt:
1. Xoá dữ liệu site nếu có, đi hết màn hình chào, chọn **Mac**.
2. Mở bài "Làm quen với Mochi", bấm vào thuật ngữ "chuột" để xem popup, bấm "Xem thêm" thì Từ điển mở ra.
3. Học hết bài: có pháo giấy, 3 sao, +30 XP; thanh đầu trang hiện "Cấp 1 · 30 XP" và 🔥 1.
4. Vào **Cài đặt** chọn cỡ chữ "Rất lớn" thì chữ to lên; chọn lại Windows. Tải file sao lưu rồi khôi phục lại từ chính file đó.
5. Nhấn F1 → gõ "thung rac" → thấy "Recycle Bin" (Windows). Mở tab Hỏi Mèo, hỏi "lỡ tay xoá" → thấy câu trả lời có phím Ctrl + Z.
6. Kiểm tra console không có lỗi. Chụp màn hình bản đồ và màn hình hoàn thành bài để làm bằng chứng.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: PWA offline support, app icons and README" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Kết thúc giai đoạn 1

Sau Task 17, app đã có đủ:
- Màn hình chào chọn HĐH, bản đồ lộ trình, bài học mẫu đầy đủ luồng, chấm sao/XP/streak.
- Hệ thống Trợ giúp 4 lớp: Từ điển, chú thích tại chỗ, gợi ý 3 bậc + Spotlight, Hỏi Mèo.
- Cài đặt, sao lưu, chạy offline.

Giai đoạn 2 (lộ trình 0 + 1) sẽ đăng ký các trình mô phỏng `mouse`, `desktop`, `keyboard` vào `SIMS` và `GRADERS`, dùng `vfs`, `typing`, `ime` đã có sẵn, và thêm bài vào `TRACKS`/`LESSONS`. Test nội dung (Task 10) sẽ tự kiểm tra rằng mọi bài thực hành mới đều có lời giải qua được bộ chấm.

# Nihongo Sensei – Thiết kế phần mềm học tiếng Nhật toàn diện

Ngày: 2026-09-19
Trạng thái: đã duyệt hướng kiến trúc (monorepo client + server + data pipeline)

## 1. Mục tiêu

Xây dựng một ứng dụng web (PWA) học tiếng Nhật đầy đủ kỹ năng: kana, từ vựng, kanji,
ngữ pháp, đọc, nghe, nói, viết và tiếng Nhật business, phủ toàn bộ JLPT N5–N1, với giao
diện phong cách anime thân thiện và mascot Sakura. Người dùng có tài khoản, tiến độ
đồng bộ qua server nhưng vẫn học được khi mất mạng.

Ngôn ngữ giao diện: tiếng Việt. Nghĩa từ vựng/ngữ pháp lấy từ dataset mở là tiếng Anh;
nội dung tự biên soạn (business, bài đọc, bài nghe, hướng dẫn) là tiếng Việt + tiếng Nhật.

## 2. Ngoài phạm vi (YAGNI)

- Gia sư AI hội thoại tự do (không dùng LLM API).
- TTS/STT cloud. Chỉ dùng Web Speech API của trình duyệt.
- App mobile native, desktop native.
- Nghĩa tiếng Việt cho toàn bộ 8.000 từ (không có dataset mở).
- Thanh toán, mạng xã hội, bảng xếp hạng nhiều người.

## 3. Kiến trúc tổng thể

```
nihongo-sensei/
  package.json            # npm workspaces: shared, data, client, server
  shared/                 # kiểu dữ liệu + thuật toán dùng chung (TS thuần, có test)
    src/srs.ts            # SM-2
    src/kana.ts           # bảng kana, chuyển romaji<->kana, chuẩn hoá
    src/scoring.ts        # chấm phát âm (so khớp kana), chấm nét kanji
    src/types.ts          # Vocab, Kanji, Grammar, Sentence, Lesson, Progress...
  data/                   # pipeline build nội dung
    scripts/fetch.ts      # tải dataset mở về data/raw (cache, không commit)
    scripts/build.ts      # raw -> client/public/content/*.json
    authored/             # nội dung tự soạn (business, bài đọc, bài nghe, kana)
  client/                 # React 18 + Vite + TypeScript + Tailwind, PWA (vite-plugin-pwa)
  server/                 # Fastify + better-sqlite3 + JWT
  docs/superpowers/       # specs, plans
```

Luồng dữ liệu:

1. `data` build một lần → JSON tĩnh trong `client/public/content/` (chia theo cấp và
   loại để tải lười: `vocab/n5.json`, `kanji/n3.json`, `grammar/n1.json`,
   `sentences/n4.json`, `business/keigo.json`, `reading/n5.json`, `listening/n4.json`, `kana.json`).
2. Client tải bundle theo nhu cầu, cache bằng service worker (offline).
3. Tiến độ (SRS, XP, streak, nhật ký phiên) lưu IndexedDB (Dexie) trước, rồi đồng bộ
   với server khi đăng nhập và có mạng. Đồng bộ theo mốc `updatedAt`, bản ghi mới hơn
   thắng khi trùng (last-write-wins theo từng item).

## 4. Dữ liệu nội dung

### 4.1 Nguồn

| Nội dung | Nguồn | Giấy phép | Ghi chú |
|---|---|---|---|
| Từ vựng N5–N1 | github.com/elzup/jlpt-word-list `src/n1..n5.csv` | MIT (dữ liệu gốc Tanos CC BY) | expression, reading, meaning, tags |
| Kanji | github.com/davidluzgouveia/kanji-data `kanji.json` | MIT (từ KANJIDIC2 CC BY-SA) | jlpt_new, strokes, meanings, on/kun |
| Nét kanji | KanjiVG (release zip) | CC BY-SA 3.0 | SVG path từng nét, chỉ copy kanji có trong bộ |
| Ngữ pháp | hanabira.org `downloads/csv/hanabira_all_jlpt_grammar.csv` | CC (nội dung hanabira) | 828 điểm, meaning/formation/example |
| Câu ví dụ | Tatoeba `jpn_sentences.tsv.bz2` + `jpn-eng_links.tsv.bz2` + `eng_sentences.tsv.bz2` | CC BY 2.0 FR | lọc câu ≤ 40 ký tự |
| Business | `data/authored/business/*.json` | tự soạn | keigo, email, điện thoại, họp, 名刺, 面接 |
| Bài đọc / nghe | `data/authored/reading`, `listening` | tự soạn | 3–4 bài mỗi cấp, câu hỏi hiểu |
| Kana | `data/authored/kana.json` | tự soạn | 46 cơ bản + dakuten + yōon, mnemonics VI |

Tệp `ATTRIBUTION.md` ở gốc ghi rõ nguồn và giấy phép; hiển thị trong màn hình Cài đặt.

### 4.2 Định dạng bundle (shared/src/types.ts)

```ts
type Level = 'N5'|'N4'|'N3'|'N2'|'N1';
interface Vocab { id: string; level: Level; word: string; reading: string;
  meanings: string[]; tags: string[]; kanji: string[]; sentenceIds: string[] }
interface Kanji { id: string; char: string; level: Level; strokes: number;
  meanings: string[]; on: string[]; kun: string[]; grade?: number; freq?: number;
  strokePaths: string[]; vocabIds: string[] }
interface Grammar { id: string; level: Level; title: string; meaning: string;
  formation: string; examples: { ja: string; romaji: string; en: string }[] }
interface Sentence { id: string; level: Level; ja: string; en: string }
interface ReadingLesson { id: string; level: Level; title: string; body: string /* có [漢字|かんじ] furigana */;
  vocab: { word: string; reading: string; vi: string }[]; questions: Question[] }
interface ListeningLesson { id: string; level: Level; title: string; script: { speaker: string; ja: string; vi: string }[];
  questions: Question[]; dictation: string[] }
interface BusinessTopic { id: string; title: string; intro: string; items: BusinessItem[] }
interface BusinessItem { id: string; ja: string; reading: string; vi: string; note?: string;
  category: 'keigo'|'email'|'phone'|'meeting'|'meishi'|'interview'|'daily'; keigo?: { sonkei?: string; kenjou?: string; teinei?: string } }
interface Question { id: string; prompt: string; choices: string[]; answer: number; explain?: string }
```

Id ổn định: `v-n5-0001`, `k-一`, `g-n4-0012`, `s-123456` (Tatoeba id). Pipeline phải xác định
(deterministic) để chạy lại cho cùng kết quả.

### 4.3 Pipeline

- `npm run data:fetch` tải raw vào `data/raw/` (bỏ qua nếu đã có). Tatoeba giải nén bz2 bằng
  thư viện `unbzip2-stream`; KanjiVG lấy zip release, chỉ giải nén file `kanji/*.svg`.
- `npm run data:build` tạo bundle, in thống kê số lượng theo cấp, fail nếu cấp nào < ngưỡng
  tối thiểu (N5 vocab ≥ 600, kanji tổng ≥ 2000, grammar tổng ≥ 800).
- Câu ví dụ gán cho từ vựng: câu Tatoeba chứa `word` (hoặc `reading` nếu từ toàn kana),
  tối đa 3 câu mỗi từ, ưu tiên câu ngắn. Cấp của câu = cấp cao nhất trong các từ gán.
- Test: parser CSV/TSV, gán câu ví dụ, trích path nét KanjiVG, furigana parser.

## 5. Client

### 5.1 Công nghệ

React 18, Vite, TypeScript strict, Tailwind CSS, React Router, Zustand (state), Dexie
(IndexedDB), vite-plugin-pwa, Vitest + Testing Library. Không dùng UI kit ngoài; component tự
viết theo theme anime.

### 5.2 Điều hướng

```
/                 Trang chủ: mascot chào, streak, XP, ôn tập đến hạn, gợi ý bài học
/kana             Bảng hiragana/katakana, luyện nhận diện, luyện viết
/vocab            Chọn cấp → danh sách/ôn SRS/quiz
/kanji            Chọn cấp → lưới kanji → chi tiết (nét hoạt hình, từ chứa) → luyện viết
/grammar          Chọn cấp → danh sách → bài học → quiz
/reading          Chọn cấp → bài đọc (furigana, tra từ) → câu hỏi
/listening        Chọn cấp → bài nghe (TTS) → câu hỏi + dictation
/speaking         Shadowing câu mẫu, chấm phát âm; hội thoại đóng vai
/writing          Luyện viết kana/kanji; đặt câu theo mẫu ngữ pháp
/business         Chủ đề: keigo, email, điện thoại, họp, meishi, phỏng vấn
/review           Phiên ôn SRS tổng hợp (từ vựng + kanji + ngữ pháp)
/progress         Dashboard: biểu đồ theo tuần, số item theo trạng thái, lịch ôn
/settings         Tài khoản, giọng TTS, tốc độ, dark mode, xuất/nhập backup, ghi công nguồn
/login, /register
```

### 5.3 Module học – hành vi cốt lõi

- **SRS (SM-2)**: mỗi item có `ease, interval, due, reps, lapses`. Trả lời theo 4 mức
  (Quên/Khó/Tốt/Dễ). Phiên ôn giới hạn 20 item mới + tất cả item đến hạn. Thuật toán ở
  `shared/src/srs.ts`, thuần, có test chi tiết.
- **Từ vựng**: chế độ flashcard (lật thẻ, nghe TTS), quiz 4 đáp án (nhiễu chọn cùng cấp),
  gõ đáp án (chấp nhận kana hoặc romaji, chuẩn hoá bằng `shared/kana.ts`), nghe-chọn.
- **Kanji**: hoạt hình từng nét bằng SVG `stroke-dasharray`; canvas viết tay: người dùng vẽ
  từng nét, chấm bằng so sánh điểm đầu/cuối và hướng nét với path chuẩn (thuật toán
  `scoring.ts:scoreStroke`, ngưỡng cấu hình). Có nút gợi ý hiện nét mờ.
- **Ngữ pháp**: bài học hiển thị meaning, formation, ví dụ có TTS; quiz điền chỗ trống
  (chọn từ 4 mẫu) và sắp xếp mảnh câu.
- **Đọc**: hiển thị furigana (toggle), chạm từ mở popover nghĩa; câu hỏi trắc nghiệm.
- **Nghe**: `speechSynthesis` với voice `ja-JP`; tốc độ 0.6–1.2; phát từng câu hoặc cả đoạn;
  dictation: nghe rồi gõ, so khớp chuẩn hoá kana, tô màu khác biệt.
- **Nói**: `webkitSpeechRecognition` lang `ja-JP`; so khớp kết quả với câu mẫu bằng khoảng
  cách Levenshtein trên kana → điểm 0–100; trình duyệt không hỗ trợ thì hiện thông báo và
  vẫn cho tự đánh giá. Hội thoại đóng vai: mascot đọc lượt của mình, người dùng nói lượt mình.
- **Viết**: canvas kana/kanji như trên; đặt câu: cho mẫu ngữ pháp + từ gợi ý, người dùng gõ,
  so với 1–3 đáp án mẫu, hiển thị khác biệt.
- **Business**: bảng keigo 3 cột (尊敬語/謙譲語/丁寧語) cho ~40 động từ; mẫu email theo
  tình huống (chào hỏi, xin lỗi, hẹn lịch, báo cáo) có TTS; điện thoại, họp, meishi,
  phỏng vấn dạng hội thoại đóng vai; quiz chọn cách nói phù hợp.
- **Gamification**: XP mỗi câu đúng, streak theo ngày, cấp mascot theo XP; mascot đổi biểu
  cảm (vui/buồn/bất ngờ/ngủ) và nói câu động viên tiếng Nhật kèm dịch.

### 5.4 Giao diện anime

- Palette: sakura `#FFB7C5`, hồng đậm `#FF6F91`, xanh trời `#A0E7FF`, kem `#FFF8F0`,
  tím pastel `#C8B6FF`; dark mode nền `#1E1B2E`. Token CSS ở `:root`.
- Font: Zen Maru Gothic (JP + UI) qua Google Fonts, fallback system.
- Mascot Sakura: SVG vector tự vẽ (đầu, tóc hồng, đồng phục thủy thủ), 5 biểu cảm bằng
  đổi mắt/miệng, nhấp nháy bằng CSS animation; bong bóng thoại.
- Thành phần: thẻ bo 24px, bóng mềm, nút dạng viên thuốc, thanh XP kiểu game, hiệu ứng
  cánh hoa rơi ở trang chủ (canvas nhẹ, tắt được), confetti khi hoàn thành.
- Responsive: mobile-first, thanh điều hướng dưới trên điện thoại, sidebar trên desktop.
- A11y: contrast ≥ 4.5, focus ring, giảm chuyển động theo `prefers-reduced-motion`.

### 5.5 Lưu trữ & đồng bộ

Dexie tables: `progress(itemId, type, ease, interval, due, reps, lapses, updatedAt)`,
`sessions(id, startedAt, xp, counts)`, `settings`, `syncQueue`. Đăng nhập xong: kéo
toàn bộ progress server, gộp theo `updatedAt`, đẩy phần thay đổi. Mất mạng: ghi
`syncQueue`, thử lại khi `online`.

## 6. Server

- Fastify 4, TypeScript, better-sqlite3, bcrypt, `@fastify/jwt`, `@fastify/cors`, rate-limit.
- Bảng: `users(id, email, password_hash, display_name, created_at)`,
  `progress(user_id, item_id, type, ease, interval, due, reps, lapses, updated_at, PK(user_id,item_id))`,
  `sessions(id, user_id, started_at, xp, counts_json)`, `stats(user_id, xp, streak, last_study_day)`.
- API:
  - `POST /api/auth/register {email,password,displayName}` → `{token,user}`
  - `POST /api/auth/login` → `{token,user}`
  - `GET /api/me`
  - `GET /api/progress?since=ISO` → items thay đổi sau mốc
  - `PUT /api/progress` body `{items:[...]}` → upsert theo updatedAt, trả về items mới hơn phía server
  - `POST /api/sessions`, `GET /api/stats`
- Lỗi: 400 validate (schema JSON), 401 token, 409 email trùng, 429 rate-limit. Mật khẩu ≥ 8 ký tự.
- Server cũng phục vụ `client/dist` ở chế độ production để chạy 1 lệnh.

## 7. Kiểm thử

- `shared`: Vitest – SM-2 (các mốc interval, lapses), kana chuẩn hoá/romaji, chấm phát âm,
  chấm nét.
- `data`: Vitest – parser CSV/TSV, furigana parser, gán câu ví dụ, ngưỡng số lượng.
- `client`: Vitest + Testing Library cho hook SRS session, quiz generator, sync merge;
  smoke test render các trang.
- `server`: node:test + `fastify.inject` cho auth, progress upsert/merge, quyền truy cập.
- Kiểm chứng thủ công qua preview trình duyệt: TTS, STT, canvas, PWA offline.

## 8. Giai đoạn thực thi

1. Khung monorepo, shared (SM-2, kana, scoring) TDD, theme anime, layout, mascot, trang chủ.
2. Data pipeline (fetch/build) + module Kana, Từ vựng, Kanji, phiên ôn SRS.
3. Ngữ pháp, Đọc, Nghe, Nói, Viết.
4. Business (nội dung tự soạn) + Dashboard tiến độ + gamification.
5. Server tài khoản, đồng bộ, PWA offline, build production, README + ATTRIBUTION.

Mỗi giai đoạn có kế hoạch riêng trong `docs/superpowers/plans/`.

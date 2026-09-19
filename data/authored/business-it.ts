import type { BusinessItem, BusinessTopic } from '@nihongo/shared';
import { SCENARIOS } from './business-scenarios';

type Term = [ja: string, reading: string, vi: string, exJa: string, exVi: string];
type Phrase = [ja: string, reading: string, vi: string, note?: string];
type Rephrase = [ok: string, reading: string, ng: string, vi: string, note?: string];

const pad = (n: number) => String(n).padStart(2, '0');

function terms(category: string, rows: Term[]): BusinessItem[] {
  return rows.map(([ja, reading, vi, exJa, exVi], i) => ({
    id: `b-it-${category}-${pad(i + 1)}`,
    ja,
    reading,
    vi,
    category,
    example: { ja: exJa, vi: exVi },
  }));
}

function phrases(category: string, rows: Phrase[]): BusinessItem[] {
  return rows.map(([ja, reading, vi, note], i) => {
    const it: BusinessItem = { id: `b-it-${category}-${pad(i + 1)}`, ja, reading, vi, category };
    if (note) it.note = note;
    return it;
  });
}

// ------------------------------------------------------------------ glossary

const PROCESS: Term[] = [
  ['要件定義', 'ようけんていぎ', 'Định nghĩa yêu cầu', '要件定義の段階で、お客様の業務を詳しくヒアリングします。', 'Ở giai đoạn định nghĩa yêu cầu, chúng tôi hỏi kỹ nghiệp vụ của khách hàng.'],
  ['基本設計', 'きほんせっけい', 'Thiết kế cơ bản (thiết kế ngoài)', '基本設計書のレビューは来週水曜日に予定しています。', 'Buổi review thiết kế cơ bản dự kiến vào thứ Tư tuần sau.'],
  ['詳細設計', 'しょうさいせっけい', 'Thiết kế chi tiết (thiết kế trong)', '詳細設計が完了次第、製造に入ります。', 'Ngay khi xong thiết kế chi tiết, chúng tôi bắt đầu lập trình.'],
  ['製造', 'せいぞう', 'Lập trình, coding (giai đoạn chế tạo)', '製造フェーズは予定どおり進んでいます。', 'Giai đoạn lập trình đang đúng kế hoạch.'],
  ['単体テスト', 'たんたいテスト', 'Kiểm thử đơn vị (UT)', '単体テストのカバレッジは九十パーセント以上を目標としています。', 'Mục tiêu độ phủ unit test từ 90% trở lên.'],
  ['結合テスト', 'けつごうテスト', 'Kiểm thử tích hợp (IT)', '結合テストで画面とAPIの連携を確認します。', 'Kiểm thử tích hợp để xác nhận liên kết giữa màn hình và API.'],
  ['総合テスト', 'そうごうテスト', 'Kiểm thử hệ thống (ST)', '総合テストでは性能面も確認します。', 'Kiểm thử hệ thống có kiểm tra cả hiệu năng.'],
  ['受入テスト', 'うけいれテスト', 'Kiểm thử chấp nhận (UAT)', '受入テストはお客様側で実施していただきます。', 'Kiểm thử chấp nhận do phía khách hàng thực hiện.'],
  ['本番リリース', 'ほんばんリリース', 'Phát hành lên môi trường thật', '本番リリースは土曜日の深夜に行います。', 'Release production vào đêm thứ Bảy.'],
  ['保守運用', 'ほしゅうんよう', 'Bảo trì, vận hành', 'リリース後は保守運用フェーズに移行します。', 'Sau release sẽ chuyển sang giai đoạn bảo trì vận hành.'],
  ['工程', 'こうてい', 'Công đoạn (phase)', '次の工程に進む前に、レビューを完了させてください。', 'Hãy hoàn tất review trước khi sang công đoạn tiếp theo.'],
  ['上流工程', 'じょうりゅうこうてい', 'Công đoạn thượng nguồn (yêu cầu, thiết kế)', 'BrSEには上流工程の経験が求められます。', 'BrSE cần có kinh nghiệm ở công đoạn thượng nguồn.'],
  ['下流工程', 'かりゅうこうてい', 'Công đoạn hạ nguồn (lập trình, test)', '下流工程はベトナムのチームが担当します。', 'Công đoạn hạ nguồn do team Việt Nam phụ trách.'],
  ['スプリント', 'スプリント', 'Sprint (chu kỳ Agile)', '今回のスプリントでログイン機能を完成させます。', 'Sprint này sẽ hoàn thành chức năng đăng nhập.'],
];

const DOCS: Term[] = [
  ['仕様書', 'しようしょ', 'Tài liệu đặc tả (spec)', '仕様書の三・二節に記載があります。', 'Có ghi ở mục 3.2 của tài liệu đặc tả.'],
  ['設計書', 'せっけいしょ', 'Tài liệu thiết kế', '設計書を修正したので、再レビューをお願いします。', 'Tôi đã sửa tài liệu thiết kế, nhờ anh/chị review lại.'],
  ['テスト仕様書', 'テストしようしょ', 'Tài liệu test (test spec)', '結合テスト仕様書を本日中に提出します。', 'Tôi sẽ nộp test spec tích hợp trong hôm nay.'],
  ['テストケース', 'テストケース', 'Test case', 'テストケースは全部で百二十件あります。', 'Tổng cộng có 120 test case.'],
  ['エビデンス', 'エビデンス', 'Bằng chứng test (ảnh chụp, log)', '各テストケースのエビデンスとしてスクリーンショットを添付してください。', 'Hãy đính kèm ảnh chụp màn hình làm bằng chứng cho mỗi test case.'],
  ['議事録', 'ぎじろく', 'Biên bản họp', '会議の議事録を共有いたします。', 'Tôi xin chia sẻ biên bản cuộc họp.'],
  ['QA表', 'キューエーひょう', 'Bảng hỏi đáp (Q&A)', '不明点はQA表に記載してください。', 'Điểm chưa rõ hãy ghi vào bảng Q&A.'],
  ['課題管理表', 'かだいかんりひょう', 'Bảng quản lý vấn đề (issue list)', '課題管理表を毎週更新しています。', 'Chúng tôi cập nhật bảng quản lý vấn đề hằng tuần.'],
  ['見積書', 'みつもりしょ', 'Bảng báo giá', '見積書を添付いたしますので、ご確認ください。', 'Tôi đính kèm bảng báo giá, mong anh/chị xem.'],
  ['手順書', 'てじゅんしょ', 'Tài liệu hướng dẫn thao tác', 'リリース手順書に沿って作業します。', 'Chúng tôi làm theo tài liệu hướng dẫn release.'],
  ['納品物', 'のうひんぶつ', 'Sản phẩm bàn giao (deliverable)', '納品物の一覧を事前にお送りします。', 'Chúng tôi gửi trước danh sách sản phẩm bàn giao.'],
  ['画面遷移図', 'がめんせんいず', 'Sơ đồ chuyển màn hình', '画面遷移図に戻るボタンの遷移先が書かれていません。', 'Sơ đồ chuyển màn hình chưa ghi đích đến của nút quay lại.'],
  ['変更履歴', 'へんこうりれき', 'Lịch sử thay đổi (change log)', '修正内容は変更履歴に記載しました。', 'Nội dung sửa đã ghi vào lịch sử thay đổi.'],
  ['日報', 'にっぽう', 'Báo cáo ngày', '作業内容は日報で報告してください。', 'Hãy báo cáo nội dung công việc bằng báo cáo ngày.'],
  ['週報', 'しゅうほう', 'Báo cáo tuần', '金曜日に週報をお送りします。', 'Thứ Sáu tôi sẽ gửi báo cáo tuần.'],
  ['チケット', 'チケット', 'Ticket (Backlog, Redmine, Jira)', 'この件はチケットを起票して管理します。', 'Việc này sẽ tạo ticket để quản lý.'],
];

const QUALITY: Term[] = [
  ['不具合', 'ふぐあい', 'Lỗi, bug', '結合テストで不具合を三件検出しました。', 'Kiểm thử tích hợp phát hiện 3 lỗi.'],
  ['障害', 'しょうがい', 'Sự cố (hệ thống đang chạy)', '本番環境で障害が発生しました。', 'Đã xảy ra sự cố trên môi trường production.'],
  ['再現手順', 'さいげんてじゅん', 'Các bước tái hiện', '再現手順を教えていただけますか。', 'Anh/chị cho biết các bước tái hiện được không?'],
  ['期待結果', 'きたいけっか', 'Kết quả mong đợi', '期待結果と実際の結果が異なります。', 'Kết quả mong đợi khác với kết quả thực tế.'],
  ['原因', 'げんいん', 'Nguyên nhân', '原因は現在調査中です。', 'Nguyên nhân hiện đang được điều tra.'],
  ['影響範囲', 'えいきょうはんい', 'Phạm vi ảnh hưởng', '影響範囲を確認したうえでご報告します。', 'Sau khi xác nhận phạm vi ảnh hưởng tôi sẽ báo cáo.'],
  ['切り分け', 'きりわけ', 'Khoanh vùng nguyên nhân', 'ネットワークの問題かアプリの問題か、切り分けを行っています。', 'Đang khoanh vùng xem là lỗi mạng hay lỗi ứng dụng.'],
  ['暫定対応', 'ざんていたいおう', 'Xử lý tạm thời', 'まず暫定対応として、該当機能を停止しました。', 'Trước hết, để xử lý tạm thời, chúng tôi đã dừng chức năng liên quan.'],
  ['恒久対応', 'こうきゅうたいおう', 'Xử lý triệt để, lâu dài', '恒久対応は次回のリリースで実施します。', 'Xử lý triệt để sẽ làm ở lần release tới.'],
  ['再発防止策', 'さいはつぼうしさく', 'Biện pháp phòng tái phát', '再発防止策をまとめて報告いたします。', 'Chúng tôi sẽ tổng hợp biện pháp phòng tái phát và báo cáo.'],
  ['回避策', 'かいひさく', 'Cách tránh (workaround)', '修正までの間、回避策をご案内します。', 'Trong lúc chờ sửa, chúng tôi hướng dẫn cách tránh.'],
  ['デグレ', 'デグレ', 'Lỗi hồi quy (regression)', '今回の修正でデグレが発生していないか確認します。', 'Kiểm tra xem lần sửa này có gây lỗi hồi quy không.'],
  ['横展開', 'よこてんかい', 'Áp dụng/kiểm tra tương tự sang chỗ khác', '同じ不具合がないか、他の画面にも横展開して確認します。', 'Chúng tôi kiểm tra cả các màn hình khác xem có lỗi tương tự không.'],
  ['指摘', 'してき', 'Điểm được chỉ ra (khi review)', 'レビューで五件の指摘を受けました。', 'Buổi review có 5 điểm được chỉ ra.'],
  ['修正', 'しゅうせい', 'Sửa', '指摘された箇所を修正しました。', 'Tôi đã sửa chỗ được chỉ ra.'],
  ['改修', 'かいしゅう', 'Cải sửa (chỉnh sửa hệ thống có sẵn)', '既存画面の改修は二人日で対応できます。', 'Việc cải sửa màn hình có sẵn làm được trong 2 man-day.'],
  ['品質', 'ひんしつ', 'Chất lượng', '品質を担保するため、テストを追加します。', 'Để đảm bảo chất lượng, chúng tôi bổ sung test.'],
  ['仕様通り', 'しようどおり', 'Đúng như đặc tả', '調査の結果、仕様通りの動作でした。', 'Kết quả điều tra cho thấy đây là hành vi đúng đặc tả.'],
  ['想定外', 'そうていがい', 'Ngoài dự tính', '想定外のデータが登録されていました。', 'Có dữ liệu ngoài dự tính đã được đăng ký.'],
  ['切り戻し', 'きりもどし', 'Rollback, quay về bản cũ', '問題があれば、旧バージョンに切り戻します。', 'Nếu có vấn đề sẽ rollback về phiên bản cũ.'],
  ['復旧', 'ふっきゅう', 'Khôi phục', 'システムは十時に復旧しました。', 'Hệ thống đã khôi phục lúc 10 giờ.'],
];

const PM: Term[] = [
  ['進捗', 'しんちょく', 'Tiến độ', '進捗は予定どおりです。', 'Tiến độ đúng kế hoạch.'],
  ['遅延', 'ちえん', 'Chậm trễ', '二日の遅延が発生しています。', 'Đang chậm 2 ngày.'],
  ['工数', 'こうすう', 'Công số (effort)', 'この機能の工数は十人日です。', 'Công số của chức năng này là 10 man-day.'],
  ['人日', 'にんにち', 'Man-day', '修正には三人日かかる見込みです。', 'Dự kiến việc sửa mất 3 man-day.'],
  ['人月', 'にんげつ', 'Man-month', '全体の規模は約六人月です。', 'Quy mô tổng thể khoảng 6 man-month.'],
  ['納期', 'のうき', 'Hạn bàn giao', '納期は来月末です。', 'Hạn bàn giao là cuối tháng sau.'],
  ['前倒し', 'まえだおし', 'Đẩy lịch sớm lên', 'テストを前倒しで開始します。', 'Chúng tôi bắt đầu test sớm hơn kế hoạch.'],
  ['後ろ倒し', 'うしろだおし', 'Lùi lịch', 'リリースを一週間後ろ倒しにします。', 'Lùi release một tuần.'],
  ['見積もり', 'みつもり', 'Ước lượng, báo giá', '見積もりを本日中に提出します。', 'Tôi nộp báo giá trong hôm nay.'],
  ['優先度', 'ゆうせんど', 'Độ ưu tiên', '優先度の高いチケットから対応します。', 'Xử lý từ ticket có độ ưu tiên cao.'],
  ['懸念点', 'けねんてん', 'Điểm đáng lo ngại', '一点、懸念点があります。', 'Có một điểm đáng lo ngại.'],
  ['課題', 'かだい', 'Vấn đề cần giải quyết (issue)', 'この課題の担当は私です。', 'Tôi phụ trách vấn đề này.'],
  ['担当者', 'たんとうしゃ', 'Người phụ trách', '担当者を明確にしておきましょう。', 'Hãy xác định rõ người phụ trách.'],
  ['期限', 'きげん', 'Hạn chót (deadline)', '回答期限は金曜日です。', 'Hạn trả lời là thứ Sáu.'],
  ['対応', 'たいおう', 'Xử lý, ứng phó', 'この件はこちらで対応いたします。', 'Việc này phía chúng tôi sẽ xử lý.'],
  ['仕様変更', 'しようへんこう', 'Thay đổi đặc tả', '仕様変更の影響を確認します。', 'Chúng tôi kiểm tra ảnh hưởng của thay đổi đặc tả.'],
  ['追加開発', 'ついかかいはつ', 'Phát triển bổ sung', '追加開発は別途お見積もりとなります。', 'Phát triển bổ sung sẽ được báo giá riêng.'],
  ['スコープ', 'スコープ', 'Phạm vi công việc (scope)', 'その機能は今回のスコープ外です。', 'Chức năng đó nằm ngoài phạm vi lần này.'],
  ['報連相', 'ほうれんそう', 'Báo cáo – liên lạc – thảo luận', '日本の職場では報連相が大切です。', 'Ở nơi làm việc Nhật, báo cáo – liên lạc – thảo luận rất quan trọng.'],
  ['巻き取り', 'まきとり', 'Nhận làm thay phần việc bị chậm', '遅れているタスクは日本側で巻き取ります。', 'Phía Nhật sẽ nhận làm thay các task đang chậm.'],
  ['認識合わせ', 'にんしきあわせ', 'Thống nhất cách hiểu', '着手前に認識合わせをしましょう。', 'Trước khi bắt tay vào làm hãy thống nhất cách hiểu.'],
  ['落としどころ', 'おとしどころ', 'Điểm thỏa hiệp', 'お互いの落としどころを探ります。', 'Tìm điểm thỏa hiệp cho cả hai bên.'],
  ['マイルストーン', 'マイルストーン', 'Mốc quan trọng (milestone)', '次のマイルストーンは結合テスト完了です。', 'Mốc tiếp theo là hoàn thành kiểm thử tích hợp.'],
  ['オフショア開発', 'オフショアかいはつ', 'Phát triển offshore', '当社はベトナムでオフショア開発を行っています。', 'Công ty chúng tôi phát triển offshore tại Việt Nam.'],
];

const TECH: Term[] = [
  ['本番環境', 'ほんばんかんきょう', 'Môi trường production', '本番環境へのアクセスは制限されています。', 'Quyền truy cập môi trường production bị hạn chế.'],
  ['検証環境', 'けんしょうかんきょう', 'Môi trường kiểm chứng (staging)', '修正版を検証環境に反映しました。', 'Bản sửa đã được đưa lên môi trường staging.'],
  ['開発環境', 'かいはつかんきょう', 'Môi trường phát triển', '開発環境ではテストデータを使ってください。', 'Ở môi trường phát triển hãy dùng dữ liệu test.'],
  ['環境構築', 'かんきょうこうちく', 'Dựng môi trường', '新メンバーの環境構築に半日かかりました。', 'Dựng môi trường cho thành viên mới mất nửa ngày.'],
  ['デプロイ', 'デプロイ', 'Deploy, triển khai', '十八時に検証環境へデプロイします。', '18 giờ sẽ deploy lên staging.'],
  ['プルリクエスト', 'プルリクエスト', 'Pull request (thường gọi プルリク)', 'プルリクエストにレビュアーを設定してください。', 'Hãy gán người review cho pull request.'],
  ['マージ', 'マージ', 'Merge', 'レビューが通ったらマージしてください。', 'Review xong thì hãy merge.'],
  ['ブランチ', 'ブランチ', 'Nhánh (branch)', '機能ごとにブランチを切ってください。', 'Hãy tạo nhánh riêng cho từng chức năng.'],
  ['ソースレビュー', 'ソースレビュー', 'Review mã nguồn', 'ソースレビューは二名で行います。', 'Review mã nguồn do 2 người thực hiện.'],
  ['ログ', 'ログ', 'Log', 'エラー発生時のログを送っていただけますか。', 'Anh/chị gửi log lúc xảy ra lỗi được không?'],
  ['権限', 'けんげん', 'Quyền hạn', '検証環境の権限を付与していただけますか。', 'Anh/chị cấp quyền môi trường staging được không?'],
  ['移行', 'いこう', 'Chuyển đổi (migrate)', 'データ移行は週末に行います。', 'Việc chuyển dữ liệu làm vào cuối tuần.'],
  ['性能', 'せいのう', 'Hiệu năng', '性能テストで応答時間を計測します。', 'Test hiệu năng để đo thời gian phản hồi.'],
  ['負荷', 'ふか', 'Tải (load)', 'アクセスが集中すると負荷が高くなります。', 'Khi truy cập tập trung thì tải tăng cao.'],
  ['互換性', 'ごかんせい', 'Tính tương thích', '旧バージョンとの互換性を保ちます。', 'Giữ tương thích với phiên bản cũ.'],
  ['バッチ処理', 'バッチしょり', 'Xử lý batch', '夜間のバッチ処理が失敗しました。', 'Xử lý batch ban đêm đã thất bại.'],
  ['問い合わせ', 'といあわせ', 'Yêu cầu hỗ trợ, câu hỏi', 'ユーザーから問い合わせがありました。', 'Có yêu cầu hỗ trợ từ người dùng.'],
  ['既存', 'きぞん', 'Có sẵn, hiện có', '既存の機能に影響はありません。', 'Không ảnh hưởng đến chức năng hiện có.'],
];

// ------------------------------------------------------------------ phrases

const STANDUP: Phrase[] = [
  ['昨日はログイン画面の実装を完了しました。', 'きのうはログインがめんのじっそうをかんりょうしました。', 'Hôm qua tôi đã hoàn thành triển khai màn hình đăng nhập.'],
  ['本日は検索機能の単体テストを行う予定です。', 'ほんじつはけんさくきのうのたんたいテストをおこなうよていです。', 'Hôm nay tôi dự định làm unit test chức năng tìm kiếm.'],
  ['現在、進捗は予定どおりです。', 'げんざい、しんちょくはよていどおりです。', 'Hiện tại tiến độ đúng kế hoạch.'],
  ['半日ほど遅れていますが、明日中に取り戻せる見込みです。', 'はんにちほどおくれていますが、あしたじゅうにとりもどせるみこみです。', 'Đang chậm khoảng nửa ngày nhưng dự kiến bắt kịp trong ngày mai.', 'Báo chậm luôn kèm dự kiến khi nào bắt kịp.'],
  ['特に課題はありません。', 'とくにかだいはありません。', 'Không có vấn đề gì đặc biệt.'],
  ['一点、懸念点があります。', 'いってん、けねんてんがあります。', 'Có một điểm đáng lo ngại.'],
  ['外部APIの仕様が未確定のため、作業が止まっています。', 'がいぶエーピーアイのしようがみかくていのため、さぎょうがとまっています。', 'Vì đặc tả API bên ngoài chưa chốt nên công việc đang bị dừng.'],
  ['全体の進捗率は七十パーセントです。', 'ぜんたいのしんちょくりつはななじゅっパーセントです。', 'Tỷ lệ tiến độ tổng thể là 70%.'],
  ['午後から結合テストに着手します。', 'ごごからけつごうテストにちゃくしゅします。', 'Từ chiều tôi bắt tay vào kiểm thử tích hợp.'],
  ['残りのタスクは三件です。', 'のこりのタスクはさんけんです。', 'Còn lại ba task.'],
  ['レビュー待ちのチケットが二件あります。', 'レビューまちのチケットがにけんあります。', 'Có hai ticket đang chờ review.'],
  ['本日の作業内容は日報で報告いたします。', 'ほんじつのさぎょうないようはにっぽうでほうこくいたします。', 'Nội dung công việc hôm nay tôi sẽ báo cáo bằng báo cáo ngày.'],
  ['何かあれば、すぐにご連絡します。', 'なにかあれば、すぐにごれんらくします。', 'Nếu có gì tôi sẽ liên lạc ngay.'],
  ['以上です。', 'いじょうです。', 'Tôi xin hết (kết thúc phần báo cáo).'],
];

const SPEC: Phrase[] = [
  ['仕様について一点確認させてください。', 'しようについていってんかくにんさせてください。', 'Cho tôi xác nhận một điểm về đặc tả.'],
  ['仕様書の三ページ目の記載について質問があります。', 'しようしょのさんページめのきさいについてしつもんがあります。', 'Tôi có câu hỏi về nội dung ở trang 3 tài liệu đặc tả.', 'Chỉ rõ vị trí (trang, mục) giúp khách trả lời nhanh.'],
  ['この項目は必須入力という認識でよろしいでしょうか。', 'このこうもくはひっすにゅうりょくというにんしきでよろしいでしょうか。', 'Tôi hiểu mục này là bắt buộc nhập, có đúng không ạ?', 'Mẫu 〜という認識でよろしいでしょうか dùng để chốt cách hiểu.'],
  ['仕様書と画面イメージで内容が異なっています。', 'しようしょとがめんイメージでないようがことなっています。', 'Nội dung tài liệu đặc tả và hình ảnh màn hình khác nhau.'],
  ['どちらが正しいかご確認いただけますでしょうか。', 'どちらがただしいかごかくにんいただけますでしょうか。', 'Anh/chị xác nhận giúp bên nào đúng được không ạ?'],
  ['入力できる最大の桁数は何桁でしょうか。', 'にゅうりょくできるさいだいのけたすうはなんけたでしょうか。', 'Số ký tự tối đa có thể nhập là bao nhiêu ạ?'],
  ['エラー時の動きが記載されていないのですが、どのように表示すればよいでしょうか。', 'エラーじのうごきがきさいされていないのですが、どのようにひょうじすればよいでしょうか。', 'Tài liệu chưa ghi hành vi khi lỗi, nên hiển thị thế nào ạ?'],
  ['既存画面の動きに合わせるという理解でよろしいですか。', 'きぞんがめんのうごきにあわせるというりかいでよろしいですか。', 'Tôi hiểu là làm theo hành vi của màn hình hiện có, đúng không ạ?'],
  ['不明点はQA表にまとめてお送りいたします。', 'ふめいてんはキューエーひょうにまとめておおくりいたします。', 'Các điểm chưa rõ tôi sẽ tổng hợp vào bảng Q&A và gửi.'],
  ['回答期限は今週金曜日でお願いできますでしょうか。', 'かいとうきげんはこんしゅうきんようびでおねがいできますでしょうか。', 'Anh/chị trả lời trước thứ Sáu tuần này được không ạ?'],
  ['ご回答ありがとうございます。その方針で進めます。', 'ごかいとうありがとうございます。そのほうしんですすめます。', 'Cảm ơn câu trả lời. Chúng tôi sẽ tiến hành theo hướng đó.'],
  ['念のため、具体例を挙げていただけますか。', 'ねんのため、ぐたいれいをあげていただけますか。', 'Để chắc chắn, anh/chị cho ví dụ cụ thể được không?'],
  ['認識に齟齬がないよう、画面イメージを作成して確認させてください。', 'にんしきにそごがないよう、がめんイメージをさくせいしてかくにんさせてください。', 'Để tránh hiểu lệch, cho phép tôi làm hình ảnh màn hình để xác nhận.', '齟齬 (そご) = sự lệch nhau, hay dùng trong IT.'],
  ['この仕様の背景を伺ってもよろしいでしょうか。', 'このしようのはいけいをうかがってもよろしいでしょうか。', 'Tôi có thể hỏi bối cảnh của đặc tả này không ạ?'],
];

const ESTIMATE: Phrase[] = [
  ['見積もりを本日中に提出いたします。', 'みつもりをほんじつちゅうにていしゅついたします。', 'Tôi sẽ nộp báo giá trong hôm nay.'],
  ['この機能の工数は約十人日と見込んでいます。', 'このきのうのこうすうはやくじゅうにんにちとみこんでいます。', 'Công số chức năng này dự kiến khoảng 10 man-day.'],
  ['見積もりの前提条件は以下のとおりです。', 'みつもりのぜんていじょうけんはいかのとおりです。', 'Điều kiện tiền đề của báo giá như sau.', 'Luôn ghi 前提条件 để tránh tranh cãi khi phạm vi thay đổi.'],
  ['テスト工数も含めた金額です。', 'テストこうすうもふくめたきんがくです。', 'Số tiền này đã bao gồm công số test.'],
  ['仕様が確定していない部分はバッファを含めています。', 'しようがかくていしていないぶぶんはバッファをふくめています。', 'Phần đặc tả chưa chốt, chúng tôi đã tính thêm buffer.'],
  ['見積もりの根拠をご説明いたします。', 'みつもりのこんきょをごせつめいいたします。', 'Tôi xin giải thích căn cứ của báo giá.'],
  ['リリース日を一週間後ろ倒しにしていただくことは可能でしょうか。', 'リリースびをいっしゅうかんうしろだおしにしていただくことはかのうでしょうか。', 'Có thể lùi ngày release một tuần được không ạ?'],
  ['納期を守るため、人員を二名追加いたします。', 'のうきをまもるため、じんいんをにめいついかいたします。', 'Để giữ đúng hạn, chúng tôi bổ sung 2 người.'],
  ['スケジュールを再調整したうえで、改めてご提示します。', 'スケジュールをさいちょうせいしたうえで、あらためてごていじします。', 'Sau khi điều chỉnh lại lịch, chúng tôi sẽ trình bày lại.'],
  ['優先度の高い機能から順にリリースする案はいかがでしょうか。', 'ゆうせんどのたかいきのうからじゅんにリリースするあんはいかがでしょうか。', 'Phương án release lần lượt từ chức năng ưu tiên cao thì thế nào ạ?'],
  ['追加のご要望につきましては、別途お見積もりさせていただきます。', 'ついかのごようぼうにつきましては、べっとおみつもりさせていただきます。', 'Về yêu cầu bổ sung, chúng tôi xin báo giá riêng.'],
  ['マイルストーンは三つに分けて設定しています。', 'マイルストーンはみっつにわけてせっていしています。', 'Chúng tôi chia thành 3 mốc milestone.'],
];

const BUG: Phrase[] = [
  ['本番環境で障害が発生しております。', 'ほんばんかんきょうでしょうがいがはっせいしております。', 'Đang xảy ra sự cố trên môi trường production.'],
  ['第一報としてご連絡いたします。', 'だいいっぽうとしてごれんらくいたします。', 'Tôi xin liên lạc với tư cách báo cáo đầu tiên.', '第一報: báo ngay khi phát hiện, kể cả khi chưa rõ nguyên nhân.'],
  ['現在、影響範囲を調査しております。', 'げんざい、えいきょうはんいをちょうさしております。', 'Hiện đang điều tra phạm vi ảnh hưởng.'],
  ['原因が判明し次第、改めてご報告いたします。', 'げんいんがはんめいしだい、あらためてごほうこくいたします。', 'Ngay khi xác định được nguyên nhân, chúng tôi sẽ báo cáo lại.'],
  ['再現手順を教えていただけますでしょうか。', 'さいげんてじゅんをおしえていただけますでしょうか。', 'Anh/chị cho biết các bước tái hiện được không ạ?'],
  ['当方の環境では再現できませんでした。', 'とうほうのかんきょうではさいげんできませんでした。', 'Trên môi trường của chúng tôi không tái hiện được.'],
  ['お手数ですが、エラー画面のスクリーンショットをお送りいただけますか。', 'おてすうですが、エラーがめんのスクリーンショットをおおくりいただけますか。', 'Phiền anh/chị gửi ảnh chụp màn hình lỗi được không ạ?'],
  ['暫定対応として、該当機能を一時的に停止しました。', 'ざんていたいおうとして、がいとうきのうをいちじてきにていししました。', 'Như biện pháp tạm thời, chúng tôi đã tạm dừng chức năng liên quan.'],
  ['恒久対応は来週のリリースで実施いたします。', 'こうきゅうたいおうはらいしゅうのリリースでじっしいたします。', 'Xử lý triệt để sẽ thực hiện ở bản release tuần sau.'],
  ['原因はデータ移行時の変換ミスでした。', 'げんいんはデータいこうじのへんかんミスでした。', 'Nguyên nhân là lỗi chuyển đổi khi migrate dữ liệu.'],
  ['再発防止策として、レビュー項目を追加いたします。', 'さいはつぼうしさくとして、レビューこうもくをついかいたします。', 'Để phòng tái phát, chúng tôi bổ sung hạng mục review.'],
  ['ご迷惑をおかけし、誠に申し訳ございません。', 'ごめいわくをおかけし、まことにもうしわけございません。', 'Thành thật xin lỗi vì đã gây phiền phức.'],
  ['修正版を検証環境にデプロイしましたので、ご確認をお願いします。', 'しゅうせいばんをけんしょうかんきょうにデプロイしましたので、ごかくにんをおねがいします。', 'Bản sửa đã deploy lên staging, mong anh/chị kiểm tra.'],
  ['調査の結果、仕様通りの動作であることを確認いたしました。', 'ちょうさのけっか、しようどおりのどうさであることをかくにんいたしました。', 'Kết quả điều tra xác nhận đây là hành vi đúng đặc tả.'],
  ['復旧いたしました。現在は正常に稼働しております。', 'ふっきゅういたしました。げんざいはせいじょうにかどうしております。', 'Đã khôi phục. Hiện hệ thống hoạt động bình thường.'],
];

const REVIEW: Phrase[] = [
  ['レビューをお願いできますでしょうか。', 'レビューをおねがいできますでしょうか。', 'Nhờ anh/chị review giúp được không ạ?'],
  ['プルリクエストを作成しましたので、ご確認をお願いします。', 'プルリクエストをさくせいしましたので、ごかくにんをおねがいします。', 'Tôi đã tạo pull request, mong anh/chị kiểm tra.'],
  ['ご指摘ありがとうございます。修正いたします。', 'ごしてきありがとうございます。しゅうせいいたします。', 'Cảm ơn góp ý. Tôi sẽ sửa.'],
  ['指摘事項はすべて反映しました。', 'してきじこうはすべてはんえいしました。', 'Tôi đã phản ánh toàn bộ các điểm được chỉ ra.'],
  ['この実装にした意図をご説明します。', 'このじっそうにしたいとをごせつめいします。', 'Tôi xin giải thích lý do chọn cách triển khai này.'],
  ['命名規則に沿っていない箇所があります。', 'めいめいきそくにそっていないかしょがあります。', 'Có chỗ không theo quy tắc đặt tên.'],
  ['共通化できる処理があるように見えます。', 'きょうつうかできるしょりがあるようにみえます。', 'Có vẻ có xử lý có thể gộp dùng chung.'],
  ['例外処理が漏れているようです。', 'れいがいしょりがもれているようです。', 'Có vẻ bị thiếu xử lý ngoại lệ.'],
  ['念のため、境界値のテストも追加していただけますか。', 'ねんのため、きょうかいちのテストもついかしていただけますか。', 'Để chắc chắn, bổ sung test giá trị biên được không?'],
  ['軽微な指摘なので、次回の対応でも問題ありません。', 'けいびなしてきなので、じかいのたいおうでももんだいありません。', 'Là góp ý nhỏ nên xử lý lần sau cũng không sao.'],
  ['修正方針について相談させてください。', 'しゅうせいほうしんについてそうだんさせてください。', 'Cho tôi trao đổi về hướng sửa.'],
  ['承認しましたので、マージしてください。', 'しょうにんしましたので、マージしてください。', 'Tôi đã approve, hãy merge.'],
];

const REQUEST: Phrase[] = [
  ['お忙しいところ恐縮ですが、ご確認をお願いできますでしょうか。', 'おいそがしいところきょうしゅくですが、ごかくにんをおねがいできますでしょうか。', 'Xin lỗi làm phiền lúc bận, anh/chị xác nhận giúp được không ạ?'],
  ['本日十七時までにご回答いただけますと幸いです。', 'ほんじつじゅうしちじまでにごかいとういただけますとさいわいです。', 'Rất mong anh/chị trả lời trước 17 giờ hôm nay.'],
  ['検証環境へのアクセス権限を付与していただけますでしょうか。', 'けんしょうかんきょうへのアクセスけんげんをふよしていただけますでしょうか。', 'Anh/chị cấp quyền truy cập môi trường staging được không ạ?'],
  ['テストデータをご提供いただくことは可能でしょうか。', 'テストデータをごていきょういただくことはかのうでしょうか。', 'Anh/chị có thể cung cấp dữ liệu test được không ạ?'],
  ['先日お送りしたご質問の件、ご状況はいかがでしょうか。', 'せんじつおおくりしたごしつもんのけん、ごじょうきょうはいかがでしょうか。', 'Về câu hỏi gửi hôm trước, tình hình thế nào rồi ạ?', 'Hối thúc nhẹ nhàng: hỏi "tình hình" thay vì "sao chưa trả lời".'],
  ['重ねてのお願いで恐縮ですが、ご回答をお待ちしております。', 'かさねてのおねがいできょうしゅくですが、ごかいとうをおまちしております。', 'Xin lỗi vì nhắc lại, chúng tôi đang chờ câu trả lời.'],
  ['作業が止まっているため、優先してご対応いただけますと助かります。', 'さぎょうがとまっているため、ゆうせんしてごたいおういただけますとたすかります。', 'Vì công việc đang bị dừng, nếu anh/chị ưu tiên xử lý thì chúng tôi rất cảm kích.'],
  ['こちらのタスクをお願いしてもよろしいでしょうか。', 'こちらのタスクをおねがいしてもよろしいでしょうか。', 'Tôi nhờ anh/chị task này được không ạ?'],
  ['期限は来週月曜日でお願いします。', 'きげんはらいしゅうげつようびでおねがいします。', 'Hạn là thứ Hai tuần sau.'],
  ['不明点があれば、遠慮なくご質問ください。', 'ふめいてんがあれば、えんりょなくごしつもんください。', 'Có điểm nào chưa rõ thì cứ hỏi nhé.'],
  ['手順を箇条書きにまとめましたので、この順番で作業してください。', 'てじゅんをかじょうがきにまとめましたので、このじゅんばんでさぎょうしてください。', 'Tôi đã liệt kê các bước, hãy làm theo thứ tự này.', 'Dùng với team offshore: gạch đầu dòng, mỗi câu một ý.'],
  ['作業が終わったら、チャットで一言連絡をください。', 'さぎょうがおわったら、チャットでひとことれんらくをください。', 'Làm xong hãy nhắn một câu qua chat nhé.'],
];

const NEGOTIATION: Phrase[] = [
  ['大変申し訳ないのですが、今回のスケジュールでは対応が難しい状況です。', 'たいへんもうしわけないのですが、こんかいのスケジュールではたいおうがむずかしいじょうきょうです。', 'Rất xin lỗi, với lịch lần này thì khó đáp ứng.'],
  ['ご要望は承知いたしましたが、今回のスコープ外となります。', 'ごようぼうはしょうちいたしましたが、こんかいのスコープがいとなります。', 'Chúng tôi đã hiểu yêu cầu, nhưng nó nằm ngoài phạm vi lần này.'],
  ['代替案として、次のフェーズでの対応をご提案いたします。', 'だいたいあんとして、つぎのフェーズでのたいおうをごていあんいたします。', 'Phương án thay thế, chúng tôi đề xuất xử lý ở giai đoạn sau.'],
  ['品質を担保するため、テスト期間は短縮いたしかねます。', 'ひんしつをたんぽするため、テストきかんはたんしゅくいたしかねます。', 'Để đảm bảo chất lượng, chúng tôi không thể rút ngắn thời gian test.', '〜かねます = không thể (lịch sự).'],
  ['一部の機能に絞れば、期限内にリリース可能です。', 'いちぶのきのうにしぼれば、きげんないにリリースかのうです。', 'Nếu thu hẹp lại một số chức năng thì có thể release đúng hạn.'],
  ['社内で検討のうえ、改めてご回答いたします。', 'しゃないでけんとうのうえ、あらためてごかいとういたします。', 'Sau khi xem xét nội bộ, chúng tôi sẽ trả lời lại.'],
  ['費用面については、別途ご相談させてください。', 'ひようめんについては、べっとごそうだんさせてください。', 'Về mặt chi phí, xin cho chúng tôi trao đổi riêng.'],
  ['お互いにとって最適な落としどころを探りたいと考えております。', 'おたがいにとってさいてきなおとしどころをさぐりたいとかんがえております。', 'Chúng tôi muốn tìm điểm thỏa hiệp tốt nhất cho cả hai bên.'],
  ['ご期待に沿えず、申し訳ございません。', 'ごきたいにそえず、もうしわけございません。', 'Xin lỗi vì không đáp ứng được kỳ vọng.'],
  ['その条件であれば、対応可能です。', 'そのじょうけんであれば、たいおうかのうです。', 'Với điều kiện đó thì chúng tôi đáp ứng được.'],
  ['優先順位を一緒に整理させていただけますか。', 'ゆうせんじゅんいをいっしょにせいりさせていただけますか。', 'Cho phép chúng tôi cùng anh/chị sắp xếp lại thứ tự ưu tiên.'],
  ['今回は見送らせていただきます。', 'こんかいはみおくらせていただきます。', 'Lần này chúng tôi xin phép chưa thực hiện.'],
];

const ONLINE: Phrase[] = [
  ['皆さん、聞こえていますでしょうか。', 'みなさん、きこえていますでしょうか。', 'Mọi người có nghe rõ không ạ?'],
  ['画面を共有いたします。見えていますか。', 'がめんをきょうゆういたします。みえていますか。', 'Tôi chia sẻ màn hình. Mọi người thấy không ạ?'],
  ['音声が途切れているようです。', 'おんせいがとぎれているようです。', 'Có vẻ âm thanh bị ngắt quãng.'],
  ['すみません、もう一度おっしゃっていただけますか。', 'すみません、もういちどおっしゃっていただけますか。', 'Xin lỗi, anh/chị nói lại một lần nữa được không ạ?'],
  ['少しゆっくり話していただけると助かります。', 'すこしゆっくりはなしていただけるとたすかります。', 'Nếu anh/chị nói chậm lại một chút thì tốt quá.'],
  ['通信が不安定なので、カメラをオフにします。', 'つうしんがふあんていなので、カメラをオフにします。', 'Mạng không ổn định nên tôi tắt camera.'],
  ['田中さん、マイクがミュートになっているようです。', 'たなかさん、マイクがミュートになっているようです。', 'Anh Tanaka, có vẻ mic đang tắt tiếng.'],
  ['本日の会議を録画してもよろしいでしょうか。', 'ほんじつのかいぎをろくがしてもよろしいでしょうか。', 'Tôi ghi hình cuộc họp hôm nay được không ạ?'],
  ['資料はチャットに貼っておきます。', 'しりょうはチャットにはっておきます。', 'Tôi sẽ dán tài liệu vào chat.'],
  ['時間になりましたので、始めさせていただきます。', 'じかんになりましたので、はじめさせていただきます。', 'Đến giờ rồi, xin phép bắt đầu.'],
  ['次の会議がありますので、お先に失礼します。', 'つぎのかいぎがありますので、おさきにしつれいします。', 'Tôi có cuộc họp tiếp theo nên xin phép rời trước.'],
  ['最後に、本日の決定事項を確認させてください。', 'さいごに、ほんじつのけっていじこうをかくにんさせてください。', 'Cuối cùng, cho tôi xác nhận những điều đã quyết hôm nay.'],
];

const CHAT: Phrase[] = [
  ['お疲れさまです。ベトナムチームの田中です。', 'おつかれさまです。ベトナムチームのたなかです。', 'Chào anh/chị, tôi là Tanaka team Việt Nam.', 'Chat nội bộ thường mở đầu bằng お疲れさまです.'],
  ['取り急ぎ、ご報告まで。', 'とりいそぎ、ごほうこくまで。', 'Báo cáo nhanh trước (chi tiết sau).'],
  ['承知しました。対応します。', 'しょうちしました。たいおうします。', 'Đã hiểu. Tôi sẽ xử lý.'],
  ['確認します。少々お待ちください。', 'かくにんします。しょうしょうおまちください。', 'Tôi kiểm tra, xin đợi chút.'],
  ['対応完了しました。ご確認をお願いします。', 'たいおうかんりょうしました。ごかくにんをおねがいします。', 'Đã xử lý xong. Nhờ anh/chị kiểm tra.'],
  ['チケットのステータスを「処理済み」に変更しました。', 'チケットのステータスを「しょりずみ」にへんこうしました。', 'Tôi đã đổi trạng thái ticket sang "Đã xử lý".'],
  ['担当者を山田さんに変更しました。', 'たんとうしゃをやまださんにへんこうしました。', 'Tôi đã đổi người phụ trách sang anh Yamada.'],
  ['コメントに回答を記載しましたので、ご確認ください。', 'コメントにかいとうをきさいしましたので、ごかくにんください。', 'Tôi đã ghi câu trả lời trong comment, mời anh/chị xem.'],
  ['本件、クローズしてよろしいでしょうか。', 'ほんけん、クローズしてよろしいでしょうか。', 'Việc này đóng lại được chưa ạ?'],
  ['補足です。', 'ほそくです。', 'Bổ sung thêm.'],
  ['認識は合っていますでしょうか。', 'にんしきはあっていますでしょうか。', 'Cách hiểu của tôi có đúng không ạ?'],
  ['了解です。ありがとうございます。', 'りょうかいです。ありがとうございます。', 'Rõ rồi. Cảm ơn nhé.', 'Chỉ dùng 了解です với đồng nghiệp ngang hàng. Với khách hàng, cấp trên hãy dùng 承知しました.'],
  ['スレッドで失礼します。', 'スレッドでしつれいします。', 'Xin phép trả lời trong thread.'],
];

// ------------------------------------------------------------------ rephrase (NG → OK)

const REPHRASE: Rephrase[] = [
  ['現状の体制では、対応が難しい状況です。', 'げんじょうのたいせいでは、たいおうがむずかしいじょうきょうです。', 'できません。', 'Từ chối khéo khi không làm được.', 'Nói lý do (体制, スケジュール) thay vì chỉ "không làm được".'],
  ['確認して、折り返しご連絡いたします。', 'かくにんして、おりかえしごれんらくいたします。', 'わかりません。', 'Khi chưa biết câu trả lời.'],
  ['申し訳ございません、予定より二日ほど遅れる見込みです。', 'もうしわけございません、よていよりふつかほどおくれるみこみです。', '遅れます。', 'Báo chậm tiến độ.', 'Kèm con số cụ thể.'],
  ['現在の仕様では、そのような動作となっております。', 'げんざいのしようでは、そのようなどうさとなっております。', 'それは仕様です。', 'Giải thích hành vi đúng spec mà không làm khách phật ý.'],
  ['お手数ですが、ご回答いただけますと幸いです。', 'おてすうですが、ごかいとういただけますとさいわいです。', '早く返事をください。', 'Hối thúc trả lời.'],
  ['一点、気になる箇所がございます。', 'いってん、きになるかしょがございます。', '間違っています。', 'Chỉ ra lỗi của đối phương.'],
  ['申し訳ありません、こちらでは把握できておりませんでした。', 'もうしわけありません、こちらではあくできておりませんでした。', '聞いていません。', 'Khi chưa được thông báo trước.'],
  ['期限内に完了させるのは厳しいと考えております。', 'きげんないにかんりょうさせるのはきびしいとかんがえております。', '無理です。', 'Khi deadline không khả thi.'],
  ['調査した結果、仕様通りの動作であることを確認いたしました。', 'ちょうさしたけっか、しようどおりのどうさであることをかくにんいたしました。', 'バグではありません。', 'Trả lời báo lỗi mà thật ra không phải lỗi.'],
  ['恐れ入りますが、詳しく教えていただけますでしょうか。', 'おそれいりますが、くわしくおしえていただけますでしょうか。', '何ですか。', 'Hỏi lại khi chưa hiểu.'],
  ['承知いたしました。', 'しょうちいたしました。', '了解です。', 'Trả lời "đã hiểu" với khách hàng, cấp trên.'],
  ['お疲れさまです。', 'おつかれさまです。', 'ご苦労さまです。', 'Chào cấp trên.', 'ご苦労さま là cấp trên nói với cấp dưới.'],
  ['ご確認いただけますでしょうか。', 'ごかくにんいただけますでしょうか。', '確認してください。', 'Nhờ kiểm tra.'],
  ['先日もお伝えしましたが、念のため改めてご説明いたします。', 'せんじつもおつたえしましたが、ねんのためあらためてごせつめいいたします。', '前にも言いました。', 'Khi phải giải thích lại điều đã nói.'],
  ['対応いたします。', 'たいおういたします。', 'やります。', 'Nhận việc.'],
  ['問題ございません。予定どおり進めます。', 'もんだいございません。よていどおりすすめます。', '大丈夫です。', 'Xác nhận rõ ràng.', '大丈夫です dễ bị hiểu hai nghĩa (được / không cần).'],
  ['テストは未実施のため、本日中に実施いたします。', 'テストはみじっしのため、ほんじつちゅうにじっしいたします。', 'テストしてません。', 'Báo chưa test.'],
  ['お客様から、そのようなご要望をいただいております。', 'おきゃくさまから、そのようなごようぼうをいただいております。', 'お客さんが言ってた。', 'Truyền đạt yêu cầu của khách.'],
  ['申し訳ありません、十五時以降であれば対応可能です。', 'もうしわけありません、じゅうごじいこうであればたいおうかのうです。', '今忙しいです。', 'Khi đang bận.'],
  ['大変申し訳ございません。', 'たいへんもうしわけございません。', 'すみません。', 'Xin lỗi khi gây sự cố.', 'すみません quá nhẹ khi đã gây ảnh hưởng cho khách.'],
];

// ------------------------------------------------------------------ IT emails

const EMAILS: Phrase[] = [
  [
    '【ご確認のお願い】会員登録画面の仕様について',
    '【ごかくにんのおねがい】かいいんとうろくがめんのしようについて',
    'Nhờ khách xác nhận điểm mơ hồ trong spec, nêu rõ vị trí, phương án đề xuất và hạn trả lời.',
    '株式会社ABC 山田様\n\nいつもお世話になっております。サクラシステムの田中です。\n会員登録画面の仕様について、一点ご確認をお願いいたします。\n\n■確認事項\n仕様書（v1.2）三ページ目では電話番号「ハイフンあり」、画面イメージでは「ハイフンなし」となっております。\n\n■当方の想定\nハイフンなし・半角数字のみで実装する想定です。\n\n恐れ入りますが、九月二十四日（水）までにご回答いただけますと幸いです。\nよろしくお願いいたします。\n\nサクラシステム 田中',
  ],
  [
    '【進捗報告】第三週（9月15日〜9月19日）',
    '【しんちょくほうこく】だいさんしゅう（くがつじゅうごにち〜くがつじゅうくにち）',
    'Báo cáo tiến độ tuần: tổng quan, việc đã xong, việc tuần sau, vấn đề.',
    '山田様\n\nお世話になっております。田中です。\n今週の進捗をご報告いたします。\n\n■全体進捗：七十パーセント（予定どおり）\n■今週の実績\n・注文一覧画面：実装完了\n・注文詳細画面：単体テスト完了\n■来週の予定\n・結合テスト開始\n■課題・懸念点\n・在庫APIの応答が遅く、結合テストに影響する可能性があります。\n\n以上、よろしくお願いいたします。',
  ],
  [
    '【障害報告・第一報】本番環境のログイン障害について',
    '【しょうがいほうこく・だいいっぽう】ほんばんかんきょうのログインしょうがいについて',
    'Báo cáo sự cố lần đầu: hiện tượng, thời điểm, phạm vi, tình trạng xử lý, lần báo tiếp theo.',
    '関係者各位\n\nお世話になっております。サクラシステムの田中です。\n本番環境にて障害が発生しておりますので、第一報としてご報告いたします。\n\n■発生日時：九月十九日 十時五分ごろ\n■事象：スマートフォンからログインできない\n■影響範囲：スマートフォン利用者（PCは影響なし）\n■現在の状況：原因調査中\n■次回報告：十一時までにご報告いたします\n\nご迷惑をおかけし、誠に申し訳ございません。',
  ],
  [
    '【障害報告・最終報】ログイン障害の原因と再発防止策について',
    '【しょうがいほうこく・さいしゅうほう】ログインしょうがいのげんいんとさいはつぼうしさくについて',
    'Báo cáo sự cố cuối cùng: nguyên nhân, xử lý đã làm, biện pháp phòng tái phát.',
    '関係者各位\n\nお世話になっております。田中です。\n先日のログイン障害について、最終報告をいたします。\n\n■原因：証明書の更新作業で、スマートフォン向けの設定が漏れていたため\n■対応：十一時二十分に設定を修正し、復旧を確認しました\n■再発防止策：\n・更新作業の手順書にチェック項目を追加\n・作業後の確認を二名体制で実施\n\n多大なご迷惑をおかけしましたことを、改めてお詫び申し上げます。',
  ],
  [
    '【ご相談】リリース日程の調整について',
    '【ごそうだん】リリースにっていのちょうせいについて',
    'Xin trao đổi lùi lịch release: nguyên nhân, mức chậm, hai phương án.',
    '鈴木様\n\nお世話になっております。田中です。\n帳票機能の開発に遅れが生じており、リリース日程についてご相談させてください。\n\n■状況：外部システムとの連携仕様の確定が遅れたため、三営業日の遅れが見込まれます\n■ご提案\n案1：帳票以外を予定どおり十五日にリリースし、帳票は十八日に追加リリース\n案2：要員を一名追加し、十五日に全機能をリリース（追加費用あり）\n\nお忙しいところ恐縮ですが、ご判断いただけますと幸いです。',
  ],
  [
    '【お見積もり】CSV出力機能の追加について',
    '【おみつもり】シーエスブイしゅつりょくきのうのついかについて',
    'Gửi báo giá chức năng bổ sung kèm công số và điều kiện tiền đề.',
    '山田様\n\nお世話になっております。田中です。\nご依頼いただいたCSV出力機能の追加について、お見積もりをお送りいたします。\n\n■工数：三人日（設計〇・五、製造一・五、テスト一）\n■前提条件：出力項目は画面表示項目と同一とします\n■リリース可能日：ご発注から五営業日後\n\n詳細は添付の見積書をご確認ください。\nよろしくお願いいたします。',
  ],
  [
    '【リリース完了のご報告】バージョン2.1',
    '【リリースかんりょうのごほうこく】バージョンにてんいち',
    'Báo cáo release xong: thời gian, nội dung, kết quả kiểm tra.',
    '関係者各位\n\nお疲れさまです。田中です。\n本日予定しておりましたバージョン2.1の本番リリースが完了しましたので、ご報告いたします。\n\n■作業時間：二十二時〜二十三時十五分\n■リリース内容：検索機能の改善、不具合修正三件\n■動作確認：確認項目二十件、すべて問題なし\n\n明朝は九時から一時間、ログの監視を強化いたします。',
  ],
  [
    '【仕様変更のご確認】消費税の端数処理について',
    '【しようへんこうのごかくにん】しょうひぜいのはすうしょりについて',
    'Xác nhận thay đổi đặc tả: nội dung, phạm vi ảnh hưởng, công số, việc cần khách quyết.',
    '山田様\n\nお世話になっております。田中です。\n本日お打ち合わせした仕様変更について、内容をご確認ください。\n\n■変更内容：消費税の端数処理を切り捨てから四捨五入に変更\n■影響範囲：注文画面、請求書出力、月次集計\n■過去データ：変更しない（変更日以降の注文のみ対象）\n■工数：五人日\n\n認識に相違がございましたら、ご指摘いただけますと幸いです。',
  ],
  [
    '【休暇のご連絡】9月25日（木）',
    '【きゅうかのごれんらく】くがつにじゅうごにち（もく）',
    'Báo nghỉ phép: ngày nghỉ, người thay thế, cách liên lạc khi khẩn cấp.',
    '関係者各位\n\nお疲れさまです。田中です。\n私用のため、九月二十五日（木）はお休みをいただきます。\n\n不在中のご連絡は、佐藤までお願いいたします。\n急ぎの件は、チャットにご連絡いただければ確認いたします。\n\nご迷惑をおかけしますが、よろしくお願いいたします。',
  ],
  [
    '【ご回答】QA表No.12〜No.15について',
    '【ごかいとう】キューエーひょうナンバーじゅうに〜ナンバーじゅうごについて',
    'Trả lời các câu hỏi trong bảng Q&A, ghi rõ số mục đã trả lời và còn tồn.',
    '山田様\n\nお世話になっております。田中です。\nQA表のNo.12〜No.15について、回答を記載いたしました。\n\n・No.12〜No.14：回答済み\n・No.15：確認中のため、九月二十二日（月）までに回答いたします\n\n最新版のQA表を添付いたしますので、ご確認をお願いいたします。',
  ],
];

// ------------------------------------------------------------------ topics

export const IT_TOPICS: BusinessTopic[] = [
  {
    id: 'it-glossary',
    group: 'it',
    kind: 'glossary',
    title: 'Thuật ngữ IT (IT用語)',
    intro: 'Từ vựng hay gặp trong dự án phần mềm với khách hàng Nhật, chia theo công đoạn, tài liệu, chất lượng, quản lý dự án và kỹ thuật. Mỗi từ kèm một câu ví dụ.',
    items: [
      ...terms('process', PROCESS),
      ...terms('docs', DOCS),
      ...terms('quality', QUALITY),
      ...terms('pm', PM),
      ...terms('tech', TECH),
    ],
  },
  {
    id: 'it-scenarios',
    group: 'it',
    kind: 'scenarios',
    title: 'Tình huống thực tế BrSE',
    intro: 'Hội thoại theo tình huống cụ thể giữa BrSE, khách hàng Nhật và team offshore. Đọc lưu ý ở cuối mỗi tình huống, rồi luyện đóng vai: máy đọc lời đối phương, bạn nói phần của mình.',
    items: [],
    scenarios: SCENARIOS,
  },
  {
    id: 'it-standup',
    group: 'it',
    kind: 'phrases',
    title: 'Họp sáng & báo cáo tiến độ (朝会・進捗報告)',
    intro: 'Báo cáo theo thứ tự: hôm qua đã làm gì → hôm nay làm gì → vấn đề/rủi ro. Luôn kèm con số cụ thể.',
    items: phrases('standup', STANDUP),
  },
  {
    id: 'it-spec',
    group: 'it',
    kind: 'phrases',
    title: 'Xác nhận đặc tả & hỏi đáp (仕様確認・QA)',
    intro: 'Khi hỏi spec: chỉ rõ vị trí, nêu cách hiểu của mình, đề xuất phương án và hạn trả lời. Ghi lại vào QA表.',
    items: phrases('spec', SPEC),
  },
  {
    id: 'it-estimate',
    group: 'it',
    kind: 'phrases',
    title: 'Báo giá & lịch trình (見積もり・スケジュール)',
    intro: 'Giải thích căn cứ bằng công số (人日), nêu điều kiện tiền đề, và luôn có phương án thay thế khi phải lùi lịch.',
    items: phrases('estimate', ESTIMATE),
  },
  {
    id: 'it-bug',
    group: 'it',
    kind: 'phrases',
    title: 'Lỗi & sự cố (不具合・障害対応)',
    intro: 'Quy trình báo sự cố: 第一報 (báo ngay) → báo tiến triển → 最終報 (nguyên nhân, xử lý, phòng tái phát).',
    items: phrases('bug', BUG),
  },
  {
    id: 'it-review',
    group: 'it',
    kind: 'phrases',
    title: 'Review & góp ý (レビュー・指摘)',
    intro: 'Nhận góp ý không phòng thủ, đưa góp ý mềm mỏng bằng 〜ようです／〜ように見えます.',
    items: phrases('review', REVIEW),
  },
  {
    id: 'it-request',
    group: 'it',
    kind: 'phrases',
    title: 'Nhờ việc & hối thúc (依頼・催促)',
    intro: 'Nhờ khách hàng thì dùng cushion words (恐縮ですが, お手数ですが). Nhờ team offshore thì câu ngắn, rõ đầu ra và hạn.',
    items: phrases('request', REQUEST),
  },
  {
    id: 'it-negotiation',
    group: 'it',
    kind: 'phrases',
    title: 'Từ chối & đàm phán (断り・交渉)',
    intro: 'Không nói thẳng "không được". Hãy nêu lý do, căn cứ vào tài liệu đã chốt, rồi đưa phương án thay thế.',
    items: phrases('negotiation', NEGOTIATION),
  },
  {
    id: 'it-online',
    group: 'it',
    kind: 'phrases',
    title: 'Họp online (Teams・Zoom)',
    intro: 'Mẫu câu khi họp trực tuyến: kiểm tra âm thanh, chia sẻ màn hình, xin nói lại, chốt kết luận.',
    items: phrases('online', ONLINE),
  },
  {
    id: 'it-chat',
    group: 'it',
    kind: 'phrases',
    title: 'Chat & comment Backlog (チャット・チケット)',
    intro: 'Văn phong ngắn gọn nhưng vẫn lịch sự trên Slack, Teams, Backlog, Redmine.',
    items: phrases('chat', CHAT),
  },
  {
    id: 'it-rephrase',
    group: 'it',
    kind: 'rephrase',
    title: 'Nói mềm mỏng (NG → OK)',
    intro: 'Những câu nói thẳng dễ làm khách hàng Nhật phật ý, và cách nói nên dùng thay thế.',
    items: REPHRASE.map(([ok, reading, ng, vi, note], i) => {
      const it: BusinessItem = { id: `b-it-rephrase-${pad(i + 1)}`, ja: ok, reading, ng, vi, category: 'rephrase' };
      if (note) it.note = note;
      return it;
    }),
  },
  {
    id: 'it-email',
    group: 'it',
    kind: 'email',
    title: 'Email dự án IT',
    intro: 'Tiêu đề email IT thường có 【 】 để người nhận biết ngay loại mail. Nội dung chia mục bằng ■ và gạch đầu dòng.',
    items: phrases('email', EMAILS).map((it) => ({ ...it, note: it.note })),
  },
];

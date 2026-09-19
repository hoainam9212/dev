import type { BusinessCategory, BusinessItem, BusinessTopic } from '@nihongo/shared';
import { IT_TOPICS } from './business-it';

type KeigoRow = [plain: string, reading: string, vi: string, sonkei: string, kenjou: string, teinei: string];
type Phrase = [ja: string, reading: string, vi: string, note?: string];

function items(category: BusinessCategory, rows: Phrase[]): BusinessItem[] {
  return rows.map(([ja, reading, vi, note], i) => {
    const it: BusinessItem = { id: `b-${category}-${String(i + 1).padStart(2, '0')}`, ja, reading, vi, category };
    if (note) it.note = note;
    return it;
  });
}

const KEIGO: KeigoRow[] = [
  ['する', 'する', 'làm', 'なさる', 'いたす', 'します'],
  ['言う', 'いう', 'nói', 'おっしゃる', '申す・申し上げる', '言います'],
  ['行く', 'いく', 'đi', 'いらっしゃる', '参る・伺う', '行きます'],
  ['来る', 'くる', 'đến', 'いらっしゃる・お越しになる', '参る', '来ます'],
  ['いる', 'いる', 'ở, có (người)', 'いらっしゃる', 'おる', 'います'],
  ['見る', 'みる', 'xem', 'ご覧になる', '拝見する', '見ます'],
  ['聞く', 'きく', 'nghe, hỏi', 'お聞きになる', '伺う・拝聴する', '聞きます'],
  ['食べる', 'たべる', 'ăn', '召し上がる', 'いただく', '食べます'],
  ['飲む', 'のむ', 'uống', '召し上がる', 'いただく', '飲みます'],
  ['知る', 'しる', 'biết', 'ご存じだ', '存じる・存じ上げる', '知っています'],
  ['思う', 'おもう', 'nghĩ', 'お思いになる', '存じる', '思います'],
  ['会う', 'あう', 'gặp', 'お会いになる', 'お目にかかる', '会います'],
  ['あげる', 'あげる', 'cho, tặng', 'くださる', '差し上げる', 'あげます'],
  ['もらう', 'もらう', 'nhận', 'お受け取りになる', 'いただく・頂戴する', 'もらいます'],
  ['くれる', 'くれる', 'cho (tôi)', 'くださる', '—', 'くれます'],
  ['読む', 'よむ', 'đọc', 'お読みになる', '拝読する', '読みます'],
  ['書く', 'かく', 'viết', 'お書きになる', 'お書きする', '書きます'],
  ['話す', 'はなす', 'nói chuyện', 'お話しになる', 'お話しする', '話します'],
  ['帰る', 'かえる', 'về', 'お帰りになる', '失礼する', '帰ります'],
  ['待つ', 'まつ', 'đợi', 'お待ちになる', 'お待ちする', '待ちます'],
  ['借りる', 'かりる', 'mượn', 'お借りになる', '拝借する', '借ります'],
  ['死ぬ', 'しぬ', 'chết', 'お亡くなりになる', '—', '亡くなります'],
  ['着る', 'きる', 'mặc', 'お召しになる', '—', '着ます'],
  ['買う', 'かう', 'mua', 'お買いになる・お求めになる', '—', '買います'],
  ['送る', 'おくる', 'gửi', 'お送りになる', 'お送りする', '送ります'],
  ['伝える', 'つたえる', 'truyền đạt', 'お伝えになる', 'お伝えする', '伝えます'],
  ['教える', 'おしえる', 'chỉ dạy', 'お教えになる', 'お教えする・ご説明する', '教えます'],
  ['見せる', 'みせる', 'cho xem', 'お見せになる', 'お見せする・ご覧に入れる', '見せます'],
  ['訪ねる', 'たずねる', 'thăm', 'お訪ねになる', '伺う・お邪魔する', '訪ねます'],
  ['質問する', 'しつもんする', 'hỏi', 'ご質問なさる', '伺う・お尋ねする', '質問します'],
  ['わかる', 'わかる', 'hiểu', 'おわかりになる', '承知する・かしこまる', 'わかります'],
  ['受け取る', 'うけとる', 'nhận (đồ)', 'お受け取りになる', '拝受する', '受け取ります'],
  ['考える', 'かんがえる', 'suy nghĩ', 'お考えになる', '検討する', '考えます'],
  ['連絡する', 'れんらくする', 'liên lạc', 'ご連絡なさる', 'ご連絡する・ご連絡差し上げる', '連絡します'],
  ['説明する', 'せつめいする', 'giải thích', 'ご説明なさる', 'ご説明する', '説明します'],
  ['利用する', 'りようする', 'sử dụng', 'ご利用になる', '利用させていただく', '利用します'],
  ['決める', 'きめる', 'quyết định', 'お決めになる', '決めさせていただく', '決めます'],
  ['座る', 'すわる', 'ngồi', 'お掛けになる', '座らせていただく', '座ります'],
  ['休む', 'やすむ', 'nghỉ', 'お休みになる', '休ませていただく', '休みます'],
  ['持つ', 'もつ', 'cầm, mang', 'お持ちになる', 'お持ちする', '持ちます'],
  ['案内する', 'あんないする', 'hướng dẫn', 'ご案内なさる', 'ご案内する', '案内します'],
  ['呼ぶ', 'よぶ', 'gọi', 'お呼びになる', 'お呼びする', '呼びます'],
];

const keigoItems: BusinessItem[] = KEIGO.map(([ja, reading, vi, sonkei, kenjou, teinei], i) => ({
  id: `b-keigo-${String(i + 1).padStart(2, '0')}`,
  ja,
  reading,
  vi,
  category: 'keigo',
  keigo: { sonkei, kenjou, teinei },
}));

const EMAIL: Phrase[] = [
  [
    '初めまして（株式会社サクラ・田中）',
    'はじめまして（かぶしきがいしゃサクラ・たなか）',
    'Email chào hỏi lần đầu: giới thiệu bản thân, công ty và lý do liên hệ; kết thúc bằng lời nhờ xác nhận.',
    '株式会社ABC 山田様\n\n初めてご連絡いたします。株式会社サクラの田中と申します。\nこの度は、新製品カタログの件でご連絡差し上げました。\nご多忙のところ恐縮ですが、ご確認のほどよろしくお願いいたします。\n\n株式会社サクラ 田中太郎',
  ],
  [
    '本日の打ち合わせのお礼',
    'ほんじつのうちあわせのおれい',
    'Email cảm ơn sau buổi họp: cảm ơn thời gian, hứa xem xét nội bộ và liên hệ lại.',
    '山田様\n\n本日はお忙しい中、お時間をいただき誠にありがとうございました。\nご提案いただいた内容につきましては、社内で検討のうえ、改めてご連絡いたします。\n今後ともよろしくお願い申し上げます。\n\n田中',
  ],
  [
    '納品遅延のお詫び',
    'のうひんちえんのおわび',
    'Email xin lỗi vì giao hàng trễ: xin lỗi sâu sắc, nêu nguyên nhân và biện pháp phòng ngừa.',
    '山田様\n\nこのたびは納品が遅れ、ご迷惑をおかけしましたことを深くお詫び申し上げます。\n原因は部品の入荷遅れであり、再発防止のため在庫管理を徹底いたします。\n何卒ご容赦くださいますようお願い申し上げます。\n\n田中',
  ],
  [
    '打ち合わせ日程のご相談',
    'うちあわせにっていのごそうだん',
    'Email hẹn lịch họp: đề xuất hai khung giờ và nhờ chọn thời gian phù hợp.',
    '山田様\n\nいつもお世話になっております。\n次回の打ち合わせについて、下記の日程でご都合はいかがでしょうか。\n・6月10日（月）14:00〜\n・6月12日（水）10:00〜\nご都合の良い日時をお知らせいただけますと幸いです。\n\n田中',
  ],
  [
    '進捗のご報告',
    'しんちょくのごほうこく',
    'Email báo cáo tiến độ: nêu phần trăm hoàn thành và dự kiến bàn giao.',
    '山田様\n\nお世話になっております。\nプロジェクトの進捗をご報告いたします。\n現在、全体の七割が完了しており、予定どおり来月末に納品できる見込みです。\nご不明な点がございましたら、お気軽にお問い合わせください。\n\n田中',
  ],
  [
    '資料送付のお願い',
    'しりょうそうふのおねがい',
    'Email nhờ gửi tài liệu: xin lỗi làm phiền và nhờ gửi tài liệu đã trao đổi.',
    '山田様\n\nお世話になっております。\n恐れ入りますが、先日お話しいただいた価格表の資料をお送りいただけますでしょうか。\nお手数をおかけしますが、よろしくお願いいたします。\n\n田中',
  ],
  [
    '本日の会議欠席のご連絡',
    'ほんじつのかいぎけっせきのごれんらく',
    'Email báo vắng họp: lý do sức khỏe, hứa đọc biên bản sau và xin lỗi.',
    '各位\n\nお疲れさまです。田中です。\n体調不良のため、本日の定例会議を欠席させていただきます。\n議事録は後ほど確認いたします。\nご迷惑をおかけして申し訳ありません。',
  ],
];

const PHONE: Phrase[] = [
  ['お電話ありがとうございます。株式会社サクラの田中でございます。', 'おでんわありがとうございます。かぶしきがいしゃサクラのたなかでございます。', 'Cảm ơn quý khách đã gọi. Tanaka, công ty Sakura xin nghe.'],
  ['恐れ入りますが、どちら様でしょうか。', 'おそれいりますが、どちらさまでしょうか。', 'Xin lỗi, cho hỏi ai đang gọi ạ?'],
  ['山田はただいま席を外しております。', 'やまだはただいませきをはずしております。', 'Anh/chị Yamada hiện đang không có ở chỗ.'],
  ['折り返しお電話を差し上げましょうか。', 'おりかえしおでんわをさしあげましょうか。', 'Chúng tôi gọi lại cho quý vị nhé?'],
  ['少々お待ちください。', 'しょうしょうおまちください。', 'Xin đợi một chút.'],
  ['お待たせいたしました。', 'おまたせいたしました。', 'Xin lỗi đã để quý vị chờ.'],
  ['申し訳ございません、お電話が遠いようです。', 'もうしわけございません、おでんわがとおいようです。', 'Xin lỗi, tín hiệu điện thoại hơi kém.'],
  ['念のため、お電話番号をお伺いしてもよろしいでしょうか。', 'ねんのため、おでんわばんごうをおうかがいしてもよろしいでしょうか。', 'Để chắc chắn, cho tôi xin số điện thoại được không ạ?'],
  ['山田に申し伝えます。', 'やまだにもうしつたえます。', 'Tôi sẽ chuyển lời cho Yamada.'],
  ['お忙しいところ恐れ入ります。ABCの田中と申します。', 'おいそがしいところおそれいります。エービーシーのたなかともうします。', 'Xin lỗi đã làm phiền lúc bận. Tôi là Tanaka bên ABC.'],
  ['山田様はいらっしゃいますでしょうか。', 'やまださまはいらっしゃいますでしょうか。', 'Anh/chị Yamada có ở đó không ạ?'],
  ['それでは、失礼いたします。', 'それでは、しつれいいたします。', 'Vậy tôi xin phép (kết thúc cuộc gọi).'],
];

const MEETING: Phrase[] = [
  ['それでは、会議を始めさせていただきます。', 'それでは、かいぎをはじめさせていただきます。', 'Vậy xin phép bắt đầu cuộc họp.'],
  ['本日の議題は三点ございます。', 'ほんじつのぎだいはさんてんございます。', 'Hôm nay có ba nội dung nghị sự.'],
  ['ご意見のある方はいらっしゃいますか。', 'ごいけんのあるかたはいらっしゃいますか。', 'Có ai có ý kiến không ạ?'],
  ['おっしゃるとおりだと思います。', 'おっしゃるとおりだとおもいます。', 'Tôi nghĩ đúng như anh/chị nói.'],
  ['一点確認させていただいてもよろしいでしょうか。', 'いってんかくにんさせていただいてもよろしいでしょうか。', 'Cho tôi xác nhận một điểm được không ạ?'],
  ['恐縮ですが、別の案を提案させていただきます。', 'きょうしゅくですが、べつのあんをていあんさせていただきます。', 'Xin phép được đề xuất một phương án khác.'],
  ['その件については持ち帰って検討いたします。', 'そのけんについてはもちかえってけんとういたします。', 'Về việc đó, chúng tôi sẽ mang về xem xét.'],
  ['時間の関係で、次の議題に移らせていただきます。', 'じかんのかんけいで、つぎのぎだいにうつらせていただきます。', 'Vì thời gian, xin chuyển sang nội dung tiếp theo.'],
  ['本日決まったことをまとめます。', 'ほんじつきまったことをまとめます。', 'Tôi tổng kết những gì đã quyết hôm nay.'],
  ['資料の三ページをご覧ください。', 'しりょうのさんページをごらんください。', 'Xin xem trang ba của tài liệu.'],
  ['結論から申し上げますと、来月の発売は可能です。', 'けつろんからもうしあげますと、らいげつのはつばいはかのうです。', 'Nói kết luận trước, có thể phát hành vào tháng sau.'],
  ['以上で会議を終了いたします。ありがとうございました。', 'いじょうでかいぎをしゅうりょういたします。ありがとうございました。', 'Cuộc họp kết thúc tại đây. Xin cảm ơn.'],
];

const MEISHI: Phrase[] = [
  ['初めまして。株式会社サクラの田中と申します。', 'はじめまして。かぶしきがいしゃサクラのたなかともうします。', 'Rất hân hạnh. Tôi là Tanaka, công ty Sakura.', 'Đưa danh thiếp bằng hai tay, mặt chữ hướng về phía đối phương.'],
  ['頂戴いたします。', 'ちょうだいいたします。', 'Xin nhận (danh thiếp).', 'Nhận bằng hai tay, không che tên và logo.'],
  ['どうぞよろしくお願いいたします。', 'どうぞよろしくおねがいいたします。', 'Rất mong được giúp đỡ.'],
  ['恐れ入ります。名刺を切らしておりまして。', 'おそれいります。めいしをきらしておりまして。', 'Xin lỗi, tôi vừa hết danh thiếp.'],
  ['失礼ですが、お名前は何とお読みすればよろしいでしょうか。', 'しつれいですが、おなまえはなんとおよみすればよろしいでしょうか。', 'Xin lỗi, tên anh/chị đọc thế nào ạ?'],
  ['こちらこそ、よろしくお願いいたします。', 'こちらこそ、よろしくおねがいいたします。', 'Tôi cũng rất mong được giúp đỡ.'],
  ['両手でお渡しいたします。', 'りょうてでおわたしいたします。', 'Tôi xin đưa bằng hai tay.', 'Người có vị trí thấp hơn đưa danh thiếp trước và ở vị trí thấp hơn.'],
  ['名刺はテーブルの上に置かせていただきます。', 'めいしはテーブルのうえにおかせていただきます。', 'Tôi xin đặt danh thiếp lên bàn.', 'Trong buổi họp, đặt danh thiếp theo thứ tự chỗ ngồi của đối phương.'],
  ['お先に失礼いたします。', 'おさきにしつれいいたします。', 'Tôi xin phép về trước.'],
  ['またご連絡させていただきます。', 'またごれんらくさせていただきます。', 'Tôi sẽ liên lạc lại sau.'],
];

const INTERVIEW: Phrase[] = [
  ['本日はお時間をいただき、ありがとうございます。', 'ほんじつはおじかんをいただき、ありがとうございます。', 'Cảm ơn quý công ty đã dành thời gian hôm nay.'],
  ['ハノイ大学経済学部の田中と申します。', 'ハノイだいがくけいざいがくぶのたなかともうします。', 'Tôi là Tanaka, khoa Kinh tế, Đại học Hà Nội.'],
  ['御社を志望した理由は、海外事業に魅力を感じたからです。', 'おんしゃをしぼうしたりゆうは、かいがいじぎょうにみりょくをかんじたからです。', 'Lý do tôi ứng tuyển là bị thu hút bởi mảng kinh doanh quốc tế của quý công ty.'],
  ['私の強みは、最後までやり遂げる責任感です。', 'わたしのつよみは、さいごまでやりとげるせきにんかんです。', 'Điểm mạnh của tôi là tinh thần trách nhiệm làm đến cùng.'],
  ['前職では営業として三年間勤務しておりました。', 'ぜんしょくではえいぎょうとしてさんねんかんきんむしておりました。', 'Ở công ty trước tôi làm kinh doanh ba năm.'],
  ['入社後は一日も早く戦力になれるよう努力いたします。', 'にゅうしゃごはいちにちもはやくせんりょくになれるようどりょくいたします。', 'Sau khi vào công ty tôi sẽ nỗ lực để sớm đóng góp.'],
  ['はい、承知いたしました。', 'はい、しょうちいたしました。', 'Vâng, tôi đã hiểu.'],
  ['一つ質問させていただいてもよろしいでしょうか。', 'ひとつしつもんさせていただいてもよろしいでしょうか。', 'Cho phép tôi hỏi một câu được không ạ?'],
  ['貴重なお話をありがとうございました。', 'きちょうなおはなしをありがとうございました。', 'Cảm ơn những chia sẻ quý báu.'],
  ['本日はありがとうございました。失礼いたします。', 'ほんじつはありがとうございました。しつれいいたします。', 'Cảm ơn quý vị hôm nay. Tôi xin phép.'],
];

const DAILY: Phrase[] = [
  ['おはようございます。', 'おはようございます。', 'Chào buổi sáng.'],
  ['お疲れさまです。', 'おつかれさまです。', 'Anh/chị vất vả rồi (chào đồng nghiệp).'],
  ['お先に失礼します。', 'おさきにしつれいします。', 'Tôi xin phép về trước.'],
  ['いつもお世話になっております。', 'いつもおせわになっております。', 'Cảm ơn anh/chị luôn giúp đỡ.'],
  ['承知いたしました。', 'しょうちいたしました。', 'Tôi đã hiểu (khiêm nhường).'],
  ['かしこまりました。', 'かしこまりました。', 'Vâng, tôi hiểu rồi ạ.'],
  ['少々お待ちいただけますでしょうか。', 'しょうしょうおまちいただけますでしょうか。', 'Xin đợi một chút được không ạ?'],
  ['ご確認のほどよろしくお願いいたします。', 'ごかくにんのほどよろしくおねがいいたします。', 'Rất mong anh/chị xác nhận.'],
  ['お手数をおかけして申し訳ございません。', 'おてすうをおかけしてもうしわけございません。', 'Xin lỗi đã làm phiền anh/chị.'],
  ['引き続きよろしくお願いいたします。', 'ひきつづきよろしくおねがいいたします。', 'Mong tiếp tục được hợp tác.'],
];

export const BUSINESS: BusinessTopic[] = [
  {
    id: 'keigo',
    group: 'basic',
    kind: 'keigo',
    title: 'Kính ngữ (敬語)',
    intro: 'Ba loại kính ngữ: 尊敬語 (tôn kính, nâng đối phương), 謙譲語 (khiêm nhường, hạ mình), 丁寧語 (lịch sự, dạng ます/です). Bảng dưới liệt kê các động từ hay gặp nhất.',
    items: keigoItems,
  },
  {
    id: 'email',
    group: 'basic',
    kind: 'email',
    title: 'Email công việc',
    intro: 'Cấu trúc email chuẩn: 件名 (tiêu đề) → 宛名 (người nhận) → 挨拶 (chào hỏi) → 本文 (nội dung) → 結び (kết) → 署名 (chữ ký). Chạm tiêu đề để xem toàn văn.',
    items: items('email', EMAIL),
  },
  {
    id: 'phone',
    group: 'basic',
    kind: 'phrases',
    title: 'Điện thoại',
    intro: 'Khi nhận điện thoại, xưng tên công ty trước; khi gọi, xin lỗi vì làm phiền rồi mới xưng tên.',
    items: items('phone', PHONE),
  },
  {
    id: 'meeting',
    group: 'basic',
    kind: 'phrases',
    title: 'Họp',
    intro: 'Mẫu câu mở đầu, nêu ý kiến, xác nhận, chuyển chủ đề và kết thúc cuộc họp.',
    items: items('meeting', MEETING),
  },
  {
    id: 'meishi',
    group: 'basic',
    kind: 'phrases',
    title: 'Trao danh thiếp (名刺交換)',
    intro: 'Người vị trí thấp hơn trao trước, cầm hai tay, đọc kỹ tên và không cất danh thiếp ngay.',
    items: items('meishi', MEISHI),
  },
  {
    id: 'interview',
    group: 'basic',
    kind: 'phrases',
    title: 'Phỏng vấn (面接)',
    intro: 'Tự giới thiệu ngắn gọn, nêu lý do ứng tuyển và điểm mạnh theo cấu trúc kết luận → lý do → ví dụ.',
    items: items('interview', INTERVIEW),
  },
  {
    id: 'daily',
    group: 'basic',
    kind: 'phrases',
    title: 'Giao tiếp hàng ngày ở công ty',
    intro: 'Các câu chào hỏi và cụm cố định dùng mỗi ngày trong văn phòng Nhật.',
    items: items('daily', DAILY),
  },
  ...IT_TOPICS,
];

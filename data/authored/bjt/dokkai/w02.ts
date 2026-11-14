import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

// Week 2 — điện thoại và tiếp khách (J2 → J1).
export const W02: BjtItem[] = [
  item('w02', 'goi', 1, {
    questions: [
      [
        '申し訳ございません。田中はただいま別の電話に＿＿＿おります。',
        ['出て', 'かけて', 'つながって', '取って'],
        0,
        'Đáp án 1. 電話に出る = nghe máy, nên 別の電話に出ております = đang nghe một cuộc gọi khác. かけて và 取って cần trợ từ を (電話をかける, 電話を取る), không đi với に. つながる có chủ ngữ là cuộc gọi (電話がつながる), không phải người.',
      ],
    ],
    points: [
      ['電話に出る', 'でんわにでる', 'nghe máy'],
      ['ただいま', 'ただいま', 'hiện giờ, ngay lúc này (trang trọng)'],
    ],
  }),
  item('w02', 'goi', 2, {
    questions: [
      [
        '恐れ入りますが、もう一度お名前を＿＿＿いただけますか。',
        ['お聞き', 'お伺い', 'お聞かせ', 'お尋ね'],
        2,
        'Đáp án 3. お聞かせいただく = được (đối phương) cho nghe, tức là xin khách nói lại tên. Lựa chọn dễ nhầm là 2: お伺いする là khiêm nhường cho việc mình hỏi, ghép với いただく thành ra nhờ khách đi hỏi. お聞きいただく và お尋ねいただく cũng là nhờ khách nghe hoặc hỏi, sai người làm.',
      ],
    ],
    points: [
      ['お聞かせいただく', 'おきかせいただく', 'xin được nghe (đối phương nói)'],
      ['恐れ入りますが', 'おそれいりますが', 'xin lỗi làm phiền, nhưng…'],
    ],
  }),
  item('w02', 'goi', 3, {
    questions: [
      [
        '鈴木が戻りましたら、こちらから折り返しお電話＿＿＿。',
        ['なさいます', 'いたします', 'くださいます', 'いただきます'],
        1,
        'Đáp án 2. Suzuki là người công ty mình, việc gọi lại là việc của phía mình nên dùng khiêm nhường お電話いたします. なさいます là tôn kính, くださいます là đối phương làm cho mình. Lựa chọn 4 dễ nhầm: お電話いただきます nghĩa là mình được khách gọi tới, ngược hướng với 折り返し (phía mình gọi lại).',
      ],
    ],
    points: [
      ['折り返し', 'おりかえし', 'gọi lại (sau khi nhận cuộc gọi)'],
      ['戻る', 'もどる', 'quay về (chỗ làm)'],
    ],
  }),
  item('w02', 'goi', 4, {
    questions: [
      [
        '（受付で）恐れ入りますが、どちらの会社の方か＿＿＿よろしいでしょうか。',
        ['伺っても', 'おっしゃっても', 'お聞きになっても', '申し上げても'],
        0,
        'Đáp án 1. Lễ tân là người hỏi nên dùng khiêm nhường 伺う (hỏi). おっしゃる và お聞きになる là tôn kính, dùng cho hành động của khách. Lựa chọn 4 dễ nhầm vì cũng là khiêm nhường ngữ, nhưng 申し上げる là "nói, thưa", không phải "hỏi".',
      ],
    ],
    points: [
      ['伺ってもよろしいでしょうか', 'うかがってもよろしいでしょうか', 'cho tôi hỏi có được không ạ'],
      ['どちらの', 'どちらの', 'của nơi nào (lịch sự của どこの)'],
    ],
  }),
  item('w02', 'goi', 5, {
    questions: [
      [
        '先方の担当者が不在だったため、電話に出た方に＿＿＿をお願いした。',
        ['通知', '報告', '案内', '伝言'],
        3,
        'Đáp án 4. 伝言をお願いする = nhờ người nghe máy nhắn lại cho người vắng mặt. Lựa chọn 2 dễ nhầm, nhưng 報告 là báo cáo kết quả lên cấp trên, không dùng để nhờ người khác chuyển lời. 通知 là thông báo chính thức, 案内 là hướng dẫn, dẫn đường.',
      ],
    ],
    points: [
      ['伝言', 'でんごん', 'lời nhắn'],
      ['先方', 'せんぽう', 'phía bên kia, đối tác'],
      ['不在', 'ふざい', 'vắng mặt'],
    ],
  }),
  item('w02', 'goi', 6, {
    questions: [
      [
        '来客にお茶を出すときは、＿＿＿に座っている方から順にお出しするのが基本だ。',
        ['下座', '上座', '前列', '上司'],
        1,
        'Đáp án 2. 上座 là chỗ ngồi danh dự (xa cửa nhất), trà mời từ người ngồi ở đó trước. Lựa chọn 1 (下座) là chỗ gần cửa dành cho người tiếp khách, nên đúng loại từ nhưng ngược nghĩa. 上司 là cấp trên, không phải chỗ ngồi. 前列 là hàng ghế đầu.',
      ],
    ],
    points: [
      ['上座', 'かみざ', 'chỗ ngồi danh dự'],
      ['下座', 'しもざ', 'chỗ ngồi gần cửa (người dưới)'],
    ],
  }),
  item('w02', 'hyogen', 1, {
    material: { kind: 'text', body: 'A：中央物流の石川ですが、品質管理課の森さんをお願いできますか。\nB：あいにく森は席を外しております。戻りましたら、こちらから＿＿＿。' },
    questions: [
      [
        '空欄に入る最も適当な表現はどれですか。',
        ['お電話くださいます', 'お電話差し上げます', 'お電話になります', 'お電話いただけます'],
        1,
        'Đáp án là lựa chọn 2. Người gọi lại là Mori, người công ty mình, còn người nhận cuộc gọi là khách, nên dùng khiêm nhường ngữ お電話差し上げる. Lựa chọn 4 dễ nhầm nhất: お電話いただく nghĩa là "được khách gọi cho", tức bắt khách gọi lại, trái với こちらから. Lựa chọn 1 cũng ngược hướng, lựa chọn 3 tôn kính hành động của người nhà.',
      ],
    ],
    points: [
      ['席を外す', 'せきをはずす', 'không có mặt ở chỗ ngồi'],
      ['差し上げる', 'さしあげる', 'làm cho, biếu (khiêm nhường)'],
    ],
  }),
  item('w02', 'hyogen', 2, {
    material: { kind: 'text', body: '（訪問先の受付で）本日午後2時に営業部の高木様と＿＿＿、桜井商会の野村と申します。' },
    questions: [
      [
        '空欄に入る最も適当な表現はどれですか。',
        ['お約束なさっている', 'お会いになられる', 'ご面会される', 'お約束しております'],
        3,
        'Đáp án là lựa chọn 4. Người có hẹn là chính Nomura (khách đến thăm), nói về việc của mình nên dùng khiêm nhường お約束しております. Lựa chọn 1 dễ nhầm nhất vì nghe rất lịch sự, nhưng なさる là tôn kính ngữ, tự tôn kính hành động của mình là sai. Lựa chọn 2 là kính ngữ kép, lựa chọn 3 cũng tôn kính hành động của mình.',
      ],
    ],
    points: [
      ['約束', 'やくそく', 'cuộc hẹn'],
      ['訪問先', 'ほうもんさき', 'nơi đến thăm'],
    ],
  }),
  item('w02', 'hyogen', 3, {
    material: { kind: 'text', body: '（応接室に客を案内して）担当の者がすぐに参りますので、こちらに＿＿＿お待ちください。' },
    questions: [
      [
        '空欄に入る最も適当な表現はどれですか。',
        ['おかけになって', 'お座りになられて', 'おかけして', 'お座りして'],
        0,
        'Đáp án là lựa chọn 1. Ngồi là hành động của khách, nên dùng tôn kính おかけになる. Lựa chọn 2 dễ nhầm nhất: お座りになる thêm られる thành kính ngữ kép. Lựa chọn 3 và 4 dùng mẫu お～する, là khiêm nhường ngữ cho việc của mình, đem dùng cho khách là sai chủ thể.',
      ],
    ],
    points: [
      ['担当の者', 'たんとうのもの', 'người phụ trách (bên mình)'],
      ['おかけになる', 'おかけになる', 'ngồi (tôn kính ngữ)'],
      ['参る', 'まいる', 'đến, đi (khiêm nhường)'],
    ],
  }),
  item('w02', 'sogo-dokkai', 1, {
    material: {
      kind: 'text',
      title: 'FAX送信票',
      body: '送信日：2026年11月18日（水）\n宛先：株式会社日進工機　購買課　川島様\n発信：丸福金属株式会社　営業部　林\n送信枚数：本票を含め3枚\n\nいつもお世話になっております。お電話でご依頼いただいた部品の価格表をお送りします。2枚目が通常品、3枚目が特注品の価格表です。\nなお、特注品はご注文から納品まで約3週間かかります。12月中の納品をご希望の場合は、11月30日（月）までにご注文くださいますようお願いいたします。\n※文字が読みにくい場合はご連絡ください。PDFにて再送いたします。',
    },
    questions: [
      [
        '特注品を12月中に受け取りたい場合、川島さんはどうしなければなりませんか。',
        ['11月18日中に、林さんに電話で伝える', 'PDFで価格表を送るよう、林さんに頼む', '11月30日までに、丸福金属に注文する', '12月1日以降に、3枚目の表で注文する'],
        2,
        'Đáp án là lựa chọn 3. Sau なお, fax ghi hàng đặt riêng mất khoảng 3 tuần, muốn nhận trong tháng 12 thì phải đặt trước 30/11/2026. Lựa chọn 2 dễ nhầm nhất vì PDF có nhắc, nhưng chỉ cần khi chữ khó đọc, không liên quan đến hạn giao hàng. Ngày 18/11 chỉ là ngày gửi fax (lựa chọn 1), còn đặt từ 1/12 thì đã quá hạn (lựa chọn 4).',
      ],
    ],
    points: [
      ['送信票', 'そうしんひょう', 'tờ bìa fax'],
      ['特注品', 'とくちゅうひん', 'hàng đặt làm riêng'],
      ['宛先', 'あてさき', 'nơi nhận, người nhận'],
      ['再送', 'さいそう', 'gửi lại'],
    ],
  }),
  item('w02', 'sogo-dokkai', 2, {
    material: {
      kind: 'text',
      title: 'ご来社日程の件',
      body: '株式会社ハル電子\n開発部　坂本様\n\nいつもお世話になっております。三協化成の吉村でございます。\n12月8日（火）にご来社いただけるとのご連絡、誠にありがとうございます。\n大変申し訳ないのですが、その日は弊社工場の設備点検日にあたり、ご案内できる者がおりません。お手数をおかけしますが、12月9日（水）か10日（木）の午後でご調整いただくことは可能でしょうか。\nご無理を申し上げ恐縮ですが、ご検討のほどよろしくお願いいたします。',
    },
    questions: [
      [
        'このメールの主な目的は何ですか。',
        ['来社日を別の日にしてほしいと頼むこと', '設備点検の日程を変えたいと伝えること', '来社そのものを、理由を述べて断ること', '工場を案内する担当者を知らせること'],
        0,
        'Đáp án là lựa chọn 1. Ngày 8/12/2026 không có người tiếp vì kiểm tra thiết bị, nên Yoshimura xin khách chọn chiều 9 hoặc 10/12 (ご調整いただくことは可能でしょうか). Lựa chọn 3 dễ nhầm nhất vì thư có lời xin lỗi và lý do, nhưng chỉ từ chối ngày đó, vẫn mời khách đến ngày khác. Lịch kiểm tra là cố định, không phải điều muốn đổi (lựa chọn 2).',
      ],
    ],
    points: [
      ['ご調整', 'ごちょうせい', 'sự sắp xếp, điều chỉnh (lịch)'],
      ['点検', 'てんけん', 'kiểm tra định kỳ'],
      ['恐縮', 'きょうしゅく', 'ngại, áy náy'],
    ],
  }),
  item('w02', 'sogo-dokkai', 3, {
    material: {
      kind: 'text',
      title: '代表電話受付時間の変更について',
      body: 'お客様各位\n\n株式会社ミナミ設備\n\n平素より格別のお引き立てを賜り、誠にありがとうございます。\n弊社では、働き方の見直しに伴い、2027年1月4日（月）より代表電話の受付時間を下記のとおり変更いたします。ご不便をおかけいたしますが、何卒ご理解くださいますようお願い申し上げます。\n\n記\n平日　9時～17時30分（変更前：8時30分～18時）\n土曜　9時～12時（変更前：9時～15時）\n日曜・祝日　休み（変更なし）\n※設備の故障など緊急のご連絡は、24時間受付の専用ダイヤルをご利用ください。',
    },
    questions: [
      [
        '変更後、土曜日に代表電話で受け付けてもらえる時間はどれですか。',
        ['9時から15時まで', '8時30分から18時まで', '9時から17時30分まで', '9時から12時まで'],
        3,
        'Đáp án là lựa chọn 4. Trong 記, dòng 土曜 ghi giờ mới là 9時～12時; phần trong ngoặc (変更前) là giờ cũ. Lựa chọn 1 dễ nhầm nhất vì đó chính là giờ thứ Bảy trước khi đổi. Lựa chọn 2 và 3 là giờ ngày thường (cũ và mới). Đường dây 24 giờ chỉ dành cho báo hỏng khẩn cấp.',
      ],
    ],
    points: [
      ['代表電話', 'だいひょうでんわ', 'số điện thoại tổng đài'],
      ['受付時間', 'うけつけじかん', 'giờ tiếp nhận'],
      ['緊急', 'きんきゅう', 'khẩn cấp'],
    ],
  }),
  item('w02', 'sogo-dokkai', 4, {
    material: {
      kind: 'text',
      title: '来客の事前登録のお願い',
      body: '営業部各位\n\nお疲れさまです。総務課の内藤です。\n12月から本社ビルの入館手続きが変わり、来客の方には1階受付で、事前に登録された入館証をお渡しすることになりました。登録のない方は、確認が取れるまで受付でお待ちいただくことになります。\nつきましては、来客の予定がある場合は、来社日の前営業日の15時までに、社内サイトの「来客登録」から氏名と会社名を入力してください。月曜日の来客は、前週金曜日の15時が締め切りです。\nご協力をお願いします。',
    },
    questions: [
      [
        '12月7日（月）に来客がある場合、いつまでに登録しなければなりませんか。',
        ['12月6日（日）の15時まで', '12月4日（金）の15時まで', '12月7日（月）の15時まで', '12月3日（木）の15時まで'],
        1,
        'Đáp án là lựa chọn 2. Hạn đăng ký là 15 giờ của ngày làm việc trước hôm khách đến; khách đến thứ Hai thì hạn là 15 giờ thứ Sáu tuần trước, tức 4/12/2026. Lựa chọn 1 dễ nhầm nhất vì là "hôm trước" theo lịch, nhưng Chủ nhật không phải ngày làm việc (前営業日). Lựa chọn 3 là chính ngày khách đến, đã muộn.',
      ],
    ],
    points: [
      ['入館証', 'にゅうかんしょう', 'thẻ ra vào toà nhà'],
      ['前営業日', 'ぜんえいぎょうび', 'ngày làm việc liền trước'],
      ['事前', 'じぜん', 'trước, từ trước'],
    ],
  }),
];

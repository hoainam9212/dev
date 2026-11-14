import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

// Week 1 — làm quen đề thi, tôn kính ngữ và khiêm nhường ngữ nền (J2 → J1).
export const W01: BjtItem[] = [
  item('w01', 'goi', 1, {
    questions: [
      [
        '（社内の連絡）山田部長は、明日の午前中は大阪支社に＿＿＿予定です。',
        ['いらっしゃる', '参る', '伺う', 'おる'],
        0,
        'Đáp án 1. Đây là liên lạc trong công ty, người nói tôn trọng trưởng phòng của mình nên dùng tôn kính ngữ いらっしゃる (đi). 参る và 伺う là khiêm nhường ngữ, dùng cho hành động của mình. おる là khiêm nhường của いる và không mang nghĩa "đi".',
      ],
    ],
    points: [
      ['いらっしゃる', 'いらっしゃる', 'đi, đến, ở (tôn kính ngữ)'],
      ['支社', 'ししゃ', 'chi nhánh'],
    ],
  }),
  item('w01', 'goi', 2, {
    questions: [
      [
        'お送りいただいた企画書を＿＿＿しました。内容について、明日お電話でご相談させてください。',
        ['ご覧', 'お目にかけ', '拝見', '見学'],
        2,
        'Đáp án 3. 拝見する là khiêm nhường ngữ của 見る, dùng khi mình đọc tài liệu của đối phương. Lựa chọn dễ nhầm là 1: ご覧 là tôn kính ngữ (ご覧になる) cho hành động của đối phương, và không có dạng ご覧する. お目にかける là "cho xem", ngược hướng. 見学 là đi tham quan.',
      ],
    ],
    points: [
      ['拝見する', 'はいけんする', 'xem, đọc (khiêm nhường)'],
      ['企画書', 'きかくしょ', 'bản kế hoạch, đề án'],
    ],
  }),
  item('w01', 'goi', 3, {
    questions: [
      [
        '（取引先への電話の最初に）東和工業の村井でございます。いつも大変お世話に＿＿＿。',
        ['なっております', 'いたしております', 'されております', 'させております'],
        0,
        'Đáp án 1. お世話になっております là câu chào cố định với khách hàng: mình là người được đối phương giúp đỡ. Lựa chọn 2 (お世話いたしております) ngược hướng: thành ra mình là người chăm lo cho đối phương, nghe thất lễ. 3 và 4 không phải cách nói có thật trong tiếng Nhật.',
      ],
    ],
    points: [
      ['お世話になっております', 'おせわになっております', 'cảm ơn quý vị đã luôn giúp đỡ (câu chào)'],
      ['でございます', 'でございます', 'là (lịch sự hơn です)'],
    ],
  }),
  item('w01', 'goi', 4, {
    questions: [
      [
        '本日はお足元の悪い中、弊社まで＿＿＿いただき、誠にありがとうございます。',
        ['お伺い', 'お越し', '参上', 'お参り'],
        1,
        'Đáp án 2. お越しいただく = được khách đến thăm, tôn kính hành động của khách. Lựa chọn dễ nhầm nhất là 1: お伺い là khiêm nhường ngữ, chỉ dùng cho việc mình đến chỗ người khác, nên お伺いいただく là lỗi phổ biến. 参上 cũng là khiêm nhường. お参り là đi viếng đền chùa.',
      ],
    ],
    points: [
      ['お越しいただく', 'おこしいただく', 'được (quý khách) đến'],
      ['お足元の悪い中', 'おあしもとのわるいなか', 'trong lúc thời tiết xấu, đường khó đi'],
      ['弊社', 'へいしゃ', 'công ty chúng tôi'],
    ],
  }),
  item('w01', 'goi', 5, {
    questions: [
      [
        '（取引先へのメール）弊社の佐藤が、明日の午後二時にそちらへ＿＿＿ことになっております。',
        ['いらっしゃる', 'お見えになる', 'お越しになる', '伺う'],
        3,
        'Đáp án 4. Sato là người công ty mình nên khi viết cho khách phải dùng khiêm nhường ngữ 伺う. Cả 1, 2 và 3 đều là tôn kính ngữ, dùng cho người công ty mình trước mặt khách là sai. Lỗi dễ mắc nhất là 1, vì いらっしゃる hay dùng với cấp trên trong nội bộ.',
      ],
    ],
    points: [
      ['伺う', 'うかがう', 'đến thăm, hỏi (khiêm nhường)'],
      ['ことになっております', 'ことになっております', 'đã được sắp xếp là'],
    ],
  }),
  item('w01', 'goi', 6, {
    questions: [
      [
        '初めまして。本日付で営業二課に配属に＿＿＿、田中と申します。よろしくお願いいたします。',
        ['させました', 'なりました', 'いたしました', 'くださいました'],
        1,
        'Đáp án 2. 配属になる = được phân công về một bộ phận (do công ty quyết định). Lựa chọn 3 (配属いたしました) nghe như chính mình là người phân công ai đó, sai chủ thể. させました là bắt người khác làm, くださいました là người khác làm cho mình, đều không hợp với に.',
      ],
    ],
    points: [
      ['配属', 'はいぞく', 'phân công về bộ phận'],
      ['本日付で', 'ほんじつづけで', 'kể từ hôm nay (theo quyết định)'],
    ],
  }),
  item('w01', 'hyogen', 1, {
    material: { kind: 'text', body: '（取引先の担当者に）先日の打ち合わせで木下様が＿＿＿件ですが、社内で検討いたしました。' },
    questions: [
      [
        '空欄に入る最も適当な表現はどれですか。',
        ['おっしゃられた', '申された', 'おっしゃった', '申し上げた'],
        2,
        'Đáp án là lựa chọn 3. Người "nói" là Kinoshita, người của công ty khách, nên dùng tôn kính ngữ おっしゃる ở thì quá khứ. Lựa chọn 1 dễ nhầm nhất: おっしゃられた là kính ngữ kép (おっしゃる + られる), nghe lịch sự nhưng sai. Lựa chọn 2 và 4 dùng 申す, là khiêm nhường ngữ, chỉ dùng cho hành động của phía mình.',
      ],
    ],
    points: [
      ['おっしゃる', 'おっしゃる', 'nói (tôn kính ngữ)'],
      ['検討する', 'けんとうする', 'xem xét, cân nhắc'],
    ],
  }),
  item('w01', 'hyogen', 2, {
    material: { kind: 'text', body: '（受付で、初めて来社した客に）恐れ入りますが、こちらの用紙にお名前とご用件を＿＿＿。' },
    questions: [
      [
        '空欄に入る最も適当な表現はどれですか。',
        ['ご記入ください', 'ご記入してください', '記入させてください', 'ご記入されてください'],
        0,
        'Đáp án là lựa chọn 1. Người viết là khách, nên nhờ khách làm thì dùng mẫu ご + danh từ + ください. Lựa chọn 2 dễ nhầm nhất: ご記入する là khiêm nhường ngữ (dùng cho việc mình làm), ghép với ください thành bắt khách "khiêm nhường", sai. Lựa chọn 3 nghĩa là "để tôi viết", sai chủ thể; lựa chọn 4 trộn khiêm nhường với tôn kính.',
      ],
    ],
    points: [
      ['ご用件', 'ごようけん', 'việc cần (của khách)'],
      ['ご記入ください', 'ごきにゅうください', 'xin vui lòng điền'],
    ],
  }),
  item('w01', 'hyogen', 3, {
    material: { kind: 'text', body: 'A：山口産業の西田と申しますが、営業部の原田部長はいらっしゃいますか。\nB：申し訳ございません。＿＿＿は本日、休暇を取っております。' },
    questions: [
      [
        '空欄に入る最も適当な表現はどれですか。',
        ['原田部長様', '原田部長', '部長の原田さん', '部長の原田'],
        3,
        'Đáp án là lựa chọn 4. Nói với người ngoài công ty thì cấp trên của mình cũng là "người nhà": đưa chức danh lên trước và gọi trống tên (部長の原田). Lựa chọn 2 dễ nhầm nhất vì người gọi vừa nói 原田部長, nhưng đặt chức danh sau tên là cách tôn trọng, không dùng cho người nhà trước mặt khách. Lựa chọn 1 thêm 様 thừa, lựa chọn 3 thêm さん.',
      ],
    ],
    points: [
      ['休暇を取る', 'きゅうかをとる', 'nghỉ phép'],
      ['申し訳ございません', 'もうしわけございません', 'thành thật xin lỗi'],
    ],
  }),
  item('w01', 'sogo-dokkai', 1, {
    material: {
      kind: 'text',
      title: '創業30周年 感謝の会のご案内',
      body: '株式会社大成ロジテック\n代表取締役　前川様\n\n拝啓　晩秋の候、貴社ますますご清栄のこととお慶び申し上げます。平素は格別のご高配を賜り、厚く御礼申し上げます。\nさて、弊社はおかげさまで来る12月に創業30周年を迎えます。つきましては、日頃のご厚誼に感謝し、ささやかながら下記のとおり感謝の会を催したく存じます。ご多用中恐縮ではございますが、ご出席賜りますようお願い申し上げます。\n敬具\n\n記\n日時　2026年12月4日（金）18時～20時\n会場　ホテル港陽　2階「桜の間」\n※ご出欠は、11月20日（金）までに同封のはがきにてお知らせください。\n\n株式会社みなと精機　代表取締役　浜田',
    },
    questions: [
      [
        '前川さんは、出欠の返事をいつまでに、どのようにしますか。',
        ['12月4日までに、電話で知らせる', '11月20日までに、はがきで知らせる', '11月20日までに、メールで知らせる', '12月4日に、会場の受付で伝える'],
        1,
        'Đáp án là lựa chọn 2. Dòng ※ cuối phần 記 ghi rõ: báo có dự hay không trước ngày 20/11/2026 bằng bưu thiếp gửi kèm (同封のはがき). Lựa chọn 1 và 4 lấy ngày 4/12, nhưng đó là ngày diễn ra buổi tiệc, không phải hạn trả lời. Lựa chọn 3 đúng hạn nhưng sai cách: thư không hề nhắc tới email.',
      ],
    ],
    points: [
      ['ご高配を賜る', 'ごこうはいをたまわる', 'nhận được sự quan tâm (thư trang trọng)'],
      ['ご厚誼', 'ごこうぎ', 'tình giao hảo thân thiết'],
      ['催す', 'もよおす', 'tổ chức (buổi lễ, buổi tiệc)'],
      ['同封', 'どうふう', 'gửi kèm trong phong bì'],
    ],
  }),
  item('w01', 'sogo-dokkai', 2, {
    material: {
      kind: 'text',
      title: '講演のご依頼について',
      body: '株式会社みらい経営研究所\nセミナー事業部　松田様\n\nいつもお世話になっております。北斗精工の岡本でございます。\n先日は、2027年2月のセミナーでの講演について、ご丁寧なご依頼をいただき、誠にありがとうございました。\n社内で検討いたしましたが、あいにく当日は弊社工場の定期点検と重なっており、十分な準備の時間を取ることが難しい状況です。せっかくお声がけいただきながら大変心苦しいのですが、今回は見送らせていただきたく存じます。\nなお、弊社技術部の者でよろしければ、ご紹介することも可能です。ご希望の際はお知らせください。',
    },
    questions: [
      [
        'このメールの目的は何ですか。',
        ['講演の日程を変えてほしいと頼むこと', '講演の内容について問い合わせること', '代わりの講師を紹介してほしいと頼むこと', '講演の依頼を断り、おわびを伝えること'],
        3,
        'Đáp án là lựa chọn 4. Câu then chốt là 今回は見送らせていただきたく存じます: xin phép không nhận lời lần này, kèm lời áy náy (大変心苦しい). Lựa chọn 3 dễ nhầm nhất vì thư có nói đến việc giới thiệu người khác, nhưng chính Okamoto đề nghị giới thiệu người của công ty mình, không phải nhờ Matsuda giới thiệu. Thư cũng không xin đổi ngày (lựa chọn 1).',
      ],
    ],
    points: [
      ['見送る', 'みおくる', 'gác lại, không tiến hành (lần này)'],
      ['心苦しい', 'こころぐるしい', 'áy náy, khó xử'],
      ['お声がけ', 'おこえがけ', 'lời mời, lời rủ'],
    ],
  }),
  item('w01', 'sogo-dokkai', 3, {
    material: {
      kind: 'text',
      title: '新入社員 電話応対研修のご案内',
      body: '各課長各位\n\n人事部　研修担当\n\n今年度入社の社員を対象に、下記のとおり電話応対研修を行います。配属後に「外線電話に出るのが不安だ」という声が多く寄せられたため、今年は実際の通話を想定したロールプレイを中心とします。\nつきましては、各課で受講者を決め、11月27日（金）までに人事部へ名簿をお送りください。受講者本人への連絡は、人事部から行います。\n\n記\n日時　2026年12月10日（木）13時～17時\n場所　本社5階　第2研修室\n定員　30名',
    },
    questions: [
      [
        'この案内を受け取った課長がしなければならないことは何ですか。',
        ['受講者を決めて、名簿を人事部に送る', '受講者本人に、研修の日時を伝える', '研修のロールプレイで相手役を務める', '12月10日までに研修室を予約する'],
        0,
        'Đáp án là lựa chọn 1. Sau つきましては, thông báo yêu cầu mỗi phòng chọn người học và gửi danh sách cho phòng nhân sự trước 27/11/2026. Lựa chọn 2 dễ nhầm nhất: báo cho chính người học là việc của phòng nhân sự (人事部から行います), không phải của trưởng phòng. Phòng học và vai diễn trong buổi tập cũng không phải việc của trưởng phòng.',
      ],
    ],
    points: [
      ['受講者', 'じゅこうしゃ', 'người tham gia khoá học'],
      ['名簿', 'めいぼ', 'danh sách tên'],
      ['外線', 'がいせん', 'cuộc gọi từ bên ngoài'],
    ],
  }),
  item('w01', 'sogo-dokkai', 4, {
    material: {
      kind: 'text',
      title: '会社説明会への協力のお願い',
      body: '若手社員の皆様\n\nお疲れさまです。人事部採用担当の小池です。\n2028年3月卒業予定の学生向けの会社説明会で、先輩社員として仕事の話をしていただける方を募集します。業務として扱いますので、所属長の了承を得たうえでお申し込みください。\n\n記\n日時　2026年12月12日（土）13時30分開始（16時終了予定）\n集合　開始の1時間前に本社1階ロビー\n募集人数　6名\n申込締切　11月30日（月）\n※土曜出勤分は、翌週中に代休を取得してください。',
    },
    questions: [
      [
        '説明会を手伝う社員は、当日何時に集合しなければなりませんか。',
        ['13時30分', '15時00分', '12時30分', '12時00分'],
        2,
        'Đáp án là lựa chọn 3. Buổi giới thiệu bắt đầu lúc 13:30 và mục 集合 ghi phải có mặt trước giờ bắt đầu 1 tiếng, tức 12:30. Lựa chọn 1 dễ nhầm nhất vì đó là giờ bắt đầu in rõ trong 記, không phải giờ tập trung. Lựa chọn 2 là một tiếng trước giờ kết thúc dự kiến, đọc nhầm mốc tính.',
      ],
    ],
    points: [
      ['所属長', 'しょぞくちょう', 'trưởng đơn vị mình trực thuộc'],
      ['了承を得る', 'りょうしょうをえる', 'được chấp thuận'],
      ['代休', 'だいきゅう', 'ngày nghỉ bù'],
    ],
  }),
];

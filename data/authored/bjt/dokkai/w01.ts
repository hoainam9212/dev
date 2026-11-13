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
    material: {
      kind: 'text',
      title: '担当者変更のご挨拶',
      body: '株式会社ミドリ物産 購買部 中川様\n\nいつも大変お世話になっております。東和工業の村井でございます。\n私事で恐縮ですが、このたび4月1日付で名古屋支店へ異動することとなりました。在任中は格別のご厚情を賜り、心より御礼申し上げます。\n後任は同じ営業部の小野が務めます。小野は前任地でも同じ業界のお客様を担当しており、引き継ぎには万全を期しております。\n近日中に小野と二人でご挨拶に伺いたく存じますので、ご都合のよい日時をお知らせいただけますと幸いです。',
    },
    questions: [
      [
        'このメールの内容と合っているものはどれですか。',
        ['村井さんは会社を辞めることになった', '村井さんは中川さんに、会いに行く日時を知らせてほしいと頼んでいる', '小野さんはこの業界の仕事をするのが初めてだ', '4月から取引の条件が変わる'],
        1,
        'Đáp án 2. Câu cuối ご都合のよい日時をお知らせいただけますと幸いです = mong anh cho biết thời gian thuận tiện, để hai người đến chào. Lựa chọn 1 dễ nhầm: 異動 là chuyển công tác sang chi nhánh Nagoya, không phải nghỉ việc. Ono đã phụ trách cùng ngành ở nơi cũ nên 3 sai, còn điều kiện giao dịch thì thư không nhắc.',
      ],
    ],
    points: [
      ['異動', 'いどう', 'chuyển công tác, thuyên chuyển'],
      ['後任', 'こうにん', 'người kế nhiệm'],
      ['万全を期す', 'ばんぜんをきす', 'chuẩn bị chu đáo không sơ hở'],
      ['ご厚情を賜る', 'ごこうじょうをたまわる', 'nhận được sự quan tâm hậu hĩnh'],
    ],
  }),
  item('w01', 'hyogen', 2, {
    material: {
      kind: 'text',
      title: '年始の挨拶回りについて',
      body: '営業部各位\n\n例年どおり、1月6日（火）から9日（金）まで、主要取引先への年始の挨拶回りを行います。訪問先と日時は各課で調整のうえ、12月19日までに課長経由で営業企画課へ提出してください。\n手土産は営業企画課で一括して用意しますので、各自で購入する必要はありません。ただし、海外の取引先を訪問する場合は、先方の習慣に合わせる必要があるため、各課で手配してください。\nなお、先方のご都合により訪問が1月13日以降になる場合も、同じ手順で提出してください。\n\n営業企画課 森',
    },
    questions: [
      [
        '国内の取引先を訪問する社員がしなければならないことはどれですか。',
        ['手土産を自分で買っておく', '訪問の予定を直接、営業企画課に送る', '訪問先と日時を課で決め、課長を通して提出する', '1月13日以降になる訪問は取りやめる'],
        2,
        'Đáp án 3. Thông báo yêu cầu các phòng tự sắp lịch rồi nộp qua trưởng phòng (課長経由). Lựa chọn dễ nhầm là 2: nơi nhận đúng là 営業企画課 nhưng không được gửi thẳng, phải đi qua 課長. Quà do 営業企画課 chuẩn bị chung, chỉ khách nước ngoài mới tự lo. Lịch sau ngày 13/1 vẫn nộp như thường, không bị hủy.',
      ],
    ],
    points: [
      ['挨拶回り', 'あいさつまわり', 'đi chào các nơi (đầu năm, nhận chức)'],
      ['課長経由で', 'かちょうけいゆで', 'thông qua trưởng phòng'],
      ['一括して', 'いっかつして', 'gộp lại một lần, làm chung'],
      ['手土産', 'てみやげ', 'quà mang theo khi đến thăm'],
    ],
  }),
  item('w01', 'hyogen', 3, {
    material: {
      kind: 'text',
      title: '本日のご来社の御礼',
      body: '株式会社サクラ建材 総務部 吉田様\n\n本日はご多忙の中、弊社までお越しくださいまして、誠にありがとうございました。\nご説明いただいた備品管理システムにつきましては、社内でも大変好評でした。\nただ、導入の時期については、来年度の予算が確定してから改めて検討したいと考えております。\nつきましては、お手数ですが、初年度にかかる費用の内訳をお送りいただけますでしょうか。予算申請の資料として使わせていただきます。\n\n北山商事 総務課 石井',
    },
    questions: [
      [
        'このメールで、石井さんが吉田さんに頼んでいることは何ですか。',
        ['もう一度会社に来て、システムを説明してほしい', 'すぐにシステムを導入してほしい', '来年度の予算を確認してほしい', '最初の年にかかる費用の詳しい内容を送ってほしい'],
        3,
        'Đáp án 4. Lời nhờ nằm sau つきましては: 初年度にかかる費用の内訳 = chi tiết chi phí năm đầu. Lựa chọn dễ nhầm là 3: 予算 có xuất hiện, nhưng đó là ngân sách của chính công ty Ishii, họ tự chờ chốt rồi mới xét. Thư cũng nói chưa quyết thời điểm áp dụng, nên 2 sai.',
      ],
    ],
    points: [
      ['内訳', 'うちわけ', 'chi tiết các khoản'],
      ['つきましては', 'つきましては', 'vì vậy (mở đầu lời nhờ)'],
      ['ご多忙の中', 'ごたぼうのなか', 'trong lúc bận rộn'],
    ],
  }),
  item('w01', 'sogo-dokkai', 1, {
    material: {
      kind: 'text',
      title: '新入社員の敬語、ここに注意',
      body: '人事部では毎年、配属後一か月の新入社員について、受け入れ部署にアンケートを行っている。今年最も多く挙がったのは、「社外の人に対して、自社の上司に尊敬語を使ってしまう」という指摘だった。例えば、取引先からの電話に「課長はただいま外出していらっしゃいます」と答えてしまう例である。社外の人と話すときは、自社の人間は上司であっても「身内」として扱い、「課長の山本は、ただいま外出しております」のように言うのが基本だ。\n次に多かったのは、「させていただく」の使いすぎである。「本日、資料を送らせていただきます」は誤りではないが、一通のメールに何度も続くと、かえってくどい印象を与える。相手の許可を得る場面でなければ、「お送りします」「お送りいたします」で十分である。\n一方で、受け入れ部署からは「間違いを恐れて、電話に出たがらない」という声も寄せられた。敬語は場数を踏むことで身につくものだ。迷ったときは「です・ます」で丁寧に話し、後で先輩に確かめればよい。電話に出ないことのほうが、仕事の上ではよほど問題である。',
    },
    questions: [
      [
        '取引先からの電話で課長の不在を伝える言い方として、本文の考えに合うものはどれですか。',
        ['課長はただいま外出していらっしゃいます', '山本課長はただいま外出されています', '課長の山本は、ただいま外出しております', '山本さんはただいま外出なさっています'],
        2,
        'Đáp án 3. Bài nói với người ngoài công ty, cấp trên của mình cũng là "người nhà": bỏ chức danh sau tên (課長の山本) và dùng khiêm nhường ております. Lựa chọn 2 dễ nhầm vì có tên và nghe lịch sự, nhưng 山本課長 và されています vẫn là cách tôn kính cấp trên trước mặt khách.',
      ],
      [
        '受け入れ部署から寄せられた「電話に出たがらない」という声について、筆者はどう考えていますか。',
        ['敬語の研修が足りないので、研修を増やすべきだ', '間違いを恐れて電話に出ないことは、敬語の間違いより問題だ', '敬語に自信がない新入社員は、電話に出なくてもよい', '「させていただく」を多く使えば、電話でも失礼にならない'],
        1,
        'Đáp án 2. Câu cuối: 電話に出ないことのほうが、仕事の上ではよほど問題である = không nghe máy mới là vấn đề lớn hơn nhiều. Lựa chọn 1 nghe hợp lý nhưng bài không đề xuất thêm khóa học, mà khuyên cứ nói です・ます rồi hỏi lại tiền bối. 4 trái với đoạn hai, nơi tác giả nói dùng させていただく quá nhiều gây cảm giác rườm rà.',
      ],
    ],
    points: [
      ['身内', 'みうち', 'người trong nhà, người phe mình'],
      ['場数を踏む', 'ばかずをふむ', 'trải qua nhiều lần thực tế'],
      ['くどい', 'くどい', 'rườm rà, lặp đi lặp lại'],
      ['よほど', 'よほど', 'hơn hẳn, rất nhiều'],
    ],
  }),
  item('w01', 'sogo-dokkai', 2, {
    material: {
      kind: 'text',
      title: '年賀状によるご挨拶の終了について（お知らせ）',
      body: 'お取引先各位\n\n拝啓 時下ますますご清栄のこととお慶び申し上げます。平素は格別のお引き立てを賜り、厚く御礼申し上げます。\nさて、弊社では環境への配慮と業務の効率化の観点から、来年より紙の年賀状によるご挨拶を控えさせていただくことといたしました。長年にわたり年賀状をお送りくださった皆様には誠に勝手ではございますが、何卒ご理解賜りますようお願い申し上げます。\nなお、新年のご挨拶は、1月5日に弊社ホームページおよびメールにて差し上げる予定です。また、皆様から頂戴する年賀状につきましては、引き続きありがたく拝受いたします。\n今後とも変わらぬご愛顧を賜りますよう、よろしくお願い申し上げます。\n敬具\n\n株式会社青葉精機 総務部',
    },
    questions: [
      [
        '青葉精機が年賀状をやめる理由は何ですか。',
        ['環境に配慮し、仕事を効率よくするため', '取引先から年賀状が届かなくなったため', 'ホームページを見る人が増えたため', '年賀状を出す費用が高くなったため'],
        0,
        'Đáp án 1. Lý do nằm ở 環境への配慮と業務の効率化の観点から: vì môi trường và để công việc hiệu quả hơn. Lựa chọn 3 dễ nhầm vì trang chủ có được nhắc, nhưng đó là cách gửi lời chúc mới thay thế, không phải lý do. Chi phí và việc khách ngừng gửi thiệp đều không có trong thư.',
      ],
      [
        'この知らせの内容と合っているものはどれですか。',
        ['青葉精機は来年から新年の挨拶を一切しない', '取引先は青葉精機に年賀状を送らないよう頼まれている', '新年の挨拶はメールで送るが、ホームページには載せない', '取引先から年賀状が届いた場合、青葉精機は受け取る'],
        3,
        'Đáp án 4. Câu sau なお viết 皆様から頂戴する年賀状につきましては、引き続きありがたく拝受いたします = vẫn vui lòng nhận thiệp của khách. Lựa chọn 2 dễ nhầm, nhưng công ty chỉ dừng việc mình gửi, không hề xin khách ngừng gửi. Lời chúc vẫn đăng trên trang chủ và gửi qua mail, nên 1 và 3 sai.',
      ],
    ],
    points: [
      ['ご清栄', 'ごせいえい', 'sự hưng thịnh (lời chào trong thư)'],
      ['お引き立て', 'おひきたて', 'sự ủng hộ, chiếu cố'],
      ['ご愛顧', 'ごあいこ', 'sự ủng hộ lâu dài của khách hàng'],
      ['控える', 'ひかえる', 'kiềm chế, thôi không làm'],
    ],
  }),
];

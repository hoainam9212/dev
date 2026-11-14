import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

// Week 4 — họp nội bộ và 報連相 (J2 → J1).
export const W04: BjtItem[] = [
  item('w04', 'goi', 1, {
    questions: [
      [
        '作業の進み具合に問題があれば、早めに上司に＿＿＿することが大切だ。',
        ['報告', '報道', '通報', '広報'],
        0,
        'Đáp án 1. 報告 = báo cáo tình hình lên cấp trên, chữ 報 trong 報連相. Lựa chọn 3 dễ nhầm vì cũng là "báo", nhưng 通報 là báo cho cảnh sát hoặc cơ quan về sự cố. 報道 là đưa tin trên báo đài, 広報 là quan hệ công chúng của công ty.',
      ],
    ],
    points: [
      ['進み具合', 'すすみぐあい', 'mức độ tiến triển'],
      ['報告', 'ほうこく', 'báo cáo'],
    ],
  }),
  item('w04', 'goi', 2, {
    questions: [
      [
        '本日の会議の＿＿＿は、お配りした資料の1ページ目にまとめてあります。',
        ['議員', '議題', '議席', '議長'],
        1,
        'Đáp án 2. 議題 = chủ đề cần bàn trong cuộc họp, thường liệt kê ở trang đầu tài liệu. Lựa chọn 4 dễ nhầm vì cũng liên quan đến cuộc họp, nhưng 議長 là người chủ trì, không thể "tóm tắt trong tài liệu". 議員 là nghị sĩ, 議席 là ghế trong nghị viện.',
      ],
    ],
    points: [
      ['議題', 'ぎだい', 'chủ đề cuộc họp'],
      ['お配りした', 'おくばりした', 'đã phát (khiêm nhường)'],
    ],
  }),
  item('w04', 'goi', 3, {
    questions: [
      [
        '新製品の発売時期についてはA案とB案で意見が＿＿＿、結論は次回に持ち越しとなった。',
        ['分け', '別れ', '離れ', '分かれ'],
        3,
        'Đáp án 4. 意見が分かれる (tự động từ) = ý kiến chia làm nhiều phía. Lựa chọn 1 dễ nhầm vì cùng chữ, nhưng 分ける là tha động từ, cần を (意見を分ける không dùng ở đây). 別れる là chia tay giữa người với người. 離れる là rời xa về khoảng cách.',
      ],
    ],
    points: [
      ['意見が分かれる', 'いけんがわかれる', 'ý kiến chia rẽ'],
      ['持ち越し', 'もちこし', 'dời sang lần sau'],
    ],
  }),
  item('w04', 'goi', 4, {
    questions: [
      [
        '会議の結論が出＿＿＿、関係者の皆さんにメールでお知らせします。',
        ['以来', 'うちに', '次第', 'ついでに'],
        2,
        'Đáp án 3. ～次第 (sau thể ます) = ngay khi ~ thì: 出次第 = ngay khi có kết luận. Lựa chọn 1 dễ nhầm vì cũng nói về thời điểm, nhưng 以来 đi sau thể て (出て以来) và nghĩa là "kể từ đó đến nay". うちに không đi sau thể ます (phải là 出ないうちに), còn ついでに là "nhân tiện".',
      ],
    ],
    points: [
      ['～次第', 'しだい', 'ngay khi ~'],
      ['関係者', 'かんけいしゃ', 'người liên quan'],
    ],
  }),
  item('w04', 'goi', 5, {
    questions: [
      [
        '先週の打ち合わせで決まった件について、その後の＿＿＿を報告してください。',
        ['経由', '経過', '経験', '経営'],
        1,
        'Đáp án 2. 経過 = diễn biến từ đó đến nay, その後の経過を報告する là cách nói cố định. Lựa chọn 3 dễ nhầm vì 経験 cũng là việc đã qua, nhưng nó là kinh nghiệm của bản thân người làm, không phải tình hình của một việc. 経由 là đi qua (một nơi), 経営 là kinh doanh, quản lý công ty.',
      ],
    ],
    points: [
      ['経過', 'けいか', 'diễn biến, quá trình'],
      ['打ち合わせ', 'うちあわせ', 'cuộc họp bàn trước'],
    ],
  }),
  item('w04', 'goi', 6, {
    questions: [
      [
        '新しい経費のルールを全社員に＿＿＿ため、各部署の朝礼で説明を行う。',
        ['広まる', '知れる', '周知する', '伝わる'],
        2,
        'Đáp án 3. 周知する = làm cho mọi người cùng biết, là hành động của công ty nên khớp với ため (để làm gì). Ba lựa chọn còn lại đều là tự động từ, chủ ngữ là quy định chứ không phải người làm. Lựa chọn 4 dễ nhầm nhất vì nghĩa gần, nhưng 伝わる phải nói ルールが伝わる, không nhận tân ngữ ルールを.',
      ],
    ],
    points: [
      ['周知する', 'しゅうちする', 'thông báo cho mọi người cùng biết'],
      ['朝礼', 'ちょうれい', 'buổi họp sáng đầu giờ'],
      ['経費', 'けいひ', 'chi phí, kinh phí'],
    ],
  }),
  item('w04', 'hyogen', 1, {
    material: { kind: 'text', body: '（会議の後、部長に）部長、先ほどの新製品の件でご相談がありまして、少し＿＿＿よろしいでしょうか。' },
    questions: [
      [
        '空欄に入る最も適当な表現はどれですか。',
        ['お時間をさしあげても', 'お時間をおかけしても', 'お時間をくださっても', 'お時間をいただいても'],
        3,
        'Đáp án là lựa chọn 4. Xin thời gian của trưởng bộ phận là mình nhận một thứ từ cấp trên, nên dùng いただく: お時間をいただいてもよろしいでしょうか. Lựa chọn 3 dễ nhầm nhất vì くださる cũng là tôn kính ngữ của "cho", nhưng không đi với mẫu ～てもよろしいでしょうか (xin phép cho việc mình làm). Lựa chọn 1 ngược hướng (mình cho), lựa chọn 2 là kết hợp từ sai.',
      ],
    ],
    points: [
      ['ご相談', 'ごそうだん', 'việc muốn bàn, xin ý kiến'],
      ['よろしいでしょうか', 'よろしいでしょうか', 'có được không ạ'],
    ],
  }),
  item('w04', 'hyogen', 2, {
    material: { kind: 'text', body: 'A（課長）：来週の会議の資料、もう営業部に送ってくれた？\nB：はい、昨日の夕方に＿＿＿。' },
    questions: [
      [
        '空欄に入る最も適当な表現はどれですか。',
        ['お送りになりました', 'お送りしておきました', '送っていただきました', 'お送りくださいました'],
        1,
        'Đáp án là lựa chọn 2. Người gửi là B, báo với trưởng phòng việc mình đã làm cho phòng kinh doanh, nên dùng khiêm nhường お送りする, thêm ておく để báo "đã gửi sẵn rồi". Lựa chọn 3 dễ nhầm nhất: 送っていただきました nghĩa là có người khác gửi giùm mình, không trả lời đúng câu hỏi "đã gửi chưa". Lựa chọn 1 và 4 là tôn kính ngữ cho hành động của chính mình.',
      ],
    ],
    points: [
      ['資料', 'しりょう', 'tài liệu'],
      ['お送りする', 'おおくりする', 'gửi (khiêm nhường)'],
    ],
  }),
  item('w04', 'hyogen', 3, {
    material: { kind: 'text', body: '（会議で、部長の案に意見を述べて）＿＿＿、その日程では工場の準備が間に合わないかと存じます。' },
    questions: [
      [
        '空欄に入る最も適当な表現はどれですか。',
        ['お言葉に甘えて', 'お手数ですが', 'お言葉ですが', 'おかげさまで'],
        2,
        'Đáp án là lựa chọn 3. お言葉ですが là câu đệm khi muốn nói ý trái với cấp trên một cách lễ phép. Lựa chọn 1 dễ nhầm nhất vì cũng bắt đầu bằng お言葉, nhưng お言葉に甘えて dùng khi nhận lời mời hay ý tốt của người khác. お手数ですが dùng khi nhờ việc, おかげさまで dùng khi cảm ơn, đều không hợp với việc phản biện.',
      ],
    ],
    points: [
      ['お言葉ですが', 'おことばですが', 'xin phép nói khác ý (với cấp trên)'],
      ['間に合う', 'まにあう', 'kịp'],
      ['存じる', 'ぞんじる', 'nghĩ, biết (khiêm nhường)'],
    ],
  }),
  item('w04', 'sogo-dokkai', 1, {
    material: {
      kind: 'text',
      title: '年末セール準備会議 議事録',
      body: '日時：2026年11月16日（月）10時～11時\n出席者：店舗運営部　青木部長、販売課　新井、商品課　大野、総務課　杉山\n\n決定事項\n1. セール期間は12月19日（土）から27日（日）までとする。\n2. チラシは前回のA案ではなく、写真を増やしたB案で進める。\n3. 臨時アルバイトは各店2名とし、販売課が12月4日までに採用を終える。\n\n次回までの課題\n・商品課：目玉商品の仕入れ数を確定し、次回報告する。\n・総務課：B案のチラシについて、印刷会社に見積りを依頼する。\n\n次回：11月30日（月）10時～',
    },
    questions: [
      [
        '次回の会議までに、商品課がしなければならないことは何ですか。',
        ['目玉商品をいくつ仕入れるか決める', 'B案のチラシの印刷費の見積りを取る', '各店の臨時アルバイトを2名採用する', 'チラシのA案に写真を加えて直す'],
        0,
        'Đáp án là lựa chọn 1. Mục 次回までの課題 giao cho phòng hàng hoá (商品課) chốt số lượng nhập của mặt hàng chủ lực và báo cáo ở buổi sau. Lựa chọn 2 dễ nhầm nhất vì cũng là việc phải xong trước buổi sau, nhưng là việc của phòng tổng vụ (総務課). Tuyển người làm thêm là việc của phòng bán hàng, còn phương án A đã bị bỏ.',
      ],
    ],
    points: [
      ['議事録', 'ぎじろく', 'biên bản họp'],
      ['目玉商品', 'めだましょうひん', 'mặt hàng chủ lực để hút khách'],
      ['仕入れ', 'しいれ', 'nhập hàng'],
      ['臨時', 'りんじ', 'tạm thời, thời vụ'],
    ],
  }),
  item('w04', 'sogo-dokkai', 2, {
    material: {
      kind: 'text',
      title: '【ご相談】部品入荷遅れの件',
      body: '山下課長\n\nお疲れさまです。生産管理課の小林です。\n本日、協和電機から連絡があり、来週月曜日に入荷予定のモーター200個のうち、80個が2日遅れるとのことです。\nこのままでは、ラインBの組立が水曜日に半日止まります。対応として、①ラインAの作業を前倒ししてBに人を回す、②残業で遅れを取り戻す、の2案を考えています。①は残業代がかかりませんが、Aの納期に余裕がなくなります。\nどちらで進めるか、明日の朝礼までにご指示いただけますでしょうか。',
    },
    questions: [
      [
        'このメールで、小林さんが課長に求めていることは何ですか。',
        ['協和電機に、納期を守るよう注意すること', 'ラインBの組立を、水曜日に止めること', '二つの案のどちらで進めるか決めること', '残業代の予算を、追加で確保すること'],
        2,
        'Đáp án là lựa chọn 3. Câu cuối nhờ trưởng phòng chỉ thị nên làm theo phương án nào (どちらで進めるか…ご指示いただけますでしょうか) trước buổi họp sáng mai. Lựa chọn 2 dễ nhầm nhất vì việc dây chuyền B dừng nửa ngày có trong thư, nhưng đó là hậu quả cần tránh, không phải điều được nhờ. Thư không nhờ nhắc nhở nhà cung cấp hay xin thêm ngân sách.',
      ],
    ],
    points: [
      ['入荷', 'にゅうか', 'hàng về kho'],
      ['前倒し', 'まえだおし', 'làm sớm hơn kế hoạch'],
      ['取り戻す', 'とりもどす', 'lấy lại, bù lại'],
      ['朝礼', 'ちょうれい', 'buổi họp đầu giờ sáng'],
    ],
  }),
  item('w04', 'sogo-dokkai', 3, {
    material: {
      kind: 'text',
      title: '12月度 部内会議の議題について',
      body: '営業二部の皆さん\n\nお疲れさまです。部長付の今井です。\n12月度の部内会議は、12月15日（火）14時から第3会議室で行います。議題にしたい案件がある方は、会議の前の週の金曜日17時までに、案件名と所要時間を私宛てにお送りください。\nなお、資料を配る場合は、会議前日の正午までに共有フォルダに保存してください。当日の印刷配布は行いません。\nよろしくお願いします。',
    },
    questions: [
      [
        '会議で議題を出したい人は、いつまでに今井さんに連絡しなければなりませんか。',
        ['12月14日（月）の正午まで', '12月11日（金）の17時まで', '12月15日（火）の14時まで', '12月14日（月）の17時まで'],
        1,
        'Đáp án là lựa chọn 2. Cuộc họp vào thứ Ba 15/12/2026, nên "thứ Sáu của tuần trước" là 11/12, hạn 17 giờ. Lựa chọn 1 dễ nhầm nhất vì trưa 14/12 cũng là một hạn chót trong thư, nhưng đó là hạn lưu tài liệu vào thư mục chung, không phải hạn đề xuất chủ đề họp. Lựa chọn 3 là giờ bắt đầu cuộc họp.',
      ],
    ],
    points: [
      ['議題', 'ぎだい', 'chủ đề đưa ra bàn trong họp'],
      ['所要時間', 'しょようじかん', 'thời gian cần thiết'],
      ['配布', 'はいふ', 'phát (tài liệu)'],
    ],
  }),
  item('w04', 'sogo-dokkai', 4, {
    material: {
      kind: 'text',
      title: '第8回安全衛生委員会の開催について（通知）',
      body: '各職場長殿\n\n安全衛生委員会事務局\n\n標記の件、下記のとおり開催しますので、各職場から委員1名を出席させてください。また、今月の「ヒヤリハット報告」が最も多かった職場は、委員に加えて報告者1名も出席させてください。\n\n記\n日時　2026年12月17日（木）15時～16時30分\n場所　第1工場2階会議室\n議題　(1) 11月の労働災害の発生状況　(2) 冬季の転倒防止対策\n※今月、報告が最も多かった職場は組立課です。',
    },
    questions: [
      [
        '組立課からは、誰が出席しますか。',
        ['委員1名のみ', '報告者1名のみ', '委員2名と報告者1名', '委員1名と報告者1名'],
        3,
        'Đáp án là lựa chọn 4. Mỗi nơi làm việc cử 1 uỷ viên; riêng nơi có nhiều báo cáo "suýt xảy ra tai nạn" nhất thì cử thêm 1 người báo cáo, và dòng ※ cho biết đó là 組立課. Lựa chọn 1 dễ nhầm nhất vì đó là quy định chung cho mọi nơi, bỏ qua dòng ※. Lựa chọn 3 tính thừa một uỷ viên.',
      ],
    ],
    points: [
      ['標記の件', 'ひょうきのけん', 'việc nêu ở tiêu đề'],
      ['ヒヤリハット', 'ひやりはっと', 'sự cố suýt gây tai nạn'],
      ['労働災害', 'ろうどうさいがい', 'tai nạn lao động'],
      ['転倒', 'てんとう', 'ngã, trượt ngã'],
    ],
  }),
];

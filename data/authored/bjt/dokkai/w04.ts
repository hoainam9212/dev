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
    material: {
      kind: 'text',
      title: '【ご案内】第3四半期 販売会議',
      body: '営業部 各課長\n\n第3四半期の販売実績の確認と、来期の重点商品を決めるため、下記のとおり会議を開催します。\n日時：12月2日（火）13時〜15時　場所：本社8階 大会議室\n議題：①第3四半期の実績報告（各課10分）②来期の重点商品の決定\n各課の実績資料は当日配るのではなく、11月28日（金）までに共有フォルダに保存してください。出席者全員に事前に目を通したうえで会議に臨んでいただくためです。\nなお、課長が出席できない場合は、代理の方の出席をお願いします。\n\n営業企画課 清水',
    },
    questions: [
      [
        'この会議に出る課長が、事前にしなければならないことは何ですか。',
        ['11月28日までに、実績資料を共有フォルダに入れる', '会議の当日に、実績資料を人数分配る', '来期の重点商品を決めて報告する', '代理の出席者を必ず決めておく'],
        0,
        'Đáp án 1. Thư yêu cầu lưu tài liệu vào thư mục chung trước thứ Sáu 28/11 để mọi người đọc trước. Lựa chọn 2 dễ nhầm, nhưng thư nói rõ 当日配るのではなく: không phát vào hôm họp. Mặt hàng trọng điểm được quyết trong cuộc họp, còn người thay chỉ cần khi tổ trưởng vắng.',
      ],
    ],
    points: [
      ['四半期', 'しはんき', 'quý (ba tháng)'],
      ['目を通す', 'めをとおす', 'đọc lướt qua'],
      ['臨む', 'のぞむ', 'tham dự, bước vào (cuộc họp)'],
      ['代理', 'だいり', 'người thay mặt'],
    ],
  }),
  item('w04', 'hyogen', 2, {
    material: {
      kind: 'text',
      title: '【報告・ご相談】ミナト食品様 納品日程の件',
      body: '高田課長\n\nお疲れ様です。営業二課の松本です。\n本日午前、ミナト食品の村上様より、12月1日に納品予定の包装資材500箱のうち、200箱を前倒しして11月27日に納めてほしいとのご依頼がありました。\n工場に確認したところ、27日までに用意できるのは150箱が限度とのことです。\nつきましては、150箱を27日に、残りの350箱を予定どおり12月1日に納めるという案で、村上様にご提案してもよろしいでしょうか。\n明日の午前中に村上様へお返事する約束になっておりますので、本日中にご判断いただけますと助かります。',
    },
    questions: [
      [
        '松本さんが高田課長に求めていることは何ですか。',
        ['工場に200箱を用意するよう頼んでほしい', '村上さんに、直接事情を説明してほしい', '明日の午前中に、村上さんに返事をしてほしい', '自分の考えた納品の案で客に提案してよいか、今日中に決めてほしい'],
        3,
        'Đáp án 4. ご提案してもよろしいでしょうか và 本日中にご判断いただけますと助かります: Matsumoto xin trưởng phòng duyệt phương án của mình trong hôm nay. Lựa chọn 3 dễ nhầm vì "sáng mai" có trong thư, nhưng đó là lúc chính Matsumoto trả lời khách. Xưởng đã nói tối đa 150 hộp, nên nhờ chuẩn bị 200 hộp (1) là không thực tế.',
      ],
    ],
    points: [
      ['前倒し', 'まえだおし', 'làm sớm hơn kế hoạch'],
      ['限度', 'げんど', 'giới hạn, mức tối đa'],
      ['ご判断いただく', 'ごはんだんいただく', 'được (cấp trên) quyết định'],
    ],
  }),
  item('w04', 'hyogen', 3, {
    material: {
      kind: 'text',
      title: '議事録（抜粋）',
      body: '件名：社内報のウェブ化について\n日時：11月18日（火）　出席：総務部4名、広報課2名\n・広報課より、紙の社内報を来年4月からウェブ版のみに切り替える案が出された。\n・総務部の岡田氏から、工場勤務の社員にはパソコンを持たない者が多く、ウェブ版だけでは読めない社員が出るとの意見があった。\n・協議の結果、来年4月にウェブ版へ移行したうえで、各工場の休憩室に限り、印刷版を置くこととした。\n・休憩室に置く部数は、次回までに総務部が各工場に確認する。',
    },
    questions: [
      [
        'この会議で決まったことはどれですか。',
        ['社内報は来年4月から紙をやめ、ウェブ版だけにする', '社内報はウェブ版にするが、工場の休憩室には印刷版を置く', '工場の社員全員にパソコンを配る', '社内報をウェブ化するかどうかは、次回の会議で決める'],
        1,
        'Đáp án 2. Kết quả bàn bạc (協議の結果): chuyển sang bản web, nhưng riêng phòng nghỉ ở các xưởng vẫn đặt bản in (に限り). Lựa chọn 1 dễ nhầm vì đó đúng là đề xuất ban đầu của 広報課, chưa có ngoại lệ. Lần họp sau chỉ báo số bản in cần đặt, không bàn lại có web hóa hay không.',
      ],
    ],
    points: [
      ['抜粋', 'ばっすい', 'trích đoạn'],
      ['協議', 'きょうぎ', 'bàn bạc, thảo luận'],
      ['移行', 'いこう', 'chuyển sang (hệ thống mới)'],
    ],
  }),
  item('w04', 'sogo-dokkai', 1, {
    material: {
      kind: 'text',
      title: '悪い知らせほど早く',
      body: '新人研修で必ずと言っていいほど教えられる「報連相」。報告・連絡・相談の頭の字をとった言葉で、部下が上司に情報を上げるときの心得として広まった。ところが最近、この言葉を部下だけの問題として扱うのはおかしいという声が、管理職の側から聞かれるようになった。\nある食品メーカーの営業部長は、数年前の出来事を例に挙げる。取引先から苦情を受けた若手社員が一人で解決しようとし、報告が一週間遅れた。その間に問題は大きくなってしまった。後で本人に理由を聞くと、「叱られると思って言い出せなかった」と答えたという。\n部長はこれをきっかけに、悪い報告を受けたときはまず「よく言ってくれた」と伝え、原因を問うのはその後にすると決めた。また、毎週金曜日の夕方に十五分だけ、課員が一人ずつ「困っていること」を話す時間を設けた。成果を発表する場ではないため、問題がまだ小さいうちに話が出てくるようになったという。\n部長は「報連相がうまくいかないのは、部下の能力より、上司が話しやすい場をつくれていないからだ」と話している。',
    },
    questions: [
      [
        '若手社員の報告が遅れたのはなぜですか。',
        ['自分一人で解決できたので、報告はいらないと思ったから', '叱られると思って、言い出せなかったから', '上司が出張で会社にいなかったから', '取引先から、誰にも言わないよう頼まれていたから'],
        1,
        'Đáp án 2. Chính nhân viên trẻ trả lời 「叱られると思って言い出せなかった」 = sợ bị mắng nên không dám nói. Lựa chọn 1 dễ nhầm vì bài có nói anh ta 一人で解決しようとし, nhưng đó là "cố tự giải quyết", không phải đã giải quyết xong. Thực tế vấn đề còn lớn thêm.',
      ],
      [
        '部長の考えに最も近いものはどれですか。',
        ['報連相がうまくいかないのは、部下の能力が足りないからだ', '悪い報告をした部下には、すぐに原因を厳しく問うべきだ', '部下が報告しやすい場をつくるのは、上司の役目だ', '金曜日の会では、一人ずつ成果を発表させるべきだ'],
        2,
        'Đáp án 3. Câu cuối: báo cáo không trôi chảy là vì cấp trên chưa tạo được chỗ dễ nói, hơn là vì năng lực cấp dưới. Lựa chọn 1 dễ nhầm vì dùng đúng chữ trong câu đó (部下の能力) nhưng đảo ngược ý. Trưởng phòng hỏi nguyên nhân sau khi khen, không phải ngay lập tức. Buổi thứ Sáu không phải nơi báo thành tích (成果を発表する場ではない).',
      ],
    ],
    points: [
      ['心得', 'こころえ', 'điều cần ghi nhớ, tâm thế'],
      ['言い出す', 'いいだす', 'mở lời, nói ra'],
      ['管理職', 'かんりしょく', 'cấp quản lý'],
      ['きっかけ', 'きっかけ', 'cái cớ, bước ngoặt'],
    ],
  }),
  item('w04', 'sogo-dokkai', 2, {
    material: {
      kind: 'text',
      title: '定例会議の見直しについて',
      body: '営業部各位\n\n部内の定例会議について、来月から次のとおり改めます。\n1．毎週月曜日10時の部内会議は、60分から30分に短縮し、オンラインで行う。ただし、その月の最初の会議は各課の月次報告があるため、従来どおり会議室に集まり、60分で行う。\n2．会議の資料は前日の17時までに共有フォルダに置き、会議中に資料を読み上げることはしない。\n3．会議で決まったこと、担当者、期限は、司会が会議終了後1時間以内にチャットで共有する。議事録は作らない。\n4．発言の少ない若手社員の意見を聞くため、各議題の最後に、司会が若手社員を指名して意見を求める。\n\n営業部長 原田',
    },
    questions: [
      [
        '月の最初の会議は、どのように行われますか。',
        ['会議室に集まって、60分で行う', 'オンラインで、30分で行う', 'オンラインで、60分で行う', '会議室に集まって、30分で行う'],
        0,
        'Đáp án 1. Phần ただし ở mục 1: cuộc họp đầu tháng có báo cáo tháng của các phòng nên vẫn họp tại phòng và kéo dài 60 phút như cũ. Lựa chọn 2 dễ nhầm vì đó là quy tắc mới cho các tuần khác. 3 và 4 trộn một nửa quy tắc cũ với một nửa quy tắc mới.',
      ],
      [
        'この見直しの内容と合っているものはどれですか。',
        ['会議中に資料を一つずつ読み上げて確認する', '会議が終わったら、司会が議事録を作って配る', '若手社員は議題ごとに資料を用意する', '決まったことは、会議後1時間以内にチャットで知らされる'],
        3,
        'Đáp án 4. Mục 3: người chủ trì chia sẻ nội dung đã quyết, người phụ trách và hạn chót qua chat trong vòng 1 giờ sau họp. Lựa chọn 2 dễ nhầm vì cũng là người chủ trì ghi lại sau họp, nhưng thông báo nói rõ 議事録は作らない. Mục 2 bỏ việc đọc tài liệu trong họp. Nhân viên trẻ được gọi tên để nêu ý kiến, không phải chuẩn bị tài liệu.',
      ],
    ],
    points: [
      ['定例会議', 'ていれいかいぎ', 'cuộc họp định kỳ'],
      ['短縮', 'たんしゅく', 'rút ngắn'],
      ['月次報告', 'げつじほうこく', 'báo cáo hằng tháng'],
      ['指名する', 'しめいする', 'gọi tên, chỉ định'],
    ],
  }),
];

import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/** Week 14 — presentations and debate (reading): what the writer really means. Level: J1, six questions J1+. */
export const W14: BjtItem[] = [
  item('w14', 'goi', 1, {
    questions: [
      [
        '本日の発表では、まず結論を申し上げ、その後で＿＿＿となるデータをお示しします。',
        ['根性', '根回し', '根拠', '根元'],
        2,
        'Lựa chọn 3: 根拠となるデータ = dữ liệu làm căn cứ cho kết luận. Lựa chọn 2 dễ nhầm vì 根回し là từ hay gặp quanh cuộc họp, nhưng nó là việc vận động, dàn xếp trước, không phải dữ liệu. 根性 là ý chí bền bỉ, 根元 là gốc (cây, vật).',
      ],
    ],
    points: [
      ['根拠', 'こんきょ', 'căn cứ'],
      ['お示しする', 'おしめしする', 'trình bày, chỉ ra (khiêm nhường)'],
    ],
  }),
  item('w14', 'goi', 2, {
    questions: [
      [
        '新しい評価制度については社内でも賛否＿＿＿あり、導入は来年度以降に持ち越された。',
        ['両論', '双方', '両面', '両者'],
        0,
        'Lựa chọn 1: 賛否両論 = có cả ý kiến tán thành lẫn phản đối, là cụm bốn chữ cố định. Lựa chọn 2 dễ nhầm vì 双方 cũng là "cả hai bên", nhưng nó chỉ người hay phía tham gia (労使双方), không ghép sau 賛否. 両面 là hai mặt của sự việc, 両者 là hai người, hai bên.',
      ],
    ],
    points: [
      ['賛否両論', 'さんぴりょうろん', 'ý kiến tán thành và phản đối đều có'],
      ['持ち越す', 'もちこす', 'dời sang sau'],
    ],
  }),
  item('w14', 'goi', 3, {
    questions: [
      [
        '恐縮ですが、ただいまの説明に一点＿＿＿させていただきます。',
        ['補充', '補給', '補償', '補足'],
        3,
        'Lựa chọn 4: 補足する = nói thêm cho đầy đủ phần giải thích. Lựa chọn 1 dễ nhầm vì cũng là "bổ sung", nhưng 補充 là bù số lượng còn thiếu (人員を補充する, 在庫を補充する), không dùng cho lời nói. 補給 là tiếp tế (nhiên liệu, nước), 補償 là bồi thường thiệt hại.',
      ],
    ],
    points: [
      ['補足する', 'ほそくする', 'nói thêm, bổ sung (ý)'],
      ['恐縮ですが', 'きょうしゅくですが', 'xin lỗi làm phiền, nhưng'],
    ],
  }),
  item('w14', 'goi', 4, {
    questions: [
      [
        '彼の提案は現場の実情を＿＿＿、机上の空論にすぎない。',
        ['踏まえつつ', '踏まえておらず', '踏まえたうえで', '踏まえているので'],
        1,
        'Lựa chọn 2: 机上の空論にすぎない = chỉ là lý thuyết suông trên bàn giấy; lý do hợp lý là đề xuất "không dựa trên" thực tế hiện trường. Ba lựa chọn còn lại đều nói đề xuất có dựa trên thực tế, mâu thuẫn với lời chê phía sau. Lựa chọn 1 dễ nhầm nhất vì つつ đôi khi mang nghĩa "dù… nhưng", song khi đó vế sau phải trái ngược với vế trước; "dựa trên thực tế mà vẫn chỉ là lý thuyết suông" thì tự mâu thuẫn.',
      ],
    ],
    points: [
      ['踏まえる', 'ふまえる', 'dựa trên, căn cứ vào'],
      ['机上の空論', 'きじょうのくうろん', 'lý thuyết suông trên giấy'],
      ['実情', 'じつじょう', 'tình hình thực tế'],
    ],
  }),
  item('w14', 'goi', 5, {
    questions: [
      [
        '双方の議論は最後まで＿＿＿まま時間切れとなり、結論は次回に持ち越された。',
        ['平行線をたどった', '一致した', 'まとまった', '決着した'],
        0,
        'Lựa chọn 1: 平行線をたどる = hai bên giữ nguyên quan điểm, không gặp nhau, nên mới hết giờ mà chưa có kết luận. Ba lựa chọn còn lại đều nói đã đi đến thống nhất, mâu thuẫn với 結論は次回に持ち越された. Lựa chọn 3 dễ nhầm nhất vì まとまる hay dùng với cuộc họp, nhưng nó nghĩa là đã chốt được ý chung.',
      ],
    ],
    points: [
      ['平行線をたどる', 'へいこうせんをたどる', 'không ai nhượng ai, không tiến triển'],
      ['時間切れ', 'じかんぎれ', 'hết giờ'],
    ],
  }),
  item('w14', 'goi', 6, {
    questions: [
      [
        'ご提案の趣旨はよく理解できます。＿＿＿、今の人員で実行できるかどうかは疑問が残ります。',
        ['それゆえ', 'すなわち', 'とはいえ', 'ましてや'],
        2,
        'Lựa chọn 3: とはいえ = tuy nói vậy nhưng; câu trước công nhận ý đề xuất, câu sau nêu nghi ngại, đúng kiểu phản đối mềm trong họp. Lựa chọn 1 dễ nhầm vì cũng là liên từ văn viết, nhưng それゆえ là "vì thế", không thể nối "hiểu rõ" với "còn nghi ngại". すなわち là "tức là", còn ましてや là "huống chi" và đòi một vế so sánh phía sau.',
      ],
    ],
    points: [
      ['とはいえ', 'とはいえ', 'tuy nói vậy nhưng'],
      ['趣旨', 'しゅし', 'ý chính, mục đích'],
    ],
  }),
  item('w14', 'hyogen', 1, {
    material: {
      kind: 'text',
      title: 'Re: 新システムのご提案について',
      body: '株式会社テクノアーク 営業部 藤井様\n\n先日はご丁寧なご説明をいただき、ありがとうございました。\nご提案いただいた在庫管理システムは、機能面では大変魅力的だと、担当一同感じております。\nもっとも、弊社では昨年、現行システムに大きな改修を加えたばかりで、社内でも「もう少し今のシステムを使い込んでから」という声が多いのが実情です。\nせっかくのご提案に対し心苦しいのですが、しばらくは現行システムで様子を見させていただければと存じます。\n今後、新しい機能などのご案内がございましたら、また情報をいただけますと幸いです。\n\n大和物流 情報システム課 杉田',
    },
    questions: [
      [
        'このメールから分かる杉田さんの会社の考えはどれですか。',
        ['機能に不満があるので、改善を求めている', '来年になったら、提案のシステムを入れるつもりだ', '現行システムの改修を、藤井さんの会社に頼みたい', '今はシステムを替える考えはないが、情報は今後も欲しい'],
        3,
        'Lựa chọn 4: しばらくは現行システムで様子を見させていただければ là cách từ chối mềm (tạm thời dùng hệ thống hiện tại), còn câu cuối vẫn xin thông tin về sau. Lựa chọn 2 dễ nhầm vì thư nghe tích cực (大変魅力的), nhưng không hề hứa thời điểm nào; năm ngoái chỉ là lúc họ vừa nâng cấp hệ thống cũ. Thư khen chức năng nên lựa chọn 1 sai.',
      ],
    ],
    points: [
      ['使い込む', 'つかいこむ', 'dùng lâu cho quen, khai thác hết'],
      ['心苦しい', 'こころぐるしい', 'áy náy, khó lòng'],
      ['様子を見る', 'ようすをみる', 'chờ xem tình hình'],
    ],
  }),
  item('w14', 'hyogen', 2, {
    material: {
      kind: 'text',
      title: '新規事業アイデア発表会のご案内（発表者向け）',
      body: '日時：2027年1月22日（金）13時開始　会場：本社10階ホール\n・発表は1チーム10分で、続けて質疑応答を5分行います。\n・チームの入れ替えには、各回2分を見込んでいます。\n・発表の順番は、事前にお配りした一覧のとおりです（全5チーム）。\n・発表資料は前日の正午までに事務局へご提出ください。当日の差し替えはできません。\n\n経営企画室 事務局',
    },
    questions: [
      [
        '3番目に発表するチームは、何時に発表を始める予定ですか。',
        ['13時30分', '13時32分', '13時34分', '13時36分'],
        2,
        'Lựa chọn 3: mỗi nhóm chiếm 10 + 5 = 15 phút, giữa hai nhóm có 2 phút đổi người. Nhóm 1: 13:00–13:15; nhóm 2: 13:17–13:32; nhóm 3 bắt đầu 13:34. Lựa chọn 1 dễ nhầm vì chỉ cộng 2 × 15 phút mà quên thời gian đổi nhóm. Lựa chọn 2 chỉ tính một lần đổi, lựa chọn 4 tính ba lần.',
      ],
    ],
    points: [
      ['質疑応答', 'しつぎおうとう', 'phần hỏi đáp'],
      ['見込む', 'みこむ', 'dự tính trước'],
      ['差し替え', 'さしかえ', 'thay thế (tài liệu)'],
    ],
  }),
  item('w14', 'hyogen', 3, {
    material: {
      kind: 'text',
      title: '来週の発表資料について',
      body: '石原さん\n\n資料をありがとうございます。全体の構成はわかりやすく、よくまとまっていると思います。\n一点だけ。5ページ目の市場規模の数字は、3年前の調査のものですね。役員の中には業界の動きに詳しい方も多いので、そこを突かれると、せっかくの提案全体が弱く見えてしまうかもしれません。\n発表は来週の木曜日ですから、まだ時間はあると思います。\n\n営業企画部長 杉本',
    },
    questions: [
      [
        '杉本部長が石原さんに最も伝えたいことは何ですか。',
        ['資料の構成をもっとわかりやすく変えてほしい', '市場規模の数字を新しいものに差し替えてほしい', '発表の日を先に延ばしてほしい', '役員に前もって資料を説明しておいてほしい'],
        1,
        'Lựa chọn 2: trưởng bộ phận không ra lệnh thẳng, nhưng chỉ ra số liệu đã cũ ba năm, lo bị các thành viên ban điều hành bắt bẻ, rồi nhắc "vẫn còn thời gian" — tức là muốn thay số liệu mới. Lựa chọn 1 dễ nhầm vì thư có nhắc 構成, nhưng phần đó được khen (わかりやすく、よくまとまっている). "Còn thời gian" là để sửa kịp, không phải xin dời ngày.',
      ],
    ],
    points: [
      ['突かれる', 'つかれる', 'bị bắt bẻ, bị chỉ trúng điểm yếu'],
      ['市場規模', 'しじょうきぼ', 'quy mô thị trường'],
    ],
  }),
  item('w14', 'sogo-dokkai', 1, {
    material: {
      kind: 'text',
      title: '伝わるプレゼンは「引き算」から',
      body: '社内で提案の発表を聞いていると、内容は優れているのに、聞き手の反応が鈍いことがよくある。原因の多くは情報の量にある。調べたことをすべて盛り込もうとするあまり、一枚のスライドに数字や文章が詰め込まれ、聞き手はどこを見ればいいのかわからなくなってしまうのだ。\n発表者にしてみれば、苦労して集めたデータを削るのは惜しい。しかし、聞き手が発表の後に覚えているのは、せいぜい二つか三つの要点にすぎない。だとすれば、最も伝えたいことを一つ決め、それを支えるデータだけを残すべきだろう。削ったデータは配布資料に回し、質疑応答で聞かれたときに示せばよい。\nもう一つ大切なのは、結論を最初に言うことだ。日本の会議では、経緯から順に説明する発表がまだ多い。だが、忙しい役員ほど「で、何をしてほしいのか」を早く知りたがっている。結論が最後まで出てこない発表は、どれほど丁寧でも、聞き手を待たせることになる。',
    },
    questions: [
      [
        '筆者によると、聞き手の反応が鈍くなる主な原因は何ですか。',
        ['スライドに情報を詰め込みすぎていること', '発表の内容が優れていないこと', '配布資料が用意されていないこと', '質疑応答の時間が短いこと'],
        0,
        'Lựa chọn 1: 原因の多くは情報の量にある — muốn nhồi hết mọi thứ nên slide chật số liệu, người nghe không biết nhìn đâu. Lựa chọn 2 dễ nhầm, nhưng câu đầu nói rõ 内容は優れているのに (nội dung tốt mà vẫn thế). Tài liệu phát tay là chỗ tác giả khuyên đưa phần dữ liệu đã lược, không phải nguyên nhân.',
      ],
      [
        '筆者の考えに最も合う発表はどれですか。',
        ['経緯から順に丁寧に説明し、最後に結論を述べる', '集めたデータをすべてスライドに載せ、説得力を高める', 'データは一切示さず、結論だけを短く伝える', '最初に結論を述べ、それを支えるデータだけをスライドに示す'],
        3,
        'Lựa chọn 4 gộp cả hai lời khuyên: nói kết luận trước, và chỉ giữ dữ liệu đỡ cho điều muốn nói nhất. Lựa chọn 3 dễ nhầm vì cũng ngắn gọn, nhưng tác giả vẫn bảo giữ dữ liệu hỗ trợ (それを支えるデータだけを残す) và đưa phần còn lại vào tài liệu phát tay. Lựa chọn 1 là kiểu trình bày tác giả phê bình ở đoạn cuối.',
      ],
    ],
    points: [
      ['盛り込む', 'もりこむ', 'đưa vào, nhồi vào (nội dung)'],
      ['せいぜい', 'せいぜい', 'nhiều lắm cũng chỉ'],
      ['にしてみれば', 'にしてみれば', 'đứng ở phía (ai) mà nói'],
      ['経緯', 'けいい', 'đầu đuôi sự việc'],
    ],
  }),
  item('w14', 'sogo-dokkai', 2, {
    material: {
      kind: 'text',
      title: '議事録：在宅勤務手当の見直しについて',
      body: '日時：2027年2月3日（水）10時〜11時\n出席：人事部 森部長、経理部 吉川課長、営業部 中野課長、総務部 太田\n\n森部長：在宅勤務の社員に一律月3,000円を支給している手当を、出社日数が増えた今の実態に合わせて見直したい。案としては、月の在宅勤務日数が10日以上の社員に限って支給する方法を考えている。\n吉川課長：その案ですと、手当の総額は年間で約4割減る見込みです。経理としては異論ありません。\n中野課長：営業部は外回りが多く、在宅勤務は月に数日ですので、ほぼ全員が対象外になります。もっとも、移動中の通信費などは別に精算していますので、手当そのものにこだわるつもりはありません。ただ、急に支給がなくなると不満も出るでしょうから、周知の仕方には配慮していただきたいと思います。\n太田：社員アンケートでは、在宅勤務中の光熱費の負担を挙げる声が多かったので、日数に応じて支給額を変える方法も検討の余地があるかと思います。\n森部長：では、10日以上という案と日数に応じた案の二つを比較できる資料を、次回までに人事部で用意します。',
    },
    questions: [
      [
        '中野課長の考えに最も近いものはどれですか。',
        ['営業部の社員が対象外になるので、見直しには反対だ', '見直しはかまわないが、社員への伝え方には気をつけてほしい', '移動中の通信費も、手当に含めてほしい', '在宅勤務の日数に応じて、支給額を変えるべきだ'],
        1,
        'Lựa chọn 2: Nakano nói không câu nệ khoản phụ cấp (手当そのものにこだわるつもりはありません), chỉ xin chú ý cách thông báo để tránh bất mãn. Lựa chọn 1 dễ nhầm vì Nakano mở đầu bằng việc phòng kinh doanh gần như ai cũng mất phụ cấp, nhưng ngay sau đó là もっとも, tức không phản đối. Đổi mức theo số ngày (lựa chọn 4) là ý của Ota.',
      ],
      [
        'この会議の結果、どうなりましたか。',
        ['二つの案を比べる資料を人事部が作り、次回また話し合う', '来月から、在宅勤務が10日以上の社員だけに手当を払う', '在宅勤務手当を廃止することが決まった', '経理部が支給額を計算し直すことになった'],
        0,
        'Lựa chọn 1: câu chốt của trưởng bộ phận Mori là phòng nhân sự sẽ chuẩn bị tài liệu so sánh hai phương án trước lần họp sau. Lựa chọn 2 dễ nhầm vì đó là phương án ban đầu và phòng kế toán không phản đối, nhưng sau ý kiến của Ota thì chưa có quyết định. Không ai đề xuất bỏ hẳn phụ cấp.',
      ],
    ],
    points: [
      ['異論', 'いろん', 'ý kiến khác, phản đối'],
      ['もっとも', 'もっとも', 'tuy nhiên (nói thêm điều kiện)'],
      ['こだわる', 'こだわる', 'câu nệ, khăng khăng'],
      ['検討の余地', 'けんとうのよち', 'còn chỗ để xem xét'],
    ],
  }),
];

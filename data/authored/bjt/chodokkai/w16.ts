import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/** Week 16 — final review: mixed themes from the whole course, exam-like. Level: J1, about a third J1+. */
export const W16: BjtItem[] = [
  item('w16', 'jokyo', 1, {
    material: {
      kind: 'table',
      title: '宅配便 サービス一覧',
      head: ['サービス', 'お届け', '料金', '時間帯指定'],
      rows: [
        ['A 通常便', '2〜3日後', '800円', '不可'],
        ['B 翌日便', '翌日', '1,200円', '可'],
        ['C 翌朝便', '翌日午前10時まで', '1,800円', '不可'],
        ['D 当日便', '当日中', '2,500円', '不可'],
      ],
    },
    script: [
      ['男', 'この見本、取引先に送っておいてくれる？明日の打ち合わせで使うそうなんだ。', 'Em gửi giúp mẫu này cho đối tác nhé? Họ bảo sẽ dùng trong buổi họp ngày mai.'],
      ['女', '打ち合わせは何時からですか。', 'Buổi họp bắt đầu lúc mấy giờ ạ?'],
      ['男', '午後二時から。それまでに届けばいいよ。ただ、先方の受付は十二時から一時まで誰もいないから、その時間は避けてほしいって。', 'Từ hai giờ chiều. Tới trước giờ đó là được. Có điều quầy lễ tân bên đó từ mười hai giờ tới một giờ không có ai, họ dặn tránh khung giờ đó.'],
      ['女', 'わかりました。じゃあ、時間が指定できるもので、一番安いのにしますね。', 'Vâng. Vậy em chọn loại chỉ định được giờ mà rẻ nhất nhé.'],
    ],
    questions: [
      [
        '女の人はどのサービスを選びますか。',
        ['A 通常便', 'B 翌日便', 'C 翌朝便', 'D 当日便'],
        1,
        'Lựa chọn 2: cần tới ngày mai trước 2 giờ chiều và tránh 12–1 giờ, nên phải chỉ định được giờ; chỉ B làm được, giá 1.200 yên. Lựa chọn 3 dễ chọn vì chắc chắn tới trước 10 giờ sáng (cũng ngoài giờ nghỉ trưa), nhưng không chỉ định giờ được và đắt hơn, trái với lời cô ấy chốt. A có thể không kịp ngày mai.',
      ],
    ],
    points: [
      ['宅配便', 'たくはいびん', 'dịch vụ chuyển phát tận nơi'],
      ['時間帯指定', 'じかんたいしてい', 'chỉ định khung giờ'],
      ['見本', 'みほん', 'hàng mẫu'],
    ],
  }),
  item('w16', 'jokyo', 2, {
    material: {
      kind: 'table',
      title: '新しい名刺（校正）',
      head: ['項目', '内容'],
      rows: [
        ['氏名', '中西 恵'],
        ['所属', '営業部 第一営業課'],
        ['役職', '主任'],
        ['電話', '03-5555-0123'],
        ['メール', 'm.nakanishi@example.co.jp'],
      ],
    },
    script: [
      ['同僚', '中西さん、名刺の校正が届きましたよ。確認してもらえますか。', 'Nakanishi ơi, bản in thử danh thiếp tới rồi. Kiểm tra giúp nhé?'],
      ['中西', 'ありがとうございます。あ、四月から第二営業課に変わるんです。役職はそのままなんですけど。', 'Cảm ơn nhé. À, từ tháng 4 tôi chuyển sang phòng Kinh doanh 2. Chức vụ thì vẫn vậy.'],
      ['同僚', 'じゃあ、課の名前を直しますね。ほかは大丈夫ですか。', 'Vậy sửa tên phòng nhé. Còn chỗ khác ổn không?'],
      ['中西', 'ええと…電話番号、最後は〇一三二なんです。メールはこれで合っています。', 'Để xem… Số điện thoại, bốn số cuối là 0132. Email thì đúng rồi.'],
    ],
    questions: [
      [
        '直さなければならないのはどこですか。',
        ['所属と電話', '所属と役職', '役職とメール', '電話とメール'],
        0,
        'Lựa chọn 1: phòng đổi sang 第二営業課, và số điện thoại in là 0123 trong khi đúng là 0132. Lựa chọn 2 dễ chọn vì người này nói tới chức vụ, nhưng nói rõ 役職はそのまま (giữ nguyên). Email đã đúng.',
      ],
    ],
    points: [
      ['校正', 'こうせい', 'bản in thử để soát lỗi; soát lỗi'],
      ['役職', 'やくしょく', 'chức vụ'],
      ['所属', 'しょぞく', 'đơn vị trực thuộc'],
    ],
  }),
  item('w16', 'shiryo', 1, {
    material: {
      kind: 'bars',
      title: '月別売上（第1営業課）',
      unit: '万円',
      labels: ['4月', '5月', '6月', '7月'],
      series: [
        { name: '目標', values: [500, 500, 550, 550] },
        { name: '実績', values: [480, 530, 560, 520] },
      ],
    },
    script: [['女', '目標を達成した月のうち、目標を上回った額が最も大きかった月について、担当チームを社内報で紹介します。', 'Trong các tháng đạt mục tiêu, tháng nào vượt mục tiêu nhiều nhất thì nhóm phụ trách tháng đó sẽ được giới thiệu trên bản tin nội bộ.']],
    questions: [
      [
        '社内報で紹介されるのは、どの月の担当チームですか。',
        ['4月', '5月', '6月', '7月'],
        1,
        'Lựa chọn 2: đạt mục tiêu có tháng 5 (+30 vạn) và tháng 6 (+10 vạn); vượt nhiều nhất là tháng 5. Lựa chọn 3 dễ chọn vì tháng 6 có doanh thu thực tế cao nhất (560), nhưng câu hỏi là mức vượt mục tiêu, mà mục tiêu tháng 6 cũng cao hơn.',
      ],
    ],
    points: [
      ['実績', 'じっせき', 'kết quả thực tế'],
      ['社内報', 'しゃないほう', 'bản tin nội bộ'],
      ['上回る', 'うわまわる', 'vượt hơn'],
    ],
  }),
  item('w16', 'shiryo', 2, {
    material: {
      kind: 'table',
      title: 'ノベルティ用ボールペン 見積比較',
      head: ['会社', '単価', '送料', '最低注文数'],
      rows: [
        ['A社', '120円', '3,000円', '100本'],
        ['B社', '110円', '8,000円', '500本'],
        ['C社', '115円', '無料', '200本'],
        ['D社', '105円', '10,000円', '300本'],
      ],
    },
    script: [['男', '今回は三百本だけ注文します。送料も含めた総額で、一番安いところにお願いしましょう。', 'Lần này chỉ đặt ba trăm cây. Ta chọn chỗ rẻ nhất tính theo tổng tiền, gồm cả phí gửi.']],
    questions: [
      [
        'どの会社に注文しますか。',
        ['A社', 'B社', 'C社', 'D社'],
        2,
        'Lựa chọn 3: với 300 cây, A = 36.000 + 3.000 = 39.000 yên; B không nhận vì tối thiểu 500 cây; C = 34.500 yên, miễn phí gửi; D = 31.500 + 10.000 = 41.500 yên. Lựa chọn 4 dễ chọn vì đơn giá thấp nhất, nhưng phí gửi làm tổng cao nhất.',
      ],
    ],
    points: [
      ['単価', 'たんか', 'đơn giá'],
      ['最低注文数', 'さいていちゅうもんすう', 'số lượng đặt tối thiểu'],
      ['総額', 'そうがく', 'tổng số tiền'],
    ],
  }),
  item('w16', 'shiryo', 3, {
    material: {
      kind: 'text',
      title: '在宅勤務の申請について',
      body: '・在宅勤務は1週間（月曜〜金曜）に2日までとします。\n・前営業日の15時までに、社内システムで申請してください。\n・入社3か月未満の社員は対象外です。',
    },
    script: [
      ['男', '来週の月曜と火曜、在宅にしたいんですけど、今週はもう水曜と木曜に在宅を取っているんです。大丈夫でしょうか。', 'Tôi muốn làm ở nhà thứ hai và thứ ba tuần sau, nhưng tuần này tôi đã làm ở nhà thứ tư và thứ năm rồi. Có được không ạ?'],
      ['女', '週が違うから、それは問題ありませんよ。ただ、月曜の分は、今週の金曜の三時までに出してくださいね。', 'Khác tuần nên không sao đâu. Có điều phần thứ hai thì nộp trước ba giờ chiều thứ sáu tuần này nhé.'],
    ],
    questions: [
      [
        '男の人について、正しいのはどれですか。',
        ['来週は在宅勤務ができない', '今週の在宅勤務を一日取り消す必要がある', '来週は一日しか在宅勤務ができない', '月曜の分は今週金曜の15時までに申請する'],
        3,
        'Lựa chọn 4: hạn là 15 giờ của ngày làm việc trước đó; trước thứ hai là thứ sáu (thứ bảy, chủ nhật nghỉ). Giới hạn hai ngày tính theo từng tuần, nên lựa chọn 1, 2 và 3 đều là bẫy cho người cộng dồn bốn ngày của hai tuần.',
      ],
    ],
    points: [
      ['前営業日', 'ぜんえいぎょうび', 'ngày làm việc liền trước'],
      ['対象外', 'たいしょうがい', 'ngoài đối tượng áp dụng'],
    ],
  }),
  item('w16', 'sogo-chodokkai', 1, {
    material: {
      kind: 'table',
      title: '新製品発表会 当日の進行と担当',
      head: ['時間', '内容', '担当'],
      rows: [
        ['13:00', '受付開始', '総務 内田'],
        ['13:30', '社長あいさつ', '—'],
        ['13:40', '製品説明', '開発 千葉'],
        ['14:30', '質疑応答', '開発 千葉'],
        ['15:00', '個別相談会', '営業 三宅'],
      ],
    },
    script: [
      ['三宅', '内田さん、当日のことなんですけど、千葉さんが海外の学会と重なって、来られなくなったそうです。', 'Uchida ơi, về hôm đó, nghe nói Chiba trùng hội thảo khoa học ở nước ngoài nên không đến được.'],
      ['内田', 'えっ、製品説明はどうするんですか。', 'Ơ, vậy phần giới thiệu sản phẩm thì sao?'],
      ['三宅', '説明は、開発の部長が代わりにしてくださることになりました。ただ、質疑応答は技術的な質問が多いでしょうから、千葉さんにオンラインでつないで答えてもらいます。', 'Phần giới thiệu thì trưởng bộ phận phát triển sẽ làm thay. Còn phần hỏi đáp chắc nhiều câu hỏi kỹ thuật, nên sẽ kết nối trực tuyến với Chiba để Chiba trả lời.'],
      ['内田', 'じゃあ、会場にネット回線とスクリーンを用意しないといけませんね。', 'Vậy phải chuẩn bị đường truyền mạng và màn hình ở hội trường rồi.'],
      ['三宅', 'お願いできますか。それと、受付は僕も手伝いますので、個別相談会の準備は、始まる十分前から始めます。', 'Nhờ Uchida được không? Với lại tôi cũng sẽ phụ ở quầy lễ tân, nên phần chuẩn bị buổi tư vấn riêng tôi sẽ bắt đầu từ mười phút trước giờ.'],
    ],
    questions: [
      [
        '当日、製品説明をするのは誰ですか。',
        ['開発の部長', '千葉さん', '三宅さん', '内田さん'],
        0,
        'Lựa chọn 1: Chiba vắng, trưởng bộ phận phát triển làm thay phần giới thiệu. Lựa chọn 2 dễ chọn vì Chiba vẫn tham gia, nhưng chỉ trả lời trực tuyến ở phần hỏi đáp, không phải phần giới thiệu.',
      ],
      [
        '内田さんが準備しなければならないことは何ですか。',
        ['海外の学会への連絡', '個別相談会の資料', 'ネット回線とスクリーン', '受付の名簿'],
        2,
        'Lựa chọn 3: để nối mạng với Chiba cần đường truyền và màn hình; Miyake nhờ お願いできますか. Lựa chọn 2 là việc của Miyake, chuẩn bị từ mười phút trước giờ bắt đầu.',
      ],
    ],
    points: [
      ['学会', 'がっかい', 'hội thảo khoa học, hội học thuật'],
      ['個別相談会', 'こべつそうだんかい', 'buổi tư vấn riêng từng khách'],
      ['回線', 'かいせん', 'đường truyền'],
    ],
  }),
  item('w16', 'sogo-chodokkai', 2, {
    material: {
      kind: 'text',
      title: 'コピー用紙など 4月出荷分から値上げ',
      body: '大手事務用品メーカー3社は、4月1日出荷分から、コピー用紙などの価格を平均8%引き上げると発表した。パルプ価格と物流費の上昇が理由だという。なお、各社とも3月中に受けた注文については、出荷が4月以降になる場合も現行の価格で受け付けるとしている。',
    },
    script: [
      ['矢野', '課長、コピー用紙、来月から値上げだそうなので、今月のうちにまとめて買っておきませんか。半年分買っておけば、八パーセント分浮きますよ。', 'Trưởng phòng, nghe nói từ tháng sau giấy photo tăng giá, mình mua dồn ngay trong tháng này không ạ? Mua đủ dùng nửa năm thì tiết kiệm được tám phần trăm đó.'],
      ['課長', 'うーん、倉庫に半年分も置けるかなあ。', 'Ừm, kho có chứa nổi lượng nửa năm không nhỉ.'],
      ['矢野', '会議室の隣の倉庫なら、三か月分は入ると思います。', 'Kho cạnh phòng họp thì chắc chứa được lượng ba tháng.'],
      ['課長', 'それに、来年度から会議資料は電子化する方針だから、紙の使用量自体が減るはずなんだよね。', 'Với lại từ năm tới chủ trương là số hoá tài liệu họp, nên bản thân lượng giấy dùng chắc sẽ giảm.'],
      ['矢野', 'あ、そうでしたね。じゃあ、今月中に、置ける分だけ注文しておきます。', 'À, đúng rồi ạ. Vậy trong tháng này em đặt vừa đủ lượng chứa được thôi.'],
    ],
    questions: [
      [
        '課長は、半年分まとめて買うことについてどう考えていますか。',
        ['値上げ前なので、ぜひそうするべきだ', '値上げ後に買ったほうが安くなる', '電子化するので、紙はまったく買わなくていい', '置き場所や今後の使用量を考えると、多すぎる'],
        3,
        'Lựa chọn 4: trưởng phòng không nói "không" mà nêu hai điều: kho có chứa nổi không, và lượng giấy sẽ giảm vì số hoá. Lựa chọn 3 đi quá xa: lượng dùng giảm chứ không mất hẳn, và cuối cùng vẫn mua.',
      ],
      [
        '矢野さんはどうしますか。',
        ['3月中に3か月分を注文する', '4月以降に半年分を注文する', '3月中に半年分を注文する', '4月以降に必要な分だけ注文する'],
        0,
        'Lựa chọn 1: "lượng chứa được" là ba tháng, và đặt "trong tháng này"; giá tăng từ tháng sau, tức tháng 4, nên tháng này là tháng 3. Theo câu sau なお, đơn nhận trong tháng 3 vẫn giữ giá cũ dù giao sau. Lựa chọn 3 là ý ban đầu, đã bị bỏ.',
      ],
    ],
    points: [
      ['浮く', 'うく', 'tiết kiệm được, dư ra (tiền)'],
      ['現行', 'げんこう', 'hiện hành'],
      ['電子化', 'でんしか', 'số hoá'],
    ],
  }),
];

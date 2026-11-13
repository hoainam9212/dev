import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/** Week 9 — complaints and apologies. Level: J1. */
export const W09: BjtItem[] = [
  item('w09', 'jokyo', 1, {
    material: {
      kind: 'table',
      title: '対応案（破損した電子レンジ）',
      head: ['案', '対応', 'お届け', '当社の費用'],
      rows: [
        ['A', '返金', '―', '5,000円'],
        ['B', '新品と交換', '翌日', '3,000円'],
        ['C', '修理', '1週間後', '1,500円'],
        ['D', '新品と交換＋割引券', '翌日', '4,500円'],
      ],
    },
    script: [
      ['女', '電子レンジが壊れて届いたお客様の件、どう対応しましょうか。', 'Vụ khách nhận lò vi sóng bị vỡ, mình xử lý thế nào ạ?'],
      ['男', 'お客様は、お金を返してもらうより、とにかく早く使いたいとおっしゃっているんだよね。', 'Khách nói là hơn cả được trả tiền, họ muốn dùng được càng sớm càng tốt.'],
      ['女', 'では、割引券もお付けして…。', 'Vậy mình tặng thêm phiếu giảm giá…'],
      ['男', 'いや、お客様はそこまで求めていらっしゃらないから。早くお届けすることを一番に考えよう。', 'Không, khách không đòi đến mức đó. Cứ ưu tiên giao sớm nhất đã.'],
    ],
    questions: [
      [
        'どの対応になりますか。',
        ['A', 'B', 'C', 'D'],
        1,
        'Khách muốn dùng sớm, không cần hoàn tiền → loại A. Sửa mất một tuần → loại C. Phiếu giảm giá bị gạt đi → loại D. Còn B: đổi máy mới, giao ngày hôm sau.',
      ],
    ],
    points: [
      ['返金', 'へんきん', 'hoàn tiền'],
      ['破損', 'はそん', 'hư hỏng, vỡ'],
    ],
  }),
  item('w09', 'jokyo', 2, {
    material: {
      kind: 'table',
      title: '返品・交換受付票（理由欄）',
      head: ['', '理由'],
      rows: [
        ['A', '注文と違う商品が届いた'],
        ['B', '商品が破損していた'],
        ['C', '数量が足りなかった'],
        ['D', 'お客様のご都合（イメージ違いなど）'],
      ],
    },
    script: [
      ['女', 'あの、注文は十箱だったんですが、届いたのは九箱だったんです。', 'À, tôi đặt mười thùng, nhưng chỉ nhận được chín thùng.'],
      ['男', '大変申し訳ございません。届いた商品に、何か問題はございませんでしたか。', 'Thành thật xin lỗi chị. Hàng nhận được có vấn đề gì không ạ?'],
      ['女', 'いえ、中身はちゃんとしています。注文したとおりの商品でした。', 'Không, bên trong ổn cả. Đúng là hàng tôi đặt.'],
    ],
    questions: [
      [
        '受付票のどの理由に印をつけますか。',
        ['A', 'B', 'C', 'D'],
        2,
        'Đặt mười thùng, nhận chín: thiếu số lượng = C. Khách xác nhận hàng đúng loại và không hư, nên loại A và B. D là lý do từ phía khách, không đúng ở đây.',
      ],
    ],
    points: [
      ['数量', 'すうりょう', 'số lượng'],
      ['受付票', 'うけつけひょう', 'phiếu tiếp nhận'],
    ],
  }),
  item('w09', 'shiryo', 1, {
    material: {
      kind: 'bars',
      title: 'お客様からの苦情件数（内容別）',
      unit: '件',
      labels: ['配送の遅れ', '商品の破損', '電話対応', '請求の誤り'],
      series: [
        { name: '先月', values: [24, 15, 10, 6] },
        { name: '今月', values: [18, 16, 21, 5] },
      ],
    },
    script: [['男', '苦情の件数が先月の二倍以上になった項目については、今月中に担当者向けの研修を行います。', 'Hạng mục nào có số khiếu nại tăng gấp đôi trở lên so với tháng trước sẽ được tổ chức đào tạo cho người phụ trách ngay trong tháng này.']],
    questions: [
      [
        '研修を行うのはどの項目ですか。',
        ['電話対応', '配送の遅れ', '商品の破損', '請求の誤り'],
        0,
        'Ứng đối điện thoại 10 → 21, hơn gấp đôi. Giao chậm có nhiều khiếu nại nhất nhưng đã giảm (24 → 18). Hàng hư chỉ tăng một.',
      ],
    ],
    points: [['苦情件数', 'くじょうけんすう', 'số vụ khiếu nại']],
  }),
  item('w09', 'shiryo', 2, {
    material: {
      kind: 'table',
      title: '返品・交換のご案内',
      head: ['条件', '対応'],
      rows: [
        ['到着後7日以内・未開封', '返品・交換とも可'],
        ['到着後7日以内・開封済み', '交換のみ可'],
        ['到着後8〜30日・初期不良', '交換のみ可'],
        ['到着後31日以降', '不可（修理は有償）'],
      ],
    },
    script: [['女', '二週間前に届いた電気ポットなんですが、最初から電源が入らなかったんです。忙しくて、連絡が遅くなってしまって。返品したいんですけど。', 'Tôi nhận ấm điện hai tuần trước, mà ngay từ đầu đã không bật được nguồn. Vì bận nên tôi liên lạc muộn. Tôi muốn trả hàng.']],
    questions: [
      [
        '店の人はどう答えますか。',
        ['返品できます', '交換も返品もできません', '有償で修理します', '交換ならできます'],
        3,
        'Hai tuần là ngày thứ 8–30, và hỏng từ đầu (初期不良) → chỉ đổi được, không trả được. Khách muốn trả hàng, nhưng theo bảng chỉ được đổi. Sửa có phí chỉ áp dụng từ ngày 31.',
      ],
    ],
    points: [
      ['初期不良', 'しょきふりょう', 'lỗi từ khi mới nhận'],
      ['有償', 'ゆうしょう', 'có tính phí'],
      ['未開封', 'みかいふう', 'chưa mở'],
    ],
  }),
  item('w09', 'shiryo', 3, {
    material: {
      kind: 'text',
      title: 'お詫び状（下書き）',
      body: '① このたびは、弊社の配送ミスにより多大なるご迷惑をおかけしましたことを、深くお詫び申し上げます。\n② 原因は、出荷担当者の確認不足によるものでございました。\n③ 今後は、出荷前に二名で確認する体制に改め、再発防止に努めてまいります。\n④ なお、お客様におかれましても、お受け取りの際に中身をご確認いただけますと幸いです。',
    },
    script: [['男', 'よく書けているけど、一か所だけ、お詫びの手紙には入れないほうがいいところがあるね。今回は、お客様に何かをお願いするのは控えよう。そこは削って。', 'Viết tốt rồi, nhưng có một chỗ không nên đưa vào thư xin lỗi. Lần này đừng nhờ khách làm gì cả. Bỏ chỗ đó đi.']],
    questions: [
      [
        'どこを削りますか。',
        ['②', '④', '①', '③'],
        1,
        'Đoạn ④ nhờ khách kiểm tra hàng khi nhận, tức là chuyển một phần trách nhiệm sang khách. Đây là điều anh bảo bỏ đi. ① là lời xin lỗi, ② là nguyên nhân, ③ là biện pháp chống tái phạm, đều cần có.',
      ],
    ],
    points: [
      ['お詫び状', 'おわびじょう', 'thư xin lỗi'],
      ['再発防止', 'さいはつぼうし', 'phòng tránh tái phạm'],
      ['控える', 'ひかえる', 'hạn chế, tránh'],
    ],
  }),
  item('w09', 'sogo-chodokkai', 1, {
    material: {
      kind: 'text',
      title: '苦情対応記録',
      body: '受付日：10月5日\nお客様：株式会社みどり不動産 総務部 小林様\n内容：納品したコピー用紙（A4・50箱）のうち、5箱が水に濡れていた。\n対応：小林様に電話でお詫び済み。10月6日、代替品5箱を宅配便で発送予定。\n担当：営業2課 高田',
    },
    script: [
      ['女', 'みどり不動産さんの件、代わりの用紙はもう送った？', 'Vụ Bất động sản Midori, giấy thay thế em gửi chưa?'],
      ['男', 'いえ、明日、宅配便で発送する予定です。', 'Chưa ạ, mai em gửi chuyển phát.'],
      ['女', '小林様には、電話でお詫びしたのよね。', 'Em đã gọi điện xin lỗi chị Kobayashi rồi nhỉ.'],
      ['男', 'はい。', 'Vâng.'],
      ['女', '今回は五箱だけど、ほかの箱も濡れていないか、心配されているかもしれないわ。代わりの用紙は、明日の便じゃなくて、今日のうちにあなたが直接お届けして。ほかの箱の状態も一緒に見てきてちょうだい。', 'Lần này là năm thùng, nhưng có khi khách lo các thùng khác cũng bị ướt. Giấy thay thế đừng gửi chuyến mai, em mang đến tận nơi ngay hôm nay. Xem luôn tình trạng các thùng khác nhé.'],
      ['男', 'わかりました。すぐに準備します。', 'Vâng. Em chuẩn bị ngay.'],
    ],
    questions: [
      [
        '代わりの用紙はどうやって届けますか。',
        ['明日、宅配便で送る', '明日、小林様が取りに来る', '今日、男の人が直接持っていく', '今日、宅配便で送る'],
        2,
        'Biên bản ghi gửi chuyển phát ngày 6, nhưng người phụ nữ (cấp trên) đổi thành hôm nay, tự anh mang tới. Lựa chọn 1 là kế hoạch ban đầu, đã bị sửa.',
      ],
      [
        '男の人がみどり不動産でほかにすることは何ですか。',
        ['小林様に電話でお詫びする', 'ほかの箱が濡れていないか確認する', '濡れた箱を持ち帰って調べる', '新しい注文を受ける'],
        1,
        'Người phụ nữ dặn ほかの箱の状態も一緒に見てきて. Gọi điện xin lỗi đã làm rồi (お詫び済み). Không ai bảo mang thùng ướt về.',
      ],
    ],
    points: [
      ['代替品', 'だいたいひん', 'hàng thay thế'],
      ['濡れる', 'ぬれる', 'bị ướt'],
      ['直接', 'ちょくせつ', 'trực tiếp'],
    ],
  }),
  item('w09', 'sogo-chodokkai', 2, {
    material: {
      kind: 'text',
      title: 'お客様アンケート（自由記述より）',
      body: '「スタッフの方の説明は、とても丁寧でわかりやすかったです。ただ、予約の電話がなかなかつながらず、三回目でやっとつながりました。また、ウェブサイトで予約できると思っていたのですが、ウェブでは空き状況を見られるだけで、予約はお電話のみとのこと。少し残念でした。」（40代・女性）',
    },
    script: [
      ['男', 'このご意見、どう思う？', 'Em thấy ý kiến này thế nào?'],
      ['女', '電話がつながりにくいのは、お昼休みの時間に電話が集中しているからだと思います。', 'Tôi nghĩ điện thoại khó gọi là vì các cuộc gọi dồn vào giờ nghỉ trưa.'],
      ['男', 'それもあるけど、根本はウェブで予約できないことだよね。空き状況が見られるなら、予約もできると思うのが自然だよ。', 'Cũng có cái đó, nhưng gốc rễ là không đặt được trên web. Đã xem được chỗ trống thì ai cũng nghĩ là đặt được.'],
      ['女', 'では、ウェブ予約の機能を追加できないか、システム会社に相談しましょうか。', 'Vậy mình hỏi công ty hệ thống xem có thêm được chức năng đặt trên web không ạ?'],
      ['男', 'うん。ただ、それには時間がかかるから、当面は、ウェブのページに「ご予約はお電話で」とはっきり書いておこう。すぐにできるからね。', 'Ừ. Nhưng việc đó mất thời gian, nên trước mắt ghi rõ trên trang web là "Đặt chỗ qua điện thoại". Cái đó làm được ngay.'],
    ],
    questions: [
      [
        'お客様が良かったと書いているのはどんな点ですか。',
        ['スタッフの説明', '電話のつながりやすさ', 'ウェブ予約の便利さ', '予約の空き状況'],
        0,
        'Khách khen phần giải thích của nhân viên (丁寧でわかりやすかった). Sau ただ là những điểm chưa tốt: điện thoại khó gọi, không đặt được trên web.',
      ],
      [
        'すぐに行う対策は何ですか。',
        ['電話の受付時間を延ばす', '昼休みのスタッフを増やす', 'ウェブ予約の機能を追加する', 'ウェブページに予約方法をはっきり書く'],
        3,
        'Thêm chức năng đặt trên web mất thời gian, nên 当面 (trước mắt) sẽ ghi rõ cách đặt chỗ trên trang. Giờ nghỉ trưa chỉ là nhận xét của người phụ nữ, không dẫn tới biện pháp nào.',
      ],
    ],
    points: [
      ['根本', 'こんぽん', 'gốc rễ'],
      ['当面', 'とうめん', 'trước mắt'],
      ['自由記述', 'じゆうきじゅつ', 'phần tự ghi ý kiến'],
    ],
  }),
];

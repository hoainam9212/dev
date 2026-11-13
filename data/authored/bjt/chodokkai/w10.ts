import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/** Week 10 — contracts, quotations and deliveries. Level: J1. */
export const W10: BjtItem[] = [
  item('w10', 'jokyo', 1, {
    material: {
      kind: 'table',
      title: '分納スケジュール案（合計1,000個）',
      head: ['案', '1回目', '2回目', '3回目'],
      rows: [
        ['A', '5/10 400個', '5/20 300個', '5/30 300個'],
        ['B', '5/10 500個', '5/25 500個', '―'],
        ['C', '5/15 400個', '5/25 300個', '6/5 300個'],
        ['D', '5/10 300個', '5/20 300個', '5/30 400個'],
      ],
    },
    script: [
      ['男', '合計千個を、三回に分けて届けてほしいんです。', 'Tổng một nghìn cái, tôi muốn giao làm ba lần.'],
      ['男', '一回目は十日に必要で、四百個ないと生産ラインを動かせません。残りは、月末までにすべてそろえばいいです。', 'Lần đầu cần vào ngày mười, và phải có bốn trăm cái mới chạy được dây chuyền. Phần còn lại chỉ cần đủ hết trước cuối tháng.'],
    ],
    questions: [
      [
        'どの案になりますか。',
        ['A', 'B', 'C', 'D'],
        0,
        'Ba lần → loại B (chỉ hai lần). Lần đầu ngày 10 → loại C (ngày 15). Lần đầu phải có 400 cái → loại D (300). A thoả cả ba và xong trước cuối tháng (30/5).',
      ],
    ],
    points: [
      ['生産ライン', 'せいさんらいん', 'dây chuyền sản xuất'],
      ['そろう', 'そろう', 'đủ, đầy đủ'],
    ],
  }),
  item('w10', 'jokyo', 2, {
    material: {
      kind: 'table',
      title: '業務委託契約書（目次）',
      head: ['条', '内容'],
      rows: [
        ['第3条', '納期'],
        ['第5条', '支払い条件'],
        ['第7条', '秘密保持'],
        ['第9条', '契約期間と更新'],
      ],
    },
    script: [['女', '先方から、お支払いを翌月末から翌々月末にしてほしい、という修正のご依頼がありました。該当する条項を直してください。契約期間はそのままです。', 'Bên kia đề nghị sửa: thanh toán từ cuối tháng sau thành cuối tháng sau nữa. Anh sửa điều khoản tương ứng nhé. Thời hạn hợp đồng giữ nguyên.']],
    questions: [
      [
        'どの条を直しますか。',
        ['第3条', '第9条', '第5条', '第7条'],
        2,
        'Thời hạn thanh toán thuộc 支払い条件 = điều 5. Từ "tháng" dễ làm liên tưởng sang thời hạn hợp đồng (điều 9), nhưng chị nói rõ thời hạn hợp đồng giữ nguyên.',
      ],
    ],
    points: [
      ['該当する', 'がいとうする', 'tương ứng, thuộc vào'],
      ['秘密保持', 'ひみつほじ', 'bảo mật'],
    ],
  }),
  item('w10', 'shiryo', 1, {
    material: {
      kind: 'table',
      title: 'お見積書',
      head: ['品目', '単価', '数量', '金額'],
      rows: [
        ['ノートパソコン', '120,000円', '5台', '600,000円'],
        ['モニター', '30,000円', '5台', '150,000円'],
        ['設定作業', '10,000円', '5台', '50,000円'],
        ['合計', '', '', '800,000円'],
      ],
      note: '金額は税抜きです。',
    },
    script: [['男', '先方から連絡があって、モニターは今回は要らないそうです。それから、パソコンの台数を五台から六台に増やしたいとのことでした。設定作業も台数分お願いしたいそうです。見積もりを出し直してください。', 'Bên kia liên lạc, nói lần này không cần màn hình. Ngoài ra họ muốn tăng số máy tính từ năm lên sáu. Cài đặt cũng làm theo số máy. Nhờ làm lại báo giá.']],
    questions: [
      [
        '新しい見積もりの合計はいくらですか。',
        ['800,000円', '960,000円', '720,000円', '780,000円'],
        3,
        'Máy tính 6 × 120.000 = 720.000; cài đặt 6 × 10.000 = 60.000; bỏ màn hình. Tổng 780.000 yên. 960.000 là khi quên bỏ màn hình. 720.000 là quên tiền cài đặt.',
      ],
    ],
    points: [
      ['見積書', 'みつもりしょ', 'bản báo giá'],
      ['出し直す', 'だしなおす', 'gửi lại (bản đã sửa)'],
      ['税抜き', 'ぜいぬき', 'chưa gồm thuế'],
    ],
  }),
  item('w10', 'shiryo', 2, {
    material: {
      kind: 'table',
      title: '運送会社の比較',
      head: ['会社', '料金（1回）', '到着日数', '遅延率'],
      rows: [
        ['A運輸', '12万円', '2日', '5%'],
        ['B急便', '15万円', '1日', '1%'],
        ['C物流', '10万円', '3日', '8%'],
        ['D運送', '13万円', '2日', '2%'],
      ],
    },
    script: [['女', '料金だけで決めるのはやめましょう。遅延率が三パーセント以下の会社の中から、一番安いところを選んでください。到着は二日以内なら問題ありません。', 'Đừng chỉ dựa vào giá. Hãy chọn công ty rẻ nhất trong số những công ty có tỉ lệ giao chậm từ ba phần trăm trở xuống. Thời gian đến trong vòng hai ngày là không vấn đề.']],
    questions: [
      [
        'どの会社を選びますか。',
        ['A運輸', 'D運送', 'C物流', 'B急便'],
        1,
        'Tỉ lệ chậm ≤ 3%: B (1%) và D (2%). Cả hai đến trong hai ngày. Rẻ hơn là D (13 vạn yên). C rẻ nhất nhưng chậm 8%. B nhanh và chắc nhất nhưng đắt hơn.',
      ],
    ],
    points: [
      ['遅延率', 'ちえんりつ', 'tỉ lệ giao chậm'],
      ['運送', 'うんそう', 'vận chuyển'],
    ],
  }),
  item('w10', 'shiryo', 3, {
    material: {
      kind: 'text',
      title: '保守契約の更新について',
      body: '保守契約の更新について\n\n現在の契約期間：2025年4月1日〜2026年3月31日\n\n※契約満了日の1か月前までに、書面による解約のお申し出がない場合は、同一条件にて1年間自動更新となります。',
    },
    script: [['男', '来年度はこの契約をやめて、別の会社に切り替える予定です。自動で更新されないように、期限に間に合うよう手続きをお願いします。', 'Năm tài chính tới chúng ta sẽ chấm dứt hợp đồng này và chuyển sang công ty khác. Nhờ làm thủ tục kịp hạn để hợp đồng không tự động gia hạn.']],
    questions: [
      [
        '解約の申し出は、いつまでに必要ですか。',
        ['2026年2月28日', '2026年3月31日', '2025年4月1日', '2026年4月30日'],
        0,
        'Ngày hết hạn là 31/3/2026; phải gửi văn bản xin chấm dứt trước đó một tháng, tức trước khoảng 28/2/2026. 31/3 là ngày hết hạn: đợi đến lúc đó thì hợp đồng đã tự gia hạn.',
      ],
    ],
    points: [
      ['自動更新', 'じどうこうしん', 'tự động gia hạn'],
      ['契約満了日', 'けいやくまんりょうび', 'ngày hết hạn hợp đồng'],
      ['書面', 'しょめん', 'văn bản'],
    ],
  }),
  item('w10', 'sogo-chodokkai', 1, {
    material: {
      kind: 'text',
      title: '発注書（下書き）',
      body: '発注書\n\n発注番号：P-2087\n品名：業務用マスク（50枚入り）\n数量：200箱\n単価：1,500円\n納期：11月15日\n納品先：本社1階 総務部',
    },
    script: [
      ['男', 'この発注書、送る前に確認していただけますか。', 'Chị xem giúp đơn đặt hàng này trước khi gửi được không ạ?'],
      ['女', '数量は二百箱でよかった？先週の会議で、各支店の分もまとめて注文することになったはずよ。', 'Số lượng hai trăm hộp là đúng chưa? Họp tuần trước đã quyết là đặt gộp luôn phần của các chi nhánh mà.'],
      ['男', 'あ、そうでした。支店の分が百箱ありました。', 'À, đúng rồi. Phần của các chi nhánh là một trăm hộp.'],
      ['女', 'それと、支店の分は、それぞれの支店に直接届けてもらいましょう。本社から送り直すと手間だから。', 'Còn nữa, phần của chi nhánh thì nhờ giao thẳng đến từng chi nhánh. Từ trụ sở gửi lại thì mất công.'],
      ['男', 'では、納品先を分けて書きます。', 'Vậy tôi sẽ ghi tách địa chỉ giao hàng.'],
    ],
    questions: [
      [
        '正しい数量は何箱ですか。',
        ['二百箱', '百箱', '三百箱', '五十箱'],
        2,
        'Hai trăm hộp cho trụ sở + một trăm hộp cho các chi nhánh = ba trăm hộp. Một trăm chỉ là phần của chi nhánh. Năm mươi là số chiếc trong một hộp.',
      ],
      [
        '男の人は発注書をどう直しますか。',
        ['数量を増やして、納品先を本社と各支店に分ける', '単価を変える', '納期を早める', '納品先を支店だけにする'],
        0,
        'Sửa hai chỗ: tăng số lượng và tách địa chỉ giao (本社 và từng chi nhánh). Phần của trụ sở vẫn giao về trụ sở, nên lựa chọn 4 sai. Đơn giá và hạn giao không ai nhắc tới.',
      ],
    ],
    points: [
      ['発注書', 'はっちゅうしょ', 'đơn đặt hàng'],
      ['納品先', 'のうひんさき', 'nơi giao hàng'],
      ['手間', 'てま', 'công sức, phiền'],
    ],
  }),
  item('w10', 'sogo-chodokkai', 2, {
    material: {
      kind: 'text',
      title: 'お取引条件のご提案',
      body: 'お取引条件のご提案\n\n・単価：1個800円（1回1,000個以上のご注文で750円）\n・お支払い：納品月の翌月末\n・納期：ご注文から14日\n・初回に限り、ご注文から7日での納品も承ります（送料は別途ご負担）\n\n株式会社さくら精工',
    },
    script: [
      ['女', 'この新しい仕入れ先、条件はどう？', 'Nhà cung cấp mới này, điều kiện thế nào?'],
      ['男', '単価は、今の仕入れ先より五十円安いです。ただ、うちは一回に五百個ぐらいしか注文しないので、七百五十円にはならないですね。', 'Đơn giá rẻ hơn nhà cung cấp hiện tại năm mươi yên. Có điều mỗi lần mình chỉ đặt khoảng năm trăm cái, nên không được giá bảy trăm năm mươi.'],
      ['女', 'そうね。でも、それでも安いわね。納期は？', 'Ừ. Nhưng vẫn rẻ hơn. Còn thời gian giao?'],
      ['男', '今のところは十日なので、四日長くなります。在庫を少し多めに持てば、問題ないと思います。', 'Chỗ hiện tại là mười ngày, nên dài hơn bốn ngày. Mình giữ tồn kho nhiều hơn một chút là ổn.'],
      ['女', 'じゃあ、まず一回試してみましょう。最初はうちも急いでいるから、早いほうでお願いして。', 'Vậy thử một lần trước. Lần đầu bên mình cũng đang gấp, nhờ họ giao theo cách nhanh.'],
    ],
    questions: [
      [
        '新しい仕入れ先から買う場合、単価はいくらになりますか。',
        ['750円', '700円', '850円', '800円'],
        3,
        'Mỗi lần chỉ đặt khoảng 500 cái, chưa đủ 1.000 cái nên không được 750 yên → 800 yên. 850 yên là giá của nhà cung cấp hiện tại (đắt hơn 50 yên).',
      ],
      [
        '最初の注文はどうなりますか。',
        ['十四日で納品してもらう', '七日で納品してもらい、送料を払う', '十日で納品してもらう', '千個以上注文する'],
        1,
        '"Cách nhanh" (早いほう) là lựa chọn chỉ dành cho lần đầu: giao trong 7 ngày, phí vận chuyển tự trả. 14 ngày là thời gian thông thường. 10 ngày là của nhà cung cấp hiện tại.',
      ],
    ],
    points: [
      ['仕入れ先', 'しいれさき', 'nhà cung cấp'],
      ['別途', 'べっと', 'riêng, tính thêm'],
      ['初回', 'しょかい', 'lần đầu'],
    ],
  }),
];

import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/** Week 7 — negotiation and client meetings: quotes, conditions, counter-offers. Level: J1. */
export const W07: BjtItem[] = [
  item('w07', 'jokyo', 1, {
    material: {
      kind: 'table',
      title: 'お見積もり比較',
      head: ['案', '単価', '最低ロット', '納期'],
      rows: [
        ['A', '1,200円', '500個', '2週間'],
        ['B', '1,100円', '1,000個', '3週間'],
        ['C', '1,050円', '2,000個', '3週間'],
        ['D', '1,300円', '300個', '1週間'],
      ],
    },
    script: [
      ['男', '今回は八百個ほど必要なんです。', 'Lần này chúng tôi cần khoảng tám trăm cái.'],
      ['女', '最低ロットを考えますと、AかDになりますね。', 'Xét lô tối thiểu thì sẽ là A hoặc D.'],
      ['男', 'うーん、二百個ぐらい余っても、次の注文ですぐ使いますから、千個までなら構いません。急ぎでもないので、単価が一番安くなるものでお願いします。', 'Ừm, dư khoảng hai trăm cái thì đơn sau cũng dùng ngay, nên đến một nghìn cái cũng được. Không gấp, nên chọn cái nào đơn giá rẻ nhất.'],
    ],
    questions: [
      [
        'どの案になりますか。',
        ['A', 'B', 'C', 'D'],
        1,
        'Lô tối thiểu tối đa 1.000 cái → A, B, D. Không gấp, chọn đơn giá rẻ nhất trong ba cái → B (1.100 yên). C rẻ nhất nhưng phải mua tối thiểu 2.000 cái. A và D là kết luận ban đầu nhưng đã thay đổi.',
      ],
    ],
    points: [
      ['最低ロット', 'さいていろっと', 'lô đặt hàng tối thiểu'],
      ['余る', 'あまる', 'dư, thừa'],
      ['構いません', 'かまいません', 'không sao, được'],
    ],
  }),
  item('w07', 'jokyo', 2, {
    material: {
      kind: 'table',
      title: '明日の予定（木下）',
      head: ['時間', '予定'],
      rows: [
        ['9:00〜10:00', '（空き）'],
        ['10:00〜11:30', '社内会議'],
        ['11:30〜12:30', '（空き）'],
        ['13:00〜14:00', '（空き）'],
        ['14:00〜15:00', 'A社訪問'],
        ['15:30〜17:00', '（空き）'],
      ],
    },
    script: [
      ['女', 'B社の山本様から、明日一時間ほどお時間をいただけないかとご連絡がありました。', 'Anh Yamamoto bên công ty B liên lạc, hỏi ngày mai anh có thể dành khoảng một tiếng không.'],
      ['男', '午前中はプレゼンの資料を仕上げたいから、午後がいいな。', 'Buổi sáng tôi muốn hoàn thiện tài liệu thuyết trình, nên buổi chiều thì hơn.'],
      ['女', '一時からでしたら空いていますが。', 'Từ một giờ thì anh đang trống.'],
      ['男', 'でも、二時にA社に行くでしょう。B社からA社までは三十分かかるから、間に合わないよ。A社のあとなら、ちょうど三十分あるから移動できるね。', 'Nhưng hai giờ tôi đi công ty A mà. Từ B đến A mất ba mươi phút, không kịp. Sau công ty A thì vừa đủ ba mươi phút để di chuyển.'],
    ],
    questions: [
      [
        'B社との打ち合わせは何時からになりますか。',
        ['9:00〜10:00', '13:00〜14:00', '11:30〜12:30', '15:30〜16:30'],
        3,
        'Buổi sáng dành làm tài liệu. 13:00 thì họp xong không kịp đi 30 phút sang A lúc 14:00. Sau A (kết thúc 15:00) có đúng 30 phút để đến B, nên họp từ 15:30.',
      ],
    ],
    points: [
      ['仕上げる', 'しあげる', 'hoàn thiện'],
      ['間に合う', 'まにあう', 'kịp'],
    ],
  }),
  item('w07', 'shiryo', 1, {
    material: {
      kind: 'bars',
      title: '業者別の費用（万円）',
      unit: '万円',
      labels: ['P社', 'Q社', 'R社', 'S社'],
      series: [
        { name: '初期費用', values: [100, 80, 60, 120] },
        { name: '年間保守費用', values: [10, 20, 30, 0] },
      ],
    },
    script: [
      ['女', '初期費用だけ見るとR社が一番安いですが、システムは五年間使う予定です。', 'Nếu chỉ nhìn chi phí ban đầu thì công ty R rẻ nhất, nhưng hệ thống sẽ dùng năm năm.'],
      ['女', '初期費用と五年分の保守費用を合わせた額が、一番安い業者に決めたいと思います。', 'Tôi muốn chọn nhà cung cấp có tổng chi phí ban đầu cộng năm năm bảo trì thấp nhất.'],
    ],
    questions: [
      [
        'どの業者に決まりますか。',
        ['P社', 'Q社', 'S社', 'R社'],
        2,
        'Tổng năm năm: P = 100 + 10×5 = 150; Q = 80 + 100 = 180; R = 60 + 150 = 210; S = 120 + 0 = 120. S rẻ nhất. R rẻ nhất lúc đầu nhưng đắt nhất sau năm năm.',
      ],
    ],
    points: [
      ['初期費用', 'しょきひよう', 'chi phí ban đầu'],
      ['業者', 'ぎょうしゃ', 'nhà cung cấp, doanh nghiệp (bên ngoài)'],
    ],
  }),
  item('w07', 'shiryo', 2, {
    material: {
      kind: 'table',
      title: '数量割引のご案内',
      head: ['ご発注数', '割引率'],
      rows: [
        ['100個未満', 'なし'],
        ['100〜299個', '5%'],
        ['300〜499個', '8%'],
        ['500個以上', '12%'],
      ],
      note: '※分納をご希望の場合は、割引率を一段階下げさせていただきます。',
    },
    script: [
      ['男', '今回は二百五十個の予定でしたが、来月分の二百個もまとめて、一緒に発注しようと思います。', 'Lần này định đặt hai trăm năm mươi cái, nhưng tôi định gộp luôn hai trăm cái của tháng sau vào đặt một lần.'],
      ['男', 'ただ、倉庫が狭いので、納品は今月と来月の二回に分けていただきたいんです。', 'Có điều kho hẹp, nên tôi muốn giao làm hai lần, tháng này và tháng sau.'],
    ],
    questions: [
      [
        '割引率は何パーセントになりますか。',
        ['5%', '8%', '12%', 'なし'],
        0,
        '250 + 200 = 450 cái, thuộc mức 300–499 = 8%. Nhưng giao hai lần là 分納, theo ghi chú bị hạ một bậc → 5%. 8% là đáp án của người quên ghi chú. 12% là khi tính nhầm vượt 500.',
      ],
    ],
    points: [
      ['分納', 'ぶんのう', 'giao hàng nhiều đợt'],
      ['割引率', 'わりびきりつ', 'tỉ lệ chiết khấu'],
      ['まとめる', 'まとめる', 'gộp lại'],
    ],
  }),
  item('w07', 'shiryo', 3, {
    material: {
      kind: 'table',
      title: '取引条件 先方からのご要望',
      head: ['項目', '現行', '先方のご要望'],
      rows: [
        ['単価', '1,000円', '950円'],
        ['支払い', '翌月末', '翌々月末'],
        ['納期', '受注後10日', '受注後7日'],
        ['最低発注数', '200個', '100個'],
      ],
    },
    script: [
      ['女', '先方のご要望ですが、単価は応じましょう。支払い条件は、うちの規定があるので変えられません。', 'Về các yêu cầu của bên kia: đơn giá thì ta chấp nhận. Điều kiện thanh toán thì vì quy định bên mình nên không đổi được.'],
      ['女', '納期は工場次第ですが、今の体制では無理ですね。その代わり、最低発注数のほうは認めることにしましょう。', 'Hạn giao thì tuỳ nhà máy, nhưng với cách tổ chức hiện nay là không được. Bù lại, ta chấp nhận yêu cầu về số lượng đặt tối thiểu.'],
    ],
    questions: [
      [
        '先方のご要望のうち、受け入れるのはどれですか。',
        ['単価だけ', '単価と納期', '支払いと最低発注数', '単価と最低発注数'],
        3,
        'Chấp nhận: đơn giá (応じましょう) và số lượng tối thiểu (認めることにしましょう). Không chấp nhận: thanh toán (変えられません) và hạn giao (無理ですね). その代わり báo hiệu một điều được nhượng để bù.',
      ],
    ],
    points: [
      ['応じる', 'おうじる', 'đáp ứng, chấp nhận'],
      ['体制', 'たいせい', 'cách tổ chức, cơ chế'],
      ['〜次第', 'しだい', 'tuỳ thuộc vào'],
    ],
  }),
  item('w07', 'sogo-chodokkai', 1, {
    material: {
      kind: 'text',
      title: '価格改定のお知らせ',
      body: '件名：価格改定のお知らせ\n\n株式会社ひかり工業 購買部 御中\n\nいつもお引き立てをいただき、誠にありがとうございます。\n原材料価格の高騰により、誠に不本意ながら、来年1月出荷分より下記のとおり価格を改定させていただきたく存じます。\n\n品番 K-100：1,200円 → 1,320円（10%）\n品番 K-200：2,000円 → 2,160円（8%）\n\nなお、12月20日までにご発注いただいた分は、出荷が1月以降になる場合も旧価格にて承ります。\n\n丸山商会 営業部 青木',
    },
    script: [
      ['男', '丸山商会さんから値上げのお知らせが来たよ。', 'Thương hội Maruyama gửi thông báo tăng giá rồi.'],
      ['女', 'K-100は来年も毎月使いますよね。今のうちに、三か月分まとめて注文しておきましょうか。', 'K-100 năm sau tháng nào mình cũng dùng nhỉ. Hay đặt gộp ba tháng ngay bây giờ?'],
      ['男', 'うーん、倉庫に三か月分も置く場所はないな。二か月分にしておこう。', 'Ừm, kho không có chỗ để ba tháng đâu. Đặt hai tháng thôi.'],
      ['女', 'わかりました。K-200はどうしますか。', 'Vâng. Còn K-200 thì sao ạ?'],
      ['男', 'K-200は来年から別の部品に切り替えるから、注文しなくていいよ。', 'K-200 năm sau đổi sang linh kiện khác rồi, không cần đặt.'],
    ],
    questions: [
      [
        'K-100は何か月分注文しますか。',
        ['一か月分', '二か月分', '三か月分', '注文しない'],
        1,
        'Người phụ nữ đề xuất ba tháng, nhưng kho không đủ chỗ nên chốt hai tháng. Đặt trước 20/12 thì được giữ giá cũ, nên đặt sớm là có lợi.',
      ],
      [
        'K-200についてどうしますか。',
        ['注文しない', '旧価格でまとめて注文する', '新価格で注文する', '別の会社に注文する'],
        0,
        'Năm sau K-200 được thay bằng linh kiện khác (切り替える), nên 注文しなくていい. Không ai nói sẽ đặt K-200 ở công ty khác; thứ thay đổi là loại linh kiện.',
      ],
    ],
    points: [
      ['価格改定', 'かかくかいてい', 'điều chỉnh giá'],
      ['高騰', 'こうとう', 'tăng vọt (giá)'],
      ['不本意ながら', 'ふほんいながら', 'dù không mong muốn'],
      ['切り替える', 'きりかえる', 'chuyển sang, thay bằng'],
    ],
  }),
  item('w07', 'sogo-chodokkai', 2, {
    material: {
      kind: 'text',
      title: '【ご提案】物流業務の一括委託',
      body: '【ご提案】物流業務の一括委託\n\n現在：倉庫管理・配送を貴社にて実施\nご提案：倉庫管理・配送・返品処理を弊社に一括委託\n\n・年間コスト：約2,400万円 → 約2,000万円（約17%削減）\n・返品処理の日数：平均5日 → 2日\n・契約期間：3年（途中解約の場合は違約金が発生します）\n\n青葉ロジスティクス株式会社',
    },
    script: [
      ['女', 'コストが二割近く下がるのは魅力ですね。', 'Chi phí giảm gần hai mươi phần trăm thì hấp dẫn thật.'],
      ['男', 'ええ。ただ、三年縛りというのが引っかかるなあ。来年、新しい倉庫を建てる計画もあるし。', 'Ừ. Nhưng bị ràng buộc ba năm thì tôi còn băn khoăn. Năm sau mình còn có kế hoạch xây kho mới.'],
      ['女', '新しい倉庫ができたら、委託をやめて自社に戻すんですか。', 'Khi kho mới xây xong thì mình thôi thuê ngoài, quay về tự làm ạ?'],
      ['男', 'それはまだ決まってないんだ。だから、まずは返品処理だけ、一年契約で試せないか聞いてみてくれる？', 'Cái đó chưa quyết. Nên trước mắt, em hỏi giúp xem có thể thử riêng phần xử lý hàng trả lại với hợp đồng một năm không.'],
      ['女', 'わかりました。先方に確認してみます。', 'Vâng. Tôi sẽ hỏi bên kia.'],
    ],
    questions: [
      [
        '男の人が気にしているのは何ですか。',
        ['コストがあまり下がらないこと', '返品処理が遅いこと', '委託先の評判', '契約期間が三年と長いこと'],
        3,
        '三年縛りというのが引っかかる: ràng buộc ba năm làm anh băn khoăn, vì năm sau có thể có kho mới. Chi phí giảm thì cả hai đều thấy hấp dẫn. Xử lý hàng trả lại thì đề xuất còn làm nhanh hơn.',
      ],
      [
        '女の人は先方に何を確認しますか。',
        ['すべての業務を一括で委託できるか', '違約金はいくらか', '返品処理だけを一年契約で頼めるか', '新しい倉庫を一緒に建てられるか'],
        2,
        'Anh nhờ hỏi 返品処理だけ、一年契約で試せないか. Lựa chọn 1 chính là đề xuất gốc. Phí phạt chỉ có trong tài liệu, không ai nhờ hỏi.',
      ],
    ],
    points: [
      ['一括委託', 'いっかついたく', 'giao trọn gói cho bên ngoài'],
      ['違約金', 'いやくきん', 'tiền phạt vi phạm hợp đồng'],
      ['縛り', 'しばり', 'ràng buộc (thời hạn hợp đồng)'],
      ['引っかかる', 'ひっかかる', 'thấy vướng, băn khoăn'],
    ],
  }),
];

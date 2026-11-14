import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/** Week 16 — final review: mixed themes from the whole course, exam-like. Level: J1, about a third J1+. */
export const W16: BjtItem[] = [
  item('w16', 'bamen', 1, {
    material: {
      kind: 'scene',
      vi: 'Trong kho hàng. Thùng các-tông chất thành hai chồng trên pallet. Một nhân viên đội mũ bảo hộ đang dán nhãn lên mặt thùng ở chồng bên trái. Một nhân viên khác đứng cạnh, cầm máy quét mã vạch nhưng chưa quét. Phía sau có một xe nâng đang đỗ, không có người ngồi.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['作業員がフォークリフトを運転しています。', '作業員が段ボール箱にラベルを貼っています。', '作業員が段ボール箱を積み上げています。', '作業員が箱を開けて中身を数えています。'],
        1,
        'Lựa chọn 2: một người đang dán nhãn (ラベルを貼る) lên thùng. Lựa chọn 3 dễ chọn vì thùng đã được chất thành chồng, nhưng không ai đang chất thêm. Xe nâng đang đỗ không người lái; không thùng nào bị mở.',
      ],
    ],
    points: [
      ['段ボール箱', 'だんぼーるばこ', 'thùng các-tông'],
      ['積み上げる', 'つみあげる', 'chất chồng lên'],
    ],
  }),
  item('w16', 'bamen', 2, {
    material: {
      kind: 'scene',
      vi: 'Trước cửa toà nhà công ty. Một chiếc taxi đỗ sát lề, cửa sau đang mở; một vị khách đã ngồi vào trong xe. Một nhân viên đứng trên vỉa hè cúi chào về phía xe. Cốp xe đã đóng, tài xế ngồi ở ghế lái.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['客がタクシーから降りています。', '社員がスーツケースを運んでいます。', '運転手がトランクを開けています。', '社員が客を見送っています。'],
        3,
        'Lựa chọn 4: khách đã lên xe, nhân viên cúi chào tiễn (見送る). Lựa chọn 1 dễ nhầm vì cửa xe đang mở, nhưng khách đã ngồi vào trong, tức đang đi chứ không xuống xe. Cốp đã đóng và tài xế ngồi ở ghế lái.',
      ],
    ],
    points: [
      ['見送る', 'みおくる', 'tiễn (khách)'],
      ['トランク', 'とらんく', 'cốp xe'],
    ],
  }),
  item('w16', 'hatsugen', 1, {
    script: [['状況', '取引先の人から電話で、明日の打ち合わせを十時から十一時に変えたいので、佐藤課長に伝えてほしいと頼まれました。最後に確認します。何と言いますか。', 'Người của đối tác gọi điện nhờ bạn báo cho trưởng phòng Sato rằng họ muốn đổi buổi họp ngày mai từ 10 giờ sang 11 giờ. Cuối cùng bạn xác nhận lại. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        [
          'かしこまりました。明日のお打ち合わせを十一時から十時に変更ということで、佐藤に申し伝えます。',
          'かしこまりました。明日のお打ち合わせを十時から十一時に変更ということで、佐藤に申し伝えます。',
          'かしこまりました。明日のお打ち合わせを十時から十一時に変更ということで、佐藤課長にお伝えになります。',
          'かしこまりました。明日のお打ち合わせは十時からということで、佐藤に申し伝えます。',
        ],
        1,
        'Lựa chọn 2: nhắc lại đúng nội dung (10 giờ → 11 giờ), gọi người phía mình bằng họ trần 佐藤 và dùng khiêm nhường ngữ 申し伝えます. Lựa chọn 1 đảo ngược hai mốc giờ, phải nghe kỹ mới thấy. Lựa chọn 3 đúng giờ nhưng dùng tôn kính ngữ お伝えになる cho chính mình. Lựa chọn 4 sai giờ mới.',
      ],
    ],
    points: [
      ['申し伝える', 'もうしつたえる', 'chuyển lời (khiêm nhường ngữ)'],
      ['かしこまりました', 'かしこまりました', 'vâng, tôi đã rõ (rất lịch sự)'],
    ],
  }),
  item('w16', 'hatsugen', 2, {
    script: [['状況', 'お客様から「注文した商品がまだ届かない」と怒った声で電話がありました。調べたところ、配送中の事故で遅れていて、明日には届くことが分かりました。何と言いますか。', 'Khách hàng gọi điện, giọng bực bội: "Hàng tôi đặt vẫn chưa tới". Bạn tra lại thì biết hàng bị chậm do sự cố trong lúc vận chuyển và ngày mai sẽ tới. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        [
          'ご迷惑をおかけし申し訳ございません。配送中の事故で遅れておりますが、明日にはお届けできる見込みです。',
          'ご迷惑をおかけし申し訳ございません。ただ、配送業者の事故ですので、当社には責任がございません。',
          'ご迷惑をおかけし申し訳ございません。お届けの日は、配送業者に直接お問い合わせいただけますか。',
          'ご迷惑をおかけし申し訳ございません。お客様のご住所に誤りがあったのではないかと思われます。',
        ],
        0,
        'Lựa chọn 1: xin lỗi, nói lý do và cho khách biết ngày nhận hàng dự kiến. Lựa chọn 3 nghe lịch sự nhưng bắt khách tự đi hỏi, trong khi mình đã biết ngày mai hàng tới. Lựa chọn 2 chối trách nhiệm; lựa chọn 4 đổ lỗi cho khách, trái với điều đã tra được.',
      ],
    ],
    points: [
      ['見込み', 'みこみ', 'dự kiến, triển vọng'],
      ['配送業者', 'はいそうぎょうしゃ', 'đơn vị vận chuyển'],
    ],
  }),
  item('w16', 'hatsugen', 3, {
    script: [['状況', '取引先から大幅な値引きを求められました。あなた一人では決められませんが、断るのではなく、社内で検討したいと伝えます。何と言いますか。', 'Đối tác yêu cầu giảm giá mạnh. Một mình bạn không quyết được, nhưng bạn muốn nói rằng sẽ đem về công ty xem xét chứ không từ chối. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        [
          'ご事情はよくわかりました。それでは、そのお値段でお受けいたします。すぐに契約書を直します。',
          'ご事情はよくわかりました。ただ、値引きは一切お受けできかねますので、ご了承くださいませ。',
          'ご事情はよくわかりました。私の一存では決めかねますので、社に持ち帰って検討させてください。',
          'ご事情はよくわかりました。値引きをされたいのでしたら、別の会社にご依頼なさってください。',
        ],
        2,
        'Lựa chọn 3: 一存では決めかねます = không thể tự mình quyết; 持ち帰って検討 = đem về công ty bàn, nghĩa là chưa từ chối. Lựa chọn 2 cũng dùng mẫu ～かねる nhưng là từ chối hẳn, trái với ý muốn. Lựa chọn 1 tự ý nhận, lựa chọn 4 đuổi khách.',
      ],
    ],
    points: [
      ['一存', 'いちぞん', 'ý riêng của một mình'],
      ['持ち帰る', 'もちかえる', 'đem về (công ty) để bàn'],
    ],
  }),
  item('w16', 'hatsugen', 4, {
    script: [['状況', '他部署の先輩から、来月の社内勉強会で発表してほしいと頼まれました。その日は客先を訪問する予定がありますが、翌週なら引き受けたいです。何と言いますか。', 'Một đàn anh/đàn chị ở phòng khác nhờ bạn thuyết trình trong buổi học nội bộ tháng sau. Hôm đó bạn có lịch đến gặp khách, nhưng nếu là tuần sau thì bạn muốn nhận. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        [
          'お声がけありがとうございます。あいにくその日は客先に伺う予定ですので、ほかの方にお願いしてください。',
          'お声がけありがとうございます。その日は客先への訪問を取りやめて、勉強会のほうに出るようにいたします。',
          'お声がけありがとうございます。あいにくその日は客先に参られる予定でして、翌週でしたらお引き受けできます。',
          'お声がけありがとうございます。あいにくその日は客先に伺う予定がありまして、翌週でしたらお引き受けできます。',
        ],
        3,
        'Lựa chọn 4: cảm ơn, nói lý do bằng khiêm nhường ngữ 伺う và đưa phương án tuần sau. Lựa chọn 3 cùng nội dung nhưng 参られる ghép khiêm nhường ngữ 参る với ～られる (tôn kính) cho chính mình, nên sai. Lựa chọn 1 từ chối mà không đưa phương án tuần sau như bạn muốn; lựa chọn 2 huỷ hẹn với khách.',
      ],
    ],
    points: [
      ['お声がけ', 'おこえがけ', 'lời mời, lời rủ'],
      ['引き受ける', 'ひきうける', 'nhận (việc)'],
    ],
  }),
  item('w16', 'sogo-chokai', 1, {
    script: [
      ['女', '例の部品の件なんですが、来月五日の納品、何とかなりませんか。', 'Về linh kiện đó, giao hàng ngày mùng năm tháng sau, anh xoay xở được không?'],
      ['男', '申し訳ありません。今の生産状況ですと、全数そろうのは十五日になってしまいます。', 'Thành thật xin lỗi. Với tình hình sản xuất hiện nay thì phải đến ngày mười lăm mới đủ toàn bộ số lượng.'],
      ['女', '十五日だと、うちのラインが止まっちゃうんですよ。せめて半分は五日にほしいんですが。', 'Ngày mười lăm thì dây chuyền bên tôi dừng mất. Ít nhất một nửa tôi muốn có vào ngày năm.'],
      ['男', '半分ですか…。工場に確認しないと何とも言えませんが、残業で対応しても、五日に間に合うのは三割ぐらいかと。', 'Một nửa ạ… Phải hỏi nhà máy mới nói chắc được, nhưng kể cả làm thêm giờ thì kịp ngày năm chắc chỉ khoảng ba mươi phần trăm.'],
      ['女', '三割だと、十日ぐらいまでしかもたないんですよね。', 'Ba mươi phần trăm thì chỉ cầm cự được tới khoảng ngày mười thôi.'],
      ['男', 'では、五日に三割、十日にもう三割、残りを十五日、という形ではいかがでしょうか。', 'Vậy ngày năm ba mươi phần trăm, ngày mười thêm ba mươi phần trăm, phần còn lại ngày mười lăm, chị thấy thế nào?'],
      ['女', 'それなら何とか。ただ、十日の分が遅れると本当に困るので、確実かどうか、明日までにお返事をいただけますか。', 'Thế thì tạm được. Nhưng phần ngày mười mà chậm thì thật sự gay, nên mai anh trả lời giúp tôi có chắc chắn không nhé.'],
      ['男', '承知しました。工場と調整して、明日の午前中にご連絡いたします。', 'Vâng ạ. Tôi sẽ điều chỉnh với nhà máy và liên lạc trong sáng mai.'],
    ],
    questions: [
      [
        '男の人はどのような納品の形を提案しましたか。',
        ['五日に半分、十日に三割、十五日に残り', '五日に三割、十五日に残りの七割', '五日に三割、十日に三割、十五日に残り', '十日に半分、十五日に残りの半分'],
        2,
        'Lựa chọn 3: ngày 5 ba mươi phần trăm, ngày 10 thêm ba mươi phần trăm, phần còn lại (bốn mươi phần trăm) ngày 15. Lựa chọn 1 dùng con số "một nửa" là mong muốn của khách, nhà máy không đáp ứng được. Lựa chọn 2 là phương án trước khi khách nói ba mươi phần trăm chỉ cầm cự tới ngày 10.',
      ],
      [
        '男の人はこのあとまず何をしますか。',
        ['取引先の工場を見に行く', '自社の工場と調整する', '十日に部品を届ける', '契約書を書き直す'],
        1,
        'Lựa chọn 2: 工場と調整して、明日の午前中にご連絡 = điều chỉnh với nhà máy (của mình) rồi báo lại. Lựa chọn 1 nhầm nhà máy: "dây chuyền" của khách được nhắc tới, nhưng không ai định đến xem. Giao hàng ngày 10 là việc sau đó.',
      ],
    ],
    points: [
      ['全数', 'ぜんすう', 'toàn bộ số lượng'],
      ['もつ', 'もつ', 'cầm cự được, đủ dùng'],
      ['調整する', 'ちょうせいする', 'điều chỉnh, thu xếp'],
    ],
  }),
  item('w16', 'sogo-chokai', 2, {
    script: [
      ['支店長', '皆さん、おはようございます。今朝は一つお話ししたいことがあります。', 'Chào buổi sáng mọi người. Sáng nay tôi muốn nói một chuyện.'],
      ['支店長', '先月のお客様アンケートで、「担当者に連絡がつかない」というご意見が三件ありました。外出の多い仕事ですから、すぐに電話に出られないことはあると思います。', 'Trong khảo sát khách hàng tháng trước, có ba ý kiến "không liên lạc được với người phụ trách". Công việc phải ra ngoài nhiều, nên tôi nghĩ có lúc không nghe máy ngay được.'],
      ['支店長', 'ただ、三件とも、折り返しの電話が翌日以降になっていたんですね。その日のうちに一本連絡を入れるだけで、お客様の受け止め方はずいぶん違うはずです。', 'Có điều, cả ba trường hợp đều gọi lại vào hôm sau trở đi. Chỉ cần liên lạc một cuộc ngay trong ngày thôi thì cảm nhận của khách sẽ khác hẳn.'],
      ['支店長', 'そこで今月から、誰が何件折り返しを残しているか、毎日夕方に私が確認します。と言っても、皆さんを責めるためではありません。忙しい人の分は、手の空いている人に回せるようにしたいんです。', 'Vì vậy từ tháng này, chiều nào tôi cũng sẽ kiểm tra ai còn bao nhiêu cuộc chưa gọi lại. Nói vậy nhưng không phải để trách mọi người. Tôi muốn có thể chuyển phần của người bận cho người đang rảnh tay.'],
    ],
    questions: [
      [
        '支店長が一番言いたいことは何ですか。',
        ['外出の回数を減らして、社内にいる時間を増やしてほしい', '電話がかかってきたら、すぐに出てほしい', '折り返しの電話は、その日のうちにしてほしい', 'アンケートの回答をもっと集めてほしい'],
        2,
        'Lựa chọn 3: vấn đề là gọi lại muộn (翌日以降); chỉ cần liên lạc trong ngày là đủ khác. Lựa chọn 2 dễ chọn vì nói đến chuyện nghe máy, nhưng trưởng chi nhánh chấp nhận việc không nghe ngay được (すぐに電話に出られないことはある).',
      ],
      [
        '支店長は今月から何をしますか。',
        ['毎日夕方に、残っている折り返しの件数を確認する', '折り返しが遅れた人を、朝礼で一人ずつ注意する', 'お客様アンケートを毎月行い、結果を発表する', '社員に、その日の外出の予定を毎朝報告させる'],
        0,
        'Lựa chọn 1: 毎日夕方に私が確認します. Lựa chọn 2 dễ chọn vì việc kiểm tra nghe như để giám sát, nhưng trưởng chi nhánh nói rõ 責めるためではありません; mục đích là chia lại việc cho người rảnh tay.',
      ],
    ],
    points: [
      ['折り返し', 'おりかえし', 'gọi lại'],
      ['連絡がつく', 'れんらくがつく', 'liên lạc được'],
      ['手が空く', 'てがあく', 'rảnh tay'],
    ],
  }),
];

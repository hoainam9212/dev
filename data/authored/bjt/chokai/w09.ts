import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/** Week 9 — complaints and apologies. Level: J1. */
export const W09: BjtItem[] = [
  item('w09', 'bamen', 1, {
    material: {
      kind: 'scene',
      vi: 'Quầy chăm sóc khách hàng. Một vị khách nam đặt một hộp sản phẩm bị móp góc lên quầy và chỉ tay vào chỗ móp. Nữ nhân viên đứng sau quầy, cúi đầu. Trên quầy có một tờ phiếu và cây bút chưa ai dùng; hộp vẫn còn băng dính niêm phong.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['女性が客に商品を手渡しています。', '客が用紙に記入しています。', '女性が箱を開けて中身を確認しています。', '客が箱のへこんだところを指しています。'],
        3,
        'Khách chỉ vào góc hộp bị móp: へこんだところを指している. Phiếu và bút chưa ai dùng. Hộp còn niêm phong nên chưa ai mở. Người phụ nữ đang cúi đầu, không đưa gì cho khách.',
      ],
    ],
    points: [
      ['へこむ', 'へこむ', 'móp, lõm'],
      ['窓口', 'まどぐち', 'quầy tiếp nhận'],
    ],
  }),
  item('w09', 'bamen', 2, {
    material: {
      kind: 'scene',
      vi: 'Văn phòng. Một nam nhân viên đứng cạnh bàn, tay trái áp ống nghe điện thoại bàn vào tai, người hơi cúi về phía trước như đang cúi đầu xin lỗi. Tay phải anh cầm một tờ hoá đơn. Xung quanh không có ai khác.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['男性が電話をしながら頭を下げています。', '男性が請求書を書いています。', '男性が電話を切ろうとしています。', '男性が客の前でおじぎをしています。'],
        0,
        'Anh ta vừa nghe điện thoại vừa cúi đầu: 頭を下げる. Câu 4 có động tác cúi chào nhưng sai vì xung quanh không có khách. Anh cầm hoá đơn chứ không viết. Không có dấu hiệu sắp cúp máy.',
      ],
    ],
    points: [
      ['頭を下げる', 'あたまをさげる', 'cúi đầu (xin lỗi, cảm ơn)'],
      ['請求書', 'せいきゅうしょ', 'hoá đơn đề nghị thanh toán'],
    ],
  }),
  item('w09', 'hatsugen', 1, {
    script: [['状況', 'お客様から、注文と違う商品が届いたという電話がありました。まず何と言いますか。', 'Khách hàng gọi điện báo nhận được hàng khác với hàng đã đặt. Trước tiên bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        [
          'こちらでは間違えていないと思いますが。',
          '本当ですか。確認してから、またかけます。',
          'ご迷惑をおかけして、誠に申し訳ございません。恐れ入りますが、ご注文番号をお教えいただけますでしょうか。',
          'それは配送会社のミスですので、そちらにご連絡ください。',
        ],
        2,
        'Nhận khiếu nại: xin lỗi vì đã làm phiền khách trước, rồi hỏi số đơn để kiểm tra. Câu 1 phủ nhận khi chưa kiểm tra. Câu 2 suồng sã, nghe như nghi ngờ khách. Câu 4 đẩy trách nhiệm cho bên giao hàng.',
      ],
    ],
    points: [['ご迷惑をおかけする', 'ごめいわくをおかけする', 'gây phiền phức (cho khách)']],
  }),
  item('w09', 'hatsugen', 2, {
    script: [['状況', 'あなたのミスで、取引先に会議の時間を間違えて伝えてしまい、相手を三十分待たせてしまいました。何と言いますか。', 'Do lỗi của bạn, bạn báo nhầm giờ họp cho đối tác và để họ đợi ba mươi phút. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        [
          '道が混んでいて、すみませんでした。',
          'お待たせしてしまい、大変申し訳ございませんでした。私が時間を誤ってお伝えしておりました。',
          '三十分くらいなら、大丈夫ですよね。',
          'お待ちになっていただき、ご苦労様でした。',
        ],
        1,
        'Xin lỗi vì để chờ và nói rõ đó là lỗi của mình (私が…誤ってお伝えしておりました). Câu 1 viện cớ sai sự thật. Câu 3 xem nhẹ. Câu 4 dùng ご苦労様 với đối tác và không có lời xin lỗi.',
      ],
    ],
    points: [['誤って', 'あやまって', 'nhầm, do sơ suất']],
  }),
  item('w09', 'hatsugen', 3, {
    script: [['状況', 'お客様が電話で、商品について強い口調で苦情を言っています。まだ話は終わっていません。途中で何と言いますか。', 'Khách hàng đang phàn nàn về sản phẩm qua điện thoại với giọng gay gắt. Họ chưa nói xong. Giữa chừng bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        [
          'でも、それはお客様の使い方にも問題が…。',
          '要するに、何をしてほしいんですか。',
          'はい、はい、わかりました、わかりました。',
          'さようでございましたか。ご不便をおかけしております。',
        ],
        3,
        'Khi khách còn đang nói thì đệm lời để thể hiện đang lắng nghe và cảm thông (ご不便をおかけしております), chưa vội giải thích. Câu 1 cãi lại. Câu 2 cắt ngang, khó chịu. Câu 3 lặp "vâng vâng" nghe như muốn cho xong.',
      ],
    ],
    points: [
      ['苦情', 'くじょう', 'lời phàn nàn, khiếu nại'],
      ['相づち', 'あいづち', 'lời đệm khi nghe'],
    ],
  }),
  item('w09', 'hatsugen', 4, {
    script: [['状況', '取引先に謝罪に行ったところ、相手から「もういいですよ。次から気をつけてくれれば」と言われました。何と言いますか。', 'Bạn đến xin lỗi đối tác, và họ nói: "Thôi được rồi. Lần sau chú ý là được." Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        [
          '寛大なお言葉、ありがとうございます。二度とこのようなことのないよう、徹底いたします。',
          'ありがとうございます。じゃあ、これで失礼します。',
          'よかった。もう怒っていないんですね。',
          'いえ、それでは私の気が済みませんので、もう一度お詫びさせてください。',
        ],
        0,
        'Cảm ơn sự bao dung và hứa không tái phạm: cách kết thúc lời xin lỗi chuẩn mực. Câu 2 vội vàng ra về. Câu 3 nói như chuyện riêng, mất nghiêm túc. Câu 4 cố xin lỗi thêm, thành ra làm phiền người đã tha lỗi cho mình.',
      ],
    ],
    points: [
      ['寛大', 'かんだい', 'bao dung, rộng lượng'],
      ['徹底する', 'てっていする', 'làm triệt để'],
      ['気が済む', 'きがすむ', 'thấy thoả lòng, yên lòng'],
    ],
  }),
  item('w09', 'sogo-chokai', 1, {
    script: [
      ['女', 'すみません、先週注文したプリンターのインクが、まだ届かないんですが。', 'Xin lỗi, mực máy in tôi đặt tuần trước đến giờ vẫn chưa tới.'],
      ['男', '大変申し訳ございません。お調べいたしますので、ご注文番号をお願いできますか。', 'Thành thật xin lỗi chị. Tôi sẽ kiểm tra, chị cho tôi xin số đơn hàng được không ạ?'],
      ['女', 'A3207です。', 'Số A3207 ạ.'],
      ['男', 'ありがとうございます。…確認いたしましたところ、在庫切れで発送が遅れておりました。ご連絡もせず、申し訳ございません。入荷は来週の水曜日の予定です。', 'Cảm ơn chị. … Tôi đã kiểm tra, hàng hết trong kho nên việc gửi bị chậm. Xin lỗi vì đã không báo trước cho chị. Dự kiến thứ tư tuần sau hàng về.'],
      ['女', '水曜…困ったな。明後日、大事な資料を印刷しないといけないんですよ。', 'Thứ tư… gay quá. Ngày kia tôi phải in tài liệu quan trọng.'],
      ['男', 'それでしたら、同じ型に対応した互換インクでよろしければ、本日発送して、明日にはお届けできます。お値段も二割ほどお安くなります。', 'Vậy nếu chị dùng mực tương thích cùng loại máy thì hôm nay gửi, mai có thể giao tới. Giá cũng rẻ hơn khoảng hai mươi phần trăm.'],
      ['女', 'じゃあ、そうしてください。元の注文は取り消しでお願いします。', 'Vậy làm thế đi. Đơn ban đầu thì huỷ giúp tôi.'],
    ],
    questions: [
      [
        'インクが届いていない理由は何ですか。',
        ['注文番号が間違っていたから', '在庫がなかったから', '配送会社が遅れたから', '住所が間違っていたから'],
        1,
        '在庫切れ = hết hàng trong kho, nên chưa gửi được. Số đơn khách đọc là đúng. Bên giao hàng và địa chỉ không ai nhắc tới.',
      ],
      [
        '客はどうすることにしましたか。',
        ['来週の水曜日まで待つ', '明後日、店に取りに行く', '互換インクを送ってもらう', '注文をすべて取り消す'],
        2,
        'Chị đồng ý dùng mực tương thích (じゃあ、そうしてください) và huỷ đơn ban đầu. Huỷ "tất cả" là sai vì đơn mực tương thích vẫn có. Ngày kia là ngày chị cần in, không phải ngày đi lấy hàng.',
      ],
    ],
    points: [
      ['在庫切れ', 'ざいこぎれ', 'hết hàng trong kho'],
      ['入荷', 'にゅうか', 'hàng về kho'],
      ['互換', 'ごかん', 'tương thích'],
      ['取り消す', 'とりけす', 'huỷ'],
    ],
  }),
  item('w09', 'sogo-chokai', 2, {
    script: [
      ['男', '課長、お客様から、修理に三週間もかかるのはおかしい、というお電話がありました。', 'Trưởng phòng, có khách gọi điện nói sửa chữa mà mất tới ba tuần là vô lý.'],
      ['女', 'それで、何て答えたの？', 'Rồi em trả lời thế nào?'],
      ['男', '規定では最長四週間ですので、規定の範囲内です、とお伝えしました。', 'Tôi nói theo quy định thì tối đa bốn tuần, nên vẫn trong phạm vi quy định ạ.'],
      ['女', '…それで、お客様は納得されてた？', '… Rồi khách có chịu không?'],
      ['男', 'いえ、かえって怒らせてしまって…。', 'Không ạ, khách lại càng giận hơn…'],
      ['女', 'そうでしょうね。規定はこちらの都合だから。まず、お待たせしていることをお詫びして。それから、修理の間、代わりの機械を貸し出せないか、技術部に聞いてみて。', 'Thế là phải rồi. Quy định là chuyện nội bộ bên mình. Trước hết hãy xin lỗi vì để khách chờ. Rồi hỏi phòng kỹ thuật xem có thể cho mượn máy thay thế trong lúc sửa không.'],
      ['男', 'わかりました。', 'Vâng ạ.'],
    ],
    questions: [
      [
        '課長は、男の人の対応のどこが問題だと考えていますか。',
        ['修理に時間がかかりすぎたこと', '規定の期間を間違えて伝えたこと', '技術部に相談しなかったこと', '社内の規定を理由に説明したこと'],
        3,
        '規定はこちらの都合だから: lấy quy định nội bộ ra giải thích không làm khách hài lòng. Thời hạn anh nói là đúng (tối đa bốn tuần). Chuyện ba tuần là lời của khách, không phải điều trưởng phòng phê bình.',
      ],
      [
        '男の人は技術部に何を聞きますか。',
        ['代わりの機械を貸し出せるか', '修理をもっと早くできるか', '規定を変えられるか', 'お客様に謝ってもらえるか'],
        0,
        'Trưởng phòng dặn: 代わりの機械を貸し出せないか、技術部に聞いてみて. Rút ngắn thời gian sửa hay đổi quy định không được nhắc tới. Xin lỗi khách là việc của chính anh ấy.',
      ],
    ],
    points: [
      ['納得する', 'なっとくする', 'chấp nhận, thông suốt'],
      ['都合', 'つごう', 'lý do, hoàn cảnh (của một bên)'],
      ['貸し出す', 'かしだす', 'cho mượn'],
    ],
  }),
];

import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/**
 * Full test 2 (week 12), 聴解: 5 場面把握 + 10 発言聴解 + 10 総合聴解 questions = 25.
 * Mixes the themes of weeks 1–11; about 30% of the questions are J1+.
 * 発言聴解 and 総合聴解 follow the 2026-11-14 calibration rules (spec): one keigo point per 発言 choice set,
 * one question per 総合 item, scripts of 450–750 characters.
 */
export const MOCK2: BjtItem[] = [
  // ── 場面把握 ──
  item('mock2', 'bamen', 1, {
    material: {
      kind: 'scene',
      vi: 'Một nữ nhân viên ngồi trước máy tính xách tay, đeo tai nghe có micro. Trên màn hình là lưới nhiều khuôn mặt của một cuộc họp trực tuyến. Cô đang giơ tay vẫy chào về phía màn hình. Cạnh máy tính có một cuốn sổ tay đang gập.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['女性がヘッドセットを外しています。', '女性がノートに会議のメモを取っています。', '女性が画面に向かって手を振っています。', '女性がパソコンを閉じています。'],
        2,
        'Cô ấy vẫy tay về phía màn hình: 手を振る. Tai nghe vẫn đeo, sổ tay đang gập (nên lựa chọn 2 sai), máy tính đang mở và chạy cuộc họp.',
      ],
    ],
    points: [['手を振る', 'てをふる', 'vẫy tay']],
  }),
  item('mock2', 'bamen', 2, {
    material: {
      kind: 'scene',
      vi: 'Cổng an ninh ở sảnh văn phòng. Một nam nhân viên đang giơ thẻ nhân viên lên sát máy đọc thẻ bên cạnh cổng. Phía sau anh, một người khác đứng đợi. Một nhân viên bảo vệ đứng cách đó vài bước, hai tay chắp sau lưng.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['男性が社員証を読み取り機にかざしています。', '警備員が男性の社員証を念入りに確認しています。', '男性がゲートを手で押して開けています。', '二人が並んでゲートを通っています。'],
        0,
        'Giơ thẻ sát máy đọc là かざす. Bảo vệ đứng xa, tay chắp sau lưng, không kiểm tra thẻ (lựa chọn 2 sai). Người kia đang đợi phía sau, chưa ai đi qua cổng.',
      ],
    ],
    points: [
      ['かざす', 'かざす', 'giơ (thẻ) sát vào máy'],
      ['警備員', 'けいびいん', 'nhân viên bảo vệ'],
    ],
  }),
  item('mock2', 'bamen', 3, {
    material: {
      kind: 'scene',
      vi: 'Gian hàng ở hội chợ triển lãm. Một nữ nhân viên đứng sau quầy, chìa một tờ rơi về phía một người đàn ông đang đi ngang qua. Trên quầy bày vài sản phẩm mẫu và một hộp đựng danh thiếp.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['女性が商品を段ボール箱に詰めています。', '男性がパンフレットを読んでいます。', '女性が客と名刺を交換しています。', '女性が男性にチラシを差し出しています。'],
        3,
        'Cô ấy chìa tờ rơi về phía người đàn ông: チラシを差し出す. Người đàn ông chưa cầm, chưa đọc (lựa chọn 2 sai). Hộp danh thiếp có trên quầy nhưng không ai trao đổi danh thiếp.',
      ],
    ],
    points: [
      ['差し出す', 'さしだす', 'chìa ra, đưa ra'],
      ['チラシ', 'ちらし', 'tờ rơi'],
    ],
  }),
  item('mock2', 'bamen', 4, {
    material: {
      kind: 'scene',
      vi: 'Văn phòng. Một nam nhân viên đứng trên chiếc thang gấp nhỏ, hai tay với lên trần đang thay bóng đèn. Một nữ nhân viên đứng dưới, hai tay giữ chặt chân thang.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['男性が窓を拭いています。', '女性がはしごを支えています。', '男性がはしごを運んでいます。', '女性が電球を取り替えています。'],
        1,
        'Người phụ nữ giữ chân thang: はしごを支える. Câu 4 đảo chủ thể: người thay bóng đèn là người đàn ông. Thang đang được dùng chứ không ai khiêng.',
      ],
    ],
    points: [
      ['支える', 'ささえる', 'đỡ, giữ'],
      ['電球', 'でんきゅう', 'bóng đèn'],
    ],
  }),
  item('mock2', 'bamen', 5, {
    material: {
      kind: 'scene',
      vi: 'Phòng nghỉ của nhân viên. Một nam nhân viên cầm chiếc cốc dưới vòi của máy pha cà phê, cà phê đang chảy vào cốc. Cạnh máy có một hộp đường đang đậy nắp. Tủ lạnh bên cạnh đóng.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['男性がコーヒーをカップに注いでいます。', '男性が冷蔵庫から牛乳を出しています。', '男性がコーヒーに砂糖を入れています。', '男性がカップを洗っています。'],
        0,
        'Cà phê đang chảy vào cốc anh cầm: 注ぐ. Hộp đường còn đậy nắp, tủ lạnh đóng.',
      ],
    ],
    points: [['注ぐ', 'そそぐ', 'rót']],
  }),

  // ── 発言聴解 ──
  item('mock2', 'hatsugen', 1, {
    script: [['状況', '取引先に注文書をFAXで送りました。少しして、相手が見てくれたかどうか電話で確かめます。何と言いますか。', 'Bạn gửi đơn đặt hàng cho đối tác bằng FAX. Một lúc sau, bạn gọi điện hỏi xem họ đã xem chưa. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['先ほどのFAX、拝見いただけましたか。', '先ほどのFAX、ご確認してくださいましたか。', '先ほどのFAX、ご確認いただけましたか。', '先ほどのFAX、確認させていただけましたか。'],
        2,
        'Người xem FAX là đối tác, nên dùng ご確認いただけましたか. Lựa chọn 1 đúng ý nhưng 拝見 là khiêm nhường ngữ, chỉ dùng cho việc mình xem: sai chủ thể. Lựa chọn 2 ghép ご～する (khiêm nhường) với くださる. Lựa chọn 4 thành "anh có cho tôi xem không", sai nghĩa.',
      ],
    ],
    points: [
      ['注文書', 'ちゅうもんしょ', 'đơn đặt hàng'],
      ['拝見する', 'はいけんする', 'xem (khiêm nhường)'],
    ],
  }),
  item('mock2', 'hatsugen', 2, {
    script: [['状況', '取引先の会社を訪ねました。受付で、約束している営業部の木下さんに会いに来たと伝えます。何と言いますか。', 'Bạn đến công ty đối tác. Ở quầy lễ tân, bạn nói mình đến gặp anh Kinoshita phòng kinh doanh đã hẹn trước. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['営業部の木下様にお目にかかりたいのですが。', '営業部の木下様にお会いになりたいのですが。', '営業部の木下様に拝見したいのですが。', '営業部の木下様にお目にかかられたいのですが。'],
        0,
        'Mình là người đi gặp nên dùng khiêm nhường お目にかかる. Lựa chọn 2 đúng ý nhưng お会いになる là tôn kính ngữ, gắn cho việc của chính mình là sai chủ thể. Lựa chọn 4 ghép tôn kính られる vào động từ khiêm nhường. Lựa chọn 3: 拝見 là "xem", không dùng cho gặp người.',
      ],
    ],
    points: [['お目にかかる', 'おめにかかる', 'gặp (khiêm nhường)']],
  }),
  item('mock2', 'hatsugen', 3, {
    script: [['状況', '来客を応接室に案内しました。担当の課長が来るまで、座って待っていてもらいます。何と言いますか。', 'Bạn dẫn khách vào phòng tiếp khách. Bạn mời khách ngồi chờ đến khi trưởng phòng phụ trách tới. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['こちらにおかけしてお待ちください。', 'こちらにおかけになってお待ちしてください。', 'こちらにおかけになられてお待ちください。', 'こちらにおかけになってお待ちください。'],
        3,
        'Việc ngồi và chờ đều là của khách: おかけになって＋お待ちください. Lựa chọn 2 có おかけになって đúng nhưng お待ちして là khiêm nhường, gắn cho việc chờ của khách là sai chủ thể. Lựa chọn 1 dùng おかけする (khiêm nhường). Lựa chọn 3 là kính ngữ kép.',
      ],
    ],
    points: [
      ['おかけになる', 'おかけになる', 'ngồi (tôn kính)'],
      ['応接室', 'おうせつしつ', 'phòng tiếp khách'],
    ],
  }),
  item('mock2', 'hatsugen', 4, {
    script: [['状況', '展示会で、取引先の社長が自社のブースに来てくれました。わざわざ来てくれたことにお礼を言います。何と言いますか。', 'Ở triển lãm, giám đốc công ty đối tác ghé gian hàng của công ty bạn. Bạn cảm ơn vì ông đã cất công đến. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['本日は参っていただきありがとうございます。', '本日はお越しいただきありがとうございます。', '本日は伺っていただきありがとうございます。', '本日はお越しになられありがとうございます。'],
        1,
        'Người đến là giám đốc đối tác, nên dùng tôn kính お越しいただき. Lựa chọn 1 và 3 đúng ý nhưng 参る, 伺う là khiêm nhường ngữ, chỉ dùng cho việc của mình: sai chủ thể. Lựa chọn 4 là kính ngữ kép (お越しになる + られる).',
      ],
    ],
    points: [
      ['お越しいただく', 'おこしいただく', 'được (ai) đến (tôn kính)'],
      ['展示会', 'てんじかい', 'triển lãm'],
    ],
  }),
  item('mock2', 'hatsugen', 5, {
    script: [['状況', '初めて会う他社の人と名刺を交換しようとしましたが、自分の名刺がなくなっていました。何と言いますか。', 'Bạn định trao đổi danh thiếp với người công ty khác gặp lần đầu, nhưng danh thiếp của bạn đã hết. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['あいにく、名刺を切らしていらっしゃいまして。', 'あいにく、名刺を切らしてございまして。', 'あいにく、名刺を切らしておりまして。', 'あいにく、名刺をお切らししておりまして。'],
        2,
        'Hết danh thiếp là chuyện của mình: 切らしておりまして (khiêm nhường おる), bỏ lửng cuối câu cho mềm. Lựa chọn 1 đúng ý nhưng いらっしゃる là tôn kính ngữ, dùng cho chính mình là sai chủ thể. Lựa chọn 2 dùng ございます sai chỗ. Lựa chọn 4 gắn お～する vào động từ không làm "cho" ai.',
      ],
    ],
    points: [['切らす', 'きらす', 'hết, dùng hết (đồ dự trữ)']],
  }),
  item('mock2', 'hatsugen', 6, {
    script: [['状況', '取引先との打ち合わせで、自社の新製品の資料を相手に見てもらいます。資料を差し出しながら何と言いますか。', 'Trong buổi họp với đối tác, bạn mời họ xem tài liệu sản phẩm mới của công ty mình. Vừa đưa tài liệu bạn vừa nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['こちらの資料を、どうぞご覧ください。', 'こちらの資料を、どうぞ拝見してください。', 'こちらの資料を、どうぞお見せください。', 'こちらの資料を、どうぞ拝見なさってください。'],
        0,
        'Người xem là đối tác nên dùng tôn kính ご覧ください. Lựa chọn 2 đúng ý nhưng 拝見 là khiêm nhường, dùng cho việc của đối tác là sai chủ thể; lựa chọn 4 còn ghép thêm なさる vào. Lựa chọn 3 thành "xin cho tôi xem", ngược chiều.',
      ],
    ],
    points: [['ご覧になる', 'ごらんになる', 'xem (tôn kính)']],
  }),
  item('mock2', 'hatsugen', 7, {
    script: [['状況', '来社した取引先の人に、打ち合わせの前に飲み物を出します。コーヒーと緑茶のどちらがいいか聞きます。何と言いますか。', 'Trước buổi họp, bạn mời đồ uống cho khách của đối tác đến công ty. Bạn hỏi khách muốn cà phê hay trà xanh. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['コーヒーと緑茶、どちらにいたしますか。', 'コーヒーと緑茶、どちらをいただきますか。', 'コーヒーと緑茶、どちらをお飲みしますか。', 'コーヒーと緑茶、どちらになさいますか。'],
        3,
        'Người chọn là khách nên dùng tôn kính なさいますか. Lựa chọn 1 đúng ý nhưng いたす là khiêm nhường, gắn cho việc chọn của khách là sai chủ thể; lựa chọn 2 (いただく) cũng thế. Lựa chọn 3 dùng お～する (khiêm nhường) cho khách.',
      ],
    ],
    points: [['なさる', 'なさる', 'làm, chọn (tôn kính)']],
  }),
  item('mock2', 'hatsugen', 8, {
    script: [['状況', '課長が「この本、役に立つから貸してあげるよ」と言ってくれました。ありがたく借りることにします。何と言いますか。', 'Trưởng phòng bảo "Cuốn sách này có ích đấy, tôi cho mượn". Bạn vui vẻ nhận mượn. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['ありがとうございます。では、お貸しします。', 'ありがとうございます。では、お借りします。', 'ありがとうございます。では、拝借なさいます。', 'ありがとうございます。では、お借りになります。'],
        1,
        'Mình là người mượn nên dùng khiêm nhường お借りします. Lựa chọn 4 đúng ý nhưng お～になる là tôn kính ngữ, dùng cho chính mình là sai chủ thể. Lựa chọn 3 ghép なさる (tôn kính) vào 拝借 (khiêm nhường). Lựa chọn 1 thành mình cho mượn.',
      ],
    ],
    points: [
      ['お借りする', 'おかりする', 'mượn (khiêm nhường)'],
      ['拝借する', 'はいしゃくする', 'mượn (khiêm nhường, trang trọng)'],
    ],
  }),
  item('mock2', 'hatsugen', 9, {
    script: [['状況', '取引先の人に「来月の業界セミナー、ご存じですか」と聞かれました。そのセミナーのことは知っています。何と言いますか。', 'Người bên đối tác hỏi "Anh có biết hội thảo ngành tháng sau không?". Bạn biết hội thảo đó. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['はい、そのセミナーなら存じております。', 'はい、そのセミナーならご存じです。', 'はい、そのセミナーなら存じ上げております。', 'はい、そのセミナーならご存じでいらっしゃいます。'],
        0,
        'Mình biết nên dùng khiêm nhường 存じております. Lựa chọn 2 đúng ý nhưng ご存じ là tôn kính ngữ, dùng cho chính mình là sai chủ thể; lựa chọn 4 cũng vậy. Lựa chọn 3: 存じ上げる dùng khi biết một NGƯỜI, không dùng cho sự việc như hội thảo.',
      ],
    ],
    points: [
      ['存じる', 'ぞんじる', 'biết (khiêm nhường)'],
      ['ご存じ', 'ごぞんじ', 'biết (tôn kính)'],
    ],
  }),
  item('mock2', 'hatsugen', 10, {
    script: [['状況', '部長が明日の会議で使うプロジェクターを、あなたが先に会議室へ運んでおきました。部長にそのことを伝えます。', 'Bạn đã mang trước máy chiếu trưởng bộ phận sẽ dùng trong cuộc họp ngày mai vào phòng họp. Bạn báo việc đó với trưởng bộ phận.']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['プロジェクター、会議室に運んでおいてあげました。', 'プロジェクター、会議室に運んでいただきました。', 'プロジェクター、会議室に運んでおきました。', 'プロジェクター、会議室に運んでおかれました。'],
        2,
        'Báo đơn giản việc mình đã làm: 運んでおきました là đủ lịch sự với cấp trên. Lựa chọn 4 đúng ý nhưng ～ておかれる là tôn kính, dùng cho chính mình là sai chủ thể. Lựa chọn 1: ～てあげる với cấp trên nghe như ban ơn. Lựa chọn 2 thành có người khác mang hộ.',
      ],
    ],
    points: [['～ておく', 'ておく', 'làm sẵn, làm trước']],
  }),

  // ── 総合聴解 ──
  item('mock2', 'sogo-chokai', 1, {
    script: [
      ['男', '課長、来月の株主総会の受付のことなんですが、去年は入口がかなり混雑して、開始が十分遅れましたよね。', 'Chị trưởng phòng, về quầy tiếp đón ở đại hội cổ đông tháng sau ạ. Năm ngoái lối vào đông nghẹt, khai mạc trễ mất mười phút.'],
      ['女', 'そうだったわね。株主さんから苦情のお手紙もいただいたし。', 'Đúng vậy. Còn nhận cả thư phàn nàn của cổ đông nữa.'],
      ['男', 'それで、今年は受付の机を、三つから五つに増やそうと思うんです。', 'Vì thế năm nay em định tăng bàn tiếp đón từ ba lên năm.'],
      ['女', '机を増やしても、あのロビーは狭いから、かえって人が通れなくなるんじゃない？', 'Tăng bàn thì sảnh đó hẹp, có khi người ta còn không đi qua được ấy chứ?'],
      ['男', 'あ、そうか…。じゃあ、二階にも受付を作って、二か所に分けるのはどうでしょう。', 'À, đúng thật… Vậy làm thêm quầy ở tầng hai, chia ra hai chỗ thì sao ạ?'],
      ['女', '二階は役員の控え室にしているし、エレベーターも一台しかないでしょう。ご年配の株主さんが多いから、階段を上がってもらうのはちょっとね。', 'Tầng hai đang làm phòng chờ của ban giám đốc, thang máy lại chỉ có một cái. Cổ đông lớn tuổi nhiều, bắt họ leo cầu thang thì không ổn.'],
      ['男', 'そうですね…。', 'Đúng ạ…'],
      ['女', '去年見ていて思ったんだけど、時間がかかっていたのは、入場票を忘れた方の確認だったのよ。一人に五分ぐらいかかってた。', 'Năm ngoái chị quan sát thì thấy cái mất thời gian là khâu xác nhận người quên phiếu vào cửa. Mỗi người mất chừng năm phút.'],
      ['男', 'ああ、名簿でお名前とご住所を探していましたね。', 'À, mọi người phải dò tên và địa chỉ trong danh sách.'],
      ['女', 'だから、入場票をお持ちの方と、お忘れの方で、列を分けましょう。お持ちの方はすぐ通れるし、お忘れの方には専用の机を一つ用意して、名簿を検索できるパソコンを置けばいいわ。', 'Nên mình chia hàng: người có phiếu và người quên phiếu. Người có phiếu đi qua ngay, còn người quên thì dành riêng một bàn, đặt máy tính tra được danh sách là xong.'],
      ['男', 'なるほど。じゃあ、机は三つのままで、そのうち一つをお忘れの方用にします。列の案内の看板も作っておきます。', 'Ra vậy. Vậy giữ nguyên ba bàn, dành một bàn cho người quên phiếu. Em cũng sẽ làm biển hướng dẫn xếp hàng.'],
    ],
    questions: [
      [
        '今年の受付はどうすることになりましたか。',
        ['受付の机を五つに増やす', '二階にも受付を設ける', '入場票の有無で列を分ける', '名簿をパソコンで作り直す'],
        2,
        'Chị trưởng phòng chỉ ra chỗ tắc là khâu xác nhận người quên phiếu, nên chốt chia hai hàng theo có phiếu hay không; anh đồng ý và giữ nguyên ba bàn. Lựa chọn 1 bị bác vì sảnh hẹp, lựa chọn 2 bị bác vì tầng hai là phòng chờ và chỉ có một thang máy. Lựa chọn 4: máy tính chỉ dùng để tra danh sách có sẵn.',
      ],
    ],
    points: [
      ['株主総会', 'かぶぬしそうかい', 'đại hội cổ đông'],
      ['入場票', 'にゅうじょうひょう', 'phiếu vào cửa'],
      ['控え室', 'ひかえしつ', 'phòng chờ'],
    ],
  }),
  item('mock2', 'sogo-chokai', 2, {
    script: [
      ['男', 'おはようございます。センター長の大野です。今月から新しい年度が始まりましたので、今年度の目標をお伝えします。', 'Chào buổi sáng. Tôi là Ono, trưởng trung tâm. Từ tháng này năm tài chính mới bắt đầu, nên tôi xin thông báo mục tiêu năm nay.'],
      ['男', '去年は通販の注文が一気に増えて、一日の出荷件数が、前の年の一・五倍になりました。皆さんが残業して支えてくれたおかげで、何とか乗り切ることができました。ありがとうございました。', 'Năm ngoái đơn hàng bán qua mạng tăng vọt, số kiện xuất mỗi ngày gấp rưỡi năm trước. Nhờ mọi người làm thêm giờ gánh vác mà chúng ta vượt qua được. Xin cảm ơn mọi người.'],
      ['男', 'ただ、その一方で、誤出荷、つまり、注文と違う商品を送ってしまうミスが、月に二十件ほど出ています。', 'Nhưng mặt khác, lỗi gửi nhầm, tức là gửi sản phẩm khác với đơn đặt, xảy ra khoảng hai mươi vụ mỗi tháng.'],
      ['男', '一件起きるたびに、お客様へのおわびと送り直しで、一万円近い費用がかかります。でも、それ以上に大きいのは、お客様の信用を失うことです。', 'Mỗi lần xảy ra, xin lỗi khách và gửi lại tốn gần một vạn yên. Nhưng lớn hơn thế là mất lòng tin của khách hàng.'],
      ['男', 'そこで、今年度は、出荷のスピードを上げることより、誤出荷を月五件以下に抑えることを目標にします。', 'Vì vậy, năm nay mục tiêu không phải là tăng tốc độ xuất hàng, mà là giữ lỗi gửi nhầm ở mức năm vụ một tháng trở xuống.'],
      ['男', 'そのために、来月から、棚から商品を取ったあとに、バーコードを読み取る作業を一つ増やします。最初は少し時間がかかると思いますが、慣れれば一件あたり数秒です。最初の三か月は、毎週金曜日の朝礼で、前の週の件数をお知らせします。', 'Để làm được, từ tháng sau sẽ thêm một thao tác quét mã vạch sau khi lấy hàng khỏi kệ. Lúc đầu chắc hơi mất thời gian, nhưng quen rồi thì mỗi kiện chỉ vài giây. Ba tháng đầu, tôi sẽ thông báo số vụ của tuần trước trong buổi giao ban sáng thứ sáu hằng tuần.'],
      ['男', 'なお、残業を減らすために、夕方のアルバイトを三人増やすことも決まりました。以上です。今年度もよろしくお願いします。', 'Ngoài ra, để giảm làm thêm giờ, chúng tôi cũng đã quyết định tuyển thêm ba người làm bán thời gian ca chiều. Hết. Năm nay cũng mong mọi người giúp đỡ.'],
    ],
    questions: [
      [
        'センター長は、今年度は何を目標にすると言っていますか。',
        ['一日の出荷件数を増やすこと', '発送の間違いを減らすこと', '社員の残業時間を減らすこと', 'アルバイトを三人増やすこと'],
        1,
        'Ông nói rõ mục tiêu năm nay là 誤出荷を月五件以下に: giảm lỗi gửi nhầm hàng. Lựa chọn 1 là thành tích năm ngoái, và ông nói tốc độ không phải mục tiêu. Lựa chọn 3 và 4 là biện pháp phụ được nhắc ở cuối, không phải mục tiêu chính.',
      ],
    ],
    points: [
      ['誤出荷', 'ごしゅっか', 'gửi nhầm hàng'],
      ['乗り切る', 'のりきる', 'vượt qua'],
      ['抑える', 'おさえる', 'kìm, giữ ở mức'],
    ],
  }),
  item('mock2', 'sogo-chokai', 3, {
    script: [
      ['男', '田村さん、ちょっといいですか。今朝、丸一食堂さんからFAXで注文が来たんですけど、これ、見てもらえますか。', 'Chị Tamura, chị có rảnh chút không ạ? Sáng nay nhà hàng Maruichi gửi đơn đặt hàng qua FAX, chị xem giúp em được không?'],
      ['女', 'どれどれ。…しょうゆ、一斗缶で三十缶？ 丸一さん、いつもは三缶よね。', 'Đâu xem nào. … Xì dầu, thùng mười tám lít, ba mươi thùng? Maruichi bình thường đặt ba thùng mà.'],
      ['男', 'そうなんです。ゼロが一つ多いんじゃないかと思って。でも、来週お店で大きな宴会があるって、この前ご主人がおっしゃっていたので、本当に三十かもしれなくて…。', 'Vâng ạ. Em nghĩ có khi thừa một số không. Nhưng hôm trước ông chủ có nói tuần sau quán có tiệc lớn, nên có khi đúng là ba mươi thật…'],
      ['女', 'うーん。とりあえず三缶だけ先に出しておいたら？', 'Ừm. Hay tạm thời xuất trước ba thùng thôi?'],
      ['男', 'でも、もし本当に三十缶だったら、宴会に間に合わなくなります。倉庫には今二十五缶しかないので、足りない分はメーカーに頼まないといけないんです。', 'Nhưng lỡ đúng là ba mươi thùng thì không kịp tiệc. Trong kho bây giờ chỉ có hai mươi lăm thùng, phần thiếu phải đặt nhà sản xuất.'],
      ['女', 'そうか。メーカーに頼むと三日はかかるものね。じゃあ、こっちで勝手に決めないで、丸一さんに数を確かめるのが一番ね。', 'Ra thế. Đặt nhà sản xuất mất ít nhất ba ngày. Vậy đừng tự mình quyết, hỏi lại Maruichi số lượng là tốt nhất.'],
      ['男', 'はい。ただ、ご主人は午前中は仕込みで忙しくて、電話に出られないことが多いんです。', 'Vâng. Có điều buổi sáng ông chủ bận chuẩn bị nguyên liệu, hay không nghe máy được.'],
      ['女', 'だったら、今のうちにFAXで「数量ご確認のお願い」を送っておいて、お昼過ぎにもう一回電話すればいいわ。メーカーへの発注は、数がはっきりしてからね。', 'Thế thì bây giờ gửi FAX "Xin xác nhận số lượng" trước, quá trưa gọi lại lần nữa là được. Còn đặt hàng nhà sản xuất thì đợi số lượng rõ ràng đã.'],
      ['男', 'わかりました。じゃあ、すぐに確認のFAXを作ります。お昼過ぎの電話は、私からかけます。', 'Vâng ạ. Vậy em làm FAX xác nhận ngay. Cuộc gọi quá trưa thì em sẽ gọi.'],
    ],
    questions: [
      [
        '男の人はまず何をしますか。',
        ['しょうゆを三缶だけ出荷する', 'メーカーに不足分を発注する', '丸一食堂にすぐ電話をかける', '数量を確かめる文書を送る'],
        3,
        'Buổi sáng ông chủ khó nghe máy, nên chị bảo gửi FAX "xin xác nhận số lượng" trước, quá trưa mới gọi; anh nói すぐに確認のFAXを作ります. Lựa chọn 3 là việc làm sau (quá trưa). Lựa chọn 1 bị bác vì có thể không kịp tiệc. Lựa chọn 2 phải đợi số lượng rõ ràng.',
      ],
    ],
    points: [
      ['一斗缶', 'いっとかん', 'thùng mười tám lít'],
      ['仕込み', 'しこみ', 'sơ chế, chuẩn bị nguyên liệu'],
      ['発注', 'はっちゅう', 'đặt hàng (với nhà cung cấp)'],
    ],
  }),
  item('mock2', 'sogo-chokai', 4, {
    script: [
      ['女', '課長、お帰りなさい。お留守の間に、光和電機の松田様からお電話がありました。', 'Trưởng phòng đã về ạ. Lúc anh vắng, anh Matsuda bên Kowa Denki có gọi điện.'],
      ['男', 'ああ、松田さん。何だって？', 'À, anh Matsuda. Anh ấy nói gì?'],
      ['女', '来週木曜日の打ち合わせに、先方の部長様も出席されることになったので、会議室を少し広いところにしていただけないか、とのことでした。', 'Buổi họp thứ năm tuần sau, trưởng bộ phận bên họ cũng sẽ dự, nên họ hỏi mình có thể đổi sang phòng họp rộng hơn một chút không ạ.'],
      ['男', '広いところね。じゃあ、第一会議室を取っておいてくれる？', 'Phòng rộng à. Vậy em giữ phòng họp số một giúp tôi nhé?'],
      ['女', '第一会議室は、その日は午後から役員会議で使うそうです。さっき総務に確認しました。第二会議室なら空いていますが、八人までです。', 'Phòng số một hôm đó từ chiều ban giám đốc họp ạ. Em vừa hỏi phòng tổng vụ. Phòng số hai thì trống, nhưng tối đa tám người.'],
      ['男', '先方は何人だって？', 'Bên họ mấy người?'],
      ['女', '部長様を入れて四人で、こちらは課長と私の二人ですから、六人です。', 'Tính cả trưởng bộ phận là bốn người, bên mình có anh và em là hai, tổng sáu người ạ.'],
      ['男', 'なんだ、それなら第二で十分だね。じゃあ、そこを押さえておいて。', 'Thế thì phòng số hai là đủ rồi. Em giữ phòng đó nhé.'],
      ['女', 'はい。あ、それと、資料を事前にメールで送ってほしい、というお話もありました。先方の部長様が、前もって目を通しておきたいそうです。', 'Vâng. À, còn nữa, anh ấy có nhờ gửi trước tài liệu qua email. Trưởng bộ phận bên họ muốn đọc trước ạ.'],
      ['男', 'そうか。資料はまだ半分しかできていないんだよな…。じゃあ、まず松田さんに電話して、いつまでに送ればいいか聞いてみるよ。部屋が変わったことも、そのときに伝える。', 'Vậy à. Tài liệu mới xong một nửa… Thế thì trước tiên tôi gọi anh Matsuda hỏi xem phải gửi trước khi nào. Chuyện đổi phòng thì báo luôn lúc đó.'],
      ['女', 'わかりました。私は第二会議室の予約を入れておきます。お茶の用意も六人分、総務にお願いしておきますね。', 'Vâng ạ. Em sẽ đặt phòng họp số hai. Em cũng nhờ phòng tổng vụ chuẩn bị trà cho sáu người nhé.'],
    ],
    questions: [
      [
        '課長はこのあとまず何をしますか。',
        ['先方に資料の期限を聞く', '第一会議室を予約する', '会議の資料を仕上げる', '総務に会議室の空きを聞く'],
        0,
        'Trưởng phòng nói まず松田さんに電話して、いつまでに送ればいいか聞いてみる: hỏi hạn gửi tài liệu. Lựa chọn 2 không được vì phòng số một đã có ban giám đốc dùng. Lựa chọn 3 là việc làm sau khi biết hạn. Lựa chọn 4 người phụ nữ đã làm rồi.',
      ],
    ],
    points: [
      ['先方', 'せんぽう', 'phía bên kia, đối tác'],
      ['押さえる', 'おさえる', 'giữ chỗ'],
      ['前もって', 'まえもって', 'trước, từ trước'],
    ],
  }),
  item('mock2', 'sogo-chokai', 5, {
    script: [
      ['女1', '新しいドレッシングのパッケージ、試作品が届きました。どうですか。', 'Mẫu thử bao bì cho loại nước sốt salad mới đến rồi. Mọi người thấy sao?'],
      ['女2', 'きれいですね。色も明るくて、若い人に受けそうです。ただ、スーパーの棚に並べると、ほかの商品に埋もれてしまうかもしれません。', 'Đẹp đấy. Màu cũng tươi, chắc giới trẻ thích. Có điều xếp lên kệ siêu thị thì có khi bị lẫn giữa các sản phẩm khác.'],
      ['男', '瓶の大きさは変えられませんよ。工場の機械に合わせてありますから。', 'Kích cỡ chai thì không đổi được đâu. Đã làm khớp với máy ở nhà máy rồi.'],
      ['女2', 'いえ、瓶じゃなくて、ラベルの文字です。商品名が細い字なので、少し離れると読みにくいんです。', 'Không, không phải chai, mà là chữ trên nhãn. Tên sản phẩm viết nét mảnh, đứng xa một chút là khó đọc.'],
      ['女1', '確かに。でも、この細い字がおしゃれな感じを出しているんですよね。デザインの方向は変えたくないなあ。', 'Đúng thật. Nhưng chính nét chữ mảnh này tạo cảm giác sang. Tôi không muốn đổi hướng thiết kế.'],
      ['男', 'じゃあ、色を変えるのはどうでしょう。今の薄い緑を濃い緑にすれば、遠くからでも目立ちますよ。', 'Vậy đổi màu thì sao? Màu xanh nhạt bây giờ đổi sang xanh đậm thì từ xa cũng nổi.'],
      ['女2', '色より、文字の大きさだと思います。この商品は、お客さんが名前で選ぶので。', 'Tôi nghĩ vấn đề là cỡ chữ hơn là màu. Sản phẩm này khách chọn theo tên mà.'],
      ['男', '字の形はこのままで、大きさを一・五倍にするのは、できなくはないです。そのかわり、下の説明文を少し短くしてもらうことになりますが。', 'Giữ nguyên kiểu chữ, phóng to gấp rưỡi thì cũng không phải không làm được. Bù lại phải rút ngắn phần mô tả bên dưới một chút.'],
      ['女2', '一・五倍なら、棚の前を通っただけでも読めると思います。', 'Gấp rưỡi thì chỉ đi ngang qua kệ cũng đọc được.'],
      ['女1', '説明文は裏にも書いてあるから、表は短くていいわ。じゃあ、それでお願いします。色は今のままで。', 'Mô tả thì mặt sau cũng có, mặt trước ngắn cũng được. Vậy làm thế nhé. Màu giữ như bây giờ.'],
      ['男', 'わかりました。来週の月曜日までに直したものをお持ちします。', 'Vâng. Tôi sẽ mang bản đã sửa đến trước thứ hai tuần sau.'],
    ],
    questions: [
      [
        'パッケージのどこを変えることにしましたか。',
        ['瓶の大きさを変える', 'ラベルの色を濃くする', '商品名の字体を太くする', '商品名を大きく表示する'],
        3,
        'Chốt: giữ kiểu chữ (字の形はこのまま), phóng to tên sản phẩm gấp rưỡi, rút ngắn mô tả; màu giữ nguyên. Lựa chọn 3 trái với việc giữ nét chữ mảnh. Lựa chọn 2 là đề xuất bị gạt (色は今のままで). Lựa chọn 1 không đổi được vì máy ở nhà máy.',
      ],
    ],
    points: [
      ['埋もれる', 'うもれる', 'bị lấp, bị chìm lẫn'],
      ['目立つ', 'めだつ', 'nổi bật'],
      ['説明文', 'せつめいぶん', 'đoạn mô tả'],
    ],
  }),
  item('mock2', 'sogo-chokai', 6, {
    script: [
      ['男', '課長、来年から使う配送会社の件ですが、三社から見積もりがそろいました。', 'Chị trưởng phòng, về công ty giao hàng dùng từ năm sau, đã có đủ báo giá của ba công ty ạ.'],
      ['女', 'ありがとう。どう？', 'Cảm ơn em. Thế nào?'],
      ['男', '一番安いのは東日本ロジです。今の会社より、年間で二百万円ほど下がります。', 'Rẻ nhất là Higashi Nihon Logi. Mỗi năm giảm khoảng hai trăm vạn yên so với công ty hiện tại.'],
      ['女', '二百万は大きいわね。部長も喜びそう。', 'Hai trăm vạn là lớn đấy. Trưởng bộ phận chắc vui lắm.'],
      ['男', 'はい。今の会社は、去年から二回も値上げしていますので。ただ、配達の時間指定は、午前か午後の二つだけなんです。', 'Vâng. Công ty hiện tại từ năm ngoái đã tăng giá hai lần rồi. Có điều chỉ định giờ giao chỉ có hai loại: buổi sáng hoặc buổi chiều.'],
      ['女', 'うちのお客さんは飲食店が多いから、仕込みが始まる朝九時までに届けてほしい、っていうお店がけっこうあるのよね。', 'Khách của mình nhiều quán ăn, khá nhiều quán muốn giao trước chín giờ sáng, lúc họ bắt đầu sơ chế.'],
      ['男', 'そうなんです。二番目のさくら運輸は朝八時台の指定ができますが、料金は今とほとんど同じです。三番目の北星急便は少し高いんですが、事故があったときの補償が一番手厚いです。', 'Đúng ạ. Công ty thứ hai, Sakura Unyu, chỉ định được khung tám giờ sáng, nhưng giá gần như bằng bây giờ. Công ty thứ ba, Hokusei Kyubin, hơi đắt nhưng bồi thường khi có sự cố là chu đáo nhất.'],
      ['女', '補償は、どこもある程度はあるでしょう。それより、お店が開く前に確実に届くかどうかよ。届かなかったら、お店はその日の料理が作れないんだから。去年、配達が遅れて、お店から何度もお叱りを受けたでしょう。', 'Bồi thường thì chỗ nào cũng có ở mức nào đó. Quan trọng hơn là có giao chắc chắn trước giờ quán mở cửa không. Không giao tới thì quán đâu nấu được món hôm đó. Năm ngoái giao trễ, mình bị các quán trách mấy lần rồi còn gì.'],
      ['男', 'では、さくら運輸で進めてよろしいですか。', 'Vậy em tiến hành với Sakura Unyu được không ạ?'],
      ['女', 'ええ。ただ、念のため、雪の日の配達がどうなるか、聞いておいてくれる？', 'Ừ. Nhưng để cho chắc, em hỏi giúp xem ngày tuyết rơi thì họ giao thế nào nhé.'],
      ['男', 'わかりました。さくら運輸の担当の方に、今日中に聞いてみます。', 'Vâng ạ. Em sẽ hỏi người phụ trách bên Sakura Unyu trong hôm nay.'],
    ],
    questions: [
      [
        '課長が配送会社を選ぶうえで一番重視していることは何ですか。',
        ['年間の費用を抑えること', '早朝の配達時間を守れること', '事故の際の補償が手厚いこと', '雪の日にも配達できること'],
        1,
        'Chị gạt chuyện giá và bồi thường sang bên, nói điều quan trọng là お店が開く前に確実に届くか: giao đúng khung sáng sớm. Lựa chọn 1 là ưu điểm của công ty rẻ nhất nhưng không đáp ứng giờ giao. Lựa chọn 3 chị nói どこもある程度はある. Lựa chọn 4 chỉ là việc hỏi thêm cho chắc.',
      ],
    ],
    points: [
      ['時間指定', 'じかんしてい', 'chỉ định giờ (giao hàng)'],
      ['補償', 'ほしょう', 'bồi thường'],
      ['手厚い', 'てあつい', 'chu đáo, hậu hĩnh'],
    ],
  }),
  item('mock2', 'sogo-chokai', 7, {
    script: [
      ['男', '総務部からお知らせします。来月から、本社三階の席を、決まった席を持たない、いわゆるフリーアドレスに変えます。', 'Phòng tổng vụ xin thông báo. Từ tháng sau, chỗ ngồi tầng ba trụ sở sẽ chuyển sang kiểu không có chỗ cố định, tức là "free address".'],
      ['男', '皆さんからは、「紙の書類が減りそうだ」「部屋が広く使えそうだ」といった声をいただいていますし、それも確かにあると思います。', 'Mọi người nói rằng "có vẻ giấy tờ sẽ giảm", "có vẻ dùng phòng rộng rãi hơn", và đúng là cũng có những điều đó.'],
      ['男', 'ただ、会社として一番期待しているのは、部署を超えた会話が増えることです。去年の社内調査では、「ほかの部署の人と仕事の話をするのは月に一回以下」という人が、六割を超えていました。', 'Nhưng điều công ty kỳ vọng nhất là trò chuyện giữa các bộ phận sẽ nhiều lên. Khảo sát nội bộ năm ngoái cho thấy hơn sáu mươi phần trăm người trả lời "nói chuyện công việc với người bộ phận khác không quá một lần một tháng".'],
      ['男', '新しい商品のアイデアというのは、たいてい部署と部署の間から生まれるものです。', 'Ý tưởng sản phẩm mới thường nảy ra từ khoảng giữa các bộ phận với nhau.'],
      ['男', '席は毎朝、入口の端末で選んでいただきます。同じ部署で固まらないように、一つの島には同じ部署の人が三人までしか座れない設定にしてあります。前の日から席を予約することはできませんので、ご注意ください。', 'Mỗi sáng mọi người chọn chỗ ở máy đặt tại lối vào. Để người cùng bộ phận không tụ một chỗ, mỗi cụm bàn chỉ cho tối đa ba người cùng bộ phận ngồi. Xin lưu ý là không thể đặt chỗ từ hôm trước.'],
      ['男', '個人の荷物は、一人に一つずつロッカーを用意しますので、そちらに入れてください。帰るときは、机の上に何も残さないようにお願いします。', 'Đồ cá nhân, mỗi người được một tủ khoá, xin để vào đó. Khi về, xin đừng để lại gì trên bàn.'],
      ['男', 'なお、電話の多い営業部と、個人情報を扱う人事部は、今回は対象外です。最初の一か月は、使ってみての意見を集めて、必要があれば見直します。', 'Lưu ý, phòng kinh doanh hay gọi điện và phòng nhân sự xử lý thông tin cá nhân không thuộc đợt này. Tháng đầu tiên chúng tôi sẽ thu thập ý kiến sau khi dùng thử, cần thì sẽ điều chỉnh.'],
    ],
    questions: [
      [
        '話している人は、今回の変更の一番の利点は何だと言っていますか。',
        ['紙の書類を減らせること', '部屋を広く使えること', '他部署との交流が生まれること', '個人用のロッカーが使えること'],
        2,
        'Anh nói 会社として一番期待している là trò chuyện giữa các bộ phận nhiều lên, vì ý tưởng mới nảy ra từ đó. Lựa chọn 1 và 2 là ý kiến của nhân viên, anh chỉ công nhận là "cũng có". Lựa chọn 4 chỉ là cách sắp xếp đồ đạc.',
      ],
    ],
    points: [
      ['対象外', 'たいしょうがい', 'không thuộc đối tượng'],
      ['固まる', 'かたまる', 'tụ lại một chỗ'],
      ['端末', 'たんまつ', 'thiết bị đầu cuối, máy'],
    ],
  }),
  item('mock2', 'sogo-chokai', 8, {
    script: [
      ['男', 'もしもし、中村です。今、福岡空港に着いたところなんだけど、ちょっと予定が変わってね。急で悪いんだけど、いくつか頼みたいことがあるんだ。', 'A lô, Nakamura đây. Tôi vừa đến sân bay Fukuoka, nhưng lịch có chút thay đổi. Đột ngột quá xin lỗi em, nhưng tôi có mấy việc muốn nhờ.'],
      ['男', 'あした、北九州の工場に寄ることになったから、帰りの飛行機を、あしたの夕方の便から、あさっての朝一番の便に変えてほしいんだ。ホテルも、もう一泊延ばしてもらえるかな。今の博多のホテルでいいよ。支払いは会社のカードでしておいて。', 'Mai tôi phải ghé nhà máy ở Kitakyushu, nên em đổi giúp chuyến bay về từ chuyến chiều tối mai sang chuyến sớm nhất sáng ngày kia. Khách sạn cũng kéo dài thêm một đêm nhé. Cứ khách sạn ở Hakata hiện tại là được. Thanh toán bằng thẻ công ty nhé.'],
      ['男', 'それから、あさって十時からの営業会議には間に合わないと思うから、司会は、悪いけど、山下さんにお願いしてもらえる？ 山下さんには、まだ僕から何も話していないから。進め方はいつもどおりで大丈夫だって伝えて。','Còn nữa, chắc tôi không kịp cuộc họp kinh doanh mười giờ ngày kia, nên phiền em nhờ chị Yamashita làm chủ trì được không? Tôi vẫn chưa nói gì với chị Yamashita cả. Nói với chị ấy là cứ tiến hành như mọi khi là được.'],
      ['男', '会議の資料は、僕のパソコンの共有フォルダに入ってる。あ、でも、あれはまだ数字が古いんだ。直したものを今夜メールで送るから、それを印刷して配ってくれればいい。', 'Tài liệu họp nằm trong thư mục chia sẻ trên máy tôi. À, nhưng cái đó số liệu còn cũ. Tối nay tôi sẽ gửi bản đã sửa qua email, em in cái đó ra phát là được.'],
      ['男', '北九州の工場長には、僕から直接連絡するから、そっちは気にしなくていいよ。', 'Xưởng trưởng ở Kitakyushu thì tôi sẽ liên lạc trực tiếp, em không cần lo phần đó.'],
      ['男', 'とりあえず、飛行機とホテルを先に頼むよ。今週はどこも混んでいるらしいから。何かあったら携帯に電話して。夜なら出られるから。じゃあ、よろしく。', 'Trước mắt, lo vé máy bay và khách sạn trước giúp tôi. Nghe nói tuần này chỗ nào cũng đông. Có gì thì gọi di động cho tôi. Buổi tối thì tôi nghe được. Vậy nhờ em nhé.'],
    ],
    questions: [
      [
        'この留守番電話を聞いた人は、まず何をしますか。',
        ['帰りの便と宿泊を変更する', '会議の司会を山下さんに頼む', '共有フォルダの資料を印刷する', '工場訪問の日程を調整する'],
        0,
        'Cuối tin nhắn anh dặn とりあえず、飛行機とホテルを先に頼む vì tuần này đông. Lựa chọn 2 cũng phải làm nhưng sau. Lựa chọn 3 sai: bản trong thư mục số liệu cũ, phải đợi bản sửa gửi tối nay. Lựa chọn 4 anh đã tự quyết rồi.',
      ],
    ],
    points: [
      ['延ばす', 'のばす', 'kéo dài'],
      ['共有フォルダ', 'きょうゆうふぉるだ', 'thư mục dùng chung'],
      ['朝一番', 'あさいちばん', 'sớm nhất buổi sáng'],
    ],
  }),
  item('mock2', 'sogo-chokai', 9, {
    script: [
      ['女', '部長、来月の管理職研修の講師ですが、候補が二人います。お一人は大学の先生で、リーダーシップの本を何冊も出している方です。', 'Thưa trưởng bộ phận, về giảng viên khoá đào tạo quản lý tháng sau, có hai ứng viên ạ. Một vị là giáo sư đại học, đã ra nhiều sách về lãnh đạo.'],
      ['男', 'ああ、名前は聞いたことがあるな。', 'À, tên thì tôi có nghe.'],
      ['女', 'もうお一人は、以前、食品メーカーで工場長をされていた方で、今はコンサルタントをされています。本は出していませんが、去年、他社で研修をされたときの評判がとてもよかったそうです。', 'Vị còn lại trước đây làm xưởng trưởng ở một hãng thực phẩm, giờ làm tư vấn. Không ra sách, nhưng năm ngoái dạy cho công ty khác thì nghe nói được đánh giá rất tốt.'],
      ['男', '費用はどう？', 'Chi phí thế nào?'],
      ['女', '大学の先生のほうが、二割ほど高いです。ただ、どちらも予算の範囲には入っています。', 'Giáo sư đại học cao hơn khoảng hai mươi phần trăm ạ. Nhưng cả hai đều nằm trong ngân sách.'],
      ['男', 'うーん。うちの課長たちは、理論はもう本でさんざん読んでいるんだよ。困っているのは、実際に部下が言うことを聞かないときにどうするか、なんだ。', 'Ừm. Các trưởng phòng của mình đọc lý thuyết trong sách nhiều rồi. Cái họ khổ là khi cấp dưới không nghe lời thì phải làm sao.'],
      ['女', 'そうですね。事前のアンケートでも、「具体的な場面での対応を知りたい」という声が一番多かったです。', 'Đúng vậy ạ. Khảo sát trước khoá học, ý kiến "muốn biết cách xử lý trong tình huống cụ thể" cũng nhiều nhất.'],
      ['男', 'だったら、現場で実際に人を動かしてきた人に話してもらうのがいい。費用は、安いに越したことはないけど、それで選ぶわけじゃないよ。', 'Vậy thì nên mời người thực sự đã điều hành con người ở hiện trường. Chi phí rẻ thì tốt nhất, nhưng không phải chọn vì thế.'],
      ['女', 'では、元工場長の方にお願いしてみます。', 'Vậy tôi sẽ thử mời vị nguyên xưởng trưởng ạ.'],
      ['男', 'うん。できれば、うちの工場も一度見てもらってから話してもらえるといいね。', 'Ừ. Nếu được thì mời ông ấy xem qua nhà máy mình một lần rồi hãy nói thì tốt.'],
      ['女', 'わかりました。ご都合を伺って、見学の日程も調整してみます。', 'Vâng ạ. Tôi sẽ hỏi lịch của ông ấy và sắp xếp cả buổi tham quan.'],
    ],
    questions: [
      [
        '部長が講師選びで一番重視していることは何ですか。',
        ['本を多く出していること', '現場で人を率いた経験', '研修の費用が安いこと', '他社での評判がよいこと'],
        1,
        'Trưởng bộ phận muốn 現場で実際に人を動かしてきた人, vì các trưởng phòng cần cách xử lý thực tế chứ không cần lý thuyết. Lựa chọn 1 là điểm mạnh của giáo sư mà ông gạt đi. Lựa chọn 3 ông nói rõ không chọn vì giá. Lựa chọn 4 là thông tin người phụ nữ nêu, ông không dựa vào đó.',
      ],
    ],
    points: [
      ['管理職', 'かんりしょく', 'cấp quản lý'],
      ['～に越したことはない', 'にこしたことはない', 'không gì bằng ~, ~ thì tốt nhất'],
      ['率いる', 'ひきいる', 'dẫn dắt'],
    ],
  }),
  item('mock2', 'sogo-chokai', 10, {
    script: [
      ['女', '本日はお時間をいただき、ありがとうございます。早速ですが、来月からの冷凍ギョーザの納品価格の件で…。', 'Cảm ơn anh đã dành thời gian hôm nay. Xin vào việc luôn, về giá giao sủi cảo đông lạnh từ tháng sau…'],
      ['男', 'ええ、メールは拝見しました。一袋二十円の値上げ、ということでしたね。', 'Vâng, tôi đã đọc email. Tăng hai mươi yên một gói, phải không?'],
      ['女', 'はい。原料の小麦と豚肉の値段が上がっておりまして、心苦しいのですが…。', 'Vâng. Giá nguyên liệu bột mì và thịt lợn tăng, chúng tôi rất áy náy, nhưng…'],
      ['男', '事情はわかります。ただ、うちとしては、売り場の値段を上げると、お客様が離れてしまうんですよ。今の二百九十八円は何とか守りたい。', 'Tình hình thì tôi hiểu. Nhưng phía chúng tôi mà tăng giá bán ở quầy thì khách bỏ đi. Mức hai trăm chín mươi tám yên bây giờ tôi muốn giữ bằng được.'],
      ['女', 'そうですよね…。では、値上げ幅を十円にさせていただくというのは…。', 'Vâng… Vậy nếu chúng tôi xin tăng mười yên thôi thì…'],
      ['男', '十円でも、うちの利益はほとんどなくなってしまいます。', 'Mười yên thì lãi của chúng tôi cũng gần như mất hết.'],
      ['女', '…でしたら、価格はそのままで、一袋の数を十二個から十個にさせていただくのはいかがでしょうか。', '… Vậy thì giữ giá, đổi số lượng mỗi gói từ mười hai cái xuống mười cái thì anh thấy thế nào ạ?'],
      ['男', '数を減らすのか…。それはお客様に気づかれますよ。それより、今の袋はそのまま残して、二十個入りの大きい袋を新しく作ってもらえませんか。大きい袋なら四百九十八円で売れます。', 'Giảm số lượng à… Khách sẽ nhận ra đấy. Thay vào đó, giữ nguyên gói hiện tại, rồi làm thêm loại gói lớn hai mươi cái được không? Gói lớn thì bán được bốn trăm chín mươi tám yên.'],
      ['女', '大袋ですか。工場に確認は必要ですが、包装の機械は今のものが使えるはずです。それなら、今の袋の値段は据え置きにして、大袋で利益を出せるように考えてみます。', 'Gói lớn à. Phải hỏi nhà máy đã, nhưng máy đóng gói hiện tại chắc dùng được. Vậy thì giá gói hiện tại giữ nguyên, chúng tôi sẽ tính để gói lớn mang lại lợi nhuận.'],
      ['男', 'じゃあ、その方向でお願いします。', 'Vậy nhờ chị theo hướng đó.'],
    ],
    questions: [
      [
        '話し合いの結果、どうなりましたか。',
        ['今の袋を二十円値上げする', '今の袋を十円値上げする', '今の袋の個数を減らす', '量の多い商品を新たに作る'],
        3,
        'Bên mua đề xuất làm thêm gói lớn hai mươi cái, bên bán đồng ý và giữ nguyên giá gói hiện tại (据え置き). Lựa chọn 1 là đề nghị ban đầu, lựa chọn 2 là lần nhượng bộ thứ nhất, lựa chọn 3 là đề xuất thứ hai: cả ba đều bị bác.',
      ],
    ],
    points: [
      ['納品価格', 'のうひんかかく', 'giá giao hàng'],
      ['値上げ幅', 'ねあげはば', 'mức tăng giá'],
      ['据え置き', 'すえおき', 'giữ nguyên (giá)'],
    ],
  }),
];

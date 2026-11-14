import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/**
 * Full test 1 (week 8), 聴解: 5 場面把握 + 10 発言聴解 + 10 総合聴解 questions = 25.
 * Mixes the themes of weeks 1–7; about 30% of the questions are J1+ (implied meaning, indirect refusals).
 * 発言聴解 and 総合聴解 follow the 2026-11-14 calibration rules (spec): one keigo point per 発言 choice set,
 * one question per 総合 item, scripts of 450–750 characters.
 */
export const MOCK1: BjtItem[] = [
  // ── 場面把握 ──
  item('mock1', 'bamen', 1, {
    material: {
      kind: 'scene',
      vi: 'Quầy lễ tân khách sạn. Một nam nhân viên công ty đứng trước quầy, đang cúi xuống điền vào một tờ phiếu bằng bút bi; chiếc vali kéo đặt sát chân anh. Nữ nhân viên lễ tân đứng sau quầy, hai tay đặt trên mặt quầy chờ đợi; một chiếc thẻ phòng nằm trên quầy giữa hai người.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['フロント係が男性にカードキーを渡しています。', '男性が用紙に記入しています。', '男性がスーツケースを預けています。', 'フロント係が電話で予約を受けています。'],
        1,
        'Người đàn ông đang điền phiếu: 用紙に記入する. Thẻ phòng nằm trên quầy, lễ tân chưa đưa. Vali vẫn ở cạnh chân anh, chưa gửi. Lễ tân không cầm điện thoại.',
      ],
    ],
    points: [
      ['記入する', 'きにゅうする', 'điền vào'],
      ['預ける', 'あずける', 'gửi (đồ)'],
    ],
  }),
  item('mock1', 'bamen', 2, {
    material: {
      kind: 'scene',
      vi: 'Xưởng sản xuất. Băng chuyền đang dừng. Một công nhân đội mũ bảo hộ cúi xuống, cầm kính lúp soi một sản phẩm trên băng chuyền. Người công nhân thứ hai đứng cạnh, cũng đội mũ bảo hộ, đang ghi vào một tờ giấy kẹp trên bảng kẹp hồ sơ.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['ベルトコンベアが動いています。', '二人とも製品を検査しています。', '作業員がヘルメットを脱いでいます。', '一人がルーペで製品を見ています。'],
        3,
        'Một người soi sản phẩm bằng kính lúp (ルーペ), người kia ghi chép. Lựa chọn 2 sai vì chỉ một người kiểm tra, người còn lại đang ghi. Băng chuyền đang dừng, và cả hai vẫn đội mũ.',
      ],
    ],
    points: [
      ['検査する', 'けんさする', 'kiểm tra (chất lượng)'],
      ['記録を取る', 'きろくをとる', 'ghi chép, ghi lại'],
    ],
  }),
  item('mock1', 'bamen', 3, {
    material: {
      kind: 'scene',
      vi: 'Một nữ nhân viên ngồi ở bàn, hai tay ấn chiếc dập ghim xuống góc một xấp tài liệu. Bên cạnh có một chiếc kéo và một bìa kẹp hồ sơ còn trống. Không có máy đục lỗ trên bàn.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['女性が書類をホチキスで留めています。', '女性がはさみで紙を切っています。', '女性が書類をファイルに綴じています。', '女性が書類に穴を開けています。'],
        0,
        'Cô ấy đang dập ghim xấp giấy: ホチキスで留める. Kéo và bìa hồ sơ có trên bàn nhưng không được dùng. Không có máy đục lỗ nên câu 4 sai.',
      ],
    ],
    points: [
      ['留める', 'とめる', 'giữ, kẹp lại (bằng ghim)'],
      ['綴じる', 'とじる', 'đóng (vào bìa, thành tập)'],
    ],
  }),
  item('mock1', 'bamen', 4, {
    material: {
      kind: 'scene',
      vi: 'Nhà ăn nhân viên. Hai người ngồi đối diện nhau, mỗi người một khay cơm đã ăn dở. Một người cầm đũa ở tay phải, tay trái cầm điện thoại thông minh và đang nhìn vào màn hình. Người kia đang ăn. Trên tường có một chiếc tivi đang bật nhưng không ai nhìn.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['二人が料理を注文しています。', '二人がテレビを見ています。', '一人が携帯を見ながら食べています。', '二人が食器を片付けています。'],
        2,
        'Một người vừa ăn vừa nhìn điện thoại: ～ながら食べている. Tivi bật nhưng không ai xem, nên lựa chọn 2 sai. Cơm đã có và đang ăn dở, nên không phải gọi món hay dọn khay.',
      ],
    ],
    points: [
      ['社員食堂', 'しゃいんしょくどう', 'nhà ăn nhân viên'],
      ['片付ける', 'かたづける', 'dọn dẹp'],
    ],
  }),
  item('mock1', 'bamen', 5, {
    material: {
      kind: 'scene',
      vi: 'Nhà ga. Một nam nhân viên mặc vest, tay trái kéo vali, tay phải cầm vé, đang đứng xếp hàng sau ba người khác trước cửa soát vé. Trên cao có bảng điện tử hiện chữ "遅延" cạnh giờ tàu. Anh ta không nhìn lên bảng.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['男性が切符を買っています。', '男性が改札の前で列に並んでいます。', '男性が電光掲示板を指さしています。', '男性が荷物を棚に上げています。'],
        1,
        'Anh ta đứng xếp hàng trước cửa soát vé: 列に並ぶ. Vé đã cầm trong tay, không phải đang mua. Bảng điện tử có trong cảnh nhưng anh không nhìn, càng không chỉ vào.',
      ],
    ],
    points: [
      ['改札', 'かいさつ', 'cửa soát vé'],
      ['電光掲示板', 'でんこうけいじばん', 'bảng điện tử'],
      ['遅延', 'ちえん', 'chậm, trễ (tàu)'],
    ],
  }),

  // ── 発言聴解 ──
  item('mock1', 'hatsugen', 1, {
    script: [['状況', '取引先の人が来社しました。あなたの上司の山田課長は、あと十分ほどで会議から戻ります。何と言いますか。', 'Người của đối tác đến công ty. Cấp trên của bạn là trưởng phòng Yamada khoảng mười phút nữa mới họp xong quay về. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['山田はあと十分ほどでお戻りになります。', '山田はあと十分ほどで戻ってまいります。', '山田はあと十分ほどでお戻りになられます。', '山田はあと十分ほどで戻っていただきます。'],
        1,
        'Nói với người ngoài công ty về cấp trên của mình thì gọi trống tên (山田) và dùng khiêm nhường: 戻ってまいります. Lựa chọn 1 đúng ý nhưng dùng tôn kính ngữ お戻りになる cho người bên mình. Lựa chọn 3 vừa sai hướng vừa là kính ngữ kép. Lựa chọn 4 nghe như mình bắt trưởng phòng quay về.',
      ],
    ],
    points: [
      ['戻ってまいります', 'もどってまいります', 'sẽ quay lại (khiêm nhường, nói về người bên mình)'],
      ['来社', 'らいしゃ', 'đến công ty (khách)'],
    ],
  }),
  item('mock1', 'hatsugen', 2, {
    script: [['状況', '出張の報告書を書き終えました。部長に目を通してほしいです。部長は今、手が空いているようです。何と言いますか。', 'Bạn đã viết xong báo cáo công tác. Bạn muốn trưởng bộ phận đọc qua. Trưởng bộ phận lúc này có vẻ đang rảnh. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['報告書をご確認いただけませんでしょうか。', '報告書をご確認してもらえませんでしょうか。', '報告書を拝見していただけませんでしょうか。', '報告書をご確認いたしませんでしょうか。'],
        0,
        'Việc xem là của trưởng bộ phận, nên dùng ご確認いただく (mình nhận việc người trên làm). Lựa chọn 3 đúng ý nhưng 拝見する là khiêm nhường ngữ, chỉ dùng cho việc mình xem. Lựa chọn 2 dùng ご～する (khiêm nhường) cho hành động của cấp trên. Lựa chọn 4 dùng いたす cho người trên.',
      ],
    ],
    points: [
      ['目を通す', 'めをとおす', 'đọc qua'],
      ['拝見する', 'はいけんする', 'xem (khiêm nhường, việc của mình)'],
    ],
  }),
  item('mock1', 'hatsugen', 3, {
    script: [['状況', '取引先の佐藤さんから電話で質問されましたが、資料が手元にありません。後でこちらからかけ直したいです。何と言いますか。', 'Anh Sato bên đối tác hỏi bạn qua điện thoại, nhưng bạn không có tài liệu trong tay. Bạn muốn lát nữa gọi lại. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['確認して、のちほどお電話をくださいます。', '確認して、のちほどお電話をなさいます。', '確認して、のちほどお電話をいただきます。', '確認して、のちほどお電話を差し上げます。'],
        3,
        'Người gọi lại là mình, nên dùng khiêm nhường お電話を差し上げます. Lựa chọn 2 đúng ý (mình gọi lại) nhưng なさる là tôn kính ngữ, đem dùng cho chính mình. Lựa chọn 1 và 3 biến thành anh Sato gọi cho mình.',
      ],
    ],
    points: [
      ['かけ直す', 'かけなおす', 'gọi lại'],
      ['差し上げる', 'さしあげる', 'biếu, làm cho (khiêm nhường)'],
    ],
  }),
  item('mock1', 'hatsugen', 4, {
    script: [['状況', '取引先の工場を見学しています。案内の担当者に、機械の写真を撮ってもいいか聞きたいです。何と言いますか。', 'Bạn đang tham quan nhà máy của đối tác. Bạn muốn hỏi người hướng dẫn xem có được chụp ảnh máy móc không. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['写真をお撮りになってもよろしいでしょうか。', '写真をお撮りいただいてもよろしいでしょうか。', '写真を撮らせていただいてもよろしいでしょうか。', '写真を撮られてもよろしいでしょうか。'],
        2,
        'Xin phép cho mình làm: 撮らせていただいてもよろしいでしょうか. Lựa chọn 1 đúng ý nhưng お撮りになる là tôn kính ngữ, dùng cho chính mình là sai chủ thể; lựa chọn 4 cũng vậy (撮られる kiểu tôn kính). Lựa chọn 2 thành nhờ người hướng dẫn chụp.',
      ],
    ],
    points: [
      ['見学する', 'けんがくする', 'tham quan (học hỏi)'],
      ['～させていただく', 'させていただく', 'xin phép được làm ~'],
    ],
  }),
  item('mock1', 'hatsugen', 5, {
    script: [['状況', '取引先の部長から、季節のあいさつの品が会社に届きました。電話でその部長にお礼を言います。何と言いますか。', 'Trưởng bộ phận bên đối tác gửi quà theo mùa đến công ty bạn. Bạn gọi điện cảm ơn vị đó. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['結構なお品をさしあげ、ありがとうございました。', '結構なお品を頂戴なさり、ありがとうございました。', '結構なお品をもらわれ、ありがとうございました。', '結構なお品をいただき、ありがとうございました。'],
        3,
        'Mình nhận quà nên dùng khiêm nhường いただき. Lựa chọn 3 đúng ý nhưng もらわれる là thể tôn kính (～れる), đem gắn cho việc nhận của chính mình. Lựa chọn 2 ghép tôn kính なさる vào động từ khiêm nhường 頂戴. Lựa chọn 1 thành mình tặng.',
      ],
    ],
    points: [
      ['結構なお品', 'けっこうなおしな', 'món quà quý (lời cảm ơn)'],
      ['頂戴する', 'ちょうだいする', 'nhận (khiêm nhường)'],
    ],
  }),
  item('mock1', 'hatsugen', 6, {
    script: [['状況', '社内の会議で、部長の説明の最後の部分がよく聞こえませんでした。もう一度言ってほしいです。何と言いますか。', 'Trong cuộc họp nội bộ, bạn nghe không rõ phần cuối lời giải thích của trưởng bộ phận. Bạn muốn ông nói lại. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['もう一度申し上げていただけますか。', 'もう一度おっしゃっていただけますか。', 'もう一度申していただけますか。', 'もう一度お言いになっていただけますか。'],
        1,
        'Người nói là trưởng bộ phận nên dùng tôn kính ngữ おっしゃる + ていただけますか. Lựa chọn 1 đúng ý nhưng 申し上げる là khiêm nhường, dùng cho việc của người trên là sai chủ thể; lựa chọn 3 cũng thế. Lựa chọn 4: 言う có dạng tôn kính riêng là おっしゃる, không nói お言いになる.',
      ],
    ],
    points: [['おっしゃる', 'おっしゃる', 'nói (tôn kính)']],
  }),
  item('mock1', 'hatsugen', 7, {
    script: [['状況', '取引先の担当者に、来週あなたの会社の社長の木村があいさつに行くと伝えます。何と言いますか。', 'Bạn báo với người phụ trách bên đối tác rằng tuần sau giám đốc Kimura của công ty bạn sẽ đến chào. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['来週、社長の木村がごあいさつに伺います。', '来週、社長の木村がごあいさつにいらっしゃいます。', '来週、木村社長がごあいさつに伺います。', '来週、社長の木村がごあいさつにお越しになります。'],
        0,
        'Với người ngoài, giám đốc của mình cũng là "người bên mình": gọi 社長の木村 và dùng khiêm nhường 伺います. Lựa chọn 2 và 4 đúng ý nhưng dùng tôn kính ngữ cho người bên mình. Lựa chọn 3 động từ đúng nhưng gọi 木村社長, tức là tôn chức danh người bên mình trước mặt khách.',
      ],
    ],
    points: [
      ['伺う', 'うかがう', 'đến thăm (khiêm nhường)'],
      ['お越しになる', 'おこしになる', 'đến (tôn kính)'],
    ],
  }),
  item('mock1', 'hatsugen', 8, {
    script: [['状況', '新しく来た派遣社員に会議室の予約方法を教えました。わからないことがあれば聞くように言います。何と言いますか。', 'Bạn vừa chỉ cho nhân viên phái cử mới đến cách đặt phòng họp. Bạn dặn có gì chưa hiểu thì cứ hỏi. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['わからないことがあれば伺ってくださいね。', 'わからないことがあればお聞きしてくださいね。', 'わからないことがあれば聞いてくださいね。', 'わからないことがあれば拝聴してくださいね。'],
        2,
        'Nói với người mới ngang hàng hoặc dưới mình: 聞いてくださいね là vừa đủ lịch sự, thân thiện. Lựa chọn 1 đúng ý nhưng 伺う là khiêm nhường, đem gắn cho việc người kia hỏi; lựa chọn 2 (お聞きする) cũng sai như vậy. Lựa chọn 4: 拝聴 là "kính cẩn nghe", sai cả nghĩa.',
      ],
    ],
    points: [
      ['派遣社員', 'はけんしゃいん', 'nhân viên phái cử'],
      ['伺う', 'うかがう', 'hỏi (khiêm nhường)'],
    ],
  }),
  item('mock1', 'hatsugen', 9, {
    script: [['状況', '取引先の会社に電話をかけました。営業部の鈴木さんがいるかどうか、電話に出た人に聞きます。何と言いますか。', 'Bạn gọi điện đến công ty đối tác. Bạn hỏi người nghe máy xem anh Suzuki phòng kinh doanh có ở đó không. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['営業部の鈴木様はおりますでしょうか。', '営業部の鈴木様はおいでになられますでしょうか。', '営業部の鈴木様はございますでしょうか。', '営業部の鈴木様はいらっしゃいますでしょうか。'],
        3,
        'Hỏi về người của đối tác thì dùng tôn kính いらっしゃいますでしょうか. Lựa chọn 1 đúng ý nhưng おる là khiêm nhường, dùng cho người bên kia là sai chủ thể. Lựa chọn 2 là kính ngữ kép (おいでになる + られる). Lựa chọn 3: ございます dùng cho vật, không cho người.',
      ],
    ],
    points: [['いらっしゃる', 'いらっしゃる', 'có mặt, ở (tôn kính)']],
  }),
  item('mock1', 'hatsugen', 10, {
    script: [['状況', '取引先から値引きを頼まれましたが、上司と相談しないと決められません。その場では返事ができません。何と言いますか。', 'Đối tác đề nghị giảm giá nhưng bạn không thể tự quyết nếu chưa bàn với cấp trên. Bạn không trả lời ngay được. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['社内で検討の上、改めてご連絡なさいます。', '社内で検討の上、改めてご連絡いたします。', '社内で検討の上、改めてご連絡くださいます。', '社内で検討の上、改めてご連絡になります。'],
        1,
        'Mình sẽ liên lạc lại nên dùng khiêm nhường ご連絡いたします; 検討の上 là cách hoãn trả lời lịch sự. Lựa chọn 1 đúng ý nhưng なさる là tôn kính ngữ, dùng cho chính mình là sai chủ thể; lựa chọn 4 (ご～になる) cũng vậy. Lựa chọn 3 thành đối tác liên lạc.',
      ],
    ],
    points: [
      ['検討の上', 'けんとうのうえ', 'sau khi xem xét'],
      ['改めて', 'あらためて', 'lại, vào dịp khác'],
    ],
  }),

  // ── 総合聴解 ──
  item('mock1', 'sogo-chokai', 1, {
    script: [
      ['女', '課長、来月の産業機械展のブースのことで、ご相談があるんですが。', 'Trưởng phòng, em muốn xin ý kiến về gian hàng ở triển lãm máy công nghiệp tháng sau ạ.'],
      ['男', 'うん、どうしたの。', 'Ừ, sao thế?'],
      ['女', '主催者から配置図が届きまして、見てみたら、うちのブース、入口から一番奥になってしまったんです。抽選で決まったそうで…。', 'Ban tổ chức gửi sơ đồ rồi, em xem thì gian của mình bị xếp ở trong cùng, xa lối vào nhất ạ. Nghe nói là bốc thăm…'],
      ['男', '奥か。去年は入口のすぐ近くで、お客さんがけっこう立ち寄ってくれたんだけどなあ。名刺も八十枚以上もらったんだよ。', 'Trong cùng à. Năm ngoái ngay sát lối vào, khách ghé vào khá nhiều. Nhận được hơn tám mươi tấm danh thiếp đấy.'],
      ['女', 'それで、入口の近くに小さいブースが一つ空いているので、そっちに移れないか、主催者に聞いてみようかと思うんですが。', 'Vì thế, gần lối vào còn trống một gian nhỏ, em định hỏi ban tổ chức xem mình có chuyển sang đó được không.'],
      ['男', 'うーん、小さいブースだと、新型の機械が入らないんじゃない？', 'Ừm, gian nhỏ thì cái máy đời mới có vừa không?'],
      ['女', 'あ…、そうですね。幅があと三メートル足りません。', 'À… đúng ạ. Chiều rộng còn thiếu ba mét.'],
      ['男', 'だったら、場所はそのままにして、入口でチラシを配る人を置くほうがいいよ。あと、入口からブースまで案内の看板を出せるかどうか、主催者に確認してみて。', 'Thế thì cứ để chỗ như cũ, đặt người phát tờ rơi ở lối vào thì hơn. Với lại hỏi ban tổ chức xem có được dựng biển chỉ đường từ lối vào đến gian mình không.'],
      ['女', 'わかりました。チラシは、去年のものを少し直せば使えますので、今日中に…。', 'Vâng ạ. Tờ rơi thì sửa lại một chút cái năm ngoái là dùng được, nên trong hôm nay em…'],
      ['男', 'ああ、チラシはあとでいいよ。看板が出せるかどうかで、チラシに載せる地図も変わってくるからね。', 'À, tờ rơi để sau cũng được. Có dựng được biển hay không thì bản đồ in trên tờ rơi cũng khác đi mà.'],
      ['女', 'そうですね。じゃあ、そちらを先に問い合わせます。配る人は、営業部から二人お願いしてみます。', 'Đúng ạ. Vậy em hỏi việc đó trước. Người phát tờ rơi thì em sẽ nhờ phòng kinh doanh hai người.'],
      ['男', 'うん、頼むよ。看板が無理だったら、また別の手を考えよう。', 'Ừ, nhờ em. Nếu không dựng biển được thì mình nghĩ cách khác.'],
    ],
    questions: [
      [
        '女の人はこのあとまず何をしますか。',
        ['ブースを入口近くに移してもらう', '案内表示が出せるか問い合わせる', '去年のチラシを作り直す', 'チラシを配る担当者を決める'],
        1,
        'Trưởng phòng dặn hỏi ban tổ chức có dựng được biển chỉ đường không, và nói tờ rơi để sau vì bản đồ phụ thuộc vào việc đó; chị đáp そちらを先に問い合わせます. Lựa chọn 1 là đề xuất đã bị bác (gian nhỏ không vừa máy). Lựa chọn 3 và 4 là việc làm sau.',
      ],
    ],
    points: [
      ['立ち寄る', 'たちよる', 'ghé vào'],
      ['配置図', 'はいちず', 'sơ đồ bố trí'],
      ['問い合わせる', 'といあわせる', 'hỏi, liên hệ hỏi'],
    ],
  }),
  item('mock1', 'sogo-chokai', 2, {
    script: [
      ['男', '新入社員の皆さん、おはようございます。人事部の小川です。今日から始まる三週間の研修について、簡単にご説明します。', 'Chào các bạn nhân viên mới. Tôi là Ogawa, phòng nhân sự. Tôi xin giải thích ngắn gọn về ba tuần đào tạo bắt đầu từ hôm nay.'],
      ['男', '最初の一週間は、ビジネスマナーと会社の仕組みを学びます。二週目は工場に行って、製品ができるまでの流れを実際に見ていただきます。', 'Tuần đầu, các bạn học phép lịch sự trong kinh doanh và cơ cấu công ty. Tuần thứ hai, các bạn xuống nhà máy để tận mắt xem quy trình làm ra sản phẩm.'],
      ['男', '三週目は、営業部や経理部など、各部署を一日ずつ回っていただきます。各部署では、実際の仕事を少し手伝っていただくこともあります。', 'Tuần thứ ba, các bạn lần lượt đến mỗi bộ phận như kinh doanh, kế toán, mỗi nơi một ngày. Ở mỗi bộ phận, có khi các bạn sẽ phụ một phần công việc thật.'],
      ['男', '去年までは、研修の最後に筆記試験を行って、その点数を配属先に伝えていましたが、今年からやめることにしました。', 'Đến năm ngoái, cuối khoá có bài thi viết và điểm được báo cho bộ phận tiếp nhận, nhưng từ năm nay chúng tôi bỏ.'],
      ['男', '配属されてから本当に大切なのは、覚えた知識の量よりも、わからないことを現場の人に自分から聞けるかどうかだ、ということがわかってきたからです。', 'Vì chúng tôi nhận ra rằng sau khi được phân về bộ phận, điều thật sự quan trọng không phải là lượng kiến thức đã nhớ, mà là có tự mình hỏi người ở hiện trường điều mình chưa biết hay không.'],
      ['男', 'ですから、この三週間で、それぞれの部署に一人ずつ、気軽に相談できる先輩を見つけてください。これが今回の研修の一番の目的です。', 'Vì vậy, trong ba tuần này, hãy tìm ở mỗi bộ phận một anh chị đi trước mà mình có thể thoải mái hỏi han. Đó là mục đích lớn nhất của khoá đào tạo lần này.'],
      ['男', '最終日には、見つけた先輩の名前と、その人から聞いた話を一つ、皆さんの前で発表していただきます。どんな小さな話でも構いません。', 'Ngày cuối, mỗi người sẽ trình bày trước mọi người tên các anh chị mình tìm được và một câu chuyện nghe từ họ. Chuyện nhỏ đến đâu cũng được.'],
      ['男', '研修中に困ったことがあれば、いつでも人事部の私か、担当の中田まで、遠慮なく声をかけてください。', 'Trong thời gian đào tạo có gì khó khăn, cứ thoải mái gọi tôi hoặc anh Nakata phụ trách ở phòng nhân sự bất cứ lúc nào.'],
      ['男', 'では、まず、お手元の名札にお名前を書いてください。', 'Bây giờ, trước hết xin các bạn viết tên vào thẻ tên đang có trên bàn.'],
    ],
    questions: [
      [
        '人事部の人は、新入社員がこの研修で何を目指すように言っていますか。',
        ['筆記試験でよい点を取ること', '製品ができる流れを理解すること', '各部署に相談できる相手を作ること', '研修の内容を人前で発表すること'],
        2,
        'Anh nói thẳng 一番の目的: tìm ở mỗi bộ phận một người đi trước có thể hỏi han, tức là có người để hỏi ở từng nơi. Lựa chọn 1 là cách làm của năm trước, đã bỏ. Lựa chọn 2 chỉ là nội dung tuần hai. Lựa chọn 4 là cách báo cáo kết quả ngày cuối, không phải mục tiêu.',
      ],
    ],
    points: [
      ['配属', 'はいぞく', 'phân công về (bộ phận)'],
      ['筆記試験', 'ひっきしけん', 'thi viết'],
      ['気軽に', 'きがるに', 'thoải mái, không ngại'],
    ],
  }),
  item('mock1', 'sogo-chokai', 3, {
    script: [
      ['女', '先月から、ラインBで、ねじの締め忘れが続いています。今月だけで七件です。', 'Từ tháng trước, dây chuyền B liên tục bị quên siết ốc. Riêng tháng này đã bảy vụ.'],
      ['男1', '七件か。出荷前に見つかっているからまだいいようなものの、このままじゃまずいな。', 'Bảy vụ à. Cũng may là phát hiện trước khi xuất hàng, nhưng cứ thế này thì không ổn.'],
      ['男2', 'あのう、最後の検査の人を一人増やすのはどうでしょうか。', 'Dạ, hay là tăng thêm một người ở khâu kiểm tra cuối ạ?'],
      ['女', '検査を増やしても、見つける数が増えるだけで、締め忘れそのものは減りませんよね。それに、人を増やす予算はもう残っていないんです。', 'Tăng kiểm tra thì chỉ phát hiện được nhiều hơn, còn bản thân việc quên siết thì không giảm. Hơn nữa, ngân sách tăng người cũng không còn.'],
      ['男1', 'うん。原因のほうを何とかしないとな。', 'Ừ. Phải xử lý từ nguyên nhân mới được.'],
      ['男2', 'じゃあ、作業手順書を書き直して、もう一度全員に説明するのは…。', 'Vậy thì viết lại sổ tay quy trình rồi giải thích lại cho mọi người thì…'],
      ['女', '手順書は半年前に直したばかりなんです。それより、調べてみたら、締め忘れはほとんど夕方の時間帯に起きているんですよ。', 'Sổ quy trình mới sửa nửa năm trước thôi. Chuyện quan trọng hơn là, tôi tra thì thấy việc quên siết hầu như xảy ra vào khung giờ chiều tối.'],
      ['男1', '夕方か。疲れが出てくるころだな。', 'Chiều tối à. Lúc người ta bắt đầu mệt nhỉ.'],
      ['女', 'ええ。人の注意に頼るのには限界があります。それで、決められた回数を締めないと次の工程に進めないタイプの工具に替えてはどうかと。一台五万円で、ラインBには六台あります。', 'Vâng. Dựa vào sự chú ý của con người thì có giới hạn. Nên tôi đề xuất đổi sang loại dụng cụ mà chưa siết đủ số lần quy định thì không qua được công đoạn sau. Mỗi cái năm vạn yên, dây chuyền B có sáu cái.'],
      ['男1', '三十万か。それなら今期の設備費で何とかなる。じゃあ、それでいこう。ただ、いきなり全部のラインは無理だから、まずBで試して、効果が出たらほかにも広げよう。', 'Ba mươi vạn à. Thế thì xoay được bằng chi phí thiết bị kỳ này. Vậy làm thế đi. Có điều, đổi hết các dây chuyền ngay thì không được, trước hết thử ở B, có hiệu quả thì mở rộng sang chỗ khác.'],
      ['男2', 'わかりました。じゃあ、工具のメーカーに、いつ届くか確認しておきます。', 'Vâng ạ. Vậy em sẽ hỏi hãng dụng cụ xem khi nào giao được.'],
    ],
    questions: [
      [
        '締め忘れへの対策は、最終的にどうなりましたか。',
        ['最終検査の担当者を増やす', '作業手順書を書き直す', '全ラインの工具を交換する', 'ラインBの工具を交換する'],
        3,
        'Trưởng xưởng chốt đổi dụng cụ, nhưng まずBで試して: trước hết chỉ ở dây chuyền B. Lựa chọn 3 là bước sau, chỉ làm nếu có hiệu quả. Lựa chọn 1 bị bác vì không giảm lỗi và hết ngân sách; lựa chọn 2 bị bác vì sổ quy trình vừa sửa.',
      ],
    ],
    points: [
      ['締め忘れ', 'しめわすれ', 'quên siết (ốc)'],
      ['工程', 'こうてい', 'công đoạn'],
      ['設備費', 'せつびひ', 'chi phí thiết bị'],
    ],
  }),
  item('mock1', 'sogo-chokai', 4, {
    script: [
      ['女', 'もしもし、さくら事務機さんですか。先週の月曜日にコピー用紙を五十箱注文した、北山工業の吉田と申します。', 'A lô, có phải Sakura Jimuki không ạ? Tôi là Yoshida ở Kitayama Kogyo, đã đặt năm mươi thùng giấy photo hôm thứ hai tuần trước.'],
      ['男', 'いつもありがとうございます。担当の中野でございます。', 'Cảm ơn chị luôn ủng hộ. Tôi là Nakano, người phụ trách.'],
      ['女', '今日届くはずだったんですけど、まだ来ていないんです。明日から決算の書類を大量に印刷するので、困っていまして。', 'Đáng lẽ hôm nay phải đến mà vẫn chưa thấy. Từ mai bên tôi in rất nhiều tài liệu quyết toán nên đang rất khó xử.'],
      ['男', '大変申し訳ございません。すぐにお調べいたします。…お待たせいたしました。運送会社の倉庫で配達が一日遅れておりまして、明日の午後のお届けになるようです。', 'Thành thật xin lỗi chị. Tôi kiểm tra ngay ạ. … Xin lỗi đã để chị chờ. Kho của công ty vận chuyển giao trễ một ngày, nên có lẽ chiều mai mới đến nơi ạ.'],
      ['女', '午後ですか…。印刷は朝から始めるので、それだとちょっと…。', 'Chiều à… Bên tôi in từ sáng, nên như vậy thì hơi…'],
      ['男', '念のため、ご注文の内容を確認させていただけますか。A4のコピー用紙を五十箱で、お間違いないでしょうか。', 'Để cho chắc, cho phép tôi xác nhận lại đơn hàng ạ. Giấy photo A4, năm mươi thùng, đúng không ạ?'],
      ['女', 'はい、そうです。', 'Vâng, đúng rồi.'],
      ['男', 'でしたら、本日中に、私が近くの営業所から十箱だけお持ちするというのはいかがでしょうか。残りの四十箱は明日の午後にお届けいたします。', 'Nếu vậy, trong hôm nay tôi mang trước mười thùng từ văn phòng chi nhánh gần đó đến, chị thấy thế nào ạ? Bốn mươi thùng còn lại sẽ giao vào chiều mai.'],
      ['女', '十箱あれば、午前中は何とかなります。助かります。', 'Có mười thùng thì buổi sáng xoay được. Vậy thì đỡ quá.'],
      ['男', 'かしこまりました。ただ、営業所に十箱残っているかどうか、まだわかりませんので、これから確かめまして、何時ごろ伺えるか、三十分以内にお電話いたします。', 'Vâng ạ. Có điều, tôi chưa biết văn phòng chi nhánh còn đủ mười thùng không, nên tôi sẽ kiểm tra ngay, rồi trong vòng ba mươi phút sẽ gọi báo chị khoảng mấy giờ tôi đến được.'],
      ['女', 'わかりました。じゃあ、お電話お待ちしています。よろしくお願いします。', 'Vâng. Vậy tôi chờ điện thoại của anh. Nhờ anh nhé.'],
    ],
    questions: [
      [
        '男の人はこのあとまず何をしますか。',
        ['営業所の在庫を調べる', '十箱を北山工業に届ける', '残りの四十箱を手配する', '配達の遅れの原因を調べる'],
        0,
        'Anh nói 営業所に十箱残っているかどうか…これから確かめまして: việc đầu tiên là kiểm tra hàng tồn ở chi nhánh. Lựa chọn 2 là bước sau, phải biết còn hàng và gọi báo giờ trước đã. Lựa chọn 4 đã làm xong trong cuộc gọi. Lựa chọn 3 để chiều mai giao như cũ.',
      ],
    ],
    points: [
      ['決算', 'けっさん', 'quyết toán'],
      ['営業所', 'えいぎょうしょ', 'văn phòng chi nhánh (kinh doanh)'],
      ['在庫', 'ざいこ', 'hàng tồn kho'],
    ],
  }),
  item('mock1', 'sogo-chokai', 5, {
    script: [
      ['女', 'もしもし、ミドリ食品営業部の川口でございます。東西物産の森様の携帯電話でよろしかったでしょうか。いつも大変お世話になっております。', 'A lô, tôi là Kawaguchi, phòng kinh doanh Midori Shokuhin. Đây có phải số di động của anh Mori ở Tozai Bussan không ạ? Cảm ơn anh luôn giúp đỡ.'],
      ['女', '先日はお忙しいところ、ご丁寧にありがとうございました。来週火曜日の午後二時からお願いしておりました、新商品の打ち合わせの件でお電話いたしました。', 'Hôm trước cảm ơn anh đã tiếp đón chu đáo dù đang bận. Tôi gọi về buổi họp bàn sản phẩm mới đã hẹn từ hai giờ chiều thứ ba tuần sau ạ.'],
      ['女', '実は、弊社の工場長も同席できることになりまして、その分、少しお時間を長めにいただけないかと思いまして…。二時からではなく、一時半から始めていただくことは可能でしょうか。工場長はその日、夕方の新幹線で大阪に戻る予定でございまして。', 'Chuyện là xưởng trưởng bên tôi cũng có thể cùng dự, nên tôi muốn xin thêm chút thời gian… Liệu có thể bắt đầu từ một giờ rưỡi thay vì hai giờ được không ạ? Hôm đó xưởng trưởng định đi Shinkansen buổi chiều tối về Osaka.'],
      ['女', 'それから、工場長が試作品を三種類お持ちしたいと申しておりまして、温めてお出ししたいので、もし会議室の近くにお湯が使える場所があれば助かります。こちらは当日伺ったときに教えていただければ結構です。試作品の資料は、前日までにメールでお送りいたします。', 'Ngoài ra, xưởng trưởng muốn mang theo ba loại sản phẩm thử, và muốn hâm nóng để mời, nên nếu gần phòng họp có chỗ dùng nước nóng thì tốt quá. Việc này hôm đó đến nơi anh chỉ cho cũng được ạ. Tài liệu về sản phẩm thử, tôi sẽ gửi email trước một ngày.'],
      ['女', 'お忙しいところ恐縮ですが、時間の件だけ、明日の夕方までにお返事をいただけますでしょうか。私の携帯の番号は、このあとメールでお送りいたします。', 'Xin lỗi làm phiền lúc anh bận, nhưng riêng việc thời gian, anh có thể trả lời tôi trước chiều tối mai được không ạ? Số di động của tôi, lát nữa tôi sẽ gửi qua email.'],
      ['女', '突然のお願いで申し訳ございません。それでは、失礼いたします。', 'Xin lỗi vì đề nghị đột ngột. Vậy tôi xin phép ạ.'],
    ],
    questions: [
      [
        'この留守番電話を聞いた人は、まず何をしなければなりませんか。',
        ['工場長に同席をお願いする', 'お湯が使える部屋を予約する', '開始を早められるか返事する', '川口さんに電話番号を送る'],
        2,
        'Việc có hạn là trả lời có dời giờ bắt đầu lên 1 giờ rưỡi được không, hạn chiều tối mai (時間の件だけ…明日の夕方までに). Lựa chọn 2: chỗ dùng nước nóng thì hôm đó chỉ cũng được. Lựa chọn 4 ngược chiều: chị Kawaguchi gửi số của mình. Lựa chọn 1 là việc phía bên kia đã tự sắp xếp.',
      ],
    ],
    points: [
      ['同席する', 'どうせきする', 'cùng dự (cuộc họp)'],
      ['試作品', 'しさくひん', 'sản phẩm thử'],
      ['恐縮ですが', 'きょうしゅくですが', 'xin lỗi đã làm phiền, nhưng…'],
    ],
  }),
  item('mock1', 'sogo-chokai', 6, {
    script: [
      ['女', '部長、昨日の中途採用の最終面接ですが、お二人のうち、どちらにいたしましょうか。', 'Thưa trưởng bộ phận, về buổi phỏng vấn cuối tuyển người có kinh nghiệm hôm qua, mình chọn ai trong hai người ạ?'],
      ['男', 'うーん、経歴だけ見れば、大西さんだね。同じ業界で十年、資格もずいぶん持っている。', 'Ừm, chỉ xét lý lịch thì là anh Onishi. Mười năm cùng ngành, bằng cấp cũng nhiều.'],
      ['女', 'ええ。受け答えもしっかりしていて、すぐに現場を任せられそうでした。前の会社では、八人のチームをまとめていたそうです。', 'Vâng. Trả lời cũng chắc chắn, có vẻ giao việc ở hiện trường ngay được. Nghe nói ở công ty cũ anh ấy quản lý một nhóm tám người.'],
      ['男', 'うん、それは魅力なんだけどね。', 'Ừ, cái đó thì hấp dẫn đấy.'],
      ['男', 'ただね、話を聞いていると、前の会社のやり方をそのまま持ち込みそうな感じがしたんだよ。「前の会社ではこうでした」って、何度も言っていたでしょう。', 'Có điều, nghe anh ấy nói thì tôi có cảm giác anh ấy sẽ mang nguyên cách làm của công ty cũ vào. Cứ "ở công ty trước thì thế này" mấy lần, đúng không?'],
      ['女', 'そうでしたね。もう一人の村上さんは、経験は三年ですし、面接では少し緊張していたようでしたが…。', 'Đúng vậy ạ. Người kia là chị Murakami, kinh nghiệm mới ba năm, lúc phỏng vấn lại có vẻ hơi căng thẳng…'],
      ['男', '村上さんは、うちの製品を自分で使ってみて、わからないところを逆にこっちに質問してきたよね。ああいう人は伸びるよ。うちみたいな小さい会社は、決まったやり方を持ってる人より、新しいことをどんどん吸収してくれる人がほしいんだ。', 'Chị Murakami đã tự dùng thử sản phẩm của mình, rồi chỗ nào chưa hiểu thì hỏi ngược lại mình. Người như thế sẽ tiến bộ. Công ty nhỏ như mình cần người tiếp thu cái mới liên tục hơn là người đã có sẵn cách làm cố định.'],
      ['女', '希望の給与も、村上さんのほうが低いですね。', 'Mức lương mong muốn cũng là chị Murakami thấp hơn ạ.'],
      ['男', 'それはまあ、二の次だよ。緊張なんて、慣れればなくなる。じゃあ、村上さんで進めてくれる？', 'Cái đó thì để sau. Căng thẳng thì quen rồi sẽ hết. Vậy chị tiến hành với chị Murakami nhé?'],
      ['女', 'かしこまりました。では、村上さんに内定のご連絡をして、大西さんには丁寧にお断りのメールをお送りします。', 'Vâng ạ. Vậy tôi sẽ báo chị Murakami là được nhận, còn anh Onishi thì gửi email từ chối một cách lịch sự.'],
    ],
    questions: [
      [
        '部長が採用で一番重視していることは何ですか。',
        ['同じ業界での経験が長いこと', '自分から学ぼうとする姿勢', 'すぐに現場を任せられること', '希望する給与が低いこと'],
        1,
        'Trưởng bộ phận chọn chị Murakami vì tự tìm hiểu, chủ động hỏi: 新しいことをどんどん吸収してくれる人がほしい. Lựa chọn 1 là điểm mạnh của anh Onishi mà ông không coi trọng bằng. Lựa chọn 3 là nhận xét của người phụ nữ. Lựa chọn 4 ông nói rõ là 二の次.',
      ],
    ],
    points: [
      ['中途採用', 'ちゅうとさいよう', 'tuyển người có kinh nghiệm'],
      ['吸収する', 'きゅうしゅうする', 'tiếp thu'],
      ['二の次', 'にのつぎ', 'thứ yếu, để sau'],
    ],
  }),
  item('mock1', 'sogo-chokai', 7, {
    script: [
      ['女', 'お疲れさまです。本部営業企画の高橋です。店長、本部から、来月から入口の棚を全部季節の商品に替えるように、という指示が出ているんですが。', 'Chào anh, tôi là Takahashi, phòng kế hoạch kinh doanh của trụ sở. Cửa hàng trưởng, trụ sở có chỉ thị từ tháng sau đổi toàn bộ kệ ở lối vào sang hàng theo mùa ạ.'],
      ['男', 'ああ、聞いてます。ただ、うちの店は、近くの病院に通う年配のお客様が多くてね。朝の九時台なんて、ほとんどがそういうお客様です。入口の棚には、毎日買っていく牛乳やパンを置いているんですよ。', 'À, tôi có nghe. Có điều, cửa hàng mình nhiều khách lớn tuổi đi khám ở bệnh viện gần đây. Khung chín giờ sáng thì gần như toàn những vị khách như thế. Kệ lối vào tôi để sữa, bánh mì là thứ ngày nào họ cũng mua.'],
      ['女', 'でも、季節の商品は利益率が高いので、売上全体で見ると、かなり違ってきますよ。', 'Nhưng hàng theo mùa có tỉ suất lợi nhuận cao, nhìn tổng doanh thu thì khác nhau khá nhiều đấy ạ.'],
      ['男', 'それはわかります。でも、入口で欲しいものがすぐ見つからないと、年配の方は奥まで歩かないで帰ってしまうんです。前に一度、棚を替えたら、常連さんから「どこにあるかわからない」って何度も言われましてね。', 'Cái đó tôi hiểu. Nhưng ở lối vào mà không thấy ngay thứ cần mua thì người lớn tuổi không đi vào trong mà về luôn. Trước có lần đổi kệ, khách quen than mãi "không biết để đâu".'],
      ['女', 'でも、本部の方針ですので、まったく替えないというわけには…。', 'Nhưng đây là chủ trương của trụ sở, nên hoàn toàn không đổi thì…'],
      ['男', 'ええ、それもわかっています。', 'Vâng, cái đó tôi cũng hiểu.'],
      ['女', 'そうでしたか…。じゃあ、入口の棚は今のままにして、レジの横に季節の商品の小さい棚を置くのはどうでしょう。本部には私から説明します。', 'Vậy ạ… Thế thì giữ nguyên kệ lối vào, đặt một kệ nhỏ hàng theo mùa cạnh quầy thu ngân thì sao ạ? Phía trụ sở để tôi giải thích.'],
      ['男', 'レジの横なら、並んでいる間に見てもらえますね。それならやってみましょう。', 'Cạnh quầy thu ngân thì khách xem được trong lúc xếp hàng. Thế thì làm thử đi.'],
      ['女', 'はい。まずは一か月やってみて、売上を見てみましょう。', 'Vâng. Trước hết làm thử một tháng rồi xem doanh thu nhé.'],
    ],
    questions: [
      [
        '店長が一番大切にしていることは何ですか。',
        ['常連客が買い物しやすいこと', '季節の商品を多く売ること', '本部の指示どおりにすること', 'レジの待ち時間を短くすること'],
        0,
        'Cửa hàng trưởng giữ kệ lối vào vì khách lớn tuổi quen mua sữa, bánh mì; đổi kệ thì họ không tìm thấy và bỏ về. Điều ông giữ là sự tiện lợi của khách quen. Lựa chọn 2 là lập luận của người từ trụ sở. Lựa chọn 4: quầy thu ngân chỉ là nơi đặt kệ mới, không ai bàn chuyện thời gian chờ.',
      ],
    ],
    points: [
      ['常連客', 'じょうれんきゃく', 'khách quen'],
      ['利益率', 'りえきりつ', 'tỉ suất lợi nhuận'],
      ['年配', 'ねんぱい', 'lớn tuổi'],
    ],
  }),
  item('mock1', 'sogo-chokai', 8, {
    script: [
      ['男', '課長、先週の出張の報告書なんですが、見ていただけましたか。部長にお出しする前に、一度見ていただきたくて。', 'Chị trưởng phòng, báo cáo chuyến công tác tuần trước của em, chị đã xem chưa ạ? Em muốn chị xem một lượt trước khi nộp trưởng bộ phận.'],
      ['女', 'ええ。それはいい心がけね。よく書けてるわよ。訪問した五社の反応も、表にまとめてあって見やすいし。', 'Ừ. Thế là tốt đấy. Viết cũng tốt. Phản ứng của năm công ty đến thăm cũng tóm thành bảng, dễ nhìn.'],
      ['男', 'ありがとうございます。写真ももう少し入れたほうがいいでしょうか。', 'Cảm ơn chị. Em có nên thêm ảnh nữa không ạ?'],
      ['女', '写真は今のままで十分。それより気になったのは最後のところ。「今後、検討が必要と思われる」で終わってるでしょう。', 'Ảnh thế là đủ rồi. Cái chị để ý là phần cuối. Em kết thúc bằng "có lẽ cần xem xét trong thời gian tới", đúng không?'],
      ['男', 'はい。', 'Vâng.'],
      ['女', '読んだ部長は、「で、どうしたいの？」って思うんじゃないかな。報告書は、何があったかだけじゃなくて、書いた人が次にどうしたいかまであって、初めて役に立つのよ。部長は毎日たくさん報告書を読むから、最後の数行で判断することが多いの。', 'Trưởng bộ phận đọc chắc sẽ nghĩ "thế rốt cuộc muốn làm gì?". Báo cáo phải có không chỉ chuyện gì đã xảy ra mà cả việc người viết muốn làm gì tiếp, thì mới có ích. Trưởng bộ phận ngày nào cũng đọc rất nhiều báo cáo, nên hay quyết định dựa vào mấy dòng cuối.'],
      ['男', 'なるほど…。実は、二社からは見積もりを出してほしいと言われていて、来週中には出したいと思っていたんです。一社は、来月の予算会議に間に合わせたいそうなので。', 'Ra vậy… Thật ra có hai công ty bảo muốn em gửi báo giá, em định gửi trong tuần sau ạ. Vì một công ty muốn kịp cuộc họp ngân sách tháng sau.'],
      ['女', 'それよ。それをそのまま書けばいいの。いつまでに何をするか、ね。表のほうは触らなくていいから。', 'Đấy. Cứ thế mà viết vào. Đến khi nào làm gì, nhé. Phần bảng thì không cần động vào.'],
      ['男', 'わかりました。すぐ直して、今日の午後、もう一度お持ちします。', 'Vâng. Em sửa ngay rồi chiều nay mang lại chị ạ.'],
      ['女', 'ええ、待ってるわ。', 'Ừ, chị đợi.'],
    ],
    questions: [
      [
        '男の人は報告書のどこを直しますか。',
        ['五社の反応をまとめた表', '最後のまとめの書き方', '報告書に入れる写真の数', '見積もりの金額の書き方'],
        1,
        'Trưởng phòng chỉ ra phần kết "今後、検討が必要と思われる" quá mơ hồ, phải viết rõ mình muốn làm gì tiếp (gửi báo giá trong tuần sau). Lựa chọn 1: bảng được khen, 触らなくていい. Lựa chọn 3: ảnh 今のままで十分. Lựa chọn 4: số tiền báo giá không được nhắc.',
      ],
    ],
    points: [
      ['報告書', 'ほうこくしょ', 'báo cáo'],
      ['見積もり', 'みつもり', 'báo giá'],
    ],
  }),
  item('mock1', 'sogo-chokai', 9, {
    script: [
      ['男', '情報システム部の石田です。来月から使っていただく、経費精算の新しいシステムについてご説明します。', 'Tôi là Ishida, phòng hệ thống thông tin. Tôi xin giới thiệu hệ thống thanh toán chi phí mới mà mọi người sẽ dùng từ tháng sau.'],
      ['男', 'これまでは、領収書を紙に貼って、上司の印鑑をもらってから経理部に提出していただいていました。新しいシステムでは、領収書をスマートフォンで撮影するだけで申請ができます。', 'Trước giờ mọi người dán hoá đơn lên giấy, xin con dấu của cấp trên rồi nộp phòng kế toán. Với hệ thống mới, chỉ cần chụp hoá đơn bằng điện thoại là đăng ký được.'],
      ['男', '上司の方の承認もスマートフォンでできますので、出張中でもすぐに承認していただけます。なお、一万円を超える場合は、これまでどおり部長の承認も必要です。', 'Cấp trên cũng duyệt được bằng điện thoại, nên dù đang công tác cũng duyệt ngay được. Lưu ý, khoản trên một vạn yên thì vẫn như trước, cần cả trưởng bộ phận duyệt.'],
      ['男', '皆さんからは、領収書を貼る手間がなくなって楽だ、という声をいただいていますが、会社として一番大きいと考えているのは、精算にかかる日数です。', 'Mọi người nói rằng đỡ mất công dán hoá đơn nên nhẹ nhàng hơn, nhưng điều công ty coi là lớn nhất là số ngày để thanh toán.'],
      ['男', 'これまで申請から支払いまで平均三週間かかっていましたが、新しいシステムでは五日ほどになります。つまり、皆さんが立て替えたお金が、ずっと早く戻ってくるということです。', 'Trước đây từ lúc đăng ký đến lúc chi trả trung bình mất ba tuần, với hệ thống mới thì còn khoảng năm ngày. Tức là tiền mọi người ứng trước sẽ được hoàn lại nhanh hơn nhiều.'],
      ['男', 'なお、紙の領収書は法律で七年間の保管が決められていますので、撮影したあとも捨てずに、月末にまとめて経理部へ提出してください。', 'Lưu ý, hoá đơn giấy theo luật phải lưu bảy năm, nên sau khi chụp đừng bỏ đi, cuối tháng gom lại nộp phòng kế toán.'],
      ['男', '操作の説明会は来週の水曜日に開きます。出られない方のために、録画を社内サイトに載せる予定です。', 'Buổi hướng dẫn thao tác sẽ tổ chức vào thứ tư tuần sau. Với người không dự được, chúng tôi dự định đăng video ghi hình lên trang nội bộ.'],
    ],
    questions: [
      [
        '説明している人は、新しいシステムの一番の利点は何だと言っていますか。',
        ['領収書を貼る手間がなくなること', '出張中でも承認ができること', '立て替えたお金が早く戻ること', '紙の領収書を捨てられること'],
        2,
        'Anh nói 会社として一番大きい là số ngày thanh toán rút từ ba tuần xuống năm ngày, tức tiền ứng trước về nhanh. Lựa chọn 1 là ý kiến của nhân viên, không phải điều anh coi là lớn nhất. Lựa chọn 2 là lợi ích phụ. Lựa chọn 4 sai: hoá đơn giấy vẫn phải lưu bảy năm.',
      ],
    ],
    points: [
      ['経費精算', 'けいひせいさん', 'thanh toán chi phí'],
      ['立て替える', 'たてかえる', 'ứng trước (tiền)'],
      ['領収書', 'りょうしゅうしょ', 'hoá đơn, biên lai'],
    ],
  }),
  item('mock1', 'sogo-chokai', 10, {
    script: [
      ['女1', '新人の歓迎会ですけど、いつもの居酒屋で、金曜日の夜七時からでいいですか。', 'Tiệc chào mừng người mới, ở quán nhậu quen, từ bảy giờ tối thứ sáu được không ạ?'],
      ['男', 'うん。…あ、でも、今年の新人の一人は、お酒が飲めないって言ってたな。', 'Ừ. … À, nhưng một bạn mới năm nay bảo không uống được rượu.'],
      ['女2', 'それに、金曜の夜は、子どものお迎えがある人が三人いるんですよ。去年も途中で帰っていましたよね。せっかくの歓迎会なのに。', 'Với lại tối thứ sáu có ba người phải đi đón con. Năm ngoái cũng về giữa chừng đấy ạ. Tiệc chào mừng mà tiếc thật.'],
      ['女1', 'そうでしたね…。じゃあ、お昼にしますか。会社の近くのイタリアンなら、ランチで貸し切りにできます。', 'Đúng rồi… Vậy làm buổi trưa nhé? Quán Ý gần công ty cho thuê trọn quán buổi trưa được.'],
      ['女2', 'あそこなら、お酒以外の飲み物も多いですしね。', 'Quán đó đồ uống không cồn cũng nhiều nữa.'],
      ['男', '昼か。でも、料理が出てくるのにも時間がかかるし、昼休みの一時間だと、自己紹介だけで終わっちゃうんじゃない？', 'Buổi trưa à. Nhưng đồ ăn lên cũng mất thời gian, nghỉ trưa có một tiếng thì giới thiệu bản thân xong là hết giờ còn gì?'],
      ['女2', '部長に相談して、その日だけ昼休みを二時間にしてもらうのはどうでしょう。', 'Hay mình xin trưởng bộ phận cho riêng hôm đó nghỉ trưa hai tiếng ạ?'],
      ['男', '二時間はさすがに難しいだろうけど、一時間半なら、私からお願いしてみるよ。', 'Hai tiếng thì chắc khó, nhưng một tiếng rưỡi thì để tôi xin thử.'],
      ['女1', 'ありがとうございます。じゃあ、お店にも一時間半で予約できるか聞いてみます。日にちは金曜日のままでいいですか。', 'Cảm ơn anh. Vậy em hỏi quán xem đặt một tiếng rưỡi được không. Ngày thì vẫn thứ sáu ạ?'],
      ['男', 'いや、金曜は月末で経理の締めがあるから、前の日の木曜にしよう。', 'Không, thứ sáu là cuối tháng, có chốt sổ kế toán, nên làm hôm trước đó, thứ năm đi.'],
      ['女1', 'わかりました。木曜で押さえておきます。新人の二人にも伝えておきますね。', 'Vâng ạ. Em sẽ giữ chỗ ngày thứ năm. Em cũng báo cho hai bạn mới luôn.'],
      ['男', 'うん。部長の返事が来たら、すぐ知らせるよ。', 'Ừ. Có trả lời của trưởng bộ phận là tôi báo ngay.'],
    ],
    questions: [
      [
        '歓迎会はどのように開く予定になりましたか。',
        ['木曜日の昼に一時間半で開く', '金曜日の夜に居酒屋で開く', '金曜日の昼に二時間で開く', '木曜日の夜にイタリアンで開く'],
        0,
        'Buổi tối bị loại (người không uống rượu, người đón con), chuyển sang trưa ở quán Ý; hai tiếng thì khó nên xin một tiếng rưỡi; thứ sáu bận chốt sổ nên đổi sang thứ năm. Lựa chọn 2 là phương án ban đầu. Lựa chọn 3 lấy giờ đã bị bác (hai tiếng) và ngày đã bị đổi.',
      ],
    ],
    points: [
      ['貸し切り', 'かしきり', 'thuê trọn (quán, xe)'],
      ['締め', 'しめ', 'chốt sổ, khoá sổ'],
      ['押さえる', 'おさえる', 'giữ chỗ, đặt trước'],
    ],
  }),
];

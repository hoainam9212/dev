import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/** Week 6 — internal documents, rules and announcements. Level: J1. */
export const W06: BjtItem[] = [
  item('w06', 'bamen', 1, {
    material: {
      kind: 'scene',
      vi: 'Hành lang văn phòng, trước một bảng thông báo bằng bần. Một nữ nhân viên đang dùng đinh ghim gắn một tờ thông báo mới lên bảng. Một nam nhân viên đứng cạnh, đang đọc một tờ thông báo khác đã có sẵn trên bảng.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['男性が掲示物をはがしています。', '女性が掲示板の前で写真を撮っています。', '二人でポスターを貼っています。', '女性が掲示板にお知らせを貼っています。'],
        3,
        'Người phụ nữ đang ghim tờ thông báo lên bảng: 貼る. Người đàn ông chỉ đọc, không gỡ (はがす) cũng không cùng dán, nên câu 1 và 3 sai. Không ai chụp ảnh.',
      ],
    ],
    points: [
      ['掲示板', 'けいじばん', 'bảng thông báo'],
      ['はがす', 'はがす', 'bóc, gỡ ra'],
    ],
  }),
  item('w06', 'bamen', 2, {
    material: {
      kind: 'scene',
      vi: 'Một nam nhân viên đứng cạnh tủ hồ sơ bằng thép, ngăn kéo thứ hai đang mở. Anh ta đang đặt một tập hồ sơ vào trong ngăn kéo. Trên nóc tủ có một hộp lưu trữ đã dán nhãn "保存期間：5年". Chìa khoá vẫn cắm ở ngăn trên cùng.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['男性がファイルを取り出しています。', '男性が書類をキャビネットにしまっています。', '男性がキャビネットに鍵をかけています。', '男性が箱にラベルを貼っています。'],
        1,
        'Anh ta đang cất hồ sơ vào ngăn kéo: しまう. Câu 1 ngược chiều. Chìa khoá cắm sẵn nhưng anh không khoá. Nhãn trên hộp đã dán từ trước.',
      ],
    ],
    points: [
      ['しまう', 'しまう', 'cất vào'],
      ['保存期間', 'ほぞんきかん', 'thời hạn lưu trữ'],
    ],
  }),
  item('w06', 'hatsugen', 1, {
    script: [
      ['状況', '同僚が、先月変わった社内規程を知らずに、古いやり方で経費の申請をしようとしています。何と言いますか。', 'Một đồng nghiệp không biết quy định nội bộ đã đổi từ tháng trước, đang định nộp đề nghị thanh toán chi phí theo cách cũ. Bạn nói gì?'],
    ],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        [
          'あ、その申請のしかた、先月から変わったんですよ。今はシステムから出すことになっていて。',
          'そのやり方は間違っています。規程をちゃんと読んでください。',
          '経理部に言っておきますね。',
          'まあ、どちらでもいいんじゃないですか。',
        ],
        0,
        'Báo nhẹ nhàng rằng cách làm đã đổi và nói cách mới. Câu 2 đúng nội dung nhưng trách móc. Câu 3 báo phòng kế toán thay vì nói với chính người đó. Câu 4 sai sự thật vì quy định đã đổi.',
      ],
    ],
    points: [
      ['規程', 'きてい', 'quy định (nội bộ)'],
      ['経費', 'けいひ', 'chi phí, kinh phí'],
      ['申請', 'しんせい', 'đơn đề nghị, xin'],
    ],
  }),
  item('w06', 'hatsugen', 2, {
    script: [
      ['状況', '社内向けの通知メールを、間違えて取引先にも送ってしまいました。すぐに課長に報告します。何と言いますか。', 'Bạn lỡ gửi email thông báo nội bộ cho cả một đối tác. Bạn báo ngay cho trưởng phòng. Bạn nói gì?'],
    ],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        [
          '大したことではないと思いますが、一応お伝えしておきます。',
          '社外の方にメールが届いたようですが、原因はわかりません。',
          '課長、すみません。メールを誤送信しましたが、もう削除しましたので大丈夫です。',
          '課長、至急ご報告があります。社内向けの通知メールを、誤って取引先一社に送ってしまいました。先方へのご連絡について、ご指示いただけますか。',
        ],
        3,
        'Báo việc xấu: nói ngay là khẩn, kể sự việc cụ thể (gửi nhầm cho một đối tác), rồi xin chỉ thị. Câu 1 xem nhẹ. Câu 2 nói như việc của người khác. Câu 3: email đã gửi thì xoá bên mình cũng không thu hồi được, "không sao" là sai.',
      ],
    ],
    points: [
      ['誤送信', 'ごそうしん', 'gửi nhầm'],
      ['ご指示', 'ごしじ', 'chỉ thị (của cấp trên)'],
    ],
  }),
  item('w06', 'hatsugen', 3, {
    script: [
      ['状況', '掲示板のお知らせの内容がよくわかりません。担当の総務部に電話で聞きます。何と言いますか。', 'Bạn không hiểu rõ nội dung thông báo trên bảng. Bạn gọi điện hỏi phòng hành chính phụ trách. Bạn nói gì?'],
    ],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        [
          'お知らせの意味がわからないんですけど、どういうことですか。',
          'お忙しいところ恐れ入ります。営業部の田中です。掲示板の駐車場についてのお知らせで、一点確認させていただきたいのですが。',
          '総務部さん、お知らせはもっとわかりやすく書いてください。',
          '掲示板のお知らせを拝見になりましたが、よくわかりませんでした。',
        ],
        1,
        'Gọi nội bộ thì xưng phòng và tên, nói rõ hỏi về thông báo nào (bãi đỗ xe) và hỏi một điểm. Câu 1 cộc lốc, không xưng tên. Câu 3 phàn nàn. Câu 4 sai kính ngữ: 拝見 không đi với ～になる.',
      ],
    ],
    points: [
      ['確認させていただく', 'かくにんさせていただく', 'cho phép tôi xác nhận'],
      ['一点', 'いってん', 'một điểm'],
    ],
  }),
  item('w06', 'hatsugen', 4, {
    script: [
      ['状況', '新しい社内ルールについて、部下から「このルール、意味あるんですか」と不満を言われました。何と言いますか。', 'Một nhân viên cấp dưới phàn nàn về quy định nội bộ mới: "Quy định này có ý nghĩa gì không?" Bạn nói gì?'],
    ],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        [
          'そうだね、意味ないよね。守らなくていいよ。',
          '文句を言わないで、決まったことはやりなさい。',
          '気持ちはわかるよ。ただ、情報漏れを防ぐためのルールだから、まずは一か月やってみて、問題があれば一緒に提案しよう。',
          'それは総務部に聞いてください。私は知りません。',
        ],
        2,
        'Người quản lý nên đồng cảm, giải thích mục đích (chống rò rỉ thông tin) và mở đường góp ý đúng cách. Câu 1 cho phép phá quy định. Câu 2 áp đặt. Câu 4 đùn đẩy trách nhiệm.',
      ],
    ],
    points: [
      ['情報漏れ', 'じょうほうもれ', 'rò rỉ thông tin'],
      ['提案する', 'ていあんする', 'đề xuất'],
    ],
  }),
  item('w06', 'sogo-chokai', 1, {
    script: [
      ['女', '総務部からお知らせします。明日の午前十時から、避難訓練を行います。', 'Phòng hành chính xin thông báo. Từ mười giờ sáng mai sẽ tổ chức diễn tập sơ tán.'],
      ['女', '十時に非常ベルが鳴りましたら、作業を中断して、近くの非常階段から一階の駐車場にお集まりください。エレベーターは使用できません。', 'Khi chuông báo động reo lúc mười giờ, xin dừng công việc, theo cầu thang thoát hiểm gần nhất xuống bãi đỗ xe tầng một. Không được dùng thang máy.'],
      ['女', 'なお、四階の東階段は現在工事中のため、四階の方は反対側の西階段をご利用ください。', 'Ngoài ra, cầu thang phía đông tầng bốn đang thi công, nên người ở tầng bốn xin dùng cầu thang phía tây ở phía đối diện.'],
      ['女', '訓練は三十分ほどで終わる予定です。来客のご予定がある方は、十時半以降にしていただくよう、お願いいたします。', 'Buổi diễn tập dự kiến kết thúc sau khoảng ba mươi phút. Ai có hẹn khách, xin xếp từ mười giờ rưỡi trở đi.'],
    ],
    questions: [
      [
        '非常ベルが鳴ったら、まず何をしますか。',
        ['作業をやめて、非常階段で駐車場に行く', 'エレベーターで一階に下りる', '総務部に連絡する', '来客を駐車場に案内する'],
        0,
        'Dừng việc (中断して) và xuống bãi đỗ xe bằng cầu thang thoát hiểm. Thang máy bị cấm. Chuyện khách chỉ là nhờ hẹn khách sau 10 giờ 30, không phải dẫn khách đi.',
      ],
      [
        '四階で働く人はどうしますか。',
        ['エレベーターを使う', '東階段を使う', '訓練には参加しない', '西階段を使う'],
        3,
        'Cầu thang đông tầng bốn đang thi công, nên người tầng bốn dùng cầu thang tây. Cầu thang đông là bẫy: nó được nhắc tới nhưng đang bị đóng.',
      ],
    ],
    points: [
      ['避難訓練', 'ひなんくんれん', 'diễn tập sơ tán'],
      ['中断する', 'ちゅうだんする', 'tạm dừng'],
      ['非常階段', 'ひじょうかいだん', 'cầu thang thoát hiểm'],
    ],
  }),
  item('w06', 'sogo-chokai', 2, {
    script: [
      ['男', '在宅勤務のルールが変わるって、聞きました？', 'Chị nghe nói quy định làm việc tại nhà sẽ thay đổi chưa?'],
      ['女', 'ええ、申請が前日までになるんですよね。', 'Rồi, phải xin trước một ngày đúng không?'],
      ['男', 'それもありますけど、一番大きいのは、週の上限が三日から二日に減ることですよ。', 'Có cả cái đó, nhưng thay đổi lớn nhất là giới hạn mỗi tuần giảm từ ba ngày xuống hai.'],
      ['女', 'えっ、そうなんですか。私、毎週水曜と金曜に加えて、月曜も在宅にしているんですけど。', 'Ơ, vậy à? Tôi tuần nào cũng làm ở nhà thứ tư, thứ sáu, thêm cả thứ hai nữa.'],
      ['男', '育児や介護の事情がある人は、届け出れば、今までどおり三日まで認められるそうですよ。', 'Nghe nói ai có lý do chăm con nhỏ hoặc chăm người thân, nếu nộp đơn thì vẫn được tối đa ba ngày như trước.'],
      ['女', 'うちは子どもがまだ小さいので、それなら届けを出しておきます。', 'Con tôi còn nhỏ, vậy thì tôi sẽ nộp đơn.'],
    ],
    questions: [
      [
        '男の人は、今回の変更で一番大きいのはどの点だと言っていますか。',
        ['申請が前日までになること', '在宅勤務が週二日までになること', '在宅勤務ができなくなること', '届け出が必要になること'],
        1,
        'Anh ấy nói それもありますけど、一番大きいのは… giới hạn giảm từ ba xuống hai ngày. Xin trước một ngày là thay đổi chị kia nhắc, anh coi là phụ. Nộp đơn chỉ dành cho trường hợp ngoại lệ.',
      ],
      [
        '女の人はこのあとどうしますか。',
        ['在宅勤務を週二日に減らす', '月曜日は出社するようにする', '届けを出して、週三日の在宅勤務を続ける', '在宅勤務をやめる'],
        2,
        'Con còn nhỏ nên thuộc diện ngoại lệ; chị sẽ nộp đơn để tiếp tục ba ngày như cũ. Lựa chọn 1 và 2 là điều sẽ xảy ra nếu chị không thuộc diện ngoại lệ.',
      ],
    ],
    points: [
      ['在宅勤務', 'ざいたくきんむ', 'làm việc tại nhà'],
      ['上限', 'じょうげん', 'giới hạn trên, mức tối đa'],
      ['介護', 'かいご', 'chăm sóc người già, người bệnh'],
      ['届け出る', 'とどけでる', 'nộp đơn, khai báo'],
    ],
  }),
];

import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/** Week 4 — internal meetings and 報連相 (report, inform, consult). Level: J2 → J1. */
export const W04: BjtItem[] = [
  item('w04', 'bamen', 1, {
    material: {
      kind: 'scene',
      vi: 'Phòng họp. Một nam nhân viên đứng trước bảng trắng, tay cầm bút dạ đang viết lên bảng. Bốn người ngồi quanh bàn nhìn lên. Màn hình chiếu bên cạnh đang bật, hiện một biểu đồ cột.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['男性がスクリーンの資料を指さしています。', '男性がホワイトボードに書き込んでいます。', '出席者がホワイトボードの字を消しています。', '男性がプロジェクターの電源を入れています。'],
        1,
        'Anh ta đang viết lên bảng trắng: 書き込む. Câu 1 nhắc tới màn hình có trong ảnh, nhưng anh ta không chỉ vào đó. Câu 4 sai vì máy chiếu đã bật sẵn. Câu 3 sai cả người làm lẫn hành động.',
      ],
    ],
    points: [
      ['書き込む', 'かきこむ', 'viết vào, ghi lên'],
      ['指さす', 'ゆびさす', 'chỉ tay vào'],
    ],
  }),
  item('w04', 'bamen', 2, {
    material: {
      kind: 'scene',
      vi: 'Hành lang trước một phòng họp. Một nữ nhân viên đang treo tấm biển "使用中" lên tay nắm cửa phòng họp, cửa đang đóng. Tay kia cô ôm một chiếc máy tính xách tay gập lại. Phía sau, một nam nhân viên cầm cốc cà phê đang đi ngang qua.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['女性が会議室のドアを開けています。', '女性がノートパソコンを開いています。', '女性がドアに札を掛けています。', '男性が女性にコーヒーを渡しています。'],
        2,
        'Cô ấy đang treo biển lên cửa: 札を掛ける. Cửa vẫn đóng nên câu 1 sai. Máy tính đang gập nên câu 2 sai. Người đàn ông chỉ đi ngang qua, không đưa cà phê cho ai.',
      ],
    ],
    points: [
      ['札', 'ふだ', 'tấm biển, thẻ treo'],
      ['掛ける', 'かける', 'treo'],
      ['使用中', 'しようちゅう', 'đang sử dụng'],
    ],
  }),
  item('w04', 'hatsugen', 1, {
    script: [
      ['状況', '課長に頼まれた資料の作成が、締め切りに間に合わなそうです。早めに伝えます。何と言いますか。', 'Tài liệu trưởng phòng nhờ làm có vẻ không kịp hạn. Bạn báo sớm. Bạn nói gì?'],
    ],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        [
          '課長、例の資料、たぶん間に合わないと思いますが、なんとかします。',
          '課長、締め切りに遅れてしまったことをご報告いたします。',
          '課長、仕事が多すぎるので、締め切りを延ばしていただきます。',
          '課長、今よろしいでしょうか。ご依頼の資料ですが、金曜の締め切りに一日ほど遅れそうです。理由と今後の見通しをご説明してもよろしいでしょうか。',
        ],
        3,
        'Báo cáo tốt: hỏi cấp trên có rảnh không, nói kết luận trước (chậm một ngày), rồi xin giải thích lý do và hướng xử lý. Câu 1 mơ hồ. Câu 2 là báo khi đã trễ, không phải báo sớm. Câu 3 ～ていただきます nghe như tự quyết, áp đặt cấp trên.',
      ],
    ],
    points: [
      ['見通し', 'みとおし', 'triển vọng, dự tính'],
      ['締め切り', 'しめきり', 'hạn chót'],
    ],
  }),
  item('w04', 'hatsugen', 2, {
    script: [
      ['状況', '会議で、先輩が出した案に反対の意見を言いたいです。何と言いますか。', 'Trong cuộc họp, bạn muốn nói ý kiến phản đối phương án của một đàn anh. Bạn nói gì?'],
    ],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        [
          '確かにその案にも良い点はあると思います。ただ、費用の面で少し気になるところがありまして。',
          'その案は間違っていると思います。',
          '先輩のおっしゃっていることは、全然わかりません。',
          'なるほど、その案に賛成です。',
        ],
        0,
        'Phản đối khéo: công nhận một phần (確かに…あると思います) rồi nêu điểm lo bằng ただ…ありまして, bỏ lửng cuối câu cho mềm. Câu 2 và 3 quá thẳng. Câu 4 lịch sự nhưng là tán thành, trái với tình huống.',
      ],
    ],
    points: [
      ['確かに', 'たしかに', 'quả thật, đúng là'],
      ['気になる', 'きになる', 'thấy băn khoăn, đáng lo'],
    ],
  }),
  item('w04', 'hatsugen', 3, {
    script: [
      ['状況', '会議中、課長が説明している資料の数字が間違っていることに気づきました。課長に伝えます。何と言いますか。', 'Trong cuộc họp, bạn nhận ra số liệu trong tài liệu trưởng phòng đang giải thích bị sai. Bạn báo cho trưởng phòng. Bạn nói gì?'],
    ],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        [
          '課長、数字が違いますよ。',
          '課長、間違いをご指摘してさしあげます。',
          'お話の途中で失礼します。三ページの売上の数字ですが、先月のものではないかと思うのですが。',
          '会議が終わったら、皆さんに間違いをお伝えしておきます。',
        ],
        2,
        'Xin lỗi vì cắt ngang, chỉ đúng chỗ (trang ba, doanh thu), và nói vòng bằng ～ではないかと思うのですが để không phán xét cấp trên. Câu 1 quá thẳng. Câu 2: さしあげる với cấp trên nghe như ban ơn. Câu 4 bỏ qua cấp trên, tự đi báo mọi người.',
      ],
    ],
    points: [
      ['お話の途中で失礼します', 'おはなしのとちゅうでしつれいします', 'xin lỗi đã cắt ngang'],
      ['指摘する', 'してきする', 'chỉ ra (lỗi)'],
    ],
  }),
  item('w04', 'hatsugen', 4, {
    script: [
      ['状況', '取引先から値引きを頼まれましたが、自分では決められません。部長に相談します。何と言いますか。', 'Đối tác đề nghị giảm giá, nhưng bạn không tự quyết được. Bạn hỏi ý kiến trưởng bộ phận. Bạn nói gì?'],
    ],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        [
          '部長、取引先が値引きしろと言ってますが、いいですよね。',
          '部長、ご相談したいことがあるのですが、少しお時間よろしいでしょうか。東和商事様から値引きのご要望がありまして。',
          '部長、値引きしておきましたので、ご了承ください。',
          '部長、東和商事様が値引きを申し上げていらっしゃいます。',
        ],
        1,
        'Xin thời gian rồi nêu việc: ご相談したいことがあるのですが…. Câu 1 thô và ép cấp trên đồng ý. Câu 3 tự quyết rồi mới báo, không phải hỏi ý kiến. Câu 4 dùng 申し上げる (khiêm nhường) cho hành động của khách.',
      ],
    ],
    points: [
      ['値引き', 'ねびき', 'giảm giá'],
      ['ご要望', 'ごようぼう', 'yêu cầu, mong muốn (của khách)'],
      ['ご了承ください', 'ごりょうしょうください', 'xin thông cảm, xin chấp thuận'],
    ],
  }),
  item('w04', 'sogo-chokai', 1, {
    script: [
      ['女', 'では、社内報の発行回数について決めたいと思います。今は月一回ですが、どうでしょう。', 'Bây giờ chúng ta quyết số lần phát hành bản tin nội bộ. Hiện là mỗi tháng một lần, mọi người thấy sao?'],
      ['男', '紙の社内報は、毎回作るのに一週間かかります。月二回にするのは、正直難しいと思います。', 'Bản tin giấy mỗi số mất một tuần để làm. Thật lòng mà nói, mỗi tháng hai số là khó.'],
      ['女', 'そうね。ウェブ版にすれば作業は減るけど、工場の人はパソコンを使わない人も多いから、全部ウェブにするわけにはいかないのよね。', 'Ừ. Làm bản web thì đỡ việc, nhưng bên nhà máy nhiều người không dùng máy tính, nên không thể chuyển hết sang web được.'],
      ['男', 'では、紙は今までどおり月一回で、ウェブ版でニュースを週一回出す、というのはどうでしょう。', 'Vậy bản giấy giữ mỗi tháng một lần như cũ, còn bản web ra tin mỗi tuần một lần thì sao ạ?'],
      ['女', 'いいわね。じゃあ、そういうことで。ウェブ版の担当、山口さん、お願いできる？', 'Được đấy. Vậy quyết thế nhé. Anh Yamaguchi phụ trách bản web được không?'],
      ['男', 'はい。まず来週までに、試しに記事を一本作ってみます。', 'Vâng. Trước tiên, đến tuần sau tôi sẽ thử làm một bài.'],
    ],
    questions: [
      [
        '会議で決まったことは何ですか。',
        ['紙の社内報を月二回にする', '社内報をすべてウェブ版にする', '紙の社内報をやめる', '紙は月一回のまま、ウェブ版を週一回出す'],
        3,
        'Kết luận nằm sau じゃあ、そういうことで, tức đồng ý với đề xuất: giấy giữ mỗi tháng một lần, web mỗi tuần một lần. Mỗi tháng hai số bị nói là khó. Chuyển hết sang web bị gạt vì người ở nhà máy.',
      ],
      [
        '男の人はまず何をしますか。',
        ['ウェブ版の記事を試しに作る', '工場の人にアンケートを取る', '紙の社内報を作る', 'パソコンの使い方を教える'],
        0,
        'Anh ấy nhận phụ trách bản web và nói まず来週までに、試しに記事を一本作ってみます. Người ở nhà máy chỉ được nhắc tới như lý do giữ bản giấy.',
      ],
    ],
    points: [
      ['社内報', 'しゃないほう', 'bản tin nội bộ'],
      ['発行', 'はっこう', 'phát hành'],
      ['わけにはいかない', 'わけにはいかない', 'không thể (vì hoàn cảnh)'],
    ],
  }),
  item('w04', 'sogo-chokai', 2, {
    script: [
      ['男', '昨日のトラブル、課長に報告した？', 'Sự cố hôm qua, em báo trưởng phòng chưa?'],
      ['女', 'いえ、もう解決したので、報告しなくてもいいかと思って。', 'Chưa ạ, em nghĩ đã giải quyết xong rồi nên không cần báo.'],
      ['男', '解決していても、報告はしておいたほうがいいよ。お客様から課長に直接連絡が来ることもあるから、知らないと困るでしょう。', 'Dù đã xong thì vẫn nên báo. Có khi khách liên lạc thẳng với trưởng phòng, không biết thì trưởng phòng khó xử.'],
      ['女', 'そうですね。では、メールで報告しておきます。', 'Đúng ạ. Vậy em báo bằng email.'],
      ['男', '課長は今日、午後から外出だから、メールだと見るのが夜になるかもしれないね。午前中に口頭で簡単に伝えて、詳しいことはあとでメールで送ったら？', 'Trưởng phòng chiều nay ra ngoài, gửi email thì có khi tối mới đọc. Em nói ngắn gọn trực tiếp trong buổi sáng, chi tiết thì gửi email sau, được không?'],
      ['女', 'わかりました。そうします。', 'Vâng, em sẽ làm vậy.'],
    ],
    questions: [
      [
        '男の人は、なぜ報告が必要だと言っていますか。',
        ['課長が客から直接連絡を受けることがあるから', 'トラブルがまだ解決していないから', '報告しないと規則違反になるから', '課長がメールを見ないから'],
        0,
        'Lý do được nói sau から: khách có thể liên lạc thẳng với trưởng phòng, không biết thì khó xử. Sự cố đã giải quyết xong. Chuyện email chỉ là trưởng phòng có thể đọc muộn, không phải không đọc.',
      ],
      [
        '女の人はこのあとまず何をしますか。',
        ['課長にメールを送る', 'お客様に電話をする', '課長に口頭で報告する', '夜に課長に連絡する'],
        2,
        'Ý định báo bằng email được sửa lại: buổi sáng nói ngắn gọn trực tiếp (口頭で), chi tiết gửi email sau. Email là bước thứ hai.',
      ],
    ],
    points: [
      ['口頭で', 'こうとうで', 'bằng lời nói, trực tiếp'],
      ['報告', 'ほうこく', 'báo cáo'],
    ],
  }),
];

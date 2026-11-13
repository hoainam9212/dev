import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/** Week 5 — numbers, charts and trends. Level: J1. */
export const W05: BjtItem[] = [
  item('w05', 'bamen', 1, {
    material: {
      kind: 'scene',
      vi: 'Một nam nhân viên ngồi trước hai màn hình máy tính, tay phải cầm chuột, trên màn hình là một biểu đồ cột đang được chỉnh sửa. Bên cạnh bàn phím có một máy tính bỏ túi và một bản báo cáo đã in sẵn. Không có ai khác quanh bàn.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['男性が電卓で計算しています。', '男性が報告書を印刷しています。', '男性がパソコンでグラフを作成しています。', '男性が画面を同僚に見せています。'],
        2,
        'Anh ta đang dùng chuột chỉnh biểu đồ trên màn hình: グラフを作成している. Máy tính bỏ túi có trên bàn nhưng không được dùng. Báo cáo đã in sẵn, không phải đang in. Quanh bàn không có đồng nghiệp nào.',
      ],
    ],
    points: [
      ['電卓', 'でんたく', 'máy tính bỏ túi'],
      ['作成する', 'さくせいする', 'soạn, lập'],
    ],
  }),
  item('w05', 'bamen', 2, {
    material: {
      kind: 'scene',
      vi: 'Trong một nhà kho. Một nữ nhân viên đứng trước dãy kệ, tay cầm máy tính bảng, ngón tay chỉ vào từng thùng các-tông trên kệ như đang đếm. Ở phía sau, một nam nhân viên đang đẩy xe đẩy hàng chở ba thùng các-tông về phía cửa kho.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['女性が棚の在庫を数えています。', '女性が段ボール箱を運んでいます。', '男性が棚に箱を並べています。', '二人で台車を押しています。'],
        0,
        'Người phụ nữ cầm máy tính bảng, chỉ vào từng thùng trên kệ: 在庫を数える = kiểm đếm hàng tồn. Câu 2 đảo chủ thể: người chở thùng là người đàn ông. Câu 3: anh ta chở thùng ra cửa, không xếp lên kệ. Câu 4: chỉ một người đẩy xe.',
      ],
    ],
    points: [
      ['在庫', 'ざいこ', 'hàng tồn kho'],
      ['台車', 'だいしゃ', 'xe đẩy hàng'],
      ['段ボール箱', 'だんぼーるばこ', 'thùng các-tông'],
    ],
  }),
  item('w05', 'hatsugen', 1, {
    script: [
      ['状況', '会議で、今期の売上が前年を下回ったことを報告します。何と言いますか。', 'Trong cuộc họp, bạn báo cáo doanh thu kỳ này thấp hơn năm trước. Bạn nói gì?'],
    ],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        [
          '売上は前年よりちょっと悪かったですけど、大丈夫だと思います。',
          '売上が前年を下回ったのは、営業部のせいです。',
          '売上は前年を下回りましたが、詳しい数字は覚えておりません。',
          '今期の売上は前年比九十二パーセントと、前年を下回りました。主な要因は二点ございます。',
        ],
        3,
        'Báo cáo tốt nêu con số cụ thể (前年比92%), kết luận, rồi chuyển sang nguyên nhân. Câu 1 mơ hồ và tự trấn an. Câu 2 đổ lỗi cho phòng khác. Câu 3 lịch sự nhưng không có số liệu, mà số liệu là thứ báo cáo cần nhất.',
      ],
    ],
    points: [
      ['下回る', 'したまわる', 'thấp hơn, dưới mức'],
      ['前年比', 'ぜんねんひ', 'so với năm trước'],
      ['要因', 'よういん', 'nguyên nhân chính, yếu tố'],
    ],
  }),
  item('w05', 'hatsugen', 2, {
    script: [
      ['状況', '上司から「このグラフ、去年のデータじゃない？」と言われました。確かにあなたの間違いでした。何と言いますか。', 'Cấp trên nói: "Biểu đồ này là số liệu năm ngoái phải không?" Đúng là bạn đã nhầm. Bạn nói gì?'],
    ],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        [
          'いえ、そんなことはないと思いますが。',
          '申し訳ございません。確認が不十分でした。すぐに今年のデータに差し替えます。',
          'グラフはシステムが自動で作ったので、私のミスではありません。',
          'そうですね。でも、去年のデータでも傾向は同じだと思います。',
        ],
        1,
        'Nhận lỗi, nói rõ nguyên nhân (確認が不十分でした) và cách sửa (差し替えます). Câu 1 phủ nhận dù mình sai. Câu 3 đổ cho hệ thống. Câu 4 công nhận nhưng biện hộ, không sửa.',
      ],
    ],
    points: [
      ['差し替える', 'さしかえる', 'thay thế (bằng cái đúng)'],
      ['傾向', 'けいこう', 'xu hướng'],
    ],
  }),
  item('w05', 'hatsugen', 3, {
    script: [
      ['状況', '取引先の担当者に、来月どのくらい注文する予定か聞きたいです。何と言いますか。', 'Bạn muốn hỏi người phụ trách bên đối tác xem tháng sau họ dự định đặt hàng khoảng bao nhiêu. Bạn nói gì?'],
    ],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        [
          '差し支えなければ、来月のご発注量の見込みをお聞かせいただけますでしょうか。',
          '来月、どれぐらい注文するつもりですか。',
          '来月のご発注量を教えてさしあげましょうか。',
          '来月のご発注量は、こちらで決めておきますね。',
        ],
        0,
        '差し支えなければ làm mềm câu hỏi về thông tin nội bộ của khách; お聞かせいただけますでしょうか là cách nhờ rất lịch sự. Câu 2 quá thẳng. Câu 3 đảo vai: mình mới là người cần được cho biết. Câu 4 tự quyết thay khách.',
      ],
    ],
    points: [
      ['差し支えなければ', 'さしつかえなければ', 'nếu không phiền'],
      ['発注', 'はっちゅう', 'đặt hàng (với nhà cung cấp)'],
      ['見込み', 'みこみ', 'dự kiến, ước tính'],
    ],
  }),
  item('w05', 'hatsugen', 4, {
    script: [
      ['状況', '同期の同僚が作った資料を見ていて、グラフの単位が書いていないことに気づきました。何と言いますか。', 'Khi xem tài liệu do một đồng nghiệp cùng khoá làm, bạn nhận ra biểu đồ không ghi đơn vị. Bạn nói gì?'],
    ],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        [
          'このグラフ、全然だめだね。',
          '単位が抜けておりますので、至急ご訂正くださいませ。',
          'このグラフ、単位が抜けてるみたい。万円か千円か、入れておいたほうがいいかも。',
          'あとで部長に言っておくね。',
        ],
        2,
        'Với đồng nghiệp cùng khoá thì thể thường là đúng mức, miễn chỉ ra cụ thể và gợi ý cách sửa (～たほうがいいかも). Câu 1 chê mà không nói vì sao. Câu 2 cứng nhắc, xa cách quá mức với người ngang hàng. Câu 4 báo lên cấp trên thay vì nói thẳng với người làm.',
      ],
    ],
    points: [
      ['同期', 'どうき', 'người vào công ty cùng đợt'],
      ['抜ける', 'ぬける', 'bị thiếu, sót'],
      ['単位', 'たんい', 'đơn vị'],
    ],
  }),
  item('w05', 'sogo-chokai', 1, {
    script: [
      ['男', '第三四半期の結果をご報告します。売上高は前年同期比で五パーセント増えましたが、営業利益は逆に三パーセント減少しました。', 'Tôi xin báo cáo kết quả quý ba. Doanh thu tăng năm phần trăm so với cùng kỳ năm trước, nhưng lợi nhuận kinh doanh ngược lại giảm ba phần trăm.'],
      ['男', '原因は原材料の値上がりです。特に、包装に使う紙の価格が、この一年で二割上がっています。', 'Nguyên nhân là giá nguyên liệu tăng. Đặc biệt, giá giấy dùng để đóng gói đã tăng hai mươi phần trăm trong một năm qua.'],
      ['男', '販売価格を上げることも検討しましたが、競合他社が価格を据え置いているため、今期は見送ります。', 'Chúng tôi đã cân nhắc tăng giá bán, nhưng vì các đối thủ cạnh tranh vẫn giữ nguyên giá nên kỳ này tạm gác lại.'],
      ['男', 'その代わり、来月から包装を簡易なものに切り替えて、コストを抑えます。', 'Thay vào đó, từ tháng sau chúng tôi sẽ chuyển sang bao bì đơn giản để giảm chi phí.'],
    ],
    questions: [
      [
        '第三四半期の結果について、正しいのはどれですか。',
        ['売上も利益も増えた', '売上は増えたが、利益は減った', '売上は減ったが、利益は増えた', '売上も利益も減った'],
        1,
        'Doanh thu +5% nhưng lợi nhuận kinh doanh 逆に (ngược lại) −3%. 逆に là tín hiệu hai con số đi ngược chiều nhau. Lựa chọn 3 đảo hai đại lượng.',
      ],
      [
        '来月から何をしますか。',
        ['販売価格を上げる', '原材料の仕入れ先を変える', '競合他社と価格を合わせる', '包装を簡単なものに変える'],
        3,
        'Tăng giá đã được cân nhắc nhưng 見送ります (gác lại). Việc làm từ tháng sau nằm sau その代わり: chuyển sang bao bì đơn giản (簡易な包装). Không ai nói tới đổi nhà cung cấp.',
      ],
    ],
    points: [
      ['四半期', 'しはんき', 'quý (ba tháng)'],
      ['据え置く', 'すえおく', 'giữ nguyên (giá, mức)'],
      ['見送る', 'みおくる', 'gác lại, hoãn'],
      ['抑える', 'おさえる', 'kìm, giảm (chi phí)'],
    ],
  }),
  item('w05', 'sogo-chokai', 2, {
    script: [
      ['女', 'アンケートの結果、見ました？アプリの満足度、思ったより低かったですね。', 'Anh xem kết quả khảo sát chưa? Mức hài lòng với ứng dụng thấp hơn tôi tưởng.'],
      ['男', 'ええ。でも、回答者の年齢を見ると、六十代以上がほとんどなんですよ。', 'Rồi. Nhưng nhìn độ tuổi người trả lời thì gần như toàn người từ sáu mươi trở lên.'],
      ['女', '若い人の回答が少ないということですか。', 'Ý anh là ít người trẻ trả lời?'],
      ['男', 'そうなんです。紙のアンケートを店頭だけで配ったので、来店される年配のお客様に偏ってしまったんだと思います。', 'Đúng vậy. Vì chỉ phát phiếu giấy tại cửa hàng nên kết quả bị lệch về phía khách lớn tuổi đến cửa hàng.'],
      ['女', 'じゃあ、この結果だけで判断するのは危ないですね。', 'Vậy chỉ dựa vào kết quả này mà đánh giá thì nguy hiểm nhỉ.'],
      ['男', 'ええ。次は、アプリの中でもアンケートを取って、両方の結果を比べてみたいと思います。', 'Vâng. Lần sau tôi muốn làm khảo sát ngay trong ứng dụng nữa, rồi so sánh hai kết quả.'],
    ],
    questions: [
      [
        '男の人は、満足度が低かった理由をどう考えていますか。',
        ['アプリの機能が足りないから', '若い人がアプリを使わないから', '回答者が年配の客に偏っていたから', 'アンケートの質問が難しかったから'],
        2,
        'Anh ấy cho rằng kết quả bị lệch (偏ってしまった) vì chỉ phát phiếu ở cửa hàng, nơi chủ yếu là khách lớn tuổi. Lựa chọn 2 hiểu sai "ít người trẻ trả lời" thành "người trẻ không dùng ứng dụng".',
      ],
      [
        '次のアンケートはどうしますか。',
        ['アプリの中でも取る', '店頭だけで配る', '六十代以上だけに聞く', '紙のアンケートをやめる'],
        0,
        'Anh ấy nói アプリの中でもアンケートを取って (cả trong ứng dụng nữa) để so sánh hai kết quả. Chữ も cho thấy phiếu giấy vẫn giữ, nên lựa chọn 4 sai.',
      ],
    ],
    points: [
      ['偏る', 'かたよる', 'bị lệch, thiên về một phía'],
      ['年配', 'ねんぱい', 'lớn tuổi'],
      ['店頭', 'てんとう', 'tại cửa hàng'],
    ],
  }),
];

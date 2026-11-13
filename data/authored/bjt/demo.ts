import type { BjtItem } from '@nihongo/shared';
import { item } from './helpers';

/** One item per section type: the format reference for every other file, and the learner's first try-out. */
export const BJT_DEMO: BjtItem[] = [
  item('demo', 'bamen', 1, {
    material: { kind: 'scene', vi: 'Quầy lễ tân công ty. Một vị khách nam đang đưa danh thiếp cho nữ nhân viên lễ tân. Trên quầy có sổ ghi tên khách và một chiếc điện thoại.' },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['受付の人が来客に名刺を渡しています。', '来客が受付で名刺を差し出しています。', '来客が受付で電話をかけています。', '受付の人が来客名簿に記入しています。'],
        1,
        'Người đưa danh thiếp là khách (来客), động từ 差し出す = chìa ra, đưa ra. Câu 1 đảo chủ thể. Câu 3 và 4 nhắc tới đồ vật có trong ảnh (điện thoại, sổ) nhưng không ai đang dùng chúng.',
      ],
    ],
    points: [
      ['差し出す', 'さしだす', 'chìa ra, đưa ra'],
      ['来客名簿', 'らいきゃくめいぼ', 'sổ ghi tên khách'],
    ],
  }),
  item('demo', 'hatsugen', 1, {
    script: [['状況', '取引先から課長に電話がありましたが、課長は今、会議中です。何と言いますか。', 'Đối tác gọi điện cho trưởng phòng, nhưng trưởng phòng đang họp. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        [
          '課長は今、会議中でいらっしゃいます。',
          '申し訳ございません。山田はただ今、席を外しております。',
          '山田課長は会議に出ておられますので、後にしてください。',
          'すみません、課長はいないんです。',
        ],
        1,
        'Nói với người ngoài công ty thì gọi người trong công ty bằng họ trần (山田) và dùng khiêm nhường ngữ (外しております). Câu 1 và 3 dùng tôn kính ngữ cho người phía mình. Câu 3 còn ra lệnh cho khách. Câu 4 quá suồng sã.',
      ],
    ],
    points: [
      ['席を外す', 'せきをはずす', 'rời chỗ, không có ở bàn'],
      ['ただ今', 'ただいま', 'hiện giờ (trang trọng)'],
    ],
  }),
  item('demo', 'sogo-chokai', 1, {
    script: [
      ['男', '来週の新製品説明会ですが、会場は第一会議室でよろしいでしょうか。', 'Về buổi giới thiệu sản phẩm mới tuần sau, tổ chức ở phòng họp số 1 được không ạ?'],
      ['女', '参加者は何名ぐらいになりそうですか。', 'Khoảng bao nhiêu người tham dự?'],
      ['男', '今のところ四十名ほどです。', 'Hiện tại khoảng bốn mươi người ạ.'],
      ['女', '第一は三十名までですから、厳しいですね。大ホールは空いていますか。', 'Phòng số 1 chỉ chứa được ba mươi người nên khó đấy. Hội trường lớn có trống không?'],
      ['男', '水曜の午後なら空いていますが、火曜は終日ふさがっています。', 'Chiều thứ tư thì trống, còn thứ ba kín cả ngày ạ.'],
      ['女', 'では日程を水曜の午後に変更して、大ホールを押さえてください。参加者への連絡もお願いします。', 'Vậy đổi lịch sang chiều thứ tư và giữ hội trường lớn nhé. Nhờ anh báo cho người tham dự luôn.'],
      ['男', '承知しました。すぐに手配いたします。', 'Vâng ạ. Tôi sẽ thu xếp ngay.'],
    ],
    questions: [
      [
        '説明会はどうなりましたか。',
        ['火曜日に第一会議室で行う', '火曜日に大ホールで行う', '水曜日の午後に大ホールで行う', '参加者を三十名に減らして行う'],
        2,
        'Phòng số 1 không đủ chỗ, hội trường lớn chỉ trống chiều thứ tư, nên đổi cả ngày lẫn địa điểm. Kết luận nằm sau では. Không ai nói đến việc giảm số người.',
      ],
      [
        '男の人はこのあとまず何をしますか。',
        ['参加者の人数を数え直す', '大ホールを予約する', '第一会議室の広さを確認する', '説明会の資料を作り直す'],
        1,
        '押さえる ở đây = giữ chỗ, đặt trước. Việc được giao là đặt hội trường rồi báo cho người tham dự; trong bốn lựa chọn chỉ có việc đặt hội trường.',
      ],
    ],
    points: [
      ['押さえる', 'おさえる', 'giữ chỗ, đặt trước (phòng, lịch)'],
      ['ふさがる', 'ふさがる', 'đã kín, có người dùng'],
      ['手配する', 'てはいする', 'thu xếp, sắp đặt'],
    ],
  }),
  item('demo', 'jokyo', 1, {
    material: {
      kind: 'table',
      title: '座席表（会議室B）',
      head: ['', '窓側', '中央', 'ドア側'],
      rows: [
        ['奥', '①', '②', '③'],
        ['手前', '④', '⑤', '⑥'],
      ],
      note: 'スクリーンは奥の壁にあります。',
    },
    script: [
      ['女', '田中さん、明日お見えになる部長の席ですが、どこにしましょうか。', 'Anh Tanaka, chỗ ngồi của trưởng bộ phận đến ngày mai nên xếp ở đâu?'],
      ['男', 'スクリーンが見やすい奥の列がいいですね。ただ、ドアの近くは人の出入りがあるので避けましょう。', 'Hàng trong dễ nhìn màn hình là tốt. Nhưng gần cửa có người ra vào nên tránh.'],
      ['女', 'では窓側にしますか。', 'Vậy xếp phía cửa sổ nhé?'],
      ['男', '午後は日差しが強いので、真ん中にしてください。', 'Buổi chiều nắng gắt lắm, xếp ở giữa đi.'],
    ],
    questions: [
      [
        '部長の席はどこになりましたか。',
        ['①', '②', '③', '⑤'],
        1,
        'Hàng trong (奥), không gần cửa, không sát cửa sổ → ô giữa hàng trong là ②. ⑤ cũng ở giữa nhưng là hàng ngoài (手前).',
      ],
    ],
    points: [
      ['お見えになる', 'おみえになる', 'đến (tôn kính ngữ của 来る)'],
      ['手前', 'てまえ', 'phía gần mình, phía ngoài'],
      ['日差し', 'ひざし', 'ánh nắng'],
    ],
  }),
  item('demo', 'shiryo', 1, {
    material: {
      kind: 'bars',
      title: '支店別売上高（上半期）',
      unit: '百万円',
      labels: ['東京', '大阪', '名古屋', '福岡'],
      series: [
        { name: '前年', values: [120, 90, 60, 40] },
        { name: '今年', values: [126, 81, 75, 44] },
      ],
    },
    script: [
      ['男', '上半期の支店別売上です。東京は前年をやや上回りました。一方、前年割れとなった支店が一つあります。', 'Đây là doanh thu nửa đầu năm theo chi nhánh. Tokyo nhỉnh hơn năm trước một chút. Mặt khác, có một chi nhánh thấp hơn năm trước.'],
      ['男', '伸び率が最も高かった支店には、下半期に営業担当を二名増員する予定です。', 'Chi nhánh có tỉ lệ tăng cao nhất dự kiến được bổ sung hai nhân viên kinh doanh trong nửa cuối năm.'],
    ],
    questions: [
      [
        '下半期に営業担当が増員されるのはどの支店ですか。',
        ['東京', '大阪', '名古屋', '福岡'],
        2,
        'Câu hỏi là tỉ lệ tăng (伸び率), không phải mức doanh thu. Nagoya 60→75 là +25%; Fukuoka +10%; Tokyo +5%; Osaka giảm. Tokyo có doanh thu lớn nhất nhưng tăng ít.',
      ],
    ],
    points: [
      ['前年割れ', 'ぜんねんわれ', 'thấp hơn năm trước'],
      ['伸び率', 'のびりつ', 'tỉ lệ tăng trưởng'],
      ['増員する', 'ぞういんする', 'tăng thêm người'],
      ['上回る', 'うわまわる', 'vượt, cao hơn'],
    ],
  }),
  item('demo', 'sogo-chodokkai', 1, {
    material: {
      kind: 'text',
      title: '社内研修のご案内',
      body: '件名：ビジネス文書研修のご案内\n\n日時：11月20日（金）13:00〜17:00\n場所：本社5階 研修室\n対象：入社3年目までの社員\n申込：11月13日（金）までに人事部 佐藤まで\n\n※定員20名。定員を超えた場合は入社年次の若い方を優先します。\n※当日は筆記用具とノートパソコンをご持参ください。',
    },
    script: [
      ['女', '鈴木さん、この研修、申し込みましたか。', 'Anh Suzuki, anh đăng ký khoá đào tạo này chưa?'],
      ['男', 'ええ、昨日。でも、もう二十五人申し込んでいるそうですよ。', 'Rồi, hôm qua. Nhưng nghe nói đã có hai mươi lăm người đăng ký.'],
      ['女', 'そうですか。私は三年目だから、難しいかもしれませんね。', 'Vậy à. Tôi năm thứ ba rồi nên chắc khó.'],
      ['男', '人事部の話では、希望者が多ければ来月も同じ内容で開くそうです。', 'Bên nhân sự nói nếu nhiều người muốn học thì tháng sau sẽ mở thêm một buổi cùng nội dung.'],
      ['女', 'じゃあ、とりあえず今日中に申し込んでおいて、だめなら来月に回してもらいます。', 'Vậy tôi cứ đăng ký trong hôm nay đã, không được thì xin chuyển sang tháng sau.'],
    ],
    questions: [
      [
        '女の人はこのあとどうしますか。',
        ['申し込まずに来月の研修を待つ', '人事部の佐藤さんに申し込む', '鈴木さんに申し込みを頼む', '研修室にノートパソコンを持っていく'],
        1,
        'Cô ấy nói とりあえず今日中に申し込んでおいて: cứ đăng ký trước. Nơi nhận đăng ký ghi trong thông báo là 人事部 佐藤. Chờ tháng sau chỉ là phương án dự phòng.',
      ],
      [
        '女の人が研修に参加できないかもしれないのはなぜですか。',
        ['申込の締め切りを過ぎたから', '対象の社員ではないから', '定員を超えていて、年次の若い人が優先されるから', '来月の研修に申し込んだから'],
        2,
        'Thông báo ghi định viên 20 người, vượt thì ưu tiên người vào công ty sau. Đã có 25 người đăng ký, mà cô ấy là năm thứ ba (vẫn thuộc đối tượng, nhưng thâm niên cao nhất trong nhóm).',
      ],
    ],
    points: [
      ['定員', 'ていいん', 'số người tối đa'],
      ['入社年次', 'にゅうしゃねんじ', 'năm vào công ty'],
      ['持参する', 'じさんする', 'mang theo'],
      ['回す', 'まわす', 'chuyển sang (lịch, người khác)'],
    ],
  }),
  item('demo', 'goi', 1, {
    questions: [
      [
        'お見積書を添付いたしましたので、ご＿＿＿のほどお願い申し上げます。',
        ['査収', '拝見', '参照', '承知'],
        0,
        'ご査収ください = xin kiểm tra và nhận cho, cụm cố định khi gửi kèm tài liệu. 拝見 là khiêm nhường ngữ cho hành động của mình. ご参照 là tham khảo, không hàm ý nhận. ご承知 là biết, hiểu.',
      ],
    ],
    points: [
      ['査収', 'さしゅう', 'kiểm tra và nhận'],
      ['添付する', 'てんぷする', 'đính kèm'],
    ],
  }),
  item('demo', 'hyogen', 1, {
    material: {
      kind: 'text',
      body: '株式会社ABC 営業部 高橋様\n\nいつもお世話になっております。\nさて、先日ご依頼いただきました納期の前倒しの件ですが、社内で検討いたしましたところ、現在の生産体制では誠に遺憾ながらご希望に沿いかねるとの結論に至りました。\nつきましては、当初の予定どおり12月10日の納品とさせていただきたく存じます。\n何卒ご理解賜りますようお願い申し上げます。',
    },
    questions: [
      [
        'このメールで書き手が最も伝えたいことは何ですか。',
        ['納期を早めることができる', '納期を早めることはできない', '納期を12月10日より遅らせたい', '納期についてもう一度検討したい'],
        1,
        'ご希望に沿いかねる = không thể đáp ứng nguyện vọng (～かねる là từ chối trang trọng). 前倒し là làm sớm hơn; sau đó thư giữ nguyên ngày 12/10 như ban đầu, không lùi lại.',
      ],
    ],
    points: [
      ['前倒し', 'まえだおし', 'làm sớm hơn kế hoạch'],
      ['沿いかねる', 'そいかねる', 'không thể đáp ứng (trang trọng)'],
      ['遺憾ながら', 'いかんながら', 'rất tiếc là'],
    ],
  }),
  item('demo', 'sogo-dokkai', 1, {
    material: {
      kind: 'text',
      title: 'テレワーク制度の見直しについて',
      body: '当社では三年前から週三日までのテレワークを認めてきた。通勤時間の削減により社員の満足度は向上し、離職率も低下している。\nしかし、昨年度の社内調査では、入社二年目までの社員の六割が「仕事の進め方を相談しにくい」と回答した。また、部署をまたぐ新規企画の件数は、制度導入前に比べ三割減少している。\nこれを受け、来年四月より、入社二年目までの社員については出社を週三日以上とする。ただし、育児や介護などの事情がある場合はこの限りではない。それ以外の社員については現行どおりとするが、各部署で週一日の「全員出社日」を設けることとする。',
    },
    questions: [
      [
        '制度を見直す理由として本文で挙げられているのはどれですか。',
        ['社員の満足度が下がったこと', '離職率が上がったこと', '若手社員が相談しにくく、部署をまたぐ企画も減ったこと', '通勤時間が増えたこと'],
        2,
        'Đoạn sau しかし nêu hai vấn đề: nhân viên dưới hai năm khó hỏi ý kiến, và số dự án liên phòng ban giảm ba phần. Mức hài lòng và tỉ lệ nghỉ việc là mặt tốt của chế độ, nêu ở đoạn đầu.',
      ],
      [
        '来年四月以降、入社五年目で特別な事情のない社員はどうなりますか。',
        ['週三日以上出社しなければならない', 'テレワークができなくなる', 'これまでどおりだが、週一日は部署の全員出社日に出社する', '自由に出社日を決められるようになる'],
        2,
        'Quy định ba ngày chỉ áp cho người dưới hai năm. Người khác giữ nguyên hiện hành (現行どおり), nhưng mỗi phòng có một ngày toàn bộ lên công ty. Ngoại lệ sau ただし chỉ dành cho người nuôi con, chăm người thân.',
      ],
    ],
    points: [
      ['離職率', 'りしょくりつ', 'tỉ lệ nghỉ việc'],
      ['この限りではない', 'このかぎりではない', 'không áp dụng (ngoại lệ)'],
      ['現行どおり', 'げんこうどおり', 'như hiện hành'],
      ['部署をまたぐ', 'ぶしょをまたぐ', 'liên phòng ban'],
    ],
  }),
];

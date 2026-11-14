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
      [
        '状況',
        '朝礼の当番です。総務部から頼まれて、来週の健康診断の日程を、部の全員に伝えることになりました。何と言いますか。',
        'Bạn trực buổi giao ban sáng. Theo nhờ của phòng tổng vụ, bạn báo cho cả phòng lịch khám sức khoẻ tuần sau. Bạn nói gì?',
      ],
    ],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['健康診断の日程を、お知らせになります。', '健康診断の日程を、お知らせいたします。', '健康診断の日程を、お知らせください。', '健康診断の日程を、お聞きいたします。'],
        1,
        'Người thông báo là mình, nói trước cả phòng nên dùng khiêm nhường お知らせいたします. Lựa chọn 1 đúng ý nhưng お〜になる là tôn kính, đem nâng hành động của chính mình. Lựa chọn 3 lại nhờ người nghe thông báo. Lựa chọn 4 đổi thành "hỏi", trong khi bạn là người truyền đạt.',
      ],
    ],
    points: [
      ['朝礼', 'ちょうれい', 'buổi giao ban sáng'],
      ['当番', 'とうばん', 'phiên trực'],
      ['健康診断', 'けんこうしんだん', 'khám sức khoẻ'],
    ],
  }),
  item('w06', 'hatsugen', 2, {
    script: [
      [
        '状況',
        '取引先から、来月の新製品展示会の案内状が課長あてに届きました。課長に、展示会に行く予定があるかどうかを聞きます。何と言いますか。',
        'Thư mời dự triển lãm sản phẩm mới tháng sau của đối tác gửi tới trưởng phòng. Bạn hỏi trưởng phòng có định đi triển lãm không. Bạn nói gì?',
      ],
    ],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['課長、展示会には参られますか。', '課長、展示会にはいらっしゃいましたか。', '課長、展示会にはお招きになりますか。', '課長、展示会にはいらっしゃいますか。'],
        3,
        'Hỏi việc đi của cấp trên trong tương lai: tôn kính いらっしゃいますか. Lựa chọn 1 đúng ý nhưng 参る là khiêm nhường, thêm られる cũng không thành tôn kính. Lựa chọn 2 chia quá khứ, trong khi triển lãm là tháng sau. Lựa chọn 4 hỏi trưởng phòng có mời ai không, sai nội dung.',
      ],
    ],
    points: [
      ['案内状', 'あんないじょう', 'thư mời'],
      ['参る', 'まいる', 'đi, đến (khiêm nhường)'],
      ['お招きになる', 'おまねきになる', '(ngài) mời'],
    ],
  }),
  item('w06', 'hatsugen', 3, {
    script: [
      [
        '状況',
        '課長に頼まれていた社内報の原稿を書き終えました。課長の席まで持っていって、手渡します。何と言いますか。',
        'Bạn đã viết xong bản thảo cho bản tin nội bộ mà trưởng phòng nhờ. Bạn mang tới bàn trưởng phòng và đưa tận tay. Bạn nói gì?',
      ],
    ],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['原稿ができましたので、お持ちしました。', '原稿ができましたので、お持ちになりました。', '原稿ができましたので、お預かりしました。', '原稿ができましたので、お返しします。'],
        0,
        'Mình là người mang tới nên dùng khiêm nhường お持ちしました. Lựa chọn 2 đúng ý nhưng お持ちになる là tôn kính, nâng hành động của chính mình. Lựa chọn 3 nghĩa là "đã nhận giữ" — ngược hướng. Lựa chọn 4 là "trả lại", trong khi bản thảo do mình viết mới, không phải đồ mượn của trưởng phòng.',
      ],
    ],
    points: [
      ['社内報', 'しゃないほう', 'bản tin nội bộ'],
      ['原稿', 'げんこう', 'bản thảo'],
      ['お預かりする', 'おあずかりする', '(tôi) nhận giữ'],
    ],
  }),
  item('w06', 'hatsugen', 4, {
    script: [
      [
        '状況',
        '総務部の先輩に頼まれて、社内向けのお知らせの文面を確認しました。書いてある日付と曜日が合っていないようです。何と言いますか。',
        'Theo nhờ của một đàn anh/đàn chị phòng tổng vụ, bạn kiểm tra nội dung thông báo nội bộ. Có vẻ ngày và thứ ghi trong đó không khớp. Bạn nói gì?',
      ],
    ],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['この日付ですが、曜日が違っていらっしゃいます。', 'この日付ですが、曜日はもう直されたでしょうか。', 'この日付ですが、曜日が違っていないでしょうか。', 'この日付ですが、曜日が違うとおっしゃいました。'],
        2,
        'Chỉ ra lỗi của người đi trước một cách mềm: 違っていないでしょうか (hỏi lại thay vì khẳng định). Lựa chọn 1 dùng tôn kính いらっしゃる cho "thứ trong tuần", một sự vật. Lựa chọn 2 hỏi đã sửa chưa, trong khi chính bạn vừa phát hiện. Lựa chọn 4 nói người kia đã bảo sai — không có chuyện đó.',
      ],
    ],
    points: [
      ['文面', 'ぶんめん', 'nội dung câu chữ (văn bản)'],
      ['曜日', 'ようび', 'thứ trong tuần'],
    ],
  }),
  item('w06', 'sogo-chokai', 1, {
    script: [
      ['女', '総務部の小野です。来週の株主総会で受付を担当していただく皆さんに、当日の流れをご説明します。総会は六月二十五日、金曜日の午前十時開始です。', 'Tôi là Ono phòng tổng vụ. Tôi xin giải thích trình tự trong ngày cho các bạn phụ trách lễ tân ở đại hội cổ đông tuần sau. Đại hội bắt đầu lúc mười giờ sáng thứ Sáu, ngày 25 tháng 6 (năm 2027).'],
      ['女', '受付の皆さんは、八時半に本社一階のロビーに集合してください。最初の三十分で、机と案内の看板を並べます。', 'Các bạn lễ tân tập trung ở sảnh tầng một trụ sở lúc tám giờ rưỡi. Ba mươi phút đầu sẽ xếp bàn và bảng chỉ dẫn.'],
      ['女', '九時に開場しますので、株主の方がいらしたら、まず議決権行使書をお預かりして、出席票をお渡しします。', 'Chín giờ mở cửa, khi cổ đông đến, trước hết nhận phiếu biểu quyết và trao phiếu dự họp.'],
      ['女', '以前は、ここで本人確認のために身分証明書を見せていただいていたのですが、今年からは、行使書のバーコードを読み取るだけで済むようになりました。ですので、身分証明書をお願いする必要はありません。', 'Trước đây, ở bước này chúng ta xin xem giấy tờ tuỳ thân để xác nhận danh tính, nhưng từ năm nay chỉ cần đọc mã vạch trên phiếu biểu quyết là xong. Vì vậy không cần xin giấy tờ tuỳ thân nữa.'],
      ['女', '行使書をお持ちでない方がいらした場合は、受付では対応せず、隣の特別受付にご案内ください。', 'Nếu có người đến mà không mang phiếu biểu quyết thì lễ tân không xử lý, hãy hướng dẫn sang quầy lễ tân đặc biệt bên cạnh.'],
      ['女', 'また、当日は、お配りするお土産はございません。お尋ねがあった場合は、今年から取りやめたとお伝えください。', 'Ngoài ra, hôm đó không có quà phát. Nếu được hỏi, hãy trả lời là từ năm nay đã thôi không phát.'],
      ['女', 'それから、バーコードの読み取り機の使い方を、前日の午後三時から、ロビーで練習します。当日初めて触ると慌てますので、受付の方は全員、必ずこの練習に参加してください。', 'Còn nữa, cách dùng máy đọc mã vạch sẽ được tập ở sảnh từ ba giờ chiều hôm trước. Hôm đó mới chạm vào lần đầu thì sẽ luống cuống, nên tất cả lễ tân nhất định tham gia buổi tập này.'],
      ['女', '以上です。何かご質問はありますか。', 'Tôi xin hết. Các bạn có câu hỏi gì không?'],
    ],
    questions: [
      [
        '受付の担当者は、総会の前に、まず何をしなければなりませんか。',
        ['前日に読み取り機の扱いを練習する', '当日の朝ロビーで机を並べる', '身分証明書の確かめ方を覚える', 'お土産の配布場所を用意する'],
        0,
        'Theo thứ tự thời gian, việc đầu tiên là buổi tập máy đọc mã vạch lúc ba giờ chiều hôm trước, bắt buộc với mọi lễ tân — lựa chọn 1. Lựa chọn 2 là việc sáng hôm đại hội, tức là sau. Lựa chọn 3 là cách làm cũ, từ năm nay bỏ. Lựa chọn 4 sai vì năm nay thôi phát quà.',
      ],
    ],
    points: [
      ['株主総会', 'かぶぬしそうかい', 'đại hội cổ đông'],
      ['議決権行使書', 'ぎけつけんこうししょ', 'phiếu thực hiện quyền biểu quyết'],
      ['身分証明書', 'みぶんしょうめいしょ', 'giấy tờ tuỳ thân'],
      ['取りやめる', 'とりやめる', 'thôi, huỷ bỏ'],
    ],
  }),
  item('w06', 'sogo-chokai', 2, {
    script: [
      ['男', '受注のFAXの件、例の取引先アンケートの結果が出たよ。', 'Chuyện nhận đơn qua FAX, kết quả khảo sát đối tác đã có rồi đấy.'],
      ['女', 'どうでしたか。', 'Thế nào ạ?'],
      ['男', 'FAXで注文してくる取引先のうち、メールやウェブの注文画面に移ってもいいと答えたのが、六割ぐらい。残りの四割は、今のままがいいって。', 'Trong các đối tác đặt hàng bằng FAX, khoảng sáu phần mười trả lời là chuyển sang email hoặc màn hình đặt hàng trên web cũng được. Bốn phần mười còn lại muốn giữ như hiện tại.'],
      ['女', '四割ですか。思ったより多いですね。今年度中にFAXをゼロにする、という目標は、ちょっと厳しそうですね。', 'Bốn phần mười ạ. Nhiều hơn em nghĩ. Mục tiêu đưa FAX về số không trong năm tài chính này có vẻ hơi khó.'],
      ['男', 'そうなんだ。年配の社長さんが一人でやっている店だと、パソコン自体がないところもあるからね。無理に変えてもらって、注文が減ったら元も子もない。', 'Đúng thế. Những cửa hàng do một ông/bà chủ lớn tuổi tự làm thì có chỗ còn chẳng có máy tính. Ép họ đổi mà đơn hàng giảm thì mất cả chì lẫn chài.'],
      ['女', 'では、FAXは残すとして、届いたFAXを手で入力し直す作業を何とかできないでしょうか。毎日二時間近くかかっていますし、打ち間違いも月に何件か出ていますので。', 'Vậy cứ giữ FAX, nhưng có cách nào cho việc gõ lại bằng tay các FAX nhận được không ạ? Ngày nào cũng mất gần hai tiếng, mà tháng nào cũng có vài lỗi gõ nhầm.'],
      ['男', 'うん、それなんだけど、FAXを自動で読み取って、注文データにしてくれるサービスがあるらしい。来月、情報システム部が説明に来てくれることになった。', 'Ừ, chuyện đó thì nghe nói có dịch vụ tự đọc FAX rồi chuyển thành dữ liệu đơn hàng. Tháng sau phòng hệ thống thông tin sẽ sang giải thích.'],
      ['女', 'それは助かります。', 'Thế thì đỡ quá ạ.'],
      ['男', 'だから、目標を変えよう。FAXをなくすことじゃなくて、手入力をなくすこと。移ってもいいと言ってくれた六割には、順番にウェブの画面を案内していく。', 'Nên mình đổi mục tiêu. Không phải bỏ FAX, mà là bỏ việc nhập tay. Còn sáu phần mười đã bảo chuyển cũng được thì lần lượt hướng dẫn họ dùng màn hình web.'],
      ['女', 'わかりました。じゃあ私は、移ってもいいと答えた取引先の一覧を作っておきます。', 'Em hiểu rồi ạ. Vậy em sẽ lập danh sách các đối tác trả lời là chuyển cũng được.'],
    ],
    questions: [
      [
        'この部署の、これからの目標は何ですか。',
        ['今年度中にFAXの注文をなくす', '取引先の一覧を作り終える', '注文を打ち込む手間をなくす', '打ち間違いを月数件に抑える'],
        2,
        'Người đàn ông nói 目標を変えよう: mục tiêu mới là bỏ việc nhập tay (手入力をなくす) — lựa chọn 3 diễn đạt lại. Lựa chọn 1 là mục tiêu cũ, bị thay vì bốn phần mười đối tác muốn giữ FAX. Lựa chọn 2 chỉ là việc người phụ nữ sẽ làm. Lựa chọn 4 lấy con số "vài lỗi mỗi tháng" là tình trạng hiện nay, không phải mục tiêu.',
      ],
    ],
    points: [
      ['受注', 'じゅちゅう', 'nhận đơn đặt hàng'],
      ['元も子もない', 'もともこもない', 'mất cả chì lẫn chài'],
      ['手入力', 'てにゅうりょく', 'nhập liệu bằng tay'],
    ],
  }),
  item('w06', 'sogo-chokai', 3, {
    script: [
      ['女', '先月の防災訓練、参加者が予定の半分だったでしょう。あとで聞いたら、案内のメールを見ていなかった人がずいぶんいたのよ。', 'Buổi diễn tập phòng chống thiên tai tháng trước, người tham gia chỉ bằng một nửa dự kiến nhỉ. Sau đó hỏi ra thì khá nhiều người không xem email thông báo.'],
      ['男', 'ああ、やっぱり。総務からのお知らせだけで、毎日五、六通は出てますからね。どれが大事なのか、わからなくなってるんだと思います。', 'À, quả nhiên. Chỉ riêng thông báo của tổng vụ mỗi ngày đã có năm, sáu email. Chắc mọi người không còn phân biệt được cái nào quan trọng.'],
      ['女', 'そうよね。それで考えたんだけど、お知らせは全部社内のポータルサイトに載せて、メールは出さないことにしたらどうかしら。', 'Đúng vậy. Nên tôi đã nghĩ, hay là đưa hết thông báo lên cổng thông tin nội bộ, không gửi email nữa thì sao.'],
      ['男', 'うーん、ポータルは、自分から見に行かないといけないので、もっと読まれなくなる気がします。', 'Ừm, cổng thông tin thì phải tự mình vào xem, nên tôi e là còn ít người đọc hơn.'],
      ['女', 'そうか……。それもそうね。', 'Vậy à…. Cũng đúng.'],
      ['男', 'あのう、メールをやめるんじゃなくて、まとめるのはどうでしょう。毎週月曜の朝に一通だけ、その週のお知らせを一覧にして送るんです。件名に「今週の総務連絡」って入れておけば、見る習慣がつくと思います。', 'Hay là thế này, không bỏ email mà gom lại. Mỗi sáng thứ Hai chỉ gửi một email, liệt kê thông báo của tuần đó. Tiêu đề ghi "Liên lạc tổng vụ tuần này" thì mọi người sẽ quen xem.'],
      ['女', '一通にまとめる、ね。でも、急ぎのものはどうするの？台風で出社時間が変わる、とか。', 'Gom vào một email nhỉ. Nhưng việc gấp thì sao? Ví dụ bão làm giờ đi làm thay đổi.'],
      ['男', 'そういうものだけは、件名の頭に【至急】をつけて、別に送ります。', 'Riêng những việc đó thì thêm 【至急】 ở đầu tiêu đề và gửi riêng.'],
      ['女', 'いいわね。じゃあ、普段のお知らせは週一回まとめて、急ぎのものだけ個別に送る。それでいきましょう。各部への説明は、来週の部長会で私からします。', 'Được đấy. Vậy thông báo thường ngày thì gom mỗi tuần một lần, chỉ việc gấp mới gửi riêng. Làm thế nhé. Phần giải thích cho các phòng, tôi sẽ nói ở cuộc họp các trưởng bộ phận tuần sau.'],
    ],
    questions: [
      [
        'お知らせの出し方はどうなりましたか。',
        ['ポータルに載せ、メールはやめる', 'すべての件名に【至急】をつける', '各部の部長から部下に説明させる', '通常分は月曜に一通にまとめる'],
        3,
        'Chốt sau じゃあ: thông báo thường ngày gom vào một email mỗi tuần (sáng thứ Hai), việc gấp gửi riêng — lựa chọn 4. Lựa chọn 1 là đề xuất của người phụ nữ, bị bác vì phải tự vào xem nên còn ít người đọc hơn. Lựa chọn 2 sai: 【至急】 chỉ cho việc gấp. Lựa chọn 3 sai: chính người phụ nữ sẽ giải thích ở cuộc họp trưởng bộ phận.',
      ],
    ],
    points: [
      ['防災訓練', 'ぼうさいくんれん', 'diễn tập phòng chống thiên tai'],
      ['件名', 'けんめい', 'tiêu đề (email)'],
      ['至急', 'しきゅう', 'khẩn, gấp'],
      ['個別に', 'こべつに', 'riêng lẻ, từng cái'],
    ],
  }),
  item('w06', 'sogo-chokai', 4, {
    script: [
      ['男', '中村さん、ちょっといいかな。さっき机に置いてくれた伝言メモのことなんだけど。', 'Nakamura, có chút thời gian không? Chuyện tờ ghi lời nhắn bạn để trên bàn lúc nãy.'],
      ['女', 'はい。何か間違っていましたか。', 'Vâng. Có gì sai ạ?'],
      ['男', 'いや、内容はよくわかったよ。北山工業の大島さんから、見積もりの件で電話があって、折り返しがほしい、ってことだよね。', 'Không, nội dung thì hiểu rõ rồi. Ông/bà Ōshima bên Kitayama Kōgyō gọi về chuyện báo giá, muốn được gọi lại, đúng không.'],
      ['女', 'はい、そうです。', 'Vâng, đúng ạ.'],
      ['男', 'ただね、受けた時間が書いてなかったんだ。大島さんは夕方には会社を出ちゃう人だから、何時の電話かで、急いで折り返すかどうかが変わるんだよ。', 'Có điều không ghi giờ nhận điện. Người đó chiều là rời công ty rồi, nên cuộc gọi lúc mấy giờ sẽ quyết định có phải gọi lại gấp hay không.'],
      ['女', 'あっ、すみません。名前と用件ばかり気にしていて。', 'Ôi, em xin lỗi. Em chỉ chú ý tên và nội dung.'],
      ['男', 'それと、電話番号も書いてくれてたけど、大島さんの番号は登録してあるから、そこは毎回じゃなくても大丈夫。', 'Còn nữa, bạn có ghi cả số điện thoại, nhưng số của người đó đã lưu rồi, nên chỗ đó không cần lần nào cũng ghi.'],
      ['男', 'あ、でも、初めての人からの電話だったら、番号は必ず書いてね。そっちは大事だから。', 'À, nhưng nếu là người gọi lần đầu thì nhất định phải ghi số. Cái đó quan trọng.'],
      ['女', 'わかりました。あのう、メモの用紙に、時間を書く欄を作っておいたほうがいいでしょうか。今の用紙だと欄がないので、また忘れてしまいそうで。', 'Em hiểu rồi. Dạ, có nên làm thêm ô ghi giờ trên mẫu giấy nhắn không ạ? Mẫu hiện giờ không có ô nên em sợ lại quên.'],
      ['男', 'お、それはいいね。じゃあ、総務に頼んで、用紙を作り直してもらおうか。……いや、総務は今、総会の準備で忙しいから、中村さんが作ってくれる？形は今のままでいいから、時間の欄だけ足して。', 'Ồ, hay đấy. Vậy nhờ tổng vụ làm lại mẫu nhé. … À không, tổng vụ đang bận chuẩn bị đại hội, Nakamura làm giúp được không? Hình thức giữ nguyên, chỉ thêm ô ghi giờ.'],
      ['女', 'はい、今日中に作ります。', 'Vâng, em sẽ làm trong hôm nay.'],
    ],
    questions: [
      [
        '女の人は、伝言メモをどう変えますか。',
        ['毎回、相手の電話番号を必ず書く', '用紙に受けた時刻の欄を足す', '総務に用紙を作り直させる', '用件をもっと詳しく書く'],
        1,
        'Kết luận: người phụ nữ tự làm lại mẫu giấy, giữ nguyên hình thức, chỉ thêm ô ghi giờ nhận điện — lựa chọn 2. Lựa chọn 1 ngược lời người đàn ông: số đã lưu thì không cần ghi mỗi lần. Lựa chọn 3 là ý vừa nói ra rồi tự rút lại (いや) vì tổng vụ đang bận. Lựa chọn 4 sai: nội dung đã rõ ràng.',
      ],
    ],
    points: [
      ['伝言', 'でんごん', 'lời nhắn'],
      ['折り返す', 'おりかえす', 'gọi lại'],
      ['用件', 'ようけん', 'việc cần nói, nội dung'],
      ['欄', 'らん', 'ô, cột (trên mẫu)'],
    ],
  }),
];

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
      [
        '状況',
        '来週の定例会議の日程を変えることになりました。部長に、どの日なら出席できるかを聞きます。何と言いますか。',
        'Lịch cuộc họp định kỳ tuần sau phải đổi. Bạn hỏi trưởng bộ phận xem ngày nào thì có thể dự. Bạn nói gì?',
      ],
    ],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['部長は、どの日でしたらご出席になれますか。', '部長は、どの日でしたらご出席できますか。', '部長は、どの日でしたらご出席になりましたか。', '部長は、どの日でしたらお休みになれますか。'],
        0,
        'Hỏi khả năng của cấp trên thì dùng tôn kính ご出席になれる. Lựa chọn 2 đúng ý nhưng ご〜できる là khiêm nhường khả năng, dùng cho việc của mình, nên sai chủ thể. Lựa chọn 3 chia quá khứ, trong khi cuộc họp là tuần sau. Lựa chọn 4 hỏi ngày nào được nghỉ, sai nội dung.',
      ],
    ],
    points: [
      ['定例会議', 'ていれいかいぎ', 'cuộc họp định kỳ'],
      ['ご出席になれる', 'ごしゅっせきになれる', '(ngài) có thể dự (tôn kính khả năng)'],
    ],
  }),
  item('w04', 'hatsugen', 2, {
    script: [
      [
        '状況',
        '課長の代わりに社内の打ち合わせに出ました。戻ってきた課長に、打ち合わせの結果を報告したいです。何と言いますか。',
        'Bạn dự buổi bàn việc nội bộ thay trưởng phòng. Bạn muốn báo kết quả cho trưởng phòng vừa quay về. Bạn nói gì?',
      ],
    ],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['打ち合わせの件、ご報告いただいてもよろしいですか。', '打ち合わせの件、ご報告なさってもよろしいですか。', '打ち合わせの件、ご報告してもよろしいですか。', '打ち合わせの件、ご報告はもうお済みですか。'],
        2,
        'Người báo cáo là mình, người nghe là cấp trên, nên dùng khiêm nhường ご報告する. Lựa chọn 2 đúng ý nhưng なさる là tôn kính, đem nâng hành động của chính mình. Lựa chọn 1 lại nhờ trưởng phòng báo cáo. Lựa chọn 4 hỏi trưởng phòng đã báo cáo chưa, trong khi chính bạn đi dự.',
      ],
    ],
    points: [
      ['打ち合わせ', 'うちあわせ', 'buổi bàn bạc công việc'],
      ['ご報告する', 'ごほうこくする', '(tôi) xin báo cáo'],
      ['お済みですか', 'おすみですか', '(ngài) đã xong chưa ạ'],
    ],
  }),
  item('w04', 'hatsugen', 3, {
    script: [
      [
        '状況',
        '会議で使う予定のプロジェクターが故障していました。総務部の先輩に、代わりの機器を借りられないか聞きます。何と言いますか。',
        'Máy chiếu định dùng trong cuộc họp bị hỏng. Bạn hỏi một đàn anh/đàn chị ở phòng tổng vụ xem có mượn được máy khác không. Bạn nói gì?',
      ],
    ],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['代わりのプロジェクターをお貸しできませんか。', '代わりのプロジェクターをお借りになれませんか。', '代わりのプロジェクターをお返しできませんか。', '代わりのプロジェクターをお借りできませんか。'],
        3,
        'Mình là người mượn, nên dùng khiêm nhường お借りする ở dạng khả năng: お借りできませんか. Lựa chọn 2 đúng ý nhưng お借りになる là tôn kính, nâng việc mượn của chính mình. Lựa chọn 1 ngược hướng: đề nghị cho người kia mượn. Lựa chọn 3 nói chuyện trả lại, trong khi chưa mượn gì.',
      ],
    ],
    points: [
      ['故障', 'こしょう', 'hỏng hóc'],
      ['お借りする', 'おかりする', '(tôi) xin mượn'],
      ['お貸しする', 'おかしする', '(tôi) cho mượn'],
    ],
  }),
  item('w04', 'hatsugen', 4, {
    script: [
      [
        '状況',
        '会議を休んだ同僚に、来期の目標について部長が会議で話した内容を伝えます。何と言いますか。',
        'Bạn kể lại cho một đồng nghiệp nghỉ họp những gì trưởng bộ phận đã nói trong cuộc họp về mục tiêu kỳ tới. Bạn nói gì?',
      ],
    ],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['来期の目標のこと、部長が申し上げていましたよ。', '来期の目標のこと、部長がおっしゃっていましたよ。', '来期の目標のこと、部長が伺っていましたよ。', '来期の目標のこと、部長がお聞きになっていましたよ。'],
        1,
        'Nói với đồng nghiệp về lời của cấp trên trong cùng công ty thì vẫn dùng tôn kính おっしゃる cho trưởng bộ phận. Lựa chọn 1 đúng ý nhưng 申し上げる là khiêm nhường, hạ hành động của cấp trên. Lựa chọn 3 và 4 đổi thành "hỏi" và "nghe", trong khi trưởng bộ phận là người nói.',
      ],
    ],
    points: [
      ['来期', 'らいき', 'kỳ tới (kỳ kinh doanh)'],
      ['おっしゃる', 'おっしゃる', 'nói (tôn kính)'],
      ['申し上げる', 'もうしあげる', 'nói (khiêm nhường)'],
    ],
  }),
  item('w04', 'sogo-chokai', 1, {
    script: [
      ['男1', 'それでは始めます。先週、二号ラインで不良品が見つかった件ですが、品質管理課に連絡が入ったのは、見つかってから三時間後でした。今日は報告の流れを見直したいと思います。', 'Bắt đầu nhé. Vụ phát hiện hàng lỗi ở dây chuyền số 2 tuần trước, phòng quản lý chất lượng nhận được tin sau khi phát hiện tới ba tiếng. Hôm nay tôi muốn xem lại quy trình báo cáo.'],
      ['女', 'あのう、今は、見つけた人が報告書を書いて、それを班長に出す決まりになっていますよね。書くのに時間がかかるんです。ラインを止めたまま書くわけにもいかないので、休憩まで待ってしまう人も多くて。', 'Dạ, hiện nay quy định là người phát hiện viết báo cáo rồi nộp cho tổ trưởng phải không ạ. Viết thì mất thời gian. Mà không thể vừa dừng dây chuyền vừa ngồi viết, nên nhiều người đợi tới giờ nghỉ.'],
      ['男2', '品質管理としては、とにかく早く知りたいんです。見つけた人が、うちの課に直接電話をくれればいいんじゃないでしょうか。', 'Bên quản lý chất lượng thì chỉ cần biết càng sớm càng tốt. Người phát hiện gọi thẳng cho phòng chúng tôi là được, phải không?'],
      ['男1', 'うーん、直接というのは、班長が知らないままになりますからね。ラインを止めるかどうかを決めるのは班長なので。', 'Ừm, gọi thẳng thì tổ trưởng lại không biết. Người quyết có dừng dây chuyền hay không là tổ trưởng mà.'],
      ['女', 'でしたら、チャットに専用のグループを作って、全員に流すというのはどうでしょう。', 'Vậy thì lập một nhóm riêng trên chat rồi báo cho tất cả mọi người, được không ạ?'],
      ['男2', 'それだと、ほかの連絡に埋もれてしまいそうですね。工場の中ではスマートフォンも見られませんし。', 'Như thế thì có vẻ sẽ bị chìm giữa các tin khác. Mà trong xưởng cũng không xem điện thoại được.'],
      ['男1', 'そうですね。じゃあ、こうしましょう。見つけた人は、書類は後回しにして、まずその場で班長に声をかける。班長がすぐ品質管理課に電話する。報告書は、その日のうちに書けばいい、ということで。', 'Đúng vậy. Thế thì làm thế này. Người phát hiện gác giấy tờ lại, trước hết gọi tổ trưởng ngay tại chỗ. Tổ trưởng lập tức gọi điện cho phòng quản lý chất lượng. Còn báo cáo thì viết trong ngày là được.'],
      ['女', 'それなら、すぐにできます。', 'Như vậy thì làm được ngay ạ.'],
      ['男2', '報告書の様式も、もう少し短くできないか、こちらで考えてみます。', 'Mẫu báo cáo thì bên tôi sẽ xem có rút gọn thêm được không.'],
    ],
    questions: [
      [
        '不良品を見つけた人は、これからまず何をしますか。',
        ['品質管理課に電話で知らせる', '近くの班長に口頭で伝える', '専用のグループに書き込む', 'その日のうちに報告書を出す'],
        1,
        'Kết luận sau じゃあ、こうしましょう: người phát hiện trước hết gọi tổ trưởng ngay tại chỗ (その場で班長に声をかける), lựa chọn 2 diễn đạt lại điều này. Lựa chọn 1 là đề xuất của người bên quản lý chất lượng, bị bác vì tổ trưởng sẽ không biết; gọi điện là việc của tổ trưởng. Lựa chọn 3 bị bác. Lựa chọn 4 là bước làm sau.',
      ],
    ],
    points: [
      ['不良品', 'ふりょうひん', 'hàng lỗi'],
      ['班長', 'はんちょう', 'tổ trưởng'],
      ['後回しにする', 'あとまわしにする', 'để lại làm sau'],
      ['埋もれる', 'うもれる', 'bị chìm lấp'],
    ],
  }),
  item('w04', 'sogo-chokai', 2, {
    script: [
      ['女', '山下さん、ちょっといいですか。月曜の営業会議のことなんですけど、最近、毎回一時間半近くかかってますよね。', 'Anh Yamashita, có chút thời gian không? Chuyện cuộc họp kinh doanh thứ Hai, dạo này lần nào cũng mất gần một tiếng rưỡi nhỉ.'],
      ['男', 'ええ、僕もそれは気になってました。半分以上が、各自の売上の数字を読み上げる時間なんですよね。', 'Vâng, tôi cũng đang để ý chuyện đó. Hơn một nửa là thời gian từng người đọc số doanh thu của mình.'],
      ['女', 'そうなの。それで、思い切って隔週にしたらどうかと思ってるんですけど。', 'Đúng thế. Nên tôi đang nghĩ hay là mạnh dạn chuyển sang hai tuần một lần.'],
      ['男', 'うーん、隔週ですか。うちは毎週お客様の状況が変わるので、二週間空くと、相談したいことが古くなっちゃうんですよ。', 'Ừm, hai tuần một lần à. Bên mình tình hình khách hàng thay đổi hằng tuần, cách hai tuần thì chuyện cần bàn đã cũ mất rồi.'],
      ['女', 'ああ、そうか。それは困るわね。かといって、時間を短くしようと言っても、結局みんなの話が長くなるのよね。前にも一度、一時間で終わらせようって決めたけど、一か月もしたら元に戻っちゃったし。', 'À, ra vậy. Thế thì không ổn. Nhưng mà bảo rút ngắn thời gian thì rốt cuộc ai cũng nói dài. Trước đây cũng từng quyết là xong trong một tiếng, vậy mà được chừng một tháng đã trở lại như cũ.'],
      ['男', 'ありましたね、それ。', 'Đúng là đã có chuyện đó.'],
      ['男', 'あのう、数字の報告は、会議の前日までに共有のシートに各自で入れておく、というのはどうでしょう。会議では、それを見たうえで、困っている案件だけ話すんです。', 'Hay là thế này: số liệu thì mỗi người tự điền vào bảng dùng chung trước ngày họp. Trong cuộc họp, xem bảng đó xong thì chỉ bàn những vụ đang gặp khó.'],
      ['女', 'なるほど。それなら読み上げる時間はいらないですね。でも、シートに入れ忘れる人が出ないかしら。', 'Ra vậy. Thế thì không cần thời gian đọc số nữa. Nhưng liệu có người quên điền không nhỉ.'],
      ['男', '前日の夕方に、僕がリマインドを送りますよ。', 'Chiều hôm trước tôi sẽ gửi tin nhắc.'],
      ['女', '助かります。じゃあ、会議は毎週のまま、時間は四十五分に区切りましょう。来週から試して、一か月たったら、またみんなの意見を聞くということで。', 'Đỡ quá. Vậy họp vẫn mỗi tuần, nhưng giới hạn trong bốn mươi lăm phút. Thử từ tuần sau, sau một tháng thì hỏi lại ý kiến mọi người.'],
    ],
    questions: [
      [
        '営業会議はどうすることになりましたか。',
        ['隔週にして、困った案件だけ話す', '男の人が全員の数字をまとめて話す', '一か月後にみんなで開き方を決める', '前もって数字を共有し、毎週開く'],
        3,
        'Chốt ở じゃあ: vẫn họp mỗi tuần, số liệu điền sẵn vào bảng chung trước ngày họp — lựa chọn 4 diễn đạt lại. Lựa chọn 1 ghép đề xuất hai tuần một lần (đã bị bác vì chuyện cần bàn sẽ cũ) với ý của người đàn ông. Lựa chọn 2 sai: anh ấy chỉ gửi tin nhắc. Lựa chọn 3 là việc sau một tháng thử, và khi đó chỉ hỏi lại ý kiến.',
      ],
    ],
    points: [
      ['隔週', 'かくしゅう', 'hai tuần một lần'],
      ['読み上げる', 'よみあげる', 'đọc to lên'],
      ['案件', 'あんけん', 'vụ việc, hồ sơ (đang xử lý)'],
      ['区切る', 'くぎる', 'giới hạn, chia ra'],
    ],
  }),
  item('w04', 'sogo-chokai', 3, {
    script: [
      ['女', '部長、今年の新入社員研修の案をお持ちしました。今、お時間よろしいでしょうか。', 'Thưa trưởng bộ phận, tôi mang bản kế hoạch đào tạo nhân viên mới năm nay tới. Bây giờ ngài có thời gian không ạ?'],
      ['男', 'ああ、どうぞ。去年と何か変えたの？', 'À, mời. Có thay đổi gì so với năm ngoái không?'],
      ['女', 'はい。去年は講義が中心だったんですが、アンケートで「座って聞いているだけで退屈だった」という声が多かったので、今年はグループワークを増やしました。', 'Dạ có. Năm ngoái chủ yếu là giảng bài, nhưng khảo sát có nhiều ý kiến "chỉ ngồi nghe nên chán", nên năm nay tôi tăng phần làm việc nhóm.'],
      ['男', 'なるほどね。それはいいと思う。ただね、去年の新人を見ていて僕が一番気になったのは、配属されてから、わからないことを誰にも聞けずに抱え込んでしまう人が多かったことなんだよ。', 'Ra vậy. Cái đó tốt. Có điều, nhìn lứa mới năm ngoái, điều tôi lo nhất là nhiều người sau khi về phòng ban, có gì không hiểu cũng không hỏi được ai, cứ ôm một mình.'],
      ['女', 'ああ、何人か、そういう話は聞いています。仕事が遅れていたのに、締め切りの前日まで誰にも言えなかった、という人もいたそうです。', 'À, tôi cũng có nghe chuyện như vậy với vài người. Nghe nói có người việc bị chậm mà tới tận hôm trước hạn chót vẫn không nói được với ai.'],
      ['男', '研修の中身がおもしろいかどうかより、困ったときに声を上げられるかどうか、そこを大事にしたいんだ。', 'Hơn cả chuyện nội dung đào tạo có hay hay không, tôi muốn coi trọng việc khi gặp khó thì có dám lên tiếng hay không.'],
      ['女', 'では、グループワークの中に、先輩社員に相談する練習を入れるのはいかがでしょうか。', 'Vậy trong phần làm việc nhóm, ta đưa vào bài tập xin ý kiến nhân viên đi trước thì sao ạ?'],
      ['男', 'うん、それと、研修のあとも、一人ひとりに相談役の先輩をつけられないかな。', 'Ừ, thêm nữa, sau đào tạo có gắn cho mỗi người một đàn anh/đàn chị làm người để hỏi han được không nhỉ.'],
      ['女', '各部署に聞いてみないと何とも言えませんが、まずは人数を確認してみます。', 'Phải hỏi các phòng ban mới nói chắc được, trước mắt tôi sẽ kiểm tra số người.'],
      ['男', 'お願いします。それから、研修の期間を延ばす話は、今年は見送りましょう。予算が厳しいので。', 'Nhờ chị. Còn chuyện kéo dài thời gian đào tạo thì năm nay tạm gác lại. Ngân sách eo hẹp.'],
      ['女', 'かしこまりました。では、グループワークの見直しと、相談役の人数の確認、この二つを来週までに進めます。', 'Tôi hiểu rồi ạ. Vậy hai việc là xem lại phần làm việc nhóm và kiểm tra số người hướng dẫn, tôi sẽ làm trước tuần sau.'],
    ],
    questions: [
      [
        '男の人が、新入社員研修で最も大切にしたいことは何ですか。',
        ['困ったときに相談できるようにすること', '退屈しない研修の内容にすること', 'グループワークの時間を増やすこと', '研修の期間を前より長くすること'],
        0,
        'Người đàn ông nói rõ: 困ったときに声を上げられるかどうか、そこを大事にしたい — lựa chọn 1 diễn đạt lại thành "gặp khó thì hỏi được". Lựa chọn 2 là lý do người phụ nữ đổi kế hoạch, ông ấy đặt nó xuống sau (より). Lựa chọn 3 là việc cô ấy đã làm. Lựa chọn 4 bị gác lại vì ngân sách.',
      ],
    ],
    points: [
      ['配属', 'はいぞく', 'phân về phòng ban'],
      ['抱え込む', 'かかえこむ', 'ôm việc một mình'],
      ['声を上げる', 'こえをあげる', 'lên tiếng'],
      ['見送る', 'みおくる', 'tạm gác lại, hoãn'],
    ],
  }),
  item('w04', 'sogo-chokai', 4, {
    script: [
      ['男', 'あ、もしもし、営業二課の村井です。お疲れさまです。明日の展示会の準備会議の件で、伝言を残しておきます。', 'A lô, Murai phòng kinh doanh 2 đây. Cảm ơn vì đã vất vả. Tôi để lại lời nhắn về cuộc họp chuẩn bị hội chợ ngày mai.'],
      ['男', '会議は十時からの予定でしたが、会場の業者さんとの打ち合わせが入ったので、午後一時からに変わりました。場所は同じ、三階の第二会議室です。出席者は、前回のメンバーに物流部の方が一人加わります。会場への搬入の時間を相談したいそうです。', 'Cuộc họp dự định từ mười giờ, nhưng vì có buổi bàn với bên đơn vị lo hội trường nên đổi sang từ một giờ chiều. Địa điểm vẫn vậy, phòng họp số 2 tầng ba. Người dự thì thêm một người bên phòng hậu cần ngoài thành phần lần trước. Nghe nói họ muốn bàn giờ chuyển hàng vào hội trường.'],
      ['男', 'それで、お願いなんですが、会議で使う来場者数の資料、先週の数字のままになっているので、昨日までの事前登録の数に直しておいてもらえますか。登録の数は、ウェブの管理画面で見られます。', 'Rồi, tôi có việc muốn nhờ: tài liệu số khách tham quan dùng trong họp vẫn còn số tuần trước, bạn sửa giúp thành số đăng ký trước tính đến hôm qua được không. Số đăng ký xem được trên màn hình quản lý web.'],
      ['男', 'あ、それと、パンフレットの印刷部数の相談もしたかったんですが、それは資料が直ってからでいいです。去年は二千部刷って、かなり余ってしまったので、今年は登録の数を見てから決めたいんです。', 'À, còn chuyện bàn số lượng in tờ giới thiệu nữa, nhưng việc đó để sau khi sửa xong tài liệu cũng được. Năm ngoái in hai nghìn bản, thừa khá nhiều, nên năm nay tôi muốn xem số đăng ký rồi mới quyết.'],
      ['男', 'それから、会議室のプロジェクターは、私が総務に頼んでおいたので、そちらは何もしなくて大丈夫です。', 'Còn máy chiếu phòng họp thì tôi đã nhờ bên tổng vụ rồi, phần đó bạn không cần làm gì.'],
      ['男', '会議の前に一度目を通したいので、資料ができたら、印刷はしなくていいので、データで送ってください。お昼の十二時ごろまでにもらえると助かります。', 'Tôi muốn xem qua trước cuộc họp, nên làm xong tài liệu thì không cần in, cứ gửi file cho tôi. Nhận được trước khoảng mười hai giờ trưa thì tốt quá.'],
      ['男', 'わからないことがあったら、携帯のほうに電話ください。よろしくお願いします。', 'Có gì chưa rõ thì gọi vào di động của tôi. Nhờ bạn nhé.'],
    ],
    questions: [
      [
        'この伝言を聞いた人は、まず何をしなければなりませんか。',
        ['第二会議室を予約し直す', '印刷部数を村井さんと相談する', '資料の人数を新しい数字に直す', '資料を印刷して村井さんに渡す'],
        2,
        'Việc được nhờ trước tiên là sửa số khách trong tài liệu theo số đăng ký đến hôm qua — lựa chọn 3. Lựa chọn 2 là việc để sau khi sửa xong tài liệu (資料が直ってからでいい). Lựa chọn 4 trái lời nhắn: không cần in, gửi file. Lựa chọn 1 không cần vì phòng họp vẫn như cũ.',
      ],
    ],
    points: [
      ['展示会', 'てんじかい', 'hội chợ, triển lãm'],
      ['事前登録', 'じぜんとうろく', 'đăng ký trước'],
      ['印刷部数', 'いんさつぶすう', 'số bản in'],
      ['目を通す', 'めをとおす', 'xem qua'],
    ],
  }),
];

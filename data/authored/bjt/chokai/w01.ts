import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/** Week 1 — first contact with the test, basic 尊敬語/謙譲語 and greetings. Level: J2 → J1. */
export const W01: BjtItem[] = [
  item('w01', 'bamen', 1, {
    material: {
      kind: 'scene',
      vi: 'Một phòng họp nhỏ. Một nữ nhân viên đứng cạnh bàn, đang đặt từng tập tài liệu trước mặt ba người đang ngồi. Màn hình chiếu phía sau đang tắt. Trên bàn có một bình nước và mấy chiếc cốc giấy chưa rót.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['女性が出席者に資料を配っています。', '女性が会議の資料をコピーしています。', 'スクリーンに資料を映して説明しています。', '女性が出席者にお茶を入れています。'],
        0,
        'Người phụ nữ đang đặt tài liệu trước từng người: 配る = phát, chia cho mỗi người. Câu 3 sai vì màn hình đang tắt. Câu 4 nhắc tới bình nước có trong ảnh nhưng cốc chưa rót, cô ấy cũng không rót gì.',
      ],
    ],
    points: [
      ['配る', 'くばる', 'phát, chia (cho từng người)'],
      ['出席者', 'しゅっせきしゃ', 'người dự họp'],
    ],
  }),
  item('w01', 'bamen', 2, {
    material: {
      kind: 'scene',
      vi: 'Sảnh thang máy của một văn phòng. Một nhóm hai vị khách vừa bước ra khỏi thang máy. Một nhân viên nam đứng trước họ, cúi chào, tay trái cầm một tập hồ sơ. Một nhân viên nữ đứng bên trong thang máy, dùng tay giữ cho cửa thang máy không đóng lại.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['男性がエレベーターのボタンを押しています。', '女性がエレベーターのドアを押さえています。', '来客が社員におじぎをしています。', '男性が来客に書類を手渡しています。'],
        1,
        'Nhân viên nữ dùng tay giữ cửa: ドアを押さえる. Câu 3 đảo chủ thể: người cúi chào là nhân viên, không phải khách. Câu 4 có đúng đồ vật (tập hồ sơ) nhưng anh ta chỉ cầm, không đưa cho ai.',
      ],
    ],
    points: [
      ['押さえる', 'おさえる', 'giữ, đè cho khỏi động'],
      ['おじぎをする', 'おじぎをする', 'cúi chào'],
      ['手渡す', 'てわたす', 'trao tận tay'],
    ],
  }),
  item('w01', 'hatsugen', 1, {
    script: [
      ['状況', 'エレベーターで、ほかの部の部長と一緒になりました。あなたは先に降ります。降りるとき、部長に何と言いますか。', 'Trong thang máy, bạn đi cùng trưởng bộ phận của một bộ phận khác. Bạn xuống trước. Khi bước ra, bạn nói gì với trưởng bộ phận?'],
    ],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['では、お先にお降りになります。', 'では、お先に失礼いたします。', 'では、どうぞお先にお降りください。', 'では、お先にお邪魔いたします。'],
        1,
        'Rời đi trước người trên thì nói お先に失礼いたします (lựa chọn 2). Lựa chọn 1 đúng ý "tôi xuống trước" nhưng dùng tôn kính ngữ お降りになる cho hành động của chính mình. Lựa chọn 3 mời trưởng bộ phận xuống trước, ngược tình huống vì người xuống là bạn. Lựa chọn 4 là câu nói khi bước VÀO chỗ người khác, không dùng khi rời đi.',
      ],
    ],
    points: [
      ['お先に失礼いたします', 'おさきにしつれいいたします', 'tôi xin phép đi trước'],
      ['お邪魔いたします', 'おじゃまいたします', 'xin phép làm phiền (khi bước vào)'],
    ],
  }),
  item('w01', 'hatsugen', 2, {
    script: [
      ['状況', '取引先の部長が、あなたの会社の高田社長に会いに来ました。社長は外出先から戻る途中です。何と言いますか。', 'Trưởng bộ phận của đối tác đến gặp giám đốc Takada của công ty bạn. Giám đốc đang trên đường từ nơi khác trở về. Bạn nói gì?'],
    ],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['社長の高田は、ただいま戻る途中でございます。', '高田社長は、ただいまお戻りになる途中です。', '社長の高田様は、ただいま戻る途中でございます。', '社長の高田は、ただいま戻ってまいりました。'],
        0,
        'Nói về người trong công ty mình với khách thì hạ xuống: 社長の高田 + động từ thường + でございます (lựa chọn 1). Lựa chọn 2 đúng ý nhưng dùng tôn kính ngữ お戻りになる và 高田社長 cho chính giám đốc mình, tức là kính ngữ sai chủ thể. Lựa chọn 3 thêm 様 cho người nhà. Lựa chọn 4 nói giám đốc đã về rồi, sai sự thật vì ông ấy vẫn đang trên đường.',
      ],
    ],
    points: [
      ['社長の高田', 'しゃちょうのたかだ', 'cách gọi giám đốc mình trước người ngoài'],
      ['戻る途中', 'もどるとちゅう', 'đang trên đường về'],
      ['でございます', 'でございます', 'là (lịch sự hơn です)'],
    ],
  }),
  item('w01', 'hatsugen', 3, {
    script: [
      ['状況', '新しい部署に移り、初めて朝礼であいさつをします。最後に、これから仕事を教えてほしいと皆さんに頼みます。何と言いますか。', 'Bạn chuyển sang bộ phận mới và chào mọi người lần đầu trong buổi họp sáng. Cuối cùng, bạn nhờ mọi người chỉ bảo công việc từ nay. Bạn nói gì?'],
    ],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['ご指導のほど、よろしくお願いなさいます。', 'ご指導のほど、よろしくお伝えください。', 'ご指導のほど、よろしくご検討ください。', 'ご指導のほど、よろしくお願いいたします。'],
        3,
        'Nhờ chỉ bảo thì ご指導のほど、よろしくお願いいたします (lựa chọn 4): お願いいたす là khiêm nhường ngữ cho việc mình nhờ. Lựa chọn 1 đúng ý nhưng お願いなさる là tôn kính ngữ, đặt lên chính hành động của mình. Lựa chọn 2 よろしくお伝えください là "cho tôi gửi lời hỏi thăm tới ai đó". Lựa chọn 3 ご検討ください dùng khi nhờ xem xét một đề xuất, không dùng để xin chỉ bảo.',
      ],
    ],
    points: [
      ['朝礼', 'ちょうれい', 'buổi họp đầu giờ sáng'],
      ['ご指導のほど', 'ごしどうのほど', '(xin) sự chỉ bảo'],
      ['よろしくお伝えください', 'よろしくおつたえください', 'cho tôi gửi lời hỏi thăm'],
    ],
  }),
  item('w01', 'hatsugen', 4, {
    script: [
      ['状況', '取引先を訪問した帰りに、先方の担当者が玄関まで見送りに出てくれました。別れるときに、何と言いますか。', 'Khi bạn ra về sau buổi đến thăm đối tác, người phụ trách bên họ tiễn bạn ra tận cửa. Lúc chia tay, bạn nói gì?'],
    ],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['本日はお忙しいところ、お越しいただき恐縮です。', '本日はお忙しいところ、お見送りいたします。', '本日はお忙しいところ、ありがとうございました。', '本日はお忙しいところ、ご苦労様でした。'],
        2,
        'Người được tiếp là bạn, nên cảm ơn vì họ đã dành thời gian: ありがとうございました (lựa chọn 3). Lựa chọn 1 cảm ơn họ đã "đến", nhưng chính bạn mới là người đến thăm. Lựa chọn 2 nói "tôi xin tiễn anh/chị", trong khi người tiễn là đối tác. Lựa chọn 4 ご苦労様 là lời người trên nói với người dưới, không nói với đối tác.',
      ],
    ],
    points: [
      ['見送り', 'みおくり', 'tiễn khách'],
      ['お越しいただく', 'おこしいただく', 'được (ai đó) đến'],
      ['恐縮です', 'きょうしゅくです', 'thật ngại quá, xin cảm ơn'],
    ],
  }),
  item('w01', 'sogo-chokai', 1, {
    script: [
      ['男', 'あのう、来週の大和商事さんへのごあいさつの件なんですが、手土産は駅前のお店の焼き菓子にしようかと思っているんです。', 'À, về chuyến đi chào công ty Thương sự Yamato tuần sau, em định chọn quà là bánh nướng của tiệm trước nhà ga.'],
      ['女', 'ああ、あそこのね。ただ、先方は社員さんが四十人ぐらいいらっしゃるから、一つずつ包んであって、数が多いものがいいと思う。', 'À, tiệm đó à. Có điều bên họ có chừng bốn mươi nhân viên, nên chị nghĩ chọn loại gói từng cái và số lượng nhiều thì hơn.'],
      ['男', 'そうですね。じゃあ、四十個以上入っているものを探してみます。それから、伺う日なんですが、先方の竹内部長から、火曜の午前十時か、木曜の午後二時と言われていまして。', 'Vâng. Vậy em sẽ tìm loại có từ bốn mươi cái trở lên. Còn ngày đến thăm thì trưởng bộ phận Takeuchi bên đó cho hai lựa chọn: mười giờ sáng thứ Ba hoặc hai giờ chiều thứ Năm.'],
      ['女', '火曜の午前は、うちの定例会議があるでしょう。', 'Sáng thứ Ba thì bên mình có họp định kỳ còn gì.'],
      ['男', 'あ、そうでした。では、木曜の二時でお返事します。', 'À, đúng rồi. Vậy em trả lời là hai giờ chiều thứ Năm.'],
      ['女', 'うーん、ちょっと待って。木曜は私、午前中に名古屋で打ち合わせがあって、戻りが二時ぎりぎりになりそうなのよ。', 'Ừm, khoan đã. Thứ Năm buổi sáng chị có cuộc họp ở Nagoya, về tới nơi chắc sát hai giờ.'],
      ['男', 'そうなんですか。それなら、定例会議のほうを…いえ、会議は動かせないですよね。', 'Vậy ạ. Thế thì dời buổi họp định kỳ… à không, họp thì không dời được nhỉ.'],
      ['女', 'そうね。それより、竹内部長にほかの日のご都合を伺ってみてくれる？来週が難しければ、再来週の月曜でも構わないって。', 'Ừ. Thay vào đó em hỏi trưởng bộ phận Takeuchi xem ngày khác có tiện không nhé. Nếu tuần sau khó thì thứ Hai tuần sau nữa cũng được.'],
      ['男', '承知しました。では、竹内部長にご都合を伺うメールをすぐお送りします。お菓子は、日にちが決まってから買いに行きます。', 'Em hiểu rồi. Vậy em sẽ gửi ngay email hỏi lịch của trưởng bộ phận Takeuchi. Bánh thì khi chốt ngày rồi em mới đi mua.'],
      ['女', 'うん、お願い。それから、こちらの都合で日程を変えていただくんだから、メールにはおわびも一言入れておいてね。', 'Ừ, nhờ em. Còn nữa, vì mình nhờ họ đổi lịch theo ý bên mình, nên trong email nhớ thêm một câu xin lỗi nhé.'],
    ],
    questions: [
      [
        '男の人はこのあとまず何をしますか。',
        ['焼き菓子を買いに行く', '木曜二時で返事をする', '先方に別の日を尋ねる', '定例会議の日を変える'],
        2,
        'Hai giờ thứ Năm bị bác vì người phụ nữ về không kịp, và anh ấy chốt: 竹内部長にご都合を伺うメールをすぐお送りします, tức là hỏi đối tác ngày khác (lựa chọn 3). Lựa chọn 1 là bước làm SAU: bánh để khi chốt ngày mới mua. Lựa chọn 2 là ý anh ấy nói ra rồi bị gạt. Lựa chọn 4 anh ấy tự rút lại vì họp định kỳ không dời được.',
      ],
    ],
    points: [
      ['手土産', 'てみやげ', 'quà mang theo khi đến thăm'],
      ['定例会議', 'ていれいかいぎ', 'cuộc họp định kỳ'],
      ['ご都合を伺う', 'ごつごうをうかがう', 'hỏi xem (đối phương) có tiện không'],
      ['再来週', 'さらいしゅう', 'tuần sau nữa'],
    ],
  }),
  item('w01', 'sogo-chokai', 2, {
    script: [
      ['男', 'すみません、明日の展示会で、初めて名刺交換をすることになりまして…。本で読んだんですが、名刺は相手より低い位置で出す、というのが大事なんですよね。', 'Xin lỗi chị, ngày mai ở triển lãm em sẽ lần đầu trao đổi danh thiếp… Em đọc sách thấy bảo quan trọng là đưa danh thiếp thấp hơn của đối phương, đúng không ạ?'],
      ['女', 'うん、それも礼儀ではあるね。でも、展示会みたいに立ったまま、人が多いところで交換するときは、高さを気にしすぎると、かえってぎこちなくなるのよ。', 'Ừ, đó cũng là phép lịch sự. Nhưng ở chỗ đông người, đứng mà trao như triển lãm thì để ý độ cao quá lại thành lóng ngóng.'],
      ['男', 'そうなんですか。', 'Vậy ạ.'],
      ['女', '私が一番気をつけてほしいのは、いただいた名刺をすぐしまわないこと。展示会だと、話しながらすぐポケットに入れちゃう人が多いんだけど、お話が終わるまでは名刺入れの上に置いて、手に持っておくの。', 'Điều chị muốn em chú ý nhất là đừng cất danh thiếp nhận được đi ngay. Ở triển lãm nhiều người vừa nói chuyện vừa nhét ngay vào túi, nhưng cho tới khi nói chuyện xong thì đặt nó lên hộp danh thiếp và cầm trên tay.'],
      ['男', 'なるほど。あと、名刺は百枚持っていけば足りますかね。', 'Ra vậy. Còn nữa, em mang một trăm tấm danh thiếp có đủ không ạ?'],
      ['女', '去年は二日で百五十枚ぐらい使ったから、二百枚持っていって。それから、お名前の読み方がわからなかったら、その場で「何とお読みすればよろしいでしょうか」って伺えばいいからね。', 'Năm ngoái hai ngày dùng khoảng một trăm năm mươi tấm, nên em mang hai trăm tấm đi. À, nếu không biết đọc tên người ta thế nào thì cứ hỏi ngay tại chỗ: "Xin hỏi tên anh/chị đọc thế nào ạ?"'],
      ['男', 'はい。あ、それと、相手の方が二人以上いらっしゃるときは、どなたから交換すればいいんでしょうか。', 'Vâng. À, còn nữa, khi bên kia có từ hai người trở lên thì em trao với ai trước ạ?'],
      ['女', '役職が上の方からね。わからなければ、先に名刺を出してくださった方から順番に、で大丈夫よ。', 'Với người có chức vụ cao hơn trước. Nếu không biết thì cứ lần lượt từ người đưa danh thiếp ra trước là được.'],
      ['男', 'わかりました。じゃあ、名刺の出し方の練習は…。','Em hiểu rồi. Vậy còn luyện cách đưa danh thiếp thì…'],
      ['女', 'それは今日、帰る前に五分だけやりましょう。', 'Cái đó thì hôm nay trước khi về mình tập năm phút thôi.'],
    ],
    questions: [
      [
        '女の人が名刺交換で一番大切だと言っていることは何ですか。',
        ['受け取った名刺を手元に置くこと', '名刺を相手より低く出すこと', '読めない名前をその場で聞くこと', '名刺を二百枚用意すること'],
        0,
        'Người phụ nữ nói rõ 一番気をつけてほしいのは、いただいた名刺をすぐしまわないこと: giữ danh thiếp trên tay cho tới khi nói chuyện xong (lựa chọn 1). Lựa chọn 2 là điều người đàn ông đọc trong sách; chị ấy chỉ coi là một phép lịch sự và còn nói để ý quá sẽ lóng ngóng. Lựa chọn 3 và 4 đều có nói tới nhưng chỉ là lời dặn thêm, không phải điều "quan trọng nhất".',
      ],
    ],
    points: [
      ['名刺交換', 'めいしこうかん', 'trao đổi danh thiếp'],
      ['名刺入れ', 'めいしいれ', 'hộp đựng danh thiếp'],
      ['ぎこちない', 'ぎこちない', 'lóng ngóng, gượng'],
      ['何とお読みすればよろしいでしょうか', 'なんとおよみすればよろしいでしょうか', 'xin hỏi (tên này) đọc thế nào ạ'],
    ],
  }),
  item('w01', 'sogo-chokai', 3, {
    script: [
      ['女', '皆さん、おはようございます。人事部の小池です。今日から三日間のビジネスマナー研修を担当します。最初に、予定をお話しします。', 'Chào mọi người. Tôi là Koike phòng nhân sự. Từ hôm nay tôi phụ trách khoá đào tạo phép tắc công sở trong ba ngày. Trước tiên tôi xin nói về lịch.'],
      ['女', '一日目の今日は、敬語の基本です。尊敬語と謙譲語の区別は、皆さん、頭ではわかっていると思います。ただ、実際の会話になると、とっさに出てこないものです。ですから今回は、覚えることより、口に出して使うことに時間をかけます。', 'Hôm nay, ngày thứ nhất, là kính ngữ cơ bản. Phân biệt tôn kính ngữ và khiêm nhường ngữ thì chắc mọi người đã hiểu trong đầu. Nhưng khi nói chuyện thật thì lại không bật ra kịp. Vì vậy lần này chúng ta dành thời gian để nói thành lời hơn là học thuộc.'],
      ['女', '二日目は電話応対です。最初は、教室で電話の受け方を説明するだけの予定でした。ですが、去年の参加者から、説明だけでは不安だという声が多かったので、実際に内線電話を使って練習することにしました。', 'Ngày thứ hai là nghe điện thoại. Ban đầu dự định chỉ giải thích cách nghe máy trong lớp. Nhưng nhiều người tham gia năm ngoái nói chỉ nghe giải thích thì vẫn lo, nên chúng tôi quyết định tập thật bằng điện thoại nội bộ.'],
      ['女', '三日目は来客応対です。そして最終日の午後には、お一人ずつ、受付でお客様をお迎えして、応接室にご案内し、担当者に取り次ぐところまでを、続けてやっていただきます。', 'Ngày thứ ba là tiếp khách. Và buổi chiều ngày cuối, từng người một sẽ làm liền một mạch: đón khách ở quầy lễ tân, dẫn vào phòng tiếp khách, rồi báo cho người phụ trách.'],
      ['女', 'これが研修の仕上げです。三日間で学んだことを、一つの流れの中で、迷わずにできるようになること。これを目標にしてください。なお、テキストは毎朝お配りしますので、前もって読んでおく必要はありません。では、始めましょう。', 'Đây là phần tổng kết của khoá. Làm được những gì đã học trong ba ngày trong một chuỗi liền mạch mà không lúng túng — hãy lấy đó làm mục tiêu. Ngoài ra, tài liệu sẽ phát mỗi sáng nên không cần đọc trước. Nào, chúng ta bắt đầu.'],
    ],
    questions: [
      [
        'この研修で、参加者が目標にすることは何ですか。',
        ['尊敬語と謙譲語を区別して覚える', '電話の受け方の説明を理解する', 'テキストを事前に読んでおく', '来客応対を一連の流れでこなす'],
        3,
        'Người hướng dẫn nói mục tiêu là làm liền một chuỗi từ đón khách tới báo người phụ trách mà không lúng túng: 一つの流れの中で、迷わずにできるようになること (lựa chọn 4). Lựa chọn 1 là điều học viên đã hiểu trong đầu; khoá này coi trọng nói ra hơn học thuộc. Lựa chọn 2 là kế hoạch cũ đã đổi sang tập thật. Lựa chọn 3 bị nói rõ là không cần.',
      ],
    ],
    points: [
      ['とっさに', 'とっさに', 'ngay tức thì, trong tích tắc'],
      ['内線', 'ないせん', 'điện thoại nội bộ'],
      ['取り次ぐ', 'とりつぐ', 'chuyển lời, báo cho người phụ trách'],
      ['仕上げ', 'しあげ', 'phần hoàn thiện, tổng kết'],
    ],
  }),
  item('w01', 'sogo-chokai', 4, {
    script: [
      ['女', 'あのう、一つ伺いたいんですが、社内では、課長のことを「中島課長」とお呼びすればいいんでしょうか。前の会社ではそうだったので。', 'À, cho em hỏi một chút: trong công ty thì em gọi trưởng phòng là "trưởng phòng Nakajima" có được không ạ? Ở công ty cũ em gọi như vậy.'],
      ['男', 'ああ、うちは去年から、役職じゃなくて「さん」付けで呼ぶことになったんだよ。社長のことも「村田さん」って。', 'À, công ty mình từ năm ngoái đã đổi sang gọi bằng "san" thay vì chức vụ. Giám đốc cũng gọi là "anh/chị Murata".'],
      ['女', '社長もですか。ちょっと言いにくいですね…。', 'Cả giám đốc ạ? Hơi khó mở miệng nhỉ…'],
      ['男', 'みんな最初はそう言うね。でも、社外の方の前では話が別だよ。お客様に、うちの課長のことを話すときは？', 'Ai lúc đầu cũng nói thế. Nhưng trước mặt người ngoài công ty thì khác. Khi nói với khách về trưởng phòng của mình thì sao?'],
      ['女', 'ええと…「中島さんは」…いえ、「課長の中島は」ですね。', 'Ừm… "anh/chị Nakajima thì"… à không, "trưởng phòng Nakajima (của chúng tôi)" ạ.'],
      ['男', 'そう。社内の人を低めに言うのが、社外の方への基本だから。それと、たまに「課長」とだけ呼ぶ人もいるけど、それもやめようってことになってる。', 'Đúng. Với người ngoài thì nguyên tắc là nói người nhà mình thấp xuống. Còn nữa, thỉnh thoảng có người chỉ gọi "trưởng phòng" trống không, nhưng việc đó cũng đã thống nhất là bỏ.'],
      ['女', 'はい。では、社内では「中島さん」ですね。でも、お客様と一緒の会議ではどうなりますか。', 'Vâng. Vậy trong công ty là "anh/chị Nakajima". Nhưng trong cuộc họp có cả khách thì thế nào ạ?'],
      ['男', 'いい質問だね。最初は僕も、社内の人どうしなら「中島さん」でいいと思ってたんだけど、課長から、お客様がいる場では社外向けの言い方にそろえるように言われてね。だから、そこでは「課長の中島」。', 'Câu hỏi hay đấy. Lúc đầu anh cũng nghĩ người trong công ty với nhau thì gọi "Nakajima-san" là được, nhưng trưởng phòng dặn ở chỗ có khách thì thống nhất theo cách nói với người ngoài. Nên ở đó là "trưởng phòng Nakajima (của chúng tôi)".'],
      ['女', 'わかりました。じゃあ、書類の宛名は…。', 'Em hiểu rồi. Vậy tên người nhận trên giấy tờ thì…'],
      ['男', '課長あての書類は、今までどおり「中島課長」と書くことになってるから、気をつけて。', 'Giấy tờ gửi trưởng phòng thì vẫn viết "trưởng phòng Nakajima" như trước, em chú ý nhé.'],
    ],
    questions: [
      [
        '女の人は、お客様と一緒の会議で、中島課長のことを何と言いますか。',
        ['「中島課長」と呼ぶ', '「課長の中島」と言う', '「中島さん」と呼ぶ', '「課長」とだけ呼ぶ'],
        1,
        'Người đàn ông kể lúc đầu anh nghĩ gọi 中島さん là được, nhưng đã được dặn khi có khách thì dùng cách nói với người ngoài: 課長の中島 (lựa chọn 2). Lựa chọn 3 là cách gọi trong nội bộ, và cũng là ý ban đầu đã bị sửa. Lựa chọn 1 chỉ dùng khi ghi tên người nhận trên giấy tờ. Lựa chọn 4 là cách gọi đã thống nhất bỏ.',
      ],
    ],
    points: [
      ['役職', 'やくしょく', 'chức vụ'],
      ['さん付け', 'さんづけ', 'gọi kèm "san"'],
      ['社外向け', 'しゃがいむけ', 'dành cho người ngoài công ty'],
      ['宛名', 'あてな', 'tên người nhận'],
    ],
  }),
];

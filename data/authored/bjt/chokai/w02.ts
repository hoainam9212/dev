import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/** Week 2 — telephone and receiving visitors. Level: J2 → J1. */
export const W02: BjtItem[] = [
  item('w02', 'bamen', 1, {
    material: {
      kind: 'scene',
      vi: 'Một nữ nhân viên ngồi ở bàn làm việc, tai áp ống nghe điện thoại, tay phải cầm bút viết lên một tờ giấy ghi lời nhắn. Màn hình máy tính trước mặt cô đang mở nhưng cô không nhìn vào. Bàn bên cạnh không có ai ngồi.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['女性が電話をかけようとしています。', '女性がパソコンに入力しています。', '女性が電話で話しながらメモを取っています。', '女性が伝言のメモを同僚に渡しています。'],
        2,
        'Cô ấy đang nghe điện thoại và ghi chép: メモを取る. Câu 1 sai vì cuộc gọi đã diễn ra, không phải sắp gọi. Câu 2 nhắc tới máy tính có trong ảnh nhưng cô không dùng. Câu 4 đúng đồ vật (giấy nhắn) nhưng sai hành động, bàn bên cạnh cũng không có ai.',
      ],
    ],
    points: [
      ['メモを取る', 'めもをとる', 'ghi chép'],
      ['伝言', 'でんごん', 'lời nhắn'],
    ],
  }),
  item('w02', 'bamen', 2, {
    material: {
      kind: 'scene',
      vi: 'Phòng tiếp khách. Một vị khách nữ ngồi trên ghế sofa, trước mặt có một tập tài liệu của khách đặt trên bàn. Một nam nhân viên đang khom người đặt tách trà xuống bàn trước mặt khách. Một nữ nhân viên ngồi ở ghế đối diện khách.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['来客がお茶を飲んでいます。', '男性が来客に資料を見せています。', '社員が二人並んで座っています。', '男性が来客にお茶を出しています。'],
        3,
        'Nhân viên nam đang đặt tách trà cho khách: お茶を出す = mời trà. Câu 1 sai vì trà vừa được đặt xuống, khách chưa uống. Câu 2: tài liệu trên bàn là của khách và anh ta không cầm nó. Câu 3 sai vì chỉ một nhân viên đang ngồi.',
      ],
    ],
    points: [
      ['お茶を出す', 'おちゃをだす', 'mời trà, đưa trà'],
      ['応接室', 'おうせつしつ', 'phòng tiếp khách'],
    ],
  }),
  item('w02', 'hatsugen', 1, {
    script: [
      ['状況', '電話で取引先の人に、担当の者が戻ったら、こちらから折り返し電話をすると伝えたいです。何と言いますか。', 'Trên điện thoại, bạn muốn nói với người bên đối tác rằng khi người phụ trách quay lại, bên mình sẽ gọi lại. Bạn nói gì?'],
    ],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['戻りましたら、こちらからお電話なさいます。', '戻りましたら、こちらにお電話いただけますか。', '戻りましたら、こちらからお伺いいたします。', '戻りましたら、こちらからお電話いたします。'],
        3,
        'Việc gọi lại là của phía mình, nên dùng khiêm nhường ngữ お電話いたします (lựa chọn 4). Lựa chọn 1 đúng ý nhưng なさる là tôn kính ngữ, đem dùng cho người phụ trách bên mình — sai chủ thể. Lựa chọn 2 lại nhờ đối tác gọi tới, ngược với điều muốn nói. Lựa chọn 3 nói sẽ đến tận nơi, không phải gọi điện.',
      ],
    ],
    points: [
      ['折り返し', 'おりかえし', 'gọi lại (sau khi nhận cuộc gọi)'],
      ['担当の者', 'たんとうのもの', 'người phụ trách (bên mình, khiêm nhường)'],
    ],
  }),
  item('w02', 'hatsugen', 2, {
    script: [
      ['状況', '約束のない客が受付に来て、田村部長に会いたいと言っています。部長が会えるかどうか、これから確かめます。客に何と言いますか。', 'Một vị khách không có hẹn đến quầy lễ tân, nói muốn gặp trưởng bộ phận Tamura. Bạn sắp đi xác nhận xem trưởng bộ phận có gặp được không. Bạn nói gì với khách?'],
    ],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['確認いたしますので、少々お待ちいただけますか。', '確認なさいますので、少々お待ちいただけますか。', '確認いたしますので、少々お待ちしております。', '確認いたしますので、少々お待ちいたしますか。'],
        0,
        'Mình đi xác nhận: 確認いたします (khiêm nhường), rồi nhờ khách đợi: お待ちいただけますか (lựa chọn 1). Lựa chọn 2 đúng ý nhưng dùng tôn kính ngữ なさる cho việc của chính mình. Lựa chọn 3 nghĩa là "tôi đang đợi anh/chị", ngược vai. Lựa chọn 4 dùng khiêm nhường ngữ いたす cho hành động đợi của khách.',
      ],
    ],
    points: [
      ['少々お待ちいただけますか', 'しょうしょうおまちいただけますか', 'xin vui lòng đợi một chút'],
      ['お待ちしております', 'おまちしております', 'chúng tôi đang chờ (khiêm nhường)'],
    ],
  }),
  item('w02', 'hatsugen', 3, {
    script: [
      ['状況', 'お客様を三階の応接室へ案内します。一階のエレベーターの前で、これから一緒に上がることを伝えます。何と言いますか。', 'Bạn dẫn khách tới phòng tiếp khách ở tầng ba. Trước thang máy ở tầng một, bạn báo là sẽ cùng đi lên. Bạn nói gì?'],
    ],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['三階までご案内になります。どうぞこちらへ。', '三階でお待ちしております。どうぞこちらへ。', '三階までご案内いたします。どうぞこちらへ。', '三階までご案内いたします。どうぞお構いなく。'],
        2,
        'Mình dẫn khách: ご案内いたします, rồi mời: どうぞこちらへ (lựa chọn 3). Lựa chọn 1 đúng ý nhưng ご〜になる là tôn kính ngữ, đặt lên việc dẫn đường của chính mình. Lựa chọn 2 nói "tôi chờ ở tầng ba", trong khi mình đang cùng đi. Lựa chọn 4 お構いなく là câu của KHÁCH (xin đừng bận tâm), chủ nhà không nói.',
      ],
    ],
    points: [
      ['ご案内いたします', 'ごあんないいたします', 'tôi xin dẫn đường'],
      ['お構いなく', 'おかまいなく', 'xin đừng bận tâm (khách nói)'],
    ],
  }),
  item('w02', 'hatsugen', 4, {
    script: [
      ['状況', '電話で取引先の人と話していますが、相手の声が小さくて、よく聞こえません。もう少し大きな声で話してほしいです。何と言いますか。', 'Bạn đang nói điện thoại với người bên đối tác, nhưng giọng họ nhỏ, bạn nghe không rõ. Bạn muốn họ nói to hơn một chút. Bạn nói gì?'],
    ],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['恐れ入りますが、お電話が少々混み合っておりますが。', '恐れ入りますが、お電話が少々遠いようなのですが。', '恐れ入りますが、お電話を少々お待ちいただけますか。', '恐れ入りますが、お電話が少々切れたようなのですが。'],
        1,
        'Nghe không rõ thì nói tránh, đổ cho đường dây: お電話が遠いようなのですが (lựa chọn 2), người nghe sẽ hiểu là cần nói to hơn. Lựa chọn 1 混み合っております là câu báo đường dây đang bận, dùng khi khách phải chờ. Lựa chọn 3 nhờ đối tác giữ máy chờ, không liên quan. Lựa chọn 4 nói cuộc gọi đã bị ngắt, trong khi hai bên vẫn đang nói chuyện.',
      ],
    ],
    points: [
      ['お電話が遠い', 'おでんわがとおい', 'nghe điện thoại không rõ'],
      ['混み合う', 'こみあう', 'đông, (đường dây) bận'],
    ],
  }),
  item('w02', 'sogo-chokai', 1, {
    script: [
      ['女', '林さん、お帰りなさい。外出中に、北斗運輸の吉岡様からお電話がありました。', 'Anh Hayashi, anh về rồi ạ. Lúc anh ra ngoài, anh Yoshioka bên Vận tải Hokuto có gọi điện.'],
      ['男', 'ああ、ありがとう。何かおっしゃってた？', 'À, cảm ơn em. Anh ấy có nói gì không?'],
      ['女', '来週の納品のことで、トラックが一台しか手配できなくなったそうで、木曜と金曜の二回に分けてもいいか、確認したいとのことでした。折り返しお電話がほしいそうです。', 'Về đợt giao hàng tuần sau, nghe nói bên đó chỉ bố trí được một xe tải, nên muốn xác nhận xem chia làm hai lần thứ Năm và thứ Sáu có được không. Anh ấy muốn anh gọi lại.'],
      ['男', '二回か…。倉庫のほうは大丈夫かな。', 'Hai lần à… Bên kho không biết có ổn không.'],
      ['女', '倉庫の前田さんには、念のため私から聞いておきました。金曜は棚卸しで、午後は受け取れないそうです。', 'Em đã hỏi trước anh Maeda bên kho cho chắc rồi. Thứ Sáu kho kiểm kê nên buổi chiều không nhận hàng được.'],
      ['男', 'そうか、助かるよ。じゃあ、金曜の午前ならいいってことだね。すぐ吉岡さんに電話するよ。', 'Vậy à, đỡ cho anh quá. Thế là sáng thứ Sáu thì được nhỉ. Anh gọi ngay cho anh Yoshioka.'],
      ['女', 'あ、ただ、吉岡様は三時から五時まで会議だとおっしゃっていました。今、三時半ですので…。', 'À, nhưng anh Yoshioka nói từ ba giờ tới năm giờ anh ấy họp. Bây giờ là ba rưỡi rồi…'],
      ['男', 'ああ、じゃあ電話は無理だね。それなら、条件をメールで送っておけば、会議のあとで見てもらえるか。', 'À, vậy gọi điện là không được rồi. Thế thì gửi điều kiện qua email trước, họp xong anh ấy sẽ đọc được.'],
      ['女', 'それと、吉岡様、会議が終わったら、もう一度こちらにお電話をくださるとおっしゃっていました。', 'Với lại anh Yoshioka nói họp xong sẽ gọi lại cho bên mình một lần nữa.'],
      ['男', 'そうなの？それなら、金曜は午前のみ、という条件を先に知らせておけば、電話で話が早いね。じゃあ、そうしよう。', 'Thật à? Vậy nếu báo trước điều kiện "thứ Sáu chỉ buổi sáng" thì lúc nói điện thoại sẽ nhanh gọn. Được, làm vậy đi.'],
      ['女', 'では、吉岡様からお電話があったら、林さんにおつなぎしますね。', 'Vậy khi anh Yoshioka gọi tới, em sẽ chuyển máy cho anh nhé.'],
      ['男', 'うん、頼むよ。今日は夕方までずっと席にいるから。', 'Ừ, nhờ em. Hôm nay anh ngồi ở bàn suốt tới chiều tối.'],
    ],
    questions: [
      [
        '男の人はこのあとまず何をしますか。',
        ['吉岡さんに電話をかける', '金曜の条件をメールで送る', '倉庫の前田さんに確認する', '吉岡さんからの電話を待つ'],
        1,
        'Anh ấy định gọi ngay nhưng đối tác đang họp tới năm giờ, nên đổi sang gửi điều kiện "thứ Sáu chỉ buổi sáng" qua email trước (lựa chọn 2). Lựa chọn 1 là ý ban đầu đã bị bỏ. Lựa chọn 3 là việc người phụ nữ đã làm xong. Lựa chọn 4 là bước SAU: đối tác sẽ gọi lại khi họp xong.',
      ],
    ],
    points: [
      ['手配', 'てはい', 'bố trí, sắp xếp'],
      ['棚卸し', 'たなおろし', 'kiểm kê hàng tồn'],
      ['念のため', 'ねんのため', 'cho chắc'],
      ['とのことでした', 'とのことでした', '(người đó) nói là… (thuật lại lời nhắn)'],
    ],
  }),
  item('w02', 'sogo-chokai', 2, {
    script: [
      ['男', '来月から入る受付のタブレットの件ですが、受付の人を減らせるのが一番大きいですよね。', 'Về chiếc máy tính bảng cho quầy lễ tân sẽ lắp từ tháng sau, lợi lớn nhất là giảm được người ở quầy, phải không chị?'],
      ['女', 'うーん、実は人を減らす予定はないんです。初めてのお客様や、ご年配の方には、やっぱり人がご案内したほうが安心していただけますから。', 'Ừm, thật ra không có kế hoạch giảm người đâu. Với khách đến lần đầu hay người lớn tuổi, có người dẫn đường thì họ vẫn yên tâm hơn.'],
      ['男', 'そうなんですか。じゃあ、何のために入れるんでしょう。', 'Vậy ạ. Thế thì lắp để làm gì ạ?'],
      ['女', '今は、お客様がいらっしゃると、受付から担当者の内線に電話しますよね。でも担当者が席にいないと、あちこちに電話して探すことになって、十分以上お待たせしてしまうこともあるんです。', 'Hiện giờ khi khách tới, quầy lễ tân gọi vào máy nội bộ của người phụ trách. Nhưng nếu người đó không ở bàn thì phải gọi khắp nơi để tìm, có khi để khách đợi hơn mười phút.'],
      ['男', 'ありますね。先週も、私のお客様をずいぶんお待たせしてしまって。', 'Đúng là có. Tuần trước khách của tôi cũng phải đợi khá lâu.'],
      ['女', 'タブレットでお客様に担当者の名前を選んでいただくと、担当者の携帯に直接知らせが届きます。どこにいても、すぐお迎えに行けるんです。私は、これが一番助かる点だと思っています。', 'Nếu khách chọn tên người phụ trách trên máy tính bảng thì thông báo sẽ tới thẳng điện thoại di động của người đó. Dù đang ở đâu cũng đi đón ngay được. Tôi nghĩ đây là điểm có ích nhất.'],
      ['男', 'なるほど。入館証もタブレットで出せるんですか。', 'Ra vậy. Thẻ ra vào cũng in từ máy tính bảng được ạ?'],
      ['女', 'ええ、印刷はできますけど、それは今の紙の入館証とあまり変わりませんね。あとは、来客の記録が自動で残るので、月末の集計が少し楽になるぐらいかな。', 'Ừ, in được, nhưng cũng không khác mấy so với thẻ giấy bây giờ. Ngoài ra thì lịch sử khách đến được lưu tự động, nên việc tổng hợp cuối tháng nhẹ hơn một chút thôi.'],
      ['男', 'わかりました。では、課内にも説明しておきます。', 'Tôi hiểu rồi. Vậy tôi sẽ giải thích cho cả phòng.'],
    ],
    questions: [
      [
        '女の人は、タブレットを入れる一番の利点は何だと言っていますか。',
        ['受付の人数を減らせる', '入館証が印刷できる', '来客の集計が楽になる', '担当者をすぐ呼べる'],
        3,
        'Người phụ nữ nói điểm có ích nhất là thông báo tới thẳng điện thoại người phụ trách, nên đi đón khách được ngay, khách không phải đợi (lựa chọn 4). Lựa chọn 1 là ý của người đàn ông, bị bác vì không định giảm người. Lựa chọn 2 bị nói là không khác thẻ giấy mấy. Lựa chọn 3 có nói tới nhưng chỉ là lợi ích phụ (少し楽になるぐらい).',
      ],
    ],
    points: [
      ['ご年配の方', 'ごねんぱいのかた', 'người lớn tuổi (kính trọng)'],
      ['お待たせする', 'おまたせする', 'để (ai đó) phải đợi'],
      ['集計', 'しゅうけい', 'tổng hợp số liệu'],
    ],
  }),
  item('w02', 'sogo-chokai', 3, {
    script: [
      ['女', '課長、あさっての東和製作所の社長のご来社の件で、ご相談なんですが。', 'Trưởng phòng, em muốn bàn về việc giám đốc Xưởng chế tác Towa đến công ty mình ngày kia ạ.'],
      ['男1', 'うん、どうした？', 'Ừ, sao vậy?'],
      ['女', '当日、エレベーターが点検で、午後一時から三時まで止まるそうなんです。ご来社は二時なので…。', 'Hôm đó thang máy bảo trì, nghe nói ngừng từ một giờ tới ba giờ chiều. Giám đốc đến lúc hai giờ nên…'],
      ['男1', 'ああ、それは困ったね。応接室は八階だからなあ。', 'Ôi, phiền thật. Phòng tiếp khách lại ở tầng tám.'],
      ['女', 'はい。それで、一階の会議室に変えてはどうかと思いまして。', 'Vâng. Nên em nghĩ hay là đổi sang phòng họp tầng một.'],
      ['男1', '一階の会議室か。でも、あそこは狭いし、窓の外が駐車場だろう。社長をお迎えするには、ちょっとね。時間をずらしていただくのはどうかな。', 'Phòng họp tầng một à. Nhưng chỗ đó chật, ngoài cửa sổ lại là bãi đỗ xe. Đón giám đốc ở đó thì hơi… Hay nhờ họ đổi giờ thì sao?'],
      ['女', 'それも考えたんですが、先方の秘書の方に伺ったら、その日は二時しか空いていないそうです。', 'Em cũng nghĩ tới rồi, nhưng hỏi thư ký bên đó thì hôm ấy giám đốc chỉ trống lúc hai giờ.'],
      ['男2', 'あのう、横から失礼します。止まるのは正面の二台だけですよ。裏の業務用エレベーターは動いています。', 'À, xin lỗi chen ngang. Chỉ có hai thang ở mặt trước ngừng thôi. Thang máy chở hàng ở phía sau vẫn chạy.'],
      ['男1', '業務用か…。中はきれいなの？', 'Thang chở hàng à… Bên trong có sạch sẽ không?'],
      ['男2', '先月、内装を新しくしたので、問題ないと思います。ただ、乗り場が裏の通用口のそばなので、お迎えする場所は変えないといけませんね。', 'Tháng trước mới làm lại nội thất nên chắc không vấn đề gì. Có điều chỗ lên thang ở cạnh cửa phụ phía sau, nên phải đổi chỗ đón khách.'],
      ['女', 'では、正面の受付ではなく、通用口でお待ちして、そこからご案内するということですね。', 'Vậy là không đón ở quầy lễ tân mặt trước mà chờ ở cửa phụ, rồi dẫn khách từ đó, phải không ạ?'],
      ['男1', 'そうだね。応接室はそのままにしよう。秘書の方にも、到着していただく場所を一言お伝えしておいて。', 'Ừ. Phòng tiếp khách thì giữ nguyên. Em báo thêm cho thư ký bên đó một câu về chỗ xe đến nhé.'],
    ],
    questions: [
      [
        '社長の来社について、何を変えることになりましたか。',
        ['先方を出迎える場所', '先方が来社する時間', '打ち合わせをする部屋', 'エレベーターの点検時間'],
        0,
        'Thang chở hàng phía sau vẫn chạy nên giữ phòng tầng tám, chỉ đổi chỗ đón khách từ quầy lễ tân sang cửa phụ (lựa chọn 1). Lựa chọn 2 bị loại vì đối tác chỉ trống lúc hai giờ. Lựa chọn 3 là đề xuất phòng họp tầng một bị trưởng phòng bác. Lựa chọn 4 là việc của toà nhà, không ai đổi được.',
      ],
    ],
    points: [
      ['ご来社', 'ごらいしゃ', '(khách) đến công ty'],
      ['横から失礼します', 'よこからしつれいします', 'xin lỗi chen vào'],
      ['通用口', 'つうようぐち', 'cửa phụ (dành cho nhân viên)'],
      ['業務用', 'ぎょうむよう', 'dùng cho công việc, chở hàng'],
    ],
  }),
  item('w02', 'sogo-chokai', 4, {
    script: [
      ['男', 'もしもし、いつもお世話になっております。株式会社みどり設計の小野と申します。営業部の松井様に、明日の打ち合わせの件でお電話いたしました。ご不在のようですので、伝言を残させていただきます。', 'A lô, cảm ơn quý công ty luôn giúp đỡ. Tôi là Ono, công ty Thiết kế Midori. Tôi gọi cho anh/chị Matsui phòng kinh doanh về cuộc họp ngày mai. Có vẻ anh/chị không có mặt nên tôi xin để lại lời nhắn.'],
      ['男', '明日は午後一時に、二名でお伺いする予定でしたが、弊社の技術担当の者も同席させていただきたく、三名でお伺いしてもよろしいでしょうか。終わりの時間は、三名になりましても、予定どおり三時までと考えております。', 'Ngày mai, theo dự định chúng tôi sẽ đến hai người lúc một giờ chiều, nhưng chúng tôi muốn cho cả người phụ trách kỹ thuật cùng dự, nên xin phép được đến ba người có được không ạ? Giờ kết thúc thì dù là ba người, chúng tôi vẫn dự tính tới ba giờ như kế hoạch.'],
      ['男', 'それに伴いまして、図面を画面に映してご説明したいので、プロジェクターをお借りできましたら大変助かります。図面のほうは、こちらで印刷して人数分持ってまいります。','Kèm theo đó, vì chúng tôi muốn chiếu bản vẽ lên màn hình để giải thích, nếu mượn được máy chiếu thì thật quý. Bản vẽ thì bên tôi sẽ tự in đủ cho mọi người và mang tới.'],
      ['男', 'あ、それから、先日、駐車場を一台分お願いしておりましたが、明日は電車で伺うことにいたしましたので、駐車場は結構です。お手数をおかけして申し訳ございません。お時間は変わらず一時でございます。', 'À, còn nữa, hôm trước tôi có nhờ giữ một chỗ đỗ xe, nhưng ngày mai chúng tôi quyết định đi tàu điện nên không cần chỗ đỗ xe nữa. Xin lỗi vì đã làm phiền. Giờ vẫn là một giờ như cũ.'],
      ['男', '何かございましたら、私の携帯、〇九〇の…いえ、失礼いたしました、明日の午前は外出しておりますので、メールでご連絡いただけますでしょうか。どうぞよろしくお願いいたします。', 'Nếu có gì, xin gọi vào di động của tôi, số không chín không… à không, xin lỗi, sáng mai tôi đi ra ngoài, nên xin liên lạc qua email giúp tôi. Xin cảm ơn.'],
    ],
    questions: [
      [
        '松井さんは、明日の打ち合わせのために何を用意しますか。',
        ['二人分の席とプロジェクター', '三人分の席と駐車場', '三人分の席とプロジェクター', '三人分の席と図面の資料'],
        2,
        'Số người tăng từ hai lên ba, đối tác nhờ mượn máy chiếu, nên cần chỗ cho ba người và máy chiếu (lựa chọn 3). Lựa chọn 1 vẫn theo số người cũ. Lựa chọn 2 có chỗ đỗ xe, đã được huỷ vì họ đi tàu điện. Lựa chọn 4 sai vì bản vẽ do bên ông Ono tự mang tới.',
      ],
    ],
    points: [
      ['伝言を残す', 'でんごんをのこす', 'để lại lời nhắn'],
      ['同席', 'どうせき', 'cùng dự (cuộc họp)'],
      ['それに伴いまして', 'それにともないまして', 'kèm theo việc đó'],
      ['図面', 'ずめん', 'bản vẽ'],
    ],
  }),
];

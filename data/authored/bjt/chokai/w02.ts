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
      ['状況', '取引先から電話がかかってきましたが、相手の名前がよく聞き取れませんでした。何と言いますか。', 'Đối tác gọi điện tới nhưng bạn nghe không rõ tên người gọi. Bạn nói gì?'],
    ],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        [
          '恐れ入りますが、もう一度お名前を伺ってもよろしいでしょうか。',
          'すみません、お名前は何でしたっけ。',
          '失礼ですが、お名前をおっしゃってもよろしいでしょうか。',
          'お声が小さいので、もう少し大きい声でお願いします。',
        ],
        0,
        'Xin hỏi lại tên bằng 伺う (khiêm nhường của 聞く) + てもよろしいでしょうか. Câu 2 quá thân mật. Câu 3 trộn sai: てもよろしいでしょうか là xin phép cho mình, nhưng おっしゃる là hành động của khách. Câu 4 đổ lỗi cho người gọi.',
      ],
    ],
    points: [
      ['伺う', 'うかがう', 'hỏi, nghe (khiêm nhường)'],
      ['聞き取る', 'ききとる', 'nghe ra, nghe rõ'],
    ],
  }),
  item('w02', 'hatsugen', 2, {
    script: [
      ['状況', '取引先から佐藤課長あてに電話がありました。課長は外出していて、四時に戻る予定です。何と言いますか。', 'Đối tác gọi điện tìm trưởng phòng Sato. Trưởng phòng đang ra ngoài, dự kiến bốn giờ về. Bạn nói gì?'],
    ],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        [
          '課長の佐藤さんは外出していらっしゃいます。',
          'あいにく佐藤は外出しておりまして、四時に戻る予定でございます。',
          '佐藤課長はただ今お出かけになっております。四時にお戻りになります。',
          '佐藤は外出中です。四時にもう一度お電話してください。',
        ],
        1,
        'Với người ngoài công ty, gọi sếp mình bằng họ trần (佐藤) và dùng khiêm nhường ngữ (しております). あいにく làm mềm tin không tốt. Câu 1 và 3 dùng tôn kính ngữ cho người phía mình. Câu 4 dùng đúng họ trần nhưng bảo khách gọi lại, thay vì đề nghị bên mình gọi lại.',
      ],
    ],
    points: [
      ['あいにく', 'あいにく', 'không may là, tiếc là'],
      ['外出しております', 'がいしゅつしております', 'đang ra ngoài (khiêm nhường)'],
    ],
  }),
  item('w02', 'hatsugen', 3, {
    script: [
      ['状況', '来客を応接室に案内し、お茶を出しました。担当者が来るまで待ってもらいます。何と言いますか。', 'Bạn đã dẫn khách vào phòng tiếp khách và mời trà. Bạn nhờ khách đợi tới khi người phụ trách đến. Bạn nói gì?'],
    ],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        [
          '担当者がすぐ参りますので、お待ちしてください。',
          'こちらでお待ちになってもいいですよ。',
          '担当者がいらっしゃるまで、少々お待ちください。',
          '担当の者がすぐに参りますので、こちらで少々お待ちいただけますか。',
        ],
        3,
        'Người phía mình đến thì dùng 参る, còn nhờ khách đợi thì お待ちいただけますか. Câu 1 dùng お待ちする (khiêm nhường) cho hành động của khách. Câu 2 là cho phép khách. Câu 3 dùng いらっしゃる (tôn kính) cho người trong công ty mình.',
      ],
    ],
    points: [
      ['参る', 'まいる', 'đến, đi (khiêm nhường)'],
      ['担当の者', 'たんとうのもの', 'người phụ trách (bên mình, khiêm tốn)'],
    ],
  }),
  item('w02', 'hatsugen', 4, {
    script: [
      ['状況', '電話で、明日の会議の時間が変わったという伝言を頼まれました。電話を切る前に、内容を確認したいです。何と言いますか。', 'Qua điện thoại, bạn được nhờ nhắn lại rằng giờ họp ngày mai đã đổi. Trước khi cúp máy, bạn muốn xác nhận nội dung. Bạn nói gì?'],
    ],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        [
          'わかりました。たぶん大丈夫だと思います。',
          'では、申し伝えます。失礼いたします。',
          '念のため復唱いたします。明日の会議は午後二時からに変更、ということでよろしいでしょうか。',
          '念のため、最初からもう一度おっしゃっていただけますか。',
        ],
        2,
        '復唱する = nhắc lại để xác nhận, kèm nội dung cụ thể. Câu 2 lịch sự nhưng cúp máy mà không xác nhận như tình huống yêu cầu. Câu 4 bắt khách nói lại toàn bộ. Câu 1 vừa suồng sã vừa mơ hồ.',
      ],
    ],
    points: [
      ['念のため', 'ねんのため', 'để cho chắc'],
      ['復唱する', 'ふくしょうする', 'nhắc lại (để xác nhận)'],
      ['申し伝える', 'もうしつたえる', 'chuyển lời (khiêm nhường)'],
    ],
  }),
  item('w02', 'sogo-chokai', 1, {
    script: [
      ['男', 'お電話ありがとうございます。日の出食品、営業部でございます。', 'Cảm ơn quý khách đã gọi. Phòng kinh doanh, Thực phẩm Hinode xin nghe.'],
      ['女', 'いつもお世話になっております。丸山商会の青木と申します。恐れ入りますが、西村様はいらっしゃいますか。', 'Cảm ơn anh luôn giúp đỡ. Tôi là Aoki của Thương hội Maruyama. Xin lỗi, anh Nishimura có ở đó không ạ?'],
      ['男', '申し訳ございません。西村はただ今、ほかの電話に出ておりまして。終わり次第、折り返しお電話いたしましょうか。', 'Xin lỗi chị. Anh Nishimura đang nghe một cuộc gọi khác. Xong việc anh ấy gọi lại cho chị nhé?'],
      ['女', 'いえ、これから外に出てしまうので、伝言をお願いできますか。明日の打ち合わせなんですが、こちらの都合で、十時から十一時に変えていただけないかと。', 'Không, tôi sắp phải ra ngoài nên anh nhắn giúp tôi được không? Buổi trao đổi ngày mai, vì lý do bên tôi, liệu có thể đổi từ mười giờ sang mười một giờ không ạ.'],
      ['男', '明日の打ち合わせを、十時から十一時に変更ということですね。', 'Buổi trao đổi ngày mai đổi từ mười giờ sang mười một giờ, đúng không ạ.'],
      ['女', 'はい。場所はそのままで結構です。もし十一時が難しければ、夕方までに私の携帯にご連絡いただけますか。番号は西村様がご存じですので。', 'Vâng. Địa điểm giữ nguyên. Nếu mười một giờ khó thì nhờ anh ấy liên lạc vào di động của tôi trước chiều tối. Số thì anh Nishimura biết rồi.'],
      ['男', '承知いたしました。西村に申し伝えます。私、山下が承りました。', 'Tôi hiểu rồi ạ. Tôi sẽ chuyển lời cho anh Nishimura. Tôi là Yamashita, đã nhận lời nhắn.'],
    ],
    questions: [
      [
        '青木さんの用件は何ですか。',
        ['打ち合わせを一時間遅らせてほしい', '打ち合わせの場所を変えてほしい', '西村さんに折り返し電話してほしい', '打ち合わせを中止したい'],
        0,
        'Đổi từ mười giờ sang mười một giờ = lùi một tiếng. Địa điểm giữ nguyên (そのままで結構です). Lời đề nghị gọi lại bị từ chối (いえ), vì chị Aoki sắp ra ngoài.',
      ],
      [
        '十一時が難しい場合、西村さんはどうしますか。',
        ['丸山商会の会社に電話する', '山下さんに伝言を頼む', '明日の十時に丸山商会へ行く', '夕方までに青木さんの携帯に連絡する'],
        3,
        'Chị Aoki nói nếu khó thì 夕方までに私の携帯にご連絡いただけますか. Gọi về công ty là bẫy: chị ấy sắp ra ngoài, nên muốn được gọi vào di động.',
      ],
    ],
    points: [
      ['折り返し', 'おりかえし', 'gọi lại (sau khi nhận cuộc gọi)'],
      ['承る', 'うけたまわる', 'nhận (lời nhắn, yêu cầu), khiêm nhường'],
      ['ご存じ', 'ごぞんじ', 'biết (tôn kính)'],
    ],
  }),
  item('w02', 'sogo-chokai', 2, {
    script: [
      ['女', '明日、北原電機の社長がお見えになるので、準備をお願いしたいんですが。', 'Ngày mai giám đốc Điện cơ Kitahara sẽ đến, tôi muốn nhờ anh chuẩn bị.'],
      ['男', 'はい。何時にいらっしゃいますか。', 'Vâng. Mấy giờ ông ấy đến ạ?'],
      ['女', '二時の予定です。応接室は一番広いAを使ってください。それと、お茶じゃなくてコーヒーをお出しして。社長はコーヒーがお好きだそうだから。', 'Dự kiến hai giờ. Dùng phòng tiếp khách A, phòng rộng nhất. Với lại, mời cà phê chứ không phải trà nhé. Nghe nói giám đốc thích cà phê.'],
      ['男', 'わかりました。受付にも連絡しておきます。お迎えは私が一階でいたしましょうか。', 'Vâng. Tôi cũng sẽ báo cho lễ tân. Tôi xuống tầng một đón ông ấy nhé?'],
      ['女', 'いえ、社長がいらっしゃるんだから、私も一緒に玄関までお迎えに出ます。時間になったら声をかけてください。', 'Không, giám đốc đến thì tôi cũng cùng ra tận cửa đón. Đến giờ thì anh gọi tôi nhé.'],
      ['男', '承知しました。', 'Vâng, tôi hiểu rồi.'],
    ],
    questions: [
      [
        '来客に何を出しますか。',
        ['お茶とお菓子', 'コーヒー', 'お茶', 'お茶かコーヒーか、その場で聞く'],
        1,
        'Câu お茶じゃなくてコーヒーをお出しして loại trà và chọn cà phê, vì giám đốc thích cà phê. Lựa chọn "hỏi tại chỗ" không được nhắc tới; mọi thứ đã quyết trước.',
      ],
      [
        '社長が来る時間になったら、男の人はまず何をしますか。',
        ['一人で一階に迎えに行く', '受付に連絡する', '女の人に声をかける', '応接室にコーヒーを運ぶ'],
        2,
        'Ý định đi đón một mình bị gạt đi (いえ…私も一緒に), và chị dặn 時間になったら声をかけてください. Báo lễ tân là việc anh ấy làm trước, không phải lúc đến giờ.',
      ],
    ],
    points: [
      ['お見えになる', 'おみえになる', 'đến (tôn kính)'],
      ['お迎えに出る', 'おむかえにでる', 'ra đón'],
      ['声をかける', 'こえをかける', 'gọi, báo một tiếng'],
    ],
  }),
];

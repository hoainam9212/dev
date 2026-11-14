import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/**
 * Full test 3 (week 15), 聴解: 5 場面把握 + 10 発言聴解 + 10 総合聴解 questions = 25.
 * Mixes the themes of all 16 weeks, a little harder than mock2; about a third of the questions are J1+.
 */
export const MOCK3: BjtItem[] = [
  // ── 場面把握 ──
  item('mock3', 'bamen', 1, {
    material: {
      kind: 'scene',
      vi: 'Trong nhà kho. Một nhân viên đội mũ bảo hộ cầm máy quét cầm tay, chĩa vào mã vạch dán trên một thùng các-tông. Thùng đặt trên một tấm pallet cùng vài thùng khác đã xếp sẵn. Ở góc kho có một chiếc xe nâng đang đỗ, không có người lái.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['フォークリフトで荷物を運んでいます。', '段ボール箱のバーコードを読み取っています。', '段ボール箱にラベルを貼っています。', 'パレットに箱を積み上げています。'],
        1,
        'Người trong ảnh chĩa máy quét vào mã vạch: バーコードを読み取る (lựa chọn 2). Lựa chọn 3 dễ nhầm vì có nhãn trên thùng, nhưng nhãn đã dán sẵn, không ai đang dán. Xe nâng đỗ không người lái; các thùng trên pallet đã xếp xong, không ai đang chất thêm.',
      ],
    ],
    points: [
      ['読み取る', 'よみとる', 'đọc (mã, dữ liệu bằng máy)'],
      ['積み上げる', 'つみあげる', 'chất chồng lên'],
    ],
  }),
  item('mock3', 'bamen', 2, {
    material: {
      kind: 'scene',
      vi: 'Phòng họp. Một nữ nhân viên đứng cạnh bảng trắng, tay cầm bút dạ đang viết các con số lên bảng. Hai nam nhân viên ngồi ở bàn; một người đang giơ tay phải lên, người kia nhìn vào tập tài liệu trước mặt.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['女性がホワイトボードの字を消しています。', '男性が資料を配っています。', '男性の一人が手を挙げています。', '全員が席に着いています。'],
        2,
        'Một trong hai người ngồi đang giơ tay: 手を挙げる (lựa chọn 3). Lựa chọn 1 đúng đồ vật nhưng sai hành động: cô ấy đang viết, không xoá. Lựa chọn 4 sai vì người phụ nữ đang đứng. Tài liệu đã nằm trên bàn, không ai phát.',
      ],
    ],
    points: [
      ['手を挙げる', 'てをあげる', 'giơ tay'],
      ['席に着く', 'せきにつく', 'ngồi vào chỗ'],
    ],
  }),
  item('mock3', 'bamen', 3, {
    material: {
      kind: 'scene',
      vi: 'Trước cửa văn phòng một công ty. Một người đàn ông mặc vest đứng thẳng, hai tay cầm một túi giấy đựng hộp quà, đưa về phía một người phụ nữ. Người phụ nữ đang chìa hai tay ra định nhận. Cả hai không cầm danh thiếp.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['男性が女性に手土産を渡そうとしています。', '女性が紙袋から品物を取り出しています。', '男性が深くお辞儀をしています。', '二人が名刺を交換しています。'],
        0,
        'Người đàn ông đưa túi quà, người phụ nữ chìa tay định nhận: 手土産を渡そうとしている (lựa chọn 1). Lựa chọn 2 dễ nhầm vì có túi giấy, nhưng túi vẫn ở tay người đàn ông và chưa ai lấy đồ ra. Ông ta đứng thẳng, không cúi chào; không ai cầm danh thiếp.',
      ],
    ],
    points: [
      ['手土産', 'てみやげ', 'quà mang theo khi đến thăm'],
      ['お辞儀', 'おじぎ', 'cúi chào'],
    ],
  }),
  item('mock3', 'bamen', 4, {
    material: {
      kind: 'scene',
      vi: 'Dây chuyền sản xuất trong nhà máy. Một nữ công nhân đeo găng tay cầm một sản phẩm vừa nhấc khỏi băng chuyền, giơ lên ngang mắt để xem kỹ. Băng chuyền vẫn đang chạy. Bên cạnh có một chiếc hộp ghi chữ 不良品, trong hộp trống.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['女性が製品を箱に詰めています。', '女性がベルトコンベアを止めています。', '女性が製品を手に取って点検しています。', '女性が不良品を箱に入れています。'],
        2,
        'Cô ấy nhấc sản phẩm lên xem kỹ: 手に取って点検している (lựa chọn 3). Lựa chọn 4 dễ nhầm vì có hộp ghi 不良品, nhưng hộp còn trống và sản phẩm vẫn ở trên tay. Băng chuyền vẫn chạy nên lựa chọn 2 sai.',
      ],
    ],
    points: [
      ['点検する', 'てんけんする', 'kiểm tra (máy, sản phẩm)'],
      ['不良品', 'ふりょうひん', 'hàng lỗi'],
    ],
  }),
  item('mock3', 'bamen', 5, {
    material: {
      kind: 'scene',
      vi: 'Bàn làm việc. Một nam nhân viên kẹp ống nghe điện thoại bàn giữa vai và tai, hai tay đang gõ bàn phím. Trên viền màn hình có dán sẵn một tờ giấy nhớ màu vàng. Bên cạnh có một cuốn sổ tay đang mở và một cây bút đặt trên đó.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['男性が付箋をモニターに貼っています。', '男性が受話器を置こうとしています。', '男性がノートにメモを書きながら電話で話しています。', '男性が電話をしながらキーボードを打っています。'],
        3,
        'Ống nghe kẹp ở vai, hai tay gõ phím: 電話をしながらキーボードを打っている (lựa chọn 4). Lựa chọn 3 dễ nhầm vì sổ và bút ở ngay cạnh, nhưng bút đang nằm trên sổ, tay anh ta ở trên bàn phím. Giấy nhớ đã dán sẵn.',
      ],
    ],
    points: [
      ['付箋', 'ふせん', 'giấy nhớ'],
      ['受話器', 'じゅわき', 'ống nghe điện thoại'],
    ],
  }),

  // ── 発言聴解 ──
  item('mock3', 'hatsugen', 1, {
    script: [['状況', '他社との合同会議で、あなたが発表する番になりましたが、プロジェクターの映像が映りません。参加者に待ってもらいます。何と言いますか。', 'Trong cuộc họp chung với công ty khác, đến lượt bạn trình bày thì máy chiếu không lên hình. Bạn xin người dự chờ. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        [
          '機械の調子が悪いから、ちょっと待ってて。',
          '申し訳ございません。少々お時間をいただけますでしょうか。',
          'プロジェクターが映らないようですので、皆様にはご了承いたします。',
          '皆様、どなたかプロジェクターを直していただけませんか。',
        ],
        1,
        'Xin lỗi trước, rồi xin thêm chút thời gian bằng お時間をいただけますでしょうか (lựa chọn 2). Lựa chọn 3 dễ nhầm vì nghe trang trọng, nhưng ご了承いたします là "tôi chấp nhận", sai chiều: phải là ご了承ください. Lựa chọn 1 quá suồng sã với người công ty khác; lựa chọn 4 đẩy việc của mình cho người dự họp.',
      ],
    ],
    points: [
      ['不具合', 'ふぐあい', 'trục trặc'],
      ['機材', 'きざい', 'thiết bị, máy móc'],
    ],
  }),
  item('mock3', 'hatsugen', 2, {
    script: [['状況', '取引先の担当者から、「御社の新しい担当の方、いつも丁寧で助かっています」とほめられました。その担当者はあなたの部下です。何と言いますか。', 'Người phụ trách bên đối tác khen: "Người phụ trách mới bên quý công ty lúc nào cũng chu đáo, chúng tôi rất đỡ việc." Người đó là cấp dưới của bạn. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        [
          '恐れ入ります。本人にも申し伝えます。',
          'ありがとうございます。部下も喜ばれると思います。',
          'そうでございますか。あの者はいつも丁寧でいらっしゃいますから。',
          'はい。私がしっかり指導しておりますので。',
        ],
        0,
        'Nhận lời khen một cách khiêm tốn (恐れ入ります) và hứa chuyển lời bằng khiêm nhường ngữ 申し伝える (lựa chọn 1). Lựa chọn 2 dễ nhầm vì lịch sự, nhưng 喜ばれる là tôn kính ngữ dùng cho cấp dưới của mình trước mặt người ngoài. Lựa chọn 3 cũng tôn kính người phía mình (いらっしゃる). Lựa chọn 4 tự khen mình.',
      ],
    ],
    points: [
      ['申し伝える', 'もうしつたえる', 'chuyển lời (khiêm nhường)'],
      ['恐れ入る', 'おそれいる', 'cảm ơn, ngại quá (khi được khen)'],
    ],
  }),
  item('mock3', 'hatsugen', 3, {
    script: [['状況', '課長が三日間の出張から戻りました。留守の間に、取引先から課長あてに電話が三件ありました。それを伝えます。何と言いますか。', 'Trưởng phòng vừa đi công tác ba ngày về. Trong lúc vắng, đối tác gọi cho trưởng phòng ba cuộc. Bạn báo lại. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        [
          'おかえり。電話が三つあったよ。',
          '出張中に、三件お電話をなさいました。',
          'お帰りなさい。お留守の間に、お電話が三件ありました。こちらがメモです。',
          'お疲れ様でした。お留守中にお電話が三件ありましたので、すぐに折り返してさしあげてください。',
        ],
        2,
        'Chào khi cấp trên về, báo số cuộc gọi và đưa giấy ghi nội dung (lựa chọn 3). Lựa chọn 4 dễ nhầm vì có お疲れ様でした, nhưng ra lệnh cho cấp trên gọi lại, lại dùng さしあげて (cho người khác) không đúng chỗ. Lựa chọn 2 dùng なさいました: thành ra chính trưởng phòng gọi điện. Lựa chọn 1 quá suồng sã.',
      ],
    ],
    points: [
      ['留守', 'るす', 'vắng nhà, vắng mặt'],
      ['折り返す', 'おりかえす', 'gọi lại'],
    ],
  }),
  item('mock3', 'hatsugen', 4, {
    script: [['状況', '会議で、同僚が新しい販売方法を提案しました。あなたは、考え方には賛成ですが、費用の見積もりが甘いのではないかと心配しています。何と言いますか。', 'Trong cuộc họp, đồng nghiệp đề xuất một cách bán hàng mới. Bạn đồng ý với ý tưởng, nhưng lo là dự tính chi phí còn lạc quan. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        [
          'その案には反対です。お金がかかりすぎます。',
          'とてもいい案だと思います。費用のことは細かいので、あとで経理部のほうで考えてもらえばいいでしょう。',
          '方向性には賛成です。ただ、費用の見積もりについて、根拠を一点伺ってもよろしいでしょうか。',
          '費用さえ何とかなれば、どんな案でも構わないと思います。',
        ],
        2,
        'Khẳng định phần đồng ý trước, rồi nêu điều lo ngại dưới dạng câu hỏi về căn cứ, không bác bỏ thẳng (lựa chọn 3). Lựa chọn 1 phản đối cả ý tưởng mà mình đồng ý. Lựa chọn 2 dễ nhầm vì mở đầu bằng lời khen, nhưng gạt mất mối lo về chi phí. Lựa chọn 4 coi nhẹ nội dung đề xuất.',
      ],
    ],
    points: [
      ['見積もりが甘い', 'みつもりがあまい', 'ước tính còn lạc quan, chưa chặt'],
      ['根拠', 'こんきょ', 'căn cứ'],
    ],
  }),
  item('mock3', 'hatsugen', 5, {
    script: [['状況', '別の部署の先輩に、急ぎで販売データを出してもらいたいです。今日の三時までに必要です。何と言いますか。', 'Bạn cần một tiền bối ở phòng khác gửi gấp dữ liệu bán hàng, trước ba giờ chiều nay. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        [
          '今日の三時までにデータを出してください。急ぎなので。',
          'お忙しいところ恐縮です。お手すきの際で結構ですので、いつか販売データをいただけますか。',
          'データを三時までにご用意してさしあげてください。',
          'お忙しいところすみません。急で恐縮ですが、三時までに販売データをいただけますか。',
        ],
        3,
        'Xin lỗi vì làm phiền và vì gấp, nói rõ hạn ba giờ, nhờ bằng câu hỏi (lựa chọn 4). Lựa chọn 2 dễ nhầm vì rất lịch sự, nhưng お手すきの際で結構 (lúc nào rảnh cũng được) trái với việc cần trước ba giờ. Lựa chọn 1 là mệnh lệnh với tiền bối. Lựa chọn 3 dùng さしあげて sai chỗ.',
      ],
    ],
    points: [
      ['お手すきの際', 'おてすきのさい', 'khi nào rảnh tay'],
      ['急で', 'きゅうで', 'gấp, đột ngột'],
    ],
  }),
  item('mock3', 'hatsugen', 6, {
    script: [['状況', '課長から「この資料、明日の朝までに英語にしておいて」と頼まれました。今夜は別の仕事の締め切りがあり、明日の朝までは無理です。代わりの案を出して断ります。何と言いますか。', 'Trưởng phòng nhờ: "Tài liệu này dịch sang tiếng Anh trước sáng mai giúp nhé." Tối nay bạn có hạn chót của việc khác, nên trước sáng mai là không thể. Bạn từ chối và đưa phương án khác. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        [
          'すみませんが、翻訳は私の担当ではありませんので、ほかの方にお願いしていただけますか。',
          'かしこまりました。明日の朝までにいたします。',
          '申し訳ありません、今夜は別件の締め切りがあって……。明日のお昼まででもよろしいでしょうか。',
          '英語は苦手なものですから、申し訳ないのですが、課長がなさったほうが早いと思います。',
        ],
        2,
        'Xin lỗi, nêu lý do, rồi đưa phương án thay thế cụ thể (trưa mai) để cấp trên chọn (lựa chọn 3). Lựa chọn 2 nhận lời trong khi biết là không làm được, không phải lời từ chối. Lựa chọn 1 từ chối thẳng, không có phương án. Lựa chọn 4 đẩy việc lại cho cấp trên.',
      ],
    ],
    points: [
      ['別件', 'べっけん', 'việc khác'],
      ['仕上げる', 'しあげる', 'làm xong, hoàn thiện'],
    ],
  }),
  item('mock3', 'hatsugen', 7, {
    script: [['状況', '取引先の工場を見学させてもらえることになりました。担当者にお礼を言い、当日は三人で行くことを伝えます。何と言いますか。', 'Đối tác đồng ý cho bên bạn tham quan nhà máy. Bạn cảm ơn người phụ trách và báo hôm đó sẽ có ba người đến. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        [
          'このたびは工場見学をご快諾いただき、ありがとうございます。当日は三名で伺います。',
          '工場を見学してさしあげることになり、楽しみにしております。三名で参ります。',
          '見学させてくれて、ありがとうございます。三人で行きます。',
          '工場見学をお許しになり、ありがとうございます。当日は三名でいらっしゃいます。',
        ],
        0,
        'ご快諾いただき (được vui vẻ nhận lời) để cảm ơn, rồi báo số người bằng 伺います (khiêm nhường) (lựa chọn 1). Lựa chọn 2 dùng 見学してさしあげる như thể mình làm ơn cho đối tác. Lựa chọn 4 dễ nhầm vì nghe trang trọng, nhưng いらっしゃいます là tôn kính ngữ cho chính nhóm mình. Lựa chọn 3 quá suồng sã.',
      ],
    ],
    points: [
      ['快諾', 'かいだく', 'vui vẻ nhận lời'],
      ['伺う', 'うかがう', 'đến thăm (khiêm nhường)'],
    ],
  }),
  item('mock3', 'hatsugen', 8, {
    script: [['状況', 'あなたは今日の会議で新しい仕入れ先を決めたいと思っていました。ところが部長が「この件は、もう少し時間をかけて考えたほうがいいかもしれないね」と言いました。部長の考えに沿って答えます。何と言いますか。', 'Bạn muốn chốt nhà cung cấp mới ngay trong cuộc họp hôm nay. Nhưng trưởng bộ phận nói: "Việc này có lẽ nên dành thêm chút thời gian suy nghĩ." Bạn trả lời theo ý trưởng bộ phận. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        [
          'では、本日の決定は見送り、次回までに追加の資料をそろえます。',
          'では、今日中に決めてしまいましょう。',
          '部長がお考えになる時間は、ございませんか。',
          'わかりました。それでは、この件はなかったことにして、今の仕入れ先との取引を続けます。',
        ],
        0,
        '～かもしれないね là cách nói mềm, nhưng ý thật là "hôm nay chưa quyết". Trả lời đúng ý: hoãn quyết định và chuẩn bị thêm tài liệu (lựa chọn 1). Lựa chọn 2 bỏ qua ý trưởng bộ phận. Lựa chọn 4 dễ nhầm vì cũng là chấp nhận, nhưng huỷ hẳn việc, trong khi trưởng bộ phận chỉ muốn thêm thời gian.',
      ],
    ],
    points: [
      ['仕入れ先', 'しいれさき', 'nhà cung cấp'],
      ['見送る', 'みおくる', 'hoãn lại'],
    ],
  }),
  item('mock3', 'hatsugen', 9, {
    script: [['状況', 'まだ取引のない会社に、自社の新製品を紹介する電話をかけます。相手とは初めて話します。何と言いますか。', 'Bạn gọi điện giới thiệu sản phẩm mới cho một công ty chưa từng giao dịch. Đây là lần đầu bạn nói chuyện với người đó. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        [
          'もしもし、三和精工の小野だけど、新製品の話がしたくて。',
          'いつもお世話になっております。三和精工の小野でございます。いつものように新製品のご案内をさせていただきます。',
          '三和精工の小野様でいらっしゃいます。新製品をご紹介になります。',
          '突然のお電話失礼いたします。三和精工の小野と申します。新製品のご案内でお電話いたしました。',
        ],
        3,
        'Gọi lần đầu cho người lạ: xin lỗi vì gọi đột ngột, xưng tên bằng と申します, nói rõ mục đích (lựa chọn 4). Lựa chọn 2 dễ nhầm vì là câu chào quen thuộc trong công việc, nhưng いつもお世話になっております và いつものように chỉ dùng với người đã quen. Lựa chọn 3 tự gắn 様 và tôn kính ngữ cho mình. Lựa chọn 1 quá suồng sã.',
      ],
    ],
    points: [
      ['突然', 'とつぜん', 'đột ngột'],
      ['と申す', 'ともうす', 'tên là (khiêm nhường)'],
    ],
  }),
  item('mock3', 'hatsugen', 10, {
    script: [['状況', '契約更新の打ち合わせの最後に、取引先の担当者が「まあ、今回は他社さんのお話も一応伺っておりまして……」と言いました。あなたは契約を続けてほしいと思っています。何と言いますか。', 'Cuối buổi bàn gia hạn hợp đồng, người phụ trách bên đối tác nói: "À, lần này chúng tôi cũng có nghe qua bên công ty khác…" Bạn muốn họ tiếp tục hợp đồng. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        [
          '承知いたしました。ご比較の参考に、これまでの対応実績と改善案をお持ちいたします。',
          'そうですか。では、他社さんに決まりましたら教えてください。',
          '他社さんの見積もりを見せていただけますか。それより必ず安くいたしますので、ぜひ弊社にお任せください。',
          '他社のお話をお聞きになるのは、困ります。',
        ],
        0,
        'Câu "cũng có nghe bên khác" là tín hiệu ngầm: hợp đồng có thể bị mất. Đáp lại bình tĩnh, đề nghị mang thành tích và phương án cải thiện tới để họ so sánh (lựa chọn 1). Lựa chọn 2 bỏ cuộc. Lựa chọn 3 dễ nhầm vì thể hiện quyết tâm giữ khách, nhưng đòi xem báo giá của đối thủ là thất lễ, và hứa giảm giá không có căn cứ. Lựa chọn 4 trách khách.',
      ],
    ],
    points: [
      ['一応', 'いちおう', 'tạm thời, cũng gọi là có'],
      ['対応実績', 'たいおうじっせき', 'thành tích xử lý, phục vụ'],
      ['契約更新', 'けいやくこうしん', 'gia hạn hợp đồng'],
    ],
  }),

  // ── 総合聴解 ──
  item('mock3', 'sogo-chokai', 1, {
    script: [
      ['男', '課長、店舗への配送の件で、ご相談があるんですが。', 'Chị trưởng phòng, tôi muốn xin ý kiến về việc giao hàng cho các cửa hàng ạ.'],
      ['女', 'ええ、どうぞ。', 'Ừ, anh nói đi.'],
      ['男', '運送会社から、来年の四月から運賃を一割上げたいと言われまして。今は全店に毎日配送していますが、週三回にまとめれば、値上がりしても、年間で今より二割ほど安くなるという試算が出ました。', 'Bên vận chuyển báo từ tháng tư năm sau muốn tăng cước mười phần trăm. Hiện mình giao hằng ngày cho tất cả cửa hàng, nhưng nếu gộp lại còn ba lần một tuần thì dù cước tăng, tính ra cả năm vẫn rẻ hơn bây giờ khoảng hai mươi phần trăm.'],
      ['女', '二割は大きいわね。でも、お店のほうは困らない？ 生鮮品もあるでしょう。', 'Hai mươi phần trăm là nhiều đấy. Nhưng các cửa hàng có gặp khó không? Còn có hàng tươi sống nữa mà.'],
      ['男', 'そこなんです。生鮮品を扱っているのは十二店のうち四店なので、その四店だけは毎日のままにしたいと考えています。その場合、削減幅は一割程度になります。', 'Đó chính là vấn đề ạ. Trong mười hai cửa hàng thì có bốn cửa hàng bán hàng tươi, nên tôi muốn chỉ bốn cửa hàng đó giữ giao hằng ngày. Khi đó mức giảm còn khoảng mười phần trăm.'],
      ['女', '一割でも、値上げ分を吸収できるならいいんじゃない。ただ、店長たちに相談せずに決めると、あとでもめるから。', 'Mười phần trăm mà bù được phần tăng giá thì được đấy chứ. Có điều quyết mà không bàn với các cửa hàng trưởng thì sau này lại lục đục.'],
      ['男', 'はい。来週の店長会議で説明する時間をいただけないか、営業部に聞いてみます。', 'Vâng. Tôi sẽ hỏi phòng kinh doanh xem có thể xin thời gian trình bày ở cuộc họp cửa hàng trưởng tuần sau không.'],
      ['女', '資料には、配送を減らしたらお店の在庫がどのくらい増えるかも入れておいてね。たぶん、店長たちが一番気にするところだから。', 'Trong tài liệu nhớ đưa cả việc nếu giảm số lần giao thì tồn kho ở cửa hàng tăng chừng nào nhé. Chắc đó là điều các cửa hàng trưởng lo nhất.'],
    ],
    questions: [
      [
        '運送会社は何を伝えてきましたか。',
        ['来年の四月から運賃を一割上げたい', '配送を週三回にしてほしい', '生鮮品の配送をやめたい', '年間の運賃を二割下げる'],
        0,
        'Bên vận chuyển chỉ báo muốn tăng cước 10% từ tháng tư (lựa chọn 1). Giao ba lần một tuần là đề xuất của người đàn ông. Lựa chọn 4 dễ nhầm vì có con số "hai mươi phần trăm", nhưng đó là kết quả tính thử của phía mình, và là giảm tổng chi phí chứ không phải bên vận chuyển hạ cước.',
      ],
      [
        '男の人の案では、店舗への配送はどうなりますか。',
        ['全店が週三回になる', '生鮮品を扱う四店は毎日、残りの八店は週三回になる', '生鮮品を扱う八店は毎日、残りの四店は週三回になる', '全店が毎日のままになる'],
        1,
        '12 cửa hàng, trong đó 4 cửa hàng có hàng tươi giữ giao hằng ngày, 12 − 4 = 8 cửa hàng còn lại giao ba lần một tuần (lựa chọn 2). Lựa chọn 3 đảo hai con số. Lựa chọn 1 là phương án ban đầu, trước khi tính đến hàng tươi.',
      ],
      [
        '女の人が資料に入れるように言ったのは何ですか。',
        ['運賃が上がる詳しい理由', '来週の店長会議の日程', 'ほかの運送会社の運賃との比較', '店の在庫の増え方'],
        3,
        'Câu cuối: 配送を減らしたらお店の在庫がどのくらい増えるか (lựa chọn 4). Lựa chọn 2 dễ nhầm vì có nhắc cuộc họp cửa hàng trưởng, nhưng việc xin thời gian ở cuộc họp là người đàn ông tự đi hỏi phòng kinh doanh, không phải nội dung tài liệu.',
      ],
    ],
    points: [
      ['運賃', 'うんちん', 'cước vận chuyển'],
      ['生鮮品', 'せいせんひん', 'hàng tươi sống'],
      ['吸収する', 'きゅうしゅうする', 'hấp thụ, bù được'],
      ['もめる', 'もめる', 'lục đục, tranh cãi'],
    ],
  }),
  item('mock3', 'sogo-chokai', 2, {
    script: [
      ['男', '皆さん、おはようございます。来年度から始まる三か年の中期経営計画について、ポイントを三つお話しします。', 'Chào mọi người. Tôi xin nói ba điểm chính của kế hoạch kinh doanh trung hạn ba năm, bắt đầu từ năm tài chính tới.'],
      ['男', '一つ目は、海外売上の比率です。現在は全体の十五パーセントですが、三年後には三十パーセントを目指します。そのため、まず東南アジアの拠点を一つから三つに増やします。', 'Thứ nhất là tỉ trọng doanh thu nước ngoài. Hiện là mười lăm phần trăm tổng doanh thu, ba năm sau chúng ta nhắm tới ba mươi phần trăm. Vì vậy trước hết sẽ tăng số cơ sở ở Đông Nam Á từ một lên ba.'],
      ['男', '二つ目は、国内事業です。国内は市場そのものが縮んでいますので、売上を伸ばすことよりも、利益率を上げることを優先します。具体的には、採算の合わない製品を整理し、三年で品目数を今の三分の二に絞り込みます。', 'Thứ hai là mảng trong nước. Thị trường trong nước tự nó đang thu hẹp, nên chúng ta ưu tiên nâng tỉ suất lợi nhuận hơn là tăng doanh thu. Cụ thể, sẽ sắp xếp lại những sản phẩm không có lãi, trong ba năm thu gọn số mặt hàng còn hai phần ba hiện nay.'],
      ['男', '三つ目は人です。海外の拠点を増やすには、現地で責任者を任せられる人材が欠かせません。来年度から、入社五年目以上の社員を対象に、一年間の海外研修制度を設けます。手を挙げてくれる人が多ければ多いほど、この計画の実現は早まると考えています。', 'Thứ ba là con người. Muốn tăng cơ sở ở nước ngoài thì không thể thiếu người có thể giao làm người phụ trách tại chỗ. Từ năm tới, công ty lập chế độ đào tạo ở nước ngoài một năm cho nhân viên từ năm thứ năm trở lên. Tôi nghĩ càng nhiều người giơ tay thì kế hoạch này càng sớm thành hiện thực.'],
    ],
    questions: [
      [
        '国内事業についての方針はどれですか。',
        ['国内の売上を三年で倍にする', '製品の数を増やして、売上を伸ばす', '利益の出ない製品を減らし、利益率を上げる', '東南アジアと同じように、国内にも新しい拠点を作る'],
        2,
        'Thị trường trong nước thu hẹp nên ưu tiên tỉ suất lợi nhuận, cắt bớt sản phẩm không có lãi còn 2/3 (lựa chọn 3). Lựa chọn 1 dễ nhầm vì có "gấp đôi", nhưng gấp đôi là mục tiêu tỉ trọng doanh thu nước ngoài. Số mặt hàng giảm chứ không tăng; cơ sở mới là ở Đông Nam Á.',
      ],
      [
        '三年後の海外売上の比率の目標は、現在の何倍ですか。',
        ['一・五倍', '二倍', '三倍', '十五倍'],
        1,
        'Hiện 15%, mục tiêu 30%: 30 ÷ 15 = 2 lần (lựa chọn 2). Lựa chọn 3 dễ nhầm vì con số "ba" xuất hiện nhiều lần (kế hoạch ba năm, cơ sở từ một lên ba), nhưng không phải tỉ lệ được hỏi.',
      ],
      [
        '話し手が社員に最も期待していることは何ですか。',
        ['海外研修制度に自分から応募すること', '東南アジアの拠点の場所を提案すること', '国内の売上を伸ばすこと', '新しい製品を開発すること'],
        0,
        'Câu cuối 手を挙げてくれる人が多ければ多いほど… là lời kêu gọi gián tiếp: hãy tự nguyện đăng ký chế độ đào tạo ở nước ngoài (lựa chọn 1). Người nói không nhờ nhân viên đề xuất địa điểm. Lựa chọn 3 trái với phương châm ưu tiên lợi nhuận hơn doanh thu trong nước.',
      ],
    ],
    points: [
      ['中期経営計画', 'ちゅうきけいえいけいかく', 'kế hoạch kinh doanh trung hạn'],
      ['拠点', 'きょてん', 'cơ sở, điểm đặt'],
      ['絞り込む', 'しぼりこむ', 'thu hẹp, chọn lọc lại'],
      ['欠かせない', 'かかせない', 'không thể thiếu'],
    ],
  }),
  item('mock3', 'sogo-chokai', 3, {
    script: [
      ['女', 'もしもし、藤和建設の上野です。東洋印刷の林さん、いらっしゃいますか。', 'A lô, tôi là Ueno ở Towa Kensetsu. Anh Hayashi bên In Toyo có đó không ạ?'],
      ['男', 'はい、林です。いつもお世話になっております。会社案内のパンフレット、来月十日納品の三千部の件ですね。', 'Vâng, tôi là Hayashi đây. Cảm ơn chị luôn ủng hộ. Chị gọi về ba nghìn cuốn tờ giới thiệu công ty, giao ngày mười tháng sau phải không ạ?'],
      ['女', 'ええ。実は、社長のあいさつのページを一ページ追加したいという話になりまして。', 'Vâng. Thật ra bên tôi muốn thêm một trang lời chào của giám đốc.'],
      ['男', 'そうしますと、製本の都合上、ページは四ページ単位でしか増やせないんです。今の十六ページが二十ページになりますね。', 'Nếu vậy thì do cách đóng sách, chỉ tăng được theo đơn vị bốn trang. Mười sáu trang hiện nay sẽ thành hai mươi trang.'],
      ['女', '二十ページですか。そうなると、費用はどのくらい上がりますか。', 'Hai mươi trang à. Thế thì chi phí tăng khoảng bao nhiêu ạ?'],
      ['男', '一部あたり三十円、三千部で九万円ほどです。それから、納品が三日遅れて十三日になってしまいます。', 'Mỗi cuốn ba mươi yên, ba nghìn cuốn là khoảng chín vạn yên. Ngoài ra ngày giao sẽ chậm ba ngày, thành ngày mười ba.'],
      ['女', '十三日だと、十二日の展示会に間に合わないんです。', 'Ngày mười ba thì không kịp triển lãm ngày mười hai rồi.'],
      ['男', 'では、追加する四ページだけ、在庫のある別の紙にしていただければ、十日に間に合わせられます。少し薄い紙になりますが。', 'Vậy nếu chị đồng ý cho riêng bốn trang thêm dùng loại giấy khác mà bên tôi có sẵn, thì kịp ngày mười. Giấy sẽ mỏng hơn một chút.'],
      ['女', '中身が大事なので、それで構いません。費用のほうは上司に確認して、今日中にお返事します。', 'Nội dung mới là quan trọng, nên vậy cũng được. Còn chi phí thì tôi hỏi cấp trên rồi trả lời anh trong hôm nay.'],
    ],
    questions: [
      [
        'ページを追加すると、パンフレットは何ページになりますか。',
        ['十六ページ', '十七ページ', '二十四ページ', '二十ページ'],
        3,
        'Chỉ tăng được theo bội số bốn trang, nên thêm một trang cũng phải lên 16 + 4 = 20 trang (lựa chọn 4). Lựa chọn 2 (16 + 1) là bẫy cho người không nghe ra điều kiện 四ページ単位.',
      ],
      [
        '女の人はこのあとまず何をしますか。',
        ['展示会の日にちを変える', '費用について上司に確認する', '印刷会社に紙の種類を選んで伝える', '社長にあいさつ文を頼む'],
        1,
        'Câu cuối: 費用のほうは上司に確認して、今日中にお返事します (lựa chọn 2). Lựa chọn 3 dễ nhầm vì có chuyện đổi giấy, nhưng người phụ nữ đã đồng ý ngay tại chỗ (それで構いません), không còn phải chọn. Ngày triển lãm không đổi; giao hàng được kéo về ngày 10.',
      ],
    ],
    points: [
      ['製本', 'せいほん', 'đóng sách'],
      ['単位', 'たんい', 'đơn vị'],
      ['間に合わせる', 'まにあわせる', 'làm cho kịp'],
    ],
  }),
  item('mock3', 'sogo-chokai', 4, {
    script: [
      ['男', '新商品の広告なんですけど、テレビCMをやめて、全部ネット広告に切り替えるのはどうでしょう。若い人にはそのほうが届きますし、効果も数字で測れます。', 'Về quảng cáo sản phẩm mới, mình bỏ quảng cáo truyền hình, chuyển hết sang quảng cáo trên mạng thì sao ạ? Như vậy dễ tới người trẻ hơn, hiệu quả cũng đo được bằng số.'],
      ['女', '確かに、若い層を狙うならそうですよね。', 'Đúng là nếu nhắm vào giới trẻ thì như vậy.'],
      ['男', '費用も半分くらいで済みますし。', 'Chi phí cũng chỉ mất khoảng một nửa.'],
      ['女', '……ただ、今回の商品、これまでの購入者の六割は五十代以上なんですよね。', '…Có điều, sản phẩm lần này thì sáu phần mười người mua tới giờ là từ năm mươi tuổi trở lên.'],
      ['男', 'ああ、そうでした。', 'À, đúng rồi.'],
      ['女', 'まあ、ネットの効果を一度きちんと測ってみるのは、悪くないと思いますよ。予算の二割くらいで試してみるとか。', 'Mà thử đo hiệu quả trên mạng một lần cho đàng hoàng thì cũng không tệ đâu. Chẳng hạn thử với khoảng hai mươi phần trăm ngân sách.'],
      ['男', 'なるほど。では、その方向で企画を出し直します。', 'Ra vậy. Thế thì tôi sẽ nộp lại bản kế hoạch theo hướng đó.'],
    ],
    questions: [
      [
        '女の人は、男の人の最初の案についてどう思っていますか。',
        ['男の人の案に、全面的に賛成している', '主な購入者の年齢を考えると、全部切り替えるのは疑問だ', '費用がかかりすぎるので、反対している', 'ネット広告は効果が測れないので、意味がないと思っている'],
        1,
        'Người phụ nữ không phản đối thẳng: đồng ý nửa vời (確かに…ならそうですよね), rồi nêu sự thật 60% người mua trên năm mươi tuổi. Hàm ý: chuyển hết sang mạng là không hợp (lựa chọn 2). Lựa chọn 1 dễ nhầm vì câu đầu nghe như tán thành, nhưng điều kiện ～なら (nếu nhắm vào giới trẻ) không đúng với sản phẩm này.',
      ],
      [
        '男の人はこのあとどうしますか。',
        ['テレビCMをやめて、すべてネット広告に切り替える企画を出す', 'テレビCMの費用を半分に減らす', '購入者の年齢層をもう一度調べ直す', 'テレビCMは続け、予算の一部でネット広告を試す'],
        3,
        'その方向 là hướng người phụ nữ vừa gợi ý: giữ truyền hình, dùng khoảng 20% ngân sách thử quảng cáo mạng (lựa chọn 4). Lựa chọn 1 là đề xuất ban đầu đã bị bác ngầm. Tuổi người mua đã biết rõ, không cần điều tra lại.',
      ],
    ],
    points: [
      ['狙う', 'ねらう', 'nhắm vào'],
      ['測る', 'はかる', 'đo'],
      ['出し直す', 'だしなおす', 'nộp lại'],
    ],
  }),
];

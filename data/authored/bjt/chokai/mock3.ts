import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/**
 * Full test 3 (week 15), 聴解: 5 場面把握 + 10 発言聴解 + 10 総合聴解 questions = 25.
 * Mixes the themes of all 16 weeks, a little harder than mock2; about a third of the questions are J1+.
 * 発言聴解 and 総合聴解 follow the 2026-11-14 calibration rules (spec): one keigo point per 発言 choice set,
 * one question per 総合 item, scripts of 450–750 characters.
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
        ['女性がホワイトボードの字を消しています。', '男性が出席者に資料を配っています。', '男性の一人が手を挙げています。', '全員がテーブルの席に着いています。'],
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
        ['男性が女性に手土産を渡そうとしています。', '女性が紙袋から贈り物を取り出しています。', '男性が深くお辞儀をしています。', '二人が名刺を交換しています。'],
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
        ['女性が製品を箱に詰めています。', '女性がベルトコンベアを止めています。', '女性が製品を手に取って点検しています。', '女性が不良品を専用の箱に入れています。'],
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
    script: [['状況', '取引先の部長から、自社製品の細かい仕様について質問されました。詳しい担当者が説明すると伝えます。', 'Trưởng bộ phận bên đối tác hỏi bạn về thông số chi tiết của sản phẩm công ty bạn. Bạn nói rằng người phụ trách nắm rõ sẽ giải thích.']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['その件は、担当の者からご説明なさいます。', 'その件は、担当の方からご説明いたします。', 'その件は、担当の者からご説明くださいます。', 'その件は、担当の者からご説明いたします。'],
        3,
        'Người phụ trách là người bên mình: gọi 担当の者 và dùng khiêm nhường ご説明いたします. Lựa chọn 1 đúng ý nhưng なさる là tôn kính ngữ, dùng cho người bên mình là sai chủ thể; lựa chọn 3 (くださる) cũng vậy. Lựa chọn 2 động từ đúng nhưng gọi người bên mình là 担当の方.',
      ],
    ],
    points: [
      ['仕様', 'しよう', 'thông số, đặc tả'],
      ['担当の者', 'たんとうのもの', 'người phụ trách (bên mình, khiêm nhường)'],
    ],
  }),
  item('mock3', 'hatsugen', 2, {
    script: [['状況', '取引先の社長に会ったとき、あなたの上司の部長によろしくと言われました。会社に戻って、部長に伝えます。', 'Khi gặp giám đốc công ty đối tác, ông nhờ gửi lời hỏi thăm trưởng bộ phận của bạn. Về công ty, bạn chuyển lời cho trưởng bộ phận.']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['先方の社長が、よろしくと申しておりました。', '先方の社長が、よろしくとおっしゃっていました。', '先方の社長が、よろしくと申されていました。', '先方の社長が、よろしくとおっしゃられていました。'],
        1,
        'Nói với cấp trên về lời của giám đốc đối tác: người nói là người ngoài, cần tôn trọng, nên dùng おっしゃっていました. Lựa chọn 1 đúng ý nhưng 申す là khiêm nhường, chỉ dùng cho người bên mình: sai chủ thể. Lựa chọn 3 ghép れる tôn kính vào 申す khiêm nhường. Lựa chọn 4 là kính ngữ kép.',
      ],
    ],
    points: [
      ['先方', 'せんぽう', 'phía bên kia (đối tác)'],
      ['よろしくと言う', 'よろしくという', 'gửi lời hỏi thăm'],
    ],
  }),
  item('mock3', 'hatsugen', 3, {
    script: [['状況', '取引先から納品を一週間早めてほしいと頼まれましたが、工場の生産計画の都合で応じられません。断ります。', 'Đối tác nhờ giao hàng sớm một tuần, nhưng vì kế hoạch sản xuất của nhà máy, bạn không đáp ứng được. Bạn từ chối.']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['せっかくですが、ご希望には沿いかねます。', 'せっかくですが、ご希望には沿われかねます。', 'せっかくですが、ご希望には沿いかねられます。', 'せっかくですが、ご希望には沿っていただけません。'],
        0,
        '沿いかねます là cách từ chối mềm và lịch sự (～かねる): "khó lòng đáp ứng". Lựa chọn 2 đúng ý nhưng 沿われる là tôn kính (～れる), gắn cho việc của chính mình là sai chủ thể. Lựa chọn 3 chia sai thể. Lựa chọn 4 thành đối tác không đáp ứng được.',
      ],
    ],
    points: [
      ['沿いかねる', 'そいかねる', 'khó lòng đáp ứng (từ chối khéo)'],
      ['生産計画', 'せいさんけいかく', 'kế hoạch sản xuất'],
    ],
  }),
  item('mock3', 'hatsugen', 4, {
    script: [['状況', '来週、あなたの会社の社長が新しい工場を視察します。社内の工場の担当者に、電話でそのことを知らせます。', 'Tuần sau giám đốc công ty bạn sẽ đi thị sát nhà máy mới. Bạn gọi điện báo cho người phụ trách nhà máy trong công ty.']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['来週、社長が工場をご視察いたします。', '来週、社長が工場を拝見に参ります。', '来週、社長が工場をご視察になります。', '来週、社長が工場をご視察になられます。'],
        2,
        'Nói trong nội bộ công ty thì giám đốc là người trên, dùng tôn kính ご視察になります. Lựa chọn 1 đúng ý nhưng ご～いたす là khiêm nhường; chỉ dùng cho giám đốc khi nói với người NGOÀI công ty, ở đây là sai chủ thể. Lựa chọn 2 cũng khiêm nhường. Lựa chọn 4 là kính ngữ kép.',
      ],
    ],
    points: [
      ['視察する', 'しさつする', 'thị sát'],
      ['社内', 'しゃない', 'trong công ty'],
    ],
  }),
  item('mock3', 'hatsugen', 5, {
    script: [['状況', '打ち合わせで、取引先の担当者が資料を忘れてきたようです。あなたの分の資料を貸したいです。何と言いますか。', 'Trong buổi họp, người phụ trách bên đối tác có vẻ quên mang tài liệu. Bạn muốn cho họ mượn bản của mình. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['よろしければ、こちらをお使いしてください。', 'よろしければ、こちらを使っていただきます。', 'よろしければ、こちらを拝借してください。', 'よろしければ、こちらをお使いください。'],
        3,
        'Người dùng là đối tác: お使いください. Lựa chọn 3 đúng ý (mời mượn) nhưng 拝借 là khiêm nhường, dùng cho việc của đối tác là sai chủ thể. Lựa chọn 1 dùng お～する (khiêm nhường). Lựa chọn 2 ở thể khẳng định nghe như áp đặt.',
      ],
    ],
    points: [['お使いください', 'おつかいください', 'xin cứ dùng']],
  }),
  item('mock3', 'hatsugen', 6, {
    script: [['状況', '取引先の人との会食で、料理が運ばれてきました。相手に、冷めないうちに先に食べるよう勧めます。何と言いますか。', 'Trong bữa ăn với người bên đối tác, món ăn được mang ra. Bạn mời họ ăn trước kẻo nguội. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['どうぞ、温かいうちにいただいてください。', 'どうぞ、温かいうちに召し上がってください。', 'どうぞ、温かいうちに召し上がられてください。', 'どうぞ、温かいうちにお食べしてください。'],
        1,
        'Người ăn là khách: 召し上がってください. Lựa chọn 1 đúng ý nhưng いただく là khiêm nhường, chỉ dùng cho việc mình ăn: sai chủ thể. Lựa chọn 3 là kính ngữ kép. Lựa chọn 4 dùng お～する (khiêm nhường) và 食べる không có dạng お食べする.',
      ],
    ],
    points: [
      ['召し上がる', 'めしあがる', 'ăn, uống (tôn kính)'],
      ['会食', 'かいしょく', 'bữa ăn (công việc)'],
    ],
  }),
  item('mock3', 'hatsugen', 7, {
    script: [['状況', '会議で、部長が出した案には賛成ですが、費用の点だけ確かめたいです。部長に質問の許可を求めます。', 'Trong cuộc họp, bạn tán thành đề án trưởng bộ phận đưa ra, nhưng muốn hỏi riêng về chi phí. Bạn xin phép trưởng bộ phận để hỏi.']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['一点だけ、お聞きになってもよろしいでしょうか。', '一点だけ、伺わせてもよろしいでしょうか。', '一点だけ、伺ってもよろしいでしょうか。', '一点だけ、お伺いになってもよろしいでしょうか。'],
        2,
        'Người hỏi là mình, nên dùng khiêm nhường 伺ってもよろしいでしょうか. Lựa chọn 1 đúng ý nhưng お聞きになる là tôn kính, dùng cho chính mình là sai chủ thể; lựa chọn 4 cũng vậy. Lựa chọn 2: thể sai khiến 伺わせる đứng một mình thành "để (ai) hỏi", sai nghĩa.',
      ],
    ],
    points: [
      ['伺う', 'うかがう', 'hỏi (khiêm nhường)'],
      ['一点', 'いってん', 'một điểm'],
    ],
  }),
  item('mock3', 'hatsugen', 8, {
    script: [['状況', '来客が帰ろうとしたとき、雨が降り始めました。来客は傘を持っていません。会社の傘を貸します。何と言いますか。', 'Khách vừa định ra về thì trời đổ mưa. Khách không mang ô. Bạn cho mượn ô của công ty. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['こちらの傘をお持ちになってください。', 'こちらの傘をお持ちしてください。', 'こちらの傘をお借りしてください。', 'こちらの傘をお持ちになられてください。'],
        0,
        'Người cầm ô đi là khách: お持ちになってください. Lựa chọn 3 đúng ý (mời mượn) nhưng お借りする là khiêm nhường, gắn cho việc của khách là sai chủ thể; lựa chọn 2 cũng thế. Lựa chọn 4 là kính ngữ kép.',
      ],
    ],
    points: [['お持ちになる', 'おもちになる', 'cầm, mang (tôn kính)']],
  }),
  item('mock3', 'hatsugen', 9, {
    script: [['状況', '取引先に送った見積書の金額が間違っていました。電話で、相手に迷惑をかけたことをおわびします。何と言いますか。', 'Số tiền trong báo giá gửi cho đối tác bị sai. Bạn gọi điện xin lỗi vì đã gây phiền cho họ. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['ご迷惑をおかけになって申し訳ございません。', 'ご迷惑をかけられて申し訳ございません。', 'ご迷惑をおかけいただき申し訳ございません。', 'ご迷惑をおかけして申し訳ございません。'],
        3,
        'Người gây phiền là mình: ご迷惑をおかけして (お～する, khiêm nhường). Lựa chọn 1 đúng ý nhưng お～になる là tôn kính, dùng cho chính mình là sai chủ thể. Lựa chọn 2 dùng thể tôn kính/bị động かけられる, nghe như đối tác gây phiền. Lựa chọn 3 thành "được đối tác gây phiền cho".',
      ],
    ],
    points: [
      ['ご迷惑をおかけする', 'ごめいわくをおかけする', 'gây phiền (khiêm nhường)'],
      ['見積書', 'みつもりしょ', 'bản báo giá'],
    ],
  }),
  item('mock3', 'hatsugen', 10, {
    script: [['状況', '取引先の担当者から「田中部長はお元気ですか」と聞かれました。あなたの上司の田中部長は元気です。何と言いますか。', 'Người phụ trách bên đối tác hỏi "Trưởng bộ phận Tanaka có khoẻ không?". Cấp trên của bạn, trưởng bộ phận Tanaka, vẫn khoẻ. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['おかげさまで、田中部長も元気にしております。', 'おかげさまで、田中も元気にしております。', 'おかげさまで、田中も元気にしていらっしゃいます。', 'おかげさまで、田中もお元気でございます。'],
        1,
        'Với người ngoài, cấp trên của mình là người bên mình: gọi trống tên 田中 và dùng khiêm nhường しております. Lựa chọn 3 đúng ý nhưng いらっしゃる là tôn kính, dùng cho người bên mình là sai chủ thể. Lựa chọn 4 thêm お vào 元気 của người bên mình. Lựa chọn 1 động từ đúng nhưng gọi 田中部長 trước mặt khách.',
      ],
    ],
    points: [['おかげさまで', 'おかげさまで', 'nhờ ơn (anh/chị), may mắn là']],
  }),

  // ── 総合聴解 ──
  item('mock3', 'sogo-chokai', 1, {
    script: [
      ['女', '課長、ベトナム工場から届いた先月分の部品ですが、受け入れ検査で、寸法の不良が三パーセント出ました。いつもは〇・五パーセント以下なんですが。', 'Trưởng phòng, lô linh kiện tháng trước từ nhà máy Việt Nam, kiểm tra đầu vào thấy ba phần trăm lỗi kích thước ạ. Bình thường dưới không phẩy năm phần trăm.'],
      ['男', '三パーセントか。原因は？', 'Ba phần trăm à. Nguyên nhân là gì?'],
      ['女', '現地の工場長は、先月入れ替えた金型のせいじゃないかと言っています。', 'Xưởng trưởng bên đó cho rằng do khuôn mới thay tháng trước.'],
      ['男', '金型ね…。でも、金型が原因なら、全部の部品に同じようなずれが出るはずだろう。', 'Khuôn à… Nhưng nếu do khuôn thì linh kiện nào cũng phải lệch giống nhau chứ.'],
      ['女', 'そうなんです。不良品を調べてみたら、ずれ方がばらばらでした。', 'Đúng vậy ạ. Em xem hàng lỗi thì thấy độ lệch mỗi cái một kiểu.'],
      ['男', 'だったら、金型より、作業のやり方か、材料のほうを疑ったほうがいいな。', 'Thế thì nên nghi cách làm hoặc nguyên liệu hơn là khuôn.'],
      ['女', 'すぐに現地に行って、確認してきましょうか。', 'Em đi sang đó kiểm tra ngay nhé?'],
      ['男', 'いや、行くのはまだ早い。今行っても、何を見ればいいのかわからないまま帰ってくることになる。それより、不良が出た部品が、いつ、どのラインで、誰の担当で作られたのか、現地から記録を送ってもらって。それを見れば、特定の日や人に偏っているかどうかがわかる。', 'Không, đi bây giờ thì sớm quá. Đi lúc này thì có khi về mà vẫn không biết phải xem gì. Thay vào đó, em bảo bên đó gửi hồ sơ: hàng lỗi làm ngày nào, ở dây chuyền nào, ai phụ trách. Xem cái đó là biết có tập trung vào ngày hay người nào không.'],
      ['女', 'わかりました。材料のメーカーにも問い合わせておきますか。', 'Vâng ạ. Em có hỏi luôn hãng nguyên liệu không ạ?'],
      ['男', 'それは記録を見てからでいい。材料が原因なら、同じ材料を使っているタイの工場でも不良が出ているはずだしね。', 'Cái đó đợi xem hồ sơ đã. Nếu do nguyên liệu thì nhà máy ở Thái Lan dùng cùng nguyên liệu cũng phải có lỗi chứ.'],
      ['女', 'はい。では、さっそく現地に連絡します。', 'Vâng. Vậy em liên lạc với bên đó ngay ạ.'],
    ],
    questions: [
      [
        '女の人はまず何をしますか。',
        ['製造時の記録を取り寄せる', '新しい金型に取り替えてもらう', 'ベトナムの工場に確認に行く', '材料メーカーに問い合わせる'],
        0,
        'Trưởng phòng bảo đi sang thì còn sớm, trước hết phải xin bên đó gửi hồ sơ sản xuất (いつ、どのライン、誰の担当). Lựa chọn 3 bị bác (行くのはまだ早い). Lựa chọn 4 để sau khi xem hồ sơ. Lựa chọn 2 dựa trên giả thuyết khuôn, đã bị bác vì độ lệch không đều.',
      ],
    ],
    points: [
      ['寸法', 'すんぽう', 'kích thước'],
      ['金型', 'かながた', 'khuôn (đúc, dập)'],
      ['偏る', 'かたよる', 'lệch, tập trung về một phía'],
    ],
  }),
  item('mock3', 'sogo-chokai', 2, {
    script: [
      ['男', '皆さん、新年あけましておめでとうございます。', 'Chúc mừng năm mới mọi người.'],
      ['男', '昨年は、原材料の値上がりが続く厳しい一年でしたが、皆さんの努力のおかげで、売上は過去最高を記録することができました。新しく取引を始めていただいたお客様も、三十社を超えました。心から感謝します。', 'Năm ngoái là một năm khó khăn vì giá nguyên liệu liên tục tăng, nhưng nhờ nỗ lực của mọi người, doanh thu đạt mức cao nhất từ trước tới nay. Khách hàng mới bắt đầu giao dịch cũng vượt quá ba mươi công ty. Tôi thật lòng cảm ơn.'],
      ['男', 'ただ、利益で見ると、実は前の年より一割減っています。売上が伸びても、値引きをして数を売ったのでは、会社に力は残りません。', 'Có điều, nhìn vào lợi nhuận thì thực ra giảm mười phần trăm so với năm trước. Doanh thu có tăng mà là nhờ giảm giá để bán nhiều thì công ty không còn sức.'],
      ['男', 'わが社は創業以来、「いい物を、手ごろな値段で」と言ってきました。この「手ごろ」を、「安ければいい」と取り違えていなかったか、もう一度考えてほしいのです。', 'Từ khi thành lập, công ty ta luôn nói "hàng tốt, giá phải chăng". Tôi muốn mọi người nghĩ lại xem chúng ta có hiểu nhầm "phải chăng" thành "rẻ là được" hay không.'],
      ['男', 'そこで、今年は、売上の目標はあえて昨年と同じにします。その代わり、値引きに頼らず、商品の価値をきちんとご説明して、それにふさわしい価格で買っていただく。これを全社の目標にしたいと思います。', 'Vì vậy, năm nay tôi cố ý giữ mục tiêu doanh thu bằng năm ngoái. Thay vào đó, không dựa vào giảm giá, mà giải thích rõ giá trị sản phẩm và để khách mua với mức giá xứng đáng. Tôi muốn đây là mục tiêu của toàn công ty.'],
      ['男', '営業の皆さんには、値引きの判断を、これからは課長の承認制にしてもらいます。開発の皆さんには、お客様に価値が伝わる商品を、一つでも多く出してほしい。工場の皆さんには、品質で値段の理由を支えてほしいと思います。','Với bộ phận kinh doanh, từ nay việc quyết định giảm giá phải được trưởng phòng duyệt. Với bộ phận phát triển, tôi mong có thêm càng nhiều sản phẩm truyền tải được giá trị đến khách hàng càng tốt. Với nhà máy, tôi mong chất lượng sẽ là chỗ dựa cho mức giá.'],
      ['男', '今年も一年、どうぞよろしくお願いします。', 'Năm nay cũng mong mọi người giúp đỡ.'],
    ],
    questions: [
      [
        '社長は今年の全社の目標は何だと言っていますか。',
        ['売上で過去最高を更新すること', '安い商品をたくさん出すこと', '値引きの判断を課長に任せること', '価値に見合った価格で売ること'],
        3,
        'Giám đốc nói 全社の目標: không dựa vào giảm giá, bán với giá xứng đáng với giá trị. Lựa chọn 1 là thành tích năm ngoái; năm nay ông cố ý giữ doanh thu như cũ. Lựa chọn 3 chỉ là biện pháp cho bộ phận kinh doanh. Lựa chọn 2 chính là cách hiểu nhầm "phải chăng = rẻ" mà ông phê phán.',
      ],
    ],
    points: [
      ['取り違える', 'とりちがえる', 'hiểu nhầm, lẫn'],
      ['あえて', 'あえて', 'cố ý, mạnh dạn'],
      ['ふさわしい', 'ふさわしい', 'xứng đáng, phù hợp'],
    ],
  }),
  item('mock3', 'sogo-chokai', 3, {
    script: [
      ['男', '改装工事の日程ですが、業者からは、店を閉めて一週間で一気に終わらせる案が出ています。', 'Về lịch sửa sang cửa hàng, bên thi công đề xuất đóng cửa hàng và làm dứt điểm trong một tuần.'],
      ['女1', '一週間も閉めるんですか。うちは近所のお客様が毎日来てくださるので、一週間閉めると、ほかのお店に移られてしまいそうで…。', 'Đóng cửa những một tuần à? Cửa hàng mình khách quanh đây ngày nào cũng đến, đóng một tuần thì sợ họ chuyển sang cửa hàng khác mất…'],
      ['男', '営業しながら工事をすることもできますが、その場合は夜だけの作業になるので、一か月かかります。費用も三割ほど上がります。', 'Cũng có thể vừa bán vừa thi công, nhưng như vậy chỉ làm được ban đêm, mất một tháng. Chi phí cũng tăng khoảng ba mươi phần trăm.'],
      ['女2', '一か月も夜に工事をすると、朝の開店前に片付けが間に合わない日も出てきそうですね。', 'Thi công ban đêm suốt một tháng thì chắc có ngày dọn dẹp không kịp trước giờ mở cửa buổi sáng.'],
      ['女1', 'そうね…。どうしようかしら。', 'Đúng nhỉ… Làm sao bây giờ.'],
      ['女2', 'あの、売り場を半分ずつ工事するのはどうでしょう。半分を閉めて、もう半分で営業するんです。', 'Dạ, hay là thi công từng nửa khu bán hàng ạ? Đóng một nửa, nửa kia vẫn bán.'],
      ['男', 'それなら昼間も工事ができますから、二週間ほどで終わります。費用も、一週間の案とほとんど変わりません。', 'Như thế thì ban ngày cũng thi công được, khoảng hai tuần là xong. Chi phí cũng gần như bằng phương án một tuần.'],
      ['女1', '売り場が半分だと、商品を全部は並べられないわね。でも、毎日のパンや野菜さえ置いておければ、お客様は来てくださると思う。', 'Khu bán hàng còn một nửa thì không bày hết hàng được. Nhưng chỉ cần có bánh mì, rau hằng ngày thì chắc khách vẫn đến.'],
      ['男', 'では、半分ずつの案で、業者と詳しく詰めます。開始は、売り場が比較的すいている二月の後半でいかがでしょう。', 'Vậy tôi sẽ bàn chi tiết với bên thi công theo phương án từng nửa. Bắt đầu vào nửa cuối tháng hai, lúc cửa hàng tương đối vắng, chị thấy sao?'],
      ['女1', '二月の後半ね。大丈夫です。お客様には、一か月前からお知らせを出します。', 'Nửa cuối tháng hai à. Được ạ. Tôi sẽ thông báo cho khách trước một tháng.'],
      ['男', 'ありがとうございます。業者からの見積もりは、来週中にお届けします。', 'Cảm ơn chị. Báo giá của bên thi công tôi sẽ gửi trong tuần sau.'],
    ],
    questions: [
      [
        '改装工事はどのように行うことになりましたか。',
        ['店を一週間閉めて行う', '売り場を分けて順に行う', '夜間だけ一か月かけて行う', '二月の前半に一度に行う'],
        1,
        'Chốt phương án của phó cửa hàng trưởng: thi công từng nửa khu bán hàng (半分ずつ), khoảng hai tuần, từ nửa cuối tháng hai. Lựa chọn 1 bị bác vì sợ mất khách quen. Lựa chọn 3 bị bác vì tốn hơn và khó dọn kịp. Lựa chọn 4 sai thời điểm và sai cách làm.',
      ],
    ],
    points: [
      ['改装', 'かいそう', 'sửa sang, cải tạo'],
      ['詰める', 'つめる', 'bàn cho chi tiết, chốt'],
      ['一気に', 'いっきに', 'một mạch, dứt điểm'],
    ],
  }),
  item('mock3', 'sogo-chokai', 4, {
    script: [
      ['女', '部長、大和スーパーさんから、来期の納品価格を五パーセント下げてほしい、というお話が来ています。', 'Thưa trưởng bộ phận, siêu thị Yamato đề nghị giảm giá giao hàng kỳ tới năm phần trăm ạ.'],
      ['男', '五パーセントか。大和さんは、うちの売上の二割を占めているからなあ。', 'Năm phần trăm à. Yamato chiếm hai mươi phần trăm doanh thu của mình mà.'],
      ['女', 'はい。応じていただけないなら、ほかのメーカーさんに切り替えることも考える、とも言われました。', 'Vâng. Họ còn nói nếu mình không đáp ứng thì họ cũng tính chuyển sang hãng khác.'],
      ['男', 'そう言われてもね…。去年も三パーセント下げているんだよ。これ以上下げたら、工場の人たちに、また無理をさせることになる。', 'Nói thế thì cũng… Năm ngoái đã giảm ba phần trăm rồi. Giảm nữa thì lại bắt người ở nhà máy làm quá sức.'],
      ['女', '工場からは、すでに人が足りないという声が出ています。去年の値下げのときも、休日出勤で何とか対応してもらいましたし。', 'Nhà máy đã kêu thiếu người rồi ạ. Lần giảm giá năm ngoái cũng phải nhờ họ đi làm cả ngày nghỉ mới xoay xở được.'],
      ['男', 'そうだろう。値段を下げて注文を守っても、作る人が辞めてしまったら、元も子もない。', 'Đúng thế. Hạ giá để giữ đơn hàng mà người làm ra sản phẩm bỏ việc thì mất cả chì lẫn chài.'],
      ['女', 'では、今回はお断りしますか。', 'Vậy lần này mình từ chối ạ?'],
      ['男', 'いや、ただ断るんじゃなくて、こちらから別の提案をしよう。たとえば、配送の回数を週六回から週四回に減らしてもらえれば、物流費が下がる。その分を値段に回すことはできるかもしれない。', 'Không, đừng chỉ từ chối, mình đưa ra đề xuất khác. Ví dụ, nếu họ đồng ý giảm số lần giao từ sáu xuống bốn lần một tuần thì chi phí vận chuyển giảm. Phần đó có thể chuyển vào giá.'],
      ['女', 'なるほど。大和さんにとっても、値下げに近い効果がありますね。', 'Ra vậy. Với Yamato cũng có hiệu quả gần như giảm giá.'],
      ['男', 'うん。それで納得してもらえなければ、そのときは、取引が減ることも覚悟しよう。まずは配送の担当と相談して、案をまとめてくれる？', 'Ừ. Nếu như thế mà họ vẫn không chịu thì lúc đó mình chấp nhận cả việc giao dịch giảm đi. Trước hết chị bàn với bên phụ trách giao hàng rồi soạn đề xuất nhé?'],
    ],
    questions: [
      [
        '部長が一番大切にしていることは何ですか。',
        ['大きな取引先を失わないこと', '物流の費用を下げること', '作り手に負担をかけないこと', '他社より安い価格にすること'],
        2,
        'Trưởng bộ phận không giảm giá thêm vì sẽ bắt nhà máy làm quá sức, và còn chấp nhận mất bớt giao dịch: điều ông giữ là không đè thêm gánh nặng lên người làm ra hàng. Lựa chọn 1 ông sẵn sàng hy sinh (取引が減ることも覚悟). Lựa chọn 2 chỉ là phương tiện để thương lượng.',
      ],
    ],
    points: [
      ['元も子もない', 'もともこもない', 'mất cả chì lẫn chài'],
      ['覚悟する', 'かくごする', 'chấp nhận, sẵn sàng (điều xấu)'],
      ['占める', 'しめる', 'chiếm'],
    ],
  }),
  item('mock3', 'sogo-chokai', 5, {
    script: [
      ['男', '課長、来月の内定者懇談会の案ですが、去年と同じく、本社で会社説明と社長のお話、そのあと懇親会、という流れでよろしいでしょうか。', 'Chị trưởng phòng, về kế hoạch buổi gặp mặt người đã nhận thư mời làm việc tháng sau, vẫn như năm ngoái: ở trụ sở, giới thiệu công ty, giám đốc phát biểu, sau đó giao lưu, được không ạ?'],
      ['女', '去年のアンケート、見た？', 'Em xem khảo sát năm ngoái chưa?'],
      ['男', 'はい。全体の満足度は高かったです。', 'Rồi ạ. Mức hài lòng chung cao ạ.'],
      ['女', '満足度はね。でも、自由記述のところに、「入社してからの仕事のイメージがわかなかった」っていうのが多かったのよ。', 'Mức hài lòng thì vậy. Nhưng ở phần ghi tự do, nhiều người viết "không hình dung được công việc sau khi vào công ty".'],
      ['男', 'そうでした。会社説明は、パンフレットとほとんど同じ内容でしたし…。', 'Đúng vậy ạ. Phần giới thiệu công ty gần như giống hệt tờ giới thiệu…'],
      ['女', '社長のお話は、皆さんとても喜んでいたから残しましょう。懇親会も、同期と知り合えるいい機会だし。', 'Phần giám đốc phát biểu ai cũng rất thích nên giữ lại. Buổi giao lưu cũng là dịp tốt để làm quen với bạn cùng khoá.'],
      ['男', 'では、会社説明の時間を、若手の社員と話す時間に変えるのはどうでしょう。入社二、三年目の人に、一日の仕事の流れを話してもらうんです。', 'Vậy đổi thời gian giới thiệu công ty thành thời gian nói chuyện với nhân viên trẻ thì sao ạ? Nhờ người vào công ty được hai, ba năm kể về một ngày làm việc.'],
      ['女', 'いいわね。それなら、内定者も質問しやすいでしょう。会場は？ 本社の大会議室だと、ちょっと堅い感じがするけど。', 'Hay đấy. Như thế người được nhận cũng dễ đặt câu hỏi. Còn địa điểm? Phòng họp lớn ở trụ sở thì hơi cứng nhắc.'],
      ['男', '会場は、去年と同じで大丈夫だと思います。人数も同じぐらいですし、ほかの場所を借りると費用がかかりますので。', 'Địa điểm thì em nghĩ như năm ngoái là được ạ. Số người cũng tương đương, thuê chỗ khác lại tốn tiền.'],
      ['女', 'そうね。じゃあ、そこだけ変えて、あとは去年どおりで進めて。若手には、私から声をかけておくわ。営業と工場から一人ずつがいいわね。', 'Ừ. Vậy chỉ đổi chỗ đó, còn lại cứ như năm ngoái. Các bạn trẻ thì để chị nói. Mỗi bên kinh doanh và nhà máy một người là hay.'],
      ['男', '承知しました。', 'Vâng ạ.'],
    ],
    questions: [
      [
        '懇談会について、去年から何を変えることにしましたか。',
        ['社長の講話の時間を短くする', '説明を若手との懇談に替える', '会場を本社以外の場所に移す', '懇親会を立食形式に変える'],
        1,
        'Chỉ đổi một điểm: thay phần giới thiệu công ty bằng thời gian nói chuyện với nhân viên trẻ (そこだけ変えて). Lựa chọn 1 sai: phần giám đốc phát biểu được giữ. Lựa chọn 3 là băn khoăn của trưởng phòng nhưng cuối cùng giữ địa điểm cũ. Buổi giao lưu cũng giữ nguyên.',
      ],
    ],
    points: [
      ['内定者', 'ないていしゃ', 'người đã nhận thư mời làm việc'],
      ['懇談会', 'こんだんかい', 'buổi gặp mặt trò chuyện'],
      ['自由記述', 'じゆうきじゅつ', 'phần ghi tự do'],
    ],
  }),
  item('mock3', 'sogo-chokai', 6, {
    script: [
      ['男', 'もしもし、いつもお世話になっております。大成工業の加藤でございます。営業部の小林様の携帯でよろしかったでしょうか。', 'A lô, cảm ơn chị luôn giúp đỡ. Tôi là Kato ở Taisei Kogyo. Đây có phải số di động của chị Kobayashi phòng kinh doanh không ạ?'],
      ['男', '先日は、お忙しいところ弊社の工場までお越しいただき、ありがとうございました。本日お送りいただいた、来月分の部品のお見積もりの件でお電話いたしました。', 'Hôm trước cảm ơn chị đã bớt thời gian đến tận nhà máy bên tôi. Tôi gọi về bản báo giá linh kiện tháng sau chị gửi hôm nay ạ.'],
      ['男', '内容は拝見いたしまして、価格のほうは問題ございません。ただ、一点、数量のところが、こちらでお願いした千二百個ではなく、千個になっておりまして…。おそらく先月分の数字が残ってしまったのではないかと思います。', 'Tôi đã xem nội dung, giá thì không có vấn đề gì. Có điều, một điểm: phần số lượng ghi một nghìn cái chứ không phải một nghìn hai trăm cái bên tôi đặt… Có lẽ con số của tháng trước còn sót lại.'],
      ['男', '弊社の社内の手続きの都合で、正式な見積書を、あさっての金曜日までに経理に回す必要がございます。お手数ですが、数量を直したものを、もう一度メールでお送りいただけますでしょうか。単価は千二百個でも同じと伺っておりますので、合計金額のところも合わせて直していただければと存じます。', 'Vì thủ tục nội bộ bên tôi, phải chuyển bản báo giá chính thức cho phòng kế toán trước thứ sáu, tức ngày kia. Phiền chị gửi lại qua email bản đã sửa số lượng được không ạ? Tôi được biết đơn giá với một nghìn hai trăm cái vẫn như cũ, nên mong chị sửa luôn cả phần tổng tiền.'],
      ['男', 'それから、来月の打ち合わせの日程につきましては、また改めてご相談させてください。こちらは急ぎませんので。', 'Còn lịch họp tháng sau thì để tôi bàn lại sau ạ. Việc đó không gấp.'],
      ['男', '何かございましたら、私の携帯までご連絡ください。お忙しいところ恐れ入りますが、どうぞよろしくお願いいたします。失礼いたします。', 'Có gì xin chị gọi vào di động của tôi. Xin lỗi làm phiền lúc chị bận, mong chị giúp cho. Tôi xin phép.'],
    ],
    questions: [
      [
        'この留守番電話を聞いた人は、まず何をしなければなりませんか。',
        ['見積もりの価格を見直す', '打ち合わせの日程を決める', '先月分の見積もりを確認する', '数量を直して再送する'],
        3,
        'Việc có hạn chót (thứ sáu) là sửa số lượng thành 1.200 rồi gửi lại báo giá. Lựa chọn 1 sai: giá 問題ございません. Lựa chọn 2: lịch họp 急ぎません, để bàn sau. Lựa chọn 3: con số tháng trước chỉ là nguyên nhân anh đoán, không phải việc cần làm.',
      ],
    ],
    points: [
      ['数量', 'すうりょう', 'số lượng'],
      ['経理に回す', 'けいりにまわす', 'chuyển cho phòng kế toán'],
      ['お手数ですが', 'おてすうですが', 'phiền anh/chị, nhưng…'],
    ],
  }),
  item('mock3', 'sogo-chokai', 7, {
    script: [
      ['男', '部長、倉庫で一か月試していた、新しい在庫管理の仕組みの結果が出ました。報告書にまとめましたので、ご覧いただけますか。', 'Thưa trưởng bộ phận, đã có kết quả thử nghiệm một tháng ở kho với hệ thống quản lý hàng tồn mới ạ. Em đã tóm tắt thành báo cáo, chị xem giúp được không ạ?'],
      ['女', 'どうだった？ 棚卸しの時間が短くなる、っていう話だったわよね。', 'Thế nào? Nghe nói kiểm kê sẽ nhanh hơn đúng không?'],
      ['男', 'はい。棚卸しは、二日かかっていたのが半日で終わるようになりました。ただ、それ以上に効果が大きかったのは、欠品のほうです。', 'Vâng. Kiểm kê trước mất hai ngày, giờ nửa ngày là xong. Nhưng hiệu quả lớn hơn thế là ở chuyện thiếu hàng ạ.'],
      ['女', '欠品？', 'Thiếu hàng?'],
      ['男', 'ええ。これまでは、在庫が少なくなっても、担当者が気づくまで発注されなかったので、月に十件ほど、お客様のご注文にお応えできないことがありました。新しい仕組みでは、在庫が決められた数を下回ると、自動で発注の案が出ます。それで、この一か月は、欠品がゼロでした。', 'Vâng. Trước đây hàng tồn ít đi nhưng phải đợi người phụ trách để ý mới đặt hàng, nên mỗi tháng có khoảng mười lần không đáp ứng được đơn của khách. Với hệ thống mới, tồn kho xuống dưới mức quy định là tự động có đề xuất đặt hàng. Nhờ thế, tháng này không có lần thiếu hàng nào.'],
      ['女', 'ゼロ？ それはすごいわね。欠品でお客様をほかに取られたことも、何度かあったでしょう。', 'Không lần nào? Giỏi thật. Vì thiếu hàng mà mình bị nơi khác giành mất khách mấy lần rồi còn gì.'],
      ['男', 'はい。それから、担当者の残業も少し減りました。', 'Vâng. Ngoài ra, giờ làm thêm của người phụ trách cũng giảm được một ít.'],
      ['女', '費用はどのくらいかかるの？', 'Chi phí khoảng bao nhiêu?'],
      ['男', '年間で百二十万円です。欠品で失っていた売上を考えれば、十分に元が取れると思います。導入するとしたら、来年の四月からになります。', 'Một năm một trăm hai mươi vạn yên. Tính đến doanh thu mất vì thiếu hàng thì em nghĩ thừa sức hoàn vốn. Nếu đưa vào dùng thì sẽ từ tháng tư năm sau.'],
      ['女', 'わかった。来月の会議にかけましょう。資料には、欠品の件を一番に書いてね。棚卸しのことは、そのあとでいいから。', 'Được. Đưa ra cuộc họp tháng sau. Trong tài liệu, viết chuyện thiếu hàng lên đầu nhé. Chuyện kiểm kê để sau cũng được.'],
    ],
    questions: [
      [
        '男の人は、新しい仕組みの一番の効果は何だと言っていますか。',
        ['棚卸しが早く終わること', '在庫切れがなくなったこと', '担当者の残業が減ったこと', '年間の費用が安いこと'],
        1,
        'Anh nói それ以上に効果が大きかったのは、欠品: không còn thiếu hàng (từ mười lần một tháng xuống không). Lựa chọn 1 là hiệu quả được nói trước, nhưng anh coi là nhỏ hơn. Lựa chọn 3 là lợi ích phụ. Lựa chọn 4 không phải hiệu quả mà là chi phí.',
      ],
    ],
    points: [
      ['棚卸し', 'たなおろし', 'kiểm kê'],
      ['欠品', 'けっぴん', 'thiếu hàng, hết hàng'],
      ['元が取れる', 'もとがとれる', 'hoàn vốn'],
    ],
  }),
  item('mock3', 'sogo-chokai', 8, {
    script: [
      ['女', '社長、事務所の移転先ですが、候補を二つに絞りました。一つは駅の目の前のビルで、もう一つは駅から歩いて十五分のビルです。', 'Thưa giám đốc, về nơi chuyển văn phòng, tôi đã thu hẹp lại còn hai lựa chọn. Một là toà nhà ngay trước ga, một là toà nhà cách ga mười lăm phút đi bộ.'],
      ['男', '家賃はどう？', 'Tiền thuê thế nào?'],
      ['女', '駅前のほうが、月に四十万円ほど高いです。ただ、駅から遠いほうは、広さが一・五倍あります。', 'Toà trước ga đắt hơn khoảng bốn mươi vạn yên một tháng. Nhưng toà xa ga thì rộng gấp rưỡi.'],
      ['男', '一・五倍か。今は狭くて、打ち合わせのスペースもないからなあ。', 'Gấp rưỡi à. Bây giờ chật, đến chỗ họp bàn cũng không có.'],
      ['女', 'ええ。それに、遠いほうは、窓から川が見えて、とても明るいんです。社員にも人気が出ると思います。駅からはバスも出ていますし。', 'Vâng. Hơn nữa, toà xa ga nhìn ra sông, rất sáng sủa. Chắc nhân viên sẽ thích. Từ ga cũng có xe buýt nữa.'],
      ['男', 'うーん、でもね。うちはお客様が来社されることが多いだろう。特に年配の経営者の方が多い。駅から十五分、しかも坂道を歩いていただくのはどうかな。先月、取引先の会長がうちに見えたときも、駅から歩いてこられて、だいぶお疲れのようだったよ。','Ừm, nhưng mà… Công ty mình hay có khách đến, nhất là các chủ doanh nghiệp lớn tuổi. Bắt họ đi bộ mười lăm phút từ ga, lại còn đường dốc thì không ổn. Tháng trước, chủ tịch bên đối tác đến chỗ mình cũng đi bộ từ ga, trông mệt lắm.'],
      ['女', 'そうですね…。雨の日は特に大変かもしれません。', 'Đúng ạ… Ngày mưa chắc càng vất vả.'],
      ['男', '広さや明るさは、レイアウトの工夫で何とかなる。でも、場所だけはあとから変えられないからね。', 'Rộng hẹp, sáng tối thì bố trí khéo là xoay được. Nhưng riêng vị trí thì sau này không đổi được.'],
      ['女', 'では、駅前のビルで進めます。家賃の差は、借りる部屋を一つ減らすことで少し抑えられないか、検討してみます。', 'Vậy tôi tiến hành với toà trước ga. Phần chênh tiền thuê, tôi sẽ xem có giảm bớt được bằng cách thuê bớt một phòng không.'],
      ['男', 'うん、頼むよ。契約の条件がまとまったら見せて。', 'Ừ, nhờ chị. Điều kiện hợp đồng xong thì cho tôi xem.'],
    ],
    questions: [
      [
        '社長が事務所選びで一番重視していることは何ですか。',
        ['家賃をできるだけ抑えること', '事務所の広さが十分あること', '来客が訪問しやすいこと', '社員に人気が出ること'],
        2,
        'Giám đốc chọn toà trước ga dù đắt hơn, vì khách lớn tuổi hay đến, không nên bắt họ đi bộ xa lên dốc; ông nói 場所だけはあとから変えられない. Lựa chọn 2 ông cho là xoay được bằng cách bố trí. Lựa chọn 4 là ý của người phụ nữ. Lựa chọn 1 trái với việc ông chọn toà đắt hơn.',
      ],
    ],
    points: [
      ['移転', 'いてん', 'chuyển (trụ sở, văn phòng)'],
      ['絞る', 'しぼる', 'thu hẹp lại'],
      ['家賃', 'やちん', 'tiền thuê'],
    ],
  }),
  item('mock3', 'sogo-chokai', 9, {
    script: [
      ['男2', '新しい空気清浄機の発売ですが、営業としては、花粉の季節が始まる二月に間に合わせたいんです。他社さんも二月に新製品を出すと聞いていますので。', 'Về việc ra mắt máy lọc không khí mới, phía kinh doanh muốn kịp tháng hai, khi mùa phấn hoa bắt đầu. Nghe nói các hãng khác cũng ra sản phẩm mới vào tháng hai.'],
      ['女', '二月ですか…。実は、量産前の最後の試験で、フィルターの部分に少し問題が見つかりまして。直すのに、あと一か月はかかりそうなんです。', 'Tháng hai à… Thật ra, ở đợt thử nghiệm cuối trước khi sản xuất hàng loạt, phát hiện chút vấn đề ở phần màng lọc. Sửa chắc mất thêm ít nhất một tháng nữa.'],
      ['男2', '一か月だと三月ですか。花粉のピークには何とか…。', 'Một tháng thì tháng ba à. Đỉnh mùa phấn hoa thì chắc cũng…'],
      ['女', 'ただ、直したあと、もう一度試験をしないといけないので、三月でもぎりぎりです。', 'Có điều sửa xong phải thử nghiệm lại lần nữa, nên tháng ba cũng sát nút.'],
      ['男1', '試験を省くわけにはいかないな。何かあったら、ブランド全体の信用に関わる。', 'Không thể bỏ qua thử nghiệm được. Có chuyện gì là ảnh hưởng uy tín cả thương hiệu.'],
      ['男2', 'では、二月は予約の受付だけ始めて、お届けを三月にするのはどうでしょう。', 'Vậy tháng hai chỉ bắt đầu nhận đặt trước, tháng ba giao hàng thì sao ạ?'],
      ['女', '予約を受けておいて、もし三月に間に合わなかったら、お客様にもっとご迷惑をおかけすることになります。', 'Nhận đặt trước rồi mà tháng ba không kịp thì còn gây phiền cho khách hơn nữa.'],
      ['男1', 'そうだな。今年の花粉の季節は見送ろう。その代わり、秋の、加湿が必要になる季節に合わせて、加湿機能付きのモデルとして出す。開発に時間の余裕もできるし、試験も十分にできる。', 'Đúng thế. Bỏ qua mùa phấn hoa năm nay. Thay vào đó, ra mắt vào mùa thu, mùa cần tạo ẩm, dưới dạng mẫu có thêm chức năng tạo ẩm. Bên phát triển cũng dư thời gian, thử nghiệm cũng làm được đầy đủ.'],
      ['女', 'それなら、フィルターの改良も、もう一段階進められます。', 'Như thế thì việc cải tiến màng lọc cũng tiến thêm được một bước.'],
      ['男2', '秋ですか…。わかりました。営業としては、それまでの間、今の型の販売に力を入れます。', 'Mùa thu à… Vâng ạ. Phía kinh doanh trong thời gian đó sẽ tập trung bán mẫu hiện tại.'],
    ],
    questions: [
      [
        '新製品の発売はどうなりましたか。',
        ['二月に予定どおり発売する', '二月に予約だけ受け付ける', '秋に機能を加えて出す', '三月に試験を省いて出す'],
        2,
        'Trưởng bộ phận chốt bỏ mùa phấn hoa, ra mắt vào mùa thu dưới dạng mẫu có thêm chức năng tạo ẩm. Lựa chọn 1 là mong muốn ban đầu của kinh doanh. Lựa chọn 2 bị bác vì có thể không kịp giao. Lựa chọn 4 trái với 試験を省くわけにはいかない.',
      ],
    ],
    points: [
      ['量産', 'りょうさん', 'sản xuất hàng loạt'],
      ['見送る', 'みおくる', 'bỏ qua, gác lại'],
      ['ぎりぎり', 'ぎりぎり', 'sát nút'],
    ],
  }),
  item('mock3', 'sogo-chokai', 10, {
    script: [
      ['女', '皆様、本日はさくら製菓静岡工場の見学にお越しいただき、誠にありがとうございます。ご案内を担当いたします、広報の松井でございます。', 'Kính thưa quý vị, cảm ơn quý vị đã đến tham quan nhà máy Shizuoka của Sakura Seika hôm nay. Tôi là Matsui, phòng truyền thông, người phụ trách hướng dẫn.'],
      ['女', 'これから、チョコレートの製造ラインをご覧いただきますが、その前に、いくつかお願いがございます。', 'Lát nữa quý vị sẽ xem dây chuyền sản xuất sô-cô-la, nhưng trước đó tôi có vài điều muốn nhờ.'],
      ['女', 'まず、工場の中は、衛生管理のため、写真の撮影はご遠慮いただいております。見学の最後に、記念撮影ができる場所をご用意しておりますので、そちらでどうぞ。', 'Trước hết, vì lý do vệ sinh, xin quý vị không chụp ảnh trong nhà máy. Cuối buổi tham quan có chỗ chụp ảnh kỷ niệm, xin mời chụp ở đó.'],
      ['女', 'ラインに入る際は、白い帽子と上着を身に着けていただき、そのあと、エアシャワーという、風でほこりを落とす部屋を通っていただきます。', 'Khi vào dây chuyền, quý vị sẽ đội mũ và mặc áo khoác trắng, sau đó đi qua phòng gọi là "air shower", dùng gió thổi bụi.'],
      ['女', 'なお、帽子と上着をお渡しする前に、皆様には、まず隣の部屋で手を洗っていただきます。石けんで三十秒以上、しっかりお願いいたします。', 'Ngoài ra, trước khi phát mũ và áo, xin quý vị trước tiên rửa tay ở phòng bên cạnh. Xin rửa kỹ bằng xà phòng ít nhất ba mươi giây.'],
      ['女', 'お手荷物は、エアシャワーの手前にあるロッカーにお預けください。貴重品だけは、お持ちいただいて構いません。お手洗いは、ロッカーの横にございます。', 'Hành lý xin gửi vào tủ khoá ngay trước phòng air shower. Riêng đồ quý giá thì quý vị có thể mang theo. Nhà vệ sinh ở cạnh tủ khoá.'],
      ['女', '見学中にご気分が悪くなった場合は、近くの係員にお声がけください。', 'Trong lúc tham quan, nếu thấy không khoẻ, xin báo cho nhân viên gần nhất.'],
      ['女', '見学の時間は、約四十分です。最後に、出来立てのチョコレートの試食もございます。それでは、ご案内いたします。', 'Thời gian tham quan khoảng bốn mươi phút. Cuối buổi còn có phần ăn thử sô-cô-la vừa làm xong. Bây giờ xin mời quý vị đi theo tôi.'],
    ],
    questions: [
      [
        '見学者はこのあとまず何をしますか。',
        ['隣の部屋で手を洗う', '白い帽子と上着を着る', '荷物をロッカーに預ける', 'エアシャワーの部屋を通る'],
        0,
        'Thứ tự: rửa tay ở phòng bên (帽子と上着をお渡しする前に、まず) → mặc mũ áo → gửi đồ ở tủ trước phòng air shower → qua air shower. Lựa chọn 2 được nói trước trong băng nhưng làm sau khi rửa tay. Lựa chọn 3 và 4 là các bước sau nữa.',
      ],
    ],
    points: [
      ['衛生管理', 'えいせいかんり', 'quản lý vệ sinh'],
      ['ご遠慮いただく', 'ごえんりょいただく', 'xin vui lòng không (làm gì)'],
      ['試食', 'ししょく', 'ăn thử'],
    ],
  }),
];

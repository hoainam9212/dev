import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/** Week 3 — email and business correspondence. Level: J2 → J1. */
export const W03: BjtItem[] = [
  item('w03', 'bamen', 1, {
    material: {
      kind: 'scene',
      vi: 'Góc văn phòng có máy in. Một nam nhân viên đứng trước máy in, tay phải đang rút xấp giấy vừa in ra khỏi khay. Tay trái anh ta kẹp một phong bì lớn còn trống. Cạnh máy in có một máy huỷ giấy.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['男性が封筒に書類を入れています。', '男性が書類をシュレッダーにかけています。', '男性がプリンターに用紙を補充しています。', '男性が印刷された書類を取り出しています。'],
        3,
        'Anh ta đang rút giấy vừa in khỏi khay: 取り出す. Câu 1 nhắc tới phong bì (có trong ảnh) nhưng nó còn trống và anh chưa cho gì vào. Câu 2 nhắc tới máy huỷ giấy có trong ảnh nhưng không ai dùng. Câu 3 ngược chiều: 補充 là cho thêm giấy trắng vào máy.',
      ],
    ],
    points: [
      ['取り出す', 'とりだす', 'lấy ra'],
      ['補充する', 'ほじゅうする', 'bổ sung, châm thêm'],
      ['シュレッダーにかける', 'しゅれっだーにかける', 'cho vào máy huỷ giấy'],
    ],
  }),
  item('w03', 'bamen', 2, {
    material: {
      kind: 'scene',
      vi: 'Một nữ nhân viên ngồi ở bàn, đang dán tem lên một phong bì. Bên cạnh có một chồng phong bì đã ghi sẵn địa chỉ và tên người nhận. Trên bàn có một con dấu của công ty và hộp mực dấu, đang đóng nắp.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['女性が封筒に切手を貼っています。', '女性が封筒に宛名を書いています。', '女性が書類に印鑑を押しています。', '女性が郵便物を受け取っています。'],
        0,
        'Cô ấy đang dán tem: 切手を貼る. Câu 2 sai vì địa chỉ đã ghi sẵn từ trước. Câu 3 nhắc tới con dấu có trên bàn nhưng hộp mực đang đóng, không ai đóng dấu. Câu 4 sai chiều: cô đang chuẩn bị gửi đi, không phải nhận.',
      ],
    ],
    points: [
      ['宛名', 'あてな', 'tên và địa chỉ người nhận'],
      ['切手を貼る', 'きってをはる', 'dán tem'],
      ['印鑑を押す', 'いんかんをおす', 'đóng dấu'],
    ],
  }),
  item('w03', 'hatsugen', 1, {
    script: [
      ['状況', '取引先から届いたメールに、ファイルが添付されていませんでした。電話でそのことを伝えます。何と言いますか。', 'Email đối tác gửi tới không có tệp đính kèm. Bạn gọi điện báo việc đó. Bạn nói gì?'],
    ],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        [
          '添付ファイルがありませんでしたよ。早く送ってください。',
          '先ほどメールをいただいたのですが、ファイルが添付されていないようでして。お手数ですが、再送していただけますでしょうか。',
          'お送りしたメールにファイルが添付されていなかったので、もう一度お送りいたします。',
          '添付ファイルを拝見させていただけませんか。',
        ],
        1,
        'Nói nhẹ bằng ～ないようでして (hình như là không có) rồi nhờ gửi lại: お手数ですが、再送していただけますでしょうか. Câu 1 trách móc, giục giã. Câu 3 đảo vai: người gửi là đối tác chứ không phải mình. Câu 4 lịch sự nhưng không nói vấn đề là thiếu tệp.',
      ],
    ],
    points: [
      ['再送する', 'さいそうする', 'gửi lại'],
      ['お手数ですが', 'おてすうですが', 'phiền anh/chị, nhưng…'],
    ],
  }),
  item('w03', 'hatsugen', 2, {
    script: [
      ['状況', '取引先に送るメールの文面を、部長に確認してもらいたいです。部長は急いでいるようです。何と言いますか。', 'Bạn muốn trưởng bộ phận kiểm tra nội dung email gửi đối tác. Trưởng bộ phận có vẻ đang vội. Bạn nói gì?'],
    ],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        [
          '部長、メールを読んでいただきたいので、今すぐ見てください。',
          '部長、このメール、もう送ってもいいですよね。',
          'お急ぎのところ申し訳ありません。先方へのメールの文面を、送る前に一度ご確認いただけますか。三分ほどで済みます。',
          '部長、お時間があるときに、ご確認してください。',
        ],
        2,
        'Thấy cấp trên đang vội thì mở bằng お急ぎのところ申し訳ありません, nhờ bằng ご確認いただけますか và nói rõ mất bao lâu. Câu 1 ra lệnh cho cấp trên. Câu 2 bỏ qua bước nhờ kiểm tra. Câu 4 dùng ご確認して (khiêm nhường) cho hành động của cấp trên.',
      ],
    ],
    points: [
      ['文面', 'ぶんめん', 'câu chữ, nội dung (thư, email)'],
      ['お急ぎのところ', 'おいそぎのところ', 'trong lúc anh/chị đang vội'],
    ],
  }),
  item('w03', 'hatsugen', 3, {
    script: [
      ['状況', '取引先に送ったメールで、金額を間違えて書いてしまいました。電話で謝ります。何と言いますか。', 'Trong email gửi đối tác, bạn ghi nhầm số tiền. Bạn gọi điện xin lỗi. Bạn nói gì?'],
    ],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        [
          '先ほどお送りしたメールで、金額に誤りがございました。大変失礼いたしました。すぐに訂正したものをお送りいたします。',
          'メールの金額が違っていましたが、あまり気になさらないでください。',
          '金額の誤りについては、確認されなかった御社にも責任があるかと存じます。',
          '誠に申し訳ございません。メールはもう一度お読みになってください。',
        ],
        0,
        'Xin lỗi gồm ba ý: nói rõ lỗi (金額に誤りがございました), xin lỗi, và cách khắc phục (訂正したものをお送りいたします). Câu 2 xem nhẹ lỗi. Câu 3 đổ lỗi cho khách. Câu 4 có xin lỗi nhưng không sửa gì và lại bảo khách đọc lại.',
      ],
    ],
    points: [
      ['誤り', 'あやまり', 'sai sót'],
      ['訂正する', 'ていせいする', 'đính chính, sửa'],
    ],
  }),
  item('w03', 'hatsugen', 4, {
    script: [
      ['状況', '同僚から「明日までに会議の議事録、メールで送ってもらえる？」と頼まれましたが、明日は難しそうです。何と言いますか。', 'Đồng nghiệp nhờ: "Gửi giúp tôi biên bản cuộc họp qua email, chậm nhất là ngày mai, được không?", nhưng ngày mai thì có vẻ khó. Bạn nói gì?'],
    ],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        [
          'すみません、無理です。',
          'わかった。明日までに送るね。',
          '明日は忙しいから、ほかの人に頼んでくれる？',
          'ごめん、明日はちょっと厳しくて。あさっての午前中でもいいかな。',
        ],
        3,
        'Với đồng nghiệp ngang hàng thì thể thường là hợp, miễn là từ chối khéo (ちょっと厳しくて) và đưa ra hạn khác. Câu 1 cụt lủn. Câu 2 nhận lời, trái với tình huống. Câu 3 đẩy việc cho người khác.',
      ],
    ],
    points: [
      ['議事録', 'ぎじろく', 'biên bản cuộc họp'],
      ['厳しい', 'きびしい', 'khó (làm kịp), căng'],
    ],
  }),
  item('w03', 'sogo-chokai', 1, {
    script: [
      ['男', '林さん、先方へのお詫びのメール、読んだよ。', 'Chị Hayashi, tôi đọc email xin lỗi gửi bên đối tác rồi.'],
      ['女', 'いかがでしたか。', 'Anh thấy thế nào ạ?'],
      ['男', '内容はいいんだけど、件名が「ご連絡」だけだと、何のメールかわからないよね。「納品遅延のお詫び」とか、ひと目でわかるようにして。', 'Nội dung thì ổn, nhưng tiêu đề chỉ ghi "Liên lạc" thì không biết là email gì. Ghi kiểu "Xin lỗi về việc giao hàng chậm" để nhìn là biết ngay nhé.'],
      ['女', 'はい。', 'Vâng.'],
      ['男', 'それから、新しい納品日が書いてないね。十五日で確定したんだから、それも入れておいて。', 'Còn nữa, chưa có ngày giao hàng mới. Đã chốt ngày mười lăm rồi thì ghi luôn vào.'],
      ['女', 'わかりました。直したら、そのまま送ってもよろしいですか。', 'Vâng. Sửa xong tôi gửi luôn được không ạ?'],
      ['男', 'いや、お詫びだから、送る前にもう一度見せて。', 'Không, vì là thư xin lỗi nên trước khi gửi cho tôi xem lại một lần nữa.'],
    ],
    questions: [
      [
        '男の人が指摘したことはどれですか。',
        ['宛名が間違っている', 'お詫びの言葉が足りない', '件名で内容がわからない', '敬語の使い方がおかしい'],
        2,
        'Anh ấy khen nội dung (内容はいい) và chỉ ra hai điểm: tiêu đề không rõ, thiếu ngày giao mới. Trong bốn lựa chọn chỉ có tiêu đề. Lời xin lỗi và kính ngữ thuộc phần nội dung, đã được khen.',
      ],
      [
        '女の人はメールを直したあと、どうしますか。',
        ['先方にすぐ送る', '男の人に見せる', '先方に電話で納品日を確認する', '十五日にメールを送る'],
        1,
        'Cô hỏi có gửi luôn được không thì bị từ chối: いや…送る前にもう一度見せて. Ngày mười lăm là ngày giao hàng đã chốt, không phải ngày gửi email.',
      ],
    ],
    points: [
      ['お詫び', 'おわび', 'lời xin lỗi'],
      ['件名', 'けんめい', 'tiêu đề (email)'],
      ['納品遅延', 'のうひんちえん', 'giao hàng chậm'],
      ['確定する', 'かくていする', 'chốt, xác định'],
    ],
  }),
  item('w03', 'sogo-chokai', 2, {
    script: [
      ['女', '情報システム部からお知らせです。来月から、社外に送るメールの添付ファイルの扱いが変わります。', 'Đây là thông báo từ phòng hệ thống thông tin. Từ tháng sau, cách xử lý tệp đính kèm trong email gửi ra ngoài công ty sẽ thay đổi.'],
      ['女', 'これまでは、パスワードを付けたファイルを送って、パスワードは別のメールで送っていましたが、この方法は廃止します。', 'Trước giờ ta gửi tệp có đặt mật khẩu, rồi gửi mật khẩu bằng một email khác. Cách này sẽ bị bãi bỏ.'],
      ['女', '今後は、ファイルを社内の共有システムに置いて、ダウンロード用のリンクをメールで送ってください。リンクの有効期限は七日間です。', 'Từ nay, hãy đặt tệp lên hệ thống chia sẻ nội bộ và gửi đường link tải về qua email. Link có hiệu lực bảy ngày.'],
      ['女', 'ただ、取引先によっては、社内の決まりでリンクを開けない場合があります。そのときは、送る前に情報システム部にご相談ください。', 'Tuy nhiên, có đối tác vì quy định nội bộ mà không mở được link. Khi đó, hãy trao đổi với phòng hệ thống thông tin trước khi gửi.'],
    ],
    questions: [
      [
        '来月から、社外に添付ファイルを送るときはどうしますか。',
        ['パスワードを付けたファイルを送る', 'パスワードを別のメールで送る', 'ファイルを郵送する', '共有システムのリンクを送る'],
        3,
        'Cách cũ (tệp có mật khẩu + mật khẩu gửi riêng) bị 廃止. Cách mới là đặt tệp lên hệ thống chia sẻ và gửi link. Hai lựa chọn đầu là cách cũ, được nhắc tới để làm bẫy.',
      ],
      [
        'リンクを開けない取引先の場合、どうしますか。',
        ['情報システム部に相談する', 'パスワードを付けたファイルを送る', 'リンクの有効期限を延ばす', '取引先に決まりを変えてもらう'],
        0,
        'Câu ただ… nói rõ: そのときは、送る前に情報システム部にご相談ください. Quay lại cách gửi mật khẩu là cách đã bị bãi bỏ. Không ai nói tới gia hạn link hay đề nghị đối tác đổi quy định.',
      ],
    ],
    points: [
      ['廃止する', 'はいしする', 'bãi bỏ'],
      ['有効期限', 'ゆうこうきげん', 'thời hạn hiệu lực'],
      ['添付', 'てんぷ', 'đính kèm'],
    ],
  }),
];

import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/** Week 16 — final review: mixed themes from the whole course, exam-like. Level: J1, about a third J1+. */
export const W16: BjtItem[] = [
  item('w16', 'bamen', 1, {
    material: {
      kind: 'scene',
      vi: 'Trong kho hàng. Thùng các-tông chất thành hai chồng trên pallet. Một nhân viên đội mũ bảo hộ đang dán nhãn lên mặt thùng ở chồng bên trái. Một nhân viên khác đứng cạnh, cầm máy quét mã vạch nhưng chưa quét. Phía sau có một xe nâng đang đỗ, không có người ngồi.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['作業員がフォークリフトを運転しています。', '作業員が段ボール箱にラベルを貼っています。', '作業員が段ボール箱を積み上げています。', '作業員が箱を開けて中身を数えています。'],
        1,
        'Lựa chọn 2: một người đang dán nhãn (ラベルを貼る) lên thùng. Lựa chọn 3 dễ chọn vì thùng đã được chất thành chồng, nhưng không ai đang chất thêm. Xe nâng đang đỗ không người lái; không thùng nào bị mở.',
      ],
    ],
    points: [
      ['段ボール箱', 'だんぼーるばこ', 'thùng các-tông'],
      ['積み上げる', 'つみあげる', 'chất chồng lên'],
    ],
  }),
  item('w16', 'bamen', 2, {
    material: {
      kind: 'scene',
      vi: 'Trước cửa toà nhà công ty. Một chiếc taxi đỗ sát lề, cửa sau đang mở; một vị khách đã ngồi vào trong xe. Một nhân viên đứng trên vỉa hè cúi chào về phía xe. Cốp xe đã đóng, tài xế ngồi ở ghế lái.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['客がタクシーから降りています。', '社員がスーツケースを運んでいます。', '運転手がトランクを開けています。', '社員が客を見送っています。'],
        3,
        'Lựa chọn 4: khách đã lên xe, nhân viên cúi chào tiễn (見送る). Lựa chọn 1 dễ nhầm vì cửa xe đang mở, nhưng khách đã ngồi vào trong, tức đang đi chứ không xuống xe. Cốp đã đóng và tài xế ngồi ở ghế lái.',
      ],
    ],
    points: [
      ['見送る', 'みおくる', 'tiễn (khách)'],
      ['トランク', 'とらんく', 'cốp xe'],
    ],
  }),

  // ── 発言聴解 ──
  item('w16', 'hatsugen', 1, {
    script: [['状況', '受付で、約束の時間より早く着いた来客に、担当者がまもなく来ると伝えます。何と言いますか。', 'Ở quầy lễ tân, bạn báo với vị khách đến sớm hơn giờ hẹn rằng người phụ trách sắp ra. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['担当の者が、まもなくいらっしゃいますので。', '担当の者が、まもなく参りますので。', '担当の者が、まもなくお参りしますので。', '担当の者が、まもなく参られますので。'],
        1,
        'Người phụ trách là người công ty mình, nói với khách thì dùng khiêm nhường ngữ 参ります (lựa chọn 2). Lựa chọn 1 dễ chọn vì nghe kính trọng, nhưng いらっしゃる là tôn kính ngữ, đem dùng cho người nhà mình trước mặt khách là sai chủ thể. Lựa chọn 4 参られる trộn khiêm nhường với tôn kính. Lựa chọn 3 お参り là đi lễ chùa, đền, sai nghĩa.',
      ],
    ],
    points: [
      ['担当の者', 'たんとうのもの', 'người phụ trách (bên mình)'],
      ['参る', 'まいる', 'đi, đến — khiêm nhường ngữ'],
    ],
  }),
  item('w16', 'hatsugen', 2, {
    script: [['状況', '取引先の担当者が、あなたの会社を別の会社に紹介してくれたおかげで、新しい契約が取れました。お礼を言います。何と言いますか。', 'Nhờ người phụ trách bên đối tác giới thiệu công ty bạn với một công ty khác, bạn đã ký được hợp đồng mới. Bạn cảm ơn người đó. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['お口添えしたおかげで、話がまとまりました。', 'お口添えいただいたせいで、話がまとまりました。', 'お口添え申し上げたおかげで、話がまとまりました。', 'お口添えいただいたおかげで、話がまとまりました。'],
        3,
        'Người nói giúp là người phụ trách bên đối tác, nên dùng お口添えいただいた, và chuyện tốt thì dùng おかげで (lựa chọn 4). Lựa chọn 3 dễ chọn vì nghe rất lễ phép, nhưng 申し上げた là khiêm nhường ngữ, thành "nhờ TÔI đã nói giúp", sai chủ thể; lựa chọn 1 cùng lỗi đó. Lựa chọn 2 dùng せいで, chỉ dùng cho kết quả xấu.',
      ],
    ],
    points: [
      ['口添え', 'くちぞえ', 'nói giúp, giới thiệu hộ'],
      ['話がまとまる', 'はなしがまとまる', 'thương lượng thành công'],
      ['せいで', 'せいで', 'tại vì (kết quả xấu)'],
    ],
  }),
  item('w16', 'hatsugen', 3, {
    script: [['状況', '台風で電車が止まり、取引先との打ち合わせに遅れそうです。先方に電話で、三十分ほど遅れると伝えます。何と言いますか。', 'Bão làm tàu điện dừng chạy, bạn có thể đến muộn buổi gặp với đối tác. Bạn gọi điện báo với bên đó rằng sẽ muộn khoảng ba mươi phút. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['三十分ほどお待たせしてしまいそうです。', '三十分ほどお待ちしてしまいそうです。', '三十分ほどお待たせになりそうです。', '三十分ほど待たせていただきそうです。'],
        0,
        'Mình là người làm đối tác phải đợi, nên dùng khiêm nhường お待たせする (lựa chọn 1). Lựa chọn 2 dễ chọn vì chỉ khác vài âm, nhưng お待ちする nghĩa là "tôi đợi", ngược nghĩa. Lựa chọn 3 gắn tôn kính お〜になる vào hành động của mình. Lựa chọn 4 dùng させていただく như thể xin phép được bắt người khác đợi, sai.',
      ],
    ],
    points: [
      ['お待たせする', 'おまたせする', 'làm (người khác) phải đợi — khiêm nhường ngữ'],
      ['先方', 'せんぽう', 'phía đối tác'],
    ],
  }),
  item('w16', 'hatsugen', 4, {
    script: [['状況', '新しい担当者として、取引先に初めて電話をかけます。前任者から仕事を引き継いだことを伝えます。何と言いますか。', 'Với tư cách người phụ trách mới, bạn gọi điện lần đầu cho đối tác. Bạn báo rằng mình đã nhận bàn giao công việc từ người tiền nhiệm. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['前任の田村さんより、担当を引き継ぎました。', '前任の田村より、担当を引き継がれました。', '前任の田村より、担当を引き継ぎました。', '前任の田村より、担当を引き継いでくださいました。'],
        2,
        'Nói với người ngoài thì gọi đồng nghiệp công ty mình bằng họ, không thêm さん; người nhận bàn giao là mình nên chỉ cần thể lịch sự 引き継ぎました (lựa chọn 3). Lựa chọn 1 dễ chọn vì đúng nghĩa và nghe lịch sự, nhưng thêm さん cho người nhà mình trước mặt đối tác là sai chủ thể kính ngữ. Lựa chọn 2 dùng thể kính trọng/bị động cho việc của mình. Lựa chọn 4 dùng くださる cho đồng nghiệp, lại đảo người nhận.',
      ],
    ],
    points: [
      ['前任', 'ぜんにん', 'người tiền nhiệm'],
      ['引き継ぐ', 'ひきつぐ', 'tiếp nhận, kế nhiệm (công việc)'],
    ],
  }),

  // ── 総合聴解 ──
  item('w16', 'sogo-chokai', 1, {
    script: [
      ['女', '課長、来週の展示会で配るパンフレットなんですが、今、印刷会社から見本が届いて、価格が一か所間違っているのに気づきまして。', 'Thưa trưởng phòng, về tờ giới thiệu sẽ phát ở triển lãm tuần sau, vừa nãy công ty in gửi bản mẫu tới, tôi phát hiện có một chỗ ghi sai giá.'],
      ['男', 'え、どこ？', 'Hả, chỗ nào?'],
      ['女', '新製品の価格です。税抜きの価格を書くはずが、税込みの欄に入ってしまっていて。私の原稿の段階でのミスです。申し訳ありません。', 'Giá sản phẩm mới ạ. Lẽ ra ghi giá chưa thuế, lại bị điền vào ô giá đã gồm thuế. Là lỗi từ bản thảo của tôi. Tôi xin lỗi.'],
      ['男', 'わかった。それで、刷り直しは間に合いそう？', 'Được rồi. Thế in lại có kịp không?'],
      ['女', '印刷会社に聞いたところ、今日中に原稿を直して出せば、展示会の前日には届けられるそうです。ただ、費用が十万円ほどかかると。', 'Tôi hỏi công ty in thì họ nói nếu trong hôm nay sửa bản thảo và gửi đi, họ sẽ giao được vào hôm trước triển lãm. Có điều chi phí khoảng một trăm nghìn yên.'],
      ['男', 'うーん。シールを上から貼って直す、っていう手もあるけど。', 'Ừm. Cũng có cách dán nhãn đè lên để sửa.'],
      ['女', 'はい、それも考えたんですが、三千部ありますので、貼る作業に人手が……。', 'Vâng, tôi cũng đã nghĩ tới, nhưng có ba nghìn bản, nên việc dán cần nhiều người…'],
      ['男', 'そうか。それに、新製品の顔になるパンフレットだからね。シールだと見栄えも悪いし、刷り直そう。費用のことは、私から部長に話しておくよ。', 'Ra vậy. Với lại đó là tờ giới thiệu bộ mặt của sản phẩm mới. Dán nhãn thì trông cũng xấu, in lại đi. Chuyện chi phí để tôi nói với trưởng bộ phận.'],
      ['女', 'ありがとうございます。では、すぐ原稿を直して、印刷会社に送ります。', 'Cảm ơn anh. Vậy tôi sửa bản thảo ngay và gửi cho công ty in.'],
      ['男', '待って。送る前に、ほかにも間違いがないか、営業の誰かに、もう一度全ページ見てもらって。同じことを二度やったら、それこそ問題だから。', 'Khoan. Trước khi gửi, nhờ ai đó bên kinh doanh xem lại toàn bộ các trang một lần nữa xem còn lỗi nào khác không. Lặp lại lỗi lần hai thì mới thật là chuyện lớn.'],
      ['女', 'はい、わかりました。すぐお願いしてきます。', 'Vâng, tôi hiểu rồi. Tôi đi nhờ ngay.'],
    ],
    questions: [
      [
        '女の人はこのあとまず何をしますか。',
        ['修正した原稿を印刷会社に送る', '間違えた価格の上にシールを貼る', 'ほかの人に全体を確認してもらう', '刷り直しの費用を部長に相談する'],
        2,
        'Trưởng phòng dặn: trước khi gửi, nhờ người bên kinh doanh xem lại toàn bộ các trang; chị đáp すぐお願いしてきます (lựa chọn 3). Lựa chọn 1 dễ chọn vì chị vừa nói sẽ gửi ngay, nhưng bị chặn bằng 送る前に. Lựa chọn 2 là cách sửa đã bị bác. Lựa chọn 4 là việc trưởng phòng tự làm, không phải việc của chị.',
      ],
    ],
    points: [
      ['刷り直す', 'すりなおす', 'in lại'],
      ['税抜き', 'ぜいぬき', 'chưa gồm thuế'],
      ['見栄え', 'みばえ', 'vẻ ngoài'],
      ['原稿', 'げんこう', 'bản thảo'],
    ],
  }),
  item('w16', 'sogo-chokai', 2, {
    script: [
      ['男', '取引先からの注文、まだ半分くらいはFAXで来てるよね。来年度から、ウェブの受注システムに切り替えようと思ってるんだけど、どう思う？', 'Đơn đặt hàng của đối tác vẫn còn khoảng một nửa gửi bằng FAX nhỉ. Tôi định từ năm tài chính sau chuyển sang hệ thống nhận đơn qua web, cô thấy sao?'],
      ['女', 'そうですね。手書きの注文書は、数字が読みにくくて、確認の電話をかけることも多いですから、助かります。', 'Vâng. Đơn viết tay thì số khó đọc, phải gọi điện xác nhận cũng nhiều, nên đỡ lắm ạ.'],
      ['男', 'うん。でも、正直、それはおまけみたいなものでね。', 'Ừ. Nhưng nói thật, cái đó chỉ như phần phụ thôi.'],
      ['女', 'と、おっしゃいますと？ほかにも何か大きな理由があるんでしょうか。', 'Ý anh là sao ạ? Còn lý do lớn nào khác nữa sao?'],
      ['男', '今は、FAXを受けてから、うちの誰かがシステムに入力してるだろう。その入力に、毎日二人がかりで三時間かかってる。それがまるごとなくなるのが大きいんだよ。浮いた時間で、取引先を回ってもらえる。', 'Bây giờ nhận FAX xong thì có người bên mình nhập vào hệ thống, đúng không. Việc nhập đó mỗi ngày hai người làm mất ba tiếng. Cái lớn là việc đó mất hẳn. Thời gian dư ra có thể dùng đi thăm các đối tác.'],
      ['女', 'なるほど。ただ、年配の店主さんが多い取引先だと、パソコンでの注文には抵抗があるかもしれません。', 'Ra vậy. Có điều với những đối tác nhiều chủ tiệm lớn tuổi, có thể họ ngại đặt hàng bằng máy tính.'],
      ['男', 'そこなんだよね。最初は、FAXをやめるんじゃなくて、FAXとウェブのどちらでも受けられるようにしようと思ってる。', 'Chỗ đó đấy. Lúc đầu tôi định không bỏ FAX, mà để nhận được cả FAX lẫn web.'],
      ['女', 'それなら安心ですね。注文書の紙を保管する場所が減るのも、いいと思います。', 'Thế thì yên tâm ạ. Tôi nghĩ chỗ cất giữ giấy đơn hàng giảm đi cũng tốt.'],
      ['男', 'そうだね。じゃあ、まずは主な取引先十社に、使ってもらえそうか聞いてみてくれる？', 'Đúng vậy. Thế thì trước hết cô hỏi thử mười đối tác chính xem họ có dùng được không nhé?'],
      ['女', 'はい、わかりました。今週中に電話で伺ってみます。', 'Vâng, tôi hiểu rồi. Trong tuần này tôi sẽ gọi điện hỏi.'],
    ],
    questions: [
      [
        '男の人は、ウェブの受注システムの一番の利点は何だと言っていますか。',
        ['注文を入力する作業がそっくり不要になること', '読みにくい注文書を確認する手間が省けること', '注文書を保管しておく場所が少なくて済むこと', '年配の取引先でも簡単に注文できること'],
        0,
        'Người đàn ông nói それがまるごとなくなるのが大きい: việc nhập đơn mỗi ngày hai người mất ba tiếng sẽ mất hẳn (lựa chọn 1). Lựa chọn 2 dễ chọn vì đúng là một lợi ích, nhưng ông gọi nó là おまけ, phần phụ. Lựa chọn 3 là ý của người phụ nữ. Lựa chọn 4 ngược lại: khách lớn tuổi là điều đáng lo, nên vẫn giữ FAX.',
      ],
    ],
    points: [
      ['受注', 'じゅちゅう', 'nhận đơn đặt hàng'],
      ['二人がかり', 'ふたりがかり', 'hai người cùng làm'],
      ['おまけ', 'おまけ', 'phần thêm, phần phụ'],
      ['抵抗がある', 'ていこうがある', 'ngại, không thoải mái'],
    ],
  }),
  item('w16', 'sogo-chokai', 3, {
    script: [
      ['男', 'お客様相談窓口の委託先、二社に絞ったんだったね。どっちがよさそう？', 'Nơi nhận ủy thác quầy tư vấn khách hàng, cô đã lọc còn hai công ty rồi nhỉ. Bên nào có vẻ tốt?'],
      ['女', 'はい。料金は、あさひサービスさんのほうが月に二十万円ほど安いです。それに、夜中も二十四時間、電話を受けてくれるそうです。', 'Vâng. Về giá thì Asahi Service rẻ hơn khoảng hai trăm nghìn yên mỗi tháng. Thêm nữa, nghe nói họ nhận điện thoại cả đêm, suốt hai mươi bốn giờ.'],
      ['男2', '夜中の電話なんて、うちの商品じゃほとんどないでしょう。でも、安いに越したことはないですよ。私はあさひさんでいいと思いますけど。', 'Điện thoại lúc nửa đêm thì với hàng của mình hầu như không có đâu. Nhưng rẻ thì vẫn hơn chứ. Tôi thấy chọn Asahi là được.'],
      ['女', '私も最初はそう思ったんです。ただ、もう一社のミライコンタクトさんは、お客様からどんな声があったか、一件ずつ中身をまとめて、毎日報告してくれるんです。あさひさんは、月に一度、件数を送ってくれるだけで。', 'Lúc đầu tôi cũng nghĩ vậy. Có điều công ty còn lại là Mirai Contact thì tổng hợp nội dung từng ý kiến của khách và báo cáo mỗi ngày. Còn Asahi chỉ gửi số lượng cuộc gọi mỗi tháng một lần.'],
      ['男', '件数だけじゃ、何が起きてるのかわからないね。', 'Chỉ có số lượng thì không biết chuyện gì đang xảy ra nhỉ.'],
      ['女', 'ええ。去年、加湿器のふたが閉まりにくいという声に気づくのが遅れて、結局、回収することになりましたよね。あのとき、お客様の声がもっと早く開発に届いていれば、と思いまして。', 'Vâng. Năm ngoái mình phát hiện muộn ý kiến về chuyện nắp máy tạo ẩm khó đóng, rốt cuộc phải thu hồi sản phẩm. Tôi nghĩ giá lúc đó ý kiến của khách đến được bộ phận phát triển sớm hơn.'],
      ['男2', 'なるほど……。でも、二十万円の差は小さくないですよ。', 'Ra vậy… Nhưng chênh hai trăm nghìn yên thì không nhỏ đâu.'],
      ['女', 'はい。ですので、ミライさんには、電話を受ける人数を今の十人から八人に減らせないか、相談してみるつもりです。', 'Vâng. Vì thế tôi định bàn với Mirai xem có giảm số người nhận điện thoại từ mười người hiện nay xuống tám được không.'],
      ['男', 'うん、それで差が縮まるなら、いいんじゃないか。来週の会議で、その結果も含めて説明してくれる？', 'Ừ, nếu thế mà khoảng chênh thu hẹp lại thì được đấy chứ. Ở cuộc họp tuần sau cô trình bày luôn cả kết quả đó nhé?'],
      ['女', 'はい、承知しました。', 'Vâng, tôi hiểu rồi.'],
    ],
    questions: [
      [
        '女の人が委託先を選ぶうえで最も重視していることは何ですか。',
        ['毎月の料金をできるだけ安く抑えること', '夜中でも電話に出てもらえること', '受付の人数を減らしてもらうこと', '客の声の中身をすぐ伝えてくれること'],
        3,
        'Chị chọn Mirai Contact vì họ tổng hợp nội dung từng ý kiến của khách và báo mỗi ngày, để lỗi như vụ máy tạo ẩm đến được bộ phận phát triển sớm (lựa chọn 4). Lựa chọn 1 dễ chọn nhất vì hai người đàn ông đều nhắc chuyện chênh hai trăm nghìn yên, nhưng đó là ý của người đàn ông thứ hai; chị chỉ tìm cách thu hẹp khoảng chênh. Lựa chọn 2 là điểm mạnh của Asahi, bị gạt đi vì hầu như không có cuộc gọi ban đêm. Lựa chọn 3 chỉ là việc chị sẽ bàn tiếp với Mirai.',
      ],
    ],
    points: [
      ['委託先', 'いたくさき', 'nơi nhận ủy thác, bên nhận làm thuê'],
      ['絞る', 'しぼる', 'thu hẹp, lọc lại'],
      ['回収', 'かいしゅう', 'thu hồi (sản phẩm lỗi)'],
      ['縮まる', 'ちぢまる', 'thu hẹp lại, rút ngắn'],
    ],
  }),
  item('w16', 'sogo-chokai', 4, {
    script: [
      ['男', 'もしもし、いつもお世話になっております。株式会社みなと設備の川口です。来週の打ち合わせの件で、お電話いたしました。', 'Alô, cảm ơn quý công ty luôn giúp đỡ. Tôi là Kawaguchi của công ty Minato Setsubi. Tôi gọi về buổi gặp tuần sau.'],
      ['男', '十一月二十六日の木曜日、午後二時から御社に伺うことになっておりましたが、当日の昼から、別の現場の立ち会いが入ってしまいまして、二時に伺うのが難しくなりました。', 'Theo lịch tôi sẽ đến quý công ty từ hai giờ chiều thứ năm ngày 26 tháng 11 (năm 2026), nhưng từ trưa hôm đó tôi có lịch giám sát ở một công trường khác, nên khó đến lúc hai giờ.'],
      ['男', '誠に申し訳ないのですが、同じ日の午後四時からに変更していただくことは可能でしょうか。立ち会いは三時には終わる予定ですので、四時でしたら間違いなく伺えます。', 'Thật xin lỗi, nhưng có thể đổi sang từ bốn giờ chiều cùng ngày được không ạ? Buổi giám sát dự kiến xong trước ba giờ, nên bốn giờ thì chắc chắn tôi đến được.'],
      ['男', 'あ、それから、先日お話しした、こちらから技術の者を一名連れていく件ですが、その者が当日都合がつかなくなりましたので、今回は私一人で伺います。ですので、会議室は、前回お話しした大きいほうでなくても大丈夫です。', 'À, còn việc hôm trước tôi nói sẽ dẫn theo một người bên kỹ thuật, người đó hôm ấy không sắp xếp được, nên lần này tôi đến một mình. Vì vậy phòng họp không cần phòng lớn như lần trước tôi nói cũng được.'],
      ['男', '時間の件は、もし四時が難しいようでしたら、翌日の金曜日でしたら一日空いておりますので、ご都合のよい時間をお知らせください。', 'Về giờ giấc, nếu bốn giờ khó thì hôm sau là thứ sáu tôi rảnh cả ngày, xin cho biết giờ nào tiện cho quý công ty.'],
      ['男', 'お手数をおかけしますが、折り返しお電話いただけますと幸いです。私の携帯は、〇九〇の……。いえ、失礼しました、会社のほうにお電話いただければ、つながるようにしておきます。よろしくお願いいたします。', 'Xin lỗi đã làm phiền, mong quý công ty gọi lại cho tôi. Số di động của tôi là 090… À không, xin lỗi, quý công ty cứ gọi tới công ty, tôi sẽ để máy được chuyển tới. Xin cảm ơn.'],
    ],
    questions: [
      [
        '川口さんは、打ち合わせについて何を変えてほしいと言っていますか。',
        ['打ち合わせに使う会議室', '打ち合わせを始める時刻', '打ち合わせに出る人数', '打ち合わせを行う日にち'],
        1,
        'Ông Kawaguchi nhờ đổi từ hai giờ sang bốn giờ chiều cùng ngày: thứ ông muốn đổi là giờ bắt đầu (lựa chọn 2). Lựa chọn 4 dễ chọn vì có nhắc thứ sáu, nhưng đó chỉ là phương án dự phòng nếu bốn giờ không được. Số người (lựa chọn 3) là bên ông tự đổi và báo lại, không phải điều nhờ đổi. Về phòng họp (lựa chọn 1), ông chỉ nói không cần phòng lớn cũng được.',
      ],
    ],
    points: [
      ['立ち会い', 'たちあい', 'có mặt giám sát'],
      ['御社', 'おんしゃ', 'quý công ty (khi nói)'],
      ['折り返し', 'おりかえし', 'gọi lại'],
      ['都合がつく', 'つごうがつく', 'sắp xếp được (thời gian)'],
    ],
  }),
];

import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/** Week 14 — presentations and debate: speakers often say what they think without saying it. Level: J1, about a third J1+. */
export const W14: BjtItem[] = [
  item('w14', 'bamen', 1, {
    material: {
      kind: 'scene',
      vi: 'Phòng họp đang có buổi thuyết trình. Một người đứng cạnh màn chiếu, tay cầm bút trình chiếu, trên màn là biểu đồ cột. Sáu người ngồi nghe quanh bàn: hai người đang ghi chép vào sổ, một người ngồi hàng đầu đang giơ tay. Trên bàn của người nghe đã có sẵn tập tài liệu.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['発表者が資料を配っています。', '聞き手の一人が手を挙げています。', '発表者がスクリーンを片付けています。', '聞き手が全員メモを取っています。'],
        1,
        'Lựa chọn 2: một người nghe ở hàng đầu đang giơ tay (手を挙げる), thường là để hỏi. Lựa chọn 4 dễ chọn vì có người ghi chép, nhưng chỉ hai trong sáu người, không phải tất cả. Tài liệu đã nằm sẵn trên bàn, nên không ai đang phát.',
      ],
    ],
    points: [
      ['手を挙げる', 'てをあげる', 'giơ tay'],
      ['聞き手', 'ききて', 'người nghe'],
    ],
  }),
  item('w14', 'bamen', 2, {
    material: {
      kind: 'scene',
      vi: 'Phòng họp. Một người đàn ông đứng trước bảng trắng, tay cầm bút dạ đang viết; bảng được kẻ làm hai cột, đầu cột ghi 「メリット」 và 「デメリット」, cột trái đã có ba dòng. Bốn người khác ngồi quanh bàn nhìn lên bảng. Máy tính xách tay trên bàn đang gập lại, máy chiếu không bật.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['男性がホワイトボードに書き込んでいます。', '男性がホワイトボードの字を消しています。', 'パソコンの画面がスクリーンに映っています。', '全員が立って話し合っています。'],
        0,
        'Lựa chọn 1: người đàn ông đang cầm bút viết lên bảng (書き込む). Lựa chọn 2 cũng nói về bảng trắng và chính người đó, nhưng hành động sai: đang viết chứ không xoá. Máy tính gập, máy chiếu tắt; bốn người còn lại đang ngồi.',
      ],
    ],
    points: [
      ['書き込む', 'かきこむ', 'viết vào, ghi vào'],
      ['デメリット', 'でめりっと', 'nhược điểm'],
    ],
  }),

  // ── 発言聴解 ──
  item('w14', 'hatsugen', 1, {
    script: [['状況', '取引先でのプレゼンを終えました。参加者に、質問があれば遠慮なく出してほしいと伝えます。何と言いますか。', 'Bạn vừa thuyết trình xong ở công ty đối tác. Bạn nói với người tham dự rằng có câu hỏi thì cứ thoải mái nêu ra. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['何かご質問がありましたら、お聞かせください。', '何かご質問がありましたら、お伺いください。', '何かご質問がありましたら、お答えください。', '何かご質問がありましたら、拝聴してください。'],
        0,
        'Người hỏi là khách, nên mời bằng お聞かせください: "xin cho tôi được nghe" (lựa chọn 1). Lựa chọn 2 dễ chọn vì hay bị nói nhầm, nhưng 伺う là khiêm nhường ngữ, không dùng cho hành động hỏi của khách. Lựa chọn 3 lại nhờ khách trả lời, sai nghĩa. Lựa chọn 4 dùng khiêm nhường 拝聴 cho người nghe.',
      ],
    ],
    points: [
      ['お聞かせください', 'おきかせください', 'xin cho (tôi) được nghe'],
      ['伺う', 'うかがう', '(tôi) hỏi, nghe, đến thăm — khiêm nhường ngữ'],
    ],
  }),
  item('w14', 'hatsugen', 2, {
    script: [['状況', 'プレゼンの途中で、資料のページ番号を間違えて案内したことに気づきました。聞き手に訂正します。何と言いますか。', 'Giữa buổi thuyết trình, bạn nhận ra mình đã chỉ nhầm số trang tài liệu. Bạn đính chính với người nghe. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['失礼しました。五ページを拝見ください。', '失礼しました。五ページをお見せください。', '失礼しました。五ページをご覧ください。', '失礼しました。五ページにお戻りします。'],
        2,
        'Người xem tài liệu là người nghe, nên dùng tôn kính ngữ ご覧ください (lựa chọn 3). Lựa chọn 1 dễ chọn vì 拝見 cũng là "xem" lịch sự, nhưng đó là khiêm nhường ngữ cho việc mình xem, sai chủ thể. Lựa chọn 2 là "xin cho tôi xem trang năm". Lựa chọn 4 dùng khiêm nhường お〜する cho hành động của người nghe; đúng phải là お戻りください.',
      ],
    ],
    points: [
      ['ご覧ください', 'ごらんください', 'xin mời xem'],
      ['訂正する', 'ていせいする', 'đính chính, sửa lại'],
    ],
  }),
  item('w14', 'hatsugen', 3, {
    script: [['状況', '社内の企画コンペで、同僚の発表に質問します。内容を評価したうえで、数字の根拠を尋ねます。何と言いますか。', 'Ở cuộc thi ý tưởng trong công ty, bạn đặt câu hỏi cho bài trình bày của đồng nghiệp. Sau khi ghi nhận nội dung, bạn hỏi căn cứ của các con số. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['興味深くお聞きになりました。根拠を伺えますか。', '興味深く拝聴しました。根拠を申し上げますか。', '興味深く拝聴しました。根拠をお聞かせしますか。', '興味深く拝聴しました。根拠を伺えますか。'],
        3,
        'Mình nghe (拝聴しました) và mình xin hỏi (伺えますか): cả hai hành động đều của mình, dùng khiêm nhường ngữ (lựa chọn 4). Lựa chọn 1 dễ chọn vì vế sau đúng, nhưng お聞きになる là tôn kính ngữ đem dùng cho việc chính mình nghe. Lựa chọn 2 và 3 biến thành "tôi nói / tôi cho nghe căn cứ nhé?", sai chủ thể: người phải đưa căn cứ là người trình bày.',
      ],
    ],
    points: [
      ['拝聴する', 'はいちょうする', '(tôi) kính cẩn lắng nghe'],
      ['根拠', 'こんきょ', 'căn cứ'],
      ['コンペ', 'こんぺ', 'cuộc thi (ý tưởng, đề án)'],
    ],
  }),
  item('w14', 'hatsugen', 4, {
    script: [['状況', '社内会議で発表中、持ち時間が残り少なくなりました。部長たちに、残りは要点だけ説明すると伝えます。何と言いますか。', 'Đang trình bày trong cuộc họp nội bộ, thời gian được giao sắp hết. Bạn báo với các trưởng bộ phận rằng phần còn lại bạn chỉ nói ý chính. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['残り時間も少ないので、要点だけご説明になります。', '残り時間も少ないので、要点だけご説明します。', '残り時間も少ないので、要点だけご説明願います。', '残り時間も少ないので、要点だけご説明くださいます。'],
        1,
        'Người giải thích là mình, nên dùng khiêm nhường ご説明します (lựa chọn 2). Lựa chọn 1 dễ chọn vì nghe trang trọng hơn, nhưng ご〜になる là tôn kính ngữ, dùng cho chính mình là sai chủ thể. Lựa chọn 3 lại nhờ người nghe giải thích. Lựa chọn 4 nghĩa là "(người trên) giải thích cho", cũng sai chủ thể.',
      ],
    ],
    points: [
      ['持ち時間', 'もちじかん', 'thời gian được phân cho'],
      ['要点', 'ようてん', 'ý chính'],
    ],
  }),

  // ── 総合聴解 ──
  item('w14', 'sogo-chokai', 1, {
    script: [
      ['女', '部長、新規事業のアイデア、最終候補の二案ですが、どちらを役員会に出しましょうか。', 'Thưa trưởng bộ phận, về hai ý tưởng kinh doanh mới lọt vào vòng cuối, mình đưa phương án nào lên hội đồng quản trị ạ?'],
      ['男', 'うん、両方読んだよ。A案の、ペットの見守りサービス、あれは面白いね。若手らしい発想だ。', 'Ừ, tôi đọc cả hai rồi. Phương án A, dịch vụ trông chừng thú cưng, cái đó thú vị đấy. Đúng kiểu ý tưởng của người trẻ.'],
      ['女', 'はい。社内のアンケートでも、A案の人気が圧倒的でした。', 'Vâng. Trong khảo sát nội bộ, phương án A cũng được yêu thích áp đảo.'],
      ['男', 'そうだろうね。B案の、工場の点検をドローンでやるっていうのは、地味だけど。', 'Chắc vậy. Còn phương án B, kiểm tra nhà máy bằng drone, thì hơi kém nổi.'],
      ['女', 'ええ。ただ、B案は、すでに取引先の二社から、試してみたいという声をいただいているそうです。', 'Vâng. Có điều nghe nói phương án B đã có hai đối tác bảo muốn dùng thử rồi ạ.'],
      ['男', 'そこなんだよ。役員はね、面白いかどうかより、来年の今ごろ、本当にお金になっているかどうかを聞いてくるから。', 'Chính chỗ đó. Các thành viên hội đồng ấy, họ không hỏi có thú vị hay không, mà hỏi tầm này năm sau nó có thật sự ra tiền chưa.'],
      ['女', 'では、今回はB案一本で、ということでしょうか……。', 'Vậy lần này chỉ đưa mỗi phương án B, phải không ạ…'],
      ['男', 'いや、A案を捨てるのも惜しい。ただ、A案は、誰が使って、いくら払ってくれるのか、まだ見えてないだろう。', 'Khoan, bỏ phương án A cũng tiếc. Có điều phương án A vẫn chưa thấy rõ ai dùng và họ trả bao nhiêu, đúng không.'],
      ['女', '確かに、そこはまだ想定の段階です。アンケートも社内の人に聞いただけで、実際に飼い主の方に聞いたわけではありませんし。', 'Đúng là chỗ đó vẫn còn ở mức giả định. Khảo sát cũng chỉ hỏi người trong công ty, chứ chưa thật sự hỏi những người nuôi thú cưng.'],
      ['男', 'だから、今回はB案を出して、A案は、利用者の調査をしてから、来年もう一度、ということでどうかな。', 'Vì vậy, lần này đưa phương án B, còn phương án A thì sau khi khảo sát người dùng, năm sau đưa lại một lần nữa, cô thấy sao?'],
      ['女', 'わかりました。A案のチームには、私からそう伝えて、調査の進め方も一緒に考えてみます。', 'Tôi hiểu rồi. Với nhóm phương án A, tôi sẽ nói lại như vậy và cùng họ tính cách tiến hành khảo sát.'],
    ],
    questions: [
      [
        '男の人が案を選ぶうえで一番重視しているのは何ですか。',
        ['若い社員らしい新しい発想であること', '社内で多くの支持を集めていること', '早い時期に確実に収益につながること', '利用者の調査がきちんと済んでいること'],
        2,
        'Ông nói 役員は…本当にお金になっているかどうか và chọn phương án B vì đã có đối tác muốn dùng thử: điều ông coi trọng là sớm và chắc chắn ra doanh thu (lựa chọn 3). Lựa chọn 1 dễ chọn vì ông khen phương án A thú vị, nhưng đó chỉ là lời khen, không phải tiêu chí chọn. Lựa chọn 2 là điều người phụ nữ nêu. Lựa chọn 4 là việc phương án A phải làm sau.',
      ],
    ],
    points: [
      ['新規事業', 'しんきじぎょう', 'mảng kinh doanh mới'],
      ['圧倒的', 'あっとうてき', 'áp đảo'],
      ['地味', 'じみ', 'giản dị, không nổi bật'],
      ['惜しい', 'おしい', 'tiếc'],
    ],
  }),
  item('w14', 'sogo-chokai', 2, {
    script: [
      ['女', '来月の新製品発表会ですが、デモンストレーションは、やはり会場で実際に動かしてお見せしたいと思っています。', 'Về buổi ra mắt sản phẩm mới tháng sau, phần trình diễn thì tôi vẫn muốn cho chạy thật ngay tại hội trường.'],
      ['男2', 'うーん、技術の立場から言うと、会場のネットワークが不安定だと、途中で止まる可能性があるんですよね。前回の展示会でも、一度ありましたし。', 'Ừm, từ góc độ kỹ thuật mà nói, mạng ở hội trường mà chập chờn thì có khả năng bị dừng giữa chừng. Ở triển lãm lần trước cũng đã có một lần rồi.'],
      ['男', 'ああ、あれは冷や汗ものだったね。じゃあ、事前に撮った動画を流すほうが安全かな。', 'À, lần đó toát mồ hôi thật. Vậy chiếu video quay sẵn thì an toàn hơn nhỉ.'],
      ['女', 'でも、動画だと、お客様に「本当に動くのか」と思われてしまいませんか。その場で動くところを見ていただくのが、一番説得力があると思うんです。', 'Nhưng video thì khách có nghĩ "liệu có chạy thật không" không ạ? Tôi nghĩ để khách xem nó chạy ngay tại chỗ là thuyết phục nhất.'],
      ['男2', 'それなら、会場に専用の回線を一本引いてもらえば、かなりリスクは下がります。費用は少しかかりますが。', 'Nếu vậy, nhờ hội trường kéo riêng một đường truyền thì rủi ro giảm đi nhiều. Có tốn thêm chút chi phí.'],
      ['男', 'それくらいなら出せるよ。ただ、万一止まったときのために、動画も用意しておいて、すぐ切り替えられるようにしておこう。', 'Chừng đó thì chi được. Có điều để phòng lỡ bị dừng, cứ chuẩn bị cả video để chuyển sang ngay được.'],
      ['女', 'はい。それと、デモの説明は、私より、開発した山下さんにお願いしたほうがいいかと。', 'Vâng. Ngoài ra, phần giải thích khi trình diễn, tôi nghĩ nhờ anh Yamashita người phát triển thì tốt hơn tôi.'],
      ['男2', 'えっ、私ですか。人前で話すのは、ちょっと……。', 'Hả, tôi ạ? Nói trước đông người thì tôi hơi…'],
      ['男', '説明は今までどおり君がやって、山下さんには操作と、技術的な質問への回答をお願いする、という分担でどう？', 'Phần giải thích cô cứ làm như trước giờ, còn anh Yamashita thì nhờ thao tác máy và trả lời câu hỏi kỹ thuật, chia việc như thế được không?'],
      ['男2', 'それなら、何とか。', 'Thế thì tôi cố được.'],
      ['女', 'わかりました。では、その形で準備を進めます。', 'Vâng. Vậy tôi chuẩn bị theo cách đó.'],
    ],
    questions: [
      [
        'デモはどのように行うことになりましたか。',
        ['専用の回線で実演し、動画も予備に用意する', '事前に撮った動画だけを会場で流す', '会場の普段のネットワークで実際に動かす', '開発者が一人で説明と操作を担当する'],
        0,
        'Chốt lại: kéo đường truyền riêng để chạy thật, và chuẩn bị video phòng khi dừng (lựa chọn 1). Lựa chọn 2 là đề xuất của người đàn ông, bị phản đối vì kém thuyết phục. Lựa chọn 3 dễ chọn vì đúng là chạy thật, nhưng mạng thường của hội trường chính là rủi ro đã nêu. Lựa chọn 4 bị chính anh Yamashita ngại; cuối cùng chia việc giải thích và thao tác.',
      ],
    ],
    points: [
      ['冷や汗もの', 'ひやあせもの', 'chuyện toát mồ hôi lạnh'],
      ['説得力', 'せっとくりょく', 'sức thuyết phục'],
      ['回線', 'かいせん', 'đường truyền'],
      ['分担', 'ぶんたん', 'phân chia việc'],
    ],
  }),
  item('w14', 'sogo-chokai', 3, {
    script: [
      ['女', '先輩、明日の役員向けのプレゼン、リハーサルを見ていただいて、ありがとうございました。どうでしたか。', 'Anh ơi, cảm ơn anh đã xem buổi tập cho bài thuyết trình trước ban lãnh đạo ngày mai. Anh thấy thế nào ạ?'],
      ['男', 'うん、内容はよくまとまってたよ。スライドもきれいだったし。', 'Ừ, nội dung gọn gàng đấy. Slide cũng đẹp.'],
      ['女', 'ありがとうございます。実は、まだ時間が二分ほどオーバーしているので、スライドを何枚か削ろうかと思っているんですが。', 'Cảm ơn anh. Thật ra vẫn còn lố khoảng hai phút, nên em định bỏ bớt mấy slide.'],
      ['男', '二分くらいなら、話すスピードで何とかなるよ。それより、ちょっと気になったのは、三枚目の市場規模の数字かな。', 'Hai phút thì chỉnh tốc độ nói là được. Hơn thế, điều anh hơi để ý là con số quy mô thị trường ở slide thứ ba.'],
      ['女', 'はい、あれは調査会社のデータを使っています。', 'Vâng, chỗ đó em dùng số liệu của công ty nghiên cứu.'],
      ['男', 'それ、何年のデータ？', 'Số liệu năm nào thế?'],
      ['女', 'ええと……二〇二三年のものです。', 'Ừm… năm 2023 ạ.'],
      ['男', '常務はね、そういうところを必ず突いてくるんだよ。三年前の数字で大丈夫なのかって。新しい数字が出ているなら、そっちに差し替えたほうがいい。', 'Giám đốc điều hành nhất định sẽ xoáy vào chỗ đó. Con số của ba năm trước có ổn không. Nếu đã có số mới thì nên thay bằng số đó.'],
      ['女', 'わかりました。調査会社のサイトで、最新版が出ているか確認してみます。', 'Em hiểu rồi. Em sẽ xem trên trang của công ty nghiên cứu xem đã có bản mới nhất chưa.'],
      ['男', 'うん。もし最新版がなければ、なぜ古いデータを使っているのか、一言説明できるようにしておけばいいから。', 'Ừ. Nếu chưa có bản mới thì chỉ cần chuẩn bị để giải thích được một câu vì sao dùng số liệu cũ.'],
      ['女', 'はい。スライドを削るのは、そのあとで考えることにします。', 'Vâng. Việc bỏ bớt slide thì để sau em tính.'],
      ['男', 'それから、時間があれば、出そうな質問を五つくらい書き出しておくといいよ。', 'Còn nữa, nếu có thời gian thì viết ra chừng năm câu hỏi có thể bị hỏi thì tốt.'],
    ],
    questions: [
      [
        '女の人はまず何をしますか。',
        ['時間内に収まるようにスライドを減らす', '使っている数字に新しいものがないか調べる', '古いデータを使う理由を説明できるようにする', '役員から出そうな質問を書き出しておく'],
        1,
        'Người phụ nữ nói sẽ xem trên trang công ty nghiên cứu đã có bản mới nhất chưa (lựa chọn 2). Lựa chọn 1 dễ chọn vì là việc chị định làm lúc đầu, nhưng chị nói để sau (そのあとで). Lựa chọn 3 chỉ cần khi không có bản mới. Lựa chọn 4 là việc làm thêm nếu còn thời gian.',
      ],
    ],
    points: [
      ['市場規模', 'しじょうきぼ', 'quy mô thị trường'],
      ['突く', 'つく', 'xoáy vào, chỉ ra (điểm yếu)'],
      ['差し替える', 'さしかえる', 'thay thế (bằng cái khác)'],
    ],
  }),
  item('w14', 'sogo-chokai', 4, {
    script: [
      ['女', '皆さん、こんにちは。経営企画部の石田です。今日は、来月から全社で始める「会議の進め方の見直し」について、お話しします。', 'Chào mọi người. Tôi là Ishida ở phòng kế hoạch kinh doanh. Hôm nay tôi xin nói về "rà soát lại cách tiến hành cuộc họp" sẽ bắt đầu trên toàn công ty từ tháng sau.'],
      ['女', '昨年行った社員アンケートで、「会議が長い」と答えた人は六割を超えました。ただ、私たちが一番問題だと考えたのは、長さよりも、別の数字です。「会議で反対意見を言いにくい」と答えた人が、七割近くいたんです。', 'Trong khảo sát nhân viên năm ngoái, hơn sáu mươi phần trăm trả lời "họp lâu". Nhưng điều chúng tôi cho là vấn đề nhất lại là một con số khác, chứ không phải độ dài. Gần bảy mươi phần trăm trả lời "khó nói ý kiến phản đối trong cuộc họp".'],
      ['女', '実は、最初は、会議の時間を一律三十分以内にする、というルールを考えていました。ですが、時間だけを短くすると、意見を出し合う前に、上の人の案でそのまま決まってしまうおそれがある、というご指摘を受けて、やめることにしました。', 'Thật ra lúc đầu chúng tôi đã tính đến quy định mọi cuộc họp đều trong vòng ba mươi phút. Nhưng chúng tôi được góp ý rằng nếu chỉ rút ngắn thời gian, e là chưa kịp trao đổi ý kiến thì đã chốt luôn theo phương án của người cấp trên, nên chúng tôi đã bỏ.'],
      ['女', 'そこで、来月からは、会議の最初に、必ず全員が一言ずつ意見を言う時間を設けます。また、司会は、役職の一番高い人ではなく、毎回交代で担当していただきます。', 'Vì vậy, từ tháng sau, đầu mỗi cuộc họp nhất định sẽ có thời gian để tất cả mọi người lần lượt nói một câu ý kiến. Ngoài ra, chủ trì không phải người có chức vụ cao nhất mà mỗi lần sẽ luân phiên.'],
      ['女', '私たちが目指しているのは、立場に関係なく、違う意見をきちんと出し合ったうえで物事を決める会社です。会議の時間が短くなるのは、その結果としてついてくれば、と考えています。', 'Điều chúng tôi hướng tới là một công ty quyết định mọi việc sau khi đã đưa ra đầy đủ các ý kiến khác nhau, bất kể vị trí. Còn cuộc họp ngắn lại thì chúng tôi mong nó đến như một kết quả kéo theo.'],
      ['女', '半年後に、もう一度アンケートを行い、効果を確認する予定です。ご協力をお願いします。', 'Sáu tháng sau, chúng tôi dự định khảo sát lại để kiểm tra hiệu quả. Rất mong mọi người hợp tác.'],
    ],
    questions: [
      [
        'この取り組みで、会社は何を目指していますか。',
        ['すべての会議を三十分以内に終えること', '役職の高い人が会議の司会を務めること', '半年後のアンケートで結果を確かめること', '立場を問わず異なる意見を出し合えること'],
        3,
        'Người nói nêu rõ 私たちが目指しているのは: công ty quyết định sau khi đưa ra đủ ý kiến khác nhau, bất kể vị trí (lựa chọn 4). Lựa chọn 1 dễ chọn vì "họp lâu" là kết quả khảo sát đầu tiên, nhưng quy định ba mươi phút đã bị bỏ; họp ngắn chỉ là kết quả kéo theo. Lựa chọn 2 ngược với quy định chủ trì luân phiên. Lựa chọn 3 là bước kiểm tra về sau.',
      ],
    ],
    points: [
      ['一律', 'いちりつ', 'đồng loạt'],
      ['指摘', 'してき', 'góp ý, chỉ ra'],
      ['設ける', 'もうける', 'đặt ra, lập ra'],
      ['交代で', 'こうたいで', 'luân phiên'],
    ],
  }),
];

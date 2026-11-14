import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/** Week 9 — complaints and apologies. Level: J1. */
export const W09: BjtItem[] = [
  item('w09', 'jokyo', 1, {
    material: {
      kind: 'scene',
      vi: 'Khu chăm sóc khách hàng. Một nhân viên đeo tai nghe vừa tháo xuống, quay sang đồng nghiệp ngồi bàn bên. Trên màn hình là trang tra cứu mã vận đơn.',
    },
    script: [
      ['女', 'あのう、さっきのお電話、だいぶ長かったですね。大丈夫でした？', 'Ừm, cuộc gọi lúc nãy dài quá nhỉ. Có ổn không?'],
      ['男', 'いや、かなりお怒りで。昨日のお昼に着くはずだったのに、まだ手元にないって。', 'Không, khách giận lắm. Lẽ ra phải tới vào trưa hôm qua mà đến giờ vẫn chưa nhận được.'],
      ['女', '運送会社には問い合わせました？', 'Anh đã hỏi công ty vận chuyển chưa?'],
      ['男', 'うん、伝票番号で調べてもらったら、うちの倉庫で出荷が一日ずれていたみたいで。今日の夕方にはお届けできるそうだから、改めてお詫びの電話を入れるよ。', 'Rồi, nhờ họ tra theo mã vận đơn thì hình như kho bên mình xuất hàng trễ một ngày. Họ nói chiều nay giao được, nên tôi sẽ gọi lại xin lỗi lần nữa.'],
      ['女', 'そうですね。倉庫のほうにも、理由を聞いておきます。', 'Phải đấy. Tôi cũng sẽ hỏi kho xem vì sao.'],
    ],
    questions: [
      [
        '二人は何について話していますか。',
        ['お客様の商品破損の件', 'お客様の配送遅延の件', 'お客様の伝票番号の件', 'お客様の請求金額の件'],
        1,
        'Hàng lẽ ra tới trưa hôm qua mà chưa tới (着くはず…まだ手元にない), kho xuất trễ một ngày → chuyện giao hàng chậm, lựa chọn 2. Lựa chọn 3 có từ 伝票番号 nghe trong băng, nhưng mã vận đơn chỉ là thứ dùng để tra. Không ai nói hàng bị vỡ hay tiền bị tính sai.',
      ],
    ],
    points: [
      ['手元', 'てもと', 'trong tay, chỗ mình'],
      ['ずれる', 'ずれる', 'lệch, trễ'],
      ['改めて', 'あらためて', 'lại lần nữa (một cách chính thức)'],
    ],
  }),
  item('w09', 'jokyo', 2, {
    material: {
      kind: 'scene',
      vi: 'Phòng họp. Hai người ngồi cạnh nhau, trước mặt là một bản báo cáo có ảnh chụp thùng hàng bị móp. Một người đang chỉ vào sơ đồ quy trình đóng gói trên giấy.',
    },
    script: [
      ['男', '今回の件、お客様には一応ご納得いただけたんですが……。', 'Vụ lần này, khách hàng tạm thời đã chấp nhận rồi, nhưng…'],
      ['女', 'ええ。でも、同じことが二度と起きないようにしないとね。箱に詰める段階で、確認を一回増やすのはどう？', 'Ừ. Nhưng phải làm sao để chuyện này không bao giờ lặp lại. Thêm một lần kiểm tra ở khâu cho hàng vào thùng thì sao?'],
      ['男', 'はい。それと、作業の手順書も見直して、新人にもわかるように写真を入れようかと思っています。', 'Vâng. Ngoài ra tôi định xem lại bản hướng dẫn thao tác, thêm ảnh vào để người mới cũng hiểu.'],
      ['女', 'いいわね。来週の会議で説明できるように、まとめておいてくれる？', 'Hay đấy. Tổng hợp lại để tuần sau trình bày trong cuộc họp nhé?'],
    ],
    questions: [
      [
        '二人は何について話していますか。',
        ['今回の再発防止策について', '今回の新人研修について', '今回の返金手続きについて', '今回の会議日程について'],
        0,
        'Mục tiêu là 同じことが二度と起きないように: thêm khâu kiểm tra, sửa hướng dẫn thao tác → biện pháp chống tái diễn, lựa chọn 1. Lựa chọn 2 có từ 新人 nghe trong băng, nhưng ảnh trong hướng dẫn chỉ để người mới dễ hiểu, không ai bàn khoá đào tạo. Cuộc họp (lựa chọn 4) chỉ là nơi sẽ trình bày.',
      ],
    ],
    points: [
      ['二度と', 'にどと', 'không bao giờ … nữa (đi với thể phủ định)'],
      ['手順書', 'てじゅんしょ', 'bản hướng dẫn thao tác'],
      ['納得', 'なっとく', 'chấp nhận, thông suốt'],
    ],
  }),
  item('w09', 'shiryo', 1, {
    material: {
      kind: 'bars',
      title: 'お客様からの苦情件数（内容別）',
      unit: '件',
      labels: ['配送の遅れ', '商品の破損', '電話対応', '請求の誤り'],
      series: [
        { name: '先月', values: [24, 15, 10, 6] },
        { name: '今月', values: [18, 16, 21, 5] },
      ],
    },
    script: [['男', '苦情の件数が先月の二倍以上になった項目については、今月中に担当者向けの研修を行います。', 'Hạng mục nào có số khiếu nại tăng gấp đôi trở lên so với tháng trước sẽ được tổ chức đào tạo cho người phụ trách ngay trong tháng này.']],
    questions: [
      [
        '研修を行うのはどの項目ですか。',
        ['電話対応', '配送の遅れ', '商品の破損', '請求の誤り'],
        0,
        'Ứng đối điện thoại 10 → 21, hơn gấp đôi. Giao chậm có nhiều khiếu nại nhất nhưng đã giảm (24 → 18). Hàng hư chỉ tăng một.',
      ],
    ],
    points: [['苦情件数', 'くじょうけんすう', 'số vụ khiếu nại']],
  }),
  item('w09', 'shiryo', 2, {
    material: {
      kind: 'table',
      title: '返品・交換のご案内',
      head: ['条件', '対応'],
      rows: [
        ['到着後7日以内・未開封', '返品・交換とも可'],
        ['到着後7日以内・開封済み', '交換のみ可'],
        ['到着後8〜30日・初期不良', '交換のみ可'],
        ['到着後31日以降', '不可（修理は有償）'],
      ],
    },
    script: [['女', '二週間前に届いた電気ポットなんですが、最初から電源が入らなかったんです。忙しくて、連絡が遅くなってしまって。返品したいんですけど。', 'Tôi nhận ấm điện hai tuần trước, mà ngay từ đầu đã không bật được nguồn. Vì bận nên tôi liên lạc muộn. Tôi muốn trả hàng.']],
    questions: [
      [
        '店の人はどう答えますか。',
        ['返品できます', '交換も返品もできません', '有償で修理します', '交換ならできます'],
        3,
        'Hai tuần là ngày thứ 8–30, và hỏng từ đầu (初期不良) → chỉ đổi được, không trả được. Khách muốn trả hàng, nhưng theo bảng chỉ được đổi. Sửa có phí chỉ áp dụng từ ngày 31.',
      ],
    ],
    points: [
      ['初期不良', 'しょきふりょう', 'lỗi từ khi mới nhận'],
      ['有償', 'ゆうしょう', 'có tính phí'],
      ['未開封', 'みかいふう', 'chưa mở'],
    ],
  }),
  item('w09', 'shiryo', 3, {
    material: {
      kind: 'text',
      title: 'お詫び状（下書き）',
      body: '① このたびは、弊社の配送ミスにより多大なるご迷惑をおかけしましたことを、深くお詫び申し上げます。\n② 原因は、出荷担当者の確認不足によるものでございました。\n③ 今後は、出荷前に二名で確認する体制に改め、再発防止に努めてまいります。\n④ なお、お客様におかれましても、お受け取りの際に中身をご確認いただけますと幸いです。',
    },
    script: [['男', 'よく書けているけど、一か所だけ、お詫びの手紙には入れないほうがいいところがあるね。今回は、お客様に何かをお願いするのは控えよう。そこは削って。', 'Viết tốt rồi, nhưng có một chỗ không nên đưa vào thư xin lỗi. Lần này đừng nhờ khách làm gì cả. Bỏ chỗ đó đi.']],
    questions: [
      [
        'どこを削りますか。',
        ['②', '④', '①', '③'],
        1,
        'Đoạn ④ nhờ khách kiểm tra hàng khi nhận, tức là chuyển một phần trách nhiệm sang khách. Đây là điều anh bảo bỏ đi. ① là lời xin lỗi, ② là nguyên nhân, ③ là biện pháp chống tái phạm, đều cần có.',
      ],
    ],
    points: [
      ['お詫び状', 'おわびじょう', 'thư xin lỗi'],
      ['再発防止', 'さいはつぼうし', 'phòng tránh tái phạm'],
      ['控える', 'ひかえる', 'hạn chế, tránh'],
    ],
  }),
  item('w09', 'sogo-chodokkai', 1, {
    material: {
      kind: 'table',
      title: '店内の配置図（返品カウンターの移設候補）',
      head: [],
      rows: [
        ['入口', '', '【1】', '', '倉庫'],
        ['【2】', '', '', '', '事務室'],
        ['レジ', '', '売り場', '', '【3】'],
        ['トイレ', '', '【4】', '', '非常口'],
      ],
      note: '※空白は通路。現在の返品カウンターはレジの隣。',
    },
    script: [
      ['男', '店長、お客様アンケートなんですが、今月も返品カウンターについてのご意見が多くて。レジの列と返品の列が混ざって、どちらに並べばいいかわからない、と。', 'Cửa hàng trưởng, về phiếu khảo sát khách hàng, tháng này vẫn có nhiều ý kiến về quầy trả hàng. Khách nói hàng chờ thanh toán và hàng chờ trả hàng lẫn vào nhau, không biết nên xếp hàng bên nào.'],
      ['女', 'そうよね。やっぱり、レジの隣はやめて、場所を移しましょう。どこがいいと思う？', 'Đúng vậy. Thôi, không để cạnh quầy thu ngân nữa, chuyển chỗ đi. Em thấy chỗ nào được?'],
      ['男', '入口のすぐ横はどうでしょう。返品にいらっしゃった方が、店に入ってすぐ用事を済ませられますし。', 'Ngay cạnh lối vào thì sao ạ? Khách đến trả hàng vào cửa là xong việc ngay.'],
      ['女', 'うーん、入口は朝のセールの時間に、かなり混むのよ。そこに列ができると、入ってくる方の邪魔になるわ。', 'Ừm, lối vào lúc giảm giá buổi sáng đông lắm. Có hàng người ở đó thì cản khách đi vào.'],
      ['男', 'では、トイレの近くの、奥のスペースは？　あそこなら空いていますが。', 'Vậy khoảng trống phía trong, gần nhà vệ sinh thì sao ạ? Chỗ đó đang trống.'],
      ['女', 'あそこは非常口への通り道だから、カウンターを置いて人が並ぶのは避けたいわね。', 'Chỗ đó là đường ra cửa thoát hiểm, đặt quầy rồi người đứng xếp hàng thì nên tránh.'],
      ['男', 'そうですね……。あとは、事務室の隣ですか。', 'Vâng… Vậy còn cạnh văn phòng thì sao ạ?'],
      ['女', 'うん、そこがいいかもしれない。返品の品物の在庫をすぐ確認できるし、何かあっても事務室からすぐ人が出られるし。', 'Ừ, chỗ đó có lẽ được. Kiểm tra tồn kho món hàng bị trả ngay được, có chuyện gì thì người trong văn phòng ra ngay.'],
      ['男', 'ただ、入口からは一番遠くなりますが、大丈夫でしょうか。', 'Có điều, chỗ đó xa lối vào nhất, có sao không ạ?'],
      ['女', 'それは、入口とレジの上に案内の看板を出せば大丈夫。売り場を通っていただくことにもなるしね。', 'Cái đó thì treo biển chỉ dẫn trên lối vào và quầy thu ngân là được. Mà như vậy khách còn đi ngang qua khu bán hàng nữa.'],
      ['男', 'わかりました。では、案内の表示も作り直します。', 'Vâng ạ. Vậy tôi sẽ làm lại cả biển chỉ dẫn.'],
    ],
    questions: [
      [
        '返品カウンターはどこに移すことになりましたか。',
        ['【1】', '【2】', '【3】', '【4】'],
        2,
        'Chốt chỗ cạnh văn phòng (事務室の隣) vì kiểm tra tồn kho nhanh và có người hỗ trợ ngay → 【3】, lựa chọn 3. Lựa chọn 1 (cạnh lối vào) là đề xuất đầu tiên nhưng bị bác vì giờ giảm giá buổi sáng đông; lựa chọn 4 nằm trên đường ra cửa thoát hiểm; 【2】 vẫn sát quầy thu ngân, đúng chỗ khách phàn nàn.',
      ],
    ],
    points: [
      ['移す', 'うつす', 'chuyển (chỗ)'],
      ['邪魔になる', 'じゃまになる', 'gây cản trở'],
      ['用事を済ませる', 'ようじをすませる', 'xong việc'],
    ],
  }),
  item('w09', 'sogo-chodokkai', 2, {
    material: {
      kind: 'text',
      title: 'お詫び状（下書き）',
      body: '株式会社森川ホテル　購買課　御中\n\nこのたびは、弊社の納品物に不備があり、多大なるご迷惑をおかけいたしましたことを、深くお詫び申し上げます。【1】\n調査の結果、出荷の際に、別のお客様向けのタオルが混入していたことが判明いたしました。【2】\n正しい商品は、本日2026年11月16日（月）に発送いたしました。【3】\n今後とも変わらぬお引き立てを賜りますよう、お願い申し上げます。【4】\n\n株式会社さくらリネン　営業部',
    },
    script: [
      ['男', '課長、森川ホテルさんへのお詫び状、こんな感じでいかがでしょうか。', 'Trưởng phòng, thư xin lỗi gửi khách sạn Morikawa thế này được không ạ?'],
      ['女', 'うん、お詫びと原因はちゃんと書けてるわね。ただ、これだと、この先どうするのかが見えないでしょう。', 'Ừ, lời xin lỗi và nguyên nhân viết ổn rồi. Có điều thế này thì không thấy sắp tới mình sẽ làm gì.'],
      ['男', 'あ、出荷前の確認を二人で行うことにした件ですね。それを一文入れます。発送のお知らせのあとに書こうかと思うんですが。', 'À, chuyện quyết định kiểm tra trước khi xuất hàng bằng hai người ạ. Tôi sẽ thêm một câu về việc đó. Tôi định viết sau phần báo đã gửi hàng.'],
      ['女', 'うーん、それだと、締めのあいさつの直前に急に出てくる感じになるわね。', 'Ừm, như thế thì nó xuất hiện đột ngột ngay trước lời chào kết thư.'],
      ['男', 'では、最初のお詫びのすぐあとはいかがでしょう。一番に伝えたいことなので。', 'Vậy ngay sau lời xin lỗi đầu tiên thì sao ạ? Vì đó là điều muốn nói trước nhất.'],
      ['女', 'でも、原因を書く前に対策が来ると、何に対する対策なのか、わかりにくいでしょう。原因がわかった、だからこうします、という流れのほうが、読む方も納得しやすいと思うわ。', 'Nhưng biện pháp đứng trước nguyên nhân thì khó hiểu là biện pháp cho chuyện gì. Theo mạch "đã rõ nguyên nhân, vì vậy sẽ làm thế này" thì người đọc dễ chấp nhận hơn.'],
      ['男', 'なるほど。原因の直後に入れて、そのあとに発送のお知らせ、という順番ですね。', 'Ra vậy. Đặt ngay sau nguyên nhân, rồi mới tới phần báo gửi hàng, đúng không ạ.'],
      ['女', 'そう。書き直したら、今日の便で出せるように、昼までに持ってきてね。', 'Đúng. Sửa xong thì mang lên trước trưa để kịp gửi chuyến hôm nay nhé.'],
      ['男', 'はい、十一時には仕上げてお持ちします。ほかに直したほうがいいところはありますか。', 'Vâng, mười một giờ tôi sẽ làm xong và mang lên. Còn chỗ nào nên sửa nữa không ạ?'],
      ['女', 'あとは、原因のところに、どうやって調べたのかを少し書き足すといいわね。', 'Ngoài ra, ở phần nguyên nhân nên viết thêm một chút là đã điều tra bằng cách nào.'],
    ],
    questions: [
      [
        '再発防止策の一文は、どこに入れますか。',
        ['【1】', '【2】', '【3】', '【4】'],
        1,
        'Trưởng phòng muốn mạch "nguyên nhân → biện pháp → gửi hàng thay thế", nên câu biện pháp đặt ngay sau câu nguyên nhân → 【2】, lựa chọn 2. Lựa chọn 3 (sau phần báo đã gửi hàng) là ý ban đầu của nhân viên nhưng bị chê là xuất hiện đột ngột trước lời chào; lựa chọn 1 bị bác vì biện pháp đứng trước nguyên nhân.',
      ],
    ],
    points: [
      ['混入', 'こんにゅう', 'lẫn vào'],
      ['判明', 'はんめい', 'được làm rõ'],
      ['締めのあいさつ', 'しめのあいさつ', 'lời chào kết thư'],
    ],
  }),
  item('w09', 'sogo-chodokkai', 3, {
    material: {
      kind: 'text',
      title: 'クレーム対応記録（受付番号 C-1182）',
      body: 'お客様：有限会社みどり園芸 様\n内容：届いた肥料の袋が破れていた（20袋中3袋）\n\n対応\n【1】お客様へのお詫びの電話\n【2】代わりの品の発送\n【3】お詫び状の送付\n【4】工場への原因調査の依頼',
    },
    script: [
      ['女', '課長、みどり園芸さんの件、ご報告してもよろしいでしょうか。', 'Trưởng phòng, tôi xin báo cáo vụ Midori Engei được không ạ?'],
      ['男', 'うん、どうなってる？', 'Ừ, tình hình sao rồi?'],
      ['女', 'まず、お電話でのお詫びは、ご連絡をいただいた日のうちに、私から差し上げました。最初はかなりお怒りでしたが、最後には、早めに対応してくれれば、とおっしゃっていただけました。', 'Trước hết, lời xin lỗi qua điện thoại thì tôi đã gọi ngay trong ngày nhận được liên lạc. Lúc đầu khách rất giận, nhưng cuối cùng khách nói chỉ cần xử lý sớm là được.'],
      ['男', 'それはよかった。代わりの三袋は？', 'Vậy thì tốt. Còn ba bao thay thế?'],
      ['女', '今朝の便で出しました。お届けは明日の午前中になります。', 'Đã gửi chuyến sáng nay rồi ạ. Sáng mai sẽ tới nơi.'],
      ['男', 'お客様には、届く日時をお知らせした？', 'Đã báo cho khách ngày giờ hàng tới chưa?'],
      ['女', 'はい、発送したときに、お電話で伝票番号と一緒にお伝えしてあります。', 'Rồi ạ, lúc gửi tôi đã gọi điện báo cùng với mã vận đơn.'],
      ['男', 'お詫び状は、どうした？', 'Thư xin lỗi thì sao?'],
      ['女', 'はい、課長に昨日見ていただいたものを、そのまま速達でお送りしました。', 'Vâng, bản trưởng phòng xem hôm qua, tôi đã gửi chuyển phát nhanh nguyên như vậy.'],
      ['男', '工場のほうは？　袋が破れた原因がわからないと、また同じことになるよ。', 'Còn phía nhà máy? Không biết vì sao bao bị rách thì lại xảy ra y như vậy đấy.'],
      ['女', 'それが、メールで頼むより、直接お願いしたほうが早いと思いまして。今日の午後の品質会議に工場の方もいらっしゃるので、そこでお話しするつもりです。', 'Chuyện đó, tôi nghĩ nhờ trực tiếp sẽ nhanh hơn là gửi email. Cuộc họp chất lượng chiều nay người bên nhà máy cũng tới, nên tôi định nói ở đó.'],
      ['男', 'わかった。結果が出たら、お客様にもきちんとお伝えしてね。', 'Được. Có kết quả thì báo lại cho khách đầy đủ nhé.'],
      ['女', 'はい。原因がわかりしだい、改めてお電話でご報告いたします。', 'Vâng. Biết nguyên nhân là tôi sẽ gọi điện báo lại cho khách ngay.'],
    ],
    questions: [
      [
        'まだ済んでいない対応はどれですか。',
        ['【1】', '【2】', '【3】', '【4】'],
        3,
        'Việc nhờ nhà máy điều tra nguyên nhân chưa làm: người phụ nữ "định nói" trong cuộc họp chiều nay → 【4】, lựa chọn 4. Lựa chọn 2 dễ nhầm vì hàng thay thế mai mới tới, nhưng việc gửi đã xong từ sáng nay. Điện thoại xin lỗi và thư xin lỗi (lựa chọn 1, 3) cũng đã làm.',
      ],
    ],
    points: [
      ['差し上げる', 'さしあげる', 'làm cho (khiêm nhường của あげる)'],
      ['速達', 'そくたつ', 'chuyển phát nhanh'],
      ['品質', 'ひんしつ', 'chất lượng'],
    ],
  }),
  item('w09', 'sogo-chodokkai', 4, {
    material: {
      kind: 'table',
      title: 'お客様相談室　本日の予定',
      head: ['時間', '内容'],
      rows: [
        ['9:30〜10:00', '【1】朝礼'],
        ['10:00〜12:00', '【2】電話応対研修'],
        ['13:00〜15:00', '【3】クレーム事例の検討会'],
        ['15:30〜17:00', '【4】個別面談'],
      ],
    },
    script: [
      ['女', 'おはようございます。本日の予定について、一点変更がありますので、お知らせします。', 'Chào buổi sáng. Lịch hôm nay có một điểm thay đổi, tôi xin thông báo.'],
      ['女', '午前中に予定していた電話応対研修ですが、講師の先生が、乗っていらっしゃる新幹線が止まってしまったそうで、こちらに着くのがお昼過ぎになるとのことです。', 'Buổi đào tạo trả lời điện thoại dự kiến buổi sáng: chuyến shinkansen giảng viên đang đi bị dừng, nên nghe nói phải quá trưa mới tới được đây.'],
      ['女', 'そこで、午後に予定していた事例の検討会と、順番を入れ替えることにしました。検討会は、資料がすでにそろっていますので、朝礼が終わりしだい始めます。先月寄せられたご相談のうち、対応に時間がかかったものを三件取り上げる予定です。','Vì vậy chúng tôi quyết định đổi thứ tự với buổi thảo luận tình huống dự kiến buổi chiều. Buổi thảo luận đã có đủ tài liệu, nên sẽ bắt đầu ngay khi họp đầu giờ kết thúc. Dự kiến sẽ đem ra ba trường hợp trong số các yêu cầu tư vấn tháng trước mất nhiều thời gian xử lý.'],
      ['女', '研修のほうは、先生のご到着を待って始めます。お昼休みはいつもどおり十二時からです。研修に出る方は、筆記用具とヘッドセットを忘れずに持ってきてください。万一さらに遅れるようでしたら、また連絡します。', 'Còn buổi đào tạo thì đợi giảng viên tới rồi bắt đầu. Nghỉ trưa vẫn từ mười hai giờ như mọi khi. Ai dự đào tạo nhớ mang theo dụng cụ ghi chép và tai nghe. Nếu chẳng may còn trễ hơn nữa, tôi sẽ báo lại.'],
      ['女', 'なお、個別面談は、予定どおり三時半からです。面談の順番は、先週お配りした表のとおりですので、確認しておいてください。', 'Ngoài ra, buổi gặp riêng vẫn như dự kiến, từ ba rưỡi. Thứ tự gặp theo bảng đã phát tuần trước, mọi người kiểm tra lại nhé.'],
      ['女', 'それから、研修と検討会の間も、お客様からのお電話は止まりません。各チーム二名ずつは席に残って、対応をお願いします。以上です。', 'Ngoài ra, trong lúc đào tạo và thảo luận, điện thoại của khách vẫn không ngừng. Mỗi nhóm để lại hai người ở chỗ ngồi để trực nhé. Tôi xin hết.'],
    ],
    questions: [
      [
        '電話応対研修は、表のどの時間に行われますか。',
        ['【1】の時間', '【2】の時間', '【3】の時間', '【4】の時間'],
        2,
        'Giảng viên quá trưa mới tới, nên buổi đào tạo đổi chỗ với buổi thảo luận tình huống, chuyển sang khung 13:00 của 【3】 → lựa chọn 3. Lựa chọn 2 là giờ ghi trên bảng, đã bị thay đổi. Lựa chọn 4 là buổi gặp riêng, vẫn giữ nguyên lúc 15:30.',
      ],
    ],
    points: [
      ['〜しだい', 'しだい', 'ngay khi …'],
      ['万一', 'まんいち', 'chẳng may'],
      ['個別面談', 'こべつめんだん', 'gặp riêng từng người'],
    ],
  }),
];

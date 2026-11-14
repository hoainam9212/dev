import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/** Week 11 — HR, evaluation and training. Level: J1. */
export const W11: BjtItem[] = [
  item('w11', 'jokyo', 1, {
    material: {
      kind: 'scene',
      vi: 'Phòng nghỉ trong công ty. Hai người cầm cốc cà phê đứng trước bảng thông báo; trên bảng có một tờ giấy dán mới, tiêu đề in đậm.',
    },
    script: [
      ['女', 'ねえ、聞きました？　中村さん、四月から大阪だそうですね。', 'Này, nghe chưa? Nghe nói từ tháng Tư Nakamura ra Osaka đấy.'],
      ['男', 'ええ、さっき本人から聞きました。向こうに新しくできる支店の立ち上げを任されるそうです。', 'Ừ, tôi vừa nghe chính Nakamura nói. Nghe bảo được giao lo khai trương chi nhánh mới mở ở bên đó.'],
      ['女', 'すごいですね。でも、ご家族もいるのに、引っ越しとか大変でしょうね。', 'Giỏi thật. Nhưng còn gia đình nữa, chuyện dọn nhà các thứ chắc vất vả lắm.'],
      ['男', 'ええ。お子さんの学校のこともあるので、最初の半年は一人で行くって言ってました。', 'Ừ. Còn chuyện trường học của con nữa, nên bảo nửa năm đầu sẽ đi một mình.'],
      ['女', 'そうですか。送別会、早めに計画しないといけませんね。', 'Vậy à. Phải lên kế hoạch tiệc chia tay sớm thôi.'],
    ],
    questions: [
      [
        '二人は何について話していますか。',
        ['中村さんの家族について', '中村さんの退職について', '中村さんの転勤について', '中村さんの出張について'],
        2,
        'Từ tháng Tư Nakamura chuyển ra Osaka lo chi nhánh mới, có chuyện dọn nhà, đi một mình nửa năm đầu → chuyển công tác, lựa chọn 3. Lựa chọn 1 có từ 家族 nghe trong băng, nhưng gia đình chỉ là chi tiết phụ. Lựa chọn 4 sai vì không phải chuyến đi ngắn mà là chuyển hẳn từ tháng Tư; Nakamura cũng không nghỉ việc.',
      ],
    ],
    points: [
      ['立ち上げ', 'たちあげ', 'khởi động, khai trương'],
      ['任される', 'まかされる', 'được giao phó'],
      ['送別会', 'そうべつかい', 'tiệc chia tay'],
    ],
  }),
  item('w11', 'jokyo', 2, {
    material: {
      kind: 'scene',
      vi: 'Phòng họp nhỏ. Hai người ngồi đối diện; trên bàn là một tờ phiếu có các cột chấm điểm và ô ghi nhận xét. Một người đang ghi vào ô trống.',
    },
    script: [
      ['男', 'この半年の目標なんですが、新規のお客様を十社というのは、正直、少し高すぎたかなと思っています。', 'Về mục tiêu nửa năm nay, nói thật tôi nghĩ mười khách hàng mới là hơi quá cao.'],
      ['女', '結果は七社だったわね。でも、今までのお客様からの追加注文は、去年よりかなり増えてるでしょう。そこはきちんと書いておいたほうがいいわよ。', 'Kết quả là bảy công ty nhỉ. Nhưng đơn đặt thêm từ khách hàng cũ tăng khá nhiều so với năm ngoái mà. Chỗ đó nên ghi rõ vào.'],
      ['男', 'はい。次の期の目標も、その点を踏まえて考えてみます。', 'Vâng. Mục tiêu kỳ sau tôi cũng sẽ dựa vào điểm đó để suy nghĩ.'],
      ['女', 'それと、来期は後輩の指導もお願いしたいと思ってるの。それも目標に入れておいて。', 'Ngoài ra, kỳ sau tôi cũng muốn nhờ em kèm người mới. Ghi cả việc đó vào mục tiêu nhé.'],
    ],
    questions: [
      [
        '二人は何について話していますか。',
        ['上期の評価面談について', '上期の新規開拓について', '上期の追加注文について', '上期の研修計画について'],
        0,
        'Hai người xem lại mục tiêu nửa năm, kết quả đạt được và điều cần ghi vào phiếu, rồi bàn mục tiêu kỳ sau → buổi gặp đánh giá, lựa chọn 1. Lựa chọn 2 và 3 có từ 新規, 追加注文 nghe trong băng, nhưng đó chỉ là từng mục được nhận xét trong buổi đánh giá.',
      ],
    ],
    points: [
      ['踏まえる', 'ふまえる', 'dựa trên'],
      ['追加注文', 'ついかちゅうもん', 'đơn đặt thêm'],
      ['次の期', 'つぎのき', 'kỳ sau'],
    ],
  }),
  item('w11', 'shiryo', 1, {
    material: {
      kind: 'bars',
      title: '社内研修の満足度',
      unit: '%',
      labels: ['新人研修', 'リーダー研修', '評価者研修', '英語研修'],
      series: [{ name: '満足と答えた割合', values: [85, 78, 62, 65] }],
    },
    script: [['女', '満足度が七割を下回った研修は、来年度、内容を見直します。ただし、英語研修は外部の会社に任せているので、委託先を変えることで対応します。', 'Các khoá có mức hài lòng dưới bảy mươi phần trăm sẽ được xem lại nội dung vào năm tới. Tuy nhiên, khoá tiếng Anh do công ty bên ngoài đảm nhận, nên sẽ xử lý bằng cách đổi đơn vị nhận uỷ thác.']],
    questions: [
      [
        '来年度、内容を見直すのはどの研修ですか。',
        ['新人研修', '英語研修', '評価者研修', 'リーダー研修'],
        2,
        'Dưới 70%: khoá người đánh giá (62%) và tiếng Anh (65%). Nhưng tiếng Anh được xử lý bằng cách đổi công ty bên ngoài, không xem lại nội dung. Còn lại khoá người đánh giá.',
      ],
    ],
    points: [
      ['見直す', 'みなおす', 'xem lại'],
      ['委託先', 'いたくさき', 'đơn vị nhận uỷ thác'],
    ],
  }),
  item('w11', 'shiryo', 2, {
    material: {
      kind: 'table',
      title: '有給休暇の取得状況（営業1課）',
      head: ['社員', '付与日数', '取得日数'],
      rows: [
        ['青木', '20日', '6日'],
        ['石川', '15日', '12日'],
        ['上田', '20日', '14日'],
        ['江口', '12日', '3日'],
      ],
    },
    script: [['男', '有給休暇の取得率が五割に届いていない人には、人事部から、休暇を取るよう勧めるメールが送られます。', 'Ai có tỉ lệ sử dụng ngày phép có lương chưa đạt năm mươi phần trăm sẽ nhận được email của phòng nhân sự khuyến khích nghỉ phép.']],
    questions: [
      [
        '人事部からメールが届くのは誰ですか。',
        ['青木さんと江口さん', '石川さんと上田さん', '江口さんだけ', '青木さんだけ'],
        0,
        'Tỉ lệ = ngày đã nghỉ ÷ ngày được cấp: Aoki 30%, Ishikawa 80%, Ueda 70%, Eguchi 25%. Dưới 50% là Aoki và Eguchi. Chỉ nhìn số ngày đã nghỉ thì Aoki (6 ngày) có vẻ không ít, nhưng anh ấy được cấp 20 ngày.',
      ],
    ],
    points: [
      ['有給休暇', 'ゆうきゅうきゅうか', 'nghỉ phép có lương'],
      ['付与', 'ふよ', 'cấp, trao'],
      ['取得率', 'しゅとくりつ', 'tỉ lệ sử dụng'],
    ],
  }),
  item('w11', 'shiryo', 3, {
    material: {
      kind: 'text',
      title: '【中途採用】経理スタッフ募集',
      body: '【中途採用】経理スタッフ\n\n応募条件：経理の実務経験3年以上、日商簿記2級以上\n勤務時間：9:00〜17:30（フレックスタイム制あり）\n給与：月給28万円〜（経験・能力による）\n勤務地：本社（東京）',
    },
    script: [['女', '今回の応募者の方は、経理の経験は五年あるんですが、簿記は三級なんです。ただ、前の会社で決算をまとめた経験があるので、部長が一度面接してみたいとおっしゃっています。', 'Ứng viên lần này có năm năm kinh nghiệm kế toán, nhưng chứng chỉ kế toán mới cấp ba. Tuy vậy, ở công ty cũ người đó từng làm quyết toán, nên trưởng bộ phận nói muốn phỏng vấn thử một lần.']],
    questions: [
      [
        'この応募者について、正しいのはどれですか。',
        ['応募条件をすべて満たしている', '経験年数が足りない', '面接は行わない', '簿記の条件は満たしていないが、面接を行う'],
        3,
        'Kinh nghiệm 5 năm ≥ 3 năm: đạt. Chứng chỉ cấp 3 thấp hơn yêu cầu cấp 2: chưa đạt. Nhưng trưởng bộ phận muốn phỏng vấn vì kinh nghiệm quyết toán. Lựa chọn 1 sai vì thiếu điều kiện chứng chỉ.',
      ],
    ],
    points: [
      ['中途採用', 'ちゅうとさいよう', 'tuyển người đã có kinh nghiệm'],
      ['簿記', 'ぼき', 'kế toán (chứng chỉ ghi sổ)'],
      ['実務経験', 'じつむけいけん', 'kinh nghiệm thực tế'],
    ],
  }),
  item('w11', 'sogo-chodokkai', 1, {
    material: {
      kind: 'table',
      title: '研修センター周辺の地図（上が北）',
      head: [],
      rows: [
        ['駅（南口）', '', 'バス停', '', '【1】'],
        ['', '', '', '', ''],
        ['【2】', '', '消防署', '', '【3】'],
        ['', '', '', '', ''],
        ['公園', '', '【4】', '', '川'],
      ],
      note: '※空白は道路。',
    },
    script: [
      ['女', '新入社員の皆さん、お疲れさまです。人事部の中島です。来週の月曜日から始まる研修の会場について、ご案内します。', 'Các bạn nhân viên mới, chào các bạn. Tôi là Nakajima bên nhân sự. Tôi xin hướng dẫn về địa điểm khoá đào tạo bắt đầu từ thứ Hai tuần sau.'],
      ['女', '会場は、本社ではなく、さくら台の研修センターです。最寄り駅はさくら台駅で、南口が一番近い出口です。', 'Địa điểm không phải trụ sở chính mà là trung tâm đào tạo Sakuradai. Ga gần nhất là ga Sakuradai, cửa Nam là lối ra gần nhất.'],
      ['女', '南口を出ると、すぐ前にバス停がありますが、バスには乗らずに歩いてください。南口を出たら左に進み、バス停の前を通り過ぎて、次の角を右に曲がります。', 'Ra cửa Nam thì ngay trước mặt có trạm xe buýt, nhưng các bạn đừng đi xe buýt mà đi bộ. Ra cửa Nam rẽ trái, đi qua trước trạm xe buýt, đến góc tiếp theo thì rẽ phải.'],
      ['女', '曲がると、右手に消防署が見えてきます。このとき、左手に白い大きなビルがありますが、これは別の会社の建物ですので、入らないようにしてください。', 'Rẽ vào thì sẽ thấy trạm cứu hoả bên tay phải. Lúc đó bên tay trái có một toà nhà lớn màu trắng, nhưng đó là toà nhà của công ty khác, các bạn đừng vào nhầm.'],
      ['女', '消防署を過ぎたら、最初の角を右に曲がってください。曲がってすぐ、左手にある建物が研修センターです。駅から歩いて七、八分です。', 'Qua trạm cứu hoả, đến góc đầu tiên thì rẽ phải. Rẽ xong, toà nhà ngay bên tay trái là trung tâm đào tạo. Đi bộ từ ga mất bảy, tám phút.'],
      ['女', 'なお、去年までは、バス停の先の角にあるビルを使っていましたので、先輩から話を聞いた方は、お間違えのないようご注意ください。', 'Ngoài ra, đến năm ngoái chúng tôi dùng toà nhà ở góc phía sau trạm xe buýt, nên ai đã nghe các anh chị khoá trước kể thì chú ý đừng nhầm.'],
      ['女', '初日は受付が八時四十五分からです。社員証がまだ届いていない方は、受付で名前を言っていただければ結構です。以上です。', 'Ngày đầu tiên quầy tiếp nhận mở từ tám giờ bốn mươi lăm. Ai chưa nhận được thẻ nhân viên thì chỉ cần nói tên ở quầy là được. Tôi xin hết.'],
    ],
    questions: [
      [
        '研修センターはどこにありますか。',
        ['【1】', '【2】', '【3】', '【4】'],
        3,
        'Ra cửa Nam rẽ trái (hướng đông), qua trạm xe buýt rẽ phải (xuống nam), qua trạm cứu hoả rẽ phải (sang tây), toà nhà bên tay trái → 【4】, lựa chọn 4. Lựa chọn 3 (【3】) là toà nhà trắng bên trái lúc đi ngang trạm cứu hoả, của công ty khác. Lựa chọn 1 là toà nhà dùng tới năm ngoái.',
      ],
    ],
    points: [
      ['最寄り駅', 'もよりえき', 'ga gần nhất'],
      ['右手', 'みぎて', 'phía tay phải'],
      ['お間違えのないよう', 'おまちがえのないよう', 'để không nhầm'],
    ],
  }),
  item('w11', 'sogo-chodokkai', 2, {
    material: {
      kind: 'table',
      title: '新入社員研修　3日目',
      head: ['時間', '科目', '講師'],
      rows: [
        ['9:00〜10:30', '【1】ビジネスマナー', '人事部 岡'],
        ['10:45〜12:00', '【2】情報セキュリティ', 'システム部 林'],
        ['13:00〜14:30', '【3】安全衛生', '総務部 宮田'],
        ['14:45〜16:30', '【4】グループ討議', '人事部 岡'],
      ],
    },
    script: [
      ['女', '岡さん、三日目の研修なんですが、今、システム部の林さんから連絡がありまして。', 'Oka, về khoá đào tạo ngày thứ ba, vừa nãy Hayashi bên phòng hệ thống có liên lạc.'],
      ['男', 'うん、どうしたの。', 'Ừ, có chuyện gì?'],
      ['女', 'その日の午前中、社内システムの切り替え作業が入ってしまって、どうしても抜けられないそうなんです。午後なら大丈夫だそうで。', 'Buổi sáng hôm đó bị chen vào việc chuyển đổi hệ thống nội bộ, nên nghe nói không thể nào rời ra được. Buổi chiều thì được.'],
      ['男', 'そうか。じゃあ、午後の安全衛生と入れ替えるしかないな。宮田さんは、午前でも大丈夫かな。たしか、午後しか空いてないって言ってたような……。', 'Thế à. Vậy chỉ còn cách đổi chỗ với an toàn vệ sinh buổi chiều. Không biết Miyata buổi sáng có được không. Hình như từng nói chỉ rảnh buổi chiều…'],
      ['女', '私から宮田さんに確認してみましょうか。', 'Để tôi hỏi Miyata thử nhé?'],
      ['男', 'いや、いい、僕が今、内線で聞いてみる。……あ、宮田さん？　はい……はい、大丈夫ですか。ありがとうございます。……大丈夫だって。会議が午後に移ったから、午前のほうがむしろいいそうだ。', 'Thôi, để tôi gọi nội bộ hỏi luôn. … A lô, Miyata à? Vâng… vâng, được ạ? Cảm ơn nhé. … Được rồi. Cuộc họp chuyển sang chiều nên buổi sáng lại còn tiện hơn.'],
      ['女', 'よかったです。では、入れ替えですね。グループ討議も、時間を動かしますか。', 'May quá. Vậy là đổi chỗ nhé. Thảo luận nhóm cũng dời giờ chứ ạ?'],
      ['男', 'いや、討議はセキュリティの話を聞いてからやったほうが意見が出やすいから、最後のままにしておこう。', 'Không, thảo luận nên làm sau khi nghe phần bảo mật thì dễ có ý kiến, nên cứ để cuối cùng.'],
      ['女', 'わかりました。新しい時間割を作って、今日中に新入社員に配ります。', 'Vâng. Tôi sẽ làm thời khoá biểu mới và phát cho nhân viên mới trong hôm nay.'],
      ['男', '林さんと宮田さんにも、新しい時間割を送っておいてね。', 'Gửi cả thời khoá biểu mới cho Hayashi và Miyata nhé.'],
    ],
    questions: [
      [
        '10時45分から行うことになったのはどれですか。',
        ['【1】', '【2】', '【3】', '【4】'],
        2,
        'Hayashi buổi sáng bận, nên 情報セキュリティ đổi chỗ với 安全衛生; Miyata xác nhận buổi sáng được → 安全衛生 lên khung 10:45, tức 【3】, lựa chọn 3. Lựa chọn 2 là lịch cũ đã bị đổi. Lựa chọn 4 (thảo luận nhóm) được giữ nguyên ở cuối ngày.',
      ],
    ],
    points: [
      ['抜けられない', 'ぬけられない', 'không thể rời ra'],
      ['内線', 'ないせん', 'điện thoại nội bộ'],
      ['時間割', 'じかんわり', 'thời khoá biểu'],
    ],
  }),
  item('w11', 'sogo-chodokkai', 3, {
    material: {
      kind: 'text',
      title: '外部研修「提案営業の基礎」参加候補（枠：2名）',
      body: '【1】佐野　営業部・入社2年目　受講歴なし\n【2】村井　営業部・入社5年目　昨年度受講\n【3】谷口　企画部・入社3年目　受講歴なし（来期、営業部へ異動予定）\n【4】北島　営業部・入社1年目　受講歴なし（新人研修中）',
    },
    script: [
      ['男', '来月の外部研修ですが、うちの枠が二名なんです。誰に行ってもらおうかと思いまして。', 'Khoá đào tạo bên ngoài tháng sau, suất của mình là hai người. Tôi đang nghĩ nên cử ai đi.'],
      ['女', '毎年お願いしている、あの二日間のコースよね。', 'Là khoá hai ngày năm nào mình cũng đăng ký đấy nhỉ.'],
      ['男', 'はい。費用は一人五万円で、部の予算から出ます。', 'Vâng. Chi phí năm vạn yên một người, lấy từ ngân sách của bộ phận.'],
      ['女', 'まず、まだ受けたことのない人を優先しましょう。村井さんは去年行ってるから、今回はいいわね。', 'Trước hết ưu tiên người chưa học bao giờ. Murai năm ngoái đã đi rồi, lần này thôi.'],
      ['男', 'そうですね。そうすると、佐野さんと北島さんでしょうか。二人とも営業ですし。', 'Vâng. Vậy thì Sano và Kitajima ạ? Cả hai đều ở bộ phận kinh doanh.'],
      ['女', '北島さんは、来月の終わりまで新人研修が続くのよ。そこに外部研修まで入れると、さすがに詰め込みすぎじゃないかしら。', 'Kitajima thì khoá đào tạo nhân viên mới kéo dài tới cuối tháng sau. Nhét thêm khoá bên ngoài vào nữa thì có quá tải không.'],
      ['男', 'たしかに。基礎の内容は、新人研修とも重なりますしね。', 'Đúng vậy. Nội dung cơ bản cũng trùng với khoá đào tạo nhân viên mới.'],
      ['女', 'それなら、谷口さんはどう？　今は企画だけど、来期から営業に来ることになっているし、異動の前に受けておけば、すぐ役に立つと思うわ。', 'Vậy Taniguchi thì sao? Giờ ở phòng kế hoạch, nhưng kỳ sau sẽ sang kinh doanh, học trước khi chuyển thì dùng được ngay.'],
      ['男', 'ああ、いいですね。企画部の部長には、私から了解を取っておきます。', 'À, hay đấy. Tôi sẽ xin phép trưởng bộ phận kế hoạch.'],
      ['女', 'お願い。北島さんには、来年度の研修で行ってもらいましょう。', 'Nhờ anh nhé. Kitajima thì để khoá năm sau cho đi.'],
      ['男', 'はい。佐野さんは前から行きたいと言っていたので、喜ぶと思います。私から伝えておきます。', 'Vâng. Sano từ trước đã nói muốn đi, chắc sẽ vui lắm. Tôi sẽ báo cho Sano.'],
    ],
    questions: [
      [
        '研修に行くことになったのは誰ですか。',
        ['【1】と【3】', '【1】と【4】', '【2】と【3】', '【3】と【4】'],
        0,
        'Ưu tiên người chưa học: loại Murai 【2】. Kitajima 【4】 đang học khoá nhân viên mới tới cuối tháng sau nên để năm sau. Chọn Sano 【1】 và Taniguchi 【3】 (sắp chuyển sang kinh doanh) → lựa chọn 1. Lựa chọn 2 (【1】 và 【4】) là ý ban đầu của người đàn ông nhưng đã bị bác.',
      ],
    ],
    points: [
      ['受講歴', 'じゅこうれき', 'quá trình đã học'],
      ['詰め込む', 'つめこむ', 'nhồi nhét'],
      ['了解を取る', 'りょうかいをとる', 'xin sự đồng ý'],
    ],
  }),
  item('w11', 'sogo-chodokkai', 4, {
    material: {
      kind: 'text',
      title: '中途入社者 受け入れ準備（吉岡さん　2027年4月1日（木）着任）',
      body: '【1】パソコンの手配と設定\n【2】社員証の発行\n【3】座席の用意\n【4】歓迎会の店の予約',
    },
    script: [
      ['男', '来週から来る吉岡さんの準備、どこまで進んでる？', 'Chuẩn bị cho Yoshioka tuần sau tới đã đến đâu rồi?'],
      ['女', 'はい、リストの順にご報告しますね。パソコンは、昨日システム部から届きました。メールの設定も済んでいるそうです。', 'Vâng, tôi xin báo theo thứ tự danh sách. Máy tính hôm qua phòng hệ thống đã gửi tới. Nghe nói cài đặt email cũng xong rồi.'],
      ['男', '営業用のソフトも入ってる？', 'Phần mềm dùng cho kinh doanh cũng cài rồi chứ?'],
      ['女', 'はい、顧客管理のソフトも入れてもらいました。', 'Vâng, phần mềm quản lý khách hàng cũng đã nhờ cài rồi.'],
      ['男', '社員証は？　写真がないと作れないって、総務が言ってたけど。', 'Thẻ nhân viên thì sao? Phòng tổng vụ nói không có ảnh thì không làm được mà.'],
      ['女', '写真は先週ご本人からいただいて、もうできあがっています。今朝、総務から受け取って、私の引き出しに入れてあります。', 'Ảnh tuần trước người đó đã gửi, thẻ đã làm xong. Sáng nay tôi nhận từ tổng vụ, để trong ngăn kéo của tôi.'],
      ['男', '席は窓側でいいんだよね。あそこ、まだ段ボールが山積みになってなかった？', 'Chỗ ngồi là phía cửa sổ đúng không. Chỗ đó chẳng phải vẫn chất đầy thùng các-tông sao?'],
      ['女', 'ええ、昨日まではそうだったんですが、今朝、倉庫に運んでもらいました。机の上も拭いてあります。', 'Vâng, đến hôm qua là vậy, nhưng sáng nay đã nhờ chuyển vào kho rồi. Mặt bàn cũng đã lau.'],
      ['男', 'ありがとう。じゃあ、あとは歓迎会だな。', 'Cảm ơn nhé. Vậy chỉ còn tiệc chào mừng.'],
      ['女', '駅の近くで二十人ぐらい入れるお店を探していて、候補は三つぐらいに絞ったんですが、何人来られるかがまだわからなくて。出欠の返事が金曜日にそろうので、そのあとで決めようと思っています。', 'Tôi đang tìm quán gần ga chứa được khoảng hai mươi người, đã lọc còn khoảng ba chỗ, nhưng chưa biết bao nhiêu người đi được. Thứ Sáu là có đủ trả lời tham dự, nên tôi định sau đó mới quyết.'],
      ['男', 'わかった。決まったら、吉岡さんにも日にちを伝えておいて。', 'Được rồi. Quyết xong thì báo ngày cho Yoshioka luôn nhé.'],
    ],
    questions: [
      [
        'まだ済んでいない準備はどれですか。',
        ['【1】', '【2】', '【3】', '【4】'],
        3,
        'Quán cho tiệc chào mừng mới lọc ứng viên, chờ thứ Sáu biết số người rồi mới quyết → chưa đặt, 【4】, lựa chọn 4. Lựa chọn 3 dễ nhầm vì người đàn ông nhắc chỗ ngồi còn đầy thùng, nhưng sáng nay đã dọn xong. Thẻ nhân viên (lựa chọn 2) đã làm xong và đã nhận.',
      ],
    ],
    points: [
      ['着任', 'ちゃくにん', 'nhận nhiệm sở'],
      ['山積み', 'やまづみ', 'chất đống'],
      ['出欠', 'しゅっけつ', 'có mặt hay vắng'],
    ],
  }),
];

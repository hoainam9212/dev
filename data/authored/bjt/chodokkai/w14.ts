import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/** Week 14 — presentations and debate: speakers often say what they think without saying it. Level: J1, about a third J1+. */
export const W14: BjtItem[] = [
  item('w14', 'jokyo', 1, {
    material: {
      kind: 'scene',
      vi: 'Phòng họp sau một buổi thuyết trình. Máy chiếu vẫn bật, trên màn chiếu là trang cuối có dòng "ご清聴ありがとうございました". Hai người đang thu dọn dây cáp và tài liệu.',
    },
    script: [
      ['女', 'お疲れさまでした。最後の、価格の根拠を聞かれたところ、ちょっと詰まってましたね。', 'Vất vả rồi. Đoạn cuối, lúc bị hỏi căn cứ của giá, anh hơi bị khựng nhỉ.'],
      ['男', 'そうなんです。数字は手元の資料にあったんですが、とっさに出てこなくて。', 'Đúng vậy. Con số có trong tài liệu trong tay, nhưng lúc đó không bật ra kịp.'],
      ['女', '先方の部長さん、あそこで少し首をかしげてらっしゃいましたからね。', 'Trưởng bộ phận bên họ lúc đó hơi nghiêng đầu đấy.'],
      ['男', 'ええ……。次からは、聞かれそうなことを先に洗い出して、答えをまとめておくようにします。', 'Vâng… Lần sau tôi sẽ liệt kê trước những điều có thể bị hỏi và chuẩn bị sẵn câu trả lời.'],
    ],
    questions: [
      [
        '二人は何について話していますか。',
        ['発表の質疑応答について', '発表の資料の数字について', '発表の価格設定について', '発表の会場準備について'],
        0,
        'Hai người nói về lúc bị hỏi mà trả lời không kịp, và lần sau chuẩn bị sẵn câu trả lời → phần hỏi đáp, lựa chọn 1. Lựa chọn 2 có từ 数字, 資料 trong băng, nhưng con số trong tài liệu không sai; vấn đề là trả lời không kịp. Lựa chọn 3 sai vì không ai bàn lại mức giá, chỉ có câu hỏi về căn cứ của giá.',
      ],
    ],
    points: [
      ['根拠', 'こんきょ', 'căn cứ'],
      ['詰まる', 'つまる', 'nghẹn, khựng lại'],
      ['洗い出す', 'あらいだす', 'rà soát, liệt kê ra hết'],
    ],
  }),
  item('w14', 'jokyo', 2, {
    material: {
      kind: 'scene',
      vi: 'Phòng họp. Trên bảng trắng có hai cột viết tay so sánh hai phương án; một người đứng cạnh bảng cầm bút dạ, người kia ngồi, khoanh tay.',
    },
    script: [
      ['男', '来年の展示会ですが、やはり幕張のほうが、来場者は多く見込めるかと思います。', 'Về triển lãm năm sau, tôi vẫn nghĩ ở Makuhari thì có thể kỳ vọng nhiều khách tham quan hơn.'],
      ['女', 'うーん、そうね……。ただ、うちのお客様は関西の方が多いでしょう。', 'Ừm, cũng phải… Có điều khách hàng của mình phần lớn ở vùng Kansai mà.'],
      ['男', 'はい。確かに、大阪のほうが近くて助かる、というお声もいただいています。', 'Vâng. Đúng là cũng có ý kiến khách nói ở Osaka thì gần, đỡ hơn.'],
      ['女', '去年のアンケートでも、そういう意見がずいぶんあったのよね。人数より、来てほしい方に来ていただけるかどうかじゃないかしら。', 'Phiếu khảo sát năm ngoái cũng có khá nhiều ý kiến như vậy. Quan trọng không phải số người, mà là có mời được đúng người mình muốn mời hay không chứ nhỉ.'],
    ],
    questions: [
      [
        '二人は何について話していますか。',
        ['展示会の集客方法について', '展示会のアンケートについて', '展示会の開催地について', '展示会の開催時期について'],
        2,
        'So sánh Makuhari với Osaka, khách hàng chủ yếu ở Kansai → đang bàn tổ chức triển lãm ở đâu, lựa chọn 3. Lựa chọn 2 có từ アンケート trong băng, nhưng phiếu khảo sát chỉ là căn cứ được dẫn ra. Lựa chọn 1 sai vì không ai bàn cách thu hút khách; số khách chỉ được dùng để so sánh hai địa điểm.',
      ],
    ],
    points: [
      ['見込む', 'みこむ', 'dự tính, kỳ vọng'],
      ['来場者', 'らいじょうしゃ', 'khách đến tham quan'],
      ['ずいぶん', 'ずいぶん', 'khá nhiều, rất'],
    ],
  }),
  item('w14', 'shiryo', 1, {
    material: {
      kind: 'bars',
      title: '新評価制度についての社員アンケート',
      unit: '%',
      labels: ['賛成', 'どちらかといえば賛成', 'どちらかといえば反対', '反対'],
      series: [{ name: '回答の割合', values: [18, 34, 30, 18] }],
    },
    script: [['男', '賛成と、どちらかといえば賛成を合わせると、確かに過半数にはなります。ただ、この結果をもって社員の支持を得たと言い切るのは、少し早いのではないでしょうか。', 'Cộng "tán thành" với "nghiêng về tán thành" thì đúng là quá nửa. Có điều, dựa vào kết quả này mà khẳng định đã được nhân viên ủng hộ thì có lẽ hơi sớm.']],
    questions: [
      [
        '話している人の考えに最も近いのはどれですか。',
        ['賛成がやや多いが、反対もほぼ半数なので、慎重に進めたい', '過半数が賛成しているので、予定どおりすぐに導入するべきだ', '反対のほうが多いので、新しい制度の導入はやめるべきだ', 'アンケートの質問の作り方に問題があるので、取り直したい'],
        0,
        'Lựa chọn 1: tán thành 18 + 34 = 52%, phản đối 30 + 18 = 48%, chênh rất ít. Người nói thừa nhận "quá nửa" rồi dùng ただ…早いのではないでしょうか để phản đối nói vòng việc coi đó là sự ủng hộ. Lựa chọn 2 là điều người nói đang phản bác. Lựa chọn 3 sai số liệu; người nói không chê cách đặt câu hỏi.',
      ],
    ],
    points: [
      ['過半数', 'かはんすう', 'quá nửa'],
      ['言い切る', 'いいきる', 'khẳng định chắc chắn'],
      ['～をもって', 'をもって', 'dựa vào …'],
    ],
  }),
  item('w14', 'shiryo', 2, {
    material: {
      kind: 'table',
      title: '定例会議 議題',
      head: ['議題', '担当', '予定時間'],
      rows: [
        ['先月の実績報告', '森', '15分'],
        ['新商品の販促案', '原', '30分'],
        ['予算の見直し', '杉山', '20分'],
        ['その他', '—', '10分'],
      ],
    },
    script: [['女', '今日の会議は一時間しか取れていません。販促案は資料を事前にお配りしてありますので、予定の半分の時間で済ませましょう。ほかの議題は予定どおりです。', 'Cuộc họp hôm nay chỉ có một tiếng. Tài liệu về phương án khuyến mại đã phát trước rồi, nên ta làm phần đó trong một nửa thời gian dự kiến. Các mục khác giữ nguyên.']],
    questions: [
      [
        'この話のあと、議題の予定時間の合計は何分になりますか。',
        ['45分', '60分', '65分', '75分'],
        1,
        'Lựa chọn 2: phần khuyến mại 30 → 15 phút; tổng 15 + 15 + 20 + 10 = 60 phút, vừa khít một tiếng. Lựa chọn 4 là tổng ban đầu (75 phút). Lựa chọn 1 (15 + 20 + 10 = 45) là bẫy nếu hiểu nhầm là bỏ hẳn phần khuyến mại.',
      ],
    ],
    points: [
      ['定例会議', 'ていれいかいぎ', 'cuộc họp định kỳ'],
      ['議題', 'ぎだい', 'chủ đề cuộc họp'],
      ['済ませる', 'すませる', 'làm xong, giải quyết xong'],
    ],
  }),
  item('w14', 'shiryo', 3, {
    material: {
      kind: 'text',
      title: '来週の部内プレゼン大会について',
      body: '発表時間：1人7分、質疑応答3分\nスライド：10枚以内（予備のスライドを含む）\n資料の提出：発表日の前日17時までに共有フォルダへ\n評価：部長と課長2名が採点します。',
    },
    script: [
      ['女', 'あのう、私のスライド、十二枚あるんですけど、そのうち二枚は質問が出たときに使う予備なんです。それなら大丈夫ですよね。', 'Ừm, slide của tôi có mười hai trang, nhưng trong đó hai trang là dự phòng để dùng khi có câu hỏi. Vậy thì được đúng không?'],
      ['男', 'いや、そこにも書いてありますけど、予備も数に入るんですよ。', 'Không, ở đó cũng ghi rồi, dự phòng cũng tính vào số trang đấy.'],
      ['女', 'あ、そうでしたか。', 'À, ra vậy.'],
    ],
    questions: [
      [
        '女の人はどうしなければなりませんか。',
        ['発表時間を七分から十分に延ばしてもらう', '資料の提出を発表当日の朝にしてもらう', '質疑用の予備のスライドを別に増やす', 'スライドを予備も含めて十枚にまとめる'],
        3,
        'Lựa chọn 4: quy định ghi 10枚以内（予備のスライドを含む）, nên 12 trang phải rút còn tối đa 10, kể cả trang dự phòng. Lựa chọn 3 đi ngược lại. Tài liệu phải nộp trước 17 giờ hôm trước, không phải sáng hôm đó.',
      ],
    ],
    points: [
      ['予備', 'よび', 'dự phòng'],
      ['採点する', 'さいてんする', 'chấm điểm'],
    ],
  }),
  item('w14', 'sogo-chodokkai', 1, {
    material: {
      kind: 'text',
      title: '新サービス提案　発表スライド構成案（持ち時間15分）',
      body: '1. 表紙\n2. 【1】製造業の現状と課題\n3. 【2】競合他社の動向\n4. 【3】当社サービスの特長\n5. 【4】導入事例（物流業）\n6. 費用とスケジュール',
    },
    script: [
      ['男', '部長、来週の大東工業さんへの提案ですが、スライドの構成をご覧いただけますか。', 'Trưởng bộ phận, về buổi đề xuất với Daito Kogyo tuần sau, xin xem giúp bố cục slide được không ạ?'],
      ['女', 'ありがとう。……持ち時間は十五分よね。少し盛りだくさんな気もするけど。', 'Cảm ơn. … Thời lượng là mười lăm phút nhỉ. Tôi thấy hơi nhiều thứ thì phải.'],
      ['男', 'はい、私もどこかを削ろうかと思っていまして。導入事例が物流業なので、製造業のお客様には少し遠いかなと。', 'Vâng, tôi cũng đang định cắt bớt chỗ nào đó. Ví dụ triển khai là ngành logistics, nên với khách sản xuất thì có lẽ hơi xa.'],
      ['女', 'そうかしら。業界は違っても、在庫の管理で困っていたという点は同じでしょう。実際に効果が出た数字があるのは強いわよ。', 'Vậy à? Ngành khác nhưng chuyện khổ sở vì quản lý tồn kho thì giống nhau mà. Có con số hiệu quả thực tế là điểm mạnh đấy.'],
      ['男', 'なるほど。では、事例は残します。', 'Ra vậy. Vậy tôi giữ ví dụ.'],
      ['女', 'それより、競合の話ね。大東工業さんは、もう何社かから提案を受けていらっしゃるそうよ。他社のことは、先方のほうがよくご存じなんじゃないかしら。', 'Quan trọng hơn là phần đối thủ. Nghe nói Daito Kogyo đã nhận đề xuất từ mấy công ty rồi. Chuyện các công ty khác thì có lẽ bên họ còn rõ hơn mình ấy chứ.'],
      ['男', 'あ……そうですね。こちらが知っている程度のことを並べても、時間がもったいないですね。', 'À… đúng vậy ạ. Bày ra những điều mình biết sơ sơ thì phí thời gian.'],
      ['女', 'その分、うちの特長のところに時間をかけて、どこが他社と違うのかを、はっきり言えばいいと思うわ。', 'Bù lại, dành thời gian cho phần đặc trưng của mình, nói rõ mình khác các công ty khác ở điểm nào là được.'],
      ['男', 'わかりました。現状と課題のところは、先方の業界の数字に差し替えて、短くまとめます。', 'Tôi hiểu rồi. Phần hiện trạng và vấn đề thì tôi thay bằng số liệu ngành của bên họ và tóm gọn lại.'],
      ['女', 'ええ。直したら、一度通しで練習してみましょう。時間を計ってね。', 'Ừ. Sửa xong thì thử tập một lượt từ đầu đến cuối. Nhớ bấm giờ nhé.'],
    ],
    questions: [
      [
        '発表から外すことになったのはどれですか。',
        ['【1】', '【2】', '【3】', '【4】'],
        1,
        'Trưởng bộ phận không nói thẳng "bỏ đi" mà nói 先方のほうがよくご存じなんじゃないかしら (khách còn rõ hơn mình), người đàn ông hiểu ra là phí thời gian → bỏ phần đối thủ 【2】, lựa chọn 2. Lựa chọn 4 là phần người đàn ông định cắt lúc đầu nhưng được giữ lại; 【1】 chỉ được thay số liệu và rút gọn, không bị bỏ.',
      ],
    ],
    points: [
      ['盛りだくさん', 'もりだくさん', 'nhiều nội dung, ôm đồm'],
      ['もったいない', 'もったいない', 'phí, uổng'],
      ['差し替える', 'さしかえる', 'thay thế bằng cái khác'],
    ],
  }),
  item('w14', 'sogo-chodokkai', 2, {
    material: {
      kind: 'table',
      title: '新オフィス 5階 レイアウト案',
      head: [],
      rows: [
        ['【1】', '', '【2】', '', '会議室'],
        ['', '', '', '', ''],
        ['コピー機', '', 'カフェスペース', '', '【3】'],
        ['', '', '', '', ''],
        ['入口', '', '受付', '', '【4】'],
      ],
      note: '※いちばん上の列が窓側。空白は通路。',
    },
    script: [
      ['女', '総務部の青木です。新オフィスに設ける集中ブースの位置について、ご報告します。', 'Tôi là Aoki bên tổng vụ. Tôi xin báo cáo về vị trí đặt buồng làm việc tập trung ở văn phòng mới.'],
      ['女', '先月の社員アンケートで、一番要望が多かったのが、電話や話し声を気にせずに作業できる場所でした。そこで、五階に一か所、集中ブースを設けます。', 'Trong khảo sát nhân viên tháng trước, nhiều yêu cầu nhất là có chỗ làm việc không phải bận tâm tiếng điện thoại, tiếng nói chuyện. Vì vậy chúng tôi sẽ đặt một buồng tập trung ở tầng năm.'],
      ['女', '当初の案では、窓側の中央、会議室に近い場所を考えておりました。ただ、会議の前後には、どうしても人の出入りが多くなるという指摘をいただきまして、見直すことにいたしました。', 'Theo phương án ban đầu, chúng tôi nghĩ đến chỗ giữa phía cửa sổ, gần phòng họp. Nhưng có ý kiến chỉ ra rằng trước và sau cuộc họp thì không tránh khỏi người ra vào nhiều, nên chúng tôi quyết định xem lại.'],
      ['女', '入口や受付の近くは、お客様の出入りがありますので、最初から候補から外しております。また、カフェスペースの隣も、休憩中の会話が聞こえやすいため、避けることにいたしました。', 'Khu gần lối vào và quầy lễ tân có khách ra vào, nên ngay từ đầu đã loại khỏi danh sách. Ngoài ra, cạnh khu cà phê cũng dễ nghe tiếng nói chuyện lúc nghỉ, nên chúng tôi cũng tránh.'],
      ['女', '結論として、窓側の、会議室から最も離れた位置に設置いたします。コピー機の音が気になるというご意見もありましたが、コピー機は静かな機種に入れ替える予定です。', 'Kết luận là sẽ đặt ở vị trí phía cửa sổ, xa phòng họp nhất. Cũng có ý kiến lo tiếng máy photocopy, nhưng máy photocopy dự kiến sẽ được thay bằng loại chạy êm.'],
      ['女', 'ブースは予約なしで、一回二時間まで使えるようにする予定です。運用のルールは、引っ越しの前に改めてお知らせいたします。', 'Buồng sẽ dùng không cần đặt trước, mỗi lần tối đa hai tiếng. Quy tắc sử dụng sẽ được thông báo lại trước khi chuyển văn phòng.'],
    ],
    questions: [
      [
        '集中ブースはどこに設置されますか。',
        ['【1】', '【2】', '【3】', '【4】'],
        0,
        'Phía cửa sổ là hàng trên cùng; xa phòng họp nhất là góc trái → 【1】, lựa chọn 1. Lựa chọn 2 là phương án ban đầu (giữa phía cửa sổ, gần phòng họp) nhưng bị xem lại vì người ra vào phòng họp nhiều. 【3】 cạnh khu cà phê, 【4】 cạnh lễ tân, đều bị loại.',
      ],
    ],
    points: [
      ['設ける', 'もうける', 'lập, đặt ra'],
      ['指摘', 'してき', 'sự chỉ ra, góp ý'],
      ['運用', 'うんよう', 'vận hành, sử dụng'],
    ],
  }),
  item('w14', 'sogo-chodokkai', 3, {
    material: {
      kind: 'table',
      title: '物流フォーラム2027　午後の部（2月18日（木））',
      head: ['時間', 'プログラム'],
      rows: [
        ['13:00〜14:00', '【1】基調講演（東都大学 小林教授）'],
        ['14:00〜15:00', '【2】事例発表（2社）'],
        ['15:00〜16:00', '【3】パネル討論'],
        ['16:00〜16:30', '【4】質疑応答・閉会'],
      ],
    },
    script: [
      ['女', '大変です。基調講演の小林先生から、乗る予定の飛行機が機材の故障で遅れていて、会場に着くのが三時過ぎになりそうだと、ご連絡がありました。', 'Gay rồi. Giáo sư Kobayashi, người diễn thuyết chính, liên lạc báo chuyến bay định đi bị trễ vì máy bay hỏng, có lẽ quá ba giờ mới tới hội trường.'],
      ['男', '三時過ぎか……。じゃあ、講演とパネル討論を入れ替えるしかないな。', 'Quá ba giờ à… Vậy chỉ còn cách đổi chỗ bài diễn thuyết và tọa đàm.'],
      ['女', 'でも、先生はパネルにもご登壇いただくことになっています。講演の前に討論というのは、話の順番としてどうでしょう。', 'Nhưng giáo sư cũng sẽ lên tọa đàm. Tọa đàm trước bài diễn thuyết thì thứ tự câu chuyện có ổn không ạ?'],
      ['男', 'そうか、それは困るな。講演で問題提起していただいて、それを受けて議論する、という流れだったからね。', 'Phải rồi, thế thì khó. Vì mạch là giáo sư nêu vấn đề trong bài diễn thuyết, rồi dựa vào đó để thảo luận.'],
      ['女', 'では、講演を三時からにして、パネルをそのあとの四時からにするのはいかがでしょう。質疑応答は、パネルの中で会場からの質問を受ける形にすれば、時間内に収まります。', 'Vậy cho bài diễn thuyết bắt đầu từ ba giờ, tọa đàm chuyển ra sau, từ bốn giờ thì sao ạ? Phần hỏi đáp thì nhận câu hỏi từ hội trường ngay trong tọa đàm, như vậy vẫn gói gọn trong thời gian.'],
      ['男', 'それがいいね。そうすると、一時から三時までが空くけど。', 'Thế được đấy. Vậy thì từ một giờ đến ba giờ bị trống.'],
      ['女', '事例発表を一時からに繰り上げて、もともと候補に挙がっていたもう一社にも、急ですがお願いしてみます。二社で一時間の予定でしたので、三社で二時間なら、ちょうどいいかと。', 'Tôi sẽ đẩy phần giới thiệu ví dụ lên từ một giờ, và thử nhờ gấp thêm một công ty vốn từng có tên trong danh sách. Dự định là hai công ty trong một tiếng, nên ba công ty trong hai tiếng thì vừa.'],
      ['男', 'わかった。参加者には、受付で新しいプログラムを配ろう。', 'Được. Ta sẽ phát chương trình mới cho người tham dự ở quầy tiếp nhận.'],
    ],
    questions: [
      [
        'パネル討論は、表のどの時間に行われることになりましたか。',
        ['【1】の時間', '【2】の時間', '【3】の時間', '【4】の時間'],
        3,
        'Bài diễn thuyết dời sang 15:00, tọa đàm ra sau, bắt đầu 16:00 và gộp luôn hỏi đáp → khung của 【4】, lựa chọn 4. Lựa chọn 1 xuất phát từ ý đổi chỗ diễn thuyết với tọa đàm, nhưng bị bác vì giáo sư cũng lên tọa đàm. Lựa chọn 3 là giờ cũ; khung đó giờ là bài diễn thuyết.',
      ],
    ],
    points: [
      ['登壇', 'とうだん', 'lên diễn đàn, lên sân khấu'],
      ['問題提起', 'もんだいていき', 'nêu vấn đề'],
      ['繰り上げる', 'くりあげる', 'đẩy lên sớm hơn'],
    ],
  }),
  item('w14', 'sogo-chodokkai', 4, {
    material: {
      kind: 'text',
      title: '在宅勤務制度の見直し案（人事部）',
      body: '【1】在宅勤務の上限（週2日）を撤廃する\n【2】通信費として月3,000円を支給する\n【3】チームごとの出社日を週1日に統一する\n【4】勤怠システムでの業務開始・終了の報告を義務づける',
    },
    script: [
      ['男', '昨日の経営会議、人事の見直し案はどうなったんですか。', 'Cuộc họp ban điều hành hôm qua, đề án sửa chế độ của nhân sự thế nào rồi ạ?'],
      ['女', 'そうね、いろいろ意見が出たわよ。上限をなくす件は、「理念としてはわかる」という声もあったんだけど、「時期尚早ではないか」という方が多くて。まあ、そういうことね。', 'Ừ, có nhiều ý kiến lắm. Chuyện bỏ giới hạn thì cũng có người nói "về lý tưởng thì hiểu", nhưng nhiều người cho là "có phải còn quá sớm không". Thôi, là như vậy đấy.'],
      ['男', 'ああ……。手当のほうは？', 'À… Còn khoản phụ cấp thì sao ạ?'],
      ['女', 'それは「その程度の金額なら」ということで、特に反対はなかったわ。来月の給与から出ることになりそう。', 'Cái đó thì "số tiền cỡ đó thì được", không ai phản đối. Có lẽ sẽ trả từ lương tháng sau.'],
      ['男', '出社日の統一はどうでした？　営業部は嫌がりそうですけど。', 'Thống nhất ngày lên công ty thì sao ạ? Bộ phận kinh doanh chắc không thích.'],
      ['女', '案の定よ。お客様の都合で動くから、曜日を決められると困る、って。結局、各部でもう一度話し合ってから、ということで持ち帰りになったわ。', 'Đúng như dự đoán. Họ nói làm theo lịch khách hàng nên bị quy định thứ thì khó. Cuối cùng là mang về, để từng bộ phận bàn lại rồi tính.'],
      ['男', '勤怠の報告は？', 'Còn việc báo giờ làm thì sao ạ?'],
      ['女', 'それはもう、どなたからも異論は出なかったわね。在宅の人がどれだけ働いているか見えないのは、みんな気にしてたから。', 'Cái đó thì không ai có ý kiến trái chiều cả. Không thấy được người làm ở nhà làm việc bao nhiêu thì ai cũng lo mà.'],
      ['男', 'そうですか。じゃあ、社内への案内文、決まったものから準備しておきます。', 'Vậy à. Thế tôi sẽ chuẩn bị văn bản thông báo nội bộ cho những mục đã quyết.'],
      ['女', 'お願い。上限の件は、来年度にもう一度、データを集めてから出し直すことになると思うわ。在宅の日に生産性がどう変わったか、数字で示せないと、なかなか通らないでしょうね。', 'Nhờ anh nhé. Chuyện giới hạn thì tôi nghĩ năm sau sẽ thu thập dữ liệu rồi trình lại. Không chỉ ra được bằng con số năng suất thay đổi thế nào vào ngày làm ở nhà thì khó mà được thông qua.'],
    ],
    questions: [
      [
        '経営会議で認められたのはどれですか。',
        ['【1】と【2】', '【2】と【4】', '【1】と【3】', '【3】と【4】'],
        1,
        'Phụ cấp 【2】 không ai phản đối, báo giờ làm 【4】 không ai có ý kiến trái → lựa chọn 2. 【1】: 時期尚早 và まあ、そういうことね là cách nói vòng rằng bị bác, dù có người "hiểu về lý tưởng". 【3】 chưa được duyệt mà mang về (持ち帰り), nên lựa chọn 4 chỉ đúng một nửa.',
      ],
    ],
    points: [
      ['時期尚早', 'じきしょうそう', 'còn quá sớm'],
      ['案の定', 'あんのじょう', 'đúng như dự đoán'],
      ['持ち帰り', 'もちかえり', 'mang về xem xét lại'],
      ['異論', 'いろん', 'ý kiến trái chiều'],
    ],
  }),
];

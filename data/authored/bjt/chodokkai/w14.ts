import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/** Week 14 — presentations and debate: speakers often say what they think without saying it. Level: J1, about a third J1+. */
export const W14: BjtItem[] = [
  item('w14', 'jokyo', 1, {
    material: {
      kind: 'table',
      title: '提案資料の構成（案）',
      head: ['順番', '内容'],
      rows: [
        ['1', '会社紹介'],
        ['2', '市場の現状'],
        ['3', '新サービスの特徴'],
        ['4', '料金プラン'],
        ['5', '導入事例'],
      ],
    },
    script: [
      ['男', '明日のお客様は、もううちの会社のことはよくご存じだから、会社紹介は最後に短く入れるだけでいいよ。', 'Khách ngày mai đã biết rõ về công ty mình rồi, nên phần giới thiệu công ty chỉ cần đưa ngắn gọn vào cuối thôi.'],
      ['女', 'では、市場の話から始めますか。', 'Vậy mình bắt đầu bằng phần thị trường ạ?'],
      ['男', 'いや、先方はお忙しいから、一番知りたがっている導入事例を最初に見せよう。そのあとに特徴、料金という流れで。市場の現状は、今回は省いていいかな。', 'Không, bên đó bận lắm, nên cho xem ngay từ đầu phần ví dụ triển khai mà họ muốn biết nhất. Sau đó là đặc điểm, rồi giá. Phần hiện trạng thị trường lần này bỏ đi cũng được.'],
      ['女', 'わかりました。直しておきます。', 'Vâng, em sẽ sửa lại.'],
    ],
    questions: [
      [
        '新しい構成で、二番目に来るのは何ですか。',
        ['会社紹介', '市場の現状', '新サービスの特徴', '料金プラン'],
        2,
        'Lựa chọn 3: thứ tự mới là ví dụ triển khai → đặc điểm dịch vụ mới → giá → giới thiệu công ty; phần thị trường bị bỏ. Lựa chọn 2 là thứ tự cũ trong bảng. Lựa chọn 1 bị chuyển xuống cuối.',
      ],
    ],
    points: [
      ['導入事例', 'どうにゅうじれい', 'ví dụ đã triển khai thực tế'],
      ['省く', 'はぶく', 'lược bỏ'],
    ],
  }),
  item('w14', 'jokyo', 2, {
    material: {
      kind: 'table',
      title: '社内改善提案コンテスト 発表順',
      head: ['順番', '発表者', 'テーマ'],
      rows: [
        ['1', '営業部 石田', '新規顧客の開拓'],
        ['2', '製造部 平野', '不良率の削減'],
        ['3', '人事部 菅原', '採用広報の改善'],
        ['4', '経理部 安藤', '経費精算の電子化'],
      ],
    },
    script: [
      ['女', '平野さん、工場からの移動で、少し遅れるそうです。', 'Anh/chị Hirano nói sẽ đến muộn một chút vì phải di chuyển từ nhà máy.'],
      ['男', 'じゃあ、平野さんは最後に回そう。それと、安藤さんは午後から外出があるって言ってたから、一番目にしてあげて。ほかの人は今の順番のままで。', 'Vậy cho Hirano xuống cuối. Còn Ando nói chiều có việc ra ngoài, nên cho lên đầu tiên. Những người khác giữ thứ tự như cũ.'],
    ],
    questions: [
      [
        '二番目に発表するのは誰ですか。',
        ['石田', '平野', '菅原', '安藤'],
        0,
        'Lựa chọn 1: Ando lên đầu, Hirano xuống cuối, những người còn lại giữ thứ tự cũ: Ando → Ishida → Sugawara → Hirano. Lựa chọn 2 là người số 2 trong bảng cũ. Lựa chọn 3 là bẫy nếu chỉ dời Hirano mà quên Ando.',
      ],
    ],
    points: [
      ['回す', 'まわす', 'chuyển, dời (sang lượt khác)'],
      ['不良率', 'ふりょうりつ', 'tỷ lệ hàng lỗi'],
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
      kind: 'table',
      title: '在庫管理システム 2案の比較',
      head: ['', 'A案（クラウド型）', 'B案（自社開発）'],
      rows: [
        ['初期費用', '300万円', '1,500万円'],
        ['月額費用', '25万円', '5万円'],
        ['導入までの期間', '2か月', '8か月'],
        ['自社に合わせた変更', '一部のみ可能', '自由に可能'],
      ],
    },
    script: [
      ['部長', '情報システム課としては、どちらがいいと思う？', 'Phòng hệ thống thông tin thấy phương án nào tốt hơn?'],
      ['吉川', '長い目で見れば、B案のほうが自由がききますので…。', 'Về lâu dài thì phương án B linh hoạt hơn, nên…'],
      ['部長', '費用はどう？', 'Chi phí thì sao?'],
      ['吉川', '五年間で比べますと、どちらも初期費用と月額を合わせて千八百万円前後で、ほぼ変わりません。', 'Nếu so trong năm năm thì cả hai, cộng chi phí ban đầu và hằng tháng, đều khoảng mười tám triệu yên, gần như không khác.'],
      ['中島', 'あのう、物流課としましては、来年春の繁忙期までに、今の在庫のずれを何とかしたいというのが正直なところでして…。', 'Ừm, phía phòng hậu cần thì thật lòng là muốn xử lý được chuyện lệch số tồn kho hiện nay trước mùa cao điểm mùa xuân năm sau…'],
      ['部長', '春までとなると、あと四か月か。', 'Đến mùa xuân thì còn bốn tháng nhỉ.'],
      ['吉川', '…そういうことでしたら、私もB案にこだわるつもりはありません。', '…Nếu vậy thì tôi cũng không định khăng khăng với phương án B.'],
      ['部長', 'よし、では今回はそちらで進めよう。', 'Được, vậy lần này đi theo hướng đó.'],
    ],
    questions: [
      [
        '中島さんが言いたいことは何ですか。',
        ['自社に合わせて自由に変更できる案にしてほしい', '費用ができるだけ安い案にしてほしい', '春の繁忙期に間に合う案にしてほしい', '繁忙期が終わってから導入してほしい'],
        2,
        'Lựa chọn 3: Nakajima không nói thẳng "chọn A", mà nói muốn giải quyết chuyện tồn kho trước mùa cao điểm, tức còn khoảng bốn tháng; chỉ phương án A (2 tháng) kịp, B mất 8 tháng. Lựa chọn 4 hiểu ngược mốc thời gian. Lựa chọn 1 là ý của Yoshikawa.',
      ],
      [
        'どちらの案に決まりましたか。また、その理由は何ですか。',
        ['B案。自由に変更できるから', 'B案。月額費用が安いから', 'A案。五年間の費用が安いから', 'A案。導入までの期間が短いから'],
        3,
        'Lựa chọn 4: Yoshikawa thôi giữ B, trưởng bộ phận chốt "phương án đó", tức A, vì kịp trước mùa cao điểm. Lựa chọn 3 dễ chọn vì A rẻ lúc đầu, nhưng tính năm năm: A = 300 + 25 × 60 = 1.800 vạn, B = 1.500 + 5 × 60 = 1.800 vạn, bằng nhau, nên chi phí không phải lý do.',
      ],
    ],
    points: [
      ['自由がきく', 'じゆうがきく', 'linh hoạt, tuỳ biến được'],
      ['繁忙期', 'はんぼうき', 'mùa cao điểm'],
      ['こだわる', 'こだわる', 'khăng khăng, câu nệ'],
    ],
  }),
  item('w14', 'sogo-chodokkai', 2, {
    material: {
      kind: 'text',
      title: '提案：会議資料のペーパーレス化',
      body: '現状：会議資料の印刷は月に約12,000枚。用紙・トナー代は月に約6万円。\n提案：資料はタブレットで閲覧する。タブレットを20台購入する（1台4万円）。\n効果：印刷費がなくなり、購入費は約13か月で回収できる。',
    },
    script: [
      ['男', '…以上の理由から、会議資料をタブレットで見る形への切り替えをご提案します。', '…Vì những lý do trên, tôi đề xuất chuyển sang hình thức xem tài liệu họp trên máy tính bảng.'],
      ['女', 'ご提案の趣旨はよくわかりました。ただ、取引先との打ち合わせでは、今も紙の資料をお渡ししていますよね。そこは残るんじゃありませんか。', 'Tôi hiểu rõ ý của đề xuất. Có điều, khi họp với đối tác hiện vẫn đưa tài liệu giấy cho họ đúng không? Phần đó vẫn còn chứ?'],
      ['男', 'はい。社外向けの資料は全体の四分の一ほどですので、そこは引き続き印刷します。', 'Vâng. Tài liệu cho bên ngoài chiếm khoảng một phần tư tổng số, phần đó vẫn tiếp tục in.'],
      ['女', 'そうしますと、効果のところは書き直したほうがいいかもしれませんね。', 'Vậy thì phần "hiệu quả" có lẽ nên viết lại.'],
    ],
    questions: [
      [
        '社外向けの資料を印刷し続けると、印刷費は月にいくら減りますか。',
        ['約1万5千円', '約4万5千円', '約6万円', '約8万円'],
        1,
        'Lựa chọn 2: một phần tư vẫn in, nên chỉ giảm ba phần tư: 6 vạn × 3/4 = 4,5 vạn yên. Lựa chọn 3 là con số trong đề xuất (bỏ hẳn việc in). Lựa chọn 1 là phần vẫn phải trả, không phải phần giảm.',
      ],
      [
        '女の人の発言から分かることは何ですか。',
        ['タブレットの値段が高すぎると考えている', '提案そのものに反対している', '資料の「効果」の部分は正確ではないと考えている', '社外向けの資料もタブレットで見せるべきだと考えている'],
        2,
        'Lựa chọn 3: 効果のところは書き直したほうがいい là cách nói nhẹ rằng phần hiệu quả (thu hồi vốn 14 tháng) đang tính quá lạc quan: tiền tiết kiệm ít hơn thì thời gian thu hồi dài hơn. Lựa chọn 2 dễ chọn, nhưng người nói nói 趣旨はよくわかりました và chỉ góp ý một điểm, không phản đối cả đề xuất.',
      ],
    ],
    points: [
      ['趣旨', 'しゅし', 'ý chính, mục đích'],
      ['回収', 'かいしゅう', 'thu hồi (vốn)'],
      ['閲覧する', 'えつらんする', 'xem, đọc (tài liệu)'],
    ],
  }),
];

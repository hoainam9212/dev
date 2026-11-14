import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/** Week 16 — final review, mixed themes of the whole course (reading). Level: J1, six questions J1+. */
export const W16: BjtItem[] = [
  item('w16', 'goi', 1, {
    questions: [
      [
        '（取引先に）お問い合わせの件につきましては、担当の者から改めてご連絡＿＿＿。',
        ['差し上げます', 'いただきます', 'なさいます', 'くださいます'],
        0,
        'Lựa chọn 1: người liên lạc là người phía mình (担当の者) nên dùng khiêm nhường ご連絡差し上げます. Lựa chọn 2 dễ nhầm vì いただく cũng là khiêm nhường, nhưng ご連絡いただきます nghĩa là phía mình được khách liên lạc, ngược chiều. なさいます và くださいます là tôn kính, dùng cho hành động của khách.',
      ],
    ],
    points: [
      ['ご連絡差し上げる', 'ごれんらくさしあげる', 'liên lạc (khiêm nhường)'],
      ['担当の者', 'たんとうのもの', 'người phụ trách (phía mình)'],
    ],
  }),
  item('w16', 'goi', 2, {
    questions: [
      [
        '（部長に）先ほど山田様が＿＿＿資料は、こちらでよろしいでしょうか。',
        ['お持ちした', '持って参った', 'お持ちになった', 'お持ちいたした'],
        2,
        'Lựa chọn 3: ông Yamada là khách (様), hành động mang tài liệu đến là của khách nên dùng tôn kính お持ちになる. Ba lựa chọn còn lại đều là khiêm nhường, chỉ dùng khi chính mình hoặc người phía mình mang đến. Lựa chọn 1 dễ nhầm vì có お～, nhưng お持ちする là khiêm nhường (お～する), không phải tôn kính (お～になる).',
      ],
    ],
    points: [
      ['お持ちになる', 'おもちになる', 'mang (tôn kính)'],
      ['お持ちする', 'おもちする', 'mang (khiêm nhường)'],
    ],
  }),
  item('w16', 'goi', 3, {
    questions: [
      [
        '部品の入荷が遅れ、納期に間に合わない＿＿＿が出てきたため、早めに先方へ連絡した。',
        ['怖さ', '恐れ', '不安げ', '心配り'],
        1,
        'Lựa chọn 2: ～恐れがある / 恐れが出る = có nguy cơ (điều xấu xảy ra), dùng nhiều trong văn bản công việc. Lựa chọn 1 dễ nhầm vì cùng chữ 怖, nhưng 怖さ là cảm giác sợ của con người, không phải khả năng xảy ra. 不安げ là tính từ "có vẻ lo lắng", 心配り là sự quan tâm chu đáo.',
      ],
    ],
    points: [
      ['恐れがある', 'おそれがある', 'có nguy cơ'],
      ['入荷', 'にゅうか', 'hàng về kho'],
    ],
  }),
  item('w16', 'goi', 4, {
    questions: [
      [
        '今回の誤配送は、弊社の確認不足によるものであり、弁解の＿＿＿もございません。',
        ['余裕', '余力', '余白', '余地'],
        3,
        'Lựa chọn 4: 弁解の余地もない = không còn chỗ nào để biện minh, câu cố định khi xin lỗi khách. Lựa chọn 1 dễ nhầm vì 余裕 cũng là "chỗ dư", nhưng nó nói về thời gian, tiền hay tâm trí (時間の余裕), không đi với 弁解. 余力 là sức còn dư, 余白 là khoảng trống trên giấy.',
      ],
    ],
    points: [
      ['弁解の余地もない', 'べんかいのよちもない', 'không có gì để biện minh'],
      ['確認不足', 'かくにんぶそく', 'kiểm tra không kỹ'],
      ['誤配送', 'ごはいそう', 'giao nhầm'],
    ],
  }),
  item('w16', 'goi', 5, {
    questions: [
      [
        '海外での販売が好調で、今期の売上高は前期を5％＿＿＿、過去最高を更新した。',
        ['下回り', '落ち込み', '上回り', '割り込み'],
        2,
        'Lựa chọn 3: doanh thu "vượt" kỳ trước 5% thì mới lập kỷ lục mới (過去最高を更新). Ba lựa chọn còn lại đều chỉ sự sụt giảm, mâu thuẫn với 好調 và kỷ lục. Lựa chọn 4 dễ nhầm vì 割り込む hay đi với con số (1万円を割り込む), nhưng nó là tụt xuống dưới một mốc.',
      ],
    ],
    points: [
      ['上回る', 'うわまわる', 'vượt, cao hơn'],
      ['過去最高を更新する', 'かこさいこうをこうしんする', 'lập kỷ lục cao nhất mới'],
    ],
  }),
  item('w16', 'goi', 6, {
    questions: [
      [
        '前の会議が長引いているため、本日の説明会の開始が十分ほど＿＿＿。恐れ入りますが、先に資料をご覧ください。',
        ['遅らせます', '遅れます', '遅くします', '遅めます'],
        1,
        'Lựa chọn 2: chủ ngữ là 開始が, nên cần tự động từ 遅れる (bị trễ). Lựa chọn 1 dễ nhầm vì cùng cặp, nhưng 遅らせる là tha động từ (làm cho trễ), phải nói 開始を遅らせます. 遅くする cũng cần を, còn 遅める không phải động từ có thật.',
      ],
    ],
    points: [
      ['遅れる', 'おくれる', 'bị trễ (tự động từ)'],
      ['長引く', 'ながびく', 'kéo dài hơn dự kiến'],
    ],
  }),
  item('w16', 'hyogen', 1, {
    material: {
      kind: 'text',
      body: 'A（取引先）：では、明日の会議は午後2時からとお伝えください。\nB：かしこまりました。佐藤が戻りましたら、そのように＿＿＿。',
    },
    questions: [
      [
        '空欄に入る最も適当なものはどれですか。',
        ['お伝えになります', '申し伝えます', '伝えておかれます', 'お伝え願います'],
        1,
        'Mình chuyển lời cho đồng nghiệp trong công ty, nói với khách → khiêm nhường 申し伝える → lựa chọn 2. Lựa chọn 4 dễ nhầm vì nghe lịch sự, nhưng お伝え願います là nhờ khách chuyển lời, sai chủ thể. お伝えになる và ～ておかれる là tôn kính ngữ, không dùng cho hành động của mình.',
      ],
    ],
    points: [
      ['申し伝える', 'もうしつたえる', 'chuyển lời (khiêm nhường)'],
      ['かしこまりました', 'かしこまりました', 'tôi đã rõ (rất lịch sự)'],
    ],
  }),
  item('w16', 'hyogen', 2, {
    material: {
      kind: 'text',
      body: '（注文書を受け取ったことを、取引先にFAXで知らせる）\n本日、ご注文書を確かに＿＿＿。ありがとうございました。',
    },
    questions: [
      [
        '空欄に入る最も適当なものはどれですか。',
        ['ご拝受しました', 'お受け取りになりました', '受領されました', '拝受いたしました'],
        3,
        'Người nhận đơn là mình, nên dùng khiêm nhường ngữ 拝受 (nhận một cách cung kính) → 拝受いたしました, lựa chọn 4. Lựa chọn 1 dễ nhầm vì cũng có 拝受, nhưng thêm ご vào trước khiêm nhường ngữ là sai. お受け取りになる và 受領される là tôn kính ngữ, biến việc nhận thành việc của khách.',
      ],
    ],
    points: [
      ['拝受する', 'はいじゅする', 'nhận (khiêm nhường, văn viết)'],
      ['注文書', 'ちゅうもんしょ', 'đơn đặt hàng'],
    ],
  }),
  item('w16', 'hyogen', 3, {
    material: {
      kind: 'text',
      body: '（取引先の創立記念パーティーの招待を断るメールで）\nせっかくお招き＿＿＿のに、あいにく当日は先約がございまして、誠に申し訳ございません。',
    },
    questions: [
      [
        '空欄に入る最も適当なものはどれですか。',
        ['いただいた', 'さしあげた', 'いたした', 'になられた'],
        0,
        'Mình được khách mời → お招きいただいた → lựa chọn 1. Lựa chọn 3 dễ nhầm vì いたす cũng là khiêm nhường ngữ, nhưng お招きいたした nghĩa là chính mình mời khách, ngược vai. さしあげる cũng là mình làm cho khách; お招きになられた là kính ngữ kép (お～になる + られる).',
      ],
    ],
    points: [
      ['お招きいただく', 'おまねきいただく', 'được mời'],
      ['先約', 'せんやく', 'hẹn trước'],
      ['創立記念', 'そうりつきねん', 'kỷ niệm thành lập'],
    ],
  }),
  item('w16', 'sogo-dokkai', 1, {
    material: {
      kind: 'text',
      title: '伝言メモ',
      body: '小松さんへ\n\n2026年11月24日（火）10:15　受：中山\n\n株式会社アオイ設備の藤井様からお電話がありました。\n明日予定していた空調点検の件ですが、作業員の手配がつかず、午後からの作業になるとのことです。\n点検中は会議室Bが使えなくなるので、午後に会議室Bを予約している人がいれば、別の部屋に移ってもらってほしいとのことでした。\nなお、藤井様への折り返しのお電話は不要とのことです。',
    },
    questions: [
      [
        '小松さんがしなければならないことは何ですか。',
        ['藤井様に電話して、作業時間を確かめる', '空調点検の作業員を午後に手配する', '午後に会議室Bを使う人に移動を頼む', '明日の午前中に、会議室Bを空けておく'],
        2,
        'Lời nhắn: nếu có người đặt phòng họp B buổi chiều thì nhờ họ chuyển phòng → lựa chọn 3. Lựa chọn 1 dễ nhầm vì thông thường phải gọi lại, nhưng memo ghi rõ 折り返しのお電話は不要. Điều phối thợ là việc của 藤井; phòng B không dùng được vào buổi chiều chứ không phải buổi sáng.',
      ],
    ],
    points: [
      ['伝言', 'でんごん', 'lời nhắn'],
      ['折り返し', 'おりかえし', 'gọi lại'],
      ['手配がつく', 'てはいがつく', 'sắp xếp được (người, đồ)'],
    ],
  }),
  item('w16', 'sogo-dokkai', 2, {
    material: {
      kind: 'text',
      title: '「国際物流システム展2027」ご招待のご案内',
      body: '拝啓　時下ますますご清栄のこととお慶び申し上げます。平素は格別のご高配を賜り、厚く御礼申し上げます。\nさて、弊社はこのたび「国際物流システム展2027」に出展する運びとなりました。新型の自動仕分け機を実演いたしますので、ご多用中とは存じますが、ぜひお立ち寄りください。\n入場には事前登録が必要です。同封の招待コードをご入力のうえ、展示会公式サイトにて2月12日（金）までにご登録ください。\n敬具\n\n記\n会期：2027年2月17日（水）〜19日（金）\n会場：東京国際展示場 西ホール W-215\n以上',
    },
    questions: [
      [
        '招待を受けた人が来場するためにしなければならないことは何ですか。',
        ['招待コードを使い、事前に登録する', '会場で招待コードを入力し、入場する', '2月12日までに出展社に出欠を知らせる', '会期中にブースW-215で登録をする'],
        0,
        'Muốn vào phải đăng ký trước trên trang chính thức bằng mã mời gửi kèm, hạn 12/2 → lựa chọn 1. Lựa chọn 2 dễ nhầm vì đúng là dùng mã mời, nhưng nhập trên trang web trước, không phải tại hội trường. Thư không yêu cầu báo tham dự cho công ty triển lãm; W-215 chỉ là vị trí gian hàng.',
      ],
    ],
    points: [
      ['運びとなる', 'はこびとなる', 'đi đến (việc), sẽ được thực hiện'],
      ['事前登録', 'じぜんとうろく', 'đăng ký trước'],
      ['お立ち寄りください', 'おたちよりください', 'xin ghé qua'],
    ],
  }),
  item('w16', 'sogo-dokkai', 3, {
    material: {
      kind: 'text',
      title: 'インターンシップ受け入れのご依頼について',
      body: '北陵大学 キャリアセンター\n石原様\n\nいつもお世話になっております。\nこのたびは、来年夏のインターンシップ受け入れについてご依頼いただき、誠にありがとうございます。\n社内で検討いたしましたが、来年は工場の生産ラインの更新工事が予定されており、学生の皆様を安全にお迎えできる体制が整わないため、受け入れを見送らせていただくことになりました。\nせっかくのご依頼にお応えできず、申し訳ございません。再来年以降につきましては、改めてご相談させていただければ幸いです。',
    },
    questions: [
      [
        'このメールの主な目的は何ですか。',
        ['工事が終わり次第、受け入れると約束すること', '来年の受け入れはできないと伝えること', '受け入れの条件について、相談を求めること', '安全対策を整えるよう、大学に頼むこと'],
        1,
        '見送らせていただく = lần này không nhận (từ chối khéo), lý do là thi công thay dây chuyền năm tới → lựa chọn 2. Lựa chọn 1 dễ nhầm vì cuối thư có nói về năm sau nữa, nhưng chỉ là "xin bàn lại", không hứa nhận. Người phải lo an toàn là phía công ty, không phải trường.',
      ],
    ],
    points: [
      ['見送る', 'みおくる', 'gác lại, lần này không làm'],
      ['再来年', 'さらいねん', 'năm sau nữa'],
      ['更新工事', 'こうしんこうじ', 'thi công thay mới'],
    ],
  }),
  item('w16', 'sogo-dokkai', 4, {
    material: {
      kind: 'text',
      title: '定期健康診断の実施について',
      body: '社員各位\n\n総務部\n\n今年度の定期健康診断を下記のとおり実施します。全員必ず受診してください。\n\n記\n期間：2027年2月15日（月）〜19日（金）\n会場：本社2階 研修室\n受診時間：部署ごとに指定（別紙参照）\n注意：受診日の前日は、午後9時以降は食事をとらないでください。水は当日の午前8時まで飲めます。\n※指定日の都合が悪い人は、2月5日（金）までに総務部へ変更を申し出てください。\n以上',
    },
    questions: [
      [
        '受診日の前日、食事は何時までに済ませなければなりませんか。',
        ['午前8時', '午後5時', '午前0時', '午後9時'],
        3,
        'Phần 注意: hôm trước ngày khám, từ 9 giờ tối trở đi không ăn → phải ăn xong trước 9 giờ tối, lựa chọn 4. Lựa chọn 1 dễ nhầm vì có trong thông báo, nhưng 8 giờ sáng là giờ cuối được uống nước của ngày khám, không phải giờ ăn.',
      ],
    ],
    points: [
      ['受診', 'じゅしん', 'đi khám'],
      ['別紙', 'べっし', 'tờ đính kèm'],
      ['申し出る', 'もうしでる', 'đề nghị, trình báo'],
    ],
  }),
];

import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/**
 * Full test 1 (week 8), 聴読解: 5 状況把握 + 10 資料聴読解 + 10 総合聴読解 questions = 25.
 * Mixes the themes of weeks 1–7; about 30% of the questions are J1+ (calculation, inference).
 */
export const MOCK1: BjtItem[] = [
  // ── 状況把握 ──
  item('mock1', 'jokyo', 1, {
    material: {
      kind: 'table',
      title: '営業部の座席',
      head: ['', '窓側', '中央', '通路側'],
      rows: [
        ['1列目', '佐藤', '（空席）', '鈴木'],
        ['2列目', '田中', '高橋', '（空席）'],
        ['3列目', '（空席）', '山本', '伊藤'],
      ],
    },
    script: [
      ['女', '来週から来る小川さんの席、どこにしましょうか。空いているのは三つです。', 'Chỗ ngồi của anh Ogawa đến từ tuần sau, xếp ở đâu ạ? Còn ba chỗ trống.'],
      ['男', '教育係は高橋さんだから、高橋さんの近くがいいね。', 'Người kèm cặp là anh Takahashi, nên gần anh ấy thì tốt.'],
      ['女', '高橋さんの前の席も空いていますけど。', 'Ghế ngay trước anh Takahashi cũng đang trống.'],
      ['男', '前だと、話しかけるたびに振り返らないといけないでしょう。隣にしてあげて。', 'Ngồi trước thì mỗi lần nói chuyện lại phải quay người. Cho ngồi bên cạnh đi.'],
    ],
    questions: [
      [
        '小川さんの席はどこですか。',
        ['1列目の中央', '3列目の窓側', '2列目の通路側', '2列目の窓側'],
        2,
        'Takahashi ngồi giữa hàng 2. Ghế cạnh còn trống trong cùng hàng là phía lối đi. Hàng 1 giữa là ghế "phía trước" bị gạt đi. 2列目の窓側 là chỗ của Tanaka, đã có người.',
      ],
    ],
    points: [
      ['教育係', 'きょういくがかり', 'người kèm cặp, hướng dẫn'],
      ['振り返る', 'ふりかえる', 'quay lại phía sau'],
    ],
  }),
  item('mock1', 'jokyo', 2, {
    material: {
      kind: 'table',
      title: '新しい名刺のデザイン案',
      head: ['案', 'ロゴの位置', '裏面', '用紙'],
      rows: [
        ['A', '左上', '英語表記', '白'],
        ['B', '中央', '英語表記', '再生紙'],
        ['C', '左上', '白紙', '再生紙'],
        ['D', '中央', '白紙', '白'],
      ],
    },
    script: [
      ['男', '新しい名刺のデザイン、どれにする？', 'Thiết kế danh thiếp mới, chọn cái nào?'],
      ['女', 'ロゴは、中央より左上のほうが落ち着いて見えますね。', 'Logo đặt góc trên bên trái trông chững chạc hơn để ở giữa.'],
      ['男', 'そうだね。海外のお客様も増えたから、裏には英語を入れたいな。', 'Đúng vậy. Khách nước ngoài cũng tăng, nên mặt sau muốn có tiếng Anh.'],
      ['女', '紙は再生紙にしますか。', 'Giấy thì dùng giấy tái chế ạ?'],
      ['男', '再生紙は少し色がくすむって、デザイン部が言ってたからね。今回はやめておこう。', 'Phòng thiết kế nói giấy tái chế màu hơi xỉn. Lần này thôi.'],
    ],
    questions: [
      [
        'どのデザインになりましたか。',
        ['A', 'B', 'C', 'D'],
        0,
        'Logo góc trên trái → A hoặc C. Mặt sau tiếng Anh → A hoặc B. Không dùng giấy tái chế → A hoặc D. Chỉ A thoả cả ba.',
      ],
    ],
    points: [
      ['再生紙', 'さいせいし', 'giấy tái chế'],
      ['くすむ', 'くすむ', 'xỉn màu'],
      ['裏面', 'うらめん', 'mặt sau'],
    ],
  }),
  item('mock1', 'jokyo', 3, {
    material: {
      kind: 'table',
      title: 'セミナー会場のレイアウト案',
      head: ['案', '机の並べ方', '席数', 'スクリーン'],
      rows: [
        ['A', 'スクール形式', '60席', '1台'],
        ['B', '島型', '40席', '2台'],
        ['C', 'シアター形式（机なし）', '80席', '1台'],
        ['D', '島型', '48席', '2台'],
      ],
    },
    script: [
      ['女', '参加者は四十五人の予定です。途中でグループで話し合う時間もあるので、机を囲む形にしたいんです。', 'Dự kiến bốn mươi lăm người tham dự. Giữa chừng có phần thảo luận nhóm, nên tôi muốn xếp bàn kiểu ngồi quây quanh.'],
      ['男', 'スクリーンはどうしますか。', 'Còn màn chiếu thì sao ạ?'],
      ['女', '後ろの人にも見えるように、二台お願いします。', 'Nhờ anh đặt hai cái để người ngồi sau cũng nhìn thấy.'],
    ],
    questions: [
      [
        'どのレイアウトにしますか。',
        ['A', 'B', 'C', 'D'],
        3,
        'Ngồi quây quanh bàn = 島型 (B hoặc D). Hai màn chiếu: cả B và D đều có. Bốn mươi lăm người thì B (40 chỗ) không đủ, còn D (48 chỗ). A và C nhiều chỗ nhưng không phải kiểu ngồi nhóm.',
      ],
    ],
    points: [
      ['島型', 'しまがた', 'xếp bàn theo cụm (kiểu đảo)'],
      ['囲む', 'かこむ', 'vây quanh'],
    ],
  }),
  item('mock1', 'jokyo', 4, {
    material: {
      kind: 'table',
      title: '大阪出張 行程案',
      head: ['案', '行き', '帰り', '費用'],
      rows: [
        ['A', '当日 7:00発 新幹線', '当日 20:00発', '28,000円'],
        ['B', '前日 19:00発 新幹線', '当日 18:00発', '39,000円（宿泊込み）'],
        ['C', '当日 6:30発 飛行機', '当日 21:00発', '35,000円'],
        ['D', '前日 19:00発 新幹線', '翌日 10:00発', '52,000円（2泊）'],
      ],
    },
    script: [
      ['男', '大阪の会議は朝九時からなんですが、当日の朝に出たのでは、どれも間に合わないんです。', 'Cuộc họp ở Osaka bắt đầu chín giờ sáng, nhưng đi từ sáng hôm đó thì phương án nào cũng không kịp.'],
      ['女', '帰りはどうしますか。', 'Còn chiều về thì sao ạ?'],
      ['男', '次の日の朝から東京で打ち合わせがあるので、その日のうちに戻ります。', 'Sáng hôm sau tôi có buổi trao đổi ở Tokyo, nên tôi về ngay trong ngày.'],
    ],
    questions: [
      [
        'どの行程になりますか。',
        ['A', 'B', 'C', 'D'],
        1,
        'Đi từ sáng hôm họp đều không kịp → loại A và C, còn B và D (đi từ hôm trước). Về trong ngày → loại D (hôm sau mới về). Còn B.',
      ],
    ],
    points: [
      ['行程', 'こうてい', 'lịch trình'],
      ['宿泊込み', 'しゅくはくこみ', 'đã gồm tiền khách sạn'],
    ],
  }),
  item('mock1', 'jokyo', 5, {
    material: {
      kind: 'table',
      title: 'エレベーター案内（ロビー）',
      head: ['号機', '停止階'],
      rows: [
        ['1号機', '全階'],
        ['2号機', '1階・5〜10階'],
        ['3号機', '1〜5階'],
        ['4号機', '1階・10階（荷物用）'],
      ],
    },
    script: [
      ['女', '八階の会議室に行くんですが、1号機は点検中で止まっているそうです。', 'Tôi lên phòng họp tầng tám, nhưng nghe nói thang số 1 đang bảo trì nên ngừng chạy.'],
      ['男', 'じゃあ、上の階に止まるのに乗りましょう。荷物用は一般の人は使えませんから。', 'Vậy mình đi thang dừng ở các tầng trên. Thang chở hàng thì người thường không được dùng.'],
    ],
    questions: [
      [
        'どのエレベーターに乗りますか。',
        ['1号機', '3号機', '2号機', '4号機'],
        2,
        'Thang 1 đang bảo trì. Thang 3 chỉ tới tầng 5. Thang 4 là thang chở hàng và chỉ dừng tầng 10. Thang 2 dừng tầng 5–10, nên lên được tầng 8.',
      ],
    ],
    points: [
      ['点検中', 'てんけんちゅう', 'đang kiểm tra bảo trì'],
      ['停止階', 'ていしかい', 'tầng dừng'],
    ],
  }),

  // ── 資料聴読解 ──
  item('mock1', 'shiryo', 1, {
    material: {
      kind: 'bars',
      title: '年代別 会員アプリ利用率',
      unit: '%',
      labels: ['20代', '30代', '40代', '50代'],
      series: [{ name: '利用率', values: [72, 65, 48, 30] }],
    },
    script: [['男', '利用率が五割を下回っている年代に向けて、来月から店頭で、アプリの使い方の説明会を開きます。', 'Từ tháng sau, chúng tôi sẽ tổ chức buổi hướng dẫn dùng ứng dụng tại cửa hàng cho các nhóm tuổi có tỉ lệ sử dụng dưới năm mươi phần trăm.']],
    questions: [
      [
        '説明会の対象はどの年代ですか。',
        ['20代と30代', '30代と40代', '50代だけ', '40代と50代'],
        3,
        'Dưới 50%: 40代 (48%) và 50代 (30%). 40代 sát ngưỡng nên dễ bị bỏ sót, dẫn tới chọn "chỉ 50代".',
      ],
    ],
    points: [['下回る', 'したまわる', 'thấp hơn, dưới']],
  }),
  item('mock1', 'shiryo', 2, {
    material: {
      kind: 'table',
      title: '貸し会議室 料金表',
      head: ['部屋', '定員', '半日（4時間）', '1日（8時間）'],
      rows: [
        ['A', '20名', '15,000円', '25,000円'],
        ['B', '40名', '25,000円', '40,000円'],
        ['C', '60名', '35,000円', '60,000円'],
      ],
    },
    script: [['女', '研修の参加者は三十五名で、朝九時から夕方五時までの予定です。部屋は人数に合う、一番安いところでお願いします。', 'Khoá đào tạo có ba mươi lăm người, dự kiến từ chín giờ sáng đến năm giờ chiều. Nhờ đặt phòng rẻ nhất mà vừa số người.']],
    questions: [
      [
        '会場費はいくらになりますか。',
        ['25,000円', '40,000円', '35,000円', '60,000円'],
        1,
        '35 người → phòng B (40 chỗ) trở lên; rẻ nhất là B. Từ 9 giờ đến 17 giờ là 8 tiếng → giá một ngày = 40.000 yên. 25.000 yên là giá nửa ngày của B, hoặc giá một ngày của phòng A (không đủ chỗ).',
      ],
    ],
    points: [['貸し会議室', 'かしかいぎしつ', 'phòng họp cho thuê']],
  }),
  item('mock1', 'shiryo', 3, {
    material: {
      kind: 'table',
      title: '今年度 四半期別売上',
      head: ['四半期', '売上（百万円）'],
      rows: [
        ['第1四半期', '80'],
        ['第2四半期', '95'],
        ['第3四半期', '90'],
        ['第4四半期', '―'],
      ],
    },
    script: [['男', '今年度の売上目標は、年間で四億円です。第四四半期だけで目標の残りを売り上げる必要がありますので、販売計画を見直してください。', 'Mục tiêu doanh thu năm nay là bốn trăm triệu yên. Phần còn lại của mục tiêu phải bán được chỉ trong quý bốn, nên hãy xem lại kế hoạch bán hàng.']],
    questions: [
      [
        '第4四半期に必要な売上はいくらですか。',
        ['1億3,500万円', '9,500万円', '2億6,500万円', '4億円'],
        0,
        'Ba quý đầu: 80 + 95 + 90 = 265 triệu yên. Bốn trăm triệu trừ 265 triệu = 135 triệu yên = 1億3,500万円. 2億6,500万円 là tổng ba quý đã bán, không phải phần còn thiếu.',
      ],
    ],
    points: [
      ['売上目標', 'うりあげもくひょう', 'mục tiêu doanh thu'],
      ['残り', 'のこり', 'phần còn lại'],
    ],
  }),
  item('mock1', 'shiryo', 4, {
    material: {
      kind: 'text',
      title: '【社内公募】海外事業部スタッフ募集',
      body: '【社内公募】海外事業部 スタッフ募集\n\n募集人数：2名\n応募資格：入社3年以上、かつTOEIC 700点以上\n応募締切：5月31日（金）\n応募方法：所定の用紙を人事部へ提出',
    },
    script: [
      ['女', '社内公募の件で二点変更があります。締め切りが一週間延びて、六月七日になりました。', 'Về đợt tuyển nội bộ có hai điểm thay đổi. Hạn nộp được lùi một tuần, thành ngày bảy tháng sáu.'],
      ['女', 'それから、TOEICの点数がなくても、海外勤務の経験が一年以上あれば、応募できることになりました。', 'Ngoài ra, dù không có điểm TOEIC, ai có kinh nghiệm làm việc ở nước ngoài từ một năm trở lên cũng được nộp đơn.'],
    ],
    questions: [
      [
        '入社五年目で、TOEICを受けたことはないが、海外勤務の経験が二年ある人はどうなりますか。',
        ['応募できない', '五月三十一日までに応募できる', '六月七日までに応募できる', 'TOEICを受けてから応募する'],
        2,
        'Năm năm thâm niên đạt điều kiện 3 năm. Không có TOEIC nhưng hai năm làm ở nước ngoài thoả điều kiện mới. Hạn đã lùi sang 7/6. 31/5 là hạn cũ trên giấy.',
      ],
    ],
    points: [
      ['公募', 'こうぼ', 'tuyển công khai'],
      ['応募資格', 'おうぼしかく', 'điều kiện ứng tuyển'],
      ['所定の', 'しょていの', 'theo mẫu quy định'],
    ],
  }),
  item('mock1', 'shiryo', 5, {
    material: {
      kind: 'bars',
      title: '月平均残業時間（1人あたり）',
      unit: '時間',
      labels: ['4月', '5月', '6月', '7月'],
      series: [
        { name: '営業部', values: [30, 28, 35, 22] },
        { name: '開発部', values: [25, 30, 38, 36] },
      ],
    },
    script: [['男', '部署の残業時間が、二か月続けて前の月より増えた場合は、その時点で人員を追加することになっています。今回、開発部がこれにあたりました。', 'Quy định là nếu giờ làm thêm của một phòng tăng so với tháng trước hai tháng liên tiếp, thì ngay lúc đó sẽ bổ sung người. Lần này phòng phát triển rơi vào trường hợp đó.']],
    questions: [
      [
        '開発部の人員追加は、何月の結果を見て決まりましたか。',
        ['5月', '6月', '7月', '4月'],
        1,
        'Phòng phát triển: 25 → 30 (tháng 5 tăng), 30 → 38 (tháng 6 tăng lần thứ hai liên tiếp) → quyết định sau kết quả tháng 6. Tháng 7 giảm (38 → 36). Phòng kinh doanh tháng 6 tăng nhưng tháng 5 giảm, nên không tính.',
      ],
    ],
    points: [
      ['人員', 'じんいん', 'nhân sự, số người'],
      ['あたる', 'あたる', 'thuộc trường hợp, khớp với'],
    ],
  }),
  item('mock1', 'shiryo', 6, {
    material: {
      kind: 'table',
      title: '主な拠点と日本との時差',
      head: ['都市', '時差'],
      rows: [
        ['ロンドン', '－9時間'],
        ['ニューヨーク', '－14時間'],
        ['シンガポール', '－1時間'],
        ['シドニー', '＋1時間'],
      ],
      note: '夏時間は考えない。',
    },
    script: [['女', '日本時間の午後五時から、シンガポールとシドニーをつないで、三拠点で会議をします。シドニーの担当者に開始時間を伝えておいてください。', 'Từ năm giờ chiều giờ Nhật, sẽ họp ba điểm nối với Singapore và Sydney. Anh báo giờ bắt đầu cho người phụ trách ở Sydney giúp tôi.']],
    questions: [
      [
        'シドニーでは何時に始まりますか。',
        ['午後四時', '午後五時', '午前八時', '午後六時'],
        3,
        'Sydney sớm hơn Nhật một tiếng (+1), nên 17 giờ Nhật là 18 giờ Sydney. 16 giờ là giờ Singapore (−1). Đọc nhầm dấu cộng trừ sẽ chọn nhầm 16 giờ.',
      ],
    ],
    points: [
      ['拠点', 'きょてん', 'cơ sở, điểm (văn phòng)'],
      ['時差', 'じさ', 'chênh lệch múi giờ'],
    ],
  }),
  item('mock1', 'shiryo', 7, {
    material: {
      kind: 'text',
      title: '春の感謝キャンペーン',
      body: '【春の感謝キャンペーン】\n\n期間：3月1日〜3月31日\n内容：1回のご注文金額が5万円以上で5%引き、10万円以上で8%引き\n\n※他の割引券・クーポンとの併用はできません。',
    },
    script: [['男', 'こちらのお客様は、前回のご注文でお渡しした三パーセントの割引券をお持ちです。今回のご注文は六万円です。どちらか、お客様に有利なほうを使っていただきましょう。', 'Vị khách này có phiếu giảm giá ba phần trăm được tặng ở đơn trước. Đơn lần này là sáu mươi nghìn yên. Hãy cho khách dùng cách nào có lợi hơn.']],
    questions: [
      [
        'お客様の支払額はいくらになりますか。',
        ['57,000円', '58,200円', '55,200円', '60,000円'],
        0,
        'Không dùng chung được, chọn một. Khuyến mãi: 60.000 ≥ 50.000 → giảm 5% = 57.000 yên. Phiếu giảm 3% → 58.200 yên. Khuyến mãi lợi hơn. 55.200 yên là cộng dồn 5% + 3%, điều bị cấm.',
      ],
    ],
    points: [
      ['併用', 'へいよう', 'dùng kết hợp'],
      ['有利', 'ゆうり', 'có lợi'],
    ],
  }),
  item('mock1', 'shiryo', 8, {
    material: {
      kind: 'table',
      title: '社用車 予約状況（木曜日）',
      head: ['車', '定員', '午前', '午後'],
      rows: [
        ['1号車', '4人', '予約あり', '空き'],
        ['2号車', '7人', '空き', '予約あり'],
        ['3号車', '4人', '空き', '空き'],
        ['4号車', '7人', '予約あり', '空き'],
      ],
    },
    script: [['女', '木曜日の午後、五人でお客様の工場に伺います。社用車を一台、予約してもらえますか。', 'Chiều thứ năm, năm người chúng tôi sẽ đến nhà máy của khách. Anh đặt giúp một xe công ty được không?']],
    questions: [
      [
        'どの車を予約しますか。',
        ['1号車', '2号車', '4号車', '3号車'],
        2,
        'Năm người → xe 7 chỗ (số 2 hoặc 4). Buổi chiều: xe 2 đã có người đặt, xe 4 trống. Xe 3 trống cả ngày nhưng chỉ 4 chỗ.',
      ],
    ],
    points: [['社用車', 'しゃようしゃ', 'xe công ty']],
  }),
  item('mock1', 'shiryo', 9, {
    material: {
      kind: 'bars',
      title: '顧客満足度（5点満点）',
      unit: '点',
      labels: ['価格', '品質', '対応の速さ', '説明のわかりやすさ'],
      series: [
        { name: '昨年', values: [3.2, 4.1, 3.5, 3.8] },
        { name: '今年', values: [3.4, 4.2, 3.0, 3.9] },
      ],
    },
    script: [['男', '今年は、ほとんどの項目で評価が上がりました。ただ、一つだけ、大きく下がった項目があります。来年度は、この項目の改善を最優先にします。', 'Năm nay hầu hết các hạng mục đều được đánh giá cao hơn. Nhưng có một hạng mục giảm mạnh. Năm tới sẽ ưu tiên hàng đầu việc cải thiện hạng mục này.']],
    questions: [
      [
        '来年度、最優先で改善するのはどの項目ですか。',
        ['価格', '品質', '説明のわかりやすさ', '対応の速さ'],
        3,
        'Chỉ "tốc độ phản hồi" giảm (3.5 → 3.0); các mục khác đều tăng. "Giá" có điểm thấp nhất năm ngoái nên dễ chọn nhầm, nhưng năm nay đã tăng.',
      ],
    ],
    points: [
      ['最優先', 'さいゆうせん', 'ưu tiên hàng đầu'],
      ['改善', 'かいぜん', 'cải thiện'],
    ],
  }),
  item('mock1', 'shiryo', 10, {
    material: {
      kind: 'text',
      title: '交通費精算のルール',
      body: '交通費精算のルール\n\n・公共交通機関の利用を原則とする。\n・タクシーは、深夜（22時以降）の移動、または重い荷物がある場合に限り認める。\n・領収書のない精算は認めない。',
    },
    script: [['女', '昨日の展示会の帰りに、サンプルの入った重い箱を三つ運んだので、タクシーを使いました。夜九時ごろでした。領収書はもらっています。', 'Hôm qua đi triển lãm về, tôi phải chở ba thùng nặng đựng hàng mẫu nên đã đi taxi. Khoảng chín giờ tối. Tôi có lấy hoá đơn.']],
    questions: [
      [
        'この人のタクシー代は精算できますか。',
        ['夜十時前なので、精算できない', '荷物があったので、精算できる', '領収書がないので、精算できない', '展示会なので、半額だけ精算できる'],
        1,
        'Quy định dùng または: sau 22 giờ HOẶC có hành lý nặng. Chín giờ tối không đủ điều kiện giờ, nhưng có ba thùng nặng nên vẫn được thanh toán. Hoá đơn thì có. Lựa chọn 1 là bẫy cho ai đọc thành "và".',
      ],
    ],
    points: [
      ['精算', 'せいさん', 'thanh toán, quyết toán (chi phí)'],
      ['公共交通機関', 'こうきょうこうつうきかん', 'phương tiện công cộng'],
      ['領収書', 'りょうしゅうしょ', 'hoá đơn, biên lai'],
    ],
  }),

  // ── 総合聴読解 ──
  item('mock1', 'sogo-chodokkai', 1, {
    material: {
      kind: 'text',
      title: '本社移転のお知らせ（社内）',
      body: '件名：本社移転のお知らせ\n\n本社は、9月23日（月）より下記に移転します。\n\n新住所：東京都港区芝浦3-5-1 ベイサイドビル12階\n電話番号：変更なし\nFAX番号：03-5555-0102（新）\n\n移転作業のため、9月20日（金）午後は電話がつながりにくくなります。\n私物は、各自9月19日（木）までに段ボールに詰めてください。',
    },
    script: [
      ['男', '移転のお知らせ、取引先にも送らないといけないね。', 'Thông báo chuyển trụ sở cũng phải gửi cho đối tác nhỉ.'],
      ['女', 'はい。電話番号は変わらないので、住所とFAXだけでいいですよね。', 'Vâng. Số điện thoại không đổi, nên chỉ cần địa chỉ và số fax thôi nhỉ.'],
      ['男', 'うん。それと、二十日の午後は電話がつながりにくいって、一言入れておいて。', 'Ừ. Thêm một câu là chiều ngày hai mươi điện thoại khó liên lạc nhé.'],
      ['女', 'わかりました。私物の箱詰めは木曜までですけど、私、水曜と木曜は大阪出張なんです。', 'Vâng. Đồ cá nhân phải đóng thùng trước thứ năm, nhưng thứ tư và thứ năm tôi đi công tác Osaka.'],
      ['男', 'じゃあ、火曜のうちにやっておかないとね。', 'Vậy phải làm xong trong thứ ba rồi.'],
    ],
    questions: [
      [
        '取引先へのお知らせに書くことはどれですか。',
        ['新しい住所とFAX番号、二十日午後の電話のこと', '新しい住所と電話番号', '私物を詰める期限', '大阪出張の予定'],
        0,
        'Địa chỉ và fax mới (điện thoại không đổi), thêm việc chiều ngày 20 khó gọi điện. Lựa chọn 2 sai vì số điện thoại không đổi. Hạn đóng đồ là thông tin nội bộ.',
      ],
      [
        '女の人は、私物の箱詰めをいつしますか。',
        ['木曜日', '水曜日', '火曜日', '金曜日の午後'],
        2,
        'Hạn là thứ năm, nhưng thứ tư và thứ năm cô đi công tác, nên làm trong thứ ba (火曜のうちに). Thứ năm là hạn chót trên giấy.',
      ],
    ],
    points: [
      ['移転', 'いてん', 'chuyển (trụ sở)'],
      ['私物', 'しぶつ', 'đồ dùng cá nhân'],
      ['段ボールに詰める', 'だんぼーるにつめる', 'đóng vào thùng các-tông'],
    ],
  }),
  item('mock1', 'sogo-chodokkai', 2, {
    material: {
      kind: 'table',
      title: '外部研修プログラム',
      head: ['研修', '形式', '時間', '費用（1人）'],
      rows: [
        ['ビジネス文書', 'オンライン', '3時間', '8,000円'],
        ['プレゼンテーション', '会場（大阪）', '1日', '25,000円'],
        ['交渉術', '会場（東京）', '2日', '48,000円'],
        ['ロジカルシンキング', 'オンライン', '6時間', '15,000円'],
      ],
    },
    script: [
      ['女', '今年の部の研修予算は、一人三万円までなんです。', 'Ngân sách đào tạo của phòng năm nay là tối đa ba mươi nghìn yên một người.'],
      ['男', 'そうか。山田さんは来月からお客様への提案が増えるから、人前で話す練習をさせたいんだけど。', 'Vậy à. Từ tháng sau anh Yamada sẽ phải đề xuất cho khách nhiều hơn, nên tôi muốn cho anh ấy luyện nói trước đám đông.'],
      ['女', 'それならプレゼンテーションですね。ただ、会場が大阪なので、交通費もかかりますよ。', 'Vậy là khoá thuyết trình. Có điều địa điểm ở Osaka nên tốn cả tiền đi lại.'],
      ['男', '交通費は研修予算とは別だから大丈夫。残りの予算で、もう一つ受けさせられるかな。', 'Tiền đi lại tính riêng ngoài ngân sách đào tạo, không sao. Với phần ngân sách còn lại, có cho học thêm một khoá được không?'],
      ['女', '残りは五千円ですから…どれも無理ですね。', 'Còn lại năm nghìn yên… khoá nào cũng không đủ.'],
    ],
    questions: [
      [
        '山田さんが受ける研修はどれですか。',
        ['ビジネス文書', 'プレゼンテーション', '交渉術', 'ロジカルシンキング'],
        1,
        'Luyện nói trước đám đông → khoá thuyết trình (25.000 yên, trong ngân sách). Đàm phán vượt ngân sách (48.000 yên).',
      ],
      [
        '研修について、正しいのはどれですか。',
        ['山田さんは二つの研修を受ける', '交通費は研修の予算に含まれる', '交渉術の研修も予算内で受けられる', '予算の残りで受けられる研修はない'],
        3,
        '30.000 − 25.000 = 5.000 yên còn lại, rẻ hơn mọi khoá (rẻ nhất 8.000 yên), nên どれも無理. Tiền đi lại tính riêng (別だから).',
      ],
    ],
    points: [
      ['研修予算', 'けんしゅうよさん', 'ngân sách đào tạo'],
      ['交渉術', 'こうしょうじゅつ', 'kỹ năng đàm phán'],
    ],
  }),
  item('mock1', 'sogo-chodokkai', 3, {
    material: {
      kind: 'text',
      title: '広がる「実質値上げ」',
      body: '国内の食品メーカー各社が、商品の内容量を減らす動きを強めている。価格を据え置いたまま量を減らす、いわゆる「実質値上げ」である。\n調査会社によると、今年上半期に内容量を減らした商品は、前年同期の1.5倍に上った。消費者の間では「気づきにくい値上げだ」との不満も多い。\n一方、あるメーカーの担当者は「値上げをすると売上が大きく落ちるため、量の調整でしのぐしかない」と説明する。',
    },
    script: [
      ['男', 'この記事、うちも他人事じゃないね。', 'Bài báo này, công ty mình cũng không phải chuyện người ngoài đâu.'],
      ['女', 'ええ。うちのクッキーも、来年は一袋の枚数を減らす案が出ていますよね。', 'Vâng. Bánh quy của mình cũng có đề xuất giảm số chiếc trong mỗi túi từ năm sau.'],
      ['男', 'うん。でも、お客様は意外と気づくものだよ。ネットですぐ話題になるし。', 'Ừ. Nhưng khách hàng nhận ra nhanh hơn mình tưởng. Lên mạng là thành chuyện ngay.'],
      ['女', 'じゃあ、正直に値上げしたほうがいいということですか。', 'Vậy ý anh là nên thẳng thắn tăng giá?'],
      ['男', 'いや、そういうことじゃなくて。量を減らすなら、そのぶん個包装にして食べやすくするとか、何か価値をつけないと。ただ減らすだけでは、信頼をなくすよ。', 'Không, không phải vậy. Nếu giảm lượng thì phải thêm giá trị gì đó, như gói riêng từng chiếc cho dễ ăn chẳng hạn. Chỉ giảm không thôi thì mất lòng tin.'],
    ],
    questions: [
      [
        '記事の内容と合うのはどれですか。',
        ['内容量を減らした商品は前年より減った', '消費者は実質値上げに気づいていない', 'メーカーは値上げで売上を伸ばした', '内容量を減らした商品は、前年同期の一・五倍になった'],
        3,
        'Bài viết: 前年同期の1.5倍に上った. Người tiêu dùng có nhận ra và bất mãn ("tăng giá khó nhận ra"), nên lựa chọn 2 sai. Nhà sản xuất nói tăng giá thì doanh thu giảm.',
      ],
      [
        '男の人の考えに最も近いのはどれですか。',
        ['量を減らすなら、別の価値を加えるべきだ', '値上げはするべきではない', '量を減らしても客には気づかれない', 'すぐに値上げをするべきだ'],
        0,
        'Anh bác ý "nên tăng giá" (そういうことじゃなくて) và nói nếu giảm lượng thì phải thêm giá trị. Anh cũng nói khách sẽ nhận ra, nên lựa chọn 3 sai. Anh không bàn có nên tăng giá hay không.',
      ],
    ],
    points: [
      ['内容量', 'ないようりょう', 'khối lượng tịnh, số lượng bên trong'],
      ['実質値上げ', 'じっしつねあげ', 'tăng giá trá hình'],
      ['他人事', 'ひとごと', 'chuyện của người khác'],
      ['しのぐ', 'しのぐ', 'cầm cự, vượt qua'],
    ],
  }),
  item('mock1', 'sogo-chodokkai', 4, {
    material: {
      kind: 'table',
      title: '社員旅行 行き先アンケート結果',
      head: ['行き先', '1位に選んだ人数', '費用（1人）'],
      rows: [
        ['温泉（箱根）', '28人', '25,000円'],
        ['テーマパーク', '35人', '18,000円'],
        ['京都', '22人', '40,000円'],
        ['日帰りバーベキュー', '15人', '8,000円'],
      ],
    },
    script: [
      ['男', 'アンケートではテーマパークが一番だったけど、会社の補助は一人二万円までなんだ。', 'Khảo sát thì công viên giải trí đứng đầu, nhưng công ty chỉ hỗ trợ tối đa hai mươi nghìn yên một người.'],
      ['女', 'テーマパークなら範囲内ですね。', 'Công viên giải trí thì vẫn trong mức đó.'],
      ['男', 'ただ、子ども連れでもいいかって質問がかなり来ていてね。家族も参加できるようにすると、テーマパークはチケット代が家族の分もかかるから、自己負担が大きくなる。', 'Có điều nhiều người hỏi có được dẫn con theo không. Nếu cho cả gia đình tham gia thì công viên giải trí phải mua vé cho cả nhà, phần tự trả sẽ lớn.'],
      ['女', 'じゃあ、二番目の温泉は？', 'Vậy suối nước nóng, lựa chọn thứ hai thì sao?'],
      ['男', '温泉は補助を超えるし…。いっそ、家族も参加しやすくて安い、一番下のにしようか。', 'Suối nước nóng thì vượt mức hỗ trợ… Hay là chọn luôn cái cuối bảng, rẻ mà cả nhà dễ tham gia.'],
      ['女', '人気は一番低いですけどね。', 'Nhưng nó ít người chọn nhất đấy.'],
      ['男', 'まあ、家族が来られるなら喜ぶ人は多いと思うよ。それで決めよう。', 'Thôi, được dẫn gia đình theo thì nhiều người sẽ vui. Quyết vậy đi.'],
    ],
    questions: [
      [
        '行き先はどこになりましたか。',
        ['温泉（箱根）', 'テーマパーク', '日帰りバーベキュー', '京都'],
        2,
        '"Cái cuối bảng" (一番下の) là tiệc nướng đi về trong ngày, 8.000 yên. Công viên giải trí bị loại vì gia đình phải tự trả nhiều, suối nước nóng vượt mức hỗ trợ.',
      ],
      [
        '男の人がテーマパークをやめた理由は何ですか。',
        ['会社の補助を超えるから', '家族が参加すると、自己負担が大きくなるから', '人気が低いから', '子どもが参加できないから'],
        1,
        'Công viên giải trí 18.000 yên nằm trong mức hỗ trợ, nên lựa chọn 1 sai; đó là lý do loại suối nước nóng. Lý do thật là nếu gia đình đi theo thì phải mua vé cho cả nhà.',
      ],
    ],
    points: [
      ['補助', 'ほじょ', 'hỗ trợ (tiền)'],
      ['子ども連れ', 'こどもづれ', 'dẫn theo con'],
      ['いっそ', 'いっそ', 'thà, hay là cứ'],
    ],
  }),
  item('mock1', 'sogo-chodokkai', 5, {
    material: {
      kind: 'text',
      title: '【注意】不審なメールについて',
      body: '【注意】不審なメールについて\n\n最近、取引先を装ったメールが社内に届いています。次のような特徴があります。\n・件名に「至急」「請求書」などと書かれている\n・差出人のアドレスが、取引先の正式なものと一文字だけ違う\n・添付ファイルが圧縮（zip）形式になっている\n\n不審なメールを受け取った場合は、開かずに情報システム部（内線500）へ転送してください。',
    },
    script: [
      ['女', 'このメール、北斗運輸の石田さんからなんですけど、件名が「至急：請求書のご確認」ってなってて。', 'Email này của anh Ishida bên Vận tải Hokuto, mà tiêu đề là "Khẩn: Xác nhận hoá đơn".'],
      ['男', '添付は？', 'Có đính kèm không?'],
      ['女', 'zipファイルです。アドレスも…あ、いつもの「hokuto」が「hokutto」になってます。', 'Tệp zip ạ. Địa chỉ cũng… À, "hokuto" mọi khi thành "hokutto" rồi.'],
      ['男', 'それは怪しいね。開いてないよね？', 'Vậy là đáng ngờ rồi. Em chưa mở chứ?'],
      ['女', 'はい、まだです。', 'Vâng, chưa ạ.'],
      ['男', 'じゃあ、決まりどおりにして。それから念のため、石田さんにも電話で確認しておいたほうがいいね。ちょうど本当に請求書が来る時期だから。', 'Vậy làm đúng theo quy định. Rồi để cho chắc, gọi điện hỏi anh Ishida luôn. Đúng là đang đến kỳ hoá đơn thật mà.'],
    ],
    questions: [
      [
        '女の人はこのメールをどうしますか。',
        ['情報システム部に転送する', '添付ファイルを開いて確認する', 'すぐに削除する', '石田さんに返信する'],
        0,
        '決まりどおりにして = làm theo thông báo: không mở, chuyển cho phòng hệ thống thông tin. Email khớp cả ba dấu hiệu. Xoá hay trả lời email đều không phải điều quy định yêu cầu.',
      ],
      [
        '女の人が石田さんに電話するのはなぜですか。',
        ['添付ファイルの開き方を聞くため', '本当に請求書を送ったかどうか確かめるため', '正しいメールアドレスを教えてもらうため', '請求書の金額を確認するため'],
        1,
        'Đang đúng kỳ có hoá đơn thật, nên cần hỏi xem anh Ishida có thật sự gửi hoá đơn không. Gọi điện chứ không trả lời email, vì email có thể là giả.',
      ],
    ],
    points: [
      ['不審な', 'ふしんな', 'đáng ngờ'],
      ['装う', 'よそおう', 'giả dạng, mạo danh'],
      ['転送する', 'てんそうする', 'chuyển tiếp (email)'],
      ['怪しい', 'あやしい', 'đáng nghi'],
    ],
  }),
];

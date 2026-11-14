import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/** Week 5 — numbers, charts and trends (reading). Level: J1. */
export const W05: BjtItem[] = [
  item('w05', 'goi', 1, {
    questions: [
      [
        '今期の売上高は、前年同期を5％＿＿＿結果となった。',
        ['上回る', '上昇する', '増加する', '超過する'],
        0,
        'Câu 1 đúng: AをX％上回る = cao hơn A X%, nhận tân ngữ là mốc so sánh (前年同期を). Câu 2 và 3 là tự động từ, không đi với 前年同期を theo nghĩa so sánh (phải nói 前年同期比5％上昇/増加). Câu 4 超過 dễ nhầm vì cũng nhận を, nhưng chỉ dùng khi vượt một giới hạn (予算を超過する, 定員を超過する), không dùng cho mốc năm trước.',
      ],
    ],
    points: [
      ['上回る', 'うわまわる', 'vượt, cao hơn (mốc so sánh)'],
      ['前年同期', 'ぜんねんどうき', 'cùng kỳ năm trước'],
      ['超過する', 'ちょうかする', 'vượt quá (giới hạn)'],
    ],
  }),
  item('w05', 'goi', 2, {
    questions: [
      [
        '原材料費の高騰を受け、4月から製品価格を一律3％＿＿＿ことになりました。',
        ['引き上がる', '引き上げる', '値上がりする', '上向く'],
        1,
        'Có tân ngữ 製品価格を và công ty là người quyết định, nên cần tha động từ 引き上げる (nâng giá). Câu 1 引き上がる không tồn tại như tự động từ chuẩn. Câu 3 値上がりする dễ nhầm vì cùng nghĩa "lên giá" nhưng là tự động từ (価格が値上がりする), không nhận を. Câu 4 上向く là xu hướng khởi sắc, cũng là tự động từ.',
      ],
    ],
    points: [
      ['高騰', 'こうとう', 'tăng vọt (giá)'],
      ['一律', 'いちりつ', 'đồng loạt, như nhau'],
      ['引き上げる', 'ひきあげる', 'nâng lên (giá, mức)'],
    ],
  }),
  item('w05', 'goi', 3, {
    questions: [
      [
        '売上は第3四半期に底を＿＿＿、その後は回復に転じた。',
        ['突き', '割り', '打ち', '抜け'],
        2,
        'Câu 3 đúng: 底を打つ = chạm đáy rồi bật lên, đi liền với 回復に転じた. Câu 1 底を突く dễ nhầm vì cũng là thành ngữ, nhưng nghĩa là cạn sạch (資金が底を突く), không hàm ý hồi phục. 底を割る là thủng đáy, giảm sâu hơn nữa; 底を抜ける không phải cách nói cố định.',
      ],
    ],
    points: [
      ['底を打つ', 'そこをうつ', 'chạm đáy (rồi hồi lại)'],
      ['回復に転じる', 'かいふくにてんじる', 'chuyển sang hồi phục'],
      ['四半期', 'しはんき', 'quý (ba tháng)'],
    ],
  }),
  item('w05', 'goi', 4, {
    questions: [
      [
        '今月の受注件数は前年比20％増と好調だった＿＿＿、利益率は目標に届かなかった。',
        ['ばかりか', 'どころか', 'につき', 'ものの'],
        3,
        'Hai vế trái chiều (đơn hàng tốt / lợi nhuận không đạt) nên cần ものの = tuy… nhưng. Câu 1 ばかりか dễ nhầm, nhưng nó nối hai ý cùng chiều (không chỉ… mà còn…). Câu 2 どころか phủ định vế trước (đâu phải tốt, mà còn…), trái với 好調だった. Câu 3 につき = vì, nêu lý do, không hợp nghĩa.',
      ],
    ],
    points: [
      ['受注件数', 'じゅちゅうけんすう', 'số đơn hàng nhận được'],
      ['利益率', 'りえきりつ', 'tỉ suất lợi nhuận'],
    ],
  }),
  item('w05', 'goi', 5, {
    questions: [
      [
        '為替変動の影響を＿＿＿と、実質的な増収率は2％程度にとどまる。',
        ['除く', '含む', '招く', '抑える'],
        0,
        '実質的な (thực chất) cho thấy con số đã loại ảnh hưởng tỉ giá ra, nên chọn câu 1 除く. Câu 2 含む dễ nhầm vì cũng đi với 影響を, nhưng tính cả tỉ giá vào thì không còn là số "thực chất". 招く = gây ra, 抑える = kìm lại: cả hai nói về hành động tác động lên ảnh hưởng, không phải cách tính.',
      ],
    ],
    points: [
      ['為替変動', 'かわせへんどう', 'biến động tỉ giá'],
      ['増収率', 'ぞうしゅうりつ', 'tỉ lệ tăng doanh thu'],
      ['にとどまる', 'にとどまる', 'chỉ dừng ở mức'],
    ],
  }),
  item('w05', 'goi', 6, {
    questions: [
      [
        '前回の会議でお示しした数値に誤りがございましたので、下記のとおり＿＿＿いたします。',
        ['改正', '是正', '訂正', '修繕'],
        2,
        'Sửa một chỗ sai trong số liệu, văn bản là 訂正 (câu 3). Câu 2 是正 dễ nhầm vì cũng là "sửa cho đúng", nhưng dùng cho một tình trạng xấu kéo dài (格差の是正, 長時間労働の是正), không cho một con số ghi sai. 改正 là sửa luật, quy định; 修繕 là sửa chữa nhà cửa, thiết bị.',
      ],
    ],
    points: [
      ['訂正', 'ていせい', 'đính chính, sửa chỗ sai'],
      ['是正', 'ぜせい', 'chấn chỉnh (tình trạng)'],
      ['下記のとおり', 'かきのとおり', 'như dưới đây'],
    ],
  }),
  item('w05', 'hyogen', 1, {
    material: { kind: 'text', body: '（取引先での説明で）それでは、お手元の資料の3ページ、過去5年の売上推移のグラフを＿＿＿。' },
    questions: [
      [
        '空欄に入る最も適当な表現はどれですか。',
        ['拝見してください', 'お目にかけてください', 'ご覧ください', 'ご覧してください'],
        2,
        'Đáp án là lựa chọn 3. Người xem là khách, nên dùng tôn kính ngữ ご覧ください. Lựa chọn 4 dễ nhầm nhất vì có ご覧, nhưng ご覧する không tồn tại (ご覧 chỉ đi với になる hoặc ください). Lựa chọn 1 dùng khiêm nhường 拝見 cho hành động của khách; lựa chọn 2 nghĩa là "cho xem", ngược hướng.',
      ],
    ],
    points: [
      ['お手元', 'おてもと', 'trong tay (quý vị)'],
      ['推移', 'すいい', 'diễn biến, sự thay đổi theo thời gian'],
      ['ご覧ください', 'ごらんください', 'xin mời xem'],
    ],
  }),
  item('w05', 'hyogen', 2, {
    material: { kind: 'text', body: '（取引先の担当者への電話で）恐れ入りますが、御社の昨年度の地域別販売実績を＿＿＿。' },
    questions: [
      [
        '空欄に入る最も適当な表現はどれですか。',
        ['お教えしていただけますか', '教えてさしあげますか', 'お教えになられますか', 'お教えいただけますか'],
        3,
        'Đáp án là lựa chọn 4. Mình nhận thông tin từ khách nên dùng mẫu お + động từ + いただけますか. Lựa chọn 1 dễ nhầm nhất vì nghe rất lễ phép, nhưng お教えする là khiêm nhường ngữ (mình dạy), ghép với ていただく thành sai chủ thể. Lựa chọn 2 nghĩa là mình chỉ cho khách, lựa chọn 3 là kính ngữ kép.',
      ],
    ],
    points: [
      ['御社', 'おんしゃ', 'quý công ty (khi nói)'],
      ['販売実績', 'はんばいじっせき', 'kết quả bán hàng thực tế'],
    ],
  }),
  item('w05', 'hyogen', 3, {
    material: { kind: 'text', body: 'A（部長）：今月の受注件数、もう集計できた？\nB：申し訳ありません。まだ集計中でして、本日中には＿＿＿。' },
    questions: [
      [
        '空欄に入る最も適当な表現はどれですか。',
        ['ご報告いたします', 'ご報告なさいます', 'ご報告いただきます', 'ご報告くださいます'],
        0,
        'Đáp án là lựa chọn 1. Người báo cáo là B, nói với trưởng bộ phận về việc mình sẽ làm, nên dùng khiêm nhường ご報告いたします. Lựa chọn 3 dễ nhầm nhất vì いただく hay dùng với cấp trên, nhưng ご報告いただきます nghĩa là trưởng bộ phận báo cáo cho mình. Lựa chọn 2 và 4 là tôn kính ngữ cho hành động của chính mình.',
      ],
    ],
    points: [
      ['受注', 'じゅちゅう', 'nhận đơn đặt hàng'],
      ['集計', 'しゅうけい', 'tổng hợp số liệu'],
    ],
  }),
  item('w05', 'sogo-dokkai', 1, {
    material: {
      kind: 'text',
      title: '11月度 新商品「もちもち米粉パン」販売状況',
      body: '店舗運営部各位\n\n11月度の販売状況を下記のとおり報告します。発売3週目から、駅前店と郊外店で売れ行きに大きな差が出ています。\n\n記\n・全店合計　4,800個（目標5,000個、達成率96％）\n・駅前店　2,100個（目標1,500個）\n・郊外店　1,200個（目標2,000個）\n・その他3店　各500個（目標各500個）\n※郊外店では12月から週2回の試食販売を行い、その結果を見て目標を見直します。\n\n商品企画課　森田',
    },
    questions: [
      [
        '目標に届かなかった店舗の販売数は、その店の目標の何割でしたか。',
        ['4割', '6割', '9割', '7割'],
        1,
        'Đáp án là lựa chọn 2. Chỉ có cửa hàng ngoại ô (郊外店) không đạt mục tiêu: bán 1.200 trên mục tiêu 2.000 cái, tức 6 phần 10. Lựa chọn 1 dễ nhầm nhất vì 4割 là phần còn thiếu (800/2.000), không phải phần đã bán. Lựa chọn 3 là tỉ lệ đạt của toàn chuỗi (96%), không phải của một cửa hàng.',
      ],
    ],
    points: [
      ['達成率', 'たっせいりつ', 'tỉ lệ đạt (mục tiêu)'],
      ['郊外', 'こうがい', 'ngoại ô'],
      ['売れ行き', 'うれゆき', 'tình hình bán chạy hay không'],
      ['試食', 'ししょく', 'ăn thử'],
    ],
  }),
  item('w05', 'sogo-dokkai', 2, {
    material: {
      kind: 'text',
      title: '来期の販売見込みについてのお願い',
      body: '各支店長\n\nお疲れさまです。経営企画部の上田です。\n2027年度の予算編成にあたり、各支店の販売見込みを集計しています。お手数ですが、添付の様式に主要商品10品目の月別販売見込み数を入力し、ご返信ください。\n今年度の実績は、様式にあらかじめ入力してあります。見込みが実績から2割以上増減する品目は、その理由を備考欄にお書き添えください。\n締め切りは12月18日（金）です。',
    },
    questions: [
      [
        'このメールの主な目的は何ですか。',
        ['来期の販売見込み数を出してほしいと頼む', '今年度の販売実績を入力してほしいと頼む', '来期の予算が2割増えることを知らせる', '実績が2割減った理由を説明してもらう'],
        0,
        'Đáp án là lựa chọn 1. Phòng kế hoạch đang lập ngân sách năm 2027 nên nhờ các chi nhánh nhập số bán dự kiến theo tháng của 10 mặt hàng chính. Lựa chọn 2 dễ nhầm nhất vì 実績 có trong thư, nhưng số thực tế năm nay đã được nhập sẵn (あらかじめ入力してあります). Con số 2割 chỉ là mốc phải ghi lý do, không phải mức tăng ngân sách.',
      ],
    ],
    points: [
      ['予算編成', 'よさんへんせい', 'lập ngân sách'],
      ['見込み', 'みこみ', 'dự kiến, ước tính'],
      ['様式', 'ようしき', 'mẫu biểu'],
      ['備考欄', 'びこうらん', 'cột ghi chú'],
    ],
  }),
  item('w05', 'sogo-dokkai', 3, {
    material: {
      kind: 'text',
      title: '最小発注数の変更について',
      body: '株式会社ベルフーズ\n商品部　和田様\n\n拝啓　時下ますますご清祥のこととお慶び申し上げます。\nさて、先日ご依頼いただきました容器の最小発注数を5,000個から2,000個に引き下げる件につき、社内で検討いたしました。誠に恐縮ながら、成形機の切り替えにかかる費用の関係上、ご要望にはお応えいたしかねます。\nつきましては、5,000個のご発注を2,500個ずつ2回に分けて納品する方法をご提案いたします。ご希望の場合は、12月25日（金）までに担当の村上までご連絡ください。\n敬具\n\nアオイ工業株式会社　営業部',
    },
    questions: [
      [
        '分割納品を希望する場合、和田さんは何をしなければなりませんか。',
        ['2,000個ずつ、2回に分けて発注する', '1月中に、新しい発注書を村上さんに送る', '成形機の切り替え費用の負担を申し出る', '12月25日までに、村上さんに連絡する'],
        3,
        'Đáp án là lựa chọn 4. Câu cuối: nếu muốn giao chia làm hai lần thì liên hệ Murakami trước 25/12/2026. Lựa chọn 1 dễ nhầm nhất vì 2.000 cái là con số Wada đã đề nghị và bị từ chối; cách được đề xuất là đặt 5.000 cái, giao 2.500 cái mỗi lần. Thư không yêu cầu gửi đơn mới hay chịu chi phí đổi khuôn máy.',
      ],
    ],
    points: [
      ['最小発注数', 'さいしょうはっちゅうすう', 'số lượng đặt hàng tối thiểu'],
      ['成形機', 'せいけいき', 'máy ép khuôn'],
      ['お応えいたしかねます', 'おこたえいたしかねます', 'chúng tôi khó đáp ứng được'],
    ],
  }),
  item('w05', 'sogo-dokkai', 4, {
    material: {
      kind: 'text',
      title: '社員旅行のご案内',
      body: '社員各位\n\n親睦会事務局\n\n今年度の社員旅行を下記のとおり行います。参加を希望する方は、2027年1月15日（金）までに事務局へお申し込みください。\n\n記\n行き先　箱根（1泊2日）\n日程　2027年2月20日（土）～21日（日）\n費用　1人30,000円（うち会社補助20,000円）\n家族の同伴　1名まで可。費用は1名25,000円で、会社補助の対象外です。\n※自己負担分は、2月分の給与から差し引きます。',
    },
    questions: [
      [
        '社員が家族1名と参加する場合、給与から差し引かれる金額は合計いくらですか。',
        ['25,000円', '55,000円', '35,000円', '45,000円'],
        2,
        'Đáp án là lựa chọn 3. Phần nhân viên tự trả là 30.000 − 20.000 (công ty hỗ trợ) = 10.000 yên; người nhà không được hỗ trợ nên trả đủ 25.000 yên; cộng lại 35.000 yên. Lựa chọn 2 dễ nhầm nhất vì cộng thẳng 30.000 + 25.000 mà quên trừ khoản hỗ trợ. Lựa chọn 1 chỉ tính phần của người nhà.',
      ],
    ],
    points: [
      ['親睦会', 'しんぼくかい', 'hội giao lưu nội bộ'],
      ['同伴', 'どうはん', 'đi cùng'],
      ['補助', 'ほじょ', 'hỗ trợ (tiền)'],
      ['自己負担', 'じこふたん', 'tự chi trả'],
    ],
  }),
];

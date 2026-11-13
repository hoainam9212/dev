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
    material: {
      kind: 'text',
      body: '営業部の皆様\n\nお疲れさまです。経営企画部の三浦です。\n先ほどお送りした「10月度 支店別実績」の3ページ目、大阪支店の前月比に誤りがございました。正しくは「8％減」ではなく「8％増」です。\n差し替え版を添付いたしますので、お手数ですが旧版は破棄していただけますでしょうか。\nなお、3ページ目以外に変更はございません。\nご迷惑をおかけし、申し訳ございません。',
    },
    questions: [
      [
        'このメールを受け取った人は何をすればいいですか。',
        ['3ページ目だけを印刷し直して差し込む', '旧版を捨てて、添付された新しい資料を使う', '大阪支店に正しい数値を問い合わせる', '全ページを見直して、ほかの誤りを報告する'],
        1,
        'Thư nhờ 旧版は破棄して (bỏ bản cũ) và gửi kèm 差し替え版 (bản thay thế), nên đáp án là câu 2. Câu 1 dễ nhầm vì lỗi chỉ nằm ở trang 3, nhưng thư gửi lại cả tài liệu và không bảo in riêng trang đó. Câu 4 trái với なお、3ページ目以外に変更はございません.',
      ],
    ],
    points: [
      ['差し替え', 'さしかえ', 'thay thế (bản mới)'],
      ['破棄する', 'はきする', 'huỷ bỏ, vứt đi'],
      ['前月比', 'ぜんげつひ', 'so với tháng trước'],
    ],
  }),
  item('w05', 'hyogen', 2, {
    material: {
      kind: 'text',
      title: 'カラー印刷の削減について',
      body: '社員各位\n\n社内のカラー印刷枚数が、前年同期比で約3割増加しています。\nつきましては、今月より、社内向けの資料は原則として白黒で印刷してください。\nただし、グラフなど色分けがないと内容が伝わりにくい資料については、この限りではありません。\n社外向けの資料は、従来どおりの扱いとします。\n\n総務部',
    },
    questions: [
      [
        'この通知の内容に合うものはどれですか。',
        ['今月から、カラー印刷は一切できなくなる', '社外向けの資料も白黒で印刷しなければならない', '色分けが必要なグラフを含む資料は、カラーで印刷してよい', '印刷枚数を前年より3割減らさなければならない'],
        2,
        'Sau ただし là ngoại lệ: tài liệu cần màu để hiểu (như biểu đồ) thì この限りではありません = không áp dụng quy định in đen trắng → câu 3. Câu 1 bỏ qua ngoại lệ đó và cả chữ 原則として. Câu 4 dễ nhầm vì có con số 3割, nhưng đó là mức tăng của năm nay, không phải chỉ tiêu cắt giảm. Tài liệu gửi ra ngoài giữ như cũ nên câu 2 sai.',
      ],
    ],
    points: [
      ['原則として', 'げんそくとして', 'về nguyên tắc'],
      ['この限りではない', 'このかぎりではない', 'không áp dụng (ngoại lệ)'],
      ['従来どおり', 'じゅうらいどおり', 'như trước nay'],
    ],
  }),
  item('w05', 'hyogen', 3, {
    material: {
      kind: 'text',
      body: '各支店長 殿\n\n第3四半期の実績報告について、下記のとおりお願いいたします。\n\n提出物：支店別実績表（所定の様式）\n提出期限：11月20日（金）\n提出先：経営企画部 三浦\n\n数値が確定していない項目については、見込み値の記入で構いません。その場合は、見込み値である旨を備考欄に明記してください。確定値は、12月の月次報告の際にあわせてご報告いただければ結構です。',
    },
    questions: [
      [
        '数値がまだ確定していない項目は、どうすればいいですか。',
        ['見込み値を記入し、見込みであることを備考欄に書く', '数値が確定するまで、実績表の提出を待つ', 'その項目を空欄にしたまま提出する', '見込み値を記入し、確定したら実績表をすぐ出し直す'],
        0,
        'Thư cho phép ghi số dự kiến (見込み値の記入で構いません) và yêu cầu ghi rõ điều đó ở cột ghi chú → câu 1. Câu 4 dễ nhầm: số chính thức đúng là phải báo sau, nhưng báo kèm trong báo cáo tháng 12, không phải nộp lại bảng ngay khi có số.',
      ],
    ],
    points: [
      ['見込み値', 'みこみち', 'số dự kiến, ước tính'],
      ['確定値', 'かくていち', 'số chính thức'],
      ['備考欄', 'びこうらん', 'cột ghi chú'],
      ['旨', 'むね', 'nội dung, ý (là…)'],
    ],
  }),
  item('w05', 'sogo-dokkai', 1, {
    material: {
      kind: 'text',
      title: '清流工業、上半期は増収減益',
      body: '浄水器メーカーの清流工業（本社・静岡市）が発表した今年度上半期の決算は、売上高が前年同期比12％増の84億円と過去最高を更新した一方、営業利益は同18％減の5億円にとどまった。主力の据え置き型浄水器が新興国向けに伸びたものの、樹脂部品などの原材料価格の上昇分を販売価格に転嫁しきれなかったことが響いた。また、来春稼働予定の新工場の立ち上げ費用として、約1億円を計上した。\n同社は10月出荷分から、国内向け製品の価格を平均5％引き上げており、下半期は利益率の改善を見込む。ただし、新興国向けについては競合他社との価格競争が激しいことから、現行価格を据え置く方針だ。通期の業績見通しは、売上高を170億円で据え置く一方、営業利益は期初の14億円から12億円に下方修正した。',
    },
    questions: [
      [
        '上半期に営業利益が減った理由として、本文に合うものはどれですか。',
        ['新興国向けの販売が伸びなかったから', '原材料の値上がり分を価格に十分反映できず、新工場の準備費用もかかったから', '国内向け製品の価格を引き上げたから', '競合他社との価格競争で、販売価格を下げたから'],
        1,
        'Hai nguyên nhân nêu trong bài: 転嫁しきれなかった (không chuyển hết phần tăng chi phí vào giá bán) và chi phí khởi động nhà máy mới 1 tỉ yên → câu 2. Câu 1 ngược với bài (bán sang nước mới nổi tăng). Câu 4 dễ nhầm vì bài có nhắc cạnh tranh giá, nhưng đó là lý do giữ nguyên giá ở nửa sau năm, không phải lý do lợi nhuận giảm. Câu 3 là việc làm từ tháng 10, để cải thiện lợi nhuận.',
      ],
      [
        '清流工業の今後の方針について、正しいものはどれですか。',
        ['国内向け、新興国向けともに価格を5％引き上げる', '通期の売上高と営業利益の見通しを、ともに引き下げた', '新興国向けは価格を変えず、国内向けの値上げで利益率の改善を図る', '新工場の稼働を延期して、費用を抑える'],
        2,
        'Tăng giá 5% chỉ áp cho hàng trong nước; hàng sang nước mới nổi 現行価格を据え置く (giữ nguyên giá) → câu 3. Câu 2 dễ nhầm: chỉ lợi nhuận bị 下方修正 (từ 14 xuống 12 tỉ), còn doanh thu 170 tỉ được 据え置く. Bài không nói hoãn nhà máy mới.',
      ],
    ],
    points: [
      ['転嫁する', 'てんかする', 'chuyển (chi phí) sang giá bán'],
      ['据え置く', 'すえおく', 'giữ nguyên'],
      ['下方修正', 'かほうしゅうせい', 'điều chỉnh giảm (dự báo)'],
      ['計上する', 'けいじょうする', 'ghi vào sổ, hạch toán'],
    ],
  }),
  item('w05', 'sogo-dokkai', 2, {
    material: {
      kind: 'text',
      title: '「夏の買い替え応援フェア」結果報告',
      body: '店舗運営部各位\n\n上期に実施した「夏の買い替え応援フェア」の結果をご報告します。\nフェア期間中の来店客数は前年同期比15％増と、目標（10％増）を上回りました。一方、成約率は前年の32％から27％に低下しました。一件当たりの成約単価は前年並みでした。\n来店客アンケートでは、「来店したが、希望の機種の在庫がなかった」という回答が全体の4割を占めています。\n以上を踏まえ、下期のフェアでは、集客のための広告費を前年比で2割削減し、その分を人気機種の在庫確保に充てます。なお、フェアの期間は上期と同じ6週間とします。\n\n販売企画部 水野',
    },
    questions: [
      [
        '上期のフェアについて、正しいものはどれですか。',
        ['来店客数も成約率も、前年を上回った', '来店客数が目標に届かず、成約率も下がった', '来店客数は増えたが、一件当たりの成約単価が下がった', '来店客数は目標を上回ったが、成約率は前年を下回った'],
        3,
        'Khách đến +15%, vượt mục tiêu 10%; tỉ lệ chốt đơn giảm từ 32% xuống 27% → câu 4. Câu 3 dễ nhầm vì đúng nửa đầu, nhưng đơn giá mỗi hợp đồng 前年並み (ngang năm trước), không giảm. Câu 1 sai ở tỉ lệ chốt đơn, câu 2 sai ở số khách.',
      ],
      [
        '下期のフェアで、上期から変わる点はどれですか。',
        ['広告費を減らし、人気機種の在庫を増やす', 'フェアの期間を6週間に延ばす', '広告費を増やして、来店客数をさらに伸ばす', '在庫のない機種は取り扱わないことにする'],
        0,
        'Thay đổi duy nhất: cắt 20% quảng cáo, dồn tiền đó vào giữ hàng các mẫu bán chạy (在庫確保に充てます) → câu 1. Câu 2 dễ nhầm vì có con số 6 tuần, nhưng câu sau なお nói thời gian vẫn như nửa đầu năm, không đổi. Câu 3 ngược chiều.',
      ],
    ],
    points: [
      ['成約率', 'せいやくりつ', 'tỉ lệ chốt hợp đồng'],
      ['前年並み', 'ぜんねんなみ', 'ngang năm trước'],
      ['充てる', 'あてる', 'dành (tiền, thời gian) cho'],
      ['踏まえる', 'ふまえる', 'dựa trên, căn cứ vào'],
    ],
  }),
];

import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/** Week 13 — economy and company news (reading). Level: J1, seven questions J1+. */
export const W13: BjtItem[] = [
  item('w13', 'goi', 1, {
    questions: [
      [
        '原材料費の高騰を受け、同社は主力製品の値上げに＿＿＿。',
        ['乗り切った', '踏み切った', '踏み外した', '打ち切った'],
        1,
        'Lựa chọn 2: Nに踏み切る = dứt khoát quyết định làm N sau khi cân nhắc (値上げに踏み切る, 導入に踏み切る). Lựa chọn 4 dễ nhầm vì cũng là động từ ghép với 切る, nhưng 打ち切る là "chấm dứt" và cần を (交渉を打ち切る), không đi với に. 乗り切る là vượt qua khó khăn (危機を乗り切る), 踏み外す là trượt chân, lạc lối.',
      ],
    ],
    points: [
      ['踏み切る', 'ふみきる', 'dứt khoát quyết định làm'],
      ['高騰', 'こうとう', 'tăng vọt (giá)'],
    ],
  }),
  item('w13', 'goi', 2, {
    questions: [
      [
        '円安が＿＿＿、自動車や電子部品などの輸出企業の業績は軒並み改善した。',
        ['逆風となり', '歯止めとなり', '追い風となり', '向かい風を受け'],
        2,
        'Lựa chọn 3: đồng yên yếu giúp hàng xuất khẩu rẻ hơn, nên là "gió xuôi" (追い風) và dẫn tới kết quả 業績は軒並み改善した. Lựa chọn 1 dễ nhầm vì cùng là ẩn dụ gió, nhưng 逆風 là gió ngược, trái với kết quả "cải thiện". 歯止め là cái phanh chặn một xu hướng, cũng không hợp với việc lợi nhuận tăng.',
      ],
    ],
    points: [
      ['追い風', 'おいかぜ', 'gió xuôi, yếu tố thuận lợi'],
      ['軒並み', 'のきなみ', 'đồng loạt, hầu như tất cả'],
      ['円安', 'えんやす', 'đồng yên yếu'],
    ],
  }),
  item('w13', 'goi', 3, {
    questions: [
      [
        '需要の回復が見込めないことから、新工場の建設は当面＿＿＿こととなった。',
        ['見逃される', '見落とされる', '見過ごされる', '見送られる'],
        3,
        'Lựa chọn 4: 見送る = tạm gác lại, chưa thực hiện; 当面見送られる = trước mắt bị hoãn lại. Ba lựa chọn còn lại đều là "bỏ sót, làm ngơ" (không nhìn thấy hoặc thấy mà bỏ qua), không phải một quyết định của công ty. Lựa chọn 3 dễ nhầm nhất vì 見過ごす cũng có nghĩa "để trôi qua", nhưng nó nói về lỗi hay vấn đề bị bỏ qua.',
      ],
    ],
    points: [
      ['見送る', 'みおくる', 'gác lại, hoãn'],
      ['当面', 'とうめん', 'trước mắt, tạm thời'],
    ],
  }),
  item('w13', 'goi', 4, {
    questions: [
      [
        '上半期の売上高は前年同期比わずか2％増に＿＿＿、市場の予想を下回った。',
        ['とどまり', '上り', '達し', '及び'],
        0,
        'Lựa chọn 1: Nにとどまる = chỉ dừng ở mức N, nhấn mạnh con số nhỏ, khớp với わずか và với 予想を下回った. Lựa chọn 3 dễ nhầm vì về ngữ pháp vẫn ghép được, nhưng 達する, 上る, 及ぶ đều nhấn con số lớn đạt tới, mâu thuẫn với わずか (chỉ có) trong cùng câu.',
      ],
    ],
    points: [
      ['にとどまる', 'にとどまる', 'chỉ dừng ở mức'],
      ['前年同期比', 'ぜんねんどうきひ', 'so với cùng kỳ năm trước'],
      ['下回る', 'したまわる', 'thấp hơn'],
    ],
  }),
  item('w13', 'goi', 5, {
    questions: [
      [
        '三期連続の赤字となった業績不振の＿＿＿を取り、社長が辞任を表明した。',
        ['責務', '責任', '職責', '重責'],
        1,
        'Lựa chọn 2: 責任を取る = chịu trách nhiệm (thường bằng cách từ chức), là cụm cố định. Lựa chọn 4 dễ nhầm vì 重責 cũng là trách nhiệm, nhưng nó đi với 担う (gánh vác trọng trách), không đi với 取る. 責務を果たす và 職責を全うする cũng là những cụm khác.',
      ],
    ],
    points: [
      ['責任を取る', 'せきにんをとる', 'chịu trách nhiệm'],
      ['表明する', 'ひょうめいする', 'tuyên bố, bày tỏ'],
      ['業績不振', 'ぎょうせきふしん', 'kết quả kinh doanh kém'],
    ],
  }),
  item('w13', 'goi', 6, {
    questions: [
      [
        '国内市場が＿＿＿中、同業他社との経営統合は、生き残りのための苦肉の策といえる。',
        ['右肩上がりを続ける', '活況を呈する', '縮小の一途をたどる', '拡大に転じる'],
        2,
        'Lựa chọn 3: 一途をたどる = cứ thế đi theo một chiều (thường là chiều xấu); thị trường co lại mãi nên mới phải sáp nhập để sống còn (生き残り, 苦肉の策). Lựa chọn 4 dễ nhầm vì 転じる hay gặp trong tin kinh tế, nhưng thị trường chuyển sang mở rộng thì không cần đến "kế sách bất đắc dĩ". 右肩上がり và 活況を呈する cũng là tín hiệu tốt.',
      ],
    ],
    points: [
      ['一途をたどる', 'いっとをたどる', 'cứ thế (xấu đi) theo một chiều'],
      ['苦肉の策', 'くにくのさく', 'kế sách bất đắc dĩ'],
      ['経営統合', 'けいえいとうごう', 'hợp nhất kinh doanh'],
    ],
  }),
  item('w13', 'hyogen', 1, {
    material: {
      kind: 'text',
      title: '業績予想の修正に関するお知らせ',
      body: '2027年2月10日\n株式会社ミナミ化成\n\n当社は、2026年5月に公表した2027年3月期の通期業績予想を、下記のとおり修正いたします。\n売上高：前回予想 1,500億円 → 今回予想 1,560億円\n営業利益：前回予想 120億円 → 今回予想 90億円\n修正の理由：自動車向け樹脂の販売数量が想定を上回り、売上高は前回予想を上回る見込みです。一方、原料であるナフサの価格が想定以上に上昇し、製品価格への転嫁が追いつかなかったことから、営業利益は前回予想を下回る見込みとなりました。',
    },
    questions: [
      [
        'この発表の内容と合っているものはどれですか。',
        ['販売が想定を下回ったため、売上高も営業利益も予想より減る', '売上高は予想より増えるが、営業利益は予想より30億円少なくなる', '原料の価格が下がったため、営業利益は予想より30億円増える', '製品の値上げが進んだため、売上高が予想より60億円増える'],
        1,
        'Lựa chọn 2: doanh thu tăng từ 1.500 lên 1.560 tỷ yên, còn lợi nhuận kinh doanh giảm từ 120 xuống 90, tức ít hơn dự báo 30 tỷ. Lựa chọn 4 dễ nhầm vì con số 60 tỷ đúng, nhưng lý do sai: doanh thu tăng nhờ bán được nhiều hơn (販売数量), còn việc đẩy giá nguyên liệu vào giá bán lại 追いつかなかった (không theo kịp). Giá nguyên liệu tăng chứ không giảm, nên lựa chọn 3 sai.',
      ],
    ],
    points: [
      ['通期', 'つうき', 'cả năm tài chính'],
      ['転嫁', 'てんか', 'đẩy (chi phí) sang giá bán'],
      ['追いつかない', 'おいつかない', 'không theo kịp'],
    ],
  }),
  item('w13', 'hyogen', 2, {
    material: {
      kind: 'text',
      title: '価格改定のお願い',
      body: 'お取引先各位\n\n平素は格別のお引き立てを賜り、厚く御礼申し上げます。\nさて、昨年来の古紙価格および物流費の上昇を受け、弊社では生産性の向上と経費の削減に努めてまいりましたが、自助努力のみで現行価格を維持することは困難な状況となりました。\nつきましては、誠に不本意ながら、2027年4月1日出荷分より、段ボール製品全品の価格を一律8％改定させていただきたく、お願い申し上げます。\nなお、2027年3月31日までにご注文いただいた分につきましては、出荷日にかかわらず現行価格にて納品いたします。\n何卒ご理解賜りますよう、お願い申し上げます。\n\n東邦パッケージ株式会社 営業部',
    },
    questions: [
      [
        '2027年3月25日に注文し、4月3日に出荷される段ボール製品の価格はどうなりますか。',
        ['4月以降の出荷なので、8％上がった価格になる', '一部の製品だけが、8％上がった価格になる', '出荷する日の古紙の価格によって決まる', '3月31日までの注文なので、現行の価格のままである'],
        3,
        'Lựa chọn 4: giá mới áp dụng từ hàng xuất ngày 1/4, nhưng câu sau なお nói đơn đặt trước 31/3 vẫn giữ giá hiện hành, bất kể ngày xuất (出荷日にかかわらず). Lựa chọn 1 dễ nhầm vì chỉ nhìn điều kiện ngày xuất mà bỏ qua ngày đặt hàng. Mức tăng là 一律 (đồng loạt) cho toàn bộ sản phẩm, nên lựa chọn 2 sai.',
      ],
    ],
    points: [
      ['自助努力', 'じじょどりょく', 'tự nỗ lực (không nhờ bên ngoài)'],
      ['一律', 'いちりつ', 'đồng loạt, như nhau'],
      ['にかかわらず', 'にかかわらず', 'bất kể'],
      ['不本意ながら', 'ふほんいながら', 'dù không mong muốn'],
    ],
  }),
  item('w13', 'hyogen', 3, {
    material: {
      kind: 'text',
      title: '社長メッセージ（社内報より）',
      body: '今期の上半期は、主力の家電部品で受注が前年を一割下回り、厳しい結果となりました。下半期も、海外の景気の先行きは不透明です。\nこうした局面では、経費の削減に目が向きがちです。もちろん、無駄な出費を見直すことは必要です。しかし、削るだけでは会社は縮んでいくばかりです。\n私が皆さんにお願いしたいのは、「今のお客様に、まだ提案していないことは何か」を一人一人が考えることです。来月から、部署を問わず、新しい商品やサービスの案を社長室に直接送れる窓口を設けます。採用するかどうかにかかわらず、すべての提案に私が目を通します。',
    },
    questions: [
      [
        'このメッセージで社長が最も伝えたいことは何ですか。',
        ['新しい提案を一人一人が考えて出してほしい', '経費の削減を何よりも優先してほしい', '下半期の受注目標を必ず達成してほしい', '海外の景気が回復するまで待ってほしい'],
        0,
        'Lựa chọn 1: điều giám đốc "muốn nhờ" (お願いしたいのは) là mỗi người tự nghĩ xem còn đề xuất gì chưa đưa cho khách, và lập kênh gửi thẳng ý tưởng. Lựa chọn 2 dễ nhầm vì bài có nói cắt chi phí là cần thiết, nhưng ngay sau đó しかし: chỉ cắt giảm thì công ty sẽ teo lại. Bài không đặt mục tiêu đơn hàng, cũng không khuyên chờ kinh tế hồi phục.',
      ],
    ],
    points: [
      ['先行き', 'さきゆき', 'triển vọng sắp tới'],
      ['局面', 'きょくめん', 'cục diện, giai đoạn'],
      ['部署を問わず', 'ぶしょをとわず', 'không phân biệt phòng ban'],
    ],
  }),
  item('w13', 'sogo-dokkai', 1, {
    material: {
      kind: 'text',
      title: '節約志向でPB商品が好調　中堅スーパー、売上の3割に',
      body: '食品の値上がりが続く中、スーパー各社のプライベートブランド（PB）商品の販売が伸びている。関東を中心に約120店を展開する中堅スーパーの丸福ストアでは、2026年度上半期のPB商品の売上高が前年同期比18％増の420億円となり、全体の売上高に占める割合が初めて3割に達した。\nPB商品はメーカー品に比べて1～3割ほど安い。広告費や流通にかかる費用を抑えられるためだ。物価の上昇で家計の節約志向が強まり、「品質が同じなら安い方を」と考える消費者が増えたことが追い風となった。\nただ、課題もある。PB商品はメーカー品より利益率が高い一方、原材料費の上昇分を価格に反映しにくい。「安さ」が支持の理由である以上、値上げをすれば客離れを招きかねないからだ。同社は今年度から、PB商品の原材料を複数の産地から調達する体制に切り替え、仕入れ価格の変動を抑える方針だ。',
    },
    questions: [
      [
        '丸福ストアの2026年度上半期の売上高全体は、およそいくらですか。',
        ['約420億円', '約1,260億円', '約1,400億円', '約2,330億円'],
        2,
        'Lựa chọn 3: 420 tỷ yên hàng PB chiếm 3 phần mười doanh thu, nên tổng là 420 ÷ 0,3 = 1.400 tỷ yên. Lựa chọn 2 là bẫy nhân 420 × 3. Lựa chọn 4 lấy 420 chia cho 18%, nhưng 18% là mức tăng so với cùng kỳ, không phải tỷ trọng. 420 tỷ chỉ là phần PB.',
      ],
      [
        'PB商品について、記事の内容と合っているものはどれですか。',
        ['安さが支持されているため、原材料費が上がっても値上げしにくい', 'メーカー品より利益率が低いため、値上げが欠かせない', '広告に多くの費用をかけたことで、売上が伸びた', '原材料を一つの産地にまとめて、仕入れ価格を下げる方針だ'],
        0,
        'Lựa chọn 1: đoạn cuối nói vì được ủng hộ nhờ rẻ (「安さ」が支持の理由である以上), tăng giá có thể khiến khách bỏ đi. Lựa chọn 2 dễ nhầm vì có nhắc tỷ suất lợi nhuận, nhưng bài nói PB 利益率が高い (cao hơn), không phải thấp. PB rẻ chính vì tiết kiệm được chi phí quảng cáo, còn nguyên liệu sẽ mua từ nhiều vùng (複数の産地) chứ không gom về một.',
      ],
    ],
    points: [
      ['節約志向', 'せつやくしこう', 'xu hướng tiết kiệm'],
      ['占める', 'しめる', 'chiếm (tỷ lệ)'],
      ['客離れ', 'きゃくばなれ', 'khách hàng bỏ đi'],
      ['招きかねない', 'まねきかねない', 'có thể dẫn đến (điều xấu)'],
    ],
  }),
  item('w13', 'sogo-dokkai', 2, {
    material: {
      kind: 'text',
      title: '菓子大手3社が共同配送　物流費の上昇に対応',
      body: '菓子メーカーの大手3社は、来年4月から北海道と東北地方で、スーパーやコンビニへの商品の配送を共同で行うと発表した。3社の商品を同じトラックに積み合わせることで、配送に使うトラックの台数を現在の約3分の2に減らせる見込みだという。\n背景には、トラック運転手の不足がある。運転手の残業時間に上限が設けられたことで、一人の運転手が一日に走れる距離が短くなり、運送会社は運賃の引き上げを相次いで求めている。特に、店舗が広い地域に点在する北海道や東北では、1回の配送で運べる量が少なく、輸送の効率が悪かった。\n3社は商品の開発や販売では引き続き競い合う。ある社の担当者は「店頭ではライバルだが、運ぶところまで競う必要はない」と話す。一方、共同配送では、各社が配送の日時を自由に決められなくなる。新商品の発売日を他社に合わせる必要が出てくる可能性もあり、3社は今後、具体的な運用のルールを詰める。',
    },
    questions: [
      [
        '3社が共同配送を始める主な理由は何ですか。',
        ['店頭での販売競争をやめることにしたから', '北海道と東北で店舗の数が急に増えたから', '新商品の発売日をそろえたかったから', '運転手不足で運賃が上がり、輸送の効率も悪かったから'],
        3,
        'Lựa chọn 4: đoạn hai mở đầu bằng 背景には (bối cảnh là) thiếu tài xế: giờ làm thêm bị giới hạn, cước vận chuyển bị đòi tăng, và vùng có cửa hàng rải rác thì chở kém hiệu quả. Lựa chọn 1 dễ nhầm, nhưng ba công ty vẫn cạnh tranh ở khâu bán hàng (引き続き競い合う). Việc trùng ngày ra mắt là hệ quả có thể xảy ra, không phải mục đích.',
      ],
      [
        '記事から分かることはどれですか。',
        ['共同配送が始まると、トラックの台数は現在の約3分の1になる', '共同配送の具体的な運用のルールは、まだ決まっていない', '3社は商品の開発でも協力することになった', '運転手一人が一日に走れる距離は、以前より長くなった'],
        1,
        'Lựa chọn 2: câu cuối 3社は今後、具体的な運用のルールを詰める = sắp tới mới bàn chốt quy tắc vận hành, tức là chưa quyết. Lựa chọn 1 là bẫy con số: số xe giảm "xuống còn khoảng 2/3" (3分の2に減らせる), tức bớt đi khoảng 1/3, không phải còn 1/3. Quãng đường mỗi tài xế chạy được ngắn đi chứ không dài ra.',
      ],
    ],
    points: [
      ['積み合わせる', 'つみあわせる', 'chất hàng chung (của nhiều bên)'],
      ['点在する', 'てんざいする', 'nằm rải rác'],
      ['相次いで', 'あいついで', 'liên tiếp'],
      ['詰める', 'つめる', 'bàn cho chốt (chi tiết)'],
    ],
  }),
];

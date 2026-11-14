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
      body: '（株主総会の受付で、株主に）\n本日はご来場ありがとうございます。恐れ入りますが、議決権行使書を＿＿＿。',
    },
    questions: [
      [
        '空欄に入る最も適当なものはどれですか。',
        ['お見せいただけますか', 'お見せできますか', '拝見していただけますか', 'ご覧になれますか'],
        0,
        'Người đưa phiếu ra là cổ đông, nhân viên nhờ cổ đông cho xem: お見せいただけますか → lựa chọn 1. Lựa chọn 3 dễ nhầm vì có 拝見 (xem, khiêm nhường), nhưng 拝見していただく bắt cổ đông "khiêm nhường mà xem", sai cả chủ thể lẫn kính ngữ. お見せできますか là "tôi cho anh/chị xem được không"; ご覧になれますか là hỏi cổ đông có xem được không.',
      ],
    ],
    points: [
      ['議決権行使書', 'ぎけつけんこうししょ', 'phiếu biểu quyết'],
      ['株主総会', 'かぶぬしそうかい', 'đại hội cổ đông'],
    ],
  }),
  item('w13', 'hyogen', 2, {
    material: {
      kind: 'text',
      body: '（取引先への価格改定のお知らせ）\n原材料価格の高騰を受け、2027年4月より一部製品の価格を＿＿＿。',
    },
    questions: [
      [
        '空欄に入る最も適当なものはどれですか。',
        ['改定していただきます', '改定なさいます', '改定してさしあげます', '改定させていただきます'],
        3,
        'Công ty mình đổi giá, báo cho khách: xin phép được làm → 改定させていただきます, lựa chọn 4. Lựa chọn 1 dễ nhầm vì cũng có いただく, nhưng thiếu させて nên nghĩa là "nhờ khách sửa giá". なさる là tôn kính ngữ; ～てさしあげる là "làm ơn cho người khác", nghe kẻ cả và sai nghĩa.',
      ],
    ],
    points: [
      ['高騰', 'こうとう', 'tăng vọt'],
      ['価格改定', 'かかくかいてい', 'điều chỉnh giá'],
    ],
  }),
  item('w13', 'hyogen', 3, {
    material: {
      kind: 'text',
      body: '（記者の問い合わせに、広報担当者が）\n＿＿＿、本件につきましては、現時点では公表を差し控えさせていただきます。',
    },
    questions: [
      [
        '空欄に入る最も適当なものはどれですか。',
        ['お手数をおかけしますが', 'ご多忙のところ恐縮ですが', '誠に恐縮ではございますが', 'ご期待に添えるよう'],
        2,
        'Từ chối trả lời phóng viên một cách trang trọng: 誠に恐縮ではございますが → lựa chọn 3. Lựa chọn 2 dễ nhầm vì cũng có 恐縮, nhưng ご多忙のところ dùng khi nhờ một người bận làm gì cho mình; ở đây không nhờ gì. お手数をおかけしますが cũng là câu nhờ vả. ご期待に添えるよう (để đáp ứng kỳ vọng) ngược nghĩa với lời từ chối.',
      ],
    ],
    points: [
      ['差し控える', 'さしひかえる', 'xin phép không (làm)'],
      ['公表', 'こうひょう', 'công bố'],
      ['広報', 'こうほう', 'quan hệ công chúng'],
    ],
  }),
  item('w13', 'sogo-dokkai', 1, {
    material: {
      kind: 'text',
      title: '第58回定時株主総会招集ご通知',
      body: '株主各位\n\n拝啓　平素は格別のご高配を賜り、厚く御礼申し上げます。\nさて、当社第58回定時株主総会を下記のとおり開催いたしますので、ご出席くださいますようご通知申し上げます。\nなお、当日ご欠席の場合は、書面によって議決権を行使することができます。議決権行使書用紙に賛否をご表示のうえ、総会開催日の前営業日の午後5時までに到着するようご返送ください。\n敬具\n\n記\n1．日時：2027年3月29日（月）午前10時\n2．場所：当社本社ビル 3階 大会議室\n以上',
    },
    questions: [
      [
        '書面で議決権を行使する場合、いつまでに届くように送ればよいですか。',
        ['3月29日の午前10時', '3月26日の午後5時', '3月28日の午後5時', '3月25日の午後5時'],
        1,
        'Hạn là 5 giờ chiều "ngày làm việc trước ngày họp". Đại hội ngày 29/3/2027 là thứ Hai, ngày làm việc liền trước là thứ Sáu 26/3 → lựa chọn 2. Lựa chọn 3 dễ nhầm vì 28/3 là ngày hôm trước, nhưng là Chủ nhật, không phải ngày làm việc. 10 giờ sáng 29/3 là giờ khai mạc.',
      ],
    ],
    points: [
      ['招集', 'しょうしゅう', 'triệu tập'],
      ['前営業日', 'ぜんえいぎょうび', 'ngày làm việc liền trước'],
      ['賛否', 'さんぴ', 'tán thành hay phản đối'],
    ],
  }),
  item('w13', 'sogo-dokkai', 2, {
    material: {
      kind: 'text',
      title: '社名変更のお知らせ',
      body: 'お取引先各位\n\n平素は格別のお引き立てをいただき、誠にありがとうございます。\nこのたび当社は、2027年4月1日をもちまして、社名を「東邦テック株式会社」から「トウホウ・ソリューションズ株式会社」に変更いたします。\nなお、所在地、電話番号、お振込先口座に変更はございません。また、現在のご契約はすべて新社名にそのまま引き継がれますので、契約書の再締結は不要です。\nお手数ではございますが、4月1日以降に発行される請求書および発注書の宛名は、新社名にてご記入くださいますようお願い申し上げます。',
    },
    questions: [
      [
        '取引先がしなければならないことは何ですか。',
        ['振込先を新しい口座に変更する', '新社名で契約書を結び直す', '新しい電話番号を登録し直す', '書類の宛名を新社名に改める'],
        3,
        'Việc duy nhất được nhờ (お手数ではございますが…): từ 1/4 ghi tên mới trên hóa đơn và đơn đặt hàng → lựa chọn 4. Lựa chọn 2 dễ nhầm vì đổi tên công ty thường kéo theo hợp đồng, nhưng thư nói 再締結は不要 (không cần ký lại). Tài khoản và số điện thoại không đổi.',
      ],
    ],
    points: [
      ['引き継ぐ', 'ひきつぐ', 'kế thừa, chuyển tiếp'],
      ['再締結', 'さいていけつ', 'ký kết lại'],
      ['宛名', 'あてな', 'tên người nhận'],
    ],
  }),
  item('w13', 'sogo-dokkai', 3, {
    material: {
      kind: 'text',
      title: '決算説明会開催のご案内',
      body: 'アナリスト・機関投資家の皆様\n\n平素より当社へのご理解を賜り、誠にありがとうございます。\n2027年3月期第3四半期の決算説明会を、下記のとおり開催いたします。\n\n記\n日時：2027年2月10日（水）16:00〜17:00\n形式：会場（本社10階）およびオンライン配信\n申込：会場、オンラインとも、2月5日（金）までに当社IRサイトの専用フォームよりお申し込みください。\n　※オンラインの視聴URLは、お申し込みの方にのみ前日までにメールでお送りします。\n以上\n\n株式会社ミナセ製作所 IR室',
    },
    questions: [
      [
        'オンラインで説明会を見たい人は、何をしなければなりませんか。',
        ['2月5日までにフォームで申し込む', '前日までにIR室へメールを送る', '当日、IRサイトから視聴URLを開く', '2月10日の会場受付で手続きをする'],
        0,
        'Cả dự trực tiếp lẫn xem online đều phải đăng ký qua mẫu trên trang IR trước 5/2; URL chỉ gửi cho người đã đăng ký → lựa chọn 1. Lựa chọn 2 dễ nhầm vì có "trước một ngày" và "email", nhưng đó là việc công ty gửi URL cho người xem, sai chủ thể. URL không đăng trên trang IR.',
      ],
    ],
    points: [
      ['機関投資家', 'きかんとうしか', 'nhà đầu tư tổ chức'],
      ['四半期', 'しはんき', 'quý'],
      ['視聴', 'しちょう', 'xem, nghe (phát sóng)'],
    ],
  }),
  item('w13', 'sogo-dokkai', 4, {
    material: {
      kind: 'text',
      title: '来年度経費予算の編成方針について',
      body: '各部門長殿\n\n経営企画部\n\n円安と原材料高により、今年度の営業利益は前年度を大きく下回る見通しです。このため、来年度の経費予算は下記の方針で編成してください。\n\n記\n1．各部門の経費総額：今年度実績の8％減\n　※研究開発部は、中期経営計画の重点分野であるため5％減とする\n2．提出期限：2027年1月20日（水）\n3．提出先：経営企画部 予算管理課\n以上',
    },
    questions: [
      [
        '今年度の経費実績が2,500万円の研究開発部は、来年度の経費をいくら以内にしなければなりませんか。',
        ['2,300万円', '125万円', '2,375万円', '2,200万円'],
        2,
        'Phòng nghiên cứu phát triển là ngoại lệ (※), chỉ giảm 5%: 2.500 × 0,95 = 2.375 vạn yên → lựa chọn 3. Lựa chọn 1 dễ nhầm vì áp mức giảm 8% chung cho các bộ phận khác (2.500 × 0,92). 125 vạn yên là số tiền phải cắt, không phải mức ngân sách.',
      ],
    ],
    points: [
      ['編成', 'へんせい', 'lập (ngân sách)'],
      ['重点分野', 'じゅうてんぶんや', 'lĩnh vực trọng điểm'],
      ['見通し', 'みとおし', 'dự báo, triển vọng'],
    ],
  }),
];

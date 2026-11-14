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
      title: '年末年始の休業について',
      body: '社員各位\n\n2026年12月29日（火）から2027年1月4日（月）まで、本社および各営業所は休業とします。1月5日（火）から通常業務を行います。\nただし、物流センターは12月30日（水）まで出荷業務を行い、1月4日（月）から業務を再開します。\n休業期間中に届いたお客様からのお問い合わせは、1月5日以降に順次対応します。\n\n総務部',
    },
    questions: [
      [
        '物流センターが休みになるのは何日間ですか。',
        ['4日間', '5日間', '6日間', '7日間'],
        0,
        'Lựa chọn 1: trung tâm logistics làm đến thứ Tư 30/12 và mở lại thứ Hai 4/1, nên nghỉ 31/12, 1/1, 2/1, 3/1 là 4 ngày. Lựa chọn 4 dễ nhầm vì đó là kỳ nghỉ của trụ sở (29/12 đến 4/1 là 7 ngày). 5 ngày là tính nhầm cả ngày 4/1, 6 ngày là tính từ ngày 30/12.',
      ],
    ],
    points: [
      ['休業', 'きゅうぎょう', 'nghỉ (không kinh doanh)'],
      ['順次', 'じゅんじ', 'lần lượt'],
      ['再開する', 'さいかいする', 'mở lại, bắt đầu lại'],
    ],
  }),
  item('w16', 'hyogen', 2, {
    material: {
      kind: 'text',
      title: 'お届け遅延のお詫び',
      body: 'お客様各位\n\nこのたびは「北の恵みセット」をご注文いただき、誠にありがとうございます。\n天候不良による収穫の遅れのため、12月10日にお届け予定の商品が、12月17日ごろのお届けとなる見込みです。多大なるご迷惑をおかけし、深くお詫び申し上げます。\n予定より遅れてもお受け取りいただける場合は、特にお手続きの必要はございません。お届け日の変更によりキャンセルをご希望の場合は、12月8日までに下記の窓口へお電話ください。代金は全額返金いたします。\n\n北陽ファーム お客様窓口 0120-48-3917',
    },
    questions: [
      [
        '遅れても商品を受け取りたい人は、どうすればよいですか。',
        ['12月8日までに電話で連絡する', '12月10日に届け先を変更する', '代金をいったん返してもらう', '特に何もしなくてよい'],
        3,
        'Lựa chọn 4: thư viết người vẫn nhận hàng dù trễ thì 特にお手続きの必要はございません (không cần làm thủ tục gì). Lựa chọn 1 dễ nhầm vì có hạn 8/12 và số điện thoại, nhưng đó chỉ dành cho người muốn hủy đơn. Hoàn tiền cũng chỉ áp dụng khi hủy.',
      ],
    ],
    points: [
      ['遅延', 'ちえん', 'chậm trễ'],
      ['多大なる', 'ただいなる', 'rất lớn'],
      ['返金', 'へんきん', 'hoàn tiền'],
    ],
  }),
  item('w16', 'hyogen', 3, {
    material: {
      kind: 'text',
      title: 'Re: 展示会の受付当番の件',
      body: '川島さん\n\nご連絡ありがとうございます。\n15日の当番の交代の件、事情はよくわかりました。私でお力になれればよかったのですが、その日はあいにく、午前から取引先との打ち合わせが入っておりまして……。\n午後の部だけでしたら、打ち合わせの後に会場へ向かえば2時には着けると思います。その形でよければ、お引き受けします。\n午前の分は、営業三課の佐野さんが当日空いていると聞いていますので、一度声をかけてみてはいかがでしょうか。\n\n田村',
    },
    questions: [
      [
        '田村さんの返事の内容と合っているものはどれですか。',
        ['15日の当番は、一日中引き受けられる', '15日の当番は、午前も午後も引き受けられない', '午後なら引き受けられるので、午前は別の人に頼むよう勧めている', '午前の当番は、すでに佐野さんに頼んでおいた'],
        2,
        'Lựa chọn 3: câu お力になれればよかったのですが nghe như từ chối, nhưng đoạn sau Tamura nhận ca buổi chiều (その形でよければ、お引き受けします) và gợi ý hỏi Sano cho buổi sáng. Lựa chọn 2 dễ nhầm nếu chỉ đọc câu mở đầu. Lựa chọn 4 sai vì Tamura chỉ gợi ý (声をかけてみてはいかがでしょうか), chưa nhờ Sano.',
      ],
    ],
    points: [
      ['当番', 'とうばん', 'ca trực, phiên trực'],
      ['声をかける', 'こえをかける', 'hỏi, rủ, nhờ thử'],
      ['お力になる', 'おちからになる', 'giúp được (khiêm tốn)'],
    ],
  }),
  item('w16', 'sogo-dokkai', 1, {
    material: {
      kind: 'text',
      title: '後継者不足に地銀が仲介役　中小企業のM&A支援広がる',
      body: '経営者の高齢化が進む中、後継者が見つからない中小企業の事業を、別の企業が買い取って引き継ぐ動きが広がっている。東北地方の地方銀行、みちのく中央銀行は昨年度、取引先企業の売り手と買い手を引き合わせる仲介業務で、前の年度の2倍にあたる48件の成約を記録した。\n同行の調べでは、取引先のうち経営者が60歳以上の企業は約6割にのぼり、そのうち半数近くが「後継者が決まっていない」と答えている。こうした企業の中には、業績が黒字であるにもかかわらず、跡を継ぐ人がいないために廃業を考えるところも少なくない。廃業となれば、従業員の雇用や、地域の取引先との関係も失われてしまう。\n同行が仲介に力を入れる理由はそこにある。担当者は「取引先が廃業すれば、融資先が一つ減るだけでなく、地域の経済そのものが細っていく」と話す。一方で課題もある。買い手の多くは首都圏の企業で、引き継いだ後に工場や店舗を地元から移してしまう例も出ている。同行は今年度から、地元に拠点を残すことを条件の一つとして、買い手を探す方針だ。',
    },
    questions: [
      [
        '記事によると、黒字の中小企業が廃業を考えるのはなぜですか。',
        ['地方銀行が融資をやめたから', '経営者が高齢になり、跡を継ぐ人がいないから', '首都圏の企業に取引先を奪われたから', '従業員を雇い続けることが難しくなったから'],
        1,
        'Lựa chọn 2: đoạn hai nói dù có lãi nhưng vì không có người nối nghiệp (跡を継ぐ人がいないために) nên tính chuyện đóng cửa. Lựa chọn 4 dễ nhầm vì bài có nhắc việc làm của nhân viên, nhưng đó là hậu quả nếu đóng cửa, không phải nguyên nhân. Ngân hàng vẫn cho vay, và bài lo khách hàng vay giảm đi.',
      ],
      [
        'みちのく中央銀行について、記事の内容と合っているものはどれですか。',
        ['一昨年度の仲介の成約件数は48件だった', '取引先の約6割が、後継者が決まっていないと答えた', '買い手の多くは東北地方の企業である', '今年度から、地元に拠点を残すことを買い手の条件の一つにする'],
        3,
        'Lựa chọn 4: câu cuối nói từ năm nay ngân hàng tìm bên mua với điều kiện giữ cơ sở ở địa phương. Lựa chọn 2 dễ nhầm: 6 phần 10 là tỷ lệ công ty có chủ trên 60 tuổi, còn chưa có người kế nghiệp chỉ là gần một nửa trong số đó, khoảng 3 phần 10. 48 vụ là của năm ngoái, gấp đôi năm trước đó (24 vụ). Bên mua phần lớn ở vùng thủ đô.',
      ],
    ],
    points: [
      ['後継者', 'こうけいしゃ', 'người kế nghiệp'],
      ['廃業', 'はいぎょう', 'đóng cửa, thôi kinh doanh'],
      ['成約', 'せいやく', 'ký kết thành công (hợp đồng)'],
      ['細る', 'ほそる', 'teo tóp, suy yếu dần'],
    ],
  }),
  item('w16', 'sogo-dokkai', 2, {
    material: {
      kind: 'text',
      title: '国内出張の宿泊費上限の改定について',
      body: '社員各位\n\n物価の上昇を受け、2027年4月1日以降の宿泊分から、国内出張の宿泊費の上限（1泊あたり、税込み）を次のとおり改定します。\n・東京23区、大阪市：12,000円 → 15,000円\n・その他の政令指定都市：10,000円 → 12,000円\n・上記以外の地域：9,000円 → 10,000円\n上限を超えた分は自己負担となります。ただし、展示会の開催などで周辺のホテルが不足し、上限内での宿泊が難しい場合は、出張前に所属長の承認を得れば実費を支給します。\nまた、会社の提携ホテルを利用した場合は、上限にかかわらず宿泊費の全額を会社が支払います。\n\n経理部',
    },
    questions: [
      [
        '2027年4月8日から大阪市に2泊し、1泊16,500円のホテル（提携ホテルではない）に泊まった。所属長の承認は得ていない。自己負担はいくらですか。',
        ['1,500円', '3,000円', '9,000円', '0円'],
        1,
        'Lựa chọn 2: ở sau 1/4 nên áp mức mới 15.000 yên; mỗi đêm vượt 1.500 yên, hai đêm là 3.000 yên tự trả. Lựa chọn 1 dễ nhầm vì chỉ tính một đêm. Lựa chọn 3 dùng mức cũ 12.000 yên ((16.500 − 12.000) × 2). Không có phê duyệt và không phải khách sạn liên kết nên không được 0 yên.',
      ],
      [
        'この知らせの内容と合っているものはどれですか。',
        ['提携ホテルに泊まれば、上限を超えても自己負担はない', '4月1日以降に予約したホテルから、新しい上限が適用される', '展示会のときは、承認がなくても実費が支給される', 'すべての地域で上限が3,000円上がる'],
        0,
        'Lựa chọn 1: câu cuối nói dùng khách sạn liên kết thì công ty trả toàn bộ, bất kể mức trần. Lựa chọn 2 dễ nhầm, nhưng mức mới tính theo đêm ở (宿泊分) từ 1/4, không theo ngày đặt phòng. Dịp triển lãm vẫn cần phê duyệt trước, và mức tăng là 3.000, 2.000 hay 1.000 yên tùy vùng.',
      ],
    ],
    points: [
      ['上限', 'じょうげん', 'mức trần'],
      ['自己負担', 'じこふたん', 'tự chi trả'],
      ['実費', 'じっぴ', 'chi phí thực tế'],
      ['所属長', 'しょぞくちょう', 'trưởng bộ phận mình trực thuộc'],
    ],
  }),
];

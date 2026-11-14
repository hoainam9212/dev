import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/** Week 14 — presentations and debate (reading): what the writer really means. Level: J1, six questions J1+. */
export const W14: BjtItem[] = [
  item('w14', 'goi', 1, {
    questions: [
      [
        '本日の発表では、まず結論を申し上げ、その後で＿＿＿となるデータをお示しします。',
        ['根性', '根回し', '根拠', '根元'],
        2,
        'Lựa chọn 3: 根拠となるデータ = dữ liệu làm căn cứ cho kết luận. Lựa chọn 2 dễ nhầm vì 根回し là từ hay gặp quanh cuộc họp, nhưng nó là việc vận động, dàn xếp trước, không phải dữ liệu. 根性 là ý chí bền bỉ, 根元 là gốc (cây, vật).',
      ],
    ],
    points: [
      ['根拠', 'こんきょ', 'căn cứ'],
      ['お示しする', 'おしめしする', 'trình bày, chỉ ra (khiêm nhường)'],
    ],
  }),
  item('w14', 'goi', 2, {
    questions: [
      [
        '新しい評価制度については社内でも賛否＿＿＿あり、導入は来年度以降に持ち越された。',
        ['両論', '双方', '両面', '両者'],
        0,
        'Lựa chọn 1: 賛否両論 = có cả ý kiến tán thành lẫn phản đối, là cụm bốn chữ cố định. Lựa chọn 2 dễ nhầm vì 双方 cũng là "cả hai bên", nhưng nó chỉ người hay phía tham gia (労使双方), không ghép sau 賛否. 両面 là hai mặt của sự việc, 両者 là hai người, hai bên.',
      ],
    ],
    points: [
      ['賛否両論', 'さんぴりょうろん', 'ý kiến tán thành và phản đối đều có'],
      ['持ち越す', 'もちこす', 'dời sang sau'],
    ],
  }),
  item('w14', 'goi', 3, {
    questions: [
      [
        '恐縮ですが、ただいまの説明に一点＿＿＿させていただきます。',
        ['補充', '補給', '補償', '補足'],
        3,
        'Lựa chọn 4: 補足する = nói thêm cho đầy đủ phần giải thích. Lựa chọn 1 dễ nhầm vì cũng là "bổ sung", nhưng 補充 là bù số lượng còn thiếu (人員を補充する, 在庫を補充する), không dùng cho lời nói. 補給 là tiếp tế (nhiên liệu, nước), 補償 là bồi thường thiệt hại.',
      ],
    ],
    points: [
      ['補足する', 'ほそくする', 'nói thêm, bổ sung (ý)'],
      ['恐縮ですが', 'きょうしゅくですが', 'xin lỗi làm phiền, nhưng'],
    ],
  }),
  item('w14', 'goi', 4, {
    questions: [
      [
        '彼の提案は現場の実情を＿＿＿、机上の空論にすぎない。',
        ['踏まえつつ', '踏まえておらず', '踏まえたうえで', '踏まえているので'],
        1,
        'Lựa chọn 2: 机上の空論にすぎない = chỉ là lý thuyết suông trên bàn giấy; lý do hợp lý là đề xuất "không dựa trên" thực tế hiện trường. Ba lựa chọn còn lại đều nói đề xuất có dựa trên thực tế, mâu thuẫn với lời chê phía sau. Lựa chọn 1 dễ nhầm nhất vì つつ đôi khi mang nghĩa "dù… nhưng", song khi đó vế sau phải trái ngược với vế trước; "dựa trên thực tế mà vẫn chỉ là lý thuyết suông" thì tự mâu thuẫn.',
      ],
    ],
    points: [
      ['踏まえる', 'ふまえる', 'dựa trên, căn cứ vào'],
      ['机上の空論', 'きじょうのくうろん', 'lý thuyết suông trên giấy'],
      ['実情', 'じつじょう', 'tình hình thực tế'],
    ],
  }),
  item('w14', 'goi', 5, {
    questions: [
      [
        '双方の議論は最後まで＿＿＿まま時間切れとなり、結論は次回に持ち越された。',
        ['平行線をたどった', '一致した', 'まとまった', '決着した'],
        0,
        'Lựa chọn 1: 平行線をたどる = hai bên giữ nguyên quan điểm, không gặp nhau, nên mới hết giờ mà chưa có kết luận. Ba lựa chọn còn lại đều nói đã đi đến thống nhất, mâu thuẫn với 結論は次回に持ち越された. Lựa chọn 3 dễ nhầm nhất vì まとまる hay dùng với cuộc họp, nhưng nó nghĩa là đã chốt được ý chung.',
      ],
    ],
    points: [
      ['平行線をたどる', 'へいこうせんをたどる', 'không ai nhượng ai, không tiến triển'],
      ['時間切れ', 'じかんぎれ', 'hết giờ'],
    ],
  }),
  item('w14', 'goi', 6, {
    questions: [
      [
        'ご提案の趣旨はよく理解できます。＿＿＿、今の人員で実行できるかどうかは疑問が残ります。',
        ['それゆえ', 'すなわち', 'とはいえ', 'ましてや'],
        2,
        'Lựa chọn 3: とはいえ = tuy nói vậy nhưng; câu trước công nhận ý đề xuất, câu sau nêu nghi ngại, đúng kiểu phản đối mềm trong họp. Lựa chọn 1 dễ nhầm vì cũng là liên từ văn viết, nhưng それゆえ là "vì thế", không thể nối "hiểu rõ" với "còn nghi ngại". すなわち là "tức là", còn ましてや là "huống chi" và đòi một vế so sánh phía sau.',
      ],
    ],
    points: [
      ['とはいえ', 'とはいえ', 'tuy nói vậy nhưng'],
      ['趣旨', 'しゅし', 'ý chính, mục đích'],
    ],
  }),
  item('w14', 'hyogen', 1, {
    material: {
      kind: 'text',
      body: '（取引先での発表の質疑応答で）\nご質問ありがとうございます。その点につきましては、後ほど資料で＿＿＿。',
    },
    questions: [
      [
        '空欄に入る最も適当なものはどれですか。',
        ['ご説明くださいます', '説明していただきます', 'ご説明いたします', 'ご説明なさいます'],
        2,
        'Người giải thích là chính người thuyết trình, nói với khách → khiêm nhường ご～いたす: ご説明いたします → lựa chọn 3. Lựa chọn 2 dễ nhầm vì có いただく, nhưng nghĩa là "được ai đó giải thích cho", tức nhờ người khác. ご～くださる và なさる là tôn kính ngữ cho hành động của người kia.',
      ],
    ],
    points: [
      ['質疑応答', 'しつぎおうとう', 'hỏi đáp'],
      ['後ほど', 'のちほど', 'lát nữa (lịch sự)'],
    ],
  }),
  item('w14', 'hyogen', 2, {
    material: {
      kind: 'text',
      body: '（会議で、部長の案に意見を述べる）\n＿＿＿、その案では予算が足りないのではないでしょうか。',
    },
    questions: [
      [
        '空欄に入る最も適当なものはどれですか。',
        ['お言葉を返すようですが', 'お言葉に甘えて', 'お手すきの際に', 'おっしゃるとおりで'],
        0,
        'Nêu ý trái với đề án của cấp trên thì mở đầu bằng お言葉を返すようですが (xin phép nói ngược lại) → lựa chọn 1. Lựa chọn 2 dễ nhầm vì cũng có お言葉, nhưng お言葉に甘えて là "xin nhận lời mời, lòng tốt" của người kia. おっしゃるとおりで (đúng như anh/chị nói) mâu thuẫn với vế sau; お手すきの際に dùng khi nhờ việc lúc rảnh.',
      ],
    ],
    points: [
      ['お言葉を返すようですが', 'おことばをかえすようですが', 'xin phép nói ngược lại'],
      ['述べる', 'のべる', 'trình bày, nêu'],
    ],
  }),
  item('w14', 'hyogen', 3, {
    material: {
      kind: 'text',
      body: '（社外から招いた講師に、講演のあとで）\n先生、本日は貴重なお話を＿＿＿、誠にありがとうございました。',
    },
    questions: [
      [
        '空欄に入る最も適当なものはどれですか。',
        ['お聞きいただき', 'お聞きになり', 'お聞かせになられ', 'お聞かせいただき'],
        3,
        'Giảng viên kể cho mình nghe → mình được nghe: お聞かせいただき → lựa chọn 4. Lựa chọn 1 お聞きいただき dễ nhầm vì mặt chữ gần, nhưng là câu của diễn giả cảm ơn người nghe (người khác đã nghe mình), ở đây vai bị đảo ngược. お聞きになり là giảng viên "nghe", sai nghĩa; お聞かせになられ là kính ngữ kép.',
      ],
    ],
    points: [
      ['お聞かせいただく', 'おきかせいただく', 'được (người kia) kể cho nghe'],
      ['貴重', 'きちょう', 'quý giá'],
    ],
  }),
  item('w14', 'sogo-dokkai', 1, {
    material: {
      kind: 'text',
      title: '定例会でのご発表について',
      body: '株式会社ライト物流\n営業部 西村様\n\nいつもお世話になっております。日の出食品 物流企画課の大島です。\n先日はご快諾いただき、ありがとうございました。2026年12月14日（月）の当社物流定例会では、共同配送の試行結果について30分ほどご発表をお願いいたします。\n恐れ入りますが、発表資料は事前に参加者へ配布いたしますので、定例会の3営業日前の正午までにお送りいただけますでしょうか。\nなお、会場のプロジェクターは当日ご使用いただけます。',
    },
    questions: [
      [
        '西村さんは、発表資料をいつまでに送らなければなりませんか。',
        ['12月11日の正午', '12月10日の正午', '12月14日の正午', '12月9日の正午'],
        3,
        'Họp ngày thứ Hai 14/12; đếm lùi ngày làm việc: thứ Sáu 11/12 (1), thứ Năm 10/12 (2), thứ Tư 9/12 (3) → trưa 9/12, lựa chọn 4. Lựa chọn 1 dễ nhầm vì là ngày làm việc liền trước, chỉ là "1 ngày làm việc trước". Lựa chọn 2 là đếm 3 ngày lịch có cả thứ Bảy, Chủ nhật.',
      ],
    ],
    points: [
      ['定例会', 'ていれいかい', 'cuộc họp định kỳ'],
      ['共同配送', 'きょうどうはいそう', 'giao hàng chung'],
      ['試行', 'しこう', 'làm thử'],
    ],
  }),
  item('w14', 'sogo-dokkai', 2, {
    material: {
      kind: 'text',
      title: 'パネルディスカッションご登壇のご依頼について',
      body: '一般社団法人 中部経営者協会\n事務局 福田様\n\n拝啓　師走の候、貴会ますますご隆盛のこととお慶び申し上げます。\nさて、このたびは2月の経営フォーラムにおけるパネルディスカッションへの登壇をご依頼いただき、身に余る光栄に存じます。\nしかしながら、あいにく当日は海外出張の予定が入っており、お引き受けいたしかねる状況でございます。誠に勝手ながら、同じテーマに詳しい弊社取締役の長尾をご紹介させていただきたく存じますが、いかがでしょうか。\n敬具',
    },
    questions: [
      [
        'この手紙の主な目的は何ですか。',
        ['登壇を引き受け、日程を相談すること', '登壇を断り、代わりの人を勧めること', '海外出張のため、開催の延期を頼むこと', '取締役の長尾と一緒に登壇すると伝えること'],
        1,
        'Người viết không nhận lời (お引き受けいたしかねる) vì đi công tác nước ngoài, và giới thiệu giám đốc 長尾 thay mình → lựa chọn 2. Lựa chọn 4 dễ nhầm vì có tên 長尾, nhưng 長尾 lên thay, không phải lên cùng. Thư không xin dời ngày hội thảo.',
      ],
    ],
    points: [
      ['登壇', 'とうだん', 'lên diễn đàn, phát biểu'],
      ['身に余る光栄', 'みにあまるこうえい', 'vinh dự quá sức'],
      ['ご隆盛', 'ごりゅうせい', 'sự thịnh vượng (của quý hội)'],
    ],
  }),
  item('w14', 'sogo-dokkai', 3, {
    material: {
      kind: 'text',
      title: '販促方針検討会議 議事録',
      body: '日時：2026年12月2日（水）15:00〜16:30\n出席：営業部、マーケティング部、経理部\n\n1．議題\n来期の販促予算を、テレビ広告とSNS広告のどちらに重点配分するか\n\n2．討議\n・マーケティング部はSNS広告への集中を主張したが、経理部から効果測定の根拠が弱いとの指摘があった。\n・営業部は、主要顧客である60代以上への到達率の点からテレビ広告を支持した。\n\n3．結論\n本日は結論を出さず、次回（12月16日）に持ち越す。それまでにマーケティング部は、SNS広告の効果を示すデータを年代別にまとめて提出する。',
    },
    questions: [
      [
        'マーケティング部が次回までにしなければならないことは何ですか。',
        ['SNS広告への予算の集中を決める', 'テレビ広告の到達率を年代別に調べる', 'SNS広告の効果を年代別に示す', '経理部と効果測定の方法を決める'],
        2,
        'Phần 結論: chưa quyết, dời sang 16/12; trước đó phòng marketing tổng hợp số liệu hiệu quả quảng cáo SNS theo độ tuổi → lựa chọn 3. Lựa chọn 2 dễ nhầm vì có "theo độ tuổi" và "tỉ lệ tiếp cận", nhưng tỉ lệ tiếp cận của TV là lý lẽ của phòng kinh doanh. Chưa quyết dồn ngân sách (lựa chọn 1).',
      ],
    ],
    points: [
      ['持ち越す', 'もちこす', 'dời sang (lần sau)'],
      ['到達率', 'とうたつりつ', 'tỉ lệ tiếp cận'],
      ['重点配分', 'じゅうてんはいぶん', 'phân bổ trọng điểm'],
    ],
  }),
  item('w14', 'sogo-dokkai', 4, {
    material: {
      kind: 'text',
      title: '社内改善提案発表会のお知らせ',
      body: '社員各位\n\n総務部\n\n今年度の改善提案発表会を下記のとおり開催します。発表を希望するチームは、総務部までお申し込みください。\n\n記\n日時：2027年2月19日（金）13:30〜17:00\n場所：本社5階 大ホール\n持ち時間：1チーム10分（うち質疑応答3分）\n　※時間を超えた場合は、その時点で発表を打ち切ります\n申込締切：2027年1月29日（金）\n以上',
    },
    questions: [
      [
        '各チームが発表そのものに使える時間は、最長で何分ですか。',
        ['7分', '10分', '3分', '13分'],
        0,
        'Mỗi đội có 10 phút, trong đó 3 phút là hỏi đáp (うち質疑応答3分), nên phần trình bày tối đa 10 − 3 = 7 phút → lựa chọn 1. Lựa chọn 2 dễ nhầm vì là toàn bộ thời gian của đội, đã gồm phần hỏi đáp. 13 phút là cộng nhầm hai số.',
      ],
    ],
    points: [
      ['持ち時間', 'もちじかん', 'thời lượng được giao'],
      ['打ち切る', 'うちきる', 'cắt ngang, dừng'],
    ],
  }),
];

import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/** Week 10 — contracts, quotations and delivery (reading). Level: J1. */
export const W10: BjtItem[] = [
  item('w10', 'goi', 1, {
    questions: [
      [
        '本契約の有効期間は一年とし、期間満了の一か月前までにいずれの当事者からも書面による申し出がない＿＿＿、同一条件でさらに一年間更新されるものとする。',
        ['限り', 'うちに', 'ものの', 'ばかりか'],
        0,
        'Câu 1: ～ない限り = trừ khi, chừng nào chưa…; mẫu điều khoản tự động gia hạn trong hợp đồng. Câu 2 (～ないうちに, trước khi kịp…) cũng đi với phủ định nên dễ chọn, nhưng nói về thời điểm hành động, không nêu điều kiện. ものの (tuy… nhưng) và ばかりか (không chỉ…) không hợp nghĩa.',
      ],
    ],
    points: [
      ['期間満了', 'きかんまんりょう', 'hết thời hạn'],
      ['当事者', 'とうじしゃ', 'các bên (của hợp đồng)'],
      ['～ない限り', 'ないかぎり', 'trừ khi, chừng nào chưa'],
    ],
  }),
  item('w10', 'goi', 2, {
    questions: [
      [
        '納品物に契約内容と＿＿＿する点が見つかった場合は、受領後七日以内に書面で通知するものとする。',
        ['相当', '該当', '一致', '相違'],
        3,
        'Câu 4: AとBが相違する = A và B khác nhau; điều khoản yêu cầu báo khi hàng giao khác với hợp đồng. Câu 3 (一致, trùng khớp) đúng ngữ pháp nhưng nghĩa ngược: chỗ khớp thì không cần báo. 該当する đi với に (～に該当する), 相当する nghĩa là tương đương.',
      ],
    ],
    points: [
      ['相違', 'そうい', 'khác biệt, sai khác'],
      ['受領', 'じゅりょう', 'nhận (hàng, giấy tờ)'],
    ],
  }),
  item('w10', 'goi', 3, {
    questions: [
      [
        '先方との条件が＿＿＿次第、契約書の案をお送りいたします。',
        ['決め', '整え', 'まとまり', 'まとめ'],
        2,
        'Câu 3: chủ ngữ là 条件が nên cần tự động từ まとまる (được thống nhất, chốt xong). Câu 4 (まとめ) là tha động từ cùng cặp, phải nói 条件をまとめ. 決める, 整える cũng là tha động từ, không đi với が ở đây.',
      ],
    ],
    points: [
      ['まとまる', 'まとまる', '(thoả thuận) được chốt, thống nhất'],
      ['～次第', 'しだい', 'ngay khi … (thì)'],
    ],
  }),
  item('w10', 'goi', 4, {
    questions: [
      [
        '貴社のご要望を詳しく＿＿＿うえで、改めてお見積もりを提出いたします。',
        ['伺った', 'おっしゃった', 'お聞きになった', '申し上げた'],
        0,
        'Câu 1: người nghe yêu cầu là mình (phía bán), nên dùng khiêm nhường ngữ 伺う (= 聞く). Câu 3 (お聞きになった) là tôn kính ngữ, đề cao chính mình nên sai hướng. おっしゃる là hành động của đối tác, trong khi ～たうえで đòi hai vế cùng chủ ngữ (vế sau 提出いたします là mình); 申し上げる là "mình nói", không phải "nghe yêu cầu".',
      ],
    ],
    points: [
      ['伺う', 'うかがう', 'hỏi, nghe (khiêm nhường ngữ); đến thăm'],
      ['～たうえで', 'たうえで', 'sau khi đã … rồi mới'],
    ],
  }),
  item('w10', 'goi', 5, {
    questions: [
      [
        '先方の正式な承認が得られない＿＿＿、発注書を発行することはできない。',
        ['ものなら', 'からといって', 'ことには', 'とはいえ'],
        2,
        'Câu 3: ～ないことには…ない = nếu chưa … thì không thể …; điều kiện tiên quyết. Câu 1 (～ものなら) dễ nhầm vì cũng là giả định, nhưng đi với thể ý chí hoặc khả năng (できるものなら) và vế sau thường là lời mong muốn hay hậu quả xấu. からといって và とはいえ là nhượng bộ, không hợp.',
      ],
    ],
    points: [
      ['～ないことには', 'ないことには', 'nếu chưa … thì không'],
      ['発注書', 'はっちゅうしょ', 'đơn đặt hàng'],
    ],
  }),
  item('w10', 'goi', 6, {
    questions: [
      [
        'お支払い条件は、従来どおり月末締め翌月末＿＿＿とさせていただきます。',
        ['渡し', '納め', '送り', '払い'],
        3,
        'Câu 4: 月末締め翌月末払い = chốt sổ cuối tháng, thanh toán cuối tháng sau; cách ghi điều kiện thanh toán cố định. Câu 1 (渡し) có trong 工場渡し, 現金渡し nhưng nói về nơi hoặc cách giao, không phải hạn trả tiền. 納め và 送り không dùng trong cụm này.',
      ],
    ],
    points: [
      ['締め', 'しめ', 'chốt sổ (ngày khoá số liệu)'],
      ['従来どおり', 'じゅうらいどおり', 'như trước đến nay'],
    ],
  }),
  item('w10', 'hyogen', 1, {
    material: {
      kind: 'text',
      body: '（取引先へのメールで）\n契約書の案を添付いたしましたので、恐れ入りますが内容を＿＿＿。',
    },
    questions: [
      [
        '空欄に入る最も適当なものはどれですか。',
        ['ご確認させてください', 'ご確認ください', 'ご確認してください', '拝見してください'],
        1,
        'Người kiểm tra là khách, nên nhờ bằng ご＋danh từ＋ください: ご確認ください → lựa chọn 2. Lựa chọn 3 ご確認してください dễ nhầm vì rất hay nghe, nhưng ご～する là khiêm nhường ngữ, không dùng cho hành động của khách. Lựa chọn 1 nghĩa là "xin cho tôi kiểm tra" (sai chủ thể), 拝見 là khiêm nhường ngữ.',
      ],
    ],
    points: [
      ['添付する', 'てんぷする', 'đính kèm'],
      ['契約書の案', 'けいやくしょのあん', 'bản dự thảo hợp đồng'],
    ],
  }),
  item('w10', 'hyogen', 2, {
    material: {
      kind: 'text',
      body: '（取引先への依頼）\n万一、納期に遅れが＿＿＿、速やかにご連絡いただけますようお願いいたします。',
    },
    questions: [
      [
        '空欄に入る最も適当なものはどれですか。',
        ['生じたところで', '生じるからには', '生じた場合でも', '生じる場合は'],
        3,
        'Câu nêu điều kiện "nếu chậm hạn giao thì xin báo ngay": 生じる場合は → lựa chọn 4. Lựa chọn 3 dễ nhầm vì cũng có 場合, nhưng でも nghĩa là "dù có… vẫn", ngược với ý nhờ báo khi có chậm trễ. ～たところで (dù có… cũng vô ích) và ～からには (một khi đã… thì phải) không đi với lời nhờ vả này.',
      ],
    ],
    points: [
      ['万一', 'まんいち', 'nếu chẳng may'],
      ['速やかに', 'すみやかに', 'nhanh chóng'],
    ],
  }),
  item('w10', 'hyogen', 3, {
    material: {
      kind: 'text',
      body: 'A（取引先）：支払い条件を、翌々月末払いに変えていただけませんか。\nB：誠に申し訳ございませんが、その条件は＿＿＿。',
    },
    questions: [
      [
        '空欄に入る最も適当なものはどれですか。',
        ['お受けしかねません', 'お引き受けくださいません', 'お受けいたしかねます', 'お受けになりかねます'],
        2,
        'Mình từ chối điều kiện của khách: khiêm nhường いたす + かねる (không thể) → お受けいたしかねます, lựa chọn 3. Lựa chọn 1 dễ nhầm vì giống mặt chữ, nhưng ～かねません nghĩa là "có thể sẽ…", thành ra không phải lời từ chối. お受けになる là tôn kính ngữ cho hành động của khách; ～くださいません là khách làm cho mình, sai chủ thể.',
      ],
    ],
    points: [
      ['翌々月末', 'よくよくげつまつ', 'cuối tháng thứ hai sau đó'],
      ['いたしかねる', 'いたしかねる', 'không thể làm (từ chối trang trọng)'],
    ],
  }),
  item('w10', 'sogo-dokkai', 1, {
    material: {
      kind: 'text',
      title: 'お見積書送付のご案内',
      body: '株式会社さくら印刷\n資材課 遠藤様\n\nいつもお世話になっております。\nご依頼いただきました梱包用段ボール箱（4,000枚）のお見積書を添付いたしましたので、ご査収ください。\n\n記\n品名：段ボール箱（A4サイズ用）\n単価（税別）：\n　5,000枚以上　82円\n　3,000枚以上5,000枚未満　88円\n　3,000枚未満　95円\n有効期限：2026年12月16日（水）\n以上\n\nなお、期限を過ぎますと、原紙価格の変動により単価が変わる場合がございます。',
    },
    questions: [
      [
        'ご依頼の数量で注文した場合、税別の合計金額はいくらですか。',
        ['352,000円', '328,000円', '380,000円', '410,000円'],
        0,
        '4.000 tấm thuộc bậc "từ 3.000 đến dưới 5.000" nên đơn giá 88 yên: 4.000 × 88 = 352.000 yên → lựa chọn 1. Lựa chọn 2 dễ nhầm vì lấy đơn giá 82 yên của bậc từ 5.000 tấm. Lựa chọn 3 lấy giá 95 yên của bậc dưới 3.000, lựa chọn 4 là 5.000 × 82.',
      ],
    ],
    points: [
      ['ご査収ください', 'ごさしゅうください', 'xin kiểm tra và nhận'],
      ['未満', 'みまん', 'dưới, chưa tới'],
      ['梱包', 'こんぽう', 'đóng gói'],
    ],
  }),
  item('w10', 'sogo-dokkai', 2, {
    material: {
      kind: 'text',
      title: '契約書ご返送のお願い',
      body: '前略　先日は、倉庫賃貸借契約の締結につきご快諾いただき、誠にありがとうございました。\nさっそくですが、契約書2通を同封いたしましたので、内容をご確認のうえ、2通とも記名・押印をお願いいたします。そのうち1通を、同封の返信用封筒にて2026年12月11日（金）までにご返送ください。もう1通は貴社にてお控えとして保管願います。\nなお、ご不明な点がございましたら、担当の松本までお問い合わせください。\n草々',
    },
    questions: [
      [
        '受け取った会社がしなければならないことは何ですか。',
        ['2通に押印し、2通とも返送する', '1通だけに押印して、それを返送する', '2通に押印し、うち1通を返送する', '内容を確認し、松本さんに電話する'],
        2,
        'Ký tên đóng dấu cả hai bản, gửi lại một bản trước 11/12 và giữ một bản (お控え) → lựa chọn 3. Lựa chọn 1 dễ nhầm vì đúng phần đóng dấu cả hai bản, nhưng chỉ gửi lại một bản. Gọi cho 松本 chỉ khi có chỗ chưa rõ, không phải việc bắt buộc.',
      ],
    ],
    points: [
      ['ご快諾', 'ごかいだく', 'sự vui lòng nhận lời'],
      ['記名押印', 'きめいおういん', 'ghi tên và đóng dấu'],
      ['お控え', 'おひかえ', 'bản lưu'],
    ],
  }),
  item('w10', 'sogo-dokkai', 3, {
    material: {
      kind: 'text',
      title: '納品受付時間変更のお知らせ',
      body: 'お取引先各位\n\n平素より格別のお引き立てを賜り、厚く御礼申し上げます。\nこのたび、物流センターの検品体制を見直すため、2027年1月5日（火）より納品の受付時間を下記のとおり変更いたします。\n\n記\n・受付時間：午前9時〜午後4時（従来は午後5時まで）\n・午後4時を過ぎて到着した納品は、翌営業日の受付扱いとさせていただきます。\n・納品書は、当日の受付時に必ずご提出ください。\n以上\n\nご不便をおかけしますが、何卒ご協力のほどお願い申し上げます。',
    },
    questions: [
      [
        '1月5日以降、その日の受付として扱ってもらうには、何時までに着けばよいですか。',
        ['午後5時', '午前9時', '正午', '午後4時'],
        3,
        'Phần 記: nhận hàng từ 9 giờ đến 4 giờ chiều; đến sau 4 giờ thì tính sang ngày làm việc hôm sau → lựa chọn 4. Lựa chọn 1 dễ nhầm vì 5 giờ chiều là giờ cũ (従来), từ 5/1 không còn. 9 giờ sáng là giờ bắt đầu nhận, không phải giờ muộn nhất.',
      ],
    ],
    points: [
      ['検品', 'けんぴん', 'kiểm hàng'],
      ['翌営業日', 'よくえいぎょうび', 'ngày làm việc tiếp theo'],
      ['納品書', 'のうひんしょ', 'phiếu giao hàng'],
    ],
  }),
  item('w10', 'sogo-dokkai', 4, {
    material: {
      kind: 'text',
      title: '契約条項の追加について',
      body: '株式会社大成建材\n法務部 小田様\n\nいつもお世話になっております。\nご提案いただいた、納期遅延時の違約金条項を基本契約書に加える件につきまして、社内で検討いたしました。\n誠に恐縮ながら、天候による輸送の遅れなど、当社で管理できない事情も含まれるため、現在の案のままでは承諾いたしかねます。\nただし、当社の責任による遅延に限っていただけるのであれば、前向きに検討いたしますので、条文の修正案をお送りいただけますでしょうか。',
    },
    questions: [
      [
        'このメールの主な目的は何ですか。',
        ['違約金条項を、今の案のまま受け入れること', '今の案は断り、範囲を絞った案を求めること', '天候による遅れも違約金の対象にすること', '違約金条項の追加を、全面的に断ること'],
        1,
        'Dự thảo hiện tại thì 承諾いたしかねます (từ chối khéo), nhưng nếu chỉ giới hạn ở chậm trễ do lỗi bên mình thì sẽ xem xét, nên xin gửi bản sửa → lựa chọn 2. Lựa chọn 4 dễ nhầm vì thư có từ chối, nhưng chỉ từ chối bản hiện tại chứ không bác hẳn điều khoản. Chậm do thời tiết chính là phần người viết muốn loại ra.',
      ],
    ],
    points: [
      ['違約金', 'いやくきん', 'tiền phạt vi phạm hợp đồng'],
      ['条文', 'じょうぶん', 'câu chữ điều khoản'],
      ['承諾する', 'しょうだくする', 'chấp thuận'],
    ],
  }),
];

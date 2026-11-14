import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/** Week 6 — internal documents and notices (reading). Level: J1. */
export const W06: BjtItem[] = [
  item('w06', 'goi', 1, {
    questions: [
      [
        '本規程は、来年4月1日より＿＿＿する。',
        ['執行', '施行', '発行', '履行'],
        1,
        'Quy định, luật bắt đầu có hiệu lực là 施行する (câu 2), câu cố định ở cuối văn bản quy định. Câu 1 執行 dễ nhầm vì cũng là "thi hành", nhưng dùng cho bản án, ngân sách, nghiệp vụ (予算を執行する). 発行 là phát hành giấy tờ, 履行 là thực hiện nghĩa vụ hợp đồng.',
      ],
    ],
    points: [
      ['施行する', 'しこうする', 'đưa vào thi hành (quy định)'],
      ['規程', 'きてい', 'quy định nội bộ'],
      ['履行する', 'りこうする', 'thực hiện (nghĩa vụ)'],
    ],
  }),
  item('w06', 'goi', 2, {
    questions: [
      [
        '申請書に不備があったため、経理部から書類が＿＿＿きた。',
        ['差し戻して', '差し戻されて', '差し出して', '差し込んで'],
        1,
        'Chủ ngữ là 書類が, hồ sơ bị phòng kế toán trả lại, nên cần thể bị động 差し戻されてきた (câu 2). Câu 1 dễ nhầm vì đúng động từ, nhưng thể chủ động cần chủ ngữ là phòng kế toán và tân ngữ 書類を (経理部が書類を差し戻してきた). 差し出す = nộp, đưa ra; 差し込む = cắm vào.',
      ],
    ],
    points: [
      ['差し戻す', 'さしもどす', 'trả lại (hồ sơ để sửa)'],
      ['不備', 'ふび', 'thiếu sót (giấy tờ)'],
    ],
  }),
  item('w06', 'goi', 3, {
    questions: [
      [
        '個人情報を含む書類の社外への持ち出しは、＿＿＿禁止とする。',
        ['原則として', '概して', 'おおむね', '一概に'],
        0,
        'Văn bản quy định nói "về nguyên tắc cấm" (còn chừa ngoại lệ) bằng 原則として (câu 1). Câu 3 おおむね dễ nhầm vì cũng có nghĩa "đại thể", nhưng dùng để mô tả mức độ (おおむね良好), không dùng cho một điều cấm. 概して = nhìn chung (nhận xét). 一概に phải đi với phủ định (一概には言えない).',
      ],
    ],
    points: [
      ['持ち出し', 'もちだし', 'mang ra ngoài'],
      ['一概に', 'いちがいに', 'một cách vơ đũa (đi với phủ định)'],
    ],
  }),
  item('w06', 'goi', 4, {
    questions: [
      [
        '変更点の詳細につきましては、別紙をご＿＿＿ください。',
        ['拝見', '拝読', '参考', '参照'],
        3,
        'Nhờ người đọc xem tài liệu kèm theo là ご参照ください (câu 4). Câu 1 và 2 là khiêm nhường ngữ cho hành động của chính mình (拝見します, 拝読しました), dùng với ご～ください là sai chiều kính ngữ. Câu 3 dễ nhầm vì nghĩa gần, nhưng 参考 không làm động từ kiểu này; phải nói ご参考までに hoặc ご参考になさってください.',
      ],
    ],
    points: [
      ['別紙', 'べっし', 'tài liệu đính kèm riêng'],
      ['参照する', 'さんしょうする', 'tham chiếu, xem'],
    ],
  }),
  item('w06', 'goi', 5, {
    questions: [
      [
        '出張旅費の精算は、帰着後1週間以内に行うこと。期限を過ぎた＿＿＿、精算を受け付けないことがある。',
        ['場合には', 'ところで', '末に', 'ものなら'],
        0,
        'Câu quy định nêu điều kiện: nếu quá hạn thì có thể không nhận → 場合には (câu 1). Câu 4 dễ nhầm vì cũng là điều kiện, nhưng ～ものなら đi với thể ý chí và hậu quả nặng (遅れようものなら), không hợp với văn bản quy định. ところで (dù có… cũng) cần vế sau là kết quả vô ích; 末に = sau một quá trình dài.',
      ],
    ],
    points: [
      ['精算', 'せいさん', 'quyết toán (chi phí)'],
      ['帰着', 'きちゃく', 'về tới nơi'],
    ],
  }),
  item('w06', 'goi', 6, {
    questions: [
      [
        '新しい勤怠管理システムへの＿＿＿に伴い、従来の紙の出勤簿は廃止します。',
        ['移転', '推移', '移行', '移動'],
        2,
        'Chuyển từ hệ thống, chế độ cũ sang cái mới là 移行 (câu 3). Câu 1 移転 dễ nhầm vì cùng chữ 移, nhưng là chuyển địa điểm (本社の移転). 推移 là diễn biến theo thời gian; 移動 là di chuyển vật hay người.',
      ],
    ],
    points: [
      ['移行', 'いこう', 'chuyển sang (chế độ mới)'],
      ['勤怠管理', 'きんたいかんり', 'quản lý chấm công'],
      ['に伴い', 'にともない', 'cùng với, kéo theo'],
    ],
  }),
  item('w06', 'hyogen', 1, {
    material: { kind: 'text', body: '（社内通知）工事のため、来週月曜は正面玄関が使えません。皆様には＿＿＿が、通用口をご利用ください。' },
    questions: [
      [
        '空欄に入る最も適当な表現はどれですか。',
        ['ご迷惑をおかけしました', 'ご不便をおかけします', 'ご不便をおかけになります', 'ご不便をさせていただきます'],
        1,
        'Đáp án là lựa chọn 2. Việc đóng cửa chính chưa xảy ra (tuần sau), nên câu xin lỗi trước dùng thì hiện tại: ご不便をおかけします. Lựa chọn 1 dễ nhầm nhất vì cũng là câu xin lỗi quen thuộc, nhưng thì quá khứ chỉ dùng sau khi sự việc đã xảy ra. Lựa chọn 3 tôn kính hành động của chính mình, lựa chọn 4 không phải cách nói có thật.',
      ],
    ],
    points: [
      ['ご不便をおかけします', 'ごふべんをおかけします', 'xin lỗi vì sẽ gây bất tiện'],
      ['正面玄関', 'しょうめんげんかん', 'cửa chính'],
      ['通用口', 'つうようぐち', 'cửa phụ (lối đi của nhân viên)'],
    ],
  }),
  item('w06', 'hyogen', 2, {
    material: { kind: 'text', body: '（社内通知の書き出し）＿＿＿　12月の大掃除の分担が決まりましたので、お知らせします。' },
    questions: [
      [
        '空欄に入る最も適当な表現はどれですか。',
        ['社員各位', '社員各位様', '社員各位殿', '社員各位の皆様'],
        0,
        'Đáp án là lựa chọn 1. 各位 đã mang nghĩa kính trọng "các vị", nên chỉ viết 社員各位. Lựa chọn 2 dễ nhầm nhất: thêm 様 sau 各位 là thừa kính ngữ, một lỗi rất hay gặp trong thông báo. 殿 ở lựa chọn 3 cũng thừa như vậy, còn 各位の皆様 lặp nghĩa hai lần.',
      ],
    ],
    points: [
      ['各位', 'かくい', 'các vị, mọi người (văn bản)'],
      ['分担', 'ぶんたん', 'phân công'],
      ['大掃除', 'おおそうじ', 'tổng vệ sinh'],
    ],
  }),
  item('w06', 'hyogen', 3, {
    material: { kind: 'text', body: 'A（他部署の社員）：出張の新しい申請書は、どこでもらえますか。\nB（総務部）：社内サイトの総務部のページから＿＿＿。' },
    questions: [
      [
        '空欄に入る最も適当な表現はどれですか。',
        ['印刷させていただけます', '印刷してさしあげます', '印刷なさいます', '印刷していただけます'],
        3,
        'Đáp án là lựa chọn 4. Người in là người hỏi, nên B nói 印刷していただけます (có thể tự in từ trang đó). Lựa chọn 1 dễ nhầm nhất vì させていただく nghe rất lễ phép, nhưng nghĩa là "tôi được phép in", sai chủ thể. Lựa chọn 2 là mình in giùm với giọng ban ơn, lựa chọn 3 khẳng định thay việc người khác sẽ làm, không trả lời câu hỏi.',
      ],
    ],
    points: [
      ['申請書', 'しんせいしょ', 'đơn đề nghị'],
      ['他部署', 'たぶしょ', 'bộ phận khác'],
    ],
  }),
  item('w06', 'sogo-dokkai', 1, {
    material: {
      kind: 'text',
      title: '定時株主総会の運営協力のお願い',
      body: '各部長\n\n総務部　株式課\n\n2027年3月26日（金）に開催予定の第48回定時株主総会について、例年どおり各部に運営へのご協力をお願いいたします。\n今年は会場を本社大会議室から近隣の市民ホールに移すため、受付・案内の人数が昨年より増える見込みです。つきましては、各部から2名ずつスタッフとなる社員を選び、2月12日（金）までに株式課へお知らせください。\n選ばれた方には、3月中旬に事前説明会を行います。',
    },
    questions: [
      [
        'このメールの目的は何ですか。',
        ['株主総会の会場が変わったことを各部に知らせる', '事前説明会への出席を各部の部長に求める', '総会の運営を手伝う社員を出してほしいと頼む', '受付と案内の担当の決め方を各部に説明する'],
        2,
        'Đáp án là lựa chọn 3. Sau つきましては, phòng cổ phần nhờ mỗi bộ phận chọn 2 nhân viên phục vụ đại hội cổ đông và báo lại trước 12/2/2027. Lựa chọn 1 dễ nhầm nhất vì việc đổi hội trường có trong thư, nhưng đó chỉ là lý do cần thêm người. Buổi giải thích trước dành cho người được chọn, không phải cho trưởng bộ phận (lựa chọn 2).',
      ],
    ],
    points: [
      ['定時株主総会', 'ていじかぶぬしそうかい', 'đại hội cổ đông thường niên'],
      ['例年どおり', 'れいねんどおり', 'như mọi năm'],
      ['近隣', 'きんりん', 'lân cận'],
    ],
  }),
  item('w06', 'sogo-dokkai', 2, {
    material: {
      kind: 'text',
      title: '非常用備蓄品の入れ替えについて',
      body: '社員各位\n\n総務部\n\n各自の机に保管している非常用持ち出し袋のうち、飲料水と保存食の賞味期限が2027年1月で切れます。新しい品は、各フロアの総務担当者が12月14日（月）から18日（金）までに配布します。不在などで受け取れなかった方は、21日（月）以降に総務部まで取りに来てください。\n新しい品を受け取った後、古い品は12月25日（金）までに各フロアの回収箱に入れてください。',
    },
    questions: [
      [
        '古い飲料水と保存食は、いつまでに回収箱に入れなければなりませんか。',
        ['2027年1月の賞味期限まで', '12月18日（金）まで', '12月21日（月）まで', '12月25日（金）まで'],
        3,
        'Đáp án là lựa chọn 4. Câu cuối yêu cầu bỏ đồ cũ vào thùng thu hồi trước 25/12/2026. Lựa chọn 2 dễ nhầm nhất vì 18/12 cũng là một mốc trong thư, nhưng đó là ngày cuối phát đồ mới. Ngày 21/12 là ngày bắt đầu tự đến phòng tổng vụ nhận đồ, còn tháng 1/2027 là hạn sử dụng (lựa chọn 1).',
      ],
    ],
    points: [
      ['備蓄品', 'びちくひん', 'đồ dự trữ'],
      ['賞味期限', 'しょうみきげん', 'hạn dùng ngon nhất'],
      ['回収', 'かいしゅう', 'thu hồi'],
    ],
  }),
  item('w06', 'sogo-dokkai', 3, {
    material: {
      kind: 'text',
      title: '資格取得支援制度の改定について',
      body: '社員各位\n\n人事部\n\n社員の能力開発を進めるため、2027年4月から資格取得支援制度を下記のとおり改めます。\n\n記\n1. 受験料：合格した場合は全額を会社が負担（不合格の場合は半額）\n2. 奨励金：指定資格の合格者に支給（簿記2級2万円、簿記1級5万円、衛生管理者3万円）\n3. 申請：合格証の写しを添えて、合格発表から1か月以内に人事部へ提出\n※2027年3月以前に受験した試験は対象外です。',
    },
    questions: [
      [
        '2027年5月に簿記2級を受験して不合格だった場合、会社から受けられるものはどれですか。',
        ['受験料の半額のみ', '受験料の全額のみ', '受験料の半額と2万円', '何も受けられない'],
        0,
        'Đáp án là lựa chọn 1. Theo mục 1 của 記, thi trượt thì công ty trả một nửa lệ phí thi; tiền khuyến khích ở mục 2 chỉ dành cho người đỗ. Lựa chọn 3 dễ nhầm nhất vì ghép đúng nửa lệ phí với khoản 2 vạn yên của 簿記2級, nhưng khoản này phải đỗ mới có. Kỳ thi tháng 5/2027 nằm sau khi chế độ có hiệu lực (tháng 4), nên lựa chọn 4 sai.',
      ],
    ],
    points: [
      ['資格取得', 'しかくしゅとく', 'lấy chứng chỉ'],
      ['奨励金', 'しょうれいきん', 'tiền khuyến khích'],
      ['受験料', 'じゅけんりょう', 'lệ phí thi'],
      ['改定', 'かいてい', 'sửa đổi (quy định)'],
    ],
  }),
  item('w06', 'sogo-dokkai', 4, {
    material: {
      kind: 'text',
      title: '贈答品ご辞退のお願い',
      body: 'お取引先各位\n\n株式会社東邦テクノ\n\n拝啓　時下ますますご清栄のこととお慶び申し上げます。平素は格別のご高配を賜り、厚く御礼申し上げます。\nさて、弊社では公正な取引を一層徹底するため、2027年1月より、お取引先様からのお中元・お歳暮などの贈答品を、すべてご辞退申し上げることといたしました。何卒ご理解賜りますようお願い申し上げます。\nなお、弊社からお送りしている年末のご挨拶の品も、本年をもって控えさせていただきます。\n敬具',
    },
    questions: [
      [
        'このお知らせで、東邦テクノが取引先に求めていることは何ですか。',
        ['年末の挨拶の品を受け取ってほしい', '来年からは贈答品を送らないでほしい', '取引の条件の見直しに応じてほしい', 'お歳暮の送り先を変えてほしい'],
        1,
        'Đáp án là lựa chọn 2. Câu sau さて cho biết từ tháng 1/2027 công ty từ chối mọi quà biếu (ご辞退申し上げる), tức là khéo léo xin đối tác đừng gửi quà nữa. Lựa chọn 1 dễ nhầm nhất vì quà cuối năm có nhắc trong thư, nhưng đó là quà công ty mình gửi đi và cũng sẽ dừng. Thư không nói đổi điều kiện giao dịch hay đổi địa chỉ nhận quà.',
      ],
    ],
    points: [
      ['贈答品', 'ぞうとうひん', 'quà biếu'],
      ['辞退', 'じたい', 'từ chối nhận, rút lui'],
      ['公正', 'こうせい', 'công bằng, minh bạch'],
      ['お歳暮', 'おせいぼ', 'quà biếu cuối năm'],
    ],
  }),
];

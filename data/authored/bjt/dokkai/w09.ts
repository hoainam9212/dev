import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/** Week 9 — complaints and apologies (reading). Level: J1. */
export const W09: BjtItem[] = [
  item('w09', 'goi', 1, {
    questions: [
      [
        'このたびは弊社の＿＿＿により、多大なるご迷惑をおかけいたしましたこと、心よりお詫び申し上げます。',
        ['不手際', '不得手', '不具合', '不調法'],
        0,
        'Câu 1: 不手際 = sơ suất trong cách làm, cách xử lý; doanh nghiệp xin lỗi vì 弊社の不手際 là cụm cố định. Câu 3 (不具合) dễ nhầm nhất nhưng chỉ dùng cho máy móc, sản phẩm bị trục trặc, không dùng cho "công ty". 不得手 là sở đoản, không giỏi việc gì (英語が不得手だ), không làm nguyên nhân gây phiền được. 不調法 là vụng về, cổ và không hợp văn xin lỗi doanh nghiệp.',
      ],
    ],
    points: [
      ['不手際', 'ふてぎわ', 'sơ suất trong xử lý công việc'],
      ['多大なる', 'ただいなる', 'rất lớn (văn trang trọng)'],
    ],
  }),
  item('w09', 'goi', 2, {
    questions: [
      [
        '今後は出荷前のチェック体制を＿＿＿、再発防止に努めてまいります。',
        ['改まり', '整い', '収まり', '改め'],
        3,
        'Câu 4: 体制を改める — có trợ từ を nên cần tha động từ 改める (sửa đổi). Câu 1 (改まり) là tự động từ cùng cặp, dùng khi chủ ngữ tự thay đổi (体制が改まる), nên sai với を. 整う, 収まる cũng là tự động từ.',
      ],
    ],
    points: [
      ['改める', 'あらためる', 'sửa đổi, cải tổ (tha động từ)'],
      ['再発防止', 'さいはつぼうし', 'ngăn tái diễn'],
    ],
  }),
  item('w09', 'goi', 3, {
    questions: [
      [
        'お送りいただいた破損箇所の写真は、品質管理部の担当者がすでに＿＿＿。',
        ['拝見いたしました', 'ご覧になりました', 'お目にかかりました', '拝見なさいました'],
        0,
        'Câu 1: người xem là nhân viên phía mình, nói với khách nên dùng khiêm nhường ngữ 拝見いたしました. Câu 2 là tôn kính ngữ, đề cao người phía mình trước mặt khách là sai hướng kính ngữ. Câu 4 ghép khiêm nhường (拝見) với tôn kính (なさる) nên sai. お目にかかる là "gặp", không phải "xem".',
      ],
    ],
    points: [
      ['拝見する', 'はいけんする', 'xem (khiêm nhường ngữ)'],
      ['破損箇所', 'はそんかしょ', 'chỗ bị hư hỏng'],
    ],
  }),
  item('w09', 'goi', 4, {
    questions: [
      [
        'お客様からいただいた貴重なご意見は、今後のサービス向上の＿＿＿とさせていただきます。',
        ['餌', '肥', '糧', '種'],
        2,
        'Câu 3: ～を糧とする = lấy làm "lương thực", động lực để tiến bộ; cụm cố định khi nhận góp ý. Câu 2 (肥, phân bón) cũng là ẩn dụ "nuôi lớn" nên dễ chọn, nhưng tiếng Nhật không nói 向上の肥とする. 餌 (mồi) và 種 (hạt giống) không dùng trong mẫu câu này.',
      ],
    ],
    points: [
      ['糧', 'かて', 'nguồn nuôi dưỡng, động lực (nghĩa bóng)'],
      ['向上', 'こうじょう', 'nâng cao, cải thiện'],
    ],
  }),
  item('w09', 'goi', 5, {
    questions: [
      [
        '確認の手順を省けば、同じようなミスがまた起こり＿＿＿。',
        ['えません', 'かねます', 'ようがありません', 'かねません'],
        3,
        'Câu 4: Vます + かねない = có nguy cơ (điều xấu) xảy ra; đúng ý "bỏ bước kiểm tra thì lỗi có thể lặp lại". Câu 2 (かねます) là dạng khẳng định, nghĩa ngược hẳn: "khó mà / không thể làm" (lời từ chối lịch sự). Câu 1 (起こりえません) là "không thể xảy ra", trái ý. Câu 3 là "không có cách nào".',
      ],
    ],
    points: [
      ['～かねない', 'かねない', 'có nguy cơ (điều xấu xảy ra)'],
      ['省く', 'はぶく', 'lược bỏ'],
    ],
  }),
  item('w09', 'goi', 6, {
    questions: [
      [
        'ご迷惑をおかけしたお詫びの＿＿＿として、次回ご利用時に使える割引券を同封いたしました。',
        ['しるし', 'あかし', 'きざし', 'めじるし'],
        0,
        'Câu 1: お詫びのしるし = món quà, vật bày tỏ lời xin lỗi, cụm cố định (cũng có お礼のしるし). Câu 2 (あかし, bằng chứng) gần nghĩa "dấu hiệu" nhưng chỉ dùng như 身のあかし, 愛のあかし, không đi với お詫び. きざし là điềm báo, めじるし là mốc để nhận ra.',
      ],
    ],
    points: [
      ['お詫びのしるし', 'おわびのしるし', 'chút quà tạ lỗi'],
      ['同封する', 'どうふうする', 'gửi kèm trong phong bì'],
    ],
  }),
  item('w09', 'hyogen', 1, {
    material: {
      kind: 'text',
      body: '（不良品について、お客様に電話で謝る）\nこのたびは、弊社の不手際でご迷惑を＿＿＿、誠に申し訳ございません。',
    },
    questions: [
      [
        '空欄に入る最も適当なものはどれですか。',
        ['おかけしまして', 'おかけになりまして', 'かけさせまして', 'おかけくださいまして'],
        0,
        'Người gây phiền là công ty mình, nên dùng khiêm nhường お＋ます形＋する: ご迷惑をおかけしまして → lựa chọn 1. Lựa chọn 2 dễ nhầm vì trông lịch sự hơn, nhưng お～になる là tôn kính ngữ, biến hành động của mình thành của khách. かけさせる (bắt người khác làm) và おかけくださる (khách làm cho mình) đều sai chủ thể.',
      ],
    ],
    points: [
      ['不手際', 'ふてぎわ', 'sơ suất, xử lý vụng'],
      ['ご迷惑をおかけする', 'ごめいわくをおかけする', 'gây phiền cho (khách)'],
    ],
  }),
  item('w09', 'hyogen', 2, {
    material: {
      kind: 'text',
      body: 'A（客）：開けてしまったんですが、返品できますか。\nB：＿＿＿、開封済みの商品は返品をお受けいたしかねます。',
    },
    questions: [
      [
        '空欄に入る最も適当なものはどれですか。',
        ['お手数ですが', 'よろしければ', 'あいにくですが', 'せっかくですが'],
        2,
        'Không đáp ứng được mong muốn của khách vì quy định → câu đệm từ chối あいにくですが (rất tiếc là) → lựa chọn 3. Lựa chọn 4 せっかくですが dễ nhầm vì cũng đứng trước lời từ chối, nhưng chỉ dùng khi khước từ một lời mời, một ý tốt người kia dành cho mình; khách ở đây đang hỏi trả hàng. お手数ですが dùng khi nhờ khách làm gì, よろしければ dùng khi mời, gợi ý.',
      ],
    ],
    points: [
      ['開封済み', 'かいふうずみ', 'đã mở bao bì'],
      ['あいにく', 'あいにく', 'rất tiếc, không may'],
    ],
  }),
  item('w09', 'hyogen', 3, {
    material: {
      kind: 'text',
      body: 'A（客）：先日の不良品の件で、担当の田中さんとお話ししたいんですが。\nB：大変申し訳ございません。＿＿＿ただいま外出しております。',
    },
    questions: [
      [
        '空欄に入る最も適当なものはどれですか。',
        ['担当の田中部長は', '担当の田中は', '担当者の田中様は', '担当の田中さんは'],
        1,
        'Nói với khách về người trong công ty mình thì gọi tên trơn, không さん, không 様: 担当の田中は → lựa chọn 2. Lựa chọn 4 dễ nhầm vì khách vừa gọi 田中さん, nhưng nhân viên không được lặp lại kính xưng đó. Chức danh đặt sau tên (田中部長) cũng là kính xưng; muốn nêu chức thì nói 部長の田中. 様 cho người nhà mình là thừa.',
      ],
    ],
    points: [
      ['担当', 'たんとう', 'người phụ trách'],
      ['外出', 'がいしゅつ', 'ra ngoài'],
    ],
  }),
  item('w09', 'sogo-dokkai', 1, {
    material: {
      kind: 'text',
      title: '誤配送のお詫び',
      body: '有限会社ひまわり薬局 御中\n\n拝啓　時下ますますご清祥のこととお慶び申し上げます。\nさて、2026年11月10日にお届けいたしました衛生マスクにつきまして、ご注文の「大人用」ではなく「子ども用」をお送りしておりました。多大なご迷惑をおかけし、心よりお詫び申し上げます。\n正しい商品は本日発送いたしました。お手数ですが、誤ってお届けした商品は、同封の着払い伝票をご利用のうえ、11月30日までにご返送くださいますようお願い申し上げます。\n今後は出荷時の確認を徹底し、再発防止に努めてまいります。\n敬具',
    },
    questions: [
      [
        'ひまわり薬局がしなければならないことは何ですか。',
        ['正しい商品を、着払いで発送し直す', '子ども用のマスクを改めて注文する', '出荷時の確認方法を見直して報告する', '子ども用を30日までに送り返す'],
        3,
        'Hàng đúng đã được gửi; người nhận chỉ cần dùng phiếu gửi trả cước kèm theo để trả lại khẩu trang trẻ em trước 30/11 (ご返送くださいますよう) → lựa chọn 4. Lựa chọn 1 dễ nhầm vì có 着払い, nhưng gửi lại hàng đúng là việc của người viết và đã làm rồi. Kiểm tra khi xuất hàng (lựa chọn 3) cũng là việc của công ty gửi thư.',
      ],
    ],
    points: [
      ['着払い', 'ちゃくばらい', 'cước do bên nhận hàng trả'],
      ['再発防止', 'さいはつぼうし', 'ngăn tái diễn'],
      ['徹底する', 'てっていする', 'làm triệt để'],
    ],
  }),
  item('w09', 'sogo-dokkai', 2, {
    material: {
      kind: 'text',
      title: 'ご返金のご要望について',
      body: '松井様\n\nこのたびは、2026年11月7日の「秋の工場見学ツアー」が台風のため中止となり、ご期待に沿えず誠に申し訳ございませんでした。\nご要望いただきました交通費のご返金につきましては、規約上、お客様ご自身でご手配された交通費は対象外となっており、お応えいたしかねます。何卒ご了承ください。\nなお、参加費3,000円は全額ご返金いたします。また、次回のツアーは優先してご案内させていただきます。\n\n東和ビール株式会社 お客様相談室',
    },
    questions: [
      [
        'このメールの主な目的は何ですか。',
        ['交通費は返金できないと、丁寧に伝えること', '参加費と交通費を返金すると知らせること', '次回ツアーに無料で招待すると伝えること', '規約を変えて交通費も対象にすると知らせること'],
        0,
        'Thư trả lời yêu cầu hoàn tiền đi lại: theo quy định không hoàn (お応えいたしかねます, từ chối khéo) → lựa chọn 1. Lựa chọn 2 dễ nhầm vì có hoàn phí tham gia 3.000 yên, nhưng phí đi lại thì không. Lần sau chỉ "ưu tiên báo" (優先してご案内), không phải mời miễn phí; quy định không đổi.',
      ],
    ],
    points: [
      ['規約', 'きやく', 'điều khoản, quy định'],
      ['対象外', 'たいしょうがい', 'nằm ngoài phạm vi áp dụng'],
      ['ご了承ください', 'ごりょうしょうください', 'mong quý khách thông cảm'],
    ],
  }),
  item('w09', 'sogo-dokkai', 3, {
    material: {
      kind: 'text',
      title: 'お客様からの苦情対応手順の変更について',
      body: '各位\n\n品質保証部\n\n苦情への初動が遅れ、お客様の不信を招いた事例が続いたことから、2026年12月1日より対応手順を下記のとおり変更します。\n\n記\n1．社内報告：受付から2時間以内に、所属長と品質保証部へ報告（従来は当日中）\n2．お客様への一次回答：受付から24時間以内（従来は3営業日以内）\n3．原因調査の結果報告：受付から10営業日以内\n以上\n\nなお、報告書の様式は社内ポータルに掲載しています。',
    },
    questions: [
      [
        '苦情を受け付けた社員は、いつまでに社内に報告しなければなりませんか。',
        ['24時間以内', 'その日のうち', '2時間以内', '3営業日以内'],
        2,
        'Mục 1 của phần 記: báo cáo nội bộ trong vòng 2 giờ kể từ khi tiếp nhận → lựa chọn 3. Lựa chọn 1 dễ nhầm vì 24 giờ là hạn trả lời lần đầu cho khách, không phải hạn báo cáo nội bộ. "Trong ngày" (lựa chọn 2) và 3 ngày làm việc (lựa chọn 4) là quy định cũ (従来).',
      ],
    ],
    points: [
      ['初動', 'しょどう', 'phản ứng ban đầu'],
      ['一次回答', 'いちじかいとう', 'trả lời bước đầu'],
      ['従来', 'じゅうらい', 'trước nay, cách cũ'],
    ],
  }),
  item('w09', 'sogo-dokkai', 4, {
    material: {
      kind: 'text',
      title: '品質問題対策会議 議事録',
      body: '日時：2026年11月16日（月）10:00〜11:00\n出席：製造部 長谷川、品質保証部 大野、営業部 北村\n\n1．議題\n株式会社ミドリ家具より指摘のあった、棚板の塗装はがれについて\n\n2．決定事項\n・製造部は、原因調査の結果を11月20日（金）までに品質保証部へ提出する。\n・品質保証部は、それをもとに再発防止策をまとめ、11月27日（金）までに営業部へ渡す（追加検査のため、当初の11月25日から延長）。\n・営業部は、再発防止策を添えたお詫び状を、12月1日（火）までに先方へ送付する。',
    },
    questions: [
      [
        '品質保証部が再発防止策を営業部に渡す期限はいつですか。',
        ['11月25日', '11月27日', '11月20日', '12月1日'],
        1,
        'Biên bản ghi phòng đảm bảo chất lượng giao biện pháp cho phòng kinh doanh trước 27/11, vì kiểm tra thêm nên đã lùi từ 25/11 → lựa chọn 2. Lựa chọn 1 dễ nhầm vì là hạn ban đầu (当初), nay đã đổi. 20/11 là hạn của phòng sản xuất, 1/12 là hạn gửi thư xin lỗi của phòng kinh doanh.',
      ],
    ],
    points: [
      ['塗装はがれ', 'とそうはがれ', 'bong lớp sơn'],
      ['決定事項', 'けっていじこう', 'các điều đã quyết'],
      ['お詫び状', 'おわびじょう', 'thư xin lỗi'],
    ],
  }),
];

import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/**
 * Full test 1 — 読解 part: 10 goi + 10 hyogen + 10 sogo-dokkai items (one question each).
 * hyogen and sogo-dokkai follow the 2026-11-14 calibration rules (spec): a one-line blank for keigo and
 * cushion phrases; short business documents asking purpose, task, deadline or a figure. Dates are in 2027
 * unless the text says otherwise. Mixed themes; about a third of the questions are J1+.
 */
export const MOCK1: BjtItem[] = [
  item('mock1', 'goi', 1, {
    questions: [
      [
        '弊社の田中が、明日の午後そちらへ＿＿＿予定です。',
        ['伺う', 'いらっしゃる', 'お越しになる', '参られる'],
        0,
        'Người đi là nhân viên công ty mình (弊社の田中) đến chỗ khách, nên dùng khiêm nhường ngữ 伺う (câu 1). Câu 2 và 3 là tôn kính ngữ, dùng cho hành động của khách. Câu 4 dễ nhầm vì có 参る (khiêm nhường) nhưng ghép thêm ～られる tôn kính, thành kính ngữ lẫn lộn.',
      ],
    ],
    points: [
      ['伺う', 'うかがう', 'đến thăm (khiêm nhường)'],
      ['弊社', 'へいしゃ', 'công ty chúng tôi'],
    ],
  }),
  item('mock1', 'goi', 2, {
    questions: [
      [
        '予算の制約上、今回は外部への委託を＿＿＿、社内で対応することにした。',
        ['見計らい', '見合わせ', '見落とし', '見込み'],
        1,
        '見合わせる = tạm thôi, tạm hoãn không làm (câu 2), hợp với "lần này tự làm trong công ty". Câu 1 見計らう là canh thời điểm (タイミングを見計らう). Câu 4 dễ nhầm vì là từ hay gặp trong văn bản, nhưng 見込む = dự tính, trông đợi, không có nghĩa thôi làm. 見落とす là bỏ sót.',
      ],
    ],
    points: [
      ['見合わせる', 'みあわせる', 'tạm hoãn, tạm không làm'],
      ['委託', 'いたく', 'uỷ thác, thuê ngoài'],
      ['制約', 'せいやく', 'ràng buộc, hạn chế'],
    ],
  }),
  item('mock1', 'goi', 3, {
    questions: [
      [
        'システムの不具合で、受注データの一部が＿＿＿しまった。',
        ['消して', 'なくして', '消えて', '失って'],
        2,
        'Chủ ngữ là データが và không có ai cố ý làm, nên cần tự động từ 消える (câu 3). Câu 1 dễ nhầm vì cùng gốc 消, nhưng 消す là tha động từ, cần ai đó xoá và tân ngữ を. なくす, 失う cũng là tha động từ (người làm mất cái gì).',
      ],
    ],
    points: [
      ['不具合', 'ふぐあい', 'trục trặc, lỗi'],
      ['受注', 'じゅちゅう', 'nhận đơn hàng'],
    ],
  }),
  item('mock1', 'goi', 4, {
    questions: [
      [
        '交渉は、双方の主張が平行線を＿＿＿まま、時間切れとなった。',
        ['歩んだ', '描いた', '引いた', '辿った'],
        3,
        '平行線をたどる = hai bên giữ nguyên lập trường, không gặp nhau (câu 4), thành ngữ cố định trong tin đàm phán. Câu 3 dễ nhầm vì "kẻ đường song song" là 平行線を引く theo nghĩa đen, không phải nghĩa bóng về đàm phán. 歩む, 描く không đi với 平行線 trong cách nói này.',
      ],
    ],
    points: [
      ['平行線をたどる', 'へいこうせんをたどる', 'không tìm được điểm chung'],
      ['時間切れ', 'じかんぎれ', 'hết giờ'],
    ],
  }),
  item('mock1', 'goi', 5, {
    questions: [
      [
        '今回の値上げは、原材料費の高騰を受けての＿＿＿措置であり、何卒ご理解を賜りたく存じます。',
        ['やむを得ない', 'やむなく', '否めない', 'ままならない'],
        0,
        'Đứng trước danh từ 措置 cần tính từ: やむを得ない措置 = biện pháp bất đắc dĩ (câu 1). Câu 2 dễ nhầm vì cùng nghĩa, nhưng やむなく là trạng từ, phải đứng trước động từ (やむなく値上げする). 否めない = không thể phủ nhận; ままならない = không như ý.',
      ],
    ],
    points: [
      ['やむを得ない', 'やむをえない', 'bất đắc dĩ, đành phải'],
      ['措置', 'そち', 'biện pháp'],
      ['賜る', 'たまわる', 'nhận được (kính ngữ cao)'],
    ],
  }),
  item('mock1', 'goi', 6, {
    questions: [
      [
        '売上の減少に＿＿＿をかけるため、来期は販促費を増額する。',
        ['拍車', '歯止め', '磨き', '手間'],
        1,
        '歯止めをかける = chặn lại đà xấu (câu 2), đúng mục đích tăng chi phí quảng bá. Câu 1 拍車をかける dễ nhầm vì cũng đi với をかける, nhưng nghĩa là thúc cho nhanh hơn, tức làm doanh thu giảm nhanh hơn. 磨きをかける là trau chuốt thêm (技術に磨きをかける), không dùng cho đà giảm; 手間をかける là tốn công.',
      ],
    ],
    points: [
      ['歯止めをかける', 'はどめをかける', 'chặn đà (xấu)'],
      ['拍車をかける', 'はくしゃをかける', 'thúc đẩy nhanh thêm'],
      ['販促費', 'はんそくひ', 'chi phí xúc tiến bán hàng'],
    ],
  }),
  item('mock1', 'goi', 7, {
    questions: [
      [
        'ご注文の品は、ご入金を確認＿＿＿発送いたします。',
        ['したとたん', 'したきり', 'し次第', 'するや否や'],
        2,
        '～次第 = ngay sau khi (việc đó xong) thì sẽ làm, dùng để hứa với khách (câu 3). Câu 4 するや否や dễ nhầm vì cũng là "vừa… thì", nhưng dùng để kể việc đã xảy ra, văn viết cứng, không dùng cho lời hứa. したとたん cũng kể chuyện bất ngờ đã xảy ra; したきり = rồi từ đó không… nữa.',
      ],
    ],
    points: [
      ['次第', 'しだい', 'ngay khi'],
      ['入金', 'にゅうきん', 'tiền về tài khoản, thanh toán'],
    ],
  }),
  item('mock1', 'goi', 8, {
    questions: [
      [
        '本日のお打ち合わせの内容を＿＿＿、改めてお見積もりをお送りいたします。',
        ['抑え', '構え', '備え', '踏まえ'],
        3,
        '～を踏まえ = dựa trên nội dung… (câu 4), hợp với việc báo giá lại sau cuộc họp. Câu 3 備え dễ nhầm vì cũng là "chuẩn bị", nhưng ～に備える là phòng bị cho một việc sắp tới (災害に備える) và đi với に, không với 内容を. 抑える (kìm lại) và 構える (dựng, giữ tư thế) không hợp nghĩa.',
      ],
    ],
    points: [
      ['踏まえる', 'ふまえる', 'dựa trên'],
      ['改めて', 'あらためて', 'lại một lần nữa (chính thức)'],
    ],
  }),
  item('mock1', 'goi', 9, {
    questions: [
      [
        'この案件は、利益こそ薄い＿＿＿、大手との取引実績を作るという意味では十分に価値がある。',
        ['ゆえに', 'どころか', 'ものの', 'だけに'],
        2,
        'Hai vế trái chiều (lãi mỏng / vẫn có giá trị) nên chọn ものの (câu 3). Câu 4 だけに dễ nhầm vì là mẫu J1 hay gặp, nhưng nghĩa là "chính vì… nên càng…", hai vế cùng chiều: 利益が薄いだけに価値がある thành vô lý. ゆえに nêu nguyên nhân; どころか phủ định vế trước.',
      ],
    ],
    points: [
      ['こそ', 'こそ', 'nhấn mạnh (thì đúng là…)'],
      ['取引実績', 'とりひきじっせき', 'thành tích giao dịch'],
      ['案件', 'あんけん', 'vụ việc, dự án'],
    ],
  }),
  item('mock1', 'goi', 10, {
    questions: [
      [
        '来期の採用人数は、業績の動向を＿＿＿判断する。',
        ['見極めたうえで', '見極めるうえで', '見極めたあげく', '見極めるまでに'],
        0,
        'Vた＋うえで = sau khi đã làm xong A thì mới B (câu 1). Câu 2 dễ nhầm vì cùng うえで, nhưng Vる＋うえで nghĩa là "trong việc…, khi làm…" (判断するうえで大切なこと), không nói thứ tự. あげく = sau bao lâu rốt cuộc (thường tiêu cực); までに chỉ hạn chót.',
      ],
    ],
    points: [
      ['見極める', 'みきわめる', 'nhìn rõ, đánh giá chắc'],
      ['動向', 'どうこう', 'xu hướng, diễn biến'],
    ],
  }),
  // 表現読解: one sentence or a short A/B exchange with a ＿＿＿ blank (spec, calibration rules 3 and 11).
  item('mock1', 'hyogen', 1, {
    questions: [
      [
        '（取引先との打ち合わせで）先ほど御社の田村部長が＿＿＿件ですが、来週までに資料をご用意いたします。',
        ['申し上げた', '申された', 'おっしゃった', 'おっしゃられた'],
        2,
        'Người nói là trưởng bộ phận của phía khách (田村部長), nên dùng tôn kính ngữ おっしゃった (lựa chọn 3). Lựa chọn 4 dễ nhầm nhất: おっしゃる đã là tôn kính, ghép thêm ～られる thành kính ngữ kép. Lựa chọn 1 là khiêm nhường ngữ, hạ thấp hành động của khách. 申される là dạng lẫn lộn khiêm nhường + tôn kính.',
      ],
    ],
    points: [
      ['おっしゃる', 'おっしゃる', 'nói (tôn kính)'],
      ['二重敬語', 'にじゅうけいご', 'kính ngữ kép'],
    ],
  }),
  item('mock1', 'hyogen', 2, {
    questions: [
      [
        '（上司に急ぎの確認を頼む）部長、＿＿＿、こちらの書類を本日中にご確認いただけますか。',
        ['お忙しいところ恐縮ですが', 'あいにくでございますが', 'お言葉に甘えまして', 'せっかくでございますが'],
        0,
        'Nhờ cấp trên làm việc gấp thì đệm bằng お忙しいところ恐縮ですが (lựa chọn 1). Lựa chọn 2 あいにく dùng khi báo tin không như ý (từ chối, vắng mặt), không dùng trước lời nhờ. Lựa chọn 4 せっかくですが dùng khi khước từ lời mời hay ý tốt của người khác. Lựa chọn 3 dùng khi nhận lời mời, không hợp ở đây.',
      ],
    ],
    points: [
      ['恐縮', 'きょうしゅく', 'ngại, áy náy (khi nhờ)'],
      ['あいにく', 'あいにく', 'không may là'],
    ],
  }),
  item('mock1', 'hyogen', 3, {
    questions: [
      [
        '（取引先へのメールの宛名）株式会社ミナト物産　営業部　＿＿＿',
        ['佐々木部長様', '御中　佐々木様', '佐々木部長御中', '部長　佐々木様'],
        3,
        'Ghi chức vụ trước tên rồi thêm 様: 部長　佐々木様 (lựa chọn 4). Lựa chọn 1 dễ nhầm nhất vì rất hay gặp, nhưng 部長 đã là cách gọi kính trọng, thêm 様 là thừa. 御中 chỉ dùng cho tổ chức, phòng ban khi không ghi tên người, nên không đi cùng 様 hay tên người (lựa chọn 2, 3).',
      ],
    ],
    points: [
      ['宛名', 'あてな', 'tên người nhận'],
      ['御中', 'おんちゅう', 'kính gửi (tổ chức, phòng ban)'],
    ],
  }),
  item('mock1', 'hyogen', 4, {
    questions: [
      [
        '（訪問先を出るとき、見送りの相手に）本日はお時間をいただき、ありがとうございました。では、＿＿＿。',
        ['お気をつけてお帰りください', 'これで失礼いたします', 'ぜひまたお越しください', 'ごゆっくりなさってください'],
        1,
        'Người nói là khách đang ra về, nên chào bằng これで失礼いたします (lựa chọn 2). Lựa chọn 1 và 3 là câu của chủ nhà nói với khách: khách nói thì ngược vai. Lựa chọn 4 là lời mời người khác cứ thong thả, cũng là câu của chủ nhà.',
      ],
    ],
    points: [
      ['見送り', 'みおくり', 'tiễn khách'],
      ['失礼いたします', 'しつれいいたします', 'xin phép (chào khi ra về)'],
    ],
  }),
  item('mock1', 'hyogen', 5, {
    questions: [
      [
        '（メールで取引先に）来週のお打ち合わせですが、ご都合のよい日時を＿＿＿でしょうか。',
        ['お知らせいただけます', 'お知らせしていただけます', 'お知らせいたせます', 'お知らせになられます'],
        0,
        'Nhờ người khác làm: お＋động từ＋いただけますでしょうか (lựa chọn 1). Lựa chọn 2 dễ nhầm nhất: お～する là khiêm nhường cho việc của mình, không ghép với いただく cho việc của khách. Lựa chọn 3 là khiêm nhường ngữ dùng cho hành động của khách. Lựa chọn 4 là kính ngữ kép (お～になる＋られる).',
      ],
    ],
    points: [
      ['ご都合', 'ごつごう', 'sự thuận tiện (của người khác)'],
      ['お知らせいただく', 'おしらせいただく', 'được (anh/chị) báo cho'],
    ],
  }),
  item('mock1', 'hyogen', 6, {
    questions: [
      [
        '（取引先に食事に誘われて）A：来週あたり、一度お食事でもいかがですか。B：ありがとうございます。＿＿＿、来週は出張が続いておりまして……。',
        ['お言葉に甘えて', 'おかげさまで', 'せっかくのお誘いなのですが', 'お手数をおかけしますが'],
        2,
        'B đang khéo từ chối lời mời (tuần sau đi công tác liên tục), nên đệm bằng せっかくのお誘いなのですが (lựa chọn 3). Lựa chọn 1 dùng khi nhận lời mời, trái với ý câu sau. Lựa chọn 4 dùng khi nhờ người khác làm việc gì; ở đây B không nhờ gì. Lựa chọn 2 là lời cảm ơn khi được hỏi thăm, không hợp.',
      ],
    ],
    points: [
      ['せっかく', 'せっかく', 'đã có lòng (mà…)'],
      ['お言葉に甘える', 'おことばにあまえる', 'xin nhận lời (ý tốt)'],
    ],
  }),
  item('mock1', 'hyogen', 7, {
    questions: [
      [
        '（受付で来客に）田中はただいま参りますので、こちらで少々＿＿＿。',
        ['お待ちしてください', 'お待ちください', 'お待ちいたしてください', 'お待ちさせてください'],
        1,
        'Mời khách chờ: お待ちください (lựa chọn 2). Lựa chọn 1 dễ nhầm nhất: お待ちする là khiêm nhường, chỉ dùng cho việc mình chờ, không ra lệnh cho khách được. Lựa chọn 3 cũng là khiêm nhường. Lựa chọn 4 nghĩa là "cho tôi bắt anh chờ", sai ý.',
      ],
    ],
    points: [
      ['ただいま参ります', 'ただいままいります', 'sẽ tới ngay (khiêm nhường)'],
      ['少々', 'しょうしょう', 'một chút'],
    ],
  }),
  item('mock1', 'hyogen', 8, {
    questions: [
      [
        '（電話で取引先に）あいにく山本は席を外しております。戻りましたら、こちらから＿＿＿。',
        ['お電話いただきます', 'お電話をおかけになります', 'お電話くださいます', 'お電話を差し上げます'],
        3,
        'Người gọi lại là đồng nghiệp bên mình (こちらから), nói với khách nên dùng khiêm nhường お電話を差し上げます (lựa chọn 4). Lựa chọn 2 dễ nhầm nhất: おかけになる là tôn kính, đem dùng cho người trong công ty mình khi nói với người ngoài là sai chủ thể. Lựa chọn 1 và 3 có nghĩa là khách gọi cho mình, trái với こちらから.',
      ],
    ],
    points: [
      ['席を外す', 'せきをはずす', 'rời chỗ ngồi'],
      ['差し上げる', 'さしあげる', 'làm cho (khiêm nhường)'],
    ],
  }),
  item('mock1', 'hyogen', 9, {
    questions: [
      [
        '（顧客アンケートの依頼文）＿＿＿、ご連絡先もご記入いただけますと幸いです。',
        ['差し支えなければ', 'あいにくですが', 'ご心配をおかけしましたが', '取り急ぎ'],
        0,
        'Hỏi thông tin cá nhân không bắt buộc thì đệm bằng 差し支えなければ "nếu không có gì trở ngại" (lựa chọn 1). Lựa chọn 2 dùng khi báo tin không như ý. Lựa chọn 4 取り急ぎ dùng cho thư viết vội để báo trước (取り急ぎご連絡まで), không đi với lời nhờ điền thông tin. Lựa chọn 3 dùng khi báo mọi việc đã ổn sau một sự cố, không liên quan tới phiếu khảo sát.',
      ],
    ],
    points: [
      ['差し支えない', 'さしつかえない', 'không trở ngại'],
      ['幸いです', 'さいわいです', 'rất mong (lời nhờ lịch sự)'],
    ],
  }),
  item('mock1', 'hyogen', 10, {
    questions: [
      [
        '（取引先に）部長の木村も、ぜひ一度ご挨拶に＿＿＿と申しております。',
        ['いらっしゃりたい', 'お越しになりたい', '伺いたい', '来られたい'],
        2,
        'Người đến chào là trưởng bộ phận của công ty mình (部長の木村), nói với khách nên dùng khiêm nhường 伺いたい (lựa chọn 3); 申しております cũng cho thấy đang hạ người nhà xuống. Lựa chọn 1, 2, 4 đều là tôn kính ngữ: đúng ý "muốn đến" nhưng sai chủ thể, vì đem kính ngữ dành cho cấp trên của mình nói với người ngoài.',
      ],
    ],
    points: [
      ['伺う', 'うかがう', 'đến thăm (khiêm nhường)'],
      ['申す', 'もうす', 'nói (khiêm nhường)'],
    ],
  }),
  // 総合読解: business documents, one question each (spec, calibration rules 2, 3, 12).
  item('mock1', 'sogo-dokkai', 1, {
    material: {
      kind: 'text',
      title: '「国際物流機器展」出展のご案内',
      body: '拝啓　師走の候、貴社ますますご清栄のこととお慶び申し上げます。平素は格別のお引き立てを賜り、厚く御礼申し上げます。\nさて、弊社では下記の展示会に新型の自動搬送ロボットを出展いたします。ご多忙中とは存じますが、ぜひご来場賜りますようお願い申し上げます。\nなお、ブースにて名刺をお預けいただいた方には、後日、詳しい製品資料をお送りいたします。\n敬具\n\n記\n会期：2027年2月17日（水）〜19日（金）10時〜17時\n会場：みなと国際展示場　東ホール\n小間番号：E-24\n以上',
    },
    questions: [
      [
        'この手紙の主な目的は何ですか。',
        ['新製品の資料を送ったことを知らせる', '展示会に来てもらうよう案内する', '展示会の会期が変わったことを伝える', '展示会への共同出展を申し込む'],
        1,
        'Ý chính nằm sau さて: công ty trưng bày robot mới ở hội chợ và mời ghé thăm (ご来場賜りますよう) → lựa chọn 2. Lựa chọn 1 dễ nhầm vì có nhắc tài liệu sản phẩm, nhưng tài liệu chỉ gửi sau, cho người để lại danh thiếp ở gian hàng. Thư không nói đổi lịch hay rủ cùng trưng bày.',
      ],
    ],
    points: [
      ['ご清栄', 'ごせいえい', 'thịnh vượng (lời chào trong thư)'],
      ['小間', 'こま', 'ô gian hàng (hội chợ)'],
      ['来場', 'らいじょう', 'đến dự (hội chợ, sự kiện)'],
    ],
  }),
  item('mock1', 'sogo-dokkai', 2, {
    material: {
      kind: 'text',
      title: '「地域ビジネスフォーラム」ご協賛の件',
      body: 'ひかり商工会　事務局　中山様\n\nいつも大変お世話になっております。株式会社アサヒ精機総務部の小池でございます。\n先日は、来年3月の地域ビジネスフォーラムへのご協賛について、丁寧なご説明をいただき、ありがとうございました。\n社内で検討いたしましたが、本年度の広告予算はすでに配分を終えており、新たな支出が難しい状況でございます。誠に恐縮ながら、今回は見送らせていただきたく存じます。\n来年度以降、改めてご相談させていただければ幸いです。',
    },
    questions: [
      [
        'このメールで小池さんが伝えていることは何ですか。',
        ['協賛金を来年度に支払いたい', '協賛の条件を詳しく知りたい', '広告予算の配分を相談したい', '今回は協賛に応じられない'],
        3,
        'Ngân sách quảng cáo năm nay đã phân bổ xong, 今回は見送らせていただきたく存じます = lần này xin không tham gia → từ chối tài trợ (lựa chọn 4). Lựa chọn 1 dễ nhầm vì có "năm sau", nhưng thư chỉ nói năm sau sẽ trao đổi lại, không hứa trả tiền. Lựa chọn 3 lấy chữ 広告予算, nhưng việc phân bổ đã xong rồi.',
      ],
    ],
    points: [
      ['協賛', 'きょうさん', 'tài trợ, đồng hành'],
      ['見送る', 'みおくる', 'gác lại, không làm (lần này)'],
    ],
  }),
  item('mock1', 'sogo-dokkai', 3, {
    material: {
      kind: 'text',
      title: '定時株主総会の運営応援について',
      body: '応援者各位\n\n総務部です。6月24日（木）の定時株主総会では、受付と会場案内の応援をお願いしております。\nつきましては、当日の動きを確認するため、6月21日（月）15時から本社7階大会議室でリハーサルを行います。応援者は全員ご出席ください。やむを得ず欠席する場合は、6月18日（金）までに総務部の村井へご連絡のうえ、当日の資料を受け取ってください。\nなお、当日の服装はスーツ、集合は8時30分です。',
    },
    questions: [
      [
        'リハーサルに出られない応援者は、何をしなければなりませんか。',
        ['前もって村井さんに伝え、資料をもらう', '当日8時30分より早く会場に来る', '21日の15時に総務部へ資料を取りに行く', '代わりにリハーサルに出る人を探す'],
        0,
        'Người vắng buổi diễn tập phải báo cho anh/chị Murai trước ngày 18/6 và nhận tài liệu → lựa chọn 1. Lựa chọn 3 dễ nhầm vì ghép giờ diễn tập (21/6, 15 giờ) với việc nhận tài liệu, nhưng đó là giờ của buổi mình vắng. 8:30 là giờ tập trung chung của mọi người, không phải điều kiện riêng.',
      ],
    ],
    points: [
      ['株主総会', 'かぶぬしそうかい', 'đại hội cổ đông'],
      ['やむを得ず', 'やむをえず', 'bất đắc dĩ'],
      ['応援', 'おうえん', 'hỗ trợ (người từ phòng khác)'],
    ],
  }),
  item('mock1', 'sogo-dokkai', 4, {
    material: {
      kind: 'text',
      title: '納品日変更のお知らせ（FAX）',
      body: '株式会社まるやストア　仕入部　御中\n\nいつもお引き立ていただき、ありがとうございます。\n3月5日付でご注文いただいた下記商品のうち、「国産そば乾麺」につきましては、原料の入荷遅れにより、納品日を変更させていただきます。その他の商品は予定どおりお届けいたします。ご迷惑をおかけし、申し訳ございません。\n\n記\n・国産そば乾麺　200袋　3月12日（金）→3月19日（金）\n・手延べうどん　150袋　3月12日（金）\n・つゆの素　80本　3月12日（金）\n以上\n送信枚数：本状を含め1枚',
    },
    questions: [
      [
        '3月12日に届く商品は、合わせて何点ですか。',
        ['430点', '350点', '230点', '280点'],
        2,
        'Mì soba (200 túi) dời sang 19/3; còn lại udon 150 túi và nước dùng 80 chai vẫn giao ngày 12/3: 150 + 80 = 230 (lựa chọn 3). Lựa chọn 1 là tổng cả ba món, quên mất món bị dời. Lựa chọn 2 và 4 lại tính cả mì soba.',
      ],
    ],
    points: [
      ['入荷', 'にゅうか', 'hàng về (kho)'],
      ['本状', 'ほんじょう', 'tờ này, thư này'],
    ],
  }),
  item('mock1', 'sogo-dokkai', 5, {
    material: {
      kind: 'text',
      title: '伝言メモ',
      body: '大野課長へ\n1月19日（火）14:20　受：佐藤\n\n北陸電材の高木様からお電話がありました。\n明日10時のお打ち合わせですが、高木様に午前中の急な来客が入ったため、開始を11時に変えていただけないか、とのことです。\n11時でよろしければ、折り返しのお電話は不要だそうです。難しい場合は、明日の朝9時までに高木様の携帯へご連絡ください。お持ちいただく資料は予定どおりで構わないとのことです。',
    },
    questions: [
      [
        '11時の開始で問題がない場合、大野課長は何をすればいいですか。',
        ['9時までに高木様に電話する', '佐藤さんに予定の変更を伝える', '資料を新しく作り直しておく', '高木様には連絡しなくてよい'],
        3,
        '11時でよろしければ、折り返しのお電話は不要: nếu 11 giờ được thì không cần gọi lại → lựa chọn 4. Lựa chọn 1 dễ nhầm nhất vì có giờ 9 giờ, nhưng chỉ phải gọi khi 11 giờ KHÔNG được. Tài liệu giữ nguyên như dự định, nên lựa chọn 3 sai.',
      ],
    ],
    points: [
      ['伝言', 'でんごん', 'lời nhắn'],
      ['折り返し', 'おりかえし', 'gọi lại'],
      ['不要', 'ふよう', 'không cần'],
    ],
  }),
  item('mock1', 'sogo-dokkai', 6, {
    material: {
      kind: 'text',
      title: '二次面接のご案内',
      body: '林 美咲 様\n\nこのたびは弊社の総合職採用にご応募いただき、ありがとうございます。一次選考の結果、林様には二次面接にお進みいただくこととなりました。\n二次面接は2027年2月8日（月）から10日（水）の間に、本社にて行います。採用サイトのマイページから、ご都合のよい日時を2月3日（水）正午までにご登録ください。期限を過ぎた場合、ご希望に沿えないことがございます。\nなお、面接当日は卒業見込証明書をご持参ください。',
    },
    questions: [
      [
        '林さんは、いつまでに何をしなければなりませんか。',
        ['2月8日までに証明書を郵送する', '2月3日の正午までに希望日時を登録する', '2月10日までに面接日時を決めて電話する', '2月3日までに二次面接を受ける'],
        1,
        'Phải đăng ký ngày giờ mong muốn trên trang My Page trước 12 giờ trưa 3/2 (水) → lựa chọn 2. Lựa chọn 1 dễ nhầm: giấy chứng nhận sắp tốt nghiệp chỉ cần mang theo hôm phỏng vấn, không gửi bưu điện. Ngày 8–10/2 là thời gian phỏng vấn, không phải hạn đăng ký, và đăng ký qua web chứ không gọi điện.',
      ],
    ],
    points: [
      ['総合職', 'そうごうしょく', 'vị trí chính (có thể luân chuyển)'],
      ['持参', 'じさん', 'mang theo'],
      ['見込', 'みこみ', 'dự kiến'],
    ],
  }),
  item('mock1', 'sogo-dokkai', 7, {
    material: {
      kind: 'text',
      title: '新任管理職研修の実施について',
      body: '新任管理職各位\n\n人事部より、下記のとおり新任管理職研修を実施します。\n研修は2日間で、初日は労務管理、2日目は部下との面談の進め方を扱います。2日目は実際に面談の練習を行うため、事前課題として「部下との面談で困った場面」をA4・1枚にまとめ、研修初日の3営業日前までに提出してください。\n\n記\n日時：2027年4月13日（火）・14日（水）9:30〜17:00\n会場：本社研修室B\n提出先：人事部　研修担当\n以上',
    },
    questions: [
      [
        '事前課題の提出期限はいつですか。',
        ['4月10日（土）', '4月9日（金）', '4月8日（木）', '4月11日（日）'],
        2,
        'Hạn là 3 ngày làm việc trước ngày đầu (thứ Ba 13/4). Bỏ thứ Bảy, Chủ nhật: 12/4 (thứ Hai) là 1, 9/4 (thứ Sáu) là 2, 8/4 (thứ Năm) là 3 → lựa chọn 3. Lựa chọn 1 dễ nhầm vì đếm 3 ngày lịch. Lựa chọn 4 lại đếm từ ngày thứ hai của khoá học (14/4).',
      ],
    ],
    points: [
      ['営業日', 'えいぎょうび', 'ngày làm việc'],
      ['事前課題', 'じぜんかだい', 'bài tập làm trước'],
      ['労務管理', 'ろうむかんり', 'quản lý lao động'],
    ],
  }),
  item('mock1', 'sogo-dokkai', 8, {
    material: {
      kind: 'text',
      title: '品質会議 議事録（要旨）',
      body: '日時：2027年3月3日（水）10:00〜11:00\n出席：製造課 岡田課長、品質保証課 森、購買課 石原\n議題：樹脂ケースのひび割れ不良について\n1．2月の不良率は1.8%で、目標の0.5%を大きく上回った。\n2．原因は、2月から切り替えた新しい樹脂材料の乾燥不足と考えられる。\n3．製造課は乾燥時間を2時間から3時間に延ばし、3月10日までに効果を確認する。\n4．購買課は、旧材料に戻した場合の価格と納期を、次回会議までに調べる。\n次回：3月17日（水）10:00',
    },
    questions: [
      [
        '購買課の石原さんが次回の会議までにすることは何ですか。',
        ['前の材料に戻すときの費用と納期を調べる', '樹脂材料を乾燥させる時間を3時間に延ばす', '乾燥時間を延ばした効果を確かめる', '新しい樹脂材料の不良率を計算する'],
        0,
        'Mục 4: phòng mua hàng tìm hiểu giá và thời hạn giao nếu quay lại vật liệu cũ → lựa chọn 1 (旧材料 = 前の材料, 価格 = 費用). Lựa chọn 2 và 3 dễ nhầm vì có trong biên bản, nhưng là việc của phòng sản xuất (mục 3). Tỉ lệ lỗi đã tính xong ở mục 1.',
      ],
    ],
    points: [
      ['議事録', 'ぎじろく', 'biên bản họp'],
      ['不良率', 'ふりょうりつ', 'tỉ lệ hàng lỗi'],
      ['購買課', 'こうばいか', 'phòng mua hàng'],
    ],
  }),
  item('mock1', 'sogo-dokkai', 9, {
    material: {
      kind: 'text',
      title: '期末棚卸しに伴う閉館時間変更について',
      body: 'テナント各位\n\nショッピングモール「ひなたテラス」管理事務所です。\n2月28日（日）は館内全店で期末の棚卸しを行うため、閉館時間を通常の21時から18時に早めます。\n各店舗では、営業時間変更のお知らせを、2月21日（日）までに店頭に掲示してください。掲示用ポスターは、2月15日（月）以降、管理事務所でお渡しします。\nまた、棚卸し結果の報告書は、3月5日（金）までに管理事務所へご提出ください。',
    },
    questions: [
      [
        '各店舗が、営業時間変更のお知らせを店頭に掲示する期限はいつですか。',
        ['2月15日（月）', '2月21日（日）', '2月28日（日）', '3月5日（金）'],
        1,
        'Thông báo đổi giờ phải dán ở mặt tiền cửa hàng trước 21/2 (日) → lựa chọn 2. Lựa chọn 1 dễ nhầm: 15/2 là ngày bắt đầu nhận poster ở văn phòng quản lý, không phải hạn dán. 28/2 là ngày kiểm kê, 5/3 là hạn nộp báo cáo kiểm kê.',
      ],
    ],
    points: [
      ['棚卸し', 'たなおろし', 'kiểm kê hàng'],
      ['掲示', 'けいじ', 'dán, niêm yết'],
      ['閉館', 'へいかん', 'đóng cửa toà nhà'],
    ],
  }),
  item('mock1', 'sogo-dokkai', 10, {
    material: {
      kind: 'text',
      title: 'ご請求書の差し替えのお願い',
      body: '株式会社ミドリ建装　経理ご担当者様\n\nいつもお世話になっております。三協紙工の本田です。\n11月30日付でお送りしたご請求書に、単価の誤りがございました。正しくは1枚52円のところ、55円で計算しておりました。本日、訂正したご請求書を郵送いたしましたので、お手数ですが、先にお送りしたものは破棄していただけますでしょうか。\nなお、お支払い期日に変更はございません。ご迷惑をおかけし、誠に申し訳ございません。',
    },
    questions: [
      [
        'このメールの主な目的は何ですか。',
        ['単価の値上げを了承してもらう', '支払いの期日を延ばしてもらう', '新しい請求書が届いたか確かめてもらう', '請求書の誤りを知らせ、差し替える'],
        3,
        'Hoá đơn trước tính sai đơn giá (55 yên thay vì 52 yên); hoá đơn đã sửa đã gửi đi, xin huỷ bản cũ → báo lỗi và thay hoá đơn (lựa chọn 4). Lựa chọn 1 dễ nhầm vì có hai mức giá, nhưng đây là tính nhầm cao hơn, không phải tăng giá. Hạn thanh toán giữ nguyên, nên lựa chọn 2 sai.',
      ],
    ],
    points: [
      ['差し替え', 'さしかえ', 'thay bằng bản mới'],
      ['破棄', 'はき', 'huỷ bỏ'],
      ['単価', 'たんか', 'đơn giá'],
    ],
  }),
];

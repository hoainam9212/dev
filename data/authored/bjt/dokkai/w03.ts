import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

// Week 3 — email và thư tín: mở đầu, nhờ vả, từ chối khéo, kết thư (J2 → J1).
export const W03: BjtItem[] = [
  item('w03', 'goi', 1, {
    questions: [
      [
        '詳細につきましては、添付の資料をご＿＿＿ください。',
        ['参照', '拝読', '査定', '承知'],
        0,
        'Đáp án 1. ご参照ください = xin tham khảo, dùng khi chỉ người đọc sang tài liệu đính kèm để xem chi tiết. 拝読 là khiêm nhường ngữ (mình đọc), không đi với ご～ください. 査定 là thẩm định giá. Lựa chọn 4 dễ nhầm vì ご承知 cũng hay gặp trong thư, nhưng nó nghĩa là "biết, hiểu", không phải "xem".',
      ],
    ],
    points: [
      ['ご参照ください', 'ごさんしょうください', 'xin tham khảo'],
      ['添付の資料', 'てんぷのしりょう', 'tài liệu đính kèm'],
    ],
  }),
  item('w03', 'goi', 2, {
    questions: [
      [
        '本日はお時間をいただき、ありがとうございました。まずは＿＿＿お礼申し上げます。',
        ['取り急いで', '至急に', '取り急ぎ', '急ぎ足で'],
        2,
        'Đáp án 3. まずは取り急ぎ～まで / 申し上げます là câu kết thư cố định: viết vội để báo trước, chi tiết gửi sau. Lựa chọn 1 dễ nhầm vì cùng động từ, nhưng thể て 取り急いで không dùng trong cụm này. 至急 là "gấp" khi nhờ người khác. 急ぎ足 là bước đi vội.',
      ],
    ],
    points: [
      ['取り急ぎ', 'とりいそぎ', 'viết vội trước (cuối thư)'],
      ['お礼申し上げます', 'おれいもうしあげます', 'xin cảm ơn (trang trọng)'],
    ],
  }),
  item('w03', 'goi', 3, {
    questions: [
      [
        'せっかくのお誘いですが、当日はあいにく先約があり、出席＿＿＿。',
        ['しかねません', 'されかねます', 'いたしかねません', 'いたしかねます'],
        3,
        'Đáp án 4. ～かねます = không thể (từ chối lịch sự), và いたす là khiêm nhường cho việc của mình: 出席いたしかねます = tôi không thể tham dự. Lựa chọn 3 dễ nhầm vì chỉ khác một chút, nhưng ～かねません lại nghĩa là "có thể xảy ra (điều xấu)". されかねます dùng tôn kính cho việc của chính mình là sai.',
      ],
    ],
    points: [
      ['いたしかねます', 'いたしかねます', 'tôi không thể (từ chối lịch sự)'],
      ['せっかくのお誘い', 'せっかくのおさそい', 'lời mời quý hóa'],
      ['先約', 'せんやく', 'hẹn trước'],
    ],
  }),
  item('w03', 'goi', 4, {
    questions: [
      [
        'ご不明な点がございましたら、お気軽にお問い合わせ＿＿＿。',
        ['いたします', 'くださいませ', 'させます', 'いただきます'],
        1,
        'Đáp án 2. お問い合わせくださいませ = xin cứ liên hệ, lời mời người đọc làm. Lựa chọn 4 dễ nhầm vì いただく cũng lịch sự, nhưng câu khẳng định お問い合わせいただきます nghe như ra lệnh, không phải lời mời. いたします thành ra mình là người hỏi. させます là bắt người khác làm.',
      ],
    ],
    points: [
      ['ご不明な点', 'ごふめいなてん', 'điều chưa rõ'],
      ['お気軽に', 'おきがるに', 'xin cứ tự nhiên'],
    ],
  }),
  item('w03', 'goi', 5, {
    questions: [
      [
        '先日の会議の議事録を、本メールに＿＿＿いたします。',
        ['添付', '同封', '付属', '添加'],
        0,
        'Đáp án 1. 添付する = đính kèm tệp vào email. Lựa chọn 2 dễ nhầm: 同封 là cho vào cùng phong bì, dùng với thư giấy chứ không dùng với email. 付属 là phụ kiện đi kèm sản phẩm. 添加 là thêm chất vào thực phẩm.',
      ],
    ],
    points: [
      ['添付', 'てんぷ', 'đính kèm (tệp)'],
      ['同封', 'どうふう', 'gửi kèm trong phong bì'],
      ['議事録', 'ぎじろく', 'biên bản cuộc họp'],
    ],
  }),
  item('w03', 'goi', 6, {
    questions: [
      [
        '先ほどお送りしたメールの金額に誤りがございましたので、＿＿＿いたします。',
        ['改正', '訂正', '是正', '修理'],
        1,
        'Đáp án 2. 訂正 = sửa lỗi trong chữ, số, văn bản. Lựa chọn 3 dễ nhầm vì cũng là "sửa cho đúng", nhưng 是正 dùng cho tình trạng, chế độ chưa hợp lý (格差の是正). 改正 là sửa luật, quy định. 修理 là sửa máy móc.',
      ],
    ],
    points: [
      ['訂正', 'ていせい', 'đính chính'],
      ['誤り', 'あやまり', 'chỗ sai'],
    ],
  }),
  item('w03', 'hyogen', 1, {
    material: { kind: 'text', body: '（取引先へのメールの結び）お忙しいところ＿＿＿、添付の見積書のご確認をお願いいたします。' },
    questions: [
      [
        '空欄に入る最も適当な表現はどれですか。',
        ['恐縮ですが', 'せっかくですが', 'あいにくですが', 'おかげさまで'],
        0,
        'Đáp án là lựa chọn 1. お忙しいところ恐縮ですが là câu đệm cố định khi nhờ người đang bận làm việc gì đó. Lựa chọn 2 dễ nhầm nhất vì cũng là câu đệm lịch sự, nhưng せっかくですが dùng khi từ chối lời mời hay ý tốt của người khác. あいにくですが dùng khi báo tin không như mong muốn, おかげさまで dùng khi cảm ơn, đều không hợp với lời nhờ.',
      ],
    ],
    points: [
      ['恐縮ですが', 'きょうしゅくですが', 'thật ngại nhưng... (câu đệm khi nhờ)'],
      ['見積書', 'みつもりしょ', 'bảng báo giá'],
    ],
  }),
  item('w03', 'hyogen', 2, {
    material: { kind: 'text', body: '（注文した客へのメール）ご注文の品は、本日発送＿＿＿。到着まで今しばらくお待ちくださいませ。' },
    questions: [
      [
        '空欄に入る最も適当な表現はどれですか。',
        ['いただきました', 'なさいました', 'いたしました', 'くださいました'],
        2,
        'Đáp án là lựa chọn 3. Người gửi hàng là công ty mình, nên dùng khiêm nhường 発送いたしました. Lựa chọn 1 dễ nhầm nhất vì いただく rất hay gặp trong email, nhưng 発送いただきました nghĩa là khách đã gửi hàng cho mình, sai chủ thể. Lựa chọn 2 và 4 là tôn kính ngữ, chỉ dùng cho hành động của khách.',
      ],
    ],
    points: [
      ['発送', 'はっそう', 'gửi hàng đi'],
      ['今しばらく', 'いましばらく', 'thêm một chút nữa'],
    ],
  }),
  item('w03', 'hyogen', 3, {
    material: { kind: 'text', body: '（取引先の提案を断るメール）ご提案の件、社内で慎重に検討いたしましたが、今回は＿＿＿。' },
    questions: [
      [
        '空欄に入る最も適当な表現はどれですか。',
        ['ご遠慮願えませんでしょうか', '見送らせていただきます', 'お見送りになられます', 'お断りいただけますか'],
        1,
        'Đáp án là lựa chọn 2. Bên quyết định không nhận đề án là công ty mình, nên dùng 見送らせていただきます (xin phép chưa tiến hành lần này). Lựa chọn 4 dễ nhầm nhất vì có chữ 断る, nhưng お断りいただけますか là nhờ khách từ chối, ngược chủ thể. Lựa chọn 1 xin khách đừng làm gì đó, lựa chọn 3 là kính ngữ kép cho hành động của mình.',
      ],
    ],
    points: [
      ['慎重に', 'しんちょうに', 'một cách thận trọng'],
      ['見送る', 'みおくる', 'gác lại, không tiến hành'],
    ],
  }),
  item('w03', 'sogo-dokkai', 1, {
    material: {
      kind: 'text',
      title: '契約書ご返送のお願い',
      body: '2026年12月1日\n\n有限会社ことぶき印刷\n代表取締役　井上様\n\n株式会社ひので企画\n営業部　中島\n\n前略　取り急ぎ用件のみ申し上げます。\n先日お打ち合わせいたしました印刷業務の基本契約書を2部、弊社押印のうえ同封いたしました。お手数ですが、2部ともご署名・ご捺印いただき、うち1部を同封の返信用封筒にて12月11日（金）までにご返送ください。もう1部は貴社にて保管をお願いいたします。\nまずは書面にてお願い申し上げます。\n草々',
    },
    questions: [
      [
        '井上さんは、同封された契約書をどうしますか。',
        ['2部とも署名・押印して、2部とも返送する', '1部だけ署名・押印して、2部とも返送する', '署名はせずに、1部を中島さんに返送する', '2部とも署名・押印し、1部を返送する'],
        3,
        'Đáp án là lựa chọn 4. Thư yêu cầu ký và đóng dấu cả hai bản (2部とも), gửi lại một bản trước 11/12/2026 và giữ một bản (もう1部は貴社にて保管). Lựa chọn 1 dễ nhầm nhất vì đúng phần ký cả hai bản, nhưng sai ở chỗ gửi lại cả hai. Lựa chọn 2 và 3 sai ngay ở phần ký tên.',
      ],
    ],
    points: [
      ['前略', 'ぜんりゃく', 'xin miễn phần chào hỏi (mở đầu thư gấp)'],
      ['草々', 'そうそう', 'kết thư (đi với 前略)'],
      ['押印', 'おういん', 'đóng dấu'],
      ['捺印', 'なついん', 'đóng dấu (trên chữ ký)'],
    ],
  }),
  item('w03', 'sogo-dokkai', 2, {
    material: {
      kind: 'text',
      title: 'お見積りのご依頼について',
      body: '株式会社コスモ食品\n購買部　平野様\n\nいつもお世話になっております。東栄パッケージの藤田でございます。\nこのたびは新商品用の化粧箱について、お見積りのご依頼をいただき、誠にありがとうございました。\n社内で検討いたしましたが、ご希望の納期である2月上旬は、すでに工場の生産枠が埋まっており、お引き受けいたしかねる状況でございます。ご期待に沿えず、誠に申し訳ございません。\n3月以降の納品でよろしければ、改めてお見積りいたしますので、その際はお申し付けください。',
    },
    questions: [
      [
        'このメールの目的は何ですか。',
        ['納期を2月上旬より早めてほしいと頼むこと', '希望の納期では受けられないと伝えること', '3月納品分の見積書を送ると伝えること', '工場の生産枠を増やしたと知らせること'],
        1,
        'Đáp án là lựa chọn 2. Thư cho biết đầu tháng 2 xưởng đã kín lịch nên không thể nhận (お引き受けいたしかねる), tức là từ chối khéo theo hạn giao khách muốn. Lựa chọn 3 dễ nhầm nhất: báo giá cho hàng giao từ tháng 3 chỉ được đề nghị "nếu khách muốn", thư này chưa gửi báo giá. Không có chuyện xin giao sớm hơn hay tăng công suất.',
      ],
    ],
    points: [
      ['化粧箱', 'けしょうばこ', 'hộp đựng sản phẩm (in đẹp)'],
      ['生産枠', 'せいさんわく', 'suất sản xuất còn trống'],
      ['いたしかねる', 'いたしかねる', 'khó mà làm được (từ chối lịch sự)'],
      ['期待に沿う', 'きたいにそう', 'đáp ứng mong đợi'],
    ],
  }),
  item('w03', 'sogo-dokkai', 3, {
    material: {
      kind: 'text',
      title: '振込先口座ご登録のお願い',
      body: 'お取引先各位\n\n株式会社大和ホーム資材　経理部\n\n平素は格別のご高配を賜り、厚く御礼申し上げます。\nさて、弊社では2027年4月支払分より、お支払い方法を手形から銀行振込へ切り替えることといたしました。つきましては、同封の「振込先口座登録書」にご記入・ご捺印のうえ、2027年1月29日（金）必着にてご返送くださいますようお願い申し上げます。\nなお、期日までにご返送のない場合は、5月支払分からの切り替えとなりますので、あらかじめご了承ください。',
    },
    questions: [
      [
        '4月支払分から振込にしてもらうには、登録書をいつまでにどうする必要がありますか。',
        ['4月の支払日の前日までに届ける', '1月29日の消印で発送する', '1月29日までに届くように送る', '5月の支払日の前日までに届ける'],
        2,
        'Đáp án là lựa chọn 3. 必着 nghĩa là phải đến nơi chậm nhất ngày 29/1/2027, không phải chỉ cần gửi đi trong ngày đó. Lựa chọn 2 dễ nhầm nhất vì đúng ngày nhưng là "dấu bưu điện" (消印), cách tính hạn khác với 必着. Gửi muộn thì chỉ được chuyển sang từ kỳ thanh toán tháng 5, nên lựa chọn 1 và 4 sai.',
      ],
    ],
    points: [
      ['必着', 'ひっちゃく', 'phải đến nơi (trước hạn)'],
      ['消印', 'けしいん', 'dấu bưu điện'],
      ['手形', 'てがた', 'hối phiếu'],
      ['振込', 'ふりこみ', 'chuyển khoản'],
    ],
  }),
  item('w03', 'sogo-dokkai', 4, {
    material: {
      kind: 'text',
      title: '書類送付のご案内',
      body: '株式会社サンライズ商事\n総務部　御中\n\n有限会社みどり文具\n営業部　佐々木\n\n拝啓　師走の候、貴社ますますご盛栄のこととお慶び申し上げます。\nさて、11月分のお取引につきまして、下記の書類をお送りいたしますので、ご査収くださいますようお願い申し上げます。\n敬具\n\n記\n1. 請求書　1部\n2. 納品書（控）　3部（11月5日・12日・26日納品分）\n3. 受領書　1部\n※受領書にご捺印のうえ、同封の返信用封筒にてご返送ください。',
    },
    questions: [
      [
        'この書類を受け取った人が返送しなければならないものはどれですか。',
        ['受領書を1部', '納品書の控えを3部', '受領書と請求書', '請求書を1部'],
        0,
        'Đáp án là lựa chọn 1. Dòng ※ cuối phần 記 chỉ yêu cầu đóng dấu vào 受領書 (giấy xác nhận đã nhận) rồi gửi lại; mục 3 ghi 1部. Lựa chọn 2 dễ nhầm nhất vì 納品書 có con số 3部, nhưng đó là bản lưu (控) gửi cho bên nhận giữ. Hoá đơn (請求書) cũng để bên nhận giữ, nên lựa chọn 3 và 4 sai.',
      ],
    ],
    points: [
      ['御中', 'おんちゅう', 'kính gửi (tổ chức, phòng ban)'],
      ['ご査収', 'ごさしゅう', 'kiểm tra và nhận'],
      ['受領書', 'じゅりょうしょ', 'giấy xác nhận đã nhận'],
      ['師走', 'しわす', 'tháng Chạp, tháng 12'],
    ],
  }),
];

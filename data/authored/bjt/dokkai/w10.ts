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
      title: '納品日変更のお願い',
      body: '株式会社青葉精機 購買課 吉村様\n\nいつも大変お世話になっております。丸山化成の上田でございます。\nご発注いただいております樹脂部品（注文番号 R-2281、1,000個）につきまして、原料の入荷が遅れておりますため、12月3日の納品を12月10日に変更させていただけないでしょうか。\nご無理を申し上げ大変恐縮ですが、12月3日に400個を先にお届けすることは可能です。分納をご希望の場合は、11月25日までにお知らせください。お知らせがない場合は、12月10日に全数を一括でお届けいたします。',
    },
    questions: [
      [
        '吉村さんが何も連絡しなかった場合、部品はどのように届きますか。',
        ['12月3日に1,000個届く', '12月3日に400個、12月10日に600個届く', '12月10日に1,000個届く', '11月25日に400個届く'],
        2,
        'Câu 3: câu cuối nói không có liên lạc thì giao toàn bộ một lần ngày 10/12 (全数を一括で). Câu 2 là cách giao chia đợt (分納), chỉ áp dụng nếu khách báo trước 25/11. Ngày 3/12 ban đầu đã không giữ được.',
      ],
    ],
    points: [
      ['分納', 'ぶんのう', 'giao hàng chia đợt'],
      ['一括', 'いっかつ', 'gộp một lần'],
      ['全数', 'ぜんすう', 'toàn bộ số lượng'],
    ],
  }),
  item('w10', 'hyogen', 2, {
    material: {
      kind: 'text',
      title: '請求書の電子化について',
      body: 'お取引先各位\n\n平素より格別のご高配を賜り、厚く御礼申し上げます。\n弊社では、来年1月分のご請求より、請求書を紙での郵送からPDFでのメール送付に切り替えることといたしました。\nただし、紙の請求書がご入用のお取引先様は、12月15日までに経理部までお申し出ください。お申し出いただいたお取引先様には、引き続き郵送いたします。\nなお、お支払い期日およびお振込先に変更はございません。\n\n株式会社ハルカ商会 経理部',
    },
    questions: [
      [
        'この通知の内容と合っているものはどれですか。',
        ['1月分から振込先の口座が変わる', '申し出れば、紙の請求書を受け取り続けられる', '12月分の請求書からPDFで送られる', '紙の請求書を希望すると手数料がかかる'],
        1,
        'Câu 2: sau ただし, đối tác cần hoá đơn giấy thì báo trước 15/12 và sẽ tiếp tục được gửi bưu điện. Câu 1 trái với câu sau なお (tài khoản không đổi). Câu 3 sai mốc: bắt đầu từ hoá đơn tháng 1, không phải tháng 12. Không nhắc tới phí.',
      ],
    ],
    points: [
      ['ご高配', 'ごこうはい', 'sự quan tâm (của quý vị)'],
      ['入用', 'いりよう', 'cần dùng'],
      ['振込先', 'ふりこみさき', 'tài khoản nhận chuyển khoản'],
    ],
  }),
  item('w10', 'hyogen', 3, {
    material: {
      kind: 'text',
      title: '業務委託契約書（抜粋）',
      body: '第8条（再委託）\n乙は、本業務の全部または一部を第三者に再委託してはならない。ただし、事前に甲の書面による承諾を得た場合は、この限りでない。\n2　前項ただし書により再委託した場合においても、乙は、再委託先の行為について甲に対し一切の責任を負うものとする。',
    },
    questions: [
      [
        'この条文によると、乙が業務の一部をほかの会社に任せたい場合、どうしなければなりませんか。',
        ['口頭で甲の了解を得る', 'あらかじめ甲から書面で承諾を得る', '再委託先が甲に対して責任を負う契約を結ぶ', '再委託したあとで甲に報告する'],
        1,
        'Câu 2: ngoại lệ sau ただし chỉ mở khi được bên A đồng ý trước (事前に) bằng văn bản (書面による). Câu 3 dễ nhầm vì khoản 2 có nói về trách nhiệm, nhưng khoản đó nói ngược lại: bên B vẫn chịu toàn bộ trách nhiệm thay cho bên nhận lại việc. Câu 1 thiếu văn bản, câu 4 làm sau mới báo.',
      ],
    ],
    points: [
      ['再委託', 'さいいたく', 'giao lại (việc đã nhận) cho bên thứ ba'],
      ['この限りでない', 'このかぎりでない', 'không áp dụng (ngoại lệ)'],
      ['一切', 'いっさい', 'toàn bộ, hoàn toàn'],
    ],
  }),
  item('w10', 'sogo-dokkai', 1, {
    material: {
      kind: 'text',
      title: '関西方面の配送委託先について（ご相談）',
      body: '前川部長\n\nお疲れさまです。物流課の高木です。\n来年4月からの関西方面の配送委託先について、2社から見積もりと条件の提示を受けましたので、ご報告いたします。\n\n・A社（ハヤテ運輸）：1件あたりの料金はB社より約8%安い。ただし、翌日配送は午後3時までの受付分に限られる。\n・B社（関西ロジテック）：料金はやや高いが、午後6時までの受付分を翌日に配送できる。また、年間契約を結べば、2年目から料金を5%引き下げるとの提案があった。\n\n当社の関西向けの受注は、全体の約4割が午後3時以降に集中しています。営業部からも「翌日に届けられないと、大口顧客の吉野商事を失いかねない」との声が上がっています。\n以上から、私としてはB社との年間契約が妥当と考えます。ただ、初年度の費用はA社より年間で約120万円多くかかる見込みです。予算面についてご判断をいただきたく、ご相談申し上げます。',
    },
    questions: [
      [
        '高木さんがB社を勧める一番の理由は何ですか。',
        ['料金がA社より安いから', '2年目から料金が下がるから', '午後に入る注文も翌日に届けられるから', '吉野商事から紹介されたから'],
        2,
        'Câu 3: bốn phần đơn hàng đến sau 3 giờ chiều, và chỉ B nhận tới 6 giờ để giao hôm sau; bộ phận kinh doanh lo mất khách lớn nếu không giao kịp. Câu 2 là ưu điểm phụ của B, không phải lý do chính (năm đầu B vẫn đắt hơn). Câu 1 sai: A mới là bên rẻ hơn.',
      ],
      [
        '高木さんが部長に判断してほしいことは何ですか。',
        ['A社とB社のどちらの見積もりが正しいか', '初年度に増える費用を予算として認めるか', '受付時間を午後3時までに変更するか', '吉野商事との取引を続けるか'],
        1,
        'Câu 2: câu cuối xin trưởng bộ phận quyết về mặt ngân sách vì năm đầu tốn thêm khoảng 1,2 triệu yên. Câu 4 lấy tên khách hàng trong bài, nhưng giữ khách này chính là mục đích, không phải điều cần quyết.',
      ],
    ],
    points: [
      ['委託先', 'いたくさき', 'bên nhận uỷ thác'],
      ['大口顧客', 'おおぐちこきゃく', 'khách hàng lớn'],
      ['妥当', 'だとう', 'hợp lý, thoả đáng'],
    ],
  }),
  item('w10', 'sogo-dokkai', 2, {
    material: {
      kind: 'text',
      title: '食品メーカー3社、道内で共同配送へ',
      body: '飲料の北星食品、菓子の三葉製菓、調味料のアサカ食品の3社は、来年4月から北海道内で共同配送を始めると発表した。3社の商品を同じトラックに積み合わせ、道内のスーパーやコンビニの物流拠点に届ける。\n背景にはトラック運転手の不足がある。各社はこれまで、道内配送の多くを1台につき1社の荷物だけで運んできたが、積載率は平均5割程度にとどまっていた。共同配送によって積載率を8割まで高め、使用するトラックの台数を約3割減らせるとみている。\n一方で課題も残る。3社は商品の温度帯が異なるため、当面は常温で運べる商品に限って共同化する。冷蔵が必要なアサカ食品の一部商品は、これまでどおり単独で配送する。また、納品時間の指定については、小売り側にも柔軟な対応を求めていく考えだ。\n3社は、2年後をめどに東北地方への拡大も検討するとしている。',
    },
    questions: [
      [
        '3社が共同配送を始める主な理由は何ですか。',
        ['トラックの運転手が足りないから', '商品の温度管理を厳しくするため', '東北地方に新しく進出するため', '小売店から値下げを求められたから'],
        0,
        'Câu 1: 背景にはトラック運転手の不足がある nói thẳng nguyên nhân. Câu 2 lấy chữ 温度帯 trong bài, nhưng nhiệt độ là khó khăn khiến việc gộp hàng bị giới hạn, không phải lý do bắt đầu. Đông Bắc chỉ là kế hoạch xem xét sau hai năm.',
      ],
      [
        '本文の内容と合っているものはどれですか。',
        ['3社のすべての商品が共同配送の対象になる', '共同配送でトラックの台数は半分になる', 'すでに東北地方でも共同配送が始まっている', 'アサカ食品の冷蔵品は今後も単独で配送される'],
        3,
        'Câu 4: hàng cần bảo quản lạnh của Asaka vẫn giao riêng như cũ (これまでどおり単独で). Câu 1 sai vì trước mắt chỉ gộp hàng nhiệt độ thường. Câu 2 nhầm số: số xe giảm khoảng ba phần mười (3割), còn 5割 là tỉ lệ chất hàng hiện nay.',
      ],
    ],
    points: [
      ['共同配送', 'きょうどうはいそう', 'giao hàng chung'],
      ['積載率', 'せきさいりつ', 'tỉ lệ chất đầy (xe)'],
      ['当面', 'とうめん', 'trước mắt, tạm thời'],
      ['～をめどに', 'をめどに', 'lấy … làm mốc'],
    ],
  }),
];

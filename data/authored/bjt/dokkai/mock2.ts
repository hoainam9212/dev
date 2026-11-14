import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/**
 * Full test 2 — reading part (語彙・文法 10 + 表現読解 10 + 総合読解 10 items, one question each). Mixed themes.
 * 表現読解 and 総合読解 follow the 2026-11-14 calibration rules (spec). Dates are in 2027 unless the text is
 * about the year-end (November 2026). About a third of the questions are J1+ (keigo subject, a small sum).
 */
export const MOCK2: BjtItem[] = [
  // ── 語彙・文法 ──────────────────────────────────────────────
  item('mock2', 'goi', 1, {
    questions: [
      [
        '先日の会議でご提案いただいた件ですが、社内で慎重に検討した＿＿＿、ぜひ進めさせていただくことになりました。',
        ['結果', 'あげく', '以上', '次第'],
        0,
        'Câu 1: ～た結果 = sau khi … thì kết quả là; dẫn tới kết luận trung tính hoặc tích cực. Câu 2 (～たあげく) cũng là "sau một hồi …" nhưng luôn dẫn tới kết cục xấu, trái với ぜひ進めさせていただく. ～た以上 (một khi đã) và ～次第 (ngay khi) không hợp nghĩa.',
      ],
    ],
    points: [
      ['～たあげく', 'たあげく', 'sau một hồi … (kết cục xấu)'],
      ['慎重に', 'しんちょうに', 'thận trọng'],
    ],
  }),
  item('mock2', 'goi', 2, {
    questions: [
      [
        '本来であれば直接お伺いしてご説明すべき＿＿＿、書面でのご連絡となりましたことをお詫び申し上げます。',
        ['ものの', 'ばかりに', 'どころか', 'ところ'],
        3,
        'Câu 4: ～べきところ(を) = lẽ ra phải … nhưng; mẫu xin lỗi trang trọng khi làm khác phép lịch sự thông thường. Câu 1 (ものの) cũng mang nghĩa "tuy … nhưng", nhưng không đứng ngay sau べき. ばかりに là "chỉ vì", どころか là "đã không … mà còn".',
      ],
    ],
    points: [
      ['～べきところ', 'べきところ', 'lẽ ra phải … (nhưng)'],
      ['本来であれば', 'ほんらいであれば', 'đúng ra thì'],
    ],
  }),
  item('mock2', 'goi', 3, {
    questions: [
      [
        '設備の不具合で生産ラインが半日＿＿＿、一部の製品の出荷が遅れるおそれがある。',
        ['止め', '止まり', '停止させ', 'とどめ'],
        1,
        'Câu 2: chủ ngữ là 生産ラインが nên dùng tự động từ 止まる. Câu 1 (止め) là tha động từ cùng cặp, cần dạng ラインを止める. 停止させる là sai khiến, とどめる là "giữ lại, dừng ở mức", đều cần tân ngữ.',
      ],
    ],
    points: [
      ['不具合', 'ふぐあい', 'trục trặc, lỗi kỹ thuật'],
      ['おそれがある', 'おそれがある', 'có nguy cơ'],
    ],
  }),
  item('mock2', 'goi', 4, {
    questions: [
      [
        '取引先の経営破綻により、売掛金の回収が＿＿＿なった。',
        ['見計らえなく', '見積もれなく', '見逃せなく', '見込めなく'],
        3,
        'Câu 4: 回収が見込めない = không thể trông đợi thu hồi được; 見込む là dự tính, kỳ vọng. Câu 2 (見積もれなく) gần nghĩa "ước tính" nên dễ nhầm, nhưng 見積もる đi với số tiền, chi phí, không đi với 回収が. 見計らう là canh thời điểm, 見逃す là bỏ sót.',
      ],
    ],
    points: [
      ['売掛金', 'うりかけきん', 'khoản phải thu'],
      ['経営破綻', 'けいえいはたん', 'phá sản, sụp đổ kinh doanh'],
      ['見込む', 'みこむ', 'dự tính, trông đợi'],
    ],
  }),
  item('mock2', 'goi', 5, {
    questions: [
      [
        '彼の企画は着眼点こそ斬新だが、費用面での裏付けに＿＿＿と言わざるを得ない。',
        ['欠ける', '欠く', '欠かせない', '欠かす'],
        0,
        'Câu 1: Nに欠ける = thiếu N (tự động từ, đi với に). Câu 2 (欠く) cùng nghĩa "thiếu" nên rất dễ chọn, nhưng 欠く là tha động từ và đi với を (裏付けを欠く), không đi với に. 欠かせない là "không thể thiếu", nghĩa ngược; 欠かす là "bỏ qua (thói quen)".',
      ],
    ],
    points: [
      ['裏付け', 'うらづけ', 'cơ sở, bằng chứng chống lưng'],
      ['着眼点', 'ちゃくがんてん', 'góc nhìn, điểm xuất phát của ý tưởng'],
      ['斬新', 'ざんしん', 'mới lạ, táo bạo'],
    ],
  }),
  item('mock2', 'goi', 6, {
    questions: [
      [
        '本件につきましては、関係部署と＿＿＿のうえ、改めてご回答申し上げます。',
        ['協力', '協賛', '協議', '協調'],
        2,
        'Câu 3: 協議のうえ = sau khi bàn bạc; dùng khi hẹn trả lời sau. Câu 1 (協力) cùng chữ 協 và cũng nói về làm việc với bộ phận khác, nhưng 協力 là giúp sức, không phải bàn để ra quyết định; 協力のうえ không tự nhiên. 協賛 là tài trợ, 協調 là phối hợp hài hoà.',
      ],
    ],
    points: [
      ['協議', 'きょうぎ', 'bàn bạc, thảo luận (để quyết định)'],
      ['～のうえ', 'のうえ', 'sau khi đã …'],
    ],
  }),
  item('mock2', 'goi', 7, {
    questions: [
      [
        '先方は「前向きに検討します」と言ってはいたが、あの口ぶりでは今回の受注は＿＿＿。',
        ['見込み違いだ', '願ったりかなったりだ', '折り紙付きだ', '望み薄だ'],
        3,
        'Câu 4: 望み薄 = ít hy vọng. Câu đọc ra hàm ý: 前向きに検討します nghe tích cực nhưng giọng điệu (口ぶり) lại cho thấy khó được. Câu 1 (見込み違い, dự đoán sai) cũng mang sắc thái tiêu cực nên dễ chọn, nhưng nói về phán đoán của người nói đã sai, không phải khả năng nhận đơn. 願ったりかなったり là "đúng như mong muốn", 折り紙付き là "đã được bảo chứng".',
      ],
    ],
    points: [
      ['口ぶり', 'くちぶり', 'giọng điệu, cách nói'],
      ['望み薄', 'のぞみうす', 'ít hy vọng'],
      ['前向きに検討する', 'まえむきにけんとうする', 'xem xét một cách tích cực (thường là lời khách sáo)'],
    ],
  }),
  item('mock2', 'goi', 8, {
    questions: [
      [
        '新しい会計システムの導入に＿＿＿、来月から経費精算の手順の一部が変わります。',
        ['沿い', '伴い', '応じ', '基づき'],
        1,
        'Câu 2: Nに伴い = cùng với / do N mà kéo theo; việc đưa hệ thống mới vào kéo theo thay đổi quy trình. Câu 4 (に基づき, dựa trên) dễ chọn vì cũng là văn viết trang trọng, nhưng phải dựa vào quy định, số liệu, không "dựa vào việc đưa vào sử dụng". に沿い (theo đúng) và に応じ (tuỳ theo) không hợp.',
      ],
    ],
    points: [
      ['～に伴い', 'にともない', 'cùng với, kéo theo'],
      ['経費精算', 'けいひせいさん', 'thanh toán chi phí'],
    ],
  }),
  item('mock2', 'goi', 9, {
    questions: [
      [
        '急なお願いで恐縮ですが、明日の打ち合わせの開始時刻を一時間ほど＿＿＿いただけないでしょうか。',
        ['ずらして', 'ずれて', '外して', '逃して'],
        0,
        'Câu 1: 時刻をずらす = dời giờ sang lúc khác (tha động từ, có を). Câu 2 (ずれて) là tự động từ cùng cặp: "bị lệch" (時刻がずれる), không thể nhờ người khác ずれていただく. 外す là bỏ ra, 逃す là để lỡ.',
      ],
    ],
    points: [
      ['ずらす', 'ずらす', 'dời, xê dịch (giờ, lịch)'],
      ['恐縮ですが', 'きょうしゅくですが', 'thật ngại nhưng …'],
    ],
  }),
  item('mock2', 'goi', 10, {
    questions: [
      [
        '今回の値上げは、原材料費の高騰を考えれば＿＿＿判断だが、顧客への説明は丁寧に行う必要がある。',
        ['もってのほかの', 'ほかならない', '取るに足らない', 'やむを得ない'],
        3,
        'Câu 4: やむを得ない = đành phải, không còn cách nào khác; câu thừa nhận việc tăng giá là bất đắc dĩ (khi chi phí nguyên liệu tăng vọt) rồi chuyển ý bằng が. Câu 1 (もってのほか, không thể chấp nhận) trái logic: xét tới chi phí tăng thì việc tăng giá có lý do, không phải điều quá quắt. ほかならない cần dạng Nにほかならない; 取るに足らない là "không đáng kể", không hợp với 判断 ở đây.',
      ],
    ],
    points: [
      ['やむを得ない', 'やむをえない', 'bất đắc dĩ, đành phải'],
      ['高騰', 'こうとう', 'tăng vọt (giá)'],
    ],
  }),
  // 表現読解: one sentence or a short A/B exchange with a ＿＿＿ blank (spec, calibration rules 3 and 11).
  item('mock2', 'hyogen', 1, {
    questions: [
      [
        '（取引先に電話で）お送りいただいたカタログ、さっそく＿＿＿。',
        ['ご覧になりました', '拝見になりました', 'お見えになりました', '拝見いたしました'],
        3,
        'Người xem catalogue là mình, nói với khách nên dùng khiêm nhường 拝見いたしました (lựa chọn 4). Lựa chọn 1 dễ nhầm nhất: ご覧になる đúng nghĩa "xem" nhưng là tôn kính, dành cho hành động của khách. Lựa chọn 2 ghép khiêm nhường 拝見 với khuôn tôn kính ～になる. お見えになる nghĩa là "đến", sai nghĩa.',
      ],
    ],
    points: [
      ['拝見する', 'はいけんする', 'xem (khiêm nhường)'],
      ['ご覧になる', 'ごらんになる', 'xem (tôn kính)'],
    ],
  }),
  item('mock2', 'hyogen', 2, {
    questions: [
      [
        '（社外向けの案内状の書き出し）＿＿＿　このたび弊社は本社を移転することとなりました。',
        ['お取引先各位様', 'お取引先各位', 'お取引先様各位', 'お取引先御中様'],
        1,
        '各位 đã có nghĩa "kính gửi các quý vị", nên viết お取引先各位 (lựa chọn 2). Lựa chọn 1 và 3 dễ nhầm vì trông lịch sự hơn, nhưng thêm 様 cạnh 各位 là kính ngữ thừa. 御中 dùng cho một tổ chức cụ thể, không ghép với 様 (lựa chọn 4).',
      ],
    ],
    points: [
      ['各位', 'かくい', 'kính gửi các quý vị'],
      ['移転', 'いてん', 'chuyển trụ sở'],
    ],
  }),
  item('mock2', 'hyogen', 3, {
    questions: [
      [
        '（電話で相手の声が聞き取りにくい）＿＿＿、お電話が少し遠いようなのですが……。',
        ['恐れ入りますが', 'おかげさまで', 'せっかくですが', 'お言葉ですが'],
        0,
        'Báo cho người kia điều bất tiện (nghe không rõ) một cách lịch sự thì đệm bằng 恐れ入りますが (lựa chọn 1). Lựa chọn 4 お言葉ですが dùng khi phản bác ý kiến người trên, ở đây không có gì để phản bác. Lựa chọn 3 dùng khi khước từ ý tốt. Lựa chọn 2 là lời cảm ơn khi được hỏi thăm.',
      ],
    ],
    points: [
      ['電話が遠い', 'でんわがとおい', 'nghe điện thoại không rõ'],
      ['恐れ入りますが', 'おそれいりますが', 'xin lỗi đã làm phiền (câu đệm)'],
    ],
  }),
  item('mock2', 'hyogen', 4, {
    questions: [
      [
        '（会議の冒頭で司会が）それでは、定刻になりましたので、会議を＿＿＿。',
        ['始めさせていただきました', '始めていただきます', '始めさせていただきます', 'お始めになります'],
        2,
        'Người dẫn chương trình tuyên bố bắt đầu ngay bây giờ: 始めさせていただきます (lựa chọn 3). Lựa chọn 1 dễ nhầm nhất vì cùng khuôn nhưng ở thì quá khứ, cuộc họp chưa bắt đầu. Lựa chọn 2 nghĩa là "nhờ người khác bắt đầu". Lựa chọn 4 là tôn kính ngữ cho hành động của chính mình.',
      ],
    ],
    points: [
      ['定刻', 'ていこく', 'giờ đã định'],
      ['冒頭', 'ぼうとう', 'phần mở đầu'],
    ],
  }),
  item('mock2', 'hyogen', 5, {
    questions: [
      [
        '（訪問先の受付で）本日14時に営業部の三浦様と＿＿＿、東都商事の内田と申します。',
        ['お約束なさっております', 'お約束になっております', 'お約束を差し上げております', 'お約束をいただいております'],
        3,
        'Khách tự giới thiệu, nói về cuộc hẹn mà phía công ty kia dành cho mình: お約束をいただいております (lựa chọn 4). Lựa chọn 1 và 2 là tôn kính ngữ, dùng cho chính mình là sai chủ thể. Lựa chọn 3 dễ nhầm vì cũng là khiêm nhường, nhưng 約束 không "dâng" cho người khác được; câu không tự nhiên.',
      ],
    ],
    points: [
      ['お約束をいただく', 'おやくそくをいただく', 'được hẹn gặp'],
      ['と申します', 'ともうします', 'tên tôi là (khiêm nhường)'],
    ],
  }),
  item('mock2', 'hyogen', 6, {
    questions: [
      [
        '（値引きを頼まれて）A：もう少しお安くなりませんか。B：大変申し訳ないのですが、これ以上のお値引きは＿＿＿。',
        ['いたしかねます', 'なさりかねます', 'いたしかねません', 'お受けかねます'],
        0,
        'B từ chối khéo: ～かねます = không thể, dùng với いたす (khiêm nhường) cho hành động của mình → いたしかねます (lựa chọn 1). Lựa chọn 3 dễ nhầm nhất: ～かねない nghĩa là "có thể xảy ra (điều xấu)", ý ngược hẳn. Lựa chọn 2 là tôn kính ngữ cho việc của mình. お受けかねます sai dạng (phải là お受けいたしかねます).',
      ],
    ],
    points: [
      ['いたしかねる', 'いたしかねる', 'không thể (từ chối trang trọng)'],
      ['値引き', 'ねびき', 'giảm giá'],
    ],
  }),
  item('mock2', 'hyogen', 7, {
    questions: [
      [
        '（メールで取引先の誤りを伝える）＿＿＿、お見積書の合計金額が明細と合っていないようです。',
        ['おかげさまで', 'せっかくですが', '申し上げにくいのですが', 'ご無沙汰しておりますが'],
        2,
        'Chỉ ra lỗi của đối tác là điều khó nói, nên đệm bằng 申し上げにくいのですが (lựa chọn 3). Lựa chọn 2 せっかくですが dùng khi từ chối ý tốt, không dùng khi báo lỗi. Lựa chọn 4 là lời chào khi lâu không liên lạc, trong khi hai bên đang trao đổi báo giá. Lựa chọn 1 là lời cảm ơn, trái ý câu sau.',
      ],
    ],
    points: [
      ['明細', 'めいさい', 'bảng chi tiết'],
      ['申し上げにくい', 'もうしあげにくい', 'khó nói (khiêm nhường)'],
    ],
  }),
  item('mock2', 'hyogen', 8, {
    questions: [
      [
        '（訪問先で、出迎えた相手に）本日はお忙しいところ、＿＿＿ありがとうございます。',
        ['わざわざお越しいただき', 'お時間をいただき', 'お運びいただき', 'おいでくださり'],
        1,
        'Người nói là khách: cảm ơn chủ nhà đã dành thời gian, お時間をいただき (lựa chọn 2). Lựa chọn 1, 3, 4 đều là câu chủ nhà nói để cảm ơn khách đã đến; khách nói thì ngược vai. Lựa chọn 1 dễ nhầm nhất vì rất lịch sự, nhưng người "đến" ở đây chính là mình.',
      ],
    ],
    points: [
      ['出迎える', 'でむかえる', 'ra đón'],
      ['お運びいただく', 'おはこびいただく', 'được (quý khách) đến'],
    ],
  }),
  item('mock2', 'hyogen', 9, {
    questions: [
      [
        '（上司に企画書を渡して）課長、お手すきの際に、この企画書に一度目を＿＿＿。',
        ['通させていただけませんか', 'お通ししましょうか', '通していただきましょうか', '通していただけますか'],
        3,
        'Nhờ trưởng phòng xem qua: 目を通していただけますか (lựa chọn 4). Lựa chọn 1 dễ nhầm nhất vì cũng là lời xin lịch sự, nhưng ～させていただけませんか nghĩa là "cho tôi xem", sai người làm. Lựa chọn 2 và 3 là lời đề nghị "để tôi…", "hay là nhờ… nhé", không phải lời nhờ.',
      ],
    ],
    points: [
      ['目を通す', 'めをとおす', 'xem qua'],
      ['お手すき', 'おてすき', 'lúc rảnh tay'],
    ],
  }),
  item('mock2', 'hyogen', 10, {
    questions: [
      [
        '（電話で取引先に）申し訳ございません。部長の岡本は、本日＿＿＿。',
        ['休みを取っております', 'お休みになっております', 'お休みをいただかれております', '休まれております'],
        0,
        'Nói với người ngoài về trưởng bộ phận của công ty mình thì không dùng tôn kính: 休みを取っております (lựa chọn 1). Lựa chọn 2 và 4 đúng ý "nghỉ" nhưng là tôn kính ngữ, sai chủ thể. Lựa chọn 3 ghép khiêm nhường いただく với tôn kính ～れる, thành kính ngữ lẫn lộn.',
      ],
    ],
    points: [
      ['ておる', 'ておる', 'đang (khiêm nhường của ている)'],
      ['部長の岡本', 'ぶちょうのおかもと', 'trưởng bộ phận Okamoto (cách gọi người nhà với khách)'],
    ],
  }),
  // 総合読解: business documents, one question each (spec, calibration rules 2, 3, 12).
  item('mock2', 'sogo-dokkai', 1, {
    material: {
      kind: 'text',
      title: '試作品評価のお願い',
      body: '前略　取り急ぎ用件のみ申し上げます。\n先日の展示会でご関心をお寄せいただいた業務用保冷バッグの試作品を、本日別便にてお送りいたしました。実際の配送業務でお使いいただき、保冷力や持ちやすさについて、同封の評価シートにご記入のうえ、2027年3月26日（金）までにご返送いただけますと幸いです。\nなお、試作品はご返却いただく必要はございません。\n草々\n\n株式会社ノースパック　開発部　谷口',
    },
    questions: [
      [
        'この手紙を受け取った人が求められていることは何ですか。',
        ['試作品を3月26日までに送り返す', '展示会で試作品の感想を伝える', '試作品を使い、評価を書いて返送する', '評価シートを受け取りに展示会へ行く'],
        2,
        'Thư nhờ dùng thử túi giữ lạnh trong công việc giao hàng, ghi vào phiếu đánh giá rồi gửi lại trước 26/3 → lựa chọn 3. Lựa chọn 1 dễ nhầm vì có hạn 26/3, nhưng thứ phải gửi lại là phiếu đánh giá; sản phẩm mẫu thì không cần trả (ご返却いただく必要はございません). Hội chợ đã diễn ra rồi.',
      ],
    ],
    points: [
      ['前略', 'ぜんりゃく', 'xin lược phần chào hỏi (mở thư)'],
      ['別便', 'べつびん', 'gửi riêng (bưu kiện khác)'],
      ['返却', 'へんきゃく', 'trả lại'],
    ],
  }),
  item('mock2', 'sogo-dokkai', 2, {
    material: {
      kind: 'text',
      title: 'お支払い条件変更のご相談について',
      body: '株式会社サンライズ食品　営業部　北村様\n\nいつも大変お世話になっております。かもめ物産購買部の平田です。\n先日ご相談いただきました、お支払いサイトを60日から30日へ短縮する件につきまして、社内で協議いたしました。御社のご事情は十分に理解しておりますが、弊社では全取引先と同一の条件で運用しており、個別の変更は難しいとの結論になりました。\nご期待に沿えず、誠に申し訳ございません。今後ともよろしくお願い申し上げます。',
    },
    questions: [
      [
        'このメールで平田さんが伝えていることは何ですか。',
        ['支払い条件の変更には応じられない', '支払いまでの期間を30日に短くする', '全取引先の支払い条件を見直す予定だ', '条件変更について改めて相談したい'],
        0,
        'Thư từ chối khéo: công ty áp một điều kiện chung cho mọi đối tác, đổi riêng là khó (難しいとの結論), ご期待に沿えず = không đáp ứng được → lựa chọn 1. Lựa chọn 2 dễ nhầm vì là đúng đề nghị của bên kia. Lựa chọn 3 lấy chữ 全取引先, nhưng thư nói điều kiện chung giữ nguyên.',
      ],
    ],
    points: [
      ['支払いサイト', 'しはらいさいと', 'thời hạn thanh toán'],
      ['協議', 'きょうぎ', 'bàn bạc'],
      ['ご期待に沿えず', 'ごきたいにそえず', 'không đáp ứng được mong đợi'],
    ],
  }),
  item('mock2', 'sogo-dokkai', 3, {
    material: {
      kind: 'text',
      title: '合同企業説明会への出展について',
      body: '採用チーム各位\n\n人事部の松本です。来月の合同企業説明会に、今年も出展することが決まりました。当日は2名ずつ、午前と午後の交代制とします。担当を希望する時間帯を、今週金曜日までにお知らせください。\n\n記\n日時：2027年3月6日（土）10:00〜16:00\n会場：さくら国際会議場　2階展示ホール\n配布資料：会社案内　計300部（うち英語版100部）\n持参物：ブース用パネル2枚、ノベルティ（ボールペン）300本\n以上',
    },
    questions: [
      [
        '日本語版の会社案内は何部用意しますか。',
        ['100部', '300部', '400部', '200部'],
        3,
        'Tổng cộng 300 bản giới thiệu công ty, trong đó (うち) 100 bản tiếng Anh, nên bản tiếng Nhật là 300 − 100 = 200 (lựa chọn 4). Lựa chọn 2 dễ nhầm vì là con số ghi ngay trên giấy, nhưng đó là tổng. Lựa chọn 3 cộng thêm 100, hiểu nhầm うち thành "thêm".',
      ],
    ],
    points: [
      ['うち', 'うち', 'trong số đó'],
      ['合同企業説明会', 'ごうどうきぎょうせつめいかい', 'hội chợ giới thiệu doanh nghiệp chung'],
      ['交代制', 'こうたいせい', 'chế độ đổi ca'],
    ],
  }),
  item('mock2', 'sogo-dokkai', 4, {
    material: {
      kind: 'text',
      title: '第2工場 設備点検に伴うライン停止について',
      body: '営業部各位\n\n生産管理課です。第2工場の定期設備点検のため、5月10日（月）から12日（水）までの3日間、全ラインを停止します。\nこの期間に出荷予定の受注がある場合は、4月23日（金）までに生産管理課へ品番と数量をお知らせください。点検前に前倒しで生産し、在庫から出荷できるよう調整します。\nなお、第1工場の製品は通常どおり出荷できます。',
    },
    questions: [
      [
        '第2工場の製品を5月11日に出荷したい営業部の社員は、何をしなければなりませんか。',
        ['第1工場で代わりに生産するよう頼む', '4月23日までに品番と数量を知らせる', '5月12日以降に出荷日を変えてもらう', '点検の日程をずらすよう頼む'],
        1,
        'Ngày 11/5 nằm trong thời gian dừng dây chuyền, nên phải báo mã hàng và số lượng cho phòng quản lý sản xuất trước 23/4 để họ sản xuất trước → lựa chọn 2. Lựa chọn 1 dễ nhầm vì thông báo có nhắc nhà máy 1, nhưng chỉ nói hàng của nhà máy 1 vẫn xuất bình thường, không nói chuyển sản xuất sang đó.',
      ],
    ],
    points: [
      ['前倒し', 'まえだおし', 'làm sớm hơn'],
      ['品番', 'ひんばん', 'mã hàng'],
      ['生産管理', 'せいさんかんり', 'quản lý sản xuất'],
    ],
  }),
  item('mock2', 'sogo-dokkai', 5, {
    material: {
      kind: 'text',
      title: '受注専用FAX廃止のお知らせ',
      body: 'お取引先各位\n\n平素より格別のご高配を賜り、厚く御礼申し上げます。\n弊社では、受注業務の効率化と誤発注の防止のため、2027年6月30日（水）をもちまして、受注専用FAXを廃止いたします。7月1日以降のご注文は、専用の受注サイトまたはメールにてお願いいたします。受注サイトのログインIDは、6月上旬に郵送でお知らせいたします。\nご不便をおかけしますが、何卒ご理解賜りますようお願い申し上げます。',
    },
    questions: [
      [
        'この文書の主な目的は何ですか。',
        ['受注サイトのログインIDを知らせる', '誤発注が増えていることを詫びる', '注文の方法が変わることを知らせる', 'FAXの番号が変わることを知らせる'],
        2,
        'Từ 1/7 bỏ FAX nhận đơn, đặt hàng qua trang web hoặc email → báo cách đặt hàng thay đổi (lựa chọn 3). Lựa chọn 1 dễ nhầm, nhưng ID đăng nhập sẽ gửi qua bưu điện đầu tháng 6, văn bản này chưa báo ID. FAX bị bỏ hẳn chứ không đổi số (lựa chọn 4); 誤発注の防止 là lý do, không phải lời xin lỗi.',
      ],
    ],
    points: [
      ['廃止', 'はいし', 'bãi bỏ'],
      ['をもちまして', 'をもちまして', 'kể từ, tính đến (trang trọng)'],
      ['誤発注', 'ごはっちゅう', 'đặt hàng nhầm'],
    ],
  }),
  item('mock2', 'sogo-dokkai', 6, {
    material: {
      kind: 'text',
      title: '年末調整書類の提出について',
      body: '社員各位\n\n総務部より年末調整のご案内です。\n本日、各自の社内メールボックスに「扶養控除等申告書」と「保険料控除申告書」を配付しました。必要事項を記入し、生命保険などの控除証明書を添えて、11月20日（金）までに所属長へ提出してください。所属長は内容を確認のうえ、11月27日（金）までに総務部へまとめて提出してください。\n期限を過ぎた場合、ご自身で確定申告が必要になることがあります。',
    },
    questions: [
      [
        '一般の社員は、書類をいつまでに、誰に提出しなければなりませんか。',
        ['11月27日までに総務部へ', '11月20日までに所属長へ', '11月20日までに総務部へ', '11月27日までに所属長へ'],
        1,
        'Nhân viên nộp cho trưởng bộ phận của mình trước 20/11 (2026, thứ Sáu) → lựa chọn 2. Lựa chọn 1 dễ nhầm vì là con số và nơi nhận ghi ở câu sau, nhưng đó là việc của trưởng bộ phận gom lại nộp lên phòng tổng vụ. Lựa chọn 3 và 4 ghép lẫn ngày và người nhận của hai bước.',
      ],
    ],
    points: [
      ['年末調整', 'ねんまつちょうせい', 'quyết toán thuế cuối năm'],
      ['所属長', 'しょぞくちょう', 'trưởng bộ phận mình thuộc về'],
      ['控除', 'こうじょ', 'khấu trừ'],
    ],
  }),
  item('mock2', 'sogo-dokkai', 7, {
    material: {
      kind: 'text',
      title: '新入社員歓迎会のお知らせ',
      body: '営業部の皆さん\n\n幹事の小松です。4月から配属された新入社員4名の歓迎会を、下記のとおり開きます。出欠は、4月14日（水）までに共有フォームに入力してください。\n\n記\n日時：2027年4月21日（水）18:30〜20:30\n場所：和食処「いろは」（本社から徒歩5分）\n会費：5,000円（新入社員は無料。19:30以降に参加の方は3,000円）\n以上',
    },
    questions: [
      [
        '入社3年目の社員が、仕事の都合で19時45分から参加する場合、会費はいくらですか。',
        ['3,000円', '5,000円', '無料', '2,000円'],
        0,
        'Người đến sau 19:30 đóng 3.000 yên; nhân viên năm thứ ba không phải người mới nên không được miễn → lựa chọn 1. Lựa chọn 2 là mức thường, không tính điều kiện đến muộn. Lựa chọn 3 chỉ dành cho nhân viên mới. Lựa chọn 4 là phần chênh lệch 5.000 − 3.000, không phải mức phí.',
      ],
    ],
    points: [
      ['幹事', 'かんじ', 'người tổ chức (tiệc)'],
      ['会費', 'かいひ', 'phí tham gia'],
      ['出欠', 'しゅっけつ', 'có mặt hay vắng'],
    ],
  }),
  item('mock2', 'sogo-dokkai', 8, {
    material: {
      kind: 'text',
      title: '春の販促企画　打ち合わせ議事録',
      body: '日時：2027年1月27日（水）14:00〜15:00\n出席：販売促進課 西田課長、店舗運営課 小林、商品課 上野\n決定事項：\n1．3月の「春の新生活フェア」は、当初案の2週間から10日間に短縮する。\n2．チラシは店舗運営課が作成し、2月10日（水）までに西田課長の確認を受ける。\n3．目玉商品の選定は商品課が行い、候補を2月3日（水）までに共有する。\n4．のぼり旗の発注は、チラシ確定後に販売促進課が行う。',
    },
    questions: [
      [
        '商品課の上野さんが、2月3日までにしなければならないことは何ですか。',
        ['チラシを作って西田課長に見せる', 'フェアの期間を10日間に短くする', 'のぼり旗を業者に発注する', '目玉にする商品の候補を共有する'],
        3,
        'Mục 3: phòng hàng hoá chọn mặt hàng chủ lực và chia sẻ danh sách ứng viên trước 3/2 → lựa chọn 4. Lựa chọn 1 dễ nhầm vì cũng có hạn chót, nhưng tờ rơi là việc của phòng vận hành cửa hàng, hạn 10/2. Rút ngắn hội chợ đã quyết trong buổi họp, cờ quảng cáo là việc của phòng xúc tiến bán hàng.',
      ],
    ],
    points: [
      ['目玉商品', 'めだましょうひん', 'mặt hàng chủ lực (thu hút khách)'],
      ['販促', 'はんそく', 'xúc tiến bán hàng'],
      ['のぼり旗', 'のぼりばた', 'cờ đứng quảng cáo'],
    ],
  }),
  item('mock2', 'sogo-dokkai', 9, {
    material: {
      kind: 'text',
      title: '電気ケトル「KT-15」回収・交換のお知らせ',
      body: 'お客様各位\n\nこのたび、弊社が2027年1月に販売した電気ケトル「KT-15」の一部に、電源コードの接続部が発熱するおそれがあることが判明いたしました。現在までに事故の報告はございませんが、お客様の安全を第一に考え、該当製品を無償で回収し、新品と交換させていただきます。\n製品底面の製造番号が「2701」で始まる場合は、ご使用を中止し、回収窓口（フリーダイヤル、平日9時〜17時）までご連絡ください。',
    },
    questions: [
      [
        'この文書の主な目的は何ですか。',
        ['発熱による事故が起きたことを詫びる', '製品を回収して交換すると知らせる', '製品の正しい使い方を説明する', '新しい電気ケトルの発売を知らせる'],
        1,
        'Một phần ấm điện có thể nóng ở chỗ nối dây, công ty thu hồi miễn phí và đổi sản phẩm mới → lựa chọn 2. Lựa chọn 1 dễ nhầm vì có chữ 発熱, nhưng văn bản nói rõ chưa có báo cáo tai nạn nào. Đổi "hàng mới" là đổi cái ấm cùng loại, không phải ra mắt sản phẩm mới.',
      ],
    ],
    points: [
      ['回収', 'かいしゅう', 'thu hồi'],
      ['該当', 'がいとう', 'thuộc diện, tương ứng'],
      ['無償', 'むしょう', 'miễn phí'],
    ],
  }),
  item('mock2', 'sogo-dokkai', 10, {
    material: {
      kind: 'text',
      title: '社内報「みらい」春号　原稿のお願い',
      body: '各部　広報担当者各位\n\n広報室です。社内報「みらい」春号の特集「部署紹介」の原稿をお願いします。\n文字数は800字程度、写真は2枚までです。原稿は3月12日（金）までにお送りください。ただし、写真はレイアウトを先に決めるため、原稿より1週間早く、3月5日（金）までに広報室へお送りください。\nなお、4月上旬に、掲載前の校正刷りを各部へお送りします。',
    },
    questions: [
      [
        '写真の提出期限はいつですか。',
        ['3月12日（金）', '3月19日（金）', '3月5日（金）', '4月上旬'],
        2,
        'ただし: ảnh phải gửi sớm hơn bản thảo một tuần, trước 5/3 (thứ Sáu) → lựa chọn 3. Lựa chọn 1 dễ nhầm vì là hạn của bản thảo chữ, ghi trước. Lựa chọn 2 hiểu nhầm "1週間" thành muộn hơn một tuần. Đầu tháng 4 là lúc phòng truyền thông gửi bản in thử.',
      ],
    ],
    points: [
      ['社内報', 'しゃないほう', 'bản tin nội bộ'],
      ['校正', 'こうせい', 'hiệu đính, sửa bản in'],
      ['レイアウト', 'れいあうと', 'bố cục trang'],
    ],
  }),
];

import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/**
 * Full test 2 — reading part (語彙・文法 10 + 表現読解 10 + 総合読解 10). Mixed themes.
 * About a third of the questions are J1+ (implied meaning, combining two conditions, keigo nuance, a small sum).
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

  // ── 表現読解 ──────────────────────────────────────────────
  item('mock2', 'hyogen', 1, {
    material: {
      kind: 'text',
      title: '会議室の予約について',
      body: '社員各位\n\n本社の会議室は、使用日の2週間前から社内システムで予約できます。\nただし、社外のお客様をお招きする会議に限り、1か月前から予約することができます。\nなお、予約後に使用しなくなった場合は、使用日の前日までに必ず取り消してください。\n\n総務部',
    },
    questions: [
      [
        '今日は10月1日です。11月15日に取引先を招いて会議を開く場合、会議室はいつから予約できますか。',
        ['今日から予約できる', '10月15日から予約できる', '11月1日から予約できる', '11月14日まで予約できない'],
        1,
        'Câu 2: sau ただし, cuộc họp có khách bên ngoài được đặt trước một tháng, tức từ 15/10. Câu 3 (11/1) là mốc hai tuần áp cho cuộc họp nội bộ, đúng quy định chung nhưng bỏ sót ngoại lệ. 11/14 là hạn huỷ phòng, không phải mốc đặt.',
      ],
    ],
    points: [
      ['お招きする', 'おまねきする', 'mời (khiêm nhường)'],
      ['取り消す', 'とりけす', 'huỷ (đặt chỗ)'],
    ],
  }),
  item('mock2', 'hyogen', 2, {
    material: {
      kind: 'text',
      body: '株式会社リョウセイ 営業部 長谷部様\n\nこのたびは、来月の懇親会にお招きいただき、誠にありがとうございます。\nせっかくのお誘いですが、あいにく当日は以前から決まっておりました海外出張と重なってしまい、私は伺うことができません。誠に残念です。\nつきましては、もしご迷惑でなければ、私の代わりに同じ課の森を出席させていただけないでしょうか。森は日頃から御社を担当しておりますので、皆様にご挨拶できれば幸いです。\n\n東洋産業 営業一課 山下',
    },
    questions: [
      [
        '山下さんの希望どおりになった場合、懇親会には東洋産業からだれが出席しますか。',
        ['山下さんだけ', '山下さんと森さん', '森さんだけ', 'だれも出席しない'],
        2,
        'Câu 3: Yamashita không đi được vì trùng chuyến công tác, và xin cho Mori thay mình (私の代わりに). Câu 4 là cách hiểu nếu chỉ đọc nửa đầu lời từ chối. Câu 2 sai vì 代わりに nghĩa là Mori đi thay, không phải đi cùng.',
      ],
    ],
    points: [
      ['懇親会', 'こんしんかい', 'buổi giao lưu, tiệc thân mật'],
      ['あいにく', 'あいにく', 'không may là'],
      ['～の代わりに', 'のかわりに', 'thay cho …'],
    ],
  }),
  item('mock2', 'hyogen', 3, {
    material: {
      kind: 'text',
      title: '価格改定のお知らせ',
      body: 'お取引先各位\n\n平素は格別のお引き立てを賜り、厚く御礼申し上げます。\n原材料費および物流費の上昇が続いておりますため、誠に不本意ながら、来年4月1日ご注文分より、全製品の価格を5%改定させていただきます。\nただし、3月31日までにご注文いただいた分につきましては、納品が4月以降となる場合でも、改定前の価格にてお納めいたします。\n何卒ご理解賜りますよう、お願い申し上げます。\n\n株式会社ミツバ工業 営業本部',
    },
    questions: [
      [
        '3月25日に注文し、4月10日に納品される製品の価格はどうなりますか。',
        ['改定前の価格のまま', '5%上がった価格', '納品の日に決まる価格', '改定前と改定後の中間の価格'],
        0,
        'Câu 1: mốc tính là ngày đặt hàng. Sau ただし, đơn đặt trước 31/3 vẫn theo giá cũ dù giao sau tháng 4. Câu 2 dễ chọn nếu nhìn vào ngày giao 10/4, nhưng thông báo nói rõ 4月1日ご注文分より mới áp giá mới.',
      ],
    ],
    points: [
      ['価格改定', 'かかくかいてい', 'điều chỉnh giá'],
      ['不本意ながら', 'ふほんいながら', 'dù không muốn, bất đắc dĩ'],
      ['お引き立て', 'おひきたて', 'sự ủng hộ (của khách)'],
    ],
  }),
  item('mock2', 'hyogen', 4, {
    material: {
      kind: 'text',
      title: '社内システム停止のお知らせ',
      body: '社員各位\n\nサーバー更新作業のため、下記の時間帯に社内システムを停止します。\n停止日時：11月30日（土）22:00〜12月1日（日）6:00\n停止中に利用できないもの：経費精算、勤怠入力、社内ポータル\n社内メールは、会社のパソコンからであれば停止中も通常どおり利用できます。ただし、スマートフォンでのメールの閲覧・送信は、停止中はできません。\n\n情報システム部',
    },
    questions: [
      [
        'システム停止中にできることはどれですか。',
        ['スマートフォンでメールを読む', '経費の精算を申請する', '勤怠を入力する', '会社のパソコンでメールを送る'],
        3,
        'Câu 4: thư nội bộ vẫn dùng bình thường nếu gửi từ máy tính công ty. Câu 1 dễ chọn vì "email vẫn dùng được", nhưng sau ただし điện thoại bị chặn cả đọc lẫn gửi. Thanh toán chi phí và chấm công nằm trong danh sách không dùng được.',
      ],
    ],
    points: [
      ['勤怠', 'きんたい', 'chấm công (đi làm, nghỉ)'],
      ['閲覧', 'えつらん', 'xem, đọc (tài liệu, trang)'],
    ],
  }),
  item('mock2', 'hyogen', 5, {
    material: {
      kind: 'text',
      body: 'アルファ設計 近藤様\n\n先日はお忙しいところ、新しいオフィス改装プランのご提案をいただき、ありがとうございました。\n社内でも拝見いたしましたが、デザイン、使い勝手ともに大変魅力的なプランだと感じております。\nただ、弊社の現在の予算規模を考えますと、今回のプランは少々荷が重いというのが正直なところです。\n今後とも何かとご相談させていただくことがあるかと存じますので、引き続きよろしくお願いいたします。\n\n丸星物産 総務部 井上',
    },
    questions: [
      [
        '井上さんがこのメールで伝えたいことは何ですか。',
        ['プランを採用したい', 'プランのデザインに不満がある', '今の予算ではプランの採用は難しい', '予算を増やしてプランを採用する'],
        2,
        'Câu 3: 荷が重い = quá sức, gánh không nổi; đây là lời từ chối nói vòng vì ngân sách. Câu 1 dễ chọn vì thư khen bản đề xuất (大変魅力的), nhưng lời khen chỉ để làm mềm lời từ chối sau ただ. Không có ý tăng ngân sách hay chê thiết kế.',
      ],
    ],
    points: [
      ['荷が重い', 'にがおもい', 'quá sức, gánh không nổi'],
      ['使い勝手', 'つかいがって', 'độ tiện dụng'],
      ['正直なところ', 'しょうじきなところ', 'nói thật lòng thì'],
    ],
  }),
  item('mock2', 'hyogen', 6, {
    material: {
      kind: 'text',
      title: '定期健康診断のお知らせ',
      body: '社員各位\n\n今年度の定期健康診断を、12月2日（月）から4日（水）まで本社3階で実施します。費用は会社が負担します。\n出張などで期間中に社内で受診できない方は、12月27日までに会社指定の医療機関で受診してください。この場合の費用も会社が負担します。\nなお、診断の結果、再検査が必要となった場合の費用は、各自の負担となります。\n\n人事部 厚生担当',
    },
    questions: [
      [
        'この通知の内容と合っているものはどれですか。',
        ['再検査の費用も会社が払う', '社内で受けられない人は、指定の医療機関で受けられる', '健康診断は希望者だけが受ける', '指定の医療機関で受ける場合は自分で費用を払う'],
        1,
        'Câu 2: ai vắng trong ba ngày khám tại công ty thì khám ở cơ sở y tế được chỉ định trước 27/12. Câu 4 dễ nhầm vì có nhắc chi phí cá nhân, nhưng đó là phí khám lại (sau なお); khám ở cơ sở chỉ định vẫn do công ty trả (この場合の費用も会社が負担).',
      ],
    ],
    points: [
      ['受診する', 'じゅしんする', 'đi khám bệnh'],
      ['再検査', 'さいけんさ', 'kiểm tra lại'],
      ['各自', 'かくじ', 'mỗi người, tự mình'],
    ],
  }),
  item('mock2', 'hyogen', 7, {
    material: {
      kind: 'text',
      body: '株式会社ナカニシ 経理部 小島様\n\nいつもお世話になっております。北斗電機 購買部の三浦です。\n先日お送りいただいた11月分の請求書について確認いたしましたところ、部品の単価がお見積書の金額と異なっておりました。\nお手数をおかけしますが、お見積書の単価に修正のうえ、再発行をお願いできますでしょうか。\nなお、お送りいただいた請求書の原本はこちらで破棄いたしますので、ご返送いただくには及びません。',
    },
    questions: [
      [
        '小島さんがしなければならないことは何ですか。',
        ['見積書を作り直して送る', '元の請求書を回収する', '部品の単価を見直して値上げする', '請求書を正しい単価で作り直して送る'],
        3,
        'Câu 4: khách nhờ sửa đơn giá theo bảng báo giá rồi phát hành lại hoá đơn. Câu 2 dễ chọn nếu đọc nhầm câu sau なお: ご返送いただくには及びません nghĩa là "không cần gửi trả", bên kia tự huỷ bản gốc. Bảng báo giá là chuẩn đúng, không phải thứ cần làm lại.',
      ],
    ],
    points: [
      ['再発行', 'さいはっこう', 'phát hành lại'],
      ['破棄する', 'はきする', 'huỷ bỏ (giấy tờ)'],
      ['～には及ばない', 'にはおよばない', 'không cần phải …'],
    ],
  }),
  item('mock2', 'hyogen', 8, {
    material: {
      kind: 'text',
      body: '開発部 各位\n\n来期の新規事業に関する企画書の案を添付いたします。\n来週の部内会議にかける前に、皆様のお考えを反映させたいと考えております。\nご多忙のところ誠に恐縮ですが、ご高覧のうえ、11月22日までにご意見を賜れれば幸いです。\n\n開発部 企画課 福田',
    },
    questions: [
      [
        '福田さんが頼んでいることは何ですか。',
        ['企画書の案を読んで、意見を言ってほしい', '来週の部内会議に出席してほしい', '企画書の案を印刷して配ってほしい', '企画書を部内会議で発表してほしい'],
        0,
        'Câu 1: ご高覧 = xem, đọc (tôn kính ngữ), ご意見を賜れれば幸いです = mong được góp ý. Câu 2 lấy cuộc họp tuần sau có trong thư, nhưng cuộc họp chỉ là lý do cần ý kiến sớm; thư không mời ai tham dự.',
      ],
    ],
    points: [
      ['ご高覧', 'ごこうらん', 'xem, đọc (tôn kính ngữ)'],
      ['賜る', 'たまわる', 'nhận được (khiêm nhường, rất trang trọng)'],
      ['会議にかける', 'かいぎにかける', 'đưa ra cuộc họp bàn'],
    ],
  }),
  item('mock2', 'hyogen', 9, {
    material: {
      kind: 'text',
      title: '国内出張旅費規程（抜粋）',
      body: '第5条（宿泊費）\n宿泊費は、1泊につき12,000円を上限として実費を支給する。ただし、東京都内および大阪市内に宿泊する場合の上限は、1泊15,000円とする。\n2　上限を超えた額は、出張者の自己負担とする。',
    },
    questions: [
      [
        '大阪市内で1泊16,000円のホテルに2泊した場合、自己負担はいくらになりますか。',
        ['自己負担はない', '1,000円', '2,000円', '8,000円'],
        2,
        'Câu 3: ở Osaka mức trần là 15.000 yên một đêm (ngoại lệ sau ただし), vượt 1.000 yên × 2 đêm = 2.000 yên. Câu 4 (8.000 yên) là kết quả nếu dùng mức trần chung 12.000 yên mà quên ngoại lệ. Câu 2 chỉ tính một đêm.',
      ],
    ],
    points: [
      ['実費', 'じっぴ', 'chi phí thực tế'],
      ['上限', 'じょうげん', 'mức trần'],
      ['自己負担', 'じこふたん', 'tự chi trả'],
    ],
  }),
  item('mock2', 'hyogen', 10, {
    material: {
      kind: 'text',
      title: '在宅勤務者の通勤手当について',
      body: '社員各位\n\n来月から、通勤手当の支給方法を次のとおり変更します。\n・在宅勤務の日数が、その月の所定勤務日数の半分を超える社員には、通勤定期代に代えて、実際に出社した日の往復交通費を支給します。\n・在宅勤務の日数が半分以下の社員には、これまでどおり通勤定期代を支給します。\n\n人事部',
    },
    questions: [
      [
        '所定勤務日数が20日の月に、12日在宅勤務をした社員にはどう支給されますか。',
        ['通勤定期代が支給される', '出社した8日分の往復交通費が支給される', '在宅勤務をした12日分の手当が支給される', '交通費は支給されない'],
        1,
        'Câu 2: 12 ngày ở nhà là quá nửa của 20 ngày, nên thay vé tháng bằng tiền đi lại khứ hồi cho số ngày thực sự lên công ty: 20 − 12 = 8 ngày. Câu 1 chỉ áp khi ngày ở nhà từ một nửa trở xuống. Câu 3 nhầm: tiền trả cho ngày đi làm, không phải ngày ở nhà.',
      ],
    ],
    points: [
      ['通勤手当', 'つうきんてあて', 'phụ cấp đi lại'],
      ['所定', 'しょてい', 'theo quy định'],
      ['～に代えて', 'にかえて', 'thay cho …'],
    ],
  }),

  // ── 総合読解 ──────────────────────────────────────────────
  item('mock2', 'sogo-dokkai', 1, {
    material: {
      kind: 'text',
      title: '中小企業の価格転嫁、進むも「道半ば」',
      body: '原材料やエネルギー価格の上昇が続くなか、中小企業がコストの増加分を取引価格に上乗せする「価格転嫁」が少しずつ進んでいる。民間調査会社のアオバリサーチが今年9月に実施した調査によると、コスト上昇分の「半分以上」を転嫁できたと答えた中小企業は42%で、前年の31%から上昇した。\nただし、業種による差は大きい。食品製造業では55%が半分以上を転嫁できたのに対し、運送業では23%にとどまった。運送業では、荷主との力関係から値上げを切り出しにくいという声が根強い。\n転嫁が進んだ企業に共通するのは、交渉の材料を数字で示している点だ。ある金属加工会社の社長は「以前は『苦しいので何とか』と頼むだけだった。電気代や材料費の推移を表にして持っていったら、先方の担当者も社内で説明しやすくなったようで、話が早かった」と振り返る。\n一方、転嫁できた企業の中にも、「値上げを受け入れてもらった代わりに、次の契約で発注量を減らされた」という例がある。価格だけを見るのではなく、取引全体を見渡した交渉が求められている。',
    },
    questions: [
      [
        '調査の結果について、正しいものはどれですか。',
        ['半分以上を転嫁できた中小企業は、前年より減った', '食品製造業は、運送業より転嫁が進んでいる', '運送業の半数以上が、コスト上昇分の半分以上を転嫁できた', '中小企業の42%が、コスト上昇分をすべて転嫁できた'],
        1,
        'Câu 2: ngành sản xuất thực phẩm 55% so với ngành vận tải 23%. Câu 4 dễ chọn vì đúng con số 42%, nhưng 42% là chuyển được "một nửa trở lên" (半分以上), không phải "toàn bộ". Tỉ lệ này tăng từ 31% chứ không giảm.',
      ],
      [
        '金属加工会社の社長の話から分かることは何ですか。',
        ['取引先に何度も頼み込んだことで、値上げが認められた', '電気代が下がったので、値上げを取り下げた', '取引先のほうから値上げを申し出てくれた', '数字を示したことで、先方の担当者が社内を説得しやすくなった'],
        3,
        'Câu 4: mang bảng số liệu tiền điện, nguyên liệu tới thì người phụ trách bên kia dễ giải thích trong nội bộ họ, nên việc thương lượng nhanh. Câu 1 là cách làm trước đây (chỉ xin "giúp cho"), chính ông nói cách đó không hiệu quả.',
      ],
      [
        '筆者が最後の段落で言いたいことは何ですか。',
        ['値上げが認められれば、交渉は成功したと言える', '発注量を減らせば、価格転嫁は進みやすくなる', '値上げを受け入れてもらっても、ほかの条件で不利になることがあるので、取引全体を見る必要がある', '中小企業は、取引先との関係を考えて値上げを求めるべきではない'],
        2,
        'Câu 3: đoạn cuối nêu ví dụ được tăng giá nhưng hợp đồng sau bị giảm lượng đặt, rồi kết luận cần thương lượng nhìn toàn bộ giao dịch. Câu 1 là điều tác giả muốn phản bác. Câu 4 đi quá xa: tác giả không khuyên ngừng đề nghị tăng giá.',
      ],
    ],
    points: [
      ['価格転嫁', 'かかくてんか', 'chuyển phần tăng chi phí vào giá bán'],
      ['道半ば', 'みちなかば', 'mới đi được nửa đường'],
      ['切り出す', 'きりだす', 'mở lời (chuyện khó nói)'],
      ['根強い', 'ねづよい', 'dai dẳng, ăn sâu'],
    ],
  }),
  item('mock2', 'sogo-dokkai', 2, {
    material: {
      kind: 'text',
      title: '新商品「すっきり麦茶」販売会議 議事録',
      body: '日時：1月20日（月）15:00〜16:30\n出席：営業部 小林部長、マーケティング部 渡辺、製造部 中川、経理部 石井\n\n1．価格\n渡辺より、競合品より20円高い158円とする案が出された。健康志向の客層には品質の違いが伝われば受け入れられる、との説明。小林部長は、発売当初は138円にしてまず手に取ってもらうべきだと主張した。石井より、138円で利益が出るのは月20万本以上売れた場合に限られるとの指摘があった。\n協議の結果、希望小売価格は158円とし、発売から1か月間に限り、店頭で20円引きのキャンペーンを行うこととした。\n\n2．発売日\n製造部より、新ラインの試運転が遅れており、3月1日の全国発売は難しいとの報告があった。中川は、3月15日であれば確実に供給できると回答。ただし、関東地区の大手チェーン向けについては、一部を旧ラインで生産し、予定どおり3月1日に納品する。\n\n3．次回までの課題（次回：2月3日）\n・マーケティング部：キャンペーン用の店頭ポスター案を作成する。\n・経理部：キャンペーン費用の試算を行う。\n・製造部：新ラインの試運転の進み具合を報告する。',
    },
    questions: [
      [
        '発売後1か月間、店頭での価格はいくらになりますか。',
        ['118円', '138円', '158円', '178円'],
        1,
        'Câu 2: giá bán lẻ đề xuất là 158 yên, nhưng tháng đầu có chương trình giảm 20 yên tại cửa hàng: 158 − 20 = 138 yên. Câu 3 là giá niêm yết, đúng sau khi chương trình kết thúc. Con số 138 cũng trùng với đề xuất của Kobayashi, nhưng đề xuất đó không được chọn làm giá chính thức.',
      ],
      [
        '発売日について、正しいものはどれですか。',
        ['すべての地域で3月1日に発売される', 'すべての地域で3月15日に発売される', '関東地区の大手チェーンには3月1日に納品される', '新ラインの試運転は予定どおり進んでいる'],
        2,
        'Câu 3: ngoại lệ sau ただし: chuỗi lớn ở Kanto vẫn nhận hàng ngày 1/3 nhờ sản xuất một phần trên dây chuyền cũ. Câu 2 là mốc cho cả nước, đúng phần lớn nhưng bỏ sót ngoại lệ này. Dây chuyền mới đang chậm, nên câu 4 sai.',
      ],
      [
        '次回の会議までに、石井さんがしなければならないことは何ですか。',
        ['キャンペーンにかかる費用を見積もる', '店頭ポスターの案を作る', '月に何本売れるかを予測する', '新ラインの試運転の状況を報告する'],
        0,
        'Câu 1: Ishii thuộc phòng kế toán, việc của phòng kế toán là tính thử chi phí chương trình (キャンペーン費用の試算). Câu 3 dễ chọn vì Ishii từng nhắc mốc 20 vạn chai, nhưng đó là ý kiến trong cuộc họp, không phải việc được giao. Áp phích là việc của phòng marketing, báo cáo chạy thử là của phòng sản xuất.',
      ],
    ],
    points: [
      ['希望小売価格', 'きぼうこうりかかく', 'giá bán lẻ đề xuất'],
      ['試運転', 'しうんてん', 'chạy thử'],
      ['試算', 'しさん', 'tính thử, ước tính'],
      ['健康志向', 'けんこうしこう', 'hướng tới sức khoẻ'],
    ],
  }),
  item('mock2', 'sogo-dokkai', 3, {
    material: {
      kind: 'text',
      title: '保守契約更新のご案内',
      body: '株式会社ミドリ物産 総務部 原田様\n\n平素は格別のお引き立てを賜り、厚く御礼申し上げます。サンライズ通信の田村でございます。\n現在ご契約いただいております複合機保守サービス（スタンダードプラン、月額8,000円）が、来年1月31日をもって満了となります。つきましては、更新について下記のとおりご案内申し上げます。\n\n・スタンダードプラン（継続）：月額8,000円。故障時は翌営業日に訪問いたします。トナー代は別途。\n・プレミアムプラン：月額11,000円。故障時は当日訪問（午後3時までのご連絡分）。トナー代込み。\n\n現在、御社には月平均約4,000円分のトナーをご購入いただいております。プレミアムプランに変更された場合、トナー代を含めた毎月のご負担は、現在より軽くなる見込みです。\nなお、12月20日までにお申し出がない場合は、スタンダードプランにて自動的に更新させていただきます。',
    },
    questions: [
      [
        'プレミアムプランに変えると、トナー代を含めた毎月の負担はどうなりますか。',
        ['約1,000円減る', '約3,000円増える', '約4,000円減る', '変わらない'],
        0,
        'Câu 1: hiện nay trả 8.000 yên phí bảo trì + khoảng 4.000 yên mực = 12.000 yên; gói cao cấp 11.000 yên đã gồm mực, nên giảm khoảng 1.000 yên. Câu 2 (tăng 3.000) là kết quả nếu chỉ so phí bảo trì 8.000 với 11.000 mà quên tiền mực.',
      ],
      [
        '原田さんが何も連絡しなかった場合、どうなりますか。',
        ['1月31日で保守契約が終わる', 'プレミアムプランに切り替わる', 'スタンダードプランで契約が続く', '田村さんから確認の電話がある'],
        2,
        'Câu 3: câu sau なお: không báo trước 20/12 thì tự động gia hạn gói tiêu chuẩn. Câu 1 dễ chọn vì thư nói hợp đồng hết hạn 31/1, nhưng đó là mốc của hợp đồng hiện tại, sau đó tự gia hạn. Thư khuyên gói cao cấp nhưng không tự chuyển.',
      ],
    ],
    points: [
      ['保守', 'ほしゅ', 'bảo trì'],
      ['～をもって', 'をもって', 'vào (mốc thời gian, trang trọng)'],
      ['自動的に', 'じどうてきに', 'một cách tự động'],
    ],
  }),
  item('mock2', 'sogo-dokkai', 4, {
    material: {
      kind: 'text',
      title: '副業制度の導入について',
      body: '社員各位\n\n来年4月より、社員の副業を認めることとします。社外での経験を通じて、社員一人ひとりの能力を高めることが目的です。\n\n1．対象：入社2年目以降の正社員。ただし、試用期間中の者および休職中の者は除く。\n2．手続：副業を始める1か月前までに、所定の申請書を所属長経由で人事部に提出し、承認を受けること。\n3．認めない副業：当社と競合する事業、当社の取引先での業務、勤務時間中に行う業務。\n4．時間：副業の時間は週10時間以内とする。\n5．報告：副業を続ける者は、半年に一度、副業の内容と時間を人事部に報告すること。\n\n人事部',
    },
    questions: [
      [
        '次のうち、副業が認められる可能性があるのはどれですか。',
        ['入社1年目の正社員が、週末に料理教室の講師をする', '入社3年目の正社員が、当社の取引先で週5時間経理を手伝う', '入社5年目の正社員が、週8時間ウェブデザインの仕事をする', '入社4年目で休職中の正社員が、週6時間翻訳をする'],
        2,
        'Câu 3 thoả cả ba điều kiện: từ năm thứ hai trở đi, không thuộc việc bị cấm, dưới 10 giờ một tuần. Câu 2 dễ chọn vì đúng thâm niên và số giờ, nhưng làm cho đối tác của công ty bị cấm ở mục 3. Câu 1 chưa tới năm thứ hai; câu 4 bị loại vì đang nghỉ việc tạm thời (ngoại lệ sau ただし).',
      ],
      [
        '副業を始めたい社員が、まずしなければならないことは何ですか。',
        ['人事部に直接申請書を出す', '始める1か月前までに、所属長を通して申請書を出す', '半年後に副業の内容を報告する', '副業先との契約書を人事部に見せる'],
        1,
        'Câu 2: mục 2 yêu cầu nộp đơn trước một tháng, qua trưởng bộ phận (所属長経由) rồi tới phòng nhân sự. Câu 1 dễ nhầm vì đích đến đúng là phòng nhân sự, nhưng không được bỏ qua cấp trên. Báo cáo nửa năm là việc sau khi đã làm.',
      ],
    ],
    points: [
      ['副業', 'ふくぎょう', 'nghề phụ, việc làm thêm'],
      ['試用期間', 'しようきかん', 'thời gian thử việc'],
      ['休職', 'きゅうしょく', 'tạm nghỉ việc (giữ chỗ làm)'],
      ['～経由で', 'けいゆで', 'thông qua …'],
    ],
  }),
];

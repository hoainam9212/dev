import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/**
 * Full test 3 — reading part (語彙・文法 10 + 表現読解 10 + 総合読解 10). Mixed themes of the 16 weeks.
 * About a third of the questions are J1+ (marked "J1+" below): keigo and grammar nuance, a refusal or warning
 * said indirectly, two conditions to combine, business days and totals to compute, a long business-news text,
 * a table to combine with an email. All dates are in 2027 and their weekdays were checked.
 */
export const MOCK3: BjtItem[] = [
  // ── 語彙・文法 ──────────────────────────────────────────────
  item('mock3', 'goi', 1, {
    questions: [
      [
        '新工場の稼働に＿＿＿、当社の生産能力は現在の1.5倍に拡大する見通しだ。',
        ['伴い', '先立ち', '限らず', 'かかわらず'],
        0,
        'Lựa chọn 1: ～に伴い = cùng với, kéo theo; nhà máy mới chạy thì năng lực sản xuất tăng theo. Lựa chọn 2 (～に先立ち = trước khi) dễ nhầm vì cũng đi với sự kiện sắp tới, nhưng năng lực tăng nhờ chính nhà máy mới nên không thể tăng "trước khi" nhà máy chạy. 限らず, かかわらず (không chỉ, bất kể) không hợp nghĩa.',
      ],
    ],
    points: [
      ['稼働', 'かどう', 'vận hành (máy móc, nhà máy)'],
      ['～に伴い', 'にともない', 'cùng với, kéo theo'],
    ],
  }),
  item('mock3', 'goi', 2, {
    questions: [
      [
        '弊社創立50周年の記念式典を下記のとおり開催いたします。ご多忙の折、誠に恐縮ではございますが、ご臨席＿＿＿ますよう、お願い申し上げます。',
        ['承り', '申し上げ', '賜り', '差し上げ'],
        2,
        'Lựa chọn 3: ご臨席を賜りますよう = kính mong quý vị hạ cố tới dự; 賜る là "nhận từ người trên" ở mức rất trang trọng, hợp với thư mời lễ kỷ niệm. Lựa chọn 1 (承る) cũng là khiêm nhường ngữ nhưng nghĩa là "tôi xin nghe, xin nhận lời", không dùng cho hành động tới dự của khách. 申し上げる, 差し上げる là hành động của phía mình.',
      ],
    ],
    points: [
      ['ご臨席', 'ごりんせき', 'sự có mặt (tôn kính ngữ, dịp trang trọng)'],
      ['賜る', 'たまわる', 'được ban, được nhận (rất trang trọng)'],
      ['ご多忙の折', 'ごたぼうのおり', 'trong lúc bận rộn'],
    ],
  }),
  item('mock3', 'goi', 3, {
    questions: [
      [
        '他社との業務提携の話は、まだ正式に決まったわけではないので、社外には＿＿＿しないようにしてください。',
        ['口出し', '口外', '口答え', '口止め'],
        1,
        'Lựa chọn 2: 口外する = nói ra ngoài (chuyện cần giữ kín), hợp với 社外には và việc chưa chính thức. Lựa chọn 4 (口止めする = bắt người khác giữ kín) dễ nhầm vì cùng chủ đề bí mật, nhưng "đừng bắt người ngoài giữ kín" thì ngược ý. 口出し là xen vào, 口答え là cãi lại.',
      ],
    ],
    points: [
      ['口外する', 'こうがいする', 'nói ra ngoài, tiết lộ'],
      ['業務提携', 'ぎょうむていけい', 'hợp tác kinh doanh'],
    ],
  }),
  item('mock3', 'goi', 4, {
    questions: [
      [
        '主力商品の販売不振に、円高による為替差損が＿＿＿、今期の営業利益は前期を大きく下回った。',
        ['重ね', '積もり', '加え', '重なり'],
        3,
        'Lựa chọn 4: 為替差損が重なる = khoản lỗ tỷ giá chồng thêm lên (tự động từ, chủ ngữ đi với が). Lựa chọn 3 (加え) dễ chọn vì nghĩa "thêm vào" gần đúng, nhưng 加える là tha động từ, cần ～を加え; với が phải là 加わり. 重ねる cũng là tha động từ; 積もる dùng cho tuyết, bụi, chuyện dồn lại lâu ngày.',
      ],
    ],
    points: [
      ['販売不振', 'はんばいふしん', 'bán hàng ế ẩm'],
      ['為替差損', 'かわせさそん', 'lỗ do chênh lệch tỷ giá'],
      ['下回る', 'したまわる', 'thấp hơn (mức nào đó)'],
    ],
  }),
  item('mock3', 'goi', 5, {
    questions: [
      [
        '今回の誤発送は、弊社の確認不足によるものであり、弁解の＿＿＿もございません。',
        ['余白', '余力', '余裕', '余地'],
        3,
        'Lựa chọn 4: 弁解の余地もない = không còn chỗ nào để biện minh; cụm cố định khi nhận lỗi hoàn toàn. Lựa chọn 3 (余裕) dễ nhầm vì cũng là "khoảng dư", nhưng 余裕 nói về thời gian, tiền, tinh thần còn dư, không đi với 弁解. 余白 là lề giấy, 余力 là sức còn lại.',
      ],
    ],
    points: [
      ['弁解の余地もない', 'べんかいのよちもない', 'không có gì để biện minh'],
      ['誤発送', 'ごはっそう', 'gửi nhầm hàng'],
    ],
  }),
  // J1+
  item('mock3', 'goi', 6, {
    questions: [
      [
        '当社の採用面接では、学歴や職歴＿＿＿、本人の意欲や人柄を重視して評価している。',
        ['にひきかえ', 'もさることながら', 'はおろか', 'をよそに'],
        1,
        'Lựa chọn 2: AもさることながらB = A đã đành là quan trọng, nhưng B còn hơn thế; đúng ý "học vấn, kinh nghiệm cũng xét, nhưng coi trọng ý chí và tính cách". Lựa chọn 4 (をよそに = mặc kệ, phớt lờ) dễ chọn vì có vẻ "không xét học vấn", nhưng をよそに dùng khi phớt lờ lo lắng hay phản đối của người khác, không dùng cho tiêu chí đánh giá. にひきかえ so sánh hai đối tượng trái ngược; はおろか cần vế phủ định.',
      ],
    ],
    points: [
      ['～もさることながら', 'もさることながら', '… đã đành, nhưng … còn hơn'],
      ['人柄', 'ひとがら', 'tính cách, con người'],
    ],
  }),
  item('mock3', 'goi', 7, {
    questions: [
      [
        '新しい人事評価制度は、導入から半年が経ち、ようやく現場に＿＿＿きた。',
        ['固定して', '密着して', '定着して', '執着して'],
        2,
        'Lựa chọn 3: 制度が現場に定着する = chế độ bén rễ, thành nếp ở nơi làm việc. Lựa chọn 2 (密着する = bám sát, dính chặt) dễ nhầm vì cũng có nghĩa "gắn với", nhưng dùng cho vật dính sát hoặc phóng sự bám theo ai, không cho chế độ. 固定する là cố định, 執着する là bám víu, cố chấp.',
      ],
    ],
    points: [
      ['定着する', 'ていちゃくする', 'bén rễ, thành nếp'],
      ['人事評価', 'じんじひょうか', 'đánh giá nhân sự'],
    ],
  }),
  item('mock3', 'goi', 8, {
    questions: [
      [
        '台風の影響により、関東方面への配送に大幅な遅れが＿＿＿おります。',
        ['生じて', '起こして', '招いて', '及ぼして'],
        0,
        'Lựa chọn 1: 遅れが生じる = phát sinh chậm trễ (tự động từ, đi với が). Lựa chọn 3 (招く = dẫn tới) dễ chọn vì 遅れを招く là cách nói có thật, nhưng là tha động từ, cần ～を; ở đây chủ ngữ là 遅れが. 起こす, 及ぼす cũng là tha động từ.',
      ],
    ],
    points: [
      ['生じる', 'しょうじる', 'phát sinh'],
      ['大幅な', 'おおはばな', 'lớn, đáng kể'],
    ],
  }),
  item('mock3', 'goi', 9, {
    questions: [
      [
        '大口の取引先からの要望とあれば、多少無理を＿＿＿、納期に間に合わせなければならない。',
        ['したばかりに', 'したところで', 'するまでもなく', 'してでも'],
        3,
        'Lựa chọn 4: ～てでも = dù phải … đi nữa (vẫn làm); hợp với ～なければならない ở cuối câu. Lựa chọn 2 (～たところで = dù có … thì cũng vô ích) dễ nhầm vì cũng là "dù …", nhưng nó kéo theo kết luận bi quan, trái với "phải kịp hạn". ばかりに (chỉ vì … mà hỏng) và までもなく (không cần đến) không hợp.',
      ],
    ],
    points: [
      ['～てでも', 'てでも', 'dù phải … cũng'],
      ['大口', 'おおぐち', 'khách lớn, đơn lớn'],
      ['～とあれば', 'とあれば', 'nếu đã là …'],
    ],
  }),
  // J1+
  item('mock3', 'goi', 10, {
    questions: [
      [
        '今回の不祥事は、一社員の問題として片付けられる＿＿＿、会社全体の管理体制が問われている。',
        ['ものではなく', 'どころではなく', 'にすぎず', 'までもなく'],
        0,
        'Lựa chọn 1: ～ものではない = không phải là thứ có thể …; "không thể gói gọn là chuyện của một nhân viên, mà cả hệ thống quản lý bị chất vấn". Lựa chọn 2 (どころではない = không phải lúc để …) dễ nhầm vì cũng phủ định, nhưng nghĩa "đang bận việc khác nên không thể" không hợp. にすぎず (chỉ là) ngược ý; までもなく là "không cần đến".',
      ],
    ],
    points: [
      ['不祥事', 'ふしょうじ', 'vụ bê bối'],
      ['片付ける', 'かたづける', 'giải quyết cho xong, gói gọn'],
      ['管理体制', 'かんりたいせい', 'hệ thống quản lý'],
    ],
  }),

  // ── 表現読解 ──────────────────────────────────────────────
  item('mock3', 'hyogen', 1, {
    material: {
      kind: 'text',
      title: '社員食堂の改装工事について',
      body: '社員各位\n\n本社社員食堂の改装工事を、2027年2月8日（月）から3月5日（金）まで行います。工事期間中の昼食は、次のとおりとします。\n・2月8日（月）〜2月19日（金）：食堂は全面休業します。1階ロビーで弁当を販売します（11:30〜13:00）。\n・2月22日（月）〜3月5日（金）：食堂の半分を使って営業します。メニューは日替わり定食のみです。\n3月8日（月）からは、通常どおり営業します。\n\n総務部',
    },
    questions: [
      [
        '2027年3月1日（月）に、社員食堂で食べられるものはどれですか。',
        ['ロビーで売っている弁当', '日替わり定食', '通常どおりのメニュー', '何も食べられない'],
        1,
        'Lựa chọn 2: ngày 1/3 nằm trong giai đoạn hai (22/2–5/3), nhà ăn mở một nửa và chỉ có suất ăn thay đổi theo ngày. Lựa chọn 1 là cách ăn trưa của giai đoạn một (8/2–19/2) và bán ở sảnh, không phải trong nhà ăn. Thực đơn bình thường chỉ có từ 8/3.',
      ],
    ],
    points: [
      ['改装', 'かいそう', 'sửa sang, cải tạo'],
      ['日替わり定食', 'ひがわりていしょく', 'suất cơm đổi món theo ngày'],
    ],
  }),
  // J1+
  item('mock3', 'hyogen', 2, {
    material: {
      kind: 'text',
      body: '株式会社サクラ化成 購買部 吉岡様\n\nいつもお世話になっております。東邦樹脂 営業部の松尾でございます。\n先日ご相談いただきました、来期の樹脂材料の単価を5%お下げする件につきまして、社内で検討いたしました。\n長年のお取引を考えますと、何とかご期待にお応えしたいところではございますが、原料価格が高止まりしている現状では、正直なところ、単価の見直しは難しいと申し上げざるを得ません。\nその代わりと申しますか、年間のご発注量をお約束いただける場合には、1回あたりの最低ロットを現在の半分にすることは可能でございます。御社の在庫のご負担を少しでも軽くできればと存じます。\nご検討のほど、よろしくお願い申し上げます。\n\n東邦樹脂 営業部 松尾',
    },
    questions: [
      [
        '松尾さんがこのメールで伝えていることは何ですか。',
        ['単価を5%下げることに応じる', '年間の発注量を約束すれば、単価を下げられる', '原料価格が下がるまで、取引を休止したい', '単価は下げられないが、最低ロットは減らせる'],
        3,
        'Lựa chọn 4: 単価の見直しは難しいと申し上げざるを得ません là lời từ chối giảm giá nói vòng; bù lại, nếu cam kết lượng đặt cả năm thì lô tối thiểu mỗi lần giảm còn một nửa. Lựa chọn 2 dễ chọn vì có đúng điều kiện "cam kết lượng cả năm", nhưng thứ đổi lại là lô nhỏ hơn, không phải đơn giá thấp hơn. Câu mở đầu ご期待にお応えしたい chỉ để làm mềm lời từ chối.',
      ],
    ],
    points: [
      ['高止まり', 'たかどまり', 'giá đứng ở mức cao'],
      ['～ざるを得ない', 'ざるをえない', 'không thể không …'],
      ['最低ロット', 'さいていろっと', 'lô đặt hàng tối thiểu'],
    ],
  }),
  item('mock3', 'hyogen', 3, {
    material: {
      kind: 'text',
      title: '【訂正】品質管理研修の時間について',
      body: '製造部 各位\n\n本日午前にお送りした「品質管理研修のご案内」に誤りがありました。\n研修の開始時刻を「13時30分」と記載しましたが、正しくは「13時」です。終了時刻（17時）と会場（第2工場 2階 研修室）に変更はありません。\nまた、案内では「筆記用具をご持参ください」としておりましたが、当日は研修用のタブレットを貸し出しますので、筆記用具は不要です。\nご迷惑をおかけし、申し訳ありません。\n\n品質保証部 金子',
    },
    questions: [
      [
        '研修について、正しいものはどれですか。',
        ['13時開始で、筆記用具は不要','13時30分から17時まで行われる', '会場が第2工場の研修室に変更された', '研修用のタブレットを各自で用意する'],
        0,
        'Lựa chọn 1: thư đính chính hai điểm: giờ bắt đầu là 13 giờ (không phải 13 giờ 30) và không cần mang bút giấy vì được mượn máy tính bảng. Lựa chọn 2 là giờ ghi sai trong thông báo cũ. Lựa chọn 3 sai vì hội trường không đổi (変更はありません); máy tính bảng do công ty cho mượn chứ không tự chuẩn bị.',
      ],
    ],
    points: [
      ['訂正', 'ていせい', 'đính chính'],
      ['持参する', 'じさんする', 'mang theo'],
      ['貸し出す', 'かしだす', 'cho mượn'],
    ],
  }),
  // J1+
  item('mock3', 'hyogen', 4, {
    material: {
      kind: 'text',
      title: '経費精算の手続きについて（再周知）',
      body: '社員各位\n\n経費の精算は、支出した月の翌月5営業日までに、経費精算システムから申請してください。\n1件あたりの金額が3万円を超える場合は、申請する前に所属部長の承認を得る必要があります。承認のないまま申請されたものは、経理部では受け付けられません。\n領収書の原本は、申請後1週間以内に経理部へ提出してください。\n\n経理部',
    },
    questions: [
      [
        '1月に、取引先との会食代2万円と、出張の交通費3万5千円を立て替えました。正しい手続きはどれですか。',
        ['2件とも、部長の承認を得てから申請する', '2件とも、そのまま申請してよい', '交通費だけ、先に部長の承認を得る','合計額で判断し、経理部に相談する'],
        2,
        'Lựa chọn 3: quy định tính theo từng khoản (1件あたり): chỉ tiền đi lại 35.000 yên vượt 30.000 yên nên cần trưởng bộ phận duyệt trước; tiền ăn 20.000 yên cứ nộp bình thường. Lựa chọn 1 là kết quả nếu cộng hai khoản thành 55.000 yên rồi áp mốc 30.000. Lựa chọn 2 bỏ sót mốc 30.000 yên.',
      ],
    ],
    points: [
      ['立て替える', 'たてかえる', 'trả trước hộ (rồi thanh toán lại)'],
      ['再周知', 'さいしゅうち', 'nhắc lại cho mọi người biết'],
      ['営業日', 'えいぎょうび', 'ngày làm việc'],
    ],
  }),
  // J1+
  item('mock3', 'hyogen', 5, {
    material: {
      kind: 'text',
      body: '株式会社ハヤシ物流 お客様サービス課 御中\n\n先日の配送遅れの件では、迅速にご連絡とご説明をいただき、ありがとうございました。今回の事情は理解いたしましたので、この件はこれで結構です。\nただ、この半年で同様の遅れが3度目となりますと、弊社としても、お客様への説明に苦慮しているのが実情です。今後も改善が見られないようでしたら、来年度の契約につきましては、改めて考えさせていただくことになるかと存じます。\n\n株式会社タカミ商事 物流管理課 野村',
    },
    questions: [
      [
        '野村さんの気持ちに最も近いものはどれですか。',
        ['今回の遅れによる損害を賠償してほしい', '説明に満足したので、今後も安心して任せたい', '今回は収めるが、続けば契約を考え直す', 'すぐに別の配送会社に切り替えるつもりだ'],
        2,
        'Lựa chọn 3: この件はこれで結構です = chuyện lần này coi như xong; nhưng 改めて考えさせていただくことになるかと存じます là lời cảnh báo nói vòng: nếu không cải thiện thì hợp đồng năm sau sẽ bị xem lại. Lựa chọn 2 dễ chọn vì đoạn đầu cảm ơn và nói đã hiểu, nhưng bỏ qua phần sau ただ. Lựa chọn 4 đi quá xa: chưa có quyết định đổi công ty.',
      ],
    ],
    points: [
      ['苦慮する', 'くりょする', 'khổ tâm, đau đầu tìm cách'],
      ['実情', 'じつじょう', 'tình hình thực tế'],
      ['改めて', 'あらためて', 'một lần nữa, lại'],
    ],
  }),
  // J1+
  item('mock3', 'hyogen', 6, {
    material: {
      kind: 'text',
      title: '名刺の発注方法の変更について',
      body: '社員各位\n\n2027年2月1日（月）から、名刺の発注は総務部への依頼ではなく、各自が社内ポータルの「名刺発注」画面から行うことになりました。\n通常の名刺は、発注した日の翌営業日から数えて3営業日目に、各部署へ届きます。\n裏面に英語表記を入れる場合は、確認作業のため、さらに2営業日かかります。\n※土日・祝日は営業日に含みません。\n\n総務部',
    },
    questions: [
      [
        '2027年2月3日（水）に、裏面に英語表記を入れた名刺を発注しました。名刺が届くのはいつですか。',
        ['2月5日（金）', '2月8日（月）', '2月9日（火）', '2月10日（水）'],
        3,
        'Lựa chọn 4: đếm từ ngày làm việc kế tiếp: 4/2 (thứ Năm) là ngày 1, 5/2 (thứ Sáu) ngày 2, bỏ thứ Bảy, Chủ nhật, 8/2 (thứ Hai) ngày 3 → danh thiếp thường tới 8/2; thêm 2 ngày làm việc cho bản tiếng Anh → 10/2 (thứ Tư). Lựa chọn 2 là ngày của danh thiếp thường, quên phần cộng thêm. Lựa chọn 3 là kết quả nếu tính cả ngày đặt 3/2 là ngày 1.',
      ],
    ],
    points: [
      ['発注', 'はっちゅう', 'đặt hàng'],
      ['表記', 'ひょうき', 'cách ghi, phần ghi'],
      ['翌営業日', 'よくえいぎょうび', 'ngày làm việc kế tiếp'],
    ],
  }),
  item('mock3', 'hyogen', 7, {
    material: {
      kind: 'text',
      body: '株式会社ミヤビ食品 商品開発部 酒井様\n\nいつもお世話になっております。北星パッケージの原口です。\n新しい容器のサンプルが仕上がりましたので、ご説明に伺いたく存じます。下記のうち、ご都合のよい日時をお知らせいただけますでしょうか。\n①2月15日（月）10:00〜11:00\n②2月16日（火）15:00〜16:00\n③2月18日（木）10:00〜11:00\n\n――――――――\n原口様\n\nご連絡ありがとうございます。サンプルの完成を楽しみにしておりました。\nあいにく火曜日は終日社外に出ておりまして、また、15日の午前中は部内の定例会議が入っております。そのほかでしたら、いつでも結構です。\n\nミヤビ食品 酒井',
    },
    questions: [
      [
        '原口さんは、いつ酒井さんを訪問することになりますか。',
        ['2月18日（木）10時', '2月15日（月）10時', '2月16日（火）15時', 'まだ決まらない'],
        0,
        'Lựa chọn 1: Sakai bận cả ngày thứ Ba (16/2) và sáng 15/2 có họp định kỳ, nên trong ba phương án chỉ còn ③ ngày 18/2 lúc 10 giờ. Lựa chọn 3 dễ chọn vì là buổi chiều, tránh được cuộc họp buổi sáng, nhưng 16/2 là thứ Ba, ngày Sakai ra ngoài cả ngày.',
      ],
    ],
    points: [
      ['仕上がる', 'しあがる', 'hoàn thành'],
      ['終日', 'しゅうじつ', 'cả ngày'],
      ['定例会議', 'ていれいかいぎ', 'cuộc họp định kỳ'],
    ],
  }),
  item('mock3', 'hyogen', 8, {
    material: {
      kind: 'text',
      title: '社用車安全運転講習のご案内',
      body: '営業部・物流部 各位\n\n社用車を運転する社員を対象に、安全運転講習を行います。\n日時：2027年3月12日（金）14:00〜16:00　会場：本社5階 大会議室\n今年度に社用車を一度も運転していない方は、受講しなくてもかまいません。一方、昨年度以降に社用車で事故を起こした方は、運転の頻度にかかわらず必ず受講してください。\n当日都合のつかない方は、後日配信する録画を視聴し、3月31日までに感想を提出してください。\n\n総務部 安全管理課',
    },
    questions: [
      [
        '受講しなくてもよい人はだれですか。',
        ['今年度、月に1回ほど社用車を運転した人', '今年度は運転しておらず、事故を起こしたこともない人', '今年度は運転していないが、昨年度に社用車で事故を起こした人', '3月12日に出張の予定がある人'],
        1,
        'Lựa chọn 2: không lái xe công ty lần nào trong năm nay thì được miễn, và người này cũng không thuộc diện bắt buộc vì chưa từng gây tai nạn. Lựa chọn 3 dễ chọn vì cũng không lái năm nay, nhưng người gây tai nạn từ năm ngoái phải học bất kể tần suất lái (運転の頻度にかかわらず). Người đi công tác hôm đó vẫn phải xem bản ghi và nộp cảm nghĩ.',
      ],
    ],
    points: [
      ['社用車', 'しゃようしゃ', 'xe công ty'],
      ['～にかかわらず', 'にかかわらず', 'bất kể …'],
      ['視聴する', 'しちょうする', 'xem (video, chương trình)'],
    ],
  }),
  // J1+
  item('mock3', 'hyogen', 9, {
    material: {
      kind: 'text',
      body: '株式会社アオイ電設 資材課 西川様\n\nお問い合わせいただいたLED照明「LX-30」のお見積もりについてご連絡いたします。\n単価は1台4,000円（税抜）です。100台以上をまとめてご注文いただいた場合は、単価を3,600円とさせていただきます。\n送料は1回の配送につき2,000円ですが、1回の配送が50台以上の場合は無料です。\nご不明な点がございましたら、お気軽にお問い合わせください。\n\n光栄電機 営業部 柴田',
    },
    questions: [
      [
        '120台をまとめて注文し、60台ずつ2回に分けて届けてもらう場合、合計金額（税抜）はいくらですか。',
        ['432,000円', '434,000円', '436,000円', '480,000円'],
        0,
        'Lựa chọn 1: đặt gộp 120 chiếc (từ 100 trở lên) nên đơn giá 3.600 yên: 120 × 3.600 = 432.000 yên; mỗi lần giao 60 chiếc (từ 50 trở lên) nên miễn phí vận chuyển. Lựa chọn 3 (436.000) là kết quả nếu cộng phí 2.000 yên cho cả hai lần giao. Lựa chọn 4 dùng đơn giá thường 4.000 yên.',
      ],
    ],
    points: [
      ['税抜', 'ぜいぬき', 'chưa gồm thuế'],
      ['お見積もり', 'おみつもり', 'báo giá'],
    ],
  }),
  item('mock3', 'hyogen', 10, {
    material: {
      kind: 'text',
      body: '株式会社ナガセ工業 製造部 部長 大森様\n\n本日はご多忙の中、貴重なお時間を割いていただき、誠にありがとうございました。\n御社の品質管理への徹底したお取り組みを伺い、大変勉強になりました。\nお話の中で拝見した検査工程の写真が、特に印象に残っております。もしお差し支えなければ、次の機会には、ぜひ実際の現場を拝見させていただければ幸いに存じます。\n今後とも、どうぞよろしくお願い申し上げます。\n\n株式会社リンクス 品質保証部 岡本',
    },
    questions: [
      [
        '岡本さんが希望していることは何ですか。',
        ['検査工程の写真を送ってほしい', '大森さんに自社へ来てほしい', 'ナガセ工業の現場を見学したい', '大森さんに品質管理について講演してほしい'],
        2,
        'Lựa chọn 3: 実際の現場を拝見させていただければ幸いに存じます = mong được xem tận nơi hiện trường, tức là tham quan khâu kiểm tra ở công ty Nagase. Lựa chọn 1 dễ chọn vì thư nhắc tới ảnh khâu kiểm tra, nhưng ảnh chỉ là lý do khiến Okamoto muốn xem thực tế. Thư không mời Omori tới hay nhờ thuyết trình.',
      ],
    ],
    points: [
      ['時間を割く', 'じかんをさく', 'dành thời gian'],
      ['お差し支えなければ', 'おさしつかえなければ', 'nếu không phiền'],
      ['拝見する', 'はいけんする', 'xem (khiêm nhường ngữ)'],
    ],
  }),

  // ── 総合読解 ──────────────────────────────────────────────
  item('mock3', 'sogo-dokkai', 1, {
    material: {
      kind: 'text',
      title: '中堅アパレル、受注生産に軸足　在庫を3割圧縮',
      body: '衣料品の中堅メーカー、ミナセ衣料（本社・名古屋市）が、生産方式の見直しで成果を上げている。同社は2025年度から、店舗での予約や通販サイトの注文を受けてから生産する「受注生産」の比率を高めてきた。2026年度上半期の受注生産の比率は売上の35%と、2年前の10%から大きく伸びた。\n\nきっかけは、売れ残りの増加だった。同社は長年、シーズン前に需要を予測してまとめて生産してきたが、気温の変化や流行の移り変わりが読みにくくなり、2024年度には売れ残った商品の値引き販売が売上の2割近くを占めた。「作れば売れる時代は終わった。値引きで売り切るやり方では、ブランドの価値まで下がってしまう」と、森下社長は振り返る。\n\n受注生産に切り替えた商品は、注文から届くまでに約3週間かかる。当初は「待たされる」という声もあったが、色や丈を選べるようにしたことで、むしろ満足度は上がったという。在庫は2年前と比べて3割減り、値引き販売の比率も1割を切った。その結果、売上高はほぼ横ばいながら、営業利益は前年同期比で4割増えた。\n\nもっとも、課題もある。受注生産は、注文が特定の時期に集中すると縫製工場の作業が追いつかない。同社は繁忙期の生産を外部の工場にも委託しているが、その分コストがかさむ。業界に詳しいアナリストの平田氏は「受注生産は在庫の削減には効果があるが、それだけで成長できるわけではない。待ってでも買いたいと思わせる商品の力があってこそ成り立つ仕組みだ」と指摘している。',
    },
    questions: [
      // J1+
      [
        '記事の内容と合っているものはどれですか。',
        ['受注生産の比率は、2年前の3.5倍になった', '受注生産にしてから、売上高が4割増えた', '2024年度には、値引き販売が売上の半分近くを占めた', '受注生産を始めた当初から、客の満足度は高かった'],
        0,
        'Lựa chọn 1: tỉ lệ sản xuất theo đơn tăng từ 10% lên 35% của doanh thu, tức gấp 3,5 lần. Lựa chọn 2 dễ chọn vì có con số 4 割, nhưng tăng 40% là lợi nhuận kinh doanh; doanh thu gần như đi ngang (ほぼ横ばい). Bán giảm giá năm 2024 chiếm gần 20% (2割), không phải gần một nửa; lúc đầu khách còn phàn nàn phải chờ.',
      ],
      // J1+
      [
        '平田氏の意見に最も近いものはどれですか。',
        ['受注生産にすれば、どの会社でも成長できる', '受注生産はコストがかかるので、やめたほうがよい', '繁忙期は外部の工場に頼るべきだ', '受注生産は、商品に魅力があってこそ成り立つ'],
        3,
        'Lựa chọn 4: ～があってこそ成り立つ = chỉ đứng được khi có …; Hirata nói sản xuất theo đơn giảm được tồn kho nhưng tự nó không đem lại tăng trưởng, cần sản phẩm đủ hấp dẫn để khách chịu chờ. Lựa chọn 1 là điều ông phản bác (それだけで成長できるわけではない). Chi phí thuê ngoài là nhận xét của bài báo, Hirata không khuyên bỏ cách làm này.',
      ],
    ],
    points: [
      ['受注生産', 'じゅちゅうせいさん', 'sản xuất theo đơn đặt hàng'],
      ['横ばい', 'よこばい', 'đi ngang (không tăng không giảm)'],
      ['軸足を移す', 'じくあしをうつす', 'chuyển trọng tâm'],
      ['かさむ', 'かさむ', '(chi phí) phình ra'],
    ],
  }),
  item('mock3', 'sogo-dokkai', 2, {
    material: {
      kind: 'text',
      title: '2027年度 外部研修の申し込みについて',
      body: '■ 外部研修コース一覧（人事部）\nコース｜形式｜日程｜受講料\nA 交渉力強化｜対面（大阪）｜5月13日（木）・14日（金）9:30〜17:00｜48,000円\nB 交渉力強化｜オンライン｜5月20日〜6月10日の毎週木曜 19:00〜21:00（全4回）｜36,000円\nC 財務の基礎｜オンライン｜5月11日〜6月1日の毎週火曜 19:00〜21:00（全4回）｜30,000円\nD 財務の基礎｜対面（東京）｜6月3日（木）・4日（金）9:30〜17:00｜42,000円\n\n■ 営業二課 課長からのメール\n加藤さん\n来年度の研修の件ですが、加藤さんには交渉力の研修を受けてもらいたいと考えています。5月から6月にかけては新規のお客様との商談が続くので、平日の日中に研修で席を外すのは避けてください。それから、受講料として会社が出せるのは1人4万円までです。申し込みは各自で、4月16日（金）までに人事部へお願いします。\n営業二課 課長 中島',
    },
    questions: [
      // J1+
      [
        '加藤さんが申し込むべきコースはどれですか。',
        ['A 交渉力強化（対面）', 'B 交渉力強化（オンライン）', 'C 財務の基礎（オンライン）', 'D 財務の基礎（対面）'],
        1,
        'Lựa chọn 2: phải là khoá kỹ năng đàm phán, không học vào ban ngày ngày thường, học phí tối đa 40.000 yên. Khoá B học tối thứ Năm, 36.000 yên, thoả cả ba. Lựa chọn 1 đúng chủ đề nhưng học ban ngày thứ Năm, thứ Sáu và 48.000 yên vượt mức công ty trả. Lựa chọn 3 thoả giờ học và học phí nhưng là khoá tài chính.',
      ],
      [
        '加藤さんが4月16日までにしなければならないことは何ですか。',
        ['中島課長に申し込んでもらう', '受講料を研修会社に振り込む', '人事部に受講料の上限を確認する', '自分で人事部に申し込む'],
        3,
        'Lựa chọn 4: 申し込みは各自で、4月16日までに人事部へ = mỗi người tự đăng ký với phòng nhân sự trước 16/4. Lựa chọn 1 dễ chọn vì trưởng phòng Nakajima là người chọn chủ đề, nhưng ông nói rõ mỗi người tự đăng ký. Mức trần 40.000 yên trưởng phòng đã cho biết, không cần hỏi lại.',
      ],
    ],
    points: [
      ['受講料', 'じゅこうりょう', 'học phí khoá học'],
      ['席を外す', 'せきをはずす', 'rời chỗ làm việc'],
      ['商談', 'しょうだん', 'đàm phán thương mại'],
    ],
  }),
  item('mock3', 'sogo-dokkai', 3, {
    material: {
      kind: 'text',
      title: '「1on1」は誰のための時間か',
      body: '部下と上司が定期的に一対一で話す「1on1ミーティング」を導入する企業が増えている。私の勤める会社でも3年前に始まり、月に1回、30分の面談が義務づけられた。\n\n始めた当初、私はこの時間を、部下の仕事の進み具合を確かめる場として使っていた。案件ごとに状況を聞き、遅れていれば対策を指示する。効率はよかったが、部下の口数は回を重ねるごとに減っていった。あるとき部下の一人から「この時間は、普段の報告と何が違うのですか」と聞かれ、言葉に詰まった。\n\nそれ以来、進み具合の確認は日々の報告に任せ、1on1では、私からは質問を一つだけ用意して、あとは部下の話を聞くことにしている。最初は沈黙が続いて気まずかったが、そのうち、仕事の悩みだけでなく、今後どんな仕事をしてみたいかといった話も出るようになった。\n\n制度を入れれば対話が生まれるわけではない。1on1を上司の管理の道具にしてしまえば、部下にとっては面談がもう一つ増えただけになる。',
    },
    questions: [
      [
        '筆者が1on1のやり方を変えたきっかけは何ですか。',
        ['会社の方針で、面談の回数が月2回に増えたこと', '普段の報告との違いを部下に問われたこと', '部下の担当する案件に、遅れが出始めたこと', '部下の話が長くなりすぎたこと'],
        1,
        'Lựa chọn 2: một cấp dưới hỏi "buổi này khác gì báo cáo thường ngày", tác giả cứng họng, và "từ đó" (それ以来) đổi cách làm. Lựa chọn 3 dễ nhầm vì tác giả có nhắc chuyện công việc chậm, nhưng đó là nội dung các buổi theo cách cũ, không phải lý do thay đổi. Cấp dưới ngày càng ít nói chứ không nói dài.',
      ],
      [
        '筆者が最も言いたいことは何ですか。',
        ['1on1は、仕事の進み具合を確かめるのに効率がよい', '1on1の回数を増やせば、対話は自然に深まる', '1on1は、部下が話せる場にしなければ意味がない', '1on1は部下の負担になるので、やめたほうがよい'],
        2,
        'Lựa chọn 3: đoạn cuối nói đưa chế độ vào thì chưa chắc có đối thoại; nếu biến 1on1 thành công cụ quản lý của cấp trên thì với cấp dưới nó chỉ là thêm một buổi họp. Lựa chọn 1 là cách làm cũ mà tác giả đã từ bỏ dù "hiệu quả". Lựa chọn 4 đi quá xa: tác giả vẫn làm 1on1, chỉ đổi cách làm.',
      ],
    ],
    points: [
      ['口数', 'くちかず', 'số lời nói (nói nhiều, ít)'],
      ['言葉に詰まる', 'ことばにつまる', 'cứng họng, không biết nói gì'],
      ['義務づける', 'ぎむづける', 'bắt buộc'],
    ],
  }),
  item('mock3', 'sogo-dokkai', 4, {
    material: {
      kind: 'text',
      title: '物流センター移転に伴う出荷スケジュールのお知らせ',
      body: 'お取引先各位\n\n平素より格別のご高配を賜り、厚く御礼申し上げます。\nこのたび弊社は、物流センターを川口市から春日部市へ移転することとなりました。移転作業のため、2027年3月の出荷業務を次のとおりとさせていただきます。\n\n・3月10日（水）正午までのご注文：通常どおり、翌営業日に出荷いたします。\n・3月10日（水）正午から3月14日（日）までのご注文：3月15日（月）より、新センターから順次出荷いたします。\n・3月15日（月）以降のご注文：通常どおり、翌営業日に出荷いたします。\n\n移転期間中も、ご注文は通常どおり受け付けております。お問い合わせ先の電話番号にも変更はございません。\nご不便をおかけいたしますが、何とぞご理解のほどお願い申し上げます。\n\n株式会社ツバサ流通',
    },
    questions: [
      [
        '3月11日（木）の午前中に注文した商品は、いつ出荷されますか。',
        ['3月11日（木）', '3月12日（金）', '3月15日（月）から順次', '3月16日（火）から順次'],
        2,
        'Lựa chọn 3: đơn đặt từ trưa 10/3 tới 14/3 sẽ được xuất từ trung tâm mới, lần lượt từ 15/3. Lựa chọn 2 là kết quả nếu áp quy tắc thường "ngày làm việc kế tiếp"; "buổi sáng" chỉ có ý nghĩa với ngày 10/3, không phải 11/3.',
      ],
      [
        'この案内の内容と合っているものはどれですか。',
        ['3月10日朝の注文は、翌営業日に出荷される', '移転期間中は、新しい注文を一切受け付けない', '移転に伴い、問い合わせ先の電話番号が変わる', '新しい物流センターは、川口市に置かれる'],
        0,
        'Lựa chọn 1: đơn trước 12 giờ trưa 10/3 vẫn xuất như thường vào ngày làm việc kế tiếp (11/3). Lựa chọn 2 dễ chọn vì đang chuyển kho, nhưng thông báo nói vẫn nhận đơn bình thường. Số điện thoại không đổi; Kawaguchi là nơi cũ, trung tâm mới ở Kasukabe.',
      ],
    ],
    points: [
      ['移転', 'いてん', 'di dời'],
      ['順次', 'じゅんじ', 'lần lượt'],
      ['ご高配', 'ごこうはい', 'sự quan tâm (của quý vị, rất trang trọng)'],
    ],
  }),
  // J1+
  item('mock3', 'sogo-dokkai', 5, {
    material: {
      kind: 'text',
      title: 'プレゼンは「結論から」で十分か',
      body: '「プレゼンは結論から話せ」とよく言われる。聞き手の時間を無駄にしないという意味では、確かに正しい。しかし、社内で新しい事業を提案するような場面では、結論を先に聞いた瞬間に、聞き手が「それは無理だ」と心を閉じてしまうことがある。これまでのやり方を変える提案では、特にそうだ。そうした場合は、まず聞き手と共有できる問題、たとえば「このままでは5年後に主力商品の売上が半分になる」といった事実から入り、相手が「確かに何とかしなければ」と思ったところで提案を示すほうが、受け入れられやすい。大切なのは型を守ることではなく、聞き手がどんな状態で話を聞くかを考えることである。',
    },
    questions: [
      [
        '筆者の考えに最も近いものはどれですか。',
        ['プレゼンは、どんな場面でも結論から話すべきだ', '場面によっては、結論を後に回したほうがよい', '新しい事業の提案では、結論を言わないほうがよい', 'プレゼンでは、事実よりも話し手の熱意が大切だ'],
        1,
        'Lựa chọn 2: tác giả công nhận "nói kết luận trước" có lý, nhưng với đề xuất thay đổi cách làm cũ, người nghe có thể đóng lòng ngay; khi đó nên đi từ vấn đề chung rồi mới đưa đề xuất. Điều quan trọng là trạng thái của người nghe, không phải khuôn mẫu. Lựa chọn 3 đi quá xa: vẫn đưa ra đề xuất, chỉ là sau. Lựa chọn 1 là khuôn mẫu tác giả đặt câu hỏi.',
      ],
      [
        '筆者が「このままでは5年後に主力商品の売上が半分になる」という例を挙げたのは、何を示すためですか。',
        ['プレゼンを結論から始めるべき理由', '主力商品の売上が落ちている原因', '聞き手と共有できる問題の例', '数字を使うと聞き手が心を閉じること'],
        2,
        'Lựa chọn 3: ví dụ đứng sau たとえば, minh hoạ cho "vấn đề có thể chia sẻ với người nghe" cần nói trước, để người nghe thấy "đúng là phải làm gì đó" rồi mới nghe đề xuất. Lựa chọn 1 ngược ý: ví dụ dùng cho cách không bắt đầu bằng kết luận. Bài không phân tích nguyên nhân doanh số giảm; người nghe khép lòng vì nghe kết luận trước, không phải vì con số.',
      ],
    ],
    points: [
      ['心を閉じる', 'こころをとじる', 'khép lòng, không chịu nghe'],
      ['型', 'かた', 'khuôn mẫu'],
    ],
  }),
];

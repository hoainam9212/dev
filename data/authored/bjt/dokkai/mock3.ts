import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/**
 * Full test 3 — reading part (語彙・文法 10 + 表現読解 10 + 総合読解 10 items, one question each). Mixed themes.
 * 表現読解 and 総合読解 follow the 2026-11-14 calibration rules (spec). About a third of the questions are J1+
 * (some goi items are marked "J1+" below; in the rewritten sections: keigo subject, a refusal said indirectly,
 * a ※ note to combine with a figure). Dates are in 2027 unless written otherwise; weekdays were checked.
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
  // ── 表現読解: one sentence or a short A/B exchange with a ＿＿＿ blank (spec, calibration rules 3 and 11) ──
  item('mock3', 'hyogen', 1, {
    questions: [
      [
        '（受付から内線で担当者に）営業部の野口さん、ただいま光洋商事の森様が＿＿＿。',
        ['参りました', 'お見えになりました', 'お見えになられました', '伺いました'],
        1,
        'Người đến là khách (光洋商事の森様), nên dùng tôn kính お見えになりました (lựa chọn 2), kể cả khi nói qua điện thoại nội bộ. Lựa chọn 3 dễ nhầm nhất: お見えになる đã là tôn kính, thêm ～られる thành kính ngữ kép. Lựa chọn 1 và 4 là khiêm nhường ngữ: đúng ý "đã đến" nhưng sai chủ thể, hạ thấp khách.',
      ],
    ],
    points: [
      ['お見えになる', 'おみえになる', 'đến (tôn kính)'],
      ['内線', 'ないせん', 'điện thoại nội bộ'],
    ],
  }),
  item('mock3', 'hyogen', 2, {
    questions: [
      [
        '（セミナーの開会のあいさつ）本日はご多忙の中、多数ご参加＿＿＿、誠にありがとうございます。',
        ['させていただき', 'なさられ', 'してさしあげ', 'いただき'],
        3,
        'Người tham dự là khách mời, người cảm ơn là ban tổ chức: ご参加いただき (lựa chọn 4). Lựa chọn 1 dễ nhầm nhất vì nghe rất lịch sự, nhưng ご参加させていただく là "tôi được tham gia", sai chủ thể. Lựa chọn 2 là kính ngữ kép (なさる＋られる). Lựa chọn 3 nghĩa là mình "tham gia giúp" khách, sai ý.',
      ],
    ],
    points: [
      ['ご多忙の中', 'ごたぼうのなか', 'giữa lúc bận rộn'],
      ['開会', 'かいかい', 'khai mạc'],
    ],
  }),
  item('mock3', 'hyogen', 3, {
    questions: [
      [
        '（取引先の人に荷物を持とうかと言われて）A：重そうですね。お持ちしましょうか。B：＿＿＿、すぐそこまでですので大丈夫です。',
        ['お手数ですが', 'お言葉に甘えて', 'お気遣いなく', 'おかげさまで'],
        2,
        'B khéo khước từ lời đề nghị giúp, nên nói お気遣いなく "xin đừng bận tâm" (lựa chọn 3). Lựa chọn 2 dễ nhầm nhất vì cũng là câu đáp lời đề nghị, nhưng お言葉に甘えて là nhận lời, trái với 大丈夫です phía sau. Lựa chọn 1 dùng khi nhờ người khác làm việc gì. Lựa chọn 4 là lời cảm ơn khi được hỏi thăm.',
      ],
    ],
    points: [
      ['お気遣い', 'おきづかい', 'sự quan tâm, để ý'],
      ['お持ちする', 'おもちする', 'cầm giúp (khiêm nhường)'],
    ],
  }),
  item('mock3', 'hyogen', 4, {
    questions: [
      [
        '（取引先へのあいさつで）＿＿＿より、くれぐれもよろしくと申しつかっております。',
        ['社長の中野', '中野社長', '中野社長様', '社長の中野様'],
        0,
        'Nói với người ngoài về giám đốc công ty mình thì không dùng chức danh như kính xưng: 社長の中野 (lựa chọn 1). Lựa chọn 2 dễ nhầm nhất vì là cách gọi trong nội bộ công ty, nhưng 中野社長 đặt chức danh sau tên là cách gọi kính trọng. Lựa chọn 3 và 4 thêm 様 cho người nhà, sai.',
      ],
    ],
    points: [
      ['申しつかる', 'もうしつかる', 'được dặn (khiêm nhường)'],
      ['くれぐれも', 'くれぐれも', 'thật lòng, hết sức'],
    ],
  }),
  item('mock3', 'hyogen', 5, {
    questions: [
      [
        '（メールの返信で）資料をお送りいただき、ありがとうございました。内容を確認のうえ、改めて＿＿＿。',
        ['ご連絡いたしました', 'ご連絡いたします', 'ご連絡なさいます', 'ご連絡いただきます'],
        1,
        'Việc liên lạc lại là của mình và xảy ra sau khi kiểm tra (確認のうえ), nên dùng khiêm nhường thì hiện tại: ご連絡いたします (lựa chọn 2). Lựa chọn 1 dễ nhầm nhất vì cùng khuôn khiêm nhường nhưng ở thì quá khứ, trái với 改めて. Lựa chọn 3 là tôn kính cho việc của mình. Lựa chọn 4 nghĩa là khách liên lạc cho mình.',
      ],
    ],
    points: [
      ['確認のうえ', 'かくにんのうえ', 'sau khi kiểm tra'],
      ['改めて', 'あらためて', 'lại, lần sau'],
    ],
  }),
  item('mock3', 'hyogen', 6, {
    questions: [
      [
        '（日程調整の電話で）A：来週の火曜日はいかがでしょうか。B：火曜日は＿＿＿予定が入っておりまして、水曜日でしたら終日空いております。',
        ['さすがに', 'せっかく', 'あいにく', 'ようやく'],
        2,
        'Báo một điều không như ý người kia mong (thứ Ba đã có lịch) thì dùng あいにく (lựa chọn 3). Lựa chọn 2 せっかく dùng với ý tốt hay cơ hội hiếm, không đi với "đã có lịch". Lựa chọn 1 さすがに mang ý "dù sao cũng quá mức", lựa chọn 4 ようやく là "mãi mới", đều sai ý.',
      ],
    ],
    points: [
      ['あいにく', 'あいにく', 'không may là'],
      ['終日', 'しゅうじつ', 'cả ngày'],
    ],
  }),
  item('mock3', 'hyogen', 7, {
    questions: [
      [
        '（先に帰る部長に）部長、本日はありがとうございました。＿＿＿。',
        ['ご苦労さまでした', 'お疲れになりました', 'ご苦労さまでございます', 'お疲れさまでした'],
        3,
        'Chào cấp trên ra về: お疲れさまでした (lựa chọn 4). Lựa chọn 1 và 3 dễ nhầm vì cùng là lời chào cuối ngày, nhưng ご苦労さま là câu người trên nói với người dưới; nói với trưởng bộ phận là sai vai. Lựa chọn 2 là câu nhận xét "ngài đã mệt rồi", không phải lời chào.',
      ],
    ],
    points: [
      ['お疲れさまでした', 'おつかれさまでした', 'anh/chị vất vả rồi (chào khi về)'],
      ['ご苦労さま', 'ごくろうさま', 'vất vả rồi (người trên nói với người dưới)'],
    ],
  }),
  item('mock3', 'hyogen', 8, {
    questions: [
      [
        '（取引先との打ち合わせの前に）議事録を作るため、会話を録音させていただいても＿＿＿。',
        ['よろしいでしょうか', 'お願いできますか', 'よろしくお願いいたします', 'おかまいなく'],
        0,
        'Xin phép khách được ghi âm: ～させていただいてもよろしいでしょうか (lựa chọn 1). Lựa chọn 3 dễ nhầm vì có よろしく, nhưng ～てもよろしくお願いいたします không thành câu xin phép. Lựa chọn 2 là lời nhờ người khác làm, không nối với ～ても. Lựa chọn 4 là "xin đừng bận tâm", sai ý.',
      ],
    ],
    points: [
      ['録音', 'ろくおん', 'ghi âm'],
      ['させていただいてもよろしいでしょうか', 'させていただいてもよろしいでしょうか', 'cho phép tôi … được không ạ'],
    ],
  }),
  item('mock3', 'hyogen', 9, {
    questions: [
      [
        '（顧客向け説明会の案内状）当日は、この案内状を受付まで＿＿＿。',
        ['お持ちしてください', 'ご持参いたしてください', 'お持ちください', 'お持ちになられてください'],
        2,
        'Nhờ khách mang thư mời tới: お持ちください (lựa chọn 3). Lựa chọn 1 dễ nhầm nhất: お持ちする là khiêm nhường (tôi mang giúp), không dùng để nhờ khách. Lựa chọn 2 cũng dùng khiêm nhường いたす cho việc của khách. Lựa chọn 4 là kính ngữ kép (お～になる＋られる).',
      ],
    ],
    points: [
      ['案内状', 'あんないじょう', 'thư mời, thư thông báo'],
      ['お持ちください', 'おもちください', 'xin mang theo'],
    ],
  }),
  item('mock3', 'hyogen', 10, {
    questions: [
      [
        '（取引先に返事の期限を聞かれて）A：今週中にお返事いただけますか。B：＿＿＿、来週の月曜日までお待ちいただけないでしょうか。',
        ['せっかくですが', '勝手を申しますが', 'おかげさまで', 'お手数をおかけしましたが'],
        1,
        'B xin lùi hạn, tức là đưa ra yêu cầu theo ý mình, nên đệm bằng 勝手を申しますが (lựa chọn 2). Lựa chọn 1 dễ nhầm nhất vì B cũng đang không làm theo ý A, nhưng せっかくですが dùng khi khước từ ý tốt hay lời mời. Lựa chọn 4 ở thì quá khứ, xin lỗi về việc đã làm phiền, không phải lời mở đầu cho yêu cầu mới.',
      ],
    ],
    points: [
      ['勝手を申す', 'かってをもうす', 'xin phép đưa ra ý riêng (khiêm nhường)'],
      ['お返事', 'おへんじ', 'câu trả lời'],
    ],
  }),
  // ── 総合読解: business documents, one question each (spec, calibration rules 2, 3, 12) ──
  item('mock3', 'sogo-dokkai', 1, {
    material: {
      kind: 'text',
      title: '製品価格改定のお願い',
      body: '拝啓　陽春の候、貴社いよいよご隆盛のこととお慶び申し上げます。平素より格別のご愛顧を賜り、厚く御礼申し上げます。\nさて、弊社では原材料費および物流費の上昇が続いており、これまで社内の努力で吸収してまいりましたが、現行価格の維持が困難な状況となりました。\nつきましては、誠に心苦しいお願いではございますが、2027年6月1日（火）出荷分より、全製品の価格を平均5%改定させていただきたく、何卒ご理解賜りますようお願い申し上げます。\n敬具',
    },
    questions: [
      [
        'この手紙の主な目的は何ですか。',
        ['製品の値上げを受け入れてもらう', '物流の方法を変えることを知らせる', '6月から出荷を一時止めると知らせる', '原材料の値下げを交渉したい'],
        0,
        'Ý chính sau さて và つきましては: từ hàng xuất ngày 1/6 sẽ "điều chỉnh" giá bình quân 5%, mong được thông cảm → xin khách chấp nhận tăng giá (lựa chọn 1). 改定 ở đây là tăng giá, nói tránh. Lựa chọn 3 dễ nhầm vì có mốc 6月1日, nhưng đó là thời điểm áp giá mới, không phải dừng xuất hàng. Chi phí vận chuyển là lý do, không phải thay đổi cách vận chuyển.',
      ],
    ],
    points: [
      ['改定', 'かいてい', 'điều chỉnh (giá, quy định)'],
      ['吸収する', 'きゅうしゅうする', 'gánh, hấp thụ (chi phí)'],
      ['心苦しい', 'こころぐるしい', 'áy náy'],
    ],
  }),
  item('mock3', 'sogo-dokkai', 2, {
    material: {
      kind: 'text',
      title: 'お見積りご依頼の件',
      body: '株式会社ハヤセ製作所　資材部　山口様\n\nいつもお世話になっております。東和プレスの坂本です。\nこのたびは、新型ブラケットのお見積りをご依頼いただき、誠にありがとうございます。\n社内で検討いたしましたが、ご希望の8月納品となりますと、現在の受注状況では十分な生産時間を確保することが難しく、品質面でご迷惑をおかけするおそれがございます。大変心苦しいのですが、今回はお力になれそうにございません。\nまたの機会がございましたら、ぜひよろしくお願いいたします。',
    },
    questions: [
      [
        'このメールで坂本さんが伝えていることは何ですか。',
        ['8月より前に納品できる', '品質の確認に時間がほしい', '今回は見積りを出せない', '他社を紹介することができる'],
        2,
        'Thư từ chối khéo: giao tháng 8 thì không đủ thời gian sản xuất, 今回はお力になれそうにございません = lần này không giúp được → không báo giá (lựa chọn 3). Lựa chọn 2 dễ nhầm vì có nhắc chất lượng, nhưng đó là lý do từ chối (sợ ảnh hưởng chất lượng), không phải lời xin thêm thời gian. Thư không giới thiệu công ty khác.',
      ],
    ],
    points: [
      ['お力になる', 'おちからになる', 'giúp được (cho quý công ty)'],
      ['確保する', 'かくほする', 'bảo đảm có được'],
      ['またの機会', 'またのきかい', 'dịp khác'],
    ],
  }),
  item('mock3', 'sogo-dokkai', 3, {
    material: {
      kind: 'text',
      title: 'フォークリフト接触事故の再発防止について',
      body: '製造部各位\n\n安全衛生委員会です。先月、第1倉庫でフォークリフトと作業者の接触事故（軽傷）が発生しました。再発防止のため、次のとおり対応します。\n・倉庫内の歩行者通路を黄色の線で示し、通路の外を歩くことを禁止する。\n・フォークリフトを運転する社員は全員、6月末までに社内の安全講習を受け直す。講習は毎週木曜日14時から行い、申し込みは各職場の班長を通して行う。\n不明な点は安全衛生委員会（内線215）までお問い合わせください。',
    },
    questions: [
      [
        'フォークリフトを運転する社員がしなければならないことは何ですか。',
        ['黄色い線の通路を引き直す', '班長を通して安全講習に申し込む', '事故の報告書を委員会に出す', '毎週木曜日の講習に必ず出席する'],
        1,
        'Người lái xe nâng phải học lại khoá an toàn trước cuối tháng 6, đăng ký qua tổ trưởng → lựa chọn 2. Lựa chọn 4 dễ nhầm vì có "thứ Năm hằng tuần", nhưng đó là lịch mở lớp; chỉ cần học một lần. Vạch vàng là biện pháp của công ty cho lối đi bộ, không phải việc của người lái.',
      ],
    ],
    points: [
      ['再発防止', 'さいはつぼうし', 'phòng ngừa tái diễn'],
      ['安全衛生委員会', 'あんぜんえいせいいいんかい', 'ban an toàn vệ sinh lao động'],
      ['班長', 'はんちょう', 'tổ trưởng'],
    ],
  }),
  item('mock3', 'sogo-dokkai', 4, {
    material: {
      kind: 'text',
      title: '年末年始の短期アルバイト募集について',
      body: '各店店長各位\n\n人事課です。年末年始の繁忙期に向けて、短期アルバイトを下記のとおり募集します。各店の必要人数をもとに、本部でまとめて求人広告を出します。\n\n記\n募集期間：2026年12月20日〜2027年1月5日\n必要人数：本店5名、駅前店3名、郊外店4名\n※郊外店の4名のうち1名は、本店の社員が応援に入るため、求人の対象外とします。\n時給：1,200円（22時以降は1,500円）\n以上',
    },
    questions: [
      [
        '本部が求人広告で募集する人数は、合わせて何名ですか。',
        ['12名', '13名', '10名', '11名'],
        3,
        'Tổng số người cần là 5 + 3 + 4 = 12, nhưng ghi chú ※: một trong bốn người của cửa hàng ngoại ô sẽ do nhân viên cửa hàng chính sang hỗ trợ, không tuyển → 12 − 1 = 11 (lựa chọn 4). Lựa chọn 1 dễ nhầm nhất vì quên ghi chú ※. Lựa chọn 2 lại cộng thêm người hỗ trợ.',
      ],
    ],
    points: [
      ['繁忙期', 'はんぼうき', 'mùa cao điểm'],
      ['求人広告', 'きゅうじんこうこく', 'quảng cáo tuyển dụng'],
      ['対象外', 'たいしょうがい', 'ngoài diện áp dụng'],
    ],
  }),
  item('mock3', 'sogo-dokkai', 5, {
    material: {
      kind: 'text',
      title: '「OJTトレーナー研修」延期のお知らせ',
      body: '受講予定者各位\n\n人事部です。2月18日（木）に予定しておりました「OJTトレーナー研修」は、講師の体調不良により延期いたします。新しい日程は3月4日（木）で、時間と会場に変更はありません。\nすでに提出いただいた事前アンケートは、そのまま使用しますので、再提出は不要です。新しい日程での参加が難しい方は、2月24日（水）までに人事部の吉村までお知らせください。',
    },
    questions: [
      [
        'このメールの主な目的は何ですか。',
        ['研修の日程が変わったことを知らせる', '事前アンケートの提出を求める', '研修の会場が変わったことを知らせる', '研修の講師が交代することを知らせる'],
        0,
        'Khoá học ngày 18/2 bị hoãn sang 4/3 vì giảng viên không khoẻ → báo đổi lịch (lựa chọn 1). Lựa chọn 4 dễ nhầm vì có nhắc giảng viên, nhưng giảng viên ốm nên hoãn, không nói thay người. Giờ và địa điểm giữ nguyên; phiếu khảo sát đã nộp thì dùng lại, không cần nộp lại.',
      ],
    ],
    points: [
      ['延期', 'えんき', 'hoãn'],
      ['再提出', 'さいていしゅつ', 'nộp lại'],
      ['体調不良', 'たいちょうふりょう', 'không khoẻ'],
    ],
  }),
  item('mock3', 'sogo-dokkai', 6, {
    material: {
      kind: 'text',
      title: '安否確認システムの切り替えについて',
      body: '全社員各位\n\n総務部です。3月の全社防災訓練に合わせて、安否確認システムを新しくします。\n新システムでは、災害時に会社から届くメールに、各自が安否を回答します。訓練当日の3月10日（水）に一斉送信のテストを行いますので、事前に新システムへ各自の連絡用メールアドレスを登録してください。登録の締め切りは3月3日（水）です。\nなお、旧システムは3月31日（水）で利用を終了します。',
    },
    questions: [
      [
        '新システムへのメールアドレスの登録期限はいつですか。',
        ['3月10日（水）', '3月31日（水）', '3月9日（火）', '3月3日（水）'],
        3,
        'Hạn đăng ký ghi rõ: 登録の締め切りは3月3日（水） → lựa chọn 4. Lựa chọn 3 dễ nhầm vì suy từ "đăng ký trước buổi diễn tập 10/3" ra hôm trước đó, nhưng văn bản có hạn chót riêng, sớm hơn. 10/3 là ngày diễn tập và gửi thử, 31/3 là ngày ngừng hệ thống cũ.',
      ],
    ],
    points: [
      ['安否確認', 'あんぴかくにん', 'xác nhận an toàn'],
      ['一斉送信', 'いっせいそうしん', 'gửi đồng loạt'],
      ['防災訓練', 'ぼうさいくんれん', 'diễn tập phòng chống thiên tai'],
    ],
  }),
  item('mock3', 'sogo-dokkai', 7, {
    material: {
      kind: 'text',
      title: '展示会準備ミーティング　議事メモ',
      body: '日時：2027年4月7日（水）16:00〜16:30\n出席：営業企画課 長谷川、技術課 中島、総務課 太田\n1．ブースで使う実演機は、技術課が4月28日（水）までに調整を終える。\n2．来場者に配るパンフレットは、前回の残り600部では足りないため、営業企画課が400部を追加で発注する。\n3．スタッフの宿泊先は総務課が手配する。人数は営業企画課が4月14日（水）までに確定し、総務課に伝える。',
    },
    questions: [
      [
        '営業企画課の長谷川さんがしなければならないことはどれですか。',
        ['実演機の調整を終わらせる', 'スタッフの宿泊先を予約する', 'パンフレットを追加で注文する', '残りのパンフレットを数え直す'],
        2,
        'Mục 2: phòng kế hoạch kinh doanh đặt thêm 400 cuốn tờ giới thiệu → lựa chọn 3. Lựa chọn 2 dễ nhầm vì mục 3 có nhắc phòng kế hoạch, nhưng việc của họ chỉ là chốt số người; đặt chỗ ở là phòng tổng vụ. Máy trình diễn là việc của phòng kỹ thuật; 600 cuốn còn lại đã biết là không đủ, không cần đếm lại.',
      ],
    ],
    points: [
      ['実演', 'じつえん', 'trình diễn trực tiếp'],
      ['手配する', 'てはいする', 'sắp xếp, đặt (chỗ)'],
      ['確定する', 'かくていする', 'chốt'],
    ],
  }),
  item('mock3', 'sogo-dokkai', 8, {
    material: {
      kind: 'text',
      title: '株主優待制度導入のお知らせ',
      body: '株主各位\n\n平素は格別のご支援を賜り、厚く御礼申し上げます。\nこのたび、株主優待制度を下記のとおり導入いたします。毎年3月31日現在の株主名簿に記載された株主様を対象に、当社オンラインストアでご利用いただけるお買い物券を、6月下旬に発送いたします。\n\n記\n100株以上500株未満：1,000円分\n500株以上1,000株未満：3,000円分\n1,000株以上：5,000円分\n※3年以上継続して保有されている株主様には、上記に1,000円分を加算いたします。\n以上',
    },
    questions: [
      [
        '600株を4年間続けて保有している株主が受け取るお買い物券は、いくら分ですか。',
        ['3,000円分', '4,000円分', '5,000円分', '6,000円分'],
        1,
        '600 cổ phiếu thuộc mức 500–dưới 1.000: 3.000 yên; giữ liên tục từ 3 năm trở lên được cộng 1.000 yên → 4.000 yên (lựa chọn 2). Lựa chọn 1 dễ nhầm vì quên ghi chú ※. Lựa chọn 3 là mức của người có từ 1.000 cổ phiếu.',
      ],
    ],
    points: [
      ['株主優待', 'かぶぬしゆうたい', 'ưu đãi cho cổ đông'],
      ['株主名簿', 'かぶぬしめいぼ', 'sổ cổ đông'],
      ['加算する', 'かさんする', 'cộng thêm'],
    ],
  }),
  item('mock3', 'sogo-dokkai', 9, {
    material: {
      kind: 'text',
      title: 'ご注文書の記入漏れについて',
      body: '株式会社グリーン園芸　ご担当者様\n\nいつもご注文いただき、ありがとうございます。みどり種苗の受注センターです。\n本日FAXでいただいたご注文書（2枚）のうち、2枚目の「納品先」欄が空欄となっておりました。このままでは出荷の手配ができませんので、お手数ですが、納品先をご記入のうえ、2枚目のみ再度FAXでお送りいただけますでしょうか。\n本日15時までに届いた場合は、明日の出荷に間に合います。',
    },
    questions: [
      [
        'グリーン園芸の担当者がしなければならないことは何ですか。',
        ['2枚目に納品先を書いて送り直す', '注文書を2枚とも書き直して送る', '15時までに受注センターに電話する', '明日の出荷の時間を知らせる'],
        0,
        'Chỉ trang 2 thiếu ô "nơi giao hàng"; điền vào rồi FAX lại riêng trang 2 → lựa chọn 1. Lựa chọn 2 dễ nhầm vì cũng là gửi lại, nhưng 2枚目のみ = chỉ trang 2. Mốc 15 giờ là để kịp xuất hàng ngày mai, gửi bằng FAX chứ không phải gọi điện.',
      ],
    ],
    points: [
      ['記入漏れ', 'きにゅうもれ', 'điền thiếu'],
      ['空欄', 'くうらん', 'ô trống'],
      ['納品先', 'のうひんさき', 'nơi giao hàng'],
    ],
  }),
  item('mock3', 'sogo-dokkai', 10, {
    material: {
      kind: 'text',
      title: '入社手続き書類の送付について',
      body: '内定者の皆様\n\n株式会社ミライ電装　人事部の斎藤です。\n4月1日の入社に向けて、入社手続きの書類を本日郵送しました。同封の「入社承諾書」は2月26日（金）までに、「給与振込口座届」と「通勤経路届」は3月12日（金）までに、返信用封筒でご返送ください。\nまた、3月19日（金）に内定者研修を行います。詳細は後日メールでお知らせします。',
    },
    questions: [
      [
        '「通勤経路届」の提出期限はいつですか。',
        ['2月26日（金）', '3月19日（金）', '4月1日（木）', '3月12日（金）'],
        3,
        '「給与振込口座届」と「通勤経路届」は3月12日（金）まで → lựa chọn 4. Lựa chọn 1 dễ nhầm vì là hạn đầu tiên trong thư, nhưng chỉ dành cho giấy đồng ý vào công ty. 19/3 là ngày đào tạo, 1/4 là ngày vào công ty.',
      ],
    ],
    points: [
      ['内定者', 'ないていしゃ', 'người đã nhận thư mời làm việc'],
      ['承諾書', 'しょうだくしょ', 'giấy đồng ý'],
      ['通勤経路', 'つうきんけいろ', 'tuyến đường đi làm'],
    ],
  }),
];

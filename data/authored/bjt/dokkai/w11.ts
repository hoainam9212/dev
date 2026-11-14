import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/** Week 11 — HR, appraisal and training (reading). Level: J1. */
export const W11: BjtItem[] = [
  item('w11', 'goi', 1, {
    questions: [
      [
        '新しい人事評価制度では、成果だけでなく、目標の達成に至るまでの＿＿＿も評価の対象となる。',
        ['経過', '過程', '工程', '経緯'],
        1,
        'Câu 2: 過程 = quá trình (các bước dẫn tới kết quả); 成果 và 過程 là cặp đối lập quen thuộc trong đánh giá nhân sự. Câu 1 (経過) dễ nhầm, nhưng 経過 chỉ thời gian trôi qua hoặc diễn biến (病状の経過), không nói về cách làm việc. 工程 là công đoạn sản xuất, 経緯 là đầu đuôi sự việc.',
      ],
    ],
    points: [
      ['過程', 'かてい', 'quá trình'],
      ['評価の対象', 'ひょうかのたいしょう', 'đối tượng được đánh giá'],
    ],
  }),
  item('w11', 'goi', 2, {
    questions: [
      [
        '主力工場の閉鎖により、約二百名の社員が転勤を＿＿＿。',
        ['余儀なくさせた', '辞さなかった', '禁じ得なかった', '余儀なくされた'],
        3,
        'Câu 4: Nを余儀なくされる = buộc phải làm N (ngoài ý muốn); chủ ngữ là nhân viên nên dùng bị động. Câu 1 cùng cụm nhưng thể sai khiến (余儀なくさせる) thì chủ ngữ phải là nguyên nhân (việc đóng nhà máy), không phải nhân viên. 辞さない là "sẵn sàng làm", trái sắc thái miễn cưỡng; 禁じ得ない đi với cảm xúc (同情を禁じ得ない).',
      ],
    ],
    points: [
      ['余儀なくされる', 'よぎなくされる', 'buộc phải (ngoài ý muốn)'],
      ['主力工場', 'しゅりょくこうじょう', 'nhà máy chủ lực'],
    ],
  }),
  item('w11', 'goi', 3, {
    questions: [
      [
        '研修の内容が現場の業務と＿＿＿いないという声が多く、来期から見直すことになった。',
        ['かみ合って', 'かみ合わせて', '結びつけて', '合わせて'],
        0,
        'Câu 1: chủ ngữ là 研修の内容が, nên cần tự động từ かみ合う (ăn khớp). Câu 2 là tha động từ cùng cặp (かみ合わせる, làm cho khớp), cần tân ngữ を. 結びつける và 合わせる cũng là tha động từ.',
      ],
    ],
    points: [
      ['かみ合う', 'かみあう', 'ăn khớp, khớp với nhau'],
      ['来期', 'らいき', 'kỳ (kinh doanh) tới'],
    ],
  }),
  item('w11', 'goi', 4, {
    questions: [
      [
        '来週の貴社の管理職研修には、弊社人事部長の岡田が講師として＿＿＿。',
        ['いらっしゃいます', '伺います', 'お越しになります', '参られます'],
        1,
        'Câu 2: trưởng bộ phận nhân sự là người phía mình, đến công ty đối tác thì dùng khiêm nhường ngữ 伺う. Câu 1 và 3 là tôn kính ngữ, dùng cho người phía mình trước mặt khách là sai hướng. Câu 4 ghép 参る (khiêm nhường) với ～られる (tôn kính) nên sai.',
      ],
    ],
    points: [
      ['伺う', 'うかがう', 'đến thăm (khiêm nhường ngữ)'],
      ['管理職', 'かんりしょく', 'cấp quản lý'],
    ],
  }),
  item('w11', 'goi', 5, {
    questions: [
      [
        '彼は入社三年目ながら、新規事業の責任者に＿＿＿された。',
        ['選択', '採択', '抽選', '抜擢'],
        3,
        'Câu 4: 抜擢する = cất nhắc người trẻ hoặc cấp thấp lên vị trí quan trọng; ながら (dù chỉ mới năm thứ ba) báo hiệu sự vượt bậc. Câu 1 (選択) cũng là "chọn", nhưng dùng cho phương án, món hàng, không dùng khi giao chức cho người. 採択 là thông qua đề án, nghị quyết; 抽選 là bốc thăm.',
      ],
    ],
    points: [
      ['抜擢する', 'ばってきする', 'cất nhắc, đề bạt vượt cấp'],
      ['新規事業', 'しんきじぎょう', 'mảng kinh doanh mới'],
    ],
  }),
  item('w11', 'goi', 6, {
    questions: [
      [
        '人手不足を＿＿＿、定年後の再雇用制度を拡充する企業が増えている。',
        ['背景に', '口実に', '目的に', '基盤に'],
        0,
        'Câu 1: Nを背景に = với N làm bối cảnh, xuất phát từ tình hình N; đúng quan hệ nguyên nhân – xu hướng. Câu 2 (口実に, lấy cớ) đúng ngữ pháp nhưng mang ý viện cớ để làm điều không chính đáng, không hợp với việc mở rộng chế độ tốt cho người lao động. 目的に: thiếu người không thể là mục đích; 基盤に là nền tảng.',
      ],
    ],
    points: [
      ['再雇用', 'さいこよう', 'tái tuyển dụng (sau tuổi nghỉ hưu)'],
      ['拡充する', 'かくじゅうする', 'mở rộng và hoàn thiện'],
      ['人手不足', 'ひとでぶそく', 'thiếu nhân lực'],
    ],
  }),
  item('w11', 'hyogen', 1, {
    material: {
      kind: 'text',
      body: '（人事部から応募者へのメール）\n面接の日程は、こちらで決まり次第、改めて＿＿＿。',
    },
    questions: [
      [
        '空欄に入る最も適当なものはどれですか。',
        ['ご連絡ください', 'ご連絡なさいます', 'ご連絡いたします', 'ご連絡になります'],
        2,
        'Phía công ty (こちら) quyết ngày rồi tự liên lạc, nên dùng khiêm nhường ご～いたす: ご連絡いたします → lựa chọn 3. Lựa chọn 1 dễ nhầm vì cũng lịch sự, nhưng là nhờ người ứng tuyển liên lạc, trái với "công ty quyết xong sẽ báo". なさる và ご～になる là tôn kính ngữ, không dùng cho việc của chính mình.',
      ],
    ],
    points: [
      ['決まり次第', 'きまりしだい', 'ngay khi quyết định xong'],
      ['応募者', 'おうぼしゃ', 'người ứng tuyển'],
    ],
  }),
  item('w11', 'hyogen', 2, {
    material: {
      kind: 'text',
      body: '（評価面談のあと、部長に）\n先日の面談で部長が＿＿＿点は、来期の目標に反映いたしました。',
    },
    questions: [
      [
        '空欄に入る最も適当なものはどれですか。',
        ['申し上げた', 'ご指摘になった', 'おっしゃられた', 'ご指摘した'],
        1,
        'Người chỉ ra là trưởng bộ phận (cấp trên), nên dùng tôn kính ご～になる: ご指摘になった → lựa chọn 2. Lựa chọn 3 おっしゃられた dễ nhầm vì có おっしゃる, nhưng thêm られる thành kính ngữ kép. 申し上げる và ご～する là khiêm nhường ngữ, chỉ dùng cho hành động của mình.',
      ],
    ],
    points: [
      ['ご指摘', 'ごしてき', 'sự chỉ ra (của cấp trên, khách)'],
      ['反映する', 'はんえいする', 'phản ánh vào'],
      ['来期', 'らいき', 'kỳ tới'],
    ],
  }),
  item('w11', 'hyogen', 3, {
    material: {
      kind: 'text',
      body: 'A（先輩）：来週の勉強会、一緒に出ない？\nB：ありがとうございます。＿＿＿、来週は出張が入っておりまして。',
    },
    questions: [
      [
        '空欄に入る最も適当なものはどれですか。',
        ['おかげさまで', 'お言葉ですが', '念のためですが', 'せっかくですが'],
        3,
        'Từ chối lời mời tốt ý của đàn anh: せっかくですが (anh đã có lòng mời nhưng…) → lựa chọn 4. Lựa chọn 2 お言葉ですが dễ nhầm vì cũng đứng trước ý trái, nhưng dùng khi phản bác ý kiến của cấp trên, không dùng để từ chối lời mời. おかげさまで là cảm ơn khi mọi việc tốt đẹp; 念のため là "để chắc chắn".',
      ],
    ],
    points: [
      ['勉強会', 'べんきょうかい', 'buổi học nhóm'],
      ['せっかくですが', 'せっかくですが', 'anh/chị đã có lòng nhưng…'],
    ],
  }),
  item('w11', 'sogo-dokkai', 1, {
    material: {
      kind: 'text',
      title: '管理職候補者研修の受講者募集について',
      body: '各位\n\n人事部 人材開発課\n\n来年度の管理職候補者研修（全6回）の受講者を募集します。\n\n記\n対象：入社5年目以上の主任\n期間：2027年1月〜3月（毎月第2・第4金曜日）\n申込方法：所定の申込書に所属長の承認印を受けたうえで、人材開発課へ提出\n申込締切：2026年12月10日（木）\n以上\n\nなお、所属長の承認には通常1週間程度かかりますので、承認の依頼は12月3日（木）までに済ませてください。',
    },
    questions: [
      [
        '受講を希望する主任は、所属長への承認の依頼をいつまでに出せばよいですか。',
        ['12月10日まで', '12月3日まで', '1月8日まで', '12月17日まで'],
        1,
        'Câu sau なお: phê duyệt mất khoảng 1 tuần nên phải nhờ trưởng đơn vị trước 3/12 → lựa chọn 2. Lựa chọn 1 dễ nhầm vì 10/12 là hạn nộp đơn cho phòng đào tạo, không phải hạn xin phê duyệt. 8/1 là thứ Sáu tuần thứ 2 của tháng 1, ngày học buổi đầu.',
      ],
    ],
    points: [
      ['所属長', 'しょぞくちょう', 'trưởng đơn vị mình trực thuộc'],
      ['承認印', 'しょうにんいん', 'dấu phê duyệt'],
      ['受講者', 'じゅこうしゃ', 'học viên'],
    ],
  }),
  item('w11', 'sogo-dokkai', 2, {
    material: {
      kind: 'text',
      title: '上期評価面談の実施について',
      body: '営業部の皆さん\n\n上期の評価面談を、2026年12月7日（月）から12月18日（金）の間に、各課長との1対1で行います。面談日は各課長から個別に連絡します。\n面談の前に、自己評価シートに上期の成果と課題を記入し、面談日の3営業日前までに担当課長へメールで提出してください。\nなお、評価結果は1月中旬に人事部から通知します。\n\n営業部長 杉山',
    },
    questions: [
      [
        '営業部の社員が面談の前にしなければならないことは何ですか。',
        ['自己評価シートを書いて、課長に送る', '面談の日を決めて、課長に知らせる', '自己評価シートを人事部に提出する', '上期の成果を部長にメールで報告する'],
        0,
        'Trước buổi gặp, mỗi người ghi phiếu tự đánh giá rồi gửi email cho trưởng phòng phụ trách trước 3 ngày làm việc → lựa chọn 1. Lựa chọn 3 dễ nhầm vì có phiếu tự đánh giá, nhưng nơi nhận là trưởng phòng, còn phòng nhân sự chỉ báo kết quả. Ngày gặp do trưởng phòng báo (lựa chọn 2 sai chủ thể).',
      ],
    ],
    points: [
      ['上期', 'かみき', 'nửa đầu năm tài chính'],
      ['個別に', 'こべつに', 'riêng từng người'],
      ['自己評価', 'じこひょうか', 'tự đánh giá'],
    ],
  }),
  item('w11', 'sogo-dokkai', 3, {
    material: {
      kind: 'text',
      title: '選考結果のお知らせ',
      body: '三浦様\n\n拝啓　時下ますますご清祥のこととお喜び申し上げます。\nこのたびは、弊社の中途採用にご応募いただき、誠にありがとうございました。\n慎重に選考を重ねましたが、誠に残念ながら、今回はご期待に沿いかねる結果となりました。何卒ご了承くださいますようお願い申し上げます。\nお預かりした応募書類は、本状に同封してご返却いたします。\n末筆ながら、三浦様の今後のご活躍をお祈り申し上げます。\n敬具\n\n株式会社ハナミ物産 人事部',
    },
    questions: [
      [
        'この手紙の主な目的は何ですか。',
        ['二次選考の日程を知らせること', '追加の書類の提出を求めること', '内定と、書類の返却を伝えること', '不採用を伝え、書類を返すこと'],
        3,
        'ご期待に沿いかねる結果 = kết quả không như mong đợi, tức là không tuyển (từ chối khéo, không có chữ 不採用); kèm trả lại hồ sơ → lựa chọn 4. Lựa chọn 3 dễ nhầm vì đúng phần trả hồ sơ, nhưng 内定 (đỗ) thì ngược lại. Câu ご活躍をお祈り申し上げます là câu kết quen thuộc của thư báo trượt.',
      ],
    ],
    points: [
      ['中途採用', 'ちゅうとさいよう', 'tuyển người đã có kinh nghiệm'],
      ['ご期待に沿いかねる', 'ごきたいにそいかねる', 'không đáp ứng được kỳ vọng'],
      ['末筆ながら', 'まっぴつながら', 'cuối thư xin'],
    ],
  }),
  item('w11', 'sogo-dokkai', 4, {
    material: {
      kind: 'text',
      title: '資格取得支援制度の改定について',
      body: '社員各位\n\n人事部\n\n2027年4月1日より、資格取得支援制度を下記のとおり改定します。\n\n記\n1．対象資格：会社が指定する42の資格（一覧は社内ポータル参照）\n2．受験料の補助：受験料の半額（上限20,000円）\n　※合格した場合に限り支給。不合格の場合は対象外\n3．申請期限：合格通知を受けた日から1か月以内\n4．教材費：上限10,000円まで実費を支給（合否は問わない）\n以上',
    },
    questions: [
      [
        '受験料30,000円の指定資格に合格した場合、受験料について支給される額はいくらですか。',
        ['10,000円', '20,000円', '15,000円', '30,000円'],
        2,
        'Mục 2: hỗ trợ một nửa lệ phí thi, tối đa 20.000 yên: 30.000 ÷ 2 = 15.000 yên, chưa vượt mức trần → lựa chọn 3. Lựa chọn 2 dễ nhầm vì là mức trần, chỉ áp dụng khi lệ phí từ 40.000 yên trở lên. 10.000 yên là mức trần tiền giáo trình (mục 4), không phải lệ phí thi.',
      ],
    ],
    points: [
      ['改定', 'かいてい', 'sửa đổi (quy định, giá)'],
      ['上限', 'じょうげん', 'mức trần'],
      ['実費', 'じっぴ', 'chi phí thực tế'],
    ],
  }),
];

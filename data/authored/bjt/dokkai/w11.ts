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
      title: 'eラーニング「ハラスメント防止研修」受講のお願い',
      body: '社員各位\n\n今年度のハラスメント防止研修を、下記のとおりeラーニングで実施します。\n対象：全社員（契約社員・派遣社員を含む）\n受講期限：12月20日（金）\n所要時間：約40分。最後の確認テストで8割以上正解すると修了となります。\nただし、今年度すでに管理職向けの集合研修を受講した方は、受講の必要はありません。\nなお、期限までに修了していない方の氏名は、所属長に通知します。\n\n人事部 研修担当',
    },
    questions: [
      [
        '今年度、管理職向けの集合研修をすでに受けた課長はどうすればいいですか。',
        ['12月20日までにeラーニングを受講する', '確認テストだけを受ける', '受講しなくてよい', '所属長に受講したことを報告する'],
        2,
        'Câu 3: sau ただし, người đã học khoá tập trung dành cho quản lý trong năm nay thì không cần học. Câu 1 là quy định chung cho toàn công ty nên dễ chọn nếu bỏ qua ngoại lệ. Câu 4 lẫn với câu sau なお: chỉ tên người chưa hoàn thành mới được báo cho cấp trên.',
      ],
    ],
    points: [
      ['受講', 'じゅこう', 'tham gia khoá học'],
      ['修了', 'しゅうりょう', 'hoàn thành khoá học'],
      ['所属長', 'しょぞくちょう', 'trưởng bộ phận mình trực thuộc'],
    ],
  }),
  item('w11', 'hyogen', 2, {
    material: {
      kind: 'text',
      title: '期末評価面談の日程について',
      body: '営業二課 松本さん\n\nお疲れさまです。人事部の岡です。期末評価面談の日程についてご連絡します。\n松本さんの面談は、12月4日（水）14時から第3会議室で行う予定です。前日までに、社内システムから「自己評価シート」を提出してください。シートの提出がない場合は面談を行えませんので、ご注意ください。\nなお、当日は課長のご都合がつかなくなったため、面談は大川部長が担当されます。日程の変更をご希望の場合は、11月29日までに私までご連絡ください。',
    },
    questions: [
      [
        '松本さんの面談について、正しいものはどれですか。',
        ['面談は部長と行う予定だ', '課長が面談を担当する', '自己評価シートは面談の当日に持っていく', '日程は変更できない'],
        0,
        'Câu 1: câu sau なお cho biết trưởng phòng bận nên trưởng bộ phận Okawa sẽ phỏng vấn. Câu 2 là cách làm thông thường nhưng đã bị thay. Phiếu tự đánh giá phải nộp qua hệ thống trước một ngày, không mang theo; muốn đổi lịch vẫn được nếu báo trước 29/11.',
      ],
    ],
    points: [
      ['期末', 'きまつ', 'cuối kỳ'],
      ['都合がつく', 'つごうがつく', 'thu xếp được thời gian'],
    ],
  }),
  item('w11', 'hyogen', 3, {
    material: {
      kind: 'text',
      title: '社内公募のお知らせ（海外事業部）',
      body: '海外事業部では、東南アジア市場の開拓を担当する社員を社内公募します。\n募集人数：2名\n応募資格：入社4年目以上で、現在の部署に2年以上在籍していること\n応募方法：12月10日までに、志望理由書を人事部に直接提出してください。所属長の承認は必要ありません。また、応募の事実は、選考が終わるまで所属長には知らせません。\nなお、合格した場合の異動時期は、現在の部署の業務状況を考慮して決定します。',
    },
    questions: [
      [
        'この公募に応募する人について、文書の内容と合っているものはどれですか。',
        ['応募する前に上司の承認を得なければならない', '応募したことは、すぐに上司に伝えられる', '合格すれば、すぐに海外事業部へ異動する', '志望理由書は人事部に直接出す'],
        3,
        'Câu 4: 志望理由書を人事部に直接提出 = nộp thẳng cho phòng nhân sự. Câu 3 dễ chọn vì đúng là trúng tuyển sẽ chuyển, nhưng sau なお thời điểm chuyển còn tuỳ tình hình công việc ở phòng hiện tại, không phải ngay. Không cần cấp trên duyệt, và cấp trên chưa được báo cho tới khi xét tuyển xong.',
      ],
    ],
    points: [
      ['社内公募', 'しゃないこうぼ', 'tuyển nội bộ'],
      ['在籍する', 'ざいせきする', 'đang thuộc biên chế (bộ phận)'],
      ['志望理由書', 'しぼうりゆうしょ', 'thư nêu lý do ứng tuyển'],
    ],
  }),
  item('w11', 'sogo-dokkai', 1, {
    material: {
      kind: 'text',
      title: '来年度からの人事評価制度の変更について',
      body: '社員各位\n\n来年度（4月1日）から、人事評価制度を次のとおり変更します。\n\n1．評価の回数\n年1回（3月）から、上期（9月）と下期（3月）の年2回に変更します。\n\n2．評価の項目と割合\n評価は引き続き「業績」と「行動」の2項目で行います。これまで全社員一律に業績70%・行動30%としていましたが、来年度から一般社員は業績50%・行動50%とします。管理職は現行どおり業績70%・行動30%とします。\n\n3．多面評価\n管理職に限り、部下と同僚による評価を参考資料として加えます。ただし、来年度はこの結果を昇給・賞与などの処遇には反映しません。\n\n4．結果の伝え方\n評価結果は、評価者が本人と面談して直接伝えます。\n\n人事部',
    },
    questions: [
      [
        '来年度、一般社員の評価について正しいものはどれですか。',
        ['業績が評価の70%を占める', '業績と行動が同じ割合で評価される', '部下や同僚からの評価が加えられる', '評価は年に1回行われる'],
        1,
        'Câu 2: từ năm tới nhân viên thường được tính 業績50%・行動50%, tức hai mục ngang nhau. Câu 1 là tỉ lệ cũ, nay chỉ còn áp cho cấp quản lý. Câu 3 là đánh giá đa chiều, chỉ dành cho quản lý (管理職に限り). Số lần đánh giá tăng lên hai lần một năm.',
      ],
      [
        '管理職の多面評価の結果は、来年度どのように扱われますか。',
        ['賞与の額を決めるために使われる', '昇給するかどうかの判断に使われる', '参考資料として扱われ、処遇には影響しない', '一般社員の評価にも使われる'],
        2,
        'Câu 3: kết quả chỉ là tài liệu tham khảo, và sau ただし ghi rõ năm tới không phản ánh vào lương, thưởng (処遇には反映しません). Câu 1 và 2 nêu đúng loại 処遇 có trong bài nhưng bị chính câu ただし phủ định.',
      ],
    ],
    points: [
      ['一律に', 'いちりつに', 'đồng loạt, như nhau cho mọi người'],
      ['多面評価', 'ためんひょうか', 'đánh giá đa chiều (360 độ)'],
      ['処遇', 'しょぐう', 'đãi ngộ (lương, thưởng, chức vụ)'],
      ['反映する', 'はんえいする', 'phản ánh vào'],
    ],
  }),
  item('w11', 'sogo-dokkai', 2, {
    material: {
      kind: 'text',
      title: '新人研修、「座学3か月」から「現場で育てる」へ',
      body: '中堅機械メーカーの東邦工機は、今年度から新入社員研修のやり方を大きく変えた。これまでは入社後3か月間、本社で座学中心の集合研修を行ってから各部署に配属していたが、今年度は集合研修を2週間に短縮し、残りの期間は配属先で先輩社員の指導を受けながら働く形にした。\n人事部の宮本部長は「座学で覚えたことが現場ではすぐに役立たない、という声が新人からも配属先からも上がっていた」と話す。また、新人一人ひとりに、別の部署の若手社員が「メンター」として付き、月に一度、仕事以外の悩みも含めて相談に乗る。直属の上司には話しにくいことを打ち明けられる相手をつくるのがねらいだ。\n導入から半年、配属先の評価はおおむね良好だが、課題もある。指導役の先輩社員の負担が増え、一部の部署では本来の業務に遅れが出ている。同社は来年度から、指導役となる社員の人事評価に「育成」の項目を加え、指導にかけた時間を正当に評価する方針だ。',
    },
    questions: [
      [
        'メンターについて、正しいものはどれですか。',
        ['新人が上司に話しにくいことを相談できる相手である', '新人と同じ部署の先輩社員が務める', '仕事の進め方を毎日指導する', '人事部の社員が担当する'],
        0,
        'Câu 1: mục đích là tạo một người để tân binh thổ lộ những điều khó nói với cấp trên trực tiếp. Câu 2 lẫn với 指導役 (đàn anh cùng phòng hướng dẫn công việc); mentor là nhân viên trẻ của phòng khác, gặp mỗi tháng một lần chứ không phải hằng ngày.',
      ],
      [
        '同社が来年度から行う予定のことは何ですか。',
        ['集合研修を3か月に戻す', '指導役の社員の評価に「育成」の項目を加える', 'メンターの人数を増やす', '指導役の負担を減らすために人を増やす'],
        1,
        'Câu 2: câu cuối nói từ năm tới thêm mục "育成" vào đánh giá người hướng dẫn để ghi nhận thời gian họ bỏ ra. Câu 4 đúng là vấn đề bài nêu (gánh nặng của người hướng dẫn), nhưng cách giải quyết công ty chọn là đánh giá công bằng, không phải tuyển thêm người.',
      ],
    ],
    points: [
      ['座学', 'ざがく', 'học lý thuyết trên lớp'],
      ['配属', 'はいぞく', 'phân về bộ phận'],
      ['打ち明ける', 'うちあける', 'thổ lộ, tâm sự'],
      ['おおむね', 'おおむね', 'nhìn chung, đại thể'],
    ],
  }),
];

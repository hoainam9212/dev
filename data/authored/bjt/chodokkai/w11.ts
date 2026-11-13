import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/** Week 11 — HR, evaluation and training. Level: J1. */
export const W11: BjtItem[] = [
  item('w11', 'jokyo', 1, {
    material: {
      kind: 'table',
      title: '組織図（課長）',
      head: ['本部', '課', '課長'],
      rows: [
        ['営業本部', '営業1課', '森'],
        ['営業本部', '営業2課', '松田'],
        ['管理本部', '人事課', '井上'],
        ['管理本部', '経理課', '大野'],
      ],
    },
    script: [['女', '来月から課長の人事異動があります。営業2課の松田課長が人事課長になります。人事課の井上課長は経理課へ、経理課の大野課長は営業2課に移ります。営業1課は変更ありません。', 'Từ tháng sau có thay đổi nhân sự cấp trưởng phòng. Trưởng phòng Matsuda của Kinh doanh 2 sẽ làm trưởng phòng Nhân sự. Trưởng phòng Inoue của Nhân sự chuyển sang Kế toán, trưởng phòng Ono của Kế toán chuyển sang Kinh doanh 2. Kinh doanh 1 không đổi.']],
    questions: [
      [
        '来月、営業2課の課長は誰になりますか。',
        ['松田', '井上', '森', '大野'],
        3,
        'Ba người đổi chỗ vòng tròn: Matsuda → Nhân sự, Inoue → Kế toán, Ono → Kinh doanh 2. Matsuda là trưởng phòng hiện tại trên sơ đồ. Mori ở lại Kinh doanh 1.',
      ],
    ],
    points: [
      ['組織図', 'そしきず', 'sơ đồ tổ chức'],
      ['人事異動', 'じんじいどう', 'thay đổi nhân sự'],
    ],
  }),
  item('w11', 'jokyo', 2, {
    material: {
      kind: 'table',
      title: '6月の社内研修（申込画面）',
      head: ['コース', '日程', '残席'],
      rows: [
        ['A リーダー研修', '6/12', '0'],
        ['B リーダー研修', '6/26', '3'],
        ['C 評価者研修', '6/12', '5'],
        ['D 評価者研修', '6/19', '0'],
      ],
    },
    script: [
      ['男', '研修、リーダー研修と評価者研修、どっちを受けるつもり？', 'Đào tạo thì em định học khoá trưởng nhóm hay khoá người đánh giá?'],
      ['女', '評価者研修です。ただ、十二日は大阪に出張なんです。', 'Khoá người đánh giá ạ. Có điều ngày mười hai em đi công tác Osaka.'],
      ['男', '評価者研修は来月もあるから、今月はリーダー研修のほうを受けておいたら？', 'Khoá người đánh giá tháng sau vẫn còn, tháng này em học khoá trưởng nhóm trước đi?'],
      ['女', 'そうします。', 'Vâng, em sẽ làm vậy.'],
    ],
    questions: [
      [
        '女の人はどのコースに申し込みますか。',
        ['A', 'B', 'C', 'D'],
        1,
        'Khoá người đánh giá: C trùng ngày 12 (đi công tác), D hết chỗ, nên chuyển sang khoá trưởng nhóm. A cũng ngày 12 và hết chỗ; còn B (26/6, còn 3 chỗ).',
      ],
    ],
    points: [
      ['残席', 'ざんせき', 'số chỗ còn trống'],
      ['評価者', 'ひょうかしゃ', 'người đánh giá'],
    ],
  }),
  item('w11', 'shiryo', 1, {
    material: {
      kind: 'bars',
      title: '社内研修の満足度',
      unit: '%',
      labels: ['新人研修', 'リーダー研修', '評価者研修', '英語研修'],
      series: [{ name: '満足と答えた割合', values: [85, 78, 62, 65] }],
    },
    script: [['女', '満足度が七割を下回った研修は、来年度、内容を見直します。ただし、英語研修は外部の会社に任せているので、委託先を変えることで対応します。', 'Các khoá có mức hài lòng dưới bảy mươi phần trăm sẽ được xem lại nội dung vào năm tới. Tuy nhiên, khoá tiếng Anh do công ty bên ngoài đảm nhận, nên sẽ xử lý bằng cách đổi đơn vị nhận uỷ thác.']],
    questions: [
      [
        '来年度、内容を見直すのはどの研修ですか。',
        ['新人研修', '英語研修', '評価者研修', 'リーダー研修'],
        2,
        'Dưới 70%: khoá người đánh giá (62%) và tiếng Anh (65%). Nhưng tiếng Anh được xử lý bằng cách đổi công ty bên ngoài, không xem lại nội dung. Còn lại khoá người đánh giá.',
      ],
    ],
    points: [
      ['見直す', 'みなおす', 'xem lại'],
      ['委託先', 'いたくさき', 'đơn vị nhận uỷ thác'],
    ],
  }),
  item('w11', 'shiryo', 2, {
    material: {
      kind: 'table',
      title: '有給休暇の取得状況（営業1課）',
      head: ['社員', '付与日数', '取得日数'],
      rows: [
        ['青木', '20日', '6日'],
        ['石川', '15日', '12日'],
        ['上田', '20日', '14日'],
        ['江口', '12日', '3日'],
      ],
    },
    script: [['男', '有給休暇の取得率が五割に届いていない人には、人事部から、休暇を取るよう勧めるメールが送られます。', 'Ai có tỉ lệ sử dụng ngày phép có lương chưa đạt năm mươi phần trăm sẽ nhận được email của phòng nhân sự khuyến khích nghỉ phép.']],
    questions: [
      [
        '人事部からメールが届くのは誰ですか。',
        ['青木さんと江口さん', '石川さんと上田さん', '江口さんだけ', '青木さんだけ'],
        0,
        'Tỉ lệ = ngày đã nghỉ ÷ ngày được cấp: Aoki 30%, Ishikawa 80%, Ueda 70%, Eguchi 25%. Dưới 50% là Aoki và Eguchi. Chỉ nhìn số ngày đã nghỉ thì Aoki (6 ngày) có vẻ không ít, nhưng anh ấy được cấp 20 ngày.',
      ],
    ],
    points: [
      ['有給休暇', 'ゆうきゅうきゅうか', 'nghỉ phép có lương'],
      ['付与', 'ふよ', 'cấp, trao'],
      ['取得率', 'しゅとくりつ', 'tỉ lệ sử dụng'],
    ],
  }),
  item('w11', 'shiryo', 3, {
    material: {
      kind: 'text',
      title: '【中途採用】経理スタッフ募集',
      body: '【中途採用】経理スタッフ\n\n応募条件：経理の実務経験3年以上、日商簿記2級以上\n勤務時間：9:00〜17:30（フレックスタイム制あり）\n給与：月給28万円〜（経験・能力による）\n勤務地：本社（東京）',
    },
    script: [['女', '今回の応募者の方は、経理の経験は五年あるんですが、簿記は三級なんです。ただ、前の会社で決算をまとめた経験があるので、部長が一度面接してみたいとおっしゃっています。', 'Ứng viên lần này có năm năm kinh nghiệm kế toán, nhưng chứng chỉ kế toán mới cấp ba. Tuy vậy, ở công ty cũ người đó từng làm quyết toán, nên trưởng bộ phận nói muốn phỏng vấn thử một lần.']],
    questions: [
      [
        'この応募者について、正しいのはどれですか。',
        ['応募条件をすべて満たしている', '経験年数が足りない', '面接は行わない', '簿記の条件は満たしていないが、面接を行う'],
        3,
        'Kinh nghiệm 5 năm ≥ 3 năm: đạt. Chứng chỉ cấp 3 thấp hơn yêu cầu cấp 2: chưa đạt. Nhưng trưởng bộ phận muốn phỏng vấn vì kinh nghiệm quyết toán. Lựa chọn 1 sai vì thiếu điều kiện chứng chỉ.',
      ],
    ],
    points: [
      ['中途採用', 'ちゅうとさいよう', 'tuyển người đã có kinh nghiệm'],
      ['簿記', 'ぼき', 'kế toán (chứng chỉ ghi sổ)'],
      ['実務経験', 'じつむけいけん', 'kinh nghiệm thực tế'],
    ],
  }),
  item('w11', 'sogo-chodokkai', 1, {
    material: {
      kind: 'text',
      title: '内示',
      body: '内示\n\n営業部 営業1課 高橋 健 殿\n\n4月1日付で、大阪支店 営業課への異動を内示します。\n\n※正式な辞令は、3月15日に交付します。\n※内示の内容は、正式な辞令の交付まで口外しないでください。\n\n人事部',
    },
    script: [
      ['男', '課長、内示をいただきました。大阪支店ですね。', 'Trưởng phòng, tôi đã nhận thông báo nội bộ. Là chi nhánh Osaka ạ.'],
      ['女', 'ええ。急で驚いたでしょう。', 'Ừ. Đột ngột quá chắc anh bất ngờ lắm.'],
      ['男', 'はい。でも、地方の営業も一度経験したいと思っていたので、ありがたいです。引き継ぎは、誰にすればいいでしょうか。', 'Vâng. Nhưng tôi cũng muốn thử làm kinh doanh ở địa phương một lần, nên rất cảm kích. Việc bàn giao thì tôi giao cho ai ạ?'],
      ['女', '担当のお客様は、林さんに引き継いでもらうことになっているわ。ただ、林さんにはまだ伝えていないから、正式に発表されるまでは、あなたからは言わないでね。', 'Khách anh phụ trách sẽ giao lại cho chị Hayashi. Có điều chị ấy chưa được báo, nên trước khi công bố chính thức thì anh đừng nói gì nhé.'],
      ['男', 'わかりました。では、引き継ぎの資料だけ、先に作っておきます。', 'Tôi hiểu rồi. Vậy tôi chuẩn bị trước tài liệu bàn giao thôi.'],
    ],
    questions: [
      [
        '高橋さんは異動についてどう思っていますか。',
        ['急なので困っている', '前向きに受け止めている', '断りたいと思っている', '東京に残りたいと思っている'],
        1,
        'Anh có bất ngờ (はい) nhưng nói 地方の営業も一度経験したいと思っていたので、ありがたいです, tức là đón nhận tích cực. "Bất ngờ" khác với "khó xử".',
      ],
      [
        '高橋さんがこのあとすることは何ですか。',
        ['林さんに異動のことを伝える', 'お客様に異動のあいさつをする', '大阪支店に電話する', '引き継ぎの資料を作る'],
        3,
        'Anh chỉ làm trước tài liệu bàn giao. Nói với chị Hayashi bị cấm cho tới khi có quyết định chính thức (15/3), và chào khách thì cũng làm lộ chuyện, trái với dòng 口外しないでください.',
      ],
    ],
    points: [
      ['内示', 'ないじ', 'thông báo nội bộ trước (về nhân sự)'],
      ['辞令', 'じれい', 'quyết định bổ nhiệm'],
      ['口外する', 'こうがいする', 'nói ra ngoài'],
      ['引き継ぎ', 'ひきつぎ', 'bàn giao'],
    ],
  }),
  item('w11', 'sogo-chodokkai', 2, {
    material: {
      kind: 'table',
      title: '働きやすさに関する社員調査（「満足」と答えた割合）',
      head: ['項目', '20代', '30代', '40代以上'],
      rows: [
        ['給与', '35%', '42%', '55%'],
        ['休みの取りやすさ', '60%', '48%', '58%'],
        ['成長の機会', '28%', '45%', '40%'],
        ['人間関係', '70%', '65%', '62%'],
      ],
    },
    script: [
      ['女', '若手の離職が増えている原因、この調査から何か見えますか。', 'Nguyên nhân người trẻ nghỉ việc tăng lên, khảo sát này cho thấy gì không?'],
      ['男', '二十代で特に低いのは、成長の機会ですね。給与も低いですが、若手の給与が低いのはどの会社も同じなので…。', 'Ở nhóm hai mươi tuổi, thấp nhất rõ rệt là cơ hội phát triển. Lương cũng thấp, nhưng lương người trẻ thấp thì công ty nào cũng thế…'],
      ['女', 'つまり、給与よりも、成長できないと感じて辞めている可能性がある、と。', 'Tức là có thể họ nghỉ vì cảm thấy không phát triển được, hơn là vì lương.'],
      ['男', 'はい。三十代は、休みの取りやすさがほかの年代より低いのが気になりますが、離職とはあまり関係がなさそうです。', 'Vâng. Nhóm ba mươi tuổi thì mức dễ xin nghỉ thấp hơn các nhóm khác, cũng đáng lo, nhưng có vẻ không liên quan lắm đến việc nghỉ việc.'],
      ['女', 'じゃあ、まずは二十代向けに、希望すれば別の部署の仕事を経験できる制度を考えてみましょう。', 'Vậy trước hết hãy nghĩ một chế độ cho người hai mươi tuổi, ai muốn thì được thử làm việc ở phòng khác.'],
    ],
    questions: [
      [
        '男の人は、二十代の離職の原因として何が考えられると言っていますか。',
        ['給与が低いこと', '休みが取りにくいこと', '成長の機会が少ないと感じていること', '人間関係が悪いこと'],
        2,
        'Cơ hội phát triển ở nhóm 20 tuổi chỉ 28%, thấp nhất bảng. Lương cũng thấp nhưng anh gạt đi vì công ty nào cũng thế. Quan hệ con người ở nhóm 20 tuổi lại cao nhất (70%).',
      ],
      [
        '女の人が考えている制度はどのようなものですか。',
        ['若手がほかの部署の仕事を経験できる制度', '二十代の給与を上げる制度', '三十代が休みを取りやすくする制度', '上司と毎月面談する制度'],
        0,
        'Chế độ cho người 20 tuổi được thử việc ở phòng khác, nhắm vào cơ hội phát triển. Chuyện nghỉ phép của nhóm 30 tuổi được nhắc tới nhưng đánh giá là ít liên quan.',
      ],
    ],
    points: [
      ['離職', 'りしょく', 'nghỉ việc'],
      ['若手', 'わかて', 'người trẻ (trong công ty)'],
      ['機会', 'きかい', 'cơ hội'],
    ],
  }),
];

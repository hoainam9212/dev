import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/** Week 11 — HR, evaluation and training; conversations at natural speed. Level: J1. */
export const W11: BjtItem[] = [
  item('w11', 'bamen', 1, {
    material: {
      kind: 'scene',
      vi: 'Phòng phỏng vấn. Hai người phỏng vấn ngồi sau một chiếc bàn dài; một người đang lật hồ sơ của ứng viên, người kia nhìn ứng viên. Một ứng viên nữ ngồi đối diện, hai tay đặt trên đùi, đang trả lời. Cửa phía sau ứng viên đã đóng.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['面接官が応募者と握手をしています。', '応募者が履歴書を書いています。', '面接官の一人が書類をめくっています。', '応募者が部屋に入ろうとしています。'],
        2,
        'Một người phỏng vấn đang lật hồ sơ: 書類をめくる. Ứng viên đã ngồi và đang trả lời, cửa đã đóng, nên không phải "sắp vào phòng". Tay ứng viên đặt trên đùi, không viết gì.',
      ],
    ],
    points: [
      ['めくる', 'めくる', 'lật (trang)'],
      ['応募者', 'おうぼしゃ', 'người ứng tuyển'],
      ['面接官', 'めんせつかん', 'người phỏng vấn'],
    ],
  }),
  item('w11', 'bamen', 2, {
    material: {
      kind: 'scene',
      vi: 'Phòng đào tạo. Các học viên ngồi thành nhóm bốn người quanh từng bàn, đang trao đổi với nhau; ở mỗi bàn có một người viết lên tờ giấy khổ lớn. Nam giảng viên đứng ở phía trước, cạnh bảng trắng, nhìn các nhóm.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['受講者がグループで話し合っています。', '講師が受講者に資料を配っています。', '受講者が一人ずつ発表しています。', '講師が座って話を聞いています。'],
        0,
        'Học viên đang thảo luận theo nhóm: グループで話し合う. Không ai đứng trình bày riêng. Giảng viên đứng phía trước nhìn các nhóm, không phát tài liệu cũng không ngồi.',
      ],
    ],
    points: [
      ['受講者', 'じゅこうしゃ', 'học viên'],
      ['講師', 'こうし', 'giảng viên'],
    ],
  }),
  item('w11', 'hatsugen', 1, {
    script: [['状況', '人事評価の面談で、上司から「この一年で一番成長したと思う点は何ですか」と聞かれました。何と言いますか。', 'Trong buổi đánh giá nhân sự, cấp trên hỏi: "Điểm bạn thấy mình tiến bộ nhất trong năm qua là gì?" Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        [
          '特にありません。',
          '全部成長したと思います。',
          '課長のおかげで、何もしなくても成長できました。',
          'はい。後輩の指導を任されたことで、人に説明する力がついたと考えております。',
        ],
        3,
        'Trả lời tốt nêu một điểm cụ thể kèm trải nghiệm làm nên điểm đó. Câu 1 bỏ lỡ cơ hội. Câu 2 chung chung. Câu 3 nịnh và lại hạ thấp nỗ lực của chính mình.',
      ],
    ],
    points: [
      ['人事評価', 'じんじひょうか', 'đánh giá nhân sự'],
      ['指導', 'しどう', 'hướng dẫn, chỉ bảo'],
      ['任される', 'まかされる', 'được giao (trách nhiệm)'],
    ],
  }),
  item('w11', 'hatsugen', 2, {
    script: [['状況', '新入社員に、仕事でわからないことがあったら、いつでも質問していいと伝えます。何と言いますか。', 'Bạn nói với nhân viên mới rằng có gì không hiểu trong công việc thì cứ hỏi bất cứ lúc nào. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        [
          'わからないことは、自分で調べるのが基本だよ。',
          'わからないことがあったら、遠慮しないで、いつでも聞いてね。',
          'わからないことがおありでしたら、お尋ねになってくださいませ。',
          '質問は、一日一回にしてください。',
        ],
        1,
        'Với cấp dưới mới vào, giọng thân thiện và khuyến khích (遠慮しないで) là phù hợp. Câu 3 kính ngữ quá mức với người dưới, nghe xa cách. Câu 1 và 4 trái với điều muốn truyền đạt.',
      ],
    ],
    points: [['遠慮する', 'えんりょする', 'ngại, khách sáo']],
  }),
  item('w11', 'hatsugen', 3, {
    script: [['状況', '上司から、来月から別の部署に異動しないかと打診されました。前向きに考えたいのですが、家族とも相談したいです。何と言いますか。', 'Cấp trên hỏi ý bạn về việc chuyển sang phòng khác từ tháng sau. Bạn muốn cân nhắc tích cực nhưng cũng muốn bàn với gia đình. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        [
          '大変ありがたいお話です。前向きに考えたいと思いますので、家族とも相談のうえ、今週中にお返事させていただけますか。',
          '異動は嫌です。',
          'はい、行きます。家族にはあとで言います。',
          '考えておきます。',
        ],
        0,
        'Cảm ơn, nói rõ thái độ tích cực, lý do cần thời gian và hẹn trả lời (今週中). Câu 4 không có thời hạn, lại dễ bị hiểu là từ chối khéo. Câu 3 quyết vội, trái với ý muốn bàn với gia đình.',
      ],
    ],
    points: [
      ['異動', 'いどう', 'thuyên chuyển (trong công ty)'],
      ['打診する', 'だしんする', 'thăm dò ý kiến'],
      ['前向きに', 'まえむきに', 'tích cực'],
    ],
  }),
  item('w11', 'hatsugen', 4, {
    script: [['状況', '社内研修で講師をしてくれた他部署の先輩に、研修が終わってからお礼を言います。何と言いますか。', 'Sau buổi đào tạo nội bộ, bạn cảm ơn đàn anh ở phòng khác đã làm giảng viên. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        [
          'お疲れ様でした。まあまあわかりやすかったです。',
          'ご苦労様でした。',
          '本日はありがとうございました。具体的な例が多くて、すぐに現場で使えそうです。',
          '研修、ちょっと長かったですね。',
        ],
        2,
        'Cảm ơn kèm một nhận xét cụ thể, tích cực về điều mình học được. Câu 1 khen nửa vời (まあまあ). Câu 2 dùng ご苦労様 với người trên. Câu 4 chê.',
      ],
    ],
    points: [['現場', 'げんば', 'nơi làm việc thực tế']],
  }),
  item('w11', 'sogo-chokai', 1, {
    script: [
      ['女', '人事部からお知らせします。今年度から、人事評価の方法が変わります。', 'Phòng nhân sự xin thông báo. Từ năm tài chính này, phương pháp đánh giá nhân sự sẽ thay đổi.'],
      ['女', 'これまでは年に一回、上司だけが評価していましたが、今年度からは半年に一回、上司に加えて、同じチームの同僚二名からも評価を受けていただきます。', 'Trước giờ mỗi năm một lần, chỉ cấp trên đánh giá. Từ năm nay sẽ là nửa năm một lần, và ngoài cấp trên, mỗi người còn được hai đồng nghiệp cùng nhóm đánh giá.'],
      ['女', 'ただし、同僚からの評価は給与には反映されません。ご本人の成長のための参考として使います。', 'Tuy nhiên, đánh giá của đồng nghiệp không ảnh hưởng tới lương. Nó được dùng làm tham khảo để bản thân mỗi người phát triển.'],
      ['女', 'なお、評価の前には必ず上司と面談を行い、半年間の目標を確認してください。', 'Ngoài ra, trước khi đánh giá nhất định phải gặp cấp trên để xác nhận mục tiêu của nửa năm.'],
    ],
    questions: [
      [
        '新しい評価の方法について、正しいのはどれですか。',
        ['年に一回、上司だけが評価する', '年に一回、同僚も評価する', '半年に一回、上司だけが評価する', '半年に一回、上司と同僚が評価する'],
        3,
        'Hai thay đổi: tần suất (năm một lần → nửa năm một lần) và người đánh giá (thêm hai đồng nghiệp). Lựa chọn 1 là cách cũ. Lựa chọn 2 và 3 chỉ đúng một nửa.',
      ],
      [
        '同僚からの評価は何に使われますか。',
        ['給与を決めるため', '本人の成長の参考にするため', '昇進を決めるため', '上司を評価するため'],
        1,
        'Câu ただし nói rõ: 給与には反映されません, chỉ dùng làm tham khảo cho sự phát triển của bản thân. Thăng chức và đánh giá cấp trên không được nhắc tới.',
      ],
    ],
    points: [
      ['反映する', 'はんえいする', 'phản ánh (vào)'],
      ['面談', 'めんだん', 'buổi gặp trao đổi riêng'],
    ],
  }),
  item('w11', 'sogo-chokai', 2, {
    script: [
      ['男', '佐藤さん、新人の田中さんのこと、どう思う？', 'Chị Sato, chị thấy cậu Tanaka mới vào thế nào?'],
      ['女', 'そうですね…。返事はいつも元気なんですけど。', 'Ừm… Lúc nào cũng dạ vâng rất hăng hái, có điều…'],
      ['男', 'けど？', 'Có điều?'],
      ['女', '頼んだことを、期限ぎりぎりになって「できませんでした」って言ってくることが何回かあって。途中で一言相談してくれれば、手伝えたんですけどね。', 'Mấy lần việc nhờ làm, sát hạn mới bảo "em không làm được". Giá mà giữa chừng nói một câu thì tôi đã giúp được.'],
      ['男', 'なるほど。本人は迷惑をかけたくなくて、一人で抱え込んでるのかもしれないな。', 'Ra vậy. Có khi cậu ấy không muốn làm phiền ai nên ôm việc một mình.'],
      ['女', 'そうかもしれません。', 'Có thể lắm.'],
      ['男', 'じゃあ、毎週金曜の夕方に、十分でいいから、仕事の進み具合を話す時間を作ってあげてくれる？', 'Vậy chiều thứ sáu hằng tuần, chị dành ra mười phút thôi để nói chuyện với cậu ấy về tiến độ công việc nhé?'],
      ['女', 'わかりました。来週から始めます。', 'Vâng. Tuần sau tôi bắt đầu.'],
    ],
    questions: [
      [
        '女の人は田中さんのどんな点を問題だと思っていますか。',
        ['途中で相談しないこと', '返事をしないこと', '期限を守らないことが多いこと', '仕事が遅いこと'],
        0,
        'Điều chị tiếc là 途中で一言相談してくれれば: giá mà cậu ấy hỏi giữa chừng. Chuyện trễ hạn chỉ là hậu quả, và mới xảy ra "vài lần", nên lựa chọn 3 chưa đúng trọng tâm. Cậu ấy dạ vâng rất hăng hái.',
      ],
      [
        '女の人は来週から何をしますか。',
        ['田中さんの仕事を手伝う', '田中さんの期限を延ばす', '田中さんと毎週話す時間を作る', '田中さんの仕事を減らす'],
        2,
        'Anh nhờ: mỗi chiều thứ sáu, mười phút nói chuyện về tiến độ; chị đáp 来週から始めます. Giúp việc chỉ là điều chị có thể làm nếu được hỏi sớm, không phải việc được giao.',
      ],
    ],
    points: [
      ['ぎりぎり', 'ぎりぎり', 'sát nút'],
      ['抱え込む', 'かかえこむ', 'ôm (việc, vấn đề) một mình'],
      ['進み具合', 'すすみぐあい', 'tiến độ'],
    ],
  }),
];

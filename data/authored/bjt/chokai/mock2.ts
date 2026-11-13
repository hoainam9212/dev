import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/**
 * Full test 2 (week 12), 聴解: 5 場面把握 + 10 発言聴解 + 10 総合聴解 questions = 25.
 * Mixes the themes of weeks 1–11; about 30% of the questions are J1+.
 */
export const MOCK2: BjtItem[] = [
  // ── 場面把握 ──
  item('mock2', 'bamen', 1, {
    material: {
      kind: 'scene',
      vi: 'Một nữ nhân viên ngồi trước máy tính xách tay, đeo tai nghe có micro. Trên màn hình là lưới nhiều khuôn mặt của một cuộc họp trực tuyến. Cô đang giơ tay vẫy chào về phía màn hình. Cạnh máy tính có một cuốn sổ tay đang gập.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['女性がヘッドセットを外しています。', '女性がノートにメモを取っています。', '女性が画面に向かって手を振っています。', '女性がパソコンを閉じています。'],
        2,
        'Cô ấy vẫy tay về phía màn hình: 手を振る. Tai nghe vẫn đeo, sổ tay đang gập, máy tính đang mở và chạy cuộc họp.',
      ],
    ],
    points: [['手を振る', 'てをふる', 'vẫy tay']],
  }),
  item('mock2', 'bamen', 2, {
    material: {
      kind: 'scene',
      vi: 'Cổng an ninh ở sảnh văn phòng. Một nam nhân viên đang giơ thẻ nhân viên lên sát máy đọc thẻ bên cạnh cổng. Phía sau anh, một người khác đứng đợi. Một nhân viên bảo vệ đứng cách đó vài bước, hai tay chắp sau lưng.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['男性が社員証を読み取り機にかざしています。', '警備員が男性の社員証を確認しています。', '男性がゲートを手で押して開けています。', '二人が並んでゲートを通っています。'],
        0,
        'Giơ thẻ sát máy đọc là かざす. Bảo vệ đứng xa, tay chắp sau lưng, không kiểm tra thẻ. Người kia đang đợi phía sau, chưa ai đi qua cổng.',
      ],
    ],
    points: [
      ['かざす', 'かざす', 'giơ (thẻ) sát vào máy'],
      ['警備員', 'けいびいん', 'nhân viên bảo vệ'],
    ],
  }),
  item('mock2', 'bamen', 3, {
    material: {
      kind: 'scene',
      vi: 'Gian hàng ở hội chợ triển lãm. Một nữ nhân viên đứng sau quầy, chìa một tờ rơi về phía một người đàn ông đang đi ngang qua. Trên quầy bày vài sản phẩm mẫu và một hộp đựng danh thiếp.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['女性が商品を箱に詰めています。', '客がパンフレットを読んでいます。', '女性が名刺を交換しています。', '女性が通りかかった人にチラシを差し出しています。'],
        3,
        'Cô ấy chìa tờ rơi cho người đi ngang: 通りかかった人に差し出す. Người đàn ông chưa cầm, chưa đọc. Hộp danh thiếp có trên quầy nhưng không ai trao đổi danh thiếp.',
      ],
    ],
    points: [
      ['通りかかる', 'とおりかかる', 'tình cờ đi ngang qua'],
      ['チラシ', 'ちらし', 'tờ rơi'],
    ],
  }),
  item('mock2', 'bamen', 4, {
    material: {
      kind: 'scene',
      vi: 'Văn phòng. Một nam nhân viên đứng trên chiếc thang gấp nhỏ, hai tay với lên trần đang thay bóng đèn. Một nữ nhân viên đứng dưới, hai tay giữ chặt chân thang.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['男性が窓を拭いています。', '女性がはしごを支えています。', '男性がはしごを運んでいます。', '女性が電球を取り替えています。'],
        1,
        'Người phụ nữ giữ chân thang: はしごを支える. Câu 4 đảo chủ thể: người thay bóng đèn là người đàn ông. Thang đang được dùng chứ không ai khiêng.',
      ],
    ],
    points: [
      ['支える', 'ささえる', 'đỡ, giữ'],
      ['電球', 'でんきゅう', 'bóng đèn'],
    ],
  }),
  item('mock2', 'bamen', 5, {
    material: {
      kind: 'scene',
      vi: 'Phòng nghỉ của nhân viên. Một nam nhân viên cầm chiếc cốc dưới vòi của máy pha cà phê, cà phê đang chảy vào cốc. Cạnh máy có một hộp đường đang đậy nắp. Tủ lạnh bên cạnh đóng.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['男性がコーヒーをカップに注いでいます。', '男性が冷蔵庫から牛乳を出しています。', '男性がコーヒーに砂糖を入れています。', '男性がカップを洗っています。'],
        0,
        'Cà phê đang chảy vào cốc anh cầm: 注ぐ. Hộp đường còn đậy nắp, tủ lạnh đóng.',
      ],
    ],
    points: [['注ぐ', 'そそぐ', 'rót']],
  }),

  // ── 発言聴解 ──
  item('mock2', 'hatsugen', 1, {
    script: [['状況', '社外からの電話です。相手が名乗らずに「田中さん、いますか」と言いました。相手が誰か確認したいです。何と言いますか。', 'Cuộc gọi từ bên ngoài. Người gọi không xưng tên mà hỏi luôn: "Có anh Tanaka không?" Bạn muốn biết người gọi là ai. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['どちら様ですか。', '失礼ですが、どちら様でいらっしゃいますか。', '名前を言ってください。', 'お名前をおっしゃってさしあげますか。'],
        1,
        '失礼ですが + どちら様でいらっしゃいますか là câu chuẩn. Câu 1 đúng ý nhưng cụt, nghe như nghi ngờ. Câu 3 là mệnh lệnh. Câu 4 trộn kính ngữ sai.',
      ],
    ],
    points: [['名乗る', 'なのる', 'xưng tên']],
  }),
  item('mock2', 'hatsugen', 2, {
    script: [['状況', '取引先に送る文書の表現に失礼がないか、部長に見てほしいです。部長はこれから会議に向かうところです。何と言いますか。', 'Bạn muốn trưởng bộ phận xem văn bản gửi đối tác có chỗ nào thất lễ không. Trưởng bộ phận đang chuẩn bị đi họp. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        [
          '部長、今すぐ見てください。',
          '会議のあとで結構ですので見ていただきたいです。会議は何時に終わりますか。',
          '部長、こちらの資料をご確認してください。',
          'お急ぎのところすみません。会議のあとで結構ですので、こちらの文面をご確認いただけますでしょうか。',
        ],
        3,
        'Thấy cấp trên đang vội thì xin lỗi, nói rõ "sau cuộc họp cũng được" rồi mới nhờ. Câu 2 có ý tốt nhưng hỏi giờ xong họp nghe như giục. Câu 3 dùng ご確認して (khiêm nhường) cho việc của cấp trên.',
      ],
    ],
    points: [['結構です', 'けっこうです', 'được ạ, không sao']],
  }),
  item('mock2', 'hatsugen', 3, {
    script: [['状況', '取引先での打ち合わせのあと、相手から「駅までお送りしましょうか」と言われました。道はわかるので、断ります。何と言いますか。', 'Sau buổi họp ở công ty đối tác, người bên đó hỏi: "Tôi tiễn anh ra ga nhé?" Bạn biết đường nên từ chối. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['ありがとうございます。道はわかりますので、どうぞこちらで。', 'いいです。', 'ぜひお願いします。', '大丈夫です。お送りしなくて結構です。'],
        0,
        'Cảm ơn, nói lý do (biết đường) và mời họ dừng ở đây (どうぞこちらで). Câu 2 cụt lủn. Câu 3 nhận lời. Câu 4 dùng お送りする (khiêm nhường) cho hành động của đối tác.',
      ],
    ],
    points: [['お見送り', 'おみおくり', 'tiễn khách']],
  }),
  item('mock2', 'hatsugen', 4, {
    script: [['状況', 'あなたのチームが担当した企画が、社長賞を受けました。チームのメンバーに一言言います。何と言いますか。', 'Dự án nhóm bạn phụ trách nhận giải của giám đốc. Bạn nói vài lời với các thành viên trong nhóm. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['私の力です。', '運がよかっただけだね。', 'みんなのおかげです。本当にありがとう。次もこのチームで頑張りましょう。', '賞金はみんなで分けないからね。'],
        2,
        'Ghi nhận công của cả nhóm và cảm ơn. Câu 1 nhận hết về mình. Câu 2 coi nhẹ công sức của mọi người. Câu 4 lạc đề.',
      ],
    ],
    points: [['おかげ', 'おかげ', 'nhờ (ai đó)']],
  }),
  item('mock2', 'hatsugen', 5, {
    script: [['状況', '会議で部長が新しい案を出しましたが、あなたはデータの面から疑問があります。何と言いますか。', 'Trong cuộc họp, trưởng bộ phận đưa ra phương án mới, nhưng bạn có thắc mắc dựa trên số liệu. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        [
          'その案は、おかしいです。',
          '部長の案に賛成です。',
          '一点確認させてください。先月のデータでは、若い層の利用が減っているようなのですが、その点はどのようにお考えでしょうか。',
          'データを見ていないんですか。',
        ],
        2,
        'Không phản bác thẳng mà đưa số liệu cụ thể và hỏi ý cấp trên (どのようにお考えでしょうか). Câu 1 và 4 thẳng thừng, câu 4 còn chất vấn. Câu 2 trái với việc mình đang có thắc mắc.',
      ],
    ],
    points: [['若い層', 'わかいそう', 'tầng lớp trẻ, nhóm trẻ']],
  }),
  item('mock2', 'hatsugen', 6, {
    script: [['状況', '応接室で、来客にお茶を出します。何と言いますか。', 'Bạn mời trà khách trong phòng tiếp khách. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['お茶です。飲んでください。', '失礼いたします。どうぞお召し上がりください。', 'お茶をいただいてください。', 'お茶を差し上げてください。'],
        1,
        '失礼いたします khi bước vào và đặt trà, rồi mời bằng お召し上がりください. Câu 1 quá đơn giản. Câu 3 dùng いただく (khiêm nhường) cho hành động của khách. Câu 4 bảo khách "dâng trà", vô nghĩa.',
      ],
    ],
    points: [['召し上がる', 'めしあがる', 'ăn, uống (tôn kính)']],
  }),
  item('mock2', 'hatsugen', 7, {
    script: [['状況', '長くお世話になった取引先の担当者が、異動することになり、あいさつに来ました。何と言いますか。', 'Người phụ trách bên đối tác, người đã làm việc với bạn lâu năm, sắp chuyển công tác và đến chào. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        [
          'そうですか。残念ですね。じゃあ。',
          'ご異動ですか。ご苦労様でございました。',
          '後任の方は、ちゃんとした方ですか。',
          'これまで大変お世話になりました。新しい部署でのご活躍をお祈りしております。',
        ],
        3,
        'Cảm ơn quãng thời gian đã qua và chúc thành công ở nơi mới (ご活躍をお祈りしております). Câu 1 hời hợt. Câu 2 dùng ご苦労様 với người ngoài. Câu 3 tỏ ra nghi ngờ người kế nhiệm, thất lễ.',
      ],
    ],
    points: [
      ['ご活躍', 'ごかつやく', 'thành công, hoạt động tích cực'],
      ['後任', 'こうにん', 'người kế nhiệm'],
    ],
  }),
  item('mock2', 'hatsugen', 8, {
    script: [['状況', '電話で話していますが、相手の声が途切れて聞きとりにくいです。何と言いますか。', 'Đang nói chuyện điện thoại thì tiếng người bên kia bị ngắt quãng, khó nghe. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['恐れ入ります、お電話が少し遠いようなのですが。', '声が小さいです。', '電話が悪いので、もう切ります。', 'もっと大きい声でお話しください。'],
        0,
        'お電話が遠い là cách nói quen thuộc khi khó nghe, không đổ lỗi cho người gọi. Câu 2 và 4 cho rằng lỗi ở giọng của đối phương. Câu 3 tự ý cúp máy.',
      ],
    ],
    points: [['電話が遠い', 'でんわがとおい', 'điện thoại nghe không rõ']],
  }),
  item('mock2', 'hatsugen', 9, {
    script: [['状況', '部下が、初めて一人で大きなプレゼンテーションを終えました。上司として声をかけます。何と言いますか。', 'Cấp dưới của bạn vừa lần đầu tự mình thực hiện một bài thuyết trình lớn. Với tư cách cấp trên, bạn nói vài lời. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        [
          'まあまあだったね。',
          'お疲れさま。準備をしっかりしていたのがよくわかったよ。質問への答え方も落ち着いていたね。',
          'ご苦労様でございました。',
          '次は私がやるから、いいよ。',
        ],
        1,
        'Cấp trên khen cụ thể (chuẩn bị kỹ, trả lời bình tĩnh) giúp cấp dưới tự tin. Câu 1 khen nửa vời. Câu 3 kính ngữ quá mức với cấp dưới. Câu 4 làm người ta mất tinh thần.',
      ],
    ],
    points: [['落ち着く', 'おちつく', 'bình tĩnh']],
  }),
  item('mock2', 'hatsugen', 10, {
    script: [['状況', '取引先から「今週中にお返事をいただけますか」と言われましたが、社内の決裁に来週までかかります。何と言いますか。', 'Đối tác hỏi: "Anh có thể trả lời trong tuần này không?" nhưng việc phê duyệt nội bộ phải sang tuần sau mới xong. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        [
          'わかりました。今週中にお返事します。',
          '今週は無理です。',
          'そちらで待っていてもらえますか。',
          '申し訳ございません。社内の決裁に時間がかかっておりまして、来週の水曜日までお待ちいただくことは可能でしょうか。',
        ],
        3,
        'Xin lỗi, nêu lý do (phê duyệt nội bộ) và đề xuất thời hạn cụ thể. Câu 1 hứa điều không làm được. Câu 2 cụt lủn. Câu 3 suồng sã và không có hạn.',
      ],
    ],
    points: [['決裁', 'けっさい', 'phê duyệt (của cấp có thẩm quyền)']],
  }),

  // ── 総合聴解 ──
  item('mock2', 'sogo-chokai', 1, {
    script: [
      ['女', '忘年会の会場、去年と同じホテルでいいですか。', 'Địa điểm tiệc cuối năm, chọn khách sạn như năm ngoái được không ạ?'],
      ['男', 'うーん、去年は駅から遠いっていう声が多かったんだよね。', 'Ừm, năm ngoái nhiều người kêu xa ga quá.'],
      ['女', 'では、駅前の中華料理のお店はどうでしょう。六十人まで入れます。', 'Vậy quán đồ Trung Hoa trước ga thì sao ạ? Chứa được sáu mươi người.'],
      ['男', '今年の参加者は七十人ぐらいだから、ちょっと足りないな。', 'Năm nay khoảng bảy mươi người tham gia, hơi thiếu.'],
      ['女', 'それなら、駅ビルの和食のお店は八十人まで大丈夫です。ただ、予算を一人千円ほど超えてしまいます。', 'Vậy nhà hàng Nhật trong toà nhà ga chứa được tám mươi người. Có điều vượt ngân sách khoảng một nghìn yên mỗi người.'],
      ['男', 'その分は会社から補助が出ることになったから、問題ないよ。そこにしよう。', 'Phần đó công ty đã đồng ý hỗ trợ, không vấn đề gì. Chọn chỗ đó đi.'],
      ['女', 'わかりました。予約を入れておきます。', 'Vâng. Tôi sẽ đặt chỗ.'],
    ],
    questions: [
      [
        '去年の会場の問題は何でしたか。',
        ['駅から遠かった', '狭かった', '料理がおいしくなかった', '予算を超えた'],
        0,
        '去年は駅から遠いっていう声が多かった. "Chật" là vấn đề của quán Trung Hoa năm nay, "vượt ngân sách" là của nhà hàng Nhật.',
      ],
      [
        '今年の会場はどこですか。',
        ['去年と同じホテル', '駅前の中華料理の店', '会社の会議室', '駅ビルの和食の店'],
        3,
        'Quán Trung Hoa thiếu chỗ (60 < 70). Nhà hàng Nhật đủ 80 chỗ; phần vượt ngân sách đã có công ty hỗ trợ, nên chốt そこにしよう.',
      ],
    ],
    points: [
      ['忘年会', 'ぼうねんかい', 'tiệc cuối năm'],
      ['予算', 'よさん', 'ngân sách'],
    ],
  }),
  item('mock2', 'sogo-chokai', 2, {
    script: [
      ['男', '来期の営業方針についてお話しします。', 'Tôi xin trình bày phương châm kinh doanh kỳ tới.'],
      ['男', 'これまでは、新規のお客様を増やすことに力を入れてきました。しかし、この一年で、既存のお客様からのご注文が一割以上減っています。', 'Trước giờ chúng ta dồn sức vào việc tăng khách hàng mới. Nhưng trong một năm qua, đơn hàng từ khách hàng hiện có đã giảm hơn mười phần trăm.'],
      ['男', '新規のお客様の獲得には、既存のお客様の五倍のコストがかかると言われています。そこで来期は、既存のお客様への訪問を月一回から月二回に増やし、今のお客様との関係を深めることを最優先とします。', 'Người ta nói giành một khách mới tốn gấp năm lần chi phí so với giữ khách cũ. Vì vậy kỳ tới, chúng ta tăng số lần thăm khách hiện có từ một lên hai lần mỗi tháng, ưu tiên hàng đầu là thắt chặt quan hệ với khách hiện tại.'],
      ['男', '新規の開拓は、来期は専任のチームに任せます。', 'Việc tìm khách mới kỳ tới sẽ giao cho một nhóm chuyên trách.'],
    ],
    questions: [
      [
        'これまでの営業方針は何でしたか。',
        ['既存の客との関係を深める', '訪問の回数を増やす', '新規の客を増やす', '専任のチームを作る'],
        2,
        'これまでは、新規のお客様を増やすことに力を入れてきました. Ba lựa chọn còn lại đều là phương châm của kỳ tới.',
      ],
      [
        '来期、営業部員が最も力を入れることは何ですか。',
        ['新しい客を探す', '今の客を訪問する回数を増やす', 'コストを減らす', '専任チームに入る'],
        1,
        'Ưu tiên hàng đầu: thăm khách hiện có hai lần một tháng để thắt chặt quan hệ. Tìm khách mới đã giao cho nhóm chuyên trách. "Gấp năm lần chi phí" chỉ là lý do, không phải mục tiêu.',
      ],
    ],
    points: [
      ['既存', 'きそん', 'hiện có'],
      ['獲得', 'かくとく', 'giành được'],
      ['開拓', 'かいたく', 'khai thác, mở rộng (thị trường)'],
      ['専任', 'せんにん', 'chuyên trách'],
    ],
  }),
  item('mock2', 'sogo-chokai', 3, {
    script: [
      ['女', '昨日、丸山商会の青木さんと食事をしたんだけど、来年、うちとの取引を見直すかもしれないって、それとなく言われたのよ。', 'Hôm qua tôi đi ăn với chị Aoki bên Thương hội Maruyama, chị ấy nói bóng gió là sang năm có thể xem lại việc giao dịch với bên mình.'],
      ['男', '見直す、ですか。価格の問題でしょうか。', 'Xem lại ạ? Là vấn đề giá sao?'],
      ['女', 'それがね、価格の話は一切出なかったの。ただ、「最近、御社の担当の方とお会いする機会が減りましたね」って。', 'Lạ là chuyện giá không hề được nhắc tới. Chỉ có câu: "Dạo này ít có dịp gặp người phụ trách bên quý công ty nhỉ."'],
      ['男', 'ああ…。私、今年はメールで済ませることが多くて…。', 'À… Năm nay tôi hay giải quyết qua email…'],
      ['女', 'メールが悪いわけじゃないけど、青木さんは顔を合わせて話したい方なのよ。来週、一度ごあいさつに伺っておいたら？', 'Email không có gì sai, nhưng chị Aoki là người thích gặp mặt nói chuyện. Tuần sau anh đến chào một lần đi?'],
      ['男', 'はい、すぐにアポを取ります。', 'Vâng, tôi sẽ hẹn ngay.'],
    ],
    questions: [
      [
        '青木さんが不満に思っていることは何だと考えられますか。',
        ['価格が高いこと', '納期が遅いこと', 'メールの内容がわかりにくいこと', '担当者が直接会いに来ないこと'],
        3,
        '"Dạo này ít có dịp gặp người phụ trách" là cách phàn nàn bóng gió. Giá thì 一切出なかった. Không ai chê nội dung email; vấn đề là chỉ dùng email.',
      ],
      [
        '男の人はこのあと何をしますか。',
        ['価格を下げる提案をする', 'メールで謝る', '青木さんに会う約束を取る', '女の人と一緒に食事に行く'],
        2,
        'アポを取る = hẹn lịch gặp. Xin lỗi qua email lại đi ngược điều chị Aoki muốn. Giá không phải vấn đề.',
      ],
    ],
    points: [
      ['それとなく', 'それとなく', 'bóng gió, gián tiếp'],
      ['顔を合わせる', 'かおをあわせる', 'gặp mặt'],
      ['アポを取る', 'あぽをとる', 'hẹn lịch gặp'],
    ],
  }),
  item('mock2', 'sogo-chokai', 4, {
    script: [
      ['男', 'すみません、こちらのプロジェクター、会議室で使いたいんですが、明るい部屋でもよく見えますか。', 'Xin lỗi, tôi muốn dùng máy chiếu này trong phòng họp, phòng sáng có nhìn rõ không?'],
      ['女', 'はい、こちらは三千ルーメンございますので、照明をつけたままでも十分ご覧いただけます。', 'Vâng, máy này ba nghìn lumen, nên bật đèn vẫn xem rõ.'],
      ['男', 'そうですか。ただ、うちの会議室は窓が大きくて、昼間はかなり日が入るんですよ。', 'Vậy à. Nhưng phòng họp bên tôi cửa sổ rộng, ban ngày nắng vào nhiều lắm.'],
      ['女', 'それでしたら、こちらの五千ルーメンのモデルをおすすめいたします。お値段は三万円ほど上がりますが…。', 'Vậy tôi xin giới thiệu mẫu năm nghìn lumen này. Giá cao hơn khoảng ba mươi nghìn yên…'],
      ['男', 'うーん、三万円か…。ブラインドを閉めれば、三千でも大丈夫ですかね。', 'Ừm, ba mươi nghìn… Kéo rèm thì ba nghìn có được không nhỉ?'],
      ['女', 'ブラインドを閉めていただければ、問題ございません。', 'Kéo rèm thì không có vấn đề gì ạ.'],
      ['男', 'じゃあ、安いほうにして、ブラインドで対応します。', 'Vậy tôi lấy cái rẻ hơn, xử lý bằng rèm.'],
    ],
    questions: [
      [
        '客が最初に心配していたことは何ですか。',
        ['プロジェクターの大きさ', '昼間、部屋に日が入って明るいこと', '値段が高いこと', '照明が暗いこと'],
        1,
        'Phòng có cửa sổ lớn, ban ngày nắng chiếu vào nhiều. Giá chỉ thành vấn đề sau khi được giới thiệu mẫu đắt hơn. Phòng thì sáng, không tối.',
      ],
      [
        '客はどうすることにしましたか。',
        ['三千ルーメンのモデルを買い、ブラインドを閉めて使う', '五千ルーメンのモデルを買う', '会議室を変える', '照明を消して使う'],
        0,
        '安いほうにして、ブラインドで対応します: mua mẫu rẻ (3.000 lumen) và kéo rèm. Mẫu 5.000 lumen bị loại vì đắt hơn ba mươi nghìn.',
      ],
    ],
    points: [
      ['日が入る', 'ひがはいる', 'nắng chiếu vào'],
      ['おすすめする', 'おすすめする', 'giới thiệu, gợi ý'],
    ],
  }),
  item('mock2', 'sogo-chokai', 5, {
    script: [
      ['男', 'では、新しい勤怠システムの導入時期ですが、総務部からは十月という案が出ています。', 'Về thời điểm đưa hệ thống chấm công mới vào, phòng hành chính đề xuất tháng mười.'],
      ['女', '十月ですか。経理部としては、九月は半期の決算で手一杯なので、九月から準備が始まると、正直きついですね。', 'Tháng mười à? Bên kế toán tháng chín bận ngập đầu với quyết toán nửa năm, nên nếu bắt đầu chuẩn bị từ tháng chín thì thật lòng là căng.'],
      ['男', '準備期間は一か月ほど必要だそうです。', 'Nghe nói cần khoảng một tháng chuẩn bị.'],
      ['女', 'となると…。', 'Vậy thì…'],
      ['男', '十一月にすれば、準備は十月からで済みますが。', 'Nếu là tháng mười một thì chuẩn bị từ tháng mười là được.'],
      ['女', 'それなら助かります。ただ、年末は休暇の申請が増えるので、新しいシステムに慣れないうちに十二月を迎えるのは、少し心配ですね。', 'Vậy thì đỡ quá. Có điều cuối năm số đơn xin nghỉ tăng, chưa quen hệ thống mới mà đã sang tháng mười hai thì hơi lo.'],
      ['男', 'では、操作の説明会を十一月の初めに二回開くということで、十一月導入でいかがでしょう。', 'Vậy mở hai buổi hướng dẫn sử dụng vào đầu tháng mười một, và đưa vào tháng mười một, chị thấy sao?'],
      ['女', '説明会があれば、大丈夫だと思います。', 'Có buổi hướng dẫn thì chắc là ổn.'],
    ],
    questions: [
      [
        '女の人が十月の導入に賛成しなかったのはなぜですか。',
        ['九月に決算があり、準備の時間が取れないから', '十月は休暇の申請が多いから', '説明会が開けないから', 'システムが完成していないから'],
        0,
        'Chuẩn bị mất một tháng, nên đưa vào tháng mười thì phải chuẩn bị từ tháng chín, đúng lúc quyết toán nửa năm. Đơn xin nghỉ nhiều là chuyện tháng mười hai, không phải tháng mười.',
      ],
      [
        '導入について、何が決まりましたか。',
        ['十月に導入する', '十二月に導入する', '十一月に導入し、初めに説明会を開く', '説明会のあとで時期を決める'],
        2,
        'Chốt tháng mười một kèm hai buổi hướng dẫn đầu tháng; chị đồng ý (説明会があれば大丈夫). Tháng mười hai chỉ được nhắc như mốc đáng lo.',
      ],
    ],
    points: [
      ['手一杯', 'ていっぱい', 'bận ngập đầu'],
      ['半期', 'はんき', 'nửa năm (tài chính)'],
      ['迎える', 'むかえる', 'đón, bước vào (thời điểm)'],
    ],
  }),
];

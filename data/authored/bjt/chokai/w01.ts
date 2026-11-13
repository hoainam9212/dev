import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/** Week 1 — first contact with the test, basic 尊敬語/謙譲語 and greetings. Level: J2 → J1. */
export const W01: BjtItem[] = [
  item('w01', 'bamen', 1, {
    material: {
      kind: 'scene',
      vi: 'Một phòng họp nhỏ. Một nữ nhân viên đứng cạnh bàn, đang đặt từng tập tài liệu trước mặt ba người đang ngồi. Màn hình chiếu phía sau đang tắt. Trên bàn có một bình nước và mấy chiếc cốc giấy chưa rót.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['女性が出席者に資料を配っています。', '女性が会議の資料をコピーしています。', 'スクリーンに資料を映して説明しています。', '女性が出席者にお茶を入れています。'],
        0,
        'Người phụ nữ đang đặt tài liệu trước từng người: 配る = phát, chia cho mỗi người. Câu 3 sai vì màn hình đang tắt. Câu 4 nhắc tới bình nước có trong ảnh nhưng cốc chưa rót, cô ấy cũng không rót gì.',
      ],
    ],
    points: [
      ['配る', 'くばる', 'phát, chia (cho từng người)'],
      ['出席者', 'しゅっせきしゃ', 'người dự họp'],
    ],
  }),
  item('w01', 'bamen', 2, {
    material: {
      kind: 'scene',
      vi: 'Sảnh thang máy của một văn phòng. Một nhóm hai vị khách vừa bước ra khỏi thang máy. Một nhân viên nam đứng trước họ, cúi chào, tay trái cầm một tập hồ sơ. Một nhân viên nữ đứng bên trong thang máy, dùng tay giữ cho cửa thang máy không đóng lại.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['男性がエレベーターのボタンを押しています。', '女性がエレベーターのドアを押さえています。', '来客が社員におじぎをしています。', '男性が来客に書類を手渡しています。'],
        1,
        'Nhân viên nữ dùng tay giữ cửa: ドアを押さえる. Câu 3 đảo chủ thể: người cúi chào là nhân viên, không phải khách. Câu 4 có đúng đồ vật (tập hồ sơ) nhưng anh ta chỉ cầm, không đưa cho ai.',
      ],
    ],
    points: [
      ['押さえる', 'おさえる', 'giữ, đè cho khỏi động'],
      ['おじぎをする', 'おじぎをする', 'cúi chào'],
      ['手渡す', 'てわたす', 'trao tận tay'],
    ],
  }),
  item('w01', 'hatsugen', 1, {
    script: [
      ['状況', '初めて取引先を訪問しました。受付で、営業部の木村部長と約束があることを伝えます。何と言いますか。', 'Bạn đến thăm đối tác lần đầu. Ở quầy lễ tân, bạn báo là có hẹn với trưởng bộ phận kinh doanh Kimura. Bạn nói gì?'],
    ],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        [
          '田中でございます。木村部長にお会いになりたいのですが。',
          'さくら物産の田中様と申します。木村部長はおられますか。',
          'さくら物産の田中と申します。営業部の木村部長と二時にお約束をいただいているのですが。',
          '営業部の木村さんに会いに参りました。呼んでいただけますか。',
        ],
        2,
        'Tự giới thiệu bằng tên công ty + họ + と申します, rồi nói rõ giờ hẹn bằng お約束をいただいている. Câu 1 dùng tôn kính ngữ お会いになる cho chính mình. Câu 2 tự gọi mình là 田中様. Câu 4 gọi trưởng bộ phận của đối tác là 木村さん và ra yêu cầu trống không.',
      ],
    ],
    points: [
      ['と申します', 'ともうします', 'tên tôi là (khiêm nhường)'],
      ['お約束をいただく', 'おやくそくをいただく', 'được hẹn gặp (khiêm nhường)'],
    ],
  }),
  item('w01', 'hatsugen', 2, {
    script: [
      ['状況', '部長に、自分が作った資料を見てもらいたいと思っています。部長は忙しそうです。何と言いますか。', 'Bạn muốn nhờ trưởng bộ phận xem tài liệu mình làm. Trưởng bộ phận có vẻ đang bận. Bạn nói gì?'],
    ],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        [
          '部長、この資料を拝見してください。',
          '部長、こちらの資料、ご覧になってもいいですよ。',
          '部長、資料をご覧いたしますか。',
          'お忙しいところ恐れ入りますが、こちらの資料にお目通しいただけますでしょうか。',
        ],
        3,
        'Mở bằng lời đệm お忙しいところ恐れ入りますが, rồi nhờ bằng お目通しいただけますでしょうか (xin anh/chị xem qua). Câu 1 dùng khiêm nhường ngữ 拝見 cho hành động của cấp trên. Câu 2 là cho phép cấp trên. Câu 3 trộn ご覧 với いたす thành kính ngữ sai.',
      ],
    ],
    points: [
      ['お目通しいただく', 'おめどおしいただく', 'được (ai đó) xem qua'],
      ['恐れ入りますが', 'おそれいりますが', 'xin lỗi đã làm phiền, nhưng…'],
    ],
  }),
  item('w01', 'hatsugen', 3, {
    script: [
      ['状況', '仕事が終わったので帰ります。課長はまだ席で仕事をしています。課長に何と言いますか。', 'Bạn xong việc và chuẩn bị về. Trưởng phòng vẫn đang làm việc ở bàn. Bạn nói gì với trưởng phòng?'],
    ],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['お先に失礼します。', 'ご苦労様でした。', 'お疲れ様です。お先にどうぞ。', 'では、お先にお帰りになります。'],
        0,
        'Về trước người khác thì nói お先に失礼します. ご苦労様 là lời cấp trên nói với cấp dưới. Câu 3 nghĩa là "mời anh về trước", ngược tình huống. Câu 4 dùng tôn kính ngữ お帰りになる cho chính mình.',
      ],
    ],
    points: [
      ['お先に失礼します', 'おさきにしつれいします', 'tôi xin phép về trước'],
      ['ご苦労様', 'ごくろうさま', 'cảm ơn đã vất vả (chỉ dùng với cấp dưới)'],
    ],
  }),
  item('w01', 'hatsugen', 4, {
    script: [
      ['状況', '取引先の人から「このたびは課長にご昇進されたそうで、おめでとうございます」と言われました。何と言いますか。', 'Người bên đối tác nói: "Nghe nói anh vừa được thăng chức trưởng phòng, xin chúc mừng." Bạn nói gì?'],
    ],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        [
          'はい、私も昇進されてうれしいです。',
          'いえいえ、昇進なんて大したことないですよ。',
          'ありがとうございます。まだまだ至らない点もございますが、今後ともよろしくお願いいたします。',
          'おかげさまで。御社もがんばってください。',
        ],
        2,
        'Nhận lời chúc thì cảm ơn, khiêm tốn (至らない点もございますが = còn nhiều thiếu sót) và xin tiếp tục hợp tác. Câu 1 dùng 昇進される (tôn kính) cho mình. Câu 2 gạt lời chúc đi bằng giọng suồng sã. Câu 4 bắt đầu đúng (おかげさまで) nhưng "quý công ty cũng cố lên" là thất lễ với đối tác.',
      ],
    ],
    points: [
      ['昇進', 'しょうしん', 'thăng chức'],
      ['至らない', 'いたらない', 'còn non kém, thiếu sót'],
      ['今後ともよろしくお願いいたします', 'こんごともよろしくおねがいいたします', 'mong tiếp tục được giúp đỡ'],
    ],
  }),
  item('w01', 'sogo-chokai', 1, {
    script: [
      ['女', 'では、明日の予定をお伝えしますね。九時までに本社一階の受付にお越しください。そこで入館証をお渡しします。', 'Vậy tôi báo lịch ngày mai nhé. Anh đến quầy lễ tân tầng một trụ sở chính trước chín giờ. Ở đó tôi sẽ đưa thẻ ra vào.'],
      ['男', 'はい。そのあと、すぐ研修室に行けばよろしいですか。', 'Vâng. Sau đó tôi đến thẳng phòng đào tạo luôn ạ?'],
      ['女', 'いえ、先に三階の総務部に寄って、パソコンを受け取ってください。研修は十時からなので、それで十分間に合います。', 'Không, anh ghé phòng hành chính tầng ba nhận máy tính trước đã. Đào tạo bắt đầu lúc mười giờ nên vẫn kịp.'],
      ['男', 'わかりました。何か持っていくものはありますか。', 'Tôi hiểu rồi. Có cần mang theo gì không ạ?'],
      ['女', '印鑑と、給与の振込先の口座がわかるものをお願いします。書類を書いていただくので。あ、写真は先週いただいたので、もう結構です。', 'Anh mang con dấu và giấy tờ có số tài khoản nhận lương nhé, vì anh sẽ phải điền hồ sơ. À, ảnh thì tuần trước anh nộp rồi nên không cần nữa.'],
      ['男', '承知しました。よろしくお願いいたします。', 'Vâng, tôi hiểu rồi. Mong chị giúp đỡ.'],
    ],
    questions: [
      [
        '男の人は明日、受付のあと、まず何をしますか。',
        ['研修室に行く', '総務部でパソコンを受け取る', '人事部で書類を書く', '入館証の写真を撮る'],
        1,
        'Anh ấy hỏi có đi thẳng tới phòng đào tạo không thì bị sửa: いえ、先に…パソコンを受け取って. Phòng đào tạo là việc sau. Chuyện ảnh đã xong từ tuần trước, còn điền hồ sơ không được nói là làm ở phòng nhân sự.',
      ],
      [
        '男の人が明日持っていくものはどれですか。',
        ['印鑑と写真', '写真と口座がわかるもの', '印鑑だけ', '印鑑と口座がわかるもの'],
        3,
        'Cần con dấu và giấy tờ có số tài khoản. Ảnh bị loại ở câu cuối: もう結構です = không cần nữa. Lựa chọn có "ảnh" là bẫy vì ảnh có được nhắc tới.',
      ],
    ],
    points: [
      ['お越しください', 'おこしください', 'mời đến (tôn kính)'],
      ['入館証', 'にゅうかんしょう', 'thẻ ra vào toà nhà'],
      ['振込先', 'ふりこみさき', 'tài khoản nhận chuyển khoản'],
      ['結構です', 'けっこうです', 'không cần đâu (từ chối lịch sự)'],
    ],
  }),
  item('w01', 'sogo-chokai', 2, {
    script: [
      ['男', '来月から取引先の担当が変わるので、来週、あいさつ回りに一緒に行きましょう。', 'Từ tháng sau người phụ trách đối tác sẽ đổi, nên tuần sau chúng ta cùng đi chào các nơi nhé.'],
      ['女', 'はい。全部で何社でしょうか。', 'Vâng. Tất cả bao nhiêu công ty ạ?'],
      ['男', '五社なんだけど、山川工業さんは担当の方がしばらく海外出張だそうで、再来週に回します。', 'Năm công ty, nhưng người phụ trách bên Công nghiệp Yamakawa nghe nói đi công tác nước ngoài một thời gian, nên dời sang tuần sau nữa.'],
      ['女', '手土産は用意しておいたほうがいいでしょうか。', 'Tôi có nên chuẩn bị quà mang theo không ạ?'],
      ['男', 'いや、今回はごあいさつだけだから要らないよ。それより、各社とのこれまでの経緯を頭に入れておいてくれる？前任の森さんが資料にまとめてくれてるから。', 'Không, lần này chỉ là chào hỏi nên không cần. Thay vào đó, em nắm trước quá trình làm việc với từng công ty giúp anh nhé. Anh Mori, người phụ trách trước, đã tổng hợp thành tài liệu rồi.'],
      ['女', 'わかりました。森さんに資料をいただいて、目を通しておきます。', 'Vâng. Tôi sẽ xin tài liệu từ anh Mori và đọc trước.'],
    ],
    questions: [
      [
        '山川工業にはいつあいさつに行きますか。',
        ['再来週', '来週', '担当者が戻った翌日', '来月の初め'],
        0,
        'Câu 再来週に回します = dời sang tuần sau nữa. "Tuần sau" là lịch của bốn công ty còn lại. Không ai hẹn "ngày hôm sau khi người phụ trách về", chỉ biết người đó đi công tác một thời gian.',
      ],
      [
        '女の人はこのあとまず何をしますか。',
        ['手土産を買いに行く', '山川工業に電話をする', '森さんから資料をもらう', '各社に訪問の約束を取る'],
        2,
        'Quà bị gạt đi (要らない). Việc được giao là nắm quá trình làm việc, và cô ấy nói sẽ xin tài liệu từ anh Mori. Gọi điện hay hẹn lịch thì không ai nhắc tới.',
      ],
    ],
    points: [
      ['あいさつ回り', 'あいさつまわり', 'đi chào các nơi (khi nhận việc, đầu năm)'],
      ['手土産', 'てみやげ', 'quà mang theo khi đến thăm'],
      ['経緯', 'けいい', 'đầu đuôi, quá trình'],
      ['前任', 'ぜんにん', 'người phụ trách trước'],
    ],
  }),
];

import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/** Week 1 — first contact with the test, basic manners: seating, reception, schedules. Level: J2 → J1. */
export const W01: BjtItem[] = [
  item('w01', 'jokyo', 1, {
    material: {
      kind: 'table',
      title: 'タクシーの座席',
      head: ['', '左', '中央', '右'],
      rows: [
        ['前', '④', '―', '運転席'],
        ['後ろ', '②', '③', '①'],
      ],
      note: '日本の車は右ハンドルです。',
    },
    script: [
      ['女', '課長、このあと取引先の方とタクシーに乗るとき、私はどこに座ればいいでしょうか。', 'Trưởng phòng ơi, lát nữa đi taxi cùng người bên đối tác thì tôi nên ngồi chỗ nào ạ?'],
      ['男', 'お客様がお二人で、うちは私と鈴木さんだね。お客様には後ろの奥から座っていただこう。', 'Khách có hai người, bên mình là tôi với cô Suzuki nhỉ. Mời khách ngồi phía sau, từ chỗ trong cùng ra.'],
      ['女', 'では、私は後ろの真ん中に座りますね。', 'Vậy tôi ngồi ghế giữa phía sau nhé.'],
      ['男', 'いや、真ん中には私が座るよ。鈴木さんは道案内と支払いをお願いしたいから、運転手さんの隣に座ってくれる？', 'Không, ghế giữa để tôi ngồi. Tôi muốn nhờ cô chỉ đường và trả tiền, nên cô ngồi cạnh bác tài nhé.'],
    ],
    questions: [
      [
        '女の人はどこに座りますか。',
        ['①', '②', '③', '④'],
        3,
        'Cạnh tài xế là ghế phụ phía trước bên trái (助手席) = ④, chỗ của người lo chỉ đường, trả tiền. ③ là chỗ cô ấy định ngồi nhưng trưởng phòng lấy. ① và ② (sau lưng tài xế, rồi phía sau bên trái) là chỗ của hai vị khách.',
      ],
    ],
    points: [
      ['上座', 'かみざ', 'ghế dành cho người trên, khách'],
      ['助手席', 'じょしゅせき', 'ghế phụ cạnh tài xế'],
      ['道案内', 'みちあんない', 'chỉ đường'],
    ],
  }),
  item('w01', 'jokyo', 2, {
    material: {
      kind: 'table',
      title: 'フロアのご案内',
      head: ['階', '部署・施設'],
      rows: [
        ['5F', '社員食堂'],
        ['4F', '会議室A〜D'],
        ['3F', '総務部・人事部'],
        ['2F', '営業部'],
        ['1F', '受付・ロビー'],
      ],
    },
    script: [
      ['男', 'すみません、三時に人事部の井上様とお約束をいただいている、東和システムの小林と申します。', 'Xin lỗi, tôi là Kobayashi của Towa System, có hẹn lúc ba giờ với chị Inoue phòng nhân sự.'],
      ['女', '東和システムの小林様でいらっしゃいますね。お待ちしておりました。', 'Anh Kobayashi của Towa System phải không ạ. Chúng tôi đang đợi anh.'],
      ['女', '井上は本日、人事部ではなく会議室Cでお待ちしております。エレベーターを降りて、右手の二つ目のお部屋でございます。', 'Hôm nay chị Inoue không đợi ở phòng nhân sự mà ở phòng họp C. Anh ra khỏi thang máy, phòng thứ hai bên tay phải ạ.'],
    ],
    questions: [
      [
        '男の人はこのあと何階に行きますか。',
        ['2階', '3階', '4階', '5階'],
        2,
        'Chị Inoue thuộc phòng nhân sự (3F) nhưng hôm nay đợi ở phòng họp C, mà phòng họp A–D nằm ở 4F. Ai nghe được "人事部" mà bỏ qua "ではなく" sẽ chọn nhầm 3F.',
      ],
    ],
    points: [
      ['でいらっしゃいますね', 'でいらっしゃいますね', 'là (anh/chị…) phải không ạ (tôn kính)'],
      ['右手', 'みぎて', 'phía tay phải'],
    ],
  }),
  item('w01', 'shiryo', 1, {
    material: {
      kind: 'table',
      title: '新入社員研修 日程（第1週）',
      head: ['曜日', '午前', '午後'],
      rows: [
        ['月', 'ビジネスマナー', 'ビジネスマナー'],
        ['火', '会社概要', '各部の紹介'],
        ['水', '工場見学', '工場見学'],
        ['木', '電話応対', '電話応対'],
        ['金', 'まとめ', 'グループ発表'],
      ],
    },
    script: [
      ['女', '研修日程について、二点変更があります。', 'Về lịch đào tạo, có hai điểm thay đổi.'],
      ['女', 'まず、水曜日の工場見学ですが、工場で設備の点検が入ることになりまして、金曜日と入れ替えます。金曜日の内容は水曜日に行います。', 'Thứ nhất, buổi tham quan nhà máy ngày thứ tư: do nhà máy có lịch kiểm tra thiết bị nên đổi chỗ với thứ sáu. Nội dung của thứ sáu sẽ làm vào thứ tư.'],
      ['女', 'それから、木曜日の電話応対は、講師の都合で午後だけになります。午前中は各自、レポートを書いてください。', 'Ngoài ra, phần ứng đối điện thoại thứ năm chỉ còn buổi chiều do lịch của giảng viên. Buổi sáng mỗi người tự viết báo cáo.'],
    ],
    questions: [
      [
        '金曜日には何をしますか。',
        ['まとめとグループ発表', '工場見学', '電話応対', 'レポートを書く'],
        1,
        '入れ替える = đổi chỗ hai ngày với nhau: tham quan nhà máy sang thứ sáu, phần tổng kết và thuyết trình nhóm về thứ tư. Lựa chọn 1 là đúng theo bảng nhưng bảng đã bị lời nói sửa. Viết báo cáo là sáng thứ năm.',
      ],
    ],
    points: [
      ['入れ替える', 'いれかえる', 'đổi chỗ cho nhau'],
      ['点検', 'てんけん', 'kiểm tra (thiết bị)'],
      ['講師の都合', 'こうしのつごう', 'lý do từ phía giảng viên'],
    ],
  }),
  item('w01', 'shiryo', 2, {
    material: {
      kind: 'bars',
      title: '入社前に不安だったこと（新入社員アンケート・複数回答）',
      unit: '%',
      labels: ['電話応対', '敬語', '人間関係', 'パソコン操作'],
      series: [{ name: '回答の割合', values: [38, 45, 30, 12] }],
    },
    script: [
      ['男', '今年の新入社員アンケートの結果です。最も多かったのは敬語でしたが、これは研修のカリキュラムで十分に扱います。', 'Đây là kết quả khảo sát nhân viên mới năm nay. Nhiều nhất là kính ngữ, nhưng phần này đã được dạy kỹ trong chương trình đào tạo.'],
      ['男', 'そこで今年は、二番目に多かった項目について、先輩社員による個別の練習会を設けることにしました。', 'Vì vậy năm nay, với mục nhiều thứ hai, chúng tôi sẽ mở buổi luyện tập riêng do nhân viên đi trước hướng dẫn.'],
    ],
    questions: [
      [
        '練習会で扱うのはどれですか。',
        ['電話応対', '敬語', '人間関係', 'パソコン操作'],
        0,
        'Mục nhiều thứ hai trên biểu đồ là điện thoại (38%), sau kính ngữ (45%). Kính ngữ đứng đầu nhưng đã có trong chương trình đào tạo nên không đưa vào buổi luyện tập. Lưu ý biểu đồ không xếp theo thứ tự lớn nhỏ.',
      ],
    ],
    points: [
      ['複数回答', 'ふくすうかいとう', 'được chọn nhiều đáp án'],
      ['項目', 'こうもく', 'mục, hạng mục'],
      ['設ける', 'もうける', 'lập ra, tổ chức'],
    ],
  }),
  item('w01', 'shiryo', 3, {
    material: {
      kind: 'table',
      title: '本日の来客予定',
      head: ['時間', 'お名前', '会社名', '担当'],
      rows: [
        ['10:00', '中野様', '東和商事', '営業1課'],
        ['13:30', '小松様', 'みどり銀行', '経理部'],
        ['14:30', '石田様', '北斗運輸', '総務部'],
        ['16:30', '原様', '東和商事', '営業1課'],
      ],
    },
    script: [
      ['女', '今日の来客予定で、変更が二つあります。', 'Lịch khách hôm nay có hai thay đổi.'],
      ['女', 'みどり銀行の小松様から、前の打ち合わせが延びて、一時間半ほど遅れるとご連絡がありました。', 'Anh Komatsu bên Ngân hàng Midori báo là cuộc họp trước bị kéo dài nên sẽ đến muộn khoảng một tiếng rưỡi.'],
      ['女', 'それから、東和商事の原様は、午前の中野様とご一緒にいらっしゃることになったので、夕方のお約束はなくなりました。', 'Ngoài ra, anh Hara bên Thương mại Towa sẽ đi cùng anh Nakano buổi sáng, nên cuộc hẹn buổi chiều tối bị huỷ.'],
    ],
    questions: [
      [
        '午後、最初に受付に来るのは誰ですか。',
        ['小松様', '原様', '石田様', '中野様'],
        2,
        'Komatsu muộn khoảng một tiếng rưỡi, tức là gần 15:00, nên Ishida (14:30) thành người đến đầu tiên buổi chiều. Ai chỉ nhìn bảng sẽ chọn Komatsu. Hara không đến buổi chiều nữa vì đi cùng Nakano, mà Nakano là khách buổi sáng.',
      ],
    ],
    points: [
      ['延びる', 'のびる', 'bị kéo dài'],
      ['ご一緒に', 'ごいっしょに', 'cùng với (lịch sự)'],
    ],
  }),
  item('w01', 'sogo-chodokkai', 1, {
    material: {
      kind: 'text',
      title: '新入社員歓迎会のお知らせ',
      body: '件名：新入社員歓迎会のお知らせ\n\n営業部の皆様\n\n下記のとおり、新入社員の歓迎会を行います。\n\n日時：4月18日（金）18:30〜20:30\n場所：レストラン「さくら亭」（本社より徒歩5分）\n会費：4,000円（新入社員は無料）\n\n出欠は4月11日（金）までに、本メールへの返信で幹事の山本までお知らせください。\n二次会については、当日ご案内します。',
    },
    script: [
      ['女', '歓迎会のメール、見ました？', 'Anh xem email tiệc chào mừng chưa?'],
      ['男', 'ええ。でも十八日は大阪に出張なんですよ。最終の新幹線で戻るので、二次会からなら出られるかもしれません。', 'Rồi. Nhưng ngày mười tám tôi đi công tác Osaka. Tôi về bằng chuyến Shinkansen cuối, nên có khi chỉ dự được từ tăng hai.'],
      ['女', '二次会は会費じゃなくて、その場で各自払うらしいですよ。場所もまだ決まってないって。', 'Nghe nói tăng hai không thu hội phí, mỗi người tự trả tại chỗ. Địa điểm cũng chưa quyết.'],
      ['男', 'じゃあ、一次会は欠席で返事をしておきます。二次会のことは、山本さんに直接聞いてみます。', 'Vậy tôi cứ trả lời vắng mặt tăng một. Chuyện tăng hai thì tôi hỏi thẳng anh Yamamoto.'],
    ],
    questions: [
      [
        '男の人は歓迎会の出欠をどう知らせますか。',
        ['出席するとメールに返信する', '欠席するとメールに返信する', '当日、山本さんに電話する', '大阪から戻ってから返事をする'],
        1,
        'Anh ấy nói 一次会は欠席で返事をしておきます, và thông báo yêu cầu trả lời bằng cách reply email. Chuyện hỏi trực tiếp anh Yamamoto là về tăng hai, không phải việc báo có mặt hay không.',
      ],
      [
        '男の人が山本さんに聞くことは何ですか。',
        ['歓迎会の会費', 'さくら亭の場所', '新入社員の人数', '二次会の予定'],
        3,
        'Tăng hai chưa có địa điểm và thông báo ghi "sẽ báo vào hôm đó", nên anh ấy hỏi trực tiếp về tăng hai. Hội phí và địa điểm tăng một đã ghi rõ trong email.',
      ],
    ],
    points: [
      ['歓迎会', 'かんげいかい', 'tiệc chào mừng'],
      ['幹事', 'かんじ', 'người tổ chức (tiệc, sự kiện)'],
      ['出欠', 'しゅっけつ', 'có mặt hay vắng mặt'],
      ['二次会', 'にじかい', 'tăng hai'],
    ],
  }),
  item('w01', 'sogo-chodokkai', 2, {
    material: {
      kind: 'text',
      title: '名刺交換の基本（新人研修資料より）',
      body: '1. 名刺は目下の者から先に差し出す。訪問した側から先に出すのが一般的である。\n2. 相手が読める向きにして、両手で渡す。\n3. 受け取った名刺は、商談中は机の上、名刺入れの上に置く。\n4. 相手が複数の場合は、座っている順に並べて置く。\n5. 名刺にメモを書き込むときは、相手の前では行わない。',
    },
    script: [
      ['男', '明日の訪問、名刺交換は大丈夫？', 'Buổi đến thăm ngày mai, phần trao danh thiếp ổn chứ?'],
      ['女', 'はい、研修の資料で復習しました。こちらが訪問する側なので、私たちから先に出すんですよね。', 'Vâng, tôi đã ôn lại trong tài liệu đào tạo. Bên mình là bên đến thăm nên mình đưa trước, đúng không ạ?'],
      ['男', 'そう。それと、資料には書いてないけど、うちの課長より先に出しちゃだめだよ。課長、僕、林さんの順番ね。', 'Đúng. Còn nữa, tài liệu không ghi, nhưng không được đưa trước trưởng phòng mình đâu. Thứ tự là trưởng phòng, anh, rồi đến em.'],
      ['女', 'わかりました。先方は三名いらっしゃるんですよね。いただいた名刺は名刺入れの上に重ねておけばいいですか。', 'Vâng. Bên kia có ba người phải không ạ. Danh thiếp nhận được thì em xếp chồng lên hộp danh thiếp là được ạ?'],
      ['男', '一枚は名刺入れの上で、残りは座っている順に机に並べて。顔と名前が一致するようにね。', 'Một tấm đặt trên hộp, còn lại xếp lên bàn theo thứ tự chỗ ngồi. Để nhớ được mặt với tên.'],
    ],
    questions: [
      [
        '女の人は明日、名刺をいつ出しますか。',
        ['課長と男の人が出したあと', '先方が出したあと', '課長より先', '商談が終わったあと'],
        0,
        'Bên đến thăm đưa trước, nhưng trong nội bộ phải theo thứ tự trưởng phòng → anh → Hayashi (người phụ nữ). Đây là điều người anh nói thêm, tài liệu không ghi. "Sau khi bên kia đưa" trái với quy tắc số 1.',
      ],
      [
        '受け取った名刺について、正しいのはどれですか。',
        ['すぐに名刺入れにしまう', '三枚を重ねて名刺入れの上に置く', '相手の前で名前の読み方をメモする', '一枚を名刺入れの上に置き、残りは座っている順に並べる'],
        3,
        'Người anh sửa ý định xếp chồng ba tấm: một tấm trên hộp danh thiếp, còn lại xếp theo chỗ ngồi. Cất ngay thì trái quy tắc 3, ghi chú trước mặt khách thì trái quy tắc 5.',
      ],
    ],
    points: [
      ['目下', 'めした', 'người dưới (vị trí, tuổi)'],
      ['先方', 'せんぽう', 'phía bên kia, đối phương'],
      ['名刺入れ', 'めいしいれ', 'hộp đựng danh thiếp'],
    ],
  }),
];

import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/** Week 3 — email and business correspondence. Level: J2 → J1. */
export const W03: BjtItem[] = [
  item('w03', 'jokyo', 1, {
    material: {
      kind: 'table',
      title: '受信トレイ',
      head: ['', '差出人', '件名', '受信'],
      rows: [
        ['①', '北斗運輸 石田様', '来週の配送日程について', '9:05'],
        ['②', '人事部', '健康診断のお知らせ', '9:20'],
        ['③', 'みどり銀行 小松様', '【至急】ご契約書類の不備について', '9:42'],
        ['④', '営業部 木下課長', '会議資料の確認', '10:10'],
      ],
    },
    script: [
      ['女', '朝からメールがたまっちゃって。どれから返事しようかな。', 'Từ sáng email dồn lại nhiều quá. Trả lời cái nào trước đây.'],
      ['男', '「至急」って書いてあるのがあるじゃない。', 'Có cái ghi "khẩn" kìa.'],
      ['女', 'ああ、それは小松様ともう電話で話したから、大丈夫なの。', 'À, cái đó tôi đã nói chuyện qua điện thoại với anh Komatsu rồi, không sao.'],
      ['男', 'じゃあ、課長のは？会議の資料でしょう。', 'Thế của trưởng phòng thì sao? Tài liệu họp mà.'],
      ['女', '課長のは明日の会議の分だから、夕方までに見ればいいって。それより、配送の件は今日の三時までに返事しないと、来週のトラックが押さえられないの。', 'Cái của trưởng phòng là cho cuộc họp ngày mai, xem trước chiều tối là được. Quan trọng hơn là vụ vận chuyển: không trả lời trước ba giờ hôm nay thì không giữ được xe tải tuần sau.'],
    ],
    questions: [
      [
        '女の人が最初に返事をするメールはどれですか。',
        ['③', '④', '①', '②'],
        2,
        'Thư "khẩn" ③ đã xử lý qua điện thoại. Thư ④ là tài liệu cho cuộc họp ngày mai, chỉ cần xem trước chiều tối. Còn thư ① về lịch vận chuyển là thư phải trả lời trước, vì có hạn ba giờ và liên quan tới việc giữ xe. Thư ② không ai nhắc tới.',
      ],
    ],
    points: [
      ['至急', 'しきゅう', 'khẩn cấp'],
      ['不備', 'ふび', 'thiếu sót (hồ sơ, giấy tờ)'],
      ['たまる', 'たまる', 'dồn lại, ứ đọng'],
    ],
  }),
  item('w03', 'jokyo', 2, {
    material: {
      kind: 'table',
      title: 'メールの宛先',
      head: ['', 'To', 'CC'],
      rows: [
        ['A', '東和商事 中野様', '東和商事 原様'],
        ['B', '東和商事 中野様', '木下課長'],
        ['C', '東和商事 原様', '東和商事 中野様、木下課長'],
        ['D', '東和商事 中野様', '東和商事 原様、木下課長'],
      ],
    },
    script: [
      ['男', 'このメール、宛先はどうすればいいでしょうか。', 'Email này thì người nhận ghi thế nào ạ?'],
      ['女', 'ご担当は中野様だから、Toは中野様ね。原様にも見ていただいたほうがいいから、CCに入れて。', 'Người phụ trách là anh Nakano nên To là anh Nakano. Nên để anh Hara cũng xem, cho vào CC.'],
      ['男', '木下課長はどうしますか。', 'Còn trưởng phòng Kinoshita thì sao ạ?'],
      ['女', '課長にも共有しておいて。CCでいいわ。', 'Chia sẻ cho trưởng phòng luôn. Để CC là được.'],
    ],
    questions: [
      [
        'どの宛先でメールを送りますか。',
        ['A', 'B', 'C', 'D'],
        3,
        'To là anh Nakano; CC gồm anh Hara và trưởng phòng Kinoshita = D. A thiếu trưởng phòng, B thiếu anh Hara, C đảo người nhận chính với CC.',
      ],
    ],
    points: [
      ['宛先', 'あてさき', 'người nhận, địa chỉ nhận'],
      ['共有する', 'きょうゆうする', 'chia sẻ'],
    ],
  }),
  item('w03', 'shiryo', 1, {
    material: {
      kind: 'bars',
      title: '社外メールへの平均返信時間（部署別）',
      unit: '時間',
      labels: ['営業部', '経理部', '総務部', '開発部'],
      series: [
        { name: '先月', values: [4.0, 5.0, 2.5, 9.0] },
        { name: '今月', values: [3.5, 6.0, 2.0, 8.5] },
      ],
    },
    script: [
      ['男', '社外からのメールには、原則として四時間以内に返信することになっています。', 'Theo nguyên tắc, email từ bên ngoài phải được trả lời trong vòng bốn tiếng.'],
      ['男', '今月この基準を超えた部署のうち、先月より悪くなった部署には、改善策を出してもらいます。', 'Trong các phòng vượt quá chuẩn đó tháng này, phòng nào tệ hơn tháng trước sẽ phải nộp phương án cải thiện.'],
    ],
    questions: [
      [
        '改善策を出すのはどの部署ですか。',
        ['経理部', '開発部', '営業部', '総務部'],
        0,
        'Tháng này vượt bốn tiếng có kế toán (6.0) và phát triển (8.5). Phát triển chậm nhất nhưng đã khá hơn tháng trước (9.0 → 8.5). Kế toán tệ đi (5.0 → 6.0), nên là kế toán. Kinh doanh tháng trước chạm đúng 4.0 nhưng tháng này đã dưới chuẩn.',
      ],
    ],
    points: [
      ['原則として', 'げんそくとして', 'theo nguyên tắc'],
      ['基準', 'きじゅん', 'tiêu chuẩn, mức chuẩn'],
      ['改善策', 'かいぜんさく', 'biện pháp cải thiện'],
    ],
  }),
  item('w03', 'shiryo', 2, {
    material: {
      kind: 'text',
      title: '【日程変更】定例会議について',
      body: '件名：【日程変更】定例会議について\n\n各位\n\n来週の定例会議は、下記のとおり変更します。\n\n日時：6月10日（水）14:00〜15:00\n場所：第2会議室\n議題：上半期の販売計画\n\n営業企画課 吉田',
    },
    script: [
      ['男', '先ほどお送りした定例会議のメールですが、一点誤りがありました。', 'Email về cuộc họp định kỳ tôi vừa gửi có một chỗ sai.'],
      ['男', '日時は合っているのですが、第2会議室はその時間ほかの予約が入っていましたので、第3会議室に変更します。後ほど訂正のメールをお送りします。', 'Ngày giờ thì đúng, nhưng phòng họp số 2 giờ đó đã có người đặt nên đổi sang phòng họp số 3. Lát nữa tôi sẽ gửi email đính chính.'],
    ],
    questions: [
      [
        '定例会議はどこで行いますか。',
        ['第1会議室', '第3会議室', '第2会議室', '大会議室'],
        1,
        'Email ghi phòng số 2, nhưng lời nói sửa lại: 第3会議室に変更します. Phần ngày giờ thì giữ nguyên (日時は合っている). Ai chỉ đọc email sẽ chọn phòng số 2.',
      ],
    ],
    points: [
      ['定例会議', 'ていれいかいぎ', 'cuộc họp định kỳ'],
      ['各位', 'かくい', 'kính gửi mọi người (trong văn bản)'],
      ['後ほど', 'のちほど', 'lát nữa, sau đây'],
    ],
  }),
  item('w03', 'shiryo', 3, {
    material: {
      kind: 'table',
      title: '郵送方法の比較（A4封筒・50gまで）',
      head: ['方法', '到着', '料金', '追跡'],
      rows: [
        ['普通郵便', '2〜3日', '110円', 'なし'],
        ['速達', '翌日', '370円', 'なし'],
        ['簡易書留', '2〜3日', '460円', 'あり'],
        ['宅配便', '翌日', '800円', 'あり'],
      ],
    },
    script: [
      ['女', '契約書の原本を送るので、届いたかどうかがわかる方法にしてください。', 'Vì gửi bản gốc hợp đồng nên chọn cách nào biết được đã tới nơi hay chưa.'],
      ['女', '先方は、月末までに届けば大丈夫だそうです。今日は二十日なので、急ぐ必要はありません。なるべく安いほうでお願いします。', 'Bên kia nói tới trước cuối tháng là được. Hôm nay mới ngày hai mươi nên không cần gấp. Nhờ chọn cách rẻ nhất có thể.'],
    ],
    questions: [
      [
        'どの方法で送りますか。',
        ['普通郵便', '速達', '簡易書留', '宅配便'],
        2,
        'Điều kiện: theo dõi được (追跡あり) và rẻ. Chỉ 簡易書留 và 宅配便 theo dõi được; không cần tới ngay hôm sau nên chọn 簡易書留 (460 yên). Thư thường rẻ nhất nhưng không theo dõi được.',
      ],
    ],
    points: [
      ['原本', 'げんぽん', 'bản gốc'],
      ['追跡', 'ついせき', 'theo dõi (bưu kiện)'],
      ['書留', 'かきとめ', 'thư bảo đảm'],
    ],
  }),
  item('w03', 'sogo-chodokkai', 1, {
    material: {
      kind: 'text',
      title: '打ち合わせ日程のご相談',
      body: '件名：打ち合わせ日程のご相談\n\nひかり工業株式会社 営業部 森様\n\nいつも大変お世話になっております。あおば産業の松田です。\n新製品の件で、一度お打ち合わせのお時間をいただけますと幸いです。\n下記の日程でご都合はいかがでしょうか。\n\n① 6月15日（月）10:00〜11:00\n② 6月16日（火）15:00〜16:00\n③ 6月18日（木）13:00〜14:00\n\nご都合のよい日時をお知らせいただけますと幸いです。\n何卒よろしくお願いいたします。',
    },
    script: [
      ['男', '松田さんから打ち合わせの候補日が来てるんだけど、林さんも出られるよね。', 'Anh Matsuda gửi mấy ngày có thể họp, chị Hayashi cũng dự được chứ?'],
      ['女', '十五日の午前は別のお客様のところに伺うので…。十六日と十八日なら大丈夫です。', 'Sáng ngày mười lăm tôi phải đến chỗ một khách khác… Ngày mười sáu và mười tám thì được ạ.'],
      ['男', '十六日は僕が夕方から出張なんだ。三時からだと、終わってすぐ出ても新幹線に間に合うか微妙だな。', 'Ngày mười sáu tôi đi công tác từ chiều tối. Họp từ ba giờ thì xong là đi ngay cũng chưa chắc kịp Shinkansen.'],
      ['女', 'では、十八日でお返事しましょうか。', 'Vậy tôi trả lời là ngày mười tám nhé?'],
      ['男', 'うん。それと、新製品の説明に動画を使いたいから、会議室にモニターがあるかどうか、返信のときに伺っておいてくれる？', 'Ừ. Với lại, tôi muốn dùng video để giới thiệu sản phẩm mới, nên khi trả lời chị hỏi giúp xem phòng họp có màn hình không nhé.'],
    ],
    questions: [
      [
        '打ち合わせはいつになりますか。',
        ['6月18日（木）13:00から', '6月15日（月）10:00から', '6月16日（火）15:00から', '6月16日（火）の夕方'],
        0,
        'Ngày 15 người phụ nữ bận, ngày 16 anh Mori đi công tác từ chiều tối nên họp lúc ba giờ là sát. Còn lại phương án ③: ngày 18, từ 13:00. "Chiều tối ngày 16" là lúc anh ấy lên đường, không phải giờ họp.',
      ],
      [
        '女の人が返信で聞くことは何ですか。',
        ['新製品のサンプルの数', '新幹線の時間', '打ち合わせの参加人数', '会議室にモニターがあるか'],
        3,
        'Anh Mori nhờ: 会議室にモニターがあるかどうか…伺っておいてくれる？ vì muốn chiếu video. Shinkansen là chuyện của anh ấy, không cần hỏi đối tác.',
      ],
    ],
    points: [
      ['候補日', 'こうほび', 'ngày dự kiến (để chọn)'],
      ['幸いです', 'さいわいです', 'rất mong, rất vui nếu (trong thư)'],
      ['微妙', 'びみょう', 'khó nói, không chắc'],
    ],
  }),
  item('w03', 'sogo-chodokkai', 2, {
    material: {
      kind: 'text',
      title: '社外メールの基本',
      body: '社外メールの基本\n\n1. 件名は、内容がひと目でわかるように書く。\n2. 本文の最初に、相手の会社名・部署名・氏名を書く。\n3. 一通のメールには、原則として一つの用件だけを書く。\n4. 一行は30字程度で改行し、読みやすくする。\n5. 返信が必要な場合は、期限をはっきり書く。',
    },
    script: [
      ['女', '高田さん、送る前に見せてくれてありがとう。', 'Anh Takada, cảm ơn đã cho tôi xem trước khi gửi.'],
      ['男', 'どうでしょうか。', 'Chị thấy thế nào ạ?'],
      ['女', '見積もりのお願いと、来月の展示会のご案内が一緒になってるよね。これは分けたほうがいいわ。', 'Nhờ báo giá với giới thiệu triển lãm tháng sau đang chung một email. Nên tách ra.'],
      ['男', 'あ、はい。', 'À, vâng.'],
      ['女', 'あと、見積もりはいつまでにほしいの？', 'Còn nữa, anh cần báo giá trước ngày nào?'],
      ['男', '来週の水曜日までにいただけると助かります。', 'Nếu có trước thứ tư tuần sau thì tốt quá ạ.'],
      ['女', 'じゃあ、それをちゃんと書いておいて。それ以外はよく書けてるわよ。', 'Vậy ghi rõ cái đó vào. Ngoài ra thì viết tốt lắm.'],
    ],
    questions: [
      [
        '女の人が指摘したのは、どの項目に関することですか。',
        ['1番と2番', '2番と4番', '3番と5番', '1番と5番'],
        2,
        'Hai việc trong một email trái mục 3 (một email một việc). Không ghi hạn báo giá trái mục 5. Tiêu đề, tên người nhận, cách xuống dòng không bị nhắc tới; chị còn nói phần còn lại viết tốt.',
      ],
      [
        '男の人はこのあとどうしますか。',
        ['見積もりと展示会のメールを一通にまとめる', 'メールを二通に分けて、見積もりの期限を書く', '展示会の案内だけを送る', '来週の水曜日に見積もりを送る'],
        1,
        'Phải tách thành hai email và ghi hạn báo giá. Lựa chọn 1 ngược lại. Thứ tư tuần sau là hạn mà đối tác gửi báo giá, không phải ngày anh ấy gửi gì.',
      ],
    ],
    points: [
      ['用件', 'ようけん', 'việc cần nói, nội dung công việc'],
      ['展示会', 'てんじかい', 'triển lãm'],
      ['期限', 'きげん', 'hạn chót'],
    ],
  }),
];

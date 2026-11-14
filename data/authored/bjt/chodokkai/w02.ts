import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/** Week 2 — telephone and receiving visitors. Level: J2 → J1. */
export const W02: BjtItem[] = [
  item('w02', 'jokyo', 1, {
    material: {
      kind: 'scene',
      vi: 'Bàn làm việc trong văn phòng. Một nhân viên cầm ống nghe điện thoại, lấy tay che micro, quay sang hỏi đồng nghiệp ngồi bên cạnh; trên màn hình máy tính là một bảng tính có nhiều cột số tiền.',
    },
    script: [
      ['男', 'あのう、北村さん、今、大島商会さんからなんですが、先月末で締めた分の金額が、注文書の合計と合わないとおっしゃってて。', 'Chị Kitamura ơi, bên Oshima Shokai đang gọi, họ nói số tiền của phần chốt cuối tháng trước không khớp với tổng trên đơn đặt hàng.'],
      ['女', 'え、どのくらい違うって？', 'Hả, chênh bao nhiêu?'],
      ['男', '二万円ほど多いそうです。先月納品した部品のうち一箱は返品したはずだから、その分が引かれていないんじゃないかと。', 'Họ nói nhiều hơn khoảng hai vạn yên. Trong số linh kiện giao tháng trước có một thùng đã trả lại, nên có lẽ phần đó chưa được trừ.'],
      ['女', 'ああ、返品の処理が月をまたいじゃったのかもね。訂正したものをすぐにお送りしますって伝えて。お支払いの期日には必ず間に合わせますって。', 'À, chắc việc xử lý hàng trả lại bị lấn sang tháng sau rồi. Anh báo họ là mình sẽ gửi ngay bản đã sửa. Và nói chắc chắn sẽ kịp trước hạn thanh toán.'],
    ],
    questions: [
      [
        '二人は何について話していますか。',
        ['大島商会さんへの見積書の件', '大島商会さんへの請求書の件', '大島商会さんへの納品書の件', '大島商会さんへの発注書の件'],
        1,
        'Số tiền "chốt cuối tháng" (締めた分) bị dư vì chưa trừ hàng trả lại, sẽ gửi bản sửa trước "hạn thanh toán": đó là hóa đơn, dù chữ 請求書 không xuất hiện. Lựa chọn 3 là bẫy vì có chữ 納品 trong băng, nhưng việc giao hàng chỉ là bối cảnh; phiếu giao hàng không gắn với hạn thanh toán. Đơn đặt hàng là do phía khách gửi.',
      ],
    ],
    points: [
      ['締める', 'しめる', 'chốt sổ (cuối kỳ)'],
      ['月をまたぐ', 'つきをまたぐ', 'lấn sang tháng sau'],
      ['支払いの期日', 'しはらいのきじつ', 'hạn thanh toán'],
    ],
  }),
  item('w02', 'jokyo', 2, {
    material: {
      kind: 'scene',
      vi: 'Phòng chờ cạnh quầy lễ tân. Trên bàn thấp có một túi giấy in tên một tiệm bánh; hai nhân viên đứng cạnh bàn, một người đang đọc tờ giấy nhỏ dán trên túi.',
    },
    script: [
      ['女', 'これ、さっきの東邦電機の方が、お帰りの際に置いていかれたんです。「皆さんでどうぞ」っておっしゃって。', 'Cái này là của vị bên Toho Denki lúc nãy để lại khi ra về. Vị ấy nói "mời mọi người dùng".'],
      ['男', 'そう。じゃあ、課長にも一言伝えておいて。お礼状を出すかどうかは、課長が決めると思うから。', 'Vậy à. Thế thì em báo trưởng phòng một tiếng nhé. Có gửi thư cảm ơn hay không chắc trưởng phòng sẽ quyết.'],
      ['女', 'はい。それと、ここに「本日中にお召し上がりください」って書いてあります。', 'Vâng. Còn nữa, ở đây có ghi "xin dùng trong ngày hôm nay".'],
      ['男', 'じゃあ、三時の休憩のときに配ろうか。それまで冷蔵庫に入れておいて。人数分あるか、先に数えておいてくれる？', 'Vậy giờ nghỉ ba giờ mình chia nhé. Đến lúc đó cứ cho vào tủ lạnh. Em đếm trước xem có đủ cho mọi người không nhé?'],
    ],
    questions: [
      [
        '二人は何について話していますか。',
        ['東邦電機の方からのご伝言', '東邦電機の方からのご注文', '東邦電機の方からのお礼状', '東邦電機の方からの手土産'],
        3,
        'Khách để lại "mời mọi người dùng", phải dùng trong ngày, cất tủ lạnh rồi chia lúc nghỉ ba giờ: đó là quà mang theo khi đến thăm (手土産), dù chữ này không xuất hiện. Lựa chọn 3 là bẫy vì có chữ お礼状, nhưng thư cảm ơn là thứ bên mình có thể sẽ gửi, không phải thứ khách mang đến.',
      ],
    ],
    points: [
      ['手土産', 'てみやげ', 'quà mang theo khi đến thăm'],
      ['お礼状', 'おれいじょう', 'thư cảm ơn'],
      ['お召し上がりください', 'おめしあがりください', 'xin mời dùng (tôn kính)'],
    ],
  }),
  item('w02', 'shiryo', 1, {
    material: {
      kind: 'table',
      title: '内線番号表',
      head: ['部署', '内線'],
      rows: [
        ['営業1課', '201'],
        ['営業2課', '202'],
        ['経理部', '301'],
        ['総務部', '302'],
        ['お客様相談室', '400'],
      ],
    },
    script: [
      ['女', '外線を受けたら、用件によってこの表の番号に回してね。', 'Nhận cuộc gọi từ ngoài thì tuỳ việc mà chuyển máy theo số trong bảng này nhé.'],
      ['女', 'お客様から商品の不具合についての電話があったら、本当はお客様相談室なんだけど、今週は相談室が引っ越し中で、総務部が代わりに受けてくれているの。', 'Khách gọi báo sản phẩm bị lỗi thì đúng ra là phòng tư vấn khách hàng, nhưng tuần này phòng đó đang chuyển chỗ nên phòng hành chính nhận thay.'],
      ['女', '請求書のことなら、いつもどおり経理部ね。', 'Còn chuyện hoá đơn thì vẫn là phòng kế toán như mọi khi.'],
    ],
    questions: [
      [
        '今週、商品の不具合についての電話を受けたら、何番に回しますか。',
        ['400', '201', '301', '302'],
        3,
        'Bình thường là 400 (phòng tư vấn khách hàng), nhưng tuần này phòng hành chính (総務部) nhận thay, nên chuyển 302. 301 là kế toán, chỉ dành cho chuyện hoá đơn.',
      ],
    ],
    points: [
      ['内線', 'ないせん', 'máy lẻ nội bộ'],
      ['外線', 'がいせん', 'cuộc gọi từ bên ngoài'],
      ['回す', 'まわす', 'chuyển (cuộc gọi, việc) sang'],
      ['不具合', 'ふぐあい', 'lỗi, trục trặc'],
    ],
  }),
  item('w02', 'shiryo', 2, {
    material: {
      kind: 'bars',
      title: 'お問い合わせ件数',
      unit: '件',
      labels: ['4月', '5月', '6月', '7月'],
      series: [
        { name: '電話', values: [320, 290, 250, 210] },
        { name: 'メール', values: [150, 180, 240, 260] },
      ],
    },
    script: [
      ['男', 'お問い合わせの件数です。電話は減り続けていますが、メールは増えています。', 'Đây là số lượt khách liên hệ. Điện thoại giảm liên tục, còn email thì tăng.'],
      ['男', 'メールが電話を上回ったのは七月が初めてですが、メール担当を一人増やしたのはそれより前です。電話とメールを合わせた件数が、初めて前の月を上回った月からです。', 'Email vượt điện thoại lần đầu là vào tháng bảy, nhưng việc tăng thêm một người phụ trách email thì sớm hơn: từ tháng mà tổng số điện thoại và email lần đầu vượt tháng trước.'],
    ],
    questions: [
      [
        'メール担当を増やしたのは何月からですか。',
        ['4月', '5月', '6月', '7月'],
        2,
        'Tổng hai kênh: tháng 4 là 470, tháng 5 là 470 (bằng, không vượt), tháng 6 là 490 (vượt lần đầu), tháng 7 là 470. Vậy là tháng 6. Tháng 7 là bẫy: đó là lúc email vượt điện thoại.',
      ],
    ],
    points: [
      ['問い合わせ', 'といあわせ', 'liên hệ hỏi thông tin'],
      ['上回る', 'うわまわる', 'vượt, cao hơn'],
      ['合わせる', 'あわせる', 'cộng lại, gộp'],
    ],
  }),
  item('w02', 'shiryo', 3, {
    material: {
      kind: 'table',
      title: '駐車場の区画',
      head: ['区画', '利用'],
      rows: [
        ['A', '役員用'],
        ['B', '来客用（予約制）'],
        ['C', '社員用'],
        ['D', '業者搬入用'],
      ],
    },
    script: [
      ['男', '明日いらっしゃる取引先の方、車で来られるそうなんですが、どこに停めていただけばいいでしょうか。', 'Người bên đối tác đến ngày mai nghe nói sẽ đi ô tô. Nên mời họ đỗ xe ở đâu ạ?'],
      ['女', '来客用はBなんだけど、明日は舗装工事でBが使えないのよ。', 'Chỗ cho khách là khu B, nhưng mai khu B làm lại mặt đường nên không dùng được.'],
      ['女', '役員用のほうを一台分空けてもらうよう、総務にお願いしてあるから、そこにご案内して。', 'Tôi đã nhờ phòng hành chính để trống một chỗ ở khu dành cho ban giám đốc, anh hướng dẫn khách vào đó nhé.'],
    ],
    questions: [
      [
        '取引先の人の車はどこに停めますか。',
        ['A', 'B', 'C', 'D'],
        0,
        'Khu B dành cho khách nhưng mai có công trình. Chỗ được để trống là khu dành cho ban giám đốc (役員用) = A. C là của nhân viên, D cho xe giao hàng.',
      ],
    ],
    points: [
      ['役員', 'やくいん', 'ban giám đốc, cán bộ quản lý cấp cao'],
      ['搬入', 'はんにゅう', 'chuyển hàng vào'],
      ['空ける', 'あける', 'để trống'],
    ],
  }),
  item('w02', 'sogo-chodokkai', 1, {
    material: {
      kind: 'text',
      title: '伝言メモ',
      body: '【1】佐藤課長へ\n【2】三和フーズの田口様より（2026年11月16日・月　10:20）\n【3】用件：新商品の打ち合わせを、18日（水）から19日（木）に変更したい\n【4】折り返しお電話をください（午後は外出、17時以降なら可）\n受けた人：林',
    },
    script: [
      ['女', '林さん、このメモ、私宛てになってるけど、三和フーズさんから？', 'Hayashi, tờ ghi chú này ghi gửi tôi, là của bên Sanwa Foods à?'],
      ['男', 'はい、十時過ぎに田口様からお電話がありまして。打ち合わせの日を、ええと、十八日を…いや、すみません、十九日に変更したいということでした。メモのとおりです。', 'Vâng, hơn mười giờ anh Taguchi gọi điện. Anh ấy muốn đổi ngày họp, ờ, ngày mười tám sang… à không, xin lỗi, sang ngày mười chín. Đúng như trong ghi chú ạ.'],
      ['女', '新商品の打ち合わせ？私、三和フーズさんの新商品は担当してないんだけど。', 'Họp về sản phẩm mới? Tôi đâu có phụ trách sản phẩm mới của Sanwa Foods.'],
      ['男', 'え。田口様は「佐藤さんをお願いします」とだけおっしゃったので、てっきり課長かと…。', 'Ơ. Anh Taguchi chỉ nói "cho tôi gặp anh/chị Sato", nên tôi cứ đinh ninh là trưởng phòng…'],
      ['女', '三和フーズさんの新商品なら、二課の佐藤さんよ。佐藤さん、今週は名古屋に出張だから、携帯に連絡したほうがいいわね。', 'Sản phẩm mới của Sanwa Foods thì là Sato bên phòng hai. Tuần này Sato đi công tác Nagoya, nên liên lạc qua di động thì hơn.'],
      ['男', '申し訳ありません。すぐにメモを直して、二課の佐藤さんにお伝えします。田口様のご都合は五時以降ということでしたので、それもお伝えします。', 'Tôi xin lỗi. Tôi sẽ sửa ghi chú ngay và báo cho anh/chị Sato phòng hai. Anh Taguchi nói sau năm giờ mới tiện, tôi cũng sẽ báo luôn.'],
      ['女', 'お願いね。それから、同じ名字の人が何人かいる場合は、電話をいただいたときに、部署かフルネームを確認するようにしてね。', 'Nhờ anh nhé. Còn nữa, khi có nhiều người cùng họ, lúc nhận điện thoại nhớ hỏi lại phòng ban hoặc họ tên đầy đủ nhé.'],
      ['男', 'はい、気をつけます。田口様にも、こちらから一言おわびのお電話を入れておいたほうがよろしいでしょうか。', 'Vâng, tôi sẽ chú ý. Tôi có nên gọi điện xin lỗi anh Taguchi một tiếng không ạ?'],
      ['女', 'そうね。二課の佐藤さんから折り返しご連絡します、とお伝えして、お待たせしないようにね。', 'Ừ. Báo anh ấy là Sato phòng hai sẽ gọi lại, đừng để anh ấy phải chờ nhé.'],
    ],
    questions: [
      [
        '伝言メモで、直さなければならないのはどこですか。',
        ['【1】', '【2】', '【3】', '【4】'],
        0,
        'Người gọi chỉ nói "Sato", người nhận đoán là trưởng phòng Sato, nhưng sản phẩm mới của Sanwa Foods là việc của Sato phòng hai: phải sửa người nhận 【1】. 【3】 là bẫy: người nam nói nhầm "mười tám" rồi tự sửa thành "mười chín", và ghi chú đã ghi đúng ý đổi từ 18 sang 19.',
      ],
    ],
    points: [
      ['折り返し', 'おりかえし', 'gọi lại'],
      ['てっきり', 'てっきり', 'cứ đinh ninh là'],
      ['名字', 'みょうじ', 'họ (tên họ)'],
    ],
  }),
  item('w02', 'sogo-chodokkai', 2, {
    material: {
      kind: 'text',
      title: '来週の予定（木村）2026年11月23日（月・祝）〜27日（金）',
      body: '23日（月・祝）休み\n【1】24日（火）10:00〜12:00　空き\n【2】24日（火）14:00〜16:00　空き\n25日（水）終日　名古屋出張\n【3】26日（木）10:00〜12:00　空き\n【4】27日（金）14:00〜16:00　空き',
    },
    script: [
      ['男', 'お世話になっております。中央設備の森田でございます。木村様、先日はご提案いただいた打ち合わせの日程の件で、お電話いたしました。', 'Xin chào, tôi là Morita của Chuo Setsubi. Anh/chị Kimura, tôi gọi về việc lịch họp mà anh/chị đã đề xuất hôm trước.'],
      ['男', 'ご提案いただいた中では、火曜日の午前…と申し上げたいところなんですが、あいにく、その時間に社内の会議が入ってしまいまして。', 'Trong các lịch anh/chị đề xuất, tôi muốn nói là sáng thứ ba… nhưng không may giờ đó lại có cuộc họp nội bộ.'],
      ['男', '同じ火曜日の午後でしたら、と思ったんですが、午後は現場の立ち会いがございまして、長引くこともあるものですから、お約束しにくいんです。', 'Tôi cũng nghĩ đến chiều thứ ba, nhưng buổi chiều tôi phải có mặt ở công trường, có khi kéo dài, nên khó hẹn chắc được.'],
      ['男', 'それで、木曜日の午前ですと、弊社の部長も同席できるとのことですので、できましたら、こちらでお願いできればと存じます。', 'Vì vậy, nếu là sáng thứ năm thì trưởng bộ phận bên chúng tôi cũng có thể cùng dự, nên nếu được, tôi mong chọn giờ này.'],
      ['男', 'もし木曜日が難しいようでしたら、金曜日の午後でも結構です。その場合、部長は同席できませんが、私のほうでご説明いたします。', 'Nếu thứ năm khó thì chiều thứ sáu cũng được. Khi đó trưởng bộ phận không dự được, nhưng tôi sẽ tự trình bày.'],
      ['男', 'なお、当日は、先日お送りいただいた図面を、こちらで三部印刷してお持ちいたします。お手数ですが、あれが最新のものかどうかだけ、ご確認いただけますと助かります。', 'Ngoài ra, hôm đó tôi sẽ in sẵn ba bộ bản vẽ anh/chị gửi hôm trước để mang theo. Phiền anh/chị xác nhận giúp xem đó có phải bản mới nhất không thì tốt quá.'],
      ['男', 'お忙しいところ恐れ入りますが、折り返しご連絡いただけますでしょうか。本日は六時まで会社におります。失礼いたします。', 'Xin lỗi đã làm phiền lúc anh/chị bận, mong anh/chị gọi lại cho tôi. Hôm nay tôi ở công ty đến sáu giờ. Xin phép.'],
    ],
    questions: [
      [
        '森田さんが一番希望しているのはどれですか。',
        ['【1】', '【2】', '【3】', '【4】'],
        2,
        'Sáng thứ ba (【1】) vướng họp nội bộ, chiều thứ ba (【2】) khó hẹn vì có thể bị kéo dài ở công trường. Ông Morita muốn nhất là sáng thứ năm 【3】 vì trưởng bộ phận cũng dự được. 【4】 chỉ là phương án dự phòng "nếu thứ năm khó".',
      ],
    ],
    points: [
      ['あいにく', 'あいにく', 'không may, tiếc là'],
      ['立ち会い', 'たちあい', 'có mặt chứng kiến, giám sát'],
      ['同席する', 'どうせきする', 'cùng dự'],
    ],
  }),
  item('w02', 'sogo-chodokkai', 3, {
    material: {
      kind: 'table',
      title: '7階 フロア図',
      head: [],
      rows: [
        ['会議室A', '会議室B', '【1】', '倉庫'],
        ['', '', '', ''],
        ['エレベーター', '', '【2】', '給湯室'],
        ['', '', '', ''],
        ['【3】', '総務部', '営業部', '【4】'],
      ],
      note: '空欄は廊下。【1】〜【4】は応接室。',
    },
    script: [
      ['女', '加藤さん、二時にいらっしゃる日の出食品のお客様、応接室にご案内してもらえる？', 'Kato, em dẫn khách của Hinode Shokuhin đến lúc hai giờ vào phòng tiếp khách được không?'],
      ['男', 'はい。いつもの、会議室Bの隣のお部屋ですよね。', 'Vâng. Là phòng cạnh phòng họp B như mọi khi phải không ạ?'],
      ['女', 'それが、前のお客様の打ち合わせが延びていて、三時ごろまでお使いになるみたいなの。', 'Chuyện là cuộc họp của khách trước bị kéo dài, hình như họ dùng đến khoảng ba giờ.'],
      ['男', 'では、給湯室の隣のお部屋はどうでしょう。お茶もすぐにお出しできますし。', 'Vậy phòng cạnh phòng pha trà thì sao ạ? Mang trà ra cũng nhanh.'],
      ['女', 'あそこは四人用でしょう。今日は先方が五人いらっしゃるから、ちょっと狭いのよ。総務部の隣のお部屋は空いてるけど、エレベーターの目の前で、話し声が気になるし。', 'Phòng đó cho bốn người mà. Hôm nay bên kia đến năm người, hơi chật. Phòng cạnh phòng tổng vụ thì trống, nhưng ngay trước thang máy, tiếng nói chuyện dễ làm phiền.'],
      ['男', 'ということは、営業部の奥のお部屋ですね。', 'Vậy là phòng phía trong, cạnh phòng kinh doanh ạ.'],
      ['女', 'そう。少し歩いていただくことになるから、エレベーターを降りたら、先に立ってご案内してね。お茶は五人分、私が用意しておくから。', 'Đúng. Khách sẽ phải đi bộ một chút, nên ra khỏi thang máy thì em đi trước dẫn đường nhé. Trà cho năm người chị sẽ chuẩn bị.'],
      ['男', 'わかりました。受付から連絡があったら、エレベーターの前でお待ちしています。', 'Em hiểu rồi. Khi lễ tân báo, em sẽ đợi khách ở trước thang máy.'],
      ['女', 'それと、先方の課長さんは、足を少し悪くされているそうだから、廊下ではゆっくり歩いてね。お部屋の暖房も、先に入れておいてくれる？', 'Còn nữa, nghe nói trưởng phòng bên kia chân hơi đau, nên ở hành lang em đi chậm thôi nhé. Em bật sưởi phòng trước giúp chị được không?'],
      ['男', 'はい、承知しました。', 'Vâng, em hiểu rồi.'],
    ],
    questions: [
      [
        '男の人はお客様をどの部屋に案内しますか。',
        ['【1】', '【2】', '【3】', '【4】'],
        3,
        'Phòng quen cạnh phòng họp B (【1】) còn khách dùng đến ba giờ; phòng cạnh phòng pha trà (【2】) chỉ cho bốn người mà khách có năm; phòng cạnh phòng tổng vụ (【3】) ở ngay trước thang máy, ồn. Còn lại phòng cạnh phòng kinh doanh, tức 【4】. 【2】 hấp dẫn vì người nam đề xuất và có lý do "mang trà nhanh".',
      ],
    ],
    points: [
      ['ご案内する', 'ごあんないする', 'dẫn đường (khiêm nhường)'],
      ['先方', 'せんぽう', 'phía bên kia (khách, đối tác)'],
      ['先に立つ', 'さきにたつ', 'đi trước (dẫn đường)'],
    ],
  }),
  item('w02', 'sogo-chodokkai', 4, {
    material: {
      kind: 'table',
      title: '昼休みの電話当番（来週）',
      head: ['', '月', '火', '水', '木', '金'],
      rows: [
        ['12:00〜12:30', '【1】', '中村', '【2】', '中村', '林'],
        ['12:30〜13:00', '林', '【3】', '中村', '【4】', '中村'],
      ],
      note: '【1】〜【4】は未定（小川・吉田で分担）',
    },
    script: [
      ['女', '小川さん、来週の昼の電話当番なんだけど、空いているところを、私と二人で分けたいの。', 'Ogawa, về trực điện thoại giờ trưa tuần sau, chị muốn chia các ô còn trống cho hai chị em mình.'],
      ['女', '中村さんと林さんがもう入ってくれているから、残りは四つ。二つずつね。当番の日は、前か後ろの空いているほうの三十分で、お昼を取ってね。', 'Nakamura và Hayashi đã nhận rồi, nên còn bốn ô. Mỗi người hai ô. Hôm trực thì ăn trưa vào nửa tiếng còn lại, trước hoặc sau ca trực nhé.'],
      ['男', 'はい。ええと、僕、水曜日は朝からお客様のところに伺うので、水曜は無理です。', 'Vâng. Ờ, thứ tư em đi đến chỗ khách từ sáng, nên thứ tư không được ạ.'],
      ['女', 'じゃあ、火曜日の後半はどう？', 'Thế nửa sau thứ ba thì sao?'],
      ['男', '火曜の後半なら…あ、すみません、火曜日は昼に歯医者を予約していたんでした。火曜もちょっと…。', 'Nửa sau thứ ba thì… À, xin lỗi, thứ ba em đã đặt lịch nha sĩ buổi trưa. Thứ ba cũng hơi…'],
      ['女', 'わかった。じゃあ、火曜と水曜は私がやるから、小川さんは月曜の前半と、木曜の後半をお願いできる？', 'Được rồi. Vậy thứ ba và thứ tư chị trực, em trực nửa đầu thứ hai và nửa sau thứ năm được không?'],
      ['男', '月曜は大丈夫です。木曜の後半は…会議が…いや、大丈夫です。会議は一時半からでした。', 'Thứ hai thì được ạ. Nửa sau thứ năm thì… có họp… à không, được ạ. Cuộc họp bắt đầu từ một giờ rưỡi.'],
      ['女', 'よかった。もし急に出かけることになったら、前の日までに中村さんに相談してね。電話を受けたら、伝言メモは必ず担当者の机に置いておくこと。', 'Tốt quá. Nếu đột nhiên phải ra ngoài thì trước một ngày hãy bàn với Nakamura nhé. Nhận điện thoại thì nhất định để giấy ghi lời nhắn lên bàn người phụ trách.'],
      ['男', 'はい、わかりました。表には僕の名前を入れておきます。吉田さん、火曜と水曜、続けてになってしまって、すみません。', 'Vâng, em hiểu rồi. Em sẽ điền tên mình vào bảng. Chị Yoshida, để chị trực liền thứ ba với thứ tư, em xin lỗi.'],
    ],
    questions: [
      [
        '男の人が電話当番をするのはどれですか。',
        ['【1】と【2】', '【1】と【4】', '【2】と【3】', '【3】と【4】'],
        1,
        'Người nam không trực được thứ tư (đi gặp khách) và thứ ba (lịch nha sĩ), nên nhận nửa đầu thứ hai 【1】 và nửa sau thứ năm 【4】; cuộc họp thứ năm bắt đầu từ một rưỡi nên không vướng. Lựa chọn 3 (【2】と【3】) là phần người nữ trực. Lựa chọn 4 chỉ đúng một nửa.',
      ],
    ],
    points: [
      ['電話当番', 'でんわとうばん', 'phiên trực điện thoại'],
      ['分担する', 'ぶんたんする', 'chia nhau phụ trách'],
      ['伝言メモ', 'でんごんメモ', 'giấy ghi lời nhắn'],
    ],
  }),
];

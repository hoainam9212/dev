import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/** Week 1 — first contact with the test, basic manners: seating, reception, schedules. Level: J2 → J1. */
export const W01: BjtItem[] = [
  item('w01', 'jokyo', 1, {
    material: {
      kind: 'scene',
      vi: 'Quầy lễ tân ở sảnh công ty. Trên quầy có một hộp nhựa chia ngăn, trong đó là những tấm thẻ có dây đeo; một nhân viên ngồi sau quầy đang đếm, một nhân viên khác đứng cạnh, tay cầm một tập phiếu.',
    },
    script: [
      ['女', '昨日、首から下げたままお帰りになったお客様が二人いらっしゃったみたいで、今朝数えたら二枚足りないんです。', 'Hình như hôm qua có hai vị khách ra về mà vẫn đeo ở cổ, sáng nay tôi đếm thì thiếu hai tấm.'],
      ['男', 'ああ、それはまずいね。あれがあれば、ゲートを通れちゃうから。', 'À, thế thì không ổn rồi. Có cái đó là đi qua cổng được mà.'],
      ['女', '受付票に会社名が書いてありますので、ご連絡して、郵送で返していただけないかお願いしようと思うんですが。', 'Trên phiếu tiếp khách có ghi tên công ty, nên tôi định liên lạc và nhờ họ gửi trả qua bưu điện.'],
      ['男', 'うん、そうして。それと、これからはお帰りの際に、受付で必ずお声がけして返していただくようにしよう。', 'Ừ, cứ làm vậy. Còn từ giờ, khi khách ra về, mình nhớ lên tiếng ở quầy để khách trả lại nhé.'],
    ],
    questions: [
      [
        '二人は何について話していますか。',
        ['来客用の受付票について', '来客用の駐車券について', '来客用の入館証について', '来客用の手提げ袋について'],
        2,
        'Không ai nói chữ 入館証, nhưng "đeo ở cổ", "thiếu hai tấm", "có nó thì qua được cổng" đều chỉ thẻ ra vào tòa nhà. Lựa chọn 1 là bẫy: 受付票 có nghe trong băng, nhưng chỉ là chỗ tra tên công ty để liên lạc, không phải điều đang bàn. Vé gửi xe không đeo ở cổ.',
      ],
    ],
    points: [
      ['入館証', 'にゅうかんしょう', 'thẻ ra vào tòa nhà'],
      ['受付票', 'うけつけひょう', 'phiếu ghi tên khách ở quầy lễ tân'],
      ['お声がけする', 'おこえがけする', 'lên tiếng nhắc, mời (lịch sự)'],
    ],
  }),
  item('w01', 'jokyo', 2, {
    material: {
      kind: 'scene',
      vi: 'Phòng pha trà nhỏ trong văn phòng. Trên khay có bốn chiếc cốc thủy tinh và bốn tách có nắp; một nhân viên đang mở tủ lạnh, nhân viên kia đứng cạnh nhìn đồng hồ treo tường.',
    },
    script: [
      ['男', '今日のお客様、駅から歩いていらっしゃるそうなんですよ。この暑さですから、いつもの熱いのはやめませんか。', 'Khách hôm nay nghe nói đi bộ từ ga đến. Trời nóng thế này, mình đừng dùng thứ nóng như mọi khi nhé?'],
      ['女', 'そうですね。冷蔵庫に冷えた麦茶がありますから、グラスにしましょう。', 'Đúng đấy. Trong tủ lạnh có trà lúa mạch lạnh, mình dùng cốc thủy tinh đi.'],
      ['男', 'ただ、お話が長くなりそうなので、二回目にお持ちするときは、温かいほうがいいかもしれませんね。', 'Có điều câu chuyện chắc sẽ dài, nên lần mang ra thứ hai có lẽ nên dùng đồ ấm.'],
      ['女', 'ええ。それから、別の会社の方からいただいたお菓子は、お客様にお出しするものではないので、あとで皆さんで分けましょう。', 'Vâng. Còn bánh kẹo người công ty khác tặng thì không phải để mời khách, lát nữa mọi người chia nhau nhé.'],
    ],
    questions: [
      [
        '二人は何について話していますか。',
        ['お客様にお出しする飲み物について', 'お客様にお出しするお菓子について', 'お客様にお出しする資料について', 'お客様にお出しするおしぼりについて'],
        0,
        'Hai người bàn bỏ đồ nóng, dùng trà lạnh và cốc thủy tinh, lần sau thì đồ ấm: tức là đồ uống mời khách, dù chữ 飲み物 không xuất hiện. Lựa chọn 2 là bẫy vì băng có cả お菓子 lẫn "お客様にお出しする", nhưng câu đó nói bánh KHÔNG dùng để mời khách.',
      ],
    ],
    points: [
      ['麦茶', 'むぎちゃ', 'trà lúa mạch'],
      ['お出しする', 'おだしする', 'mời, mang ra (khiêm nhường)'],
      ['いただいたお菓子', 'いただいたおかし', 'bánh kẹo được người khác tặng'],
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
      ['男', '今年の新入社員アンケートの結果です。最も多かったのは敬語でしたが、これは研修のカリキュラムで十分に扱います。', 'Đây là kết quả khảo sát nhân viên mới năm nay. Nhiều nhất là kính ngữ, nhưng phần này sẽ được dạy kỹ trong chương trình đào tạo.'],
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
      kind: 'table',
      title: '本社周辺の地図',
      head: [],
      rows: [
        ['【1】', '', '本社ビル', '', '【2】'],
        ['', '', '', '', ''],
        ['銀行', '', '【3】', '', 'コンビニ'],
        ['', '', '', '', ''],
        ['駅', '', '公園', '', '【4】'],
      ],
      note: '空欄は道路。上が北。【1】〜【4】は駐車場。',
    },
    script: [
      ['男', 'あのう、明日の十時に伺うことになっております、山口工業の佐野と申しますが、車で伺っても大丈夫でしょうか。', 'Xin lỗi, tôi là Sano của Yamaguchi Kogyo, có hẹn đến lúc mười giờ ngày mai. Tôi đi ô tô đến có được không ạ?'],
      ['女', 'はい、お待ちしております。ただ、本社ビルの向かいにございます来客用の駐車場が、今週は工事で使えなくなっておりまして。恐れ入りますが、第二駐車場をご利用いただけますでしょうか。', 'Vâng, chúng tôi đang đợi anh. Có điều bãi đỗ xe cho khách đối diện tòa nhà trụ sở tuần này đang thi công nên không dùng được. Phiền anh dùng bãi số hai được không ạ?'],
      ['男', '第二駐車場ですね。駅のほうから行くんですが、どう行けばいいでしょうか。', 'Bãi số hai à. Tôi đi từ phía ga, thì đi thế nào ạ?'],
      ['女', '駅前から、公園の前の道を東にお進みください。公園を過ぎて最初の角は、曲がらずにそのまままっすぐ。すると、右手に見えてまいります。', 'Từ trước ga, anh đi theo con đường trước công viên về phía đông. Qua công viên, đến góc đường đầu tiên thì đừng rẽ mà cứ đi thẳng. Bãi xe sẽ hiện ra bên tay phải.'],
      ['男', 'ええと、コンビニの角を左に、じゃないんですね。前に伺ったとき、たしか大通りの向こう側に止めたような…。', 'Ơ, vậy là không rẽ trái ở góc cửa hàng tiện lợi à. Lần trước tôi đến, hình như tôi đỗ ở phía bên kia đường lớn thì phải…'],
      ['女', '大通りの北側の駐車場は、別の会社の物でございますので、お気をつけください。第二駐車場には「山口工業様」と札を立てておきます。お車を止めましたら、本社ビルの受付までお越しください。', 'Bãi đỗ phía bắc đường lớn là của công ty khác, anh lưu ý giúp. Ở bãi số hai chúng tôi sẽ dựng biển ghi "Quý công ty Yamaguchi Kogyo". Đỗ xe xong, mời anh đến quầy lễ tân của tòa nhà trụ sở.'],
      ['男', 'わかりました。あ、明日は、技術の者ともう一台で、二台になるかもしれないんですが…。', 'Tôi hiểu rồi. À, ngày mai có thể người bên kỹ thuật đi thêm một xe nữa, thành hai xe…'],
      ['女', 'かしこまりました。第二駐車場は十分な広さがございますので、二台分お取りしておきます。お気をつけてお越しくださいませ。', 'Vâng ạ. Bãi số hai khá rộng nên chúng tôi sẽ giữ chỗ cho hai xe. Chúc anh đi đường cẩn thận.'],
    ],
    questions: [
      [
        '男の人はどこに車を止めますか。',
        ['【1】', '【2】', '【3】', '【4】'],
        3,
        'Bãi đối diện tòa nhà (【3】) đang thi công. Từ ga đi về phía đông theo đường trước công viên, qua góc đầu tiên vẫn đi thẳng; đi về phía đông thì tay phải là phía nam, nên bãi đó là 【4】. 【2】 nằm phía bắc đường lớn, là bãi của công ty khác — chính chỗ người khách nhớ nhầm.',
      ],
    ],
    points: [
      ['伺う', 'うかがう', 'đến thăm (khiêm nhường)'],
      ['右手', 'みぎて', 'phía tay phải'],
      ['お越しください', 'おこしください', 'mời anh/chị đến (tôn kính)'],
    ],
  }),
  item('w01', 'sogo-chodokkai', 2, {
    material: {
      kind: 'text',
      title: 'ベトナム支社 来日メンバーの予定（2027年1月20日・水）',
      body: '9:30　本社到着・社長あいさつ\n【1】10:00〜11:30　工場見学\n【2】11:30〜12:30　ショールーム見学\n12:30〜13:30　昼食（社員食堂）\n【3】13:30〜15:00　営業部との打ち合わせ\n【4】15:00〜16:30　品質管理部の説明\n18:00〜　歓迎会',
    },
    script: [
      ['女', '皆さん、来週水曜日のベトナム支社の皆さんの予定について、変更をお知らせします。お手元の予定表をご覧ください。', 'Thưa mọi người, tôi xin thông báo thay đổi về lịch của đoàn chi nhánh Việt Nam vào thứ tư tuần sau. Mời mọi người xem lịch trên tay.'],
      ['女', '先ほど連絡がありまして、成田に着く便が二時間近く遅れるそうです。そのため、本社への到着は十一時過ぎになる見込みです。', 'Vừa có liên lạc cho biết chuyến bay đến Narita trễ gần hai tiếng. Vì vậy dự kiến đoàn đến trụ sở sau mười một giờ.'],
      ['女', 'まず、工場見学ですが、工場のほうに確認したところ、午後は三時以降でしたら対応できるとのことでした。そこで、工場見学と、最後に予定していた品質管理部の説明とを入れ替えることにします。', 'Trước hết là tham quan nhà máy: tôi đã hỏi phía nhà máy, họ nói buổi chiều thì từ ba giờ trở đi có thể đón được. Vì vậy, đổi chỗ tham quan nhà máy với phần giới thiệu của bộ phận quản lý chất lượng vốn xếp cuối cùng.'],
      ['女', 'ただ、ご覧のとおり、午前の最初の枠には到着が間に合いません。ですので、品質管理部の説明は、ショールーム見学を予定していた時間に移します。品質管理部の部長には、もうご了承いただいております。', 'Có điều, như mọi người thấy, đoàn đến không kịp khung giờ đầu tiên buổi sáng. Nên phần giới thiệu của quản lý chất lượng sẽ chuyển sang giờ vốn dành cho tham quan phòng trưng bày. Trưởng bộ phận quản lý chất lượng đã đồng ý rồi.'],
      ['女', 'ショールームのほうは、歓迎会の前に、五時から三十分ほどご案内する形にします。営業部との打ち合わせは予定どおりです。社長のごあいさつは、到着後すぐ、短めにお願いすることになりました。以上です。', 'Còn phòng trưng bày thì sẽ dẫn đoàn đi khoảng ba mươi phút từ năm giờ, trước tiệc chào mừng. Buổi họp với phòng kinh doanh giữ nguyên. Lời chào của giám đốc sẽ diễn ra ngắn gọn ngay sau khi đoàn đến.'],
      ['女', '工場までのバスは、打ち合わせが終わる三時ちょうどに、正面玄関に回してもらいます。変更後の予定表は、今日中に皆さんにメールでお送りします。以上です。', 'Xe buýt đi nhà máy sẽ được đưa đến cửa chính đúng ba giờ, lúc buổi họp kết thúc. Lịch sau khi thay đổi tôi sẽ gửi email cho mọi người trong hôm nay. Hết.'],
    ],
    questions: [
      [
        '品質管理部の説明は、どの時間に行うことになりましたか。',
        ['【1】', '【2】', '【3】', '【4】'],
        1,
        'Ban đầu định đổi chỗ với tham quan nhà máy (tức sang 【1】), nhưng đoàn đến sau mười một giờ nên không kịp 【1】; phần này chuyển vào giờ của phòng trưng bày, tức 【2】. 【4】 là giờ cũ, giờ đã dành cho tham quan nhà máy. 【1】 là bẫy cho ai chỉ nghe chữ 入れ替える.',
      ],
    ],
    points: [
      ['見込み', 'みこみ', 'dự kiến'],
      ['入れ替える', 'いれかえる', 'đổi chỗ cho nhau'],
      ['枠', 'わく', 'khung (giờ)'],
      ['了承', 'りょうしょう', 'sự đồng ý, chấp thuận'],
    ],
  }),
  item('w01', 'sogo-chodokkai', 3, {
    material: {
      kind: 'text',
      title: '来客準備チェック表　12月3日（木）15:00　丸山物産様（3名）',
      body: '【1】応接室の予約\n【2】駐車場の確保（1台）\n【3】受付への来客予定の連絡（会社名・お名前）\n【4】お渡しする資料の印刷（3部＋控え1部）',
    },
    script: [
      ['男', '小松さん、明日の丸山物産さんの準備、どうなってる？', 'Komatsu, việc chuẩn bị đón Maruyama Bussan ngày mai đến đâu rồi?'],
      ['女', 'はい。応接室は先週のうちに押さえてあります。資料も、さっき四部刷り終わりました。', 'Vâng. Phòng tiếp khách em đã giữ từ tuần trước. Tài liệu thì em vừa in xong bốn bộ.'],
      ['男', '駐車場は？先方、車でいらっしゃるって言ってたよね。', 'Còn bãi đỗ xe? Bên kia nói sẽ đi ô tô đến mà nhỉ.'],
      ['女', 'それが、今朝お電話をいただいて、電車でいらっしゃることになったそうなので、駐車場はお断りしておきました。', 'Chuyện đó thì sáng nay bên họ gọi điện, nói là sẽ đi tàu, nên em đã báo hủy chỗ đỗ xe rồi.'],
      ['男', 'そう。じゃあ、受付への連絡は？', 'Vậy à. Thế còn báo cho quầy lễ tân?'],
      ['女', '昨日、メールでお名前を三名分お送りしたんですが…。あ、その電話で、お一人が別の方に代わるとうかがったんでした。直したものは、まだ送っていません。', 'Hôm qua em đã gửi email tên của ba người rồi… À, trong cuộc gọi đó em còn được báo là một người sẽ đổi sang người khác. Bản đã sửa thì em chưa gửi.'],
      ['男', 'じゃあ、それはすぐにお願い。受付でお名前が違うと、お客様をお待たせしちゃうからね。代わる方のお名前の読み方も、念のため確認しておいて。', 'Vậy việc đó làm ngay nhé. Ở quầy mà tên không khớp là để khách phải đợi đấy. Cả cách đọc tên của người thay cũng nên xác nhận lại cho chắc.'],
      ['女', 'はい、承知しました。先方にお電話して、確認してからお送りします。それと、お渡しする資料は三部で足りますので、控えの一部は課長にお渡ししておきますね。', 'Vâng, em hiểu rồi. Em sẽ gọi cho bên kia xác nhận rồi gửi ạ. Còn tài liệu đưa khách thì ba bộ là đủ, bộ lưu em xin gửi trưởng phòng nhé.'],
      ['男', 'うん、ありがとう。お茶は、三時ちょうどに出せるように、受付から連絡が来たら準備を始めてね。', 'Ừ, cảm ơn. Trà thì khi quầy lễ tân báo khách đến thì bắt đầu chuẩn bị, để mang ra đúng ba giờ nhé.'],
    ],
    questions: [
      [
        '女の人がまだ済ませていないのはどれですか。',
        ['【1】', '【2】', '【3】', '【4】'],
        2,
        'Email báo tên khách cho lễ tân đã gửi, nhưng một người đã đổi mà bản sửa chưa gửi, nên 【3】 chưa xong. 【2】 dễ bị chọn vì không có chỗ đỗ nào được giữ, nhưng khách chuyển sang đi tàu nên việc này không còn cần nữa. 【1】 và 【4】 đã làm xong.',
      ],
    ],
    points: [
      ['押さえる', 'おさえる', 'giữ chỗ, đặt trước'],
      ['刷る', 'する', 'in'],
      ['お待たせする', 'おまたせする', 'để (khách) phải chờ'],
    ],
  }),
  item('w01', 'sogo-chodokkai', 4, {
    material: {
      kind: 'table',
      title: '懇親会の席（料亭の個室）',
      head: [],
      rows: [
        ['床の間', '【1】', '【2】', '窓'],
        ['', 'テーブル', 'テーブル', ''],
        ['入口', '【3】', '【4】', ''],
      ],
      note: '出席者：先方2名（部長・担当者）、当社2名（課長・林）',
    },
    script: [
      ['女', '課長、金曜日の懇親会の席なんですが、普通でしたら、床の間の前、奥のお席にお客様に座っていただくんですよね。', 'Trưởng phòng ơi, về chỗ ngồi ở buổi giao lưu thứ sáu: bình thường mình mời khách ngồi phía trong, trước hốc tường trang trí phải không ạ?'],
      ['男', 'うん、普段ならね。ただ今回は、先方の部長が八時台の新幹線で大阪に戻られるそうで、途中で失礼するかもしれないって、さっきお電話があったんだ。', 'Ừ, bình thường thì vậy. Nhưng lần này trưởng bộ phận bên kia phải về Osaka bằng chuyến Shinkansen khoảng tám giờ, vừa gọi điện báo là có thể sẽ xin về giữa chừng.'],
      ['女', 'そうなんですか。では、出入りしやすいほうがよろしいですね。', 'Vậy ạ. Thế thì chỗ dễ ra vào sẽ tốt hơn nhỉ.'],
      ['男', 'そう。奥だと、立つたびに僕らの後ろを回っていただくことになるからね。今回はお二人とも入口側に座っていただいて、こっちが奥に座ろう。お店には僕から事情を話しておくよ。', 'Đúng. Ngồi trong thì mỗi lần đứng dậy lại phải vòng ra sau lưng bọn mình. Lần này mời cả hai vị ngồi phía cửa, bên mình ngồi phía trong. Anh sẽ tự giải thích với quán.'],
      ['女', 'わかりました。お二人を離さないほうがいいですよね。担当の方だけ奥というのも、かえって気をつかわせてしまいますし。', 'Em hiểu rồi. Không nên tách hai vị ra nhỉ. Để mỗi người phụ trách ngồi trong thì lại làm họ ngại.'],
      ['男', 'うん。それと、お土産は帰り際じゃなくて、最初に席でお渡ししよう。急いでいらっしゃるときに、慌てさせたくないからね。', 'Ừ. Còn quà thì đừng đợi lúc về, đưa ngay ở bàn từ đầu. Khi họ đang vội, anh không muốn làm họ cuống.'],
      ['女', 'かしこまりました。窓に近い奥のお席は冷房が当たりやすいと、お店の方から伺っていたんですが、今回は私たちが座りますので、そのままで大丈夫ですね。', 'Vâng ạ. Người của quán có nói ghế phía trong gần cửa sổ dễ bị máy lạnh thổi vào, nhưng lần này bên mình ngồi đó nên cứ để nguyên cũng được ạ.'],
    ],
    questions: [
      [
        'お客様が座るのはどこですか。',
        ['【3】と【4】', '【1】と【2】', '【1】と【3】', '【2】と【4】'],
        0,
        'Thường khách ngồi phía trong (【1】【2】, gần hốc tường), nhưng lần này trưởng bộ phận bên kia có thể về sớm nên mời cả hai vị ngồi phía cửa: 【3】 và 【4】. Lựa chọn 2 là chỗ ngồi theo lệ thường, đã bị đổi. Lựa chọn 3 và 4 tách hai vị khách, điều người nữ nói là không nên.',
      ],
    ],
    points: [
      ['懇親会', 'こんしんかい', 'buổi giao lưu, tiệc thân mật'],
      ['床の間', 'とこのま', 'hốc tường trang trí (chỗ cạnh đó là ghế trên)'],
      ['途中で失礼する', 'とちゅうでしつれいする', 'xin phép về giữa chừng'],
    ],
  }),
];

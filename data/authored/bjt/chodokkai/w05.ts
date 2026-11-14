import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/** Week 5 — numbers, charts and trends. Level: J1. */
export const W05: BjtItem[] = [
  item('w05', 'jokyo', 1, {
    material: {
      kind: 'scene',
      vi: 'Phòng họp nhỏ. Trên màn hình chiếu là biểu đồ cột theo tháng, cột của tháng gần nhất cao vượt hẳn các cột khác; hai nhân viên ngồi nhìn màn hình, một người cầm một xấp phiếu in.',
    },
    script: [
      ['女', '先月のこの数字、ずいぶん跳ね上がっていますね。', 'Con số tháng trước này tăng vọt ghê nhỉ.'],
      ['男', 'うん。セールで出ていった分が、そのまま戻ってきたって感じだね。ほとんどが「サイズが合わない」っていう理由らしいよ。', 'Ừ. Cảm giác như phần bán ra trong đợt giảm giá lại quay về nguyên vẹn. Hầu hết lý do là "không vừa cỡ".'],
      ['女', 'ネットで買うと、試着ができませんからね。交換じゃなくて、お金を返してほしいという方が多いんですか。', 'Mua trên mạng thì không thử được mà. Có nhiều người muốn hoàn tiền chứ không đổi hàng ạ?'],
      ['男', '七割がそうだって。売上が伸びたって喜んでいたけど、差し引くとそれほどでもないんだよ。サイズ表を見直さないとね。', 'Nghe nói bảy mươi phần trăm là vậy. Cứ mừng là doanh số tăng, nhưng trừ đi thì cũng không được bao nhiêu. Phải xem lại bảng cỡ thôi.'],
    ],
    questions: [
      [
        '二人は何について話していますか。',
        ['先月の売上について', '先月の来店者数について', '先月の返品数について', '先月の広告費について'],
        2,
        'Hàng bán ra "quay về", lý do không vừa cỡ, khách muốn lấy lại tiền: con số tăng vọt là số hàng bị trả lại (返品数), dù chữ này không xuất hiện. Lựa chọn 1 là bẫy vì có chữ 売上 trong băng, nhưng người nam nói doanh số trừ đi phần này thì không còn đáng mừng; con số đang bàn không phải doanh số.',
      ],
    ],
    points: [
      ['跳ね上がる', 'はねあがる', 'tăng vọt'],
      ['試着', 'しちゃく', 'mặc thử'],
      ['差し引く', 'さしひく', 'trừ đi'],
    ],
  }),
  item('w05', 'jokyo', 2, {
    material: {
      kind: 'scene',
      vi: 'Văn phòng nhỏ cạnh xưởng sản xuất. Trên tường có biểu đồ đường theo ngày, đoạn cuối đi lên rõ rệt; một người mặc đồng phục xưởng cầm bảng kẹp hồ sơ chỉ vào đoạn đó, người kia đứng khoanh tay nhìn.',
    },
    script: [
      ['男', '第二ラインなんですが、先週の半ばから、検査ではじかれる数が増えてきていまして。昨日は百個に三個でした。', 'Về dây chuyền số hai, từ giữa tuần trước số bị loại khi kiểm tra tăng lên. Hôm qua là ba trên một trăm cái.'],
      ['女', '先月までは、千個に五個くらいだったでしょう。原因はわかったの？', 'Đến tháng trước chỉ khoảng năm trên một nghìn cái thôi mà. Đã biết nguyên nhân chưa?'],
      ['男', '金型がすり減ってきているんじゃないかと。稼働時間を延ばして遅れを取り戻そうという話もあったんですが、まずは金型の交換を優先したほうがいいかと思いまして。', 'Tôi nghĩ là khuôn bị mòn. Cũng có ý kiến kéo dài giờ chạy máy để bù chậm trễ, nhưng tôi nghĩ nên ưu tiên thay khuôn trước.'],
      ['女', 'そうね。数を作っても、はじかれたら意味がないものね。', 'Ừ. Làm được nhiều mà bị loại thì cũng vô nghĩa.'],
    ],
    questions: [
      [
        '二人は何について話していますか。',
        ['第二ラインの不良率の件', '第二ラインの稼働時間の件', '第二ラインの人員配置の件', '第二ラインの電気代の件'],
        0,
        'Số bị loại ở khâu kiểm tra tăng từ khoảng năm phần nghìn lên ba phần trăm: đó là tỉ lệ hàng lỗi (不良率), dù chữ này không xuất hiện. Lựa chọn 2 là bẫy vì có chữ 稼働時間 trong băng, nhưng việc kéo dài giờ chạy máy chỉ là một ý kiến bị gác lại.',
      ],
    ],
    points: [
      ['はじく', 'はじく', 'loại ra (khi kiểm tra)'],
      ['金型', 'かながた', 'khuôn (đúc, dập)'],
      ['すり減る', 'すりへる', 'mòn'],
      ['稼働時間', 'かどうじかん', 'thời gian chạy máy'],
    ],
  }),
  item('w05', 'shiryo', 1, {
    material: {
      kind: 'table',
      title: '支店別 上半期の目標と実績',
      head: ['支店', '目標（万円）', '実績（万円）'],
      rows: [
        ['札幌', '500', '520'],
        ['仙台', '400', '380'],
        ['広島', '450', '495'],
        ['熊本', '300', '315'],
      ],
    },
    script: [
      ['女', '上半期の結果です。実績の金額だけを見ると札幌が一番ですが、今回は金額ではなく、目標の達成率が最も高かった支店を社長賞として表彰します。', 'Đây là kết quả nửa đầu năm. Nếu chỉ nhìn số tiền thực đạt thì Sapporo đứng đầu, nhưng lần này giải của giám đốc sẽ trao cho chi nhánh có tỉ lệ đạt mục tiêu cao nhất, không xét số tiền.'],
    ],
    questions: [
      [
        '社長賞を受けるのはどの支店ですか。',
        ['広島', '札幌', '熊本', '仙台'],
        0,
        'Tỉ lệ đạt = thực đạt ÷ mục tiêu: Sapporo 104%, Sendai 95%, Hiroshima 110%, Kumamoto 105%. Hiroshima cao nhất. Sapporo là bẫy: số tiền lớn nhất nhưng tỉ lệ thấp hơn.',
      ],
    ],
    points: [
      ['達成率', 'たっせいりつ', 'tỉ lệ đạt (mục tiêu)'],
      ['実績', 'じっせき', 'kết quả thực tế'],
      ['表彰する', 'ひょうしょうする', 'khen thưởng, tuyên dương'],
    ],
  }),
  item('w05', 'shiryo', 2, {
    material: {
      kind: 'bars',
      title: '国内市場シェア',
      unit: '%',
      labels: ['A社', 'B社', '当社', 'C社'],
      series: [
        { name: '昨年', values: [35, 25, 20, 20] },
        { name: '今年', values: [33, 22, 26, 19] },
      ],
    },
    script: [
      ['男', '今年、当社のシェアは六ポイント伸びて、二位に上がりました。', 'Năm nay thị phần của công ty ta tăng sáu điểm, lên vị trí thứ hai.'],
      ['男', '一方、シェアを最も大きく落とした会社は、巻き返しのために、来年は価格を大幅に下げてくると予想されます。注意が必要です。', 'Mặt khác, công ty mất thị phần nhiều nhất được dự đoán sẽ giảm giá mạnh vào năm sau để giành lại. Cần chú ý.'],
    ],
    questions: [
      [
        '来年、価格を大幅に下げてくると予想されるのはどこですか。',
        ['A社', 'C社', 'B社', '当社'],
        2,
        'Mức giảm thị phần: A 35→33 (−2), B 25→22 (−3), C 20→19 (−1). B giảm nhiều nhất. A vẫn đứng đầu và có vẻ lớn nhất, nhưng câu hỏi là về mức giảm.',
      ],
    ],
    points: [
      ['シェア', 'しぇあ', 'thị phần'],
      ['巻き返し', 'まきかえし', 'giành lại thế, phản công'],
      ['大幅に', 'おおはばに', 'mạnh, với biên độ lớn'],
    ],
  }),
  item('w05', 'shiryo', 3, {
    material: {
      kind: 'table',
      title: '宅配便料金表（関東→九州）',
      head: ['重さ', '料金'],
      rows: [
        ['2kgまで', '800円'],
        ['5kgまで', '1,100円'],
        ['10kgまで', '1,500円'],
        ['20kgまで', '2,200円'],
      ],
    },
    script: [
      ['女', '福岡のお客様にサンプルを送りたいんですが、料金を調べてもらえますか。', 'Tôi muốn gửi hàng mẫu cho khách ở Fukuoka, anh tra giúp giá cước được không?'],
      ['女', 'サンプルは一つ一・六キロで、三つ送ります。箱が四百グラムぐらいあるので、それも入れて計算してください。', 'Mỗi mẫu 1,6 cân, gửi ba mẫu. Thùng nặng khoảng bốn trăm gam, nhớ tính cả vào.'],
    ],
    questions: [
      [
        '送料はいくらになりますか。',
        ['800円', '1,100円', '1,500円', '2,200円'],
        2,
        '1,6 kg × 3 = 4,8 kg, cộng thùng 0,4 kg = 5,2 kg, vượt mức 5 kg nên vào mức "đến 10 kg" = 1.500 yên. Quên cộng thùng thì chỉ 4,8 kg và sẽ chọn nhầm 1.100 yên.',
      ],
    ],
    points: [
      ['送料', 'そうりょう', 'phí gửi, cước vận chuyển'],
      ['宅配便', 'たくはいびん', 'dịch vụ chuyển phát tận nhà'],
    ],
  }),
  item('w05', 'sogo-chodokkai', 1, {
    material: {
      kind: 'table',
      title: '駅前店 月別来店客数（2026年）',
      head: ['', '6月', '7月', '8月', '9月', '10月'],
      rows: [
        ['来店客数（人）', '3,200', '3,150', '3,900', '4,100', '4,600'],
        ['前年同月（人）', '3,100', '3,200', '3,050', '3,150', '3,300'],
        ['', '【1】', '【2】', '【3】', '【4】', ''],
      ],
    },
    script: [
      ['男', '水野さん、この表、駅の看板広告の効果を説明するのに使いたいんだけど、広告を出し始めた月に印をつけておいてくれる？', 'Mizuno, anh muốn dùng bảng này để giải thích hiệu quả của biển quảng cáo ở ga, em đánh dấu vào tháng bắt đầu đặt quảng cáo giúp anh nhé?'],
      ['女', 'はい。ええと、数字が大きく伸びたのは八月からですから、八月ですね。', 'Vâng. Ờ, con số tăng mạnh từ tháng tám, vậy là tháng tám ạ.'],
      ['男', 'いや、看板を出したのはその前の月なんだ。最初の一か月は、ほとんど変化がなかったんだよ。見慣れてもらうまで、少し時間がかかるらしくてね。', 'Không, biển được đặt từ tháng trước đó. Tháng đầu tiên gần như không thay đổi gì. Hình như cần một thời gian để mọi người quen mắt.'],
      ['女', 'そうなんですか。でも、八月は夏休みで、毎年お客様が増えるんじゃないですか。', 'Vậy ạ. Nhưng tháng tám là nghỉ hè, năm nào khách cũng tăng mà phải không ạ?'],
      ['男', 'それがね、下の段を見て。去年の八月は、むしろ減っているんだ。だから、八月の伸びは広告の効果だと考えていいと思う。', 'Chuyện là, em xem hàng dưới. Tháng tám năm ngoái còn giảm đi. Nên có thể coi mức tăng tháng tám là hiệu quả của quảng cáo.'],
      ['女', 'あ、本当ですね。去年は八月が三千五十人で、七月より減っています。', 'À, đúng thật. Năm ngoái tháng tám là 3.050 người, ít hơn tháng bảy.'],
      ['女', 'わかりました。じゃあ、九月にも印をつけますか。秋のセールを始めた月ですよね。', 'Em hiểu rồi. Thế có đánh dấu cả tháng chín không ạ? Là tháng bắt đầu đợt giảm giá mùa thu mà.'],
      ['男', 'いや、セールは今回の説明とは関係ないから、広告の印だけでいいよ。セールの効果は、来月の会議で別に話すから。', 'Không, giảm giá không liên quan đến phần giải thích lần này, chỉ cần dấu quảng cáo thôi. Hiệu quả giảm giá anh sẽ nói riêng ở cuộc họp tháng sau.'],
      ['女', 'わかりました。印のそばに「看板設置」と小さく書き添えておきます。資料は何部用意しましょうか。', 'Em hiểu rồi. Cạnh dấu em sẽ ghi nhỏ "đặt biển". Tài liệu cần chuẩn bị mấy bộ ạ?'],
      ['男', '十部あれば足りるよ。', 'Mười bộ là đủ.'],
    ],
    questions: [
      [
        '女の人は、どこに印をつけますか。',
        ['【1】', '【2】', '【3】', '【4】'],
        1,
        'Biển quảng cáo được đặt từ tháng trước tháng tám, vì tháng đầu chưa có hiệu quả; vậy là tháng bảy, tức 【2】. 【3】 (tháng tám) là chỗ người nữ đoán đầu tiên, nơi con số bắt đầu tăng. 【4】 (tháng chín) là tháng bắt đầu giảm giá, không cần đánh dấu.',
      ],
    ],
    points: [
      ['看板広告', 'かんばんこうこく', 'biển quảng cáo'],
      ['見慣れる', 'みなれる', 'quen mắt'],
      ['前年同月', 'ぜんねんどうげつ', 'cùng tháng năm trước'],
    ],
  }),
  item('w05', 'sogo-chodokkai', 2, {
    material: {
      kind: 'text',
      title: '年末棚卸し 実施予定（2026年12月26日・土）',
      body: '【1】9:00〜11:00　A棟（完成品）\n【2】11:00〜13:00　B棟（部品）\n【3】14:00〜16:00　C棟（資材）\n【4】16:00〜18:00　D棟（返品・保留品）',
    },
    script: [
      ['男', '倉庫課の山内です。十二月二十六日の棚卸しについて、予定表から変更がありますので、お知らせします。', 'Tôi là Yamauchi phòng kho. Tôi xin thông báo có thay đổi so với lịch về đợt kiểm kê ngày hai mươi sáu tháng mười hai.'],
      ['男', 'まず、B棟ですが、当日の午前中に部品の入荷が一件入ってしまいました。荷受けが終わるまで数が確定しませんので、B棟は午後に回します。', 'Trước hết là kho B: sáng hôm đó có một lô linh kiện nhập về. Đến khi nhận hàng xong thì số lượng chưa chốt được, nên kho B chuyển sang buổi chiều.'],
      ['男', '空いた十一時からの枠には、C棟を入れます。C棟の資材は、早めに終わらせたいという声もありましたので、ちょうどいいと思います。', 'Khung từ mười một giờ bị trống sẽ dành cho kho C. Cũng có ý kiến muốn làm xong vật tư kho C sớm, nên như vậy là vừa.'],
      ['男', 'では、B棟をC棟がもともと入っていた二時からに、と言いたいところなんですが、入荷の量が多く、検品が終わるのは三時過ぎになりそうだということです。', 'Vậy thì đưa kho B vào khung từ hai giờ vốn của kho C — tôi cũng muốn nói thế, nhưng lượng hàng nhập nhiều, nghe nói kiểm hàng sẽ xong sau ba giờ.'],
      ['男', 'そこで、二時からの枠はD棟の返品・保留品にして、B棟は最後の枠で行います。B棟は点数が多いので、A棟の担当の方にも応援をお願いします。', 'Vì vậy, khung từ hai giờ dành cho hàng trả lại và hàng tạm giữ ở kho D, còn kho B làm ở khung cuối cùng. Kho B nhiều mã hàng, nên nhờ cả những người phụ trách kho A hỗ trợ.'],
      ['男', 'また、C棟の資材のうち、屋外に置いてある分は、雨の場合は翌日に回します。その場合は、前日の夕方までにお知らせします。', 'Ngoài ra, phần vật tư của kho C để ngoài trời, nếu trời mưa thì chuyển sang hôm sau. Khi đó chúng tôi sẽ báo trước chiều hôm trước.'],
      ['男', '時間がずれ込んだ場合は、六時半までの延長を考えています。当日の昼食は、各自でお願いします。以上です。', 'Nếu thời gian bị lùi thì chúng tôi tính kéo dài đến sáu rưỡi. Bữa trưa hôm đó mọi người tự lo. Hết.'],
    ],
    questions: [
      [
        'B棟の棚卸しは、どの時間に行うことになりましたか。',
        ['【1】', '【2】', '【3】', '【4】'],
        3,
        'Kho B phải đợi nhận và kiểm hàng xong (sau ba giờ), nên không vào được khung hai giờ; khung đó dành cho kho D, còn kho B làm khung cuối 【4】. 【3】 là bẫy: người nói định đưa kho B vào đó ("と言いたいところなんですが") rồi bỏ. 【2】 là giờ cũ của kho B, nay là kho C.',
      ],
    ],
    points: [
      ['棚卸し', 'たなおろし', 'kiểm kê hàng tồn kho'],
      ['荷受け', 'にうけ', 'nhận hàng'],
      ['検品', 'けんぴん', 'kiểm hàng'],
      ['ずれ込む', 'ずれこむ', 'bị lùi lại, trễ sang'],
    ],
  }),
  item('w05', 'sogo-chodokkai', 3, {
    material: {
      kind: 'table',
      title: '店舗別データ（2026年10月）',
      head: ['', '店舗', '売上 前年同月比', '駐車場'],
      rows: [
        ['【1】', '駅前店', '108%', 'なし'],
        ['【2】', '中央店', '115%', 'あり（40台）'],
        ['【3】', '南町店', '121%', 'なし'],
        ['【4】', '郊外店', '112%', 'あり（120台）'],
      ],
    },
    script: [
      ['女', '新しい組み立て家具なんですが、来月、まず二店舗で先に売り出すことになりました。どこにしましょうか。', 'Về đồ nội thất lắp ráp mới, tháng sau sẽ bán trước ở hai cửa hàng. Mình chọn cửa hàng nào ạ?'],
      ['男', '前年比で伸びている店がいいよね。上位二店でいいんじゃない？駅前店は、去年改装したばかりで、まだ様子を見たいし。', 'Chọn cửa hàng đang tăng so với năm trước thì tốt. Lấy hai cửa hàng đứng đầu là được chứ? Cửa hàng trước ga mới sửa lại năm ngoái, anh còn muốn theo dõi thêm.'],
      ['女', '南町店と中央店ですね。ただ、今回の商品は、箱がかなり大きいんです。お客様が持ち帰るとなると…。', 'Là Minamimachi và Chuo nhỉ. Có điều, sản phẩm lần này hộp khá to. Nếu khách tự mang về thì…'],
      ['男', 'ああ、そうか。電車でいらっしゃるお客様が多い店だと厳しいね。配送も頼めるけど、配送料がかかると売れ行きが鈍るだろうし。', 'À, ra vậy. Cửa hàng nhiều khách đi tàu thì khó đấy. Có thể nhờ giao hàng, nhưng tốn phí giao thì bán chậm đi.'],
      ['女', 'はい。ですので、車で来られるお客様が多い店のほうがいいかと思います。郊外店は百二十台、中央店も四十台止められますし、どちらも、週末はほとんどのお客様が車でいらっしゃるそうです。', 'Vâng. Vì thế em nghĩ nên chọn cửa hàng có nhiều khách đi ô tô. Cửa hàng ngoại ô đỗ được một trăm hai mươi xe, cửa hàng trung tâm cũng bốn mươi xe, và nghe nói cuối tuần ở cả hai nơi hầu hết khách đều đi ô tô.'],
      ['男', 'そうだね。じゃあ、伸び率は少し下がるけど、駐車場のある二店にしよう。南町店は、配送料無料のキャンペーンができるようになってから、改めて考えよう。', 'Đúng vậy. Thế thì, tỉ lệ tăng thấp hơn một chút, nhưng chọn hai cửa hàng có bãi đỗ xe. Còn Minamimachi thì khi nào làm được chương trình miễn phí giao hàng mình tính lại.'],
      ['女', 'わかりました。店長の皆さんには、私からご連絡しておきます。大きな見本を置く場所があるかどうかも、あわせて伺っておきます。', 'Em hiểu rồi. Em sẽ liên lạc với các cửa hàng trưởng, và hỏi luôn xem có chỗ đặt mẫu trưng bày cỡ lớn không.'],
    ],
    questions: [
      [
        '新しい家具を先に売り出すのは、どの店ですか。',
        ['【1】と【2】', '【2】と【3】', '【2】と【4】', '【3】と【4】'],
        2,
        'Hai cửa hàng tăng mạnh nhất là 【3】 và 【2】, nhưng hộp hàng to nên cần nơi khách đi ô tô: chốt hai cửa hàng có bãi đỗ, 【2】 và 【4】. Lựa chọn 2 (【2】と【3】) là phương án đầu tiên đã bị bỏ; 【3】 không có bãi đỗ, để tính lại sau.',
      ],
    ],
    points: [
      ['前年比', 'ぜんねんひ', 'so với năm trước'],
      ['売れ行きが鈍る', 'うれゆきがにぶる', 'bán chậm lại'],
      ['改めて', 'あらためて', 'lại một lần nữa, sau'],
    ],
  }),
  item('w05', 'sogo-chodokkai', 4, {
    material: {
      kind: 'text',
      title: '11月度 販売報告（下書き）',
      body: '今月の売上高は1,250万円で、前月より約8%増加した。【1】\n主な要因は、新商品「ライトケトル」の販売が好調だったことである。【2】\n一方、主力商品の電気ポットは、前年同月の6割にとどまった。【3】\n来月は年末商戦に向け、店頭での実演販売を強化する。【4】',
    },
    script: [
      ['男', '吉村さん、報告書の下書き、見たよ。前月より増えたって書いてあるけど、去年の同じ月と比べるとどうなってる？', 'Yoshimura, anh xem bản nháp báo cáo rồi. Có ghi là tăng so với tháng trước, nhưng so với cùng tháng năm ngoái thì sao?'],
      ['女', 'あ、去年の十一月は1,316万円でしたので…約5%減っています。', 'À, tháng mười một năm ngoái là 13,16 triệu yên, nên… giảm khoảng 5% ạ.'],
      ['男', 'そうだよね。前月比だけだと、いいことしか伝わらないから、前年比も入れてくれる？「ただし、前年同月比では約5%の減少となっている」という感じで。', 'Đúng vậy. Chỉ ghi so với tháng trước thì người đọc chỉ thấy điều tốt, em thêm so với năm trước nhé? Đại loại "tuy nhiên, so với cùng tháng năm trước thì giảm khoảng 5%".'],
      ['女', 'はい。では、電気ポットが前年の六割だったという文の後ろに入れましょうか。前年の話がまとまりますし。', 'Vâng. Vậy em đặt sau câu nói bình thủy điện chỉ bằng sáu phần mười năm trước nhé? Như thế phần về năm trước được gom lại.'],
      ['男', 'うーん、それだと、ポットだけの話に読めちゃうな。これは売上全体の数字のことだから、全体の数字を書いたところのすぐ後ろがいいよ。', 'Ừm, như thế đọc sẽ tưởng chỉ nói về bình thủy. Đây là số liệu của toàn bộ doanh số, nên đặt ngay sau chỗ ghi con số tổng thì tốt hơn.'],
      ['女', 'わかりました。「ただし」でつなげれば、前月比との違いもはっきりしますね。', 'Em hiểu rồi. Nối bằng "tuy nhiên" thì sự khác biệt với con số so với tháng trước cũng rõ ràng.'],
      ['男', 'うん。それから、実演販売の件は、具体的にどの店でやるのか、店名も入れておいて。', 'Ừ. Còn việc bán hàng kèm trình diễn, ghi rõ tên cửa hàng làm ở đâu nhé.'],
      ['女', 'はい。年末は駅前店と郊外店の二店舗で行う予定ですので、両方入れます。直したものは、今日の夕方までにお送りします。', 'Vâng. Cuối năm dự định làm ở hai cửa hàng trước ga và ngoại ô, em sẽ ghi cả hai. Bản đã sửa em gửi trước chiều nay ạ.'],
      ['男', 'ありがとう。明日の朝、部長に出す前に、もう一度だけ見せてね。', 'Cảm ơn em. Sáng mai, trước khi nộp trưởng bộ phận, cho anh xem lại một lần nữa nhé.'],
    ],
    questions: [
      [
        '前年同月比を書いた文は、どこに入れますか。',
        ['【1】', '【2】', '【3】', '【4】'],
        0,
        'Con số so với năm trước là của toàn bộ doanh số, nên đặt ngay sau câu ghi tổng doanh số, tức 【1】. 【3】 là chỗ người nữ đề xuất (sau câu về bình thủy điện, cũng nói "năm trước"), nhưng bị bác vì sẽ bị đọc thành chuyện riêng của mặt hàng đó. 1.250 / 1.316 ≈ 0,95, tức giảm khoảng 5%.',
      ],
    ],
    points: [
      ['前月比', 'ぜんげつひ', 'so với tháng trước'],
      ['とどまる', 'とどまる', 'chỉ dừng ở mức'],
      ['実演販売', 'じつえんはんばい', 'bán hàng kèm trình diễn'],
    ],
  }),
];

import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/** Week 13 — economy and company news. Level: J1, about a third J1+. */
export const W13: BjtItem[] = [
  item('w13', 'jokyo', 1, {
    material: {
      kind: 'scene',
      vi: 'Văn phòng phòng kinh doanh buổi sáng. Hai người đứng cạnh bàn, một người cầm tờ báo kinh tế gấp đôi, người kia nhìn màn hình có bảng số liệu ngoại tệ.',
    },
    script: [
      ['男', '今朝の為替、見ました？　また一段と進みましたね。', 'Tỷ giá sáng nay chị xem chưa? Lại đi thêm một bậc nữa rồi.'],
      ['女', '見たわ。輸入している原料の仕入れ値が、また上がるわね。来月の価格表、作り直しかしら。', 'Xem rồi. Giá nhập nguyên liệu nhập khẩu lại tăng nữa. Bảng giá tháng sau chắc phải làm lại.'],
      ['男', 'ええ。逆に、海外向けの売り上げは、円に直すと膨らむんですけどね。', 'Vâng. Ngược lại, doanh thu bán ra nước ngoài đổi sang yên thì lại phình lên.'],
      ['女', '差し引きでどうなるか、一度経理に試算してもらいましょう。部長に説明するときに、数字があったほうがいいから。', 'Trừ qua bù lại thì ra sao, nhờ kế toán tính thử một lần đi. Lúc giải thích với trưởng bộ phận có con số thì tốt hơn.'],
    ],
    questions: [
      [
        '二人は何について話していますか。',
        ['今回の株安の影響について', '今回の円安の影響について', '今回の金利上昇の影響について', '今回の原料不足の影響について'],
        1,
        'Tỷ giá "đi thêm" làm giá nhập nguyên liệu tăng và doanh thu xuất khẩu đổi ra yên phình lên → đồng yên yếu đi, lựa chọn 2. Lựa chọn 4 có từ 原料 nghe trong băng, nhưng nguyên liệu không thiếu mà chỉ đắt lên. Không ai nhắc giá cổ phiếu hay lãi suất (lựa chọn 1, 3).',
      ],
    ],
    points: [
      ['一段と', 'いちだんと', 'thêm một bậc, hơn nữa'],
      ['膨らむ', 'ふくらむ', 'phình ra, tăng lên'],
      ['差し引き', 'さしひき', 'trừ qua bù lại'],
    ],
  }),
  item('w13', 'jokyo', 2, {
    material: {
      kind: 'scene',
      vi: 'Sảnh tiếp khách của công ty. Hai nhân viên đứng trước màn hình tivi đang chiếu bản tin; trên màn hình có logo của hai công ty đặt cạnh nhau.',
    },
    script: [
      ['女', 'ニュース、見ました？　大和精工さんと東光製作所さん、来年の春に一つになるそうですね。', 'Anh xem tin chưa? Nghe nói Yamato Seiko và Toko Seisakusho sẽ thành một vào mùa xuân năm sau.'],
      ['男', 'ええ、驚きました。うちはどちらとも取引がありますから、窓口が一本化されるかもしれませんね。', 'Ừ, tôi bất ngờ quá. Mình giao dịch với cả hai bên, nên có khi đầu mối sẽ gộp làm một.'],
      ['女', '発注の条件も、見直しになるんでしょうか。', 'Điều kiện đặt hàng chắc cũng bị xem lại nhỉ?'],
      ['男', 'まだ何とも言えませんが、部長が来週、両社にご挨拶に伺うそうです。その場で、今後の方針を伺えるかもしれません。', 'Chưa nói trước được gì, nhưng tuần sau trưởng bộ phận sẽ đến chào cả hai công ty. Có thể ngay lúc đó sẽ được nghe phương hướng sắp tới.'],
    ],
    questions: [
      [
        '二人は何について話していますか。',
        ['取引先の発注条件について', '取引先の新製品について', '取引先の担当者交代について', '取引先の経営統合について'],
        3,
        'Hai công ty khách hàng sẽ "thành một" (一つになる), đầu mối có thể gộp lại → sáp nhập, lựa chọn 4. Lựa chọn 1 có từ 発注の条件 nghe trong băng, nhưng đó chỉ là hệ quả có thể xảy ra, chưa ai biết. Lựa chọn 3 sai vì không ai nói người phụ trách thay đổi; trưởng bộ phận chỉ đi chào.',
      ],
    ],
    points: [
      ['一本化', 'いっぽんか', 'gộp làm một'],
      ['窓口', 'まどぐち', 'đầu mối liên lạc'],
      ['何とも言えない', 'なんともいえない', 'chưa thể nói gì'],
    ],
  }),
  item('w13', 'shiryo', 1, {
    material: {
      kind: 'bars',
      title: '地域別輸出額',
      unit: '億円',
      labels: ['北米', '欧州', '中国', '東南アジア'],
      series: [
        { name: '前年', values: [420, 310, 150, 200] },
        { name: '今年', values: [450, 280, 125, 240] },
      ],
    },
    script: [['男', '今年は二つの地域で輸出額が前年を割り込みました。来年度は、そのうち減少率の大きかった地域に、現地の担当者を一名増やします。', 'Năm nay có hai khu vực xuất khẩu thấp hơn năm trước. Năm tới, trong hai khu vực đó, khu vực có tỷ lệ giảm lớn hơn sẽ được tăng một nhân viên tại chỗ.']],
    questions: [
      [
        '現地の担当者が増えるのはどの地域ですか。',
        ['北米', '欧州', '中国', '東南アジア'],
        2,
        'Lựa chọn 3: hai khu vực giảm là châu Âu (310→280, giảm 30, khoảng 10%) và Trung Quốc (150→125, giảm 25, khoảng 17%). Người nói dùng 減少率 (tỷ lệ giảm), nên là Trung Quốc. Lựa chọn 2 đúng nếu tính 減少幅 (mức giảm tuyệt đối), là cái bẫy chính.',
      ],
    ],
    points: [
      ['割り込む', 'わりこむ', 'xuống dưới (mức nào đó)'],
      ['減少率', 'げんしょうりつ', 'tỷ lệ giảm'],
    ],
  }),
  item('w13', 'shiryo', 2, {
    material: {
      kind: 'table',
      title: '主な原材料の価格動向',
      head: ['原材料', '前年同月比', '当社の使用量に占める割合'],
      rows: [
        ['小麦', '+15%', '40%'],
        ['砂糖', '+8%', '25%'],
        ['植物油', '+22%', '15%'],
        ['包装材', '+12%', '20%'],
      ],
    },
    script: [['女', '使用量に占める割合が二割以上あって、しかも価格が前年より一割以上上がっている原材料については、調達先の見直しを始めます。', 'Với những nguyên liệu chiếm từ hai mươi phần trăm lượng sử dụng trở lên, đồng thời giá tăng từ mười phần trăm trở lên so với năm trước, chúng tôi sẽ bắt đầu xem lại nguồn cung.']],
    questions: [
      [
        '調達先の見直しの対象になるのはどれですか。',
        ['小麦と包装材', '小麦だけ', '小麦と砂糖', '植物油と包装材'],
        0,
        'Lựa chọn 1: phải thoả cả hai điều kiện. Lúa mì (40%, +15%) và vật liệu đóng gói (20%, +12%) đều đạt; 二割以上 gồm cả đúng 20%, nên lựa chọn 2 thiếu. Lựa chọn 4 dễ chọn vì dầu thực vật tăng mạnh nhất (+22%), nhưng chỉ chiếm 15%. Đường chiếm 25% nhưng chỉ tăng 8%.',
      ],
    ],
    points: [
      ['前年同月比', 'ぜんねんどうげつひ', 'so với cùng tháng năm trước'],
      ['包装材', 'ほうそうざい', 'vật liệu đóng gói'],
    ],
  }),
  item('w13', 'shiryo', 3, {
    material: {
      kind: 'text',
      title: '決算の概要（北斗精工・第2四半期累計）',
      body: '売上高：1,240億円（前年同期比 +6%）\n営業利益：98億円（同 −4%）\n純利益：61億円（同 +12%）\n年間配当予想：1株あたり40円（前回予想から変更なし）',
    },
    script: [['男', '売り上げは伸びましたが、原材料の値上がりで、本業のもうけを示す営業利益は減りました。純利益が増えたのは、使っていなかった土地を売却した利益によるもので、一時的なものです。', 'Doanh thu tăng, nhưng do nguyên liệu tăng giá nên lợi nhuận kinh doanh, con số cho thấy tiền lãi từ hoạt động chính, đã giảm. Lợi nhuận ròng tăng là nhờ khoản lãi từ bán mảnh đất không sử dụng, chỉ mang tính nhất thời.']],
    questions: [
      [
        'この説明から分かることはどれですか。',
        ['本業のもうけを示す利益は前年より増えた', '純利益の増加は、土地を売った一時的な利益による', '年間の配当予想は前回の予想より引き上げられた', '売上高は原材料の値上がりで前年同期より減った'],
        1,
        'Lựa chọn 2: người nói giải thích lợi nhuận ròng (+12%) tăng nhờ bán đất, chỉ là nhất thời. Lựa chọn 1 dễ chọn nếu nhìn con số lợi nhuận ròng tăng, nhưng "lợi nhuận từ hoạt động chính" là 営業利益, đã giảm 4%. Cổ tức không đổi; doanh thu tăng 6%.',
      ],
    ],
    points: [
      ['本業', 'ほんぎょう', 'hoạt động kinh doanh chính'],
      ['純利益', 'じゅんりえき', 'lợi nhuận ròng'],
      ['売却', 'ばいきゃく', 'bán (tài sản)'],
      ['配当', 'はいとう', 'cổ tức'],
    ],
  }),
  item('w13', 'sogo-chodokkai', 1, {
    material: {
      kind: 'text',
      title: '中期経営計画（2027〜2029年度）主な施策　※発表時点',
      body: '【1】2027年度上期：国内3工場の統合\n【2】2027年度下期：東南アジアでの販売拠点の開設\n【3】2028年度：基幹システムの刷新\n【4】2029年度：新素材事業への参入',
    },
    script: [
      ['男', '経営企画部の石原です。先月発表いたしました中期経営計画について、その後の変更点を社員の皆さんにご説明します。', 'Tôi là Ishihara bên kế hoạch kinh doanh. Tôi xin giải thích với toàn thể nhân viên những điểm thay đổi sau đó của kế hoạch kinh doanh trung hạn đã công bố tháng trước.'],
      ['男', 'まず、国内三工場の統合につきましては、予定どおり来年度の上期に進めます。これに伴う配置転換については、各工場で個別に説明会を開きます。', 'Trước hết, việc hợp nhất ba nhà máy trong nước sẽ tiến hành vào nửa đầu năm tài chính tới như dự kiến. Về việc điều chuyển nhân sự đi kèm, mỗi nhà máy sẽ tổ chức buổi giải thích riêng.'],
      ['男', '次に、東南アジアの販売拠点ですが、現地で外資規制の見直しが議論されておりまして、その行方を見極める必要があることから、開設を一年先送りすることといたしました。', 'Tiếp theo là điểm bán hàng ở Đông Nam Á: tại đó đang bàn việc sửa quy định với vốn nước ngoài, cần nhìn rõ diễn biến, nên chúng tôi quyết định lùi việc mở thêm một năm.'],
      ['男', 'その分の人員と予算を振り向けまして、基幹システムの刷新を前倒しいたします。現在のシステムは保守の期限が迫っており、拠点の開設を待たずに着手したほうが合理的だと判断いたしました。', 'Chuyển số nhân lực và ngân sách đó sang, chúng tôi sẽ đẩy sớm việc đổi mới hệ thống lõi. Hệ thống hiện tại sắp hết hạn bảo trì, nên chúng tôi đánh giá bắt tay vào làm mà không chờ mở điểm bán là hợp lý hơn.'],
      ['男', '新素材事業への参入は、時期を含め、当初の計画どおりです。', 'Việc tham gia mảng vật liệu mới, kể cả thời điểm, vẫn theo kế hoạch ban đầu.'],
      ['男', 'なお、今回の変更による業績目標への影響は軽微と見込んでおり、最終年度の売上目標は据え置きます。詳しい資料は、本日中に社内ポータルに掲載いたします。ご質問は、ポータルの専用窓口までお寄せください。','Ngoài ra, ảnh hưởng của thay đổi này tới mục tiêu kết quả kinh doanh được dự báo là nhỏ, nên mục tiêu doanh thu năm cuối được giữ nguyên. Tài liệu chi tiết sẽ được đăng lên cổng thông tin nội bộ trong hôm nay. Câu hỏi xin gửi về mục riêng trên cổng thông tin đó.'],
    ],
    questions: [
      [
        '予定より早く行うことになったのはどれですか。',
        ['【1】', '【2】', '【3】', '【4】'],
        2,
        '前倒し = làm sớm hơn kế hoạch: việc đổi mới hệ thống lõi được đẩy sớm nhờ chuyển nhân lực và ngân sách sang → 【3】, lựa chọn 3. Lựa chọn 2 cũng bị thay đổi nhưng theo hướng ngược lại: 先送り = lùi lại một năm. 【1】 và 【4】 giữ nguyên lịch.',
      ],
    ],
    points: [
      ['前倒し', 'まえだおし', 'đẩy sớm hơn kế hoạch'],
      ['先送り', 'さきおくり', 'hoãn lại, lùi lại'],
      ['見極める', 'みきわめる', 'nhìn cho rõ, xác định'],
      ['軽微', 'けいび', 'nhẹ, không đáng kể'],
    ],
  }),
  item('w13', 'sogo-chodokkai', 2, {
    material: {
      kind: 'text',
      title: '社内報　原稿（上期決算）',
      body: '上期決算がまとまりました。\n\n【1】当社の上期売上高は、前年同期比8%増の420億円となった。\n【2】海外売上高の比率は、初めて3割を超えた。\n【3】一方、営業利益は、原材料価格の高騰を受けて5%減少した。\n【4】通期の業績予想は、期初の発表どおり据え置いた。',
    },
    script: [
      ['女', '社内報の決算の記事、下書きを見てもらえる？　明日の朝には印刷に回したいの。', 'Bài về kết quả kinh doanh trên bản tin nội bộ, xem bản nháp giúp tôi được không? Sáng mai tôi muốn đem đi in.'],
      ['男', 'はい。……あれ、売上高ですけど、決算短信だと四百二億円ですよ。八パーセント増は合ってるんですが。', 'Vâng… Ơ, doanh thu theo báo cáo tóm tắt là bốn trăm lẻ hai tỷ yên đấy. Tăng tám phần trăm thì đúng.'],
      ['女', 'あ、本当だ。四百二十と打っちゃったのね。危なかった。', 'À, đúng thật. Tôi gõ thành bốn trăm hai mươi. Suýt nữa.'],
      ['男', 'それから、海外比率の「初めて」というのは、どうでしょう。たしか二年前にも、一度三割を超えていたと思うんですが。', 'Còn chữ "lần đầu tiên" ở tỷ lệ nước ngoài thì sao ạ? Hình như hai năm trước cũng từng vượt ba mươi phần trăm một lần.'],
      ['女', 'そうだった？　……ああ、その年は為替の影響で一時的に、ね。でも超えたことは超えたんだから、「初めて」は書けないわね。「二年ぶりに」に直すわ。', 'Thế à? … À, năm đó tạm thời do ảnh hưởng tỷ giá. Nhưng vượt thì vẫn là vượt, nên không viết "lần đầu" được. Tôi sửa thành "sau hai năm".'],
      ['男', '営業利益の五パーセント減は、資料どおりです。', 'Lợi nhuận kinh doanh giảm năm phần trăm thì đúng như tài liệu.'],
      ['女', '通期の予想はどう？　上方修正するかもしれないって話が出てたでしょう。', 'Dự báo cả năm thì sao? Từng có chuyện có thể điều chỉnh tăng mà.'],
      ['男', '取締役会でも議論はあったそうですが、下期の原材料価格が読めないということで、結局、見送りになりました。ですから、このままで大丈夫です。', 'Nghe nói hội đồng quản trị cũng có bàn, nhưng vì không đoán được giá nguyên liệu nửa cuối năm nên cuối cùng hoãn lại. Vì vậy giữ nguyên như thế này là được.'],
      ['女', 'ありがとう。じゃあ、二か所直して、もう一度回すわね。', 'Cảm ơn nhé. Vậy tôi sửa hai chỗ rồi gửi lại lần nữa.'],
      ['男', 'あと、見出しの横に、決算発表の日付も入れておいたほうがいいかもしれません。', 'À, cạnh tiêu đề có lẽ nên ghi thêm ngày công bố kết quả.'],
      ['女', 'そうね、それも入れておくわ。', 'Ừ, tôi thêm cả cái đó.'],
    ],
    questions: [
      [
        '原稿で直すことになったのはどれですか。',
        ['【1】と【2】', '【1】と【3】', '【2】と【4】', '【3】と【4】'],
        0,
        '【1】 sai con số: 402 tỷ chứ không phải 420 (tỷ lệ tăng 8% thì đúng). 【2】 sai chữ "lần đầu" vì hai năm trước đã từng vượt 30% → lựa chọn 1. Lựa chọn 3 có 【4】: chuyện điều chỉnh tăng từng được bàn nhưng đã hoãn, nên "giữ nguyên" là đúng. 【3】 khớp tài liệu.',
      ],
    ],
    points: [
      ['決算短信', 'けっさんたんしん', 'báo cáo tóm tắt kết quả kinh doanh'],
      ['上方修正', 'じょうほうしゅうせい', 'điều chỉnh tăng (dự báo)'],
      ['見送り', 'みおくり', 'hoãn, gác lại'],
      ['〜ぶりに', 'ぶりに', 'sau (khoảng thời gian) … mới lại'],
    ],
  }),
  item('w13', 'sogo-chodokkai', 3, {
    material: {
      kind: 'table',
      title: 'ホテル3階 フロア図（決算説明会・記者会見）',
      head: [],
      rows: [
        ['エレベーター', '', '【1】', '', '宴会場A'],
        ['', '', '', '', ''],
        ['【2】', '', 'クローク', '', '宴会場B'],
        ['', '', '', '', ''],
        ['階段', '', '【3】', '', '【4】'],
      ],
      note: '※空白は通路。宴会場A＝アナリスト向け説明会、宴会場B＝記者会見。',
    },
    script: [
      ['男', '来週の決算発表の会場なんですが、受付の場所を決めておきたくて。アナリスト向けの受付は、エレベーターを降りてすぐのところでいいですよね。', 'Về địa điểm công bố kết quả tuần sau, tôi muốn quyết sẵn chỗ đặt quầy tiếp nhận. Quầy cho giới phân tích thì đặt ngay chỗ ra khỏi thang máy là được nhỉ.'],
      ['女', 'ええ、宴会場Aの手前ね。それで、記者会見の受付はどうする？', 'Ừ, phía trước phòng tiệc A. Còn quầy cho họp báo thì sao?'],
      ['男', 'エレベーターの横のスペースはどうでしょう。説明会の受付と並べておけば、案内する人も一か所で済みますし。', 'Khoảng trống cạnh thang máy thì sao ạ? Đặt cạnh quầy buổi giải thích thì người hướng dẫn cũng chỉ cần đứng một chỗ.'],
      ['女', 'うーん、そこはクロークに近いでしょう。開始前はコートを預ける人で混み合うから、記者の方とアナリストの方が入り混じって、かえって混乱すると思うわ。', 'Ừm, chỗ đó gần quầy gửi đồ. Trước giờ bắt đầu người gửi áo khoác đông lắm, phóng viên và nhà phân tích lẫn vào nhau, chỉ thêm lộn xộn thôi.'],
      ['男', 'では、階段を上がってすぐのところは？　記者の方は階段を使われることも多いので。', 'Vậy ngay chỗ lên cầu thang thì sao ạ? Phóng viên cũng hay đi cầu thang.'],
      ['女', 'カメラや三脚を持っている方がほとんどだから、エレベーターを使われるんじゃないかしら。それに、受付は会場の入り口のすぐそばにあったほうが、入場の管理もしやすいでしょう。', 'Hầu hết đều mang máy quay, chân máy, chắc sẽ đi thang máy thôi. Hơn nữa, quầy đặt ngay sát cửa phòng họp thì cũng dễ quản lý người vào hơn.'],
      ['男', 'たしかにそうですね。では、宴会場Bの入り口の、すぐ脇に置くことにします。案内の表示は、エレベーターの前に出しておきます。', 'Đúng vậy ạ. Vậy tôi sẽ đặt ngay bên cạnh cửa phòng tiệc B. Biển chỉ dẫn thì tôi dựng ở trước thang máy.'],
      ['女', 'お願い。ホテルの担当の方にも、机と椅子の数を伝えておいてね。', 'Nhờ anh nhé. Báo luôn cho người phụ trách bên khách sạn số bàn ghế nhé.'],
    ],
    questions: [
      [
        '記者会見の受付はどこに置くことになりましたか。',
        ['【1】', '【2】', '【3】', '【4】'],
        3,
        'Cạnh thang máy bị bác vì gần quầy gửi đồ, dễ lẫn người; chỗ lên cầu thang bị bác vì phóng viên mang thiết bị sẽ đi thang máy; chốt đặt sát cửa phòng tiệc B → 【4】, lựa chọn 4. Lựa chọn 1 là quầy của giới phân tích. Lựa chọn 2 và 3 là hai đề xuất đã bị bác.',
      ],
    ],
    points: [
      ['入り混じる', 'いりまじる', 'lẫn lộn vào nhau'],
      ['脇', 'わき', 'bên cạnh'],
      ['入場', 'にゅうじょう', 'vào cửa, vào hội trường'],
    ],
  }),
  item('w13', 'sogo-chodokkai', 4, {
    material: {
      kind: 'text',
      title: '定時株主総会（2027年6月24日（木））準備状況',
      body: '【1】会場の仮予約\n【2】招集通知の原稿作成\n【3】想定問答集の作成\n【4】受付スタッフの手配',
    },
    script: [
      ['男', '総会の準備、去年は直前でばたばたしたから、そろそろ一度整理しておきたいんだけど、今どうなってる？', 'Chuẩn bị đại hội cổ đông, năm ngoái sát ngày cuống cả lên, nên tôi muốn rà lại một lượt, giờ tình hình thế nào?'],
      ['女', 'はい。会場は、去年と同じホテルの宴会場を仮で押さえてあります。本契約は来月、人数の見込みが立ってからになります。', 'Vâng. Địa điểm thì đã giữ tạm phòng tiệc ở khách sạn giống năm ngoái. Hợp đồng chính thức là tháng sau, khi ước được số người.'],
      ['男', '招集通知は？', 'Thông báo triệu tập thì sao?'],
      ['女', '原稿は先週書き上げて、今、法務部のチェックを受けているところです。修正が入っても、印刷には十分間に合います。', 'Bản thảo đã viết xong tuần trước, hiện đang được phòng pháp chế kiểm tra. Có sửa thì vẫn thừa thời gian để in.'],
      ['男', '想定問答のほうは？　今年は工場の統合について、厳しい質問が来るかもしれないよ。', 'Còn bộ câu hỏi đáp dự kiến? Năm nay có thể sẽ có câu hỏi gay gắt về việc hợp nhất nhà máy đấy.'],
      ['女', 'はい、各部から質問の案は全部集まりました。ただ、回答のほうは、まだ半分ほどしかそろっていなくて。特に工場統合の部分は、生産本部の回答待ちです。', 'Vâng, đề xuất câu hỏi từ các bộ phận đã thu đủ. Nhưng phần trả lời mới có khoảng một nửa. Đặc biệt phần hợp nhất nhà máy còn chờ khối sản xuất trả lời.'],
      ['男', 'そこは急いでもらわないとな。私からも本部長にお願いしておくよ。受付の人は大丈夫？', 'Chỗ đó phải giục thôi. Tôi cũng sẽ nhờ trưởng khối. Người làm quầy tiếp nhận ổn chứ?'],
      ['女', 'はい、例年お願いしている派遣会社に、十名で依頼済みです。当日の流れも、来週説明に来ていただくことになっています。', 'Vâng, đã nhờ công ty phái cử năm nào cũng nhờ, mười người. Tuần sau họ cũng sẽ đến nghe giải thích trình tự ngày hôm đó.'],
      ['女', 'それから、株主の方へのお土産は今年から取りやめになりましたので、その分の予算は会場の費用に回します。', 'Ngoài ra, quà cho cổ đông từ năm nay đã bỏ, nên khoản ngân sách đó tôi chuyển sang chi phí địa điểm.'],
      ['男', 'わかった。また来週、状況を聞かせて。', 'Được rồi. Tuần sau báo lại tình hình cho tôi nhé.'],
    ],
    questions: [
      [
        'まだ終わっていない準備はどれですか。',
        ['【1】', '【2】', '【3】', '【4】'],
        2,
        'Bộ hỏi đáp dự kiến mới có khoảng một nửa câu trả lời, phần hợp nhất nhà máy còn chờ → chưa xong, 【3】, lựa chọn 3. Lựa chọn 2 dễ nhầm vì bản thảo đang được pháp chế kiểm tra, nhưng việc "soạn bản thảo" đã xong. Địa điểm (lựa chọn 1) chỉ cần giữ tạm, và đã giữ.',
      ],
    ],
    points: [
      ['株主総会', 'かぶぬしそうかい', 'đại hội cổ đông'],
      ['招集通知', 'しょうしゅうつうち', 'thông báo triệu tập'],
      ['想定問答', 'そうていもんどう', 'hỏi đáp dự kiến'],
      ['例年', 'れいねん', 'hằng năm'],
    ],
  }),
];

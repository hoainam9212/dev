import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/** Week 13 — economy and company news. Level: J1, about a third J1+. */
export const W13: BjtItem[] = [
  item('w13', 'jokyo', 1, {
    material: {
      kind: 'table',
      title: '経済ニュース配信サービス 料金プラン',
      head: ['プラン', '月額', '過去記事の検索', '利用人数'],
      rows: [
        ['ライト', '3,000円', '1年分', '1名'],
        ['スタンダード', '8,000円', '5年分', '3名'],
        ['ビジネス', '15,000円', '10年分', '10名'],
        ['チーム', '12,000円', '1年分', '10名'],
      ],
    },
    script: [
      ['女', '部長、経済ニュースの有料サービスの件なんですが、やっぱり部の八人全員で使えるものがいいですよね。', 'Trưởng bộ phận, về dịch vụ tin kinh tế trả phí, đúng là nên chọn loại cả tám người trong bộ phận cùng dùng được nhỉ.'],
      ['男', 'そうだね。それと、業界の動きを調べるのに、過去の記事も五年ぐらいはさかのぼれないと困るな。', 'Ừ. Thêm nữa, để tìm hiểu biến động ngành thì phải tra lại được bài cũ khoảng năm năm, không thì khó.'],
      ['女', 'そうなると、一番安いのはチームなんですが…。', 'Vậy thì gói rẻ nhất là gói Team, có điều…'],
      ['男', 'いや、それだと条件に合わないだろう。予算は月一万五千円までなら出せるよ。', 'Không, gói đó đâu có đủ điều kiện. Ngân sách tối đa mười lăm nghìn yên một tháng thì chi được.'],
    ],
    questions: [
      [
        'どのプランを契約しますか。',
        ['ライト', 'スタンダード', 'ビジネス', 'チーム'],
        2,
        'Lựa chọn 3: cần cả hai điều kiện: từ 8 người trở lên và tra được bài cũ 5 năm. Chỉ có Business (10 người, 10 năm) đạt, giá 15.000 yên vừa đúng mức trần ngân sách. Lựa chọn 4 đủ người nhưng chỉ tra được 1 năm, chính trưởng bộ phận nói 条件に合わない. Standard có 5 năm nhưng chỉ 3 người.',
      ],
    ],
    points: [
      ['さかのぼる', 'さかのぼる', 'truy ngược về quá khứ'],
      ['有料', 'ゆうりょう', 'có trả phí'],
    ],
  }),
  item('w13', 'jokyo', 2, {
    material: {
      kind: 'table',
      title: '新規取引先候補 信用調査の結果',
      head: ['会社', '設立', '売上高（前期比）', '自己資本比率'],
      rows: [
        ['東和商事', '1985年', '減収', '45%'],
        ['丸江物流', '2019年', '増収', '32%'],
        ['千代田化学', '1972年', '増収', '25%'],
        ['青葉テック', '2010年', '増収', '34%'],
      ],
      note: '調査日：2026年11月',
    },
    script: [
      ['男', '新しい取引先、まずどこと話を進めようか。', 'Đối tác mới thì mình nên bắt đầu bàn với chỗ nào trước?'],
      ['女', '売り上げが落ちているところは、今回はちょっと…。', 'Những chỗ doanh thu đang giảm thì lần này hơi…'],
      ['男', 'そうだね。それに、自己資本比率は三割はほしいな。', 'Đúng. Ngoài ra, tỷ lệ vốn tự có thì muốn ít nhất ba mươi phần trăm.'],
      ['女', 'あとは、設立から十年たっていない会社は見送る、というのが部長の方針でしたよね。', 'Còn nữa, chủ trương của trưởng bộ phận là tạm gác những công ty thành lập chưa đủ mười năm, đúng không ạ?'],
      ['男', 'ああ、そうだった。じゃあ、そこと進めよう。', 'À, đúng rồi. Vậy bàn với chỗ đó thôi.'],
    ],
    questions: [
      [
        '二人はどの会社と話を進めますか。',
        ['東和商事', '丸江物流', '千代田化学', '青葉テック'],
        3,
        'Lựa chọn 4: ba điều kiện là doanh thu tăng, vốn tự có từ 30%, thành lập từ 10 năm trở lên. Aoba Tech: tăng, 34%, thành lập 2010 (16 năm tính tới 2026). Lựa chọn 2 dễ chọn vì tăng thu và 32%, nhưng mới thành lập 2019. Towa có tỷ lệ cao nhất nhưng doanh thu giảm; Chiyoda chỉ 25%.',
      ],
    ],
    points: [
      ['自己資本比率', 'じこしほんひりつ', 'tỷ lệ vốn chủ sở hữu'],
      ['減収', 'げんしゅう', 'doanh thu giảm'],
      ['見送る', 'みおくる', 'tạm gác, hoãn lại'],
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
      kind: 'bars',
      title: '洗剤の国内シェア',
      unit: '%',
      labels: ['2024年', '2025年', '2026年'],
      series: [
        { name: '当社', values: [32, 29, 27] },
        { name: 'A社', values: [25, 28, 31] },
        { name: 'その他', values: [43, 43, 42] },
      ],
    },
    script: [
      ['男', 'ご覧のとおり、当社のシェアはこの三年で五ポイント下がり、今年ついにA社に抜かれました。', 'Như quý vị thấy, thị phần của công ty giảm năm điểm trong ba năm, và năm nay cuối cùng đã bị công ty A vượt.'],
      ['女', 'A社は、ネット通販向けの詰め替え用を増やしていますよね。', 'Công ty A đang tăng loại túi thay thế dành cho bán hàng trực tuyến nhỉ.'],
      ['男', 'ええ。うちは店頭販売中心のままでしたから。そこで来年度は、通販専用の商品を三つ出す計画です。', 'Vâng. Bên mình vẫn tập trung bán tại cửa hàng. Vì thế năm tới dự kiến ra ba sản phẩm chuyên cho bán trực tuyến.'],
      ['女', 'ただ、通販は値下げ競争が激しいですから、利益が出るかどうか…。まず一つに絞って、反応を見てからでもいいんじゃないでしょうか。', 'Có điều bán trực tuyến cạnh tranh giảm giá gay gắt lắm, không biết có lãi không… Trước mắt chỉ chọn một sản phẩm, xem phản ứng rồi tính cũng được mà?'],
      ['男', 'なるほど。では、最初は一つにして、売れ行きを見ながら追加する形に、計画を直します。', 'Ra vậy. Vậy tôi sẽ sửa kế hoạch: ban đầu một sản phẩm, vừa xem tình hình bán vừa bổ sung.'],
    ],
    questions: [
      [
        '当社がA社にシェアで抜かれたのはいつですか。',
        ['2024年', '2025年', '2026年', 'まだ抜かれていない'],
        2,
        'Lựa chọn 3: năm 2026 công ty còn 27%, công ty A lên 31%. Lựa chọn 2 dễ nhầm vì năm 2025 hai bên rất sát, nhưng 29% vẫn hơn 28%. Người nói cũng nói 今年ついに抜かれました.',
      ],
      [
        '通販についての計画はどう変わりましたか。',
        ['まず一つ出して、売れ行きを見て増やす', '通販専用の商品を三つ同時に出す', '通販をやめて店頭販売に力を入れる', '値下げをしてシェアを取り戻す'],
        0,
        'Lựa chọn 1: sau góp ý của người nghe, kế hoạch sửa thành ra một sản phẩm trước rồi bổ sung dần. Lựa chọn 2 là kế hoạch ban đầu, đã bị thay. Không ai đề xuất giảm giá; chính việc cạnh tranh giảm giá là điều đáng lo.',
      ],
    ],
    points: [
      ['シェア', 'しぇあ', 'thị phần'],
      ['詰め替え用', 'つめかえよう', 'loại (túi) để đổ thay'],
      ['売れ行き', 'うれゆき', 'tình hình bán hàng'],
    ],
  }),
  item('w13', 'sogo-chodokkai', 2, {
    material: {
      kind: 'text',
      title: '時給の改定について（パート社員の皆様へ）',
      body: '10月1日から、地域の最低賃金が時給1,050円に引き上げられます。これに合わせ、当社のパート社員の時給を次のとおり改定します。\n・現在の時給が1,050円未満の方：1,080円に引き上げ\n・現在の時給が1,050円以上1,150円未満の方：一律30円引き上げ\n・現在の時給が1,150円以上の方：変更なし（12月の評価で見直します）',
    },
    script: [
      ['店長', '人事の方、ちょっといいですか。うちの店の田村さん、今、時給が千百五十円なんですけど、今回は上がらないんですよね。', 'Anh chị bên nhân sự ơi, cho tôi hỏi chút. Chị Tamura ở cửa hàng tôi hiện lương giờ 1.150 yên, đợt này không được tăng đúng không?'],
      ['人事', 'ええ、規定ではそうなります。', 'Vâng, theo quy định thì như vậy.'],
      ['店長', '田村さんはベテランで、新人の指導もしてくれているんです。新しく入る人が千八十円からになると、差がずいぶん縮まっちゃうんですよね。', 'Chị Tamura làm lâu năm, còn kèm cả người mới. Người mới vào bắt đầu từ 1.080 yên thì khoảng cách bị thu hẹp nhiều quá.'],
      ['人事', 'お気持ちはわかります。十二月の評価のときに、店長から指導役としての働きを書いて推薦していただければ、そこで検討できますよ。', 'Tôi hiểu. Đến đợt đánh giá tháng 12, nếu cửa hàng trưởng viết về công việc hướng dẫn của chị ấy và đề cử, thì có thể xem xét lúc đó.'],
      ['店長', 'わかりました。じゃあ、そうします。', 'Tôi hiểu rồi. Vậy tôi sẽ làm thế.'],
    ],
    questions: [
      [
        '10月から、田村さんの時給はいくらになりますか。',
        ['1,080円', '1,150円', '1,180円', '1,050円'],
        1,
        'Lựa chọn 2: lương hiện tại 1.150 yên thuộc nhóm "từ 1.150 yên trở lên", nên không đổi. Lựa chọn 3 (1.180) là bẫy nếu xếp nhầm vào nhóm cộng 30 yên; nhóm đó chỉ tới dưới 1.150 yên (1,150円未満). 1.080 yên là mức của người mới.',
      ],
      [
        '店長はこのあと、どうするつもりですか。',
        ['田村さんの時給をすぐに上げる', '新人の時給を下げてもらう', '人事部に規定を変えるよう頼む', '12月の評価で田村さんを推薦する'],
        3,
        'Lựa chọn 4: bên nhân sự gợi ý đề cử ở đợt đánh giá tháng 12, cửa hàng trưởng đáp じゃあ、そうします. Lựa chọn 3 dễ chọn vì cửa hàng trưởng có phàn nàn về quy định, nhưng không yêu cầu sửa quy định. Cửa hàng trưởng không có quyền tăng lương ngay.',
      ],
    ],
    points: [
      ['最低賃金', 'さいていちんぎん', 'lương tối thiểu'],
      ['一律', 'いちりつ', 'đồng loạt, như nhau'],
      ['推薦する', 'すいせんする', 'đề cử, tiến cử'],
    ],
  }),
];

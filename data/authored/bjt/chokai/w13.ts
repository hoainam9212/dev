import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/** Week 13 — economy and company news. Level: J1, about a third J1+. */
export const W13: BjtItem[] = [
  item('w13', 'bamen', 1, {
    material: {
      kind: 'scene',
      vi: 'Sảnh công ty. Trên tường có màn hình lớn đang chiếu biểu đồ giá cổ phiếu với đường đi lên. Hai nhân viên, một nam một nữ, đứng trước màn hình. Người nữ giơ tay chỉ vào màn hình. Người nam kẹp dưới nách một tờ báo đã gấp lại. Bộ ghế sofa bên cạnh không có ai ngồi.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['男性が新聞を広げて読んでいます。', '女性がソファに座って画面を見ています。', '女性が画面を指さしています。', '画面には下がっていくグラフが映っています。'],
        2,
        'Lựa chọn 3: người nữ đang chỉ tay vào màn hình (指さす). Lựa chọn 1 dễ chọn vì có tờ báo, nhưng báo đang gấp và kẹp dưới nách, không ai mở ra đọc. Sofa trống, nên lựa chọn 2 sai; biểu đồ đi lên chứ không đi xuống.',
      ],
    ],
    points: [
      ['指さす', 'ゆびさす', 'chỉ tay vào'],
      ['株価', 'かぶか', 'giá cổ phiếu'],
    ],
  }),
  item('w13', 'bamen', 2, {
    material: {
      kind: 'scene',
      vi: 'Buổi họp báo. Trên tường phía sau treo băng rôn ghi 「経営統合に関する記者会見」. Hai người đàn ông mặc vest đứng sau một bàn dài, bắt tay nhau và cùng quay mặt về phía ống kính. Trên bàn có hai tập hồ sơ đã đóng lại và hai cây bút. Phía trước, các phóng viên ngồi giơ máy ảnh lên chụp.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['二人が契約書に署名しているところです。', '記者たちが席を立とうとしています。', '二人が記者に向かって頭を下げています。', '二人が握手をしながら写真を撮られています。'],
        3,
        'Lựa chọn 4: hai người bắt tay (握手) trong lúc phóng viên chụp ảnh, nên dùng bị động 撮られている. Lựa chọn 1 dễ chọn vì trên bàn có hồ sơ và bút, nhưng hồ sơ đã đóng, không ai đang ký. Phóng viên vẫn ngồi chụp; hai người không cúi đầu.',
      ],
    ],
    points: [
      ['経営統合', 'けいえいとうごう', 'sáp nhập, hợp nhất kinh doanh'],
      ['記者会見', 'きしゃかいけん', 'họp báo'],
      ['握手', 'あくしゅ', 'bắt tay'],
    ],
  }),
  item('w13', 'hatsugen', 1, {
    script: [['状況', '取引先との雑談で、「円安で御社も大変でしょう」と言われました。実際、輸入原料が多くて苦しいのですが、相手を不安にさせずに答えたいです。何と言いますか。', 'Khi nói chuyện phiếm với đối tác, bạn được hỏi: "Đồng yên yếu chắc quý công ty cũng vất vả nhỉ". Thực tế công ty dùng nhiều nguyên liệu nhập khẩu nên đang khó khăn, nhưng bạn muốn trả lời mà không làm đối tác lo lắng. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        [
          'ええ、正直厳しいです。それで御社には、来月から値下げをお願いしたいんですが。',
          'いえ、影響はまったくございません。むしろ好調すぎて困っているくらいです。',
          'はい、もう円安のせいで、来年まで会社が持つかどうかわからない状態です。',
          '原料の多くが輸入なので影響はありますが、調達先を広げるなどして対応しております。',
        ],
        3,
        'Lựa chọn 4: thừa nhận có ảnh hưởng nhưng nói rõ công ty đang xử lý (mở rộng nguồn cung), nên đối tác yên tâm. Lựa chọn 2 không làm ai lo, nhưng là nói dối, trái với tình huống. Lựa chọn 3 làm đối tác lo về khả năng trả nợ, giao hàng; lựa chọn 1 lợi dụng chuyện phiếm để đòi giảm giá.',
      ],
    ],
    points: [
      ['円安', 'えんやす', 'đồng yên yếu'],
      ['調達先', 'ちょうたつさき', 'nguồn cung ứng'],
    ],
  }),
  item('w13', 'hatsugen', 2, {
    script: [['状況', '今朝の経済新聞に自社の新工場の記事が載りました。部長はまだ読んでいないようです。部長に伝えます。何と言いますか。', 'Sáng nay báo kinh tế đăng bài về nhà máy mới của công ty. Có vẻ trưởng bộ phận chưa đọc. Bạn báo cho trưởng bộ phận. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        [
          '部長、今朝の経済新聞に新工場の記事が載っておりましたが、もうご覧になりましたか。',
          '部長、今朝の経済新聞に新工場の記事が載っておりましたが、もう拝見なさいましたか。',
          '部長、今朝の経済新聞に新工場の記事が載っておりましたので、お読みしておきました。',
          '部長、今朝の経済新聞に新工場の記事が載るそうですが、もうご存じでしたか。',
        ],
        0,
        'Lựa chọn 1: hành động "xem" của trưởng bộ phận dùng tôn kính ngữ ご覧になる. Lựa chọn 2 ghép khiêm nhường ngữ 拝見 với なさる, sai hướng kính ngữ. Lựa chọn 3 (お読みしておきました) nghĩa là "tôi đã đọc hộ", không phải báo tin. Lựa chọn 4 nói bài "sẽ được đăng" (載るそうです), trái với việc bài đã ra sáng nay.',
      ],
    ],
    points: [
      ['ご覧になる', 'ごらんになる', 'xem (tôn kính ngữ)'],
      ['記事が載る', 'きじがのる', 'bài báo được đăng'],
    ],
  }),
  item('w13', 'hatsugen', 3, {
    script: [['状況', '決算説明会の受付にいます。来場した人から「配付資料が入っていない」と言われました。予備は会場の後ろに置いてあります。何と言いますか。', 'Bạn ở quầy lễ tân buổi giải trình kết quả kinh doanh. Một người đến dự nói "trong túi không có tài liệu phát". Tài liệu dự phòng để ở cuối hội trường. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        [
          '大変失礼いたしました。すぐにお持ちいたしますので、こちらで少々お待ちいただけますか。',
          '大変失礼いたしました。資料は会場の後ろにございますので、ご自由にお持ちしてください。',
          '大変失礼いたしました。資料は人数分しか用意しておりませんので、ご了承ください。',
          '大変失礼いたしました。資料が入っていないのは、配った者の確認不足かと思われます。',
        ],
        0,
        'Lựa chọn 1: xin lỗi rồi tự mình đi lấy (お持ちいたします, khiêm nhường ngữ) và mời khách đợi. Lựa chọn 2 dễ chọn vì đúng chỗ để tài liệu, nhưng お持ちしてください dùng khiêm nhường ngữ cho hành động của khách nên sai. Lựa chọn 3 trái sự thật (còn bản dự phòng). Lựa chọn 4 chỉ giải thích lỗi, không giải quyết.',
      ],
    ],
    points: [
      ['決算説明会', 'けっさんせつめいかい', 'buổi giải trình kết quả kinh doanh'],
      ['配付資料', 'はいふしりょう', 'tài liệu phát cho người dự'],
    ],
  }),
  item('w13', 'hatsugen', 4, {
    script: [['状況', '会議で部長が「為替の動きを見て、値上げの時期はもう少し様子を見よう」と言いました。あなたも賛成ですが、新しい価格表の印刷の締め切りが来月十日なので、それまでに決めてほしいです。何と言いますか。', 'Trong cuộc họp, trưởng bộ phận nói: "Xem diễn biến tỷ giá rồi hãy tính, thời điểm tăng giá cứ chờ thêm một chút". Bạn cũng đồng ý, nhưng hạn in bảng giá mới là ngày 10 tháng sau nên muốn được quyết trước ngày đó. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        [
          '賛成です。では、価格表の印刷は締め切りに関係なく、決まってから進めることにします。',
          '賛成です。ただ、価格表の印刷が来月十日締め切りですので、それまでにご判断いただけますか。',
          '反対です。価格表の印刷が来月十日締め切りですから、今日この場で値上げを決めてください。',
          '賛成です。価格表の印刷の締め切りについては、部長のほうで印刷会社と交渉してください。',
        ],
        1,
        'Lựa chọn 2: đồng ý trước, rồi nêu mốc hạn và nhờ quyết trước ngày đó (ご判断いただけますか). Lựa chọn 1 cũng đồng ý nhưng bỏ qua hạn in, trái với điều bạn muốn. Lựa chọn 3 phản đối, trong khi bạn đồng ý. Lựa chọn 4 đẩy việc cho cấp trên.',
      ],
    ],
    points: [
      ['為替', 'かわせ', 'tỷ giá hối đoái'],
      ['様子を見る', 'ようすをみる', 'chờ xem tình hình'],
      ['締め切り', 'しめきり', 'hạn chót'],
    ],
  }),
  item('w13', 'sogo-chokai', 1, {
    script: [
      ['アナウンサー', '経済ニュースです。家電大手の北斗電機は昨日、今年度の業績予想を下方修正すると発表しました。', 'Tin kinh tế. Hôm qua, hãng điện gia dụng lớn Hokuto Denki công bố điều chỉnh giảm dự báo kết quả kinh doanh năm tài chính này.'],
      ['アナウンサー', '売上高は当初の予想より三百億円少ない八千二百億円、営業利益は当初の予想を二割下回る四百億円となる見通しです。', 'Doanh thu dự kiến đạt 820 tỷ yên, ít hơn dự báo ban đầu 30 tỷ yên; lợi nhuận kinh doanh dự kiến 40 tỷ yên, thấp hơn dự báo ban đầu hai mươi phần trăm.'],
      ['アナウンサー', '主な原因は、海外でのエアコンの販売不振です。一方、国内では省エネ型の冷蔵庫が好調で、国内事業に限れば増益を確保する見込みです。', 'Nguyên nhân chính là điều hoà bán ế ở nước ngoài. Mặt khác, ở trong nước tủ lạnh tiết kiệm điện bán chạy, nếu chỉ tính mảng trong nước thì vẫn giữ được mức tăng lợi nhuận.'],
      ['アナウンサー', '同社は来年度から、海外に二か所ある生産拠点を一か所に集約し、コストの削減を図るとしています。', 'Công ty cho biết từ năm tới sẽ gộp hai cơ sở sản xuất ở nước ngoài thành một để cắt giảm chi phí.'],
    ],
    questions: [
      [
        '業績予想を下方修正した主な理由は何ですか。',
        ['海外でエアコンの販売が伸びなかったから', '国内で省エネ型の冷蔵庫が売れなかったから', '海外にある工場の一つを閉鎖したから', '省エネ型製品の開発が予定より遅れたから'],
        0,
        'Lựa chọn 1: 販売不振 = bán kém; nguyên nhân chính là điều hoà ở nước ngoài. Lựa chọn 2 đảo ngược tin: tủ lạnh trong nước bán chạy. Lựa chọn 3 dễ chọn vì có nhắc việc gộp cơ sở sản xuất, nhưng đó là kế hoạch từ năm sau, không phải nguyên nhân.',
      ],
      [
        'このニュースの内容と合っているのはどれですか。',
        ['売上高は八千五百億円になる見通しだ', '営業利益は当初の予想より二割増える', '国内事業だけを見ると、利益は増える見込みだ', '来年度から海外の生産拠点を二か所に増やす'],
        2,
        'Lựa chọn 3: 国内事業に限れば増益 = riêng mảng trong nước thì lợi nhuận tăng. Lựa chọn 1 là con số dự báo ban đầu (8.200 + 300 = 8.500 tỷ), không phải con số mới. Lợi nhuận giảm hai mươi phần trăm chứ không tăng; cơ sở sản xuất giảm từ hai xuống một.',
      ],
    ],
    points: [
      ['下方修正', 'かほうしゅうせい', 'điều chỉnh giảm (dự báo)'],
      ['販売不振', 'はんばいふしん', 'bán hàng ế ẩm'],
      ['増益', 'ぞうえき', 'tăng lợi nhuận'],
      ['集約する', 'しゅうやくする', 'gom lại, tập trung'],
    ],
  }),
  item('w13', 'sogo-chokai', 2, {
    script: [
      ['男', '新聞見た？南星食品、来月から主力のレトルトカレーを一割値下げするって。', 'Xem báo chưa? Nansei Foods từ tháng sau sẽ giảm giá mười phần trăm món cà ri đóng gói chủ lực.'],
      ['女', '見ました。うちもすぐに対抗しないと、スーパーの棚、取られちゃいますよね。', 'Xem rồi. Bên mình mà không đáp trả ngay thì mất chỗ trên kệ siêu thị mất.'],
      ['男', 'うーん、気持ちはわかるけど、うちは原料を国産に切り替えたばかりで、コストが上がってるからなあ。同じだけ下げたら、売れば売るほど赤字だよ。', 'Ừm, hiểu cảm giác đó, nhưng bên mình vừa chuyển sang nguyên liệu trong nước, chi phí đang tăng. Giảm bằng họ thì càng bán càng lỗ.'],
      ['女', 'じゃあ、どうするんですか。', 'Vậy làm sao ạ?'],
      ['男', '値段じゃなくて、国産原料っていうところを、もっと店頭で打ち出したらどうかな。ポップを作り直すとか、試食の回数を増やすとか。', 'Thay vì giá, hay là nhấn mạnh hơn ở cửa hàng điểm "nguyên liệu trong nước"? Làm lại bảng quảng cáo nhỏ, tăng số buổi cho ăn thử chẳng hạn.'],
      ['女', 'なるほど。じゃあ、来週の営業会議で課長に提案してみましょうか。', 'Ra vậy. Thế tuần sau trong cuộc họp kinh doanh mình đề xuất với trưởng phòng thử nhé?'],
      ['男', 'そうだね。その前に、先月の店頭での売り上げのデータ、まとめておいてくれる？', 'Ừ. Trước đó, em tổng hợp giúp số liệu doanh thu tại cửa hàng tháng trước nhé?'],
      ['女', 'はい、今日中にやっておきます。', 'Vâng, trong hôm nay em làm.'],
    ],
    questions: [
      [
        '男の人は値下げについてどう考えていますか。',
        ['棚を守るために、南星食品より大きく値下げするべきだ', '原料費が上がっているので、値下げはしないほうがいい', '国産の原料をやめて輸入品に戻せば、値下げしてもいい', '値下げは課長が決めることなので、自分の意見は特にない'],
        1,
        'Lựa chọn 2: anh ta không nói thẳng "phản đối" mà dùng 気持ちはわかるけど rồi nêu lý do: chi phí tăng, giảm giá thì càng bán càng lỗ, và đề xuất cạnh tranh bằng điểm khác. Lựa chọn 3 lấy chữ 国産 trong bài, nhưng anh ta muốn dùng nguyên liệu trong nước làm điểm mạnh, không muốn bỏ.',
      ],
      [
        '女の人はこのあとまず何をしますか。',
        ['営業会議で課長に提案する', '先月の売り上げのデータをまとめる', '店頭に置くポップを作り直す', 'スーパーでの試食の回数を増やす'],
        1,
        'Lựa chọn 2: được nhờ tổng hợp số liệu "trước đó" (その前に) và đáp 今日中にやっておきます. Lựa chọn 1 là việc của cuộc họp tuần sau, làm sau. Làm lại bảng quảng cáo và tăng buổi ăn thử mới chỉ là ý tưởng sẽ đề xuất.',
      ],
    ],
    points: [
      ['対抗する', 'たいこうする', 'đối phó, cạnh tranh lại'],
      ['打ち出す', 'うちだす', 'đưa ra, nhấn mạnh (thông điệp)'],
      ['赤字', 'あかじ', 'lỗ'],
    ],
  }),
];

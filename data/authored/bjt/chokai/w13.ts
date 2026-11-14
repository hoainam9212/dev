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

  // ── 発言聴解 ──
  item('w13', 'hatsugen', 1, {
    script: [['状況', '取引先の社長が経済誌の取材を受けた記事を読みました。社長に会ったとき、そのことを伝えます。何と言いますか。', 'Bạn đã đọc bài báo giám đốc công ty đối tác trả lời phỏng vấn tạp chí kinh tế. Khi gặp giám đốc, bạn nhắc tới chuyện đó. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['先日の雑誌の記事、ご覧になりました。', '先日の雑誌の記事、拝見なさいました。', '先日の雑誌の記事、拝見いたしました。', '先日の雑誌の記事、拝見させました。'],
        2,
        'Người đọc bài là mình, nên dùng khiêm nhường ngữ 拝見いたしました (lựa chọn 3). Lựa chọn 1 dễ chọn vì nghe kính trọng, nhưng ご覧になる là tôn kính ngữ: đem dùng cho việc mình đọc là sai chủ thể, nghe như đang nói "ngài đã xem". Lựa chọn 2 trộn khiêm nhường 拝見 với tôn kính なさる. Lựa chọn 4 là thể sai khiến, sai nghĩa.',
      ],
    ],
    points: [
      ['経済誌', 'けいざいし', 'tạp chí kinh tế'],
      ['取材', 'しゅざい', 'phỏng vấn, lấy tin'],
      ['拝見する', 'はいけんする', '(tôi) xem — khiêm nhường ngữ'],
    ],
  }),
  item('w13', 'hatsugen', 2, {
    script: [['状況', '株主総会の受付で、議決権行使書を忘れた株主に、本人確認ができれば入場できると伝えます。何と言いますか。', 'Ở bàn lễ tân đại hội cổ đông, bạn báo với một cổ đông quên phiếu biểu quyết rằng nếu xác nhận được danh tính thì vẫn vào được. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['ご本人と確認できれば、ご入場いただけます。', 'ご本人と確認できれば、入場させていただけます。', 'ご本人と確認できれば、ご入場して差し上げます。', 'ご本人と確認できれば、ご入場いたせます。'],
        0,
        'Người vào hội trường là cổ đông, nên nói ご入場いただけます (lựa chọn 1). Lựa chọn 2 dễ chọn vì có いただけます, nhưng 入場させていただく là cách nói khiêm nhường cho việc CỦA MÌNH, nghe như chính nhân viên xin được vào. Lựa chọn 3 dùng 差し上げる, như ban ơn cho khách. Lựa chọn 4 dùng khiêm nhường いたす cho hành động của khách.',
      ],
    ],
    points: [
      ['株主総会', 'かぶぬしそうかい', 'đại hội cổ đông'],
      ['議決権行使書', 'ぎけつけんこうししょ', 'phiếu thực hiện quyền biểu quyết'],
      ['本人確認', 'ほんにんかくにん', 'xác nhận danh tính'],
    ],
  }),
  item('w13', 'hatsugen', 3, {
    script: [['状況', '課長に、取引先の社長が話していた業界の見通しを伝えます。社長から聞いた話だと前置きします。何と言いますか。', 'Bạn kể với trưởng phòng dự báo về ngành mà giám đốc công ty đối tác đã nói. Bạn mở đầu bằng việc đây là chuyện nghe từ vị giám đốc đó. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['先方の社長が申し上げていたのですが。', '先方の社長が申されていたのですが。', '先方の社長が拝聴していたのですが。', '先方の社長がおっしゃっていたのですが。'],
        3,
        'Người nói là giám đốc bên ngoài công ty. Dù đang nói với cấp trên của mình, hành động của người ngoài vẫn dùng tôn kính ngữ: おっしゃっていた (lựa chọn 4). Lựa chọn 1 dễ chọn vì 申し上げる nghe rất lễ phép, nhưng đó là khiêm nhường ngữ, hạ thấp chính vị giám đốc. Lựa chọn 2 申される là lỗi trộn kính ngữ. Lựa chọn 3 拝聴 là "kính cẩn nghe", sai nghĩa.',
      ],
    ],
    points: [
      ['見通し', 'みとおし', 'dự báo, triển vọng'],
      ['前置き', 'まえおき', 'lời mở đầu'],
      ['先方', 'せんぽう', 'phía bên kia (đối tác)'],
    ],
  }),
  item('w13', 'hatsugen', 4, {
    script: [['状況', '取引先の会長が業界の賞を受賞したことを知りました。担当者に電話で、会長にお祝いを伝えてほしいと頼みます。何と言いますか。', 'Bạn biết chủ tịch công ty đối tác vừa nhận giải thưởng của ngành. Bạn gọi điện cho người phụ trách, nhờ chuyển lời chúc mừng tới chủ tịch. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['会長にくれぐれもよろしくお伝えします。', '会長にくれぐれもよろしくお伝えください。', '会長にくれぐれもお大事にとお伝えください。', '会長にくれぐれもよろしく申し伝えてください。'],
        1,
        'Người chuyển lời là người phụ trách bên đối tác, nên nhờ: お伝えください (lựa chọn 2). Lựa chọn 4 dễ chọn vì 申し伝える cũng có nghĩa "chuyển lời", nhưng đó là khiêm nhường ngữ dùng cho việc chuyển lời tới người NHÀ MÌNH; không thể bảo người ngoài 申し伝えて với chủ tịch của họ. Lựa chọn 1 thành "tôi sẽ chuyển lời". Lựa chọn 3 là lời thăm người ốm, sai tình huống.',
      ],
    ],
    points: [
      ['受賞する', 'じゅしょうする', 'nhận giải thưởng'],
      ['くれぐれも', 'くれぐれも', 'thật lòng, hết sức (nhấn mạnh lời nhờ)'],
      ['申し伝える', 'もうしつたえる', '(tôi) chuyển lời — khiêm nhường ngữ'],
    ],
  }),

  // ── 総合聴解 ──
  item('w13', 'sogo-chokai', 1, {
    script: [
      ['男', '例のベトナム工場の部品の件だけど、国内の工場に生産を戻す話、本当に進めるつもり？', 'Chuyện linh kiện ở nhà máy Việt Nam ấy, cô thật sự định tiến hành đưa sản xuất về lại nhà máy trong nước à?'],
      ['女', 'はい。円安で、コストの差はかなり縮まってきています。ただ、正直なところ、コストだけで比べれば、まだ海外のほうがやや有利なんです。', 'Vâng. Do đồng yên yếu, chênh lệch chi phí đã thu hẹp khá nhiều. Có điều nói thật, nếu chỉ so chi phí thì ở nước ngoài vẫn lợi hơn một chút.'],
      ['男', 'だったら、無理に戻さなくてもいいんじゃないの。', 'Thế thì đâu cần cố đưa về.'],
      ['女', 'それが、一番大きいのは納期なんです。船便だと届くまでに三週間かかるので、お客様から急な仕様の変更があっても、すぐには対応できません。国内なら、変更を受けてから五日で納められます。', 'Chuyện là, điều lớn nhất là thời hạn giao hàng. Đi đường biển mất ba tuần mới tới, nên khách hàng có đột ngột đổi thông số thì cũng không đáp ứng ngay được. Ở trong nước thì từ lúc nhận yêu cầu đổi, năm ngày là giao được.'],
      ['男', 'なるほど。でも、国内の工場は今でも人手が足りないって聞いてるよ。', 'Ra vậy. Nhưng tôi nghe nói nhà máy trong nước hiện giờ cũng đang thiếu người.'],
      ['女', 'はい。そこで、最初は全部ではなく、仕様の変更が多い三品目だけを移して、残りは今までどおりベトナムで作る、という形を考えています。', 'Vâng. Vì thế lúc đầu tôi tính không chuyển hết, chỉ chuyển ba mặt hàng hay bị đổi thông số, phần còn lại vẫn làm ở Việt Nam như cũ.'],
      ['男', '三品目だけか。それなら、工場の人員も今のままで回せそうだね。', 'Chỉ ba mặt hàng à. Thế thì nhân lực nhà máy giữ như bây giờ chắc cũng xoay được.'],
      ['女', 'はい。それに、品質の確認も、技術者がすぐ現場に行けるので、楽になります。', 'Vâng. Thêm nữa, việc kiểm tra chất lượng cũng nhẹ hơn vì kỹ sư có thể đến hiện trường ngay.'],
      ['男', '品質は、ベトナムの工場も安定してるから、そこはあまり変わらないと思うけどね。まあ、いいだろう。役員会に出す資料、作ってみて。', 'Chất lượng thì nhà máy Việt Nam cũng ổn định, nên chỗ đó tôi nghĩ không khác mấy đâu. Thôi, được rồi. Cô thử làm tài liệu trình hội đồng quản trị đi.'],
      ['女', 'ありがとうございます。今週中にまとめます。', 'Cảm ơn anh. Trong tuần này tôi sẽ tổng hợp xong.'],
    ],
    questions: [
      [
        '女の人は、生産を国内に戻す一番の利点は何だと考えていますか。',
        ['部品を作るコストを海外より下げられること', '技術者が品質をすぐ確かめに行けること', '国内の工場の人手不足を解消できること', '取引先の急な変更にすぐ応えられること'],
        3,
        'Người phụ nữ nói 一番大きいのは納期: khách đổi thông số thì trong nước năm ngày là giao được, đường biển mất ba tuần (lựa chọn 4). Lựa chọn 2 dễ chọn vì chị có nói, nhưng chỉ là lợi ích thêm (それに), và người đàn ông còn cho là không khác mấy. Lựa chọn 1 trái lời chị: chỉ xét chi phí thì nước ngoài vẫn lợi hơn. Lựa chọn 3 là lo ngại của người đàn ông, không phải lợi ích.',
      ],
    ],
    points: [
      ['円安', 'えんやす', 'đồng yên yếu'],
      ['納期', 'のうき', 'thời hạn giao hàng'],
      ['仕様', 'しよう', 'thông số kỹ thuật'],
      ['品目', 'ひんもく', 'mặt hàng'],
    ],
  }),
  item('w13', 'sogo-chokai', 2, {
    script: [
      ['女', '原材料の値上がりを受けて、四月から全商品を一律八パーセント値上げする案をまとめました。', 'Trước việc nguyên liệu tăng giá, tôi đã soạn phương án từ tháng tư tăng giá đồng loạt tám phần trăm cho mọi sản phẩm.'],
      ['男2', '経理としては、八パーセントでも、利益が去年の水準に戻るかどうか、ぎりぎりのところです。', 'Về phía kế toán, dù tám phần trăm thì lợi nhuận có về lại mức năm ngoái hay không cũng còn sát nút.'],
      ['男', 'うーん、一律というのは、ちょっと引っかかるなあ。主力のAシリーズは、競合他社がまだ値上げしていないだろう。うちだけ上げたら、シェアを取られかねないよ。', 'Ừm, đồng loạt thì tôi hơi vướng. Dòng chủ lực A thì các đối thủ vẫn chưa tăng giá phải không. Mình tăng một mình thì có khi bị giành mất thị phần.'],
      ['女', 'では、Aシリーズは据え置いて、ほかの商品を少し多めに上げる、というのはいかがでしょう。十二パーセント程度になりますが。', 'Vậy giữ nguyên giá dòng A, các sản phẩm khác tăng nhiều hơn một chút thì sao ạ? Sẽ vào khoảng mười hai phần trăm.'],
      ['男2', '十二パーセントだと、取引先の反発が心配ですね。', 'Mười hai phần trăm thì tôi lo các đối tác sẽ phản đối.'],
      ['男', 'そうだね。それに、四月というのも急すぎる。取引先への説明に、最低でも三か月はほしい。', 'Đúng vậy. Với lại tháng tư cũng gấp quá. Để giải thích với đối tác, ít nhất cũng cần ba tháng.'],
      ['女', 'そうしますと、七月からということになりますが、その間の利益は……。', 'Như vậy thì sẽ là từ tháng bảy, nhưng lợi nhuận trong khoảng đó thì…'],
      ['男2', '第一四半期は、多少の減益は仕方ないでしょう。年間で見れば、何とかなります。', 'Quý một thì giảm lợi nhuận chút ít cũng đành. Nhìn cả năm thì vẫn xoay xở được.'],
      ['男', 'じゃあ、Aシリーズは据え置き、ほかは十パーセント、七月から。十二じゃなくて十に抑えて、足りない分は物流費の見直しで補おう。', 'Vậy dòng A giữ nguyên, các loại khác mười phần trăm, từ tháng bảy. Giữ ở mười chứ không phải mười hai, phần thiếu thì bù bằng cách rà soát lại chi phí vận chuyển.'],
      ['女', '承知しました。では、その内容で資料を作り直して、明日までにお送りします。', 'Tôi hiểu rồi. Vậy tôi sẽ làm lại tài liệu theo nội dung đó và gửi trước ngày mai.'],
    ],
    questions: [
      [
        '値上げはどのように決まりましたか。',
        ['四月から、すべての商品を一律に上げる', '七月から、主力以外の商品だけを上げる', '七月から、主力も含めて十パーセント上げる', '四月から、主力以外を十二パーセント上げる'],
        1,
        'Kết luận sau じゃあ: dòng chủ lực A giữ giá, các sản phẩm khác tăng mười phần trăm, bắt đầu tháng bảy (lựa chọn 2). Lựa chọn 3 dễ chọn vì đúng tháng bảy và đúng mười phần trăm, nhưng dòng A KHÔNG tăng. Lựa chọn 1 là phương án ban đầu bị bác; lựa chọn 4 là đề xuất thứ hai, bị bác cả mức mười hai phần trăm lẫn thời điểm tháng tư.',
      ],
    ],
    points: [
      ['一律', 'いちりつ', 'đồng loạt, như nhau'],
      ['据え置く', 'すえおく', 'giữ nguyên (giá)'],
      ['反発', 'はんぱつ', 'phản đối, phản ứng ngược'],
      ['減益', 'げんえき', 'giảm lợi nhuận'],
    ],
  }),
  item('w13', 'sogo-chokai', 3, {
    script: [
      ['男', '今朝の東西経済新聞、見た？うちが大阪工場を閉鎖するっていう記事。', 'Cô xem báo Kinh tế Đông Tây sáng nay chưa? Bài nói công ty mình sẽ đóng cửa nhà máy Osaka ấy.'],
      ['女', 'はい、見ました。お問い合わせの電話も、もう何件か来ています。あれは誤報ですよね。すぐ新聞社に訂正を求めましょうか。', 'Vâng, tôi xem rồi. Đã có mấy cuộc điện thoại hỏi rồi ạ. Bài đó đưa tin sai phải không ạ. Mình yêu cầu tờ báo đính chính ngay nhé?'],
      ['男', 'いや、ちょっと待って。閉鎖は決まってないけど、生産ラインの縮小は、役員会で検討中なんだよ。全くのでたらめとは言い切れないんだ。', 'Không, khoan đã. Đóng cửa thì chưa quyết, nhưng việc thu hẹp dây chuyền sản xuất đang được hội đồng quản trị xem xét. Không thể nói là hoàn toàn bịa đặt được.'],
      ['女', 'そうなんですか。それだと、訂正を求めるのは難しいですね。', 'Thế ạ. Vậy thì yêu cầu đính chính cũng khó nhỉ.'],
      ['男', 'うん。それより、取引先が不安になるのが一番まずい。取引先向けに、説明の文書を出したほうがいいと思う。', 'Ừ. Quan trọng hơn, để đối tác lo lắng là tệ nhất. Tôi nghĩ nên gửi một văn bản giải thích cho các đối tác.'],
      ['女', 'わかりました。すぐ文案を作ります。', 'Tôi hiểu rồi. Tôi sẽ soạn bản nháp ngay.'],
      ['男', 'ただ、その前に、経営企画部に、今どこまで決まっていて、どこまで外に言っていいのか、確認を取ってくれる？そこがはっきりしないと、文書が書けないから。', 'Có điều trước đó, cô hỏi phòng kế hoạch kinh doanh giúp tôi xem hiện đã quyết đến đâu và được nói ra ngoài đến mức nào nhé? Chỗ đó chưa rõ thì không viết văn bản được.'],
      ['女', '承知しました。あのう、電話のお問い合わせには、どう答えておきましょう。広報の窓口だけでなく、営業のほうにもかかってきているようなんですが。', 'Vâng ạ. À, còn các cuộc gọi hỏi thăm thì mình trả lời thế nào ạ? Hình như không chỉ gọi vào đầu mối truyền thông mà còn gọi cả sang bên kinh doanh nữa.'],
      ['男', '当面は「現時点で決定した事実はございません」で統一して。その線で、あとで想定問答も作ってほしい。', 'Trước mắt thống nhất câu "Hiện tại chưa có quyết định nào". Theo hướng đó, sau này cô làm thêm bộ hỏi đáp dự kiến nhé.'],
      ['女', 'はい。では、すぐ経営企画部に連絡します。返事が来しだい、文案に取りかかります。', 'Vâng. Vậy tôi liên lạc với phòng kế hoạch kinh doanh ngay. Có trả lời là tôi bắt tay vào soạn bản nháp.'],
    ],
    questions: [
      [
        '女の人はこのあとまず何をしますか。',
        ['どこまで公表できるか社内で確認する', '新聞社に記事の訂正を申し入れる', '取引先に送る説明の文書を書く', '問い合わせに答えるための想定問答を作る'],
        0,
        'Trước khi viết văn bản, người đàn ông nhờ hỏi phòng kế hoạch kinh doanh xem đã quyết đến đâu, được nói ra ngoài đến đâu; chị đáp すぐ経営企画部に連絡します (lựa chọn 1). Lựa chọn 3 dễ chọn vì chị định soạn ngay, nhưng bị chặn bằng その前に. Lựa chọn 2 là đề xuất đã bị bác vì tin không hoàn toàn sai. Lựa chọn 4 là việc làm sau (あとで).',
      ],
    ],
    points: [
      ['誤報', 'ごほう', 'đưa tin sai'],
      ['訂正', 'ていせい', 'đính chính'],
      ['縮小', 'しゅくしょう', 'thu hẹp'],
      ['想定問答', 'そうていもんどう', 'bộ hỏi đáp dự kiến'],
    ],
  }),
  item('w13', 'sogo-chokai', 4, {
    script: [
      ['女', '部長、来週の決算説明会の資料、一度見ていただけますか。', 'Thưa trưởng bộ phận, anh xem qua giúp tôi tài liệu buổi giải trình kết quả kinh doanh tuần sau được không ạ?'],
      ['男', 'うん。……売上のグラフ、前の四半期と比べてるんだね。', 'Ừ… Biểu đồ doanh thu đang so với quý trước nhỉ.'],
      ['女', 'はい。前の四半期より一割増えているので、伸びがわかりやすいかと思いまして。', 'Vâng. Tăng mười phần trăm so với quý trước nên tôi nghĩ sẽ dễ thấy mức tăng trưởng.'],
      ['男', 'うちの商品は夏に売れるから、春と比べたら増えて当たり前なんだよ。投資家はそこを見てくる。去年の同じ時期と比べないと、意味がないんじゃないかな。', 'Hàng của mình bán chạy vào mùa hè, so với mùa xuân thì tăng là đương nhiên. Nhà đầu tư sẽ nhìn vào chỗ đó. Không so với cùng kỳ năm ngoái thì tôi e là không có ý nghĩa.'],
      ['女', 'そうですね……。去年の同じ時期と比べますと、二パーセントの増加にとどまりますが。', 'Vâng… So với cùng kỳ năm ngoái thì chỉ tăng có hai phần trăm thôi ạ.'],
      ['男', 'それでいいよ。小さくても、正直に出したほうが信頼される。数字をよく見せようとして、あとで質問されるほうがよっぽど困るからね。', 'Thế cũng được. Dù nhỏ, đưa ra trung thực thì sẽ được tin tưởng hơn. Cố làm con số trông đẹp rồi sau đó bị chất vấn thì còn khổ hơn nhiều.'],
      ['女', 'わかりました。あと、事業別の利益の表なんですが、文字が細かいので、グラフに直そうかと考えていたんですが。', 'Tôi hiểu rồi. Còn bảng lợi nhuận theo từng mảng kinh doanh, chữ nhỏ quá nên tôi định chuyển thành biểu đồ ạ.'],
      ['男', 'いや、表は、アナリストが数字を書き写すから、そのままのほうがいい。', 'Không, bảng thì giới phân tích sẽ chép lại các con số, nên cứ để nguyên là hơn.'],
      ['女', 'では、表はこのままにします。文字だけ、少し大きくしてみます。', 'Vậy tôi để nguyên bảng. Chỉ thử làm chữ to hơn một chút.'],
      ['男', 'それから、最後のページの今後の見通し、為替の前提が書いてないね。何円で計算したのか、一行入れておいて。', 'Còn nữa, trang cuối phần triển vọng sắp tới chưa ghi tỷ giá giả định. Cô thêm một dòng tính theo bao nhiêu yên nhé.'],
      ['女', 'あ、はい。それはすぐに。売上のグラフのほうは、今日中に作り直します。', 'À, vâng. Việc đó tôi làm ngay. Còn biểu đồ doanh thu thì trong hôm nay tôi sẽ làm lại.'],
    ],
    questions: [
      [
        '女の人は売上のグラフをどのように直しますか。',
        ['前の四半期との比較を大きく示す', '事業別の利益の表をグラフに変える', '去年の同じ時期と比べる形にする', '為替の前提となる数字を書き加える'],
        2,
        'Trưởng bộ phận nói hàng bán chạy mùa hè nên so với quý trước thì tăng là đương nhiên; phải so với cùng kỳ năm ngoái (lựa chọn 3), dù chỉ tăng hai phần trăm. Lựa chọn 1 là cách đang làm, bị yêu cầu sửa. Lựa chọn 2 là ý của người phụ nữ, bị bác. Lựa chọn 4 dễ chọn vì cũng là việc phải sửa, nhưng ở trang cuối, không phải biểu đồ doanh thu.',
      ],
    ],
    points: [
      ['決算説明会', 'けっさんせつめいかい', 'buổi giải trình kết quả kinh doanh'],
      ['四半期', 'しはんき', 'quý'],
      ['書き写す', 'かきうつす', 'chép lại'],
      ['前提', 'ぜんてい', 'tiền đề, giả định'],
    ],
  }),
];

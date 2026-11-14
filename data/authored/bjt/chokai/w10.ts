import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/** Week 10 — contracts, quotations and deliveries. Level: J1. */
export const W10: BjtItem[] = [
  item('w10', 'bamen', 1, {
    material: {
      kind: 'scene',
      vi: 'Khu nhận hàng của nhà kho. Các thùng hàng đã được xếp sẵn trên một xe đẩy. Một tài xế xe tải đứng chờ, tay không. Một nữ nhân viên kho đặt tờ phiếu giao hàng lên nắp thùng và đang ấn con dấu nhận hàng lên phiếu.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['運転手がトラックから荷物を降ろしています。', '女性が伝票に受領印を押しています。', '女性が台車を押しています。', '運転手が伝票に記入しています。'],
        1,
        'Cô ấy đang đóng dấu nhận hàng lên phiếu: 受領印を押す. Hàng đã được xếp lên xe đẩy nên không còn bốc dỡ. Tài xế đứng chờ tay không, không viết gì. Xe đẩy đứng yên.',
      ],
    ],
    points: [
      ['伝票', 'でんぴょう', 'phiếu (giao hàng, chứng từ)'],
      ['受領印', 'じゅりょういん', 'dấu xác nhận đã nhận'],
    ],
  }),
  item('w10', 'bamen', 2, {
    material: {
      kind: 'scene',
      vi: 'Phòng họp. Hai người đàn ông ngồi đối diện nhau. Một người đang dùng bút dạ quang tô một dòng trong bản hợp đồng đang mở. Người kia cầm tách cà phê, nhìn sang. Trên bàn có con dấu công ty nhưng chưa dùng.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['男性が契約書に署名しています。', '男性が契約書をコピーしています。', '二人が握手をしています。', '男性が契約書の一部に印をつけています。'],
        3,
        'Tô dạ quang một dòng là 印をつける (đánh dấu). Câu 1 sai vì đánh dấu không phải ký tên, con dấu cũng chưa dùng. Không có máy photo, không ai bắt tay.',
      ],
    ],
    points: [
      ['印をつける', 'しるしをつける', 'đánh dấu'],
      ['蛍光ペン', 'けいこうぺん', 'bút dạ quang'],
    ],
  }),
  item('w10', 'hatsugen', 1, {
    script: [
      ['状況', '取引先から契約書の原本が届きました。受け取ったことを電話で伝えます。何と言いますか。', 'Bản gốc hợp đồng của đối tác đã đến. Bạn gọi điện báo là đã nhận. Bạn nói gì?'],
    ],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['契約書の原本を、本日お受け取りになりました。', '契約書の原本を、本日確かに拝受しました。', '契約書の原本を、本日確かにお送りしました。', '契約書の原本を、本日確かにご査収ください。'],
        1,
        'Người nhận là mình, nên dùng khiêm nhường ngữ 拝受しました (đã nhận). Lựa chọn 1 đúng ý nhưng お受け取りになる là tôn kính ngữ, dùng cho việc của mình là sai chủ thể. Lựa chọn 3 thành "đã gửi", ngược chiều. Lựa chọn 4 là câu nhờ người nhận kiểm tra, dùng khi mình gửi đi.',
      ],
    ],
    points: [
      ['拝受する', 'はいじゅする', 'nhận (khiêm nhường ngữ)'],
      ['原本', 'げんぽん', 'bản gốc'],
      ['ご査収ください', 'ごさしゅうください', 'xin kiểm tra và nhận cho'],
    ],
  }),
  item('w10', 'hatsugen', 2, {
    script: [
      ['状況', '見積書の有効期限について取引先に聞かれました。今月末までだと答えます。何と言いますか。', 'Đối tác hỏi về thời hạn hiệu lực của bản báo giá. Bạn trả lời là đến cuối tháng này. Bạn nói gì?'],
    ],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['有効期限は、今月末までとおっしゃっております。', '有効期限は、今月末までにお願いできますか。', '有効期限は、今月末までになさっております。', '有効期限は、今月末までとなっております。'],
        3,
        '〜となっております là cách nói lịch sự để báo một quy định, điều kiện của phía mình. Lựa chọn 1 dùng tôn kính ngữ おっしゃる cho chính công ty mình, sai chủ thể. Lựa chọn 3 cũng dùng なさる cho mình. Lựa chọn 2 lại thành câu nhờ đối tác làm gì đó trước cuối tháng, không trả lời câu hỏi.',
      ],
    ],
    points: [
      ['有効期限', 'ゆうこうきげん', 'thời hạn hiệu lực'],
      ['〜となっております', 'となっております', 'là… (báo quy định một cách lịch sự)'],
    ],
  }),
  item('w10', 'hatsugen', 3, {
    script: [
      ['状況', '取引先に、契約書二部に押印のうえ、同封の封筒で返送してほしいと頼みます。何と言いますか。', 'Bạn nhờ đối tác đóng dấu vào hai bản hợp đồng rồi gửi lại bằng phong bì gửi kèm. Bạn nói gì?'],
    ],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['ご押印のうえ、ご返送いただけますでしょうか。', 'ご押印のうえ、ご返送させていただきます。', '押印いたしまして、ご返送いただけますでしょうか。', 'ご押印のうえ、ご返送してもよろしいでしょうか。'],
        0,
        'Đóng dấu và gửi lại đều là việc của đối tác, nên ご押印のうえ + ご返送いただけますでしょうか (nhờ một cách lịch sự). Lựa chọn 3 đúng ý nhờ nhưng いたす là khiêm nhường ngữ, đem dùng cho việc đóng dấu của đối tác là sai chủ thể. Lựa chọn 2 thành "phía tôi sẽ gửi lại". Lựa chọn 4 dùng ご〜する (khiêm nhường) và hỏi xin phép, sai ý nhờ.',
      ],
    ],
    points: [
      ['押印', 'おういん', 'đóng dấu'],
      ['返送', 'へんそう', 'gửi trả lại'],
      ['〜のうえ', 'のうえ', 'sau khi…, rồi…'],
    ],
  }),
  item('w10', 'hatsugen', 4, {
    script: [
      ['状況', '取引先から納品日を二日早めてほしいと頼まれ、調べたところ対応できるとわかりました。そう伝えます。何と言いますか。', 'Đối tác nhờ đẩy ngày giao hàng sớm lên hai ngày; bạn kiểm tra và thấy làm được. Bạn báo lại. Bạn nói gì?'],
    ],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['では、二日前倒しで納品していただきます。', 'では、二日前倒しで納品なさいます。', 'では、二日前倒しで納品いたします。', 'では、二日前倒しで納品をお願いします。'],
        2,
        'Người giao hàng là phía mình, nên 納品いたします (khiêm nhường ngữ). Lựa chọn 2 đúng ý nhưng なさる là tôn kính ngữ, dùng cho chính mình là sai chủ thể. Lựa chọn 1 và 4 đều biến đối tác thành người phải giao hàng, ngược với tình huống.',
      ],
    ],
    points: [
      ['前倒し', 'まえだおし', 'đẩy sớm lên'],
      ['納品', 'のうひん', 'giao hàng'],
    ],
  }),
  item('w10', 'sogo-chokai', 1, {
    script: [
      ['男', '課長、丸山運輸さんから、倉庫の契約更新の書類が届きました。今の契約が十二月二十五日で切れるので、来週中にはハンコを押して返したいんですが。', 'Thưa trưởng phòng, giấy tờ gia hạn hợp đồng kho của công ty Maruyama Unyu đã đến. Hợp đồng hiện tại hết hạn ngày 25/12/2026, nên em muốn đóng dấu và gửi lại trong tuần sau ạ.'],
      ['女', '中身はもう見た？', 'Em xem nội dung chưa?'],
      ['男', 'ざっと見ました。料金は今と同じでしたので、問題ないかと。', 'Em xem lướt rồi ạ. Giá vẫn như bây giờ nên chắc không có vấn đề gì.'],
      ['女', '料金が同じでも、ほかのところが変わってることがあるからね。前の契約のとき、うちの荷物が水に濡れたことがあったでしょう。', 'Giá giống nhưng chỗ khác có khi lại đổi đấy. Hồi hợp đồng trước, hàng của mình từng bị ướt nước, nhớ không.'],
      ['男', 'はい、台風のときですね。段ボールが全部だめになって、お客様への出荷が一週間止まりました。', 'Vâng, hồi có bão ạ. Thùng các-tông hỏng hết, việc xuất hàng cho khách bị ngưng một tuần.'],
      ['女', 'あのとき、補償の上限が契約書に書いてあって、半分しか払ってもらえなかったの。今回の案で、そこがどうなってるか気になるのよ。', 'Lúc đó hợp đồng có ghi mức bồi thường tối đa, nên mình chỉ được trả một nửa. Chị lo không biết bản dự thảo lần này chỗ đó thế nào.'],
      ['男', 'じゃあ、すぐに法務部に見てもらいましょうか。', 'Vậy mình nhờ phòng pháp chế xem ngay nhé ạ?'],
      ['女', '法務に出すのはいいんだけど、何も印をつけずに渡すと、時間がかかるのよ。向こうも年末で忙しいから。', 'Gửi pháp chế thì được, nhưng đưa mà không đánh dấu gì thì lâu lắm. Bên đó cuối năm cũng bận.'],
      ['男', 'なるほど。印のついたところだけ見てもらえば、早く済みますね。', 'Ra vậy ạ. Chỉ cần họ xem những chỗ có đánh dấu thì sẽ xong nhanh.'],
      ['女', 'だから、まず今の契約書と新しい案を一条ずつ見比べて、変わったところを表にまとめてくれる？それを付けて法務に回しましょう。', 'Nên trước hết em so từng điều một giữa hợp đồng hiện tại và bản mới, rồi tổng hợp những chỗ thay đổi thành bảng nhé? Kèm bảng đó rồi chuyển cho pháp chế.'],
      ['男', 'わかりました。補償の上限以外も、全部ですね。', 'Em hiểu rồi. Cả những chỗ ngoài mức bồi thường tối đa, tất cả luôn ạ.'],
      ['女', 'そう、全部。丸山さんへの返事は、法務の意見が出てからでいいから。もし二十五日に間に合わなそうなら、今の契約を一か月だけ延ばしてもらう相談も考えておいて。', 'Đúng, tất cả. Còn trả lời Maruyama thì đợi pháp chế có ý kiến rồi tính. Nếu có vẻ không kịp ngày 25 thì em tính luôn chuyện xin họ kéo dài hợp đồng hiện tại thêm một tháng.'],
    ],
    questions: [
      [
        '男の人は、まず何をしますか。',
        ['法務部に契約書の確認を頼む', '来週中に押印して送り返す', '新旧の契約書の違いを表にする', '丸山運輸に補償の上限を尋ねる'],
        2,
        'Trưởng phòng dặn "trước hết so từng điều giữa hợp đồng cũ và bản mới, tổng hợp chỗ thay đổi thành bảng"; lựa chọn 3 diễn đạt lại. Lựa chọn 1 dễ nhầm: có gửi pháp chế, nhưng là sau khi có bảng. Lựa chọn 2 là ý ban đầu của anh, bị gác lại. Lựa chọn 4 sai vì trả lời Maruyama phải đợi ý kiến pháp chế.',
      ],
    ],
    points: [
      ['契約更新', 'けいやくこうしん', 'gia hạn hợp đồng'],
      ['補償', 'ほしょう', 'bồi thường'],
      ['上限', 'じょうげん', 'mức trần, tối đa'],
      ['見比べる', 'みくらべる', 'so sánh (bằng mắt)'],
    ],
  }),
  item('w10', 'sogo-chokai', 2, {
    script: [
      ['女', '先日いただいたお見積もりなんですが、送料が一回ごとに五千円かかるというのが、ちょっと気になりまして。', 'Về bản báo giá hôm trước, tôi hơi băn khoăn chuyện mỗi lần giao mất năm nghìn yên tiền vận chuyển.'],
      ['男', 'はい。御社の場合、少ない量のご注文を何回にも分けていただくことが多いので、その分、配送の費用がかさんでしまうんです。', 'Vâng. Trường hợp quý công ty thường đặt số lượng ít, chia ra nhiều lần, nên chi phí giao hàng dồn lên ạ.'],
      ['女', 'そうなんですよね。うちは店の倉庫が狭いので、一度にたくさんは置けなくて。', 'Đúng vậy. Kho của cửa hàng chúng tôi chật, không để được nhiều một lúc.'],
      ['男', 'でしたら、一回のご注文が十万円以上の場合は送料を無料にする、という形ではいかがでしょうか。', 'Vậy thì, nếu một lần đặt từ mười vạn yên trở lên thì miễn phí vận chuyển, chị thấy thế nào ạ?'],
      ['女', '十万円ですか。うちの店の規模ですと、毎回それだけ注文するのは難しいですね。', 'Mười vạn yên ạ. Với quy mô cửa hàng chúng tôi thì lần nào cũng đặt chừng ấy là khó.'],
      ['男', 'そうですか…。では、ご注文は今までどおり何回でもいただいて、こちらで月に二回、まとめてお届けするというのは。その場合は送料をいただきません。', 'Vậy ạ… Thế thì chị cứ đặt bao nhiêu lần tuỳ ý như trước, bên tôi gom lại giao mỗi tháng hai lần thì sao ạ. Trường hợp đó không lấy phí vận chuyển.'],
      ['女', '月に二回ですか。間に急ぎで必要になったときは、どうなりますか。', 'Mỗi tháng hai lần ạ. Giữa chừng mà cần gấp thì sao?'],
      ['男', 'その場合は別にお届けしますが、送料は通常どおりいただくことになります。', 'Khi đó bên tôi giao riêng, nhưng phí vận chuyển sẽ tính như thường lệ.'],
      ['女', 'それなら、急ぎのときだけ払えばいいわけですね。あ、でも、届く日は決めておいてもらえますか。店の人のシフトを組まないといけないので。', 'Vậy là chỉ khi gấp mới phải trả nhỉ. À, nhưng anh có thể cố định ngày hàng đến không? Vì tôi phải xếp ca cho nhân viên cửa hàng.'],
      ['男', 'かしこまりました。では、毎月十日と二十五日にお届けするということで、いかがでしょう。', 'Vâng ạ. Vậy giao vào ngày 10 và ngày 25 hằng tháng, chị thấy thế nào?'],
      ['女', 'はい、それでお願いします。', 'Vâng, nhờ anh như vậy.'],
    ],
    questions: [
      [
        '送料について、最終的にどうなりましたか。',
        ['月二回まとめて届け、送料は無料', '十万円以上の注文で送料を無料にする', '注文のたびに五千円の送料を払う', '急ぎの注文に限って送料を無料にする'],
        0,
        'Cuối cùng hai bên chốt gom hàng giao vào ngày 10 và 25 hằng tháng, không tính phí vận chuyển; lựa chọn 1 diễn đạt lại. Lựa chọn 2 là đề xuất đầu tiên của người bán, bị từ chối vì cửa hàng nhỏ. Lựa chọn 3 là điều kiện trong báo giá cũ. Lựa chọn 4 đảo ngược: đơn gấp mới là đơn phải trả phí.',
      ],
    ],
    points: [
      ['送料', 'そうりょう', 'phí vận chuyển'],
      ['かさむ', 'かさむ', '(chi phí) dồn lên, phình ra'],
      ['シフトを組む', 'しふとをくむ', 'xếp ca làm việc'],
    ],
  }),
  item('w10', 'sogo-chokai', 3, {
    script: [
      ['中野', '課長、さくら記念病院さんの制服のお見積もりなんですが、先方から「もう少し何とかならないか」と言われまして。単価を一割下げた案を作り直そうかと思っているんですが。', 'Thưa trưởng phòng, về báo giá đồng phục cho bệnh viện Sakura Kinen, phía họ nói "có thể bớt thêm chút nào không". Em đang định làm lại phương án hạ đơn giá mười phần trăm ạ.'],
      ['森田', '一割はきついな。あの値段は、生地を決めた時点でぎりぎりなんだよ。小林さん、工場のほうから見て、何か手はありますか。', 'Mười phần trăm thì căng đấy. Mức giá đó tính từ lúc chọn vải đã sát nút rồi. Anh/chị Kobayashi, nhìn từ phía nhà máy, có cách nào không?'],
      ['小林', 'そうですね。四百着を一度に作るとなると、うちのラインでは三月がいっぱいいっぱいで、残業代がかなり乗ってるんです。', 'Để xem. Làm bốn trăm bộ một lần thì tháng 3 dây chuyền bên tôi kín mít, nên tiền làm thêm giờ đã cộng vào khá nhiều.'],
      ['中野', 'え、そうなんですか。', 'Ơ, vậy ạ.'],
      ['小林', 'ええ。もし納品を二回に分けて、半分を三月、残りを五月にさせてもらえれば、残業がなくなる分、一着あたり六百円は下げられると思います。', 'Vâng. Nếu chia giao hàng làm hai lần, một nửa tháng 3, phần còn lại tháng 5, thì nhờ không phải làm thêm giờ, mỗi bộ chắc hạ được sáu trăm yên.'],
      ['森田', 'なるほど。中野さん、病院さんは四月に全員分要るのかな。', 'Ra vậy. Nakano này, bệnh viện có cần đủ cho tất cả vào tháng 4 không nhỉ?'],
      ['中野', '確か、四月に入る新しい職員さんの分が百着くらいで、残りは今の制服との入れ替えだと聞いています。入れ替えは急がないと思います。', 'Em nhớ là phần cho nhân viên mới vào tháng 4 khoảng một trăm bộ, còn lại là thay đồng phục hiện tại. Việc thay chắc không gấp ạ.'],
      ['森田', 'だったら、単価をいじるんじゃなくて、納品の時期を二回に分けた案にしよう。それで六百円下がるなら、先方も納得してくれるだろう。', 'Vậy thì đừng động vào đơn giá, mà làm phương án chia thời điểm giao thành hai lần. Nhờ thế hạ được sáu trăm yên thì chắc phía họ cũng chịu.'],
      ['中野', 'わかりました。支払いの条件はどうしましょう。', 'Em hiểu rồi. Còn điều kiện thanh toán thì sao ạ?'],
      ['森田', '支払いは今のままでいい。数量も四百着のままで。', 'Thanh toán để nguyên. Số lượng cũng giữ bốn trăm bộ.'],
      ['中野', 'はい。では、そのように見積書を作り直します。', 'Vâng. Vậy em làm lại báo giá như thế ạ.'],
    ],
    questions: [
      [
        '中野さんは、見積書のどこを直しますか。',
        ['制服の単価を一割下げる', '支払いの条件を変更する', '注文の数を百着に減らす', '納める時期を二回に分ける'],
        3,
        'Trưởng phòng Morita chốt "không động vào đơn giá, làm phương án chia thời điểm giao thành hai lần"; lựa chọn 4 diễn đạt lại. Lựa chọn 1 là ý ban đầu của Nakano, bị bác. Lựa chọn 2 sai vì thanh toán để nguyên. Lựa chọn 3 lấy con số một trăm bộ của nhân viên mới, nhưng số lượng vẫn giữ bốn trăm.',
      ],
    ],
    points: [
      ['生地', 'きじ', 'vải'],
      ['いっぱいいっぱい', 'いっぱいいっぱい', 'kín hết, hết mức'],
      ['入れ替え', 'いれかえ', 'thay thế, thay mới'],
      ['ぎりぎり', 'ぎりぎり', 'sát nút'],
    ],
  }),
  item('w10', 'sogo-chokai', 4, {
    script: [
      ['女', '皆さん、お疲れさまです。今日は、来年一月からの配送の目標についてお話しします。', 'Chào mọi người. Hôm nay tôi nói về mục tiêu giao hàng từ tháng 1 năm sau (2027).'],
      ['女', 'まず、今年の結果です。お約束した日に商品をお届けできた割合は、九十六パーセントでした。昨年の九十一パーセントから大きく上がりました。皆さんの努力のおかげです。特に、雪の多かった二月にも九十パーセントを超えたのは、大きな成果でした。', 'Trước hết là kết quả năm nay. Tỉ lệ giao hàng đúng ngày đã hẹn là 96%, tăng mạnh so với 91% năm ngoái. Đó là nhờ công sức của mọi người. Nhất là tháng 2 tuyết nhiều mà vẫn vượt 90%, đó là thành quả lớn.'],
      ['女', '一方で、お客様のご意見を見ますと、遅れについての苦情は減ったものの、「何時ごろ届くのかわからないので、一日中家で待っていなければならない」という声が、今年は倍に増えています。特に、平日の昼間はお仕事で家にいらっしゃらない方から、多く寄せられています。', 'Mặt khác, xem ý kiến khách hàng thì khiếu nại về giao trễ có giảm, nhưng tiếng than "không biết mấy giờ hàng đến nên phải ở nhà chờ cả ngày" năm nay tăng gấp đôi. Ý kiến này đến nhiều nhất từ những người ban ngày các ngày thường đi làm, không có ở nhà.'],
      ['女', 'そこで、来年は、お届けの日だけでなく、時間帯もお約束できるようにしたいと考えています。具体的には、ご注文の際に午前か午後かを選んでいただき、その時間帯にお届けできる割合を九割以上にすることを目指します。', 'Vì vậy, năm sau chúng ta muốn hẹn được không chỉ ngày mà cả khung giờ giao. Cụ thể, khi đặt hàng khách chọn buổi sáng hay buổi chiều, và chúng ta nhắm tới tỉ lệ giao đúng khung giờ đó từ 90% trở lên.'],
      ['女', '日付どおりに届ける割合を百パーセントにしたい、という意見も営業から出ましたが、天候などもありますので、そちらは今の水準を保つことにします。', 'Bên kinh doanh cũng có ý kiến muốn tỉ lệ giao đúng ngày lên 100%, nhưng vì còn thời tiết và nhiều yếu tố khác, phần đó chúng ta sẽ giữ ở mức hiện tại.'],
      ['女', 'なお、新しい仕組みの詳しい手順は、十二月中に各チームのリーダーからお伝えします。ご質問は、それまでに私か各リーダーまでお願いします。', 'Ngoài ra, quy trình chi tiết của cách làm mới sẽ được trưởng mỗi nhóm truyền đạt trong tháng 12. Có câu hỏi gì thì trước lúc đó xin gửi cho tôi hoặc trưởng nhóm.'],
    ],
    questions: [
      [
        'この部署の来年の目標は何ですか。',
        ['期日どおりの配達を全件にする', '指定の時間帯に九割以上届ける', '遅れに関する苦情を半分にする', '各チームに新しい手順を伝える'],
        1,
        'Người nói nêu rõ 目指します: giao đúng khung giờ sáng/chiều khách chọn từ 90% trở lên; lựa chọn 2 diễn đạt lại. Lựa chọn 1 là ý kiến của bên kinh doanh, bị gác vì thời tiết, chỉ giữ mức hiện tại. Lựa chọn 3 không phải mục tiêu: khiếu nại giao trễ đã giảm, cái tăng gấp đôi là phàn nàn về giờ. Lựa chọn 4 là bước triển khai, không phải mục tiêu.',
      ],
    ],
    points: [
      ['時間帯', 'じかんたい', 'khung giờ'],
      ['目指す', 'めざす', 'nhắm tới'],
      ['水準を保つ', 'すいじゅんをたもつ', 'giữ mức'],
    ],
  }),
];

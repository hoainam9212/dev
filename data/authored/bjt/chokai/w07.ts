import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/** Week 7 — negotiation and client meetings: conditions, concessions, indirect refusals. Level: J1. */
export const W07: BjtItem[] = [
  item('w07', 'bamen', 1, {
    material: {
      kind: 'scene',
      vi: 'Phòng họp. Hai người đàn ông mặc vest đứng hai bên bàn, đang bắt tay nhau qua mặt bàn. Trên bàn là hai bản hợp đồng đã có chữ ký và dấu, cạnh đó là hai cây bút đã đậy nắp. Các ghế đều đã được đẩy ra sau.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['二人が握手をしています。', '二人が契約書に署名しています。', '男性が相手に名刺を渡しています。', '二人が座って話し合っています。'],
        0,
        'Hai người đang bắt tay: 握手をする. Hợp đồng đã ký xong, bút đã đậy nắp, nên câu 2 là việc đã qua. Cả hai đang đứng, nên câu 4 sai. Không có danh thiếp nào.',
      ],
    ],
    points: [
      ['握手', 'あくしゅ', 'bắt tay'],
      ['署名する', 'しょめいする', 'ký tên'],
    ],
  }),
  item('w07', 'bamen', 2, {
    material: {
      kind: 'scene',
      vi: 'Phòng họp có màn hình lớn hiện bảng giá ba gói dịch vụ. Một nữ nhân viên đứng cạnh màn hình, tay cầm bút chiếu laser chỉ vào cột giữa. Ba vị khách ngồi ở bàn, cúi xuống ghi chép vào sổ.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['女性が客に資料を配っています。', '客が女性に質問しています。', '女性がスクリーンを指しながら説明しています。', '客がスクリーンの電源を切っています。'],
        2,
        'Cô ấy đang dùng bút laser chỉ vào màn hình: 指しながら説明している. Khách đang cúi ghi chép, không ai hỏi. Cô ấy không phát tài liệu. Màn hình vẫn đang bật.',
      ],
    ],
    points: [
      ['指す', 'さす', 'chỉ vào'],
      ['料金プラン', 'りょうきんぷらん', 'gói giá'],
    ],
  }),
  item('w07', 'hatsugen', 1, {
    script: [
      ['状況', '商談の席で、取引先の部長が先ほど出した条件を、もう一度確かめたいです。何と言いますか。', 'Trong buổi đàm phán, bạn muốn xác nhận lại điều kiện mà trưởng bộ phận của đối tác vừa đưa ra. Bạn nói gì?'],
    ],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['森部長が申し上げた条件を確認させてください。', '森部長が申された条件を確認させてください。', '森部長がおっしゃった条件を確認させてください。', '森部長にお伝えした条件を確認させてください。'],
        2,
        'Người nói ra điều kiện là trưởng bộ phận phía đối tác, nên dùng tôn kính ngữ おっしゃった. Lựa chọn 1 đúng ý nhưng sai chủ thể: 申し上げる là khiêm nhường ngữ, chỉ dùng cho hành động của phía mình. Lựa chọn 2 dùng 申される, dạng kính ngữ sai. Lựa chọn 4 đổi nghĩa thành "điều kiện bên tôi đã báo cho ông Mori", trong khi điều kiện là do ông ấy đưa ra.',
      ],
    ],
    points: [
      ['おっしゃる', 'おっしゃる', 'nói (tôn kính ngữ của 言う)'],
      ['申し上げる', 'もうしあげる', 'nói (khiêm nhường ngữ, chỉ cho phía mình)'],
    ],
  }),
  item('w07', 'hatsugen', 2, {
    script: [
      ['状況', '取引先が希望する納期の条件は、こちらではのめないので、やんわり断ります。何と言いますか。', 'Phía mình không thể nhận điều kiện về hạn giao mà đối tác mong muốn, nên bạn từ chối một cách nhẹ nhàng. Bạn nói gì?'],
    ],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['その納期ですと、少々難しいかと存じます。', 'その納期ですと、十分間に合うかと存じます。', 'その納期ですと、少々難しいとおっしゃいます。', 'その納期ですと、少々難しいかとお察しします。'],
        0,
        '少々難しいかと存じます là cách từ chối vòng điển hình: nói "hơi khó" thay vì "không được", 存じます là khiêm nhường ngữ cho suy nghĩ của mình. Lựa chọn 4 dễ nhầm vì cũng mềm mỏng, nhưng お察しします nghĩa là "tôi hiểu nỗi khó của anh chị", tức coi cái khó là của đối tác. Lựa chọn 2 lại nhận lời. Lựa chọn 3 dùng tôn kính ngữ cho chính mình.',
      ],
    ],
    points: [
      ['のむ（条件を）', 'のむ', 'chấp nhận (điều kiện)'],
      ['難しいかと存じます', 'むずかしいかとぞんじます', 'e là khó (cách từ chối vòng)'],
      ['察する', 'さっする', 'đoán ra, thông cảm'],
    ],
  }),
  item('w07', 'hatsugen', 3, {
    script: [
      ['状況', '取引先の会議室で担当者を待っていると、受付の人がお茶を出してくれました。何と言いますか。', 'Bạn đang chờ người phụ trách trong phòng họp của đối tác thì nhân viên lễ tân mang trà ra mời. Bạn nói gì?'],
    ],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['お待たせしました。ありがたく頂戴します。', '恐れ入ります。ありがたく頂戴します。', '恐れ入ります。ありがたく召し上がります。', 'ご苦労さまです。ありがたく頂戴します。'],
        1,
        '恐れ入ります là lời cảm ơn kèm ý ngại vì người ta mất công, rồi 頂戴します là khiêm nhường ngữ của "nhận, dùng". Lựa chọn 3 đúng ý nhưng 召し上がる là tôn kính ngữ, không dùng cho việc mình uống. Lựa chọn 4 dùng ご苦労さま, lời người trên nói với người dưới, không nói với người của công ty khách. Lựa chọn 1 sai vì mình không phải người bắt ai chờ.',
      ],
    ],
    points: [
      ['恐れ入ります', 'おそれいります', 'cảm ơn / xin lỗi vì làm phiền'],
      ['頂戴する', 'ちょうだいする', 'nhận, dùng (khiêm nhường ngữ)'],
    ],
  }),
  item('w07', 'hatsugen', 4, {
    script: [
      ['状況', '取引先の部長が、こちらの値引きの希望を社長に相談してくれると言いました。お礼を言います。何と言いますか。', 'Trưởng bộ phận của đối tác nói sẽ đem mong muốn giảm giá của bên bạn ra bàn với giám đốc. Bạn cảm ơn. Bạn nói gì?'],
    ],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['社長にご相談するとのこと、恐れ入ります。', '社長にご相談なさるとのこと、承知しました。', '社長にご相談くださるとのこと、お察しします。', '社長にご相談くださるとのこと、恐れ入ります。'],
        3,
        'Người đi bàn là trưởng bộ phận phía đối tác và việc đó có lợi cho mình, nên dùng ご相談くださる rồi cảm ơn bằng 恐れ入ります. Lựa chọn 1 đúng ý cảm ơn nhưng ご相談する là khiêm nhường ngữ, dùng cho hành động của người ngoài là sai chủ thể. Lựa chọn 2 chỉ báo đã hiểu, không cảm ơn. Lựa chọn 3 dùng お察しします (tôi thông cảm), sai với ý cảm ơn.',
      ],
    ],
    points: [
      ['〜てくださる', 'てくださる', '(người trên) làm cho mình'],
      ['とのこと', 'とのこと', 'nghe nói là, được biết là'],
    ],
  }),
  item('w07', 'sogo-chokai', 1, {
    script: [
      ['男', '課長、ミナト食品さんの包装資材の件なんですが、先方から五パーセント値引きしてほしいと言われまして。', 'Thưa trưởng phòng, về vật liệu bao bì của Minato Foods, phía họ nói muốn được giảm giá năm phần trăm ạ.'],
      ['女', '五パーセントか。うちの利益を考えると、ちょっと厳しいね。', 'Năm phần trăm à. Nghĩ đến lợi nhuận bên mình thì hơi căng đấy.'],
      ['男', 'ええ。それで、間を取って三パーセントでどうかと、明日の打ち合わせで出してみようかと思ってるんですが。', 'Vâng. Nên em định trong buổi họp ngày mai sẽ thử đưa ra mức ba phần trăm, lấy ở giữa ạ.'],
      ['女', 'うーん、最初からこっちが下げる数字を出すのはやめておこう。一度出したら、それが出発点になっちゃうから。', 'Ừm, đừng đưa ra con số mình hạ ngay từ đầu. Đưa ra một lần là nó thành điểm xuất phát mất.'],
      ['男', 'あ、そうですね…。じゃあ、値引きの代わりに、配送の回数を減らしてコストを下げる案はどうでしょう。', 'À, đúng ạ… Vậy thay cho giảm giá, phương án giảm số lần giao hàng để hạ chi phí thì sao ạ?'],
      ['女', 'それも悪くないけど、先方の倉庫の事情がわからないと何とも言えないね。それより、ミナトさんは来年、新しい工場が動き出すって聞いてるんだけど。', 'Cũng không tệ, nhưng chưa biết tình hình kho của họ thì chưa nói được gì. Mà này, chị nghe nói năm sau Minato có nhà máy mới đi vào hoạt động.'],
      ['男', 'はい、来年の四月からだそうです。', 'Vâng, nghe nói từ tháng 4 năm sau ạ.'],
      ['女', 'だったら、来年度の発注量がどのくらい増えるのか、まず先方の購買の方に聞いてみて。量がはっきりすれば、数量に応じた値引きっていう形で出せるでしょう。', 'Vậy thì trước hết hỏi người bên bộ phận mua hàng của họ xem năm tài chính sau lượng đặt hàng tăng bao nhiêu. Lượng rõ rồi thì mình đưa ra được dưới dạng giảm giá theo số lượng.'],
      ['男', 'なるほど。年間でまとめて約束していただければ、ということですね。', 'Ra vậy. Tức là nếu họ cam kết gộp theo cả năm thì mới giảm, phải không ạ.'],
      ['女', 'そう。配送の話は、その後で倉庫を見せてもらってからでいいから。', 'Đúng. Chuyện giao hàng thì để sau, khi nào được xem kho của họ rồi tính.'],
      ['男', 'わかりました。では、明日の打ち合わせの前に、先方の購買の方に電話してみます。', 'Em hiểu rồi. Vậy trước buổi họp ngày mai, em sẽ gọi điện cho người bên mua hàng của họ.'],
    ],
    questions: [
      [
        '男の人は、まず何をしますか。',
        ['三パーセントの値引きを先に示す', '先方の倉庫を見せてもらいに行く', '来年度の発注量を先方に尋ねる', '配送の回数を減らす案をまとめる'],
        2,
        'Trưởng phòng bảo "trước hết hỏi bộ phận mua hàng xem lượng đặt năm sau tăng bao nhiêu", và anh ấy chốt sẽ gọi điện trước buổi họp; lựa chọn 3 diễn đạt lại ý đó. Lựa chọn 1 là đề xuất của anh ấy nhưng đã bị bác vì con số sẽ thành điểm xuất phát. Lựa chọn 2 là bước để sau (その後で). Lựa chọn 4 cũng bị gác lại vì chưa rõ tình hình kho.',
      ],
    ],
    points: [
      ['間を取る', 'あいだをとる', 'lấy mức ở giữa, chia đôi'],
      ['出発点', 'しゅっぱつてん', 'điểm xuất phát'],
      ['発注量', 'はっちゅうりょう', 'lượng đặt hàng'],
      ['購買', 'こうばい', 'mua hàng (bộ phận)'],
    ],
  }),
  item('w07', 'sogo-chokai', 2, {
    script: [
      ['男', '本日はお時間をいただき、ありがとうございます。先日お送りしたカタログ印刷のお見積もりですが、いかがでしたでしょうか。', 'Cảm ơn chị hôm nay đã dành thời gian. Về báo giá in catalogue tôi gửi hôm trước, chị thấy thế nào ạ?'],
      ['女', 'ええ、拝見しました。金額は、正直、今お願いしている印刷会社さんとそれほど変わらないですね。', 'Vâng, tôi đã xem. Thật lòng thì số tiền cũng không khác bao nhiêu so với công ty in chúng tôi đang thuê.'],
      ['男', 'さようでございますか。もし価格を重視されるのでしたら、紙を一段階薄いものに変えまして、一割ほどお安くすることもできますが。', 'Vậy ạ. Nếu chị coi trọng giá thì bên tôi có thể đổi sang loại giấy mỏng hơn một bậc để rẻ đi khoảng mười phần trăm.'],
      ['女', 'あ、いえ、値段のことはそれほど気にしていないんです。実は、今の会社さんで困っているのが、刷るたびに口紅の色が微妙に違ってしまうことでして。', 'À không, chuyện giá chúng tôi không bận tâm lắm. Thật ra cái khó với công ty hiện tại là mỗi lần in thì màu son môi lại lệch đi một chút.'],
      ['男', '色、ですか。', 'Màu sắc ạ?'],
      ['女', 'ええ。お客様はカタログの色を見て注文なさるので、届いた商品と色が違うと、苦情につながるんです。社内では再生紙に切り替えようという声もあるんですが、それも色がきちんと出ることが前提で。', 'Vâng. Khách xem màu trên catalogue rồi mới đặt, nên hàng nhận được mà khác màu là thành khiếu nại. Trong công ty cũng có ý kiến chuyển sang giấy tái chế, nhưng điều kiện tiên quyết vẫn là màu phải lên đúng.'],
      ['男', '承知いたしました。弊社では、毎回本番の前に色見本をお送りして、御社にご確認いただいてから刷る形をとっております。', 'Tôi hiểu rồi. Bên tôi mỗi lần đều gửi mẫu màu trước khi in chính thức, để quý công ty kiểm tra rồi mới in.'],
      ['女', 'それはありがたいですね。そうしますと、納期はどのくらい余裕を見ておけばいいですか。', 'Vậy thì tốt quá. Nếu thế thì hạn giao tôi nên tính dư ra khoảng bao lâu?'],
      ['男', '通常より三日ほど長くなってしまいますが、よろしいでしょうか。', 'Sẽ lâu hơn bình thường khoảng ba ngày, chị thấy có được không ạ?'],
      ['女', '三日なら大丈夫です。前もって予定に入れておきますので。', 'Ba ngày thì không sao. Tôi sẽ đưa vào kế hoạch từ trước.'],
    ],
    questions: [
      [
        '女の人が印刷会社を選ぶとき、最も重視していることは何ですか。',
        ['刷るたびに同じ色が出ること', '今の会社より費用が安いこと', '再生紙に切り替えられること', '納期がなるべく短いこと'],
        0,
        'Chị ấy nói thẳng là không bận tâm về giá, cái khó là mỗi lần in màu lại lệch; lựa chọn 1 diễn đạt lại ý đó. Lựa chọn 2 là điều người bán đoán và đã bị chị gạt đi. Lựa chọn 3 chỉ là ý kiến trong công ty, và cũng phải "màu lên đúng" trước. Lựa chọn 4 sai vì chị chấp nhận chậm thêm ba ngày.',
      ],
    ],
    points: [
      ['刷る', 'する', 'in'],
      ['色見本', 'いろみほん', 'mẫu màu'],
      ['前提', 'ぜんてい', 'tiền đề, điều kiện tiên quyết'],
      ['再生紙', 'さいせいし', 'giấy tái chế'],
    ],
  }),
  item('w07', 'sogo-chokai', 3, {
    script: [
      ['女', '来月の展示会でお借りする椅子二百脚なんですが、会場で並べる作業も、そちらでお願いできないでしょうか。', 'Về hai trăm chiếc ghế chúng tôi thuê cho hội chợ tháng sau, việc xếp ghế tại hội trường có nhờ bên anh làm được không ạ?'],
      ['男', '設営作業ですね。はい、承れます。ただ、作業員を四名お出しすることになりますので、別途三万円ほど頂戴しております。', 'Việc dựng hội trường ạ. Vâng, bên tôi nhận được. Có điều sẽ phải cử bốn người làm, nên tính thêm riêng khoảng ba vạn yên.'],
      ['女', '三万円ですか…。実は今回、予算がもう決まっておりまして、そこまでは厳しいんです。', 'Ba vạn yên ạ… Thật ra lần này ngân sách đã chốt rồi, đến mức đó thì khó.'],
      ['男', 'そうですか…。', 'Vậy ạ…'],
      ['女', 'でしたら、並べるのはうちのスタッフでやりますので、置き方だけ教えていただくというのは、どうでしょうか。', 'Vậy thì nhân viên bên tôi sẽ tự xếp, anh chỉ cần chỉ cho cách đặt thôi, có được không?'],
      ['男', 'あのう、それですと、運ぶときに椅子の脚を傷めてしまうことがよくあるんです。壊れた場合は修理代をご負担いただくことになりますので、かえって高くつくかもしれません。', 'Ừm, nếu thế thì lúc khiêng hay làm hỏng chân ghế lắm ạ. Hỏng thì bên chị phải chịu tiền sửa, nên có khi lại tốn hơn.'],
      ['女', 'ああ、それは困りますね。前に別の会場で、うちの者が机の脚を折ってしまったこともあって…。', 'À, thế thì phiền nhỉ. Trước đây ở một hội trường khác, người bên tôi cũng từng làm gãy chân bàn…'],
      ['男', 'では、こうしてはいかがでしょう。作業は御社のスタッフの方にお願いして、弊社からは一名だけ、運び方を見る係として立ち会わせていただきます。その場合、一万円で結構です。', 'Vậy chị thấy thế này được không. Việc xếp nhờ nhân viên quý công ty làm, bên tôi chỉ cử một người có mặt để trông cách khiêng. Trường hợp đó một vạn yên là được.'],
      ['女', '一万円なら、何とかなりそうです。それでお願いします。', 'Một vạn yên thì chắc xoay được. Nhờ anh như vậy nhé.'],
      ['男', 'かしこまりました。では、当日は朝八時に一名伺います。運ぶときの注意をまとめた紙も、前日までにお送りしておきます。', 'Vâng ạ. Vậy hôm đó tám giờ sáng bên tôi sẽ có một người đến. Tờ giấy ghi các lưu ý khi khiêng, tôi cũng sẽ gửi trước một ngày.'],
    ],
    questions: [
      [
        '設営作業について、最終的にどうなりましたか。',
        ['業者の作業員四人に並べてもらう', '借りる側が並べ、業者が一人立ち会う', '借りる側が並べ方を教わって並べる', '椅子の修理代を前もって払っておく'],
        1,
        'Cuối cùng nhân viên bên thuê tự xếp, bên cho thuê cử một người đứng trông, giá một vạn yên; lựa chọn 2 diễn đạt lại ý đó. Lựa chọn 1 là đề xuất ban đầu ba vạn yên, bị từ chối vì vượt ngân sách. Lựa chọn 3 là ý của chị, bị bác vì dễ làm hỏng ghế. Lựa chọn 4 sai: tiền sửa chỉ được nhắc như rủi ro.',
      ],
    ],
    points: [
      ['設営', 'せつえい', 'dựng, bố trí (hội trường)'],
      ['別途', 'べっと', 'riêng, thêm ngoài'],
      ['高くつく', 'たかくつく', 'thành ra tốn kém hơn'],
      ['立ち会う', 'たちあう', 'có mặt chứng kiến, giám sát'],
    ],
  }),
  item('w07', 'sogo-chokai', 4, {
    script: [
      ['女', 'もしもし、山野物産購買部の小松でございます。原田様の携帯電話でよろしかったでしょうか。先日はご提案書をお送りいただきまして、ありがとうございました。', 'A lô, tôi là Komatsu ở bộ phận mua hàng của Yamano Bussan. Đây có phải số di động của anh/chị Harada không ạ? Cảm ơn anh/chị hôm trước đã gửi bản đề xuất.'],
      ['女', '二点ご連絡がございます。まず、来週木曜日、十二月三日の打ち合わせですが、当日、弊社に社内の監査が入ることになりまして、大変申し訳ないのですが、翌日の金曜日、同じ時間に変えていただけないでしょうか。場所は変わらず、弊社三階の会議室です。', 'Tôi có hai việc cần báo. Thứ nhất, buổi họp thứ Năm tuần sau, ngày 3/12/2026, hôm đó công ty tôi có đợt kiểm toán nội bộ, thật xin lỗi nhưng anh/chị có thể dời sang thứ Sáu hôm sau, cùng giờ được không ạ. Địa điểm vẫn là phòng họp tầng ba công ty tôi.'],
      ['女', 'それから、ご提案書の件です。単価の表につきましては、前回いただいた内容で問題ございません。ただ、保証期間が一年となっている部分なんですが、部長の木村が、三年保証にした場合の金額もあわせて見たいと申しておりまして。', 'Tiếp theo là về bản đề xuất. Bảng đơn giá thì như nội dung lần trước là không có vấn đề. Có điều ở phần ghi thời hạn bảo hành một năm, trưởng bộ phận Kimura bên tôi nói muốn xem thêm cả số tiền nếu bảo hành ba năm.'],
      ['女', 'お手数ですが、その場合の金額を書き加えたものを、打ち合わせの前日までにお送りいただけますでしょうか。なお、二ページ目の納品スケジュールは、弊社の工事の日程がまだ決まっておりませんので、今のままで結構です。', 'Phiền anh/chị viết thêm số tiền cho trường hợp đó và gửi cho tôi trước hôm họp một ngày được không ạ. Còn lịch giao hàng ở trang hai thì vì lịch thi công bên tôi chưa chốt, nên cứ để nguyên như hiện tại là được.'],
      ['女', 'もし金曜日のご都合が悪いようでしたら、来週中でほかの日も調整いたしますので、お知らせください。お忙しいところ恐れ入りますが、どうぞよろしくお願いいたします。失礼いたします。', 'Nếu thứ Sáu anh/chị không tiện thì tôi sẽ sắp xếp ngày khác trong tuần sau, xin cho tôi biết. Xin lỗi đã làm phiền lúc anh/chị bận, mong anh/chị giúp cho. Tôi xin phép.'],
    ],
    questions: [
      [
        '原田さんは、提案書をどのように直しますか。',
        ['単価の表を新しい内容にする', '納品の予定を新しい日程にする', '保証期間を一年から三年に改める', '三年保証の場合の金額を加える'],
        3,
        'Người gọi nhờ "viết thêm số tiền cho trường hợp bảo hành ba năm" (書き加える), tức là bổ sung, không thay; lựa chọn 4 đúng. Lựa chọn 3 là bẫy: không đổi một năm thành ba năm, chỉ thêm phương án để so. Lựa chọn 1 sai vì bảng đơn giá "không có vấn đề". Lựa chọn 2 sai vì lịch giao hàng để nguyên.',
      ],
    ],
    points: [
      ['監査', 'かんさ', 'kiểm toán, thanh tra'],
      ['保証期間', 'ほしょうきかん', 'thời hạn bảo hành'],
      ['書き加える', 'かきくわえる', 'viết thêm vào'],
    ],
  }),
];

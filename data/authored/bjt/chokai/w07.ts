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
      ['男', '課長、あおいリゾートさんの客室用の石けんの件なんですが、先方から、同じ石けんを県内のほかのホテルや旅館には売らないでほしい、と言われまして。', 'Thưa trưởng phòng, về xà phòng dùng trong phòng khách của Aoi Resort, phía họ nói mong bên mình đừng bán cùng loại xà phòng đó cho các khách sạn hay nhà trọ khác trong tỉnh ạ.'],
      ['女', '独占で、ってこと？', 'Tức là độc quyền à?'],
      ['男', 'はい。その代わり、来年から系列のホテル八つ全部で使っていただけるそうです。かなり大きいお話なので、お受けしてもいいんじゃないかと思うんですが。', 'Vâng. Đổi lại, từ năm sau họ sẽ dùng ở cả tám khách sạn trong chuỗi. Vụ này khá lớn, nên em nghĩ mình nhận lời cũng được ạ.'],
      ['女', 'うーん、気持ちはわかるけど、うちはもう県内の旅館二軒に同じ石けんを納めてるでしょう。そこをやめるわけにはいかないよ。', 'Ừm, chị hiểu ý em, nhưng bên mình đang giao đúng loại xà phòng đó cho hai nhà trọ trong tỉnh rồi còn gì. Không thể bỏ chỗ đó được.'],
      ['男', 'あ、そうでした…。じゃあ、独占はできませんと、今回ははっきりお断りしましょうか。', 'À, đúng rồi ạ… Vậy lần này mình nói rõ là không thể độc quyền, từ chối luôn nhé?'],
      ['女', 'いや、断ってしまうのももったいないね。せっかく八つ全部って言ってくださってるんだから。たとえば、香りを少し変えて、名前も箱も先方専用にした石けんを作る、っていうのはどうかな。それなら先方だけの商品になるでしょう。', 'Không, từ chối luôn thì cũng tiếc. Người ta đã có lòng nói dùng cho cả tám khách sạn mà. Chẳng hạn, làm một loại xà phòng đổi mùi hương một chút, tên và hộp cũng làm riêng cho họ, thì sao nhỉ. Như thế thì thành sản phẩm chỉ riêng họ có.'],
      ['男', 'なるほど、それなら旅館さんにもご迷惑がかかりませんね。早速、新しい商品としてお見積もりを作って、来週の打ち合わせでお出しします。', 'Ra vậy, thế thì cũng không làm phiền đến hai nhà trọ kia. Em sẽ làm ngay báo giá như một sản phẩm mới và đưa ra ở buổi họp tuần sau ạ.'],
      ['女', 'ちょっと待って。香りを変えるといっても、できるかどうか、費用がどのくらいかかるか、まだわからないでしょう。まず開発部に、今の香りをもとに別の香りが作れるか、確かめてみて。見積もりはその返事を聞いてからね。', 'Khoan đã. Nói là đổi mùi hương, nhưng có làm được không, tốn bao nhiêu thì mình chưa biết mà. Trước hết em hỏi bộ phận phát triển xem có tạo được mùi khác dựa trên mùi hiện tại không. Báo giá thì đợi nghe họ trả lời rồi hẵng làm.'],
      ['男', 'わかりました。じゃあ、今日中に開発部の担当の方に聞いてみます。', 'Em hiểu rồi. Vậy trong hôm nay em sẽ hỏi người phụ trách bên bộ phận phát triển.'],
    ],
    questions: [
      [
        '男の人は、まず何をしますか。',
        ['先方が求める独占の条件をそのまま受ける', '独占はできないと先方にはっきり断る', '香りを変えられるか開発部に確かめる', '先方専用の商品の見積もりを出す'],
        2,
        'Trưởng phòng dặn "trước hết hỏi bộ phận phát triển xem có tạo được mùi khác không", anh ấy đáp sẽ hỏi trong hôm nay; lựa chọn 3 diễn đạt lại ý đó. Lựa chọn 4 dễ chọn nhất vì chính anh ấy nói sẽ làm báo giá ngay, nhưng bị chặn: báo giá là bước sau, đợi phát triển trả lời (その返事を聞いてから). Lựa chọn 1 là ý ban đầu của anh ấy, bị bác vì đang giao hàng cho hai nhà trọ trong tỉnh. Lựa chọn 2 là đề xuất thứ hai của anh ấy, bị gạt đi vì từ chối thì tiếc (もったいない).',
      ],
    ],
    points: [
      ['独占', 'どくせん', 'độc quyền'],
      ['系列', 'けいれつ', 'cùng hệ thống, chuỗi'],
      ['納める', 'おさめる', 'giao (hàng) cho khách'],
      ['もったいない', 'もったいない', 'tiếc, phí'],
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

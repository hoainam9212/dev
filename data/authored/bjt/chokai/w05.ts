import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/** Week 5 — numbers, charts and trends. Level: J1. */
export const W05: BjtItem[] = [
  item('w05', 'bamen', 1, {
    material: {
      kind: 'scene',
      vi: 'Một nam nhân viên ngồi trước hai màn hình máy tính, tay phải cầm chuột, trên màn hình là một biểu đồ cột đang được chỉnh sửa. Bên cạnh bàn phím có một máy tính bỏ túi và một bản báo cáo đã in sẵn. Không có ai khác quanh bàn.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['男性が電卓で計算しています。', '男性が報告書を印刷しています。', '男性がパソコンでグラフを作成しています。', '男性が画面を同僚に見せています。'],
        2,
        'Anh ta đang dùng chuột chỉnh biểu đồ trên màn hình: グラフを作成している. Máy tính bỏ túi có trên bàn nhưng không được dùng. Báo cáo đã in sẵn, không phải đang in. Quanh bàn không có đồng nghiệp nào.',
      ],
    ],
    points: [
      ['電卓', 'でんたく', 'máy tính bỏ túi'],
      ['作成する', 'さくせいする', 'soạn, lập'],
    ],
  }),
  item('w05', 'bamen', 2, {
    material: {
      kind: 'scene',
      vi: 'Trong một nhà kho. Một nữ nhân viên đứng trước dãy kệ, tay cầm máy tính bảng, ngón tay chỉ vào từng thùng các-tông trên kệ như đang đếm. Ở phía sau, một nam nhân viên đang đẩy xe đẩy hàng chở ba thùng các-tông về phía cửa kho.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['女性が棚の在庫を数えています。', '女性が段ボール箱を運んでいます。', '男性が棚に箱を並べています。', '二人で台車を押しています。'],
        0,
        'Người phụ nữ cầm máy tính bảng, chỉ vào từng thùng trên kệ: 在庫を数える = kiểm đếm hàng tồn. Câu 2 đảo chủ thể: người chở thùng là người đàn ông. Câu 3: anh ta chở thùng ra cửa, không xếp lên kệ. Câu 4: chỉ một người đẩy xe.',
      ],
    ],
    points: [
      ['在庫', 'ざいこ', 'hàng tồn kho'],
      ['台車', 'だいしゃ', 'xe đẩy hàng'],
      ['段ボール箱', 'だんぼーるばこ', 'thùng các-tông'],
    ],
  }),
  item('w05', 'hatsugen', 1, {
    script: [
      [
        '状況',
        '取引先から届いた販売データの合計が、明細の数字と合いません。先方の担当者に電話をかけて、そのことを聞きます。何と言いますか。',
        'Tổng trong dữ liệu bán hàng đối tác gửi tới không khớp với các số chi tiết. Bạn gọi điện cho người phụ trách bên đó để hỏi. Bạn nói gì?',
      ],
    ],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['先日のデータについて、お尋ねになりたいのですが。', '先日のデータについて、ご確認いただけましたか。', '先日のデータについて、お伺いしたいのですが。', '先日のデータについて、お送りしたいのですが。'],
        2,
        'Người hỏi là mình nên dùng khiêm nhường お伺いする, kèm のですが để mở lời. Lựa chọn 1 đúng ý nhưng お尋ねになる là tôn kính, đem nâng hành động hỏi của chính mình. Lựa chọn 2 hỏi đối tác đã kiểm tra chưa, trong khi họ chưa biết có sai lệch. Lựa chọn 4 sai hướng: dữ liệu do đối tác gửi tới.',
      ],
    ],
    points: [
      ['明細', 'めいさい', 'bảng chi tiết'],
      ['先方', 'せんぽう', 'phía đối tác, bên kia'],
      ['お伺いする', 'おうかがいする', '(tôi) xin hỏi'],
    ],
  }),
  item('w05', 'hatsugen', 2, {
    script: [
      [
        '状況',
        '会議で、来期の売上目標の数字について意見を求められました。前年の伸びと比べると、目標は高すぎると思います。何と言いますか。',
        'Trong cuộc họp, bạn được hỏi ý kiến về con số mục tiêu doanh thu kỳ tới. So với mức tăng năm trước, bạn thấy mục tiêu quá cao. Bạn nói gì?',
      ],
    ],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['前年の伸びから考えますと、やや高いように思います。', '前年の伸びから考えますと、やや低いように思います。', '前年の伸びから考えますと、やや高いとお思いです。', '前年の伸びから考えますと、やや高いと存じ上げます。'],
        0,
        'Nêu căn cứ rồi nói mềm bằng ように思います: đúng ý "hơi cao". Lựa chọn 2 nói ngược thành "hơi thấp". Lựa chọn 3 đúng ý nhưng お思いです là tôn kính, gán cho ý nghĩ của chính mình. Lựa chọn 4 sai vì 存じ上げる chỉ dùng khi "biết" một người, không dùng để nêu ý kiến; phải là 存じます.',
      ],
    ],
    points: [
      ['伸び', 'のび', 'mức tăng trưởng'],
      ['存じます', 'ぞんじます', '(tôi) nghĩ, biết (khiêm nhường)'],
      ['存じ上げる', 'ぞんじあげる', '(tôi) biết (một người) — khiêm nhường'],
    ],
  }),
  item('w05', 'hatsugen', 3, {
    script: [
      [
        '状況',
        '会議用に作り直したグラフを、課長に見てもらいました。「見やすくなったね」とほめられたので、お礼を言います。何と言いますか。',
        'Bạn nhờ trưởng phòng xem biểu đồ đã làm lại cho cuộc họp. Được khen "dễ nhìn hơn rồi đấy", bạn cảm ơn. Bạn nói gì?',
      ],
    ],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['そう申していただけると、励みになります。', 'そう言っていただけると、励みになります。', 'そう言っていただけると、お励みになります。', 'そう言ってさしあげると、励みになります。'],
        1,
        'Người khen là trưởng phòng, người được động viên là mình: 言っていただける + 励みになります. Lựa chọn 1 đúng ý nhưng 申す là khiêm nhường, lại dùng cho lời của cấp trên. Lựa chọn 3 thêm お〜になる tôn kính cho cảm xúc của chính mình. Lựa chọn 4 đảo chiều: mình nói cho cấp trên nghe.',
      ],
    ],
    points: [
      ['励みになる', 'はげみになる', 'là động lực, khích lệ'],
      ['ほめる', 'ほめる', 'khen'],
    ],
  }),
  item('w05', 'hatsugen', 4, {
    script: [
      [
        '状況',
        '取引先との打ち合わせで、相手の部長が市場の伸びの予測を示しました。その数字をどこで調べたのか知りたいです。何と言いますか。',
        'Trong buổi bàn việc, trưởng bộ phận bên đối tác đưa ra dự báo tăng trưởng thị trường. Bạn muốn biết con số đó tra ở đâu. Bạn nói gì?',
      ],
    ],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['その数字は、どちらでお調べしたのでしょうか。', 'その数字は、どちらで拝見したのでしょうか。', 'その数字は、どちらでお調べになるのでしょうか。', 'その数字は、どちらでお調べになったのでしょうか。'],
        3,
        'Việc tra cứu là của vị trưởng bộ phận bên đối tác, và đã làm rồi: tôn kính ở quá khứ お調べになった. Lựa chọn 1 đúng ý nhưng お〜する là khiêm nhường, hạ hành động của khách. Lựa chọn 2 dùng 拝見 (khiêm nhường của "xem") cho khách. Lựa chọn 3 chia tương lai, trong khi số liệu đã có.',
      ],
    ],
    points: [
      ['予測', 'よそく', 'dự báo'],
      ['お調べになる', 'おしらべになる', '(ngài) tra cứu'],
      ['拝見する', 'はいけんする', '(tôi) xem (khiêm nhường)'],
    ],
  }),
  item('w05', 'sogo-chokai', 1, {
    script: [
      ['男', '店長、先月から試していただいている発注の予測システムですが、実際に使ってみて、いかがですか。', 'Thưa cửa hàng trưởng, hệ thống dự báo đặt hàng chị dùng thử từ tháng trước, thực tế dùng thấy thế nào ạ?'],
      ['女', 'ええ、正直、最初は半信半疑だったんですよ。天気や近くのイベントまで見て数を出すって言われても、ピンと来なくて。', 'Ừ, nói thật lúc đầu tôi nửa tin nửa ngờ. Nghe bảo nó xem cả thời tiết lẫn sự kiện gần đây để ra số lượng, tôi vẫn không hình dung được.'],
      ['男', '本部としては、発注にかかる時間が減ったかどうかを一番知りたいんですが。', 'Bên trụ sở thì muốn biết nhất là thời gian đặt hàng có giảm hay không ạ.'],
      ['女', 'ああ、それは毎朝三十分ほど短くなりました。でもね、それよりずっと大きいのは、お総菜の廃棄なんです。前の月と比べて、三割近く減ったんですよ。', 'À, cái đó mỗi sáng rút được khoảng ba mươi phút. Nhưng mà lớn hơn nhiều là chuyện đồ ăn chế biến sẵn phải bỏ đi. So với tháng trước giảm gần ba mươi phần trăm đấy.'],
      ['男', '三割ですか。それは大きいですね。', 'Ba mươi phần trăm ạ. Con số lớn thật.'],
      ['女', '夕方に値引きのシールを貼る量も減りましたから、売上の数字も、思ったほど落ちていないんです。', 'Lượng tem giảm giá dán buổi chiều cũng ít đi, nên doanh thu cũng không giảm nhiều như tôi tưởng.'],
      ['男', 'なるほど。ただ、ほかの店からは、売り切れが増えたという声も上がっているんですが。', 'Ra vậy. Có điều các cửa hàng khác có ý kiến là hết hàng nhiều hơn.'],
      ['女', 'うちも最初の週はありました。特に雨の日の夕方ですね。でも、予測の数字に、担当者が少し上乗せできるようにしてからは、ほとんどなくなりました。', 'Bên tôi tuần đầu cũng có. Nhất là chiều những hôm mưa. Nhưng từ khi cho người phụ trách được cộng thêm chút ít vào con số dự báo thì gần như không còn nữa.'],
      ['男', 'そうですか。では、全店に広げるときも、担当者が数を調整できる形にしたほうがよさそうですね。本部に戻って、そう伝えます。', 'Vậy ạ. Thế thì khi mở rộng ra toàn bộ cửa hàng, có lẽ nên để người phụ trách điều chỉnh được số lượng. Tôi về trụ sở sẽ báo lại như vậy.'],
      ['女', 'ええ。時間が短くなったことより、捨てるものが減ったことのほうが、現場はずっとうれしいと思いますよ。', 'Ừ. So với chuyện rút ngắn thời gian, chuyện ít phải vứt đồ đi làm người ở cửa hàng vui hơn nhiều đấy.'],
    ],
    questions: [
      [
        '女の人は、新しいシステムの一番の効果は何だと言っていますか。',
        ['毎朝の発注にかかる時間が減った', '売り切れがほとんどなくなった', '値引きシールを貼る量が減った', '売れ残って捨てる総菜が減った'],
        3,
        'Cửa hàng trưởng nói それよりずっと大きいのは、お総菜の廃棄 và nhắc lại ở cuối: lợi ích lớn nhất là bớt đồ ăn phải bỏ — lựa chọn 4 diễn đạt lại 廃棄. Lựa chọn 1 là điều trụ sở muốn biết, chị ấy đặt xuống sau (それより). Lựa chọn 3 chỉ là hệ quả kèm theo. Lựa chọn 2 chỉ có được sau khi cho người phụ trách điều chỉnh, không phải hiệu quả của hệ thống.',
      ],
    ],
    points: [
      ['廃棄', 'はいき', 'loại bỏ, vứt đi'],
      ['半信半疑', 'はんしんはんぎ', 'nửa tin nửa ngờ'],
      ['上乗せする', 'うわのせする', 'cộng thêm vào'],
    ],
  }),
  item('w05', 'sogo-chokai', 2, {
    script: [
      ['女', '先輩、明日の報告会で使うグラフなんですが、ちょっと見ていただけますか。', 'Anh ơi, biểu đồ em dùng cho buổi báo cáo ngày mai, anh xem giúp em một chút được không ạ?'],
      ['男', 'いいよ。ああ、地域別の売上を、円グラフ三つで並べたんだね。', 'Được. À, em xếp doanh thu theo khu vực thành ba biểu đồ tròn nhỉ.'],
      ['女', 'はい。三年分の割合を比べたくて。', 'Vâng. Em muốn so tỉ lệ của ba năm.'],
      ['男', 'うーん、伝えたいのは、関西の割合がこの三年でどう変わったか、だよね。円グラフが三つあると、見る人が一つずつ見比べなきゃいけないから、変化がわかりにくいんだ。', 'Ừm, điều em muốn truyền đạt là tỉ lệ của vùng Kansai thay đổi thế nào trong ba năm, đúng không. Có ba biểu đồ tròn thì người xem phải so từng cái một, nên khó thấy sự thay đổi.'],
      ['女', 'では、折れ線グラフにしたほうがいいでしょうか。', 'Vậy em đổi sang biểu đồ đường thì tốt hơn ạ?'],
      ['男', '折れ線だと、今度は地域が五つあるから、線が重なっちゃうな。……あ、いや、帯グラフにして、三年分を上下に並べたらどう？関西のところだけ色を濃くしておけば、一目でわかるよ。', 'Biểu đồ đường thì lần này có năm khu vực, các đường sẽ chồng lên nhau. … À không, làm biểu đồ thanh tỉ lệ, xếp ba năm trên dưới thì sao? Chỉ tô đậm phần Kansai là nhìn một cái thấy ngay.'],
      ['女', 'あ、なるほど。それならすぐ直せます。数字は、今のままパーセントで入れておけばいいですか。', 'À, ra vậy. Thế thì em sửa ngay được. Số liệu thì cứ để phần trăm như bây giờ được không ạ?'],
      ['男', 'うん、それでいい。金額にすると、年によって全体の大きさが違うから、かえって比べにくくなるしね。', 'Ừ, thế được. Đổi sang số tiền thì mỗi năm tổng quy mô khác nhau, lại càng khó so.'],
      ['男', 'それより、出典の書き方が社内の決まりと違うから、それも直しておいて。あ、でも、それは配布資料だけでいいか。画面のほうは、まずグラフだね。', 'Hơn nữa, cách ghi nguồn khác quy định của công ty, sửa luôn nhé. À mà cái đó chỉ cần sửa ở tài liệu phát tay thôi. Phần chiếu trên màn hình thì trước hết là biểu đồ.'],
      ['女', 'わかりました。じゃあ、先にグラフを直して、もう一度見ていただきます。', 'Em hiểu rồi ạ. Vậy em sửa biểu đồ trước rồi nhờ anh xem lại lần nữa.'],
    ],
    questions: [
      [
        '女の人は、画面に映す資料をどう直しますか。',
        ['円グラフを折れ線グラフにする', '三年分を帯グラフにまとめる', '割合の数字を金額に書き直す', '画面の出典の書き方を直す'],
        1,
        'Người đàn ông tự sửa ý mình (あ、いや): làm biểu đồ thanh tỉ lệ, xếp ba năm trên dưới — lựa chọn 2. Lựa chọn 1 là đề xuất của người phụ nữ, bị bác vì năm đường sẽ chồng nhau. Lựa chọn 3 bị gạt: giữ phần trăm. Lựa chọn 4 sai vì nguồn chỉ sửa ở tài liệu phát tay, không phải trên màn hình.',
      ],
    ],
    points: [
      ['円グラフ', 'えんぐらふ', 'biểu đồ tròn'],
      ['帯グラフ', 'おびぐらふ', 'biểu đồ thanh tỉ lệ'],
      ['折れ線グラフ', 'おれせんぐらふ', 'biểu đồ đường'],
      ['出典', 'しゅってん', 'nguồn trích dẫn'],
    ],
  }),
  item('w05', 'sogo-chokai', 3, {
    script: [
      ['男1', '来期に出す新しいお茶の販売目標ですが、去年の炭酸飲料が、初年度で七万本売れました。今回はそれ以上を目指したいと考えています。私としては、八万本で行きたいんですが、どうでしょう。', 'Về mục tiêu bán loại trà mới ra kỳ tới: năm ngoái nước có ga bán được bảy vạn chai ngay năm đầu. Lần này tôi muốn nhắm cao hơn. Ý tôi là tám vạn chai, mọi người thấy sao?'],
      ['女', '八万ですか……。あのう、去年の炭酸は、テレビのコマーシャルを打ちましたよね。今回は予算の関係で、ネット広告だけになると聞いています。', 'Tám vạn ạ…. Dạ, nước có ga năm ngoái có quảng cáo trên tivi phải không ạ. Lần này tôi nghe nói vì ngân sách nên chỉ quảng cáo trên mạng thôi.'],
      ['男1', 'ああ、そうでした。広告費は去年の半分でしたね。', 'À, đúng rồi. Chi phí quảng cáo chỉ bằng một nửa năm ngoái.'],
      ['男2', 'それに、お茶の市場は、この二年、ほぼ横ばいなんです。新しく飲む人が増えるというより、他社の商品から乗り換えてもらう形になります。', 'Thêm nữa, thị trường trà hai năm nay gần như đi ngang. Không phải người uống mới tăng lên, mà phải khiến người ta chuyển từ sản phẩm hãng khác sang.'],
      ['女', 'ですので、まず五万本で始めて、売れ行きを見るのがいいと思うんですが。', 'Vì vậy tôi nghĩ nên bắt đầu với năm vạn chai rồi xem tình hình bán.'],
      ['男1', 'うーん、ただ、五万だと、工場のほうが、ラインを動かす意味がないと言ってくるんですよ。最低でも六万は作りたいと。', 'Ừm, có điều năm vạn thì phía nhà máy sẽ bảo chạy dây chuyền chẳng bõ. Họ muốn sản xuất ít nhất sáu vạn.'],
      ['男2', 'でしたら、目標は六万にして、秋の三か月で二万本に届かなければ、年明けに見直す、という条件をつけてはどうでしょう。', 'Vậy thì đặt mục tiêu sáu vạn, kèm điều kiện: nếu ba tháng mùa thu không đạt hai vạn chai thì đầu năm xem lại, được không ạ?'],
      ['女', 'それなら、私も賛成です。数字が届かなかったときに、広告を足すのか、生産を減らすのか、そのときに決められますし。', 'Như vậy thì tôi cũng tán thành. Nếu không đạt số, khi đó sẽ quyết được là thêm quảng cáo hay giảm sản xuất.'],
      ['男1', 'それなら工場にも説明できますね。じゃあ、六万本、途中で見直しあり、ということで本部に出します。', 'Thế thì cũng giải thích được với nhà máy. Vậy sáu vạn chai, có xem lại giữa chừng, tôi sẽ trình lên trụ sở như thế.'],
    ],
    questions: [
      [
        '販売目標はどうなりましたか。',
        ['五万本から始めて様子を見る', '八万本にして広告を増やす', '六万本にし、途中で見直す', '去年と同じ七万本にする'],
        2,
        'Chốt sau じゃあ: sáu vạn chai, có xem lại giữa chừng nếu mùa thu không đạt hai vạn — lựa chọn 3. Lựa chọn 1 là đề xuất của người phụ nữ, bị gạt vì nhà máy cần ít nhất sáu vạn. Lựa chọn 2 là ý ban đầu của người đàn ông thứ nhất, bị bỏ vì chi phí quảng cáo chỉ còn một nửa. Lựa chọn 4 là số bán của nước có ga năm ngoái.',
      ],
    ],
    points: [
      ['横ばい', 'よこばい', 'đi ngang (không tăng không giảm)'],
      ['乗り換える', 'のりかえる', 'chuyển sang (sản phẩm khác)'],
      ['売れ行き', 'うれゆき', 'tình hình bán'],
      ['見直す', 'みなおす', 'xem xét lại'],
    ],
  }),
  item('w05', 'sogo-chokai', 4, {
    script: [
      ['男', '新しくこのエリアの担当になられた方ですね。今日はよろしくお願いします。早速ですが、うちの店の売上、前の担当の方には、ずいぶんほめていただいていたんですよ。', 'Chị là người mới phụ trách khu vực này phải không ạ. Hôm nay mong chị giúp đỡ. Vào việc luôn, doanh thu cửa hàng chúng tôi được người phụ trách trước khen nhiều lắm đấy ạ.'],
      ['女', 'ええ、資料で拝見しました。去年より一割伸びていますね。', 'Vâng, tôi đã xem trong tài liệu. Tăng mười phần trăm so với năm ngoái nhỉ.'],
      ['男', 'はい。駅前に大きなマンションができて、お客様の数がぐっと増えましたので。', 'Vâng. Trước ga mới có một khu chung cư lớn, nên lượng khách tăng hẳn.'],
      ['女', 'そうですね。ただ、私が店を見るときに一番気にしているのは、売上の合計よりも、一度来てくださったお客様が、もう一度来てくださるかどうかなんです。', 'Đúng vậy. Có điều, khi xem một cửa hàng, điều tôi để ý nhất không phải tổng doanh thu, mà là khách đã đến một lần có quay lại nữa hay không.'],
      ['男', 'もう一度、ですか。', 'Quay lại lần nữa ạ?'],
      ['女', 'ええ。会員カードのデータで見ると、こちらのお店は、初めて来た方が一か月以内にまた来る割合が、エリアの平均より低いんです。今は住む人が増えているから売上が伸びていますが、マンションの入居が一段落したら、止まってしまうかもしれません。', 'Vâng. Theo dữ liệu thẻ hội viên, ở cửa hàng này tỉ lệ người đến lần đầu quay lại trong vòng một tháng thấp hơn trung bình khu vực. Bây giờ người dọn đến ở tăng nên doanh thu tăng, nhưng khi việc dọn vào chung cư lắng xuống thì có thể sẽ chững lại.'],
      ['男', 'なるほど……。正直、そこは見ていませんでした。一人あたりの買い物の金額を上げることばかり考えていて。', 'Ra vậy…. Thật lòng tôi chưa nhìn tới điểm đó. Tôi chỉ toàn nghĩ cách tăng số tiền mua của mỗi khách.'],
      ['女', '客単価も大事ですけどね。まずは、二回目に来てもらうきっかけを作りたいので、来月、初めての方向けのクーポンを試してみませんか。', 'Giá trị mỗi khách cũng quan trọng chứ. Nhưng trước hết tôi muốn tạo cớ để khách đến lần thứ hai, nên tháng sau ta thử phiếu giảm giá cho khách đến lần đầu nhé?'],
      ['男', 'わかりました。スタッフにも話して、渡し方を考えてみます。', 'Tôi hiểu rồi. Tôi sẽ nói với nhân viên và nghĩ cách phát phiếu.'],
    ],
    questions: [
      [
        '女の人が店を見るときに最も重視していることは何ですか。',
        ['来店した客が再び訪れるか', '前の年と比べた売上の伸び', '客一人あたりの買い物の額', '新しく店に来る客の数'],
        0,
        'Người phụ nữ nói 一番気にしているのは…もう一度来てくださるかどうか — lựa chọn 1 diễn đạt lại thành "khách có quay lại không". Lựa chọn 2 là điều người trước khen, chị ấy đặt xuống sau (売上の合計よりも). Lựa chọn 3 là điều người cửa hàng trưởng đang chú ý. Lựa chọn 4 là lý do doanh thu tăng, mà chị ấy cho là sẽ chững lại.',
      ],
    ],
    points: [
      ['客単価', 'きゃくたんか', 'giá trị mua trung bình mỗi khách'],
      ['入居', 'にゅうきょ', 'dọn vào ở'],
      ['一段落する', 'いちだんらくする', 'tạm lắng, xong một chặng'],
    ],
  }),
];

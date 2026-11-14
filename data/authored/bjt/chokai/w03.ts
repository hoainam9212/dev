import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/** Week 3 — email and business correspondence. Level: J2 → J1. */
export const W03: BjtItem[] = [
  item('w03', 'bamen', 1, {
    material: {
      kind: 'scene',
      vi: 'Góc văn phòng có máy in. Một nam nhân viên đứng trước máy in, tay phải đang rút xấp giấy vừa in ra khỏi khay. Tay trái anh ta kẹp một phong bì lớn còn trống. Cạnh máy in có một máy huỷ giấy.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['男性が封筒に書類を入れています。', '男性が書類をシュレッダーにかけています。', '男性がプリンターに用紙を補充しています。', '男性が印刷された書類を取り出しています。'],
        3,
        'Anh ta đang rút giấy vừa in khỏi khay: 取り出す. Câu 1 nhắc tới phong bì (có trong ảnh) nhưng nó còn trống và anh chưa cho gì vào. Câu 2 nhắc tới máy huỷ giấy có trong ảnh nhưng không ai dùng. Câu 3 ngược chiều: 補充 là cho thêm giấy trắng vào máy.',
      ],
    ],
    points: [
      ['取り出す', 'とりだす', 'lấy ra'],
      ['補充する', 'ほじゅうする', 'bổ sung, châm thêm'],
      ['シュレッダーにかける', 'しゅれっだーにかける', 'cho vào máy huỷ giấy'],
    ],
  }),
  item('w03', 'bamen', 2, {
    material: {
      kind: 'scene',
      vi: 'Một nữ nhân viên ngồi ở bàn, đang dán tem lên một phong bì. Bên cạnh có một chồng phong bì đã ghi sẵn địa chỉ và tên người nhận. Trên bàn có một con dấu của công ty và hộp mực dấu, đang đóng nắp.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['女性が封筒に切手を貼っています。', '女性が封筒に宛名を書いています。', '女性が書類に印鑑を押しています。', '女性が郵便物を受け取っています。'],
        0,
        'Cô ấy đang dán tem: 切手を貼る. Câu 2 sai vì địa chỉ đã ghi sẵn từ trước. Câu 3 nhắc tới con dấu có trên bàn nhưng hộp mực đang đóng, không ai đóng dấu. Câu 4 sai chiều: cô đang chuẩn bị gửi đi, không phải nhận.',
      ],
    ],
    points: [
      ['宛名', 'あてな', 'tên và địa chỉ người nhận'],
      ['切手を貼る', 'きってをはる', 'dán tem'],
      ['印鑑を押す', 'いんかんをおす', 'đóng dấu'],
    ],
  }),
  item('w03', 'hatsugen', 1, {
    script: [
      ['状況', '昨日、取引先にメールで送った見積書が、無事に届いたかどうか、電話で確認したいです。何と言いますか。', 'Bạn muốn gọi điện xác nhận xem bản báo giá đã gửi qua email cho đối tác hôm qua đã tới nơi chưa. Bạn nói gì?'],
    ],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['昨日の見積書、お手元にお届けいただけますか。', '昨日の見積書、お手元に届けておきましょうか。', '昨日の見積書、お手元に届いておりますでしょうか。', '昨日の見積書、お手元に届いていらっしゃいますか。'],
        2,
        'Hỏi đã nhận được chưa: お手元に届いておりますでしょうか (lựa chọn 3). Lựa chọn 4 đúng ý nhưng đặt tôn kính ngữ いらっしゃる lên bản báo giá, là đồ vật của phía mình — sai chủ thể kính ngữ. Lựa chọn 1 nhờ đối tác mang tài liệu tới cho mình. Lựa chọn 2 đề nghị tự mang tới, trong khi tài liệu đã gửi qua email rồi.',
      ],
    ],
    points: [
      ['見積書', 'みつもりしょ', 'bản báo giá'],
      ['お手元', 'おてもと', 'trong tay (anh/chị)'],
    ],
  }),
  item('w03', 'hatsugen', 2, {
    script: [
      ['状況', '部長から、取引先へのお礼のメールを今日中に出しておくように言われました。わかったと返事をします。何と言いますか。', 'Trưởng bộ phận dặn bạn gửi email cảm ơn cho đối tác trong hôm nay. Bạn trả lời là đã hiểu. Bạn nói gì?'],
    ],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['恐れ入りました。本日中にお送りいたします。', '承知いたしました。本日中にお送りいたします。', '承知いたしました。本日中にお送りになります。', '承知いたしました。本日中にお送りいただきます。'],
        1,
        'Nhận lời dặn: 承知いたしました, việc gửi là của mình nên お送りいたします (lựa chọn 2). Lựa chọn 3 đúng ý nhưng dùng tôn kính ngữ お送りになる cho chính mình. Lựa chọn 4 nghĩa là "tôi sẽ được (ai đó) gửi cho", sai người làm. Lựa chọn 1 恐れ入りました là "tôi xin chịu, thật khâm phục", không dùng để nhận việc.',
      ],
    ],
    points: [
      ['承知いたしました', 'しょうちいたしました', 'tôi đã hiểu (nhận lời)'],
      ['恐れ入りました', 'おそれいりました', 'tôi xin chịu; thật khâm phục'],
    ],
  }),
  item('w03', 'hatsugen', 3, {
    script: [
      ['状況', '取引先から、資料をメールで送ってほしいと頼まれましたが、ファイルが大きすぎてメールでは送れません。何と言いますか。', 'Đối tác nhờ bạn gửi tài liệu qua email, nhưng tệp quá lớn nên không gửi qua email được. Bạn nói gì?'],
    ],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['あいにく、メールではお送りいたしかねます。', 'あいにく、メールではお送りになれません。', 'あいにく、メールではお送りしかねません。', 'あいにく、メールではお受けいたしかねます。'],
        0,
        'Từ chối khéo việc của mình: お送りいたしかねます = tôi khó mà gửi được (lựa chọn 1). Lựa chọn 2 đúng ý nhưng お〜になる là tôn kính ngữ, dùng cho chính mình. Lựa chọn 3 〜しかねない lại có nghĩa "có thể sẽ làm", ngược ý từ chối. Lựa chọn 4 nói không thể NHẬN qua email, trong khi việc khó là GỬI.',
      ],
    ],
    points: [
      ['〜いたしかねます', 'いたしかねます', 'khó mà làm được (từ chối lịch sự)'],
      ['〜しかねない', 'しかねない', 'có thể sẽ (xảy ra điều xấu)'],
    ],
  }),
  item('w03', 'hatsugen', 4, {
    script: [
      ['状況', '取引先の担当者から、丁寧なお礼のメールをもらっていました。今日、会ったときに、まずそのお礼を言います。何と言いますか。', 'Bạn đã nhận được email cảm ơn rất chu đáo từ người phụ trách bên đối tác. Hôm nay gặp họ, bạn cảm ơn về việc đó trước tiên. Bạn nói gì?'],
    ],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['先日は、ご丁寧にメールを差し上げ恐縮です。', '先日は、ご丁寧にメールをお送りいただけますか。', '先日は、ご丁寧にメールをいただき失礼しました。', '先日は、ご丁寧にメールをいただき恐縮です。'],
        3,
        'Mình nhận email của đối tác: メールをいただき恐縮です = được anh/chị gửi email, thật ngại quá (lựa chọn 4). Lựa chọn 1 đúng ý cảm ơn nhưng 差し上げる là khiêm nhường ngữ cho việc MÌNH gửi, đảo ngược người gửi. Lựa chọn 2 là nhờ gửi email, không phải cảm ơn. Lựa chọn 3 失礼しました là xin lỗi, không hợp khi nhận được sự chu đáo.',
      ],
    ],
    points: [
      ['ご丁寧に', 'ごていねいに', 'thật chu đáo'],
      ['差し上げる', 'さしあげる', 'gửi, biếu (khiêm nhường)'],
    ],
  }),
  item('w03', 'sogo-chokai', 1, {
    script: [
      ['男', '部長、先ほどお送りした、取引先への価格改定のお知らせのメール、見ていただけましたか。', 'Thưa trưởng bộ phận, anh/chị đã xem email thông báo điều chỉnh giá gửi các đối tác mà em vừa gửi chưa ạ?'],
      ['女', 'うん、見たよ。丁寧に書けてるね。ただ、ちょっと気になったところがあって。', 'Ừ, xem rồi. Viết cẩn thận đấy. Có điều có chỗ tôi hơi băn khoăn.'],
      ['男', 'はい。', 'Vâng.'],
      ['女', '最初の五行ぐらいが、ずっとおわびとごあいさつでしょう。先方が一番知りたいのは、いつから、いくらになるのか、よね。', 'Năm dòng đầu toàn là xin lỗi và chào hỏi. Điều đối tác muốn biết nhất là từ bao giờ và giá thành bao nhiêu, đúng không?'],
      ['男', 'ええ。ただ、値上げのお願いなので、まずはご負担をおかけすることを丁寧におわびしたほうがいいかと思いまして。', 'Vâng. Nhưng vì đây là xin tăng giá, nên em nghĩ trước hết nên xin lỗi thật kỹ vì đã gây thêm gánh nặng cho họ.'],
      ['女', 'その気持ちは大事よ。おわびは入れていいの。でも、読む人は毎日何十通もメールを受け取ってるから、何のお知らせで、何をお願いしたいのかが最初の数行でわからないと、後回しにされちゃう。だから、私が一番気にしてほしいのは、用件を先に書くこと。おわびはそのあとに、短くていいから。', 'Cái tâm đó quan trọng. Cứ để lời xin lỗi. Nhưng người đọc mỗi ngày nhận mấy chục email, nếu vài dòng đầu không biết là thông báo gì, nhờ việc gì thì sẽ bị để sau. Nên điều tôi muốn em lưu ý nhất là viết việc chính trước. Lời xin lỗi để sau, ngắn thôi cũng được.'],
      ['男', 'わかりました。件名も変えたほうがいいでしょうか。今は「いつもお世話になっております」にしているんですが。', 'Em hiểu rồi. Tiêu đề có nên đổi không ạ? Bây giờ em để là "Cảm ơn quý công ty luôn giúp đỡ".'],
      ['女', 'ああ、それも、用件がわかるようにしたほうがいいね。「価格改定のお知らせ」とか。あと、添付の価格表はPDFにしてくれる？向こうで開けないと困るから。', 'À, cái đó cũng nên sửa cho thấy việc chính. Kiểu "Thông báo điều chỉnh giá". Còn nữa, bảng giá đính kèm em chuyển sang PDF giúp nhé, bên kia không mở được thì phiền.'],
      ['男', '承知しました。直して、もう一度お送りします。', 'Vâng ạ. Em sửa rồi gửi lại.'],
    ],
    questions: [
      [
        '女の人がこのメールで一番大切だと考えていることは何ですか。',
        ['おわびを丁寧に書くこと', '件名に用件を入れること', '添付の表をPDFにすること', '依頼の内容を最初に示すこと'],
        3,
        'Người phụ nữ nói rõ 一番気にしてほしいのは、用件を先に書くこと: đưa việc chính lên đầu email (lựa chọn 4). Lựa chọn 1 là điều người đàn ông coi trọng; chị ấy chỉ cho giữ lời xin lỗi ở phía sau, ngắn thôi. Lựa chọn 2 và 3 có được nhắc tới nhưng chỉ là góp ý thêm sau đó.',
      ],
    ],
    points: [
      ['価格改定', 'かかくかいてい', 'điều chỉnh giá'],
      ['用件', 'ようけん', 'việc chính, nội dung cần nói'],
      ['後回し', 'あとまわし', 'để sau'],
      ['件名', 'けんめい', 'tiêu đề email'],
    ],
  }),
  item('w03', 'sogo-chokai', 2, {
    script: [
      ['女', '山下さん、昨日のさくら化成さんからのメール、値引きのご依頼の件、どうお返事しようか。', 'Anh Yamashita, email hôm qua của Hoá chất Sakura, vụ xin giảm giá ấy, mình trả lời thế nào đây?'],
      ['男1', '五パーセント値引きしてほしい、というものでしたね。正直、三パーセントが限界です。メールで「五パーセントはいたしかねます」とお返事しましょうか。', 'Họ muốn giảm năm phần trăm. Thật lòng mà nói, ba phần trăm là hết mức. Hay mình trả lời qua email: "Năm phần trăm thì chúng tôi khó đáp ứng"?'],
      ['女', 'うーん、お断りだけのメールだと、冷たい感じがしないかな。', 'Ừm, email chỉ có từ chối thì không thấy lạnh lùng sao?'],
      ['男2', 'ちょっといいかな。さくら化成さんとは長いお付き合いだし、いきなりメールでお断りするより、まず電話で事情をご説明したほうがいいと思うよ。', 'Cho tôi nói một chút. Bên Hoá chất Sakura là quan hệ lâu năm, nên thay vì từ chối thẳng qua email, tôi nghĩ nên gọi điện giải thích tình hình trước.'],
      ['男1', 'そうですね。では、私から先方のご担当の方にお電話して…。', 'Đúng ạ. Vậy tôi sẽ gọi cho người phụ trách bên đó…'],
      ['男2', 'いや、値段の話だから、電話は私がかけよう。三パーセントならお受けできる、ということも私から伝えるよ。', 'Không, chuyện giá cả thì để tôi gọi. Việc ba phần trăm thì nhận được, tôi cũng sẽ nói luôn.'],
      ['女', 'じゃあ、山下さんには、課長がお話しになった内容を、あとでメールにまとめてお送りしてもらう、ということでどうでしょう。言った言わないにならないように。', 'Vậy để anh Yamashita sau đó tóm tắt nội dung trưởng phòng đã nói thành email gửi họ, thế có được không ạ? Để sau này khỏi cãi nhau ai đã nói gì.'],
      ['男2', 'うん、そうしよう。ただ、メールは、私が電話して、先方のお返事を聞いてからにしてね。', 'Ừ, làm vậy đi. Có điều email thì đợi tôi gọi điện và nghe câu trả lời bên kia đã nhé.'],
      ['男1', 'わかりました。では、課長のお電話の結果を伺ってから、メールの案を作ります。お送りする前に、念のため課長に一度見ていただけますか。', 'Tôi hiểu rồi. Vậy tôi sẽ nghe kết quả cuộc gọi của trưởng phòng rồi mới soạn bản nháp email. Trước khi gửi, cho chắc, trưởng phòng xem qua giúp tôi một lần được không ạ?'],
    ],
    questions: [
      [
        '値引きの依頼への返事は、どのようにすることになりましたか。',
        ['山下さんがメールで断る', '山下さんが電話で説明する', '課長が電話し後でメールで残す', '課長がメールで条件を伝える'],
        2,
        'Cuối cùng trưởng phòng gọi điện (kèm điều kiện ba phần trăm), sau đó anh Yamashita tóm tắt lại bằng email để lưu lại (lựa chọn 3). Lựa chọn 1 là đề xuất đầu tiên, bị chê là lạnh lùng. Lựa chọn 2 bị trưởng phòng gạt vì chuyện giá cả ông ấy tự gọi. Lựa chọn 4 sai người và sai cách: trưởng phòng nói điều kiện qua điện thoại, không qua email.',
      ],
    ],
    points: [
      ['値引き', 'ねびき', 'giảm giá'],
      ['お付き合い', 'おつきあい', 'quan hệ làm ăn'],
      ['言った言わない', 'いったいわない', 'cãi nhau chuyện ai đã nói gì'],
      ['いたしかねます', 'いたしかねます', 'khó mà đáp ứng (từ chối lịch sự)'],
    ],
  }),
  item('w03', 'sogo-chokai', 3, {
    script: [
      ['男', 'えー、皆さん、ちょっといいですか。毎年十二月に取引先にお送りしている、年末のごあいさつ状の件です。', 'Ờ, mọi người cho tôi xin chút thời gian. Về thư chào cuối năm mà mỗi tháng Mười hai chúng ta gửi cho các đối tác.'],
      ['男', '去年までは、印刷したはがきに、宛名と一言を、それぞれが手書きして郵送していましたね。今年は、費用の面から、全部メールに切り替えてはどうか、という案が総務から出ていました。', 'Đến năm ngoái, mỗi người tự viết tay tên người nhận và một câu ngắn lên bưu thiếp đã in sẵn rồi gửi bưu điện. Năm nay, phòng hành chính có đề xuất vì chi phí nên chuyển toàn bộ sang email.'],
      ['男', 'ただ、営業部で話し合った結果、長くお付き合いのある取引先には、やはり紙のはがきのほうが喜ばれるだろう、ということになりました。ですので、はがきは続けます。', 'Nhưng phòng kinh doanh bàn bạc rồi, kết luận là với đối tác quen lâu năm thì bưu thiếp giấy vẫn được quý hơn. Vì vậy chúng ta tiếp tục dùng bưu thiếp.'],
      ['男', '変えるのは、手書きの一言です。去年は書くのに時間がかかって、発送が遅れた人が多かったので、今年は一言のほうは印刷にします。宛名は、今年もこれまでどおり、各自で手書きをお願いします。一言の文面は、私が考えて、今週の金曜までにお知らせします。今年は取引先が増えて、枚数が去年の倍近くになりますので、早めに取りかかってください。', 'Cái thay đổi là câu viết tay. Năm ngoái nhiều người viết mất thời gian nên gửi muộn, năm nay câu ngắn đó sẽ in sẵn. Tên người nhận thì năm nay vẫn như mọi năm, mỗi người tự viết tay. Nội dung câu ngắn tôi sẽ soạn và báo trước thứ Sáu tuần này. Năm nay đối tác tăng, số bưu thiếp gần gấp đôi năm ngoái, nên mọi người bắt tay vào sớm nhé.'],
      ['男', 'なお、会社名は略さずに、正式な名前で書いてください。リストは来週の月曜に共有フォルダに入れておきます。締め切りは去年と同じ二十日です。書き終わったら、総務の木下さんに渡してください。以上です。', 'Ngoài ra, tên công ty viết đầy đủ tên chính thức, đừng viết tắt. Danh sách tôi sẽ để vào thư mục chung thứ Hai tuần sau. Hạn chót vẫn là ngày hai mươi như năm ngoái. Viết xong thì đưa cho chị/anh Kinoshita bên hành chính. Hết.'],
    ],
    questions: [
      [
        '今年のごあいさつ状で、去年と変わることは何ですか。',
        ['はがきをメールに切り替える', '添える一言を印刷にする', '宛名を各自で手書きする', '二十日までに総務に渡す'],
        1,
        'Người nói nói rõ 変えるのは、手書きの一言です: năm nay câu ngắn được in sẵn (lựa chọn 2). Lựa chọn 1 là đề xuất của phòng hành chính đã bị bác. Lựa chọn 3 vẫn làm như mọi năm (これまでどおり). Lựa chọn 4 cũng giống năm ngoái (去年と同じ二十日).',
      ],
    ],
    points: [
      ['あいさつ状', 'あいさつじょう', 'thư chào hỏi'],
      ['宛名', 'あてな', 'tên, địa chỉ người nhận'],
      ['略す', 'りゃくす', 'viết tắt'],
      ['これまでどおり', 'これまでどおり', 'như từ trước tới nay'],
    ],
  }),
  item('w03', 'sogo-chokai', 4, {
    script: [
      ['男', '青葉食品さんからのご注文、まだ毎回FAXですよね。メールに変えていただけないか、お願いしてみませんか。', 'Đơn đặt hàng của Thực phẩm Aoba vẫn lần nào cũng gửi FAX nhỉ. Hay mình thử nhờ họ chuyển sang email?'],
      ['女', 'そうね。先方のご担当の方が、パソコンは苦手だっておっしゃってたから、ずっとそのままにしてたんだけど。', 'Ừ nhỉ. Người phụ trách bên đó từng nói không quen dùng máy tính, nên trước giờ cứ để vậy.'],
      ['男', '今月だけでも、FAXの字が読みにくくて、数量を電話で確認したことが三回ありました。', 'Chỉ riêng tháng này đã có ba lần chữ trên FAX khó đọc, phải gọi điện xác nhận số lượng.'],
      ['女', 'そうだったの。それは先方にもお手間をかけてるわね。', 'Vậy à. Thế là làm phiền cả bên họ rồi.'],
      ['男', 'それに、FAXだと紙で届くので、こちらで入力する手間もかかりますし、紙代も…。', 'Với lại FAX về bằng giấy nên bên mình mất công nhập liệu, rồi còn tiền giấy…'],
      ['女', '紙代はたいした額じゃないわよ。入力も、慣れれば数分でしょう。でも、数の読み違いは怖いわね。去年、一を七と読み間違えて、六ケースも多く送ってしまったことがあったじゃない。', 'Tiền giấy có đáng là bao. Nhập liệu thì quen tay cũng vài phút. Nhưng đọc nhầm số thì đáng sợ. Năm ngoái chẳng phải đã đọc nhầm số một thành số bảy, gửi thừa tới sáu thùng đó sao.'],
      ['男', 'ありましたね。じゃあ、メールの注文書のひな形を作って、お送りしてみます。', 'Đúng là có. Vậy em sẽ làm mẫu đơn đặt hàng qua email rồi gửi thử cho họ.'],
      ['女', 'ちょっと待って。いきなり新しい注文書に変えてくださいと言うと、先方が困ると思う。今お使いの注文書の形をそのまま表計算のファイルにして、数字を打ち込むだけで送れるようにしてさしあげたら？', 'Khoan đã. Tự nhiên bảo họ đổi sang mẫu đơn mới thì chắc họ sẽ lúng túng. Hay em làm mẫu đơn họ đang dùng thành tệp bảng tính y hệt, để họ chỉ cần gõ số vào là gửi được?'],
      ['男', 'なるほど。それなら、先方の手間も増えませんね。', 'Ra vậy. Như thế thì bên họ cũng không thêm việc.'],
      ['女', 'ええ。まずは来月一か月、試していただけるようお願いしてみて。', 'Ừ. Trước hết em nhờ họ dùng thử trong một tháng tới xem.'],
    ],
    questions: [
      [
        '女の人は、注文をメールにする一番の利点は何だと考えていますか。',
        ['数を読み違えずに済む', '紙代がかからなくなる', '入力の手間が省ける', '先方の手間が増えない'],
        0,
        'Người phụ nữ gạt tiền giấy và công nhập liệu là chuyện nhỏ, rồi nói 数の読み違いは怖い, kèm ví dụ gửi thừa sáu thùng: lợi ích chính là hết đọc nhầm số lượng (lựa chọn 1). Lựa chọn 2 và 3 là ý của người đàn ông bị chị ấy coi nhẹ. Lựa chọn 4 nói về cách chuyển đổi (dùng lại mẫu cũ), không phải lợi ích của việc dùng email.',
      ],
    ],
    points: [
      ['数量', 'すうりょう', 'số lượng'],
      ['読み違い', 'よみちがい', 'đọc nhầm'],
      ['ひな形', 'ひながた', 'mẫu, biểu mẫu'],
      ['表計算', 'ひょうけいさん', 'bảng tính'],
    ],
  }),
];

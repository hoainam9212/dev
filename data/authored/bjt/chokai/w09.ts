import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/** Week 9 — complaints and apologies. Level: J1. */
export const W09: BjtItem[] = [
  item('w09', 'bamen', 1, {
    material: {
      kind: 'scene',
      vi: 'Quầy chăm sóc khách hàng. Một vị khách nam đặt một hộp sản phẩm bị móp góc lên quầy và chỉ tay vào chỗ móp. Nữ nhân viên đứng sau quầy, cúi đầu. Trên quầy có một tờ phiếu và cây bút chưa ai dùng; hộp vẫn còn băng dính niêm phong.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['女性が客に商品を手渡しています。', '客が用紙に記入しています。', '女性が箱を開けて中身を確認しています。', '客が箱のへこんだところを指しています。'],
        3,
        'Khách chỉ vào góc hộp bị móp: へこんだところを指している. Phiếu và bút chưa ai dùng. Hộp còn niêm phong nên chưa ai mở. Người phụ nữ đang cúi đầu, không đưa gì cho khách.',
      ],
    ],
    points: [
      ['へこむ', 'へこむ', 'móp, lõm'],
      ['窓口', 'まどぐち', 'quầy tiếp nhận'],
    ],
  }),
  item('w09', 'bamen', 2, {
    material: {
      kind: 'scene',
      vi: 'Văn phòng. Một nam nhân viên đứng cạnh bàn, tay trái áp ống nghe điện thoại bàn vào tai, người hơi cúi về phía trước như đang cúi đầu xin lỗi. Tay phải anh cầm một tờ hoá đơn. Xung quanh không có ai khác.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['男性が電話をしながら頭を下げています。', '男性が請求書を書いています。', '男性が電話を切ろうとしています。', '男性が客の前でおじぎをしています。'],
        0,
        'Anh ta vừa nghe điện thoại vừa cúi đầu: 頭を下げる. Câu 4 có động tác cúi chào nhưng sai vì xung quanh không có khách. Anh cầm hoá đơn chứ không viết. Không có dấu hiệu sắp cúp máy.',
      ],
    ],
    points: [
      ['頭を下げる', 'あたまをさげる', 'cúi đầu (xin lỗi, cảm ơn)'],
      ['請求書', 'せいきゅうしょ', 'hoá đơn đề nghị thanh toán'],
    ],
  }),
  item('w09', 'hatsugen', 1, {
    script: [
      ['状況', 'お客様から苦情の電話を受けました。担当者に代わる前に、少し待ってもらいます。何と言いますか。', 'Bạn nhận cuộc gọi khiếu nại của khách. Trước khi chuyển máy cho người phụ trách, bạn nhờ khách chờ một chút. Bạn nói gì?'],
    ],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['担当に代わりますので、少々お待ちしてください。', '担当に代わりますので、少々お待ちしております。', '担当の者がお出になりますので、少々お待ちください。', '担当に代わりますので、少々お待ちください。'],
        3,
        'Nhờ khách chờ thì dùng お待ちください; việc chuyển máy là của phía mình nên 代わります là đủ. Lựa chọn 1 dễ nhầm nhất: お待ちする là khiêm nhường ngữ, đem dùng cho hành động của khách là sai chủ thể. Lựa chọn 3 dùng tôn kính ngữ お出になる (nghe máy) cho đồng nghiệp của mình. Lựa chọn 2 thành "tôi sẽ chờ", sai ý.',
      ],
    ],
    points: [
      ['少々お待ちください', 'しょうしょうおまちください', 'xin vui lòng chờ một chút'],
      ['担当', 'たんとう', 'người phụ trách'],
    ],
  }),
  item('w09', 'hatsugen', 2, {
    script: [
      ['状況', '納品した商品の箱がつぶれていたと、取引先から連絡がありました。まずおわびします。何と言いますか。', 'Đối tác báo rằng thùng hàng bạn giao bị bẹp. Trước hết bạn xin lỗi. Bạn nói gì?'],
    ],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['ご迷惑をおかけし、申し訳ございません。', 'ご迷惑をおかけになり、申し訳ございません。', 'ご迷惑をおかけし、残念に存じます。', 'ご迷惑をおかけいただき、申し訳ございません。'],
        0,
        'ご迷惑をおかけし là khiêm nhường ngữ cho việc phía mình gây phiền, rồi xin lỗi bằng 申し訳ございません. Lựa chọn 2 đúng ý nhưng おかけになる là tôn kính ngữ, nghe như đối tác mới là người gây phiền. Lựa chọn 4 cũng đảo chủ thể (được đối tác gây phiền cho). Lựa chọn 3 chỉ nói "thật đáng tiếc", né trách nhiệm, không phải lời xin lỗi.',
      ],
    ],
    points: [
      ['迷惑をかける', 'めいわくをかける', 'gây phiền'],
      ['つぶれる', 'つぶれる', 'bẹp, dập'],
    ],
  }),
  item('w09', 'hatsugen', 3, {
    script: [
      ['状況', '苦情を言ってきたお客様に、原因を調べてから折り返し電話すると伝えます。何と言いますか。', 'Bạn báo cho vị khách vừa khiếu nại rằng bạn sẽ tìm hiểu nguyên nhân rồi gọi lại. Bạn nói gì?'],
    ],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['原因を調べまして、折り返しお電話いただけますか。', '原因を調べまして、折り返しお電話なさいます。', '原因を調べまして、折り返しお電話いたします。', '原因をお調べになって、折り返しお電話いたします。'],
        2,
        'Cả việc tìm nguyên nhân lẫn việc gọi lại đều là của mình, nên お電話いたします (khiêm nhường ngữ). Lựa chọn 4 đúng ý nhưng お調べになる là tôn kính ngữ, dùng cho việc của chính mình là sai chủ thể. Lựa chọn 2 dùng なさる cho mình. Lựa chọn 1 lại nhờ khách gọi lại, ngược với điều cần nói.',
      ],
    ],
    points: [
      ['折り返し', 'おりかえし', 'gọi lại (sau khi nhận cuộc gọi)'],
      ['原因', 'げんいん', 'nguyên nhân'],
    ],
  }),
  item('w09', 'hatsugen', 4, {
    script: [
      ['状況', 'おわびに伺った取引先の応接室で、一緒に来た課長を相手に紹介します。何と言いますか。', 'Tại phòng tiếp khách của đối tác nơi bạn đến xin lỗi, bạn giới thiệu trưởng phòng đi cùng với phía bên kia. Bạn nói gì?'],
    ],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['こちらが課長の田村さんでございます。', 'こちらが課長の田村でございます。', 'こちらが田村課長でいらっしゃいます。', 'こちらが課長の田村と申されます。'],
        1,
        'Giới thiệu người trong công ty mình với người ngoài thì gọi trống tên, chức danh đặt trước: 課長の田村. Lựa chọn 3 đúng ý nhưng dùng tôn kính ngữ いらっしゃる và 田村課長 cho cấp trên của mình trước mặt khách, sai chủ thể. Lựa chọn 1 thêm さん cho người nhà. Lựa chọn 4 dùng 申される, kính ngữ sai.',
      ],
    ],
    points: [
      ['課長の田村', 'かちょうのたむら', 'cách gọi cấp trên của mình với người ngoài'],
      ['応接室', 'おうせつしつ', 'phòng tiếp khách'],
    ],
  }),
  item('w09', 'sogo-chokai', 1, {
    script: [
      ['男', '課長、すみません。ホテル青葉さんから、昨日お届けしたタオルに、しみが付いているものが混じっていたとお電話がありまして。', 'Thưa trưởng phòng, xin lỗi ạ. Khách sạn Aoba vừa gọi, nói trong số khăn mình giao hôm qua có lẫn khăn bị dính vết bẩn.'],
      ['女', 'えっ、何枚くらい？', 'Hả, khoảng bao nhiêu cái?'],
      ['男', '二百枚のうち、三十枚ほどだそうです。すぐに代わりのタオルをお届けして、私が一人でおわびに伺おうと思うんですが。', 'Nghe nói khoảng ba mươi trên hai trăm cái. Em định giao ngay khăn thay thế, rồi tự mình đến xin lỗi ạ.'],
      ['女', '代わりは、もちろん今日中に送らないとね。ただ、ホテルさんは今週末、結婚式が二件入ってるはずだから、三十枚じゃ足りないかもしれない。', 'Khăn thay thì tất nhiên phải gửi trong hôm nay. Có điều cuối tuần này khách sạn có hai đám cưới, nên ba mươi cái có khi không đủ.'],
      ['男', 'あ、そうですね。じゃあ、念のため五十枚お送りします。', 'À, đúng ạ. Vậy để chắc ăn, em gửi năm mươi cái.'],
      ['女', 'うん。で、おわびなんだけど、何も持たずに行っても、また同じことが起きないのかって聞かれるだけだと思うの。', 'Ừ. Còn việc xin lỗi, chị nghĩ đến tay không thì người ta chỉ hỏi "liệu có lặp lại nữa không" thôi.'],
      ['男', '原因、ですね。', 'Nguyên nhân, phải không ạ.'],
      ['女', 'そう。昨日の分をどの工場のどの機械で洗ったのか、まず工場に確認して。それがわかってから、私も一緒に伺うから。', 'Đúng. Trước hết hỏi nhà máy xem lô hôm qua được giặt ở nhà máy nào, máy nào. Biết rồi thì chị sẽ cùng em đến.'],
      ['男', 'わかりました。あ、でも、代わりのタオルの手配は…。', 'Em hiểu rồi. À, nhưng việc chuẩn bị khăn thay thì…'],
      ['女', 'それは配送の係にもう頼んであるから大丈夫。ホテルさんには私から一本電話を入れて、夕方までに代わりが届くことと、改めて伺うことをお伝えしておくね。', 'Việc đó chị đã nhờ bên giao hàng rồi, không sao. Chị sẽ gọi một cuộc cho khách sạn, báo là khăn thay sẽ đến trước chiều tối và mình sẽ đến sau.'],
      ['男', 'ありがとうございます。では、すぐに工場に電話してみます。わかったら、すぐにご報告します。', 'Cảm ơn chị. Vậy em gọi cho nhà máy ngay ạ. Biết được gì em sẽ báo chị ngay.'],
    ],
    questions: [
      [
        '男の人は、まず何をしますか。',
        ['代わりのタオルを五十枚届ける', '洗った場所を工場に確かめる', '一人でホテルにおわびに行く', '課長と一緒にホテルを訪ねる'],
        1,
        'Trưởng phòng bảo "trước hết hỏi nhà máy xem giặt ở đâu, máy nào", anh ấy chốt sẽ gọi nhà máy ngay; lựa chọn 2 diễn đạt lại ý đó. Lựa chọn 1 dễ nhầm vì có nói tới năm mươi cái, nhưng việc đó trưởng phòng đã nhờ bên giao hàng. Lựa chọn 3 là ý ban đầu của anh, bị gác lại. Lựa chọn 4 là bước sau khi biết nguyên nhân.',
      ],
    ],
    points: [
      ['しみ', 'しみ', 'vết bẩn, vết ố'],
      ['念のため', 'ねんのため', 'để cho chắc'],
      ['手配', 'てはい', 'sắp xếp, chuẩn bị'],
    ],
  }),
  item('w09', 'sogo-chokai', 2, {
    script: [
      ['男', '室長、先ほどのお客様、一時間近くお話しされてましたね。', 'Thưa trưởng phòng, vị khách vừa rồi nói chuyện gần một tiếng nhỉ.'],
      ['女', 'うん。冷凍ギョーザの袋が破れてたっていうお話だったんだけど、途中から、前に買ったお弁当のことまで出てきてね。', 'Ừ. Chuyện là túi há cảo đông lạnh bị rách, nhưng đến giữa chừng thì lôi cả chuyện hộp cơm mua trước đây ra.'],
      ['男', '正直、途中で切り上げてもよかったんじゃないかと思いながら聞いてたんですが。', 'Thật lòng em vừa nghe vừa nghĩ có lẽ cắt ngang giữa chừng cũng được.'],
      ['女', '時間だけ考えれば、そうかもしれない。でもね、うちでは、お客様が何に一番腹を立てているのか、それがわかるまでは話をさえぎらないことにしてるの。', 'Nếu chỉ tính thời gian thì có thể đúng. Nhưng chỗ mình có quy ước: chưa biết khách bực nhất vì điều gì thì không cắt lời.'],
      ['男', '何に腹を立てているのか、ですか。', 'Bực vì điều gì ạ?'],
      ['女', 'そう。袋が破れていたっていうだけなら、交換して終わりでしょう。でも、それで済ませると、本当の不満が残ったままになっちゃうのよ。', 'Ừ. Nếu chỉ là chuyện túi rách thì đổi hàng là xong. Nhưng giải quyết kiểu đó thì nỗi bực thật sự vẫn còn nguyên.'],
      ['女', '今日の方も、袋が破れていたことより、前に電話したときに、うちの担当者に「よくあることです」って言われたのが許せなかったみたいで。', 'Vị hôm nay cũng vậy, cái không chấp nhận được không phải túi rách, mà là lần trước gọi đến bị nhân viên bên mình nói "chuyện thường thôi".'],
      ['男', 'ああ、それで長くなったんですね。じゃあ、おわびの品をすぐにお送りしたほうがいいでしょうか。', 'À, ra vì thế mà dài. Vậy mình có nên gửi quà xin lỗi ngay không ạ?'],
      ['女', '品物は、規定どおりでいいの。それより、前の担当者の言い方については、私から改めてお電話して謝ることにした。', 'Quà thì cứ theo quy định là được. Quan trọng hơn, về cách nói của nhân viên lần trước, chị quyết định sẽ tự gọi lại xin lỗi.'],
      ['男', '対応マニュアルの言い方も、見直したほうがいいかもしれませんね。', 'Có lẽ cũng nên xem lại cách nói trong sổ tay ứng xử nhỉ.'],
      ['女', 'そうね。それは来月の会議で話しましょう。気がついたことがあったら、メモしておいて。', 'Ừ. Chuyện đó để họp tháng sau bàn. Em thấy điều gì thì ghi lại nhé.'],
    ],
    questions: [
      [
        '女の人が苦情の電話で最も大切にしていることは何ですか。',
        ['電話をなるべく早く終わらせること', 'おわびの品をすぐに送ること', 'マニュアルの言い方を見直すこと', '怒りの本当の理由を聞き出すこと'],
        3,
        'Chị nói quy ước là chưa biết khách bực nhất vì điều gì thì không cắt lời; lựa chọn 4 diễn đạt lại ý đó. Lựa chọn 1 là suy nghĩ của người nhân viên, chị đã bác. Lựa chọn 2 cũng là ý của anh, chị nói quà cứ theo quy định. Lựa chọn 3 là đề xuất của anh và để tới họp tháng sau, không phải điều chị coi trọng nhất.',
      ],
    ],
    points: [
      ['切り上げる', 'きりあげる', 'kết thúc sớm, cắt ngang'],
      ['腹を立てる', 'はらをたてる', 'nổi giận, bực'],
      ['さえぎる', 'さえぎる', 'cắt lời, chặn ngang'],
    ],
  }),
  item('w09', 'sogo-chokai', 3, {
    script: [
      ['井上', '正直に申し上げて、今回は本当に困りました。机が三日遅れたせいで、新しい事務所の開所式を延ばすことになったんですから。', 'Thật lòng mà nói, lần này chúng tôi rất khổ. Vì bàn đến trễ ba ngày nên phải hoãn lễ khai trương văn phòng mới.'],
      ['岡田', '誠に申し訳ございませんでした。', 'Chúng tôi thành thật xin lỗi.'],
      ['石川', '私からも、心よりおわび申し上げます。つきましては、今回の机の代金から一割をお値引きさせていただければと考えておりますが。', 'Tôi cũng xin chân thành xin lỗi. Về việc này, chúng tôi muốn xin được giảm một phần mười tiền bàn lần này.'],
      ['井上', 'お気持ちはありがたいんですが、値引きしていただいても、延期した開所式の会場のキャンセル料のほうが高かったので…。', 'Tấm lòng thì tôi cảm kích, nhưng có giảm giá thì tiền huỷ địa điểm của lễ khai trương bị hoãn còn cao hơn…'],
      ['石川', 'さようでございますか。でしたら、そのキャンセル料を弊社で負担させていただくというのは。', 'Vậy ạ. Thế thì bên chúng tôi xin được chịu khoản tiền huỷ đó, chị/anh thấy sao ạ.'],
      ['井上', 'いえ、そこまでは。それより、来年の春に支店をもう一つ出す予定なんです。そのときに同じことが起きないようにしていただきたいんです。', 'Không, không cần đến mức đó. Quan trọng hơn, mùa xuân năm sau chúng tôi định mở thêm một chi nhánh. Tôi muốn lúc đó đừng để chuyện tương tự xảy ra.'],
      ['岡田', '今回遅れたのは、配送の手配が工場の出荷と合っていなかったためでした。次回は、私が工場と配送の両方の日程を、毎週ご報告いたします。', 'Lần này bị trễ là do lịch giao hàng không khớp với lịch xuất xưởng. Lần tới, tôi sẽ báo cáo hằng tuần cả lịch nhà máy lẫn lịch giao hàng.'],
      ['井上', '毎週ですか。それは助かります。それから、念のため、開所の一週間前には納品を済ませていただけますか。', 'Hằng tuần ạ? Vậy thì đỡ cho tôi quá. Thêm nữa, để chắc, anh/chị có thể giao xong trước ngày khai trương một tuần không?'],
      ['石川', 'かしこまりました。お約束いたします。', 'Vâng, chúng tôi xin hứa.'],
      ['井上', 'では、今回の件はそれで結構です。値引きもキャンセル料も、なしで構いません。', 'Vậy chuyện lần này như thế là được. Giảm giá hay tiền huỷ đều không cần.'],
    ],
    questions: [
      [
        '今回の苦情は、最終的にどのようにまとまりましたか。',
        ['次回は工程を毎週伝え、早めに納める', '今回の机の代金を一割値引きする', '会場のキャンセル料を家具会社が払う', '開所式をさらに三日延期する'],
        0,
        'Chị/anh Inoue nhận đề xuất báo lịch hằng tuần và giao trước một tuần, rồi nói không cần giảm giá hay tiền huỷ; lựa chọn 1 diễn đạt lại. Lựa chọn 2 và 3 là đề nghị của phía công ty nội thất nhưng đều bị từ chối. Lựa chọn 4 dùng con số ba ngày, vốn là số ngày trễ đã qua.',
      ],
    ],
    points: [
      ['開所式', 'かいしょしき', 'lễ khai trương (văn phòng)'],
      ['つきましては', 'つきましては', 'về việc đó, do đó (trang trọng)'],
      ['負担する', 'ふたんする', 'chịu (chi phí)'],
      ['出荷', 'しゅっか', 'xuất hàng'],
    ],
  }),
  item('w09', 'sogo-chokai', 4, {
    script: [
      ['男', 'おはようございます。品質管理課の大西です。来月一日から、お客様相談室に入ったご指摘を、新しい共有システムで工場にもお知らせすることになりましたので、ご説明します。', 'Chào buổi sáng. Tôi là Onishi, phòng quản lý chất lượng. Từ ngày 1 tháng sau, các phản ánh gửi đến phòng tư vấn khách hàng sẽ được báo cả cho nhà máy qua hệ thống chia sẻ mới, nên tôi xin giải thích.'],
      ['男', 'これまでは、相談室で受けた内容を週に一回まとめて、報告書にして工場に送っていました。そのため、工場が問題を知るまでに、長いと一週間かかっていました。', 'Trước nay, nội dung phòng tư vấn tiếp nhận được gom mỗi tuần một lần, làm thành báo cáo gửi nhà máy. Vì vậy, có khi mất tới một tuần nhà máy mới biết có vấn đề.'],
      ['男', '新しいシステムでは、相談室の担当者が入力した内容が、その日のうちに、工場の各ラインの責任者の画面に表示されます。責任者は内容を確認したら、画面上で「確認済み」を押してください。', 'Với hệ thống mới, nội dung nhân viên phòng tư vấn nhập vào sẽ hiện lên màn hình của người phụ trách từng dây chuyền ở nhà máy ngay trong ngày. Người phụ trách xem xong nội dung thì bấm "Đã xác nhận" trên màn hình.'],
      ['男', '報告書を作る手間がなくなりますので、相談室の皆さんの残業も、月に十時間ほど減る見込みです。また、ご指摘の件数をグラフで見られるようにもなります。', 'Vì không còn mất công làm báo cáo, giờ làm thêm của mọi người ở phòng tư vấn dự kiến giảm khoảng mười giờ mỗi tháng. Ngoài ra còn xem được số phản ánh dưới dạng biểu đồ.'],
      ['男', 'ただ、私どもが一番期待しているのは、そこではありません。同じ原因の不良品が一週間作られ続けてしまう、ということがなくなる。つまり、問題がわかったその日に、ラインを止めて原因を調べられるようになる点です。', 'Nhưng điều chúng tôi mong đợi nhất không phải ở đó. Đó là sẽ không còn chuyện hàng lỗi cùng một nguyên nhân bị sản xuất suốt một tuần. Tức là, ngay hôm biết có vấn đề, có thể dừng dây chuyền để tìm nguyên nhân.'],
      ['男', 'なお、入力の仕方については、十一月二十五日の水曜日に説明会を行います。相談室の方は、必ずご参加ください。ご都合の悪い方のために、二十七日の金曜日にももう一回行います。', 'Ngoài ra, về cách nhập liệu, sẽ có buổi hướng dẫn vào thứ Tư ngày 25/11/2026. Mọi người ở phòng tư vấn nhất định tham dự. Ai không tiện thì có thêm một buổi nữa vào thứ Sáu ngày 27.'],
    ],
    questions: [
      [
        '新しいシステムの最も大きな利点は何ですか。',
        ['相談室の残業が月に十時間減ること', '指摘の件数をグラフで見られること', '問題に工場がすぐ手を打てること', '報告書を週に一回まとめられること'],
        2,
        'Người nói nhấn mạnh 一番期待しているのは: ngay hôm biết vấn đề là dừng dây chuyền tìm nguyên nhân được; lựa chọn 3 diễn đạt lại. Lựa chọn 1 và 2 cũng là lợi ích có nói tới, nhưng người nói bảo rõ "không phải ở đó". Lựa chọn 4 là cách làm cũ đang bị thay.',
      ],
    ],
    points: [
      ['指摘', 'してき', 'phản ánh, chỉ ra (lỗi)'],
      ['不良品', 'ふりょうひん', 'hàng lỗi'],
      ['見込み', 'みこみ', 'dự kiến'],
      ['手を打つ', 'てをうつ', 'ra tay xử lý, có biện pháp'],
    ],
  }),
];

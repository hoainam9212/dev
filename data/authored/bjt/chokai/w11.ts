import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/** Week 11 — HR, evaluation and training; conversations at natural speed. Level: J1. */
export const W11: BjtItem[] = [
  item('w11', 'bamen', 1, {
    material: {
      kind: 'scene',
      vi: 'Phòng phỏng vấn. Hai người phỏng vấn ngồi sau một chiếc bàn dài; một người đang lật hồ sơ của ứng viên, người kia nhìn ứng viên. Một ứng viên nữ ngồi đối diện, hai tay đặt trên đùi, đang trả lời. Cửa phía sau ứng viên đã đóng.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['面接官が応募者と握手をしています。', '応募者が履歴書を書いています。', '面接官の一人が書類をめくっています。', '応募者が部屋に入ろうとしています。'],
        2,
        'Một người phỏng vấn đang lật hồ sơ: 書類をめくる. Ứng viên đã ngồi và đang trả lời, cửa đã đóng, nên không phải "sắp vào phòng". Tay ứng viên đặt trên đùi, không viết gì.',
      ],
    ],
    points: [
      ['めくる', 'めくる', 'lật (trang)'],
      ['応募者', 'おうぼしゃ', 'người ứng tuyển'],
      ['面接官', 'めんせつかん', 'người phỏng vấn'],
    ],
  }),
  item('w11', 'bamen', 2, {
    material: {
      kind: 'scene',
      vi: 'Phòng đào tạo. Các học viên ngồi thành nhóm bốn người quanh từng bàn, đang trao đổi với nhau; ở mỗi bàn có một người viết lên tờ giấy khổ lớn. Nam giảng viên đứng ở phía trước, cạnh bảng trắng, nhìn các nhóm.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['受講者がグループで話し合っています。', '講師が受講者に資料を配っています。', '受講者が一人ずつ発表しています。', '講師が座って話を聞いています。'],
        0,
        'Học viên đang thảo luận theo nhóm: グループで話し合う. Không ai đứng trình bày riêng. Giảng viên đứng phía trước nhìn các nhóm, không phát tài liệu cũng không ngồi.',
      ],
    ],
    points: [
      ['受講者', 'じゅこうしゃ', 'học viên'],
      ['講師', 'こうし', 'giảng viên'],
    ],
  }),

  // ── 発言聴解 ──
  item('w11', 'hatsugen', 1, {
    script: [['状況', '部長が、あなたの書いた研修報告書を読んでくださったそうです。部長にお礼を言います。何と言いますか。', 'Nghe nói trưởng bộ phận đã đọc bản báo cáo đào tạo bạn viết. Bạn cảm ơn trưởng bộ phận. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['報告書を拝読いただき、ありがとうございます。', '報告書をお読みしていただき、ありがとうございます。', '報告書をご覧に入れ、ありがとうございます。', '報告書をお読みいただき、ありがとうございます。'],
        3,
        'Người đọc là trưởng bộ phận, nên dùng tôn kính ngữ cho hành động đọc: お読みいただき (lựa chọn 4). Lựa chọn 1 dễ chọn nhất vì nghe rất trang trọng, nhưng 拝読 là khiêm nhường ngữ, chỉ dùng cho việc CHÍNH MÌNH đọc, nên sai chủ thể. Lựa chọn 2 trộn khiêm nhường お〜する với いただく. Lựa chọn 3 ご覧に入れる nghĩa là "tôi cho ngài xem", sai nghĩa.',
      ],
    ],
    points: [
      ['お読みいただく', 'およみいただく', '(được người trên) đọc cho'],
      ['拝読する', 'はいどくする', '(tôi) đọc — khiêm nhường ngữ'],
      ['ご覧に入れる', 'ごらんにいれる', '(tôi) cho (ngài) xem'],
    ],
  }),
  item('w11', 'hatsugen', 2, {
    script: [['状況', '採用面接に来た応募者に、面接の開始まで控室で少し待ってもらうよう頼みます。何と言いますか。', 'Bạn nhờ ứng viên đến phỏng vấn tuyển dụng đợi một chút ở phòng chờ cho tới lúc bắt đầu phỏng vấn. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['こちらで少々お待ち申し上げております。', 'こちらで少々お待ちいただけますでしょうか。', 'こちらで少々お待ちしていただけますか。', 'こちらで少々お待ちいたしましょうか。'],
        1,
        'Người đợi là ứng viên, nên nhờ bằng お待ちいただけますでしょうか (lựa chọn 2). Lựa chọn 3 dễ chọn vì cũng có いただけますか, nhưng お待ちして là khiêm nhường ngữ, không dùng cho hành động của người nghe. Lựa chọn 1 và 4 đổi chủ thể thành "tôi đợi", trái với điều muốn nhờ.',
      ],
    ],
    points: [
      ['控室', 'ひかえしつ', 'phòng chờ'],
      ['お待ちいただく', 'おまちいただく', '(nhờ người khác) đợi'],
    ],
  }),
  item('w11', 'hatsugen', 3, {
    script: [['状況', '社内研修の最後に、受講者に、今日の資料は後日メールで送ると伝えます。何と言いますか。', 'Cuối buổi đào tạo nội bộ, bạn báo với học viên rằng tài liệu hôm nay sẽ được gửi qua email sau. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['本日の資料は、後日メールでお送りします。', '本日の資料は、後日メールでお送りになります。', '本日の資料は、後日メールでお受け取りします。', '本日の資料は、後日メールでお送りくださいます。'],
        0,
        'Người gửi là mình, nên dùng khiêm nhường お送りします (lựa chọn 1). Lựa chọn 2 dễ chọn vì nghe trang trọng hơn, nhưng お〜になる là tôn kính ngữ, đem dùng cho hành động của chính mình là sai chủ thể. Lựa chọn 3 đổi thành "tôi nhận". Lựa chọn 4 nghĩa là "(ai đó) gửi cho", không phải lời của người gửi.',
      ],
    ],
    points: [
      ['後日', 'ごじつ', 'hôm khác, sau này'],
      ['お送りする', 'おおくりする', '(tôi) gửi — khiêm nhường ngữ'],
    ],
  }),
  item('w11', 'hatsugen', 4, {
    script: [['状況', '評価面談で、課長から来期は新人の指導も担当してほしいと言われました。引き受けると伝えます。何と言いますか。', 'Trong buổi gặp đánh giá, trưởng phòng muốn bạn kỳ tới đảm nhận cả việc kèm nhân viên mới. Bạn nhận lời. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['私でよろしければ、ぜひ担当なさってください。', '私でよろしければ、ぜひご担当させていただきます。', '私でよろしければ、ぜひ担当させていただきます。', '私でよろしければ、ぜひ担当していただきます。'],
        2,
        'Người đảm nhận là mình, nên nói 担当させていただきます (lựa chọn 3). Lựa chọn 2 dễ chọn vì gần giống, nhưng thêm ご trước hành động của chính mình là thừa và sai. Lựa chọn 4 nghĩa là "tôi sẽ nhờ ngài làm". Lựa chọn 1 lại bảo trưởng phòng tự đảm nhận.',
      ],
    ],
    points: [
      ['来期', 'らいき', 'kỳ tới'],
      ['引き受ける', 'ひきうける', 'nhận (việc)'],
      ['担当させていただく', 'たんとうさせていただく', '(xin phép) được đảm nhận'],
    ],
  }),

  // ── 総合聴解 ──
  item('w11', 'sogo-chokai', 1, {
    script: [
      ['女', '課長、来年四月の新人研修の件なんですが、ちょっとご相談してもよろしいでしょうか。', 'Thưa trưởng phòng, về khoá đào tạo nhân viên mới tháng tư năm sau, tôi xin bàn với anh một chút được không ạ?'],
      ['男', 'うん、どうしたの。', 'Ừ, có chuyện gì thế?'],
      ['女', 'ビジネスマナーの講座、例年どおり外部の講師の方にお願いするつもりで見積もりを取ったんですが、去年より三割近く高くなっていまして。', 'Phần lớp phép tắc kinh doanh, tôi định như mọi năm mời giảng viên bên ngoài nên đã lấy báo giá, nhưng đắt hơn năm ngoái gần ba mươi phần trăm.'],
      ['男', '三割か。それは予算的に厳しいなあ。', 'Ba mươi phần trăm à. Thế thì ngân sách khó lắm.'],
      ['女', 'はい。それで、あのう、代わりに各部署の若手の先輩社員に講師をお願いするのはどうかと思いまして。年が近いほうが、新人も質問しやすいんじゃないかと。', 'Vâng. Nên là, ừm, tôi nghĩ hay là thay vào đó nhờ các đàn anh đàn chị trẻ ở từng phòng làm giảng viên. Tuổi gần nhau thì người mới chắc cũng dễ hỏi hơn.'],
      ['男', 'なるほどね。ただ、マナーの基本を教えるとなると、先輩社員だと教え方にばらつきが出ない？', 'Ra vậy. Có điều dạy phép tắc cơ bản mà để các nhân viên đàn anh dạy thì cách dạy không bị mỗi người một kiểu à?'],
      ['女', 'そこは、人事部で共通の教材を作って、それに沿って話してもらう形にすれば、と考えています。', 'Chỗ đó thì tôi nghĩ phòng nhân sự sẽ làm một bộ giáo trình chung rồi nhờ họ giảng theo đó.'],
      ['男', 'うーん、教材作りから始めると、三月に間に合うかな。……いや、去年、外部の講師の方が使ったスライドがあったよね。あれを使わせてもらえないか、先方に確認してみたら？', 'Ừm, bắt đầu từ việc soạn giáo trình thì có kịp tháng ba không nhỉ… À không, năm ngoái có bộ slide giảng viên bên ngoài đã dùng đúng không. Thử hỏi bên đó xem có cho mình dùng lại không?'],
      ['女', 'あ、そうですね。ただ、それは講師をお願いする人が決まってからでも……。', 'À, đúng ạ. Có điều việc đó để sau khi chọn xong người làm giảng viên cũng được…'],
      ['男', 'いや、使えるかどうかで準備の量が全然違うから。講師探しはそのあとでいいよ。', 'Không, dùng được hay không thì khối lượng chuẩn bị khác hẳn nhau. Tìm giảng viên để sau cũng được.'],
      ['女', 'わかりました。じゃあ、まずそちらに問い合わせてみます。', 'Tôi hiểu rồi. Vậy trước hết tôi sẽ hỏi bên đó.'],
    ],
    questions: [
      [
        '女の人はまず何をしますか。',
        ['各部署に講師になる先輩社員を推薦してもらう', '外部の講師に去年の教材を使えるか問い合わせる', '人事部で新人研修用の共通の教材を作り始める', '例年どおり外部講師に講座をお願いする'],
        1,
        'Trưởng phòng bảo hỏi bên giảng viên cũ xem có dùng lại slide năm ngoái được không, vì việc đó quyết định khối lượng chuẩn bị; người phụ nữ đáp まずそちらに問い合わせてみます (lựa chọn 2). Lựa chọn 1 dễ chọn vì chính chị muốn làm việc đó trước, nhưng trưởng phòng nói tìm giảng viên để SAU. Lựa chọn 3 là ý của chị đã bị lo không kịp; lựa chọn 4 là cách làm cũ, bị bỏ vì đắt.',
      ],
    ],
    points: [
      ['見積もり', 'みつもり', 'báo giá'],
      ['ばらつき', 'ばらつき', 'sự không đồng đều'],
      ['先方', 'せんぽう', 'phía bên kia, đối phương'],
      ['問い合わせる', 'といあわせる', 'hỏi, liên hệ hỏi'],
    ],
  }),
  item('w11', 'sogo-chokai', 2, {
    script: [
      ['男', '来期のチームリーダーの件だけど、候補は二人に絞れた？', 'Về chuyện trưởng nhóm kỳ tới, đã lọc được còn hai ứng viên chưa?'],
      ['女', 'はい。営業二課の木下さんと森さんです。私としては、木下さんを推したいと考えています。三年連続で売上がトップですので。', 'Rồi ạ. Là anh Kinoshita và anh Mori ở phòng kinh doanh hai. Riêng tôi muốn đề cử Kinoshita. Ba năm liền doanh số đứng đầu.'],
      ['男', '数字は確かに立派だね。森さんのほうは？', 'Con số thì đúng là đáng nể. Còn Mori thì sao?'],
      ['女', '森さんは、売上は中くらいなんですが、後輩の相談によく乗っていて、チームの雰囲気を作っているのは森さんだ、という声が多いです。', 'Mori doanh số ở mức trung bình, nhưng hay nghe đàn em tâm sự, nhiều người nói chính Mori là người tạo không khí cho cả nhóm.'],
      ['男', 'なるほど。森さんのことは、ほかの課長からも、ときどき名前を聞くよ。', 'Ra vậy. Tên Mori thì thỉnh thoảng tôi cũng nghe các trưởng phòng khác nhắc tới.'],
      ['女', 'ただ、リーダーになれば社外との交渉も増えますし、まずは実績のある人のほうが、周りも納得するんじゃないかと。', 'Có điều làm trưởng nhóm thì việc đàm phán với bên ngoài cũng nhiều lên, nên tôi nghĩ người có thành tích thì mọi người xung quanh cũng dễ chấp nhận hơn.'],
      ['男', 'うーん、周りの納得も大事だけど、リーダーの仕事は、自分で売ることじゃなくて、メンバーに売ってもらうことだからね。木下さんは、後輩に仕事を任せたことはある？', 'Ừm, sự chấp nhận của mọi người cũng quan trọng, nhưng việc của trưởng nhóm không phải tự mình bán, mà là làm sao để các thành viên bán được. Kinoshita đã từng giao việc cho đàn em bao giờ chưa?'],
      ['女', 'そう言われると……大きな案件は、ほとんど一人で担当していますね。', 'Nói thế thì… những vụ lớn hầu như đều tự một mình phụ trách.'],
      ['男', 'だろう。私が一番見たいのはそこなんだよ。人を育てて、チーム全体の数字を上げられるかどうか。', 'Đấy. Điều tôi muốn nhìn nhất là chỗ đó. Có nuôi dạy được người, nâng được con số của cả nhóm hay không.'],
      ['女', 'わかりました。では、森さんで人事部に推薦を出すということで、よろしいでしょうか。', 'Tôi hiểu rồi. Vậy tôi gửi đề cử Mori lên phòng nhân sự, được không ạ?'],
      ['男', 'うん。ただ、木下さんには、別の形でちゃんと評価を伝えてあげて。', 'Ừ. Nhưng với Kinoshita thì nhớ truyền đạt sự đánh giá một cách đàng hoàng theo hình thức khác nhé.'],
    ],
    questions: [
      [
        '男の人がリーダーを選ぶとき、一番重視していることは何ですか。',
        ['個人として売上の実績を上げていること', '周りの社員が選ばれた理由に納得できること', 'メンバーを育ててチームの成果を伸ばすこと', '社外の相手とうまく交渉ができること'],
        2,
        'Người đàn ông nói rõ 私が一番見たいのはそこ: có nuôi dạy người và nâng con số của cả nhóm được không (lựa chọn 3). Lựa chọn 2 dễ chọn vì chính ông cũng nói 周りの納得も大事, nhưng ngay sau đó là だけど, tức không phải điều quan trọng nhất. Lựa chọn 1 và 4 là lý lẽ của người phụ nữ.',
      ],
    ],
    points: [
      ['絞る', 'しぼる', 'thu hẹp, lọc bớt'],
      ['推す', 'おす', 'đề cử, ủng hộ'],
      ['相談に乗る', 'そうだんにのる', 'nghe và cho lời khuyên'],
      ['案件', 'あんけん', 'vụ việc, dự án'],
    ],
  }),
  item('w11', 'sogo-chokai', 3, {
    script: [
      ['女', '評価者研修の件、今年はどういう形でやりましょうか。去年は丸一日、本社に集まってもらいましたけど。', 'Về khoá đào tạo người đánh giá, năm nay mình làm theo hình thức nào ạ? Năm ngoái đã mời mọi người tập trung ở trụ sở chính cả một ngày.'],
      ['男', '地方の支店の課長たちからは、移動が大変だって声がかなり出てたんだよね。全部オンラインにしようか。', 'Các trưởng phòng ở chi nhánh địa phương than đi lại vất vả khá nhiều. Hay làm hết trực tuyến nhỉ?'],
      ['女', 'そうですね……。ただ、去年一番評判がよかったのは、面談のロールプレイだったんです。あれは画面越しだと、ちょっと難しいかなと。', 'Vâng… Có điều năm ngoái phần được khen nhất là đóng vai buổi gặp đánh giá. Phần đó qua màn hình thì tôi e hơi khó.'],
      ['男', 'ああ、そうか。表情とか間の取り方も、練習のうちだもんね。', 'À, ra thế. Nét mặt hay cách ngắt nghỉ cũng là một phần của việc luyện tập mà.'],
      ['女', 'はい。それで、評価の基準を説明する部分は動画にして、各自で見てもらって、ロールプレイだけ集まってやる、というのはどうでしょう。', 'Vâng. Nên phần giải thích tiêu chí đánh giá thì làm thành video cho từng người tự xem, chỉ phần đóng vai là tập trung lại làm, anh thấy sao ạ?'],
      ['男', 'いいね。それなら半日で済むし。ただ、集まる場所は本社じゃなくて、地域ごとに分けられないかな。東日本と西日本で二回とか。', 'Hay đấy. Thế thì nửa ngày là xong. Có điều chỗ tập trung không phải trụ sở chính mà chia theo vùng được không nhỉ. Như hai lần, miền Đông và miền Tây chẳng hạn.'],
      ['女', '二回ですか。講師の負担は増えますが……そうですね、参加する人の移動を考えれば、そのほうがいいですね。日程を調整してみます。', 'Hai lần ạ? Gánh nặng của giảng viên sẽ tăng, nhưng… vâng, nghĩ tới việc đi lại của người tham gia thì như thế tốt hơn. Tôi sẽ thử sắp xếp lịch.'],
      ['男', 'うん。動画は誰が作る？', 'Ừ. Video thì ai làm?'],
      ['女', '基準の説明は、去年の講義を録画したものがありますので、それを編集して使います。', 'Phần giải thích tiêu chí thì có bản ghi hình bài giảng năm ngoái, tôi sẽ biên tập lại để dùng.'],
      ['男', 'じゃあ、それでいこう。参加者には、研修の一週間前までに動画を見ておくよう、案内を出しておいて。', 'Vậy làm thế đi. Nhớ gửi thông báo cho người tham gia xem video trước buổi đào tạo một tuần nhé.'],
    ],
    questions: [
      [
        '研修はどのように行うことになりましたか。',
        ['昨年と同じく本社に集まり、丸一日かけて行う', '地方の参加者に配慮して、すべてオンラインで行う', '説明は本社で行い、練習はオンラインで行う', '説明は各自動画で見て、練習は地域ごとに集まる'],
        3,
        'Chốt lại: phần tiêu chí làm video cho từng người tự xem, phần đóng vai tập trung theo vùng (lựa chọn 4). Lựa chọn 2 dễ chọn vì người đàn ông đề xuất trước, nhưng bị bác vì phần đóng vai khó làm qua màn hình. Lựa chọn 1 là cách năm ngoái. Lựa chọn 3 đảo ngược phần nào làm trực tuyến.',
      ],
    ],
    points: [
      ['評価者', 'ひょうかしゃ', 'người đánh giá'],
      ['画面越し', 'がめんごし', 'qua màn hình'],
      ['間の取り方', 'まのとりかた', 'cách ngắt nghỉ'],
      ['負担', 'ふたん', 'gánh nặng'],
    ],
  }),
  item('w11', 'sogo-chokai', 4, {
    script: [
      ['男', '皆さん、お疲れさまです。人事部の大野です。来月から始まるメンター制度について、ご説明します。', 'Chào mọi người. Tôi là Ono ở phòng nhân sự. Tôi xin giải thích về chế độ người kèm cặp (mentor) bắt đầu từ tháng sau.'],
      ['男', 'この制度では、入社三年目までの社員一人に、別の部署の先輩社員が一人、メンターとしてつきます。月に一回、三十分程度、仕事の悩みやキャリアについて話す時間を取ってください。', 'Trong chế độ này, mỗi nhân viên vào công ty chưa quá ba năm sẽ có một nhân viên đàn anh ở phòng khác kèm làm mentor. Mỗi tháng một lần, xin dành khoảng ba mươi phút nói chuyện về những băn khoăn trong công việc và con đường sự nghiệp.'],
      ['男', '「同じ部署の先輩のほうが、仕事のことがわかっていいんじゃないか」というご意見も、準備の段階でいただきました。ただ、直属の上司や同じ部署の先輩には言いにくいこともある、というのが、若手へのアンケートで一番多かった声です。そこで、あえて別の部署の方にお願いすることにしました。', 'Trong giai đoạn chuẩn bị, chúng tôi cũng nhận được ý kiến "đàn anh cùng phòng hiểu công việc hơn, chẳng phải tốt hơn sao". Nhưng trong khảo sát nhân viên trẻ, ý kiến nhiều nhất là có những điều khó nói với cấp trên trực tiếp hay đàn anh cùng phòng. Vì vậy chúng tôi cố ý nhờ người ở phòng khác.'],
      ['男', 'なお、面談の内容を人事評価に使うことは一切ありません。これは、はっきり申し上げておきます。', 'Ngoài ra, nội dung các buổi trò chuyện tuyệt đối không được dùng cho đánh giá nhân sự. Điều này tôi xin nói rõ.'],
      ['男', '当社では、ここ数年、入社三年以内に辞めてしまう社員が増えています。この制度で、若手が一人で悩みを抱え込まず、長く安心して働き続けられる職場にしていきたい、というのが私たちの一番の願いです。', 'Mấy năm gần đây, ở công ty số nhân viên nghỉ việc trong vòng ba năm đầu đang tăng. Mong muốn lớn nhất của chúng tôi là qua chế độ này, tạo một nơi làm việc mà người trẻ không phải ôm băn khoăn một mình, có thể yên tâm làm việc lâu dài.'],
      ['男', '来年の春には、メンターの皆さんにもアンケートをお願いして、制度の見直しに役立てる予定です。ご協力をよろしくお願いいたします。', 'Mùa xuân năm sau, chúng tôi dự định nhờ các mentor làm khảo sát để dùng vào việc xem xét lại chế độ. Rất mong mọi người hợp tác.'],
    ],
    questions: [
      [
        '人事部はこの制度で何を目指していますか。',
        ['若手社員が辞めずに長く働ける職場にすること', '若手社員が同じ部署の先輩と親しくなること', '面談で聞いた内容を若手の人事評価に生かすこと', 'メンターの意見を集めて制度を見直すこと'],
        0,
        'Mong muốn lớn nhất (一番の願い) là người trẻ yên tâm làm việc lâu dài, không nghỉ sớm (lựa chọn 1). Lựa chọn 4 dễ chọn vì có nói tới, nhưng đó là bước sau, mùa xuân năm sau, để sửa chế độ chứ không phải mục tiêu. Lựa chọn 2 là ý kiến đã bị bác (cố ý chọn người phòng khác). Lựa chọn 3 bị phủ định rõ: 一切ありません.',
      ],
    ],
    points: [
      ['直属の上司', 'ちょくぞくのじょうし', 'cấp trên trực tiếp'],
      ['あえて', 'あえて', 'cố ý, dám'],
      ['抱え込む', 'かかえこむ', 'ôm (vấn đề) một mình'],
      ['見直し', 'みなおし', 'xem xét lại'],
    ],
  }),
];

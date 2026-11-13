import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/**
 * Full test 1 (week 8), 聴解: 5 場面把握 + 10 発言聴解 + 10 総合聴解 questions = 25.
 * Mixes the themes of weeks 1–7; about 30% of the questions are J1+ (implied meaning, indirect refusals).
 */
export const MOCK1: BjtItem[] = [
  // ── 場面把握 ──
  item('mock1', 'bamen', 1, {
    material: {
      kind: 'scene',
      vi: 'Quầy lễ tân khách sạn. Một nam nhân viên công ty đứng trước quầy, đang cúi xuống điền vào một tờ phiếu bằng bút bi; chiếc vali kéo đặt sát chân anh. Nữ nhân viên lễ tân đứng sau quầy, hai tay đặt trên mặt quầy chờ đợi; một chiếc thẻ phòng nằm trên quầy giữa hai người.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['フロント係が男性にカードキーを渡しています。', '男性が用紙に記入しています。', '男性がスーツケースを預けています。', 'フロント係が電話で予約を受けています。'],
        1,
        'Người đàn ông đang điền phiếu: 用紙に記入する. Thẻ phòng nằm trên quầy, lễ tân chưa đưa. Vali vẫn ở cạnh chân anh, chưa gửi. Lễ tân không cầm điện thoại.',
      ],
    ],
    points: [
      ['記入する', 'きにゅうする', 'điền vào'],
      ['預ける', 'あずける', 'gửi (đồ)'],
    ],
  }),
  item('mock1', 'bamen', 2, {
    material: {
      kind: 'scene',
      vi: 'Xưởng sản xuất. Băng chuyền đang dừng. Một công nhân đội mũ bảo hộ cúi xuống, cầm kính lúp soi một sản phẩm trên băng chuyền. Người công nhân thứ hai đứng cạnh, cũng đội mũ bảo hộ, đang ghi vào một tờ giấy kẹp trên bảng kẹp hồ sơ.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['ベルトコンベアが動いています。', '二人とも製品を検査しています。', '作業員がヘルメットを脱いでいます。', '一人がルーペで製品を調べ、もう一人が記録を取っています。'],
        3,
        'Hai người làm hai việc: một người soi bằng kính lúp, một người ghi chép. Câu 2 sai vì chỉ một người kiểm tra. Băng chuyền đang dừng. Cả hai vẫn đội mũ.',
      ],
    ],
    points: [
      ['検査する', 'けんさする', 'kiểm tra (chất lượng)'],
      ['記録を取る', 'きろくをとる', 'ghi chép, ghi lại'],
    ],
  }),
  item('mock1', 'bamen', 3, {
    material: {
      kind: 'scene',
      vi: 'Một nữ nhân viên ngồi ở bàn, hai tay ấn chiếc dập ghim xuống góc một xấp tài liệu. Bên cạnh có một chiếc kéo và một bìa kẹp hồ sơ còn trống. Không có máy đục lỗ trên bàn.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['女性が書類をホチキスで留めています。', '女性がはさみで紙を切っています。', '女性が書類をファイルに綴じています。', '女性が書類に穴を開けています。'],
        0,
        'Cô ấy đang dập ghim xấp giấy: ホチキスで留める. Kéo và bìa hồ sơ có trên bàn nhưng không được dùng. Không có máy đục lỗ nên câu 4 sai.',
      ],
    ],
    points: [
      ['留める', 'とめる', 'giữ, kẹp lại (bằng ghim)'],
      ['綴じる', 'とじる', 'đóng (vào bìa, thành tập)'],
    ],
  }),
  item('mock1', 'bamen', 4, {
    material: {
      kind: 'scene',
      vi: 'Nhà ăn nhân viên. Hai người ngồi đối diện nhau, mỗi người một khay cơm đã ăn dở. Một người cầm đũa ở tay phải, tay trái cầm điện thoại thông minh và đang nhìn vào màn hình. Người kia đang ăn. Trên tường có một chiếc tivi đang bật nhưng không ai nhìn.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['二人が料理を注文しています。', '二人がテレビを見ています。', '一人がスマートフォンを見ながら食事をしています。', '二人が食器を片付けています。'],
        2,
        'Một người vừa ăn vừa nhìn điện thoại: ～ながら食事をしている. Tivi bật nhưng không ai xem. Cơm đã có và đang ăn dở, nên không phải gọi món hay dọn khay.',
      ],
    ],
    points: [
      ['社員食堂', 'しゃいんしょくどう', 'nhà ăn nhân viên'],
      ['片付ける', 'かたづける', 'dọn dẹp'],
    ],
  }),
  item('mock1', 'bamen', 5, {
    material: {
      kind: 'scene',
      vi: 'Nhà ga. Một nam nhân viên mặc vest, tay trái kéo vali, tay phải cầm vé, đang đứng xếp hàng sau ba người khác trước cửa soát vé. Trên cao có bảng điện tử hiện chữ "遅延" cạnh giờ tàu. Anh ta không nhìn lên bảng.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['男性が切符を買っています。', '男性が改札の前で列に並んでいます。', '男性が電光掲示板を指さしています。', '男性が荷物を棚に上げています。'],
        1,
        'Anh ta đứng xếp hàng trước cửa soát vé: 列に並ぶ. Vé đã cầm trong tay, không phải đang mua. Bảng điện tử có trong cảnh nhưng anh không nhìn, càng không chỉ vào.',
      ],
    ],
    points: [
      ['改札', 'かいさつ', 'cửa soát vé'],
      ['電光掲示板', 'でんこうけいじばん', 'bảng điện tử'],
      ['遅延', 'ちえん', 'chậm, trễ (tàu)'],
    ],
  }),

  // ── 発言聴解 ──
  item('mock1', 'hatsugen', 1, {
    script: [['状況', '来客が帰るので、エレベーターの前まで見送りました。最後に何と言いますか。', 'Khách ra về, bạn tiễn đến trước thang máy. Câu cuối cùng bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['お疲れさまでした。', 'またいらっしゃってくださいね。じゃあ。', '本日はありがとうございました。どうぞお気をつけてお帰りください。', 'お帰りになりましたら、ご連絡いたします。'],
        2,
        'Tiễn khách: cảm ơn rồi chúc về cẩn thận (お気をつけてお帰りください). お疲れさまでした dùng trong nội bộ công ty. Câu 2 thân mật quá mức với khách. Câu 4 không có nghĩa trong tình huống này.',
      ],
    ],
    points: [['見送る', 'みおくる', 'tiễn']],
  }),
  item('mock1', 'hatsugen', 2, {
    script: [['状況', '上司に頼まれた資料のコピーが終わりました。上司に渡します。何と言いますか。', 'Bạn đã photo xong tài liệu cấp trên nhờ. Bạn đưa cho cấp trên. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['お待たせいたしました。ご依頼の資料を十部、コピーしてまいりました。', 'コピーしてあげました。', 'コピーいたしましたので、確認していただきます。', 'コピー、遅くなりましたけど、仕方なかったです。'],
        0,
        'お待たせいたしました + nói rõ đã làm gì (mười bản). Câu 2: てあげる với cấp trên nghe như ban ơn. Câu 3: ～ていただきます ở thể khẳng định là áp đặt. Câu 4 biện minh thay vì xin lỗi.',
      ],
    ],
    points: [['てまいりました', 'てまいりました', 'đã (đi làm việc gì) về (khiêm nhường)']],
  }),
  item('mock1', 'hatsugen', 3, {
    script: [['状況', '取引先に電話をしたら、話したい部長は不在だと言われました。伝言を頼みたいです。何と言いますか。', 'Bạn gọi điện cho đối tác thì được biết trưởng bộ phận bạn cần gặp không có mặt. Bạn muốn nhờ nhắn lại. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['じゃあ、伝言しておいてください。', '部長様にお伝えしてもよろしいでしょうか。', '部長が戻られたら、私に電話するように言ってください。', 'それでは、恐れ入りますが、ご伝言をお願いできますでしょうか。'],
        3,
        'Nhờ nhắn bằng 恐れ入りますが…お願いできますでしょうか. Câu 1 trống không. Câu 2 sai hướng: お伝えする là việc của người bên kia, mình không xin phép làm. Câu 3 ra lệnh cho trưởng bộ phận của đối tác.',
      ],
    ],
    points: [['ご伝言', 'ごでんごん', 'lời nhắn (lịch sự)']],
  }),
  item('mock1', 'hatsugen', 4, {
    script: [['状況', 'あなたは社内会議の司会です。開始時間になりましたが、部長がまだ来ていません。部長はもうすぐ来るそうです。出席者に何と言いますか。', 'Bạn là người chủ trì cuộc họp nội bộ. Đã đến giờ bắt đầu nhưng trưởng bộ phận chưa tới, nghe nói sắp tới rồi. Bạn nói gì với người dự họp?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['部長が遅刻なので、待ちます。', '恐れ入りますが、部長がまもなくまいりますので、五分ほどお待ちいただけますでしょうか。', '部長がいらっしゃらないので、始めてもいいですか。', 'では、部長抜きで始めましょう。'],
        1,
        'Xin mọi người đợi, nói rõ lý do và thời gian. Câu 1 nói thẳng "đến muộn", không khéo. Câu 3 và 4 đi ngược tình huống: trưởng bộ phận sắp đến thì nên đợi.',
      ],
    ],
    points: [
      ['まもなく', 'まもなく', 'sắp, chẳng bao lâu nữa'],
      ['司会', 'しかい', 'người chủ trì'],
    ],
  }),
  item('mock1', 'hatsugen', 5, {
    script: [['状況', '一週間前に送った見積もりについて、取引先からまだ返事がありません。催促していると感じさせずに、検討状況を知りたいです。何と言いますか。', 'Báo giá gửi đối tác một tuần trước vẫn chưa có hồi âm. Bạn muốn biết họ đang xem xét đến đâu mà không để họ cảm thấy bị giục. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['もう決めましたか。早くお返事をください。', 'お見積もりはいかがでしたか。お安いでしょう？', 'お見積もり、ご覧になりましたでしょうか。まだでしたら、すぐにご覧ください。', '先日お送りしたお見積もりの件で、何かご不明な点などございませんでしたでしょうか。'],
        3,
        'Hỏi "có điểm nào chưa rõ không" là cách gợi chuyện mà không giục: đối tác có cớ để nói tình hình. Câu 1 và 3 giục thẳng. Câu 2 tự khen giá, ép khách đồng ý.',
      ],
    ],
    points: [
      ['催促する', 'さいそくする', 'giục, thúc'],
      ['ご不明な点', 'ごふめいなてん', 'điểm chưa rõ'],
    ],
  }),
  item('mock1', 'hatsugen', 6, {
    script: [['状況', '同期の同僚が、半年かけて交渉していた大きな契約を取りました。お祝いを言います。何と言いますか。', 'Một đồng nghiệp cùng khoá vừa giành được hợp đồng lớn sau nửa năm đàm phán. Bạn chúc mừng. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['大型契約、おめでとう！半年間、粘り強く通ってたもんね。', '大型契約、ご苦労様でございました。', '今回は運がよかったね。', 'おめでとうございます。私も取れればよかったんですが。'],
        0,
        'Với đồng nghiệp cùng khoá thì thể thường là tự nhiên; chúc mừng kèm ghi nhận công sức (粘り強く) là tốt nhất. Câu 2 sai cách dùng ご苦労様. Câu 3 coi nhẹ công sức. Câu 4 chuyển sang nói về mình.',
      ],
    ],
    points: [['粘り強い', 'ねばりづよい', 'bền bỉ, kiên trì']],
  }),
  item('mock1', 'hatsugen', 7, {
    script: [['状況', '取引先の担当者から食事に誘われましたが、あなたの会社の規則では、取引先からの接待は受けられません。何と言いますか。', 'Người phụ trách bên đối tác mời bạn đi ăn, nhưng quy định công ty bạn không cho nhận tiếp đãi từ đối tác. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['規則でだめなので、行けません。', 'ありがとうございます。ぜひごちそうになります。', 'お気持ちは大変ありがたいのですが、社の規定でご辞退させていただいておりまして…。', '今回は行きますが、次からは誘わないでください。'],
        2,
        'Cảm ơn tấm lòng trước, rồi viện quy định công ty và từ chối bằng ご辞退させていただいて, bỏ lửng cuối câu cho mềm. Câu 1 đúng lý do nhưng cộc. Câu 2 vi phạm quy định. Câu 4 vừa vi phạm vừa thất lễ.',
      ],
    ],
    points: [
      ['接待', 'せったい', 'tiếp đãi (khách hàng, đối tác)'],
      ['辞退する', 'じたいする', 'từ chối (khéo, khiêm nhường)'],
    ],
  }),
  item('mock1', 'hatsugen', 8, {
    script: [['状況', '今日から来た派遣社員に、コピー機の使い方を教えます。何と言いますか。', 'Bạn hướng dẫn một nhân viên phái cử mới đến hôm nay cách dùng máy photo. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['コピー機の使い方、わかりますよね。', 'コピー機はこちらです。社員番号を入れてから使うので、最初は一緒にやってみましょうか。', 'コピー機の使い方は、マニュアルを読んでください。', 'コピー機をお使いになられますか。'],
        1,
        'Chỉ chỗ, nói điểm riêng của công ty (nhập mã nhân viên) và đề nghị làm cùng lần đầu. Câu 1 cho là người ta đã biết. Câu 3 bỏ mặc. Câu 4 là kính ngữ kép (お～になられる) và không hướng dẫn gì.',
      ],
    ],
    points: [['派遣社員', 'はけんしゃいん', 'nhân viên phái cử']],
  }),
  item('mock1', 'hatsugen', 9, {
    script: [['状況', '会議の途中で、一つ意見を言いたいことがあります。司会者に発言の許可を求めます。何と言いますか。', 'Giữa cuộc họp, bạn muốn nêu một ý kiến. Bạn xin phép người chủ trì. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['すみません、一点よろしいでしょうか。', 'ちょっと待ってください。私の意見を言います。', '発言させてあげてもいいですか。', 'みなさん、私の話を聞いてください。'],
        0,
        '一点よろしいでしょうか là câu chuẩn để xin phát biểu. Câu 2 và 4 tự giành lời, không xin phép người chủ trì. Câu 3 dùng てあげる sai hoàn toàn.',
      ],
    ],
    points: [['発言', 'はつげん', 'phát biểu']],
  }),
  item('mock1', 'hatsugen', 10, {
    script: [['状況', '部長から急ぎの仕事を頼まれました。しかし、課長からも今日中の仕事を頼まれていて、両方を今日中に終わらせるのは無理です。部長に何と言いますか。', 'Trưởng bộ phận nhờ bạn một việc gấp. Nhưng trưởng phòng cũng đã nhờ một việc phải xong trong hôm nay, và không thể làm xong cả hai trong hôm nay. Bạn nói gì với trưởng bộ phận?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['わかりました。両方やります。', '課長の仕事があるので、できません。', '部長のお仕事を先にやって、課長には黙っておきます。', '承知しました。ただ、課長からも本日中の案件をいただいておりまして、どちらを優先すべきか、ご指示いただけますでしょうか。'],
        3,
        'Nhận lời, nêu sự thật (đã có việc gấp khác) và xin cấp trên quyết thứ tự ưu tiên: đây là 相談 đúng cách. Câu 1 hứa điều không làm được. Câu 2 từ chối thẳng. Câu 3 tự ý bỏ việc của trưởng phòng mà không báo.',
      ],
    ],
    points: [
      ['優先する', 'ゆうせんする', 'ưu tiên'],
      ['案件', 'あんけん', 'vụ việc, đầu việc'],
    ],
  }),

  // ── 総合聴解 ──
  item('mock1', 'sogo-chokai', 1, {
    script: [
      ['女', '来週の福岡出張ですが、飛行機と新幹線、どちらにしましょうか。', 'Chuyến công tác Fukuoka tuần sau, anh muốn đi máy bay hay Shinkansen ạ?'],
      ['男', '時間だけなら飛行機だけど、空港から会場まで一時間近くかかるんだよね。', 'Nếu chỉ xét thời gian thì máy bay, nhưng từ sân bay đến hội trường mất gần một tiếng.'],
      ['女', '新幹線なら、博多駅から会場まで歩いて五分です。ただ、東京から五時間かかります。', 'Đi Shinkansen thì từ ga Hakata đến hội trường đi bộ năm phút. Có điều từ Tokyo mất năm tiếng.'],
      ['男', '移動中に資料を作りたいから、新幹線にしよう。ずっとパソコンが使えるしね。', 'Tôi muốn làm tài liệu trong lúc di chuyển, nên đi Shinkansen. Dùng máy tính suốt được.'],
      ['女', 'わかりました。会議は朝十時からですが、前の日に行かれますか。', 'Vâng. Cuộc họp bắt đầu mười giờ sáng, anh có đi từ hôm trước không ạ?'],
      ['男', '朝一番の新幹線でも、着くのは十一時だからね。前の日に行かないと無理だ。ホテルも頼むよ。', 'Chuyến Shinkansen sớm nhất cũng mười một giờ mới tới. Không đi từ hôm trước thì không kịp. Đặt khách sạn giúp tôi luôn nhé.'],
    ],
    questions: [
      [
        '男の人が新幹線を選んだ一番の理由は何ですか。',
        ['飛行機より安いから', '移動中に仕事ができるから', '空港が遠いから', '会場が駅から近いから'],
        1,
        'Anh nói thẳng lý do: 移動中に資料を作りたいから. Ga gần hội trường do người phụ nữ nêu ra, là điểm cộng nhưng không phải lý do quyết định. Giá vé không ai nhắc tới.',
      ],
      [
        '男の人はいつ福岡に行きますか。',
        ['会議の当日の朝', '会議の当日の昼', '会議の前日', '会議の二日前'],
        2,
        'Chuyến sớm nhất cũng 11 giờ mới tới, trễ giờ họp 10 giờ, nên phải đi hôm trước (前の日). "Sáng hôm họp" là phương án đã bị loại.',
      ],
    ],
    points: [
      ['前泊', 'ぜんぱく', 'ngủ lại từ đêm hôm trước'],
      ['朝一番', 'あさいちばん', 'sớm nhất trong buổi sáng'],
    ],
  }),
  item('mock1', 'sogo-chokai', 2, {
    script: [
      ['男', '人事部からお知らせします。来年度から、管理職に昇進するための条件が変わります。', 'Phòng nhân sự xin thông báo. Từ năm tài chính tới, điều kiện để thăng chức lên cấp quản lý sẽ thay đổi.'],
      ['男', 'これまでは、勤続年数と上司の推薦が主な条件でしたが、来年度からは、これに加えて、社内研修を三つ修了していることが必要になります。', 'Trước giờ điều kiện chính là thâm niên và đề cử của cấp trên. Từ năm tới, ngoài hai điều đó, cần hoàn thành ba khoá đào tạo nội bộ.'],
      ['男', '研修はオンラインで受講できますが、そのうち「部下育成」の研修だけは集合研修になります。定員がありますので、早めにお申し込みください。', 'Các khoá học có thể học trực tuyến, nhưng riêng khoá "Đào tạo cấp dưới" học tập trung. Vì có giới hạn số người, xin đăng ký sớm.'],
      ['男', 'なお、勤続年数の条件は、これまでの十年から八年に短縮されます。', 'Ngoài ra, điều kiện thâm niên được rút ngắn từ mười năm xuống tám năm.'],
    ],
    questions: [
      [
        '来年度から新しく加わる条件は何ですか。',
        ['勤続十年以上', '上司の推薦', '勤続八年以上', '研修を三つ修了していること'],
        3,
        'これに加えて đánh dấu điều kiện mới: hoàn thành ba khoá đào tạo. Thâm niên và đề cử là điều kiện cũ; thâm niên chỉ thay đổi con số (10 → 8 năm), không phải điều kiện mới.',
      ],
      [
        '早めに申し込む必要があるのはなぜですか。',
        ['集合研修には定員があるから', 'オンライン研修は人数が少ないから', '研修が来年度で終わるから', '推薦の期限があるから'],
        0,
        'Khoá "Đào tạo cấp dưới" học tập trung và 定員がありますので nên phải đăng ký sớm. Học trực tuyến thì không nhắc tới giới hạn số người.',
      ],
    ],
    points: [
      ['勤続年数', 'きんぞくねんすう', 'số năm làm việc liên tục'],
      ['修了する', 'しゅうりょうする', 'hoàn thành (khoá học)'],
      ['短縮する', 'たんしゅくする', 'rút ngắn'],
    ],
  }),
  item('mock1', 'sogo-chokai', 3, {
    script: [
      ['女', 'あの、先週納品していただいた椅子のことなんですけど。', 'À, về số ghế bên anh giao tuần trước.'],
      ['男', 'いつもありがとうございます。何か不具合がございましたでしょうか。', 'Cảm ơn chị luôn ủng hộ. Có trục trặc gì không ạ?'],
      ['女', '不具合というほどではないんですが、座ると少しきしむんです。二十脚のうち三脚なんですけど。使えないことはないので、急ぎではないんですが…。', 'Không đến mức hỏng, nhưng ngồi lên thì hơi kêu cót két. Ba trong hai mươi cái. Không phải không dùng được nên cũng không gấp…'],
      ['男', '大変申し訳ございません。すぐに新しいものとお取り替えいたします。', 'Thành thật xin lỗi chị. Chúng tôi sẽ đổi cái mới ngay.'],
      ['女', 'あ、でも来週は会議室を毎日使うので、その間に作業に来ていただくのはちょっと…。', 'À, nhưng tuần sau phòng họp ngày nào cũng dùng, nên đến làm trong lúc đó thì hơi…'],
      ['男', 'かしこまりました。では、来週の金曜日の夕方以降はいかがでしょうか。', 'Tôi hiểu ạ. Vậy từ chiều tối thứ sáu tuần sau thì được không ạ?'],
      ['女', 'それなら大丈夫です。', 'Vậy thì được.'],
    ],
    questions: [
      [
        '女の人が連絡してきた理由は何ですか。',
        ['椅子が二十脚届かなかったから', '椅子が三脚壊れていて使えないから', '椅子が少し音を立てるから', '会議室の予定が変わったから'],
        2,
        'きしむ = kêu cót két. Chị nói rõ 不具合というほどではない và 使えないことはない, nên "hỏng, không dùng được" là nói quá. Hai mươi cái đã giao đủ; ba là số ghế bị kêu.',
      ],
      [
        '椅子の交換はいつ行いますか。',
        ['すぐに', '来週の金曜日の夕方以降', '来週の月曜日', '会議が全部終わった再来週'],
        1,
        'Bên bán định đổi ngay, nhưng tuần sau phòng họp bận, nên chuyển sang 来週の金曜日の夕方以降 và khách đồng ý (それなら大丈夫です). "Ngay lập tức" là ý định ban đầu.',
      ],
    ],
    points: [
      ['きしむ', 'きしむ', 'kêu cót két'],
      ['取り替える', 'とりかえる', 'thay, đổi (cái mới)'],
      ['かしこまりました', 'かしこまりました', 'vâng, tôi hiểu (rất lịch sự)'],
    ],
  }),
  item('mock1', 'sogo-chokai', 4, {
    script: [
      ['男', '新しい健康飲料の名前ですが、候補は「スッキリ茶」と「グリーンリセット」の二つです。', 'Về tên của loại đồ uống sức khoẻ mới, có hai ứng viên: "Sukkiri-cha" và "Green Reset".'],
      ['女', '社内アンケートでは「スッキリ茶」のほうが人気でしたね。', 'Khảo sát nội bộ thì "Sukkiri-cha" được thích hơn nhỉ.'],
      ['男', 'ええ。ただ、調べたところ、「スッキリ茶」は他社がすでに商標登録していました。', 'Vâng. Nhưng tra thử thì "Sukkiri-cha" đã được công ty khác đăng ký nhãn hiệu.'],
      ['女', 'それは使えませんね。では「グリーンリセット」で…。', 'Vậy không dùng được rồi. Thế thì "Green Reset"…'],
      ['男', 'それが、海外の担当者から、「リセット」は英語圏ではあまりいい印象を与えないという意見がありまして。', 'Có điều, người phụ trách thị trường nước ngoài góp ý rằng chữ "reset" không gây ấn tượng tốt lắm ở các nước nói tiếng Anh.'],
      ['女', 'そうですか…。海外での発売は再来年でしょう。名前は国内と海外で分けてもいいんじゃないかしら。', 'Vậy à… Bán ở nước ngoài là năm sau nữa mà. Tên trong nước và nước ngoài tách riêng cũng được chứ nhỉ.'],
      ['男', 'なるほど。では、国内は「グリーンリセット」で進めて、海外名は改めて考えます。', 'Ra vậy. Vậy trong nước triển khai với "Green Reset", tên nước ngoài sẽ nghĩ lại sau.'],
    ],
    questions: [
      [
        '「スッキリ茶」が使えない理由は何ですか。',
        ['他社が商標を持っているから', 'アンケートで人気がなかったから', '英語圏で印象が悪いから', '海外で発売するから'],
        0,
        'Đã có công ty khác đăng ký nhãn hiệu (商標登録). Khảo sát thì "Sukkiri-cha" lại được thích hơn. Ấn tượng xấu ở nước nói tiếng Anh là vấn đề của "Green Reset".',
      ],
      [
        '名前はどうなりましたか。',
        ['国内も海外も「スッキリ茶」', '国内も海外も「グリーンリセット」', '国内は「スッキリ茶」、海外は新しい名前', '国内は「グリーンリセット」、海外は改めて考える'],
        3,
        'Chị đề xuất tách tên trong nước và nước ngoài; anh đồng ý: 国内は「グリーンリセット」で進めて、海外名は改めて考えます. "Sukkiri-cha" không dùng được ở đâu cả.',
      ],
    ],
    points: [
      ['商標登録', 'しょうひょうとうろく', 'đăng ký nhãn hiệu'],
      ['印象', 'いんしょう', 'ấn tượng'],
      ['改めて', 'あらためて', 'lại, một lần nữa (sau)'],
    ],
  }),
  item('mock1', 'sogo-chokai', 5, {
    script: [
      ['男', '課長、例の新規事業の企画書、目を通していただけましたか。', 'Trưởng phòng, chị đã đọc qua bản kế hoạch kinh doanh mới chưa ạ?'],
      ['女', 'ええ、読んだわ。よく調べてあるわね。市場の分析なんか、とても丁寧だった。', 'Ừ, đọc rồi. Tìm hiểu kỹ đấy. Phần phân tích thị trường rất cẩn thận.'],
      ['男', 'ありがとうございます。では、来週の役員会議に出してもよろしいでしょうか。', 'Cảm ơn chị. Vậy tôi nộp lên cuộc họp ban giám đốc tuần sau được không ạ?'],
      ['女', 'そうねえ…。役員の方たちは、まず、いくら投資して、いつ回収できるのかを見るのよ。そこが一ページ目で見えないと、なかなか先まで読んでもらえないと思うわ。', 'Ừm… Các thành viên ban giám đốc trước hết nhìn xem đầu tư bao nhiêu và khi nào thu hồi vốn. Trang đầu mà không thấy điều đó thì chắc khó mà được họ đọc tiếp.'],
      ['男', 'あ…。費用の部分は、最後のほうにまとめてしまいました。', 'À… Phần chi phí tôi lại gom ở cuối.'],
      ['女', '来週の会議には十分間に合うでしょう。', 'Vẫn thừa thời gian kịp cuộc họp tuần sau mà.'],
      ['男', 'はい。すぐに直します。', 'Vâng. Tôi sửa ngay.'],
    ],
    questions: [
      [
        '課長は企画書についてどう考えていますか。',
        ['内容が不十分なので、出すべきではない', 'このまま役員会議に出してよい', '分析はいいが、構成を直す必要がある', '市場の分析をもっと詳しくすべきだ'],
        2,
        'Trưởng phòng khen phân tích, nhưng そうねえ… và chuyện "trang đầu phải thấy đầu tư và thu hồi vốn" là cách nói vòng rằng phải sửa bố cục. Chị không cấm nộp; "vẫn kịp" nghĩa là sửa rồi nộp.',
      ],
      [
        '男の人はこのあと何をしますか。',
        ['費用と回収の見通しを最初に書く', '市場の分析を書き直す', '役員会議の日程を変える', '企画書をそのまま提出する'],
        0,
        'Anh nhận ra chi phí đang nằm cuối và nói すぐに直します: đưa phần đầu tư, thu hồi vốn lên đầu. Phân tích thị trường được khen nên không cần viết lại.',
      ],
    ],
    points: [
      ['企画書', 'きかくしょ', 'bản kế hoạch, đề án'],
      ['投資', 'とうし', 'đầu tư'],
      ['回収', 'かいしゅう', 'thu hồi (vốn)'],
      ['役員会議', 'やくいんかいぎ', 'họp ban giám đốc'],
    ],
  }),
];

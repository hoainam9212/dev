import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/** Week 6 — internal documents, rules and announcements. Level: J1. */
export const W06: BjtItem[] = [
  item('w06', 'jokyo', 1, {
    material: {
      kind: 'scene',
      vi: 'Hành lang văn phòng, cạnh bảng thông báo có dán một tờ giấy khổ lớn; hai nhân viên cầm cốc cà phê đứng đọc, một người chỉ tay vào dòng chữ ở cuối tờ giấy.',
    },
    script: [
      ['女', 'これ、見ました？ビルの裏の、ベンチと灰皿が置いてあるところ、来月から使えなくなるそうですよ。', 'Anh xem cái này chưa? Chỗ sau tòa nhà có đặt ghế dài và gạt tàn ấy, nghe nói từ tháng sau không dùng được nữa.'],
      ['男', 'え、本当ですか。じゃあ、田中さんとか、どうするんでしょう。一日に何回も下りていっていますよね。', 'Ơ, thật à? Vậy những người như anh Tanaka sẽ làm thế nào? Một ngày anh ấy xuống đó mấy lần mà.'],
      ['女', '駅の近くに公共のがありますけど、往復で十分はかかりますからね。勤務時間中はだめ、という話も出ているみたいです。', 'Gần ga có một chỗ công cộng, nhưng đi về cũng mất mười phút. Hình như còn có ý kiến cấm trong giờ làm việc nữa.'],
      ['男', 'そうですか。この貼り紙によると、空き缶のゴミ箱だけは、そのまま残るんですね。', 'Vậy à. Theo tờ dán này thì chỉ có thùng rác lon rỗng là vẫn giữ nguyên nhỉ.'],
    ],
    questions: [
      [
        '二人は何について話していますか。',
        ['来月からの駐輪場の変更', '来月からの喫煙所の変更', '来月からの勤務時間の変更', '来月からのゴミの分別の変更'],
        1,
        'Chỗ có ghế và gạt tàn bị bỏ, người hay "xuống đó nhiều lần một ngày", phải ra chỗ công cộng gần ga: đó là khu hút thuốc (喫煙所), dù chữ này không xuất hiện. Lựa chọn 3 và 4 là bẫy vì có chữ 勤務時間 và ゴミ trong băng, nhưng giờ làm việc chỉ nhắc như điều kiện cấm, còn thùng rác thì giữ nguyên.',
      ],
    ],
    points: [
      ['灰皿', 'はいざら', 'gạt tàn'],
      ['往復', 'おうふく', 'cả đi lẫn về'],
      ['貼り紙', 'はりがみ', 'giấy dán thông báo'],
    ],
  }),
  item('w06', 'jokyo', 2, {
    material: {
      kind: 'scene',
      vi: 'Văn phòng không gian mở. Một nhân viên đưa màn hình điện thoại cho đồng nghiệp ngồi bên cạnh xem; trên bàn có một chiếc laptop đã gập lại và một chiếc túi đeo vai.',
    },
    script: [
      ['男', 'これ、前の日の五時までに、アプリから出さないといけないんですよね。', 'Cái này phải nộp qua ứng dụng trước năm giờ ngày hôm trước phải không chị?'],
      ['女', 'そう。それと、自宅以外の場所でやる場合は、場所も書かなきゃいけなくなったの。カフェなんかは、画面を人に見られるから、原則だめなんだって。', 'Đúng. Còn nữa, nếu làm ở chỗ khác ngoài nhà thì giờ phải ghi cả địa điểm. Mấy chỗ như quán cà phê thì người khác nhìn được màn hình, nên về nguyên tắc là không được.'],
      ['男', 'そうなんですか。交通費は、出社しない日の分は引かれるんでしたっけ。', 'Vậy ạ. Còn tiền đi lại, những ngày không đến công ty thì bị trừ phải không ạ?'],
      ['女', 'うん。月に十日を超えたら、定期代じゃなくて、出社した日の分だけの精算になるって。', 'Ừ. Nghe nói một tháng quá mười ngày thì không trả tiền vé tháng nữa mà chỉ thanh toán theo số ngày đến công ty.'],
    ],
    questions: [
      [
        '二人は何について話していますか。',
        ['アプリでの有給休暇の申請', 'アプリでの交通費の申請', 'アプリでの残業の申請', 'アプリでの在宅勤務の申請'],
        3,
        'Nộp trước ngày hôm trước, làm ở chỗ khác ngoài nhà phải ghi địa điểm, quán cà phê không được, quá mười ngày một tháng thì đổi cách tính tiền đi lại: đó là đăng ký làm việc từ xa (在宅勤務), dù chữ này không xuất hiện. Lựa chọn 2 là bẫy vì có chữ 交通費, nhưng đó chỉ là hệ quả của việc không đến công ty.',
      ],
    ],
    points: [
      ['原則', 'げんそく', 'về nguyên tắc'],
      ['定期代', 'ていきだい', 'tiền vé tháng'],
      ['精算', 'せいさん', 'thanh toán (chi phí thực tế)'],
    ],
  }),
  item('w06', 'shiryo', 1, {
    material: {
      kind: 'table',
      title: '定期健康診断 日程',
      head: ['日程', '対象部署'],
      rows: [
        ['6月3日（月）', '営業部'],
        ['6月4日（火）', '総務部・人事部'],
        ['6月5日（水）', '開発部'],
        ['6月6日（木）', '経理部・予備日'],
      ],
    },
    script: [
      ['女', '健康診断の日程についてです。営業部は、三日に大きな展示会が入ったため、経理部と同じ日に移ります。', 'Về lịch khám sức khoẻ: phòng kinh doanh vì ngày mùng ba có triển lãm lớn nên chuyển sang cùng ngày với phòng kế toán.'],
      ['女', '経理部の方は変更ありません。', 'Phòng kế toán không thay đổi.'],
    ],
    questions: [
      [
        '営業部の健康診断はいつになりましたか。',
        ['6月3日', '6月4日', '6月5日', '6月6日'],
        3,
        'Phòng kinh doanh chuyển sang cùng ngày với phòng kế toán, mà kế toán là ngày 6/6 và không đổi. Ngày 3/6 là lịch cũ trên bảng. Ngày 6/6 vốn là ngày dự phòng nên còn chỗ.',
      ],
    ],
    points: [
      ['健康診断', 'けんこうしんだん', 'khám sức khoẻ'],
      ['予備日', 'よびび', 'ngày dự phòng'],
    ],
  }),
  item('w06', 'shiryo', 2, {
    material: {
      kind: 'bars',
      title: '社内報で読みたい記事（社員アンケート）',
      unit: '人',
      labels: ['社員紹介', '新商品情報', '経営方針', '福利厚生'],
      series: [{ name: '回答数', values: [42, 35, 18, 51] }],
    },
    script: [
      ['男', '一番多かったのは福利厚生でしたが、これは毎月、人事部からメールで案内していますので、社内報では扱いません。', 'Nhiều nhất là phúc lợi, nhưng nội dung này tháng nào phòng nhân sự cũng gửi email rồi, nên bản tin nội bộ sẽ không đưa.'],
      ['男', '来月から、二番目と三番目に希望が多かったテーマを、交互に連載します。', 'Từ tháng sau sẽ đăng xen kẽ hai chủ đề được chọn nhiều thứ hai và thứ ba.'],
    ],
    questions: [
      [
        '来月から連載するのはどれとどれですか。',
        ['福利厚生と社員紹介', '社員紹介と新商品情報', '新商品情報と経営方針', '経営方針と福利厚生'],
        1,
        'Xếp theo số người: phúc lợi 51, giới thiệu nhân viên 42, sản phẩm mới 35, định hướng kinh doanh 18. Thứ hai và thứ ba là giới thiệu nhân viên và sản phẩm mới. Phúc lợi đứng đầu nhưng bị loại.',
      ],
    ],
    points: [
      ['福利厚生', 'ふくりこうせい', 'phúc lợi'],
      ['連載する', 'れんさいする', 'đăng nhiều kỳ'],
      ['交互に', 'こうごに', 'xen kẽ, luân phiên'],
    ],
  }),
  item('w06', 'shiryo', 3, {
    material: {
      kind: 'table',
      title: '慶弔見舞金規程（抜粋）',
      head: ['事由', '金額'],
      rows: [
        ['本人の結婚', '30,000円'],
        ['子の出生', '10,000円'],
        ['本人の入院（7日以上）', '10,000円'],
        ['親の死亡', '20,000円'],
      ],
    },
    script: [
      ['女', '鈴木さん、先月ご結婚されて、来月にはお子さんも生まれるそうです。', 'Anh Suzuki tháng trước đã kết hôn, nghe nói tháng sau con cũng chào đời.'],
      ['女', '両方とも、規程どおりに申請してあげてください。', 'Cả hai việc, nhờ anh làm thủ tục theo quy định cho anh ấy nhé.'],
    ],
    questions: [
      [
        '鈴木さんが受け取る金額は、合計いくらになりますか。',
        ['40,000円', '30,000円', '10,000円', '50,000円'],
        0,
        'Kết hôn 30.000 yên + con chào đời 10.000 yên = 40.000 yên. 30.000 là khi chỉ tính tiền cưới. 50.000 là cộng nhầm thêm mục cha mẹ mất, không liên quan.',
      ],
    ],
    points: [
      ['慶弔', 'けいちょう', 'việc hỷ và việc hiếu'],
      ['見舞金', 'みまいきん', 'tiền thăm hỏi, hỗ trợ'],
      ['抜粋', 'ばっすい', 'trích'],
    ],
  }),
  item('w06', 'sogo-chodokkai', 1, {
    material: {
      kind: 'table',
      title: '3階 避難経路図',
      head: [],
      rows: [
        ['【1】階段', '会議室', '営業部', '経理部', '【2】階段'],
        ['', '', '', '', ''],
        ['トイレ', '【3】エレベーター', '給湯室', '総務部', '【4】屋外階段'],
      ],
      note: '空欄は通路。上が北。',
    },
    script: [
      ['女', '総務部からお知らせします。来週木曜日、2026年12月10日の防災訓練について、三階の皆さんの避難経路をご説明します。', 'Phòng tổng vụ xin thông báo. Tôi xin giải thích lối thoát hiểm của các anh chị tầng ba trong buổi diễn tập phòng chống thiên tai thứ năm tuần sau, ngày 10 tháng 12 năm 2026.'],
      ['女', 'お手元の図をご覧ください。三階から地上に下りる経路は、全部で四か所ございます。', 'Mời mọi người xem sơ đồ trên tay. Từ tầng ba xuống mặt đất có tất cả bốn lối.'],
      ['女', 'まず、エレベーターは、火災のときには止まりますので、訓練でも使いません。', 'Trước hết, thang máy sẽ dừng khi có hỏa hoạn, nên trong diễn tập cũng không dùng.'],
      ['女', '次に、東側の階段ですが、現在、手すりの改修工事を行っておりまして、十二月中は通れません。', 'Tiếp theo là cầu thang phía đông: hiện đang thi công sửa tay vịn, nên suốt tháng mười hai không đi qua được.'],
      ['女', '一番近いのは南側の屋外階段だ、と思われる方も多いかと思いますが、こちらは今回、四階の皆さんが使うことになっております。三階の方まで一度に下りると、大変混み合いますので、三階の皆さんは使わないでください。', 'Có lẽ nhiều người nghĩ gần nhất là cầu thang ngoài trời phía nam, nhưng lần này lối đó dành cho các anh chị tầng bốn. Nếu cả tầng ba cùng xuống một lúc thì sẽ rất đông, nên tầng ba xin đừng dùng lối này.'],
      ['女', 'したがいまして、三階の皆さんは、会議室の横の階段から下りて、一階の西口から外に出てください。集合場所は、正面の駐車場です。', 'Do đó, các anh chị tầng ba xin xuống bằng cầu thang cạnh phòng họp, rồi ra ngoài từ cửa tây tầng một. Điểm tập trung là bãi đỗ xe phía trước.'],
      ['女', '訓練の開始は午後二時です。非常ベルが鳴りましたら、作業を止め、パソコンはそのままにして、すぐに移動を始めてください。', 'Diễn tập bắt đầu lúc hai giờ chiều. Khi chuông báo động reo, xin dừng công việc, để nguyên máy tính và lập tức bắt đầu di chuyển.'],
      ['女', 'なお、当日はハンカチで口を押さえ、姿勢を低くして移動してください。以上です。', 'Ngoài ra, hôm đó xin dùng khăn tay che miệng và cúi thấp người khi di chuyển. Hết.'],
    ],
    questions: [
      [
        '三階の社員は、訓練の日、どこから下りますか。',
        ['【1】', '【2】', '【3】', '【4】'],
        0,
        'Thang máy (【3】) không dùng, cầu thang đông (【2】) đang thi công, cầu thang ngoài trời phía nam (【4】) dành cho tầng bốn; tầng ba đi cầu thang cạnh phòng họp, tức 【1】 ở phía tây. 【4】 là bẫy "gần nhất" mà chính người nói đã nhắc đến.',
      ],
    ],
    points: [
      ['避難経路', 'ひなんけいろ', 'lối thoát hiểm'],
      ['防災訓練', 'ぼうさいくんれん', 'diễn tập phòng chống thiên tai'],
      ['混み合う', 'こみあう', 'đông đúc, chen chúc'],
    ],
  }),
  item('w06', 'sogo-chodokkai', 2, {
    material: {
      kind: 'table',
      title: '定時株主総会 当日の役割（2027年6月25日・金）',
      head: ['', '役割', '時間', '人数'],
      rows: [
        ['【1】', '受付（議決権行使書の確認）', '8:30〜10:00', '4名'],
        ['【2】', '会場内の案内', '10:00〜12:00', '3名'],
        ['【3】', 'クローク（荷物の預かり）', '8:30〜10:00', '2名'],
        ['【4】', '質疑応答の記録', '10:00〜12:00', '2名'],
      ],
    },
    script: [
      ['男', '小池さん、株主総会の当日のことなんだけど、今年は初めてだから、どの役割をお願いするか、相談しておきたくて。', 'Koike, về hôm đại hội cổ đông, năm nay là lần đầu em tham gia, nên anh muốn bàn trước xem nhờ em vai trò nào.'],
      ['女', 'はい。受付でしたら、前の会社で展示会の受付をしたことがありますので、お役に立てるかと思うんですが。', 'Vâng. Nếu là lễ tân thì ở công ty cũ em đã từng làm lễ tân triển lãm, nên em nghĩ có thể giúp được ạ.'],
      ['男', 'ありがとう。ただ、総会の受付は、議決権行使書を確認して、株主かどうかを見分けないといけないんだ。間違えると後で問題になるから、経験のある人に任せたいんだよね。', 'Cảm ơn em. Có điều, lễ tân đại hội phải kiểm tra phiếu biểu quyết, xác định có phải cổ đông hay không. Nhầm thì sau này thành vấn đề, nên anh muốn giao cho người có kinh nghiệm.'],
      ['女', 'そうですか。では、記録のほうはいかがでしょう。メモを取るのは得意なほうなので。', 'Vậy ạ. Thế còn phần ghi chép thì sao ạ? Em cũng khá giỏi ghi chú.'],
      ['男', '記録は、法務の人が二人入ることになっているんだ。発言をそのまま議事録に使うから。', 'Phần ghi chép thì đã có hai người bên pháp chế. Vì lời phát biểu sẽ được dùng nguyên văn cho biên bản.'],
      ['女', 'わかりました。', 'Em hiểu rồi.'],
      ['男', 'それで、小池さんには、受付と同じ時間に、入口でお荷物をお預かりする係をお願いしたい。受付が終わって総会が始まったら、会場の中で、遅れていらした方を席までご案内してくれるかな。', 'Vì vậy, anh muốn nhờ em làm việc giữ hành lý ở cửa vào, cùng giờ với lễ tân. Khi lễ tân xong và đại hội bắt đầu, em dẫn những vị đến muộn vào chỗ ngồi trong hội trường nhé.'],
      ['女', 'はい、承知しました。当日は八時に集合でよろしいでしょうか。', 'Vâng, em hiểu rồi. Hôm đó tập trung lúc tám giờ được không ạ?'],
      ['男', 'うん、八時に会場の控室で。それと、当日は濃い色のスーツでお願いね。株主の方から見て、社員だとすぐにわかるように、名札もつけてもらうから。', 'Ừ, tám giờ ở phòng chờ của hội trường. Còn nữa, hôm đó mặc vest màu tối nhé. Em cũng sẽ đeo bảng tên, để cổ đông nhìn là biết ngay nhân viên công ty.'],
    ],
    questions: [
      [
        '女の人が担当することになったのはどれですか。',
        ['【1】と【2】', '【1】と【4】', '【2】と【3】', '【3】と【4】'],
        2,
        'Người nữ giữ hành lý cùng giờ với lễ tân (【3】, 8:30–10:00), rồi khi đại hội bắt đầu thì dẫn chỗ trong hội trường (【2】, 10:00–12:00). Lễ tân (【1】) chị tự đề nghị nhưng bị từ chối vì cần người có kinh nghiệm; ghi chép (【4】) đã có người pháp chế. Lựa chọn 1 chứa đúng phương án chị đề xuất đầu tiên.',
      ],
    ],
    points: [
      ['株主総会', 'かぶぬしそうかい', 'đại hội cổ đông'],
      ['議決権行使書', 'ぎけつけんこうししょ', 'phiếu thực hiện quyền biểu quyết'],
      ['質疑応答', 'しつぎおうとう', 'hỏi đáp'],
      ['お預かりする', 'おあずかりする', 'nhận giữ (khiêm nhường)'],
    ],
  }),
  item('w06', 'sogo-chodokkai', 3, {
    material: {
      kind: 'text',
      title: '入社手続き 提出書類（2027年1月4日入社）',
      body: '【1】雇用契約書（署名したもの）\n【2】給与振込口座の届出書\n【3】通勤経路の届出（社内システムで入力）\n【4】前の勤務先の源泉徴収票\n※すべて入社日までに人事部へ提出してください。',
    },
    script: [
      ['女', 'もしもし、石井様でいらっしゃいますか。人事部の大野でございます。一月のご入社の手続きの件で、お電話いたしました。', 'Alô, có phải anh Ishii không ạ? Tôi là Ono phòng nhân sự. Tôi gọi về thủ tục nhập công ty vào tháng một của anh.'],
      ['男', 'はい、石井です。お世話になっております。', 'Vâng, Ishii đây. Cảm ơn chị đã giúp đỡ.'],
      ['女', '雇用契約書は、郵送で確かにいただきました。通勤経路も、システムに入力していただいたものを確認いたしました。', 'Hợp đồng lao động chúng tôi đã nhận được qua bưu điện. Lộ trình đi làm anh nhập vào hệ thống chúng tôi cũng đã xác nhận.'],
      ['男', 'ありがとうございます。源泉徴収票は、前の会社から届き次第、とお伝えしていたんですが、昨日届きましたので、今日の午前中に速達でお送りしました。', 'Cảm ơn chị. Phiếu khấu trừ thuế tại nguồn thì tôi đã nói là khi công ty cũ gửi đến sẽ nộp ngay; hôm qua đã đến, nên sáng nay tôi gửi chuyển phát nhanh rồi.'],
      ['女', 'そうでしたか。ありがとうございます。届きましたら、こちらから改めてご連絡いたします。それで、あと一点なんですが、お給料の振込先の口座はいかがでしょうか。', 'Vậy ạ, cảm ơn anh. Khi nhận được chúng tôi sẽ liên lạc lại. Còn một điểm nữa: tài khoản nhận lương thì thế nào rồi ạ?'],
      ['男', 'あ、それが、新しく口座を作ろうと思っていまして、銀行の予約が来週の月曜なんです。口座番号がわかったら、すぐにお出しします。', 'À, chuyện đó thì tôi định mở tài khoản mới, lịch hẹn ở ngân hàng là thứ hai tuần sau. Biết số tài khoản rồi tôi sẽ nộp ngay.'],
      ['女', '承知しました。一月の給与に間に合わせるため、入社日までには必ずお願いいたします。', 'Vâng ạ. Để kịp lương tháng một, xin anh nhất định nộp trước ngày nhập công ty.'],
      ['男', 'はい、必ず間に合わせます。ほかに、入社の日に持っていくものはありますか。', 'Vâng, tôi nhất định sẽ kịp. Ngoài ra, ngày đầu đi làm tôi có cần mang gì không ạ?'],
      ['女', '写真を一枚お持ちください。社員証を作りますので。当日は九時に、本社一階の受付にお越しください。', 'Xin anh mang theo một tấm ảnh, để làm thẻ nhân viên. Hôm đó mời anh đến quầy lễ tân tầng một trụ sở lúc chín giờ.'],
    ],
    questions: [
      [
        '男の人がまだ出していない書類はどれですか。',
        ['【1】', '【2】', '【3】', '【4】'],
        1,
        'Hợp đồng (【1】) đã nhận, lộ trình (【3】) đã nhập, phiếu khấu trừ thuế (【4】) đã gửi sáng nay; chỉ có giấy đăng ký tài khoản nhận lương (【2】) chưa nộp vì anh ấy còn chờ mở tài khoản mới. 【4】 là bẫy: nghe "khi nào đến sẽ nộp" và "nhận được sẽ liên lạc" dễ tưởng chưa xong, nhưng anh ấy đã gửi đi rồi.',
      ],
    ],
    points: [
      ['雇用契約書', 'こようけいやくしょ', 'hợp đồng lao động'],
      ['源泉徴収票', 'げんせんちょうしゅうひょう', 'phiếu khấu trừ thuế tại nguồn'],
      ['振込', 'ふりこみ', 'chuyển khoản'],
    ],
  }),
  item('w06', 'sogo-chodokkai', 4, {
    material: {
      kind: 'text',
      title: '備品貸出規程 改定案（抜粋）',
      body: '【1】第2条　貸出の予約は、使用する日の3日前までに行う。\n【2】第4条　貸出期間は、最長1週間とする。\n【3】第6条　社外へ持ち出す場合は、所属課長の承認を得る。\n【4】第8条　破損・紛失した場合は、所属部署の費用で修理または弁償する。',
    },
    script: [
      ['女', '備品の貸出規程の改定案に、各部から意見が届いています。まず、予約を三日前までにするのは厳しい、前日までにしてほしいという声が多いです。', 'Về bản sửa đổi quy định cho mượn thiết bị, các bộ phận đã gửi ý kiến. Trước hết, nhiều người nói đặt trước ba ngày là khắt khe, muốn đổi thành trước một ngày.'],
      ['男', 'うーん、気持ちはわかるけど、貸し出す前に動作の確認もあるからね。三日前は残そう。空いていれば当日でも貸せるように、運用で対応すればいい。', 'Ừm, anh hiểu, nhưng trước khi cho mượn còn phải kiểm tra máy chạy. Giữ ba ngày. Nếu còn trống thì cho mượn ngay trong ngày, xử lý trong vận hành là được.'],
      ['女', 'わかりました。次に、海外出張だと一週間では足りない、という意見です。', 'Em hiểu rồi. Tiếp theo là ý kiến đi công tác nước ngoài thì một tuần không đủ.'],
      ['男', 'それは、延長の申請を出してもらえば済む話だから、規程はこのままでいいよ。', 'Việc đó chỉ cần nộp đơn gia hạn là xong, nên quy định cứ để nguyên.'],
      ['女', 'はい。それから、社外への持ち出しは、課長ではなく部長の承認にすべきでは、という意見もありました。', 'Vâng. Ngoài ra có ý kiến mang ra ngoài công ty thì nên cần trưởng bộ phận duyệt chứ không phải trưởng phòng.'],
      ['男', 'いや、そうすると手続きに時間がかかりすぎる。これまでどおりで。', 'Không, như thế thì thủ tục mất thời gian quá. Cứ như trước.'],
      ['女', '最後に、壊したときの費用です。来年度から備品全部に保険をかけることになりましたので、部署で弁償するという書き方は合わなくなります。', 'Cuối cùng là chi phí khi làm hỏng. Từ năm tài chính sau, toàn bộ thiết bị sẽ được mua bảo hiểm, nên cách viết "bộ phận tự bồi thường" không còn phù hợp.'],
      ['男', 'ああ、そうか。そこは直さないといけないね。「会社の保険で対応する」に書き換えておいて。ただし、わざと壊した場合は別、と一言入れてね。', 'À, ra vậy. Chỗ đó phải sửa. Em viết lại thành "xử lý bằng bảo hiểm của công ty". Nhưng thêm một câu: trường hợp cố ý làm hỏng thì khác.'],
    ],
    questions: [
      [
        '改定案のうち、書き直すことになったのはどれですか。',
        ['【1】', '【2】', '【3】', '【4】'],
        3,
        'Chỉ điều 8 (【4】) phải viết lại vì sắp có bảo hiểm cho mọi thiết bị. Các ý kiến về 【1】 (đổi sang trước một ngày), 【2】 (kéo dài thời hạn) và 【3】 (đổi người duyệt) đều bị bác và giữ nguyên. 【1】 là bẫy vì được nhiều người đề nghị nhất.',
      ],
    ],
    points: [
      ['貸出', 'かしだし', 'cho mượn'],
      ['弁償する', 'べんしょうする', 'bồi thường'],
      ['運用で対応する', 'うんようでたいおうする', 'xử lý bằng cách vận hành (không sửa quy định)'],
    ],
  }),
];

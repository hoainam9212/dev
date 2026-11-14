import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/** Week 16 — final review: mixed themes from the whole course, exam-like. Level: J1, about a third J1+. */
export const W16: BjtItem[] = [
  item('w16', 'jokyo', 1, {
    material: {
      kind: 'scene',
      vi: 'Góc văn phòng cạnh máy fax. Một người cầm tờ giấy ghi lời nhắn đưa cho người ngồi ở bàn; người ngồi đang mở lịch tuần trên máy tính.',
    },
    script: [
      ['男', 'あのう、さっき吉川商事の方からお電話がありまして、来週の月曜日、十時のお約束を、午後に変えていただけないかということでした。', 'Ừm, lúc nãy bên Yoshikawa Shoji có gọi điện, hỏi có thể đổi cuộc hẹn mười giờ thứ Hai tuần sau sang buổi chiều được không ạ.'],
      ['女', '午後ね……。一時から三時までは会議だから、それ以降なら空いてるわ。', 'Buổi chiều à… Từ một đến ba giờ tôi họp, sau đó thì trống.'],
      ['男', 'では、三時半以降でしたら、とお伝えしてよろしいですか。', 'Vậy tôi báo là từ ba rưỡi trở đi thì được, có được không ạ?'],
      ['女', 'ええ、お願い。折り返しの電話番号はわかる？', 'Ừ, nhờ em. Có số điện thoại để gọi lại không?'],
      ['男', 'はい、こちらのメモに書いておきました。ご担当は営業の野口様です。', 'Vâng, tôi đã ghi vào tờ ghi chú này. Người phụ trách là Noguchi-sama bên kinh doanh.'],
    ],
    questions: [
      [
        '二人は何について話していますか。',
        ['吉川商事の電話対応について', '吉川商事のアポイントについて', '吉川商事の見積もり依頼について', '吉川商事の新製品について'],
        1,
        'Khách xin đổi cuộc hẹn mười giờ thứ Hai sang buổi chiều, hai người tìm giờ trống → lịch hẹn gặp, lựa chọn 2. Lựa chọn 1 có từ 電話 nghe trong băng, nhưng cuộc gọi chỉ là cách tin được chuyển tới, không ai bàn cách trả lời điện thoại. Báo giá và sản phẩm mới không được nhắc.',
      ],
    ],
    points: [
      ['折り返し', 'おりかえし', 'gọi lại'],
      ['お約束', 'おやくそく', 'cuộc hẹn'],
      ['以降', 'いこう', 'từ … trở đi'],
    ],
  }),
  item('w16', 'jokyo', 2, {
    material: {
      kind: 'scene',
      vi: 'Xưởng sản xuất. Hai người đội mũ bảo hộ đứng cạnh một máy lớn có đèn báo đỏ đang sáng; dây chuyền bên cạnh dừng, trên băng chuyền còn vài sản phẩm.',
    },
    script: [
      ['男', '二号機、また止まりましたね。今週に入って、これで三回目です。', 'Máy số hai lại dừng rồi. Từ đầu tuần đến giờ là lần thứ ba.'],
      ['女', '中の部品が、すり減ってきてるのかもしれないわね。メーカーの定期点検は、いつだった？', 'Có khi linh kiện bên trong bị mòn rồi. Đợt kiểm tra định kỳ của hãng là khi nào nhỉ?'],
      ['男', '来月の予定です。でも、それまで待っていると、出荷に響きそうで。', 'Dự kiến tháng sau ạ. Nhưng đợi tới lúc đó thì có vẻ ảnh hưởng tới việc xuất hàng.'],
      ['女', 'そうね。点検を前倒ししてもらえないか、すぐメーカーに頼んでみて。それまでは、一号機の稼働時間を延ばして対応しましょう。', 'Đúng vậy. Hỏi hãng ngay xem có thể làm kiểm tra sớm hơn không. Trong lúc chờ thì kéo dài giờ chạy máy số một để bù.'],
    ],
    questions: [
      [
        '二人は何について話していますか。',
        ['製造ラインの機械の故障について', '製造ラインの出荷計画について', '製造ラインの人員配置について', '製造ラインの部品の発注について'],
        0,
        'Máy số hai dừng lần thứ ba trong tuần, nghi linh kiện mòn, nhờ hãng kiểm tra sớm → máy hỏng, lựa chọn 1. Lựa chọn 4 có từ 部品 trong băng, nhưng không ai đặt mua linh kiện; lựa chọn 2 có từ 出荷, nhưng việc xuất hàng chỉ là điều lo bị ảnh hưởng.',
      ],
    ],
    points: [
      ['すり減る', 'すりへる', 'mòn'],
      ['響く', 'ひびく', 'ảnh hưởng tới'],
      ['稼働', 'かどう', 'vận hành (máy)'],
    ],
  }),
  item('w16', 'shiryo', 1, {
    material: {
      kind: 'bars',
      title: '月別売上（第1営業課）',
      unit: '万円',
      labels: ['4月', '5月', '6月', '7月'],
      series: [
        { name: '目標', values: [500, 500, 550, 550] },
        { name: '実績', values: [480, 530, 560, 520] },
      ],
    },
    script: [['女', '目標を達成した月のうち、目標を上回った額が最も大きかった月について、担当チームを社内報で紹介します。', 'Trong các tháng đạt mục tiêu, tháng nào vượt mục tiêu nhiều nhất thì nhóm phụ trách tháng đó sẽ được giới thiệu trên bản tin nội bộ.']],
    questions: [
      [
        '社内報で紹介されるのは、どの月の担当チームですか。',
        ['4月', '5月', '6月', '7月'],
        1,
        'Lựa chọn 2: đạt mục tiêu có tháng 5 (+30 vạn) và tháng 6 (+10 vạn); vượt nhiều nhất là tháng 5. Lựa chọn 3 dễ chọn vì tháng 6 có doanh thu thực tế cao nhất (560), nhưng câu hỏi là mức vượt mục tiêu, mà mục tiêu tháng 6 cũng cao hơn.',
      ],
    ],
    points: [
      ['実績', 'じっせき', 'kết quả thực tế'],
      ['社内報', 'しゃないほう', 'bản tin nội bộ'],
      ['上回る', 'うわまわる', 'vượt hơn'],
    ],
  }),
  item('w16', 'shiryo', 2, {
    material: {
      kind: 'table',
      title: 'ノベルティ用ボールペン 見積比較',
      head: ['会社', '単価', '送料', '最低注文数'],
      rows: [
        ['A社', '120円', '3,000円', '100本'],
        ['B社', '110円', '8,000円', '500本'],
        ['C社', '115円', '無料', '200本'],
        ['D社', '105円', '10,000円', '300本'],
      ],
    },
    script: [['男', '今回は三百本だけ注文します。送料も含めた総額で、一番安いところにお願いしましょう。', 'Lần này chỉ đặt ba trăm cây. Ta chọn chỗ rẻ nhất tính theo tổng tiền, gồm cả phí gửi.']],
    questions: [
      [
        'どの会社に注文しますか。',
        ['A社', 'B社', 'C社', 'D社'],
        2,
        'Lựa chọn 3: với 300 cây, A = 36.000 + 3.000 = 39.000 yên; B không nhận vì tối thiểu 500 cây; C = 34.500 yên, miễn phí gửi; D = 31.500 + 10.000 = 41.500 yên. Lựa chọn 4 dễ chọn vì đơn giá thấp nhất, nhưng phí gửi làm tổng cao nhất.',
      ],
    ],
    points: [
      ['単価', 'たんか', 'đơn giá'],
      ['最低注文数', 'さいていちゅうもんすう', 'số lượng đặt tối thiểu'],
      ['総額', 'そうがく', 'tổng số tiền'],
    ],
  }),
  item('w16', 'shiryo', 3, {
    material: {
      kind: 'text',
      title: '在宅勤務の申請について',
      body: '・在宅勤務は1週間（月曜〜金曜）に2日までとします。\n・前営業日の15時までに、社内システムで申請してください。\n・入社3か月未満の社員は対象外です。',
    },
    script: [
      ['男', '来週の月曜と火曜、在宅にしたいんですけど、今週はもう水曜と木曜に在宅を取っているんです。大丈夫でしょうか。', 'Tôi muốn làm ở nhà thứ hai và thứ ba tuần sau, nhưng tuần này tôi đã làm ở nhà thứ tư và thứ năm rồi. Có được không ạ?'],
      ['女', '週が違うから、それは問題ありませんよ。ただ、月曜の分は、今週の金曜の三時までに出してくださいね。', 'Khác tuần nên không sao đâu. Có điều phần thứ hai thì nộp trước ba giờ chiều thứ sáu tuần này nhé.'],
    ],
    questions: [
      [
        '男の人について、正しいのはどれですか。',
        ['来週は在宅勤務ができない', '今週の在宅勤務を一日取り消す必要がある', '来週は一日しか在宅勤務ができない', '月曜の分は今週金曜の15時までに申請する'],
        3,
        'Lựa chọn 4: hạn là 15 giờ của ngày làm việc trước đó; trước thứ hai là thứ sáu (thứ bảy, chủ nhật nghỉ). Giới hạn hai ngày tính theo từng tuần, nên lựa chọn 1, 2 và 3 đều là bẫy cho người cộng dồn bốn ngày của hai tuần.',
      ],
    ],
    points: [
      ['前営業日', 'ぜんえいぎょうび', 'ngày làm việc liền trước'],
      ['対象外', 'たいしょうがい', 'ngoài đối tượng áp dụng'],
    ],
  }),
  item('w16', 'sogo-chodokkai', 1, {
    material: {
      kind: 'table',
      title: '弊社周辺の地図（上が北）',
      head: [],
      rows: [
        ['【1】', '', '郵便局', '', '【2】'],
        ['', '工事中', '', '', ''],
        ['書店', '', '【3】', '', '交番'],
        ['', '', '', '', ''],
        ['地下鉄出口', '', 'カフェ', '', '【4】'],
      ],
      note: '※空白は道路。「工事中」は通行止め。',
    },
    script: [
      ['男', 'もしもし、藤田工業の村上です。今、地下鉄の出口を出たところなんですが、いただいた地図の道が工事で通れなくなっていまして。', 'A lô, tôi là Murakami bên Fujita Kogyo. Tôi vừa ra khỏi lối lên ga tàu điện ngầm, nhưng con đường trong bản đồ chị gửi đang thi công, không đi được.'],
      ['女', '大変失礼いたしました。先週から工事が始まっておりまして、地図を直すのを忘れておりました。', 'Thành thật xin lỗi anh. Từ tuần trước bắt đầu thi công, chúng tôi quên sửa bản đồ.'],
      ['男', 'いえいえ。どう行けばよろしいでしょうか。お約束の二時には、まだ十五分ほどあるんですが。', 'Không sao. Tôi nên đi thế nào ạ? Tới giờ hẹn hai giờ vẫn còn khoảng mười lăm phút.'],
      ['女', 'それでしたら、十分間に合います。少し遠回りになりますが、歩いて五、六分です。', 'Vậy thì hoàn toàn kịp ạ. Sẽ phải đi vòng một chút, nhưng đi bộ mất năm, sáu phút.'],
      ['女', '出口を出ると、右手のほうにカフェが見えると思います。その前を通って、東へまっすぐ進んでいただけますか。', 'Ra khỏi lối lên, anh sẽ thấy quán cà phê ở phía tay phải. Anh đi ngang trước quán, cứ thẳng về hướng đông được không ạ.'],
      ['男', 'はい、カフェの前ですね。', 'Vâng, trước quán cà phê.'],
      ['女', 'カフェを過ぎて最初の角を、左に曲がってください。少し行くと、右側に交番があります。', 'Qua quán cà phê, đến góc đầu tiên thì anh rẽ trái. Đi một đoạn sẽ có đồn cảnh sát bên phải.'],
      ['男', '交番の向かいのビル、ということですか。', 'Là toà nhà đối diện đồn cảnh sát phải không ạ?'],
      ['女', 'いえ、そちらは別の会社でして。交番を過ぎて、もう一つ先の角を越えたところです。', 'Không ạ, đó là công ty khác. Qua đồn cảnh sát, vượt thêm một góc phố nữa là tới.'],
      ['男', 'ああ、郵便局が見えてきました。郵便局の隣のビルでしょうか。', 'À, tôi thấy bưu điện rồi. Là toà nhà cạnh bưu điện ạ?'],
      ['女', '郵便局は左側ですよね。弊社は、その向かい、右側のビルになります。一階の受付でお名前をおっしゃってください。お待ちしております。', 'Bưu điện ở bên trái phải không ạ. Công ty chúng tôi là toà nhà đối diện, bên phải. Anh cho biết tên ở quầy lễ tân tầng một nhé. Chúng tôi xin chờ anh.'],
    ],
    questions: [
      [
        '女の人の会社はどこにありますか。',
        ['【1】', '【2】', '【3】', '【4】'],
        1,
        'Đi về đông qua quán cà phê, rẽ trái (lên bắc) ở góc đầu tiên, qua đồn cảnh sát bên phải, qua thêm một góc nữa; bưu điện bên trái, công ty ở bên phải đối diện → 【2】, lựa chọn 2. Lựa chọn 3 là toà nhà đối diện đồn cảnh sát, của công ty khác. Lựa chọn 1 nằm cạnh bưu điện, nhưng người phụ nữ đã sửa: công ty ở phía đối diện.',
      ],
    ],
    points: [
      ['通行止め', 'つうこうどめ', 'cấm đi qua'],
      ['弊社', 'へいしゃ', 'công ty chúng tôi (khiêm nhường)'],
      ['越える', 'こえる', 'vượt qua'],
    ],
  }),
  item('w16', 'sogo-chodokkai', 2, {
    material: {
      kind: 'text',
      title: '展示会「食品機械フェア2027」終了後のフォロー',
      body: '【1】名刺データの入力（214枚）\n【2】来場者へのお礼メールの送信\n【3】サンプル請求への対応（3件）\n【4】展示品の返送の手配',
    },
    script: [
      ['女', '展示会のあとのフォロー、どこまで進んだか教えてくれる？', 'Phần chăm sóc sau triển lãm đã tiến tới đâu rồi, cho tôi biết được không?'],
      ['男', 'はい。まず名刺ですが、派遣の方に手伝っていただいて、昨日、二百十四枚すべて入力が終わりました。', 'Vâng. Trước hết là danh thiếp: nhờ nhân viên phái cử giúp, hôm qua đã nhập xong toàn bộ hai trăm mười bốn tấm.'],
      ['女', '早いわね。お礼のメールは？', 'Nhanh nhỉ. Còn email cảm ơn?'],
      ['男', '今朝、入力したデータを使って、一斉に送りました。もう何件か、お返事もいただいています。', 'Sáng nay đã dùng dữ liệu vừa nhập gửi đồng loạt rồi ạ. Đã có vài phản hồi.'],
      ['女', 'サンプルの請求は三件あったわよね。', 'Yêu cầu gửi mẫu có ba vụ nhỉ.'],
      ['男', 'はい。二件はもう発送しました。残りの一件は、ご希望の型が在庫切れでして、工場に確認したところ、来週の水曜日にできあがるそうなので、それを待ってお送りします。お客様にはその旨お伝えしてあります。', 'Vâng. Hai vụ đã gửi rồi. Vụ còn lại thì loại khách muốn đang hết hàng, hỏi nhà máy thì thứ Tư tuần sau mới làm xong, nên đợi có rồi gửi. Tôi đã báo cho khách việc đó.'],
      ['女', 'わかった。展示品はまだ会場の倉庫よね。', 'Được rồi. Hàng trưng bày vẫn còn ở kho của hội trường nhỉ.'],
      ['男', 'はい、ただ、運送会社にはもう依頼してあって、明日の午前中に引き取りに来てもらうことになっています。', 'Vâng, nhưng đã nhờ công ty vận chuyển rồi, sáng mai họ sẽ đến lấy.'],
      ['女', 'それならいいわ。名刺のデータは、営業の各担当に振り分けておいてね。', 'Vậy thì được. Dữ liệu danh thiếp thì chia cho từng người phụ trách kinh doanh nhé.'],
      ['男', 'はい、地域ごとに分けて、今日中にお送りします。', 'Vâng, tôi sẽ chia theo khu vực và gửi trong hôm nay.'],
      ['女', 'ありがとう。来場者の中で、すぐに商談につながりそうなお客様がいたら、リストにして来週の会議に出してちょうだい。', 'Cảm ơn nhé. Trong số khách tham quan, nếu có khách nào có vẻ sắp thành cuộc đàm phán thì lập danh sách đưa vào cuộc họp tuần sau nhé.'],
    ],
    questions: [
      [
        'まだ完了していないのはどれですか。',
        ['【1】', '【2】', '【3】', '【4】'],
        2,
        'Yêu cầu mẫu có ba vụ, mới gửi hai, vụ còn lại chờ hàng tới thứ Tư tuần sau → 【3】 chưa xong, lựa chọn 3. Lựa chọn 4 dễ nhầm vì hàng trưng bày vẫn nằm ở kho hội trường, nhưng việc cần làm là "sắp xếp gửi trả", và đã nhờ công ty vận chuyển xong. 【1】 và 【2】 đã làm xong.',
      ],
    ],
    points: [
      ['一斉に', 'いっせいに', 'đồng loạt'],
      ['在庫切れ', 'ざいこぎれ', 'hết hàng'],
      ['その旨', 'そのむね', 'nội dung đó, việc đó'],
      ['振り分ける', 'ふりわける', 'chia ra, phân bổ'],
    ],
  }),
  item('w16', 'sogo-chodokkai', 3, {
    material: {
      kind: 'table',
      title: '定期健康診断　部署別日程（会場：本社3階 大会議室）',
      head: ['日付', '対象部署'],
      rows: [
        ['2027年1月18日（月）', '【1】営業部'],
        ['2027年1月19日（火）', '【2】製造部'],
        ['2027年1月20日（水）', '【3】総務部・経理部'],
        ['2027年1月21日（木）', '【4】開発部'],
      ],
    },
    script: [
      ['男', '総務部からのお知らせです。来週の定期健康診断の日程について、変更がありますので、ご確認ください。', 'Thông báo từ phòng tổng vụ. Lịch khám sức khoẻ định kỳ tuần sau có thay đổi, mọi người vui lòng kiểm tra.'],
      ['男', '製造部の皆さんは、十九日の火曜日を予定しておりましたが、この日に工場の設備点検が入ったため、二十一日の木曜日に移っていただきます。', 'Các anh chị bộ phận sản xuất dự kiến khám vào thứ Ba ngày mười chín, nhưng ngày đó nhà máy có kiểm tra thiết bị, nên xin chuyển sang thứ Năm ngày hai mươi mốt.'],
      ['男', 'これに伴いまして、二十一日に予定していた開発部の皆さんには、一日早めていただくことになりました。総務部・経理部と同じ日になりますので、当日は少し混み合うかと思います。', 'Kéo theo đó, các anh chị bộ phận phát triển vốn dự kiến ngày hai mươi mốt sẽ khám sớm lên một ngày. Sẽ trùng ngày với tổng vụ và kế toán, nên hôm đó có thể hơi đông.'],
      ['男', '混雑を避けるため、開発部の皆さんは午後、総務部・経理部は午前に受けていただくよう、お願いいたします。', 'Để tránh đông, xin bộ phận phát triển khám buổi chiều, tổng vụ và kế toán khám buổi sáng.'],
      ['男', '営業部は変更ございません。外出の予定がある方は、事前に時間を調整しておいてください。また、どの部署の方も、健診の前日の夜九時以降は、お食事をお控えください。問診票は、各部の庶務担当の方から、今週中にお配りします。', 'Bộ phận kinh doanh không thay đổi. Ai có lịch đi ra ngoài thì điều chỉnh giờ trước. Ngoài ra, mọi bộ phận xin đừng ăn uống sau chín giờ tối hôm trước ngày khám. Phiếu khai sức khoẻ sẽ do người phụ trách hành chính của từng bộ phận phát trong tuần này.'],
      ['男', 'なお、十九日は健診がなくなりますが、会場の大会議室は終日使えませんので、ご注意ください。当日受けられない方は、二月の予備日をご案内します。以上です。', 'Ngoài ra, ngày mười chín tuy không còn khám nữa, nhưng phòng họp lớn dùng làm nơi khám vẫn không sử dụng được cả ngày, mọi người lưu ý. Ai không khám được vào ngày của mình thì sẽ được hướng dẫn ngày dự phòng trong tháng Hai. Tôi xin hết.'],
    ],
    questions: [
      [
        '開発部の健康診断は、表のどの日になりましたか。',
        ['【1】の日', '【2】の日', '【3】の日', '【4】の日'],
        2,
        'Sản xuất chuyển sang ngày 21, nên phát triển "sớm lên một ngày" → ngày 20, cùng ngày với tổng vụ, kế toán → ngày của 【3】, lựa chọn 3. Lựa chọn 4 là ngày cũ của phát triển, giờ thành ngày của sản xuất. Lựa chọn 2 (ngày 19) là ngày bị bỏ trống, không ai khám.',
      ],
    ],
    points: [
      ['〜に伴い', 'にともない', 'kéo theo, đi kèm với'],
      ['混み合う', 'こみあう', 'đông đúc'],
      ['予備日', 'よびび', 'ngày dự phòng'],
    ],
  }),
  item('w16', 'sogo-chodokkai', 4, {
    material: {
      kind: 'text',
      title: '経理スタッフ（中途採用）二次面接の候補者',
      body: '【1】長谷川　経理経験5年（製造業）\n【2】宮内　　大学4年生・簿記2級\n【3】小松　　経理経験2年・英語で業務経験あり\n【4】石田　　営業経験8年・経理経験なし',
    },
    script: [
      ['女', '課長、経理の中途採用ですが、一次面接を通った四人のうち、二次に進んでいただく二人を決めたいと思いまして。', 'Trưởng phòng, về tuyển dụng kế toán có kinh nghiệm, trong bốn người qua vòng một, tôi muốn quyết hai người vào vòng hai.'],
      ['男', 'うん。まず、長谷川さんは決まりだろう。五年もやっていれば、来月からでもすぐに締めの作業を任せられる。', 'Ừ. Trước hết Hasegawa thì chắc chắn rồi. Làm tới năm năm thì từ tháng sau giao ngay việc chốt sổ cũng được.'],
      ['女', 'はい、私もそう思います。もう一人ですが、宮内さんは成績はとてもいいんですが……。', 'Vâng, tôi cũng nghĩ vậy. Người còn lại, Miyauchi thì thành tích rất tốt nhưng…'],
      ['男', '今回は経験者の募集だからね。新卒の採用は、春に別にやるんだし、そちらを案内してあげて。', 'Lần này là tuyển người có kinh nghiệm mà. Tuyển sinh viên mới ra trường thì mùa xuân làm riêng, giới thiệu cho Miyauchi đợt đó nhé.'],
      ['女', 'わかりました。あとは、小松さんと石田さんですね。', 'Vâng ạ. Còn lại là Komatsu và Ishida.'],
      ['男', '石田さんは、面接で数字にすごく強いと思ったんだけどなあ。話も上手だったし。', 'Ishida thì lúc phỏng vấn tôi thấy rất giỏi con số. Nói chuyện cũng khéo.'],
      ['女', 'ええ。ただ、経理の実務はまったくされたことがないので、一から覚えていただくことになります。今の人数で、そこまで面倒を見る余裕はあるでしょうか。', 'Vâng. Có điều chưa từng làm thực tế kế toán, nên sẽ phải học lại từ đầu. Với số người hiện nay, mình có đủ sức kèm tới mức đó không ạ.'],
      ['男', 'そうだな……。来年から海外の子会社とのやりとりも増えるし、英語ができる人のほうが助かるか。', 'Cũng phải… Từ năm sau trao đổi với công ty con ở nước ngoài cũng nhiều lên, người biết tiếng Anh thì đỡ hơn.'],
      ['女', 'はい。では、その二人にご連絡します。日程は来週の後半で調整しますね。', 'Vâng. Vậy tôi sẽ liên lạc với hai người đó. Lịch thì tôi sắp xếp vào cuối tuần sau.'],
      ['男', '頼むよ。二次は部長にも入っていただくから、部長の予定も確認しておいて。', 'Nhờ em nhé. Vòng hai có cả trưởng bộ phận tham gia, nên kiểm tra luôn lịch của trưởng bộ phận.'],
    ],
    questions: [
      [
        '二次面接に進むのは誰ですか。',
        ['【1】と【2】', '【2】と【3】', '【1】と【4】', '【1】と【3】'],
        3,
        'Hasegawa 【1】 được chọn ngay vì có năm năm kinh nghiệm. Miyauchi 【2】 là sinh viên, không hợp đợt tuyển người có kinh nghiệm. Ishida 【4】 được trưởng phòng khen nhưng chưa từng làm kế toán; cuối cùng chọn Komatsu 【3】 biết tiếng Anh → lựa chọn 4. Lựa chọn 3 (【1】 và 【4】) là điều trưởng phòng nghiêng về lúc đầu.',
      ],
    ],
    points: [
      ['中途採用', 'ちゅうとさいよう', 'tuyển người đã đi làm'],
      ['締め', 'しめ', 'chốt sổ (cuối kỳ)'],
      ['面倒を見る', 'めんどうをみる', 'kèm cặp, chăm lo'],
    ],
  }),
];

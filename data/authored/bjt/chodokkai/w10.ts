import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/** Week 10 — contracts, quotations and deliveries. Level: J1. */
export const W10: BjtItem[] = [
  item('w10', 'jokyo', 1, {
    material: {
      kind: 'scene',
      vi: 'Bãi bốc dỡ hàng của một nhà kho. Một nhân viên cầm bìa kẹp giấy đứng cạnh chồng thùng các-tông; tài xế xe tải mặc đồng phục đứng bên, nhìn vào tờ phiếu.',
    },
    script: [
      ['女', 'あのう、すみません。この段ボールなんですが、伝票では二十箱になっているのに、何度数えても十八しかなくて。', 'Ừm, xin lỗi. Mấy thùng này, trên phiếu ghi hai mươi thùng mà tôi đếm mấy lần vẫn chỉ có mười tám.'],
      ['男', 'え、本当ですか。……あ、ほんとだ。申し訳ありません。', 'Ơ, thật ạ? … À, đúng thật. Tôi xin lỗi.'],
      ['女', 'どこかで別のトラックに積まれてしまったんでしょうか。', 'Có khi nào bị chất nhầm lên xe tải khác ở đâu đó không?'],
      ['男', 'たぶん、センターで次の便に回されたんだと思います。すぐ確認して、午後にもう一度お持ちします。受け取りのサインは、届いた分だけで結構ですので。', 'Có lẽ ở trung tâm họ đã chuyển sang chuyến sau. Tôi kiểm tra ngay và chiều nay mang tới lần nữa. Chữ ký nhận hàng thì chị chỉ cần ký cho số đã tới thôi.'],
    ],
    questions: [
      [
        '二人は何について話していますか。',
        ['荷物の届け先について', '荷物の破損について', '荷物の伝票番号について', '荷物の数量について'],
        3,
        'Phiếu ghi 20 thùng mà chỉ có 18, phần còn lại chiều sẽ mang tới → chuyện thiếu số lượng, lựa chọn 4. Lựa chọn 3 có từ 伝票 nghe trong băng, nhưng phiếu chỉ là chỗ ghi số thùng, không ai nói mã phiếu sai. Hàng giao đúng nơi và không bị hỏng (lựa chọn 1, 2).',
      ],
    ],
    points: [
      ['伝票', 'でんぴょう', 'phiếu (giao hàng)'],
      ['積む', 'つむ', 'chất (hàng) lên'],
      ['次の便', 'つぎのびん', 'chuyến (xe) sau'],
    ],
  }),
  item('w10', 'jokyo', 2, {
    material: {
      kind: 'scene',
      vi: 'Bàn làm việc trong văn phòng. Hai người cúi xem một bản hợp đồng có dán nhiều giấy nhớ màu vàng; một người đang gạch chân một điều khoản bằng bút đỏ.',
    },
    script: [
      ['男', 'この条項なんですけど、「納品後三十日以内」となっていまして。', 'Điều khoản này ghi là "trong vòng ba mươi ngày sau khi giao hàng".'],
      ['女', 'ああ、それだと困るわね。うちの経理は月末締めの翌月末なので、月の初めに納品されると、間に合わないことがあるのよ。', 'À, thế thì khó đấy. Kế toán bên mình chốt cuối tháng, chuyển vào cuối tháng sau, nên hàng giao đầu tháng thì có khi không kịp.'],
      ['男', 'では、先方に、月末締め翌月末でお願いできないか、相談してみます。', 'Vậy tôi sẽ thử trao đổi với bên kia xem có thể theo kiểu chốt cuối tháng, trả cuối tháng sau được không.'],
      ['女', 'そうね。ついでに、振込の手数料をどちらが持つかも、はっきり書いてもらって。', 'Ừ. Tiện thể nhờ họ ghi rõ luôn phí chuyển khoản bên nào chịu.'],
    ],
    questions: [
      [
        '二人は何について話していますか。',
        ['契約書の支払条件について', '契約書の納品日について', '契約書の手数料について', '契約書の有効期間について'],
        0,
        'Bàn hạn "30 ngày sau giao hàng" không khớp với cách kế toán chốt cuối tháng, trả cuối tháng sau → điều kiện thanh toán, lựa chọn 1. Lựa chọn 2 có từ 納品 trong băng, nhưng ngày giao không bị đổi. Lựa chọn 3 (phí chuyển khoản) chỉ được nhắc "tiện thể", không phải chủ đề chính.',
      ],
    ],
    points: [
      ['条項', 'じょうこう', 'điều khoản'],
      ['月末締め翌月末払い', 'げつまつじめよくげつまつばらい', 'chốt cuối tháng, trả cuối tháng sau'],
      ['手数料を持つ', 'てすうりょうをもつ', 'chịu phí'],
    ],
  }),
  item('w10', 'shiryo', 1, {
    material: {
      kind: 'table',
      title: 'お見積書',
      head: ['品目', '単価', '数量', '金額'],
      rows: [
        ['ノートパソコン', '120,000円', '5台', '600,000円'],
        ['モニター', '30,000円', '5台', '150,000円'],
        ['設定作業', '10,000円', '5台', '50,000円'],
        ['合計', '', '', '800,000円'],
      ],
      note: '金額は税抜きです。',
    },
    script: [['男', '先方から連絡があって、モニターは今回は要らないそうです。それから、パソコンの台数を五台から六台に増やしたいとのことでした。設定作業も台数分お願いしたいそうです。見積もりを出し直してください。', 'Bên kia liên lạc, nói lần này không cần màn hình. Ngoài ra họ muốn tăng số máy tính từ năm lên sáu. Cài đặt cũng làm theo số máy. Nhờ làm lại báo giá.']],
    questions: [
      [
        '新しい見積もりの合計はいくらですか。',
        ['800,000円', '960,000円', '720,000円', '780,000円'],
        3,
        'Máy tính 6 × 120.000 = 720.000; cài đặt 6 × 10.000 = 60.000; bỏ màn hình. Tổng 780.000 yên. 960.000 là khi quên bỏ màn hình. 720.000 là quên tiền cài đặt.',
      ],
    ],
    points: [
      ['見積書', 'みつもりしょ', 'bản báo giá'],
      ['出し直す', 'だしなおす', 'gửi lại (bản đã sửa)'],
      ['税抜き', 'ぜいぬき', 'chưa gồm thuế'],
    ],
  }),
  item('w10', 'shiryo', 2, {
    material: {
      kind: 'table',
      title: '運送会社の比較',
      head: ['会社', '料金（1回）', '到着日数', '遅延率'],
      rows: [
        ['A運輸', '12万円', '2日', '5%'],
        ['B急便', '15万円', '1日', '1%'],
        ['C物流', '10万円', '3日', '8%'],
        ['D運送', '13万円', '2日', '2%'],
      ],
    },
    script: [['女', '料金だけで決めるのはやめましょう。遅延率が三パーセント以下の会社の中から、一番安いところを選んでください。到着は二日以内なら問題ありません。', 'Đừng chỉ dựa vào giá. Hãy chọn công ty rẻ nhất trong số những công ty có tỉ lệ giao chậm từ ba phần trăm trở xuống. Thời gian đến trong vòng hai ngày là không vấn đề.']],
    questions: [
      [
        'どの会社を選びますか。',
        ['A運輸', 'D運送', 'C物流', 'B急便'],
        1,
        'Tỉ lệ chậm ≤ 3%: B (1%) và D (2%). Cả hai đến trong hai ngày. Rẻ hơn là D (13 vạn yên). C rẻ nhất nhưng chậm 8%. B nhanh và chắc nhất nhưng đắt hơn.',
      ],
    ],
    points: [
      ['遅延率', 'ちえんりつ', 'tỉ lệ giao chậm'],
      ['運送', 'うんそう', 'vận chuyển'],
    ],
  }),
  item('w10', 'shiryo', 3, {
    material: {
      kind: 'text',
      title: '保守契約の更新について',
      body: '保守契約の更新について\n\n現在の契約期間：2025年4月1日〜2026年3月31日\n\n※契約満了日の1か月前までに、書面による解約のお申し出がない場合は、同一条件にて1年間自動更新となります。',
    },
    script: [['男', '来年度はこの契約をやめて、別の会社に切り替える予定です。自動で更新されないように、期限に間に合うよう手続きをお願いします。', 'Năm tài chính tới chúng ta sẽ chấm dứt hợp đồng này và chuyển sang công ty khác. Nhờ làm thủ tục kịp hạn để hợp đồng không tự động gia hạn.']],
    questions: [
      [
        '解約の申し出は、いつまでに必要ですか。',
        ['2026年2月28日', '2026年3月31日', '2025年4月1日', '2026年4月30日'],
        0,
        'Ngày hết hạn là 31/3/2026; phải gửi văn bản xin chấm dứt trước đó một tháng, tức trước khoảng 28/2/2026. 31/3 là ngày hết hạn: đợi đến lúc đó thì hợp đồng đã tự gia hạn.',
      ],
    ],
    points: [
      ['自動更新', 'じどうこうしん', 'tự động gia hạn'],
      ['契約満了日', 'けいやくまんりょうび', 'ngày hết hạn hợp đồng'],
      ['書面', 'しょめん', 'văn bản'],
    ],
  }),
  item('w10', 'sogo-chodokkai', 1, {
    material: {
      kind: 'table',
      title: '中央食品 第二工場 構内図（上が北）',
      head: [],
      rows: [
        ['【1】正門', '', '駐車場', '', '【2】'],
        ['', '', '', '', ''],
        ['受付', '', '本館', '', '倉庫'],
        ['', '', '', '', ''],
        ['【3】', '', '製造棟', '', '【4】通用口'],
      ],
      note: '※空白は構内の通路。',
    },
    script: [
      ['男', 'お世話になっております。はやて運輸の者ですが、今、第二工場の近くまで来ておりまして。資材の搬入は、どちらから入ればよろしいでしょうか。', 'Xin chào. Tôi bên vận tải Hayate, hiện đang ở gần nhà máy số hai. Hàng vật tư thì tôi nên vào từ cổng nào ạ?'],
      ['女', 'ありがとうございます。普段でしたら正門からお願いしているんですが……あ、今日は四トン車でいらしてますよね。', 'Cảm ơn anh. Bình thường thì chúng tôi nhờ vào từ cổng chính… À, hôm nay anh đi xe bốn tấn phải không ạ.'],
      ['男', 'はい、四トンです。', 'Vâng, xe bốn tấn.'],
      ['女', 'でしたら、正門は高さの制限があって入れないんです。製造棟の横の通用口なら大きな車も通れるんですが、あいにく今週は門の工事中でして。', 'Vậy thì cổng chính có giới hạn chiều cao nên không vào được. Cổng phụ cạnh xưởng sản xuất thì xe lớn qua được, nhưng tiếc là tuần này cổng đó đang sửa.'],
      ['男', 'そうしますと、南側の門ですか。', 'Vậy là cổng phía nam ạ?'],
      ['女', 'そちらからも入れるんですが、倉庫までがかなり遠くて、構内を一周することになってしまうんです。今日の資材は倉庫に直接下ろしていただきたいので、倉庫の北側の門からお願いできますか。駐車場と同じ並びの、一番東の門です。', 'Từ đó cũng vào được, nhưng tới kho thì khá xa, phải đi vòng cả khuôn viên. Vật tư hôm nay chúng tôi muốn dỡ thẳng vào kho, nên anh vào từ cổng phía bắc kho được không ạ? Là cổng ngoài cùng phía đông, cùng hàng với bãi đỗ xe.'],
      ['男', '駐車場の並びの一番東、ですね。門のところで、何か手続きはありますか。', 'Cổng ngoài cùng phía đông cùng hàng với bãi đỗ xe, phải không ạ. Ở cổng có thủ tục gì không ạ?'],
      ['女', '守衛さんに、はやて運輸さんだとおっしゃっていただければ、すぐ開けるよう伝えておきます。倉庫の者も外で待っておりますので。', 'Anh chỉ cần nói với bảo vệ là bên vận tải Hayate, tôi sẽ dặn họ mở ngay. Người bên kho cũng sẽ đợi sẵn ở ngoài.'],
      ['男', '承知しました。では、十分ほどで到着します。', 'Tôi hiểu rồi. Khoảng mười phút nữa tôi tới.'],
    ],
    questions: [
      [
        'トラックはどの門から入りますか。',
        ['【1】', '【2】', '【3】', '【4】'],
        1,
        'Cổng chính có giới hạn chiều cao, cổng phụ đang sửa, cổng phía nam thì xa kho → vào cổng phía bắc kho, ngoài cùng phía đông cùng hàng với bãi đỗ xe = 【2】, lựa chọn 2. Lựa chọn 1 là cổng thường dùng nhưng xe bốn tấn không qua được; lựa chọn 3 vào được nhưng bị bác vì phải đi vòng.',
      ],
    ],
    points: [
      ['搬入', 'はんにゅう', 'đưa hàng vào'],
      ['あいにく', 'あいにく', 'tiếc là, không may'],
      ['守衛', 'しゅえい', 'bảo vệ'],
    ],
  }),
  item('w10', 'sogo-chodokkai', 2, {
    material: {
      kind: 'table',
      title: '新オフィス家具 納品予定',
      head: ['日付', '納品内容'],
      rows: [
        ['2026年12月7日（月）', '【1】事務机 20台'],
        ['2026年12月8日（火）', '【2】椅子 40脚'],
        ['2026年12月9日（水）', '【3】書棚 6台'],
        ['2026年12月10日（木）', '【4】会議用テーブル 4台'],
      ],
    },
    script: [
      ['男', 'いつもお世話になっております。ひまわり家具の川村です。来週の納品の件で、ご相談がありまして。', 'Xin chào, tôi là Kawamura bên nội thất Himawari. Tôi có việc muốn trao đổi về đợt giao hàng tuần sau.'],
      ['女', 'はい、何かございましたか。', 'Vâng, có chuyện gì vậy ạ?'],
      ['男', '実は、椅子のメーカーで部品が足りなくなりまして、火曜日のお届けが難しくなってしまったんです。誠に申し訳ございません。', 'Thật ra hãng sản xuất ghế bị thiếu linh kiện, nên giao vào thứ Ba trở nên khó. Thành thật xin lỗi chị.'],
      ['女', 'そうですか……。いつでしたら大丈夫そうですか。', 'Vậy à… Khi nào thì có thể được ạ?'],
      ['男', '水曜日には入る見込みですので、書棚と一緒にお届けできればと思うんですが。', 'Dự kiến thứ Tư hàng về, nên tôi mong có thể giao cùng với giá sách.'],
      ['女', 'うーん、水曜日は、ビルのエレベーターを午前中しか使えないんです。書棚の搬入だけで、午前中いっぱいかかると伺っていますので。', 'Ừm, thứ Tư thì thang máy toà nhà chỉ dùng được buổi sáng. Tôi nghe nói chỉ chuyển giá sách lên thôi cũng mất trọn buổi sáng.'],
      ['男', 'ああ、そうでした。では、木曜日の会議用テーブルと一緒ではいかがでしょう。テーブルは四台ですので、時間には余裕があります。', 'À, đúng rồi. Vậy cùng với bàn họp hôm thứ Năm thì sao ạ? Bàn họp chỉ có bốn cái nên thời gian còn dư.'],
      ['女', '木曜日でしたら大丈夫です。新しいオフィスでの業務開始は翌週の月曜日ですから、それまでにそろえば問題ありません。', 'Thứ Năm thì được ạ. Văn phòng mới bắt đầu làm việc từ thứ Hai tuần sau đó, nên đủ đồ trước lúc đó là không vấn đề gì.'],
      ['男', 'ありがとうございます。では、そのように手配いたします。机のほうは予定どおり月曜日にお届けします。', 'Cảm ơn chị. Vậy tôi sẽ sắp xếp như thế. Bàn làm việc thì vẫn giao vào thứ Hai như dự kiến.'],
    ],
    questions: [
      [
        '椅子は、表のどの日に届くことになりましたか。',
        ['【1】の日', '【2】の日', '【3】の日', '【4】の日'],
        3,
        'Ghế không giao được thứ Ba; thứ Tư thang máy chỉ dùng buổi sáng và đã kín vì giá sách; chốt giao cùng bàn họp hôm thứ Năm → ngày của 【4】, lựa chọn 4. Lựa chọn 3 (thứ Tư) là đề xuất đầu của bên bán nhưng bị từ chối; lựa chọn 2 là lịch cũ.',
      ],
    ],
    points: [
      ['見込み', 'みこみ', 'dự kiến, khả năng'],
      ['余裕', 'よゆう', 'dư dả (thời gian)'],
      ['手配', 'てはい', 'sắp xếp, bố trí'],
    ],
  }),
  item('w10', 'sogo-chodokkai', 3, {
    material: {
      kind: 'text',
      title: '業務委託契約書（案）抜粋',
      body: '【1】第3条（委託料）委託料は月額30万円（税別）とする。\n【2】第5条（再委託）乙は、甲の書面による承諾なく、本業務を第三者に再委託してはならない。\n【3】第8条（有効期間）本契約の有効期間は、2027年1月1日から1年間とする。\n【4】第10条（解除）甲または乙は、3か月前までに書面で通知することにより、本契約を解除することができる。',
    },
    script: [
      ['男', '法務の三浦さん、すみません。ライト企画さんとの契約書の案なんですが、送る前に一度見ていただけますか。', 'Miura bên pháp chế, xin lỗi. Đây là bản dự thảo hợp đồng với Light Kikaku, trước khi gửi nhờ xem giúp một lần được không ạ?'],
      ['女', 'はい。……委託料は、先方と合意済みの金額ですね。', 'Vâng… Phí uỷ thác là con số đã thống nhất với bên kia rồi nhỉ.'],
      ['男', 'はい、三十万円で決まっています。', 'Vâng, đã chốt ba mươi vạn yên.'],
      ['女', '再委託のところですが、ライト企画さんは、デザインの一部を外のデザイナーに出していると聞いていますよ。このままだと、毎回うちの書面での承諾が必要になって、作業が止まってしまうかもしれません。', 'Chỗ giao lại cho bên thứ ba: tôi nghe nói Light Kikaku thuê nhà thiết kế bên ngoài làm một phần thiết kế. Để thế này thì lần nào cũng cần văn bản đồng ý của bên mình, có khi công việc bị đình lại.'],
      ['男', 'ああ、そうでした。デザインについては、あらかじめ認める形に直します。', 'À, đúng vậy. Phần thiết kế tôi sẽ sửa thành cho phép trước.'],
      ['女', 'それから期間ですが、作業が始まるのは二月からだと伺いましたけど。', 'Còn thời hạn: tôi nghe nói công việc bắt đầu từ tháng Hai cơ mà.'],
      ['男', 'はい、先週の打ち合わせで一か月ずれました。ここも直さないといけませんね。', 'Vâng, trong buổi họp tuần trước đã lùi một tháng. Chỗ này cũng phải sửa.'],
      ['女', '解除のほうは、どうしますか。', 'Còn phần chấm dứt hợp đồng thì sao?'],
      ['男', '三か月前というのは、少し長い気がするんですが、一か月にしたほうがいいでしょうか。', 'Ba tháng trước thì tôi thấy hơi dài, có nên đổi thành một tháng không ạ?'],
      ['女', 'いえ、この種の契約では三か月が一般的ですし、先方も特に何もおっしゃっていないので、ここはこのままにしておきましょう。', 'Không, loại hợp đồng này ba tháng là phổ biến, bên kia cũng không nói gì, nên chỗ này cứ để nguyên.'],
      ['男', 'わかりました。では、その二か所を直して、明日もう一度お持ちします。', 'Tôi hiểu rồi. Vậy tôi sửa hai chỗ đó, mai mang lại lần nữa.'],
    ],
    questions: [
      [
        '修正することになったのはどれですか。',
        ['【1】と【3】', '【3】と【4】', '【2】と【3】', '【1】と【4】'],
        2,
        '【2】 phải sửa vì bên kia có thuê thiết kế bên ngoài; 【3】 phải sửa vì công việc lùi sang tháng Hai → lựa chọn 3. Lựa chọn 2 có 【4】: người đàn ông muốn rút còn một tháng, nhưng bị pháp chế bác, giữ nguyên ba tháng. 【1】 là số tiền đã thống nhất.',
      ],
    ],
    points: [
      ['再委託', 'さいいたく', 'giao lại cho bên thứ ba'],
      ['承諾', 'しょうだく', 'đồng ý, chấp thuận'],
      ['解除', 'かいじょ', 'chấm dứt (hợp đồng)'],
    ],
  }),
  item('w10', 'sogo-chodokkai', 4, {
    material: {
      kind: 'text',
      title: '大口注文 対応状況（ミドリ化学様）',
      body: 'ご注文：工業用洗浄剤 500ケース\n希望納期：2026年12月18日（金）\n\n【1】見積書の提出\n【2】注文書の受領\n【3】在庫の確保\n【4】配送業者の手配',
    },
    script: [
      ['女', 'では、ミドリ化学さんの大口注文について、状況を共有します。', 'Bây giờ tôi xin chia sẻ tình hình đơn hàng lớn của Midori Kagaku.'],
      ['女', '見積書は先週お送りしまして、昨日、正式に注文書をいただきました。五百ケースと、うちとしては今年一番の大きな注文です。単価は一ケース四千二百円でご提示して、そのままご了承いただいています。', 'Bảng báo giá đã gửi tuần trước, và hôm qua chúng ta đã nhận được đơn đặt hàng chính thức. Năm trăm thùng, là đơn lớn nhất năm nay của bên mình. Đơn giá chúng ta đưa ra là bốn nghìn hai trăm yên một thùng, và khách đã chấp nhận nguyên như vậy.'],
      ['女', '在庫については、倉庫の山田さんに先週のうちに押さえてもらうようお願いしていたんですが、今朝確認したところ、ほかの注文と重なって、二百五十ケースしか確保できていませんでした。残りは、来週の入荷分から回してもらうよう、今、仕入れ先と調整しているところです。', 'Về hàng tồn kho, tôi đã nhờ Yamada bên kho giữ hàng từ tuần trước, nhưng sáng nay kiểm tra thì do trùng với đơn khác, mới giữ được hai trăm năm mươi thùng. Phần còn lại tôi đang làm việc với nhà cung cấp để lấy từ đợt nhập hàng tuần sau.'],
      ['女', '配送は、トラックが二台必要になりますので、昨日の夕方、運送会社に予約を入れておきました。十八日の朝に、倉庫で積み込む予定です。量が多いので、営業からも二名ほど応援を出していただけると助かります。', 'Về giao hàng, cần hai xe tải nên chiều qua tôi đã đặt với công ty vận chuyển. Dự kiến sáng ngày mười tám sẽ chất hàng ở kho. Hàng nhiều, nên nếu bộ phận kinh doanh cử thêm khoảng hai người hỗ trợ thì tốt quá.'],
      ['女', '納期に間に合うかどうかは、仕入れ先の返事しだいですので、わかりしだい、またお知らせします。先方のご担当は購買課の小島様です。お電話があったら、私に回してください。何か質問はありますか。', 'Có kịp hạn giao hay không tuỳ vào câu trả lời của nhà cung cấp, nên có tin tôi sẽ báo lại. Người phụ trách bên khách là Kojima-sama ở phòng mua hàng. Nếu có điện thoại thì chuyển cho tôi. Mọi người có câu hỏi gì không?'],
    ],
    questions: [
      [
        'まだ完了していないのはどれですか。',
        ['【1】', '【2】', '【3】', '【4】'],
        2,
        'Mới giữ được 250 trên 500 thùng, phần còn lại đang thương lượng với nhà cung cấp → việc giữ hàng tồn kho chưa xong, 【3】, lựa chọn 3. Lựa chọn 4 dễ nhầm vì hàng chưa được chở đi, nhưng việc đặt xe đã làm xong chiều qua. Báo giá và nhận đơn (lựa chọn 1, 2) đều đã xong.',
      ],
    ],
    points: [
      ['押さえる', 'おさえる', 'giữ chỗ, giữ hàng'],
      ['確保', 'かくほ', 'đảm bảo có, giữ được'],
      ['入荷', 'にゅうか', 'hàng nhập về'],
    ],
  }),
];

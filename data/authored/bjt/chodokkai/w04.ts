import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/** Week 4 — internal meetings and 報連相 (report, inform, consult). Level: J2 → J1. */
export const W04: BjtItem[] = [
  item('w04', 'jokyo', 1, {
    material: {
      kind: 'scene',
      vi: 'Phòng họp sau khi buổi họp kết thúc. Trên bảng trắng còn vài dòng chữ viết vội, mấy chiếc ghế chưa xếp lại; hai nhân viên đứng cạnh bảng, một người cầm sổ tay và máy tính bảng.',
    },
    script: [
      ['男', '昨日の定例の分、まだ回ってきていないんですけど、どうなっていますか。', 'Phần của buổi họp định kỳ hôm qua vẫn chưa thấy chuyển đến tôi, giờ thế nào rồi?'],
      ['女', 'すみません、今まとめているところで、課長に一度見ていただいてからお送りしようと思っていたんです。', 'Xin lỗi, tôi đang tổng hợp, định nhờ trưởng phòng xem qua một lần rồi mới gửi.'],
      ['男', 'そうですか。ただ、決まったことのうち、来週までにやることだけでも、先に教えてもらえると助かります。昨日は出られなかった人もいるので。', 'Vậy à. Có điều, trong những việc đã quyết, chỉ cần báo trước những việc phải làm trước tuần sau thôi cũng giúp được nhiều. Hôm qua cũng có người không dự được.'],
      ['女', 'わかりました。じゃあ、決まったことと担当者だけ、先に箇条書きにして、出席者以外の方にもお送りしますね。', 'Tôi hiểu rồi. Vậy tôi sẽ gạch đầu dòng trước những việc đã quyết và người phụ trách, gửi cho cả những người không dự.'],
    ],
    questions: [
      [
        '二人は何について話していますか。',
        ['昨日の会議の議題について', '昨日の会議の出席者について', '昨日の会議の開始時間について', '昨日の会議の議事録について'],
        3,
        'Thứ "chưa chuyển đến", đang được tổng hợp, chờ trưởng phòng xem rồi gửi, ghi việc đã quyết và người phụ trách: đó là biên bản họp (議事録), dù chữ này không xuất hiện. Lựa chọn 2 là bẫy vì có chữ 出席者 trong băng, nhưng chỉ là nói gửi cho cả người không dự.',
      ],
    ],
    points: [
      ['定例', 'ていれい', '(họp) định kỳ'],
      ['回ってくる', 'まわってくる', 'được chuyển đến (tài liệu)'],
      ['箇条書き', 'かじょうがき', 'gạch đầu dòng'],
    ],
  }),
  item('w04', 'jokyo', 2, {
    material: {
      kind: 'scene',
      vi: 'Một nhân viên đứng trước bàn của trưởng phòng, hơi cúi người, tay cầm tờ giấy in lịch trong tuần; trưởng phòng đang nhìn tấm lịch treo trên tường cạnh bàn.',
    },
    script: [
      ['女', '課長、今よろしいでしょうか。大和精機さんから、先ほどご連絡がありまして。', 'Trưởng phòng, bây giờ anh có rảnh không ạ? Bên Yamato Seiki vừa liên lạc.'],
      ['男', 'うん、どうしたの。', 'Ừ, có chuyện gì?'],
      ['女', '先方の工場で機械が一台止まってしまったそうで、来週の月曜にお約束していた部品が、水曜の午後になるとのことです。', 'Họ nói ở nhà máy bên đó có một máy bị dừng, nên linh kiện đã hẹn giao thứ hai tuần sau sẽ thành chiều thứ tư.'],
      ['男', '水曜か…。うちの組み立ては火曜から始める予定だったよね。', 'Thứ tư à… Bên mình định bắt đầu lắp ráp từ thứ ba mà nhỉ.'],
      ['女', 'はい。それで、半分だけでも月曜にお届けできないか、先方で今、調整してくださっているそうです。結果がわかり次第、またご報告します。', 'Vâng. Vì thế bên họ đang thu xếp xem có thể giao trước một nửa vào thứ hai không. Có kết quả em sẽ báo lại ngay.'],
    ],
    questions: [
      [
        '二人は何について話していますか。',
        ['大和精機の工場見学の件', '大和精機の納期の件', '大和精機の機械の修理の件', '大和精機の請求の件'],
        1,
        'Linh kiện hẹn thứ hai lùi sang chiều thứ tư, bên kia đang thu xếp giao trước một nửa: đó là chuyện hạn giao hàng (納期), dù chữ này không xuất hiện. Lựa chọn 3 là bẫy vì có chữ 機械, nhưng máy hỏng chỉ là nguyên nhân ở nhà máy bên kia; hai người không bàn chuyện sửa máy.',
      ],
    ],
    points: [
      ['納期', 'のうき', 'hạn giao hàng'],
      ['調整する', 'ちょうせいする', 'điều chỉnh, thu xếp'],
      ['わかり次第', 'わかりしだい', 'ngay khi biết'],
    ],
  }),
  item('w04', 'shiryo', 1, {
    material: {
      kind: 'bars',
      title: '会議1回あたりの平均時間',
      unit: '分',
      labels: ['定例会議', '企画会議', '朝礼', '報告会'],
      series: [
        { name: '昨年', values: [60, 90, 15, 45] },
        { name: '今年', values: [50, 100, 15, 30] },
      ],
    },
    script: [
      ['女', '会議の進め方を見直した結果、全体としては時間が短くなりました。', 'Sau khi xem lại cách tổ chức họp, nhìn chung thời gian họp đã ngắn đi.'],
      ['女', 'ただ、一つだけ、逆に長くなった会議があります。この会議は、来月から参加者を半分に減らします。', 'Nhưng có một cuộc họp lại dài ra. Cuộc họp này từ tháng sau sẽ giảm số người dự xuống một nửa.'],
    ],
    questions: [
      [
        '来月から参加者を減らすのはどの会議ですか。',
        ['定例会議', '朝礼', '企画会議', '報告会'],
        2,
        'Chỉ họp kế hoạch dài ra (90 → 100 phút). Họp định kỳ và họp báo cáo đều ngắn đi, họp đầu giờ giữ nguyên 15 phút. Họp báo cáo giảm nhiều nhất, là bẫy cho ai chỉ nhìn mức thay đổi.',
      ],
    ],
    points: [
      ['朝礼', 'ちょうれい', 'buổi họp đầu giờ sáng'],
      ['見直す', 'みなおす', 'xem xét lại'],
      ['逆に', 'ぎゃくに', 'ngược lại'],
    ],
  }),
  item('w04', 'shiryo', 2, {
    material: {
      kind: 'table',
      title: 'プロジェクト進捗表（6月12日時点）',
      head: ['作業', '担当', '予定', '状況'],
      rows: [
        ['要件定義', '佐々木', '6/5', '完了'],
        ['設計', '大野', '6/19', '遅れ（3日）'],
        ['テスト計画', '井上', '6/26', '予定どおり'],
        ['マニュアル作成', '佐々木', '7/3', '未着手'],
      ],
    },
    script: [
      ['男', '進捗表では設計が三日遅れになっていますが、大野さんから、昨日の時点で遅れは取り戻したと報告がありました。', 'Trên bảng tiến độ, thiết kế đang chậm ba ngày, nhưng anh Ono báo là tính đến hôm qua đã bắt kịp.'],
      ['男', '一方で、テスト計画の井上さんが急に入院されたので、テスト計画は佐々木さんに担当してもらうことになりました。', 'Mặt khác, chị Inoue phụ trách kế hoạch kiểm thử đột ngột phải nhập viện, nên phần đó chuyển cho anh Sasaki.'],
    ],
    questions: [
      [
        '佐々木さんが担当する作業は、全部でいくつになりましたか。',
        ['1つ', '3つ', '2つ', '4つ'],
        1,
        'Trên bảng anh Sasaki có định nghĩa yêu cầu và viết hướng dẫn; nay nhận thêm kế hoạch kiểm thử, thành ba việc. Phần thiết kế vẫn là của anh Ono, chỉ có tình trạng thay đổi.',
      ],
    ],
    points: [
      ['進捗', 'しんちょく', 'tiến độ'],
      ['取り戻す', 'とりもどす', 'lấy lại, bắt kịp'],
      ['未着手', 'みちゃくしゅ', 'chưa bắt đầu'],
    ],
  }),
  item('w04', 'shiryo', 3, {
    material: {
      kind: 'table',
      title: '会議室の予約状況（木曜日）',
      head: ['時間', '第1', '第2', '第3'],
      rows: [
        ['10:00〜11:00', '空き', '予約済', '空き'],
        ['11:00〜12:00', '予約済', '予約済', '空き'],
        ['13:00〜14:00', '空き', '空き', '予約済'],
        ['14:00〜15:00', '予約済', '空き', '空き'],
      ],
    },
    script: [
      ['男', '木曜日に二時間の打ち合わせをしたいんだけど、同じ部屋で続けて使えるところを予約してくれる？', 'Thứ năm tôi muốn họp hai tiếng, em đặt giúp phòng nào dùng liền được trong cùng một phòng nhé?'],
      ['男', 'あ、午前中は来客があるから、午後でお願い。', 'À, buổi sáng tôi có khách, nên đặt buổi chiều nhé.'],
    ],
    questions: [
      [
        'どこを予約しますか。',
        ['第1会議室 13:00〜15:00', '第3会議室 10:00〜12:00', '第3会議室 13:00〜15:00', '第2会議室 13:00〜15:00'],
        3,
        'Buổi chiều, hai tiếng liền, cùng phòng: phòng 1 trống 13 giờ nhưng 14 giờ đã có người đặt; phòng 3 bị đặt lúc 13 giờ; chỉ phòng 2 trống cả hai khung giờ. Phòng 3 buổi sáng trống liền hai tiếng nhưng sáng thì có khách.',
      ],
    ],
    points: [
      ['予約済', 'よやくずみ', 'đã đặt'],
      ['空き', 'あき', 'còn trống'],
    ],
  }),
  item('w04', 'sogo-chodokkai', 1, {
    material: {
      kind: 'text',
      title: '営業部 定例会議 次第（2026年12月7日・月　10:00〜11:00）',
      body: '【1】10:00〜10:15　先月の売上報告（山田）\n【2】10:15〜10:30　年末商戦の販促計画（佐々木）\n【3】10:30〜10:45　新人研修の報告（小林）\n【4】10:45〜11:00　その他',
    },
    script: [
      ['女', '課長、明日の定例会議なんですが、順番を入れ替えたほうがよさそうなんです。', 'Trưởng phòng, về họp định kỳ ngày mai, có lẽ nên đổi thứ tự ạ.'],
      ['男', 'どうして？', 'Sao vậy?'],
      ['女', '部長が、前の会議が長引きそうで、十時十五分ごろからのご参加になるそうなんです。販促計画は部長に決めていただかないといけないので、二番目のままでも大丈夫だとは思うんですが…。', 'Trưởng bộ phận nói cuộc họp trước có thể kéo dài, nên sẽ tham gia từ khoảng mười giờ mười lăm. Kế hoạch khuyến mãi cần trưởng bộ phận quyết, nên em nghĩ để thứ hai như cũ cũng được…'],
      ['男', 'うん、それなら今のままでいいんじゃない？', 'Ừ, thế thì cứ để như hiện tại là được chứ?'],
      ['女', 'それが、新人研修の報告をする小林さんが、十時半には研修会場に向かわなければならなくて。', 'Chuyện là Kobayashi, người báo cáo về đào tạo nhân viên mới, phải đi đến hội trường đào tạo trước mười giờ rưỡi.'],
      ['男', 'ああ、そうか。じゃあ、小林さんの報告をいちばん最初にして、販促計画はその次。売上報告は、数字を部長にも見ていただきたいから、部長がいらしてからのほうがいいよね。', 'À, ra vậy. Thế thì cho báo cáo của Kobayashi lên đầu tiên, kế hoạch khuyến mãi tiếp theo. Báo cáo doanh số thì anh cũng muốn trưởng bộ phận xem số liệu, nên để sau khi trưởng bộ phận đến thì hơn.'],
      ['女', 'はい。そうすると、その他は最後のままですね。山田さんには、私から時間が変わったことを伝えておきます。', 'Vâng. Vậy thì mục "khác" vẫn ở cuối. Em sẽ báo cho Yamada là giờ đã thay đổi.'],
      ['男', '頼むね。それから、小林さんには、報告は十分くらいにまとめてもらって。質問の時間も少し取りたいから。', 'Nhờ em nhé. Còn nữa, bảo Kobayashi gói phần báo cáo trong khoảng mười phút. Anh muốn dành chút thời gian cho câu hỏi.'],
      ['女', 'はい、伝えておきます。資料は、明日の朝までに人数分印刷して、会議室に置いておきますね。', 'Vâng, em sẽ nhắn. Tài liệu thì trước sáng mai em in đủ số người rồi để sẵn ở phòng họp ạ.'],
      ['男', 'うん。部長の分は、売上の数字のところに印をつけておいてくれる？', 'Ừ. Bản của trưởng bộ phận thì em đánh dấu sẵn vào phần số liệu doanh số giúp anh nhé?'],
    ],
    questions: [
      [
        '先月の売上報告は、どの時間に行うことになりましたか。',
        ['【1】', '【2】', '【3】', '【4】'],
        2,
        'Kobayashi phải đi trước 10:30 nên báo cáo đào tạo lên 【1】, kế hoạch khuyến mãi giữ 【2】, mục "khác" vẫn ở cuối; báo cáo doanh số chuyển vào khung còn lại 【3】, sau khi trưởng bộ phận đã đến. 【1】 là giờ cũ của báo cáo doanh số; 【4】 vẫn là mục "khác".',
      ],
    ],
    points: [
      ['次第', 'しだい', 'chương trình (cuộc họp)'],
      ['販促', 'はんそく', 'xúc tiến bán hàng, khuyến mãi'],
      ['長引く', 'ながびく', 'kéo dài'],
    ],
  }),
  item('w04', 'sogo-chodokkai', 2, {
    material: {
      kind: 'table',
      title: '新商品発表会 準備の分担（案）',
      head: ['', '作業', '担当'],
      rows: [
        ['【1】', '会場の下見', '未定'],
        ['【2】', '招待客リストのとりまとめ', '未定'],
        ['【3】', '配布資料の作成', '未定'],
        ['【4】', '当日の司会', '未定'],
      ],
    },
    script: [
      ['男', '来月の発表会の準備、そろそろ分担を決めようか。高橋さん、当日の司会をお願いできるかな。', 'Chuẩn bị buổi ra mắt tháng sau, mình chia việc thôi nhỉ. Takahashi, em làm dẫn chương trình hôm đó được không?'],
      ['女', 'あのう、大変ありがたいお話なんですが、当日は受付の責任者も兼ねることになっておりまして…。', 'Dạ, em rất cảm ơn, nhưng hôm đó em kiêm cả phụ trách quầy lễ tân rồi ạ…'],
      ['男', 'ああ、そうだった。じゃあ、司会は山本さんに頼もう。会場の下見はどう？', 'À, đúng rồi. Thế thì nhờ Yamamoto dẫn chương trình. Còn đi xem trước hội trường thì sao?'],
      ['女', 'はい、それは私が参ります。来週、ちょうど会場の近くで打ち合わせがありますので。', 'Vâng, việc đó để em đi. Tuần sau em vừa hay có cuộc họp gần hội trường.'],
      ['男', '助かるよ。招待客のリストは、営業の各担当に出してもらうとして…配布資料は？', 'Thế thì tốt quá. Danh sách khách mời thì nhờ từng người phụ trách bên kinh doanh nộp… Còn tài liệu phát tay?'],
      ['女', '資料は、去年も私が作りましたので、今年も私がやります。去年のものを直せば、早くできると思います。', 'Tài liệu thì năm ngoái cũng do em làm, năm nay em làm tiếp. Sửa từ bản năm ngoái thì sẽ nhanh thôi ạ.'],
      ['男', 'じゃあ、リストのとりまとめは？', 'Thế còn tổng hợp danh sách?'],
      ['女', 'それも私が、と申し上げたいところなんですが、資料の作成と時期が重なりますので、少し厳しいかもしれません。', 'Em cũng muốn nói là để em làm, nhưng việc này trùng thời gian với làm tài liệu, nên có lẽ hơi khó ạ.'],
      ['男', 'わかった。リストは山本さんにまとめてもらうよ。司会と一緒なら、招待客の名前も覚えられるしね。', 'Được rồi. Danh sách để Yamamoto tổng hợp. Đi cùng với việc dẫn chương trình thì cũng nhớ được tên khách mời.'],
      ['女', 'ありがとうございます。下見のときは、マイクやプロジェクターの数も確認してまいります。', 'Cảm ơn anh. Lúc đi xem hội trường, em sẽ kiểm tra cả số micro và máy chiếu.'],
      ['男', '頼むよ。去年は、マイクが一本足りなくて慌てたからね。', 'Nhờ em. Năm ngoái thiếu một cái micro, cuống hết cả lên.'],
    ],
    questions: [
      [
        '女の人が担当することになったのはどれですか。',
        ['【1】と【3】', '【1】と【4】', '【2】と【3】', '【2】と【4】'],
        0,
        'Người nữ nhận đi xem hội trường (【1】) và làm tài liệu (【3】). Dẫn chương trình (【4】) chị từ chối khéo vì kiêm lễ tân, còn tổng hợp danh sách (【2】) chị nói "hơi khó" vì trùng thời gian; cả hai giao cho Yamamoto. Lựa chọn 3 chỉ đúng một nửa.',
      ],
    ],
    points: [
      ['下見', 'したみ', 'đi xem trước (địa điểm)'],
      ['兼ねる', 'かねる', 'kiêm'],
      ['とりまとめ', 'とりまとめ', 'tổng hợp, gom lại'],
    ],
  }),
  item('w04', 'sogo-chodokkai', 3, {
    material: {
      kind: 'text',
      title: '品質改善会議 議事録（2026年11月12日・木）',
      body: '決定事項\n【1】完成品の抜き取り検査を、1日2回から3回に増やす（12月1日から）\n【2】不良品の写真を、共有フォルダの所定の場所に保存する\n【3】協力工場への説明は、購買部が中心となって行う\n【4】次回会議：11月26日（木）15:00〜\n記録：中川',
    },
    script: [
      ['男', '中川さん、昨日の議事録、ありがとう。一つ確認したいんだけど、検査の回数、三回だったっけ。', 'Nakagawa, cảm ơn em về biên bản hôm qua. Anh muốn xác nhận một điều: số lần kiểm tra là ba lần phải không?'],
      ['女', 'はい。最初は四回という案も出ましたが、検査の担当者が足りないということで、三回になりました。', 'Vâng. Ban đầu có ý kiến bốn lần, nhưng vì thiếu người kiểm tra nên chốt ba lần ạ.'],
      ['男', 'そうだったね。写真の保存場所も、これでいい。協力工場への説明は、品質管理部も一緒に行くんだったよね。', 'Đúng rồi. Chỗ lưu ảnh cũng thế này là được. Việc giải thích cho các nhà máy hợp tác thì bộ phận quản lý chất lượng cũng đi cùng nhỉ.'],
      ['女', 'はい、ただ、説明をするのはあくまでも購買部で、品質管理部は質問があったときに答える、ということでしたので、このように書きました。', 'Vâng, nhưng người giải thích chính vẫn là bộ phận mua hàng, quản lý chất lượng chỉ trả lời khi có câu hỏi, nên em ghi như vậy ạ.'],
      ['男', 'なるほど、それならいいね。あとは次回の日程だけど、二十六日は工場の監査が入るから、一週間後ろにずらそうって、最後に決めなかった？', 'Ra vậy, thế thì được. Còn lịch lần sau: ngày hai mươi sáu có đợt kiểm toán nhà máy, nên cuối buổi chẳng phải đã quyết lùi một tuần sao?'],
      ['女', 'あ、そうでした。会議が終わる直前だったので、書き漏らしてしまいました。申し訳ありません。', 'À, đúng rồi ạ. Vì sát lúc kết thúc nên em ghi sót mất. Em xin lỗi.'],
      ['男', 'うん、直して、出席者全員にもう一度送っておいて。時間は同じ三時からでいいから。', 'Ừ, sửa lại rồi gửi lại cho tất cả người dự nhé. Giờ thì vẫn ba giờ như cũ.'],
      ['女', 'はい。一週間後ろですと、十二月三日の木曜日ですね。会議室も取り直しておきます。', 'Vâng. Lùi một tuần thì là thứ năm ngày ba tháng mười hai nhỉ. Em sẽ đặt lại phòng họp.'],
      ['男', 'うん。それから、これからは議事録を出す前に、決定事項だけ、会議の最後に読み上げて確認しよう。', 'Ừ. Còn từ nay, trước khi gửi biên bản, cuối buổi họp mình đọc to các việc đã quyết để xác nhận nhé.'],
    ],
    questions: [
      [
        '議事録で直すところはどこですか。',
        ['【1】', '【2】', '【3】', '【4】'],
        3,
        'Cuối buổi đã quyết lùi cuộc họp lần sau một tuần vì ngày 26 có kiểm toán, nhưng biên bản vẫn ghi ngày 26: phải sửa 【4】 (giờ giữ nguyên). 【1】 là bẫy vì có nhắc đến phương án bốn lần, nhưng đã chốt ba lần như biên bản ghi. 【3】 đúng: bộ phận mua hàng là bên giải thích chính.',
      ],
    ],
    points: [
      ['抜き取り検査', 'ぬきとりけんさ', 'kiểm tra xác suất'],
      ['監査', 'かんさ', 'kiểm toán, thanh tra'],
      ['書き漏らす', 'かきもらす', 'ghi sót'],
    ],
  }),
  item('w04', 'sogo-chodokkai', 4, {
    material: {
      kind: 'table',
      title: '不具合を見つけたときの連絡の流れ（製造部）',
      head: [],
      rows: [
        ['発見した人', '→', '【1】班長', '→', '【2】製造課長'],
        ['', '', '', '', '↓'],
        ['', '', '【3】品質管理部', '←', '【4】工場長'],
      ],
    },
    script: [
      ['男', '製造部の皆さん、おはようございます。今日は、不具合を見つけたときの連絡の仕方について、確認しておきたいと思います。', 'Chào buổi sáng các anh chị bộ phận sản xuất. Hôm nay tôi muốn xác nhận lại cách liên lạc khi phát hiện lỗi.'],
      ['男', '掲示してある図のとおり、昼間は、まず班長に知らせてください。班長が状況を確かめて課長に上げ、課長から工場長、品質管理部へと伝える、という流れです。', 'Như sơ đồ đang dán, ban ngày hãy báo tổ trưởng trước. Tổ trưởng kiểm tra tình hình rồi báo lên trưởng phòng, trưởng phòng báo giám đốc nhà máy và bộ phận quản lý chất lượng — đó là quy trình.'],
      ['男', 'ただ、来月から夜勤の体制が変わって、夜は班長が一人で二つのラインを見ることになります。班長が手を離せないことも多いと思います。', 'Tuy nhiên, từ tháng sau, chế độ ca đêm thay đổi, ban đêm một tổ trưởng sẽ trông hai dây chuyền. Chắc sẽ có nhiều lúc tổ trưởng không rời tay được.'],
      ['男', 'そこで、夜勤の時間帯に限っては、班長を待たずに、見つけた人がまず課長の携帯に直接電話してください。課長には、夜間も連絡がつくようにしてもらっています。', 'Vì vậy, chỉ riêng trong ca đêm, người phát hiện đừng đợi tổ trưởng mà hãy gọi thẳng vào di động của trưởng phòng trước. Tôi đã nhờ trưởng phòng luôn sẵn sàng liên lạc cả ban đêm.'],
      ['男', '班長には、電話のあとで構いませんので、必ず伝えてください。工場長や品質管理部への報告は、これまでどおり課長のほうから行います。', 'Còn tổ trưởng thì sau cuộc gọi cũng được, nhưng nhất định phải báo. Việc báo cáo lên giám đốc nhà máy và quản lý chất lượng thì trưởng phòng làm như trước.'],
      ['男', 'また、連絡を受けた課長は、ラインを止めるかどうかを、その場で判断します。止めるように言われたら、班長がいなくても、すぐに止めてください。', 'Ngoài ra, trưởng phòng nhận tin sẽ quyết ngay tại chỗ có dừng dây chuyền hay không. Nếu được bảo dừng thì dù tổ trưởng không có mặt cũng dừng ngay.'],
      ['男', '報告が遅れるのが一番困ります。小さなことでも、迷ったら、とにかく連絡してください。以上です。', 'Điều phiền nhất là báo cáo chậm. Dù việc nhỏ, phân vân thì cứ liên lạc. Hết.'],
    ],
    questions: [
      [
        '来月から、夜勤中に不具合を見つけた人は、最初にだれに連絡しますか。',
        ['【1】', '【2】', '【3】', '【4】'],
        1,
        'Ca đêm thì không đợi tổ trưởng mà gọi thẳng di động của trưởng phòng sản xuất, tức 【2】. 【1】 là quy trình ban ngày theo sơ đồ; tổ trưởng chỉ được báo sau cuộc gọi. 【3】 và 【4】 do trưởng phòng báo lên, người phát hiện không liên lạc trực tiếp.',
      ],
    ],
    points: [
      ['不具合', 'ふぐあい', 'lỗi, trục trặc'],
      ['夜勤', 'やきん', 'ca đêm'],
      ['班長', 'はんちょう', 'tổ trưởng'],
      ['手を離せない', 'てをはなせない', 'không rời tay được, đang bận'],
    ],
  }),
];

import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/** Week 4 — internal meetings and 報連相 (report, inform, consult). Level: J2 → J1. */
export const W04: BjtItem[] = [
  item('w04', 'jokyo', 1, {
    material: {
      kind: 'table',
      title: '新システム導入計画（案）',
      head: ['案', '開始', '終了', '担当人数'],
      rows: [
        ['A', '7月1日', '8月31日', '3名'],
        ['B', '7月1日', '9月30日', '2名'],
        ['C', '7月15日', '9月15日', '3名'],
        ['D', '7月15日', '9月30日', '2名'],
      ],
    },
    script: [
      ['女', '新システムの導入計画、どの案にしましょうか。', 'Kế hoạch đưa hệ thống mới vào, mình chọn phương án nào ạ?'],
      ['男', 'うちの課からは、三人も出せないよ。二人で頼む。', 'Phòng mình không cử được tới ba người đâu. Nhờ làm với hai người.'],
      ['女', 'では、BかDですね。', 'Vậy là B hoặc D.'],
      ['男', '七月の前半は決算の準備で手が空かないから、開始は後ろにずらそう。', 'Nửa đầu tháng bảy bận chuẩn bị quyết toán, không rảnh tay, nên lùi ngày bắt đầu lại.'],
    ],
    questions: [
      [
        'どの案になりましたか。',
        ['A', 'B', 'C', 'D'],
        3,
        'Hai người → B hoặc D. Nửa đầu tháng bảy bận → bắt đầu 15/7. Chỉ D khớp cả hai. C bắt đầu đúng 15/7 nhưng cần ba người.',
      ],
    ],
    points: [
      ['導入', 'どうにゅう', 'đưa vào sử dụng'],
      ['決算', 'けっさん', 'quyết toán'],
      ['手が空かない', 'てがあかない', 'không rảnh tay'],
      ['ずらす', 'ずらす', 'lùi, dịch (lịch)'],
    ],
  }),
  item('w04', 'jokyo', 2, {
    material: {
      kind: 'table',
      title: '会議室の座席',
      head: ['', '左側', '右側'],
      rows: [
        ['奥（窓側）', '①', '②'],
        ['中央', '③', '④'],
        ['入口側', '⑤', '⑥'],
      ],
      note: 'ホワイトボードは右側の壁にあります。',
    },
    script: [
      ['男', '明日の会議、部長も出られるから、席を決めておいてくれる？', 'Cuộc họp ngày mai trưởng bộ phận cũng dự, em xếp chỗ trước giúp anh nhé?'],
      ['女', '部長は一番奥の窓側ですね。左と右、どちらにしましょう。', 'Trưởng bộ phận thì ở trong cùng phía cửa sổ. Bên trái hay bên phải ạ?'],
      ['男', 'ホワイトボードは右の壁だから、それが正面に見えるほうがいいね。', 'Bảng trắng ở tường bên phải, nên ngồi phía nhìn thẳng vào nó thì tốt hơn.'],
      ['女', 'わかりました。課長は部長の向かいで、私たちは入口側ですね。', 'Vâng. Trưởng phòng ngồi đối diện trưởng bộ phận, còn chúng ta ngồi phía cửa ra vào.'],
    ],
    questions: [
      [
        '部長の席はどれですか。',
        ['①', '②', '③', '⑤'],
        0,
        'Trong cùng phía cửa sổ là ① hoặc ②. Bảng trắng ở tường phải, người ngồi bên trái mới nhìn thẳng vào nó, nên là ①. ② ở sát tường có bảng, là chỗ của trưởng phòng (ngồi đối diện).',
      ],
    ],
    points: [
      ['上座', 'かみざ', 'chỗ ngồi dành cho người trên'],
      ['向かい', 'むかい', 'đối diện'],
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
      title: '営業会議 議事録',
      body: '営業会議 議事録\n\n日時：7月3日（月）10:00〜11:00\n出席者：木下課長、山口、林、高田（欠席：森）\n\n1. 秋の新商品キャンペーン\n・開始日は9月1日とする。\n・チラシのデザイン案は、林が7月10日までに作成する。\n2. 展示会への出展\n・今年は出展を見送る。\n3. 次回の会議\n・7月17日（月）10:00〜',
    },
    script: [
      ['男', '林さん、昨日の会議、出られなくてごめん。議事録は読んだんだけど、何か変わったことある？', 'Chị Hayashi, xin lỗi hôm qua tôi không dự họp được. Tôi đọc biên bản rồi, có gì thay đổi không?'],
      ['女', 'あ、会議のあとで課長から、キャンペーンの開始を二週間早めたいという話がありました。', 'À, sau buổi họp trưởng phòng nói muốn đẩy ngày bắt đầu chiến dịch sớm lên hai tuần.'],
      ['男', 'じゃあ、チラシも急がないとね。', 'Vậy tờ rơi cũng phải gấp lên nhỉ.'],
      ['女', 'ええ。デザイン案は予定より三日早く出すことにしました。それと展示会のほうは、来年に向けて、森さんに情報を集めておいてほしいそうです。', 'Vâng. Bản thiết kế tôi sẽ nộp sớm hơn ba ngày. Còn triển lãm, trưởng phòng muốn anh Mori thu thập thông tin trước cho năm sau.'],
      ['男', 'わかった。', 'Tôi hiểu rồi.'],
    ],
    questions: [
      [
        'キャンペーンはいつから始まりますか。',
        ['9月1日', '8月18日', '9月15日', '7月17日'],
        1,
        'Biên bản ghi 1/9, nhưng sau họp trưởng phòng muốn sớm lên hai tuần: 1/9 trừ 14 ngày = 18/8. 15/9 là lùi lại thay vì đẩy sớm. 17/7 là ngày họp lần sau.',
      ],
      [
        '森さんがすることは何ですか。',
        ['チラシのデザイン案を作る', '展示会に出展する準備をする', '来年の展示会について情報を集める', '次回の会議の日程を決める'],
        2,
        'Thiết kế tờ rơi là việc của chị Hayashi. Năm nay không tham gia triển lãm (見送る), nhưng anh Mori được nhờ thu thập thông tin cho năm sau. Ngày họp lần sau đã có trong biên bản.',
      ],
    ],
    points: [
      ['議事録', 'ぎじろく', 'biên bản cuộc họp'],
      ['見送る', 'みおくる', 'gác lại, hoãn (không làm lần này)'],
      ['早める', 'はやめる', 'đẩy sớm lên'],
    ],
  }),
  item('w04', 'sogo-chodokkai', 2, {
    material: {
      kind: 'text',
      title: '新入社員ガイド「報・連・相」',
      body: '報・連・相\n\n報告：仕事の結果や進み具合を、指示した人に伝える。悪い知らせほど早く伝える。\n連絡：決まったことや事実を、関係者に伝える。自分の意見は入れない。\n相談：判断に迷うときに、上司や先輩の意見を聞く。そのとき、「自分ならこうする」という考えを持っていく。',
    },
    script: [
      ['女', '高田さん、さっき課長に何を聞いてたの？', 'Anh Takada, lúc nãy anh hỏi trưởng phòng chuyện gì vậy?'],
      ['男', 'お客様から納期を一週間延ばしてほしいと言われたので、どうしたらいいか伺いました。', 'Khách đề nghị lùi hạn giao một tuần, nên tôi hỏi trưởng phòng nên làm thế nào.'],
      ['女', 'それで、課長は何て？', 'Rồi trưởng phòng nói sao?'],
      ['男', '「高田さんはどうしたらいいと思う？」と聞かれて、答えられなかったんです。', 'Trưởng phòng hỏi lại "Anh Takada nghĩ nên làm sao?", và tôi không trả lời được.'],
      ['女', 'そう。こういうときは、自分ならこうする、という案を持っていかないとね。', 'Vậy à. Những lúc như vậy phải mang theo phương án "nếu là mình thì sẽ làm thế này" chứ.'],
      ['男', 'はい。では、自分の考えをまとめてから、課長にもう一度お話しします。', 'Vâng. Vậy tôi sắp xếp ý mình rồi nói lại với trưởng phòng.'],
    ],
    questions: [
      [
        '男の人が課長にしたのは、報・連・相のどれですか。',
        ['相談', '報告', '連絡', '報告と連絡'],
        0,
        'Không biết nên làm gì và hỏi ý cấp trên là 相談. Lời góp ý của người phụ nữ cũng chính là phần cuối định nghĩa 相談 trong tài liệu: phải mang theo ý của mình. Anh ấy không báo kết quả, cũng không truyền đạt điều đã quyết.',
      ],
      [
        '男の人はこのあとどうしますか。',
        ['お客様に納期の延長を断る', '課長に結果を報告する', '先輩に答えを教えてもらう', '自分の案をまとめてから、課長に相談し直す'],
        3,
        'Anh ấy nói 自分の考えをまとめてから、課長にもう一度お話しします. Chưa có quyết định nên không có gì để từ chối khách hay báo kết quả. Đàn chị chỉ góp ý cách hỏi, không đưa đáp án.',
      ],
    ],
    points: [
      ['報連相', 'ほうれんそう', 'báo cáo, liên lạc, hỏi ý kiến'],
      ['納期', 'のうき', 'hạn giao hàng'],
      ['判断に迷う', 'はんだんにまよう', 'phân vân không biết quyết thế nào'],
    ],
  }),
];

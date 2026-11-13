import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/** Week 5 — numbers, charts and trends. Level: J1. */
export const W05: BjtItem[] = [
  item('w05', 'jokyo', 1, {
    material: {
      kind: 'table',
      title: '月別受注件数（グラフA〜Dの元データ）',
      head: ['グラフ', '1月', '2月', '3月', '4月'],
      rows: [
        ['A', '100', '120', '140', '160'],
        ['B', '100', '80', '80', '130'],
        ['C', '100', '130', '90', '130'],
        ['D', '100', '80', '110', '90'],
      ],
    },
    script: [
      ['男', '受注件数ですが、一月から二月にかけては落ち込みました。三月は横ばいでしたが、四月に入って大きく回復し、一月の水準を上回っています。', 'Về số đơn hàng nhận được: từ tháng một sang tháng hai thì giảm. Tháng ba đi ngang, nhưng sang tháng tư thì hồi phục mạnh và vượt mức tháng một.'],
    ],
    questions: [
      [
        '説明に合うグラフはどれですか。',
        ['A', 'B', 'C', 'D'],
        1,
        'Giảm (100→80), đi ngang (80→80), tăng mạnh vượt tháng một (→130): chỉ B khớp. D cũng giảm rồi tăng nhưng tháng ba không đi ngang và tháng tư lại giảm. C tăng ngay tháng hai.',
      ],
    ],
    points: [
      ['落ち込む', 'おちこむ', 'sụt giảm'],
      ['横ばい', 'よこばい', 'đi ngang, không đổi'],
      ['回復する', 'かいふくする', 'hồi phục'],
      ['水準', 'すいじゅん', 'mức, mặt bằng'],
    ],
  }),
  item('w05', 'jokyo', 2, {
    material: {
      kind: 'bars',
      title: '曜日別の平均来店客数',
      unit: '人',
      labels: ['月', '火', '水', '木', '金'],
      series: [{ name: '来店客数', values: [0, 120, 85, 95, 150] }],
    },
    script: [
      ['女', '店内の改装工事、お客様が一番少ない曜日にやりたいんですが、いつがいいでしょう。', 'Tôi muốn làm sửa chữa trong cửa hàng vào ngày ít khách nhất, nên chọn ngày nào ạ?'],
      ['男', '月曜は定休日だけど、工事の業者さんも月曜は休みだから無理だね。', 'Thứ hai cửa hàng nghỉ, nhưng bên thi công thứ hai cũng nghỉ nên không được.'],
      ['女', 'では、水曜日ですね。', 'Vậy là thứ tư nhỉ.'],
      ['男', 'いや、水曜は毎週、本社の監査が入るから避けよう。その次に少ない日にしてくれる？', 'Không, thứ tư tuần nào cũng có kiểm tra từ trụ sở chính, tránh ra. Chọn ngày ít khách tiếp theo nhé.'],
    ],
    questions: [
      [
        '改装工事は何曜日に行いますか。',
        ['月曜日', '火曜日', '水曜日', '木曜日'],
        3,
        'Thứ hai thì bên thi công nghỉ. Thứ tư ít khách nhất (85) nhưng có kiểm tra. Ngày ít khách tiếp theo là thứ năm (95). Thứ ba (120) nhiều khách hơn.',
      ],
    ],
    points: [
      ['定休日', 'ていきゅうび', 'ngày nghỉ cố định'],
      ['改装', 'かいそう', 'sửa sang, cải tạo'],
      ['監査', 'かんさ', 'kiểm tra, thanh tra'],
    ],
  }),
  item('w05', 'shiryo', 1, {
    material: {
      kind: 'table',
      title: '支店別 上半期の目標と実績',
      head: ['支店', '目標（万円）', '実績（万円）'],
      rows: [
        ['札幌', '500', '520'],
        ['仙台', '400', '380'],
        ['広島', '450', '495'],
        ['熊本', '300', '315'],
      ],
    },
    script: [
      ['女', '上半期の結果です。実績の金額だけを見ると札幌が一番ですが、今回は金額ではなく、目標の達成率が最も高かった支店を社長賞として表彰します。', 'Đây là kết quả nửa đầu năm. Nếu chỉ nhìn số tiền thực đạt thì Sapporo đứng đầu, nhưng lần này giải của giám đốc sẽ trao cho chi nhánh có tỉ lệ đạt mục tiêu cao nhất, không xét số tiền.'],
    ],
    questions: [
      [
        '社長賞を受けるのはどの支店ですか。',
        ['広島', '札幌', '熊本', '仙台'],
        0,
        'Tỉ lệ đạt = thực đạt ÷ mục tiêu: Sapporo 104%, Sendai 95%, Hiroshima 110%, Kumamoto 105%. Hiroshima cao nhất. Sapporo là bẫy: số tiền lớn nhất nhưng tỉ lệ thấp hơn.',
      ],
    ],
    points: [
      ['達成率', 'たっせいりつ', 'tỉ lệ đạt (mục tiêu)'],
      ['実績', 'じっせき', 'kết quả thực tế'],
      ['表彰する', 'ひょうしょうする', 'khen thưởng, tuyên dương'],
    ],
  }),
  item('w05', 'shiryo', 2, {
    material: {
      kind: 'bars',
      title: '国内市場シェア',
      unit: '%',
      labels: ['A社', 'B社', '当社', 'C社'],
      series: [
        { name: '昨年', values: [35, 25, 20, 20] },
        { name: '今年', values: [33, 22, 26, 19] },
      ],
    },
    script: [
      ['男', '今年、当社のシェアは六ポイント伸びて、二位に上がりました。', 'Năm nay thị phần của công ty ta tăng sáu điểm, lên vị trí thứ hai.'],
      ['男', '一方、シェアを最も大きく落とした会社は、巻き返しのために、来年は価格を大幅に下げてくると予想されます。注意が必要です。', 'Mặt khác, công ty mất thị phần nhiều nhất được dự đoán sẽ giảm giá mạnh vào năm sau để giành lại. Cần chú ý.'],
    ],
    questions: [
      [
        '来年、価格を大幅に下げてくると予想されるのはどこですか。',
        ['A社', 'C社', 'B社', '当社'],
        2,
        'Mức giảm thị phần: A 35→33 (−2), B 25→22 (−3), C 20→19 (−1). B giảm nhiều nhất. A vẫn đứng đầu và có vẻ lớn nhất, nhưng câu hỏi là về mức giảm.',
      ],
    ],
    points: [
      ['シェア', 'しぇあ', 'thị phần'],
      ['巻き返し', 'まきかえし', 'giành lại thế, phản công'],
      ['大幅に', 'おおはばに', 'mạnh, với biên độ lớn'],
    ],
  }),
  item('w05', 'shiryo', 3, {
    material: {
      kind: 'table',
      title: '宅配便料金表（関東→九州）',
      head: ['重さ', '料金'],
      rows: [
        ['2kgまで', '800円'],
        ['5kgまで', '1,100円'],
        ['10kgまで', '1,500円'],
        ['20kgまで', '2,200円'],
      ],
    },
    script: [
      ['女', '福岡のお客様にサンプルを送りたいんですが、料金を調べてもらえますか。', 'Tôi muốn gửi hàng mẫu cho khách ở Fukuoka, anh tra giúp giá cước được không?'],
      ['女', 'サンプルは一つ一・六キロで、三つ送ります。箱が四百グラムぐらいあるので、それも入れて計算してください。', 'Mỗi mẫu 1,6 cân, gửi ba mẫu. Thùng nặng khoảng bốn trăm gam, nhớ tính cả vào.'],
    ],
    questions: [
      [
        '送料はいくらになりますか。',
        ['800円', '1,100円', '1,500円', '2,200円'],
        2,
        '1,6 kg × 3 = 4,8 kg, cộng thùng 0,4 kg = 5,2 kg, vượt mức 5 kg nên vào mức "đến 10 kg" = 1.500 yên. Quên cộng thùng thì chỉ 4,8 kg và sẽ chọn nhầm 1.100 yên.',
      ],
    ],
    points: [
      ['送料', 'そうりょう', 'phí gửi, cước vận chuyển'],
      ['宅配便', 'たくはいびん', 'dịch vụ chuyển phát tận nhà'],
    ],
  }),
  item('w05', 'sogo-chodokkai', 1, {
    material: {
      kind: 'text',
      title: '10月度 営業報告',
      body: '【10月度 営業報告】\n\n新規契約件数：18件（目標 20件）\n解約件数：5件（前月 2件）\n顧客満足度：4.1点（5点満点／前月 4.3点）\n問い合わせへの平均回答日数：2.5日（前月 1.5日）\n\n※サポート担当1名が10月から育児休業中',
    },
    script: [
      ['女', '新規契約はあと少しだったけど、解約が増えたのが気になるわね。', 'Hợp đồng mới chỉ thiếu chút nữa, nhưng số huỷ hợp đồng tăng thì đáng lo nhỉ.'],
      ['男', '解約されたお客様に理由を伺ったところ、問い合わせへの返事が遅い、という声が一番多かったです。', 'Tôi hỏi lý do những khách huỷ hợp đồng thì nhiều nhất là ý kiến "trả lời câu hỏi chậm".'],
      ['女', '回答日数も一日延びてるものね。担当が一人、育休に入った影響かしら。', 'Số ngày trả lời cũng dài thêm một ngày. Chắc là do một người phụ trách nghỉ chăm con.'],
      ['男', 'はい。来月、派遣の方が一人来てくださる予定ですが、慣れるまでは私も問い合わせ対応を手伝います。', 'Vâng. Tháng sau sẽ có một nhân viên phái cử đến, nhưng trong lúc họ chưa quen việc, tôi cũng sẽ phụ trả lời câu hỏi.'],
    ],
    questions: [
      [
        '解約が増えた主な理由は何ですか。',
        ['新規契約の目標が高すぎたから', '料金が高いから', '満足度調査をしなかったから', '問い合わせへの返事が遅くなったから'],
        3,
        'Hỏi khách huỷ thì lý do nhiều nhất là trả lời chậm, khớp với số liệu: số ngày trả lời từ 1,5 lên 2,5. Mục tiêu hợp đồng mới không liên quan đến việc huỷ. Giá cả không ai nhắc tới.',
      ],
      [
        '男の人は来月から何をしますか。',
        ['問い合わせへの対応を手伝う', '派遣社員を募集する', '解約した客を訪問する', '育児休業を取る'],
        0,
        'Anh ấy nói 慣れるまでは私も問い合わせ対応を手伝います. Nhân viên phái cử đã được xếp (来てくださる予定), không cần tuyển. Nghỉ chăm con là người khác, đã nghỉ từ tháng mười.',
      ],
    ],
    points: [
      ['解約', 'かいやく', 'huỷ hợp đồng'],
      ['育児休業', 'いくじきゅうぎょう', 'nghỉ chăm con'],
      ['派遣', 'はけん', 'phái cử (nhân viên)'],
    ],
  }),
  item('w05', 'sogo-chodokkai', 2, {
    material: {
      kind: 'table',
      title: '冬季限定ラテ3種の売上（発売後4週間）',
      head: ['商品', '価格', '販売数', '主な購入者'],
      rows: [
        ['抹茶ラテ', '280円', '12,000本', '20代女性'],
        ['ほうじ茶ラテ', '280円', '8,500本', '30〜40代男女'],
        ['黒糖ラテ', '300円', '9,200本', '20代女性'],
      ],
    },
    script: [
      ['男', '冬の限定商品三つのうち、一つを定番商品にすることになったんだけど、どれがいいと思う？', 'Trong ba sản phẩm giới hạn mùa đông, sẽ chọn một cái làm sản phẩm thường xuyên. Em nghĩ chọn cái nào?'],
      ['女', '数だけなら抹茶ですよね。', 'Nếu chỉ xét số lượng thì là matcha.'],
      ['男', 'うん。ただ、抹茶は来年、原料の値上がりが決まっていて、今の価格だと利益が出ないんだ。', 'Ừ. Nhưng năm sau nguyên liệu matcha chắc chắn tăng giá, giữ giá hiện tại thì không có lãi.'],
      ['女', '黒糖は抹茶と客層が同じですし…。ほうじ茶はどうですか。数は一番少ないですけど、今までうちが弱かった年齢層に売れていますよね。', 'Đường đen thì cùng nhóm khách với matcha… Trà hojicha thì sao ạ? Số lượng ít nhất nhưng bán được cho nhóm tuổi mà trước giờ mình yếu.'],
      ['男', 'それだ。新しいお客様をつかむという意味でも、それにしよう。', 'Đúng rồi. Xét cả về việc thu hút khách mới, chọn cái đó đi.'],
    ],
    questions: [
      [
        '抹茶ラテを選ばなかった理由は何ですか。',
        ['販売数が少ないから', '原料が値上がりし、利益が出なくなるから', '若い女性にしか売れないから', '価格が高すぎるから'],
        1,
        'Matcha bán nhiều nhất, nhưng năm sau nguyên liệu tăng giá nên giữ giá hiện tại thì không có lãi. Lựa chọn 3 đúng với bảng nhưng không phải lý do người đàn ông đưa ra cho matcha.',
      ],
      [
        '定番商品になるのはどれですか。',
        ['抹茶ラテ', '黒糖ラテ', 'ほうじ茶ラテ', '三つとも'],
        2,
        'Đường đen bị loại vì trùng nhóm khách với matcha. Hojicha bán ít nhất nhưng hút được nhóm 30–40 tuổi mà công ty còn yếu; người đàn ông chốt それにしよう.',
      ],
    ],
    points: [
      ['定番', 'ていばん', 'sản phẩm thường xuyên, cố định'],
      ['客層', 'きゃくそう', 'nhóm khách hàng'],
      ['つかむ', 'つかむ', 'nắm bắt, thu hút (khách)'],
    ],
  }),
];

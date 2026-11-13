import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/** Week 6 — internal documents, rules and announcements. Level: J1. */
export const W06: BjtItem[] = [
  item('w06', 'jokyo', 1, {
    material: {
      kind: 'table',
      title: 'ごみ・回収ボックス（3階）',
      head: ['ボックス', '色', '入れるもの'],
      rows: [
        ['A', '赤', '機密書類'],
        ['B', '青', '紙類（コピー用紙・封筒など）'],
        ['C', '緑', 'ペットボトル・缶'],
        ['D', '黄', '燃えるごみ'],
      ],
    },
    script: [
      ['男', 'この古い契約書の控え、どこに捨てればいいですか。紙だから青ですよね。', 'Bản lưu hợp đồng cũ này bỏ vào đâu ạ? Là giấy nên thùng xanh dương nhỉ.'],
      ['女', 'お客様のお名前が入っているものは、紙でも赤い箱よ。先月からそういう決まりになったの。', 'Cái gì có tên khách hàng thì dù là giấy cũng bỏ thùng đỏ. Từ tháng trước đã quy định như vậy.'],
      ['男', 'わかりました。', 'Tôi hiểu rồi.'],
    ],
    questions: [
      [
        '男の人は契約書の控えをどのボックスに入れますか。',
        ['A', 'B', 'C', 'D'],
        0,
        'Hợp đồng có tên khách là tài liệu mật, bỏ vào thùng đỏ = A (機密書類). B là thùng giấy thường, chính là chỗ người đàn ông định bỏ nhưng bị sửa.',
      ],
    ],
    points: [
      ['機密', 'きみつ', 'bí mật, mật'],
      ['控え', 'ひかえ', 'bản lưu, bản sao giữ lại'],
    ],
  }),
  item('w06', 'jokyo', 2, {
    material: {
      kind: 'table',
      title: 'フリーアドレス座席表（5階）',
      head: ['', '窓側', '中央', '通路側'],
      rows: [
        ['集中エリア', 'A1', 'A2', 'A3'],
        ['会話OKエリア', 'B1', 'B2', 'B3'],
      ],
      note: '電話・オンライン会議は会話OKエリアで。A3・B3には電源がありません。',
    },
    script: [
      ['女', '今日は午後にオンライン会議がいくつかあるから、席は会話OKのほうにしないと。', 'Chiều nay tôi có mấy cuộc họp trực tuyến, nên phải ngồi khu được nói chuyện.'],
      ['男', 'パソコンの充電、大丈夫ですか。', 'Máy tính chị còn pin không?'],
      ['女', 'あ、ほとんどないわ。電源があるところじゃないとだめね。窓側は午後まぶしいから、それ以外で。', 'À, gần hết rồi. Phải chỗ có ổ điện. Phía cửa sổ buổi chiều chói lắm, nên chỗ khác.'],
    ],
    questions: [
      [
        '女の人はどの席に座りますか。',
        ['A2', 'B1', 'B2', 'B3'],
        2,
        'Họp trực tuyến → khu B. Cần ổ điện → loại B3. Tránh cửa sổ → loại B1. Còn B2. A2 có điện và ở giữa nhưng thuộc khu yên lặng.',
      ],
    ],
    points: [
      ['フリーアドレス', 'ふりーあどれす', 'chỗ ngồi tự do (không cố định)'],
      ['電源', 'でんげん', 'nguồn điện, ổ cắm'],
      ['まぶしい', 'まぶしい', 'chói mắt'],
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
      kind: 'text',
      title: '国内出張旅費規程の改定',
      body: '国内出張旅費規程の改定について（4月1日施行）\n\n1. 日帰り出張の日当：1,000円 → 廃止\n2. 宿泊を伴う出張の日当：2,000円 → 2,500円\n3. 宿泊費の上限（1泊）：9,000円 → 11,000円（東京23区・大阪市内は13,000円）\n4. 新幹線のグリーン車：部長以上のみ利用可（変更なし）\n\n上限を超える宿泊費は自己負担とします。',
    },
    script: [
      ['男', '来月、名古屋に二泊で出張なんですけど、ホテル代、いくらまで出るんでしたっけ。', 'Tháng sau tôi đi công tác Nagoya hai đêm, tiền khách sạn được thanh toán tới bao nhiêu nhỉ?'],
      ['女', '四月から上がったのよ。名古屋なら一泊一万一千円まで。', 'Từ tháng tư đã tăng rồi. Nagoya thì mỗi đêm tới mười một nghìn yên.'],
      ['男', 'じゃあ、駅前の一万二千円のホテルは無理ですね。', 'Vậy khách sạn mười hai nghìn trước ga thì không được rồi.'],
      ['女', '差額を自分で払えば泊まれるけど…。取引先の近くに一万円のビジネスホテルがあるから、そこにしたら？', 'Tự trả phần chênh lệch thì vẫn ở được… Gần đối tác có khách sạn bình dân mười nghìn yên, ở đó đi?'],
      ['男', 'そうします。歩いて行けるので、そのほうが楽ですし。', 'Vậy tôi chọn chỗ đó. Đi bộ tới được, lại tiện hơn.'],
    ],
    questions: [
      [
        '男の人の出張で、宿泊費の上限は一泊いくらですか。',
        ['9,000円', '13,000円', '11,000円', '12,000円'],
        2,
        'Nagoya không thuộc 23 quận Tokyo hay thành phố Osaka, nên mức mới là 11.000 yên. 9.000 là mức cũ trước tháng tư. 12.000 là giá khách sạn trước ga, không phải mức trần.',
      ],
      [
        '男の人はどうすることにしましたか。',
        ['差額を払って駅前のホテルに泊まる', 'グリーン車で日帰りする', '東京のホテルに泊まる', '取引先近くの一万円のホテルに泊まる'],
        3,
        'Anh ấy đồng ý với gợi ý khách sạn 10.000 yên gần đối tác (そうします), vừa dưới mức trần vừa đi bộ tới được. Tự trả chênh lệch chỉ là một khả năng được nêu ra. Toa hạng nhất chỉ dành cho cấp trưởng bộ phận trở lên.',
      ],
    ],
    points: [
      ['日当', 'にっとう', 'phụ cấp công tác theo ngày'],
      ['施行', 'しこう', 'có hiệu lực, thi hành'],
      ['自己負担', 'じこふたん', 'tự chi trả'],
      ['差額', 'さがく', 'tiền chênh lệch'],
    ],
  }),
  item('w06', 'sogo-chodokkai', 2, {
    material: {
      kind: 'text',
      title: '【重要】基幹システム停止のお知らせ',
      body: '件名：【重要】基幹システム停止のお知らせ\n\n各位\n\nシステムメンテナンスのため、下記の時間、基幹システムを停止します。\n\n日時：11月22日（土）20:00 〜 11月23日（日）8:00\n影響：受発注・在庫照会・勤怠入力がご利用いただけません。\n※メールと社内チャットは通常どおりご利用いただけます。\n\n情報システム部',
    },
    script: [
      ['女', '土曜の夜にシステムが止まるって。うちの倉庫、土曜も夜まで出荷してるでしょう。', 'Tối thứ bảy hệ thống ngừng đấy. Kho mình thứ bảy cũng xuất hàng tới tối mà.'],
      ['男', 'ええ。在庫が見られないと出荷できないので、土曜は、止まる一時間前の七時までに作業を終わらせるようにします。', 'Vâng. Không xem được tồn kho thì không xuất hàng được, nên thứ bảy tôi sẽ cho xong việc trước bảy giờ, tức một tiếng trước khi ngừng.'],
      ['女', '勤怠の入力はどうする？', 'Còn nhập chấm công thì sao?'],
      ['男', '土曜に出勤する人には、月曜の朝にまとめて入力してもらうよう、金曜のうちに伝えておきます。', 'Với người đi làm thứ bảy, tôi sẽ báo từ thứ sáu là sáng thứ hai nhập gộp một lần.'],
    ],
    questions: [
      [
        '土曜日の出荷作業はどうなりますか。',
        ['七時までに終える', '二十時から始める', '日曜日の朝に行う', '中止する'],
        0,
        'Không xem được tồn kho thì không xuất hàng được, nên phải xong trước 19 giờ, một tiếng trước khi hệ thống ngừng lúc 20 giờ. Việc xuất hàng không bị huỷ, chỉ kết thúc sớm.',
      ],
      [
        '土曜日に出勤する人は、勤怠をいつ入力しますか。',
        ['土曜日の夜', '月曜日の朝', '金曜日のうち', '日曜日の八時以降'],
        1,
        'Người đi làm thứ bảy sẽ nhập vào sáng thứ hai. Thứ sáu là lúc báo cho họ, không phải lúc nhập. Sau 8 giờ chủ nhật hệ thống chạy lại, nhưng đó không phải điều đã thống nhất.',
      ],
    ],
    points: [
      ['基幹システム', 'きかんしすてむ', 'hệ thống lõi'],
      ['在庫照会', 'ざいこしょうかい', 'tra cứu tồn kho'],
      ['勤怠', 'きんたい', 'chấm công, chuyên cần'],
      ['出荷', 'しゅっか', 'xuất hàng'],
    ],
  }),
];

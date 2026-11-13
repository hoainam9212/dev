import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/**
 * Full test 2 (week 12), 聴読解: 5 状況把握 + 10 資料聴読解 + 10 総合聴読解 questions = 25.
 * Mixes the themes of weeks 1–11; about 30% of the questions are J1+.
 */
export const MOCK2: BjtItem[] = [
  // ── 状況把握 ──
  item('mock2', 'jokyo', 1, {
    material: {
      kind: 'table',
      title: '移転先オフィス候補',
      head: ['物件', '広さ', '駅から', '家賃（月）'],
      rows: [
        ['A', '80㎡', '徒歩3分', '60万円'],
        ['B', '120㎡', '徒歩12分', '55万円'],
        ['C', '100㎡', '徒歩5分', '70万円'],
        ['D', '110㎡', '徒歩6分', '65万円'],
      ],
    },
    script: [['女', '社員が増えるので、百平米以上は必要です。駅から十分以上歩くのは、お客様にも申し訳ないので避けたいですね。あとは、家賃をなるべく抑えたいです。', 'Nhân viên sẽ tăng nên cần từ một trăm mét vuông trở lên. Đi bộ từ ga mất hơn mười phút thì thấy ngại với khách nên muốn tránh. Còn lại, tiền thuê càng thấp càng tốt.']],
    questions: [
      [
        'どの物件にしますか。',
        ['A', 'B', 'C', 'D'],
        3,
        '≥ 100 m²: B, C, D. Đi bộ dưới mười phút: loại B (12 phút). Giữa C (70 vạn) và D (65 vạn), D rẻ hơn. B rẻ nhất nhưng quá xa ga.',
      ],
    ],
    points: [
      ['物件', 'ぶっけん', 'bất động sản (đang cho thuê, bán)'],
      ['家賃', 'やちん', 'tiền thuê'],
      ['徒歩', 'とほ', 'đi bộ'],
    ],
  }),
  item('mock2', 'jokyo', 2, {
    material: {
      kind: 'table',
      title: '展示会ブース配置図',
      head: ['', '入口側', '中央', '奥'],
      rows: [
        ['A列', 'A1', 'A2', 'A3'],
        ['B列', 'B1', 'B2', 'B3'],
      ],
      note: 'A列の前の通路は幅が広い。B列は休憩所の隣。入口側のブースは料金が2割高い。',
    },
    script: [['男', '人が一番多く通るのは入口の近くですが、料金が高いので、真ん中にしましょう。それから、うちは製品の実演をするので、前の通路が広い列がいいです。', 'Gần lối vào thì người qua lại đông nhất, nhưng giá cao, nên chọn ở giữa. Ngoài ra, bên mình có trình diễn sản phẩm, nên chọn dãy có lối đi phía trước rộng.']],
    questions: [
      [
        'どのブースを申し込みますか。',
        ['A1', 'A2', 'B2', 'A3'],
        1,
        'Ở giữa → A2 hoặc B2. Lối đi phía trước rộng → dãy A. Vậy là A2. A1 cũng thuộc dãy A nhưng ở phía lối vào, giá cao hơn.',
      ],
    ],
    points: [
      ['実演', 'じつえん', 'trình diễn thực tế'],
      ['通路', 'つうろ', 'lối đi'],
    ],
  }),
  item('mock2', 'jokyo', 3, {
    material: {
      kind: 'table',
      title: '会議日程の候補（出席できる人に○）',
      head: ['候補', '部長', '課長', '山田', '林'],
      rows: [
        ['① 月 10:00', '○', '○', '○', '×'],
        ['② 火 14:00', '○', '×', '○', '○'],
        ['③ 水 10:00', '×', '○', '○', '○'],
        ['④ 木 16:00', '○', '○', '×', '○'],
      ],
    },
    script: [['女', '部長と課長には必ず出ていただかないといけません。議事録は林さんにお願いしたいんですが、林さんが出られない日なら、山田さんに代わってもらえば大丈夫です。あとは、できるだけ早い日にしてください。', 'Trưởng bộ phận và trưởng phòng nhất định phải dự. Biên bản muốn nhờ chị Hayashi, nhưng ngày nào chị ấy không dự được thì nhờ anh Yamada thay cũng được. Ngoài ra, chọn ngày càng sớm càng tốt.']],
    questions: [
      [
        '会議はいつになりますか。',
        ['① 月 10:00', '② 火 14:00', '③ 水 10:00', '④ 木 16:00'],
        0,
        'Cần cả trưởng bộ phận và trưởng phòng → ① hoặc ④. Ở ① chị Hayashi vắng nhưng có anh Yamada thay được, nên vẫn hợp lệ. Hai ngày đều được thì chọn ngày sớm hơn → ①. Ai nghĩ bắt buộc phải có chị Hayashi sẽ chọn nhầm ④.',
      ],
    ],
    points: [['代わる', 'かわる', 'thay thế (người)']],
  }),
  item('mock2', 'jokyo', 4, {
    material: {
      kind: 'table',
      title: '購入申請の承認ルート',
      head: ['金額（合計）', '承認者'],
      rows: [
        ['5万円未満', '課長'],
        ['5万円以上30万円未満', '課長 → 部長'],
        ['30万円以上100万円未満', '課長 → 部長 → 役員'],
        ['100万円以上', '課長 → 部長 → 役員 → 社長'],
      ],
    },
    script: [['男', '新しいパソコンを三台買いたいんです。一台十二万円です。', 'Tôi muốn mua ba máy tính mới. Mỗi máy mười hai vạn yên.']],
    questions: [
      [
        '誰の承認が必要ですか。',
        ['課長だけ', '課長と部長', '課長、部長、役員', '社長まで全員'],
        2,
        'Tổng 12 vạn × 3 = 36 vạn yên, thuộc mức 30–100 vạn → trưởng phòng, trưởng bộ phận và lãnh đạo cấp cao. Tính theo giá một máy (12 vạn) sẽ chọn nhầm "trưởng phòng và trưởng bộ phận".',
      ],
    ],
    points: [
      ['承認', 'しょうにん', 'phê duyệt'],
      ['申請', 'しんせい', 'đề nghị, xin'],
    ],
  }),
  item('mock2', 'jokyo', 5, {
    material: {
      kind: 'table',
      title: '駅の出口案内',
      head: ['出口', '近くの建物'],
      rows: [
        ['北口', '市役所・中央図書館'],
        ['南口', 'バスターミナル・ホテル'],
        ['東口', 'オフィスビル（さくらタワー）'],
        ['西口', '大学・総合病院'],
      ],
    },
    script: [['女', '駅に着きましたら、さくらタワーのほうに出てください。弊社は、その向かいの青いビルの五階です。', 'Khi đến ga, xin anh đi ra phía toà Sakura Tower. Công ty chúng tôi ở tầng năm toà nhà màu xanh đối diện.']],
    questions: [
      [
        '何口から出ますか。',
        ['北口', '南口', '西口', '東口'],
        3,
        'Sakura Tower nằm ở cửa Đông (東口). Công ty ở toà nhà xanh đối diện Sakura Tower, nên vẫn ra cửa Đông.',
      ],
    ],
    points: [['向かい', 'むかい', 'đối diện']],
  }),

  // ── 資料聴読解 ──
  item('mock2', 'shiryo', 1, {
    material: {
      kind: 'bars',
      title: '四半期別 新規契約数と解約数',
      unit: '件',
      labels: ['第1四半期', '第2四半期', '第3四半期', '第4四半期'],
      series: [
        { name: '新規', values: [40, 35, 50, 55] },
        { name: '解約', values: [20, 30, 25, 40] },
      ],
    },
    script: [['男', '純増、つまり新規契約の数から解約の数を引いた数が、最も多かった四半期に行ったキャンペーンを、来年も続けることにします。', 'Chiến dịch được thực hiện vào quý có số tăng ròng lớn nhất, tức số hợp đồng mới trừ số huỷ, sẽ tiếp tục vào năm sau.']],
    questions: [
      [
        '来年も続けるのは、どの四半期のキャンペーンですか。',
        ['第3四半期', '第1四半期', '第4四半期', '第2四半期'],
        0,
        'Tăng ròng: quý 1 = 20, quý 2 = 5, quý 3 = 25, quý 4 = 15. Quý 3 lớn nhất. Quý 4 có nhiều hợp đồng mới nhất nhưng huỷ cũng nhiều.',
      ],
    ],
    points: [
      ['純増', 'じゅんぞう', 'tăng ròng'],
      ['引く', 'ひく', 'trừ'],
    ],
  }),
  item('mock2', 'shiryo', 2, {
    material: {
      kind: 'table',
      title: '会議室利用ルール',
      head: ['項目', 'ルール'],
      rows: [
        ['予約', '利用日の2週間前から可能'],
        ['利用時間', '1回につき最長3時間'],
        ['キャンセル', '前日までに総務部へ連絡'],
        ['飲食', '飲み物のみ可'],
      ],
    },
    script: [['女', '来月の研修で、朝九時から夕方四時まで、この会議室を使いたいんです。お昼はお弁当を出す予定で。予約は来週にでも入れようと思っています。', 'Khoá đào tạo tháng sau, tôi muốn dùng phòng họp này từ chín giờ sáng đến bốn giờ chiều. Buổi trưa dự định phát cơm hộp. Tôi định đặt phòng vào tuần sau.']],
    questions: [
      [
        'このままではルールに合わないのはどれですか。',
        ['予約の時期だけ', 'キャンセルの方法', '利用時間と飲食', '飲み物'],
        2,
        'Từ 9 giờ đến 16 giờ là 7 tiếng, vượt mức tối đa 3 tiếng. Cơm hộp là đồ ăn, mà quy định chỉ cho đồ uống. Đặt phòng vào tuần sau thì đã trong vòng hai tuần trước ngày dùng, nên hợp lệ.',
      ],
    ],
    points: [['飲食', 'いんしょく', 'ăn uống']],
  }),
  item('mock2', 'shiryo', 3, {
    material: {
      kind: 'bars',
      title: '店舗別売上高',
      unit: '万円',
      labels: ['新宿店', '渋谷店', '池袋店', '品川店'],
      series: [
        { name: '前年', values: [5000, 5300, 3500, 3200] },
        { name: '今年', values: [5200, 4800, 3900, 3100] },
      ],
    },
    script: [['男', '前年より売上が伸びた店のうち、伸び率が一番大きかった店の店長を、来月の会議で表彰します。', 'Trong các cửa hàng có doanh thu tăng so với năm trước, cửa hàng trưởng của cửa hàng có tỉ lệ tăng lớn nhất sẽ được khen thưởng ở cuộc họp tháng sau.']],
    questions: [
      [
        '表彰されるのはどの店の店長ですか。',
        ['新宿店', '池袋店', '渋谷店', '品川店'],
        1,
        'Tăng: Shinjuku 5000 → 5200 (+4%), Ikebukuro 3500 → 3900 (khoảng +11%). Shibuya và Shinagawa giảm. Shinjuku có doanh thu lớn nhất nhưng tỉ lệ tăng thấp hơn Ikebukuro.',
      ],
    ],
    points: [['伸び率', 'のびりつ', 'tỉ lệ tăng']],
  }),
  item('mock2', 'shiryo', 4, {
    material: {
      kind: 'text',
      title: '出張報告書',
      body: '出張報告書\n\n出張先：札幌支店\n期間：2月3日〜2月5日\n目的：新システム導入に関する説明\n内容：支店社員15名に操作説明を実施した。\n費用：交通費 48,000円／宿泊費 22,000円',
    },
    script: [['女', '報告書、よく書けていますね。ただ、出張の結果として、どんな課題が残ったのかが書いてありません。そこを書き足してください。', 'Báo cáo viết tốt đấy. Có điều chưa ghi kết quả chuyến công tác còn để lại vấn đề gì. Thêm phần đó vào nhé.']],
    questions: [
      [
        '何を書き足しますか。',
        ['出張の目的', '費用の内訳', '説明した人数', '残った課題'],
        3,
        'Chị chỉ ra thiếu "vấn đề còn tồn đọng" (残った課題). Mục đích, chi phí và số người đều đã có trong báo cáo.',
      ],
    ],
    points: [
      ['課題', 'かだい', 'vấn đề cần giải quyết'],
      ['書き足す', 'かきたす', 'viết thêm'],
      ['内訳', 'うちわけ', 'chi tiết các khoản'],
    ],
  }),
  item('mock2', 'shiryo', 5, {
    material: {
      kind: 'table',
      title: '社用携帯 料金プラン',
      head: ['プラン', '月額', '通話', 'データ'],
      rows: [
        ['S', '2,000円', '30秒ごとに20円', '3GB'],
        ['M', '3,500円', '5分以内は無料', '10GB'],
        ['L', '5,000円', 'かけ放題', '20GB'],
        ['XL', '7,000円', 'かけ放題', '無制限'],
      ],
    },
    script: [['男', '営業部の社用携帯ですが、お客様との長い電話が多いので、通話は無制限がいいです。データは、月に十五ギガぐらい使います。その中で一番安いプランにしてください。', 'Điện thoại công ty của phòng kinh doanh hay gọi dài với khách, nên gọi không giới hạn thì tốt. Dữ liệu dùng khoảng mười lăm GB mỗi tháng. Chọn gói rẻ nhất trong những gói đáp ứng được.']],
    questions: [
      [
        'どのプランにしますか。',
        ['L', 'M', 'XL', 'S'],
        0,
        'Gọi không giới hạn (かけ放題): L hoặc XL. 15 GB thì L (20 GB) đủ, và rẻ hơn XL. Gói M miễn phí trong 5 phút, không phải không giới hạn.',
      ],
    ],
    points: [['かけ放題', 'かけほうだい', 'gọi không giới hạn']],
  }),
  item('mock2', 'shiryo', 6, {
    material: {
      kind: 'bars',
      title: 'ライン別 不良率',
      unit: '%',
      labels: ['ライン1', 'ライン2', 'ライン3', 'ライン4'],
      series: [
        { name: '先月', values: [1.2, 0.8, 2.5, 1.0] },
        { name: '今月', values: [1.0, 1.5, 2.4, 0.9] },
      ],
    },
    script: [['女', '不良率が二パーセントを超えているラインについては、すでに改善を進めています。今月は、それ以外で、先月より悪化したラインの原因を調べてください。', 'Các dây chuyền có tỉ lệ lỗi vượt hai phần trăm thì đã đang được cải thiện. Tháng này, trong các dây chuyền còn lại, hãy tìm nguyên nhân ở dây chuyền nào tệ hơn tháng trước.']],
    questions: [
      [
        '原因を調べるのはどのラインですか。',
        ['ライン1', 'ライン3', 'ライン2', 'ライン4'],
        2,
        'Dây chuyền 3 vượt 2% nên đã có người lo. Trong ba dây chuyền còn lại, chỉ dây chuyền 2 tệ đi (0,8 → 1,5). Dây chuyền 1 và 4 đều giảm. Dây chuyền 3 có tỉ lệ cao nhất nhưng bị loại theo lời nói.',
      ],
    ],
    points: [
      ['不良率', 'ふりょうりつ', 'tỉ lệ hàng lỗi'],
      ['悪化する', 'あっかする', 'xấu đi'],
    ],
  }),
  item('mock2', 'shiryo', 7, {
    material: {
      kind: 'table',
      title: '東京 → 新大阪 時刻表（抜粋）',
      head: ['列車', '東京発', '新大阪着', '指定席'],
      rows: [
        ['のぞみ201号', '8:00', '10:30', '満席'],
        ['のぞみ203号', '8:20', '10:50', '空席あり'],
        ['ひかり501号', '8:10', '11:05', '空席あり'],
        ['のぞみ205号', '8:40', '11:10', '空席あり'],
      ],
    },
    script: [['男', '十一時から、新大阪駅の近くで打ち合わせがあります。駅から会場までは歩いて五分です。指定席で座っていきたいんですが、どれがいいでしょう。', 'Mười một giờ tôi có buổi họp gần ga Shin-Osaka. Từ ga đến nơi họp đi bộ năm phút. Tôi muốn ngồi ghế đặt trước, chuyến nào thì được?']],
    questions: [
      [
        'どの列車に乗りますか。',
        ['のぞみ201号', 'のぞみ203号', 'ひかり501号', 'のぞみ205号'],
        1,
        'Phải đến ga trước 10:55 (đi bộ 5 phút). Chuyến 201 đến 10:30 nhưng hết ghế đặt trước. Chuyến 203 đến 10:50, còn ghế. Hikari 501 đi lúc 8:10 nhưng 11:05 mới đến.',
      ],
    ],
    points: [
      ['指定席', 'していせき', 'ghế đặt trước'],
      ['満席', 'まんせき', 'hết chỗ'],
    ],
  }),
  item('mock2', 'shiryo', 8, {
    material: {
      kind: 'text',
      title: '年末年始の営業について',
      body: '年末年始の営業について\n\n12月28日（土）〜1月5日（日）は休業いたします。\n※12月27日（金）は、午後3時で業務を終了します。\n※休業中の緊急連絡は、総務部の当番が対応します（連絡先は社内掲示板に掲載）。',
    },
    script: [['女', '取引先から、十二月二十七日の夕方に荷物を届けたいという連絡があったんですが、どう返事をしたらいいでしょうか。', 'Đối tác liên lạc nói muốn giao hàng vào chiều tối ngày hai mươi bảy tháng mười hai, tôi nên trả lời thế nào ạ?']],
    questions: [
      [
        'どう返事をしますか。',
        ['27日の夕方に受け取れると伝える', '28日に届けてほしいと伝える', '1月5日に届けてほしいと伝える', '27日の午後3時までに届けてほしいと伝える'],
        3,
        'Ngày 27 chỉ làm đến 15 giờ, chiều tối thì không còn ai nhận. Từ 28/12 đến hết 5/1 nghỉ, nên đề nghị giao trước 15 giờ ngày 27. Ngày 5/1 vẫn trong kỳ nghỉ.',
      ],
    ],
    points: [
      ['休業', 'きゅうぎょう', 'nghỉ kinh doanh'],
      ['当番', 'とうばん', 'người trực'],
    ],
  }),
  item('mock2', 'shiryo', 9, {
    material: {
      kind: 'bars',
      title: '採用方法別の応募者数と採用者数（昨年度）',
      unit: '人',
      labels: ['求人サイト', '紹介', '大学', 'SNS'],
      series: [
        { name: '応募者', values: [120, 15, 40, 60] },
        { name: '採用者', values: [6, 5, 4, 3] },
      ],
    },
    script: [['男', '来年度は、応募者の数ではなく、応募した人のうち実際に採用された人の割合が一番高い方法に、予算を増やします。', 'Năm tới sẽ tăng ngân sách cho kênh có tỉ lệ người thực sự được tuyển trên số người ứng tuyển cao nhất, chứ không dựa vào số người ứng tuyển.']],
    questions: [
      [
        '来年度、予算を増やすのはどの方法ですか。',
        ['求人サイト', '大学', '紹介', 'SNS'],
        2,
        'Tỉ lệ tuyển: trang tuyển dụng 5%, giới thiệu 33%, đại học 10%, mạng xã hội 5%. Giới thiệu cao nhất. Trang tuyển dụng có nhiều ứng viên và nhiều người được tuyển nhất nhưng tỉ lệ thấp.',
      ],
    ],
    points: [
      ['採用', 'さいよう', 'tuyển dụng'],
      ['割合', 'わりあい', 'tỉ lệ'],
    ],
  }),
  item('mock2', 'shiryo', 10, {
    material: {
      kind: 'table',
      title: '通勤経路の比較（新入社員 小川）',
      head: ['経路', '片道の時間', '定期代（1か月）'],
      rows: [
        ['A 電車のみ', '50分', '12,000円'],
        ['B 電車＋バス', '40分', '16,000円'],
        ['C バスのみ', '70分', '9,000円'],
        ['D 電車（特急）', '35分', '21,000円'],
      ],
    },
    script: [['女', '通勤手当は、最も安い経路の金額を支給するのが原則です。ただし、その経路の片道が一時間を超える場合は、次に安い経路を認めます。', 'Theo nguyên tắc, trợ cấp đi lại được tính theo tuyến rẻ nhất. Tuy nhiên, nếu tuyến đó mất hơn một tiếng một chiều thì chấp nhận tuyến rẻ thứ hai.']],
    questions: [
      [
        '小川さんに支給される通勤手当はいくらですか。',
        ['12,000円', '9,000円', '16,000円', '21,000円'],
        0,
        'Rẻ nhất là C (9.000 yên) nhưng mất 70 phút một chiều, vượt một tiếng. Rẻ thứ hai là A, 12.000 yên. B và D nhanh hơn nhưng đắt hơn.',
      ],
    ],
    points: [
      ['通勤手当', 'つうきんてあて', 'trợ cấp đi lại'],
      ['定期代', 'ていきだい', 'tiền vé tháng'],
      ['支給する', 'しきゅうする', 'chi trả, cấp'],
    ],
  }),

  // ── 総合聴読解 ──
  item('mock2', 'sogo-chodokkai', 1, {
    material: {
      kind: 'text',
      title: '新商品企画（案）',
      body: '新商品企画（案）\n\n商品名：朝カフェボトル\n内容：コンビニ向けの無糖コーヒー（500ml）\n価格：150円\n発売予定：来年3月\nターゲット：30〜40代の会社員',
    },
    script: [
      ['女', '企画書、読んだわ。無糖コーヒーは、もう他社さんがたくさん出しているわよね。', 'Tôi đọc bản kế hoạch rồi. Cà phê không đường thì các công ty khác ra nhiều lắm rồi nhỉ.'],
      ['男', 'はい。そこで、ほかとの違いとして、ボトルを片手で開けられる形にしたいと考えています。', 'Vâng. Vì vậy, để tạo khác biệt, tôi muốn làm chai có thể mở bằng một tay.'],
      ['女', 'それはいいわね。ただ、ターゲットはもう少し広くしてもいいんじゃない？最近は若い人も無糖を選ぶから。', 'Ý đó hay. Nhưng đối tượng có thể mở rộng hơn chút chứ? Dạo này người trẻ cũng chọn đồ không đường.'],
      ['男', 'わかりました。二十代も入れます。', 'Vâng. Tôi sẽ thêm cả người hai mươi tuổi.'],
      ['女', 'それから、発売は三月より、新生活が始まる四月の直前のほうが…。いえ、三月ならちょうどいいわね。そのままでいいわ。', 'Còn thời điểm ra mắt, so với tháng ba thì ngay trước tháng tư khi mọi người bắt đầu cuộc sống mới… À không, tháng ba là vừa đẹp rồi. Cứ giữ vậy.'],
    ],
    questions: [
      [
        '男の人が考えている、他社の商品との違いは何ですか。',
        ['無糖であること', 'ボトルを片手で開けられること', '価格が安いこと', 'コンビニで売ること'],
        1,
        'Anh nói: ほかとの違いとして、ボトルを片手で開けられる形に. Không đường thì các công ty khác cũng làm rồi, nên không phải điểm khác biệt.',
      ],
      [
        '企画書のどこを直しますか。',
        ['ターゲット', '発売時期', '商品名', '価格'],
        0,
        'Đối tượng được mở rộng thêm nhóm 20 tuổi. Thời điểm ra mắt suýt bị đổi nhưng chị tự đính chính: 三月ならちょうどいい…そのままでいい. Đây là bẫy kiểu nói rồi rút lại.',
      ],
    ],
    points: [
      ['無糖', 'むとう', 'không đường'],
      ['片手', 'かたて', 'một tay'],
      ['直前', 'ちょくぜん', 'ngay trước'],
    ],
  }),
  item('mock2', 'sogo-chodokkai', 2, {
    material: {
      kind: 'text',
      title: 'テレワーク、導入企業は3割台に',
      body: '民間の調査によると、テレワークを導入している企業の割合は、ピーク時の約5割から、現在は3割台にまで下がった。\n出社中心に戻した理由として最も多かったのは「社員間のコミュニケーション不足」で、次いで「新人の育成が難しい」だった。\n一方、テレワークを続けている企業では、「優秀な人材を全国から採用できる」点を評価する声が多い。',
    },
    script: [
      ['男', 'うちもテレワークをやめるべきだ、という意見が出てるけど、どう思う？', 'Có ý kiến là công ty mình cũng nên bỏ làm việc từ xa, em nghĩ sao?'],
      ['女', 'コミュニケーションの問題はわかります。でも、うちは去年、地方に住んでいる優秀な人を三人も採用できましたよね。', 'Vấn đề giao tiếp thì em hiểu. Nhưng năm ngoái mình tuyển được tới ba người giỏi sống ở địa phương mà.'],
      ['男', 'そうなんだよ。全部やめたら、ああいう人たちが辞めてしまうかもしれない。', 'Đúng vậy. Bỏ hết thì những người đó có khi nghỉ mất.'],
      ['女', '週に二日だけ出社日を決めて、その日に新人の指導や会議をまとめる、というのはどうでしょう。', 'Quy định hai ngày một tuần lên công ty, dồn việc kèm người mới và họp vào những ngày đó, thì sao ạ?'],
      ['男', '地方の三人はどうする？', 'Còn ba người ở địa phương thì sao?'],
      ['女', 'あの三人は、月に一回の出社で十分だと思います。交通費は会社で出して。', 'Ba người đó em nghĩ mỗi tháng lên công ty một lần là đủ. Tiền đi lại công ty trả.'],
      ['男', 'それで提案してみよう。', 'Đề xuất như vậy thử xem.'],
    ],
    questions: [
      [
        '記事によると、出社中心に戻した理由として二番目に多かったのは何ですか。',
        ['社員間のコミュニケーション不足', '優秀な人材を採用できない', '新人の育成が難しい', '通勤の費用がかかる'],
        2,
        'Bài viết: lý do nhiều nhất là thiếu giao tiếp, 次いで (tiếp theo) là khó đào tạo người mới. "Tuyển người giỏi" là điểm mạnh mà các công ty tiếp tục làm từ xa đánh giá cao.',
      ],
      [
        '女の人の提案はどれですか。',
        ['テレワークをすべてやめる', '全員を毎日出社させる', '地方の社員を本社の近くに引っ越させる', '週二日を出社日とし、地方の社員は月一回の出社とする'],
        3,
        'Hai ngày một tuần lên công ty (dồn việc kèm người mới và họp), còn ba người ở địa phương thì mỗi tháng một lần. Bỏ hết làm việc từ xa chính là điều chị lo sẽ làm mất người giỏi.',
      ],
    ],
    points: [
      ['次いで', 'ついで', 'tiếp theo, đứng thứ hai'],
      ['人材', 'じんざい', 'nhân tài, nhân lực'],
      ['育成', 'いくせい', 'đào tạo, bồi dưỡng'],
    ],
  }),
  item('mock2', 'sogo-chodokkai', 3, {
    material: {
      kind: 'table',
      title: '社員食堂アンケート結果',
      head: ['項目', '満足', '不満'],
      rows: [
        ['味', '72%', '28%'],
        ['値段', '80%', '20%'],
        ['メニューの種類', '35%', '65%'],
        ['混雑', '30%', '70%'],
      ],
    },
    script: [
      ['男', '食堂のアンケート、不満が多いのはメニューの種類と混雑ですね。', 'Khảo sát nhà ăn, nhiều bất mãn nhất là số món và cảnh đông đúc.'],
      ['女', 'メニューは、来月から日替わりを一品増やすことになったわ。', 'Thực đơn thì từ tháng sau sẽ thêm một món thay đổi theo ngày.'],
      ['男', '混雑はどうしましょう。お昼が十二時からに集中しているのが原因ですよね。', 'Còn chuyện đông thì sao ạ? Nguyên nhân là mọi người dồn vào lúc mười hai giờ.'],
      ['女', '部署ごとに昼休みの時間を三十分ずつずらすことを、提案してみようと思うの。', 'Tôi định đề xuất cho các phòng lệch giờ nghỉ trưa nhau ba mươi phút.'],
      ['男', 'それなら、席も足りそうですね。', 'Vậy thì chỗ ngồi chắc cũng đủ.'],
    ],
    questions: [
      [
        'アンケートで、不満の割合が最も高かった項目は何ですか。',
        ['混雑', 'メニューの種類', '味', '値段'],
        0,
        'Đông đúc 70% bất mãn, cao nhất. Số món 65%, đứng thứ hai. Người đàn ông nhắc cả hai cùng lúc nên dễ chọn nhầm.',
      ],
      [
        '混雑への対策として、女の人は何を提案しますか。',
        ['席を増やす', '部署ごとに昼休みの時間をずらす', '日替わりメニューを増やす', '食堂の営業時間を延ばす'],
        1,
        'Cho các phòng lệch giờ nghỉ trưa ba mươi phút. Thêm món thay đổi theo ngày là biện pháp cho số món, không phải cho cảnh đông. Không ai đề xuất thêm ghế.',
      ],
    ],
    points: [
      ['混雑', 'こんざつ', 'đông đúc'],
      ['日替わり', 'ひがわり', 'thay đổi theo ngày'],
      ['ずらす', 'ずらす', 'lệch, dịch đi'],
    ],
  }),
  item('mock2', 'sogo-chodokkai', 4, {
    material: {
      kind: 'text',
      title: 'お見積もり内容の変更のお願い',
      body: '件名：お見積もり内容の変更のお願い\n\n先日お送りいただいたお見積もり（No. Q-551）について、以下のとおり変更をお願いできますでしょうか。\n\n・数量：300個 → 500個\n・納期：6月30日 → 6月20日\n・梱包：通常梱包 → 個別包装\n\n変更後のお見積もりを、今週金曜日までにいただけますと幸いです。\n\nあおば産業 松田',
    },
    script: [
      ['女', '松田さんからの変更のお願い、対応できそう？', 'Những thay đổi anh Matsuda đề nghị, bên mình đáp ứng được không?'],
      ['男', '数量と包装は問題ありません。ただ、五百個を二十日までというのは、工場に確認したところ、厳しいそうです。', 'Số lượng và cách đóng gói thì không vấn đề gì. Nhưng năm trăm cái trước ngày hai mươi thì nhà máy nói là khó.'],
      ['女', 'じゃあ、どうするの？', 'Vậy làm sao?'],
      ['男', '二十日までに三百個、残りの二百個を三十日までに、という分納をご提案しようと思います。', 'Tôi định đề xuất giao làm hai đợt: ba trăm cái trước ngày hai mươi, hai trăm cái còn lại trước ngày ba mươi.'],
      ['女', 'いいと思うわ。お見積もりは金曜までね。', 'Tôi thấy được đấy. Báo giá phải gửi trước thứ sáu nhé.'],
      ['男', 'はい、木曜日中にお送りします。', 'Vâng, tôi sẽ gửi trong ngày thứ năm.'],
    ],
    questions: [
      [
        '工場が対応できないと言っているのは何ですか。',
        ['数量を五百個に増やすこと', '個別包装にすること', '見積もりを金曜日までに出すこと', '五百個を六月二十日までに納めること'],
        3,
        'Riêng số lượng và riêng cách đóng gói đều ổn. Cái khó là đủ năm trăm cái trước ngày 20, tức hai yêu cầu cùng lúc. Báo giá là việc của người đàn ông, không phải của nhà máy.',
      ],
      [
        '男の人はどのような提案をしますか。',
        ['全部を六月三十日に納める', '数量を三百個のままにする', '六月二十日までに三百個、三十日までに二百個納める', '個別包装をやめる'],
        2,
        'Giao hai đợt: 300 cái trước ngày 20, 200 cái trước ngày 30. Số lượng vẫn 500 và vẫn đóng gói riêng từng cái.',
      ],
    ],
    points: [
      ['梱包', 'こんぽう', 'đóng gói'],
      ['個別包装', 'こべつほうそう', 'đóng gói riêng từng cái'],
      ['分納', 'ぶんのう', 'giao nhiều đợt'],
    ],
  }),
  item('mock2', 'sogo-chodokkai', 5, {
    material: {
      kind: 'text',
      title: '【参加者募集】地域清掃ボランティア',
      body: '【参加者募集】地域清掃ボランティア\n\n日時：5月18日（土）9:00〜11:00（雨天中止）\n集合：本社 正面玄関\n持ち物：軍手・帽子・飲み物\n※ごみ袋とトングは会社で用意します。\n※参加者には、後日、社員食堂の昼食券を1枚お渡しします。\n申込：5月10日までに総務部へ',
    },
    script: [
      ['男', 'この清掃ボランティア、行こうと思うんだけど、一緒にどう？', 'Tôi định đi buổi dọn vệ sinh tình nguyện này, chị đi cùng không?'],
      ['女', '行きたいです。でも、十八日は午後から子どもの運動会なんです。', 'Tôi muốn đi lắm. Nhưng chiều ngày mười tám con tôi có hội thao.'],
      ['男', '十一時には終わるから、間に合うんじゃない？', 'Mười một giờ là xong rồi, chắc vẫn kịp chứ?'],
      ['女', 'そうですね。じゃあ、申し込みます。軍手は家にあるし…ごみ袋も持っていったほうがいいですか。', 'Đúng nhỉ. Vậy tôi đăng ký. Găng tay thì nhà có sẵn… Có nên mang cả túi rác không ạ?'],
      ['男', 'それは会社が用意してくれるって。', 'Cái đó công ty chuẩn bị rồi.'],
    ],
    questions: [
      [
        '女の人が心配していたことは何ですか。',
        ['雨が降るかどうか', '午後の予定に間に合うかどうか', '申込の締め切り', '昼食券がもらえるかどうか'],
        1,
        'Chiều hôm đó có hội thao của con. Anh đồng nghiệp nói 11 giờ là xong nên kịp. Mưa thì chỉ ghi trong thông báo, không ai lo.',
      ],
      [
        '女の人が自分で持っていかなくてもいいものは何ですか。',
        ['軍手', '帽子', '飲み物', 'ごみ袋'],
        3,
        'Túi rác (và kẹp gắp) do công ty chuẩn bị. Găng tay, mũ, đồ uống là đồ phải tự mang. Chị có sẵn găng tay ở nhà, nhưng vẫn phải mang theo.',
      ],
    ],
    points: [
      ['軍手', 'ぐんて', 'găng tay vải'],
      ['雨天中止', 'うてんちゅうし', 'huỷ nếu trời mưa'],
      ['用意する', 'よういする', 'chuẩn bị'],
    ],
  }),
];

import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/**
 * Full test 3 (week 15), 聴読解: 5 状況把握 + 10 資料聴読解 + 10 総合聴読解 questions = 25.
 * Mixes the themes of all 16 weeks, a little harder than mock2; about a third of the questions are J1+.
 */
export const MOCK3: BjtItem[] = [
  // ── 状況把握 ──
  item('mock3', 'jokyo', 1, {
    material: {
      kind: 'table',
      title: '書類の送付方法',
      head: ['方法', '到着', '追跡', '補償', '料金'],
      rows: [
        ['速達便', '翌日', '×', 'なし', '300円'],
        ['書留便', '2日後', '○', '5万円まで', '480円'],
        ['特急書留便', '翌日', '○', '10万円まで', '720円'],
        ['宅配便', '翌日', '○', '30万円まで', '900円'],
      ],
    },
    script: [['女', 'これは契約書の原本なので、必ず追跡できる方法で送ってください。先方には明日中に届いていないと困ります。補償の額はいくらでも構いませんから、その中で一番安いものにしてください。', 'Đây là bản gốc hợp đồng nên nhất định phải gửi bằng cách theo dõi được. Phải tới tay bên kia trong ngày mai. Mức bồi thường bao nhiêu cũng được, trong số đó chọn cách rẻ nhất.']],
    questions: [
      [
        'どの方法で送りますか。',
        ['速達便', '書留便', '特急書留便', '宅配便'],
        2,
        'Theo dõi được: loại 速達便. Tới ngày mai: loại 書留便 (2 ngày). Còn 特急書留便 (720 yên) và 宅配便 (900 yên), chọn cái rẻ hơn → lựa chọn 3. Lựa chọn 2 dễ nhầm vì là cách rẻ nhất có theo dõi, nhưng tới chậm một ngày.',
      ],
    ],
    points: [
      ['原本', 'げんぽん', 'bản gốc'],
      ['追跡', 'ついせき', 'theo dõi (bưu kiện)'],
      ['補償', 'ほしょう', 'bồi thường'],
    ],
  }),
  item('mock3', 'jokyo', 2, {
    material: {
      kind: 'table',
      title: '倉庫スタッフ 土曜出勤の可否',
      head: ['名前', '今週土曜', 'フォークリフト免許', '今月の休日出勤'],
      rows: [
        ['江口', '○', 'あり', '0回'],
        ['青木', '○', 'あり', '2回'],
        ['井上', '○', 'なし', '0回'],
        ['上田', '×', 'あり', '0回'],
      ],
    },
    script: [['男', '今週の土曜日は重い荷物の入荷が多いから、フォークリフトの免許がない人には頼めないね。それと、今月もう休みの日に出てもらった人には、これ以上お願いしたくないな。', 'Thứ bảy tuần này hàng nặng về nhiều, nên không thể nhờ người không có bằng lái xe nâng. Với lại, ai tháng này đã đi làm ngày nghỉ rồi thì tôi không muốn nhờ thêm nữa.']],
    questions: [
      [
        '誰に土曜日の出勤を頼みますか。',
        ['江口', '青木', '井上', '上田'],
        0,
        'Làm được thứ bảy: Eguchi, Aoki, Inoue. Có bằng xe nâng: loại Inoue. Chưa đi làm ngày nghỉ tháng này: loại Aoki (2 lần) → Eguchi, lựa chọn 1. Ueda cũng có bằng và chưa làm ngày nghỉ, nhưng thứ bảy này không đi được.',
      ],
    ],
    points: [
      ['入荷', 'にゅうか', 'hàng về kho'],
      ['休日出勤', 'きゅうじつしゅっきん', 'đi làm ngày nghỉ'],
    ],
  }),
  item('mock3', 'jokyo', 3, {
    material: {
      kind: 'table',
      title: '取引先までの行き方',
      head: ['方法', '所要時間', '料金'],
      rows: [
        ['電車（乗り換え1回）', '40分', '1人 320円'],
        ['バス', '55分', '1人 230円'],
        ['タクシー', '25分', '1台 3,800円'],
        ['地下鉄（乗り換えなし）', '30分', '1人 280円'],
      ],
    },
    script: [['女', '今、一時十五分です。約束は二時なので、十分前には着いておきたいですね。二人で行くので、料金は二人分で考えて、一番安く済む方法にしましょう。', 'Bây giờ là một giờ mười lăm. Hẹn lúc hai giờ, nên muốn tới trước mười phút. Đi hai người nên tính tiền cho hai người, chọn cách rẻ nhất.']],
    questions: [
      [
        'どの方法で行きますか。',
        ['電車（乗り換え1回）', 'バス', 'タクシー', '地下鉄（乗り換えなし）'],
        3,
        'Phải tới trước 13:50, tức đi tối đa 35 phút: chỉ còn taxi (25 phút) và tàu điện ngầm (30 phút). Hai người: tàu điện ngầm 280 × 2 = 560 yên, taxi 3.800 yên → lựa chọn 4. Lựa chọn 1 dễ nhầm vì cũng rẻ, nhưng 40 phút thì tới 13:55, chỉ sớm năm phút.',
      ],
    ],
    points: [
      ['所要時間', 'しょようじかん', 'thời gian cần'],
      ['乗り換え', 'のりかえ', 'đổi tàu'],
    ],
  }),
  item('mock3', 'jokyo', 4, {
    material: {
      kind: 'table',
      title: '梱包用の箱（内寸）',
      head: ['サイズ', '縦', '横', '高さ', '1箱'],
      rows: [
        ['S', '32cm', '22cm', '18cm', '120円'],
        ['M', '36cm', '26cm', '20cm', '150円'],
        ['L', '40cm', '30cm', '25cm', '180円'],
        ['LL', '45cm', '35cm', '30cm', '220円'],
      ],
    },
    script: [['男', '製品の大きさは、縦三十センチ、横二十センチ、高さ十五センチです。周りに緩衝材を入れるので、縦、横、高さとも、それぞれ四センチずつ余裕が必要です。入る中で一番小さい箱にしてください。', 'Sản phẩm dài ba mươi, rộng hai mươi, cao mười lăm xen-ti-mét. Vì chèn vật liệu chống sốc xung quanh nên chiều dài, rộng, cao mỗi chiều cần dư thêm bốn xen-ti-mét. Chọn hộp nhỏ nhất mà vừa.']],
    questions: [
      [
        'どのサイズの箱を使いますか。',
        ['S', 'M', 'L', 'LL'],
        1,
        'Cần ít nhất 34 × 24 × 19 cm. Hộp S (32 × 22 × 18) thiếu ở cả ba chiều. Hộp M (36 × 26 × 20) vừa → lựa chọn 2. Lựa chọn 1 là bẫy cho người so kích thước sản phẩm mà quên cộng 4 cm.',
      ],
    ],
    points: [
      ['梱包', 'こんぽう', 'đóng gói'],
      ['緩衝材', 'かんしょうざい', 'vật liệu chống sốc'],
      ['内寸', 'うちすん', 'kích thước lòng trong'],
    ],
  }),
  item('mock3', 'jokyo', 5, {
    material: {
      kind: 'table',
      title: 'フロア案内',
      head: ['階', '部署'],
      rows: [
        ['5階', '会議室・応接室'],
        ['4階', '開発部'],
        ['3階', '経理部・人事部'],
        ['2階', '営業部'],
      ],
      note: '経理部は、今月から5階の会議室Cの隣に移りました。',
    },
    script: [['男', '請求書の原本は、経理部に直接持っていってください。あ、場所が変わったので、気をつけてくださいね。', 'Bản gốc hoá đơn thì anh chị mang thẳng tới phòng kế toán nhé. À, chỗ đã đổi rồi nên chú ý.']],
    questions: [
      [
        '何階に行きますか。',
        ['5階', '3階', '2階', '4階'],
        0,
        'Bảng ghi phòng kế toán ở tầng 3, nhưng ghi chú cho biết tháng này đã chuyển lên tầng 5, cạnh phòng họp C → lựa chọn 1. Lựa chọn 2 là bẫy cho người chỉ nhìn bảng, không đọc ghi chú.',
      ],
    ],
    points: [
      ['請求書', 'せいきゅうしょ', 'hoá đơn đòi tiền'],
      ['移る', 'うつる', 'chuyển chỗ'],
    ],
  }),

  // ── 資料聴読解 ──
  item('mock3', 'shiryo', 1, {
    material: {
      kind: 'bars',
      title: '月別 問い合わせ件数',
      unit: '件',
      labels: ['7月', '8月', '9月', '10月'],
      series: [
        { name: '電話', values: [320, 300, 280, 260] },
        { name: 'メール', values: [210, 250, 290, 310] },
      ],
    },
    script: [['女', 'メールでの問い合わせが、初めて電話を上回った月から、ホームページにチャットの窓口を試験的に設けました。', 'Từ tháng mà số câu hỏi qua email lần đầu vượt điện thoại, chúng tôi đã mở thử cửa sổ chat trên trang web.']],
    questions: [
      [
        'チャットの窓口を設けたのは何月からですか。',
        ['7月', '8月', '9月', '10月'],
        2,
        'Tháng 9: email 290 > điện thoại 280, lần đầu vượt (lựa chọn 3). Lựa chọn 4 dễ nhầm vì tháng 10 khoảng cách lớn nhất, nhưng câu hỏi là "lần đầu vượt". Tháng 8 email vẫn thấp hơn (250 < 300).',
      ],
    ],
    points: [
      ['上回る', 'うわまわる', 'vượt, cao hơn'],
      ['試験的に', 'しけんてきに', 'thử nghiệm'],
    ],
  }),
  item('mock3', 'shiryo', 2, {
    material: {
      kind: 'table',
      title: '物流コスト削減セミナー 参加費（1名）',
      head: ['申込時期', '会員', '非会員'],
      rows: [
        ['早期（11月30日まで）', '8,000円', '12,000円'],
        ['通常（12月1日以降）', '10,000円', '15,000円'],
      ],
      note: '同じ会社から3名以上お申し込みの場合、1名につき2,000円割引します。',
    },
    script: [['男', 'うちは会員ではないんですが、十二月に入ってから、三人で申し込むことになりました。', 'Công ty chúng tôi không phải hội viên, và đã quyết định đăng ký ba người sau khi sang tháng mười hai.']],
    questions: [
      [
        '参加費は合計でいくらになりますか。',
        ['36,000円', '39,000円', '45,000円', '30,000円'],
        1,
        'Không phải hội viên, đăng ký thường: 15.000 yên. Ba người nên mỗi người giảm 2.000 → 13.000 × 3 = 39.000 yên (lựa chọn 2). Lựa chọn 3 quên giảm giá. Lựa chọn 1 lấy giá đăng ký sớm 12.000 × 3. Lựa chọn 4 lấy giá sớm rồi còn trừ thêm giảm giá.',
      ],
    ],
    points: [
      ['早期', 'そうき', 'sớm, giai đoạn đầu'],
      ['割引', 'わりびき', 'giảm giá'],
    ],
  }),
  item('mock3', 'shiryo', 3, {
    material: {
      kind: 'bars',
      title: '新オフィスにほしい設備（社員アンケート・複数回答）',
      unit: '%',
      labels: ['集中ブース', 'カフェスペース', '仮眠室', '会議室の増設'],
      series: [{ name: '回答', values: [48, 35, 22, 41] }],
    },
    script: [['女', '最も希望が多かった設備は、来月から工事を始めます。二番目に多かったものは、予算の関係で来年度に回します。', 'Thiết bị được mong muốn nhiều nhất sẽ khởi công từ tháng sau. Thứ được chọn nhiều thứ hai thì do ngân sách nên dời sang năm sau.']],
    questions: [
      [
        '来年度に回されるのはどれですか。',
        ['集中ブース', 'カフェスペース', '仮眠室', '会議室の増設'],
        3,
        'Thứ tự: buồng làm việc tập trung 48%, tăng phòng họp 41%, khu cà phê 35%, phòng ngủ trưa 22%. Thứ hai là tăng phòng họp (lựa chọn 4). Lựa chọn 2 dễ nhầm vì nằm ở cột thứ hai của biểu đồ, nhưng chỉ đứng thứ ba về tỉ lệ.',
      ],
    ],
    points: [
      ['仮眠室', 'かみんしつ', 'phòng ngủ trưa'],
      ['回す', 'まわす', 'chuyển sang, dời sang'],
    ],
  }),
  item('mock3', 'shiryo', 4, {
    material: {
      kind: 'text',
      title: '棚卸しに伴う出荷停止のお知らせ',
      body: 'お取引先各位\n\n2026年12月28日（月）は、倉庫の棚卸しのため、終日出荷業務を停止いたします。\n通常、15時までのご注文は当日に、15時以降のご注文は翌営業日に出荷しております。\nなお、土曜日・日曜日は休業日です。\n\n株式会社みどり物流 営業課',
    },
    script: [['男', '取引先から、二十五日の金曜日、午後四時に注文が入ったんですが、いつ出荷できるか聞かれまして。', 'Đối tác đặt hàng lúc bốn giờ chiều thứ sáu ngày hai mươi lăm, và họ hỏi khi nào xuất hàng được.']],
    questions: [
      [
        'この注文はいつ出荷されますか。',
        ['12月29日', '12月25日', '12月26日', '12月28日'],
        0,
        'Đặt sau 15 giờ nên xuất vào ngày làm việc kế tiếp. 26 và 27 là thứ bảy, chủ nhật nghỉ; 28 (thứ hai) dừng xuất hàng vì kiểm kê → 29/12 (lựa chọn 1). Lựa chọn 4 là bẫy cho người chỉ tính ngày làm việc kế tiếp mà quên ngày kiểm kê.',
      ],
    ],
    points: [
      ['棚卸し', 'たなおろし', 'kiểm kê hàng tồn'],
      ['翌営業日', 'よくえいぎょうび', 'ngày làm việc kế tiếp'],
      ['終日', 'しゅうじつ', 'cả ngày'],
    ],
  }),
  item('mock3', 'shiryo', 5, {
    material: {
      kind: 'bars',
      title: 'コールセンター 時間帯別の平均待ち時間',
      unit: '分',
      labels: ['9〜11時', '11〜13時', '13〜15時', '15〜17時'],
      series: [{ name: '平均待ち時間', values: [4, 9, 6, 12] }],
    },
    script: [['女', '待ち時間が十分を超えている時間帯には、来月からスタッフを二名追加します。また、待ち時間が五分未満の時間帯からは、一名を研修に回します。', 'Khung giờ nào thời gian chờ vượt mười phút thì từ tháng sau thêm hai nhân viên. Còn khung giờ nào thời gian chờ dưới năm phút thì rút một người đi đào tạo.']],
    questions: [
      [
        'スタッフが減るのはどの時間帯ですか。',
        ['9〜11時', '11〜13時', '13〜15時', '15〜17時'],
        0,
        'Dưới năm phút chỉ có 9–11 giờ (4 phút) → lựa chọn 1. Lựa chọn 3 (6 phút) dễ nhầm vì là khung chờ ngắn thứ hai, nhưng không dưới năm phút. 15–17 giờ (12 phút) là khung được thêm người.',
      ],
    ],
    points: [
      ['待ち時間', 'まちじかん', 'thời gian chờ'],
      ['未満', 'みまん', 'chưa tới, dưới'],
    ],
  }),
  item('mock3', 'shiryo', 6, {
    material: {
      kind: 'table',
      title: '営業用ノートパソコン 候補',
      head: ['機種', '重さ', 'バッテリー', '価格（1台）'],
      rows: [
        ['A', '1.10kg', '9時間', '13万円'],
        ['B', '1.20kg', '12時間', '16万円'],
        ['C', '1.25kg', '11時間', '14万円'],
        ['D', '1.30kg', '14時間', '12万円'],
      ],
    },
    script: [['男', '営業が持ち歩くものなので、バッテリーは十時間以上もつものにしてください。予算は一台十五万円までです。条件に合うものの中で、一番軽い機種にしましょう。', 'Đây là máy nhân viên kinh doanh mang theo, nên chọn loại pin dùng được từ mười tiếng trở lên. Ngân sách tối đa mười lăm vạn yên một máy. Trong những máy đạt điều kiện, chọn máy nhẹ nhất.']],
    questions: [
      [
        'どの機種を選びますか。',
        ['A', 'B', 'C', 'D'],
        2,
        'Pin từ 10 tiếng: loại A. Tối đa 15 vạn: loại B. Còn C (1,25 kg) và D (1,30 kg), C nhẹ hơn → lựa chọn 3. Lựa chọn 1 nhẹ nhất trong bảng nhưng pin chỉ 9 tiếng; D rẻ nhất và pin lâu nhất nhưng điều kiện cuối là "nhẹ nhất".',
      ],
    ],
    points: [
      ['持ち歩く', 'もちあるく', 'mang theo người'],
      ['機種', 'きしゅ', 'mẫu máy'],
    ],
  }),
  item('mock3', 'shiryo', 7, {
    material: {
      kind: 'text',
      title: 'お支払い条件について',
      body: '請求書は、毎月末日締めとし、翌月末日にお支払いいたします。\nただし、請求書の到着が締め日の翌月10日を過ぎた場合は、翌々月末日のお支払いとなります。\n請求書は経理部 支払担当宛てにお送りください。\n\n株式会社北星工業 経理部',
    },
    script: [['女', '取引先の佐々木さんから、十月分の請求書がうちに届いたのは十一月十二日だったそうなんですが、支払いはいつになるか知りたいと言われまして。', 'Chị Sasaki bên đối tác nói hoá đơn tháng mười tới công ty mình ngày mười hai tháng mười một, và muốn biết khi nào được thanh toán.']],
    questions: [
      [
        '十月分の請求書の支払いはいつになりますか。',
        ['10月末日', '11月10日', '11月末日', '12月末日'],
        3,
        'Hoá đơn tháng 10 chốt cuối tháng 10. Bình thường trả cuối tháng 11, nhưng hoá đơn tới ngày 12/11, quá ngày 10 của tháng sau → trả cuối tháng kế tiếp nữa, tức cuối tháng 12 (lựa chọn 4). Lựa chọn 3 là bẫy cho người không để ý điều kiện sau ただし.',
      ],
    ],
    points: [
      ['締め日', 'しめび', 'ngày chốt sổ'],
      ['翌々月', 'よくよくげつ', 'tháng sau nữa'],
    ],
  }),
  item('mock3', 'shiryo', 8, {
    material: {
      kind: 'bars',
      title: '本社ビルの電気使用量',
      unit: '千kWh',
      labels: ['6月', '7月', '8月', '9月'],
      series: [
        { name: '昨年', values: [500, 620, 700, 640] },
        { name: '今年', values: [480, 650, 690, 660] },
      ],
    },
    script: [['男', '今年、昨年より使用量が増えてしまった月が何か月かあります。その月数に合わせて、来年は空調の点検を年何回にするか決めたいと思います。', 'Năm nay có vài tháng lượng điện dùng tăng so với năm ngoái. Tôi muốn dựa vào số tháng đó để quyết định năm sau kiểm tra điều hoà mấy lần.']],
    questions: [
      [
        '昨年より使用量が増えたのは何か月ですか。',
        ['一か月', '二か月', '三か月', '四か月'],
        1,
        'So từng tháng: tháng 6 giảm (500 → 480), tháng 7 tăng (620 → 650), tháng 8 giảm (700 → 690), tháng 9 tăng (640 → 660) → hai tháng (lựa chọn 2). Tháng 8 có lượng dùng cao nhất nhưng thấp hơn năm ngoái, đó là bẫy cho người nhìn độ cao cột.',
      ],
    ],
    points: [
      ['使用量', 'しようりょう', 'lượng sử dụng'],
      ['空調', 'くうちょう', 'điều hoà không khí'],
    ],
  }),
  item('mock3', 'shiryo', 9, {
    material: {
      kind: 'table',
      title: '社内の問い合わせ先',
      head: ['内容', '担当'],
      rows: [
        ['給与・社会保険', '人事部 給与課'],
        ['経費の精算・立替金', '経理部'],
        ['パソコン・ネットワークの故障', '情報システム部'],
        ['名刺・文房具の注文', '総務部'],
      ],
    },
    script: [['女', '取引先との会食の代金を、私が自分のカードで払っておいたんですけど、どこに聞けば戻ってきますか。', 'Tiền bữa ăn với đối tác tôi đã trả trước bằng thẻ của mình, giờ hỏi ở đâu thì được hoàn lại ạ?']],
    questions: [
      [
        'どこに問い合わせますか。',
        ['人事部 給与課', '経理部', '情報システム部', '総務部'],
        1,
        'Tự trả trước tiền công việc là 立替金, thuộc phòng kế toán (lựa chọn 2). Lựa chọn 1 dễ nhầm vì tiền được hoàn có thể nghĩ là trả cùng lương, nhưng phòng lương chỉ lo lương và bảo hiểm xã hội.',
      ],
    ],
    points: [
      ['立替金', 'たてかえきん', 'tiền trả hộ trước'],
      ['会食', 'かいしょく', 'bữa ăn (công việc)'],
    ],
  }),
  item('mock3', 'shiryo', 10, {
    material: {
      kind: 'bars',
      title: '会場別 来場者数と成約件数（製品説明会）',
      unit: '人・件',
      labels: ['東京', '大阪', '名古屋', '福岡'],
      series: [
        { name: '来場者数', values: [200, 150, 80, 60] },
        { name: '成約件数', values: [20, 18, 12, 6] },
      ],
    },
    script: [['男', '来年は、来場者に対する成約の割合が最も高かった会場で、説明会を年二回に増やします。', 'Năm sau, ở địa điểm có tỉ lệ chốt hợp đồng so với số khách tới cao nhất, buổi giới thiệu sẽ tăng lên hai lần một năm.']],
    questions: [
      [
        '説明会が年二回になるのはどの会場ですか。',
        ['東京', '大阪', '名古屋', '福岡'],
        2,
        'Tỉ lệ: Tokyo 20/200 = 10%, Osaka 18/150 = 12%, Nagoya 12/80 = 15%, Fukuoka 6/60 = 10% → Nagoya (lựa chọn 3). Lựa chọn 1 dễ nhầm vì Tokyo có nhiều khách và nhiều hợp đồng nhất, nhưng câu hỏi là tỉ lệ.',
      ],
    ],
    points: [
      ['来場者', 'らいじょうしゃ', 'khách tới dự'],
      ['成約', 'せいやく', 'chốt hợp đồng'],
    ],
  }),

  // ── 総合聴読解 ──
  item('mock3', 'sogo-chodokkai', 1, {
    material: {
      kind: 'text',
      title: '後継者未定の中小企業、6割に迫る',
      body: '地域経済研究所が県内の中小製造業500社に行った調査によると、後継者が「決まっていない」と答えた企業は58％で、5年前の調査から9ポイント上昇した。\n決まっていない理由（複数回答）は、「社内に適任者がいない」が45％で最も多く、「親族が継ぐ意思を持っていない」が38％、「誰に相談すればよいかわからない」が21％と続いた。\n一方、社外から経営者を迎えたり、他社に事業を譲ったりすることを「検討してもよい」と答えた企業は41％に上り、5年前の約2倍となった。',
    },
    script: [
      ['男', 'この記事、うちの銀行の取引先にも、そのまま当てはまりますね。', 'Bài báo này đúng y như tình hình các khách hàng của ngân hàng mình.'],
      ['女', 'そうね。特に三番目の理由、相談先がわからないっていうのは、銀行として放っておけないわ。', 'Ừ. Nhất là lý do thứ ba, không biết hỏi ai, thì ngân hàng không thể làm ngơ được.'],
      ['男', '来月、取引先向けのセミナーを開く予定ですよね。テーマを事業承継にしてはどうでしょう。', 'Tháng sau mình định tổ chức hội thảo cho khách hàng đúng không ạ. Lấy chủ đề là chuyển giao doanh nghiệp thì sao?'],
      ['女', 'いいと思う。ただ、セミナーだけだと、聞いて終わりになりがちなのよね。', 'Được đấy. Có điều chỉ hội thảo thôi thì hay nghe xong là hết.'],
      ['男', 'では、セミナーのあとに、希望する会社と個別に相談できる時間を設けるのは。', 'Vậy sau hội thảo, mình dành thời gian tư vấn riêng cho công ty nào muốn thì sao ạ?'],
      ['女', 'それがいいわ。それから、社外の人に継いでもらうことを考える会社が増えているみたいだから、実際にそうやって会社を引き継いだ経営者に話してもらえると、説得力があるわね。', 'Hay đấy. Với lại, có vẻ ngày càng nhiều công ty nghĩ tới việc để người ngoài kế nghiệp, nên nếu mời được một giám đốc đã thật sự tiếp quản công ty theo cách đó lên nói chuyện thì sẽ thuyết phục hơn.'],
      ['男', '心当たりがあります。去年、取引先の部品メーカーを引き継いだ方がいるので、声をかけてみます。', 'Tôi có biết một người. Năm ngoái có người tiếp quản một công ty linh kiện là khách hàng của mình, tôi sẽ thử ngỏ lời.'],
    ],
    questions: [
      [
        '記事によると、後継者が決まっていない企業の割合は、5年前の調査では何％でしたか。',
        ['49％', '58％', '67％', '41％'],
        0,
        '58% hiện nay là sau khi tăng 9 điểm, nên 5 năm trước là 58 − 9 = 49% (lựa chọn 1). Lựa chọn 3 là cộng thay vì trừ. Lựa chọn 4 (41%) là tỉ lệ công ty sẵn sàng cân nhắc người ngoài kế nghiệp, một con số khác.',
      ],
      [
        'セミナーについて、二人が決めたことはどれですか。',
        ['セミナーはやめて、取引先を一社ずつ訪問して相談に乗る', 'テーマは決めずに、個別相談だけを行う', 'テーマを事業承継にし、終了後に個別相談を行う', '記事を書いた研究所の人に講演を頼む'],
        2,
        'Chủ đề chuyển giao doanh nghiệp, và sau hội thảo có giờ tư vấn riêng để không "nghe xong là hết" → lựa chọn 3. Lựa chọn 2 dễ nhầm vì tư vấn riêng có trong kế hoạch, nhưng là thêm vào sau hội thảo, không thay hội thảo. Người được mời nói chuyện là giám đốc đã tiếp quản công ty, không phải người của viện nghiên cứu.',
      ],
      [
        '男の人はこのあと何をしますか。',
        ['研究所に、調査の詳しい結果を問い合わせる', '引き継いだ経営者に講演を頼んでみる', '取引先に後継者がいるかどうかを調べる', 'セミナーの会場を予約しておく'],
        1,
        '声をかけてみます: sẽ thử ngỏ lời với người đã tiếp quản công ty linh kiện năm ngoái (lựa chọn 2). Các việc còn lại không ai nhắc tới. Lựa chọn 3 dễ nhầm vì là chủ đề của bài báo, nhưng không phải việc được nói ra trong hội thoại.',
      ],
    ],
    points: [
      ['事業承継', 'じぎょうしょうけい', 'chuyển giao doanh nghiệp'],
      ['後継者', 'こうけいしゃ', 'người kế nghiệp'],
      ['心当たり', 'こころあたり', 'có biết (người, manh mối)'],
      ['説得力', 'せっとくりょく', 'sức thuyết phục'],
    ],
  }),
  item('mock3', 'sogo-chodokkai', 2, {
    material: {
      kind: 'table',
      title: '来年度 社外研修プログラム（営業部向け）',
      head: ['研修', '対象', '時期', '費用（1人）'],
      rows: [
        ['リーダー研修', '係長', '5月', '6万円'],
        ['プレゼン研修', '入社3〜5年目', '6月', '3万円'],
        ['語学研修（英語）', '希望者', '通年', '8万円'],
        ['データ分析研修', '希望者', '9月', '4万円'],
      ],
      note: '営業部の研修予算：年間60万円',
    },
    script: [
      ['男', '来年度の研修、うちの部から誰を出すか決めようか。予算は六十万円だから、よく考えないと。', 'Mình quyết định xem năm tới phòng mình cử ai đi đào tạo nhé. Ngân sách sáu mươi vạn yên nên phải tính kỹ.'],
      ['女', '係長の二人には、リーダー研修に出てもらいたいです。', 'Tôi muốn hai trưởng nhóm (係長) đi khoá lãnh đạo.'],
      ['男', 'そうだね。それで十二万円。', 'Ừ. Vậy là mười hai vạn.'],
      ['女', '入社三年目から五年目の人が五人いるので、全員プレゼン研修に。', 'Người năm thứ ba tới năm thứ năm có năm người, cho cả năm người đi khoá thuyết trình.'],
      ['男', '十五万円か。ここまでで二十七万円。英語は、海外担当の三人が希望しているね。', 'Mười lăm vạn à. Tới đây là hai mươi bảy vạn. Tiếng Anh thì ba người phụ trách nước ngoài muốn học.'],
      ['女', '三人だと二十四万円で、合わせて五十一万円です。データ分析は、希望者が四人いますけど……。', 'Ba người là hai mươi bốn vạn, cộng lại năm mươi mốt vạn. Phân tích dữ liệu thì có bốn người muốn đi, nhưng…'],
      ['男', '四人だと予算を超えるな。英語の三人のうち一人は、来年度は国内の担当に変わる予定だから、外していいよ。', 'Bốn người thì vượt ngân sách. Trong ba người học tiếng Anh, có một người năm tới sẽ chuyển sang phụ trách trong nước, nên bỏ người đó ra cũng được.'],
      ['女', 'それなら、データ分析に四人とも出しても、予算内に収まります。', 'Vậy thì cho cả bốn người đi phân tích dữ liệu cũng vẫn nằm trong ngân sách.'],
      ['男', 'よし、それでいこう。', 'Được, cứ thế đi.'],
    ],
    questions: [
      [
        '英語の語学研修に参加するのは何人ですか。',
        ['一人', '二人', '三人', '四人'],
        1,
        'Ba người muốn học tiếng Anh, nhưng một người năm tới chuyển sang phụ trách trong nước nên bị bỏ ra → hai người (lựa chọn 2). Lựa chọn 3 là con số trước khi điều chỉnh.',
      ],
      [
        '研修費の合計はいくらになりますか。',
        ['六十七万円', '五十一万円', '六十万円', '五十九万円'],
        3,
        'Lãnh đạo 6 × 2 = 12, thuyết trình 3 × 5 = 15, tiếng Anh 8 × 2 = 16, phân tích dữ liệu 4 × 4 = 16 → 12 + 15 + 16 + 16 = 59 vạn yên (lựa chọn 4), dưới mức 60 vạn. Lựa chọn 1 (67) là khi giữ ba người học tiếng Anh. Lựa chọn 3 là bẫy cho người lấy luôn con số ngân sách.',
      ],
      [
        'データ分析研修について、正しいものはどれですか。',
        ['希望者の四人が全員参加する', '予算の都合で、参加者を二人に減らす', '係長だけが参加する', '来年度は参加を見送る'],
        0,
        'Sau khi bớt một người học tiếng Anh, cả bốn người muốn học phân tích dữ liệu đều đi được trong ngân sách (lựa chọn 1). Lựa chọn 2 dễ nhầm vì lúc đầu bốn người làm vượt ngân sách, nhưng cách giải quyết là bớt ở khoá tiếng Anh, không phải ở khoá này.',
      ],
    ],
    points: [
      ['予算内に収まる', 'よさんないにおさまる', 'nằm trong ngân sách'],
      ['外す', 'はずす', 'bỏ ra, loại ra'],
      ['通年', 'つうねん', 'quanh năm'],
    ],
  }),
  item('mock3', 'sogo-chodokkai', 3, {
    material: {
      kind: 'text',
      title: '搬入・搬出のご案内',
      body: '出展者各位\n\n第12回 関西ものづくり展（2027年3月4日（木）・5日（金））の搬入・搬出について、下記のとおりご案内します。\n\n■搬入\n前日：3月3日（水）13:00〜18:00\n当日：3月4日（木）8:00〜9:00（手で持てる小型の荷物に限ります）\n■搬出\n3月5日（金）17:00以降\n■車両\n搬入口での駐車は、1台30分までです。\n■台車\n事務局で貸し出します。数に限りがあるため、先着順とさせていただきます。\n\n展示会事務局',
    },
    script: [
      ['男', '来月の展示会、搬入の段取りを決めておこう。展示する機械は大きいから、前日にしか入れられないね。', 'Triển lãm tháng sau, mình chốt trước cách chuyển hàng vào nhé. Máy trưng bày to nên chỉ đưa vào được hôm trước thôi.'],
      ['女', '前日は午後一時からですね。私、その日の午後は別の打ち合わせが入っていまして……。', 'Hôm trước là từ một giờ chiều nhỉ. Chiều hôm đó tôi lại có cuộc họp khác…'],
      ['男', 'じゃあ、機械は僕が運ぶよ。台車は先着順だから、一時ちょうどに行くようにする。', 'Vậy máy để tôi chở. Xe đẩy là ai đến trước được trước, nên tôi sẽ có mặt đúng một giờ.'],
      ['女', 'すみません。パンフレットの箱は小さいので、当日の朝、私が車で持っていきます。', 'Xin lỗi anh. Thùng tờ rơi nhỏ, nên sáng hôm đó tôi sẽ chở bằng xe.'],
      ['男', '助かる。ただ、搬入口に車を止められるのは三十分までだから、近くの駐車場を別に予約しておいてくれる？', 'Đỡ quá. Có điều xe chỉ đỗ ở cửa chuyển hàng được ba mươi phút thôi, nên chị đặt trước một bãi đỗ gần đó giúp nhé?'],
      ['女', 'わかりました。', 'Vâng ạ.'],
    ],
    questions: [
      [
        '展示用の機械はいつ搬入しますか。',
        ['3月4日の朝8時から9時の間', '3月5日の17時以降', '3月3日の午後', '3月3日の朝'],
        2,
        'Máy to chỉ đưa vào hôm trước, 3/3 từ 13 giờ, và người đàn ông sẽ tới đúng 13 giờ → lựa chọn 3. Lựa chọn 1 dễ nhầm vì sáng ngày khai mạc cũng nhận hàng, nhưng chỉ hàng nhỏ cầm tay được. Sáng 3/3 không nhận hàng.',
      ],
      [
        '女の人がしなければならないことはどれですか。',
        ['パンフレットを運び、駐車場を予約する', '前日の午後に、展示用の大きな機械を運ぶ', '事務局に連絡して、台車を予約しておく', '最終日の午前中に荷物を搬出する'],
        0,
        'Người phụ nữ chở thùng tờ rơi sáng 4/3 và được nhờ đặt bãi đỗ riêng vì cửa chuyển hàng chỉ cho đỗ 30 phút (lựa chọn 1). Lựa chọn 3 dễ nhầm vì có chuyện xe đẩy, nhưng xe đẩy theo thứ tự đến trước, không đặt trước được, và người đàn ông sẽ lo việc đó.',
      ],
    ],
    points: [
      ['搬入', 'はんにゅう', 'chuyển hàng vào'],
      ['段取り', 'だんどり', 'sắp xếp các bước'],
      ['先着順', 'せんちゃくじゅん', 'ai đến trước được trước'],
    ],
  }),
  item('mock3', 'sogo-chodokkai', 4, {
    material: {
      kind: 'bars',
      title: '解約した顧客へのアンケート：解約の理由',
      unit: '%',
      labels: ['価格が高い', 'サポートが遅い', '機能が足りない', 'その他'],
      series: [{ name: '回答', values: [18, 42, 25, 15] }],
    },
    script: [
      ['男', '解約が増えているので、来月から料金を一割下げてはどうかと思うんですが。', 'Số huỷ hợp đồng đang tăng, nên tôi nghĩ từ tháng sau mình giảm phí mười phần trăm thì thế nào?'],
      ['女', '料金ですか。……このアンケート、もうご覧になりました？', 'Phí à. …Anh đã xem bảng khảo sát này chưa ạ?'],
      ['男', 'ええ、価格が高いという声もありますよね。', 'Rồi, cũng có ý kiến là giá cao mà.'],
      ['女', 'ええ、二割近く。ただ、一番多いのはこちらなんですよね。', 'Vâng, gần hai mươi phần trăm. Có điều nhiều nhất lại là cái này.'],
      ['男', 'ああ、サポートですか。確かに、問い合わせへの返事に三日かかることもあると聞いています。', 'À, hỗ trợ à. Đúng là tôi có nghe có khi mất ba ngày mới trả lời câu hỏi.'],
      ['女', '値下げすると、その分、サポートに人を回す余裕がなくなるかもしれませんね。', 'Nếu giảm giá thì có khi không còn dư để bố trí thêm người cho bộ phận hỗ trợ.'],
      ['男', '……わかりました。まずはサポートの体制を見直す案を考えます。', '…Tôi hiểu rồi. Trước hết tôi sẽ nghĩ phương án xem lại bộ phận hỗ trợ.'],
    ],
    questions: [
      [
        '女の人は、値下げの案についてどう考えていますか。',
        ['解約を減らすために、すぐに値下げするべきだ', '主な解約理由は別にあり、優先すべきでない', '料金を一割よりもっと大きく下げるべきだ', '値下げより、機能を増やすほうが先だ'],
        1,
        'Người phụ nữ không phản đối thẳng mà hỏi "anh xem khảo sát chưa", chỉ ra lý do nhiều nhất là hỗ trợ chậm (42%), và nói giảm giá có thể làm mất người cho bộ phận hỗ trợ: hàm ý không nên ưu tiên giảm giá (lựa chọn 2). Lựa chọn 4 dễ nhầm vì "thiếu chức năng" đứng thứ hai trong khảo sát, nhưng người phụ nữ không nhắc tới.',
      ],
      [
        'アンケートで、解約の理由として最も多かったのはどれですか。',
        ['機能が足りない', '価格が高い', 'その他', 'サポートが遅い'],
        3,
        'Cột cao nhất là サポートが遅い, 42% (lựa chọn 4). Giá cao chỉ 18% (二割近く); đó là lý do người đàn ông dựa vào để đề xuất giảm giá.',
      ],
    ],
    points: [
      ['解約', 'かいやく', 'huỷ hợp đồng'],
      ['体制', 'たいせい', 'cơ cấu, hệ thống tổ chức'],
      ['余裕', 'よゆう', 'dư dả'],
    ],
  }),
];

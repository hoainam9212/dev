import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/**
 * Full test 2 (week 12), 聴読解: 5 状況把握 + 10 資料聴読解 + 10 総合聴読解 questions = 25.
 * Mixes the themes of weeks 1–11; about 30% of the questions are J1+.
 * Calibrated 2026-11-14 (spec rules 1, 2, 3, 8, 9, 10): 状況把握 is a photo + printed topic choices,
 * 総合聴読解 is ten one-question items whose choices are the positions 【1】–【4】 on the material.
 */
export const MOCK2: BjtItem[] = [
  // ── 状況把握 ──
  item('mock2', 'jokyo', 1, {
    material: {
      kind: 'scene',
      vi: 'Trong một siêu thị sau giờ đóng cửa. Một nhân viên nữ mặc tạp dề cầm cuộn nhãn dán màu đỏ, đứng trước kệ hàng. Một người đàn ông đeo bảng tên "店長" chỉ tay vào hàng nhãn giá trên mép kệ. Phía sau có một xe đẩy trưng bày hàng giảm giá.',
    },
    script: [
      ['女', '店長、明日からのセールの分、今夜のうちに全部貼り替えておきますか。', 'Cửa hàng trưởng ơi, phần cho đợt giảm giá từ mai, tối nay em dán đổi hết luôn nhé?'],
      ['男', 'うん、お願い。ただ、二割引きのと三割引きのがあるから、間違えないようにね。去年、レジで言われた額と違うって、お客様から苦情が来たでしょう。', 'Ừ, nhờ em. Có điều có loại giảm hai mươi phần trăm và loại giảm ba mươi phần trăm, đừng để nhầm. Năm ngoái có khách phàn nàn là tiền ở quầy thu ngân khác với số ghi đấy.'],
      ['女', 'はい。棚ごとに、どっちなのか一覧にしてから始めます。', 'Vâng. Em sẽ lập danh sách từng kệ thuộc loại nào rồi mới bắt đầu.'],
      ['男', 'それと、ワゴンの場所は今のままでいいからね。', 'Còn chỗ để xe đẩy thì cứ để như bây giờ nhé.'],
      ['女', 'わかりました。閉店したら、すぐに始めます。', 'Vâng ạ. Đóng cửa xong em bắt đầu ngay.'],
    ],
    questions: [
      [
        '二人は何について話していますか。',
        ['セールのワゴン', 'セールのレジ', 'セールの値札', 'セールの期間'],
        2,
        'Dán đổi lại trên từng kệ, phân biệt giảm 20% và 30%, tránh để tiền ở quầy khác với số ghi: hai người bàn về nhãn giá cho đợt giảm giá. Chữ 値札 không được nói. Lựa chọn 1 (ワゴン) và lựa chọn 2 (レジ) đều là chữ nghe được trong băng, nhưng chỉ là chi tiết phụ.',
      ],
    ],
    points: [
      ['貼り替える', 'はりかえる', 'dán thay, dán đổi'],
      ['二割引き', 'にわりびき', 'giảm hai mươi phần trăm'],
      ['苦情', 'くじょう', 'lời phàn nàn'],
    ],
  }),
  item('mock2', 'jokyo', 2, {
    material: {
      kind: 'scene',
      vi: 'Phòng họp có màn hình lớn đang chiếu cuộc họp trực tuyến với sáu ô hình; một ô bị đứng hình, mờ nhoè. Một người phụ nữ đeo tai nghe ngồi trước máy tính xách tay, một người đàn ông đứng cạnh chỉ vào ô hình đó.',
    },
    script: [
      ['男', 'あれ、大阪の山本さん、さっきから止まってますね。', 'Ơ, anh Yamamoto ở Osaka bị đứng hình từ nãy rồi.'],
      ['女', '声も途切れ途切れで…。こちらの声は向こうに届いているみたいなんですけど。', 'Tiếng cũng chập chờn… Hình như tiếng bên mình thì bên đó vẫn nghe được.'],
      ['男', '向こうの回線かな。一度抜けて、入り直してもらいましょうか。', 'Chắc đường truyền bên đó. Hay nhờ anh ấy thoát ra rồi vào lại?'],
      ['女', 'じゃあ、チャットで送っておきます。それでもだめなら、山本さんだけ電話でつないでもらいましょう。', 'Vậy em nhắn qua khung chat. Vẫn không được thì nhờ riêng anh Yamamoto nối bằng điện thoại.'],
      ['男', 'そうしましょう。資料の説明は、山本さんが戻ってきてからにしましょうか。', 'Làm vậy đi. Phần giải thích tài liệu thì đợi anh Yamamoto vào lại rồi hãy làm nhé.'],
    ],
    questions: [
      [
        '二人は何について話していますか。',
        ['オンライン会議の接続', 'オンライン会議の議題', 'オンライン会議のチャット', 'オンライン会議の録画'],
        0,
        'Hình đứng, tiếng chập chờn, nghi đường truyền, bảo vào lại hoặc nối bằng điện thoại: chủ đề là kết nối của cuộc họp trực tuyến. Chữ 接続 không được nói. Lựa chọn 3 có chữ チャット nghe được trong băng, nhưng chat chỉ là cách báo tin cho anh Yamamoto.',
      ],
    ],
    points: [
      ['途切れる', 'とぎれる', 'bị ngắt quãng'],
      ['回線', 'かいせん', 'đường truyền'],
      ['入り直す', 'はいりなおす', 'vào lại'],
    ],
  }),
  item('mock2', 'jokyo', 3, {
    material: {
      kind: 'scene',
      vi: 'Khu nhận hàng phía sau một nhà hàng, cạnh một chiếc xe tải nhỏ. Một người đàn ông mặc đồng phục giao hàng cầm máy tính bảng. Một người phụ nữ đeo tạp dề cúi nhìn thùng các-tông có một góc bị móp, tay cầm điện thoại.',
    },
    script: [
      ['女', 'すみません、この箱、角がへこんでるんですけど。', 'Xin lỗi, cái thùng này bị móp một góc.'],
      ['男', 'あ、本当ですね。中身、割れ物でしたっけ。', 'À, đúng thật. Bên trong là đồ dễ vỡ phải không ạ?'],
      ['女', 'はい、ガラスの器なんです。開けて確かめたいので、受け取りのサイン、少し待っていただけますか。', 'Vâng, là bát đĩa thuỷ tinh. Tôi muốn mở ra kiểm tra, anh chờ một chút rồi tôi mới ký nhận được không?'],
      ['男', 'はい、どうぞ。念のため、箱の写真も撮っておいてください。もし割れていたら、こちらで交換の手配をいたしますので。', 'Vâng, chị cứ kiểm tra. Để cho chắc, chị chụp cả ảnh cái thùng lại nhé. Nếu có cái nào vỡ thì bên tôi sẽ lo đổi hàng.'],
      ['女', 'ありがとうございます。中が無事だったら、すぐにサインしますので。', 'Cảm ơn anh. Nếu bên trong không sao thì tôi ký ngay.'],
    ],
    questions: [
      [
        '二人は何について話していますか。',
        ['届いた荷物の写真', '届いた荷物の個数', '届いた荷物の受取人', '届いた荷物の破損'],
        3,
        'Thùng bị móp, bên trong là đồ thuỷ tinh, muốn mở kiểm tra trước khi ký: hai người lo hàng bị hư hại. Chữ 破損 không được nói. Lựa chọn 1 dùng lại chữ 写真 trong băng, nhưng chụp ảnh chỉ là việc làm cho chắc. Lựa chọn 3 lấy từ chuyện ký nhận.',
      ],
    ],
    points: [
      ['へこむ', 'へこむ', 'bị móp'],
      ['割れ物', 'われもの', 'đồ dễ vỡ'],
      ['念のため', 'ねんのため', 'để cho chắc'],
    ],
  }),
  item('mock2', 'jokyo', 4, {
    material: {
      kind: 'scene',
      vi: 'Một phòng họp nhỏ sau buổi phỏng vấn. Hai người ngồi cạnh nhau ở một bên bàn, trước mặt là tờ sơ yếu lý lịch có dán ảnh và một tờ phiếu chấm điểm. Ghế đối diện đã trống, cốc nước của ứng viên vẫn còn trên bàn.',
    },
    script: [
      ['男', '今の方、受け答えはしっかりしてましたね。', 'Người vừa rồi trả lời chắc chắn nhỉ.'],
      ['女', 'ええ。ただ、前の会社を一年で辞めた理由を聞いたとき、少し言葉に詰まってましたよね。', 'Vâng. Có điều lúc hỏi vì sao nghỉ công ty cũ sau một năm thì có hơi ngập ngừng.'],
      ['男', 'そこは少し気になりましたけど、うちの仕事にかける気持ちは、今日の中で一番感じましたよ。', 'Chỗ đó tôi cũng hơi băn khoăn, nhưng nhiệt huyết với công việc của mình thì tôi thấy rõ nhất trong số những người hôm nay.'],
      ['女', 'そうですね。じゃあ、次に進んでもらって、部長にも見ていただきましょう。部長は木曜なら時間が取れるそうです。', 'Đúng vậy. Thế thì cho vào vòng tiếp theo, rồi nhờ trưởng bộ phận xem luôn. Nghe nói thứ năm thì trưởng bộ phận sắp xếp được thời gian.'],
      ['男', 'ええ。気になった点も、シートに書いておきますね。', 'Vâng. Tôi sẽ ghi cả điểm đáng lo vào phiếu.'],
    ],
    questions: [
      [
        '二人は何について話していますか。',
        ['応募者の退職理由', '応募者への評価', '応募者の連絡先', '応募者の面接日'],
        1,
        'Hai người nêu điểm tốt (trả lời chắc chắn, nhiệt huyết) và điểm đáng lo của ứng viên rồi quyết cho vào vòng sau: họ đang đánh giá ứng viên. Chữ 評価 không được nói. Lựa chọn 1 dễ nhầm vì có nhắc lý do nghỉ việc (辞めた理由), nhưng đó chỉ là một điểm trong phần đánh giá.',
      ],
    ],
    points: [
      ['受け答え', 'うけこたえ', 'cách hỏi đáp, ứng đối'],
      ['言葉に詰まる', 'ことばにつまる', 'nghẹn lời, ngập ngừng'],
    ],
  }),
  item('mock2', 'jokyo', 5, {
    material: {
      kind: 'scene',
      vi: 'Góc pha trà trong văn phòng. Một người phụ nữ chỉ vào tờ thông báo dán trên cửa tủ lạnh. Một người đàn ông cầm cốc nhìn theo. Qua cánh cửa tủ lạnh đang mở thấy vài hộp cơm và chai nước dán tên.',
    },
    script: [
      ['女', 'これ、見ました？金曜の夕方に、中に入っているもの、全部処分するんですって。', 'Anh xem cái này chưa? Chiều thứ sáu họ sẽ bỏ hết mọi thứ để bên trong đấy.'],
      ['男', 'え、名前を書いてあっても？', 'Hả, ghi tên rồi cũng bỏ à?'],
      ['女', '書いてあっても、だそうです。古いお弁当が奥に入ったままで、においがひどいって苦情が出たらしくて。', 'Nghe nói ghi tên cũng vậy. Hình như có hộp cơm cũ để mãi trong góc, bị phàn nàn là mùi kinh khủng.'],
      ['男', 'そうなんだ。じゃあ、僕が置いてるお茶も、木曜のうちに持って帰らないと。金曜の何時ですか。', 'Ra vậy. Thế thì chai trà tôi để trong đó cũng phải mang về trong thứ năm. Thứ sáu mấy giờ?'],
      ['女', '五時だそうです。私も、置きっぱなしのジャム、持って帰らなきゃ。', 'Nghe nói năm giờ. Tôi cũng phải mang lọ mứt để quên trong đó về.'],
    ],
    questions: [
      [
        '二人は何について話していますか。',
        ['冷蔵庫の中のにおい', '冷蔵庫の中のお茶', '冷蔵庫の中の片付け', '冷蔵庫の中の温度'],
        2,
        'Thông báo là chiều thứ sáu sẽ bỏ hết đồ bên trong, nên người đàn ông định mang đồ về trước: chủ đề là dọn dẹp tủ lạnh. Chữ 片付け không được nói. Lựa chọn 1 (mùi) là lý do dẫn tới việc dọn, và lựa chọn 2 (trà) là đồ của người đàn ông; cả hai đều dùng chữ nghe được trong băng.',
      ],
    ],
    points: [
      ['処分する', 'しょぶんする', 'vứt bỏ, xử lý'],
      ['苦情が出る', 'くじょうがでる', 'có lời phàn nàn'],
    ],
  }),

  // ── 資料聴読解 ──
  item('mock2', 'shiryo', 1, {
    material: {
      kind: 'text',
      body: '日時：2026年12月3日（木）10:00〜11:00\n場所：第2会議室\n\n1. 前回の確認（5分）\n2. 新製品の販売目標について（20分）\n3. 展示会の役割分担（15分）\n4. その他\n\n持ち物：前回の配布資料',
    },
    script: [['男', 'これ、明日の朝いちばんで、出る人全員にメールで送っておいてもらえますか。前の資料を持ってこない人が多いので、そこは目立つようにしてください。', 'Cái này em gửi email cho tất cả những người tham dự ngay sáng mai được không? Nhiều người hay quên mang tài liệu lần trước, nên chỗ đó làm cho nổi bật nhé.']],
    questions: [
      [
        'これは、何の書類ですか。',
        ['会議の議事録', '会議の案内と議題', '会議室の予約票', '展示会の企画書'],
        1,
        'Giấy có ngày giờ, địa điểm, các mục sẽ bàn kèm số phút, và đồ cần mang: đây là giấy mời họp kèm chương trình, gửi trước cho người dự. Lựa chọn 1 dễ nhầm vì có mục "xác nhận lần trước", nhưng biên bản ghi điều đã quyết, không ghi số phút dự kiến hay đồ cần mang.',
      ],
    ],
    points: [
      ['議題', 'ぎだい', 'chương trình nghị sự, đề mục'],
      ['役割分担', 'やくわりぶんたん', 'phân chia vai trò'],
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
    script: [['女', '来週の金曜日の研修で、朝九時から夕方四時まで、この会議室を使いたいんです。お昼はお弁当を出す予定で。予約は今日のうちに入れようと思っています。', 'Khoá đào tạo thứ sáu tuần sau, tôi muốn dùng phòng họp này từ chín giờ sáng đến bốn giờ chiều. Buổi trưa dự định phát cơm hộp. Tôi định đặt phòng ngay trong hôm nay.']],
    questions: [
      [
        'このままではルールに合わないのはどれですか。',
        ['予約の時期だけ', 'キャンセルの方法', '利用時間と飲食', '飲み物'],
        2,
        'Từ 9 giờ đến 16 giờ là 7 tiếng, vượt mức tối đa 3 tiếng. Cơm hộp là đồ ăn, mà quy định chỉ cho đồ uống. Đặt phòng hôm nay cho thứ sáu tuần sau là trong vòng hai tuần trước ngày dùng, nên hợp lệ.',
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
      title: '株式会社ミナミ工業 御中',
      head: ['品名', '数量', '単価', '金額'],
      rows: [
        ['作業用手袋（L）', '200組', '300円', '60,000円'],
        ['安全靴（26cm）', '20足', '6,500円', '130,000円'],
        ['ヘルメット', '20個', '2,800円', '56,000円'],
        ['合計（税込）', '', '', '246,000円'],
      ],
      note: '発行日：2026年9月10日　有効期限：発行日より30日間',
    },
    script: [['男', '先方から、これと同じ内容で正式に注文したいって連絡があったんだけど、日付を見たら、出してからもう二か月たってるんだよね。', 'Bên kia liên lạc nói muốn đặt hàng chính thức đúng như nội dung này, nhưng nhìn ngày thì đã gửi đi được hai tháng rồi.']],
    questions: [
      [
        '男の人が見ている書類は何ですか。',
        ['注文書', '納品書', '請求書', '見積書'],
        3,
        'Giấy liệt kê hàng, đơn giá, tổng tiền và có "hạn hiệu lực 30 ngày kể từ ngày phát hành": đó là bảng báo giá, gửi trước khi khách đặt hàng. Vì đã quá hai tháng nên báo giá hết hiệu lực. Lựa chọn 1 dễ nhầm vì trong băng có chữ 注文, nhưng đơn đặt hàng là do bên mua gửi, còn giấy này gửi cho Minami Kogyo.',
      ],
    ],
    points: [
      ['見積書', 'みつもりしょ', 'bảng báo giá'],
      ['有効期限', 'ゆうこうきげん', 'hạn hiệu lực'],
      ['単価', 'たんか', 'đơn giá'],
    ],
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
      kind: 'bars',
      title: '社員食堂を利用しない理由（複数回答）',
      unit: '人',
      labels: ['混んでいる', 'メニューが少ない', '値段が高い', '席が足りない'],
      series: [{ name: '回答数', values: [86, 41, 18, 77] }],
    },
    script: [['女', '来年度の予算を申請するときに、この結果をつけて出そうと思っているんです。数字があったほうが、上も判断しやすいでしょうから。', 'Khi xin ngân sách năm tới, tôi định nộp kèm kết quả này. Có con số thì cấp trên cũng dễ quyết định hơn.']],
    questions: [
      [
        'この資料は、何のために使われますか。',
        ['食堂の値段を上げるため', '新しいメニューを宣伝するため', '食堂の利用時間を決めるため', '食堂を広げる費用を求めるため'],
        3,
        'Lý do nhiều nhất là "đông" (86) và "thiếu chỗ ngồi" (77), và người nói định nộp kèm khi xin ngân sách: tài liệu dùng để xin tiền mở rộng nhà ăn. Lựa chọn 1 ngược với tài liệu (giá đắt là lý do ít nhất). Lựa chọn 2 dễ nhầm vì có mục "ít món", nhưng đó không phải lý do chính và không cần xin ngân sách.',
      ],
    ],
    points: [
      ['社員食堂', 'しゃいんしょくどう', 'nhà ăn nhân viên'],
      ['申請する', 'しんせいする', 'xin, đề nghị (chính thức)'],
    ],
  }),
  item('mock2', 'shiryo', 9, {
    material: {
      kind: 'text',
      body: '山下 翔 様\n\n拝啓　時下ますますご清祥のこととお喜び申し上げます。\nこのたびは、弊社の採用選考にご応募いただき、誠にありがとうございました。\n慎重に選考を重ねました結果、誠に残念ながら、今回はご希望に添いかねる結果となりました。\n末筆ながら、山下様の今後のご活躍をお祈り申し上げます。\n敬具\n\n株式会社オオトリ　人事部',
    },
    script: [['女', 'これ、今日の午後に、二次面接を受けた方に郵送する分なんですけど、宛名に間違いがないか、確認をお願いできますか。', 'Cái này chiều nay sẽ gửi bưu điện cho những người đã phỏng vấn vòng hai, anh kiểm tra giúp xem tên người nhận có sai không được không?']],
    questions: [
      [
        'これは、何を知らせる文書ですか。',
        ['面接の日時', '採用の決定', '不採用の結果', '書類の提出期限'],
        2,
        '"今回はご希望に添いかねる結果" là cách nói lịch sự của "không được tuyển", và "chúc anh thành công sau này" là câu kết quen thuộc của thư báo trượt. Lựa chọn 1 dễ nhầm vì người nói nhắc "phỏng vấn vòng hai", nhưng thư gửi cho người đã phỏng vấn xong.',
      ],
    ],
    points: [
      ['選考', 'せんこう', 'tuyển chọn'],
      ['希望に添いかねる', 'きぼうにそいかねる', 'không thể đáp ứng nguyện vọng'],
      ['末筆ながら', 'まっぴつながら', 'cuối thư xin…'],
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
      kind: 'table',
      title: '北陽システム周辺の地図（上が北、空白は道路）',
      head: [],
      rows: [
        ['ホテル', '駐車場', '', '【1】', '市民ホール'],
        ['', '', '', '', ''],
        ['【2】', '学校', '', '【3】', '銀行'],
        ['', '', '', '', ''],
        ['バス停', 'ガソリンスタンド', '', '【4】', 'コンビニ'],
      ],
    },
    script: [
      ['男', 'もしもし、三時にお約束している東西物産の木下です。すみません、ちょっと道に迷ってしまいまして。', 'A lô, tôi là Kinoshita của Touzai Bussan, có hẹn lúc ba giờ. Xin lỗi, tôi bị lạc đường một chút.'],
      ['女', '木下様、お電話ありがとうございます。今、どちらにいらっしゃいますか。', 'Thưa anh Kinoshita, cảm ơn anh đã gọi. Hiện anh đang ở đâu ạ?'],
      ['男', 'バス停で降りて、少し歩いたんですが…今、ガソリンスタンドの前にいます。', 'Tôi xuống ở bến xe buýt rồi đi bộ một đoạn… giờ đang ở trước cây xăng.'],
      ['女', 'かしこまりました。では、そのままバス停と反対の方向に進んでいただけますか。すぐに大きな交差点がありますので、そこを左に曲がってください。', 'Vâng ạ. Vậy anh cứ đi tiếp theo hướng ngược với bến xe buýt. Sẽ gặp ngay một ngã tư lớn, anh rẽ trái ở đó.'],
      ['男', '左ですね。はい。', 'Rẽ trái. Vâng.'],
      ['女', 'そのまま、一つ先の交差点まで行っていただいて、そこを右です。右に曲がりますと、右側の奥に銀行がございます。弊社は、その手前の、灰色の五階建てのビルでございます。', 'Anh đi thẳng đến ngã tư tiếp theo rồi rẽ phải. Rẽ phải xong thì phía bên phải, xa hơn một chút có ngân hàng. Công ty chúng tôi là toà nhà năm tầng màu xám ngay trước ngân hàng.'],
      ['男', 'あ、今、角を曲がりました。道の反対側にも、似たような灰色のビルがありますね。', 'À, tôi vừa rẽ ở góc. Phía bên kia đường cũng có một toà nhà xám trông giống vậy.'],
      ['女', 'はい、そちらは別の会社でございます。入口に「北陽システム」という看板がございますので、お確かめください。', 'Vâng, toà đó là công ty khác ạ. Ở lối vào có biển "Hokuyo System", anh xem giúp nhé.'],
      ['男', 'わかりました。遅くなってしまって、申し訳ありません。', 'Tôi hiểu rồi. Xin lỗi vì đến muộn.'],
      ['女', 'とんでもないです。お気をつけてお越しください。受付でお待ちしております。', 'Không có gì ạ. Anh đi cẩn thận. Chúng tôi chờ anh ở quầy lễ tân.'],
    ],
    questions: [
      [
        '北陽システムはどこですか。',
        ['【1】', '【2】', '【3】', '【4】'],
        2,
        'Từ cây xăng đi ngược hướng bến xe buýt (sang đông), rẽ trái ở ngã tư lớn (lên bắc), đến ngã tư tiếp theo rẽ phải (sang đông); bên phải là ngân hàng ở xa, công ty ngay trước ngân hàng → 【3】. 【1】 là toà nhà xám ở phía bên kia đường, người phụ nữ nói là công ty khác. 【4】 nằm bên đường thứ nhất, phía nam, đoàn không đi ngang qua; 【2】 là khi rẽ trái thay vì rẽ phải ở ngã tư thứ hai.',
      ],
    ],
    points: [
      ['道に迷う', 'みちにまよう', 'lạc đường'],
      ['お越しください', 'おこしください', 'xin mời đến (tôn kính ngữ)'],
      ['手前', 'てまえ', 'phía trước (trước khi tới)'],
    ],
  }),
  item('mock2', 'sogo-chodokkai', 2, {
    material: {
      kind: 'table',
      title: '健康診断 会場（本社3階）',
      head: [],
      rows: [
        ['【1】身長・体重', '受付', '【2】血液検査'],
        ['', '', ''],
        ['【3】診察', 'エレベーター', '【4】視力・聴力'],
      ],
    },
    script: [
      ['女', '人事部からお知らせします。本日の健康診断は、本社三階で、午前九時から十二時まで行います。まだ受けていない方は、時間内に必ずお越しください。', 'Phòng nhân sự xin thông báo. Khám sức khoẻ hôm nay tổ chức ở tầng ba trụ sở, từ chín giờ đến mười hai giờ trưa. Ai chưa khám, xin nhất định đến trong khung giờ này.'],
      ['女', 'エレベーターを降りて、正面の受付で、問診票を出してください。問診票を忘れた方は、受付で新しい用紙をお渡しします。', 'Ra khỏi thang máy, xin nộp phiếu hỏi bệnh ở quầy tiếp đón phía trước mặt. Ai quên phiếu hỏi bệnh thì quầy sẽ phát tờ mới.'],
      ['女', '例年は、受付のあと、身長・体重の測定から始めていただいていましたが、毎年、午前中は身長・体重の前に長い列ができてしまいます。', 'Mọi năm, sau quầy tiếp đón thì bắt đầu từ đo chiều cao, cân nặng, nhưng năm nào buổi sáng cũng có hàng dài trước chỗ đo chiều cao, cân nặng.'],
      ['女', 'そこで今年は、三十五歳以上で血液検査がある方だけ、受付のあと、身長・体重に進んでください。三十五歳未満の方は、血液検査がありませんので、先に視力・聴力の検査を受けてから、身長・体重に回ってください。', 'Vì vậy năm nay, chỉ những người từ ba mươi lăm tuổi trở lên có xét nghiệm máu thì sau quầy tiếp đón đi đo chiều cao, cân nặng. Người dưới ba mươi lăm tuổi không có xét nghiệm máu, nên hãy khám mắt và tai trước, rồi mới sang đo chiều cao, cân nặng.'],
      ['女', 'なお、血液検査がある方は、朝食を取らずにお越しください。お水は飲んでいただいてかまいません。検査の順番を間違えますと、もう一度並んでいただくことになりますので、ご注意ください。', 'Ngoài ra, ai có xét nghiệm máu xin đừng ăn sáng trước khi đến. Uống nước thì không sao. Nếu đi sai thứ tự sẽ phải xếp hàng lại, xin lưu ý.'],
      ['女', '最後は、どなたも医師の診察です。診察が終わったら、問診票の控えを受付に戻して、終了となります。ご協力をお願いいたします。', 'Cuối cùng, ai cũng khám với bác sĩ. Khám xong thì trả lại bản lưu phiếu hỏi bệnh cho quầy tiếp đón là kết thúc. Mong mọi người hợp tác.'],
    ],
    questions: [
      [
        '二十八歳の社員は、受付のあと、まずどこへ行きますか。',
        ['【1】', '【2】', '【3】', '【4】'],
        3,
        'Người dưới 35 tuổi không có xét nghiệm máu, năm nay đi khám mắt và tai trước → 【4】. 【1】 (cân đo) là thứ tự của mọi năm, và năm nay chỉ dành cho người từ 35 tuổi. 【3】 khám bác sĩ là bước cuối. 【2】 xét nghiệm máu không áp dụng cho người 28 tuổi.',
      ],
    ],
    points: [
      ['問診票', 'もんしんひょう', 'phiếu hỏi bệnh'],
      ['控え', 'ひかえ', 'bản lưu'],
      ['診察', 'しんさつ', 'khám bệnh (bác sĩ khám)'],
    ],
  }),
  item('mock2', 'sogo-chodokkai', 3, {
    material: {
      kind: 'table',
      title: 'さくら台店 勤務表（2026年12月7日〜10日）',
      head: ['', '7日（月）', '8日（火）', '9日（水）', '10日（木）'],
      rows: [
        ['早番', '佐藤', '【1】田中', '佐藤', '【2】木村'],
        ['遅番', '【3】木村', '佐藤', '【4】田中', '田中'],
      ],
    },
    script: [
      ['女', '店長、すみません。来週の火曜の朝、どうしても病院に行かなければならなくなりまして…。', 'Cửa hàng trưởng, xin lỗi anh. Sáng thứ ba tuần sau em bắt buộc phải đi bệnh viện…'],
      ['男', '病院か。それは仕方ないね。火曜の早番か。佐藤さんは火曜は遅番だから、続けて入ってもらうと、一日十時間を超えちゃうな。それはできないし。', 'Ca sớm thứ ba à. Chị Sato thứ ba làm ca muộn, mà làm liền cả hai ca thì quá mười tiếng một ngày. Thế thì không được.'],
      ['女', 'はい、それは申し訳ないので…。木村さんにお願いできないでしょうか。', 'Vâng, như vậy thì phiền chị ấy quá… Có thể nhờ cậu Kimura được không ạ?'],
      ['男', '木村さんは、火曜は大学の授業が午後からだって言ってたから、朝なら入れると思う。その代わり、田中さんが木村さんの勤務を一つ引き受けてくれる？木曜の早番はどう？', 'Cậu Kimura nói thứ ba chiều mới có giờ học ở trường, nên buổi sáng chắc làm được. Đổi lại, em nhận giúp cậu ấy một ca được không? Ca sớm thứ năm thì sao?'],
      ['女', '木曜の朝は、子どもを学校に送っていくので、早番はちょっと…。夕方からでしたら大丈夫なんですが。', 'Sáng thứ năm em phải đưa con đi học, nên ca sớm thì hơi… Từ chiều thì em làm được.'],
      ['男', '木曜の遅番は、もともと田中さんだしね。じゃあ、月曜の遅番はどう？', 'Ca muộn thứ năm thì vốn đã là của em rồi. Vậy ca muộn thứ hai thì sao?'],
      ['女', '月曜の夕方なら大丈夫です。ありがとうございます。', 'Chiều thứ hai thì em làm được. Cảm ơn anh.'],
      ['男', 'じゃあ、木村さんには私から話しておくよ。表は決まったら書き直して、休憩室に貼っておいて。', 'Vậy tôi sẽ nói với cậu Kimura. Chốt xong thì em sửa lại bảng rồi dán ở phòng nghỉ nhé.'],
      ['女', 'はい、今日の帰りまでに書き直して貼っておきます。ご迷惑をおかけして、すみません。', 'Vâng, trước khi về hôm nay em sẽ sửa và dán lên. Em xin lỗi vì đã làm phiền anh.'],
      ['男', 'いや、早めに言ってくれて助かったよ。', 'Không, em báo sớm thế là tốt rồi.'],
    ],
    questions: [
      [
        '田中さんは、勤務表のどこに入ることになりましたか。',
        ['【1】', '【2】', '【3】', '【4】'],
        2,
        'Kimura nhận ca sớm thứ ba (【1】) của Tanaka; đổi lại Tanaka nhận một ca của Kimura. Ca sớm thứ năm (【2】) bị từ chối vì phải đưa con đi học, nên chốt ca muộn thứ hai → 【3】. 【1】 là ca gốc của Tanaka, chị không làm được. 【4】 là ca chị vốn có, không thay đổi.',
      ],
    ],
    points: [
      ['早番', 'はやばん', 'ca sớm'],
      ['遅番', 'おそばん', 'ca muộn'],
      ['引き受ける', 'ひきうける', 'nhận (làm)'],
    ],
  }),
  item('mock2', 'sogo-chodokkai', 4, {
    material: {
      kind: 'table',
      title: '中途入社者向け 研修（2027年4月）',
      head: ['', '研修名', '日程', '対象'],
      rows: [
        ['【1】', '社内システムの操作', '4月8日', '全員'],
        ['【2】', 'ビジネスマナー基礎', '4月9日', '新卒・中途'],
        ['【3】', '製品知識', '4月12日', '営業職'],
        ['【4】', 'コンプライアンス', '4月13日', '全員（必修）'],
      ],
    },
    script: [
      ['女', '課長、四月から経理に入る鈴木さんの研修なんですが、どれを受けてもらいましょうか。経験のある方なので、必要なものだけに絞ろうと思うんですが。', 'Thưa trưởng phòng, về đào tạo cho anh Suzuki vào phòng kế toán từ tháng tư, mình cho anh ấy học khoá nào ạ? Anh ấy là người có kinh nghiệm, nên em định chỉ chọn những khoá cần thiết.'],
      ['男', 'うん、それがいい。研修ばかりだと、本人も退屈だろうしね。コンプライアンスは必修だから、それは決まりだね。', 'Ừ, thế là phải. Toàn đi học thì chắc bản thân anh ấy cũng chán. Khoá tuân thủ pháp luật là bắt buộc, cái đó chắc chắn rồi.'],
      ['女', 'はい。マナーはいかがでしょう。中途の方も対象になっていますが。', 'Vâng. Còn khoá phép lịch sự thì sao ạ? Người vào giữa chừng cũng thuộc đối tượng.'],
      ['男', '鈴木さんは前の会社で十年働いてきた人だから、今さらマナーはいいでしょう。それより、うちのシステムは独自のものだから、操作は覚えてもらわないと困る。', 'Anh Suzuki đã làm mười năm ở công ty cũ, giờ học phép lịch sự thì không cần. Quan trọng hơn, hệ thống của mình là loại riêng, phải học cách thao tác mới được.'],
      ['女', '製品知識は、営業向けですけど、経理でも製品のことがわかっていると、請求書のチェックが楽になると思うんです。', 'Khoá kiến thức sản phẩm là cho kinh doanh, nhưng em nghĩ kế toán mà hiểu về sản phẩm thì kiểm tra hoá đơn sẽ dễ hơn.'],
      ['男', 'それはそうなんだけど、十二日は月初めの締めの作業があって、新しい人でも手が要るんだよ。製品のことは、入ってから少しずつ教えればいい。', 'Đúng là vậy, nhưng ngày mười hai có việc khoá sổ đầu tháng, người mới cũng cần thêm tay. Chuyện sản phẩm thì vào làm rồi dạy dần cũng được.'],
      ['女', 'わかりました。では、その二つで申し込んでおきます。締め切りが今月末なので、今日中に出しておきます。', 'Em hiểu rồi. Vậy em đăng ký hai khoá đó. Hạn chót là cuối tháng này, nên em nộp ngay trong hôm nay.'],
      ['男', 'ありがとう。鈴木さんへの連絡もお願いね。', 'Cảm ơn em. Nhờ em báo cho anh Suzuki luôn nhé.'],
    ],
    questions: [
      [
        '鈴木さんが受ける研修はどれとどれですか。',
        ['【1】と【3】', '【1】と【4】', '【2】と【3】', '【2】と【4】'],
        1,
        'Tuân thủ pháp luật (【4】) là bắt buộc; thao tác hệ thống (【1】) cần vì hệ thống là loại riêng. Phép lịch sự (【2】) không cần vì anh Suzuki đã làm mười năm. Kiến thức sản phẩm (【3】) có lợi nhưng ngày 12 trùng việc khoá sổ, nên không học. Lựa chọn 1 (【1】と【3】) dễ nhầm vì trưởng phòng đồng ý "đúng là vậy" trước khi từ chối.',
      ],
    ],
    points: [
      ['中途入社', 'ちゅうとにゅうしゃ', 'vào công ty giữa chừng (tuyển người có kinh nghiệm)'],
      ['必修', 'ひっしゅう', 'bắt buộc'],
      ['締め', 'しめ', 'khoá sổ, chốt (số liệu)'],
    ],
  }),
  item('mock2', 'sogo-chodokkai', 5, {
    material: {
      kind: 'text',
      title: '事務所移転 作業リスト（総務課）',
      body: '事務所移転 作業リスト\n\n【1】取引先へ移転の案内状を送る\n【2】新事務所の電話回線を申し込む\n【3】新しい住所の名刺を作る\n【4】郵便物の転送届を出す\n\n移転日：2027年1月15日（金）',
    },
    script: [
      ['男', '移転まで、あと二か月か。リストの作業、今どうなってる？', 'Còn hai tháng nữa là chuyển văn phòng. Các việc trong danh sách giờ thế nào rồi?'],
      ['女', '案内状は先週、全部出しました。何通か、宛先不明で戻ってきてしまったんですが、営業に正しい住所を聞いて、昨日送り直しました。', 'Thư thông báo em đã gửi hết tuần trước. Có vài lá bị trả về vì không rõ địa chỉ, nhưng em đã hỏi phòng kinh doanh địa chỉ đúng và hôm qua gửi lại rồi.'],
      ['男', 'そう。戻ってきたのは何通ぐらい？', 'Vậy à. Bị trả về khoảng bao nhiêu lá?'],
      ['女', '五通です。どれも、届け先の会社のほうが移転していました。', 'Năm lá ạ. Lá nào cũng là do công ty nhận đã chuyển địa chỉ.'],
      ['男', 'なるほどね。電話は？番号は変わらないんだよね。', 'Ra vậy. Còn điện thoại? Số không đổi đúng không.'],
      ['女', 'はい、今の番号がそのまま使えます。回線の申し込みは済んでいて、工事の日が十二月の二十日に決まりました。', 'Vâng, số hiện tại dùng tiếp được. Đăng ký đường dây xong rồi, ngày thi công đã chốt là hai mươi tháng mười hai.'],
      ['男', '名刺は？新しい住所のじゃないと、年明けにお客様に会うとき困るよね。', 'Danh thiếp? Không có cái in địa chỉ mới thì sang năm gặp khách sẽ khó.'],
      ['女', 'それが、昨日届きまして、もう皆さんに配りました。使うのは移転してからにしてくださいね、とお伝えしてあります。', 'Cái đó hôm qua đã tới, em phát cho mọi người rồi. Em có dặn là chuyển xong mới dùng.'],
      ['男', 'じゃあ、あとは郵便局か。', 'Vậy còn lại là bưu điện nhỉ.'],
      ['女', 'はい…。先週、窓口に行ったんですが、会社の場合は、移転したことがわかる書類が要ると言われまして。今、それを用意しているところです。', 'Vâng… Tuần trước em đã ra quầy, nhưng họ nói trường hợp công ty thì cần giấy tờ chứng minh việc chuyển địa điểm. Em đang chuẩn bị giấy đó.'],
      ['男', 'わかった。年末は窓口も混むから、早めにね。', 'Được rồi. Cuối năm quầy cũng đông, làm sớm nhé.'],
      ['女', 'はい、書類がそろい次第、今週中に出しに行きます。', 'Vâng, giấy tờ đủ là trong tuần này em đi nộp ngay.'],
    ],
    questions: [
      [
        'リストの中で、まだ終わっていない作業はどれですか。',
        ['【1】', '【2】', '【3】', '【4】'],
        3,
        'Thủ tục chuyển tiếp bưu phẩm (【4】) chưa nộp được vì thiếu giấy chứng minh, đang chuẩn bị. Thư thông báo (【1】) đã gửi lại xong; đường dây (【2】) đã đăng ký, chỉ ngày thi công là sau; danh thiếp (【3】) đã có và đã phát. 【2】 dễ nhầm vì việc thi công tháng mười hai mới làm, nhưng việc trong danh sách là "đăng ký".',
      ],
    ],
    points: [
      ['案内状', 'あんないじょう', 'thư thông báo'],
      ['宛先不明', 'あてさきふめい', 'không rõ địa chỉ người nhận'],
      ['転送届', 'てんそうとどけ', 'đơn chuyển tiếp bưu phẩm'],
    ],
  }),
  item('mock2', 'sogo-chodokkai', 6, {
    material: {
      kind: 'text',
      title: '社内報「新しい仲間」原稿',
      body: '今月、大阪支社から本社営業部に異動してきた西田まゆみさんを紹介します。【1】\n西田さんは入社八年目。大阪では、主に飲食店向けの営業を担当してきました。【2】\n休日は、ご家族と山登りを楽しんでいるそうです。【3】\n本社でも、持ち前の明るさで活躍してくれることでしょう。【4】',
    },
    script: [
      ['女', '社内報の西田さんの紹介、読んでいただけましたか。来月号に載せる予定なので、今週中に仕上げたいんです。', 'Anh đọc bài giới thiệu chị Nishida trên bản tin nội bộ chưa ạ? Bài sẽ đăng số tháng sau, nên em muốn hoàn thành trong tuần này.'],
      ['男', '読んだよ。趣味の話があるのは、親しみが持てていいね。よくまとまってるけど、仕事の成果が何も書いてないね。大阪で担当した店の数が、三年で二倍になったって聞いてるよ。それは入れたほうがいい。', 'Đọc rồi. Viết gọn gàng đấy, nhưng chưa có gì về thành tích công việc. Tôi nghe nói số cửa hàng chị ấy phụ trách ở Osaka tăng gấp đôi trong ba năm. Nên thêm cái đó vào.'],
      ['女', 'そうですね。では、最後の一文の前に入れるのはどうでしょう。結びの前に、すごさが伝わるように。', 'Đúng vậy ạ. Thế đặt trước câu cuối thì sao ạ? Để trước phần kết người đọc thấy được chị ấy giỏi thế nào.'],
      ['男', 'うーん、山登りの話の後に急に仕事の話に戻ると、読みにくいよ。', 'Ừm, đang chuyện leo núi mà quay ngoắt về chuyện công việc thì khó đọc.'],
      ['女', 'じゃあ、紹介の最初、一文目のすぐ後は？', 'Vậy ngay sau câu đầu tiên, phần mở đầu thì sao ạ?'],
      ['男', 'それだと、どんな仕事をしていた人かわからないうちに数字が出てくるでしょう。担当してきた仕事を書いた、そのすぐ後に続けるのが自然だね。', 'Thế thì con số xuất hiện khi người đọc còn chưa biết chị ấy làm việc gì. Đặt ngay sau câu viết về công việc chị ấy phụ trách là tự nhiên nhất.'],
      ['女', 'わかりました。数字は、西田さんご本人に確認してから入れますね。', 'Em hiểu rồi. Con số thì em sẽ hỏi lại chính chị Nishida rồi mới ghi vào.'],
      ['男', 'そうだね。二倍っていうのは、大阪の部長から聞いた話だから。間違っていたら失礼だし。それと、載せる写真は、西田さんに選んでもらってね。', 'Ừ. Chuyện gấp đôi là tôi nghe trưởng bộ phận ở Osaka kể. Sai thì thất lễ lắm. Còn ảnh đăng kèm thì nhờ chị Nishida tự chọn nhé.'],
      ['女', 'はい、明るい感じのものをお願いしておきます。', 'Vâng, em sẽ nhờ chị ấy chọn tấm nào trông tươi tắn.'],
    ],
    questions: [
      [
        '担当した店の数についての文は、どこに入れますか。',
        ['【1】', '【2】', '【3】', '【4】'],
        1,
        'Trưởng phòng muốn đặt ngay sau câu viết về công việc (phụ trách kinh doanh cho nhà hàng) → 【2】. 【3】 (trước câu kết, sau chuyện leo núi) là đề xuất đầu của người phụ nữ, bị bác vì khó đọc. 【1】 bị bác vì người đọc chưa biết chị ấy làm gì.',
      ],
    ],
    points: [
      ['社内報', 'しゃないほう', 'bản tin nội bộ'],
      ['異動', 'いどう', 'thuyên chuyển'],
      ['持ち前の', 'もちまえの', 'vốn có, bẩm sinh'],
    ],
  }),
  item('mock2', 'sogo-chodokkai', 7, {
    material: {
      kind: 'table',
      title: '工場見学ルート（上が北、空白は構内の道）',
      head: [],
      rows: [
        ['【1】組立工場', '', '【2】倉庫'],
        ['', '', ''],
        ['【3】研究棟', '本館（集合）', '【4】展示室'],
      ],
    },
    script: [
      ['男', '皆様、本日は当社の工場見学にお越しいただき、ありがとうございます。案内を担当します、広報課の村井です。', 'Kính thưa quý vị, cảm ơn quý vị đã đến tham quan nhà máy của chúng tôi hôm nay. Tôi là Murai ở phòng truyền thông, phụ trách hướng dẫn.'],
      ['男', 'お手元のパンフレットには、四か所を回るルートが書いてありますが、本日は一部変更があります。', 'Tờ giới thiệu quý vị đang cầm ghi lộ trình đi bốn nơi, nhưng hôm nay có một số thay đổi.'],
      ['男', 'まず、この本館のすぐ東にある展示室で、当社の製品の歴史をご覧いただきます。そのあと北に進んで、組立工場に入ります。', 'Trước hết, quý vị xem lịch sử sản phẩm của công ty ở phòng trưng bày ngay phía đông toà nhà chính này. Sau đó đi về phía bắc, vào xưởng lắp ráp.'],
      ['男', 'あ、失礼しました。展示室から北へは、そのまま倉庫の前を通って、それから西の組立工場へ向かいます。倉庫は、本日は床の工事中ですので、中には入らず、前を通るだけになります。', 'À, xin lỗi. Từ phòng trưng bày đi lên phía bắc thì đi ngang trước nhà kho, rồi mới sang xưởng lắp ráp ở phía tây. Hôm nay nhà kho đang sửa sàn, nên chúng ta không vào trong mà chỉ đi ngang qua.'],
      ['男', '組立工場の中では、フォークリフトが動いています。入口でヘルメットをお配りしますので、必ずかぶって、床の黄色い線の内側を歩いてください。', 'Trong xưởng lắp ráp có xe nâng đang chạy. Ở lối vào chúng tôi sẽ phát mũ bảo hộ, xin nhất định đội vào và đi bên trong vạch vàng trên sàn.'],
      ['男', '最後に研究棟をご案内します。研究棟の中は撮影ができませんので、カメラや携帯電話はかばんにしまってください。', 'Cuối cùng tôi hướng dẫn quý vị vào khu nghiên cứu. Trong khu nghiên cứu không được chụp ảnh, xin cất máy ảnh và điện thoại vào túi.'],
      ['男', '全体で一時間半ほどです。ご質問は、最後に本館でまとめてお受けします。お手洗いは、本館に戻ってからご利用ください。それでは、出発いたします。', 'Tổng cộng khoảng một tiếng rưỡi. Câu hỏi xin để cuối buổi, chúng tôi trả lời chung ở toà nhà chính. Nhà vệ sinh xin dùng sau khi quay lại toà nhà chính. Bây giờ chúng ta xuất phát.'],
    ],
    questions: [
      [
        '今日の見学で、中に入らないのはどこですか。',
        ['【1】', '【2】', '【3】', '【4】'],
        1,
        'Nhà kho (【2】) đang sửa sàn, đoàn chỉ đi ngang trước, không vào trong. Phòng trưng bày (【4】), xưởng lắp ráp (【1】) và khu nghiên cứu (【3】) đều vào. 【3】 dễ nhầm vì có điều cấm (không chụp ảnh), nhưng vẫn được vào xem.',
      ],
    ],
    points: [
      ['構内', 'こうない', 'trong khuôn viên'],
      ['撮影', 'さつえい', 'chụp ảnh, quay phim'],
      ['お手洗い', 'おてあらい', 'nhà vệ sinh'],
    ],
  }),
  item('mock2', 'sogo-chodokkai', 8, {
    material: {
      kind: 'table',
      title: '展示会ブースの配置（下が通路側）',
      head: [],
      rows: [
        ['【1】', '展示台', '【2】'],
        ['展示台', '商談スペース', 'モニター'],
        ['【3】', '', '【4】'],
      ],
      note: '下の段は通路に面している。空白は出入り口。',
    },
    script: [
      ['男', '来月の展示会の配置図、そろそろ業者さんに出さないといけないんだけど、まだ決まってないのが受付なんだよね。', 'Sơ đồ bố trí cho triển lãm tháng sau sắp phải gửi cho bên thi công rồi, mà chỗ chưa chốt là quầy tiếp đón.'],
      ['男', '受付のテーブル、どこに置こうか。やっぱり通路側の角だよね。来た人の名刺を、入ってすぐにいただけるし。', 'Bàn tiếp đón đặt ở đâu nhỉ. Chắc vẫn là góc phía lối đi. Khách vào là xin được danh thiếp ngay.'],
      ['女', '去年もそうしたんですけど、入口で受付があると、捕まるのが嫌なのか、前を素通りしていく人が多かったんです。', 'Năm ngoái cũng làm vậy, nhưng có bàn tiếp đón ngay lối vào thì nhiều người đi lướt qua, chắc vì ngại bị giữ lại.'],
      ['男', 'そうか…。じゃあ、奥の右の角、モニターのすぐ後ろは？画面を見て足を止めた人に、声をかけやすい。', 'Vậy à… Thế góc trong bên phải, ngay sau màn hình thì sao? Người nào dừng lại xem màn hình thì dễ bắt chuyện.'],
      ['女', 'そこはモニターの電源やケーブルがあって、テーブルを置くと狭くなります。それに、モニターの前に人が集まると、受付まで通れなくなってしまいます。', 'Chỗ đó có nguồn điện và dây cáp của màn hình, đặt bàn vào thì chật. Hơn nữa, người tụ lại trước màn hình thì không ai đi tới bàn tiếp đón được.'],
      ['男', 'じゃあ、残るのは奥の左の角か。でも、奥だとお客様が受付に気づかないかもしれないし、名刺をいただく機会が減らないかな。', 'Thế thì chỉ còn góc trong bên trái. Nhưng ở trong thì khách có thể không để ý thấy bàn tiếp đón, có làm giảm cơ hội xin danh thiếp không?'],
      ['女', '実演を見ていただいたあと、奥で資料をお渡しするときに名刺をいただくほうが、興味のある方の名刺が集まると思います。奥の左なら、荷物置き場にも近いですし。', 'Em nghĩ sau khi khách xem trình diễn, lúc phát tài liệu ở phía trong mà xin danh thiếp thì sẽ thu được danh thiếp của người thật sự quan tâm. Góc trong bên trái thì còn gần chỗ để đồ.'],
      ['男', 'なるほど、数より中身か。わかった、それでいこう。', 'Ra vậy, chất hơn lượng. Được, làm thế đi.'],
      ['女', 'では、配置図を直して、業者さんに送っておきます。', 'Vậy em sửa sơ đồ rồi gửi cho bên thi công.'],
    ],
    questions: [
      [
        '受付のテーブルは、どこに置きますか。',
        ['【1】', '【2】', '【3】', '【4】'],
        0,
        'Góc phía lối đi (【3】, 【4】) bị gạt vì năm ngoái khách đi lướt qua; cạnh màn hình (【2】) chật vì dây cáp. Cuối cùng chọn góc trong bên trái, gần chỗ để đồ → 【1】. 【3】 và 【4】 là đề xuất đầu tiên của người đàn ông.',
      ],
    ],
    points: [
      ['素通りする', 'すどおりする', 'đi lướt qua'],
      ['足を止める', 'あしをとめる', 'dừng chân'],
      ['実演', 'じつえん', 'trình diễn thực tế'],
    ],
  }),
  item('mock2', 'sogo-chodokkai', 9, {
    material: {
      kind: 'table',
      title: '12月の納品予定（ミドリ食品 → レストラン花水木）',
      head: ['', '日付', '品物', '数量'],
      rows: [
        ['【1】', '12月3日（木）', '米', '20袋'],
        ['【2】', '12月10日（木）', '油', '30本'],
        ['【3】', '12月17日（木）', '米', '20袋'],
        ['【4】', '12月24日（木）', '小麦粉', '40袋'],
      ],
    },
    script: [
      ['男', 'もしもし、花水木の店長様でいらっしゃいますか。いつもお世話になっております。ミドリ食品の配送担当、岡田でございます。十二月の納品の件で、お電話いたしました。またあとでおかけしますが、先に用件をお伝えいたします。', 'A lô, xin hỏi có phải cửa hàng trưởng nhà hàng Hanamizuki không ạ. Cảm ơn anh luôn ủng hộ. Tôi là Okada, phụ trách giao hàng của Midori Shokuhin. Tôi gọi về việc giao hàng tháng mười hai. Lát nữa tôi sẽ gọi lại, nhưng xin báo trước nội dung.'],
      ['男', '先日はお電話で、年末の追加のご注文もいただきまして、ありがとうございました。', 'Cảm ơn anh hôm trước đã gọi điện đặt thêm hàng cho dịp cuối năm.'],
      ['男', 'まず、十日の油ですが、先日いただいた、本数を増やしたいというご連絡、承知いたしました。お届けの日は変わりません。', 'Trước hết, về dầu ăn ngày mười, chúng tôi đã nhận được yêu cầu tăng số chai hôm trước. Ngày giao không thay đổi.'],
      ['男', 'それから、十七日の木曜日ですが、配送のトラックの定期点検が入ってしまいまして、大変申し訳ないのですが、翌日の金曜日にお届けさせていただけないでしょうか。', 'Tiếp theo, về thứ năm ngày mười bảy, xe tải giao hàng phải kiểm tra định kỳ, thật xin lỗi, nhưng cho phép chúng tôi giao vào thứ sáu hôm sau được không ạ.'],
      ['男', '十八日も、いつもどおり午前中に、お店の裏口から伺います。二十四日の分は、年内最後のお届けで量も多いのですが、予定どおり一回でお届けできます。三日の分も、予定どおりです。', 'Ngày mười tám chúng tôi cũng đến vào buổi sáng như mọi khi. Phần ngày hai mươi bốn là lần giao cuối cùng trong năm, số lượng nhiều, nhưng vẫn giao một lần như dự kiến. Phần ngày ba cũng như dự kiến.'],
      ['男', 'ご都合が悪いようでしたら、お手数ですが、岡田までお電話いただけますでしょうか。失礼いたします。', 'Nếu không tiện, phiền anh gọi điện cho Okada. Xin phép chào anh.'],
    ],
    questions: [
      [
        '届く日が変わるのは、どの納品ですか。',
        ['【1】', '【2】', '【3】', '【4】'],
        2,
        'Ngày 17 (【3】) xe tải phải kiểm tra định kỳ, xin dời sang thứ sáu 18. 【2】 dễ nhầm vì có thay đổi, nhưng chỉ đổi số lượng, "ngày giao không đổi". 【4】 tuy nhiều hàng vẫn giao một lần đúng ngày; 【1】 như dự kiến.',
      ],
    ],
    points: [
      ['定期点検', 'ていきてんけん', 'kiểm tra định kỳ'],
      ['承知する', 'しょうちする', 'đã hiểu, xin nhận (khiêm nhường)'],
      ['お手数ですが', 'おてすうですが', 'phiền anh/chị…'],
    ],
  }),
  item('mock2', 'sogo-chodokkai', 10, {
    material: {
      kind: 'text',
      title: '外部研修 参加申込書',
      body: '外部研修 参加申込書\n\n【1】氏名・所属：森田 健（営業二課）\n【2】参加希望日：2027年1月14日（木）\n【3】受講コース：交渉術・初級\n【4】上司の承認：山中課長（承認済み）\n\n提出先：人事部 研修担当',
    },
    script: [
      ['男', '先輩、研修の申込書を書いたんですが、出す前に見ていただけますか。去年のを見ながら書いたので、心配で。', 'Chị ơi, em viết xong đơn đăng ký khoá học rồi, chị xem giúp em trước khi nộp được không? Em vừa nhìn đơn năm ngoái vừa viết nên hơi lo.'],
      ['女', 'いいよ。締め切りはいつ？', 'Được. Hạn nộp là khi nào?'],
      ['男', '今週の金曜です。', 'Thứ sáu tuần này ạ.'],
      ['女', 'どれどれ。字はきれいに書けてるね。コースは初級なんだね。森田君、初級は去年受けたんじゃなかった？', 'Được. Khoá sơ cấp à. Kỳ năm ngoái em học sơ cấp rồi còn gì?'],
      ['男', 'それが、去年は申し込んだんですけど、急な出張で受けられなかったんです。', 'Chuyện là năm ngoái em đăng ký nhưng đi công tác đột xuất nên không học được ạ.'],
      ['女', 'そうだったんだ。じゃあ、初級でいいね。日にちは十四日か。その日、部の会議じゃなかった？', 'Ra vậy. Thế thì sơ cấp là đúng. Ngày mười bốn à. Hôm đó không phải có họp phòng sao?'],
      ['男', '会議は十五日に移ったって、昨日メールが来ました。念のため、課長にも確認してあります。', 'Hôm qua có email báo cuộc họp dời sang ngày mười lăm rồi ạ. Để cho chắc em cũng đã hỏi lại trưởng phòng.'],
      ['女', 'あ、そう。課長のはんこももらってあるね。…あれ、ちょっと待って。森田君、この四月から一課に移ったでしょう。ここ、去年のまま写しちゃったんじゃない？', 'À, vậy à. Cũng có dấu của trưởng phòng rồi. …Ơ, khoan đã. Em chuyển sang tổ một từ tháng tư rồi mà. Chỗ này có phải em chép nguyên của năm ngoái không?'],
      ['男', 'あっ、本当だ。すみません、すぐ書き直します。', 'A, đúng thật. Em xin lỗi, em sửa ngay.'],
      ['女', '人事は書き間違いがあると受け付けてくれないから、気をつけてね。', 'Phòng nhân sự thấy viết sai là không nhận đâu, cẩn thận nhé.'],
      ['男', 'ありがとうございます。助かりました。書き直したら、もう一度見ていただけますか。', 'Cảm ơn chị. Chị giúp em nhiều quá. Em sửa xong chị xem lại giúp em lần nữa được không ạ?'],
    ],
    questions: [
      [
        '申込書で、書き直すのはどこですか。',
        ['【1】', '【2】', '【3】', '【4】'],
        0,
        'Morita đã chuyển sang tổ một (一課) từ tháng tư, nhưng chép nguyên "tổ hai" của năm ngoái → sửa 【1】. Khoá sơ cấp (【3】) đúng vì năm ngoái chưa học được; ngày 14 (【2】) đúng vì cuộc họp đã dời sang 15; dấu trưởng phòng (【4】) đã có. Mỗi mục đều có một lý do để nghi ngờ, chỉ 【1】 là sai thật.',
      ],
    ],
    points: [
      ['申込書', 'もうしこみしょ', 'đơn đăng ký'],
      ['受講', 'じゅこう', 'tham gia khoá học'],
      ['写す', 'うつす', 'chép lại'],
    ],
  }),
];

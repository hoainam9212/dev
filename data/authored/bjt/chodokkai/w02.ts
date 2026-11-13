import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/** Week 2 — telephone and receiving visitors. Level: J2 → J1. */
export const W02: BjtItem[] = [
  item('w02', 'jokyo', 1, {
    material: {
      kind: 'table',
      title: '伝言メモ',
      head: ['メモ', '相手', '用件', '折り返し'],
      rows: [
        ['A', '丸山商会 青山様', '来週の会議の場所変更', '携帯へ'],
        ['B', '丸山商会 青木様', '来週の会議の場所変更', '携帯へ'],
        ['C', '丸山商会 青山様', '来週の会議の時間変更', '携帯へ'],
        ['D', '丸山商会 青山様', '来週の会議の場所変更', '会社へ'],
      ],
    },
    script: [
      ['女', '西村さん、さっき丸山商会の青山様からお電話がありました。', 'Anh Nishimura, lúc nãy có anh Aoyama bên Thương hội Maruyama gọi điện.'],
      ['男', '青木さんじゃなくて？', 'Không phải chị Aoki à?'],
      ['女', 'はい、青山様です。来週の会議を、うちではなく丸山商会さんの本社でやりたいそうです。', 'Vâng, anh Aoyama ạ. Anh ấy muốn họp tuần sau ở trụ sở Thương hội Maruyama chứ không phải ở bên mình.'],
      ['男', 'そう。会社に折り返せばいいかな。', 'Vậy à. Tôi gọi lại về công ty họ là được nhỉ?'],
      ['女', '今日は一日外出なので、携帯のほうにお願いしたいとのことでした。', 'Anh ấy nói hôm nay ra ngoài cả ngày nên muốn được gọi vào di động.'],
    ],
    questions: [
      [
        '女の人が書いた伝言メモはどれですか。',
        ['A', 'B', 'C', 'D'],
        0,
        'Ba điểm cần khớp: người gọi là 青山 (không phải 青木), việc là đổi địa điểm (họp ở trụ sở bên kia), gọi lại vào di động. Chỉ A khớp cả ba. D sai ở chỗ gọi về công ty, đúng điều anh Nishimura định làm nhưng bị sửa.',
      ],
    ],
    points: [
      ['折り返す', 'おりかえす', 'gọi lại'],
      ['とのことでした', 'とのことでした', 'nghe nói là, người đó nói rằng'],
    ],
  }),
  item('w02', 'jokyo', 2, {
    material: {
      kind: 'table',
      title: '応接室の配置',
      head: ['', '左', '右'],
      rows: [
        ['奥', '応接室1（窓あり）', '応接室2'],
        ['手前', '応接室3', '応接室4（エレベーター前）'],
      ],
      note: '定員：応接室1・4は6名、応接室2・3は3名',
    },
    script: [
      ['男', '三時のお客様、どの応接室にご案内しましょうか。', 'Khách lúc ba giờ, tôi nên dẫn vào phòng tiếp khách nào ạ?'],
      ['女', '四名様だから、1か4ね。4はエレベーターの前で落ち着かないから、1がいいかな。', 'Khách bốn người nên phòng 1 hoặc 4. Phòng 4 ở trước thang máy, không yên tĩnh, nên phòng 1 thì hơn.'],
      ['男', 'では、1を予約しておきます。', 'Vậy tôi đặt phòng 1 nhé.'],
      ['女', 'あ、待って。1は二時から営業部が使っていて、長引きそうだって言ってた。仕方ないから、エレベーターの前のほうにしましょう。', 'À khoan. Phòng 1 phòng kinh doanh dùng từ hai giờ, nghe nói sẽ kéo dài. Đành vậy, lấy phòng trước thang máy nhé.'],
    ],
    questions: [
      [
        'お客様をどの応接室に案内しますか。',
        ['応接室1', '応接室4', '応接室2', '応接室3'],
        1,
        'Bốn khách nên chỉ phòng 1 hoặc 4 đủ chỗ. Phòng 1 được chọn trước nhưng bị phòng kinh doanh dùng, nên lấy "phòng trước thang máy" = phòng 4. Phòng 2 và 3 chỉ chứa ba người.',
      ],
    ],
    points: [
      ['落ち着かない', 'おちつかない', 'không yên, không thoải mái'],
      ['長引く', 'ながびく', 'kéo dài (hơn dự kiến)'],
      ['定員', 'ていいん', 'sức chứa, số người tối đa'],
    ],
  }),
  item('w02', 'shiryo', 1, {
    material: {
      kind: 'table',
      title: '内線番号表',
      head: ['部署', '内線'],
      rows: [
        ['営業1課', '201'],
        ['営業2課', '202'],
        ['経理部', '301'],
        ['総務部', '302'],
        ['お客様相談室', '400'],
      ],
    },
    script: [
      ['女', '外線を受けたら、用件によってこの表の番号に回してね。', 'Nhận cuộc gọi từ ngoài thì tuỳ việc mà chuyển máy theo số trong bảng này nhé.'],
      ['女', 'お客様から商品の不具合についての電話があったら、本当はお客様相談室なんだけど、今週は相談室が引っ越し中で、総務部が代わりに受けてくれているの。', 'Khách gọi báo sản phẩm bị lỗi thì đúng ra là phòng tư vấn khách hàng, nhưng tuần này phòng đó đang chuyển chỗ nên phòng hành chính nhận thay.'],
      ['女', '請求書のことなら、いつもどおり経理部ね。', 'Còn chuyện hoá đơn thì vẫn là phòng kế toán như mọi khi.'],
    ],
    questions: [
      [
        '今週、商品の不具合についての電話を受けたら、何番に回しますか。',
        ['400', '201', '301', '302'],
        3,
        'Bình thường là 400 (phòng tư vấn khách hàng), nhưng tuần này phòng hành chính (総務部) nhận thay, nên chuyển 302. 301 là kế toán, chỉ dành cho chuyện hoá đơn.',
      ],
    ],
    points: [
      ['内線', 'ないせん', 'máy lẻ nội bộ'],
      ['外線', 'がいせん', 'cuộc gọi từ bên ngoài'],
      ['回す', 'まわす', 'chuyển (cuộc gọi, việc) sang'],
      ['不具合', 'ふぐあい', 'lỗi, trục trặc'],
    ],
  }),
  item('w02', 'shiryo', 2, {
    material: {
      kind: 'bars',
      title: 'お問い合わせ件数',
      unit: '件',
      labels: ['4月', '5月', '6月', '7月'],
      series: [
        { name: '電話', values: [320, 290, 250, 210] },
        { name: 'メール', values: [150, 180, 240, 260] },
      ],
    },
    script: [
      ['男', 'お問い合わせの件数です。電話は減り続けていますが、メールは増えています。', 'Đây là số lượt khách liên hệ. Điện thoại giảm liên tục, còn email thì tăng.'],
      ['男', 'メールが電話を上回ったのは七月が初めてですが、メール担当を一人増やしたのはそれより前です。電話とメールを合わせた件数が、初めて前の月を上回った月からです。', 'Email vượt điện thoại lần đầu là vào tháng bảy, nhưng việc tăng thêm một người phụ trách email thì sớm hơn: từ tháng mà tổng số điện thoại và email lần đầu vượt tháng trước.'],
    ],
    questions: [
      [
        'メール担当を増やしたのは何月からですか。',
        ['4月', '5月', '6月', '7月'],
        2,
        'Tổng hai kênh: tháng 4 là 470, tháng 5 là 470 (bằng, không vượt), tháng 6 là 490 (vượt lần đầu), tháng 7 là 470. Vậy là tháng 6. Tháng 7 là bẫy: đó là lúc email vượt điện thoại.',
      ],
    ],
    points: [
      ['問い合わせ', 'といあわせ', 'liên hệ hỏi thông tin'],
      ['上回る', 'うわまわる', 'vượt, cao hơn'],
      ['合わせる', 'あわせる', 'cộng lại, gộp'],
    ],
  }),
  item('w02', 'shiryo', 3, {
    material: {
      kind: 'table',
      title: '駐車場の区画',
      head: ['区画', '利用'],
      rows: [
        ['A', '役員用'],
        ['B', '来客用（予約制）'],
        ['C', '社員用'],
        ['D', '業者搬入用'],
      ],
    },
    script: [
      ['男', '明日いらっしゃる取引先の方、車で来られるそうなんですが、どこに停めていただけばいいでしょうか。', 'Người bên đối tác đến ngày mai nghe nói sẽ đi ô tô. Nên mời họ đỗ xe ở đâu ạ?'],
      ['女', '来客用はBなんだけど、明日は舗装工事でBが使えないのよ。', 'Chỗ cho khách là khu B, nhưng mai khu B làm lại mặt đường nên không dùng được.'],
      ['女', '役員用のほうを一台分空けてもらうよう、総務にお願いしてあるから、そこにご案内して。', 'Tôi đã nhờ phòng hành chính để trống một chỗ ở khu dành cho ban giám đốc, anh hướng dẫn khách vào đó nhé.'],
    ],
    questions: [
      [
        '取引先の人の車はどこに停めますか。',
        ['A', 'B', 'C', 'D'],
        0,
        'Khu B dành cho khách nhưng mai có công trình. Chỗ được để trống là khu dành cho ban giám đốc (役員用) = A. C là của nhân viên, D cho xe giao hàng.',
      ],
    ],
    points: [
      ['役員', 'やくいん', 'ban giám đốc, cán bộ quản lý cấp cao'],
      ['搬入', 'はんにゅう', 'chuyển hàng vào'],
      ['空ける', 'あける', 'để trống'],
    ],
  }),
  item('w02', 'sogo-chodokkai', 1, {
    material: {
      kind: 'text',
      title: '電話応対の基本（部内マニュアルより）',
      body: '1. 電話は3コール以内に取る。それ以上鳴った場合は「お待たせいたしました」と添える。\n2. 名指し人が不在の場合は、戻りの時間を伝え、折り返しが必要か確認する。\n3. 伝言は「いつ・誰から・用件・連絡先」をメモし、名指し人の机に置く。\n4. 急ぎの用件は、メモに加えて社内チャットでも本人に知らせる。\n5. 相手が切ったのを確かめてから受話器を置く。',
    },
    script: [
      ['女', '今の電話、ちょっと気になったんだけど。', 'Cuộc gọi vừa rồi, chị thấy có chỗ hơi chưa ổn.'],
      ['男', 'はい。', 'Vâng.'],
      ['女', '五回ぐらい鳴ってから取ったよね。そういうときの一言、抜けてたよ。', 'Chuông reo khoảng năm hồi rồi em mới nhấc máy nhỉ. Câu cần nói trong trường hợp đó em bỏ sót rồi.'],
      ['男', 'あ、すみません。気をつけます。', 'À, em xin lỗi. Em sẽ chú ý.'],
      ['女', 'それから、伝言のメモはどうした？', 'Còn giấy nhắn thì em để đâu rồi?'],
      ['男', '田村さんの机に置きました。今日中に見積もりがほしいとのことでした。', 'Em để trên bàn anh Tamura rồi ạ. Bên kia nói muốn có báo giá trong hôm nay.'],
      ['女', '今日中なら急ぎでしょう。田村さん、今日は外回りで夕方まで戻らないから、メモだけじゃ間に合わないよ。', 'Trong hôm nay thì là việc gấp rồi. Anh Tamura hôm nay đi gặp khách, chiều tối mới về, chỉ để giấy thì không kịp đâu.'],
      ['男', 'わかりました。すぐ知らせます。', 'Em hiểu rồi. Em báo ngay ạ.'],
    ],
    questions: [
      [
        '男の人が電話を取ったとき、言わなければならなかったのはどれですか。',
        ['申し訳ございません', 'お待たせいたしました', 'いつもお世話になっております', '少々お待ちください'],
        1,
        'Chuông reo khoảng năm hồi, quá ba hồi, nên theo mục 1 phải nói お待たせいたしました. Ba câu còn lại đều là câu dùng khi nghe điện thoại, nhưng không phải câu mà quy tắc yêu cầu trong trường hợp này.',
      ],
      [
        '男の人はこのあと何をしますか。',
        ['社内チャットで田村さんに知らせる', '田村さんの机にメモを置く', '自分で見積もりを作って送る', '相手に折り返し電話をする'],
        0,
        'Việc trong hôm nay là việc gấp, nên theo mục 4 phải báo thêm qua chat nội bộ. Giấy nhắn thì đã để rồi, và chị cũng nói chỉ để giấy là không kịp. Không ai bảo anh tự làm báo giá.',
      ],
    ],
    points: [
      ['名指し人', 'なざしにん', 'người được gọi tên (người người gọi muốn gặp)'],
      ['外回り', 'そとまわり', 'đi gặp khách bên ngoài'],
      ['見積もり', 'みつもり', 'báo giá'],
      ['受話器', 'じゅわき', 'ống nghe điện thoại'],
    ],
  }),
  item('w02', 'sogo-chodokkai', 2, {
    material: {
      kind: 'text',
      title: '来客受付の新しい方法について',
      body: '件名：来客受付の新しい方法について\n\n来月1日より、1階受付での来客対応を次のように変更します。\n・来客の方には、受付のタブレットで訪問先の社員名を入力していただきます。\n・入力されると、担当者の内線とスマートフォンに通知が届きます。\n・担当者は、通知から5分以内に1階まで迎えに来てください。\n・事前に来客登録をした場合は、入館証がその場で発行されます。登録がない場合は、担当者が受付で入館証の手続きをしてください。\n\n総務部',
    },
    script: [
      ['男', '来月から受付に人がいなくなるんですね。', 'Từ tháng sau quầy lễ tân không còn người nữa nhỉ.'],
      ['女', 'そう。明日のお客様は来月一日だから、さっそく新しいやり方になるわね。事前の登録はした？', 'Ừ. Khách ngày mai là đúng ngày mùng một tháng sau, nên áp dụng cách mới luôn. Em đăng ký trước chưa?'],
      ['男', 'まだです。でもどうせ迎えに行くので、そのとき受付で手続きすれば…', 'Chưa ạ. Nhưng đằng nào em cũng xuống đón, lúc đó làm thủ tục ở quầy là được…'],
      ['女', 'それだと、お客様を受付でお待たせすることになるでしょう。今日のうちに登録しておいて。', 'Như vậy là để khách phải đứng chờ ở quầy. Đăng ký trong hôm nay đi.'],
      ['男', 'はい、そうします。', 'Vâng, em sẽ làm vậy.'],
    ],
    questions: [
      [
        '新しい方法では、来客が来たことは担当者にどう伝わりますか。',
        ['受付の社員が内線で知らせる', '来客が担当者の携帯に電話する', '総務部がメールで知らせる', '内線とスマートフォンに通知が届く'],
        3,
        'Khách nhập tên người cần gặp vào máy tính bảng, hệ thống gửi thông báo tới máy lẻ và điện thoại thông minh. Lựa chọn 1 là cách cũ: từ tháng sau quầy không còn người.',
      ],
      [
        '男の人はこのあと何をしますか。',
        ['受付で入館証の手続きをする', '明日の来客を事前に登録する', '総務部に新しい方法について聞く', 'タブレットの使い方を練習する'],
        1,
        'Ý định làm thủ tục tại quầy bị chị gạt đi vì khách sẽ phải đợi. Chị bảo 今日のうちに登録しておいて, và anh đồng ý. Đăng ký trước thì thẻ ra vào được cấp ngay tại chỗ.',
      ],
    ],
    points: [
      ['事前', 'じぜん', 'trước, sẵn từ trước'],
      ['発行する', 'はっこうする', 'cấp, phát hành'],
      ['お待たせする', 'おまたせする', 'để (người khác) phải chờ'],
    ],
  }),
];

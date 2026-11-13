import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

// Week 2 — điện thoại và tiếp khách (J2 → J1).
export const W02: BjtItem[] = [
  item('w02', 'goi', 1, {
    questions: [
      [
        '申し訳ございません。田中はただいま別の電話に＿＿＿おります。',
        ['出て', 'かけて', 'つながって', '取って'],
        0,
        'Đáp án 1. 電話に出る = nghe máy, nên 別の電話に出ております = đang nghe một cuộc gọi khác. かけて và 取って cần trợ từ を (電話をかける, 電話を取る), không đi với に. つながる có chủ ngữ là cuộc gọi (電話がつながる), không phải người.',
      ],
    ],
    points: [
      ['電話に出る', 'でんわにでる', 'nghe máy'],
      ['ただいま', 'ただいま', 'hiện giờ, ngay lúc này (trang trọng)'],
    ],
  }),
  item('w02', 'goi', 2, {
    questions: [
      [
        '恐れ入りますが、もう一度お名前を＿＿＿いただけますか。',
        ['お聞き', 'お伺い', 'お聞かせ', 'お尋ね'],
        2,
        'Đáp án 3. お聞かせいただく = được (đối phương) cho nghe, tức là xin khách nói lại tên. Lựa chọn dễ nhầm là 2: お伺いする là khiêm nhường cho việc mình hỏi, ghép với いただく thành ra nhờ khách đi hỏi. お聞きいただく và お尋ねいただく cũng là nhờ khách nghe hoặc hỏi, sai người làm.',
      ],
    ],
    points: [
      ['お聞かせいただく', 'おきかせいただく', 'xin được nghe (đối phương nói)'],
      ['恐れ入りますが', 'おそれいりますが', 'xin lỗi làm phiền, nhưng…'],
    ],
  }),
  item('w02', 'goi', 3, {
    questions: [
      [
        '鈴木が戻りましたら、こちらから折り返しお電話＿＿＿。',
        ['なさいます', 'いたします', 'くださいます', 'いただきます'],
        1,
        'Đáp án 2. Suzuki là người công ty mình, việc gọi lại là việc của phía mình nên dùng khiêm nhường お電話いたします. なさいます là tôn kính, くださいます là đối phương làm cho mình. Lựa chọn 4 dễ nhầm: お電話いただきます nghĩa là mình được khách gọi tới, ngược hướng với 折り返し (phía mình gọi lại).',
      ],
    ],
    points: [
      ['折り返し', 'おりかえし', 'gọi lại (sau khi nhận cuộc gọi)'],
      ['戻る', 'もどる', 'quay về (chỗ làm)'],
    ],
  }),
  item('w02', 'goi', 4, {
    questions: [
      [
        '（受付で）恐れ入りますが、どちらの会社の方か＿＿＿よろしいでしょうか。',
        ['伺っても', 'おっしゃっても', 'お聞きになっても', '申し上げても'],
        0,
        'Đáp án 1. Lễ tân là người hỏi nên dùng khiêm nhường 伺う (hỏi). おっしゃる và お聞きになる là tôn kính, dùng cho hành động của khách. Lựa chọn 4 dễ nhầm vì cũng là khiêm nhường ngữ, nhưng 申し上げる là "nói, thưa", không phải "hỏi".',
      ],
    ],
    points: [
      ['伺ってもよろしいでしょうか', 'うかがってもよろしいでしょうか', 'cho tôi hỏi có được không ạ'],
      ['どちらの', 'どちらの', 'của nơi nào (lịch sự của どこの)'],
    ],
  }),
  item('w02', 'goi', 5, {
    questions: [
      [
        '先方の担当者が不在だったため、電話に出た方に＿＿＿をお願いした。',
        ['通知', '報告', '案内', '伝言'],
        3,
        'Đáp án 4. 伝言をお願いする = nhờ người nghe máy nhắn lại cho người vắng mặt. Lựa chọn 2 dễ nhầm, nhưng 報告 là báo cáo kết quả lên cấp trên, không dùng để nhờ người khác chuyển lời. 通知 là thông báo chính thức, 案内 là hướng dẫn, dẫn đường.',
      ],
    ],
    points: [
      ['伝言', 'でんごん', 'lời nhắn'],
      ['先方', 'せんぽう', 'phía bên kia, đối tác'],
      ['不在', 'ふざい', 'vắng mặt'],
    ],
  }),
  item('w02', 'goi', 6, {
    questions: [
      [
        '来客にお茶を出すときは、＿＿＿に座っている方から順にお出しするのが基本だ。',
        ['下座', '上座', '前列', '上司'],
        1,
        'Đáp án 2. 上座 là chỗ ngồi danh dự (xa cửa nhất), trà mời từ người ngồi ở đó trước. Lựa chọn 1 (下座) là chỗ gần cửa dành cho người tiếp khách, nên đúng loại từ nhưng ngược nghĩa. 上司 là cấp trên, không phải chỗ ngồi. 前列 là hàng ghế đầu.',
      ],
    ],
    points: [
      ['上座', 'かみざ', 'chỗ ngồi danh dự'],
      ['下座', 'しもざ', 'chỗ ngồi gần cửa (người dưới)'],
    ],
  }),
  item('w02', 'hyogen', 1, {
    material: {
      kind: 'text',
      title: '電話伝言メモ',
      body: '宛先：佐々木課長\n日時：11月14日（金）10時20分　受付：井上\n相手：株式会社ハヤシ電機 総務部 川口様（電話 03-5821-4467）\n用件：来週火曜日の打ち合わせの件。川口様のご都合が悪くなったため、水曜日か木曜日の午後に変更していただけないかとのことです。資料は予定どおり、月曜日までに川口様からメールでお送りくださるそうです。\n□ またお電話します　■ 折り返しお電話ください　□ 伝言のみ',
    },
    questions: [
      [
        '佐々木課長がこのメモを見て、まずしなければならないことは何ですか。',
        ['川口さんからもう一度電話が来るのを待つ', '月曜日までに川口さんに資料を送る', '川口さんに電話をかけて、打ち合わせの日を決め直す', '火曜日の打ち合わせの準備を進める'],
        2,
        'Đáp án 3. Ô được đánh dấu là 折り返しお電話ください, và nội dung là xin đổi buổi họp sang chiều thứ Tư hoặc thứ Năm. Lựa chọn 2 dễ nhầm: tài liệu do chính Kawaguchi gửi qua mail (川口様からメールでお送りくださる), Sasaki không phải gửi. Ô またお電話します không được chọn nên 1 sai.',
      ],
    ],
    points: [
      ['宛先', 'あてさき', 'người nhận'],
      ['とのことです', 'とのことです', 'nghe nói là, (người đó) bảo là'],
      ['折り返しお電話ください', 'おりかえしおでんわください', 'xin gọi lại'],
    ],
  }),
  item('w02', 'hyogen', 2, {
    material: {
      kind: 'text',
      title: '来客受付の手順変更について',
      body: '社員各位\n\n来月1日から、本社ビル1階の受付で来客用の入館証を発行する手順が変わります。\nこれまでは来客ご本人に受付で用紙に記入していただいていましたが、今後は訪問を受ける社員が、前日の17時までに社内システムで来客の氏名・会社名・人数を登録してください。当日は、来客が受付で登録番号を伝えるだけで入館証が発行されます。\n登録のない来客の場合は、受付から担当者に連絡し、担当者が1階まで迎えに来るまでお待ちいただくことになります。\nなお、宅配業者や工事業者の方は、従来どおり用紙への記入で受け付けます。\n\n総務部',
    },
    questions: [
      [
        'この知らせによると、来月から取引先の人が訪ねてくる場合、社員は何をすればよいですか。',
        ['受付で来客に用紙を書いてもらう', '当日、必ず1階まで迎えに行く', '当日の朝までに来客の情報を登録する', '前日の夕方5時までに来客の情報をシステムに登録する'],
        3,
        'Đáp án 4. Thông báo yêu cầu nhân viên đăng ký trên hệ thống trước 17 giờ hôm trước (前日の17時まで). Lựa chọn 3 dễ nhầm vì đúng việc phải làm nhưng sai hạn. Xuống tầng 1 đón (2) chỉ xảy ra khi khách chưa được đăng ký. Viết vào phiếu (1) giờ chỉ còn áp dụng cho người giao hàng và thợ thi công.',
      ],
    ],
    points: [
      ['入館証', 'にゅうかんしょう', 'thẻ vào tòa nhà'],
      ['従来どおり', 'じゅうらいどおり', 'như trước đây'],
      ['発行する', 'はっこうする', 'cấp, phát hành'],
    ],
  }),
  item('w02', 'hyogen', 3, {
    material: {
      kind: 'text',
      title: '12月3日ご来社の際のご案内',
      body: '大橋産業 営業部 野村様\n\nいつもお世話になっております。三和フーズ総務部の西田です。\n12月3日（水）14時からのお打ち合わせの件、承知いたしました。当日は本社ビルではなく、隣の第二ビル5階の会議室をご用意しております。\n第二ビルには受付がございませんので、1階のエントランスに着きましたら、恐れ入りますが私の携帯（090-3318-2756）までお電話ください。お迎えにあがります。\nなお、駐車場のご用意はいたしかねますので、公共交通機関をご利用いただけますと幸いです。',
    },
    questions: [
      [
        'このメールによると、野村さんは当日どうすればよいですか。',
        ['第二ビルの1階に着いたら、西田さんの携帯に電話する', '本社ビルの受付で西田さんを呼んでもらう', '第二ビル5階の受付に行く', '車で行き、駐車場で西田さんを待つ'],
        0,
        'Đáp án 1. Tòa nhà số 2 không có lễ tân, nên đến sảnh tầng 1 thì gọi vào di động của Nishida để chị ấy xuống đón (お迎えにあがります). Lựa chọn 2 dễ nhầm vì thói quen đến lễ tân tòa chính, nhưng thư nói rõ 本社ビルではなく. Không có chỗ đỗ xe (いたしかねます) nên 4 sai.',
      ],
    ],
    points: [
      ['お迎えにあがる', 'おむかえにあがる', 'đến đón (khiêm nhường)'],
      ['いたしかねます', 'いたしかねます', 'chúng tôi không thể (từ chối lịch sự)'],
      ['公共交通機関', 'こうきょうこうつうきかん', 'phương tiện giao thông công cộng'],
    ],
  }),
  item('w02', 'sogo-dokkai', 1, {
    material: {
      kind: 'text',
      title: '「電話が怖い」若手にどう向き合うか',
      body: '入社して間もない社員の中に、会社の固定電話に出ることを強い負担に感じる人が増えている。ある人材サービス会社の調査では、二十代の社員の約四割が「職場の電話に出るのが苦手」と答えた。理由として最も多かったのは「相手が誰かわからないまま話し始めるのが不安」というもので、「周りの人に話を聞かれるのが恥ずかしい」がそれに続いた。\n学生時代の連絡手段はほとんどがメッセージアプリで、知らない相手と声だけでやり取りした経験が少ない。苦手意識を持つのはむしろ当然だと言える。\nこうした中、電話応対を若手の仕事として固定するのをやめた会社もある。都内のある機械部品メーカーでは、代表電話を部署の全員で順番に受ける形に改めたうえで、よくある問い合わせへの答え方を一枚の表にまとめ、電話機の横に置いた。導入から半年で、若手から「電話が怖い」という声はほとんど聞かれなくなったという。同社の人事担当者は「苦手なことを避けさせるのではなく、一人で抱え込ませない仕組みが大切だ」と話す。',
    },
    questions: [
      [
        '調査で、職場の電話が苦手な理由として最も多かったものはどれですか。',
        ['周りの人に話を聞かれるのが恥ずかしいから', '相手がわからないまま話し始めるのが不安だから', '敬語に自信がないから', 'メッセージアプリのほうが速いから'],
        1,
        'Đáp án 2. Bài viết 最も多かったのは「相手が誰かわからないまま話し始めるのが不安」. Lựa chọn 1 dễ nhầm vì cũng có trong khảo sát, nhưng それに続いた cho thấy nó chỉ đứng thứ hai. Kính ngữ và tốc độ của ứng dụng nhắn tin không được nêu là lý do.',
      ],
      [
        '機械部品メーカーの取り組みについて、正しいものはどれですか。',
        ['若手社員は電話に出なくてもよいことにした', '若手社員だけを対象に電話応対の研修を行った', '電話を全員で順番に受けるようにし、答え方の表を用意した', '代表電話をやめて、問い合わせをメールにまとめた'],
        2,
        'Đáp án 3. Công ty đổi sang cả phòng thay phiên nghe tổng đài và đặt bảng cách trả lời cạnh máy. Lựa chọn 1 dễ nhầm vì người trẻ không còn bị giao cố định, nhưng người phụ trách nhân sự nói rõ 苦手なことを避けさせるのではなく: không phải để họ né tránh. Bài không nhắc khóa đào tạo hay việc bỏ tổng đài.',
      ],
    ],
    points: [
      ['代表電話', 'だいひょうでんわ', 'số điện thoại tổng đài'],
      ['抱え込む', 'かかえこむ', 'ôm đồm một mình'],
      ['苦手意識', 'にがていしき', 'cảm giác mình kém, ngại'],
    ],
  }),
  item('w02', 'sogo-dokkai', 2, {
    material: {
      kind: 'text',
      title: '来客応対の基本（営業部用）',
      body: '1．受付から連絡を受けたら、担当者本人がすぐに1階まで迎えに行く。担当者が会議中などで手が離せない場合は、同じ課の者が代わりに迎えに行き、担当者が来るまで応接室でお待ちいただく。\n2．応接室では、お客様に入口から最も遠い席を勧める。ただし、窓からの景色がよい席やプロジェクターの画面が見やすい席がある場合は、お客様の希望を優先してよい。\n3．お茶は面談が始まってから出すのではなく、お客様が着席したらなるべく早く出す。面談が三十分を超えたときは、二杯目を用意する。\n4．お見送りは、原則としてエレベーターの前までとする。重要なお客様の場合は、課長の判断で1階の玄関まで見送る。',
    },
    questions: [
      [
        '担当者が会議中に、受付から来客の連絡があった場合、どうしますか。',
        ['担当者が会議を抜けて迎えに行く', '受付でお客様に待ってもらう', '同じ課の社員が迎えに行き、応接室で待ってもらう', '同じ課の社員が担当者の代わりに面談する'],
        2,
        'Đáp án 3. Mục 1: khi người phụ trách bận, người cùng tổ đi đón thay và mời khách chờ ở phòng tiếp khách đến khi người phụ trách tới. Lựa chọn 4 dễ nhầm vì đúng là người cùng tổ ra đón, nhưng chỉ đón thay, không gặp khách thay. Khách chờ ở 応接室, không phải ở lễ tân.',
      ],
      [
        'このマニュアルの内容と合っているものはどれですか。',
        ['お茶は面談が始まってから出す', 'お客様には必ず入口から最も遠い席に座ってもらう', 'お見送りはいつも1階の玄関までする', '面談が三十分より長くなったら、もう一杯お茶を出す'],
        3,
        'Đáp án 4. Mục 3: 三十分を超えたときは、二杯目を用意する. Lựa chọn 2 dễ nhầm, nhưng mục 2 có ただし: nếu có chỗ nhìn đẹp hoặc dễ xem màn chiếu thì ưu tiên ý khách, nên chữ 必ず sai. Trà mời ngay khi khách ngồi, và tiễn đến tầng 1 chỉ dành cho khách quan trọng.',
      ],
    ],
    points: [
      ['手が離せない', 'てがはなせない', 'bận, không rời tay được'],
      ['お見送り', 'おみおくり', 'tiễn khách'],
      ['原則として', 'げんそくとして', 'về nguyên tắc'],
    ],
  }),
];

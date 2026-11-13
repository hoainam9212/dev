import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/**
 * Full test 1 — 読解 part: 10 goi + 10 hyogen + 10 sogo-dokkai questions (4 texts).
 * Mixed themes; about a third of the questions are J1+ (implied meaning, two conditions, keigo nuance).
 */
export const MOCK1: BjtItem[] = [
  item('mock1', 'goi', 1, {
    questions: [
      [
        '弊社の田中が、明日の午後そちらへ＿＿＿予定です。',
        ['伺う', 'いらっしゃる', 'お越しになる', '参られる'],
        0,
        'Người đi là nhân viên công ty mình (弊社の田中) đến chỗ khách, nên dùng khiêm nhường ngữ 伺う (câu 1). Câu 2 và 3 là tôn kính ngữ, dùng cho hành động của khách. Câu 4 dễ nhầm vì có 参る (khiêm nhường) nhưng ghép thêm ～られる tôn kính, thành kính ngữ lẫn lộn.',
      ],
    ],
    points: [
      ['伺う', 'うかがう', 'đến thăm (khiêm nhường)'],
      ['弊社', 'へいしゃ', 'công ty chúng tôi'],
    ],
  }),
  item('mock1', 'goi', 2, {
    questions: [
      [
        '予算の制約上、今回は外部への委託を＿＿＿、社内で対応することにした。',
        ['見計らい', '見合わせ', '見落とし', '見込み'],
        1,
        '見合わせる = tạm thôi, tạm hoãn không làm (câu 2), hợp với "lần này tự làm trong công ty". Câu 1 見計らう là canh thời điểm (タイミングを見計らう). Câu 4 dễ nhầm vì là từ hay gặp trong văn bản, nhưng 見込む = dự tính, trông đợi, không có nghĩa thôi làm. 見落とす là bỏ sót.',
      ],
    ],
    points: [
      ['見合わせる', 'みあわせる', 'tạm hoãn, tạm không làm'],
      ['委託', 'いたく', 'uỷ thác, thuê ngoài'],
      ['制約', 'せいやく', 'ràng buộc, hạn chế'],
    ],
  }),
  item('mock1', 'goi', 3, {
    questions: [
      [
        'システムの不具合で、受注データの一部が＿＿＿しまった。',
        ['消して', 'なくして', '消えて', '失って'],
        2,
        'Chủ ngữ là データが và không có ai cố ý làm, nên cần tự động từ 消える (câu 3). Câu 1 dễ nhầm vì cùng gốc 消, nhưng 消す là tha động từ, cần ai đó xoá và tân ngữ を. なくす, 失う cũng là tha động từ (người làm mất cái gì).',
      ],
    ],
    points: [
      ['不具合', 'ふぐあい', 'trục trặc, lỗi'],
      ['受注', 'じゅちゅう', 'nhận đơn hàng'],
    ],
  }),
  item('mock1', 'goi', 4, {
    questions: [
      [
        '交渉は、双方の主張が平行線を＿＿＿まま、時間切れとなった。',
        ['歩んだ', '描いた', '引いた', '辿った'],
        3,
        '平行線をたどる = hai bên giữ nguyên lập trường, không gặp nhau (câu 4), thành ngữ cố định trong tin đàm phán. Câu 3 dễ nhầm vì "kẻ đường song song" là 平行線を引く theo nghĩa đen, không phải nghĩa bóng về đàm phán. 歩む, 描く không đi với 平行線 trong cách nói này.',
      ],
    ],
    points: [
      ['平行線をたどる', 'へいこうせんをたどる', 'không tìm được điểm chung'],
      ['時間切れ', 'じかんぎれ', 'hết giờ'],
    ],
  }),
  item('mock1', 'goi', 5, {
    questions: [
      [
        '今回の値上げは、原材料費の高騰を受けての＿＿＿措置であり、何卒ご理解を賜りたく存じます。',
        ['やむを得ない', 'やむなく', '否めない', 'ままならない'],
        0,
        'Đứng trước danh từ 措置 cần tính từ: やむを得ない措置 = biện pháp bất đắc dĩ (câu 1). Câu 2 dễ nhầm vì cùng nghĩa, nhưng やむなく là trạng từ, phải đứng trước động từ (やむなく値上げする). 否めない = không thể phủ nhận; ままならない = không như ý.',
      ],
    ],
    points: [
      ['やむを得ない', 'やむをえない', 'bất đắc dĩ, đành phải'],
      ['措置', 'そち', 'biện pháp'],
      ['賜る', 'たまわる', 'nhận được (kính ngữ cao)'],
    ],
  }),
  item('mock1', 'goi', 6, {
    questions: [
      [
        '売上の減少に＿＿＿をかけるため、来期は販促費を増額する。',
        ['拍車', '歯止め', '磨き', '手間'],
        1,
        '歯止めをかける = chặn lại đà xấu (câu 2), đúng mục đích tăng chi phí quảng bá. Câu 1 拍車をかける dễ nhầm vì cũng đi với をかける, nhưng nghĩa là thúc cho nhanh hơn, tức làm doanh thu giảm nhanh hơn. 磨きをかける là trau chuốt thêm (技術に磨きをかける), không dùng cho đà giảm; 手間をかける là tốn công.',
      ],
    ],
    points: [
      ['歯止めをかける', 'はどめをかける', 'chặn đà (xấu)'],
      ['拍車をかける', 'はくしゃをかける', 'thúc đẩy nhanh thêm'],
      ['販促費', 'はんそくひ', 'chi phí xúc tiến bán hàng'],
    ],
  }),
  item('mock1', 'goi', 7, {
    questions: [
      [
        'ご注文の品は、ご入金を確認＿＿＿発送いたします。',
        ['したとたん', 'したきり', 'し次第', 'するや否や'],
        2,
        '～次第 = ngay sau khi (việc đó xong) thì sẽ làm, dùng để hứa với khách (câu 3). Câu 4 するや否や dễ nhầm vì cũng là "vừa… thì", nhưng dùng để kể việc đã xảy ra, văn viết cứng, không dùng cho lời hứa. したとたん cũng kể chuyện bất ngờ đã xảy ra; したきり = rồi từ đó không… nữa.',
      ],
    ],
    points: [
      ['次第', 'しだい', 'ngay khi'],
      ['入金', 'にゅうきん', 'tiền về tài khoản, thanh toán'],
    ],
  }),
  item('mock1', 'goi', 8, {
    questions: [
      [
        '本日のお打ち合わせの内容を＿＿＿、改めてお見積もりをお送りいたします。',
        ['抑え', '構え', '備え', '踏まえ'],
        3,
        '～を踏まえ = dựa trên nội dung… (câu 4), hợp với việc báo giá lại sau cuộc họp. Câu 3 備え dễ nhầm vì cũng là "chuẩn bị", nhưng ～に備える là phòng bị cho một việc sắp tới (災害に備える) và đi với に, không với 内容を. 抑える (kìm lại) và 構える (dựng, giữ tư thế) không hợp nghĩa.',
      ],
    ],
    points: [
      ['踏まえる', 'ふまえる', 'dựa trên'],
      ['改めて', 'あらためて', 'lại một lần nữa (chính thức)'],
    ],
  }),
  item('mock1', 'goi', 9, {
    questions: [
      [
        'この案件は、利益こそ薄い＿＿＿、大手との取引実績を作るという意味では十分に価値がある。',
        ['ゆえに', 'どころか', 'ものの', 'だけに'],
        2,
        'Hai vế trái chiều (lãi mỏng / vẫn có giá trị) nên chọn ものの (câu 3). Câu 4 だけに dễ nhầm vì là mẫu J1 hay gặp, nhưng nghĩa là "chính vì… nên càng…", hai vế cùng chiều: 利益が薄いだけに価値がある thành vô lý. ゆえに nêu nguyên nhân; どころか phủ định vế trước.',
      ],
    ],
    points: [
      ['こそ', 'こそ', 'nhấn mạnh (thì đúng là…)'],
      ['取引実績', 'とりひきじっせき', 'thành tích giao dịch'],
      ['案件', 'あんけん', 'vụ việc, dự án'],
    ],
  }),
  item('mock1', 'goi', 10, {
    questions: [
      [
        '来期の採用人数は、業績の動向を＿＿＿判断する。',
        ['見極めたうえで', '見極めるうえで', '見極めたあげく', '見極めるまでに'],
        0,
        'Vた＋うえで = sau khi đã làm xong A thì mới B (câu 1). Câu 2 dễ nhầm vì cùng うえで, nhưng Vる＋うえで nghĩa là "trong việc…, khi làm…" (判断するうえで大切なこと), không nói thứ tự. あげく = sau bao lâu rốt cuộc (thường tiêu cực); までに chỉ hạn chót.',
      ],
    ],
    points: [
      ['見極める', 'みきわめる', 'nhìn rõ, đánh giá chắc'],
      ['動向', 'どうこう', 'xu hướng, diễn biến'],
    ],
  }),
  item('mock1', 'hyogen', 1, {
    material: {
      kind: 'text',
      body: '株式会社エムズ企画 藤本様\n\nいつもお世話になっております。ライトウェーブの石田です。\nご依頼の市場調査報告書ですが、本日中にお送りする予定のところ、データの最終確認に時間を要しており、明朝10時までにお送りすることとなりました。誠に申し訳ございません。\nなお、急ぎでご入用の第1章のみでしたら、本日17時までにお送りできます。その場合はお手数ですが、お知らせいただけますでしょうか。',
    },
    questions: [
      [
        '藤本さんが第1章を今日受け取りたい場合、どうすればいいですか。',
        ['何もしなくても、17時までに届く', '石田さんにその旨を知らせる', '明朝10時まで待つ', '自分でデータの最終確認をする'],
        1,
        'Chương 1 gửi được trước 17 giờ hôm nay, nhưng その場合は…お知らせいただけますでしょうか: phải báo cho người viết → câu 2. Câu 1 dễ nhầm vì có giờ 17 giờ, nhưng chỉ gửi khi được yêu cầu. 10 giờ sáng mai là hạn của toàn bộ báo cáo.',
      ],
    ],
    points: [
      ['要する', 'ようする', 'cần, tốn (thời gian)'],
      ['ご入用', 'ごにゅうよう', 'cần dùng (kính ngữ)'],
    ],
  }),
  item('mock1', 'hyogen', 2, {
    material: {
      kind: 'text',
      body: '株式会社クロスリンク 吉川様\n\nこのたびは在庫管理システムのご提案をいただき、ありがとうございました。大変興味深く拝見いたしました。\nただ、弊社では現在、同様の仕組みを取引先と共同で開発しているところでございまして……。\nまた何か新しいサービスが出ましたら、ぜひお声がけください。',
    },
    questions: [
      [
        'このメールで書き手が伝えたいことは何ですか。',
        ['提案を前向きに検討したい', '共同開発に加わってほしい', '遠回しに提案を断りたい', 'より詳しい説明を聞きたい'],
        2,
        'Người viết khen (興味深く拝見), rồi nói đang tự phát triển hệ thống tương tự và bỏ lửng câu (……), cuối thư chỉ mời "khi có dịch vụ mới khác" → từ chối khéo đề xuất này (câu 3). Câu 1 dễ nhầm vì lời khen ở đầu thư, nhưng đó là phép lịch sự trước lời từ chối. Thư không mời tham gia phát triển chung.',
      ],
    ],
    points: [
      ['お声がけ', 'おこえがけ', 'gọi, mời (khi có việc)'],
      ['遠回し', 'とおまわし', 'nói vòng'],
    ],
  }),
  item('mock1', 'hyogen', 3, {
    material: {
      kind: 'text',
      title: '全館停電のお知らせ',
      body: '入居者各位\n\n電気設備の法定点検のため、11月28日（土）9時〜15時の間、全館停電となります。\nサーバー室は非常用電源により稼働を続けますが、各自のパソコンは27日（金）の退社時までに必ず電源をお切りください。\nなお、28日に出社される場合は、事前に管理室への届け出が必要です。停電中はエレベーターが停止しますので、ご注意ください。\n\nビル管理室',
    },
    questions: [
      [
        'このお知らせの内容に合うものはどれですか。',
        ['停電中は、サーバー室も止まる', 'パソコンの電源は、28日の朝までに切ればよい', '28日は、誰もビルに入ることができない', '28日に出社するなら、前もって管理室に届け出る'],
        3,
        'Câu sau なお: ai lên làm ngày 28 phải báo trước với phòng quản lý toà nhà → câu 4. Câu 3 dễ nhầm vì mất điện cả toà, nhưng thông báo không cấm vào, chỉ cần báo trước. Phòng máy chủ chạy bằng điện dự phòng; máy tính phải tắt trước khi về ngày 27, không phải sáng 28.',
      ],
    ],
    points: [
      ['法定点検', 'ほうていてんけん', 'kiểm tra định kỳ theo luật'],
      ['稼働', 'かどう', 'vận hành'],
      ['非常用電源', 'ひじょうようでんげん', 'nguồn điện dự phòng'],
    ],
  }),
  item('mock1', 'hyogen', 4, {
    material: {
      kind: 'text',
      body: '株式会社エムズ企画 藤本様\n\nいつもお世話になっております。\n来週火曜日のお打ち合わせですが、弊社の都合で誠に恐縮ながら、水曜日か木曜日の午後に変更していただくことは可能でしょうか。\nどちらも難しいようでしたら、火曜日のままで調整いたしますので、ご遠慮なくお申し付けください。\n\nライトウェーブ 石田',
    },
    questions: [
      [
        '書き手の希望はどれですか。',
        ['可能なら水曜か木曜の午後に移したいが、無理なら火曜のままでよい', '打ち合わせを取りやめたい', '必ず水曜日の午後にしてほしい', '火曜日の打ち合わせの時間を午後に変えたい'],
        0,
        'Người viết xin đổi sang chiều thứ tư hoặc thứ năm, nhưng nếu không được thì tự mình sắp xếp giữ thứ ba (火曜日のままで調整いたします) → câu 1. Câu 3 chỉ giữ một ngày và thêm chữ 必ず. Câu 4 dễ nhầm vì có chữ 午後, nhưng "buổi chiều" gắn với thứ tư, thứ năm, không phải thứ ba.',
      ],
    ],
    points: [
      ['恐縮ながら', 'きょうしゅくながら', 'thật ngại nhưng'],
      ['申し付ける', 'もうしつける', 'bảo, dặn (khách nói với mình)'],
    ],
  }),
  item('mock1', 'hyogen', 5, {
    material: {
      kind: 'text',
      body: '株式会社ハルタ工務店 購買部 野口様\n\nいつもお世話になっております。三協建材の小松です。\n先日お送りしたお見積もりにつきまして、その後いかがでしょうか。\n年末にかけて生産ラインが大変混み合う見込みでございます。12月中の納品をご希望でしたら、今月20日頃までにご発注いただけますと確実かと存じます。\n引き続きよろしくお願い申し上げます。',
    },
    questions: [
      [
        '書き手が最も伝えたいことは何ですか。',
        ['見積もりの金額を変更したい', '12月中に確実に納品してほしいなら、20日頃までに発注してほしい', '12月は生産ラインが止まるので納品できない', '20日頃までに見積もりを送り直す'],
        1,
        'Bề ngoài là hỏi thăm về báo giá, nhưng ý chính là thúc khéo: muốn chắc giao trong tháng 12 thì đặt hàng trước khoảng ngày 20 (câu 2). ～いただけますと確実かと存じます là cách thúc giục rất mềm. Câu 3 dễ nhầm vì có 混み合う, nhưng dây chuyền chỉ đông việc, không ngừng.',
      ],
    ],
    points: [
      ['混み合う', 'こみあう', 'đông, kín việc'],
      ['かと存じます', 'かとぞんじます', 'tôi nghĩ là (khiêm nhường)'],
    ],
  }),
  item('mock1', 'hyogen', 6, {
    material: {
      kind: 'text',
      title: '社内チャットツールの切り替えについて',
      body: '社員各位\n\n1月1日から、社内チャットツールを新しいものに切り替えます。\n旧ツールは1月31日まで閲覧のみ可能で、メッセージの送信はできなくなります。2月以降、旧ツールのデータはすべて削除されます。必要なやり取りは、各自で保存しておいてください。\nなお、社外の方とのやり取りには引き続きメールを使用し、新ツールへの招待は行わないでください。\n\n情報システム部',
    },
    questions: [
      [
        'この通知の内容に合うものはどれですか。',
        ['旧ツールでは、1月中も今までどおりメッセージが送れる', '必要な旧ツールのやり取りは、1月末までに各自で保存しておく', '旧ツールのデータは、新ツールに自動的に移される', '取引先とのやり取りも、新ツールに移す'],
        1,
        'Tháng 1 công cụ cũ chỉ xem được, tháng 2 bị xoá hết, nên phần cần giữ phải tự lưu trong tháng 1 → câu 2. Câu 1 dễ nhầm vì tháng 1 vẫn vào được công cụ cũ, nhưng chỉ để xem (閲覧のみ), không gửi được. Câu sau なお cấm mời người ngoài công ty vào công cụ mới.',
      ],
    ],
    points: [
      ['閲覧', 'えつらん', 'xem, đọc (dữ liệu)'],
      ['切り替える', 'きりかえる', 'chuyển đổi'],
    ],
  }),
  item('mock1', 'hyogen', 7, {
    material: {
      kind: 'text',
      body: '株式会社さくら電装 物流課 御中\n\nいつもお世話になっております。東光樹脂 出荷担当の今井です。\n昨日のお電話では、次回の納品場所を本社倉庫から川崎の物流センターに変更されたいとのことでしたが、購買部の原田様からは、本社倉庫のままで良いと伺っております。\nお手数ですが、どちらが正しいかご確認いただけますでしょうか。\n確認が取れるまでは、出荷を保留させていただきます。',
    },
    questions: [
      [
        'このメールを書いた目的は何ですか。',
        ['物流センターへの変更が完了したことを知らせるため', '出荷の遅れをわびるため', '相手側から聞いた納品場所が二通りあり、どちらが正しいか確かめたいため', '原田様に直接電話してほしいため'],
        2,
        'Phòng logistics nói đổi sang trung tâm Kawasaki, còn anh Harada phòng mua hàng nói giữ kho trụ sở: hai thông tin trong cùng một công ty mâu thuẫn, nên người viết nhờ xác nhận → câu 3. Câu 2 dễ nhầm vì thư có giữ hàng lại (保留), nhưng đó là hệ quả, hàng chưa trễ và thư không xin lỗi.',
      ],
    ],
    points: [
      ['保留する', 'ほりゅうする', 'tạm giữ lại, treo'],
      ['御中', 'おんちゅう', 'kính gửi (tổ chức, phòng ban)'],
    ],
  }),
  item('mock1', 'hyogen', 8, {
    material: {
      kind: 'text',
      title: '情報セキュリティ研修（eラーニング）受講のお願い',
      body: '全社員の皆様\n\n情報セキュリティ研修を、12月15日（火）までに受講してください。\n所要時間は約40分です。途中で中断しても、続きから再開できます。\n最後の修了テストで8割以上正解すると修了となります。8割に満たなかった場合は、何度でも受け直すことができます。\n期限までに修了しなかった方は、所属長に報告させていただきます。\n\n人事部',
    },
    questions: [
      [
        'この研修について、正しいものはどれですか。',
        ['40分間、一度で全部受けなければならない', '修了テストは一回しか受けられない', '修了テストで8割未満だった場合は、もう一度受けられる', '途中でやめると、最初からやり直しになる'],
        2,
        '8割に満たなかった場合は、何度でも受け直すことができます → câu 3. Câu 1 và 4 trái với 途中で中断しても、続きから再開できます. Câu 2 dễ nhầm nếu đọc lướt chữ 修了テスト, nhưng bài kiểm tra làm lại được bao nhiêu lần cũng được.',
      ],
    ],
    points: [
      ['受講', 'じゅこう', 'tham gia khoá học'],
      ['修了', 'しゅうりょう', 'hoàn thành khoá học'],
      ['に満たない', 'にみたない', 'chưa đến (mức)'],
    ],
  }),
  item('mock1', 'hyogen', 9, {
    material: {
      kind: 'text',
      body: '佐野さん\n\n企画書、拝見しました。全体の方向性は良いと思います。\nただ、3ページ目の市場規模の数字、出典が書かれていませんね。部長会議では必ず聞かれますよ。\n\n大塚',
    },
    questions: [
      [
        '大塚さんが佐野さんにしてほしいことは何ですか。',
        ['企画の方向性を見直す', '市場規模の数字の出典を明記する', '部長会議で企画を説明する', '3ページ目を削除する'],
        1,
        'Cấp trên không ra lệnh thẳng mà chỉ ra thiếu nguồn số liệu và nhắc họp trưởng bộ phận chắc chắn sẽ bị hỏi: hàm ý "hãy ghi rõ nguồn" (câu 2). Câu 1 sai vì hướng đi được khen. Câu 3 dễ nhầm vì có nhắc 部長会議, nhưng đó là lý do phải sửa, không phải việc được giao.',
      ],
    ],
    points: [
      ['出典', 'しゅってん', 'nguồn (số liệu, trích dẫn)'],
      ['市場規模', 'しじょうきぼ', 'quy mô thị trường'],
    ],
  }),
  item('mock1', 'hyogen', 10, {
    material: {
      kind: 'text',
      title: '年末年始休業のお知らせ',
      body: 'お客様各位\n\n誠に勝手ながら、12月29日（火）から1月4日（月）まで休業いたします。\n休業期間中にいただいたご注文は、1月5日（火）以降、順次発送いたします。\nなお、12月26日（土）17時以降のご注文は、年内の発送ができかねますので、あらかじめご了承ください。\n\nオンラインショップ 木の香',
    },
    questions: [
      [
        '12月27日に注文した商品は、いつ発送されますか。',
        ['12月28日', '12月29日', '1月4日', '1月5日以降'],
        3,
        'Hai điều kiện ghép lại: đơn sau 17 giờ ngày 26/12 không gửi trong năm, và nghỉ từ 29/12 tới 4/1, nên đơn ngày 27 được gửi từ 5/1 trở đi (câu 4). Câu 1 dễ nhầm vì 28/12 vẫn là ngày làm việc, nhưng đã qua mốc chốt đơn ngày 26.',
      ],
    ],
    points: [
      ['順次', 'じゅんじ', 'lần lượt'],
      ['できかねる', 'できかねる', 'không thể (trang trọng)'],
      ['了承', 'りょうしょう', 'thông cảm, chấp nhận'],
    ],
  }),
  item('mock1', 'sogo-dokkai', 1, {
    material: {
      kind: 'text',
      title: '第3回 新規事業アイデア募集のお知らせ',
      body: '社員各位\n\n当社では、社員の発想を事業化につなげるため、本年度も新規事業アイデアを募集します。\n\n■応募資格：正社員および契約社員（入社1年未満の方を含む）。3名までのチームでの応募も可能です。\n■応募方法：所定の応募用紙（A4・2枚以内）を、12月18日（金）17時までに経営企画部宛てにメールで提出してください。\n■選考：書類による一次選考を通過した案は、1月下旬の役員向け発表会でプレゼンテーションを行っていただきます。\n■採択後：採択された案は、提案者が中心となって最長1年間の事業化検討を行います。この期間中、提案者は業務時間の2割までを検討に充てることができます。ただし、所属長と調整のうえ、通常業務に支障が出ないようにしてください。\n■その他：過去に不採択となった案でも、内容を見直したものであれば再応募できます。他社の権利を侵害するおそれのある案は、選考の対象外とします。\n\n経営企画部',
    },
    questions: [
      [
        '応募について、本文の内容と合うものはどれですか。',
        ['入社半年の契約社員は応募できない', '4人のチームで応募できる', '前回不採択だった案は、どんな場合も応募できない', '前回不採択だった案も、内容を見直したものなら応募できる'],
        3,
        'Mục その他: án từng bị loại nếu đã sửa lại nội dung thì nộp lại được → câu 4. Câu 3 là bản bỏ mất điều kiện đó. Câu 1 dễ nhầm vì người mới thường bị loại, nhưng ở đây ghi rõ 入社1年未満の方を含む. Đội tối đa 3 người nên câu 2 sai.',
      ],
      [
        '案が採択された提案者について、正しいものはどれですか。',
        ['所属長と調整したうえで、業務時間の2割まで検討に使える', '1年間、通常業務から外れて検討に専念する', '役員が中心となって事業化を進める', '検討期間は少なくとも1年間ある'],
        0,
        'Người đề xuất được dùng tối đa 20% giờ làm cho việc nghiên cứu, với điều kiện trao đổi với trưởng bộ phận (câu 1). Câu 2 dễ nhầm vì có "1 năm", nhưng vẫn làm việc bình thường, chỉ dành phần nhỏ thời gian. 最長1年間 là tối đa 1 năm, nên câu 4 (ít nhất 1 năm) sai. Người dẫn dắt là người đề xuất, không phải ban giám đốc.',
      ],
      [
        '一次選考を通過した人は、次に何をしますか。',
        ['所属長の承認を得て、応募用紙を出し直す', 'すぐに事業化の検討を始める', '経営企画部と個別に面談する', '1月下旬に、役員を前にして案を発表する'],
        3,
        'Qua vòng hồ sơ thì thuyết trình ở buổi báo cáo trước ban giám đốc cuối tháng 1 (câu 4). Câu 2 dễ nhầm, nhưng nghiên cứu kinh doanh hoá chỉ bắt đầu sau khi được 採択 (chọn), tức sau buổi thuyết trình. Không có bước phỏng vấn hay nộp lại đơn.',
      ],
    ],
    points: [
      ['採択', 'さいたく', 'được chọn, thông qua'],
      ['支障', 'ししょう', 'trở ngại'],
      ['侵害する', 'しんがいする', 'xâm phạm'],
      ['最長', 'さいちょう', 'dài nhất, tối đa'],
    ],
  }),
  item('mock1', 'sogo-dokkai', 2, {
    material: {
      kind: 'text',
      title: '地方スーパー、「値下げしない」戦略で客数増',
      body: '物価高で消費者の節約志向が強まるなか、北陸地方で28店舗を展開する食品スーパーのハマナス（本社・金沢市）が、大手チェーンとは異なる戦略で業績を伸ばしている。\n同社が今年度上半期に打ち出したのは、特売日を廃止する代わりに、日常的に購入される約500品目の価格を一年間変えないという方針だ。チラシの印刷・配布には年間約1億2千万円かかっていたが、これを半分以下に抑え、浮いた費用を価格の維持に回した。\nその結果、上半期の来店客数は前年同期比6％増加した。客一人当たりの購入額は1％減ったものの、売上高は同5％増と、県内の同業他社の平均（2％増）を上回った。\nもっとも、課題がないわけではない。特売日を目当てに来店していた高齢の顧客からは、「チラシがないと何が安いのかわからない」という声も寄せられている。同社は来春から店内の案内表示を大きくするとともに、希望者には紙の価格表を店頭で配る予定だ。\n同社の中村社長は「安さを一時的に打ち出すより、いつ来ても同じ値段という安心感のほうが、長い目で見れば客をつなぎ止める」と話す。',
    },
    questions: [
      [
        'ハマナスの方針について、本文の内容と合うものはどれですか。',
        ['日常的に買われる約500品目の価格を、一年間変えないことにした', '特売日を増やして、客数を伸ばした', 'チラシを完全にやめ、その費用をすべて値下げに使った', '大手チェーンと同じ戦略をとった'],
        0,
        'Bỏ ngày giảm giá, thay vào đó giữ nguyên giá khoảng 500 mặt hàng thường ngày trong một năm (câu 1). Câu 3 dễ nhầm, nhưng chi phí tờ rơi chỉ giảm còn dưới một nửa (chưa bỏ hẳn), và tiền dư dùng để giữ giá (価格の維持), không phải để hạ giá. Bài nói chiến lược khác các chuỗi lớn.',
      ],
      [
        '上半期の業績について、本文から言えることはどれですか。',
        ['一人当たりの購入額が増えたことで、売上が伸びた', '売上の伸び率は、県内の同業他社の平均を下回った', '客数も一人当たりの購入額も、前年を上回った', '客数の増加が一人当たり購入額の減少を補い、売上を押し上げた'],
        3,
        'Khách +6%, mức mua mỗi người −1%: 1,06 × 0,99 ≈ 1,05, đúng với doanh thu +5%. Doanh thu tăng nhờ số khách bù được phần giảm mỗi người → câu 4. Câu 1 và 3 sai vì mức mua mỗi người giảm. Câu 2 ngược: +5% cao hơn mức trung bình +2% của các công ty cùng ngành trong tỉnh.',
      ],
      [
        '中村社長の考えに最も近いものはどれですか。',
        ['一時的な安売りのほうが、客を集めやすい', '高齢の客には、チラシを配り続けるべきだ', '価格がいつも同じだという安心感が、長期的に客を離さない', '価格よりも、店内の案内表示のほうが大切だ'],
        2,
        'Giám đốc so sánh: giảm giá tạm thời không bằng cảm giác yên tâm "lúc nào đến cũng cùng giá", về lâu dài giữ chân khách (つなぎ止める) → câu 3. Câu 1 là điều ông phản bác. Câu 2 dễ nhầm vì bài có nói khách lớn tuổi muốn tờ rơi, nhưng biện pháp là bảng giá giấy tại cửa hàng, và đó không phải ý kiến của giám đốc.',
      ],
    ],
    points: [
      ['節約志向', 'せつやくしこう', 'xu hướng tiết kiệm'],
      ['打ち出す', 'うちだす', 'đưa ra (chính sách)'],
      ['つなぎ止める', 'つなぎとめる', 'giữ chân'],
      ['長い目で見る', 'ながいめでみる', 'nhìn về lâu dài'],
    ],
  }),
  item('mock1', 'sogo-dokkai', 3, {
    material: {
      kind: 'text',
      title: '新商品「ほっとジンジャー」発売に向けた打ち合わせ（要旨）',
      body: '出席：商品開発部 吉田、営業部 松本、品質管理部 杉山\n\n・発売日は当初2月1日を予定していたが、パッケージの印刷会社から、納品が1月22日になるとの連絡があった。工場での充填・箱詰めに10日、物流センターから店舗への配送に5日かかるため、2月1日の発売には間に合わない。\n・松本から、主要取引先の春の売り場替えが2月8日であり、これに間に合わなければ店頭に並ぶのは3月以降になるとの説明があった。\n・杉山から、充填工程は人員を増やせば7日に短縮できるが、品質検査を省くことはできないとの意見があった。\n・以上を踏まえ、充填工程の人員を増やして売り場替えに間に合わせることとし、吉田が工場と調整する。パッケージの印刷会社は変更しない。',
    },
    questions: [
      [
        '充填工程を7日に短縮できた場合、商品が店舗に届くのはいつになる計算ですか。',
        ['2月3日', '1月29日', '2月1日', '2月6日'],
        0,
        'Bao bì về 22/1, đóng gói 7 ngày → 29/1, giao tới cửa hàng thêm 5 ngày → 3/2 (câu 1), kịp đợt đổi quầy ngày 8/2. Câu 4 (6/2) là kết quả nếu giữ nguyên 10 ngày đóng gói. Câu 2 (29/1) mới là ngày xong ở nhà máy, chưa tính giao hàng.',
      ],
      [
        '打ち合わせで決まったことは何ですか。',
        ['品質検査を省いて、日程を縮める', '発売を3月以降に延ばす', 'パッケージの印刷会社を変更する', '充填の人員を増やし、取引先の売り場替えに間に合わせる'],
        3,
        'Kết luận ở dòng cuối (以上を踏まえ): tăng người cho khâu đóng gói để kịp đợt đổi quầy → câu 4. Câu 1 trái với ý kiến của phòng chất lượng (không bỏ kiểm tra được). Câu 2 dễ nhầm vì "tháng 3" có trong bài, nhưng đó là điều sẽ xảy ra nếu không kịp, không phải quyết định.',
      ],
    ],
    points: [
      ['充填', 'じゅうてん', 'chiết rót, nạp vào'],
      ['売り場替え', 'うりばがえ', 'đổi bố trí quầy hàng'],
      ['省く', 'はぶく', 'lược bỏ'],
    ],
  }),
  item('mock1', 'sogo-dokkai', 4, {
    material: {
      kind: 'text',
      title: '制御基板「KX-200」生産終了のお知らせ',
      body: '株式会社北斗エンジニアリング 購買部 御中\n\n平素は格別のご高配を賜り、厚く御礼申し上げます。\nさて、弊社制御基板「KX-200」につきましては、主要部品の調達が困難となったため、誠に勝手ながら来年9月末をもちまして生産を終了させていただくこととなりました。\n最終ご注文の受付は来年3月31日（水）までとし、納品は9月末までに順次行います。今後も継続してご使用をお考えのお客様は、必要となる数量をお見積もりのうえ、受付期限までにまとめてご注文くださいますようお願い申し上げます。\n後継機種として「KX-300」をご用意しております。性能はKX-200と同等以上ですが、取り付け穴の位置が一部異なります。評価用サンプルを無償でご提供いたしますので、ご希望の場合は2月末日までに弊社営業担当へお申し付けください。\nご不便をおかけいたしますが、何卒ご理解賜りますようお願い申し上げます。\n\n株式会社大成電子 営業部',
    },
    questions: [
      [
        'このお知らせの内容と合うものはどれですか。',
        ['KX-200の納品は、来年3月末で終わる', 'KX-200の注文は来年3月末まで受け付けられ、納品は9月末までに行われる', 'KX-300はKX-200とまったく同じ形なので、そのまま取り付けられる', 'KX-300の評価用サンプルは有料で提供される'],
        1,
        'Hai mốc khác nhau: nhận đơn cuối tới 31/3, giao hàng lần lượt tới cuối tháng 9 → câu 2. Câu 1 dễ nhầm vì lẫn mốc nhận đơn với mốc giao hàng. KX-300 có vị trí lỗ lắp khác một phần nên không lắp thẳng được; mẫu thử là 無償 (miễn phí).',
      ],
      [
        '今後もしばらくKX-200を使い続けたい北斗エンジニアリングは、どうするべきですか。',
        ['9月末まで、必要になるたびに注文する', '必要になる数量を見積もり、3月末までにまとめて注文する', '2月末までに、KX-300のサンプルを注文する', '大成電子に、生産を続けるよう依頼する'],
        1,
        'Thư yêu cầu khách muốn dùng tiếp ước tính số lượng cần và đặt gộp một lần trước hạn nhận đơn 31/3 (câu 2). Câu 1 dễ nhầm vì tháng 9 vẫn còn giao hàng, nhưng sau 31/3 không nhận đơn nữa. Câu 3 là việc dành cho khách muốn chuyển sang KX-300, và mẫu thử là "xin" chứ không phải "đặt mua".',
      ],
    ],
    points: [
      ['生産終了', 'せいさんしゅうりょう', 'ngừng sản xuất'],
      ['後継機種', 'こうけいきしゅ', 'mẫu máy kế nhiệm'],
      ['無償', 'むしょう', 'miễn phí'],
      ['ご高配', 'ごこうはい', 'sự quan tâm (kính ngữ)'],
    ],
  }),
];

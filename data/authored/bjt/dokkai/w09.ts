import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/** Week 9 — complaints and apologies (reading). Level: J1. */
export const W09: BjtItem[] = [
  item('w09', 'goi', 1, {
    questions: [
      [
        'このたびは弊社の＿＿＿により、多大なるご迷惑をおかけいたしましたこと、心よりお詫び申し上げます。',
        ['不手際', '不得手', '不具合', '不調法'],
        0,
        'Câu 1: 不手際 = sơ suất trong cách làm, cách xử lý; doanh nghiệp xin lỗi vì 弊社の不手際 là cụm cố định. Câu 3 (不具合) dễ nhầm nhất nhưng chỉ dùng cho máy móc, sản phẩm bị trục trặc, không dùng cho "công ty". 不得手 là sở đoản, không giỏi việc gì (英語が不得手だ), không làm nguyên nhân gây phiền được. 不調法 là vụng về, cổ và không hợp văn xin lỗi doanh nghiệp.',
      ],
    ],
    points: [
      ['不手際', 'ふてぎわ', 'sơ suất trong xử lý công việc'],
      ['多大なる', 'ただいなる', 'rất lớn (văn trang trọng)'],
    ],
  }),
  item('w09', 'goi', 2, {
    questions: [
      [
        '今後は出荷前のチェック体制を＿＿＿、再発防止に努めてまいります。',
        ['改まり', '整い', '収まり', '改め'],
        3,
        'Câu 4: 体制を改める — có trợ từ を nên cần tha động từ 改める (sửa đổi). Câu 1 (改まり) là tự động từ cùng cặp, dùng khi chủ ngữ tự thay đổi (体制が改まる), nên sai với を. 整う, 収まる cũng là tự động từ.',
      ],
    ],
    points: [
      ['改める', 'あらためる', 'sửa đổi, cải tổ (tha động từ)'],
      ['再発防止', 'さいはつぼうし', 'ngăn tái diễn'],
    ],
  }),
  item('w09', 'goi', 3, {
    questions: [
      [
        'お送りいただいた破損箇所の写真は、品質管理部の担当者がすでに＿＿＿。',
        ['拝見いたしました', 'ご覧になりました', 'お目にかかりました', '拝見なさいました'],
        0,
        'Câu 1: người xem là nhân viên phía mình, nói với khách nên dùng khiêm nhường ngữ 拝見いたしました. Câu 2 là tôn kính ngữ, đề cao người phía mình trước mặt khách là sai hướng kính ngữ. Câu 4 ghép khiêm nhường (拝見) với tôn kính (なさる) nên sai. お目にかかる là "gặp", không phải "xem".',
      ],
    ],
    points: [
      ['拝見する', 'はいけんする', 'xem (khiêm nhường ngữ)'],
      ['破損箇所', 'はそんかしょ', 'chỗ bị hư hỏng'],
    ],
  }),
  item('w09', 'goi', 4, {
    questions: [
      [
        'お客様からいただいた貴重なご意見は、今後のサービス向上の＿＿＿とさせていただきます。',
        ['餌', '肥', '糧', '種'],
        2,
        'Câu 3: ～を糧とする = lấy làm "lương thực", động lực để tiến bộ; cụm cố định khi nhận góp ý. Câu 2 (肥, phân bón) cũng là ẩn dụ "nuôi lớn" nên dễ chọn, nhưng tiếng Nhật không nói 向上の肥とする. 餌 (mồi) và 種 (hạt giống) không dùng trong mẫu câu này.',
      ],
    ],
    points: [
      ['糧', 'かて', 'nguồn nuôi dưỡng, động lực (nghĩa bóng)'],
      ['向上', 'こうじょう', 'nâng cao, cải thiện'],
    ],
  }),
  item('w09', 'goi', 5, {
    questions: [
      [
        '確認の手順を省けば、同じようなミスがまた起こり＿＿＿。',
        ['えません', 'かねます', 'ようがありません', 'かねません'],
        3,
        'Câu 4: Vます + かねない = có nguy cơ (điều xấu) xảy ra; đúng ý "bỏ bước kiểm tra thì lỗi có thể lặp lại". Câu 2 (かねます) là dạng khẳng định, nghĩa ngược hẳn: "khó mà / không thể làm" (lời từ chối lịch sự). Câu 1 (起こりえません) là "không thể xảy ra", trái ý. Câu 3 là "không có cách nào".',
      ],
    ],
    points: [
      ['～かねない', 'かねない', 'có nguy cơ (điều xấu xảy ra)'],
      ['省く', 'はぶく', 'lược bỏ'],
    ],
  }),
  item('w09', 'goi', 6, {
    questions: [
      [
        'ご迷惑をおかけしたお詫びの＿＿＿として、次回ご利用時に使える割引券を同封いたしました。',
        ['しるし', 'あかし', 'きざし', 'めじるし'],
        0,
        'Câu 1: お詫びのしるし = món quà, vật bày tỏ lời xin lỗi, cụm cố định (cũng có お礼のしるし). Câu 2 (あかし, bằng chứng) gần nghĩa "dấu hiệu" nhưng chỉ dùng như 身のあかし, 愛のあかし, không đi với お詫び. きざし là điềm báo, めじるし là mốc để nhận ra.',
      ],
    ],
    points: [
      ['お詫びのしるし', 'おわびのしるし', 'chút quà tạ lỗi'],
      ['同封する', 'どうふうする', 'gửi kèm trong phong bì'],
    ],
  }),
  item('w09', 'hyogen', 1, {
    material: {
      kind: 'text',
      title: '出荷遅延のお詫び',
      body: 'お客様各位\n\n平素より「ミナモ食品」オンラインショップをご利用いただき、誠にありがとうございます。\n11月18日から20日にかけてご注文いただいた商品につきまして、物流センターのシステム障害により、出荷が最大3日遅れております。ご迷惑をおかけし、深くお詫び申し上げます。\nお詫びとして、対象となるご注文の送料を全額返金いたします。返金はご注文時のお支払い方法にて、12月5日までに行います。\nなお、代金引換でお支払いのお客様につきましては、返金先の口座情報を別途メールにてお伺いいたします。',
    },
    questions: [
      [
        '代金引換で支払った客について、正しいものはどれですか。',
        ['送料は返金の対象にならない', '注文時と同じ方法で自動的に返金される', '返金を受ける口座を知らせる必要がある', '12月5日までに商品を返送しなければならない'],
        2,
        'Câu 3: câu sau なお là ngoại lệ: khách trả tiền khi nhận hàng (代金引換) sẽ được hỏi số tài khoản qua email. Câu 2 đúng với đa số khách (返金はご注文時のお支払い方法にて) nhưng bỏ sót ngoại lệ này. Thư không yêu cầu gửi trả hàng.',
      ],
    ],
    points: [
      ['代金引換', 'だいきんひきかえ', 'trả tiền khi nhận hàng (COD)'],
      ['お客様各位', 'おきゃくさまかくい', 'kính gửi quý khách hàng'],
      ['別途', 'べっと', 'riêng, bằng cách khác'],
    ],
  }),
  item('w09', 'hyogen', 2, {
    material: {
      kind: 'text',
      title: 'お客様からの苦情の一次対応について（通知）',
      body: 'お客様相談室 室員各位\n\n12月1日より、電話で受けた苦情の対応手順を次のとおり改めます。\n・通話を終えたら、当日中に対応記録をシステムに入力してください。\n・回答に3営業日以上かかる見込みの場合は、その旨をお客様にお伝えしたうえで、上司にメールで報告してください。\nただし、商品が原因でけがをした、体調を崩したなど、健康に関わる内容の場合は、記録の入力より先に、直ちに品質保証部へ電話で連絡してください。',
    },
    questions: [
      [
        '「この商品で子どもがけがをした」という電話を受けた室員は、通話のあとまず何をしなければなりませんか。',
        ['当日中に対応記録をシステムに入力する', '品質保証部に電話で知らせる', '上司にメールで報告する', 'お客様に回答の時期を伝える'],
        1,
        'Câu 2: sau ただし là ngoại lệ cho nội dung liên quan sức khoẻ (けが, 体調を崩す): phải gọi ngay cho bộ phận đảm bảo chất lượng, trước cả việc nhập biên bản. Câu 1 là quy trình thông thường nên dễ chọn, nhưng thông báo ghi rõ 記録の入力より先に.',
      ],
    ],
    points: [
      ['一次対応', 'いちじたいおう', 'xử lý ban đầu'],
      ['その旨', 'そのむね', 'nội dung đó, điều đó'],
      ['直ちに', 'ただちに', 'ngay lập tức'],
    ],
  }),
  item('w09', 'hyogen', 3, {
    material: {
      kind: 'text',
      body: '中村様\n\nこのたびは当店スタッフの応対により、ご不快な思いをおかけしましたこと、店長として心よりお詫び申し上げます。\nいただいたお手紙を拝読し、当該スタッフから事情を聞きましたところ、ご説明の途中で別のお客様の対応に移るなど、配慮を欠いた対応であったことが分かりました。本人には厳重に注意いたしましたうえ、今月中に全従業員を対象とした接客研修を実施いたします。\nなお、ご要望のございましたご返金につきましては、商品自体に不備は見当たらないため、誠に恐縮ながら応じかねますことをご了承くださいませ。\n\nさくら家電 駅前店 店長 木下',
    },
    questions: [
      [
        'この手紙で店長が約束していることは何ですか。',
        ['商品の代金を返金する', '担当したスタッフを別の店に移す', '従業員全員に接客の研修を行う', '商品を新しいものと交換する'],
        2,
        'Câu 3: 全従業員を対象とした接客研修を実施いたします = sẽ tổ chức đào tạo tiếp khách cho toàn bộ nhân viên. Câu 1 là yêu cầu của khách, nhưng sau なお cửa hàng từ chối bằng 応じかねます (không thể đáp ứng). Nhân viên kia chỉ bị nhắc nhở nghiêm, không bị chuyển chỗ.',
      ],
    ],
    points: [
      ['当該', 'とうがい', '(người, việc) liên quan, nói trên'],
      ['拝読する', 'はいどくする', 'đọc (khiêm nhường ngữ)'],
      ['応じかねる', 'おうじかねる', 'không thể đáp ứng (từ chối lịch sự)'],
    ],
  }),
  item('w09', 'sogo-dokkai', 1, {
    material: {
      kind: 'text',
      title: '品質会議 議事録（抜粋）',
      body: '日時：11月12日（火）10:00〜11:00\n出席：製造部 村井、品質保証部 長谷川、営業部 森田、物流部 小野\n\n1．経緯\n10月下旬に出荷した業務用冷凍ぎょうざ約1,200袋で、賞味期限が実際より1か月長く印字されていた。取引先のスーパー2社からの指摘で判明し、該当品はすべて回収済み。健康被害の報告はない。\n\n2．原因\n印字機の日付設定は、毎月初めに担当者が変更し、別の社員が確認する決まりになっている。10月は担当者が異動した直後で引き継ぎが不十分だったうえ、確認役の社員が出張中だったため、確認が行われないまま出荷された。\n\n3．対策\n（1）日付設定の変更後、最初に印字した1袋を写真に撮って品質保証部に送る。品質保証部の承認を得るまで製造を始めない。\n（2）確認役が不在の場合は、製造部長が代わりに確認する。\n（3）取引先への説明は営業部が行う。ただし、回収費用の負担についての話し合いには品質保証部も同席する。\n\n4．次回\n11月26日（火）。物流部より回収品の廃棄状況を報告する。',
    },
    questions: [
      [
        '今回の問題が起きた主な原因は何ですか。',
        ['印字機が故障していたから', '新しい担当者への引き継ぎが不十分で、確認も行われなかったから', '取引先が賞味期限を誤って伝えたから', '品質保証部が写真を確認しなかったから'],
        1,
        'Câu 2: mục 原因 nêu hai việc chồng lên nhau: bàn giao cho người mới chưa đủ, và người kiểm tra đi công tác nên không ai kiểm. Câu 4 dễ nhầm vì có nhắc ảnh chụp và 品質保証部, nhưng đó là biện pháp mới ở mục 3, chưa từng có trước sự cố. Máy in không hỏng; đối tác là bên phát hiện lỗi.',
      ],
      [
        '取引先と回収費用の負担について話し合うとき、会社側からはだれが出席しますか。',
        ['営業部だけ', '品質保証部と製造部長', '営業部と物流部', '営業部と品質保証部'],
        3,
        'Câu 4: giải thích với đối tác là việc của 営業部, nhưng ngoại lệ sau ただし nói khi bàn chuyện chi phí thu hồi thì 品質保証部 cũng tham dự. Câu 1 chỉ đọc nửa đầu điều (3). 製造部長 chỉ thay người kiểm tra khi vắng mặt; 物流部 báo cáo việc tiêu huỷ ở cuộc họp sau.',
      ],
    ],
    points: [
      ['回収済み', 'かいしゅうずみ', 'đã thu hồi xong'],
      ['引き継ぎ', 'ひきつぎ', 'bàn giao công việc'],
      ['同席する', 'どうせきする', 'cùng tham dự (cuộc họp, buổi làm việc)'],
      ['判明する', 'はんめいする', 'được làm rõ, phát hiện ra'],
    ],
  }),
  item('w09', 'sogo-dokkai', 2, {
    material: {
      kind: 'text',
      title: '納品ミスについて',
      body: '株式会社トーワ事務機 営業部 佐々木様\n\nいつもお世話になっております。株式会社大和建設 総務課の西田です。\n11月8日に納品いただいたコピー用紙ですが、注文したA4ではなく、B4が20箱届きました。お電話でも申し上げましたとおり、同様のミスは今回で3回目になります。前回9月の際には、再発防止策として「出荷前のダブルチェック」をご提示いただきましたが、それが実際に行われているのか、疑問を抱かざるを得ません。\n誤って届いたB4の20箱は、お引き取りの日程が決まるまで当社の倉庫でお預かりしております。ただ、倉庫に余裕がないため、今月中にお引き取りいただけますと助かります。\nまた、11月分の請求書は、正しい商品がそろってから発行していただくようお願いいたします。\n弊社としましても、長年お付き合いのある御社とは、今後とも良い関係を続けたいと考えております。そのためにも、今回のミスの原因と、9月の対策がなぜ機能しなかったのかについて、11月20日までに書面でご説明ください。その内容によっては、来年度の発注先について社内で改めて検討することになるかと存じます。',
    },
    questions: [
      [
        '西田さんがこのメールで最も伝えたいことは何ですか。',
        ['B4の用紙も引き続き使わせてほしい', '9月の対策をこのまま続けてほしい', '納得できる説明がなければ、取引先を変えることもありうる', '11月分の請求書を早く送ってほしい'],
        2,
        'Câu 3: đoạn cuối mềm mỏng (良い関係を続けたい) nhưng câu chốt その内容によっては…改めて検討する là lời cảnh báo nói vòng: giải trình không thuyết phục thì có thể đổi nhà cung cấp năm sau. Câu 2 sai vì người viết nghi ngờ biện pháp tháng 9 có được làm thật không. Hoá đơn thì xin phát hành muộn lại, không phải gửi sớm.',
      ],
      [
        '誤って届いたB4の用紙は、今どうなっていますか。',
        ['すでにトーワ事務機に返送された', '大和建設が倉庫で保管している', '大和建設が買い取ることになった', '11月20日に引き取られる予定だ'],
        1,
        'Câu 2: 当社の倉庫でお預かりしております = công ty Yamato đang giữ hộ trong kho cho tới khi định ngày đến lấy. Câu 4 lấy ngày 20/11, nhưng đó là hạn nộp văn bản giải trình; ngày đến lấy hàng chưa định, chỉ mong là trong tháng.',
      ],
    ],
    points: [
      ['～ざるを得ない', 'ざるをえない', 'không thể không …'],
      ['お預かりする', 'おあずかりする', 'giữ hộ (khiêm nhường)'],
      ['発注先', 'はっちゅうさき', 'nơi đặt hàng, nhà cung cấp'],
      ['書面', 'しょめん', 'văn bản (giấy tờ)'],
    ],
  }),
];

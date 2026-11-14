import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/** Week 7 — negotiation and client meetings: quotes, conditions, counter-offers. Level: J1. */
export const W07: BjtItem[] = [
  item('w07', 'jokyo', 1, {
    material: {
      kind: 'scene',
      vi: 'Phòng họp nhỏ. Hai người ngồi đối diện qua bàn; trên bàn có một bảng báo giá và một hộp sản phẩm mẫu. Một người đang cầm bút ghi chép.',
    },
    script: [
      ['女', 'あのう、先日ご相談いただいた件なんですが、社内で検討いたしまして……。', 'Ừm, về việc hôm trước quý công ty trao đổi với chúng tôi, chúng tôi đã bàn trong nội bộ…'],
      ['男', 'ええ。いかがでしたでしょうか。', 'Vâng. Kết quả thế nào ạ?'],
      ['女', 'さすがに一割というのは、ちょっと厳しくて。五パーセントでしたら、何とかお応えできるんですが。', 'Mười phần trăm thì quả thật hơi khó. Nếu là năm phần trăm thì chúng tôi có thể cố gắng đáp ứng.'],
      ['男', '五パーセントですか……。実は来年から、年間の発注数を増やすことも考えているんですが。', 'Năm phần trăm à… Thật ra từ năm sau chúng tôi cũng đang tính tăng số lượng đặt hàng cả năm.'],
      ['女', 'そういうことでしたら、数量次第で、もう少し勉強させていただけるかもしれません。', 'Nếu vậy thì tuỳ số lượng, có thể chúng tôi bớt thêm được chút nữa.'],
    ],
    questions: [
      [
        '二人は何について話していますか。',
        ['先日の納期の件', '先日の値引きの件', '先日の発注数の件', '先日の支払い条件の件'],
        1,
        'Họ bàn mức giảm giá: 一割 (10%) thì khó, 五パーセント thì được, và 勉強させていただく là cách người bán nói "bớt giá". Lựa chọn 3 có từ 発注数 nghe trong băng, nhưng số lượng chỉ là điều kiện để được giảm thêm, không phải chủ đề. Hạn giao và điều kiện thanh toán (lựa chọn 1, 4) không ai nhắc.',
      ],
    ],
    points: [
      ['勉強させていただく', 'べんきょうさせていただく', 'bớt giá (cách nói của bên bán)'],
      ['数量次第', 'すうりょうしだい', 'tuỳ theo số lượng'],
      ['厳しい', 'きびしい', 'khó (cách từ chối nhẹ)'],
    ],
  }),
  item('w07', 'jokyo', 2, {
    material: {
      kind: 'scene',
      vi: 'Văn phòng. Hai người đứng cạnh một bàn làm việc, nhìn màn hình có lịch tháng. Bên cạnh bàn phím là một tập hồ sơ dán nhãn tên công ty đối tác.',
    },
    script: [
      ['男', '丸岡物産さんとの取り決め、来月末で切れるんだよね。', 'Thoả thuận với Maruoka Bussan hết hạn vào cuối tháng sau nhỉ.'],
      ['女', 'はい。先方からは、条件は今のままで、期間を二年にできないかと言われています。', 'Vâng. Bên họ hỏi có thể giữ nguyên điều kiện mà kéo thời hạn thành hai năm không.'],
      ['男', '二年か。原料の値動きを考えると、一年ごとのほうが安心なんだけどな。', 'Hai năm à. Nghĩ đến biến động giá nguyên liệu thì từng năm một vẫn yên tâm hơn.'],
      ['女', 'では、一年で、どちらからも申し出がなければ自動的に延長、という形はいかがでしょう。来週の打ち合わせでご提案してみます。', 'Vậy để một năm, nếu không bên nào có ý kiến thì tự động gia hạn, thế có được không ạ? Tôi sẽ thử đề xuất trong buổi họp tuần sau.'],
      ['男', 'うん、その線で頼むよ。書類の準備もお願いね。', 'Ừ, nhờ em theo hướng đó. Chuẩn bị giấy tờ luôn nhé.'],
    ],
    questions: [
      [
        '二人は何について話していますか。',
        ['丸岡物産との契約更新について', '丸岡物産との打ち合わせについて', '丸岡物産との価格交渉について', '丸岡物産との新規取引について'],
        0,
        'Thoả thuận sắp hết hạn (切れる), hai người bàn nên kéo dài hai năm hay một năm và tự động gia hạn → chủ đề là gia hạn hợp đồng, lựa chọn 1. Lựa chọn 2 có từ 打ち合わせ nghe trong băng, nhưng buổi họp chỉ là nơi sẽ đưa đề xuất. Lựa chọn 3 sai vì điều kiện giữ nguyên, không ai mặc cả giá.',
      ],
    ],
    points: [
      ['取り決め', 'とりきめ', 'thoả thuận'],
      ['値動き', 'ねうごき', 'biến động giá'],
      ['その線で', 'そのせんで', 'theo hướng đó'],
    ],
  }),
  item('w07', 'shiryo', 1, {
    material: {
      kind: 'bars',
      title: '業者別の費用（万円）',
      unit: '万円',
      labels: ['P社', 'Q社', 'R社', 'S社'],
      series: [
        { name: '初期費用', values: [100, 80, 60, 120] },
        { name: '年間保守費用', values: [10, 20, 30, 0] },
      ],
    },
    script: [
      ['女', '初期費用だけ見るとR社が一番安いですが、システムは五年間使う予定です。', 'Nếu chỉ nhìn chi phí ban đầu thì công ty R rẻ nhất, nhưng hệ thống sẽ dùng năm năm.'],
      ['女', '初期費用と五年分の保守費用を合わせた額が、一番安い業者に決めたいと思います。', 'Tôi muốn chọn nhà cung cấp có tổng chi phí ban đầu cộng năm năm bảo trì thấp nhất.'],
    ],
    questions: [
      [
        'どの業者に決まりますか。',
        ['P社', 'Q社', 'S社', 'R社'],
        2,
        'Tổng năm năm: P = 100 + 10×5 = 150; Q = 80 + 100 = 180; R = 60 + 150 = 210; S = 120 + 0 = 120. S rẻ nhất. R rẻ nhất lúc đầu nhưng đắt nhất sau năm năm.',
      ],
    ],
    points: [
      ['初期費用', 'しょきひよう', 'chi phí ban đầu'],
      ['業者', 'ぎょうしゃ', 'nhà cung cấp, doanh nghiệp (bên ngoài)'],
    ],
  }),
  item('w07', 'shiryo', 2, {
    material: {
      kind: 'table',
      title: '数量割引のご案内',
      head: ['ご発注数', '割引率'],
      rows: [
        ['100個未満', 'なし'],
        ['100〜299個', '5%'],
        ['300〜499個', '8%'],
        ['500個以上', '12%'],
      ],
      note: '※分納をご希望の場合は、割引率を一段階下げさせていただきます。',
    },
    script: [
      ['男', '今回は二百五十個の予定でしたが、来月分の二百個もまとめて、一緒に発注しようと思います。', 'Lần này định đặt hai trăm năm mươi cái, nhưng tôi định gộp luôn hai trăm cái của tháng sau vào đặt một lần.'],
      ['男', 'ただ、倉庫が狭いので、納品は今月と来月の二回に分けていただきたいんです。', 'Có điều kho hẹp, nên tôi muốn giao làm hai lần, tháng này và tháng sau.'],
    ],
    questions: [
      [
        '割引率は何パーセントになりますか。',
        ['5%', '8%', '12%', 'なし'],
        0,
        '250 + 200 = 450 cái, thuộc mức 300–499 = 8%. Nhưng giao hai lần là 分納, theo ghi chú bị hạ một bậc → 5%. 8% là đáp án của người quên ghi chú. 12% là khi tính nhầm vượt 500.',
      ],
    ],
    points: [
      ['分納', 'ぶんのう', 'giao hàng nhiều đợt'],
      ['割引率', 'わりびきりつ', 'tỉ lệ chiết khấu'],
      ['まとめる', 'まとめる', 'gộp lại'],
    ],
  }),
  item('w07', 'shiryo', 3, {
    material: {
      kind: 'table',
      title: '取引条件 先方からのご要望',
      head: ['項目', '現行', '先方のご要望'],
      rows: [
        ['単価', '1,000円', '950円'],
        ['支払い', '翌月末', '翌々月末'],
        ['納期', '受注後10日', '受注後7日'],
        ['最低発注数', '200個', '100個'],
      ],
    },
    script: [
      ['女', '先方のご要望ですが、単価は応じましょう。支払い条件は、うちの規定があるので変えられません。', 'Về các yêu cầu của bên kia: đơn giá thì ta chấp nhận. Điều kiện thanh toán thì vì quy định bên mình nên không đổi được.'],
      ['女', '納期は工場次第ですが、今の体制では無理ですね。その代わり、最低発注数のほうは認めることにしましょう。', 'Hạn giao thì tuỳ nhà máy, nhưng với cách tổ chức hiện nay là không được. Bù lại, ta chấp nhận yêu cầu về số lượng đặt tối thiểu.'],
    ],
    questions: [
      [
        '先方のご要望のうち、受け入れるのはどれですか。',
        ['単価だけ', '単価と納期', '支払いと最低発注数', '単価と最低発注数'],
        3,
        'Chấp nhận: đơn giá (応じましょう) và số lượng tối thiểu (認めることにしましょう). Không chấp nhận: thanh toán (変えられません) và hạn giao (無理ですね). その代わり báo hiệu một điều được nhượng để bù.',
      ],
    ],
    points: [
      ['応じる', 'おうじる', 'đáp ứng, chấp nhận'],
      ['体制', 'たいせい', 'cách tổ chức, cơ chế'],
      ['〜次第', 'しだい', 'tuỳ thuộc vào'],
    ],
  }),
  item('w07', 'sogo-chodokkai', 1, {
    material: {
      kind: 'table',
      title: '三和精機までの地図（上が北）',
      head: [],
      rows: [
        ['【1】', '', 'ホテル', '', '【2】'],
        ['', '', '', '', ''],
        ['コンビニ', '', '公園', '', '銀行'],
        ['', '', '', '', ''],
        ['駅（東口）', '', '【3】', '', '【4】'],
      ],
      note: '※空白は道路。',
    },
    script: [
      ['男', 'あのう、明日初めて三和精機さんに伺うんですが、道を教えていただけますか。地図アプリだと、駅から十分ぐらいと出るんですが。', 'Ừm, ngày mai lần đầu tôi đến Sanwa Seiki, chị chỉ đường giúp được không ạ? Ứng dụng bản đồ báo từ ga đi mất khoảng mười phút.'],
      ['女', 'ええ、歩いて十分ちょっとですね。駅の東口を出ると、右斜め前に大きな公園が見えるんですよ。', 'Ừ, đi bộ hơn mười phút một chút. Ra cửa Đông của ga là thấy một công viên lớn ở phía chéo bên phải trước mặt.'],
      ['男', 'はい。公園の中を通り抜ければ近そうですね。', 'Vâng. Đi xuyên qua công viên thì có vẻ gần nhỉ.'],
      ['女', 'それが、今は工事中で、中は通れないんです。ですから、公園の手前の道を右に行って、銀行の角を左に曲がってください。', 'Chuyện là bây giờ đang thi công nên không đi qua bên trong được. Vì vậy anh theo con đường phía trước công viên đi sang phải, rồi rẽ trái ở góc ngân hàng.'],
      ['男', '銀行の角を左、ですね。', 'Rẽ trái ở góc ngân hàng, phải không ạ.'],
      ['女', 'ええ、角にATMのある銀行です。曲がると少し上り坂になりますけど、そのまま北へまっすぐです。', 'Ừ, ngân hàng có máy ATM ở góc. Rẽ vào thì đường hơi dốc lên một chút, nhưng cứ đi thẳng về hướng bắc.'],
      ['女', 'ええ。そのまましばらく行くと、左側にホテルがあります。三和精機さんは、そのホテルの向かいのビルです。一階がコンビニなので、すぐわかると思いますよ。', 'Ừ. Cứ đi thẳng một lúc sẽ thấy khách sạn bên tay trái. Sanwa Seiki ở toà nhà đối diện khách sạn đó. Tầng một là cửa hàng tiện lợi nên chắc anh sẽ nhận ra ngay.'],
      ['男', 'あれ、駅前の、公園の向かいのビルじゃありませんでしたっけ。名刺の住所がそうなっていたような……。', 'Ơ, chẳng phải là toà nhà trước ga, đối diện công viên sao ạ? Hình như địa chỉ trên danh thiếp ghi như vậy…'],
      ['女', 'ああ、それは去年までです。移転されたんですよ。古い名刺だと、住所が前のままなんです。', 'À, đó là đến năm ngoái thôi. Họ đã chuyển văn phòng rồi. Danh thiếp cũ thì địa chỉ vẫn là chỗ cũ.'],
      ['男', 'そうでしたか。危ないところでした。ありがとうございます。', 'Ra vậy. Suýt nữa thì nhầm. Cảm ơn chị.'],
    ],
    questions: [
      [
        '三和精機の事務所はどこにありますか。',
        ['【1】', '【2】', '【3】', '【4】'],
        1,
        'Ra cửa Đông, theo đường phía nam công viên sang phải (hướng đông), rẽ trái (lên bắc) ở góc ngân hàng; khách sạn bên trái, công ty ở toà nhà đối diện → 【2】, lựa chọn 2. Lựa chọn 3 (【3】, trước ga, đối diện công viên) là địa chỉ cũ trên danh thiếp; công ty đã chuyển đi từ năm ngoái.',
      ],
    ],
    points: [
      ['通り抜ける', 'とおりぬける', 'đi xuyên qua'],
      ['移転', 'いてん', 'chuyển trụ sở'],
      ['向かい', 'むかい', 'phía đối diện'],
    ],
  }),
  item('w07', 'sogo-chodokkai', 2, {
    material: {
      kind: 'table',
      title: '東邦化成様 来社スケジュール（2026年12月10日（木））',
      head: ['時間', '予定'],
      rows: [
        ['10:00〜11:30', '【1】工場見学'],
        ['11:30〜13:00', '【2】昼食'],
        ['13:00〜14:30', '【3】技術説明'],
        ['15:00〜16:30', '【4】価格の協議'],
      ],
    },
    script: [
      ['女', 'あのう、明日の東邦化成さんの件で、先ほど購買の大川部長からお電話がありまして。', 'Ừm, về chuyện công ty Toho Kasei ngày mai, lúc nãy trưởng bộ phận mua hàng Okawa có gọi điện.'],
      ['男', 'うん。何かあった？', 'Ừ. Có chuyện gì à?'],
      ['女', '急に午後から本社で会議が入ったそうで、お昼を召し上がったら、そのままお帰りになるそうなんです。', 'Hình như đột xuất có cuộc họp ở trụ sở chính từ chiều, nên dùng bữa trưa xong là vị ấy về luôn.'],
      ['男', 'え、じゃあ三時からの価格の話には出ていただけないってこと？　部長がいらっしゃらないと、何も決まらないよ。', 'Hả, vậy là không dự được phần bàn giá từ ba giờ à? Trưởng bộ phận không có mặt thì chẳng quyết được gì.'],
      ['女', 'そうなんです。それで、お昼を召し上がりながら、価格のお話をしていただくのはどうかと思ったんですが。', 'Đúng vậy. Nên tôi nghĩ hay là vừa dùng bữa trưa vừa bàn về giá.'],
      ['男', 'いや、数字の話を食事の席でするのは、ちょっとね。資料も広げられないし。', 'Không, nói chuyện con số ở bàn ăn thì hơi… Cũng không bày tài liệu ra được.'],
      ['女', 'では、見学と入れ替えて、朝一番にするのはいかがでしょう。', 'Vậy đổi chỗ với buổi tham quan, làm ngay đầu buổi sáng thì sao ạ?'],
      ['男', '朝一番か。こっちの資料は、今晩中に仕上げれば間に合うな。工場長も、午前中はラインの立ち会いがあるから、見学は午後のほうがありがたいって言ってたし。', 'Đầu buổi sáng à. Tài liệu bên mình làm xong trong tối nay là kịp. Quản đốc nhà máy cũng nói buổi sáng phải giám sát dây chuyền, nên tham quan buổi chiều thì tiện hơn.'],
      ['女', 'では、そのように先方にご連絡します。技術説明はどうしましょう。', 'Vậy tôi sẽ báo bên họ như thế. Phần giới thiệu kỹ thuật thì sao ạ?'],
      ['男', '見学のあとに続けてやろう。昼食はそのままで。', 'Làm tiếp ngay sau tham quan. Bữa trưa giữ nguyên.'],
      ['女', '承知しました。工場長にも、見学が午後になったとお伝えしておきます。', 'Vâng ạ. Tôi cũng sẽ báo quản đốc là buổi tham quan chuyển sang chiều.'],
      ['男', '頼むよ。先方の人数が変わらないかも、念のため確認しておいて。', 'Nhờ em nhé. Hỏi luôn cho chắc xem số người bên họ có thay đổi không.'],
    ],
    questions: [
      [
        '価格の協議は、どの時間に行うことになりましたか。',
        ['【1】の時間', '【2】の時間', '【3】の時間', '【4】の時間'],
        0,
        'Trưởng bộ phận Okawa về ngay sau bữa trưa, nên phần bàn giá được đổi chỗ với buổi tham quan và làm 朝一番 → khung 10:00 của 【1】, lựa chọn 1. Lựa chọn 2 (vừa ăn trưa vừa bàn) là đề xuất đầu tiên nhưng bị bác vì không bày tài liệu được; lựa chọn 4 là lịch cũ.',
      ],
    ],
    points: [
      ['朝一番', 'あさいちばん', 'việc đầu tiên buổi sáng'],
      ['立ち会い', 'たちあい', 'có mặt giám sát'],
      ['入れ替える', 'いれかえる', 'đổi chỗ cho nhau'],
    ],
  }),
  item('w07', 'sogo-chodokkai', 3, {
    material: {
      kind: 'text',
      title: 'メール下書き',
      body: '件名：お見積もり条件について\n\nみなと食品株式会社　仕入部　原田様\n\nいつもお世話になっております。先日はご要望をお聞かせいただき、ありがとうございました。\n\n【1】ご提示の単価につきましては、社内で検討いたしましたが、現行価格の据え置きでご容赦いただけますと幸いです。\n【2】なお、年間契約をいただける場合は、送料を弊社にて負担いたします。\n【3】納期につきましては、ご要望どおり、受注後5営業日とさせていただきます。\n【4】また、今月中にご契約いただければ、初回分を10%お値引きいたします。\n\n引き続きどうぞよろしくお願い申し上げます。\n\n北斗パック株式会社　営業部　松井',
    },
    script: [
      ['男', '課長、原田様へのお返事の下書きができたので、見ていただけますか。今日中にお送りしたいと思っておりまして。', 'Trưởng phòng, tôi đã viết nháp thư trả lời gửi Harada-sama, trưởng phòng xem giúp được không ạ? Tôi muốn gửi trong hôm nay.'],
      ['女', 'どれどれ。……単価のところ、断り方としてはちょっと硬いけど、まあ、これでいいでしょう。', 'Để xem nào… Chỗ đơn giá, cách từ chối hơi cứng, nhưng thôi, thế này cũng được.'],
      ['男', '送料の件は、書いてしまって大丈夫でしょうか。', 'Chuyện phí vận chuyển, viết vào như vậy có ổn không ạ?'],
      ['女', 'それは前から部長の了解をもらってるから、問題ないわ。それより納期。五営業日って、工場には確認した？', 'Cái đó đã được trưởng bộ phận đồng ý từ trước rồi, không vấn đề gì. Quan trọng hơn là hạn giao. Năm ngày làm việc, đã hỏi nhà máy chưa?'],
      ['男', 'あ、先方のご要望をそのまま書いてしまいました。確認していませんでした。', 'À, tôi đã viết y nguyên yêu cầu của bên kia. Tôi chưa hỏi lại ạ.'],
      ['女', '今の生産計画だと、七日はほしいって言われてるのよ。そこは工場と相談して書き直して。', 'Theo kế hoạch sản xuất hiện tại, nhà máy bảo cần bảy ngày đấy. Chỗ đó bàn với nhà máy rồi viết lại.'],
      ['男', 'はい。最後の値引きの文はいかがですか。少しでも早く決めていただこうと思いまして。', 'Vâng. Còn câu giảm giá ở cuối thì sao ạ? Tôi nghĩ như vậy để họ quyết sớm hơn chút.'],
      ['女', '気持ちはわかるけど、十パーセントなんて、誰も承認していないでしょう。単価は据え置くと言っておいて値引きじゃ、話がおかしくなるし。', 'Tôi hiểu ý, nhưng mười phần trăm thì có ai duyệt đâu. Vừa nói giữ nguyên đơn giá mà lại giảm giá thì câu chuyện thành kỳ cục.'],
      ['男', 'おっしゃるとおりです。では、そこは外して、もう一度お持ちします。', 'Trưởng phòng nói đúng ạ. Vậy tôi bỏ chỗ đó rồi mang bản khác lại.'],
      ['女', '直したら、送る前にもう一度見せてね。原田様は細かいところまで読まれる方だから。', 'Sửa xong thì cho tôi xem lại lần nữa trước khi gửi nhé. Harada-sama là người đọc kỹ đến từng chi tiết.'],
    ],
    questions: [
      [
        '修正または削除が必要なのはどれですか。',
        ['【1】と【3】', '【2】と【3】', '【1】と【4】', '【3】と【4】'],
        3,
        '【3】 phải viết lại vì nhà máy cần bảy ngày chứ không phải năm; 【4】 phải bỏ vì mức giảm 10% chưa ai duyệt → lựa chọn 4. Lựa chọn 1 và 3 có 【1】: trưởng phòng chê cách viết hơi cứng nhưng vẫn cho giữ. 【2】 (phí vận chuyển) đã được trưởng bộ phận đồng ý từ trước nên lựa chọn 2 sai.',
      ],
    ],
    points: [
      ['据え置き', 'すえおき', 'giữ nguyên (giá)'],
      ['ご容赦', 'ごようしゃ', 'xin lượng thứ'],
      ['外す', 'はずす', 'bỏ ra, loại ra'],
    ],
  }),
  item('w07', 'sogo-chodokkai', 4, {
    material: {
      kind: 'text',
      title: '商談準備チェックリスト',
      body: '青山電機様との商談（2026年12月3日（木）14:00〜）\n\n【1】見積書（改訂版）の作成\n【2】製品サンプルの手配\n【3】会議室の予約\n【4】技術担当者への同行依頼',
    },
    script: [
      ['男', 'おはようございます。木曜日の青山電機さんとの商談について、準備の状況を共有します。', 'Chào buổi sáng. Tôi xin chia sẻ tình hình chuẩn bị cho buổi đàm phán với Aoyama Denki hôm thứ Năm.'],
      ['男', 'まず見積書ですが、改訂版を昨日部長に見ていただいて、そのまま承認をいただきました。単価は前回より三パーセント下げていますが、送料を含めない形にしましたので、実質的にはほぼ同じ水準です。', 'Trước hết là bảng báo giá: bản sửa đã được trưởng bộ phận xem hôm qua và duyệt luôn. Đơn giá hạ ba phần trăm so với lần trước, nhưng không gồm phí vận chuyển nên thực chất gần như ngang mức cũ.'],
      ['男', 'サンプルは、先週のうちに工場に頼んでありまして、今日の午後には届く予定です。届いたら私が中身を確認しておきます。', 'Mẫu sản phẩm thì tôi đã nhờ nhà máy từ tuần trước, dự kiến chiều nay sẽ tới. Tới nơi tôi sẽ kiểm tra bên trong.'],
      ['男', '会議室については、先方から、ぜひ現場も見てほしいのでお越しくださいというお話があり、先方の事務所で行うことになりました。ですので、予約は取り消してあります。移動に一時間ほどかかりますので、当日は十二時半に会社を出ます。', 'Về phòng họp: phía khách nói rất muốn chúng ta xem cả hiện trường nên mời sang, vì vậy buổi đàm phán sẽ làm ở văn phòng bên đó. Do đó tôi đã huỷ đặt phòng. Di chuyển mất khoảng một tiếng nên hôm đó chúng ta rời công ty lúc mười hai rưỡi.'],
      ['男', 'それから、技術的な質問も出ると思いますので、開発の森さんに一緒に来ていただきたいと考えています。森さんは今週出張中でして、明日戻られるそうなので、戻られたら私から直接お話しするつもりです。', 'Ngoài ra, chắc sẽ có câu hỏi kỹ thuật nên tôi muốn mời Mori bên phát triển đi cùng. Tuần này Mori đang đi công tác, nghe nói mai về, nên khi về tôi định nói trực tiếp.'],
      ['男', '以上です。何か気づいた点があれば、教えてください。', 'Tôi xin hết. Ai thấy điều gì thì cho tôi biết.'],
    ],
    questions: [
      [
        'まだ済んでいない準備はどれですか。',
        ['【1】', '【2】', '【3】', '【4】'],
        3,
        'Việc mời Mori đi cùng chưa làm: Mori đang công tác, khi về người nói mới "định nói trực tiếp" → 【4】, lựa chọn 4. Lựa chọn 3 (phòng họp) dễ chọn nhầm vì không có phòng nào được đặt, nhưng việc này không còn cần nữa do họp ở văn phòng khách. Mẫu sản phẩm (lựa chọn 2) đã đặt xong, chỉ chờ tới.',
      ],
    ],
    points: [
      ['同行', 'どうこう', 'đi cùng'],
      ['実質的に', 'じっしつてきに', 'về thực chất'],
      ['取り消す', 'とりけす', 'huỷ'],
    ],
  }),
];

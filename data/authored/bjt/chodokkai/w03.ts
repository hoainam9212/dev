import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/** Week 3 — email and business correspondence. Level: J2 → J1. */
export const W03: BjtItem[] = [
  item('w03', 'jokyo', 1, {
    material: {
      kind: 'scene',
      vi: 'Hai nhân viên cùng nhìn màn hình máy tính đang mở hộp thư; một người chỉ vào một thư trong mục "Đã gửi", người kia cầm điện thoại bàn vừa đặt xuống.',
    },
    script: [
      ['女', '先ほど青葉建設の方からお電話があって、昨日お送りした図面が開けないそうなんです。', 'Lúc nãy người bên Aoba Kensetsu gọi điện, nói là không mở được bản vẽ mình gửi hôm qua.'],
      ['男', 'え、パスワードは別のメールでお送りしましたよね。', 'Ơ, mật khẩu thì mình đã gửi bằng một email khác rồi mà nhỉ.'],
      ['女', 'それが、パスワードのほうは迷惑メールのフォルダに入っていたみたいで。それに、容量が大きすぎて、途中で切れてしまっているともおっしゃっていました。', 'Chuyện là email mật khẩu hình như bị vào thư mục thư rác. Với lại họ còn nói dung lượng lớn quá nên bị cắt mất giữa chừng.'],
      ['男', 'そうですか。じゃあ、共有フォルダのリンクでお送りし直します。件名には「再送」と入れておきますね。', 'Vậy à. Thế tôi gửi lại bằng đường link thư mục chia sẻ. Ở tiêu đề tôi sẽ ghi thêm chữ "gửi lại".'],
    ],
    questions: [
      [
        '二人は何について話していますか。',
        ['昨日送ったメールの添付', '昨日送ったメールの件名', '昨日送ったメールの宛先', '昨日送ったメールの署名'],
        0,
        'Bản vẽ không mở được, cần mật khẩu, dung lượng quá lớn, sẽ gửi lại bằng link: tất cả là chuyện tệp đính kèm, dù chữ 添付 không xuất hiện. Lựa chọn 2 là bẫy: chữ 件名 có trong băng, nhưng chỉ là việc ghi thêm "gửi lại" khi gửi lần sau, không phải vấn đề đang bàn.',
      ],
    ],
    points: [
      ['図面', 'ずめん', 'bản vẽ'],
      ['容量', 'ようりょう', 'dung lượng'],
      ['送り直す', 'おくりなおす', 'gửi lại'],
    ],
  }),
  item('w03', 'jokyo', 2, {
    material: {
      kind: 'scene',
      vi: 'Bàn làm việc ở phòng tổng vụ. Trên bàn có một chồng bưu thiếp đã in sẵn và một danh sách địa chỉ dài; một nhân viên đang dùng bút đánh dấu gạch vài dòng trong danh sách, người kia đứng nhìn.',
    },
    script: [
      ['男', '取引先のリストから、今年ご家族にご不幸があった方の分は、外しておいたよ。', 'Trong danh sách đối tác, tôi đã bỏ ra những người năm nay trong gia đình có tang rồi đấy.'],
      ['女', 'ありがとうございます。その方々には、松の内が明けてから寒中見舞いをお出しするんですよね。', 'Cảm ơn anh. Những vị đó thì mình sẽ gửi thiệp thăm hỏi mùa lạnh sau khi qua mấy ngày đầu năm phải không ạ.'],
      ['男', 'そう。あと、一言ずつ手書きで添えるから、課長たちに配るのは来週の月曜で。元日に届けるには、二十五日までにポストに入れないといけないからね。', 'Đúng. Ngoài ra, mỗi tấm sẽ viết tay thêm một câu, nên phát cho các trưởng phòng vào thứ hai tuần sau. Muốn đến tay đúng ngày mùng một thì phải bỏ hòm thư trước ngày hai mươi lăm.'],
      ['女', 'わかりました。カタログをお送りする取引先の分とは、リストを分けておきます。', 'Em hiểu rồi. Em sẽ tách riêng danh sách này với danh sách đối tác được gửi catalogue.'],
    ],
    questions: [
      [
        '二人は何について話していますか。',
        ['取引先へ出す見積書の件', '取引先へ出す招待状の件', '取引先へ出す年賀状の件', '取引先へ出すカタログの件'],
        2,
        'Bỏ người có tang, gửi 寒中見舞い cho họ thay thế, phải đến tay đúng mùng một Tết: đó là thiệp chúc Tết (年賀状), dù chữ này không xuất hiện. Lựa chọn 4 là bẫy: カタログ có trong băng, nhưng chỉ là danh sách khác cần tách riêng.',
      ],
    ],
    points: [
      ['不幸', 'ふこう', 'việc tang (trong gia đình)'],
      ['寒中見舞い', 'かんちゅうみまい', 'thiệp thăm hỏi mùa lạnh (thay thiệp Tết)'],
      ['元日', 'がんじつ', 'ngày mùng một Tết'],
    ],
  }),
  item('w03', 'shiryo', 1, {
    material: {
      kind: 'bars',
      title: '社外メールへの平均返信時間（部署別）',
      unit: '時間',
      labels: ['営業部', '経理部', '総務部', '開発部'],
      series: [
        { name: '先月', values: [4.0, 5.0, 2.5, 9.0] },
        { name: '今月', values: [3.5, 6.0, 2.0, 8.5] },
      ],
    },
    script: [
      ['男', '社外からのメールには、原則として四時間以内に返信することになっています。', 'Theo nguyên tắc, email từ bên ngoài phải được trả lời trong vòng bốn tiếng.'],
      ['男', '今月この基準を超えた部署のうち、先月より悪くなった部署には、改善策を出してもらいます。', 'Trong các phòng vượt quá chuẩn đó tháng này, phòng nào tệ hơn tháng trước sẽ phải nộp phương án cải thiện.'],
    ],
    questions: [
      [
        '改善策を出すのはどの部署ですか。',
        ['経理部', '開発部', '営業部', '総務部'],
        0,
        'Tháng này vượt bốn tiếng có kế toán (6.0) và phát triển (8.5). Phát triển chậm nhất nhưng đã khá hơn tháng trước (9.0 → 8.5). Kế toán tệ đi (5.0 → 6.0), nên là kế toán. Kinh doanh tháng trước chạm đúng 4.0 nhưng tháng này đã dưới chuẩn.',
      ],
    ],
    points: [
      ['原則として', 'げんそくとして', 'theo nguyên tắc'],
      ['基準', 'きじゅん', 'tiêu chuẩn, mức chuẩn'],
      ['改善策', 'かいぜんさく', 'biện pháp cải thiện'],
    ],
  }),
  item('w03', 'shiryo', 2, {
    material: {
      kind: 'text',
      title: '【日程変更】定例会議について',
      body: '件名：【日程変更】定例会議について\n\n各位\n\n来週の定例会議は、下記のとおり変更します。\n\n日時：6月10日（水）14:00〜15:00\n場所：第2会議室\n議題：上半期の販売計画\n\n営業企画課 吉田',
    },
    script: [
      ['男', '先ほどお送りした定例会議のメールですが、一点誤りがありました。', 'Email về cuộc họp định kỳ tôi vừa gửi có một chỗ sai.'],
      ['男', '日時は合っているのですが、第2会議室はその時間ほかの予約が入っていましたので、第3会議室に変更します。後ほど訂正のメールをお送りします。', 'Ngày giờ thì đúng, nhưng phòng họp số 2 giờ đó đã có người đặt nên đổi sang phòng họp số 3. Lát nữa tôi sẽ gửi email đính chính.'],
    ],
    questions: [
      [
        '定例会議はどこで行いますか。',
        ['第1会議室', '第3会議室', '第2会議室', '大会議室'],
        1,
        'Email ghi phòng số 2, nhưng lời nói sửa lại: 第3会議室に変更します. Phần ngày giờ thì giữ nguyên (日時は合っている). Ai chỉ đọc email sẽ chọn phòng số 2.',
      ],
    ],
    points: [
      ['定例会議', 'ていれいかいぎ', 'cuộc họp định kỳ'],
      ['各位', 'かくい', 'kính gửi mọi người (trong văn bản)'],
      ['後ほど', 'のちほど', 'lát nữa, sau đây'],
    ],
  }),
  item('w03', 'shiryo', 3, {
    material: {
      kind: 'table',
      title: '郵送方法の比較（A4封筒・50gまで）',
      head: ['方法', '到着', '料金', '追跡'],
      rows: [
        ['普通郵便', '2〜3日', '110円', 'なし'],
        ['速達', '翌日', '370円', 'なし'],
        ['簡易書留', '2〜3日', '460円', 'あり'],
        ['宅配便', '翌日', '800円', 'あり'],
      ],
    },
    script: [
      ['女', '契約書の原本を送るので、届いたかどうかがわかる方法にしてください。', 'Vì gửi bản gốc hợp đồng nên chọn cách nào biết được đã tới nơi hay chưa.'],
      ['女', '先方は、月末までに届けば大丈夫だそうです。今日は二十日なので、急ぐ必要はありません。なるべく安いほうでお願いします。', 'Bên kia nói tới trước cuối tháng là được. Hôm nay mới ngày hai mươi nên không cần gấp. Nhờ chọn cách rẻ nhất có thể.'],
    ],
    questions: [
      [
        'どの方法で送りますか。',
        ['普通郵便', '速達', '簡易書留', '宅配便'],
        2,
        'Điều kiện: theo dõi được (追跡あり) và rẻ. Chỉ 簡易書留 và 宅配便 theo dõi được; không cần tới ngay hôm sau nên chọn 簡易書留 (460 yên). Thư thường rẻ nhất nhưng không theo dõi được.',
      ],
    ],
    points: [
      ['原本', 'げんぽん', 'bản gốc'],
      ['追跡', 'ついせき', 'theo dõi (bưu kiện)'],
      ['書留', 'かきとめ', 'thư bảo đảm'],
    ],
  }),
  item('w03', 'sogo-chodokkai', 1, {
    material: {
      kind: 'text',
      title: 'メール下書き：打ち合わせ日程変更のお願い',
      body: '株式会社ミナト企画　営業部　山下様\n\nいつもお世話になっております。東光印刷の西田でございます。【1】\nさて、12月9日（水）にお約束しておりました打ち合わせの件でございますが、【2】\n誠に勝手ながら、日程を変更させていただけないでしょうか。【3】\n下記の日程でご都合のよい日時をお知らせいただけますと幸いです。【4】\n・12月10日（木）午後　・12月11日（金）午前',
    },
    script: [
      ['男', '西田さん、ミナト企画さんへのメール、見たよ。日程変更の理由が書いてないね。', 'Nishida, anh xem email gửi Minato Kikaku rồi. Không ghi lý do đổi lịch nhỉ.'],
      ['女', 'はい。社内の事情なので、書かないほうがいいかと思いまして。', 'Vâng. Vì là chuyện nội bộ nên em nghĩ không ghi thì hơn.'],
      ['男', '細かく書く必要はないけど、何もないと、先方も「何かあったのかな」って気になるでしょう。「当日、急きょ社内で検査が入ることになり」くらいは入れたほうがいいね。', 'Không cần viết chi tiết, nhưng không có gì thì bên kia sẽ băn khoăn "có chuyện gì à". Nên thêm cỡ câu "hôm đó nội bộ đột xuất có đợt kiểm tra".'],
      ['女', 'わかりました。では、最後の、ご都合をお尋ねする文の後ろに入れましょうか。', 'Em hiểu rồi. Vậy em thêm vào sau câu hỏi lịch thuận tiện của bên kia ở cuối nhé?'],
      ['男', 'いや、お願いをしてから理由を言うと、言い訳みたいに聞こえるからね。先にわけを言って、それからお願い、の順番にしよう。', 'Không, nhờ trước rồi mới nói lý do thì nghe như biện bạch. Nói lý do trước, rồi mới đến lời nhờ, theo thứ tự đó.'],
      ['女', 'はい。お詫びの言葉も足したほうがいいでしょうか。', 'Vâng. Có nên thêm lời xin lỗi không ạ?'],
      ['男', '「誠に勝手ながら」が入っているから、そこはこのままでいいよ。それより、候補日がもう一日あると、先方も選びやすいね。十四日の月曜日が空いてるか、確認してみて。', '"Thành thật xin lỗi vì sự tùy tiện" đã có rồi nên chỗ đó để nguyên. Quan trọng hơn là có thêm một ngày đề xuất thì bên kia dễ chọn. Em xem thứ hai ngày mười bốn có trống không.'],
      ['女', 'はい、すぐに確認して、直したものをもう一度お見せします。', 'Vâng, em sẽ kiểm tra ngay rồi gửi anh xem lại bản đã sửa.'],
      ['男', 'それと、件名が「打ち合わせ日程変更のお願い」だけだと、どの打ち合わせかわかりにくいから、元の日付も入れておこう。', 'Còn nữa, tiêu đề chỉ ghi "đề nghị đổi lịch họp" thì khó biết là cuộc họp nào, nên ghi thêm cả ngày cũ vào.'],
    ],
    questions: [
      [
        '日程変更の理由を書いた文は、どこに入れますか。',
        ['【1】', '【2】', '【3】', '【4】'],
        1,
        'Người nam muốn "nói lý do trước, rồi mới nhờ": lý do phải đứng sau câu nhắc đến cuộc họp và trước câu xin đổi lịch, tức 【2】. 【4】 là chỗ người nữ đề xuất (sau câu hỏi lịch thuận tiện ở cuối) và đã bị bác vì nghe như biện bạch. 【3】 nằm sau lời nhờ nên cũng sai thứ tự.',
      ],
    ],
    points: [
      ['急きょ', 'きゅうきょ', 'đột xuất, gấp'],
      ['誠に勝手ながら', 'まことにかってながら', 'thành thật xin lỗi vì sự tùy tiện, nhưng…'],
      ['言い訳', 'いいわけ', 'lời biện bạch'],
    ],
  }),
  item('w03', 'sogo-chodokkai', 2, {
    material: {
      kind: 'text',
      title: 'FAX送付状',
      body: '株式会社丸栄　総務部　御中\n送信者：株式会社コスモ物流　営業部　吉川\n件名：年末年始の配送スケジュールについて\n送信枚数：本状を含め4枚\n\n□【1】至急\n□【2】お電話ください\n□【3】ご返信ください\n□【4】ご回覧ください',
    },
    script: [
      ['男', '吉川さん、丸栄さんに、年末年始の配送スケジュールのお知らせ、FAXしておいてくれる？', 'Yoshikawa, em fax giúp anh thông báo lịch giao hàng dịp cuối năm, đầu năm cho bên Maruei nhé?'],
      ['女', 'はい。返信用の用紙もついていますね。至急にチェックを入れておきましょうか。', 'Vâng. Có kèm cả mẫu phúc đáp nhỉ. Em đánh dấu vào ô "gấp" luôn nhé?'],
      ['男', '締め切りは十二月十日だから、急ぎっていうほどじゃないな。至急って書くと、先方がほかの仕事を止めて対応してくださることになるから。', 'Hạn là ngày mười tháng mười hai, nên chưa đến mức gấp. Ghi "gấp" là bên kia sẽ phải dừng việc khác để xử lý cho mình.'],
      ['女', 'わかりました。では、内容についてお電話をいただくように書いておきますか。', 'Em hiểu rồi. Vậy em ghi là nhờ họ gọi điện về nội dung nhé?'],
      ['男', 'いや、お返事は用紙のほうで十分。何かあれば、向こうから電話してくださるよ。それより、丸栄さんは配送の担当の方が何人もいらっしゃるから、皆さんに目を通していただけるようにしておいて。', 'Không, trả lời bằng mẫu phúc đáp là đủ. Có gì thì bên đó sẽ tự gọi. Quan trọng hơn là bên Maruei có nhiều người phụ trách giao nhận, nên làm sao cho tất cả mọi người đều đọc qua.'],
      ['女', '承知しました。返信用の用紙を入れて四枚ですね。送ったあと、届いたかどうか、念のためお電話で確認しておきます。', 'Vâng ạ. Tính cả mẫu phúc đáp là bốn tờ nhỉ. Gửi xong em sẽ gọi điện xác nhận xem đã đến chưa cho chắc.'],
      ['男', 'うん、頼むね。番号は、去年の秋に変わっているから、名刺じゃなくて、顧客リストのほうを見てね。', 'Ừ, nhờ em. Số fax đã đổi từ mùa thu năm ngoái, nên đừng xem danh thiếp mà xem danh sách khách hàng nhé.'],
      ['女', 'はい。送る前に、返信用紙の締め切りの日付に間違いがないか、もう一度見ておきます。', 'Vâng. Trước khi gửi, em sẽ xem lại một lần nữa xem ngày hạn trên mẫu phúc đáp có sai không.'],
      ['男', 'うん。去年は日付を一日間違えて、訂正のFAXを送ることになったからね。', 'Ừ. Năm ngoái ghi nhầm ngày một hôm, phải gửi fax đính chính đấy.'],
    ],
    questions: [
      [
        '女の人がチェックを入れるのはどれですか。',
        ['【1】と【2】', '【1】と【3】', '【2】と【4】', '【3】と【4】'],
        3,
        'Có mẫu phúc đáp và "trả lời bằng mẫu là đủ" → 【3】ご返信ください; muốn nhiều người phụ trách cùng đọc → 【4】ご回覧ください. "Gấp" (【1】) bị bác vì hạn còn xa; "xin gọi điện" (【2】) cũng bị bác. Việc người nữ sẽ gọi điện xác nhận là việc của bên mình, không phải điều nhờ bên kia.',
      ],
    ],
    points: [
      ['送付状', 'そうふじょう', 'tờ bìa gửi kèm (fax, bưu phẩm)'],
      ['御中', 'おんちゅう', 'kính gửi (công ty, phòng ban)'],
      ['回覧', 'かいらん', 'chuyền tay cho nhiều người đọc'],
      ['目を通す', 'めをとおす', 'đọc qua'],
    ],
  }),
  item('w03', 'sogo-chodokkai', 3, {
    material: {
      kind: 'text',
      title: '郵便物の集荷時刻（総務部受付）',
      body: '【1】10:30\n【2】13:00\n【3】15:30\n【4】17:00\n※各便の時刻までに、総務部受付の箱に入れてください。\n※速達・書留は、受付の担当者に直接お渡しください。',
    },
    script: [
      ['女', '総務部からお知らせです。来月、2027年1月から、郵便物の集荷の時間が変わりますので、お手元の表をご覧ください。', 'Phòng tổng vụ xin thông báo. Từ tháng sau, tức tháng 1 năm 2027, giờ thu gom bưu phẩm sẽ thay đổi; mời mọi người xem bảng trên tay.'],
      ['女', 'まず、夕方五時の便は、郵便局側の都合でなくなります。その日のうちに出したいものは、三時半の便までに総務部の受付にお持ちください。', 'Trước hết, chuyến năm giờ chiều sẽ bị bỏ do phía bưu điện. Thứ gì muốn gửi trong ngày, xin mang đến quầy tổng vụ trước chuyến ba giờ rưỡi.'],
      ['女', 'それから、書留についてです。これまでは、どの便でもお受けしておりましたが、来月からは、総務の担当者が郵便局の窓口まで直接持っていくことになりました。窓口に行くのは一日一回、朝一番の便を出したあとだけです。', 'Tiếp theo là thư bảo đảm. Trước đây chuyến nào cũng nhận, nhưng từ tháng sau, nhân viên tổng vụ sẽ mang trực tiếp ra quầy bưu điện. Mỗi ngày chỉ ra quầy một lần, sau khi gửi chuyến đầu tiên buổi sáng.'],
      ['女', 'ですので、書留をその日のうちに出したい場合は、一番最初の便の時間までにお持ちください。それより後にお持ちいただいたものは、翌日の扱いになりますので、ご注意ください。', 'Vì vậy, nếu muốn gửi thư bảo đảm trong ngày, xin mang đến trước giờ của chuyến đầu tiên. Mang đến sau giờ đó thì sẽ được xử lý vào hôm sau, xin lưu ý.'],
      ['女', '書留をお出しになる方は、受付の横に置いてある書留用の用紙に、宛先とご自分の部署名をご記入のうえ、郵便物と一緒にお渡しください。', 'Ai gửi thư bảo đảm, xin điền địa chỉ người nhận và tên phòng ban của mình vào mẫu dành cho thư bảo đảm đặt cạnh quầy, rồi nộp cùng với bưu phẩm.'],
      ['女', '速達は、これまでどおり、どの便でもお受けします。また、お昼の便は、時間が少し早まる予定ですが、決まり次第お知らせします。以上です。', 'Thư chuyển phát nhanh vẫn nhận ở mọi chuyến như trước. Ngoài ra, chuyến buổi trưa dự kiến sẽ sớm hơn một chút, khi quyết định xong chúng tôi sẽ thông báo. Hết.'],
    ],
    questions: [
      [
        '来月から、書留をその日のうちに出すには、どの便に間に合わせる必要がありますか。',
        ['【1】', '【2】', '【3】', '【4】'],
        0,
        'Nhân viên chỉ ra quầy bưu điện một lần sau chuyến đầu tiên buổi sáng, nên thư bảo đảm phải kịp chuyến 10:30, tức 【1】. 【3】 là hạn cho thư thường muốn gửi trong ngày, không áp dụng cho thư bảo đảm. 【4】 đã bị bỏ.',
      ],
    ],
    points: [
      ['集荷', 'しゅうか', 'thu gom hàng, bưu phẩm'],
      ['書留', 'かきとめ', 'thư bảo đảm'],
      ['速達', 'そくたつ', 'chuyển phát nhanh'],
      ['決まり次第', 'きまりしだい', 'ngay khi quyết định xong'],
    ],
  }),
  item('w03', 'sogo-chodokkai', 4, {
    material: {
      kind: 'text',
      title: '展示会準備チェック表（東京ビジネスフェア　2027年2月17日〜19日）',
      body: '【1】招待状の送付先リストの更新\n【2】招待状の印刷・発送\n【3】ブースの受付スタッフの手配\n【4】来場者用の駐車券の手配',
    },
    script: [
      ['女', '部長、展示会の準備について、進み具合をご報告いたします。今、少しよろしいでしょうか。', 'Thưa trưởng bộ phận, em xin báo cáo tiến độ chuẩn bị triển lãm. Bây giờ anh/chị có chút thời gian không ạ?'],
      ['男', 'うん、どうぞ。', 'Ừ, em nói đi.'],
      ['女', '招待状の送付先のリストは、先週、営業の皆さんに確認していただいて、更新が済みました。印刷は、一度、社名の誤りが見つかって刷り直しになったんですが、昨日、無事に発送まで終わりました。', 'Danh sách gửi thư mời thì tuần trước các anh chị kinh doanh đã kiểm tra, cập nhật xong rồi. Phần in thì có một lần phát hiện sai tên công ty nên phải in lại, nhưng hôm qua đã gửi đi xong xuôi.'],
      ['男', '刷り直しか。大変だったね。駐車券のほうは？', 'In lại à. Vất vả nhỉ. Còn vé gửi xe?'],
      ['女', '会場の管理会社に申し込んで、先日、三十台分の券が届きました。', 'Em đã đăng ký với công ty quản lý hội trường, hôm trước vé cho ba mươi xe đã về.'],
      ['男', '三十台で足りるかな。去年は足りなくて、近くの駐車場をご案内したよね。', 'Ba mươi xe có đủ không nhỉ. Năm ngoái thiếu, phải chỉ khách sang bãi gần đó mà.'],
      ['女', 'はい。去年は二十台でしたので、今年は十台増やしました。それでも足りない場合に備えて、近くの駐車場の地図もご用意しています。', 'Vâng. Năm ngoái là hai mươi xe, năm nay em tăng thêm mười. Phòng khi vẫn thiếu, em cũng đã chuẩn bị bản đồ các bãi đỗ gần đó.'],
      ['男', 'じゃあ、あとは受付のスタッフだね。', 'Vậy chỉ còn nhân viên lễ tân thôi nhỉ.'],
      ['女', 'はい。派遣会社には一度お話ししたんですが、三日間とも二人ずつにするか、初日だけ三人にするか決まっていないので、正式なお願いはまだなんです。', 'Vâng. Em đã nói chuyện một lần với công ty phái cử, nhưng chưa quyết định cả ba ngày mỗi ngày hai người hay chỉ ngày đầu ba người, nên chưa đặt chính thức ạ.'],
      ['男', '初日は毎年混むから、三人にしよう。費用が去年と同じくらいなら問題ないから、今週中に正式に頼んでおいて。', 'Ngày đầu năm nào cũng đông, cho ba người đi. Chi phí cỡ năm ngoái thì không vấn đề gì, trong tuần này đặt chính thức nhé.'],
    ],
    questions: [
      [
        'まだ済んでいないのはどれですか。',
        ['【1】', '【2】', '【3】', '【4】'],
        2,
        'Danh sách đã cập nhật, thư mời đã in và gửi, vé gửi xe đã về; chỉ có nhân viên lễ tân (【3】) mới bàn qua, chưa đặt chính thức. 【2】 dễ bị chọn vì nghe chữ 刷り直し, nhưng việc in lại đã xong và đã gửi đi hôm qua.',
      ],
    ],
    points: [
      ['刷り直し', 'すりなおし', 'in lại'],
      ['手配', 'てはい', 'sắp xếp, thu xếp'],
      ['派遣会社', 'はけんがいしゃ', 'công ty phái cử nhân lực'],
    ],
  }),
];

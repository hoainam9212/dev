import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

// Week 3 — email và thư tín: mở đầu, nhờ vả, từ chối khéo, kết thư (J2 → J1).
export const W03: BjtItem[] = [
  item('w03', 'goi', 1, {
    questions: [
      [
        '詳細につきましては、添付の資料をご＿＿＿ください。',
        ['参照', '拝読', '査定', '承知'],
        0,
        'Đáp án 1. ご参照ください = xin tham khảo, dùng khi chỉ người đọc sang tài liệu đính kèm để xem chi tiết. 拝読 là khiêm nhường ngữ (mình đọc), không đi với ご～ください. 査定 là thẩm định giá. Lựa chọn 4 dễ nhầm vì ご承知 cũng hay gặp trong thư, nhưng nó nghĩa là "biết, hiểu", không phải "xem".',
      ],
    ],
    points: [
      ['ご参照ください', 'ごさんしょうください', 'xin tham khảo'],
      ['添付の資料', 'てんぷのしりょう', 'tài liệu đính kèm'],
    ],
  }),
  item('w03', 'goi', 2, {
    questions: [
      [
        '本日はお時間をいただき、ありがとうございました。まずは＿＿＿お礼申し上げます。',
        ['取り急いで', '至急に', '取り急ぎ', '急ぎ足で'],
        2,
        'Đáp án 3. まずは取り急ぎ～まで / 申し上げます là câu kết thư cố định: viết vội để báo trước, chi tiết gửi sau. Lựa chọn 1 dễ nhầm vì cùng động từ, nhưng thể て 取り急いで không dùng trong cụm này. 至急 là "gấp" khi nhờ người khác. 急ぎ足 là bước đi vội.',
      ],
    ],
    points: [
      ['取り急ぎ', 'とりいそぎ', 'viết vội trước (cuối thư)'],
      ['お礼申し上げます', 'おれいもうしあげます', 'xin cảm ơn (trang trọng)'],
    ],
  }),
  item('w03', 'goi', 3, {
    questions: [
      [
        'せっかくのお誘いですが、当日はあいにく先約があり、出席＿＿＿。',
        ['しかねません', 'されかねます', 'いたしかねません', 'いたしかねます'],
        3,
        'Đáp án 4. ～かねます = không thể (từ chối lịch sự), và いたす là khiêm nhường cho việc của mình: 出席いたしかねます = tôi không thể tham dự. Lựa chọn 3 dễ nhầm vì chỉ khác một chút, nhưng ～かねません lại nghĩa là "có thể xảy ra (điều xấu)". されかねます dùng tôn kính cho việc của chính mình là sai.',
      ],
    ],
    points: [
      ['いたしかねます', 'いたしかねます', 'tôi không thể (từ chối lịch sự)'],
      ['せっかくのお誘い', 'せっかくのおさそい', 'lời mời quý hóa'],
      ['先約', 'せんやく', 'hẹn trước'],
    ],
  }),
  item('w03', 'goi', 4, {
    questions: [
      [
        'ご不明な点がございましたら、お気軽にお問い合わせ＿＿＿。',
        ['いたします', 'くださいませ', 'させます', 'いただきます'],
        1,
        'Đáp án 2. お問い合わせくださいませ = xin cứ liên hệ, lời mời người đọc làm. Lựa chọn 4 dễ nhầm vì いただく cũng lịch sự, nhưng câu khẳng định お問い合わせいただきます nghe như ra lệnh, không phải lời mời. いたします thành ra mình là người hỏi. させます là bắt người khác làm.',
      ],
    ],
    points: [
      ['ご不明な点', 'ごふめいなてん', 'điều chưa rõ'],
      ['お気軽に', 'おきがるに', 'xin cứ tự nhiên'],
    ],
  }),
  item('w03', 'goi', 5, {
    questions: [
      [
        '先日の会議の議事録を、本メールに＿＿＿いたします。',
        ['添付', '同封', '付属', '添加'],
        0,
        'Đáp án 1. 添付する = đính kèm tệp vào email. Lựa chọn 2 dễ nhầm: 同封 là cho vào cùng phong bì, dùng với thư giấy chứ không dùng với email. 付属 là phụ kiện đi kèm sản phẩm. 添加 là thêm chất vào thực phẩm.',
      ],
    ],
    points: [
      ['添付', 'てんぷ', 'đính kèm (tệp)'],
      ['同封', 'どうふう', 'gửi kèm trong phong bì'],
      ['議事録', 'ぎじろく', 'biên bản cuộc họp'],
    ],
  }),
  item('w03', 'goi', 6, {
    questions: [
      [
        '先ほどお送りしたメールの金額に誤りがございましたので、＿＿＿いたします。',
        ['改正', '訂正', '是正', '修理'],
        1,
        'Đáp án 2. 訂正 = sửa lỗi trong chữ, số, văn bản. Lựa chọn 3 dễ nhầm vì cũng là "sửa cho đúng", nhưng 是正 dùng cho tình trạng, chế độ chưa hợp lý (格差の是正). 改正 là sửa luật, quy định. 修理 là sửa máy móc.',
      ],
    ],
    points: [
      ['訂正', 'ていせい', 'đính chính'],
      ['誤り', 'あやまり', 'chỗ sai'],
    ],
  }),
  item('w03', 'hyogen', 1, {
    material: {
      kind: 'text',
      title: '展示会ご出展のご案内について',
      body: '株式会社フジ企画 イベント事業部 大野様\n\n平素より大変お世話になっております。\nこのたびは、来年2月の「関西ものづくり展」へのご出展のご案内をいただき、誠にありがとうございます。\n社内で慎重に検討いたしましたが、2月は新工場の立ち上げの時期と重なり、人員の確保が難しいことから、今回は出展を見送らせていただくことといたしました。\nせっかくお声がけいただいたにもかかわらず、ご期待に沿えず大変申し訳ございません。\nなお、秋の東京展につきましては前向きに検討したいと考えておりますので、詳細が決まりましたらお知らせいただけますと幸いです。\n\n丸山製作所 営業部 竹内',
    },
    questions: [
      [
        'このメールで竹内さんが最も伝えたいことは何ですか。',
        ['2月の展示会にぜひ出展したい', '2月の展示会には出ないが、秋の展示会の情報は知らせてほしい', '新工場が完成したら見学に来てほしい', '2月の展示会のために人を出してほしい'],
        1,
        'Đáp án 2. 見送らせていただく = xin phép không tham gia lần này, còn câu sau なお xin báo khi có chi tiết về hội chợ Tokyo mùa thu. Lựa chọn 1 dễ nhầm vì thư mở đầu bằng lời cảm ơn và nói 前向きに検討, nhưng điều đó là về hội chợ mùa thu, không phải tháng 2. Thiếu người (人員の確保が難しい) là lý do từ chối, không phải lời nhờ.',
      ],
    ],
    points: [
      ['見送る', 'みおくる', 'gác lại, không thực hiện lần này'],
      ['ご期待に沿えず', 'ごきたいにそえず', 'không đáp ứng được kỳ vọng'],
      ['お声がけ', 'おこえがけ', 'lời mời, lời rủ'],
      ['前向きに検討する', 'まえむきにけんとうする', 'xem xét theo hướng tích cực'],
    ],
  }),
  item('w03', 'hyogen', 2, {
    material: {
      kind: 'text',
      title: '【訂正】忘年会のご案内',
      body: '各位\n\n総務課の中島です。\n昨日お送りした忘年会のご案内に誤りがありましたので、訂正いたします。\n（誤）会費：5,000円　→　（正）会費：4,000円\n日時と会場（12月19日（金）18時30分から、ホテル南風 2階「桜の間」）に変更はありません。\n出欠のご返信は、引き続き12月5日までにお願いいたします。なお、すでに幹事に5,000円をお支払いいただいた方には、当日、受付にて差額をお返しいたします。\nご迷惑をおかけし、申し訳ございません。',
    },
    questions: [
      [
        'すでに会費を払った人はどうなりますか。',
        ['4,000円を払い直さなければならない', '12月5日までに差額を受け取る', '忘年会の当日に1,000円を返してもらう', '払った5,000円を全額返してもらう'],
        2,
        'Đáp án 3. Câu sau なお: người đã đưa 5.000 yên sẽ được trả lại phần chênh lệch (差額) ở bàn tiếp đón ngay hôm tiệc, tức 5.000 − 4.000 = 1.000 yên. Lựa chọn 2 dễ nhầm vì ngày 5/12 có trong thư, nhưng đó là hạn trả lời tham dự. Không phải trả lại toàn bộ hay đóng lại từ đầu.',
      ],
    ],
    points: [
      ['差額', 'さがく', 'tiền chênh lệch'],
      ['幹事', 'かんじ', 'người phụ trách tổ chức (tiệc)'],
      ['出欠', 'しゅっけつ', 'có mặt hay vắng mặt'],
    ],
  }),
  item('w03', 'hyogen', 3, {
    material: {
      kind: 'text',
      title: '本社移転のお知らせ',
      body: '拝啓 晩秋の候、貴社ますますご清祥のこととお慶び申し上げます。平素は格別のお引き立てを賜り、厚く御礼申し上げます。\nさて、このたび弊社は業務拡大に伴い、本社を下記へ移転することとなりました。これを機に、社員一同、より一層業務に励む所存でございます。\nなお、電話番号およびFAX番号に変更はございません。\n敬具\n\n記\n新住所：大阪市北区芝田二丁目4番8号 グランデ梅田ビル7階\n新本社での業務開始日：12月8日（月）\n※12月5日（金）までは、旧住所にて通常どおり営業いたします。\n\n株式会社ハマダ商会',
    },
    questions: [
      [
        'この知らせの内容と合っているものはどれですか。',
        ['12月5日から新しい住所で仕事を始める', '移転に伴って電話番号が変わる', '12月8日以降も旧住所で営業を続ける', '12月5日までは、これまでの場所で営業している'],
        3,
        'Đáp án 4. Dòng ghi chú ※: đến hết thứ Sáu 5/12 vẫn làm việc bình thường ở địa chỉ cũ. Lựa chọn 1 dễ nhầm vì có ngày 5/12, nhưng ngày bắt đầu ở trụ sở mới là thứ Hai 8/12. Câu sau なお nói số điện thoại và fax giữ nguyên.',
      ],
    ],
    points: [
      ['移転', 'いてん', 'chuyển địa điểm'],
      ['所存でございます', 'しょぞんでございます', 'chúng tôi định sẽ (khiêm nhường)'],
      ['旧住所', 'きゅうじゅうしょ', 'địa chỉ cũ'],
    ],
  }),
  item('w03', 'sogo-dokkai', 1, {
    material: {
      kind: 'text',
      title: 'ビジネスメール、返信はいつまでに',
      body: 'ある調査会社が会社員千人に「仕事のメールの返信が何時間以内に来ないと遅いと感じるか」と尋ねたところ、「24時間以内」と答えた人が最も多く、全体の四割を占めた。「当日中」が三割でこれに続き、「三日以内なら問題ない」という人は一割にも満たなかった。\nとはいえ、すぐには答えられない問い合わせも多い。その場合に勧められるのが、「メールを拝受しました。○日までにお返事いたします」と、まず受け取ったことと回答の時期だけを伝える方法だ。相手は返事を待つ間の不安がなくなり、自分の予定も立てやすくなる。\n一方、調査では「CCに入れられているだけで説明のないメール」に不満を持つ人も多かった。CCで情報を共有するのは便利だが、なぜ自分に届いたのかがわからないメールは、受け取る側の負担になる。CCに人を加えるときは、本文の最初に「経理部の村田さんにも共有いたします」のように一言添えるのが望ましい。',
    },
    questions: [
      [
        '調査結果の内容と合っているものはどれですか。',
        ['当日中に返信すべきだと考える人が最も多かった', '24時間以内に返信が来ないと遅いと感じる人が最も多かった', '三日以内なら問題ないと考える人が一割を超えた', '返信の速さを気にしない人が半数を超えた'],
        1,
        'Đáp án 2. "24時間以内" chiếm bốn phần mười, nhiều nhất. Lựa chọn 1 dễ nhầm vì "当日中" cũng có trong khảo sát, nhưng chỉ ba phần mười và đứng thứ hai (これに続き). Nhóm "ba ngày cũng được" chưa tới một phần mười (一割にも満たなかった).',
      ],
      [
        '筆者がCCについて勧めていることはどれですか。',
        ['CCは使わず、必要な人に一人ずつ送る', 'CCに入れた人には、別のメールで理由を説明する', 'CCに人を加えるときは、本文の初めにそのことを書く', 'CCに入れるのは同じ部署の人だけにする'],
        2,
        'Đáp án 3. Câu cuối khuyên viết một câu ở đầu nội dung thư như 「経理部の村田さんにも共有いたします」. Lựa chọn 2 dễ nhầm vì cũng là giải thích lý do, nhưng tác giả bảo ghi ngay trong thư đó, không gửi thư riêng. Tác giả vẫn cho rằng CC tiện lợi (便利だ) nên 1 sai.',
      ],
    ],
    points: [
      ['満たない', 'みたない', 'chưa đến, không đủ'],
      ['とはいえ', 'とはいえ', 'tuy nói vậy nhưng'],
      ['一言添える', 'ひとことそえる', 'thêm một câu'],
    ],
  }),
  item('w03', 'sogo-dokkai', 2, {
    material: {
      kind: 'text',
      title: '社外メール送信時のルール',
      body: '社員各位\n\n情報漏えいを防ぐため、来月1日から、社外宛てのメールについて次のルールを適用します。\n1．宛先が複数の会社にまたがる場合は、受信者同士のアドレスが見えないよう、BCCで送信してください。\n2．ファイルを添付する場合は、パスワードを付けたファイルを送るのではなく、社内の共有サービスにファイルを置き、ダウンロード用のリンクを本文に記載してください。ただし、取引先の規則でリンクを開けない場合に限り、上長の許可を得たうえで、これまでどおり添付で送信することを認めます。\n3．送信ボタンを押した後、1分間は送信が保留されます。この間であれば送信を取り消すことができます。\n\n情報システム部',
    },
    questions: [
      [
        '複数の取引先に同じ案内を送るとき、どうしなければなりませんか。',
        ['BCCを使い、ほかの受信者のアドレスが見えないようにする', '取引先ごとに上長の許可を得る', '宛先の欄に全員のアドレスを入れる', '1分間待ってから送信ボタンを押す'],
        0,
        'Đáp án 1. Quy tắc 1: khi người nhận thuộc nhiều công ty thì gửi BCC để họ không thấy địa chỉ của nhau. Lựa chọn 4 dễ nhầm vì có "1 phút", nhưng đó là thời gian hệ thống tự giữ thư sau khi bấm gửi, người gửi không phải chờ trước. Xin phép cấp trên chỉ áp dụng cho việc đính kèm tệp.',
      ],
      [
        '取引先の規則でリンクが開けない場合、ファイルはどのように送りますか。',
        ['パスワードを付けずに、リンクで送る', '共有サービスにファイルを置き、電話で場所を伝える', '上長の許可なしで、メールに添付して送ってよい', '上長の許可をもらってから、メールに添付して送る'],
        3,
        'Đáp án 4. Phần ただし: chỉ trong trường hợp này mới được đính kèm như cũ, sau khi được cấp trên cho phép (上長の許可を得たうえで). Lựa chọn 3 dễ nhầm vì đúng là được đính kèm, nhưng bỏ mất điều kiện xin phép. Đối tác không mở được link nên gửi link (1) không giải quyết được gì.',
      ],
    ],
    points: [
      ['情報漏えい', 'じょうほうろうえい', 'rò rỉ thông tin'],
      ['上長', 'じょうちょう', 'cấp trên trực tiếp'],
      ['に限り', 'にかぎり', 'chỉ trong trường hợp'],
      ['保留', 'ほりゅう', 'tạm giữ, treo lại'],
    ],
  }),
];

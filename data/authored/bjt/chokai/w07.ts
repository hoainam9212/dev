import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/** Week 7 — negotiation and client meetings: conditions, concessions, indirect refusals. Level: J1. */
export const W07: BjtItem[] = [
  item('w07', 'bamen', 1, {
    material: {
      kind: 'scene',
      vi: 'Phòng họp. Hai người đàn ông mặc vest đứng hai bên bàn, đang bắt tay nhau qua mặt bàn. Trên bàn là hai bản hợp đồng đã có chữ ký và dấu, cạnh đó là hai cây bút đã đậy nắp. Các ghế đều đã được đẩy ra sau.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['二人が握手をしています。', '二人が契約書に署名しています。', '男性が相手に名刺を渡しています。', '二人が座って話し合っています。'],
        0,
        'Hai người đang bắt tay: 握手をする. Hợp đồng đã ký xong, bút đã đậy nắp, nên câu 2 là việc đã qua. Cả hai đang đứng, nên câu 4 sai. Không có danh thiếp nào.',
      ],
    ],
    points: [
      ['握手', 'あくしゅ', 'bắt tay'],
      ['署名する', 'しょめいする', 'ký tên'],
    ],
  }),
  item('w07', 'bamen', 2, {
    material: {
      kind: 'scene',
      vi: 'Phòng họp có màn hình lớn hiện bảng giá ba gói dịch vụ. Một nữ nhân viên đứng cạnh màn hình, tay cầm bút chiếu laser chỉ vào cột giữa. Ba vị khách ngồi ở bàn, cúi xuống ghi chép vào sổ.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['女性が客に資料を配っています。', '客が女性に質問しています。', '女性がスクリーンを指しながら説明しています。', '客がスクリーンの電源を切っています。'],
        2,
        'Cô ấy đang dùng bút laser chỉ vào màn hình: 指しながら説明している. Khách đang cúi ghi chép, không ai hỏi. Cô ấy không phát tài liệu. Màn hình vẫn đang bật.',
      ],
    ],
    points: [
      ['指す', 'さす', 'chỉ vào'],
      ['料金プラン', 'りょうきんぷらん', 'gói giá'],
    ],
  }),
  item('w07', 'hatsugen', 1, {
    script: [
      ['状況', '取引先から値引きを求められましたが、これ以上は下げられません。丁寧に断ります。何と言いますか。', 'Đối tác yêu cầu giảm giá, nhưng bạn không thể giảm thêm. Bạn từ chối một cách lịch sự. Bạn nói gì?'],
    ],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        [
          'できません。',
          'ご要望にお応えしたいのはやまやまなのですが、これ以上のお値引きはいたしかねます。',
          'もう少し考えれば、たぶんなんとかなると思います。',
          'それでしたら、ほかの会社にお願いしてください。',
        ],
        1,
        'やまやまなのですが (rất muốn nhưng…) thể hiện thiện chí, いたしかねます là cách từ chối trang trọng. Câu 1 cộc lốc. Câu 3 gieo hy vọng sai. Câu 4 đẩy khách đi.',
      ],
    ],
    points: [
      ['やまやま', 'やまやま', 'rất muốn (nhưng không thể)'],
      ['いたしかねます', 'いたしかねます', 'không thể làm (từ chối trang trọng)'],
    ],
  }),
  item('w07', 'hatsugen', 2, {
    script: [
      ['状況', '取引先から急に「納期を一週間早めてほしい」と頼まれました。すぐには答えられないので、確認してから返事をすると伝えます。何と言いますか。', 'Đối tác đột ngột nhờ "đẩy hạn giao hàng sớm lên một tuần". Bạn không trả lời ngay được, nên báo sẽ kiểm tra rồi trả lời. Bạn nói gì?'],
    ],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        [
          'はい、大丈夫です。たぶん間に合います。',
          '一週間早めるのは、無理に決まっていますよ。',
          '工場に聞いておきますから、そちらで待っていてもらえますか。',
          '承知いたしました。工場の生産状況を確認のうえ、本日中にお返事させていただけますでしょうか。',
        ],
        3,
        'Tiếp nhận yêu cầu, nói sẽ làm gì (kiểm tra tình hình sản xuất) và hẹn khi nào trả lời (trong hôm nay). Câu 1 hứa khi chưa chắc. Câu 2 từ chối thẳng mà chưa kiểm tra. Câu 3 đúng ý nhưng quá suồng sã và không hẹn thời hạn.',
      ],
    ],
    points: [
      ['確認のうえ', 'かくにんのうえ', 'sau khi kiểm tra'],
      ['生産状況', 'せいさんじょうきょう', 'tình hình sản xuất'],
    ],
  }),
  item('w07', 'hatsugen', 3, {
    script: [
      ['状況', '取引先との商談が終わりました。帰る前に、時間を取ってもらったお礼を言います。何と言いますか。', 'Buổi đàm phán với đối tác đã xong. Trước khi về, bạn cảm ơn họ đã dành thời gian. Bạn nói gì?'],
    ],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        [
          '今日はどうも。じゃあ、また。',
          'お時間を割いていただき、ご苦労様でした。',
          '本日はお忙しい中、貴重なお時間をいただき、誠にありがとうございました。',
          '今日の打ち合わせは、こちらにとって大変有利な内容でした。',
        ],
        2,
        'Câu cảm ơn chuẩn: お忙しい中、貴重なお時間をいただき…. Câu 1 quá thân mật. Câu 2 mở đầu đúng nhưng ご苦労様 là lời người trên nói với người dưới. Câu 4 vô ý: nói ra là mình được lợi.',
      ],
    ],
    points: [
      ['貴重な', 'きちょうな', 'quý giá'],
      ['時間を割く', 'じかんをさく', 'dành thời gian'],
    ],
  }),
  item('w07', 'hatsugen', 4, {
    script: [
      ['状況', '取引先から新しい提案を受けましたが、その場では賛成できません。はっきり断らず、返事を保留したいです。何と言いますか。', 'Đối tác đưa ra một đề xuất mới, nhưng bạn không thể đồng ý ngay tại chỗ. Bạn không muốn từ chối thẳng mà muốn hoãn trả lời. Bạn nói gì?'],
    ],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        [
          '大変興味深いご提案ですので、一度社内で検討させていただけますでしょうか。',
          'その条件では、お受けできません。',
          'すばらしいですね。ぜひやりましょう。',
          'よくわからないので、もう結構です。',
        ],
        0,
        '検討させていただく là cách hoãn trả lời phổ biến nhất, thường hàm ý chưa đồng ý. Câu 2 là từ chối thẳng, trái với ý muốn hoãn. Câu 3 đồng ý ngay. Câu 4 gạt đề xuất đi một cách thất lễ.',
      ],
    ],
    points: [
      ['検討する', 'けんとうする', 'xem xét, cân nhắc'],
      ['保留する', 'ほりゅうする', 'tạm hoãn, treo lại'],
    ],
  }),
  item('w07', 'sogo-chokai', 1, {
    script: [
      ['男', '先日のお見積もりですが、単価をもう少しお下げいただくことは可能でしょうか。', 'Về báo giá hôm trước, liệu bên chị có thể giảm đơn giá thêm một chút được không?'],
      ['女', '単価となりますと、正直なところ、かなり厳しい状況でして…。', 'Nếu là đơn giá thì thật lòng mà nói, tình hình khá khó khăn…'],
      ['男', 'そうですか。実は、来年度は発注量を今の倍にする予定なんです。', 'Vậy à. Thật ra năm sau chúng tôi dự định đặt gấp đôi hiện nay.'],
      ['女', '倍、ですか。それでしたら、話は変わってまいります。一度持ち帰りまして、数量に応じたお値段を、改めてご提示させていただけますか。', 'Gấp đôi ạ? Vậy thì chuyện lại khác. Cho phép tôi mang về, rồi gửi lại anh mức giá theo số lượng nhé.'],
      ['男', 'ありがとうございます。それから、お支払いの条件ですが、月末締めの翌々月払いにしていただけると助かるのですが。', 'Cảm ơn chị. Còn điều kiện thanh toán, nếu được chốt cuối tháng và trả vào tháng sau nữa thì tốt quá.'],
      ['女', 'お支払いのほうは、弊社の規定で翌月末までとなっておりまして…。こちらはご容赦いただけますでしょうか。', 'Về thanh toán thì theo quy định bên tôi là đến cuối tháng sau… Mong anh thông cảm cho điểm này.'],
      ['男', 'わかりました。では、お値段のほう、よろしくお願いします。', 'Tôi hiểu rồi. Vậy về giá, nhờ chị nhé.'],
    ],
    questions: [
      [
        '女の人は単価についてどうしますか。',
        ['今の単価のままにする', 'その場で単価を下げる', '発注量を倍にするよう頼む', '数量に応じた価格を改めて出す'],
        3,
        'Lúc đầu chị nói khó (厳しい状況でして), nhưng nghe đặt gấp đôi thì 話は変わってまいります và hẹn mang về, gửi lại giá theo số lượng. Chị không giảm ngay tại chỗ. Gấp đôi là ý của bên mua.',
      ],
      [
        '支払い条件はどうなりましたか。',
        ['翌々月払いになった', '今までどおり翌月末払いのまま', '半分を前払いにする', '来年度から変更する'],
        1,
        'ご容赦いただけますでしょうか = xin thông cảm, tức là từ chối khéo. Bên mua đáp わかりました và chỉ nhắc lại chuyện giá, nên điều kiện thanh toán giữ như cũ.',
      ],
    ],
    points: [
      ['単価', 'たんか', 'đơn giá'],
      ['持ち帰る', 'もちかえる', 'mang về (để bàn nội bộ)'],
      ['ご容赦ください', 'ごようしゃください', 'xin thông cảm, xin bỏ qua'],
      ['翌々月', 'よくよくげつ', 'tháng sau nữa'],
    ],
  }),
  item('w07', 'sogo-chokai', 2, {
    script: [
      ['女', '御社のシステム、機能はとてもいいと思うんです。ただ、他社さんのほうが、導入費用が三割ほど安くて。', 'Hệ thống của công ty anh, tôi thấy chức năng rất tốt. Có điều, bên khác rẻ hơn khoảng ba mươi phần trăm chi phí triển khai.'],
      ['男', 'さようでございますか。弊社は導入後五年間、保守費用がかからない形になっておりますので、五年で見ますと、総額はほぼ同じになるかと存じます。', 'Ra vậy ạ. Bên tôi miễn phí bảo trì trong năm năm sau khi triển khai, nên tính theo năm năm thì tổng chi phí gần như bằng nhau.'],
      ['女', 'なるほど、五年で見れば同じ、ということですね。', 'Ra vậy, tính năm năm thì bằng nhau.'],
      ['男', 'はい。また、操作研修も無料で、何回でも実施しております。', 'Vâng. Ngoài ra, đào tạo sử dụng cũng miễn phí, bao nhiêu buổi cũng được.'],
      ['女', 'それは助かります。ただ、うちは三年後に本社の移転が決まっていて、システムもそのときに見直す予定なんです。', 'Vậy thì tốt. Có điều, ba năm nữa trụ sở chính bên tôi chắc chắn sẽ chuyển đi, và lúc đó sẽ xem xét lại cả hệ thống.'],
      ['男', 'さようでございますか…。', 'Ra vậy ạ…'],
    ],
    questions: [
      [
        '男の人は、費用についてどう説明しましたか。',
        ['他社より導入費用が安い', '研修の費用が三割安い', '五年間で比べれば総額はほぼ同じ', '保守費用を三割下げる'],
        2,
        'Chi phí triển khai đắt hơn, nhưng năm năm không mất phí bảo trì, nên tính năm năm thì tổng gần như bằng nhau. Ba mươi phần trăm là mức chênh chi phí triển khai, không phải chuyện đào tạo hay bảo trì.',
      ],
      [
        '女の人の最後の話から、どんなことがわかりますか。',
        ['五年間の総額で比べる利点が、この会社には小さい', '研修の回数が足りない', '他社のシステムのほうが機能がいい', '本社の移転を延期する'],
        0,
        'Ba năm nữa sẽ xem xét lại hệ thống, nên lợi thế "tính năm năm thì bằng nhau" gần như không còn ý nghĩa. Đây là cách từ chối gián tiếp; anh kia hiểu nên chỉ đáp さようでございますか… Chị khen chức năng bên anh tốt, nên lựa chọn 3 sai.',
      ],
    ],
    points: [
      ['導入費用', 'どうにゅうひよう', 'chi phí triển khai'],
      ['保守', 'ほしゅ', 'bảo trì'],
      ['総額', 'そうがく', 'tổng số tiền'],
      ['さようでございますか', 'さようでございますか', 'vậy ạ (rất lịch sự)'],
    ],
  }),
];

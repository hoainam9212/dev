import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/** Week 10 — contracts, quotations and deliveries. Level: J1. */
export const W10: BjtItem[] = [
  item('w10', 'bamen', 1, {
    material: {
      kind: 'scene',
      vi: 'Khu nhận hàng của nhà kho. Các thùng hàng đã được xếp sẵn trên một xe đẩy. Một tài xế xe tải đứng chờ, tay không. Một nữ nhân viên kho đặt tờ phiếu giao hàng lên nắp thùng và đang ấn con dấu nhận hàng lên phiếu.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['運転手がトラックから荷物を降ろしています。', '女性が伝票に受領印を押しています。', '女性が台車を押しています。', '運転手が伝票に記入しています。'],
        1,
        'Cô ấy đang đóng dấu nhận hàng lên phiếu: 受領印を押す. Hàng đã được xếp lên xe đẩy nên không còn bốc dỡ. Tài xế đứng chờ tay không, không viết gì. Xe đẩy đứng yên.',
      ],
    ],
    points: [
      ['伝票', 'でんぴょう', 'phiếu (giao hàng, chứng từ)'],
      ['受領印', 'じゅりょういん', 'dấu xác nhận đã nhận'],
    ],
  }),
  item('w10', 'bamen', 2, {
    material: {
      kind: 'scene',
      vi: 'Phòng họp. Hai người đàn ông ngồi đối diện nhau. Một người đang dùng bút dạ quang tô một dòng trong bản hợp đồng đang mở. Người kia cầm tách cà phê, nhìn sang. Trên bàn có con dấu công ty nhưng chưa dùng.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['男性が契約書に署名しています。', '男性が契約書をコピーしています。', '二人が握手をしています。', '男性が契約書の一部に印をつけています。'],
        3,
        'Tô dạ quang một dòng là 印をつける (đánh dấu). Câu 1 sai vì đánh dấu không phải ký tên, con dấu cũng chưa dùng. Không có máy photo, không ai bắt tay.',
      ],
    ],
    points: [
      ['印をつける', 'しるしをつける', 'đánh dấu'],
      ['蛍光ペン', 'けいこうぺん', 'bút dạ quang'],
    ],
  }),
  item('w10', 'hatsugen', 1, {
    script: [['状況', '取引先から見積もりを頼まれました。いつまでに出せるかを伝えます。何と言いますか。', 'Đối tác nhờ bạn làm báo giá. Bạn báo khi nào có thể gửi. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        [
          '承知いたしました。明後日の午前中までにお送りいたします。',
          'できるだけ早く出しますね。',
          'お見積もりは、いつまでにお出しになればよろしいでしょうか。',
          '見積もりは時間がかかるので、来月になると思います。',
        ],
        0,
        'Nhận yêu cầu và hẹn thời hạn cụ thể (明後日の午前中). Câu 2 mơ hồ. Câu 3 dùng お出しになる (tôn kính) cho việc của chính mình. Câu 4 tự ý kéo dài mà không hỏi khách cần lúc nào.',
      ],
    ],
    points: [['明後日', 'あさって', 'ngày kia']],
  }),
  item('w10', 'hatsugen', 2, {
    script: [['状況', '商品を納品しました。相手の担当者に、受け取りのサインをもらいます。何と言いますか。', 'Bạn vừa giao hàng. Bạn xin người phụ trách bên kia ký nhận. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        [
          'ここにサインしなさい。',
          'こちらにサインしてさしあげてください。',
          'お手数ですが、こちらに受領のサインをいただけますでしょうか。',
          'サインをいただいてもよろしいですか。お書きしてください。',
        ],
        2,
        'お手数ですが + いただけますでしょうか là cách nhờ chuẩn. Câu 1 là mệnh lệnh. Câu 2 dùng さしあげる sai chỗ. Câu 4 mở đầu ổn nhưng お書きして là khiêm nhường ngữ, dùng cho hành động của khách là sai.',
      ],
    ],
    points: [['受領', 'じゅりょう', 'nhận (chính thức)']],
  }),
  item('w10', 'hatsugen', 3, {
    script: [['状況', '契約書について打ち合わせをしています。相手から「この第五条ですが、少し確認させていただけますか」と言われました。何と言いますか。', 'Trong buổi trao đổi về hợp đồng, bên kia nói: "Về điều 5, cho phép tôi xác nhận một chút được không?" Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        ['第五条は問題ないはずです。', 'はい、どの点でございましょうか。', '確認してもらわなくても大丈夫ですよ。', 'では、第五条は削除いたします。'],
        1,
        'Bên kia muốn hỏi, nên mời họ nói cụ thể điểm nào: どの点でございましょうか. Câu 1 và 3 gạt câu hỏi đi. Câu 4 xoá điều khoản khi còn chưa biết họ muốn hỏi gì.',
      ],
    ],
    points: [['条', 'じょう', 'điều (trong hợp đồng)']],
  }),
  item('w10', 'hatsugen', 4, {
    script: [['状況', '明日届ける予定の商品が、工場の設備トラブルで一日遅れることになりました。取引先に電話で伝えます。何と言いますか。', 'Hàng dự định giao ngày mai sẽ chậm một ngày do sự cố thiết bị ở nhà máy. Bạn gọi điện báo đối tác. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        [
          '明日の納品、あさってになります。',
          '工場のせいで遅れます。すみません。',
          '一日くらいなら、問題ないですよね。',
          '大変申し訳ございません。明日お届けの予定でした商品ですが、工場の設備トラブルにより、一日遅れて、あさってのお届けとなります。',
        ],
        3,
        'Báo chậm hàng gồm: xin lỗi, hàng nào, lý do, ngày giao mới. Câu 1 thiếu lời xin lỗi và lý do. Câu 2 đổ lỗi cho nhà máy bằng giọng suồng sã. Câu 3 tự cho là không sao.',
      ],
    ],
    points: [['設備トラブル', 'せつびとらぶる', 'sự cố thiết bị']],
  }),
  item('w10', 'sogo-chokai', 1, {
    script: [
      ['男', '来月で今の保守契約が終わりますが、更新の件でご相談がありまして。', 'Tháng sau hợp đồng bảo trì hiện tại hết hạn, tôi muốn bàn với chị về việc gia hạn.'],
      ['女', 'はい。', 'Vâng.'],
      ['男', '料金を、月五万円から五万五千円に改定させていただきたいのですが。', 'Chúng tôi xin phép điều chỉnh phí từ năm mươi nghìn lên năm mươi lăm nghìn yên mỗi tháng.'],
      ['女', '一割の値上げですか…。正直なところ、今年は予算が厳しくて。', 'Tăng mười phần trăm à… Thật lòng mà nói, năm nay ngân sách eo hẹp.'],
      ['男', 'さようでございますか。それでしたら、点検の回数を月二回から月一回にしていただければ、今の料金のままで続けていただけます。', 'Ra vậy ạ. Nếu thế, giảm số lần kiểm tra từ hai lần xuống một lần mỗi tháng thì có thể giữ nguyên mức phí hiện nay.'],
      ['女', '点検が減るのは不安ですね…。値上げのほうでお願いします。その代わり、契約期間を二年にしていただけませんか。', 'Giảm kiểm tra thì tôi không yên tâm… Thôi tôi chọn tăng giá. Đổi lại, anh cho hợp đồng thời hạn hai năm được không?'],
      ['男', '二年でしたら、弊社としてもありがたいです。では、その条件で。', 'Hai năm thì bên tôi cũng rất vui. Vậy theo điều kiện đó ạ.'],
    ],
    questions: [
      [
        '男の人の最初の提案は何ですか。',
        ['料金を一割上げる', '点検の回数を減らす', '契約を二年にする', '契約を終わりにする'],
        0,
        'Đề xuất đầu tiên là tăng phí từ 50.000 lên 55.000 yên (一割). Giảm số lần kiểm tra là phương án thứ hai, đưa ra sau khi khách kêu khó. Hai năm là đề xuất của khách.',
      ],
      [
        '契約はどうなりましたか。',
        ['今の料金で、点検を月一回にする', '今の料金で、点検を月二回のままにする', '月五万五千円で、二年の契約にする', '月五万五千円で、一年の契約にする'],
        2,
        'Khách chọn tăng giá (値上げのほうで) để giữ số lần kiểm tra, đổi lại hợp đồng hai năm; bên bán đồng ý (その条件で). Lựa chọn 1 là phương án bị khách từ chối.',
      ],
    ],
    points: [
      ['保守契約', 'ほしゅけいやく', 'hợp đồng bảo trì'],
      ['更新', 'こうしん', 'gia hạn'],
      ['改定', 'かいてい', 'điều chỉnh (giá, quy định)'],
    ],
  }),
  item('w10', 'sogo-chokai', 2, {
    script: [
      ['女', '山口さん、例の部品、来週の月曜に納品の予定よね。', 'Anh Yamaguchi, lô linh kiện đó dự kiến giao thứ hai tuần sau nhỉ.'],
      ['男', 'はい。ただ、先方が月曜は受け入れが難しいかもしれないと思いまして。', 'Vâng. Có điều tôi nghĩ có khi thứ hai bên kia khó nhận hàng.'],
      ['女', 'どうして？', 'Sao vậy?'],
      ['男', '先方の担当の方が、昨日の電話で、「月曜はちょっとバタバタしてて」とおっしゃっていたんです。', 'Hôm qua người phụ trách bên đó nói qua điện thoại là "thứ hai hơi bận rộn".'],
      ['女', 'それだけ？正式に変更を頼まれたわけじゃないのね。', 'Chỉ thế thôi à? Họ đâu có chính thức nhờ đổi.'],
      ['男', 'はい。', 'Vâng.'],
      ['女', '気になるなら、こちらから確認しておいたほうがいいわ。届けてから受け取れないなんてことになったら困るでしょう。今日中に、受け入れ可能な日時を伺っておいて。', 'Nếu thấy lo thì mình nên chủ động hỏi. Giao tới nơi rồi mà họ không nhận được thì phiền lắm. Trong hôm nay hỏi họ ngày giờ nào nhận được nhé.'],
    ],
    questions: [
      [
        '男の人が月曜の納品を心配しているのはなぜですか。',
        ['部品の生産が遅れているから', '先方の担当者が月曜は忙しいと言っていたから', '倉庫の場所が変わったから', '正式に変更を頼まれたから'],
        1,
        'Lý do chỉ là một câu nói của bên kia: 月曜はちょっとバタバタしてて (thứ hai hơi bận). Trưởng phòng xác nhận họ không chính thức nhờ đổi, nên lựa chọn 4 sai.',
      ],
      [
        '男の人はこのあと何をしますか。',
        ['予定どおり月曜日に納品する', '納品を火曜日に変える', '上司に報告する', '先方に受け入れ可能な日時を確認する'],
        3,
        'Trưởng phòng dặn 今日中に、受け入れ可能な日時を伺っておいて. Chưa biết ngày nào nên chưa thể đổi sang thứ ba. Anh đã báo cáo với trưởng phòng ngay trong cuộc nói chuyện này.',
      ],
    ],
    points: [
      ['バタバタする', 'ばたばたする', 'bận rộn, tất bật'],
      ['受け入れ', 'うけいれ', 'tiếp nhận (hàng)'],
    ],
  }),
];

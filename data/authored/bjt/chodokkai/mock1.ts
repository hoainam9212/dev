import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/**
 * Full test 1 (week 8), 聴読解: 5 状況把握 + 10 資料聴読解 + 10 総合聴読解 questions = 25.
 * Mixes the themes of weeks 1–7; about 30% of the questions are J1+ (calculation, inference).
 * Calibrated 2026-11-14 (spec rules 1, 2, 3, 8, 9, 10): 状況把握 is a photo + printed topic choices,
 * 総合聴読解 is ten one-question items whose choices are the positions 【1】–【4】 on the material.
 */
export const MOCK1: BjtItem[] = [
  // ── 状況把握 ──
  item('mock1', 'jokyo', 1, {
    material: {
      kind: 'scene',
      vi: 'Cạnh máy photocopy trong văn phòng. Một nhân viên nữ ôm chồng giấy đã in, tờ trên cùng dán một mẩu giấy nhớ màu vàng, đang nói với một người đàn ông lớn tuổi mặc vest. Trên bàn bên cạnh có một chiếc dập ghim và một thùng giấy in.',
    },
    script: [
      ['女', '部長、来週の会議でお配りするもの、さっき刷り上がったんですけど、一か所、数字が去年のままになってまして。', 'Thưa trưởng bộ phận, tài liệu phát ở cuộc họp tuần sau vừa in xong, nhưng có một chỗ con số vẫn để nguyên của năm ngoái.'],
      ['男', 'ああ、売上の表のところ？', 'À, chỗ bảng doanh thu à?'],
      ['女', 'はい、三ページ目です。全部刷り直したほうがいいでしょうか。', 'Vâng, ở trang ba ạ. Có nên in lại toàn bộ không ạ?'],
      ['男', 'うーん、五十部だよね。その一枚だけ刷って、差し替えればいいよ。ホチキスはまだでしょう？', 'Ừm, năm mươi bộ nhỉ. Chỉ cần in riêng tờ đó rồi thay vào là được. Chưa dập ghim đúng không?'],
      ['女', 'はい、まだ留めていません。じゃあ、差し替えてから留めます。', 'Vâng, em chưa dập ạ. Vậy em thay xong rồi mới dập.'],
    ],
    questions: [
      [
        '二人は何について話していますか。',
        ['会議資料の誤り', '会議資料の部数', '会議資料の配り方', '会議資料の留め方'],
        0,
        'Con số ở trang ba "vẫn để nguyên của năm ngoái" tức là tài liệu họp có chỗ sai, và cả đoạn bàn cách sửa chỗ sai đó (in lại một tờ để thay). Từ 誤り không xuất hiện, phải suy ra. Lựa chọn 2 (số bộ) dùng lại chữ 五十部 và lựa chọn 4 dùng lại chuyện dập ghim, nhưng đó chỉ là chi tiết phụ.',
      ],
    ],
    points: [
      ['刷り上がる', 'すりあがる', 'in xong'],
      ['差し替える', 'さしかえる', 'thay (trang, tờ) bằng cái mới'],
    ],
  }),
  item('mock1', 'jokyo', 2, {
    material: {
      kind: 'scene',
      vi: 'Quầy lễ tân ở sảnh tầng một của một công ty. Một nam nhân viên cầm điện thoại di động đứng trước quầy, nói chuyện với nữ lễ tân. Qua cửa kính phía sau thấy bãi đỗ xe có rào chắn và biển "工事中".',
    },
    script: [
      ['男', 'あのう、二時にいらっしゃる北川工業の方なんですが、お車でお見えになるそうなんです。', 'Chị ơi, khách của Công nghiệp Kitagawa đến lúc hai giờ, nghe nói họ đi ô tô tới.'],
      ['女', 'あら、今日は来客用のところ、工事で使えないんですよ。', 'Ôi, hôm nay chỗ dành cho khách đang thi công nên không dùng được.'],
      ['男', 'そうなんですか。じゃあ、近くのコインパーキングをご案内して、料金はあとでお返しするしか…', 'Vậy à. Thế thì chỉ còn cách chỉ khách sang bãi gửi xe tính tiền gần đây, rồi sau đó hoàn lại tiền cho khách…'],
      ['女', '裏の搬入口の横なら、一台ぐらいは停められると思いますよ。総務に一言断っておけば。', 'Bên cạnh cửa nhập hàng phía sau thì chắc để được một chiếc. Chỉ cần báo trước với phòng tổng vụ một tiếng.'],
      ['男', 'わかりました。じゃ、総務に聞いてみます。', 'Tôi hiểu rồi. Vậy tôi hỏi phòng tổng vụ xem.'],
    ],
    questions: [
      [
        '二人は何について話していますか。',
        ['来客の到着時刻', '来客の受付方法', '来客の駐車場所', '来客の駐車料金'],
        2,
        'Chỗ đỗ cho khách đang thi công, nên hai người tìm chỗ khác cho xe của khách (bãi gửi xe gần đó, cạnh cửa nhập hàng). Chủ đề là chỗ đỗ xe; chữ 駐車場所 không có trong băng. Lựa chọn 4 dễ nhầm vì có nói tới tiền (料金はあとでお返し), nhưng đó chỉ là một ý phụ của một phương án. Lựa chọn 1 lấy từ chữ "hai giờ".',
      ],
    ],
    points: [
      ['お見えになる', 'おみえになる', 'đến (tôn kính ngữ của 来る)'],
      ['搬入口', 'はんにゅうぐち', 'cửa nhập hàng'],
      ['一言断る', 'ひとことことわる', 'báo trước một tiếng, xin phép'],
    ],
  }),
  item('mock1', 'jokyo', 3, {
    material: {
      kind: 'scene',
      vi: 'Trong xưởng sản xuất. Một nữ công nhân đội mũ bảo hộ chỉ vào một hộp nhựa đựng ốc vít chỉ còn khoảng một nửa, đặt cạnh băng chuyền. Bên cạnh là một người đàn ông cũng đội mũ bảo hộ, tay cầm bìa kẹp hồ sơ.',
    },
    script: [
      ['女', '班長、このネジ、箱にあと半分ぐらいしか残ってないんですけど。', 'Tổ trưởng ơi, loại ốc này trong hộp chỉ còn khoảng một nửa thôi ạ.'],
      ['男', 'え、この前頼んだ分は？もう届いてるはずだけど。', 'Hả, số đã đặt hôm trước đâu? Lẽ ra phải tới rồi chứ.'],
      ['女', 'それが、業者さんのほうで手違いがあったらしくて、届くのが来週の水曜になるそうなんです。', 'Chuyện là bên nhà cung cấp hình như bị nhầm, nghe nói thứ tư tuần sau mới tới.'],
      ['男', '水曜か…このペースだと、月曜にはなくなるな。第二工場に余ってないか、聞いてみてくれる？', 'Thứ tư à… Cứ đà này thì thứ hai là hết. Em hỏi giúp xem xưởng số hai có dư không?'],
      ['女', 'はい、すぐ電話してみます。', 'Vâng, em gọi ngay ạ.'],
    ],
    questions: [
      [
        '二人は何について話していますか。',
        ['部品の品質', '部品の不足', '部品の業者', '部品の置き場所'],
        1,
        'Ốc chỉ còn một nửa, hàng đặt bị trễ, đến thứ hai sẽ hết, nên phải hỏi xưởng khác: chủ đề là thiếu linh kiện. Chữ 不足 không được nói ra. Lựa chọn 3 dùng chữ 業者 nghe được trong băng, nhưng nhà cung cấp chỉ là lý do hàng tới trễ, không phải điều đang bàn. Lựa chọn 4 lấy từ chữ "hộp".',
      ],
    ],
    points: [
      ['班長', 'はんちょう', 'tổ trưởng'],
      ['手違い', 'てちがい', 'sơ suất, nhầm lẫn'],
      ['余る', 'あまる', 'dư, thừa'],
    ],
  }),
  item('mock1', 'jokyo', 4, {
    material: {
      kind: 'scene',
      vi: 'Một phòng họp nhỏ. Một người đàn ông và một người phụ nữ ngồi cạnh nhau nhìn màn hình máy tính xách tay đang mở bản đồ. Trên bàn có vài tờ rơi giới thiệu khách sạn và hội trường, cùng một danh sách tên in sẵn.',
    },
    script: [
      ['男', '来年の新人研修ですが、今年の会場、駅から遠いって評判が悪かったんですよね。', 'Về khoá đào tạo nhân viên mới năm sau, địa điểm năm nay bị chê là xa ga quá nhỉ.'],
      ['女', 'ええ、バスは出したんですけど、朝、間に合わない人もいて。', 'Vâng, đã cho xe buýt đưa đón rồi mà buổi sáng vẫn có người không kịp.'],
      ['男', '今回の候補のここなら、駅の目の前ですよ。三十人なら広さも十分ですし。', 'Chỗ ứng viên lần này thì ngay trước ga. Ba mươi người thì rộng rãi đủ.'],
      ['女', 'ただ、ここ、泊まれないんですよね。二泊三日の予定ですから、近くにホテルがあるかどうか…', 'Có điều chỗ này không ngủ lại được. Dự định ba ngày hai đêm, nên phải xem gần đó có khách sạn không…'],
      ['男', 'それも調べておきます。', 'Tôi sẽ tìm hiểu cả chuyện đó.'],
    ],
    questions: [
      [
        '二人は何について話していますか。',
        ['新人研修の日数', '新人研修の人数', '新人研修のバス', '新人研修の施設'],
        3,
        'Hai người so sánh nơi tổ chức (xa ga hay gần ga, rộng đủ không, có chỗ ngủ không): chủ đề là nơi, cơ sở dùng cho khoá đào tạo. Chữ 施設 không có trong băng. Lựa chọn 3 dùng chữ バス nghe được trong băng, nhưng xe buýt là cách xử lý của năm nay, không phải điều đang bàn. Lựa chọn 1 và 2 lấy từ "ba ngày hai đêm" và "ba mươi người".',
      ],
    ],
    points: [
      ['評判', 'ひょうばん', 'tiếng tăm, đánh giá'],
      ['二泊三日', 'にはくみっか', 'ba ngày hai đêm'],
    ],
  }),
  item('mock1', 'jokyo', 5, {
    material: {
      kind: 'scene',
      vi: 'Văn phòng mở, đồng hồ treo tường chỉ năm giờ bốn mươi chiều. Một người phụ nữ đứng cạnh bàn một đồng nghiệp nam, tay cầm một phong bì nhỏ ghi danh sách tên. Người đàn ông vừa nghe vừa nhìn điện thoại.',
    },
    script: [
      ['女', '山口さん、来月で退職されるでしょう。みんなで何か贈ろうって話になってて。', 'Anh Yamaguchi tháng sau nghỉ việc đúng không. Mọi người đang bàn là cùng tặng anh ấy cái gì đó.'],
      ['男', 'いいですね。でも花束だと、最後の日に持って帰るのが大変かな。', 'Hay đấy. Nhưng hoa thì ngày cuối mang về chắc vất vả.'],
      ['女', 'そうなんですよ。それで一人千円ずつ集めて、山口さんが好きなコーヒーの道具なんかどうかと思って。', 'Đúng thế. Nên tôi định mỗi người góp một nghìn yên, mua bộ dụng cụ pha cà phê mà anh Yamaguchi thích chẳng hạn.'],
      ['男', 'あ、それなら詳しい人を知ってますよ。何がいいか聞いておきます。', 'À, thế thì tôi biết một người rành lắm. Tôi sẽ hỏi xem nên mua gì.'],
      ['女', '助かります。お金は金曜までに私のところにお願いします。', 'Vậy thì tốt quá. Tiền thì nhờ anh đưa tôi trước thứ sáu.'],
    ],
    questions: [
      [
        '二人は何について話していますか。',
        ['退職する同僚の送別会', '退職する同僚への花束', '退職する同僚への記念品', '退職する同僚の引き継ぎ'],
        2,
        'Cả đoạn bàn việc góp tiền mua quà (dụng cụ pha cà phê) tặng người sắp nghỉ: chủ đề là món quà kỷ niệm. Chữ 記念品 không có trong băng. Lựa chọn 2 có chữ 花束 nghe được trong băng, nhưng hoa đã bị gạt đi vì khó mang về. Không ai nhắc tới tiệc chia tay hay bàn giao công việc.',
      ],
    ],
    points: [
      ['退職する', 'たいしょくする', 'nghỉ việc'],
      ['贈る', 'おくる', 'tặng'],
    ],
  }),

  // ── 資料聴読解 ──
  item('mock1', 'shiryo', 1, {
    material: {
      kind: 'text',
      body: '提出日：　　年　　月　　日\n\n氏名：＿＿＿＿　所属：＿＿＿＿\n期間：　月　日〜　月　日（　日間）\n種別：□ 年次　□ 特別（慶弔）　□ 代休\n不在中の連絡先・引き継ぎ先：＿＿＿＿\n\n所属長承認印：　　　人事部受付印：',
    },
    script: [['女', 'じゃあ、これに書いて、水曜までに課長のはんこをもらってから人事に出してね。引き継ぎ先は、田中さんでいいと思うよ。', 'Vậy anh điền vào tờ này, xin dấu của trưởng phòng trước thứ tư rồi nộp cho phòng nhân sự nhé. Người nhận bàn giao thì chắc để chị Tanaka là được.']],
    questions: [
      [
        '女の人が渡した書類は、何の書類ですか。',
        ['出張の申請書', '休暇の届け', '経費の精算書', '異動の希望書'],
        1,
        'Tờ giấy có ô "loại": 年次 (phép năm), 特別（慶弔）(nghỉ hiếu hỷ), 代休 (nghỉ bù), cùng thời gian vắng mặt và người nhận bàn giao: đây là giấy xin nghỉ. Lời nói chỉ bảo cách nộp, quyết định nằm trên giấy. Lựa chọn 4 dễ nhầm vì có chữ 引き継ぎ, nhưng giấy không có ô nơi muốn chuyển đến.',
      ],
    ],
    points: [
      ['慶弔', 'けいちょう', 'việc hiếu hỷ'],
      ['代休', 'だいきゅう', 'nghỉ bù'],
      ['引き継ぎ', 'ひきつぎ', 'bàn giao công việc'],
    ],
  }),
  item('mock1', 'shiryo', 2, {
    material: {
      kind: 'table',
      title: '貸し会議室 料金表',
      head: ['部屋', '定員', '半日（4時間）', '1日（8時間）'],
      rows: [
        ['A', '20名', '15,000円', '25,000円'],
        ['B', '40名', '25,000円', '40,000円'],
        ['C', '60名', '35,000円', '60,000円'],
      ],
    },
    script: [['女', '研修の参加者は三十五名で、朝九時から夕方五時までの予定です。部屋は人数に合う、一番安いところでお願いします。', 'Khoá đào tạo có ba mươi lăm người, dự kiến từ chín giờ sáng đến năm giờ chiều. Nhờ đặt phòng rẻ nhất mà vừa số người.']],
    questions: [
      [
        '会場費はいくらになりますか。',
        ['25,000円', '40,000円', '35,000円', '60,000円'],
        1,
        '35 người → phòng B (40 chỗ) trở lên; rẻ nhất là B. Từ 9 giờ đến 17 giờ là 8 tiếng → giá một ngày = 40.000 yên. 25.000 yên là giá nửa ngày của B, hoặc giá một ngày của phòng A (không đủ chỗ).',
      ],
    ],
    points: [['貸し会議室', 'かしかいぎしつ', 'phòng họp cho thuê']],
  }),
  item('mock1', 'shiryo', 3, {
    material: {
      kind: 'table',
      title: '今年度 四半期別売上',
      head: ['四半期', '売上（百万円）'],
      rows: [
        ['第1四半期', '80'],
        ['第2四半期', '95'],
        ['第3四半期', '90'],
        ['第4四半期', '―'],
      ],
    },
    script: [['男', '今年度の売上目標は、年間で四億円です。第四四半期だけで目標の残りを売り上げる必要がありますので、販売計画を見直してください。', 'Mục tiêu doanh thu năm nay là bốn trăm triệu yên. Phần còn lại của mục tiêu phải bán được chỉ trong quý bốn, nên hãy xem lại kế hoạch bán hàng.']],
    questions: [
      [
        '第4四半期に必要な売上はいくらですか。',
        ['1億3,500万円', '9,500万円', '2億6,500万円', '4億円'],
        0,
        'Ba quý đầu: 80 + 95 + 90 = 265 triệu yên. Bốn trăm triệu trừ 265 triệu = 135 triệu yên = 1億3,500万円. 2億6,500万円 là tổng ba quý đã bán, không phải phần còn thiếu.',
      ],
    ],
    points: [
      ['売上目標', 'うりあげもくひょう', 'mục tiêu doanh thu'],
      ['残り', 'のこり', 'phần còn lại'],
    ],
  }),
  item('mock1', 'shiryo', 4, {
    material: {
      kind: 'text',
      title: '【社内公募】海外事業部スタッフ募集',
      body: '【社内公募】海外事業部 スタッフ募集\n\n募集人数：2名\n応募資格：入社3年以上、かつTOEIC 700点以上\n応募締切：5月31日（金）\n応募方法：所定の用紙を人事部へ提出',
    },
    script: [
      ['女', '社内公募の件で二点変更があります。締め切りが一週間延びて、六月七日になりました。', 'Về đợt tuyển nội bộ có hai điểm thay đổi. Hạn nộp được lùi một tuần, thành ngày bảy tháng sáu.'],
      ['女', 'それから、TOEICの点数がなくても、海外勤務の経験が一年以上あれば、応募できることになりました。', 'Ngoài ra, dù không có điểm TOEIC, ai có kinh nghiệm làm việc ở nước ngoài từ một năm trở lên cũng được nộp đơn.'],
    ],
    questions: [
      [
        '入社五年目で、TOEICを受けたことはないが、海外勤務の経験が二年ある人はどうなりますか。',
        ['応募できない', '五月三十一日までに応募できる', '六月七日までに応募できる', 'TOEICを受けてから応募する'],
        2,
        'Năm năm thâm niên đạt điều kiện 3 năm. Không có TOEIC nhưng hai năm làm ở nước ngoài thoả điều kiện mới. Hạn đã lùi sang 7/6. 31/5 là hạn cũ trên giấy.',
      ],
    ],
    points: [
      ['公募', 'こうぼ', 'tuyển công khai'],
      ['応募資格', 'おうぼしかく', 'điều kiện ứng tuyển'],
      ['所定の', 'しょていの', 'theo mẫu quy định'],
    ],
  }),
  item('mock1', 'shiryo', 5, {
    material: {
      kind: 'bars',
      title: '時間帯別 来店客数（平日平均）',
      unit: '人',
      labels: ['10〜12時', '12〜14時', '14〜17時', '17〜20時'],
      series: [
        { name: '来店客数', values: [40, 120, 55, 150] },
        { name: '店員数', values: [4, 4, 4, 4] },
      ],
    },
    script: [['男', '来月から、パートの皆さんの希望をもう一度聞きます。この資料を見ながら、誰がどこに入るか考えてもらえますか。', 'Từ tháng sau, chúng ta sẽ hỏi lại nguyện vọng của các nhân viên bán thời gian. Chị vừa xem tài liệu này vừa tính xem ai vào khung nào được không?']],
    questions: [
      [
        'この資料は、何を決めるために使われますか。',
        ['店の営業時間', '商品の並べ方', '店員の勤務の割り当て', 'パートの時給'],
        2,
        'Tài liệu đặt số khách theo khung giờ cạnh số nhân viên (luôn 4 người, kể cả giờ đông khách), và người nói bảo "ai vào khung nào": tài liệu dùng để chia ca làm việc. Lựa chọn 1 dễ nhầm vì tài liệu có ghi khung giờ mở cửa, nhưng không ai bàn đổi giờ mở cửa.',
      ],
    ],
    points: [
      ['来店客数', 'らいてんきゃくすう', 'số khách đến cửa hàng'],
      ['割り当て', 'わりあて', 'sự phân công'],
    ],
  }),
  item('mock1', 'shiryo', 6, {
    material: {
      kind: 'table',
      title: '主な拠点と日本との時差',
      head: ['都市', '時差'],
      rows: [
        ['ロンドン', '－9時間'],
        ['ニューヨーク', '－14時間'],
        ['シンガポール', '－1時間'],
        ['シドニー', '＋1時間'],
      ],
      note: '夏時間は考えない。',
    },
    script: [['女', '日本時間の午後五時から、シンガポールとシドニーをつないで、三拠点で会議をします。シドニーの担当者に開始時間を伝えておいてください。', 'Từ năm giờ chiều giờ Nhật, sẽ họp ba điểm nối với Singapore và Sydney. Anh báo giờ bắt đầu cho người phụ trách ở Sydney giúp tôi.']],
    questions: [
      [
        'シドニーでは何時に始まりますか。',
        ['午後四時', '午後五時', '午前八時', '午後六時'],
        3,
        'Sydney sớm hơn Nhật một tiếng (+1), nên 17 giờ Nhật là 18 giờ Sydney. 16 giờ là giờ Singapore (−1). Đọc nhầm dấu cộng trừ sẽ chọn nhầm 16 giờ.',
      ],
    ],
    points: [
      ['拠点', 'きょてん', 'cơ sở, điểm (văn phòng)'],
      ['時差', 'じさ', 'chênh lệch múi giờ'],
    ],
  }),
  item('mock1', 'shiryo', 7, {
    material: {
      kind: 'text',
      title: '春の感謝キャンペーン',
      body: '【春の感謝キャンペーン】\n\n期間：3月1日〜3月31日\n内容：1回のご注文金額が5万円以上で5%引き、10万円以上で8%引き\n\n※他の割引券・クーポンとの併用はできません。',
    },
    script: [['男', 'こちらのお客様は、前回のご注文でお渡しした三パーセントの割引券をお持ちです。今回のご注文は六万円です。どちらか、お客様に有利なほうを使っていただきましょう。', 'Vị khách này có phiếu giảm giá ba phần trăm được tặng ở đơn trước. Đơn lần này là sáu mươi nghìn yên. Hãy cho khách dùng cách nào có lợi hơn.']],
    questions: [
      [
        'お客様の支払額はいくらになりますか。',
        ['57,000円', '58,200円', '55,200円', '60,000円'],
        0,
        'Không dùng chung được, chọn một. Khuyến mãi: 60.000 ≥ 50.000 → giảm 5% = 57.000 yên. Phiếu giảm 3% → 58.200 yên. Khuyến mãi lợi hơn. 55.200 yên là cộng dồn 5% + 3%, điều bị cấm.',
      ],
    ],
    points: [
      ['併用', 'へいよう', 'dùng kết hợp'],
      ['有利', 'ゆうり', 'có lợi'],
    ],
  }),
  item('mock1', 'shiryo', 8, {
    material: {
      kind: 'text',
      body: '2027年3月6日（土）10:00〜16:00\n会場：本社工場（正門よりお入りください）\n\n・製品の展示、技術者による説明\n・工場見学ツアー（各回20名、当日受付）\n・お子様向け ものづくり体験\n\n対象：地域の皆様、学生の皆様　入場無料・申込不要',
    },
    script: [['女', 'これ、駅前の掲示板と、近くの大学にも貼らせてもらおうと思ってるんです。去年より早めに出したいので。', 'Tờ này tôi định xin dán ở bảng tin trước ga và cả ở trường đại học gần đây. Năm nay tôi muốn đưa ra sớm hơn năm ngoái.']],
    questions: [
      [
        'この文書は、何のために作られましたか。',
        ['学生を採用するため', '取引先に新製品を売り込むため', '社員の家族を招待するため', '地域の人に会社を知ってもらうため'],
        3,
        'Đối tượng là "người dân trong vùng và sinh viên", vào cửa miễn phí, không cần đăng ký, có tham quan nhà máy và trải nghiệm cho trẻ em: đây là ngày mở cửa nhà máy để người ngoài biết đến công ty. Lựa chọn 1 dễ nhầm vì có dán ở trường đại học, nhưng tờ giấy không nhắc tới tuyển dụng hay ứng tuyển.',
      ],
    ],
    points: [
      ['掲示板', 'けいじばん', 'bảng tin'],
      ['申込不要', 'もうしこみふよう', 'không cần đăng ký'],
    ],
  }),
  item('mock1', 'shiryo', 9, {
    material: {
      kind: 'text',
      title: 'FAX送信票',
      body: 'FAX送信票\n\n宛先：株式会社みなと印刷　営業部　御中\n送信元：三和電材株式会社　広報課　中田\n送信枚数：本紙を含め3枚\n件名：会社案内パンフレット 原稿の件\n\n※赤字で書き込んだ箇所をご確認のうえ、本日中にご返信ください。',
    },
    script: [['男', 'これ、みなと印刷さんに送っといてくれる？急ぎだから、送ったら向こうに電話も一本入れてね。', 'Em gửi cái này cho bên In Minato giúp anh nhé. Việc gấp nên gửi xong thì gọi một cuộc điện thoại báo bên đó luôn.']],
    questions: [
      [
        'このFAXは、何のために送りますか。',
        ['パンフレットを注文するため', '原稿の直しを確認してもらうため', '印刷の代金を知らせるため', '印刷の日程を決めるため'],
        1,
        'Ghi chú ※ trên phiếu: "xem các chỗ viết bằng mực đỏ rồi trả lời trong hôm nay": gửi bản thảo đã sửa để bên in xác nhận. Lời nói chỉ bảo gửi và gọi điện. Lựa chọn 1 dễ nhầm vì có chữ パンフレット, nhưng tiêu đề là "bản thảo", không phải đơn đặt hàng.',
      ],
    ],
    points: [
      ['送信票', 'そうしんひょう', 'phiếu gửi fax (trang bìa)'],
      ['御中', 'おんちゅう', 'kính gửi (công ty, phòng ban)'],
      ['赤字', 'あかじ', 'chữ đỏ (chỗ sửa)'],
    ],
  }),
  item('mock1', 'shiryo', 10, {
    material: {
      kind: 'text',
      title: '交通費精算のルール',
      body: '交通費精算のルール\n\n・公共交通機関の利用を原則とする。\n・タクシーは、深夜（22時以降）の移動、または重い荷物がある場合に限り認める。\n・領収書のない精算は認めない。',
    },
    script: [['女', '昨日の展示会の帰りに、サンプルの入った重い箱を三つ運んだので、タクシーを使いました。夜九時ごろでした。領収書はもらっています。', 'Hôm qua đi triển lãm về, tôi phải chở ba thùng nặng đựng hàng mẫu nên đã đi taxi. Khoảng chín giờ tối. Tôi có lấy hoá đơn.']],
    questions: [
      [
        'この人のタクシー代は精算できますか。',
        ['夜十時前なので、精算できない', '荷物があったので、精算できる', '領収書がないので、精算できない', '展示会なので、半額だけ精算できる'],
        1,
        'Quy định dùng または: sau 22 giờ HOẶC có hành lý nặng. Chín giờ tối không đủ điều kiện giờ, nhưng có ba thùng nặng nên vẫn được thanh toán. Hoá đơn thì có. Lựa chọn 1 là bẫy cho ai đọc thành "và".',
      ],
    ],
    points: [
      ['精算', 'せいさん', 'thanh toán, quyết toán (chi phí)'],
      ['公共交通機関', 'こうきょうこうつうきかん', 'phương tiện công cộng'],
      ['領収書', 'りょうしゅうしょ', 'hoá đơn, biên lai'],
    ],
  }),

  // ── 総合聴読解 ──
  item('mock1', 'sogo-chodokkai', 1, {
    material: {
      kind: 'table',
      title: '駅北口周辺の地図（上が北、空白は道路）',
      head: [],
      rows: [
        ['【1】', '公園', '', '郵便局', '【2】'],
        ['', '', '', '', ''],
        ['【3】', 'コンビニ', '', '銀行', '【4】'],
        ['', '', '', '', ''],
        ['交番', '花屋', '駅（北口）', '薬局', '書店'],
      ],
    },
    script: [
      ['女', 'もしもし、物流課の大野です。明日は朝九時から、棚卸しの手伝いをお願いすることになっていますよね。初めて第二倉庫に行くって聞いたので、行き方を説明しておきますね。', 'A lô, tôi là Ono ở bộ phận hậu cần. Ngày mai từ chín giờ sáng em sẽ giúp kiểm kê kho đúng không. Nghe nói em đến kho số hai lần đầu, nên tôi giải thích đường đi trước nhé.'],
      ['女', '駅は北口を出てください。南口から出ると、線路を渡るのにかなり遠回りになりますので。', 'Ở ga thì em ra cửa bắc. Ra cửa nam thì phải vòng khá xa mới qua được đường ray.'],
      ['女', '北口を出たら、目の前の道をまっすぐ北に進みます。で、一つ目の交差点を右に…あ、ごめんなさい、違いました。一つ目は渡って、そのまままっすぐです。渡ると、左手にコンビニ、右手に銀行があります。銀行の角は曲がらないでくださいね。倉庫の近くにはお店がないので、お昼を買うなら、このコンビニで買っておくといいですよ。', 'Ra cửa bắc thì đi thẳng con đường trước mặt về phía bắc. Rồi đến ngã tư thứ nhất thì rẽ phải… à, xin lỗi, tôi nói nhầm. Ngã tư thứ nhất thì đi qua, cứ đi thẳng. Qua đó thì bên trái có cửa hàng tiện lợi, bên phải có ngân hàng. Đừng rẽ ở góc ngân hàng nhé. Gần kho không có quán nào, nên muốn mua đồ ăn trưa thì mua sẵn ở cửa hàng tiện lợi đó.'],
      ['女', '二つ目の交差点まで来たら、右に曲がってください。左側に郵便局があって、その先の、灰色の三階建てが倉庫です。', 'Đến ngã tư thứ hai thì rẽ phải. Bên trái có bưu điện, toà nhà ba tầng màu xám ngay sau đó là kho.'],
      ['女', 'もし右手に公園が見えたら、反対に曲がっています。駅から歩いて十分ぐらいです。倉庫の前はトラックの出入りが多いので、気をつけてくださいね。', 'Nếu thấy công viên bên tay phải thì là em đã rẽ ngược hướng rồi. Từ ga đi bộ khoảng mười phút. Trước kho xe tải ra vào nhiều, em cẩn thận nhé.'],
      ['女', '入口が少しわかりにくいので、着いたら私の内線、二〇五に電話してください。じゃ、よろしくお願いします。', 'Lối vào hơi khó tìm, nên đến nơi thì em gọi số nội bộ của tôi, hai không năm. Vậy nhờ em nhé.'],
    ],
    questions: [
      [
        '第二倉庫はどこですか。',
        ['【1】', '【2】', '【3】', '【4】'],
        1,
        'Ra cửa bắc, đi qua ngã tư thứ nhất (không rẽ ở ngân hàng), đến ngã tư thứ hai rẽ phải (sang đông); bên trái là bưu điện, kho ở ngay sau đó → 【2】. 【4】 là chỗ sẽ tới nếu làm theo câu nói nhầm "ngã tư thứ nhất rẽ phải" (cạnh ngân hàng). 【1】 cạnh công viên là khi rẽ ngược hướng.',
      ],
    ],
    points: [
      ['遠回り', 'とおまわり', 'đi đường vòng'],
      ['交差点', 'こうさてん', 'ngã tư'],
      ['内線', 'ないせん', 'số điện thoại nội bộ'],
    ],
  }),
  item('mock1', 'sogo-chodokkai', 2, {
    material: {
      kind: 'table',
      title: '3階 事務所の配置図（上が窓側、空白は通路）',
      head: [],
      rows: [
        ['【1】', '総務課の机', '総務課の机', '【2】'],
        ['', '', '', ''],
        ['営業課の机', '営業課の机', '【3】', '会議室'],
        ['入口', '', '【4】', '給湯室'],
      ],
    },
    script: [
      ['男', '新しい複合機、来週届くんだけど、どこに置こうか。やっぱりみんなが通る入口の近くかな。', 'Máy in đa năng mới tuần sau sẽ tới, đặt ở đâu đây nhỉ. Có lẽ gần lối vào, chỗ mọi người hay đi qua?'],
      ['女', 'どのくらいの大きさなんですか。', 'Nó to cỡ nào ạ?'],
      ['男', '幅が一メートル近くあるから、今のコピー機より一回り大きいね。紙を補充するスペースも要るし。', 'Rộng gần một mét, to hơn máy photocopy hiện giờ một cỡ. Còn cần chỗ để bổ sung giấy nữa.'],
      ['女', '便利は便利なんですけど、入口の横だと、お客様からも印刷したものが見えてしまうんですよね。見積書なんかも出しますし。', 'Tiện thì tiện thật, nhưng ngay cạnh lối vào thì khách cũng nhìn thấy giấy in ra. Mình còn in cả bảng báo giá nữa.'],
      ['男', 'そうか。じゃあ、会議室の隣は？会議の前に資料を刷るのに便利だよ。', 'Ừ nhỉ. Vậy cạnh phòng họp thì sao? Trước cuộc họp in tài liệu cũng tiện.'],
      ['女', 'あそこは、会議中に音がうるさいって、前にも言われたことがあって…。', 'Chỗ đó thì trước đây đã có người phàn nàn là ồn trong lúc họp…'],
      ['男', 'なるほどね。窓側はどう？右の角なら、会議室からもすぐだし。', 'Ra vậy. Còn phía cửa sổ thì sao? Góc bên phải thì từ phòng họp sang cũng gần.'],
      ['女', '右の角は午後、日が強く当たるんです。機械には良くないと思います。反対の角なら日は当たりませんし、コンセントも近いですよ。', 'Góc phải buổi chiều nắng chiếu gắt lắm. Em nghĩ không tốt cho máy. Góc bên kia thì không bị nắng, ổ điện cũng gần.'],
      ['女', 'それに、総務の机のすぐ横ですから、紙の補充や紙詰まりも、私たちがすぐ対応できます。', 'Hơn nữa, chỗ đó ngay cạnh bàn của phòng tổng vụ, nên bổ sung giấy hay kẹt giấy thì bọn em xử lý ngay được.'],
      ['男', '会議室からは少し歩くけど、それくらいはいいか。じゃ、そこにしよう。業者さんには、コンセントの位置も伝えておいてね。', 'Từ phòng họp thì phải đi bộ một chút, nhưng chừng đó không sao. Vậy chọn chỗ đó. Nhớ báo cả vị trí ổ điện cho bên lắp đặt nhé.'],
    ],
    questions: [
      [
        '複合機はどこに置きますか。',
        ['【1】', '【2】', '【3】', '【4】'],
        0,
        'Cạnh lối vào (【4】) bị bác vì khách nhìn thấy giấy in; cạnh phòng họp (【3】) bị bác vì ồn; góc phải phía cửa sổ (【2】) bị nắng chiều. Còn "góc bên kia" phía cửa sổ, không nắng, gần ổ điện → 【1】. 【4】 là đề xuất đầu tiên của người đàn ông, đã bị bác.',
      ],
    ],
    points: [
      ['複合機', 'ふくごうき', 'máy in đa năng (in, photo, scan)'],
      ['見積書', 'みつもりしょ', 'bảng báo giá'],
      ['日が当たる', 'ひがあたる', 'bị nắng chiếu'],
    ],
  }),
  item('mock1', 'sogo-chodokkai', 3, {
    material: {
      kind: 'table',
      title: '中川課長の予定（2026年11月16日〜19日）',
      head: ['', '16日（月）', '17日（火）', '18日（水）', '19日（木）'],
      rows: [
        ['午前', '【1】空き', '社内研修', '【3】空き', '工場視察'],
        ['午後', '社内研修', '【2】来客（大森物産）', '外出', '【4】部内会議'],
      ],
    },
    script: [
      ['女', '課長、設計チームとの打ち合わせ、二時間ほど今週中にお願いしたいんですが、どこか空いていますか。', 'Thưa trưởng phòng, em muốn xin khoảng hai tiếng họp với nhóm thiết kế trong tuần này, anh có trống lúc nào không ạ?'],
      ['男', '何の打ち合わせ？', 'Họp về việc gì?'],
      ['女', '来月の展示会に出す新しい棚の図面を、一緒に確認していただきたくて。', 'Em muốn anh cùng xem bản vẽ cái kệ mới sẽ đưa ra triển lãm tháng sau.'],
      ['男', 'わかった。研修は抜けられないから、空いてるのは月曜と水曜の午前だね。', 'Được. Khoá đào tạo thì tôi không vắng được, nên tôi trống sáng thứ hai và sáng thứ tư.'],
      ['女', '月曜の午前は、設計の人たちが週の始めの会議で、だめなんだそうです。', 'Sáng thứ hai thì bên thiết kế có họp đầu tuần, nghe nói không được ạ.'],
      ['男', 'じゃあ水曜の午前か。', 'Vậy thì sáng thứ tư.'],
      ['女', 'はい、私もそう思って、設計の小林さんに聞いてみたんですが…。', 'Vâng, em cũng nghĩ vậy nên đã hỏi anh Kobayashi bên thiết kế, nhưng…'],
      ['女', 'それが、水曜は設計の部屋の工事で、図面を広げられる場所がないんです。図面を見ながらでないと、話が進まないので…。', 'Có điều thứ tư phòng thiết kế sửa chữa, không có chỗ trải bản vẽ ra. Mà không vừa nhìn bản vẽ thì không bàn được…'],
      ['男', '来週に延ばすのはだめなの？', 'Lùi sang tuần sau không được à?'],
      ['女', '展示会の業者さんに、来週の月曜までに図面を返さないといけないんです。', 'Em phải gửi lại bản vẽ cho bên làm gian triển lãm trước thứ hai tuần sau ạ.'],
      ['男', 'うーん。火曜のお客様は、先方の都合で決めてもらった日だから動かせないし。', 'Ừm. Khách hôm thứ ba là ngày do bên họ chọn, nên không dời được.'],
      ['女', '木曜の部内会議は、どうでしょうか。', 'Còn cuộc họp phòng hôm thứ năm thì sao ạ?'],
      ['男', 'あれは中の会議だから、金曜の朝にずらせると思う。部長に聞いてみるから、木曜の午後で設計に連絡しておいて。', 'Đó là họp nội bộ, chắc dời sang sáng thứ sáu được. Tôi sẽ hỏi trưởng bộ phận, em cứ báo bên thiết kế là chiều thứ năm nhé.'],
      ['女', 'ありがとうございます。会議室も、木曜の午後で押さえておきます。', 'Cảm ơn anh. Em sẽ giữ luôn phòng họp vào chiều thứ năm.'],
    ],
    questions: [
      [
        '打ち合わせは、予定表のどこに入りますか。',
        ['【1】', '【2】', '【3】', '【4】'],
        3,
        'Sáng thứ hai (【1】) bên thiết kế bận họp; sáng thứ tư (【3】) không có chỗ trải bản vẽ; khách thứ ba (【2】) không dời được. Cuộc họp phòng chiều thứ năm được dời sang sáng thứ sáu, nên buổi trao đổi vào 【4】. 【1】 và 【3】 là ô "trống" trên lịch nhưng đều bị loại.',
      ],
    ],
    points: [
      ['先方', 'せんぽう', 'phía bên kia, đối tác'],
      ['ずらす', 'ずらす', 'dời, lùi (lịch)'],
      ['図面', 'ずめん', 'bản vẽ'],
    ],
  }),
  item('mock1', 'sogo-chodokkai', 4, {
    material: {
      kind: 'text',
      title: '国際産業見本市 準備チェックリスト（12月2日〜4日）',
      body: '国際産業見本市 準備チェックリスト\n\n【1】配布用カタログ500部を印刷する\n【2】ブースの装飾業者に図面を送る\n【3】説明員のシフト表を作る\n【4】来場者に配るノベルティを発注する\n\n担当：販売促進課　石井',
    },
    script: [
      ['男', '石井さん、見本市まであと二週間だけど、準備はどこまで進んでる？', 'Chị Ishii, còn hai tuần nữa là đến hội chợ, chuẩn bị đến đâu rồi?'],
      ['女', 'はい、順番にご報告します。装飾の業者さんには、先週図面をお送りして、昨日、受け取ったという返事もいただきました。', 'Vâng. Bản vẽ em đã gửi cho bên trang trí tuần trước, hôm qua họ cũng trả lời là đã nhận.'],
      ['男', 'シフト表は？田村さんが急に出られなくなったって聞いたけど。', 'Còn bảng phân ca? Nghe nói anh Tamura đột nhiên không đi được.'],
      ['女', 'そうなんです。でも、代わりに森さんが入ってくれることになって、表はもう直して皆さんに送りました。森さんは去年も説明員をやっているので、製品のこともよくご存じです。', 'Đúng vậy ạ. Nhưng chị Mori đã nhận thay, và em đã sửa bảng rồi gửi cho mọi người. Chị Mori năm ngoái cũng làm người giới thiệu nên rất rành sản phẩm.'],
      ['男', 'そうか、それなら安心だ。カタログは？', 'Vậy à, thế thì yên tâm. Còn catalogue?'],
      ['女', '印刷会社にはお願いしてあるんですが、新製品の写真が一枚、まだ差し替わっていなくて。データが固まらないと刷れないと言われていまして…今日中に何とかします。', 'Em đã nhờ công ty in rồi, nhưng còn một tấm ảnh sản phẩm mới chưa thay. Họ nói dữ liệu chưa chốt thì không in được… Trong hôm nay em sẽ xoay xở.'],
      ['男', 'わかった。ノベルティは届くのが来週だっけ？', 'Được rồi. Quà tặng thì tuần sau mới tới phải không?'],
      ['女', 'はい、注文は先月済ませてありますので、来週の火曜に届きます。', 'Vâng, đơn đặt em đã làm xong từ tháng trước, thứ ba tuần sau sẽ tới.'],
      ['男', 'カタログが一番大事だからね。写真が決まらないようなら、前の写真のままでもいいから、とにかく間に合わせて。', 'Catalogue là quan trọng nhất đấy. Nếu chưa chốt được ảnh thì để ảnh cũ cũng được, miễn sao kịp.'],
      ['女', 'わかりました。広報にも確認してみます。', 'Vâng ạ. Em sẽ hỏi thêm bên truyền thông.'],
    ],
    questions: [
      [
        'チェックリストの中で、まだ終わっていないのはどれですか。',
        ['【1】', '【2】', '【3】', '【4】'],
        0,
        'Catalogue mới chỉ "đã nhờ" công ty in, còn một tấm ảnh chưa thay nên chưa in được → 【1】 chưa xong. Bản vẽ đã gửi (【2】), bảng phân ca đã sửa và gửi (【3】). 【4】 dễ nhầm vì hàng tuần sau mới tới, nhưng việc trong danh sách là "đặt hàng", và đơn đã đặt từ tháng trước.',
      ],
    ],
    points: [
      ['見本市', 'みほんいち', 'hội chợ thương mại'],
      ['ノベルティ', 'のべるてぃ', 'quà tặng quảng bá'],
      ['データが固まる', 'でーたがかたまる', 'dữ liệu được chốt'],
    ],
  }),
  item('mock1', 'sogo-chodokkai', 5, {
    material: {
      kind: 'text',
      title: 'メールの下書き',
      body: '株式会社ハヤシ精工\n購買部　木村様\n\nいつもお世話になっております。三和電材の中田です。【1】\nご注文いただいた部品（注文番号A-2207）の納品について、ご連絡いたします。【2】\n当初11月20日にお届けの予定でしたが、仕入れ先工場の設備故障により、11月27日となる見込みです。【3】\nなお、300個のうち100個は、予定どおり20日にお届けできます。【4】\n今後ともよろしくお願いいたします。',
    },
    script: [
      ['女', '課長、ハヤシ精工さんへの納期のメール、下書きを見ていただけますか。', 'Thưa trưởng phòng, anh xem giúp em bản nháp email gửi Hayashi Seiko về thời hạn giao hàng được không ạ?'],
      ['男', 'うん…。内容はいいんだけど、お詫びの一文がないね。納期が一週間も遅れると、木村さんも社内で説明しないといけないから、大変だと思うよ。', 'Ừ… Nội dung thì được, nhưng thiếu một câu xin lỗi. Trễ hạn giao cả một tuần thì anh Kimura cũng phải giải thích trong công ty, chắc vất vả lắm.'],
      ['女', '理由のところは、「設備故障」とそのまま書いてもいいでしょうか。', 'Chỗ lý do, em cứ ghi thẳng là "hỏng thiết bị" có được không ạ?'],
      ['男', 'うん、事実だから、ぼかさずに書いたほうがいい。問題は謝る場所だね。', 'Ừ, đó là sự thật, nên viết rõ ra thì hơn. Vấn đề là chỗ đặt lời xin lỗi.'],
      ['女', 'あ、はい。では、最初のご挨拶のすぐ後に、「このたびはご迷惑をおかけし…」と入れましょうか。', 'À vâng. Vậy em chèn câu "Lần này đã gây phiền phức…" ngay sau câu chào đầu thư nhé?'],
      ['男', 'いや、いきなり謝ると、何の話かわからないでしょう。何が、なぜ遅れるのかを書いて、そのすぐ後に謝ったほうがいい。', 'Không, xin lỗi ngay từ đầu thì người ta không biết chuyện gì. Nên viết cái gì trễ, vì sao trễ, rồi xin lỗi ngay sau đó.'],
      ['女', '一部は二十日にお届けできる、というところの後ではだめでしょうか。少しでも良いお知らせの後のほうが…。', 'Đặt sau đoạn "một phần vẫn giao được ngày 20" thì có được không ạ? Sau một tin tốt thì có lẽ…'],
      ['男', 'それだと、良い知らせで終わらなくなるからね。謝ってから、「なお」で良いほうを伝える。その順番でいこう。', 'Như thế thì thư không kết thúc bằng tin tốt nữa. Xin lỗi trước, rồi dùng "なお" báo phần tốt. Cứ theo thứ tự đó.'],
      ['女', 'わかりました。件名にも「納期変更のお詫び」と入れておきます。', 'Vâng ạ. Em sẽ ghi cả vào tiêu đề là "Xin lỗi về việc thay đổi thời hạn giao hàng".'],
      ['男', 'うん、それがいい。送る前に、もう一度見せてね。', 'Ừ, thế là tốt. Trước khi gửi cho tôi xem lại lần nữa nhé.'],
    ],
    questions: [
      [
        'お詫びの文は、どこに入れますか。',
        ['【1】', '【2】', '【3】', '【4】'],
        2,
        'Trưởng phòng muốn: viết cái gì trễ và vì sao (câu về ngày 20 → 27 do hỏng thiết bị), xin lỗi ngay sau đó, rồi mới "なお" báo tin tốt → 【3】. 【1】 là đề xuất đầu của người phụ nữ (ngay sau lời chào), bị bác vì chưa rõ chuyện gì. 【4】 cũng bị bác vì thư không còn kết thúc bằng tin tốt.',
      ],
    ],
    points: [
      ['お詫び', 'おわび', 'lời xin lỗi'],
      ['見込み', 'みこみ', 'dự kiến'],
      ['なお', 'なお', 'ngoài ra, thêm nữa (văn viết)'],
    ],
  }),
  item('mock1', 'sogo-chodokkai', 6, {
    material: {
      kind: 'table',
      title: '店頭 ノートパソコン・タブレット比較',
      head: ['', '機種', '重さ', '電池の持ち', '価格（税込）'],
      rows: [
        ['【1】', 'ノートPC A', '1.1kg', '8時間', '14万円'],
        ['【2】', 'ノートPC B', '1.6kg', '13時間', '12万円'],
        ['【3】', 'タブレット C', '0.6kg', '12時間', '9万円'],
        ['【4】', 'ノートPC D', '1.3kg', '16時間', '16万円'],
      ],
      note: 'Cは専用キーボード（別売り 1万5千円）をつけられます。',
    },
    script: [
      ['男', 'すみません、営業で外回りに使うパソコンを探しているんですが。', 'Xin lỗi, tôi đang tìm máy tính để dùng khi đi gặp khách bên ngoài.'],
      ['女', 'ありがとうございます。一日にどのくらいお使いになりますか。', 'Cảm ơn anh. Một ngày anh dùng khoảng bao lâu ạ?'],
      ['男', '朝から夕方まで、充電できないことが多いので、十時間はもってほしいですね。予算は会社の決まりで、十五万円までなんです。重さは、軽いに越したことはないですけど、多少なら我慢できます。', 'Từ sáng đến chiều thường không sạc được, nên tôi muốn pin chạy được mười tiếng. Ngân sách theo quy định công ty là tối đa mười lăm vạn yên. Còn trọng lượng thì nhẹ càng tốt, nhưng nặng một chút tôi cũng chịu được.'],
      ['女', 'それでしたら、こちらのタブレットはいかがでしょう。とても軽いので、持ち歩きが楽ですよ。', 'Vậy thì chiếc máy tính bảng này thế nào ạ? Rất nhẹ nên mang theo nhàn lắm.'],
      ['男', 'うーん、見積書をその場で作ることも多いので、キーボードがないのはちょっと…。', 'Ừm, tôi hay làm bảng báo giá ngay tại chỗ, nên không có bàn phím thì hơi…'],
      ['女', 'こちらは専用のキーボードをおつけできます。それでも予算の中に収まりますよ。それから、重さを気にされないのでしたら、もう一つ、こちらのノートも条件に合います。こちらの一番長くもつ機種は、予算を少し超えてしまいますので…。', 'Máy này gắn được bàn phím chuyên dụng. Gắn vào vẫn nằm trong ngân sách ạ. Ngoài ra nếu anh không ngại nặng, còn chiếc laptop này nữa cũng hợp điều kiện. Còn máy này pin lâu nhất thì hơi vượt ngân sách…'],
      ['男', 'なるほど。じゃあ、その二つで少し考えてみます。課長にも相談しないといけないので。', 'Ra vậy. Vậy tôi cân nhắc giữa hai cái đó. Tôi còn phải bàn với trưởng phòng nữa.'],
      ['女', 'かしこまりました。こちらの二つのカタログをお持ちください。', 'Vâng ạ. Mời anh cầm theo catalogue của hai máy này.'],
    ],
    questions: [
      [
        '店員が最後に勧めた二つは、どれとどれですか。',
        ['【1】と【2】', '【2】と【3】', '【2】と【4】', '【3】と【4】'],
        1,
        'Pin từ 10 tiếng trở lên loại A (【1】, 8 tiếng). Máy pin lâu nhất là D (【4】, 16 tiếng) nhưng 16 vạn, vượt ngân sách. Còn lại máy tính bảng C gắn bàn phím (9 vạn + 1,5 vạn = 10,5 vạn) và laptop B nặng hơn (12 vạn) → 【2】と【3】. Lựa chọn 3 (【2】と【4】) dễ nhầm vì D có pin tốt, nhưng nhân viên đã gạt D vì giá.',
      ],
    ],
    points: [
      ['外回り', 'そとまわり', 'đi làm việc bên ngoài (gặp khách)'],
      ['持ち歩く', 'もちあるく', 'mang theo người'],
      ['予算に収まる', 'よさんにおさまる', 'nằm trong ngân sách'],
    ],
  }),
  item('mock1', 'sogo-chodokkai', 7, {
    material: {
      kind: 'table',
      title: '5階 フロア図（上が北、空白は廊下）',
      head: [],
      rows: [
        ['【1】北階段', '会議室A', '会議室B', '給湯室'],
        ['', '', '', ''],
        ['倉庫', '執務室', '執務室', '【2】東階段'],
        ['【3】西階段', '【4】エレベーター', '受付', 'トイレ'],
      ],
    },
    script: [
      ['男', '総務課からお知らせします。本日午後二時から、避難訓練を行います。訓練の開始は館内放送でお知らせしますので、放送が流れたら、仕事の手を止めて、すぐに移動を始めてください。', 'Phòng tổng vụ xin thông báo. Từ hai giờ chiều nay sẽ diễn tập sơ tán. Thời điểm bắt đầu sẽ được thông báo qua loa toàn toà nhà; khi nghe thông báo, xin dừng tay và bắt đầu di chuyển ngay.'],
      ['男', '今回は、五階の給湯室から火が出たという想定です。給湯室に近い東階段は使えませんので、ご注意ください。また、エレベーターは、実際の火災のときと同じく使用できません。', 'Lần này giả định lửa bốc lên từ phòng pha trà tầng năm. Cầu thang phía đông gần phòng pha trà sẽ không dùng được, xin lưu ý. Thang máy cũng không được dùng, giống như khi cháy thật.'],
      ['男', 'なお、先週のお知らせでは、北階段は改修工事のため使えないとお伝えしましたが、工事が予定より早く終わりましたので、本日は使うことができます。', 'Ngoài ra, thông báo tuần trước nói cầu thang phía bắc đang sửa chữa nên không dùng được, nhưng công trình đã xong sớm hơn dự kiến, nên hôm nay có thể dùng.'],
      ['男', '階段が混み合わないよう、会議室にいる方は北階段を、執務室にいる方は西階段を使って、一階まで下りてください。ハンカチなどで口を覆い、姿勢を低くして移動しましょう。', 'Để cầu thang không bị dồn ứ, ai đang ở phòng họp thì dùng cầu thang phía bắc, ai ở khu làm việc thì dùng cầu thang phía tây, xuống đến tầng một. Hãy che miệng bằng khăn tay và cúi thấp người khi di chuyển.'],
      ['男', '下りたあとは、正面玄関を出て、向かいの駐車場に集まってください。来客中の方は、お客様をご案内しながら一緒に避難してください。各課の課長は人数を確認し、受付の係に報告をお願いします。', 'Xuống rồi thì ra cửa chính, tập trung ở bãi đỗ xe đối diện. Ai đang tiếp khách thì vừa hướng dẫn khách vừa cùng sơ tán. Trưởng phòng các phòng kiểm tra quân số và báo cho người phụ trách ở quầy lễ tân.'],
    ],
    questions: [
      [
        '執務室にいる人は、どこから避難しますか。',
        ['【1】', '【2】', '【3】', '【4】'],
        2,
        'Người ở khu làm việc (執務室) dùng cầu thang phía tây → 【3】. Cầu thang phía đông (【2】) gần nơi giả định cháy, thang máy (【4】) không được dùng. 【1】 cầu thang phía bắc đã dùng lại được, nhưng dành cho người ở phòng họp; ai nhớ thông báo tuần trước hoặc nghe nhầm đối tượng sẽ chọn sai.',
      ],
    ],
    points: [
      ['避難訓練', 'ひなんくんれん', 'diễn tập sơ tán'],
      ['想定', 'そうてい', 'giả định'],
      ['混み合う', 'こみあう', 'đông đúc, chen chúc'],
    ],
  }),
  item('mock1', 'sogo-chodokkai', 8, {
    material: {
      kind: 'table',
      title: '第一工場 1階の配置（空白は通路）',
      head: [],
      rows: [
        ['材料置き場', '【1】', '加工ライン', '【2】'],
        ['', '', '', ''],
        ['【3】', '組立ライン', '【4】', '出荷場'],
      ],
      note: '製品は 材料置き場 → 加工 → 組立 → 出荷場 の順に流れる。',
    },
    script: [
      ['男', '工場長、新しい検査装置の置き場所ですが、やはり組立と出荷場の間が一番だと思います。組み立てたものをそのまま検査して、すぐ出荷に回せますから。', 'Thưa xưởng trưởng, về chỗ đặt máy kiểm tra mới, tôi vẫn nghĩ giữa dây chuyền lắp ráp và khu xuất hàng là tốt nhất. Lắp xong là kiểm tra luôn, rồi chuyển ngay sang xuất hàng.'],
      ['女', '流れとしてはそうなんだけど、あの装置、二トン近くあるでしょう。あそこの床、下に配管が通っていて、重いものは置けないって聞いたことがあるのよ。', 'Về dòng chảy thì đúng vậy, nhưng cái máy đó nặng gần hai tấn đúng không. Tôi từng nghe nói sàn chỗ đó có đường ống chạy bên dưới, không đặt được đồ nặng.'],
      ['男', 'そうなんです。それで、加工ラインの隣はどうかとも考えたんですが、加工の機械は揺れが大きいので、検査の精度が落ちてしまうんです。', 'Đúng vậy ạ. Vì thế tôi cũng tính đến chỗ cạnh dây chuyền gia công, nhưng máy gia công rung mạnh, độ chính xác của việc kiểm tra sẽ giảm.'],
      ['女', 'じゃあ、組立の左側は？空いているし、床も丈夫よ。', 'Vậy bên trái dây chuyền lắp ráp thì sao? Đang trống, sàn cũng chắc.'],
      ['男', 'あそこだと、製品を一度戻して、また出荷場まで運ぶことになります。フォークリフトが作業者の通路を何度も横切るので、危ないかと…。', 'Chỗ đó thì sản phẩm phải mang ngược lại một lần rồi lại chở sang khu xuất hàng. Xe nâng sẽ cắt ngang lối đi của công nhân nhiều lần, e là nguy hiểm…'],
      ['女', 'そうね…。床の問題は、補強すれば何とかならないの？', 'Ừ nhỉ… Chuyện sàn thì gia cố có được không?'],
      ['男', '業者に確認したら、補強はできるそうです。ただ工事に四日かかるので、年末の休みの間にやるしかありません。', 'Tôi đã hỏi nhà thầu, họ nói gia cố được. Có điều thi công mất bốn ngày, nên chỉ có thể làm trong kỳ nghỉ cuối năm.'],
      ['女', 'それならラインも止めずに済むわね。安全と精度を考えたら、最初の案がいいわ。それで進めましょう。', 'Thế thì không phải dừng dây chuyền. Xét an toàn và độ chính xác thì phương án đầu là tốt. Cứ thế mà làm.'],
    ],
    questions: [
      [
        '検査装置はどこに置かれることになりましたか。',
        ['【1】', '【2】', '【3】', '【4】'],
        3,
        'Phương án đầu (giữa lắp ráp và xuất hàng, 【4】) lúc đầu vướng chuyện sàn có ống, nhưng gia cố được trong kỳ nghỉ cuối năm, nên cuối cùng chọn lại phương án đầu. Cạnh dây chuyền gia công (【1】, 【2】) bị loại vì rung; bên trái lắp ráp (【3】) sàn chắc nhưng bị loại vì xe nâng cắt ngang lối đi. 【3】 là đề xuất của xưởng trưởng, dễ bị chọn nhầm.',
      ],
    ],
    points: [
      ['精度', 'せいど', 'độ chính xác'],
      ['補強する', 'ほきょうする', 'gia cố'],
      ['横切る', 'よこぎる', 'cắt ngang'],
    ],
  }),
  item('mock1', 'sogo-chodokkai', 9, {
    material: {
      kind: 'table',
      title: '株主総会 当日の会場配置（2階）',
      head: [],
      rows: [
        ['【1】', '会場入口', '【2】'],
        ['', '', ''],
        ['【3】', 'ロビー', '【4】'],
        ['エレベーター', '', '正面階段'],
      ],
    },
    script: [
      ['女', '新人の皆さん、来週の株主総会の当日の動きについて説明します。集合は朝八時、二階のロビーです。服装は、濃い色のスーツでお願いします。総会は十時開始で、受付は九時半に始めます。', 'Các bạn nhân viên mới, tôi giải thích việc phải làm trong ngày đại hội cổ đông tuần sau. Tập trung tám giờ sáng ở sảnh tầng hai. Trang phục là com-lê màu tối. Đại hội bắt đầu lúc mười giờ, quầy tiếp đón mở lúc chín rưỡi.'],
      ['女', '例年、新人の皆さんには、正面階段を上がったところで、株主様を会場までご案内してもらっていました。ですが、去年、ご高齢の株主様からのご質問にうまく答えられなかったことがありまして、今年はそこに経験のある社員を置くことにしました。', 'Mọi năm, nhân viên mới đứng ở chỗ vừa lên cầu thang chính để dẫn cổ đông vào hội trường. Nhưng năm ngoái có lần không trả lời được câu hỏi của một cổ đông lớn tuổi, nên năm nay chỗ đó sẽ do nhân viên có kinh nghiệm phụ trách.'],
      ['女', '会場入口の両側にある受付は、出席票をお預かりする場所で、総務課が担当します。', 'Hai quầy tiếp đón ở hai bên cửa hội trường là nơi nhận phiếu tham dự, phòng tổng vụ phụ trách.'],
      ['女', '皆さんには、エレベーターを降りてすぐのところで、コートやお荷物をお預かりする係をお願いします。番号札の渡し間違いがないよう、必ず二人一組で確認してください。お預かりするときは、貴重品が入っていないか、一言お尋ねするようにしてください。', 'Các bạn sẽ phụ trách giữ áo khoác và hành lý ở ngay chỗ ra khỏi thang máy. Để không đưa nhầm thẻ số, nhất định phải làm theo cặp hai người để kiểm tra. Khi nhận đồ, nhớ hỏi một câu xem bên trong có đồ quý giá không.'],
      ['女', '何かわからないことを聞かれたら、自分で答えずに、近くの総務課の者に伝えてください。終わったら片付けをして、十二時半に解散の予定です。お昼のお弁当は控室に用意してあります。', 'Nếu bị hỏi điều gì không rõ, đừng tự trả lời mà hãy báo cho người của phòng tổng vụ ở gần đó. Xong việc thì dọn dẹp, dự kiến giải tán lúc mười hai rưỡi. Cơm hộp buổi trưa đã chuẩn bị sẵn ở phòng chờ.'],
    ],
    questions: [
      [
        '新人が担当するのは、どこですか。',
        ['【1】', '【2】', '【3】', '【4】'],
        2,
        'Nhân viên mới giữ áo khoác, hành lý "ngay chỗ ra khỏi thang máy" → 【3】 (cạnh thang máy). 【4】 cạnh cầu thang chính là chỗ nhân viên mới đứng mọi năm, năm nay giao cho người có kinh nghiệm. 【1】 và 【2】 hai bên cửa hội trường do phòng tổng vụ phụ trách.',
      ],
    ],
    points: [
      ['株主総会', 'かぶぬしそうかい', 'đại hội cổ đông'],
      ['出席票', 'しゅっせきひょう', 'phiếu tham dự'],
      ['二人一組', 'ふたりひとくみ', 'theo cặp hai người'],
    ],
  }),
  item('mock1', 'sogo-chodokkai', 10, {
    material: {
      kind: 'text',
      title: '営業会議 議事録（下書き）',
      body: '営業会議 議事録\n日時：2026年11月10日（火）14:00〜15:30\n\n【1】出席者：山本部長、中川課長、佐藤、林（記録）\n【2】決定事項：新商品「さらり」の発売日を2027年2月1日（月）とする。\n【3】宿題：中川課長が、販促費の見積もりを次回までに提出する。\n【4】次回会議：11月24日（火）10:00〜',
    },
    script: [
      ['女', '課長、昨日の会議の議事録です。皆さんに送る前に、確認していただけますか。', 'Thưa trưởng phòng, đây là biên bản cuộc họp hôm qua. Trước khi gửi cho mọi người, anh kiểm tra giúp em được không ạ?'],
      ['男', 'ああ、林さん、ありがとう。早いね。どれどれ。出席者…部長は途中からいらっしゃったけど、まあ出席は出席だね。これでいいよ。', 'À, cảm ơn chị Hayashi. Nhanh thật. Để xem nào. Người tham dự… trưởng bộ phận đến giữa chừng, nhưng thôi, có mặt thì vẫn tính là có mặt. Thế này được.'],
      ['女', '発売日なんですが、途中で三月一日という案も出ていたので、どちらを書くか迷いまして。', 'Về ngày bán, giữa chừng có ý kiến ngày một tháng ba, nên em phân vân không biết ghi ngày nào.'],
      ['男', '三月案は、工場の生産が間に合うってわかって、取り下げになったでしょう。最後に部長が二月で決めたから、これで合ってる。', 'Phương án tháng ba đã rút lại khi biết nhà máy sản xuất kịp mà. Cuối cùng trưởng bộ phận đã chốt tháng hai, nên thế này là đúng.'],
      ['女', '見積もりは、佐藤さんが作るという話もありましたけど…。', 'Còn bảng dự toán, cũng có ý kiến là anh Sato làm…'],
      ['男', '佐藤さんには手伝ってもらうけど、出すのは私の名前だから、このままでいい。', 'Anh Sato sẽ giúp, nhưng nộp dưới tên tôi, nên cứ để vậy.'],
      ['女', '締め切りの日付も書いたほうがいいでしょうか。', 'Có nên ghi cả ngày hạn chót không ạ?'],
      ['男', '「次回までに」で、みんなわかってるから、いいよ。それより…', 'Ghi "trước lần họp sau" là mọi người hiểu rồi, không cần. Quan trọng hơn là…'],
      ['男', 'あ、ここだ。会議の終わりに、部長の出張が入って、次回は一日後ろにずらしたじゃない。曜日も一緒に直しておいて。', 'À, đây rồi. Cuối buổi họp, trưởng bộ phận có lịch công tác, nên lần họp sau lùi một ngày còn gì. Sửa cả thứ trong tuần luôn nhé.'],
      ['女', 'あ、そうでした。すぐ直します。', 'À, đúng rồi ạ. Em sửa ngay.'],
      ['男', 'それ以外は、よく書けてるよ。直したら、そのまま皆さんに送っていいから。', 'Ngoài chỗ đó ra thì viết tốt lắm. Sửa xong thì cứ thế gửi cho mọi người.'],
    ],
    questions: [
      [
        '議事録で、直さなければならないのはどこですか。',
        ['【1】', '【2】', '【3】', '【4】'],
        3,
        'Lần họp sau đã lùi một ngày (24/11 thứ ba → 25/11 thứ tư) nên 【4】 phải sửa. 【1】: trưởng bộ phận đến muộn nhưng vẫn tính có mặt. 【2】: phương án 1/3 đã rút, ngày 1/2 là đúng. 【3】: anh Sato chỉ giúp, người nộp vẫn là trưởng phòng Nakagawa. Mỗi mục đều có một ý kiến khác được nhắc tới để gây nhầm.',
      ],
    ],
    points: [
      ['議事録', 'ぎじろく', 'biên bản cuộc họp'],
      ['取り下げる', 'とりさげる', 'rút lại (đề xuất)'],
      ['販促費', 'はんそくひ', 'chi phí xúc tiến bán hàng'],
    ],
  }),
];

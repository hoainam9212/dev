import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/** Week 6 — internal documents and notices (reading). Level: J1. */
export const W06: BjtItem[] = [
  item('w06', 'goi', 1, {
    questions: [
      [
        '本規程は、来年4月1日より＿＿＿する。',
        ['執行', '施行', '発行', '履行'],
        1,
        'Quy định, luật bắt đầu có hiệu lực là 施行する (câu 2), câu cố định ở cuối văn bản quy định. Câu 1 執行 dễ nhầm vì cũng là "thi hành", nhưng dùng cho bản án, ngân sách, nghiệp vụ (予算を執行する). 発行 là phát hành giấy tờ, 履行 là thực hiện nghĩa vụ hợp đồng.',
      ],
    ],
    points: [
      ['施行する', 'しこうする', 'đưa vào thi hành (quy định)'],
      ['規程', 'きてい', 'quy định nội bộ'],
      ['履行する', 'りこうする', 'thực hiện (nghĩa vụ)'],
    ],
  }),
  item('w06', 'goi', 2, {
    questions: [
      [
        '申請書に不備があったため、経理部から書類が＿＿＿きた。',
        ['差し戻して', '差し戻されて', '差し出して', '差し込んで'],
        1,
        'Chủ ngữ là 書類が, hồ sơ bị phòng kế toán trả lại, nên cần thể bị động 差し戻されてきた (câu 2). Câu 1 dễ nhầm vì đúng động từ, nhưng thể chủ động cần chủ ngữ là phòng kế toán và tân ngữ 書類を (経理部が書類を差し戻してきた). 差し出す = nộp, đưa ra; 差し込む = cắm vào.',
      ],
    ],
    points: [
      ['差し戻す', 'さしもどす', 'trả lại (hồ sơ để sửa)'],
      ['不備', 'ふび', 'thiếu sót (giấy tờ)'],
    ],
  }),
  item('w06', 'goi', 3, {
    questions: [
      [
        '個人情報を含む書類の社外への持ち出しは、＿＿＿禁止とする。',
        ['原則として', '概して', 'おおむね', '一概に'],
        0,
        'Văn bản quy định nói "về nguyên tắc cấm" (còn chừa ngoại lệ) bằng 原則として (câu 1). Câu 3 おおむね dễ nhầm vì cũng có nghĩa "đại thể", nhưng dùng để mô tả mức độ (おおむね良好), không dùng cho một điều cấm. 概して = nhìn chung (nhận xét). 一概に phải đi với phủ định (一概には言えない).',
      ],
    ],
    points: [
      ['持ち出し', 'もちだし', 'mang ra ngoài'],
      ['一概に', 'いちがいに', 'một cách vơ đũa (đi với phủ định)'],
    ],
  }),
  item('w06', 'goi', 4, {
    questions: [
      [
        '変更点の詳細につきましては、別紙をご＿＿＿ください。',
        ['拝見', '拝読', '参考', '参照'],
        3,
        'Nhờ người đọc xem tài liệu kèm theo là ご参照ください (câu 4). Câu 1 và 2 là khiêm nhường ngữ cho hành động của chính mình (拝見します, 拝読しました), dùng với ご～ください là sai chiều kính ngữ. Câu 3 dễ nhầm vì nghĩa gần, nhưng 参考 không làm động từ kiểu này; phải nói ご参考までに hoặc ご参考になさってください.',
      ],
    ],
    points: [
      ['別紙', 'べっし', 'tài liệu đính kèm riêng'],
      ['参照する', 'さんしょうする', 'tham chiếu, xem'],
    ],
  }),
  item('w06', 'goi', 5, {
    questions: [
      [
        '出張旅費の精算は、帰着後1週間以内に行うこと。期限を過ぎた＿＿＿、精算を受け付けないことがある。',
        ['場合には', 'ところで', '末に', 'ものなら'],
        0,
        'Câu quy định nêu điều kiện: nếu quá hạn thì có thể không nhận → 場合には (câu 1). Câu 4 dễ nhầm vì cũng là điều kiện, nhưng ～ものなら đi với thể ý chí và hậu quả nặng (遅れようものなら), không hợp với văn bản quy định. ところで (dù có… cũng) cần vế sau là kết quả vô ích; 末に = sau một quá trình dài.',
      ],
    ],
    points: [
      ['精算', 'せいさん', 'quyết toán (chi phí)'],
      ['帰着', 'きちゃく', 'về tới nơi'],
    ],
  }),
  item('w06', 'goi', 6, {
    questions: [
      [
        '新しい勤怠管理システムへの＿＿＿に伴い、従来の紙の出勤簿は廃止します。',
        ['移転', '推移', '移行', '移動'],
        2,
        'Chuyển từ hệ thống, chế độ cũ sang cái mới là 移行 (câu 3). Câu 1 移転 dễ nhầm vì cùng chữ 移, nhưng là chuyển địa điểm (本社の移転). 推移 là diễn biến theo thời gian; 移動 là di chuyển vật hay người.',
      ],
    ],
    points: [
      ['移行', 'いこう', 'chuyển sang (chế độ mới)'],
      ['勤怠管理', 'きんたいかんり', 'quản lý chấm công'],
      ['に伴い', 'にともない', 'cùng với, kéo theo'],
    ],
  }),
  item('w06', 'hyogen', 1, {
    material: {
      kind: 'text',
      title: '会議室の予約ルールについて',
      body: '社員各位\n\n会議室の予約は、利用日の2週間前から受け付けます。\nなお、定例会議については、所属長の承認を得れば3か月先まで予約することができます。\n予約したものの使わなくなった場合は、前日までに取り消してください。当日の無断キャンセルが月に3回に達した部署は、翌月の予約を制限させていただきます。\n\n総務部',
    },
    questions: [
      [
        'この通知の内容に合うものはどれですか。',
        ['会議室は、どの会議でも3か月先まで予約できる', '定例会議は、所属長の承認があれば3か月先まで予約できる', '予約を取り消すときは、所属長の承認が必要だ', '無断キャンセルを一度でもした部署は、翌月は予約できない'],
        1,
        'Câu sau なお là trường hợp đặc biệt: họp định kỳ, có trưởng bộ phận duyệt thì đặt trước tới 3 tháng → câu 2. Câu 1 dễ nhầm vì có con số 3か月, nhưng bỏ mất điều kiện "họp định kỳ" và "được duyệt"; họp thường chỉ đặt trước 2 tuần. Câu 4 sai số lần: phải tới 3 lần trong tháng mới bị hạn chế.',
      ],
    ],
    points: [
      ['所属長', 'しょぞくちょう', 'trưởng bộ phận mình thuộc'],
      ['定例会議', 'ていれいかいぎ', 'họp định kỳ'],
      ['無断', 'むだん', 'không báo trước, tự ý'],
    ],
  }),
  item('w06', 'hyogen', 2, {
    material: {
      kind: 'text',
      title: '【必須】パスワード変更のお願い',
      body: '全社員の皆様\n\n情報セキュリティ強化のため、社内システムのパスワードを11月30日（月）までに変更してください。\n期限までに変更されなかったアカウントは、12月1日以降ログインできなくなります。その場合は、情報システム部（内線3300）までご連絡いただければ、仮パスワードを発行します。\nなお、本メールに記載した手順以外の方法でパスワードの変更を求めるメールは、すべて不審なメールです。開かずに削除してください。\n\n情報システム部',
    },
    questions: [
      [
        '期限までにパスワードを変更しなかった人は、どうなりますか。',
        ['アカウントが削除される', '情報システム部から、仮パスワードが自動的に送られてくる', 'ログインできなくなるが、情報システム部に連絡すれば仮パスワードがもらえる', '12月1日に、パスワードが自動的に変更される'],
        2,
        'Quá hạn thì từ 1/12 không đăng nhập được; liên lạc phòng hệ thống (ご連絡いただければ) thì được cấp mật khẩu tạm → câu 3. Câu 2 dễ nhầm vì đúng là có mật khẩu tạm, nhưng chỉ khi tự mình liên lạc, không gửi tự động. Thư không nói xoá tài khoản.',
      ],
    ],
    points: [
      ['仮パスワード', 'かりぱすわーど', 'mật khẩu tạm'],
      ['発行する', 'はっこうする', 'cấp, phát hành'],
      ['不審な', 'ふしんな', 'đáng ngờ'],
    ],
  }),
  item('w06', 'hyogen', 3, {
    material: {
      kind: 'text',
      title: '来客用駐車場の利用について',
      body: '社員各位\n\n本社の来客用駐車場（3台分）は、お客様専用です。利用する場合は、前日までに総務部の予約システムで登録してください。\n社員の私用車の駐車は、理由を問わずお断りしています。\nただし、展示品や大型のサンプルなど重い荷物の搬入・搬出がある場合は、総務部の許可を得れば、1時間以内に限り社用車・私用車とも利用できます。\n\n総務部',
    },
    questions: [
      [
        '社員が大きなサンプルの箱を運び込むため、自分の車で来る場合、どうすればいいですか。',
        ['総務部の許可を得て、1時間以内なら駐車できる', '前日までに予約システムで登録すれば、時間の制限なく駐車できる', '私用車なので、どんな理由でも駐車できない', '社用車に乗り換えれば、許可なく駐車できる'],
        0,
        'Ngoại lệ sau ただし: chở hàng nặng ra vào, có phép của phòng tổng vụ thì đỗ được trong vòng 1 giờ, cả xe công ty lẫn xe riêng → câu 1. Câu 3 dễ nhầm vì câu trước nói 理由を問わずお断り, nhưng ngoại lệ ngay sau đó áp dụng cho trường hợp này. Câu 2 là thủ tục dành cho khách.',
      ],
    ],
    points: [
      ['搬入', 'はんにゅう', 'chuyển hàng vào'],
      ['理由を問わず', 'りゆうをとわず', 'bất kể lý do'],
      ['に限り', 'にかぎり', 'chỉ trong trường hợp'],
    ],
  }),
  item('w06', 'sogo-dokkai', 1, {
    material: {
      kind: 'text',
      title: '業務用スマートフォンの貸与基準の変更について',
      body: '社員各位\n\n1月1日より、業務用スマートフォンの貸与基準を下記のとおり変更します。\n\n1．貸与対象：現行の「営業職のみ」から、「月に4日以上社外で業務を行う社員」に広げます。新たに対象となる方は、12月11日（金）までに所属長を通じて申請してください。\n2．私用のスマートフォンを業務に使用している方への手当（月額1,500円）は、12月分の支給をもって廃止します。ただし、貸与の対象とならない方で、業務上やむを得ず私用端末を使う場合は、所属長の承認があれば引き続き支給します。\n3．端末を紛失した場合は、時間帯を問わず、ただちに情報システム部の緊急窓口（内線9999）へ連絡してください。翌営業日の報告では対応が間に合いません。\n\n総務部・情報システム部',
    },
    questions: [
      [
        '月に6日ほど社外で業務を行う経理部の社員について、正しいものはどれですか。',
        ['営業職ではないため、貸与の対象にならない', '手続きをしなくても、1月から自動的に貸与される', '12月11日までに所属長を通して申請すれば、貸与を受けられる', '私用スマートフォンの手当を、今後も受け取り続けられる'],
        2,
        'Từ 1/1, đối tượng mở rộng ra người làm việc bên ngoài từ 4 ngày/tháng; 6 ngày là đủ. Người mới thuộc diện phải xin qua trưởng bộ phận trước 11/12 → câu 3. Câu 1 dễ nhầm vì đó là quy định hiện hành (営業職のみ), đã bị thay. Câu 4 sai vì phụ cấp chỉ tiếp tục cho người KHÔNG thuộc diện được cấp máy.',
      ],
      [
        '本文の内容と合うものはどれですか。',
        ['夜間に端末をなくした場合も、すぐに緊急窓口へ連絡する', '私用スマートフォンの手当は、1月から全社員について廃止される', '端末をなくした場合は、翌営業日に報告すればよい', '手当は、12月分から支給されなくなる'],
        0,
        '時間帯を問わず、ただちに = bất kể giờ nào, phải báo ngay → câu 1. Câu 2 dễ nhầm, nhưng bỏ qua ngoại lệ sau ただし (người không được cấp máy, có duyệt thì vẫn nhận). Câu 4 sai mốc: 12月分の支給をもって廃止 nghĩa là tháng 12 vẫn được trả, đó là lần cuối.',
      ],
    ],
    points: [
      ['貸与', 'たいよ', 'cho mượn (đồ của công ty)'],
      ['をもって', 'をもって', 'lấy… làm mốc (kết thúc)'],
      ['やむを得ず', 'やむをえず', 'bất đắc dĩ'],
      ['時間帯を問わず', 'じかんたいをとわず', 'bất kể giờ nào'],
    ],
  }),
  item('w06', 'sogo-dokkai', 2, {
    material: {
      kind: 'text',
      title: 'ペーパーレス化推進プロジェクト 中間報告',
      body: '本プロジェクトは、今年4月から来年3月までに、社内の紙の使用量を前年度比で半減させることを目標としている。9月末時点の削減率は、全社で28％であった。\n部署別に見ると、営業部は契約書の電子化が進み、41％減と最も大きく削減した。一方、経理部は取引先から紙の請求書が届くケースが多く、削減率は9％にとどまっている。\nそこで下期は、経理部に、受け取った紙の請求書をまとめてスキャンする専任担当を一名置く。また、取引先には電子請求書への切り替えを個別にお願いしていく。ただし、切り替えはあくまで先方の任意であり、強制するものではない。\nなお、紙の使用量はこれまで各部署の自己申告によって集計してきたが、10月からは複合機の印刷記録をもとに算出する方式に改める。このため、上期と下期の数値は単純には比較できない点に留意されたい。',
    },
    questions: [
      [
        '経理部の削減率が低い理由は何ですか。',
        ['契約書の電子化が進んでいないから', '取引先から紙の請求書が多く届くから', 'スキャンの専任担当がいないから', '自己申告による集計が不正確だったから'],
        1,
        'Bài nói rõ nguyên nhân: 取引先から紙の請求書が届くケースが多く → câu 2. Câu 3 dễ nhầm vì có nhắc người phụ trách scan, nhưng đó là biện pháp cho nửa cuối năm, không phải nguyên nhân. Hợp đồng điện tử là chuyện của phòng kinh doanh.',
      ],
      [
        '本文の内容と合うものはどれですか。',
        ['取引先に、電子請求書への切り替えを義務付ける', '上期と下期の削減率を比べることで、下期の対策の効果が測れる', '営業部は、すでに目標の削減率を達成している', '10月からは、複合機の印刷記録をもとに紙の使用量を集計する'],
        3,
        'Đoạn cuối: từ tháng 10 tính theo dữ liệu in của máy in đa năng thay cho tự khai → câu 4. Câu 2 dễ nhầm vì nghe hợp lý, nhưng bài lưu ý chính vì đổi cách tính nên 単純には比較できない. Câu 1 trái với 任意であり、強制するものではない. Câu 3: phòng kinh doanh giảm 41%, chưa tới mục tiêu 50%.',
      ],
    ],
    points: [
      ['半減', 'はんげん', 'giảm một nửa'],
      ['任意', 'にんい', 'tuỳ ý, tự nguyện'],
      ['専任', 'せんにん', 'chuyên trách'],
      ['留意する', 'りゅういする', 'lưu ý'],
    ],
  }),
];

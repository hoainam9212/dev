import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/** Week 14 — presentations and debate: speakers often say what they think without saying it. Level: J1, about a third J1+. */
export const W14: BjtItem[] = [
  item('w14', 'bamen', 1, {
    material: {
      kind: 'scene',
      vi: 'Phòng họp đang có buổi thuyết trình. Một người đứng cạnh màn chiếu, tay cầm bút trình chiếu, trên màn là biểu đồ cột. Sáu người ngồi nghe quanh bàn: hai người đang ghi chép vào sổ, một người ngồi hàng đầu đang giơ tay. Trên bàn của người nghe đã có sẵn tập tài liệu.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['発表者が資料を配っています。', '聞き手の一人が手を挙げています。', '発表者がスクリーンを片付けています。', '聞き手が全員メモを取っています。'],
        1,
        'Lựa chọn 2: một người nghe ở hàng đầu đang giơ tay (手を挙げる), thường là để hỏi. Lựa chọn 4 dễ chọn vì có người ghi chép, nhưng chỉ hai trong sáu người, không phải tất cả. Tài liệu đã nằm sẵn trên bàn, nên không ai đang phát.',
      ],
    ],
    points: [
      ['手を挙げる', 'てをあげる', 'giơ tay'],
      ['聞き手', 'ききて', 'người nghe'],
    ],
  }),
  item('w14', 'bamen', 2, {
    material: {
      kind: 'scene',
      vi: 'Phòng họp. Một người đàn ông đứng trước bảng trắng, tay cầm bút dạ đang viết; bảng được kẻ làm hai cột, đầu cột ghi 「メリット」 và 「デメリット」, cột trái đã có ba dòng. Bốn người khác ngồi quanh bàn nhìn lên bảng. Máy tính xách tay trên bàn đang gập lại, máy chiếu không bật.',
    },
    script: [['問い', 'この場面について、正しい説明はどれですか。', 'Câu nào mô tả đúng cảnh này?']],
    spokenChoices: true,
    questions: [
      [
        'この場面について、正しい説明はどれですか。',
        ['男性がホワイトボードに書き込んでいます。', '男性がホワイトボードの字を消しています。', 'パソコンの画面がスクリーンに映っています。', '全員が立って話し合っています。'],
        0,
        'Lựa chọn 1: người đàn ông đang cầm bút viết lên bảng (書き込む). Lựa chọn 2 cũng nói về bảng trắng và chính người đó, nhưng hành động sai: đang viết chứ không xoá. Máy tính gập, máy chiếu tắt; bốn người còn lại đang ngồi.',
      ],
    ],
    points: [
      ['書き込む', 'かきこむ', 'viết vào, ghi vào'],
      ['デメリット', 'でめりっと', 'nhược điểm'],
    ],
  }),
  item('w14', 'hatsugen', 1, {
    script: [['状況', '発表のあとの質疑応答で、手元にデータがなく、すぐには答えられない質問を受けました。何と言いますか。', 'Trong phần hỏi đáp sau bài thuyết trình, bạn nhận một câu hỏi không trả lời ngay được vì không có số liệu trong tay. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        [
          'ご質問ありがとうございます。それは今回の発表とは関係ございませんので、お答えいたしかねます。',
          'ご質問ありがとうございます。たしか三割ぐらいだったと思いますが、はっきりとは覚えておりません。',
          'ご質問ありがとうございます。正確な数字を確認のうえ、本日中にメールでご回答いたします。',
          'ご質問ありがとうございます。その点については、恐れ入りますがご自分でお調べいただけますか。',
        ],
        2,
        'Lựa chọn 3: cảm ơn, hẹn kiểm tra rồi trả lời trong ngày bằng email; không đoán bừa. Lựa chọn 2 dễ chọn vì có cố trả lời, nhưng đưa con số mơ hồ (たしか…と思いますが) trước người nghe là thiếu trách nhiệm. Lựa chọn 1 né câu hỏi, lựa chọn 4 đẩy việc cho người hỏi.',
      ],
    ],
    points: [
      ['質疑応答', 'しつぎおうとう', 'hỏi đáp'],
      ['手元', 'てもと', 'trong tay, bên mình'],
    ],
  }),
  item('w14', 'hatsugen', 2, {
    script: [['状況', '会議で同僚が新しい販促案を出しました。あなたは費用の面で賛成できませんが、相手の立場を考えて、やわらかく懸念を伝えたいです。何と言いますか。', 'Trong cuộc họp, đồng nghiệp đưa ra phương án khuyến mại mới. Bạn không tán thành được vì chi phí, nhưng muốn nêu băn khoăn một cách mềm mỏng, giữ thể diện cho người đó. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        [
          '面白い案だと思います。ただ、費用の面で少し気になる点がありまして、詳しく伺えますか。',
          '面白い案だと思います。ただ、この費用では絶対に失敗しますから、やめたほうがいいです。',
          '面白い案だと思います。費用のことはあとで考えるとして、すぐに進めてしまいましょう。',
          '面白い案だと思います。でも、私は最初から反対だと申し上げていたはずですよね。',
        ],
        0,
        'Lựa chọn 1: ghi nhận ý tưởng, nêu băn khoăn về chi phí dưới dạng câu hỏi (詳しく伺えますか), để người kia tự nhìn ra vấn đề. Lựa chọn 2 có nêu chi phí, nhưng phán thẳng "chắc chắn thất bại", trái với yêu cầu mềm mỏng. Lựa chọn 3 bỏ qua băn khoăn; lựa chọn 4 làm người kia mất mặt.',
      ],
    ],
    points: [
      ['懸念', 'けねん', 'mối lo ngại'],
      ['販促', 'はんそく', 'xúc tiến bán hàng, khuyến mại'],
    ],
  }),
  item('w14', 'hatsugen', 3, {
    script: [['状況', 'あなたは社内発表会の司会者です。発表者の持ち時間が残り三分になりました。発表者に伝えます。何と言いますか。', 'Bạn là người dẫn chương trình của buổi thuyết trình nội bộ. Thời gian của người thuyết trình còn ba phút. Bạn báo cho người đó. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        [
          '恐れ入りますが、残り三分となりましたので、まとめに入らせていただけますでしょうか。',
          '恐れ入りますが、お時間になりましたので、ここで発表を終わりにしてください。',
          '恐れ入りますが、残り三分となりましたので、もう少しゆっくりお話しいただけますか。',
          '恐れ入りますが、残り三分となりましたので、まとめに入っていただけますでしょうか。',
        ],
        3,
        'Lựa chọn 4: người tóm tắt là người thuyết trình, nên nhờ bằng ～ていただけますでしょうか. Lựa chọn 1 gần giống hệt, nhưng ～させていただく nghĩa là "cho phép tôi làm", tức người dẫn chương trình tự tóm tắt, sai chủ thể. Lựa chọn 2 sai sự thật (vẫn còn ba phút); lựa chọn 3 nhờ nói chậm lại, ngược với việc cần.',
      ],
    ],
    points: [
      ['持ち時間', 'もちじかん', 'thời gian được phân cho mỗi người'],
      ['まとめに入る', 'まとめにはいる', 'chuyển sang phần tổng kết'],
    ],
  }),
  item('w14', 'hatsugen', 4, {
    script: [['状況', '取引先でプレゼンをしている途中で、プロジェクターの映像が出なくなりました。印刷した資料はお客様の手元にあります。何と言いますか。', 'Đang thuyết trình ở công ty đối tác thì máy chiếu mất hình. Tài liệu in đã có trong tay khách. Bạn nói gì?']],
    spokenChoices: true,
    questions: [
      [
        '何と言いますか。',
        [
          '申し訳ございません。御社のプロジェクターが古いせいか、映像が出ないようです。',
          '申し訳ございません。直るまで、お手元の資料をご覧いただきながらご説明いたします。',
          '申し訳ございません。映像が出ませんので、本日のご説明は中止させていただきます。',
          '申し訳ございません。直るまで、皆様で少し休憩なさってもらってよろしいでしょうか。',
        ],
        1,
        'Lựa chọn 2: xin lỗi rồi tiếp tục bằng tài liệu in khách đang cầm, không để buổi họp gián đoạn. Lựa chọn 4 cũng là cách chờ sửa máy, nhưng 休憩なさってもらう trộn tôn kính ngữ với もらう, sai, và bắt khách phải đợi trong khi đã có tài liệu. Lựa chọn 1 đổ lỗi cho máy của khách; lựa chọn 3 phản ứng quá mức.',
      ],
    ],
    points: [
      ['映像', 'えいぞう', 'hình ảnh (trên màn hình)'],
      ['お手元の資料', 'おてもとのしりょう', 'tài liệu quý vị đang cầm'],
    ],
  }),
  item('w14', 'sogo-chokai', 1, {
    script: [
      ['司会', 'では、来年の産業展示会に出展するかどうか、ご意見をお願いします。まず、営業の木村さんから。', 'Bây giờ xin mời góp ý về việc có tham gia triển lãm công nghiệp năm sau hay không. Trước tiên là anh/chị Kimura bên kinh doanh.'],
      ['木村', 'はい。去年の展示会では名刺が五百枚ほど集まりましたが、実際に取引につながったのは十件ほどでした。費用は全部で六百万円かかっています。', 'Vâng. Ở triển lãm năm ngoái thu được khoảng năm trăm danh thiếp, nhưng thực sự thành giao dịch chỉ khoảng mười trường hợp. Tổng chi phí là sáu triệu yên.'],
      ['司会', 'オンライン商談会のほうはどうですか、野口さん。', 'Còn hội chợ giao thương trực tuyến thì sao, anh/chị Noguchi?'],
      ['野口', '費用は百万円程度で済みます。ただ、うちの製品は、手に取って触っていただいて初めて良さが伝わるものが多いので…。', 'Chi phí chỉ khoảng một triệu yên. Có điều sản phẩm bên mình phần lớn là loại phải cầm lên, sờ vào thì mới thấy cái hay…'],
      ['司会', '木村さんは、どうお考えですか。', 'Anh/chị Kimura nghĩ sao?'],
      ['木村', '数字だけ見れば…まあ、そういうことになりますよね。ただ、大手の取引先の決裁権のある方と直接お会いできる場は、展示会ぐらいしかないのも事実でして。', 'Nếu chỉ nhìn con số thì… ừm, đúng là sẽ thành như vậy. Có điều, nơi gặp trực tiếp được người có quyền quyết định của các đối tác lớn thì hầu như chỉ có triển lãm, đó cũng là sự thật.'],
      ['司会', 'では、ブースの規模を半分にして出展は続け、それとは別に、オンライン商談会も一度試してみる、ということでいかがでしょう。', 'Vậy ta thu nhỏ gian hàng còn một nửa và vẫn tiếp tục tham gia, riêng hội chợ trực tuyến cũng thử một lần, mọi người thấy sao?'],
      ['野口', '異存ありません。', 'Tôi không có ý kiến gì khác.'],
    ],
    questions: [
      [
        '木村さんの考えに最も近いのはどれですか。',
        ['展示会は費用に見合っているので、今のまま続けるべきだ', '数字では不利だが、大手の決裁者に会える展示会の価値は大きい', 'オンライン商談会のほうが成果が出ると考えている', '名刺の数を増やせば、展示会の成果は上がる'],
        1,
        'Lựa chọn 2: 数字だけ見れば…そういうことになりますよね là thừa nhận nói vòng: nhìn số thì triển lãm không có lợi (6 triệu yên cho khoảng 10 giao dịch). Nhưng sau ただ, Kimura nhấn mạnh giá trị gặp được người quyết định. Lựa chọn 1 dễ chọn vì Kimura muốn giữ triển lãm, nhưng không hề nói chi phí là xứng đáng.',
      ],
      [
        '会議の結論は何ですか。',
        ['展示会への出展をやめ、オンライン商談会に切り替える', '展示会には今までと同じ規模のブースで出展する', '展示会は規模を半分にして続け、商談会も試す', '商談会の結果を見てから、出展するかどうか決める'],
        2,
        'Lựa chọn 3: người chủ trì đề xuất thu nhỏ gian hàng còn một nửa nhưng vẫn tham gia, đồng thời thử hội chợ trực tuyến; Noguchi đáp 異存ありません (không phản đối). Lựa chọn 2 bỏ sót việc thu nhỏ quy mô.',
      ],
    ],
    points: [
      ['決裁権', 'けっさいけん', 'quyền phê duyệt, quyết định'],
      ['見合う', 'みあう', 'tương xứng'],
      ['異存ありません', 'いぞんありません', 'không có ý kiến phản đối'],
    ],
  }),
  item('w14', 'sogo-chokai', 2, {
    script: [
      ['男', '本日は、営業車の削減についてご提案します。現在、当社の営業車は四十台ありますが、昨年の稼働率を調べたところ、平均で五割程度でした。', 'Hôm nay tôi xin đề xuất về việc cắt giảm xe dùng cho kinh doanh. Hiện công ty có bốn mươi xe, nhưng khi tra tỷ lệ sử dụng năm ngoái thì trung bình chỉ khoảng năm mươi phần trăm.'],
      ['男', 'そこで、来年度から台数を二十五台に減らし、足りないときはカーシェアを利用することを提案します。これにより、年間でおよそ八百万円の経費削減が見込めます。', 'Vì vậy, tôi đề xuất từ năm tới giảm còn hai mươi lăm xe, khi thiếu thì dùng dịch vụ xe dùng chung. Nhờ đó dự kiến cắt giảm khoảng tám triệu yên chi phí mỗi năm.'],
      ['男', 'なお、地方の営業所は公共交通が不便ですので、今回の削減の対象からは外します。', 'Ngoài ra, các văn phòng ở địa phương giao thông công cộng bất tiện, nên không thuộc diện cắt giảm lần này.'],
      ['男', 'つきましては、皆様には各部署で本当に必要な台数を調べていただき、来週中にお知らせいただければと思います。', 'Vì vậy, mong các phòng xem lại số xe thực sự cần và cho tôi biết trong tuần sau.'],
    ],
    questions: [
      [
        '提案の内容と合っているのはどれですか。',
        ['営業車の台数は変えずに、稼働率を八割まで上げる', '地方を含むすべての営業所で営業車の台数を減らす', '営業車をすべてなくし、移動はカーシェアだけにする', '営業車を十五台減らし、不足分はカーシェアで補う'],
        3,
        'Lựa chọn 4: từ 40 xuống 25 xe là giảm 15 xe, lúc thiếu dùng xe chung. Lựa chọn 2 dễ chọn nếu bỏ qua câu sau なお: văn phòng địa phương không thuộc diện cắt giảm. Đề xuất không bỏ hết xe, cũng không nói tới mục tiêu tỷ lệ sử dụng.',
      ],
      [
        '発表者が聞き手に頼んでいることは何ですか。',
        ['各部署で必要な台数を調べて知らせること', '利用できるカーシェアの会社を探すこと', '地方の営業所の車を何台減らすか決めること', '部署ごとに経費の削減額を計算すること'],
        0,
        'Lựa chọn 1: câu cuối つきましては… nhờ các phòng tra số xe thực sự cần và báo lại trong tuần sau. Lựa chọn 4 dễ nhầm vì có con số tám triệu yên, nhưng đó là con số người thuyết trình đã tính sẵn.',
      ],
    ],
    points: [
      ['稼働率', 'かどうりつ', 'tỷ lệ vận hành, sử dụng'],
      ['経費削減', 'けいひさくげん', 'cắt giảm chi phí'],
      ['補う', 'おぎなう', 'bù vào'],
    ],
  }),
];

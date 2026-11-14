import type { BjtItem } from '@nihongo/shared';
import { item } from '../helpers';

/**
 * Full test 3 (week 15), 聴読解: 5 状況把握 + 10 資料聴読解 + 10 総合聴読解 questions = 25.
 * Mixes the themes of all 16 weeks, a little harder than mock2; about a third of the questions are J1+.
 * Calibrated 2026-11-14 (spec rules 1, 2, 3, 8, 9, 10): 状況把握 is a photo + printed topic choices,
 * 総合聴読解 is ten one-question items whose choices are the positions 【1】–【4】 on the material.
 */
export const MOCK3: BjtItem[] = [
  // ── 状況把握 ──
  item('mock3', 'jokyo', 1, {
    material: {
      kind: 'scene',
      vi: 'Góc văn phòng đặt máy fax. Một người phụ nữ cầm một tờ giấy, mặt lo lắng, nói với một người đàn ông đứng tuổi. Người đàn ông đang cúi nhìn màn hình nhỏ của máy fax, nơi hiện một danh sách số điện thoại.',
    },
    script: [
      ['女', '課長、これ、さっき送ったつもりだったんですけど、先方から届いていないってお電話がありまして。', 'Thưa trưởng phòng, cái này em tưởng đã gửi lúc nãy rồi, nhưng bên kia gọi điện nói chưa nhận được.'],
      ['男', '番号は合ってた？', 'Số có đúng không?'],
      ['女', 'それが、市外局番を押し忘れたみたいで…。どこかよその会社に行ってしまったかもしれません。', 'Chuyện là hình như em quên bấm mã vùng… Có khi nó đã tới một công ty nào khác rồi.'],
      ['男', '中身は何だったの？', 'Nội dung là gì?'],
      ['女', '見積もりです。金額も入っています。', 'Là bảng báo giá ạ. Có cả số tiền.'],
      ['男', 'それはまずいな。送信記録で、どこの番号に送ったか確かめて。相手がわかったら、事情を話して処分をお願いしよう。', 'Thế thì gay đấy. Em xem lịch sử gửi để biết đã gửi tới số nào. Biết là ai rồi thì giải thích và nhờ họ huỷ đi.'],
    ],
    questions: [
      [
        '二人は何について話していますか。',
        ['ファックスの紙詰まり', 'ファックスの誤送信', 'ファックスの送信記録', 'ファックスの買い替え'],
        1,
        'Quên bấm mã vùng nên bản fax có giá tiền có thể đã tới một công ty khác: chủ đề là fax gửi nhầm. Chữ 誤送信 không được nói. Lựa chọn 3 dùng lại chữ 送信記録 trong băng, nhưng xem lịch sử gửi chỉ là cách xử lý.',
      ],
    ],
    points: [
      ['市外局番', 'しがいきょくばん', 'mã vùng điện thoại'],
      ['送信記録', 'そうしんきろく', 'lịch sử gửi'],
      ['処分', 'しょぶん', 'huỷ, vứt bỏ'],
    ],
  }),
  item('mock3', 'jokyo', 2, {
    material: {
      kind: 'scene',
      vi: 'Bàn làm việc trong văn phòng. Một người phụ nữ ngồi trước máy tính đang mở trang trình chiếu có biểu đồ cột hai màu. Một người đàn ông đứng cạnh cầm bút đỏ và một xấp giấy in các trang trình chiếu, có vài chỗ khoanh đỏ.',
    },
    script: [
      ['男', '明日の発表だけど、このグラフ、去年と今年の色が逆になってない？', 'Bài trình bày ngày mai ấy, biểu đồ này có phải màu của năm ngoái và năm nay bị đảo ngược không?'],
      ['女', 'あ…本当ですね。すみません、すぐ直します。', 'À… đúng thật. Em xin lỗi, em sửa ngay.'],
      ['男', 'それと、最後の一枚。結論が二つ書いてあるけど、一つに絞ったほうが伝わると思うよ。', 'Còn trang cuối cùng. Có hai kết luận, nhưng tôi nghĩ chỉ giữ một cái thì người nghe dễ nắm hơn.'],
      ['女', 'どちらを残しましょうか。', 'Mình giữ cái nào ạ?'],
      ['男', 'お客様が一番気にしているのはコストだから、そっちだね。もう一つは、質問が出たら口で答えればいい。', 'Khách quan tâm nhất là chi phí, nên giữ cái đó. Cái còn lại thì nếu có câu hỏi, trả lời bằng lời là được.'],
    ],
    questions: [
      [
        '二人は何について話していますか。',
        ['発表資料の手直し', '発表資料の印刷', '発表資料のグラフ', '発表資料の枚数'],
        0,
        'Đổi lại màu của biểu đồ, rút hai kết luận còn một: hai người bàn việc sửa lại tài liệu trình bày. Chữ 手直し không được nói. Lựa chọn 3 dùng chữ グラフ nghe được trong băng, nhưng biểu đồ chỉ là một trong hai chỗ cần sửa. Lựa chọn 4 lấy từ "trang cuối cùng".',
      ],
    ],
    points: [
      ['絞る', 'しぼる', 'thu hẹp, chọn lọc'],
      ['結論', 'けつろん', 'kết luận'],
    ],
  }),
  item('mock3', 'jokyo', 3, {
    material: {
      kind: 'scene',
      vi: 'Một phòng tiệc trong khách sạn đang được chuẩn bị. Có sáu bàn tròn phủ khăn trắng. Một người phụ nữ cầm sơ đồ phòng và một xấp thẻ tên, một người đàn ông đứng cạnh chỉ về chiếc bàn ở phía trong cùng, gần sân khấu nhỏ.',
    },
    script: [
      ['女', '社長のお席は、やっぱり一番奥ですよね。', 'Chỗ của giám đốc thì chắc vẫn là trong cùng đúng không ạ.'],
      ['男', 'うん。それで、今回いらっしゃる取引先の会長が、社長の右隣ね。', 'Ừ. Rồi chủ tịch bên đối tác đến dự lần này ngồi bên phải giám đốc.'],
      ['女', 'ほかの取引先の方々は、同じ会社の方どうし、離したほうがいいでしょうか。', 'Còn khách của các đối tác khác, người cùng công ty có nên tách ra không ạ?'],
      ['男', 'いや、初めていらっしゃる方も多いから、知っている人の近くのほうが安心されるだろう。ただ、うちの社員は、各テーブルに一人ずつ入れてね。', 'Không, nhiều người lần đầu đến, ngồi gần người quen thì họ yên tâm hơn. Có điều, nhân viên mình thì mỗi bàn xếp một người nhé.'],
      ['女', 'わかりました。名札もその順番で並べておきます。', 'Vâng ạ. Em sẽ xếp thẻ tên theo đúng thứ tự đó.'],
    ],
    questions: [
      [
        '二人は何について話していますか。',
        ['懇親会の料理', '懇親会のテーブル数', '懇親会の取引先', '懇親会の席順'],
        3,
        'Giám đốc ngồi trong cùng, chủ tịch đối tác bên phải, khách cùng công ty ngồi gần nhau, mỗi bàn một nhân viên: chủ đề là thứ tự chỗ ngồi. Chữ 席順 không được nói. Lựa chọn 3 dùng chữ 取引先 trong băng, nhưng khách chỉ là đối tượng được xếp chỗ. Lựa chọn 2 lấy từ chữ テーブル.',
      ],
    ],
    points: [
      ['右隣', 'みぎどなり', 'ngay bên phải'],
      ['名札', 'なふだ', 'thẻ tên'],
      ['懇親会', 'こんしんかい', 'tiệc giao lưu'],
    ],
  }),
  item('mock3', 'jokyo', 4, {
    material: {
      kind: 'scene',
      vi: 'Phòng kiểm tra chất lượng trong nhà máy. Một người phụ nữ mặc áo blouse trắng cầm kính lúp soi một chi tiết kim loại có vết xước. Bên cạnh, một người đàn ông cầm máy tính bảng hiện biểu đồ đường đi lên.',
    },
    script: [
      ['男', 'この傷、先週から急に増えているんです。', 'Vết xước này tăng đột ngột từ tuần trước.'],
      ['女', '材料のロットが変わったのも、先週からよね。', 'Lô nguyên liệu cũng đổi từ tuần trước đúng không.'],
      ['男', 'はい。でも、同じ材料を使っている第二ラインでは、出ていないんです。', 'Vâng. Nhưng dây chuyền số hai dùng cùng nguyên liệu thì không bị.'],
      ['女', 'じゃあ、材料じゃなさそうね。第一ラインだけで、何か変えたことはない？', 'Vậy thì có vẻ không phải do nguyên liệu. Riêng dây chuyền số một có thay đổi gì không?'],
      ['男', 'そういえば、先週の月曜に、切断機の刃を新しいものに交換しました。', 'À, thứ hai tuần trước bên tôi đã thay lưỡi máy cắt mới.'],
      ['女', 'それね。取り付け方を、メーカーに確認してみて。', 'Chắc là nó. Anh hỏi lại nhà sản xuất cách lắp xem.'],
    ],
    questions: [
      [
        '二人は何について話していますか。',
        ['製品の材料の仕入れ先', '製品の検査の方法', '製品の不良の原因', '製品の出荷の時期'],
        2,
        'Vết xước tăng từ tuần trước, loại trừ nguyên liệu vì dây chuyền hai không bị, rồi nghi lưỡi máy cắt mới thay: hai người tìm nguyên nhân hàng lỗi. Chữ 不良 không được nói. Lựa chọn 1 dễ nhầm vì có nói tới nguyên liệu (材料), nhưng khả năng đó đã bị loại.',
      ],
    ],
    points: [
      ['ロット', 'ろっと', 'lô (sản xuất)'],
      ['切断機', 'せつだんき', 'máy cắt'],
      ['刃', 'は', 'lưỡi dao'],
    ],
  }),
  item('mock3', 'jokyo', 5, {
    material: {
      kind: 'scene',
      vi: 'Sảnh lễ tân của một công ty. Một người phụ nữ mặc vest, tay cầm túi xách, đứng trước quầy. Một nam nhân viên cúi đầu thật thấp trước bà, tay cầm cuốn sổ tay đang mở. Nữ lễ tân sau quầy đang cầm điện thoại.',
    },
    script: [
      ['男', '大変申し訳ございません。私の手帳には、来週の木曜日と書いてありまして…。', 'Thật vô cùng xin lỗi. Trong sổ tay của tôi lại ghi là thứ năm tuần sau…'],
      ['女', 'あら、メールでは、今日の三時とお約束したはずですが。', 'Ơ, trong email tôi nhớ là đã hẹn ba giờ hôm nay mà.'],
      ['男', '確認いたします。…大変失礼いたしました。メールには確かに今日と書いております。私の書き間違いでございます。', 'Để tôi kiểm tra… Thật thất lễ quá. Trong email đúng là ghi hôm nay. Là tôi ghi nhầm.'],
      ['女', 'いえいえ、お会いできれば大丈夫ですので。', 'Không sao đâu, gặp được là được rồi.'],
      ['男', 'ありがとうございます。担当の者がすぐに参りますので、応接室で少々お待ちいただけますでしょうか。', 'Cảm ơn chị. Người phụ trách sẽ tới ngay, phiền chị chờ một lát ở phòng tiếp khách được không ạ.'],
    ],
    questions: [
      [
        '二人は何について話していますか。',
        ['約束の日の思い違い', '約束の日のメール', '約束の日の担当者', '約束の日の待ち合わせ場所'],
        0,
        'Nhân viên ghi nhầm ngày hẹn vào sổ (thứ năm tuần sau), trong khi khách hẹn hôm nay: chủ đề là sự nhầm lẫn về ngày hẹn. Chữ 思い違い không được nói. Lựa chọn 2 dùng chữ メール trong băng, nhưng email chỉ là chỗ để kiểm tra lại. Lựa chọn 3 lấy từ "người phụ trách sẽ tới".',
      ],
    ],
    points: [
      ['書き間違い', 'かきまちがい', 'ghi nhầm'],
      ['応接室', 'おうせつしつ', 'phòng tiếp khách'],
    ],
  }),

  // ── 資料聴読解 ──
  item('mock3', 'shiryo', 1, {
    material: {
      kind: 'text',
      body: '　　　　　部長　様\n\n11月20日（金）14:10\n□ お電話がありました\n☑ 折り返しお電話をお願いします\n□ また電話するとのことです\n\n会社名・氏名：丸山商会　小野様\n用件：12月分の発注数を変更したい\n受けた人：中村',
    },
    script: [['男', 'これ、部長の机に置いておいたんだけど、まだご覧になっていないみたいなんだ。お戻りになったら、一言お伝えしてくれる？', 'Tờ này anh đã để trên bàn trưởng bộ phận, nhưng hình như ông ấy chưa xem. Khi ông ấy về, em nhắc giúp một tiếng nhé?']],
    questions: [
      [
        'この紙は何ですか。',
        ['注文書の控え', '会議のメモ', '来客の受付票', '電話の伝言メモ'],
        3,
        'Giấy ghi giờ, tên người gọi, ô đánh dấu "xin gọi lại", nội dung và "người nhận": đây là phiếu ghi lời nhắn điện thoại. Lựa chọn 1 dễ nhầm vì có chữ 発注数, nhưng đó là nội dung cuộc gọi, không phải đơn hàng. Lời nói chỉ nhờ nhắc trưởng bộ phận.',
      ],
    ],
    points: [
      ['折り返す', 'おりかえす', 'gọi lại'],
      ['伝言', 'でんごん', 'lời nhắn'],
      ['ご覧になる', 'ごらんになる', 'xem (tôn kính ngữ)'],
    ],
  }),
  item('mock3', 'shiryo', 2, {
    material: {
      kind: 'table',
      title: '物流コスト削減セミナー 参加費（1名）',
      head: ['申込時期', '会員', '非会員'],
      rows: [
        ['早期（11月30日まで）', '8,000円', '12,000円'],
        ['通常（12月1日以降）', '10,000円', '15,000円'],
      ],
      note: '同じ会社から3名以上お申し込みの場合、1名につき2,000円割引します。',
    },
    script: [['男', 'うちは会員ではないんですが、十二月に入ってから、三人で申し込むことになりました。', 'Công ty chúng tôi không phải hội viên, và đã quyết định đăng ký ba người sau khi sang tháng mười hai.']],
    questions: [
      [
        '参加費は合計でいくらになりますか。',
        ['36,000円', '39,000円', '45,000円', '30,000円'],
        1,
        'Không phải hội viên, đăng ký thường: 15.000 yên. Ba người nên mỗi người giảm 2.000 → 13.000 × 3 = 39.000 yên (lựa chọn 2). Lựa chọn 3 quên giảm giá. Lựa chọn 1 lấy giá đăng ký sớm 12.000 × 3. Lựa chọn 4 lấy giá sớm rồi còn trừ thêm giảm giá.',
      ],
    ],
    points: [
      ['早期', 'そうき', 'sớm, giai đoạn đầu'],
      ['割引', 'わりびき', 'giảm giá'],
    ],
  }),
  item('mock3', 'shiryo', 3, {
    material: {
      kind: 'bars',
      title: '新オフィスにほしい設備（社員アンケート・複数回答）',
      unit: '%',
      labels: ['集中ブース', 'カフェスペース', '仮眠室', '会議室の増設'],
      series: [{ name: '回答', values: [48, 35, 22, 41] }],
    },
    script: [['女', '最も希望が多かった設備は、来月から工事を始めます。二番目に多かったものは、予算の関係で来年度に回します。', 'Thiết bị được mong muốn nhiều nhất sẽ khởi công từ tháng sau. Thứ được chọn nhiều thứ hai thì do ngân sách nên dời sang năm sau.']],
    questions: [
      [
        '来年度に回されるのはどれですか。',
        ['集中ブース', 'カフェスペース', '仮眠室', '会議室の増設'],
        3,
        'Thứ tự: buồng làm việc tập trung 48%, tăng phòng họp 41%, khu cà phê 35%, phòng ngủ trưa 22%. Thứ hai là tăng phòng họp (lựa chọn 4). Lựa chọn 2 dễ nhầm vì nằm ở cột thứ hai của biểu đồ, nhưng chỉ đứng thứ ba về tỉ lệ.',
      ],
    ],
    points: [
      ['仮眠室', 'かみんしつ', 'phòng ngủ trưa'],
      ['回す', 'まわす', 'chuyển sang, dời sang'],
    ],
  }),
  item('mock3', 'shiryo', 4, {
    material: {
      kind: 'text',
      title: '棚卸しに伴う出荷停止のお知らせ',
      body: 'お取引先各位\n\n2026年12月28日（月）は、倉庫の棚卸しのため、終日出荷業務を停止いたします。\n通常、15時までのご注文は当日に、15時以降のご注文は翌営業日に出荷しております。\nなお、土曜日・日曜日は休業日です。\n\n株式会社みどり物流 営業課',
    },
    script: [['男', '取引先から、二十五日の金曜日、午後四時に注文が入ったんですが、いつ出荷できるか聞かれまして。', 'Đối tác đặt hàng lúc bốn giờ chiều thứ sáu ngày hai mươi lăm, và họ hỏi khi nào xuất hàng được.']],
    questions: [
      [
        'この注文はいつ出荷されますか。',
        ['12月29日', '12月25日', '12月26日', '12月28日'],
        0,
        'Đặt sau 15 giờ nên xuất vào ngày làm việc kế tiếp. 26 và 27 là thứ bảy, chủ nhật nghỉ; 28 (thứ hai) dừng xuất hàng vì kiểm kê → 29/12 (lựa chọn 1). Lựa chọn 4 là bẫy cho người chỉ tính ngày làm việc kế tiếp mà quên ngày kiểm kê.',
      ],
    ],
    points: [
      ['棚卸し', 'たなおろし', 'kiểm kê hàng tồn'],
      ['翌営業日', 'よくえいぎょうび', 'ngày làm việc kế tiếp'],
      ['終日', 'しゅうじつ', 'cả ngày'],
    ],
  }),
  item('mock3', 'shiryo', 5, {
    material: {
      kind: 'bars',
      title: '部署別 有給休暇の取得率（今年度上半期）',
      unit: '%',
      labels: ['営業部', '開発部', '総務部', '製造部'],
      series: [{ name: '取得率', values: [32, 41, 68, 55] }],
    },
    script: [['女', '来月の管理職会議で、この結果をお見せして、数字の低い部署の課長には、年度末までの計画を出していただくつもりです。', 'Ở cuộc họp cán bộ quản lý tháng sau, tôi định trình bày kết quả này, và đề nghị trưởng phòng của những phòng có con số thấp nộp kế hoạch đến cuối năm tài chính.']],
    questions: [
      [
        'この資料は、何のために使われますか。',
        ['残業時間を減らすため', '社員に休暇を取らせるため', '休暇の日数を見直すため', '新しく人を採用するため'],
        1,
        'Tài liệu là tỉ lệ dùng ngày phép có lương theo từng phòng, và người nói muốn phòng có tỉ lệ thấp lập kế hoạch: mục đích là thúc đẩy nhân viên nghỉ phép. Lựa chọn 3 dễ nhầm vì liên quan đến ngày phép, nhưng không ai bàn thay đổi số ngày phép. Lựa chọn 1 không có trên tài liệu.',
      ],
    ],
    points: [
      ['有給休暇', 'ゆうきゅうきゅうか', 'nghỉ phép có lương'],
      ['取得率', 'しゅとくりつ', 'tỉ lệ sử dụng (ngày phép)'],
      ['管理職', 'かんりしょく', 'cán bộ quản lý'],
    ],
  }),
  item('mock3', 'shiryo', 6, {
    material: {
      kind: 'table',
      title: '営業用ノートパソコン 候補',
      head: ['機種', '重さ', 'バッテリー', '価格（1台）'],
      rows: [
        ['A', '1.10kg', '9時間', '13万円'],
        ['B', '1.20kg', '12時間', '16万円'],
        ['C', '1.25kg', '11時間', '14万円'],
        ['D', '1.30kg', '14時間', '12万円'],
      ],
    },
    script: [['男', '営業が持ち歩くものなので、バッテリーは十時間以上もつものにしてください。予算は一台十五万円までです。条件に合うものの中で、一番軽い機種にしましょう。', 'Đây là máy nhân viên kinh doanh mang theo, nên chọn loại pin dùng được từ mười tiếng trở lên. Ngân sách tối đa mười lăm vạn yên một máy. Trong những máy đạt điều kiện, chọn máy nhẹ nhất.']],
    questions: [
      [
        'どの機種を選びますか。',
        ['A', 'B', 'C', 'D'],
        2,
        'Pin từ 10 tiếng: loại A. Tối đa 15 vạn: loại B. Còn C (1,25 kg) và D (1,30 kg), C nhẹ hơn → lựa chọn 3. Lựa chọn 1 nhẹ nhất trong bảng nhưng pin chỉ 9 tiếng; D rẻ nhất và pin lâu nhất nhưng điều kiện cuối là "nhẹ nhất".',
      ],
    ],
    points: [
      ['持ち歩く', 'もちあるく', 'mang theo người'],
      ['機種', 'きしゅ', 'mẫu máy'],
    ],
  }),
  item('mock3', 'shiryo', 7, {
    material: {
      kind: 'text',
      title: 'お支払い条件について',
      body: '請求書は、毎月末日締めとし、翌月末日にお支払いいたします。\nただし、請求書の到着が締め日の翌月10日を過ぎた場合は、翌々月末日のお支払いとなります。\n請求書は経理部 支払担当宛てにお送りください。\n\n株式会社北星工業 経理部',
    },
    script: [['女', '取引先の佐々木さんから、十月分の請求書がうちに届いたのは十一月十二日だったそうなんですが、支払いはいつになるか知りたいと言われまして。', 'Chị Sasaki bên đối tác nói hoá đơn tháng mười tới công ty mình ngày mười hai tháng mười một, và muốn biết khi nào được thanh toán.']],
    questions: [
      [
        '十月分の請求書の支払いはいつになりますか。',
        ['10月末日', '11月10日', '11月末日', '12月末日'],
        3,
        'Hoá đơn tháng 10 chốt cuối tháng 10. Bình thường trả cuối tháng 11, nhưng hoá đơn tới ngày 12/11, quá ngày 10 của tháng sau → trả cuối tháng kế tiếp nữa, tức cuối tháng 12 (lựa chọn 4). Lựa chọn 3 là bẫy cho người không để ý điều kiện sau ただし.',
      ],
    ],
    points: [
      ['締め日', 'しめび', 'ngày chốt sổ'],
      ['翌々月', 'よくよくげつ', 'tháng sau nữa'],
    ],
  }),
  item('mock3', 'shiryo', 8, {
    material: {
      kind: 'text',
      body: '拝啓　晩秋の候、貴社ますますご清栄のこととお慶び申し上げます。\nさて、弊社代表取締役社長　山田一郎は、11月30日をもちまして退任し、新たに副社長の川口直人が代表取締役社長に就任いたしました。\nなお、山田は引き続き相談役として弊社にとどまります。\n今後とも変わらぬご指導を賜りますよう、お願い申し上げます。\n敬具\n\n株式会社ヤマト精機',
    },
    script: [['男', 'ヤマト精機さんからこれが届いたから、来月の挨拶回りのリスト、これに合わせて直しておいてくれる？お名前を間違えたら大変だから。', 'Bên Yamato Seiki gửi tới cái này, em sửa danh sách đi chào hỏi tháng sau cho khớp với nó nhé. Nhầm tên thì nguy to.']],
    questions: [
      [
        'これは、何を知らせる手紙ですか。',
        ['会社の移転', '社長の交代', '社名の変更', '担当者の異動'],
        1,
        'Giám đốc Yamada thôi chức, phó giám đốc Kawaguchi lên làm giám đốc đại diện: thư báo thay đổi giám đốc. Lựa chọn 4 dễ nhầm vì người nói lo "nhầm tên" khi sửa danh sách, nhưng đổi người là ở cấp giám đốc, không phải người phụ trách giao dịch. Ý chính nằm sau さて.',
      ],
    ],
    points: [
      ['退任', 'たいにん', 'thôi giữ chức'],
      ['就任', 'しゅうにん', 'nhậm chức'],
      ['相談役', 'そうだんやく', 'cố vấn (chức danh)'],
    ],
  }),
  item('mock3', 'shiryo', 9, {
    material: {
      kind: 'text',
      title: '【回覧】年末年始の当番について',
      body: '【回覧】年末年始の当番について\n\n12月29日〜1月3日の間、各課1名が交代で、緊急連絡の当番をします。\n当番表は総務課前の掲示板に貼ってあります。\n\n読んだら印を押し、次の課へ回してください。\n営業課（　）→ 経理課（　）→ 開発課（　）→ 総務課（最後）',
    },
    script: [['女', 'うちの課は、みんな読み終わったから、山田さん、あとはお願いできる？最後は総務に戻ればいいから。', 'Phòng mình mọi người đọc xong cả rồi, anh Yamada lo phần còn lại được không? Cuối cùng nó về lại phòng tổng vụ là được.']],
    questions: [
      [
        'この書類は、何のために使われますか。',
        ['当番をしたい人を集めるため', '休暇の申請を受け付けるため', '内容を各課に順に知らせるため', '年末の予定を書いてもらうため'],
        2,
        'Tiêu đề 【回覧】 và dòng "đọc xong thì đóng dấu rồi chuyển sang phòng tiếp theo": đây là giấy chuyền tay để lần lượt báo cho từng phòng. Lựa chọn 1 dễ nhầm vì nội dung nói về trực, nhưng bảng phân trực đã dán sẵn, không phải tuyển người. Không có chỗ để viết lịch hay xin nghỉ.',
      ],
    ],
    points: [
      ['回覧', 'かいらん', 'văn bản chuyền tay'],
      ['当番', 'とうばん', 'người trực'],
      ['掲示板', 'けいじばん', 'bảng tin'],
    ],
  }),
  item('mock3', 'shiryo', 10, {
    material: {
      kind: 'bars',
      title: '会場別 来場者数と成約件数（製品説明会）',
      unit: '人・件',
      labels: ['東京', '大阪', '名古屋', '福岡'],
      series: [
        { name: '来場者数', values: [200, 150, 80, 60] },
        { name: '成約件数', values: [20, 18, 12, 6] },
      ],
    },
    script: [['男', '来年は、来場者に対する成約の割合が最も高かった会場で、説明会を年二回に増やします。', 'Năm sau, ở địa điểm có tỉ lệ chốt hợp đồng so với số khách tới cao nhất, buổi giới thiệu sẽ tăng lên hai lần một năm.']],
    questions: [
      [
        '説明会が年二回になるのはどの会場ですか。',
        ['東京', '大阪', '名古屋', '福岡'],
        2,
        'Tỉ lệ: Tokyo 20/200 = 10%, Osaka 18/150 = 12%, Nagoya 12/80 = 15%, Fukuoka 6/60 = 10% → Nagoya (lựa chọn 3). Lựa chọn 1 dễ nhầm vì Tokyo có nhiều khách và nhiều hợp đồng nhất, nhưng câu hỏi là tỉ lệ.',
      ],
    ],
    points: [
      ['来場者', 'らいじょうしゃ', 'khách tới dự'],
      ['成約', 'せいやく', 'chốt hợp đồng'],
    ],
  }),

  // ── 総合聴読解 ──
  item('mock3', 'sogo-chodokkai', 1, {
    material: {
      kind: 'table',
      title: '東工業団地の構内図（上が北、空白は道路）',
      head: [],
      rows: [
        ['【1】', '工場A', '', '【2】', '工場B'],
        ['', '', '', '', ''],
        ['倉庫', '【3】', '', '食堂', '【4】'],
        ['', '', '', '', ''],
        ['駐車場', '警備室', '正門', '研修センター', '本館'],
      ],
    },
    script: [
      ['女', '正門を入りました。小島さんのメールだと、品質管理棟は「正門を入って、最初の角を右。左側の、食堂の隣」だそうです。', 'Mình vào cổng chính rồi. Theo email của anh Kojima thì toà quản lý chất lượng là "vào cổng chính, rẽ phải ở góc đầu tiên. Bên trái, cạnh nhà ăn".'],
      ['男', '最初の角を右ね。…あれ、通行止めになってるよ。「工事中」って看板が出てる。', 'Rẽ phải ở góc đầu tiên… Ơ, đường bị chặn rồi. Có biển "đang thi công".'],
      ['女', '本当ですね。どうしましょう。警備室で聞いてきましょうか。', 'Đúng thật. Làm sao bây giờ. Hay em vào phòng bảo vệ hỏi?'],
      ['男', 'いや、そこまでしなくても。この先の角を右に曲がれば、同じ建物の裏側に出られるんじゃないかな。地図を見ると、食堂はこの二本の道の間にあるみたいだから。', 'Thôi, không cần đến mức đó. Rẽ phải ở góc tiếp theo thì chắc ra được phía sau của cùng toà nhà. Nhìn bản đồ thì nhà ăn nằm giữa hai con đường này.'],
      ['女', 'そうですね。じゃあ、まっすぐ行って、次の角を右に。この団地、建物がどれも同じような色なので、わかりにくいですね。', 'Đúng vậy. Thế thì đi thẳng, rồi rẽ phải ở góc tiếp theo. Khu công nghiệp này toà nào cũng màu na ná nhau, khó nhận ra thật.'],
      ['男', '品質管理棟って、看板は出てるのかな。', 'Toà quản lý chất lượng có biển không nhỉ?'],
      ['女', '入口に青い看板があるそうです。', 'Nghe nói ở lối vào có biển màu xanh dương.'],
      ['男', '曲がったよ。左側に建物が見えるけど、あれかな。', 'Rẽ rồi. Bên trái có một toà nhà, có phải nó không?'],
      ['女', 'いえ、道が変わったので、今度は右側です。食堂は…あ、右に見えました。その隣ですね。', 'Không ạ, vì đổi đường nên lần này là bên phải. Nhà ăn… à, thấy ở bên phải rồi. Là toà cạnh đó.'],
      ['男', 'なるほど。曲がる道が変わると、左右も逆になるんだね。サンプルは割れ物だから、建物の前に車をつけよう。', 'Ra vậy. Đổi đường rẽ thì trái phải cũng đảo ngược. Hàng mẫu là đồ dễ vỡ, nên đỗ xe sát trước toà nhà đi.'],
      ['女', 'はい。小島さんには、十分ほど遅れると電話しておきます。', 'Vâng. Em sẽ gọi báo anh Kojima là mình trễ khoảng mười phút.'],
    ],
    questions: [
      [
        '品質管理棟はどこですか。',
        ['【1】', '【2】', '【3】', '【4】'],
        3,
        'Theo email: góc đầu tiên rẽ phải, bên trái, cạnh nhà ăn → 【4】 (phía bắc đường thứ nhất, cạnh nhà ăn). Đường đó bị chặn nên đi đường thứ hai rồi rẽ phải; lúc này toà nhà nằm bên phải, vẫn là 【4】. 【2】 là toà nhà bên trái mà người đàn ông tưởng nhầm. 【3】 là khi rẽ trái.',
      ],
    ],
    points: [
      ['通行止め', 'つうこうどめ', 'cấm đi qua, đường bị chặn'],
      ['構内図', 'こうないず', 'sơ đồ khuôn viên'],
      ['車をつける', 'くるまをつける', 'đỗ xe sát vào'],
    ],
  }),
  item('mock3', 'sogo-chodokkai', 2, {
    material: {
      kind: 'text',
      title: '新任管理職研修 1日目（2027年1月20日）',
      body: '新任管理職研修 1日目\n\n9:30〜10:30　【1】開講・社長講話\n10:45〜12:00　【2】労務管理の基礎\n13:00〜14:30　【3】部下との面談の進め方\n14:45〜16:30　【4】グループ討議\n16:30〜17:00　まとめ',
    },
    script: [
      ['女', '皆さん、おはようございます。研修担当の松本です。始める前に、本日の予定の変更についてお知らせします。お手元の予定表をご覧ください。', 'Chào buổi sáng mọi người. Tôi là Matsumoto, phụ trách khoá đào tạo. Trước khi bắt đầu, tôi xin thông báo về thay đổi lịch hôm nay. Mời mọi người xem lịch trong tay.'],
      ['女', '労務管理の講義をお願いしている外部の先生が、電車の事故で、到着が昼過ぎになるとのことです。そこで、労務管理は午後の最後の時間に移します。', 'Giảng viên bên ngoài dạy về quản lý lao động gặp sự cố tàu điện, nghe nói quá trưa mới đến nơi. Vì vậy, phần quản lý lao động sẽ chuyển sang khung giờ cuối buổi chiều.'],
      ['女', '代わりに、午後の最後に予定していたグループ討議を、午前の二つ目の時間に繰り上げます。時間が少し短くなりますので、討議のテーマは、三つのうち一つ目だけにします。', 'Thay vào đó, phần thảo luận nhóm dự định cuối buổi chiều sẽ được đưa lên khung giờ thứ hai buổi sáng. Vì thời gian ngắn đi một chút, chủ đề thảo luận chỉ lấy chủ đề thứ nhất trong ba chủ đề.'],
      ['女', '社長のお話と、面談の進め方の講義は、予定どおりです。社長は十時半に次のご予定がありますので、ご質問は手短にお願いします。討議のグループは、受付でお渡しした名札の色で分かれています。昼食は、十二時から一階の食堂でとっていただけます。', 'Bài nói của giám đốc và bài giảng về cách phỏng vấn trao đổi với cấp dưới vẫn theo dự kiến. Mười giờ rưỡi giám đốc có lịch khác, nên câu hỏi xin ngắn gọn. Nhóm thảo luận được chia theo màu thẻ tên đã phát ở quầy tiếp đón. Bữa trưa dùng ở nhà ăn tầng một từ mười hai giờ.'],
      ['女', '労務管理の講義が五時近くまでかかる可能性がありますので、まとめは十分ほど遅れるかもしれません。お帰りの予定がある方は、あらかじめ私までお知らせください。', 'Bài giảng quản lý lao động có thể kéo dài gần năm giờ, nên phần tổng kết có thể muộn khoảng mười phút. Ai có việc phải về, xin báo trước cho tôi.'],
    ],
    questions: [
      [
        'グループ討議は、予定表のどの時間に行われますか。',
        ['【1】', '【2】', '【3】', '【4】'],
        1,
        'Thảo luận nhóm được đưa lên "khung giờ thứ hai buổi sáng" (10:45–12:00), tức chỗ của 【2】; quản lý lao động chuyển xuống cuối chiều (【4】). 【4】 là giờ in trên lịch của thảo luận nhóm, đã bị đổi. 【3】 là khung đầu buổi chiều, không đổi.',
      ],
    ],
    points: [
      ['繰り上げる', 'くりあげる', 'đưa lên sớm hơn'],
      ['講話', 'こうわ', 'bài nói chuyện'],
      ['手短に', 'てみじかに', 'ngắn gọn'],
    ],
  }),
  item('mock3', 'sogo-chodokkai', 3, {
    material: {
      kind: 'table',
      title: '本社7階の配置（空白は廊下）',
      head: [],
      rows: [
        ['【1】', '【2】', '倉庫', '【3】'],
        ['', '', '', ''],
        ['エレベーター', '【4】', '化粧室', '非常階段'],
      ],
    },
    script: [
      ['男', '来週の最終面接の部屋なんですが、七階で二つ取れそうです。面接をする部屋と、学生さんに待ってもらう控室です。', 'Phòng cho buổi phỏng vấn cuối tuần sau, ở tầng bảy có thể giữ được hai phòng. Một phòng để phỏng vấn, một phòng chờ cho sinh viên.'],
      ['女', '控室は、エレベーターを降りてすぐのところがいいですね。迷わないように。', 'Phòng chờ thì nên ở ngay chỗ ra khỏi thang máy. Để các bạn ấy khỏi lạc.'],
      ['男', 'そうですね。じゃあ、エレベーターの隣の部屋か、廊下を挟んで向かいの角の部屋ですね。', 'Vâng. Vậy là phòng cạnh thang máy, hoặc phòng ở góc đối diện bên kia hành lang.'],
      ['女', '面接の部屋は、静かなところがいいので、一番奥の部屋はどうでしょう。', 'Phòng phỏng vấn cần yên tĩnh, nên phòng trong cùng thì sao ạ?'],
      ['男', 'あそこは窓がなくて狭いんです。面接官が三人入ると、学生さんが座る場所もぎりぎりで…。', 'Phòng đó không có cửa sổ, lại hẹp. Ba người phỏng vấn vào là chỗ cho sinh viên ngồi cũng sát sạt…'],
      ['女', 'それは圧迫感がありますね。じゃあ、倉庫の隣の部屋を面接に使いましょう。', 'Thế thì ngột ngạt quá. Vậy dùng phòng cạnh nhà kho để phỏng vấn.'],
      ['男', 'はい。ただ、そうすると、エレベーターの向かいの角の部屋は、面接の部屋の隣になります。壁が薄いので、話し声が聞こえてしまうかもしれません。', 'Vâng. Có điều, như thế thì phòng góc đối diện thang máy lại nằm sát phòng phỏng vấn. Tường mỏng nên có khi nghe được tiếng nói chuyện.'],
      ['女', '次の人に質問の内容が聞こえたら、公平じゃなくなりますね。控室は、エレベーターの隣のほうにしましょう。面接の部屋とは、廊下を挟んで向かい合わせになりますし。', 'Người sau nghe được câu hỏi thì không công bằng. Phòng chờ thì chọn phòng cạnh thang máy. Phòng đó đối diện phòng phỏng vấn qua hành lang.'],
      ['男', 'わかりました。その二つで予約しておきます。', 'Vâng, tôi sẽ đặt hai phòng đó.'],
      ['女', 'それから、控室には飲み物を用意しておいてください。緊張している学生さんも多いでしょうから。', 'Ngoài ra, nhờ anh chuẩn bị đồ uống ở phòng chờ. Chắc nhiều bạn sinh viên căng thẳng lắm.'],
      ['男', 'はい、お茶を用意しておきます。', 'Vâng, tôi sẽ chuẩn bị trà.'],
    ],
    questions: [
      [
        '予約する二つの部屋は、どれとどれですか。',
        ['【1】と【2】', '【1】と【3】', '【2】と【4】', '【3】と【4】'],
        2,
        'Phòng trong cùng (【3】) hẹp, không cửa sổ nên bị loại; phòng phỏng vấn là phòng cạnh nhà kho (【2】). Phòng chờ phải gần thang máy: 【1】 (góc đối diện thang máy) hoặc 【4】 (cạnh thang máy); 【1】 sát vách 【2】 nên nghe được tiếng, chọn 【4】 → 【2】と【4】. Lựa chọn 1 (【1】と【2】) là bẫy cho người quên chuyện tường mỏng.',
      ],
    ],
    points: [
      ['控室', 'ひかえしつ', 'phòng chờ'],
      ['圧迫感', 'あっぱくかん', 'cảm giác ngột ngạt, bị đè nén'],
      ['廊下を挟む', 'ろうかをはさむ', 'cách nhau một hành lang'],
    ],
  }),
  item('mock3', 'sogo-chodokkai', 4, {
    material: {
      kind: 'text',
      title: '新入社員 受け入れ準備（営業三課）',
      body: '新入社員 受け入れ準備\n\n【1】パソコンとメールアドレスを用意する\n【2】社員証を作る\n【3】机と椅子を配置する\n【4】歓迎会の店を予約する\n\n配属日：2027年4月5日（月）',
    },
    script: [
      ['男', '来週から新人の小野寺さんが来るけど、準備はどう？', 'Từ tuần sau bạn mới Onodera sẽ đến, chuẩn bị thế nào rồi?'],
      ['女', 'はい。パソコンは昨日届いて、情報システム部が設定を済ませてくれました。メールアドレスも、もう使える状態です。', 'Vâng. Máy tính hôm qua đã tới, phòng hệ thống thông tin đã cài đặt xong. Địa chỉ email cũng dùng được rồi ạ.'],
      ['男', 'そう。机は？確か、窓側の空いているところだったよね。', 'Vậy à. Còn bàn? Hình như là chỗ trống phía cửa sổ nhỉ.'],
      ['女', 'はい、昨日の夕方、総務の方が運んでくださって、椅子も並べ終わっています。', 'Vâng, chiều hôm qua bên tổng vụ đã mang tới, ghế cũng đã xếp xong rồi ạ.'],
      ['男', 'パソコンの最初のパスワードは、本人に直接渡すようにね。', 'Mật khẩu ban đầu của máy tính thì đưa tận tay bạn ấy nhé.'],
      ['女', 'はい、初日に封筒に入れてお渡しします。', 'Vâng, ngày đầu em sẽ cho vào phong bì đưa bạn ấy.'],
      ['男', '歓迎会は？', 'Còn tiệc chào mừng?'],
      ['女', '駅前の和食のお店を、金曜の七時で予約しました。ただ、ほかの課からも何人か来たいと言っているので、人数はまだ変わるかもしれません。', 'Em đã đặt quán đồ Nhật trước ga vào bảy giờ tối thứ sáu. Có điều mấy người phòng khác cũng muốn đến, nên số người có thể còn thay đổi.'],
      ['男', 'それは前の日までに伝えれば大丈夫でしょう。社員証は？初日から入館に要るよね。', 'Cái đó báo trước một ngày là được. Còn thẻ nhân viên? Ngày đầu đã cần để vào toà nhà rồi.'],
      ['女', 'それが…人事から、小野寺さんの写真がまだ届いていないと言われていまして。今日、ご本人にメールで催促しました。届けば、二日でできるそうです。', 'Chuyện là… phòng nhân sự nói vẫn chưa nhận được ảnh của Onodera. Hôm nay em đã email nhắc bạn ấy. Nghe nói có ảnh thì hai ngày là làm xong.'],
      ['男', 'もし間に合わなかったら、初日は受付で仮の入館証を出してもらおう。初日の朝は、私から部のみんなに紹介するから。', 'Nếu không kịp thì ngày đầu nhờ quầy lễ tân cấp thẻ ra vào tạm. Sáng ngày đầu tôi sẽ giới thiệu bạn ấy với cả phòng.'],
    ],
    questions: [
      [
        '準備の中で、まだ終わっていないのはどれですか。',
        ['【1】', '【2】', '【3】', '【4】'],
        1,
        'Thẻ nhân viên (【2】) chưa làm được vì chưa có ảnh, phải chờ thêm hai ngày sau khi có ảnh. Máy tính và email (【1】) đã xong; bàn ghế (【3】) đã xếp. 【4】 dễ nhầm vì số người còn thay đổi, nhưng việc "đặt quán" đã làm xong.',
      ],
    ],
    points: [
      ['配属', 'はいぞく', 'phân công về (phòng ban)'],
      ['催促する', 'さいそくする', 'nhắc, giục'],
      ['入館証', 'にゅうかんしょう', 'thẻ ra vào toà nhà'],
    ],
  }),
  item('mock3', 'sogo-chodokkai', 5, {
    material: {
      kind: 'text',
      title: '店頭に貼るお知らせ（下書き）',
      body: 'お客様各位\n\n平素より当店をご利用いただき、誠にありがとうございます。【1】\n2027年2月1日より、一部商品の価格を改定させていただきます。【2】\n対象商品と新しい価格は、店内の掲示とホームページでご確認いただけます。【3】\n今後とも、より良いパンづくりに努めてまいります。【4】\n\nベーカリー こむぎ舎　店主',
    },
    script: [
      ['男', '店長、値上げのお知らせの下書き、できました。見ていただけますか。', 'Chị chủ quán, bản nháp thông báo tăng giá xong rồi ạ. Chị xem giúp em được không?'],
      ['女', 'ありがとう。…うん、わかりやすいわね。でも、どうして値上げするのか、理由が一言もないのは不親切じゃないかしら。小麦粉もバターも、電気代も上がっているでしょう。', 'Cảm ơn em. …Ừ, dễ hiểu đấy. Nhưng không có một câu nào về lý do tăng giá thì có hơi thiếu chu đáo không. Bột mì, bơ, cả tiền điện đều tăng còn gì.'],
      ['男', 'そうですね。では、「原材料や光熱費の値上がりが続き、これまでの価格を保つことが難しくなりました」と入れます。値上げのお知らせの後に、理由として続けるのはどうでしょう。', 'Đúng ạ. Vậy em thêm câu "Giá nguyên liệu và chi phí điện nước liên tục tăng, nên khó giữ mức giá như trước". Đặt tiếp sau câu thông báo tăng giá như là lý do thì sao ạ?'],
      ['女', 'うーん。いきなり「値上げします」と書かれるより、先に事情がわかったほうが、お客様も受け止めやすいと思うの。', 'Ừm. Chị nghĩ khách hiểu hoàn cảnh trước thì dễ chấp nhận hơn là bị báo ngay "sẽ tăng giá".'],
      ['男', 'ビジネスの文書では、結論が先と教わったんですが…。', 'Em được dạy là văn bản kinh doanh thì kết luận phải nói trước…'],
      ['女', '取引先への報告ならそうね。でも、これはお客様へのお願いだから。ご挨拶のすぐ後に入れてちょうだい。', 'Báo cáo cho đối tác thì đúng vậy. Nhưng đây là lời nhờ khách hàng thông cảm. Em đặt ngay sau câu chào nhé.'],
      ['男', 'わかりました。最後の一文の前に、お詫びも入れたほうがいいでしょうか。', 'Em hiểu rồi. Trước câu cuối có nên thêm câu xin lỗi không ạ?'],
      ['女', 'それは、もう「させていただきます」で十分よ。長くなると、読んでもらえないから。', 'Cái đó thì có "させていただきます" là đủ rồi. Dài quá thì khách không đọc.'],
      ['男', 'わかりました。直したら、印刷して入口とレジの横に貼っておきます。', 'Em hiểu rồi. Sửa xong em in ra dán ở lối vào và cạnh quầy thu ngân.'],
    ],
    questions: [
      [
        '値上げの理由の文は、どこに入れますか。',
        ['【1】', '【2】', '【3】', '【4】'],
        0,
        'Chủ quán muốn khách biết hoàn cảnh trước khi đọc câu tăng giá, nên đặt ngay sau câu chào → 【1】. 【2】 (sau câu thông báo tăng giá) là đề xuất của nhân viên theo kiểu "kết luận trước", bị bác vì đây là lời nhờ khách thông cảm. 【4】 là chỗ người nhân viên hỏi về câu xin lỗi, không phải câu lý do.',
      ],
    ],
    points: [
      ['価格を改定する', 'かかくをかいていする', 'điều chỉnh giá'],
      ['光熱費', 'こうねつひ', 'chi phí điện, gas, nước'],
      ['受け止める', 'うけとめる', 'đón nhận, chấp nhận'],
    ],
  }),
  item('mock3', 'sogo-chodokkai', 6, {
    material: {
      kind: 'table',
      title: '売り場の配置（下が入口側、空白は通路）',
      head: [],
      rows: [
        ['【1】', '野菜', '果物', '【2】'],
        ['', '', '', ''],
        ['【3】', 'レジ', 'レジ', '【4】'],
        ['入口', '', '', 'サービスカウンター'],
      ],
    },
    script: [
      ['男', 'おはようございます。朝礼を始めます。今日から、お歳暮のコーナーを作りますので、その場所についてお伝えします。', 'Chào buổi sáng. Bắt đầu buổi họp đầu ngày. Từ hôm nay chúng ta làm góc quà tặng cuối năm, tôi xin thông báo về vị trí.'],
      ['男', '去年は、入口のすぐ横に置きましたが、カートを押したお客様が入口で立ち止まってしまい、ずいぶん混雑しました。ですので、今年は入口の横には置きません。', 'Năm ngoái đặt ngay cạnh lối vào, nhưng khách đẩy xe dừng lại ngay lối vào nên rất ùn tắc. Vì vậy năm nay không đặt cạnh lối vào.'],
      ['男', 'サービスカウンターの前は、配送の受付が近くて便利だという意見もありました。ただ、年末はカウンターの前に配送の列ができるので、コーナーを作ると通れなくなってしまいます。', 'Cũng có ý kiến nói trước quầy dịch vụ thì gần chỗ nhận giao hàng, tiện. Có điều cuối năm trước quầy có hàng người xếp để gửi giao hàng, làm góc ở đó thì không đi lại được.'],
      ['男', '果物売り場の隣は、来週から、お正月用品の売り場になります。そこで、お歳暮は、野菜売り場の隣、入口から見て一番奥の左側に置くことにしました。', 'Cạnh quầy trái cây thì từ tuần sau sẽ thành quầy đồ dùng cho dịp năm mới. Vì thế, quà cuối năm sẽ đặt cạnh quầy rau, phía trong cùng bên trái nhìn từ lối vào.'],
      ['男', '奥なので、お客様にわかりにくいかもしれません。入口とレジの近くに案内の札を出しますので、聞かれたらご案内してください。', 'Vì ở phía trong nên khách có thể khó tìm. Chúng ta sẽ đặt biển chỉ dẫn gần lối vào và quầy thu ngân, ai được hỏi thì hướng dẫn khách nhé.'],
      ['男', 'コーナーの担当は、今年も田中さんと森さんにお願いします。配送のお申し込みは、これまでどおりサービスカウンターで受け付けます。以上です。今日もよろしくお願いします。', 'Đăng ký giao hàng vẫn nhận ở quầy dịch vụ như trước. Hết. Hôm nay cũng nhờ mọi người.'],
    ],
    questions: [
      [
        'お歳暮のコーナーは、どこに作られますか。',
        ['【1】', '【2】', '【3】', '【4】'],
        0,
        'Cạnh quầy rau, phía trong cùng bên trái nhìn từ lối vào → 【1】. 【3】 cạnh lối vào là chỗ của năm ngoái, bị bỏ vì ùn tắc. 【4】 trước quầy dịch vụ bị gạt vì hàng người gửi hàng. 【2】 cạnh quầy trái cây sẽ thành quầy đồ dùng năm mới.',
      ],
    ],
    points: [
      ['お歳暮', 'おせいぼ', 'quà tặng cuối năm'],
      ['朝礼', 'ちょうれい', 'buổi họp đầu ngày'],
      ['立ち止まる', 'たちどまる', 'dừng lại'],
    ],
  }),
  item('mock3', 'sogo-chodokkai', 7, {
    material: {
      kind: 'table',
      title: '忘年会 料理プラン（仕出し 松葉）',
      head: ['', '料理', '飲み物', '1人あたり'],
      rows: [
        ['【1】', '和食弁当（着席）', 'お茶のみ', '3,000円'],
        ['【2】', '立食ビュッフェ', '飲み放題（お酒あり）', '5,500円'],
        ['【3】', '立食ビュッフェ', 'ソフトドリンク飲み放題', '4,500円'],
        ['【4】', '着席コース', '飲み放題（お酒あり）', '7,000円'],
      ],
    },
    script: [
      ['男', '今年の忘年会、会議室でやるなら、料理はこの仕出し屋さんに頼もうと思うんだけど、どのプランがいいかな。', 'Tiệc tất niên năm nay nếu làm ở phòng họp thì tôi định đặt món ở hàng giao đồ ăn này, gói nào thì được nhỉ?'],
      ['女', '今年は部署が合わさって、初めて顔を合わせる人も多いですから、立って自由に動けるほうがいいと思います。', 'Năm nay các phòng sáp nhập, nhiều người lần đầu gặp nhau, nên em nghĩ đứng và đi lại tự do thì tốt hơn.'],
      ['男', 'そうだね。立食なら席を決めなくていいから、幹事も楽だし。参加は何人ぐらいになりそう？', 'Ừ nhỉ. Tiệc đứng thì không phải xếp chỗ, người tổ chức cũng nhàn. Khoảng bao nhiêu người tham gia?'],
      ['女', '工場の人も入れて、六十人ほどです。', 'Tính cả người ở nhà máy thì khoảng sáu mươi người ạ.'],
      ['男', 'じゃあビュッフェで、せっかくだから飲み放題にしようか。', 'Vậy chọn buffet, đã thế thì chọn gói uống thoải mái luôn.'],
      ['女', '予算は一人五千円でしたよね。お酒ありのほうは、少し超えてしまいます。', 'Ngân sách là năm nghìn yên một người phải không ạ. Gói có rượu thì hơi vượt.'],
      ['男', '五百円くらいなら、部長に相談すれば何とかなるよ。', 'Năm trăm yên thì bàn với trưởng bộ phận chắc xoay được.'],
      ['女', 'それが、今回は平日の夜ですし、次の日も普通に仕事です。それに、郊外の工場から車で来る人が多いんです。', 'Có điều lần này là tối ngày thường, hôm sau vẫn làm việc bình thường. Hơn nữa, nhiều người lái xe từ nhà máy ngoại ô tới.'],
      ['男', 'ああ、そうか。お酒を出しても、飲めない人が多いってことだね。', 'À, ra vậy. Nghĩa là có rượu thì nhiều người cũng không uống được.'],
      ['女', 'はい。お酒なしのほうなら予算内に収まりますし、浮いたお金で、ビンゴの景品を少し良くできます。', 'Vâng. Gói không có rượu thì nằm trong ngân sách, tiền dư ra có thể mua quà bingo tốt hơn một chút.'],
      ['男', 'それはいいね。じゃあ、そうしよう。', 'Hay đấy. Vậy làm thế đi.'],
      ['女', 'では、仕出し屋さんには、今日中に連絡しておきます。', 'Vậy trong hôm nay em sẽ liên lạc với hàng giao đồ ăn.'],
    ],
    questions: [
      [
        '忘年会の料理は、どのプランになりましたか。',
        ['【1】', '【2】', '【3】', '【4】'],
        2,
        'Chọn kiểu đứng (buffet) để mọi người làm quen: 【2】 hoặc 【3】. Người đàn ông muốn gói có rượu (【2】), nhưng hôm sau đi làm và nhiều người lái xe, nên chọn gói không rượu, trong ngân sách → 【3】. 【2】 là đề xuất ban đầu, đã bị đổi.',
      ],
    ],
    points: [
      ['仕出し', 'しだし', 'dịch vụ giao đồ ăn (đặt tiệc)'],
      ['立食', 'りっしょく', 'tiệc đứng'],
      ['浮いたお金', 'ういたおかね', 'tiền dư ra'],
    ],
  }),
  item('mock3', 'sogo-chodokkai', 8, {
    material: {
      kind: 'table',
      title: '物流センター 1階の配置（空白は通路）',
      head: [],
      rows: [
        ['【1】', '商品棚A', '商品棚B', '【2】'],
        ['', '', '', ''],
        ['検品台', '【3】', '出荷待ち', '【4】'],
        ['搬入口', '', '', '事務所'],
      ],
    },
    script: [
      ['女', '来月から返品の受け付けをこのセンターでやることになったでしょう。返品を置く場所を決めないといけないんだけど。お客様から戻ってくる品物は、月に二百件ぐらいになりそうなの。', 'Từ tháng sau trung tâm này sẽ nhận hàng trả lại đúng không. Phải quyết chỗ để hàng trả lại. Hàng khách gửi trả về chắc khoảng hai trăm món mỗi tháng.'],
      ['男', '返品は、まず検品するので、検品台の隣が一番いいと思います。運ぶ距離も短いですし。', 'Hàng trả lại phải kiểm tra trước, nên tôi nghĩ cạnh bàn kiểm hàng là tốt nhất. Quãng đường mang cũng ngắn.'],
      ['女', 'うーん、検品台の周りは、入ってきたばかりの新しい商品も置くでしょう。新品と返品が混ざると、返品を間違えて出荷してしまうかもしれない。', 'Ừm, quanh bàn kiểm hàng còn để cả hàng mới vừa nhập về nữa. Hàng mới với hàng trả lại lẫn vào nhau thì có khi lại xuất nhầm hàng trả lại.'],
      ['男', 'たしかに。じゃあ、事務所の前はどうですか。返品の書類を作るのに便利です。', 'Đúng thật. Thế trước văn phòng thì sao? Tiện làm giấy tờ hàng trả lại.'],
      ['女', 'あそこは出荷待ちの荷物のすぐ隣だから、同じことになるわね。', 'Chỗ đó ngay sát hàng chờ xuất, cũng sẽ y như vậy.'],
      ['男', 'では、奥の二か所のどちらかですね。商品棚Bの横はどうでしょう。', 'Vậy là một trong hai chỗ phía trong. Bên cạnh kệ hàng B thì sao?'],
      ['女', '棚Bの横は、来月から新商品の棚を増やす予定なの。棚Aの横なら、搬入口から少し遠いけど、まっすぐ運べるから。', 'Cạnh kệ B thì từ tháng sau định thêm kệ cho sản phẩm mới. Cạnh kệ A tuy hơi xa cửa nhập hàng nhưng mang thẳng vào được.'],
      ['男', 'わかりました。念のため、返品には赤い札をつけて、新しい商品と見分けられるようにします。', 'Tôi hiểu rồi. Để chắc chắn, tôi sẽ gắn thẻ đỏ cho hàng trả lại để phân biệt với hàng mới.'],
      ['女', 'お願い。置き場所の表示も作っておいてね。', 'Nhờ anh. Làm cả biển ghi chỗ để nữa nhé.'],
      ['男', 'はい。札と表示は、今週中に用意しておきます。', 'Vâng. Thẻ và biển tôi sẽ chuẩn bị trong tuần này.'],
    ],
    questions: [
      [
        '返品は、どこに置くことになりましたか。',
        ['【1】', '【2】', '【3】', '【4】'],
        0,
        'Cạnh bàn kiểm hàng (【3】) bị bác vì lẫn với hàng mới nhập; trước văn phòng (【4】) bị bác vì sát hàng chờ xuất; cạnh kệ B (【2】) sẽ dùng cho kệ sản phẩm mới. Còn cạnh kệ A → 【1】. 【3】 là đề xuất đầu tiên của người đàn ông, nghe hợp lý nhưng đã bị bác.',
      ],
    ],
    points: [
      ['返品', 'へんぴん', 'hàng trả lại'],
      ['検品', 'けんぴん', 'kiểm hàng'],
      ['見分ける', 'みわける', 'phân biệt'],
    ],
  }),
  item('mock3', 'sogo-chodokkai', 9, {
    material: {
      kind: 'text',
      title: '年末決算スケジュール（経理部）',
      body: '年末決算スケジュール\n\n【1】各部署：経費精算の締め切り　12月18日（金）\n【2】各部署：売上データの確定　12月23日（水）\n【3】経理部：仮決算の報告　2027年1月8日（金）\n【4】各部署：来期予算案の提出　2027年1月15日（金）',
    },
    script: [
      ['男', '経理部の高田です。お配りした年末決算のスケジュールについて、一点、変更がございますので、お知らせいたします。', 'Tôi là Takada ở phòng kế toán. Về lịch quyết toán cuối năm đã phát, có một điểm thay đổi, tôi xin thông báo.'],
      ['男', 'まず、経費精算の締め切りは、予定どおり十八日です。年内に精算されない経費は、来年度の予算から出すことになりますので、ご注意ください。領収書は、必ず原本を添えて提出してください。', 'Trước hết, hạn thanh toán chi phí vẫn là ngày mười tám như dự kiến. Chi phí nào không thanh toán trong năm sẽ phải lấy từ ngân sách năm sau, xin lưu ý. Hoá đơn nhất định phải nộp kèm bản gốc.'],
      ['男', '売上データの確定については、営業部から、年内最後の営業日の二十八日まで待ってほしいというご要望をいただきました。検討いたしましたが、監査の日程の関係で、二十三日のままとさせていただきます。', 'Về việc chốt dữ liệu doanh thu, phòng kinh doanh có đề nghị chờ đến ngày hai mươi tám, ngày làm việc cuối năm. Chúng tôi đã cân nhắc, nhưng vì lịch kiểm toán, xin giữ nguyên ngày hai mươi ba.'],
      ['男', '変更があるのは、年明けの予算案です。取締役会が一週間早まりましたので、提出を、仮決算の報告と同じ日に前倒しいたします。', 'Điểm thay đổi là dự toán ngân sách đầu năm. Do cuộc họp hội đồng quản trị sớm lên một tuần, hạn nộp được đưa lên sớm, trùng ngày với báo cáo quyết toán tạm.'],
      ['男', '年末年始の休みを挟みますので、予算案は、できれば年内に一度、下書きを経理部にお送りください。仮決算の報告は、例年どおり経理部から各部署にメールでお送りします。ご不明な点は、内線三一二の高田までお問い合わせください。', 'Vì xen giữa là kỳ nghỉ cuối năm, đầu năm, nên nếu được, xin gửi bản nháp dự toán cho phòng kế toán một lần trong năm nay. Báo cáo quyết toán tạm thì như mọi năm, phòng kế toán sẽ gửi email cho các phòng. Có gì chưa rõ, xin liên hệ Takada, số nội bộ ba một hai.'],
    ],
    questions: [
      [
        '日付が早くなったのは、どれですか。',
        ['【1】', '【2】', '【3】', '【4】'],
        3,
        'Hạn nộp dự toán ngân sách năm sau (【4】) được đưa lên sớm, từ 15/1 thành 8/1 (trùng ngày báo cáo quyết toán tạm). 【2】 dễ nhầm vì có người đề nghị đổi, nhưng đề nghị đó là lùi muộn và đã bị từ chối. 【3】 chỉ được nhắc làm mốc ngày, không đổi.',
      ],
    ],
    points: [
      ['前倒し', 'まえだおし', 'đưa lên sớm hơn'],
      ['監査', 'かんさ', 'kiểm toán'],
      ['仮決算', 'かりけっさん', 'quyết toán tạm'],
    ],
  }),
  item('mock3', 'sogo-chodokkai', 10, {
    material: {
      kind: 'text',
      title: '求人票（下書き）',
      body: 'パートタイマー募集（東物流センター）\n\n【1】仕事内容：商品の仕分け・箱詰め（重い物はありません）\n【2】応募資格：35歳までの方\n【3】勤務時間：9:00〜15:00（週3日から）\n【4】時給：1,200円（交通費支給）',
    },
    script: [
      ['男', '人事の西村さん、センターのパート募集の求人票、こんな感じでどうでしょう。今週中に出したいんです。', 'Chị Nishimura bên nhân sự ơi, phiếu tuyển nhân viên bán thời gian cho trung tâm, thế này được không ạ? Tôi muốn đăng trong tuần này.'],
      ['女', '掲載するのは、駅前のフリーペーパーとホームページですね。', 'Đăng trên báo phát miễn phí trước ga và trên trang web đúng không?'],
      ['男', 'はい、両方に出す予定です。', 'Vâng, tôi định đăng cả hai.'],
      ['女', 'では、拝見します。…仕事内容、「重い物はありません」って書いて大丈夫ですか。あとで話が違うと言われると困りますよ。', 'Để tôi xem. …Phần nội dung công việc, ghi "không có đồ nặng" có ổn không? Sau này bị nói là khác với lời hứa thì phiền đấy.'],
      ['男', '大丈夫です。センターで扱っているのは化粧品なので、一番重い箱でも二キロぐらいです。', 'Không sao ạ. Trung tâm chỉ xử lý mỹ phẩm, thùng nặng nhất cũng khoảng hai ký.'],
      ['女', 'それならいいですね。時給は、この地域の相場と比べてどうですか。', 'Thế thì được. Lương giờ so với mặt bằng khu này thì sao?'],
      ['男', '少し高めにしました。去年、なかなか人が集まらなかったので。', 'Tôi để cao hơn một chút. Năm ngoái mãi không tuyển được người.'],
      ['女', '勤務時間も、子育て中の方が働きやすくていいと思います。ただ、ここはだめですね。', 'Giờ làm cũng dễ cho người đang nuôi con, tôi thấy tốt. Có điều chỗ này thì không được.'],
      ['男', 'え、若い人のほうが長く続けてくれると思ったんですが…。', 'Ơ, tôi nghĩ người trẻ thì làm lâu dài hơn…'],
      ['女', '募集のときに年齢で制限するのは、法律で原則として禁止されているんです。経験や条件で書くならいいんですけど。ここは消して、ほかの部分はこのままで出しましょう。', 'Khi tuyển dụng mà giới hạn theo tuổi thì về nguyên tắc bị pháp luật cấm. Ghi theo kinh nghiệm hay điều kiện thì được. Xoá chỗ này đi, phần còn lại cứ để vậy mà đăng.'],
      ['男', 'そうだったんですね。知りませんでした。すぐ直します。', 'Ra là vậy. Tôi không biết. Tôi sửa ngay.'],
      ['女', '直したら、もう一度送ってください。今日中に確認しますので。', 'Sửa xong anh gửi lại cho tôi nhé. Tôi sẽ xem trong hôm nay.'],
    ],
    questions: [
      [
        '求人票で、直さなければならないのはどこですか。',
        ['【1】', '【2】', '【3】', '【4】'],
        1,
        'Giới hạn tuổi khi tuyển dụng về nguyên tắc bị pháp luật cấm, nên phải xoá điều kiện "đến 35 tuổi" → 【2】. 【1】 bị nghi ngờ nhưng đúng (thùng nặng nhất khoảng 2 kg). 【4】 được giải thích là cố ý để cao. 【3】 được khen. Câu ただ、ここはだめですね là tín hiệu chuyển sang chỗ sai.',
      ],
    ],
    points: [
      ['求人票', 'きゅうじんひょう', 'phiếu tuyển dụng'],
      ['相場', 'そうば', 'mặt bằng giá'],
      ['原則として', 'げんそくとして', 'về nguyên tắc'],
    ],
  }),
];

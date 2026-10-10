import type { aichatSim, Lesson } from '@office-neko/shared';
import { aiPractice, excelPractice, pptChain, pptPractice, pptTypeInto } from '../lessonKit';

const typeAndSend = (text: string) => (): aichatSim.AiChatAction[] => [{ type: 'setDraft', text }, { type: 'send' }];
const pickAll = (indexes: number[]) => (): aichatSim.AiChatAction[] => indexes.map((index) => ({ type: 'pick', index }));

const MINUTES =
  'Doanh số quý 3 tăng 5% so với quý 2. Sản phẩm bán chạy nhất là nồi chiên không dầu. ' +
  'Công ty sẽ mở chi nhánh Đà Nẵng vào tháng 11. Chị Hoa phụ trách tuyển 3 nhân viên cho chi nhánh mới. ' +
  'Ngân sách quảng cáo quý 4 giữ nguyên. Cuộc họp sau vào ngày 4/11.';

/** Chương 3 — AI trong công việc: email, tóm tắt, công thức Excel, dàn ý slide. */
export const AI_WORK: Lesson[] = [
  {
    id: 'ai.email',
    trackId: 'ai',
    chapterId: 'ai.work',
    title: 'Viết email nhờ AI',
    minutes: 8,
    steps: [
      {
        kind: 'explain',
        mood: 'happy',
        body: 'Viết email là việc AI giúp được nhiều nhất ở văn phòng. Dùng đúng công thức năm phần đã học: vai trò, bối cảnh, nhiệm vụ, định dạng, giới hạn.',
      },
      {
        kind: 'explain',
        body:
          'Với email xin nghỉ phép, hãy kể cho AI:\n\n' +
          '- **Gửi cho ai** — trưởng phòng, anh chị nào.\n' +
          '- **Nghỉ mấy ngày, vì sao.**\n' +
          '- **Ai làm thay** việc của bạn.\n' +
          '- **Giọng văn** — lịch sự, ngắn gọn.',
      },
      {
        kind: 'explain',
        mood: 'surprised',
        body: 'Nhưng AI **không biết** lịch của bạn, tên sếp hay ai làm thay. Thiếu thông tin, nó để chỗ trống như «[ngày]» — hoặc tệ hơn, **tự bịa** một câu nghe rất trôi chảy. Luôn đọc lại, điền và sửa trước khi bấm Gửi.',
      },
      {
        kind: 'quiz',
        question: 'Email AI viết có câu «Tôi đã gửi báo cáo cho anh hôm qua», nhưng bạn chưa gửi. Bạn làm gì?',
        choices: ['Gửi luôn, sếp không để ý đâu', 'Xoá hoặc sửa câu đó rồi mới gửi', 'Hỏi AI xem nó có chắc không'],
        answer: 1,
        why: 'AI không biết bạn đã làm gì. Câu sai trong email là lỗi của người gửi, nên bạn phải sửa trước khi gửi.',
      },
      aiPractice({
        greeting: 'Chào bạn! Mình là trợ lý AI mô phỏng. Bạn cần viết email gì?',
        replies: {
          weak: 'Chào anh,\n\nEm xin nghỉ phép. Mong anh đồng ý.\n\nCảm ơn anh.',
          ok:
            'Kính gửi anh,\n\nEm xin phép nghỉ 2 ngày vì có việc gia đình. ' +
            'Em sẽ cố gắng sắp xếp công việc trước khi nghỉ.\n\nEm cảm ơn anh.',
          good:
            '**Tiêu đề:** Xin nghỉ phép 2 ngày [ngày] – [ngày]\n\n' +
            'Kính gửi anh [tên trưởng phòng],\n\n' +
            'Em xin phép nghỉ 2 ngày, từ [ngày] đến [ngày], vì lý do gia đình.\n\n' +
            'Trong thời gian nghỉ, công việc của em sẽ do [tên người làm thay] hỗ trợ. ' +
            'Việc gấp anh có thể gọi em qua số [số điện thoại].\n\n' +
            'Em cảm ơn anh đã xem xét.\n\nTrân trọng,\n[Tên của bạn]',
        },
        task: 'Nhờ AI viết **email xin nghỉ phép 2 ngày** gửi trưởng phòng. Prompt cần đủ **cả năm phần**.',
        checks: [{ kind: 'promptCriteria', required: ['role', 'context', 'task', 'format', 'limits'] }],
        spotlight: { helpId: 'ai.criteria' },
        hint: 'Nhìn năm ô dưới ô gõ: ô nào chưa ✓ thì thêm phần đó. Rê chuột vào ô để xem mẹo.',
        steps: [
          'Vai trò: «Bạn là nhân viên hành chính giỏi viết thư.»',
          'Bối cảnh: «Tôi là nhân viên kế toán, cần gửi cho trưởng phòng.»',
          'Nhiệm vụ: «Viết email xin nghỉ phép 2 ngày vì việc gia đình.»',
          'Định dạng và giới hạn: «Viết 3 đoạn, giọng lịch sự, không quá 120 chữ.» Rồi bấm Gửi.',
        ],
        solve: typeAndSend(
          'Bạn là nhân viên hành chính giỏi viết thư. Tôi là nhân viên kế toán, cần gửi cho trưởng phòng. ' +
            'Viết email xin nghỉ phép 2 ngày vì việc gia đình. Viết 3 đoạn, giọng lịch sự, không quá 120 chữ.',
        ),
      }),
      {
        kind: 'explain',
        body: 'Thấy các chỗ «[ngày]», «[tên người làm thay]» chưa? AI chừa chỗ để **bạn** điền. Giờ thử một email khác: lần này AI không chừa chỗ mà tự viết luôn một câu không đúng sự thật.',
      },
      aiPractice({
        mode: 'pickSentence',
        greeting: 'Viết giúp tôi email xin nghỉ ngày 14 và 15/10 để đưa con đi khám bệnh.',
        sentences: [
          'Kính gửi anh Minh,',
          'Em xin phép nghỉ hai ngày 14 và 15/10 để đưa con đi khám bệnh.',
          'Công việc trong hai ngày này em đã bàn giao xong cho chị Lan.',
          'Việc gấp anh cứ gọi vào số điện thoại của em.',
          'Em cảm ơn anh.',
        ],
        task: 'Bạn **chưa** bàn giao việc cho ai cả. AI lại viết email như bên dưới. Câu nào AI **tự bịa** ra? Bấm vào câu đó.',
        checks: [{ kind: 'pickSentence', answer: 2 }],
        spotlight: { helpId: 'ai.sentences' },
        hint: 'Đọc từng câu và tự hỏi: điều này mình đã kể cho AI chưa, và nó có đúng không?',
        steps: ['Bạn chỉ nói với AI ngày nghỉ và lý do.', 'Bấm vào câu nói đã bàn giao việc cho chị Lan.'],
        solve: pickAll([2]),
      }),
      {
        kind: 'explain',
        mood: 'happy',
        body: 'Chính xác! Nếu gửi đi, sếp sẽ tưởng chị Lan đã nhận việc của bạn. Nhớ câu này: **AI viết nháp, bạn chịu trách nhiệm bản gửi đi.**',
      },
    ],
  },
  {
    id: 'ai.summary',
    trackId: 'ai',
    chapterId: 'ai.work',
    title: 'Tóm tắt văn bản dài',
    minutes: 8,
    steps: [
      {
        kind: 'explain',
        mood: 'happy',
        body: 'Biên bản họp dài, báo cáo nhiều trang, chuỗi email rối rắm — AI tóm tắt chỉ trong vài giây. Bạn dán văn bản vào ô chat, rồi nói rõ cần tóm tắt **thế nào**.',
      },
      {
        kind: 'explain',
        body:
          'Một prompt tóm tắt tốt nói rõ ba điều:\n\n' +
          '- **Nhiệm vụ** — «Tóm tắt biên bản họp dưới đây».\n' +
          '- **Định dạng** — «thành 3 gạch đầu dòng».\n' +
          '- **Bối cảnh** — tóm tắt cho ai đọc: «cho sếp đọc nhanh», «gửi khách hàng»…',
      },
      {
        kind: 'explain',
        mood: 'surprised',
        body: 'Trước khi dán, nhớ bài [[du-lieu-nhay-cam|thông tin nhạy cảm]]: xoá số điện thoại, lương, số tài khoản ra khỏi văn bản. Và sau khi AI tóm tắt, **so lại con số** với bản gốc — AI hay chép nhầm số.',
      },
      {
        kind: 'quiz',
        question: 'Prompt nào cho bản tóm tắt dùng được ngay?',
        choices: [
          '«Tóm tắt cái này»',
          '«Tóm tắt biên bản họp dưới đây thành 3 gạch đầu dòng cho sếp đọc»',
          '«Đọc biên bản này đi»',
        ],
        answer: 1,
        why: 'Câu thứ hai có đủ nhiệm vụ (tóm tắt), định dạng (3 gạch đầu dòng) và bối cảnh (cho sếp đọc).',
      },
      aiPractice({
        greeting: 'Chào bạn! Mình là trợ lý AI mô phỏng. Bạn cần tóm tắt gì?',
        replies: {
          weak:
            'Cuộc họp nói về doanh số quý 3, sản phẩm bán chạy, việc mở chi nhánh mới ở Đà Nẵng vào tháng 11, ' +
            'việc tuyển nhân viên cho chi nhánh, ngân sách quảng cáo quý 4 và lịch họp tiếp theo vào ngày 4/11.',
          ok:
            '- Doanh số quý 3 tăng 5%, nồi chiên không dầu bán chạy nhất.\n' +
            '- Mở chi nhánh Đà Nẵng tháng 11, chị Hoa tuyển 3 nhân viên.\n' +
            '- Ngân sách quảng cáo quý 4 giữ nguyên, họp tiếp ngày 4/11.',
          good:
            '- **Kết quả:** doanh số quý 3 tăng 5% so với quý 2, nồi chiên không dầu bán chạy nhất.\n' +
            '- **Việc mới:** mở chi nhánh Đà Nẵng tháng 11 — chị Hoa tuyển 3 nhân viên.\n' +
            '- **Giữ nguyên:** ngân sách quảng cáo quý 4. Họp tiếp ngày 4/11.',
        },
        task:
          `Biên bản họp phòng kinh doanh: «${MINUTES}»\n\n` +
          'Nhờ AI tóm tắt biên bản này thành **3 gạch đầu dòng** cho **sếp** đọc.',
        checks: [{ kind: 'promptCriteria', required: ['task', 'format', 'context'] }],
        spotlight: { helpId: 'ai.composer' },
        hint: 'Prompt cần ba thứ: động từ «tóm tắt», số ý «3 gạch đầu dòng», và người đọc «cho sếp».',
        steps: [
          'Gõ: «Tóm tắt biên bản họp sau thành 3 gạch đầu dòng cho sếp đọc nhanh:»',
          'Không cần gõ lại cả biên bản — AI mô phỏng đã có sẵn. Muốn bản tóm tắt hay hơn, thêm vai trò và giới hạn («ngắn gọn»). Bấm Gửi.',
        ],
        solve: typeAndSend('Tóm tắt biên bản họp sau thành 3 gạch đầu dòng cho sếp đọc nhanh: ' + MINUTES),
      }),
      {
        kind: 'explain',
        body: 'Bản tóm tắt gọn hơn nhiều. Nhưng đừng chép đi ngay — bản tóm tắt dưới đây có **một con số sai**. Đây là lỗi AI hay mắc nhất khi tóm tắt.',
      },
      aiPractice({
        mode: 'pickSentence',
        greeting: 'Tóm tắt biên bản họp phòng kinh doanh thành 3 ý cho sếp.',
        sentences: [
          'Công ty mở chi nhánh Đà Nẵng vào tháng 11.',
          'Doanh số quý 3 tăng 15% so với quý 2.',
          'Chị Hoa tuyển 3 nhân viên mới, ngân sách quảng cáo quý 4 giữ nguyên.',
        ],
        task:
          'Biên bản gốc ghi: doanh số quý 3 **tăng 5%**, mở chi nhánh Đà Nẵng tháng 11, chị Hoa tuyển 3 nhân viên, ' +
          'ngân sách quảng cáo giữ nguyên. Câu nào trong bản tóm tắt **sai số liệu**?',
        checks: [{ kind: 'pickSentence', answer: 1 }],
        spotlight: { helpId: 'ai.sentences' },
        hint: 'So từng con số trong bản tóm tắt với biên bản gốc.',
        steps: ['Biên bản ghi doanh số tăng **5%**.', 'Bấm vào câu ghi doanh số.'],
        solve: pickAll([1]),
      }),
      {
        kind: 'explain',
        mood: 'happy',
        body: 'Bắt đúng rồi! Sếp đọc «tăng 15%» thì sẽ quyết định khác hẳn. Tóm tắt nhờ AI cho nhanh, nhưng **con số, tên người, ngày tháng** thì luôn so lại với bản gốc.',
      },
    ],
  },
  {
    id: 'ai.formula',
    trackId: 'ai',
    chapterId: 'ai.work',
    title: 'Nhờ AI viết công thức Excel',
    minutes: 9,
    steps: [
      {
        kind: 'explain',
        mood: 'happy',
        body: 'Quên tên hàm, không nhớ cú pháp? Hỏi AI! Nhưng AI **không nhìn thấy bảng tính của bạn**. Bạn phải kể: cột nào chứa gì, dữ liệu từ hàng mấy đến hàng mấy, muốn kết quả đặt ở ô nào.',
      },
      {
        kind: 'explain',
        body: 'So sánh hai cách hỏi:\n\n' +
          '- «Viết công thức tính tổng» — AI phải đoán vùng ô, dễ đoán sai.\n' +
          '- «Bảng của tôi có cột B là Doanh số, từ B2 đến B8. Viết công thức tính tổng, đặt ở ô B9» — AI trả lời trúng ngay.',
      },
      aiPractice({
        greeting: 'Chào bạn! Mình là trợ lý AI mô phỏng. Bạn cần công thức Excel gì?',
        replies: {
          weak: 'Bạn thử công thức **=SUM(B2:B7)** nhé. Có thể bạn cần chỉnh lại vùng ô cho khớp với bảng của mình.',
          ok: 'Bạn gõ vào ô **B9**: **=SUM(B2:B8)**\n\nHàm SUM cộng tất cả các số từ B2 đến B8.',
          good:
            'Bạn gõ vào ô **B9**: **=SUM(B2:B8)** rồi bấm Enter.\n\n' +
            'Hàm SUM cộng tất cả các số từ B2 đến B8. Sau này thêm hàng mới, nhớ sửa lại vùng ô cho đủ.',
        },
        task: 'Bảng có cột B là **Doanh số**, từ ô **B2** đến **B8**. Nhờ AI viết công thức tính **tổng doanh số** — nói rõ cột và hàng.',
        checks: [{ kind: 'promptCriteria', required: ['task', 'context'] }],
        spotlight: { helpId: 'ai.composer' },
        hint: 'Kể cho AI về bảng của bạn (Bối cảnh), rồi nói việc cần làm bằng động từ «viết» (Nhiệm vụ).',
        steps: [
          'Vai trò: «Bạn là chuyên gia Excel.»',
          'Bối cảnh: «Tôi đang làm bảng doanh số, cột B từ B2 đến B8.»',
          'Nhiệm vụ: «Viết công thức tính tổng doanh số, đặt ở ô B9.» Rồi bấm Gửi.',
        ],
        solve: typeAndSend(
          'Bạn là chuyên gia Excel. Tôi đang làm bảng doanh số, cột B từ B2 đến B8. Viết công thức tính tổng doanh số, đặt ở ô B9.',
        ),
      }),
      {
        kind: 'explain',
        mood: 'surprised',
        body: 'AI đưa công thức rồi. Đừng tin ngay — **chép sang Excel thử**. Bảng có doanh số từ B2 đến B8, nên công thức đúng phải cộng đủ 7 ô đó.',
      },
      excelPractice({
        cells: {
          A1: 'Ngày', B1: 'Doanh số',
          A2: 'Thứ 2', B2: '300', A3: 'Thứ 3', B3: '350', A4: 'Thứ 4', B4: '280', A5: 'Thứ 5', B5: '400',
          A6: 'Thứ 6', B6: '320', A7: 'Thứ 7', B7: '450', A8: 'Chủ nhật', B8: '350',
          A9: 'Tổng',
        },
        task: 'Gõ vào ô **B9** công thức AI gợi ý: **=SUM(B2:B8)**. Gõ công thức, đừng tự cộng rồi gõ con số.',
        checks: [
          { kind: 'cellFormula', cell: 'B9', fn: 'SUM', range: 'B2:B8' },
          { kind: 'cellValue', cell: 'B9', value: 2450 },
        ],
        spotlight: { helpId: 'excel.formulaBar' },
        hint: 'Bấm ô B9, gõ đúng như AI gợi ý, bắt đầu bằng dấu =.',
        steps: ['Bấm vào ô B9 (cạnh chữ «Tổng»).', 'Gõ =SUM(B2:B8)', 'Bấm Enter. Ô hiện 2450.'],
        solve: () => [{ type: 'setCell', cell: 'B9', raw: '=SUM(B2:B8)' }],
      }),
      {
        kind: 'quiz',
        question: 'Bảng có doanh số từ B2 đến B8, nhưng AI gợi ý **=SUM(B2:B7)**. Bạn làm gì?',
        choices: ['Dùng luôn, AI tính giỏi hơn người', 'Sửa thành =SUM(B2:B8), vì công thức bỏ sót hàng 8', 'Xoá hàng 8 cho khớp công thức'],
        answer: 1,
        why: 'Công thức thiếu một hàng vẫn ra một con số trông rất hợp lý — nhưng sai. Luôn soát vùng ô AI đưa với bảng thật.',
      },
      {
        kind: 'explain',
        mood: 'happy',
        body: 'Công thức AI gợi ý mà ra kết quả lạ? Gửi tiếp cho AI: «Công thức báo lỗi #NAME?, sửa giúp tôi» — AI sẽ sửa cùng bạn.',
      },
    ],
  },
  {
    id: 'ai.outline',
    trackId: 'ai',
    chapterId: 'ai.work',
    title: 'Nhờ AI lên dàn ý slide',
    minutes: 9,
    steps: [
      {
        kind: 'explain',
        mood: 'happy',
        body: 'Ngồi trước slide trắng không biết bắt đầu từ đâu? Nhờ AI lên **dàn ý** trước: mấy slide, mỗi slide tiêu đề gì, nói ý gì. Rồi **bạn** tự dựng slide trong PowerPoint.',
      },
      {
        kind: 'explain',
        body: 'Prompt xin dàn ý nên nói rõ **số slide** và chủ đề. Thêm người xem là ai, giọng ra sao thì dàn ý càng sát ý bạn.',
      },
      aiPractice({
        greeting: 'Chào bạn! Mình là trợ lý AI mô phỏng. Bạn định làm bài trình chiếu về gì?',
        replies: {
          weak:
            'Bài trình chiếu về bánh mochi có thể nói về nguồn gốc, cách làm, các vị, giá bán, cách bảo quản, ' +
            'chương trình khuyến mãi và cách đặt hàng.',
          ok: '1. Bánh mochi là gì\n2. Các vị bánh\n3. Đặt hàng',
          good:
            '**Slide 1 – Bánh mochi là gì:** bánh nếp mềm của Nhật, nhân ngọt, làm mới mỗi ngày.\n' +
            '**Slide 2 – Các vị bánh:** trà xanh, đậu đỏ, dâu tây, xoài.\n' +
            '**Slide 3 – Đặt hàng:** số điện thoại, địa chỉ cửa hàng, giờ mở cửa.',
        },
        task: 'Nhờ AI lên **dàn ý 3 slide** giới thiệu sản phẩm bánh mochi của cửa hàng.',
        checks: [{ kind: 'promptCriteria', required: ['task', 'format'] }],
        spotlight: { helpId: 'ai.composer' },
        hint: 'Nói việc cần làm («lên dàn ý») và định dạng («3 slide»). Thêm vai trò để dàn ý gọn hơn.',
        steps: [
          'Vai trò: «Bạn là nhân viên marketing.»',
          'Nhiệm vụ và định dạng: «Lên dàn ý 3 slide giới thiệu bánh mochi của cửa hàng.»',
          'Bấm Gửi.',
        ],
        solve: typeAndSend('Bạn là nhân viên marketing. Lên dàn ý 3 slide giới thiệu bánh mochi của cửa hàng, mỗi slide một tiêu đề.'),
      }),
      {
        kind: 'explain',
        body: 'Có dàn ý rồi, giờ sang PowerPoint. AI chỉ gợi ý — bạn là người dựng slide và quyết định giữ, bỏ hay sửa ý nào.',
      },
      pptPractice({
        task: 'Dựng 3 slide theo dàn ý AI vừa đưa: tiêu đề slide 1 «**Bánh mochi là gì**», slide 2 «**Các vị bánh**», slide 3 «**Đặt hàng**».',
        checks: [
          { kind: 'slideCount', count: 3 },
          { kind: 'slideTitle', slide: 1, text: 'Bánh mochi là gì' },
          { kind: 'slideTitle', slide: 2, text: 'Các vị bánh' },
          { kind: 'slideTitle', slide: 3, text: 'Đặt hàng' },
        ],
        spotlight: { helpId: 'ppt.newSlide' },
        hint: 'Gõ tiêu đề slide 1 trước, rồi bấm New Slide để thêm slide mới và gõ tiêu đề tiếp.',
        steps: [
          'Nháy đúp vào khung «Bấm để nhập tiêu đề» của slide 1, gõ: Bánh mochi là gì — bấm Enter.',
          'Thẻ Home › nhóm Slides › nút New Slide (Slide mới). Nháy đúp khung tiêu đề, gõ: Các vị bánh.',
          'Thêm một slide nữa, gõ tiêu đề: Đặt hàng.',
        ],
        solve: (s0) =>
          pptChain(
            s0,
            (s) => pptTypeInto(s, 0, 'title', 'Bánh mochi là gì'),
            () => [{ type: 'addSlide' }],
            (s) => pptTypeInto(s, 1, 'title', 'Các vị bánh'),
            () => [{ type: 'addSlide' }],
            (s) => pptTypeInto(s, 2, 'title', 'Đặt hàng'),
          ),
      }),
      {
        kind: 'explain',
        mood: 'happy',
        body: 'Ba slide xong khung! Giờ bạn có thể nhờ AI viết tiếp nội dung cho từng slide — nhớ đọc lại, sửa cho đúng giọng cửa hàng mình. Chương sau là **dự án cuối**: tự viết một prompt hoàn chỉnh.',
      },
    ],
  },
];

import type { aichatSim, Lesson } from '@office-neko/shared';
import { aiPractice } from '../lessonKit';

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
];

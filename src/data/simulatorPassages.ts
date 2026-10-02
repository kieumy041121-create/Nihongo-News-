import { SimulatorPassage } from '../types';

export const SIMULATOR_PASSAGES: SimulatorPassage[] = [
  {
    id: 'sim-n4-short-email',
    type: 'short',
    typeName: 'Đoản văn (短文 — ~200 chữ)',
    jlptLevel: 'N4',
    title: '図書館の利用案内に関するメール',
    titleVi: 'Email thông báo quy định mượn sách thư viện',
    timeLimitSeconds: 240, // 4 mins
    passageText: `大学の留学生センターからのお知らせ

留学生のみなさんへ

来週の月曜日（10月15日）から、中央図書館の利用ルールが新しく変わります。これまで本は一度に3冊まで、2週間借りることができましたが、新しいルールでは「5冊まで、3週間」借りられるようになります。

ただし、試験期間中（1月と7月）は、多くの学生が利用するため、貸出期間は「1週間」に短縮されます。返却期日を過ぎると、遅れた日数と同じ期間、新しい本を借りることができなくなりますので、十分にご注意ください。`,
    passageTextVi: `Thông báo từ Trung tâm Lưu học sinh Đại học

Gửi các bạn lưu học sinh,

Từ thứ Hai tuần tới (ngày 15 tháng 10), quy định sử dụng Thư viện Trung tâm sẽ thay đổi. Trước đây mỗi người chỉ được mượn tối đa 3 cuốn sách trong 2 tuần, nhưng theo quy định mới, bạn sẽ có thể mượn "tối đa 5 cuốn trong 3 tuần".

Tuy nhiên, trong các đợt thi học kỳ (tháng 1 và tháng 7), do lượng sinh viên sử dụng đông nên thời hạn mượn sẽ bị rút ngắn còn "1 tuần". Xin đặc biệt lưu ý: nếu quá hạn trả sách, bạn sẽ bị đình chỉ quyền mượn sách mới bằng đúng số ngày trả muộn.`,
    sentences: [
      {
        id: 'sim-s1',
        text: '来週の月曜日から、中央図書館の利用ルールが新しく変わります。',
        translation: 'Từ thứ Hai tuần tới, quy định sử dụng thư viện trung tâm sẽ thay đổi mới.',
        tokens: [
          { surface: '来週', reading: 'らいしゅう', isKanji: true, jlpt: 'N5' },
          { surface: 'の' },
          { surface: '月曜日', reading: 'げつようび', isKanji: true, jlpt: 'N5' },
          { surface: 'から、' },
          { surface: '中央図書館', reading: 'ちゅうおうとしょかん', isKanji: true, jlpt: 'N4' },
          { surface: 'の' },
          { surface: '利用ルール', reading: 'りようルール', isKanji: true, jlpt: 'N4' },
          { surface: 'が' },
          { surface: '新しく', reading: 'あたらしく', isKanji: true, jlpt: 'N5' },
          { surface: '変わります。', reading: 'かわります', isKanji: true, jlpt: 'N4' }
        ]
      },
      {
        id: 'sim-s2',
        text: '新しいルールでは「5冊まで、3週間」借りられるようになります。',
        translation: 'Theo quy định mới, bạn sẽ có thể mượn tối đa 5 cuốn trong 3 tuần.',
        tokens: [
          { surface: '新しい', reading: 'あたらしい', isKanji: true, jlpt: 'N5' },
          { surface: 'ルール' },
          { surface: 'では' },
          { surface: '「5冊まで、', reading: 'ごさつまで', isKanji: true, jlpt: 'N5' },
          { surface: '3週間」', reading: 'さんしゅうかん', isKanji: true, jlpt: 'N5' },
          { surface: '借りられる', reading: 'かりられる', isKanji: true, jlpt: 'N4' },
          { surface: 'ようになります。' }
        ]
      },
      {
        id: 'sim-s3',
        text: 'ただし、試験期間中は貸出期間が1週間に短縮されます。',
        translation: 'Tuy nhiên, trong kỳ thi thì thời hạn mượn sách sẽ bị rút ngắn còn 1 tuần.',
        tokens: [
          { surface: 'ただし、' },
          { surface: '試験期間中', reading: 'しけんきかんちゅう', isKanji: true, jlpt: 'N4' },
          { surface: 'は' },
          { surface: '貸出期間', reading: 'かしだしきかん', isKanji: true, jlpt: 'N3' },
          { surface: 'が' },
          { surface: '1週間に', reading: 'いっしゅうかんに', isKanji: true, jlpt: 'N5' },
          { surface: '短縮されます。', reading: 'たんしゅくされます', isKanji: true, jlpt: 'N2' }
        ]
      },
      {
        id: 'sim-s4',
        text: '返却期日を過ぎると、遅れた日数と同じ期間、新しい本を借りることができなくなります。',
        translation: 'Nếu quá hạn trả sách, bạn sẽ không thể mượn sách mới trong khoảng thời gian tương đương số ngày nộp muộn.',
        tokens: [
          { surface: '返却期日', reading: 'へんきゃくきじつ', isKanji: true, jlpt: 'N2' },
          { surface: 'を' },
          { surface: '過ぎると、', reading: 'すぎると', isKanji: true, jlpt: 'N4' },
          { surface: '遅れた', reading: 'おくれた', isKanji: true, jlpt: 'N4' },
          { surface: '日数', reading: 'にっすう', isKanji: true, jlpt: 'N3' },
          { surface: 'と' },
          { surface: '同じ', reading: 'おなじ', isKanji: true, jlpt: 'N5' },
          { surface: '期間、', reading: 'きかん', isKanji: true, jlpt: 'N4' },
          { surface: '新しい', reading: 'あたらしい', isKanji: true, jlpt: 'N5' },
          { surface: '本', reading: 'ほん', isKanji: true, jlpt: 'N5' },
          { surface: 'を' },
          { surface: '借りることができなくなります。', reading: 'かりることができなくなります', isKanji: true, jlpt: 'N4' }
        ]
      }
    ],
    questions: [
      {
        id: 'q1',
        question: '平常時、新しいルールで本を借りる場合、正しい説明はどれですか。',
        options: [
          '3冊まで、2週間借りられる。',
          '5冊まで、3週間借りられる。',
          '5冊まで、1週間しか借りられない。',
          '何冊でも自由に借りられる。'
        ],
        correctIndex: 1,
        explanation: 'Trong thông báo nêu: "新しいルールでは「5冊まで、3週間」借りられるようになります。"'
      },
      {
        id: 'q2',
        question: '返却期限より3日遅れて本を返した場合、どうなりますか。',
        options: [
          '罰金としてお金を払わなければならない。',
          'これ以上図書館に入れなくなる。',
          '返却後、3日間は新しい本を借りることができない。',
          '特にペナルティはない。'
        ],
        correctIndex: 2,
        explanation: '"返却期日を過ぎると、遅れた日数と同じ期間、新しい本を借りることができなくなります" -> Trả muộn 3 ngày thì bị cấm mượn 3 ngày tiếp theo.'
      }
    ]
  },
  {
    id: 'sim-n3-medium-environment',
    type: 'medium',
    typeName: 'Trung văn (中文 — ~450 chữ)',
    jlptLevel: 'N3',
    title: '日本の食品ロス問題と消費者の意識改革',
    titleVi: 'Vấn đề lãng phí thực phẩm và sự chuyển biến nhận thức của người tiêu dùng Nhật',
    timeLimitSeconds: 480, // 8 mins
    passageText: `まだ食べられるのに捨てられてしまう食べ物のことを「食品ロス（フードロス）」と呼びます。日本全体では、年間約500万トンもの食品ロスが発生しており、これは国民一人あたりが毎日お茶碗一杯分の食べ物を捨てている計算になります。

食品ロスが発生する原因は、外食産業やスーパーマーケットだけにあるわけではありません。実は、約半分は各家庭から出ているのです。「買いすぎて賞味期限を切らしてしまう」「料理を作りすぎて残してしまう」「野菜の皮を厚くむきすぎてしまう」などが主な理由として挙げられます。

最近では、この問題を改善するために「てまえどり」という運動が広がっています。スーパーで商品を買う際、棚の奥にある賞味期限の長いものではなく、手前にある賞味期限が近いものから選ぶという取り組みです。一人ひとりの小さな意識の変化が、大きな食品廃棄の削減へとつながるのです。`,
    passageTextVi: `Thực phẩm vẫn còn ăn được nhưng bị vứt bỏ được gọi là "lãng phí thực phẩm" (Food Loss). Trên toàn nước Nhật, mỗi năm phát sinh khoảng 5 triệu tấn thực phẩm bị lãng phí, tính bình quân mỗi người dân vứt bỏ lượng thức ăn tương đương một bát cơm mỗi ngày.

Nguyên nhân không chỉ bắt nguồn từ các nhà hàng hay siêu thị. Trên thực tế, có tới khoảng một nửa lượng lãng phí xuất phát từ chính các hộ gia đình: "Mua quá nhiều dẫn tới quá hạn sử dụng", "Nấu quá nhiều ăn không hết", "Gọt vỏ rau củ quá dày"...

Gần đây, phong trào "Temaedori" (Lấy từ phía trước) đang được nhân rộng: khi mua hàng ở siêu thị, người mua chủ động chọn những món ở phía trước có hạn dùng gần nhất thay vì với tay lấy món để sâu bên trong có hạn xa hơn. Sự thay đổi nhận thức nhỏ bé của từng cá nhân sẽ góp phần cắt giảm lượng rác thải thực phẩm khổng lồ.`,
    sentences: [
      {
        id: 'sim-m1',
        text: '日本全体では、年間約500万トンもの食品ロスが発生しています。',
        translation: 'Trên toàn nước Nhật, mỗi năm phát sinh tới khoảng 5 triệu tấn thực phẩm bị lãng phí.',
        tokens: [
          { surface: '日本全体', reading: 'にほんぜんたい', isKanji: true, jlpt: 'N3' },
          { surface: 'では、' },
          { surface: '年間', reading: 'ねんかん', isKanji: true, jlpt: 'N3' },
          { surface: '約500万トン', reading: 'やくごひゃくまんとん', isKanji: true, jlpt: 'N3' },
          { surface: 'もの' },
          { surface: '食品ロス', reading: 'しょくひんロス', isKanji: true, jlpt: 'N3' },
          { surface: 'が' },
          { surface: '発生しています。', reading: 'はっせいしています', isKanji: true, jlpt: 'N3' }
        ]
      },
      {
        id: 'sim-m2',
        text: '食品ロスの約半分は各家庭から出ているのです。',
        translation: 'Khoảng một nửa lượng lãng phí thực phẩm lại xuất phát từ chính các hộ gia đình.',
        tokens: [
          { surface: '食品ロス', reading: 'しょくひんロス', isKanji: true, jlpt: 'N3' },
          { surface: 'の' },
          { surface: '約半分', reading: 'やくはんぶん', isKanji: true, jlpt: 'N3' },
          { surface: 'は' },
          { surface: '各家庭', reading: 'かくかてい', isKanji: true, jlpt: 'N3' },
          { surface: 'から' },
          { surface: '出ているのです。', reading: 'でているのです', isKanji: true, jlpt: 'N5' }
        ]
      }
    ],
    questions: [
      {
        id: 'q1',
        question: '本文の内容によると、食品ロスの現状について正しいものはどれですか。',
        options: [
          '食品ロスのほとんどはスーパーやレストランから発生している。',
          '食品ロスの約半分は一般の各家庭から出ている。',
          '日本には食品ロスの問題はほとんど存在しない。',
          '一人ひとりが捨てている量は1年に米一粒程度である。'
        ],
        correctIndex: 1,
        explanation: 'Đoạn 2 nêu rõ: "実は、約半分は各家庭から出ているのです。" (Thực chất, khoảng một nửa đến từ từng hộ gia đình).'
      },
      {
        id: 'q2',
        question: '「てまえどり」とはどのような行動ですか。',
        options: [
          '賞味期限が一番長い奥の商品をわざわざ取ること',
          '家にある賞味期限切れの食べ物をすぐに捨てること',
          'すぐに食べるなら、棚の手前にある賞味期限の近いものを選ぶこと',
          'スーパーの店員に商品を家に運んでもらうこと'
        ],
        correctIndex: 2,
        explanation: 'Đoạn 3 giải thích: "棚の奥にある賞味期限の長いものではなく、手前にある賞味期限が近いものから選ぶという取り組みです。"'
      }
    ]
  }
];

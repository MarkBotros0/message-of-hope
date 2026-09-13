// ---------------------------------------------------------------------------
// Message of Hope (رسالة أمل) — real ministry content.
// Source: "Massage of Hope date website.docx" (client-supplied). Only content
// present in that document is used here; anything the document does not provide
// (contact details, photos) is left as PENDING and shown as a placeholder.
//
// The client's document names «أمل جديد» in two places (the خدمة السيدات opening
// paragraph and the Sudanese-refugees paragraph) — it was drafted for the sibling
// organisation. Both now read «رسالة أمل». That substitution is the only edit made
// to the document's wording anywhere in this file.
// ---------------------------------------------------------------------------

/** Marker shown wherever the client still needs to supply real data. */
export const PENDING = '[TO BE CONFIRMED]'

export interface Stat {
  value: string
  label: string
}

export interface ArchivePhoto {
  /** Path under `public/archive/` — web-sized copies of the client's originals. */
  src: string
  alt: string
}

export interface NamedItem {
  title: string
  body: string
  /** Extra clarifying lines the document attaches to this item. */
  notes?: string[]
}

export interface AudienceItem {
  value: string
  /** Percentage share of the programme's focus, where the document gives one. */
  share?: string
  /** هدف رئيسي / هدف فرعي. Kept from the source document, but nothing renders
   *  it — see the note on `AudienceTile`. */
  priority?: string
}

export interface MinistrySection {
  /** URL segment for a sub-ministry (`/mercy/sudanese`). Required on pages with
   *  more than one section so each is linkable from the nav. */
  slug?: string
  /** Heading shown when a page carries more than one sub-ministry. */
  heading?: string
  /** Short label for the sub-ministry tab (falls back to heading). */
  tabLabel?: string
  eyebrow?: string
  intro?: string[]
  stats?: Stat[]
  vision?: string
  /** Overrides the default "رؤيتنا" heading on the vision card — خدمة
   *  السيدات states a programme goal there rather than a vision. */
  visionLabel?: string
  /** A scripture verse the document attaches to the section. Kept, but
   *  nothing renders it — the service pages no longer carry a verse. */
  quote?: { text: string; source: string }
  goals?: { label: string; items: NamedItem[] }
  services?: { label: string; items: string[] }
  audience?: { label: string; items: AudienceItem[] }
  /** Closing paragraph that follows the lists. Kept, but nothing renders it
   *  — on the page it was one lone card hanging under the grids. */
  outro?: string
  /** Photos the client has supplied for this section. They feed the home
   *  carousel; the service pages no longer carry a gallery of their own. */
  archive?: ArchivePhoto[]
}

export interface Ministry {
  slug: string
  navLabel: string
  title: string
  /** One-line summary for the nav menu and the service tiles. Condensed from
   *  this ministry's own source text — no new claims are introduced. */
  navBlurb?: string
  /** Photo leading this service's card on the home page, and its thumbnail in
   *  the الخدمات menu. Each service now has one of its own. */
  cardPhoto?: ArchivePhoto
  sections: MinistrySection[]
}

// ---------------------------------------------------------------------------
// Tab 1 — خدمة الطفل
// ---------------------------------------------------------------------------
const children: Ministry = {
  slug: 'children',
  navLabel: 'الطفل',
  title: 'خدمة الطفل',
  navBlurb:
    'فصول تعليمية ومدرسة صيفية وخدمات صحية وروحية لأطفال القرى الأكثر احتياجًا.',
  cardPhoto: {
    src: '/archive/egyptian-children-class-activities.jpg',
    alt: 'أطفال يتشاركون نشاطًا تعليميًا حول مقعد واحد داخل الفصل.',
  },
  sections: [
    {
      vision:
        'تنطلق خدمة الطفل استجابةً لواقع اجتماعي واقتصادي معقّد تعيشه العديد من الأسر في القرى الفقيرة والمحرومة، حيث تقع هذه الأسر تحت خط الفقر في ظل الارتفاع المستمر لتكاليف المعيشة، بما يحدّ من قدرتها على تلبية الاحتياجات الأساسية للأطفال ويؤثر على استقرارهم الأسري والنفسي؛ كما أن انخفاض جودة التعليم الحكومي يؤدي إلى زيادة احتمالات التسرب، لا سيما لدى الأطفال الذين يواجهون ظروفًا أسرية ضاغطة مثل اليُتم أو نشأتهم في بيئات يعاني فيها أحد الوالدين من الإدمان، وهو ما ينعكس على بناء صورتهم الذاتية وأنماط التعلّق لديهم؛ وإلى جانب ذلك، يتعرّض الأطفال في هذه السياقات لمخاطر حماية متعددة تشمل التنمر والتحرش وصعوبات التعلّم، فضلًا عن أمراض مرتبطة بسوء التغذية نتيجة محدودية الموارد، كما تدفع الضغوط الاقتصادية بعض الأسر إلى انخراط أطفالها في سوق العمل مبكرًا بما يشكّل انتهاكًا لحقوقهم التعليمية، وفي بعض الحالات يتعرّض الأطفال لأشكال من العنف أو الاستغلال الجنسي مما يستدعي تدخلًا تكامليًا يركّز على الحماية والدعم النفسي والاجتماعي وتحسين فرص التعلّم والصحة لضمان نمو آمن وشامل.',
      stats: [
        { value: '٤ مرات أسبوعيًا بواقع ٨ ساعات', label: 'الفصل التعليمي' },
      ],
      goals: {
        label: 'أهداف خدمة الطفل',
        items: [
          {
            title: 'الهدف الروحي',
            body: 'أن يعرف الطفل الله أكثر، ويرتبط بالكتاب المقدس وبالكنيسة. عن طريق منهج مستمر أثناء السنة الدراسية (قصص كتاب مقدس) والمدرسة الصيفية، بالإضافة إلى توزيع كتاب مقدس على أطفال المستوى الثالث.',
          },
          {
            title: 'الهدف التعليمي',
            body: 'ينقسم إلى ٣ مجالات (الأكاديمي – السلوكيات – تنمية مهارات).',
            notes: [
              'النهوض بمستوى الطفل الأكاديمي يتم ذلك عن طريق الفصل بمنهاج تم تحضيره وتطويره على فترات، الفصل: ٤ مرات أسبوعيًا بواقع ٨ ساعات أسبوعيًا.',
              'هدفا السلوكيات وتنمية المهارات يتم العمل عليهما من خلال المدرسة الصيفية.',
              'تنمية مهارات الطفل خلال أنشطة المدرسة الصيفية مثل (ألعاب ذكاء – أشغال يدوية – ألعاب منتسوري)، أيضًا بمنهج قيم وأخلاق بالمدرسة الصيفية.',
            ],
          },
          {
            title: 'الهدف النفسي',
            body: 'التوعية النفسية للأطفال يتم ذلك خلال فترة الصيف عن طريق ألعاب وأنشطة مناسبة للأطفال، كما أننا نحرص على أن يتلقى الطفل معاملة جيدة بالفصل وأن تصل له محبة عملية من المنسقة.',
          },
          {
            title: 'الهدف الصحي',
            body: 'التوعية الصحية للأطفال، والتدخل الطبي للحالات التي تستدعي ذلك، أو اكتشاف مبكر للأمراض وذلك عن طريق القوافل الطبية والكشوفات والعمليات.',
          },
        ],
      },
      services: {
        label: 'الخدمات المقدَّمة للأطفال المصريين',
        items: [
          'فصول تعليمية للأطفال تقدم منهجًا متكاملًا (تعليمي – روحي – نفسي – صحي)',
          'الخدمات الصحية (كشف – تحاليل – علاج – عمليات)',
          'المستلزمات المدرسية (شنطة وأدوات)',
          'مدرسة صيفية لممارسة الأنشطة وحماية الأطفال من الانخراط في الشارع أثناء الإجازة الصيفية',
          'برامج تدريب للمدرسين العاملين بالفصول التعليمية',
          'تقديم كتب مقدسة مصورة للأطفال',
          'مؤتمرات روحية وترفيهية للأطفال',
          'مؤتمرات روحية للمدرسين',
          'مجموعات روحية لفريق عمل الخدمة',
        ],
      },
      audience: {
        label: 'الفئات المستهدفة',
        items: [
          {
            value:
              'الأطفال في مرحلة التعليم الابتدائي من سن ٦ إلى ٩ سنوات (من الصف الأول إلى الثالث الابتدائي)',
            share: '٤٠٪',
            priority: 'هدف رئيسي',
          },
          {
            value: 'منسقو فصول الأطفال (خدام الكنائس المخدومة)',
            share: '٣٠٪',
            priority: 'هدف رئيسي',
          },
          { value: 'فريق مشرفي الفصول', share: '٢٥٪', priority: 'هدف رئيسي' },
          { value: 'أسرة الطفل', share: '٥٪', priority: 'هدف فرعي' },
        ],
      },
      archive: [
        {
          src: '/archive/egyptian-children-class-activities.jpg',
          alt: 'أطفال يتشاركون نشاطًا تعليميًا حول مقعد واحد داخل الفصل.',
        },
        {
          src: '/archive/egyptian-children-teacher-with-child.jpg',
          alt: 'مدرّسة تشرح مسألة رياضيات لطفل أمام السبورة.',
        },
        // Last of the three lands in the wide banner tile, so it is the one
        // whose subject survives a letterbox crop.
        {
          src: '/archive/egyptian-children-praying-in-class.jpg',
          alt: 'أطفال يقفون للصلاة مع مشرفتهم في بداية اليوم الدراسي.',
        },
      ],
    },
  ],
}

// ---------------------------------------------------------------------------
// Tab 2 — خدمة السيدات. The client's document calls this one خدمة المرأة; the
// service was renamed after it was written, so the name is updated wherever it
// appears while the rest of the paragraph stays verbatim. The URL stays
// /women, since the links to it are already out.
// ---------------------------------------------------------------------------
const women: Ministry = {
  slug: 'women',
  navLabel: 'السيدات',
  title: 'خدمة السيدات',
  navBlurb:
    'تلمذة ومجموعات دعم وتمكين اقتصادي للسيدات المعيلات واللاجئات.',
  cardPhoto: {
    src: '/archive/women-praise-meeting.jpg',
    alt: 'سيدات في اجتماع تسبيح داخل قاعة الخدمة، وفريق التسبيح يقود من الأمام.',
  },
  sections: [
    {
      heading: 'نبذة عن البرنامج',
      intro: [
        'انطلقت خدمة السيدات في خدمة رسالة أمل استجابةً لاحتياجات النساء اللاتي يتحملن مسؤولية إعالة أسرهن في ظروف حياتية صعبة، سواء من السيدات المعيلات في المجتمعات المحلية أو السيدات اللاجئات اللاتي يواجهن تحديات اقتصادية واجتماعية وروحية نتيجة ظروف النزوح واللجوء.',
      ],
      stats: [{ value: 'من ١٨ إلى ٤٥ عامًا', label: 'الفئة العمرية' }],
      visionLabel: 'هدف البرنامج',
      vision:
        'يهدف البرنامج إلى إظهار محبة المسيح بصورة عملية، ومرافقة السيدات في رحلة متكاملة من التلمذة والتمكين، من خلال تنمية حياتهن الروحية، وبناء مجتمعات داعمة قائمة على المساندة المتبادلة، وتعزيز قدراتهن الاقتصادية، بما يمكنهن من مواجهة تحديات الحياة وإعالة أسرهن بكرامة ورجاء، وبناء مستقبل أفضل لهن ولأبنائهن.',
      services: {
        label: 'الخدمات المقدمة',
        items: [
          'التلمذة والنمو الروحي',
          'مجموعات الدعم والمساندة المتبادلة',
          'التدريب والتمكين الاقتصادي من خلال نماذج متنوعة تتناسب مع احتياجات الفئات المستهدفة، مثل دعم المشروعات الصغيرة، ومجموعات الادخار المجتمعية، وغيرها من المبادرات المناسبة للسياق المحلي',
          'المتابعة والإرشاد',
          'دعم تعليم الأبناء (وفقًا لأولويات البرنامج وموارده)',
        ],
      },
      audience: {
        label: 'الفئات المستهدفة',
        items: [
          {
            value:
              'السيدات اللاتي يتحملن مسؤولية إعالة أسرهن بسبب: (وفاة الزوج/ الطلاق أو الانفصال/ الإعاقة/ الهجر/ السجن/ أو أي سبب آخر أدى إلى غياب العائل)',
          },
          {
            value:
              'السيدات اللاجئات اللاتي يحتجن إلى الدعم الروحي والاجتماعي والاقتصادي لبناء حياة أكثر استقرارًا لهن ولأسرهن.',
          },
        ],
      },
      archive: [
        {
          src: '/archive/women-praise-meeting.jpg',
          alt: 'سيدات في اجتماع تسبيح داخل قاعة الخدمة، وفريق التسبيح يقود من الأمام.',
        },
      ],
    },
  ],
}

// ---------------------------------------------------------------------------
// Tab 3 — خدمة الرحمة. Two sub-sections on one page: the mercy ministry itself
// and the humanitarian response to Sudanese refugees in Egypt.
// ---------------------------------------------------------------------------
const mercy: Ministry = {
  slug: 'mercy',
  navLabel: 'الرحمة',
  title: 'خدمة الرحمة',
  navBlurb:
    'دعم إنساني عملي للأسر الأكثر احتياجًا، وللاجئين السودانيين في مصر.',
  cardPhoto: {
    src: '/archive/mercy-house-before-roof-courtyard.jpg',
    alt: 'منزل ريفي قبل الترميم، سقفه من جريد النخل وأخشاب متهالكة يتسرّب منها الضوء.',
  },
  sections: [
    {
      slug: 'relief',
      eyebrow: 'خدمة الرحمة',
      heading: 'خدمة الرحمة',
      tabLabel: 'خدمة الرحمة',
      intro: [
        'إلى جانب خدمتها الروحية، تسعى الخدمة إلى مساندة الأسر والمجتمعات الأكثر احتياجًا من خلال تقديم الدعم الإنساني والعملي، والتعبير عن محبة المسيح من خلال خدمة الإنسان وتلبية احتياجاته الأساسية.',
        'تهدف خدمة الرحمة إلى مساندة الأسر التي تواجه ظروفًا معيشية صعبة، من خلال الاستجابة لاحتياجاتها الأساسية، وتحسين ظروفها المعيشية، ودعم قدرتها على تحقيق قدر أكبر من الاستقرار والاستقلال، إلى جانب مشاركة رسالة الرجاء في المسيح.',
        'في أعقاب عام ٢٠١١، ازدادت معدلات الفقر في العديد من مناطق صعيد مصر، كما واجهت بعض العائلات المسيحية ظروفًا صعبة نتيجة الاضطهاد والعنف. واستجابةً لهذه الاحتياجات، أطلقت خدمة الرحمة في مصر عام ٢٠١٣.',
      ],
      quote: {
        text: '«لأني جعت فأطعمتموني، عطشت فسقيتموني، كنت غريبًا فآويتموني»',
        source: 'متى ٢٥: ٣٥–٤٠',
      },
      services: {
        label: 'الخدمات المقدمة',
        items: [
          'توزيع الطرود الغذائية',
          'تحسين ظروف السكن، مثل بناء الأسقف وإنشاء دورات المياه',
          'توصيل المياه إلى المنازل التي تفتقر إلى الخدمات الأساسية',
          'مساعدة بعض الأسر على إنشاء مشروعات صغيرة مدرة للدخل، وفق معايير محددة، مع مساهمة من الأسرة ومتابعة المشروع خلال فترة التأسيس',
        ],
      },
      outro:
        'ومن خلال هذه المبادرات، تسعى الخدمة إلى مساندة الأسر في احتياجاتها اليومية، والمساهمة في تحسين ظروفها المعيشية، والتعبير عمليًا عن محبة المسيح.',
      // The services list above, photographed: the housing the ministry finds
      // families in, and one of the small income-generating projects it helps
      // them set up.
      archive: [
        {
          src: '/archive/mercy-house-before-roof-courtyard.jpg',
          alt: 'حجرة في منزل ريفي قبل الترميم، يغطيها سقف من جريد النخل وأخشاب متهالكة يتسرّب منها ضوء الشمس.',
        },
        {
          src: '/archive/mercy-village-home-interior.jpg',
          alt: 'داخل منزل ريفي من الطوب اللبن، تتناثر على جدرانه صور وأيقونات، ويضيئه ضوء نافذة واحدة.',
        },
        {
          src: '/archive/mercy-sewing-microproject.jpg',
          alt: 'سيدة تعمل على ماكينة خياطة صناعية داخل منزلها، ضمن مشروع صغير مدرّ للدخل.',
        },
      ],
    },
    {
      slug: 'sudanese',
      eyebrow: 'خدمة الرحمة',
      heading: 'اللاجئون السودانيون في مصر',
      tabLabel: 'اللاجئون السودانيون',
      intro: [
        'مع وصول أعداد كبيرة من اللاجئين السودانيين إلى مصر، بدأت رسالة أمل في تقديم دعم إنساني للأسر الأكثر احتياجًا، استجابةً للظروف الصعبة التي يواجهها العديد من اللاجئين.',
      ],
      services: {
        label: 'الخدمات المقدمة',
        items: [
          'توزيع طرود غذائية شهرية لمئات الأسر',
          'تنظيم قوافل طبية مجانية بالتعاون مع أطباء سودانيين، تشمل الفحوصات الطبية، وتوفير الأدوية، وخدمات فحص النظر',
        ],
      },
    },
  ],
}

export const ministries: Ministry[] = [children, women, mercy]

export function getMinistry(slug: string | undefined): Ministry | undefined {
  return ministries.find((m) => m.slug === slug)
}

/** Which sub-ministry the `:sub` URL segment selects; falls back to the first
 *  so an unknown or missing segment still renders a real page. */
export function sectionIndex(ministry: Ministry, sub: string | undefined): number {
  const i = ministry.sections.findIndex((s) => s.slug === sub)
  return i === -1 ? 0 : i
}

export function sectionPath(ministry: Ministry, section: MinistrySection): string {
  return section.slug ? `/${ministry.slug}/${section.slug}` : `/${ministry.slug}`
}

export interface NavNode {
  label: string
  path: string
  blurb?: string
  /** The service's card photo, used by the home page's service tiles. */
  photo?: ArchivePhoto
  children?: NavNode[]
}

/** The الخدمات menu, derived from the ministries so the two never drift. */
export const serviceNav: NavNode[] = ministries.map((m) => ({
  label: m.navLabel,
  path: `/${m.slug}`,
  blurb: m.navBlurb,
  photo: m.cardPhoto,
  children:
    m.sections.length > 1
      ? m.sections.map((s) => ({
          label: s.tabLabel ?? s.heading ?? '',
          path: sectionPath(m, s),
        }))
      : undefined,
}))

/** Site-level copy for the home and من نحن pages. Both lines condense the three
 *  ministries' own text. */
export const site = {
  name: 'رسالة أمل',
  tagline: 'خدمة الطفل · خدمة السيدات · خدمة الرحمة',
  intro:
    'نعمل مع الأسر والمجتمعات الأكثر احتياجًا في مصر: أطفال القرى الفقيرة، والسيدات اللاتي يتحملن مسؤولية إعالة أسرهن، والأسر واللاجئون الذين يحتاجون إلى دعم إنساني عملي.',
} as const

/** Every photo the client has supplied, in ministry order. The home carousel
 *  and the من نحن puzzle are the two places they are all shown together. */
export const highlightPhotos: ArchivePhoto[] = ministries.flatMap((m) =>
  m.sections.flatMap((s) => s.archive ?? []),
)

/** One piece of the من نحن banner: a ministry's photo, with the ministry it
 *  belongs to for the banner's accessible name. */
export interface PuzzlePieceContent {
  label: string
  /** Path under `public/archive/`. */
  src: string
}

// The seven archive photos as puzzle pieces, named by ministry and shot so
// the two arrangements below can be read at a glance.
const piece = (label: string, src: string): PuzzlePieceContent => ({ label, src })
const child1 = piece('خدمة الطفل', '/archive/egyptian-children-class-activities.jpg')
const child2 = piece('خدمة الطفل', '/archive/egyptian-children-teacher-with-child.jpg')
const child3 = piece('خدمة الطفل', '/archive/egyptian-children-praying-in-class.jpg')
const women1 = piece('خدمة السيدات', '/archive/women-praise-meeting.jpg')
const mercy1 = piece('خدمة الرحمة', '/archive/mercy-house-before-roof-courtyard.jpg')
const mercy2 = piece('خدمة الرحمة', '/archive/mercy-village-home-interior.jpg')
const mercy3 = piece('خدمة الرحمة', '/archive/mercy-sewing-microproject.jpg')

/** The من نحن banner from `sm` up: a 5 × 3 jigsaw of the three ministries.
 *  Each list reads right to left, top row first. With seven photos for
 *  fifteen pieces every shot appears twice and the السيدات photo — the only
 *  one that service has — a third time, in the corners and the centre. The
 *  order keeps ministries apart: no piece shares an edge with another of its
 *  own ministry, and no photo touches its own repeat, even at a corner. */
export const servicePuzzleWide: PuzzlePieceContent[] = [
  women1, mercy1, child1, mercy2, child2,
  mercy2, child2, women1, child3, mercy1,
  child3, mercy3, child1, mercy3, women1,
]

/** The same banner on phones: 2 × 4, every photo once and the السيدات photo
 *  again at the opposite end of its column. A separate order rather than a
 *  prefix of the wide one — with only three ministries, no single sequence
 *  keeps them apart in both grids. */
export const servicePuzzleNarrow: PuzzlePieceContent[] = [
  women1, child1,
  child2, mercy1,
  mercy2, child3,
  women1, mercy3,
]

/** A named statement — one of the قيم the work is held to. */
export interface Tenet {
  title: string
  /** The English name the client's document gives alongside the Arabic. Kept
   *  in the data but not drawn: the tiles take the Arabic alone. */
  titleEn: string
  body: string
}

// ---------------------------------------------------------------------------
// من نحن — the organisation's own statement of identity: vision, mission, and
// the seven values it is held to. This is the shared statement of purpose,
// carried across from أمل جديد's document with the organisation's own name in
// place of theirs; nothing is paraphrased beyond that substitution.
// ---------------------------------------------------------------------------
export const about = {
  vision:
    'أن نمجّد الله من خلال الوصول إلى المحتاجيين لرسالة الرجاء في المسيح.',
  mission: [
    'نلتزم في رسالة أمل بأن نُعلن محبة المسيح ورجاءه في كنائسنا، من خلال الوصول للناس غير الموصول إليهم برسالة الإنجيل، ومرافقتهم في مسيرة تلمذة حيّة، وتمكين الكنائس لتعيش دعوتها وتخدم مجتمعاتها بفعالية.',
    'نحرص أن نحقق هذا الالتزام بالشراكة مع الكنائس المحلية، وبطرق تحترم السياقات الثقافية والاجتماعية، وتُراعي احتياجات الأفراد والمجتمعات.',
  ],
  values: [
    {
      title: 'النزاهة',
      titleEn: 'Integrity',
      body: 'نلتزم بالشفافية والأمانة في خدمتنا وعلاقاتنا ووقتنا ومواردنا أمام الله والآخرين.',
    },
    {
      title: 'المسؤولية',
      titleEn: 'Accountability',
      body: 'نلتزم بمحاسبة بعضنا البعض بالمحبة ووضع أهداف للمشاريع وفريق العمل نعمل معًا لتحقيقها.',
    },
    {
      title: 'القيادة الخادمة',
      titleEn: 'Servant Leadership',
      body: 'قيادتنا الخدمية ملتزمة بالخدمة بمحبة وتواضع وصدق ودعم وتوجيه وكرم وغفران وانضباط ذاتي.',
    },
    {
      title: 'العمل الجماعي',
      titleEn: 'Teamwork',
      body: 'فريقنا هو أعظم أصولنا. معًا نشكل جزءًا من جسد المسيح، نحترم تميز كل منا، ونسعى للعيش وفق تعاليم المسيح.',
    },
    {
      title: 'الشراكة',
      titleEn: 'Partnership',
      body: 'نلتزم بالشراكة مع الكنائس المحلية والمنظمات ذات التفكير المماثل لنشر أمل ومحبة المسيح.',
    },
    {
      title: 'الإبداع',
      titleEn: 'Creativity',
      body: 'ندعم ونشجع النهج الإبداعي والمبتكر الذي يعكس قلب يسوع في الخدمة.',
    },
    {
      title: 'الرحمة',
      titleEn: 'Compassion',
      body: 'نلتزم باتباع مثال يسوع الذي تأثر بالرحمة تجاه احتياجات البشر في عالم ساقط، بمحبة ومساعدة المهمشين والمضطهدين دينيًا أو اجتماعيًا.',
    },
  ] as Tenet[],
}

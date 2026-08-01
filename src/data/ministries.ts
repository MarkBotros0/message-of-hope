export interface Servant {
  name: string
  role: string
}

export interface ScheduleItem {
  label: string
  time: string
}

export interface Contact {
  phones: string[]
  /** Digits only, for wa.me links (e.g. "201001234567") */
  whatsapp: string
  email: string
}

export interface Ministry {
  slug: string
  navLabel: string
  eyebrow: string
  title: string
  description: string
  vision?: string
  visionBy?: string
  servants: Servant[]
  schedule: ScheduleItem[]
  location?: string
  contact?: Contact
  archiveSlots: number
}

/** A ministry counts as "published" when it has real body content to show. */
export function isPublished(m: Ministry): boolean {
  return (
    m.servants.length > 0 ||
    m.schedule.length > 0 ||
    Boolean(m.vision) ||
    Boolean(m.contact)
  )
}

const youth: Ministry = {
  slug: 'youth',
  navLabel: 'الشباب',
  eyebrow: 'من خدماتنا',
  title: 'خدمة الشباب',
  description:
    'مساحةٌ أسبوعيةٌ للشباب من ١٨ إلى ٣٠ سنة، نلتقي فيها حول الكلمة والصلاة والحياة معًا. نتشارك أسئلتنا الحقيقية، ونبني علاقاتٍ تدوم، ونخدم مدينتنا يدًا بيد.',
  vision: 'أن يكتشف كل شابٍّ أنه محبوبٌ ومدعوٌّ لحياةٍ لها معنى.',
  visionBy: 'رؤية الخدمة',
  servants: [
    { name: 'مريم فؤاد', role: 'خدمة البنات' },
    { name: 'مينا سمير', role: 'خادم الخدمة' },
    { name: 'كيرلس عادل', role: 'الترانيم والمديح' },
    { name: 'جورج حنا', role: 'التعليم والدراسة' },
  ],
  schedule: [
    { label: 'الاجتماع الأسبوعي', time: 'كل جمعة ٧:٠٠ مساءً' },
    { label: 'مجموعات صغيرة', time: 'الثلاثاء ٦:٣٠ مساءً' },
  ],
  location: 'قاعة الشباب – الدور الأول، مبنى الخدمات',
  contact: {
    phones: ['٠١٢٣ ٤٥٦ ٧٨٩٠', '٠١٢٣ ٤٥٦ ٧٨٩١'],
    whatsapp: '201234567890',
    email: 'shabab@risalatamal.org',
  },
  archiveSlots: 4,
}

/** Other ministries — same layout, content coming soon. */
function stub(slug: string, navLabel: string, title: string): Ministry {
  return {
    slug,
    navLabel,
    eyebrow: 'من خدماتنا',
    title,
    description: `سيتوفّر محتوى ${title} قريبًا بإذن الله.`,
    servants: [],
    schedule: [],
    archiveSlots: 0,
  }
}

export const ministries: Ministry[] = [
  youth,
  stub('kids', 'الأطفال', 'خدمة الأطفال'),
  stub('hymns', 'الترانيم', 'خدمة الترانيم'),
  stub('visitation', 'الافتقاد', 'خدمة الافتقاد'),
  stub('women', 'السيدات', 'خدمة السيدات'),
  stub('study', 'دراسة', 'خدمة الدراسة'),
]

export function getMinistry(slug: string | undefined): Ministry | undefined {
  return ministries.find((m) => m.slug === slug)
}

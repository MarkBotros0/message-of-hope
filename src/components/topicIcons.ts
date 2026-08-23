import {
  Ambulance,
  Backpack,
  BookOpen,
  Briefcase,
  Church,
  Compass,
  Droplets,
  GraduationCap,
  HeartHandshake,
  House,
  PartyPopper,
  PiggyBank,
  Presentation,
  School,
  ShoppingBasket,
  Sprout,
  Stethoscope,
  Sun,
  UsersRound,
  type LucideIcon,
} from 'lucide-react'

/** One icon per entry in a ministry's services list, each saying something
 *  about that service in particular — a stethoscope for the medical work, a
 *  backpack for the school kit — rather than the same tick nine times over.
 *  Keyed on the client's own wording, so an edited line falls back to the tick
 *  rather than keeping an icon that no longer fits. */
const icons: Record<string, LucideIcon> = {
  // خدمة الطفل المصري
  'فصول تعليمية للأطفال تقدم منهجًا متكاملًا (تعليمي – روحي – نفسي – صحي)':
    GraduationCap,
  'الخدمات الصحية (كشف – تحاليل – علاج – عمليات)': Stethoscope,
  'المستلزمات المدرسية (شنطة وأدوات)': Backpack,
  'مدرسة صيفية لممارسة الأنشطة وحماية الأطفال من الانخراط في الشارع أثناء الإجازة الصيفية':
    Sun,
  'برامج تدريب للمدرسين العاملين بالفصول التعليمية': Presentation,
  'تقديم كتب مقدسة مصورة للأطفال': BookOpen,
  'مؤتمرات روحية وترفيهية للأطفال': PartyPopper,
  'مؤتمرات روحية للمدرسين': Church,
  'مجموعات روحية لفريق عمل الخدمة': UsersRound,

  // خدمة السيدات
  'التلمذة والنمو الروحي': Sprout,
  'مجموعات الدعم والمساندة المتبادلة': HeartHandshake,
  'التدريب والتمكين الاقتصادي من خلال نماذج متنوعة تتناسب مع احتياجات الفئات المستهدفة، مثل دعم المشروعات الصغيرة، ومجموعات الادخار المجتمعية (Saving Groups)، وغيرها من المبادرات المناسبة للسياق المحلي':
    PiggyBank,
  'المتابعة والإرشاد': Compass,
  'دعم تعليم الأبناء (وفقًا لأولويات البرنامج وموارده)': School,

  // خدمة الرحمة
  'توزيع الطرود الغذائية': ShoppingBasket,
  'تحسين ظروف السكن، مثل بناء الأسقف وإنشاء دورات المياه': House,
  'توصيل المياه إلى المنازل التي تفتقر إلى الخدمات الأساسية': Droplets,
  'مساعدة بعض الأسر على إنشاء مشروعات صغيرة مدرة للدخل، وفق معايير محددة، مع مساهمة من الأسرة ومتابعة المشروع خلال فترة التأسيس':
    Briefcase,

  // اللاجئون السودانيون
  'توزيع طرود غذائية شهرية لمئات الأسر': ShoppingBasket,
  'تنظيم قوافل طبية مجانية بالتعاون مع أطباء سودانيين، تشمل الفحوصات الطبية، وتوفير الأدوية، وخدمات فحص النظر':
    Ambulance,
}

export function topicIcon(label: string): LucideIcon | undefined {
  return icons[label]
}

import { Link, useParams } from 'react-router-dom'
import { getMinistry } from '../data/ministries'
import { MinistryLayout } from '../components/MinistryLayout'

export function MinistryPage() {
  const { slug } = useParams()
  const ministry = getMinistry(slug)

  if (!ministry) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
        <h1 className="text-2xl font-black text-ink">الصفحة غير موجودة</h1>
        <p className="mt-3 text-body">لم نتمكّن من العثور على هذه الخدمة.</p>
        <Link
          to="/youth"
          className="mt-6 inline-block rounded-full bg-brand px-6 py-2.5 text-sm font-bold text-white hover:bg-brand-dark"
        >
          العودة إلى خدمة الشباب
        </Link>
      </main>
    )
  }

  return <MinistryLayout ministry={ministry} />
}

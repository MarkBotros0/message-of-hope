import { Link, useParams } from 'react-router-dom'
import { getMinistry } from '../data/ministries'
import { MinistryLayout } from '../components/MinistryLayout'

export function MinistryPage() {
  const { slug, sub } = useParams()
  const ministry = getMinistry(slug)

  if (!ministry) {
    return (
      <main id="main" className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
        <h1 className="text-3xl font-extrabold">الصفحة غير موجودة</h1>
        <p className="mt-3 text-body">لم نتمكّن من العثور على هذه الخدمة.</p>
        <Link
          to="/"
          className="mt-6 inline-flex min-h-12 items-center rounded-xl bg-brand px-7 text-sm font-bold text-white transition hover:bg-brand-dark"
        >
          العودة إلى الصفحة الرئيسية
        </Link>
      </main>
    )
  }

  return <MinistryLayout ministry={ministry} sub={sub} />
}

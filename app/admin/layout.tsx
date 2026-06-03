import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const adminToken = cookieStore.get('admin_token')?.value

  if (adminToken !== process.env.ADMIN_SECRET) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-cream-100">
      <div className="bg-teal-900 text-white px-6 py-3 flex items-center justify-between">
        <span className="text-sm font-semibold">FunctionalMD Admin</span>
        <a href="/" className="text-xs text-teal-300 hover:text-white transition-colors">← Back to site</a>
      </div>
      {children}
    </div>
  )
}

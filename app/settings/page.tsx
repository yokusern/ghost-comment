'use client'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

export default function SettingsPage() {
  const { user, userDoc, loading } = useAuth()
  const router = useRouter()

  const startCheckout = async () => {
    if (!user) return
    const token = await user.getIdToken()
    const res = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    })
    const { url } = await res.json()
    if (url) window.location.href = url
  }

  if (loading) return (
    <div className="min-h-screen bg-[#0d0d1a] flex items-center justify-center">
      <div className="text-white/40">読み込み中…</div>
    </div>
  )

  if (!user) { router.push('/dashboard'); return null }

  return (
    <div className="min-h-screen bg-[#0d0d1a] text-white">
      <header className="border-b border-white/10 px-6 py-4 flex items-center gap-4">
        <button onClick={() => router.push('/dashboard')} className="text-white/40 hover:text-white transition-colors text-sm">
          ← ダッシュボード
        </button>
        <span className="text-white/20">/</span>
        <h1 className="font-semibold">設定</h1>
      </header>

      <main className="max-w-lg mx-auto px-6 py-8">
        {/* Account */}
        <section className="bg-white/5 border border-white/10 rounded-xl p-5 mb-4">
          <h2 className="text-sm font-semibold mb-3 text-white/80">アカウント</h2>
          <div className="flex items-center gap-3">
            {user.photoURL && <img src={user.photoURL} alt="" className="w-10 h-10 rounded-full" />}
            <div>
              <p className="text-sm text-white">{user.displayName}</p>
              <p className="text-xs text-white/40">{user.email}</p>
            </div>
          </div>
        </section>

        {/* Plan */}
        <section className="bg-white/5 border border-white/10 rounded-xl p-5">
          <h2 className="text-sm font-semibold mb-4 text-white/80">プラン</h2>
          {userDoc?.plan === 'pro' ? (
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-bold text-[#A78BFA]">Pro プラン</span>
                <p className="text-xs text-white/40 mt-0.5">¥980/月 — 全機能使用中</p>
              </div>
              <span className="text-xs px-2 py-1 bg-[#A78BFA]/20 text-[#A78BFA] rounded-full border border-[#A78BFA]/30">有効</span>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-sm font-bold text-white">Free プラン</span>
                  <p className="text-xs text-white/40 mt-0.5">1サイト / 月30件まで</p>
                </div>
              </div>
              <div className="bg-[#A78BFA]/10 border border-[#A78BFA]/30 rounded-xl p-4 mb-4">
                <p className="text-sm font-semibold text-[#A78BFA] mb-2">Pro にアップグレード — ¥980/月</p>
                <ul className="text-xs text-white/60 space-y-1">
                  <li>✓ フィードバック無制限</li>
                  <li>✓ 複数サイト管理</li>
                  <li>✓ Claude AI 感情分析</li>
                  <li>✓ CSV出力</li>
                  <li>✓ 「Powered by Ghost Comment」非表示</li>
                </ul>
              </div>
              <button
                onClick={startCheckout}
                className="w-full bg-[#A78BFA] text-white py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                Pro にアップグレード
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

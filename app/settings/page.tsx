'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useAuth } from '@/hooks/useAuth'
import type { Project } from '@/types'

export default function SettingsPage() {
  const { user, userDoc, loading } = useAuth()
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [slackInputs, setSlackInputs] = useState<Record<string, string>>({})
  const [savingSlack, setSavingSlack] = useState<Record<string, boolean>>({})
  const [slackMsg, setSlackMsg] = useState<Record<string, string>>({})

  useEffect(() => {
    if (!user) return
    getDocs(query(collection(db, 'projects'), where('ownerUid', '==', user.uid))).then(snap => {
      const ps = snap.docs.map(d => ({ id: d.id, ...d.data() }) as Project)
      setProjects(ps)
      const inputs: Record<string, string> = {}
      ps.forEach(p => { inputs[p.id] = p.slackWebhookUrl || '' })
      setSlackInputs(inputs)
    })
  }, [user])

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

  const saveSlack = async (projectId: string) => {
    if (!user) return
    setSavingSlack(prev => ({ ...prev, [projectId]: true }))
    const token = await user.getIdToken()
    const res = await fetch('/api/settings/slack', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ projectId, slackWebhookUrl: slackInputs[projectId] }),
    })
    setSavingSlack(prev => ({ ...prev, [projectId]: false }))
    setSlackMsg(prev => ({ ...prev, [projectId]: res.ok ? '保存しました ✓' : '保存に失敗しました' }))
    setTimeout(() => setSlackMsg(prev => ({ ...prev, [projectId]: '' })), 3000)
  }

  if (loading) return (
    <div className="min-h-screen bg-[#0d0d1a] flex items-center justify-center">
      <div className="text-white/40">読み込み中…</div>
    </div>
  )
  if (!user) { router.push('/dashboard'); return null }

  const isPro = userDoc?.plan === 'pro'

  return (
    <div className="min-h-screen bg-[#0d0d1a] text-white">
      <header className="border-b border-white/10 px-6 py-4 flex items-center gap-4">
        <button onClick={() => router.push('/dashboard')} className="text-white/40 hover:text-white transition-colors text-sm">
          ← ダッシュボード
        </button>
        <span className="text-white/20">/</span>
        <h1 className="font-semibold">設定</h1>
      </header>

      <main className="max-w-lg mx-auto px-6 py-8 space-y-4">

        {/* Account */}
        <section className="bg-white/5 border border-white/10 rounded-xl p-5">
          <h2 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">アカウント</h2>
          <div className="flex items-center gap-3">
            {user.photoURL && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.photoURL} alt="" className="w-10 h-10 rounded-full" />
            )}
            <div>
              <p className="text-sm text-white">{user.displayName}</p>
              <p className="text-xs text-white/40">{user.email}</p>
            </div>
          </div>
        </section>

        {/* Plan */}
        <section className="bg-white/5 border border-white/10 rounded-xl p-5">
          <h2 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-4">プラン</h2>
          {isPro ? (
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
                  <li>✓ フィードバック無制限 · 複数サイト</li>
                  <li>✓ Claude AI 感情分析</li>
                  <li>✓ 週次AIサマリー（毎週月曜）</li>
                  <li>✓ Slack通知 · CSV出力</li>
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

        {/* Slack Notifications — Pro only */}
        <section className={`border rounded-xl p-5 ${isPro ? 'bg-white/5 border-white/10' : 'bg-white/2 border-white/5 opacity-50'}`}>
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-xs font-semibold text-white/50 uppercase tracking-wider">Slack 通知</h2>
            {!isPro && (
              <span className="text-xs bg-[#A78BFA]/20 text-[#A78BFA] px-2 py-0.5 rounded-full border border-[#A78BFA]/30">Pro</span>
            )}
          </div>
          <p className="text-white/35 text-xs mb-4">
            フィードバックが届いたら即Slack通知。プロジェクトごとに設定できます。
          </p>
          {isPro ? (
            <div className="space-y-4">
              {projects.map(p => (
                <div key={p.id}>
                  <p className="text-xs text-white/60 mb-1.5">{p.name}</p>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={slackInputs[p.id] || ''}
                      onChange={e => setSlackInputs(prev => ({ ...prev, [p.id]: e.target.value }))}
                      placeholder="https://hooks.slack.com/services/..."
                      className="flex-1 bg-black/30 border border-white/15 rounded-lg px-3 py-2 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-[#A78BFA]/50 font-mono"
                      disabled={!isPro}
                    />
                    <button
                      onClick={() => saveSlack(p.id)}
                      disabled={savingSlack[p.id] || !isPro}
                      className="shrink-0 bg-[#A78BFA] text-white text-xs px-4 py-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      {savingSlack[p.id] ? '…' : '保存'}
                    </button>
                  </div>
                  {slackMsg[p.id] && (
                    <p className={`text-xs mt-1 ${slackMsg[p.id].includes('✓') ? 'text-green-400' : 'text-red-400'}`}>
                      {slackMsg[p.id]}
                    </p>
                  )}
                </div>
              ))}
              <p className="text-white/25 text-xs">
                SlackでIncoming Webhooksを有効化 →{' '}
                <a
                  href="https://api.slack.com/messaging/webhooks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#A78BFA]/60 hover:text-[#A78BFA] underline"
                >
                  設定方法
                </a>
              </p>
            </div>
          ) : (
            <p className="text-white/30 text-xs">Pro プランで利用できます</p>
          )}
        </section>

        {/* Weekly Summary info */}
        <section className={`border rounded-xl p-5 ${isPro ? 'bg-white/5 border-white/10' : 'bg-white/2 border-white/5 opacity-50'}`}>
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-xs font-semibold text-white/50 uppercase tracking-wider">週次AIサマリー</h2>
            {!isPro && (
              <span className="text-xs bg-[#A78BFA]/20 text-[#A78BFA] px-2 py-0.5 rounded-full border border-[#A78BFA]/30">Pro</span>
            )}
          </div>
          <p className="text-white/35 text-xs leading-relaxed">
            毎週月曜の朝9時（JST）に、Claudeが先週のフィードバックを自動要約します。<br />
            Slack通知を設定済みの場合はそちらにも配信されます。<br />
            ダッシュボードのサマリーパネルでいつでも確認できます。
          </p>
        </section>

      </main>
    </div>
  )
}

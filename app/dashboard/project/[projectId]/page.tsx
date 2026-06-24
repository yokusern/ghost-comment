'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { collection, query, orderBy, getDocs, doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useAuth } from '@/hooks/useAuth'
import FeedbackCard from '@/components/Dashboard/FeedbackCard'
import StatsPanel from '@/components/Dashboard/StatsPanel'
import type { Feedback, Project } from '@/types'

export default function ProjectPage() {
  const { projectId } = useParams<{ projectId: string }>()
  const { user, userDoc } = useAuth()
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [filter, setFilter] = useState<'all' | 'positive' | 'negative' | 'neutral'>('all')

  useEffect(() => {
    if (!user || !projectId) return
    Promise.all([
      getDoc(doc(db, 'projects', projectId)),
      getDocs(query(
        collection(db, 'projects', projectId, 'feedbacks'),
        orderBy('createdAt', 'desc'),
      )),
    ]).then(([pSnap, fSnap]) => {
      if (!pSnap.exists() || pSnap.data().ownerUid !== user.uid) {
        router.push('/dashboard'); return
      }
      setProject({ id: pSnap.id, ...pSnap.data() } as Project)
      setFeedbacks(fSnap.docs.map(d => ({ id: d.id, ...d.data() }) as Feedback))
      setLoading(false)
    })
  }, [user, projectId, router])

  const analyze = async (feedbackId: string) => {
    if (!user) return
    const token = await user.getIdToken()
    const res = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ projectId, feedbackId }),
    })
    const data = await res.json()
    if (data.sentiment) {
      setFeedbacks(prev => prev.map(f =>
        f.id === feedbackId ? { ...f, sentiment: data.sentiment } : f
      ))
    }
  }

  const copyEmbed = () => {
    const code = `<script src="https://ghost-comment.vercel.app/widget.js" data-project-id="${projectId}"><\/script>`
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const exportCsv = () => {
    const rows = [
      ['日時', '本文', '評価', '感情', 'ページURL', 'デバイス'],
      ...feedbacks.map(f => [
        new Date(f.createdAt).toLocaleString('ja-JP'),
        `"${f.text.replace(/"/g, '""')}"`,
        f.rating ?? '',
        f.sentiment ?? '',
        f.pageUrl,
        f.device,
      ]),
    ]
    const csv = rows.map(r => r.join(',')).join('\n')
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' }))
    a.download = `feedbacks-${projectId}.csv`
    a.click()
  }

  const filtered = filter === 'all' ? feedbacks : feedbacks.filter(f => f.sentiment === filter)

  if (loading) return (
    <div className="min-h-screen bg-[#0d0d1a] flex items-center justify-center">
      <div className="text-white/40">読み込み中…</div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#0d0d1a] text-white">
      <header className="border-b border-white/10 px-6 py-4 flex items-center gap-4">
        <button onClick={() => router.push('/dashboard')} className="text-white/40 hover:text-white transition-colors text-sm">
          ← ダッシュボード
        </button>
        <span className="text-white/20">/</span>
        <h1 className="font-semibold">{project?.name}</h1>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Embed code */}
        <div className="bg-[#A78BFA]/10 border border-[#A78BFA]/30 rounded-xl p-5 mb-6">
          <p className="text-xs text-[#A78BFA] font-semibold mb-2">埋め込みコード</p>
          <div className="flex items-center gap-3">
            <code className="flex-1 bg-black/30 rounded-lg px-3 py-2 text-xs text-white/70 font-mono overflow-x-auto whitespace-nowrap">
              {`<script src="https://ghost-comment.vercel.app/widget.js" data-project-id="${projectId}"></script>`}
            </code>
            <button
              onClick={copyEmbed}
              className="shrink-0 bg-[#A78BFA] text-white text-xs px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              {copied ? '✓ コピー済' : 'コピー'}
            </button>
          </div>
        </div>

        {/* Stats */}
        <StatsPanel feedbacks={feedbacks} />

        {/* Feedback list header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-white/60">{feedbacks.length} 件</span>
            {/* filter tabs */}
            {(['all', 'positive', 'negative', 'neutral'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                  filter === f
                    ? 'bg-[#A78BFA]/20 border-[#A78BFA]/50 text-[#A78BFA]'
                    : 'border-white/15 text-white/40 hover:text-white/60'
                }`}
              >
                {f === 'all' ? 'すべて' : f === 'positive' ? 'ポジティブ' : f === 'negative' ? 'ネガティブ' : 'ニュートラル'}
              </button>
            ))}
          </div>
          {userDoc?.plan === 'pro' && feedbacks.length > 0 && (
            <button
              onClick={exportCsv}
              className="text-xs text-white/40 hover:text-white border border-white/15 hover:border-white/30 px-3 py-1 rounded-lg transition-colors"
            >
              CSV出力
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center">
            <p className="text-white/40 text-sm">フィードバックはまだありません</p>
            <p className="text-white/25 text-xs mt-1">上の埋め込みコードをサイトに貼り付けてください</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map(fb => (
              <FeedbackCard
                key={fb.id}
                fb={fb}
                onAnalyze={userDoc?.plan === 'pro' ? analyze : undefined}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

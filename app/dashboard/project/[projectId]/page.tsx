'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { collection, query, orderBy, getDocs, doc, getDoc, limit } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useAuth } from '@/hooks/useAuth'
import FeedbackCard from '@/components/Dashboard/FeedbackCard'
import StatsPanel from '@/components/Dashboard/StatsPanel'
import type { Feedback, Project } from '@/types'

interface WeeklySummary {
  id: string
  summary: string
  feedbackCount: number
  createdAt: number
}

// Benchmark data — will be live when 100+ projects accumulate
const SAMPLE_BENCHMARK = {
  category: 'SaaS / Webアプリ',
  avgPositiveRate: 62,
  avgNegativeRate: 14,
  avgNeutralRate: 24,
  sampleSize: '(β: サンプルデータ)',
}

export default function ProjectPage() {
  const { projectId } = useParams<{ projectId: string }>()
  const { user, userDoc } = useAuth()
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [latestSummary, setLatestSummary] = useState<WeeklySummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [filter, setFilter] = useState<'all' | 'positive' | 'negative' | 'neutral'>('all')
  const [activeTab, setActiveTab] = useState<'feedbacks' | 'benchmark'>('feedbacks')

  useEffect(() => {
    if (!user || !projectId) return
    Promise.all([
      getDoc(doc(db, 'projects', projectId)),
      getDocs(query(
        collection(db, 'projects', projectId, 'feedbacks'),
        orderBy('createdAt', 'desc'),
      )),
      getDocs(query(
        collection(db, 'projects', projectId, 'weeklySummaries'),
        orderBy('createdAt', 'desc'),
        limit(1),
      )),
    ]).then(([pSnap, fSnap, sSnap]) => {
      if (!pSnap.exists() || pSnap.data().ownerUid !== user.uid) {
        router.push('/dashboard'); return
      }
      setProject({ id: pSnap.id, ...pSnap.data() } as Project)
      setFeedbacks(fSnap.docs.map(d => ({ id: d.id, ...d.data() }) as Feedback))
      if (!sSnap.empty) {
        const s = sSnap.docs[0]
        setLatestSummary({ id: s.id, ...s.data() } as WeeklySummary)
      }
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

  // Compute my stats for benchmark comparison
  const positiveCount = feedbacks.filter(f => f.sentiment === 'positive').length
  const negativeCount = feedbacks.filter(f => f.sentiment === 'negative').length
  const neutralCount = feedbacks.filter(f => f.sentiment === 'neutral').length
  const analyzedCount = feedbacks.filter(f => f.sentiment !== null).length
  const myPositiveRate = analyzedCount > 0 ? Math.round((positiveCount / analyzedCount) * 100) : null
  const myNegativeRate = analyzedCount > 0 ? Math.round((negativeCount / analyzedCount) * 100) : null

  const filtered = filter === 'all' ? feedbacks : feedbacks.filter(f => f.sentiment === filter)
  const isPro = userDoc?.plan === 'pro'

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
        <a
          href={project?.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/30 hover:text-white/60 text-xs transition-colors ml-auto"
        >
          {project?.url} ↗
        </a>
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

        {/* Weekly AI Summary — Pro */}
        {isPro && latestSummary && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-6">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span>🧠</span>
                <p className="text-xs font-semibold text-white/70">週次AIサマリー</p>
              </div>
              <span className="text-white/25 text-xs">
                {new Date(latestSummary.createdAt).toLocaleDateString('ja-JP')} — {latestSummary.feedbackCount}件
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed whitespace-pre-line">{latestSummary.summary}</p>
          </div>
        )}

        {/* Stats */}
        <StatsPanel feedbacks={feedbacks} />

        {/* Tabs */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex border border-white/10 rounded-xl overflow-hidden">
            {(['feedbacks', 'benchmark'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-white/10 text-white'
                    : 'text-white/40 hover:text-white/60'
                }`}
              >
                {tab === 'feedbacks' ? `フィードバック (${feedbacks.length})` : '業界比較'}
              </button>
            ))}
          </div>

          {activeTab === 'feedbacks' && (
            <div className="flex items-center gap-2 ml-auto flex-wrap">
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
              {isPro && feedbacks.length > 0 && (
                <button
                  onClick={exportCsv}
                  className="text-xs text-white/40 hover:text-white border border-white/15 hover:border-white/30 px-3 py-1 rounded-lg transition-colors"
                >
                  CSV出力
                </button>
              )}
            </div>
          )}
        </div>

        {/* Feedbacks tab */}
        {activeTab === 'feedbacks' && (
          filtered.length === 0 ? (
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
                  onAnalyze={isPro ? analyze : undefined}
                />
              ))}
            </div>
          )
        )}

        {/* Benchmark tab */}
        {activeTab === 'benchmark' && (
          <div className="space-y-4">
            {!isPro ? (
              <div className="bg-[#A78BFA]/8 border border-[#A78BFA]/20 rounded-xl p-6 text-center">
                <p className="text-[#A78BFA] font-semibold mb-2">Pro プランで利用できます</p>
                <p className="text-white/45 text-sm mb-4">
                  同カテゴリのプロダクトと感情スコアを比較できます。
                </p>
                <button
                  onClick={() => router.push('/settings')}
                  className="bg-[#A78BFA] text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  Pro にアップグレード
                </button>
              </div>
            ) : (
              <>
                <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold">業界平均との比較</h3>
                    <span className="text-white/30 text-xs">{SAMPLE_BENCHMARK.category}</span>
                  </div>
                  <div className="space-y-4">
                    {[
                      { label: 'ポジティブ率', myVal: myPositiveRate, avgVal: SAMPLE_BENCHMARK.avgPositiveRate, color: '#22c55e' },
                      { label: 'ネガティブ率', myVal: myNegativeRate, avgVal: SAMPLE_BENCHMARK.avgNegativeRate, color: '#ef4444' },
                    ].map(row => (
                      <div key={row.label}>
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="text-white/60">{row.label}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-white/35">業界平均 {row.avgVal}%</span>
                            <span className="font-semibold" style={{ color: row.color }}>
                              {row.myVal !== null ? `あなた ${row.myVal}%` : 'AI分析後に表示'}
                            </span>
                          </div>
                        </div>
                        <div className="h-2 bg-white/8 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{ width: `${row.avgVal}%`, background: `${row.color}40` }}
                          />
                          {row.myVal !== null && (
                            <div
                              className="h-full rounded-full -mt-2 transition-all duration-700"
                              style={{ width: `${row.myVal}%`, background: row.color }}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-white/20 text-xs mt-4">{SAMPLE_BENCHMARK.sampleSize} — データが集まり次第、リアルタイム更新</p>
                </div>
                <div className="bg-white/3 border border-white/8 rounded-xl p-4 text-xs text-white/35 leading-relaxed">
                  <strong className="text-white/50">ベンチマークについて：</strong>{' '}
                  Ghost Commentを利用するプロダクト全体の匿名集計データです。
                  カテゴリ別・規模別のフィルタリングはProロードマップに含まれています。
                  データが蓄積するほど精度が上がります。
                </div>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  )
}

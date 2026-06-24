'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { collection, query, where, orderBy, getDocs, doc, deleteDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useAuth } from '@/hooks/useAuth'
import type { Project } from '@/types'

export default function DashboardPage() {
  const { user, userDoc, loading, signIn, signOut } = useAuth()
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [loadingProjects, setLoadingProjects] = useState(false)
  const [showCreate, setShowCreate] = useState(false)
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    if (!user) return
    setLoadingProjects(true)
    getDocs(query(
      collection(db, 'projects'),
      where('ownerUid', '==', user.uid),
      orderBy('createdAt', 'desc'),
    )).then(snap => {
      setProjects(snap.docs.map(d => ({ id: d.id, ...d.data() }) as Project))
      setLoadingProjects(false)
    })
  }, [user])

  const createProject = async () => {
    if (!user || !name || !url) return
    setCreating(true)
    const token = await user.getIdToken()
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ name, url }),
    })
    const data = await res.json()
    if (data.project) {
      setProjects(prev => [data.project, ...prev])
      setName(''); setUrl(''); setShowCreate(false)
    } else {
      alert(data.error === 'free plan allows 1 project'
        ? 'Freeプランは1プロジェクトまで。Proにアップグレードしてください。'
        : data.error)
    }
    setCreating(false)
  }

  const deleteProject = async (id: string) => {
    if (!confirm('このプロジェクトを削除しますか？')) return
    await deleteDoc(doc(db, 'projects', id))
    setProjects(prev => prev.filter(p => p.id !== id))
  }

  if (loading) return (
    <div className="min-h-screen bg-[#0d0d1a] flex items-center justify-center">
      <div className="text-white/40">読み込み中…</div>
    </div>
  )

  if (!user) return (
    <div className="min-h-screen bg-[#0d0d1a] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-5xl mb-4">👻</div>
        <h1 className="text-2xl font-bold text-white mb-2">Ghost Comment</h1>
        <p className="text-white/50 mb-8">ダッシュボードにアクセスするにはログインが必要です</p>
        <button
          onClick={signIn}
          className="bg-[#A78BFA] text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
        >
          Google でログイン
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#0d0d1a] text-white">
      {/* Header */}
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">👻</span>
          <span className="font-bold text-white">Ghost Comment</span>
          {userDoc?.plan === 'pro' && (
            <span className="text-xs px-2 py-0.5 bg-[#A78BFA]/20 text-[#A78BFA] rounded-full border border-[#A78BFA]/30">Pro</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/settings')}
            className="text-white/50 hover:text-white text-sm transition-colors"
          >
            設定
          </button>
          <button
            onClick={signOut}
            className="text-white/50 hover:text-white text-sm transition-colors"
          >
            ログアウト
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Projects header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">プロジェクト</h2>
          <button
            onClick={() => setShowCreate(!showCreate)}
            className="bg-[#A78BFA] text-white text-sm px-4 py-2 rounded-xl font-medium hover:opacity-90 transition-opacity"
          >
            + 新規作成
          </button>
        </div>

        {/* Create form */}
        {showCreate && (
          <div className="bg-white/5 border border-[#A78BFA]/30 rounded-xl p-5 mb-6">
            <h3 className="text-sm font-semibold mb-4">プロジェクトを追加</h3>
            <div className="flex flex-col gap-3">
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="プロジェクト名（例：マイブログ）"
                className="bg-white/8 border border-white/15 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-[#A78BFA] transition-colors"
              />
              <input
                value={url}
                onChange={e => setUrl(e.target.value)}
                placeholder="サイトURL（例：https://example.com）"
                className="bg-white/8 border border-white/15 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-[#A78BFA] transition-colors"
              />
              <div className="flex gap-2">
                <button
                  onClick={createProject}
                  disabled={creating || !name || !url}
                  className="bg-[#A78BFA] text-white text-sm px-4 py-2 rounded-lg font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
                >
                  {creating ? '作成中…' : '作成する'}
                </button>
                <button
                  onClick={() => setShowCreate(false)}
                  className="text-white/40 text-sm px-4 py-2 hover:text-white transition-colors"
                >
                  キャンセル
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Project list */}
        {loadingProjects ? (
          <div className="text-white/30 text-sm">読み込み中…</div>
        ) : projects.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center">
            <div className="text-3xl mb-3">👻</div>
            <p className="text-white/50 text-sm">まだプロジェクトがありません</p>
            <p className="text-white/30 text-xs mt-1">「+ 新規作成」でサイトを追加してください</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {projects.map(p => (
              <div
                key={p.id}
                className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/8 transition-colors cursor-pointer"
                onClick={() => router.push(`/dashboard/project/${p.id}`)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white">{p.name}</h3>
                    <p className="text-white/40 text-xs mt-0.5 truncate">{p.url}</p>
                  </div>
                  <div className="flex items-center gap-4 ml-4 shrink-0">
                    <div className="text-right">
                      <div className="text-lg font-bold text-white">{p.feedbackCount}</div>
                      <div className="text-xs text-white/40">フィードバック</div>
                    </div>
                    <button
                      onClick={e => { e.stopPropagation(); deleteProject(p.id) }}
                      className="text-white/20 hover:text-red-400 text-xs transition-colors p-1"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

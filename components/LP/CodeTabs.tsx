'use client'
import { useState } from 'react'

const TABS = [
  { id: 'html', label: 'HTML' },
  { id: 'react', label: 'React' },
  { id: 'nextjs', label: 'Next.js' },
  { id: 'vue', label: 'Vue' },
]

const SNIPPETS: Record<string, { lang: string; code: string }> = {
  html: {
    lang: 'html',
    code: `<!-- </body> の直前に貼るだけ -->
<script
  src="https://ghost-comment.vercel.app/widget.js"
  data-project-id="YOUR_PROJECT_ID"
></script>`,
  },
  react: {
    lang: 'tsx',
    code: `// GhostComment.tsx をコピーして使う
import { GhostComment } from './GhostComment'

export default function App() {
  return (
    <>
      <YourApp />
      <GhostComment projectId="YOUR_PROJECT_ID" />
    </>
  )
}`,
  },
  nextjs: {
    lang: 'tsx',
    code: `// app/layout.tsx に追加
import { GhostComment } from '@/components/GhostComment'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        {children}
        <GhostComment projectId="YOUR_PROJECT_ID" />
      </body>
    </html>
  )
}`,
  },
  vue: {
    lang: 'vue',
    code: `<!-- App.vue -->
<template>
  <div>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  const s = document.createElement('script')
  s.src = 'https://ghost-comment.vercel.app/widget.js'
  s.setAttribute('data-project-id', 'YOUR_PROJECT_ID')
  document.body.appendChild(s)
})
</script>`,
  },
}

export function CodeTabs() {
  const [active, setActive] = useState('html')
  const [copied, setCopied] = useState(false)
  const snippet = SNIPPETS[active]

  const copy = () => {
    navigator.clipboard.writeText(snippet.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-xl overflow-hidden border border-white/10 text-left">
      {/* Tab bar */}
      <div className="flex items-center bg-[#0F1118] border-b border-white/8 px-4 gap-1">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`px-3 py-2.5 text-xs font-medium transition-colors ${
              active === t.id
                ? 'text-[#22C55E] border-b-2 border-[#22C55E]'
                : 'text-white/40 hover:text-white/70'
            }`}
          >
            {t.label}
          </button>
        ))}
        <div className="flex-1" />
        <button
          onClick={copy}
          className="text-xs text-white/40 hover:text-white px-3 py-1 transition-colors"
        >
          {copied ? '✓ コピー済' : 'コピー'}
        </button>
      </div>

      {/* Code */}
      <div className="bg-[#050508] p-5 overflow-x-auto">
        <pre className="text-sm font-mono leading-relaxed">
          {snippet.code.split('\n').map((line, i) => (
            <div key={i} className="flex gap-4">
              <span className="select-none text-white/20 text-xs pt-0.5 w-4 shrink-0">{i + 1}</span>
              <span className="text-green-300/90">{line || ' '}</span>
            </div>
          ))}
        </pre>
      </div>
    </div>
  )
}

// DIY vs Ghost Comment comparison — static, no state needed
export function ComparisonTable() {
  const rows = [
    { item: 'セットアップ', diy: '20時間〜（Firebase + API + UI）', gc: '2分', gcWin: true },
    { item: 'インフラ維持', diy: '自分でFirebaseを管理', gc: 'Ghost Commentが管理', gcWin: true },
    { item: 'AI感情分析', diy: '別途Anthropic API実装が必要', gc: 'ダッシュボードに標準装備（Pro）', gcWin: true },
    { item: 'ベンチマーク比較', diy: '単一プロジェクトのデータのみ', gc: '他プロダクトとの比較（Coming Soon）', gcWin: true },
    { item: 'フレームワーク対応', diy: '自前で対応', gc: 'HTML / React / Next.js / Vue', gcWin: true },
    { item: 'コスト（月）', diy: 'Firebase ¥0〜 + 開発コスト', gc: '¥0（Free）/ ¥980（Pro）', gcWin: true },
    { item: 'コントロール', diy: 'コードを完全に所有', gc: 'ホスティングのみ依存', gcWin: false },
  ]

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 pr-4 text-white/40 font-normal"></th>
            <th className="text-left py-3 pr-4 text-white/40 font-normal">自前実装</th>
            <th className="text-left py-3 text-[#22C55E] font-semibold">Ghost Comment</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.item} className="border-b border-white/5">
              <td className="py-3 pr-4 text-white/60 text-xs">{r.item}</td>
              <td className="py-3 pr-4 text-white/40 text-xs">{r.diy}</td>
              <td className={`py-3 text-xs ${r.gcWin ? 'text-green-400' : 'text-white/60'}`}>
                {r.gcWin && <span className="mr-1">✓</span>}{r.gc}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

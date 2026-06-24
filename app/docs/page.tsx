import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ghost Comment — ドキュメント',
  description: 'Ghost Comment の導入ガイド。HTML / React / Next.js / Vue 対応。カスタムオプション・API リファレンス付き。',
}

const NAV_ITEMS = [
  { id: 'quickstart', label: 'クイックスタート' },
  { id: 'react', label: 'React' },
  { id: 'nextjs', label: 'Next.js' },
  { id: 'vue', label: 'Vue' },
  { id: 'svelte', label: 'Svelte' },
  { id: 'component', label: 'GhostComment コンポーネント' },
  { id: 'customization', label: 'カスタマイズ' },
  { id: 'api', label: 'API リファレンス（Pro）' },
  { id: 'faq', label: 'FAQ' },
]

function Code({ children, lang }: { children: string; lang?: string }) {
  return (
    <div className="bg-[#0d0d1a] border border-white/10 rounded-xl overflow-x-auto my-4">
      {lang && (
        <div className="flex items-center justify-between px-4 pt-3 pb-1">
          <span className="text-xs text-white/30">{lang}</span>
        </div>
      )}
      <pre className="p-4 text-sm font-mono text-green-300/90 leading-relaxed whitespace-pre overflow-x-auto">
        {children}
      </pre>
    </div>
  )
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-14 scroll-mt-24">
      <h2 className="text-xl font-bold text-white mb-4 pb-2 border-b border-white/10">{title}</h2>
      {children}
    </section>
  )
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#A78BFA]/10 border border-[#A78BFA]/25 rounded-xl px-4 py-3 text-sm text-white/70 my-4">
      {children}
    </div>
  )
}

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-[#0d0d1a] text-white">

      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-white/10 sticky top-0 bg-[#0d0d1a]/95 backdrop-blur z-30">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <span>👻</span> Ghost Comment
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-[#A78BFA] text-sm font-semibold">Docs</span>
          <Link
            href="/dashboard"
            className="bg-[#A78BFA] text-white text-sm px-5 py-2 rounded-xl font-semibold hover:opacity-90 transition-opacity"
          >
            ダッシュボード
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12 flex gap-12">

        {/* Sidebar */}
        <aside className="hidden lg:block w-52 shrink-0 sticky top-24 self-start">
          <p className="text-white/30 text-xs font-semibold uppercase tracking-widest mb-4">目次</p>
          <ul className="space-y-1">
            {NAV_ITEMS.map(n => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  className="block text-sm text-white/50 hover:text-[#A78BFA] transition-colors py-1"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main content */}
        <main className="flex-1 max-w-2xl min-w-0">

          <div className="mb-10">
            <h1 className="text-3xl font-bold mb-3">ドキュメント</h1>
            <p className="text-white/50 leading-relaxed">
              Ghost Comment を 2 分で導入するためのガイド。
              ダッシュボードで Project ID を確認してから始めてください。
            </p>
          </div>

          {/* Quick start */}
          <Section id="quickstart" title="クイックスタート（HTML / Vanilla JS）">
            <p className="text-white/60 text-sm leading-relaxed mb-3">
              あらゆるサービスに使える最もシンプルな方法。<br />
              <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs">&lt;/body&gt;</code> の直前にこの1行を追加するだけ。
            </p>
            <Code lang="html">{`<script
  src="https://ghost-comment.vercel.app/widget.js"
  data-project-id="YOUR_PROJECT_ID"
></script>`}</Code>
            <p className="text-white/50 text-sm">
              <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs">YOUR_PROJECT_ID</code>{' '}
              はダッシュボード → プロジェクト詳細画面でコピーできます。
            </p>
          </Section>

          {/* React */}
          <Section id="react" title="React">
            <p className="text-white/60 text-sm leading-relaxed mb-3">
              <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs">GhostComment.tsx</code>{' '}
              を作成してプロジェクトに置きます（下の「GhostComment コンポーネント」節でコードをコピー）。
            </p>
            <Code lang="tsx">{`import { GhostComment } from './GhostComment'

export default function App() {
  return (
    <>
      <YourApp />
      <GhostComment projectId="YOUR_PROJECT_ID" />
    </>
  )
}`}</Code>
            <Note>
              <strong>create-react-app / Vite / Remix</strong> すべて同じ方法で使えます。
            </Note>
          </Section>

          {/* Next.js */}
          <Section id="nextjs" title="Next.js（App Router）">
            <p className="text-white/60 text-sm leading-relaxed mb-3">
              <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs">app/layout.tsx</code>{' '}
              に追加すると全ページに表示されます。
            </p>
            <Code lang="tsx">{`// app/layout.tsx
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
}`}</Code>
            <p className="text-white/50 text-sm">
              特定ページにのみ表示したい場合は、そのページの <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs">page.tsx</code> に直接追加してください。
            </p>
          </Section>

          {/* Vue */}
          <Section id="vue" title="Vue 3">
            <Code lang="vue">{`<!-- App.vue -->
<template>
  <RouterView />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  const s = document.createElement('script')
  s.id = 'ghost-comment-widget'
  s.src = 'https://ghost-comment.vercel.app/widget.js'
  s.setAttribute('data-project-id', 'YOUR_PROJECT_ID')
  document.body.appendChild(s)
})

onUnmounted(() => {
  document.getElementById('ghost-comment-widget')?.remove()
})
</script>`}</Code>
          </Section>

          {/* Svelte */}
          <Section id="svelte" title="Svelte / SvelteKit">
            <Code lang="svelte">{`<!-- +layout.svelte -->
<script>
  import { onMount, onDestroy } from 'svelte'

  onMount(() => {
    const s = document.createElement('script')
    s.id = 'ghost-comment-widget'
    s.src = 'https://ghost-comment.vercel.app/widget.js'
    s.setAttribute('data-project-id', 'YOUR_PROJECT_ID')
    document.body.appendChild(s)
    return () => s.remove()
  })
</script>

<slot />`}</Code>
          </Section>

          {/* GhostComment component */}
          <Section id="component" title="GhostComment.tsx — コピー用コンポーネント">
            <p className="text-white/60 text-sm leading-relaxed mb-3">
              React / Next.js プロジェクト用。このファイルをそのままコピーして使ってください。
              npm パッケージのインストールは不要です。
            </p>
            <Code lang="tsx">{`'use client'
import { useEffect } from 'react'

interface GhostCommentProps {
  projectId: string
  position?: 'left' | 'right'
  color?: string
  prompt?: string
}

export function GhostComment({
  projectId,
  position = 'right',
  color = '#A78BFA',
  prompt,
}: GhostCommentProps) {
  useEffect(() => {
    const id = 'ghost-comment-widget'
    if (document.getElementById(id)) return

    const s = document.createElement('script')
    s.id = id
    s.src = 'https://ghost-comment.vercel.app/widget.js'
    s.setAttribute('data-project-id', projectId)
    s.setAttribute('data-position', position)
    s.setAttribute('data-color', color)
    if (prompt) s.setAttribute('data-prompt', prompt)
    document.body.appendChild(s)

    return () => {
      document.getElementById(id)?.remove()
    }
  }, [projectId, position, color, prompt])

  return null
}`}</Code>
            <Note>
              <strong>Next.js の場合：</strong> ファイル先頭の{' '}
              <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs">&apos;use client&apos;</code>{' '}
              は必須です。Server Component からは使えません。
            </Note>
          </Section>

          {/* Customization */}
          <Section id="customization" title="カスタマイズ">
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              widget.js に渡せるオプションの一覧。
              HTML の場合は <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs">data-*</code> 属性、
              React コンポーネントの場合は props として渡します。
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 pr-6 text-white/40 font-normal">属性 / Prop</th>
                    <th className="text-left py-2 pr-6 text-white/40 font-normal">型</th>
                    <th className="text-left py-2 pr-6 text-white/40 font-normal">デフォルト</th>
                    <th className="text-left py-2 text-white/40 font-normal">説明</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { attr: 'data-project-id', type: 'string', def: '—（必須）', desc: 'ダッシュボードから取得するID' },
                    { attr: 'data-position', type: '"left" | "right"', def: '"right"', desc: 'ウィジェットの表示位置' },
                    { attr: 'data-color', type: 'string（hex）', def: '"#A78BFA"', desc: 'ボタン・送信ボタンの色' },
                    { attr: 'data-prompt', type: 'string', def: '"本音を聞かせて…"', desc: 'テキストエリアのプレースホルダー' },
                  ].map(r => (
                    <tr key={r.attr} className="border-b border-white/5">
                      <td className="py-2.5 pr-6">
                        <code className="text-[#A78BFA] text-xs">{r.attr}</code>
                      </td>
                      <td className="py-2.5 pr-6 text-white/40 text-xs">{r.type}</td>
                      <td className="py-2.5 pr-6 text-white/40 text-xs">{r.def}</td>
                      <td className="py-2.5 text-white/55 text-xs">{r.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-white/40 text-xs mt-3">例：</p>
            <Code lang="html">{`<script
  src="https://ghost-comment.vercel.app/widget.js"
  data-project-id="YOUR_PROJECT_ID"
  data-position="left"
  data-color="#3B82F6"
  data-prompt="改善してほしい点はありますか？"
></script>`}</Code>
          </Section>

          {/* API reference */}
          <Section id="api" title="API リファレンス（Pro）">
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              Pro プランではダッシュボード以外から直接フィードバックデータを取得できます。
            </p>
            <div className="bg-[#1a1a2e] border border-white/10 rounded-xl p-4 mb-4">
              <p className="text-xs text-white/40 mb-2">GET /api/feedbacks</p>
              <Code lang="bash">{`curl "https://ghost-comment.vercel.app/api/feedbacks?projectId=YOUR_ID" \\
  -H "Authorization: Bearer YOUR_API_KEY"`}</Code>
            </div>
            <div className="bg-[#1a1a2e] border border-white/10 rounded-xl p-4">
              <p className="text-xs text-white/40 mb-2">Response</p>
              <Code lang="json">{`{
  "feedbacks": [
    {
      "id": "abc123",
      "text": "UIが分かりにくい",
      "rating": 2,
      "sentiment": "negative",
      "pageUrl": "https://your-app.com/dashboard",
      "createdAt": "2026-06-24T10:00:00Z"
    }
  ],
  "total": 42
}`}</Code>
            </div>
            <Note>
              API キーはダッシュボード → Settings → API Key から発行できます（Pro のみ）。
            </Note>
          </Section>

          {/* FAQ */}
          <Section id="faq" title="FAQ">
            <div className="space-y-5">
              {[
                {
                  q: 'フィードバックを送ったユーザーを特定できますか？',
                  a: '個人を特定する情報は一切収集しません。デバイスの種類（mobile / desktop）とページURLのみを記録します。これはウィジェットが「完全匿名」として機能するための設計です。',
                },
                {
                  q: 'Free プランの30件制限はいつリセットされますか？',
                  a: '毎月1日の0:00（UTC）にリセットされます。30件に達してもウィジェットは表示されたままですが、新しいフィードバックは受け付けなくなります。',
                },
                {
                  q: '自前のFirebaseプロジェクトに繋げることはできますか？',
                  a: '現在はできません。Ghost Comment が管理するインフラを使います。これが「インフラゼロ」を実現する仕組みです。',
                },
                {
                  q: 'ウィジェットのサイズ / パフォーマンスへの影響は？',
                  a: 'widget.js は約50KBです。スクリプトは非同期ロードされるため、メインスレッドをブロックしません。Core Web Vitalsへの影響はほぼゼロです。',
                },
                {
                  q: 'ドメインの制限はありますか？',
                  a: 'ありません。1プロジェクトに対して複数ドメインで同じスクリプトタグを使えます。ステージング環境と本番環境で同じプロジェクトIDを使いたい場合はそのままご利用いただけます。',
                },
              ].map(faq => (
                <div key={faq.q} className="border-b border-white/8 pb-5">
                  <p className="font-semibold text-white text-sm mb-2">{faq.q}</p>
                  <p className="text-white/50 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* Bottom CTA */}
          <div className="bg-white/4 border border-white/10 rounded-2xl p-6 text-center">
            <p className="text-white/60 text-sm mb-4">それでも解決しない場合は X で直接聞いてください。</p>
            <a
              href="https://x.com/Yoko_ai_dev"
              target="_blank"
              rel="noopener"
              className="inline-block border border-white/20 text-white/70 px-6 py-2.5 rounded-xl text-sm hover:bg-white/5 hover:text-white transition-all"
            >
              @Yoko_ai_dev に聞く →
            </a>
          </div>

        </main>
      </div>
    </div>
  )
}

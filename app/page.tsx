import Link from 'next/link'
import type { Metadata } from 'next'
import { CodeTabs, ComparisonTable } from '@/components/LP/CodeTabs'

export const metadata: Metadata = {
  title: 'Ghost Comment — 1コンポーネントで、顧客の本音がわかる',
  description: '3ヶ月で30個作って、収益ゼロだった。ユーザーが何を思っているかわからないから、何を直せばいいかわからない。それだけのことで、良いプロダクトが消える。',
  openGraph: {
    title: 'Ghost Comment — 1コンポーネントで、顧客の本音がわかる',
    description: '匿名フィードバック基盤。scriptタグ1行 / Reactコンポーネント1つ。Firebase設定ゼロ。',
    url: 'https://ghost-comment-six.vercel.app',
    siteName: 'Ghost Comment',
    locale: 'ja_JP',
    type: 'website',
  },
}

const FEATURES = [
  {
    icon: '⚡',
    title: '2分で導入',
    body: 'scriptタグ1行。ReactならGhostCommentコンポーネント1つ。Firebase設定・サーバー構築は不要。',
  },
  {
    icon: '👻',
    title: '完全匿名',
    body: 'ログイン不要、名前入力不要。匿名だから本音が集まる。収集するのはテキスト・デバイス・ページURLのみ。',
  },
  {
    icon: '🧠',
    title: 'Claude AI 感情分析',
    body: 'フィードバックをPositive / Negative / Neutralに自動分類。Proに入れば毎週月曜にClaudeが要約を送信する。',
  },
  {
    icon: '📊',
    title: 'ダッシュボード',
    body: '日別バーチャート・感情円グラフ・CSV出力。ブラウザを開けば全部見える。',
  },
  {
    icon: '🔔',
    title: 'Slack 通知（Pro）',
    body: 'フィードバックが届いたら即Slackに通知。webhook URLを貼るだけで動く。',
  },
  {
    icon: '📈',
    title: '業界ベンチマーク（Pro）',
    body: '同カテゴリの平均スコアと自分のプロダクトを比較。1プロジェクトだけのデータでは絶対に持てない視点。',
  },
]

const MOAT = [
  {
    title: 'データネットワーク効果',
    desc: 'プロジェクトが増えるほど、業界全体の傾向が見えてくる。自前では永遠に持てないデータが、ここに集まる。',
  },
  {
    title: '週次AI要約（Cron）',
    desc: 'Claudeが毎週月曜にフィードバックを要約して送信。「今週のテーマ：UIが分かりにくい / 3件」。毎回ダッシュボードを確認しなくていい。',
  },
  {
    title: '匿名セッション追跡',
    desc: 'Cookie不要、PII不要で、同じユーザーが重複投稿したかを検知する。実装するにはデバイスフィンガープリントの知識が要る。',
  },
  {
    title: 'Slack / Linear 統合',
    desc: 'ネガティブなフィードバックをLinearのIssueに変換。これを自前で作ると3つのAPIを繋ぐ必要がある。',
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white overflow-x-hidden">

      {/* Nav */}
      <nav className="gc-nav sticky top-0 z-30 bg-[#0A0A0B]/95 border-b border-white/8">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 font-bold text-lg tracking-tight">
            <span>👻</span> Ghost Comment
          </div>
          <div className="flex items-center gap-4">
            <Link href="/docs" className="text-white/40 hover:text-white text-sm transition-colors hidden sm:block">Docs</Link>
            <Link href="#pricing" className="text-white/40 hover:text-white text-sm transition-colors hidden sm:block">料金</Link>
            {/* Language toggle */}
            <div className="flex items-center border border-white/15 rounded-lg overflow-hidden text-xs">
              <span className="px-2.5 py-1.5 bg-white/10 text-white font-medium">🇯🇵</span>
              <span className="w-px h-4 bg-white/15" />
              <Link href="/en" className="px-2.5 py-1.5 text-white/40 hover:bg-white/8 transition-colors">🇺🇸</Link>
            </div>
            <Link
              href="/dashboard"
              className="text-sm px-5 py-2 rounded-xl font-semibold bg-white text-[#0a0a14] hover:bg-white/90 transition-all"
            >
              無料で始める
            </Link>
          </div>
        </div>
      </nav>

      {/* ── STORY HERO ───────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-14">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <div className="mb-8">
              <p className="text-white/30 text-sm font-mono mb-3">// なぜ作ったか</p>
              <div className="pl-0">
                <p className="text-3xl md:text-4xl font-bold leading-tight tracking-tight">
                  3ヶ月で30個作った。<br />
                  <span className="text-white/35">収益は¥0だった。</span>
                </p>
              </div>
            </div>
            <p className="text-white/55 leading-relaxed mb-4">
              ユーザーが何を思っているかわからないから、何を直せばいいかわからない。
              それだけのことで、良いプロダクトが消える。
            </p>
            <p className="text-white/55 leading-relaxed mb-8">
              だから作った。
              <strong className="text-white"> 1コンポーネント貼るだけで、顧客の本音がわかるツール。</strong>
              自分のために作ったから、同じ悩みを持つエンジニアには確実に刺さる。
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/dashboard"
                className="bg-[#22C55E] text-white px-7 py-3.5 rounded-xl font-semibold hover:opacity-90 transition-opacity text-center"
              >
                今すぐ試す（無料）
              </Link>
              <Link
                href="/docs"
                className="border border-white/15 text-white/60 px-7 py-3.5 rounded-xl font-semibold hover:bg-white/5 hover:text-white transition-all text-center"
              >
                ドキュメントを読む →
              </Link>
            </div>
            <p className="text-white/25 text-xs mt-4">クレジットカード不要 · Freeプランは永久無料</p>
          </div>

          <div>
            <CodeTabs />
            <p className="text-white/25 text-xs mt-2 text-right">
              使い方は{' '}
              <Link href="/docs" className="text-[#22C55E]/60 hover:text-[#22C55E]">/docs</Link>
              {' '}に全部書いてある
            </p>
          </div>
        </div>
      </section>

      {/* ── SPECS ────────────────────────────────────────────────────────────── */}
      <section className="border-y border-white/8 py-6">
        <div className="max-w-5xl mx-auto px-6 flex flex-wrap gap-x-10 gap-y-3">
          {[
            { n: '< 2分', sub: '導入時間' },
            { n: '50KB以下', sub: 'ウィジェットサイズ' },
            { n: 'Firebase設定ゼロ', sub: '外部DB不要' },
            { n: '4フレームワーク対応', sub: 'React / Vue / Vanilla / Next' },
          ].map(s => (
            <div key={s.sub} className="flex items-baseline gap-2">
              <span className="text-sm font-bold text-white">{s.n}</span>
              <span className="text-xs text-white/30">— {s.sub}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY NOT DIY ──────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="mb-10">
          <p className="text-[#22C55E] text-xs font-mono mb-3">// 自前で作れる。でも、作らなくていい。</p>
          <h2 className="text-2xl font-bold mb-3">その20時間、プロダクト改善に使った方がいい</h2>
          <p className="text-white/45 text-sm leading-relaxed">
            Firebase + API + UI + 維持コストで最低20時間かかる。<br />
            Ghost Comment なら2分で動く。
          </p>
        </div>
        <div className="bg-white/3 border border-white/8 rounded-2xl p-6">
          <ComparisonTable />
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <h2 className="text-xl font-bold mb-8">機能</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {FEATURES.map(f => (
            <div key={f.title} className="border border-white/8 rounded-xl p-5 hover:border-white/18 transition-colors">
              <div className="flex items-start gap-3">
                <span className="text-xl shrink-0 mt-0.5">{f.icon}</span>
                <div>
                  <h3 className="font-semibold mb-1">{f.title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed">{f.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── MOAT ─────────────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="border border-[#22C55E]/20 rounded-2xl overflow-hidden">
          <div className="bg-[#22C55E]/8 px-8 py-6 border-b border-[#22C55E]/15">
            <p className="text-xs font-mono text-[#22C55E] mb-2">// 自前実装では持てないアドバンテージ</p>
            <h2 className="text-xl font-bold">なぜこれは競合が作れないのか</h2>
            <p className="text-white/45 text-sm mt-2">
              基本的な収集機能は誰でも作れる。<br />
              でも、1,000プロジェクト分のデータが生み出すインサイトは作れない。
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-0">
            {MOAT.map((m, i) => (
              <div
                key={m.title}
                className={`p-6 ${i % 2 === 0 ? 'md:border-r border-white/5' : ''} ${i < 2 ? 'border-b border-white/5' : ''}`}
              >
                <h3 className="font-semibold text-white mb-2">{m.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <h2 className="text-xl font-bold mb-8">導入まで2分</h2>
        <div className="flex flex-col gap-0 border border-white/8 rounded-xl overflow-hidden">
          {[
            { icon: '🔑', title: 'プロジェクトを作る', desc: 'Googleログイン → プロジェクト名とURL入力 → Project IDを取得。1分。', time: '1分' },
            { icon: '📋', title: 'コードを1行貼る', desc: 'scriptタグ or GhostCommentコンポーネント。ドキュメントに全フレームワーク対応の例がある。', time: '30秒' },
            { icon: '👻', title: '本音が届く', desc: 'ユーザーが👻ボタンをクリック → 匿名送信 → ダッシュボードに即反映。AIが感情を自動分類。', time: 'リアルタイム' },
          ].map((s, i, arr) => (
            <div key={s.icon} className={`flex items-start gap-5 p-6 ${i < arr.length - 1 ? 'border-b border-white/8' : ''}`}>
              <span className="text-2xl shrink-0 mt-0.5">{s.icon}</span>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">{s.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{s.desc}</p>
              </div>
              <span className="text-xs text-[#22C55E] font-mono shrink-0 mt-1">{s.time}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── WIDGET PREVIEW ───────────────────────────────────────────────────── */}
      <section className="max-w-2xl mx-auto px-6 pb-20">
        <h2 className="text-lg font-bold text-center mb-6">こんなウィジェットが表示される</h2>
        <div className="border border-white/8 rounded-2xl overflow-hidden">
          <div className="bg-[#111115] h-24 flex items-center justify-center text-white/10 text-xs border-b border-white/5">
            あなたのサービス
          </div>
          <div className="relative bg-[#0A0A0B] h-72">
            <div className="absolute bottom-5 right-5 flex flex-col items-end gap-3">
              <div className="bg-[#0F1118] border border-[#22C55E]/30 rounded-2xl p-4 w-64 shadow-2xl">
                <p className="text-white text-xs font-semibold mb-2">フィードバックを送る</p>
                <div className="flex justify-between mb-3 text-lg">
                  {['😡','😕','😐','🙂','😍'].map(e => (
                    <span key={e}>{e}</span>
                  ))}
                </div>
                <div className="bg-white/6 border border-white/10 rounded-lg h-14 px-3 py-2 mb-3">
                  <span className="text-white/20 text-xs">本音を聞かせてください…</span>
                </div>
                <div className="py-2 text-center text-white text-xs font-semibold rounded-lg bg-[#22C55E]">
                  送信する
                </div>
                <p className="text-center text-white/15 text-[10px] mt-2">Powered by Ghost Comment</p>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-lg bg-[#22C55E]">
                👻
              </div>
            </div>
          </div>
        </div>
        <p className="text-center text-white/25 text-xs mt-3">
          color / position / promptText は自由に変更可能{' '}
          <Link href="/docs#customization" className="text-[#22C55E]/60 hover:text-[#22C55E]">→ Docs</Link>
        </p>
      </section>

      {/* ── PRICING ──────────────────────────────────────────────────────────── */}
      <section id="pricing" className="max-w-3xl mx-auto px-6 pb-24">
        <h2 className="text-xl font-bold text-center mb-2">料金</h2>
        <p className="text-center text-white/35 text-sm mb-10">AIサービスにしては珍しく、Freeで本当に使える</p>
        <div className="grid md:grid-cols-2 gap-5">
          <div className="border border-white/10 rounded-2xl p-6">
            <h3 className="font-bold text-lg mb-1">Free</h3>
            <p className="text-3xl font-bold mb-0.5">¥0</p>
            <p className="text-white/30 text-xs mb-6">ずっと無料</p>
            <ul className="space-y-2 text-sm mb-7">
              {[
                ['1プロジェクト', true],
                ['月30フィードバック', true],
                ['ダッシュボード（グラフ含む）', true],
                ['AI感情分析', false],
                ['週次AIサマリー', false],
                ['Slack通知', false],
                ['CSV出力', false],
              ].map(([label, active]) => (
                <li key={label as string} className={active ? 'text-white/70' : 'text-white/20'}>
                  {active ? '✓' : '✗'} {label}
                </li>
              ))}
            </ul>
            <Link
              href="/dashboard"
              className="block text-center border border-white/15 text-white/60 py-2.5 rounded-xl text-sm font-semibold hover:bg-white/5 hover:text-white transition-all"
            >
              無料で始める
            </Link>
          </div>
          <div className="border border-[#22C55E]/40 rounded-2xl p-6 relative bg-[#22C55E]/5">
            <div className="absolute -top-3 left-6 bg-[#22C55E] text-white text-xs px-3 py-1 rounded-full font-semibold">
              おすすめ
            </div>
            <h3 className="font-bold text-lg mb-1 text-[#22C55E]">Pro</h3>
            <p className="text-3xl font-bold mb-0.5">¥980<span className="text-sm font-normal text-white/40">/月</span></p>
            <p className="text-white/30 text-xs mb-6">いつでもキャンセル可能</p>
            <ul className="space-y-2 text-sm mb-7 text-white/75">
              {[
                '複数プロジェクト管理',
                'フィードバック無制限',
                'Claude AI 感情分析',
                '週次AIサマリー（毎週月曜）',
                'Slack通知',
                'CSV出力',
                '「Powered by」非表示',
                '業界ベンチマーク比較',
              ].map(label => (
                <li key={label}>✓ {label}</li>
              ))}
            </ul>
            <Link
              href="/dashboard"
              className="block text-center bg-[#22C55E] text-white py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Proで始める
            </Link>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-6 pb-28 text-center">
        <p className="text-white/25 font-mono text-sm mb-5">// 最後に一言</p>
        <h2 className="text-3xl font-bold mb-4">
          作ったプロダクトが何を<br />
          求められているか、知っていますか。
        </h2>
        <p className="text-white/45 mb-8 leading-relaxed">
          ユーザーは正直に言わない。匿名なら言う。<br />
          Ghost Comment を今日から使えば、明日には答えが届いている。
        </p>
        <Link
          href="/dashboard"
          className="inline-block bg-[#22C55E] text-white px-10 py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity"
        >
          今日から始める（無料）
        </Link>
        <p className="text-white/20 text-xs mt-4">クレジットカード不要 · 2分で導入完了</p>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/8 py-8">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-bold flex items-center gap-2">
            <span>👻</span> Ghost Comment
          </div>
          <div className="flex gap-6 text-sm text-white/35">
            <Link href="/docs" className="hover:text-white transition-colors">Docs</Link>
            <a href="https://x.com/Yoko_ai_dev" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">X</a>
            <a href="https://note.com/yoko_ai_logic" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">note</a>
            <a href="https://yokoportofolio.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Portfolio</a>
          </div>
          <p className="text-white/15 text-xs">Made by YO-KO</p>
        </div>
      </footer>
    </div>
  )
}

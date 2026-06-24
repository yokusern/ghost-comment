import Link from 'next/link'
import type { Metadata } from 'next'
import { CodeTabs, ComparisonTable } from '@/components/LP/CodeTabs'

export const metadata: Metadata = {
  title: 'Ghost Comment — エンジニアのための匿名フィードバック基盤',
  description: 'scriptタグ1行、またはnpmパッケージで導入。Firebase設定ゼロ。ユーザーの本音を今日から収集。React / Next.js / Vue 対応。',
  openGraph: {
    title: 'Ghost Comment — エンジニアのための匿名フィードバック基盤',
    description: 'scriptタグ1行で導入。Firebase設定ゼロ。ユーザーの本音を今日から収集。',
    url: 'https://ghost-comment.vercel.app',
    siteName: 'Ghost Comment',
    locale: 'ja_JP',
    type: 'website',
  },
}

// ── Static sections ─────────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: '⚡',
    title: '2分で導入',
    desc: 'scriptタグ1行。ReactコンポーネントならnpmなしでもOK。Firebase設定・サーバー構築は不要。',
  },
  {
    icon: '👻',
    title: '完全匿名',
    desc: 'ユーザーはログイン不要、名前入力不要。匿名だから本音が集まる。収集するのはテキスト・デバイス・ページURLのみ。',
  },
  {
    icon: '🧠',
    title: 'Claude AI 感情分析',
    desc: 'フィードバックを自動でPositive / Negative / Neutralに分類。AIの分析は自分で実装すると月数千円のAPIコスト。',
  },
  {
    icon: '📊',
    title: 'ダッシュボード',
    desc: '日別バーチャート・感情円グラフ・キーワード分析・CSV出力。見たいデータを1画面で確認できる。',
  },
  {
    icon: '📈',
    title: 'ベンチマーク比較（Coming Soon）',
    desc: '「あなたのNPS、同カテゴリのSaaSと比べてどう？」自分だけのデータでは作れない業界比較が見られる。',
  },
  {
    icon: '🔗',
    title: 'Slack / Linear 連携（Coming Soon）',
    desc: 'フィードバックが届いたら即Slack通知。ネガティブなフィードバックをLinearのIssueに自動変換。',
  },
]

const MOAT_FEATURES = [
  {
    title: 'ベンチマークデータ',
    sub: 'データは自分では作れない',
    desc: '1,000プロジェクトが集まれば「BtoBアプリの平均ネガティブ率は14%」という比較データが生まれる。自分1人で運用するフィードバック基盤では絶対に持てない資産。',
  },
  {
    title: 'AI週次サマリー（Pro）',
    sub: 'Claudeが週1で要約',
    desc: '「今週のフィードバック3件の共通テーマ：UIが分かりにくい」を自動生成。毎回ダッシュボードを確認しなくていい。',
  },
  {
    title: 'スパムフィルタリング',
    sub: 'テキスト分類モデル込み',
    desc: '「aaaa」「test」など意味のない投稿を自動除去。これを自前で実装するにはMLモデルのトレーニングが必要。',
  },
  {
    title: 'セッションID（匿名）',
    sub: 'Cookieなしのユニーク計測',
    desc: 'デバイス情報のハッシュで匿名セッションIDを生成。同じユーザーが何度も投稿したかを、個人情報なしで把握できる。',
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0d0d1a] text-white overflow-x-hidden">

      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-white/10 max-w-6xl mx-auto">
        <div className="flex items-center gap-2 font-bold text-lg">
          <span>👻</span> Ghost Comment
        </div>
        <div className="flex items-center gap-4">
          <Link href="/docs" className="text-white/50 hover:text-white text-sm transition-colors">Docs</Link>
          <Link href="#pricing" className="text-white/50 hover:text-white text-sm transition-colors">料金</Link>
          <Link
            href="/dashboard"
            className="bg-[#A78BFA] text-white text-sm px-5 py-2 rounded-xl font-semibold hover:opacity-90 transition-opacity"
          >
            無料で始める
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Copy */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[#A78BFA]/15 border border-[#A78BFA]/30 rounded-full px-4 py-1.5 text-sm text-[#A78BFA] mb-6">
              <span className="w-1.5 h-1.5 bg-[#A78BFA] rounded-full animate-pulse" />
              エンジニアのための匿名フィードバック基盤
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
              <span className="text-[#A78BFA]">2分で導入。</span><br />
              ユーザーの本音を、<br />
              インフラゼロで収集する。
            </h1>
            <p className="text-white/55 text-lg leading-relaxed mb-8">
              scriptタグ1行、またはReactコンポーネントで導入完了。<br />
              Firebase設定、サーバー構築、維持コストはこちらが持つ。<br />
              あなたはプロダクトの改善に集中できる。
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/dashboard"
                className="bg-[#A78BFA] text-white px-7 py-3.5 rounded-xl font-semibold hover:opacity-90 transition-opacity text-center"
              >
                無料で始める
              </Link>
              <Link
                href="/docs"
                className="border border-white/20 text-white/70 px-7 py-3.5 rounded-xl font-semibold hover:bg-white/5 hover:text-white transition-all text-center"
              >
                ドキュメントを見る →
              </Link>
            </div>
            <p className="text-white/30 text-xs mt-4">クレジットカード不要 · Free プランは永久無料</p>
          </div>

          {/* Right: Code tabs */}
          <div>
            <CodeTabs />
            <p className="text-white/30 text-xs mt-2 text-right">
              YOUR_PROJECT_ID はダッシュボードからコピー
            </p>
          </div>
        </div>
      </section>

      {/* Social proof numbers */}
      <section className="max-w-6xl mx-auto px-6 py-10 border-y border-white/8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { n: '< 2min', label: '導入時間' },
            { n: '50KB', label: 'ウィジェットサイズ' },
            { n: '0', label: '必要なFirebase設定' },
            { n: '4', label: '対応フレームワーク' },
          ].map(s => (
            <div key={s.label}>
              <div className="text-2xl font-bold text-[#A78BFA]">{s.n}</div>
              <div className="text-xs text-white/40 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Why not DIY */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-2xl font-bold mb-3">自前で作れる。でも、作らなくていい。</h2>
          <p className="text-white/50 text-sm leading-relaxed">
            Firebase + API + UI + 維持コストで20時間以上かかるものを、<br />
            その20時間をプロダクトの改善に使った方が価値がある。
          </p>
        </div>
        <div className="bg-white/4 border border-white/10 rounded-2xl p-6">
          <ComparisonTable />
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold text-center mb-12">機能一覧</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map(f => (
            <div key={f.title} className="bg-white/4 border border-white/10 rounded-2xl p-5 hover:bg-white/7 transition-colors">
              <div className="text-2xl mb-3">{f.icon}</div>
              <h3 className="font-semibold text-white mb-1.5">{f.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Moat — Why Ghost Comment wins long-term */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="bg-gradient-to-br from-[#A78BFA]/10 to-transparent border border-[#A78BFA]/20 rounded-2xl p-8 md:p-12">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <p className="text-[#A78BFA] text-sm font-semibold mb-3">なぜ Ghost Comment を使い続けるのか</p>
            <h2 className="text-2xl font-bold mb-3">自前実装では持てないアドバンテージ</h2>
            <p className="text-white/50 text-sm">
              基本的な収集機能は誰でも作れる。<br />
              でも、1,000プロジェクト分のデータが生み出すインサイトは作れない。
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {MOAT_FEATURES.map(m => (
              <div key={m.title} className="bg-white/5 border border-white/10 rounded-xl p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-white">{m.title}</h3>
                  <span className="text-xs text-white/30 ml-2 shrink-0">{m.sub}</span>
                </div>
                <p className="text-white/50 text-sm leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold text-center mb-12">3ステップで完了</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { n: '01', icon: '🔑', title: 'プロジェクトを作成', desc: 'ダッシュボードにGoogleログイン。プロジェクト名とURLを入力するだけ。1分。' },
            { n: '02', icon: '📋', title: 'コードを貼る', desc: '発行された1行のscriptタグをHTMLに貼る。ReactならGhostCommentコンポーネントを追加。' },
            { n: '03', icon: '📬', title: '本音が届く', desc: '訪問者が👻ボタンをクリック → 匿名で送信 → ダッシュボードに即時反映。' },
          ].map(step => (
            <div key={step.n} className="bg-white/4 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{step.icon}</span>
                <span className="text-[#A78BFA] text-sm font-bold">{step.n}</span>
              </div>
              <h3 className="font-bold mb-2">{step.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Widget preview */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <h2 className="text-xl font-bold text-center mb-6">こんなウィジェットが表示される</h2>
        <div className="bg-white/4 border border-white/10 rounded-2xl p-4 relative overflow-hidden">
          <div className="bg-[#0d0d1a] rounded-xl h-32 flex items-center justify-center text-white/15 text-sm border border-white/8">
            あなたのサービス
          </div>
          <div className="absolute bottom-8 right-8 flex flex-col items-end gap-2">
            <div className="bg-[#16162a] border border-[#A78BFA]/30 rounded-2xl p-4 w-60 shadow-xl">
              <p className="text-white text-xs font-semibold mb-2">フィードバックを送る</p>
              <div className="flex justify-between mb-2 text-base">😡 😕 😐 🙂 😍</div>
              <div className="bg-white/8 rounded-lg h-12 mb-2 border border-white/10 px-3 py-2">
                <span className="text-white/20 text-xs">本音を聞かせてください…</span>
              </div>
              <div className="bg-[#A78BFA] rounded-lg py-1.5 text-center text-white text-xs font-semibold">送信する</div>
              <p className="text-center text-white/20 text-[10px] mt-1.5">Powered by Ghost Comment</p>
            </div>
            <div className="w-11 h-11 bg-[#A78BFA] rounded-full flex items-center justify-center text-xl shadow-lg">👻</div>
          </div>
        </div>
        <p className="text-center text-white/30 text-xs mt-3">
          color・position・promptText はカスタマイズ可能 →{' '}
          <Link href="/docs#customization" className="text-[#A78BFA]/70 hover:text-[#A78BFA]">Docs</Link>
        </p>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-3xl mx-auto px-6 pb-24">
        <h2 className="text-2xl font-bold text-center mb-3">料金</h2>
        <p className="text-center text-white/40 text-sm mb-10">AIサービスにしては珍しく、Freeで本当に使える</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/4 border border-white/15 rounded-2xl p-6">
            <h3 className="font-bold text-xl mb-1">Free</h3>
            <p className="text-3xl font-bold mb-1">¥0</p>
            <p className="text-white/40 text-sm mb-6">ずっと無料</p>
            <ul className="space-y-2 text-sm text-white/60 mb-6">
              <li>✓ 1プロジェクト</li>
              <li>✓ 月30フィードバック</li>
              <li>✓ ダッシュボード（グラフ含む）</li>
              <li className="text-white/25">✗ AI 感情分析</li>
              <li className="text-white/25">✗ CSV 出力</li>
              <li className="text-white/25">✗ 「Powered by」非表示</li>
            </ul>
            <Link
              href="/dashboard"
              className="block text-center border border-white/20 text-white/70 py-2.5 rounded-xl text-sm font-semibold hover:bg-white/5 transition-colors"
            >
              無料で始める
            </Link>
          </div>
          <div className="bg-[#A78BFA]/10 border border-[#A78BFA]/40 rounded-2xl p-6 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#A78BFA] text-white text-xs px-3 py-1 rounded-full font-semibold">
              おすすめ
            </div>
            <h3 className="font-bold text-xl mb-1 text-[#A78BFA]">Pro</h3>
            <p className="text-3xl font-bold mb-1">¥980<span className="text-base font-normal text-white/50">/月</span></p>
            <p className="text-white/40 text-sm mb-6">いつでもキャンセル可能</p>
            <ul className="space-y-2 text-sm text-white/80 mb-6">
              <li>✓ 複数プロジェクト管理</li>
              <li>✓ フィードバック無制限</li>
              <li>✓ Claude AI 感情分析</li>
              <li>✓ CSV 出力</li>
              <li>✓ 「Powered by」非表示</li>
              <li>✓ 週次AIサマリー（近日）</li>
            </ul>
            <Link
              href="/dashboard"
              className="block text-center bg-[#A78BFA] text-white py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Pro で始める
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 pb-24 text-center">
        <div className="bg-white/4 border border-white/10 rounded-2xl p-10">
          <div className="text-4xl mb-4">👻</div>
          <h2 className="text-2xl font-bold mb-3">今日からフィードバックを集め始める</h2>
          <p className="text-white/50 text-sm mb-7">2分あれば、今すぐ動くものが手に入る。</p>
          <Link
            href="/dashboard"
            className="inline-block bg-[#A78BFA] text-white px-8 py-3.5 rounded-xl font-semibold hover:opacity-90 transition-opacity"
          >
            無料で始める（クレカ不要）
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold">
            <span>👻</span> Ghost Comment
          </div>
          <div className="flex gap-6 text-sm text-white/40">
            <Link href="/docs" className="hover:text-white transition-colors">Docs</Link>
            <a href="https://x.com/Yoko_ai_dev" target="_blank" rel="noopener" className="hover:text-white transition-colors">X</a>
            <a href="https://note.com/zen_ai_logic" target="_blank" rel="noopener" className="hover:text-white transition-colors">note</a>
            <a href="https://yokoportofolio.vercel.app" target="_blank" rel="noopener" className="hover:text-white transition-colors">Portfolio</a>
          </div>
          <p className="text-white/20 text-xs">Made by YO-KO</p>
        </div>
      </footer>
    </div>
  )
}

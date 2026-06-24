import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ghost Comment — 匿名フィードバックウィジェット',
  description: '1行のscriptタグを貼るだけ。ユーザーがログイン不要で本音を送れる匿名フィードバック収集ツール。個人開発者の相棒。',
  openGraph: {
    title: 'Ghost Comment — 匿名フィードバックウィジェット',
    description: '1行のscriptタグを貼るだけ。ユーザーがログイン不要で本音を送れる匿名フィードバック収集ツール。',
    url: 'https://ghost-comment.vercel.app',
    siteName: 'Ghost Comment',
    locale: 'ja_JP',
    type: 'website',
  },
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0d0d1a] text-white overflow-x-hidden">

      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-white/10 max-w-5xl mx-auto">
        <div className="flex items-center gap-2 font-bold text-lg">
          <span>👻</span> Ghost Comment
        </div>
        <Link
          href="/dashboard"
          className="bg-[#A78BFA] text-white text-sm px-5 py-2 rounded-xl font-semibold hover:opacity-90 transition-opacity"
        >
          無料で始める
        </Link>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#A78BFA]/10 blur-[80px] rounded-full" />
        </div>
        <p className="text-[#A78BFA] text-sm font-medium tracking-wider mb-4">匿名フィードバックウィジェット</p>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          あなたのプロダクトへの<br />
          <span className="text-[#A78BFA]">本音</span>、届いてますか？
        </h1>
        <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          1行のscriptタグを貼るだけ。<br />ユーザーはログイン不要、名前不要で本音を送れる。
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/dashboard"
            className="bg-[#A78BFA] text-white px-8 py-3.5 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity"
          >
            無料で始める
          </Link>
          <a
            href="#how"
            className="border border-white/20 text-white/70 px-8 py-3.5 rounded-xl font-semibold text-lg hover:bg-white/5 hover:text-white transition-all"
          >
            使い方を見る
          </a>
        </div>
      </section>

      {/* Demo embed preview */}
      <section className="max-w-3xl mx-auto px-6 mb-20">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 relative">
          <div className="bg-[#0d0d1a] rounded-xl h-40 flex items-center justify-center text-white/20 text-sm border border-white/8">
            あなたのサイト
          </div>
          <div className="absolute bottom-8 right-8 flex flex-col items-end gap-2">
            <div className="bg-[#16162a] border border-[#A78BFA]/30 rounded-2xl p-4 w-64 shadow-xl">
              <p className="text-white text-xs font-semibold mb-2">フィードバックを送る</p>
              <div className="flex justify-between mb-2 text-lg">
                {['😡','😕','😐','🙂','😍'].map(e => <span key={e}>{e}</span>)}
              </div>
              <div className="bg-white/8 rounded-lg h-14 mb-2 border border-white/10 px-3 py-2">
                <span className="text-white/25 text-xs">本音を聞かせてください…</span>
              </div>
              <div className="bg-[#A78BFA] rounded-lg py-2 text-center text-white text-xs font-semibold">送信する</div>
              <p className="text-center text-white/20 text-[10px] mt-2">Powered by Ghost Comment</p>
            </div>
            <div className="w-12 h-12 bg-[#A78BFA] rounded-full flex items-center justify-center text-2xl shadow-lg">
              👻
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="max-w-5xl mx-auto px-6 mb-20">
        <h2 className="text-2xl font-bold text-center mb-12">たった3ステップ</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { num: '01', icon: '📋', title: 'scriptタグを貼る', desc: 'ダッシュボードからコードを1行コピー。サイトの</body>直前に貼るだけで完了。' },
            { num: '02', icon: '💬', title: 'ユーザーが本音を送る', desc: '右下の👻ボタンをクリック。名前もログインも不要。匿名だから本音が届く。' },
            { num: '03', icon: '📊', title: 'ダッシュボードで確認', desc: 'フィードバックを一覧表示。感情分析・グラフ・キーワードで傾向がわかる。' },
          ].map(step => (
            <div key={step.num} className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{step.icon}</span>
                <span className="text-[#A78BFA] text-sm font-bold">{step.num}</span>
              </div>
              <h3 className="font-bold text-white mb-2">{step.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Code snippet */}
      <section className="max-w-2xl mx-auto px-6 mb-20 text-center">
        <h2 className="text-xl font-bold mb-6">設置はこの1行だけ</h2>
        <div className="bg-[#16162a] border border-white/10 rounded-xl px-6 py-4 text-left font-mono text-sm text-green-400">
          {'<script src="https://ghost-comment.vercel.app/widget.js"'}
          <br />
          {'  data-project-id="your-project-id">'}
          <br />
          {'<\/script>'}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-3xl mx-auto px-6 mb-24">
        <h2 className="text-2xl font-bold text-center mb-12">料金</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Free */}
          <div className="bg-white/5 border border-white/15 rounded-2xl p-6">
            <h3 className="font-bold text-xl mb-1">Free</h3>
            <p className="text-3xl font-bold mb-1">¥0</p>
            <p className="text-white/40 text-sm mb-6">ずっと無料</p>
            <ul className="space-y-2 text-sm text-white/60 mb-6">
              <li>✓ 1サイト</li>
              <li>✓ 月30件まで</li>
              <li>✓ ダッシュボード閲覧</li>
              <li className="text-white/25">✗ 感情分析</li>
              <li className="text-white/25">✗ CSV出力</li>
              <li className="text-white/25">✗ 「Powered by」非表示</li>
            </ul>
            <Link
              href="/dashboard"
              className="block text-center border border-white/20 text-white/70 py-2.5 rounded-xl text-sm font-semibold hover:bg-white/5 transition-colors"
            >
              無料で始める
            </Link>
          </div>
          {/* Pro */}
          <div className="bg-[#A78BFA]/10 border border-[#A78BFA]/40 rounded-2xl p-6 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#A78BFA] text-white text-xs px-3 py-1 rounded-full font-semibold">
              おすすめ
            </div>
            <h3 className="font-bold text-xl mb-1 text-[#A78BFA]">Pro</h3>
            <p className="text-3xl font-bold mb-1">¥980<span className="text-base font-normal text-white/50">/月</span></p>
            <p className="text-white/40 text-sm mb-6">いつでもキャンセル可能</p>
            <ul className="space-y-2 text-sm text-white/80 mb-6">
              <li>✓ 複数サイト管理</li>
              <li>✓ フィードバック無制限</li>
              <li>✓ Claude AI 感情分析</li>
              <li>✓ CSV出力</li>
              <li>✓ 「Powered by」非表示</li>
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

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-4 font-bold">
          <span>👻</span> Ghost Comment
        </div>
        <div className="flex justify-center gap-6 text-sm text-white/40 mb-4">
          <a href="https://x.com/Yoko_ai_dev" target="_blank" rel="noopener" className="hover:text-white transition-colors">X</a>
          <a href="https://note.com/zen_ai_logic" target="_blank" rel="noopener" className="hover:text-white transition-colors">note</a>
          <a href="https://yokoportofolio.vercel.app" target="_blank" rel="noopener" className="hover:text-white transition-colors">Portfolio</a>
        </div>
        <p className="text-white/20 text-xs">Made by YO-KO</p>
      </footer>
    </div>
  )
}
